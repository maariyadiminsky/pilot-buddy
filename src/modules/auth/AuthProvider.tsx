import { ReactNode, useState, useEffect, useMemo, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '@modules/auth/utils';

interface AuthContextType {
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  setIsLoggedIn: (value: boolean) => void;
  handleLogout: () => void;
}

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isAuthLoading: true,
  setIsLoggedIn: () => {},
  handleLogout: () => {},
});

const AuthProvider = ({ children }: AuthContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = getCookie('sessionToken');
    setIsLoggedIn(Boolean(sessionToken && sessionToken !== ''));
    setIsAuthLoading(false);
  }, [location]);

  const handleLogout = () => {
    removeCookie('sessionToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const contextValues = useMemo(
    () => ({ isLoggedIn, isAuthLoading, setIsLoggedIn, handleLogout }),
    [isLoggedIn, isAuthLoading]
  );

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
