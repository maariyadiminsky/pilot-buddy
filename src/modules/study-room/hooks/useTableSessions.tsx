import { useDatabase } from '@common/database/hooks';
import { captureException } from '@common/error-monitoring';
import { type ModalDataType } from '@common/types';
import { removeObjectFromArray } from '@common/utils';
import { type SessionsTableDataType } from '@modules/study-room/types';
import {
  sessionsWithNewSessionInOrder,
  sessionsOrderedByTopic,
  isSessionPinned,
} from '@modules/study-room/utils';
import { useState, useEffect, useMemo } from 'react';

const REMOVE_SESSION_CONFIRMATION_STATIC_MODAL_DATA = {
  title: 'Are you sure?',
  children: (
    <div className="flex justify-center items-center">
      All questions and answers will be deleted.
    </div>
  ),
  confirmChildren: "Yes, I'm sure",
  cancelChildren: 'Nevermind',
};

export const useTableSessions = (
  handleSetInitialPins: (value: SessionsTableDataType[]) => void,
  pinnedSessionIds: string[],
  handlePinSession: (value: SessionsTableDataType) => void,
  handleRemoveSessionPinTry: (value: string) => void,
  handleSetModalData: (value?: ModalDataType) => void,
  handleModalOpen?: (value: boolean) => void
) => {
  const [sessions, setSessions] = useState<SessionsTableDataType[]>();
  const [currentSession, setCurrentSession] = useState<SessionsTableDataType>();
  const [shouldShowSessionAction, setShouldShowSessionAction] = useState(false);

  // while I could update all sessions with getTableSessions method
  // when a session is pinned/unpinned, in this case it is not
  // performant considering a user could have many sessions in table
  const isCurrentSessionPinned = useMemo(
    () => (currentSession ? isSessionPinned(currentSession.id, pinnedSessionIds) : false),
    [currentSession, pinnedSessionIds]
  );

  const {
    getAllDBSessionTableItems,
    addOrUpdateDBSessionTableItem,
    deleteDBSessionTableItem,
    deleteDBSessionItem,
  } = useDatabase();

  useEffect(() => {
    const getTableSessions = async () => {
      try {
        const sessionsTableItems = await getAllDBSessionTableItems();

        if (sessionsTableItems) {
          // set pinned sessions
          handleSetInitialPins(sessionsTableItems);
          // set table session data ordered by topic for easier find
          setSessions([
            ...(sessionsTableItems?.length
              ? sessionsOrderedByTopic(sessionsTableItems)
              : sessionsTableItems),
          ]);
        }
      } catch (error) {
        if (error instanceof Error && error.message) {
          captureException(error);
        }
      }
    };

    getTableSessions();
  }, [handleSetInitialPins, getAllDBSessionTableItems]);

  const handleAddSession = (session: SessionsTableDataType) => {
    if (!sessions) return null;
    // add session in correct order based on topic
    const SessionsWithNewSession = sessionsWithNewSessionInOrder(session, sessions);
    setSessions(SessionsWithNewSession);
    // return for methods that need this data before re-rendering
    return SessionsWithNewSession;
  };

  const handleSubmitSession = async (session: SessionsTableDataType) => {
    // save in storage
    let hasError = null;
    try {
      await addOrUpdateDBSessionTableItem({
        ...session,
        isPinned: isCurrentSessionPinned,
      });
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        captureException(error);
      }
    } finally {
      if (!hasError && sessions) {
        // update sessions
        setSessions(sessionsWithNewSessionInOrder(session, sessions));
        // reset current session
        setCurrentSession(undefined);
        // hide session add/edit form
        setShouldShowSessionAction(false);
        // reset modal data if it had data previously
        handleSetModalData(undefined);

        if (isCurrentSessionPinned) {
          // check if this was a pin edit if so, update the pin
          handlePinSession(session);
        }
      }
    }
  };

  const handleCancelAction = () => {
    // if editing a current session reset it
    // and add it back into the table
    if (currentSession) {
      handleAddSession(currentSession);
      setCurrentSession(undefined);
    }
    // hide session add/edit form
    setShouldShowSessionAction(false);
  };

  const handleRemoveSessionFromUIOnly = (id: string, customSessions?: SessionsTableDataType[]) => {
    if (!sessions) return;

    setSessions(removeObjectFromArray(customSessions || sessions, id, 'id'));
  };

  const handleRemoveSession = (id: string, customSessions?: SessionsTableDataType[]) => {
    // remove from storage
    let hasError = null;
    try {
      deleteDBSessionTableItem(id);
      deleteDBSessionItem(id);
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        captureException(error);
      }
    } finally {
      if (!hasError) {
        // remove session
        handleRemoveSessionFromUIOnly(id, customSessions);
        // if session was a pin, remove it there too
        handleRemoveSessionPinTry(id);
      }
    }
  };

  const handleRemoveSessionConfirm = (id: string, questions: number) => {
    // no need to confirm removal if there are no questions
    if (questions === 0) {
      handleRemoveSession(id);
      return;
    }

    // before removing a session set confirm with user modal data
    handleSetModalData({
      ...REMOVE_SESSION_CONFIRMATION_STATIC_MODAL_DATA,
      handleConfirm: () => handleRemoveSession(id),
    });
    // open modal
    handleModalOpen?.(true);
  };

  const handleEditSession = (id: string) => {
    if (!sessions) return;
    // Acts as a cancel of the last edit.
    if (currentSession) {
      const currentSessions = handleAddSession(currentSession);
      if (!currentSessions) return;

      handleRemoveSessionFromUIOnly(id, currentSessions);
    } else {
      handleRemoveSessionFromUIOnly(id);
    }
    // set the session we are editing as the current session
    setCurrentSession(sessions.find((session) => session.id === id));
    // handleRemoveSessionPinTry(id);
    // hide session add/edit form
    setShouldShowSessionAction(true);
  };

  return {
    sessions,
    setSessions,
    currentSession,
    setCurrentSession,
    shouldShowSessionAction,
    setShouldShowSessionAction,
    handleEditSession,
    handleSubmitSession,
    handleCancelAction,
    handleRemoveSession,
    handleRemoveSessionConfirm,
  };
};
