// todo add typescript
// @ts-nocheck
import PageWrapper from '@common/components/PageWrapper';
import PinnedItems from '@modules/study-room/components/pinned-session/PinnedSessions';
import SessionsTable from '@modules/study-room/components/SessionsTable';

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
  const handleAddSession = () => {
    // handle add session
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

  return (
    <PageWrapper title="Study Room">
      <PinnedItems
        title="Pinned Sessions"
        items={pinnedItems}
        {...{ handleStartSession, handleEditSession }}
      />
      <SessionsTable
        {...{
          handleAddSession,
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
