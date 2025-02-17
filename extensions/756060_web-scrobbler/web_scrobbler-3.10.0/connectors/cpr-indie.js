"use strict";
(() => {
  // src/connectors/cpr-indie.ts
  Connector.playerSelector = "#qtmplayer";
  Connector.artistSelector = ".qtmplayer__songdata .qtmplayer__artist";
  Connector.trackSelector = ".qtmplayer__songdata .qtmplayer__title";
  Connector.isPlaying = () => Util.hasElementClass("#qtmplayerNotif", "playing");
  Connector.scrobblingDisallowedReason = () => {
    return Util.getTextFromSelectors(".qtmplayer__songdata")?.includes(
      "Indie 102.3"
    ) || Connector.getArtist()?.startsWith("with ") ? "FilteredTag" : null;
  };
})();
