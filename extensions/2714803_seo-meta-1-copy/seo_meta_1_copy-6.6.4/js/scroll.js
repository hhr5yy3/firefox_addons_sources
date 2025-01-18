 {
  sendMessage({action:"h1to6Index"}, function(response) {
    if (response === undefined || response.action === undefined) {
      return;
    }
    if (response.action === "h1to6Index") {
      scrollStart(response);
    }
  });
}
function sendMessage(sendData, callback = null) {
  if (isFireFox()) {
    bw().runtime.sendMessage(sendData, function(response) {
      callback && callback(response);
    });
  } else {
    chrome.runtime.sendMessage(sendData, function(response) {
      callback && callback(response);
    });
  }
}
function isFireFox() {
  return !(navigator.userAgent.indexOf("Chrome") !== -1);
}
function bw() {
  if (isFireFox()) {
    return browser;
  } else {
    return chrome;
  }
}
function getManifestVer() {
  return chrome.runtime.getManifest().manifest_version;
}
function scrollStart(config) {
  let h1to6Index = config.h1to6Index;
  let hs = document.querySelectorAll("h1,h2,h3,h4,H4,h5,h6");
  let element = hs[h1to6Index];
  ScrollWindow(element);
}
function ScrollWindow(element) {
  let rect = element.getBoundingClientRect();
  let elemtop = rect.top + window.pageYOffset;
  element.scrollIntoView({behavior:"smooth", block:"center"});
  cleanHighlighted();
  highlightElement(element);
}
function cleanHighlighted() {
  let highlightedElements = window.document.querySelectorAll("*[data-SeoMeta1Copy-highlight]");
  highlightedElements.forEach(function(element) {
    element.removeAttribute("data-SeoMeta1Copy-highlight");
  });
}
function highlightElement(element) {
  if (!element) {
    return;
  }
  element.setAttribute("data-SeoMeta1Copy-highlight", "true");
}
;
