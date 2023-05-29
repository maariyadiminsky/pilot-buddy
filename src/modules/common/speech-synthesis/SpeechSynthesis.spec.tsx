import { render, screen, userEvent, fireEvent, waitFor } from '@common/test';
import { SpeechSynthesis } from '@common/speech-synthesis';
import { useSpeechSynthesis } from '@common/speech-synthesis/hooks';

jest.mock('@common/speech-synthesis/hooks', () => ({
  useSpeechSynthesis: jest.fn(),
}));

const handleVoicePlayMock = jest.fn();
const handleVoicePauseMock = jest.fn();
const handleVoiceStopMock = jest.fn();
const handleVoiceChangeMock = jest.fn();
const handlePitchChangeMock = jest.fn();
const handleRateChangeMock = jest.fn();
const handleVolumeChangeMock = jest.fn();
const setSettingsVoiceMock = jest.fn();

const defaultProps = {
  text: 'Hello, world!',
  settingsVoice: { voice: { id: 1, name: 'Voice 1' }, volume: 1, pitch: 1, rate: 1 },
  setSettingsVoice: setSettingsVoiceMock,
};

beforeEach(() => {
  (useSpeechSynthesis as jest.Mock).mockReturnValue({
    voice: defaultProps.settingsVoice,
    isPaused: false,
    handleVoicePlay: handleVoicePlayMock,
    handleVoicePause: handleVoicePauseMock,
    handleVoiceStop: handleVoiceStopMock,
    handleVoiceChange: handleVoiceChangeMock,
    handlePitchChange: handlePitchChangeMock,
    handleRateChange: handleRateChangeMock,
    handleVolumeChange: handleVolumeChangeMock,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = (props = {}) => {
  const finalProps = { ...defaultProps, ...props };
  return render(<SpeechSynthesis {...finalProps} />, { shouldHaveNoWrapper: true });
};

describe('<SpeechSynthesis />', () => {
  it('renders without crashing', () => {
    renderComponent();
    const volumeSlider = screen.getByLabelText('change volume');
    expect(volumeSlider).toBeInTheDocument();
  });

  it('handles play button click', async () => {
    renderComponent();
    const playButton = screen.getByRole('button', { name: /play voice/i });
    userEvent.click(playButton);

    await waitFor(() => expect(handleVoicePlayMock).toHaveBeenCalledTimes(1));
  });

  it('handles pause button click', async () => {
    renderComponent();
    const pauseButton = screen.getByRole('button', { name: /pause voice/i });
    userEvent.click(pauseButton);
    await waitFor(() => expect(handleVoicePauseMock).toHaveBeenCalledTimes(1));
  });

  it('handles stop button click', async () => {
    renderComponent();
    const stopButton = screen.getByRole('button', { name: /stop voice/i });
    userEvent.click(stopButton);

    await waitFor(() => expect(handleVoiceStopMock).toHaveBeenCalledTimes(1));
  });
});
