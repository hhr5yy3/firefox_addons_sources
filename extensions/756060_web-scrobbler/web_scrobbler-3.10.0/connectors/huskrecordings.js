"use strict";
(() => {
  // src/connectors/huskrecordings.ts
  Connector.playerSelector = "#webamp";
  Connector.trackSelector = "#title";
  Connector.artistSelector = "#artist";
  Connector.albumSelector = "#album";
  Connector.isPlaying = () => Util.hasElementClass("#metadata", "playing");
})();
