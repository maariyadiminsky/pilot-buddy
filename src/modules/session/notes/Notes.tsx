import Note, { type NoteDataType } from '@modules/session/notes/Note';

interface NotesProps {
  notes: NoteDataType[];
  handleRemoveNote: (id: string) => void;
  handleEditNote: (id: string) => void;
}

const Notes = ({ notes, handleRemoveNote, handleEditNote }: NotesProps) => (
  <ul className="divide-y divide-solid overflow-y-auto xl:h-[calc(100vh-250px)] smooth-scroll relative">
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
