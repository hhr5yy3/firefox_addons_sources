"use strict";
(() => {
  // src/connectors/bandcamp-embed.ts
  Connector.playerSelector = "#p-daily-article";
  Connector.artistSelector = ".player.playing .mpartist";
  Connector.trackSelector = ".player.playing .mptracktitle";
  Connector.albumSelector = ".player.playing .mptralbum";
  Connector.currentTimeSelector = ".player.playing .mptime > span:first-child";
  Connector.durationSelector = ".player.playing .mptime > span:last-child";
  Connector.trackArtSelector = ".player.playing .mpaa img";
  Connector.isPlaying = () => Boolean(document.querySelector(".player.playing"));
  Connector.getOriginUrl = () => Util.getOriginUrl(".player.playing a.buy-now");
})();
