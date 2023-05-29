import { render, screen } from '@common/test';
import { Loader, LoaderSizeEnum, LOADING_TEXT } from '@common/loader';

const renderComponent = (size = LoaderSizeEnum.medium) =>
  render(<Loader size={size} />, { shouldHaveNoWrapper: true });

describe('<Loader />', () => {
  it('renders without crashing', () => {
    renderComponent();

    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
  });

  it('renders the loader with default size', () => {
    renderComponent();

    const loader = screen.getByRole('status');
    expect(loader.firstChild).toHaveClass('w-8 h-8');
  });

  it('renders the loader with provided size', () => {
    renderComponent(LoaderSizeEnum.small);
    const loader = screen.getByRole('status');
    expect(loader.firstChild).toHaveClass('w-6 h-6');
  });

  it('renders the loading text for screen readers', () => {
    renderComponent();

    const loaderText = screen.getByText(LOADING_TEXT);
    expect(loaderText).toBeInTheDocument();
  });
});
