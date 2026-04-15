import { Authorize } from '@components/pages/Authorize';
import { Entrypoint } from '@components/pages/Entrypoint';
import { ErrorPage } from '@components/pages/Error';
import { Home } from '@components/pages/Home';

import { ProtectedRoute } from './protected_route';

export enum Paths {
  ENTRYPOINT = '/',
  AUTHORIZE = '/authorize',
  HOME = '/home',
  ERRORS = '/error',
}

export const routes = [
  {
    path: Paths.ENTRYPOINT,
    element: <Entrypoint />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Entrypoint />,
      },
      {
        path: Paths.AUTHORIZE,
        element: <Authorize />,
      },
      {
        path: Paths.HOME,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: Paths.ERRORS,
        element: <ErrorPage />,
      },
    ],
  },
];
