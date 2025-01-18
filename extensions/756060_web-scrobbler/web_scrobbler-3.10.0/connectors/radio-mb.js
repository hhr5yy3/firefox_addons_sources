"use strict";
(() => {
  // src/connectors/radio-mb.ts
  Connector.playerSelector = "#radiomb";
  Connector.artistSelector = "#radiomb-np-artist";
  Connector.trackSelector = "#radiomb-np-title";
  Connector.trackArtSelector = "#radiomb-top";
  Connector.isPlaying = () => Util.hasElementClass("#radiomb-play", "radiomb-playing");
})();
