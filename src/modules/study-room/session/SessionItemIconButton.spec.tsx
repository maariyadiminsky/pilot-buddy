import { render, userEvent, screen, waitFor, mockIndexedDB } from '@common/test';
import { SessionItemIconButton } from '@modules/study-room/session/SessionItemIconButton';
import { BookOpenIcon } from '@heroicons/react/24/outline';

const iconMock = BookOpenIcon;
const srTextMock = 'Test Button';
const linkMock = '/test-link';
const handleOnClickMock = jest.fn();

const defaultProps = {
  icon: iconMock,
  srText: srTextMock,
};

const renderComponent = (props = {}) => {
  const finalProps = { ...defaultProps, ...props };
  return render(<SessionItemIconButton {...finalProps} />);
};

describe('<SessionItemIconButton />', () => {
  beforeAll(() => {
    mockIndexedDB();
  });

  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const button = screen.getByRole('button');
    // then
    expect(button).toBeInTheDocument();
  });

  it('displays a screen reader only text', () => {
    // given
    renderComponent();
    // when
    const screenReaderText = screen.getByText(srTextMock);
    // then
    expect(screenReaderText).toBeInTheDocument();
  });

  it('should be disabled when isDisabled is set to true', () => {
    // given
    renderComponent({ isDisabled: true });
    // when
    const button = screen.getByRole('button');
    // then
    expect(button).toBeDisabled();
  });

  it('calls handleOnClick when clicked', async () => {
    // given
    renderComponent({ handleOnClick: handleOnClickMock });
    const button = screen.getByRole('button');
    // when
    userEvent.click(button);
    // then
    await waitFor(() => expect(handleOnClickMock).toHaveBeenCalled());
  });

  it('should be wrapped in a Link when link prop is provided and isDisabled is false', () => {
    // given
    renderComponent({ link: linkMock });
    // when
    const link = screen.getByRole('link');
    // then
    expect(link).toBeInTheDocument();
  });
});
