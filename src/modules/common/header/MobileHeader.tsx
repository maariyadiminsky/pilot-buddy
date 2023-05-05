import { Menu } from '@headlessui/react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import ProfileDropdown from '@modules/profile/ProfileDropdown';
import ProfilePicture from '@modules/profile/ProfilePicture';
import { useDatabase, type UserType } from '@common/hooks';
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface MobileHeaderProps {
  setIsSidebarOpen: (value: boolean) => void;
}

const MobileHeader = ({ setIsSidebarOpen }: MobileHeaderProps) => {
  const [user, setUser] = useState<UserType>();

  const { pathname } = useLocation();
  const { getUserProfileData } = useDatabase();

  const getUser = useCallback(async () => {
    const userProfile = await getUserProfileData();
    setUser(userProfile);
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      getUser();
    }
  }, [pathname]);

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
              <Menu.Button className="flex max-w-xs rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <ProfilePicture wrapperType="header" src={user?.image} />
              </Menu.Button>
            </div>
            <ProfileDropdown wrapperType="header" />
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
