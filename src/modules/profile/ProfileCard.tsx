import { WrapperTypeEnum, type UserType } from '@common/types';
import { Menu } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { ProfileDropdown, ProfilePicture } from '@modules/profile';
import { FC, Fragment, useRef } from 'react';

interface ProfileCardProps {
  wrapperType: keyof typeof WrapperTypeEnum;
  user?: UserType;
}

export const ProfileCard: FC<ProfileCardProps> = ({ wrapperType, user }) => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleMenuItemClick = () => {
    console.log(
      'in handleMenu itemclick:',
      menuButtonRef,
      'menuButtonRef.current?.blur:',
      menuButtonRef.current?.blur
    );
    menuButtonRef.current?.blur();
  };

  return (
    <Menu as="div" className="relative inline-block px-3 text-left">
      <div>
        <Menu.Button as={Fragment}>
          <button
            type="button"
            ref={menuButtonRef}
            className="group w-full rounded-md bg-gray-100 px-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none border border-gray-200 focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:ring-offset-gray-200"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex min-w-0 h-16 items-center justify-between space-x-3">
                <div className="w-12">
                  <ProfilePicture
                    wrapperType={wrapperType}
                    src={user ? user?.image || '' : undefined}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="truncate text-sm font-medium text-gray-900">
                    Welcome{user?.name ? ', ' : ''}
                    {user?.name}!
                  </div>
                  <div className="truncate text-sm text-gray-500">Have a nice day.</div>
                </div>
              </div>
              <ChevronUpDownIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </div>
          </button>
        </Menu.Button>
      </div>
      <ProfileDropdown handleMenuItemClick={handleMenuItemClick} wrapperType={wrapperType} />
    </Menu>
  );
};
