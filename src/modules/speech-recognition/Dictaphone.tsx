import { truthyString } from '@common/utils';
import { MicrophoneIcon } from '@heroicons/react/20/solid';
import { useEffect } from 'react';
import { DictaphoneModalErrorType } from '@modules/speech-recognition/hooks/useInitializeSpeechToText';

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
  setModalError: (errorType: DictaphoneModalErrorType) => void;
  setModalOpen?: (value: boolean) => void;
}

const Dictaphone = ({
  SpeechRecognition,
  isOn,
  isDisabled,
  isMicrophoneAvailable,
  setIsOn,
  setModalError,
  setModalOpen,
}: DictaphoneProps) => {
  const { startListening, stopListening } = SpeechRecognition;

  const handleError = (error: Error) => {
    if (error?.message.includes('Permission denied')) {
      setModalError(DictaphoneModalErrorType.permission);
    } else {
      setModalError(DictaphoneModalErrorType.default);
    }

    setModalOpen?.(true);
  };

  const stopListeningToAudio = async () => {
    let hasError = null;
    try {
      await stopListening();
    } catch (error) {
      hasError = error;
    } finally {
      if (hasError instanceof Error) {
        handleError(hasError);
      }
      setIsOn(false);
    }
  };

  const startListeningToAudio = async () => {
    if (isDisabled) return;

    if (!isMicrophoneAvailable) {
      setModalOpen?.(true);
      return;
    }

    let hasError = null;
    try {
      await startListening({ continuous: false });
    } catch (error) {
      hasError = error;
    } finally {
      if (hasError instanceof Error) {
        handleError(hasError);
      } else {
        setIsOn(true);
      }
    }
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
