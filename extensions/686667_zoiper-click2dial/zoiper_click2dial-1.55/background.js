'use strict';

// Workaround the inability to use tabs.update() with a non-http(s):// URLs in Safari
function clickHiddenLink(href) {
  const hiddenLink = document.createElement('a');
  hiddenLink.setAttribute('href', href);
  hiddenLink.click();
}

function openURI(tab, uri) {
  if (canInjectCode(tab.url)) {
    chrome.tabs.executeScript(tab.id, {
      code: `(${clickHiddenLink})(${JSON.stringify(uri)})`
    });
  }
}
