/*
  Copyright (c) 2023, Masha Diminsky (also known as Mariya Diminsky)
  All rights reserved.

  This source code is licensed under the BSD-style license found in the
  LICENSE file in the root directory.
*/

import { DatabaseProvider } from '@common/database';
import { App } from '@modules/app';
import { AuthProvider } from '@modules/auth';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

// note on drag and drop browser warning:
// comment out strict mode to temp fix dnd errors
// this is not an issue in prod though, the problem
// is that StrictMode causes useEffect to render twice
// but has many other benefits during development
root.render(
  <StrictMode>
    <DatabaseProvider>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </DatabaseProvider>
  </StrictMode>
);
