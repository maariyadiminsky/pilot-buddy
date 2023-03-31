import { ROUTES } from '@modules/common/api/constants';
import HomePage from '@modules/home/HomePage';
import NotFoundPage from '@modules/page-status/NotFoundPage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@styles/main.sass';

const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
    </Routes>
  </Router>
);

export default Root;
