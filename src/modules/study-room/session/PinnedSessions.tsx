import { ActionMenu } from '@common/dropdown';
import { type MenuOptionType } from '@common/types';
import { truthyString } from '@common/utils';
import { type PinnedSessionType } from '@modules/study-room/types';
import { getInitials, getTextBasedOnAmount } from '@modules/study-room/utils';
import { FC } from 'react';

interface PinnedSessionsProps {
  title: string;
  sessions: PinnedSessionType[];
  getDropdownActions: (id: string, questionsCount: number) => MenuOptionType[];
}

export const PinnedSessions: FC<PinnedSessionsProps> = ({
  title,
  sessions,
  getDropdownActions,
}) => (
  <div className="mt-6 px-4 sm:px-6 lg:px-8">
    <h2 className="text-sm font-medium text-gray-900">{title}</h2>
    <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      {sessions.map(({ id, sessionId, text, total, className }) => (
        <li key={id} className="col-span-1 flex rounded-md shadow-sm">
          <div
            className={truthyString(
              'flex w-16 antialiased first-letter:flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
              className || 'bg-gray-900'
            )}
          >
            {getInitials(text)}
          </div>
          <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white pr-1">
            <div className="flex-1 items-center justify-between truncate px-4 py-2 text-sm">
              {text}
              <p className="text-gray-500">{getTextBasedOnAmount('question', total)}</p>
            </div>
            <ActionMenu
              name="pinned-items"
              actions={getDropdownActions(sessionId, total)}
              useCustomPosition
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
);
