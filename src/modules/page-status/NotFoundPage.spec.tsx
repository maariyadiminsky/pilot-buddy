import { render, screen } from '@modules/test/setup';
import NotFoundPage from './NotFoundPage';

it('renders error message', () => {
  render(<NotFoundPage />);

  const errorMessage = screen.getByText(/Oops 404!/i);

  expect(errorMessage).toBeInTheDocument();
});
