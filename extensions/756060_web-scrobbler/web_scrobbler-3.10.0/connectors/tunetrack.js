"use strict";
(() => {
  // src/connectors/tunetrack.ts
  var trackSelector = "#track-title";
  var trackArtSelector = "#current-item-artwork-thumb";
  Connector.playerSelector = "#playback-controls-container";
  Connector.pauseButtonSelector = ".pause-btn";
  Connector.getUniqueID = () => {
    const text = Util.getAttrFromSelectors(`${trackSelector} a`, "href");
    return text && /\/(\d+)-?/g.exec(text)?.at(-1);
  };
  Connector.trackSelector = trackSelector;
  Connector.artistSelector = "#track-artist";
  Connector.getTrackInfo = () => {
    const album = Util.getTextFromSelectors("#track-album a");
    if (album === "ccMixter") {
      return null;
    }
    const trackArt = Util.extractImageUrlFromSelectors(trackArtSelector);
    return { album, trackArt };
  };
})();
