import type { JSX, ReactNode } from 'react';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import createAppConnector, { AppEvents, type EmbeddedAppContext } from './AppConnector';

export interface HootsuiteContextType {
  isAppReady: boolean;
  appError: string;
  setAppError: (value: string) => void;
  isAuthenticated: boolean;
  isAuthorizing: boolean;
  accessToken?: string | undefined;
  setAccessToken: (token: string) => void;
  requestAuthorization: () => Promise<void>;
  appContext?: EmbeddedAppContext;
  currentLocale: string;
  surface: string;
}

export const HootsuiteContext = createContext<HootsuiteContextType>({
  appError: '',
  setAppError: () => {},
  isAuthenticated: false,
  isAuthorizing: false,
  accessToken: undefined,
  setAccessToken: () => {},
  requestAuthorization: async () => {},
  appContext: {},
  isAppReady: false,
  currentLocale: 'en-US',
  surface: '',
});

export const HootsuiteContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const surfaceParams = new URLSearchParams(window.location.search);
  const surface = surfaceParams.get('surface') ?? '';
  const passedLocale = surfaceParams.get('locale');

  const appConnector = createAppConnector<AppEvents>({
    appId: process.env.HOOTSUITE_APP_ID,
    targetOrigin: process.env.HOOTSUITE_DASHBOARD_URL,
  });

  // Core state
  const [appError, setAppError] = useState<string>('');
  const [appContext, setAppContext] = useState<EmbeddedAppContext>();
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  // Authentication
  const [accessToken, setAccessToken] = useState<string>();
  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);
  const currentLocale = useMemo(() => passedLocale || 'en-US', [passedLocale]);
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const requestAuthorization = useCallback(async () => {
    appConnector.emit('authorizationRequest');
  }, [appConnector]);

  useEffect(() => {
    registerAppEvents();
    // Emit app ready request
    appConnector.emit('appReadyRequest');

    function registerAppEvents() {
      appConnector.on('authorizationResponse', (response) => {
        setAccessToken(response.accessToken);
      });

      appConnector.on('accessTokenResponse', (response) => {
        setAccessToken(response.accessToken);
      });

      appConnector.on('authorizationError', (error) => {
        setAppError(error.error);
      });

      appConnector.on('isAuthorizing', (payload) => {
        setIsAuthorizing(payload.isAuthorizing);
      });

      appConnector.on('contextUpdateResponse', (response) => {
        setAppContext(response.context);
      });

      appConnector.on('appReadyResponse', (response) => {
        setAppContext(response.context);
        if (response.authentication?.accessToken) {
          setAccessToken(response.authentication.accessToken);
        }
        setIsAppReady(true);
      });
    }
  }, []);

  const contextValue: HootsuiteContextType = {
    appError,
    setAppError,
    isAuthenticated,
    accessToken,
    setAccessToken,
    requestAuthorization,
    isAuthorizing,
    appContext,
    isAppReady,
    currentLocale,
    surface,
  };

  return <HootsuiteContext.Provider value={contextValue}>{children}</HootsuiteContext.Provider>;
};
