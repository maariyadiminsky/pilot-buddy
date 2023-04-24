import { SyntheticEvent, useState, useEffect } from 'react';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { VOICE_OPTIONS, APPROVED_VOICES } from '@modules/speech-synthesis/constants';

// todo: issues on mobile - https://talkrapp.com/speechSynthesis.html
export const useSpeechSynthesis = (text: string) => {
  const [isPaused, setIsPaused] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance>();
  const [voice, setVoice] = useState<SelectMenuItemType>(VOICE_OPTIONS[0]);
  const [voiceOptions, setVoiceOptions] = useState<SpeechSynthesisVoice[]>([]);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

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
        setVoice(VOICE_OPTIONS[0]);

        clearTimeout(timer);
      }
    }, 200);

    return () => {
      clearTimeout(timer);

      if (speech?.voice) {
        try {
          cancel();
        } catch (error) {
          // illegal invocation error when component unmounts during development changes
          // because cancel loses original window.speechSynthesis context.
          console.log(error);
        }
      }
    };
  }, [text]);

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
    } else if (speech && voice) {
      speech.voice = voiceOptions.find((voiceOption) => voiceOption.name === voice.name) || null;
      speech.pitch = pitch;
      speech.rate = rate;
      speech.volume = volume;

      window.speechSynthesis.speak(speech);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
    window.speechSynthesis.pause();
  };

  const handleStop = () => {
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
    handlePlay,
    handlePause,
    handleStop,
    handleVoiceChange,
    handlePitchChange,
    handleRateChange,
    handleVolumeChange,
  };
};
