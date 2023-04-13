import SelectMenu, { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { ORDER_OPTIONS } from '../constants';

interface OrderSelectProps {
  order: SelectMenuItemType;
  setOrder: (value: SelectMenuItemType) => void;
}

const OrderSelectMenu = ({ order, setOrder }: OrderSelectProps) => (
  <SelectMenu options={ORDER_OPTIONS} currentlySelected={order} handleSelect={setOrder} />
);

export default OrderSelectMenu;
