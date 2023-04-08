import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { WrapperTypeEnum } from '@common/types';
import { truthyString } from '@common/utils';

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
      <div className="py-1">
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={truthyString(
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm'
              )}
            >
              View profile
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={truthyString(
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm'
              )}
            >
              Settings
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={truthyString(
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm'
              )}
            >
              Notifications
            </a>
          )}
        </Menu.Item>
      </div>
      <div className="py-1">
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={truthyString(
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm'
              )}
            >
              Get desktop app
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={truthyString(
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm'
              )}
            >
              Support
            </a>
          )}
        </Menu.Item>
      </div>
      <div className="py-1">
        <Menu.Item>
          {({ active }) => (
            <a
              href="#"
              className={truthyString(
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm'
              )}
            >
              Logout
            </a>
          )}
        </Menu.Item>
      </div>
    </Menu.Items>
  </Transition>
);

export default ProfileDropdown;
