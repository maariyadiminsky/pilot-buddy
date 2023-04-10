import { MicrophoneIcon } from '@heroicons/react/20/solid';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState, useMemo, useEffect, forwardRef, useImperativeHandle, Ref } from 'react';

interface DictaphoneProps {
  isDisabled: boolean;
}

export interface DictaphoneRefType {
  isOn: boolean;
  setIsOn: (value: boolean) => void;
}

const Dictaphone = ({ isDisabled }: DictaphoneProps, ref: Ref<DictaphoneRefType>) => {
  const [isOn, setIsOn] = useState(false);

  const hasInitialized = useMemo(() => {
    const appId = process.env.REACT_APP_SPEECHLY_APP_ID;

    if (!appId) return false;

    SpeechRecognition.applyPolyfill(createSpeechlySpeechRecognition(appId));

    return true;
  }, []);

  const { transcript, listening, isMicrophoneAvailable, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const { startListening, stopListening } = SpeechRecognition;

  useImperativeHandle(ref, () => ({ isOn, setIsOn }));

  const stopListeningToAudio = async () => {
    setIsOn(false);

    await stopListening();
  };

  const startListeningToAudio = async () => {
    setIsOn(true);

    await startListening({ continuous: false, interimResults: true });
  };

  useEffect(() => {
    if (!hasInitialized) return undefined;

    // fail safe to turn off mic in case user forgets.
    const timer = setTimeout(() => {
      if (listening) {
        stopListeningToAudio();
      }
    }, 5000);

    console.log('listening:', listening, 'transcript:', transcript);

    return () => clearTimeout(timer);
  }, [listening]);

  if (!hasInitialized) return null;

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    console.log('no mic');
    return <div>no available</div>;
  }

  return (
    <button
      type="button"
      className="group"
      disabled={isDisabled}
      onClick={() => (isOn ? stopListeningToAudio() : startListeningToAudio())}
    >
      <MicrophoneIcon
        className={`h-5 w-5 ${
          isOn ? 'text-sky-700' : 'text-gray-400'
        } enabled:group-hover:text-sky-700 enabled:group-hover:cursor-pointer`}
        aria-hidden="true"
      />
    </button>
  );
};
export default forwardRef(Dictaphone);
