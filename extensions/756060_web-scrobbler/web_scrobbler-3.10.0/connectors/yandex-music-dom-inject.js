"use strict";
(() => {
  // src/connectors/yandex-music-dom-inject.ts
  if ("cleanup" in window && typeof window.cleanup === "function") {
    window.cleanup();
  }
  window.cleanup = (() => {
    const API = window.externalAPI;
    setupListeners();
    function setupListeners() {
      API.on(API.EVENT_STATE, onEvent);
      API.on(API.EVENT_TRACK, onEvent);
      onEvent();
    }
    function onEvent() {
      window.postMessage(
        {
          sender: "web-scrobbler",
          type: "YANDEX_MUSIC_STATE",
          trackInfo: getTrackInfo(),
          isPlaying: API.isPlaying()
        },
        "*"
      );
    }
    function getTrackInfo() {
      const trackInfo = API.getCurrentTrack();
      const track = trackInfo.title;
      let album = null;
      if (trackInfo.album) {
        album = trackInfo.album.title;
      }
      const trackArt = trackInfo.cover ? `https://${trackInfo.cover.replace("%%", "400x400")}` : void 0;
      return {
        track,
        album,
        trackArt,
        artist: trackInfo.artists[0].title,
        duration: trackInfo.duration,
        currentTime: API.getProgress().position,
        uniqueID: trackInfo.link
      };
    }
    return () => {
      API.off(API.EVENT_STATE, onEvent);
      API.off(API.EVENT_TRACK, onEvent);
    };
  })();
})();
