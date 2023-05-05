import { ReactNode, useState, useEffect, useMemo, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '@modules/auth/utils';

interface AuthContextType {
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  authEmail: string;
  setIsLoggedIn: (value: boolean) => void;
  handleLogout: () => void;
  handleSetAuthEmail: (value: string) => void;
}

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isAuthLoading: true,
  authEmail: '',
  setIsLoggedIn: () => {},
  handleLogout: () => {},
  handleSetAuthEmail: () => {},
});

const AuthProvider = ({ children }: AuthContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [authEmail, setAuthEmail] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const handleSetAuthEmail = (encryptedEmail: string) => {
    localStorage.setItem('encryptedEmail', encryptedEmail);
    setAuthEmail(encryptedEmail);
  };

  useEffect(() => {
    const email = localStorage.getItem('encryptedEmail');

    if (email) {
      handleSetAuthEmail(email);
    }
  }, []);

  const clearData = () => {
    localStorage.removeItem('encryptedEmail');
  };

  // I am aware this isnt the safest solution in the world,
  // but this app was built for fun and of course in serious
  // production use you should really create a backend
  // and store in a server db for added security.
  useEffect(() => {
    const sessionToken = getCookie('sessionToken');
    const isSignedIn = Boolean(sessionToken && sessionToken !== '');

    if (!isSignedIn) {
      clearData();
    }

    setIsLoggedIn(isSignedIn);
    setIsAuthLoading(false);
  }, [location]);

  const handleLogout = () => {
    clearData();
    removeCookie('sessionToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  const contextValues = useMemo(
    () => ({
      isLoggedIn,
      isAuthLoading,
      authEmail,
      setIsLoggedIn,
      handleLogout,
      handleSetAuthEmail,
    }),
    [isLoggedIn, isAuthLoading, authEmail]
  );

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
