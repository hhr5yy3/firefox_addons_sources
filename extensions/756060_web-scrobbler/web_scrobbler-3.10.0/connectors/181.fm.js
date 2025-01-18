"use strict";
(() => {
  // src/connectors/181.fm.ts
  var DEFAULT_TRACK_ART = "configs/images/noalbum-white.png";
  Connector.playerSelector = ".player";
  Connector.artistSelector = ".heading-group .fill_artist";
  Connector.trackSelector = ".heading-group .fill_song";
  Connector.getAlbum = () => {
    const artistAlbumStr = Util.getTextFromSelectors("#artist");
    const artistSlash = `${Connector.getArtist()} / `;
    if (artistAlbumStr && artistAlbumStr.includes(artistSlash)) {
      return artistAlbumStr.replace(artistSlash, "");
    }
    return null;
  };
  Connector.trackArtSelector = ".songimg";
  Connector.isTrackArtDefault = (trackArtUrl) => {
    return trackArtUrl?.endsWith(DEFAULT_TRACK_ART);
  };
  Connector.pauseButtonSelector = "#playbtn.jp-stopx";
})();
