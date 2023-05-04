import { useState, useMemo, createContext } from 'react';
import Sidebar from '@modules/common/components/sidebar/Sidebar';
import SearchHeader from '@common/components/header/SearchHeader';
import HeaderWithActions from '@common/components/header/HeaderWithActions';
import Breadcrumbs from '@modules/common/components/page/Breadcrumbs';
import { type BrandButtonType } from '@common/components/button/BrandButton';
import { Outlet, useParams, useLocation } from 'react-router-dom';

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

const PageProvider = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [pageHeaderActions, setPageHeaderActions] = useState<BrandButtonType[]>();
  const [shouldUpdatePinnedSessions, setShouldUpdatePinnedSessions] = useState(false);

  const { id: sessionId } = useParams();
  const { pathname } = useLocation();

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

  // will need to improve this if app grows
  const shouldHideMainElements = (!sessionId && pathname !== '/') || pathname.includes('start');
  return (
    <div className="relative isolate overflow-hidden bg-white h-full">
      {!shouldHideMainElements && (
        <Sidebar
          {...{
            shouldUpdatePinnedSessions,
            setShouldUpdatePinnedSessions,
            isSidebarOpen,
            setIsSidebarOpen,
          }}
        />
      )}
      <div className={`flex flex-col ${shouldHideMainElements ? '' : 'lg:pl-64'}`}>
        <SearchHeader {...{ setIsSidebarOpen }} shouldShowSearch={false} />
        <main className="flex-1">
          <>
            {!shouldHideMainElements && (
              <>
                <HeaderWithActions title={pageTitle} actions={pageHeaderActions} />
                <Breadcrumbs pathname={pathname} sessionId={sessionId} />
              </>
            )}

            <PageContext.Provider value={contextValues}>
              <Outlet />
            </PageContext.Provider>
          </>
        </main>
      </div>
    </div>
  );
};

export default PageProvider;
