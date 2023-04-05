import { Fragment, useState } from 'react';
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid';
import { Listbox, Transition } from '@headlessui/react';
import { truthyString } from '@common/utils';

const moods = [
  {
    name: 'Excited',
    value: 'excited',
    icon: FireIcon,
    iconColor: 'text-white',
    bgColor: 'bg-red-500',
  },
  {
    name: 'Loved',
    value: 'loved',
    icon: HeartIcon,
    iconColor: 'text-white',
    bgColor: 'bg-pink-400',
  },
  {
    name: 'Happy',
    value: 'happy',
    icon: FaceSmileIcon,
    iconColor: 'text-white',
    bgColor: 'bg-green-400',
  },
  {
    name: 'Sad',
    value: 'sad',
    icon: FaceFrownIcon,
    iconColor: 'text-white',
    bgColor: 'bg-yellow-400',
  },
  {
    name: 'Thumbsy',
    value: 'thumbsy',
    icon: HandThumbUpIcon,
    iconColor: 'text-white',
    bgColor: 'bg-blue-500',
  },
  {
    name: 'I feel nothing',
    value: null,
    icon: XMarkIcon,
    iconColor: 'text-gray-400',
    bgColor: 'bg-transparent',
  },
];

const CHAR_LIMIT = 100;
const getCharLeft = (text: string) => CHAR_LIMIT - text.length;

interface NoteProps {
  existingText?: string;
}

const Note = ({ existingText = '' }: NoteProps) => {
  const [text, setText] = useState(existingText);
  const [selectedIcon, setSelectedIcon] = useState(moods[5]);

  const charLimit = getCharLeft(text);

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form action="#" className="relative">
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-sky-700">
            <label htmlFor="note" className="sr-only">
              Add a note here
            </label>
            <textarea
              rows={3}
              name="note"
              id="note"
              className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
              placeholder="Add a note here..."
              maxLength={100}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="pb-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <Listbox value={selectedIcon} onChange={setSelectedIcon}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="sr-only"> Your mood </Listbox.Label>
                      <div className="relative">
                        <Listbox.Button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                          <span className="flex items-center justify-center">
                            {selectedIcon.value === null ? (
                              <span>
                                <FaceSmileIcon
                                  className="h-5 w-5 flex-shrink-0"
                                  aria-hidden="true"
                                />
                                <span className="sr-only"> Add your mood </span>
                              </span>
                            ) : (
                              <span>
                                <span
                                  className={truthyString(
                                    selectedIcon.bgColor,
                                    'flex h-8 w-8 items-center justify-center rounded-full'
                                  )}
                                >
                                  <selectedIcon.icon
                                    className="h-5 w-5 flex-shrink-0 text-white"
                                    aria-hidden="true"
                                  />
                                </span>
                                <span className="sr-only">{selectedIcon.name}</span>
                              </span>
                            )}
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                            {moods.map((mood) => (
                              <Listbox.Option
                                key={mood.value}
                                className={({ active }) =>
                                  truthyString(
                                    active ? 'bg-gray-100' : 'bg-white',
                                    'relative cursor-default select-none px-3 py-2'
                                  )
                                }
                                value={mood}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={truthyString(
                                      mood.bgColor,
                                      'flex h-8 w-8 items-center justify-center rounded-full'
                                    )}
                                  >
                                    <mood.icon
                                      className={truthyString(
                                        mood.iconColor,
                                        'h-5 w-5 flex-shrink-0'
                                      )}
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <span className="ml-3 block truncate font-medium">
                                    {mood.name}
                                  </span>
                                </div>
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className={`${charLimit > 0 ? 'text-gray-500' : 'text-rose-500'} text-xs mr-2`}>
                {charLimit}
              </span>
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-sky-700 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="sr-only">Add a note</span>
                <PlusCircleIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Note;
