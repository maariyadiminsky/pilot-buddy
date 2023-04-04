// todo add typescript
// @ts-nocheck
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import PageWrapper from '@modules/common/components/page/PageWrapper';
import PinnedItems from '@modules/study-room/components/pinned-session/PinnedSessions';
import SessionsTable from '@modules/study-room/components/SessionsTable';
import { useCallback, useMemo } from 'react';

const pinnedItems = [
  {
    id: 1,
    text: 'Private Pilot Exam (Full)',
    lastUpdated: 'March 17, 2020',
    total: 21,
    type: 'question',
    className: 'bg-yellow-600', // todo: temporary, remove this decision being made here and decide later in a static location
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
  const routeToAddSessionScreen = () => {
    // go to add session component and route
  };

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

  const handleRemoveAllSessions = () => {
    // remove all sessions
  };

  const getHeaderActions = useCallback(
    () => [
      {
        text: 'Create',
        srText: 'Create new session',
        icon: PlusCircleIcon,
        buttonType: 'solid',
        handleOnClick: () => routeToAddSessionScreen(),
      },
    ],
    []
  );

  const headerActions = useMemo(() => getHeaderActions(), []);

  return (
    <PageWrapper title="Study Room" headerActions={headerActions}>
      <PinnedItems
        title="Pinned Sessions"
        items={pinnedItems}
        {...{ handleStartSession, handleEditSession }}
      />
      <SessionsTable
        {...{
          handleCreateSession,
          handleStartSession,
          handleEditSession,
          handleRemoveSession,
          handleRemoveAllSessions,
        }}
      />
    </PageWrapper>
  );
};

export default StudyRoom;
