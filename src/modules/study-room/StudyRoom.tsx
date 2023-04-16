// todo add typescript
// @ts-nocheck
import { PlusIcon } from '@heroicons/react/20/solid';
import PageWrapper from '@modules/common/components/page/PageWrapper';
import PinnedSessions, { type PinnedSessionType } from '@modules/study-room/session/PinnedSessions';
import SessionsTable from '@modules/study-room/session/SessionsTable';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { type BrandButtonType } from '@common/components/button/BrandButton';
import SessionAction, { type SessionType } from '@modules/study-room/session/SessionAction';
import {
  sessionsWithNewSessionInOrder,
  sessionsOrderedByTopic,
  getPinnedSessionsIds,
} from '@modules/study-room/utils';
import { removeObjectFromArray, getUniqId } from '@common/utils';

const PINNED_SESSIONS_DATA = [
  {
    id: '1',
    sessionId: '7',
    text: 'Pilot Exam Test #2',
    total: 17,
    className: 'bg-sky-600', // todo: temporary, remove this decision being made here and decide later in a static location
  },
  {
    id: '2',
    sessionId: '6',
    text: 'CM Codes',
    total: 3,
    className: 'bg-pink-600', // todo: temporary, remove this decision being made here and decide later in a static location
  },
  {
    id: '3',
    sessionId: '5',
    text: 'Practice',
    total: 6,
    className: 'bg-sky-600', // todo: temporary, remove this decision being made here and decide later in a static location
  },
  {
    id: '4',
    sessionId: '4',
    text: 'Instruments Test #2',
    total: 9,
    className: 'bg-yellow-600', // todo: temporary, remove this decision being made here and decide later in a static location
  },
];

const SESSIONS_DATA = [
  {
    id: '1',
    name: 'Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad',
    topic: 'Private Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad ',
    questions: 12,
    color: 'bg-sky-600',
    textColor: 'text-sky-600',
  },
  {
    id: '2',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 10,
    color: 'bg-yellow-600',
    textColor: 'text-yellow-600',
  },
  {
    id: '3',
    name: 'Instruments Test #1',
    topic: 'Instruments',
    questions: 24,
    color: 'bg-purple-700',
    textColor: 'text-purple-700',
  },
  {
    id: '4',
    name: 'Instruments Test #2',
    topic: 'Instruments',
    questions: 9,
    color: 'bg-yellow-600',
    textColor: 'text-yellow-600',
  },
  {
    id: '5',
    name: 'Practice',
    topic: 'Commercial',
    questions: 6,
    color: 'bg-sky-600',
    textColor: 'text-sky-600',
  },
  {
    id: '6',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-pink-700',
    textColor: 'text-pink-700',
  },
  {
    id: '7',
    name: 'Pilot Exam Test #2',
    topic: 'Private Pilot',
    questions: 17,
    color: 'bg-sky-600',
    textColor: 'text-sky-600',
  },
];

const StudyRoom = () => {
  const [shouldShowSessionAction, setShouldShowSessionAction] = useState(false);
  // todo: get this from storage
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [pinnedSessions] = useState<PinnedSessionType[]>(PINNED_SESSIONS_DATA);
  const [currentSession, setCurrentSession] = useState<SessionType>();

  const pinnedSessionIds = useMemo(
    () => (pinnedSessions.length ? getPinnedSessionsIds(pinnedSessions) : []),
    [pinnedSessions.length]
  );

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

  console.log('sessions:', sessions);
  const handleEditSession = (id: string) => {
    console.log(
      'in edit',
      id,
      'session:',
      sessions.find((session) => session.id === id),
      'sessions:',
      sessions
    );
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

  const handleUnpinSession = (sessionId: string) => {
    setPinnedSessions(removeObjectFromArray(pinnedSessions, sessionId, 'sessionId'));

    // save update in storage
  };

  const handlePinSession = (session: SessionType) => {
    const { id, questions, name, color } = session;

    const newPinnedSession = {
      id: getUniqId(),
      sessionId: id,
      total: questions,
      text: name,
      className: color,
    };

    if (pinnedSessions.length < 4) {
      setPinnedSessions([newPinnedSession, pinnedSessions]);
    }
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
        <PinnedSessions
          title="Pinned Sessions"
          sessions={pinnedSessions}
          {...{ handleUnpinSession, handleStartSession, handleEditSession }}
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
            pinnedSessions={pinnedSessionIds}
            {...{
              sessions,
              handleUnpinSession,
              handlePinSession,
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
