import { useState } from "react";

import NoteControls from "./NoteControls";
import NoteList from "./NoteList";

function NoteContainer({
  video,
  onAddNote,
  onTimestampClick,
  notes,
  sliderValue,
  onSaveNote,
}) {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteBeingEdited, setNoteBeingEdited] = useState(null);

  const toggleIsAddingNote = (note) => {
    if (note === undefined) {
      if (isAddingNote) {
        video.playVideo();
      } else {
        video.pauseVideo();
      }
      setIsAddingNote(!isAddingNote);
      setNoteBeingEdited(null);
    } else {
      // if note isn't undefined, then we are editing an existing note
      setNoteBeingEdited(note);
      setIsAddingNote(!isAddingNote);
    }
  };

  return (
    <>
      <button
        className="text-white p-2 rounded-md bg-gray-400 focus:outline-none hover:bg-gray-500"
        onClick={() => toggleIsAddingNote()}
      >
        {isAddingNote ? "← Go Back" : "＋ New Note"}
      </button>
      {isAddingNote ? (
        <NoteControls
          controlsProps={{
            onAddNote,
            onSaveNote,
          }}
          isAddingNote={isAddingNote}
          toggleIsAddingNote={toggleIsAddingNote}
          noteBeingEdited={noteBeingEdited}
        />
      ) : (
        <NoteList
          notes={notes}
          onTimestampClick={onTimestampClick}
          sliderValue={sliderValue}
          toggleIsAddingNote={toggleIsAddingNote}
        />
      )}
    </>
  );
}

export default NoteContainer;
