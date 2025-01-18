"use strict";
(() => {
  // src/connectors/youtube-music-dom-inject.ts
  if ("cleanup" in window && typeof window.cleanup === "function") {
    window.cleanup();
  }
  window.cleanup = (() => {
    const sendData = () => {
      window.postMessage(
        {
          sender: "web-scrobbler",
          playbackState: navigator.mediaSession.playbackState,
          metadata: {
            title: navigator.mediaSession.metadata?.title,
            artist: navigator.mediaSession.metadata?.artist,
            artwork: navigator.mediaSession.metadata?.artwork,
            album: navigator.mediaSession.metadata?.album
          }
        },
        "*"
      );
    };
    const interval = setInterval(() => {
      sendData();
    }, 1e3);
    return () => {
      clearInterval(interval);
    };
  })();
})();
