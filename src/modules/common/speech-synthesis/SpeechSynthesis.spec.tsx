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
    // given
    renderComponent();
    // when
    const volumeSlider = screen.getByLabelText('change volume');
    // then
    expect(volumeSlider).toBeInTheDocument();
  });

  it('handles play button click', async () => {
    // given
    renderComponent();
    const playButton = screen.getByRole('button', { name: /play voice/i });
    // when
    userEvent.click(playButton);
    // then
    await waitFor(() => expect(handleVoicePlayMock).toHaveBeenCalledTimes(1));
  });

  it('handles pause button click', async () => {
    // given
    renderComponent();
    const pauseButton = screen.getByRole('button', { name: /pause voice/i });
    // when
    userEvent.click(pauseButton);
    // then
    await waitFor(() => expect(handleVoicePauseMock).toHaveBeenCalledTimes(1));
  });

  it('handles stop button click', async () => {
    // given
    renderComponent();
    const stopButton = screen.getByRole('button', { name: /stop voice/i });
    // when
    userEvent.click(stopButton);
    // then
    await waitFor(() => expect(handleVoiceStopMock).toHaveBeenCalledTimes(1));
  });
});
