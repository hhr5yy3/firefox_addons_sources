function download() {
  chrome.runtime.getBackgroundPage(function(backgroundWindow) {
    backgroundWindow.downloadMessagingHost();
  });
}
