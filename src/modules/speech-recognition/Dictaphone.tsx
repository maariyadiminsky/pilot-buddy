import { truthyString } from '@common/utils';
import { MicrophoneIcon } from '@heroicons/react/20/solid';
import { useEffect } from 'react';

interface SpeechRecognitionStartListeningProps {
  continuous?: boolean;
  interimResults?: boolean;
  lang?: string;
}
interface SpeechRecognitionType {
  startListening: (props: SpeechRecognitionStartListeningProps) => Promise<void>;
  stopListening: () => Promise<void>;
}

interface DictaphoneProps {
  SpeechRecognition: SpeechRecognitionType;
  isOn: boolean;
  isDisabled: boolean;
  isMicrophoneAvailable: boolean;
  setIsOn: (value: boolean) => void;
  setModalOpen?: (value: boolean) => void;
}

const Dictaphone = ({
  SpeechRecognition,
  isOn,
  isDisabled,
  isMicrophoneAvailable,
  setIsOn,
  setModalOpen,
}: DictaphoneProps) => {
  const { startListening, stopListening } = SpeechRecognition;

  const stopListeningToAudio = async () => {
    await stopListening();
    setIsOn(false);
  };

  const startListeningToAudio = async () => {
    if (isDisabled) return;

    if (!isMicrophoneAvailable) {
      setModalOpen?.(true);
      return;
    }

    await startListening({ continuous: false });
    setIsOn(true);
  };

  useEffect(() => {
    if (isDisabled || !isMicrophoneAvailable) return undefined;

    // fail safe to turn off mic in case user forgets.
    const timer = setTimeout(() => {
      if (isOn) {
        stopListeningToAudio();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOn, isDisabled, isMicrophoneAvailable]);

  return (
    <>
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
    </>
  );
};
export default Dictaphone;
