import { useMenuAdjustment } from '@common/hooks';
import { type MenuOptionType } from '@common/types';
import { truthyString } from '@common/utils';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon, BarsArrowUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { FC, Fragment } from 'react';

export enum DropdownTypeEnum {
  sort = 'sort',
}

export interface ActionMenuProps {
  name: string;
  actions: MenuOptionType[];
  className?: string;
  useCustomPosition?: boolean;
  type?: keyof typeof DropdownTypeEnum;
}

export const ActionMenu: FC<ActionMenuProps> = ({
  name,
  actions,
  className,
  type,
  useCustomPosition,
}) => {
  const { menuRef, menuAdjustment, adjustMenuToWindowWidth } = useMenuAdjustment();

  const renderButton = () => {
    let buttonContent = null;
    const buttonClassNameCommon = 'inline-flex';
    let buttonClassName = '';

    switch (type) {
      case DropdownTypeEnum.sort:
        buttonContent = (
          <>
            <BarsArrowUpIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Sort
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </>
        );
        buttonClassName =
          'w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50';
        break;
      default:
        buttonContent = (
          <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        );
        buttonClassName =
          'h-8 w-8 items-center justify-center rounded-full text-gray-900 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2';
    }

    return (
      <Menu.Button
        onClick={() => {
          adjustMenuToWindowWidth('right-0');
        }}
        className={`${buttonClassNameCommon} ${buttonClassName}`}
      >
        <span className="sr-only">Open {name} options</span>
        {buttonContent}
      </Menu.Button>
    );
  };

  return (
    <Menu as="div" className={truthyString(!useCustomPosition && 'relative')} ref={menuRef}>
      {renderButton()}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={truthyString(
            'absolute z-20 mt-1 w-40 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
            className,
            menuAdjustment,
            !useCustomPosition && 'right-0'
          )}
        >
          {actions.map(({ text, srText, icon, handleOnClick }, index) => {
            // note: fixes Typescript error:
            // Property 'icon' does not exist on type 'JSX.IntrinsicElements'.
            const Icon = icon;

            const hasIconClass = (active: boolean) => (active ? 'text-sky-600' : 'text-gray-700');
            const noIconClass = (active: boolean) =>
              active ? 'bg-sky-600 text-white' : 'text-gray-700';

            return (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => handleOnClick?.()}
                    className={truthyString(
                      icon ? hasIconClass(active) : noIconClass(active),
                      'block px-4 py-2 text-sm w-full h-full text-left',
                      index === 0 && 'rounded-t-md',
                      index === actions.length - 1 && 'rounded-b-md'
                    )}
                  >
                    <span className="inline-flex justify-center font-normal">
                      <span className="sr-only">{srText}</span>
                      {Icon && <Icon className="h-5 w-5 mr-1" aria-hidden="true" />}
                      {text}
                    </span>
                  </button>
                )}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
