import { DATABASE_NAME, DATABASE_STORE } from '@common/database/constants';
import { type DatabaseType } from '@common/database/types';
import { openDB, type IDBPDatabase } from 'idb';
import { ReactNode, FC, useState, useEffect, useMemo, useCallback, createContext } from 'react';

interface DatabaseContextType {
  database: IDBPDatabase<DatabaseType> | null;
}

interface DatabaseContextProps {
  children: ReactNode;
}

export const DatabaseContext = createContext<DatabaseContextType>({
  database: null,
});
export const DatabaseProvider: FC<DatabaseContextProps> = ({ children }) => {
  const [database, setDatabase] = useState<IDBPDatabase<DatabaseType> | null>(null);

  const setup = useCallback(async () => {
    // Create the database if it doesn't exist
    await openDB<DatabaseType>(DATABASE_NAME, 1, {
      // make sure all required stores exist
      upgrade(theDb) {
        if (!theDb.objectStoreNames.contains(DATABASE_STORE.USERS)) {
          const userStore = theDb.createObjectStore(DATABASE_STORE.USERS, { keyPath: 'id' });
          // allows to search user by email
          userStore.createIndex('email', 'email', { unique: true });
        }

        if (!theDb.objectStoreNames.contains(DATABASE_STORE.SESSIONS_TABLE)) {
          theDb.createObjectStore(DATABASE_STORE.SESSIONS_TABLE, { keyPath: 'id' });
        }

        if (!theDb.objectStoreNames.contains(DATABASE_STORE.SESSIONS)) {
          theDb.createObjectStore(DATABASE_STORE.SESSIONS, { keyPath: 'id' });
        }
      },
    });

    // Open the database, return database
    const db = await openDB<DatabaseType>(DATABASE_NAME, 1);
    setDatabase(db);
  }, []);

  useEffect(() => {
    setup();
  }, [setup]);

  const contextValues = useMemo(
    () => ({
      database,
    }),
    [database]
  );

  return <DatabaseContext.Provider value={contextValues}>{children}</DatabaseContext.Provider>;
};
