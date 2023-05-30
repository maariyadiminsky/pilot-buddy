import { render, screen } from '@common/test';
import { Loader, LoaderSizeEnum, LOADING_TEXT } from '@common/loader';

const renderComponent = (size = LoaderSizeEnum.medium) =>
  render(<Loader size={size} />, { shouldHaveNoWrapper: true });

describe('<Loader />', () => {
  it('renders without crashing', () => {
    //given
    renderComponent();
    // when
    const loader = screen.getByRole('status');
    // then
    expect(loader).toBeInTheDocument();
  });

  it('renders the loader with default size', () => {
    // given
    renderComponent();
    // when
    const loader = screen.getByRole('status');
    // then
    expect(loader.firstChild).toHaveClass('w-8 h-8');
  });

  it('renders the loader with provided size', () => {
    // given
    renderComponent(LoaderSizeEnum.small);
    // when
    const loader = screen.getByRole('status');
    // then
    expect(loader.firstChild).toHaveClass('w-6 h-6');
  });

  it('renders the loading text for screen readers', () => {
    // given
    renderComponent();
    // when
    const loaderText = screen.getByText(LOADING_TEXT);
    // then
    expect(loaderText).toBeInTheDocument();
  });
});
