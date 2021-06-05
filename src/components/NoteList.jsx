import { useEffect, useRef } from "react";

function NoteList({
  notes,
  onTimestampClick,
  sliderValue,
  toggleIsAddingNote,
}) {
  return (
    <div className="noteList mt-2">
      {notes.map((note) => {
        return (
          <NoteItem
            key={note.noteId}
            note={note}
            sliderValue={sliderValue}
            onTimestampClick={onTimestampClick}
            toggleIsAddingNote={toggleIsAddingNote}
          />
        );
      })}
    </div>
  );
}

function NoteItem({ note, sliderValue, onTimestampClick, toggleIsAddingNote }) {
  const noteRef = useRef(null);
  const { time, content } = note;

  useEffect(() => {
    if (
      noteRef.current &&
      Math.round(sliderValue).toString() ===
        Math.round(time.sliderValue).toString()
    ) {
      noteRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sliderValue]);

  let minutes = Math.floor(time.videoTime / 60);
  let seconds = Math.floor(time.videoTime % 60);

  if (minutes < 10) {
    minutes = "0" + minutes.toString();
  }

  if (seconds < 10) {
    seconds = "0" + seconds.toString();
  }

  const opacity =
    Math.round(sliderValue).toString() ===
    Math.round(time.sliderValue).toString()
      ? "opacity-100"
      : "opacity-40";

  return (
    <div
      className={`shadow appearance-none border rounded mt-3 p-2 ${opacity}`}
      ref={noteRef}
    >
      <p
        className="text-blue-500 cursor-pointer hover:underline inline-block"
        onClick={() => onTimestampClick(time.videoTime, time.sliderValue)}
      >{`${minutes}:${seconds}`}</p>
      <p
        onClick={() => toggleIsAddingNote(note)}
        className="truncate w-full h-8 py-1 pl-1 hover:bg-gray-100 block rounded cursor-pointer"
      >
        {content}
      </p>
    </div>
  );
}

export default NoteList;
