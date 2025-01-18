let MORunning = false,
  onThatPage = true,
  highlightFlag = false,
  counterString;
const isShortsPage = () => location.pathname.startsWith("/shorts");
const isResultsPage = () => location.pathname.startsWith("/results");
window.addEventListener("DOMContentLoaded", () => {
  if (isShortsPage()) YTshortsRedirect();
  const { pathname } = location;
  switch (true) {
    case pathname.startsWith("/results"):
      cleanUp(true);
      break;
    case pathname.startsWith("/watch"):
      watchCleanUP();
      break;
    default:
      restoreBlue();
      break;
  }
});
document.addEventListener("yt-navigate-start", () => {
  if (isShortsPage()) YTshortsRedirect();

  const { pathname } = location;
  switch (true) {
    case pathname.startsWith("/results"):
      cleanUp(true);
      break;
    case pathname.startsWith("/watch"):
      watchCleanUP();
      break;
    case MORunning:
      cleanUp(false);
      break;
    default:
      restoreBlue();
      break;
  }
});
function cleanUp(flag) {
  onThatPage = flag;
  restoreSettings();
  const mutationCallback = (mutationsList, observer) => {
    if (!onThatPage) return;
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        for (const addedNode of mutation.addedNodes) {
          if (
            addedNode.nodeName.toLowerCase() === "img" &&
            addedNode.complete
          ) {
            removeDistractions();
            highLight(thumbValue);
          }
        }
      }
    }
  };
  const observer = new MutationObserver(mutationCallback);
  const targetNode = document;
  const config = { childList: true, subtree: true }; // Options for the observer
  if (onThatPage) {
    observer.observe(targetNode, config);
    MORunning = true;
  } else if (!onThatPage) {
    observer.disconnect();
    MORunning = false;
  }
}
function watchCleanUP() {
  if (location.pathname.startsWith("/watch")) {
    const titleObserver = new MutationObserver(() => {
      const title = document.querySelector("#title h1");
      if (title) {
        addClassNames1();
        titleObserver.disconnect();
      }
    });
    const descriptionObserver = new MutationObserver(() => {
      const description = document.querySelector("#description div");
      if (description) {
        addClassNames2();
        descriptionObserver.disconnect();
      }
    });
    restoreUISettings();
    titleObserver.observe(document.body, { childList: true });
    descriptionObserver.observe(document.body, { childList: true });
  }
}
function removeDistractions() {
  let shelf = document.querySelectorAll(
    "#primary .ytd-two-column-search-results-renderer ytd-shelf-renderer"
  );
  let cardList = document.querySelectorAll(
    "#primary .ytd-two-column-search-results-renderer ytd-shelf-renderer"
  );
  let playlist = document.querySelectorAll(
    "#primary .ytd-two-column-search-results-renderer ytd-playlist-renderer"
  );
  let radio = document.querySelectorAll(
    "#primary .ytd-two-column-search-results-renderer ytd-radio-renderer"
  );
  let channel = document.querySelectorAll(
    "#primary .ytd-two-column-search-results-renderer ytd-channel-renderer"
  );
  let reel = document.querySelectorAll(
    "#primary .ytd-two-column-search-results-renderer ytd-reel-shelf-renderer"
  );
  let YTshorts = document.querySelectorAll(
    "ytd-video-renderer.style-scope.ytd-item-section-renderer div#dismissible.style-scope.ytd-video-renderer ytd-thumbnail.style-scope.ytd-video-renderer a#thumbnail"
  );
  let isLive = document.querySelectorAll("#badges > div > p");

  if (YTshortsValue) {
    YTshorts.forEach((element) => {
      let cHREF = element.href.toString();
      if (cHREF.includes("shorts")) {
        element.parentElement.parentElement.parentElement.remove();
        counterString += 1;
        saveOptions();
      }
    });
  }
  if (liveValue) {
    isLive.forEach((element2) => {
      if (
        element2.textContent === "LIVE" ||
        element2.textContent === "PREMIERE"
      ) {
        element2.closest("ytd-video-renderer").remove();
        counterString += 1;
        saveOptions();
      }
    });
  }
  if (shelfValue) {
    for (let i = 0; i < shelf.length; i++) {
      shelf[i].remove();
      counterString += 1;
      saveOptions();
    }
  }
  if (cardListValue) {
    for (let i = 0; i < cardList.length; i++) {
      cardList[i].remove();
      counterString += 1;
      saveOptions();
    }
  }
  if (playlistValue) {
    for (let i = 0; i < playlist.length; i++) {
      playlist[i].remove();
      counterString += 1;
      saveOptions();
    }
  }
  if (radioValue) {
    for (let i = 0; i < radio.length; i++) {
      radio[i].remove();
      counterString += 1;
      saveOptions();
    }
  }
  if (channelValue) {
    for (let i = 0; i < channel.length; i++) {
      channel[i].remove();
      counterString += 1;
      saveOptions();
    }
  }
  if (reelValue) {
    for (let i = 0; i < reel.length; i++) {
      reel[i].remove();
      counterString += 1;
      saveOptions();
    }
  }
  function saveOptions() {
    browser.storage.local.set({ counterString });
  }
}
function restoreSettings() {
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(localStorage, onError);

  function localStorage(restoredSettings) {
    thumbValue = restoredSettings.thumbnails;
    shelfValue = restoredSettings.shelfShow;
    cardListValue = restoredSettings.cardListShow;
    shortsValue = restoredSettings.shortVideos;
    playlistValue = restoredSettings.playlistShow;
    radioValue = restoredSettings.radioShow;
    channelValue = restoredSettings.channelShow;
    reelValue = restoredSettings.reelShow;
    YTshortsValue = restoredSettings.YTshortVideos;
    liveValue = restoredSettings.liveVideos;
    counterString = restoredSettings.counterString;

    if (
      typeof thumbValue !== "undefined" &&
      typeof shelfValue !== "undefined" &&
      typeof cardListValue !== "undefined" &&
      typeof playlistValue !== "undefined" &&
      typeof radioValue !== "undefined" &&
      typeof channelValue !== "undefined" &&
      typeof reelValue !== "undefined" &&
      typeof YTshortsValue !== "undefined" &&
      typeof shortsValue !== "undefined" &&
      typeof liveValue != "undefined" &&
      typeof counterString !== "undefined"
    ) {
    } else {
      thumbValue = false; //firstrun
      shelfValue = false; //firstrun
      cardListValue = true; //firstrun
      playlistValue = false; //first run
      radioValue = false; //first run
      channelValue = false; // first run
      reelValue = true; //first run
      YTshortsValue = false; //first run
      liveValue = false; //first run
      shortsValue = true; //first run
      counterString = 0; //first run
    }
  }
}
function restoreUISettings() {
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(localStorage, onError);

  function localStorage(restoredSettings) {
    titleValue = restoredSettings.title;
    descValue = restoredSettings.description;
    if (typeof titleValue !== "undefined" && typeof descValue !== "undefined") {
    } else {
      titleValue = false; //firstrun
      descValue = false; //firstrun
    }
  }
}
function restoreBlue() {
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(localStorage, onError);
  let blueValue = "";
  function localStorage(restoredSettings) {
    blueValue = restoredSettings.blueHighlight;
    if (typeof blueValue !== "undefined") {
    } else blueValue = false; //firstrun
    if (blueValue && !location.pathname.startsWith("/search")) blue();
  }
}
function onError(e) {
  console.error(e);
}
function addClassNames1() {
  const metadataEl = document.querySelector("ytd-watch-metadata");
  const hasMetadataActiveClass =
    metadataEl && metadataEl.classList.contains("watch-active-metadata");
  if (titleValue) {
    if (hasMetadataActiveClass && document.querySelector("#title h1")) {
      document.querySelector("#title h1").classList.add("newCustomTitle");
    }
    // Sponsorblock invisible flexbox mitigation
    const titleElement = document.querySelector(
      ".title.style-scope.ytd-video-primary-info-renderer"
    );
    if (titleElement && titleElement.attributes.length > 1) {
      const styleAttribute = titleElement.attributes[1];
      if (styleAttribute.name === "style") {
        titleElement.removeAttribute("style");
      }
    }
  } else if (!titleValue) {
    if (hasMetadataActiveClass && document.querySelector("#title h1")) {
      document.querySelector("#title h1").classList.remove("newCustomTitle");
    }
  }
}
function addClassNames2() {
  let loc = window.location.href.toString();
  let locBoolean = loc.includes("https://www.youtube.com/watch");
  let temp = document.querySelectorAll("#description");
  if (descValue === true && locBoolean) temp[1].classList.add("customDesc");
  else if (locBoolean && !descValue) temp[1].classList.remove("customDesc");
}
function blue() {
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>yt-chip-cloud-chip-renderer[chip-style="STYLE_DEFAULT"][selected]:hover,
  yt-chip-cloud-chip-renderer[chip-style="STYLE_HOME_FILTER"][selected]:hover,
  yt-chip-cloud-chip-renderer[chip-style="STYLE_DEFAULT"][selected]:focus,
  yt-chip-cloud-chip-renderer[chip-style="STYLE_HOME_FILTER"][selected]:focus,
  yt-chip-cloud-chip-renderer[chip-style="STYLE_DEFAULT"]:not([selected]):hover,
  yt-chip-cloud-chip-renderer[chip-style="STYLE_HOME_FILTER"]:not([selected]):hover,
  yt-chip-cloud-chip-renderer[chip-style="STYLE_REFRESH_TO_NOVEL_CHIP"]:not([selected]):hover,
  yt-chip-cloud-chip-renderer[chip-style="STYLE_DEFAULT"]:not([selected]):focus,
  yt-chip-cloud-chip-renderer[chip-style="STYLE_HOME_FILTER"]:not([selected]):focus,
  yt-chip-cloud-chip-renderer[chip-style="STYLE_REFRESH_TO_NOVEL_CHIP"]:not([selected]):focus,
  yt-chip-cloud-chip-renderer[chip-style="STYLE_HOME_FILTER"][selected]:focus {
    background-color: #387fdd;
    transition: background-color 50ms cubic-bezier(0.05, 0, 0, 1);
    color: white !important;</style>`
  );
  let tempBlue = document.querySelectorAll("#items");
  let buffer;
  let videoRecommendation = "ytd-watch-next-secondary-results-renderer";
  let subscriptionGrid = "ytd-grid-renderer";
  let scrollContainer = "style-scope yt-horizontal-list-renderer";
  for (let outer = 0; outer < tempBlue.length; outer++) {
    for (let inner = 0; inner < tempBlue[outer].childElementCount; inner++) {
      tempBlue[outer].childNodes[inner].addEventListener("click", change);
      function change() {
        if (buffer) buffer.classList.remove("customBlue");
        /* if (blueValue) { */
        let shorten = tempBlue[outer].childNodes[inner];
        let tmpVR = shorten.classList.toString().includes(videoRecommendation);
        let tmpSG = shorten.classList.toString().includes(subscriptionGrid);
        let tmpSC = shorten.classList.toString().includes(scrollContainer);
        if (!tmpVR && !tmpSG && !tmpSC) {
          let tmpAttr = shorten.attributes;
          for (let x = 0; x < tmpAttr.length; x++) {
            if (tmpAttr[x].nodeName === "line-end-style") {
              shorten.classList.add("customBlue");
              buffer = shorten;
            }
          }
        }
      }
    }
  }
}
function YTshortsRedirect() {
  const gettingStoredSettings = browser.storage.local.get();
  gettingStoredSettings.then(localStorage, onError);

  function localStorage(restoredSettings) {
    shortsValue = restoredSettings.shortVideos;
    if (typeof shortsValue !== "undefined") {
    } else {
      shortsValue = true; //first run
    }
    if (shortsValue) handleShortsNavigation();
  }
}
function handleShortsNavigation() {
  const videoID = window.location.href.substring(
    window.location.href.indexOf("/shorts/") + 8
  );
  const newURL = `https://www.youtube.com/watch?v=${videoID}`;
  window.location.assign(newURL);
}
function highLight(thumbValue) {
  if (!isResultsPage()) {
    return;
  }

  if (!thumbValue) {
    let ytd = document.querySelectorAll(
      "ytd-video-renderer.style-scope.ytd-item-section-renderer"
    );
    for (let i = 0; i < ytd.length; i++) {
      if (ytd[i].classList.contains("dark-ytd-video-renderer")) {
        ytd[i].classList.remove("dark-ytd-video-renderer");
      } else if (ytd[i].classList.contains("light-ytd-video-renderer")) {
        ytd[i].classList.remove("light-ytd-video-renderer");
      }
    }
    return;
  }

  const isDark = document.documentElement.hasAttribute("dark");
  let ytd = document.querySelectorAll(
    "ytd-video-renderer.style-scope.ytd-item-section-renderer"
  );
  for (let i = 0; i < ytd.length; i++) {
    if (isDark) ytd[i].classList.add("dark-ytd-video-renderer");
    else if (!isDark) ytd[i].classList.add("light-ytd-video-renderer");
  }
}
