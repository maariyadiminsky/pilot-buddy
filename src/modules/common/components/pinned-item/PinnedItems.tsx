import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

import { truthyString, getUniqId } from '@common/utils';
import { getInitials, getTypeAmount } from '@common/components/pinned-item/utils';

interface Item {
  id: number; // todo change to unique uuid
  total: number;
  text: string;
  lastUpdated: string;
  type: string;
  className?: string; // todo do not pass this here
}

interface PinnedItemProps {
  title: string;
  items: Item[];
}

const PinnedItem = ({ title, items }: PinnedItemProps) => (
  <div className="mt-6 px-4 sm:px-6 lg:px-8">
    <h2 className="text-sm font-medium text-gray-900">{title}</h2>
    <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      {items.map(({ text, type, total, className }) => (
        <li key={getUniqId(text)} className="relative col-span-1 flex rounded-md shadow-sm">
          <div
            className={truthyString(
              'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
              className
            )}
          >
            {getInitials(text)}
          </div>
          <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
            <div className="flex-1 truncate px-4 py-2 text-sm">
              <a href="#" className="font-medium text-gray-900 hover:text-gray-600">
                {text}
              </a>
              <p className="text-gray-500">{getTypeAmount(type, total)}</p>
            </div>
            <Menu as="div" className="flex-shrink-0 pr-2">
              <Menu.Button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-10 top-3 z-10 mx-3 mt-1 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                          Unpin
                        </a>
                      )}
                    </Menu.Item>
                  </div>
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
                          Start
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
                          Edit
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default PinnedItem;
