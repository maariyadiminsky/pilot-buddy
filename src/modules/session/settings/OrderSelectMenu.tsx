import { SelectMenu } from '@common/dropdown';
import { type SelectMenuItemType } from '@common/types';
import { ORDER_OPTIONS } from '@modules/session/constants';
import { FC } from 'react';

interface OrderSelectProps {
  order: SelectMenuItemType;
  setOrder: (value: SelectMenuItemType) => void;
}

export const OrderSelectMenu: FC<OrderSelectProps> = ({ order, setOrder }) => (
  <SelectMenu options={ORDER_OPTIONS} currentlySelected={order} handleSelect={setOrder} />
);
