import { SyntheticEvent, useState, useEffect } from 'react';
import { type SelectMenuItemType } from '@common/dropdown/SelectMenu';
import { APPROVED_VOICES } from '@modules/speech-synthesis/constants';
import { type SettingsVoiceType } from '@modules/session/types';
import { SESSION_DATA_INITIAL_STATE } from '@modules/session/constants';
import { captureException } from '@common/error-monitoring';

// todo: issues on mobile - https://talkrapp.com/speechSynthesis.html
export const useSpeechSynthesis = (
  text?: string,
  initialVoice?: SettingsVoiceType,
  setSettingsVoice?: (value: SettingsVoiceType) => void
) => {
  const [isPaused, setIsPaused] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance>();
  const [voice, setVoice] = useState<SettingsVoiceType>(SESSION_DATA_INITIAL_STATE.settings.voice);
  const [voiceOptions, setVoiceOptions] = useState<SpeechSynthesisVoice[]>([]);

  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();

    if (voices?.length) {
      const approvedVoices = voices.filter(({ name }) => APPROVED_VOICES.includes(name));

      setVoiceOptions(approvedVoices);
    }
  };

  // window.speechSynthesis.getVoices() has a loading delay
  useEffect(() => {
    const { cancel } = window.speechSynthesis;

    const speechSynthesisUtterance = new SpeechSynthesisUtterance(text);

    setSpeech(speechSynthesisUtterance);
    setVoice(initialVoice || SESSION_DATA_INITIAL_STATE.settings.voice);

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      loadVoices();
      clearTimeout(timer);
    }, 300);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }

      if (speech?.voice) {
        try {
          cancel?.();
        } catch (error) {
          // illegal invocation error when component unmounts during development changes
          // because cancel loses original window.speechSynthesis context.
          if (error instanceof Error) {
            captureException(error);
          }
        }
      }
    };
  }, [text]);

  const handleVoicePlay = (customText?: string) => {
    if (isPaused) {
      window.speechSynthesis.resume();
    } else if (customText) {
      // in the case window context is lost or want to pass custom text
      const speechSynthesisUtterance = new SpeechSynthesisUtterance(text || customText);

      const { voice: voiceData, pitch, rate, volume } = initialVoice || voice;

      speechSynthesisUtterance.voice =
        voiceOptions.find((voiceOption) => voiceOption.name === voiceData.name) || null;

      speechSynthesisUtterance.pitch = pitch;
      speechSynthesisUtterance.rate = rate;
      speechSynthesisUtterance.volume = volume;

      setSpeech(speechSynthesisUtterance);

      window.speechSynthesis.speak(speechSynthesisUtterance);
    } else if (speech && voice) {
      const { voice: voiceData, pitch, rate, volume } = voice;

      // otherwise if context intact and have current speech set
      speech.voice =
        voiceOptions.find((voiceOption) => voiceOption.name === voiceData.name) || null;
      speech.pitch = pitch;
      speech.rate = rate;
      speech.volume = volume;

      window.speechSynthesis.speak(speech);
    }

    setIsPaused(false);
  };

  const handleVoicePause = () => {
    setIsPaused(true);
    window.speechSynthesis.pause();
  };

  const handleVoiceStop = () => {
    setIsPaused(false);
    window.speechSynthesis.cancel();
  };

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
