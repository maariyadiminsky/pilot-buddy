import { logRocketIdentifyUser } from '@common/error-monitoring';
import { getUniqId } from '@common/utils';
import { getCookie, setCookie, removeCookie } from '@modules/auth/utils';
import { ReactNode, FC, useState, useEffect, useMemo, useCallback, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthContextType {
  userId?: string;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  setIsLoggedIn: (value: boolean) => void;
  handleLogout: () => void;
  handleLogin: (userId: string, email: string) => void;
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
  handleLogin: () => {},
});

const USER_ID = 'userId';
const SESSION_COOKIE = 'pilot_buddy';
export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userId, setUserId] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const getExistingUserId = () => {
    const user = localStorage.getItem(USER_ID);

    if (user) {
      setUserId(user);
      return user;
    }

    return null;
  };

  useEffect(() => {
    getExistingUserId();
  }, []);

  const clearData = () => {
    localStorage.removeItem(USER_ID);
    removeCookie(SESSION_COOKIE);
  };

  // I am aware this isnt the safest solution in the world,
  // but this app was built for fun and of course in serious
  // production use you should really create a backend
  // and store in a server db for added security.
  useEffect(() => {
    const sessionToken = getCookie(SESSION_COOKIE);

    const user = userId || getExistingUserId();

    // honestly can just use one, double check in
    // two different places simply for added security
    const isSignedIn = Boolean(user && sessionToken);

    if (!isSignedIn) {
      clearData();
    }

    setIsLoggedIn(isSignedIn);
    setIsAuthLoading(false);
  }, [location, userId]);

  const handleLogin = useCallback(
    (user: string, email: string) => {
      // set for logged in status
      setCookie(SESSION_COOKIE, getUniqId(), { path: '/', secure: true });
      localStorage.setItem(USER_ID, user);
      setUserId(user);
      // identify for error handling
      logRocketIdentifyUser(user, { email });
      // route to homepage
      navigate('/');
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    clearData();
    setIsLoggedIn(false);
    navigate('/');
  }, [navigate]);

  const contextValues = useMemo(
    () => ({
      userId,
      isLoggedIn,
      isAuthLoading,
      setIsLoggedIn,
      handleLogout,
      handleLogin,
    }),
    [isLoggedIn, isAuthLoading, userId, handleLogin, handleLogout]
  );

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};
