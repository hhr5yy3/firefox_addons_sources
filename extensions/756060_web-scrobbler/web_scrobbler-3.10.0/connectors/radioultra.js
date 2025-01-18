"use strict";
(() => {
  // src/connectors/radioultra.ts
  Connector.playerSelector = "#jp_container_1";
  Connector.artistSelector = ".track-info .artist";
  Connector.trackSelector = ".track-info .song";
  Connector.isPlaying = () => Util.hasElementClass("#jp_container_1", "jp-state-playing");
})();
