// todo add typescript
// @ts-nocheck
import { PlusIcon, BookmarkSlashIcon } from '@heroicons/react/20/solid';
import PageWrapper from '@modules/common/components/page/PageWrapper';
import PinnedSessions, { type PinnedSessionType } from '@modules/study-room/session/PinnedSessions';
import SessionsTable from '@modules/study-room/session/SessionsTable';
import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { type BrandButtonType } from '@common/components/button/BrandButton';
import SessionAction, { type SessionType } from '@modules/study-room/session/SessionAction';
import {
  sessionsWithNewSessionInOrder,
  sessionsOrderedByTopic,
  getPinnedSessionsIds,
  isSessionPinned,
} from '@modules/study-room/utils';
import { removeObjectFromArray, getUniqId } from '@common/utils';
import { useNavigate } from 'react-router-dom';
import Modal, { type ModalRef, type ModalDataType } from '@common/components/modal/Modal';
import EmptyDataAction from '@common/components/empty/EmptyDataAction';

const PINNED_SESSIONS_DATA = [
  {
    id: '1',
    sessionId: '7',
    text: 'Pilot Exam Test #2',
    total: 17,
    className: 'bg-sky-600',
  },
  {
    id: '2',
    sessionId: '6',
    text: 'CM Codes',
    total: 3,
    className: 'bg-pink-600',
  },
  {
    id: '3',
    sessionId: '5',
    text: 'Practice',
    total: 6,
    className: 'bg-sky-600',
  },
  {
    id: '4',
    sessionId: '4',
    text: 'Instruments Test #2',
    total: 9,
    className: 'bg-yellow-600',
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
  const modalRef = useRef<ModalRef>(null);
  const [modalData, setModalData] = useState<ModalDataType>();

  const navigate = useNavigate();

  const [shouldShowSessionAction, setShouldShowSessionAction] = useState(false);
  // todo: get this from storage
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [pinnedSessions, setPinnedSessions] = useState<PinnedSessionType[]>(PINNED_SESSION_DATA);
  const [currentSession, setCurrentSession] = useState<SessionType>();

  const pinnedSessionIds = useMemo(
    () => (pinnedSessions?.length ? getPinnedSessionsIds(pinnedSessions) : []),
    [pinnedSessions?.length]
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
    setModalData(undefined);
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

  const handlePinSession = (session: SessionType) => {
    const { id, questions, name, color } = session;

    const newPinnedSession = {
      id: getUniqId(),
      sessionId: id,
      total: questions,
      text: name,
      className: color,
    };

    if (!pinnedSessions || pinnedSessions.length < 4) {
      setPinnedSessions([newPinnedSession, ...(pinnedSessions || [])]);
    } else {
      setModalData({
        title: 'Pin Limit',
        children: (
          <div className="flex justify-center items-center">
            Apologies, session pin limit reached.
          </div>
        ),
        confirmChildren: 'Ok',
      });

      modalRef.current.setModalOpen(true);
    }
  };

  const handleUnpinSession = (sessionId: string) => {
    setPinnedSessions(removeObjectFromArray(pinnedSessions, sessionId, 'sessionId'));

    // save update in storage
  };

  const handleRemoveSession = (id: string, customSessions?: SessionType[]) => {
    setSessions(removeObjectFromArray(customSessions || sessions, id, 'id'));

    if (isSessionPinned(id, pinnedSessionIds)) {
      handleUnpinSession(id);
    }

    // save update in storage
  };

  const handleRemoveConfirm = (id: string) => {
    setModalData({
      title: 'Are you sure?',
      children: (
        <div className="flex justify-center items-center">
          All questions and answers will be deleted.
        </div>
      ),
      handleConfirm: () => handleRemoveSession(id),
      confirmChildren: "Yes, I'm sure",
      cancelChildren: 'Nevermind',
    });

    modalRef.current.setModalOpen(true);
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

  const getDropdownActions = (id: string) => [
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
  ];

  const headerActions = useMemo(() => getHeaderActions(), []);

  return (
    <PageWrapper title="Study Room" headerActions={headerActions}>
      <div className="h-full min-w-full">
        {pinnedSessions?.length ? (
          <PinnedSessions
            title="Pinned Sessions"
            sessions={pinnedSessions}
            getDropdownActions={getDropdownActions}
            handleEditSession={handleEditSession}
          />
        ) : null}
        <div className="flex flex-col space-y-4 mt-4">
          {shouldShowSessionAction && (
            <SessionAction
              currentSession={currentSession}
              handleSubmit={handleSubmitSession}
              handleCancel={handleCancelAction}
            />
          )}
          {sessions?.length ? (
            <SessionsTable
              pinnedSessions={pinnedSessionIds}
              handleRemoveSession={handleRemoveConfirm}
              {...{
                sessions,
                handleUnpinSession,
                handlePinSession,
                handleStartSession,
                handleEditSession,
              }}
            />
          ) : null}
          {!sessions?.length && !shouldShowSessionAction && (
            <EmptyDataAction
              title="Add your first session"
              description="Let's create your first study session!"
              buttonText="Add Session"
              handleOnClick={() => setShouldShowSessionAction(true)}
            />
          )}
        </div>
        <Modal ref={modalRef} {...modalData} />
      </div>
    </PageWrapper>
  );
};

export default StudyRoom;
