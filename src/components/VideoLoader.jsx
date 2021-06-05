import { useState } from "react";

function VideoLoader({ setId }) {
  const [idInput, setIdInput] = useState("");

  const onSetId = () => {
    if (!idInput) return;
    setId(idInput);
  };

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white">
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Video Id"
            autoComplete="off"
            onChange={(e) => setIdInput(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={onSetId}
          >
            Load
          </button>
        </div>
      </form>
    </div>
  );
}

export default VideoLoader;
