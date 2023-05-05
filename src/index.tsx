import App from 'modules/app/App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import AuthProvider from '@modules/auth/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
