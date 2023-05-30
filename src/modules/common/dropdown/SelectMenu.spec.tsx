import { render, screen, userEvent, waitFor } from '@common/test';
import { SelectMenu } from '@common/dropdown';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

jest.mock('@common/hooks', () => ({
  useMenuAdjustment: () => ({
    menuRef: { current: null },
    menuAdjustment: '',
    adjustMenuToWindowHeight: jest.fn(),
  }),
}));

type SelectMenuItemType = {
  id: number;
  name: string;
};

const options: SelectMenuItemType[] = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
];

const defaultProps = {
  title: 'Test Select',
  icon: ChevronUpDownIcon,
  currentlySelected: options[0],
  handleSelect: jest.fn(),
  options,
};

const renderComponent = () =>
  render(<SelectMenu {...defaultProps} />, { shouldHaveNoWrapper: true });

describe('<SelectMenu />', () => {
  it('renders with the correct title', () => {
    // given
    renderComponent();
    //when
    const title = screen.getByText(/Test Select/i);
    // then
    expect(title).toBeInTheDocument();
  });

  it('renders with the currently selected option', () => {
    // given
    renderComponent();
    //when
    const defaultSelectedOption = screen.getByText(/Option 1/i);
    // then
    expect(defaultSelectedOption).toBeInTheDocument();
  });

  it('renders all the options when clicked', async () => {
    // given
    renderComponent();
    //when
    const menuButton = screen.getByRole('button');
    userEvent.click(menuButton);
    // then
    for (let option of options) {
      await waitFor(() => {
        expect(screen.getByText(option.name)).toBeInTheDocument();
      });
    }
  });

  it('calls handleSelect when an option is clicked', async () => {
    // given
    renderComponent();
    const menuButton = screen.getByRole('button');
    userEvent.click(menuButton);

    await waitFor(() => {
      const optionTwo = screen.getByText(/Option 2/i);
      expect(optionTwo).toBeInTheDocument();
      // when
      userEvent.click(optionTwo);
    });

    // then
    await waitFor(() => expect(defaultProps.handleSelect).toHaveBeenCalledWith(options[1]));
  });
});
