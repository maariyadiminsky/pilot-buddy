import { truthyString } from '@common/utils';
import { MicrophoneIcon } from '@heroicons/react/20/solid';
import { DictaphoneModalErrorType } from '@modules/speech-recognition/hooks/useInitializeSpeechToText';
import { useDictaphone } from '@modules/speech-recognition/hooks';
import { type SpeechRecognitionType, MicrophoneSize } from '@modules/speech-recognition/types';

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
  const { startListeningToAudio, stopListeningToAudio } = useDictaphone(
    SpeechRecognition,
    isOn,
    isMicrophoneAvailable,
    setIsOn,
    setModalError,
    setModalOpen,
    isDisabled,
    time
  );

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
