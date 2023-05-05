import { SyntheticEvent } from 'react';

interface RangeProps {
  title: string;
  srText: string;
  value: number;
  min: string;
  max: string;
  step: string;
  handleOnChange: (event: SyntheticEvent) => void;
}

const Range = ({ title, srText, value, min, max, step, handleOnChange }: RangeProps) => (
  <div className="flex flex-row space-x-3 items-center pr-0.5">
    <label htmlFor={title} className="flex text-sm font-medium text-gray-700 w-12">
      {title}
    </label>
    <input
      {...{ min, max, step, value }}
      onChange={handleOnChange}
      aria-label={srText}
      id={title}
      type="range"
      className="h-2 xl:h-1 bg-gray-200 rounded-lg accent-sky-600 appearance-none cursor-pointer dark:bg-gray-300"
    />
  </div>
);

export default Range;
