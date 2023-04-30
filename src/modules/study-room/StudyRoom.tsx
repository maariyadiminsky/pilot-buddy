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
import { type MenuOptionType } from '@common/components/dropdown/ActionMenu';

const sessionsTableData = [
  {
    id: '1',
    name: 'Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad',
    topic: 'Private Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad ',
    questions: 12,
    color: 'bg-sky-600',
    textColor: 'text-sky-600',
    isPinned: false,
  },
  {
    id: '2',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 0,
    color: 'bg-yellow-600',
    textColor: 'text-yellow-600',
    isPinned: true,
  },
  {
    id: '3',
    name: 'Instruments Test #1',
    topic: 'Instruments',
    questions: 24,
    color: 'bg-purple-600',
    textColor: 'text-purple-600',
    isPinned: false,
  },
  {
    id: '4',
    name: 'Instruments Test #2',
    topic: 'Instruments',
    questions: 9,
    color: 'bg-yellow-600',
    textColor: 'text-yellow-600',
    isPinned: false,
  },
  {
    id: '5',
    name: 'Practice',
    topic: 'Commercial',
    questions: 6,
    color: 'bg-sky-600',
    textColor: 'text-sky-600',
    isPinned: true,
  },
  {
    id: '6',
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-pink-700',
    textColor: 'text-pink-700',
    isPinned: true,
  },
  {
    id: '7',
    name: 'Pilot Exam Test #2',
    topic: 'Private Pilot',
    questions: 17,
    color: 'bg-sky-600',
    textColor: 'text-sky-600',
    isPinned: true,
  },
];

const StudyRoom = () => {
  const modalRef = useRef<ModalRef>(null);
  const [modalData, setModalData] = useState<ModalDataType>();

  const navigate = useNavigate();

  const [shouldShowSessionAction, setShouldShowSessionAction] = useState(false);
  // todo: get this from storage
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [pinnedSessions, setPinnedSessions] = useState<PinnedSessionType[]>([]);
  const [currentSession, setCurrentSession] = useState<SessionType>();
  const [isEditingPinnedSession, setIsEditingPinnedSession] = useState(false);

  const pinnedSessionIds = useMemo(
    () => (pinnedSessions?.length ? getPinnedSessionsIds(pinnedSessions) : []),
    [pinnedSessions?.length]
  );

  useEffect(() => {
    // set pinned sessions
    const pinnedTableSessions = sessionsTableData.filter(({ isPinned }) => isPinned);
    const createPinnedSessionData = pinnedTableSessions.map(({ id, name, questions, color }) => ({
      id: getUniqId(),
      sessionId: id,
      text: name,
      total: questions,
      className: color,
    }));
    setPinnedSessions(createPinnedSessionData);

    // set table session data ordered by topic for easier find
    setSessions([...sessionsOrderedByTopic(sessionsTableData)]);
  }, []);

  const handleAddSession = (session: SessionType) => {
    const SessionsWithNewSession = sessionsWithNewSessionInOrder(session, sessions);
    setSessions(SessionsWithNewSession);
    return SessionsWithNewSession;
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

      modalRef.current?.setModalOpen(true);
    }
  };

  const handleUnpinSession = (sessionId: string) => {
    setPinnedSessions(removeObjectFromArray(pinnedSessions, sessionId, 'sessionId'));

    // save update in storage
  };

  const handleSubmitSession = (session: SessionType) => {
    setSessions(sessionsWithNewSessionInOrder(session, sessions));
    setCurrentSession(undefined);
    setShouldShowSessionAction(false);
    setModalData(undefined);

    if (isEditingPinnedSession) {
      handlePinSession(session);
      setIsEditingPinnedSession(false);
    }

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

    modalRef.current?.setModalOpen(true);
  };

  const handleEditSession = (id: string, isPin?: boolean) => {
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
    setIsEditingPinnedSession(Boolean(isPin));
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

  const getDropdownActions = (id: string, questionsCount: number) =>
    [
      {
        text: 'Unpin',
        srText: 'Unpin session',
        icon: BookmarkSlashIcon,
        handleOnClick: () => handleUnpinSession(id),
      },
      questionsCount
        ? {
            text: 'Start',
            srText: 'Start session',
            handleOnClick: () => navigate(`/sessions/${id}/start`),
          }
        : undefined,
      {
        text: 'Edit',
        srText: 'Edit session',
        handleOnClick: () => handleEditSession(id, true),
      },
      {
        text: 'View',
        srText: 'View session',
        handleOnClick: () => navigate(`/sessions/${id}`),
      },
    ].filter((menuItem) => menuItem) as MenuOptionType[];

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
