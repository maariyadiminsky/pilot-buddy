import { render, screen, userEvent, waitFor } from '@common/test';
import { Note } from '@modules/session/notes';

const handleRemoveNote = jest.fn();
const handleEditNote = jest.fn();

const defaultProps = {
  id: 'note1',
  text: 'test note',
  icon: {
    name: 'testIcon',
    value: 'testValue',
    iconColor: 'red',
    bgColor: 'blue',
  },
  handleRemoveNote,
  handleEditNote,
};

const renderComponent = () => render(<Note {...defaultProps} />, { shouldHaveNoWrapper: true });

describe('<Note />', () => {
  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const textElement = screen.getByText('test note');
    // then
    expect(textElement).toBeInTheDocument();
  });

  it('renders the note with correct text and icon', () => {
    // given
    renderComponent();
    // when
    const textElement = screen.getByText('test note');
    const editButton = screen.getByRole('button', { name: /Edit note/i });
    const removeButton = screen.getByRole('button', { name: /Remove note/i });
    // then
    expect(textElement).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });

  it('handles the edit button click', async () => {
    // given
    renderComponent();
    const editButton = screen.getByRole('button', { name: /Edit note/i });
    // when
    userEvent.click(editButton);
    await waitFor(() => expect(handleEditNote).toHaveBeenCalledWith(defaultProps.id));
  });

  it('handles the remove button click', async () => {
    // given
    renderComponent();
    const removeButton = screen.getByRole('button', { name: /Remove note/i });
    // when
    userEvent.click(removeButton);
    // then
    await waitFor(() => expect(handleRemoveNote).toHaveBeenCalledWith(defaultProps.id));
  });
});
