#!/usr/bin/env node
/**
 * Development server startup script.
 *
 * This script orchestrates:
 * 1. Webpack dev server for the frontend (React app)
 * 2. Nodemon for the backend (Express server)
 * 3. ngrok tunnel for OAuth testing (optional)
 *
 * Both servers run concurrently with hot-reload enabled.
 */

import { spawn, ChildProcess } from 'child_process';
import { config } from 'dotenv';
import { startNgrokTunnel, getOAuthCallbackUrl, NgrokTunnelResult } from './ngrok';

// Load environment variables
config();

const FRONTEND_PORT = process.env.FRONTEND_PORT || '8080';
const BACKEND_PORT = process.env.BACKEND_PORT || '3001';
const HMR_ENABLED = process.env.HMR_ENABLED?.toUpperCase() === 'TRUE';
const NGROK_ENABLED = process.env.NGROK_ENABLED?.toUpperCase() === 'TRUE';

// Store ngrok tunnel reference for cleanup
let ngrokTunnel: NgrokTunnelResult | null = null;

interface ServerInfo {
  name: string;
  process: ChildProcess;
  url: string;
}

const servers: ServerInfo[] = [];

/**
 * Starts the webpack dev server for the frontend.
 */
function startFrontend(): ChildProcess {
  console.log('\n🚀 Starting frontend development server...');

  // Build command as a single string to avoid DEP0190 deprecation warning
  const webpackCommand = [
    'npx webpack serve',
    '--config webpack.config.ts',
    '--mode development',
    `--port ${FRONTEND_PORT}`,
    `--hot ${HMR_ENABLED ? 'true' : 'false'}`,
  ].join(' ');

  const frontend = spawn(webpackCommand, [], {
    stdio: 'pipe',
    shell: true,
    env: {
      ...process.env,
      FORCE_COLOR: '1',
    },
  });

  frontend.stderr?.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      console.error(`[frontend] ${output} \n`);
    }
  });

  servers.push({
    name: 'frontend',
    process: frontend,
    url: `https://localhost:${FRONTEND_PORT}`,
  });

  return frontend;
}

/**
 * Starts the nodemon process for the server.
 */
function startServer(): ChildProcess {
  console.log('🚀 Starting backend development server...');

  // Build command as a single string to avoid DEP0190 deprecation warning
  const nodemonCommand = 'npx nodemon --exec ts-node --ext ts --watch server server/server.ts';

  const server = spawn(nodemonCommand, [], {
    stdio: 'pipe',
    shell: true,
    env: {
      ...process.env,
      FORCE_COLOR: '1',
    },
  });

  server.stderr?.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      console.error(`[server] ${output}  \n`);
    }
  });

  servers.push({
    name: 'server',
    process: server,
    url: `http://localhost:${BACKEND_PORT}`,
  });

  return server;
}

/**
 * Displays server information after startup.
 */
function displayServerInfo(): void {
  console.log('\n' + '='.repeat(60));
  console.log('🎉 Hootsuite Embedded App Development Server');
  console.log('='.repeat(60));
  console.log(`\n📱 Frontend:  https://localhost:${FRONTEND_PORT}`);
  console.log(`🔧 Server:    http://localhost:${BACKEND_PORT}`);
  console.log(`❤️  HMR:       ${HMR_ENABLED ? 'Enabled' : 'Disabled'}`);

  if (ngrokTunnel) {
    console.log(`\n🌍 Public:    ${ngrokTunnel.url}`);
    console.log(`\n📝 OAuth Redirect URI (copy to Hootsuite Developer Portal):`);
    console.log(`   ${getOAuthCallbackUrl(ngrokTunnel.url)}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('Press Ctrl+C to stop all servers');
  console.log('='.repeat(60) + '\n');
}

/**
 * Gracefully shuts down all servers.
 */
async function shutdown(): Promise<void> {
  console.log('\n\n🛑 Shutting down servers...');

  // Close ngrok tunnel if active
  if (ngrokTunnel) {
    console.log('   Stopping ngrok tunnel...');
    try {
      await ngrokTunnel.close();
    } catch {
      // Ignore errors during shutdown
    }
  }

  servers.forEach(({ name, process }) => {
    console.log(`   Stopping ${name}...`);
    process.kill('SIGTERM');
  });

  // Give processes time to cleanup
  setTimeout(() => {
    process.exit(0);
  }, 1000);
}

/**
 * Main entry point.
 */
async function main(): Promise<void> {
  console.log('🔧 Hootsuite Embedded App - Development Mode\n');

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    shutdown().catch(console.error);
  });
  process.on('SIGTERM', () => {
    shutdown().catch(console.error);
  });

  // Start ngrok tunnel if enabled
  if (NGROK_ENABLED) {
    try {
      ngrokTunnel = await startNgrokTunnel(parseInt(BACKEND_PORT, 10));
    } catch (error) {
      console.error('\n⚠️  Continuing without ngrok tunnel...');
      console.error('   OAuth callbacks will not work from external services.\n');
    }
  }

  // Start both servers
  startServer();
  startFrontend();

  // Wait a bit for servers to start, then display info
  console.log('Waiting for servers to start...');
  setTimeout(displayServerInfo, 2000);
}

main().catch((error) => {
  console.error('Failed to start development server:', error);
  process.exit(1);
});
