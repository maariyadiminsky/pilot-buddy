import Note, { type NoteDataType } from '@common/components/notes/Note';
import { getUniqId } from '@common/utils';

interface NotesProps {
  notes: NoteDataType[];
  handleRemoveNote: (id?: string) => void;
}

const Notes = ({ notes, handleRemoveNote }: NotesProps) => (
  <ul className="divide-y divide-solid max-h-screen overflow-y-auto smooth-scroll overscroll-contain relative">
    {notes.map((note) => (
      <Note key={getUniqId()} {...note} handleRemoveNote={handleRemoveNote} />
    ))}
  </ul>
);

export default Notes;
