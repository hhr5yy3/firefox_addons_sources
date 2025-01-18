"use strict";
(() => {
  // src/connectors/audacy.ts
  var audioPlayer = 'div[aria-label="Audio player"]';
  var buttonOpenFullscreen = 'button[aria-label="Open full-screen player"]';
  var buttonCloseFullscreen = 'button[aria-label="Close full-screen player"]';
  var fullArtistTrackSelector = `${buttonCloseFullscreen} + div span`;
  Connector.playerSelector = "#root";
  Connector.getArtist = () => {
    const miniArtistStationText = Util.getTextFromSelectors(
      `${audioPlayer} ${buttonOpenFullscreen} span:nth-of-type(2)`
    );
    if (miniArtistStationText !== null) {
      return miniArtistStationText.split(" \u2022 ")[0];
    }
    if (Util.isElementVisible(fullArtistTrackSelector)) {
      return Util.getTextFromSelectors(fullArtistTrackSelector)?.split(
        " - "
      )[1] ?? "";
    }
    return null;
  };
  Connector.getTrack = () => {
    const miniTrackText = Util.getTextFromSelectors(
      `${audioPlayer} ${buttonOpenFullscreen} span:first-of-type`
    );
    if (miniTrackText !== null) {
      return miniTrackText;
    }
    if (Util.isElementVisible(fullArtistTrackSelector)) {
      return Util.getTextFromSelectors(fullArtistTrackSelector)?.split(
        " - "
      )[0];
    }
    return null;
  };
  Connector.trackArtSelector = [
    `${audioPlayer} ${buttonOpenFullscreen} img`,
    `${buttonCloseFullscreen} + div img`
  ];
  Connector.isTrackArtDefault = (url) => url?.includes("base64");
  Connector.isPlaying = () => {
    const buttonSvgTitle = "button:not([aria-label=Like], [aria-label*=thumbs]) svg title";
    const buttonPlaying = Util.getTextFromSelectors([
      `${audioPlayer} ${buttonSvgTitle}`,
      `${buttonCloseFullscreen} + div ${buttonSvgTitle}`
    ]);
    return buttonPlaying === "Pause" || buttonPlaying === "Stop";
  };
  Connector.scrobblingDisallowedReason = () => {
    const artist = Connector.getArtist();
    const track = Connector.getTrack();
    if (!artist || !track) {
      return "Other";
    }
    if (artist.includes("Audacy") || artist === track) {
      return "FilteredTag";
    }
    if (track.startsWith("Advertisement")) {
      return "IsAd";
    }
    return null;
  };
})();
