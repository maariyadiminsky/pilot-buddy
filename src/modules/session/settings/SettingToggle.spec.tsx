import { render, screen, userEvent, waitFor } from '@common/test';
import { SettingToggle, type SettingToggleType } from '@modules/session/settings';

const defaultProps: SettingToggleType = {
  title: 'Test Title',
  description: 'Test Description',
  getter: false,
  setter: jest.fn(),
};

const renderComponent = (props = {}) => {
  const finalProps = { ...defaultProps, ...props };
  return render(<SettingToggle {...finalProps} />, { shouldHaveNoWrapper: true });
};

describe('SettingToggle', () => {
  it('renders without crashing', () => {
    // given
    renderComponent();
    // when
    const toggleTitle = screen.getByText('Test Title');
    const toggleDescription = screen.getByText('Test Description');
    // then
    expect(toggleTitle).toBeInTheDocument();
    expect(toggleDescription).toBeInTheDocument();
  });

  it('triggers the setter function when clicked', async () => {
    // given
    const mockSetter = jest.fn();
    renderComponent({ setter: mockSetter });
    const switchElement = screen.getByRole('switch');
    // when
    userEvent.click(switchElement);
    // then
    await waitFor(() => expect(mockSetter).toHaveBeenCalled());
  });

  it('displays correct color based on getter value', () => {
    // given
    const { rerender } = renderComponent();
    let switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('bg-gray-200');
    // when
    rerender(<SettingToggle {...{ ...defaultProps, getter: true }} />);
    switchElement = screen.getByRole('switch');
    // then
    expect(switchElement).toHaveClass('bg-sky-600');
  });
});
