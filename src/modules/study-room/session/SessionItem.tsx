import { truthyString } from '@common/utils';
import { type SessionsTableDataType } from '@modules/study-room/types';
import {
  PlayCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
} from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

interface SessionItemProps extends SessionsTableDataType {
  index: number;
  isSessionPinned: boolean;
  handlePinSession: (session: SessionsTableDataType) => void;
  handleUnpinSession: (id: string) => void;
  handleStartSession: (id: string) => void;
  handleEditSession: (id: string) => void;
  handleRemoveSession: (id: string) => void;
}

const SessionItem = ({
  id,
  name,
  topic,
  questions,
  textColor,
  color,
  isPinned,
  index,
  isSessionPinned,
  handlePinSession,
  handleUnpinSession,
  handleStartSession,
  handleEditSession,
  handleRemoveSession,
}: SessionItemProps) => {
  const Icon = isSessionPinned ? BookmarkSlashIcon : BookmarkIcon;

  const handlePinMethod = () => {
    if (isSessionPinned) {
      handleUnpinSession(id);
    } else {
      handlePinSession({ id, name, topic, questions, color, textColor, isPinned });
    }
  };

  return (
    <tr key={id}>
      <td
        className={truthyString(
          index === 0 ? '' : 'border-t border-gray-300',
          'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
        )}
      >
        <div className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 space-x-2">
          <button type="button" onClick={handlePinMethod}>
            <Icon
              className={truthyString('h-6 w-6 cursor-pointer hover:text-sky-600', textColor)}
              aria-hidden="true"
            />
          </button>
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
        {index !== 0 ? <div className="absolute -top-px left-6 right-0 h-px bg-gray-300" /> : null}
      </td>
      {/* desktop */}
      <td
        className={truthyString(
          index === 0 ? '' : 'border-t border-gray-300',
          'px-4 py-3.5 text-sm text-gray-500 sm:table-cell'
        )}
      >
        <div className="w-36 lg:w-52 xl:w-72 truncate">{topic}</div>
      </td>
      <td
        className={truthyString(
          index === 0 ? '' : 'border-t border-gray-300',
          'hidden px-3 py-3.5 text-sm text-gray-700 sm:table-cell font-semibold'
        )}
      >
        {questions}
      </td>
      <td
        className={truthyString(
          index === 0 ? '' : 'border-t border-gray-300',
          'relative py-3.5 pl-3 pr-4 text-center text-sm font-medium sm:pr-6'
        )}
      >
        <Link to={`/sessions/${id}/start`}>
          <button
            type="button"
            onClick={() => handleStartSession(id)}
            disabled={!questions}
            className="inline-flex items-center bg-white mx-0 px-1 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
          >
            <PlayCircleIcon
              className="h-6 w-6 xl:h-7 xl:w-7 flex-shrink-0 text-pink-600 enabled:hover:text-sky-600"
              aria-hidden="true"
            />
            <span className="sr-only">Start session</span>
          </button>
        </Link>
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
        <Link to={`/sessions/${id}`}>
          <button type="button">
            <ArrowTopRightOnSquareIcon
              className="h-6 w-6 xl:h-7 xl:w-7 flex-shrink-0 text-gray-600 hover:text-sky-600"
              aria-hidden="true"
            />
          </button>
        </Link>
        {index !== 0 ? <div className="absolute -top-px left-0 right-6 h-px bg-gray-300" /> : null}
      </td>
    </tr>
  );
};
export default SessionItem;
