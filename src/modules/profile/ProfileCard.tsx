import { Menu } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

import ProfileDropdown from '@modules/profile/ProfileDropdown';
import ProfilePicture from '@modules/profile/ProfilePicture';
import { WrapperTypeEnum } from '@common/types';

interface ProfileCardProps {
  wrapperType: keyof typeof WrapperTypeEnum;
  name?: string;
}

const ProfileCard = ({ wrapperType, name }: ProfileCardProps) => (
  <Menu as="div" className="relative inline-block px-3 text-left">
    <div>
      <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none border border-gray-200 focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:ring-offset-gray-200">
        <span className="flex w-full items-center justify-between">
          <span className="flex min-w-0 items-center justify-between space-x-3">
            <ProfilePicture {...{ wrapperType }} />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-gray-900">Welcome!</span>
              <span className="truncate text-sm text-gray-500">{name}</span>
            </span>
          </span>
          <ChevronUpDownIcon
            className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </span>
      </Menu.Button>
    </div>
    <ProfileDropdown {...{ wrapperType }} />
  </Menu>
);

export default ProfileCard;
