import { getUniqId, capitalize } from '@common/utils';
import { getRandomBrandColor } from '@modules/study-room/utils';
import { SyntheticEvent, useState, useMemo, useEffect } from 'react';
import { SessionsTableDataType, SessionFormDetailsType } from '@modules/study-room/types';

export const useSessionAction = (
  handleSubmit: (value: SessionsTableDataType) => void,
  currentSession?: SessionsTableDataType
) => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [shouldShowEmptyNameWarning, setShouldShowEmptyNameWarning] = useState(false);
  const [shouldShowEmptyTopicWarning, setShouldShowEmptyTopicWarning] = useState(false);

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
    if (!name || !topic) return;

    const randomBrandColor = getRandomBrandColor('background');

    handleSubmit({
      id: currentSession?.id || getUniqId(),
      questions: currentSession?.questions || 0,
      color: currentSession?.color || randomBrandColor,
      textColor: currentSession?.textColor || `text-${randomBrandColor.slice(3)}`,
      name: capitalize(name),
      topic: capitalize(topic),
      isPinned: false,
    });

    setName('');
    setTopic('');
  };

  return {
    formDetails,
    handleFormSubmit,
  };
};
