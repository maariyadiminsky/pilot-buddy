import NoteIcon from '@modules/session/notes/NoteIcon';
import { type HeroIconType } from '@common/types';
import {
  truthyString,
  removeLineBreaksFromText,
  includeProtocolAndHostWithinLink,
} from '@common/utils';
import { XMarkIcon, PencilIcon } from '@heroicons/react/20/solid';
interface NoteIconType {
  name: string;
  value: string | null;
  icon: HeroIconType;
  iconColor: string;
  bgColor: string;
}

export interface NoteDataType {
  id: string;
  text: string;
  icon: NoteIconType;
}

interface NoteDataProps extends NoteDataType {
  handleRemoveNote: (id: string) => void;
  handleEditNote: (id: string) => void;
}

const Note = ({ id, text, icon, handleRemoveNote, handleEditNote }: NoteDataProps) => {
  const isLink = icon.value === 'link';
  const textToRender = isLink ? includeProtocolAndHostWithinLink(text) : text;

  return (
    <li key={id} className="relative justify-between py-4">
      <div className="px-4 flex flex-col space-y-1 w-full xl:w-72">
        <div className="flex flex-row justify-between space-x-2">
          <NoteIcon {...icon} />
          <div className="flex flex-row flex-end justify-between">
            <button
              type="button"
              onClick={() => handleEditNote(id)}
              className="flex justify-center items-center group pr-1"
            >
              <PencilIcon
                className="h-6 w-6 xl:w-4 xl:h-4 opacity-75 flex-shrink-0 text-gray-900 group-hover:text-sky-600"
                aria-hidden="true"
              />
              <span className="sr-only">Edit note</span>
            </button>
            <button
              type="button"
              onClick={() => handleRemoveNote(id)}
              className="flex justify-center items-center group"
            >
              <XMarkIcon
                className="h-8 w-8 xl:w-5 xl:h-5 opacity-75 flex-shrink-0 text-gray-900 group-hover:text-sky-600"
                aria-hidden="true"
              />
              <span className="sr-only">Remove note</span>
            </button>
          </div>
        </div>
        <div
          className={truthyString(
            isLink ? 'text-sm text-blue-600 hover:text-blue-600' : 'text-sm text-gray-500',
            'break-words w-60'
          )}
        >
          {isLink ? (
            <a href={textToRender} target="_blank" rel="noreferrer">
              {textToRender}
            </a>
          ) : (
            removeLineBreaksFromText(text)
          )}
        </div>
      </div>
    </li>
  );
};

export default Note;
