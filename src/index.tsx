import App from 'modules/app/App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { persistor, store } from '@redux/store/reducers/store';
import AuthProvider from '@modules/auth/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import PageProvider from '@common/components/page/PageProvider';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AuthProvider>
            <PageProvider>
              <App />
            </PageProvider>
          </AuthProvider>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// (i) service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
