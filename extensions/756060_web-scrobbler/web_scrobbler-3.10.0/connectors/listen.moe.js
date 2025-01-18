"use strict";
(() => {
  // src/connectors/listen.moe.ts
  var filter = MetadataFilter.createFilter(
    MetadataFilter.createFilterSetForFields(
      ["artist", "track", "album", "albumArtist"],
      trimSpaces
    )
  );
  var filterRules = [
    { source: /\t/g, target: " " },
    { source: /\n/g, target: " " },
    { source: /\s+/g, target: " " }
  ];
  Connector.playerSelector = "#app";
  Connector.artistSelector = ".player-song-artist";
  Connector.trackSelector = ".player-song-title";
  Connector.isPlaying = () => {
    return !document.querySelector("#audio-player").paused;
  };
  Connector.applyFilter(filter);
  function trimSpaces(text) {
    return MetadataFilter.filterWithFilterRules(text, filterRules);
  }
})();
