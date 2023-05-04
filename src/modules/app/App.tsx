import { ROUTES } from '@modules/app/constants';
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
import Loader from '@common/components/loader/Loader';
import PageProvider from '@common/components/page/PageProvider';

const App: FC = () => {
  const { isLoggedIn, isAuthLoading } = useContext(AuthContext);

  return isAuthLoading ? (
    <Loader />
  ) : (
    <Routes>
      <Route element={<PageProvider />}>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={isLoggedIn ? <StudyRoom /> : <Homepage />} />
        <Route path={ROUTES.LOGIN_ROUTE} element={<Login />} />
        <Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
          <Route path={ROUTES.SESSION_ROUTE} element={<Session />} />
          <Route path={ROUTES.SESSION_START_ROUTE} element={<SessionQuiz />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
