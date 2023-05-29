import { render, screen, fireEvent, waitFor } from '@common/test';
import { Range } from '@common/range';
import { useState } from 'react';

const renderComponent = (value = 50, handleOnChange = jest.fn()) =>
  render(
    <Range
      title="Test Range"
      srText="Test SR Text"
      value={value}
      min="0"
      max="100"
      step="1"
      handleOnChange={handleOnChange}
    />,
    { shouldHaveNoWrapper: true }
  );

describe('<Range />', () => {
  it('renders without crashing', () => {
    //given
    renderComponent();
    //when
    const input = screen.getByRole('slider') as HTMLInputElement;
    // then
    expect(input).toBeInTheDocument();
  });

  it('handles onChange event', () => {
    // given
    const handleChange = jest.fn();
    const TestWrapper = () => {
      const [value, setValue] = useState(50);
      return (
        <Range
          title="Test Range"
          srText="Test SR Text"
          value={value}
          min="0"
          max="100"
          step="1"
          handleOnChange={(e) => {
            handleChange();
            setValue(Number((e.target as HTMLInputElement).value));
          }}
        />
      );
    };
    render(<TestWrapper />, { shouldHaveNoWrapper: true });
    const input = screen.getByRole('slider') as HTMLInputElement;
    // when
    fireEvent.change(input, { target: { value: 75 } });
    // then
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('75');
  });

  it('displays the given title', () => {
    // given
    renderComponent();
    // when
    const label = screen.getByText('Test Range');
    // then
    expect(label).toBeInTheDocument();
  });
});
