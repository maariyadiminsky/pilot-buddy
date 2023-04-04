import { type HeroIconType } from '@common/types';
import { truthyString, getUniqId } from '@common/utils';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

interface MenuOption {
  text: string;
  srText: string;
  icon?: HeroIconType;
  handleOnClick?: (id: number) => void;
}

interface DropdownMenuProps {
  name: string;
  actions: MenuOption[];
  wrapperId?: number;
}

const DropdownMenu = ({ name, actions, wrapperId }: DropdownMenuProps) => (
  <Menu as="div" className="flex-shrink-0 pr-2">
    <Menu.Button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-offset-2">
      <span className="sr-only">Open {name} options</span>
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
          {actions.map(({ text, srText, icon, handleOnClick }) => {
            // note: fixes Typescript error:
            // Property 'icon' does not exist on type 'JSX.IntrinsicElements'.
            const Icon = icon;

            return (
              <Menu.Item key={getUniqId(text)}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => wrapperId && handleOnClick?.(wrapperId)}
                    className={truthyString(
                      active ? ' text-sky-700' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    <span className="inline-flex justify-center">
                      <span className="sr-only">{srText}</span>
                      {Icon && <Icon className="h-5 w-5 mr-1" aria-hidden="true" />}
                      {text}
                    </span>
                  </button>
                )}
              </Menu.Item>
            );
          })}
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);
export default DropdownMenu;
