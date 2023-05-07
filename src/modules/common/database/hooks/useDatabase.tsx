import { DatabaseContext } from '@common/database/DatabaseProvider';
import { useDatabaseLogic } from '@common/database/hooks/useDatabaseLogic';
import { useContext } from 'react';

// intention of this hook is to easily call useDatabase
// without needing to setup context and getting database constant each time
export const useDatabase = () => {
  const { database } = useContext(DatabaseContext);
  const {
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
  } = useDatabaseLogic(database);

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
