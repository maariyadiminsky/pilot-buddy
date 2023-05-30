import { render, screen, waitFor } from '@common/test';
import { PinnedSessions } from '@modules/study-room/session';
import { type PinnedSessionType } from '@modules/study-room/types';
import { MenuOptionType } from '@common/types';

const defaultProps = {
  title: 'Test Sessions',
  sessions: [] as PinnedSessionType[],
  getDropdownActions: () => [] as MenuOptionType[],
};

const renderComponent = (props = {}) => {
  const finalProps = { ...defaultProps, ...props };
  return render(<PinnedSessions {...finalProps} />, { shouldHaveNoWrapper: true });
};

describe('<PinnedSessions />', () => {
  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const heading = screen.getByRole('heading');
    // then
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(defaultProps.title);
  });

  it('renders sessions and dropdown actions', async () => {
    // given
    const session: PinnedSessionType = {
      id: '1',
      sessionId: 'session-1',
      text: 'Test session 1',
      total: 10,
      className: 'test-class',
    };
    const action: MenuOptionType = {
      text: 'Action 1',
      srText: 'Screen reader text',
      handleOnClick: jest.fn(),
    };
    const getDropdownActions = jest.fn().mockReturnValue([action]);

    renderComponent({
      sessions: [session],
      getDropdownActions,
    });
    // when
    const sessionText = screen.getByText(session.text);
    const questionsText = screen.getByText('10 Questions');
    // then
    expect(sessionText).toBeInTheDocument();
    expect(questionsText).toBeInTheDocument();
    await waitFor(() =>
      expect(getDropdownActions).toHaveBeenCalledWith(session.sessionId, session.total)
    );
  });
});
