"use strict";
(() => {
  // src/connectors/nicovideo.ts
  var filter = MetadataFilter.createFilter({
    track: removeDecorationText,
    artist: selectPrimaryName
  });
  var videoSelector = ".MainVideoPlayer > video";
  Connector.playerSelector = ".PlayerContainer";
  Connector.artistSelector = ".VideoOwnerInfo-pageLink";
  Connector.trackSelector = ".VideoTitle";
  Connector.durationSelector = ".PlayerPlayTime-duration";
  Connector.currentTimeSelector = ".PlayerPlayTime-playtime";
  Connector.isPlaying = () => {
    const video = document.querySelector(videoSelector);
    if (!video) {
      return false;
    }
    return video.currentTime > 0 && !video.paused && !video.ended;
  };
  Connector.getUniqueID = () => window.location.pathname.replace(/\/$/, "").replace(/.*\//, "");
  Connector.applyFilter(filter);
  function removeDecorationText(text) {
    const decorationPattern = /^【[^】]*】\s*|\s*【[^【]*】$|^\[[^\]]*\]\s*|\s*\[[^[]*\]$/g;
    const extraInfoPattern = /\s*(\/[^/]+|／[^／]+|[^\da-zA-Z]-[^\da-zA-Z][^-]+|\sfeat\..+|\sft\..+)$/i;
    const titlePattern = /「(.+)」|『(.+)』|'(.+)'|"(.+)"/;
    const match = text.match(titlePattern);
    if (match) {
      return match[1] || match[2] || match[3] || match[4];
    }
    return text.replace(decorationPattern, "").replace(extraInfoPattern, "");
  }
  function selectPrimaryName(text) {
    const nameWithoutSuffix = text.replace(/\sさん$/, "");
    const namePattern = /^(.+?)\s*([/／].+|\([^(]+\)$|（[^（]+）$)/;
    const match = nameWithoutSuffix.match(namePattern);
    if (match) {
      return match[1];
    }
    return nameWithoutSuffix;
  }
})();
