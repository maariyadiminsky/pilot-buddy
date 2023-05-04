import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { WrapperTypeEnum } from '@common/types';
import { truthyString } from '@common/utils';
import ProfileLink from '@modules/profile/ProfileLink';
import { HeartIcon, BugAntIcon, CodeBracketIcon } from '@heroicons/react/20/solid';

interface ProfileDropdownProps {
  wrapperType: keyof typeof WrapperTypeEnum;
}

const styles = {
  menu: {
    sidebar: 'left-0 mx-3 mt-1 origin-top',
    header: 'mt-2 w-48 origin-top-right',
  },
};

const ProfileDropdown = ({ wrapperType }: ProfileDropdownProps) => (
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items
      className={truthyString(
        'absolute right-0 z-10 divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
        wrapperType && styles.menu[wrapperType]
      )}
    >
      <div className="py-1 hover:bg-gray-200">
        <ProfileLink link="#" text="View Profile" />
      </div>
      <div>
        <ProfileLink
          link="https://www.buymeacoffee.com/mariya.diminsky"
          text="Buy me Ramen"
          icon={HeartIcon}
          iconClassName="text-rose-500"
          isExternalLink
        />
        <ProfileLink
          link="https://github.com/maariyadiminsky/pilot-buddy/issues"
          text="Support"
          icon={BugAntIcon}
          isExternalLink
        />
        <ProfileLink
          link="https://github.com/maariyadiminsky/pilot-buddy"
          text="Github"
          icon={CodeBracketIcon}
          isExternalLink
        />
      </div>
    </Menu.Items>
  </Transition>
);

export default ProfileDropdown;
