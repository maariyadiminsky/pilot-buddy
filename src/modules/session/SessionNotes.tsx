import { useState } from 'react';

import Notes from '@modules/session/notes/Notes';
import NoteAction from '@modules/session/notes/NoteAction';
import { type NoteDataType } from '@modules/session/notes/Note';
import { removeObjectFromArray } from '@common/utils';
import { EyeIcon } from '@heroicons/react/20/solid';

const SessionNotes = () => {
  const [notes, setNotes] = useState<NoteDataType[]>([]);
  const [currentNote, setCurrentNote] = useState<NoteDataType>();
  const [shouldHideNoteAction, setShouldHideNoteAction] = useState(false);

  const handleSubmit = (data: NoteDataType) => setNotes([...notes, { ...data }]);

  const handleRemoveNote = (id: string, shouldSave?: boolean) => {
    setNotes(removeObjectFromArray(notes, id, 'id'));

    if (shouldSave) {
      // save to local or hidden folder in google drive
    }
  };

  const handleEditNote = (id: string) => {
    setCurrentNote(notes.find((note) => note.id === id));
    handleRemoveNote(id);
  };

  return (
    <div className="bg-zinc-50 xl:w-72 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
      <div className="pt-3">
        <div className="items-center justify-between">
          <div className="flex-1 space-y-8">
            <div className="flex flex-col xl:mt-3 space-y-8 sm:space-y-0 xl:block">
              {shouldHideNoteAction ? (
                <div className="flex justify-end items-center px-4">
                  <button
                    type="button"
                    className="flex items-center justify-center"
                    onClick={() => setShouldHideNoteAction(false)}
                  >
                    <EyeIcon
                      className="w-6 h-6 flex-shrink-0 text-gray-300 hover:text-sky-700"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : (
                <NoteAction
                  handleSubmit={handleSubmit}
                  currentNote={currentNote}
                  shouldHide={shouldHideNoteAction}
                  setShouldHide={setShouldHideNoteAction}
                />
              )}

              <Notes
                notes={notes}
                handleRemoveNote={handleRemoveNote}
                handleEditNote={handleEditNote}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionNotes;
