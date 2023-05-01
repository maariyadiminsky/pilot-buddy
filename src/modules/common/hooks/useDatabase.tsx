import { openDB, IDBPDatabase, IDBPObjectStore } from 'idb';
import { type SessionsTableDataType } from '@modules/study-room/types';
import { type SessionDataType } from '@modules/session/types';
import { useState, useCallback } from 'react';
import { ENCRYPTION_KEY } from '@modules/auth/utils';

interface User {
  email: string;
  password: string;
  key: string;
}

export interface DatabaseType extends IDBPDatabase<DatabaseType> {
  users: IDBPObjectStore<User, string>;
  sessions: IDBPObjectStore<SessionsTableDataType, string>;
  sessionData: IDBPObjectStore<SessionDataType, string>;
}

const DATABASE_NAME = 'my-db'; // temp
const DATABASE_STORE = {
  USERS: 'users',
  SESSIONS_TABLE: 'sessionsTable',
  SESSIONS: 'sessions',
};
export const DATABASE_ERROR = {
  DATABASE_NOT_AVAILABLE: 'Database not available',
  DATABASE_NOT_FOUND: 'Specified database not found',
  DATA_EXISTS: 'Data already exists in the database',
  TRANSACTION_ABORTED: 'Transaction aborted',
  USER_NOT_FOUND: 'User not found',
  STORAGE_QUOTA: 'Storage quota exceeded',
};

export const useDatabase = () => {
  const [database, setDatabase] = useState<IDBPDatabase<DatabaseType>>();

  const createDatabaseTry = useCallback(async () => {
    // Create the database if it doesn't exist
    await openDB<DatabaseType>(DATABASE_NAME, 1, {
      // make sure all required stores exist
      upgrade(theDb) {
        if (!theDb.objectStoreNames.contains(DATABASE_STORE.USERS)) {
          theDb.createObjectStore(DATABASE_STORE.USERS, { keyPath: 'email' });
        }

        if (!theDb.objectStoreNames.contains(DATABASE_STORE.SESSIONS_TABLE)) {
          theDb.createObjectStore(DATABASE_STORE.SESSIONS_TABLE, { keyPath: 'id' });
        }

        if (!theDb.objectStoreNames.contains(DATABASE_STORE.SESSIONS)) {
          theDb.createObjectStore(DATABASE_STORE.SESSIONS, { keyPath: 'id' });
        }
      },
    });
  }, []);

  const openDatabase = async () => {
    // Create the database if it doesn't exist
    await createDatabaseTry();

    // Open the database, return database
    const db = await openDB<DatabaseType>(DATABASE_NAME, 1);

    setDatabase(db);

    return db;
  };

  const getDatabase = async () => {
    let db = database;

    if (!database) {
      db = await openDatabase();
    }

    if (!db) throw new Error(DATABASE_ERROR.DATABASE_NOT_AVAILABLE);

    return db;
  };

  // user
  const getDBUser = async (encryptedEmail: string) => {
    const db = await getDatabase();
    if (!db) return null;

    const user = await db.get(DATABASE_STORE.USERS, encryptedEmail);
    if (!user) {
      throw new Error(DATABASE_ERROR.USER_NOT_FOUND);
    }

    return user;
  };

  const setDBUser = async ({
    encryptedEmail,
    encryptedPassword,
  }: {
    encryptedEmail: string;
    encryptedPassword: string;
  }) => {
    const db = await getDatabase();
    if (!db) return;

    const tx = db.transaction(DATABASE_STORE.USERS, 'readwrite');
    const store = tx.objectStore(DATABASE_STORE.USERS);
    await store.put({
      email: encryptedEmail,
      password: encryptedPassword,
      key: ENCRYPTION_KEY,
    });
    await tx.done;
  };

  // handleError should either be an error monitoring tool.
  // setter for rendering error on ui, or etc.
  const getDBErrorHandling = (error: unknown, handleError?: (error: string) => void) => {
    if (error instanceof DOMException) {
      switch (error.name) {
        case 'QuotaExceededError':
          // Handle quota exceeded error here
          handleError?.(DATABASE_ERROR.STORAGE_QUOTA);
          break;
        case 'NotFoundError':
          // Handle not found error here
          handleError?.(DATABASE_ERROR.DATABASE_NOT_FOUND);
          break;
        case 'ConstraintError':
          // Handle constraint error here
          handleError?.(DATABASE_ERROR.DATA_EXISTS);
          break;
        case 'AbortError':
          // Handle aborted transaction error here
          handleError?.(DATABASE_ERROR.TRANSACTION_ABORTED);
          break;
        default:
          // Handle other errors here
          console.error(error);
          break;
      }
    }
  };

  return {
    openDatabase,
    getDBUser,
    setDBUser,
    getDBErrorHandling,
  };
};
