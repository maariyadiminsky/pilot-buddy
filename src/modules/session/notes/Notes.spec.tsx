import { render, screen, userEvent, waitFor } from '@common/test';
import { Notes } from '@modules/session/notes';

const handleRemoveNote = jest.fn();
const handleEditNote = jest.fn();

const defaultProps = {
  notes: [
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
    {
      id: 'note3',
      text: 'test note 3',
      icon: {
        name: 'testIcon3',
        value: 'testValue3',
        iconColor: 'red',
        bgColor: 'blue',
      },
    },
  ],
  handleRemoveNote,
  handleEditNote,
};

const renderComponent = () => render(<Notes {...defaultProps} />, { shouldHaveNoWrapper: true });

describe('<Notes />', () => {
  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const notesElement = screen.getByRole('list');
    // then
    expect(notesElement).toBeInTheDocument();
  });

  it('renders the correct number of notes', () => {
    // given
    renderComponent();
    // when
    const noteElements = screen.getAllByRole('listitem');
    // then
    expect(noteElements).toHaveLength(defaultProps.notes.length);
  });

  it('handles the edit button click', async () => {
    // given
    renderComponent();
    const editButton = screen.getAllByRole('button', { name: /Edit note/i })[0];
    // when
    userEvent.click(editButton);
    // then
    await waitFor(() => expect(handleEditNote).toHaveBeenCalledWith(defaultProps.notes[0].id));
  });

  it('handles the remove button click', async () => {
    // given
    renderComponent();
    const removeButton = screen.getAllByRole('button', { name: /Remove note/i })[0];
    // when
    userEvent.click(removeButton);
    // then
    await waitFor(() => expect(handleRemoveNote).toHaveBeenCalledWith(defaultProps.notes[0].id));
  });
});
