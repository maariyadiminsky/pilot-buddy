import { render, screen, mockIndexedDB } from '@common/test';
import { ROUTES } from '@modules/app';
import { Breadcrumbs } from '@common/page';

interface TestPropsSetup {
  pathname?: string;
  sessionId?: string;
}
const setupProps = (props?: TestPropsSetup) => ({
  pathname: ROUTES.HOMEPAGE_ROUTE,
  ...(props || {}),
});

const renderComponent = (props?: TestPropsSetup) => render(<Breadcrumbs {...setupProps(props)} />);

describe('<Breadcrumbs />', () => {
  beforeAll(() => {
    mockIndexedDB();
  });

  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const breadcrumbs = screen.getByLabelText('Breadcrumb');
    // then
    expect(breadcrumbs).toBeInTheDocument();
  });

  it('renders Study Room for home page', () => {
    // given
    renderComponent();
    // when
    const studyRoomLink = screen.getByText('Study Room');
    // then
    expect(studyRoomLink).toBeInTheDocument();
  });

  it('renders Profile for profile page', () => {
    // given
    renderComponent({ pathname: ROUTES.PROFILE_ROUTE });
    // when
    const profileLink = screen.getByText('Profile');
    // then
    expect(profileLink).toBeInTheDocument();
  });

  it('renders Session for session page', () => {
    // given
    renderComponent({ pathname: '/sessions/12345', sessionId: '12345' });
    // when
    const sessionLink = screen.getByText('Session');
    // then
    expect(sessionLink).toBeInTheDocument();
  });

  it('does not render when no matching page', () => {
    // given
    renderComponent({ pathname: 'random/route' });
    // when
    const breadcrumbs = screen.queryByLabelText('Breadcrumb');
    // then
    expect(breadcrumbs).not.toBeInTheDocument();
  });
});
