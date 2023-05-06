import { SessionItem } from '@modules/study-room/session';
import { type SessionsTableDataType } from '@modules/study-room/types';
import { isSessionPinned } from '@modules/study-room/utils';
import { FC } from 'react';

interface SessionsTableProps {
  currentSessionId?: string;
  pinnedSessions: string[];
  sessions: SessionsTableDataType[];
  handlePinSession: (session: SessionsTableDataType) => void;
  handleUnpinSession: (id: string) => void;
  handleEditSession: (id: string) => void;
  handleRemoveSession: (id: string, questionsCount: number) => void;
}

export const SessionsTable: FC<SessionsTableProps> = ({
  currentSessionId,
  pinnedSessions,
  sessions,
  handlePinSession,
  handleUnpinSession,
  handleEditSession,
  handleRemoveSession,
}) => (
  <div className="px-4 sm:px-6 lg:px-8 h-full ">
    <div className="-mx-4 mt-10 sm:mx-0 rounded-t-md border border-slate-50 px-1 py-3 rounded-lg overflow-y-auto smooth-scroll h-[calc(100vh-100px)]">
      <table className="min-w-full divide-y divide-sky-600">
        <thead className="sticky backdrop-blur backdrop-filter bg-white bg-opacity-75 top-0 z-10 min-w-full border-separate border-spacing-0">
          <tr>
            <th scope="col" className="sm:pl-8 py-3.5 text-left text-sm text-gray-900">
              Name
            </th>
            <th
              scope="col"
              className="sm: pl-4 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Topic
            </th>
            <th
              scope="col"
              className="hidden py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Questions
            </th>
            {/* empty element created so blur applies on all "titles" */}
            <th
              aria-label="empty line for table"
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            />
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <SessionItem
              key={session.id}
              isSessionPinned={isSessionPinned(session.id, pinnedSessions)}
              isEditingCurrentSession={currentSessionId === session.id}
              {...{
                ...session,
                index,
                handlePinSession,
                handleUnpinSession,
                handleEditSession,
                handleRemoveSession,
                currentSessionId,
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
