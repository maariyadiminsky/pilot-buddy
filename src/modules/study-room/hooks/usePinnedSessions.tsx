import { captureException } from '@common/error-monitoring';
import { useDatabase } from '@common/hooks';
import { PageContext } from '@common/page';
import { type ModalDataType } from '@common/types';
import { removeObjectFromArray, getUniqId } from '@common/utils';
import { type SessionsTableDataType, type PinnedSessionType } from '@modules/study-room/types';
import { getPinnedSessionsIds, isSessionPinned } from '@modules/study-room/utils';
import { useCallback, useState, useMemo, useContext } from 'react';

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

  const { addOrUpdateDBSessionTableItem, updateDBPartialDataOfSessionTableItem } = useDatabase();
  const { setShouldUpdatePinnedSessions } = useContext(PageContext);

  const pinnedSessionIds = useMemo(
    () => (pinnedSessions?.length ? getPinnedSessionsIds(pinnedSessions) : []),
    [pinnedSessions?.length]
  ) as string[];

  const handleSetInitialPins = useCallback((sessionsTableData: SessionsTableDataType[]) => {
    const pinnedTableSessions = sessionsTableData.filter(({ isPinned }) => isPinned);
    setPinnedSessions(pinnedTableSessions.map((session) => createPin(session)));
  }, []);

  const handleRemoveSessionPinTry = (id: string) => {
    if (isSessionPinned(id, pinnedSessionIds)) {
      setPinnedSessions(removeObjectFromArray(pinnedSessions, id, 'sessionId'));
    }
  };

  const handlePinSession = async (session: SessionsTableDataType) => {
    const existingPin = pinnedSessions.find(({ sessionId }) => sessionId === session.id);

    if (existingPin || !pinnedSessions || (!existingPin && pinnedSessions.length < 4)) {
      // since the name is the only thing that can change on a pin
      // if it's the same there is no need to update the pin
      if (existingPin && existingPin.text === session.name) return;

      // update storage
      let hasError = null;
      try {
        await addOrUpdateDBSessionTableItem(session);
      } catch (error) {
        hasError = error;
        if (error instanceof Error) {
          captureException(error);
        }
      } finally {
        if (!hasError) {
          // either find existing pin or create a new one
          const pin = existingPin || createPin(session);
          // remove the pin from pinned session data
          const pinnedSessionsWithoutPin = removeObjectFromArray(
            pinnedSessions,
            session.id,
            'sessionId'
          );
          // set pin as new pin with updated name
          const pins = [
            ...(pinnedSessionsWithoutPin || []),
            { ...pin, text: session?.name || pin.text },
          ];

          setPinnedSessions(pins);
          setShouldUpdatePinnedSessions(true);
        }
      }
    } else {
      handleSetModalData(PIN_LIMIT_MODAL_DATA);
      handleModalOpen?.(true);
    }
  };

  const handleUnpinSession = async (id: string) => {
    let hasError = null;
    try {
      await updateDBPartialDataOfSessionTableItem({ isPinned: false }, id);
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        captureException(error);
      }
    } finally {
      if (!hasError) {
        handleRemoveSessionPinTry(id);
        setShouldUpdatePinnedSessions(true);
      }
    }
  };

  return {
    handleSetInitialPins,
    pinnedSessions,
    pinnedSessionIds,
    setPinnedSessions,
    handlePinSession,
    handleUnpinSession,
    handleRemoveSessionPinTry,
  };
};
