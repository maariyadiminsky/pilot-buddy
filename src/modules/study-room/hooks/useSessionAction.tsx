import { getUniqId, capitalize } from '@common/utils';
import { AuthContext } from '@modules/auth';
import { SessionsTableDataType, SessionFormDetailsType } from '@modules/study-room/types';
import { getRandomBrandColorData } from '@modules/study-room/utils';
import { SyntheticEvent, useState, useMemo, useEffect, useContext } from 'react';

export const useSessionAction = (
  handleSubmit: (value: SessionsTableDataType) => void,
  currentSession?: SessionsTableDataType
) => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [shouldShowEmptyNameWarning, setShouldShowEmptyNameWarning] = useState(false);
  const [shouldShowEmptyTopicWarning, setShouldShowEmptyTopicWarning] = useState(false);

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    if (currentSession) {
      setName(currentSession.name);
      setTopic(currentSession.topic);
    }
  }, [currentSession?.name, currentSession?.topic]);

  const formDetails = useMemo(
    () =>
      [
        {
          title: 'Name',
          id: 'name',
          getter: name,
          placeholder: 'Give the session a name.',
          showEmpty: shouldShowEmptyNameWarning,
          setter: (value) => {
            setName(value);
            setShouldShowEmptyNameWarning(false);
          },
        },
        {
          title: 'Topic',
          id: 'topic',
          getter: topic,
          placeholder: 'Same-topic sessions will be grouped.',
          showEmpty: shouldShowEmptyTopicWarning,
          setter: (value) => {
            setTopic(value);
            setShouldShowEmptyTopicWarning(false);
          },
        },
      ] as SessionFormDetailsType[],
    [name, topic, shouldShowEmptyNameWarning, shouldShowEmptyTopicWarning]
  );

  const handleFormSubmit = (event: SyntheticEvent<Element>) => {
    event.preventDefault();

    setShouldShowEmptyNameWarning(!name);
    setShouldShowEmptyTopicWarning(!topic);
    if (!userId || !name || !topic) return;

    const randomBrandColor = getRandomBrandColorData();

    handleSubmit({
      id: currentSession?.id || getUniqId(),
      userId,
      questions: currentSession?.questions || 0,
      color: currentSession?.color || randomBrandColor.background,
      textColor: currentSession?.textColor || randomBrandColor.text,
      name: capitalize(name),
      topic: capitalize(topic),
      isPinned: currentSession?.isPinned || false,
    });

    setName('');
    setTopic('');
  };

  return {
    formDetails,
    handleFormSubmit,
  };
};
