"use strict";
(() => {
  // src/connectors/remixrotation.ts
  Connector.playerSelector = "#player";
  Connector.playButtonSelector = "#playMediaMaster";
  Connector.getArtistTrack = () => {
    const artistTrackStr = Util.getTextFromSelectors("#song-name-info");
    const artistTrack = artistTrackStr?.split("\u2022");
    const artist = artistTrack?.[0];
    const track = artistTrack?.[artistTrack.length - 1];
    return { artist, track };
  };
})();
