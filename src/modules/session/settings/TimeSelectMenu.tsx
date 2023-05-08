import { SelectMenu } from '@common/dropdown';
import { type SelectMenuItemType } from '@common/types';
import { ClockIcon } from '@heroicons/react/20/solid';
import { TIME_OPTIONS } from 'modules/session/constants';
import { FC } from 'react';

interface TimeSelectProps {
  time: SelectMenuItemType;
  setTime: (value: SelectMenuItemType) => void;
}

export const TimeSelectMenu: FC<TimeSelectProps> = ({ time, setTime }) => (
  <SelectMenu
    options={TIME_OPTIONS}
    icon={ClockIcon}
    currentlySelected={time}
    handleSelect={setTime}
  />
);
