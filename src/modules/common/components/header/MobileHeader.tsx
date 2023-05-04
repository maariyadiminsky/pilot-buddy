import { Menu } from '@headlessui/react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import ProfileDropdown from '@common/components/profile/ProfileDropdown';
import ProfilePicture from '@common/components/profile/ProfilePicture';

interface SearchHeaderProps {
  setIsSidebarOpen: (value: boolean) => void;
}

const MobileHeader = ({ setIsSidebarOpen }: SearchHeaderProps) => (
  <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
    <button
      type="button"
      className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
      onClick={() => setIsSidebarOpen(true)}
    >
      <span className="sr-only">Open sidebar</span>
      <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
    </button>
    <div className="flex flex-1 justify-end px-4 sm:px-6 lg:px-8">
      <div className="flex items-center">
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="flex max-w-xs rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              <span className="sr-only">Open user menu</span>
              <ProfilePicture wrapperType="header" isMobile />
            </Menu.Button>
          </div>
          <ProfileDropdown wrapperType="header" />
        </Menu>
      </div>
    </div>
  </div>
);

export default MobileHeader;
