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
    // given
    const user = { id: '1', image: 'image.png' };
    getUserProfileData.mockResolvedValueOnce(user);
    // when
    render(<MobileHeader setIsSidebarOpen={setIsSidebarOpen} />, { route: '/' });
    // then
    expect(getUserProfileData).toHaveBeenCalled();
  });
});
