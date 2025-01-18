function handleRedditTrendingToday(isInit, checkedValue, deviceTypeAttribute) {
  function getTrendingTodayContainer() {
    const redditSearch = document.querySelector(
      `reddit-search-${deviceTypeAttribute === "mobile" ? "small" : "large"}`
    );

    if (!redditSearch || !redditSearch.shadowRoot) {
      return null;
    }

    return [
      redditSearch.shadowRoot.querySelector(
        `div[data-faceplate-tracking-context] div #reddit-trending-searches-partial-container`
      ),
      redditSearch.shadowRoot.querySelector(
        `div[data-faceplate-tracking-context] div.text-neutral-content-weak`
      ),
    ];
  }

  if (isInit) {
    const observer = new MutationObserver(() => {
      const trendingTodayContainer = getTrendingTodayContainer();

      if (trendingTodayContainer && trendingTodayContainer[0]) {
        observer.disconnect();
        hideCheckRedditTrendingToday(checkedValue, trendingTodayContainer);
      }
    });

    observer.observe(document, { childList: true, subtree: true });
  } else {
    const trendingTodayContainer = getTrendingTodayContainer();

    if (trendingTodayContainer && trendingTodayContainer[0]) {
      hideCheckRedditTrendingToday(checkedValue, trendingTodayContainer);
    }
  }
}

function hideCheckRedditTrendingToday(checkedValue, trendingTodayContainer) {
  for (const sectionToHide of trendingTodayContainer) {
    sectionToHide.style.cssText = checkedValue
      ? "display: none !important;"
      : "display: block !important;";
  }
}
