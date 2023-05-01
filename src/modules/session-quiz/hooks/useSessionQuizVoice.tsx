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
  const { handleVoicePlay, handleVoiceStop } = useSpeechSynthesis(
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
    // voice setting is on and page loaded and
    // not last question item(edge case where page re-renders when they are in results page.)
    if (
      shouldReadOutLoud &&
      previousQuestionId === currentQuestionId &&
      currentQuestionId !== lastQuestionId
    ) {
      // todo - bug - plays default voice first
      // I suspect because window.speechSynthesis.getVoices() hasn't completed loading.
      handleVoicePlay(currentQuestionText);
    }
  }, [previousQuestionId, currentQuestionId]);

  return { handleVoicePlay, handleVoiceStop };
};
