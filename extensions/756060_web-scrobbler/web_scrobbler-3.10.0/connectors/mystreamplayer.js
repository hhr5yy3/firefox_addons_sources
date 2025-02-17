"use strict";
(() => {
  // src/connectors/mystreamplayer.ts
  Connector.playerSelector = "header.player";
  Connector.artistSelector = "#artist";
  Connector.trackSelector = "#song";
  Connector.trackArtSelector = "img.songimg";
  Connector.isPlaying = () => Util.hasElementClass("#playbtn", "jp-stopx");
})();
