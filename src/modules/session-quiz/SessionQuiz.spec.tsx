import { render, screen, userEvent, waitFor, mockIndexedDB } from '@common/test';
import { SessionQuiz } from '@modules/session-quiz';
import { useDatabase } from '@common/database/hooks';
import { useInitializeSpeechToText } from '@common/speech-recognition/hooks';
import { useSpeechSynthesis } from '@common/speech-synthesis/hooks';
import { usePrevious } from '@common/hooks';
import { Modal } from '@common/modal';
import { type SessionDataType } from '@modules/session/types';

jest.mock('@common/database/hooks', () => ({
  useDatabase: jest.fn(),
}));

jest.mock('@common/speech-recognition/hooks', () => ({
  useInitializeSpeechToText: jest.fn(),
}));

jest.mock('@common/speech-synthesis/hooks', () => ({
  useSpeechSynthesis: jest.fn(),
}));

jest.mock('@common/hooks', () => ({
  usePrevious: jest.fn(),
}));

jest.mock('@common/modal', () => ({
  Modal: jest.fn(),
}));

const sessionData: SessionDataType = {
  id: '1',
  userId: 'testUser',
  questions: [
    { id: 'q1', question: 'Test question 1' },
    { id: 'q2', question: 'Test question 2' },
    // Add more questions if necessary
  ],
  settings: {
    isTimed: false,
    shouldHaveOrder: false,
    shouldReadOutLoud: false,
    time: { id: 1, name: '5 Seconds' },
    order: { id: 1, name: 'Sort' },
    voice: {
      voice: { id: 1, name: 'Test voice' },
      pitch: 1,
      rate: 1,
      volume: 1,
    },
  },
  notes: [],
};

const getDBSessionMock = jest.fn();
const useDatabaseMock = {
  getDBSession: getDBSessionMock,
};

const renderComponent = () => render(<SessionQuiz />);

describe('<SessionQuiz />', () => {
  beforeAll(() => mockIndexedDB());

  beforeEach(() => {
    (useDatabase as jest.Mock).mockReturnValue(useDatabaseMock);
    (getDBSessionMock as jest.Mock).mockReturnValue(sessionData);

    const SpeechRecognitionMock = {
      startListening: jest.fn(),
      stopListening: jest.fn(),
    };
    (useInitializeSpeechToText as jest.Mock).mockImplementation(() => SpeechRecognitionMock);

    const speechSynthesisMock = {
      handleVoicePlay: jest.fn(),
      handleVoiceStop: jest.fn(),
      voiceOptions: {},
      speech: {},
    };

    (useSpeechSynthesis as jest.Mock).mockReturnValue(speechSynthesisMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    // given
    renderComponent();
    // then
    const questionElement = await screen.findByText(sessionData.questions[0].question);
    expect(questionElement).toBeInTheDocument();
  });

  it('renders Loader if no questionsOrdered is not available', () => {
    // given
    (getDBSessionMock as jest.Mock).mockReturnValueOnce(null);
    renderComponent();
    // then
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
  });

  it('submits answer when form is submitted', async () => {
    // given
    renderComponent();
    // when
    const answerInput = screen.getByLabelText('quizAnswer');
    userEvent.type(answerInput, 'Answer');
    userEvent.click(screen.getByText('Next Question'));
    // then
    await waitFor(() => expect(answerInput).toHaveValue(''));
  });
});
