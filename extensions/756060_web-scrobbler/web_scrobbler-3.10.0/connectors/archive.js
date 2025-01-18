"use strict";
(() => {
  // src/connectors/archive.ts
  var artistSelectors = [
    ".key-val-big a span",
    ".item-details-metadata > dl > dd a"
  ];
  var trackSelectors = [
    // https://archive.org/details/AH003_corwin_trails_-_corwin_trails
    ".jwrowV2.playing .ttl",
    // https://archive.org/details/lp_everybody-knows-this-is-nowhere_neil-young-crazy-horse-robin-lane
    ".audio-track-list .selected .track-title"
  ];
  var albumSelector = ".thats-left > h1 [itemprop=name]";
  var tracksSelector = ".jwrowV2 .ttl";
  var numericTrackRegex = /^\d+\w+/;
  var filter = MetadataFilter.createFilter({ track: removeNumericPrefixes });
  Connector.applyFilter(filter);
  function removeNumericPrefixes(track) {
    if (hasAllTracksNumericPrefix()) {
      return track.trim().replace(/^(\d+\w+)/, "");
    }
    return track;
  }
  Connector.currentTimeSelector = ".jw-text-elapsed";
  Connector.durationSelector = ".jw-text-duration";
  Connector.isPlaying = () => {
    const videoElement = document.querySelector("video");
    if (videoElement === null) {
      return false;
    }
    return !videoElement.paused;
  };
  Connector.playerSelector = "#theatre-ia";
  Connector.trackArtSelector = [
    // https://archive.org/details/AH013_sarin_sunday_-_the_lonely_hike
    "#theatre-ia center > img",
    // https://archive.org/details/lp_everybody-knows-this-is-nowhere_neil-young-crazy-horse-robin-lane
    ".album-cover img"
  ];
  Connector.getTrackInfo = () => {
    const artist = getArtists(artistSelectors);
    let album = Util.getTextFromSelectors(albumSelector);
    let track = Util.getTextFromSelectors(trackSelectors);
    if (track) {
      const [firstItem, secondItem] = track.split("-").map((item) => item.trim());
      if (artist?.includes(secondItem)) {
        track = firstItem;
      }
    } else {
      track = album;
      album = null;
    }
    return { artist, track, album };
  };
  function hasAllTracksNumericPrefix() {
    const tracks = document.querySelectorAll(tracksSelector);
    if (tracks.length === 0) {
      return false;
    }
    let hasAllTracksNumericPrefix2 = true;
    for (const track of tracks) {
      if (!numericTrackRegex.test(track?.textContent?.trim() ?? "")) {
        hasAllTracksNumericPrefix2 = false;
        break;
      }
    }
    return hasAllTracksNumericPrefix2;
  }
  function getArtists(selectors) {
    const artistElements = Util.queryElements(selectors);
    return artistElements && Util.joinArtists([...artistElements]);
  }
})();
