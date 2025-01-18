"use strict";
(() => {
  // src/connectors/beatport.ts
  var filter = MetadataFilter.createFilter({ track: removeOriginalMix });
  var playerBar = ".Player__container";
  Connector.playerSelector = playerBar;
  Connector.artistSelector = `${playerBar} .track-artists`;
  Connector.trackSelector = `${playerBar} .track-title__primary`;
  Connector.playButtonSelector = `${playerBar} #Player__play-button`;
  Connector.currentTimeSelector = ".Clock__played";
  Connector.durationSelector = ".Clock__total";
  Connector.trackArtSelector = ".Player__artwork-2";
  Connector.getUniqueID = () => {
    const trackUrl = Util.getAttrFromSelectors(
      `${playerBar} .track-title a`,
      "href"
    );
    return trackUrl?.split("/").at(-1);
  };
  Connector.applyFilter(filter);
  function removeOriginalMix(track) {
    const remixedBy = Util.getTextFromSelectors(
      `${playerBar} .track-title__remixed`
    );
    if (remixedBy === "Original Mix") {
      return track;
    }
    return `${track} (${remixedBy})`;
  }
})();
