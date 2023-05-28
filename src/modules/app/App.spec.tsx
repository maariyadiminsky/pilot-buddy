import { App } from '@modules/app';
import { render, screen } from '@modules/test';

describe('</App>', () => {
  it('renders initial components', () => {
    render(<App />, { route: '/' });
  });
});
