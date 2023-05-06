import { MobileHeader, HeaderWithActions } from '@common/header';
import { Sidebar } from '@common/sidebar';
import { type BrandButtonType } from '@common/types';
import { Breadcrumbs } from '@common/page';
import { ROUTES, ROUTE_PATHS } from '@modules/app';
import { AuthContext } from '@modules/auth';
import { FC, useState, useMemo, createContext, useContext } from 'react';
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

export const PageProvider: FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [pageHeaderActions, setPageHeaderActions] = useState<BrandButtonType[]>();
  const [shouldUpdatePinnedSessions, setShouldUpdatePinnedSessions] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

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

  if (!isLoggedIn) return <Outlet />;

  // will need to improve this if app grows
  const shouldShowMainElements =
    sessionId || (pathname !== ROUTES.NOT_FOUND_ROUTE && ROUTE_PATHS.includes(pathname));
  return (
    <div className="relative isolate overflow-hidden bg-white h-full">
      {shouldShowMainElements && (
        <Sidebar
          {...{
            shouldUpdatePinnedSessions,
            setShouldUpdatePinnedSessions,
            isSidebarOpen,
            setIsSidebarOpen,
          }}
        />
      )}
      <div className={`flex flex-col ${shouldShowMainElements ? 'lg:pl-64' : ''}`}>
        <MobileHeader {...{ setIsSidebarOpen }} />
        <main className="flex-1">
          <>
            {shouldShowMainElements && (
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
