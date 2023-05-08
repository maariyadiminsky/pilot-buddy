import { NotFoundPage } from '@common/page';
import { render, screen } from '@modules/test/setup';

it('renders error message', () => {
  render(<NotFoundPage />);

  const errorMessage = screen.getByText(/Oops 404!/i);

  expect(errorMessage).toBeInTheDocument();
});
