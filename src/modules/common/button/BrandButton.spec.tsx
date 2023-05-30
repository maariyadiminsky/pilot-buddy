import {
  BrandButton,
  BUTTON_STYLES,
  type BrandButtonProps,
  ButtonClassTypeEnum,
} from '@common/button';
import { render, screen, userEvent, waitFor } from '@modules/common/test';

const buttonText = 'some text';
const DEFAULT_PROPS = {
  text: buttonText,
  srText: buttonText,
  buttonClassType: ButtonClassTypeEnum.solidPink,
};
const setupProps = (props?: BrandButtonProps) => ({
  ...DEFAULT_PROPS,
  ...(props ? props : {}),
});

const Component = (props?: any) => <BrandButton {...setupProps(props)} />;
const renderComponent = (props?: any) => {
  const { rerender } = render(Component(props), {
    shouldHaveNoWrapper: true,
  });

  return { rerender };
};

describe('<BrandButton />', () => {
  it('renders the correct button text', () => {
    // given
    renderComponent();
    // when
    const button = screen.getByRole('button', { name: /some text/i });
    // then
    expect(button).toHaveTextContent(buttonText);
  });

  it('renders the correct button styles', () => {
    // given
    const { rerender } = renderComponent({ buttonClassType: ButtonClassTypeEnum.solidPink });
    // when
    const button = screen.getByRole('button', { name: /some text/i });
    // then
    expect(button).toHaveClass(BUTTON_STYLES.solidPink);

    // given
    rerender(Component({ buttonClassType: ButtonClassTypeEnum.clear }));
    // then
    expect(button).toHaveClass(BUTTON_STYLES.clear);

    // given
    rerender(Component({ buttonClassType: ButtonClassTypeEnum.solid }));
    // then
    expect(button).toHaveClass(BUTTON_STYLES.solid);
  });

  it('calls handleOnClick when clicked', async () => {
    // given
    const handleOnClick = jest.fn();
    renderComponent({ handleOnClick });
    const button = screen.getByRole('button', { name: /some text/i });
    // when
    userEvent.click(button);
    // then
    await waitFor(() => expect(handleOnClick).toHaveBeenCalled());
  });
});
