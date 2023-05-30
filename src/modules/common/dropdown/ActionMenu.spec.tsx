import { render, screen, userEvent } from '@common/test';
import { ActionMenu, DropdownTypeEnum, type ActionMenuProps } from '@common/dropdown';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

const actions = [
  {
    text: 'Action 1',
    srText: 'Action 1',
    icon: EllipsisVerticalIcon,
    handleOnClick: jest.fn(),
  },
  {
    text: 'Action 2',
    srText: 'Action 2',
    icon: EllipsisVerticalIcon,
    handleOnClick: jest.fn(),
  },
];

const DEFAULT_PROPS = {
  name: 'Test Menu',
  actions,
};

const setupProps = (props: ActionMenuProps) => ({
  ...DEFAULT_PROPS,
  ...props,
});

const Component = (props?: any) => <ActionMenu {...setupProps(props)} />;
const renderComponent = (props?: any) => {
  render(Component(props), { shouldHaveNoWrapper: true });
};

describe('<ActionMenu />', () => {
  it('renders the correct button content by type', () => {
    // given
    renderComponent({ type: DropdownTypeEnum.sort });
    // when
    const button = screen.getByRole('button', { name: /Open Test Menu options/i });
    // then
    expect(button).toHaveTextContent('Sort');
  });

  it('renders the correct number of action items', async () => {
    // given
    renderComponent();
    const button = screen.getByRole('button', { name: /Open Test Menu options/i });
    // when
    userEvent.click(button);
    const buttonAndSrOnly = await screen.findAllByText(/Action/i);
    const buttonsWithoutScreenReaderElements = buttonAndSrOnly.length / 2;
    // then
    expect(buttonsWithoutScreenReaderElements).toBe(2);
  });
});
