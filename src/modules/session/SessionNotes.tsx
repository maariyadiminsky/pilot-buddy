import { useState } from 'react';

import Notes from '@modules/session/notes/Notes';
import NoteAction from '@modules/session/notes/NoteAction';
import { type NoteDataType } from '@modules/session/notes/Note';
import { removeObjectFromArray } from '@common/utils';

const SessionNotes = () => {
  const [notes, setNotes] = useState<NoteDataType[]>([]);

  const handleSubmit = (data: NoteDataType) => setNotes([...notes, { ...data }]);

  const handleRemoveNote = (id?: string) => id && setNotes(removeObjectFromArray(notes, id, 'id'));

  return (
    <div className="bg-zinc-50 xl:w-72 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
      <div className="pt-6">
        <div className="items-center justify-between">
          <div className="flex-1 space-y-8">
            <div className="xl:mt-3 space-y-8 sm:space-y-0 xl:block xl:space-y-8">
              <NoteAction handleSubmit={handleSubmit} />
              <Notes notes={notes} handleRemoveNote={handleRemoveNote} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionNotes;
