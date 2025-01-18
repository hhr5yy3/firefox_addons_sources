"use strict";
(() => {
  // src/connectors/indie88.ts
  function setupConnector() {
    if (isCobrPlayer()) {
      setupCobrPlayer();
    } else {
      setupWebsitePlayer();
    }
  }
  function isCobrPlayer() {
    return document.querySelector("div.cobrp-page-column") !== null;
  }
  function setupCobrPlayer() {
    Connector.playerSelector = "div.cobrp-player";
    Connector.trackSelector = "div.cobrp-player-song";
    Connector.artistSelector = "div.cobrp-player-artist";
    Connector.isPlaying = () => Util.hasElementClass("img.cobrp-player-footer-icon", "mod-pause");
  }
  function setupWebsitePlayer() {
    Connector.playerSelector = "div.mediaplayer";
    Connector.artistSelector = "p#track-info-title span";
    Connector.trackSelector = "p#track-info-artist span";
    Connector.isPlaying = () => Util.hasElementClass("a.btn-play", "hidden");
  }
  setupConnector();
})();
