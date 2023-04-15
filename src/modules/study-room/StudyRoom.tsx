// todo add typescript
// @ts-nocheck
import { PlusIcon } from '@heroicons/react/20/solid';
import PageWrapper from '@modules/common/components/page/PageWrapper';
import PinnedItems from '@modules/study-room/pinned-session/PinnedSessions';
import SessionsTable from '@modules/study-room/session/SessionsTable';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { type BrandButtonType } from '@common/components/button/BrandButton';
import SessionCreate, { type SessionType } from '@modules/study-room/session/SessionCreate';
import { sessionsWithNewSessionInOrder, sessionsOrderedByTopic } from '@modules/study-room/utils';

const pinnedItems = [
  {
    id: 1,
    text: 'Private Pilot Exam (Full)',
    lastUpdated: 'March 17, 2020',
    total: 21,
    type: 'question',
    className: 'bg-pink-600', // todo: temporary, remove this decision being made here and decide later in a static location
  },
  {
    id: 2,
    text: 'Code Test Study',
    lastUpdated: 'March 17, 2020',
    total: 8,
    type: 'question',
    className: 'bg-sky-600', // todo: temporary, remove this decision being made here and decide later in a static location
  },
  {
    id: 3,
    text: 'Private Pilot Exam (Full)',
    lastUpdated: 'March 17, 2020',
    total: 21,
    type: 'question',
    className: 'bg-red-500', // todo: temporary, remove this decision being made here and decide later in a static location
  },
  {
    id: 4,
    text: 'Code Test Study',
    lastUpdated: 'March 17, 2020',
    total: 8,
    type: 'question',
    className: 'bg-red-600', // todo: temporary, remove this decision being made here and decide later in a static location
  },
];

const SESSIONS_DATA = [
  {
    id: 1,
    name: 'Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad',
    topic: 'Private Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad ',
    questions: 12,
    color: 'bg-sky-600',
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
    topic: 'Instruments',
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
    color: 'bg-sky-600',
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
    color: 'bg-sky-600',
  },
  {
    id: 8,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-yellow-600',
  },
  {
    id: 9,
    name: 'Practice',
    topic: 'Commercial',
    questions: 6,
    color: 'bg-sky-600',
  },
  {
    id: 10,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-pink-700',
  },
  {
    id: 11,
    name: 'Pilot Exam Test #2',
    topic: 'Private Pilot',
    questions: 17,
    color: 'bg-sky-600',
  },
  {
    id: 12,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-yellow-600',
  },
  {
    id: 13,
    name: 'Practice',
    topic: 'Commercial',
    questions: 6,
    color: 'bg-sky-600',
  },
  {
    id: 14,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-pink-700',
  },
  {
    id: 15,
    name: 'Pilot Exam Test #2',
    topic: 'Private Pilot',
    questions: 17,
    color: 'bg-sky-600',
  },
  {
    id: 16,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-yellow-600',
  },
  {
    id: 17,
    name: 'Practice',
    topic: 'Commercial',
    questions: 6,
    color: 'bg-sky-600',
  },
  {
    id: 18,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-pink-700',
  },
  {
    id: 19,
    name: 'Pilot Exam Test #2',
    topic: 'Private Pilot',
    questions: 17,
    color: 'bg-sky-600',
  },
  {
    id: 20,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-yellow-600',
  },
  {
    id: 21,
    name: 'Practice',
    topic: 'Commercial',
    questions: 6,
    color: 'bg-sky-600',
  },
  {
    id: 22,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-pink-700',
  },
  {
    id: 23,
    name: 'Pilot Exam Test #2',
    topic: 'Private Pilot',
    questions: 17,
    color: 'bg-sky-600',
  },
  {
    id: 24,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-yellow-600',
  },
  // More plans...
];

const StudyRoom = () => {
  const [shouldShowSessionCreate, setShouldShowSectionCreate] = useState(false);
  // todo: get this from storage
  const [sessions, setSessions] = useState<SessionType[]>([]);

  useEffect(() => {
    setSessions([...sessionsOrderedByTopic(SESSIONS_DATA)]);
  }, []);

  // eslint-disable-next-line
  const handleCreateSession = (session: SessionType) => {
    const sessionsOrderedWithMatchingTopic = sessionsWithNewSessionInOrder(session, sessions);
    setSessions(sessionsOrderedWithMatchingTopic);

    // save in storage
  };

  // eslint-disable-next-line
  const handleStartSession = (id: string) => {
    // handle start session
  };

  // eslint-disable-next-line
  const handleEditSession = (id: string) => {
    // handle edit session
  };

  // eslint-disable-next-line
  const handleRemoveSession = (id: string) => {
    // handle remove session
  };

  const getHeaderActions = useCallback(
    () =>
      [
        {
          text: 'Create Session',
          srText: 'Create new session',
          icon: PlusIcon,
          buttonClassType: 'solid',
          handleOnClick: () => setShouldShowSectionCreate(true),
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
        <div className="flex flex-col space-y-4 mt-4">
          {shouldShowSessionCreate && (
            <SessionCreate
              handleSubmit={handleCreateSession}
              handleCancel={() => setShouldShowSectionCreate(false)}
            />
          )}
          <SessionsTable
            {...{
              sessions,
              handleStartSession,
              handleEditSession,
              handleRemoveSession,
            }}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default StudyRoom;
