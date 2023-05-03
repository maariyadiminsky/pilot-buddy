import Note from '@modules/session/notes/Note';
import { type NoteDataType } from '@modules/session/types';

interface NotesProps {
  notes: NoteDataType[];
  handleRemoveNote: (id: string) => void;
  handleEditNote: (id: string) => void;
}

const Notes = ({ notes, handleRemoveNote, handleEditNote }: NotesProps) => (
  <ul className="divide-y divide-solid h-full overflow-y-auto smooth-scroll relative">
    {notes.map((note) => (
      <Note
        key={note.id}
        {...note}
        handleRemoveNote={handleRemoveNote}
        handleEditNote={handleEditNote}
      />
    ))}
  </ul>
);

export default Notes;
