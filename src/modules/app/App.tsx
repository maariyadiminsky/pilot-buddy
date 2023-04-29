import { ROUTES } from '@modules/common/api/constants';
import NotFoundPage from '@modules/common/components/page/page-status/NotFoundPage';
import Session from '@modules/session/Session';
import SessionQuiz from '@modules/session-quiz/SessionQuiz';
import StudyRoom from '@modules/study-room/StudyRoom';
import Homepage from '@modules/home/Homepage';
import Login from '@modules/auth/Login';
import { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from '@modules/auth/AuthProvider';
import PrivateRoutes from '@modules/auth/PrivateRoutes';

const App: FC = () => {
  const { isLoggedIn, isAuthLoading } = useContext(AuthContext);

  return isAuthLoading ? (
    <div>Loading...</div>
  ) : (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={isLoggedIn ? <StudyRoom /> : <Homepage />} />
      <Route path={ROUTES.LOGIN_ROUTE} element={<Login />} />
      <Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
        <Route path={ROUTES.SESSION_ROUTE} element={<Session />} />
        <Route path={ROUTES.SESSION_START_ROUTE} element={<SessionQuiz />} />
      </Route>
    </Routes>
  );
};

export default App;
