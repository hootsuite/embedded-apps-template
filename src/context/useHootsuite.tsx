import { useContext } from 'react';
import type { HootsuiteContextType } from './AppContext';
import { HootsuiteContext } from './AppContext';

export const useHootsuite = (): HootsuiteContextType => {
  const context = useContext(HootsuiteContext);
  if (!context) {
    throw new Error('useHootsuite must be used within a HootsuiteContextProvider');
  }
  return context;
};
