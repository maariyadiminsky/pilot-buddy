import { render, screen, fireEvent, userEvent, waitFor } from '@common/test';
import { NoteAction } from '@modules/session/notes';

const handleSubmit = jest.fn();
const handleHideNote = jest.fn();

const defaultProps = {
  handleSubmit,
  shouldHide: false,
  handleHideNote,
};

const renderComponent = () =>
  render(<NoteAction {...defaultProps} />, { shouldHaveNoWrapper: true });

describe('<NoteAction />', () => {
  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const textElement = screen.getByLabelText('note');
    // then
    expect(textElement).toBeInTheDocument();
  });

  it('renders the form fields properly', () => {
    // given
    renderComponent();
    // when
    const textElement = screen.getByLabelText('note');
    const iconButton = screen.getByRole('button', { name: /Note type/i });
    // then
    expect(textElement).toBeInTheDocument();
    expect(iconButton).toBeInTheDocument();
  });

  it('updates the text field', async () => {
    // given
    renderComponent();
    const textElement = screen.getByLabelText('note');
    // when
    userEvent.type(textElement, 'test');
    // then
    await waitFor(() => expect(textElement).toHaveValue('test'));
  });

  it('handles the form submission', async () => {
    // given
    renderComponent();
    const textElement = screen.getByLabelText('note');
    userEvent.type(textElement, 'test');
    // when
    await waitFor(() => expect(textElement).toHaveValue('test'));
    fireEvent.submit(screen.getByRole('form'));
    // then
    expect(handleSubmit).toHaveBeenCalled();
  });
});
