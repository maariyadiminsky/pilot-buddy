import DropdownMenu from '@common/components/DropdownMenu';

import { truthyString, getUniqId } from '@common/utils';
import { getInitials, getTypeAmount } from '@modules/study-room/components/pinned-session/utils';
import { useCallback } from 'react';

import { BookmarkSlashIcon } from '@heroicons/react/20/solid';

interface Item {
  id: number; // todo change to unique uuid
  total: number;
  text: string;
  lastUpdated: string;
  type: string;
  className?: string; // todo do not pass this here
}

interface PinnedSessionProps {
  title: string;
  items: Item[];
}

const PinnedSession = ({ title, items }: PinnedSessionProps) => {
  // eslint-disable-next-line
  const handleUnpinSession = (id: number) => {
    // handle unpin here
  };

  // eslint-disable-next-line
  const handleStartSession = (id: number) => {
    // handle start session
  };

  // eslint-disable-next-line
  const handleEditSession = (id: number) => {
    // handle edit session
  };

  const getDropdownActions = useCallback(
    (id: number) => [
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
    ],
    []
  );

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-sm font-medium text-gray-900">{title}</h2>
      <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {items.map(({ id, text, type, total, className }) => (
          <li key={getUniqId(text)} className="relative col-span-1 flex rounded-md shadow-sm">
            <div
              className={truthyString(
                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
                className
              )}
            >
              {getInitials(text)}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <button
                  type="button"
                  onClick={() => handleStartSession(id)}
                  className="font-medium text-gray-900 hover:text-sky-700"
                >
                  {text}
                </button>
                <p className="text-gray-500">{getTypeAmount(type, total)}</p>
              </div>
              <DropdownMenu name="pinned-items" actions={getDropdownActions(id)} wrapperId={id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PinnedSession;
