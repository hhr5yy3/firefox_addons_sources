"use strict";
(() => {
  // src/connectors/wfmu.ts
  var filter = MetadataFilter.createFilter({
    track: cleanupTrack
  });
  Connector.playerSelector = ".archiveplayer";
  Connector.artistSelector = "#np-artist";
  Connector.trackSelector = "#np-song";
  Connector.playButtonSelector = ".mejs-play";
  Connector.applyFilter(filter);
  function cleanupTrack(track) {
    return track.replace(/(")(.*)(")( by )(.*)/g, "$2");
  }
})();
