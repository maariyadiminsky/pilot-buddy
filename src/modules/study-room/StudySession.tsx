// todo add typescript
// @ts-nocheck
import PageWrapper from '@modules/common/components/page/PageWrapper';

import { truthyString } from '@common/utils';

import { Menu } from '@headlessui/react';
import {
  BarsArrowUpIcon,
  CheckBadgeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  RectangleStackIcon,
  StarIcon,
} from '@heroicons/react/20/solid';

const projects = [
  {
    name: 'Workcation',
    href: '#',
    siteHref: '#',
    repoHref: '#',
    repo: 'debbielewis/workcation',
    tech: 'Laravel',
    lastDeploy: '3h ago',
    location: 'United states',
    starred: true,
    active: true,
  },
  // More projects...
];
const activityItems = [
  { project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
  // More items...
];

// todo: get session name and add to PageWrapper title
const StudySession = () => {
  // eslint-disable-next-line
  const handleCreateSession = () => {
    // handle add session
    // pass data here eventually
  };

  return (
    <PageWrapper title="Session Room">
      <>
        {/* Background color split screen for large screens */}
        {/* <div className="fixed left-0 top-0 h-full w-1/2 bg-white" aria-hidden="true" />
        <div className="fixed right-0 top-0 h-full w-1/2 bg-gray-50" aria-hidden="true" /> */}
        <div className="relative flex min-h-full min-w-full flex-col bg-inherit">
          {/* Navbar */}

          {/* 3 column wrapper */}
          <div className="w-full flex-grow xl:flex px-8">
            {/* Left sidebar & main wrapper */}
            <div className="min-w-0 flex-1 bg-inherit xl:flex">
              {/* Account profile */}
              <div className="bg-inherit xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
                <div className="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-8">
                      <div className="space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
                        {/* Meta info */}
                        <div className="flex flex-col space-y-6 sm:flex-row sm:space-x-8 sm:space-y-0 xl:flex-col xl:space-x-0 xl:space-y-6">
                          <div className="flex items-center space-x-2">
                            <CheckBadgeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="text-sm font-medium text-gray-500">Pro Member</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RectangleStackIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="text-sm font-medium text-gray-500">8 Projects</span>
                          </div>
                        </div>
                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row xl:flex-col">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 xl:w-full"
                          >
                            New Project
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 xl:ml-0 xl:mt-3 xl:w-full"
                          >
                            Invite Team
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects List */}
              <div className="bg-white lg:min-w-0 lg:flex-1">
                <div className="border-b border-t border-gray-200 pb-4 pl-4 pr-6 pt-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
                  <div className="flex items-center">
                    <h1 className="flex-1 text-lg font-medium">Projects</h1>
                    <Menu as="div" className="relative">
                      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <BarsArrowUpIcon
                          className="-ml-0.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={truthyString(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Name
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={truthyString(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Date modified
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={truthyString(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Date created
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Menu>
                  </div>
                </div>
                <ul className="divide-y divide-gray-200 border-b border-gray-200">
                  {projects.map((project) => (
                    <li
                      key={project.repo}
                      className="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
                    >
                      <div className="flex items-center justify-between space-x-4">
                        {/* Repo name and link */}
                        <div className="min-w-0 space-y-3">
                          <div className="flex items-center space-x-3">
                            <span
                              className={truthyString(
                                project.active ? 'bg-green-100' : 'bg-gray-100',
                                'h-4 w-4 flex items-center justify-center rounded-full'
                              )}
                              aria-hidden="true"
                            >
                              <span
                                className={truthyString(
                                  project.active ? 'bg-green-400' : 'bg-gray-400',
                                  'h-2 w-2 rounded-full'
                                )}
                              />
                            </span>

                            <h2 className="text-sm font-medium">
                              <a href={project.href}>
                                <span className="absolute inset-0" aria-hidden="true" />
                                {project.name}{' '}
                                <span className="sr-only">
                                  {project.active ? 'Running' : 'Not running'}
                                </span>
                              </a>
                            </h2>
                          </div>
                          <a
                            href={project.repoHref}
                            className="group relative flex items-center space-x-2.5"
                          >
                            <svg
                              className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              viewBox="0 0 18 18"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.99917 0C4.02996 0 0 4.02545 0 8.99143C0 12.9639 2.57853 16.3336 6.15489 17.5225C6.60518 17.6053 6.76927 17.3277 6.76927 17.0892C6.76927 16.8762 6.76153 16.3104 6.75711 15.5603C4.25372 16.1034 3.72553 14.3548 3.72553 14.3548C3.31612 13.316 2.72605 13.0395 2.72605 13.0395C1.9089 12.482 2.78793 12.4931 2.78793 12.4931C3.69127 12.5565 4.16643 13.4198 4.16643 13.4198C4.96921 14.7936 6.27312 14.3968 6.78584 14.1666C6.86761 13.5859 7.10022 13.1896 7.35713 12.965C5.35873 12.7381 3.25756 11.9665 3.25756 8.52116C3.25756 7.53978 3.6084 6.73667 4.18411 6.10854C4.09129 5.88114 3.78244 4.96654 4.27251 3.72904C4.27251 3.72904 5.02778 3.48728 6.74717 4.65082C7.46487 4.45101 8.23506 4.35165 9.00028 4.34779C9.76494 4.35165 10.5346 4.45101 11.2534 4.65082C12.9717 3.48728 13.7258 3.72904 13.7258 3.72904C14.217 4.96654 13.9082 5.88114 13.8159 6.10854C14.3927 6.73667 14.7408 7.53978 14.7408 8.52116C14.7408 11.9753 12.6363 12.7354 10.6318 12.9578C10.9545 13.2355 11.2423 13.7841 11.2423 14.6231C11.2423 15.8247 11.2313 16.7945 11.2313 17.0892C11.2313 17.3299 11.3937 17.6097 11.8501 17.522C15.4237 16.3303 18 12.9628 18 8.99143C18 4.02545 13.97 0 8.99917 0Z"
                                fill="currentcolor"
                              />
                            </svg>
                            <span className="truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
                              {project.repo}
                            </span>
                          </a>
                        </div>
                        <div className="sm:hidden">
                          <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        {/* Repo meta info */}
                        <div className="hidden flex-shrink-0 flex-col items-end space-y-3 sm:flex">
                          <p className="flex items-center space-x-4">
                            <a
                              href={project.siteHref}
                              className="relative text-sm font-medium text-gray-500 hover:text-gray-900"
                            >
                              Visit site
                            </a>
                            <button
                              type="button"
                              className="relative rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              <span className="sr-only">
                                {project.starred ? 'Add to favorites' : 'Remove from favorites'}
                              </span>
                              <StarIcon
                                className={truthyString(
                                  project.starred
                                    ? 'text-yellow-300 hover:text-yellow-400'
                                    : 'text-gray-300 hover:text-gray-400',
                                  'h-5 w-5'
                                )}
                                aria-hidden="true"
                              />
                            </button>
                          </p>
                          <p className="flex space-x-2 text-sm text-gray-500">
                            <span>{project.tech}</span>
                            <span aria-hidden="true">&middot;</span>
                            <span>Last deploy {project.lastDeploy}</span>
                            <span aria-hidden="true">&middot;</span>
                            <span>{project.location}</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Activity feed */}
            <div className="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
              <div className="pl-6 lg:w-80">
                <div className="pb-2 pt-6">
                  <h2 className="text-sm font-semibold">Activity</h2>
                </div>
                <div>
                  <ul className="divide-y divide-gray-200">
                    {activityItems.map((item) => (
                      <li key={item.commit} className="py-4">
                        <div className="flex space-x-3">
                          <img
                            className="h-6 w-6 rounded-full"
                            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                            alt=""
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium">You</h3>
                              <p className="text-sm text-gray-500">{item.time}</p>
                            </div>
                            <p className="text-sm text-gray-500">
                              Deployed {item.project} ({item.commit} in master) to{' '}
                              {item.environment}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-200 py-4 text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-900">
                      View all activity
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </PageWrapper>
  );
};

export default StudySession;
