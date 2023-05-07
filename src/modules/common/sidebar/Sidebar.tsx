import { useDatabase } from '@common/database/hooks';
import { captureException } from '@common/error-monitoring';
import { LogoutButton } from '@common/sidebar/LogoutButton';
import { NavigationItems } from '@common/sidebar/NavigationItems';
import { PinnedNavigation } from '@common/sidebar/PinnedNavigation';
import { type NavigationItem } from '@common/sidebar/types';
import { type UserType } from '@common/types';
import { Dialog, Transition } from '@headlessui/react';
import { BookOpenIcon, XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '@modules/auth';
import { ProfileCard } from '@modules/profile';
import { FC, Fragment, useContext, useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const NAVIGATION_INITIAL = [
  { id: 0, name: 'Study Room', route: '/', icon: BookOpenIcon, current: true },
];

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  shouldUpdatePinnedSessions: boolean;
  setShouldUpdatePinnedSessions: (value: boolean) => void;
}

export const Sidebar: FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  shouldUpdatePinnedSessions,
  setShouldUpdatePinnedSessions,
}) => {
  const { handleLogout } = useContext(AuthContext);
  const [user, setUser] = useState<UserType>();
  const [navigation, setNavigation] = useState<NavigationItem[]>(NAVIGATION_INITIAL);
  const [pinnedNavigation, setPinnedNavigation] = useState<NavigationItem[]>([]);

  const { getAllDBSessionTableItems, getUserProfileData } = useDatabase();
  const { id: sessionId } = useParams();
  const { pathname } = useLocation();

  useEffect(() => setShouldUpdatePinnedSessions(true), []);

  const getUser = useCallback(async () => {
    const userProfile = await getUserProfileData();
    setUser(userProfile);
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const getTableSessions = async () => {
      try {
        const sessionTableItems = await getAllDBSessionTableItems();
        if (sessionTableItems) {
          const pinnedSessions = sessionTableItems.filter(({ isPinned }) => isPinned);

          setPinnedNavigation(
            pinnedSessions.map(({ id, name }, index) => ({
              name,
              id: index,
              routeId: id,
              icon: ArrowTopRightOnSquareIcon,
              route: `/sessions/${id}`,
              current: false,
            }))
          );

          setShouldUpdatePinnedSessions(false);
        }
      } catch (error) {
        if (error instanceof Error && error.message) {
          captureException(error);
        }
      }
    };

    if (shouldUpdatePinnedSessions) {
      getTableSessions();
    }
  }, [shouldUpdatePinnedSessions]);

  const handleSetCurrent = useCallback(
    (id?: number | null, isPinnedNav?: boolean, ignoreUnSelectForOtherNav = false) => {
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
        if (!ignoreUnSelectForOtherNav) {
          const mainNav = navigation.find(({ current }) => current);
          if (mainNav) {
            handleSetCurrent(null);
          }
        }

        setPinnedNavigation(updatedData);
      } else {
        if (!ignoreUnSelectForOtherNav) {
          const pinnedNav = pinnedNavigation.find(({ current }) => current);
          if (pinnedNav) {
            handleSetCurrent(null, true);
          }
        }

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

  // will always keep nav correctly selected but
  // results in double checks when navs are not clicked directly.
  // I outweighed the pros/cons and see there would be more benefits here,
  // especially because there are so few nav items, even if the future will
  // have more, this shouldn't be much of a performance issue, if at all.
  // I would like to find a cleaner solution when cleaning up.
  useEffect(() => {
    if (pathname === '/') {
      setNavigation(NAVIGATION_INITIAL);
      handleSetCurrent(null, true, true);
      getUser();
    } else if (sessionId) {
      const navItemToBeSelected = pinnedNavigation.find(({ routeId }) => routeId === sessionId);
      // pass in id or null to unselect current in the
      // case the user clicks on an unpinned session
      handleSetCurrent(navItemToBeSelected?.id, true);
    }
  }, [sessionId, pathname]);

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
                <div className="mt-5 h-0 flex-1 flex flex-col justify-between">
                  <nav>
                    <NavigationItems
                      navigation={navigation}
                      handleSetCurrent={(id) => handleSetCurrent(id)}
                    />
                    <PinnedNavigation
                      navigation={pinnedNavigation}
                      handleSetCurrent={(id) => handleSetCurrent(id, true)}
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
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pb-4">
        <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-6">
          {/* User account dropdown */}
          <ProfileCard wrapperType="sidebar" user={user} />
          {/* Navigation */}
          <nav className="mt-6">
            <div className="px-3 space-y-1">
              <NavigationItems
                navigation={navigation}
                handleSetCurrent={(id) => handleSetCurrent(id)}
              />
            </div>
            <PinnedNavigation
              navigation={pinnedNavigation}
              handleSetCurrent={(id) => handleSetCurrent(id)}
            />
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
