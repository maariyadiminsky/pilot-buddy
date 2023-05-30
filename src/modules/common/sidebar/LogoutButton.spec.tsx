import { render, screen, userEvent, waitFor } from '@common/test';
import { LogoutButton } from '@common/sidebar/LogoutButton';

const handleClick = jest.fn();
const renderComponent = () =>
  render(<LogoutButton handleLogout={handleClick} />, { shouldHaveNoWrapper: true });

describe('<LogoutButton />', () => {
  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const button = screen.getByRole('button', { name: /logout/i });
    // then
    expect(button).toBeInTheDocument();
  });

  it('handles click event', async () => {
    // given
    renderComponent();
    // when
    const button = screen.getByRole('button', { name: /logout/i });
    // then
    userEvent.click(button);

    await waitFor(() => expect(handleClick).toHaveBeenCalledTimes(1));
  });
});
