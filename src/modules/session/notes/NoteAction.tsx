import { SyntheticEvent, Fragment, useState, useEffect } from 'react';
import { PlusCircleIcon, EyeIcon } from '@heroicons/react/20/solid';
import { Listbox, Transition } from '@headlessui/react';
import { truthyString, getUniqId } from '@common/utils';
import { NOTE_TYPES } from '@modules/session/constants';
import NoteIcon from '@modules/session/notes/NoteIcon';
import { type NoteDataType } from '@modules/session/notes/Note';

const CHAR_LIMIT = 100;
const getCharLeft = (text: string) => CHAR_LIMIT - text.length;

interface NoteActionProps {
  currentNote?: NoteDataType;
  handleSubmit: (value: NoteDataType) => void;
  shouldHide: boolean;
  handleHideNote: (value: boolean) => void;
}

const DEFAULT_NOTE_ICON = NOTE_TYPES[3];

const NoteAction = ({ currentNote, handleSubmit, shouldHide, handleHideNote }: NoteActionProps) => {
  const [text, setText] = useState(currentNote?.text || '');
  const [selectedIcon, setSelectedIcon] = useState(currentNote?.icon || DEFAULT_NOTE_ICON);
  const [shouldShowEmptyTextWarning, setShouldShowEmptyTextWarning] = useState(false);

  const charLimit = getCharLeft(text);

  useEffect(() => {
    if (currentNote) {
      setText(currentNote.text);
      setSelectedIcon(currentNote.icon);
    }
  }, [currentNote]);

  const handleSetText = (newText: string) => {
    setShouldShowEmptyTextWarning(false);
    setText(newText);
  };

  const handleFormSubmit = (event: SyntheticEvent<Element>) => {
    event.preventDefault();

    if (!text) {
      setShouldShowEmptyTextWarning(true);
      return;
    }

    handleSubmit({
      ...(currentNote || {}),
      id: currentNote?.id || getUniqId(),
      icon: selectedIcon,
      text,
    });

    setText('');
    setSelectedIcon(DEFAULT_NOTE_ICON);
  };

  if (shouldHide) return null;

  return (
    <div className="flex items-start space-x-4 px-4 mb-3">
      <div className="min-w-0 flex-1">
        <form onSubmit={handleFormSubmit} className="relative">
          <div className="overflow-hidden w-full rounded-lg shadow-sm ring-1 ring-inset bg-white ring-gray-300 focus-within:ring-2 focus-within:ring-sky-700">
            <label htmlFor="note" className="sr-only">
              Add a note here
            </label>
            <textarea
              rows={3}
              name="note"
              id="note"
              aria-label="note"
              className="block whitespace-pre-wrap w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
              placeholder="Add a note here..."
              maxLength={100}
              value={text}
              onChange={(event) => handleSetText(event.target.value)}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="pb-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3.5 pr-2">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <Listbox value={selectedIcon} onChange={setSelectedIcon}>
                  {({ open }) => (
                    <>
                      <div className="relative">
                        <div className="flex flex-row flex-start space-x-4">
                          <Listbox.Button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                            <NoteIcon {...selectedIcon} />
                            <Listbox.Label className="sr-only"> Note type </Listbox.Label>
                          </Listbox.Button>
                          <button
                            type="button"
                            className="flex items-center justify-center"
                            onClick={() => handleHideNote(true)}
                          >
                            <EyeIcon
                              className="w-6 h-6 flex-shrink-0 text-gray-300 hover:text-sky-700"
                              aria-hidden="true"
                            />
                          </button>
                        </div>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                            {NOTE_TYPES.map((type) => (
                              <Listbox.Option
                                key={type.value}
                                className={({ active }) =>
                                  truthyString(
                                    active ? 'bg-gray-100' : 'bg-white',
                                    'relative cursor-default select-none px-3 py-2'
                                  )
                                }
                                value={type}
                              >
                                <div className="flex items-center">
                                  <NoteIcon {...type} shouldIncludeName />
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
        {shouldShowEmptyTextWarning && (
          <div className="flex items-center justify-start text-sm text-rose-500 py-2">
            Note cannot be empty.
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteAction;
