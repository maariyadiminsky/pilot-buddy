import { PlusIcon, BookmarkSlashIcon } from '@heroicons/react/20/solid';
import PageWrapper from '@modules/common/components/page/PageWrapper';
import PinnedSessions from '@modules/study-room/session/PinnedSessions';
import SessionsTable from '@modules/study-room/session/SessionsTable';
import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { type BrandButtonType } from '@common/components/button/BrandButton';
import SessionAction from '@modules/study-room/session/SessionAction';
import { sessionsWithNewSessionInOrder, sessionsOrderedByTopic } from '@modules/study-room/utils';
import { removeObjectFromArray } from '@common/utils';
import { useNavigate } from 'react-router-dom';
import Modal, { type ModalRef, type ModalDataType } from '@common/components/modal/Modal';
import EmptyDataAction from '@common/components/empty/EmptyDataAction';
import { type MenuOptionType } from '@common/components/dropdown/ActionMenu';
import { type SessionsTableDataType } from '@modules/study-room/types';
import { usePinnedSessions } from '@modules/study-room/hooks';

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
] as SessionsTableDataType[];

const StudyRoom = () => {
  const modalRef = useRef<ModalRef>(null);
  const [modalData, setModalData] = useState<ModalDataType>();

  const navigate = useNavigate();

  const [shouldShowSessionAction, setShouldShowSessionAction] = useState(false);
  // todo: get this from storage
  const [sessions, setSessions] = useState<SessionsTableDataType[]>([]);
  const [currentSession, setCurrentSession] = useState<SessionsTableDataType>();

  const {
    handleSetInitialPins,
    pinnedSessions,
    pinnedSessionIds,
    isSessionPinned,
    handlePinSession,
    handleUnpinSession,
    isEditingPinnedSession,
    setIsEditingPinnedSession,
  } = usePinnedSessions(setModalData, modalRef?.current?.setModalOpen);

  useEffect(() => {
    // todo: get sessionsData from storage if it exists here

    // set pinned sessions
    handleSetInitialPins(sessionsTableData);
    // set table session data ordered by topic for easier find
    setSessions([...sessionsOrderedByTopic(sessionsTableData)]);
  }, []);

  const handleAddSession = (session: SessionsTableDataType) => {
    const SessionsWithNewSession = sessionsWithNewSessionInOrder(session, sessions);
    setSessions(SessionsWithNewSession);
    return SessionsWithNewSession;
  };

  const handleSubmitSession = (session: SessionsTableDataType) => {
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

  const handleRemoveSession = (id: string, customSessions?: SessionsTableDataType[]) => {
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
