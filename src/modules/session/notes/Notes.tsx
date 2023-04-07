import Note, { type NoteDataType } from '@modules/session/notes/Note';
import { getUniqId } from '@common/utils';

interface NotesProps {
  notes: NoteDataType[];
  handleRemoveNote: (id: string) => void;
  handleEditNote: (id: string) => void;
}

const Notes = ({ notes, handleRemoveNote, handleEditNote }: NotesProps) => (
  <ul className="divide-y divide-solid max-h-screen overflow-y-auto smooth-scroll overscroll-contain relative">
    {notes.map((note) => (
      <Note
        key={getUniqId()}
        {...note}
        handleRemoveNote={handleRemoveNote}
        handleEditNote={handleEditNote}
      />
    ))}
  </ul>
);

export default Notes;
