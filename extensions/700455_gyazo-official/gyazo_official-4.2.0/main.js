/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/libs/MessageListener.ts":
/*!*************************************!*\
  !*** ./src/libs/MessageListener.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MessageListener),
/* harmony export */   sendMessageToContentScript: () => (/* binding */ sendMessageToContentScript),
/* harmony export */   sendMessageToMainScript: () => (/* binding */ sendMessageToMainScript)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);

class MessageListener {
  constructor(name) {
    this.name = name;
    this.listeners = {};
  }
  add(action, func) {
    if (!this.listeners[action]) {
      this.listeners[action] = [];
    }
    this.listeners[action]?.push(func);
  }
  listen({
    action,
    target,
    ...message
  }, sender, sendResponse) {
    if (this.name && this.name !== target) return true;
    const listeners = this.listeners[action];
    if (listeners && listeners.length > 0) {
      // @ts-expect-error ３つのContextが揃うまではmessageの型がエラーになる
      listeners.forEach(func => func(message, sender, sendResponse));
    }
    return true;
  }
}

/**
 * tabs.sendMessageのラッパー
 * contentScript向けのメッセージを送信する
 */
const sendMessageToContentScript = function (id, message, callback) {
  const p = webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().tabs.sendMessage(id, message);
  if (!p) return;
  p.then(() => {
    callback?.();
  });
};

/**
 * runtime.sendMessageのラッパー
 * mainScript向けのメッセージを送信する
 */
const sendMessageToMainScript = function (id, message, callback) {
  const p = webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.sendMessage(id, message);
  p.then(() => {
    callback?.();
  });
  return p;
};

/***/ }),

/***/ "./src/libs/UploadNotification.ts":
/*!****************************************!*\
  !*** ./src/libs/UploadNotification.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UploadNotification)
/* harmony export */ });
/* harmony import */ var _MessageListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessageListener */ "./src/libs/MessageListener.ts");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);


class UploadNotification {
  constructor(tabId) {
    this.tabId = tabId;
  }
  startUploading() {
    if (!this.tabId) return;
    (0,_MessageListener__WEBPACK_IMPORTED_MODULE_0__.sendMessageToContentScript)(this.tabId, {
      target: "content",
      action: "notification",
      message: ""
    });
  }
  finish(imagePageUrl, imageDataUrl, scale) {
    if (!this.tabId) return;
    (0,_MessageListener__WEBPACK_IMPORTED_MODULE_0__.sendMessageToContentScript)(this.tabId, {
      target: "content",
      action: "notification",
      title: webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().i18n.getMessage("uploadingFinishTitle"),
      imagePageUrl,
      imageUrl: imageDataUrl,
      scale,
      isFinish: true
    });
  }
}

/***/ }),

/***/ "./src/libs/canvasUtils.js":
/*!*********************************!*\
  !*** ./src/libs/canvasUtils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appendImageToCanvas: () => (/* binding */ appendImageToCanvas),
/* harmony export */   trimImage: () => (/* binding */ trimImage)
/* harmony export */ });
function imageLoader(imgSrc, callback) {
  const img = new window.Image();
  img.onload = function () {
    callback(img);
  };
  img.src = imgSrc;
}
const appendImageToCanvas = argObj => new Promise(resolve => {
  const scale = argObj.scale || 1.0;
  const zoom = argObj.zoom || 1.0;
  const {
    canvas,
    width,
    top,
    left,
    height,
    imageSrc
  } = argObj;
  const ctx = canvas.getContext("2d");
  imageLoader(imageSrc, function (img) {
    ctx.drawImage(img, 0, 0, width * scale * zoom, height * scale * zoom, left, top, img.width, img.height);
    const lastImageBottom = top + img.height;
    const lastImageRight = left + img.width;
    resolve([lastImageBottom, lastImageRight]);
  });
});
const trimImage = argObj => new Promise(resolve => {
  const scale = argObj.scale || 1.0;
  const zoom = argObj.zoom || 1.0;
  const {
    imageData
  } = argObj;
  let startX = argObj.startX * zoom * scale;
  let startY = argObj.startY * zoom * scale;
  let width = argObj.width * zoom * scale;
  let height = argObj.height * zoom * scale;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (typeof imageData === "string" && imageData.substr(0, 5) === "data:") {
    imageLoader(imageData, function (img) {
      ctx.drawImage(img, startX, startY, width, height, 0, 0, width, height);
      resolve(canvas);
    });
  } else if (typeof imageData === "object") {
    // maybe <canvas>
    const originalWidth = width;
    const originalHeight = height;
    startX *= scale;
    startY *= scale;
    height *= scale * zoom;
    width *= scale * zoom;
    ctx.drawImage(imageData, startX, startY, width, height, 0, 0, originalWidth, originalHeight);
    resolve(canvas);
  }
});

/***/ }),

/***/ "./src/libs/changeTabEvents.js":
/*!*************************************!*\
  !*** ./src/libs/changeTabEvents.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   disableButton: () => (/* binding */ disableButton),
/* harmony export */   enableButton: () => (/* binding */ enableButton)
/* harmony export */ });
/* harmony import */ var _oauth2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oauth2 */ "./src/libs/oauth2/index.ts");
/* harmony import */ var _storageSwitcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storageSwitcher */ "./src/libs/storageSwitcher.js");


const disableButton = function (tabId) {
  chrome.browserAction.setIcon({
    path: {
      19: "/icons/19_disable.png",
      38: "/icons/19_disable@2x.png"
    }
  });
  chrome.browserAction.disable(tabId);
};
const enableButton = function (tabId) {
  chrome.browserAction.setIcon({
    path: {
      19: "/icons/19.png",
      38: "/icons/19@2x.png"
    }
  });
  chrome.browserAction.enable(tabId);
};
chrome.tabs.onActivated.addListener(async activeInfo => {
  const tab = await browser.tabs.get(activeInfo.tabId);
  if (tab.status === "loading") {
    return disableButton(tab.id);
  }
  if (tab.url && tab.url.match(/^https?:/)) {
    enableButton(tab.id);
  } else {
    disableButton(tab.id);
  }
});
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    disableButton(tabId);
  } else if (changeInfo.status === "complete") {
    const tab = await browser.tabs.get(tabId);
    if (!tab.url) return;
    if (!tab.url.match(/^https?:/)) {
      return console.error("This Extension can run only on https? pages: " + location.href);
    }
    if (tab.url.startsWith("https://gyazo.com/oauth/onboarding/extension")) {
      const code = (0,_oauth2__WEBPACK_IMPORTED_MODULE_0__.getCode)(tab.url);
      if (code) {
        const accessToken = await (0,_oauth2__WEBPACK_IMPORTED_MODULE_0__.getAccessToken)(code);
        _storageSwitcher__WEBPACK_IMPORTED_MODULE_1__["default"].set({
          accessToken
        });
        chrome.tabs.remove(tabId);
      } else {
        // error
      }
    }
    let loaded = [false];
    try {
      loaded = await browser.tabs.executeScript(tabId, {
        code: "window.__embededGyazoContentJS"
      });
    } catch (e) {
      // no-op
    }
    if (loaded[0]) return enableButton(tabId);
    await browser.tabs.executeScript(tabId, {
      file: "./content.js"
    });
    await browser.tabs.insertCSS(tabId, {
      file: "/content.css"
    });
    enableButton(tabId);
  }
});


/***/ }),

/***/ "./src/libs/contextMenu.js":
/*!*********************************!*\
  !*** ./src/libs/contextMenu.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MessageListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessageListener */ "./src/libs/MessageListener.ts");
/* harmony import */ var _gyazoIt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gyazoIt */ "./src/libs/gyazoIt.js");
/* harmony import */ var _storageSwitcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storageSwitcher */ "./src/libs/storageSwitcher.js");



const onContextMenuClickListener = new _MessageListener__WEBPACK_IMPORTED_MODULE_0__["default"]("contextmenu");
chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.insertCSS(tab.id, {
    file: "/menu.css"
  });
  onContextMenuClickListener.listen({
    target: "contextmenu",
    action: info.menuItemId,
    info,
    tab
  });
});
onContextMenuClickListener.add("gyazoIt", ({
  info,
  tab
}) => {
  (0,_gyazoIt__WEBPACK_IMPORTED_MODULE_1__["default"])(tab, info.srcUrl);
});
onContextMenuClickListener.add("captureSelectElement", ({
  tab
}) => {
  (0,_MessageListener__WEBPACK_IMPORTED_MODULE_0__.sendMessageToContentScript)(tab.id, {
    target: "content",
    action: "captureElement",
    tab
  });
});
onContextMenuClickListener.add("captureWindow", ({
  tab
}) => {
  (0,_MessageListener__WEBPACK_IMPORTED_MODULE_0__.sendMessageToContentScript)(tab.id, {
    target: "content",
    action: "captureWindow",
    tab
  });
});
onContextMenuClickListener.add("captureSelectArea", ({
  tab
}) => {
  (0,_MessageListener__WEBPACK_IMPORTED_MODULE_0__.sendMessageToContentScript)(tab.id, {
    target: "content",
    action: "captureSelectArea",
    tab
  });
});
onContextMenuClickListener.add("captureWholePage", ({
  tab
}) => {
  (0,_MessageListener__WEBPACK_IMPORTED_MODULE_0__.sendMessageToContentScript)(tab.id, {
    target: "content",
    action: "captureWholePage",
    tab
  });
});
const checkContextMenuEnabled = async () => {
  let contextMenuEnabled = true;
  const settings = await _storageSwitcher__WEBPACK_IMPORTED_MODULE_2__["default"].get({
    contextMenu: true
  });
  contextMenuEnabled = settings.contextMenu;
  if (!contextMenuEnabled) {
    try {
      await browser.contextMenus.removeAll();
      await browser.contextMenus.create({
        title: chrome.i18n.getMessage("contextMenuImage"),
        id: "gyazoIt",
        contexts: ["image"]
      });
    } catch {
      // no-op
    }
    return;
  }
  try {
    await browser.contextMenus.removeAll();
    await browser.contextMenus.create({
      title: chrome.i18n.getMessage("captureParentTitle"),
      id: "captureParent",
      contexts: ["all"]
    });
    await browser.contextMenus.create({
      parentId: "captureParent",
      title: chrome.i18n.getMessage("thisImage"),
      id: "gyazoIt",
      contexts: ["image"]
    });
    await browser.contextMenus.create({
      parentId: "captureParent",
      id: "gyazoContextMenuSeparator",
      type: "separator",
      contexts: ["image"]
    });
    await browser.contextMenus.create({
      parentId: "captureParent",
      id: "captureSelectElement",
      title: chrome.i18n.getMessage("selectElement"),
      contexts: ["all"]
    });
    await browser.contextMenus.create({
      parentId: "captureParent",
      id: "captureSelectArea",
      title: chrome.i18n.getMessage("selectArea"),
      contexts: ["all"]
    });
    await browser.contextMenus.create({
      parentId: "captureParent",
      id: "captureWindow",
      title: chrome.i18n.getMessage("captureWindow"),
      contexts: ["all"]
    });
    chrome.contextMenus.create({
      parentId: "captureParent",
      id: "captureWholePage",
      title: chrome.i18n.getMessage("topToBottom"),
      contexts: ["all"]
    });
  } catch (e) {
    if (!e.message.match("duplicate id")) console.error(e);
  }
};
_storageSwitcher__WEBPACK_IMPORTED_MODULE_2__["default"].onChanged.addListener(checkContextMenuEnabled.bind(checkContextMenuEnabled));
checkContextMenuEnabled();

/***/ }),

/***/ "./src/libs/convertAdjustmentJpegQuality.js":
/*!**************************************************!*\
  !*** ./src/libs/convertAdjustmentJpegQuality.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _uploadLimitFileSize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uploadLimitFileSize */ "./src/libs/uploadLimitFileSize.js");

const QUALITY_MAX = 0.92;
const QUALITY_MIN = 0.3;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async canvas => {
  const uploadLimitVolume = await (0,_uploadLimitFileSize__WEBPACK_IMPORTED_MODULE_0__["default"])();
  let quality = QUALITY_MAX;
  let result = canvas.toDataURL("image/jpeg");
  if (result.length < uploadLimitVolume) return result;
  quality -= (QUALITY_MAX - QUALITY_MIN) / 2;
  for (let i = 0; i < 5; i++) {
    result = canvas.toDataURL("image/jpeg", quality);
    if (result.length <= uploadLimitVolume) {
      quality += (QUALITY_MAX - QUALITY_MIN) / Math.pow(2, i + 2);
    } else {
      quality -= (QUALITY_MAX - QUALITY_MIN) / Math.pow(2, i + 2);
    }
  }
  return result;
});

/***/ }),

/***/ "./src/libs/getTeams.ts":
/*!******************************!*\
  !*** ./src/libs/getTeams.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => {
  const endpoint = "https://gyazo.com/user/teams";
  const response = await window.fetch(endpoint, {
    method: "GET",
    credentials: "include"
  });
  const error = {
    status: response.status,
    message: chrome.i18n.getMessage("requireLoginTeams")
  };
  if (response.status === 403) return {
    error
  };
  const teams = await response.json();
  return {
    teams
  };
});

/***/ }),

/***/ "./src/libs/gyazoCaptureWithSize.ts":
/*!******************************************!*\
  !*** ./src/libs/gyazoCaptureWithSize.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MessageListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessageListener */ "./src/libs/MessageListener.ts");
/* harmony import */ var _canvasUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvasUtils */ "./src/libs/canvasUtils.js");
/* harmony import */ var _postToGyazo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./postToGyazo */ "./src/libs/postToGyazo.ts");
/* harmony import */ var _uploadLimitFileSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uploadLimitFileSize */ "./src/libs/uploadLimitFileSize.js");
/* harmony import */ var _waitForDelay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./waitForDelay */ "./src/libs/waitForDelay.js");
/* harmony import */ var _convertAdjustmentJpegQuality__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./convertAdjustmentJpegQuality */ "./src/libs/convertAdjustmentJpegQuality.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((...args) => {
  const [request,, sendResponse] = args;
  const baseCanvas = document.createElement("canvas");
  baseCanvas.height = request.data.h * request.data.z * request.data.s;
  baseCanvas.width = request.data.w * request.data.z * request.data.s;
  let lastLineWidth = null;
  const capture = async (scrollHeight = 0, scrollWidth = 0, lastImageBottom = 0, lastImageRight = 0, lastImageData = null) => {
    // If capture is finished, upload captured image
    if (scrollHeight >= request.data.h && scrollWidth + (request.tab?.width ?? 0) >= request.data.w) {
      if (request.tab.id) await chrome.tabs.executeScript(request.tab.id, {
        code: `new Promise((resolve) => {
              window.scrollTo(${request.data.positionX},${request.data.positionY});
              requestAnimationFrame(resolve);
            })`
      });
      await (0,_waitForDelay__WEBPACK_IMPORTED_MODULE_4__["default"])();
      let uploadImage = baseCanvas.toDataURL();
      const uploadLimitVolume = await (0,_uploadLimitFileSize__WEBPACK_IMPORTED_MODULE_3__["default"])();
      if (uploadImage.length > uploadLimitVolume) {
        uploadImage = await (0,_convertAdjustmentJpegQuality__WEBPACK_IMPORTED_MODULE_5__["default"])(baseCanvas);
      }
      baseCanvas.toBlob(blob => {
        (0,_postToGyazo__WEBPACK_IMPORTED_MODULE_2__["default"])(request.tab.id, {
          imageData: uploadImage,
          imageBlob: blob,
          title: request.data.t,
          url: request.data.u,
          width: request.data.w,
          height: request.data.h,
          scale: request.data.s,
          desc: request.data.desc
        });
      });
      return sendResponse();
    }
    if (scrollHeight >= request.data.h) {
      scrollHeight = 0;
      lastImageBottom = 0;
      if (scrollWidth + (request.tab.width ?? 0) * 2 >= request.data.w) {
        lastLineWidth = request.data.w - scrollWidth - (request.tab.width ?? 0);
        scrollWidth += lastLineWidth;
      } else {
        scrollWidth += request.tab.width ?? 0;
      }
    }
    const imagePositionTop = lastImageBottom || scrollHeight * request.data.z * request.data.s;
    const offsetTop = request.data.y - request.data.positionY;
    const imagePositionLeft = lastImageRight || scrollWidth * request.data.z * request.data.s;
    const offsetLeft = request.data.x - request.data.positionX;
    if (scrollHeight === 0 && offsetTop >= 0 && offsetTop + request.data.h <= (request.tab.height ?? 0) && scrollWidth === 0 && offsetLeft >= 0 && offsetLeft + request.data.w <= (request.tab.width ?? 0)) {
      // Capture in window (not require scroll)
      let captureData = null;
      try {
        // @ts-expect-error nullで大丈夫だけど型ではエラーになる
        captureData = await browser.tabs.captureVisibleTab(null, {
          format: "png"
        });
      } catch (e) {
        // noop
      }
      if (captureData === null) {
        return capture(scrollHeight, scrollWidth, lastImageBottom, lastImageRight, captureData);
      }
      if (lastImageData === captureData) {
        // retry
        return capture(scrollHeight, scrollWidth, lastImageBottom, lastImageRight, captureData);
      }
      const trimedImageCanvas = await (0,_canvasUtils__WEBPACK_IMPORTED_MODULE_1__.trimImage)({
        imageData: captureData,
        scale: request.data.s,
        zoom: request.data.z,
        startX: request.data.x - request.data.positionX,
        startY: offsetTop,
        width: request.data.w,
        height: Math.min(request.tab.height ?? 0, request.data.h - scrollHeight)
      });
      await (0,_canvasUtils__WEBPACK_IMPORTED_MODULE_1__.appendImageToCanvas)({
        canvas: baseCanvas,
        imageSrc: trimedImageCanvas.toDataURL(),
        height: Math.min(request.tab.height ?? 0, request.data.h - scrollHeight),
        width: request.data.w,
        top: 0,
        left: 0,
        scale: request.data.s,
        zoom: request.data.z
      });
      scrollHeight += request.tab.height ?? 0;
      capture(scrollHeight, scrollWidth);
      return;
    }
    let scrollToX = scrollWidth + request.data.x;
    const scrollToY = scrollHeight + request.data.y;
    if (scrollToX + (request.tab.width ?? 0) > request.data.documentWidth) {
      if ((request.tab.width ?? 0) === request.data.documentWidth) {
        scrollToX = 0;
      } else {
        scrollToX = scrollWidth + (scrollToX + (request.tab.width ?? 0) - request.data.documentWidth);
      }
    }
    if (request.tab.id) {
      await chrome.tabs.executeScript(request.tab.id, {
        code: `new Promise((resolve) => {
            function waitForScroll () {
              if (
                Math.abs(window.scrollX - ${scrollToX}) < 1 &&
                Math.abs(window.scrollY - ${scrollToY}) < 1
              ) {
                console.log("will end", Date.now(), performance.now());
                window.requestAnimationFrame(() => resolve('aaaaa'));
              } else {
                window.scrollTo(${scrollToX}, ${scrollToY});
                console.log(document.body.offsetHeight);
                window.requestAnimationFrame(() => waitForScroll());
              }
            };
            waitForScroll();
          })`
      });
    }
    await (0,_waitForDelay__WEBPACK_IMPORTED_MODULE_4__["default"])();
    let data = null;
    try {
      // @ts-expect-error nullでも大丈夫
      data = await browser.tabs.captureVisibleTab(null, {
        format: "png"
      });
    } catch (e) {
      // noop
    }
    if (data === null) {
      return capture(scrollHeight, scrollWidth, lastImageBottom, lastImageRight, data);
    }
    if (lastImageData === data) {
      // retry
      return capture(scrollHeight, scrollWidth, lastImageBottom, lastImageRight, data);
    }
    let startX = 0;
    let width = lastLineWidth || (request.tab.width ?? 0);
    if (lastLineWidth) {
      startX = (request.tab.width ?? 0) - lastLineWidth;
    } else if (scrollToX === 0) {
      startX = request.data.x;
      width -= request.data.x;
    }
    const trimedImageCanvas = await (0,_canvasUtils__WEBPACK_IMPORTED_MODULE_1__.trimImage)({
      imageData: data,
      scale: request.data.s,
      zoom: request.data.z,
      startX,
      startY: 0,
      width,
      height: Math.min(request.tab.height ?? 0, request.data.h - scrollHeight)
    });
    // eslint-disable-next-line prefer-const
    let [_lastImageBottom, _lastImageRight] = await (0,_canvasUtils__WEBPACK_IMPORTED_MODULE_1__.appendImageToCanvas)({
      canvas: baseCanvas,
      imageSrc: trimedImageCanvas.toDataURL(),
      height: Math.min(request.tab.height ?? 0, request.data.h - scrollHeight),
      width,
      top: imagePositionTop,
      left: imagePositionLeft,
      scale: request.data.s,
      zoom: request.data.z
    });
    scrollHeight += request.tab.height ?? 0;
    if (_lastImageBottom < request.data.h * request.data.s * request.data.z) {
      _lastImageRight = lastImageRight;
    }
    if (request.tab.id) {
      await (0,_MessageListener__WEBPACK_IMPORTED_MODULE_0__.sendMessageToContentScript)(request.tab.id, {
        target: "content",
        action: "changeFixedElementToAbsolute",
        tab: request.tab
      });
    }
    capture(scrollHeight, scrollWidth, _lastImageBottom, _lastImageRight, data);
  };
  capture();
});

/***/ }),

/***/ "./src/libs/gyazoIt.js":
/*!*****************************!*\
  !*** ./src/libs/gyazoIt.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _postToGyazo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./postToGyazo */ "./src/libs/postToGyazo.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((tab, srcUrl) => {
  if (srcUrl.match(/^data:/)) {
    fetch(srcUrl).then(res => {
      res.blob(blob => {
        (0,_postToGyazo__WEBPACK_IMPORTED_MODULE_0__["default"])(tab.id, {
          imageData: srcUrl,
          imageBlob: blob,
          title: tab.title,
          url: tab.url
        });
      });
    });
  } else {
    const xhr = new window.XMLHttpRequest();
    xhr.open("GET", srcUrl, true);
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let mineType = xhr.response.type;
        if (/png$/.test(srcUrl)) {
          mineType = "image/png";
        } else if (/jpe?g$/.test(srcUrl)) {
          mineType = "image/jpeg";
        } else if (/gif$/.test(srcUrl)) {
          mineType = "image/gif";
        } else if (/webp$/.test(srcUrl)) {
          mineType = "image/webp";
        }
        const blob = new window.Blob([xhr.response], {
          type: mineType
        });
        const fileReader = new FileReader();
        fileReader.onload = function () {
          (0,_postToGyazo__WEBPACK_IMPORTED_MODULE_0__["default"])(tab.id, {
            imageData: fileReader.result,
            imageBlob: blob,
            title: tab.title,
            url: tab.url
          });
        };
        fileReader.readAsDataURL(blob);
      }
    };
    xhr.send();
  }
});

/***/ }),

/***/ "./src/libs/oauth2/index.ts":
/*!**********************************!*\
  !*** ./src/libs/oauth2/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateAuthorizeUrl: () => (/* binding */ generateAuthorizeUrl),
/* harmony export */   getAccessToken: () => (/* binding */ getAccessToken),
/* harmony export */   getCode: () => (/* binding */ getCode),
/* harmony export */   upload: () => (/* binding */ upload)
/* harmony export */ });
const API_HOST = "https://api.gyazo.com";
const redirectUrl = "https://gyazo.com/oauth/onboarding/extension";
// pastakのGyazoアカウントに紐付いている、アプリケーション情報を使っている
const clientId = "qdHa0zMPj-m8lJ6Xz1zjN9NKVv7ZX8nIUt8wfWvd0cQ";
const clientSecret = "EsoxWFqiDzCLRcqCTQjX7Kxd-VGIMKel0QPe_fwtR3c";
const generateAuthorizeUrl = teamName => {
  const url = new URL(API_HOST + "/oauth/authorize");
  url.searchParams.append("client_id", clientId);
  url.searchParams.append("redirect_uri", redirectUrl);
  url.searchParams.append("response_type", "code");
  url.searchParams.append("scope", "upload");
  if (teamName != null) {
    url.searchParams.append("team", teamName);
  }
  return url;
};
const getCode = url => {
  const params = new URL(url).searchParams;
  const code = params.get("code");
  return code;
};
const getAccessToken = async code => {
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);
  params.append("redirect_uri", redirectUrl);
  params.append("code", code);
  params.append("grant_type", "authorization_code");
  const res = await fetch(API_HOST + "/oauth/token", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUrl,
      grant_type: "authorization_code",
      code
    })
  });
  const {
    access_token: accessToken
  } = await res.json();
  return accessToken;
};
const upload = async data => {
  const res = await fetch("https://upload.gyazo.com/api/v2/upload", {
    method: "POST",
    credentials: "include",
    body: data
  });
  return res.json();
};

/***/ }),

/***/ "./src/libs/permissions.js":
/*!*********************************!*\
  !*** ./src/libs/permissions.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   check: () => (/* binding */ check),
/* harmony export */   permissions: () => (/* binding */ permissions),
/* harmony export */   request: () => (/* binding */ request),
/* harmony export */   toggle: () => (/* binding */ toggle)
/* harmony export */ });
const permissions = {
  copyUrlToClipboard: {
    permissions: ["clipboardWrite"]
  }
};
const check = async permissions => {
  const res = await browser.permissions.contains(permissions);
  return res;
};
const request = async permissions => {
  const res = await browser.permissions.request(permissions);
  return res;
};
const toggle = async (permissions, state) => {
  if (state === undefined) {
    state = await check(permissions);
  }
  if (state) {
    const res = await browser.permissions.request(permissions);
    return res;
  } else {
    const res = await browser.permissions.remove(permissions);
    return res;
  }
};

/***/ }),

/***/ "./src/libs/postToGyazo.ts":
/*!*********************************!*\
  !*** ./src/libs/postToGyazo.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UploadNotification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UploadNotification */ "./src/libs/UploadNotification.ts");
/* harmony import */ var _saveToClipboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./saveToClipboard */ "./src/libs/saveToClipboard.js");
/* harmony import */ var _storageSwitcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storageSwitcher */ "./src/libs/storageSwitcher.js");
/* harmony import */ var _oauth2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./oauth2 */ "./src/libs/oauth2/index.ts");




const apiEndpoint = "https://upload.gyazo.com/api/upload/easy_auth";
const clientId = "df9edab530e84b4c56f9fcfa209aff1131c7d358a91d85cc20b9229e515d67dd";
const errorAlert = (status, message) => {
  window.alert("Status: " + status + "\n Error: " + message);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (tabId, data) => {
  const notification = new _UploadNotification__WEBPACK_IMPORTED_MODULE_0__["default"](tabId);
  notification.startUploading();
  const formdata = new window.FormData();
  formdata.append("client_id", clientId);
  formdata.append("title", data.title ?? "");
  formdata.append("scale", data.scale?.toString() ?? "");
  formdata.append("desc", data.desc ? data.desc.replace(/\t/, " ").replace(/(^\s+| +$)/gm, "") : "");
  const {
    accessToken
  } = await _storageSwitcher__WEBPACK_IMPORTED_MODULE_2__["default"].get({
    accessToken: null
  });
  if (accessToken && data.imageBlob) {
    data.url && formdata.append("url", data.url);
    formdata.append("imagedata", data.imageBlob);
    formdata.append("access_token", accessToken);
    const json = await (0,_oauth2__WEBPACK_IMPORTED_MODULE_3__.upload)(formdata);
    (0,_saveToClipboard__WEBPACK_IMPORTED_MODULE_1__["default"])(json.permalink_url);
    notification.finish(json.permalink_url, data.imageData, data.scale);
    return;
  }
  data.url && formdata.append("referer_url", data.url);
  formdata.append("image_url", data.imageData);
  if (false) {}
  const response = await window.fetch(apiEndpoint, {
    method: "POST",
    body: formdata,
    credentials: "include"
  });
  if (response.status >= 400) {
    errorAlert(response.status, response.statusText);
  }
  const _data = await response.json();
  // Use pure XHR for get XHR.responseURL
  const xhr = new window.XMLHttpRequest();
  xhr.open("GET", _data.get_image_url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 400) {
      errorAlert(xhr.status, xhr.statusText);
    }
    if (xhr.responseURL) {
      (0,_saveToClipboard__WEBPACK_IMPORTED_MODULE_1__["default"])(xhr.responseURL);
      notification.finish(xhr.responseURL, data.imageData, data.scale);
    }
  };
  xhr.send();
});

/***/ }),

/***/ "./src/libs/saveToClipboard.js":
/*!*************************************!*\
  !*** ./src/libs/saveToClipboard.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _permissions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./permissions */ "./src/libs/permissions.js");

/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(str) {
  const permissionCheck = await (0,_permissions__WEBPACK_IMPORTED_MODULE_0__.check)(_permissions__WEBPACK_IMPORTED_MODULE_0__.permissions.copyUrlToClipboard);
  if (!permissionCheck) return;
  const textArea = document.createElement("textarea");
  textArea.style.cssText = "position:absolute;left:-100%";
  document.body.appendChild(textArea);
  textArea.value = str;
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

/***/ }),

/***/ "./src/libs/storageSwitcher.js":
/*!*************************************!*\
  !*** ./src/libs/storageSwitcher.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const defaultOptions = {
  behavior: "area",
  contextMenu: true,
  fileSizeLimit: 2,
  team: {}
};
const ExtensionStorageWrapper = class ExtensionStorageWrapper {
  constructor() {
    // Firefox requires webextensions.storage.sync.enabled to true in about:config
    this.checkEnv = false;
    (async () => {
      const enabledSyncStorage = !!chrome.storage.sync && ((await this.tryToGetSyncStatus()()) || (await this.tryToSetSyncStatus()()));
      this.storageType = enabledSyncStorage ? "sync" : "local";
      this.checkEnv = true;
    })();
    this.onChanged = {
      addListener: (...args) => {
        this.addListener(...args);
      },
      removeListener: (...args) => {
        this.removeListener(...args);
      },
      hasListener: (...args) => {
        this.hasListener(...args);
      }
    };
  }
  tryToGetSyncStatus() {
    return async () => {
      let result = false;
      try {
        result = await browser.storage.sync.get("gyazo-extension-sync-storage-test");
      } catch {
        // no-op
      }
      return !!result;
    };
  }
  tryToSetSyncStatus() {
    return async () => {
      let result = false;
      try {
        await browser.storage.sync.set({
          "gyazo-extension-sync-storage-test": 1
        });
        result = true;
      } catch {
        // no-op
      }
      return !!result;
    };
  }
  waitForCheckEnv(f) {
    return new Promise(resolve => {
      const timerId = window.setInterval(async () => {
        if (!this.checkEnv) return;
        window.clearInterval(timerId);
        resolve(await f());
      }, 100);
    });
  }
  get storageObject() {
    return browser.storage[this.storageType];
  }
  get(defaultValue, ...args) {
    if (!defaultValue) defaultValue = defaultOptions;
    if (!this.checkEnv) return this.waitForCheckEnv(() => this.get(defaultValue, ...args));
    return this.storageObject.get(defaultValue, ...args);
  }
  set(...args) {
    if (!this.checkEnv) return this.waitForCheckEnv(() => this.set(...args));
    return this.storageObject.set(...args);
  }
  getBytesInUse(...args) {
    if (!this.checkEnv) return this.waitForCheckEnv(() => this.getBytesInUse(...args));
    return this.storageObject.getBytesInUse(...args);
  }
  remove(...args) {
    if (!this.checkEnv) return this.waitForCheckEnv(() => this.remove(...args));
    return this.storageObject.remove(...args);
  }
  clear(...args) {
    if (!this.checkEnv) return this.waitForCheckEnv(() => this.clear(...args));
    return this.storageObject.clear(...args);
  }
  addListener(...args) {
    if (!this.checkEnv) return this.waitForCheckEnv(() => this.addListener(...args));
    return chrome.storage.onChanged.addListener(...args);
  }
  removeListener(...args) {
    if (!this.checkEnv) return this.waitForCheckEnv(() => this.removeListener(...args));
    return chrome.storage.onChanged.removeListener(...args);
  }
  hasListener(...args) {
    if (!this.checkEnv) return this.waitForCheckEnv(() => this.hasListener(...args));
    return chrome.storage.onChanged.hasListener(...args);
  }
};
const storage = new ExtensionStorageWrapper();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (storage);

/***/ }),

/***/ "./src/libs/uploadLimitFileSize.js":
/*!*****************************************!*\
  !*** ./src/libs/uploadLimitFileSize.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _storageSwitcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storageSwitcher */ "./src/libs/storageSwitcher.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => {
  const {
    fileSizeLimit
  } = await _storageSwitcher__WEBPACK_IMPORTED_MODULE_0__["default"].get();
  return Number(fileSizeLimit) * 1024 * 1024 * (4 / 3); // Base64 data volume is 4/3 more than original data
});

/***/ }),

/***/ "./src/libs/waitForDelay.js":
/*!**********************************!*\
  !*** ./src/libs/waitForDelay.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => {
  // Force reflow on browser content
  // c.f. https://stackoverflow.com/questions/21664940
  const currentTab = (await browser.tabs.query({
    currentWindow: true,
    active: true
  }))[0];
  await browser.tabs.executeScript(currentTab.id, {
    code: "console.log(document.body.offsetHeight)"
  });
  await sleep(1000 / (chrome.tabs.MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND || 5));
});

/***/ }),

/***/ "./node_modules/webextension-polyfill/dist/browser-polyfill.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webextension-polyfill/dist/browser-polyfill.js ***!
  \*********************************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.9.0 - Fri Mar 25 2022 17:00:23 */

  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */

  /* vim: set sts=2 sw=2 et tw=80: */

  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (typeof globalThis != "object" || typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) {
    throw new Error("This script should only be loaded in a browser extension.");
  }

  if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
    const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)"; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.

    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            },
            "elements": {
              "createSidebarPane": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goBack": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goForward": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }
      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */


      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }

      }
      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */


      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };
      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */


      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";
      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */


      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.

                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;
                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({
                resolve,
                reject
              }, metadata));
            }
          });
        };
      };
      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */


      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }

        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */

      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },

          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.
              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else if (hasOwnProperty(metadata, "*")) {
              // Wrap all properties in * namespace.
              value = wrapObject(value, wrappers[prop], metadata["*"]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,

                get() {
                  return target[prop];
                },

                set(value) {
                  target[prop] = value;
                }

              });
              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }

            return true;
          },

          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }

        }; // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.

        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };
      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */


      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }

      });

      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */


        return function onRequestFinished(req) {
          const wrappedReq = wrapObject(req, {}
          /* wrappers */
          , {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          listener(wrappedReq);
        };
      }); // Keep track if the deprecation warning has been logged at least once.

      let loggedSendResponseDeprecationWarning = false;
      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */


        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;
          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              if (!loggedSendResponseDeprecationWarning) {
                console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                loggedSendResponseDeprecationWarning = true;
              }

              didCallSendResponse = true;
              resolve(response);
            };
          });
          let result;

          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }

          const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.

          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          } // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).


          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;

              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }

              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          }; // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.


          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          } // Let Chrome know that the listener is replying.


          return true;
        };
      });

      const wrappedSendMessageCallback = ({
        reject,
        resolve
      }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(new Error(extensionAPIs.runtime.lastError.message));
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };

      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }

        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, {
            resolve,
            reject
          });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };

      const staticWrappers = {
        devtools: {
          network: {
            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
          }
        },
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 1,
            maxArgs: 3
          })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 2,
            maxArgs: 3
          })
        }
      };
      const settingMetadata = {
        clear: {
          minArgs: 1,
          maxArgs: 1
        },
        get: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      };
      apiMetadata.privacy = {
        network: {
          "*": settingMetadata
        },
        services: {
          "*": settingMetadata
        },
        websites: {
          "*": settingMetadata
        }
      };
      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    }; // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.


    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = globalThis.browser;
  }
});
//# sourceMappingURL=browser-polyfill.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);

// @ts-expect-error globalThisを上書きしようとするとエラーになる
globalThis.browser = (webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default());
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _libs_MessageListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./libs/MessageListener */ "./src/libs/MessageListener.ts");
/* harmony import */ var _libs_gyazoIt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libs/gyazoIt */ "./src/libs/gyazoIt.js");
/* harmony import */ var _libs_changeTabEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./libs/changeTabEvents */ "./src/libs/changeTabEvents.js");
/* harmony import */ var _libs_gyazoCaptureWithSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./libs/gyazoCaptureWithSize */ "./src/libs/gyazoCaptureWithSize.ts");
/* harmony import */ var _libs_getTeams__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./libs/getTeams */ "./src/libs/getTeams.ts");
/* harmony import */ var _libs_storageSwitcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./libs/storageSwitcher */ "./src/libs/storageSwitcher.js");
/* harmony import */ var _libs_contextMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./libs/contextMenu */ "./src/libs/contextMenu.js");
/* harmony import */ var _libs_permissions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./libs/permissions */ "./src/libs/permissions.js");








const onMessageListener = new _libs_MessageListener__WEBPACK_IMPORTED_MODULE_0__["default"]("main");
chrome.browserAction.onClicked.addListener(async tab => {
  if (tab.url?.match(/chrome\.google\.com\/webstore\//)) {
    window.alert(chrome.i18n.getMessage("welcomeMessage"));
    return (0,_libs_changeTabEvents__WEBPACK_IMPORTED_MODULE_2__.disableButton)(tab.id);
  }
  await browser.tabs.insertCSS(tab.id, {
    file: "/menu.css"
  });
  if (chrome.runtime.lastError?.message?.match(/cannot be scripted/)) {
    window.alert("It is not allowed to use Gyazo extension in this page.");
    return (0,_libs_changeTabEvents__WEBPACK_IMPORTED_MODULE_2__.disableButton)(tab.id);
  }
  try {
    if (tab.id) await (0,_libs_MessageListener__WEBPACK_IMPORTED_MODULE_0__.sendMessageToContentScript)(tab.id, {
      target: "content",
      action: "insertMenu",
      tab: tab
    });
  } catch {
    chrome.runtime.lastError?.message?.match(/Could not establish connection/) && window.confirm(chrome.i18n.getMessage("confirmReload")) && tab.id && chrome.tabs.reload(tab.id);
  }
  chrome.runtime.lastError && chrome.runtime.lastError.message &&
  // @ts-expect-error numberが返ってくるブラウザもある
  chrome.runtime.lastError.number !== -2147467259 && !chrome.runtime.lastError.message.match(/message port closed/) && window.confirm(chrome.i18n.getMessage("confirmReload")) && tab.id && chrome.tabs.reload(tab.id);
});
onMessageListener.add("getTeam", async (_request, _sender, sendResponse) => {
  const {
    teams,
    error
  } = await (0,_libs_getTeams__WEBPACK_IMPORTED_MODULE_4__["default"])();
  if (error) return sendResponse({
    error
  });
  let team = teams[0] ?? {};
  const savedTeam = await _libs_storageSwitcher__WEBPACK_IMPORTED_MODULE_5__["default"].get({
    team: null
  });
  // Return team info if saved default team
  if (savedTeam.team) {
    team = teams.find(t => t.name === savedTeam.team.name) || team; // prevent undefined
  } else if (teams.length > 1) {
    // if haven't saved team info and logged in to more than 2 teams
    window.alert(chrome.i18n.getMessage("selectTeamToLogin"));
    chrome.tabs.create({
      url: chrome.runtime.getURL("option/options.html")
    });
    team = {};
  }
  _libs_storageSwitcher__WEBPACK_IMPORTED_MODULE_5__["default"].set({
    team
  });
  sendResponse({
    team
  });
});
onMessageListener.add("gyazoGetImageBlob", (request, sender, sendResponse) => {
  const xhr = new window.XMLHttpRequest();
  xhr.open("GET", request.gyazoUrl + "/raw", true);
  xhr.responseType = "arraybuffer";
  xhr.onload = () => {
    const blob = new window.Blob([xhr.response], {
      type: "image/png"
    });
    sendResponse({
      imageBlobUrl: window.URL.createObjectURL(blob)
    });
  };
  xhr.send();
});
onMessageListener.add("gyazoSendRawImage", request => {
  const data = request.data;
  (0,_libs_gyazoIt__WEBPACK_IMPORTED_MODULE_1__["default"])(request.tab, data.srcUrl);
});
onMessageListener.add("gyazoCaptureWithSize", _libs_gyazoCaptureWithSize__WEBPACK_IMPORTED_MODULE_3__["default"]);
browser.runtime.onMessage.addListener(
// @ts-expect-error XXX
onMessageListener.listen.bind(onMessageListener));
onMessageListener.add("requestPermissionCopyUrlToClipboard", async () => {
  try {
    await (0,_libs_permissions__WEBPACK_IMPORTED_MODULE_7__.request)(_libs_permissions__WEBPACK_IMPORTED_MODULE_7__.permissions.copyUrlToClipboard);
  } catch {
    chrome.tabs.create({
      url: chrome.runtime.getURL("option/options.html")
    });
  }
});
chrome.runtime.onInstalled.addListener(async details => {
  const {
    accessToken
  } = await _libs_storageSwitcher__WEBPACK_IMPORTED_MODULE_5__["default"].get("accessToken");
  if (details.reason == "install" && accessToken == null) {
    chrome.tabs.create({
      url: chrome.runtime.getURL("welcome/welcome.html")
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7QUFDeEQsSUFBSSxLQUFLLFlBUU47QUFDSCxDQUFDO0FBQ0Q7O0FBRUEsc0NBQXNDOztBQUV0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdTQUF3UztBQUN4UztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFVBQVU7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLEdBQUc7QUFDcEIsbUJBQW1CLFNBQVM7QUFDNUI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0VBQzNFO0FBQ0YsQ0FBQyxDQUFDO0FBRUYzUSxNQUFNLENBQUNELE9BQU8sQ0FBQ2lSLFdBQVcsQ0FBQ3hOLFdBQVcsQ0FBQyxNQUFPeU4sT0FBTyxJQUFLO0VBQ3hELE1BQU07SUFBRTFNO0VBQVksQ0FBQyxHQUFHLE1BQU14Qiw2REFBTyxDQUFDWSxHQUFHLENBQUMsYUFBYSxDQUFDO0VBRXhELElBQUlzTixPQUFPLENBQUNDLE1BQU0sSUFBSSxTQUFTLElBQUkzTSxXQUFXLElBQUksSUFBSSxFQUFFO0lBQ3REdkUsTUFBTSxDQUFDTCxJQUFJLENBQUNnRyxNQUFNLENBQUM7TUFBRTlCLEdBQUcsRUFBRTdELE1BQU0sQ0FBQ0QsT0FBTyxDQUFDNFEsTUFBTSxDQUFDLHNCQUFzQjtJQUFFLENBQUMsQ0FBQztFQUM1RTtBQUNGLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvbGlicy9NZXNzYWdlTGlzdGVuZXIudHMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvbGlicy9VcGxvYWROb3RpZmljYXRpb24udHMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvbGlicy9jYW52YXNVdGlscy5qcyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9saWJzL2NoYW5nZVRhYkV2ZW50cy5qcyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9saWJzL2NvbnRleHRNZW51LmpzIiwid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uLy4vc3JjL2xpYnMvY29udmVydEFkanVzdG1lbnRKcGVnUXVhbGl0eS5qcyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9saWJzL2dldFRlYW1zLnRzIiwid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uLy4vc3JjL2xpYnMvZ3lhem9DYXB0dXJlV2l0aFNpemUudHMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvbGlicy9neWF6b0l0LmpzIiwid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uLy4vc3JjL2xpYnMvb2F1dGgyL2luZGV4LnRzIiwid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uLy4vc3JjL2xpYnMvcGVybWlzc2lvbnMuanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvbGlicy9wb3N0VG9HeWF6by50cyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9saWJzL3NhdmVUb0NsaXBib2FyZC5qcyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9saWJzL3N0b3JhZ2VTd2l0Y2hlci5qcyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9saWJzL3VwbG9hZExpbWl0RmlsZVNpemUuanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvbGlicy93YWl0Rm9yRGVsYXkuanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9ub2RlX21vZHVsZXMvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsL2Rpc3QvYnJvd3Nlci1wb2x5ZmlsbC5qcyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uLy4vc3JjL3BvbHlmaWxscy50cyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIEJyb3dzZXIgZnJvbSBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiO1xuaW1wb3J0IGJyb3dzZXIgZnJvbSBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiO1xuZXhwb3J0IHR5cGUgRGF0YVVSTCA9IHN0cmluZyAmIHsgX19pZDogXCJEYXRhVVJMXCIgfTtcblxudHlwZSBDYXB0dXJlU2l6ZURhdGEgPSB7XG4gIGg6IG51bWJlcjtcbiAgdzogbnVtYmVyO1xuICB6OiBudW1iZXI7XG4gIHM6IG51bWJlcjtcbiAgdTogc3RyaW5nO1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgZG9jdW1lbnRXaWR0aDogbnVtYmVyO1xuICBwb3NpdGlvblg6IG51bWJlcjtcbiAgcG9zaXRpb25ZOiBudW1iZXI7XG4gIGRlZmF1bHRQb3NpdG9uPzogbnVtYmVyO1xuICB0OiBzdHJpbmc7XG4gIGRlc2M/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBDYXB0dXJpbmdEYXRhID0gQ2FwdHVyZVNpemVEYXRhICYge1xuICB0YWI6IEJyb3dzZXIuVGFicy5UYWIgfCB1bmRlZmluZWQ7XG4gIHNyY1VybDogc3RyaW5nO1xufTtcblxudHlwZSBDb250ZXh0cyA9IFwiY29udGVudFwiIHwgXCJtYWluXCI7XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2U8XG4gIEFjdGlvbiBleHRlbmRzIHN0cmluZyxcbiAgVGFyZ2V0Q29udGV4dCBleHRlbmRzIENvbnRleHRzLFxuICBPbWl0VGFiID0gZmFsc2Vcbj4gPSBPbWl0VGFiIGV4dGVuZHMgdHJ1ZVxuICA/IHtcbiAgICAgIHRhcmdldDogVGFyZ2V0Q29udGV4dDtcbiAgICAgIGFjdGlvbjogQWN0aW9uO1xuICAgIH1cbiAgOiB7XG4gICAgICB0YXJnZXQ6IFRhcmdldENvbnRleHQ7XG4gICAgICBhY3Rpb246IEFjdGlvbjtcbiAgICAgIHRhYjogQnJvd3Nlci5UYWJzLlRhYiB8IGNocm9tZS50YWJzLlRhYjtcbiAgICB9O1xuXG50eXBlIE1haW5IYW5kbGVycyA9IFJlYWRvbmx5PHtcbiAgZ2V0VGVhbTogTWVzc2FnZTxcImdldFRlYW1cIiwgXCJtYWluXCI+O1xuICBneWF6b0dldEltYWdlQmxvYjogTWVzc2FnZTxcImd5YXpvR2V0SW1hZ2VCbG9iXCIsIFwibWFpblwiLCB0cnVlPiAmIHtcbiAgICBneWF6b1VybDogc3RyaW5nO1xuICB9O1xuICBneWF6b1NlbmRSYXdJbWFnZTogTWVzc2FnZTxcImd5YXpvU2VuZFJhd0ltYWdlXCIsIFwibWFpblwiPiAmIHtcbiAgICBkYXRhOiB7IHNyY1VybDogc3RyaW5nIHwgbnVsbCB9O1xuICB9O1xuICBneWF6b0NhcHR1cmVXaXRoU2l6ZTogTWVzc2FnZTxcImd5YXpvQ2FwdHVyZVdpdGhTaXplXCIsIFwibWFpblwiPiAmIHtcbiAgICBkYXRhOiBDYXB0dXJlU2l6ZURhdGE7XG4gIH07XG4gIHJlcXVlc3RQZXJtaXNzaW9uQ29weVVybFRvQ2xpcGJvYXJkOiBNZXNzYWdlPFxuICAgIFwicmVxdWVzdFBlcm1pc3Npb25Db3B5VXJsVG9DbGlwYm9hcmRcIixcbiAgICBcIm1haW5cIixcbiAgICB0cnVlXG4gID47XG59PjtcblxudHlwZSBDb250ZW50SGFuZGxlcnMgPSBSZWFkb25seTx7XG4gIGNhcHR1cmVXaW5kb3c6IE1lc3NhZ2U8XCJjYXB0dXJlV2luZG93XCIsIFwiY29udGVudFwiPjtcbiAgbm90aWZpY2F0aW9uOiBNZXNzYWdlPFwibm90aWZpY2F0aW9uXCIsIFwiY29udGVudFwiLCB0cnVlPiAmXG4gICAgUGFydGlhbDx7XG4gICAgICB0aXRsZTogc3RyaW5nO1xuICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgaW1hZ2VQYWdlVXJsOiBzdHJpbmc7XG4gICAgICBpbWFnZVVybDogc3RyaW5nO1xuICAgICAgaXNGaW5pc2g6IGJvb2xlYW47XG4gICAgfT4gJlxuICAgIFBhcnRpYWw8eyBzY2FsZTogbnVtYmVyIH0+O1xuICBpbnNlcnRNZW51OiBNZXNzYWdlPFwiaW5zZXJ0TWVudVwiLCBcImNvbnRlbnRcIj47XG4gIGNoYW5nZUZpeGVkRWxlbWVudFRvQWJzb2x1dGU6IE1lc3NhZ2U8XG4gICAgXCJjaGFuZ2VGaXhlZEVsZW1lbnRUb0Fic29sdXRlXCIsXG4gICAgXCJjb250ZW50XCJcbiAgPjtcbiAgY2FwdHVyZVNlbGVjdEFyZWE6IE1lc3NhZ2U8XCJjYXB0dXJlU2VsZWN0QXJlYVwiLCBcImNvbnRlbnRcIj47XG4gIGNhcHR1cmVFbGVtZW50OiBNZXNzYWdlPFwiY2FwdHVyZUVsZW1lbnRcIiwgXCJjb250ZW50XCI+O1xuICBjYXB0dXJlV2hvbGVQYWdlOiBNZXNzYWdlPFwiY2FwdHVyZVdob2xlUGFnZVwiLCBcImNvbnRlbnRcIj47XG4gIHNuYXBPR1BJbWFnZTogTWVzc2FnZTxcInNuYXBPR1BJbWFnZVwiLCBcImNvbnRlbnRcIj47XG59PjtcblxuZXhwb3J0IHR5cGUgTWVzc2FnZUhhbmRsZXJNYXAgPSBNYWluSGFuZGxlcnMgJiBDb250ZW50SGFuZGxlcnM7XG5cbnR5cGUgU2VuZFJlc3BvbnNlQXJncyA9IFJlYWRvbmx5PHtcbiAgY2FwdHVyZVdpbmRvdzogbmV2ZXI7XG4gIGdldFRlYW06IFtcbiAgICB8IHtcbiAgICAgICAgdGVhbTogUmVhZG9ubHk8eyBuYW1lPzogc3RyaW5nIH0+O1xuICAgICAgfVxuICAgIHwge1xuICAgICAgICBlcnJvcjogUmVhZG9ubHk8e1xuICAgICAgICAgIHN0YXR1czogbnVtYmVyO1xuICAgICAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgfT47XG4gICAgICB9XG4gIF07XG4gIGd5YXpvR2V0SW1hZ2VCbG9iOiBbeyBpbWFnZUJsb2JVcmw6IHN0cmluZyB9XTtcbiAgZ3lhem9TZW5kUmF3SW1hZ2U6IG5ldmVyO1xuICBneWF6b0NhcHR1cmVXaXRoU2l6ZTogbmV2ZXI7XG4gIHJlcXVlc3RQZXJtaXNzaW9uQ29weVVybFRvQ2xpcGJvYXJkOiBuZXZlcjtcbiAgbm90aWZpY2F0aW9uOiBuZXZlcjtcbiAgaW5zZXJ0TWVudTogbmV2ZXI7XG4gIGNoYW5nZUZpeGVkRWxlbWVudFRvQWJzb2x1dGU6IG5ldmVyO1xuICBjYXB0dXJlU2VsZWN0QXJlYTogbmV2ZXI7XG4gIGNhcHR1cmVFbGVtZW50OiBuZXZlcjtcbiAgY2FwdHVyZVdob2xlUGFnZTogbmV2ZXI7XG4gIHNuYXBPR1BJbWFnZTogbmV2ZXI7XG59PjtcblxudHlwZSBBY3Rpb25OYW1lcyA9IGtleW9mIE1lc3NhZ2VIYW5kbGVyTWFwO1xudHlwZSBNZXNzYWdlcyA9IE1lc3NhZ2VIYW5kbGVyTWFwW0FjdGlvbk5hbWVzXTtcblxuZXhwb3J0IHR5cGUgTWVzc2FnZUhhbmRsZXI8S2V5IGV4dGVuZHMgQWN0aW9uTmFtZXM+ID0gKFxuICBtZXNzYWdlOiBPbWl0PE1lc3NhZ2VIYW5kbGVyTWFwW0tleV0sIFwidGFyZ2V0XCIgfCBcImFjdGlvblwiPixcbiAgc2VuZGVyOiBCcm93c2VyLlJ1bnRpbWUuTWVzc2FnZVNlbmRlcixcbiAgc2VuZFJlc3BvbnNlOiAoLi4uYXJnczogU2VuZFJlc3BvbnNlQXJnc1tLZXldKSA9PiB2b2lkXG4pID0+IHZvaWQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VMaXN0ZW5lcjxDb250ZXh0IGV4dGVuZHMgQ29udGV4dHM+IHtcbiAgbmFtZTogQ29udGV4dDtcbiAgbGlzdGVuZXJzOiB7XG4gICAgW0tleSBpbiBBY3Rpb25OYW1lc10/OiBBcnJheTxNZXNzYWdlSGFuZGxlcjxLZXk+PjtcbiAgfTtcbiAgY29uc3RydWN0b3IobmFtZTogQ29udGV4dCkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcbiAgfVxuICBhZGQ8QWN0aW9uIGV4dGVuZHMgQWN0aW9uTmFtZXM+KFxuICAgIGFjdGlvbjogQWN0aW9uLFxuICAgIGZ1bmM6IE1lc3NhZ2VIYW5kbGVyPEFjdGlvbj5cbiAgKSB7XG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1thY3Rpb25dKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyc1thY3Rpb25dID0gW107XG4gICAgfVxuICAgIHRoaXMubGlzdGVuZXJzW2FjdGlvbl0/LnB1c2goZnVuYyk7XG4gIH1cblxuICBsaXN0ZW4oXG4gICAgeyBhY3Rpb24sIHRhcmdldCwgLi4ubWVzc2FnZSB9OiBNZXNzYWdlcyxcbiAgICBzZW5kZXI6IEJyb3dzZXIuUnVudGltZS5NZXNzYWdlU2VuZGVyLFxuICAgIHNlbmRSZXNwb25zZTogKGFyZ3M6IHVua25vd24pID0+IHZvaWRcbiAgKSB7XG4gICAgaWYgKHRoaXMubmFtZSAmJiB0aGlzLm5hbWUgIT09IHRhcmdldCkgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbYWN0aW9uXTtcbiAgICBpZiAobGlzdGVuZXJzICYmIGxpc3RlbmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIO+8k+OBpOOBrkNvbnRleHTjgYzmj4PjgYbjgb7jgafjga9tZXNzYWdl44Gu5Z6L44GM44Ko44Op44O844Gr44Gq44KLXG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgoZnVuYykgPT4gZnVuYyhtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG4vKipcbiAqIHRhYnMuc2VuZE1lc3NhZ2Xjga7jg6njg4Pjg5Hjg7xcbiAqIGNvbnRlbnRTY3JpcHTlkJHjgZHjga7jg6Hjg4Pjgrvjg7zjgrjjgpLpgIHkv6HjgZnjgotcbiAqL1xuZXhwb3J0IGNvbnN0IHNlbmRNZXNzYWdlVG9Db250ZW50U2NyaXB0ID0gZnVuY3Rpb24gPFxuICBBIGV4dGVuZHMga2V5b2YgQ29udGVudEhhbmRsZXJzXG4+KGlkOiBudW1iZXIsIG1lc3NhZ2U6IENvbnRlbnRIYW5kbGVyc1tBXSwgY2FsbGJhY2s/OiAoKSA9PiB2b2lkKSB7XG4gIGNvbnN0IHAgPSBicm93c2VyLnRhYnMuc2VuZE1lc3NhZ2UoaWQsIG1lc3NhZ2UpO1xuICBpZiAoIXApIHJldHVybjtcbiAgcC50aGVuKCgpID0+IHtcbiAgICBjYWxsYmFjaz8uKCk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBydW50aW1lLnNlbmRNZXNzYWdl44Gu44Op44OD44OR44O8XG4gKiBtYWluU2NyaXB05ZCR44GR44Gu44Oh44OD44K744O844K444KS6YCB5L+h44GZ44KLXG4gKi9cbmV4cG9ydCBjb25zdCBzZW5kTWVzc2FnZVRvTWFpblNjcmlwdCA9IGZ1bmN0aW9uIDxBIGV4dGVuZHMga2V5b2YgTWFpbkhhbmRsZXJzPihcbiAgaWQ6IHN0cmluZyxcbiAgbWVzc2FnZTogTWFpbkhhbmRsZXJzW0FdLFxuICBjYWxsYmFjaz86ICgpID0+IHZvaWRcbikge1xuICBjb25zdCBwID0gYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKGlkLCBtZXNzYWdlKTtcbiAgcC50aGVuKCgpID0+IHtcbiAgICBjYWxsYmFjaz8uKCk7XG4gIH0pO1xuICByZXR1cm4gcDtcbn07XG4iLCJpbXBvcnQgYnJvd3NlckluZm8gZnJvbSBcImJvd3NlclwiO1xuaW1wb3J0IHsgc2VuZE1lc3NhZ2VUb0NvbnRlbnRTY3JpcHQgfSBmcm9tIFwiLi9NZXNzYWdlTGlzdGVuZXJcIjtcbmltcG9ydCBjaHJvbWUgZnJvbSBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWROb3RpZmljYXRpb24ge1xuICB0YWJJZDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBjb25zdHJ1Y3Rvcih0YWJJZDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy50YWJJZCA9IHRhYklkO1xuICB9XG5cbiAgc3RhcnRVcGxvYWRpbmcoKSB7XG4gICAgaWYgKCF0aGlzLnRhYklkKSByZXR1cm47XG5cbiAgICBzZW5kTWVzc2FnZVRvQ29udGVudFNjcmlwdCh0aGlzLnRhYklkLCB7XG4gICAgICB0YXJnZXQ6IFwiY29udGVudFwiLFxuICAgICAgYWN0aW9uOiBcIm5vdGlmaWNhdGlvblwiLFxuICAgICAgbWVzc2FnZTogXCJcIixcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmlzaChpbWFnZVBhZ2VVcmw6IHN0cmluZywgaW1hZ2VEYXRhVXJsOiBzdHJpbmcsIHNjYWxlPzogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLnRhYklkKSByZXR1cm47XG5cbiAgICBzZW5kTWVzc2FnZVRvQ29udGVudFNjcmlwdCh0aGlzLnRhYklkLCB7XG4gICAgICB0YXJnZXQ6IFwiY29udGVudFwiLFxuICAgICAgYWN0aW9uOiBcIm5vdGlmaWNhdGlvblwiLFxuICAgICAgdGl0bGU6IGNocm9tZS5pMThuLmdldE1lc3NhZ2UoXCJ1cGxvYWRpbmdGaW5pc2hUaXRsZVwiKSxcbiAgICAgIGltYWdlUGFnZVVybCxcbiAgICAgIGltYWdlVXJsOiBpbWFnZURhdGFVcmwsXG4gICAgICBzY2FsZSxcbiAgICAgIGlzRmluaXNoOiB0cnVlLFxuICAgIH0pO1xuICB9XG59XG4iLCJmdW5jdGlvbiBpbWFnZUxvYWRlcihpbWdTcmMsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGltZyA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjYWxsYmFjayhpbWcpO1xuICB9O1xuICBpbWcuc3JjID0gaW1nU3JjO1xufVxuXG5leHBvcnQgY29uc3QgYXBwZW5kSW1hZ2VUb0NhbnZhcyA9IChhcmdPYmopID0+XG4gIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3Qgc2NhbGUgPSBhcmdPYmouc2NhbGUgfHwgMS4wO1xuICAgIGNvbnN0IHpvb20gPSBhcmdPYmouem9vbSB8fCAxLjA7XG4gICAgY29uc3QgeyBjYW52YXMsIHdpZHRoLCB0b3AsIGxlZnQsIGhlaWdodCwgaW1hZ2VTcmMgfSA9IGFyZ09iajtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGltYWdlTG9hZGVyKGltYWdlU3JjLCBmdW5jdGlvbiAoaW1nKSB7XG4gICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICBpbWcsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIHdpZHRoICogc2NhbGUgKiB6b29tLFxuICAgICAgICBoZWlnaHQgKiBzY2FsZSAqIHpvb20sXG4gICAgICAgIGxlZnQsXG4gICAgICAgIHRvcCxcbiAgICAgICAgaW1nLndpZHRoLFxuICAgICAgICBpbWcuaGVpZ2h0XG4gICAgICApO1xuICAgICAgY29uc3QgbGFzdEltYWdlQm90dG9tID0gdG9wICsgaW1nLmhlaWdodDtcbiAgICAgIGNvbnN0IGxhc3RJbWFnZVJpZ2h0ID0gbGVmdCArIGltZy53aWR0aDtcbiAgICAgIHJlc29sdmUoW2xhc3RJbWFnZUJvdHRvbSwgbGFzdEltYWdlUmlnaHRdKTtcbiAgICB9KTtcbiAgfSk7XG5cbmV4cG9ydCBjb25zdCB0cmltSW1hZ2UgPSAoYXJnT2JqKSA9PlxuICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNvbnN0IHNjYWxlID0gYXJnT2JqLnNjYWxlIHx8IDEuMDtcbiAgICBjb25zdCB6b29tID0gYXJnT2JqLnpvb20gfHwgMS4wO1xuICAgIGNvbnN0IHsgaW1hZ2VEYXRhIH0gPSBhcmdPYmo7XG4gICAgbGV0IHN0YXJ0WCA9IGFyZ09iai5zdGFydFggKiB6b29tICogc2NhbGU7XG4gICAgbGV0IHN0YXJ0WSA9IGFyZ09iai5zdGFydFkgKiB6b29tICogc2NhbGU7XG4gICAgbGV0IHdpZHRoID0gYXJnT2JqLndpZHRoICogem9vbSAqIHNjYWxlO1xuICAgIGxldCBoZWlnaHQgPSBhcmdPYmouaGVpZ2h0ICogem9vbSAqIHNjYWxlO1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGlmICh0eXBlb2YgaW1hZ2VEYXRhID09PSBcInN0cmluZ1wiICYmIGltYWdlRGF0YS5zdWJzdHIoMCwgNSkgPT09IFwiZGF0YTpcIikge1xuICAgICAgaW1hZ2VMb2FkZXIoaW1hZ2VEYXRhLCBmdW5jdGlvbiAoaW1nKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCBzdGFydFgsIHN0YXJ0WSwgd2lkdGgsIGhlaWdodCwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHJlc29sdmUoY2FudmFzKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGltYWdlRGF0YSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgLy8gbWF5YmUgPGNhbnZhcz5cbiAgICAgIGNvbnN0IG9yaWdpbmFsV2lkdGggPSB3aWR0aDtcbiAgICAgIGNvbnN0IG9yaWdpbmFsSGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgc3RhcnRYICo9IHNjYWxlO1xuICAgICAgc3RhcnRZICo9IHNjYWxlO1xuICAgICAgaGVpZ2h0ICo9IHNjYWxlICogem9vbTtcbiAgICAgIHdpZHRoICo9IHNjYWxlICogem9vbTtcbiAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgIGltYWdlRGF0YSxcbiAgICAgICAgc3RhcnRYLFxuICAgICAgICBzdGFydFksXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIG9yaWdpbmFsV2lkdGgsXG4gICAgICAgIG9yaWdpbmFsSGVpZ2h0XG4gICAgICApO1xuICAgICAgcmVzb2x2ZShjYW52YXMpO1xuICAgIH1cbiAgfSk7XG4iLCJpbXBvcnQgeyBnZXRDb2RlLCBnZXRBY2Nlc3NUb2tlbiB9IGZyb20gXCIuL29hdXRoMlwiO1xuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVN3aXRjaGVyXCI7XG5cbmNvbnN0IGRpc2FibGVCdXR0b24gPSBmdW5jdGlvbiAodGFiSWQpIHtcbiAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgcGF0aDoge1xuICAgICAgMTk6IFwiL2ljb25zLzE5X2Rpc2FibGUucG5nXCIsXG4gICAgICAzODogXCIvaWNvbnMvMTlfZGlzYWJsZUAyeC5wbmdcIixcbiAgICB9LFxuICB9KTtcbiAgY2hyb21lLmJyb3dzZXJBY3Rpb24uZGlzYWJsZSh0YWJJZCk7XG59O1xuXG5jb25zdCBlbmFibGVCdXR0b24gPSBmdW5jdGlvbiAodGFiSWQpIHtcbiAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgcGF0aDoge1xuICAgICAgMTk6IFwiL2ljb25zLzE5LnBuZ1wiLFxuICAgICAgMzg6IFwiL2ljb25zLzE5QDJ4LnBuZ1wiLFxuICAgIH0sXG4gIH0pO1xuICBjaHJvbWUuYnJvd3NlckFjdGlvbi5lbmFibGUodGFiSWQpO1xufTtcblxuY2hyb21lLnRhYnMub25BY3RpdmF0ZWQuYWRkTGlzdGVuZXIoYXN5bmMgKGFjdGl2ZUluZm8pID0+IHtcbiAgY29uc3QgdGFiID0gYXdhaXQgYnJvd3Nlci50YWJzLmdldChhY3RpdmVJbmZvLnRhYklkKTtcbiAgaWYgKHRhYi5zdGF0dXMgPT09IFwibG9hZGluZ1wiKSB7XG4gICAgcmV0dXJuIGRpc2FibGVCdXR0b24odGFiLmlkKTtcbiAgfVxuICBpZiAodGFiLnVybCAmJiB0YWIudXJsLm1hdGNoKC9eaHR0cHM/Oi8pKSB7XG4gICAgZW5hYmxlQnV0dG9uKHRhYi5pZCk7XG4gIH0gZWxzZSB7XG4gICAgZGlzYWJsZUJ1dHRvbih0YWIuaWQpO1xuICB9XG59KTtcblxuY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKGFzeW5jICh0YWJJZCwgY2hhbmdlSW5mbykgPT4ge1xuICBpZiAoY2hhbmdlSW5mby5zdGF0dXMgPT09IFwibG9hZGluZ1wiKSB7XG4gICAgZGlzYWJsZUJ1dHRvbih0YWJJZCk7XG4gIH0gZWxzZSBpZiAoY2hhbmdlSW5mby5zdGF0dXMgPT09IFwiY29tcGxldGVcIikge1xuICAgIGNvbnN0IHRhYiA9IGF3YWl0IGJyb3dzZXIudGFicy5nZXQodGFiSWQpO1xuICAgIGlmICghdGFiLnVybCkgcmV0dXJuO1xuICAgIGlmICghdGFiLnVybC5tYXRjaCgvXmh0dHBzPzovKSkge1xuICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgIFwiVGhpcyBFeHRlbnNpb24gY2FuIHJ1biBvbmx5IG9uIGh0dHBzPyBwYWdlczogXCIgKyBsb2NhdGlvbi5ocmVmXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGFiLnVybC5zdGFydHNXaXRoKFwiaHR0cHM6Ly9neWF6by5jb20vb2F1dGgvb25ib2FyZGluZy9leHRlbnNpb25cIikpIHtcbiAgICAgIGNvbnN0IGNvZGUgPSBnZXRDb2RlKHRhYi51cmwpO1xuICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCBnZXRBY2Nlc3NUb2tlbihjb2RlKTtcbiAgICAgICAgc3RvcmFnZS5zZXQoeyBhY2Nlc3NUb2tlbiB9KTtcbiAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHRhYklkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGVycm9yXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGxvYWRlZCA9IFtmYWxzZV07XG4gICAgdHJ5IHtcbiAgICAgIGxvYWRlZCA9IGF3YWl0IGJyb3dzZXIudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XG4gICAgICAgIGNvZGU6IFwid2luZG93Ll9fZW1iZWRlZEd5YXpvQ29udGVudEpTXCIsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBuby1vcFxuICAgIH1cbiAgICBpZiAobG9hZGVkWzBdKSByZXR1cm4gZW5hYmxlQnV0dG9uKHRhYklkKTtcbiAgICBhd2FpdCBicm93c2VyLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCwge1xuICAgICAgZmlsZTogXCIuL2NvbnRlbnQuanNcIixcbiAgICB9KTtcbiAgICBhd2FpdCBicm93c2VyLnRhYnMuaW5zZXJ0Q1NTKHRhYklkLCB7XG4gICAgICBmaWxlOiBcIi9jb250ZW50LmNzc1wiLFxuICAgIH0pO1xuICAgIGVuYWJsZUJ1dHRvbih0YWJJZCk7XG4gIH1cbn0pO1xuXG5leHBvcnQgeyBlbmFibGVCdXR0b24sIGRpc2FibGVCdXR0b24gfTtcbiIsImltcG9ydCBNZXNzYWdlTGlzdGVuZXIsIHsgc2VuZE1lc3NhZ2VUb0NvbnRlbnRTY3JpcHQgfSBmcm9tIFwiLi9NZXNzYWdlTGlzdGVuZXJcIjtcbmltcG9ydCBneWF6b0l0IGZyb20gXCIuL2d5YXpvSXRcIjtcbmltcG9ydCBzdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2VTd2l0Y2hlclwiO1xuXG5jb25zdCBvbkNvbnRleHRNZW51Q2xpY2tMaXN0ZW5lciA9IG5ldyBNZXNzYWdlTGlzdGVuZXIoXCJjb250ZXh0bWVudVwiKTtcblxuY2hyb21lLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoKGluZm8sIHRhYikgPT4ge1xuICBjaHJvbWUudGFicy5pbnNlcnRDU1ModGFiLmlkLCB7XG4gICAgZmlsZTogXCIvbWVudS5jc3NcIixcbiAgfSk7XG4gIG9uQ29udGV4dE1lbnVDbGlja0xpc3RlbmVyLmxpc3Rlbih7XG4gICAgdGFyZ2V0OiBcImNvbnRleHRtZW51XCIsXG4gICAgYWN0aW9uOiBpbmZvLm1lbnVJdGVtSWQsXG4gICAgaW5mbyxcbiAgICB0YWIsXG4gIH0pO1xufSk7XG5cbm9uQ29udGV4dE1lbnVDbGlja0xpc3RlbmVyLmFkZChcImd5YXpvSXRcIiwgKHsgaW5mbywgdGFiIH0pID0+IHtcbiAgZ3lhem9JdCh0YWIsIGluZm8uc3JjVXJsKTtcbn0pO1xuXG5vbkNvbnRleHRNZW51Q2xpY2tMaXN0ZW5lci5hZGQoXCJjYXB0dXJlU2VsZWN0RWxlbWVudFwiLCAoeyB0YWIgfSkgPT4ge1xuICBzZW5kTWVzc2FnZVRvQ29udGVudFNjcmlwdCh0YWIuaWQsIHtcbiAgICB0YXJnZXQ6IFwiY29udGVudFwiLFxuICAgIGFjdGlvbjogXCJjYXB0dXJlRWxlbWVudFwiLFxuICAgIHRhYixcbiAgfSk7XG59KTtcblxub25Db250ZXh0TWVudUNsaWNrTGlzdGVuZXIuYWRkKFwiY2FwdHVyZVdpbmRvd1wiLCAoeyB0YWIgfSkgPT4ge1xuICBzZW5kTWVzc2FnZVRvQ29udGVudFNjcmlwdCh0YWIuaWQsIHtcbiAgICB0YXJnZXQ6IFwiY29udGVudFwiLFxuICAgIGFjdGlvbjogXCJjYXB0dXJlV2luZG93XCIsXG4gICAgdGFiLFxuICB9KTtcbn0pO1xuXG5vbkNvbnRleHRNZW51Q2xpY2tMaXN0ZW5lci5hZGQoXCJjYXB0dXJlU2VsZWN0QXJlYVwiLCAoeyB0YWIgfSkgPT4ge1xuICBzZW5kTWVzc2FnZVRvQ29udGVudFNjcmlwdCh0YWIuaWQsIHtcbiAgICB0YXJnZXQ6IFwiY29udGVudFwiLFxuICAgIGFjdGlvbjogXCJjYXB0dXJlU2VsZWN0QXJlYVwiLFxuICAgIHRhYixcbiAgfSk7XG59KTtcblxub25Db250ZXh0TWVudUNsaWNrTGlzdGVuZXIuYWRkKFwiY2FwdHVyZVdob2xlUGFnZVwiLCAoeyB0YWIgfSkgPT4ge1xuICBzZW5kTWVzc2FnZVRvQ29udGVudFNjcmlwdCh0YWIuaWQsIHtcbiAgICB0YXJnZXQ6IFwiY29udGVudFwiLFxuICAgIGFjdGlvbjogXCJjYXB0dXJlV2hvbGVQYWdlXCIsXG4gICAgdGFiLFxuICB9KTtcbn0pO1xuXG5jb25zdCBjaGVja0NvbnRleHRNZW51RW5hYmxlZCA9IGFzeW5jICgpID0+IHtcbiAgbGV0IGNvbnRleHRNZW51RW5hYmxlZCA9IHRydWU7XG4gIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgc3RvcmFnZS5nZXQoeyBjb250ZXh0TWVudTogdHJ1ZSB9KTtcblxuICBjb250ZXh0TWVudUVuYWJsZWQgPSBzZXR0aW5ncy5jb250ZXh0TWVudTtcblxuICBpZiAoIWNvbnRleHRNZW51RW5hYmxlZCkge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBicm93c2VyLmNvbnRleHRNZW51cy5yZW1vdmVBbGwoKTtcbiAgICAgIGF3YWl0IGJyb3dzZXIuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgICAgIHRpdGxlOiBjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKFwiY29udGV4dE1lbnVJbWFnZVwiKSxcbiAgICAgICAgaWQ6IFwiZ3lhem9JdFwiLFxuICAgICAgICBjb250ZXh0czogW1wiaW1hZ2VcIl0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIG5vLW9wXG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICB0cnkge1xuICAgIGF3YWl0IGJyb3dzZXIuY29udGV4dE1lbnVzLnJlbW92ZUFsbCgpO1xuICAgIGF3YWl0IGJyb3dzZXIuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgICB0aXRsZTogY2hyb21lLmkxOG4uZ2V0TWVzc2FnZShcImNhcHR1cmVQYXJlbnRUaXRsZVwiKSxcbiAgICAgIGlkOiBcImNhcHR1cmVQYXJlbnRcIixcbiAgICAgIGNvbnRleHRzOiBbXCJhbGxcIl0sXG4gICAgfSk7XG4gICAgYXdhaXQgYnJvd3Nlci5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICAgIHBhcmVudElkOiBcImNhcHR1cmVQYXJlbnRcIixcbiAgICAgIHRpdGxlOiBjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKFwidGhpc0ltYWdlXCIpLFxuICAgICAgaWQ6IFwiZ3lhem9JdFwiLFxuICAgICAgY29udGV4dHM6IFtcImltYWdlXCJdLFxuICAgIH0pO1xuICAgIGF3YWl0IGJyb3dzZXIuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgICBwYXJlbnRJZDogXCJjYXB0dXJlUGFyZW50XCIsXG4gICAgICBpZDogXCJneWF6b0NvbnRleHRNZW51U2VwYXJhdG9yXCIsXG4gICAgICB0eXBlOiBcInNlcGFyYXRvclwiLFxuICAgICAgY29udGV4dHM6IFtcImltYWdlXCJdLFxuICAgIH0pO1xuICAgIGF3YWl0IGJyb3dzZXIuY29udGV4dE1lbnVzLmNyZWF0ZSh7XG4gICAgICBwYXJlbnRJZDogXCJjYXB0dXJlUGFyZW50XCIsXG4gICAgICBpZDogXCJjYXB0dXJlU2VsZWN0RWxlbWVudFwiLFxuICAgICAgdGl0bGU6IGNocm9tZS5pMThuLmdldE1lc3NhZ2UoXCJzZWxlY3RFbGVtZW50XCIpLFxuICAgICAgY29udGV4dHM6IFtcImFsbFwiXSxcbiAgICB9KTtcbiAgICBhd2FpdCBicm93c2VyLmNvbnRleHRNZW51cy5jcmVhdGUoe1xuICAgICAgcGFyZW50SWQ6IFwiY2FwdHVyZVBhcmVudFwiLFxuICAgICAgaWQ6IFwiY2FwdHVyZVNlbGVjdEFyZWFcIixcbiAgICAgIHRpdGxlOiBjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKFwic2VsZWN0QXJlYVwiKSxcbiAgICAgIGNvbnRleHRzOiBbXCJhbGxcIl0sXG4gICAgfSk7XG4gICAgYXdhaXQgYnJvd3Nlci5jb250ZXh0TWVudXMuY3JlYXRlKHtcbiAgICAgIHBhcmVudElkOiBcImNhcHR1cmVQYXJlbnRcIixcbiAgICAgIGlkOiBcImNhcHR1cmVXaW5kb3dcIixcbiAgICAgIHRpdGxlOiBjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKFwiY2FwdHVyZVdpbmRvd1wiKSxcbiAgICAgIGNvbnRleHRzOiBbXCJhbGxcIl0sXG4gICAgfSk7XG4gICAgY2hyb21lLmNvbnRleHRNZW51cy5jcmVhdGUoe1xuICAgICAgcGFyZW50SWQ6IFwiY2FwdHVyZVBhcmVudFwiLFxuICAgICAgaWQ6IFwiY2FwdHVyZVdob2xlUGFnZVwiLFxuICAgICAgdGl0bGU6IGNocm9tZS5pMThuLmdldE1lc3NhZ2UoXCJ0b3BUb0JvdHRvbVwiKSxcbiAgICAgIGNvbnRleHRzOiBbXCJhbGxcIl0sXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoIWUubWVzc2FnZS5tYXRjaChcImR1cGxpY2F0ZSBpZFwiKSkgY29uc29sZS5lcnJvcihlKTtcbiAgfVxufTtcblxuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoXG4gIGNoZWNrQ29udGV4dE1lbnVFbmFibGVkLmJpbmQoY2hlY2tDb250ZXh0TWVudUVuYWJsZWQpXG4pO1xuY2hlY2tDb250ZXh0TWVudUVuYWJsZWQoKTtcbiIsImltcG9ydCB1cGxvYWRMaW1pdEZpbGVTaXplIGZyb20gXCIuL3VwbG9hZExpbWl0RmlsZVNpemVcIjtcblxuY29uc3QgUVVBTElUWV9NQVggPSAwLjkyO1xuY29uc3QgUVVBTElUWV9NSU4gPSAwLjM7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChjYW52YXMpID0+IHtcbiAgY29uc3QgdXBsb2FkTGltaXRWb2x1bWUgPSBhd2FpdCB1cGxvYWRMaW1pdEZpbGVTaXplKCk7XG4gIGxldCBxdWFsaXR5ID0gUVVBTElUWV9NQVg7XG4gIGxldCByZXN1bHQgPSBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvanBlZ1wiKTtcbiAgaWYgKHJlc3VsdC5sZW5ndGggPCB1cGxvYWRMaW1pdFZvbHVtZSkgcmV0dXJuIHJlc3VsdDtcbiAgcXVhbGl0eSAtPSAoUVVBTElUWV9NQVggLSBRVUFMSVRZX01JTikgLyAyO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgcmVzdWx0ID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL2pwZWdcIiwgcXVhbGl0eSk7XG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPD0gdXBsb2FkTGltaXRWb2x1bWUpIHtcbiAgICAgIHF1YWxpdHkgKz0gKFFVQUxJVFlfTUFYIC0gUVVBTElUWV9NSU4pIC8gTWF0aC5wb3coMiwgaSArIDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBxdWFsaXR5IC09IChRVUFMSVRZX01BWCAtIFFVQUxJVFlfTUlOKSAvIE1hdGgucG93KDIsIGkgKyAyKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBhc3luYyAoKTogUHJvbWlzZTxcbiAgfCB7XG4gICAgICB0ZWFtczogUmVhZG9ubHk8eyBuYW1lPzogc3RyaW5nIH0+W107XG4gICAgICBlcnJvcj86IHVuZGVmaW5lZDtcbiAgICB9XG4gIHwge1xuICAgICAgdGVhbXM/OiB1bmRlZmluZWQ7XG4gICAgICBlcnJvcjogUmVhZG9ubHk8e1xuICAgICAgICBzdGF0dXM6IG51bWJlcjtcbiAgICAgICAgbWVzc2FnZTogc3RyaW5nO1xuICAgICAgfT47XG4gICAgfVxuPiA9PiB7XG4gIGNvbnN0IGVuZHBvaW50ID0gXCJodHRwczovL2d5YXpvLmNvbS91c2VyL3RlYW1zXCI7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgd2luZG93LmZldGNoKGVuZHBvaW50LCB7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgfSk7XG4gIGNvbnN0IGVycm9yID0ge1xuICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgIG1lc3NhZ2U6IGNocm9tZS5pMThuLmdldE1lc3NhZ2UoXCJyZXF1aXJlTG9naW5UZWFtc1wiKSxcbiAgfTtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSByZXR1cm4geyBlcnJvciB9O1xuICBjb25zdCB0ZWFtcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIHsgdGVhbXMgfTtcbn07XG4iLCJpbXBvcnQge1xuICBEYXRhVVJMLFxuICBNZXNzYWdlSGFuZGxlcixcbiAgc2VuZE1lc3NhZ2VUb0NvbnRlbnRTY3JpcHQsXG59IGZyb20gXCIuL01lc3NhZ2VMaXN0ZW5lclwiO1xuaW1wb3J0IHsgdHJpbUltYWdlLCBhcHBlbmRJbWFnZVRvQ2FudmFzIH0gZnJvbSBcIi4vY2FudmFzVXRpbHNcIjtcbmltcG9ydCBwb3N0VG9HeWF6byBmcm9tIFwiLi9wb3N0VG9HeWF6b1wiO1xuaW1wb3J0IHVwbG9hZExpbWl0RmlsZVNpemUgZnJvbSBcIi4vdXBsb2FkTGltaXRGaWxlU2l6ZVwiO1xuaW1wb3J0IHdhaXRGb3JEZWxheSBmcm9tIFwiLi93YWl0Rm9yRGVsYXlcIjtcbmltcG9ydCB0b0pwZWdEYXRhVVJMIGZyb20gXCIuL2NvbnZlcnRBZGp1c3RtZW50SnBlZ1F1YWxpdHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgKFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPE1lc3NhZ2VIYW5kbGVyPFwiZ3lhem9DYXB0dXJlV2l0aFNpemVcIj4+XG4pID0+IHtcbiAgY29uc3QgW3JlcXVlc3QsICwgc2VuZFJlc3BvbnNlXSA9IGFyZ3M7XG4gIGNvbnN0IGJhc2VDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICBiYXNlQ2FudmFzLmhlaWdodCA9IHJlcXVlc3QuZGF0YS5oICogcmVxdWVzdC5kYXRhLnogKiByZXF1ZXN0LmRhdGEucztcbiAgYmFzZUNhbnZhcy53aWR0aCA9IHJlcXVlc3QuZGF0YS53ICogcmVxdWVzdC5kYXRhLnogKiByZXF1ZXN0LmRhdGEucztcbiAgbGV0IGxhc3RMaW5lV2lkdGg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBjb25zdCBjYXB0dXJlID0gYXN5bmMgKFxuICAgIHNjcm9sbEhlaWdodCA9IDAsXG4gICAgc2Nyb2xsV2lkdGggPSAwLFxuICAgIGxhc3RJbWFnZUJvdHRvbSA9IDAsXG4gICAgbGFzdEltYWdlUmlnaHQgPSAwLFxuICAgIGxhc3RJbWFnZURhdGE6IERhdGFVUkwgfCBudWxsID0gbnVsbFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAvLyBJZiBjYXB0dXJlIGlzIGZpbmlzaGVkLCB1cGxvYWQgY2FwdHVyZWQgaW1hZ2VcbiAgICBpZiAoXG4gICAgICBzY3JvbGxIZWlnaHQgPj0gcmVxdWVzdC5kYXRhLmggJiZcbiAgICAgIHNjcm9sbFdpZHRoICsgKHJlcXVlc3QudGFiPy53aWR0aCA/PyAwKSA+PSByZXF1ZXN0LmRhdGEud1xuICAgICkge1xuICAgICAgaWYgKHJlcXVlc3QudGFiLmlkKVxuICAgICAgICBhd2FpdCBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHJlcXVlc3QudGFiLmlkLCB7XG4gICAgICAgICAgY29kZTogYG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygke3JlcXVlc3QuZGF0YS5wb3NpdGlvblh9LCR7cmVxdWVzdC5kYXRhLnBvc2l0aW9uWX0pO1xuICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVzb2x2ZSk7XG4gICAgICAgICAgICB9KWAsXG4gICAgICAgIH0pO1xuICAgICAgYXdhaXQgd2FpdEZvckRlbGF5KCk7XG4gICAgICBsZXQgdXBsb2FkSW1hZ2UgPSBiYXNlQ2FudmFzLnRvRGF0YVVSTCgpIGFzIERhdGFVUkw7XG4gICAgICBjb25zdCB1cGxvYWRMaW1pdFZvbHVtZSA9IGF3YWl0IHVwbG9hZExpbWl0RmlsZVNpemUoKTtcbiAgICAgIGlmICh1cGxvYWRJbWFnZS5sZW5ndGggPiB1cGxvYWRMaW1pdFZvbHVtZSkge1xuICAgICAgICB1cGxvYWRJbWFnZSA9IGF3YWl0IHRvSnBlZ0RhdGFVUkwoYmFzZUNhbnZhcyk7XG4gICAgICB9XG4gICAgICBiYXNlQ2FudmFzLnRvQmxvYigoYmxvYikgPT4ge1xuICAgICAgICBwb3N0VG9HeWF6byhyZXF1ZXN0LnRhYi5pZCwge1xuICAgICAgICAgIGltYWdlRGF0YTogdXBsb2FkSW1hZ2UsXG4gICAgICAgICAgaW1hZ2VCbG9iOiBibG9iLFxuICAgICAgICAgIHRpdGxlOiByZXF1ZXN0LmRhdGEudCxcbiAgICAgICAgICB1cmw6IHJlcXVlc3QuZGF0YS51LFxuICAgICAgICAgIHdpZHRoOiByZXF1ZXN0LmRhdGEudyxcbiAgICAgICAgICBoZWlnaHQ6IHJlcXVlc3QuZGF0YS5oLFxuICAgICAgICAgIHNjYWxlOiByZXF1ZXN0LmRhdGEucyxcbiAgICAgICAgICBkZXNjOiByZXF1ZXN0LmRhdGEuZGVzYyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzZW5kUmVzcG9uc2UoKTtcbiAgICB9XG5cbiAgICBpZiAoc2Nyb2xsSGVpZ2h0ID49IHJlcXVlc3QuZGF0YS5oKSB7XG4gICAgICBzY3JvbGxIZWlnaHQgPSAwO1xuICAgICAgbGFzdEltYWdlQm90dG9tID0gMDtcbiAgICAgIGlmIChzY3JvbGxXaWR0aCArIChyZXF1ZXN0LnRhYi53aWR0aCA/PyAwKSAqIDIgPj0gcmVxdWVzdC5kYXRhLncpIHtcbiAgICAgICAgbGFzdExpbmVXaWR0aCA9IHJlcXVlc3QuZGF0YS53IC0gc2Nyb2xsV2lkdGggLSAocmVxdWVzdC50YWIud2lkdGggPz8gMCk7XG4gICAgICAgIHNjcm9sbFdpZHRoICs9IGxhc3RMaW5lV2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxXaWR0aCArPSByZXF1ZXN0LnRhYi53aWR0aCA/PyAwO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBpbWFnZVBvc2l0aW9uVG9wID1cbiAgICAgIGxhc3RJbWFnZUJvdHRvbSB8fCBzY3JvbGxIZWlnaHQgKiByZXF1ZXN0LmRhdGEueiAqIHJlcXVlc3QuZGF0YS5zO1xuICAgIGNvbnN0IG9mZnNldFRvcCA9IHJlcXVlc3QuZGF0YS55IC0gcmVxdWVzdC5kYXRhLnBvc2l0aW9uWTtcbiAgICBjb25zdCBpbWFnZVBvc2l0aW9uTGVmdCA9XG4gICAgICBsYXN0SW1hZ2VSaWdodCB8fCBzY3JvbGxXaWR0aCAqIHJlcXVlc3QuZGF0YS56ICogcmVxdWVzdC5kYXRhLnM7XG4gICAgY29uc3Qgb2Zmc2V0TGVmdCA9IHJlcXVlc3QuZGF0YS54IC0gcmVxdWVzdC5kYXRhLnBvc2l0aW9uWDtcbiAgICBpZiAoXG4gICAgICBzY3JvbGxIZWlnaHQgPT09IDAgJiZcbiAgICAgIG9mZnNldFRvcCA+PSAwICYmXG4gICAgICBvZmZzZXRUb3AgKyByZXF1ZXN0LmRhdGEuaCA8PSAocmVxdWVzdC50YWIuaGVpZ2h0ID8/IDApICYmXG4gICAgICBzY3JvbGxXaWR0aCA9PT0gMCAmJlxuICAgICAgb2Zmc2V0TGVmdCA+PSAwICYmXG4gICAgICBvZmZzZXRMZWZ0ICsgcmVxdWVzdC5kYXRhLncgPD0gKHJlcXVlc3QudGFiLndpZHRoID8/IDApXG4gICAgKSB7XG4gICAgICAvLyBDYXB0dXJlIGluIHdpbmRvdyAobm90IHJlcXVpcmUgc2Nyb2xsKVxuICAgICAgbGV0IGNhcHR1cmVEYXRhOiBEYXRhVVJMIHwgbnVsbCA9IG51bGw7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIG51bGzjgaflpKfkuIjlpKvjgaDjgZHjganlnovjgafjga/jgqjjg6njg7zjgavjgarjgotcbiAgICAgICAgY2FwdHVyZURhdGEgPSAoYXdhaXQgYnJvd3Nlci50YWJzLmNhcHR1cmVWaXNpYmxlVGFiKG51bGwsIHtcbiAgICAgICAgICBmb3JtYXQ6IFwicG5nXCIsXG4gICAgICAgIH0pKSBhcyBEYXRhVVJMO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBub29wXG4gICAgICB9XG4gICAgICBpZiAoY2FwdHVyZURhdGEgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGNhcHR1cmUoXG4gICAgICAgICAgc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgIHNjcm9sbFdpZHRoLFxuICAgICAgICAgIGxhc3RJbWFnZUJvdHRvbSxcbiAgICAgICAgICBsYXN0SW1hZ2VSaWdodCxcbiAgICAgICAgICBjYXB0dXJlRGF0YVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKGxhc3RJbWFnZURhdGEgPT09IGNhcHR1cmVEYXRhKSB7XG4gICAgICAgIC8vIHJldHJ5XG4gICAgICAgIHJldHVybiBjYXB0dXJlKFxuICAgICAgICAgIHNjcm9sbEhlaWdodCxcbiAgICAgICAgICBzY3JvbGxXaWR0aCxcbiAgICAgICAgICBsYXN0SW1hZ2VCb3R0b20sXG4gICAgICAgICAgbGFzdEltYWdlUmlnaHQsXG4gICAgICAgICAgY2FwdHVyZURhdGFcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyaW1lZEltYWdlQ2FudmFzID0gYXdhaXQgdHJpbUltYWdlKHtcbiAgICAgICAgaW1hZ2VEYXRhOiBjYXB0dXJlRGF0YSxcbiAgICAgICAgc2NhbGU6IHJlcXVlc3QuZGF0YS5zLFxuICAgICAgICB6b29tOiByZXF1ZXN0LmRhdGEueixcbiAgICAgICAgc3RhcnRYOiByZXF1ZXN0LmRhdGEueCAtIHJlcXVlc3QuZGF0YS5wb3NpdGlvblgsXG4gICAgICAgIHN0YXJ0WTogb2Zmc2V0VG9wLFxuICAgICAgICB3aWR0aDogcmVxdWVzdC5kYXRhLncsXG4gICAgICAgIGhlaWdodDogTWF0aC5taW4oXG4gICAgICAgICAgcmVxdWVzdC50YWIuaGVpZ2h0ID8/IDAsXG4gICAgICAgICAgcmVxdWVzdC5kYXRhLmggLSBzY3JvbGxIZWlnaHRcbiAgICAgICAgKSxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgYXBwZW5kSW1hZ2VUb0NhbnZhcyh7XG4gICAgICAgIGNhbnZhczogYmFzZUNhbnZhcyxcbiAgICAgICAgaW1hZ2VTcmM6IHRyaW1lZEltYWdlQ2FudmFzLnRvRGF0YVVSTCgpIGFzIERhdGFVUkwsXG4gICAgICAgIGhlaWdodDogTWF0aC5taW4oXG4gICAgICAgICAgcmVxdWVzdC50YWIuaGVpZ2h0ID8/IDAsXG4gICAgICAgICAgcmVxdWVzdC5kYXRhLmggLSBzY3JvbGxIZWlnaHRcbiAgICAgICAgKSxcbiAgICAgICAgd2lkdGg6IHJlcXVlc3QuZGF0YS53LFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHNjYWxlOiByZXF1ZXN0LmRhdGEucyxcbiAgICAgICAgem9vbTogcmVxdWVzdC5kYXRhLnosXG4gICAgICB9KTtcbiAgICAgIHNjcm9sbEhlaWdodCArPSByZXF1ZXN0LnRhYi5oZWlnaHQgPz8gMDtcbiAgICAgIGNhcHR1cmUoc2Nyb2xsSGVpZ2h0LCBzY3JvbGxXaWR0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHNjcm9sbFRvWCA9IHNjcm9sbFdpZHRoICsgcmVxdWVzdC5kYXRhLng7XG4gICAgY29uc3Qgc2Nyb2xsVG9ZID0gc2Nyb2xsSGVpZ2h0ICsgcmVxdWVzdC5kYXRhLnk7XG5cbiAgICBpZiAoc2Nyb2xsVG9YICsgKHJlcXVlc3QudGFiLndpZHRoID8/IDApID4gcmVxdWVzdC5kYXRhLmRvY3VtZW50V2lkdGgpIHtcbiAgICAgIGlmICgocmVxdWVzdC50YWIud2lkdGggPz8gMCkgPT09IHJlcXVlc3QuZGF0YS5kb2N1bWVudFdpZHRoKSB7XG4gICAgICAgIHNjcm9sbFRvWCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxUb1ggPVxuICAgICAgICAgIHNjcm9sbFdpZHRoICtcbiAgICAgICAgICAoc2Nyb2xsVG9YICsgKHJlcXVlc3QudGFiLndpZHRoID8/IDApIC0gcmVxdWVzdC5kYXRhLmRvY3VtZW50V2lkdGgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0LnRhYi5pZCkge1xuICAgICAgYXdhaXQgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdChyZXF1ZXN0LnRhYi5pZCwge1xuICAgICAgICBjb2RlOiBgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHdhaXRGb3JTY3JvbGwgKCkge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgTWF0aC5hYnMod2luZG93LnNjcm9sbFggLSAke3Njcm9sbFRvWH0pIDwgMSAmJlxuICAgICAgICAgICAgICAgIE1hdGguYWJzKHdpbmRvdy5zY3JvbGxZIC0gJHtzY3JvbGxUb1l9KSA8IDFcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3aWxsIGVuZFwiLCBEYXRlLm5vdygpLCBwZXJmb3JtYW5jZS5ub3coKSk7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiByZXNvbHZlKCdhYWFhYScpKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oJHtzY3JvbGxUb1h9LCAke3Njcm9sbFRvWX0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHdhaXRGb3JTY3JvbGwoKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3YWl0Rm9yU2Nyb2xsKCk7XG4gICAgICAgICAgfSlgLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGF3YWl0IHdhaXRGb3JEZWxheSgpO1xuXG4gICAgbGV0IGRhdGE6IERhdGFVUkwgfCBudWxsID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBudWxs44Gn44KC5aSn5LiI5aSrXG4gICAgICBkYXRhID0gKGF3YWl0IGJyb3dzZXIudGFicy5jYXB0dXJlVmlzaWJsZVRhYihudWxsLCB7XG4gICAgICAgIGZvcm1hdDogXCJwbmdcIixcbiAgICAgIH0pKSBhcyBEYXRhVVJMO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIG5vb3BcbiAgICB9XG4gICAgaWYgKGRhdGEgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBjYXB0dXJlKFxuICAgICAgICBzY3JvbGxIZWlnaHQsXG4gICAgICAgIHNjcm9sbFdpZHRoLFxuICAgICAgICBsYXN0SW1hZ2VCb3R0b20sXG4gICAgICAgIGxhc3RJbWFnZVJpZ2h0LFxuICAgICAgICBkYXRhXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAobGFzdEltYWdlRGF0YSA9PT0gZGF0YSkge1xuICAgICAgLy8gcmV0cnlcbiAgICAgIHJldHVybiBjYXB0dXJlKFxuICAgICAgICBzY3JvbGxIZWlnaHQsXG4gICAgICAgIHNjcm9sbFdpZHRoLFxuICAgICAgICBsYXN0SW1hZ2VCb3R0b20sXG4gICAgICAgIGxhc3RJbWFnZVJpZ2h0LFxuICAgICAgICBkYXRhXG4gICAgICApO1xuICAgIH1cbiAgICBsZXQgc3RhcnRYID0gMDtcbiAgICBsZXQgd2lkdGggPSBsYXN0TGluZVdpZHRoIHx8IChyZXF1ZXN0LnRhYi53aWR0aCA/PyAwKTtcbiAgICBpZiAobGFzdExpbmVXaWR0aCkge1xuICAgICAgc3RhcnRYID0gKHJlcXVlc3QudGFiLndpZHRoID8/IDApIC0gbGFzdExpbmVXaWR0aDtcbiAgICB9IGVsc2UgaWYgKHNjcm9sbFRvWCA9PT0gMCkge1xuICAgICAgc3RhcnRYID0gcmVxdWVzdC5kYXRhLng7XG4gICAgICB3aWR0aCAtPSByZXF1ZXN0LmRhdGEueDtcbiAgICB9XG5cbiAgICBjb25zdCB0cmltZWRJbWFnZUNhbnZhcyA9IGF3YWl0IHRyaW1JbWFnZSh7XG4gICAgICBpbWFnZURhdGE6IGRhdGEsXG4gICAgICBzY2FsZTogcmVxdWVzdC5kYXRhLnMsXG4gICAgICB6b29tOiByZXF1ZXN0LmRhdGEueixcbiAgICAgIHN0YXJ0WCxcbiAgICAgIHN0YXJ0WTogMCxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0OiBNYXRoLm1pbihyZXF1ZXN0LnRhYi5oZWlnaHQgPz8gMCwgcmVxdWVzdC5kYXRhLmggLSBzY3JvbGxIZWlnaHQpLFxuICAgIH0pO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3RcbiAgICBsZXQgW19sYXN0SW1hZ2VCb3R0b20sIF9sYXN0SW1hZ2VSaWdodF0gPSBhd2FpdCBhcHBlbmRJbWFnZVRvQ2FudmFzKHtcbiAgICAgIGNhbnZhczogYmFzZUNhbnZhcyxcbiAgICAgIGltYWdlU3JjOiB0cmltZWRJbWFnZUNhbnZhcy50b0RhdGFVUkwoKSBhcyBEYXRhVVJMLFxuICAgICAgaGVpZ2h0OiBNYXRoLm1pbihyZXF1ZXN0LnRhYi5oZWlnaHQgPz8gMCwgcmVxdWVzdC5kYXRhLmggLSBzY3JvbGxIZWlnaHQpLFxuICAgICAgd2lkdGgsXG4gICAgICB0b3A6IGltYWdlUG9zaXRpb25Ub3AsXG4gICAgICBsZWZ0OiBpbWFnZVBvc2l0aW9uTGVmdCxcbiAgICAgIHNjYWxlOiByZXF1ZXN0LmRhdGEucyxcbiAgICAgIHpvb206IHJlcXVlc3QuZGF0YS56LFxuICAgIH0pO1xuICAgIHNjcm9sbEhlaWdodCArPSByZXF1ZXN0LnRhYi5oZWlnaHQgPz8gMDtcblxuICAgIGlmIChfbGFzdEltYWdlQm90dG9tIDwgcmVxdWVzdC5kYXRhLmggKiByZXF1ZXN0LmRhdGEucyAqIHJlcXVlc3QuZGF0YS56KSB7XG4gICAgICBfbGFzdEltYWdlUmlnaHQgPSBsYXN0SW1hZ2VSaWdodDtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdC50YWIuaWQpIHtcbiAgICAgIGF3YWl0IHNlbmRNZXNzYWdlVG9Db250ZW50U2NyaXB0KHJlcXVlc3QudGFiLmlkLCB7XG4gICAgICAgIHRhcmdldDogXCJjb250ZW50XCIsXG4gICAgICAgIGFjdGlvbjogXCJjaGFuZ2VGaXhlZEVsZW1lbnRUb0Fic29sdXRlXCIsXG4gICAgICAgIHRhYjogcmVxdWVzdC50YWIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXB0dXJlKHNjcm9sbEhlaWdodCwgc2Nyb2xsV2lkdGgsIF9sYXN0SW1hZ2VCb3R0b20sIF9sYXN0SW1hZ2VSaWdodCwgZGF0YSk7XG4gIH07XG4gIGNhcHR1cmUoKTtcbn07XG4iLCJpbXBvcnQgcG9zdFRvR3lhem8gZnJvbSBcIi4vcG9zdFRvR3lhem9cIjtcblxuZXhwb3J0IGRlZmF1bHQgKHRhYiwgc3JjVXJsKSA9PiB7XG4gIGlmIChzcmNVcmwubWF0Y2goL15kYXRhOi8pKSB7XG4gICAgZmV0Y2goc3JjVXJsKS50aGVuKChyZXMpID0+IHtcbiAgICAgIHJlcy5ibG9iKChibG9iKSA9PiB7XG4gICAgICAgIHBvc3RUb0d5YXpvKHRhYi5pZCwge1xuICAgICAgICAgIGltYWdlRGF0YTogc3JjVXJsLFxuICAgICAgICAgIGltYWdlQmxvYjogYmxvYixcbiAgICAgICAgICB0aXRsZTogdGFiLnRpdGxlLFxuICAgICAgICAgIHVybDogdGFiLnVybCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB4aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oXCJHRVRcIiwgc3JjVXJsLCB0cnVlKTtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gXCJibG9iXCI7XG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICBsZXQgbWluZVR5cGUgPSB4aHIucmVzcG9uc2UudHlwZTtcbiAgICAgICAgaWYgKC9wbmckLy50ZXN0KHNyY1VybCkpIHtcbiAgICAgICAgICBtaW5lVHlwZSA9IFwiaW1hZ2UvcG5nXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoL2pwZT9nJC8udGVzdChzcmNVcmwpKSB7XG4gICAgICAgICAgbWluZVR5cGUgPSBcImltYWdlL2pwZWdcIjtcbiAgICAgICAgfSBlbHNlIGlmICgvZ2lmJC8udGVzdChzcmNVcmwpKSB7XG4gICAgICAgICAgbWluZVR5cGUgPSBcImltYWdlL2dpZlwiO1xuICAgICAgICB9IGVsc2UgaWYgKC93ZWJwJC8udGVzdChzcmNVcmwpKSB7XG4gICAgICAgICAgbWluZVR5cGUgPSBcImltYWdlL3dlYnBcIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBibG9iID0gbmV3IHdpbmRvdy5CbG9iKFt4aHIucmVzcG9uc2VdLCB7IHR5cGU6IG1pbmVUeXBlIH0pO1xuICAgICAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcG9zdFRvR3lhem8odGFiLmlkLCB7XG4gICAgICAgICAgICBpbWFnZURhdGE6IGZpbGVSZWFkZXIucmVzdWx0LFxuICAgICAgICAgICAgaW1hZ2VCbG9iOiBibG9iLFxuICAgICAgICAgICAgdGl0bGU6IHRhYi50aXRsZSxcbiAgICAgICAgICAgIHVybDogdGFiLnVybCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGJsb2IpO1xuICAgICAgfVxuICAgIH07XG4gICAgeGhyLnNlbmQoKTtcbiAgfVxufTtcbiIsImNvbnN0IEFQSV9IT1NUID0gXCJodHRwczovL2FwaS5neWF6by5jb21cIjtcbmNvbnN0IHJlZGlyZWN0VXJsID0gXCJodHRwczovL2d5YXpvLmNvbS9vYXV0aC9vbmJvYXJkaW5nL2V4dGVuc2lvblwiO1xuLy8gcGFzdGFr44GuR3lhem/jgqLjgqvjgqbjg7Pjg4jjgavntJDku5jjgYTjgabjgYTjgovjgIHjgqLjg5fjg6rjgrHjg7zjgrfjg6fjg7Pmg4XloLHjgpLkvb/jgaPjgabjgYTjgotcbmNvbnN0IGNsaWVudElkID0gXCJxZEhhMHpNUGotbThsSjZYejF6ak45TktWdjdaWDhuSVV0OHdmV3ZkMGNRXCI7XG5jb25zdCBjbGllbnRTZWNyZXQgPSBcIkVzb3hXRnFpRHpDTFJjcUNUUWpYN0t4ZC1WR0lNS2VsMFFQZV9md3RSM2NcIjtcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlQXV0aG9yaXplVXJsID0gKHRlYW1OYW1lPzogc3RyaW5nKTogVVJMID0+IHtcbiAgY29uc3QgdXJsID0gbmV3IFVSTChBUElfSE9TVCArIFwiL29hdXRoL2F1dGhvcml6ZVwiKTtcbiAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoXCJjbGllbnRfaWRcIiwgY2xpZW50SWQpO1xuICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChcInJlZGlyZWN0X3VyaVwiLCByZWRpcmVjdFVybCk7XG4gIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKFwicmVzcG9uc2VfdHlwZVwiLCBcImNvZGVcIik7XG4gIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKFwic2NvcGVcIiwgXCJ1cGxvYWRcIik7XG4gIGlmICh0ZWFtTmFtZSAhPSBudWxsKSB7XG4gICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoXCJ0ZWFtXCIsIHRlYW1OYW1lKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTtcblxudHlwZSBDb2RlID0gc3RyaW5nICYgeyBfX2NvZGU6IG5ldmVyIH07XG5cbmV4cG9ydCBjb25zdCBnZXRDb2RlID0gKHVybDogc3RyaW5nKTogQ29kZSB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMKHVybCkuc2VhcmNoUGFyYW1zO1xuICBjb25zdCBjb2RlID0gcGFyYW1zLmdldChcImNvZGVcIik7XG4gIHJldHVybiBjb2RlIGFzIENvZGU7XG59O1xuXG50eXBlIEFjY2Vzc1Rva2VuID0gc3RyaW5nICYgeyBfX2FjY2Vzc1Rva2VuOiBuZXZlciB9O1xuXG5leHBvcnQgY29uc3QgZ2V0QWNjZXNzVG9rZW4gPSBhc3luYyAoY29kZTogQ29kZSkgPT4ge1xuICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gIHBhcmFtcy5hcHBlbmQoXCJjbGllbnRfaWRcIiwgY2xpZW50SWQpO1xuICBwYXJhbXMuYXBwZW5kKFwiY2xpZW50X3NlY3JldFwiLCBjbGllbnRTZWNyZXQpO1xuICBwYXJhbXMuYXBwZW5kKFwicmVkaXJlY3RfdXJpXCIsIHJlZGlyZWN0VXJsKTtcbiAgcGFyYW1zLmFwcGVuZChcImNvZGVcIiwgY29kZSk7XG4gIHBhcmFtcy5hcHBlbmQoXCJncmFudF90eXBlXCIsIFwiYXV0aG9yaXphdGlvbl9jb2RlXCIpO1xuXG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKEFQSV9IT1NUICsgXCIvb2F1dGgvdG9rZW5cIiwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgY2xpZW50X2lkOiBjbGllbnRJZCxcbiAgICAgIGNsaWVudF9zZWNyZXQ6IGNsaWVudFNlY3JldCxcbiAgICAgIHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmwsXG4gICAgICBncmFudF90eXBlOiBcImF1dGhvcml6YXRpb25fY29kZVwiLFxuICAgICAgY29kZSxcbiAgICB9KSxcbiAgfSk7XG4gIGNvbnN0IHsgYWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbiB9ID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgcmV0dXJuIGFjY2Vzc1Rva2VuIGFzIEFjY2Vzc1Rva2VuO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwbG9hZCA9IGFzeW5jIChkYXRhOiBGb3JtRGF0YSkgPT4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vdXBsb2FkLmd5YXpvLmNvbS9hcGkvdjIvdXBsb2FkXCIsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgICBib2R5OiBkYXRhLFxuICB9KTtcbiAgcmV0dXJuIHJlcy5qc29uKCk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IHBlcm1pc3Npb25zID0ge1xuICBjb3B5VXJsVG9DbGlwYm9hcmQ6IHtcbiAgICBwZXJtaXNzaW9uczogW1wiY2xpcGJvYXJkV3JpdGVcIl0sXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgY2hlY2sgPSBhc3luYyAocGVybWlzc2lvbnMpID0+IHtcbiAgY29uc3QgcmVzID0gYXdhaXQgYnJvd3Nlci5wZXJtaXNzaW9ucy5jb250YWlucyhwZXJtaXNzaW9ucyk7XG4gIHJldHVybiByZXM7XG59O1xuXG5leHBvcnQgY29uc3QgcmVxdWVzdCA9IGFzeW5jIChwZXJtaXNzaW9ucykgPT4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBicm93c2VyLnBlcm1pc3Npb25zLnJlcXVlc3QocGVybWlzc2lvbnMpO1xuICByZXR1cm4gcmVzO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvZ2dsZSA9IGFzeW5jIChwZXJtaXNzaW9ucywgc3RhdGUpID0+IHtcbiAgaWYgKHN0YXRlID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGF0ZSA9IGF3YWl0IGNoZWNrKHBlcm1pc3Npb25zKTtcbiAgfVxuICBpZiAoc3RhdGUpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBicm93c2VyLnBlcm1pc3Npb25zLnJlcXVlc3QocGVybWlzc2lvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgYnJvd3Nlci5wZXJtaXNzaW9ucy5yZW1vdmUocGVybWlzc2lvbnMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cbn07XG4iLCJpbXBvcnQgVXBsb2FkTm90aWZpY2F0aW9uIGZyb20gXCIuL1VwbG9hZE5vdGlmaWNhdGlvblwiO1xuaW1wb3J0IHNhdmVUb0NsaXBib2FyZCBmcm9tIFwiLi9zYXZlVG9DbGlwYm9hcmRcIjtcbmltcG9ydCBzdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2VTd2l0Y2hlclwiO1xuaW1wb3J0IHsgdXBsb2FkIH0gZnJvbSBcIi4vb2F1dGgyXCI7XG5pbXBvcnQgeyBEYXRhVVJMIH0gZnJvbSBcIi4vTWVzc2FnZUxpc3RlbmVyXCI7XG5cbmNvbnN0IGFwaUVuZHBvaW50ID0gXCJodHRwczovL3VwbG9hZC5neWF6by5jb20vYXBpL3VwbG9hZC9lYXN5X2F1dGhcIjtcbmNvbnN0IGNsaWVudElkID1cbiAgXCJkZjllZGFiNTMwZTg0YjRjNTZmOWZjZmEyMDlhZmYxMTMxYzdkMzU4YTkxZDg1Y2MyMGI5MjI5ZTUxNWQ2N2RkXCI7XG5cbmNvbnN0IGVycm9yQWxlcnQgPSAoc3RhdHVzOiB1bmtub3duLCBtZXNzYWdlOiBzdHJpbmcpID0+IHtcbiAgd2luZG93LmFsZXJ0KFwiU3RhdHVzOiBcIiArIHN0YXR1cyArIFwiXFxuIEVycm9yOiBcIiArIG1lc3NhZ2UpO1xufTtcblxudHlwZSBEYXRhID0gUmVhZG9ubHk8e1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgT0F1dGjniYjjgafjga/kuI3opoHjgavjgarjgotcbiAgICogKi9cbiAgaW1hZ2VEYXRhOiBEYXRhVVJMO1xuICBpbWFnZUJsb2I6IEJsb2IgfCBudWxsO1xuICB0aXRsZT86IHN0cmluZztcbiAgdXJsPzogc3RyaW5nO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgc2NhbGU/OiBudW1iZXI7XG4gIGRlc2M/OiBzdHJpbmc7XG59PjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHRhYklkOiBudW1iZXIgfCB1bmRlZmluZWQsIGRhdGE6IERhdGEpID0+IHtcbiAgY29uc3Qgbm90aWZpY2F0aW9uID0gbmV3IFVwbG9hZE5vdGlmaWNhdGlvbih0YWJJZCk7XG4gIG5vdGlmaWNhdGlvbi5zdGFydFVwbG9hZGluZygpO1xuICBjb25zdCBmb3JtZGF0YSA9IG5ldyB3aW5kb3cuRm9ybURhdGEoKTtcbiAgZm9ybWRhdGEuYXBwZW5kKFwiY2xpZW50X2lkXCIsIGNsaWVudElkKTtcbiAgZm9ybWRhdGEuYXBwZW5kKFwidGl0bGVcIiwgZGF0YS50aXRsZSA/PyBcIlwiKTtcbiAgZm9ybWRhdGEuYXBwZW5kKFwic2NhbGVcIiwgZGF0YS5zY2FsZT8udG9TdHJpbmcoKSA/PyBcIlwiKTtcbiAgZm9ybWRhdGEuYXBwZW5kKFxuICAgIFwiZGVzY1wiLFxuICAgIGRhdGEuZGVzYyA/IGRhdGEuZGVzYy5yZXBsYWNlKC9cXHQvLCBcIiBcIikucmVwbGFjZSgvKF5cXHMrfCArJCkvZ20sIFwiXCIpIDogXCJcIlxuICApO1xuXG4gIGNvbnN0IHsgYWNjZXNzVG9rZW4gfSA9IGF3YWl0IHN0b3JhZ2UuZ2V0KHsgYWNjZXNzVG9rZW46IG51bGwgfSk7XG4gIGlmIChhY2Nlc3NUb2tlbiAmJiBkYXRhLmltYWdlQmxvYikge1xuICAgIGRhdGEudXJsICYmIGZvcm1kYXRhLmFwcGVuZChcInVybFwiLCBkYXRhLnVybCk7XG4gICAgZm9ybWRhdGEuYXBwZW5kKFwiaW1hZ2VkYXRhXCIsIGRhdGEuaW1hZ2VCbG9iKTtcbiAgICBmb3JtZGF0YS5hcHBlbmQoXCJhY2Nlc3NfdG9rZW5cIiwgYWNjZXNzVG9rZW4pO1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCB1cGxvYWQoZm9ybWRhdGEpO1xuICAgIHNhdmVUb0NsaXBib2FyZChqc29uLnBlcm1hbGlua191cmwpO1xuICAgIG5vdGlmaWNhdGlvbi5maW5pc2goanNvbi5wZXJtYWxpbmtfdXJsLCBkYXRhLmltYWdlRGF0YSwgZGF0YS5zY2FsZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGF0YS51cmwgJiYgZm9ybWRhdGEuYXBwZW5kKFwicmVmZXJlcl91cmxcIiwgZGF0YS51cmwpO1xuICBmb3JtZGF0YS5hcHBlbmQoXCJpbWFnZV91cmxcIiwgZGF0YS5pbWFnZURhdGEpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5CVUlMRF9FWFRFTlNJT05fVFlQRSA9PT0gXCJ0ZWFtc1wiKSB7XG4gICAgY29uc3QgeyB0ZWFtIH0gPSBhd2FpdCBzdG9yYWdlLmdldCgpO1xuICAgIGZvcm1kYXRhLmFwcGVuZChcInRlYW1fbmFtZVwiLCB0ZWFtLm5hbWUpO1xuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB3aW5kb3cuZmV0Y2goYXBpRW5kcG9pbnQsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGJvZHk6IGZvcm1kYXRhLFxuICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgfSk7XG5cbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSA0MDApIHtcbiAgICBlcnJvckFsZXJ0KHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gIH1cblxuICBjb25zdCBfZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgLy8gVXNlIHB1cmUgWEhSIGZvciBnZXQgWEhSLnJlc3BvbnNlVVJMXG4gIGNvbnN0IHhociA9IG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKTtcbiAgeGhyLm9wZW4oXCJHRVRcIiwgX2RhdGEuZ2V0X2ltYWdlX3VybCk7XG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gICAgaWYgKHhoci5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICBlcnJvckFsZXJ0KHhoci5zdGF0dXMsIHhoci5zdGF0dXNUZXh0KTtcbiAgICB9XG4gICAgaWYgKHhoci5yZXNwb25zZVVSTCkge1xuICAgICAgc2F2ZVRvQ2xpcGJvYXJkKHhoci5yZXNwb25zZVVSTCk7XG4gICAgICBub3RpZmljYXRpb24uZmluaXNoKHhoci5yZXNwb25zZVVSTCwgZGF0YS5pbWFnZURhdGEsIGRhdGEuc2NhbGUpO1xuICAgIH1cbiAgfTtcbiAgeGhyLnNlbmQoKTtcbn07XG4iLCJpbXBvcnQgeyBjaGVjaywgcGVybWlzc2lvbnMgfSBmcm9tIFwiLi9wZXJtaXNzaW9uc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAoc3RyKSB7XG4gIGNvbnN0IHBlcm1pc3Npb25DaGVjayA9IGF3YWl0IGNoZWNrKHBlcm1pc3Npb25zLmNvcHlVcmxUb0NsaXBib2FyZCk7XG4gIGlmICghcGVybWlzc2lvbkNoZWNrKSByZXR1cm47XG4gIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuICB0ZXh0QXJlYS5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0Oi0xMDAlXCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0QXJlYSk7XG5cbiAgdGV4dEFyZWEudmFsdWUgPSBzdHI7XG4gIHRleHRBcmVhLnNlbGVjdCgpO1xuICBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XG5cbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZXh0QXJlYSk7XG59XG4iLCJjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgYmVoYXZpb3I6IFwiYXJlYVwiLFxuICBjb250ZXh0TWVudTogdHJ1ZSxcbiAgZmlsZVNpemVMaW1pdDogMixcbiAgdGVhbToge30sXG59O1xuXG5jb25zdCBFeHRlbnNpb25TdG9yYWdlV3JhcHBlciA9IGNsYXNzIEV4dGVuc2lvblN0b3JhZ2VXcmFwcGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gRmlyZWZveCByZXF1aXJlcyB3ZWJleHRlbnNpb25zLnN0b3JhZ2Uuc3luYy5lbmFibGVkIHRvIHRydWUgaW4gYWJvdXQ6Y29uZmlnXG4gICAgdGhpcy5jaGVja0VudiA9IGZhbHNlO1xuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBlbmFibGVkU3luY1N0b3JhZ2UgPVxuICAgICAgICAhIWNocm9tZS5zdG9yYWdlLnN5bmMgJiZcbiAgICAgICAgKChhd2FpdCB0aGlzLnRyeVRvR2V0U3luY1N0YXR1cygpKCkpIHx8XG4gICAgICAgICAgKGF3YWl0IHRoaXMudHJ5VG9TZXRTeW5jU3RhdHVzKCkoKSkpO1xuICAgICAgdGhpcy5zdG9yYWdlVHlwZSA9IGVuYWJsZWRTeW5jU3RvcmFnZSA/IFwic3luY1wiIDogXCJsb2NhbFwiO1xuICAgICAgdGhpcy5jaGVja0VudiA9IHRydWU7XG4gICAgfSkoKTtcblxuICAgIHRoaXMub25DaGFuZ2VkID0ge1xuICAgICAgYWRkTGlzdGVuZXI6ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIoLi4uYXJncyk7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlTGlzdGVuZXI6ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoLi4uYXJncyk7XG4gICAgICB9LFxuICAgICAgaGFzTGlzdGVuZXI6ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIHRoaXMuaGFzTGlzdGVuZXIoLi4uYXJncyk7XG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICB0cnlUb0dldFN5bmNTdGF0dXMoKSB7XG4gICAgcmV0dXJuIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IGJyb3dzZXIuc3RvcmFnZS5zeW5jLmdldChcbiAgICAgICAgICBcImd5YXpvLWV4dGVuc2lvbi1zeW5jLXN0b3JhZ2UtdGVzdFwiXG4gICAgICAgICk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gbm8tb3BcbiAgICAgIH1cbiAgICAgIHJldHVybiAhIXJlc3VsdDtcbiAgICB9O1xuICB9XG5cbiAgdHJ5VG9TZXRTeW5jU3RhdHVzKCkge1xuICAgIHJldHVybiBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBicm93c2VyLnN0b3JhZ2Uuc3luYy5zZXQoe1xuICAgICAgICAgIFwiZ3lhem8tZXh0ZW5zaW9uLXN5bmMtc3RvcmFnZS10ZXN0XCI6IDEsXG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIG5vLW9wXG4gICAgICB9XG4gICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgfTtcbiAgfVxuXG4gIHdhaXRGb3JDaGVja0VudihmKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBjb25zdCB0aW1lcklkID0gd2luZG93LnNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrRW52KSByZXR1cm47XG4gICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRpbWVySWQpO1xuICAgICAgICByZXNvbHZlKGF3YWl0IGYoKSk7XG4gICAgICB9LCAxMDApO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHN0b3JhZ2VPYmplY3QoKSB7XG4gICAgcmV0dXJuIGJyb3dzZXIuc3RvcmFnZVt0aGlzLnN0b3JhZ2VUeXBlXTtcbiAgfVxuXG4gIGdldChkZWZhdWx0VmFsdWUsIC4uLmFyZ3MpIHtcbiAgICBpZiAoIWRlZmF1bHRWYWx1ZSkgZGVmYXVsdFZhbHVlID0gZGVmYXVsdE9wdGlvbnM7XG4gICAgaWYgKCF0aGlzLmNoZWNrRW52KVxuICAgICAgcmV0dXJuIHRoaXMud2FpdEZvckNoZWNrRW52KCgpID0+IHRoaXMuZ2V0KGRlZmF1bHRWYWx1ZSwgLi4uYXJncykpO1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VPYmplY3QuZ2V0KGRlZmF1bHRWYWx1ZSwgLi4uYXJncyk7XG4gIH1cblxuICBzZXQoLi4uYXJncykge1xuICAgIGlmICghdGhpcy5jaGVja0VudikgcmV0dXJuIHRoaXMud2FpdEZvckNoZWNrRW52KCgpID0+IHRoaXMuc2V0KC4uLmFyZ3MpKTtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlT2JqZWN0LnNldCguLi5hcmdzKTtcbiAgfVxuXG4gIGdldEJ5dGVzSW5Vc2UoLi4uYXJncykge1xuICAgIGlmICghdGhpcy5jaGVja0VudilcbiAgICAgIHJldHVybiB0aGlzLndhaXRGb3JDaGVja0VudigoKSA9PiB0aGlzLmdldEJ5dGVzSW5Vc2UoLi4uYXJncykpO1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VPYmplY3QuZ2V0Qnl0ZXNJblVzZSguLi5hcmdzKTtcbiAgfVxuXG4gIHJlbW92ZSguLi5hcmdzKSB7XG4gICAgaWYgKCF0aGlzLmNoZWNrRW52KSByZXR1cm4gdGhpcy53YWl0Rm9yQ2hlY2tFbnYoKCkgPT4gdGhpcy5yZW1vdmUoLi4uYXJncykpO1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VPYmplY3QucmVtb3ZlKC4uLmFyZ3MpO1xuICB9XG5cbiAgY2xlYXIoLi4uYXJncykge1xuICAgIGlmICghdGhpcy5jaGVja0VudikgcmV0dXJuIHRoaXMud2FpdEZvckNoZWNrRW52KCgpID0+IHRoaXMuY2xlYXIoLi4uYXJncykpO1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VPYmplY3QuY2xlYXIoLi4uYXJncyk7XG4gIH1cblxuICBhZGRMaXN0ZW5lciguLi5hcmdzKSB7XG4gICAgaWYgKCF0aGlzLmNoZWNrRW52KVxuICAgICAgcmV0dXJuIHRoaXMud2FpdEZvckNoZWNrRW52KCgpID0+IHRoaXMuYWRkTGlzdGVuZXIoLi4uYXJncykpO1xuICAgIHJldHVybiBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoLi4uYXJncyk7XG4gIH1cblxuICByZW1vdmVMaXN0ZW5lciguLi5hcmdzKSB7XG4gICAgaWYgKCF0aGlzLmNoZWNrRW52KVxuICAgICAgcmV0dXJuIHRoaXMud2FpdEZvckNoZWNrRW52KCgpID0+IHRoaXMucmVtb3ZlTGlzdGVuZXIoLi4uYXJncykpO1xuICAgIHJldHVybiBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIoLi4uYXJncyk7XG4gIH1cblxuICBoYXNMaXN0ZW5lciguLi5hcmdzKSB7XG4gICAgaWYgKCF0aGlzLmNoZWNrRW52KVxuICAgICAgcmV0dXJuIHRoaXMud2FpdEZvckNoZWNrRW52KCgpID0+IHRoaXMuaGFzTGlzdGVuZXIoLi4uYXJncykpO1xuICAgIHJldHVybiBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQuaGFzTGlzdGVuZXIoLi4uYXJncyk7XG4gIH1cbn07XG5jb25zdCBzdG9yYWdlID0gbmV3IEV4dGVuc2lvblN0b3JhZ2VXcmFwcGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHN0b3JhZ2U7XG4iLCJpbXBvcnQgc3RvcmFnZSBmcm9tIFwiLi9zdG9yYWdlU3dpdGNoZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKCkgPT4ge1xuICBjb25zdCB7IGZpbGVTaXplTGltaXQgfSA9IGF3YWl0IHN0b3JhZ2UuZ2V0KCk7XG4gIHJldHVybiBOdW1iZXIoZmlsZVNpemVMaW1pdCkgKiAxMDI0ICogMTAyNCAqICg0IC8gMyk7IC8vIEJhc2U2NCBkYXRhIHZvbHVtZSBpcyA0LzMgbW9yZSB0aGFuIG9yaWdpbmFsIGRhdGFcbn07XG4iLCJjb25zdCBzbGVlcCA9IChtc2VjKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtc2VjKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jICgpID0+IHtcbiAgLy8gRm9yY2UgcmVmbG93IG9uIGJyb3dzZXIgY29udGVudFxuICAvLyBjLmYuIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIxNjY0OTQwXG4gIGNvbnN0IGN1cnJlbnRUYWIgPSAoXG4gICAgYXdhaXQgYnJvd3Nlci50YWJzLnF1ZXJ5KHsgY3VycmVudFdpbmRvdzogdHJ1ZSwgYWN0aXZlOiB0cnVlIH0pXG4gIClbMF07XG4gIGF3YWl0IGJyb3dzZXIudGFicy5leGVjdXRlU2NyaXB0KGN1cnJlbnRUYWIuaWQsIHtcbiAgICBjb2RlOiBcImNvbnNvbGUubG9nKGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0KVwiLFxuICB9KTtcbiAgYXdhaXQgc2xlZXAoXG4gICAgMTAwMCAvIChjaHJvbWUudGFicy5NQVhfQ0FQVFVSRV9WSVNJQkxFX1RBQl9DQUxMU19QRVJfU0VDT05EIHx8IDUpXG4gICk7XG59O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIsIFtcIm1vZHVsZVwiXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBmYWN0b3J5KG1vZHVsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG1vZCA9IHtcbiAgICAgIGV4cG9ydHM6IHt9XG4gICAgfTtcbiAgICBmYWN0b3J5KG1vZCk7XG4gICAgZ2xvYmFsLmJyb3dzZXIgPSBtb2QuZXhwb3J0cztcbiAgfVxufSkodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxUaGlzIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24gKG1vZHVsZSkge1xuICAvKiB3ZWJleHRlbnNpb24tcG9seWZpbGwgLSB2MC45LjAgLSBGcmkgTWFyIDI1IDIwMjIgMTc6MDA6MjMgKi9cblxuICAvKiAtKi0gTW9kZTogaW5kZW50LXRhYnMtbW9kZTogbmlsOyBqcy1pbmRlbnQtbGV2ZWw6IDIgLSotICovXG5cbiAgLyogdmltOiBzZXQgc3RzPTIgc3c9MiBldCB0dz04MDogKi9cblxuICAvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gICAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNocm9tZSAhPSBcIm9iamVjdFwiIHx8ICFjaHJvbWUgfHwgIWNocm9tZS5ydW50aW1lIHx8ICFjaHJvbWUucnVudGltZS5pZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgc2NyaXB0IHNob3VsZCBvbmx5IGJlIGxvYWRlZCBpbiBhIGJyb3dzZXIgZXh0ZW5zaW9uLlwiKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5icm93c2VyID09PSBcInVuZGVmaW5lZFwiIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWxUaGlzLmJyb3dzZXIpICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgY29uc3QgQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFID0gXCJUaGUgbWVzc2FnZSBwb3J0IGNsb3NlZCBiZWZvcmUgYSByZXNwb25zZSB3YXMgcmVjZWl2ZWQuXCI7XG4gICAgY29uc3QgU0VORF9SRVNQT05TRV9ERVBSRUNBVElPTl9XQVJOSU5HID0gXCJSZXR1cm5pbmcgYSBQcm9taXNlIGlzIHRoZSBwcmVmZXJyZWQgd2F5IHRvIHNlbmQgYSByZXBseSBmcm9tIGFuIG9uTWVzc2FnZS9vbk1lc3NhZ2VFeHRlcm5hbCBsaXN0ZW5lciwgYXMgdGhlIHNlbmRSZXNwb25zZSB3aWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgc3BlY3MgKFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL01vemlsbGEvQWRkLW9ucy9XZWJFeHRlbnNpb25zL0FQSS9ydW50aW1lL29uTWVzc2FnZSlcIjsgLy8gV3JhcHBpbmcgdGhlIGJ1bGsgb2YgdGhpcyBwb2x5ZmlsbCBpbiBhIG9uZS10aW1lLXVzZSBmdW5jdGlvbiBpcyBhIG1pbm9yXG4gICAgLy8gb3B0aW1pemF0aW9uIGZvciBGaXJlZm94LiBTaW5jZSBTcGlkZXJtb25rZXkgZG9lcyBub3QgZnVsbHkgcGFyc2UgdGhlXG4gICAgLy8gY29udGVudHMgb2YgYSBmdW5jdGlvbiB1bnRpbCB0aGUgZmlyc3QgdGltZSBpdCdzIGNhbGxlZCwgYW5kIHNpbmNlIGl0IHdpbGxcbiAgICAvLyBuZXZlciBhY3R1YWxseSBuZWVkIHRvIGJlIGNhbGxlZCwgdGhpcyBhbGxvd3MgdGhlIHBvbHlmaWxsIHRvIGJlIGluY2x1ZGVkXG4gICAgLy8gaW4gRmlyZWZveCBuZWFybHkgZm9yIGZyZWUuXG5cbiAgICBjb25zdCB3cmFwQVBJcyA9IGV4dGVuc2lvbkFQSXMgPT4ge1xuICAgICAgLy8gTk9URTogYXBpTWV0YWRhdGEgaXMgYXNzb2NpYXRlZCB0byB0aGUgY29udGVudCBvZiB0aGUgYXBpLW1ldGFkYXRhLmpzb24gZmlsZVxuICAgICAgLy8gYXQgYnVpbGQgdGltZSBieSByZXBsYWNpbmcgdGhlIGZvbGxvd2luZyBcImluY2x1ZGVcIiB3aXRoIHRoZSBjb250ZW50IG9mIHRoZVxuICAgICAgLy8gSlNPTiBmaWxlLlxuICAgICAgY29uc3QgYXBpTWV0YWRhdGEgPSB7XG4gICAgICAgIFwiYWxhcm1zXCI6IHtcbiAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY2xlYXJBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJib29rbWFya3NcIjoge1xuICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q2hpbGRyZW5cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRSZWNlbnRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRTdWJUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VHJlZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NlckFjdGlvblwiOiB7XG4gICAgICAgICAgXCJkaXNhYmxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZW5hYmxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3JcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZVRleHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3JcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZVRleHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0UG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRUaXRsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJyb3dzaW5nRGF0YVwiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDYWNoZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNvb2tpZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVEb3dubG9hZHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVGb3JtRGF0YVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUhpc3RvcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVMb2NhbFN0b3JhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVQYXNzd29yZHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVQbHVnaW5EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb21tYW5kc1wiOiB7XG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb250ZXh0TWVudXNcIjoge1xuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiY29va2llc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxDb29raWVTdG9yZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkZXZ0b29sc1wiOiB7XG4gICAgICAgICAgXCJpbnNwZWN0ZWRXaW5kb3dcIjoge1xuICAgICAgICAgICAgXCJldmFsXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhbmVsc1wiOiB7XG4gICAgICAgICAgICBcImNyZWF0ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMyxcbiAgICAgICAgICAgICAgXCJzaW5nbGVDYWxsYmFja0FyZ1wiOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJlbGVtZW50c1wiOiB7XG4gICAgICAgICAgICAgIFwiY3JlYXRlU2lkZWJhclBhbmVcIjoge1xuICAgICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiZG93bmxvYWRzXCI6IHtcbiAgICAgICAgICBcImNhbmNlbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRvd25sb2FkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXJhc2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRGaWxlSWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJwYXVzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZpbGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN1bWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiZXh0ZW5zaW9uXCI6IHtcbiAgICAgICAgICBcImlzQWxsb3dlZEZpbGVTY2hlbWVBY2Nlc3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpc0FsbG93ZWRJbmNvZ25pdG9BY2Nlc3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJoaXN0b3J5XCI6IHtcbiAgICAgICAgICBcImFkZFVybFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlbGV0ZUFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlbGV0ZVJhbmdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VmlzaXRzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VhcmNoXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaTE4blwiOiB7XG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFjY2VwdExhbmd1YWdlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImlkZW50aXR5XCI6IHtcbiAgICAgICAgICBcImxhdW5jaFdlYkF1dGhGbG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRsZVwiOiB7XG4gICAgICAgICAgXCJxdWVyeVN0YXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibWFuYWdlbWVudFwiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRTZWxmXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0RW5hYmxlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInVuaW5zdGFsbFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJub3RpZmljYXRpb25zXCI6IHtcbiAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UGVybWlzc2lvbkxldmVsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGFnZUFjdGlvblwiOiB7XG4gICAgICAgICAgXCJnZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaGlkZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2hvd1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInBlcm1pc3Npb25zXCI6IHtcbiAgICAgICAgICBcImNvbnRhaW5zXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVxdWVzdFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInJ1bnRpbWVcIjoge1xuICAgICAgICAgIFwiZ2V0QmFja2dyb3VuZFBhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQbGF0Zm9ybUluZm9cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuT3B0aW9uc1BhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0VXBkYXRlQ2hlY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmROYXRpdmVNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VW5pbnN0YWxsVVJMXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic2Vzc2lvbnNcIjoge1xuICAgICAgICAgIFwiZ2V0RGV2aWNlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudGx5Q2xvc2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVzdG9yZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInN0b3JhZ2VcIjoge1xuICAgICAgICAgIFwibG9jYWxcIjoge1xuICAgICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRCeXRlc0luVXNlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtYW5hZ2VkXCI6IHtcbiAgICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRCeXRlc0luVXNlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN5bmNcIjoge1xuICAgICAgICAgICAgXCJjbGVhclwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRCeXRlc0luVXNlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0YWJzXCI6IHtcbiAgICAgICAgICBcImNhcHR1cmVWaXNpYmxlVGFiXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGV0ZWN0TGFuZ3VhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkaXNjYXJkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZHVwbGljYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXhlY3V0ZVNjcmlwdFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEN1cnJlbnRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Wm9vbVNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ29CYWNrXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ29Gb3J3YXJkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaGlnaGxpZ2h0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaW5zZXJ0Q1NTXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInF1ZXJ5XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVsb2FkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ1NTXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogM1xuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0Wm9vbVNldHRpbmdzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwidG9wU2l0ZXNcIjoge1xuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViTmF2aWdhdGlvblwiOiB7XG4gICAgICAgICAgXCJnZXRBbGxGcmFtZXNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRGcmFtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIndlYlJlcXVlc3RcIjoge1xuICAgICAgICAgIFwiaGFuZGxlckJlaGF2aW9yQ2hhbmdlZFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIndpbmRvd3NcIjoge1xuICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldExhc3RGb2N1c2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBkYXRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmIChPYmplY3Qua2V5cyhhcGlNZXRhZGF0YSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImFwaS1tZXRhZGF0YS5qc29uIGhhcyBub3QgYmVlbiBpbmNsdWRlZCBpbiBicm93c2VyLXBvbHlmaWxsXCIpO1xuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiBBIFdlYWtNYXAgc3ViY2xhc3Mgd2hpY2ggY3JlYXRlcyBhbmQgc3RvcmVzIGEgdmFsdWUgZm9yIGFueSBrZXkgd2hpY2ggZG9lc1xuICAgICAgICogbm90IGV4aXN0IHdoZW4gYWNjZXNzZWQsIGJ1dCBiZWhhdmVzIGV4YWN0bHkgYXMgYW4gb3JkaW5hcnkgV2Vha01hcFxuICAgICAgICogb3RoZXJ3aXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNyZWF0ZUl0ZW1cbiAgICAgICAqICAgICAgICBBIGZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgY2FsbGVkIGluIG9yZGVyIHRvIGNyZWF0ZSB0aGUgdmFsdWUgZm9yIGFueVxuICAgICAgICogICAgICAgIGtleSB3aGljaCBkb2VzIG5vdCBleGlzdCwgdGhlIGZpcnN0IHRpbWUgaXQgaXMgYWNjZXNzZWQuIFRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHJlY2VpdmVzLCBhcyBpdHMgb25seSBhcmd1bWVudCwgdGhlIGtleSBiZWluZyBjcmVhdGVkLlxuICAgICAgICovXG5cblxuICAgICAgY2xhc3MgRGVmYXVsdFdlYWtNYXAgZXh0ZW5kcyBXZWFrTWFwIHtcbiAgICAgICAgY29uc3RydWN0b3IoY3JlYXRlSXRlbSwgaXRlbXMgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzdXBlcihpdGVtcyk7XG4gICAgICAgICAgdGhpcy5jcmVhdGVJdGVtID0gY3JlYXRlSXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldChrZXkpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgdGhpcy5jcmVhdGVJdGVtKGtleSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBzdXBlci5nZXQoa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGFuIG9iamVjdCB3aXRoIGEgYHRoZW5gIG1ldGhvZCwgYW5kIGNhblxuICAgICAgICogdGhlcmVmb3JlIGJlIGFzc3VtZWQgdG8gYmVoYXZlIGFzIGEgUHJvbWlzZS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICAgICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHRoZW5hYmxlLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3QgaXNUaGVuYWJsZSA9IHZhbHVlID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gXCJmdW5jdGlvblwiO1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoLCB3aGVuIGNhbGxlZCwgd2lsbCByZXNvbHZlIG9yIHJlamVjdFxuICAgICAgICogdGhlIGdpdmVuIHByb21pc2UgYmFzZWQgb24gaG93IGl0IGlzIGNhbGxlZDpcbiAgICAgICAqXG4gICAgICAgKiAtIElmLCB3aGVuIGNhbGxlZCwgYGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcmAgY29udGFpbnMgYSBub24tbnVsbCBvYmplY3QsXG4gICAgICAgKiAgIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIHdpdGggdGhhdCB2YWx1ZS5cbiAgICAgICAqIC0gSWYgdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRoIGV4YWN0bHkgb25lIGFyZ3VtZW50LCB0aGUgcHJvbWlzZSBpc1xuICAgICAgICogICByZXNvbHZlZCB0byB0aGF0IHZhbHVlLlxuICAgICAgICogLSBPdGhlcndpc2UsIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHRvIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIG9mIHRoZVxuICAgICAgICogICBmdW5jdGlvbidzIGFyZ3VtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvbWlzZVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSByZXNvbHV0aW9uIGFuZCByZWplY3Rpb24gZnVuY3Rpb25zIG9mIGFcbiAgICAgICAqICAgICAgICBwcm9taXNlLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvbWlzZS5yZXNvbHZlXG4gICAgICAgKiAgICAgICAgVGhlIHByb21pc2UncyByZXNvbHV0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvbWlzZS5yZWplY3RcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlamVjdGlvbiBmdW5jdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSB3cmFwcGVkIG1ldGhvZCB3aGljaCBoYXMgY3JlYXRlZCB0aGUgY2FsbGJhY2suXG4gICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnXG4gICAgICAgKiAgICAgICAgV2hldGhlciBvciBub3QgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCBvbmx5IHRoZSBmaXJzdFxuICAgICAgICogICAgICAgIGFyZ3VtZW50IG9mIHRoZSBjYWxsYmFjaywgYWx0ZXJuYXRpdmVseSBhbiBhcnJheSBvZiBhbGwgdGhlXG4gICAgICAgKiAgICAgICAgY2FsbGJhY2sgYXJndW1lbnRzIGlzIHJlc29sdmVkLiBCeSBkZWZhdWx0LCBpZiB0aGUgY2FsbGJhY2tcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGggb25seSBhIHNpbmdsZSBhcmd1bWVudCwgdGhhdCB3aWxsIGJlXG4gICAgICAgKiAgICAgICAgcmVzb2x2ZWQgdG8gdGhlIHByb21pc2UsIHdoaWxlIGFsbCBhcmd1bWVudHMgd2lsbCBiZSByZXNvbHZlZCBhc1xuICAgICAgICogICAgICAgIGFuIGFycmF5IGlmIG11bHRpcGxlIGFyZSBnaXZlbi5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gICAgICAgKiAgICAgICAgVGhlIGdlbmVyYXRlZCBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IG1ha2VDYWxsYmFjayA9IChwcm9taXNlLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gKC4uLmNhbGxiYWNrQXJncykgPT4ge1xuICAgICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyB8fCBjYWxsYmFja0FyZ3MubGVuZ3RoIDw9IDEgJiYgbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmcgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzWzBdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvbWlzZS5yZXNvbHZlKGNhbGxiYWNrQXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgY29uc3QgcGx1cmFsaXplQXJndW1lbnRzID0gbnVtQXJncyA9PiBudW1BcmdzID09IDEgPyBcImFyZ3VtZW50XCIgOiBcImFyZ3VtZW50c1wiO1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGEgd3JhcHBlciBmdW5jdGlvbiBmb3IgYSBtZXRob2Qgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBhbmQgbWV0YWRhdGEuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgICAqICAgICAgICBUaGUgbmFtZSBvZiB0aGUgbWV0aG9kIHdoaWNoIGlzIGJlaW5nIHdyYXBwZWQuXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGFcbiAgICAgICAqICAgICAgICBNZXRhZGF0YSBhYm91dCB0aGUgbWV0aG9kIGJlaW5nIHdyYXBwZWQuXG4gICAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IG1ldGFkYXRhLm1pbkFyZ3NcbiAgICAgICAqICAgICAgICBUaGUgbWluaW11bSBudW1iZXIgb2YgYXJndW1lbnRzIHdoaWNoIG11c3QgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBmZXdlciB0aGFuIHRoaXMgbnVtYmVyIG9mIGFyZ3VtZW50cywgdGhlXG4gICAgICAgKiAgICAgICAgd3JhcHBlciB3aWxsIHJhaXNlIGFuIGV4Y2VwdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWF4QXJnc1xuICAgICAgICogICAgICAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbWF5IGJlIHBhc3NlZCB0byB0aGVcbiAgICAgICAqICAgICAgICBmdW5jdGlvbi4gSWYgY2FsbGVkIHdpdGggbW9yZSB0aGFuIHRoaXMgbnVtYmVyIG9mIGFyZ3VtZW50cywgdGhlXG4gICAgICAgKiAgICAgICAgd3JhcHBlciB3aWxsIHJhaXNlIGFuIGV4Y2VwdGlvbi5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmdcbiAgICAgICAqICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG9ubHkgdGhlIGZpcnN0XG4gICAgICAgKiAgICAgICAgYXJndW1lbnQgb2YgdGhlIGNhbGxiYWNrLCBhbHRlcm5hdGl2ZWx5IGFuIGFycmF5IG9mIGFsbCB0aGVcbiAgICAgICAqICAgICAgICBjYWxsYmFjayBhcmd1bWVudHMgaXMgcmVzb2x2ZWQuIEJ5IGRlZmF1bHQsIGlmIHRoZSBjYWxsYmFja1xuICAgICAgICogICAgICAgIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBvbmx5IGEgc2luZ2xlIGFyZ3VtZW50LCB0aGF0IHdpbGwgYmVcbiAgICAgICAqICAgICAgICByZXNvbHZlZCB0byB0aGUgcHJvbWlzZSwgd2hpbGUgYWxsIGFyZ3VtZW50cyB3aWxsIGJlIHJlc29sdmVkIGFzXG4gICAgICAgKiAgICAgICAgYW4gYXJyYXkgaWYgbXVsdGlwbGUgYXJlIGdpdmVuLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbihvYmplY3QsIC4uLiopfVxuICAgICAgICogICAgICAgVGhlIGdlbmVyYXRlZCB3cmFwcGVyIGZ1bmN0aW9uLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3Qgd3JhcEFzeW5jRnVuY3Rpb24gPSAobmFtZSwgbWV0YWRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGFzeW5jRnVuY3Rpb25XcmFwcGVyKHRhcmdldCwgLi4uYXJncykge1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IG1ldGFkYXRhLm1pbkFyZ3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbGVhc3QgJHttZXRhZGF0YS5taW5BcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5taW5BcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gbWV0YWRhdGEubWF4QXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBtb3N0ICR7bWV0YWRhdGEubWF4QXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWF4QXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEuZmFsbGJhY2tUb05vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBBUEkgbWV0aG9kIGhhcyBjdXJyZW50bHkgbm8gY2FsbGJhY2sgb24gQ2hyb21lLCBidXQgaXQgcmV0dXJuIGEgcHJvbWlzZSBvbiBGaXJlZm94LFxuICAgICAgICAgICAgICAvLyBhbmQgc28gdGhlIHBvbHlmaWxsIHdpbGwgdHJ5IHRvIGNhbGwgaXQgd2l0aCBhIGNhbGxiYWNrIGZpcnN0LCBhbmQgaXQgd2lsbCBmYWxsYmFja1xuICAgICAgICAgICAgICAvLyB0byBub3QgcGFzc2luZyB0aGUgY2FsbGJhY2sgaWYgdGhlIGZpcnN0IGNhbGwgZmFpbHMuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MsIG1ha2VDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgICAgfSwgbWV0YWRhdGEpKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoY2JFcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtuYW1lfSBBUEkgbWV0aG9kIGRvZXNuJ3Qgc2VlbSB0byBzdXBwb3J0IHRoZSBjYWxsYmFjayBwYXJhbWV0ZXIsIGAgKyBcImZhbGxpbmcgYmFjayB0byBjYWxsIGl0IHdpdGhvdXQgYSBjYWxsYmFjazogXCIsIGNiRXJyb3IpO1xuICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzKTsgLy8gVXBkYXRlIHRoZSBBUEkgbWV0aG9kIG1ldGFkYXRhLCBzbyB0aGF0IHRoZSBuZXh0IEFQSSBjYWxscyB3aWxsIG5vdCB0cnkgdG9cbiAgICAgICAgICAgICAgICAvLyB1c2UgdGhlIHVuc3VwcG9ydGVkIGNhbGxiYWNrIGFueW1vcmUuXG5cbiAgICAgICAgICAgICAgICBtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhLm5vQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YS5ub0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIHRhcmdldFtuYW1lXSguLi5hcmdzKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MsIG1ha2VDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgfSwgbWV0YWRhdGEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIFdyYXBzIGFuIGV4aXN0aW5nIG1ldGhvZCBvZiB0aGUgdGFyZ2V0IG9iamVjdCwgc28gdGhhdCBjYWxscyB0byBpdCBhcmVcbiAgICAgICAqIGludGVyY2VwdGVkIGJ5IHRoZSBnaXZlbiB3cmFwcGVyIGZ1bmN0aW9uLiBUaGUgd3JhcHBlciBmdW5jdGlvbiByZWNlaXZlcyxcbiAgICAgICAqIGFzIGl0cyBmaXJzdCBhcmd1bWVudCwgdGhlIG9yaWdpbmFsIGB0YXJnZXRgIG9iamVjdCwgZm9sbG93ZWQgYnkgZWFjaCBvZlxuICAgICAgICogdGhlIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIG9yaWdpbmFsIG1ldGhvZC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gICAgICAgKiAgICAgICAgVGhlIG9yaWdpbmFsIHRhcmdldCBvYmplY3QgdGhhdCB0aGUgd3JhcHBlZCBtZXRob2QgYmVsb25ncyB0by5cbiAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1ldGhvZFxuICAgICAgICogICAgICAgIFRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC4gVGhpcyBpcyB1c2VkIGFzIHRoZSB0YXJnZXQgb2YgdGhlIFByb3h5XG4gICAgICAgKiAgICAgICAgb2JqZWN0IHdoaWNoIGlzIGNyZWF0ZWQgdG8gd3JhcCB0aGUgbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gd3JhcHBlclxuICAgICAgICogICAgICAgIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCBpbiBwbGFjZSBvZiBhIGRpcmVjdCBpbnZvY2F0aW9uXG4gICAgICAgKiAgICAgICAgb2YgdGhlIHdyYXBwZWQgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtQcm94eTxmdW5jdGlvbj59XG4gICAgICAgKiAgICAgICAgQSBQcm94eSBvYmplY3QgZm9yIHRoZSBnaXZlbiBtZXRob2QsIHdoaWNoIGludm9rZXMgdGhlIGdpdmVuIHdyYXBwZXJcbiAgICAgICAqICAgICAgICBtZXRob2QgaW4gaXRzIHBsYWNlLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3Qgd3JhcE1ldGhvZCA9ICh0YXJnZXQsIG1ldGhvZCwgd3JhcHBlcikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KG1ldGhvZCwge1xuICAgICAgICAgIGFwcGx5KHRhcmdldE1ldGhvZCwgdGhpc09iaiwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBwZXIuY2FsbCh0aGlzT2JqLCB0YXJnZXQsIC4uLmFyZ3MpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBoYXNPd25Qcm9wZXJ0eSA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gb2JqZWN0IGluIGEgUHJveHkgd2hpY2ggaW50ZXJjZXB0cyBhbmQgd3JhcHMgY2VydGFpbiBtZXRob2RzXG4gICAgICAgKiBiYXNlZCBvbiB0aGUgZ2l2ZW4gYHdyYXBwZXJzYCBhbmQgYG1ldGFkYXRhYCBvYmplY3RzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgdGFyZ2V0IG9iamVjdCB0byB3cmFwLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbd3JhcHBlcnMgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBzcGVjaWFsIGNhc2VzLiBBbnlcbiAgICAgICAqICAgICAgICBmdW5jdGlvbiBwcmVzZW50IGluIHRoaXMgb2JqZWN0IHRyZWUgaXMgY2FsbGVkIGluIHBsYWNlIG9mIHRoZVxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiB0aGUgc2FtZSBsb2NhdGlvbiBpbiB0aGUgYHRhcmdldGAgb2JqZWN0IHRyZWUuIFRoZXNlXG4gICAgICAgKiAgICAgICAgd3JhcHBlciBtZXRob2RzIGFyZSBpbnZva2VkIGFzIGRlc2NyaWJlZCBpbiB7QHNlZSB3cmFwTWV0aG9kfS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge29iamVjdH0gW21ldGFkYXRhID0ge31dXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IHRyZWUgY29udGFpbmluZyBtZXRhZGF0YSB1c2VkIHRvIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVcbiAgICAgICAqICAgICAgICBQcm9taXNlLWJhc2VkIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBhc3luY2hyb25vdXMuIEFueSBmdW5jdGlvbiBpblxuICAgICAgICogICAgICAgIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZSB3aGljaCBoYXMgYSBjb3JyZXNwb25kaW5nIG1ldGFkYXRhIG9iamVjdFxuICAgICAgICogICAgICAgIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgbWV0YWRhdGFgIHRyZWUgaXMgcmVwbGFjZWQgd2l0aCBhblxuICAgICAgICogICAgICAgIGF1dG9tYXRpY2FsbHktZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24sIGFzIGRlc2NyaWJlZCBpblxuICAgICAgICogICAgICAgIHtAc2VlIHdyYXBBc3luY0Z1bmN0aW9ufVxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtQcm94eTxvYmplY3Q+fVxuICAgICAgICovXG5cbiAgICAgIGNvbnN0IHdyYXBPYmplY3QgPSAodGFyZ2V0LCB3cmFwcGVycyA9IHt9LCBtZXRhZGF0YSA9IHt9KSA9PiB7XG4gICAgICAgIGxldCBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGxldCBoYW5kbGVycyA9IHtcbiAgICAgICAgICBoYXMocHJveHlUYXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wIGluIHRhcmdldCB8fCBwcm9wIGluIGNhY2hlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBnZXQocHJveHlUYXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICBpZiAocHJvcCBpbiBjYWNoZSkge1xuICAgICAgICAgICAgICByZXR1cm4gY2FjaGVbcHJvcF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKHByb3AgaW4gdGFyZ2V0KSkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0YXJnZXRbcHJvcF07XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIG9uIHRoZSB1bmRlcmx5aW5nIG9iamVjdC4gQ2hlY2sgaWYgd2UgbmVlZCB0byBkb1xuICAgICAgICAgICAgICAvLyBhbnkgd3JhcHBpbmcuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygd3JhcHBlcnNbcHJvcF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgYSBzcGVjaWFsLWNhc2Ugd3JhcHBlciBmb3IgdGhpcyBtZXRob2QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyc1twcm9wXSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhbiBhc3luYyBtZXRob2QgdGhhdCB3ZSBoYXZlIG1ldGFkYXRhIGZvci4gQ3JlYXRlIGFcbiAgICAgICAgICAgICAgICAvLyBQcm9taXNlIHdyYXBwZXIgZm9yIGl0LlxuICAgICAgICAgICAgICAgIGxldCB3cmFwcGVyID0gd3JhcEFzeW5jRnVuY3Rpb24ocHJvcCwgbWV0YWRhdGFbcHJvcF0pO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gd3JhcE1ldGhvZCh0YXJnZXQsIHRhcmdldFtwcm9wXSwgd3JhcHBlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhIG1ldGhvZCB0aGF0IHdlIGRvbid0IGtub3cgb3IgY2FyZSBhYm91dC4gUmV0dXJuIHRoZVxuICAgICAgICAgICAgICAgIC8vIG9yaWdpbmFsIG1ldGhvZCwgYm91bmQgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0LlxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuYmluZCh0YXJnZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAoaGFzT3duUHJvcGVydHkod3JhcHBlcnMsIHByb3ApIHx8IGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBwcm9wKSkpIHtcbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBhbiBvYmplY3QgdGhhdCB3ZSBuZWVkIHRvIGRvIHNvbWUgd3JhcHBpbmcgZm9yIHRoZSBjaGlsZHJlblxuICAgICAgICAgICAgICAvLyBvZi4gQ3JlYXRlIGEgc3ViLW9iamVjdCB3cmFwcGVyIGZvciBpdCB3aXRoIHRoZSBhcHByb3ByaWF0ZSBjaGlsZFxuICAgICAgICAgICAgICAvLyBtZXRhZGF0YS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbcHJvcF0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgXCIqXCIpKSB7XG4gICAgICAgICAgICAgIC8vIFdyYXAgYWxsIHByb3BlcnRpZXMgaW4gKiBuYW1lc3BhY2UuXG4gICAgICAgICAgICAgIHZhbHVlID0gd3JhcE9iamVjdCh2YWx1ZSwgd3JhcHBlcnNbcHJvcF0sIG1ldGFkYXRhW1wiKlwiXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBXZSBkb24ndCBuZWVkIHRvIGRvIGFueSB3cmFwcGluZyBmb3IgdGhpcyBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgLy8gc28ganVzdCBmb3J3YXJkIGFsbCBhY2Nlc3MgdG8gdGhlIHVuZGVybHlpbmcgb2JqZWN0LlxuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2FjaGUsIHByb3AsIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcblxuICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcF07XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHNldChwcm94eVRhcmdldCwgcHJvcCwgdmFsdWUsIHJlY2VpdmVyKSB7XG4gICAgICAgICAgICBpZiAocHJvcCBpbiBjYWNoZSkge1xuICAgICAgICAgICAgICBjYWNoZVtwcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBkZWZpbmVQcm9wZXJ0eShwcm94eVRhcmdldCwgcHJvcCwgZGVzYykge1xuICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoY2FjaGUsIHByb3AsIGRlc2MpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBkZWxldGVQcm9wZXJ0eShwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkoY2FjaGUsIHByb3ApO1xuICAgICAgICAgIH1cblxuICAgICAgICB9OyAvLyBQZXIgY29udHJhY3Qgb2YgdGhlIFByb3h5IEFQSSwgdGhlIFwiZ2V0XCIgcHJveHkgaGFuZGxlciBtdXN0IHJldHVybiB0aGVcbiAgICAgICAgLy8gb3JpZ2luYWwgdmFsdWUgb2YgdGhlIHRhcmdldCBpZiB0aGF0IHZhbHVlIGlzIGRlY2xhcmVkIHJlYWQtb25seSBhbmRcbiAgICAgICAgLy8gbm9uLWNvbmZpZ3VyYWJsZS4gRm9yIHRoaXMgcmVhc29uLCB3ZSBjcmVhdGUgYW4gb2JqZWN0IHdpdGggdGhlXG4gICAgICAgIC8vIHByb3RvdHlwZSBzZXQgdG8gYHRhcmdldGAgaW5zdGVhZCBvZiB1c2luZyBgdGFyZ2V0YCBkaXJlY3RseS5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHdlIGNhbm5vdCByZXR1cm4gYSBjdXN0b20gb2JqZWN0IGZvciBBUElzIHRoYXRcbiAgICAgICAgLy8gYXJlIGRlY2xhcmVkIHJlYWQtb25seSBhbmQgbm9uLWNvbmZpZ3VyYWJsZSwgc3VjaCBhcyBgY2hyb21lLmRldnRvb2xzYC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGhlIHByb3h5IGhhbmRsZXJzIHRoZW1zZWx2ZXMgd2lsbCBzdGlsbCB1c2UgdGhlIG9yaWdpbmFsIGB0YXJnZXRgXG4gICAgICAgIC8vIGluc3RlYWQgb2YgdGhlIGBwcm94eVRhcmdldGAsIHNvIHRoYXQgdGhlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgYXJlXG4gICAgICAgIC8vIGRlcmVmZXJlbmNlZCB2aWEgdGhlIG9yaWdpbmFsIHRhcmdldHMuXG5cbiAgICAgICAgbGV0IHByb3h5VGFyZ2V0ID0gT2JqZWN0LmNyZWF0ZSh0YXJnZXQpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHByb3h5VGFyZ2V0LCBoYW5kbGVycyk7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGEgc2V0IG9mIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBhbiBldmVudCBvYmplY3QsIHdoaWNoIGhhbmRsZXNcbiAgICAgICAqIHdyYXBwaW5nIG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0aGF0IHRob3NlIG1lc3NhZ2VzIGFyZSBwYXNzZWQuXG4gICAgICAgKlxuICAgICAgICogQSBzaW5nbGUgd3JhcHBlciBpcyBjcmVhdGVkIGZvciBlYWNoIGxpc3RlbmVyIGZ1bmN0aW9uLCBhbmQgc3RvcmVkIGluIGFcbiAgICAgICAqIG1hcC4gU3Vic2VxdWVudCBjYWxscyB0byBgYWRkTGlzdGVuZXJgLCBgaGFzTGlzdGVuZXJgLCBvciBgcmVtb3ZlTGlzdGVuZXJgXG4gICAgICAgKiByZXRyaWV2ZSB0aGUgb3JpZ2luYWwgd3JhcHBlciwgc28gdGhhdCAgYXR0ZW1wdHMgdG8gcmVtb3ZlIGFcbiAgICAgICAqIHByZXZpb3VzbHktYWRkZWQgbGlzdGVuZXIgd29yayBhcyBleHBlY3RlZC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge0RlZmF1bHRXZWFrTWFwPGZ1bmN0aW9uLCBmdW5jdGlvbj59IHdyYXBwZXJNYXBcbiAgICAgICAqICAgICAgICBBIERlZmF1bHRXZWFrTWFwIG9iamVjdCB3aGljaCB3aWxsIGNyZWF0ZSB0aGUgYXBwcm9wcmlhdGUgd3JhcHBlclxuICAgICAgICogICAgICAgIGZvciBhIGdpdmVuIGxpc3RlbmVyIGZ1bmN0aW9uIHdoZW4gb25lIGRvZXMgbm90IGV4aXN0LCBhbmQgcmV0cmlldmVcbiAgICAgICAqICAgICAgICBhbiBleGlzdGluZyBvbmUgd2hlbiBpdCBkb2VzLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwRXZlbnQgPSB3cmFwcGVyTWFwID0+ICh7XG4gICAgICAgIGFkZExpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIsIC4uLmFyZ3MpIHtcbiAgICAgICAgICB0YXJnZXQuYWRkTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpLCAuLi5hcmdzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYXNMaXN0ZW5lcih0YXJnZXQsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgcmV0dXJuIHRhcmdldC5oYXNMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICB0YXJnZXQucmVtb3ZlTGlzdGVuZXIod3JhcHBlck1hcC5nZXQobGlzdGVuZXIpKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgb25SZXF1ZXN0RmluaXNoZWRXcmFwcGVycyA9IG5ldyBEZWZhdWx0V2Vha01hcChsaXN0ZW5lciA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHJldHVybiBsaXN0ZW5lcjtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV3JhcHMgYW4gb25SZXF1ZXN0RmluaXNoZWQgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCB3aWxsIHJldHVybiBhXG4gICAgICAgICAqIGBnZXRDb250ZW50KClgIHByb3BlcnR5IHdoaWNoIHJldHVybnMgYSBgUHJvbWlzZWAgcmF0aGVyIHRoYW4gdXNpbmcgYVxuICAgICAgICAgKiBjYWxsYmFjayBBUEkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXFcbiAgICAgICAgICogICAgICAgIFRoZSBIQVIgZW50cnkgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbmV0d29yayByZXF1ZXN0LlxuICAgICAgICAgKi9cblxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBvblJlcXVlc3RGaW5pc2hlZChyZXEpIHtcbiAgICAgICAgICBjb25zdCB3cmFwcGVkUmVxID0gd3JhcE9iamVjdChyZXEsIHt9XG4gICAgICAgICAgLyogd3JhcHBlcnMgKi9cbiAgICAgICAgICAsIHtcbiAgICAgICAgICAgIGdldENvbnRlbnQ6IHtcbiAgICAgICAgICAgICAgbWluQXJnczogMCxcbiAgICAgICAgICAgICAgbWF4QXJnczogMFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxpc3RlbmVyKHdyYXBwZWRSZXEpO1xuICAgICAgICB9O1xuICAgICAgfSk7IC8vIEtlZXAgdHJhY2sgaWYgdGhlIGRlcHJlY2F0aW9uIHdhcm5pbmcgaGFzIGJlZW4gbG9nZ2VkIGF0IGxlYXN0IG9uY2UuXG5cbiAgICAgIGxldCBsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcgPSBmYWxzZTtcbiAgICAgIGNvbnN0IG9uTWVzc2FnZVdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhIG1lc3NhZ2UgbGlzdGVuZXIgZnVuY3Rpb24gc28gdGhhdCBpdCBtYXkgc2VuZCByZXNwb25zZXMgYmFzZWQgb25cbiAgICAgICAgICogaXRzIHJldHVybiB2YWx1ZSwgcmF0aGVyIHRoYW4gYnkgcmV0dXJuaW5nIGEgc2VudGluZWwgdmFsdWUgYW5kIGNhbGxpbmcgYVxuICAgICAgICAgKiBjYWxsYmFjay4gSWYgdGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHJldHVybnMgYSBQcm9taXNlLCB0aGUgcmVzcG9uc2UgaXNcbiAgICAgICAgICogc2VudCB3aGVuIHRoZSBwcm9taXNlIGVpdGhlciByZXNvbHZlcyBvciByZWplY3RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0geyp9IG1lc3NhZ2VcbiAgICAgICAgICogICAgICAgIFRoZSBtZXNzYWdlIHNlbnQgYnkgdGhlIG90aGVyIGVuZCBvZiB0aGUgY2hhbm5lbC5cbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHNlbmRlclxuICAgICAgICAgKiAgICAgICAgRGV0YWlscyBhYm91dCB0aGUgc2VuZGVyIG9mIHRoZSBtZXNzYWdlLlxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCopfSBzZW5kUmVzcG9uc2VcbiAgICAgICAgICogICAgICAgIEEgY2FsbGJhY2sgd2hpY2gsIHdoZW4gY2FsbGVkIHdpdGggYW4gYXJiaXRyYXJ5IGFyZ3VtZW50LCBzZW5kc1xuICAgICAgICAgKiAgICAgICAgdGhhdCB2YWx1ZSBhcyBhIHJlc3BvbnNlLlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICogICAgICAgIFRydWUgaWYgdGhlIHdyYXBwZWQgbGlzdGVuZXIgcmV0dXJuZWQgYSBQcm9taXNlLCB3aGljaCB3aWxsIGxhdGVyXG4gICAgICAgICAqICAgICAgICB5aWVsZCBhIHJlc3BvbnNlLiBGYWxzZSBvdGhlcndpc2UuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uTWVzc2FnZShtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgICAgICAgIGxldCBkaWRDYWxsU2VuZFJlc3BvbnNlID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHdyYXBwZWRTZW5kUmVzcG9uc2U7XG4gICAgICAgICAgbGV0IHNlbmRSZXNwb25zZVByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHdyYXBwZWRTZW5kUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgaWYgKCFsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oU0VORF9SRVNQT05TRV9ERVBSRUNBVElPTl9XQVJOSU5HLCBuZXcgRXJyb3IoKS5zdGFjayk7XG4gICAgICAgICAgICAgICAgbG9nZ2VkU2VuZFJlc3BvbnNlRGVwcmVjYXRpb25XYXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGRpZENhbGxTZW5kUmVzcG9uc2UgPSB0cnVlO1xuICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSBsaXN0ZW5lcihtZXNzYWdlLCBzZW5kZXIsIHdyYXBwZWRTZW5kUmVzcG9uc2UpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVzdWx0ID0gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBpc1Jlc3VsdFRoZW5hYmxlID0gcmVzdWx0ICE9PSB0cnVlICYmIGlzVGhlbmFibGUocmVzdWx0KTsgLy8gSWYgdGhlIGxpc3RlbmVyIGRpZG4ndCByZXR1cm5lZCB0cnVlIG9yIGEgUHJvbWlzZSwgb3IgY2FsbGVkXG4gICAgICAgICAgLy8gd3JhcHBlZFNlbmRSZXNwb25zZSBzeW5jaHJvbm91c2x5LCB3ZSBjYW4gZXhpdCBlYXJsaWVyXG4gICAgICAgICAgLy8gYmVjYXVzZSB0aGVyZSB3aWxsIGJlIG5vIHJlc3BvbnNlIHNlbnQgZnJvbSB0aGlzIGxpc3RlbmVyLlxuXG4gICAgICAgICAgaWYgKHJlc3VsdCAhPT0gdHJ1ZSAmJiAhaXNSZXN1bHRUaGVuYWJsZSAmJiAhZGlkQ2FsbFNlbmRSZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gLy8gQSBzbWFsbCBoZWxwZXIgdG8gc2VuZCB0aGUgbWVzc2FnZSBpZiB0aGUgcHJvbWlzZSByZXNvbHZlc1xuICAgICAgICAgIC8vIGFuZCBhbiBlcnJvciBpZiB0aGUgcHJvbWlzZSByZWplY3RzIChhIHdyYXBwZWQgc2VuZE1lc3NhZ2UgaGFzXG4gICAgICAgICAgLy8gdG8gdHJhbnNsYXRlIHRoZSBtZXNzYWdlIGludG8gYSByZXNvbHZlZCBwcm9taXNlIG9yIGEgcmVqZWN0ZWRcbiAgICAgICAgICAvLyBwcm9taXNlKS5cblxuXG4gICAgICAgICAgY29uc3Qgc2VuZFByb21pc2VkUmVzdWx0ID0gcHJvbWlzZSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4obXNnID0+IHtcbiAgICAgICAgICAgICAgLy8gc2VuZCB0aGUgbWVzc2FnZSB2YWx1ZS5cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKG1zZyk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIC8vIFNlbmQgYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBlcnJvciBpZiB0aGUgcmVqZWN0ZWQgdmFsdWVcbiAgICAgICAgICAgICAgLy8gaXMgYW4gaW5zdGFuY2Ugb2YgZXJyb3IsIG9yIHRoZSBvYmplY3QgaXRzZWxmIG90aGVyd2lzZS5cbiAgICAgICAgICAgICAgbGV0IG1lc3NhZ2U7XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yICYmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yIHx8IHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSBcInN0cmluZ1wiKSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBcIkFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWRcIjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7XG4gICAgICAgICAgICAgICAgX19tb3pXZWJFeHRlbnNpb25Qb2x5ZmlsbFJlamVjdF9fOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAvLyBQcmludCBhbiBlcnJvciBvbiB0aGUgY29uc29sZSBpZiB1bmFibGUgdG8gc2VuZCB0aGUgcmVzcG9uc2UuXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc2VuZCBvbk1lc3NhZ2UgcmVqZWN0ZWQgcmVwbHlcIiwgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07IC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5lZCBhIFByb21pc2UsIHNlbmQgdGhlIHJlc29sdmVkIHZhbHVlIGFzIGFcbiAgICAgICAgICAvLyByZXN1bHQsIG90aGVyd2lzZSB3YWl0IHRoZSBwcm9taXNlIHJlbGF0ZWQgdG8gdGhlIHdyYXBwZWRTZW5kUmVzcG9uc2VcbiAgICAgICAgICAvLyBjYWxsYmFjayB0byByZXNvbHZlIGFuZCBzZW5kIGl0IGFzIGEgcmVzcG9uc2UuXG5cblxuICAgICAgICAgIGlmIChpc1Jlc3VsdFRoZW5hYmxlKSB7XG4gICAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VuZFByb21pc2VkUmVzdWx0KHNlbmRSZXNwb25zZVByb21pc2UpO1xuICAgICAgICAgIH0gLy8gTGV0IENocm9tZSBrbm93IHRoYXQgdGhlIGxpc3RlbmVyIGlzIHJlcGx5aW5nLlxuXG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjayA9ICh7XG4gICAgICAgIHJlamVjdCxcbiAgICAgICAgcmVzb2x2ZVxuICAgICAgfSwgcmVwbHkpID0+IHtcbiAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAvLyBEZXRlY3Qgd2hlbiBub25lIG9mIHRoZSBsaXN0ZW5lcnMgcmVwbGllZCB0byB0aGUgc2VuZE1lc3NhZ2UgY2FsbCBhbmQgcmVzb2x2ZVxuICAgICAgICAgIC8vIHRoZSBwcm9taXNlIHRvIHVuZGVmaW5lZCBhcyBpbiBGaXJlZm94LlxuICAgICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS93ZWJleHRlbnNpb24tcG9seWZpbGwvaXNzdWVzLzEzMFxuICAgICAgICAgIGlmIChleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UgPT09IENIUk9NRV9TRU5EX01FU1NBR0VfQ0FMTEJBQ0tfTk9fUkVTUE9OU0VfTUVTU0FHRSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChyZXBseSAmJiByZXBseS5fX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X18pIHtcbiAgICAgICAgICAvLyBDb252ZXJ0IGJhY2sgdGhlIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGludG9cbiAgICAgICAgICAvLyBhbiBFcnJvciBpbnN0YW5jZS5cbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKHJlcGx5Lm1lc3NhZ2UpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlcGx5KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgY29uc3Qgd3JhcHBlZFNlbmRNZXNzYWdlID0gKG5hbWUsIG1ldGFkYXRhLCBhcGlOYW1lc3BhY2VPYmosIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgYXQgbGVhc3QgJHttZXRhZGF0YS5taW5BcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5taW5BcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBtb3N0ICR7bWV0YWRhdGEubWF4QXJnc30gJHtwbHVyYWxpemVBcmd1bWVudHMobWV0YWRhdGEubWF4QXJncyl9IGZvciAke25hbWV9KCksIGdvdCAke2FyZ3MubGVuZ3RofWApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBjb25zdCB3cmFwcGVkQ2IgPSB3cmFwcGVkU2VuZE1lc3NhZ2VDYWxsYmFjay5iaW5kKG51bGwsIHtcbiAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICByZWplY3RcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhcmdzLnB1c2god3JhcHBlZENiKTtcbiAgICAgICAgICBhcGlOYW1lc3BhY2VPYmouc2VuZE1lc3NhZ2UoLi4uYXJncyk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgc3RhdGljV3JhcHBlcnMgPSB7XG4gICAgICAgIGRldnRvb2xzOiB7XG4gICAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgICAgb25SZXF1ZXN0RmluaXNoZWQ6IHdyYXBFdmVudChvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcnVudGltZToge1xuICAgICAgICAgIG9uTWVzc2FnZTogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgICBvbk1lc3NhZ2VFeHRlcm5hbDogd3JhcEV2ZW50KG9uTWVzc2FnZVdyYXBwZXJzKSxcbiAgICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7XG4gICAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgICAgbWF4QXJnczogM1xuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHRhYnM6IHtcbiAgICAgICAgICBzZW5kTWVzc2FnZTogd3JhcHBlZFNlbmRNZXNzYWdlLmJpbmQobnVsbCwgXCJzZW5kTWVzc2FnZVwiLCB7XG4gICAgICAgICAgICBtaW5BcmdzOiAyLFxuICAgICAgICAgICAgbWF4QXJnczogM1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCBzZXR0aW5nTWV0YWRhdGEgPSB7XG4gICAgICAgIGNsZWFyOiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGdldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGFwaU1ldGFkYXRhLnByaXZhY3kgPSB7XG4gICAgICAgIG5ldHdvcms6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHNlcnZpY2VzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9LFxuICAgICAgICB3ZWJzaXRlczoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiB3cmFwT2JqZWN0KGV4dGVuc2lvbkFQSXMsIHN0YXRpY1dyYXBwZXJzLCBhcGlNZXRhZGF0YSk7XG4gICAgfTsgLy8gVGhlIGJ1aWxkIHByb2Nlc3MgYWRkcyBhIFVNRCB3cmFwcGVyIGFyb3VuZCB0aGlzIGZpbGUsIHdoaWNoIG1ha2VzIHRoZVxuICAgIC8vIGBtb2R1bGVgIHZhcmlhYmxlIGF2YWlsYWJsZS5cblxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3cmFwQVBJcyhjaHJvbWUpO1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpcy5icm93c2VyO1xuICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJyb3dzZXItcG9seWZpbGwuanMubWFwXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGJyb3dzZXIgZnJvbSBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiO1xuLy8gQHRzLWV4cGVjdC1lcnJvciBnbG9iYWxUaGlz44KS5LiK5pu444GN44GX44KI44GG44Go44GZ44KL44Go44Ko44Op44O844Gr44Gq44KLXG5nbG9iYWxUaGlzLmJyb3dzZXIgPSBicm93c2VyO1xuIiwiaW1wb3J0IE1lc3NhZ2VMaXN0ZW5lciwge1xuICBzZW5kTWVzc2FnZVRvQ29udGVudFNjcmlwdCxcbn0gZnJvbSBcIi4vbGlicy9NZXNzYWdlTGlzdGVuZXJcIjtcbmltcG9ydCBneWF6b0l0IGZyb20gXCIuL2xpYnMvZ3lhem9JdFwiO1xuaW1wb3J0IHsgZGlzYWJsZUJ1dHRvbiB9IGZyb20gXCIuL2xpYnMvY2hhbmdlVGFiRXZlbnRzXCI7XG5pbXBvcnQgZ3lhem9DYXB0dXJlV2l0aFNpemUgZnJvbSBcIi4vbGlicy9neWF6b0NhcHR1cmVXaXRoU2l6ZVwiO1xuaW1wb3J0IGdldFRlYW1zIGZyb20gXCIuL2xpYnMvZ2V0VGVhbXNcIjtcbmltcG9ydCBzdG9yYWdlIGZyb20gXCIuL2xpYnMvc3RvcmFnZVN3aXRjaGVyXCI7XG5pbXBvcnQgXCIuL2xpYnMvY29udGV4dE1lbnVcIjtcbmltcG9ydCB7IHBlcm1pc3Npb25zLCByZXF1ZXN0IH0gZnJvbSBcIi4vbGlicy9wZXJtaXNzaW9uc1wiO1xuXG5jb25zdCBvbk1lc3NhZ2VMaXN0ZW5lciA9IG5ldyBNZXNzYWdlTGlzdGVuZXIoXCJtYWluXCIpO1xuXG5jaHJvbWUuYnJvd3NlckFjdGlvbi5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoYXN5bmMgKHRhYikgPT4ge1xuICBpZiAodGFiLnVybD8ubWF0Y2goL2Nocm9tZVxcLmdvb2dsZVxcLmNvbVxcL3dlYnN0b3JlXFwvLykpIHtcbiAgICB3aW5kb3cuYWxlcnQoY2hyb21lLmkxOG4uZ2V0TWVzc2FnZShcIndlbGNvbWVNZXNzYWdlXCIpKTtcbiAgICByZXR1cm4gZGlzYWJsZUJ1dHRvbih0YWIuaWQpO1xuICB9XG4gIGF3YWl0IGJyb3dzZXIudGFicy5pbnNlcnRDU1ModGFiLmlkLCB7XG4gICAgZmlsZTogXCIvbWVudS5jc3NcIixcbiAgfSk7XG4gIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3I/Lm1lc3NhZ2U/Lm1hdGNoKC9jYW5ub3QgYmUgc2NyaXB0ZWQvKSkge1xuICAgIHdpbmRvdy5hbGVydChcIkl0IGlzIG5vdCBhbGxvd2VkIHRvIHVzZSBHeWF6byBleHRlbnNpb24gaW4gdGhpcyBwYWdlLlwiKTtcbiAgICByZXR1cm4gZGlzYWJsZUJ1dHRvbih0YWIuaWQpO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKHRhYi5pZClcbiAgICAgIGF3YWl0IHNlbmRNZXNzYWdlVG9Db250ZW50U2NyaXB0KHRhYi5pZCwge1xuICAgICAgICB0YXJnZXQ6IFwiY29udGVudFwiLFxuICAgICAgICBhY3Rpb246IFwiaW5zZXJ0TWVudVwiLFxuICAgICAgICB0YWI6IHRhYixcbiAgICAgIH0pO1xuICB9IGNhdGNoIHtcbiAgICBjaHJvbWUucnVudGltZS5sYXN0RXJyb3I/Lm1lc3NhZ2U/Lm1hdGNoKFxuICAgICAgL0NvdWxkIG5vdCBlc3RhYmxpc2ggY29ubmVjdGlvbi9cbiAgICApICYmXG4gICAgICB3aW5kb3cuY29uZmlybShjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKFwiY29uZmlybVJlbG9hZFwiKSkgJiZcbiAgICAgIHRhYi5pZCAmJlxuICAgICAgY2hyb21lLnRhYnMucmVsb2FkKHRhYi5pZCk7XG4gIH1cbiAgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yICYmXG4gICAgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UgJiZcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIG51bWJlcuOBjOi/lOOBo+OBpuOBj+OCi+ODluODqeOCpuOCtuOCguOBguOCi1xuICAgIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvci5udW1iZXIgIT09IC0yMTQ3NDY3MjU5ICYmXG4gICAgIWNocm9tZS5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlLm1hdGNoKC9tZXNzYWdlIHBvcnQgY2xvc2VkLykgJiZcbiAgICB3aW5kb3cuY29uZmlybShjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKFwiY29uZmlybVJlbG9hZFwiKSkgJiZcbiAgICB0YWIuaWQgJiZcbiAgICBjaHJvbWUudGFicy5yZWxvYWQodGFiLmlkKTtcbn0pO1xuXG5vbk1lc3NhZ2VMaXN0ZW5lci5hZGQoXCJnZXRUZWFtXCIsIGFzeW5jIChfcmVxdWVzdCwgX3NlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIGNvbnN0IHsgdGVhbXMsIGVycm9yIH0gPSBhd2FpdCBnZXRUZWFtcygpO1xuICBpZiAoZXJyb3IpIHJldHVybiBzZW5kUmVzcG9uc2UoeyBlcnJvciB9KTtcbiAgbGV0IHRlYW0gPSB0ZWFtc1swXSA/PyB7fTtcblxuICBjb25zdCBzYXZlZFRlYW0gPSBhd2FpdCBzdG9yYWdlLmdldCh7IHRlYW06IG51bGwgfSk7XG4gIC8vIFJldHVybiB0ZWFtIGluZm8gaWYgc2F2ZWQgZGVmYXVsdCB0ZWFtXG4gIGlmIChzYXZlZFRlYW0udGVhbSkge1xuICAgIHRlYW0gPSB0ZWFtcy5maW5kKCh0KSA9PiB0Lm5hbWUgPT09IHNhdmVkVGVhbS50ZWFtLm5hbWUpIHx8IHRlYW07IC8vIHByZXZlbnQgdW5kZWZpbmVkXG4gIH0gZWxzZSBpZiAodGVhbXMubGVuZ3RoID4gMSkge1xuICAgIC8vIGlmIGhhdmVuJ3Qgc2F2ZWQgdGVhbSBpbmZvIGFuZCBsb2dnZWQgaW4gdG8gbW9yZSB0aGFuIDIgdGVhbXNcbiAgICB3aW5kb3cuYWxlcnQoY2hyb21lLmkxOG4uZ2V0TWVzc2FnZShcInNlbGVjdFRlYW1Ub0xvZ2luXCIpKTtcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6IGNocm9tZS5ydW50aW1lLmdldFVSTChcIm9wdGlvbi9vcHRpb25zLmh0bWxcIikgfSk7XG4gICAgdGVhbSA9IHt9O1xuICB9XG4gIHN0b3JhZ2Uuc2V0KHsgdGVhbSB9KTtcbiAgc2VuZFJlc3BvbnNlKHsgdGVhbSB9KTtcbn0pO1xuXG5vbk1lc3NhZ2VMaXN0ZW5lci5hZGQoXCJneWF6b0dldEltYWdlQmxvYlwiLCAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgY29uc3QgeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuICB4aHIub3BlbihcIkdFVFwiLCByZXF1ZXN0Lmd5YXpvVXJsICsgXCIvcmF3XCIsIHRydWUpO1xuICB4aHIucmVzcG9uc2VUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xuICB4aHIub25sb2FkID0gKCkgPT4ge1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgd2luZG93LkJsb2IoW3hoci5yZXNwb25zZV0sIHsgdHlwZTogXCJpbWFnZS9wbmdcIiB9KTtcbiAgICBzZW5kUmVzcG9uc2UoeyBpbWFnZUJsb2JVcmw6IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpIH0pO1xuICB9O1xuICB4aHIuc2VuZCgpO1xufSk7XG5cbm9uTWVzc2FnZUxpc3RlbmVyLmFkZChcImd5YXpvU2VuZFJhd0ltYWdlXCIsIChyZXF1ZXN0KSA9PiB7XG4gIGNvbnN0IGRhdGEgPSByZXF1ZXN0LmRhdGE7XG4gIGd5YXpvSXQocmVxdWVzdC50YWIsIGRhdGEuc3JjVXJsKTtcbn0pO1xuXG5vbk1lc3NhZ2VMaXN0ZW5lci5hZGQoXCJneWF6b0NhcHR1cmVXaXRoU2l6ZVwiLCBneWF6b0NhcHR1cmVXaXRoU2l6ZSk7XG5cbmJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgWFhYXG4gIG9uTWVzc2FnZUxpc3RlbmVyLmxpc3Rlbi5iaW5kKG9uTWVzc2FnZUxpc3RlbmVyKVxuKTtcblxub25NZXNzYWdlTGlzdGVuZXIuYWRkKFwicmVxdWVzdFBlcm1pc3Npb25Db3B5VXJsVG9DbGlwYm9hcmRcIiwgYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGF3YWl0IHJlcXVlc3QocGVybWlzc2lvbnMuY29weVVybFRvQ2xpcGJvYXJkKTtcbiAgfSBjYXRjaCB7XG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiBjaHJvbWUucnVudGltZS5nZXRVUkwoXCJvcHRpb24vb3B0aW9ucy5odG1sXCIpIH0pO1xuICB9XG59KTtcblxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoYXN5bmMgKGRldGFpbHMpID0+IHtcbiAgY29uc3QgeyBhY2Nlc3NUb2tlbiB9ID0gYXdhaXQgc3RvcmFnZS5nZXQoXCJhY2Nlc3NUb2tlblwiKTtcblxuICBpZiAoZGV0YWlscy5yZWFzb24gPT0gXCJpbnN0YWxsXCIgJiYgYWNjZXNzVG9rZW4gPT0gbnVsbCkge1xuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKFwid2VsY29tZS93ZWxjb21lLmh0bWxcIikgfSk7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbImJyb3dzZXIiLCJNZXNzYWdlTGlzdGVuZXIiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJsaXN0ZW5lcnMiLCJhZGQiLCJhY3Rpb24iLCJmdW5jIiwicHVzaCIsImxpc3RlbiIsInRhcmdldCIsIm1lc3NhZ2UiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJsZW5ndGgiLCJmb3JFYWNoIiwic2VuZE1lc3NhZ2VUb0NvbnRlbnRTY3JpcHQiLCJpZCIsImNhbGxiYWNrIiwicCIsInRhYnMiLCJzZW5kTWVzc2FnZSIsInRoZW4iLCJzZW5kTWVzc2FnZVRvTWFpblNjcmlwdCIsInJ1bnRpbWUiLCJjaHJvbWUiLCJVcGxvYWROb3RpZmljYXRpb24iLCJ0YWJJZCIsInN0YXJ0VXBsb2FkaW5nIiwiZmluaXNoIiwiaW1hZ2VQYWdlVXJsIiwiaW1hZ2VEYXRhVXJsIiwic2NhbGUiLCJ0aXRsZSIsImkxOG4iLCJnZXRNZXNzYWdlIiwiaW1hZ2VVcmwiLCJpc0ZpbmlzaCIsImltYWdlTG9hZGVyIiwiaW1nU3JjIiwiaW1nIiwid2luZG93IiwiSW1hZ2UiLCJvbmxvYWQiLCJzcmMiLCJhcHBlbmRJbWFnZVRvQ2FudmFzIiwiYXJnT2JqIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ6b29tIiwiY2FudmFzIiwid2lkdGgiLCJ0b3AiLCJsZWZ0IiwiaGVpZ2h0IiwiaW1hZ2VTcmMiLCJjdHgiLCJnZXRDb250ZXh0IiwiZHJhd0ltYWdlIiwibGFzdEltYWdlQm90dG9tIiwibGFzdEltYWdlUmlnaHQiLCJ0cmltSW1hZ2UiLCJpbWFnZURhdGEiLCJzdGFydFgiLCJzdGFydFkiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdWJzdHIiLCJvcmlnaW5hbFdpZHRoIiwib3JpZ2luYWxIZWlnaHQiLCJnZXRDb2RlIiwiZ2V0QWNjZXNzVG9rZW4iLCJzdG9yYWdlIiwiZGlzYWJsZUJ1dHRvbiIsImJyb3dzZXJBY3Rpb24iLCJzZXRJY29uIiwicGF0aCIsImRpc2FibGUiLCJlbmFibGVCdXR0b24iLCJlbmFibGUiLCJvbkFjdGl2YXRlZCIsImFkZExpc3RlbmVyIiwiYWN0aXZlSW5mbyIsInRhYiIsImdldCIsInN0YXR1cyIsInVybCIsIm1hdGNoIiwib25VcGRhdGVkIiwiY2hhbmdlSW5mbyIsImNvbnNvbGUiLCJlcnJvciIsImxvY2F0aW9uIiwiaHJlZiIsInN0YXJ0c1dpdGgiLCJjb2RlIiwiYWNjZXNzVG9rZW4iLCJzZXQiLCJyZW1vdmUiLCJsb2FkZWQiLCJleGVjdXRlU2NyaXB0IiwiZSIsImZpbGUiLCJpbnNlcnRDU1MiLCJneWF6b0l0Iiwib25Db250ZXh0TWVudUNsaWNrTGlzdGVuZXIiLCJjb250ZXh0TWVudXMiLCJvbkNsaWNrZWQiLCJpbmZvIiwibWVudUl0ZW1JZCIsInNyY1VybCIsImNoZWNrQ29udGV4dE1lbnVFbmFibGVkIiwiY29udGV4dE1lbnVFbmFibGVkIiwic2V0dGluZ3MiLCJjb250ZXh0TWVudSIsInJlbW92ZUFsbCIsImNyZWF0ZSIsImNvbnRleHRzIiwicGFyZW50SWQiLCJ0eXBlIiwib25DaGFuZ2VkIiwiYmluZCIsInVwbG9hZExpbWl0RmlsZVNpemUiLCJRVUFMSVRZX01BWCIsIlFVQUxJVFlfTUlOIiwidXBsb2FkTGltaXRWb2x1bWUiLCJxdWFsaXR5IiwicmVzdWx0IiwidG9EYXRhVVJMIiwiaSIsIk1hdGgiLCJwb3ciLCJlbmRwb2ludCIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsInRlYW1zIiwianNvbiIsInBvc3RUb0d5YXpvIiwid2FpdEZvckRlbGF5IiwidG9KcGVnRGF0YVVSTCIsImFyZ3MiLCJyZXF1ZXN0IiwiYmFzZUNhbnZhcyIsImRhdGEiLCJoIiwieiIsInMiLCJ3IiwibGFzdExpbmVXaWR0aCIsImNhcHR1cmUiLCJzY3JvbGxIZWlnaHQiLCJzY3JvbGxXaWR0aCIsImxhc3RJbWFnZURhdGEiLCJwb3NpdGlvblgiLCJwb3NpdGlvblkiLCJ1cGxvYWRJbWFnZSIsInRvQmxvYiIsImJsb2IiLCJpbWFnZUJsb2IiLCJ0IiwidSIsImRlc2MiLCJpbWFnZVBvc2l0aW9uVG9wIiwib2Zmc2V0VG9wIiwieSIsImltYWdlUG9zaXRpb25MZWZ0Iiwib2Zmc2V0TGVmdCIsIngiLCJjYXB0dXJlRGF0YSIsImNhcHR1cmVWaXNpYmxlVGFiIiwiZm9ybWF0IiwidHJpbWVkSW1hZ2VDYW52YXMiLCJtaW4iLCJzY3JvbGxUb1giLCJzY3JvbGxUb1kiLCJkb2N1bWVudFdpZHRoIiwiX2xhc3RJbWFnZUJvdHRvbSIsIl9sYXN0SW1hZ2VSaWdodCIsInJlcyIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInJlc3BvbnNlVHlwZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJtaW5lVHlwZSIsInRlc3QiLCJCbG9iIiwiZmlsZVJlYWRlciIsIkZpbGVSZWFkZXIiLCJyZWFkQXNEYXRhVVJMIiwic2VuZCIsIkFQSV9IT1NUIiwicmVkaXJlY3RVcmwiLCJjbGllbnRJZCIsImNsaWVudFNlY3JldCIsImdlbmVyYXRlQXV0aG9yaXplVXJsIiwidGVhbU5hbWUiLCJVUkwiLCJzZWFyY2hQYXJhbXMiLCJhcHBlbmQiLCJwYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjbGllbnRfaWQiLCJjbGllbnRfc2VjcmV0IiwicmVkaXJlY3RfdXJpIiwiZ3JhbnRfdHlwZSIsImFjY2Vzc190b2tlbiIsInVwbG9hZCIsInBlcm1pc3Npb25zIiwiY29weVVybFRvQ2xpcGJvYXJkIiwiY2hlY2siLCJjb250YWlucyIsInRvZ2dsZSIsInN0YXRlIiwidW5kZWZpbmVkIiwic2F2ZVRvQ2xpcGJvYXJkIiwiYXBpRW5kcG9pbnQiLCJlcnJvckFsZXJ0IiwiYWxlcnQiLCJub3RpZmljYXRpb24iLCJmb3JtZGF0YSIsIkZvcm1EYXRhIiwidG9TdHJpbmciLCJyZXBsYWNlIiwicGVybWFsaW5rX3VybCIsInByb2Nlc3MiLCJlbnYiLCJCVUlMRF9FWFRFTlNJT05fVFlQRSIsInRlYW0iLCJzdGF0dXNUZXh0IiwiX2RhdGEiLCJnZXRfaW1hZ2VfdXJsIiwicmVzcG9uc2VVUkwiLCJzdHIiLCJwZXJtaXNzaW9uQ2hlY2siLCJ0ZXh0QXJlYSIsInN0eWxlIiwiY3NzVGV4dCIsImFwcGVuZENoaWxkIiwidmFsdWUiLCJzZWxlY3QiLCJleGVjQ29tbWFuZCIsInJlbW92ZUNoaWxkIiwiZGVmYXVsdE9wdGlvbnMiLCJiZWhhdmlvciIsImZpbGVTaXplTGltaXQiLCJFeHRlbnNpb25TdG9yYWdlV3JhcHBlciIsImNoZWNrRW52IiwiZW5hYmxlZFN5bmNTdG9yYWdlIiwic3luYyIsInRyeVRvR2V0U3luY1N0YXR1cyIsInRyeVRvU2V0U3luY1N0YXR1cyIsInN0b3JhZ2VUeXBlIiwicmVtb3ZlTGlzdGVuZXIiLCJoYXNMaXN0ZW5lciIsIndhaXRGb3JDaGVja0VudiIsImYiLCJ0aW1lcklkIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwic3RvcmFnZU9iamVjdCIsImRlZmF1bHRWYWx1ZSIsImdldEJ5dGVzSW5Vc2UiLCJjbGVhciIsIk51bWJlciIsInNsZWVwIiwibXNlYyIsInNldFRpbWVvdXQiLCJjdXJyZW50VGFiIiwicXVlcnkiLCJjdXJyZW50V2luZG93IiwiYWN0aXZlIiwiTUFYX0NBUFRVUkVfVklTSUJMRV9UQUJfQ0FMTFNfUEVSX1NFQ09ORCIsImdsb2JhbFRoaXMiLCJneWF6b0NhcHR1cmVXaXRoU2l6ZSIsImdldFRlYW1zIiwib25NZXNzYWdlTGlzdGVuZXIiLCJsYXN0RXJyb3IiLCJjb25maXJtIiwicmVsb2FkIiwibnVtYmVyIiwiX3JlcXVlc3QiLCJfc2VuZGVyIiwic2F2ZWRUZWFtIiwiZmluZCIsImdldFVSTCIsImd5YXpvVXJsIiwiaW1hZ2VCbG9iVXJsIiwiY3JlYXRlT2JqZWN0VVJMIiwib25NZXNzYWdlIiwib25JbnN0YWxsZWQiLCJkZXRhaWxzIiwicmVhc29uIl0sInNvdXJjZVJvb3QiOiIifQ==