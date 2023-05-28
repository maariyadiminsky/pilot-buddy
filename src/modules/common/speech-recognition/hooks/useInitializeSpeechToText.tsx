import 'regenerator-runtime';

import { captureException } from '@common/error-monitoring';
import { type ModalDataType } from '@common/types';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import { useState, useEffect, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export enum DictaphoneModalErrorType {
  permission = 'permission',
  browser = 'browser',
  default = 'default',
}

export const useInitializeSpeechToText = () => {
  const { browserSupportsSpeechRecognition, transcript, resetTranscript } = useSpeechRecognition();

  const [isInitialized, setIsInitialized] = useState(false);
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState(false);
  const [modalData, setModalData] = useState<ModalDataType>();

  const setModalError = useCallback(
    (errorType: keyof typeof DictaphoneModalErrorType) => {
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
                Browser lacks speech recognition; upgrade to latest Chrome version.
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
    },
    [setModalData]
  );

  useEffect(() => {
    const initialize = async () => {
      // dev can choose whether to use polyfill or not
      // while there are benefits, eventually there is also a cost: https://www.speechly.com/pricing
      const shouldUseSpeechlyPolyfill = process.env.REACT_APP_USE_SPEECHLY === 'true';
      const appId = process.env.REACT_APP_SPEECHLY_APP_ID;
      let hasError = null;

      try {
        if (shouldUseSpeechlyPolyfill && !appId) {
          throw new Error('Speechly APP ID - possibly nonexistent or incorrect.');
        }

        if (!browserSupportsSpeechRecognition) {
          setModalError(DictaphoneModalErrorType.browser);

          throw new Error('Browser does not support speech recognition');
        }

        // get user microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        hasError = error;
        if (error instanceof Error) {
          captureException(error);
        }
      } finally {
        if (!hasError && !modalData) {
          setIsInitialized(true);

          if (shouldUseSpeechlyPolyfill && appId) {
            SpeechRecognition.applyPolyfill(createSpeechlySpeechRecognition(appId));
          }

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

    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, browserSupportsSpeechRecognition, modalData, setModalError]);

  return {
    SpeechRecognition,
    isMicrophoneAvailable,
    transcript,
    resetTranscript,
    modalData,
    setModalError,
    setModalData,
  };
};
