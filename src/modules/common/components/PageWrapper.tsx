import {
  CogIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  Bars4Icon,
  ClockIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

import Sidebar from '@common/components/Sidebar';
import SearchHeader from '@common/components/header/SearchHeader';
import HeaderWithActions from '@common/components/header/HeaderWithActions';

import { type ChildrenType } from '@common/types';

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'My tasks', href: '#', icon: Bars4Icon, current: false },
  { name: 'Recent', href: '#', icon: ClockIcon, current: false },
];

const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
];

interface PageWrapperProps {
  children: ChildrenType;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-full">
      <Sidebar {...{ navigation, secondaryNavigation, sidebarOpen, setSidebarOpen }} />
      <div className="flex flex-col lg:pl-64">
        <SearchHeader {...{ setSidebarOpen }} shouldShowSearch={false} />
        <main className="flex-1">
          <>
            <HeaderWithActions title="home" />
            {children}
          </>
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;
