"use strict";
(() => {
  // src/connectors/live365.ts
  Connector.trackArtSelector = "img[alt^='Art for']";
  Connector.playerSelector = Connector.trackArtSelector;
  Connector.pauseButtonSelector = ".icon--pause-circle";
  var artistAlbumSeparator = " by ";
  Connector.getArtistTrack = () => {
    const artistAndTrackUnparsed = Util.getAttrFromSelectors(
      Connector.trackArtSelector,
      "alt"
    );
    const artistAndTrackParsed = Util.splitArtistTrack(
      artistAndTrackUnparsed,
      [artistAlbumSeparator],
      true
    );
    return artistAndTrackParsed;
  };
  var filter = MetadataFilter.createFilter({ track: removeTrackPrefix });
  Connector.applyFilter(filter);
  function removeTrackPrefix(track) {
    return track.replace("Art for ", "");
  }
  var LIVE_365_ARTIST = "Live365";
  var ADWTAG = "Advert:";
  var ADBREAK = "Ad Break";
  Connector.scrobblingDisallowedReason = () => {
    const artist = Connector.getArtistTrack()?.artist;
    if (artist === null || artist === LIVE_365_ARTIST || artist === "undefined") {
      return "FilteredTag";
    }
    if (artist?.includes(ADWTAG) || artist?.includes(ADBREAK)) {
      return "IsAd";
    }
    return null;
  };
})();
