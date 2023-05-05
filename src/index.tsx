import App from 'modules/app/App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// (i) service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
