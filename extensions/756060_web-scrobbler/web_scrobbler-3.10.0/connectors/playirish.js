"use strict";
(() => {
  // src/connectors/playirish.ts
  var filter = MetadataFilter.createFilter({ artist: removeNowPlayingPrefix });
  Connector.playerSelector = ".qt-musicplayer";
  Connector.artistTrackSelector = "#streamCurrentlyPlaying";
  Connector.pauseButtonSelector = ".sm2_playing";
  Connector.applyFilter(filter);
  function removeNowPlayingPrefix(artist) {
    return artist.replace("NOW PLAYING:", "");
  }
})();
