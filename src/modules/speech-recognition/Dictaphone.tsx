import { truthyString } from '@common/utils';
import { MicrophoneIcon } from '@heroicons/react/20/solid';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useMemo, useEffect } from 'react';

interface DictaphoneProps {
  isOn: boolean;
  setIsOn: (value: boolean) => void;
  isDisabled: boolean;
}

const Dictaphone = ({ isOn, setIsOn, isDisabled }: DictaphoneProps) => {
  const hasInitialized = useMemo(() => {
    const appId = process.env.REACT_APP_SPEECHLY_APP_ID;

    if (!appId) return false;

    SpeechRecognition.applyPolyfill(createSpeechlySpeechRecognition(appId));

    return true;
  }, []);

  const { isMicrophoneAvailable, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const { startListening, stopListening } = SpeechRecognition;

  const stopListeningToAudio = async () => {
    await stopListening();

    setIsOn(false);
  };

  const startListeningToAudio = async () => {
    if (isDisabled) return;

    setIsOn(true);

    await startListening({ continuous: false });
  };

  useEffect(() => {
    if (!hasInitialized) return undefined;

    // fail safe to turn off mic in case user forgets.
    const timer = setTimeout(() => {
      if (isOn) {
        stopListeningToAudio();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOn]);

  if (!hasInitialized) return null;

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <div>no available</div>;
  }

  console.log('isOn:', isOn);
  return (
    <button
      type="button"
      className="group"
      disabled={isDisabled}
      onClick={() => (isOn ? stopListeningToAudio() : startListeningToAudio())}
    >
      <MicrophoneIcon
        className={truthyString(
          'h-5 w-5 enabled:group-hover:text-sky-700 enabled:group-hover:cursor-pointer',
          isOn ? 'text-sky-700' : 'text-gray-400'
        )}
        aria-hidden="true"
      />
    </button>
  );
};
export default Dictaphone;
