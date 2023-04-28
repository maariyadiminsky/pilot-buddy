import {
  CogIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  Bars4Icon,
  ClockIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

import Sidebar from '@modules/common/components/sidebar/Sidebar';
import SearchHeader from '@common/components/header/SearchHeader';
import HeaderWithActions from '@common/components/header/HeaderWithActions';
import Breadcrumbs from '@modules/common/components/page/Breadcrumbs';
import { type BrandButtonType } from '@common/components/button/BrandButton';
import { type ChildrenArrayType } from '@common/types';

const navigation = [
  { name: 'Study Room', href: '#', icon: BookOpenIcon, current: true },
  { name: 'My tasks', href: '#', icon: Bars4Icon, current: false },
  { name: 'Recent', href: '#', icon: ClockIcon, current: false },
];

const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
];

interface PageWrapperProps {
  title?: string;
  headerActions?: BrandButtonType[];
  children: ChildrenArrayType;
}

// todo: need to pass page data to breadcrumbs here.
const PageWrapper = ({ title, headerActions, children }: PageWrapperProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative isolate overflow-hidden bg-white h-screen">
      <Sidebar {...{ navigation, secondaryNavigation, sidebarOpen, setSidebarOpen }} />
      <div className="flex flex-col lg:pl-64">
        <SearchHeader {...{ setSidebarOpen }} shouldShowSearch={false} />
        <main className="flex-1">
          <>
            <HeaderWithActions title={title} actions={headerActions} />
            <Breadcrumbs />
            {children}
          </>
        </main>
      </div>
    </div>
  );
};

export default PageWrapper;
