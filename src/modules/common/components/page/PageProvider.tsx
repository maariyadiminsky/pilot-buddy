import { ReactNode, useState, useMemo, createContext } from 'react';

import Sidebar from '@modules/common/components/sidebar/Sidebar';
import SearchHeader from '@common/components/header/SearchHeader';
import HeaderWithActions from '@common/components/header/HeaderWithActions';
import Breadcrumbs from '@modules/common/components/page/Breadcrumbs';
import { type BrandButtonType } from '@common/components/button/BrandButton';

interface PageProps {
  children: ReactNode;
}

interface PageContextProps {
  pageTitle: string;
  setPageTitle: (value: string) => void;
  pageHeaderActions?: BrandButtonType[];
  setPageHeaderActions: (value: BrandButtonType[]) => void;
  setShouldUpdatePinnedSessions: (value: boolean) => void;
}

export const PageContext = createContext<PageContextProps>({
  pageTitle: '',
  pageHeaderActions: undefined,
  setPageTitle: () => {},
  setPageHeaderActions: () => {},
  setShouldUpdatePinnedSessions: () => {},
});

const PageProvider = ({ children }: PageProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [pageHeaderActions, setPageHeaderActions] = useState<BrandButtonType[]>();
  const [shouldUpdatePinnedSessions, setShouldUpdatePinnedSessions] = useState(true);

  const contextValues = useMemo(
    () => ({
      pageTitle,
      setPageTitle,
      pageHeaderActions,
      setPageHeaderActions,
      setShouldUpdatePinnedSessions,
    }),
    [
      pageTitle,
      setPageTitle,
      pageHeaderActions,
      setPageHeaderActions,
      setShouldUpdatePinnedSessions,
    ]
  );

  return (
    <div className="relative isolate overflow-hidden bg-white h-full">
      <Sidebar
        {...{
          shouldUpdatePinnedSessions,
          setShouldUpdatePinnedSessions,
          isSidebarOpen,
          setIsSidebarOpen,
        }}
      />
      <div className="flex flex-col lg:pl-64">
        <SearchHeader {...{ setIsSidebarOpen }} shouldShowSearch={false} />
        <main className="flex-1">
          <>
            <Breadcrumbs>
              <HeaderWithActions title={pageTitle} actions={pageHeaderActions} />
            </Breadcrumbs>

            <PageContext.Provider value={contextValues}>{children}</PageContext.Provider>
          </>
        </main>
      </div>
    </div>
  );
};

export default PageProvider;
