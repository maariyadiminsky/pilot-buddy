import { ReactNode, useState, useEffect, useMemo, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '@modules/auth/utils';

interface AuthContextType {
  userId?: string;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  setIsLoggedIn: (value: boolean) => void;
  handleLogout: () => void;
  handleSetUserId: (value: string) => void;
}

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  userId: undefined,
  isLoggedIn: false,
  isAuthLoading: true,
  setIsLoggedIn: () => {},
  handleLogout: () => {},
  handleSetUserId: () => {},
});

const USER_ID = 'userId';
const COOKIE = 'sessionToken';
const AuthProvider = ({ children }: AuthContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userId, setUserId] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const handleSetUserId = (user: string) => {
    localStorage.setItem(USER_ID, user);
    setUserId(user);
  };

  useEffect(() => {
    const user = localStorage.getItem(USER_ID);

    if (user) {
      setUserId(user);
    }
  }, []);

  const clearData = () => {
    localStorage.removeItem(USER_ID);
  };

  // I am aware this isnt the safest solution in the world,
  // but this app was built for fun and of course in serious
  // production use you should really create a backend
  // and store in a server db for added security.
  useEffect(() => {
    const sessionToken = getCookie(COOKIE);
    const isSignedIn = Boolean(userId && sessionToken);

    if (!isSignedIn) {
      clearData();
    }

    setIsLoggedIn(isSignedIn);
    setIsAuthLoading(false);
  }, [location]);

  const handleLogout = () => {
    clearData();
    removeCookie(COOKIE);
    setIsLoggedIn(false);
    navigate('/');
  };

  const contextValues = useMemo(
    () => ({
      isLoggedIn,
      isAuthLoading,
      userId,
      setIsLoggedIn,
      handleLogout,
      handleSetUserId,
    }),
    [isLoggedIn, isAuthLoading, userId]
  );

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
