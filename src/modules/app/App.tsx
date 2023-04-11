import { ROUTES } from '@modules/common/api/constants';
import NotFoundPage from '@modules/common/components/page/page-status/NotFoundPage';
import StudySession from '@modules/session/Session';
import StudyRoom from '@modules/study-room/StudyRoom';
import { persistor, store } from '@redux/store/reducers/store';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path={ROUTES.STUDY_ROOM_ROUTE} element={<StudyRoom />} />
          <Route path={ROUTES.HOMEPAGE_ROUTE} element={<StudySession />} />
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
);

export default App;
