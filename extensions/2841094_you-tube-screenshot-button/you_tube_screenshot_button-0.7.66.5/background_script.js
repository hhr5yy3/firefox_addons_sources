/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*****************************************************!*\
  !*** ./src/background/screenshot-v2.js + 3 modules ***!
  \*****************************************************/

;// CONCATENATED MODULE: ./src/config.js
// generated file, don't try modify it! see /configs/src-generation/config.js

/* harmony default export */ const config = ({
  branch: "master",
  hash: "67f9107d",
  version: "0.7.66.5",
  mode: "production",
  brand: "idl",
  project: "screenshot",
  platform: "gv",
  dist: "firefox",
  extType: "idl-screenshot-gv-firefox",
  analyticsType: "idl-helper",
  include: "*Screenshot",
  manifest: "v2",
  wasmFFmpegCacheName: "ffmpeg-0.12.6.wasm",
  wasm: null,
  analyticsUrl: "https://api.videodlservice.com/stat/",
  logsUrl: "https://api.videodlservice.com/logs",
  getUtmUrl: "https://instaloader.net/user",
  socialMediaSharingUrl: "https://instaloader.net/idl-helper?share=1",
  findOrCreateUrl: "https://unidownloader.com/api/storage/findOrCreate",
  shortUrl: "https://unidownloader.com/r/{%bundleIncrement%}",
  serviceUrl: "https://instaloader.net/vid/{%encodedString%}?{%addFrom%}",
  contactUsUrl: "https://instaloader.net/contact-us?{%addFrom%}",
  desktopClientUrl: "https://instaloader.net/idl-client-instagram-downloader-and-converter",
  desktopClientName: "IDL Client",
  webPortalName: "IDL Portal",
  webPortalHostname: "instaloader.net",
  info: {
    name: "idl_helper_info",
    hostnames: [
      "instaloader.net"
    ]
  },
  extensionName: "Screenshot YouTube Video",
  onlineVideoPlatform: "YouTube",
  ratingUrl: "https://addons.mozilla.org/ru/firefox/addon/screenshot-youtube-video/",
  privacyUrl: "https://instaloader.net/privacy-helper",
  eulaUrl: "https://instaloader.net/eula-helper",
  removeHelperUrl: "https://instaloader.net/remove-helper",
  modules: [
    {
      path: "gv-embed-screenshot",
      name: "gvEmbedScreenshot"
    },
    {
      path: "gv-screenshot",
      name: "gvScreenshot"
    },
    {
      path: "ok-embed-screenshot",
      name: "okEmbedScreenshot"
    },
    {
      path: "ok-screenshot",
      name: "okScreenshot"
    }
  ],
  languages: [
    "bg",
    "cs",
    "da",
    "de",
    "en",
    "es",
    "fi",
    "fil",
    "fr",
    "ga",
    "hi",
    "id",
    "it",
    "ja",
    "kk",
    "ko",
    "lt",
    "my",
    "nl",
    "pl",
    "pt_BR",
    "ro",
    "ru",
    "sv",
    "th",
    "tr",
    "uk",
    "vi",
    "zh"
  ],
  ratingIntervals: {
    sinceInstalled: 259200000,
    sinceLastNotNowIntervals: [
      172800000,
      1209600000,
      2592000000,
      5184000000
    ],
    downloadedInRowAim: 3,
    screenshotedAim: 3
  },
});
;// CONCATENATED MODULE: ./src/utils/add-utm.js
const addUtm = (url, utm) => {
  const objUrl = new URL(url);
  const utmSearch = utm ? Object.keys(utm).map(key => `${key}=${encodeURIComponent(utm[key])}`).join("&") : "";
  return utmSearch ? `${url}${objUrl.search ? "&" : "?"}${utmSearch}` : url;
};

/* harmony default export */ const add_utm = (addUtm);

;// CONCATENATED MODULE: ./src/utils/network/xhr.js
const getContent = (url, options) => (
  /* eslint-disable-next-line no-async-promise-executor */
  new Promise(async (resolve, reject) => {
    const { abortController, timeout } = options;
    const abort = () => {
      if (abortController) {
        abortController.abort();
      }
      reject(new Error("timeout"));
    };
    let abortTimeoutId;
    if (timeout) {
      abortTimeoutId = setTimeout(abort, timeout);
    }
    const fetchOptions = {
      method: "GET",
      signal: abortController ? abortController.signal : undefined,
    };
    try {
      const response = await fetch(url, fetchOptions);
      if (abortTimeoutId) clearTimeout(abortTimeoutId);
      if (!response.ok) {
        reject(new Error());
        return;
      }
      resolve(response.body);
    } catch (e) {
      reject(e);
    }
  })
);

const getHeaders = async (url, headers) => (
  /* eslint-disable-next-line no-async-promise-executor */
  new Promise(async (resolve, reject) => {
    try {
      const options = { method: "HEAD" };
      const response = await fetch(url, options);
      if (!response.ok) {
        reject();
        return;
      }
      const result = headers.map(header => response.headers.get(header));
      resolve(result);
    } catch (err) {
      reject(err);
    }
  })
);

const fetchBack = async (url, options) => {
  const response = await fetch(url, options);
  /* eslint-disable-next-line no-return-await */
  return await response.json();
};

const sendPost = (url, _headers, body) => {
  const headers = _headers.reduce((acc, header) => {
    const [name, value] = header;
    acc[name] = value;
    return acc;
  }, {});
  return fetch(url, {
    body,
    headers,
    method: "POST",
  });
};



;// CONCATENATED MODULE: ./src/background/screenshot-v2.js
// local imports
// config


// utils



/* eslint-disable no-undef */
const runtime = window.chrome ? window.chrome.runtime : browser.runtime;
const tabs = window.chrome ? window.chrome.tabs : browser.tabs;
const management = chrome ? chrome.management : browser.management;
/* eslint-enable no-undef */

const { uninstallLandingUrl } = config;

const setDefaultUninstallUrl = () => runtime.setUninstallURL(uninstallLandingUrl);
const setUninstallUrlWithUTM = utm => runtime.setUninstallURL(add_utm(uninstallLandingUrl, utm));

runtime.onInstalled.addListener(() => {
  // eslint-disable-next-line dot-notation
  if (localStorage["userAcceptedTerms"] === undefined) {
    tabs.create({ url: runtime.getURL("/welcome.html") });
  }
});

if (uninstallLandingUrl) {
  try {
    const utm = localStorage.utm ? JSON.parse(localStorage.utm) : "";
    if (utm) {
      setUninstallUrlWithUTM(utm);
    } else {
      setDefaultUninstallUrl();
    }
  } catch (e) {
    setDefaultUninstallUrl();
  }
}

const sendMessageToAll = (message) => {
  tabs.query({}, (allTabs) => {
    allTabs.forEach((tab) => {
      tabs.sendMessage(tab.id, message);
    });
  });
};

const dispatcher = async (message, port) => {
  // console.log("MESSAGE", message);
  const { id, msg } = message;
  let result;
  let val;
  let keys;
  switch (msg.type) {
  case "uninstallSelf":
    port.postMessage({ id, msg: true });
    sendMessageToAll({ type: "uninstallSelf" });
    setTimeout(() => management.uninstallSelf(), 500);
    break;
  case "get":
    result = localStorage[msg.key];
    try {
      val = JSON.parse(result);
    } catch (e) {
      val = null;
    }
    port.postMessage({ id, msg: val }, [val]);
    break;
  case "set":
    if (uninstallLandingUrl && msg.key === "utm") {
      setUninstallUrlWithUTM(msg.value);
    }
    localStorage[msg.key] = JSON.stringify(msg.value);
    port.postMessage({ id, msg: true });
    sendMessageToAll({ msg, type: "globalStorage" });
    break;
  case "getAllKeys":
    keys = Object.keys(localStorage);
    port.postMessage({ id, msg: keys }, [keys]);
    break;
  case "removeItem":
    localStorage.removeItem(msg.key);
    port.postMessage({ id, msg: true });
    break;
  case "sendPost":
    try {
      await sendPost(msg.url, msg.headers, msg.body);
      port.postMessage({ id, msg: "ok" });
    } catch (err) {
      port.postMessage({ err, id });
    }
    break;
  default:
  }
};

const onConnect = (port) => {
  port.onMessage.addListener((message) => {
    dispatcher(message, port);
  });
};

runtime.onConnect.addListener(onConnect);

/******/ })()
;