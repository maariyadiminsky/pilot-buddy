import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

import '@testing-library/jest-dom';

const Providers = ({ children }) => <Router>{children}</Router>;

const customRender = (ui, options) => {
  if (options) {
    if (options.route) {
      window.history.pushState({}, '', options.route);
    }
  }

  return render(ui, { wrapper: Providers, ...options });
};

// override render method
export { customRender as render, screen, userEvent, fireEvent, renderHook };
