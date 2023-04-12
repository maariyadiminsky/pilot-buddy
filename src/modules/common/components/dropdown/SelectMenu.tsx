import { type HeroIconType } from '@common/types';
import { truthyString } from '@common/utils';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

export interface SelectMenuItemType {
  id: number;
  name: string;
}

interface SelectMenuProps {
  title?: string;
  icon?: HeroIconType;
  currentlySelected: SelectMenuItemType;
  handleSelect?: (value: SelectMenuItemType) => void;
  options: SelectMenuItemType[];
}

const SelectMenu = ({ title, icon, options, currentlySelected, handleSelect }: SelectMenuProps) => {
  if (!options) return null;

  const Icon = icon;

  return (
    <Listbox value={currentlySelected} onChange={handleSelect}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            {title}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-700 sm:text-sm sm:leading-6">
              <span className="block truncate">{currentlySelected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      truthyString(
                        active ? 'bg-sky-700 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-8 pr-4'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={truthyString(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={truthyString(
                              active ? 'text-white' : 'text-sky-700',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectMenu;
