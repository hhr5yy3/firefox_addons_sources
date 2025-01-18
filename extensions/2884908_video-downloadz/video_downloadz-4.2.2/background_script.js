/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************************************************!*\
  !*** ./src/webext/background/downloader-v2.js + 7 modules ***!
  \************************************************************/

;// CONCATENATED MODULE: ./src/config.js
// generated file, don't try modify it! see /configs/src-generation/config.js

/* harmony default export */ const config = ({
  branch: "master",
  hash: "dc714f57",
  version: "0.7.64.21",
  mode: "production",
  brand: "udl",
  project: "downloader",
  platform: "gv",
  dist: "firefox",
  extType: "udl-downloader-gv-firefox",
  analyticsType: "udl-helper",
  exclude: "*Screenshot",
  manifest: "v2",
  wasm: null,
  getBlackListEndpoint: "https://api.videodlservice.com/banned-videos-urls",
  getGeoEndpoint: "https://api.videodlservice.com/country",
  analyticsUrl: "https://api.videodlservice.com/stat/",
  logsUrl: "https://api.videodlservice.com/logs",
  getUtmUrl: "https://unidownloader.com/user",
  socialMediaSharingUrl: "https://unidownloader.com/udl-helper?share=1",
  findOrCreateUrl: "https://unidownloader.com/api/storage/findOrCreate",
  shortUrl: "https://unidownloader.com/r/{%bundleIncrement%}",
  serviceUrl: "https://unidownloader.com/vid/{%encodedString%}?{%addFrom%}",
  contactUsUrl: "https://unidownloader.com/contact-us?{%addFrom%}",
  desktopClientUrl: "https://unidownloader.com/udl-client-youtube-downloader-and-converter",
  desktopClientName: "UDL Client",
  webPortalName: "UDL Portal",
  webPortalHostname: "unidownloader.com",
  extensionName: "YDH",
  info: {
    name: "udl_helper_info",
    hostnames: [
      "unidownloader.com",
      "getudl.ru",
      "getunidownloader.ru"
    ]
  },
  onlineVideoPlatform: "YouTube",
  ratingUrl: "https://addons.mozilla.org/ru/firefox/addon/youtube-downloader-udl-helper/",
  privacyUrl: "https://unidownloader.com/privacy-helper",
  eulaUrl: "https://unidownloader.com/eula-helper",
  removeHelperUrl: "https://unidownloader.com/remove-helper",
  modules: [
    {
      path: "gv",
      name: "gv"
    },
    {
      path: "gv-embed",
      name: "gvEmbed"
    },
    {
      path: "gv-shorts",
      name: "gvShorts"
    },
    {
      path: "ig",
      name: "ig"
    },
    {
      path: "ig-embed",
      name: "igEmbed"
    },
    {
      path: "ig-feed",
      name: "igFeed"
    },
    {
      path: "ig-reels",
      name: "igReels"
    },
    {
      path: "ok",
      name: "ok"
    },
    {
      path: "ok-embed",
      name: "okEmbed"
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
;// CONCATENATED MODULE: ./src/utils/uint8-to-base64.js
const { fromCharCode } = String;
const encode = function encode(uint8array) {
  const { length } = uint8array;
  const output = new Array(length);

  for (let i = 0; i < length; i++) {
    output[i] = fromCharCode(uint8array[i]);
  }

  return btoa(output.join(""));
};

const asCharCode = function asCharCode(c) {
  return c.charCodeAt(0);
};

const decode = function decode(chars) {
  return Uint8Array.from(atob(chars), asCharCode);
};



;// CONCATENATED MODULE: ./src/utils/network/xhr.js
const getContent = (url, options) => (
  /* eslint-disable-next-line no-async-promise-executor */
  new Promise(async (resolve, reject) => {
    const { timeout, abortController } = options;
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
      const options = {
        method: "HEAD",
      };
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
    method: "POST",
    headers,
    body,
  });
};



;// CONCATENATED MODULE: ./src/utils/add-utm.js
const addUtm = (url, utm) => {
  const objUrl = new URL(url);
  const utmSearch = utm ? Object.keys(utm).map(key => `${key}=${encodeURIComponent(utm[key])}`).join("&") : "";
  return utmSearch ? `${url}${objUrl.search ? "&" : "?"}${utmSearch}` : url;
};

/* harmony default export */ const add_utm = (addUtm);

;// CONCATENATED MODULE: ./src/utils/random-name-generator.js
/* harmony default export */ const random_name_generator = ((length) => {
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
});

;// CONCATENATED MODULE: ./src/webext/background/dispatcher-ff.js



// import startWorker from "./ffmpeg/start-worker";

/* eslint-disable no-undef */
const management = chrome ? chrome.management : browser.management;
/* eslint-enable no-undef */

const workers = {};

/*
const sendFile = async (buffer, filename, sendMessage) => {
  const _result = new Uint8Array(buffer);
  const chunkSize = 4 * 1024 * 1024;
  const length = _result.byteLength;
  const count = Math.floor(length / chunkSize);
  const chunks = [];
  for (let start = 0; start < count; start++) {
    chunks.push([start * chunkSize, (start + 1) * chunkSize]);
  }
  const rest = length % chunkSize;
  if (rest !== 0) {
    chunks.push([count * chunkSize, count * chunkSize + rest]);
  }
  chunks.forEach((chunk, index) => sendMessage({
    type: "saveFile",
    msg: {
      filename,
      multipleresponse: true,
      end: index === chunks.length - 1,
      chunk: Array.from(_result.slice(chunk[0], chunk[1])),
    },
  }));
};
*/

const dispatch = (msg, ctx) => {
  const {
    sendResponse,
    // sendMessage,
    sendMessageToAll,
    storage,
  } = ctx;

  const {
    type,
    key,
    value,
  } = msg;

  if (type.includes("->") && workers[msg.token]) {
    workers[msg.token].sharedState.filename = msg.filename;
    workers[msg.token].worker.then((worker) => {
      worker.postMessage({ type, bitrate: msg.bitrate });
      sendResponse({ msg: true });
    });
    return;
  }

  /*
  const getMuxingProgress = token => (progress) => {
    sendMessage({ type: "muxingProgress", msg: { progress, token } });
  };
  */

  switch (type) {
  case "uninstallSelf":
    sendResponse({ msg: true });
    sendMessageToAll({ type: "uninstallSelf" });
    setTimeout(() => management.uninstallSelf(), 500);
    break;
  case "cancelDonloading":
    workers[msg.token].sharedState.cancelCalled = true;
    delete workers[msg.token];
    break;
  case "createFFMPEGInstance":
    /* eslint-disable no-case-declarations */
    const token = random_name_generator(8);
    console.log("createFFMPEGInstance:", token);
    sendResponse({ msg: false });
    /*
    const sharedState = {
      filename: "",
      cancelCalled: false,
      resolveStream: (stream) => {
        sendFile(stream, sharedState.filename, sendMessage)
          .then(() => {
            sendMessage({ type: "muxingFinished" });
            delete workers[token];
          });
      },
    };
    const getSharedState = () => sharedState;
    workers[token] = {
      worker: startWorker(getMuxingProgress(token), getSharedState),
      sharedState,
    };
    workers[token].worker
      .then(() => sendResponse({ msg: token }))
      .catch(() => sendResponse({ msg: false }));
    */
    break;
    /* eslint-enable no-case-declarations */
  case "chunkForWasm":
    console.log("DISPATCH: chunkForWasm");
    sendResponse({ msg: false });
    /*
    workers[msg.token].worker.then((worker) => {
      const { chunk, path } = msg;
      worker.postMessage({ type: "chunk", chunk, path });
      sendResponse({ msg: true });
    });
    */
    break;
  case "get":
    storage.get([key], (res) => {
      const response = { msg: res[key] };
      sendResponse(response);
    });
    break;
  case "set":
    storage.set({ [key]: value }, () => {
      sendResponse({ msg: true });
      sendMessageToAll({ msg, type: "globalStorage" });
    });
    break;
  case "getAllKeys":
    storage.get(null, (res) => {
      sendResponse({ msg: Object.keys(res) });
    });
    break;
  case "removeItem":
    storage.remove(key);
    sendResponse({ msg: true });
    break;
  case "getHeaders":
    getHeaders(msg.url, msg.headers)
      .then(headers => sendResponse({ msg: headers }))
      .catch(err => sendResponse({ err }));
    break;
  case "sendPost":
    sendPost(msg.url, msg.headers, msg.body)
      .then(() => sendResponse({ msg: "ok" }))
      .catch(err => sendResponse({ err }));
    break;
  case "fetchBack":
    fetch(msg.url, msg.options)
      .then((res) => {
        if (!msg.responseContentType || msg.responseContentType === "json") {
          res.json()
            .then(json => sendResponse({ msg: json }));
        } else if (msg.responseContentType === "text") {
          res.text()
            .then(text => sendResponse({ msg: text }));
        } else {
          res.arrayBuffer()
            .then((buffer) => {
              const _result = new Uint8Array(buffer);
              const chunkSize = 4 * 1024 * 1024;
              const length = _result.byteLength;
              if (length > chunkSize) {
                const count = Math.floor(length / chunkSize);
                const chunks = [];
                for (let start = 0; start < count; start++) {
                  chunks.push([start * chunkSize, (start + 1) * chunkSize]);
                }
                const rest = length % chunkSize;
                if (rest !== 0) {
                  chunks.push([count * chunkSize, count * chunkSize + rest]);
                }
                chunks.forEach((chunk, index) => sendResponse({
                  multipleresponse: true,
                  end: index === chunks.length - 1,
                  msg: Array.from(_result.slice(chunk[0], chunk[1])),
                }));
              } else {
                sendResponse({ msg: _result });
              }
            });
        }
      })
      .catch(err => sendResponse({ err }));
    break;
  default:
  }
};

/* harmony default export */ const dispatcher_ff = (dispatch);

;// CONCATENATED MODULE: ./src/webext/background/send-message-to-all.js
/* eslint-disable no-undef */
const tabs = chrome ? chrome.tabs : browser.tabs;
/* eslint-enable no-undef */

const sendMessageToAll = (message) => {
  tabs.query({}, (allTabs) => {
    allTabs.forEach((tab) => {
      try {
        tabs.sendMessage(tab.id, message, console.log);
      } catch (e) {

      }
    });
  });
};

/* harmony default export */ const send_message_to_all = (sendMessageToAll);

;// CONCATENATED MODULE: ./src/webext/background/downloader-v2.js




/* eslint-disable no-undef */
const runtime = chrome ? chrome.runtime : browser.runtime;
const downloader_v2_tabs = chrome ? chrome.tabs : browser.tabs;
/* eslint-enable no-undef */

browser.runtime.onInstalled.addListener(function(e){
  if (e.reason === "install" || e.reason === "update") {
    browser.storage.local.set({ i: new Date().getTime() });
  }
});
browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
      browser.storage.local.get('i', function(res) {
        browser.tabs.sendMessage(tabId, { action: "i", data: res.i }, () => browser.runtime.lastError);
      });
  }
});

const storage = {
  get: (keys, callback) => {
    // console.log("GET!!!", keys);
    if (keys === null) {
      callback(localStorage);
      return;
    }
    const res = keys.reduce((acc, key) => {
      try {
        return { ...acc, [key]: JSON.parse(localStorage[key]) };
      } catch {
        return { ...acc, [key]: null };
      }
    }, {});
    callback(res);
  },
  set: (update, callback) => {
    Object.keys(update).forEach((key) => {
      localStorage[key] = JSON.stringify(update[key]);
    });
    callback();
  },
  remove: key => localStorage.removeItem(key),
};

const dispatcher = (message, port) => {
  const { id, msg } = message;
  if (!msg) return;
  const { sender } = port;

  const sendResponse = response => port.postMessage({ id, ...response });
  const sendMessage = _message => downloader_v2_tabs.sendMessage(sender.tab.id, _message, () => {});

  const ctx = {
    sender,
    sendResponse,
    sendMessage,
    sendMessageToAll: send_message_to_all,
    storage,
  };
  dispatcher_ff(msg, ctx);
};

const onConnect = (port) => {
  port.onMessage.addListener((message) => {
    dispatcher(message, port);
  });
};

runtime.onConnect.addListener(onConnect);

const getPortListener = (port) => {
  const abortController = new AbortController();
  const streamDescriptor = {
    write(chunk) {
      const value = encode(chunk);
      port.postMessage({ done: false, value });
    },
    close() {
      port.postMessage({ done: true });
    },
    abort() {},
  };
  return (msg) => {
    const {
      type,
    } = msg;
    if (type === "abort") {
      abortController.abort();
      return;
    }
    if (type === "getContent") {
      try {
        const {
          url,
          timeout,
        } = msg;

        const writableStream = new WritableStream(streamDescriptor);

        getContent(url, { timeout, abortController })
          .then(readableStream => readableStream.pipeTo(writableStream))
          .catch(err => port.postMessage({ err }));
      } catch (err) {
        console.log("error!!!", err);
        port.postMessage({ err });
      }
    }
  };
};

/* eslint-disable-next-line prefer-arrow-callback, func-names */
runtime.onConnect.addListener(function (port) {
  console.log("PORT!!!", port);
  port.onMessage.addListener(getPortListener(port));
});

/******/ })()
;