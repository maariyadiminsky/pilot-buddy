import { HomeIcon } from '@heroicons/react/20/solid';
import { ROUTES } from '@modules/app/constants';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

interface PageType {
  name: string;
  route: string;
  current: boolean;
}

interface BreadcrumbsProps {
  pathname: string;
  sessionId?: string;
}

const Breadcrumbs = ({ pathname, sessionId }: BreadcrumbsProps) => {
  const pages = useMemo(
    () =>
      [
        pathname === ROUTES.HOMEPAGE_ROUTE || sessionId
          ? { name: 'Study Room', route: ROUTES.HOMEPAGE_ROUTE, current: Boolean(!sessionId) }
          : undefined,
        pathname === ROUTES.PROFILE_ROUTE
          ? { name: 'Profile', route: ROUTES.PROFILE_ROUTE, current: true }
          : undefined,
        sessionId
          ? {
              name: 'Session',
              route: `/sessions/${sessionId}`,
              current: Boolean(sessionId),
            }
          : undefined,
      ].filter((page) => page) as PageType[],
    [sessionId, pathname]
  );

  if (!pages?.length) return null;

  return (
    <>
      <nav className="flex border-b border-gray-200 bg-sky-600" aria-label="Breadcrumb">
        <ol className="mx-left flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
          <li className="flex">
            <div className="flex items-center py-2">
              <Link to="/" className="text-white hover:text-sky-100">
                <HomeIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          {pages.map(({ name, route, current }) => (
            <li key={name} className="flex">
              <div className="flex items-center">
                <svg
                  className="h-full w-4 flex-shrink-0 text-white"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <Link
                  to={route}
                  className="ml-4 text-sm subpixel-antialiased lg:text-xs text-white hover:text-sky-100"
                  aria-current={current ? 'page' : undefined}
                >
                  {name}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
