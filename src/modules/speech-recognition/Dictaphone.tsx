import { MicrophoneIcon } from '@heroicons/react/20/solid';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useMemo, useEffect } from 'react';

interface DictaphoneProps {
  isListening: boolean;
  isDisabled: boolean;
  callbackOnClick?: () => void;
}

const Dictaphone = ({ isListening, isDisabled, callbackOnClick }: DictaphoneProps) => {
  const hasInitialized = useMemo(() => {
    const appId = process.env.REACT_APP_SPEECHLY_APP_ID;

    if (!appId) return false;

    SpeechRecognition.applyPolyfill(createSpeechlySpeechRecognition(appId));

    return true;
  }, []);

  const { transcript, listening, isMicrophoneAvailable, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const { startListening, stopListening } = SpeechRecognition;

  useEffect(() => {
    if (!hasInitialized) return undefined;

    // fail safe to turn off mic in case user forgets too.
    const timer = setTimeout(() => listening && stopListening(), 5000);

    return () => clearTimeout(timer);
  }, [listening]);

  console.log('listening?:', listening, transcript);

  if (!hasInitialized) return null;

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    console.log('no mic');
    return <div>no available</div>;
  }

  const startListeningToUser = () => {
    callbackOnClick?.();
    startListening();
  };

  return (
    <button
      type="button"
      className="group"
      disabled={isDisabled}
      onMouseDown={() => startListeningToUser()}
      onMouseUp={stopListening}
    >
      <MicrophoneIcon
        className={`h-5 w-5 ${
          !isDisabled && isListening && listening ? 'text-sky-700' : 'text-gray-400'
        } enabled:group-hover:text-sky-700 enabled:group-hover:cursor-pointer`}
        aria-hidden="true"
      />
    </button>
  );
};
export default Dictaphone;
