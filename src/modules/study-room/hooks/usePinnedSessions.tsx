import { type SessionsTableDataType, type PinnedSessionType } from '@modules/study-room/types';
import { useCallback, useState, useMemo } from 'react';
import { getPinnedSessionsIds, isSessionPinned } from '@modules/study-room/utils';
import { removeObjectFromArray, getUniqId } from '@common/utils';
import { type ModalDataType } from '@common/components/modal/Modal';
import { useDatabase } from '@common/hooks';

const createPin = ({ id, questions, name, color }: SessionsTableDataType) => ({
  id: getUniqId(),
  sessionId: id,
  text: name,
  total: questions,
  className: color,
});

const PIN_LIMIT_MODAL_DATA = {
  title: 'Pin Limit',
  children: (
    <div className="flex justify-center items-center">Apologies, session pin limit reached.</div>
  ),
  confirmChildren: 'Ok',
};

export const usePinnedSessions = (
  handleSetModalData: (value?: ModalDataType) => void,
  handleModalOpen?: (value: boolean) => void
) => {
  const [pinnedSessions, setPinnedSessions] = useState<PinnedSessionType[]>([]);
  const [isEditingPinnedSession, setIsEditingPinnedSession] = useState(false);

  const { addOrUpdateDBSessionTableItem, updateDBPartialDataOfSessionTableItem } = useDatabase();

  const pinnedSessionIds = useMemo(
    () => (pinnedSessions?.length ? getPinnedSessionsIds(pinnedSessions) : []),
    [pinnedSessions?.length]
  ) as string[];

  const handleSetInitialPins = useCallback((sessionsTableData: SessionsTableDataType[]) => {
    const pinnedTableSessions = sessionsTableData.filter(({ isPinned }) => isPinned);

    setPinnedSessions(pinnedTableSessions.map((session) => createPin(session)));
  }, []);

  const handlePinSession = (session: SessionsTableDataType) => {
    if (!pinnedSessions || pinnedSessions.length < 4) {
      // update storage
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
        if (!hasError) {
          setPinnedSessions([createPin(session), ...(pinnedSessions || [])]);
        }
      }
    } else {
      handleSetModalData(PIN_LIMIT_MODAL_DATA);
      handleModalOpen?.(true);
    }
  };

  const handleUnpinSession = (id: string) => {
    let hasError = null;
    try {
      updateDBPartialDataOfSessionTableItem({ isPinned: false }, id);
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        console.log(error);
        // todo: add error monitoring
      }
    } finally {
      if (!hasError) {
        setPinnedSessions(removeObjectFromArray(pinnedSessions, id, 'sessionId'));
      }
    }
  };

  const handleSubmitSessionPinTry = (session: SessionsTableDataType) => {
    if (isEditingPinnedSession) {
      handlePinSession(session);
      setIsEditingPinnedSession(false);
    }
  };

  const handleRemoveSessionPinTry = (id: string) => {
    if (isSessionPinned(id, pinnedSessionIds)) {
      setPinnedSessions(removeObjectFromArray(pinnedSessions, id, 'sessionId'));
    }
  };

  return {
    handleSetInitialPins,
    pinnedSessions,
    pinnedSessionIds,
    setPinnedSessions,
    handlePinSession,
    handleUnpinSession,
    setIsEditingPinnedSession,
    handleSubmitSessionPinTry,
    handleRemoveSessionPinTry,
  };
};
