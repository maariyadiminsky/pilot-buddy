import { render, screen, mockIndexedDB } from '@common/test';
import { SessionsTable } from '@modules/study-room/session';

const mockHandlePinSession = jest.fn();
const mockHandleUnpinSession = jest.fn();
const mockHandleEditSession = jest.fn();
const mockHandleRemoveSession = jest.fn();

const defaultProps = {
  currentSessionId: '123',
  pinnedSessions: ['123', '456'],
  sessions: [
    {
      id: '123',
      userId: 'user1',
      name: 'Test Session 1',
      topic: 'Test Topic 1',
      questions: 10,
      color: 'red',
      textColor: 'black',
      isPinned: true,
    },
    {
      id: '456',
      userId: 'user2',
      name: 'Test Session 2',
      topic: 'Test Topic 2',
      questions: 20,
      color: 'blue',
      textColor: 'white',
      isPinned: false,
    },
  ],
  handlePinSession: mockHandlePinSession,
  handleUnpinSession: mockHandleUnpinSession,
  handleEditSession: mockHandleEditSession,
  handleRemoveSession: mockHandleRemoveSession,
};

const renderComponent = (props = {}) => {
  const finalProps = { ...defaultProps, ...props };
  return render(<SessionsTable {...finalProps} />);
};

describe('<SessionsTable />', () => {
  beforeAll(() => {
    mockIndexedDB();
  });

  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const table = screen.getByRole('table');
    // then
    expect(table).toBeInTheDocument();
  });

  it('renders correct number of sessions', () => {
    // given
    renderComponent();
    // when
    const sessionItems = screen.getAllByText(/Test Session/i);
    // then
    expect(sessionItems.length).toBe(defaultProps.sessions.length);
  });
});
