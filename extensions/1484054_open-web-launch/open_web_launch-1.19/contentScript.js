for (const el of document.querySelectorAll('a[href$=".jnlp"], a[href^="jnlp://"], a[href^="jnlps://"]')) {
  el.addEventListener('click', e => {
    e.preventDefault();
    console.log(`user clicked on the link ${el.href}`);
    chrome.runtime.sendMessage({ jnlp: el.href });
    if (chrome.runtime.lastError != null) {
      console.log(`error while sending message to the extension background script: ${chrome.runtime.lastError.message}`);
    }
  });
}

window.addEventListener('message', function (event) {
  if (event.source != window) {
    return;
  }
  if (typeof event.data.jnlp === 'string') {
    console.log("Content script received jnlp: " + event.data.jnlp);
    chrome.runtime.sendMessage({ jnlp: event.data.jnlp });
    if (chrome.runtime.lastError != null) {
      console.log(`error while sending message to the extension background script: ${chrome.runtime.lastError.message}`);
    }
  }
});