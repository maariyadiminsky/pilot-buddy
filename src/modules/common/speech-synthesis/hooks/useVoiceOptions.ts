import { APPROVED_VOICES } from '@common/speech-synthesis/constants';
import { useState, useEffect, useCallback } from 'react';

export const useVoiceOptions = () => {
  const [voiceOptions, setVoiceOptions] = useState<SpeechSynthesisVoice[]>([]);

  const loadVoices = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    if (voices?.length) {
      const approvedVoices = voices.filter(({ name }) => APPROVED_VOICES.includes(name));
      setVoiceOptions(approvedVoices);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (voiceOptions.length) {
        clearInterval(timer);
      } else {
        loadVoices();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [voiceOptions, loadVoices]);

  return { voiceOptions };
};
