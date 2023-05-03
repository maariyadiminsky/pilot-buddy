import { PlusIcon, BookmarkSlashIcon } from '@heroicons/react/20/solid';
import PageWrapper from '@modules/common/components/page/PageWrapper';
import PinnedSessions from '@modules/study-room/session/PinnedSessions';
import SessionsTable from '@modules/study-room/session/SessionsTable';
import { useMemo, useState, useRef } from 'react';
import { type BrandButtonType } from '@common/components/button/BrandButton';
import SessionAction from '@modules/study-room/session/SessionAction';
import { useNavigate } from 'react-router-dom';
import Modal, { type ModalRef, type ModalDataType } from '@common/components/modal/Modal';
import EmptyDataAction from '@common/components/empty/EmptyDataAction';
import { type MenuOptionType } from '@common/components/dropdown/ActionMenu';
import { usePinnedSessions, useTableSessions } from '@modules/study-room/hooks';

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
    setIsEditingPinnedSession,
    handleSubmitSessionPinTry,
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
    handleSubmitSessionPinTry,
    handleRemoveSessionPinTry,
    setIsEditingPinnedSession,
    setModalData,
    modalRef?.current?.setModalOpen
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
        <Modal ref={modalRef} {...modalData} />
      </div>
    </PageWrapper>
  );
};

export default StudyRoom;
