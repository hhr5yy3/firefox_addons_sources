"use strict";
(() => {
  // src/connectors/xrayfm.ts
  Connector.playerSelector = "#audio-toolbar";
  Connector.pauseButtonSelector = "#audio-toolbar .stop-button";
  Connector.getArtistTrack = () => {
    const artistTrackText = Util.getTextFromSelectors(
      "#current-track a[href$=playlist]"
    );
    if (artistTrackText && !artistTrackText.includes("{{data.")) {
      return Util.splitArtistTrack(artistTrackText);
    }
    return null;
  };
  Connector.scrobblingDisallowedReason = () => {
    return Connector.getArtistTrack() && Util.isElementVisible("#current-track") ? "ElementMissing" : null;
  };
})();
