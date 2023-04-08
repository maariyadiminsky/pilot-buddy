import { useState } from 'react';

import Notes from '@modules/session/notes/Notes';
import NoteAction from '@modules/session/notes/NoteAction';
import { type NoteDataType } from '@modules/session/notes/Note';
import { removeObjectFromArray } from '@common/utils';
import { EyeSlashIcon } from '@heroicons/react/20/solid';

const SessionNotes = () => {
  const [notes, setNotes] = useState<NoteDataType[]>([]);
  const [currentNote, setCurrentNote] = useState<NoteDataType>();
  const [shouldHideNoteAction, setShouldHideNoteAction] = useState(false);

  const handleAddNote = (note?: NoteDataType) => note && setNotes([...notes, { ...note }]);

  // add to notes for ui, currentNote is undefined to clear if hiding, and save
  const handleSubmit = (note: NoteDataType) => {
    handleAddNote(note);
    setCurrentNote(undefined);

    // handle saving note here
  };

  const handleRemoveNote = (id: string) => {
    setNotes(removeObjectFromArray(notes, id, 'id'));

    // save to local or hidden folder in google drive
  };

  const handleEditNote = (id: string) => {
    setCurrentNote(notes.find((note) => note.id === id));
    handleRemoveNote(id);
  };

  // hide note action
  // if submitted note, don't add back old one
  // if still editing and note is hidden make sure
  // its back in notes but not set by default in NoteAction
  const handleHideNoteAction = (shouldHide: boolean) => {
    setShouldHideNoteAction(shouldHide);
    if (currentNote) handleAddNote(currentNote);
    setCurrentNote(undefined);
  };

  return (
    <div className="bg-zinc-50 xl:w-72 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
      <div className="py-4">
        <div className="items-center justify-between">
          <div className="flex-1 space-y-8">
            <div className="flex flex-col mt-3 space-y-0 xl:block">
              {shouldHideNoteAction ? (
                <div className="flex justify-end items-center px-4">
                  <button
                    type="button"
                    className="flex items-center justify-center"
                    onClick={() => setShouldHideNoteAction(false)}
                  >
                    <EyeSlashIcon
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
                  handleHideNote={handleHideNoteAction}
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