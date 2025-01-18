const settings = {}

var tabsUrls = new Object();

window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();


const onBeforeSendHeaders = (details) => {
  const { tabId, type, url, requestHeaders } = details

  console.log("url:", url, " type:", type);
  if (type === 'main_frame') {
    tabsUrls[tabId] = url
  }

  if (typeof tabsUrls[tabId] !== 'undefined') {
    requestHeaders.push({ name: "OPWEB", value: tabsUrls[tabId] });
    console.log("addheader:", tabsUrls[tabId]);
    return { requestHeaders };
  }
}

function setOnBeforeSendHeaders(callback) {
  const urls = ['<all_urls>']
  window.browser.webRequest.onBeforeSendHeaders.addListener(callback, { urls }, ['blocking', 'requestHeaders'])
}

const init = () => {
  setOnBeforeSendHeaders(onBeforeSendHeaders)
}


window.addEventListener('load', init, true)
