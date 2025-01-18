"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["default-libs_features_linkedin_src_index_ts"],{

/***/ "../../libs/features/linkedin/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkedInCompose: () => (/* reexport safe */ _lib_compose__WEBPACK_IMPORTED_MODULE_1__.LinkedInCompose),
/* harmony export */   LinkedInComposeButton: () => (/* reexport safe */ _lib_button__WEBPACK_IMPORTED_MODULE_0__.LinkedInComposeButton),
/* harmony export */   LinkedInComposePopover: () => (/* reexport safe */ _lib_popover__WEBPACK_IMPORTED_MODULE_2__.LinkedInComposePopover),
/* harmony export */   LinkedInComposeType: () => (/* reexport safe */ _lib_compose__WEBPACK_IMPORTED_MODULE_1__.LinkedInComposeType),
/* harmony export */   ebnf: () => (/* reexport safe */ _lib_ebnf_ebnf__WEBPACK_IMPORTED_MODULE_3__.ebnf)
/* harmony export */ });
/* harmony import */ var _lib_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/features/linkedin/src/lib/button/index.tsx");
/* harmony import */ var _lib_compose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/features/linkedin/src/lib/compose.tsx");
/* harmony import */ var _lib_popover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/features/linkedin/src/lib/popover/index.tsx");
/* harmony import */ var _lib_ebnf_ebnf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/features/linkedin/src/lib/ebnf/ebnf.ts");





/***/ }),

/***/ "../../libs/features/linkedin/src/lib/button/index.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkedInComposeButton: () => (/* binding */ LinkedInComposeButton)
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
var _jsxFileName = "/app/libs/features/linkedin/src/lib/button/index.tsx";









const LinkedInComposeButton = props => {
  var _props$large;
  const store = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.DataStoreContext);
  const user = (0,zustand__WEBPACK_IMPORTED_MODULE_7__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_4__.userSelector);
  const userLoaded = (0,zustand__WEBPACK_IMPORTED_MODULE_7__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_4__.userLoadedSelector);
  const popoverComposeId = (0,zustand__WEBPACK_IMPORTED_MODULE_7__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_4__.linkedinPopoverComposeIdSelector);
  const showingPopover = (0,zustand__WEBPACK_IMPORTED_MODULE_7__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_4__.linkedinShowingComposePopoverSelector);
  const updatePopover = (0,zustand__WEBPACK_IMPORTED_MODULE_7__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_4__.updatePopoverDataSelector);
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_3__.usePlatform)();
  const [source, setSource] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type) {
      if (type === 'basic' || type === 'basicPopout' || type === 'basic_legacy') {
        setSource('messenger');
      } else if (type === 'recruiter' || type === 'recruiterPopout') {
        setSource('recruiter');
      } else if (type === 'salesNav') {
        setSource('salesnav');
      } else {
        console.warn('Unexpected type for linkedIn - ', type);
        setSource(type);
      }
    }
    const handleMesssage = msg => {
      var _msg$data;
      if (((_msg$data = msg.data) == null ? void 0 : _msg$data.action) === 'focusLinkedInButton') {
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
    if (userLoaded && user) {
      platform.calendlyApi.getLoginStatus().then(res => {
        if (!res.loggedIn) {
          updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.IntegrationId.linkedinv1, {
            popoverComposeId: undefined,
            showPopover: false
          });
          platform.flow.sidebar();
        }
      });
      if (props.id === popoverComposeId) {
        if (!showingPopover) {
          platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_5__.AnalyticsEvent.LinkedInOpen, {
            source
          });
        }
        updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.IntegrationId.linkedinv1, {
          popoverComposeId: props.id,
          showPopover: !showingPopover
        });
      } else {
        platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_5__.AnalyticsEvent.LinkedInOpen, {
          source
        });
        updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.IntegrationId.linkedinv1, {
          popoverComposeId: props.id,
          showPopover: true
        });
      }
    } else {
      platform.flow.sidebar();
      // this appears to be missing an equivalent event that is present in gmenu
      // AnalyticsEvent.GmenuOpenSidebar
      // Same for a close event (AnalyticsEvent.GMenuClose) /\
    }
  };

  const onKeyDown = e => {
    if (showingPopover && e.code === 'Tab') {
      if (e.shiftKey) {
        updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_4__.IntegrationId.linkedinv1, {
          showPopover: true
        });
      } else {
        e.preventDefault();
        window.parent.postMessage({
          action: 'focusLinkedInPopover'
        }, '*');
      }
    }
    if (platform.info.name === 'firefox') {
      // Firefox focuses on the iframe before going to the previous element.
      // So we prevent this behavior and manually focus the previous element.
      if (e.code === 'Tab' && e.shiftKey) {
        e.preventDefault();
        window.parent.postMessage({
          action: 'focusLinkedInButtonPrevElement',
          composeId: props.id
        }, '*');
      }
    }
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(Container, {
    "data-testid": 'linkedin-compose-button',
    ref: containerRef,
    onClick: onClick,
    onKeyDown: onKeyDown,
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(Logo, {
      $large: (_props$large = props.large) != null ? _props$large : false
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 132,
    columnNumber: 5
  }, undefined);
};
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].button.withConfig({
  displayName: "button__Container",
  componentId: "sc-1fur8my-0"
})(["position:relative;display:flex;flex-direction:row;justify-content:space-evenly;align-items:center;box-sizing:border-box;outline:none;padding:0px;width:100vw;height:100vh;border-radius:50%;border:none;cursor:pointer;user-select:none;overflow:hidden;background:inherit;&:focus,&:hover{background:", ";}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL3);
const Logo = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.calendlyLogo).withConfig({
  displayName: "button__Logo",
  componentId: "sc-1fur8my-1"
})(["width:", ";height:", ";flex-grow:1;"], props => props.$large ? '24px' : '20px', props => props.$large ? '24px' : '20px');

/***/ }),

/***/ "../../libs/features/linkedin/src/lib/compose.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkedInCompose: () => (/* binding */ LinkedInCompose),
/* harmony export */   LinkedInComposeType: () => (/* binding */ LinkedInComposeType)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/uuid/dist/esm-browser/v4.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/theme/src/index.ts");


// eslint-disable-next-line



let LinkedInComposeType = /*#__PURE__*/function (LinkedInComposeType) {
  return LinkedInComposeType;
}({});
class LinkedInCompose {
  constructor(el, button, insertElement, buttonFrame, type = 'basic', isFirefox) {
    this.id = void 0;
    this.etCount = void 0;
    this.listVisible = void 0;
    this.popoverUrl = void 0;
    this.clickedOutside = false;
    this.buttonShowPending = false;
    this.el = el;
    this.button = button;
    this.insertElement = insertElement;
    this.buttonFrame = buttonFrame;
    this.type = type;
    this.isFirefox = isFirefox;
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.listVisible = false;
    this.showButton();
    this.popoverUrl = `${webextension_polyfill__WEBPACK_IMPORTED_MODULE_1___default().runtime.getURL('/pages/iframe_linkedInPopover.html')}?type=${this.type}`;
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
    let popover = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#linkedInPopover');
    if (popover.length === 0 && make) {
      const newPopover = document.createElement('iframe');
      newPopover.src = this.popoverUrl;
      newPopover.classList.add('linkedIn-integration-frame');
      newPopover.id = 'linkedInPopover';
      newPopover.frameBorder = '0';
      newPopover.style.position = 'fixed';
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
  insertIntoCompose(str) {
    if (this.type == 'basic' || this.type == 'basic-popout' || this.type == 'basic_legacy') {
      this.insertIntoBasicCompose(str);
    }
    if (this.type == 'salesNav') {
      this.insertIntoSalesNavCompose(str);
    }
    if (this.type == 'recruiter' || this.type == 'recruiterPopout') {
      this.insertIntoRecruiterCompose(str);
    }
  }
  insertIntoRecruiterCompose(str) {
    if (!this.insertElement) {
      return;
    }
    this.insertElement.value = this.insertElement.value + ' ' + str;
    this.insertElement.focus();
    this.insertElement.dispatchEvent(new Event('input', {
      bubbles: !0
    }));
  }
  insertIntoSalesNavCompose(str) {
    if (!this.insertElement) {
      return;
    }
    this.insertElement.value = this.insertElement.value + ' ' + str;
    this.insertElement.focus();
    this.insertElement.dispatchEvent(new Event('input', {
      bubbles: !0
    }));
  }
  insertIntoBasicCompose(str) {
    var _document$getSelectio;
    const content = document.createElement('p');
    content.innerText = str;
    this.insertElement.appendChild(content);
    this.insertElement.dispatchEvent(new Event('input', {
      bubbles: !0
    }));

    // collapse selection to the end
    this.insertElement.focus();
    document.execCommand('selectAll', false, undefined);
    (_document$getSelectio = document.getSelection()) == null || _document$getSelectio.collapseToEnd();

    // Move scroll to make sure link is in view
    const scrollContainer = this.insertElement.closest('.msg-form__msg-content-container--scrollable');
    if (!scrollContainer) {
      return;
    }
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }
  adjustPopover() {
    let location = undefined;
    const height = this.calculatedPopoverHeight();
    if (this.el) {
      location = this.el.getBoundingClientRect();
      if ((this.type == 'recruiter' || this.type == 'salesNav') && this.button) {
        location = this.button.getBoundingClientRect();
      }
      this.popover().css('top', `${location.top - height - 12}px`);
      this.popover().css('left', `${location.left}px`);
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
    this.button.id = `button-${this.id}`;
    this.buttonFrame.id = `button-frame-${this.id}`;
    this.buttonFrame.src = this.buttonFrame.src + `&composeid=${this.id}&type=${this.type}`;
    if (this.isFirefox) {
      var _getPrevSibling;
      // Firefox focuses on the iframe before going to the next element inside the iframe.
      // So we prevent this behavior and manually focus the next element inside it.
      (_getPrevSibling = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_2__.getPrevSibling)(this.button)) == null || _getPrevSibling.addEventListener('keydown', e => {
        if (e.code === 'Tab' && !e.shiftKey) {
          var _this$buttonFrame$con;
          e.preventDefault();
          (_this$buttonFrame$con = this.buttonFrame.contentWindow) == null || _this$buttonFrame$con.postMessage({
            action: 'focusLinkedInButton'
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
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('#linkedInPopover').remove();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).removeClass('calendly-handled');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.el).closest('.calendly-handled').removeClass('calendly-handled');
  }
}

/***/ }),

/***/ "../../libs/features/linkedin/src/lib/ebnf/ebnf.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ebnf: () => (/* binding */ ebnf)
/* harmony export */ });
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/webextension-polyfill/dist/browser-polyfill.js");
/* harmony import */ var webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webextension_polyfill__WEBPACK_IMPORTED_MODULE_0__);
// eslint-disable-next-line

function taskPermissible(task, entity, refs) {
  const taskString = JSON.stringify({
    task,
    entity,
    refs
  });
  const blockList = ['eval', 'script', 'window', 'location', 'text/javascript', 'javascript', 'alert', 'confirm', 'localStorage', 'sessionStorage', 'cookie', 'XML', 'innerHTML', 'outerHTML', 'insertAdjacentHTML', 'write', 'http'];
  const blockRegex = new RegExp(`(${blockList.join('|')})`, 'gim');
  if (taskString.match(blockRegex)) {
    throw Error('Malicious ebnf task identified');
  }
}
function get(subject, path, tryBind = true) {
  var _path, _path$shift, _path2, _path3;
  if (!Array.isArray(path)) path = (_path = path) == null ? void 0 : _path.split('.');
  const nextSubject = subject == null ? void 0 : subject[(_path$shift = (_path2 = path) == null ? void 0 : _path2.shift()) != null ? _path$shift : ''];
  if (((_path3 = path) == null ? void 0 : _path3.length) === 0 || nextSubject === undefined || nextSubject === null) {
    return tryBind ? nextSubject == null || nextSubject.bind == null ? void 0 : nextSubject.bind(subject) : nextSubject;
  } else {
    return get(nextSubject, path, tryBind);
  }
}
function joinStrings(...strings) {
  return strings.join('');
}
function getContext(task, entity) {
  if (task.context === 'document') {
    return document;
  } else if (task.context === 'browser') {
    return (webextension_polyfill__WEBPACK_IMPORTED_MODULE_0___default());
  } else {
    return entity;
  }
}
function parseTaskAction(task, entity, refs) {
  var _task$params$map, _task$params;
  const params = (_task$params$map = (_task$params = task.params) == null ? void 0 : _task$params.map(param => isRef(param) ? refs[param] : param)) != null ? _task$params$map : [];
  const context = getContext(task, entity);
  const action = get(context, task.action);
  return action.call(context, ...params);
}
function parseTaskProperty(task, entity) {
  const subject = get(entity, task.property, false);
  return subject;
}
function parseTaskXPath(task, entity) {
  var _task$action;
  const context = getContext(task, entity);
  const xPathResult = document.evaluate((_task$action = task.action) != null ? _task$action : '', context, null, XPathResult.ANY_TYPE, null);
  if ('each' in task) {
    const result = [];
    let nextResult = xPathResult.iterateNext();
    while (nextResult) {
      result.push(nextResult);
      nextResult = xPathResult.iterateNext();
    }
    return result;
  } else {
    return xPathResult.iterateNext();
  }
}
function parseTask(task, entity, refs) {
  if (task.action === 'callback') return;
  taskPermissible(task, entity, refs);
  if (task.xpath) {
    return parseTaskXPath(task, entity);
  }
  if ('property' in task) {
    return parseTaskProperty(task, entity);
  }
  if ('action' in task) {
    return parseTaskAction(task, entity, refs);
  }
  if ('ref' in task) {
    return entity;
  }
}
function parseCondition(condition, entity) {
  const operatorHandlers = {
    '===': (entity, value) => entity === value,
    '!==': (entity, value) => entity !== value,
    '==': (entity, value) => entity == value,
    '!=': (entity, value) => entity != value,
    '>': (entity, value) => entity > value,
    '>=': (entity, value) => entity >= value,
    '<': (entity, value) => entity < value,
    '<=': (entity, value) => entity <= value,
    falsy: entity => !entity,
    truthy: entity => !!entity
  };
  const result = operatorHandlers[condition.operator](entity, condition.value);
  if (!condition.then && !condition.else) {
    return result;
  } else if (result) {
    return condition.then;
  } else {
    return condition.else;
  }
}
function delay() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 150);
  });
}
async function retry(callback) {
  let count = 0;
  while (count < 10) {
    await delay();
    if (callback()) {
      return;
    } else {
      count++;
    }
  }
  throw new Error('Async Task Failed');
}
function resolveEntity(task, entity, refs) {
  var _task$context, _task$context2;
  return isRef((_task$context = task.context) != null ? _task$context : '') ? refs[(_task$context2 = task.context) != null ? _task$context2 : ''] : entity;
}
function isRef(string) {
  var _string$startsWith;
  return (_string$startsWith = string == null || string.startsWith == null ? void 0 : string.startsWith('@')) != null ? _string$startsWith : false;
}
function applyProps(props, subject, refs) {
  for (const [key, value] of Object.entries(props)) {
    if (key === 'style') {
      applyProps(value, subject.style, refs);
    } else {
      const resolvedValue = isRef(value) ? refs[value] : value;
      subject[key] = resolvedValue;
    }
  }
}
async function _ebnf(tasks, callback, refs = {}, entity) {
  mainLoop: for (const task of tasks) {
    const resolvedEntity = resolveEntity(task, entity, refs);
    let result = parseTask(task, resolvedEntity, refs);
    if (!result && task.async) {
      await retry(() => {
        result = parseTask(task, resolvedEntity, refs);
        return result;
      });
    }
    if ('conditions' in task) {
      for (const condition of task.conditions) {
        const conditionResult = parseCondition(condition, result);
        if (conditionResult === 'break') break mainLoop;
        if (condition.ref) refs[condition.ref] = conditionResult;
      }
    }
    if (task.ref) {
      if (task.unit) {
        result = joinStrings(result, task.unit);
      }
      refs[task.ref] = result;
    }
    if (task.props) {
      applyProps(task.props, result, refs);
    }
    if (task.action === 'callback') {
      callback(refs['@elementRef'], refs['@buttonRef'], refs['@frameRef'], refs['@insertElement']);
      break;
    }
    if ('do' in task) {
      _ebnf(task.do, callback, refs, result);
    } else if ('each' in task) {
      for (const item of result) {
        _ebnf(task.each, callback, refs, item);
      }
    }
  }
}
function ebnf(tasks, callback) {
  return _ebnf(tasks, callback);
}

/***/ }),

/***/ "../../libs/features/linkedin/src/lib/popover/eventTypeItem/eventTypeItem.tsx":
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
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var _client_core_shared_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/shared/components/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/types/src/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/linkedin/src/lib/popover/eventTypeItem/eventTypeItem.tsx";












const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "eventTypeItem__Container",
  componentId: "sc-1q1ln5e-0"
})(["display:flex;flex-direction:row;box-sizing:border-box;justify-content:space-between;border:1px solid ", ";border-radius:4px;box-shadow:", ";height:95px;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey3, _client_core_theme__WEBPACK_IMPORTED_MODULE_7__.composePopoverItemShadow);
const ColorBar = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "eventTypeItem__ColorBar",
  componentId: "sc-1q1ln5e-1"
})(["width:5px;border-radius:4px 0px 0px 4px;background:", ";"], props => props.color);
const Body = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "eventTypeItem__Body",
  componentId: "sc-1q1ln5e-2"
})(["display:flex;flex-direction:column;flex:1;min-width:100px;"]);
const TitleContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "eventTypeItem__TitleContainer",
  componentId: "sc-1q1ln5e-3"
})(["display:flex;justify-content:space-between;flex:1;padding:4px 8px 0 12px;"]);
const Title = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].span.withConfig({
  displayName: "eventTypeItem__Title",
  componentId: "sc-1q1ln5e-4"
})(["display:block;min-height:18px;max-width:200px;padding:0 8px 0 0;line-height:17px;font-size:14px;color:", ";overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorSecondary1);
const SubTitle = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].span.withConfig({
  displayName: "eventTypeItem__SubTitle",
  componentId: "sc-1q1ln5e-5"
})(["display:flex;align-items:center;padding:8px 7px 8px 12px;line-height:15px;font-size:12px;color:", ";"], _client_core_theme__WEBPACK_IMPORTED_MODULE_7__.textColorL1_5);
const InternalNote = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_10__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_3__.InternalNoteIcon_2021).attrs(props => ({
  alt: 'internal note',
  draggable: false
})).withConfig({
  displayName: "eventTypeItem__InternalNote",
  componentId: "sc-1q1ln5e-6"
})(["position:relative;top:3px;margin-left:7px;height:12px;"]);
const ButtonContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "eventTypeItem__ButtonContainer",
  componentId: "sc-1q1ln5e-7"
})(["display:flex;border-top:1px solid ", ";color:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey4, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorSecondary2);
const DefaultButton = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].button.withConfig({
  displayName: "eventTypeItem__DefaultButton",
  componentId: "sc-1q1ln5e-8"
})(["box-sizing:border-box;padding:8px 4px;font-size:12px;border:none;outline:none;background:inherit;flex-grow:1;text-align:center;cursor:pointer;white-space:nowrap;&:hover,&:focus{text-decoration:underline;}"]);
const CopyButton = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_10__["default"])(DefaultButton).withConfig({
  displayName: "eventTypeItem__CopyButton",
  componentId: "sc-1q1ln5e-9"
})(["border-right:1px solid ", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey4);
const CopySULButton = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_10__["default"])(DefaultButton).withConfig({
  displayName: "eventTypeItem__CopySULButton",
  componentId: "sc-1q1ln5e-10"
})([""]);
const Tooltip = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.attrs(props => ({
  'data-cui-tooltip': props.text,
  className: `${props.text && props.text.length >= 53 ? 'wrap' : ''} small`
})).withConfig({
  displayName: "eventTypeItem__Tooltip",
  componentId: "sc-1q1ln5e-11"
})([""]);
const EventTypeItem = props => {
  const composeId = (0,qs__WEBPACK_IMPORTED_MODULE_1__.parse)(window.location.search, {
    ignoreQueryPrefix: true
  })['id'];
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.usePlatform)();
  if (!platform) {
    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
      children: "Missing platform in eventTypeItem"
    }, void 0, false);
  }
  const {
    id,
    name,
    color,
    duration,
    kind_description: kindDescription,
    booking,
    internal_note: internalNote
  } = props.eventType;
  const url = booking.url;
  const onCopySULClick = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_4__.debounce)(async () => {
    var _window$top;
    const link = await platform.calendlyApi.postSingleUseLink(id);
    (_window$top = window.top) == null || _window$top.postMessage({
      action: 'insert',
      text: link.booking_url,
      // should come from link above
      composeId
    }, '*');
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_8__.AnalyticsEvent.LinkedInCopySUL, {
      id: id,
      url: url,
      index: String(props.index),
      source: props.source
    });
  }, 1500, true);
  const onCopyLinkPress = (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_4__.debounce)(() => {
    var _window$top2;
    (_window$top2 = window.top) == null || _window$top2.postMessage({
      action: 'insert',
      text: url,
      composeId
    }, '*');
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_8__.AnalyticsEvent.LinkedInCopyLink, {
      id: id,
      url: url,
      index: String(props.index),
      source: props.source
    });
  }, 1500, true);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Container, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(ColorBar, {
      color: color
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 187,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Body, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(TitleContainer, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Title, {
          children: name
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 190,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_client_core_shared_components__WEBPACK_IMPORTED_MODULE_6__.EditAction, {
          eventType: props.eventType,
          source: "linkedin"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 191,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 189,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(SubTitle, {
        children: [`${duration} • ${kindDescription}`, internalNote ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(Tooltip, {
          text: internalNote,
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(InternalNote, {}, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 197,
            columnNumber: 15
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 196,
          columnNumber: 13
        }, undefined) : undefined]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 193,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(ButtonContainer, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(CopyButton, {
          onClick: onCopyLinkPress,
          children: "Insert link"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 202,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(CopySULButton, {
          onClick: onCopySULClick,
          children: "Insert single-use link"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 203,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 201,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 188,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 186,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "../../libs/features/linkedin/src/lib/popover/index.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkedInComposePopover: () => (/* binding */ LinkedInComposePopover)
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
/* harmony import */ var _eventTypeItem_eventTypeItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/features/linkedin/src/lib/popover/eventTypeItem/eventTypeItem.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/features/linkedin/src/lib/popover/index.tsx";











const LinkedInComposePopover = () => {
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_4__.usePlatform)();
  const [source, setSource] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const store = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.DataStoreContext);
  const recentlyUsedEts = (0,zustand__WEBPACK_IMPORTED_MODULE_9__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.recentlyUsedEventTypesSelector);
  const popoverComposeId = (0,zustand__WEBPACK_IMPORTED_MODULE_9__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.linkedinPopoverComposeIdSelector);
  const updatePopover = (0,zustand__WEBPACK_IMPORTED_MODULE_9__.useStore)(store, _client_core_store__WEBPACK_IMPORTED_MODULE_5__.updatePopoverDataSelector);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type) {
      if (type === 'basic' || type === 'basicPopout' || type === 'basic_legacy') {
        setSource('messenger');
      } else if (type === 'recruiter' || type === 'recruiterPopout') {
        setSource('recruiter');
      } else if (type === 'salesNav') {
        setSource('salesnav');
      } else {
        console.warn('Unexpected type for linkedIn - ', type);
        setSource(type);
      }
    }
    const handleMesssage = msg => {
      var _msg$data;
      if (((_msg$data = msg.data) == null ? void 0 : _msg$data.action) === 'focusLinkedInPopover') {
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
          action: 'focusLinkedInButton',
          composeId: popoverComposeId
        }, '*');
      }
    };
    const handleLastEl = e => {
      if (e instanceof KeyboardEvent && e.code === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.linkedinv1, {
          showPopover: false
        });
        window.parent.postMessage({
          action: 'focusLinkedInButtonNextElement',
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
  }, [recentlyUsedEts, popoverComposeId, store, updatePopover]);
  const onShowMoreClick = () => {
    updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.linkedinv1, {
      showPopover: false
    });
    platform.flow.sidebar({
      tabName: 'event_types'
    });
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_6__.AnalyticsEvent.LinkedInShowMoreEventTypes, {
      source
    });
  };
  const onOneOffClick = () => {
    updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.linkedinv1, {
      showPopover: false
    });
    platform.flow.webOneOff({
      source: 'linkedin'
    });
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_6__.AnalyticsEvent.LinkedInOpenOneOff, {
      source
    });
  };
  const onPollClick = () => {
    updatePopover(_client_core_store__WEBPACK_IMPORTED_MODULE_5__.IntegrationId.linkedinv1, {
      showPopover: false
    });
    platform.flow.webPolls({
      source: 'linkedin'
    });
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_6__.AnalyticsEvent.LinkedInOpenPoll, {
      source
    });
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Container, {
    ref: containerRef,
    etCount: recentlyUsedEts.length,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Header, {
      children: "Recently used event types"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(List, {
      children: recentlyUsedEts.map((et, index) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_eventTypeItem_eventTypeItem__WEBPACK_IMPORTED_MODULE_7__.EventTypeItem, {
        eventType: et,
        index: index,
        source: source
      }, et.id, false, {
        fileName: _jsxFileName,
        lineNumber: 144,
        columnNumber: 11
      }, undefined))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Footer, {
      onClick: onShowMoreClick,
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(ShowMoreIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 153,
        columnNumber: 9
      }, undefined), " See all event types"]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Footer, {
      onClick: onOneOffClick,
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(OneOffIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 156,
        columnNumber: 9
      }, undefined), " Create one-off meeting"]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(Footer, {
      onClick: onPollClick,
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(PollsIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 159,
        columnNumber: 9
      }, undefined), " Create poll"]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 158,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 140,
    columnNumber: 5
  }, undefined);
};
const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "popover__Container",
  componentId: "csaq36-0"
})(["position:absolute;top:0px;left:0px;display:flex;flex-direction:column;box-sizing:border-box;border:1px solid ", ";border-radius:8px;pointer-events:auto;background:#ffffff;width:100vw;height:100vh;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey3);
const Header = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "popover__Header",
  componentId: "csaq36-1"
})(["font-size:14px;font-weight:600;margin-bottom:12px;padding:16px 12px 0px;"]);
const List = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div.withConfig({
  displayName: "popover__List",
  componentId: "csaq36-2"
})(["display:flex;flex-direction:column;overflow-y:auto;flex-grow:1;padding:0px 12px;gap:12px;"]);
const Footer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].button.withConfig({
  displayName: "popover__Footer",
  componentId: "csaq36-3"
})(["display:flex;align-items:center;box-sizing:border-box;margin:0px 0px 12px;padding:0px;cursor:pointer;font-size:14px;line-height:16px;color:", ";border:none;outline:none;background:inherit;&:focus,&:hover{text-decoration:underline;}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorSecondary1);
const ShowMoreIcon = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_10__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.LinkedinShowMore).attrs(props => ({
  alt: 'Open sidebar icon'
})).withConfig({
  displayName: "popover__ShowMoreIcon",
  componentId: "csaq36-4"
})(["margin:0px 5px 0px 12px;"]);
const OneOffIcon = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_10__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.LinkedinOneOff).attrs(props => ({
  alt: 'One-off meeting icon'
})).withConfig({
  displayName: "popover__OneOffIcon",
  componentId: "csaq36-5"
})(["margin:0px 5px 0px 12px;"]);
const PollsIcon = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_10__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_2__.LinkedinPolls).attrs(props => ({
  alt: 'Polls icon'
})).withConfig({
  displayName: "popover__PollsIcon",
  componentId: "csaq36-6"
})(["margin:0px 5px 0px 12px;"]);

/***/ })

}]);