/**
 * Main App Component
 *
 */

import React from 'react';
import { loadTheme } from 'hootsuite-bento';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@components/pages/Error';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';
import { HootsuiteContextProvider } from './context/AppContext';

loadTheme('light');

export function App(): React.ReactElement {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <HootsuiteContextProvider>
        <RouterProvider router={createHashRouter(routes)} />
      </HootsuiteContextProvider>
    </ErrorBoundary>
  );
}
