import { openDB, IDBPDatabase, IDBPObjectStore } from 'idb';
import { type SessionsTableDataType } from '@modules/study-room/types';
import { type SessionDataType } from '@modules/session/types';
import { useState, useCallback } from 'react';
import { getInitialSessionData } from '@modules/session/constants';

interface UserType {
  encryptedEmail: string;
  encryptedPassword: string;
}

export interface DatabaseType extends IDBPDatabase<DatabaseType> {
  users: IDBPObjectStore<UserType, string>;
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
  SESSION_NOT_FOUND: 'Session Not found',
  USER_NOT_FOUND: 'User not found',
  STORAGE_QUOTA: 'Storage quota exceeded',
};

// ---> important: parent component should wrap each method in a try/catch
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

  const addOrUpdateStoreItem = async (
    storeName: string,
    data: SessionsTableDataType | SessionDataType | UserType
  ) => {
    const db = await getDatabase();
    if (!db) throw new Error(DATABASE_ERROR.DATABASE_NOT_FOUND);

    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    // if key is not provided IndexedDB know to look by the key
    // provided when creating the store and update this way as well
    const item = await store.put(data);

    // Wait for the transaction to complete.
    await tx.done;

    return item;
  };

  const updateDbPartialDataOfItem = async (storeName: string, data: any, keyToFindItem: string) => {
    const db = await getDatabase();
    if (!db) throw new Error(DATABASE_ERROR.DATABASE_NOT_FOUND);

    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    // If the record with the same key exists, it will be updated.
    // Otherwise, a new record will be added.
    const existingItem = keyToFindItem ? await store.get(keyToFindItem) : null;
    if (existingItem) {
      const item = await store.put({ ...existingItem, ...data });
      await tx.done;
      return item;
    }

    return null;
  };

  const getDBAllStoreItems = async (storeName: string) => {
    const db = await getDatabase();
    if (!db) throw new Error(DATABASE_ERROR.DATABASE_NOT_FOUND);

    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const items = await store.getAll();
    await tx.done;

    return items || [];
  };

  const getDBStoreItem = async (storeName: string, keytoFindItem: string) => {
    const db = await getDatabase();
    if (!db) throw new Error(DATABASE_ERROR.DATABASE_NOT_FOUND);

    return await db.get(storeName, keytoFindItem);
  };

  const deleteDBItem = async (storeName: string, keyToFindItem: string) => {
    const db = await getDatabase();
    if (!db) throw new Error(DATABASE_ERROR.DATABASE_NOT_FOUND);

    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    const item = await store.get(keyToFindItem);
    if (!item) return null;

    store.delete(keyToFindItem);
    await tx.done;

    return item;
  };

  // session table
  const getAllDBSessionTableItems = async () =>
    await getDBAllStoreItems(DATABASE_STORE.SESSIONS_TABLE);

  const getDBSessionTableItem = async (sessionId: string) => {
    const session = await getDBStoreItem(DATABASE_STORE.SESSIONS_TABLE, sessionId);

    if (!session) {
      throw new Error(DATABASE_ERROR.SESSION_NOT_FOUND);
    }

    return session;
  };

  const addOrUpdateDBSessionTableItem = async (tableSessionData: SessionsTableDataType) =>
    await addOrUpdateStoreItem(DATABASE_STORE.SESSIONS_TABLE, tableSessionData);

  const updateDBPartialDataOfSessionTableItem = async (data: any, sessionId: string) =>
    await updateDbPartialDataOfItem(DATABASE_STORE.SESSIONS_TABLE, data, sessionId);

  const deleteDBSessionTableItem = async (sessionId: string) =>
    await deleteDBItem(DATABASE_STORE.SESSIONS_TABLE, sessionId);

  // sessions
  const getAllDBSessions = async () => await getDBAllStoreItems(DATABASE_STORE.SESSIONS);

  const addOrUpdateDBSessionItem = async (sessionData: SessionDataType) =>
    await addOrUpdateStoreItem(DATABASE_STORE.SESSIONS, sessionData);

  const getDBSession = async (sessionId: string) => {
    let session = await getDBStoreItem(DATABASE_STORE.SESSIONS, sessionId);

    if (!session) {
      const initialSessionData = getInitialSessionData(sessionId);
      session = await addOrUpdateDBSessionItem(initialSessionData);
    }

    return session;
  };

  const deleteDBSessionItem = async (sessionId: string) =>
    await deleteDBItem(DATABASE_STORE.SESSIONS, sessionId);

  // user
  const getDBUser = async (encryptedEmail: string) => {
    const user = await getDBStoreItem(DATABASE_STORE.USERS, encryptedEmail);

    if (!user) {
      throw new Error(DATABASE_ERROR.USER_NOT_FOUND);
    }

    return user;
  };

  const setDBUser = async (data: UserType) =>
    await addOrUpdateStoreItem(DATABASE_STORE.USERS, data);

  // error handling
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
          break;
      }

      console.error(error);
    }
  };

  return {
    openDatabase,
    getDBErrorHandling,
    getDBUser,
    setDBUser,
    getAllDBSessions,
    addOrUpdateDBSessionItem,
    getDBSession,
    deleteDBSessionItem,
    getAllDBSessionTableItems,
    getDBSessionTableItem,
    addOrUpdateDBSessionTableItem,
    updateDBPartialDataOfSessionTableItem,
    deleteDBSessionTableItem,
  };
};
