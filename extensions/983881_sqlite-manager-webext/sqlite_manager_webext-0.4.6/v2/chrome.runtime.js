if (chrome.runtime.onStartup) {
  chrome.runtime.onStartup.addListener = new Proxy(chrome.runtime.onStartup.addListener, {
    apply(target, self, args) {
      // do not run in popup
      if (location.href.endsWith('background_page.html')) {
        args[0]();
      }
    }
  });
}

chrome.runtime.getContexts = chrome.runtime.getContexts = function(q) {
  if (q.contextTypes && q.contextTypes.includes('OFFSCREEN_DOCUMENT')) {
    return Promise.resolve([...document.querySelectorAll('iframe.offscreen')]);
  }
  else {
    return Promise.reject(Error('NOT_SUPPORTED'));
  }
};
