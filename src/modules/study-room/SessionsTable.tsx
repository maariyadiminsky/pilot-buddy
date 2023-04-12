import { truthyString } from '@common/utils';
import DropdownMenu from '@modules/common/components/dropdown/DropdownMenu';
import { PlayCircleIcon, PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';

import { useCallback } from 'react';

const sessions = [
  {
    id: 1,
    name: 'Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad',
    topic: 'Private Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad ',
    questions: 12,
    color: 'bg-sky-700',
  },
  {
    id: 2,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 10,
    color: 'bg-yellow-600',
  },
  {
    id: 3,
    name: 'Instruments Test #1',
    topic: 'Instruments ',
    questions: 24,
    color: 'bg-purple-700',
  },
  {
    id: 4,
    name: 'Instruments Test #2',
    topic: 'Instruments',
    questions: 9,
    color: 'bg-yellow-600',
  },
  {
    id: 5,
    name: 'Practice',
    topic: 'Commercial',
    questions: 6,
    color: 'bg-sky-700',
  },
  {
    id: 6,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-pink-700',
  },
  {
    id: 7,
    name: 'Pilot Exam Test #2',
    topic: 'Private Pilot',
    questions: 17,
    color: 'bg-sky-700',
  },
  {
    id: 8,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-yellow-600',
  },
  // More plans...
];

interface SessionsTableProps {
  handleCreateSession: () => void;
  handleStartSession: (id: number) => void;
  handleEditSession: (id: number) => void;
  handleRemoveSession: (id: number) => void;
  handleRemoveAllSessions: () => void;
}

// todo: add sorting
const SessionsTable = ({
  handleCreateSession,
  handleStartSession,
  handleEditSession,
  handleRemoveSession,
  handleRemoveAllSessions,
}: SessionsTableProps) => {
  const getDropdownActions = useCallback(
    () => [
      {
        text: 'Create',
        srText: 'Create new session',
        icon: PlusIcon,
        handleOnClick: () => handleCreateSession(),
      },
      {
        text: 'Delete all',
        srText: 'Remove all sessions',
        handleOnClick: () => handleRemoveAllSessions(),
      },
    ],
    []
  );
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-10 sm:mx-0 rounded-t-md">
        <table className="min-w-full divide-y-2 divide-sky-700">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6">
                <div className="flex flex-row items-center">
                  <DropdownMenu
                    name="pinned-items"
                    actions={getDropdownActions()}
                    useCustomPosition
                  />
                  Name
                </div>
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Topic
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Questions
              </th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(({ id, name, topic, questions, color }, planIdx) => (
              <tr key={id}>
                <td
                  className={truthyString(
                    planIdx === 0 ? '' : 'border-t border-gray-300',
                    'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                  )}
                >
                  <div className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700">
                    <span
                      className={truthyString(
                        'invisible sm:visible sm:mr-4 sm:h-2.5 sm:w-2.5 sm:rounded-full',
                        color
                      )}
                      aria-hidden="true"
                    />
                    <div className="font-medium antialiased text-gray-900 w-36 md:w-60 xl:w-72 truncate">
                      {name}
                    </div>
                  </div>
                  {/* mobile */}
                  <div className="mt-1 flex flex-col text-gray-700 xs:block sm:hidden">
                    <span className="xs:block sm:hidden">
                      <span className="sm:hidden xs:inline pl-2">·</span> {questions} Question
                      {questions > 1 ? 's' : ''}
                    </span>
                  </div>
                  {planIdx !== 0 ? (
                    <div className="absolute -top-px left-6 right-0 h-px bg-gray-300" />
                  ) : null}
                </td>
                {/* desktop */}
                <td
                  className={truthyString(
                    planIdx === 0 ? '' : 'border-t border-gray-300',
                    'px-3 py-3.5 text-sm text-gray-700 sm:table-cell'
                  )}
                >
                  <div className="w-36 lg:w-52 xl:w-72 truncate">{topic}</div>
                </td>
                <td
                  className={truthyString(
                    planIdx === 0 ? '' : 'border-t border-gray-300',
                    'hidden px-3 py-3.5 text-sm text-gray-700 sm:table-cell'
                  )}
                >
                  {questions}
                </td>
                <td
                  className={truthyString(
                    planIdx === 0 ? '' : 'border-t border-gray-300',
                    'relative py-3.5 pl-3 pr-4 text-center text-sm font-medium sm:pr-6'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => handleStartSession(id)}
                    className="inline-flex items-center bg-white mx-0 px-1 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    <PlayCircleIcon
                      className="h-6 w-6 xl:h-7 xl:w-7 flex-shrink-0 text-pink-700 hover:text-sky-700"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Start test</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditSession(id)}
                    className="inline-flex items-center bg-white mx-0 px-1 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    <PencilSquareIcon
                      className="h-6 w-6 xl:h-7 xl:w-7 flex-shrink-0 text-gray-600 hover:text-sky-700"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Edit test</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveSession(id)}
                    className="inline-flex items-center bg-white mx-0 px-1 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    <TrashIcon
                      className="h-6 w-6 xl:h-7 xl:w-7 flex-shrink-0 text-gray-600 hover:text-sky-700"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Delete test</span>
                  </button>
                  {planIdx !== 0 ? (
                    <div className="absolute -top-px left-0 right-6 h-px bg-gray-300" />
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SessionsTable;
