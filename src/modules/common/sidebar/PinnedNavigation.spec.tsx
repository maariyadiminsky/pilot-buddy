import { render, screen, mockIndexedDB } from '@common/test';
import { PinnedNavigation } from '@common/sidebar/PinnedNavigation';
import { BookOpenIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const mockNavigation = [
  { id: 1, route: '/route1', current: true, name: 'Route 1', icon: BookOpenIcon },
  { id: 2, route: '/route2', current: false, name: 'Route 2', icon: ArrowTopRightOnSquareIcon },
];

const handleSetCurrentMock = jest.fn();

const renderComponent = () =>
  render(<PinnedNavigation navigation={mockNavigation} handleSetCurrent={handleSetCurrentMock} />);

describe('<PinnedNavigation />', () => {
  beforeAll(() => {
    mockIndexedDB();
  });

  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const links = screen.getAllByRole('link');
    // then
    expect(links).toHaveLength(mockNavigation.length);
  });

  it('renders "Pinned" title', () => {
    // given
    renderComponent();
    // when
    const pinnedTitle = screen.getByText(/Pinned/i);
    // then
    expect(pinnedTitle).toBeInTheDocument();
  });

  it('renders nothing when there is no navigation', () => {
    // given
    render(<PinnedNavigation navigation={[]} handleSetCurrent={handleSetCurrentMock} />);
    // when
    const links = screen.queryByRole('link');
    // then
    expect(links).toBeNull();
  });
});
