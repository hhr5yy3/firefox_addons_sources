"use strict";
(() => {
  // src/connectors/idagio.ts
  var symphonySelector = ".player-PlayerInfo__infoEl--2jhHY span:nth-child(3) span:first-child";
  var commonNameSelector = ".player-PlayerInfo__infoEl--2jhHY span:nth-child(3) span:nth-child(2)";
  var directorSelector = ".player-PlayerInfo__recordingInfo--15VMv>span:first-child span";
  var trackSelector = ".player-PlayerInfo__infoEl--2jhHY";
  var pauseButtonSelector = ".player-PlayerControls__btn--1r-vy:nth-child(3) .util-IconLabel__component--3Uitr span";
  Connector.playerSelector = ".player-PlayerBar__bar--2yos_";
  Connector.artistSelector = ".player-PlayerInfo__infoEl--2jhHY span:first-child";
  Connector.getTrack = getCurrentTrack;
  Connector.getAlbum = getCurrentSymphony;
  Connector.currentTimeSelector = ".player-PlayerProgress__progress--2F0qB>span";
  Connector.durationSelector = ".player-PlayerProgress__timeTotal--3aHlj span";
  Connector.isPlaying = () => Util.getTextFromSelectors(pauseButtonSelector)?.toUpperCase() === "PAUSE";
  Connector.scrobblingDisallowedReason = () => Util.getTextFromSelectors(".player-PlayerInfo__recordingInfo--15VMv") === "Sponsor message" ? "IsAd" : null;
  function getCurrentTrack() {
    let track = Util.getTextFromSelectors(trackSelector)?.split("\xA0\u2013\xA0").slice(1).join(": ").trim();
    if (track?.at(-1) === "\u2013") {
      track = track.slice(0, -1);
    }
    return track;
  }
  function getCurrentSymphony() {
    const symphonyShort = Util.getTextFromSelectors(symphonySelector)?.split(
      / in [A-G]| op. [0-9]| KV [0-9]/
    )[0];
    const commonName = Util.getTextFromSelectors(commonNameSelector) || "";
    const director = removeParenthesis(
      Util.getTextFromSelectors(directorSelector)
    );
    return `${symphonyShort}${commonName} (${director})`;
  }
  function removeParenthesis(text) {
    return text?.replace(/\s*\(.*?\)\s*/g, "");
  }
})();
