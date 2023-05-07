import { type IDBPDatabase, IDBPObjectStore } from 'idb';
import { type SessionDataType } from '@modules/session/types';
import { type SessionsTableDataType } from '@modules/study-room/types';
import { type UserType } from '@common/types';

export interface DatabaseType extends IDBPDatabase<DatabaseType> {
  users: IDBPObjectStore<UserType, string>;
  sessions: IDBPObjectStore<SessionsTableDataType, string>;
  sessionData: IDBPObjectStore<SessionDataType, string>;
}
