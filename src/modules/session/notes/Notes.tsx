import Note, { type NoteDataType } from '@modules/session/notes/Note';

interface NotesProps {
  notes: NoteDataType[];
  handleRemoveNote: (id: string) => void;
  handleEditNote: (id: string) => void;
  shouldHideNoteAction: boolean;
}

const Notes = ({ notes, handleRemoveNote, handleEditNote, shouldHideNoteAction }: NotesProps) => (
  <ul
    className={`divide-y divide-solid h-[calc(100vh-${
      shouldHideNoteAction ? '200' : '250'
    }px)] overflow-y-auto smooth-scroll relative`}
  >
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
