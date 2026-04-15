/**
 * Hootsuite Embedded App - Entry Point
 *
 * This is the main entry point for the embedded app.
 */

import { createRoot } from 'react-dom/client';
import { App } from './App';

import './styles/global.css';

/**
 * Connect to Hootsuite and render the app.
 */
async function main(): Promise<void> {
  // Get root element
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error(
      'Root element not found. Make sure there is a <div id="root"></div> in your HTML.'
    );
  }

  // Render the app
  const root = createRoot(rootElement);
  root.render(<App />);
}

// Start the application
main().catch((error) => {
  console.error('[App] Fatal error:', error);
});
