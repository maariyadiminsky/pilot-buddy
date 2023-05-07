import { captureException } from '@common/error-monitoring';
import { useVoiceOptions } from '@common/speech-synthesis/hooks/useVoiceOptions';
import { setupSpeechSynthesisUtterance } from '@common/speech-synthesis/utils';
import { type SelectMenuItemType } from '@common/types';
import { SESSION_DATA_INITIAL_STATE } from '@modules/session/constants';
import { type SettingsVoiceType } from '@modules/session/types';
import { SyntheticEvent, useState, useEffect, useCallback } from 'react';

// todo: issues on mobile - https://talkrapp.com/speechSynthesis.html
const DEFAULT_VOICE = SESSION_DATA_INITIAL_STATE.settings.voice;
export const useSpeechSynthesis = (
  text?: string,
  initialVoice?: SettingsVoiceType,
  setSettingsVoice?: (value: SettingsVoiceType) => void
) => {
  const [isPaused, setIsPaused] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance>();
  const [voice, setVoice] = useState<SettingsVoiceType>(DEFAULT_VOICE);

  const { voiceOptions } = useVoiceOptions();

  const handleVoicePause = () => {
    setIsPaused(true);
    window.speechSynthesis.pause();
  };

  const handleVoiceStop = useCallback(() => {
    setIsPaused(false);
    window.speechSynthesis.cancel();
  }, []);

  const handleVoiceChange = (voiceSelected: SelectMenuItemType) => {
    const data = { ...voice, voice: voiceSelected };
    setVoice(data);
    setSettingsVoice?.(data);
  };

  const handlePitchChange = (event: SyntheticEvent) => {
    const data = { ...voice, pitch: Number((event.target as HTMLInputElement).value) };
    setVoice(data);
    setSettingsVoice?.(data);
  };

  const handleRateChange = (event: SyntheticEvent) => {
    const data = { ...voice, rate: Number((event.target as HTMLInputElement).value) };
    setVoice(data);
    setSettingsVoice?.(data);
  };

  const handleVolumeChange = (event: SyntheticEvent) => {
    const data = { ...voice, volume: Number((event.target as HTMLInputElement).value) };
    setVoice(data);
    setSettingsVoice?.(data);
  };

  const handleVoicePlay = useCallback(
    (customText?: string) => {
      if (isPaused) {
        window.speechSynthesis.resume();
      } else if (speech) {
        if (customText) {
          speech.text = customText;
        }

        window.speechSynthesis.speak(speech);
      }

      setIsPaused(false);
    },
    [isPaused, speech]
  );

  useEffect(() => {
    const setup = () => {
      const voiceToSet = initialVoice || voice || DEFAULT_VOICE;
      const speechSynthesisUtterance = setupSpeechSynthesisUtterance(
        voiceToSet,
        voiceOptions,
        text
      );

      setSpeech(speechSynthesisUtterance);
      setVoice(voiceToSet);
    };

    const isInitialVoiceDifferentFromCurrentVoice =
      initialVoice &&
      (initialVoice.voice.name !== voice.voice.name ||
        initialVoice.volume !== voice.volume ||
        initialVoice.pitch !== voice.pitch ||
        initialVoice.rate !== voice.rate);

    if (voiceOptions?.length && (!speech || (voice && isInitialVoiceDifferentFromCurrentVoice))) {
      setup();
    }

    return () => {
      if (speech?.voice) {
        try {
          handleVoiceStop();
        } catch (error) {
          // illegal invocation error when component unmounts during development changes
          // because cancel loses original window.speechSynthesis context.
          if (error instanceof Error) {
            captureException(error);
          }
        }
      }
    };
  }, [text, voice, initialVoice, speech, voiceOptions, handleVoiceStop]);

  return {
    speech,
    voice,
    isPaused,
    voiceOptions,
    handleVoicePlay,
    handleVoicePause,
    handleVoiceStop,
    handleVoiceChange,
    handlePitchChange,
    handleRateChange,
    handleVolumeChange,
  };
};
