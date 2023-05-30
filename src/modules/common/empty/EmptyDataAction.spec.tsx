import { render, screen, userEvent, waitFor } from '@common/test';
import { EmptyDataAction } from '@common/empty';

const defaultProps = {
  title: 'No data available',
  description: 'Please add some data',
  buttonText: 'Add data',
  handleOnClick: jest.fn(),
};

const renderComponent = () =>
  render(<EmptyDataAction {...defaultProps} />, { shouldHaveNoWrapper: true });

describe('<EmptyDataAction />', () => {
  it('renders with the correct title and description', () => {
    // given
    renderComponent();
    // when
    const title = screen.getByText(defaultProps.title);
    const description = screen.getByText(defaultProps.description);
    // then
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('renders the button with correct text', () => {
    // given
    renderComponent();
    // when
    const button = screen.getByRole('button', {
      name: `${defaultProps.buttonText} ${defaultProps.buttonText}`,
    });
    // then
    expect(button).toBeInTheDocument();
  });

  it('calls handleOnClick when the button is clicked', () => {
    // given
    renderComponent();
    // when
    const button = screen.getByRole('button', {
      name: `${defaultProps.buttonText} ${defaultProps.buttonText}`,
    });
    userEvent.click(button);
    // then
    waitFor(() => expect(defaultProps.handleOnClick).toHaveBeenCalled());
  });
});
