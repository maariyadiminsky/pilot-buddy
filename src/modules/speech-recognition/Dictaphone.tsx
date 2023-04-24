import { truthyString } from '@common/utils';
import { MicrophoneIcon } from '@heroicons/react/20/solid';
import { useEffect } from 'react';
import { DictaphoneModalErrorType } from '@modules/speech-recognition/hooks/useInitializeSpeechToText';
import { ListeningOptions } from 'react-speech-recognition';

enum MicrophoneSize {
  sm = 'sm',
  md = 'md',
}

interface SpeechRecognitionType {
  startListening: (props: ListeningOptions) => Promise<void>;
  stopListening: () => Promise<void>;
}

interface DictaphoneProps {
  SpeechRecognition: SpeechRecognitionType;
  isOn: boolean;
  isDisabled?: boolean;
  isMicrophoneAvailable: boolean;
  setIsOn: (value: boolean) => void;
  setModalError: (errorType: DictaphoneModalErrorType) => void;
  setModalOpen?: (value: boolean) => void;
  microphoneSize?: keyof typeof MicrophoneSize;
  time?: string;
}

const getMicrophoneSize = (size: string = MicrophoneSize.sm) => {
  switch (size) {
    case MicrophoneSize.md:
      return 'h-7 w-7';
    case MicrophoneSize.sm:
    default:
      return 'h-5 w-5';
  }
};

const Dictaphone = ({
  SpeechRecognition,
  isOn,
  isDisabled,
  isMicrophoneAvailable,
  setIsOn,
  setModalError,
  setModalOpen,
  microphoneSize,
  time,
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
      stopListening();
    } catch (error) {
      hasError = error;
    } finally {
      if (hasError instanceof Error) {
        handleError(hasError);
      }
      setIsOn(false);
    }
  };

  const startListeningToAudio = () => {
    if (isDisabled) return;

    if (!isMicrophoneAvailable) {
      setModalOpen?.(true);
      return;
    }

    let hasError = null;
    try {
      startListening({ continuous: false });
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

    const timeToWaitUntilTurnOffMic = time ? Number(time.split(' ')[0]) * 1000 : 5000;

    // Turn off mic if user forgets or background noise persists.
    const timer = setTimeout(() => {
      if (isOn) {
        stopListeningToAudio();
      }
    }, timeToWaitUntilTurnOffMic);

    return () => clearTimeout(timer);
  }, [isOn, isDisabled, isMicrophoneAvailable, time]);

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
            getMicrophoneSize(microphoneSize),
            'enabled:group-hover:text-sky-600 enabled:group-hover:cursor-pointer',
            isOn ? 'text-sky-600' : 'text-gray-400'
          )}
          aria-hidden="true"
        />
      </button>
    </>
  );
};
export default Dictaphone;
