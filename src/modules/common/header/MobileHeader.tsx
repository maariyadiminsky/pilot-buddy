import { useDatabase } from '@common/database/hooks';
import { type UserType } from '@common/types';
import { Menu } from '@headlessui/react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import { ProfileDropdown, ProfilePicture } from '@modules/profile';
import { FC, Fragment, useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface MobileHeaderProps {
  setIsSidebarOpen: (value: boolean) => void;
}

export const MobileHeader: FC<MobileHeaderProps> = ({ setIsSidebarOpen }) => {
  const [user, setUser] = useState<UserType>();

  const { pathname } = useLocation();
  const { getUserProfileData } = useDatabase();

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleMenuItemClick = () => menuButtonRef.current?.blur();

  const getUser = useCallback(async () => {
    const userProfile = await getUserProfileData();
    setUser(userProfile);
  }, [getUserProfileData]);

  useEffect(() => {
    if (pathname === '/') {
      getUser();
    }
  }, [pathname, getUser]);

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600 lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex flex-1 justify-end px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button as={Fragment}>
                <button
                  type="button"
                  ref={menuButtonRef}
                  className="flex max-w-xs rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                >
                  <span className="sr-only">Open user menu</span>
                  <ProfilePicture wrapperType="header" src={user ? user?.image || '' : undefined} />
                </button>
              </Menu.Button>
            </div>
            <ProfileDropdown wrapperType="header" handleMenuItemClick={handleMenuItemClick} />
          </Menu>
        </div>
      </div>
    </div>
  );
};
