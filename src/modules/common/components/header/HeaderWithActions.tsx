import BrandButton, { type BrandButtonType } from '@common/components/button/BrandButton';
import { getUniqId } from '@common/utils';

interface HeaderWithActionsProps {
  title?: string;
  actions?: BrandButtonType[];
}

const HeaderWithActions = ({ title, actions }: HeaderWithActionsProps) => (
  <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
    <div className="min-w-0 flex-1">
      <h1 className="text-md font-semibold leading-6 text-gray-900 antialiased sm:truncate">
        {title}
      </h1>
    </div>
    <div className="mt-4 flex sm:ml-4 sm:mt-0 space-x-3">
      {actions?.map((action) => (
        <BrandButton key={getUniqId()} {...{ ...action }} />
      ))}
    </div>
  </div>
);

export default HeaderWithActions;
