"use strict";
(() => {
  // src/connectors/bbc-sounds.ts
  setupConnector();
  function setupConnector() {
    if (isLiveRadio()) {
      setupPropertiesForLiveRadio();
    } else {
      setupPropertiesForOfflineRecord();
    }
  }
  function isLiveRadio() {
    return document.querySelector(".sc-c-episode__metadata") === null;
  }
  function setupPropertiesForLiveRadio() {
    Connector.playerSelector = ".sc-c-tracks";
    Connector.artistSelector = ".sc-c-track__artist";
    Connector.trackSelector = ".sc-c-track__title";
  }
  function setupPropertiesForOfflineRecord() {
    const trackItemSelector = ".sc-c-basic-tile";
    const equalizerIconSelector = ".sc-c-equalizer";
    const artistSelector = ".sc-c-basic-tile__artist";
    const trackSelector = ".sc-c-basic-tile__title";
    Connector.playerSelector = ".sc-c-scrollable-list";
    Connector.getArtistTrack = () => {
      const artistTrackElement = document.querySelector(
        equalizerIconSelector
      );
      if (!artistTrackElement) {
        return null;
      }
      const trackItem = artistTrackElement.closest(trackItemSelector);
      const artist = trackItem?.querySelector(artistSelector)?.textContent;
      const track = trackItem?.querySelector(trackSelector)?.textContent;
      return { artist, track };
    };
  }
})();
