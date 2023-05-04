import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useState, useEffect, useCallback } from 'react';
import { BookOpenIcon, XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '@modules/auth/AuthProvider';
import ProfileCard from '@common/components/profile/ProfileCard';
import NavigationItems from '@common/components/sidebar/NavigationItems';
import LogoutButton from '@common/components/sidebar/LogoutButton';
import Logo from '@common/components/sidebar/images/airplane.png';
import { type NavigationItem } from '@common/components/sidebar/types';
import PinnedNavigation from '@common/components/sidebar/PinnedNavigation';
import { useDatabase } from '@common/hooks';

const NAVIGATION_INITIAL = [
  { id: 0, name: 'Study Room', route: '/', icon: BookOpenIcon, current: true },
];

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  shouldUpdatePinnedSessions: boolean;
  setShouldUpdatePinnedSessions: (value: boolean) => void;
}

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  shouldUpdatePinnedSessions,
  setShouldUpdatePinnedSessions,
}: SidebarProps) => {
  const { handleLogout } = useContext(AuthContext);
  const [navigation, setNavigation] = useState<NavigationItem[]>(NAVIGATION_INITIAL);
  const [pinnedNavigation, setPinnedNavigation] = useState<NavigationItem[]>([]);

  const { getAllDBSessionTableItems } = useDatabase();

  useEffect(() => {
    const getTableSessions = async () => {
      try {
        const sessionTableItems = await getAllDBSessionTableItems();

        if (sessionTableItems) {
          const pinnedSessions = sessionTableItems.filter(({ isPinned }) => isPinned);

          setPinnedNavigation(
            pinnedSessions.map(({ id, name }, index) => ({
              id: index,
              name,
              icon: ArrowTopRightOnSquareIcon,
              route: `sessions/${id}`,
              current: false,
            }))
          );

          setShouldUpdatePinnedSessions(false);
        }
      } catch (error) {
        if (error instanceof Error && error.message) {
          // todo: add error monitoring
          console.log(error);
        }
      }
    };

    if (shouldUpdatePinnedSessions) {
      getTableSessions();
    }
  }, [shouldUpdatePinnedSessions]);

  const handleSetCurrent = useCallback(
    (id?: number | null, isPinnedNav?: boolean) => {
      const updatedData = (isPinnedNav ? pinnedNavigation : navigation).map((item) => {
        if (item.current) {
          return { ...item, current: false };
        }

        if (item.id === id) {
          return { ...item, current: true };
        }

        return item;
      });

      if (isPinnedNav) {
        // check to make sure main nav doesn't have something selected
        const mainNav = navigation.find(({ current }) => current);
        if (mainNav) {
          handleSetCurrent(null);
        }

        setPinnedNavigation(updatedData);
      } else {
        // check to make sure pinned nav doesn't have something selected
        const pinnedNav = pinnedNavigation.find(({ current }) => current);
        if (pinnedNav) {
          handleSetCurrent(null, true);
        }
        setNavigation(updatedData);
      }
    },
    [navigation, pinnedNavigation]
  );

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
                <div className="mt-5 h-0 flex-1 flex flex-col justify-between">
                  <nav>
                    <NavigationItems
                      navigation={navigation}
                      handleSetCurrent={(id) => handleSetCurrent(id)}
                    />
                    <PinnedNavigation
                      navigation={pinnedNavigation}
                      handleSetCurrent={handleSetCurrent}
                    />
                  </nav>
                  <div className="flex flex-col justify-end items-start ml-4 text-gray-500 text-sm font-medium">
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
          <nav className="mt-6">
            <div className="px-3 space-y-1">
              <NavigationItems
                navigation={navigation}
                handleSetCurrent={(id) => handleSetCurrent(id)}
              />
            </div>
            <PinnedNavigation navigation={pinnedNavigation} handleSetCurrent={handleSetCurrent} />
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
