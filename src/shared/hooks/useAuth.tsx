import { useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const isTokenExpired = useCallback((tokenTimestamp: string): boolean => {
    const now = new Date().getTime();
    const tokenTime = parseInt(tokenTimestamp);
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    return now - tokenTime > twentyFourHours;
  }, []);

  const clearTokens = useCallback(() => {
    Cookies.remove('token');
    Cookies.remove('token');
  }, []);

  const getValidToken = useCallback((): string | null => {
    const token = Cookies.get('token');
    const tokenTimestamp = Cookies.get('token');

    if (!token) {
      return null;
    }

    if (!tokenTimestamp) {
      clearTokens();
      return null;
    }

    if (isTokenExpired(tokenTimestamp)) {
      clearTokens();
      return null;
    }

    return token;
  }, [clearTokens, isTokenExpired]);

  const setTokens = useCallback((token: string) => {
    const now = new Date().getTime().toString();

    Cookies.set('token', token, { expires: 1 });

    Cookies.set('token', now, { expires: 1 });
  }, []);

  const isAuthenticated = useCallback((): boolean => {
    return getValidToken() !== null;
  }, [getValidToken]);

  const logout = useCallback(() => {
    clearTokens();
    navigate('/login');
  }, [clearTokens, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = getValidToken();
      if (!token && window.location.pathname !== '/login') {
        navigate('/login');
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [getValidToken, navigate]);

  return {
    isAuthenticated,
    getValidToken,
    setTokens,
    clearTokens,
    logout,
  };
};
