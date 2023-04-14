// todo add typescript
// @ts-nocheck
import { PlusIcon } from '@heroicons/react/20/solid';
import PageWrapper from '@modules/common/components/page/PageWrapper';
import PinnedItems from '@modules/study-room/pinned-session/PinnedSessions';
import SessionsTable from '@modules/study-room/SessionsTable';
import { useCallback, useMemo } from 'react';
import { type BrandButtonType } from '@common/components/button/BrandButton';

const pinnedItems = [
  {
    id: 1,
    text: 'Private Pilot Exam (Full)',
    lastUpdated: 'March 17, 2020',
    total: 21,
    type: 'question',
    className: 'bg-pink-700', // todo: temporary, remove this decision being made here and decide later in a static location
  },
  {
    id: 2,
    text: 'Code Test Study',
    lastUpdated: 'March 17, 2020',
    total: 8,
    type: 'question',
    className: 'bg-sky-700', // todo: temporary, remove this decision being made here and decide later in a static location
  },
  {
    id: 1,
    text: 'Private Pilot Exam (Full)',
    lastUpdated: 'March 17, 2020',
    total: 21,
    type: 'question',
    className: 'bg-red-700', // todo: temporary, remove this decision being made here and decide later in a static location
  },
  {
    id: 2,
    text: 'Code Test Study',
    lastUpdated: 'March 17, 2020',
    total: 8,
    type: 'question',
    className: 'bg-red-600', // todo: temporary, remove this decision being made here and decide later in a static location
  },
];

const StudyRoom = () => {
  // eslint-disable-next-line
  const handleCreateSession = () => {
    // handle add session
    // pass data here eventually
  };

  // eslint-disable-next-line
  const handleStartSession = (id: number) => {
    // handle start session
  };

  // eslint-disable-next-line
  const handleEditSession = (id: number) => {
    // handle edit session
  };

  // eslint-disable-next-line
  const handleRemoveSession = (id: number) => {
    // handle remove session
  };

  const getHeaderActions = useCallback(
    () =>
      [
        {
          text: 'Create',
          srText: 'Create new session',
          icon: PlusIcon,
          buttonClassType: 'solid',
          handleOnClick: () => handleCreateSession(),
        },
      ] as BrandButtonType[],
    []
  );

  const headerActions = useMemo(() => getHeaderActions(), []);

  return (
    <PageWrapper title="Study Room" headerActions={headerActions}>
      <div className="h-full min-w-full">
        <PinnedItems
          title="Pinned Sessions"
          items={pinnedItems}
          {...{ handleStartSession, handleEditSession }}
        />
        <SessionsTable
          {...{
            handleStartSession,
            handleEditSession,
            handleRemoveSession,
          }}
        />
      </div>
    </PageWrapper>
  );
};

export default StudyRoom;
