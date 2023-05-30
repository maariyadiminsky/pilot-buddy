import { render, screen } from '@common/test';
import { WrapperTypeEnum } from '@common/types';
import { ProfilePicture } from '@modules/profile';

const defaultProps = {
  wrapperType: WrapperTypeEnum.sidebar,
  src: 'https://example.com/profile-picture.png',
};

const renderComponent = (props = {}) => {
  const finalProps = { ...defaultProps, ...props };
  return render(<ProfilePicture {...finalProps} />, { shouldHaveNoWrapper: true });
};

describe('<ProfilePicture />', () => {
  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const userImage = screen.getByRole('img', { name: /User profile/i });
    // then
    expect(userImage).toBeInTheDocument();
  });

  it('displays the correct image when src is provided', () => {
    // given
    renderComponent();
    // when
    const userImage = screen.getByRole('img', { name: /User profile/i });
    // then
    expect(userImage).toHaveAttribute('src', defaultProps.src);
  });

  it('displays the UserCircleIcon when src is null', () => {
    // given
    renderComponent({ src: null });
    // when
    const userImage = screen.queryByLabelText('User profile');
    const defaultIconWhenNoImage = screen.getByLabelText('User Default Icon');
    // then
    expect(userImage).not.toBeInTheDocument();
    expect(defaultIconWhenNoImage).toBeInTheDocument();
  });

  it('displays a loader when src is undefined', () => {
    // given
    renderComponent({ src: undefined });
    // when
    const loader = screen.getByRole('status');
    // then
    expect(loader).toBeInTheDocument();
  });

  it('applies the correct style based on the wrapperType prop', () => {
    // given
    renderComponent({ wrapperType: 'header' });
    // when
    const imgElement = screen.getByRole('img', { name: /User profile/i });
    // then
    expect(imgElement).toHaveClass('h-8', 'w-8', 'rounded-full');
  });
});
