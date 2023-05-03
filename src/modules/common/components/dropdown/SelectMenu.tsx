import { type HeroIconType } from '@common/types';
import { truthyString } from '@common/utils';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';
import { useMenuAdjustment } from '@common/hooks';

export interface SelectMenuItemType {
  id: number;
  name: string;
  description?: string;
}

interface SelectMenuProps {
  title?: string;
  icon?: HeroIconType;
  currentlySelected: SelectMenuItemType;
  handleSelect?: (value: SelectMenuItemType) => void;
  options: SelectMenuItemType[];
}

const SelectMenu = ({ title, icon, options, currentlySelected, handleSelect }: SelectMenuProps) => {
  // when user is opening, check if menu outside window bounds
  // if so, render at the top rather than default bottom
  const { menuRef, menuAdjustment, adjustMenuToWindowHeight } = useMenuAdjustment();
  const [isOpen, setIsOpen] = useState(false);

  if (!options) return null;

  const Icon = icon;

  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      adjustMenuToWindowHeight('bottom-9');
    }
  };

  return (
    <Listbox value={currentlySelected} onChange={handleSelect}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900 relative">
            {title}
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button
              onClick={handleSetIsOpen}
              className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6"
            >
              <span className="block truncate">{currentlySelected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <div
              ref={menuRef}
              className={truthyString(
                'absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
                menuAdjustment
              )}
            >
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options>
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        truthyString(
                          active ? 'bg-sky-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-8 pr-4'
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-start justify-start">
                            {selected ? (
                              <span
                                className={truthyString(
                                  active ? 'text-white' : 'text-sky-600',
                                  'absolute inset-y-0 left-0 flex items-start pt-2 pl-1.5'
                                )}
                              >
                                {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                              </span>
                            ) : null}
                            <span
                              className={truthyString(
                                selected ? 'font-semibold' : 'font-normal',
                                icon && 'pl-1',
                                'block truncate'
                              )}
                            >
                              {option.name}
                            </span>
                          </div>
                          {option.description && (
                            <div
                              className={truthyString(
                                active ? 'text-white' : 'text-gray-500',
                                'text-sm'
                              )}
                            >
                              {option.description}
                            </div>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectMenu;
