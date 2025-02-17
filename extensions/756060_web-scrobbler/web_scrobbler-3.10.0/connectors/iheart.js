"use strict";
(() => {
  // src/connectors/iheart.ts
  var playerBar = "[data-test=player-container]";
  var controlBar = "[data-test=controls-container]";
  Connector.playerSelector = playerBar;
  Connector.pauseButtonSelector = `${controlBar} button[data-test-state=PLAYING]`;
  Connector.artistSelector = `${playerBar} [data-test=line-text]:nth-child(3)`;
  Connector.trackSelector = `${playerBar} [data-test=line-text]:nth-child(2)`;
  Connector.scrobblingDisallowedReason = () => {
    const track = Connector.getTrack();
    return track && !track.startsWith("Thanks for listening") ? null : "FilteredTag";
  };
})();
