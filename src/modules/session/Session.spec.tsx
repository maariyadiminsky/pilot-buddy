import { render, screen, waitFor, mockIndexedDB } from '@common/test';
import { Session } from '@modules/session';
import { useDatabase } from '@common/database/hooks';
import { ROUTES } from '@modules/app';
import { DATABASE_ERROR } from '@common/database/constants';
import { useParams, useNavigate } from 'react-router-dom';

jest.mock('@common/database/hooks');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const getDBSessionMock = jest.fn();
const getDBSessionTableItemMock = jest.fn();

const renderComponent = () => render(<Session />);

const ID = '1';
describe('<Session />', () => {
  beforeAll(() => mockIndexedDB());

  beforeEach(() => {
    (useDatabase as jest.Mock).mockReturnValue({
      getDBSession: getDBSessionMock,
      getDBSessionTableItem: getDBSessionTableItemMock,
    });

    (useParams as jest.Mock).mockReturnValue({ id: ID });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const sessionElement = screen.getByText(`session number ${ID}`);
    // then
    expect(sessionElement).toBeInTheDocument();
  });

  it('navigates to not found page when session is not found', async () => {
    // given
    getDBSessionMock.mockRejectedValue(new Error(DATABASE_ERROR.SESSION_NOT_FOUND));
    // when
    renderComponent();
    await waitFor(() => {
      // then
      expect(useNavigate()).toHaveBeenCalledWith(ROUTES.NOT_FOUND_ROUTE);
    });
  });

  it('sets session data correctly when retrieved successfully', async () => {
    // given
    const mockSessionData = {
      id: '1',
      name: 'Test Session',
      questions: ['q1', 'q2'],
    };
    getDBSessionMock.mockResolvedValue(mockSessionData);
    // when
    renderComponent();
    // then
    await waitFor(() => {
      expect(getDBSessionMock).toHaveBeenCalledWith('1');
    });
  });
});
