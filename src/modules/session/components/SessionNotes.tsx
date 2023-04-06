import { useState } from 'react';

import Notes from '@common/components/notes/Notes';
import NoteAction, { type NoteDataType } from '@common/components/notes/NoteAction';

const SessionNotes = () => {
  const [notes, setNotes] = useState<NoteDataType[]>([]);

  const handleSubmit = (data: NoteDataType) => setNotes([...notes, { ...data }]);

  return (
    <div className="bg-zinc-50 xl:w-72 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
      <div className="py-6 px-4">
        <div className="items-center justify-between">
          <div className="flex-1 space-y-8">
            <div className="xl:mt-3 space-y-8 sm:space-y-0 xl:block xl:space-y-8">
              <NoteAction handleSubmit={handleSubmit} />
              <Notes notes={notes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionNotes;
