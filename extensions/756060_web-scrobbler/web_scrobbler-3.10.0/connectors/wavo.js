"use strict";
(() => {
  // src/connectors/wavo.ts
  Connector.playerSelector = ".drawer-content";
  Connector.isPlaying = () => Util.hasElementClass(".pulse-hover-play", "stop");
  Connector.artistTrackSelector = ".pulse-info h3";
})();
