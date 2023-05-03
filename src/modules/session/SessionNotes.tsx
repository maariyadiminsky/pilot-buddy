import { useState, useEffect } from 'react';

import Notes from '@modules/session/notes/Notes';
import NoteAction from '@modules/session/notes/NoteAction';
import { type NoteDataType } from '@modules/session/types';
import { removeObjectFromArray } from '@common/utils';
import { EyeSlashIcon } from '@heroicons/react/20/solid';
import { useDatabase } from '@common/hooks';

interface SessionNotesProps {
  notesData?: NoteDataType[];
  sessionId: string;
}

const SessionNotes = ({ notesData, sessionId }: SessionNotesProps) => {
  const [notes, setNotes] = useState<NoteDataType[]>(notesData || []);
  const [currentNote, setCurrentNote] = useState<NoteDataType>();
  const [shouldHideNoteAction, setShouldHideNoteAction] = useState(false);

  const { updateDBPartialDataOfSession } = useDatabase();

  useEffect(() => {
    if (!notes?.length && notesData) {
      setNotes(notesData);
    }
  }, [notesData]);

  const handleAddNote = (note: NoteDataType) => [...notes, { ...note }];

  // add to notes for ui, currentNote is undefined to clear if hiding, and save
  const handleSubmitNote = (note: NoteDataType) => {
    // save in storage
    let hasError = null;
    const updatedNotes = handleAddNote(note);
    try {
      updateDBPartialDataOfSession({ notes: updatedNotes }, sessionId);
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        console.log(error);
        // todo: add error monitoring
      }
    } finally {
      if (!hasError && updatedNotes) {
        setCurrentNote(undefined);
        setNotes(updatedNotes);
      }
    }
  };

  const handleRemoveNote = (id: string, customNotes?: NoteDataType[]) => {
    // save to local or hidden folder in google drive
    let hasError = null;
    const updatedNotes = removeObjectFromArray(customNotes || notes, id, 'id');
    try {
      updateDBPartialDataOfSession({ notes: updatedNotes }, sessionId);
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        console.log(error);
        // todo: add error monitoring
      }
    } finally {
      if (!hasError && updatedNotes) {
        setNotes(updatedNotes);
      }
    }
  };

  const handleEditNote = (id: string) => {
    // in the case they were editing before and just hit edit again
    // add back the last item user was editing.
    // This also acts as a cancel of the last edit.
    if (currentNote) {
      const updatedNotes = handleAddNote(currentNote);
      setNotes(updatedNotes);
      handleRemoveNote(id, updatedNotes);
    } else {
      handleRemoveNote(id);
    }

    setCurrentNote(notes.find((note) => note.id === id));
  };

  // hide note action
  // if submitted note, don't add back old one
  // if still editing and note is hidden make sure
  // its back in notes but not set by default in NoteAction
  const handleHideNoteAction = (shouldHide: boolean) => {
    setShouldHideNoteAction(shouldHide);
    if (currentNote) {
      const updatedNotes = handleAddNote(currentNote);
      setNotes(updatedNotes);
    }
    setCurrentNote(undefined);
  };

  const heightMobile = notes.length > 3 ? 'h-[calc(100vh-350px)]' : 'h-full';
  const height = shouldHideNoteAction ? 'md:h-[calc(100vh-150px)]' : 'md:h-[calc(100vh-250px)]';

  return (
    <div className="bg-zinc-50 xl:w-72 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
      <div className="py-4">
        <div className="items-center justify-between">
          <div className="flex-1 space-y-8">
            <div className={`flex flex-col mt-3 space-y-0 xl:block ${heightMobile} ${height}`}>
              {shouldHideNoteAction ? (
                <div className="flex justify-end items-center px-4">
                  <button
                    type="button"
                    className="flex items-center justify-center"
                    onClick={() => setShouldHideNoteAction(false)}
                  >
                    <EyeSlashIcon
                      className="w-6 h-6 flex-shrink-0 text-gray-300 hover:text-sky-600 mb-3"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : (
                <NoteAction
                  handleSubmit={handleSubmitNote}
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
