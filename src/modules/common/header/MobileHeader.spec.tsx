import { render, mockIndexedDB } from '@common/test';
import { MobileHeader } from '@common/header';
import { useDatabase } from '@common/database/hooks';

jest.mock('@common/database/hooks');

describe('<MobileHeader />', () => {
  let setIsSidebarOpen: jest.Mock;
  const getUserProfileData = jest.fn();

  beforeAll(() => {
    mockIndexedDB();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    setIsSidebarOpen = jest.fn();

    (useDatabase as jest.Mock).mockReturnValue({
      getUserProfileData,
    });
  });

  it('fetches user profile data when on root path', async () => {
    const user = { id: '1', image: 'image.png' };
    getUserProfileData.mockResolvedValueOnce(user);

    render(<MobileHeader setIsSidebarOpen={setIsSidebarOpen} />, { route: '/' });
    expect(getUserProfileData).toHaveBeenCalled();
  });

  it('does not fetch user profile data when not on root path', async () => {
    render(<MobileHeader setIsSidebarOpen={setIsSidebarOpen} />, { route: '/not-root' });
    expect(getUserProfileData).not.toHaveBeenCalled();
  });
});
