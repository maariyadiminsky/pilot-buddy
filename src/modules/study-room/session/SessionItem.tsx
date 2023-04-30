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
import SessionItemIconButton from '@modules/study-room/session/SessionItemIconButton';

interface SessionItemProps extends SessionsTableDataType {
  index: number;
  isSessionPinned: boolean;
  handlePinSession: (session: SessionsTableDataType) => void;
  handleUnpinSession: (id: string) => void;
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
        <SessionItemIconButton
          icon={PlayCircleIcon}
          srText="Start Session"
          link={`/sessions/${id}/start`}
          isDisabled={!questions}
          color="text-pink-600"
        />
        <SessionItemIconButton
          icon={PencilSquareIcon}
          srText="Edit Session"
          handleOnClick={() => handleEditSession(id)}
        />
        <SessionItemIconButton
          icon={TrashIcon}
          srText="Delete Session"
          handleOnClick={() => handleRemoveSession(id)}
        />
        <SessionItemIconButton
          icon={ArrowTopRightOnSquareIcon}
          srText="Open Session"
          link={`/sessions/${id}`}
        />
        {index !== 0 ? <div className="absolute -top-px left-0 right-6 h-px bg-gray-300" /> : null}
      </td>
    </tr>
  );
};
export default SessionItem;
