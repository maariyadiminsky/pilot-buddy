import { render, screen, userEvent, waitFor, mockIndexedDB } from '@common/test';
import { SessionItem } from '@modules/study-room/session/SessionItem';
import { SessionsTableDataType } from '@modules/study-room/types';

const sampleSessionData: SessionsTableDataType = {
  id: '1',
  userId: 'user1',
  name: 'Test Session',
  topic: 'Test Topic',
  questions: 10,
  textColor: '#000000',
  color: '#FFFFFF',
  isPinned: false,
};

const handlePinSessionMock = jest.fn();
const handleUnpinSessionMock = jest.fn();
const handleEditSessionMock = jest.fn();
const handleRemoveSessionMock = jest.fn();

const defaultProps = {
  ...sampleSessionData,
  index: 0,
  isSessionPinned: false,
  isEditingCurrentSession: false,
  handlePinSession: handlePinSessionMock,
  handleUnpinSession: handleUnpinSessionMock,
  handleEditSession: handleEditSessionMock,
  handleRemoveSession: handleRemoveSessionMock,
};

const renderComponent = (props = {}) => {
  const finalProps = { ...defaultProps, ...props };
  return render(
    <table>
      <tbody>
        <SessionItem {...finalProps} />
      </tbody>
    </table>
  );
};

describe('<SessionItem />', () => {
  beforeAll(() => {
    mockIndexedDB();
  });

  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const sessionText = screen.getByText('Test Session');
    const topicText = screen.getByText('Test Topic');
    const questionsAmountText = screen.getByText('10 Questions');
    // then
    expect(sessionText).toBeInTheDocument();
    expect(topicText).toBeInTheDocument();
    expect(questionsAmountText).toBeInTheDocument();
  });

  it('handles pin correctly', async () => {
    // given
    renderComponent();
    const pinButton = screen.getByRole('button', { name: /pin button/i });
    // when
    userEvent.click(pinButton);
    // then
    await waitFor(() => expect(handlePinSessionMock).toHaveBeenCalled());
  });

  it('handles unpin correctly', async () => {
    // given
    renderComponent({ isSessionPinned: true });
    const pinButton = screen.getByRole('button', { name: /pin button/i });
    // when
    userEvent.click(pinButton);
    // then
    await waitFor(() => expect(handleUnpinSessionMock).toHaveBeenCalled());
  });

  it('handles edit session correctly', async () => {
    // given
    renderComponent();
    const editButton = screen.getByRole('button', { name: /edit/i });
    // when
    userEvent.click(editButton);
    // then
    await waitFor(() => expect(handleEditSessionMock).toHaveBeenCalledWith(sampleSessionData.id));
  });

  it('handles remove session correctly', async () => {
    // given
    renderComponent();
    const removeButton = screen.getByRole('button', { name: /delete/i });
    // when
    userEvent.click(removeButton);
    // then
    await waitFor(() =>
      expect(handleRemoveSessionMock).toHaveBeenCalledWith(
        sampleSessionData.id,
        sampleSessionData.questions
      )
    );
  });
});
