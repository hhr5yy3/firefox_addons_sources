"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["default-libs_features_gong_src_index_ts"],{

/***/ "../../libs/features/gong/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GongCompose: () => (/* reexport safe */ _lib_GongCompose__WEBPACK_IMPORTED_MODULE_1__.GongCompose),
/* harmony export */   GongComposeButton: () => (/* reexport safe */ _lib_button__WEBPACK_IMPORTED_MODULE_0__.GongComposeButton),
/* harmony export */   GongComposePopover: () => (/* reexport safe */ _lib_popover__WEBPACK_IMPORTED_MODULE_2__.GongComposePopover)
/* harmony export */ });
/* harmony import */ var _lib_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/features/gong/src/lib/button/index.tsx");
/* harmony import */ var _lib_GongCompose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/features/gong/src/lib/GongCompose.ts");
/* harmony import */ var _lib_popover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/features/gong/src/lib/popover/index.tsx");




/***/ }),

/***/ "../../libs/features/gong/src/lib/GongCompose.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GongCompose: () => (/* binding */ GongCompose)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/theme/src/index.ts");


// eslint-disable-next-line



class GongCompose {
  constructor(el, isFirefox) {
    this.id = void 0;
    this.button = void 0;
    this.etCount = void 0;
    this.listVisible = void 0;
    this.popoverUrl = void 0;
    this.clickedOutside = false;
    this.buttonShowPending = false;
    this.el = el;
    this.isFirefox = isFirefox;
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.listVisible = false;
    this.showButton();
    this.popoverUrl = `${webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.getURL('/pages/iframe_gongPopover.html')}`;
    this.etCount = 3;
  }
  popoverDefaultHeight() {
    return 469;
  }
  element() {
    return this.el;
  }
  exists() {
    return document.body.contains(this.el);
  }
  showingPopover() {
    return this.popover().hasClass(this.id);
  }
  popover(make = true) {
    let popover = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#gongPopover');
    if (popover.length === 0 && make) {
      const newPopover = document.createElement('iframe');
      newPopover.src = this.popoverUrl;
      newPopover.id = 'gongPopover';
      newPopover.style.border = '0';
      newPopover.style.position = 'absolute';
      newPopover.style.top = '0px';
      newPopover.style.left = '0px';
      newPopover.style.width = '230px';
      newPopover.style.height = `${this.popoverDefaultHeight()}px`;
      newPopover.style.backgroundColor = 'transparent';
      newPopover.style.zIndex = '99999';
      newPopover.style.display = 'none';
      newPopover.style.boxShadow = _client_core_theme__WEBPACK_IMPORTED_MODULE_3__.composePopoverShadow;
      newPopover.style.borderRadius = '8px';
      newPopover.style.overflow = 'hidden';
      document.body.appendChild(newPopover);
      popover = jquery__WEBPACK_IMPORTED_MODULE_0___default()(newPopover);
    }
    return popover;
  }
  showPopover(etCount) {
    this.etCount = etCount;
    this.popover().addClass(this.id);
    this.popover().attr('data-compose-id', this.id);
    this.popover().css('display', 'block');
    this.adjustPopover();
  }
  handleWindowResize() {
    this.adjustPopover();
  }
  handleWindowScroll() {
    this.adjustPopover();
  }
  createShareLink(link, text) {
    const anchorElement = document.createElement('a');
    anchorElement.innerHTML = text.length === 0 ? link : text;
    anchorElement.href = link;
    anchorElement.target = '_blank';
    return anchorElement;
  }
  insertIntoCompose(lastRange, link) {
    const insertHTML = this.createShareLink(link, link).outerHTML;
    // We rely on Gong.io to complete this process on their end.  They are expected
    // to handle this message and insert the payload.
    window.postMessage({
      type: 'email-composer-inject',
      html: insertHTML
    }, '*');
  }
  adjustPopover() {
    let location = undefined;
    const height = this.calculatedPopoverHeight();
    if (this.button) {
      location = this.button.getBoundingClientRect();
      this.popover().css('top', `${location.top - height - 12}px`);
      this.popover().css('left', `${location.left - 50}px`);
      this.popover().css('height', height + 'px');
    }
  }
  calculatedPopoverHeight() {
    const defaultHeight = this.popoverDefaultHeight();
    const etHeight = 97 + 8;
    let count = this.etCount;
    count = count < 0 ? 0 : count;
    let height = defaultHeight;
    if (count < 3) {
      height = defaultHeight - (3 - count) * etHeight;
    }
    return height;
  }
  hidePopover() {
    if (this.showingPopover()) {
      this.popover().removeClass(this.id);
      this.popover().removeAttr('data-compose-id');
      this.popover().css('display', 'none');
    }
  }
  showButton() {
    const toolbar = this.el.querySelector('.mail-editor-window__footer div[role="toolbar"][aria-label="Extras"]');
    if (toolbar) {
      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.justifyContent = 'center';
      buttonContainer.style.alignItems = 'center';
      toolbar.appendChild(buttonContainer);
      const buttonFrame = document.createElement('iframe');
      buttonFrame.id = `button-frame-${this.id}`;
      buttonFrame.tabIndex = 0;
      buttonFrame.src = `${webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.getURL('/pages/iframe_gongButton.html')}?composeid=${this.id}`;
      buttonFrame.style.zIndex = '999999';
      buttonFrame.style.border = '0';
      buttonFrame.style.display = 'block';
      buttonFrame.style.height = '28px';
      buttonFrame.style.width = '28px';
      buttonFrame.style.overflow = 'hidden';
      buttonContainer.appendChild(buttonFrame);
      this.button = buttonFrame;
      if (this.isFirefox) {
        // Firefox focuses on the iframe before going to the next element inside the iframe.
        // So we prevent this behavior and manually focus the next element inside it.
        const prevElement = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_2__.getPrevSibling)(buttonContainer);
        if (prevElement) {
          prevElement.addEventListener('keydown', e => {
            if (e.code === 'Tab' && !e.shiftKey) {
              var _buttonFrame$contentW;
              e.preventDefault();
              (_buttonFrame$contentW = buttonFrame.contentWindow) == null || _buttonFrame$contentW.postMessage({
                action: 'focusGongButton'
              }, '*');
            }
          });
        }
      }
    }
  }
  hideButton() {
    if (this.button) {
      this.button.style.display = 'none';
    }
  }
  handleClick(ev) {
    if (this.showingPopover()) {
      this.adjustPopover();
      if (this.popover().get()[0].contains(ev.target)) {
        return;
      }
      this.clickedOutside = true;
    }
  }
  cleanup() {
    this.hideButton();
    this.hidePopover();
    if (this.button) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.button).remove();
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#gongPopover').remove();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).removeClass('calendly-handled');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).closest('.calendly-handled').removeClass('calendly-handled');
  }
}

/***/ }),

/***/ "../../libs/features/gong/src/lib/button/index.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GongComposeButton: () => (/* binding */ GongComposeButton)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/types/src/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/gong/src/lib/button/index.tsx";



// eslint-disable-next-line






const GongComposeButton = props => {
  const store = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.DataStoreContext);
  const user = (0,zustand__WEBPACK_IMPORTED_MODULE_7__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_4__.userSelector);
  const userLoaded = (0,zustand__WEBPACK_IMPORTED_MODULE_7__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_4__.userLoadedSelector);
  const updatePopover = (0,zustand__WEBPACK_IMPORTED_MODULE_7__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_4__.updatePopoverDataSelector);
  const popoverComposeId = (0,zustand__WEBPACK_IMPORTED_MODULE_7__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_4__.gongPopoverComposeIdSelector);
  const showPopover = (0,zustand__WEBPACK_IMPORTED_MODULE_7__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_4__.gongShowingComposePopoverSelector);
  const fetchEts = (0,zustand__WEBPACK_IMPORTED_MODULE_7__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_4__.fetchEventTypesSelector);
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_3__.usePlatform)();
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const handleMesssage = msg => {
      var _msg$data;
      if (((_msg$data = msg.data) == null ? void 0 : _msg$data.action) === 'focusGongButton') {
        var _containerRef$current;
        (_containerRef$current = containerRef.current) == null || _containerRef$current.focus();
      }
    };
    window.addEventListener('message', handleMesssage);
    return () => {
      window.removeEventListener('message', handleMesssage);
    };
  }, []);
  const onClick = () => {
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_5__.AnalyticsEvent.GongOpen);
    if (userLoaded && user) {
      platform.calendlyApi.getLoginStatus().then(res => {
        if (!res.loggedIn) {
          updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.IntegrationId.gongv1, {
            showPopover: false,
            popoverComposeId: undefined
          });
          platform.flow.sidebar();
        }
      });
      if (!showPopover) {
        fetchEts();
      }
      if (props.id === popoverComposeId) {
        updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.IntegrationId.gongv1, {
          showPopover: !showPopover,
          popoverComposeId: props.id
        });
      } else {
        updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.IntegrationId.gongv1, {
          showPopover: true,
          popoverComposeId: props.id
        });
      }
    } else {
      platform.flow.sidebar();
      platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_5__.AnalyticsEvent.GongOpenSidebar);
    }
  };
  const onKeyDown = e => {
    if (showPopover && e.code === 'Tab') {
      if (e.shiftKey) {
        updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.IntegrationId.gongv1, {
          showPopover: false
        });
      } else {
        e.preventDefault();
        window.parent.postMessage({
          action: 'focusGongPopover'
        }, '*');
      }
    }
    if (platform.info.name === 'firefox') {
      // Firefox focuses on the iframe before going to the previous element.
      // So we prevent this behavior and manually focus the previous element.
      if (e.code === 'Tab' && e.shiftKey) {
        e.preventDefault();
        window.parent.postMessage({
          action: 'focusGongButtonPrevElement',
          composeId: props.id
        }, '*');
      }
    }
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(Container, {
    "data-testid": 'gong-compose-button',
    ref: containerRef,
    onClick: onClick,
    onKeyDown: onKeyDown,
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(Logo, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 105,
    columnNumber: 5
  }, undefined);
};
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].button.withConfig({
  displayName: "button__Container",
  componentId: "sc-1imty6z-0"
})(["position:relative;display:flex;flex-direction:row;justify-content:space-evenly;align-items:center;box-sizing:border-box;outline:none;padding:0px;width:100vw;height:100vh;border-radius:50%;border:none;cursor:pointer;user-select:none;overflow:hidden;background:inherit;&:focus,&:hover{background:", ";}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL3);
const Logo = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.calendlyLogo).withConfig({
  displayName: "button__Logo",
  componentId: "sc-1imty6z-1"
})(["width:20px;height:20px;flex-grow:1;"]);

/***/ }),

/***/ "../../libs/features/gong/src/lib/popover/eventTypeItem/eventTypeItem.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventTypeItem: () => (/* binding */ EventTypeItem)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var _client_core_shared_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/shared/components/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../libs/types/src/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/gong/src/lib/popover/eventTypeItem/eventTypeItem.tsx";













const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "eventTypeItem__Container",
  componentId: "h7nach-0"
})(["display:flex;flex-direction:row;box-sizing:border-box;justify-content:space-between;border:1px solid ", ";border-radius:4px;box-shadow:", ";height:95px;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey3, _client_core_theme__WEBPACK_IMPORTED_MODULE_8__.composePopoverItemShadow);
const ColorBar = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "eventTypeItem__ColorBar",
  componentId: "h7nach-1"
})(["width:5px;border-radius:4px 0px 0px 4px;background:", ";"], props => props.color);
const Body = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "eventTypeItem__Body",
  componentId: "h7nach-2"
})(["display:flex;flex-direction:column;flex:1;min-width:100px;"]);
const TitleContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "eventTypeItem__TitleContainer",
  componentId: "h7nach-3"
})(["display:flex;justify-content:space-between;flex:1;padding:4px 8px 0 12px;"]);
const Title = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].span.withConfig({
  displayName: "eventTypeItem__Title",
  componentId: "h7nach-4"
})(["display:block;min-height:18px;max-width:200px;padding:0 8px 0 0;line-height:17px;font-size:14px;color:", ";overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorSecondary1);
const SubTitle = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].span.withConfig({
  displayName: "eventTypeItem__SubTitle",
  componentId: "h7nach-5"
})(["display:flex;align-items:center;padding:8px 7px 8px 12px;line-height:15px;font-size:12px;color:", ";"], _client_core_theme__WEBPACK_IMPORTED_MODULE_8__.textColorL1_5);
const InternalNote = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_11__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_3__.InternalNoteIcon_2021).attrs(props => ({
  alt: 'internal note',
  draggable: false
})).withConfig({
  displayName: "eventTypeItem__InternalNote",
  componentId: "h7nach-6"
})(["position:relative;top:3px;margin-left:7px;height:12px;"]);
const ButtonContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "eventTypeItem__ButtonContainer",
  componentId: "h7nach-7"
})(["display:flex;border-top:1px solid ", ";color:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey4, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorSecondary2);
const DefaultButton = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].button.withConfig({
  displayName: "eventTypeItem__DefaultButton",
  componentId: "h7nach-8"
})(["box-sizing:border-box;padding:8px 4px;font-size:12px;border:none;outline:none;background:inherit;flex-grow:1;text-align:center;cursor:pointer;white-space:nowrap;&:hover,&:focus{text-decoration:underline;}"]);
const InsertLinkButton = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_11__["default"])(DefaultButton).withConfig({
  displayName: "eventTypeItem__InsertLinkButton",
  componentId: "h7nach-9"
})(["border-right:1px solid ", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey4);
const AddTimesButton = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_11__["default"])(DefaultButton).withConfig({
  displayName: "eventTypeItem__AddTimesButton",
  componentId: "h7nach-10"
})([""]);
const Tooltip = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.attrs(props => ({
  'data-cui-tooltip': props.text,
  className: `${props.text && props.text.length >= 53 ? 'wrap' : ''} small`
})).withConfig({
  displayName: "eventTypeItem__Tooltip",
  componentId: "h7nach-11"
})([""]);
const EventTypeItem = props => {
  const composeId = (0,qs__WEBPACK_IMPORTED_MODULE_1__.parse)(window.location.search, {
    ignoreQueryPrefix: true
  })['id'];
  const store = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_client_core_store__WEBPACK_IMPORTED_MODULE_7__.DataStoreContext);
  const updatePopover = (0,zustand__WEBPACK_IMPORTED_MODULE_12__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_7__.updatePopoverDataSelector);
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.usePlatform)();
  const {
    id,
    name,
    color,
    duration,
    kind_description: kindDescription,
    booking,
    internal_note: internalNote
  } = props.eventType;
  const onAddTimesPress = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_4__.debounce)(() => {
    updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_7__.IntegrationId.gongv1, {
      showPopover: false
    });
    platform.flow.sidebarAddTimes({
      etId: id,
      source: 'gong'
    });
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_9__.AnalyticsEvent.GongAddTimes, {
      id: id,
      url: booking.url,
      index: String(props.index)
    });
    // Track for legacy accounting
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_9__.AnalyticsEvent.SidebarEmailEmbedAttempt, {
      source: 'gong'
    });
  }, 1500, true);
  const onInsertLinkPress = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_4__.debounce)(() => {
    var _window$top;
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_9__.AnalyticsEvent.GongCopyLink, {
      id: id,
      url: booking.url,
      index: String(props.index)
    });
    (_window$top = window.top) == null || _window$top.postMessage({
      action: 'insert',
      text: booking.url,
      composeId
    }, '*');
  }, 500, true);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(Container, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(ColorBar, {
      color: color
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 191,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(Body, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(TitleContainer, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(Title, {
          children: name
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 194,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_client_core_shared_components__WEBPACK_IMPORTED_MODULE_6__.EditAction, {
          eventType: props.eventType,
          source: "gong"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 195,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 193,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(SubTitle, {
        children: [`${duration} • ${kindDescription}`, internalNote && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(Tooltip, {
          text: internalNote,
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(InternalNote, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 201,
            columnNumber: 15
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 200,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 197,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(ButtonContainer, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(InsertLinkButton, {
          onClick: onInsertLinkPress,
          children: "Insert link"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 206,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(AddTimesButton, {
          onClick: onAddTimesPress,
          children: "Offer time slots"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 209,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 205,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 190,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "../../libs/features/gong/src/lib/popover/index.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GongComposePopover: () => (/* binding */ GongComposePopover)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/types/src/index.ts");
/* harmony import */ var _eventTypeItem_eventTypeItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/features/gong/src/lib/popover/eventTypeItem/eventTypeItem.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/gong/src/lib/popover/index.tsx";











const GongComposePopover = () => {
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_4__.usePlatform)();
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const {
    dataStore,
    uiStore
  } = (0,_client_core_store__WEBPACK_IMPORTED_MODULE_5__.useCombinedStore)();
  const newSidebarFlag = (0,zustand__WEBPACK_IMPORTED_MODULE_9__.useStore)(uiStore, state => state.defaultView) === 'agenda_view';
  const recentlyUsedEts = (0,zustand__WEBPACK_IMPORTED_MODULE_9__.useStore)(dataStore, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.recentlyUsedEventTypesSelector);
  const updatePopover = (0,zustand__WEBPACK_IMPORTED_MODULE_9__.useStore)(dataStore, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.updatePopoverDataSelector);
  const popoverComposeId = (0,zustand__WEBPACK_IMPORTED_MODULE_9__.useStore)(dataStore, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.gongPopoverComposeIdSelector);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const handleMesssage = msg => {
      var _msg$data;
      if (((_msg$data = msg.data) == null ? void 0 : _msg$data.action) === 'focusGongPopover') {
        (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_3__.focusFirstChild)(containerRef.current);
      }
    };
    window.addEventListener('message', handleMesssage);
    return () => {
      window.removeEventListener('message', handleMesssage);
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    let firstEl;
    let lastEl;
    const handleFirstEl = e => {
      if (e instanceof KeyboardEvent && e.code === 'Tab' && e.shiftKey) {
        e.preventDefault();
        window.parent.postMessage({
          action: 'focusGongButton',
          composeId: popoverComposeId
        }, '*');
      }
    };
    const handleLastEl = e => {
      if (e instanceof KeyboardEvent && e.code === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gongv1, {
          showPopover: false,
          popoverComposeId: undefined
        });
        window.parent.postMessage({
          action: 'focusGongButtonNextElement',
          composeId: popoverComposeId
        }, '*');
      }
    };
    if (recentlyUsedEts) {
      requestAnimationFrame(() => {
        const focusableElements = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_3__.getFocusableElements)(containerRef.current);
        if (focusableElements != null && focusableElements.length) {
          var _firstEl, _lastEl;
          if (firstEl) firstEl.removeEventListener('keydown', handleFirstEl);
          if (lastEl) lastEl.removeEventListener('keydown', handleLastEl);
          firstEl = focusableElements.item(0);
          lastEl = focusableElements.item(focusableElements.length - 1);
          (_firstEl = firstEl) == null || _firstEl.addEventListener('keydown', handleFirstEl);
          (_lastEl = lastEl) == null || _lastEl.addEventListener('keydown', handleLastEl);
        }
      });
    }
    return () => {
      if (firstEl) firstEl.removeEventListener('keydown', handleFirstEl);
      if (lastEl) lastEl.removeEventListener('keydown', handleLastEl);
    };
  }, [recentlyUsedEts, popoverComposeId, updatePopover]);
  const onShowMoreClick = () => {
    updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gongv1, {
      showPopover: false
    });
    platform.flow.sidebar({
      tabName: 'event_types'
    });
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_6__.AnalyticsEvent.GongShowMoreEventTypes);
  };
  const onOneOffClick = () => {
    updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gongv1, {
      showPopover: false,
      popoverComposeId: undefined
    });
    platform.flow.webOneOff({
      source: 'gong'
    });
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_6__.AnalyticsEvent.GongOpenOneOff);
  };
  const onPollClick = () => {
    updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gongv1, {
      showPopover: false,
      popoverComposeId: undefined
    });
    platform.flow.webPolls({
      source: 'gong'
    });
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_6__.AnalyticsEvent.GongOpenPoll);
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Container, {
    ref: containerRef,
    etCount: recentlyUsedEts.length,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Header, {
      children: "Recently used event types"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(List, {
      children: recentlyUsedEts.map((et, index) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_eventTypeItem_eventTypeItem__WEBPACK_IMPORTED_MODULE_7__.EventTypeItem, {
        eventType: et,
        showNewSidebar: newSidebarFlag,
        index: index
      }, et.id, false, {
        fileName: _jsxFileName,
        lineNumber: 135,
        columnNumber: 11
      }, undefined))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Footer, {
      onClick: onShowMoreClick,
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(ShowMoreIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 144,
        columnNumber: 9
      }, undefined), "See all event types"]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Footer, {
      onClick: onOneOffClick,
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(OneOffIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 148,
        columnNumber: 9
      }, undefined), " Create one-off meeting"]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 147,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Footer, {
      onClick: onPollClick,
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(PollsIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 151,
        columnNumber: 9
      }, undefined), " Create poll"]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 131,
    columnNumber: 5
  }, undefined);
};
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "popover__Container",
  componentId: "sc-134arat-0"
})(["position:absolute;top:0px;left:0px;display:flex;flex-direction:column;box-sizing:border-box;border:1px solid ", ";border-radius:8px;pointer-events:auto;background:#ffffff;width:100vw;height:100vh;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey3);
const Header = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "popover__Header",
  componentId: "sc-134arat-1"
})(["font-size:14px;font-weight:600;margin-bottom:12px;padding:16px 16px 0px;"]);
const List = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "popover__List",
  componentId: "sc-134arat-2"
})(["display:flex;flex-direction:column;overflow-y:auto;flex-grow:1;padding:0px 12px;gap:12px;"]);
const Footer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].button.withConfig({
  displayName: "popover__Footer",
  componentId: "sc-134arat-3"
})(["display:flex;align-items:center;box-sizing:border-box;margin:0px 0px 12px;padding:0px;cursor:pointer;font-size:14px;line-height:16px;color:", ";border:none;outline:none;background:inherit;&:focus,&:hover{text-decoration:underline;}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorSecondary1);
const ShowMoreIcon = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_10__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.LinkedinShowMore).attrs(props => ({
  alt: 'Open sidebar icon'
})).withConfig({
  displayName: "popover__ShowMoreIcon",
  componentId: "sc-134arat-4"
})(["margin:0px 5px 0px 12px;"]);
const OneOffIcon = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_10__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.LinkedinOneOff).attrs(props => ({
  alt: 'One-off meeting icon'
})).withConfig({
  displayName: "popover__OneOffIcon",
  componentId: "sc-134arat-5"
})(["margin:0px 5px 0px 12px;"]);
const PollsIcon = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_10__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.LinkedinPolls).attrs(props => ({
  alt: 'Polls icon'
})).withConfig({
  displayName: "popover__PollsIcon",
  componentId: "sc-134arat-6"
})(["margin:0px 5px 0px 12px;"]);

/***/ })

}]);