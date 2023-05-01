import { SyntheticEvent, useState, useEffect } from 'react';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { VOICE_OPTIONS, APPROVED_VOICES } from '@modules/speech-synthesis/constants';

// todo: issues on mobile - https://talkrapp.com/speechSynthesis.html
export const useSpeechSynthesis = (
  text?: string,
  initialVoice?: SelectMenuItemType,
  initialRate?: number,
  initialPitch?: number,
  initialVolume?: number
) => {
  const [isPaused, setIsPaused] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance>();
  const [voice, setVoice] = useState<SelectMenuItemType>(initialVoice || VOICE_OPTIONS[0]);
  const [voiceOptions, setVoiceOptions] = useState<SpeechSynthesisVoice[]>([]);
  const [pitch, setPitch] = useState(initialPitch || 1);
  const [rate, setRate] = useState(initialRate || 1);
  const [volume, setVolume] = useState(initialVolume || 1);

  // window.speechSynthesis.getVoices() has a loading delay
  useEffect(() => {
    const { cancel } = window.speechSynthesis;

    const speechSynthesisUtterance = new SpeechSynthesisUtterance(text);

    setSpeech(speechSynthesisUtterance);

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      const voices = window.speechSynthesis.getVoices();

      if (voices?.length) {
        const approvedVoices = voices.filter(({ name }) => APPROVED_VOICES.includes(name));

        setVoiceOptions(approvedVoices);
        setVoice(initialVoice || VOICE_OPTIONS[0]);

        clearTimeout(timer);
      }
    }, 200);

    return () => {
      clearTimeout(timer);

      if (speech?.voice) {
        try {
          cancel?.();
        } catch (error) {
          // illegal invocation error when component unmounts during development changes
          // because cancel loses original window.speechSynthesis context.
          console.log(error);
        }
      }
    };
  }, [text]);

  const handleVoicePlay = (customText?: string) => {
    if (isPaused) {
      window.speechSynthesis.resume();
    } else if (customText) {
      // in the case window context is lost or want to pass custom text
      const speechSynthesisUtterance = new SpeechSynthesisUtterance(customText);

      speechSynthesisUtterance.voice =
        voiceOptions.find((voiceOption) => voiceOption.name === voice.name) || null;

      speechSynthesisUtterance.pitch = pitch;
      speechSynthesisUtterance.rate = rate;
      speechSynthesisUtterance.volume = volume;

      setSpeech(speechSynthesisUtterance);

      window.speechSynthesis.speak(speechSynthesisUtterance);
    } else if (speech && voice) {
      // otherwise if context intact and have current speech set
      speech.voice = voiceOptions.find((voiceOption) => voiceOption.name === voice.name) || null;
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

  const handleVoiceChange = (voiceSelected: SelectMenuItemType) => setVoice(voiceSelected);

  const handlePitchChange = (event: SyntheticEvent) => {
    setPitch(Number((event.target as HTMLInputElement).value));
  };

  const handleRateChange = (event: SyntheticEvent) => {
    setRate(Number((event.target as HTMLInputElement).value));
  };

  const handleVolumeChange = (event: SyntheticEvent) => {
    setVolume(Number((event.target as HTMLInputElement).value));
  };

  return {
    speech,
    voice,
    pitch,
    rate,
    volume,
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
