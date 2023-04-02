import { ROUTES } from '@modules/common/api/constants';
import StudyRoom from '@modules/study-room/StudyRoom';
import NotFoundPage from '@modules/page-status/NotFoundPage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path={ROUTES.HOMEPAGE_ROUTE} element={<StudyRoom />} />
    </Routes>
  </Router>
);

export default Root;
