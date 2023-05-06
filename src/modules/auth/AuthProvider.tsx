import { ReactNode, useState, useEffect, useMemo, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSessionToken, getCookie, setCookie, removeCookie } from '@modules/auth/utils';
import { logRocketIdentifyUser } from '@common/error-monitoring';

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
const AuthProvider = ({ children }: AuthContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userId, setUserId] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (user: string, email: string) => {
    // set for logged in status
    setCookie(SESSION_COOKIE, getSessionToken(), { path: '/', secure: true });
    localStorage.setItem(USER_ID, user);
    setUserId(user);
    // identify for error handling
    logRocketIdentifyUser(userId, { email });
    // route to homepage
    navigate('/');
  };

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
  }, [location]);

  const handleLogout = () => {
    clearData();
    setIsLoggedIn(false);
    navigate('/');
  };

  const contextValues = useMemo(
    () => ({
      userId,
      isLoggedIn,
      isAuthLoading,
      setIsLoggedIn,
      handleLogout,
      handleLogin,
    }),
    [isLoggedIn, isAuthLoading, userId]
  );

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
