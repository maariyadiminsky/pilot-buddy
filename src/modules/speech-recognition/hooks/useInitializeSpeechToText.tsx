import { type ModalDataType } from '@common/components/modal/Modal';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const useInitializeSpeechToText = () => {
  const { browserSupportsSpeechRecognition, transcript } = useSpeechRecognition();

  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState(false);
  const [modalData, setModalData] = useState<ModalDataType>();

  const clearModalData = () => setModalData(undefined);

  useEffect(() => {
    const initialize = async () => {
      const appId = process.env.REACT_APP_SPEECHLY_APP_ID;
      let hasError = null;

      try {
        if (!appId) throw new Error('Speechly API ID issue.');

        if (!browserSupportsSpeechRecognition) {
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
        }

        // get user microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        if (error instanceof Error) {
          if (error?.message.includes('Permission denied')) {
            setModalData({
              title: 'Permissions Issue',
              children: (
                <div className="flex justify-center items-center">
                  To access Speech-to-Text, grant the app microphone permission.
                </div>
              ),
              confirmChildren: 'Ok',
            });
          }
        }

        hasError = error;
      } finally {
        if (appId && !hasError && !modalData) {
          SpeechRecognition.applyPolyfill(createSpeechlySpeechRecognition(appId));
          setIsMicrophoneAvailable(true);
        } else if (!modalData && hasError instanceof Error) {
          if (hasError?.message.includes('Permission denied')) {
            setModalData({
              title: 'Permissions Issue',
              children: (
                <div className="flex justify-center items-center">
                  To access Speech-to-Text, grant the app microphone permission.
                </div>
              ),
              confirmChildren: 'Ok',
            });
          } else {
            setModalData({
              title: 'Unknown Error',
              children: (
                <div className="flex">
                  Speech-to-Text is currently unavailable. Kindly contact support for assistance.
                </div>
              ),
              confirmChildren: 'Ok',
            });
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
    clearModalData,
  };
};
