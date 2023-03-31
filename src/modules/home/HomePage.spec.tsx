import HomePage from './HomePage';
import { render, screen } from '@modules/test/setup';

it('renders hello world message', () => {
  render(<HomePage />);

  const greetings = screen.getByText(/Welcome!/i);

  expect(greetings).toBeInTheDocument();
});
