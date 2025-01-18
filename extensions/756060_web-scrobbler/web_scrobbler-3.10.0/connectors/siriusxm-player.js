"use strict";
(() => {
  // src/connectors/siriusxm-player.ts
  var filter = MetadataFilter.createFilter({
    track: [removeYear, removeCover, removeExclusive]
  });
  Connector.playerSelector = "*[class^='_playbackControls_']";
  Connector.artistTrackSelector = "*[class^='_playbackControls_'] *[class*='_title_']";
  Connector.trackArtSelector = "*[class^='_playbackControls_'] *[class^='_trackImage_'] img[class^='_image-image']";
  Connector.playButtonSelector = "*[class^='_playbackControls_'] button[aria-label='Play']";
  Connector.pauseButtonSelector = "*[class^='_playbackControls_'] button[aria-label='Pause']";
  Connector.scrobblingDisallowedReason = () => {
    const artist = Connector.getArtist()?.toLowerCase();
    const track = Connector.getTrack()?.toLowerCase();
    const filteredTerms = [
      "@siriusxm",
      "@jennylsq",
      "@radiomadison",
      "@morningmashup",
      "@drewfromtv",
      "@firstwave",
      "@jaronbf",
      "@jbonamassa",
      "@markyramone",
      "@siriusxmwillie",
      "@sluggodoug",
      "@thechainsmokers",
      "josiah",
      "1-877-33-sirius",
      "@sxm",
      // will broadly catch a bunch of sxm Twitter handles
      "altnation",
      ".ca",
      ".com",
      "indie 1.0",
      "#",
      "facebook",
      "twitter",
      "bdcast"
    ];
    return filteredTerms.some(
      (term) => artist?.includes(term) || track?.includes(term)
    ) ? "FilteredTag" : null;
  };
  Connector.applyFilter(filter);
  function removeExclusive(track) {
    return track.replace(/\sEXCLUSIVE/g, "");
  }
  function removeCover(track) {
    return track.replace(/\([^)]*\b(?:cover|Cover)\b[^)]*\)/g, "");
  }
  function removeYear(track) {
    return track.replace(/\s\(\d{2}\)\s?$/g, "");
  }
})();
