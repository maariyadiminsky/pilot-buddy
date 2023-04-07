import NoteIcon from '@common/components/notes/NoteIcon';
import { HeroIconType } from '@common/types';
import { removeLineBreaksFromText, includeProtocolAndHostWithinLink } from '@common/utils';
import { XMarkIcon } from '@heroicons/react/20/solid';

interface NoteIconType {
  name: string;
  value: string | null;
  icon: HeroIconType;
  iconColor: string;
  bgColor: string;
}

export interface NoteDataType {
  id?: string;
  text: string;
  icon: NoteIconType;
}

interface NoteDataProps extends NoteDataType {
  handleRemoveNote: (id?: string) => void;
}

const Note = ({ id, text, icon, handleRemoveNote }: NoteDataProps) => {
  const isLink = icon.value === 'link';
  const textToRender = isLink ? includeProtocolAndHostWithinLink(text) : text;

  return (
    <li key={id} className="relative group flex flex-row justify-between py-4">
      <div className="ml-4 flex flex-row space-x-3">
        <NoteIcon {...icon} />
        <div
          className={isLink ? 'text-sm text-blue-600 hover:text-blue-600' : 'text-sm text-gray-500'}
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
      <div
        onClick={() => handleRemoveNote(id)}
        // onKeyDown={(event) => event.key === 'Enter' && handleRemoveNote(id)}
        hidden
        className="pt-4 opacity-90 duration-300 absolute inset-x-0 bottom-0 top-0 group-hover:block group-hover:cursor-pointer text-center bg-gray-200 text-gray-700"
      >
        <div className="flex flex-row m-auto justify-center items-center">
          <XMarkIcon className="h-5 w-5 opacity-75 flex-shrink-0" aria-hidden="true" />
          <span className="text-sm">Remove</span>
        </div>
      </div>
    </li>
  );
};

export default Note;
