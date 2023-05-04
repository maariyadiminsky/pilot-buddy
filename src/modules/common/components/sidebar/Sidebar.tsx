import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useState } from 'react';
import { BookOpenIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '@modules/auth/AuthProvider';
import ProfileCard from '@common/components/profile/ProfileCard';
import NavigationItems from '@common/components/sidebar/NavigationItems';
import LogoutButton from '@common/components/sidebar/LogoutButton';
import Logo from '@common/components/sidebar/images/airplane.png';

const NAVIGATION_INITIAL = [
  { id: 0, name: 'Study Room', route: '/', icon: BookOpenIcon, current: true },
  { id: 1, name: 'Session', route: '/sdfsd', icon: BookOpenIcon, current: false },
];

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const { handleLogout } = useContext(AuthContext);
  const [navigation, setNavigation] = useState(NAVIGATION_INITIAL);

  const handleSetCurrent = (id: number) => {
    const updatedData = navigation.map((item) => {
      if (item.current) {
        return { ...item, current: false };
      }

      if (item.id === id) {
        return { ...item, current: true };
      }

      return item;
    });

    setNavigation(updatedData);
  };

  return (
    <>
      {/* mobile sidebar with transition effect */}
      <Transition.Root show={isSidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setIsSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute right-0 top-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img className="h-8 w-auto text-sky-600" src={Logo} alt="Pilot Buddy" />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="divide-y divide-gray-200">
                    <NavigationItems navigation={navigation} handleSetCurrent={handleSetCurrent} />
                    {/* <div className="mt-6 pt-6">
                      <div className="space-y-1 px-2">
                        <SecondaryNavigationItems secondaryNavigation={secondaryNavigation} />
                      </div>
                    </div> */}
                  </nav>
                  <div className="flex flex-col justify-end items-start ml-4 flex-1 text-gray-500 text-sm font-medium">
                    <LogoutButton handleLogout={handleLogout} />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* desktop static sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pb-4 lg:pt-5">
        <div className="flex flex-shrink-0 items-center px-6">
          <img className="h-8 w-auto text-sky-600" src={Logo} alt="Pilot Buddy" />
        </div>
        <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
          {/* User account dropdown */}
          <ProfileCard wrapperType="sidebar" />
          {/* Navigation */}
          <nav className="divide-y divide-gray-200 mt-6">
            <div className="px-3 space-y-1">
              <NavigationItems navigation={navigation} handleSetCurrent={handleSetCurrent} />
            </div>
            {/* <div className="mt-6 pt-6">
              <div className="space-y-1 px-2">
                {secondaryNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={truthyString(
                      item.current
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                    )}
                  >
                    <item.icon
                      className={truthyString(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 h-6 w-6 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </div> */}
          </nav>
          <div className="flex flex-col justify-end items-start ml-4 flex-1 text-gray-500 text-sm font-medium">
            <LogoutButton handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
