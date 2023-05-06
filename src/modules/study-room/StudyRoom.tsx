import { PlusIcon, BookmarkSlashIcon } from '@heroicons/react/20/solid';
import PinnedSessions from '@modules/study-room/session/PinnedSessions';
import SessionsTable from '@modules/study-room/session/SessionsTable';
import { useMemo, useEffect, useState, useRef, useContext } from 'react';
import { PageContext } from '@common/page/PageProvider';
import { type BrandButtonType } from '@modules/common/button/BrandButton';
import SessionAction from '@modules/study-room/session/SessionAction';
import { useNavigate } from 'react-router-dom';
import Modal, { type ModalRef, type ModalDataType } from '@common/modal/Modal';
import EmptyDataAction from '@common/empty/EmptyDataAction';
import { type MenuOptionType } from '@common/dropdown/ActionMenu';
import { usePinnedSessions, useTableSessions } from '@modules/study-room/hooks';
import Loader from '@common/loader/Loader';

const StudyRoom = () => {
  const modalRef = useRef<ModalRef>(null);
  const [modalData, setModalData] = useState<ModalDataType>();

  const navigate = useNavigate();

  const {
    handleSetInitialPins,
    pinnedSessions,
    pinnedSessionIds,
    handlePinSession,
    handleUnpinSession,
    handleRemoveSessionPinTry,
  } = usePinnedSessions(setModalData, modalRef?.current?.setModalOpen);

  const {
    sessions,
    currentSession,
    shouldShowSessionAction,
    setShouldShowSessionAction,
    handleEditSession,
    handleSubmitSession,
    handleCancelAction,
    handleRemoveSessionConfirm,
  } = useTableSessions(
    handleSetInitialPins,
    pinnedSessionIds,
    handlePinSession,
    handleRemoveSessionPinTry,
    setModalData,
    modalRef?.current?.setModalOpen
  );

  const getPinDropdownActions = (id: string, questionsCount: number) =>
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
        handleOnClick: () => !currentSession && handleEditSession(id),
      },
      {
        text: 'View',
        srText: 'View session',
        handleOnClick: () => navigate(`/sessions/${id}`),
      },
    ].filter((menuItem) => menuItem) as MenuOptionType[];

  const headerActions = useMemo(
    () =>
      [
        {
          text: 'Create Session',
          srText: 'Create new session',
          icon: PlusIcon,
          buttonClassType: 'solid',
          isDisabled: shouldShowSessionAction,
          handleOnClick: () => setShouldShowSessionAction(true),
        },
      ] as BrandButtonType[],
    [shouldShowSessionAction]
  );

  const { setPageTitle, setPageHeaderActions } = useContext(PageContext);

  useEffect(() => {
    setPageTitle('StudyRoom');
    setPageHeaderActions(headerActions);
  }, []);

  if (!sessions) {
    return (
      <div className="flex justify-center items-center xl:h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="h-full min-w-full bg-inherit">
        {pinnedSessions?.length ? (
          <PinnedSessions
            title="Pinned Sessions"
            sessions={pinnedSessions}
            getDropdownActions={getPinDropdownActions}
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
              currentSessionId={currentSession?.id}
              pinnedSessions={pinnedSessionIds}
              handleRemoveSession={handleRemoveSessionConfirm}
              {...{
                sessions,
                handleUnpinSession,
                handlePinSession,
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
      </div>
      <Modal ref={modalRef} {...modalData} />
    </>
  );
};

export default StudyRoom;
