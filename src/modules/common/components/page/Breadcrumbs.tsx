import { HomeIcon } from '@heroicons/react/20/solid';
import { ROUTES } from '@modules/common/api/constants';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

interface PageType {
  name: string;
  href: string;
  current: boolean;
}

const Breadcrumbs = () => {
  const { id: sessionId } = useParams();

  const pages = useMemo(
    () =>
      [
        { name: 'Study Room', href: ROUTES.STUDY_ROOM_ROUTE, current: Boolean(!sessionId) },
        sessionId
          ? {
              name: 'Session',
              href: ROUTES.SESSION_ROUTE.replace(':id', sessionId),
              current: Boolean(sessionId),
            }
          : undefined,
      ].filter((page) => page) as PageType[],
    [sessionId]
  );

  return (
    <nav className="flex border-b border-gray-200 bg-sky-600" aria-label="Breadcrumb">
      <ol className="mx-left flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
        <li className="flex">
          <div className="flex items-center">
            <Link to="/study-room" className="text-white hover:text-sky-100">
              <HomeIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map(({ name, href, current }) => (
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
                to={href}
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
  );
};

export default Breadcrumbs;
