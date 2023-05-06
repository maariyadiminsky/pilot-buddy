import { Note } from '@modules/session/notes';
import { type NoteDataType } from '@modules/session/types';
import { FC } from 'react';

interface NotesProps {
  notes: NoteDataType[];
  handleRemoveNote: (id: string) => void;
  handleEditNote: (id: string) => void;
}

export const Notes: FC<NotesProps> = ({ notes, handleRemoveNote, handleEditNote }) => (
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
