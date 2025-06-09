
import { useState, useCallback } from 'react';

export const useVaultAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logoutFromVault = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    setIsAuthenticated,
    logoutFromVault
  };
};
