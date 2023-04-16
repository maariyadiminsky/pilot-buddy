import SessionItem from '@modules/study-room/session/SessionItem';
import { type SessionType } from '@modules/study-room/session/SessionAction';
import { isSessionPinned } from '@modules/study-room/utils';

interface SessionsTableProps {
  pinnedSessions: string[];
  sessions: SessionType[];
  handlePinSession: (session: SessionType) => void;
  handleUnpinSession: (id: string) => void;
  handleStartSession: (id: string) => void;
  handleEditSession: (id: string) => void;
  handleRemoveSession: (id: string) => void;
}

const SessionsTable = ({
  pinnedSessions,
  sessions,
  handlePinSession,
  handleUnpinSession,
  handleStartSession,
  handleEditSession,
  handleRemoveSession,
}: SessionsTableProps) => (
  <div className="px-4 sm:px-6 lg:px-8 h-[calc(100vh-200px)] overflow-y-auto smooth-scroll">
    <div className="-mx-4 mt-10 sm:mx-0 rounded-t-md">
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
              {...{
                ...session,
                index,
                handlePinSession,
                handleUnpinSession,
                handleStartSession,
                handleEditSession,
                handleRemoveSession,
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default SessionsTable;
