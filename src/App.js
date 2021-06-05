import { useState, useEffect, useRef } from "react";
import Youtube from "react-youtube";
import { nanoid } from "nanoid";

import VideoLoader from "./components/VideoLoader";
import Controls from "./components/Controls";
import NoteContainer from "./components/NoteContainer";

function App() {
  const [video, setVideo] = useState(null);
  const [id, setId] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [notes, setNotes] = useState([]);
  const videoIntervalRef = useRef(null);

  useEffect(() => {
    if (!video) return;

    // TODO: fix bug where the progress bar has a stroke
    const id = setInterval(() => {
      const timeElapsed = video.getCurrentTime() * 100;
      const percent = timeElapsed / video.getDuration();

      setSliderValue((prev) => {
        if (prev === "100") {
          return prev;
        } else {
          return percent;
        }
      });
    }, 1000);

    videoIntervalRef.current = id;

    return () => {
      clearInterval(id);
      videoIntervalRef.current = null;
    };
  }, [video]);

  const onReady = (e) => {
    setVideo(e.target);
  };

  const onPlay = () => {
    // console.log("play");
  };

  const onSliderChange = (e) => {
    if (video) {
      const seekTime = (video.getDuration() * e.target.value) / 100;

      video.seekTo(seekTime);

      setSliderValue(e.target.value);
    }
  };

  const onFullscreen = () => {
    if (video) {
      const iframe = video.getIframe();

      const requestFullScreen =
        iframe.requestFullScreen ||
        iframe.mozRequestFullScreen ||
        iframe.webkitRequestFullScreen;

      if (requestFullScreen) {
        requestFullScreen.bind(iframe)();
      }
    }
  };

  const onAddNote = (note) => {
    const newNotes = [
      ...notes,
      {
        noteId: nanoid(),
        time: {
          sliderValue,
          videoTime: video.getCurrentTime(),
        },
        content: note,
      },
    ];

    newNotes.sort((a, b) => a.time.videoTime - b.time.videoTime);

    setNotes(newNotes);
  };

  const onSaveNote = (noteBeingEdited, newContent) => {
    const newNotes = notes.map((note) => {
      if (note.noteId === noteBeingEdited.noteId) {
        return { ...note, content: newContent };
      }
      return note;
    });

    setNotes(newNotes);
  };

  const onTimestampClick = (timestamp, sliderValue) => {
    if (video) {
      video.seekTo(timestamp);
      setSliderValue(sliderValue);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      <p className="text-xl font-bold my-4">YouNotes</p>
      <VideoLoader setId={setId} />
      {id && (
        <div className="flex justify-evenly my-10 w-full">
          <div className="videoContainer">
            {video && (
              <p className="font-medium mb-2">{video.getVideoData().title}</p>
            )}
            <Youtube
              videoId={id}
              onReady={onReady}
              onPlay={onPlay}
              opts={{
                playerVars: {
                  controls: 1,
                  modestbranding: 1,
                },
              }}
            />
            <Controls
              controlsProps={{
                sliderValue,
                onSliderChange,
                onFullscreen,
              }}
              notes={notes}
            />
          </div>
          <div className="notesContainer mr-10">
            <NoteContainer
              video={video}
              onTimestampClick={onTimestampClick}
              onAddNote={onAddNote}
              notes={notes}
              sliderValue={sliderValue}
              onSaveNote={onSaveNote}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
