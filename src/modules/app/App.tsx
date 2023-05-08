import { DatabaseContext } from '@common/database';
import { Loader } from '@common/loader';
import { PageProvider, NotFoundPage } from '@common/page';
import { ROUTES } from '@modules/app';
import { AuthContext, PrivateRoutes, Login } from '@modules/auth';
import { Homepage } from '@modules/home';
import { Profile } from '@modules/profile';
import { Session } from '@modules/session';
import { SessionQuiz } from '@modules/session-quiz';
import { StudyRoom } from '@modules/study-room';
import { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

export const App: FC = () => {
  const { database } = useContext(DatabaseContext);
  const { isLoggedIn, isAuthLoading } = useContext(AuthContext);

  return isAuthLoading || !database ? (
    <div className="h-screen pb-24 flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <Routes>
      <Route element={<PageProvider />}>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={isLoggedIn ? <StudyRoom /> : <Homepage />} />
        <Route path={ROUTES.LOGIN_ROUTE} element={<Login />} />
        <Route element={<PrivateRoutes isLoggedIn={isLoggedIn} />}>
          <Route path={ROUTES.PROFILE_ROUTE} element={<Profile />} />
          <Route path={ROUTES.SESSION_ROUTE} element={<Session />} />
          <Route path={ROUTES.SESSION_START_ROUTE} element={<SessionQuiz />} />
        </Route>
      </Route>
    </Routes>
  );
};
