import { ClockIcon } from '@heroicons/react/20/solid';
import SelectMenu, { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { TIME_OPTIONS } from '../constants';

interface TimeSelectProps {
  time: SelectMenuItemType;
  setTime: (value: SelectMenuItemType) => void;
}

const TimeSelectMenu = ({ time, setTime }: TimeSelectProps) => (
  <SelectMenu
    options={TIME_OPTIONS}
    icon={ClockIcon}
    currentlySelected={time}
    handleSelect={setTime}
  />
);

export default TimeSelectMenu;
