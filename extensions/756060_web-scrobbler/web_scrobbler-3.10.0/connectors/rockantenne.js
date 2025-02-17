"use strict";
(() => {
  // src/connectors/rockantenne.ts
  Connector.playerSelector = ".l-highlight";
  Connector.artistSelector = ".c-player__currentartist";
  Connector.trackSelector = ".c-player__currenttitle";
  Connector.isPlaying = () => {
    return Util.hasElementClass(".c-player", "is-playing");
  };
  Connector.scrobblingDisallowedReason = () => {
    return Connector.getArtist()?.includes("ROCK ANTENNE") ? "FilteredTag" : null;
  };
})();
