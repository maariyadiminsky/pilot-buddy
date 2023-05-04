import { Menu } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import ProfileDropdown from '@common/components/profile/ProfileDropdown';
import ProfilePicture from '@common/components/profile/ProfilePicture';
import { Dispatch, SetStateAction } from 'react';

interface SearchHeaderProps {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  shouldShowSearch?: boolean;
}

const SearchHeader = ({ setIsSidebarOpen, shouldShowSearch = true }: SearchHeaderProps) => (
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
      {shouldShowSearch && (
        <div className="flex flex-1">
          <form className="flex w-full md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                name="search-field"
                className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm"
                placeholder="Search"
                type="search"
              />
            </div>
          </form>
        </div>
      )}
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

export default SearchHeader;
