import { useEffect } from 'react';
import { useSpeechSynthesis } from '@modules/speech-synthesis/hooks';
import { type SettingsVoiceType } from '@modules/session/types';

export const useSessionQuizVoice = (
  shouldReadOutLoud: boolean,
  lastQuestionId: string,
  voice?: SettingsVoiceType,
  previousQuestionId?: string,
  currentQuestionId?: string,
  currentQuestionText?: string
) => {
  const { handleVoicePlay, handleVoiceStop, voiceOptions } = useSpeechSynthesis(
    undefined,
    voice?.voice,
    voice?.rate,
    voice?.pitch,
    voice?.volume
  );

  useEffect(() => {
    // stop voice when user goes back to last page
    window.onpopstate = () => handleVoiceStop();
  }, []);

  useEffect(() => {
    // read once on load
    // and not last question item(edge case where page re-renders when they are in results page.)
    if (
      shouldReadOutLoud &&
      previousQuestionId === currentQuestionId &&
      currentQuestionId !== lastQuestionId &&
      voiceOptions?.length
    ) {
      handleVoicePlay(currentQuestionText);
    }
  }, [previousQuestionId, currentQuestionId, shouldReadOutLoud, voiceOptions?.length]);

  return { handleVoicePlay, handleVoiceStop };
};
