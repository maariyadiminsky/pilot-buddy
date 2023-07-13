import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { DatabaseProvider } from '@common/database';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '@modules/auth';
import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const Providers = ({ children }: { children: ReactNode }) => (
  <DatabaseProvider>
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  </DatabaseProvider>
);

const customRender = (ui: any, options?: any) => {
  if (options) {
    if (options.route) {
      window.history.pushState({}, '', options.route);
    }
  }

  return render(ui, { wrapper: Providers, ...options });
};

// override render method
export { customRender as render, screen, userEvent, fireEvent, act, renderHook };
