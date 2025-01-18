"use strict";
(() => {
  // src/connectors/jamstash.ts
  Connector.playerSelector = "#player";
  Connector.artistSelector = "#songdetails .artist";
  Connector.trackSelector = "#songdetails .song";
  Connector.albumSelector = "#songdetails .album";
  Connector.playButtonSelector = "#player .PlayTrack";
  Connector.getTrackArt = () => {
    const trackArtUrl = Util.extractImageUrlFromSelectors("#coverart img");
    return trackArtUrl && trackArtUrl.replace(/&size=\d+/, "");
  };
  Connector.currentTimeSelector = "#played";
  Connector.durationSelector = "#duration";
  Connector.scrobblingDisallowedReason = () => Connector.getDuration() === 0 ? "Other" : null;
})();
