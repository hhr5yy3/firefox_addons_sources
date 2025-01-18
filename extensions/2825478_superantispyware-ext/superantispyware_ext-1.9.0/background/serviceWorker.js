(() => {
  // src/background/serviceWorker.js
  importScripts(
    "shared/activity.js",
    "shared/categorization.js",
    "shared/init.js",
    "shared/searchCounter.js",
    "shared/siteBlocking.js",
    "shared/trackerBlocking.js",
    "shared/trackerBlockingMV3.js",
    "startpageOmniboxCheck.js"
  );
})();
