import { useState, useEffect } from 'react';

import { type SessionsTableDataType } from '@modules/study-room/types';
import { sessionsWithNewSessionInOrder, sessionsOrderedByTopic } from '@modules/study-room/utils';
import { removeObjectFromArray } from '@common/utils';
import { type ModalDataType } from '@common/components/modal/Modal';

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
  const [sessions, setSessions] = useState<SessionsTableDataType[]>([]);
  const [currentSession, setCurrentSession] = useState<SessionsTableDataType>();
  const [shouldShowSessionAction, setShouldShowSessionAction] = useState(false);

  useEffect(() => {
    // todo: get sessionsTableData from storage if it exists there
    if (sessionsTableData) {
      // set pinned sessions
      handleSetInitialPins(sessionsTableData);
      // set table session data ordered by topic for easier find
      setSessions([...sessionsOrderedByTopic(sessionsTableData)]);
    }
  }, []);

  const handleAddSession = (session: SessionsTableDataType) => {
    // add session in correct order based on topic
    const SessionsWithNewSession = sessionsWithNewSessionInOrder(session, sessions);
    setSessions(SessionsWithNewSession);
    // return for methods that need this data before re-rendering
    return SessionsWithNewSession;
  };

  const handleSubmitSession = (session: SessionsTableDataType) => {
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
    // todo: save in storage
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

  const handleRemoveSession = (id: string, customSessions?: SessionsTableDataType[]) => {
    // remove session
    setSessions(removeObjectFromArray(customSessions || sessions, id, 'id'));
    // if session was a pin, remove it there too
    handleRemoveSessionPinTry(id);
    // todo: save update in storage
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
    // in the case they were editing before and just hit edit again,
    // add back the last item user was editing.
    // This also acts as a cancel of the last edit.
    if (currentSession) {
      const currentSessions = handleAddSession(currentSession);
      handleRemoveSession(id, currentSessions);
    } else {
      handleRemoveSession(id);
    }
    // set the session we are editing as the current session
    setCurrentSession(sessions.find((session) => session.id === id));
    // if this session also is a pin, when submitting
    // it will be added back to the pins as well
    handleIsEditingPinnedSession(Boolean(isPin));
    // hide session add/edit form
    setShouldShowSessionAction(true);
    // todo: save update in storage
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
