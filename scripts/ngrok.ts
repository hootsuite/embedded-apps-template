/**
 * ngrok Tunnel Module
 *
 * Provides functionality to create a public tunnel to the local backend server,
 * enabling OAuth callback testing during local development.
 *
 * IMPORTANT: ngrok requires a free account and authtoken to function.
 * Get your authtoken at: https://dashboard.ngrok.com/get-started/your-authtoken
 */

import * as ngrok from '@ngrok/ngrok';

export interface NgrokTunnelResult {
  url: string;
  close: () => Promise<void>;
}

/**
 * Starts an ngrok tunnel to expose the local backend to the internet.
 *
 * @param port - The local port to tunnel (default: 3001)
 * @returns Promise with the public URL and a close function
 * @throws Error if the tunnel fails to start
 */
export async function startNgrokTunnel(port: number = 3001): Promise<NgrokTunnelResult> {
  const authtoken = process.env.NGROK_AUTHTOKEN;

  console.log('\n🌐 Starting ngrok tunnel...');

  if (!authtoken) {
    console.error('❌ NGROK_AUTHTOKEN is required but not set.');
    console.error('   1. Create a free account at: https://dashboard.ngrok.com/signup');
    console.error('   2. Get your authtoken at: https://dashboard.ngrok.com/get-started/your-authtoken');
    console.error('   3. Add NGROK_AUTHTOKEN=your-token to your .env file\n');
    throw new Error('NGROK_AUTHTOKEN environment variable is required');
  }

  try {
    // Build listener configuration
    const listenerConfig: ngrok.Config = {
      addr: port,
      authtoken: authtoken,
    };

    // Start the tunnel
    const listener = await ngrok.forward(listenerConfig);
    const url = listener.url();

    if (!url) {
      throw new Error('ngrok tunnel started but no URL was returned');
    }

    console.log('✅ ngrok tunnel established!');

    return {
      url,
      close: async () => {
        await listener.close();
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('❌ Failed to start ngrok tunnel:', message);

    if (message.includes('authtoken')) {
      console.error('\n   If you have an ngrok account, set NGROK_AUTHTOKEN in your .env file');
      console.error('   Get your authtoken at: https://dashboard.ngrok.com/get-started/your-authtoken');
    }

    throw error;
  }
}

/**
 * Gets the OAuth callback URL for the given ngrok tunnel URL.
 *
 * @param ngrokUrl - The public ngrok URL
 * @returns The full OAuth callback URL
 */
export function getOAuthCallbackUrl(ngrokUrl: string): string {
  return `${ngrokUrl}/api/auth/callback`;
}
