import { ListeningOptions } from 'react-speech-recognition';

export interface SpeechRecognitionType {
  startListening: (props: ListeningOptions) => Promise<void>;
  stopListening: () => Promise<void>;
}

export enum MicrophoneSize {
  sm = 'sm',
  md = 'md',
}
