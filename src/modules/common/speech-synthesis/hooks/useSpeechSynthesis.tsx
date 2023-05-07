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

  // window.speechSynthesis.getVoices() has a loading delay
  useEffect(() => {
    let cancelFn: () => void;

    const setup = () => {
      const { cancel } = window.speechSynthesis;
      cancelFn = cancel;
      const voiceToSet = initialVoice || voice || DEFAULT_VOICE;
      const speechSynthesisUtterance = setupSpeechSynthesisUtterance(
        voiceToSet,
        voiceOptions,
        text
      );

      setSpeech(speechSynthesisUtterance);

      if (voiceToSet.voice.name !== voice?.voice.name) {
        setVoice(voiceToSet);
      }
    };

    if (voiceOptions?.length && !speech) {
      setup();
    }

    return () => {
      if (speech?.voice) {
        try {
          cancelFn?.();
        } catch (error) {
          // illegal invocation error when component unmounts during development changes
          // because cancel loses original window.speechSynthesis context.
          if (error instanceof Error) {
            captureException(error);
          }
        }
      }
    };
  }, [text, voice, initialVoice, speech, voiceOptions]);

  const handleVoicePlay = useCallback(
    (customText?: string) => {
      if (isPaused) {
        window.speechSynthesis.resume();
      } else if (customText) {
        // in the case window context is lost or want to pass custom text
        const voiceToSet = initialVoice || voice;
        const speechSynthesisUtterance = setupSpeechSynthesisUtterance(
          voiceToSet,
          voiceOptions,
          customText
        );

        setSpeech(speechSynthesisUtterance);

        window.speechSynthesis.speak(speechSynthesisUtterance);
      } else if (speech?.voice && voice) {
        const speechSynthesisUtterance = setupSpeechSynthesisUtterance(
          voice,
          voiceOptions,
          undefined,
          speech
        );

        window.speechSynthesis.speak(speechSynthesisUtterance);
      }

      setIsPaused(false);
    },
    /*
      speech causing re-render issues.
      I need to pass full speech to setupSpeechSynthesisUtterance,
      although there is no need to re-render as a result.
    */
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [isPaused, initialVoice, voice, speech?.voice, text, voiceOptions]
  );

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
