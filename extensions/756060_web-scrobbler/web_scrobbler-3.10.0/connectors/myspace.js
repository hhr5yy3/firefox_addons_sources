"use strict";
(() => {
  // src/connectors/myspace.ts
  Connector.playerSelector = "#player";
  Connector.artistSelector = ".track .artist";
  Connector.trackSelector = ".track .title";
  Connector.isPlaying = () => !Util.hasElementClass("#footer", "paused");
})();
