import '@testing-library/jest-dom';

import { DatabaseProvider } from '@common/database';
import { AuthProvider } from '@modules/auth';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import {
  IDBFactory,
  IDBRequest,
  IDBOpenDBRequest,
  IDBDatabase,
  IDBObjectStore,
  IDBIndex,
  IDBTransaction,
  IDBCursor,
  IDBCursorWithValue,
  IDBKeyRange,
  IDBVersionChangeEvent,
} from 'fake-indexeddb';
import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// mocks
const mockIndexedDB = () => {
  window.indexedDB = new IDBFactory();
  window.IDBRequest = IDBRequest;
  window.IDBOpenDBRequest = IDBOpenDBRequest;
  window.IDBDatabase = IDBDatabase;
  window.IDBObjectStore = IDBObjectStore;
  window.IDBIndex = IDBIndex;
  window.IDBTransaction = IDBTransaction;
  window.IDBCursor = IDBCursor;
  window.IDBCursorWithValue = IDBCursorWithValue;
  window.IDBKeyRange = IDBKeyRange;
  window.IDBVersionChangeEvent = IDBVersionChangeEvent;
};

// provider wrappers
// provider with default auth set as logged in
const Providers = ({ children }: { children: ReactNode }) => (
  <DatabaseProvider>
    <Router>
      <AuthProvider initialLoginState={true}>{children}</AuthProvider>
    </Router>
  </DatabaseProvider>
);

// provider with no auth
const ProvidersWithoutAuth = ({ children }: { children: ReactNode }) => (
  <DatabaseProvider>
    <Router>{children}</Router>
  </DatabaseProvider>
);

// render setup
const customRender = (
  ui: any,
  options?: {
    route?: string;
    shouldManageAuth?: boolean;
    shouldHaveNoWrapper?: boolean;
  }
) => {
  if (options?.shouldHaveNoWrapper) {
    return render(ui);
  }

  let providers = Providers;

  if (options?.route) {
    window.history.pushState({}, '', options.route);
  }

  if (options?.shouldManageAuth) {
    providers = ProvidersWithoutAuth;
  }

  return render(ui, { wrapper: providers });
};

// export what is necessary for access in one place
export { customRender as render, screen, userEvent, fireEvent, waitFor, renderHook, mockIndexedDB };
