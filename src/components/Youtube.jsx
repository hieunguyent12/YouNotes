import { useEffect } from "react";

function Youtube() {
  useEffect(() => {
    const tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("player", {
        height: "390",
        width: "640",
        videoId: "sV2t3tW_JTQ",
        playerVars: {
          playsinline: 1,
        },
      });
    };
  }, []);

  return <div className="player" id="player"></div>;
}

export default Youtube;
