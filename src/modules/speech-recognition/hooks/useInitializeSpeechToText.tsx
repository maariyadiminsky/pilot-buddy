import { type ModalDataType } from '@common/components/modal/Modal';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export enum DictaphoneModalErrorType {
  permission = 'permission',
  browser = 'browser',
  default = 'default',
}

export const useInitializeSpeechToText = () => {
  const { browserSupportsSpeechRecognition, transcript } = useSpeechRecognition();

  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState(false);
  const [modalData, setModalData] = useState<ModalDataType>();

  const clearModalData = () => setModalData(undefined);

  const setModalError = (errorType: keyof typeof DictaphoneModalErrorType) => {
    switch (errorType) {
      case DictaphoneModalErrorType.permission:
        setModalData({
          title: 'Permissions Issue',
          children: (
            <div className="flex justify-center items-center">
              To access Speech-to-Text, grant the app microphone permission.
            </div>
          ),
          confirmChildren: 'Ok',
        });
        break;
      case DictaphoneModalErrorType.browser:
        setModalData({
          title: 'Browser Issue',
          children: (
            <div className="flex justify-center items-center">
              Regrettably, your browser lacks speech recognition support. Please upgrade to the
              newest version of Chrome.
            </div>
          ),
          confirmChildren: 'Ok',
        });
        break;
      default:
        setModalData({
          title: 'Unknown Error',
          children: (
            <div className="flex">
              Speech-to-Text is currently unavailable. Kindly contact support for assistance.
            </div>
          ),
          confirmChildren: 'Ok',
        });
        break;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const appId = process.env.REACT_APP_SPEECHLY_APP_ID;
      let hasError = null;

      try {
        if (!appId) throw new Error('Speechly API ID issue.');

        if (!browserSupportsSpeechRecognition) {
          setModalError(DictaphoneModalErrorType.browser);

          throw new Error('Browser does not support speech recognition');
        }

        // get user microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        hasError = error;
      } finally {
        if (appId && !hasError && !modalData) {
          SpeechRecognition.applyPolyfill(createSpeechlySpeechRecognition(appId));

          setIsMicrophoneAvailable(true);
        } else if (!modalData && hasError instanceof Error) {
          if (hasError?.message.includes('Permission denied')) {
            setModalError(DictaphoneModalErrorType.permission);
          } else {
            setModalError(DictaphoneModalErrorType.default);
          }
        }
      }
    };

    initialize();
  }, []);

  return {
    SpeechRecognition,
    isMicrophoneAvailable,
    transcript,
    modalData,
    setModalError,
    clearModalData,
  };
};
