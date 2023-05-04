import { useState, useEffect } from 'react';

import { type SessionsTableDataType } from '@modules/study-room/types';
import { sessionsWithNewSessionInOrder, sessionsOrderedByTopic } from '@modules/study-room/utils';
import { removeObjectFromArray } from '@common/utils';
import { type ModalDataType } from '@common/components/modal/Modal';
import { useDatabase } from '@common/hooks';

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
  handleSubmitSessionPinTry: (value: SessionsTableDataType) => void,
  handleRemoveSessionPinTry: (value: string) => void,
  handleIsEditingPinnedSession: (value: boolean) => void,
  handleSetModalData: (value?: ModalDataType) => void,
  handleModalOpen?: (value: boolean) => void
) => {
  const [sessions, setSessions] = useState<SessionsTableDataType[]>();
  const [currentSession, setCurrentSession] = useState<SessionsTableDataType>();
  const [shouldShowSessionAction, setShouldShowSessionAction] = useState(false);

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
          setSessions([...sessionsOrderedByTopic(sessionsTableItems)]);
        }
      } catch (error) {
        if (error instanceof Error && error.message) {
          // todo: add error monitoring
          console.log(error);
        }
      }
    };

    getTableSessions();
  }, []);

  const handleAddSession = (session: SessionsTableDataType) => {
    if (!sessions) return null;

    // add session in correct order based on topic
    const SessionsWithNewSession = sessionsWithNewSessionInOrder(session, sessions);
    setSessions(SessionsWithNewSession);
    // return for methods that need this data before re-rendering
    return SessionsWithNewSession;
  };

  const handleSubmitSession = (session: SessionsTableDataType) => {
    // save in storage
    let hasError = null;
    try {
      addOrUpdateDBSessionTableItem(session);
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        console.log(error);
        // todo: add error monitoring
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
        // check if this was a pin edit if so, update the pin
        handleSubmitSessionPinTry(session);
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
        console.log(error);
        // todo: add error monitoring
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

  const handleRemoveSessionConfirm = (id: string) => {
    // before removing a session set confirm with user modal data
    handleSetModalData({
      ...REMOVE_SESSION_CONFIRMATION_STATIC_MODAL_DATA,
      handleConfirm: () => handleRemoveSession(id),
    });
    // open modal
    handleModalOpen?.(true);
  };

  const handleEditSession = (id: string, isPin?: boolean) => {
    if (!sessions) return;

    // in the case they were editing before and just hit edit again,
    // add back the last item user was editing.
    // This also acts as a cancel of the last edit.
    if (currentSession) {
      const currentSessions = handleAddSession(currentSession);
      if (!currentSessions) return;

      handleRemoveSessionFromUIOnly(id, currentSessions);
    } else {
      handleRemoveSessionFromUIOnly(id);
    }
    // set the session we are editing as the current session
    setCurrentSession(sessions.find((session) => session.id === id));
    // if this session also is a pin, when submitting
    // it will be added back to the pins as well
    handleIsEditingPinnedSession(Boolean(isPin));
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
