"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["default-libs_features_gmenu_src_index_ts"],{

/***/ "../../libs/features/gmenu/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComposeBar: () => (/* reexport safe */ _lib_bar_bar__WEBPACK_IMPORTED_MODULE_0__.ComposeBar),
/* harmony export */   ComposeToggle: () => (/* reexport safe */ _lib_toggle_toggle__WEBPACK_IMPORTED_MODULE_1__.ComposeToggle),
/* harmony export */   GMailCompose: () => (/* reexport safe */ _lib_GmailCompose__WEBPACK_IMPORTED_MODULE_2__.GMailCompose),
/* harmony export */   GMenuComposePopover: () => (/* reexport safe */ _lib_popover_popover__WEBPACK_IMPORTED_MODULE_3__.GMenuComposePopover)
/* harmony export */ });
/* harmony import */ var _lib_bar_bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/features/gmenu/src/lib/bar/bar.tsx");
/* harmony import */ var _lib_toggle_toggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/features/gmenu/src/lib/toggle/toggle.tsx");
/* harmony import */ var _lib_GmailCompose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/features/gmenu/src/lib/GmailCompose.tsx");
/* harmony import */ var _lib_popover_popover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/features/gmenu/src/lib/popover/popover.tsx");





/***/ }),

/***/ "../../libs/features/gmenu/src/lib/GmailCompose.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GMailCompose: () => (/* binding */ GMailCompose)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _client_core_features_keyword_detector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/features/keyword-detector/src/index.ts");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/theme/src/index.ts");


// eslint-disable-next-line




class GMailCompose {
  constructor(el, tabId, isFirefox, store, uiStore, platform, onChange) {
    this.id = void 0;
    this.button = void 0;
    this.bar = void 0;
    this.barSpacer = void 0;
    this.keywordDetector = void 0;
    this.etCount = void 0;
    this.listVisible = void 0;
    this.popoverUrl = void 0;
    this.clickedOutside = false;
    this.etHeight = void 0;
    this.defaultHeight = void 0;
    this.el = el;
    this.tabId = tabId;
    this.isFirefox = isFirefox;
    this.store = store;
    this.uiStore = uiStore;
    this.platform = platform;
    this.onChange = onChange;
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
    this.listVisible = false;
    this.showButton();
    this.registerFontBarListener();
    this.registerExpandListener();
    this.registerHeaderListener();
    this.registerScrollListener();
    this.initializeKeywordDetection();
    this.popoverUrl = webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.getURL('/pages/iframe_gMenuPopover.html');
    this.etCount = 3;
    this.defaultHeight = 399;
    this.etHeight = 97 + 8;
  }
  element() {
    return this.el;
  }
  exists() {
    return document.body.contains(this.el);
  }
  isInline() {
    return jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).closest('td.Bu').length > 0;
  }
  sendRow() {
    return this.sendButton().closest('td');
  }
  sendButton() {
    return jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).find('div.T-I.T-I-atl');
  }
  expandButton() {
    return this.body().closest('.AD').find('[alt="Pop-out"]');
  }
  fontBar() {
    return this.sendButton().closest('table').closest('td').find('div.Ur');
  }
  showingPopover() {
    return this.popover().hasClass(this.id);
  }
  popover(make = true) {
    let popover = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`#gMenuPopover.new`);
    if (popover.length == 0 && make) {
      const newPopover = document.createElement('iframe');
      newPopover.classList.add('new');
      newPopover.src = `${this.popoverUrl}`;
      newPopover.id = 'gMenuPopover';
      newPopover.frameBorder = '0';
      newPopover.style.position = 'absolute';
      newPopover.style.top = '0px';
      newPopover.style.left = '0px';
      newPopover.style.width = '230px';
      newPopover.style.height = `${this.defaultHeight}px`;
      newPopover.style.backgroundColor = 'transparent';
      newPopover.style.zIndex = '99999';
      newPopover.style.display = 'none';
      newPopover.style.boxShadow = _client_core_theme__WEBPACK_IMPORTED_MODULE_4__.composePopoverShadow;
      newPopover.style.borderRadius = '8px';
      newPopover.style.overflow = 'hidden';
      document.body.appendChild(newPopover);
      popover = jquery__WEBPACK_IMPORTED_MODULE_0___default()(newPopover);
    }
    return popover;
  }
  handlePopover() {
    const el = this.bar;
    if (el && this.showingPopover()) {
      this.adjustPopover();
    }
  }
  showPopover(etCount) {
    if (this.popover().hasClass(this.id) && this.popover().css('display') === 'block') {
      // Already showing here - do not modify DOM
      return;
    }
    this.etCount = etCount;
    this.popover().addClass(this.id);
    this.popover().attr('data-compose-id', this.id);
    this.popover().css('display', 'block');
    this.adjustPopover();
  }
  adjustPopover() {
    let location = undefined;
    const height = this.calculatedPopoverHeight();
    const el = this.bar;
    if (el) {
      location = el.getBoundingClientRect();
      this.popover().css('top', `${location.top - height - 12}px`);
      this.popover().css('left', `${location.left}px`);
      this.popover().css('height', height + 'px');
    }
  }
  calculatedPopoverHeight() {
    let count = this.etCount;
    count = count < 0 ? 0 : count;
    let height = this.defaultHeight;
    if (count < 3) {
      height = this.defaultHeight - (3 - count) * this.etHeight;
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
    const calendlyButton = document.createElement('td');
    calendlyButton.id = `button-${this.id}`;
    calendlyButton.style.zIndex = '999999';
    this.sendRow().after(calendlyButton);
    const buttonFrame = document.createElement('iframe');
    buttonFrame.id = `button-frame-${this.id}`;
    buttonFrame.frameBorder = '0';
    buttonFrame.tabIndex = 1;
    buttonFrame.src = `${webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.getURL('/pages/iframe_gMenuButton.html')}?composeid=${this.id}`;
    buttonFrame.style.display = 'block';
    buttonFrame.style.height = '36px';
    buttonFrame.style.width = '66px';
    buttonFrame.style.marginTop = '2px';
    buttonFrame.style.marginLeft = '8px';
    buttonFrame.style.overflow = 'hidden';
    calendlyButton.appendChild(buttonFrame);
    buttonFrame.addEventListener('load', this.onChange);
    this.button = calendlyButton;
    if (this.isFirefox) {
      var _getLastFocusableChil;
      // Firefox focuses on the iframe before going to the next element inside the iframe.
      // So we prevent this behavior and manually focus the next element inside it.
      (_getLastFocusableChil = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_3__.getLastFocusableChild)(this.sendRow().get(0))) == null || _getLastFocusableChil.addEventListener('keydown', e => {
        if (e.code === 'Tab' && !e.shiftKey) {
          var _buttonFrame$contentW;
          e.preventDefault();
          (_buttonFrame$contentW = buttonFrame.contentWindow) == null || _buttonFrame$contentW.postMessage({
            action: 'focusGmailButton'
          }, '*');
        }
      });
    }
  }
  hideButton() {
    if (this.button) {
      this.button.style.display = 'none';
    }
  }
  fontBarVisible() {
    return this.fontBar().find('.aX').css('display') !== 'none';
  }
  barVisible() {
    if (!this.bar) {
      return false;
    }
    return this.bar !== undefined && this.bar.style.display == 'block';
  }
  registerFontBarListener() {
    var _this$button;
    (_this$button = this.button) == null || (_this$button = _this$button.nextSibling) == null || _this$button.addEventListener('click', evt => {
      this.handleFontBar();
    });
  }
  handleFontBar() {
    if (this.fontBar().length) {
      if (this.barVisible()) {
        if (!this.fontBar().hasClass('calendly-bar-open')) {
          this.fontBar().css('margin-bottom', '+=38px');
          this.fontBar().addClass('calendly-bar-open');
        }
      } else {
        if (this.fontBar().hasClass('calendly-bar-open')) {
          this.fontBar().css('margin-bottom', '-=38px');
          this.fontBar().removeClass('calendly-bar-open');
        }
      }
    }
  }
  cleanupFontBar() {
    if (this.fontBar().hasClass('calendly-bar-open')) {
      this.fontBar().css('margin-bottom', '-=38px');
      this.fontBar().removeClass('calendly-bar-open');
    }
  }
  handleClick(ev) {
    if (this.showingPopover()) {
      if (this.popover().get()[0].contains(ev.target)) {
        return;
      }
      this.clickedOutside = true;
    }
  }
  handleScroll() {
    this.handlePopover();
  }
  registerExpandListener() {
    const button = this.expandButton().get()[0];
    if (button) {
      button.addEventListener('click', () => {
        setTimeout(() => {
          this.handleFontBar();
        }, 1000);
      });
    }
  }
  registerHeaderListener() {
    const header = this.body().closest('.AD').find('.aXJ').get(0);
    if (header) {
      header.addEventListener('mouseup', this.onChange);
      header.addEventListener('click', e => {
        e.stopPropagation();
        this.onChange();
      });
    }
  }
  registerScrollListener() {
    const container = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).closest('.aeJ').get(0);
    if (container) {
      container.addEventListener('scroll', this.onChange);
    }
  }
  suggestionMount(suggestionElem) {
    // Handle different types of gmail composers
    const fontBarMarginLeft = this.fontBar().css('marginLeft').replace('px', '');
    const defaultMargin = 16;
    if (fontBarMarginLeft && Number(fontBarMarginLeft) !== defaultMargin) {
      const newMargin = Number(fontBarMarginLeft) - defaultMargin;
      suggestionElem.style.marginLeft = `${newMargin}px`;
      suggestionElem.style.marginRight = `${newMargin}px`;
      const newWidth = -defaultMargin + Math.abs(newMargin * 2);
      suggestionElem.style.width = `calc(100% + ${newWidth}px)`;
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(suggestionElem).insertAfter(this.fontBar()).hide().show(400);
  }
  initializeKeywordDetection() {
    const {
      keywordDetectionEnabled
    } = this.store.getState();
    const composer = this.el.querySelector("[contenteditable='true']");
    if (!this.keywordDetector && keywordDetectionEnabled && composer) {
      const highlightsContainer = this.el.querySelector('table.iN tr td div');
      if (highlightsContainer) {
        this.keywordDetector = new _client_core_features_keyword_detector__WEBPACK_IMPORTED_MODULE_2__.KeywordDetector({
          composer,
          tabId: this.tabId,
          highlightsContainer,
          store: this.store,
          uiStore: this.uiStore,
          platform: this.platform,
          suggestionMount: suggestionElem => this.suggestionMount(suggestionElem)
        });
      }
    }
  }
  hasShowTrimmedContent() {
    const trimmedContent = this.sendButton().closest('table').closest('tbody').closest('table').find('[data-tooltip="Show trimmed content"]');
    return trimmedContent.length != 0 && trimmedContent.css('display') !== 'none';
  }
  updateLeftMargin() {
    if (this.bar) {
      if (this.isInline()) {
        this.bar.style.marginLeft = '15px';
      } else {
        this.bar.style.marginLeft = '0px';
      }
    }
  }
  showBar() {
    var _this$keywordDetector;
    if (this.barSpacer) {
      this.barSpacer.style.display = 'block';
    }
    if (this.bar && document.body.contains(this.bar)) {
      this.bar.style.display = 'block';
      this.handleFontBar();
      return;
    }
    const spacer = document.createElement('tr');
    spacer.style.height = '38px';
    if (this.isInline()) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(spacer).insertBefore(this.fontBar().closest('tr'));
      this.barSpacer = spacer;
    }
    const calendlyBar = document.createElement('iframe');
    calendlyBar.id = `bar-frame-${this.id}`;
    calendlyBar.src = `${webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.getURL('/pages/iframe_gMenuBar.html')}?composeid=${this.id}`;
    calendlyBar.frameBorder = '0';
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(calendlyBar).insertAfter(this.fontBar());
    calendlyBar.style.position = 'absolute';
    calendlyBar.style.top = '-40px';
    calendlyBar.style.boxSizing = 'border-box';
    calendlyBar.style.height = '38px';
    calendlyBar.style.width = '100%';
    calendlyBar.style.display = 'block';
    this.bar = calendlyBar;
    this.handleFontBar();
    this.updateLeftMargin();
    (_this$keywordDetector = this.keywordDetector) == null || _this$keywordDetector.closeSuggestion();
  }
  hideBar() {
    if (this.barSpacer) {
      this.barSpacer.style.display = 'none';
    }
    if (this.bar) {
      this.bar.style.display = 'none';
    }
    this.handleFontBar();
  }
  body() {
    return this.sendButton().closest('table').closest('tbody').closest('table').find('div.Am');
  }
  cleanup() {
    this.hideBar();
    this.hideButton();
    this.hidePopover();
    this.cleanupFontBar();
    if (this.button) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.button).remove();
    }
    if (this.bar) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.bar).remove();
    }
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#gMenuPopover.new').remove();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).removeClass('calendly-handled');
  }
  createShareLink(link, text) {
    const anchorElement = document.createElement('a');
    anchorElement.innerHTML = text.length === 0 ? link : text;
    anchorElement.href = link;
    anchorElement.target = '_blank';
    return anchorElement;
  }
  insertIntoCompose(lastKnownRange, link) {
    const messageBody = this.el.querySelector('[g_editable="true"][role="textbox"]');
    messageBody == null || messageBody.focus();
    const selection = window.getSelection();
    if (selection === null || messageBody === null || selection.type === 'None') return;
    selection.removeAllRanges();
    selection.addRange(lastKnownRange);
    if (!selection.containsNode(messageBody, true) || selection.rangeCount === 0) {
      selection.removeAllRanges();
      const _range = new Range();
      _range.setStart(messageBody, 0);
      _range.setEnd(messageBody, 0);
      selection.addRange(_range);
    }
    const text = selection.toString();
    const range = selection.getRangeAt(0);
    const anchorElement = this.createShareLink(link, text);

    // If the range is not collapsed we need to replace the users selection
    if (!range.collapsed) range == null || range.deleteContents();
    range.insertNode(anchorElement);
    range.collapse(false);
  }
}

/***/ }),

/***/ "../../libs/features/gmenu/src/lib/bar/bar.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComposeBar: () => (/* binding */ ComposeBar)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/types/src/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/gmenu/src/lib/bar/bar.tsx";



// eslint-disable-next-line







const ComposeBar = () => {
  const store = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.DataStoreContext);
  const updatePopover = (0,zustand__WEBPACK_IMPORTED_MODULE_8__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.updatePopoverDataSelector);
  const popoverComposeId = (0,zustand__WEBPACK_IMPORTED_MODULE_8__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.gmailPopoverComposeIdSelector);
  const showPopover = (0,zustand__WEBPACK_IMPORTED_MODULE_8__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.gmailShowingComposePopoverSelector);
  const fetchEts = (0,zustand__WEBPACK_IMPORTED_MODULE_8__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.fetchEventTypesSelector);
  const user = (0,zustand__WEBPACK_IMPORTED_MODULE_8__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.userSelector);
  const params = new URLSearchParams(window.location.search);
  const composeId = params.get('composeid') || '';
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_4__.usePlatform)();
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const etRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    let firstEl;
    let lastEl;
    const handleFirstEl = e => {
      if (e instanceof KeyboardEvent && e.code === 'Tab' && e.shiftKey) {
        e.preventDefault();
        window.parent.postMessage({
          action: 'focusGmailButton',
          composeId
        }, '*');
      }
    };
    const handleLastEl = e => {
      if (e instanceof KeyboardEvent && e.code === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        window.parent.postMessage({
          action: 'focusGmailButtonNextElement',
          composeId
        }, '*');
      }
    };
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
    const handleMesssage = msg => {
      var _msg$data, _msg$data2;
      if (((_msg$data = msg.data) == null ? void 0 : _msg$data.action) === 'focusGmailBar') {
        (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_3__.focusFirstChild)(containerRef.current);
      } else if (((_msg$data2 = msg.data) == null ? void 0 : _msg$data2.action) === 'focusGmailBarNextElement') {
        (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_3__.focusNextSibling)(etRef.current);
      }
    };
    window.addEventListener('message', handleMesssage);
    return () => {
      if (firstEl) firstEl.removeEventListener('keydown', handleFirstEl);
      if (lastEl) lastEl.removeEventListener('keydown', handleLastEl);
      window.removeEventListener('message', handleMesssage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(Container, {
    ref: containerRef,
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(Bar, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(BarButton, {
        ref: etRef,
        onClick: () => {
          if (!user) {
            updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gmailv1, {
              popoverComposeId: undefined,
              showPopover: false
            });
            platform.flow.sidebar();
            return;
          }
          if (showPopover === false) {
            fetchEts();
          }
          if (popoverComposeId === composeId) {
            updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gmailv1, {
              popoverComposeId: composeId,
              showPopover: !showPopover
            });
            platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_6__.AnalyticsEvent.GMenuToggleEventTypeList);
          } else {
            updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gmailv1, {
              popoverComposeId: composeId,
              showPopover: true
            });
            platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_6__.AnalyticsEvent.GMenuToggleEventTypeList);
          }
        },
        onKeyDown: e => {
          if (showPopover && e.code === 'Tab') {
            if (e.shiftKey) {
              updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gmailv1, {
                popoverComposeId: undefined,
                showPopover: false
              });
            } else {
              e.preventDefault();
              window.parent.postMessage({
                action: 'focusGmailPopover'
              }, '*');
            }
          }
        },
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(ETLogo, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 146,
          columnNumber: 11
        }, undefined), "Event types"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(BarButton, {
        onClick: () => {
          updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gmailv1, {
            popoverComposeId: undefined,
            showPopover: false
          });
          platform.flow.webOneOff({
            source: 'gmenu'
          });
          platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_6__.AnalyticsEvent.GMenuOpenOneOff);
        },
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(OneOffLogo, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 159,
          columnNumber: 11
        }, undefined), "One-off meeting"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 149,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(BarButton, {
        onClick: () => {
          updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gmailv1, {
            popoverComposeId: undefined,
            showPopover: false
          });
          platform.flow.webPolls({
            source: 'gmenu'
          });
          platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_6__.AnalyticsEvent.GMenuOpenPoll);
        },
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(PollLogo, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 172,
          columnNumber: 11
        }, undefined), "Meeting poll"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 162,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(BarButton, {
        onClick: async () => {
          updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gmailv1, {
            showBar: false,
            popoverComposeId: undefined,
            showPopover: false
          });
          platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_6__.AnalyticsEvent.GMenuClose);
        },
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(CloseLogo, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 185,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 175,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 100,
    columnNumber: 5
  }, undefined);
};
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_9__["default"].div.attrs({
  'data-id': 'gmenu-compose-bar'
}).withConfig({
  displayName: "bar__Container",
  componentId: "sc-1yiv8xy-0"
})(["display:flex;"]);
const Bar = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_9__["default"].div.withConfig({
  displayName: "bar__Bar",
  componentId: "sc-1yiv8xy-1"
})(["display:flex;flex-direction:row;align-items:center;justify-content:space-between;height:35px;background-color:color-mix(in srgb,", " 15%,white);border-radius:2px;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL1);
const BarButton = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_9__["default"].button.withConfig({
  displayName: "bar__BarButton",
  componentId: "sc-1yiv8xy-2"
})(["outline:none;border:none;display:flex;flex-direction:row;align-items:center;justify-content:center;box-sizing:border-box;height:24px;padding:2px 4px;margin:0 5px;border-radius:0.25rem;font-size:14px;user-select:none;cursor:pointer;background-color:transparent;&:hover,&:focus{background-color:", ";}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL3);
const ETLogo = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_9__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.GmenuEtIcon).attrs(props => ({
  alt: 'Event types'
})).withConfig({
  displayName: "bar__ETLogo",
  componentId: "sc-1yiv8xy-3"
})(["margin-right:7px;"]);
const OneOffLogo = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_9__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.GmenuOneOffIcon).attrs(props => ({
  alt: `One-off meeting`
})).withConfig({
  displayName: "bar__OneOffLogo",
  componentId: "sc-1yiv8xy-4"
})(["margin-right:7px;"]);
const PollLogo = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_9__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.GmenuPollsIcon).attrs(props => ({
  alt: `Meeting poll`
})).withConfig({
  displayName: "bar__PollLogo",
  componentId: "sc-1yiv8xy-5"
})(["margin-right:7px;"]);
const CloseLogo = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_9__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.CloseIcon_2021).attrs(props => ({
  alt: `Close calendly`,
  draggable: false
})).withConfig({
  displayName: "bar__CloseLogo",
  componentId: "sc-1yiv8xy-6"
})(["width:10px;height:10px;"]);

/***/ }),

/***/ "../../libs/features/gmenu/src/lib/popover/eventTypeItem/eventTypeItem.tsx":
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
var _jsxFileName = "/app/libs/features/gmenu/src/lib/popover/eventTypeItem/eventTypeItem.tsx";













const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "eventTypeItem__Container",
  componentId: "sc-1en66g5-0"
})(["display:flex;flex-direction:row;box-sizing:border-box;justify-content:space-between;border:1px solid ", ";border-radius:4px;box-shadow:", ";height:95px;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey3, _client_core_theme__WEBPACK_IMPORTED_MODULE_8__.composePopoverItemShadow);
const ColorBar = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "eventTypeItem__ColorBar",
  componentId: "sc-1en66g5-1"
})(["width:5px;border-radius:4px 0px 0px 4px;background:", ";"], props => props.color);
const Body = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "eventTypeItem__Body",
  componentId: "sc-1en66g5-2"
})(["display:flex;flex-direction:column;flex:1;min-width:100px;"]);
const TitleContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "eventTypeItem__TitleContainer",
  componentId: "sc-1en66g5-3"
})(["display:flex;justify-content:space-between;flex:1;padding:4px 8px 0 12px;"]);
const Title = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].span.withConfig({
  displayName: "eventTypeItem__Title",
  componentId: "sc-1en66g5-4"
})(["display:block;min-height:18px;max-width:200px;padding:0 8px 0 0;line-height:17px;font-size:14px;color:", ";overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorSecondary1);
const SubTitle = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].span.withConfig({
  displayName: "eventTypeItem__SubTitle",
  componentId: "sc-1en66g5-5"
})(["display:flex;align-items:center;padding:8px 7px 8px 12px;line-height:15px;font-size:12px;color:", ";"], _client_core_theme__WEBPACK_IMPORTED_MODULE_8__.textColorL1_5);
const InternalNote = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_11__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_3__.InternalNoteIcon_2021).attrs(props => ({
  alt: 'internal note',
  draggable: false
})).withConfig({
  displayName: "eventTypeItem__InternalNote",
  componentId: "sc-1en66g5-6"
})(["position:relative;top:3px;margin-left:7px;height:12px;"]);
const ButtonContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.withConfig({
  displayName: "eventTypeItem__ButtonContainer",
  componentId: "sc-1en66g5-7"
})(["display:flex;border-top:1px solid ", ";color:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey4, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorSecondary2);
const DefaultButton = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].button.withConfig({
  displayName: "eventTypeItem__DefaultButton",
  componentId: "sc-1en66g5-8"
})(["box-sizing:border-box;padding:8px 4px;font-size:12px;border:none;outline:none;background:inherit;flex-grow:1;text-align:center;cursor:pointer;white-space:nowrap;&:hover,&:focus{text-decoration:underline;}"]);
const InsertLinkButton = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_11__["default"])(DefaultButton).withConfig({
  displayName: "eventTypeItem__InsertLinkButton",
  componentId: "sc-1en66g5-9"
})(["border-right:1px solid ", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey4);
const AddTimesButton = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_11__["default"])(DefaultButton).withConfig({
  displayName: "eventTypeItem__AddTimesButton",
  componentId: "sc-1en66g5-10"
})([""]);
const Tooltip = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div.attrs(props => ({
  'data-cui-tooltip': props.text,
  className: `${props.text && props.text.length >= 53 ? 'wrap' : ''} small`
})).withConfig({
  displayName: "eventTypeItem__Tooltip",
  componentId: "sc-1en66g5-11"
})([""]);
const EventTypeItem = props => {
  const store = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_client_core_store__WEBPACK_IMPORTED_MODULE_7__.DataStoreContext);
  const updatePopover = (0,zustand__WEBPACK_IMPORTED_MODULE_12__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_7__.updatePopoverDataSelector);
  const composeId = (0,qs__WEBPACK_IMPORTED_MODULE_1__.parse)(window.location.search, {
    ignoreQueryPrefix: true
  })['id'];
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
    updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_7__.IntegrationId.gmailv1, {
      showPopover: false
    });
    platform.flow.sidebarAddTimes({
      etId: id,
      source: 'gmenu'
    });
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_9__.AnalyticsEvent.GMenuAddTimes, {
      id: id,
      url: booking.url,
      index: String(props.index)
    });
    // Track for legacy accounting
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_9__.AnalyticsEvent.SidebarEmailEmbedAttempt, {
      source: 'gmenu'
    });
  }, 1500, true);
  const onInsertLinkPress = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_4__.debounce)(() => {
    var _window$top;
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_9__.AnalyticsEvent.GMenuCopyLink, {
      id: id,
      url: booking.url,
      index: String(props.index)
    });
    (_window$top = window.top) == null || _window$top.postMessage({
      action: 'insert',
      text: booking.url,
      composeId
    }, '*');
  }, 1500, true);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(Container, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(ColorBar, {
      color: color
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 189,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(Body, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(TitleContainer, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(Title, {
          children: name
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 192,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_client_core_shared_components__WEBPACK_IMPORTED_MODULE_6__.EditAction, {
          eventType: props.eventType,
          source: "gmenu"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 193,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 191,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(SubTitle, {
        children: [`${duration} • ${kindDescription}`, internalNote && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(Tooltip, {
          text: internalNote,
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(InternalNote, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 199,
            columnNumber: 15
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 198,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 195,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(ButtonContainer, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(InsertLinkButton, {
          onClick: onInsertLinkPress,
          children: "Insert link"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 204,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(AddTimesButton, {
          onClick: onAddTimesPress,
          children: "Offer time slots"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 207,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 203,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 190,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 188,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "../../libs/features/gmenu/src/lib/popover/popover.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GMenuComposePopover: () => (/* binding */ GMenuComposePopover)
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
/* harmony import */ var _eventTypeItem_eventTypeItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/features/gmenu/src/lib/popover/eventTypeItem/eventTypeItem.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/gmenu/src/lib/popover/popover.tsx";











const GMenuComposePopover = () => {
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_4__.usePlatform)();
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const store = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.DataStoreContext);
  const updatePopover = (0,zustand__WEBPACK_IMPORTED_MODULE_9__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.updatePopoverDataSelector);
  const popoverComposeId = (0,zustand__WEBPACK_IMPORTED_MODULE_9__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.gmailPopoverComposeIdSelector);
  const recentlyUsedEts = (0,zustand__WEBPACK_IMPORTED_MODULE_9__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.recentlyUsedEventTypesSelector);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const handleMesssage = msg => {
      var _msg$data;
      if (((_msg$data = msg.data) == null ? void 0 : _msg$data.action) === 'focusGmailPopover') {
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
          action: 'focusGmailBar',
          composeId: popoverComposeId
        }, '*');
      }
    };
    const handleLastEl = e => {
      if (e instanceof KeyboardEvent && e.code === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gmailv1, {
          showPopover: false,
          popoverComposeId: undefined
        });
        window.parent.postMessage({
          action: 'focusGmailBarNextElement',
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
    updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.gmailv1, {
      showPopover: false
    });
    platform.flow.sidebar({
      tabName: 'event_types'
    });
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_6__.AnalyticsEvent.GMenuShowMoreEventTypes);
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Container, {
    ref: containerRef,
    etCount: recentlyUsedEts.length,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Header, {
      children: "Recently used event types"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(List, {
      children: recentlyUsedEts.map((et, index) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_eventTypeItem_eventTypeItem__WEBPACK_IMPORTED_MODULE_7__.EventTypeItem, {
        eventType: et,
        index: index
      }, et.id, false, {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 11
      }, undefined))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Footer, {
      onClick: onShowMoreClick,
      children: ["See all event types", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(PopoutIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 121,
        columnNumber: 10
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 108,
    columnNumber: 5
  }, undefined);
};
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "popover__Container",
  componentId: "zmi5sd-0"
})(["position:absolute;top:0px;left:0px;display:flex;flex-direction:column;box-sizing:border-box;border:1px solid ", ";border-radius:8px;pointer-events:auto;background:#ffffff;width:100vw;height:100vh;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey3);
const Header = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "popover__Header",
  componentId: "zmi5sd-1"
})(["font-size:14px;font-weight:600;margin-bottom:12px;padding:16px 16px 0px;"]);
const List = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "popover__List",
  componentId: "zmi5sd-2"
})(["display:flex;flex-direction:column;overflow-y:auto;flex-grow:1;padding:0px 12px;gap:12px;"]);
const Footer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].button.withConfig({
  displayName: "popover__Footer",
  componentId: "zmi5sd-3"
})(["display:flex;align-items:center;box-sizing:border-box;margin:0px 16px 12px;cursor:pointer;font-size:12px;line-height:15px;text-decoration-line:underline;color:", ";border:none;outline:none;background:inherit;&:focus,&:hover{font-weight:600;}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorSecondary1);
const PopoutIcon = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_10__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.PopoutIcon).attrs(props => ({
  alt: 'Open Sidebar'
})).withConfig({
  displayName: "popover__PopoutIcon",
  componentId: "zmi5sd-4"
})(["margin-left:5px;"]);

/***/ }),

/***/ "../../libs/features/gmenu/src/lib/toggle/toggle.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComposeToggle: () => (/* binding */ ComposeToggle)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _assets_grey_caret_up_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/features/gmenu/src/lib/toggle/assets/grey_caret_up.svg");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/gmenu/src/lib/toggle/toggle.tsx";







const propTypes = {
  pressed: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool),
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),
  onKeyDown: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func)
};
const defaultProps = {
  pressed: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {}
};
const ComposeToggle = props => {
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const handleMesssage = msg => {
      var _msg$data;
      if (((_msg$data = msg.data) == null ? void 0 : _msg$data.action) === 'focusGmailButton') {
        var _containerRef$current;
        (_containerRef$current = containerRef.current) == null || _containerRef$current.focus();
      }
    };
    window.addEventListener('message', handleMesssage);
    return () => {
      window.removeEventListener('message', handleMesssage);
    };
  }, []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(Container, {
    ref: containerRef,
    "data-testid": 'gmenu-compose-button',
    onClick: props.onClick,
    onKeyDown: props.onKeyDown,
    open: props.pressed,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(Logo, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(Divider, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(Caret, {
      open: props.pressed
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 49,
    columnNumber: 5
  }, undefined);
};
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].button.withConfig({
  displayName: "toggle__Container",
  componentId: "sc-12nuf1l-0"
})(["position:relative;display:flex;flex-direction:row;justify-content:space-evenly;align-items:center;box-sizing:border-box;outline:none;padding:0px;width:100%;height:100vh;border-radius:4px;border:none;cursor:pointer;user-select:none;overflow:hidden;background:", ";&:hover{", "}&:focus-visible{outline-width:2px;outline-style:solid;outline-color:", ";outline-offset:-2px;}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL3, ({
  open
}) => !open && (0,styled_components__WEBPACK_IMPORTED_MODULE_6__.css)(["background:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorL3), _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL1);
const Logo = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_6__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.calendlyLogo).withConfig({
  displayName: "toggle__Logo",
  componentId: "sc-12nuf1l-1"
})(["width:20px;height:20px;"]);
const Divider = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div.withConfig({
  displayName: "toggle__Divider",
  componentId: "sc-12nuf1l-2"
})(["width:1px;height:24px;margin:auto 0px;background:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey3);
const Caret = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_6__["default"])(_assets_grey_caret_up_svg__WEBPACK_IMPORTED_MODULE_3__["default"]).withConfig({
  displayName: "toggle__Caret",
  componentId: "sc-12nuf1l-3"
})(["width:20px;margin:0px 4px;", ""], props => props.open ? '' : 'transform: rotate(180deg);');
ComposeToggle.propTypes = propTypes;
ComposeToggle.defaultProps = defaultProps;

/***/ }),

/***/ "../../libs/features/keyword-detector/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeywordDetector: () => (/* reexport safe */ _lib_keyword_detector__WEBPACK_IMPORTED_MODULE_0__.KeywordDetector)
/* harmony export */ });
/* harmony import */ var _lib_keyword_detector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/features/keyword-detector/src/lib/keyword-detector.tsx");


/***/ }),

/***/ "../../libs/features/keyword-detector/src/lib/constants.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   keywordDetectorClassNames: () => (/* binding */ keywordDetectorClassNames),
/* harmony export */   keywordDetectorExcludeLinks: () => (/* binding */ keywordDetectorExcludeLinks),
/* harmony export */   keywordDetectorIds: () => (/* binding */ keywordDetectorIds)
/* harmony export */ });
const keywordDetectorIds = {
  highlightsElem: 'calendly-highlights'
};
const keywordDetectorClassNames = {
  suggestionElem: 'calendly-suggestion',
  suggestionCopyElem: 'calendly-suggestion-copy',
  closeIconElem: 'calendly-close-icon',
  closeMenuElem: 'calendly-close-menu',
  closeMenuHidden: 'calendly-close-menu-hidden',
  closeMenuItemElem: 'calendly-close-menu-item'
};
let keywordDetectorExcludeLinks = /*#__PURE__*/function (keywordDetectorExcludeLinks) {
  keywordDetectorExcludeLinks["calendlyStaging"] = "https://staging.calendly.com";
  keywordDetectorExcludeLinks["calendlyProduction"] = "https://calendly.com";
  return keywordDetectorExcludeLinks;
}({});

/***/ }),

/***/ "../../libs/features/keyword-detector/src/lib/helpers.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   findWordsUsingRegex: () => (/* binding */ findWordsUsingRegex),
/* harmony export */   findWordsUsingSet: () => (/* binding */ findWordsUsingSet),
/* harmony export */   getNodeAndOffset: () => (/* binding */ getNodeAndOffset),
/* harmony export */   getSanitizedTextContent: () => (/* binding */ getSanitizedTextContent),
/* harmony export */   keywordDetectionRegex: () => (/* binding */ keywordDetectionRegex)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/features/keyword-detector/src/lib/constants.ts");

const keywordDetectionRegex = words => {
  return new RegExp(`(${words.join('|')})`, 'gi');
};
const findWordsUsingRegex = (text, words) => {
  const pattern = keywordDetectionRegex(words);
  const match = pattern.exec(text);
  return match ? match[0] : null;
};
const findWordsUsingSet = (text, words) => {
  const wordSet = new Set(words.map(word => word.toLowerCase()));
  const textWords = text.toLowerCase().split(/\W+/);
  return textWords.some(word => wordSet.has(word));
};
const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function (...args) {
    const later = function later() {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};
function getNodeAndOffset(node, offset) {
  let currentOffset = 0;
  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent) {
      const nodeTextLength = node.textContent.length;
      if (currentOffset + nodeTextLength >= offset) {
        return {
          node,
          offset: offset - currentOffset
        };
      }
      currentOffset += nodeTextLength;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        const result = traverse(child);
        if (result) return result;
      }
    }
    return null;
  }
  return traverse(node);
}
function getSanitizedTextContent(element) {
  let text = '';
  let foundSkipCondition = false;
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode: function (node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const elementNode = node;

        // Reject elements with specific classes
        if (elementNode.classList.contains('gmail_signature') || elementNode.classList.contains('gmail_quote')) {
          return NodeFilter.FILTER_REJECT;
        }

        // Accept BR and DIV elements to continue traversal
        if (elementNode.tagName === 'BR' || elementNode.tagName === 'DIV') {
          return NodeFilter.FILTER_ACCEPT;
        }
        if (elementNode.tagName === 'A') {
          const href = elementNode.getAttribute('href');
          // Skip keyword detection if there's a Calendly link in the composer's body
          if (href && (href.startsWith(_constants__WEBPACK_IMPORTED_MODULE_0__.keywordDetectorExcludeLinks.calendlyProduction) || href.startsWith(_constants__WEBPACK_IMPORTED_MODULE_0__.keywordDetectorExcludeLinks.calendlyStaging))) {
            foundSkipCondition = true;
          }
        }
      }

      // Accept text nodes
      if (node.nodeType === Node.TEXT_NODE) {
        return NodeFilter.FILTER_ACCEPT;
      }

      // Skip other nodes
      return NodeFilter.FILTER_SKIP;
    }
  });
  let node;
  while (node = walker.nextNode()) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    }
  }
  return {
    text: foundSkipCondition ? '' : text
  };
}

/***/ }),

/***/ "../../libs/features/keyword-detector/src/lib/keyword-detector.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeywordDetector: () => (/* binding */ KeywordDetector)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/features/keyword-detector/src/lib/constants.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/features/keyword-detector/src/lib/helpers.ts");






class KeywordDetector {
  constructor({
    composer,
    highlightsContainer,
    store,
    uiStore,
    suggestionMount,
    tabId,
    platform
  }) {
    this.id = void 0;
    this.tabId = void 0;
    this.enabled = true;
    this.composer = void 0;
    this.showingHighlights = false;
    this.highlightsContainer = void 0;
    this.highlightsElem = void 0;
    this.suggestionElem = void 0;
    this.debounceTime = 400;
    this.store = void 0;
    this.uiStore = void 0;
    this.platform = void 0;
    this.suggestionShown = false;
    this.suggestionClosed = false;
    this.phrases = [];
    this.suggestionMount = void 0;
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_5__["default"])();
    this.tabId = tabId;
    this.store = store;
    this.uiStore = uiStore;
    this.platform = platform;
    this.composer = composer;
    this.suggestionMount = suggestionMount;
    this.highlightsContainer = highlightsContainer;
    this.fetchPhrasesFile();
    this.registerListeners();
    this.mountHighlightsContainer();
  }
  registerListeners() {
    const onKeydown = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.debounce)(e => {
      if (!this.suggestionShown && this.enabled) {
        this.processTextContent((0,_helpers__WEBPACK_IMPORTED_MODULE_4__.getSanitizedTextContent)(this.composer).text);
      }
    }, this.debounceTime);
    this.composer.addEventListener('keydown', onKeydown);

    // Gmail appears to intercept this event and prevent its propagation from the composer
    // We are depending on the highlights container to manage the tabbing behavior
    this.highlightsContainer.addEventListener('keydown', e => {
      if (this.enabled && e.code === 'Tab' && this.suggestionElem && this.suggestionShown && document.body.contains(this.suggestionElem)) {
        this.suggestionElem.focus();
      }
    });
  }
  fetchPhrasesFile() {
    const {
      keywordDetectionPhrases,
      fetchKeywordDetectionPhrases
    } = this.store.getState();
    this.phrases = keywordDetectionPhrases.map(phrase => phrase.phrase);
    this.store.subscribe((state, lastState) => {
      this.phrases = state.keywordDetectionPhrases.map(phrase => phrase.phrase);
      if (!state.keywordDetectionEnabled && this.enabled) {
        this.cleanup();
      }
      this.enabled = state.keywordDetectionEnabled;
    });
    fetchKeywordDetectionPhrases();
  }
  mountHighlightsContainer() {
    const highlightsElem = document.createElement('div');
    highlightsElem.id = _constants__WEBPACK_IMPORTED_MODULE_3__.keywordDetectorIds.highlightsElem;
    highlightsElem.style.position = 'absolute';
    highlightsElem.style.top = '0px';
    highlightsElem.style.left = '0px';
    highlightsElem.style.pointerEvents = 'none';
    highlightsElem.style.display = 'block';
    highlightsElem.style.width = '100%';
    highlightsElem.style.height = '100%';
    this.highlightsContainer.appendChild(highlightsElem);
    this.highlightsElem = highlightsElem;
  }
  processTextContent(text) {
    if (text) {
      const match = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.findWordsUsingRegex)(text.toLowerCase(), this.phrases);
      if (match && !this.suggestionShown) {
        this.showSuggestion(match);
      }
    }
  }
  showSuggestion(matchPhrase = '') {
    this.suggestionShown = true;
    const suggestionElem = document.createElement('div');
    suggestionElem.tabIndex = 1;
    suggestionElem.classList.add(_constants__WEBPACK_IMPORTED_MODULE_3__.keywordDetectorClassNames.suggestionElem);
    const textElem = document.createElement('span');
    textElem.classList.add(_constants__WEBPACK_IMPORTED_MODULE_3__.keywordDetectorClassNames.suggestionCopyElem);
    textElem.textContent = 'Looking to schedule a meeting? Calendly can help suggest the right times!';
    suggestionElem.appendChild(textElem);
    const closeIconElem = document.createElement('img');
    closeIconElem.tabIndex = 1;
    closeIconElem.classList.add(_constants__WEBPACK_IMPORTED_MODULE_3__.keywordDetectorClassNames.closeIconElem);
    const is = _client_core_assets__WEBPACK_IMPORTED_MODULE_1__.closeIcon_legacy.replace('?legacy', '');
    closeIconElem.src = `${webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default().runtime.getURL(is)}`;
    suggestionElem.appendChild(closeIconElem);
    const closeMenuElem = document.createElement('div');
    closeMenuElem.classList.add(_constants__WEBPACK_IMPORTED_MODULE_3__.keywordDetectorClassNames.closeMenuElem);
    closeMenuElem.classList.add(_constants__WEBPACK_IMPORTED_MODULE_3__.keywordDetectorClassNames.closeMenuHidden);
    suggestionElem.appendChild(closeMenuElem);
    const firstCloseMenuItemElem = document.createElement('div');
    firstCloseMenuItemElem.classList.add(_constants__WEBPACK_IMPORTED_MODULE_3__.keywordDetectorClassNames.closeMenuItemElem);
    firstCloseMenuItemElem.tabIndex = 1;
    firstCloseMenuItemElem.textContent = 'Hide this time';
    closeMenuElem.appendChild(firstCloseMenuItemElem);
    const secondCloseMenuItemElem = document.createElement('div');
    secondCloseMenuItemElem.classList.add(_constants__WEBPACK_IMPORTED_MODULE_3__.keywordDetectorClassNames.closeMenuItemElem);
    secondCloseMenuItemElem.tabIndex = 1;
    secondCloseMenuItemElem.textContent = 'Don’t show me this again';
    closeMenuElem.appendChild(secondCloseMenuItemElem);
    const suggestionElemHandler = () => {
      const {
        addAgendaFrame
      } = this.uiStore.getState();
      addAgendaFrame(String(this.tabId), {
        roleData: {
          tab: 'event_types',
          drawerStack: [],
          source: 'keyword_detection'
        }
      });
      this.cleanup();
      this.platform.analytics.track('extension_user.keyword_detection_interacted', {
        action: 'sidebar_opened'
      });
    };
    suggestionElem.addEventListener('click', e => {
      e.stopPropagation();
      suggestionElemHandler();
    });
    suggestionElem.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        suggestionElemHandler();
      }
    });
    suggestionElem.addEventListener('mouseout', e => {
      e.stopPropagation();
      this.clearHighlights();
    });
    suggestionElem.addEventListener('mouseover', e => {
      e.stopPropagation();
      this.showHighlights();
    });
    const closeIconElemHandler = () => {
      closeMenuElem.classList.remove(_constants__WEBPACK_IMPORTED_MODULE_3__.keywordDetectorClassNames.closeMenuHidden);
    };
    closeIconElem.addEventListener('click', e => {
      e.stopPropagation();
      closeIconElemHandler();
    });
    closeIconElem.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        closeIconElemHandler();
      }
    });
    const firstCloseMenuItemElemHandler = () => {
      this.cleanup();
      this.platform.analytics.track('extension_user.keyword_detection_interacted', {
        action: 'hidden'
      });
    };
    firstCloseMenuItemElem.addEventListener('click', e => {
      e.stopPropagation();
      firstCloseMenuItemElemHandler();
    });
    firstCloseMenuItemElem.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        firstCloseMenuItemElemHandler();
      }
    });
    const secondCloseMenuItemElemHandler = () => {
      this.store.getState().setKeywordDetectionEnabled(false);
      this.cleanup();
      this.platform.analytics.track('extension_user.keyword_detection_interacted', {
        action: 'turned_off'
      });
    };
    secondCloseMenuItemElem.addEventListener('click', e => {
      e.stopPropagation();
      secondCloseMenuItemElemHandler();
    });
    secondCloseMenuItemElem.addEventListener('keydown', e => {
      if (e.code === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        secondCloseMenuItemElemHandler();
      }
    });
    document.addEventListener('click', event => {
      const target = event.target;
      // Check if the click is outside the menu
      if (!closeMenuElem.contains(target) && target !== closeMenuElem) {
        closeMenuElem.classList.add(_constants__WEBPACK_IMPORTED_MODULE_3__.keywordDetectorClassNames.closeMenuHidden);
      }
    });
    this.suggestionMount(suggestionElem);
    this.suggestionElem = suggestionElem;

    // Analytics
    this.platform.analytics.track('extension_user.keyword_detection_shown', {
      keywords: matchPhrase
    });
  }
  showHighlights() {
    if (this.composer.textContent && this.composer && !this.showingHighlights) {
      this.clearHighlights(true);
      const regex = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.keywordDetectionRegex)(this.phrases);
      const {
        text: textContent
      } = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.getSanitizedTextContent)(this.composer);
      let match;
      while ((match = regex.exec(textContent)) !== null) {
        const matchText = match[0];
        const matchIndex = match.index;
        const range = document.createRange();
        const startOffset = matchIndex;
        const endOffset = matchIndex + matchText.length;
        const startResult = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.getNodeAndOffset)(this.composer, startOffset);
        const endResult = (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.getNodeAndOffset)(this.composer, endOffset);
        if (startResult && endResult) {
          range.setStart(startResult.node, startResult.offset);
          range.setEnd(endResult.node, endResult.offset);
          const rects = Array.from(range.getClientRects());
          for (const rect of rects) {
            var _this$highlightsElem;
            const highlight = document.createElement('div');
            highlight.className = 'highlight';
            highlight.style.top = `${rect.top + this.composer.scrollTop}px`;
            highlight.style.left = `${rect.left + this.composer.scrollLeft}px`;
            highlight.style.width = `${rect.width}px`;
            highlight.style.height = `${rect.height}px`;
            highlight.style.position = 'fixed';
            highlight.style.backgroundColor = _client_core_theme__WEBPACK_IMPORTED_MODULE_2__.keywordDetectorHighlightColor;
            highlight.style.backgroundBlendMode = 'multiply';
            (_this$highlightsElem = this.highlightsElem) == null || _this$highlightsElem.appendChild(highlight);
          }
        }
      }
    }
  }
  closeSuggestion() {
    var _this$suggestionElem;
    (_this$suggestionElem = this.suggestionElem) == null || _this$suggestionElem.remove();
    this.suggestionClosed = true;
    this.clearHighlights();
  }
  clearHighlights(showingHighlights = false) {
    this.showingHighlights = showingHighlights;
    if (this.highlightsElem) {
      this.highlightsElem.innerHTML = '';
    }
  }
  cleanup() {
    var _this$highlightsElem2;
    this.closeSuggestion();
    (_this$highlightsElem2 = this.highlightsElem) == null || _this$highlightsElem2.remove();
  }
}

/***/ }),

/***/ "../../libs/features/gmenu/src/lib/toggle/assets/grey_caret_up.svg":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgGreyCaretUp = function SvgGreyCaretUp(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 20,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#666A73",
    d: "M5.833 11.667 10 7.5l4.167 4.167H5.833Z"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgGreyCaretUp);

/***/ })

}]);