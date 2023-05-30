import { render, screen } from '@common/test';
import { SessionQuizResults } from '@modules/session-quiz/SessionQuizResults';

const mockQuestionsWithAnswers = [
  {
    id: '1',
    question: 'Test Question 1',
    answer: 'Test Answer 1',
    quizAnswer: 'Test QuizAnswer 1',
  },
  {
    id: '2',
    question: 'Test Question 2',
    answer: 'Test Answer 2',
    quizAnswer: 'Test QuizAnswer 2',
  },
];

const renderComponent = () =>
  render(<SessionQuizResults questionsWithAnswers={mockQuestionsWithAnswers} />, {
    shouldHaveNoWrapper: true,
  });

describe('<SessionQuizResults />', () => {
  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const resultsElement = screen.getByText('Results');
    // then
    expect(resultsElement).toBeInTheDocument();
  });

  it('renders the correct number of questions', () => {
    // given
    renderComponent();
    // when
    const questionElements = screen.getAllByText(/Test Question/);
    // then
    expect(questionElements).toHaveLength(mockQuestionsWithAnswers.length);
  });

  it('displays the correct answer for each question', () => {
    // given
    renderComponent();
    // when
    mockQuestionsWithAnswers.forEach(({ answer }) => {
      const answerElement = screen.getByText(answer);
      // then
      expect(answerElement).toBeInTheDocument();
    });
  });

  it('displays the correct quiz answer for each question', () => {
    // given
    renderComponent();
    // when
    mockQuestionsWithAnswers.forEach(({ quizAnswer }) => {
      const quizAnswerElement = screen.getByText(quizAnswer);
      // then
      expect(quizAnswerElement).toBeInTheDocument();
    });
  });
});
