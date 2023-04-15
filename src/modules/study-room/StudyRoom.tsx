// todo add typescript
// @ts-nocheck
import { PlusIcon } from '@heroicons/react/20/solid';
import PageWrapper from '@modules/common/components/page/PageWrapper';
import PinnedItems from '@modules/study-room/pinned-session/PinnedSessions';
import SessionsTable from '@modules/study-room/session/SessionsTable';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { type BrandButtonType } from '@common/components/button/BrandButton';
import SessionAction, { type SessionType } from '@modules/study-room/session/SessionAction';
import { sessionsWithNewSessionInOrder, sessionsOrderedByTopic } from '@modules/study-room/utils';
import { removeObjectFromArray } from '@common/utils';

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
    id: '1',
    name: 'Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad',
    topic: 'Private Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad ',
    questions: 12,
    color: 'bg-sky-600',
  },
  {
    id: '2',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 10,
    color: 'bg-yellow-600',
  },
  {
    id: '3',
    name: 'Instruments Test #1',
    topic: 'Instruments',
    questions: 24,
    color: 'bg-purple-700',
  },
  {
    id: '4',
    name: 'Instruments Test #2',
    topic: 'Instruments',
    questions: 9,
    color: 'bg-yellow-600',
  },
  {
    id: '5',
    name: 'Practice',
    topic: 'Commercial',
    questions: 6,
    color: 'bg-sky-600',
  },
  {
    id: '6',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-pink-700',
  },
  {
    id: '7',
    name: 'Pilot Exam Test #2',
    topic: 'Private Pilot',
    questions: 17,
    color: 'bg-sky-600',
  },
  {
    id: '8',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-yellow-600',
  },
  {
    id: '9',
    name: 'Practice',
    topic: 'Commercial',
    questions: 6,
    color: 'bg-sky-600',
  },
  {
    id: '10',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-pink-700',
  },
  {
    id: '11',
    name: 'Pilot Exam Test #2',
    topic: 'Private Pilot',
    questions: 17,
    color: 'bg-sky-600',
  },
  {
    id: '12',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-yellow-600',
  },
  {
    id: '13',
    name: 'Practice',
    topic: 'Commercial',
    questions: 6,
    color: 'bg-sky-600',
  },
  {
    id: '14',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-pink-700',
  },
  {
    id: '15',
    name: 'Pilot Exam Test #2',
    topic: 'Private Pilot',
    questions: 17,
    color: 'bg-sky-600',
  },
  {
    id: '16',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-yellow-600',
  },
  {
    id: '17',
    name: 'Practice',
    topic: 'Commercial',
    questions: 6,
    color: 'bg-sky-600',
  },
  {
    id: '18',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-pink-700',
  },
  {
    id: '19',
    name: 'Pilot Exam Test #2',
    topic: 'Private Pilot',
    questions: 17,
    color: 'bg-sky-600',
  },
  {
    id: '20',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-yellow-600',
  },
  {
    id: '21',
    name: 'Practice',
    topic: 'Commercial',
    questions: 6,
    color: 'bg-sky-600',
  },
  {
    id: '22',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-pink-700',
  },
  {
    id: '23',
    name: 'Pilot Exam Test #2',
    topic: 'Private Pilot',
    questions: 17,
    color: 'bg-sky-600',
  },
  {
    id: '24',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-yellow-600',
  },
  // More plans...
];

const StudyRoom = () => {
  const [shouldShowSessionAction, setShouldShowSessionAction] = useState(false);
  // todo: get this from storage
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [currentSession, setCurrentSession] = useState<SessionType>();

  // sessions should be ordered by topic for easier search
  useEffect(() => {
    setSessions([...sessionsOrderedByTopic(SESSIONS_DATA)]);
  }, []);

  const handleAddSession = (session: SessionSessionType) => {
    const SessionsWithNewSession = sessionsWithNewSessionInOrder(session, sessions);
    setSessions(SessionsWithNewSession);
    return SessionsWithNewSession;
  };

  const handleSubmitSession = (session: SessionType) => {
    setSessions(sessionsWithNewSessionInOrder(session, sessions));
    setCurrentSession(undefined);
    setShouldShowSessionAction(false);
    // save in storage
  };

  const handleCancelAction = () => {
    if (currentSession) {
      handleAddSession(currentSession);
      setCurrentSession(undefined);
    }

    setShouldShowSessionAction(false);
  };

  // eslint-disable-next-line
  const handleStartSession = (id: string) => {
    // handle start session
  };

  const handleRemoveSession = (id: string, customSessions?: SessionType[]) => {
    setSessions(removeObjectFromArray(customSessions || sessions, id, 'id'));

    // save update in storage
  };

  const handleEditSession = (id: string) => {
    // in the case they were editing before and just hit edit again
    // add back the last item user was editing.
    // This also acts as a cancel of the last edit.
    if (currentSession) {
      const currentSessions = handleAddSession(currentSession);
      handleRemoveSession(id, currentSessions);
    } else {
      handleRemoveSession(id);
    }

    setCurrentSession(sessions.find((session) => session.id === id));
    setShouldShowSessionAction(true);

    // save update in storage
  };

  const getHeaderActions = useCallback(
    () =>
      [
        {
          text: 'Create Session',
          srText: 'Create new session',
          icon: PlusIcon,
          buttonClassType: 'solid',
          handleOnClick: () => setShouldShowSessionAction(true),
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
          {shouldShowSessionAction && (
            <SessionAction
              currentSession={currentSession}
              handleSubmit={handleSubmitSession}
              handleCancel={handleCancelAction}
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
