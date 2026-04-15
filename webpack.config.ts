import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import type { Configuration } from 'webpack';
import { DefinePlugin, optimize } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { config } from 'dotenv';
import cssnano from 'cssnano';
import selfsigned from 'selfsigned';

// Load environment variables
config();

/**
 * Webpack argv interface for CLI arguments.
 */
interface WebpackArgv {
  mode?: 'development' | 'production';
  [key: string]: unknown;
}

/**
 * Builds the webpack configuration for the Hootsuite embedded app.
 * 
 * Key features:
 * - Single output file (app.js) using LimitChunkCountPlugin
 * - TypeScript and CSS support
 * - Development server with optional HMR
 * - Production optimization with Terser
 * 
 * @param env - Environment variables passed by webpack CLI (--env flag)
 * @param argv - Arguments passed by webpack CLI (--mode, etc.)
 */
export async function buildConfig(
  env?: Record<string, unknown>,
  argv?: WebpackArgv
): Promise<Configuration & DevServerConfiguration> {
  // Determine mode from webpack CLI argv, or default to development
  const mode = argv?.mode || 'development';
  const isProduction = mode === 'production';

  const appEntry = path.join(process.cwd(), 'src', 'index.tsx');
  const backendHost = process.env.BACKEND_HOST;
  const hootsuiteAppId = process.env.HOOTSUITE_APP_ID ?? '';
  const hootsuiteDashboardUrl = process.env.HOOTSUITE_DASHBOARD_URL ?? '';

  // Warn about backend configuration only in production
  if (!backendHost) {
    console.warn(
      '[Webpack] BACKEND_HOST is undefined. If your app requires a backend, set it in .env'
    );
  } else if (backendHost.includes('localhost') && isProduction) {
    console.error(
      '[Webpack] BACKEND_HOST should not be localhost for production builds!'
    );
  }

  const devServerPart = !isProduction ? await buildDevServerConfig() : null;

  return {
    mode,
    context: path.resolve(process.cwd(), './'),
    entry: {
      app: appEntry,
    },
    target: 'web',
    resolve: {
      alias: {
        '@sdk': path.resolve(process.cwd(), 'sdk'),
        '@components': path.resolve(process.cwd(), 'src/components'),
        '@': path.resolve(process.cwd(), 'src'),
        styles: path.resolve(process.cwd(), 'styles'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    },
    infrastructureLogging: {
      level: 'warn',
    },
    module: {
      rules: [
        // TypeScript/TSX files
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        // CSS files (CSS Modules for project files)
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isProduction
                    ? '[hash:base64:8]'
                    : '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [cssnano({ preset: 'default' })],
                },
              },
            },
          ],
        },
        // CSS from node_modules (no CSS modules)
        {
          test: /\.css$/,
          include: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        // Images
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/inline',
        },
        // SVG
        {
          test: /\.svg$/,
          type: 'asset/inline',
        },
        // Fonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/inline',
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              // Ensures emoji and special characters are properly minified
              ascii_only: true,
            },
          },
        }),
      ],
    },
    output: {
      // Single output file for submission to Hootsuite
      filename: 'app.js',
      path: path.resolve(process.cwd(), 'dist'),
      clean: true,
    },
    plugins: [
      // Expose backend host to the frontend
      new DefinePlugin({
        'process.env.BACKEND_HOST': JSON.stringify(backendHost),
        'process.env.HOOTSUITE_APP_ID': JSON.stringify(hootsuiteAppId),
        'process.env.HOOTSUITE_DASHBOARD_URL': JSON.stringify(hootsuiteDashboardUrl),
      }),
      // CRITICAL: Ensures only a single JS file is generated
      // Hootsuite requires a single app.js file for submission
      new optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ],
    // Add dev server config only in development mode
    ...(devServerPart ?? {}),
  };
}

/**
 * Generates a self-signed certificate for local HTTPS development.
 */
async function generateDevCert(): Promise<{ key: string; cert: string }> {
  const attrs = [{ name: 'commonName', value: 'localhost' }];
  const opts = { days: 365, keySize: 2048, algorithm: 'sha256' as const };
  const pems = await selfsigned.generate(attrs, opts);
  return { key: pems.private, cert: pems.cert };
}

/**
 * Builds the webpack-dev-server configuration for local development.
 * Reads configuration from environment variables.
 * Uses HTTPS with a generated self-signed certificate at https://localhost:8080.
 */
async function buildDevServerConfig(): Promise<{
  devtool: string;
  devServer: DevServerConfiguration;
}> {
  const port = parseInt(process.env.FRONTEND_PORT || '8080', 10);
  const enableHmr = process.env.HMR_ENABLED?.toUpperCase() === 'TRUE';
  const host = 'localhost';
  const { key, cert } = await generateDevCert();

  // Allowed origins for CORS (Hootsuite dashboard domains)
  const allowedOrigins = [
    'https://hootsuite.com',
    'https://www.hootsuite.com',
    process.env.HOOTSUITE_DASHBOARD_URL,
  ].filter(Boolean) as string[];

  const devServer: DevServerConfiguration = {
    server: {
      type: 'https',
      options: { key, cert },
    },
    host,
    port,
    hot: enableHmr,
    allowedHosts: [host, ...allowedOrigins.map((url) => new URL(url).hostname)],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: '/app.js' }],
    },
    client: {
      logging: 'info',
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    static: {
      directory: path.resolve(process.cwd(), 'public'),
      publicPath: '/',
    },
  };

  // Disable WebSocket if HMR is not enabled
  if (!enableHmr) {
    devServer.webSocketServer = false;
  }

  return {
    devtool: 'source-map',
    devServer,
  };
}

export default buildConfig;
