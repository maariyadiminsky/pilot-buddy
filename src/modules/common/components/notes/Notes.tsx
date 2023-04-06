import { type NoteDataType } from '@common/components/notes/NoteAction';
import { removeLineBreaksFromText, includeProtocolAndHostWithinLink } from '@common/utils';
import NoteIcon from '@common/components/notes/components/NoteIcon';

interface NotesProps {
  notes: NoteDataType[];
}

const Notes = ({ notes }: NotesProps) => {
  console.log('notes:', notes);
  return (
    <ul className="divide-y divide-solid max-h-screen overflow-y-auto smooth-scroll overscroll-contain relative">
      {notes.map(({ id, text, icon }) => {
        const isLink = icon.value === 'link';
        const textToRender = isLink ? includeProtocolAndHostWithinLink(text) : text;

        return (
          <li key={id} className="flex flex-row justify-between py-4">
            <div className="w-7 flex justify-end">
              <NoteIcon {...icon} />
            </div>
            <div className="ml-2 w-full">
              <p
                className={
                  isLink ? 'text-sm text-blue-600 hover:text-blue-600' : 'text-sm text-gray-500'
                }
              >
                {isLink ? (
                  <a href={textToRender} target="_blank" rel="noreferrer">
                    {textToRender}
                  </a>
                ) : (
                  removeLineBreaksFromText(text)
                )}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Notes;
