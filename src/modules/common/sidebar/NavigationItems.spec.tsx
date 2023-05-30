import { render, screen, userEvent, waitFor, mockIndexedDB } from '@common/test';
import { NavigationItems } from '@common/sidebar/NavigationItems';
import { BookOpenIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const mockNavigation = [
  { id: 1, route: '/route1', current: true, name: 'Route 1', icon: BookOpenIcon },
  { id: 2, route: '/route2', current: false, name: 'Route 2', icon: ArrowTopRightOnSquareIcon },
];

const handleSetCurrentMock = jest.fn();

const renderComponent = () =>
  render(<NavigationItems navigation={mockNavigation} handleSetCurrent={handleSetCurrentMock} />);

describe('<NavigationItems />', () => {
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

  it('handles link click event', async () => {
    // given
    renderComponent();
    const links = screen.getAllByRole('link');
    // when
    userEvent.click(links[0]);
    // then
    await waitFor(() => {
      expect(handleSetCurrentMock).toHaveBeenCalledTimes(1);
      expect(handleSetCurrentMock).toHaveBeenCalledWith(mockNavigation[0].id);
    });
  });
});
