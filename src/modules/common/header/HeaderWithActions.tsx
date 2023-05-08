import { BrandButton } from '@common/button';
import { type BrandButtonType } from '@common/types';
import { FC } from 'react';

interface HeaderWithActionsProps {
  title?: string;
  actions?: BrandButtonType[];
}

export const HeaderWithActions: FC<HeaderWithActionsProps> = ({ title, actions }) => (
  <div
    className={`border-b border-gray-200 px-4 py-4 md:py-0 md:h-16 ${
      actions && actions?.length >= 2 ? 'sm:flex' : 'flex'
    } sm:items-center sm:justify-between sm:px-6 lg:px-8`}
  >
    <div className="min-w-0 flex-1">
      <h1 className="text-md font-semibold leading-6 text-gray-900 antialiased sm:truncate">
        {title}
      </h1>
    </div>
    <div className="mt-4 flex sm:ml-4 sm:mt-0 space-x-3">
      {actions?.map((action, index) => (
        <BrandButton key={index} {...{ ...action }} />
      ))}
    </div>
  </div>
);
