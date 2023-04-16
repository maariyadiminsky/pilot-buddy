import ActionMenu from '@common/components/dropdown/ActionMenu';

import { truthyString } from '@common/utils';
import { getInitials, getTextBasedOnAmount } from '@modules/study-room/utils';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { BookmarkSlashIcon } from '@heroicons/react/20/solid';

export interface PinnedSessionItem {
  id: string;
  sessionId: string;
  total: number;
  text: string;
  className?: string;
}

interface PinnedSessionProps {
  title: string;
  sessions: PinnedSessionItem[];
  handleUnpinSession: (id: string) => void;
  handleStartSession: (id: string) => void;
  handleEditSession: (id: string) => void;
}

export type PinnedSessionType = PinnedSessionItem;

const PinnedSession = ({
  title,
  sessions,
  handleUnpinSession,
  handleStartSession,
  handleEditSession,
}: PinnedSessionProps) => {
  const navigate = useNavigate();

  const getDropdownActions = useCallback(
    (id: string) => [
      {
        text: 'Unpin',
        srText: 'Unpin session',
        icon: BookmarkSlashIcon,
        handleOnClick: () => handleUnpinSession(id),
      },
      {
        text: 'Start',
        srText: 'Start session',
        handleOnClick: () => handleStartSession(id),
      },
      {
        text: 'Edit',
        srText: 'Edit session',
        handleOnClick: () => handleEditSession(id),
      },
      {
        text: 'View',
        srText: 'View session',
        handleOnClick: () => navigate(`/sessions/${id}`),
      },
    ],
    []
  );

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-sm font-medium text-gray-900">{title}</h2>
      <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {sessions.map(({ id, sessionId, text, total, className }) => (
          <li key={id} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={truthyString(
                'flex w-16 antialiased first-letter:flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
                className
              )}
            >
              {getInitials(text)}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white pr-1">
              <div className="flex-1 items-center justify-between truncate px-4 py-2 text-sm">
                <button
                  type="button"
                  onClick={() => handleStartSession(sessionId)}
                  className="font-medium text-gray-900 hover:text-sky-600 antialiased"
                >
                  {text}
                </button>
                <p className="text-gray-500">{getTextBasedOnAmount('question', total)}</p>
              </div>
              <ActionMenu
                name="pinned-items"
                actions={getDropdownActions(sessionId)}
                useCustomPosition
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PinnedSession;
