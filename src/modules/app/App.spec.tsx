import { LOADING_TEXT } from '@common/loader';
import { NOT_FOUND_PAGE_TEXT } from '@common/page';
import { App } from '@modules/app';
import { AuthProvider } from '@modules/auth';
import { HOMEPAGE_TEXT } from '@modules/home';
import { render, screen, mockIndexedDB, userEvent, waitFor } from '@modules/test';

jest.mock('@modules/auth/utils/encryption', () => ({
  encryptData: (data: string) => `fake_encryption_${data}`,
}));

jest.mock('@modules/auth/utils/cookie', () => {
  const cookieStore: Record<string, string> = {};

  return {
    setCookie: (key: string, value: string) => {
      cookieStore[key] = value;
    },
    getCookie: (keyName: string) => cookieStore[keyName],
    removeCookie: (keyName: string) => {
      delete cookieStore[keyName];
    },
  };
});

const Component = (initialLoginState = false) => (
  <AuthProvider initialLoginState={initialLoginState}>
    <App />
  </AuthProvider>
);
const renderComponent = (route: string = '/', initialLoginState: boolean = false) =>
  render(Component(initialLoginState), { route });

describe('</App>', () => {
  beforeAll(() => {
    mockIndexedDB();
  });

  it('renders loading state', () => {
    // given
    renderComponent();

    // when
    const loadingText = screen.getByText(LOADING_TEXT);

    // then
    expect(loadingText).toBeInTheDocument();
  });

  it('renders <Homepage /> elements when user is logged out', async () => {
    // given
    renderComponent();

    // when
    const headline = await screen.findByText(HOMEPAGE_TEXT.HEADLINE);
    const description = await screen.findByText(HOMEPAGE_TEXT.DESCRIPTION);
    const actionButton = await screen.findByRole('button');

    // then
    expect(headline).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(actionButton).toBeInTheDocument();
    expect(actionButton.firstChild).toHaveTextContent(HOMEPAGE_TEXT.ACTION);
  });

  it('renders login page when user clicks action button', async () => {
    // given
    renderComponent();

    const actionButton = await screen.findByRole('button');

    // when
    userEvent.click(actionButton);

    const emailTitle = await screen.findByText('Email address');
    const passwordTitle = await screen.findByText('Password');
    const emailInput = await screen.findByLabelText('email');
    const passwordInput = await screen.findByLabelText('password');
    const signInButton = await screen.findByRole('button', { name: 'Sign In' });

    // then
    expect(emailTitle).toBeInTheDocument();
    expect(passwordTitle).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it('renders <StudyRoom /> elements when user is logged in', async () => {
    // given
    renderComponent();

    // when
    // navigate to login page
    const actionButton = await screen.findByRole('button');
    userEvent.click(actionButton);

    // click button that changes view to sign up form
    const signUpViewButton = await screen.findByRole('button', { name: 'Sign up.' });
    expect(signUpViewButton).toBeInTheDocument();
    userEvent.click(signUpViewButton);

    // create email and password
    const email = 'test@gmail.com';
    const emailInput = await screen.findByLabelText('email');
    userEvent.type(emailInput, email);
    await waitFor(() => expect(emailInput).toHaveValue(email));

    const password = 'test-password';
    const passwordInput = await screen.findByLabelText('password');
    userEvent.type(passwordInput, password);
    await waitFor(() => expect(passwordInput).toHaveValue(password));
    // sign up
    const signUpButton = await screen.findByLabelText('Sign Up');
    expect(signUpButton).toBeInTheDocument();

    userEvent.click(signUpButton);

    // then
    // user should see StudyRoom elements once logged in
    const studyRoomPageTitles = await screen.findAllByText('Study Room');
    const welcomeText = await screen.findByText(/welcome/i);
    expect(studyRoomPageTitles[0]).toBeInTheDocument();
    expect(welcomeText).toBeInTheDocument();
  });

  it('renders 404 page when user routes to an incorrect route', async () => {
    // given
    renderComponent('/somerandomroute');

    // when
    const headline = await screen.findByText(NOT_FOUND_PAGE_TEXT.HEADLINE);
    const description = await screen.findByText(NOT_FOUND_PAGE_TEXT.DESCRIPTION);
    const button = await screen.findByRole('button', { name: NOT_FOUND_PAGE_TEXT.ACTION });

    // then
    expect(headline).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
