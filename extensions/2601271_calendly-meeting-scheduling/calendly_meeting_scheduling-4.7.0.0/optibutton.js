"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["optibutton"],{

/***/ "./src/app/optibutton.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react-dom/client.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _client_core_contexts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/contexts/src/index.ts");
/* harmony import */ var _client_core_features_optibutton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/features/optibutton/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_syncstore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/syncstore/src/index.ts");
/* harmony import */ var _platform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/app/platform.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/apps/firefox/src/app/optibutton.tsx";









const start = async () => {
  const tab = await webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.sendMessage({
    action: 'getOwnTab'
  });
  const [dataStore, uiStore] = await (0,_client_core_syncstore__WEBPACK_IMPORTED_MODULE_5__.makeProxyStores)();
  if (tab.windowId === dataStore.getState().loginWindowId) {
    console.log('Button detected login flow window - not displaying optibutton');
    return;
  }
  const rootNode = document.createElement('div');
  document.body.appendChild(rootNode);
  const shadowRoot = rootNode.attachShadow({
    mode: 'closed'
  });
  const renderRoot = document.createElement('div');
  renderRoot.classList.add('calendly-opti-root');
  shadowRoot.appendChild(renderRoot);
  const reactRoot = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot)(renderRoot);
  reactRoot.render( /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(styled_components__WEBPACK_IMPORTED_MODULE_8__.StyleSheetManager, {
    target: shadowRoot,
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.UiStoreContext.Provider, {
      value: uiStore,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.DataStoreContext.Provider, {
        value: dataStore,
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_client_core_contexts__WEBPACK_IMPORTED_MODULE_2__.PlatformContext.Provider, {
          value: _platform__WEBPACK_IMPORTED_MODULE_6__.platform,
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_client_core_features_optibutton__WEBPACK_IMPORTED_MODULE_3__.OptiButton, {
            root: renderRoot,
            onReplaced: () => {
              reactRoot.unmount();
              rootNode.remove();
            },
            tabId: String(tab.id)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 39,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 35,
    columnNumber: 5
  }, undefined));
};
if (document.readyState === 'loading') {
  window.addEventListener('load', start);
} else {
  start();
}

/***/ }),

/***/ "../../libs/features/optibutton/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptiButton: () => (/* reexport safe */ _lib__WEBPACK_IMPORTED_MODULE_0__.OptiButton)
/* harmony export */ });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/features/optibutton/src/lib/index.tsx");


/***/ }),

/***/ "../../libs/features/optibutton/src/lib/dropCrosshairs.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DetermineClosestEdge: () => (/* binding */ DetermineClosestEdge),
/* harmony export */   DropCrosshairs: () => (/* binding */ DropCrosshairs)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/optibutton/src/lib/dropCrosshairs.tsx";





const DropCrosshairs = ({
  onSpotChange
}) => {
  const markerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(DropIndicator, {
      ref: markerRef
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(DropZone, {
      onDragOver: ev => {
        const loc = DetermineClosestEdge(ev);
        const marker = markerRef.current;
        if (!marker) {
          console.warn('Unable to find marker element for reposition!');
          return;
        }
        switch (loc.wall) {
          case 'left':
            marker.style.removeProperty('bottom');
            marker.style.removeProperty('right');
            marker.style.top = loc.spot + 'px';
            marker.style.left = '-18px';
            break;
          case 'right':
            marker.style.removeProperty('bottom');
            marker.style.removeProperty('left');
            marker.style.top = loc.spot + 'px';
            marker.style.right = '-18px';
            break;
          case 'top':
            marker.style.removeProperty('bottom');
            marker.style.removeProperty('right');
            marker.style.top = '-18px';
            marker.style.left = loc.spot + 'px';
            break;
          case 'bottom':
            marker.style.removeProperty('top');
            marker.style.removeProperty('right');
            marker.style.bottom = '-18px';
            marker.style.left = loc.spot + 'px';
            break;
        }
        ev.preventDefault();
        onSpotChange(loc);
        return false;
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};
function DetermineClosestEdge(mouseLoc) {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const leftOrRight = mouseLoc.clientX > width / 2 ? 'right' : 'left';
  const topOrBottom = mouseLoc.clientY > height / 2 ? 'bottom' : 'top';
  const distanceLeftRight = leftOrRight === 'left' ? mouseLoc.clientX : width - mouseLoc.clientX;
  const distanceTopBottom = topOrBottom === 'top' ? mouseLoc.clientY : height - mouseLoc.clientY;
  let side = leftOrRight;
  let pos = mouseLoc.clientY;
  if (distanceLeftRight > distanceTopBottom) {
    side = topOrBottom;
    pos = mouseLoc.clientX;
  }
  return {
    wall: side,
    spot: pos
  };
}
const DropIndicator = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "dropCrosshairs__DropIndicator",
  componentId: "vvd1l0-0"
})(["border-radius:50%;width:36px;height:36px;position:fixed;background:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL2);
const DropZone = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "dropCrosshairs__DropZone",
  componentId: "vvd1l0-1"
})(["position:fixed;left:0px;top:0px;width:100%;height:100%;background-color:rgba(0,0,0,0);z-index:calc(100000000 - 1);border:10px solid ", ";box-sizing:border-box;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL3);

/***/ }),

/***/ "../../libs/features/optibutton/src/lib/index.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptiButton: () => (/* binding */ OptiButton)
/* harmony export */ });
/* harmony import */ var _lifecycle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/features/optibutton/src/lib/lifecycle.tsx");
/* harmony import */ var _optibutton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/features/optibutton/src/lib/optibutton.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/optibutton/src/lib/index.tsx";



function OptiButton(props) {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_lifecycle__WEBPACK_IMPORTED_MODULE_0__.Lifecycle, {
    name: "optibutton_singleton",
    root: props.root,
    onLoad: async (previous, self) => {
      var _document$getElementB;
      previous.forEach(prev => prev.setAttribute('shouldunload', 'true'));
      // Force remove elements with the legacy OptiButton id
      (_document$getElementB = document.getElementById('calendly-opti-root')) == null || _document$getElementB.remove();

      // After courtesy period, force unload existing (firefox)
      window.setTimeout(() => {
        previous.forEach(p => {
          p.remove();
        });
      }, 100);
    },
    onSignal: async mutations => {
      if (mutations === 'removed') {
        props.onReplaced();
        return 'shouldunload';
      }
      for (const m of mutations) {
        if (m.attributeName === 'shouldunload') {
          props.onReplaced();
          return 'shouldunload';
        }
      }
      return 'loaded';
    },
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_optibutton__WEBPACK_IMPORTED_MODULE_1__.OptiButton, {
      tabId: props.tabId
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 5
  }, this);
}

/***/ }),

/***/ "../../libs/features/optibutton/src/lib/lifecycle.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Lifecycle: () => (/* binding */ Lifecycle),
/* harmony export */   LifecycleContext: () => (/* binding */ LifecycleContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/optibutton/src/lib/lifecycle.tsx";


const LifecycleContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)('pending');

// Handle lifecycle events for this content_script.
const Lifecycle = ({
  name,
  root,
  children,
  onLoad,
  onSignal
}) => {
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('pending');
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const lifecycleName = `calendly-lifecycle-${name}`;
    const previous = Array.from(document.querySelectorAll(`.${lifecycleName}`));
    onLoad(previous, root).then(() => {
      setState('loaded');
    });
    root.classList.add(lifecycleName);
    const intervalId = setInterval(() => {
      const b = typeof browser === 'undefined' ? chrome : browser;
      let id = undefined;
      if (typeof b === 'object' && 'runtime' in b) {
        id = b.runtime.id;
      }
      if (typeof id === 'undefined') {
        clearInterval(intervalId);
        onSignal('removed');
      }
    }, 1000);

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver((mutationList, observer) => {
      onSignal(mutationList);
    });
    observer.observe(root, {
      attributes: true,
      childList: true,
      subtree: true
    });
    return () => {
      clearInterval(intervalId);
      root.classList.remove(lifecycleName);
      observer.disconnect();
    };
  }, []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(LifecycleContext.Provider, {
    value: state,
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 65,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "../../libs/features/optibutton/src/lib/optibutton.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptiButton: () => (/* binding */ OptiButton),
/* harmony export */   getDistance: () => (/* binding */ getDistance)
/* harmony export */ });
/* harmony import */ var _calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/icons/index.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/types/src/index.ts");
/* harmony import */ var _dropCrosshairs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/features/optibutton/src/lib/dropCrosshairs.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/optibutton/src/lib/optibutton.tsx";













// Using the existing AnalyticsEvent enum from the shared library causes console warnings
const popupType = 'floating_button_guide';

/**
 * Our position on screen can always be described by two properties:
 * 1. The wall we are riding
 * 2. The length along that wall we are positioned, following normal
 *    screen conventions
 *         0     top     max
 *          -------------->
 *       0 |               | 0
 *         |               |
 *  left   |               | right
 *         |               |
 *     max v               v max
 *          -------------->
 *         0    bottom   max
 *
 * For a smooth experience, we explicitly *AVOID* rerendering on
 * every mousemove event.  Instead we directly modify styles on the
 * container element to properly position or highlight or animate.
 *
 * However - jumping between walls is distinct enough that we have
 * to restyle most properties, and it makes sense to just rerender.
 *
 * In this case, we configure a new WallPoint for the desired spot
 * on the new wall, and update our state to trigger a render.
 *
 * This has the handy side effect of allowing us to easily store
 * and load a position if the user has customized it.
 *
 * Once the new position has been rendered, we modify styles directly
 * again until we jump to a different wall.
 *
 */

const OptiButton = props => {
  const [hasTracked, setHasTracked] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [dimensions, setDimensions] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const {
    dataStore,
    uiStore
  } = (0,_client_core_store__WEBPACK_IMPORTED_MODULE_6__.useCombinedStore)();
  const storeSpot = (0,zustand__WEBPACK_IMPORTED_MODULE_10__.useStore)(dataStore, state => state.wallspot);
  const [savedSpot, setSavedSpot] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(storeSpot);
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    // Abuse the default storage partitioning for frames in modern browsers to make this reasonable

    const url = new URL(window.location.href);
    const host = url.host;
    const path = url.pathname;
    const existingHost = localStorage.getItem(host);
    const existingPath = localStorage.getItem(host + path);
    if (existingPath) {
      setSavedSpot(JSON.parse(existingPath));
      return;
    }
    if (existingHost) {
      setSavedSpot(JSON.parse(existingHost));
      return;
    }
  }, []);
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.usePlatform)();
  const [state, changeSettings] = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.useSettings)(state => {
    return {
      calendlyButtonEnabled: state.calendlyButtonEnabled,
      showFloatingButtonPopup: state.showFloatingButtonPopup
    };
  });
  const calendlyButtonEnabled = state == null ? void 0 : state.calendlyButtonEnabled;
  const showFloatingButtonPopup = state == null ? void 0 : state.showFloatingButtonPopup;
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const closeRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const dragElemRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const newLocationRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(storeSpot);
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    // Prevent animations as the user changes tabs after moving
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
      window.setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.removeProperty('transition');
        }
      }, 100);
    }
  }, [savedSpot.wall]);
  const addAgendaFrame = (0,zustand__WEBPACK_IMPORTED_MODULE_10__.useStore)(uiStore, state => state.addAgendaFrame);
  const addPopupFrame = (0,zustand__WEBPACK_IMPORTED_MODULE_10__.useStore)(uiStore, s => s.addPopupFrame);
  const [dragging, setDragging] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const frames = (0,zustand__WEBPACK_IMPORTED_MODULE_10__.useStore)(uiStore, state => state.frames);
  const existingFrames = frames.filter(f => f.tabId === String(props.tabId) && (f.role === 'sidebar' || f.role === 'agenda_view'));
  const isSidebarOpen = existingFrames.length > 0;
  const shouldShowButton = !isSidebarOpen && calendlyButtonEnabled;
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (!shouldShowButton) return;
    const onMouseMove = ev => {
      const container = containerRef.current;
      const close = closeRef.current;
      if (!container || !close) return;
      const containerPosition = container.getBoundingClientRect();
      const distance = getDistance(containerPosition.x + containerPosition.width / 2, containerPosition.y + containerPosition.height / 2, ev.clientX, ev.clientY);
      if (distance < 100) {
        close.classList.remove('visible');
        container.classList.add('mousenear');
      } else {
        close.classList.remove('visible');
        container.classList.remove('mousenear');
      }
    };
    const onResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    return function () {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, [savedSpot.wall, shouldShowButton]);
  const trackAnalytics = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((event, properties) => {
    platform.analytics.track(event, properties);
  }, [platform.analytics]);
  if (isSidebarOpen) {
    return null;
  }
  const onClose = () => {
    if (showFloatingButtonPopup) {
      addPopupFrame(String(props.tabId), {
        type: popupType,
        frameStyle: {
          top: '12px',
          right: '78px',
          position: 'fixed'
        },
        popupStyle: {
          width: '430px',
          top: '11px'
        },
        trianglePosition: 'top'
      });
    }
    changeSettings({
      calendlyButtonEnabled: false
    });
    trackAnalytics(_client_core_types__WEBPACK_IMPORTED_MODULE_7__.AnalyticsEvent.FloatingButtonConfigure, {
      setting: `dismiss`
    });
  };
  const onNewPosition = ws => {
    const url = new URL(window.location.href);
    const host = url.host;
    const path = url.pathname;
    localStorage.setItem(host, JSON.stringify(ws));
    localStorage.setItem(host + path, JSON.stringify(ws));
    setSavedSpot(ws);
  };
  const handleOnClick = () => {
    if (!isSidebarOpen) {
      addAgendaFrame(String(props.tabId), {
        roleData: {
          source: 'floating button',
          drawerStack: []
        }
      });
    }
  };
  if (!shouldShowButton) return null;
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(DragElement, {
      ref: dragElemRef,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(DragContainer, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Logo, {
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_client_core_assets__WEBPACK_IMPORTED_MODULE_4__.calendlyLogo, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 232,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 231,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 230,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 229,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(OptiContainer, {
      dimensions: dimensions,
      ref: containerRef,
      draggable: true,
      onDragStart: ev => {
        setDragging(true);
        if (!dragElemRef.current) return;
        ev.dataTransfer.setDragImage(dragElemRef.current, 0, 0);
        ev.dataTransfer.effectAllowed = 'move';
      },
      onDragEnd: ev => {
        setDragging(false);
        const loc = newLocationRef.current;
        onNewPosition(loc);
        ev.preventDefault();
        window.setTimeout(() => {
          if (!containerRef.current) {
            return;
          }
          // Delete override to allow transition properties on mousenear/mouseover
          containerRef.current.style.removeProperty('transition');
        }, 25);
        if (!hasTracked) {
          trackAnalytics(_client_core_types__WEBPACK_IMPORTED_MODULE_7__.AnalyticsEvent.FloatingButtonConfigure, {
            setting: `reposition`,
            coordinates: `wall: ${loc.wall}, spot:${loc.spot}`
          });
          setHasTracked(true);
        }
        return false;
      },
      wallspot: savedSpot,
      children: dragging ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_dropCrosshairs__WEBPACK_IMPORTED_MODULE_8__.DropCrosshairs, {
        onSpotChange: target => {
          newLocationRef.current = boundWallspot(target, dimensions);
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 271,
        columnNumber: 11
      }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Close, {
          ref: closeRef,
          draggable: false,
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(CloseButton, {
            onClick: onClose,
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_1__.CloseMiniIcon, {
              color: "#000"
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 280,
              columnNumber: 17
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 279,
            columnNumber: 15
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 278,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(LogoContainer, {
          draggable: false,
          wallspot: savedSpot,
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Logo, {
            draggable: false,
            onClick: handleOnClick,
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_client_core_assets__WEBPACK_IMPORTED_MODULE_4__.calendlyLogo, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 286,
              columnNumber: 17
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 285,
            columnNumber: 15
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Divider, {
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_client_core_assets__WEBPACK_IMPORTED_MODULE_4__.GrabIcon, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 290,
              columnNumber: 17
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 289,
            columnNumber: 15
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 284,
          columnNumber: 13
        }, undefined)]
      }, void 0, true)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 236,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};
const Divider = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "optibutton__Divider",
  componentId: "kg9shj-0"
})(["cursor:grab;width:10px;height:26px;"]);
const Close = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "optibutton__Close",
  componentId: "kg9shj-1"
})(["display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;visibility:hidden;"]);
const CloseButton = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_11__["default"])(_calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_0__.BareButton).withConfig({
  displayName: "optibutton__CloseButton",
  componentId: "kg9shj-2"
})(["border-radius:50%;transition:all 0.25s ease-in-out;width:32px;height:32px;border:none;outline:none;padding:8px;transform:scale(0);background-color:rgb(255,255,255);box-shadow:", ";cursor:pointer;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.overlayShadow);
const OptiContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "optibutton__OptiContainer",
  componentId: "kg9shj-3"
})(["user-select:none;box-sizing:border-box;align-items:center;z-index:99999999999;opacity:0.3;position:fixed;display:flex;gap:8px;", " &:hover{opacity:1;", " ", "{visibility:visible;}", "{transform:scale(1);}}&.mousenear{opacity:1;}"], props => {
  const target = boundWallspot(props.wallspot, props.dimensions);
  if (target.wall === 'top') {
    return (0,styled_components__WEBPACK_IMPORTED_MODULE_11__.css)(["top:-26px;left:", "px;flex-direction:column-reverse;transition:top 0.25s,opacity 0.25s;width:45px;max-width:45px;min-width:45px;height:113px;max-height:113px;min-height:113px;"], target.spot);
  }
  if (target.wall === 'right') {
    return (0,styled_components__WEBPACK_IMPORTED_MODULE_11__.css)(["top:", "px;left:calc(100% - 86px);flex-direction:row;transition:left 0.25s,opacity 0.25s;width:141px;max-width:141px;min-width:141px;height:45px;max-height:45px;min-height:45px;"], target.spot);
  }
  if (target.wall === 'bottom') {
    return (0,styled_components__WEBPACK_IMPORTED_MODULE_11__.css)(["top:calc(100% - 86px);left:", "px;flex-direction:column;transition:top 0.25s,opacity 0.25s;width:45px;max-width:45px;min-width:45px;height:113px;max-height:113px;min-height:113px;"], target.spot);
  }
  if (target.wall === 'left') {
    return (0,styled_components__WEBPACK_IMPORTED_MODULE_11__.css)(["top:", "px;left:-28px;flex-direction:row-reverse;transition:left 0.25s,opacity 0.25s;"], target.spot);
  }
  return '';
}, props => {
  if (props.wallspot.wall === 'top') {
    return (0,styled_components__WEBPACK_IMPORTED_MODULE_11__.css)(["top:0px;"]);
  }
  if (props.wallspot.wall === 'right') {
    return (0,styled_components__WEBPACK_IMPORTED_MODULE_11__.css)(["left:calc(100% - 113px);"]);
  }
  if (props.wallspot.wall === 'bottom') {
    return (0,styled_components__WEBPACK_IMPORTED_MODULE_11__.css)(["top:calc(100% - 113px);"]);
  }
  if (props.wallspot.wall === 'left') {
    return (0,styled_components__WEBPACK_IMPORTED_MODULE_11__.css)(["left:0px;"]);
  }
  return '';
}, Close, CloseButton);
const LogoContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "optibutton__LogoContainer",
  componentId: "kg9shj-4"
})(["display:flex;gap:12px;", " padding:8px;align-items:center;background-color:rgb(255,255,255);box-shadow:", ";cursor:pointer;", "{transform:", ";", ";}"], props => {
  if (props.wallspot.wall === 'top') {
    return `
        flex-direction: column-reverse;
        border-radius: 0px 0px 40px 40px;
      `;
  }
  if (props.wallspot.wall === 'right') {
    return `
        flex-direction: row;
        border-radius: 40px 0px 0px 40px;
      `;
  }
  if (props.wallspot.wall === 'bottom') {
    return `
        flex-direction: column;
        border-radius: 40px 40px 0px 0px;
      `;
  }
  if (props.wallspot.wall === 'left') {
    return `
        flex-direction: row-reverse;
        border-radius: 0px 40px 40px 0px;
      `;
  }
  return '';
}, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.cardShadow, Divider, props => props.wallspot.wall === 'top' || props.wallspot.wall === 'bottom' ? 'rotate(90deg)' : 'rotate(0deg)', props => props.wallspot.wall === 'top' ? 'padding-left: 8px' : props.wallspot.wall === 'bottom' && 'padding-right: 20px');
const DragContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "optibutton__DragContainer",
  componentId: "kg9shj-5"
})(["background-color:white;border-radius:50%;"]);
const DragElement = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "optibutton__DragElement",
  componentId: "kg9shj-6"
})(["position:fixed;top:0;left:0;transform:translate(-100%,-100%);"]);
const Logo = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "optibutton__Logo",
  componentId: "kg9shj-7"
})(["width:32px;height:32px;"]);
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
function boundWallspot(ws, dimensions) {
  const target = Object.assign({}, ws);
  if (target.spot < 0) {
    target.spot = 0;
  }
  if (target.wall === 'left' || target.wall === 'right') {
    if (target.spot > dimensions.height - 45) {
      target.spot = dimensions.height - 45;
    }
  } else {
    if (target.spot > dimensions.width - 45) {
      target.spot = dimensions.width - 45;
    }
  }
  return target;
}

/***/ }),

/***/ "../../node_modules/react-dom/client.js":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var m = __webpack_require__("../../node_modules/react-dom/index.js");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_webextension-polyfill_dist_browser-polyfill_js","vendors-node_modules_airbrake_browser_esm_index_js-node_modules_axios-retry_index_js-node_mod-f38669","vendors-node_modules_axios_index_js-node_modules_lodash_isequal_index_js-node_modules_normali-0088ef","vendors-_calendly_ui_node_modules_classnames_index_js-node_modules_nx_js_node_modules_babel_r-b95540","default-libs_platform_src_index_ts","default-libs_syncstore_src_index_ts","default-src_app_platform_tsx","default-libs_assets_src_index_ts-libs_hooks_src_index_ts-_calendly_ui_dist_components_bare-bu-5822a1"], () => (__webpack_exec__("./src/app/optibutton.tsx")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);