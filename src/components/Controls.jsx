import { ReactComponent as Icon } from "./timestampIcon.svg";

function Controls({ controlsProps, notes }) {
  const { sliderValue, onSliderChange, onFullscreen } = controlsProps;

  return (
    <div>
      <div>
        <input
          step="0.01"
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          className="progressBar"
          id="progressBar"
          onChange={onSliderChange}
        ></input>
        <div className="timestampMarks">
          {notes.map((note) => (
            <div
              key={note.noteId}
              style={{
                position: "absolute",
                left: `${note.time.sliderValue}%`,
                opacity:
                  Math.round(sliderValue).toString() ===
                  Math.round(note.time.sliderValue).toString()
                    ? "1"
                    : "0.5",
              }}
              className="hover:bg-gray-100 p-1 inline-block cursor-pointer"
              onClick={() => {
                onSliderChange({ target: { value: note.time.sliderValue } });
              }}
            >
              <Icon />
            </div>
          ))}
        </div>
      </div>
      {/* <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={onFullscreen}
      >
        Fullscreen
      </button> */}
    </div>
  );
}

export default Controls;
