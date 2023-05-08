import { DATABASE_STORE, DATABASE_ERROR } from '@common/database/constants';
import { type DatabaseType } from '@common/database/types';
import { logError, captureException } from '@common/error-monitoring';
import { type UserType } from '@common/types';
import { AuthContext } from '@modules/auth';
import { getInitialSessionData } from '@modules/session/constants';
import { type SessionDataType } from '@modules/session/types';
import { type SessionsTableDataType } from '@modules/study-room/types';
import { type IDBPDatabase } from 'idb';
import { useCallback, useContext } from 'react';

// ---> important: parent component should wrap each method in a try/catch
export const useDatabaseLogic = (database: IDBPDatabase<DatabaseType> | null) => {
  const { userId } = useContext(AuthContext);

  const updateDbPartialDataOfItem = async (
    storeName: string,
    data: any,
    keyToFindItem: string,
    isSettings?: boolean
  ) => {
    if (!database) throw new Error(DATABASE_ERROR.DATABASE_NOT_FOUND);

    const tx = database.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    // If the record with the same key exists, it will be updated.
    // Otherwise, a new record will be added.
    const existingItem = keyToFindItem ? await store.get(keyToFindItem) : null;
    if (existingItem) {
      const dataToUpdate = isSettings
        ? { ...existingItem, settings: { ...existingItem.settings, ...data } }
        : { ...existingItem, ...data };

      const item = await store.put(dataToUpdate);
      await tx.done;
      return item;
    }

    return null;
  };

  const getDBAllStoreItems = useCallback(
    async (storeName: string) => {
      if (!database) throw new Error(DATABASE_ERROR.DATABASE_NOT_FOUND);

      const tx = database.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const items = await store.getAll();
      await tx.done;

      return items || [];
    },
    [database]
  );

  const getDBStoreItem = useCallback(
    async (storeName: string, keytoFindItem: string) => {
      if (!database) throw new Error(DATABASE_ERROR.DATABASE_NOT_FOUND);

      return await database.get(storeName, keytoFindItem);
    },
    [database]
  );

  const addOrUpdateStoreItem = useCallback(
    async (storeName: string, data: SessionsTableDataType | SessionDataType | UserType) => {
      if (!database) throw new Error(DATABASE_ERROR.DATABASE_NOT_FOUND);

      const tx = database.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);

      // if key is not provided IndexedDB know to look by the key
      // provided when creating the store and update this way as well
      const itemKeyConfirmation = await store.put(data);

      // Wait for the transaction to complete.
      await tx.done;

      return itemKeyConfirmation;
    },
    [database]
  );

  const deleteDBItem = async (storeName: string, keyToFindItem: string) => {
    if (!database) throw new Error(DATABASE_ERROR.DATABASE_NOT_FOUND);

    const tx = database.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    const item = await store.get(keyToFindItem);

    if (!item) return null;

    store.delete(keyToFindItem);
    await tx.done;

    return item;
  };

  // session table
  const getAllDBSessionTableItems = useCallback(async () => {
    if (!userId) return null;

    const tableSessions = await getDBAllStoreItems(DATABASE_STORE.SESSIONS_TABLE);
    return tableSessions.filter((session) => session.userId === userId);
  }, [userId, getDBAllStoreItems]);

  const getDBSessionTableItem = useCallback(
    async (sessionId: string) => {
      const session = await getDBStoreItem(DATABASE_STORE.SESSIONS_TABLE, sessionId);

      if (!session) {
        throw new Error(DATABASE_ERROR.SESSION_NOT_FOUND);
      }

      return session;
    },
    [getDBStoreItem]
  );

  const addOrUpdateDBSessionTableItem = async (tableSessionData: SessionsTableDataType) => {
    if (!userId) return null;

    if (tableSessionData?.userId && tableSessionData.userId !== userId) {
      throw new Error(DATABASE_ERROR.SESSION_NOT_FOUND);
    }

    return await addOrUpdateStoreItem(DATABASE_STORE.SESSIONS_TABLE, tableSessionData);
  };

  const updateDBPartialDataOfSessionTableItem = async (data: any, sessionId: string) => {
    const tableSession = await getDBSessionTableItem(sessionId);

    // Ensure the session belongs to the current user
    if (tableSession.userId !== userId) {
      throw new Error(DATABASE_ERROR.SESSION_NOT_FOUND);
    }

    await updateDbPartialDataOfItem(DATABASE_STORE.SESSIONS_TABLE, data, sessionId);
  };

  const deleteDBSessionTableItem = async (sessionId: string) => {
    const sessionTable = await getDBSessionTableItem(sessionId);

    if (sessionTable?.userId && sessionTable.userId !== userId) {
      throw new Error(DATABASE_ERROR.SESSION_NOT_FOUND);
    }

    await deleteDBItem(DATABASE_STORE.SESSIONS_TABLE, sessionId);
  };

  // sessions
  const getAllDBSessions = async () => {
    if (!userId) return null;

    const sessions = await getDBAllStoreItems(DATABASE_STORE.SESSIONS);
    return sessions.filter((session) => session.userId === userId);
  };

  const addOrUpdateDBSessionItem = useCallback(
    async (sessionData: SessionDataType) => {
      if (!userId) return null;

      if (sessionData?.userId && sessionData.userId !== userId) {
        throw new Error(DATABASE_ERROR.SESSION_NOT_FOUND);
      }

      return await addOrUpdateStoreItem(DATABASE_STORE.SESSIONS, sessionData);
    },
    [userId, addOrUpdateStoreItem]
  );

  const getDBSession = useCallback(
    async (sessionId: string) => {
      if (!userId) return null;

      let session = await getDBStoreItem(DATABASE_STORE.SESSIONS, sessionId);
      let isExistInTable = false;
      // if session doesn't exist in database, create it
      // but make sure it exists in table first!
      if (!session) {
        try {
          isExistInTable = await getDBSessionTableItem(sessionId);
        } catch (error) {
          if (error instanceof Error) {
            logError(error.message);
            throw new Error(error.message);
          }
        }

        // add to database and get the key confirming it was created
        // then search once more in database for it
        if (isExistInTable) {
          const initialSessionData = getInitialSessionData(sessionId, userId);
          const sessionKeyConfirmation = await addOrUpdateDBSessionItem(initialSessionData);

          if (sessionKeyConfirmation) {
            session = await getDBStoreItem(DATABASE_STORE.SESSIONS, sessionId);
          }
        }
      }

      // Ensure the session belongs to the current user
      if (session && session.userId === userId) {
        return session;
      }

      throw new Error(DATABASE_ERROR.SESSION_NOT_FOUND);
    },
    [userId, addOrUpdateDBSessionItem, getDBSessionTableItem, getDBStoreItem]
  );

  // if keyToReplace is added it will replace the entire value of the key
  // if not provided, it will add to existing data
  const updateDBPartialDataOfSession = async (
    data: any,
    sessionId: string,
    isSettings?: boolean
  ) => {
    const session = await getDBSession(sessionId);

    // Ensure the session belongs to the current user
    if (session?.userId !== userId) {
      throw new Error(DATABASE_ERROR.SESSION_NOT_FOUND);
    }

    return await updateDbPartialDataOfItem(DATABASE_STORE.SESSIONS, data, sessionId, isSettings);
  };

  const deleteDBSessionItem = async (sessionId: string) => {
    const session = await getDBSession(sessionId);

    if (session?.userId && session.userId !== userId) {
      throw new Error(DATABASE_ERROR.SESSION_NOT_FOUND);
    }

    await deleteDBItem(DATABASE_STORE.SESSIONS, sessionId);
  };

  // user
  const getDBUser = useCallback(async () => {
    if (!userId) return null;

    const user = await getDBStoreItem(DATABASE_STORE.USERS, userId);

    if (!user) {
      throw new Error(DATABASE_ERROR.USER_NOT_FOUND);
    }

    return user;
  }, [userId, getDBStoreItem]);

  const getDBUserByEmail = async (email: string) => {
    if (!database) throw new Error(DATABASE_ERROR.DATABASE_NOT_FOUND);

    const tx = database.transaction(DATABASE_STORE.USERS, 'readonly');
    const store = tx.objectStore(DATABASE_STORE.USERS);

    const emailIndex = store.index('email');
    const user = await emailIndex.get(email);

    await tx.done;

    if (!user) {
      throw new Error(DATABASE_ERROR.USER_NOT_FOUND);
    }

    return user;
  };

  const setDBUser = async (data: UserType) =>
    await addOrUpdateStoreItem(DATABASE_STORE.USERS, data);

  const getUserProfileData = useCallback(async () => await getDBUser(), [getDBUser]);

  const setUserProfileData = async (userProfile?: UserType) => {
    if (!userProfile || !userId) return;

    await setDBUser(userProfile);
  };

  // error handling
  // handleError can be a setter for handling errors on the frontend
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

      captureException(error);
    }
  };

  return {
    getDBErrorHandling,
    // user
    getDBUser,
    getDBUserByEmail,
    setDBUser,
    getUserProfileData,
    setUserProfileData,
    // sessions
    getAllDBSessions,
    getDBSession,
    updateDBPartialDataOfSession,
    deleteDBSessionItem,
    // table sessions
    getAllDBSessionTableItems,
    getDBSessionTableItem,
    addOrUpdateDBSessionTableItem,
    updateDBPartialDataOfSessionTableItem,
    deleteDBSessionTableItem,
  };
};
