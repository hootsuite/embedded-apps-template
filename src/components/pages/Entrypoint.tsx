import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

import { useHootsuite } from '@/context/useHootsuite';
import { Paths } from '@/routes/routes';

export function Entrypoint(): React.ReactElement {
  const navigate = useNavigate();
  const { isAuthenticated, isAppReady } = useHootsuite();

  useEffect(() => {
    // Example: Fetch some data and/or check authorization
    const checkSomething = async () => {
      if (isAppReady) {
        if (!isAuthenticated) {
          console.log('Not authenticated');
          navigate(Paths.AUTHORIZE);
        } else {
          console.log('Authenticated, redirecting to home');
          navigate(Paths.HOME);
        }
      }
    };

    checkSomething();
  }, [isAppReady]);

  return <Outlet />;
}
