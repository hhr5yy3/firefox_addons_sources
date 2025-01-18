"use strict";
(() => {
  // src/connectors/thecurrent.ts
  var filter = MetadataFilter.createFilter({
    track: cleanupTrack,
    artist: cleanupArtist
  });
  Connector.playerSelector = "aside.player";
  Connector.trackSelector = "aside.player .player_subhead";
  Connector.artistSelector = "aside.player .player_subhead";
  Connector.isPlaying = () => Util.hasElementClass("aside.player", "is-playing");
  Connector.onReady = Connector.onStateChanged;
  Connector.applyFilter(filter);
  function cleanupTrack(track) {
    return track.replace(/^(.*?)\s(by)\s(.*?)$/i, "$1");
  }
  function cleanupArtist(artist) {
    return artist.replace(/^(.*?)\s(by)\s(.*?)$/i, "$3");
  }
})();
