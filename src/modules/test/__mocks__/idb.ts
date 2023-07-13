import { IDBPDatabase, IDBPTransaction, IDBPObjectStore } from 'idb';
import { DatabaseType } from '@common/database/types'; // import the actual DatabaseType from your code

const mockStore: Partial<IDBPObjectStore> = {
  get: jest.fn(),
  put: jest.fn() as any,
  getAll: jest.fn(),
  delete: jest.fn() as any,
};

const mockTx: Partial<IDBPTransaction> = {
  objectStore: jest.fn().mockReturnValue(mockStore),
  done: Promise.resolve(),
};

const mockDB: Partial<IDBPDatabase<DatabaseType>> = {
  transaction: jest.fn().mockReturnValue(mockTx),
  get: jest.fn(),
};

export const openDB = jest.fn().mockResolvedValue(mockDB);

// Reset the mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
