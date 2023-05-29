import { render, screen, userEvent, waitFor, mockIndexedDB } from '@common/test';
import { SessionNotes } from '@modules/session/notes';

const mockUpdateDBPartialDataOfSession = jest.fn();

jest.mock('@common/database/hooks', () => ({
  useDatabase: () => ({ updateDBPartialDataOfSession: mockUpdateDBPartialDataOfSession }),
}));

jest.mock('@common/error-monitoring', () => ({
  captureException: jest.fn(),
}));

const defaultProps = {
  notesData: [
    {
      id: 'note1',
      text: 'test note 1',
      icon: {
        name: 'testIcon1',
        value: 'testValue1',
        iconColor: 'red',
        bgColor: 'blue',
      },
    },
    {
      id: 'note2',
      text: 'test note 2',
      icon: {
        name: 'testIcon2',
        value: 'testValue2',
        iconColor: 'red',
        bgColor: 'blue',
      },
    },
  ],
  sessionId: 'session1',
};

const renderComponent = () => render(<SessionNotes {...defaultProps} />);

describe('<SessionNotes />', () => {
  beforeAll(() => {
    mockIndexedDB();
  });

  it('renders the correct number of notes', () => {
    // given
    renderComponent();
    // when
    const noteElements = screen.getAllByRole('listitem');
    // then
    expect(noteElements).toHaveLength(defaultProps.notesData.length);
  });

  it('handles the remove note event', async () => {
    // given
    renderComponent();
    const removeButtons = screen.getAllByRole('button', { name: /Remove note/i });
    // when
    userEvent.click(removeButtons[0]);
    // then
    await waitFor(() => {
      const listItem = screen.getAllByRole('listitem');
      expect(listItem).toHaveLength(defaultProps.notesData.length - 1);
      expect(mockUpdateDBPartialDataOfSession).toHaveBeenCalled();
    });
  });

  it('handles the edit note event', async () => {
    // given
    renderComponent();
    const editButtons = screen.getAllByRole('button', { name: /Edit note/i });
    // when
    userEvent.click(editButtons[0]);
    // then
    await waitFor(() => expect(mockUpdateDBPartialDataOfSession).toHaveBeenCalled());
  });
});
