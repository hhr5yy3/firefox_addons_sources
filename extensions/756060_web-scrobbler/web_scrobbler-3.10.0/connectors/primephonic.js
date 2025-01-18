"use strict";
(() => {
  // src/connectors/primephonic.ts
  Connector.playerSelector = ".player";
  Connector.trackArtSelector = ".player-section .cover .loaded";
  Connector.artistSelector = ".composer";
  Connector.trackSelector = ".track-title";
  Connector.albumSelector = ".work";
  Connector.currentTimeSelector = '.progress span[title="Current Time"]';
  Connector.durationSelector = '.progress span[title="Total Time"]';
  Connector.remainingTimeSelector = '.progress span[title="Remaining Time"]';
  Connector.playButtonSelector = ".play-pause img[title=Play]";
})();
