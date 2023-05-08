import { captureException } from '@common/error-monitoring';
import { DictaphoneModalErrorType } from '@common/speech-recognition/hooks/useInitializeSpeechToText';
import { type SpeechRecognitionType } from '@common/speech-recognition/types';
import { useEffect, useCallback } from 'react';

export const useDictaphone = (
  SpeechRecognition: SpeechRecognitionType,
  isOn: boolean,
  isMicrophoneAvailable: boolean,
  setIsOn: (value: boolean) => void,
  setModalError: (errorType: DictaphoneModalErrorType) => void,
  setModalOpen?: (value: boolean) => void,
  isDisabled?: boolean,
  time?: string
) => {
  const { startListening, stopListening } = SpeechRecognition;

  const handleError = useCallback(
    (error: Error) => {
      if (error?.message.includes('Permission denied')) {
        setModalError(DictaphoneModalErrorType.permission);
      } else {
        setModalError(DictaphoneModalErrorType.default);
      }

      setModalOpen?.(true);
    },
    [setModalError, setModalOpen]
  );

  const stopListeningToAudio = useCallback(async () => {
    let hasError = null;
    try {
      stopListening();
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        captureException(error);
      }
    } finally {
      if (hasError instanceof Error) {
        handleError(hasError);
      }
      setIsOn(false);
    }
  }, [handleError, setIsOn, stopListening]);

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
      if (error instanceof Error) {
        captureException(error);
      }
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
  }, [isOn, isDisabled, isMicrophoneAvailable, time, stopListeningToAudio]);

  return { startListeningToAudio, stopListeningToAudio };
};
