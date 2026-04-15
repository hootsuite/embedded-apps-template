import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from './routes';
import { useHootsuite } from '@/context/useHootsuite';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useHootsuite();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(Paths.AUTHORIZE);
    }
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
};
