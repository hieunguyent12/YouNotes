import { useState } from "react";

function NoteControls({
  controlsProps,
  isAddingNote,
  toggleIsAddingNote,
  noteBeingEdited,
}) {
  const [noteContent, setNoteContent] = useState(
    noteBeingEdited ? noteBeingEdited.content : ""
  );
  const { onAddNote, onSaveNote } = controlsProps;

  const onChange = (e) => {
    setNoteContent(e.target.value);
  };

  return (
    <div className="">
      {isAddingNote && (
        <div className="flex flex-col">
          <div className="shadow appearance-none border rounded h-60 p-3 my-5 flex flex-col items-center w-full">
            <input
              onChange={onChange}
              className="text-gray-700 w-64 p-2 font-semibold text-lg"
              value={noteContent}
              placeholder="Title"
            />
            <textarea
              onChange={onChange}
              className="text-gray-700 w-64 mt-2 h-52 p-2"
              value={noteContent}
              placeholder="Type your notes here!"
            />
          </div>
          <button
            onClick={() => {
              if (noteContent !== "") {
                // if we are editing a note, save it instead of adding a new one
                if (noteBeingEdited) {
                  onSaveNote(noteBeingEdited, noteContent);
                } else {
                  onAddNote(noteContent);
                }
                toggleIsAddingNote();
              }
            }}
            className="bg-blue-500 text-white p-2 rounded-md w-full"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default NoteControls;
