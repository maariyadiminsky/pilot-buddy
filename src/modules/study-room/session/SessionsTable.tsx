import { truthyString } from '@common/utils';
import { PlayCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { type SessionType } from './SessionCreate';

interface SessionsTableProps {
  sessions: SessionType[];
  handleStartSession: (id: string) => void;
  handleEditSession: (id: string) => void;
  handleRemoveSession: (id: string) => void;
}

// todo: add sorting
const SessionsTable = ({
  sessions,
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
                <div className="mt-1 flex flex-col text-gray-700 xs:block sm:hidden ">
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
                  'px-3 py-3.5 text-sm text-gray-500 sm:table-cell'
                )}
              >
                <div className="w-36 lg:w-52 xl:w-72 truncate">{topic}</div>
              </td>
              <td
                className={truthyString(
                  planIdx === 0 ? '' : 'border-t border-gray-300',
                  'hidden px-3 py-3.5 text-sm text-gray-700 sm:table-cell font-semibold'
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
                    className="h-6 w-6 xl:h-7 xl:w-7 flex-shrink-0 text-pink-600 hover:text-sky-600"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Start session</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleEditSession(id)}
                  className="inline-flex items-center bg-white mx-0 px-1 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                >
                  <PencilSquareIcon
                    className="h-6 w-6 xl:h-7 xl:w-7 flex-shrink-0 text-gray-600 hover:text-sky-600"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Edit session</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveSession(id)}
                  className="inline-flex items-center bg-white mx-0 px-1 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                >
                  <TrashIcon
                    className="h-6 w-6 xl:h-7 xl:w-7 flex-shrink-0 text-gray-600 hover:text-sky-600"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Delete session</span>
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
export default SessionsTable;
