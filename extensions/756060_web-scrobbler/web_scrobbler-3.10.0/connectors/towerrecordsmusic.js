"use strict";
(() => {
  // src/connectors/towerrecordsmusic.ts
  var lastAlbumThumbnail = null;
  var albumTitle = null;
  var filter = MetadataFilter.createFilter(
    MetadataFilter.createFilterSetForFields(
      ["artist", "track", "albumArtist"],
      katakanaHanToZen
    )
  );
  Connector.playerSelector = "#audioPlayer";
  Connector.artistSelector = "#artistNameAudio";
  Connector.getAlbum = () => {
    requestAlbum();
    return albumTitle;
  };
  Connector.getTrackArt = () => Util.extractUrlFromCssProperty(
    Util.getCSSPropertyFromSelectors(
      "#jacketImageAudio",
      "background-image"
    )
  );
  Connector.currentTimeSelector = "#currentTimeAudio";
  Connector.durationSelector = "#durationTimeAudio";
  Connector.trackSelector = "#titleAudio";
  Connector.pauseButtonSelector = ".dm-pause";
  Connector.applyFilter(filter);
  async function fetchAlbumTitle() {
    const albumThumbnailBackground = Util.getCSSPropertyFromSelectors(
      "#jacketImageAudio",
      "background-image"
    );
    const artistID = document.querySelector("#artistNameAudio").href.split("/").slice(-1)[0];
    const albumListURL = `https://music.tower.jp/artist/album/list/${artistID}`;
    const albumListString = await (await fetch(albumListURL)).text();
    const parser = new DOMParser();
    const albumListDocument = parser.parseFromString(
      albumListString,
      "text/html"
    );
    const albumList = albumListDocument.querySelectorAll(
      ".c-media__image"
    );
    for (const album of albumList) {
      if (Util.getCSSProperty(album, "background-image") === albumThumbnailBackground) {
        return katakanaHanToZen(album.alt);
      }
    }
  }
  async function requestAlbum() {
    if (isNewAlbum()) {
      try {
        albumTitle = await fetchAlbumTitle();
      } catch (err) {
        Util.debugLog(`Error: ${err?.toString()}`, "error");
        resetAlbumTitle();
      }
    }
  }
  function resetAlbumTitle() {
    albumTitle = null;
  }
  function isNewAlbum() {
    const albumThumbnail = Util.getCSSPropertyFromSelectors(
      "#jacketImageAudio",
      "background-image"
    );
    if (lastAlbumThumbnail !== albumThumbnail) {
      lastAlbumThumbnail = albumThumbnail;
      return true;
    }
    return false;
  }
  var katakanaHanToZenMap = {
    "\uFF61": "\u3002",
    "\uFF62": "\u300C",
    "\uFF63": "\u300D",
    "\uFF64": "\u3001",
    "\uFF65": "\u30FB",
    \uFF66: "\u30F2",
    \uFF67: "\u30A1",
    \uFF68: "\u30A3",
    \uFF69: "\u30A5",
    \uFF6A: "\u30A7",
    \uFF6B: "\u30A9",
    \uFF6C: "\u30E3",
    \uFF6D: "\u30E5",
    \uFF6E: "\u30E7",
    \uFF6F: "\u30C3",
    \uFF70: "\u30FC",
    \uFF71: "\u30A2",
    \uFF72: "\u30A4",
    \uFF73: "\u30A6",
    \uFF74: "\u30A8",
    \uFF75: "\u30AA",
    \uFF76: "\u30AB",
    \uFF77: "\u30AD",
    \uFF78: "\u30AF",
    \uFF79: "\u30B1",
    \uFF7A: "\u30B3",
    \uFF7B: "\u30B5",
    \uFF7C: "\u30B7",
    \uFF7D: "\u30B9",
    \uFF7E: "\u30BB",
    \uFF7F: "\u30BD",
    \uFF80: "\u30BF",
    \uFF81: "\u30C1",
    \uFF82: "\u30C4",
    \uFF83: "\u30C6",
    \uFF84: "\u30C8",
    \uFF85: "\u30CA",
    \uFF86: "\u30CB",
    \uFF87: "\u30CC",
    \uFF88: "\u30CD",
    \uFF89: "\u30CE",
    \uFF8A: "\u30CF",
    \uFF8B: "\u30D2",
    \uFF8C: "\u30D5",
    \uFF8D: "\u30D8",
    \uFF8E: "\u30DB",
    \uFF8F: "\u30DE",
    \uFF90: "\u30DF",
    \uFF91: "\u30E0",
    \uFF92: "\u30E1",
    \uFF93: "\u30E2",
    \uFF94: "\u30E4",
    \uFF95: "\u30E6",
    \uFF96: "\u30E8",
    \uFF97: "\u30E9",
    \uFF98: "\u30EA",
    \uFF99: "\u30EB",
    \uFF9A: "\u30EC",
    \uFF9B: "\u30ED",
    \uFF9C: "\u30EF",
    \uFF9D: "\u30F3"
  };
  function katakanaHanToZen(text) {
    let textOutput = "";
    for (const character of text) {
      const charCode = character.charCodeAt(0);
      if (character in katakanaHanToZenMap) {
        textOutput += katakanaHanToZenMap[character];
      } else if (charCode === 65438 || charCode === 65439) {
        const lastCharCode = textOutput[textOutput.length - 1].charCodeAt(0);
        textOutput = textOutput.slice(0, -1) + String.fromCharCode(lastCharCode + charCode - 65437);
      } else {
        textOutput += character;
      }
    }
    return textOutput;
  }
})();
