import { ButtonClassTypeEnum } from '@common/button';
import { render, screen, userEvent, waitFor } from '@common/test';
import { HeaderWithActions } from '@common/header';

const defaultProps = {
  title: 'Test Title',
  actions: [
    {
      text: 'Button 1',
      srText: 'button 1',
      handleOnClick: jest.fn(),
      buttonClassType: ButtonClassTypeEnum.solid,
    },
    {
      text: 'Button 2',
      srText: 'button1',
      handleOnClick: jest.fn(),
      buttonClassType: ButtonClassTypeEnum.clear,
    },
  ],
};
const renderComponent = () =>
  render(<HeaderWithActions {...defaultProps} />, { shouldHaveNoWrapper: true });

describe('<HeaderWithActions />', () => {
  it('renders with the correct title', () => {
    // given
    renderComponent();
    // when
    const title = screen.getByRole('heading', { name: defaultProps.title });
    // then
    expect(title).toBeInTheDocument();
  });

  it('renders the correct number of action buttons', () => {
    // given
    renderComponent();
    // when
    const buttons = screen.getAllByRole('button');
    // then
    expect(buttons).toHaveLength(defaultProps.actions.length);
  });

  it('renders the action buttons with the correct text', () => {
    // given
    renderComponent();
    // when
    defaultProps.actions.forEach((action) => {
      const button = screen.getByRole('button', { name: `${action.srText} ${action.text}` });
      // then
      expect(button).toBeInTheDocument();
    });
  });

  it('calls the correct function when the buttons are clicked', () => {
    // given
    renderComponent();
    // when
    defaultProps.actions.forEach((action) => {
      const button = screen.getByRole('button', { name: `${action.srText} ${action.text}` });
      userEvent.click(button);
      // then
      waitFor(() => expect(action.handleOnClick).toHaveBeenCalled());
    });
  });
});
