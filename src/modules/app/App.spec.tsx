import { App } from '@modules/app';
import { render, screen, mockIndexedDB } from '@modules/test';

describe('</App>', () => {
  beforeAll(() => {
    mockIndexedDB();
  });

  it('renders initial components', () => {
    render(<App />, { route: '/' });
  });
});
