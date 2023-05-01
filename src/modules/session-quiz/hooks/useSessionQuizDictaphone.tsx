import { useState, useEffect } from 'react';

export const useSessionQuizDictaphone = (
  transcript: string,
  handleSetCurrentQuizAnswer: (value: string) => void,
  clearModalData: () => void
) => {
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);

  useEffect(() => {
    if (isMicrophoneOn) {
      handleSetCurrentQuizAnswer(transcript);
    }
  }, [isMicrophoneOn, transcript]);

  const handleSetMicrophoneOn = (value: boolean) => {
    clearModalData();
    setIsMicrophoneOn(value);
  };

  return { isMicrophoneOn, handleSetMicrophoneOn };
};
