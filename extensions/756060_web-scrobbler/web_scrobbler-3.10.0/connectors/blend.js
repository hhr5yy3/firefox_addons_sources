"use strict";
(() => {
  // src/connectors/blend.ts
  Connector.playerSelector = "body";
  function getCurrentlyPlayingWrapper() {
    return document.querySelector(".active-player")?.closest(".project-player");
  }
  Connector.pauseButtonSelector = ".playing.active-player .btn-pause";
  Connector.getTrack = () => getCurrentlyPlayingWrapper()?.querySelector(".name")?.innerText;
  Connector.getArtist = () => getCurrentlyPlayingWrapper()?.querySelector(".artist-list")?.innerText;
  Connector.getTrackArt = () => getCurrentlyPlayingWrapper()?.querySelector(".cover-art")?.getAttribute("src");
  Connector.getCurrentTime = () => Util.stringToSeconds(
    getCurrentlyPlayingWrapper()?.querySelector(
      ".current-time"
    )?.innerText
  );
  Connector.getDuration = () => Util.stringToSeconds(
    getCurrentlyPlayingWrapper()?.querySelector(
      ".duration"
    )?.innerText
  );
  Connector.isPlaying = () => document.querySelector(".active-player")?.classList.contains("playing");
})();
