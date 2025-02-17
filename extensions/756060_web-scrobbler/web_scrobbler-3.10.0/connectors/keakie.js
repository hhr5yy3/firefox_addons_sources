"use strict";
(() => {
  // src/connectors/keakie.ts
  Connector.playerSelector = ".player-full-playback-controls";
  Connector.playButtonSelector = ".play.button.--is-invisible";
  Connector.getArtistTrack = () => {
    const artistTrack = Util.getTextFromSelectors(".current-track-and-artist");
    return Util.splitArtistTrack(artistTrack, ["-"], true);
  };
})();
