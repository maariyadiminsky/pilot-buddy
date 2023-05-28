åimport '@testing-library/jest-dom';

import { DatabaseProvider } from '@common/database';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '@modules/auth';
import { BrowserRouter as Router } from 'react-router-dom';

const Providers = ({ children }) => (
  <DatabaseProvider>
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  </DatabaseProvider>
);

const customRender = (ui, options) => {
  if (options) {
    if (options.route) {
      window.history.pushState({}, '', options.route);
    }
  }

  return render(ui, { wrapper: Providers, ...options });
};

// export what is necessary for access in one place
export { customRender as render, screen, userEvent, fireEvent, renderHook };
