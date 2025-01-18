/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/add-px-to-style/index.js":
/*!***********************************************!*\
  !*** ./node_modules/add-px-to-style/index.js ***!
  \***********************************************/
/***/ ((module) => {

/* The following list is defined in React's core */
var IS_UNITLESS = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

module.exports = function(name, value) {
  if(typeof value === 'number' && !IS_UNITLESS[ name ]) {
    return value + 'px';
  } else {
    return value;
  }
};

/***/ }),

/***/ "./src/constants/index.ts":
/*!********************************!*\
  !*** ./src/constants/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ESC_KEY_CODE: () => (/* binding */ ESC_KEY_CODE),
/* harmony export */   JACKUP_MARGIN: () => (/* binding */ JACKUP_MARGIN)
/* harmony export */ });
const ESC_KEY_CODE = 27;
const JACKUP_MARGIN = 30;

/***/ }),

/***/ "./src/content/actions/changeFixedElementToAbsolute.ts":
/*!*************************************************************!*\
  !*** ./src/content/actions/changeFixedElementToAbsolute.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _libs_changeFixedElementToAbsolute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/changeFixedElementToAbsolute */ "./src/libs/changeFixedElementToAbsolute.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (...args) => {
  const [,, sendResponse] = args;
  (0,_libs_changeFixedElementToAbsolute__WEBPACK_IMPORTED_MODULE_0__["default"])();
  sendResponse();
});

/***/ }),

/***/ "./src/content/actions/gyazoCaptureSelectedArea.ts":
/*!*********************************************************!*\
  !*** ./src/content/actions/gyazoCaptureSelectedArea.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _libs_restoreFixedElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/restoreFixedElement */ "./src/libs/restoreFixedElement.js");
/* harmony import */ var _libs_getZoomAndScale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../libs/getZoomAndScale */ "./src/libs/getZoomAndScale.js");
/* harmony import */ var _libs_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../libs/scroll */ "./src/libs/scroll.js");
/* harmony import */ var _libs_pageScrollSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../libs/pageScrollSize */ "./src/libs/pageScrollSize.js");
/* harmony import */ var _libs_jackupElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../libs/jackupElement */ "./src/libs/jackupElement.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../constants */ "./src/constants/index.ts");
/* harmony import */ var _libs_MessageListener__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../libs/MessageListener */ "./src/libs/MessageListener.ts");
/* harmony import */ var _shadowDOM__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shadowDOM */ "./src/content/shadowDOM.ts");








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (...args) => {
  const [request] = args;
  if (document.querySelector(".gyazo-jackup-element")) {
    return false;
  }
  let startX, startY;
  const tempUserSelect = document.body.style.webkitUserSelect;
  const layer = document.createElement("div");
  const jackup = new _libs_jackupElement__WEBPACK_IMPORTED_MODULE_4__["default"]();
  layer.style.position = "absolute";
  layer.style.left = document.body.clientLeft + "px";
  layer.style.top = document.body.clientTop + "px";
  layer.style.width = (0,_libs_pageScrollSize__WEBPACK_IMPORTED_MODULE_3__.width)() + "px";
  layer.style.height = (0,_libs_pageScrollSize__WEBPACK_IMPORTED_MODULE_3__.height)() + "px";
  layer.style.zIndex = "2147483646"; // Maximun number of 32bit Int - 1
  layer.style.cursor = "crosshair";
  layer.className = "gyazo-select-layer";
  document.body.style.webkitUserSelect = "none";
  const selectionElm = document.createElement("div");
  layer.appendChild(selectionElm);
  document.body.appendChild(layer);
  const updateSelectionElmStyle = function (styles) {
    Object.keys(styles).forEach(function (key) {
      // @ts-expect-error XXX
      selectionElm.style[key] = styles[key];
    });
  };
  updateSelectionElmStyle({
    background: "rgba(92, 92, 92, 0.3)",
    position: "fixed"
  });
  const cancelGyazo = function () {
    if (!(layer.parentNode && jackup.element.parentNode)) return;
    document.body.removeChild(layer);
    jackup.remove();
    document.body.style.webkitUserSelect = tempUserSelect;
    document.removeEventListener("keydown", keydownHandler);
    window.removeEventListener("contextmenu", cancelGyazo);
    (0,_libs_restoreFixedElement__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const menu = (0,_shadowDOM__WEBPACK_IMPORTED_MODULE_7__.shadowDOMQuerySelector)(".gyazo-menu");
    if (menu) {
      menu.remove();
    }
  };
  const removedGyazoMenu = function () {
    cancelGyazo();
    window.removeEventListener("removeGyazoMenu", removedGyazoMenu);
  };
  window.addEventListener("removeGyazoMenu", removedGyazoMenu);
  const keydownHandler = function (event) {
    if (event.keyCode === _constants__WEBPACK_IMPORTED_MODULE_5__.ESC_KEY_CODE) {
      //  If press Esc Key, cancel it
      cancelGyazo();
    }
  };
  const mousedownHandler = function (e) {
    const gyazoMenu = (0,_shadowDOM__WEBPACK_IMPORTED_MODULE_7__.shadowDOMQuerySelector)(".gyazo-menu");
    if (gyazoMenu) {
      gyazoMenu.remove();
    }
    startX = e.pageX;
    startY = e.pageY;
    updateSelectionElmStyle({
      border: "1px solid rgba(255, 255, 255, 0.8)",
      left: startX + "px",
      top: startY + "px"
    });
    window.removeEventListener("contextmenu", cancelGyazo);
    layer.removeEventListener("mousedown", mousedownHandler);
    layer.addEventListener("mousemove", mousemoveHandler);
    layer.addEventListener("mouseup", mouseupHandler);
  };
  const mousemoveHandler = function (e) {
    updateSelectionElmStyle({
      width: Math.abs(e.pageX - startX) - 1 + "px",
      height: Math.abs(e.pageY - startY) - 1 + "px",
      left: Math.min(e.pageX, startX) + "px",
      top: Math.min(e.pageY, startY) - window.scrollY + "px"
    });
  };
  const mouseupHandler = function () {
    document.body.style.webkitUserSelect = tempUserSelect;
    document.removeEventListener("keydown", keydownHandler);
    const scaleObj = (0,_libs_getZoomAndScale__WEBPACK_IMPORTED_MODULE_1__["default"])();
    const rect = selectionElm.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (h <= 3 || w <= 3) {
      cancelGyazo();
      return false;
    }
    layer.style.opacity = "0";
    document.body.removeChild(layer);
    const menu = (0,_shadowDOM__WEBPACK_IMPORTED_MODULE_7__.shadowDOMQuerySelector)(".gyazo-menu");
    if (menu) {
      menu.remove();
    }
    let overflow = {};
    if (h > window.innerHeight) {
      overflow = (0,_libs_scroll__WEBPACK_IMPORTED_MODULE_2__.lockScroll)();
      (0,_libs_scroll__WEBPACK_IMPORTED_MODULE_2__.packScrollBar)(overflow);
    }
    jackup.height = window.innerHeight;
    // wait for rewrite by removeChild
    const finish = function () {
      if (document.getElementsByClassName("gyazo-select-layer").length > 0) {
        return window.requestAnimationFrame(finish);
      }
      window.setTimeout(function () {
        (0,_libs_MessageListener__WEBPACK_IMPORTED_MODULE_6__.sendMessageToMainScript)(chrome.runtime.id, {
          target: "main",
          action: "gyazoCaptureWithSize",
          data: {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
            t: document.title,
            u: location.href,
            s: scaleObj.scale,
            z: scaleObj.zoom,
            w,
            h,
            documentWidth: (0,_libs_pageScrollSize__WEBPACK_IMPORTED_MODULE_3__.width)(),
            positionX: window.scrollX,
            positionY: window.scrollY
          },
          tab: Object.assign({
            width: window.innerWidth,
            height: window.innerHeight
          }, request.tab)
        }, function () {
          jackup.remove();
          // @ts-expect-error XXX
          (0,_libs_scroll__WEBPACK_IMPORTED_MODULE_2__.unlockScroll)(overflow);
          (0,_libs_restoreFixedElement__WEBPACK_IMPORTED_MODULE_0__["default"])();
        });
      }, 100);
    };
    window.requestAnimationFrame(finish);
  };
  layer.addEventListener("mousedown", mousedownHandler);
  document.addEventListener("keydown", keydownHandler);
  window.addEventListener("contextmenu", cancelGyazo);
});

/***/ }),

/***/ "./src/content/actions/gyazoSelectElm.ts":
/*!***********************************************!*\
  !*** ./src/content/actions/gyazoSelectElm.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _libs_isPressCommandKey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/isPressCommandKey */ "./src/libs/isPressCommandKey.js");
/* harmony import */ var _libs_getZoomAndScale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../libs/getZoomAndScale */ "./src/libs/getZoomAndScale.js");
/* harmony import */ var _libs_restoreFixedElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../libs/restoreFixedElement */ "./src/libs/restoreFixedElement.js");
/* harmony import */ var _libs_jackupElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../libs/jackupElement */ "./src/libs/jackupElement.js");
/* harmony import */ var _libs_scroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../libs/scroll */ "./src/libs/scroll.js");
/* harmony import */ var _libs_pageScrollSize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../libs/pageScrollSize */ "./src/libs/pageScrollSize.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../constants */ "./src/constants/index.ts");
/* harmony import */ var _libs_MessageListener__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../libs/MessageListener */ "./src/libs/MessageListener.ts");








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((...args) => {
  const [request] = args;
  if (document.querySelector(".gyazo-crop-select-element")) {
    return false;
  }
  const MARGIN = 3;
  document.body.classList.add("gyazo-select-element-mode");
  const jackup = new _libs_jackupElement__WEBPACK_IMPORTED_MODULE_3__["default"]();
  const layer = document.createElement("div");
  layer.className = "gyazo-crop-select-element";
  document.body.appendChild(layer);
  layer.style.background = "rgba(9, 132, 222, 0.35)";
  layer.style.margin = "0px";
  layer.style.border = "1px solid rgb(9, 132, 222)";
  layer.style.position = "fixed";
  layer.style.pointerEvents = "none";
  layer.style.zIndex = "2147483646"; // Maximun number of 32bit Int - 1
  const allElms = Array.from(document.body.querySelectorAll("*")).filter(function (item) {
    return !item.classList.contains("gyazo-crop-select-element") && !item.classList.contains("gyazo-menu-element");
  });
  allElms.forEach(function (item) {
    item.classList.add("gyazo-select-element-cursor-overwrite");
  });
  const moveLayer = function (event) {
    const item = event.target;
    event.stopPropagation();
    if (item instanceof HTMLImageElement) {
      layer.setAttribute("data-img-url", item.src);
    } else {
      layer.setAttribute("data-img-url", "");
    }
    const rect = item.getBoundingClientRect();
    layer.style.width = rect.width + "px";
    layer.style.height = rect.height + "px";
    layer.style.left = rect.left + "px";
    layer.style.top = rect.top + "px";
  };
  let hasMargin = false;
  const takeMargin = function () {
    if (hasMargin) return;
    hasMargin = true;
    layer.style.width = parseInt(window.getComputedStyle(layer).width, 10) + MARGIN * 2 + "px";
    layer.style.height = parseInt(window.getComputedStyle(layer).height, 10) + MARGIN * 2 + "px";
    layer.style.left = parseInt(window.getComputedStyle(layer).left, 10) - MARGIN + "px";
    layer.style.top = parseInt(window.getComputedStyle(layer).top, 10) - MARGIN + "px";
  };
  const keydownHandler = function (event) {
    if (event.keyCode === _constants__WEBPACK_IMPORTED_MODULE_6__.ESC_KEY_CODE) {
      cancel();
    } else if ((0,_libs_isPressCommandKey__WEBPACK_IMPORTED_MODULE_0__["default"])(event)) {
      takeMargin();
    }
  };
  const keyUpHandler = function (event) {
    if ((0,_libs_isPressCommandKey__WEBPACK_IMPORTED_MODULE_0__["default"])(event)) {
      hasMargin = false;
      layer.style.width = parseInt(window.getComputedStyle(layer).width, 10) - MARGIN * 2 + "px";
      layer.style.height = parseInt(window.getComputedStyle(layer).height, 10) - MARGIN * 2 + "px";
      layer.style.left = parseInt(window.getComputedStyle(layer).left, 10) + MARGIN + "px";
      layer.style.top = parseInt(window.getComputedStyle(layer).top, 10) + MARGIN + "px";
    }
  };
  const clickElement = function (event) {
    event.stopPropagation();
    event.preventDefault();
    layer.style.opacity = "0";
    document.body.classList.remove("gyazo-select-element-mode");
    allElms.forEach(function (item) {
      if (item.classList.contains("gyazo-select-element-cursor-overwrite")) {
        item.classList.remove("gyazo-select-element-cursor-overwrite");
      }
      item.removeEventListener("mouseover", moveLayer);
      item.removeEventListener("click", clickElement);
    });
    const scaleObj = (0,_libs_getZoomAndScale__WEBPACK_IMPORTED_MODULE_1__["default"])();

    // Sanitize gyazo desc for ivy-search
    Array.from(document.querySelectorAll("*")).forEach(function (elm) {
      if (window.getComputedStyle(elm).display === "none" || window.getComputedStyle(elm).visibility === "hidden") {
        elm.classList.add("gyazo-hidden");
      }
    });
    if (!(event.target instanceof HTMLElement)) return;
    const dupTarget = event.target.cloneNode(true);
    Array.from(dupTarget.querySelectorAll("*")).forEach(function (elm) {
      switch (elm.tagName) {
        case "SCRIPT":
        case "STYLE":
          return elm.remove();
      }
      if (elm.classList.contains("gyazo-hidden")) {
        elm.remove();
      }
    });
    Array.from(document.getElementsByClassName("gyazo-hidden")).forEach(function (elm) {
      elm.classList.remove("gyazo-hidden");
    });
    const w = parseFloat(layer.style.width);
    const h = parseFloat(layer.style.height);
    const y = window.scrollY + layer.offsetTop;
    const layerOffsetLeft = layer.offsetLeft;
    const layerOffsetTop = layer.offsetTop;
    const positionY = window.scrollY;
    if (document.body.contains(layer)) {
      document.body.removeChild(layer);
    }
    const menu = document.querySelector(".gyazo-menu");
    if (menu) {
      document.body.removeChild(menu);
    }
    jackup.height = window.innerHeight;
    window.removeEventListener("contextmenu", cancel);
    window.removeEventListener("keydown", keydownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    if (layer.getAttribute("data-img-url")) {
      (0,_libs_restoreFixedElement__WEBPACK_IMPORTED_MODULE_2__["default"])();
      return (0,_libs_MessageListener__WEBPACK_IMPORTED_MODULE_7__.sendMessageToMainScript)(chrome.runtime.id, {
        target: "main",
        action: "gyazoSendRawImage",
        data: {
          srcUrl: layer.getAttribute("data-img-url")
        },
        tab: Object.assign({
          width: window.innerWidth,
          height: window.innerHeight
        }, request.tab)
      }, function () {
        /** no op */
      });
    }
    let overflow = {};
    if (y + h > window.innerHeight + positionY) {
      overflow = (0,_libs_scroll__WEBPACK_IMPORTED_MODULE_4__.lockScroll)();
      (0,_libs_scroll__WEBPACK_IMPORTED_MODULE_4__.packScrollBar)(overflow);
    }
    const finish = function () {
      if (document.getElementsByClassName("gyazo-crop-select-element").length > 0) {
        return window.requestAnimationFrame(finish);
      }
      window.requestAnimationFrame(async () => {
        await (0,_libs_MessageListener__WEBPACK_IMPORTED_MODULE_7__.sendMessageToMainScript)(chrome.runtime.id, {
          target: "main",
          action: "gyazoCaptureWithSize",
          data: {
            w,
            h,
            x: window.scrollX + layerOffsetLeft,
            y: window.scrollY + layerOffsetTop,
            t: document.title,
            u: location.href,
            s: scaleObj.scale,
            z: scaleObj.zoom,
            documentWidth: (0,_libs_pageScrollSize__WEBPACK_IMPORTED_MODULE_5__.width)(),
            positionX: window.scrollX,
            positionY: window.scrollY,
            desc: dupTarget.textContent ?? undefined
          },
          tab: Object.assign({
            width: window.innerWidth,
            height: window.innerHeight
          }, request.tab)
        });
        (0,_libs_restoreFixedElement__WEBPACK_IMPORTED_MODULE_2__["default"])();
        if (document.body.contains(jackup.element)) jackup.remove();
        // @ts-expect-error XXX
        (0,_libs_scroll__WEBPACK_IMPORTED_MODULE_4__.unlockScroll)(overflow);
      });
    };
    window.requestAnimationFrame(finish);
  };
  const cancel = function () {
    if (document.body.contains(jackup.element)) {
      jackup.remove();
    }
    if (document.body.contains(layer)) {
      document.body.removeChild(layer);
    }
    document.body.classList.remove("gyazo-select-element-mode");
    window.removeEventListener("contextmenu", cancel);
    document.removeEventListener("keydown", keydownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    Array.from(document.querySelectorAll(".gyazo-select-element-cursor-overwrite")).forEach(function (item) {
      item.classList.remove("gyazo-select-element-cursor-overwrite");
      item.removeEventListener("mouseover", moveLayer);
      item.removeEventListener("click", clickElement);
    });
    (0,_libs_restoreFixedElement__WEBPACK_IMPORTED_MODULE_2__["default"])();
  };
  const removedGyazoMenu = function () {
    window.removeEventListener("removeGyazoMenu", removedGyazoMenu);
    cancel();
  };
  window.addEventListener("removeGyazoMenu", removedGyazoMenu);
  window.addEventListener("contextmenu", cancel);
  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("keyup", keyUpHandler);
  window.requestAnimationFrame(function () {
    allElms.forEach(function (item) {
      item.addEventListener("mouseover", moveLayer);
      item.addEventListener("click", clickElement);
    });
  });
});

/***/ }),

/***/ "./src/content/actions/gyazoSnapOGPImage.ts":
/*!**************************************************!*\
  !*** ./src/content/actions/gyazoSnapOGPImage.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _libs_MessageListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/MessageListener */ "./src/libs/MessageListener.ts");
/* harmony import */ var _libs_extractOGPImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../libs/extractOGPImage */ "./src/libs/extractOGPImage.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (...args) => {
  const [request] = args;
  const image = (0,_libs_extractOGPImage__WEBPACK_IMPORTED_MODULE_1__["default"])();
  if (!image) return;
  return (0,_libs_MessageListener__WEBPACK_IMPORTED_MODULE_0__.sendMessageToMainScript)(chrome.runtime.id, {
    target: "main",
    action: "gyazoSendRawImage",
    data: {
      srcUrl: image
    },
    tab: Object.assign({
      width: window.innerWidth,
      height: window.innerHeight
    }, request.tab)
  }, function () {
    /** no op */
  });
});

/***/ }),

/***/ "./src/content/actions/gyazoWholeCapture.ts":
/*!**************************************************!*\
  !*** ./src/content/actions/gyazoWholeCapture.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _libs_getZoomAndScale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/getZoomAndScale */ "./src/libs/getZoomAndScale.js");
/* harmony import */ var _libs_jackupElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../libs/jackupElement */ "./src/libs/jackupElement.js");
/* harmony import */ var _libs_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../libs/scroll */ "./src/libs/scroll.js");
/* harmony import */ var _libs_pageScrollSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../libs/pageScrollSize */ "./src/libs/pageScrollSize.js");
/* harmony import */ var _libs_MessageListener__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../libs/MessageListener */ "./src/libs/MessageListener.ts");
/* harmony import */ var _libs_restoreFixedElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../libs/restoreFixedElement */ "./src/libs/restoreFixedElement.js");






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (...args) => {
  const [request] = args;
  const overflow = (0,_libs_scroll__WEBPACK_IMPORTED_MODULE_2__.lockScroll)();
  const scaleObj = (0,_libs_getZoomAndScale__WEBPACK_IMPORTED_MODULE_0__["default"])();
  // jackupElementが挿入される前に取得しておく
  const w = (0,_libs_pageScrollSize__WEBPACK_IMPORTED_MODULE_3__.width)();
  const h = (0,_libs_pageScrollSize__WEBPACK_IMPORTED_MODULE_3__.height)();
  const documentWidth = (0,_libs_pageScrollSize__WEBPACK_IMPORTED_MODULE_3__.width)();
  const jackup = new _libs_jackupElement__WEBPACK_IMPORTED_MODULE_1__["default"]();
  jackup.height = window.innerHeight;
  await (0,_libs_MessageListener__WEBPACK_IMPORTED_MODULE_4__.sendMessageToMainScript)(chrome.runtime.id, {
    target: "main",
    action: "gyazoCaptureWithSize",
    data: {
      w,
      h,
      x: 0,
      documentWidth,
      y: 0,
      t: document.title,
      u: location.href,
      s: scaleObj.scale,
      z: scaleObj.zoom,
      positionX: window.scrollX,
      positionY: window.scrollY
    },
    tab: Object.assign({
      width: window.innerWidth,
      height: window.innerHeight
    }, request.tab)
  });
  jackup.remove();
  (0,_libs_restoreFixedElement__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_libs_scroll__WEBPACK_IMPORTED_MODULE_2__.unlockScroll)(overflow);
});

/***/ }),

/***/ "./src/content/actions/gyazocaptureWindow.ts":
/*!***************************************************!*\
  !*** ./src/content/actions/gyazocaptureWindow.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _libs_scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../libs/scroll */ "./src/libs/scroll.js");
/* harmony import */ var _libs_pageScrollSize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../libs/pageScrollSize */ "./src/libs/pageScrollSize.js");
/* harmony import */ var _libs_getZoomAndScale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../libs/getZoomAndScale */ "./src/libs/getZoomAndScale.js");
/* harmony import */ var _libs_MessageListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../libs/MessageListener */ "./src/libs/MessageListener.ts");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((...args) => {
  const [request] = args;
  const overflow = (0,_libs_scroll__WEBPACK_IMPORTED_MODULE_0__.lockScroll)();
  const scaleObj = (0,_libs_getZoomAndScale__WEBPACK_IMPORTED_MODULE_2__["default"])();
  window.requestAnimationFrame(async () => {
    await (0,_libs_MessageListener__WEBPACK_IMPORTED_MODULE_3__.sendMessageToMainScript)(chrome.runtime.id, {
      target: "main",
      action: "gyazoCaptureWithSize",
      data: {
        w: window.innerWidth,
        documentWidth: (0,_libs_pageScrollSize__WEBPACK_IMPORTED_MODULE_1__.width)(),
        h: window.innerHeight,
        x: window.scrollX,
        y: window.scrollY,
        t: document.title,
        u: location.href,
        s: scaleObj.scale,
        z: scaleObj.zoom,
        positionX: window.scrollX,
        positionY: window.scrollY,
        defaultPositon: window.scrollY
      },
      tab: {
        width: window.innerWidth,
        height: window.innerHeight,
        ...request.tab
      }
    });
    (0,_libs_scroll__WEBPACK_IMPORTED_MODULE_0__.unlockScroll)(overflow);
  });
});

/***/ }),

/***/ "./src/content/actions/index.js":
/*!**************************************!*\
  !*** ./src/content/actions/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeFixedElementToAbsolute: () => (/* reexport safe */ _changeFixedElementToAbsolute__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   gyazoCaptureSelectedArea: () => (/* reexport safe */ _gyazoCaptureSelectedArea__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   gyazoSelectElm: () => (/* reexport safe */ _gyazoSelectElm__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   gyazoSnapOGPImage: () => (/* reexport safe */ _gyazoSnapOGPImage__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   gyazoWholeCapture: () => (/* reexport safe */ _gyazoWholeCapture__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   gyazocaptureWindow: () => (/* reexport safe */ _gyazocaptureWindow__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _changeFixedElementToAbsolute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./changeFixedElementToAbsolute */ "./src/content/actions/changeFixedElementToAbsolute.ts");
/* harmony import */ var _gyazocaptureWindow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gyazocaptureWindow */ "./src/content/actions/gyazocaptureWindow.ts");
/* harmony import */ var _gyazoCaptureSelectedArea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gyazoCaptureSelectedArea */ "./src/content/actions/gyazoCaptureSelectedArea.ts");
/* harmony import */ var _gyazoSelectElm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gyazoSelectElm */ "./src/content/actions/gyazoSelectElm.ts");
/* harmony import */ var _gyazoWholeCapture__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gyazoWholeCapture */ "./src/content/actions/gyazoWholeCapture.ts");
/* harmony import */ var _gyazoSnapOGPImage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gyazoSnapOGPImage */ "./src/content/actions/gyazoSnapOGPImage.ts");








/***/ }),

/***/ "./src/content/createButtonOnMenu.js":
/*!*******************************************!*\
  !*** ./src/content/createButtonOnMenu.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((loadSvgName, text, shortcutKey) => {
  let btn = document.createElement("div");
  btn.className = "gyazo-big-button gyazo-button gyazo-menu-element";
  if (shortcutKey) {
    btn.setAttribute("title", "Press: " + shortcutKey);
  }
  let iconElm = document.createElement("div");
  iconElm.classList.add("gyazo-button-icon");
  try {
    // Edge cannot fetch to ms-edge-extension:
    window.fetch(chrome.runtime.getURL(`imgs/${loadSvgName}.svg`)).then(res => res.text()).then(text => {
      iconElm.innerHTML = text;
    });
  } catch (e) {
    const svgUrl = chrome.runtime.getURL(`imgs/${loadSvgName}.svg`);
    iconElm.innerHTML = `<img src='${svgUrl}' />`;
  }
  let textElm = document.createElement("div");
  textElm.className = "gyazo-button-text";
  textElm.textContent = text;
  btn.appendChild(iconElm);
  btn.appendChild(textElm);
  return btn;
});

/***/ }),

/***/ "./src/content/createOGPButtonOnMenu.ts":
/*!**********************************************!*\
  !*** ./src/content/createOGPButtonOnMenu.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _libs_extractOGPImage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/extractOGPImage */ "./src/libs/extractOGPImage.ts");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shortcutKey => {
  const btn = document.createElement("div");
  btn.className = "gyazo-big-button gyazo-button gyazo-menu-element";
  if (shortcutKey) {
    btn.setAttribute("title", "Press: " + shortcutKey);
  }
  const iconElm = document.createElement("div");
  iconElm.classList.add("gyazo-button-preview");
  const ogpImageUrl = (0,_libs_extractOGPImage__WEBPACK_IMPORTED_MODULE_0__["default"])();
  if (!ogpImageUrl) return null;
  const previewElm = document.createElement("img");
  previewElm.src = ogpImageUrl;
  iconElm.appendChild(previewElm);
  const textElm = document.createElement("div");
  textElm.className = "gyazo-button-text";
  textElm.textContent = chrome.i18n.getMessage("snapOGPImage");
  btn.appendChild(iconElm);
  btn.appendChild(textElm);
  return btn;
});

/***/ }),

/***/ "./src/content/expander/index.js":
/*!***************************************!*\
  !*** ./src/content/expander/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var delegate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! delegate */ "./node_modules/delegate/src/delegate.js");
/* harmony import */ var delegate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(delegate__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dom_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-css */ "./node_modules/dom-css/index.js");
/* harmony import */ var dom_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dom_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_gyazoIdFromUrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/gyazoIdFromUrl */ "./src/content/expander/lib/gyazoIdFromUrl.js");
/* harmony import */ var _lib_adjacentStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/adjacentStyle */ "./src/content/expander/lib/adjacentStyle.js");
/* harmony import */ var _lib_waitFor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/waitFor */ "./src/content/expander/lib/waitFor.js");
/* harmony import */ var _lib_fetchImage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/fetchImage */ "./src/content/expander/lib/fetchImage.ts");






function createLoader(style = {}) {
  const loader = document.createElement("div");
  const circleIcon = document.createElement("div");
  circleIcon.className = "gz-circle-loader";
  loader.appendChild(circleIcon);
  dom_css__WEBPACK_IMPORTED_MODULE_1___default()(loader, {
    position: "fixed",
    boxShadow: "0 0 8px rgba(0,0,0,.6)",
    backgroundColor: "#fff",
    zIndex: 1000000,
    width: 40,
    height: 40,
    padding: 4,
    boxSizing: "border-box",
    ...style
  });
  return loader;
}
function createImagePreview({
  url,
  boxStyle
}) {
  const img = document.createElement("img");
  img.src = url;
  dom_css__WEBPACK_IMPORTED_MODULE_1___default()(img, {
    display: "inline-block",
    position: "fixed",
    zIndex: 1000000,
    backgroundColor: "#fff",
    maxWidth: 500,
    boxShadow: "0 0 8px rgba(0,0,0,.6)",
    ...boxStyle
  });
  return img;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  let previewIsShown = false;
  delegate__WEBPACK_IMPORTED_MODULE_0___default()(document, "a", "mouseover", event => {
    if (previewIsShown) return;
    const element = event.target;
    const href = element.getAttribute("href");
    if (element.querySelector("img")) return;
    const isGyazoUrl = !!(0,_lib_gyazoIdFromUrl__WEBPACK_IMPORTED_MODULE_2__["default"])(href);
    if (isGyazoUrl) {
      previewIsShown = true;
      let container;
      let loader = createLoader((0,_lib_adjacentStyle__WEBPACK_IMPORTED_MODULE_3__["default"])(element));
      document.body.appendChild(loader);
      let leaved = false;
      const onLeave = (event = {}) => {
        leaved = true;
        if (event.target && element !== event.target) return;
        if (container) document.body.removeChild(container);
        if (loader) document.body.removeChild(loader);
        element.removeEventListener("mouseleave", onLeave);
        previewIsShown = false;
      };
      const cancel = (0,_lib_waitFor__WEBPACK_IMPORTED_MODULE_4__["default"])(() => !element.offsetParent, onLeave);
      element.addEventListener("mouseleave", onLeave);
      element.addEventListener("mouseleave", cancel);
      (0,_lib_fetchImage__WEBPACK_IMPORTED_MODULE_5__.fetchImage)(href, (e, blob) => {
        if (leaved) return;
        document.body.removeChild(loader);
        loader = null;
        container = createImagePreview({
          url: window.URL.createObjectURL(blob),
          boxStyle: (0,_lib_adjacentStyle__WEBPACK_IMPORTED_MODULE_3__["default"])(element)
        });
        document.body.appendChild(container);
      });
    }
  });
});

/***/ }),

/***/ "./src/content/expander/lib/adjacentStyle.js":
/*!***************************************************!*\
  !*** ./src/content/expander/lib/adjacentStyle.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ adjacentStyle)
/* harmony export */ });


function adjacentStyle(element) {
  const rect = element.getBoundingClientRect();
  const offsetY = 20;
  const centerY = Math.floor(window.innerHeight / 2);
  if (rect.top > centerY) {
    return {
      left: rect.left,
      bottom: Math.round(window.innerHeight - rect.top + offsetY),
      maxHeight: Math.round(Math.min(rect.top - offsetY * 2, 500))
    };
  } else {
    const rectBottom = rect.top + rect.height;
    return {
      left: rect.left,
      top: Math.round(rectBottom + offsetY),
      maxHeight: Math.round(Math.min(window.innerHeight - rectBottom - offsetY * 2, 500))
    };
  }
}

/***/ }),

/***/ "./src/content/expander/lib/fetchImage.ts":
/*!************************************************!*\
  !*** ./src/content/expander/lib/fetchImage.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchImage: () => (/* binding */ fetchImage)
/* harmony export */ });
/* harmony import */ var _libs_MessageListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../libs/MessageListener */ "./src/libs/MessageListener.ts");

const fetchImage = async (url, callback) => {
  const response = await (0,_libs_MessageListener__WEBPACK_IMPORTED_MODULE_0__.sendMessageToMainScript)(chrome.runtime.id, {
    target: "main",
    action: "gyazoGetImageBlob",
    gyazoUrl: url
  });
  const xhr = new window.XMLHttpRequest();
  xhr.open("GET", response.imageBlobUrl, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = () => {
    const blob = new window.Blob([xhr.response], {
      type: "image/png"
    });
    callback(null, blob);
  };
  xhr.onerror = e => {
    callback(e);
  };
  xhr.send();
};

/***/ }),

/***/ "./src/content/expander/lib/gyazoIdFromUrl.js":
/*!****************************************************!*\
  !*** ./src/content/expander/lib/gyazoIdFromUrl.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gyazoIdFromUrl)
/* harmony export */ });


function gyazoIdFromUrl(str) {
  let parsedUrl;
  try {
    parsedUrl = new URL(str);
  } catch (e) {
    return;
  }
  if (/^(.+\.)?gyazo\.com$/.test(parsedUrl.host) && /^\/[0-9a-f]+$/.test(parsedUrl.pathname)) {
    return parsedUrl.pathname.slice(1);
  }
}

/***/ }),

/***/ "./src/content/expander/lib/waitFor.js":
/*!*********************************************!*\
  !*** ./src/content/expander/lib/waitFor.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ waitFor)
/* harmony export */ });
function waitFor(condition, fn) {
  const timer = window.setInterval(() => {
    if (!condition()) return;
    fn();
    cancel();
  }, 100);
  function cancel() {
    window.clearInterval(timer);
  }
  return cancel;
}

/***/ }),

/***/ "./src/content/insertMenu.ts":
/*!***********************************!*\
  !*** ./src/content/insertMenu.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createButtonOnMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createButtonOnMenu */ "./src/content/createButtonOnMenu.js");
/* harmony import */ var _libs_storageSwitcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/storageSwitcher */ "./src/libs/storageSwitcher.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions */ "./src/content/actions/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants */ "./src/constants/index.ts");
/* harmony import */ var _libs_MessageListener__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../libs/MessageListener */ "./src/libs/MessageListener.ts");
/* harmony import */ var _shadowDOM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shadowDOM */ "./src/content/shadowDOM.ts");
/* harmony import */ var _createOGPButtonOnMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createOGPButtonOnMenu */ "./src/content/createOGPButtonOnMenu.ts");







const REMOVE_GYAZOMENU_EVENT = new window.Event("removeGyazoMenu");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (...args) => {
  const [request, sender, sendResponse] = args;
  let capturesPageUrl = "https://gyazo.com/";
  if (false) {}
  let gyazoMenu = (0,_shadowDOM__WEBPACK_IMPORTED_MODULE_5__.shadowDOMQuerySelector)(".gyazo-menu:not(.gyazo-notification)");
  if (gyazoMenu) {
    gyazoMenu.remove();
    window.dispatchEvent(REMOVE_GYAZOMENU_EVENT);
  }
  const hideMenu = () => {
    if (gyazoMenu) {
      gyazoMenu.remove();
    }
    window.dispatchEvent(REMOVE_GYAZOMENU_EVENT);
  };
  gyazoMenu = document.createElement("div");
  gyazoMenu.className = "gyazo-menu gyazo-menu-element";
  const selectElementBtn = (0,_createButtonOnMenu__WEBPACK_IMPORTED_MODULE_0__["default"])("selection", chrome.i18n.getMessage("selectElement"), "E");
  const selectAreaBtn = (0,_createButtonOnMenu__WEBPACK_IMPORTED_MODULE_0__["default"])("crop", chrome.i18n.getMessage("selectArea"), "S");
  const windowCaptureBtn = (0,_createButtonOnMenu__WEBPACK_IMPORTED_MODULE_0__["default"])("window", chrome.i18n.getMessage("captureWindow"), "P");
  const wholeCaptureBtn = (0,_createButtonOnMenu__WEBPACK_IMPORTED_MODULE_0__["default"])("window-scroll", chrome.i18n.getMessage("topToBottom"), "W");
  const snapOGPImageBtn = (0,_createOGPButtonOnMenu__WEBPACK_IMPORTED_MODULE_6__["default"])("O");
  const myImageBtn = (0,_createButtonOnMenu__WEBPACK_IMPORTED_MODULE_0__["default"])("grid", chrome.i18n.getMessage("myImage"));
  myImageBtn.classList.add("gyazo-menu-myimage");
  const closeBtn = document.createElement("div");
  closeBtn.className = "gyazo-close-button gyazo-menu-element";
  const closeBtnIcon = document.createElement("div");
  closeBtnIcon.className = "gyazo-menu-element gyazo-icon gyazo-icon-cross";
  closeBtn.appendChild(closeBtnIcon);
  try {
    window.fetch(chrome.runtime.getURL("imgs/cross.svg")).then(res => res.text()).then(text => {
      closeBtnIcon.innerHTML = text;
    });
  } catch (e) {
    closeBtnIcon.innerHTML = `<img src='${chrome.runtime.getURL("imgs/cross.svg")}' class='gyazo-menu-element' />`;
  }
  closeBtn.setAttribute("title", "Press: Escape");
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "gyazo-button-container";
  snapOGPImageBtn && buttonContainer.appendChild(snapOGPImageBtn);
  buttonContainer.appendChild(selectElementBtn);
  buttonContainer.appendChild(selectAreaBtn);
  buttonContainer.appendChild(windowCaptureBtn);
  buttonContainer.appendChild(wholeCaptureBtn);
  buttonContainer.appendChild(myImageBtn);
  buttonContainer.appendChild(closeBtn);
  const upgradeLink = document.createElement("div");
  upgradeLink.className = "gyazo-upgrade-link";
  upgradeLink.innerHTML = `<span>${chrome.i18n.getMessage("upgradeLink")}</span>`;
  const onContextmenu = () => {
    hideMenu();
  };
  window.addEventListener("contextmenu", onContextmenu, {
    once: true
  });
  (0,_shadowDOM__WEBPACK_IMPORTED_MODULE_5__.shadowDOMAppendWithCss)(browser.runtime.getURL("menu.css"), gyazoMenu);
  gyazoMenu.appendChild(buttonContainer);
  const SHOW_UPGRADE_LINK_DATE = new Date("2024-06-17");
  const HIDE_UPGRADE_LINK_DATE = new Date("2024-06-25");

  // 2024-06-17から2024-06-25を迎えるまでの間に限り、個人版でProアップグレード導線を表示
  const now = new Date();
  if ( true && now < HIDE_UPGRADE_LINK_DATE && now >= SHOW_UPGRADE_LINK_DATE) {
    gyazoMenu.appendChild(upgradeLink);
  }
  const hotKey = function (event) {
    window.removeEventListener("keydown", hotKey);
    if (event.keyCode === _constants__WEBPACK_IMPORTED_MODULE_3__.ESC_KEY_CODE) {
      hideMenu();
    }
    switch (String.fromCharCode(event.keyCode)) {
      case "E":
        selectElementBtn.click();
        break;
      case "S":
        selectAreaBtn.click();
        break;
      case "P":
        windowCaptureBtn.click();
        break;
      case "W":
        wholeCaptureBtn.click();
        break;
      case "O":
        snapOGPImageBtn && snapOGPImageBtn.click();
        break;
    }
  };
  window.addEventListener("keydown", hotKey);
  let settings = {
    behavior: "area"
  };
  try {
    settings = await _libs_storageSwitcher__WEBPACK_IMPORTED_MODULE_1__["default"].get({
      behavior: "area"
    });
  } catch {
    // no-op
  }
  const {
    behavior
  } = settings;
  if (behavior === "element") {
    // Default behavior is select element
    selectElementBtn.classList.add("gyazo-button-active");
    window.requestAnimationFrame(() => (0,_actions__WEBPACK_IMPORTED_MODULE_2__.gyazoSelectElm)(request, sender, sendResponse));
  } else if (behavior === "area") {
    // Default behavior is select area
    selectAreaBtn.classList.add("gyazo-button-active");
    (0,_actions__WEBPACK_IMPORTED_MODULE_2__.gyazoCaptureSelectedArea)(request, sender, sendResponse);
  }
  selectAreaBtn.addEventListener("click", function () {
    if (behavior === "area") return;
    hideMenu();
    window.requestAnimationFrame(function () {
      (0,_actions__WEBPACK_IMPORTED_MODULE_2__.gyazoCaptureSelectedArea)(request, sender, sendResponse);
    });
  });
  selectElementBtn.addEventListener("click", function () {
    if (behavior === "element") return;
    hideMenu();
    window.requestAnimationFrame(function () {
      (0,_actions__WEBPACK_IMPORTED_MODULE_2__.gyazoSelectElm)(request, sender, sendResponse);
    });
  });
  windowCaptureBtn.addEventListener("click", function () {
    hideMenu();
    window.requestAnimationFrame(function () {
      (0,_actions__WEBPACK_IMPORTED_MODULE_2__.gyazocaptureWindow)(request, sender, sendResponse);
    });
  });
  wholeCaptureBtn.addEventListener("click", function () {
    hideMenu();
    window.requestAnimationFrame(function () {
      (0,_actions__WEBPACK_IMPORTED_MODULE_2__.gyazoWholeCapture)(request, sender, sendResponse);
    });
  });
  snapOGPImageBtn && snapOGPImageBtn.addEventListener("click", function () {
    hideMenu();
    (0,_actions__WEBPACK_IMPORTED_MODULE_2__.gyazoSnapOGPImage)(request, sender, sendResponse);
  });
  closeBtn.addEventListener("click", function () {
    hideMenu();
  });
  myImageBtn.addEventListener("click", function () {
    hideMenu();
    window.open(capturesPageUrl);
  });
  sendResponse();
});

/***/ }),

/***/ "./src/content/notification.ts":
/*!*************************************!*\
  !*** ./src/content/notification.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _libs_MessageListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/MessageListener */ "./src/libs/MessageListener.ts");
/* harmony import */ var _libs_storageSwitcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/storageSwitcher */ "./src/libs/storageSwitcher.js");
/* harmony import */ var _shadowDOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shadowDOM */ "./src/content/shadowDOM.ts");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((...args) => {
  const [request,, sendResponse] = args;
  let notificationContainer = (0,_shadowDOM__WEBPACK_IMPORTED_MODULE_2__.shadowDOMQuerySelector)(".gyazo-menu.gyazo-menu-element.gyazo-notification, .gyazo-menu.gyazo-notification");
  if (notificationContainer) {
    notificationContainer.classList.add("gyazo-notification");
  } else {
    notificationContainer = document.createElement("div");
    notificationContainer.className = "gyazo-menu gyazo-notification";
    (0,_shadowDOM__WEBPACK_IMPORTED_MODULE_2__.shadowDOMAppendWithCss)(browser.runtime.getURL("menu.css"), notificationContainer);
  }
  const notificationBody = document.createElement("div");
  notificationBody.className = "gyazo-notification-body";
  const notificationFooter = document.createElement("div");
  let title = document.createTextNode("");
  if (request.title) {
    title = document.createElement("div");
    title.className = "gyazo-notification-title";
    title.textContent = request.title;
  }
  const showImage = document.createElement("div");
  const showSuggest = document.createElement("div");
  if (request.imagePageUrl && request.imageUrl) {
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "gyazo-notification-image-wrapper";
    const imageContainer = document.createElement("a");
    imageContainer.href = request.imagePageUrl;
    imageContainer.target = "_blank";
    imageWrapper.appendChild(imageContainer);
    showImage.appendChild(imageWrapper);
    const imageElem = document.createElement("img");
    imageElem.className = "image";
    imageElem.src = request.imageUrl;
    imageElem.addEventListener("load", () => {
      const {
        naturalWidth,
        naturalHeight
      } = imageElem;
      if (request.scale !== undefined) {
        imageElem.style.maxWidth = naturalWidth / request.scale + "px";
        imageElem.style.maxHeight = naturalHeight / request.scale + "px";
      }
    });
    imageContainer.appendChild(imageElem);
    const toolContainer = document.createElement("div");
    toolContainer.className = "gyazo-notification-tool-container";
    showImage.appendChild(toolContainer);
    const imageButton = document.createElement("a");
    imageButton.href = request.imagePageUrl;
    imageButton.target = "_blank";
    imageButton.className = "gyazo-notification-button";
    imageButton.textContent = chrome.i18n.getMessage("openImagePage");
    toolContainer.appendChild(imageButton);
    const drawButton = document.createElement("a");
    const paramsForDrawUTM = "?utm_source=gyazo_browser_extension&utm_campaign=notification";
    drawButton.href = request.imagePageUrl + "/draw" + paramsForDrawUTM;
    drawButton.target = "_blank";
    drawButton.className = "gyazo-notification-button";
    drawButton.textContent = chrome.i18n.getMessage("openDrawPage");
    toolContainer.appendChild(drawButton);

    /** 画像リンクの自動コピー設定を提案するメッセージ */
    const suggestCopyUrlMessage1 = document.createElement("p");
    const suggestCopyUrlMessage2 = document.createElement("p");
    suggestCopyUrlMessage1.textContent = chrome.i18n.getMessage("suggestCopyUrlSupportMessage1");
    suggestCopyUrlMessage2.textContent = chrome.i18n.getMessage("suggestCopyUrlSupportMessage2");
    showSuggest.append(suggestCopyUrlMessage1, suggestCopyUrlMessage2);

    /** 設定ページを開くボタン */
    const goToSettings = document.createElement("button");
    goToSettings.className = "gyazo-notification-button";
    goToSettings.textContent = chrome.i18n.getMessage("goToSettings");
    goToSettings.addEventListener("click", function () {
      (0,_libs_MessageListener__WEBPACK_IMPORTED_MODULE_0__.sendMessageToMainScript)(chrome.runtime.id, {
        target: "main",
        action: "requestPermissionCopyUrlToClipboard"
      });
      _libs_storageSwitcher__WEBPACK_IMPORTED_MODULE_1__["default"].set({
        copyUrlSupportClosed: true
      });
      notificationContainer?.removeChild(notificationFooter);
    });
    const goToSettingsWrapper = document.createElement("div");
    goToSettingsWrapper.className = "gyazo-notification-button-wrapper";
    goToSettingsWrapper.appendChild(goToSettings);
    showSuggest.appendChild(goToSettingsWrapper);

    /** クリックすると、以後は提案メッセージを表示しない */
    const doNotShowThisMessage = document.createElement("a");
    doNotShowThisMessage.className = "gyazo-notification-link";
    doNotShowThisMessage.textContent = chrome.i18n.getMessage("doNotShowThisMessage");
    doNotShowThisMessage.addEventListener("click", function () {
      _libs_storageSwitcher__WEBPACK_IMPORTED_MODULE_1__["default"].set({
        copyUrlSupportClosed: true
      });
      notificationContainer?.removeChild(notificationFooter);
    });
    showSuggest.appendChild(doNotShowThisMessage);

    /** 青地に白文字のスタイルも画像読み込み後に当てる */
    showSuggest.className = "gyazo-notification-suggest";
  } else {
    const loadingElm = document.createElement("span");
    loadingElm.className = "gyazo-spin";
    try {
      window.fetch(chrome.runtime.getURL("imgs/spinner.svg")).then(res => res.text()).then(text => {
        loadingElm.innerHTML = text;
      });
    } catch (e) {
      loadingElm.innerHTML = `<img src='${chrome.runtime.getURL("imgs/spinner.svg")}' />`;
    }
    showImage.appendChild(loadingElm);
  }
  notificationBody.innerHTML = "";
  notificationBody.append(title, showImage);
  notificationFooter.innerHTML = "";
  notificationFooter.appendChild(showSuggest);
  notificationContainer.innerHTML = "";
  notificationContainer.appendChild(notificationBody);
  _libs_storageSwitcher__WEBPACK_IMPORTED_MODULE_1__["default"].get({
    copyUrlSupportClosed: false
  }).then(async item => {
    if (item.copyUrlSupportClosed) return;
    notificationContainer?.appendChild(notificationFooter);
  });
  if (request.isFinish) {
    notificationContainer.querySelector(".image")?.addEventListener("load", function () {
      window.setTimeout(function () {
        notificationContainer?.remove();
      }, 5000);
    });
  }
  sendResponse();
});

/***/ }),

/***/ "./src/content/shadowDOM.ts":
/*!**********************************!*\
  !*** ./src/content/shadowDOM.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shadowDOMAppend: () => (/* binding */ shadowDOMAppend),
/* harmony export */   shadowDOMAppendWithCss: () => (/* binding */ shadowDOMAppendWithCss),
/* harmony export */   shadowDOMQuerySelector: () => (/* binding */ shadowDOMQuerySelector),
/* harmony export */   shadowDOMQuerySelectorAll: () => (/* binding */ shadowDOMQuerySelectorAll)
/* harmony export */ });
let host = undefined;
const shadowDOM = () => {
  if (!host) {
    host = document.createElement("div");
    host.attachShadow({
      mode: "open"
    });
    document.body.append(host);
  }
  return host.shadowRoot;
};
const shadowDOMAppend = (...elements) => {
  shadowDOM()?.append(...elements);
};
const shadowDOMAppendWithCss = (csspath, ...elements) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = csspath;
  shadowDOM()?.append(link, ...elements);
};

// node_modules/typescript/lib/lib.dom.d.ts より持ってきた

function shadowDOMQuerySelector(selectors) {
  return shadowDOM()?.querySelector(selectors) ?? null;
}
function shadowDOMQuerySelectorAll(selectors) {
  const container = shadowDOM();
  if (!container) return [];
  const elem = Array.from(container.querySelectorAll(selectors));
  return elem;
}

/***/ }),

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

/***/ "./src/libs/changeFixedElementToAbsolute.js":
/*!**************************************************!*\
  !*** ./src/libs/changeFixedElementToAbsolute.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  Array.from(document.querySelectorAll(":not(.gyazo-whole-capture-onetime-position-value-changed)")).forEach(item => {
    const positionValue = window.getComputedStyle(item).position;
    if (positionValue === "fixed") {
      item.classList.add("gyazo-whole-capture-onetime-position-value-changed");
      item.style.setProperty("position", "absolute", "important");
      item.dataset.originalPosition = item.style.position;
    } else if (positionValue === "sticky") {
      item.dataset.originalPosition = positionValue;
      item.classList.add("gyazo-whole-capture-onetime-position-value-changed", "gyazo-whole-capture-onetime-position-sticky");
      item.dataset.originalPosition = item.style.position;
      const observer = new IntersectionObserver(([e]) => {
        if (e.intersectionRatio < 1) {
          e.target.style.setProperty("position", "sticky", "important");
        } else {
          e.target.style.setProperty("position", "static", "important");
          observer.disconnect();
        }
      }, {
        threshold: [1]
      });
      observer.observe(item);
    }
  });
});

/***/ }),

/***/ "./src/libs/extractOGPImage.ts":
/*!*************************************!*\
  !*** ./src/libs/extractOGPImage.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  const og = document.querySelector("meta[name*=image][content],meta[property*=image][content]");
  return og?.getAttribute("content");
});

/***/ }),

/***/ "./src/libs/getZoomAndScale.js":
/*!*************************************!*\
  !*** ./src/libs/getZoomAndScale.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bowser */ "./node_modules/bowser/src/bowser.js");
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bowser__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  let zoom = Math.round(window.outerWidth / window.innerWidth * 100) / 100;
  // XXX: on Windows, when window is not maximum, it should tweak zoom.(Chrome zoom level 1 is 1.10)
  const isMaximum = window.outerHeight === screen.availHeight && window.outerWidth === screen.availWidth;
  if ((bowser__WEBPACK_IMPORTED_MODULE_0___default().windows) && !isMaximum && zoom > 1.0 && zoom < 1.05) {
    zoom = 1.0;
  }
  const scale = window.devicePixelRatio / zoom;
  return {
    zoom,
    scale
  };
});

/***/ }),

/***/ "./src/libs/isPressCommandKey.js":
/*!***************************************!*\
  !*** ./src/libs/isPressCommandKey.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bowser */ "./node_modules/bowser/src/bowser.js");
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bowser__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (event => {
  //  Return true when
  //  Press CommandKey on MacOSX or CtrlKey on Windows or Linux
  if (!(event instanceof MouseEvent || event instanceof KeyboardEvent)) {
    return false;
  }
  if ((bowser__WEBPACK_IMPORTED_MODULE_0___default().mac)) {
    return event.metaKey || event.keyIdentifier === "Meta";
  } else {
    return event.ctrlKey || event.keyIdentifier === "Control";
  }
});

/***/ }),

/***/ "./src/libs/jackupElement.js":
/*!***********************************!*\
  !*** ./src/libs/jackupElement.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ JackupElement)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants/index.ts");

class JackupElement {
  constructor() {
    const jackup = document.createElement("div");
    jackup.classList.add("gyazo-jackup-element");
    document.body.appendChild(jackup);
    this.element = jackup;
    this.originalHTMLHeightValue = null;
    this.originalBodyHeightValue = null;
  }
  set height(height) {
    if (!this.element) return;
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    const cssVal = window.innerHeight + _constants__WEBPACK_IMPORTED_MODULE_0__.JACKUP_MARGIN + "px";
    this.element.style.height = cssVal;
    this.element.style.maxHeight = cssVal;
    this.element.style.minHeight = cssVal;
    const htmlHeight = window.getComputedStyle(html).getPropertyValue("height");
    const bodyHeight = window.getComputedStyle(body).getPropertyValue("height");
    if (htmlHeight === bodyHeight) {
      this.originalHTMLHeightValue = html.style.height;
      this.originalBodyHeightValue = body.style.height;
      html.style.height = "auto";
    }
  }
  remove() {
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    html.style.height = this.originalHTMLHeightValue;
    body.style.height = this.originalBodyHeightValue;
    body.removeChild(this.element);
    this.element = null;
    this.originalHTMLHeightValue = null;
    this.originalBodyHeightValue = null;
  }
}

/***/ }),

/***/ "./src/libs/pageScrollSize.js":
/*!************************************!*\
  !*** ./src/libs/pageScrollSize.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   height: () => (/* binding */ height),
/* harmony export */   width: () => (/* binding */ width)
/* harmony export */ });
const height = () => Math.max(document.body.clientHeight, document.body.offsetHeight, document.body.scrollHeight, document.documentElement.clientHeight, document.documentElement.offsetHeight, document.documentElement.scrollHeight);
const width = () => Math.max(document.body.clientWidth, document.body.offsetWidth, document.body.scrollWidth, document.documentElement.clientWidth, document.documentElement.offsetWidth, document.documentElement.scrollWidth);

/***/ }),

/***/ "./src/libs/restoreFixedElement.js":
/*!*****************************************!*\
  !*** ./src/libs/restoreFixedElement.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  const fixedElms = document.getElementsByClassName("gyazo-whole-capture-onetime-position-value-changed");
  Array.from(fixedElms).forEach(item => {
    item.classList.remove("gyazo-whole-capture-onetime-position-value-changed", "gyazo-whole-capture-onetime-position-sticky");
    item.style.removeProperty("position");
    item.style.position = item.dataset.originalPosition;
  });
});

/***/ }),

/***/ "./src/libs/scroll.js":
/*!****************************!*\
  !*** ./src/libs/scroll.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lockScroll: () => (/* binding */ lockScroll),
/* harmony export */   packScrollBar: () => (/* binding */ packScrollBar),
/* harmony export */   unlockScroll: () => (/* binding */ unlockScroll)
/* harmony export */ });
const lockScroll = () => {
  const {
    overflow,
    overflowY,
    marginRight
  } = document.documentElement.style;
  const _w = document.documentElement.getBoundingClientRect().width;
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.overflowY = "hidden";
  const w = document.documentElement.getBoundingClientRect().width;
  const scrollBarWidth = w - _w;
  return {
    overflow,
    overflowY,
    marginRight,
    scrollBarWidth
  };
};
const unlockScroll = (old = {
  overflow: "auto",
  overflowY: "auto"
}) => {
  document.documentElement.style.overflow = old.overflow;
  document.documentElement.style.overflowY = old.overflowY;
  document.documentElement.style.marginRight = old.marginRight;
};
const packScrollBar = old => {
  document.documentElement.style.marginRight = `${old.scrollBarWidth}px`;
};

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

/***/ "./node_modules/bowser/src/bowser.js":
/*!*******************************************!*\
  !*** ./node_modules/bowser/src/bowser.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  if ( true && module.exports) module.exports = definition()
  else if (true) __webpack_require__.amdD(name, definition)
  else {}
}(this, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)(o|0)s/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getSecondMatch(/edg([ea]|ios)\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua) && !/tablet pc/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    } else if (/opr\/|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/Whale/i.test(ua)) {
      result = {
        name: 'NAVER Whale browser'
        , whale: t
        , version: getFirstMatch(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/MZBrowser/i.test(ua)) {
      result = {
        name: 'MZ Browser'
        , mzbrowser: t
        , version: getFirstMatch(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/focus/i.test(ua)) {
      result = {
        name: 'Focus'
        , focus: t
        , version: getFirstMatch(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , osname: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , osname: 'Chrome OS'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/edg([ea]|ios)/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , osname: 'Sailfish OS'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
        result.osname = 'Firefox OS'
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , osname: 'BlackBerry OS'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , osname: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , osname: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , osname: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && (android || result.silk)) {
      result.android = t
      result.osname = 'Android'
    } else if (!result.windowsphone && iosdevice) {
      result[iosdevice] = t
      result.ios = t
      result.osname = 'iOS'
    } else if (mac) {
      result.mac = t
      result.osname = 'macOS'
    } else if (xbox) {
      result.xbox = t
      result.osname = 'Xbox'
    } else if (windows) {
      result.windows = t
      result.osname = 'Windows'
    } else if (linux) {
      result.linux = t
      result.osname = 'Linux'
    }

    function getWindowsVersion (s) {
      switch (s) {
        case 'NT': return 'NT'
        case 'XP': return 'XP'
        case 'NT 5.0': return '2000'
        case 'NT 5.1': return 'XP'
        case 'NT 5.2': return '2003'
        case 'NT 6.0': return 'Vista'
        case 'NT 6.1': return '7'
        case 'NT 6.2': return '8'
        case 'NT 6.3': return '8.1'
        case 'NT 10.0': return '10'
        default: return undefined
      }
    }

    // OS version extraction
    var osVersion = '';
    if (result.windows) {
      osVersion = getWindowsVersion(getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i))
    } else if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (result.mac) {
      osVersion = getFirstMatch(/Mac OS X (\d+([_\.\s]\d+)*)/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = !result.windows && osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.whale && compareVersions([result.version, '1.0']) === 1) ||
        (result.mzbrowser && compareVersions([result.version, '6.0']) === 1) ||
        (result.focus && compareVersions([result.version, '1.0']) === 1) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  /*
   * Set our detect public method to the main bowser object
   * This is needed to implement bowser in server side
   */
  bowser.detect = detect;
  return bowser
});


/***/ }),

/***/ "./node_modules/delegate/src/closest.js":
/*!**********************************************!*\
  !*** ./node_modules/delegate/src/closest.js ***!
  \**********************************************/
/***/ ((module) => {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ }),

/***/ "./node_modules/delegate/src/delegate.js":
/*!***********************************************!*\
  !*** ./node_modules/delegate/src/delegate.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var closest = __webpack_require__(/*! ./closest */ "./node_modules/delegate/src/closest.js");

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),

/***/ "./node_modules/dom-css/index.js":
/*!***************************************!*\
  !*** ./node_modules/dom-css/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var prefix = __webpack_require__(/*! prefix-style */ "./node_modules/prefix-style/index.js")
var toCamelCase = __webpack_require__(/*! to-camel-case */ "./node_modules/to-camel-case/index.js")
var cache = { 'float': 'cssFloat' }
var addPxToStyle = __webpack_require__(/*! add-px-to-style */ "./node_modules/add-px-to-style/index.js")

function style (element, property, value) {
  var camel = cache[property]
  if (typeof camel === 'undefined') {
    camel = detect(property)
  }

  // may be false if CSS prop is unsupported
  if (camel) {
    if (value === undefined) {
      return element.style[camel]
    }

    element.style[camel] = addPxToStyle(camel, value)
  }
}

function each (element, properties) {
  for (var k in properties) {
    if (properties.hasOwnProperty(k)) {
      style(element, k, properties[k])
    }
  }
}

function detect (cssProp) {
  var camel = toCamelCase(cssProp)
  var result = prefix(camel)
  cache[camel] = cache[cssProp] = cache[result] = result
  return result
}

function set () {
  if (arguments.length === 2) {
    if (typeof arguments[1] === 'string') {
      arguments[0].style.cssText = arguments[1]
    } else {
      each(arguments[0], arguments[1])
    }
  } else {
    style(arguments[0], arguments[1], arguments[2])
  }
}

module.exports = set
module.exports.set = set

module.exports.get = function (element, properties) {
  if (Array.isArray(properties)) {
    return properties.reduce(function (obj, prop) {
      obj[prop] = style(element, prop || '')
      return obj
    }, {})
  } else {
    return style(element, properties || '')
  }
}


/***/ }),

/***/ "./node_modules/prefix-style/index.js":
/*!********************************************!*\
  !*** ./node_modules/prefix-style/index.js ***!
  \********************************************/
/***/ ((module) => {

var div = null
var prefixes = [ 'Webkit', 'Moz', 'O', 'ms' ]

module.exports = function prefixStyle (prop) {
  // re-use a dummy div
  if (!div) {
    div = document.createElement('div')
  }

  var style = div.style

  // prop exists without prefix
  if (prop in style) {
    return prop
  }

  // borderRadius -> BorderRadius
  var titleCase = prop.charAt(0).toUpperCase() + prop.slice(1)

  // find the vendor-prefixed prop
  for (var i = prefixes.length; i >= 0; i--) {
    var name = prefixes[i] + titleCase
    // e.g. WebkitBorderRadius or webkitBorderRadius
    if (name in style) {
      return name
    }
  }

  return false
}


/***/ }),

/***/ "./node_modules/to-camel-case/index.js":
/*!*********************************************!*\
  !*** ./node_modules/to-camel-case/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var space = __webpack_require__(/*! to-space-case */ "./node_modules/to-space-case/index.js")

/**
 * Export.
 */

module.exports = toCamelCase

/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 */

function toCamelCase(string) {
  return space(string).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase()
  })
}


/***/ }),

/***/ "./node_modules/to-no-case/index.js":
/*!******************************************!*\
  !*** ./node_modules/to-no-case/index.js ***!
  \******************************************/
/***/ ((module) => {


/**
 * Export.
 */

module.exports = toNoCase

/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/
var hasSeparator = /(_|-|\.|:)/
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase(string) {
  if (hasSpace.test(string)) return string.toLowerCase()
  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase()
  if (hasCamel.test(string)) return uncamelize(string).toLowerCase()
  return string.toLowerCase()
}

/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : ''
  })
}

/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ')
  })
}


/***/ }),

/***/ "./node_modules/to-space-case/index.js":
/*!*********************************************!*\
  !*** ./node_modules/to-space-case/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var clean = __webpack_require__(/*! to-no-case */ "./node_modules/to-no-case/index.js")

/**
 * Export.
 */

module.exports = toSpaceCase

/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */

function toSpaceCase(string) {
  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : ''
  }).trim()
}


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
/******/ 	/* webpack/runtime/amd define */
/******/ 	(() => {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	})();
/******/ 	
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
/*!********************************!*\
  !*** ./src/content/content.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bowser */ "./node_modules/bowser/src/bowser.js");
/* harmony import */ var bowser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bowser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_MessageListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/MessageListener */ "./src/libs/MessageListener.ts");
/* harmony import */ var _expander__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expander */ "./src/content/expander/index.js");
/* harmony import */ var _notification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notification */ "./src/content/notification.ts");
/* harmony import */ var _insertMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./insertMenu */ "./src/content/insertMenu.ts");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions */ "./src/content/actions/index.js");






(function () {
  if (window.__embededGyazoContentJS) {
    return;
  }
  window.__embededGyazoContentJS = true;
  const onMessageListener = new _libs_MessageListener__WEBPACK_IMPORTED_MODULE_1__["default"]("content");
  if (/gyazo\.com/.test(location.hostname)) {
    document.documentElement.setAttribute("data-extension-installed", JSON.stringify(true));
  }
  onMessageListener.add("notification", _notification__WEBPACK_IMPORTED_MODULE_3__["default"]);
  onMessageListener.add("insertMenu", _insertMenu__WEBPACK_IMPORTED_MODULE_4__["default"]);
  onMessageListener.add("changeFixedElementToAbsolute", _actions__WEBPACK_IMPORTED_MODULE_5__.changeFixedElementToAbsolute);
  onMessageListener.add("captureWindow", _actions__WEBPACK_IMPORTED_MODULE_5__.gyazocaptureWindow);
  onMessageListener.add("captureSelectArea", _actions__WEBPACK_IMPORTED_MODULE_5__.gyazoCaptureSelectedArea);
  onMessageListener.add("captureElement", _actions__WEBPACK_IMPORTED_MODULE_5__.gyazoSelectElm);
  onMessageListener.add("captureWholePage", _actions__WEBPACK_IMPORTED_MODULE_5__.gyazoWholeCapture);
  chrome.runtime.onMessage.addListener(
  // @ts-expect-error XXX
  onMessageListener.listen.bind(onMessageListener));
  if (!(bowser__WEBPACK_IMPORTED_MODULE_0___default().firefox) &&
  // XXX: Firefox can't embed moz-extension:// file in content
  !/^(.+\.)?gyazo\.com$/.test(window.location.host) // Prevent showing preview on gyazo.com
  ) (0,_expander__WEBPACK_IMPORTED_MODULE_2__["default"])();
})();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Tzs7Ozs7Ozs7OztBQzVIdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU0sS0FBNEI7QUFDbEMsV0FBVyxJQUF5QyxFQUFFLHdCQUFNO0FBQzVELE9BQU8sRUFBeUI7QUFDaEMsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG9CQUFvQix3QkFBd0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCLGNBQWMsVUFBVTtBQUN4QixjQUFjO0FBQ2Q7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QUM7RUFFNUR6RSxNQUFNLENBQUNDLE9BQU8sQ0FBQ21VLFNBQVMsQ0FBQ3RCLFdBQVc7RUFDbEM7RUFDQWtCLGlCQUFpQixDQUFDbkYsTUFBTSxDQUFDd0YsSUFBSSxDQUFDTCxpQkFBaUIsQ0FDakQsQ0FBQztFQUNELElBQ0UsQ0FBQ25FLHVEQUFtQjtFQUFJO0VBQ3hCLENBQUMscUJBQXFCLENBQUNqSCxJQUFJLENBQUMzSyxNQUFNLENBQUMyQyxRQUFRLENBQUNpSSxJQUFJLENBQUMsQ0FBQztFQUFBLEVBRWxEK0sscURBQVEsQ0FBQyxDQUFDO0FBQ2QsQ0FBQyxFQUFFLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uLy4vbm9kZV9tb2R1bGVzL2FkZC1weC10by1zdHlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9jb25zdGFudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvY29udGVudC9hY3Rpb25zL2NoYW5nZUZpeGVkRWxlbWVudFRvQWJzb2x1dGUudHMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvY29udGVudC9hY3Rpb25zL2d5YXpvQ2FwdHVyZVNlbGVjdGVkQXJlYS50cyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9jb250ZW50L2FjdGlvbnMvZ3lhem9TZWxlY3RFbG0udHMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvY29udGVudC9hY3Rpb25zL2d5YXpvU25hcE9HUEltYWdlLnRzIiwid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uLy4vc3JjL2NvbnRlbnQvYWN0aW9ucy9neWF6b1dob2xlQ2FwdHVyZS50cyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9jb250ZW50L2FjdGlvbnMvZ3lhem9jYXB0dXJlV2luZG93LnRzIiwid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uLy4vc3JjL2NvbnRlbnQvYWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9jb250ZW50L2NyZWF0ZUJ1dHRvbk9uTWVudS5qcyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9jb250ZW50L2NyZWF0ZU9HUEJ1dHRvbk9uTWVudS50cyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9jb250ZW50L2V4cGFuZGVyL2luZGV4LmpzIiwid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uLy4vc3JjL2NvbnRlbnQvZXhwYW5kZXIvbGliL2FkamFjZW50U3R5bGUuanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvY29udGVudC9leHBhbmRlci9saWIvZmV0Y2hJbWFnZS50cyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9jb250ZW50L2V4cGFuZGVyL2xpYi9neWF6b0lkRnJvbVVybC5qcyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9jb250ZW50L2V4cGFuZGVyL2xpYi93YWl0Rm9yLmpzIiwid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uLy4vc3JjL2NvbnRlbnQvaW5zZXJ0TWVudS50cyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9jb250ZW50L25vdGlmaWNhdGlvbi50cyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9jb250ZW50L3NoYWRvd0RPTS50cyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9saWJzL01lc3NhZ2VMaXN0ZW5lci50cyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9saWJzL2NoYW5nZUZpeGVkRWxlbWVudFRvQWJzb2x1dGUuanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvbGlicy9leHRyYWN0T0dQSW1hZ2UudHMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvbGlicy9nZXRab29tQW5kU2NhbGUuanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvbGlicy9pc1ByZXNzQ29tbWFuZEtleS5qcyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9saWJzL2phY2t1cEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvbGlicy9wYWdlU2Nyb2xsU2l6ZS5qcyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9saWJzL3Jlc3RvcmVGaXhlZEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvbGlicy9zY3JvbGwuanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvbGlicy9zdG9yYWdlU3dpdGNoZXIuanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9ub2RlX21vZHVsZXMvYm93c2VyL3NyYy9ib3dzZXIuanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9ub2RlX21vZHVsZXMvZGVsZWdhdGUvc3JjL2Nsb3Nlc3QuanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9ub2RlX21vZHVsZXMvZGVsZWdhdGUvc3JjL2RlbGVnYXRlLmpzIiwid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uLy4vbm9kZV9tb2R1bGVzL2RvbS1jc3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9ub2RlX21vZHVsZXMvcHJlZml4LXN0eWxlL2luZGV4LmpzIiwid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uLy4vbm9kZV9tb2R1bGVzL3RvLWNhbWVsLWNhc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9ub2RlX21vZHVsZXMvdG8tbm8tY2FzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL25vZGVfbW9kdWxlcy90by1zcGFjZS1jYXNlL2luZGV4LmpzIiwid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uLy4vbm9kZV9tb2R1bGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9kaXN0L2Jyb3dzZXItcG9seWZpbGwuanMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2FtZCBkZWZpbmUiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2d5YXpvLWJyb3dzZXItZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9neWF6by1icm93c2VyLWV4dGVuc2lvbi8uL3NyYy9wb2x5ZmlsbHMudHMiLCJ3ZWJwYWNrOi8vZ3lhem8tYnJvd3Nlci1leHRlbnNpb24vLi9zcmMvY29udGVudC9jb250ZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIFRoZSBmb2xsb3dpbmcgbGlzdCBpcyBkZWZpbmVkIGluIFJlYWN0J3MgY29yZSAqL1xudmFyIElTX1VOSVRMRVNTID0ge1xuICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogdHJ1ZSxcbiAgYm94RmxleDogdHJ1ZSxcbiAgYm94RmxleEdyb3VwOiB0cnVlLFxuICBib3hPcmRpbmFsR3JvdXA6IHRydWUsXG4gIGNvbHVtbkNvdW50OiB0cnVlLFxuICBmbGV4OiB0cnVlLFxuICBmbGV4R3JvdzogdHJ1ZSxcbiAgZmxleFBvc2l0aXZlOiB0cnVlLFxuICBmbGV4U2hyaW5rOiB0cnVlLFxuICBmbGV4TmVnYXRpdmU6IHRydWUsXG4gIGZsZXhPcmRlcjogdHJ1ZSxcbiAgZ3JpZFJvdzogdHJ1ZSxcbiAgZ3JpZENvbHVtbjogdHJ1ZSxcbiAgZm9udFdlaWdodDogdHJ1ZSxcbiAgbGluZUNsYW1wOiB0cnVlLFxuICBsaW5lSGVpZ2h0OiB0cnVlLFxuICBvcGFjaXR5OiB0cnVlLFxuICBvcmRlcjogdHJ1ZSxcbiAgb3JwaGFuczogdHJ1ZSxcbiAgdGFiU2l6ZTogdHJ1ZSxcbiAgd2lkb3dzOiB0cnVlLFxuICB6SW5kZXg6IHRydWUsXG4gIHpvb206IHRydWUsXG5cbiAgLy8gU1ZHLXJlbGF0ZWQgcHJvcGVydGllc1xuICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgc3RvcE9wYWNpdHk6IHRydWUsXG4gIHN0cm9rZURhc2hvZmZzZXQ6IHRydWUsXG4gIHN0cm9rZU9wYWNpdHk6IHRydWUsXG4gIHN0cm9rZVdpZHRoOiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIUlTX1VOSVRMRVNTWyBuYW1lIF0pIHtcbiAgICByZXR1cm4gdmFsdWUgKyAncHgnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufTsiLCJleHBvcnQgY29uc3QgRVNDX0tFWV9DT0RFID0gMjc7XG5leHBvcnQgY29uc3QgSkFDS1VQX01BUkdJTiA9IDMwO1xuIiwiaW1wb3J0IGNoYW5nZUZpeGVkRWxlbWVudFRvQWJzb2x1dGUgZnJvbSBcIi4uLy4uL2xpYnMvY2hhbmdlRml4ZWRFbGVtZW50VG9BYnNvbHV0ZVwiO1xuaW1wb3J0IHsgTWVzc2FnZUhhbmRsZXIgfSBmcm9tIFwiLi4vLi4vbGlicy9NZXNzYWdlTGlzdGVuZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPE1lc3NhZ2VIYW5kbGVyPFwiY2hhbmdlRml4ZWRFbGVtZW50VG9BYnNvbHV0ZVwiPj5cbikgPT4ge1xuICBjb25zdCBbLCAsIHNlbmRSZXNwb25zZV0gPSBhcmdzO1xuICBjaGFuZ2VGaXhlZEVsZW1lbnRUb0Fic29sdXRlKCk7XG4gIHNlbmRSZXNwb25zZSgpO1xufTtcbiIsImltcG9ydCByZXN0b3JlRml4ZWRFbGVtZW50IGZyb20gXCIuLi8uLi9saWJzL3Jlc3RvcmVGaXhlZEVsZW1lbnRcIjtcbmltcG9ydCBnZXRab29tQW5kU2NhbGUgZnJvbSBcIi4uLy4uL2xpYnMvZ2V0Wm9vbUFuZFNjYWxlXCI7XG5pbXBvcnQgeyBsb2NrU2Nyb2xsLCB1bmxvY2tTY3JvbGwsIHBhY2tTY3JvbGxCYXIgfSBmcm9tIFwiLi4vLi4vbGlicy9zY3JvbGxcIjtcbmltcG9ydCB7XG4gIGhlaWdodCBhcyBwYWdlSGVpZ2h0LFxuICB3aWR0aCBhcyBwYWdlV2lkdGgsXG59IGZyb20gXCIuLi8uLi9saWJzL3BhZ2VTY3JvbGxTaXplXCI7XG5pbXBvcnQgSmFja3VwRWxlbWVudCBmcm9tIFwiLi4vLi4vbGlicy9qYWNrdXBFbGVtZW50XCI7XG5pbXBvcnQgeyBFU0NfS0VZX0NPREUgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBNZXNzYWdlSGFuZGxlcixcbiAgc2VuZE1lc3NhZ2VUb01haW5TY3JpcHQsXG59IGZyb20gXCIuLi8uLi9saWJzL01lc3NhZ2VMaXN0ZW5lclwiO1xuaW1wb3J0IHsgc2hhZG93RE9NUXVlcnlTZWxlY3RvciB9IGZyb20gXCIuLi9zaGFkb3dET01cIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPE1lc3NhZ2VIYW5kbGVyPFwiY2FwdHVyZVNlbGVjdEFyZWFcIj4+XG4pID0+IHtcbiAgY29uc3QgW3JlcXVlc3RdID0gYXJncztcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ3lhem8tamFja3VwLWVsZW1lbnRcIikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbGV0IHN0YXJ0WDogbnVtYmVyLCBzdGFydFk6IG51bWJlcjtcbiAgY29uc3QgdGVtcFVzZXJTZWxlY3QgPSBkb2N1bWVudC5ib2R5LnN0eWxlLndlYmtpdFVzZXJTZWxlY3Q7XG4gIGNvbnN0IGxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgamFja3VwID0gbmV3IEphY2t1cEVsZW1lbnQoKTtcbiAgbGF5ZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIGxheWVyLnN0eWxlLmxlZnQgPSBkb2N1bWVudC5ib2R5LmNsaWVudExlZnQgKyBcInB4XCI7XG4gIGxheWVyLnN0eWxlLnRvcCA9IGRvY3VtZW50LmJvZHkuY2xpZW50VG9wICsgXCJweFwiO1xuICBsYXllci5zdHlsZS53aWR0aCA9IHBhZ2VXaWR0aCgpICsgXCJweFwiO1xuICBsYXllci5zdHlsZS5oZWlnaHQgPSBwYWdlSGVpZ2h0KCkgKyBcInB4XCI7XG4gIGxheWVyLnN0eWxlLnpJbmRleCA9IFwiMjE0NzQ4MzY0NlwiOyAvLyBNYXhpbXVuIG51bWJlciBvZiAzMmJpdCBJbnQgLSAxXG4gIGxheWVyLnN0eWxlLmN1cnNvciA9IFwiY3Jvc3NoYWlyXCI7XG4gIGxheWVyLmNsYXNzTmFtZSA9IFwiZ3lhem8tc2VsZWN0LWxheWVyXCI7XG4gIGRvY3VtZW50LmJvZHkuc3R5bGUud2Via2l0VXNlclNlbGVjdCA9IFwibm9uZVwiO1xuICBjb25zdCBzZWxlY3Rpb25FbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsYXllci5hcHBlbmRDaGlsZChzZWxlY3Rpb25FbG0pO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxheWVyKTtcbiAgY29uc3QgdXBkYXRlU2VsZWN0aW9uRWxtU3R5bGUgPSBmdW5jdGlvbiAoc3R5bGVzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9KSB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXk6IHN0cmluZykge1xuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBYWFhcbiAgICAgIHNlbGVjdGlvbkVsbS5zdHlsZVtrZXldID0gc3R5bGVzW2tleV07XG4gICAgfSk7XG4gIH07XG4gIHVwZGF0ZVNlbGVjdGlvbkVsbVN0eWxlKHtcbiAgICBiYWNrZ3JvdW5kOiBcInJnYmEoOTIsIDkyLCA5MiwgMC4zKVwiLFxuICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gIH0pO1xuICBjb25zdCBjYW5jZWxHeWF6byA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIShsYXllci5wYXJlbnROb2RlICYmIGphY2t1cC5lbGVtZW50LnBhcmVudE5vZGUpKSByZXR1cm47XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsYXllcik7XG4gICAgamFja3VwLnJlbW92ZSgpO1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUud2Via2l0VXNlclNlbGVjdCA9IHRlbXBVc2VyU2VsZWN0O1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGtleWRvd25IYW5kbGVyKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIGNhbmNlbEd5YXpvKTtcbiAgICByZXN0b3JlRml4ZWRFbGVtZW50KCk7XG4gICAgY29uc3QgbWVudSA9IHNoYWRvd0RPTVF1ZXJ5U2VsZWN0b3IoXCIuZ3lhem8tbWVudVwiKTtcbiAgICBpZiAobWVudSkge1xuICAgICAgbWVudS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHJlbW92ZWRHeWF6b01lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2FuY2VsR3lhem8oKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlbW92ZUd5YXpvTWVudVwiLCByZW1vdmVkR3lhem9NZW51KTtcbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZW1vdmVHeWF6b01lbnVcIiwgcmVtb3ZlZEd5YXpvTWVudSk7XG4gIGNvbnN0IGtleWRvd25IYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVTQ19LRVlfQ09ERSkge1xuICAgICAgLy8gIElmIHByZXNzIEVzYyBLZXksIGNhbmNlbCBpdFxuICAgICAgY2FuY2VsR3lhem8oKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IG1vdXNlZG93bkhhbmRsZXIgPSBmdW5jdGlvbiAoZTogTW91c2VFdmVudCkge1xuICAgIGNvbnN0IGd5YXpvTWVudSA9IHNoYWRvd0RPTVF1ZXJ5U2VsZWN0b3IoXCIuZ3lhem8tbWVudVwiKTtcbiAgICBpZiAoZ3lhem9NZW51KSB7XG4gICAgICBneWF6b01lbnUucmVtb3ZlKCk7XG4gICAgfVxuICAgIHN0YXJ0WCA9IGUucGFnZVg7XG4gICAgc3RhcnRZID0gZS5wYWdlWTtcbiAgICB1cGRhdGVTZWxlY3Rpb25FbG1TdHlsZSh7XG4gICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KVwiLFxuICAgICAgbGVmdDogc3RhcnRYICsgXCJweFwiLFxuICAgICAgdG9wOiBzdGFydFkgKyBcInB4XCIsXG4gICAgfSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBjYW5jZWxHeWF6byk7XG4gICAgbGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBtb3VzZWRvd25IYW5kbGVyKTtcbiAgICBsYXllci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdXNlbW92ZUhhbmRsZXIpO1xuICAgIGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNldXBIYW5kbGVyKTtcbiAgfTtcbiAgY29uc3QgbW91c2Vtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChlOiBNb3VzZUV2ZW50KSB7XG4gICAgdXBkYXRlU2VsZWN0aW9uRWxtU3R5bGUoe1xuICAgICAgd2lkdGg6IE1hdGguYWJzKGUucGFnZVggLSBzdGFydFgpIC0gMSArIFwicHhcIixcbiAgICAgIGhlaWdodDogTWF0aC5hYnMoZS5wYWdlWSAtIHN0YXJ0WSkgLSAxICsgXCJweFwiLFxuICAgICAgbGVmdDogTWF0aC5taW4oZS5wYWdlWCwgc3RhcnRYKSArIFwicHhcIixcbiAgICAgIHRvcDogTWF0aC5taW4oZS5wYWdlWSwgc3RhcnRZKSAtIHdpbmRvdy5zY3JvbGxZICsgXCJweFwiLFxuICAgIH0pO1xuICB9O1xuICBjb25zdCBtb3VzZXVwSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLndlYmtpdFVzZXJTZWxlY3QgPSB0ZW1wVXNlclNlbGVjdDtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlkb3duSGFuZGxlcik7XG4gICAgY29uc3Qgc2NhbGVPYmogPSBnZXRab29tQW5kU2NhbGUoKTtcbiAgICBjb25zdCByZWN0ID0gc2VsZWN0aW9uRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHcgPSByZWN0LndpZHRoO1xuICAgIGNvbnN0IGggPSByZWN0LmhlaWdodDtcbiAgICBpZiAoaCA8PSAzIHx8IHcgPD0gMykge1xuICAgICAgY2FuY2VsR3lhem8oKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGF5ZXIuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGF5ZXIpO1xuICAgIGNvbnN0IG1lbnUgPSBzaGFkb3dET01RdWVyeVNlbGVjdG9yKFwiLmd5YXpvLW1lbnVcIik7XG4gICAgaWYgKG1lbnUpIHtcbiAgICAgIG1lbnUucmVtb3ZlKCk7XG4gICAgfVxuICAgIGxldCBvdmVyZmxvdyA9IHt9O1xuICAgIGlmIChoID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICBvdmVyZmxvdyA9IGxvY2tTY3JvbGwoKTtcbiAgICAgIHBhY2tTY3JvbGxCYXIob3ZlcmZsb3cpO1xuICAgIH1cbiAgICBqYWNrdXAuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIC8vIHdhaXQgZm9yIHJld3JpdGUgYnkgcmVtb3ZlQ2hpbGRcbiAgICBjb25zdCBmaW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImd5YXpvLXNlbGVjdC1sYXllclwiKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZpbmlzaCk7XG4gICAgICB9XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbmRNZXNzYWdlVG9NYWluU2NyaXB0KFxuICAgICAgICAgIGNocm9tZS5ydW50aW1lLmlkLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRhcmdldDogXCJtYWluXCIsXG4gICAgICAgICAgICBhY3Rpb246IFwiZ3lhem9DYXB0dXJlV2l0aFNpemVcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgeDogcmVjdC5sZWZ0ICsgd2luZG93LnNjcm9sbFgsXG4gICAgICAgICAgICAgIHk6IHJlY3QudG9wICsgd2luZG93LnNjcm9sbFksXG4gICAgICAgICAgICAgIHQ6IGRvY3VtZW50LnRpdGxlLFxuICAgICAgICAgICAgICB1OiBsb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgICBzOiBzY2FsZU9iai5zY2FsZSxcbiAgICAgICAgICAgICAgejogc2NhbGVPYmouem9vbSxcbiAgICAgICAgICAgICAgdyxcbiAgICAgICAgICAgICAgaCxcbiAgICAgICAgICAgICAgZG9jdW1lbnRXaWR0aDogcGFnZVdpZHRoKCksXG4gICAgICAgICAgICAgIHBvc2l0aW9uWDogd2luZG93LnNjcm9sbFgsXG4gICAgICAgICAgICAgIHBvc2l0aW9uWTogd2luZG93LnNjcm9sbFksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGFiOiBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICB7IHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgfSxcbiAgICAgICAgICAgICAgcmVxdWVzdC50YWJcbiAgICAgICAgICAgICksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBqYWNrdXAucmVtb3ZlKCk7XG4gICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIFhYWFxuICAgICAgICAgICAgdW5sb2NrU2Nyb2xsKG92ZXJmbG93KTtcbiAgICAgICAgICAgIHJlc3RvcmVGaXhlZEVsZW1lbnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9LCAxMDApO1xuICAgIH07XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmaW5pc2gpO1xuICB9O1xuICBsYXllci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1vdXNlZG93bkhhbmRsZXIpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlkb3duSGFuZGxlcik7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgY2FuY2VsR3lhem8pO1xufTtcbiIsImltcG9ydCBpc1ByZXNzQ29tbWFuZEtleSBmcm9tIFwiLi4vLi4vbGlicy9pc1ByZXNzQ29tbWFuZEtleVwiO1xuaW1wb3J0IGdldFpvb21BbmRTY2FsZSBmcm9tIFwiLi4vLi4vbGlicy9nZXRab29tQW5kU2NhbGVcIjtcbmltcG9ydCByZXN0b3JlRml4ZWRFbGVtZW50IGZyb20gXCIuLi8uLi9saWJzL3Jlc3RvcmVGaXhlZEVsZW1lbnRcIjtcbmltcG9ydCBKYWNrdXBFbGVtZW50IGZyb20gXCIuLi8uLi9saWJzL2phY2t1cEVsZW1lbnRcIjtcbmltcG9ydCB7IGxvY2tTY3JvbGwsIHVubG9ja1Njcm9sbCwgcGFja1Njcm9sbEJhciB9IGZyb20gXCIuLi8uLi9saWJzL3Njcm9sbFwiO1xuaW1wb3J0IHsgd2lkdGggYXMgcGFnZVdpZHRoIH0gZnJvbSBcIi4uLy4uL2xpYnMvcGFnZVNjcm9sbFNpemVcIjtcbmltcG9ydCB7IEVTQ19LRVlfQ09ERSB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIE1lc3NhZ2VIYW5kbGVyLFxuICBzZW5kTWVzc2FnZVRvTWFpblNjcmlwdCxcbn0gZnJvbSBcIi4uLy4uL2xpYnMvTWVzc2FnZUxpc3RlbmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0ICguLi5hcmdzOiBQYXJhbWV0ZXJzPE1lc3NhZ2VIYW5kbGVyPFwiY2FwdHVyZUVsZW1lbnRcIj4+KSA9PiB7XG4gIGNvbnN0IFtyZXF1ZXN0XSA9IGFyZ3M7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmd5YXpvLWNyb3Atc2VsZWN0LWVsZW1lbnRcIikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgTUFSR0lOID0gMztcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiZ3lhem8tc2VsZWN0LWVsZW1lbnQtbW9kZVwiKTtcbiAgY29uc3QgamFja3VwID0gbmV3IEphY2t1cEVsZW1lbnQoKTtcbiAgY29uc3QgbGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsYXllci5jbGFzc05hbWUgPSBcImd5YXpvLWNyb3Atc2VsZWN0LWVsZW1lbnRcIjtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsYXllcik7XG4gIGxheWVyLnN0eWxlLmJhY2tncm91bmQgPSBcInJnYmEoOSwgMTMyLCAyMjIsIDAuMzUpXCI7XG4gIGxheWVyLnN0eWxlLm1hcmdpbiA9IFwiMHB4XCI7XG4gIGxheWVyLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHJnYig5LCAxMzIsIDIyMilcIjtcbiAgbGF5ZXIuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gIGxheWVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgbGF5ZXIuc3R5bGUuekluZGV4ID0gXCIyMTQ3NDgzNjQ2XCI7IC8vIE1heGltdW4gbnVtYmVyIG9mIDMyYml0IEludCAtIDFcbiAgY29uc3QgYWxsRWxtcyA9IEFycmF5LmZyb20oXG4gICAgZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIipcIilcbiAgKS5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgIWl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ3lhem8tY3JvcC1zZWxlY3QtZWxlbWVudFwiKSAmJlxuICAgICAgIWl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ3lhem8tbWVudS1lbGVtZW50XCIpXG4gICAgKTtcbiAgfSk7XG4gIGFsbEVsbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImd5YXpvLXNlbGVjdC1lbGVtZW50LWN1cnNvci1vdmVyd3JpdGVcIik7XG4gIH0pO1xuICBjb25zdCBtb3ZlTGF5ZXIgPSBmdW5jdGlvbiAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCBpdGVtID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmIChpdGVtIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgbGF5ZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1pbWctdXJsXCIsIGl0ZW0uc3JjKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGF5ZXIuc2V0QXR0cmlidXRlKFwiZGF0YS1pbWctdXJsXCIsIFwiXCIpO1xuICAgIH1cbiAgICBjb25zdCByZWN0ID0gaXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsYXllci5zdHlsZS53aWR0aCA9IHJlY3Qud2lkdGggKyBcInB4XCI7XG4gICAgbGF5ZXIuc3R5bGUuaGVpZ2h0ID0gcmVjdC5oZWlnaHQgKyBcInB4XCI7XG4gICAgbGF5ZXIuc3R5bGUubGVmdCA9IHJlY3QubGVmdCArIFwicHhcIjtcbiAgICBsYXllci5zdHlsZS50b3AgPSByZWN0LnRvcCArIFwicHhcIjtcbiAgfTtcbiAgbGV0IGhhc01hcmdpbiA9IGZhbHNlO1xuICBjb25zdCB0YWtlTWFyZ2luID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChoYXNNYXJnaW4pIHJldHVybjtcbiAgICBoYXNNYXJnaW4gPSB0cnVlO1xuICAgIGxheWVyLnN0eWxlLndpZHRoID1cbiAgICAgIHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGxheWVyKS53aWR0aCwgMTApICsgTUFSR0lOICogMiArIFwicHhcIjtcbiAgICBsYXllci5zdHlsZS5oZWlnaHQgPVxuICAgICAgcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUobGF5ZXIpLmhlaWdodCwgMTApICsgTUFSR0lOICogMiArIFwicHhcIjtcbiAgICBsYXllci5zdHlsZS5sZWZ0ID1cbiAgICAgIHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGxheWVyKS5sZWZ0LCAxMCkgLSBNQVJHSU4gKyBcInB4XCI7XG4gICAgbGF5ZXIuc3R5bGUudG9wID1cbiAgICAgIHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGxheWVyKS50b3AsIDEwKSAtIE1BUkdJTiArIFwicHhcIjtcbiAgfTtcbiAgY29uc3Qga2V5ZG93bkhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRVNDX0tFWV9DT0RFKSB7XG4gICAgICBjYW5jZWwoKTtcbiAgICB9IGVsc2UgaWYgKGlzUHJlc3NDb21tYW5kS2V5KGV2ZW50KSkge1xuICAgICAgdGFrZU1hcmdpbigpO1xuICAgIH1cbiAgfTtcbiAgY29uc3Qga2V5VXBIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGlzUHJlc3NDb21tYW5kS2V5KGV2ZW50KSkge1xuICAgICAgaGFzTWFyZ2luID0gZmFsc2U7XG4gICAgICBsYXllci5zdHlsZS53aWR0aCA9XG4gICAgICAgIHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGxheWVyKS53aWR0aCwgMTApIC0gTUFSR0lOICogMiArIFwicHhcIjtcbiAgICAgIGxheWVyLnN0eWxlLmhlaWdodCA9XG4gICAgICAgIHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGxheWVyKS5oZWlnaHQsIDEwKSAtIE1BUkdJTiAqIDIgKyBcInB4XCI7XG4gICAgICBsYXllci5zdHlsZS5sZWZ0ID1cbiAgICAgICAgcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUobGF5ZXIpLmxlZnQsIDEwKSArIE1BUkdJTiArIFwicHhcIjtcbiAgICAgIGxheWVyLnN0eWxlLnRvcCA9XG4gICAgICAgIHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGxheWVyKS50b3AsIDEwKSArIE1BUkdJTiArIFwicHhcIjtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGNsaWNrRWxlbWVudCA9IGZ1bmN0aW9uIChldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGF5ZXIuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImd5YXpvLXNlbGVjdC1lbGVtZW50LW1vZGVcIik7XG4gICAgYWxsRWxtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJneWF6by1zZWxlY3QtZWxlbWVudC1jdXJzb3Itb3ZlcndyaXRlXCIpKSB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImd5YXpvLXNlbGVjdC1lbGVtZW50LWN1cnNvci1vdmVyd3JpdGVcIik7XG4gICAgICB9XG4gICAgICBpdGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgbW92ZUxheWVyKTtcbiAgICAgIGl0ZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrRWxlbWVudCk7XG4gICAgfSk7XG4gICAgY29uc3Qgc2NhbGVPYmogPSBnZXRab29tQW5kU2NhbGUoKTtcblxuICAgIC8vIFNhbml0aXplIGd5YXpvIGRlc2MgZm9yIGl2eS1zZWFyY2hcbiAgICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqXCIpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgIGlmIChcbiAgICAgICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxtKS5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fFxuICAgICAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbG0pLnZpc2liaWxpdHkgPT09IFwiaGlkZGVuXCJcbiAgICAgICkge1xuICAgICAgICBlbG0uY2xhc3NMaXN0LmFkZChcImd5YXpvLWhpZGRlblwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIShldmVudC50YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybjtcbiAgICBjb25zdCBkdXBUYXJnZXQgPSBldmVudC50YXJnZXQuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50O1xuICAgIEFycmF5LmZyb20oZHVwVGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqXCIpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgIHN3aXRjaCAoZWxtLnRhZ05hbWUpIHtcbiAgICAgICAgY2FzZSBcIlNDUklQVFwiOlxuICAgICAgICBjYXNlIFwiU1RZTEVcIjpcbiAgICAgICAgICByZXR1cm4gZWxtLnJlbW92ZSgpO1xuICAgICAgfVxuICAgICAgaWYgKGVsbS5jbGFzc0xpc3QuY29udGFpbnMoXCJneWF6by1oaWRkZW5cIikpIHtcbiAgICAgICAgZWxtLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImd5YXpvLWhpZGRlblwiKSkuZm9yRWFjaChcbiAgICAgIGZ1bmN0aW9uIChlbG0pIHtcbiAgICAgICAgZWxtLmNsYXNzTGlzdC5yZW1vdmUoXCJneWF6by1oaWRkZW5cIik7XG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IHcgPSBwYXJzZUZsb2F0KGxheWVyLnN0eWxlLndpZHRoKTtcbiAgICBjb25zdCBoID0gcGFyc2VGbG9hdChsYXllci5zdHlsZS5oZWlnaHQpO1xuICAgIGNvbnN0IHkgPSB3aW5kb3cuc2Nyb2xsWSArIGxheWVyLm9mZnNldFRvcDtcbiAgICBjb25zdCBsYXllck9mZnNldExlZnQgPSBsYXllci5vZmZzZXRMZWZ0O1xuICAgIGNvbnN0IGxheWVyT2Zmc2V0VG9wID0gbGF5ZXIub2Zmc2V0VG9wO1xuICAgIGNvbnN0IHBvc2l0aW9uWSA9IHdpbmRvdy5zY3JvbGxZO1xuICAgIGlmIChkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGxheWVyKSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsYXllcik7XG4gICAgfVxuICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmd5YXpvLW1lbnVcIik7XG4gICAgaWYgKG1lbnUpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobWVudSk7XG4gICAgfVxuICAgIGphY2t1cC5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBjYW5jZWwpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlkb3duSGFuZGxlcik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGtleVVwSGFuZGxlcik7XG4gICAgaWYgKGxheWVyLmdldEF0dHJpYnV0ZShcImRhdGEtaW1nLXVybFwiKSkge1xuICAgICAgcmVzdG9yZUZpeGVkRWxlbWVudCgpO1xuICAgICAgcmV0dXJuIHNlbmRNZXNzYWdlVG9NYWluU2NyaXB0KFxuICAgICAgICBjaHJvbWUucnVudGltZS5pZCxcbiAgICAgICAge1xuICAgICAgICAgIHRhcmdldDogXCJtYWluXCIsXG4gICAgICAgICAgYWN0aW9uOiBcImd5YXpvU2VuZFJhd0ltYWdlXCIsXG4gICAgICAgICAgZGF0YTogeyBzcmNVcmw6IGxheWVyLmdldEF0dHJpYnV0ZShcImRhdGEtaW1nLXVybFwiKSB9LFxuICAgICAgICAgIHRhYjogT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIHsgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCB9LFxuICAgICAgICAgICAgcmVxdWVzdC50YWJcbiAgICAgICAgICApLFxuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLyoqIG5vIG9wICovXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICAgIGxldCBvdmVyZmxvdyA9IHt9O1xuICAgIGlmICh5ICsgaCA+IHdpbmRvdy5pbm5lckhlaWdodCArIHBvc2l0aW9uWSkge1xuICAgICAgb3ZlcmZsb3cgPSBsb2NrU2Nyb2xsKCk7XG4gICAgICBwYWNrU2Nyb2xsQmFyKG92ZXJmbG93KTtcbiAgICB9XG4gICAgY29uc3QgZmluaXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZ3lhem8tY3JvcC1zZWxlY3QtZWxlbWVudFwiKS5sZW5ndGggPiAwXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZmluaXNoKTtcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBzZW5kTWVzc2FnZVRvTWFpblNjcmlwdChjaHJvbWUucnVudGltZS5pZCwge1xuICAgICAgICAgIHRhcmdldDogXCJtYWluXCIsXG4gICAgICAgICAgYWN0aW9uOiBcImd5YXpvQ2FwdHVyZVdpdGhTaXplXCIsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdyxcbiAgICAgICAgICAgIGgsXG4gICAgICAgICAgICB4OiB3aW5kb3cuc2Nyb2xsWCArIGxheWVyT2Zmc2V0TGVmdCxcbiAgICAgICAgICAgIHk6IHdpbmRvdy5zY3JvbGxZICsgbGF5ZXJPZmZzZXRUb3AsXG4gICAgICAgICAgICB0OiBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgICAgIHU6IGxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICBzOiBzY2FsZU9iai5zY2FsZSxcbiAgICAgICAgICAgIHo6IHNjYWxlT2JqLnpvb20sXG4gICAgICAgICAgICBkb2N1bWVudFdpZHRoOiBwYWdlV2lkdGgoKSxcbiAgICAgICAgICAgIHBvc2l0aW9uWDogd2luZG93LnNjcm9sbFgsXG4gICAgICAgICAgICBwb3NpdGlvblk6IHdpbmRvdy5zY3JvbGxZLFxuICAgICAgICAgICAgZGVzYzogZHVwVGFyZ2V0LnRleHRDb250ZW50ID8/IHVuZGVmaW5lZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRhYjogT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIHsgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCB9LFxuICAgICAgICAgICAgcmVxdWVzdC50YWJcbiAgICAgICAgICApLFxuICAgICAgICB9KTtcbiAgICAgICAgcmVzdG9yZUZpeGVkRWxlbWVudCgpO1xuICAgICAgICBpZiAoZG9jdW1lbnQuYm9keS5jb250YWlucyhqYWNrdXAuZWxlbWVudCkpIGphY2t1cC5yZW1vdmUoKTtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBYWFhcbiAgICAgICAgdW5sb2NrU2Nyb2xsKG92ZXJmbG93KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmaW5pc2gpO1xuICB9O1xuICBjb25zdCBjYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGRvY3VtZW50LmJvZHkuY29udGFpbnMoamFja3VwLmVsZW1lbnQpKSB7XG4gICAgICBqYWNrdXAucmVtb3ZlKCk7XG4gICAgfVxuICAgIGlmIChkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGxheWVyKSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsYXllcik7XG4gICAgfVxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImd5YXpvLXNlbGVjdC1lbGVtZW50LW1vZGVcIik7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBjYW5jZWwpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGtleWRvd25IYW5kbGVyKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwga2V5VXBIYW5kbGVyKTtcbiAgICBBcnJheS5mcm9tKFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXG4gICAgICAgIFwiLmd5YXpvLXNlbGVjdC1lbGVtZW50LWN1cnNvci1vdmVyd3JpdGVcIlxuICAgICAgKVxuICAgICkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZ3lhem8tc2VsZWN0LWVsZW1lbnQtY3Vyc29yLW92ZXJ3cml0ZVwiKTtcbiAgICAgIGl0ZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBtb3ZlTGF5ZXIpO1xuICAgICAgaXRlbS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tFbGVtZW50KTtcbiAgICB9KTtcbiAgICByZXN0b3JlRml4ZWRFbGVtZW50KCk7XG4gIH07XG4gIGNvbnN0IHJlbW92ZWRHeWF6b01lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZW1vdmVHeWF6b01lbnVcIiwgcmVtb3ZlZEd5YXpvTWVudSk7XG4gICAgY2FuY2VsKCk7XG4gIH07XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVtb3ZlR3lhem9NZW51XCIsIHJlbW92ZWRHeWF6b01lbnUpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIGNhbmNlbCk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGtleWRvd25IYW5kbGVyKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGtleVVwSGFuZGxlcik7XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgIGFsbEVsbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG1vdmVMYXllcik7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0VsZW1lbnQpO1xuICAgIH0pO1xuICB9KTtcbn07XG4iLCJpbXBvcnQge1xuICBNZXNzYWdlSGFuZGxlcixcbiAgc2VuZE1lc3NhZ2VUb01haW5TY3JpcHQsXG59IGZyb20gXCIuLi8uLi9saWJzL01lc3NhZ2VMaXN0ZW5lclwiO1xuaW1wb3J0IGV4dHJhY3RPR1BJbWFnZSBmcm9tIFwiLi4vLi4vbGlicy9leHRyYWN0T0dQSW1hZ2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKC4uLmFyZ3M6IFBhcmFtZXRlcnM8TWVzc2FnZUhhbmRsZXI8XCJzbmFwT0dQSW1hZ2VcIj4+KSA9PiB7XG4gIGNvbnN0IFtyZXF1ZXN0XSA9IGFyZ3M7XG5cbiAgY29uc3QgaW1hZ2UgPSBleHRyYWN0T0dQSW1hZ2UoKTtcbiAgaWYgKCFpbWFnZSkgcmV0dXJuO1xuXG4gIHJldHVybiBzZW5kTWVzc2FnZVRvTWFpblNjcmlwdChcbiAgICBjaHJvbWUucnVudGltZS5pZCxcbiAgICB7XG4gICAgICB0YXJnZXQ6IFwibWFpblwiLFxuICAgICAgYWN0aW9uOiBcImd5YXpvU2VuZFJhd0ltYWdlXCIsXG4gICAgICBkYXRhOiB7IHNyY1VybDogaW1hZ2UgfSxcbiAgICAgIHRhYjogT2JqZWN0LmFzc2lnbihcbiAgICAgICAgeyB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IH0sXG4gICAgICAgIHJlcXVlc3QudGFiXG4gICAgICApLFxuICAgIH0sXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgLyoqIG5vIG9wICovXG4gICAgfVxuICApO1xufTtcbiIsImltcG9ydCBnZXRab29tQW5kU2NhbGUgZnJvbSBcIi4uLy4uL2xpYnMvZ2V0Wm9vbUFuZFNjYWxlXCI7XG5pbXBvcnQgSmFja3VwRWxlbWVudCBmcm9tIFwiLi4vLi4vbGlicy9qYWNrdXBFbGVtZW50XCI7XG5pbXBvcnQgeyBsb2NrU2Nyb2xsLCB1bmxvY2tTY3JvbGwgfSBmcm9tIFwiLi4vLi4vbGlicy9zY3JvbGxcIjtcbmltcG9ydCB7XG4gIHdpZHRoIGFzIHBhZ2VXaWR0aCxcbiAgaGVpZ2h0IGFzIHBhZ2VIZWlnaHQsXG59IGZyb20gXCIuLi8uLi9saWJzL3BhZ2VTY3JvbGxTaXplXCI7XG5pbXBvcnQge1xuICBNZXNzYWdlSGFuZGxlcixcbiAgc2VuZE1lc3NhZ2VUb01haW5TY3JpcHQsXG59IGZyb20gXCIuLi8uLi9saWJzL01lc3NhZ2VMaXN0ZW5lclwiO1xuaW1wb3J0IHJlc3RvcmVGaXhlZEVsZW1lbnQgZnJvbSBcIi4uLy4uL2xpYnMvcmVzdG9yZUZpeGVkRWxlbWVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8TWVzc2FnZUhhbmRsZXI8XCJjYXB0dXJlV2hvbGVQYWdlXCI+PlxuKSA9PiB7XG4gIGNvbnN0IFtyZXF1ZXN0XSA9IGFyZ3M7XG4gIGNvbnN0IG92ZXJmbG93ID0gbG9ja1Njcm9sbCgpO1xuICBjb25zdCBzY2FsZU9iaiA9IGdldFpvb21BbmRTY2FsZSgpO1xuICAvLyBqYWNrdXBFbGVtZW5044GM5oy/5YWl44GV44KM44KL5YmN44Gr5Y+W5b6X44GX44Gm44GK44GPXG4gIGNvbnN0IHcgPSBwYWdlV2lkdGgoKTtcbiAgY29uc3QgaCA9IHBhZ2VIZWlnaHQoKTtcbiAgY29uc3QgZG9jdW1lbnRXaWR0aCA9IHBhZ2VXaWR0aCgpO1xuICBjb25zdCBqYWNrdXAgPSBuZXcgSmFja3VwRWxlbWVudCgpO1xuICBqYWNrdXAuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICBhd2FpdCBzZW5kTWVzc2FnZVRvTWFpblNjcmlwdChjaHJvbWUucnVudGltZS5pZCwge1xuICAgIHRhcmdldDogXCJtYWluXCIsXG4gICAgYWN0aW9uOiBcImd5YXpvQ2FwdHVyZVdpdGhTaXplXCIsXG4gICAgZGF0YToge1xuICAgICAgdyxcbiAgICAgIGgsXG4gICAgICB4OiAwLFxuICAgICAgZG9jdW1lbnRXaWR0aCxcbiAgICAgIHk6IDAsXG4gICAgICB0OiBkb2N1bWVudC50aXRsZSxcbiAgICAgIHU6IGxvY2F0aW9uLmhyZWYsXG4gICAgICBzOiBzY2FsZU9iai5zY2FsZSxcbiAgICAgIHo6IHNjYWxlT2JqLnpvb20sXG4gICAgICBwb3NpdGlvblg6IHdpbmRvdy5zY3JvbGxYLFxuICAgICAgcG9zaXRpb25ZOiB3aW5kb3cuc2Nyb2xsWSxcbiAgICB9LFxuICAgIHRhYjogT2JqZWN0LmFzc2lnbihcbiAgICAgIHsgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCB9LFxuICAgICAgcmVxdWVzdC50YWJcbiAgICApLFxuICB9KTtcbiAgamFja3VwLnJlbW92ZSgpO1xuICByZXN0b3JlRml4ZWRFbGVtZW50KCk7XG4gIHVubG9ja1Njcm9sbChvdmVyZmxvdyk7XG59O1xuIiwiaW1wb3J0IHsgbG9ja1Njcm9sbCwgdW5sb2NrU2Nyb2xsIH0gZnJvbSBcIi4uLy4uL2xpYnMvc2Nyb2xsXCI7XG5pbXBvcnQgeyB3aWR0aCBhcyBwYWdlV2lkdGggfSBmcm9tIFwiLi4vLi4vbGlicy9wYWdlU2Nyb2xsU2l6ZVwiO1xuaW1wb3J0IGdldFpvb21BbmRTY2FsZSBmcm9tIFwiLi4vLi4vbGlicy9nZXRab29tQW5kU2NhbGVcIjtcbmltcG9ydCB7XG4gIE1lc3NhZ2VIYW5kbGVyLFxuICBzZW5kTWVzc2FnZVRvTWFpblNjcmlwdCxcbn0gZnJvbSBcIi4uLy4uL2xpYnMvTWVzc2FnZUxpc3RlbmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0ICguLi5hcmdzOiBQYXJhbWV0ZXJzPE1lc3NhZ2VIYW5kbGVyPFwiY2FwdHVyZVdpbmRvd1wiPj4pID0+IHtcbiAgY29uc3QgW3JlcXVlc3RdID0gYXJncztcbiAgY29uc3Qgb3ZlcmZsb3cgPSBsb2NrU2Nyb2xsKCk7XG4gIGNvbnN0IHNjYWxlT2JqID0gZ2V0Wm9vbUFuZFNjYWxlKCk7XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHNlbmRNZXNzYWdlVG9NYWluU2NyaXB0KGNocm9tZS5ydW50aW1lLmlkLCB7XG4gICAgICB0YXJnZXQ6IFwibWFpblwiLFxuICAgICAgYWN0aW9uOiBcImd5YXpvQ2FwdHVyZVdpdGhTaXplXCIsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHc6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICBkb2N1bWVudFdpZHRoOiBwYWdlV2lkdGgoKSxcbiAgICAgICAgaDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgICB4OiB3aW5kb3cuc2Nyb2xsWCxcbiAgICAgICAgeTogd2luZG93LnNjcm9sbFksXG4gICAgICAgIHQ6IGRvY3VtZW50LnRpdGxlLFxuICAgICAgICB1OiBsb2NhdGlvbi5ocmVmLFxuICAgICAgICBzOiBzY2FsZU9iai5zY2FsZSxcbiAgICAgICAgejogc2NhbGVPYmouem9vbSxcbiAgICAgICAgcG9zaXRpb25YOiB3aW5kb3cuc2Nyb2xsWCxcbiAgICAgICAgcG9zaXRpb25ZOiB3aW5kb3cuc2Nyb2xsWSxcbiAgICAgICAgZGVmYXVsdFBvc2l0b246IHdpbmRvdy5zY3JvbGxZLFxuICAgICAgfSxcbiAgICAgIHRhYjoge1xuICAgICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgICAuLi5yZXF1ZXN0LnRhYixcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdW5sb2NrU2Nyb2xsKG92ZXJmbG93KTtcbiAgfSk7XG59O1xuIiwiaW1wb3J0IGNoYW5nZUZpeGVkRWxlbWVudFRvQWJzb2x1dGUgZnJvbSBcIi4vY2hhbmdlRml4ZWRFbGVtZW50VG9BYnNvbHV0ZVwiO1xuaW1wb3J0IGd5YXpvY2FwdHVyZVdpbmRvdyBmcm9tIFwiLi9neWF6b2NhcHR1cmVXaW5kb3dcIjtcbmltcG9ydCBneWF6b0NhcHR1cmVTZWxlY3RlZEFyZWEgZnJvbSBcIi4vZ3lhem9DYXB0dXJlU2VsZWN0ZWRBcmVhXCI7XG5pbXBvcnQgZ3lhem9TZWxlY3RFbG0gZnJvbSBcIi4vZ3lhem9TZWxlY3RFbG1cIjtcbmltcG9ydCBneWF6b1dob2xlQ2FwdHVyZSBmcm9tIFwiLi9neWF6b1dob2xlQ2FwdHVyZVwiO1xuaW1wb3J0IGd5YXpvU25hcE9HUEltYWdlIGZyb20gXCIuL2d5YXpvU25hcE9HUEltYWdlXCI7XG5cbmV4cG9ydCB7XG4gIGNoYW5nZUZpeGVkRWxlbWVudFRvQWJzb2x1dGUsXG4gIGd5YXpvY2FwdHVyZVdpbmRvdyxcbiAgZ3lhem9DYXB0dXJlU2VsZWN0ZWRBcmVhLFxuICBneWF6b1NlbGVjdEVsbSxcbiAgZ3lhem9XaG9sZUNhcHR1cmUsXG4gIGd5YXpvU25hcE9HUEltYWdlLFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IChsb2FkU3ZnTmFtZSwgdGV4dCwgc2hvcnRjdXRLZXkpID0+IHtcbiAgbGV0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ0bi5jbGFzc05hbWUgPSBcImd5YXpvLWJpZy1idXR0b24gZ3lhem8tYnV0dG9uIGd5YXpvLW1lbnUtZWxlbWVudFwiO1xuXG4gIGlmIChzaG9ydGN1dEtleSkge1xuICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIlByZXNzOiBcIiArIHNob3J0Y3V0S2V5KTtcbiAgfVxuXG4gIGxldCBpY29uRWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaWNvbkVsbS5jbGFzc0xpc3QuYWRkKFwiZ3lhem8tYnV0dG9uLWljb25cIik7XG4gIHRyeSB7XG4gICAgLy8gRWRnZSBjYW5ub3QgZmV0Y2ggdG8gbXMtZWRnZS1leHRlbnNpb246XG4gICAgd2luZG93XG4gICAgICAuZmV0Y2goY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKGBpbWdzLyR7bG9hZFN2Z05hbWV9LnN2Z2ApKVxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLnRleHQoKSlcbiAgICAgIC50aGVuKCh0ZXh0KSA9PiB7XG4gICAgICAgIGljb25FbG0uaW5uZXJIVE1MID0gdGV4dDtcbiAgICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc3Qgc3ZnVXJsID0gY2hyb21lLnJ1bnRpbWUuZ2V0VVJMKGBpbWdzLyR7bG9hZFN2Z05hbWV9LnN2Z2ApO1xuICAgIGljb25FbG0uaW5uZXJIVE1MID0gYDxpbWcgc3JjPScke3N2Z1VybH0nIC8+YDtcbiAgfVxuXG4gIGxldCB0ZXh0RWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGV4dEVsbS5jbGFzc05hbWUgPSBcImd5YXpvLWJ1dHRvbi10ZXh0XCI7XG4gIHRleHRFbG0udGV4dENvbnRlbnQgPSB0ZXh0O1xuXG4gIGJ0bi5hcHBlbmRDaGlsZChpY29uRWxtKTtcbiAgYnRuLmFwcGVuZENoaWxkKHRleHRFbG0pO1xuXG4gIHJldHVybiBidG47XG59O1xuIiwiaW1wb3J0IGV4dHJhY3RPR1BJbWFnZSBmcm9tIFwiLi4vbGlicy9leHRyYWN0T0dQSW1hZ2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgKHNob3J0Y3V0S2V5OiBzdHJpbmcpID0+IHtcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYnRuLmNsYXNzTmFtZSA9IFwiZ3lhem8tYmlnLWJ1dHRvbiBneWF6by1idXR0b24gZ3lhem8tbWVudS1lbGVtZW50XCI7XG5cbiAgaWYgKHNob3J0Y3V0S2V5KSB7XG4gICAgYnRuLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiUHJlc3M6IFwiICsgc2hvcnRjdXRLZXkpO1xuICB9XG5cbiAgY29uc3QgaWNvbkVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGljb25FbG0uY2xhc3NMaXN0LmFkZChcImd5YXpvLWJ1dHRvbi1wcmV2aWV3XCIpO1xuXG4gIGNvbnN0IG9ncEltYWdlVXJsID0gZXh0cmFjdE9HUEltYWdlKCk7XG4gIGlmICghb2dwSW1hZ2VVcmwpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHByZXZpZXdFbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBwcmV2aWV3RWxtLnNyYyA9IG9ncEltYWdlVXJsO1xuICBpY29uRWxtLmFwcGVuZENoaWxkKHByZXZpZXdFbG0pO1xuXG4gIGNvbnN0IHRleHRFbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0ZXh0RWxtLmNsYXNzTmFtZSA9IFwiZ3lhem8tYnV0dG9uLXRleHRcIjtcbiAgdGV4dEVsbS50ZXh0Q29udGVudCA9IGNocm9tZS5pMThuLmdldE1lc3NhZ2UoXCJzbmFwT0dQSW1hZ2VcIik7XG5cbiAgYnRuLmFwcGVuZENoaWxkKGljb25FbG0pO1xuICBidG4uYXBwZW5kQ2hpbGQodGV4dEVsbSk7XG5cbiAgcmV0dXJuIGJ0bjtcbn07XG4iLCJpbXBvcnQgZGVsZWdhdGUgZnJvbSBcImRlbGVnYXRlXCI7XG5pbXBvcnQgY3NzIGZyb20gXCJkb20tY3NzXCI7XG5pbXBvcnQgZ3lhem9JZEZyb21VcmwgZnJvbSBcIi4vbGliL2d5YXpvSWRGcm9tVXJsXCI7XG5pbXBvcnQgYWRqYWNlbnRTdHlsZSBmcm9tIFwiLi9saWIvYWRqYWNlbnRTdHlsZVwiO1xuaW1wb3J0IHdhaXRGb3IgZnJvbSBcIi4vbGliL3dhaXRGb3JcIjtcbmltcG9ydCB7IGZldGNoSW1hZ2UgfSBmcm9tIFwiLi9saWIvZmV0Y2hJbWFnZVwiO1xuXG5mdW5jdGlvbiBjcmVhdGVMb2FkZXIoc3R5bGUgPSB7fSkge1xuICBjb25zdCBsb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBjaXJjbGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2lyY2xlSWNvbi5jbGFzc05hbWUgPSBcImd6LWNpcmNsZS1sb2FkZXJcIjtcbiAgbG9hZGVyLmFwcGVuZENoaWxkKGNpcmNsZUljb24pO1xuXG4gIGNzcyhsb2FkZXIsIHtcbiAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgIGJveFNoYWRvdzogXCIwIDAgOHB4IHJnYmEoMCwwLDAsLjYpXCIsXG4gICAgYmFja2dyb3VuZENvbG9yOiBcIiNmZmZcIixcbiAgICB6SW5kZXg6IDEwMDAwMDAsXG4gICAgd2lkdGg6IDQwLFxuICAgIGhlaWdodDogNDAsXG4gICAgcGFkZGluZzogNCxcbiAgICBib3hTaXppbmc6IFwiYm9yZGVyLWJveFwiLFxuICAgIC4uLnN0eWxlLFxuICB9KTtcblxuICByZXR1cm4gbG9hZGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbWFnZVByZXZpZXcoeyB1cmwsIGJveFN0eWxlIH0pIHtcbiAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgaW1nLnNyYyA9IHVybDtcblxuICBjc3MoaW1nLCB7XG4gICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcbiAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgIHpJbmRleDogMTAwMDAwMCxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZlwiLFxuICAgIG1heFdpZHRoOiA1MDAsXG4gICAgYm94U2hhZG93OiBcIjAgMCA4cHggcmdiYSgwLDAsMCwuNilcIixcbiAgICAuLi5ib3hTdHlsZSxcbiAgfSk7XG5cbiAgcmV0dXJuIGltZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBsZXQgcHJldmlld0lzU2hvd24gPSBmYWxzZTtcbiAgZGVsZWdhdGUoZG9jdW1lbnQsIFwiYVwiLCBcIm1vdXNlb3ZlclwiLCAoZXZlbnQpID0+IHtcbiAgICBpZiAocHJldmlld0lzU2hvd24pIHJldHVybjtcblxuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgaHJlZiA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblxuICAgIGlmIChlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIikpIHJldHVybjtcblxuICAgIGNvbnN0IGlzR3lhem9VcmwgPSAhIWd5YXpvSWRGcm9tVXJsKGhyZWYpO1xuICAgIGlmIChpc0d5YXpvVXJsKSB7XG4gICAgICBwcmV2aWV3SXNTaG93biA9IHRydWU7XG5cbiAgICAgIGxldCBjb250YWluZXI7XG5cbiAgICAgIGxldCBsb2FkZXIgPSBjcmVhdGVMb2FkZXIoYWRqYWNlbnRTdHlsZShlbGVtZW50KSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxvYWRlcik7XG5cbiAgICAgIGxldCBsZWF2ZWQgPSBmYWxzZTtcblxuICAgICAgY29uc3Qgb25MZWF2ZSA9IChldmVudCA9IHt9KSA9PiB7XG4gICAgICAgIGxlYXZlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiBlbGVtZW50ICE9PSBldmVudC50YXJnZXQpIHJldHVybjtcbiAgICAgICAgaWYgKGNvbnRhaW5lcikgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuICAgICAgICBpZiAobG9hZGVyKSBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxvYWRlcik7XG5cbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbkxlYXZlKTtcbiAgICAgICAgcHJldmlld0lzU2hvd24gPSBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNhbmNlbCA9IHdhaXRGb3IoKCkgPT4gIWVsZW1lbnQub2Zmc2V0UGFyZW50LCBvbkxlYXZlKTtcblxuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbkxlYXZlKTtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgY2FuY2VsKTtcblxuICAgICAgZmV0Y2hJbWFnZShocmVmLCAoZSwgYmxvYikgPT4ge1xuICAgICAgICBpZiAobGVhdmVkKSByZXR1cm47XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsb2FkZXIpO1xuICAgICAgICBsb2FkZXIgPSBudWxsO1xuXG4gICAgICAgIGNvbnRhaW5lciA9IGNyZWF0ZUltYWdlUHJldmlldyh7XG4gICAgICAgICAgdXJsOiB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSxcbiAgICAgICAgICBib3hTdHlsZTogYWRqYWNlbnRTdHlsZShlbGVtZW50KSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRqYWNlbnRTdHlsZShlbGVtZW50KSB7XG4gIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIGNvbnN0IG9mZnNldFkgPSAyMDtcbiAgY29uc3QgY2VudGVyWSA9IE1hdGguZmxvb3Iod2luZG93LmlubmVySGVpZ2h0IC8gMik7XG5cbiAgaWYgKHJlY3QudG9wID4gY2VudGVyWSkge1xuICAgIHJldHVybiB7XG4gICAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgICBib3R0b206IE1hdGgucm91bmQod2luZG93LmlubmVySGVpZ2h0IC0gcmVjdC50b3AgKyBvZmZzZXRZKSxcbiAgICAgIG1heEhlaWdodDogTWF0aC5yb3VuZChNYXRoLm1pbihyZWN0LnRvcCAtIG9mZnNldFkgKiAyLCA1MDApKSxcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHJlY3RCb3R0b20gPSByZWN0LnRvcCArIHJlY3QuaGVpZ2h0O1xuICAgIHJldHVybiB7XG4gICAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgICB0b3A6IE1hdGgucm91bmQocmVjdEJvdHRvbSArIG9mZnNldFkpLFxuICAgICAgbWF4SGVpZ2h0OiBNYXRoLnJvdW5kKFxuICAgICAgICBNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0Qm90dG9tIC0gb2Zmc2V0WSAqIDIsIDUwMClcbiAgICAgICksXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgc2VuZE1lc3NhZ2VUb01haW5TY3JpcHQgfSBmcm9tIFwiLi4vLi4vLi4vbGlicy9NZXNzYWdlTGlzdGVuZXJcIjtcblxuZXhwb3J0IGNvbnN0IGZldGNoSW1hZ2UgPSBhc3luYyAoXG4gIHVybDogc3RyaW5nLFxuICBjYWxsYmFjazogKGU6IFByb2dyZXNzRXZlbnQgfCBudWxsLCBibG9iPzogQmxvYikgPT4gdm9pZFxuKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc2VuZE1lc3NhZ2VUb01haW5TY3JpcHQoY2hyb21lLnJ1bnRpbWUuaWQsIHtcbiAgICB0YXJnZXQ6IFwibWFpblwiLFxuICAgIGFjdGlvbjogXCJneWF6b0dldEltYWdlQmxvYlwiLFxuICAgIGd5YXpvVXJsOiB1cmwsXG4gIH0pO1xuICBjb25zdCB4aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKFwiR0VUXCIsIHJlc3BvbnNlLmltYWdlQmxvYlVybCwgdHJ1ZSk7XG4gIHhoci5yZXNwb25zZVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XG4gIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgY29uc3QgYmxvYiA9IG5ldyB3aW5kb3cuQmxvYihbeGhyLnJlc3BvbnNlXSwgeyB0eXBlOiBcImltYWdlL3BuZ1wiIH0pO1xuXG4gICAgY2FsbGJhY2sobnVsbCwgYmxvYik7XG4gIH07XG4gIHhoci5vbmVycm9yID0gKGUpID0+IHtcbiAgICBjYWxsYmFjayhlKTtcbiAgfTtcbiAgeGhyLnNlbmQoKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3lhem9JZEZyb21Vcmwoc3RyKSB7XG4gIGxldCBwYXJzZWRVcmw7XG4gIHRyeSB7XG4gICAgcGFyc2VkVXJsID0gbmV3IFVSTChzdHIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKFxuICAgIC9eKC4rXFwuKT9neWF6b1xcLmNvbSQvLnRlc3QocGFyc2VkVXJsLmhvc3QpICYmXG4gICAgL15cXC9bMC05YS1mXSskLy50ZXN0KHBhcnNlZFVybC5wYXRobmFtZSlcbiAgKSB7XG4gICAgcmV0dXJuIHBhcnNlZFVybC5wYXRobmFtZS5zbGljZSgxKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2FpdEZvcihjb25kaXRpb24sIGZuKSB7XG4gIGNvbnN0IHRpbWVyID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICBpZiAoIWNvbmRpdGlvbigpKSByZXR1cm47XG4gICAgZm4oKTtcbiAgICBjYW5jZWwoKTtcbiAgfSwgMTAwKTtcblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGltZXIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbmNlbDtcbn1cbiIsImltcG9ydCBjcmVhdGVCdXR0b24gZnJvbSBcIi4vY3JlYXRlQnV0dG9uT25NZW51XCI7XG5pbXBvcnQgc3RvcmFnZSBmcm9tIFwiLi4vbGlicy9zdG9yYWdlU3dpdGNoZXJcIjtcbmltcG9ydCB7XG4gIGd5YXpvY2FwdHVyZVdpbmRvdyxcbiAgZ3lhem9DYXB0dXJlU2VsZWN0ZWRBcmVhLFxuICBneWF6b1NlbGVjdEVsbSxcbiAgZ3lhem9XaG9sZUNhcHR1cmUsXG4gIGd5YXpvU25hcE9HUEltYWdlLFxufSBmcm9tIFwiLi9hY3Rpb25zXCI7XG5pbXBvcnQgeyBFU0NfS0VZX0NPREUgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBNZXNzYWdlSGFuZGxlcixcbiAgc2VuZE1lc3NhZ2VUb01haW5TY3JpcHQsXG59IGZyb20gXCIuLi9saWJzL01lc3NhZ2VMaXN0ZW5lclwiO1xuaW1wb3J0IHsgc2hhZG93RE9NQXBwZW5kV2l0aENzcywgc2hhZG93RE9NUXVlcnlTZWxlY3RvciB9IGZyb20gXCIuL3NoYWRvd0RPTVwiO1xuaW1wb3J0IGNyZWF0ZU9HUEJ1dHRvbk9uTWVudSBmcm9tIFwiLi9jcmVhdGVPR1BCdXR0b25Pbk1lbnVcIjtcblxuY29uc3QgUkVNT1ZFX0dZQVpPTUVOVV9FVkVOVCA9IG5ldyB3aW5kb3cuRXZlbnQoXCJyZW1vdmVHeWF6b01lbnVcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jICguLi5hcmdzOiBQYXJhbWV0ZXJzPE1lc3NhZ2VIYW5kbGVyPFwiaW5zZXJ0TWVudVwiPj4pID0+IHtcbiAgY29uc3QgW3JlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlXSA9IGFyZ3M7XG4gIGxldCBjYXB0dXJlc1BhZ2VVcmwgPSBcImh0dHBzOi8vZ3lhem8uY29tL1wiO1xuICBpZiAocHJvY2Vzcy5lbnYuQlVJTERfRVhURU5TSU9OX1RZUEUgPT09IFwidGVhbXNcIikge1xuICAgIGNvbnN0IHsgZXJyb3IsIHRlYW0gfSA9IGF3YWl0IHNlbmRNZXNzYWdlVG9NYWluU2NyaXB0KGNocm9tZS5ydW50aW1lLmlkLCB7XG4gICAgICB0YXJnZXQ6IFwibWFpblwiLFxuICAgICAgYWN0aW9uOiBcImdldFRlYW1cIixcbiAgICAgIHRhYjogcmVxdWVzdC50YWIsXG4gICAgfSk7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgd2luZG93LmFsZXJ0KGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB3aW5kb3cub3BlbihcImh0dHBzOi8vZ3lhem8uY29tL3RlYW1zL2xvZ2luXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0ZWFtTmFtZSA9IHRlYW0ubmFtZTtcbiAgICBpZiAoIXRlYW1OYW1lKSByZXR1cm47XG4gICAgY2FwdHVyZXNQYWdlVXJsID0gYGh0dHBzOi8vJHt0ZWFtTmFtZX0uZ3lhem8uY29tYDtcbiAgfVxuICBsZXQgZ3lhem9NZW51ID0gc2hhZG93RE9NUXVlcnlTZWxlY3RvcihcbiAgICBcIi5neWF6by1tZW51Om5vdCguZ3lhem8tbm90aWZpY2F0aW9uKVwiXG4gICk7XG4gIGlmIChneWF6b01lbnUpIHtcbiAgICBneWF6b01lbnUucmVtb3ZlKCk7XG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQoUkVNT1ZFX0dZQVpPTUVOVV9FVkVOVCk7XG4gIH1cblxuICBjb25zdCBoaWRlTWVudSA9ICgpID0+IHtcbiAgICBpZiAoZ3lhem9NZW51KSB7XG4gICAgICBneWF6b01lbnUucmVtb3ZlKCk7XG4gICAgfVxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFJFTU9WRV9HWUFaT01FTlVfRVZFTlQpO1xuICB9O1xuXG4gIGd5YXpvTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGd5YXpvTWVudS5jbGFzc05hbWUgPSBcImd5YXpvLW1lbnUgZ3lhem8tbWVudS1lbGVtZW50XCI7XG5cbiAgY29uc3Qgc2VsZWN0RWxlbWVudEJ0biA9IGNyZWF0ZUJ1dHRvbihcbiAgICBcInNlbGVjdGlvblwiLFxuICAgIGNocm9tZS5pMThuLmdldE1lc3NhZ2UoXCJzZWxlY3RFbGVtZW50XCIpLFxuICAgIFwiRVwiXG4gICk7XG4gIGNvbnN0IHNlbGVjdEFyZWFCdG4gPSBjcmVhdGVCdXR0b24oXG4gICAgXCJjcm9wXCIsXG4gICAgY2hyb21lLmkxOG4uZ2V0TWVzc2FnZShcInNlbGVjdEFyZWFcIiksXG4gICAgXCJTXCJcbiAgKTtcbiAgY29uc3Qgd2luZG93Q2FwdHVyZUJ0biA9IGNyZWF0ZUJ1dHRvbihcbiAgICBcIndpbmRvd1wiLFxuICAgIGNocm9tZS5pMThuLmdldE1lc3NhZ2UoXCJjYXB0dXJlV2luZG93XCIpLFxuICAgIFwiUFwiXG4gICk7XG4gIGNvbnN0IHdob2xlQ2FwdHVyZUJ0biA9IGNyZWF0ZUJ1dHRvbihcbiAgICBcIndpbmRvdy1zY3JvbGxcIixcbiAgICBjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKFwidG9wVG9Cb3R0b21cIiksXG4gICAgXCJXXCJcbiAgKTtcbiAgY29uc3Qgc25hcE9HUEltYWdlQnRuID0gY3JlYXRlT0dQQnV0dG9uT25NZW51KFwiT1wiKTtcbiAgY29uc3QgbXlJbWFnZUJ0biA9IGNyZWF0ZUJ1dHRvbihcImdyaWRcIiwgY2hyb21lLmkxOG4uZ2V0TWVzc2FnZShcIm15SW1hZ2VcIikpO1xuICBteUltYWdlQnRuLmNsYXNzTGlzdC5hZGQoXCJneWF6by1tZW51LW15aW1hZ2VcIik7XG4gIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2xvc2VCdG4uY2xhc3NOYW1lID0gXCJneWF6by1jbG9zZS1idXR0b24gZ3lhem8tbWVudS1lbGVtZW50XCI7XG4gIGNvbnN0IGNsb3NlQnRuSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNsb3NlQnRuSWNvbi5jbGFzc05hbWUgPSBcImd5YXpvLW1lbnUtZWxlbWVudCBneWF6by1pY29uIGd5YXpvLWljb24tY3Jvc3NcIjtcbiAgY2xvc2VCdG4uYXBwZW5kQ2hpbGQoY2xvc2VCdG5JY29uKTtcbiAgdHJ5IHtcbiAgICB3aW5kb3dcbiAgICAgIC5mZXRjaChjaHJvbWUucnVudGltZS5nZXRVUkwoXCJpbWdzL2Nyb3NzLnN2Z1wiKSlcbiAgICAgIC50aGVuKChyZXMpID0+IHJlcy50ZXh0KCkpXG4gICAgICAudGhlbigodGV4dCkgPT4ge1xuICAgICAgICBjbG9zZUJ0bkljb24uaW5uZXJIVE1MID0gdGV4dDtcbiAgICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2xvc2VCdG5JY29uLmlubmVySFRNTCA9IGA8aW1nIHNyYz0nJHtjaHJvbWUucnVudGltZS5nZXRVUkwoXG4gICAgICBcImltZ3MvY3Jvc3Muc3ZnXCJcbiAgICApfScgY2xhc3M9J2d5YXpvLW1lbnUtZWxlbWVudCcgLz5gO1xuICB9XG4gIGNsb3NlQnRuLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiUHJlc3M6IEVzY2FwZVwiKTtcbiAgY29uc3QgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYnV0dG9uQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZ3lhem8tYnV0dG9uLWNvbnRhaW5lclwiO1xuICBzbmFwT0dQSW1hZ2VCdG4gJiYgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHNuYXBPR1BJbWFnZUJ0bik7XG4gIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RFbGVtZW50QnRuKTtcbiAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdEFyZWFCdG4pO1xuICBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQod2luZG93Q2FwdHVyZUJ0bik7XG4gIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh3aG9sZUNhcHR1cmVCdG4pO1xuICBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQobXlJbWFnZUJ0bik7XG4gIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XG5cbiAgY29uc3QgdXBncmFkZUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB1cGdyYWRlTGluay5jbGFzc05hbWUgPSBcImd5YXpvLXVwZ3JhZGUtbGlua1wiO1xuICB1cGdyYWRlTGluay5pbm5lckhUTUwgPSBgPHNwYW4+JHtjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKFxuICAgIFwidXBncmFkZUxpbmtcIlxuICApfTwvc3Bhbj5gO1xuXG4gIGNvbnN0IG9uQ29udGV4dG1lbnUgPSAoKSA9PiB7XG4gICAgaGlkZU1lbnUoKTtcbiAgfTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIG9uQ29udGV4dG1lbnUsIHsgb25jZTogdHJ1ZSB9KTtcbiAgc2hhZG93RE9NQXBwZW5kV2l0aENzcyhicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFwibWVudS5jc3NcIiksIGd5YXpvTWVudSk7XG4gIGd5YXpvTWVudS5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpO1xuXG4gIGNvbnN0IFNIT1dfVVBHUkFERV9MSU5LX0RBVEUgPSBuZXcgRGF0ZShcIjIwMjQtMDYtMTdcIik7XG4gIGNvbnN0IEhJREVfVVBHUkFERV9MSU5LX0RBVEUgPSBuZXcgRGF0ZShcIjIwMjQtMDYtMjVcIik7XG5cbiAgLy8gMjAyNC0wNi0xN+OBi+OCiTIwMjQtMDYtMjXjgpLov47jgYjjgovjgb7jgafjga7plpPjgavpmZDjgorjgIHlgIvkurrniYjjgadQcm/jgqLjg4Pjg5fjgrDjg6zjg7zjg4nlsI7nt5rjgpLooajnpLpcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgaWYgKFxuICAgIHByb2Nlc3MuZW52LkJVSUxEX0VYVEVOU0lPTl9UWVBFICE9PSBcInRlYW1zXCIgJiZcbiAgICBub3cgPCBISURFX1VQR1JBREVfTElOS19EQVRFICYmXG4gICAgbm93ID49IFNIT1dfVVBHUkFERV9MSU5LX0RBVEVcbiAgKSB7XG4gICAgZ3lhem9NZW51LmFwcGVuZENoaWxkKHVwZ3JhZGVMaW5rKTtcbiAgfVxuXG4gIGNvbnN0IGhvdEtleSA9IGZ1bmN0aW9uIChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBob3RLZXkpO1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NfS0VZX0NPREUpIHtcbiAgICAgIGhpZGVNZW51KCk7XG4gICAgfVxuICAgIHN3aXRjaCAoU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC5rZXlDb2RlKSkge1xuICAgICAgY2FzZSBcIkVcIjpcbiAgICAgICAgc2VsZWN0RWxlbWVudEJ0bi5jbGljaygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJTXCI6XG4gICAgICAgIHNlbGVjdEFyZWFCdG4uY2xpY2soKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiUFwiOlxuICAgICAgICB3aW5kb3dDYXB0dXJlQnRuLmNsaWNrKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIldcIjpcbiAgICAgICAgd2hvbGVDYXB0dXJlQnRuLmNsaWNrKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIk9cIjpcbiAgICAgICAgc25hcE9HUEltYWdlQnRuICYmIHNuYXBPR1BJbWFnZUJ0bi5jbGljaygpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBob3RLZXkpO1xuICBsZXQgc2V0dGluZ3MgPSB7IGJlaGF2aW9yOiBcImFyZWFcIiB9O1xuICB0cnkge1xuICAgIHNldHRpbmdzID0gYXdhaXQgc3RvcmFnZS5nZXQoeyBiZWhhdmlvcjogXCJhcmVhXCIgfSk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIG5vLW9wXG4gIH1cbiAgY29uc3QgeyBiZWhhdmlvciB9ID0gc2V0dGluZ3M7XG4gIGlmIChiZWhhdmlvciA9PT0gXCJlbGVtZW50XCIpIHtcbiAgICAvLyBEZWZhdWx0IGJlaGF2aW9yIGlzIHNlbGVjdCBlbGVtZW50XG4gICAgc2VsZWN0RWxlbWVudEJ0bi5jbGFzc0xpc3QuYWRkKFwiZ3lhem8tYnV0dG9uLWFjdGl2ZVwiKTtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICBneWF6b1NlbGVjdEVsbShyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSlcbiAgICApO1xuICB9IGVsc2UgaWYgKGJlaGF2aW9yID09PSBcImFyZWFcIikge1xuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgc2VsZWN0IGFyZWFcbiAgICBzZWxlY3RBcmVhQnRuLmNsYXNzTGlzdC5hZGQoXCJneWF6by1idXR0b24tYWN0aXZlXCIpO1xuICAgIGd5YXpvQ2FwdHVyZVNlbGVjdGVkQXJlYShyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSk7XG4gIH1cbiAgc2VsZWN0QXJlYUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChiZWhhdmlvciA9PT0gXCJhcmVhXCIpIHJldHVybjtcbiAgICBoaWRlTWVudSgpO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgZ3lhem9DYXB0dXJlU2VsZWN0ZWRBcmVhKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKTtcbiAgICB9KTtcbiAgfSk7XG4gIHNlbGVjdEVsZW1lbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoYmVoYXZpb3IgPT09IFwiZWxlbWVudFwiKSByZXR1cm47XG4gICAgaGlkZU1lbnUoKTtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgIGd5YXpvU2VsZWN0RWxtKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKTtcbiAgICB9KTtcbiAgfSk7XG4gIHdpbmRvd0NhcHR1cmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBoaWRlTWVudSgpO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgZ3lhem9jYXB0dXJlV2luZG93KHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKTtcbiAgICB9KTtcbiAgfSk7XG4gIHdob2xlQ2FwdHVyZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIGhpZGVNZW51KCk7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICBneWF6b1dob2xlQ2FwdHVyZShyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSk7XG4gICAgfSk7XG4gIH0pO1xuICBzbmFwT0dQSW1hZ2VCdG4gJiZcbiAgICBzbmFwT0dQSW1hZ2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGhpZGVNZW51KCk7XG4gICAgICBneWF6b1NuYXBPR1BJbWFnZShyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSk7XG4gICAgfSk7XG4gIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgaGlkZU1lbnUoKTtcbiAgfSk7XG4gIG15SW1hZ2VCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBoaWRlTWVudSgpO1xuICAgIHdpbmRvdy5vcGVuKGNhcHR1cmVzUGFnZVVybCk7XG4gIH0pO1xuICBzZW5kUmVzcG9uc2UoKTtcbn07XG4iLCJpbXBvcnQge1xuICBNZXNzYWdlSGFuZGxlcixcbiAgc2VuZE1lc3NhZ2VUb01haW5TY3JpcHQsXG59IGZyb20gXCIuLi9saWJzL01lc3NhZ2VMaXN0ZW5lclwiO1xuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcIi4uL2xpYnMvc3RvcmFnZVN3aXRjaGVyXCI7XG5pbXBvcnQgeyBzaGFkb3dET01BcHBlbmRXaXRoQ3NzLCBzaGFkb3dET01RdWVyeVNlbGVjdG9yIH0gZnJvbSBcIi4vc2hhZG93RE9NXCI7XG5cbmV4cG9ydCBkZWZhdWx0ICguLi5hcmdzOiBQYXJhbWV0ZXJzPE1lc3NhZ2VIYW5kbGVyPFwibm90aWZpY2F0aW9uXCI+PikgPT4ge1xuICBjb25zdCBbcmVxdWVzdCwgLCBzZW5kUmVzcG9uc2VdID0gYXJncztcbiAgbGV0IG5vdGlmaWNhdGlvbkNvbnRhaW5lciA9IHNoYWRvd0RPTVF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIuZ3lhem8tbWVudS5neWF6by1tZW51LWVsZW1lbnQuZ3lhem8tbm90aWZpY2F0aW9uLCAuZ3lhem8tbWVudS5neWF6by1ub3RpZmljYXRpb25cIlxuICApO1xuICBpZiAobm90aWZpY2F0aW9uQ29udGFpbmVyKSB7XG4gICAgbm90aWZpY2F0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJneWF6by1ub3RpZmljYXRpb25cIik7XG4gIH0gZWxzZSB7XG4gICAgbm90aWZpY2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBub3RpZmljYXRpb25Db250YWluZXIuY2xhc3NOYW1lID0gXCJneWF6by1tZW51IGd5YXpvLW5vdGlmaWNhdGlvblwiO1xuICAgIHNoYWRvd0RPTUFwcGVuZFdpdGhDc3MoXG4gICAgICBicm93c2VyLnJ1bnRpbWUuZ2V0VVJMKFwibWVudS5jc3NcIiksXG4gICAgICBub3RpZmljYXRpb25Db250YWluZXJcbiAgICApO1xuICB9XG4gIGNvbnN0IG5vdGlmaWNhdGlvbkJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBub3RpZmljYXRpb25Cb2R5LmNsYXNzTmFtZSA9IFwiZ3lhem8tbm90aWZpY2F0aW9uLWJvZHlcIjtcbiAgY29uc3Qgbm90aWZpY2F0aW9uRm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBsZXQgdGl0bGU6IEhUTUxFbGVtZW50IHwgVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpO1xuICBpZiAocmVxdWVzdC50aXRsZSkge1xuICAgIHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aXRsZS5jbGFzc05hbWUgPSBcImd5YXpvLW5vdGlmaWNhdGlvbi10aXRsZVwiO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gcmVxdWVzdC50aXRsZTtcbiAgfVxuICBjb25zdCBzaG93SW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzaG93U3VnZ2VzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGlmIChyZXF1ZXN0LmltYWdlUGFnZVVybCAmJiByZXF1ZXN0LmltYWdlVXJsKSB7XG4gICAgY29uc3QgaW1hZ2VXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpbWFnZVdyYXBwZXIuY2xhc3NOYW1lID0gXCJneWF6by1ub3RpZmljYXRpb24taW1hZ2Utd3JhcHBlclwiO1xuICAgIGNvbnN0IGltYWdlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgaW1hZ2VDb250YWluZXIuaHJlZiA9IHJlcXVlc3QuaW1hZ2VQYWdlVXJsO1xuICAgIGltYWdlQ29udGFpbmVyLnRhcmdldCA9IFwiX2JsYW5rXCI7XG4gICAgaW1hZ2VXcmFwcGVyLmFwcGVuZENoaWxkKGltYWdlQ29udGFpbmVyKTtcbiAgICBzaG93SW1hZ2UuYXBwZW5kQ2hpbGQoaW1hZ2VXcmFwcGVyKTtcbiAgICBjb25zdCBpbWFnZUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGltYWdlRWxlbS5jbGFzc05hbWUgPSBcImltYWdlXCI7XG4gICAgaW1hZ2VFbGVtLnNyYyA9IHJlcXVlc3QuaW1hZ2VVcmw7XG4gICAgaW1hZ2VFbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgbmF0dXJhbFdpZHRoLCBuYXR1cmFsSGVpZ2h0IH0gPSBpbWFnZUVsZW07XG4gICAgICBpZiAocmVxdWVzdC5zY2FsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGltYWdlRWxlbS5zdHlsZS5tYXhXaWR0aCA9IG5hdHVyYWxXaWR0aCAvIHJlcXVlc3Quc2NhbGUgKyBcInB4XCI7XG4gICAgICAgIGltYWdlRWxlbS5zdHlsZS5tYXhIZWlnaHQgPSBuYXR1cmFsSGVpZ2h0IC8gcmVxdWVzdC5zY2FsZSArIFwicHhcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpbWFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChpbWFnZUVsZW0pO1xuXG4gICAgY29uc3QgdG9vbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdG9vbENvbnRhaW5lci5jbGFzc05hbWUgPSBcImd5YXpvLW5vdGlmaWNhdGlvbi10b29sLWNvbnRhaW5lclwiO1xuICAgIHNob3dJbWFnZS5hcHBlbmRDaGlsZCh0b29sQ29udGFpbmVyKTtcblxuICAgIGNvbnN0IGltYWdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgaW1hZ2VCdXR0b24uaHJlZiA9IHJlcXVlc3QuaW1hZ2VQYWdlVXJsO1xuICAgIGltYWdlQnV0dG9uLnRhcmdldCA9IFwiX2JsYW5rXCI7XG4gICAgaW1hZ2VCdXR0b24uY2xhc3NOYW1lID0gXCJneWF6by1ub3RpZmljYXRpb24tYnV0dG9uXCI7XG4gICAgaW1hZ2VCdXR0b24udGV4dENvbnRlbnQgPSBjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKFwib3BlbkltYWdlUGFnZVwiKTtcbiAgICB0b29sQ29udGFpbmVyLmFwcGVuZENoaWxkKGltYWdlQnV0dG9uKTtcblxuICAgIGNvbnN0IGRyYXdCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBjb25zdCBwYXJhbXNGb3JEcmF3VVRNID1cbiAgICAgIFwiP3V0bV9zb3VyY2U9Z3lhem9fYnJvd3Nlcl9leHRlbnNpb24mdXRtX2NhbXBhaWduPW5vdGlmaWNhdGlvblwiO1xuICAgIGRyYXdCdXR0b24uaHJlZiA9IHJlcXVlc3QuaW1hZ2VQYWdlVXJsICsgXCIvZHJhd1wiICsgcGFyYW1zRm9yRHJhd1VUTTtcbiAgICBkcmF3QnV0dG9uLnRhcmdldCA9IFwiX2JsYW5rXCI7XG4gICAgZHJhd0J1dHRvbi5jbGFzc05hbWUgPSBcImd5YXpvLW5vdGlmaWNhdGlvbi1idXR0b25cIjtcbiAgICBkcmF3QnV0dG9uLnRleHRDb250ZW50ID0gY2hyb21lLmkxOG4uZ2V0TWVzc2FnZShcIm9wZW5EcmF3UGFnZVwiKTtcbiAgICB0b29sQ29udGFpbmVyLmFwcGVuZENoaWxkKGRyYXdCdXR0b24pO1xuXG4gICAgLyoqIOeUu+WDj+ODquODs+OCr+OBruiHquWLleOCs+ODlOODvOioreWumuOCkuaPkOahiOOBmeOCi+ODoeODg+OCu+ODvOOCuCAqL1xuICAgIGNvbnN0IHN1Z2dlc3RDb3B5VXJsTWVzc2FnZTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBjb25zdCBzdWdnZXN0Q29weVVybE1lc3NhZ2UyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgc3VnZ2VzdENvcHlVcmxNZXNzYWdlMS50ZXh0Q29udGVudCA9IGNocm9tZS5pMThuLmdldE1lc3NhZ2UoXG4gICAgICBcInN1Z2dlc3RDb3B5VXJsU3VwcG9ydE1lc3NhZ2UxXCJcbiAgICApO1xuICAgIHN1Z2dlc3RDb3B5VXJsTWVzc2FnZTIudGV4dENvbnRlbnQgPSBjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKFxuICAgICAgXCJzdWdnZXN0Q29weVVybFN1cHBvcnRNZXNzYWdlMlwiXG4gICAgKTtcbiAgICBzaG93U3VnZ2VzdC5hcHBlbmQoc3VnZ2VzdENvcHlVcmxNZXNzYWdlMSwgc3VnZ2VzdENvcHlVcmxNZXNzYWdlMik7XG5cbiAgICAvKiog6Kit5a6a44Oa44O844K444KS6ZaL44GP44Oc44K/44OzICovXG4gICAgY29uc3QgZ29Ub1NldHRpbmdzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBnb1RvU2V0dGluZ3MuY2xhc3NOYW1lID0gXCJneWF6by1ub3RpZmljYXRpb24tYnV0dG9uXCI7XG4gICAgZ29Ub1NldHRpbmdzLnRleHRDb250ZW50ID0gY2hyb21lLmkxOG4uZ2V0TWVzc2FnZShcImdvVG9TZXR0aW5nc1wiKTtcbiAgICBnb1RvU2V0dGluZ3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbmRNZXNzYWdlVG9NYWluU2NyaXB0KGNocm9tZS5ydW50aW1lLmlkLCB7XG4gICAgICAgIHRhcmdldDogXCJtYWluXCIsXG4gICAgICAgIGFjdGlvbjogXCJyZXF1ZXN0UGVybWlzc2lvbkNvcHlVcmxUb0NsaXBib2FyZFwiLFxuICAgICAgfSk7XG4gICAgICBzdG9yYWdlLnNldCh7IGNvcHlVcmxTdXBwb3J0Q2xvc2VkOiB0cnVlIH0pO1xuICAgICAgbm90aWZpY2F0aW9uQ29udGFpbmVyPy5yZW1vdmVDaGlsZChub3RpZmljYXRpb25Gb290ZXIpO1xuICAgIH0pO1xuICAgIGNvbnN0IGdvVG9TZXR0aW5nc1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGdvVG9TZXR0aW5nc1dyYXBwZXIuY2xhc3NOYW1lID0gXCJneWF6by1ub3RpZmljYXRpb24tYnV0dG9uLXdyYXBwZXJcIjtcbiAgICBnb1RvU2V0dGluZ3NXcmFwcGVyLmFwcGVuZENoaWxkKGdvVG9TZXR0aW5ncyk7XG4gICAgc2hvd1N1Z2dlc3QuYXBwZW5kQ2hpbGQoZ29Ub1NldHRpbmdzV3JhcHBlcik7XG5cbiAgICAvKiog44Kv44Oq44OD44Kv44GZ44KL44Go44CB5Lul5b6M44Gv5o+Q5qGI44Oh44OD44K744O844K444KS6KGo56S644GX44Gq44GEICovXG4gICAgY29uc3QgZG9Ob3RTaG93VGhpc01lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBkb05vdFNob3dUaGlzTWVzc2FnZS5jbGFzc05hbWUgPSBcImd5YXpvLW5vdGlmaWNhdGlvbi1saW5rXCI7XG4gICAgZG9Ob3RTaG93VGhpc01lc3NhZ2UudGV4dENvbnRlbnQgPSBjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKFxuICAgICAgXCJkb05vdFNob3dUaGlzTWVzc2FnZVwiXG4gICAgKTtcbiAgICBkb05vdFNob3dUaGlzTWVzc2FnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgc3RvcmFnZS5zZXQoeyBjb3B5VXJsU3VwcG9ydENsb3NlZDogdHJ1ZSB9KTtcbiAgICAgIG5vdGlmaWNhdGlvbkNvbnRhaW5lcj8ucmVtb3ZlQ2hpbGQobm90aWZpY2F0aW9uRm9vdGVyKTtcbiAgICB9KTtcbiAgICBzaG93U3VnZ2VzdC5hcHBlbmRDaGlsZChkb05vdFNob3dUaGlzTWVzc2FnZSk7XG5cbiAgICAvKiog6Z2S5Zyw44Gr55m95paH5a2X44Gu44K544K/44Kk44Or44KC55S75YOP6Kqt44G/6L6844G/5b6M44Gr5b2T44Gm44KLICovXG4gICAgc2hvd1N1Z2dlc3QuY2xhc3NOYW1lID0gXCJneWF6by1ub3RpZmljYXRpb24tc3VnZ2VzdFwiO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGxvYWRpbmdFbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBsb2FkaW5nRWxtLmNsYXNzTmFtZSA9IFwiZ3lhem8tc3BpblwiO1xuICAgIHRyeSB7XG4gICAgICB3aW5kb3dcbiAgICAgICAgLmZldGNoKGNocm9tZS5ydW50aW1lLmdldFVSTChcImltZ3Mvc3Bpbm5lci5zdmdcIikpXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcy50ZXh0KCkpXG4gICAgICAgIC50aGVuKCh0ZXh0KSA9PiB7XG4gICAgICAgICAgbG9hZGluZ0VsbS5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2FkaW5nRWxtLmlubmVySFRNTCA9IGA8aW1nIHNyYz0nJHtjaHJvbWUucnVudGltZS5nZXRVUkwoXG4gICAgICAgIFwiaW1ncy9zcGlubmVyLnN2Z1wiXG4gICAgICApfScgLz5gO1xuICAgIH1cbiAgICBzaG93SW1hZ2UuYXBwZW5kQ2hpbGQobG9hZGluZ0VsbSk7XG4gIH1cbiAgbm90aWZpY2F0aW9uQm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICBub3RpZmljYXRpb25Cb2R5LmFwcGVuZCh0aXRsZSwgc2hvd0ltYWdlKTtcblxuICBub3RpZmljYXRpb25Gb290ZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgbm90aWZpY2F0aW9uRm9vdGVyLmFwcGVuZENoaWxkKHNob3dTdWdnZXN0KTtcblxuICBub3RpZmljYXRpb25Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgbm90aWZpY2F0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbkJvZHkpO1xuICBzdG9yYWdlXG4gICAgLmdldCh7IGNvcHlVcmxTdXBwb3J0Q2xvc2VkOiBmYWxzZSB9KVxuICAgIC50aGVuKGFzeW5jIChpdGVtOiB7IGNvcHlVcmxTdXBwb3J0Q2xvc2VkOiBib29sZWFuIH0pID0+IHtcbiAgICAgIGlmIChpdGVtLmNvcHlVcmxTdXBwb3J0Q2xvc2VkKSByZXR1cm47XG4gICAgICBub3RpZmljYXRpb25Db250YWluZXI/LmFwcGVuZENoaWxkKG5vdGlmaWNhdGlvbkZvb3Rlcik7XG4gICAgfSk7XG5cbiAgaWYgKHJlcXVlc3QuaXNGaW5pc2gpIHtcbiAgICBub3RpZmljYXRpb25Db250YWluZXJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmltYWdlXCIpXG4gICAgICA/LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG5vdGlmaWNhdGlvbkNvbnRhaW5lcj8ucmVtb3ZlKCk7XG4gICAgICAgIH0sIDUwMDApO1xuICAgICAgfSk7XG4gIH1cbiAgc2VuZFJlc3BvbnNlKCk7XG59O1xuIiwibGV0IGhvc3Q6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG5jb25zdCBzaGFkb3dET00gPSAoKSA9PiB7XG4gIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGhvc3QuYXR0YWNoU2hhZG93KHsgbW9kZTogXCJvcGVuXCIgfSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoaG9zdCk7XG4gIH1cbiAgcmV0dXJuIGhvc3Quc2hhZG93Um9vdDtcbn07XG5cbmV4cG9ydCBjb25zdCBzaGFkb3dET01BcHBlbmQgPSAoLi4uZWxlbWVudHM6IEVsZW1lbnRbXSkgPT4ge1xuICBzaGFkb3dET00oKT8uYXBwZW5kKC4uLmVsZW1lbnRzKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaGFkb3dET01BcHBlbmRXaXRoQ3NzID0gKFxuICBjc3NwYXRoOiBzdHJpbmcsXG4gIC4uLmVsZW1lbnRzOiBFbGVtZW50W11cbikgPT4ge1xuICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG4gIGxpbmsucmVsID0gXCJzdHlsZXNoZWV0XCI7XG4gIGxpbmsuaHJlZiA9IGNzc3BhdGg7XG4gIHNoYWRvd0RPTSgpPy5hcHBlbmQobGluaywgLi4uZWxlbWVudHMpO1xufTtcblxuLy8gbm9kZV9tb2R1bGVzL3R5cGVzY3JpcHQvbGliL2xpYi5kb20uZC50cyDjgojjgormjIHjgaPjgabjgY3jgZ9cbmV4cG9ydCBmdW5jdGlvbiBzaGFkb3dET01RdWVyeVNlbGVjdG9yPEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXA+KFxuICBzZWxlY3RvcnM6IEtcbik6IEhUTUxFbGVtZW50VGFnTmFtZU1hcFtLXSB8IG51bGw7XG5leHBvcnQgZnVuY3Rpb24gc2hhZG93RE9NUXVlcnlTZWxlY3RvcjxLIGV4dGVuZHMga2V5b2YgU1ZHRWxlbWVudFRhZ05hbWVNYXA+KFxuICBzZWxlY3RvcnM6IEtcbik6IFNWR0VsZW1lbnRUYWdOYW1lTWFwW0tdIHwgbnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBzaGFkb3dET01RdWVyeVNlbGVjdG9yPEUgZXh0ZW5kcyBFbGVtZW50ID0gRWxlbWVudD4oXG4gIHNlbGVjdG9yczogc3RyaW5nXG4pOiBFIHwgbnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBzaGFkb3dET01RdWVyeVNlbGVjdG9yKHNlbGVjdG9yczogc3RyaW5nKTogRWxlbWVudCB8IG51bGwge1xuICByZXR1cm4gc2hhZG93RE9NKCk/LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzKSA/PyBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hhZG93RE9NUXVlcnlTZWxlY3RvckFsbDxcbiAgSyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50VGFnTmFtZU1hcFxuPihzZWxlY3RvcnM6IEspOiBBcnJheTxIVE1MRWxlbWVudFRhZ05hbWVNYXBbS10+O1xuZXhwb3J0IGZ1bmN0aW9uIHNoYWRvd0RPTVF1ZXJ5U2VsZWN0b3JBbGw8SyBleHRlbmRzIGtleW9mIFNWR0VsZW1lbnRUYWdOYW1lTWFwPihcbiAgc2VsZWN0b3JzOiBLXG4pOiBBcnJheTxTVkdFbGVtZW50VGFnTmFtZU1hcFtLXT47XG5leHBvcnQgZnVuY3Rpb24gc2hhZG93RE9NUXVlcnlTZWxlY3RvckFsbDxFIGV4dGVuZHMgRWxlbWVudCA9IEVsZW1lbnQ+KFxuICBzZWxlY3RvcnM6IHN0cmluZ1xuKTogQXJyYXk8RT47XG5leHBvcnQgZnVuY3Rpb24gc2hhZG93RE9NUXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnM6IHN0cmluZyk6IEVsZW1lbnRbXSB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IHNoYWRvd0RPTSgpO1xuICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuIFtdO1xuICBjb25zdCBlbGVtID0gQXJyYXkuZnJvbShjb250YWluZXIucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcnMpKTtcbiAgcmV0dXJuIGVsZW07XG59XG4iLCJpbXBvcnQgdHlwZSBCcm93c2VyIGZyb20gXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIjtcbmltcG9ydCBicm93c2VyIGZyb20gXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIjtcbmV4cG9ydCB0eXBlIERhdGFVUkwgPSBzdHJpbmcgJiB7IF9faWQ6IFwiRGF0YVVSTFwiIH07XG5cbnR5cGUgQ2FwdHVyZVNpemVEYXRhID0ge1xuICBoOiBudW1iZXI7XG4gIHc6IG51bWJlcjtcbiAgejogbnVtYmVyO1xuICBzOiBudW1iZXI7XG4gIHU6IHN0cmluZztcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIGRvY3VtZW50V2lkdGg6IG51bWJlcjtcbiAgcG9zaXRpb25YOiBudW1iZXI7XG4gIHBvc2l0aW9uWTogbnVtYmVyO1xuICBkZWZhdWx0UG9zaXRvbj86IG51bWJlcjtcbiAgdDogc3RyaW5nO1xuICBkZXNjPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgQ2FwdHVyaW5nRGF0YSA9IENhcHR1cmVTaXplRGF0YSAmIHtcbiAgdGFiOiBCcm93c2VyLlRhYnMuVGFiIHwgdW5kZWZpbmVkO1xuICBzcmNVcmw6IHN0cmluZztcbn07XG5cbnR5cGUgQ29udGV4dHMgPSBcImNvbnRlbnRcIiB8IFwibWFpblwiO1xuXG5leHBvcnQgdHlwZSBNZXNzYWdlPFxuICBBY3Rpb24gZXh0ZW5kcyBzdHJpbmcsXG4gIFRhcmdldENvbnRleHQgZXh0ZW5kcyBDb250ZXh0cyxcbiAgT21pdFRhYiA9IGZhbHNlXG4+ID0gT21pdFRhYiBleHRlbmRzIHRydWVcbiAgPyB7XG4gICAgICB0YXJnZXQ6IFRhcmdldENvbnRleHQ7XG4gICAgICBhY3Rpb246IEFjdGlvbjtcbiAgICB9XG4gIDoge1xuICAgICAgdGFyZ2V0OiBUYXJnZXRDb250ZXh0O1xuICAgICAgYWN0aW9uOiBBY3Rpb247XG4gICAgICB0YWI6IEJyb3dzZXIuVGFicy5UYWIgfCBjaHJvbWUudGFicy5UYWI7XG4gICAgfTtcblxudHlwZSBNYWluSGFuZGxlcnMgPSBSZWFkb25seTx7XG4gIGdldFRlYW06IE1lc3NhZ2U8XCJnZXRUZWFtXCIsIFwibWFpblwiPjtcbiAgZ3lhem9HZXRJbWFnZUJsb2I6IE1lc3NhZ2U8XCJneWF6b0dldEltYWdlQmxvYlwiLCBcIm1haW5cIiwgdHJ1ZT4gJiB7XG4gICAgZ3lhem9Vcmw6IHN0cmluZztcbiAgfTtcbiAgZ3lhem9TZW5kUmF3SW1hZ2U6IE1lc3NhZ2U8XCJneWF6b1NlbmRSYXdJbWFnZVwiLCBcIm1haW5cIj4gJiB7XG4gICAgZGF0YTogeyBzcmNVcmw6IHN0cmluZyB8IG51bGwgfTtcbiAgfTtcbiAgZ3lhem9DYXB0dXJlV2l0aFNpemU6IE1lc3NhZ2U8XCJneWF6b0NhcHR1cmVXaXRoU2l6ZVwiLCBcIm1haW5cIj4gJiB7XG4gICAgZGF0YTogQ2FwdHVyZVNpemVEYXRhO1xuICB9O1xuICByZXF1ZXN0UGVybWlzc2lvbkNvcHlVcmxUb0NsaXBib2FyZDogTWVzc2FnZTxcbiAgICBcInJlcXVlc3RQZXJtaXNzaW9uQ29weVVybFRvQ2xpcGJvYXJkXCIsXG4gICAgXCJtYWluXCIsXG4gICAgdHJ1ZVxuICA+O1xufT47XG5cbnR5cGUgQ29udGVudEhhbmRsZXJzID0gUmVhZG9ubHk8e1xuICBjYXB0dXJlV2luZG93OiBNZXNzYWdlPFwiY2FwdHVyZVdpbmRvd1wiLCBcImNvbnRlbnRcIj47XG4gIG5vdGlmaWNhdGlvbjogTWVzc2FnZTxcIm5vdGlmaWNhdGlvblwiLCBcImNvbnRlbnRcIiwgdHJ1ZT4gJlxuICAgIFBhcnRpYWw8e1xuICAgICAgdGl0bGU6IHN0cmluZztcbiAgICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICAgIGltYWdlUGFnZVVybDogc3RyaW5nO1xuICAgICAgaW1hZ2VVcmw6IHN0cmluZztcbiAgICAgIGlzRmluaXNoOiBib29sZWFuO1xuICAgIH0+ICZcbiAgICBQYXJ0aWFsPHsgc2NhbGU6IG51bWJlciB9PjtcbiAgaW5zZXJ0TWVudTogTWVzc2FnZTxcImluc2VydE1lbnVcIiwgXCJjb250ZW50XCI+O1xuICBjaGFuZ2VGaXhlZEVsZW1lbnRUb0Fic29sdXRlOiBNZXNzYWdlPFxuICAgIFwiY2hhbmdlRml4ZWRFbGVtZW50VG9BYnNvbHV0ZVwiLFxuICAgIFwiY29udGVudFwiXG4gID47XG4gIGNhcHR1cmVTZWxlY3RBcmVhOiBNZXNzYWdlPFwiY2FwdHVyZVNlbGVjdEFyZWFcIiwgXCJjb250ZW50XCI+O1xuICBjYXB0dXJlRWxlbWVudDogTWVzc2FnZTxcImNhcHR1cmVFbGVtZW50XCIsIFwiY29udGVudFwiPjtcbiAgY2FwdHVyZVdob2xlUGFnZTogTWVzc2FnZTxcImNhcHR1cmVXaG9sZVBhZ2VcIiwgXCJjb250ZW50XCI+O1xuICBzbmFwT0dQSW1hZ2U6IE1lc3NhZ2U8XCJzbmFwT0dQSW1hZ2VcIiwgXCJjb250ZW50XCI+O1xufT47XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VIYW5kbGVyTWFwID0gTWFpbkhhbmRsZXJzICYgQ29udGVudEhhbmRsZXJzO1xuXG50eXBlIFNlbmRSZXNwb25zZUFyZ3MgPSBSZWFkb25seTx7XG4gIGNhcHR1cmVXaW5kb3c6IG5ldmVyO1xuICBnZXRUZWFtOiBbXG4gICAgfCB7XG4gICAgICAgIHRlYW06IFJlYWRvbmx5PHsgbmFtZT86IHN0cmluZyB9PjtcbiAgICAgIH1cbiAgICB8IHtcbiAgICAgICAgZXJyb3I6IFJlYWRvbmx5PHtcbiAgICAgICAgICBzdGF0dXM6IG51bWJlcjtcbiAgICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIH0+O1xuICAgICAgfVxuICBdO1xuICBneWF6b0dldEltYWdlQmxvYjogW3sgaW1hZ2VCbG9iVXJsOiBzdHJpbmcgfV07XG4gIGd5YXpvU2VuZFJhd0ltYWdlOiBuZXZlcjtcbiAgZ3lhem9DYXB0dXJlV2l0aFNpemU6IG5ldmVyO1xuICByZXF1ZXN0UGVybWlzc2lvbkNvcHlVcmxUb0NsaXBib2FyZDogbmV2ZXI7XG4gIG5vdGlmaWNhdGlvbjogbmV2ZXI7XG4gIGluc2VydE1lbnU6IG5ldmVyO1xuICBjaGFuZ2VGaXhlZEVsZW1lbnRUb0Fic29sdXRlOiBuZXZlcjtcbiAgY2FwdHVyZVNlbGVjdEFyZWE6IG5ldmVyO1xuICBjYXB0dXJlRWxlbWVudDogbmV2ZXI7XG4gIGNhcHR1cmVXaG9sZVBhZ2U6IG5ldmVyO1xuICBzbmFwT0dQSW1hZ2U6IG5ldmVyO1xufT47XG5cbnR5cGUgQWN0aW9uTmFtZXMgPSBrZXlvZiBNZXNzYWdlSGFuZGxlck1hcDtcbnR5cGUgTWVzc2FnZXMgPSBNZXNzYWdlSGFuZGxlck1hcFtBY3Rpb25OYW1lc107XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VIYW5kbGVyPEtleSBleHRlbmRzIEFjdGlvbk5hbWVzPiA9IChcbiAgbWVzc2FnZTogT21pdDxNZXNzYWdlSGFuZGxlck1hcFtLZXldLCBcInRhcmdldFwiIHwgXCJhY3Rpb25cIj4sXG4gIHNlbmRlcjogQnJvd3Nlci5SdW50aW1lLk1lc3NhZ2VTZW5kZXIsXG4gIHNlbmRSZXNwb25zZTogKC4uLmFyZ3M6IFNlbmRSZXNwb25zZUFyZ3NbS2V5XSkgPT4gdm9pZFxuKSA9PiB2b2lkO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlTGlzdGVuZXI8Q29udGV4dCBleHRlbmRzIENvbnRleHRzPiB7XG4gIG5hbWU6IENvbnRleHQ7XG4gIGxpc3RlbmVyczoge1xuICAgIFtLZXkgaW4gQWN0aW9uTmFtZXNdPzogQXJyYXk8TWVzc2FnZUhhbmRsZXI8S2V5Pj47XG4gIH07XG4gIGNvbnN0cnVjdG9yKG5hbWU6IENvbnRleHQpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gIH1cbiAgYWRkPEFjdGlvbiBleHRlbmRzIEFjdGlvbk5hbWVzPihcbiAgICBhY3Rpb246IEFjdGlvbixcbiAgICBmdW5jOiBNZXNzYWdlSGFuZGxlcjxBY3Rpb24+XG4gICkge1xuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbYWN0aW9uXSkge1xuICAgICAgdGhpcy5saXN0ZW5lcnNbYWN0aW9uXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLmxpc3RlbmVyc1thY3Rpb25dPy5wdXNoKGZ1bmMpO1xuICB9XG5cbiAgbGlzdGVuKFxuICAgIHsgYWN0aW9uLCB0YXJnZXQsIC4uLm1lc3NhZ2UgfTogTWVzc2FnZXMsXG4gICAgc2VuZGVyOiBCcm93c2VyLlJ1bnRpbWUuTWVzc2FnZVNlbmRlcixcbiAgICBzZW5kUmVzcG9uc2U6IChhcmdzOiB1bmtub3duKSA9PiB2b2lkXG4gICkge1xuICAgIGlmICh0aGlzLm5hbWUgJiYgdGhpcy5uYW1lICE9PSB0YXJnZXQpIHJldHVybiB0cnVlO1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW2FjdGlvbl07XG4gICAgaWYgKGxpc3RlbmVycyAmJiBsaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciDvvJPjgaTjga5Db250ZXh044GM5o+D44GG44G+44Gn44GvbWVzc2FnZeOBruWei+OBjOOCqOODqeODvOOBq+OBquOCi1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goKGZ1bmMpID0+IGZ1bmMobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuLyoqXG4gKiB0YWJzLnNlbmRNZXNzYWdl44Gu44Op44OD44OR44O8XG4gKiBjb250ZW50U2NyaXB05ZCR44GR44Gu44Oh44OD44K744O844K444KS6YCB5L+h44GZ44KLXG4gKi9cbmV4cG9ydCBjb25zdCBzZW5kTWVzc2FnZVRvQ29udGVudFNjcmlwdCA9IGZ1bmN0aW9uIDxcbiAgQSBleHRlbmRzIGtleW9mIENvbnRlbnRIYW5kbGVyc1xuPihpZDogbnVtYmVyLCBtZXNzYWdlOiBDb250ZW50SGFuZGxlcnNbQV0sIGNhbGxiYWNrPzogKCkgPT4gdm9pZCkge1xuICBjb25zdCBwID0gYnJvd3Nlci50YWJzLnNlbmRNZXNzYWdlKGlkLCBtZXNzYWdlKTtcbiAgaWYgKCFwKSByZXR1cm47XG4gIHAudGhlbigoKSA9PiB7XG4gICAgY2FsbGJhY2s/LigpO1xuICB9KTtcbn07XG5cbi8qKlxuICogcnVudGltZS5zZW5kTWVzc2FnZeOBruODqeODg+ODkeODvFxuICogbWFpblNjcmlwdOWQkeOBkeOBruODoeODg+OCu+ODvOOCuOOCkumAgeS/oeOBmeOCi1xuICovXG5leHBvcnQgY29uc3Qgc2VuZE1lc3NhZ2VUb01haW5TY3JpcHQgPSBmdW5jdGlvbiA8QSBleHRlbmRzIGtleW9mIE1haW5IYW5kbGVycz4oXG4gIGlkOiBzdHJpbmcsXG4gIG1lc3NhZ2U6IE1haW5IYW5kbGVyc1tBXSxcbiAgY2FsbGJhY2s/OiAoKSA9PiB2b2lkXG4pIHtcbiAgY29uc3QgcCA9IGJyb3dzZXIucnVudGltZS5zZW5kTWVzc2FnZShpZCwgbWVzc2FnZSk7XG4gIHAudGhlbigoKSA9PiB7XG4gICAgY2FsbGJhY2s/LigpO1xuICB9KTtcbiAgcmV0dXJuIHA7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBBcnJheS5mcm9tKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBcIjpub3QoLmd5YXpvLXdob2xlLWNhcHR1cmUtb25ldGltZS1wb3NpdGlvbi12YWx1ZS1jaGFuZ2VkKVwiXG4gICAgKVxuICApLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBjb25zdCBwb3NpdGlvblZhbHVlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoaXRlbSkucG9zaXRpb247XG4gICAgaWYgKHBvc2l0aW9uVmFsdWUgPT09IFwiZml4ZWRcIikge1xuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiZ3lhem8td2hvbGUtY2FwdHVyZS1vbmV0aW1lLXBvc2l0aW9uLXZhbHVlLWNoYW5nZWRcIik7XG4gICAgICBpdGVtLnN0eWxlLnNldFByb3BlcnR5KFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiLCBcImltcG9ydGFudFwiKTtcbiAgICAgIGl0ZW0uZGF0YXNldC5vcmlnaW5hbFBvc2l0aW9uID0gaXRlbS5zdHlsZS5wb3NpdGlvbjtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uVmFsdWUgPT09IFwic3RpY2t5XCIpIHtcbiAgICAgIGl0ZW0uZGF0YXNldC5vcmlnaW5hbFBvc2l0aW9uID0gcG9zaXRpb25WYWx1ZTtcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgXCJneWF6by13aG9sZS1jYXB0dXJlLW9uZXRpbWUtcG9zaXRpb24tdmFsdWUtY2hhbmdlZFwiLFxuICAgICAgICBcImd5YXpvLXdob2xlLWNhcHR1cmUtb25ldGltZS1wb3NpdGlvbi1zdGlja3lcIlxuICAgICAgKTtcbiAgICAgIGl0ZW0uZGF0YXNldC5vcmlnaW5hbFBvc2l0aW9uID0gaXRlbS5zdHlsZS5wb3NpdGlvbjtcbiAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgICAgICAoW2VdKSA9PiB7XG4gICAgICAgICAgaWYgKGUuaW50ZXJzZWN0aW9uUmF0aW8gPCAxKSB7XG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5zZXRQcm9wZXJ0eShcInBvc2l0aW9uXCIsIFwic3RpY2t5XCIsIFwiaW1wb3J0YW50XCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5zZXRQcm9wZXJ0eShcInBvc2l0aW9uXCIsIFwic3RhdGljXCIsIFwiaW1wb3J0YW50XCIpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyB0aHJlc2hvbGQ6IFsxXSB9XG4gICAgICApO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShpdGVtKTtcbiAgICB9XG4gIH0pO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0ICgpOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3Qgb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwibWV0YVtuYW1lKj1pbWFnZV1bY29udGVudF0sbWV0YVtwcm9wZXJ0eSo9aW1hZ2VdW2NvbnRlbnRdXCJcbiAgKTtcbiAgcmV0dXJuIG9nPy5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpO1xufTtcbiIsImltcG9ydCBicm93c2VySW5mbyBmcm9tIFwiYm93c2VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgbGV0IHpvb20gPSBNYXRoLnJvdW5kKCh3aW5kb3cub3V0ZXJXaWR0aCAvIHdpbmRvdy5pbm5lcldpZHRoKSAqIDEwMCkgLyAxMDA7XG4gIC8vIFhYWDogb24gV2luZG93cywgd2hlbiB3aW5kb3cgaXMgbm90IG1heGltdW0sIGl0IHNob3VsZCB0d2VhayB6b29tLihDaHJvbWUgem9vbSBsZXZlbCAxIGlzIDEuMTApXG4gIGNvbnN0IGlzTWF4aW11bSA9XG4gICAgd2luZG93Lm91dGVySGVpZ2h0ID09PSBzY3JlZW4uYXZhaWxIZWlnaHQgJiZcbiAgICB3aW5kb3cub3V0ZXJXaWR0aCA9PT0gc2NyZWVuLmF2YWlsV2lkdGg7XG4gIGlmIChicm93c2VySW5mby53aW5kb3dzICYmICFpc01heGltdW0gJiYgem9vbSA+IDEuMCAmJiB6b29tIDwgMS4wNSkge1xuICAgIHpvb20gPSAxLjA7XG4gIH1cbiAgY29uc3Qgc2NhbGUgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyAvIHpvb207XG4gIHJldHVybiB7IHpvb20sIHNjYWxlIH07XG59O1xuIiwiaW1wb3J0IGJyb3dzZXJJbmZvIGZyb20gXCJib3dzZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGV2ZW50KSA9PiB7XG4gIC8vICBSZXR1cm4gdHJ1ZSB3aGVuXG4gIC8vICBQcmVzcyBDb21tYW5kS2V5IG9uIE1hY09TWCBvciBDdHJsS2V5IG9uIFdpbmRvd3Mgb3IgTGludXhcbiAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50IHx8IGV2ZW50IGluc3RhbmNlb2YgS2V5Ym9hcmRFdmVudCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGJyb3dzZXJJbmZvLm1hYykge1xuICAgIHJldHVybiBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmtleUlkZW50aWZpZXIgPT09IFwiTWV0YVwiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBldmVudC5jdHJsS2V5IHx8IGV2ZW50LmtleUlkZW50aWZpZXIgPT09IFwiQ29udHJvbFwiO1xuICB9XG59O1xuIiwiaW1wb3J0IHsgSkFDS1VQX01BUkdJTiB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSmFja3VwRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGphY2t1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgamFja3VwLmNsYXNzTGlzdC5hZGQoXCJneWF6by1qYWNrdXAtZWxlbWVudFwiKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGphY2t1cCk7XG4gICAgdGhpcy5lbGVtZW50ID0gamFja3VwO1xuICAgIHRoaXMub3JpZ2luYWxIVE1MSGVpZ2h0VmFsdWUgPSBudWxsO1xuICAgIHRoaXMub3JpZ2luYWxCb2R5SGVpZ2h0VmFsdWUgPSBudWxsO1xuICB9XG4gIHNldCBoZWlnaHQoaGVpZ2h0KSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGh0bWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKTtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbiAgICBjb25zdCBjc3NWYWwgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyBKQUNLVVBfTUFSR0lOICsgXCJweFwiO1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBjc3NWYWw7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGNzc1ZhbDtcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGUubWluSGVpZ2h0ID0gY3NzVmFsO1xuXG4gICAgY29uc3QgaHRtbEhlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGh0bWwpLmdldFByb3BlcnR5VmFsdWUoXCJoZWlnaHRcIik7XG4gICAgY29uc3QgYm9keUhlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGJvZHkpLmdldFByb3BlcnR5VmFsdWUoXCJoZWlnaHRcIik7XG5cbiAgICBpZiAoaHRtbEhlaWdodCA9PT0gYm9keUhlaWdodCkge1xuICAgICAgdGhpcy5vcmlnaW5hbEhUTUxIZWlnaHRWYWx1ZSA9IGh0bWwuc3R5bGUuaGVpZ2h0O1xuICAgICAgdGhpcy5vcmlnaW5hbEJvZHlIZWlnaHRWYWx1ZSA9IGJvZHkuc3R5bGUuaGVpZ2h0O1xuICAgICAgaHRtbC5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgICB9XG4gIH1cbiAgcmVtb3ZlKCkge1xuICAgIGNvbnN0IGh0bWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaHRtbFwiKTtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gICAgaHRtbC5zdHlsZS5oZWlnaHQgPSB0aGlzLm9yaWdpbmFsSFRNTEhlaWdodFZhbHVlO1xuICAgIGJvZHkuc3R5bGUuaGVpZ2h0ID0gdGhpcy5vcmlnaW5hbEJvZHlIZWlnaHRWYWx1ZTtcbiAgICBib2R5LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudCk7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMub3JpZ2luYWxIVE1MSGVpZ2h0VmFsdWUgPSBudWxsO1xuICAgIHRoaXMub3JpZ2luYWxCb2R5SGVpZ2h0VmFsdWUgPSBudWxsO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgaGVpZ2h0ID0gKCkgPT5cbiAgTWF0aC5tYXgoXG4gICAgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsXG4gICAgZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQsXG4gICAgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHRcbiAgKTtcblxuZXhwb3J0IGNvbnN0IHdpZHRoID0gKCkgPT5cbiAgTWF0aC5tYXgoXG4gICAgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCxcbiAgICBkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoLFxuICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGgsXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLFxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGhcbiAgKTtcbiIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgY29uc3QgZml4ZWRFbG1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICBcImd5YXpvLXdob2xlLWNhcHR1cmUtb25ldGltZS1wb3NpdGlvbi12YWx1ZS1jaGFuZ2VkXCJcbiAgKTtcbiAgQXJyYXkuZnJvbShmaXhlZEVsbXMpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICBcImd5YXpvLXdob2xlLWNhcHR1cmUtb25ldGltZS1wb3NpdGlvbi12YWx1ZS1jaGFuZ2VkXCIsXG4gICAgICBcImd5YXpvLXdob2xlLWNhcHR1cmUtb25ldGltZS1wb3NpdGlvbi1zdGlja3lcIlxuICAgICk7XG4gICAgaXRlbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcInBvc2l0aW9uXCIpO1xuICAgIGl0ZW0uc3R5bGUucG9zaXRpb24gPSBpdGVtLmRhdGFzZXQub3JpZ2luYWxQb3NpdGlvbjtcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGNvbnN0IGxvY2tTY3JvbGwgPSAoKSA9PiB7XG4gIGNvbnN0IHsgb3ZlcmZsb3csIG92ZXJmbG93WSwgbWFyZ2luUmlnaHQgfSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcbiAgY29uc3QgX3cgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvd1kgPSBcImhpZGRlblwiO1xuICBjb25zdCB3ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICBjb25zdCBzY3JvbGxCYXJXaWR0aCA9IHcgLSBfdztcbiAgcmV0dXJuIHsgb3ZlcmZsb3csIG92ZXJmbG93WSwgbWFyZ2luUmlnaHQsIHNjcm9sbEJhcldpZHRoIH07XG59O1xuXG5leHBvcnQgY29uc3QgdW5sb2NrU2Nyb2xsID0gKG9sZCA9IHsgb3ZlcmZsb3c6IFwiYXV0b1wiLCBvdmVyZmxvd1k6IFwiYXV0b1wiIH0pID0+IHtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gb2xkLm92ZXJmbG93O1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3dZID0gb2xkLm92ZXJmbG93WTtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm1hcmdpblJpZ2h0ID0gb2xkLm1hcmdpblJpZ2h0O1xufTtcblxuZXhwb3J0IGNvbnN0IHBhY2tTY3JvbGxCYXIgPSAob2xkKSA9PiB7XG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5tYXJnaW5SaWdodCA9IGAke29sZC5zY3JvbGxCYXJXaWR0aH1weGA7XG59O1xuIiwiY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gIGJlaGF2aW9yOiBcImFyZWFcIixcbiAgY29udGV4dE1lbnU6IHRydWUsXG4gIGZpbGVTaXplTGltaXQ6IDIsXG4gIHRlYW06IHt9LFxufTtcblxuY29uc3QgRXh0ZW5zaW9uU3RvcmFnZVdyYXBwZXIgPSBjbGFzcyBFeHRlbnNpb25TdG9yYWdlV3JhcHBlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIEZpcmVmb3ggcmVxdWlyZXMgd2ViZXh0ZW5zaW9ucy5zdG9yYWdlLnN5bmMuZW5hYmxlZCB0byB0cnVlIGluIGFib3V0OmNvbmZpZ1xuICAgIHRoaXMuY2hlY2tFbnYgPSBmYWxzZTtcbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZW5hYmxlZFN5bmNTdG9yYWdlID1cbiAgICAgICAgISFjaHJvbWUuc3RvcmFnZS5zeW5jICYmXG4gICAgICAgICgoYXdhaXQgdGhpcy50cnlUb0dldFN5bmNTdGF0dXMoKSgpKSB8fFxuICAgICAgICAgIChhd2FpdCB0aGlzLnRyeVRvU2V0U3luY1N0YXR1cygpKCkpKTtcbiAgICAgIHRoaXMuc3RvcmFnZVR5cGUgPSBlbmFibGVkU3luY1N0b3JhZ2UgPyBcInN5bmNcIiA6IFwibG9jYWxcIjtcbiAgICAgIHRoaXMuY2hlY2tFbnYgPSB0cnVlO1xuICAgIH0pKCk7XG5cbiAgICB0aGlzLm9uQ2hhbmdlZCA9IHtcbiAgICAgIGFkZExpc3RlbmVyOiAoLi4uYXJncykgPT4ge1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKC4uLmFyZ3MpO1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUxpc3RlbmVyOiAoLi4uYXJncykgPT4ge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKC4uLmFyZ3MpO1xuICAgICAgfSxcbiAgICAgIGhhc0xpc3RlbmVyOiAoLi4uYXJncykgPT4ge1xuICAgICAgICB0aGlzLmhhc0xpc3RlbmVyKC4uLmFyZ3MpO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgdHJ5VG9HZXRTeW5jU3RhdHVzKCkge1xuICAgIHJldHVybiBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBhd2FpdCBicm93c2VyLnN0b3JhZ2Uuc3luYy5nZXQoXG4gICAgICAgICAgXCJneWF6by1leHRlbnNpb24tc3luYy1zdG9yYWdlLXRlc3RcIlxuICAgICAgICApO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIG5vLW9wXG4gICAgICB9XG4gICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgfTtcbiAgfVxuXG4gIHRyeVRvU2V0U3luY1N0YXR1cygpIHtcbiAgICByZXR1cm4gYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYnJvd3Nlci5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgICAgICBcImd5YXpvLWV4dGVuc2lvbi1zeW5jLXN0b3JhZ2UtdGVzdFwiOiAxLFxuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBuby1vcFxuICAgICAgfVxuICAgICAgcmV0dXJuICEhcmVzdWx0O1xuICAgIH07XG4gIH1cblxuICB3YWl0Rm9yQ2hlY2tFbnYoZikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY29uc3QgdGltZXJJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5jaGVja0VudikgcmV0dXJuO1xuICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aW1lcklkKTtcbiAgICAgICAgcmVzb2x2ZShhd2FpdCBmKCkpO1xuICAgICAgfSwgMTAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBzdG9yYWdlT2JqZWN0KCkge1xuICAgIHJldHVybiBicm93c2VyLnN0b3JhZ2VbdGhpcy5zdG9yYWdlVHlwZV07XG4gIH1cblxuICBnZXQoZGVmYXVsdFZhbHVlLCAuLi5hcmdzKSB7XG4gICAgaWYgKCFkZWZhdWx0VmFsdWUpIGRlZmF1bHRWYWx1ZSA9IGRlZmF1bHRPcHRpb25zO1xuICAgIGlmICghdGhpcy5jaGVja0VudilcbiAgICAgIHJldHVybiB0aGlzLndhaXRGb3JDaGVja0VudigoKSA9PiB0aGlzLmdldChkZWZhdWx0VmFsdWUsIC4uLmFyZ3MpKTtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlT2JqZWN0LmdldChkZWZhdWx0VmFsdWUsIC4uLmFyZ3MpO1xuICB9XG5cbiAgc2V0KC4uLmFyZ3MpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tFbnYpIHJldHVybiB0aGlzLndhaXRGb3JDaGVja0VudigoKSA9PiB0aGlzLnNldCguLi5hcmdzKSk7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZU9iamVjdC5zZXQoLi4uYXJncyk7XG4gIH1cblxuICBnZXRCeXRlc0luVXNlKC4uLmFyZ3MpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tFbnYpXG4gICAgICByZXR1cm4gdGhpcy53YWl0Rm9yQ2hlY2tFbnYoKCkgPT4gdGhpcy5nZXRCeXRlc0luVXNlKC4uLmFyZ3MpKTtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlT2JqZWN0LmdldEJ5dGVzSW5Vc2UoLi4uYXJncyk7XG4gIH1cblxuICByZW1vdmUoLi4uYXJncykge1xuICAgIGlmICghdGhpcy5jaGVja0VudikgcmV0dXJuIHRoaXMud2FpdEZvckNoZWNrRW52KCgpID0+IHRoaXMucmVtb3ZlKC4uLmFyZ3MpKTtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlT2JqZWN0LnJlbW92ZSguLi5hcmdzKTtcbiAgfVxuXG4gIGNsZWFyKC4uLmFyZ3MpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tFbnYpIHJldHVybiB0aGlzLndhaXRGb3JDaGVja0VudigoKSA9PiB0aGlzLmNsZWFyKC4uLmFyZ3MpKTtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlT2JqZWN0LmNsZWFyKC4uLmFyZ3MpO1xuICB9XG5cbiAgYWRkTGlzdGVuZXIoLi4uYXJncykge1xuICAgIGlmICghdGhpcy5jaGVja0VudilcbiAgICAgIHJldHVybiB0aGlzLndhaXRGb3JDaGVja0VudigoKSA9PiB0aGlzLmFkZExpc3RlbmVyKC4uLmFyZ3MpKTtcbiAgICByZXR1cm4gY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKC4uLmFyZ3MpO1xuICB9XG5cbiAgcmVtb3ZlTGlzdGVuZXIoLi4uYXJncykge1xuICAgIGlmICghdGhpcy5jaGVja0VudilcbiAgICAgIHJldHVybiB0aGlzLndhaXRGb3JDaGVja0VudigoKSA9PiB0aGlzLnJlbW92ZUxpc3RlbmVyKC4uLmFyZ3MpKTtcbiAgICByZXR1cm4gY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLnJlbW92ZUxpc3RlbmVyKC4uLmFyZ3MpO1xuICB9XG5cbiAgaGFzTGlzdGVuZXIoLi4uYXJncykge1xuICAgIGlmICghdGhpcy5jaGVja0VudilcbiAgICAgIHJldHVybiB0aGlzLndhaXRGb3JDaGVja0VudigoKSA9PiB0aGlzLmhhc0xpc3RlbmVyKC4uLmFyZ3MpKTtcbiAgICByZXR1cm4gY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLmhhc0xpc3RlbmVyKC4uLmFyZ3MpO1xuICB9XG59O1xuY29uc3Qgc3RvcmFnZSA9IG5ldyBFeHRlbnNpb25TdG9yYWdlV3JhcHBlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBzdG9yYWdlO1xuIiwiLyohXG4gKiBCb3dzZXIgLSBhIGJyb3dzZXIgZGV0ZWN0b3JcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQvYm93c2VyXG4gKiBNSVQgTGljZW5zZSB8IChjKSBEdXN0aW4gRGlheiAyMDE1XG4gKi9cblxuIWZ1bmN0aW9uIChyb290LCBuYW1lLCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKG5hbWUsIGRlZmluaXRpb24pXG4gIGVsc2Ugcm9vdFtuYW1lXSA9IGRlZmluaXRpb24oKVxufSh0aGlzLCAnYm93c2VyJywgZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICAqIFNlZSB1c2VyYWdlbnRzLmpzIGZvciBleGFtcGxlcyBvZiBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgKi9cblxuICB2YXIgdCA9IHRydWVcblxuICBmdW5jdGlvbiBkZXRlY3QodWEpIHtcblxuICAgIGZ1bmN0aW9uIGdldEZpcnN0TWF0Y2gocmVnZXgpIHtcbiAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKHJlZ2V4KTtcbiAgICAgIHJldHVybiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaFsxXSkgfHwgJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2Vjb25kTWF0Y2gocmVnZXgpIHtcbiAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKHJlZ2V4KTtcbiAgICAgIHJldHVybiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaFsyXSkgfHwgJyc7XG4gICAgfVxuXG4gICAgdmFyIGlvc2RldmljZSA9IGdldEZpcnN0TWF0Y2goLyhpcG9kfGlwaG9uZXxpcGFkKS9pKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIGxpa2VBbmRyb2lkID0gL2xpa2UgYW5kcm9pZC9pLnRlc3QodWEpXG4gICAgICAsIGFuZHJvaWQgPSAhbGlrZUFuZHJvaWQgJiYgL2FuZHJvaWQvaS50ZXN0KHVhKVxuICAgICAgLCBuZXh1c01vYmlsZSA9IC9uZXh1c1xccypbMC02XVxccyovaS50ZXN0KHVhKVxuICAgICAgLCBuZXh1c1RhYmxldCA9ICFuZXh1c01vYmlsZSAmJiAvbmV4dXNcXHMqWzAtOV0rL2kudGVzdCh1YSlcbiAgICAgICwgY2hyb21lb3MgPSAvQ3JPUy8udGVzdCh1YSlcbiAgICAgICwgc2lsayA9IC9zaWxrL2kudGVzdCh1YSlcbiAgICAgICwgc2FpbGZpc2ggPSAvc2FpbGZpc2gvaS50ZXN0KHVhKVxuICAgICAgLCB0aXplbiA9IC90aXplbi9pLnRlc3QodWEpXG4gICAgICAsIHdlYm9zID0gLyh3ZWJ8aHB3KShvfDApcy9pLnRlc3QodWEpXG4gICAgICAsIHdpbmRvd3NwaG9uZSA9IC93aW5kb3dzIHBob25lL2kudGVzdCh1YSlcbiAgICAgICwgc2Ftc3VuZ0Jyb3dzZXIgPSAvU2Ftc3VuZ0Jyb3dzZXIvaS50ZXN0KHVhKVxuICAgICAgLCB3aW5kb3dzID0gIXdpbmRvd3NwaG9uZSAmJiAvd2luZG93cy9pLnRlc3QodWEpXG4gICAgICAsIG1hYyA9ICFpb3NkZXZpY2UgJiYgIXNpbGsgJiYgL21hY2ludG9zaC9pLnRlc3QodWEpXG4gICAgICAsIGxpbnV4ID0gIWFuZHJvaWQgJiYgIXNhaWxmaXNoICYmICF0aXplbiAmJiAhd2Vib3MgJiYgL2xpbnV4L2kudGVzdCh1YSlcbiAgICAgICwgZWRnZVZlcnNpb24gPSBnZXRTZWNvbmRNYXRjaCgvZWRnKFtlYV18aW9zKVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgICwgdmVyc2lvbklkZW50aWZpZXIgPSBnZXRGaXJzdE1hdGNoKC92ZXJzaW9uXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgLCB0YWJsZXQgPSAvdGFibGV0L2kudGVzdCh1YSkgJiYgIS90YWJsZXQgcGMvaS50ZXN0KHVhKVxuICAgICAgLCBtb2JpbGUgPSAhdGFibGV0ICYmIC9bXi1dbW9iaS9pLnRlc3QodWEpXG4gICAgICAsIHhib3ggPSAveGJveC9pLnRlc3QodWEpXG4gICAgICAsIHJlc3VsdFxuXG4gICAgaWYgKC9vcGVyYS9pLnRlc3QodWEpKSB7XG4gICAgICAvLyAgYW4gb2xkIE9wZXJhXG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdPcGVyYSdcbiAgICAgICwgb3BlcmE6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXIgfHwgZ2V0Rmlyc3RNYXRjaCgvKD86b3BlcmF8b3ByfG9waW9zKVtcXHNcXC9dKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoL29wclxcL3xvcGlvcy9pLnRlc3QodWEpKSB7XG4gICAgICAvLyBhIG5ldyBPcGVyYVxuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnT3BlcmEnXG4gICAgICAgICwgb3BlcmE6IHRcbiAgICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzpvcHJ8b3Bpb3MpW1xcc1xcL10oXFxkKyhcXC5cXGQrKT8pL2kpIHx8IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9TYW1zdW5nQnJvd3Nlci9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdTYW1zdW5nIEludGVybmV0IGZvciBBbmRyb2lkJ1xuICAgICAgICAsIHNhbXN1bmdCcm93c2VyOiB0XG4gICAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXIgfHwgZ2V0Rmlyc3RNYXRjaCgvKD86U2Ftc3VuZ0Jyb3dzZXIpW1xcc1xcL10oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9XaGFsZS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdOQVZFUiBXaGFsZSBicm93c2VyJ1xuICAgICAgICAsIHdoYWxlOiB0XG4gICAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86d2hhbGUpW1xcc1xcL10oXFxkKyg/OlxcLlxcZCspKykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL01aQnJvd3Nlci9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdNWiBCcm93c2VyJ1xuICAgICAgICAsIG16YnJvd3NlcjogdFxuICAgICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/Ok1aQnJvd3NlcilbXFxzXFwvXShcXGQrKD86XFwuXFxkKykrKS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvY29hc3QvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnT3BlcmEgQ29hc3QnXG4gICAgICAgICwgY29hc3Q6IHRcbiAgICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC8oPzpjb2FzdClbXFxzXFwvXShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL2ZvY3VzL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0ZvY3VzJ1xuICAgICAgICAsIGZvY3VzOiB0XG4gICAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86Zm9jdXMpW1xcc1xcL10oXFxkKyg/OlxcLlxcZCspKykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3lhYnJvd3Nlci9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdZYW5kZXggQnJvd3NlcidcbiAgICAgICwgeWFuZGV4YnJvd3NlcjogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC8oPzp5YWJyb3dzZXIpW1xcc1xcL10oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC91Y2Jyb3dzZXIvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgIG5hbWU6ICdVQyBCcm93c2VyJ1xuICAgICAgICAsIHVjYnJvd3NlcjogdFxuICAgICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OnVjYnJvd3NlcilbXFxzXFwvXShcXGQrKD86XFwuXFxkKykrKS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvbXhpb3MvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnTWF4dGhvbidcbiAgICAgICAgLCBtYXh0aG9uOiB0XG4gICAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86bXhpb3MpW1xcc1xcL10oXFxkKyg/OlxcLlxcZCspKykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL2VwaXBoYW55L2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0VwaXBoYW55J1xuICAgICAgICAsIGVwaXBoYW55OiB0XG4gICAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86ZXBpcGhhbnkpW1xcc1xcL10oXFxkKyg/OlxcLlxcZCspKykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3B1ZmZpbi9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdQdWZmaW4nXG4gICAgICAgICwgcHVmZmluOiB0XG4gICAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86cHVmZmluKVtcXHNcXC9dKFxcZCsoPzpcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zbGVpcG5pci9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdTbGVpcG5pcidcbiAgICAgICAgLCBzbGVpcG5pcjogdFxuICAgICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OnNsZWlwbmlyKVtcXHNcXC9dKFxcZCsoPzpcXC5cXGQrKSspL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9rLW1lbGVvbi9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdLLU1lbGVvbidcbiAgICAgICAgLCBrTWVsZW9uOiB0XG4gICAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86ay1tZWxlb24pW1xcc1xcL10oXFxkKyg/OlxcLlxcZCspKykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAod2luZG93c3Bob25lKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdXaW5kb3dzIFBob25lJ1xuICAgICAgLCBvc25hbWU6ICdXaW5kb3dzIFBob25lJ1xuICAgICAgLCB3aW5kb3dzcGhvbmU6IHRcbiAgICAgIH1cbiAgICAgIGlmIChlZGdlVmVyc2lvbikge1xuICAgICAgICByZXN1bHQubXNlZGdlID0gdFxuICAgICAgICByZXN1bHQudmVyc2lvbiA9IGVkZ2VWZXJzaW9uXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0Lm1zaWUgPSB0XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvaWVtb2JpbGVcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9tc2llfHRyaWRlbnQvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnSW50ZXJuZXQgRXhwbG9yZXInXG4gICAgICAsIG1zaWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86bXNpZSB8cnY6KShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNocm9tZW9zKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdDaHJvbWUnXG4gICAgICAsIG9zbmFtZTogJ0Nocm9tZSBPUydcbiAgICAgICwgY2hyb21lb3M6IHRcbiAgICAgICwgY2hyb21lQm9vazogdFxuICAgICAgLCBjaHJvbWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86Y2hyb21lfGNyaW9zfGNybW8pXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoL2VkZyhbZWFdfGlvcykvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnTWljcm9zb2Z0IEVkZ2UnXG4gICAgICAsIG1zZWRnZTogdFxuICAgICAgLCB2ZXJzaW9uOiBlZGdlVmVyc2lvblxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvdml2YWxkaS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdWaXZhbGRpJ1xuICAgICAgICAsIHZpdmFsZGk6IHRcbiAgICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC92aXZhbGRpXFwvKFxcZCsoXFwuXFxkKyk/KS9pKSB8fCB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChzYWlsZmlzaCkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2FpbGZpc2gnXG4gICAgICAsIG9zbmFtZTogJ1NhaWxmaXNoIE9TJ1xuICAgICAgLCBzYWlsZmlzaDogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9zYWlsZmlzaFxccz9icm93c2VyXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvc2VhbW9ua2V5XFwvL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1NlYU1vbmtleSdcbiAgICAgICwgc2VhbW9ua2V5OiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL3NlYW1vbmtleVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL2ZpcmVmb3h8aWNld2Vhc2VsfGZ4aW9zL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0ZpcmVmb3gnXG4gICAgICAsIGZpcmVmb3g6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86ZmlyZWZveHxpY2V3ZWFzZWx8Znhpb3MpWyBcXC9dKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgICAgaWYgKC9cXCgobW9iaWxlfHRhYmxldCk7W15cXCldKnJ2OltcXGRcXC5dK1xcKS9pLnRlc3QodWEpKSB7XG4gICAgICAgIHJlc3VsdC5maXJlZm94b3MgPSB0XG4gICAgICAgIHJlc3VsdC5vc25hbWUgPSAnRmlyZWZveCBPUydcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoc2lsaykge1xuICAgICAgcmVzdWx0ID0gIHtcbiAgICAgICAgbmFtZTogJ0FtYXpvbiBTaWxrJ1xuICAgICAgLCBzaWxrOiB0XG4gICAgICAsIHZlcnNpb24gOiBnZXRGaXJzdE1hdGNoKC9zaWxrXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvcGhhbnRvbS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdQaGFudG9tSlMnXG4gICAgICAsIHBoYW50b206IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvcGhhbnRvbWpzXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvc2xpbWVyanMvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2xpbWVySlMnXG4gICAgICAgICwgc2xpbWVyOiB0XG4gICAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvc2xpbWVyanNcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9ibGFja2JlcnJ5fFxcYmJiXFxkKy9pLnRlc3QodWEpIHx8IC9yaW1cXHN0YWJsZXQvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQmxhY2tCZXJyeSdcbiAgICAgICwgb3NuYW1lOiAnQmxhY2tCZXJyeSBPUydcbiAgICAgICwgYmxhY2tiZXJyeTogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC9ibGFja2JlcnJ5W1xcZF0rXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh3ZWJvcykge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnV2ViT1MnXG4gICAgICAsIG9zbmFtZTogJ1dlYk9TJ1xuICAgICAgLCB3ZWJvczogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC93KD86ZWIpP29zYnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH07XG4gICAgICAvdG91Y2hwYWRcXC8vaS50ZXN0KHVhKSAmJiAocmVzdWx0LnRvdWNocGFkID0gdClcbiAgICB9XG4gICAgZWxzZSBpZiAoL2JhZGEvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQmFkYSdcbiAgICAgICwgb3NuYW1lOiAnQmFkYSdcbiAgICAgICwgYmFkYTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9kb2xmaW5cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmICh0aXplbikge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnVGl6ZW4nXG4gICAgICAsIG9zbmFtZTogJ1RpemVuJ1xuICAgICAgLCB0aXplbjogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzp0aXplblxccz8pP2Jyb3dzZXJcXC8oXFxkKyhcXC5cXGQrKT8pL2kpIHx8IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmICgvcXVwemlsbGEvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnUXVwWmlsbGEnXG4gICAgICAgICwgcXVwemlsbGE6IHRcbiAgICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzpxdXB6aWxsYSlbXFxzXFwvXShcXGQrKD86XFwuXFxkKykrKS9pKSB8fCB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvY2hyb21pdW0vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQ2hyb21pdW0nXG4gICAgICAgICwgY2hyb21pdW06IHRcbiAgICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzpjaHJvbWl1bSlbXFxzXFwvXShcXGQrKD86XFwuXFxkKyk/KS9pKSB8fCB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvY2hyb21lfGNyaW9zfGNybW8vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQ2hyb21lJ1xuICAgICAgICAsIGNocm9tZTogdFxuICAgICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OmNocm9tZXxjcmlvc3xjcm1vKVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoYW5kcm9pZCkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQW5kcm9pZCdcbiAgICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvc2FmYXJpfGFwcGxld2Via2l0L2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1NhZmFyaSdcbiAgICAgICwgc2FmYXJpOiB0XG4gICAgICB9XG4gICAgICBpZiAodmVyc2lvbklkZW50aWZpZXIpIHtcbiAgICAgICAgcmVzdWx0LnZlcnNpb24gPSB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpb3NkZXZpY2UpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZSA6IGlvc2RldmljZSA9PSAnaXBob25lJyA/ICdpUGhvbmUnIDogaW9zZGV2aWNlID09ICdpcGFkJyA/ICdpUGFkJyA6ICdpUG9kJ1xuICAgICAgfVxuICAgICAgLy8gV1RGOiB2ZXJzaW9uIGlzIG5vdCBwYXJ0IG9mIHVzZXIgYWdlbnQgaW4gd2ViIGFwcHNcbiAgICAgIGlmICh2ZXJzaW9uSWRlbnRpZmllcikge1xuICAgICAgICByZXN1bHQudmVyc2lvbiA9IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoL2dvb2dsZWJvdC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdHb29nbGVib3QnXG4gICAgICAsIGdvb2dsZWJvdDogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9nb29nbGVib3RcXC8oXFxkKyhcXC5cXGQrKSkvaSkgfHwgdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6IGdldEZpcnN0TWF0Y2goL14oLiopXFwvKC4qKSAvKSxcbiAgICAgICAgdmVyc2lvbjogZ2V0U2Vjb25kTWF0Y2goL14oLiopXFwvKC4qKSAvKVxuICAgICB9O1xuICAgfVxuXG4gICAgLy8gc2V0IHdlYmtpdCBvciBnZWNrbyBmbGFnIGZvciBicm93c2VycyBiYXNlZCBvbiB0aGVzZSBlbmdpbmVzXG4gICAgaWYgKCFyZXN1bHQubXNlZGdlICYmIC8oYXBwbGUpP3dlYmtpdC9pLnRlc3QodWEpKSB7XG4gICAgICBpZiAoLyhhcHBsZSk/d2Via2l0XFwvNTM3XFwuMzYvaS50ZXN0KHVhKSkge1xuICAgICAgICByZXN1bHQubmFtZSA9IHJlc3VsdC5uYW1lIHx8IFwiQmxpbmtcIlxuICAgICAgICByZXN1bHQuYmxpbmsgPSB0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQubmFtZSA9IHJlc3VsdC5uYW1lIHx8IFwiV2Via2l0XCJcbiAgICAgICAgcmVzdWx0LndlYmtpdCA9IHRcbiAgICAgIH1cbiAgICAgIGlmICghcmVzdWx0LnZlcnNpb24gJiYgdmVyc2lvbklkZW50aWZpZXIpIHtcbiAgICAgICAgcmVzdWx0LnZlcnNpb24gPSB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXJlc3VsdC5vcGVyYSAmJiAvZ2Vja29cXC8vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0Lm5hbWUgPSByZXN1bHQubmFtZSB8fCBcIkdlY2tvXCJcbiAgICAgIHJlc3VsdC5nZWNrbyA9IHRcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gcmVzdWx0LnZlcnNpb24gfHwgZ2V0Rmlyc3RNYXRjaCgvZ2Vja29cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgfVxuXG4gICAgLy8gc2V0IE9TIGZsYWdzIGZvciBwbGF0Zm9ybXMgdGhhdCBoYXZlIG11bHRpcGxlIGJyb3dzZXJzXG4gICAgaWYgKCFyZXN1bHQud2luZG93c3Bob25lICYmIChhbmRyb2lkIHx8IHJlc3VsdC5zaWxrKSkge1xuICAgICAgcmVzdWx0LmFuZHJvaWQgPSB0XG4gICAgICByZXN1bHQub3NuYW1lID0gJ0FuZHJvaWQnXG4gICAgfSBlbHNlIGlmICghcmVzdWx0LndpbmRvd3NwaG9uZSAmJiBpb3NkZXZpY2UpIHtcbiAgICAgIHJlc3VsdFtpb3NkZXZpY2VdID0gdFxuICAgICAgcmVzdWx0LmlvcyA9IHRcbiAgICAgIHJlc3VsdC5vc25hbWUgPSAnaU9TJ1xuICAgIH0gZWxzZSBpZiAobWFjKSB7XG4gICAgICByZXN1bHQubWFjID0gdFxuICAgICAgcmVzdWx0Lm9zbmFtZSA9ICdtYWNPUydcbiAgICB9IGVsc2UgaWYgKHhib3gpIHtcbiAgICAgIHJlc3VsdC54Ym94ID0gdFxuICAgICAgcmVzdWx0Lm9zbmFtZSA9ICdYYm94J1xuICAgIH0gZWxzZSBpZiAod2luZG93cykge1xuICAgICAgcmVzdWx0LndpbmRvd3MgPSB0XG4gICAgICByZXN1bHQub3NuYW1lID0gJ1dpbmRvd3MnXG4gICAgfSBlbHNlIGlmIChsaW51eCkge1xuICAgICAgcmVzdWx0LmxpbnV4ID0gdFxuICAgICAgcmVzdWx0Lm9zbmFtZSA9ICdMaW51eCdcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXaW5kb3dzVmVyc2lvbiAocykge1xuICAgICAgc3dpdGNoIChzKSB7XG4gICAgICAgIGNhc2UgJ05UJzogcmV0dXJuICdOVCdcbiAgICAgICAgY2FzZSAnWFAnOiByZXR1cm4gJ1hQJ1xuICAgICAgICBjYXNlICdOVCA1LjAnOiByZXR1cm4gJzIwMDAnXG4gICAgICAgIGNhc2UgJ05UIDUuMSc6IHJldHVybiAnWFAnXG4gICAgICAgIGNhc2UgJ05UIDUuMic6IHJldHVybiAnMjAwMydcbiAgICAgICAgY2FzZSAnTlQgNi4wJzogcmV0dXJuICdWaXN0YSdcbiAgICAgICAgY2FzZSAnTlQgNi4xJzogcmV0dXJuICc3J1xuICAgICAgICBjYXNlICdOVCA2LjInOiByZXR1cm4gJzgnXG4gICAgICAgIGNhc2UgJ05UIDYuMyc6IHJldHVybiAnOC4xJ1xuICAgICAgICBjYXNlICdOVCAxMC4wJzogcmV0dXJuICcxMCdcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE9TIHZlcnNpb24gZXh0cmFjdGlvblxuICAgIHZhciBvc1ZlcnNpb24gPSAnJztcbiAgICBpZiAocmVzdWx0LndpbmRvd3MpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldFdpbmRvd3NWZXJzaW9uKGdldEZpcnN0TWF0Y2goL1dpbmRvd3MgKChOVHxYUCkoIFxcZFxcZD8uXFxkKT8pL2kpKVxuICAgIH0gZWxzZSBpZiAocmVzdWx0LndpbmRvd3NwaG9uZSkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvd2luZG93cyBwaG9uZSAoPzpvcyk/XFxzPyhcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQubWFjKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9NYWMgT1MgWCAoXFxkKyhbX1xcLlxcc11cXGQrKSopL2kpO1xuICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uLnJlcGxhY2UoL1tfXFxzXS9nLCAnLicpO1xuICAgIH0gZWxzZSBpZiAoaW9zZGV2aWNlKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9vcyAoXFxkKyhbX1xcc11cXGQrKSopIGxpa2UgbWFjIG9zIHgvaSk7XG4gICAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24ucmVwbGFjZSgvW19cXHNdL2csICcuJyk7XG4gICAgfSBlbHNlIGlmIChhbmRyb2lkKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9hbmRyb2lkWyBcXC8tXShcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQud2Vib3MpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goLyg/OndlYnxocHcpb3NcXC8oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LmJsYWNrYmVycnkpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goL3JpbVxcc3RhYmxldFxcc29zXFxzKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5iYWRhKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9iYWRhXFwvKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC50aXplbikge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvdGl6ZW5bXFwvXFxzXShcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfVxuICAgIGlmIChvc1ZlcnNpb24pIHtcbiAgICAgIHJlc3VsdC5vc3ZlcnNpb24gPSBvc1ZlcnNpb247XG4gICAgfVxuXG4gICAgLy8gZGV2aWNlIHR5cGUgZXh0cmFjdGlvblxuICAgIHZhciBvc01ham9yVmVyc2lvbiA9ICFyZXN1bHQud2luZG93cyAmJiBvc1ZlcnNpb24uc3BsaXQoJy4nKVswXTtcbiAgICBpZiAoXG4gICAgICAgICB0YWJsZXRcbiAgICAgIHx8IG5leHVzVGFibGV0XG4gICAgICB8fCBpb3NkZXZpY2UgPT0gJ2lwYWQnXG4gICAgICB8fCAoYW5kcm9pZCAmJiAob3NNYWpvclZlcnNpb24gPT0gMyB8fCAob3NNYWpvclZlcnNpb24gPj0gNCAmJiAhbW9iaWxlKSkpXG4gICAgICB8fCByZXN1bHQuc2lsa1xuICAgICkge1xuICAgICAgcmVzdWx0LnRhYmxldCA9IHRcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgbW9iaWxlXG4gICAgICB8fCBpb3NkZXZpY2UgPT0gJ2lwaG9uZSdcbiAgICAgIHx8IGlvc2RldmljZSA9PSAnaXBvZCdcbiAgICAgIHx8IGFuZHJvaWRcbiAgICAgIHx8IG5leHVzTW9iaWxlXG4gICAgICB8fCByZXN1bHQuYmxhY2tiZXJyeVxuICAgICAgfHwgcmVzdWx0LndlYm9zXG4gICAgICB8fCByZXN1bHQuYmFkYVxuICAgICkge1xuICAgICAgcmVzdWx0Lm1vYmlsZSA9IHRcbiAgICB9XG5cbiAgICAvLyBHcmFkZWQgQnJvd3NlciBTdXBwb3J0XG4gICAgLy8gaHR0cDovL2RldmVsb3Blci55YWhvby5jb20veXVpL2FydGljbGVzL2dic1xuICAgIGlmIChyZXN1bHQubXNlZGdlIHx8XG4gICAgICAgIChyZXN1bHQubXNpZSAmJiByZXN1bHQudmVyc2lvbiA+PSAxMCkgfHxcbiAgICAgICAgKHJlc3VsdC55YW5kZXhicm93c2VyICYmIHJlc3VsdC52ZXJzaW9uID49IDE1KSB8fFxuXHRcdCAgICAocmVzdWx0LnZpdmFsZGkgJiYgcmVzdWx0LnZlcnNpb24gPj0gMS4wKSB8fFxuICAgICAgICAocmVzdWx0LmNocm9tZSAmJiByZXN1bHQudmVyc2lvbiA+PSAyMCkgfHxcbiAgICAgICAgKHJlc3VsdC5zYW1zdW5nQnJvd3NlciAmJiByZXN1bHQudmVyc2lvbiA+PSA0KSB8fFxuICAgICAgICAocmVzdWx0LndoYWxlICYmIGNvbXBhcmVWZXJzaW9ucyhbcmVzdWx0LnZlcnNpb24sICcxLjAnXSkgPT09IDEpIHx8XG4gICAgICAgIChyZXN1bHQubXpicm93c2VyICYmIGNvbXBhcmVWZXJzaW9ucyhbcmVzdWx0LnZlcnNpb24sICc2LjAnXSkgPT09IDEpIHx8XG4gICAgICAgIChyZXN1bHQuZm9jdXMgJiYgY29tcGFyZVZlcnNpb25zKFtyZXN1bHQudmVyc2lvbiwgJzEuMCddKSA9PT0gMSkgfHxcbiAgICAgICAgKHJlc3VsdC5maXJlZm94ICYmIHJlc3VsdC52ZXJzaW9uID49IDIwLjApIHx8XG4gICAgICAgIChyZXN1bHQuc2FmYXJpICYmIHJlc3VsdC52ZXJzaW9uID49IDYpIHx8XG4gICAgICAgIChyZXN1bHQub3BlcmEgJiYgcmVzdWx0LnZlcnNpb24gPj0gMTAuMCkgfHxcbiAgICAgICAgKHJlc3VsdC5pb3MgJiYgcmVzdWx0Lm9zdmVyc2lvbiAmJiByZXN1bHQub3N2ZXJzaW9uLnNwbGl0KFwiLlwiKVswXSA+PSA2KSB8fFxuICAgICAgICAocmVzdWx0LmJsYWNrYmVycnkgJiYgcmVzdWx0LnZlcnNpb24gPj0gMTAuMSlcbiAgICAgICAgfHwgKHJlc3VsdC5jaHJvbWl1bSAmJiByZXN1bHQudmVyc2lvbiA+PSAyMClcbiAgICAgICAgKSB7XG4gICAgICByZXN1bHQuYSA9IHQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKChyZXN1bHQubXNpZSAmJiByZXN1bHQudmVyc2lvbiA8IDEwKSB8fFxuICAgICAgICAocmVzdWx0LmNocm9tZSAmJiByZXN1bHQudmVyc2lvbiA8IDIwKSB8fFxuICAgICAgICAocmVzdWx0LmZpcmVmb3ggJiYgcmVzdWx0LnZlcnNpb24gPCAyMC4wKSB8fFxuICAgICAgICAocmVzdWx0LnNhZmFyaSAmJiByZXN1bHQudmVyc2lvbiA8IDYpIHx8XG4gICAgICAgIChyZXN1bHQub3BlcmEgJiYgcmVzdWx0LnZlcnNpb24gPCAxMC4wKSB8fFxuICAgICAgICAocmVzdWx0LmlvcyAmJiByZXN1bHQub3N2ZXJzaW9uICYmIHJlc3VsdC5vc3ZlcnNpb24uc3BsaXQoXCIuXCIpWzBdIDwgNilcbiAgICAgICAgfHwgKHJlc3VsdC5jaHJvbWl1bSAmJiByZXN1bHQudmVyc2lvbiA8IDIwKVxuICAgICAgICApIHtcbiAgICAgIHJlc3VsdC5jID0gdFxuICAgIH0gZWxzZSByZXN1bHQueCA9IHRcblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHZhciBib3dzZXIgPSBkZXRlY3QodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgPyBuYXZpZ2F0b3IudXNlckFnZW50IHx8ICcnIDogJycpXG5cbiAgYm93c2VyLnRlc3QgPSBmdW5jdGlvbiAoYnJvd3Nlckxpc3QpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJyb3dzZXJMaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgYnJvd3Nlckl0ZW0gPSBicm93c2VyTGlzdFtpXTtcbiAgICAgIGlmICh0eXBlb2YgYnJvd3Nlckl0ZW09PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKGJyb3dzZXJJdGVtIGluIGJvd3Nlcikge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdmVyc2lvbiBwcmVjaXNpb25zIGNvdW50XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqICAgZ2V0VmVyc2lvblByZWNpc2lvbihcIjEuMTAuM1wiKSAvLyAzXG4gICAqXG4gICAqIEBwYXJhbSAge3N0cmluZ30gdmVyc2lvblxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBnZXRWZXJzaW9uUHJlY2lzaW9uKHZlcnNpb24pIHtcbiAgICByZXR1cm4gdmVyc2lvbi5zcGxpdChcIi5cIikubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIEFycmF5OjptYXAgcG9seWZpbGxcbiAgICpcbiAgICogQHBhcmFtICB7QXJyYXl9IGFyclxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaXRlcmF0b3JcbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuICBmdW5jdGlvbiBtYXAoYXJyLCBpdGVyYXRvcikge1xuICAgIHZhciByZXN1bHQgPSBbXSwgaTtcbiAgICBpZiAoQXJyYXkucHJvdG90eXBlLm1hcCkge1xuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChhcnIsIGl0ZXJhdG9yKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0LnB1c2goaXRlcmF0b3IoYXJyW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIGJyb3dzZXIgdmVyc2lvbiB3ZWlnaHRcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogICBjb21wYXJlVmVyc2lvbnMoWycxLjEwLjIuMScsICAnMS44LjIuMS45MCddKSAgICAvLyAxXG4gICAqICAgY29tcGFyZVZlcnNpb25zKFsnMS4wMTAuMi4xJywgJzEuMDkuMi4xLjkwJ10pOyAgLy8gMVxuICAgKiAgIGNvbXBhcmVWZXJzaW9ucyhbJzEuMTAuMi4xJywgICcxLjEwLjIuMSddKTsgICAgIC8vIDBcbiAgICogICBjb21wYXJlVmVyc2lvbnMoWycxLjEwLjIuMScsICAnMS4wODAwLjInXSk7ICAgICAvLyAtMVxuICAgKlxuICAgKiBAcGFyYW0gIHtBcnJheTxTdHJpbmc+fSB2ZXJzaW9ucyB2ZXJzaW9ucyB0byBjb21wYXJlXG4gICAqIEByZXR1cm4ge051bWJlcn0gY29tcGFyaXNvbiByZXN1bHRcbiAgICovXG4gIGZ1bmN0aW9uIGNvbXBhcmVWZXJzaW9ucyh2ZXJzaW9ucykge1xuICAgIC8vIDEpIGdldCBjb21tb24gcHJlY2lzaW9uIGZvciBib3RoIHZlcnNpb25zLCBmb3IgZXhhbXBsZSBmb3IgXCIxMC4wXCIgYW5kIFwiOVwiIGl0IHNob3VsZCBiZSAyXG4gICAgdmFyIHByZWNpc2lvbiA9IE1hdGgubWF4KGdldFZlcnNpb25QcmVjaXNpb24odmVyc2lvbnNbMF0pLCBnZXRWZXJzaW9uUHJlY2lzaW9uKHZlcnNpb25zWzFdKSk7XG4gICAgdmFyIGNodW5rcyA9IG1hcCh2ZXJzaW9ucywgZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgICAgIHZhciBkZWx0YSA9IHByZWNpc2lvbiAtIGdldFZlcnNpb25QcmVjaXNpb24odmVyc2lvbik7XG5cbiAgICAgIC8vIDIpIFwiOVwiIC0+IFwiOS4wXCIgKGZvciBwcmVjaXNpb24gPSAyKVxuICAgICAgdmVyc2lvbiA9IHZlcnNpb24gKyBuZXcgQXJyYXkoZGVsdGEgKyAxKS5qb2luKFwiLjBcIik7XG5cbiAgICAgIC8vIDMpIFwiOS4wXCIgLT4gW1wiMDAwMDAwMDAwXCJcIiwgXCIwMDAwMDAwMDlcIl1cbiAgICAgIHJldHVybiBtYXAodmVyc2lvbi5zcGxpdChcIi5cIiksIGZ1bmN0aW9uIChjaHVuaykge1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5KDIwIC0gY2h1bmsubGVuZ3RoKS5qb2luKFwiMFwiKSArIGNodW5rO1xuICAgICAgfSkucmV2ZXJzZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gaXRlcmF0ZSBpbiByZXZlcnNlIG9yZGVyIGJ5IHJldmVyc2VkIGNodW5rcyBhcnJheVxuICAgIHdoaWxlICgtLXByZWNpc2lvbiA+PSAwKSB7XG4gICAgICAvLyA0KSBjb21wYXJlOiBcIjAwMDAwMDAwOVwiID4gXCIwMDAwMDAwMTBcIiA9IGZhbHNlIChidXQgXCI5XCIgPiBcIjEwXCIgPSB0cnVlKVxuICAgICAgaWYgKGNodW5rc1swXVtwcmVjaXNpb25dID4gY2h1bmtzWzFdW3ByZWNpc2lvbl0pIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjaHVua3NbMF1bcHJlY2lzaW9uXSA9PT0gY2h1bmtzWzFdW3ByZWNpc2lvbl0pIHtcbiAgICAgICAgaWYgKHByZWNpc2lvbiA9PT0gMCkge1xuICAgICAgICAgIC8vIGFsbCB2ZXJzaW9uIGNodW5rcyBhcmUgc2FtZVxuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBicm93c2VyIGlzIHVuc3VwcG9ydGVkXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqICAgYm93c2VyLmlzVW5zdXBwb3J0ZWRCcm93c2VyKHtcbiAgICogICAgIG1zaWU6IFwiMTBcIixcbiAgICogICAgIGZpcmVmb3g6IFwiMjNcIixcbiAgICogICAgIGNocm9tZTogXCIyOVwiLFxuICAgKiAgICAgc2FmYXJpOiBcIjUuMVwiLFxuICAgKiAgICAgb3BlcmE6IFwiMTZcIixcbiAgICogICAgIHBoYW50b206IFwiNTM0XCJcbiAgICogICB9KTtcbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgbWluVmVyc2lvbnMgbWFwIG9mIG1pbmltYWwgdmVyc2lvbiB0byBicm93c2VyXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IFtzdHJpY3RNb2RlID0gZmFsc2VdIGZsYWcgdG8gcmV0dXJuIGZhbHNlIGlmIGJyb3dzZXIgd2Fzbid0IGZvdW5kIGluIG1hcFxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBbdWFdIHVzZXIgYWdlbnQgc3RyaW5nXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBmdW5jdGlvbiBpc1Vuc3VwcG9ydGVkQnJvd3NlcihtaW5WZXJzaW9ucywgc3RyaWN0TW9kZSwgdWEpIHtcbiAgICB2YXIgX2Jvd3NlciA9IGJvd3NlcjtcblxuICAgIC8vIG1ha2Ugc3RyaWN0TW9kZSBwYXJhbSBvcHRpb25hbCB3aXRoIHVhIHBhcmFtIHVzYWdlXG4gICAgaWYgKHR5cGVvZiBzdHJpY3RNb2RlID09PSAnc3RyaW5nJykge1xuICAgICAgdWEgPSBzdHJpY3RNb2RlO1xuICAgICAgc3RyaWN0TW9kZSA9IHZvaWQoMCk7XG4gICAgfVxuXG4gICAgaWYgKHN0cmljdE1vZGUgPT09IHZvaWQoMCkpIHtcbiAgICAgIHN0cmljdE1vZGUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHVhKSB7XG4gICAgICBfYm93c2VyID0gZGV0ZWN0KHVhKTtcbiAgICB9XG5cbiAgICB2YXIgdmVyc2lvbiA9IFwiXCIgKyBfYm93c2VyLnZlcnNpb247XG4gICAgZm9yICh2YXIgYnJvd3NlciBpbiBtaW5WZXJzaW9ucykge1xuICAgICAgaWYgKG1pblZlcnNpb25zLmhhc093blByb3BlcnR5KGJyb3dzZXIpKSB7XG4gICAgICAgIGlmIChfYm93c2VyW2Jyb3dzZXJdKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBtaW5WZXJzaW9uc1ticm93c2VyXSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQnJvd3NlciB2ZXJzaW9uIGluIHRoZSBtaW5WZXJzaW9uIG1hcCBzaG91bGQgYmUgYSBzdHJpbmc6ICcgKyBicm93c2VyICsgJzogJyArIFN0cmluZyhtaW5WZXJzaW9ucykpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGJyb3dzZXIgdmVyc2lvbiBhbmQgbWluIHN1cHBvcnRlZCB2ZXJzaW9uLlxuICAgICAgICAgIHJldHVybiBjb21wYXJlVmVyc2lvbnMoW3ZlcnNpb24sIG1pblZlcnNpb25zW2Jyb3dzZXJdXSkgPCAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmljdE1vZGU7IC8vIG5vdCBmb3VuZFxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGJyb3dzZXIgaXMgc3VwcG9ydGVkXG4gICAqXG4gICAqIEBwYXJhbSAge09iamVjdH0gbWluVmVyc2lvbnMgbWFwIG9mIG1pbmltYWwgdmVyc2lvbiB0byBicm93c2VyXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IFtzdHJpY3RNb2RlID0gZmFsc2VdIGZsYWcgdG8gcmV0dXJuIGZhbHNlIGlmIGJyb3dzZXIgd2Fzbid0IGZvdW5kIGluIG1hcFxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBbdWFdIHVzZXIgYWdlbnQgc3RyaW5nXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBmdW5jdGlvbiBjaGVjayhtaW5WZXJzaW9ucywgc3RyaWN0TW9kZSwgdWEpIHtcbiAgICByZXR1cm4gIWlzVW5zdXBwb3J0ZWRCcm93c2VyKG1pblZlcnNpb25zLCBzdHJpY3RNb2RlLCB1YSk7XG4gIH1cblxuICBib3dzZXIuaXNVbnN1cHBvcnRlZEJyb3dzZXIgPSBpc1Vuc3VwcG9ydGVkQnJvd3NlcjtcbiAgYm93c2VyLmNvbXBhcmVWZXJzaW9ucyA9IGNvbXBhcmVWZXJzaW9ucztcbiAgYm93c2VyLmNoZWNrID0gY2hlY2s7XG5cbiAgLypcbiAgICogU2V0IG91ciBkZXRlY3QgbWV0aG9kIHRvIHRoZSBtYWluIGJvd3NlciBvYmplY3Qgc28gd2UgY2FuXG4gICAqIHJldXNlIGl0IHRvIHRlc3Qgb3RoZXIgdXNlciBhZ2VudHMuXG4gICAqIFRoaXMgaXMgbmVlZGVkIHRvIGltcGxlbWVudCBmdXR1cmUgdGVzdHMuXG4gICAqL1xuICBib3dzZXIuX2RldGVjdCA9IGRldGVjdDtcblxuICAvKlxuICAgKiBTZXQgb3VyIGRldGVjdCBwdWJsaWMgbWV0aG9kIHRvIHRoZSBtYWluIGJvd3NlciBvYmplY3RcbiAgICogVGhpcyBpcyBuZWVkZWQgdG8gaW1wbGVtZW50IGJvd3NlciBpbiBzZXJ2ZXIgc2lkZVxuICAgKi9cbiAgYm93c2VyLmRldGVjdCA9IGRldGVjdDtcbiAgcmV0dXJuIGJvd3NlclxufSk7XG4iLCJ2YXIgRE9DVU1FTlRfTk9ERV9UWVBFID0gOTtcblxuLyoqXG4gKiBBIHBvbHlmaWxsIGZvciBFbGVtZW50Lm1hdGNoZXMoKVxuICovXG5pZiAodHlwZW9mIEVsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmICFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XG4gICAgdmFyIHByb3RvID0gRWxlbWVudC5wcm90b3R5cGU7XG5cbiAgICBwcm90by5tYXRjaGVzID0gcHJvdG8ubWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgICAgICAgICBwcm90by5tc01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgICAgICAgICBwcm90by5vTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3Rvcjtcbn1cblxuLyoqXG4gKiBGaW5kcyB0aGUgY2xvc2VzdCBwYXJlbnQgdGhhdCBtYXRjaGVzIGEgc2VsZWN0b3IuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBjbG9zZXN0IChlbGVtZW50LCBzZWxlY3Rvcikge1xuICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQubm9kZVR5cGUgIT09IERPQ1VNRU5UX05PREVfVFlQRSkge1xuICAgICAgICBpZiAodHlwZW9mIGVsZW1lbnQubWF0Y2hlcyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICAgICAgZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb3Nlc3Q7XG4iLCJ2YXIgY2xvc2VzdCA9IHJlcXVpcmUoJy4vY2xvc2VzdCcpO1xuXG4vKipcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZVxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBfZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XG4gICAgdmFyIGxpc3RlbmVyRm4gPSBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogRGVsZWdhdGVzIGV2ZW50IHRvIGEgc2VsZWN0b3IuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fFN0cmluZ3xBcnJheX0gW2VsZW1lbnRzXVxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZVxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBkZWxlZ2F0ZShlbGVtZW50cywgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XG4gICAgLy8gSGFuZGxlIHRoZSByZWd1bGFyIEVsZW1lbnQgdXNhZ2VcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBFbGVtZW50LWxlc3MgdXNhZ2UsIGl0IGRlZmF1bHRzIHRvIGdsb2JhbCBkZWxlZ2F0aW9uXG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIFVzZSBgZG9jdW1lbnRgIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIHRoZW4gYXBwbHkgYXJndW1lbnRzXG4gICAgICAgIC8vIFRoaXMgaXMgYSBzaG9ydCB3YXkgdG8gLnVuc2hpZnQgYGFyZ3VtZW50c2Agd2l0aG91dCBydW5uaW5nIGludG8gZGVvcHRpbWl6YXRpb25zXG4gICAgICAgIHJldHVybiBfZGVsZWdhdGUuYmluZChudWxsLCBkb2N1bWVudCkuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgU2VsZWN0b3ItYmFzZWQgdXNhZ2VcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzID09PSAnc3RyaW5nJykge1xuICAgICAgICBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBBcnJheS1saWtlIGJhc2VkIHVzYWdlXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChlbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIEZpbmRzIGNsb3Nlc3QgbWF0Y2ggYW5kIGludm9rZXMgY2FsbGJhY2suXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGxpc3RlbmVyKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuZGVsZWdhdGVUYXJnZXQgPSBjbG9zZXN0KGUudGFyZ2V0LCBzZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKGUuZGVsZWdhdGVUYXJnZXQpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZWxlbWVudCwgZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVsZWdhdGU7XG4iLCJ2YXIgcHJlZml4ID0gcmVxdWlyZSgncHJlZml4LXN0eWxlJylcbnZhciB0b0NhbWVsQ2FzZSA9IHJlcXVpcmUoJ3RvLWNhbWVsLWNhc2UnKVxudmFyIGNhY2hlID0geyAnZmxvYXQnOiAnY3NzRmxvYXQnIH1cbnZhciBhZGRQeFRvU3R5bGUgPSByZXF1aXJlKCdhZGQtcHgtdG8tc3R5bGUnKVxuXG5mdW5jdGlvbiBzdHlsZSAoZWxlbWVudCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHZhciBjYW1lbCA9IGNhY2hlW3Byb3BlcnR5XVxuICBpZiAodHlwZW9mIGNhbWVsID09PSAndW5kZWZpbmVkJykge1xuICAgIGNhbWVsID0gZGV0ZWN0KHByb3BlcnR5KVxuICB9XG5cbiAgLy8gbWF5IGJlIGZhbHNlIGlmIENTUyBwcm9wIGlzIHVuc3VwcG9ydGVkXG4gIGlmIChjYW1lbCkge1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5zdHlsZVtjYW1lbF1cbiAgICB9XG5cbiAgICBlbGVtZW50LnN0eWxlW2NhbWVsXSA9IGFkZFB4VG9TdHlsZShjYW1lbCwgdmFsdWUpXG4gIH1cbn1cblxuZnVuY3Rpb24gZWFjaCAoZWxlbWVudCwgcHJvcGVydGllcykge1xuICBmb3IgKHZhciBrIGluIHByb3BlcnRpZXMpIHtcbiAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgc3R5bGUoZWxlbWVudCwgaywgcHJvcGVydGllc1trXSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGV0ZWN0IChjc3NQcm9wKSB7XG4gIHZhciBjYW1lbCA9IHRvQ2FtZWxDYXNlKGNzc1Byb3ApXG4gIHZhciByZXN1bHQgPSBwcmVmaXgoY2FtZWwpXG4gIGNhY2hlW2NhbWVsXSA9IGNhY2hlW2Nzc1Byb3BdID0gY2FjaGVbcmVzdWx0XSA9IHJlc3VsdFxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIHNldCAoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICBhcmd1bWVudHNbMF0uc3R5bGUuY3NzVGV4dCA9IGFyZ3VtZW50c1sxXVxuICAgIH0gZWxzZSB7XG4gICAgICBlYWNoKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzdHlsZShhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0XG5tb2R1bGUuZXhwb3J0cy5zZXQgPSBzZXRcblxubW9kdWxlLmV4cG9ydHMuZ2V0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIHByb3BlcnRpZXMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcGVydGllcykpIHtcbiAgICByZXR1cm4gcHJvcGVydGllcy5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuICAgICAgb2JqW3Byb3BdID0gc3R5bGUoZWxlbWVudCwgcHJvcCB8fCAnJylcbiAgICAgIHJldHVybiBvYmpcbiAgICB9LCB7fSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3R5bGUoZWxlbWVudCwgcHJvcGVydGllcyB8fCAnJylcbiAgfVxufVxuIiwidmFyIGRpdiA9IG51bGxcbnZhciBwcmVmaXhlcyA9IFsgJ1dlYmtpdCcsICdNb3onLCAnTycsICdtcycgXVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHByZWZpeFN0eWxlIChwcm9wKSB7XG4gIC8vIHJlLXVzZSBhIGR1bW15IGRpdlxuICBpZiAoIWRpdikge1xuICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIH1cblxuICB2YXIgc3R5bGUgPSBkaXYuc3R5bGVcblxuICAvLyBwcm9wIGV4aXN0cyB3aXRob3V0IHByZWZpeFxuICBpZiAocHJvcCBpbiBzdHlsZSkge1xuICAgIHJldHVybiBwcm9wXG4gIH1cblxuICAvLyBib3JkZXJSYWRpdXMgLT4gQm9yZGVyUmFkaXVzXG4gIHZhciB0aXRsZUNhc2UgPSBwcm9wLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zbGljZSgxKVxuXG4gIC8vIGZpbmQgdGhlIHZlbmRvci1wcmVmaXhlZCBwcm9wXG4gIGZvciAodmFyIGkgPSBwcmVmaXhlcy5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIG5hbWUgPSBwcmVmaXhlc1tpXSArIHRpdGxlQ2FzZVxuICAgIC8vIGUuZy4gV2Via2l0Qm9yZGVyUmFkaXVzIG9yIHdlYmtpdEJvcmRlclJhZGl1c1xuICAgIGlmIChuYW1lIGluIHN0eWxlKSB7XG4gICAgICByZXR1cm4gbmFtZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuIiwiXG52YXIgc3BhY2UgPSByZXF1aXJlKCd0by1zcGFjZS1jYXNlJylcblxuLyoqXG4gKiBFeHBvcnQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB0b0NhbWVsQ2FzZVxuXG4vKipcbiAqIENvbnZlcnQgYSBgc3RyaW5nYCB0byBjYW1lbCBjYXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiB0b0NhbWVsQ2FzZShzdHJpbmcpIHtcbiAgcmV0dXJuIHNwYWNlKHN0cmluZykucmVwbGFjZSgvXFxzKFxcdykvZywgZnVuY3Rpb24gKG1hdGNoZXMsIGxldHRlcikge1xuICAgIHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKVxuICB9KVxufVxuIiwiXG4vKipcbiAqIEV4cG9ydC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRvTm9DYXNlXG5cbi8qKlxuICogVGVzdCB3aGV0aGVyIGEgc3RyaW5nIGlzIGNhbWVsLWNhc2UuXG4gKi9cblxudmFyIGhhc1NwYWNlID0gL1xccy9cbnZhciBoYXNTZXBhcmF0b3IgPSAvKF98LXxcXC58OikvXG52YXIgaGFzQ2FtZWwgPSAvKFthLXpdW0EtWl18W0EtWl1bYS16XSkvXG5cbi8qKlxuICogUmVtb3ZlIGFueSBzdGFydGluZyBjYXNlIGZyb20gYSBgc3RyaW5nYCwgbGlrZSBjYW1lbCBvciBzbmFrZSwgYnV0IGtlZXBcbiAqIHNwYWNlcyBhbmQgcHVuY3R1YXRpb24gdGhhdCBtYXkgYmUgaW1wb3J0YW50IG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gdG9Ob0Nhc2Uoc3RyaW5nKSB7XG4gIGlmIChoYXNTcGFjZS50ZXN0KHN0cmluZykpIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKVxuICBpZiAoaGFzU2VwYXJhdG9yLnRlc3Qoc3RyaW5nKSkgcmV0dXJuICh1bnNlcGFyYXRlKHN0cmluZykgfHwgc3RyaW5nKS50b0xvd2VyQ2FzZSgpXG4gIGlmIChoYXNDYW1lbC50ZXN0KHN0cmluZykpIHJldHVybiB1bmNhbWVsaXplKHN0cmluZykudG9Mb3dlckNhc2UoKVxuICByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKClcbn1cblxuLyoqXG4gKiBTZXBhcmF0b3Igc3BsaXR0ZXIuXG4gKi9cblxudmFyIHNlcGFyYXRvclNwbGl0dGVyID0gL1tcXFdfXSsoLnwkKS9nXG5cbi8qKlxuICogVW4tc2VwYXJhdGUgYSBgc3RyaW5nYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gdW5zZXBhcmF0ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHNlcGFyYXRvclNwbGl0dGVyLCBmdW5jdGlvbiAobSwgbmV4dCkge1xuICAgIHJldHVybiBuZXh0ID8gJyAnICsgbmV4dCA6ICcnXG4gIH0pXG59XG5cbi8qKlxuICogQ2FtZWxjYXNlIHNwbGl0dGVyLlxuICovXG5cbnZhciBjYW1lbFNwbGl0dGVyID0gLyguKShbQS1aXSspL2dcblxuLyoqXG4gKiBVbi1jYW1lbGNhc2UgYSBgc3RyaW5nYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gdW5jYW1lbGl6ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGNhbWVsU3BsaXR0ZXIsIGZ1bmN0aW9uIChtLCBwcmV2aW91cywgdXBwZXJzKSB7XG4gICAgcmV0dXJuIHByZXZpb3VzICsgJyAnICsgdXBwZXJzLnRvTG93ZXJDYXNlKCkuc3BsaXQoJycpLmpvaW4oJyAnKVxuICB9KVxufVxuIiwiXG52YXIgY2xlYW4gPSByZXF1aXJlKCd0by1uby1jYXNlJylcblxuLyoqXG4gKiBFeHBvcnQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB0b1NwYWNlQ2FzZVxuXG4vKipcbiAqIENvbnZlcnQgYSBgc3RyaW5nYCB0byBzcGFjZSBjYXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiB0b1NwYWNlQ2FzZShzdHJpbmcpIHtcbiAgcmV0dXJuIGNsZWFuKHN0cmluZykucmVwbGFjZSgvW1xcV19dKygufCQpL2csIGZ1bmN0aW9uIChtYXRjaGVzLCBtYXRjaCkge1xuICAgIHJldHVybiBtYXRjaCA/ICcgJyArIG1hdGNoIDogJydcbiAgfSkudHJpbSgpXG59XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIiwgW1wibW9kdWxlXCJdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGZhY3RvcnkobW9kdWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbW9kID0ge1xuICAgICAgZXhwb3J0czoge31cbiAgICB9O1xuICAgIGZhY3RvcnkobW9kKTtcbiAgICBnbG9iYWwuYnJvd3NlciA9IG1vZC5leHBvcnRzO1xuICB9XG59KSh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFRoaXMgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbiAobW9kdWxlKSB7XG4gIC8qIHdlYmV4dGVuc2lvbi1wb2x5ZmlsbCAtIHYwLjkuMCAtIEZyaSBNYXIgMjUgMjAyMiAxNzowMDoyMyAqL1xuXG4gIC8qIC0qLSBNb2RlOiBpbmRlbnQtdGFicy1tb2RlOiBuaWw7IGpzLWluZGVudC1sZXZlbDogMiAtKi0gKi9cblxuICAvKiB2aW06IHNldCBzdHM9MiBzdz0yIGV0IHR3PTgwOiAqL1xuXG4gIC8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICAgKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2hyb21lICE9IFwib2JqZWN0XCIgfHwgIWNocm9tZSB8fCAhY2hyb21lLnJ1bnRpbWUgfHwgIWNocm9tZS5ydW50aW1lLmlkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBzY3JpcHQgc2hvdWxkIG9ubHkgYmUgbG9hZGVkIGluIGEgYnJvd3NlciBleHRlbnNpb24uXCIpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzLmJyb3dzZXIgPT09IFwidW5kZWZpbmVkXCIgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbFRoaXMuYnJvd3NlcikgIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICBjb25zdCBDSFJPTUVfU0VORF9NRVNTQUdFX0NBTExCQUNLX05PX1JFU1BPTlNFX01FU1NBR0UgPSBcIlRoZSBtZXNzYWdlIHBvcnQgY2xvc2VkIGJlZm9yZSBhIHJlc3BvbnNlIHdhcyByZWNlaXZlZC5cIjtcbiAgICBjb25zdCBTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcgPSBcIlJldHVybmluZyBhIFByb21pc2UgaXMgdGhlIHByZWZlcnJlZCB3YXkgdG8gc2VuZCBhIHJlcGx5IGZyb20gYW4gb25NZXNzYWdlL29uTWVzc2FnZUV4dGVybmFsIGxpc3RlbmVyLCBhcyB0aGUgc2VuZFJlc3BvbnNlIHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBzcGVjcyAoU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQVBJL3J1bnRpbWUvb25NZXNzYWdlKVwiOyAvLyBXcmFwcGluZyB0aGUgYnVsayBvZiB0aGlzIHBvbHlmaWxsIGluIGEgb25lLXRpbWUtdXNlIGZ1bmN0aW9uIGlzIGEgbWlub3JcbiAgICAvLyBvcHRpbWl6YXRpb24gZm9yIEZpcmVmb3guIFNpbmNlIFNwaWRlcm1vbmtleSBkb2VzIG5vdCBmdWxseSBwYXJzZSB0aGVcbiAgICAvLyBjb250ZW50cyBvZiBhIGZ1bmN0aW9uIHVudGlsIHRoZSBmaXJzdCB0aW1lIGl0J3MgY2FsbGVkLCBhbmQgc2luY2UgaXQgd2lsbFxuICAgIC8vIG5ldmVyIGFjdHVhbGx5IG5lZWQgdG8gYmUgY2FsbGVkLCB0aGlzIGFsbG93cyB0aGUgcG9seWZpbGwgdG8gYmUgaW5jbHVkZWRcbiAgICAvLyBpbiBGaXJlZm94IG5lYXJseSBmb3IgZnJlZS5cblxuICAgIGNvbnN0IHdyYXBBUElzID0gZXh0ZW5zaW9uQVBJcyA9PiB7XG4gICAgICAvLyBOT1RFOiBhcGlNZXRhZGF0YSBpcyBhc3NvY2lhdGVkIHRvIHRoZSBjb250ZW50IG9mIHRoZSBhcGktbWV0YWRhdGEuanNvbiBmaWxlXG4gICAgICAvLyBhdCBidWlsZCB0aW1lIGJ5IHJlcGxhY2luZyB0aGUgZm9sbG93aW5nIFwiaW5jbHVkZVwiIHdpdGggdGhlIGNvbnRlbnQgb2YgdGhlXG4gICAgICAvLyBKU09OIGZpbGUuXG4gICAgICBjb25zdCBhcGlNZXRhZGF0YSA9IHtcbiAgICAgICAgXCJhbGFybXNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjbGVhckFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJvb2ttYXJrc1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDaGlsZHJlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFJlY2VudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFN1YlRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRUcmVlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVRyZWVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJicm93c2VyQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImRpc2FibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlbmFibGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvcGVuUG9wdXBcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRCYWRnZUJhY2tncm91bmRDb2xvclwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEJhZGdlVGV4dFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldEljb25cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRQb3B1cFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFRpdGxlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnJvd3NpbmdEYXRhXCI6IHtcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAyXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUNhY2hlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlQ29va2llc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZURvd25sb2Fkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUZvcm1EYXRhXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlSGlzdG9yeVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZUxvY2FsU3RvcmFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBhc3N3b3Jkc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVBsdWdpbkRhdGFcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXR0aW5nc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbW1hbmRzXCI6IHtcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvbnRleHRNZW51c1wiOiB7XG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb29raWVzXCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbENvb2tpZVN0b3Jlc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImRldnRvb2xzXCI6IHtcbiAgICAgICAgICBcImluc3BlY3RlZFdpbmRvd1wiOiB7XG4gICAgICAgICAgICBcImV2YWxcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDIsXG4gICAgICAgICAgICAgIFwic2luZ2xlQ2FsbGJhY2tBcmdcIjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicGFuZWxzXCI6IHtcbiAgICAgICAgICAgIFwiY3JlYXRlXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDMsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzLFxuICAgICAgICAgICAgICBcInNpbmdsZUNhbGxiYWNrQXJnXCI6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImVsZW1lbnRzXCI6IHtcbiAgICAgICAgICAgICAgXCJjcmVhdGVTaWRlYmFyUGFuZVwiOiB7XG4gICAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJkb3dubG9hZHNcIjoge1xuICAgICAgICAgIFwiY2FuY2VsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZG93bmxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJlcmFzZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZpbGVJY29uXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwib3BlblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJmYWxsYmFja1RvTm9DYWxsYmFja1wiOiB0cnVlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInBhdXNlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicmVtb3ZlRmlsZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlc3VtZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlYXJjaFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNob3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJleHRlbnNpb25cIjoge1xuICAgICAgICAgIFwiaXNBbGxvd2VkRmlsZVNjaGVtZUFjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImlzQWxsb3dlZEluY29nbml0b0FjY2Vzc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImhpc3RvcnlcIjoge1xuICAgICAgICAgIFwiYWRkVXJsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlQWxsXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGVsZXRlUmFuZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZWxldGVVcmxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRWaXNpdHNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZWFyY2hcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpMThuXCI6IHtcbiAgICAgICAgICBcImRldGVjdExhbmd1YWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0QWNjZXB0TGFuZ3VhZ2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiaWRlbnRpdHlcIjoge1xuICAgICAgICAgIFwibGF1bmNoV2ViQXV0aEZsb3dcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZGxlXCI6IHtcbiAgICAgICAgICBcInF1ZXJ5U3RhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtYW5hZ2VtZW50XCI6IHtcbiAgICAgICAgICBcImdldFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEFsbFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFNlbGZcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRFbmFibGVkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidW5pbnN0YWxsU2VsZlwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm5vdGlmaWNhdGlvbnNcIjoge1xuICAgICAgICAgIFwiY2xlYXJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRQZXJtaXNzaW9uTGV2ZWxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJwYWdlQWN0aW9uXCI6IHtcbiAgICAgICAgICBcImdldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWRlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0SWNvblwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFBvcHVwXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2V0VGl0bGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwiZmFsbGJhY2tUb05vQ2FsbGJhY2tcIjogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzaG93XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDEsXG4gICAgICAgICAgICBcImZhbGxiYWNrVG9Ob0NhbGxiYWNrXCI6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicGVybWlzc2lvbnNcIjoge1xuICAgICAgICAgIFwiY29udGFpbnNcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXF1ZXN0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicnVudGltZVwiOiB7XG4gICAgICAgICAgXCJnZXRCYWNrZ3JvdW5kUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFBsYXRmb3JtSW5mb1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm9wZW5PcHRpb25zUGFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJlcXVlc3RVcGRhdGVDaGVja1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNlbmRNZXNzYWdlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDNcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic2VuZE5hdGl2ZU1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRVbmluc3RhbGxVUkxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXNzaW9uc1wiOiB7XG4gICAgICAgICAgXCJnZXREZXZpY2VzXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0UmVjZW50bHlDbG9zZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZXN0b3JlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic3RvcmFnZVwiOiB7XG4gICAgICAgICAgXCJsb2NhbFwiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcIm1hbmFnZWRcIjoge1xuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3luY1wiOiB7XG4gICAgICAgICAgICBcImNsZWFyXCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImdldEJ5dGVzSW5Vc2VcIjoge1xuICAgICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwic2V0XCI6IHtcbiAgICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRhYnNcIjoge1xuICAgICAgICAgIFwiY2FwdHVyZVZpc2libGVUYWJcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkZXRlY3RMYW5ndWFnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRpc2NhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkdXBsaWNhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJleGVjdXRlU2NyaXB0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0Q3VycmVudFwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMCxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0JhY2tcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnb0ZvcndhcmRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJoaWdobGlnaHRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJpbnNlcnRDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAyLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicXVlcnlcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZWxvYWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVDU1NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZW5kTWVzc2FnZVwiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMixcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNldFpvb21cIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzZXRab29tU2V0dGluZ3NcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ0b3BTaXRlc1wiOiB7XG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ3ZWJOYXZpZ2F0aW9uXCI6IHtcbiAgICAgICAgICBcImdldEFsbEZyYW1lc1wiOiB7XG4gICAgICAgICAgICBcIm1pbkFyZ3NcIjogMSxcbiAgICAgICAgICAgIFwibWF4QXJnc1wiOiAxXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImdldEZyYW1lXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAxLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2ViUmVxdWVzdFwiOiB7XG4gICAgICAgICAgXCJoYW5kbGVyQmVoYXZpb3JDaGFuZ2VkXCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwid2luZG93c1wiOiB7XG4gICAgICAgICAgXCJjcmVhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRBbGxcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJnZXRDdXJyZW50XCI6IHtcbiAgICAgICAgICAgIFwibWluQXJnc1wiOiAwLFxuICAgICAgICAgICAgXCJtYXhBcmdzXCI6IDFcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZ2V0TGFzdEZvY3VzZWRcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDAsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDEsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMVxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGRhdGVcIjoge1xuICAgICAgICAgICAgXCJtaW5BcmdzXCI6IDIsXG4gICAgICAgICAgICBcIm1heEFyZ3NcIjogMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGFwaU1ldGFkYXRhKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXBpLW1ldGFkYXRhLmpzb24gaGFzIG5vdCBiZWVuIGluY2x1ZGVkIGluIGJyb3dzZXItcG9seWZpbGxcIik7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqIEEgV2Vha01hcCBzdWJjbGFzcyB3aGljaCBjcmVhdGVzIGFuZCBzdG9yZXMgYSB2YWx1ZSBmb3IgYW55IGtleSB3aGljaCBkb2VzXG4gICAgICAgKiBub3QgZXhpc3Qgd2hlbiBhY2Nlc3NlZCwgYnV0IGJlaGF2ZXMgZXhhY3RseSBhcyBhbiBvcmRpbmFyeSBXZWFrTWFwXG4gICAgICAgKiBvdGhlcndpc2UuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY3JlYXRlSXRlbVxuICAgICAgICogICAgICAgIEEgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gY3JlYXRlIHRoZSB2YWx1ZSBmb3IgYW55XG4gICAgICAgKiAgICAgICAga2V5IHdoaWNoIGRvZXMgbm90IGV4aXN0LCB0aGUgZmlyc3QgdGltZSBpdCBpcyBhY2Nlc3NlZC4gVGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gcmVjZWl2ZXMsIGFzIGl0cyBvbmx5IGFyZ3VtZW50LCB0aGUga2V5IGJlaW5nIGNyZWF0ZWQuXG4gICAgICAgKi9cblxuXG4gICAgICBjbGFzcyBEZWZhdWx0V2Vha01hcCBleHRlbmRzIFdlYWtNYXAge1xuICAgICAgICBjb25zdHJ1Y3RvcihjcmVhdGVJdGVtLCBpdGVtcyA9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHN1cGVyKGl0ZW1zKTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUl0ZW0gPSBjcmVhdGVJdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0KGtleSkge1xuICAgICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCB0aGlzLmNyZWF0ZUl0ZW0oa2V5KSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmdldChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gb2JqZWN0IHdpdGggYSBgdGhlbmAgbWV0aG9kLCBhbmQgY2FuXG4gICAgICAgKiB0aGVyZWZvcmUgYmUgYXNzdW1lZCB0byBiZWhhdmUgYXMgYSBQcm9taXNlLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdGhlbmFibGUuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCBpc1RoZW5hYmxlID0gdmFsdWUgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2gsIHdoZW4gY2FsbGVkLCB3aWxsIHJlc29sdmUgb3IgcmVqZWN0XG4gICAgICAgKiB0aGUgZ2l2ZW4gcHJvbWlzZSBiYXNlZCBvbiBob3cgaXQgaXMgY2FsbGVkOlxuICAgICAgICpcbiAgICAgICAqIC0gSWYsIHdoZW4gY2FsbGVkLCBgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yYCBjb250YWlucyBhIG5vbi1udWxsIG9iamVjdCxcbiAgICAgICAqICAgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCB0aGF0IHZhbHVlLlxuICAgICAgICogLSBJZiB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggZXhhY3RseSBvbmUgYXJndW1lbnQsIHRoZSBwcm9taXNlIGlzXG4gICAgICAgKiAgIHJlc29sdmVkIHRvIHRoYXQgdmFsdWUuXG4gICAgICAgKiAtIE90aGVyd2lzZSwgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgdG8gYW4gYXJyYXkgY29udGFpbmluZyBhbGwgb2YgdGhlXG4gICAgICAgKiAgIGZ1bmN0aW9uJ3MgYXJndW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9taXNlXG4gICAgICAgKiAgICAgICAgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJlc29sdXRpb24gYW5kIHJlamVjdGlvbiBmdW5jdGlvbnMgb2YgYVxuICAgICAgICogICAgICAgIHByb21pc2UuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlc29sdmVcbiAgICAgICAqICAgICAgICBUaGUgcHJvbWlzZSdzIHJlc29sdXRpb24gZnVuY3Rpb24uXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcm9taXNlLnJlamVjdFxuICAgICAgICogICAgICAgIFRoZSBwcm9taXNlJ3MgcmVqZWN0aW9uIGZ1bmN0aW9uLlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IG1ldGFkYXRhXG4gICAgICAgKiAgICAgICAgTWV0YWRhdGEgYWJvdXQgdGhlIHdyYXBwZWQgbWV0aG9kIHdoaWNoIGhhcyBjcmVhdGVkIHRoZSBjYWxsYmFjay5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbWV0YWRhdGEuc2luZ2xlQ2FsbGJhY2tBcmdcbiAgICAgICAqICAgICAgICBXaGV0aGVyIG9yIG5vdCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIG9ubHkgdGhlIGZpcnN0XG4gICAgICAgKiAgICAgICAgYXJndW1lbnQgb2YgdGhlIGNhbGxiYWNrLCBhbHRlcm5hdGl2ZWx5IGFuIGFycmF5IG9mIGFsbCB0aGVcbiAgICAgICAqICAgICAgICBjYWxsYmFjayBhcmd1bWVudHMgaXMgcmVzb2x2ZWQuIEJ5IGRlZmF1bHQsIGlmIHRoZSBjYWxsYmFja1xuICAgICAgICogICAgICAgIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aCBvbmx5IGEgc2luZ2xlIGFyZ3VtZW50LCB0aGF0IHdpbGwgYmVcbiAgICAgICAqICAgICAgICByZXNvbHZlZCB0byB0aGUgcHJvbWlzZSwgd2hpbGUgYWxsIGFyZ3VtZW50cyB3aWxsIGJlIHJlc29sdmVkIGFzXG4gICAgICAgKiAgICAgICAgYW4gYXJyYXkgaWYgbXVsdGlwbGUgYXJlIGdpdmVuLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn1cbiAgICAgICAqICAgICAgICBUaGUgZ2VuZXJhdGVkIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAgICovXG5cblxuICAgICAgY29uc3QgbWFrZUNhbGxiYWNrID0gKHByb21pc2UsIG1ldGFkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uY2FsbGJhY2tBcmdzKSA9PiB7XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVqZWN0KG5ldyBFcnJvcihleHRlbnNpb25BUElzLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLnNpbmdsZUNhbGxiYWNrQXJnIHx8IGNhbGxiYWNrQXJncy5sZW5ndGggPD0gMSAmJiBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByb21pc2UucmVzb2x2ZShjYWxsYmFja0FyZ3NbMF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoY2FsbGJhY2tBcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBwbHVyYWxpemVBcmd1bWVudHMgPSBudW1BcmdzID0+IG51bUFyZ3MgPT0gMSA/IFwiYXJndW1lbnRcIiA6IFwiYXJndW1lbnRzXCI7XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGZvciBhIG1ldGhvZCB3aXRoIHRoZSBnaXZlbiBuYW1lIGFuZCBtZXRhZGF0YS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAgICogICAgICAgIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgd2hpY2ggaXMgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhZGF0YVxuICAgICAgICogICAgICAgIE1ldGFkYXRhIGFib3V0IHRoZSBtZXRob2QgYmVpbmcgd3JhcHBlZC5cbiAgICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gbWV0YWRhdGEubWluQXJnc1xuICAgICAgICogICAgICAgIFRoZSBtaW5pbXVtIG51bWJlciBvZiBhcmd1bWVudHMgd2hpY2ggbXVzdCBiZSBwYXNzZWQgdG8gdGhlXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24uIElmIGNhbGxlZCB3aXRoIGZld2VyIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtpbnRlZ2VyfSBtZXRhZGF0YS5tYXhBcmdzXG4gICAgICAgKiAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGFyZ3VtZW50cyB3aGljaCBtYXkgYmUgcGFzc2VkIHRvIHRoZVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uLiBJZiBjYWxsZWQgd2l0aCBtb3JlIHRoYW4gdGhpcyBudW1iZXIgb2YgYXJndW1lbnRzLCB0aGVcbiAgICAgICAqICAgICAgICB3cmFwcGVyIHdpbGwgcmFpc2UgYW4gZXhjZXB0aW9uLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBtZXRhZGF0YS5zaW5nbGVDYWxsYmFja0FyZ1xuICAgICAgICogICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggb25seSB0aGUgZmlyc3RcbiAgICAgICAqICAgICAgICBhcmd1bWVudCBvZiB0aGUgY2FsbGJhY2ssIGFsdGVybmF0aXZlbHkgYW4gYXJyYXkgb2YgYWxsIHRoZVxuICAgICAgICogICAgICAgIGNhbGxiYWNrIGFyZ3VtZW50cyBpcyByZXNvbHZlZC4gQnkgZGVmYXVsdCwgaWYgdGhlIGNhbGxiYWNrXG4gICAgICAgKiAgICAgICAgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoIG9ubHkgYSBzaW5nbGUgYXJndW1lbnQsIHRoYXQgd2lsbCBiZVxuICAgICAgICogICAgICAgIHJlc29sdmVkIHRvIHRoZSBwcm9taXNlLCB3aGlsZSBhbGwgYXJndW1lbnRzIHdpbGwgYmUgcmVzb2x2ZWQgYXNcbiAgICAgICAqICAgICAgICBhbiBhcnJheSBpZiBtdWx0aXBsZSBhcmUgZ2l2ZW4uXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge2Z1bmN0aW9uKG9iamVjdCwgLi4uKil9XG4gICAgICAgKiAgICAgICBUaGUgZ2VuZXJhdGVkIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwQXN5bmNGdW5jdGlvbiA9IChuYW1lLCBtZXRhZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYXN5bmNGdW5jdGlvbldyYXBwZXIodGFyZ2V0LCAuLi5hcmdzKSB7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgbWV0YWRhdGEubWluQXJncykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPiBtZXRhZGF0YS5tYXhBcmdzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5mYWxsYmFja1RvTm9DYWxsYmFjaykge1xuICAgICAgICAgICAgICAvLyBUaGlzIEFQSSBtZXRob2QgaGFzIGN1cnJlbnRseSBubyBjYWxsYmFjayBvbiBDaHJvbWUsIGJ1dCBpdCByZXR1cm4gYSBwcm9taXNlIG9uIEZpcmVmb3gsXG4gICAgICAgICAgICAgIC8vIGFuZCBzbyB0aGUgcG9seWZpbGwgd2lsbCB0cnkgdG8gY2FsbCBpdCB3aXRoIGEgY2FsbGJhY2sgZmlyc3QsIGFuZCBpdCB3aWxsIGZhbGxiYWNrXG4gICAgICAgICAgICAgIC8vIHRvIG5vdCBwYXNzaW5nIHRoZSBjYWxsYmFjayBpZiB0aGUgZmlyc3QgY2FsbCBmYWlscy5cbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChjYkVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke25hbWV9IEFQSSBtZXRob2QgZG9lc24ndCBzZWVtIHRvIHN1cHBvcnQgdGhlIGNhbGxiYWNrIHBhcmFtZXRlciwgYCArIFwiZmFsbGluZyBiYWNrIHRvIGNhbGwgaXQgd2l0aG91dCBhIGNhbGxiYWNrOiBcIiwgY2JFcnJvcik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpOyAvLyBVcGRhdGUgdGhlIEFQSSBtZXRob2QgbWV0YWRhdGEsIHNvIHRoYXQgdGhlIG5leHQgQVBJIGNhbGxzIHdpbGwgbm90IHRyeSB0b1xuICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgdW5zdXBwb3J0ZWQgY2FsbGJhY2sgYW55bW9yZS5cblxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLmZhbGxiYWNrVG9Ob0NhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGEubm9DYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1ldGFkYXRhLm5vQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0oLi4uYXJncywgbWFrZUNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICB9LCBtZXRhZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIC8qKlxuICAgICAgICogV3JhcHMgYW4gZXhpc3RpbmcgbWV0aG9kIG9mIHRoZSB0YXJnZXQgb2JqZWN0LCBzbyB0aGF0IGNhbGxzIHRvIGl0IGFyZVxuICAgICAgICogaW50ZXJjZXB0ZWQgYnkgdGhlIGdpdmVuIHdyYXBwZXIgZnVuY3Rpb24uIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHJlY2VpdmVzLFxuICAgICAgICogYXMgaXRzIGZpcnN0IGFyZ3VtZW50LCB0aGUgb3JpZ2luYWwgYHRhcmdldGAgb2JqZWN0LCBmb2xsb3dlZCBieSBlYWNoIG9mXG4gICAgICAgKiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXRcbiAgICAgICAqICAgICAgICBUaGUgb3JpZ2luYWwgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSB3cmFwcGVkIG1ldGhvZCBiZWxvbmdzIHRvLlxuICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kXG4gICAgICAgKiAgICAgICAgVGhlIG1ldGhvZCBiZWluZyB3cmFwcGVkLiBUaGlzIGlzIHVzZWQgYXMgdGhlIHRhcmdldCBvZiB0aGUgUHJveHlcbiAgICAgICAqICAgICAgICBvYmplY3Qgd2hpY2ggaXMgY3JlYXRlZCB0byB3cmFwIHRoZSBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgVGhlIHdyYXBwZXIgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIGluIHBsYWNlIG9mIGEgZGlyZWN0IGludm9jYXRpb25cbiAgICAgICAqICAgICAgICBvZiB0aGUgd3JhcHBlZCBtZXRob2QuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PGZ1bmN0aW9uPn1cbiAgICAgICAqICAgICAgICBBIFByb3h5IG9iamVjdCBmb3IgdGhlIGdpdmVuIG1ldGhvZCwgd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gd3JhcHBlclxuICAgICAgICogICAgICAgIG1ldGhvZCBpbiBpdHMgcGxhY2UuXG4gICAgICAgKi9cblxuXG4gICAgICBjb25zdCB3cmFwTWV0aG9kID0gKHRhcmdldCwgbWV0aG9kLCB3cmFwcGVyKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkobWV0aG9kLCB7XG4gICAgICAgICAgYXBwbHkodGFyZ2V0TWV0aG9kLCB0aGlzT2JqLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlci5jYWxsKHRoaXNPYmosIHRhcmdldCwgLi4uYXJncyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgbGV0IGhhc093blByb3BlcnR5ID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICAgICAgLyoqXG4gICAgICAgKiBXcmFwcyBhbiBvYmplY3QgaW4gYSBQcm94eSB3aGljaCBpbnRlcmNlcHRzIGFuZCB3cmFwcyBjZXJ0YWluIG1ldGhvZHNcbiAgICAgICAqIGJhc2VkIG9uIHRoZSBnaXZlbiBgd3JhcHBlcnNgIGFuZCBgbWV0YWRhdGFgIG9iamVjdHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICAgICAgICogICAgICAgIFRoZSB0YXJnZXQgb2JqZWN0IHRvIHdyYXAuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtvYmplY3R9IFt3cmFwcGVycyA9IHt9XVxuICAgICAgICogICAgICAgIEFuIG9iamVjdCB0cmVlIGNvbnRhaW5pbmcgd3JhcHBlciBmdW5jdGlvbnMgZm9yIHNwZWNpYWwgY2FzZXMuIEFueVxuICAgICAgICogICAgICAgIGZ1bmN0aW9uIHByZXNlbnQgaW4gdGhpcyBvYmplY3QgdHJlZSBpcyBjYWxsZWQgaW4gcGxhY2Ugb2YgdGhlXG4gICAgICAgKiAgICAgICAgbWV0aG9kIGluIHRoZSBzYW1lIGxvY2F0aW9uIGluIHRoZSBgdGFyZ2V0YCBvYmplY3QgdHJlZS4gVGhlc2VcbiAgICAgICAqICAgICAgICB3cmFwcGVyIG1ldGhvZHMgYXJlIGludm9rZWQgYXMgZGVzY3JpYmVkIGluIHtAc2VlIHdyYXBNZXRob2R9LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbbWV0YWRhdGEgPSB7fV1cbiAgICAgICAqICAgICAgICBBbiBvYmplY3QgdHJlZSBjb250YWluaW5nIG1ldGFkYXRhIHVzZWQgdG8gYXV0b21hdGljYWxseSBnZW5lcmF0ZVxuICAgICAgICogICAgICAgIFByb21pc2UtYmFzZWQgd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFzeW5jaHJvbm91cy4gQW55IGZ1bmN0aW9uIGluXG4gICAgICAgKiAgICAgICAgdGhlIGB0YXJnZXRgIG9iamVjdCB0cmVlIHdoaWNoIGhhcyBhIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgb2JqZWN0XG4gICAgICAgKiAgICAgICAgaW4gdGhlIHNhbWUgbG9jYXRpb24gaW4gdGhlIGBtZXRhZGF0YWAgdHJlZSBpcyByZXBsYWNlZCB3aXRoIGFuXG4gICAgICAgKiAgICAgICAgYXV0b21hdGljYWxseS1nZW5lcmF0ZWQgd3JhcHBlciBmdW5jdGlvbiwgYXMgZGVzY3JpYmVkIGluXG4gICAgICAgKiAgICAgICAge0BzZWUgd3JhcEFzeW5jRnVuY3Rpb259XG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge1Byb3h5PG9iamVjdD59XG4gICAgICAgKi9cblxuICAgICAgY29uc3Qgd3JhcE9iamVjdCA9ICh0YXJnZXQsIHdyYXBwZXJzID0ge30sIG1ldGFkYXRhID0ge30pID0+IHtcbiAgICAgICAgbGV0IGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgbGV0IGhhbmRsZXJzID0ge1xuICAgICAgICAgIGhhcyhwcm94eVRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0IHx8IHByb3AgaW4gY2FjaGU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGdldChwcm94eVRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWNoZVtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEocHJvcCBpbiB0YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBtZXRob2Qgb24gdGhlIHVuZGVybHlpbmcgb2JqZWN0LiBDaGVjayBpZiB3ZSBuZWVkIHRvIGRvXG4gICAgICAgICAgICAgIC8vIGFueSB3cmFwcGluZy5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3cmFwcGVyc1twcm9wXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBhIHNwZWNpYWwtY2FzZSB3cmFwcGVyIGZvciB0aGlzIG1ldGhvZC5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBNZXRob2QodGFyZ2V0LCB0YXJnZXRbcHJvcF0sIHdyYXBwZXJzW3Byb3BdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNPd25Qcm9wZXJ0eShtZXRhZGF0YSwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIGFzeW5jIG1ldGhvZCB0aGF0IHdlIGhhdmUgbWV0YWRhdGEgZm9yLiBDcmVhdGUgYVxuICAgICAgICAgICAgICAgIC8vIFByb21pc2Ugd3JhcHBlciBmb3IgaXQuXG4gICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB3cmFwQXN5bmNGdW5jdGlvbihwcm9wLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwTWV0aG9kKHRhcmdldCwgdGFyZ2V0W3Byb3BdLCB3cmFwcGVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIGEgbWV0aG9kIHRoYXQgd2UgZG9uJ3Qga25vdyBvciBjYXJlIGFib3V0LiBSZXR1cm4gdGhlXG4gICAgICAgICAgICAgICAgLy8gb3JpZ2luYWwgbWV0aG9kLCBib3VuZCB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5iaW5kKHRhcmdldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIChoYXNPd25Qcm9wZXJ0eSh3cmFwcGVycywgcHJvcCkgfHwgaGFzT3duUHJvcGVydHkobWV0YWRhdGEsIHByb3ApKSkge1xuICAgICAgICAgICAgICAvLyBUaGlzIGlzIGFuIG9iamVjdCB0aGF0IHdlIG5lZWQgdG8gZG8gc29tZSB3cmFwcGluZyBmb3IgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICAgIC8vIG9mLiBDcmVhdGUgYSBzdWItb2JqZWN0IHdyYXBwZXIgZm9yIGl0IHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoaWxkXG4gICAgICAgICAgICAgIC8vIG1ldGFkYXRhLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHdyYXBPYmplY3QodmFsdWUsIHdyYXBwZXJzW3Byb3BdLCBtZXRhZGF0YVtwcm9wXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhhc093blByb3BlcnR5KG1ldGFkYXRhLCBcIipcIikpIHtcbiAgICAgICAgICAgICAgLy8gV3JhcCBhbGwgcHJvcGVydGllcyBpbiAqIG5hbWVzcGFjZS5cbiAgICAgICAgICAgICAgdmFsdWUgPSB3cmFwT2JqZWN0KHZhbHVlLCB3cmFwcGVyc1twcm9wXSwgbWV0YWRhdGFbXCIqXCJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gZG8gYW55IHdyYXBwaW5nIGZvciB0aGlzIHByb3BlcnR5LFxuICAgICAgICAgICAgICAvLyBzbyBqdXN0IGZvcndhcmQgYWxsIGFjY2VzcyB0byB0aGUgdW5kZXJseWluZyBvYmplY3QuXG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwge1xuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FjaGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0KHByb3h5VGFyZ2V0LCBwcm9wLCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgICAgICAgICAgIGlmIChwcm9wIGluIGNhY2hlKSB7XG4gICAgICAgICAgICAgIGNhY2hlW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlZmluZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wLCBkZXNjKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eShjYWNoZSwgcHJvcCwgZGVzYyk7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGRlbGV0ZVByb3BlcnR5KHByb3h5VGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShjYWNoZSwgcHJvcCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH07IC8vIFBlciBjb250cmFjdCBvZiB0aGUgUHJveHkgQVBJLCB0aGUgXCJnZXRcIiBwcm94eSBoYW5kbGVyIG11c3QgcmV0dXJuIHRoZVxuICAgICAgICAvLyBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgdGFyZ2V0IGlmIHRoYXQgdmFsdWUgaXMgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZFxuICAgICAgICAvLyBub24tY29uZmlndXJhYmxlLiBGb3IgdGhpcyByZWFzb24sIHdlIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGVcbiAgICAgICAgLy8gcHJvdG90eXBlIHNldCB0byBgdGFyZ2V0YCBpbnN0ZWFkIG9mIHVzaW5nIGB0YXJnZXRgIGRpcmVjdGx5LlxuICAgICAgICAvLyBPdGhlcndpc2Ugd2UgY2Fubm90IHJldHVybiBhIGN1c3RvbSBvYmplY3QgZm9yIEFQSXMgdGhhdFxuICAgICAgICAvLyBhcmUgZGVjbGFyZWQgcmVhZC1vbmx5IGFuZCBub24tY29uZmlndXJhYmxlLCBzdWNoIGFzIGBjaHJvbWUuZGV2dG9vbHNgLlxuICAgICAgICAvL1xuICAgICAgICAvLyBUaGUgcHJveHkgaGFuZGxlcnMgdGhlbXNlbHZlcyB3aWxsIHN0aWxsIHVzZSB0aGUgb3JpZ2luYWwgYHRhcmdldGBcbiAgICAgICAgLy8gaW5zdGVhZCBvZiB0aGUgYHByb3h5VGFyZ2V0YCwgc28gdGhhdCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBhcmVcbiAgICAgICAgLy8gZGVyZWZlcmVuY2VkIHZpYSB0aGUgb3JpZ2luYWwgdGFyZ2V0cy5cblxuICAgICAgICBsZXQgcHJveHlUYXJnZXQgPSBPYmplY3QuY3JlYXRlKHRhcmdldCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJveHkocHJveHlUYXJnZXQsIGhhbmRsZXJzKTtcbiAgICAgIH07XG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZXMgYSBzZXQgb2Ygd3JhcHBlciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IG9iamVjdCwgd2hpY2ggaGFuZGxlc1xuICAgICAgICogd3JhcHBpbmcgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRoYXQgdGhvc2UgbWVzc2FnZXMgYXJlIHBhc3NlZC5cbiAgICAgICAqXG4gICAgICAgKiBBIHNpbmdsZSB3cmFwcGVyIGlzIGNyZWF0ZWQgZm9yIGVhY2ggbGlzdGVuZXIgZnVuY3Rpb24sIGFuZCBzdG9yZWQgaW4gYVxuICAgICAgICogbWFwLiBTdWJzZXF1ZW50IGNhbGxzIHRvIGBhZGRMaXN0ZW5lcmAsIGBoYXNMaXN0ZW5lcmAsIG9yIGByZW1vdmVMaXN0ZW5lcmBcbiAgICAgICAqIHJldHJpZXZlIHRoZSBvcmlnaW5hbCB3cmFwcGVyLCBzbyB0aGF0ICBhdHRlbXB0cyB0byByZW1vdmUgYVxuICAgICAgICogcHJldmlvdXNseS1hZGRlZCBsaXN0ZW5lciB3b3JrIGFzIGV4cGVjdGVkLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7RGVmYXVsdFdlYWtNYXA8ZnVuY3Rpb24sIGZ1bmN0aW9uPn0gd3JhcHBlck1hcFxuICAgICAgICogICAgICAgIEEgRGVmYXVsdFdlYWtNYXAgb2JqZWN0IHdoaWNoIHdpbGwgY3JlYXRlIHRoZSBhcHByb3ByaWF0ZSB3cmFwcGVyXG4gICAgICAgKiAgICAgICAgZm9yIGEgZ2l2ZW4gbGlzdGVuZXIgZnVuY3Rpb24gd2hlbiBvbmUgZG9lcyBub3QgZXhpc3QsIGFuZCByZXRyaWV2ZVxuICAgICAgICogICAgICAgIGFuIGV4aXN0aW5nIG9uZSB3aGVuIGl0IGRvZXMuXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgICAqL1xuXG5cbiAgICAgIGNvbnN0IHdyYXBFdmVudCA9IHdyYXBwZXJNYXAgPT4gKHtcbiAgICAgICAgYWRkTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lciwgLi4uYXJncykge1xuICAgICAgICAgIHRhcmdldC5hZGRMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lciksIC4uLmFyZ3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc0xpc3RlbmVyKHRhcmdldCwgbGlzdGVuZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0Lmhhc0xpc3RlbmVyKHdyYXBwZXJNYXAuZ2V0KGxpc3RlbmVyKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcikge1xuICAgICAgICAgIHRhcmdldC5yZW1vdmVMaXN0ZW5lcih3cmFwcGVyTWFwLmdldChsaXN0ZW5lcikpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvblJlcXVlc3RGaW5pc2hlZFdyYXBwZXJzID0gbmV3IERlZmF1bHRXZWFrTWFwKGxpc3RlbmVyID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcyBhbiBvblJlcXVlc3RGaW5pc2hlZCBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IHdpbGwgcmV0dXJuIGFcbiAgICAgICAgICogYGdldENvbnRlbnQoKWAgcHJvcGVydHkgd2hpY2ggcmV0dXJucyBhIGBQcm9taXNlYCByYXRoZXIgdGhhbiB1c2luZyBhXG4gICAgICAgICAqIGNhbGxiYWNrIEFQSS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHJlcVxuICAgICAgICAgKiAgICAgICAgVGhlIEhBUiBlbnRyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBuZXR3b3JrIHJlcXVlc3QuXG4gICAgICAgICAqL1xuXG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG9uUmVxdWVzdEZpbmlzaGVkKHJlcSkge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRSZXEgPSB3cmFwT2JqZWN0KHJlcSwge31cbiAgICAgICAgICAvKiB3cmFwcGVycyAqL1xuICAgICAgICAgICwge1xuICAgICAgICAgICAgZ2V0Q29udGVudDoge1xuICAgICAgICAgICAgICBtaW5BcmdzOiAwLFxuICAgICAgICAgICAgICBtYXhBcmdzOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbGlzdGVuZXIod3JhcHBlZFJlcSk7XG4gICAgICAgIH07XG4gICAgICB9KTsgLy8gS2VlcCB0cmFjayBpZiB0aGUgZGVwcmVjYXRpb24gd2FybmluZyBoYXMgYmVlbiBsb2dnZWQgYXQgbGVhc3Qgb25jZS5cblxuICAgICAgbGV0IGxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZyA9IGZhbHNlO1xuICAgICAgY29uc3Qgb25NZXNzYWdlV3JhcHBlcnMgPSBuZXcgRGVmYXVsdFdlYWtNYXAobGlzdGVuZXIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBzIGEgbWVzc2FnZSBsaXN0ZW5lciBmdW5jdGlvbiBzbyB0aGF0IGl0IG1heSBzZW5kIHJlc3BvbnNlcyBiYXNlZCBvblxuICAgICAgICAgKiBpdHMgcmV0dXJuIHZhbHVlLCByYXRoZXIgdGhhbiBieSByZXR1cm5pbmcgYSBzZW50aW5lbCB2YWx1ZSBhbmQgY2FsbGluZyBhXG4gICAgICAgICAqIGNhbGxiYWNrLiBJZiB0aGUgbGlzdGVuZXIgZnVuY3Rpb24gcmV0dXJucyBhIFByb21pc2UsIHRoZSByZXNwb25zZSBpc1xuICAgICAgICAgKiBzZW50IHdoZW4gdGhlIHByb21pc2UgZWl0aGVyIHJlc29sdmVzIG9yIHJlamVjdHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gbWVzc2FnZVxuICAgICAgICAgKiAgICAgICAgVGhlIG1lc3NhZ2Ugc2VudCBieSB0aGUgb3RoZXIgZW5kIG9mIHRoZSBjaGFubmVsLlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gc2VuZGVyXG4gICAgICAgICAqICAgICAgICBEZXRhaWxzIGFib3V0IHRoZSBzZW5kZXIgb2YgdGhlIG1lc3NhZ2UuXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKil9IHNlbmRSZXNwb25zZVxuICAgICAgICAgKiAgICAgICAgQSBjYWxsYmFjayB3aGljaCwgd2hlbiBjYWxsZWQgd2l0aCBhbiBhcmJpdHJhcnkgYXJndW1lbnQsIHNlbmRzXG4gICAgICAgICAqICAgICAgICB0aGF0IHZhbHVlIGFzIGEgcmVzcG9uc2UuXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKiAgICAgICAgVHJ1ZSBpZiB0aGUgd3JhcHBlZCBsaXN0ZW5lciByZXR1cm5lZCBhIFByb21pc2UsIHdoaWNoIHdpbGwgbGF0ZXJcbiAgICAgICAgICogICAgICAgIHlpZWxkIGEgcmVzcG9uc2UuIEZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAgICovXG5cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gb25NZXNzYWdlKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgbGV0IGRpZENhbGxTZW5kUmVzcG9uc2UgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgd3JhcHBlZFNlbmRSZXNwb25zZTtcbiAgICAgICAgICBsZXQgc2VuZFJlc3BvbnNlUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgd3JhcHBlZFNlbmRSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAoIWxvZ2dlZFNlbmRSZXNwb25zZURlcHJlY2F0aW9uV2FybmluZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihTRU5EX1JFU1BPTlNFX0RFUFJFQ0FUSU9OX1dBUk5JTkcsIG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICAgICAgICAgICAgICBsb2dnZWRTZW5kUmVzcG9uc2VEZXByZWNhdGlvbldhcm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZGlkQ2FsbFNlbmRSZXNwb25zZSA9IHRydWU7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGxpc3RlbmVyKG1lc3NhZ2UsIHNlbmRlciwgd3JhcHBlZFNlbmRSZXNwb25zZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGlzUmVzdWx0VGhlbmFibGUgPSByZXN1bHQgIT09IHRydWUgJiYgaXNUaGVuYWJsZShyZXN1bHQpOyAvLyBJZiB0aGUgbGlzdGVuZXIgZGlkbid0IHJldHVybmVkIHRydWUgb3IgYSBQcm9taXNlLCBvciBjYWxsZWRcbiAgICAgICAgICAvLyB3cmFwcGVkU2VuZFJlc3BvbnNlIHN5bmNocm9ub3VzbHksIHdlIGNhbiBleGl0IGVhcmxpZXJcbiAgICAgICAgICAvLyBiZWNhdXNlIHRoZXJlIHdpbGwgYmUgbm8gcmVzcG9uc2Ugc2VudCBmcm9tIHRoaXMgbGlzdGVuZXIuXG5cbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSB0cnVlICYmICFpc1Jlc3VsdFRoZW5hYmxlICYmICFkaWRDYWxsU2VuZFJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSAvLyBBIHNtYWxsIGhlbHBlciB0byBzZW5kIHRoZSBtZXNzYWdlIGlmIHRoZSBwcm9taXNlIHJlc29sdmVzXG4gICAgICAgICAgLy8gYW5kIGFuIGVycm9yIGlmIHRoZSBwcm9taXNlIHJlamVjdHMgKGEgd3JhcHBlZCBzZW5kTWVzc2FnZSBoYXNcbiAgICAgICAgICAvLyB0byB0cmFuc2xhdGUgdGhlIG1lc3NhZ2UgaW50byBhIHJlc29sdmVkIHByb21pc2Ugb3IgYSByZWplY3RlZFxuICAgICAgICAgIC8vIHByb21pc2UpLlxuXG5cbiAgICAgICAgICBjb25zdCBzZW5kUHJvbWlzZWRSZXN1bHQgPSBwcm9taXNlID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihtc2cgPT4ge1xuICAgICAgICAgICAgICAvLyBzZW5kIHRoZSBtZXNzYWdlIHZhbHVlLlxuICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UobXNnKTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgLy8gU2VuZCBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhlIGVycm9yIGlmIHRoZSByZWplY3RlZCB2YWx1ZVxuICAgICAgICAgICAgICAvLyBpcyBhbiBpbnN0YW5jZSBvZiBlcnJvciwgb3IgdGhlIG9iamVjdCBpdHNlbGYgb3RoZXJ3aXNlLlxuICAgICAgICAgICAgICBsZXQgbWVzc2FnZTtcblxuICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgfHwgdHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IFwiQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZFwiO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICBfX21veldlYkV4dGVuc2lvblBvbHlmaWxsUmVqZWN0X186IHRydWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgIC8vIFByaW50IGFuIGVycm9yIG9uIHRoZSBjb25zb2xlIGlmIHVuYWJsZSB0byBzZW5kIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBzZW5kIG9uTWVzc2FnZSByZWplY3RlZCByZXBseVwiLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTsgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybmVkIGEgUHJvbWlzZSwgc2VuZCB0aGUgcmVzb2x2ZWQgdmFsdWUgYXMgYVxuICAgICAgICAgIC8vIHJlc3VsdCwgb3RoZXJ3aXNlIHdhaXQgdGhlIHByb21pc2UgcmVsYXRlZCB0byB0aGUgd3JhcHBlZFNlbmRSZXNwb25zZVxuICAgICAgICAgIC8vIGNhbGxiYWNrIHRvIHJlc29sdmUgYW5kIHNlbmQgaXQgYXMgYSByZXNwb25zZS5cblxuXG4gICAgICAgICAgaWYgKGlzUmVzdWx0VGhlbmFibGUpIHtcbiAgICAgICAgICAgIHNlbmRQcm9taXNlZFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZW5kUHJvbWlzZWRSZXN1bHQoc2VuZFJlc3BvbnNlUHJvbWlzZSk7XG4gICAgICAgICAgfSAvLyBMZXQgQ2hyb21lIGtub3cgdGhhdCB0aGUgbGlzdGVuZXIgaXMgcmVwbHlpbmcuXG5cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrID0gKHtcbiAgICAgICAgcmVqZWN0LFxuICAgICAgICByZXNvbHZlXG4gICAgICB9LCByZXBseSkgPT4ge1xuICAgICAgICBpZiAoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIC8vIERldGVjdCB3aGVuIG5vbmUgb2YgdGhlIGxpc3RlbmVycyByZXBsaWVkIHRvIHRoZSBzZW5kTWVzc2FnZSBjYWxsIGFuZCByZXNvbHZlXG4gICAgICAgICAgLy8gdGhlIHByb21pc2UgdG8gdW5kZWZpbmVkIGFzIGluIEZpcmVmb3guXG4gICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbC9pc3N1ZXMvMTMwXG4gICAgICAgICAgaWYgKGV4dGVuc2lvbkFQSXMucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSA9PT0gQ0hST01FX1NFTkRfTUVTU0FHRV9DQUxMQkFDS19OT19SRVNQT05TRV9NRVNTQUdFKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZXh0ZW5zaW9uQVBJcy5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICYmIHJlcGx5Ll9fbW96V2ViRXh0ZW5zaW9uUG9seWZpbGxSZWplY3RfXykge1xuICAgICAgICAgIC8vIENvbnZlcnQgYmFjayB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJyb3IgaW50b1xuICAgICAgICAgIC8vIGFuIEVycm9yIGluc3RhbmNlLlxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IocmVwbHkubWVzc2FnZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVwbHkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB3cmFwcGVkU2VuZE1lc3NhZ2UgPSAobmFtZSwgbWV0YWRhdGEsIGFwaU5hbWVzcGFjZU9iaiwgLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPCBtZXRhZGF0YS5taW5BcmdzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhdCBsZWFzdCAke21ldGFkYXRhLm1pbkFyZ3N9ICR7cGx1cmFsaXplQXJndW1lbnRzKG1ldGFkYXRhLm1pbkFyZ3MpfSBmb3IgJHtuYW1lfSgpLCBnb3QgJHthcmdzLmxlbmd0aH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA+IG1ldGFkYXRhLm1heEFyZ3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGF0IG1vc3QgJHttZXRhZGF0YS5tYXhBcmdzfSAke3BsdXJhbGl6ZUFyZ3VtZW50cyhtZXRhZGF0YS5tYXhBcmdzKX0gZm9yICR7bmFtZX0oKSwgZ290ICR7YXJncy5sZW5ndGh9YCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyYXBwZWRDYiA9IHdyYXBwZWRTZW5kTWVzc2FnZUNhbGxiYWNrLmJpbmQobnVsbCwge1xuICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFyZ3MucHVzaCh3cmFwcGVkQ2IpO1xuICAgICAgICAgIGFwaU5hbWVzcGFjZU9iai5zZW5kTWVzc2FnZSguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzdGF0aWNXcmFwcGVycyA9IHtcbiAgICAgICAgZGV2dG9vbHM6IHtcbiAgICAgICAgICBuZXR3b3JrOiB7XG4gICAgICAgICAgICBvblJlcXVlc3RGaW5pc2hlZDogd3JhcEV2ZW50KG9uUmVxdWVzdEZpbmlzaGVkV3JhcHBlcnMpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBydW50aW1lOiB7XG4gICAgICAgICAgb25NZXNzYWdlOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIG9uTWVzc2FnZUV4dGVybmFsOiB3cmFwRXZlbnQob25NZXNzYWdlV3JhcHBlcnMpLFxuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgdGFiczoge1xuICAgICAgICAgIHNlbmRNZXNzYWdlOiB3cmFwcGVkU2VuZE1lc3NhZ2UuYmluZChudWxsLCBcInNlbmRNZXNzYWdlXCIsIHtcbiAgICAgICAgICAgIG1pbkFyZ3M6IDIsXG4gICAgICAgICAgICBtYXhBcmdzOiAzXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNldHRpbmdNZXRhZGF0YSA9IHtcbiAgICAgICAgY2xlYXI6IHtcbiAgICAgICAgICBtaW5BcmdzOiAxLFxuICAgICAgICAgIG1heEFyZ3M6IDFcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgbWluQXJnczogMSxcbiAgICAgICAgICBtYXhBcmdzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHNldDoge1xuICAgICAgICAgIG1pbkFyZ3M6IDEsXG4gICAgICAgICAgbWF4QXJnczogMVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgYXBpTWV0YWRhdGEucHJpdmFjeSA9IHtcbiAgICAgICAgbmV0d29yazoge1xuICAgICAgICAgIFwiKlwiOiBzZXR0aW5nTWV0YWRhdGFcbiAgICAgICAgfSxcbiAgICAgICAgc2VydmljZXM6IHtcbiAgICAgICAgICBcIipcIjogc2V0dGluZ01ldGFkYXRhXG4gICAgICAgIH0sXG4gICAgICAgIHdlYnNpdGVzOiB7XG4gICAgICAgICAgXCIqXCI6IHNldHRpbmdNZXRhZGF0YVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHdyYXBPYmplY3QoZXh0ZW5zaW9uQVBJcywgc3RhdGljV3JhcHBlcnMsIGFwaU1ldGFkYXRhKTtcbiAgICB9OyAvLyBUaGUgYnVpbGQgcHJvY2VzcyBhZGRzIGEgVU1EIHdyYXBwZXIgYXJvdW5kIHRoaXMgZmlsZSwgd2hpY2ggbWFrZXMgdGhlXG4gICAgLy8gYG1vZHVsZWAgdmFyaWFibGUgYXZhaWxhYmxlLlxuXG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdyYXBBUElzKGNocm9tZSk7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLmJyb3dzZXI7XG4gIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci1wb2x5ZmlsbC5qcy5tYXBcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmFtZEQgPSBmdW5jdGlvbiAoKSB7XG5cdHRocm93IG5ldyBFcnJvcignZGVmaW5lIGNhbm5vdCBiZSB1c2VkIGluZGlyZWN0Jyk7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBicm93c2VyIGZyb20gXCJ3ZWJleHRlbnNpb24tcG9seWZpbGxcIjtcbi8vIEB0cy1leHBlY3QtZXJyb3IgZ2xvYmFsVGhpc+OCkuS4iuabuOOBjeOBl+OCiOOBhuOBqOOBmeOCi+OBqOOCqOODqeODvOOBq+OBquOCi1xuZ2xvYmFsVGhpcy5icm93c2VyID0gYnJvd3NlcjtcbiIsImltcG9ydCBicm93c2VySW5mbyBmcm9tIFwiYm93c2VyXCI7XG5pbXBvcnQgTWVzc2FnZUxpc3RlbmVyIGZyb20gXCIuLi9saWJzL01lc3NhZ2VMaXN0ZW5lclwiO1xuaW1wb3J0IGV4cGFuZGVyIGZyb20gXCIuL2V4cGFuZGVyXCI7XG5pbXBvcnQgbm90aWZpY2F0aW9uIGZyb20gXCIuL25vdGlmaWNhdGlvblwiO1xuaW1wb3J0IGluc2VydE1lbnUgZnJvbSBcIi4vaW5zZXJ0TWVudVwiO1xuaW1wb3J0IHtcbiAgZ3lhem9jYXB0dXJlV2luZG93LFxuICBneWF6b0NhcHR1cmVTZWxlY3RlZEFyZWEsXG4gIGd5YXpvU2VsZWN0RWxtLFxuICBneWF6b1dob2xlQ2FwdHVyZSxcbiAgY2hhbmdlRml4ZWRFbGVtZW50VG9BYnNvbHV0ZSxcbn0gZnJvbSBcIi4vYWN0aW9uc1wiO1xuXG4oZnVuY3Rpb24gKCkge1xuICBpZiAod2luZG93Ll9fZW1iZWRlZEd5YXpvQ29udGVudEpTKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHdpbmRvdy5fX2VtYmVkZWRHeWF6b0NvbnRlbnRKUyA9IHRydWU7XG4gIGNvbnN0IG9uTWVzc2FnZUxpc3RlbmVyID0gbmV3IE1lc3NhZ2VMaXN0ZW5lcihcImNvbnRlbnRcIik7XG5cbiAgaWYgKC9neWF6b1xcLmNvbS8udGVzdChsb2NhdGlvbi5ob3N0bmFtZSkpIHtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgXCJkYXRhLWV4dGVuc2lvbi1pbnN0YWxsZWRcIixcbiAgICAgIEpTT04uc3RyaW5naWZ5KHRydWUpXG4gICAgKTtcbiAgfVxuXG4gIG9uTWVzc2FnZUxpc3RlbmVyLmFkZChcIm5vdGlmaWNhdGlvblwiLCBub3RpZmljYXRpb24pO1xuICBvbk1lc3NhZ2VMaXN0ZW5lci5hZGQoXCJpbnNlcnRNZW51XCIsIGluc2VydE1lbnUpO1xuICBvbk1lc3NhZ2VMaXN0ZW5lci5hZGQoXG4gICAgXCJjaGFuZ2VGaXhlZEVsZW1lbnRUb0Fic29sdXRlXCIsXG4gICAgY2hhbmdlRml4ZWRFbGVtZW50VG9BYnNvbHV0ZVxuICApO1xuICBvbk1lc3NhZ2VMaXN0ZW5lci5hZGQoXCJjYXB0dXJlV2luZG93XCIsIGd5YXpvY2FwdHVyZVdpbmRvdyk7XG4gIG9uTWVzc2FnZUxpc3RlbmVyLmFkZChcImNhcHR1cmVTZWxlY3RBcmVhXCIsIGd5YXpvQ2FwdHVyZVNlbGVjdGVkQXJlYSk7XG4gIG9uTWVzc2FnZUxpc3RlbmVyLmFkZChcImNhcHR1cmVFbGVtZW50XCIsIGd5YXpvU2VsZWN0RWxtKTtcbiAgb25NZXNzYWdlTGlzdGVuZXIuYWRkKFwiY2FwdHVyZVdob2xlUGFnZVwiLCBneWF6b1dob2xlQ2FwdHVyZSk7XG5cbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKFxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgWFhYXG4gICAgb25NZXNzYWdlTGlzdGVuZXIubGlzdGVuLmJpbmQob25NZXNzYWdlTGlzdGVuZXIpXG4gICk7XG4gIGlmIChcbiAgICAhYnJvd3NlckluZm8uZmlyZWZveCAmJiAvLyBYWFg6IEZpcmVmb3ggY2FuJ3QgZW1iZWQgbW96LWV4dGVuc2lvbjovLyBmaWxlIGluIGNvbnRlbnRcbiAgICAhL14oLitcXC4pP2d5YXpvXFwuY29tJC8udGVzdCh3aW5kb3cubG9jYXRpb24uaG9zdCkgLy8gUHJldmVudCBzaG93aW5nIHByZXZpZXcgb24gZ3lhem8uY29tXG4gIClcbiAgICBleHBhbmRlcigpO1xufSkoKTtcbiJdLCJuYW1lcyI6WyJFU0NfS0VZX0NPREUiLCJKQUNLVVBfTUFSR0lOIiwiY2hhbmdlRml4ZWRFbGVtZW50VG9BYnNvbHV0ZSIsImFyZ3MiLCJzZW5kUmVzcG9uc2UiLCJyZXN0b3JlRml4ZWRFbGVtZW50IiwiZ2V0Wm9vbUFuZFNjYWxlIiwibG9ja1Njcm9sbCIsInVubG9ja1Njcm9sbCIsInBhY2tTY3JvbGxCYXIiLCJoZWlnaHQiLCJwYWdlSGVpZ2h0Iiwid2lkdGgiLCJwYWdlV2lkdGgiLCJKYWNrdXBFbGVtZW50Iiwic2VuZE1lc3NhZ2VUb01haW5TY3JpcHQiLCJzaGFkb3dET01RdWVyeVNlbGVjdG9yIiwicmVxdWVzdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0YXJ0WCIsInN0YXJ0WSIsInRlbXBVc2VyU2VsZWN0IiwiYm9keSIsInN0eWxlIiwid2Via2l0VXNlclNlbGVjdCIsImxheWVyIiwiY3JlYXRlRWxlbWVudCIsImphY2t1cCIsInBvc2l0aW9uIiwibGVmdCIsImNsaWVudExlZnQiLCJ0b3AiLCJjbGllbnRUb3AiLCJ6SW5kZXgiLCJjdXJzb3IiLCJjbGFzc05hbWUiLCJzZWxlY3Rpb25FbG0iLCJhcHBlbmRDaGlsZCIsInVwZGF0ZVNlbGVjdGlvbkVsbVN0eWxlIiwic3R5bGVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJiYWNrZ3JvdW5kIiwiY2FuY2VsR3lhem8iLCJwYXJlbnROb2RlIiwiZWxlbWVudCIsInJlbW92ZUNoaWxkIiwicmVtb3ZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImtleWRvd25IYW5kbGVyIiwid2luZG93IiwibWVudSIsInJlbW92ZWRHeWF6b01lbnUiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJrZXlDb2RlIiwibW91c2Vkb3duSGFuZGxlciIsImUiLCJneWF6b01lbnUiLCJwYWdlWCIsInBhZ2VZIiwiYm9yZGVyIiwibW91c2Vtb3ZlSGFuZGxlciIsIm1vdXNldXBIYW5kbGVyIiwiTWF0aCIsImFicyIsIm1pbiIsInNjcm9sbFkiLCJzY2FsZU9iaiIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3IiwiaCIsIm9wYWNpdHkiLCJvdmVyZmxvdyIsImlubmVySGVpZ2h0IiwiZmluaXNoIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImxlbmd0aCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNldFRpbWVvdXQiLCJjaHJvbWUiLCJydW50aW1lIiwiaWQiLCJ0YXJnZXQiLCJhY3Rpb24iLCJkYXRhIiwieCIsInNjcm9sbFgiLCJ5IiwidCIsInRpdGxlIiwidSIsImxvY2F0aW9uIiwiaHJlZiIsInMiLCJzY2FsZSIsInoiLCJ6b29tIiwiZG9jdW1lbnRXaWR0aCIsInBvc2l0aW9uWCIsInBvc2l0aW9uWSIsInRhYiIsImFzc2lnbiIsImlubmVyV2lkdGgiLCJpc1ByZXNzQ29tbWFuZEtleSIsIk1BUkdJTiIsImNsYXNzTGlzdCIsImFkZCIsIm1hcmdpbiIsInBvaW50ZXJFdmVudHMiLCJhbGxFbG1zIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImZpbHRlciIsIml0ZW0iLCJjb250YWlucyIsIm1vdmVMYXllciIsInN0b3BQcm9wYWdhdGlvbiIsIkhUTUxJbWFnZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJoYXNNYXJnaW4iLCJ0YWtlTWFyZ2luIiwicGFyc2VJbnQiLCJnZXRDb21wdXRlZFN0eWxlIiwiY2FuY2VsIiwia2V5VXBIYW5kbGVyIiwiY2xpY2tFbGVtZW50IiwicHJldmVudERlZmF1bHQiLCJlbG0iLCJkaXNwbGF5IiwidmlzaWJpbGl0eSIsIkhUTUxFbGVtZW50IiwiZHVwVGFyZ2V0IiwiY2xvbmVOb2RlIiwidGFnTmFtZSIsInBhcnNlRmxvYXQiLCJvZmZzZXRUb3AiLCJsYXllck9mZnNldExlZnQiLCJvZmZzZXRMZWZ0IiwibGF5ZXJPZmZzZXRUb3AiLCJnZXRBdHRyaWJ1dGUiLCJzcmNVcmwiLCJkZXNjIiwidGV4dENvbnRlbnQiLCJ1bmRlZmluZWQiLCJleHRyYWN0T0dQSW1hZ2UiLCJpbWFnZSIsImRlZmF1bHRQb3NpdG9uIiwiZ3lhem9jYXB0dXJlV2luZG93IiwiZ3lhem9DYXB0dXJlU2VsZWN0ZWRBcmVhIiwiZ3lhem9TZWxlY3RFbG0iLCJneWF6b1dob2xlQ2FwdHVyZSIsImd5YXpvU25hcE9HUEltYWdlIiwibG9hZFN2Z05hbWUiLCJ0ZXh0Iiwic2hvcnRjdXRLZXkiLCJidG4iLCJpY29uRWxtIiwiZmV0Y2giLCJnZXRVUkwiLCJ0aGVuIiwicmVzIiwiaW5uZXJIVE1MIiwic3ZnVXJsIiwidGV4dEVsbSIsIm9ncEltYWdlVXJsIiwicHJldmlld0VsbSIsImkxOG4iLCJnZXRNZXNzYWdlIiwiZGVsZWdhdGUiLCJjc3MiLCJneWF6b0lkRnJvbVVybCIsImFkamFjZW50U3R5bGUiLCJ3YWl0Rm9yIiwiZmV0Y2hJbWFnZSIsImNyZWF0ZUxvYWRlciIsImxvYWRlciIsImNpcmNsZUljb24iLCJib3hTaGFkb3ciLCJiYWNrZ3JvdW5kQ29sb3IiLCJwYWRkaW5nIiwiYm94U2l6aW5nIiwiY3JlYXRlSW1hZ2VQcmV2aWV3IiwidXJsIiwiYm94U3R5bGUiLCJpbWciLCJtYXhXaWR0aCIsInByZXZpZXdJc1Nob3duIiwiaXNHeWF6b1VybCIsImNvbnRhaW5lciIsImxlYXZlZCIsIm9uTGVhdmUiLCJvZmZzZXRQYXJlbnQiLCJibG9iIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwib2Zmc2V0WSIsImNlbnRlclkiLCJmbG9vciIsImJvdHRvbSIsInJvdW5kIiwibWF4SGVpZ2h0IiwicmVjdEJvdHRvbSIsImNhbGxiYWNrIiwicmVzcG9uc2UiLCJneWF6b1VybCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsImltYWdlQmxvYlVybCIsInJlc3BvbnNlVHlwZSIsIm9ubG9hZCIsIkJsb2IiLCJ0eXBlIiwib25lcnJvciIsInNlbmQiLCJzdHIiLCJwYXJzZWRVcmwiLCJ0ZXN0IiwiaG9zdCIsInBhdGhuYW1lIiwic2xpY2UiLCJjb25kaXRpb24iLCJmbiIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiY3JlYXRlQnV0dG9uIiwic3RvcmFnZSIsInNoYWRvd0RPTUFwcGVuZFdpdGhDc3MiLCJjcmVhdGVPR1BCdXR0b25Pbk1lbnUiLCJSRU1PVkVfR1lBWk9NRU5VX0VWRU5UIiwiRXZlbnQiLCJzZW5kZXIiLCJjYXB0dXJlc1BhZ2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiQlVJTERfRVhURU5TSU9OX1RZUEUiLCJlcnJvciIsInRlYW0iLCJzdGF0dXMiLCJhbGVydCIsIm1lc3NhZ2UiLCJ0ZWFtTmFtZSIsIm5hbWUiLCJkaXNwYXRjaEV2ZW50IiwiaGlkZU1lbnUiLCJzZWxlY3RFbGVtZW50QnRuIiwic2VsZWN0QXJlYUJ0biIsIndpbmRvd0NhcHR1cmVCdG4iLCJ3aG9sZUNhcHR1cmVCdG4iLCJzbmFwT0dQSW1hZ2VCdG4iLCJteUltYWdlQnRuIiwiY2xvc2VCdG4iLCJjbG9zZUJ0bkljb24iLCJidXR0b25Db250YWluZXIiLCJ1cGdyYWRlTGluayIsIm9uQ29udGV4dG1lbnUiLCJvbmNlIiwiYnJvd3NlciIsIlNIT1dfVVBHUkFERV9MSU5LX0RBVEUiLCJEYXRlIiwiSElERV9VUEdSQURFX0xJTktfREFURSIsIm5vdyIsImhvdEtleSIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNsaWNrIiwic2V0dGluZ3MiLCJiZWhhdmlvciIsImdldCIsIm5vdGlmaWNhdGlvbkNvbnRhaW5lciIsIm5vdGlmaWNhdGlvbkJvZHkiLCJub3RpZmljYXRpb25Gb290ZXIiLCJjcmVhdGVUZXh0Tm9kZSIsInNob3dJbWFnZSIsInNob3dTdWdnZXN0IiwiaW1hZ2VQYWdlVXJsIiwiaW1hZ2VVcmwiLCJpbWFnZVdyYXBwZXIiLCJpbWFnZUNvbnRhaW5lciIsImltYWdlRWxlbSIsIm5hdHVyYWxXaWR0aCIsIm5hdHVyYWxIZWlnaHQiLCJ0b29sQ29udGFpbmVyIiwiaW1hZ2VCdXR0b24iLCJkcmF3QnV0dG9uIiwicGFyYW1zRm9yRHJhd1VUTSIsInN1Z2dlc3RDb3B5VXJsTWVzc2FnZTEiLCJzdWdnZXN0Q29weVVybE1lc3NhZ2UyIiwiYXBwZW5kIiwiZ29Ub1NldHRpbmdzIiwic2V0IiwiY29weVVybFN1cHBvcnRDbG9zZWQiLCJnb1RvU2V0dGluZ3NXcmFwcGVyIiwiZG9Ob3RTaG93VGhpc01lc3NhZ2UiLCJsb2FkaW5nRWxtIiwiaXNGaW5pc2giLCJzaGFkb3dET00iLCJhdHRhY2hTaGFkb3ciLCJtb2RlIiwic2hhZG93Um9vdCIsInNoYWRvd0RPTUFwcGVuZCIsImVsZW1lbnRzIiwiY3NzcGF0aCIsImxpbmsiLCJyZWwiLCJzZWxlY3RvcnMiLCJzaGFkb3dET01RdWVyeVNlbGVjdG9yQWxsIiwiZWxlbSIsIk1lc3NhZ2VMaXN0ZW5lciIsImNvbnN0cnVjdG9yIiwibGlzdGVuZXJzIiwiZnVuYyIsInB1c2giLCJsaXN0ZW4iLCJzZW5kTWVzc2FnZVRvQ29udGVudFNjcmlwdCIsInAiLCJ0YWJzIiwic2VuZE1lc3NhZ2UiLCJwb3NpdGlvblZhbHVlIiwic2V0UHJvcGVydHkiLCJkYXRhc2V0Iiwib3JpZ2luYWxQb3NpdGlvbiIsIm9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJpbnRlcnNlY3Rpb25SYXRpbyIsImRpc2Nvbm5lY3QiLCJ0aHJlc2hvbGQiLCJvYnNlcnZlIiwib2ciLCJicm93c2VySW5mbyIsIm91dGVyV2lkdGgiLCJpc01heGltdW0iLCJvdXRlckhlaWdodCIsInNjcmVlbiIsImF2YWlsSGVpZ2h0IiwiYXZhaWxXaWR0aCIsIndpbmRvd3MiLCJkZXZpY2VQaXhlbFJhdGlvIiwiTW91c2VFdmVudCIsIktleWJvYXJkRXZlbnQiLCJtYWMiLCJtZXRhS2V5Iiwia2V5SWRlbnRpZmllciIsImN0cmxLZXkiLCJvcmlnaW5hbEhUTUxIZWlnaHRWYWx1ZSIsIm9yaWdpbmFsQm9keUhlaWdodFZhbHVlIiwiaHRtbCIsImNzc1ZhbCIsIm1pbkhlaWdodCIsImh0bWxIZWlnaHQiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiYm9keUhlaWdodCIsIm1heCIsImNsaWVudEhlaWdodCIsIm9mZnNldEhlaWdodCIsInNjcm9sbEhlaWdodCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwib2Zmc2V0V2lkdGgiLCJzY3JvbGxXaWR0aCIsImZpeGVkRWxtcyIsInJlbW92ZVByb3BlcnR5Iiwib3ZlcmZsb3dZIiwibWFyZ2luUmlnaHQiLCJfdyIsInNjcm9sbEJhcldpZHRoIiwib2xkIiwiZGVmYXVsdE9wdGlvbnMiLCJjb250ZXh0TWVudSIsImZpbGVTaXplTGltaXQiLCJFeHRlbnNpb25TdG9yYWdlV3JhcHBlciIsImNoZWNrRW52IiwiZW5hYmxlZFN5bmNTdG9yYWdlIiwic3luYyIsInRyeVRvR2V0U3luY1N0YXR1cyIsInRyeVRvU2V0U3luY1N0YXR1cyIsInN0b3JhZ2VUeXBlIiwib25DaGFuZ2VkIiwiYWRkTGlzdGVuZXIiLCJyZW1vdmVMaXN0ZW5lciIsImhhc0xpc3RlbmVyIiwicmVzdWx0Iiwid2FpdEZvckNoZWNrRW52IiwiZiIsIlByb21pc2UiLCJyZXNvbHZlIiwidGltZXJJZCIsInN0b3JhZ2VPYmplY3QiLCJkZWZhdWx0VmFsdWUiLCJnZXRCeXRlc0luVXNlIiwiY2xlYXIiLCJnbG9iYWxUaGlzIiwiZXhwYW5kZXIiLCJub3RpZmljYXRpb24iLCJpbnNlcnRNZW51IiwiX19lbWJlZGVkR3lhem9Db250ZW50SlMiLCJvbk1lc3NhZ2VMaXN0ZW5lciIsImhvc3RuYW1lIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9uTWVzc2FnZSIsImJpbmQiLCJmaXJlZm94Il0sInNvdXJjZVJvb3QiOiIifQ==