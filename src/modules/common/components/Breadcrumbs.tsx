import { HomeIcon } from '@heroicons/react/20/solid';

const pages = [
  { name: 'Study Room', href: '#', current: false },
  { name: 'Create Session', href: '#', current: true },
];

const Breadcrumbs = () => (
  <nav className="flex border-b border-gray-200 bg-sky-700" aria-label="Breadcrumb">
    <ol className="mx-left flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
      <li className="flex">
        <div className="flex items-center">
          <a href="#" className="text-white hover:text-sky-700">
            <HomeIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </a>
        </div>
      </li>
      {pages.map((page) => (
        <li key={page.name} className="flex">
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
            <a
              href={page.href}
              className="ml-4 text-sm font-n subpixel-antialiased lg:text-xs text-white hover:text-sky-700"
              aria-current={page.current ? 'page' : undefined}
            >
              {page.name}
            </a>
          </div>
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
