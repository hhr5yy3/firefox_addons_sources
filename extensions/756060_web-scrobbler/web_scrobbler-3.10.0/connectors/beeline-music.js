"use strict";
(() => {
  // src/connectors/beeline-music.ts
  Connector.playerSelector = ".player-container";
  Connector.artistSelector = ".player__track_artist";
  Connector.trackSelector = ".player__track_title";
  Connector.trackArtSelector = ".cover__inner";
  Connector.isPodcast = () => Util.hasElementClass(".player", "player-podcast");
  Connector.isPlaying = () => Util.getAttrFromSelectors(".player__controls_button-play", "title") === "\u041F\u0430\u0443\u0437\u0430";
})();
