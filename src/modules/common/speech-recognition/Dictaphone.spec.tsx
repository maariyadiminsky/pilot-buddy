import { render, screen, userEvent, waitFor } from '@common/test';
import { Dictaphone } from '@common/speech-recognition';
import { useDictaphone } from '@common/speech-recognition/hooks';
import { MicrophoneSize } from '@common/speech-recognition/types';

jest.mock('@common/speech-recognition/hooks', () => ({
  useDictaphone: jest.fn(),
}));

const startListeningToAudioMock = jest.fn();
const stopListeningToAudioMock = jest.fn();
const setIsOnMock = jest.fn();
const setModalErrorMock = jest.fn();
const SpeechRecognitionMock = {
  startListening: startListeningToAudioMock,
  stopListening: stopListeningToAudioMock,
};

const defaultProps = {
  SpeechRecognition: SpeechRecognitionMock,
  isOn: false,
  isMicrophoneAvailable: true,
  setIsOn: setIsOnMock,
  setModalError: setModalErrorMock,
  time: '10:00',
};

beforeEach(() => {
  (useDictaphone as jest.Mock).mockReturnValue({
    startListeningToAudio: startListeningToAudioMock,
    stopListeningToAudio: stopListeningToAudioMock,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = (props = {}) => {
  const finalProps = { ...defaultProps, ...props };
  return render(<Dictaphone {...finalProps} />, { shouldHaveNoWrapper: true });
};

describe('<Dictaphone />', () => {
  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const microphoneButton = screen.getByRole('button');
    // then
    expect(microphoneButton).toBeInTheDocument();
  });

  it('handles button click to start listening', async () => {
    // given
    renderComponent();
    // when
    const microphoneButton = screen.getByRole('button');
    // then
    userEvent.click(microphoneButton);

    await waitFor(() => expect(startListeningToAudioMock).toHaveBeenCalledTimes(1));
  });

  it('handles button click to stop listening', async () => {
    // given
    renderComponent({ isOn: true });
    // when
    const microphoneButton = screen.getByRole('button');
    // then
    userEvent.click(microphoneButton);

    await waitFor(() => expect(stopListeningToAudioMock).toHaveBeenCalledTimes(1));
  });

  it('sets microphone size correctly', () => {
    // given
    renderComponent({ microphoneSize: MicrophoneSize.md });
    // when
    const microphoneButton = screen.getByRole('button');
    // then
    expect(microphoneButton.firstChild).toHaveClass('h-7 w-7');
  });
});
