"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["default-libs_shared_components_src_index_ts-_calendly_ui_dist_components_bare-button_styles_j-49f944"],{

/***/ "../../libs/helpers/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CopyAsyncResultToClipboard: () => (/* reexport safe */ _lib_copyTextToClipboard__WEBPACK_IMPORTED_MODULE_5__.CopyAsyncResultToClipboard),
/* harmony export */   DateTimeFormat: () => (/* reexport safe */ _lib_dateTime__WEBPACK_IMPORTED_MODULE_7__.DateTimeFormat),
/* harmony export */   assertValidDate: () => (/* reexport safe */ _lib_dateTime__WEBPACK_IMPORTED_MODULE_7__.assertValidDate),
/* harmony export */   capitalizeFirstLetter: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.capitalizeFirstLetter),
/* harmony export */   copyTextToClipboard: () => (/* reexport safe */ _lib_copyTextToClipboard__WEBPACK_IMPORTED_MODULE_5__.copyTextToClipboard),
/* harmony export */   debounce: () => (/* reexport safe */ _lib_debounce__WEBPACK_IMPORTED_MODULE_2__.debounce),
/* harmony export */   ensureElement: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.ensureElement),
/* harmony export */   firstLetter: () => (/* reexport safe */ _lib_firstLetter__WEBPACK_IMPORTED_MODULE_4__.firstLetter),
/* harmony export */   focusFirstChild: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.focusFirstChild),
/* harmony export */   focusLastChild: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.focusLastChild),
/* harmony export */   focusNextSibling: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.focusNextSibling),
/* harmony export */   focusPrevSibling: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.focusPrevSibling),
/* harmony export */   formatDate: () => (/* reexport safe */ _lib_dateTime__WEBPACK_IMPORTED_MODULE_7__.formatDate),
/* harmony export */   formatMeetingRange: () => (/* reexport safe */ _lib_dateTime__WEBPACK_IMPORTED_MODULE_7__.formatMeetingRange),
/* harmony export */   formatTime: () => (/* reexport safe */ _lib_dateTime__WEBPACK_IMPORTED_MODULE_7__.formatTime),
/* harmony export */   formatTimeRange: () => (/* reexport safe */ _lib_dateTime__WEBPACK_IMPORTED_MODULE_7__.formatTimeRange),
/* harmony export */   getAvatarUrl: () => (/* reexport safe */ _lib_getAvatarUrl__WEBPACK_IMPORTED_MODULE_1__.getAvatarUrl),
/* harmony export */   getFirstFocusableChild: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.getFirstFocusableChild),
/* harmony export */   getFocusableElements: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.getFocusableElements),
/* harmony export */   getLastFocusableChild: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.getLastFocusableChild),
/* harmony export */   getNextSibling: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.getNextSibling),
/* harmony export */   getPrevSibling: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.getPrevSibling),
/* harmony export */   isPretendModeError: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.isPretendModeError),
/* harmony export */   isUnsupportedUri: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.isUnsupportedUri),
/* harmony export */   notEmpty: () => (/* reexport safe */ _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__.notEmpty),
/* harmony export */   sleep: () => (/* reexport safe */ _lib_sleep__WEBPACK_IMPORTED_MODULE_6__.sleep),
/* harmony export */   stopPropagation: () => (/* reexport safe */ _lib_stopPropagation__WEBPACK_IMPORTED_MODULE_3__.stopPropagation)
/* harmony export */ });
/* harmony import */ var _lib_focusHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/helpers/src/lib/focusHelpers.ts");
/* harmony import */ var _lib_getAvatarUrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/helpers/src/lib/getAvatarUrl.ts");
/* harmony import */ var _lib_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/helpers/src/lib/debounce.ts");
/* harmony import */ var _lib_stopPropagation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/helpers/src/lib/stopPropagation.ts");
/* harmony import */ var _lib_firstLetter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/helpers/src/lib/firstLetter.ts");
/* harmony import */ var _lib_copyTextToClipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/helpers/src/lib/copyTextToClipboard.ts");
/* harmony import */ var _lib_sleep__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/helpers/src/lib/sleep.ts");
/* harmony import */ var _lib_dateTime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/helpers/src/lib/dateTime.ts");









/***/ }),

/***/ "../../libs/helpers/src/lib/copyTextToClipboard.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CopyAsyncResultToClipboard: () => (/* binding */ CopyAsyncResultToClipboard),
/* harmony export */   copyTextToClipboard: () => (/* binding */ copyTextToClipboard)
/* harmony export */ });
function copyTextToClipboard(input, {
  target = document.body
} = {}) {
  const element = document.createElement('textarea');
  const previouslyFocusedElement = document.activeElement;
  element.value = input;

  // Prevent keyboard from showing on mobile
  element.setAttribute('readonly', '');
  element.style.contain = 'strict';
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  element.style.fontSize = '12pt'; // Prevent zooming on iOS

  const selection = document.getSelection();
  let originalRange = false;
  if (selection !== null && selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0);
  }
  target.append(element);
  element.select();

  // Explicit selection workaround for iOS
  element.selectionStart = 0;
  element.selectionEnd = input.length;
  let isSuccess = false;
  try {
    isSuccess = document.execCommand('copy');
  } catch (_unused) {
    console.warn('Failed copy command!');
  }
  element.remove();
  if (originalRange && selection !== null) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }

  // Get the focus back on the previously focused element, if any
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }
  return isSuccess;
}

// Ok - so MS is a pain in the butt and are currently refusing to set 'allow="clipboard-write"' in
// the iframe hosting the addin (see: https://github.com/OfficeDev/office-js/issues/1991).
// This impacts both Chrome & Edge which support those frame flags but does not impact safari
// (which does not).
// On the other side... Firefox does not properly support the new async Clipboard Api at all
// (they technically do - but it's locked behind a preference and is off by default)
async function CopyAsyncResultToClipboard(data, mime = 'text/plain') {
  let res = false;
  try {
    await navigator.clipboard.write([new ClipboardItem({
      [mime]: data
    })]);
    res = true;
  } catch (err) {
    const d = await data;
    res = copyTextToClipboard(d);
  }
  return res;
}

/***/ }),

/***/ "../../libs/helpers/src/lib/dateTime.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DateTimeFormat: () => (/* binding */ DateTimeFormat),
/* harmony export */   assertValidDate: () => (/* binding */ assertValidDate),
/* harmony export */   formatDate: () => (/* binding */ formatDate),
/* harmony export */   formatMeetingRange: () => (/* binding */ formatMeetingRange),
/* harmony export */   formatTime: () => (/* binding */ formatTime),
/* harmony export */   formatTimeRange: () => (/* binding */ formatTimeRange)
/* harmony export */ });
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/luxon/src/luxon.js");

function assertValidDate(date) {
  if (!date.isValid) {
    throw new Error(`Invalid date ${date.toString()}: ${date.invalidReason}, ${date.invalidExplanation}`);
  }
}
let DateTimeFormat = /*#__PURE__*/function (DateTimeFormat) {
  DateTimeFormat["EEEE_MMM_D"] = "EEEE, MMM. d";
  DateTimeFormat["EEE_MMM_D_YYYY"] = "EEE, MMM. d yyyy";
  DateTimeFormat["MMMM_DD_YYYY"] = "MMMM dd, yyyy";
  DateTimeFormat["EEE_MMM_D"] = "EEE, MMM. d";
  DateTimeFormat["EEE"] = "EEE";
  DateTimeFormat["MMM_YYYY"] = "MMM. yyyy";
  return DateTimeFormat;
}({});
const LOCALE = 'en-US';
function formatDate(date, format) {
  assertValidDate(date);
  return date.setLocale(LOCALE).toFormat(format);
}

/**
 * Formats a time
 * Example: `4:00pm`
 *
 * @param time
 */
function formatTime(time) {
  return time.setLocale(LOCALE).toFormat('h:mm a').toLowerCase();
}

/**
 * Formats a time range according to the following rules:
 * 1. When both hours are same meridiem: `4:23–6:23pm`
 * 2. When they are different meridiems: `4:23pm–6:23am`
 * 2. When minutes are "00": `4–6:40pm` or `4:10pm–6pm` or `4pm–6pm`
 *
 * @param startTime Start time of the range
 * @param endTime End time of the range
 *
 * @returns Formatted time range
 */
function formatTimeRange(startTime, endTime) {
  const startTimeLocal = startTime.setLocale(LOCALE);
  const endTimeLocal = endTime.setLocale(LOCALE);
  const startMeridiem = startTimeLocal.toFormat('a').toLowerCase();
  const endMeridiem = endTimeLocal.toFormat('a').toLowerCase();
  const formattedStartTime = startTimeLocal.toFormat(startTimeLocal.minute === 0 ? 'h' : 'h:mm');
  const formattedEndTime = endTimeLocal.toFormat(endTimeLocal.minute === 0 ? 'h' : 'h:mm');
  const formattedStartMeridiem = startMeridiem !== endMeridiem ? startMeridiem : '';
  return `${formattedStartTime}${formattedStartMeridiem}–${formattedEndTime}${endMeridiem}`;
}

/**
 * Format meeting range.
 * - `Wed, Sep. 15 2021, 4:00–6:00pm`
 * - If today: `Today, 4:00–6:00pm`
 * @param start - Start time of the meeting
 * @param end - End time of the meeting
 * @param dateFormat - Date format
 */
function formatMeetingRange(start, end, dateFormat = DateTimeFormat.EEE_MMM_D_YYYY) {
  const isMeetingToday = +start.startOf('day') === +luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.now().startOf('day');
  const date = isMeetingToday ? 'Today' : formatDate(start, dateFormat);
  const timeRange = formatTimeRange(start, end);
  return `${date}, ${timeRange}`;
}

/***/ }),

/***/ "../../libs/helpers/src/lib/debounce.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce)
/* harmony export */ });
function debounce(func, wait, immediate = false) {
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
}

/***/ }),

/***/ "../../libs/helpers/src/lib/firstLetter.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   firstLetter: () => (/* binding */ firstLetter)
/* harmony export */ });
const firstLetter = text => {
  return text.charAt(0).toUpperCase();
};

/***/ }),

/***/ "../../libs/helpers/src/lib/focusHelpers.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capitalizeFirstLetter: () => (/* binding */ capitalizeFirstLetter),
/* harmony export */   ensureElement: () => (/* binding */ ensureElement),
/* harmony export */   focusFirstChild: () => (/* binding */ focusFirstChild),
/* harmony export */   focusLastChild: () => (/* binding */ focusLastChild),
/* harmony export */   focusNextSibling: () => (/* binding */ focusNextSibling),
/* harmony export */   focusPrevSibling: () => (/* binding */ focusPrevSibling),
/* harmony export */   getFirstFocusableChild: () => (/* binding */ getFirstFocusableChild),
/* harmony export */   getFocusableElements: () => (/* binding */ getFocusableElements),
/* harmony export */   getLastFocusableChild: () => (/* binding */ getLastFocusableChild),
/* harmony export */   getNextSibling: () => (/* binding */ getNextSibling),
/* harmony export */   getPrevSibling: () => (/* binding */ getPrevSibling),
/* harmony export */   isPretendModeError: () => (/* binding */ isPretendModeError),
/* harmony export */   isUnsupportedUri: () => (/* binding */ isUnsupportedUri),
/* harmony export */   notEmpty: () => (/* binding */ notEmpty)
/* harmony export */ });
// eslint-disable-next-line

function ensureElement(elemOrId) {
  if (typeof elemOrId === 'string') {
    const elem = document.getElementById(elemOrId);
    if (elem) {
      return elem;
    } else {
      throw new Error('unable to find element with id:' + elemOrId);
    }
  } else {
    return elemOrId;
  }
}
function capitalizeFirstLetter(input) {
  return input[0].toUpperCase() + input.slice(1);
}
function notEmpty(value) {
  return value !== null && value !== undefined;
}
function isUnsupportedUri(url) {
  if (url.startsWith('https://chrome.google.com')) {
    return true;
  }
  if (url.startsWith('https://addons.mozilla.org')) {
    return true;
  }
  return url.match(new RegExp('^(http|https|ftp|file|chrome-extension|moz-extension)://', 'i')) ? false : true;
}
function isPretendModeError(err) {
  var _err$response;
  const responseBody = (_err$response = err.response) == null ? void 0 : _err$response.data;
  if (responseBody && responseBody['message'] && responseBody['message'] === 'Pretend mode is prohibited') {
    return true;
  }
  return false;
}
const focusableElementSelector = ['a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"]):not([disabled])'].join();
function getFocusableElements(element) {
  return element == null ? void 0 : element.querySelectorAll(focusableElementSelector);
}
function getFirstFocusableChild(element) {
  const firstEl = element == null ? void 0 : element.querySelector(focusableElementSelector);
  if (firstEl instanceof HTMLElement) {
    return firstEl;
  }
  return null;
}
function getLastFocusableChild(element) {
  const focusableElements = getFocusableElements(element);
  if (focusableElements != null && focusableElements.length) {
    const lastEl = focusableElements.item(focusableElements.length - 1);
    if (lastEl instanceof HTMLElement) {
      return lastEl;
    }
  }
  return null;
}
function getPrevSibling(element) {
  let node = element == null ? void 0 : element.previousSibling;
  while (node) {
    if (node.nodeType === 1 && node instanceof HTMLElement) {
      if (node.matches(focusableElementSelector)) {
        return node;
      } else {
        const lastEl = getLastFocusableChild(node);
        if (lastEl) {
          return lastEl;
        }
      }
    }
    node = node.previousSibling;
  }
  return null;
}
function getNextSibling(element) {
  let node = element == null ? void 0 : element.nextSibling;
  while (node) {
    if (node.nodeType === 1 && node instanceof HTMLElement) {
      if (node.matches(focusableElementSelector)) {
        return node;
      } else {
        const firstEl = getFirstFocusableChild(node);
        if (firstEl) {
          return firstEl;
        }
      }
    }
    node = node.nextSibling;
  }
  return null;
}
function focusFirstChild(element) {
  const firstEl = getFirstFocusableChild(element);
  if (firstEl) {
    firstEl.focus();
    return true;
  }
  return false;
}
function focusLastChild(element) {
  const lastEl = getLastFocusableChild(element);
  if (lastEl) {
    lastEl.focus();
    return true;
  }
  return false;
}
function focusPrevSibling(element) {
  const prevEl = getPrevSibling(element);
  if (prevEl) {
    prevEl.focus();
    return true;
  }
  return false;
}
function focusNextSibling(element) {
  const nextEl = getNextSibling(element);
  if (nextEl) {
    nextEl.focus();
    return true;
  }
  return false;
}

/***/ }),

/***/ "../../libs/helpers/src/lib/getAvatarUrl.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAvatarUrl: () => (/* binding */ getAvatarUrl)
/* harmony export */ });
function getAvatarUrl(url, apiHost) {
  if (!url) return url;
  if (url.startsWith('http')) {
    return url;
  } else {
    return `${apiHost}${url}`;
  }
}

/***/ }),

/***/ "../../libs/helpers/src/lib/sleep.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sleep: () => (/* binding */ sleep)
/* harmony export */ });
const sleep = ms => {
  return new Promise(resolve => {
    window.setTimeout(resolve, ms);
  });
};

/***/ }),

/***/ "../../libs/helpers/src/lib/stopPropagation.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stopPropagation: () => (/* binding */ stopPropagation)
/* harmony export */ });
const stopPropagation = handler => {
  return event => {
    event.stopPropagation();
    handler == null || handler(event);
  };
};

/***/ }),

/***/ "../../libs/shared/components/src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Accordion: () => (/* reexport safe */ _lib_accordion__WEBPACK_IMPORTED_MODULE_4__.Accordion),
/* harmony export */   AccordionItem: () => (/* reexport safe */ _lib_accordion__WEBPACK_IMPORTED_MODULE_4__.AccordionItem),
/* harmony export */   ActionsMenu: () => (/* reexport safe */ _lib_actionsMenu__WEBPACK_IMPORTED_MODULE_5__.ActionsMenu),
/* harmony export */   Alert: () => (/* reexport safe */ _lib_alert__WEBPACK_IMPORTED_MODULE_3__.Alert),
/* harmony export */   CheckboxDropdown: () => (/* reexport safe */ _lib_checkboxDropdown__WEBPACK_IMPORTED_MODULE_6__.CheckboxDropdown),
/* harmony export */   ClickableCard: () => (/* reexport safe */ _lib_clickableCard__WEBPACK_IMPORTED_MODULE_7__.ClickableCard),
/* harmony export */   Control: () => (/* reexport safe */ _lib_select__WEBPACK_IMPORTED_MODULE_9__.Control),
/* harmony export */   ControlUI: () => (/* reexport safe */ _lib_select__WEBPACK_IMPORTED_MODULE_9__.ControlUI),
/* harmony export */   EditAction: () => (/* reexport safe */ _lib_editAction__WEBPACK_IMPORTED_MODULE_1__.EditAction),
/* harmony export */   LoaderDots: () => (/* reexport safe */ _lib_loaderDots__WEBPACK_IMPORTED_MODULE_0__.LoaderDots),
/* harmony export */   Logo: () => (/* reexport safe */ _lib_logo__WEBPACK_IMPORTED_MODULE_2__.Logo),
/* harmony export */   MAX_OPTIONS_WIDTH: () => (/* reexport safe */ _lib_select__WEBPACK_IMPORTED_MODULE_9__.MAX_OPTIONS_WIDTH),
/* harmony export */   MultilineContainer: () => (/* reexport safe */ _lib_select__WEBPACK_IMPORTED_MODULE_9__.MultilineContainer),
/* harmony export */   Option: () => (/* reexport safe */ _lib_select__WEBPACK_IMPORTED_MODULE_9__.Option),
/* harmony export */   OptionUI: () => (/* reexport safe */ _lib_select__WEBPACK_IMPORTED_MODULE_9__.OptionUI),
/* harmony export */   Options: () => (/* reexport safe */ _lib_select__WEBPACK_IMPORTED_MODULE_9__.Options),
/* harmony export */   OptionsUI: () => (/* reexport safe */ _lib_select__WEBPACK_IMPORTED_MODULE_9__.OptionsUI),
/* harmony export */   Popover: () => (/* reexport safe */ _lib_popover__WEBPACK_IMPORTED_MODULE_11__.Popover),
/* harmony export */   PopoverClose: () => (/* reexport safe */ _lib_popover__WEBPACK_IMPORTED_MODULE_11__.PopoverClose),
/* harmony export */   PopoverContent: () => (/* reexport safe */ _lib_popover__WEBPACK_IMPORTED_MODULE_11__.PopoverContent),
/* harmony export */   PopoverTrigger: () => (/* reexport safe */ _lib_popover__WEBPACK_IMPORTED_MODULE_11__.PopoverTrigger),
/* harmony export */   RichTextEditor: () => (/* reexport safe */ _lib_richTextEditor__WEBPACK_IMPORTED_MODULE_12__.RichTextEditor),
/* harmony export */   SearchBar: () => (/* reexport safe */ _lib_searchBar__WEBPACK_IMPORTED_MODULE_8__.SearchBar),
/* harmony export */   Select: () => (/* reexport safe */ _lib_select__WEBPACK_IMPORTED_MODULE_9__.Select),
/* harmony export */   SelectUI: () => (/* reexport safe */ _lib_select__WEBPACK_IMPORTED_MODULE_9__.SelectUI),
/* harmony export */   TimezoneSelect: () => (/* reexport safe */ _lib_select__WEBPACK_IMPORTED_MODULE_9__.TimezoneSelect),
/* harmony export */   Tooltip: () => (/* reexport safe */ _lib_tooltip__WEBPACK_IMPORTED_MODULE_10__.Tooltip),
/* harmony export */   TooltipClose: () => (/* reexport safe */ _lib_tooltip__WEBPACK_IMPORTED_MODULE_10__.TooltipClose),
/* harmony export */   TooltipContent: () => (/* reexport safe */ _lib_tooltip__WEBPACK_IMPORTED_MODULE_10__.TooltipContent),
/* harmony export */   TooltipTrigger: () => (/* reexport safe */ _lib_tooltip__WEBPACK_IMPORTED_MODULE_10__.TooltipTrigger),
/* harmony export */   copyTextToClipboard: () => (/* reexport safe */ _lib_richTextEditor__WEBPACK_IMPORTED_MODULE_12__.copyTextToClipboard),
/* harmony export */   "default": () => (/* reexport safe */ _lib_logo__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   getOptionsWidth: () => (/* reexport safe */ _lib_select__WEBPACK_IMPORTED_MODULE_9__.getOptionsWidth),
/* harmony export */   groupAndFilterZones: () => (/* reexport safe */ _lib_select__WEBPACK_IMPORTED_MODULE_9__.groupAndFilterZones),
/* harmony export */   usePopover: () => (/* reexport safe */ _lib_popover__WEBPACK_IMPORTED_MODULE_11__.usePopover),
/* harmony export */   usePopoverContext: () => (/* reexport safe */ _lib_popover__WEBPACK_IMPORTED_MODULE_11__.usePopoverContext),
/* harmony export */   useTooltip: () => (/* reexport safe */ _lib_tooltip__WEBPACK_IMPORTED_MODULE_10__.useTooltip),
/* harmony export */   useTooltipContext: () => (/* reexport safe */ _lib_tooltip__WEBPACK_IMPORTED_MODULE_10__.useTooltipContext)
/* harmony export */ });
/* harmony import */ var _lib_loaderDots__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/loaderDots/index.ts");
/* harmony import */ var _lib_editAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/shared/components/src/lib/editAction/index.ts");
/* harmony import */ var _lib_logo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/shared/components/src/lib/logo/index.ts");
/* harmony import */ var _lib_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/shared/components/src/lib/alert/index.ts");
/* harmony import */ var _lib_accordion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/shared/components/src/lib/accordion/index.ts");
/* harmony import */ var _lib_actionsMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/shared/components/src/lib/actionsMenu/index.ts");
/* harmony import */ var _lib_checkboxDropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/shared/components/src/lib/checkboxDropdown/index.ts");
/* harmony import */ var _lib_clickableCard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/shared/components/src/lib/clickableCard/index.ts");
/* harmony import */ var _lib_searchBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/shared/components/src/lib/searchBar/index.ts");
/* harmony import */ var _lib_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../libs/shared/components/src/lib/select/index.ts");
/* harmony import */ var _lib_tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../libs/shared/components/src/lib/tooltip/index.ts");
/* harmony import */ var _lib_popover__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../libs/shared/components/src/lib/popover/index.ts");
/* harmony import */ var _lib_richTextEditor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../../libs/shared/components/src/lib/richTextEditor/index.ts");














/***/ }),

/***/ "../../libs/shared/components/src/lib/accordion/accordion.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Accordion: () => (/* binding */ Accordion)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/shared/components/src/lib/accordion/accordion.tsx";




const Accordion = ({
  children,
  defaultOpened: _defaultOpened = false,
  compactDesign: _compactDesign = false
}) => {
  const childrenArray = react__WEBPACK_IMPORTED_MODULE_1___default().Children.toArray(children);
  if (childrenArray.length === 0) return null;
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(AccordionGroup, {
    children: children,
    defaultOpened: _defaultOpened,
    compactDesign: _compactDesign
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 30,
    columnNumber: 5
  }, undefined);
};
const AccordionGroup = ({
  children,
  defaultOpened,
  compactDesign
}) => {
  const firstChild = react__WEBPACK_IMPORTED_MODULE_1___default().Children.toArray(children)[0];
  const firstChildId = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().isValidElement(firstChild) ? firstChild.props.id : null;
  const [expandedId, setExpandedId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (defaultOpened && react__WEBPACK_IMPORTED_MODULE_1___default().Children.count(children) === 1) {
      setExpandedId(firstChildId);
    }
  }, [defaultOpened, firstChildId]);
  const handleAccordionChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(id => {
    setExpandedId(prevId => prevId === id ? null : id);
  }, []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(AccordionGroupContainer, {
    compactDesign: compactDesign,
    children: react__WEBPACK_IMPORTED_MODULE_1___default().Children.map(children, child => {
      if ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().isValidElement(child)) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().cloneElement(child, {
          expanded: child.props.id === expandedId,
          onToggle: () => handleAccordionChange(child.props.id)
        });
      }
      return child;
    })
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 61,
    columnNumber: 5
  }, undefined);
};
const AccordionGroupContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div.withConfig({
  displayName: "accordion__AccordionGroupContainer",
  componentId: "sc-1siazgs-0"
})(["display:flex;flex-direction:column;gap:8px;height:100%;", ""], ({
  compactDesign
}) => compactDesign && `
    gap: 0;
    border: 1px solid ${_calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey3};
    border-radius: 8px;
    overflow: hidden;
  `);

/***/ }),

/***/ "../../libs/shared/components/src/lib/accordion/accordionItem.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccordionItem: () => (/* binding */ AccordionItem)
/* harmony export */ });
/* harmony import */ var _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/icons/index.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/shared/components/src/lib/accordion/accordionItem.tsx";





const Header = ({
  children,
  expanded,
  controlledComponent,
  onToggle
}) => {
  if (controlledComponent) {
    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(AccordionHeader, {
      onClick: onToggle,
      children: children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 12
    }, undefined);
  }
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(AccordionHeader, {
    onClick: onToggle,
    children: [children, /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(ExpandableIcon, {
      expanded: expanded
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 36,
    columnNumber: 5
  }, undefined);
};
const Body = ({
  children,
  expanded
}) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(AccordionBody, {
  expanded: expanded || false,
  children: children
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 44,
  columnNumber: 3
}, undefined);
const Footer = ({
  children,
  expanded
}) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(AccordionFooter, {
  expanded: expanded || false,
  children: children
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 51,
  columnNumber: 3
}, undefined);
const ExpandableIcon = ({
  expanded
}) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(ExpandableIconContainer, {
  expanded: expanded,
  children: expanded ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__.ArrowChevronUpMiniIcon, {
    color: _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.primaryColorL1
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 57,
    columnNumber: 7
  }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_0__.ArrowChevronDownMiniIcon, {
    color: _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.primaryColorL1
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 59,
    columnNumber: 7
  }, undefined)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 55,
  columnNumber: 3
}, undefined);
const AccordionItem = ({
  id,
  expanded: _expanded = false,
  onToggle,
  children,
  className
}) => {
  const childrenWithProps = react__WEBPACK_IMPORTED_MODULE_2___default().Children.map(children, child => {
    if ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().isValidElement(child) && (child.type === Body || child.type === Footer || child.type === Header)) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().cloneElement(child, {
        id,
        expanded: _expanded,
        onToggle
      });
    }
    return child;
  });
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(AccordionContainer, {
    onKeyDown: event => {
      if (event.key === 'Enter' && event.target === event.currentTarget) {
        onToggle();
      }
    },
    tabIndex: 0,
    "aria-expanded": _expanded,
    expanded: _expanded,
    className: className,
    children: childrenWithProps
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 84,
    columnNumber: 5
  }, undefined);
};
const ExpandableIconContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "accordionItem__ExpandableIconContainer",
  componentId: "sdtkbw-0"
})(["display:flex;align-items:center;justify-content:center;transition:transform 0.3s ease;visibility:", ";opacity:", ";padding:12px;"], ({
  expanded
}) => expanded ? 'visible' : 'hidden', ({
  expanded
}) => expanded ? 1 : 0);
const AccordionContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "accordionItem__AccordionContainer",
  componentId: "sdtkbw-1"
})(["display:flex;flex-direction:column;align-items:center;padding:", ";border-radius:", ";border:", ";&:hover{", " ", "{visibility:visible;opacity:1;}}outline:none;&:focus-visible{outline:2px solid ", ";outline-offset:-2px;border-radius:12px;}"], ({
  expanded
}) => expanded ? '8px 0 8px 0' : '0', ({
  expanded
}) => expanded ? '12px' : '8px', ({
  expanded
}) => expanded ? `1px solid ${_calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.colorStrokeMedium}` : 'none', ({
  expanded
}) => !expanded && (0,styled_components__WEBPACK_IMPORTED_MODULE_4__.css)(["background:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.primaryColorL4), ExpandableIconContainer, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.primaryColorL1);
const AccordionHeader = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "accordionItem__AccordionHeader",
  componentId: "sdtkbw-2"
})(["display:flex;width:100%;height:100%;justify-content:space-between;align-items:center;cursor:pointer;"]);
const AccordionBody = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "accordionItem__AccordionBody",
  componentId: "sdtkbw-3"
})(["display:", ";width:100%;"], ({
  expanded
}) => expanded ? 'block' : 'none');
const AccordionFooter = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "accordionItem__AccordionFooter",
  componentId: "sdtkbw-4"
})(["display:", ";border-top:", ";width:calc(100% - 40px);"], ({
  expanded
}) => expanded ? 'flex' : 'none', ({
  expanded
}) => expanded ? `1px solid ${_calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.colorGrey3}` : 'none');
AccordionItem.Header = Header;
AccordionItem.Body = Body;
AccordionItem.Footer = Footer;

/***/ }),

/***/ "../../libs/shared/components/src/lib/accordion/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Accordion: () => (/* reexport safe */ _accordion__WEBPACK_IMPORTED_MODULE_1__.Accordion),
/* harmony export */   AccordionItem: () => (/* reexport safe */ _accordionItem__WEBPACK_IMPORTED_MODULE_0__.AccordionItem)
/* harmony export */ });
/* harmony import */ var _accordionItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/accordion/accordionItem.tsx");
/* harmony import */ var _accordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/shared/components/src/lib/accordion/accordion.tsx");



/***/ }),

/***/ "../../libs/shared/components/src/lib/actionsMenu/actionsMenu.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionsMenu: () => (/* binding */ ActionsMenu)
/* harmony export */ });
/* harmony import */ var _calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _calendly_ui_components_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/index.js");
/* harmony import */ var _calendly_ui_components_icon_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/icon-button/index.js");
/* harmony import */ var _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/icons/index.js");
/* harmony import */ var _calendly_ui_components_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/menu/index.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/shared/components/src/lib/actionsMenu/actionsMenu.tsx";









const getActionColor = color => {
  switch (color) {
    case 'primary':
      return _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.primaryColorL1;
    case 'danger':
      return _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.colorError;
    case 'ghost':
      return '#000';
    default:
      return 'inherit';
  }
};
const ActionsMenu = ({
  actions,
  maxVisible,
  gap: _gap = '10px',
  justifyContent: _justifyContent = 'space-between'
}) => {
  const [toggleDropdown, Wrapper] = (0,_calendly_ui_components_dropdown__WEBPACK_IMPORTED_MODULE_1__.useDropdown)();
  const visibleActions = actions.slice(0, maxVisible);
  const hiddenActions = actions.slice(maxVisible);
  const render = prop => {
    if (typeof prop === 'function') {
      return prop();
    } else {
      return prop;
    }
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(ActionsContainer, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(ActionGroup, {
      gap: _gap,
      justifyContent: _justifyContent,
      children: visibleActions.map(({
        icon,
        label,
        onClick,
        link,
        color,
        isLoading,
        loadingContent
      }, index) => {
        if (isLoading) {
          return loadingContent;
        }
        if (link) {
          return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(ActionLink, {
            color: color,
            href: link,
            target: "_blank",
            children: [render(icon), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(ActionLabel, {
              children: render(label)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 90,
              columnNumber: 19
            }, undefined)]
          }, index, true, {
            fileName: _jsxFileName,
            lineNumber: 83,
            columnNumber: 17
          }, undefined);
        }
        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(ActionButton, {
          color: color,
          onClick: onClick,
          children: [render(icon), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(ActionLabel, {
            children: render(label)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 98,
            columnNumber: 17
          }, undefined)]
        }, index, true, {
          fileName: _jsxFileName,
          lineNumber: 96,
          columnNumber: 15
        }, undefined);
      })
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 7
    }, undefined), hiddenActions.length > 0 && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(DropdownContainer, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_calendly_ui_components_icon_button__WEBPACK_IMPORTED_MODULE_2__.IconButton, {
        onClick: (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_6__.stopPropagation)(toggleDropdown),
        size: "small",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_3__.SettingsMenuVerticalIcon, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 108,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 11
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(Wrapper, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(DropdownActionsContainer, {
          children: hiddenActions.map(({
            link,
            onClick,
            icon,
            label
          }, index) => {
            return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(DropdownAction, {
              onClick: onClick,
              as: link ? 'a' : undefined,
              href: link,
              target: "_blank",
              children: [render(icon), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(ActionLabel, {
                children: render(label)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 122,
                columnNumber: 21
              }, undefined)]
            }, index, true, {
              fileName: _jsxFileName,
              lineNumber: 114,
              columnNumber: 19
            }, undefined);
          })
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 111,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 110,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 9
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 70,
    columnNumber: 5
  }, undefined);
};
const ActionsContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "actionsMenu__ActionsContainer",
  componentId: "sc-1pfo2zw-0"
})(["display:flex;justify-content:space-between;align-items:start;gap:3px;"]);
const ActionGroup = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "actionsMenu__ActionGroup",
  componentId: "sc-1pfo2zw-1"
})(["display:flex;flex-wrap:wrap;align-items:center;gap:", ";justify-content:", ";width:100%;margin-top:5px;"], ({
  gap
}) => gap, ({
  justifyContent
}) => justifyContent);
const ActionLink = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].a.withConfig({
  displayName: "actionsMenu__ActionLink",
  componentId: "sc-1pfo2zw-2"
})(["color:", " !important;display:flex;align-items:center;justify-content:flex-start;gap:7px;font-size:14px;font-style:normal;font-weight:400;line-height:1.4;text-decoration:none;max-width:100%;&:hover{text-decoration-line:underline;}&:focus-visible{z-index:3;outline:2px solid ", ";outline-offset:2px;}"], ({
  color
}) => getActionColor(color || 'primary'), _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.primaryColor);
const ActionLabel = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].span.withConfig({
  displayName: "actionsMenu__ActionLabel",
  componentId: "sc-1pfo2zw-3"
})(["white-space:nowrap;text-overflow:ellipsis;overflow:hidden;min-width:0;flex-grow:1;"]);
const ActionButton = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(_calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_0__.BareButton).withConfig({
  displayName: "actionsMenu__ActionButton",
  componentId: "sc-1pfo2zw-4"
})(["color:", ";display:flex;align-items:center;justify-content:center;gap:7px;font-size:14px;font-style:normal;font-weight:400;line-height:1.4;&:hover{text-decoration-line:underline;}"], ({
  color
}) => getActionColor(color || 'primary'));
const DropdownContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "actionsMenu__DropdownContainer",
  componentId: "sc-1pfo2zw-5"
})(["position:relative;"]);
const DropdownActionsContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "actionsMenu__DropdownActionsContainer",
  componentId: "sc-1pfo2zw-6"
})(["position:absolute;top:calc(100% + 4px);right:0;display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;box-shadow:", ";border-radius:6px;border:1px solid ", ";background:#fff;padding:8px 0;min-width:155px;width:fit-content;max-width:200px;z-index:5;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.overlayShadow, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.colorGrey3);
const DropdownAction = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(_calendly_ui_components_menu__WEBPACK_IMPORTED_MODULE_4__.Item).withConfig({
  displayName: "actionsMenu__DropdownAction",
  componentId: "sc-1pfo2zw-7"
})(["display:flex;padding:0 16px;height:36px;align-items:center;font-size:14px;font-style:normal;font-weight:400;background:#fff;white-space:nowrap;color:", ";max-width:100%;gap:8px;line-height:20px;box-sizing:border-box;cursor:pointer;&:hover{background:", ";}&:focus-visible{z-index:3;outline:2px solid ", ";outline-offset:-2px;background:", ";}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.textColorL1, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.colorBeachyBlue, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.primaryColor, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.colorBeachyBlue);

/***/ }),

/***/ "../../libs/shared/components/src/lib/actionsMenu/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionsMenu: () => (/* reexport safe */ _actionsMenu__WEBPACK_IMPORTED_MODULE_0__.ActionsMenu)
/* harmony export */ });
/* harmony import */ var _actionsMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/actionsMenu/actionsMenu.tsx");


/***/ }),

/***/ "../../libs/shared/components/src/lib/alert/alert.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Alert: () => (/* binding */ Alert)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/zustand/esm/index.mjs");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _client_core_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/store/src/index.ts");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/shared/components/src/lib/alert/elements.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/shared/components/src/lib/alert/alert.tsx";






const Alert = props => {
  const {
    uiStore
  } = (0,_client_core_store__WEBPACK_IMPORTED_MODULE_2__.useCombinedStore)();
  const removeFrame = (0,zustand__WEBPACK_IMPORTED_MODULE_5__.useStore)(uiStore, s => s.removeFrame);
  const [isFading, setIsFading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    frameId
  } = props;
  const remove = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setIsFading(true);
    window.setTimeout(() => {
      removeFrame(frameId);
    }, 350);
  }, [frameId, removeFrame]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const id = window.setTimeout(remove, 3000);
    return () => {
      window.clearTimeout(id);
    };
  }, [remove]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_elements__WEBPACK_IMPORTED_MODULE_3__.Container, {
    className: isFading ? 'fading' : undefined,
    onClick: () => {
      removeFrame(frameId);
    },
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_elements__WEBPACK_IMPORTED_MODULE_3__.Wrapper, {
      "aria-live": props.alert.type === 'success' ? 'polite' : 'assertive',
      type: props.alert.type,
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_elements__WEBPACK_IMPORTED_MODULE_3__.IconContainer, {
        children: [props.alert.type === 'success' && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_client_core_assets__WEBPACK_IMPORTED_MODULE_1__.CheckCircleIcon, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 46
        }, undefined), props.alert.type === 'error' && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_client_core_assets__WEBPACK_IMPORTED_MODULE_1__.AlertWarningCircleIcon, {}, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 53,
          columnNumber: 44
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 9
      }, undefined), props.alert.text]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 41,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "../../libs/shared/components/src/lib/alert/elements.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Container: () => (/* binding */ Container),
/* harmony export */   IconContainer: () => (/* binding */ IconContainer),
/* harmony export */   Wrapper: () => (/* binding */ Wrapper)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");


const Wrapper = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_1__["default"])('div').withConfig({
  displayName: "elements__Wrapper",
  componentId: "sc-7en3e5-0"
})(["display:flex;gap:8px;align-items:flex-start;width:fit-content;border-radius:24px;padding:12px 24px;color:white;font-weight:700;font-size:14px;line-height:20px;max-width:50%;margin:auto;", " ", ""], ({
  type
}) => type === 'success' && (0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(["background-color:", ";box-shadow:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorSuccess, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.modalShadow), ({
  type
}) => type === 'error' && (0,styled_components__WEBPACK_IMPORTED_MODULE_1__.css)(["background-color:", ";box-shadow:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorError, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.modalShadow));
const Container = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_1__["default"])('div').withConfig({
  displayName: "elements__Container",
  componentId: "sc-7en3e5-1"
})(["top:48px;width:100%;transform:none;animation:appear 0.25s ease-in;user-select:none;cursor:pointer;@keyframes appear{0%{opacity:0;transform:translateY(-20px);}100%{opacity:1;transform:translateY(0);}}@keyframes disappear{0%{opacity:1;}100%{opacity:0;}}&.fading{animation:disappear 400ms ease-in;opacity:0;}"]);
const IconContainer = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_1__["default"])('div').withConfig({
  displayName: "elements__IconContainer",
  componentId: "sc-7en3e5-2"
})(["width:16px;height:16px;margin-top:3px;path{fill:white;}"]);

/***/ }),

/***/ "../../libs/shared/components/src/lib/alert/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Alert: () => (/* reexport safe */ _alert__WEBPACK_IMPORTED_MODULE_0__.Alert)
/* harmony export */ });
/* harmony import */ var _alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/alert/alert.tsx");


/***/ }),

/***/ "../../libs/shared/components/src/lib/checkboxDropdown/checkboxDropdown.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckboxDropdown: () => (/* binding */ CheckboxDropdown)
/* harmony export */ });
/* harmony import */ var _calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _calendly_ui_components_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/button/index.js");
/* harmony import */ var _calendly_ui_components_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/menu/index.js");
/* harmony import */ var _calendly_ui_components_typography__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/typography/index.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _popover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/shared/components/src/lib/popover/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/shared/components/src/lib/checkboxDropdown/checkboxDropdown.tsx";









const CheckboxDropdown = props => {
  const {
    initialValues,
    onFinish,
    children,
    allowEmptySelection = true,
    crossAxisPopover = false,
    title = '',
    subtitle = ''
  } = props;
  const [values, setValues] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(initialValues);
  const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
  const numSelected = values.filter(value => value.checked).length;
  const onValueClick = id => {
    setValues(values.map(value => value.id === id ? Object.assign({}, value, {
      checked: !value.checked
    }) : value));
  };
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useLayoutEffect)(() => {
    if (open) setValues(initialValues);
  }, [initialValues, open]);
  const setAll = checked => {
    setValues(values.map(val => Object.assign({}, val, {
      checked
    })));
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_popover__WEBPACK_IMPORTED_MODULE_6__.Popover, {
    role: "menu",
    placement: "bottom-start",
    onOpenChange: setOpen,
    open: open,
    closeOnFocusOut: true,
    returnFocus: false,
    modal: false,
    offset: "center",
    crossAxis: crossAxisPopover,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_popover__WEBPACK_IMPORTED_MODULE_6__.PopoverTrigger, {
      children: children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(Container, {
      children: [(title || subtitle) && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(Header, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_calendly_ui_components_typography__WEBPACK_IMPORTED_MODULE_3__.BodyText, {
          weight: "bold",
          children: title
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 85,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_calendly_ui_components_typography__WEBPACK_IMPORTED_MODULE_3__.BodyText, {
          size: "small",
          color: "muted",
          children: subtitle
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 86,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 11
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(ButtonContainer, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(SetButton, {
          onClick: () => setAll(true),
          children: "select all"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 92,
          columnNumber: 11
        }, undefined), "/", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(SetButton, {
          onClick: () => setAll(false),
          children: "clear"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 93,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(ListContainer, {
        tabIndex: -1,
        children: values.map(value => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(StyledCheckbox, {
          checked: value.checked,
          onClick: onValueClick.bind(null, value.id),
          children: value.text
        }, value.id, false, {
          fileName: _jsxFileName,
          lineNumber: 97,
          columnNumber: 13
        }, undefined))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 95,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(ActionsContainer, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_popover__WEBPACK_IMPORTED_MODULE_6__.PopoverClose, {
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_calendly_ui_components_button__WEBPACK_IMPORTED_MODULE_1__.Button, {
            decoration: "ghost",
            size: "small",
            responsive: false,
            children: "Cancel"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 108,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 107,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_popover__WEBPACK_IMPORTED_MODULE_6__.PopoverClose, {
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_calendly_ui_components_button__WEBPACK_IMPORTED_MODULE_1__.Button, {
            size: "small",
            responsive: false,
            disabled: !allowEmptySelection && numSelected === 0,
            onClick: () => onFinish(values),
            children: "Done"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 113,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 112,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 106,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 70,
    columnNumber: 5
  }, undefined);
};
const Container = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(_popover__WEBPACK_IMPORTED_MODULE_6__.PopoverContent).withConfig({
  displayName: "checkboxDropdown__Container",
  componentId: "sc-151tc1h-0"
})(["width:70vw;background-color:white;border:1px solid ", ";box-shadow:", ";border-radius:8px;max-height:358px;display:flex;flex-direction:column;z-index:1;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorGrey3, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.overlayShadow);
const ListContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "checkboxDropdown__ListContainer",
  componentId: "sc-151tc1h-1"
})(["padding:8px 0;overflow-y:auto;"]);
const ActionsContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "checkboxDropdown__ActionsContainer",
  componentId: "sc-151tc1h-2"
})(["display:flex;justify-content:flex-end;gap:16px;padding:10px;border-top:1px solid ", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorGrey3);
const StyledCheckbox = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(_calendly_ui_components_menu__WEBPACK_IMPORTED_MODULE_2__.CheckboxItem).withConfig({
  displayName: "checkboxDropdown__StyledCheckbox",
  componentId: "sc-151tc1h-3"
})(["position:static;&:focus,&:focus-within{background-color:transparent;}&:focus-visible{background-color:", ";}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorBeachyBlue);
const ButtonContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "checkboxDropdown__ButtonContainer",
  componentId: "sc-151tc1h-4"
})(["display:inline-block;padding:5px;border-bottom:1px solid ", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorStrokeStandard);
const SetButton = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(_calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_0__.BareButton).withConfig({
  displayName: "checkboxDropdown__SetButton",
  componentId: "sc-151tc1h-5"
})(["padding:5px 12px;color:", ";&:hover{text-decoration:underline;}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorTextAction);
const Header = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "checkboxDropdown__Header",
  componentId: "sc-151tc1h-6"
})(["display:flex;flex-direction:column;padding:16px;justify-content:space-between;border-bottom:1px solid ", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorStrokeStandard);

/***/ }),

/***/ "../../libs/shared/components/src/lib/checkboxDropdown/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckboxDropdown: () => (/* reexport safe */ _checkboxDropdown__WEBPACK_IMPORTED_MODULE_0__.CheckboxDropdown)
/* harmony export */ });
/* harmony import */ var _checkboxDropdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/checkboxDropdown/checkboxDropdown.tsx");


/***/ }),

/***/ "../../libs/shared/components/src/lib/clickableCard/clickableCard.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClickableCard: () => (/* binding */ ClickableCard)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/icons/index.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");

const _excluded = ["variant", "title", "description", "icon", "isActive", "hasPlaceholderText"];
var _jsxFileName = "/app/libs/shared/components/src/lib/clickableCard/clickableCard.tsx";




const variantConfig = {
  primary: {
    iconSize: 'large',
    iconColor: _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.primaryColor,
    descriptionTextColor: _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.textColorL1,
    secondaryDescriptionTextColor: _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.colorTextStandard,
    descriptionTextSize: '20px',
    descriptionTextWeight: 500
  },
  secondary: {
    iconSize: 'standard',
    iconColor: _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.colorIconSecondary,
    descriptionTextColor: _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.textColor,
    secondaryDescriptionTextColor: _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.colorTextStandard,
    descriptionTextSize: '14px',
    descriptionTextWeight: 400
  }
};
const ClickableCard = _ref => {
  let {
      variant,
      title,
      description,
      icon: Icon,
      isActive,
      hasPlaceholderText
    } = _ref,
    rest = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const {
    iconSize,
    iconColor,
    descriptionTextColor,
    descriptionTextSize,
    descriptionTextWeight,
    secondaryDescriptionTextColor
  } = variantConfig[variant];
  const backgroundColor = isActive ? _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.colorSurfaceActionSecondary : 'transparent';
  const borderColor = isActive ? _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.primaryColor : '#fff';
  const descriptionTextColorValue = hasPlaceholderText ? secondaryDescriptionTextColor : descriptionTextColor;
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(FieldWrapper, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(CardTitle, {
      children: title
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(CardContainer, Object.assign({
      tabIndex: 0,
      role: "button",
      "aria-pressed": isActive,
      "aria-label": `Toggle ${title}`,
      backgroundColor: backgroundColor,
      borderColor: borderColor
    }, rest, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(CardColumnContainer, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(CardRowContainer, {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(Icon, {
            size: iconSize,
            color: iconColor
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 97,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(CardDescription, {
            descriptionTextColor: descriptionTextColorValue,
            descriptionTextSize: descriptionTextSize,
            descriptionTextWeight: descriptionTextWeight,
            children: description
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 98,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 96,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 95,
        columnNumber: 9
      }, undefined), isActive ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_1__.ArrowChevronUpMiniIcon, {
        size: iconSize,
        color: iconColor
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 11
      }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_1__.ArrowChevronDownMiniIcon, {
        size: iconSize,
        color: iconColor
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 110,
        columnNumber: 11
      }, undefined)]
    }), void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 83,
    columnNumber: 5
  }, undefined);
};
const FieldWrapper = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "clickableCard__FieldWrapper",
  componentId: "s1jyhu-0"
})(["display:flex;flex-direction:column;gap:4px;"]);
const CardContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "clickableCard__CardContainer",
  componentId: "s1jyhu-1"
})(["display:flex;justify-content:space-between;align-items:center;padding:8px 12px;box-sizing:border-box;border-radius:8px;cursor:pointer;background:", ";&:hover{background:", ";}&:focus,&:focus-visible{outline:2px solid ", ";}"], ({
  backgroundColor
}) => backgroundColor, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.colorSurfaceActionSecondaryHover, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.colorStrokeFocus);
const CardTitle = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "clickableCard__CardTitle",
  componentId: "s1jyhu-2"
})(["color:", ";font-size:14px;font-weight:700;padding:0 12px;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.colorTextStandard);
const CardDescription = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "clickableCard__CardDescription",
  componentId: "s1jyhu-3"
})(["color:", ";font-size:", ";font-weight:", ";"], ({
  descriptionTextColor
}) => descriptionTextColor, ({
  descriptionTextSize
}) => descriptionTextSize, ({
  descriptionTextWeight
}) => descriptionTextWeight);
const CardColumnContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "clickableCard__CardColumnContainer",
  componentId: "s1jyhu-4"
})(["display:flex;flex-direction:column;gap:8px;"]);
const CardRowContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "clickableCard__CardRowContainer",
  componentId: "s1jyhu-5"
})(["display:flex;align-items:center;gap:8px;"]);

/***/ }),

/***/ "../../libs/shared/components/src/lib/clickableCard/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClickableCard: () => (/* reexport safe */ _clickableCard__WEBPACK_IMPORTED_MODULE_0__.ClickableCard)
/* harmony export */ });
/* harmony import */ var _clickableCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/clickableCard/clickableCard.tsx");


/***/ }),

/***/ "../../libs/shared/components/src/lib/editAction/editAction.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditAction: () => (/* binding */ EditAction)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var _client_core_platform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/platform/src/index.ts");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var _client_core_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/types/src/index.ts");
/* harmony import */ var _popover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/shared/components/src/lib/popover/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/shared/components/src/lib/editAction/editAction.tsx";









const EditAction = ({
  eventType,
  source
}) => {
  const platform = (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_2__.usePlatform)();
  const coasEnabled = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => (0,_client_core_platform__WEBPACK_IMPORTED_MODULE_3__.getEventTypeType)(eventType) === 'solo', [eventType]);
  const handleEditLinkClick = async event => {
    event.preventDefault();
    await platform.flow.openCalendlyUrl(eventType.edit_url);
    platform.analytics.track(_client_core_types__WEBPACK_IMPORTED_MODULE_5__.AnalyticsEvent.EventTypeEditLink, {
      source
    });
  };
  const handleCasClick = () => {
    platform.flow.webCustomizeAndShare({
      etId: eventType.id,
      source,
      searchView: Boolean(_client_core_platform__WEBPACK_IMPORTED_MODULE_3__.AppContext.searchQuery)
    });
  };
  return coasEnabled ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_popover__WEBPACK_IMPORTED_MODULE_6__.Popover, {
    role: "menu",
    initialFocus: -1,
    modal: false,
    placement: "bottom-end",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_popover__WEBPACK_IMPORTED_MODULE_6__.PopoverTrigger, {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(EditActionButton, {
        children: "Edit"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(MenuContainer, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_popover__WEBPACK_IMPORTED_MODULE_6__.PopoverClose, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(MenuLink, {
          href: eventType.edit_url,
          onClick: handleEditLinkClick,
          children: "Edit event type"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 62,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 61,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(MenuDivider, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_popover__WEBPACK_IMPORTED_MODULE_6__.PopoverClose, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(MenuButton, {
          onClick: handleCasClick,
          disabled: !eventType.active,
          children: "Customize once & share"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 67,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 56,
    columnNumber: 5
  }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(EditActionLink, {
    href: eventType.edit_url,
    onClick: handleEditLinkClick,
    children: "Edit"
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 75,
    columnNumber: 5
  }, undefined);
};
const EditActionLink = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].a.attrs({
  target: '_blank'
}).withConfig({
  displayName: "editAction__EditActionLink",
  componentId: "sc-1mozk5y-0"
})(["height:16px;min-width:22px;font-size:12px;line-height:15px;color:", ";&:hover,&:focus{text-decoration:underline;cursor:pointer;}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorSecondary2);
const EditActionButton = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].button.withConfig({
  displayName: "editAction__EditActionButton",
  componentId: "sc-1mozk5y-1"
})(["box-sizing:border-box;padding:0;font-size:12px;line-height:15px;border:none;outline:none;background:inherit;text-align:center;cursor:pointer;white-space:nowrap;color:", ";&:hover,&:focus{text-decoration:underline;}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorSecondary2);
const MenuContainer = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(_popover__WEBPACK_IMPORTED_MODULE_6__.PopoverContent).withConfig({
  displayName: "editAction__MenuContainer",
  componentId: "sc-1mozk5y-2"
})(["display:flex;flex-direction:column;background:#ffffff;border:1px solid ", ";box-shadow:", ";border-radius:4px;overflow:hidden;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey3, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.overlayShadow);
const MenuItemStyles = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_8__.css)(["display:flex;align-items:center;padding:0 11px;height:44px;background:inherit;color:", ";line-height:44px;border:none;outline:none;cursor:pointer;&:hover{background:", ";}&:focus,&:focus-within{font-weight:bold;background:", ";}&:disabled{color:", ";cursor:not-allowed;}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorL1, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL4, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL3, _client_core_theme__WEBPACK_IMPORTED_MODULE_4__.gcalTextColorDisabled);
const MenuButton = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].button.withConfig({
  displayName: "editAction__MenuButton",
  componentId: "sc-1mozk5y-3"
})(["", ""], MenuItemStyles);
const MenuLink = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].a.withConfig({
  displayName: "editAction__MenuLink",
  componentId: "sc-1mozk5y-4"
})(["", ""], MenuItemStyles);
const MenuDivider = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "editAction__MenuDivider",
  componentId: "sc-1mozk5y-5"
})(["height:1px;width:100%;background:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey3);

/***/ }),

/***/ "../../libs/shared/components/src/lib/editAction/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditAction: () => (/* reexport safe */ _editAction__WEBPACK_IMPORTED_MODULE_0__.EditAction)
/* harmony export */ });
/* harmony import */ var _editAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/editAction/editAction.tsx");


/***/ }),

/***/ "../../libs/shared/components/src/lib/loaderDots/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoaderDots: () => (/* reexport safe */ _loaderDots__WEBPACK_IMPORTED_MODULE_0__.LoaderDots)
/* harmony export */ });
/* harmony import */ var _loaderDots__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/loaderDots/loaderDots.tsx");


/***/ }),

/***/ "../../libs/shared/components/src/lib/loaderDots/loaderDots.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoaderDots: () => (/* binding */ LoaderDots)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _client_core_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/theme/src/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/shared/components/src/lib/loaderDots/loaderDots.tsx";




const Container = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].span.withConfig({
  displayName: "loaderDots__Container",
  componentId: "pho0cm-0"
})(["display:flex;justify-content:center;align-items:center;min-width:90px;color:", ";> div{display:inline-block;margin-right:10px;margin-left:10px;width:10px;height:10px;background-color:currentColor;border-radius:50%;animation:bouncedelay 1.2s infinite ease-in-out;&:nth-child(2){animation-delay:0.16s;}&:nth-child(3){animation-delay:0.32s;}}&.cui{> div{margin:0 4px;width:6px;height:6px;background-color:#ffffff;}}&.small{min-width:36px;> div{margin-right:4px;margin-left:4px;width:4px;height:4px;}}@keyframes bouncedelay{0%,80%,100%{transform:scale(1);}40%{transform:scale(1.75);}}"], _client_core_theme__WEBPACK_IMPORTED_MODULE_1__.gcalLoaderColor);
const LoaderDots = props => {
  const size = props.size || 'small';
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(Container, {
    className: size,
    "data-testid": "loader-dots",
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("div", {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 75,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "../../libs/shared/components/src/lib/logo/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Logo: () => (/* reexport safe */ _logo__WEBPACK_IMPORTED_MODULE_0__.Logo),
/* harmony export */   "default": () => (/* reexport safe */ _logo__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _logo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/logo/logo.tsx");


/***/ }),

/***/ "../../libs/shared/components/src/lib/logo/logo.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Logo: () => (/* binding */ Logo),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/assets/src/index.ts");


const Logo = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_1__["default"])(_client_core_assets__WEBPACK_IMPORTED_MODULE_0__.calendlyLogo).attrs(props => ({
  draggable: false
})).withConfig({
  displayName: "logo__Logo",
  componentId: "fxxrtj-0"
})(["width:38px;height:38px;"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logo);

/***/ }),

/***/ "../../libs/shared/components/src/lib/popover/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Popover: () => (/* reexport safe */ _popover__WEBPACK_IMPORTED_MODULE_0__.Popover),
/* harmony export */   PopoverClose: () => (/* reexport safe */ _popoverClose__WEBPACK_IMPORTED_MODULE_4__.PopoverClose),
/* harmony export */   PopoverContent: () => (/* reexport safe */ _popoverContent__WEBPACK_IMPORTED_MODULE_2__.PopoverContent),
/* harmony export */   PopoverTrigger: () => (/* reexport safe */ _popoverTrigger__WEBPACK_IMPORTED_MODULE_3__.PopoverTrigger),
/* harmony export */   usePopover: () => (/* reexport safe */ _usePopover__WEBPACK_IMPORTED_MODULE_1__.usePopover),
/* harmony export */   usePopoverContext: () => (/* reexport safe */ _popover__WEBPACK_IMPORTED_MODULE_0__.usePopoverContext)
/* harmony export */ });
/* harmony import */ var _popover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/popover/popover.tsx");
/* harmony import */ var _usePopover__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/shared/components/src/lib/popover/usePopover.ts");
/* harmony import */ var _popoverContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/shared/components/src/lib/popover/popoverContent.tsx");
/* harmony import */ var _popoverTrigger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/shared/components/src/lib/popover/popoverTrigger.tsx");
/* harmony import */ var _popoverClose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/shared/components/src/lib/popover/popoverClose.tsx");






/***/ }),

/***/ "../../libs/shared/components/src/lib/popover/popover.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Popover: () => (/* binding */ Popover),
/* harmony export */   usePopoverContext: () => (/* binding */ usePopoverContext)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _usePopover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/shared/components/src/lib/popover/usePopover.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");

const _excluded = ["children"];
var _jsxFileName = "/app/libs/shared/components/src/lib/popover/popover.tsx";



const PopoverContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const usePopoverContext = () => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(PopoverContext);
  if (!context) {
    throw new Error('useDropdownContext must be used within a DropdownProvider');
  }
  return context;
};
const Popover = props => {
  const {
      children
    } = props,
    restProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);
  const dropdown = (0,_usePopover__WEBPACK_IMPORTED_MODULE_2__.usePopover)(restProps);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(PopoverContext.Provider, {
    value: dropdown,
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 28,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "../../libs/shared/components/src/lib/popover/popoverClose.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopoverClose: () => (/* binding */ PopoverClose)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _popover__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/shared/components/src/lib/popover/popover.tsx");


const PopoverClose = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, ref) => {
  const {
    children
  } = props;
  const context = (0,_popover__WEBPACK_IMPORTED_MODULE_1__.usePopoverContext)();
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(children, Object.assign({
    ref
  }, children.props, {
    onClick: e => {
      children.props.onClick == null || children.props.onClick(e);
      context.setOpen(false);
    }
  }));
});

/***/ }),

/***/ "../../libs/shared/components/src/lib/popover/popoverContent.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopoverContent: () => (/* binding */ PopoverContent)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/@floating-ui/react/dist/floating-ui.react.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _popover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/shared/components/src/lib/popover/popover.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");

const _excluded = ["style", "children"];
var _jsxFileName = "/app/libs/shared/components/src/lib/popover/popoverContent.tsx";




const PopoverContent = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((props, propRef) => {
  const {
      style,
      children
    } = props,
    restProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);
  const {
    context: floatingContext,
    refs,
    floatingStyles,
    getFloatingProps,
    focusManagerProps
  } = (0,_popover__WEBPACK_IMPORTED_MODULE_2__.usePopoverContext)();
  const ref = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.useMergeRefs)([refs.setFloating, propRef]);
  if (!floatingContext.open) return null;
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.FloatingFocusManager, Object.assign({
    context: floatingContext
  }, focusManagerProps, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("div", Object.assign({
      ref: ref,
      style: Object.assign({}, floatingStyles, style)
    }, getFloatingProps(restProps), {
      children: children
    }), void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 9
    }, undefined)
  }), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 25,
    columnNumber: 7
  }, undefined);
});

/***/ }),

/***/ "../../libs/shared/components/src/lib/popover/popoverTrigger.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopoverTrigger: () => (/* binding */ PopoverTrigger)
/* harmony export */ });
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@floating-ui/react/dist/floating-ui.react.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _popover__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/shared/components/src/lib/popover/popover.tsx");



const PopoverTrigger = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, propRef) => {
  const {
    children
  } = props;
  const childrenRef = children.ref;
  const context = (0,_popover__WEBPACK_IMPORTED_MODULE_1__.usePopoverContext)();
  const ref = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.useMergeRefs)([propRef, context.refs.setReference, childrenRef]);
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(children, context.getReferenceProps(Object.assign({
    ref
  }, children.props)));
});

/***/ }),

/***/ "../../libs/shared/components/src/lib/popover/usePopover.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePopover: () => (/* binding */ usePopover)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@floating-ui/react/dist/floating-ui.react.mjs");
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs");
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

const _excluded = ["initialOpen", "placement", "role", "offset", "padding", "crossAxis", "open", "onOpenChange"];


function usePopover(params) {
  const {
      initialOpen = false,
      placement = 'bottom-start',
      role: roleProp,
      offset = 5,
      padding = 5,
      crossAxis = false,
      open: controlledOpen,
      onOpenChange: setControlledOpen
    } = params,
    focusManagerProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, _excluded);
  const [uncontrolledOpen, setUncontrolledOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialOpen);
  const open = controlledOpen != null ? controlledOpen : uncontrolledOpen;
  const setOpen = typeof controlledOpen !== 'undefined' && setControlledOpen ? setControlledOpen : setUncontrolledOpen;
  const floatingData = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.useFloating)({
    whileElementsMounted: _floating_ui_react__WEBPACK_IMPORTED_MODULE_3__.autoUpdate,
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.offset)(offset === 'center' ? ({
      rects
    }) => -rects.reference.height / 2 - rects.floating.height / 2 : offset), (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.shift)({
      padding,
      crossAxis
    }), (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.flip)(), (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.size)({
      padding,
      apply({
        availableHeight,
        elements
      }) {
        elements.floating.style.maxHeight = `${availableHeight}px`;
      }
    })]
  });
  const dismiss = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.useDismiss)(floatingData.context);
  const click = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.useClick)(floatingData.context);
  const role = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.useRole)(floatingData.context, {
    role: roleProp
  });
  const interactions = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.useInteractions)([click, dismiss, role]);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => Object.assign({
    open,
    setOpen
  }, floatingData, interactions, {
    focusManagerProps
  }), [floatingData, focusManagerProps, interactions, open, setOpen]);
}

/***/ }),

/***/ "../../libs/shared/components/src/lib/richTextEditor/blots/link.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Link: () => (/* binding */ Link)
/* harmony export */ });
/* harmony import */ var react_quill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react-quill/lib/index.js");
/* harmony import */ var react_quill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_quill__WEBPACK_IMPORTED_MODULE_0__);

const QuillLink = react_quill__WEBPACK_IMPORTED_MODULE_0__.Quill.import('formats/link');
class Link extends QuillLink {
  static sanitize(url) {
    const possibleProtocol = (url.split(':')[0] || '').toLowerCase();
    const includesProtocol = Link['PROTOCOL_WHITELIST'].includes(possibleProtocol);
    const value = includesProtocol ? url : `https://${url}`;
    return super.sanitize(value);
  }
}


/***/ }),

/***/ "../../libs/shared/components/src/lib/richTextEditor/editTooltip/editTooltip.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditTooltip: () => (/* binding */ EditTooltip)
/* harmony export */ });
/* harmony import */ var _calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _calendly_ui_components_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/link/index.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/shared/components/src/lib/tooltip/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/shared/components/src/lib/richTextEditor/editTooltip/editTooltip.tsx";







const EditTooltip = ({
  isOpen,
  url,
  domNode,
  onEditClick,
  onRemoveClick,
  onTooltipClose
}) => {
  const tooltipRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const onOpenChange = () => {
    if (isOpen) {
      onTooltipClose();
    }
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_tooltip__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
    positionElement: domNode,
    open: isOpen,
    onOpenChange: onOpenChange,
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(EditActions, {
      url: url,
      onEditClick: onEditClick,
      onRemoveClick: onRemoveClick,
      ref: tooltipRef
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 35,
    columnNumber: 5
  }, undefined);
};
const EditActions = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)(({
  url,
  onEditClick,
  onRemoveClick
}, ref) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(ActionsContainer, {
    ref: ref,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(PreviewLink, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(PreviewLabel, {
        children: "Visit URL:"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(StyledLink, {
        href: url,
        target: "_blank",
        children: url
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(Divider, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(StyledButton, {
      onClick: onEditClick,
      children: "Edit"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(Divider, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(StyledButton, {
      onClick: onRemoveClick,
      children: "Remove"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 55,
    columnNumber: 5
  }, undefined);
});
const Divider = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div.withConfig({
  displayName: "editTooltip__Divider",
  componentId: "sc-1i9s793-0"
})(["height:20px;width:1px;background-color:#c8d6e7;"]);
const StyledButton = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_6__["default"])(_calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_0__.BareButton).withConfig({
  displayName: "editTooltip__StyledButton",
  componentId: "sc-1i9s793-1"
})(["font-size:14px;font-weight:400;line-height:140%;color:", ";&:hover{text-decoration:underline;}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.primaryColor);
const StyledLink = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_6__["default"])(_calendly_ui_components_link__WEBPACK_IMPORTED_MODULE_1__.Link).withConfig({
  displayName: "editTooltip__StyledLink",
  componentId: "sc-1i9s793-2"
})(["overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:80px;"]);
const PreviewLabel = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].span.withConfig({
  displayName: "editTooltip__PreviewLabel",
  componentId: "sc-1i9s793-3"
})(["flex-shrink:0;color:", ";margin-right:4px;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.textColorL1);
const PreviewLink = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div.withConfig({
  displayName: "editTooltip__PreviewLink",
  componentId: "sc-1i9s793-4"
})(["display:flex;align-items:center;flex-shrink:0;"]);
const ActionsContainer = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_6__["default"])(_tooltip__WEBPACK_IMPORTED_MODULE_4__.TooltipContent).withConfig({
  displayName: "editTooltip__ActionsContainer",
  componentId: "sc-1i9s793-5"
})(["display:flex;align-items:center;justify-content:center;padding:15px;border:1px solid #c8d6e7;border-radius:6px;background-color:var(--color-bg-white-l-1,rgba(255,255,255,1));box-shadow:0 1px 5px 0 rgb(0 74 116 / 15%);gap:16px;max-width:380px;"]);

/***/ }),

/***/ "../../libs/shared/components/src/lib/richTextEditor/hooks/useLinkPopup.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSimpleLinkPopup: () => (/* binding */ useSimpleLinkPopup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useSimpleLinkPopup = () => {
  const reactQuillRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const selection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [prefilledText, setPrefilledText] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [prefilledURL, setPrefilledURL] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [isLinkPopupOpen, setIsLinkPopupOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const showLinkPopup = () => setIsLinkPopupOpen(true);
  const hideLinkPopup = () => setIsLinkPopupOpen(false);
  const openLinkPopup = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((editor, editorSelection, url) => {
    reactQuillRef.current = editor;
    selection.current = editorSelection;
    const plainText = editor.getText(editorSelection == null ? void 0 : editorSelection.index, editorSelection == null ? void 0 : editorSelection.length);
    setPrefilledText(plainText);
    setPrefilledURL(url);
    editor.focus();
    showLinkPopup();
  }, []);
  const pasteLink = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((text, url) => {
    const {
      index,
      length
    } = selection.current || {
      index: 0,
      length: 0
    };
    const quill = reactQuillRef.current;
    const QuillClass = Object.getPrototypeOf(quill).constructor;
    const Delta = QuillClass.import('delta');
    const updates = new Delta();
    if (index) {
      updates.retain(index);
    }
    if (length) {
      updates.delete(length);
    }
    updates.insert(text || url, {
      link: url
    });
    quill == null || quill.updateContents(updates, 'user');
    setPrefilledText('');
    setPrefilledURL('');
    hideLinkPopup();
  }, []);
  return {
    openLinkPopup,
    linkPopupProps: {
      isOpen: isLinkPopupOpen,
      prefilledText: prefilledText,
      prefilledURL: prefilledURL,
      onClose: hideLinkPopup,
      onConfirm: pasteLink
    }
  };
};

/***/ }),

/***/ "../../libs/shared/components/src/lib/richTextEditor/hooks/useLinkTooltip.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSimpleLinkTooltip: () => (/* binding */ useSimpleLinkTooltip)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const closedTooltipState = {
  linkIndex: null,
  linkLength: null,
  linkURL: '',
  isTooltipOpen: false
};
const linkStateReducer = (state, action) => {
  switch (action.type) {
    case 'linkSelection':
      {
        const {
          index,
          length,
          url
        } = action.payload;
        return {
          linkIndex: index,
          linkLength: length,
          linkURL: url,
          isTooltipOpen: true
        };
      }
    case 'closeTooltip':
      return closedTooltipState;
    default:
      return state;
  }
};
const useSimpleLinkTooltip = ({
  onLinkEdit
}) => {
  const editorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [domNode, setDomNode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [{
    isTooltipOpen,
    linkURL,
    linkIndex,
    linkLength
  }, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(linkStateReducer, closedTooltipState);
  const linkSelection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (linkIndex === null || linkLength === null) {
      return null;
    }
    return {
      index: linkIndex,
      length: linkLength
    };
  }, [linkIndex, linkLength]);
  const onChangeSelection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((range, source, editor) => {
    if (range == null || source !== 'user' || !editor) {
      return;
    }
    editorRef.current = editor;
    if (range.length < 2) {
      const QuillClass = Object.getPrototypeOf(editor).constructor;
      const Link = QuillClass.import('formats/link');
      const [link, offset] = editor.scroll.scroll.descendant(Link, range.index);
      if (link != null) {
        setDomNode(link.domNode);
        dispatch({
          type: 'linkSelection',
          payload: {
            index: range.index - offset,
            length: link.length(),
            url: Link.formats(link.domNode)
          }
        });
        return;
      }
    }
    dispatch({
      type: 'closeTooltip'
    });
  }, []);
  const onEdit = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (editorRef.current && linkSelection) {
      onLinkEdit(editorRef.current, linkSelection, linkURL);
    }
    dispatch({
      type: 'closeTooltip'
    });
  }, [linkSelection, linkURL, onLinkEdit]);
  const onRemove = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (editorRef.current && linkSelection) {
      editorRef.current.formatText(linkSelection.index, linkSelection.length, 'link', false, 'user');
    }
    dispatch({
      type: 'closeTooltip'
    });
  }, [linkSelection]);
  const onTooltipClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    dispatch({
      type: 'closeTooltip'
    });
  }, []);
  return {
    editorProps: {
      onChangeSelection
    },
    tooltipProps: {
      isOpen: isTooltipOpen,
      url: linkURL,
      domNode,
      onEditClick: onEdit,
      onRemoveClick: onRemove,
      onTooltipClose
    }
  };
};

/***/ }),

/***/ "../../libs/shared/components/src/lib/richTextEditor/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RichTextEditor: () => (/* reexport safe */ _richTextEditor__WEBPACK_IMPORTED_MODULE_0__.RichTextEditor),
/* harmony export */   copyTextToClipboard: () => (/* reexport safe */ _util_util__WEBPACK_IMPORTED_MODULE_1__.copyTextToClipboard)
/* harmony export */ });
/* harmony import */ var _richTextEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/richTextEditor/richTextEditor.tsx");
/* harmony import */ var _util_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/shared/components/src/lib/richTextEditor/util/util.ts");



/***/ }),

/***/ "../../libs/shared/components/src/lib/richTextEditor/popup/customLinkPopup.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomLinkPopup: () => (/* binding */ CustomLinkPopup)
/* harmony export */ });
/* harmony import */ var _calendly_ui_components_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/button/index.js");
/* harmony import */ var _calendly_ui_form_text_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/form/text-field.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/formik/dist/formik.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/yup/index.esm.js");
/* harmony import */ var _client_core_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/hooks/src/index.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/shared/components/src/lib/richTextEditor/popup/customLinkPopup.tsx";









const EMPTY_LINK = 'https://';
const validationSchema = (0,yup__WEBPACK_IMPORTED_MODULE_4__.object)({
  url: (0,yup__WEBPACK_IMPORTED_MODULE_4__.string)().required()
});
const CustomLinkPopup = ({
  isOpen,
  onClose,
  onConfirm,
  prefilledText,
  prefilledURL
}) => {
  const modalRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const initialValues = {
    text: prefilledText,
    url: prefilledURL === EMPTY_LINK ? '' : prefilledURL
  };
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (isOpen) {
      var _modalRef$current;
      (_modalRef$current = modalRef.current) == null || _modalRef$current.showModal();
    } else {
      var _modalRef$current2;
      (_modalRef$current2 = modalRef.current) == null || _modalRef$current2.close();
    }
  }, [isOpen]);
  (0,_client_core_hooks__WEBPACK_IMPORTED_MODULE_5__.useClickOutside)(modalRef, () => {
    var _modalRef$current3;
    (_modalRef$current3 = modalRef.current) == null || _modalRef$current3.close();
    onClose();
  });
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(Modal, {
    ref: modalRef,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(ModalTitle, {
      children: "Edit link"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_7__.Formik, {
      validationSchema: validationSchema,
      validateOnBlur: false,
      validateOnChange: false,
      initialValues: initialValues,
      onSubmit: values => {
        var _modalRef$current4;
        onConfirm(values.text, values.url);
        (_modalRef$current4 = modalRef.current) == null || _modalRef$current4.close();
      },
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_7__.Form, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(InputContainer, {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_7__.Field, {
            name: "text",
            children: ({
              field,
              meta
            }) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(_calendly_ui_form_text_field__WEBPACK_IMPORTED_MODULE_1__.TextField, Object.assign({}, field, {
              label: "Display text",
              error: meta.touched && meta.error ? meta.error : ''
            }), void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 70,
              columnNumber: 17
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 68,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_7__.Field, {
            name: "url",
            children: ({
              field,
              meta
            }) => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(_calendly_ui_form_text_field__WEBPACK_IMPORTED_MODULE_1__.TextField, Object.assign({}, field, {
              label: "Link to",
              error: meta.touched && meta.error ? meta.error : ''
            }), void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 80,
              columnNumber: 17
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 78,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 67,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(CallToActions, {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(_calendly_ui_components_button__WEBPACK_IMPORTED_MODULE_0__.Button, {
            decoration: "secondary-outline",
            onClick: onClose,
            children: "Cancel"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 90,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(_calendly_ui_components_button__WEBPACK_IMPORTED_MODULE_0__.Button, {
            type: "submit",
            children: "Insert link"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 93,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 89,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 53,
    columnNumber: 5
  }, undefined);
};
const Modal = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].dialog.attrs({
  tabIndex: -1
}).withConfig({
  displayName: "customLinkPopup__Modal",
  componentId: "sc-4cfoph-0"
})(["display:flex;padding:24px;flex-direction:column;gap:24px;background-color:", ";border-radius:8px;border:1px solid #ececec;box-shadow:0px 2px 15px 0px rgba(0,0,0,0.1);width:100%;box-sizing:border-box;border:none;&::backdrop{background-color:rgba(31,31,31,0.1);}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.colorBackgroundStandard);
const ModalTitle = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].h1.withConfig({
  displayName: "customLinkPopup__ModalTitle",
  componentId: "sc-4cfoph-1"
})(["color:", ";font-size:24px;font-style:normal;font-weight:700;line-height:140%;margin:0;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.textColorL1);
const CallToActions = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "customLinkPopup__CallToActions",
  componentId: "sc-4cfoph-2"
})(["display:flex;gap:24px;margin-top:24px;"]);
const InputContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "customLinkPopup__InputContainer",
  componentId: "sc-4cfoph-3"
})(["display:flex;flex-direction:column;gap:17px;"]);

/***/ }),

/***/ "../../libs/shared/components/src/lib/richTextEditor/richTextEditor.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RichTextEditor: () => (/* binding */ RichTextEditor)
/* harmony export */ });
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react-quill/lib/index.js");
/* harmony import */ var react_quill__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_quill__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react-quill/dist/quill.snow.css");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _blots_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/shared/components/src/lib/richTextEditor/blots/link.ts");
/* harmony import */ var _editTooltip_editTooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/shared/components/src/lib/richTextEditor/editTooltip/editTooltip.tsx");
/* harmony import */ var _hooks_useLinkPopup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/shared/components/src/lib/richTextEditor/hooks/useLinkPopup.tsx");
/* harmony import */ var _hooks_useLinkTooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../libs/shared/components/src/lib/richTextEditor/hooks/useLinkTooltip.tsx");
/* harmony import */ var _popup_customLinkPopup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/shared/components/src/lib/richTextEditor/popup/customLinkPopup.tsx");
/* harmony import */ var _themes_calendlyTheme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../libs/shared/components/src/lib/richTextEditor/themes/calendlyTheme.ts");
/* harmony import */ var _toolbar_customToolbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../libs/shared/components/src/lib/richTextEditor/toolbar/customToolbar.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/shared/components/src/lib/richTextEditor/richTextEditor.tsx";













react_quill__WEBPACK_IMPORTED_MODULE_2__.Quill.register(_blots_link__WEBPACK_IMPORTED_MODULE_4__.Link, true);
react_quill__WEBPACK_IMPORTED_MODULE_2__.Quill.register('themes/calendly', _themes_calendlyTheme__WEBPACK_IMPORTED_MODULE_9__.CalendlyTheme);
const QuillIndent = react_quill__WEBPACK_IMPORTED_MODULE_2__.Quill.import('formats/indent');
QuillIndent.whitelist = [];
const formats = ['bold', 'italic', 'underline', 'list', 'bullet', 'link'];
const RichTextEditor = ({
  value,
  onChange,
  onFocusChange
}) => {
  const {
    openLinkPopup,
    linkPopupProps
  } = (0,_hooks_useLinkPopup__WEBPACK_IMPORTED_MODULE_6__.useSimpleLinkPopup)();
  const {
    editorProps,
    tooltipProps
  } = (0,_hooks_useLinkTooltip__WEBPACK_IMPORTED_MODULE_7__.useSimpleLinkTooltip)({
    onLinkEdit: openLinkPopup
  });
  const {
    isOpen
  } = linkPopupProps;
  const {
    onChangeSelection
  } = editorProps;
  const quillRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const [showToolbar, setShowToolbar] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const handleOnBlur = () => {
    setShowToolbar(false);
    onFocusChange == null || onFocusChange(false);
  };
  const handleOnFocus = () => {
    setShowToolbar(true);
    onFocusChange == null || onFocusChange(true);
  };
  const insertLink = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function insertLink(href) {
    var _quillRef$current;
    const quill = (_quillRef$current = quillRef.current) == null ? void 0 : _quillRef$current.getEditor();
    if (!quill) return;
    if (href) {
      openLinkPopup(quill, quill.getSelection(), '');
    } else {
      quill.format('link', false);
    }
  }, [openLinkPopup]);
  const modules = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    toolbar: {
      container: '#toolbar',
      handlers: {
        link: insertLink
      }
    },
    keyboard: {
      bindings: {
        tab: false
      }
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    },
    clipboard: {
      matchVisual: false
    }
  }), [insertLink]);
  const handleChangeSelection = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((range, source) => {
    var _quillRef$current2;
    if (!onChangeSelection) {
      return;
    }
    onChangeSelection(range, source, quillRef == null || (_quillRef$current2 = quillRef.current) == null ? void 0 : _quillRef$current2.getEditor());
  }, [onChangeSelection]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(Editor, {
    showToolbar: showToolbar,
    onBlur: handleOnBlur,
    onFocus: handleOnFocus,
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_toolbar_customToolbar__WEBPACK_IMPORTED_MODULE_10__.CustomToolbar, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(StyledReactQuill, {
      ref: quillRef,
      value: value,
      theme: "calendly",
      placeholder: "Add your notes here",
      formats: formats,
      modules: modules,
      onChangeSelection: handleChangeSelection,
      onChange: onChange
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_editTooltip_editTooltip__WEBPACK_IMPORTED_MODULE_5__.EditTooltip, Object.assign({}, tooltipProps), void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 7
    }, undefined), isOpen && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_popup_customLinkPopup__WEBPACK_IMPORTED_MODULE_8__.CustomLinkPopup, Object.assign({}, linkPopupProps), void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 18
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 110,
    columnNumber: 5
  }, undefined);
};
const Editor = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_12__["default"].div.withConfig({
  displayName: "richTextEditor__Editor",
  componentId: "sc-1tzjxar-0"
})(["font-family:'Proxima Nova';border-radius:0 0 8px 8px;border:1px solid ", ";&:hover{border-color:", ";}&:focus-within{border-radius:8px;outline:2px solid ", ";outline-offset:-2px;}.ql-toolbar.ql-snow{border:none;padding:8px;position:", ";top:", ";left:", ";opacity:", ";transition:opacity 0.2s ease-in-out;}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorL3, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.colorGrey3, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.primaryColorL1, props => props.showToolbar ? 'relative' : 'absolute', props => props.showToolbar ? '0' : '-9999px', props => props.showToolbar ? '0' : '-9999px', props => props.showToolbar ? '1' : '0');
const StyledReactQuill = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_12__["default"])((react_quill__WEBPACK_IMPORTED_MODULE_2___default())).withConfig({
  displayName: "richTextEditor__StyledReactQuill",
  componentId: "sc-1tzjxar-1"
})([".ql-editor.ql-blank::before{font-style:normal;color:", ";font-size:16px;font-weight:400;line-height:140%;}.ql-container{font-family:'Proxima Nova';height:auto;border:none;color:", ";font-size:14px;font-style:normal;font-weight:400;line-height:140%;}.ql-editor{min-height:156px;[data-variable]{cursor:pointer;-webkit-user-select:text;user-select:all;> span{padding:4px 6px 2px;border-radius:6px;background-color:rgb(77 80 85 / 10%);white-space:nowrap;}}}&.hasWarning{.ql-editor{border-color:#ffc354;}}&.hasError{.ql-editor{border-color:", ";}}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorL2, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.textColorL1, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_0__.errorColor);

/***/ }),

/***/ "../../libs/shared/components/src/lib/richTextEditor/themes/calendlyTheme.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CalendlyTheme: () => (/* binding */ CalendlyTheme)
/* harmony export */ });
/* harmony import */ var react_quill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react-quill/lib/index.js");
/* harmony import */ var react_quill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_quill__WEBPACK_IMPORTED_MODULE_0__);

const SnowTheme = react_quill__WEBPACK_IMPORTED_MODULE_0__.Quill.import('themes/snow');
class CalendlyTheme extends SnowTheme {
  extendToolbar(toolbar) {
    super.extendToolbar(toolbar);
    const {
      tooltip
    } = this;
    const proto = Object.getPrototypeOf(tooltip);
    // Disable built-in tooltip
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    proto.show = () => {};
  }
}

/***/ }),

/***/ "../../libs/shared/components/src/lib/richTextEditor/toolbar/customToolbar.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomToolbar: () => (/* binding */ CustomToolbar)
/* harmony export */ });
/* harmony import */ var _calendly_ui_components_icon_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/icon-button/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/shared/components/src/lib/richTextEditor/toolbar/customToolbar.tsx";



const CustomToolbar = () => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(StyledToolbar, {
    id: "toolbar",
    role: "toolbar",
    "aria-label": "Editor toolbar",
    onMouseDown: event => event.preventDefault(),
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("span", {
      className: "ql-formats",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(StyledIconButton, {
        className: "ql-bold",
        title: "Bold",
        "aria-label": "Bold"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 13,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(StyledIconButton, {
        className: "ql-italic",
        title: "Italic",
        "aria-label": "Italic"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(StyledIconButton, {
        className: "ql-underline",
        title: "Underline",
        "aria-label": "Underline"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 19,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("span", {
      className: "ql-formats",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(StyledIconButton, {
        className: "ql-list",
        value: "bullet",
        title: "Bullet list",
        "aria-label": "Bullet List"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(StyledIconButton, {
        className: "ql-list",
        value: "ordered",
        title: "Ordered list",
        "aria-label": "Ordered List"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 32,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("span", {
      className: "ql-formats",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(StyledIconButton, {
        className: "ql-link",
        title: "Link",
        "aria-label": "Insert Link"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 6,
    columnNumber: 5
  }, undefined);
};
const StyledIconButton = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_2__["default"])(_calendly_ui_components_icon_button__WEBPACK_IMPORTED_MODULE_0__.IconButton).withConfig({
  displayName: "customToolbar__StyledIconButton",
  componentId: "b1pi1a-0"
})(["transition:none;.ql-stroke{fill:none;stroke:#797c7f;stroke-linecap:round;stroke-linejoin:round;stroke-width:2;}.ql-stroke-miter{fill:none;stroke:#797c7f;stroke-miterlimit:10;stroke-width:2;}.ql-fill,.ql-stroke.ql-fill{fill:#797c7f;}"]);
const StyledToolbar = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div.withConfig({
  displayName: "customToolbar__StyledToolbar",
  componentId: "b1pi1a-1"
})([""]);

/***/ }),

/***/ "../../libs/shared/components/src/lib/richTextEditor/util/util.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   copyTextToClipboard: () => (/* binding */ copyTextToClipboard)
/* harmony export */ });
function copyTextToClipboard(htmlContent) {
  const element = document.createElement('div');
  const previouslyFocusedElement = document.activeElement;
  element.innerHTML = htmlContent;
  element.setAttribute('readonly', '');
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  document.body.appendChild(element);
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = document.getSelection();
  selection == null || selection.removeAllRanges();
  selection == null || selection.addRange(range);
  let isSuccess = false;
  try {
    isSuccess = document.execCommand('copy');
  } catch (_unused) {
    console.warn('Failed copy command!');
  }
  document.body.removeChild(element);
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }
  return isSuccess;
}

/***/ }),

/***/ "../../libs/shared/components/src/lib/searchBar/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchBar: () => (/* reexport safe */ _searchBar__WEBPACK_IMPORTED_MODULE_0__.SearchBar)
/* harmony export */ });
/* harmony import */ var _searchBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/searchBar/searchBar.tsx");


/***/ }),

/***/ "../../libs/shared/components/src/lib/searchBar/searchBar.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchBar: () => (/* binding */ SearchBar)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _calendly_ui_components_icon_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/icon-button/index.js");
/* harmony import */ var _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/icons/index.js");
/* harmony import */ var _calendly_ui_components_text_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/text-input/index.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");

const _excluded = ["isDisabled"];
var _jsxFileName = "/app/libs/shared/components/src/lib/searchBar/searchBar.tsx";








const SearchBar = ({
  value,
  ariaLabel,
  placeholder,
  autofocus,
  isDisabled,
  onBlur,
  onChange,
  onClear,
  onSearchStart
}) => {
  const searchInputRef = (0,react__WEBPACK_IMPORTED_MODULE_6__.useRef)(null);
  const [searchStarted, setSearchStarted] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
  const handleOnChange = event => {
    const newValue = event.target.value;
    if (!searchStarted && newValue.length > 0) {
      onSearchStart == null || onSearchStart(newValue);
      setSearchStarted(true);
    } else if (newValue.length === 0) {
      setSearchStarted(false);
    }
    onChange(newValue);
  };
  const handleOnClear = () => {
    var _searchInputRef$curre;
    onClear();
    setSearchStarted(false);
    (_searchInputRef$curre = searchInputRef.current) == null || _searchInputRef$curre.focus();
  };
  const handleOnSearchClick = () => onChange(value);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(SearchContainer, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(SearchIconContainer, {
      onClick: handleOnSearchClick,
      isDisabled: isDisabled,
      title: "Search",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(StyledSearchIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(SearchInput, {
      ref: searchInputRef,
      "aria-label": ariaLabel,
      type: "text",
      placeholder: placeholder,
      value: value,
      onChange: handleOnChange,
      onBlur: event => onBlur(event.target.value),
      autoFocus: autofocus
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 7
    }, undefined), !!value.length && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(ClearButton, {
      "aria-label": "Clear search",
      onClick: handleOnClear,
      title: "Clear",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_3__.CloseCircleIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 82,
        columnNumber: 11
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 9
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 57,
    columnNumber: 5
  }, undefined);
};
const StyledSearchIcon = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_3__.SearchIcon).withConfig({
  displayName: "searchBar__StyledSearchIcon",
  componentId: "z991zj-0"
})(["position:absolute;top:15px;cursor:pointer;width:16px;height:16px;"]);
const SearchIconContainer = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(_ref => {
  let rest = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_1__.BareButton, Object.assign({}, rest), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 98,
    columnNumber: 3
  }, undefined);
}).withConfig({
  displayName: "searchBar__SearchIconContainer",
  componentId: "z991zj-1"
})(["cursor:", ";height:46px;display:flex;align-items:center;padding:16px;border-radius:8px 0 0 8px;position:absolute;&:focus-visible{outline-offset:0;}"], props => props.isDisabled ? 'not-allowed' : 'pointer');
const SearchContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div.withConfig({
  displayName: "searchBar__SearchContainer",
  componentId: "z991zj-2"
})(["position:relative;display:flex;"]);
const SearchInput = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(_calendly_ui_components_text_input__WEBPACK_IMPORTED_MODULE_4__.TextInput).withConfig({
  displayName: "searchBar__SearchInput",
  componentId: "z991zj-3"
})(["width:100%;&& input{padding:13px 40px 13px 49px;font-size:14px;font-style:normal;font-weight:400;line-height:140%;color:", ";height:46px;}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.textColorL1);
const ClearButton = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(_calendly_ui_components_icon_button__WEBPACK_IMPORTED_MODULE_2__.IconButton).withConfig({
  displayName: "searchBar__ClearButton",
  componentId: "z991zj-4"
})(["position:absolute;right:16px;width:16px;height:16px;border-radius:50%;top:15px;cursor:pointer;border-radius:4px;"]);

/***/ }),

/***/ "../../libs/shared/components/src/lib/select/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Control: () => (/* reexport safe */ _select_control__WEBPACK_IMPORTED_MODULE_0__.Control),
/* harmony export */   ControlUI: () => (/* reexport safe */ _ui__WEBPACK_IMPORTED_MODULE_3__.ControlUI),
/* harmony export */   MAX_OPTIONS_WIDTH: () => (/* reexport safe */ _select_options__WEBPACK_IMPORTED_MODULE_1__.MAX_OPTIONS_WIDTH),
/* harmony export */   MultilineContainer: () => (/* reexport safe */ _ui__WEBPACK_IMPORTED_MODULE_3__.MultilineContainer),
/* harmony export */   Option: () => (/* reexport safe */ _select_option__WEBPACK_IMPORTED_MODULE_2__.Option),
/* harmony export */   OptionUI: () => (/* reexport safe */ _ui__WEBPACK_IMPORTED_MODULE_3__.OptionUI),
/* harmony export */   Options: () => (/* reexport safe */ _select_options__WEBPACK_IMPORTED_MODULE_1__.Options),
/* harmony export */   OptionsUI: () => (/* reexport safe */ _ui__WEBPACK_IMPORTED_MODULE_3__.OptionsUI),
/* harmony export */   Select: () => (/* reexport safe */ _select_select__WEBPACK_IMPORTED_MODULE_6__.Select),
/* harmony export */   SelectUI: () => (/* reexport safe */ _ui__WEBPACK_IMPORTED_MODULE_3__.SelectUI),
/* harmony export */   TimezoneSelect: () => (/* reexport safe */ _timezoneSelect_timezoneSelect__WEBPACK_IMPORTED_MODULE_4__.TimezoneSelect),
/* harmony export */   getOptionsWidth: () => (/* reexport safe */ _select_options__WEBPACK_IMPORTED_MODULE_1__.getOptionsWidth),
/* harmony export */   groupAndFilterZones: () => (/* reexport safe */ _timezoneSelect_helpers_groupAndFilterZones__WEBPACK_IMPORTED_MODULE_5__.groupAndFilterZones)
/* harmony export */ });
/* harmony import */ var _select_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/select/select/control.tsx");
/* harmony import */ var _select_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/shared/components/src/lib/select/select/options.tsx");
/* harmony import */ var _select_option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/shared/components/src/lib/select/select/option.tsx");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/shared/components/src/lib/select/ui/index.ts");
/* harmony import */ var _timezoneSelect_timezoneSelect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/shared/components/src/lib/select/timezoneSelect/timezoneSelect.tsx");
/* harmony import */ var _timezoneSelect_helpers_groupAndFilterZones__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/shared/components/src/lib/select/timezoneSelect/helpers/groupAndFilterZones.ts");
/* harmony import */ var _select_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/shared/components/src/lib/select/select/select.tsx");








/***/ }),

/***/ "../../libs/shared/components/src/lib/select/select/context.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectProvider: () => (/* binding */ SelectProvider),
/* harmony export */   useOptionId: () => (/* binding */ useOptionId),
/* harmony export */   useOptionsId: () => (/* binding */ useOptionsId),
/* harmony export */   useSelectData: () => (/* binding */ useSelectData)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const Context = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  toggle: () => null,
  highlightNextOption: () => null,
  highlightPreviousOption: () => null,
  isOptionDisabled: () => false,
  optionNode: () => null,
  selectOption: () => null,
  registerOption: () => null,
  unregisterOption: () => null,
  invalid: false,
  isExpanded: false,
  selectedOption: undefined,
  rootId: undefined,
  setReference: () => null,
  FloatingWrapper: () => null
});
Context.displayName = 'SelectContext';
const SelectProvider = Context.Provider;
const useSelectData = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Context);
const useRootId = () => useSelectData().rootId;
const useOptionsId = () => `${useRootId() || ''}-options`;
const useOptionId = id => {
  const rootId = useRootId();
  return id !== undefined ? `${rootId || ''}-option-${id}` : undefined;
};

/***/ }),

/***/ "../../libs/shared/components/src/lib/select/select/control.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Control: () => (/* binding */ Control)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var _calendly_ui_utils_merge_refs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/utils/merge-refs.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/shared/components/src/lib/select/ui/index.ts");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/shared/components/src/lib/select/select/context.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");

const _excluded = ["placeholder", "children", "invalid", "disabled", "hasBorder"];
var _jsxFileName = "/app/libs/shared/components/src/lib/select/select/control.tsx";







const Content = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_7__["default"])('div').withConfig({
  displayName: "control__Content",
  componentId: "sc-10f44wa-0"
})(["overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"]);
const Placeholder = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_7__["default"])('div').withConfig({
  displayName: "control__Placeholder",
  componentId: "sc-10f44wa-1"
})(["color:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.colorTextSecondary);
const Control = _ref => {
  let {
      placeholder,
      children,
      invalid: deprecatedInvalid,
      disabled,
      hasBorder = true
    } = _ref,
    rest = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const showPlaceholder = !children && placeholder;
  const {
    toggle,
    selectOption,
    isOptionDisabled,
    isExpanded,
    invalid,
    highlightedOption,
    highlightPreviousOption,
    highlightNextOption,
    setReference,
    controlRef
  } = (0,_context__WEBPACK_IMPORTED_MODULE_5__.useSelectData)();
  const optionsId = (0,_context__WEBPACK_IMPORTED_MODULE_5__.useOptionsId)();
  const activeDescendantId = (0,_context__WEBPACK_IMPORTED_MODULE_5__.useOptionId)(highlightedOption);
  const [isKeyboardControlled, setIsKeyboardControlled] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const needsHighlight = isExpanded && isKeyboardControlled;
  const isInvalid = deprecatedInvalid != null ? deprecatedInvalid : invalid;
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (needsHighlight) {
      highlightNextOption();
    }
  }, [highlightNextOption, needsHighlight]);
  const handleClick = e => {
    if (disabled) return;
    setIsKeyboardControlled(false);
    toggle(e);
  };
  const handleKeyDown = event => {
    if (disabled) return;
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (!isExpanded) {
          setIsKeyboardControlled(true);
          toggle(event);
          return;
        }
        highlightPreviousOption();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isExpanded) {
          setIsKeyboardControlled(true);
          toggle(event);
          return;
        }
        highlightNextOption();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isExpanded) {
          setIsKeyboardControlled(true);
          toggle(event);
          return;
        }
        if (highlightedOption === undefined) {
          toggle();
          return;
        }
        if (isOptionDisabled(highlightedOption)) {
          return;
        }
        selectOption(highlightedOption);
        break;
      case 'Tab':
        if (isExpanded) {
          toggle(event);
        }
        break;
      default:
    }
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(_ui__WEBPACK_IMPORTED_MODULE_4__.ControlUI, Object.assign({}, rest, {
    as: "div",
    role: "combobox",
    disabled: disabled,
    "aria-disabled": disabled,
    tabIndex: disabled ? undefined : 0,
    "aria-activedescendant": activeDescendantId,
    "aria-expanded": isExpanded,
    "aria-haspopup": "listbox",
    "aria-controls": optionsId,
    "aria-invalid": String(isInvalid),
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    expanded: isExpanded,
    invalid: isInvalid,
    hasBorder: hasBorder,
    ref: (0,_calendly_ui_utils_merge_refs__WEBPACK_IMPORTED_MODULE_2__.mergeRefs)(controlRef, ref => setReference(ref)),
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(Content, {
      children: showPlaceholder ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(Placeholder, {
        children: placeholder
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 153,
        columnNumber: 28
      }, undefined) : children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 7
    }, undefined)
  }), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 133,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "../../libs/shared/components/src/lib/select/select/option.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Option: () => (/* binding */ Option)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/shared/components/src/lib/select/ui/index.ts");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/shared/components/src/lib/select/select/context.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");

const _excluded = ["value"];
var _jsxFileName = "/app/libs/shared/components/src/lib/select/select/option.tsx";




const Option = _ref => {
  let {
      value
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const {
    selectedOption,
    selectOption,
    registerOption,
    unregisterOption,
    highlightedOption
  } = (0,_context__WEBPACK_IMPORTED_MODULE_3__.useSelectData)();
  const id = (0,_context__WEBPACK_IMPORTED_MODULE_3__.useOptionId)(value);
  const isSelected = selectedOption === value;
  const isHighlighted = highlightedOption === value;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    registerOption({
      value,
      node: ref.current
    });
    return () => {
      unregisterOption(value);
    };
  });
  const handleClick = () => {
    selectOption(value);
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_ui__WEBPACK_IMPORTED_MODULE_2__.OptionUI, Object.assign({}, props, {
    ref: ref,
    id: id,
    role: "option",
    tabIndex: -1,
    "aria-selected": isSelected,
    selected: isSelected,
    $highlighted: isHighlighted,
    onClick: handleClick
  }), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 40,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "../../libs/shared/components/src/lib/select/select/options.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAX_OPTIONS_WIDTH: () => (/* binding */ MAX_OPTIONS_WIDTH),
/* harmony export */   Options: () => (/* binding */ Options),
/* harmony export */   getOptionsWidth: () => (/* binding */ getOptionsWidth)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _calendly_ui_utils_merge_refs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/utils/merge-refs.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/shared/components/src/lib/select/ui/index.ts");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/shared/components/src/lib/select/select/context.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");

const _excluded = ["children"];
var _jsxFileName = "/app/libs/shared/components/src/lib/select/select/options.tsx";





const FloatingContainer = ({
  children
}) => {
  const {
    FloatingWrapper
  } = (0,_context__WEBPACK_IMPORTED_MODULE_4__.useSelectData)();
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(FloatingWrapper, {
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 10
  }, undefined);
};
const MAX_OPTIONS_WIDTH = 378;
const getOptionsWidth = currentControlWidth => ({
  maxWidth: `${Math.min(currentControlWidth, MAX_OPTIONS_WIDTH)}px`
});
const Options = _ref => {
  var _controlRef$current;
  let {
      children
    } = _ref,
    rest = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const {
    toggle,
    Dropdown,
    isExpanded,
    dropdownRef,
    controlRef,
    invalid,
    optionNode,
    selectedOption,
    highlightedOption
  } = (0,_context__WEBPACK_IMPORTED_MODULE_4__.useSelectData)();
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const id = (0,_context__WEBPACK_IMPORTED_MODULE_4__.useOptionsId)();
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!isExpanded) return;
    if (!ref.current) return;
    const isVisible = (child, container) => {
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.offsetHeight;
      const childTop = child.offsetTop;
      const childBottom = childTop + child.offsetHeight;
      return childTop >= containerTop && childBottom <= containerBottom;
    };
    if (selectedOption) {
      const selectedOptionNode = optionNode(selectedOption);
      if (selectedOptionNode) {
        ref.current.scrollTo({
          top: selectedOptionNode.offsetTop - (ref.current.offsetHeight - selectedOptionNode.offsetHeight) / 2
        });
      }
    }
    if (highlightedOption) {
      const highlightedOptionNode = optionNode(highlightedOption);
      if (highlightedOptionNode) {
        if (!isVisible(highlightedOptionNode, ref.current)) {
          highlightedOptionNode.scrollIntoView({
            block: 'nearest'
          });
        }
      }
    }
  }, [highlightedOption, isExpanded, optionNode, selectedOption]);
  if (!Dropdown) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(Dropdown, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(FloatingContainer, {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_ui__WEBPACK_IMPORTED_MODULE_3__.OptionsUI, Object.assign({
        id: id,
        role: "listbox",
        onClose: toggle,
        invalid: invalid,
        ref: (0,_calendly_ui_utils_merge_refs__WEBPACK_IMPORTED_MODULE_1__.mergeRefs)(ref, dropdownRef)
        /**
         * this is a hack
         * the Options element is never focused directly because it is operated by the focused Control
         * but the spec requires a listbox to have a label
         */,
        "aria-label": "Options",
        tabIndex: -1,
        style: getOptionsWidth((controlRef == null || (_controlRef$current = controlRef.current) == null ? void 0 : _controlRef$current.offsetWidth) || 0)
      }, rest, {
        children: children
      }), void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 76,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "../../libs/shared/components/src/lib/select/select/select.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Select: () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _calendly_ui_components_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/index.js");
/* harmony import */ var _calendly_ui_hooks_use_floating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/hooks/use-floating.js");
/* harmony import */ var _calendly_ui_utils_generate_id__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/utils/generate-id.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../libs/shared/components/src/lib/select/ui/index.ts");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../libs/shared/components/src/lib/select/select/context.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");

const _excluded = ["value", "onChange", "invalid", "widerDropdown", "closeOnSelect", "onToggle"];
var _jsxFileName = "/app/libs/shared/components/src/lib/select/select/select.tsx";







const SelectComponent = (_ref, ref) => {
  let {
      value,
      onChange,
      invalid = false,
      widerDropdown = false,
      closeOnSelect = true,
      onToggle
    } = _ref,
    rest = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const rootId = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)(`select-${(0,_calendly_ui_utils_generate_id__WEBPACK_IMPORTED_MODULE_3__.generateId)()}`).current;
  const [toggle, Dropdown, isExpanded, {
    dropdownRef
  }] = (0,_calendly_ui_components_dropdown__WEBPACK_IMPORTED_MODULE_1__.useDropdown)();
  const options = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)([]);
  const optionNodes = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)(new Map()).current;
  const [highlightedOption, setHighlightedOption] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)();
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useImperativeHandle)(ref, () => ({
    toggleDropdown: () => toggle(),
    highlightPreviousOption: () => highlightPreviousOption(),
    highlightNextOption: () => highlightNextOption(),
    highlightOption: option => highlightOption(option),
    options: options,
    optionNodes: optionNodes,
    controlRef
  }));
  const [setReference, FloatingWrapper] = (0,_calendly_ui_hooks_use_floating__WEBPACK_IMPORTED_MODULE_2__.useFloating)(isExpanded, {
    placement: 'bottom-start'
  });
  const controlRef = (0,react__WEBPACK_IMPORTED_MODULE_4__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (!isExpanded) {
      setHighlightedOption(undefined);
    }
    if (onToggle) {
      onToggle(isExpanded);
    }
  }, [isExpanded]);
  const selectOption = optionValue => {
    onChange(optionValue);
    let shouldClose = true;
    if (typeof closeOnSelect === 'function') {
      shouldClose = closeOnSelect(optionValue);
    } else {
      shouldClose = closeOnSelect;
    }
    if (isExpanded && shouldClose) {
      toggle();
    }
  };
  const registerOption = ({
    value: optionValue,
    node
  }) => {
    optionNodes.set(optionValue, node);
    if (options.current.includes(optionValue)) return;
    options.current.push(optionValue);
  };
  const unregisterOption = optionValue => {
    const index = options.current.indexOf(optionValue);
    if (index === -1) return;
    options.current.splice(index, 1);
    optionNodes.set(optionValue, null);
  };
  const optionNode = optionValue => {
    var _optionNodes$get;
    return (_optionNodes$get = optionNodes.get(optionValue)) != null ? _optionNodes$get : null;
  };
  const isOptionDisabled = optionValue => {
    var _optionNode$hasAttrib, _optionNode;
    return (_optionNode$hasAttrib = (_optionNode = optionNode(optionValue)) == null ? void 0 : _optionNode.hasAttribute('disabled')) != null ? _optionNode$hasAttrib : false;
  };
  const highlightPreviousOption = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {
    setHighlightedOption(oldHighlightedOption => {
      if (oldHighlightedOption === undefined) {
        return value || options.current[options.current.length - 1];
      }
      const index = options.current.indexOf(oldHighlightedOption);
      if (index === 0) {
        return options.current[options.current.length - 1];
      }
      return options.current[index - 1];
    });
  }, [value]);
  const highlightNextOption = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(() => {
    setHighlightedOption(oldHighlightedOption => {
      if (oldHighlightedOption === undefined) {
        return value || options.current[0];
      }
      const index = options.current.indexOf(oldHighlightedOption);
      return options.current[(index + 1) % options.current.length];
    });
  }, [value]);
  const highlightOption = (0,react__WEBPACK_IMPORTED_MODULE_4__.useCallback)(option => {
    setHighlightedOption(option);
  }, [value]);
  const contextValue = {
    rootId,
    selectedOption: value,
    selectOption,
    toggle,
    Dropdown,
    dropdownRef,
    isExpanded,
    invalid,
    registerOption,
    unregisterOption,
    isOptionDisabled,
    optionNode,
    highlightedOption,
    highlightPreviousOption,
    highlightNextOption,
    setReference,
    FloatingWrapper,
    controlRef
  };
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_context__WEBPACK_IMPORTED_MODULE_6__.SelectProvider, {
    value: contextValue,
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxDEV)(_ui__WEBPACK_IMPORTED_MODULE_5__.SelectUI, Object.assign({}, rest), void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 184,
    columnNumber: 5
  }, undefined);
};
const Select = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_4__.forwardRef)(SelectComponent);

/***/ }),

/***/ "../../libs/shared/components/src/lib/select/timezoneSelect/helpers/groupAndFilterZones.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   groupAndFilterZones: () => (/* binding */ groupAndFilterZones)
/* harmony export */ });
const timezoneGroups = ['US/Canada', 'America', 'Europe', 'Australia', 'Pacific', 'Africa', 'Asia', 'Atlantic', 'UTC'];
const groupAndFilterZones = (search, zones) => {
  return timezoneGroups.map(group => {
    return {
      group: group,
      zones: zones.filter(zone => zone.group === group && (!search || zone.standard_title.toLowerCase().includes(search.toLowerCase())))
    };
  }).filter(grouping => {
    return grouping.zones.length > 0;
  });
};

/***/ }),

/***/ "../../libs/shared/components/src/lib/select/timezoneSelect/timezoneSelect.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TimezoneSelect: () => (/* binding */ TimezoneSelect)
/* harmony export */ });
/* harmony import */ var _calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _calendly_ui_components_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/index.js");
/* harmony import */ var _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/icons/index.js");
/* harmony import */ var _calendly_ui_components_inline_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/inline-search/index.js");
/* harmony import */ var _calendly_ui_components_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/menu/index.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../node_modules/luxon/src/luxon.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _client_core_assets__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../libs/assets/src/index.ts");
/* harmony import */ var _client_core_helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../libs/helpers/src/index.ts");
/* harmony import */ var _helpers_groupAndFilterZones__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../libs/shared/components/src/lib/select/timezoneSelect/helpers/groupAndFilterZones.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");
var _jsxFileName = "/app/libs/shared/components/src/lib/select/timezoneSelect/timezoneSelect.tsx";













const TimezoneSelect = ({
  value,
  onChange
}) => {
  const [searchString, setSearchString] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)('');
  const [toggle, Dropdown, isOpen] = (0,_calendly_ui_components_dropdown__WEBPACK_IMPORTED_MODULE_1__.useDropdown)();
  const groupings = (0,_helpers_groupAndFilterZones__WEBPACK_IMPORTED_MODULE_10__.groupAndFilterZones)(searchString, _client_core_assets__WEBPACK_IMPORTED_MODULE_8__.Timezones);
  const [timezoneList, setTimezoneList] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(groupings);
  (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    setTimezoneList((0,_helpers_groupAndFilterZones__WEBPACK_IMPORTED_MODULE_10__.groupAndFilterZones)(searchString, _client_core_assets__WEBPACK_IMPORTED_MODULE_8__.Timezones));
  }, [searchString]);
  const handleOnSearchChange = zone => setSearchString(zone);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(TimezoneContainer, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(TimezoneToggle, {
      onClick: toggle,
      value: value,
      children: [value ? value : 'Select a time zone', isOpen ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_2__.ArrowChevronUpMiniIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 19
      }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_2__.ArrowChevronDownMiniIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 48
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(Dropdown, {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(Wrapper, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(SearchContainer, {
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(_calendly_ui_components_inline_search__WEBPACK_IMPORTED_MODULE_3__.InlineSearch, {
            placeholder: "Search...",
            variant: "default",
            value: searchString,
            onChange: handleOnSearchChange,
            autoFocus: true
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 59,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 58,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(ScrollContainer, {
          children: [value ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(SelectedTimezone, {
            children: value
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 69,
            columnNumber: 22
          }, undefined) : null, /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(TimezoneTitle, {
            children: "Time Zone"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 70,
            columnNumber: 13
          }, undefined), timezoneList.map(grouping => {
            return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(react__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(GroupTitle, {
                children: grouping.group.toUpperCase()
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 75,
                columnNumber: 19
              }, undefined), grouping.zones.map(zone => {
                return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)(StyledItem, {
                  value: zone.id,
                  "data-testid": `timezone-item-${zone.id}`,
                  onClick: () => onChange(zone.id),
                  children: [zone.standard_title, /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxDEV)("div", {
                    children: (0,_client_core_helpers__WEBPACK_IMPORTED_MODULE_9__.formatTime)(luxon__WEBPACK_IMPORTED_MODULE_6__.DateTime.local().setZone(zone.id))
                  }, void 0, false, {
                    fileName: _jsxFileName,
                    lineNumber: 85,
                    columnNumber: 25
                  }, undefined)]
                }, `${zone.standard_title}-${zone.id}`, true, {
                  fileName: _jsxFileName,
                  lineNumber: 78,
                  columnNumber: 23
                }, undefined);
              })]
            }, grouping.group, true, {
              fileName: _jsxFileName,
              lineNumber: 74,
              columnNumber: 17
            }, undefined);
          })]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 68,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 50,
    columnNumber: 5
  }, undefined);
};
const StyledItem = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_12__["default"])(_calendly_ui_components_menu__WEBPACK_IMPORTED_MODULE_4__.Item).withConfig({
  displayName: "timezoneSelect__StyledItem",
  componentId: "sc-5jncxy-0"
})(["> div{display:flex;justify-content:space-between;font-size:14px;}"]);
const ScrollContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_12__["default"].div.withConfig({
  displayName: "timezoneSelect__ScrollContainer",
  componentId: "sc-5jncxy-1"
})(["overflow-y:scroll;"]);
const Wrapper = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_12__["default"].div.withConfig({
  displayName: "timezoneSelect__Wrapper",
  componentId: "sc-5jncxy-2"
})(["display:flex;flex-direction:column;max-height:250px;top:100%;margin-top:10px;border:1px solid ", ";position:absolute;overflow-y:auto;border-radius:6px;background:rgba(255,255,255,1);box-shadow:", ";user-select:none;z-index:10;width:100%;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.colorGrey3, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.overlayShadow);
const TimezoneContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_12__["default"].div.withConfig({
  displayName: "timezoneSelect__TimezoneContainer",
  componentId: "sc-5jncxy-3"
})(["position:relative;"]);
const TimezoneToggle = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_12__["default"])(_calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_0__.BareButton).withConfig({
  displayName: "timezoneSelect__TimezoneToggle",
  componentId: "sc-5jncxy-4"
})(["display:flex;justify-content:space-between;align-items:center;padding:8px 12px;border-radius:6px;width:100%;box-sizing:border-box;width:100%;min-height:46px;background-color:rgba(255,255,255,1);outline:1px solid ", ";color:", ";font-size:16px;font-style:normal;font-weight:400;line-height:140%;&:hover,&.toggled{background-color:", ";color:", ";}"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.colorStrokeMedium, props => props.value ? _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.textColorL1 : _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.textColorL2, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.primaryColorL4, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.textColorSecondary3);
const TimezoneTitle = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_12__["default"].div.withConfig({
  displayName: "timezoneSelect__TimezoneTitle",
  componentId: "sc-5jncxy-5"
})(["padding:12px 16px 4px;color:", ";font-weight:bold;font-size:12px;line-height:17px;text-transform:uppercase;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.textColorSecondary1);
const SelectedTimezone = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_12__["default"].div.withConfig({
  displayName: "timezoneSelect__SelectedTimezone",
  componentId: "sc-5jncxy-6"
})(["padding:14px 20px;background-color:", ";color:#ffff;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.primaryColorL1);
const SearchContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_12__["default"].div.withConfig({
  displayName: "timezoneSelect__SearchContainer",
  componentId: "sc-5jncxy-7"
})(["padding:12px;"]);
const GroupTitle = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_12__["default"].div.withConfig({
  displayName: "timezoneSelect__GroupTitle",
  componentId: "sc-5jncxy-8"
})(["padding:12px 16px 4px;color:", ";font-weight:bold;font-size:14px;line-height:17px;"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_5__.textColorSecondary1);

/***/ }),

/***/ "../../libs/shared/components/src/lib/select/ui/control.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Control: () => (/* binding */ Control)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _calendly_ui_components_component_group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/component-group/index.js");
/* harmony import */ var _calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/icons/index.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");

const _excluded = ["disabled", "expanded", "invalid", "position", "wide"],
  _excluded2 = ["as", "className", "children", "disabled", "invalid", "expanded", "wide"];
var _jsxFileName = "/app/libs/shared/components/src/lib/select/ui/control.tsx";







const ContainerStyled = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_7__["default"])(_calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_1__.BareButton).withConfig({
  displayName: "control__ContainerStyled",
  componentId: "eceplo-0"
})(["position:relative;display:flex;align-items:center;max-width:fit-content;min-height:46px;padding-right:36px;padding-left:16px;border-radius:8px;background-color:", ";color:", ";font-size:16px;line-height:1.25;text-align:left;cursor:pointer;", " ", " &:focus-visible{outline:2px solid ", ";outline-offset:2px;}", " ", " ", " ", " ", " ", " ", " ", ""], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorBackgroundStandard, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorTextSecondary, props => props.hasBorder && (0,styled_components__WEBPACK_IMPORTED_MODULE_7__.css)(["border:1px solid ", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorStrokeMedium), props => props.hasHover && (0,styled_components__WEBPACK_IMPORTED_MODULE_7__.css)(["background:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorSurfaceActionSecondaryHover), _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorStrokeFocus, props => props.wide && (0,styled_components__WEBPACK_IMPORTED_MODULE_7__.css)(["width:100%;max-width:none;"]), props => props.expanded && (0,styled_components__WEBPACK_IMPORTED_MODULE_7__.css)(["padding-right:35px;padding-left:16px;border-color:", ";box-shadow:inset 0 0 0 2px ", ";", ""], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorStrokeFocus, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorStrokeFocus, props.invalid && (0,styled_components__WEBPACK_IMPORTED_MODULE_7__.css)(["box-shadow:inset 0 0 0 2px ", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorStrokeDestructive)), props => props.disabled && (0,styled_components__WEBPACK_IMPORTED_MODULE_7__.css)(["background-color:", ";color:", ";filter:grayscale(100%);"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorSurfaceDisabled, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorTextDisabled), props => props.invalid && (0,styled_components__WEBPACK_IMPORTED_MODULE_7__.css)(["border-color:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorStrokeDestructive), props => props.position === 'first' && (0,styled_components__WEBPACK_IMPORTED_MODULE_7__.css)(["border-top-right-radius:unset;border-bottom-right-radius:unset;"]), props => props.position === 'middle' && (0,styled_components__WEBPACK_IMPORTED_MODULE_7__.css)(["border-left:none;border-radius:unset;"]), props => props.position === 'last' && (0,styled_components__WEBPACK_IMPORTED_MODULE_7__.css)(["border-left:none;border-top-left-radius:unset;border-bottom-left-radius:unset;"]), props => props.position === 'first' && props.expanded && (0,styled_components__WEBPACK_IMPORTED_MODULE_7__.css)(["padding-right:37px;padding-left:17px;border:none;box-shadow:inset 0 0 0 1px ", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorStrokeFocus));
const Container = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_5__.forwardRef)((_ref, ref) => {
  let {
      disabled,
      expanded,
      invalid,
      position,
      wide
    } = _ref,
    restProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(ContainerStyled, Object.assign({
    disabled: disabled,
    expanded: expanded,
    invalid: invalid,
    position: position,
    wide: wide
  }, restProps, {
    ref: ref
  }), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 140,
    columnNumber: 3
  }, undefined);
});
const IconContainer = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_7__["default"])('div').withConfig({
  displayName: "control__IconContainer",
  componentId: "eceplo-1"
})(["position:absolute;top:50%;right:16px;margin-top:-8px;color:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_4__.colorIconActive);
const Control = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_5__.forwardRef)((_ref2, ref) => {
  let {
      as = 'button',
      children,
      disabled,
      invalid,
      expanded,
      wide = true
    } = _ref2,
    restProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded2);
  const position = (0,_calendly_ui_components_component_group__WEBPACK_IMPORTED_MODULE_2__.useComponentGroupChild)();
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(Container, Object.assign({
    as: as,
    disabled: disabled,
    expanded: expanded,
    invalid: invalid,
    wide: wide,
    ref: ref
  }, restProps, {
    position: position,
    children: [children, /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(IconContainer, {
      children: expanded ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowChevronUpMiniIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 193,
        columnNumber: 23
      }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxDEV)(_calendly_ui_components_icons__WEBPACK_IMPORTED_MODULE_3__.ArrowChevronDownMiniIcon, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 193,
        columnNumber: 52
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 9
    }, undefined)]
  }), void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 181,
    columnNumber: 7
  }, undefined);
});

/***/ }),

/***/ "../../libs/shared/components/src/lib/select/ui/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ControlUI: () => (/* reexport safe */ _control__WEBPACK_IMPORTED_MODULE_1__.Control),
/* harmony export */   MultilineContainer: () => (/* reexport safe */ _option__WEBPACK_IMPORTED_MODULE_3__.MultilineContainer),
/* harmony export */   OptionUI: () => (/* reexport safe */ _option__WEBPACK_IMPORTED_MODULE_3__.Option),
/* harmony export */   OptionsUI: () => (/* reexport safe */ _options__WEBPACK_IMPORTED_MODULE_2__.Options),
/* harmony export */   SelectUI: () => (/* reexport safe */ _select__WEBPACK_IMPORTED_MODULE_0__.Select)
/* harmony export */ });
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/select/ui/select.ts");
/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/shared/components/src/lib/select/ui/control.tsx");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/shared/components/src/lib/select/ui/options.tsx");
/* harmony import */ var _option__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/shared/components/src/lib/select/ui/option.tsx");





/***/ }),

/***/ "../../libs/shared/components/src/lib/select/ui/option.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MultilineContainer: () => (/* binding */ MultilineContainer),
/* harmony export */   Option: () => (/* binding */ Option)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");

const _excluded = ["$highlighted", "className"],
  _excluded2 = ["children", "selected"];
var _jsxFileName = "/app/libs/shared/components/src/lib/select/ui/option.tsx";





const MultilineContainer = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_5__["default"])('div').withConfig({
  displayName: "option__MultilineContainer",
  componentId: "wtndac-0"
})(["display:flex;flex-direction:column;gap:4px;"]);
const ContainerStyled = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_5__["default"])(_calendly_ui_components_bare_button__WEBPACK_IMPORTED_MODULE_1__.BareButton).withConfig({
  displayName: "option__ContainerStyled",
  componentId: "wtndac-1"
})(["position:relative;display:block;width:100%;min-height:36px;padding:8px 16px;background-color:", ";color:", ";font-size:16px;text-align:left;&:hover,&:focus,&:focus-within{background-color:", ";}", " ", ""], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.colorBackgroundStandard, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.colorTextStandard, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.colorSurfaceActionSecondaryHover, props => props.$highlighted && (0,styled_components__WEBPACK_IMPORTED_MODULE_5__.css)(["background-color:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.colorSurfaceActionSecondaryHover), props => props.disabled && (0,styled_components__WEBPACK_IMPORTED_MODULE_5__.css)(["color:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_2__.colorTextDisabled));
const Container = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)((_ref, ref) => {
  let {
      $highlighted,
      className
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(ContainerStyled, Object.assign({
    className: className,
    $highlighted: $highlighted
  }, props, {
    ref: ref
  }), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 55,
    columnNumber: 7
  }, undefined);
});
const Wrapper = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_5__["default"])('div').withConfig({
  displayName: "option__Wrapper",
  componentId: "wtndac-2"
})(["width:100%;display:flex;gap:24px;justify-content:space-between;align-items:center;"]);
const Option = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)((_ref2, ref) => {
  let {
      children
    } = _ref2,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded2);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(Container, Object.assign({}, props, {
    ref: ref,
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(Wrapper, {
      role: "presentation",
      children: children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 7
    }, undefined)
  }), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 77,
    columnNumber: 5
  }, undefined);
});

/***/ }),

/***/ "../../libs/shared/components/src/lib/select/ui/options.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Options: () => (/* binding */ Options)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");

const _excluded = ["invalid", "fitWidth"],
  _excluded2 = ["onClose", "invalid", "children", "fitWidth"];
var _jsxFileName = "/app/libs/shared/components/src/lib/select/ui/options.tsx";




const ContainerStyled = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_4__["default"].div.withConfig({
  displayName: "options__ContainerStyled",
  componentId: "sc-1220xeq-0"
})(["position:relative;left:0;overflow:auto;-webkit-overflow-scrolling:touch;margin:4px 0;padding:8px 0;border:1px solid ", ";border-radius:8px;background-color:", ";box-shadow:", ";box-sizing:border-box;", " ", ""], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.colorGrey3, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.colorBackgroundStandard, _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.overlayShadow, props => props.invalid && (0,styled_components__WEBPACK_IMPORTED_MODULE_4__.css)(["border-color:", ";"], _calendly_ui_theme__WEBPACK_IMPORTED_MODULE_1__.colorStrokeDestructive), props => props.fitWidth && (0,styled_components__WEBPACK_IMPORTED_MODULE_4__.css)(["width:max-content;"]));
const Container = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((_ref, ref) => {
  let {
      invalid,
      fitWidth
    } = _ref,
    rest = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(ContainerStyled, Object.assign({
    invalid: invalid,
    fitWidth: fitWidth
  }, rest, {
    ref: ref
  }), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 43,
    columnNumber: 5
  }, undefined);
});
const Options = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((_ref2, forwardedRef) => {
  let {
      invalid,
      children,
      fitWidth
    } = _ref2,
    rest = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded2);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(Container, Object.assign({
    fitWidth: fitWidth,
    invalid: invalid
  }, rest, {
    ref: forwardedRef,
    children: children
  }), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 58,
    columnNumber: 7
  }, undefined);
});

/***/ }),

/***/ "../../libs/shared/components/src/lib/select/ui/select.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Select: () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var _calendly_ui_components_box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/internal/box/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");


const Select = /*#__PURE__*/(0,styled_components__WEBPACK_IMPORTED_MODULE_1__["default"])(_calendly_ui_components_box__WEBPACK_IMPORTED_MODULE_0__.Box).withConfig({
  displayName: "select__Select",
  componentId: "o3hmad-0"
})(["position:relative;width:100%;& *{box-sizing:border-box;}"]);

/***/ }),

/***/ "../../libs/shared/components/src/lib/tooltip/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tooltip: () => (/* reexport safe */ _tooltip__WEBPACK_IMPORTED_MODULE_0__.Tooltip),
/* harmony export */   TooltipClose: () => (/* reexport safe */ _tooltipClose__WEBPACK_IMPORTED_MODULE_3__.TooltipClose),
/* harmony export */   TooltipContent: () => (/* reexport safe */ _tooltipContent__WEBPACK_IMPORTED_MODULE_1__.TooltipContent),
/* harmony export */   TooltipTrigger: () => (/* reexport safe */ _tooltipTrigger__WEBPACK_IMPORTED_MODULE_2__.TooltipTrigger),
/* harmony export */   useTooltip: () => (/* reexport safe */ _useTooltip__WEBPACK_IMPORTED_MODULE_4__.useTooltip),
/* harmony export */   useTooltipContext: () => (/* reexport safe */ _tooltip__WEBPACK_IMPORTED_MODULE_0__.useTooltipContext)
/* harmony export */ });
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../libs/shared/components/src/lib/tooltip/tooltip.tsx");
/* harmony import */ var _tooltipContent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/shared/components/src/lib/tooltip/tooltipContent.tsx");
/* harmony import */ var _tooltipTrigger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/shared/components/src/lib/tooltip/tooltipTrigger.tsx");
/* harmony import */ var _tooltipClose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../libs/shared/components/src/lib/tooltip/tooltipClose.tsx");
/* harmony import */ var _useTooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../libs/shared/components/src/lib/tooltip/useTooltip.ts");






/***/ }),

/***/ "../../libs/shared/components/src/lib/tooltip/tooltip.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tooltip: () => (/* binding */ Tooltip),
/* harmony export */   useTooltipContext: () => (/* binding */ useTooltipContext)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _useTooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/shared/components/src/lib/tooltip/useTooltip.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");

const _excluded = ["children"];
var _jsxFileName = "/app/libs/shared/components/src/lib/tooltip/tooltip.tsx";



const TooltipContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const useTooltipContext = () => {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(TooltipContext);
  if (!context) {
    throw new Error('useTooltipContext must be used within a Tooltip component.');
  }
  return context;
};
const Tooltip = props => {
  const {
      children
    } = props,
    restProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);
  const tooltip = (0,_useTooltip__WEBPACK_IMPORTED_MODULE_2__.useTooltip)(restProps);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(TooltipContext.Provider, {
    value: tooltip,
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 29,
    columnNumber: 5
  }, undefined);
};

/***/ }),

/***/ "../../libs/shared/components/src/lib/tooltip/tooltipClose.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TooltipClose: () => (/* binding */ TooltipClose)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/shared/components/src/lib/tooltip/tooltip.tsx");


const TooltipClose = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, ref) => {
  const {
    children
  } = props;
  const context = (0,_tooltip__WEBPACK_IMPORTED_MODULE_1__.useTooltipContext)();
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(children, Object.assign({
    ref
  }, children.props, {
    onClick: e => {
      children.props.onClick == null || children.props.onClick(e);
      context.setOpen(false);
    }
  }));
});

/***/ }),

/***/ "../../libs/shared/components/src/lib/tooltip/tooltipContent.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TooltipContent: () => (/* binding */ TooltipContent)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/@floating-ui/react/dist/floating-ui.react.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../libs/shared/components/src/lib/tooltip/tooltip.tsx");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/jsx-dev-runtime.js");

const _excluded = ["style", "customFloatingStyles", "children", "className"];
var _jsxFileName = "/app/libs/shared/components/src/lib/tooltip/tooltipContent.tsx";





const TooltipContent = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((props, propRef) => {
  const {
      style,
      customFloatingStyles,
      children,
      className
    } = props,
    restProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);
  const {
    context: floatingContext,
    open,
    refs,
    getFloatingProps,
    floatingStyles,
    transitionStyles
  } = (0,_tooltip__WEBPACK_IMPORTED_MODULE_2__.useTooltipContext)();
  const ref = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.useMergeRefs)([refs.setFloating, propRef]);
  if (!open) return null;
  const content = /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(OuterContainer, Object.assign({
    style: Object.assign({}, floatingStyles, customFloatingStyles),
    ref: ref
  }, getFloatingProps(restProps), {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(InnerContainer, {
      style: Object.assign({}, transitionStyles, style),
      className: className,
      children: children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 9
    }, undefined)
  }), void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 30,
    columnNumber: 7
  }, undefined);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_floating_ui_react__WEBPACK_IMPORTED_MODULE_4__.FloatingFocusManager, {
    context: floatingContext,
    modal: false,
    initialFocus: -1,
    returnFocus: false,
    children: content
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 45,
    columnNumber: 7
  }, undefined);
});
const OuterContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div.withConfig({
  displayName: "tooltipContent__OuterContainer",
  componentId: "syr4v1-0"
})(["z-index:5;"]);
const InnerContainer = /*#__PURE__*/styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div.withConfig({
  displayName: "tooltipContent__InnerContainer",
  componentId: "syr4v1-1"
})(["padding:24px;color:#ffffff;background:#333333;border-radius:8px;font-weight:400;font-size:14px;white-space:pre-line;max-width:150px;"]);

/***/ }),

/***/ "../../libs/shared/components/src/lib/tooltip/tooltipTrigger.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TooltipTrigger: () => (/* binding */ TooltipTrigger)
/* harmony export */ });
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@floating-ui/react/dist/floating-ui.react.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../libs/shared/components/src/lib/tooltip/tooltip.tsx");



const TooltipTrigger = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((props, propRef) => {
  const {
    children
  } = props;
  const childrenRef = children.ref;
  const context = (0,_tooltip__WEBPACK_IMPORTED_MODULE_1__.useTooltipContext)();
  const ref = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.useMergeRefs)([propRef, context.refs.setReference, childrenRef]);
  return /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(children, context.getReferenceProps(Object.assign({
    ref
  }, children.props)));
});

/***/ }),

/***/ "../../libs/shared/components/src/lib/tooltip/useTooltip.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTooltip: () => (/* binding */ useTooltip)
/* harmony export */ });
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@floating-ui/react/dist/floating-ui.react.mjs");
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs");
/* harmony import */ var _floating_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function useTooltip(options = {}) {
  const {
    placement = 'top',
    open: controlledOpen,
    onOpenChange: setControlledOpen,
    positionElement,
    initialOpen = false
  } = options;
  const [uncontrolledOpen, setUncontrolledOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialOpen);
  const open = controlledOpen != null ? controlledOpen : uncontrolledOpen;
  const setOpen = typeof controlledOpen !== 'undefined' && setControlledOpen ? setControlledOpen : setUncontrolledOpen;
  const floatingData = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_1__.useFloating)({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: _floating_ui_react__WEBPACK_IMPORTED_MODULE_2__.autoUpdate,
    middleware: [(0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_3__.offset)(5), (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_3__.flip)({
      crossAxis: placement.includes('-'),
      fallbackAxisSideDirection: 'start',
      padding: 5
    }), (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_3__.shift)({
      padding: 5
    })]
  });
  const {
    isMounted,
    styles: transitionStyles
  } = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_1__.useTransitionStyles)(floatingData.context, {
    duration: {
      open: 200,
      close: 200
    },
    initial: {
      opacity: 0.2,
      transform: 'translateY(8px)'
    }
  });
  const hover = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_1__.useHover)(floatingData.context, {
    move: false,
    enabled: typeof controlledOpen === 'undefined',
    handleClose: (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_1__.safePolygon)(),
    delay: {
      open: 250,
      close: 0
    }
  });
  const focus = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_1__.useFocus)(floatingData.context, {
    enabled: typeof controlledOpen === 'undefined'
  });
  const dismiss = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_1__.useDismiss)(floatingData.context);
  const role = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_1__.useRole)(floatingData.context, {
    role: 'tooltip'
  });
  const interactions = (0,_floating_ui_react__WEBPACK_IMPORTED_MODULE_1__.useInteractions)([hover, focus, dismiss, role]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    if (positionElement) {
      floatingData.context.refs.setReference(positionElement);
    }
  }, [positionElement, floatingData.context.refs]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => Object.assign({
    open: isMounted,
    setOpen,
    transitionStyles
  }, floatingData, interactions), [isMounted, setOpen, transitionStyles, interactions, floatingData]);
}

/***/ }),

/***/ "../../@calendly/i18n/src/i18n.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I18n: () => (/* binding */ I18n)
/* harmony export */ });
/* harmony import */ var i18n_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/i18n-js/dist/import/index.js");

const i18n = new i18n_js__WEBPACK_IMPORTED_MODULE_0__.I18n({}, {
  enableFallback: true
});
const I18n = Object.seal({
  t: (...args) => {
    if (Object.keys(i18n.translations).length === 0) {
      throw new Error('I18n.t cannot be called before the translations are loaded');
    }
    return i18n.t(...args);
  },
  get locale() {
    return i18n.locale;
  },
  set locale(newLocale) {
    i18n.locale = newLocale;
  },
  get translations() {
    return i18n.translations;
  },
  reset: () => {
    i18n.locale = 'en';
    i18n.translations = {};
  },
  addTranslations: translations => {
    i18n.store(translations);
  },
  set failOnMissing(value) {
    i18n.missingBehavior = value ? 'error' : 'message';
  }
});

/***/ }),

/***/ "../../@calendly/i18n/src/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I18n: () => (/* reexport safe */ _i18n__WEBPACK_IMPORTED_MODULE_0__.I18n),
/* harmony export */   Locales: () => (/* reexport safe */ _locales__WEBPACK_IMPORTED_MODULE_1__.Locales)
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/i18n/src/i18n.js");
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/i18n/src/locales.js");



/***/ }),

/***/ "../../@calendly/i18n/src/locales.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Locales: () => (/* binding */ Locales)
/* harmony export */ });
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/i18n/src/i18n.js");

class Locales {
  constructor(loadables) {
    this.loadables = loadables;
  }
  async load(...locales) {
    const translationModules = await Promise.all(locales.flat().map(locale => this.loadables[locale]()));
    translationModules.map(module => module.default).forEach(_i18n__WEBPACK_IMPORTED_MODULE_0__.I18n.addTranslations);
  }
}

/***/ }),

/***/ "../../@calendly/ui/dist/components/button/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _calendly_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/i18n/src/index.js");
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/loader/index.js");
/* harmony import */ var _component_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/components/component-group/index.js");
/* harmony import */ var _utils_with_as__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../@calendly/ui/dist/utils/with-as.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../@calendly/ui/dist/components/button/styles.js");

const _excluded = ["size", "decoration", "loading", "wide", "responsive", "disabled", "children", "onClick"];







const ButtonComponent = (_ref, forwardedRef) => {
  let {
      size = 'normal',
      decoration = 'primary',
      loading = false,
      wide = false,
      responsive = true,
      disabled = false,
      children,
      onClick
    } = _ref,
    nativeProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const wrappedOnClick = event => {
    if (loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };
  const groupChildPosition = (0,_component_group__WEBPACK_IMPORTED_MODULE_5__.useComponentGroupChild)();
  const ariaProps = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    const props = {};
    if (loading) {
      props['aria-label'] = _calendly_i18n__WEBPACK_IMPORTED_MODULE_3__.I18n.t('ui.shared.loading');
    }
    return props;
  }, [loading]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_styles__WEBPACK_IMPORTED_MODULE_7__.Container, Object.assign({
    size: size,
    decoration: decoration,
    loading: loading,
    wide: wide,
    disabled: disabled,
    responsive: responsive,
    ref: forwardedRef,
    onClick: wrappedOnClick,
    position: groupChildPosition
  }, ariaProps, nativeProps, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styles__WEBPACK_IMPORTED_MODULE_7__.TextContainer, {
      loading: loading,
      size: size,
      children: children
    }), loading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styles__WEBPACK_IMPORTED_MODULE_7__.LoaderContainer, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_loader__WEBPACK_IMPORTED_MODULE_4__.Loader, {
        inheritColor: true,
        size: "small"
      })
    })]
  }));
};
const ButtonWithForwardRef = (0,_utils_with_as__WEBPACK_IMPORTED_MODULE_6__.forwardRefWithAs)(ButtonComponent);
const Button = ButtonWithForwardRef;

/***/ }),

/***/ "../../@calendly/ui/dist/components/button/styles.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ButtonInterpolation: () => (/* binding */ ButtonInterpolation),
/* harmony export */   Container: () => (/* binding */ Container),
/* harmony export */   LoaderContainer: () => (/* binding */ LoaderContainer),
/* harmony export */   TextContainer: () => (/* binding */ TextContainer)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_use_device_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/hooks/use-device-type.js");
/* harmony import */ var _bare_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _internal_box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../@calendly/ui/dist/components/internal/box/index.js");

const _excluded = ["size", "loading"],
  _excluded2 = ["decoration", "size", "wide", "responsive", "loading", "disabled", "position"];






const textContainerLoading = "t51dkbc";
const textContainerSizeSmall = "t12jut3k";
const textContainerNormalOrLarge = "t1jxavl2";
const textContainerBase = "t8r7t19";
const TextContainer = _ref => {
  let {
      size,
      loading
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", Object.assign({}, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(textContainerBase, {
      [textContainerLoading]: loading,
      [textContainerSizeSmall]: size === 'small',
      [textContainerNormalOrLarge]: size !== 'small'
    })
  }));
};
const loaderContainerBase = "l19udwt5";
const LoaderContainer = props => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", Object.assign({}, props, {
  className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(loaderContainerBase, props.className)
}));
const sizeLarge = "sc9vwbu";
const sizeSmall = "s1965r9f";
const wide = "w1we4faw";
const responsive = "rqtwwof";
const positionFirst = "piu5ni1";
const positionMiddle = "penk5k9";
const positionLast = "p1tric1p";
const decorationPrimary = "dbklynj";
const decorationDanger = "d1ndfggk";
const decorationOutline = "dxnej47";
const decorationSecondaryOutline = "d1pw6naf";
const decorationSecondaryDanger = "dp6bdp0";
const decorationGhost = "d12tmxno";
const decorationMeetingIntelligence = "dd5kvvc";
const loading = "l1xjxnjn";
const base = "bfzlk3q";
const Container = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((_ref2, ref) => {
  let {
      decoration,
      size,
      wide: wideProp,
      responsive: responsiveProp,
      loading: loadingProp,
      disabled,
      position
    } = _ref2,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded2);
  const isPhone = (0,_hooks_use_device_type__WEBPACK_IMPORTED_MODULE_4__.useDeviceType)('isPhone');
  const [spacingProps, buttonProps] = (0,_internal_box__WEBPACK_IMPORTED_MODULE_6__.extractSpacingProps)(props);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_internal_box__WEBPACK_IMPORTED_MODULE_6__.Box, Object.assign({}, spacingProps, {
    asChild: true,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_bare_button__WEBPACK_IMPORTED_MODULE_5__.BareButton, Object.assign({
      disabled: disabled
    }, buttonProps, {
      ref: ref,
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(base, {
        [decorationPrimary]: decoration === 'primary',
        [decorationDanger]: decoration === 'danger',
        [decorationOutline]: decoration === 'outline',
        [decorationSecondaryOutline]: decoration === 'secondary-outline',
        [decorationSecondaryDanger]: decoration === 'secondary-danger',
        [decorationGhost]: decoration === 'ghost',
        [decorationMeetingIntelligence]: decoration === 'meeting-intelligence',
        [sizeLarge]: size === 'large',
        [sizeSmall]: size === 'small',
        [wide]: wideProp,
        [responsive]: responsiveProp && isPhone,
        [loading]: loadingProp,
        [positionFirst]: position === 'first',
        [positionMiddle]: position === 'middle',
        [positionLast]: position === 'last'
      }, props.className)
    }))
  }));
});
const ButtonInterpolation = base;
__webpack_require__("../../@calendly/ui/dist/components/button/styles.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/button/styles.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/component-group/component-group.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentGroup: () => (/* binding */ ComponentGroup)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/component-group/context.js");



const ComponentGroup = ({
  children
}) => {
  const [participants, setParticipants] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const register = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(participant => {
    setParticipants(oldParticipants => {
      if (oldParticipants.includes(participant)) return oldParticipants;
      return oldParticipants.concat(participant);
    });
  }, []);
  const unregister = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(participant => {
    setParticipants(oldParticipants => {
      if (!oldParticipants.includes(participant)) return oldParticipants;
      return oldParticipants.filter(p => p !== participant);
    });
  }, []);
  const getPosition = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(participant => {
    const index = participants.indexOf(participant);
    if (index === -1) return undefined;
    if (index === 0) return 'first';
    if (index === participants.length - 1) return 'last';
    return 'middle';
  }, [participants]);
  const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    register,
    unregister,
    getPosition
  }), [getPosition, register, unregister]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_context__WEBPACK_IMPORTED_MODULE_2__.Provider, {
    value: contextValue,
    children: children
  });
};

/***/ }),

/***/ "../../@calendly/ui/dist/components/component-group/context.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Provider: () => (/* binding */ Provider),
/* harmony export */   ResetComponentGroup: () => (/* binding */ ResetComponentGroup),
/* harmony export */   useGroupContext: () => (/* binding */ useGroupContext)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const defaultValue = {
  register: () => {},
  unregister: () => {},
  getPosition: () => undefined
};
const Context = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(defaultValue);
const {
  Provider
} = Context;
const useGroupContext = () => (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Context);
const ResetComponentGroup = ({
  children
}) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Provider, {
  value: defaultValue,
  children: children
});

/***/ }),

/***/ "../../@calendly/ui/dist/components/component-group/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentGroup: () => (/* reexport safe */ _component_group__WEBPACK_IMPORTED_MODULE_0__.ComponentGroup),
/* harmony export */   ResetComponentGroup: () => (/* reexport safe */ _context__WEBPACK_IMPORTED_MODULE_2__.ResetComponentGroup),
/* harmony export */   useComponentGroupChild: () => (/* reexport safe */ _use_component_group_child__WEBPACK_IMPORTED_MODULE_1__.useComponentGroupChild)
/* harmony export */ });
/* harmony import */ var _component_group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/component-group/component-group.js");
/* harmony import */ var _use_component_group_child__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/component-group/use-component-group-child.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/component-group/context.js");




/***/ }),

/***/ "../../@calendly/ui/dist/components/component-group/use-component-group-child.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useComponentGroupChild: () => (/* binding */ useComponentGroupChild)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_generate_id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/utils/generate-id.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/component-group/context.js");



const useComponentGroupChild = () => {
  const id = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)((0,_utils_generate_id__WEBPACK_IMPORTED_MODULE_1__.generateId)()).current;
  const {
    register,
    unregister,
    getPosition
  } = (0,_context__WEBPACK_IMPORTED_MODULE_2__.useGroupContext)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(() => {
    register(id);
    return () => unregister(id);
  }, [id, register, unregister]);
  return getPosition(id);
};

/***/ }),

/***/ "../../@calendly/ui/dist/components/dropdown/context.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Provider: () => (/* binding */ Provider),
/* harmony export */   useDropdownContext: () => (/* binding */ useDropdownContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const noop = () => {};
const DropdownContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  close: noop
});
const useDropdownContext = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(DropdownContext);
const {
  Provider
} = DropdownContext;

/***/ }),

/***/ "../../@calendly/ui/dist/components/dropdown/dropdown-button.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DropdownButton: () => (/* binding */ DropdownButton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/icons/index.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/elements.js");
/* harmony import */ var _use_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/use-dropdown.js");





const DropdownButton = ({
  label,
  disabled: _disabled = false,
  children
}) => {
  const [toggle, Dropdown, isOpen, {
    dropdownId
  }] = (0,_use_dropdown__WEBPACK_IMPORTED_MODULE_4__.useDropdown)(false, true);
  const handleToggle = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(event => {
    if (!_disabled) {
      if (typeof toggle === 'function') {
        toggle(event);
      }
    }
  }, [_disabled, toggle]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_elements__WEBPACK_IMPORTED_MODULE_3__.DropdownButtonTrigger, {
      "aria-label": label,
      "aria-expanded": _disabled ? undefined : isOpen,
      "aria-controls": _disabled ? undefined : dropdownId,
      onClick: handleToggle,
      disabled: _disabled,
      isOpen: isOpen,
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements__WEBPACK_IMPORTED_MODULE_3__.TextContainer, {
        children: label
      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements__WEBPACK_IMPORTED_MODULE_3__.IconContainer, {
        children: isOpen ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_2__.ArrowChevronUpMiniIcon, {}) : (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_2__.ArrowChevronDownMiniIcon, {})
      })]
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Dropdown, {
      children: children
    })]
  });
};

/***/ }),

/***/ "../../@calendly/ui/dist/components/dropdown/elements.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DropdownButtonTrigger: () => (/* binding */ DropdownButtonTrigger),
/* harmony export */   DropdownButtonTriggerComponent: () => (/* binding */ DropdownButtonTriggerComponent),
/* harmony export */   IconContainer: () => (/* binding */ IconContainer),
/* harmony export */   TextContainer: () => (/* binding */ TextContainer)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bare_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");

const _excluded = ["disabled", "isOpen"];




const TextContainer = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_4__.styled)('div')({
  name: "TextContainer",
  class: "t17sudev",
  propsAsIs: false
});
const IconContainer = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_4__.styled)('div')({
  name: "IconContainer",
  class: "i16nb6ry",
  propsAsIs: false
});
const _exp = /*#__PURE__*/() => _bare_button__WEBPACK_IMPORTED_MODULE_3__.BareButton;
const DropdownButtonTriggerComponent = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_4__.styled)(_exp())({
  name: "DropdownButtonTriggerComponent",
  class: "d1eblj1w",
  propsAsIs: true
});
const disabledCss = "d1vhmu9a";
const isOpenCss = "i1fjjto9";
const DropdownButtonTrigger = _ref => {
  let {
      disabled,
      isOpen
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(DropdownButtonTriggerComponent, Object.assign({}, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
      [disabledCss]: disabled,
      [isOpenCss]: isOpen
    }, props.className)
  }));
};
__webpack_require__("../../@calendly/ui/dist/components/dropdown/elements.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/dropdown/elements.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/dropdown/filter-select-or-clear.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilterSelectOrClear: () => (/* binding */ FilterSelectOrClear)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/icons/index.js");
/* harmony import */ var _minimal_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/minimal-button/index.js");




const Container = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_3__.styled)('div')({
  name: "Container",
  class: "c1pxmmyb",
  propsAsIs: false
});
const FilterSelectOrClear = ({
  onSelectAll,
  onClear
}) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Container, {
  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_minimal_button__WEBPACK_IMPORTED_MODULE_2__.MinimalButton, {
    fontSize: "small",
    onClick: onSelectAll,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_1__.CheckSquareIcon, {}), "select all"]
  }), "/", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_minimal_button__WEBPACK_IMPORTED_MODULE_2__.MinimalButton, {
    fontSize: "small",
    onClick: onClear,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_1__.CloseCircleIcon, {}), "clear"]
  })]
});
__webpack_require__("../../@calendly/ui/dist/components/dropdown/filter-select-or-clear.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/dropdown/filter-select-or-clear.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/dropdown/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DropdownButton: () => (/* reexport safe */ _dropdown_button__WEBPACK_IMPORTED_MODULE_2__.DropdownButton),
/* harmony export */   FilterSelectOrClear: () => (/* reexport safe */ _filter_select_or_clear__WEBPACK_IMPORTED_MODULE_3__.FilterSelectOrClear),
/* harmony export */   useClose: () => (/* reexport safe */ _use_close__WEBPACK_IMPORTED_MODULE_1__.useClose),
/* harmony export */   useDropdown: () => (/* reexport safe */ _use_dropdown__WEBPACK_IMPORTED_MODULE_0__.useDropdown)
/* harmony export */ });
/* harmony import */ var _use_dropdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/use-dropdown.js");
/* harmony import */ var _use_close__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/use-close.js");
/* harmony import */ var _dropdown_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/dropdown-button.js");
/* harmony import */ var _filter_select_or_clear__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/filter-select-or-clear.js");





/***/ }),

/***/ "../../@calendly/ui/dist/components/dropdown/use-close.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useClose: () => (/* binding */ useClose)
/* harmony export */ });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/context.js");

const useClose = () => (0,_context__WEBPACK_IMPORTED_MODULE_0__.useDropdownContext)().close;


/***/ }),

/***/ "../../@calendly/ui/dist/components/dropdown/use-dropdown.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDropdown: () => (/* binding */ useDropdown)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_use_close_on_escape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/hooks/use-close-on-escape.js");
/* harmony import */ var _utils_generate_id__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/utils/generate-id.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/context.js");





const useDropdown = (isOpenByDefault = false, injectId = false) => {
  const [isOpen, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(isOpenByDefault);
  const actionRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const controlRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const timeoutRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const initiatorRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const dropdownId = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(`dropdown-${(0,_utils_generate_id__WEBPACK_IMPORTED_MODULE_3__.generateId)()}`).current;
  const open = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    if (document.activeElement instanceof HTMLElement) {
      initiatorRef.current = document.activeElement;
    }
    setOpen(true);
  }, []);
  const close = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(({
    restoreFocus: _restoreFocus = true
  } = {}) => {
    if (_restoreFocus && initiatorRef.current) {
      initiatorRef.current.focus();
      initiatorRef.current = undefined;
    }
    setOpen(false);
  }, []);
  (0,_hooks_use_close_on_escape__WEBPACK_IMPORTED_MODULE_2__.useCloseOnEscape)({
    isOpen,
    onClose: close
  });
  const captureListener = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(event => {
    var _dropdownRef$current, _controlRef$current;
    if (event.target instanceof Node && ((_dropdownRef$current = dropdownRef.current) != null && _dropdownRef$current.contains(event.target) || (_controlRef$current = controlRef.current) != null && _controlRef$current.contains(event.target))) return;
    actionRef.current = () => close({
      restoreFocus: false
    });
    timeoutRef.current = setTimeout(() => {
      if (actionRef.current) {
        actionRef.current();
        actionRef.current = undefined;
      }
    }, 0);
  }, [close]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (isOpen) {
      document.addEventListener('click', captureListener, true);
    }
    return () => {
      document.removeEventListener('click', captureListener, true);
    };
  }, [captureListener, close, isOpen]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);
  const onControlClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(event => {
    if (isOpen) {
      close();
    } else {
      if (event) {
        controlRef.current = event.currentTarget;
      }
      open();
    }
  }, [close, isOpen, open]);
  const preventClose = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    actionRef.current = undefined;
  }, []);
  const idInjection = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => injectId ? {
    id: dropdownId
  } : {}, [dropdownId, injectId]);
  const mapChildren = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(children => react__WEBPACK_IMPORTED_MODULE_1__.Children.map(children, child => /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.cloneElement)(child, Object.assign({
    onClickCapture: preventClose
  }, idInjection))), [preventClose, idInjection]);
  const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    close
  }), [close]);
  const ContentWrapper = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(({
    children
  }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_context__WEBPACK_IMPORTED_MODULE_4__.Provider, {
    value: contextValue,
    children: isOpen && mapChildren(children)
  }), [isOpen, mapChildren, contextValue]);
  return [onControlClick, ContentWrapper, isOpen, {
    dropdownId,
    dropdownRef
  }];
};

/***/ }),

/***/ "../../@calendly/ui/dist/components/fixed-container/fixed-container.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FixedContainer: () => (/* binding */ FixedContainer)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react-dom/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);

const _excluded = ["fixedWhen", "root", "children"];





const positionFixed = "p1tv9ylb";
const Container = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_5__.styled)('div')({
  name: "Container",
  class: "c15t6nfm",
  propsAsIs: false
});
const FixedContainer = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((_ref, ref) => {
  let {
      fixedWhen = true,
      root,
      children
    } = _ref,
    restProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  if (!fixedWhen) {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Container, Object.assign({
      ref: ref
    }, restProps, {
      children: children
    }));
  }
  return /*#__PURE__*/(0,react_dom__WEBPACK_IMPORTED_MODULE_3__.createPortal)((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Container, Object.assign({
    ref: ref
  }, restProps, {
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(positionFixed, restProps.className),
    children: children
  })), root || document.body);
});
__webpack_require__("../../@calendly/ui/dist/components/fixed-container/fixed-container.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/fixed-container/fixed-container.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/fixed-container/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FixedContainer: () => (/* reexport safe */ _fixed_container__WEBPACK_IMPORTED_MODULE_0__.FixedContainer)
/* harmony export */ });
/* harmony import */ var _fixed_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/fixed-container/fixed-container.js");


/***/ }),

/***/ "../../@calendly/ui/dist/components/form/inputs/text-input/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextInput: () => (/* reexport safe */ _text_input__WEBPACK_IMPORTED_MODULE_0__.TextInput)
/* harmony export */ });
/* harmony import */ var _text_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/form/inputs/text-input/text-input.js");


/***/ }),

/***/ "../../@calendly/ui/dist/components/form/inputs/text-input/text-input.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextInput: () => (/* binding */ TextInput)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _component_group__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/component-group/index.js");
/* harmony import */ var _utils_with_as__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/utils/with-as.js");
/* harmony import */ var _internal_box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../@calendly/ui/dist/components/internal/box/index.js");

const _excluded = ["as", "type", "centered", "className", "position", "size"],
  _excluded2 = ["className"];






const inputPositionFirst = "i1leuzs7";
const inputPositionMiddle = "imzneuk";
const inputPositionLast = "i1v5qty1";
const inputKindTextarea = "i1q5f6dw";
const inputKindNumber = "ixtssxy";
const inputInvalid = "ir570yb";
const inputCentered = "i11rvx60";
const inputSizeStandard = "i1iohect";
const inputSizeSmall = "i1spvbg1";
const inputBase = "i1akqobm";
const BaseComponent = (_ref, ref) => {
  let {
      as,
      type = 'text',
      centered,
      className,
      position,
      size = 'standard'
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const AsComponent = as || (type === 'textarea' ? 'textarea' : 'input');
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(AsComponent, Object.assign({
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(inputBase, {
      [inputPositionFirst]: position === 'first',
      [inputPositionMiddle]: position === 'middle',
      [inputPositionLast]: position === 'last',
      [inputKindTextarea]: type === 'textarea',
      [inputKindNumber]: type === 'number',
      [inputInvalid]: props['aria-invalid'],
      [inputCentered]: centered,
      [inputSizeSmall]: size === 'small',
      [inputSizeStandard]: size === 'standard'
    }, className),
    type: type
  }, props, {
    ref: ref
  }));
};
const Component = (0,_utils_with_as__WEBPACK_IMPORTED_MODULE_5__.forwardRefWithAs)(BaseComponent);
const TextInput = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)((_ref2, forwardedRef) => {
  let {
      className
    } = _ref2,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded2);
  const position = (0,_component_group__WEBPACK_IMPORTED_MODULE_4__.useComponentGroupChild)();
  const [spacingProps, inputProps] = (0,_internal_box__WEBPACK_IMPORTED_MODULE_6__.extractSpacingProps)(props);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_internal_box__WEBPACK_IMPORTED_MODULE_6__.Box, Object.assign({
    className: className
  }, spacingProps, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Component, Object.assign({
      ref: forwardedRef
    }, inputProps, {
      position: position
    }))
  }));
});
__webpack_require__("../../@calendly/ui/dist/components/form/inputs/text-input/text-input.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/form/inputs/text-input/text-input.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/form/parts/field-error.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldError: () => (/* binding */ FieldError)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _visually_hidden__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/visually-hidden/index.js");

const _excluded = ["isColorSafe"],
  _excluded2 = ["text", "safeColorsRequired", "className"];


// import { I18n } from '@calendly/i18n';


const containerColorSafe = "c1cfm7ww";
const containerBase = "ca3aala";
const Container = _ref => {
  let {
      isColorSafe
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", Object.assign({
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(containerBase, isColorSafe && containerColorSafe)
  }, props));
};
const formatText = text => `${text[0].toUpperCase()}${text.slice(1)}`;
const normalizeText = text => {
  if (!text) return null;
  if (typeof text === 'string') {
    return formatText(text);
  }
  return text;
};
const FieldError = _ref2 => {
  let {
      text,
      safeColorsRequired = false
    } = _ref2,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded2);
  const normalizedText = normalizeText(text);
  if (!normalizedText) return null;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Container, Object.assign({}, props, {
    isColorSafe: safeColorsRequired,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_visually_hidden__WEBPACK_IMPORTED_MODULE_3__.VisuallyHidden, {
      children: 'Error: '
    }), normalizedText]
  }));
};
__webpack_require__("../../@calendly/ui/dist/components/form/parts/field-error.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/form/parts/field-error.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/form/parts/field-label.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldLabel: () => (/* binding */ FieldLabel)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var _utils_no_css_overrides__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/utils/no-css-overrides.js");
/* harmony import */ var _pro_tip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/pro-tip/index.js");

const _excluded = ["text", "isRequired", "proTip"];




const Container = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_4__.styled)('div')({
  name: "Container",
  class: "cp8qicy",
  propsAsIs: false
});
const Label = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_4__.styled)('label')({
  name: "Label",
  class: "l1mqx4eq",
  propsAsIs: false
});
const FieldLabel = (0,_utils_no_css_overrides__WEBPACK_IMPORTED_MODULE_2__.withNoCssOverrides)(_ref => {
  let {
      text = null,
      isRequired = false,
      proTip = null
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  if (!text) return null;
  const suffix = isRequired ? ' *' : '';
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Container, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Label, Object.assign({}, props, {
      children: [text, suffix]
    })), proTip && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_pro_tip__WEBPACK_IMPORTED_MODULE_3__.ProTip, {
      size: "small",
      children: proTip
    })]
  });
});
__webpack_require__("../../@calendly/ui/dist/components/form/parts/field-label.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/form/parts/field-label.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/form/parts/fieldset.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fieldset: () => (/* binding */ Fieldset)
/* harmony export */ });
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");

const Fieldset = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_0__.styled)('fieldset')({
  name: "Fieldset",
  class: "f91s883",
  propsAsIs: false
});
__webpack_require__("../../@calendly/ui/dist/components/form/parts/fieldset.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/form/parts/fieldset.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/form/parts/generate-id.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useErrorId: () => (/* binding */ useErrorId),
/* harmony export */   useInputId: () => (/* binding */ useInputId),
/* harmony export */   useLabelId: () => (/* binding */ useLabelId)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/nanoid/index.browser.js");


const useUniqueId = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)((0,nanoid__WEBPACK_IMPORTED_MODULE_1__.nanoid)()).current;
const useInputId = ({
  id
} = {}) => {
  const uniqueId = useUniqueId();
  return id || uniqueId;
};
const useLabelId = ({
  id,
  label
}) => {
  const uniqueId = useUniqueId();
  return label ? id || uniqueId : undefined;
};
const useErrorId = ({
  error
}) => {
  const uniqueId = useUniqueId();
  return error ? uniqueId : undefined;
};

/***/ }),

/***/ "../../@calendly/ui/dist/components/form/parts/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldError: () => (/* reexport safe */ _field_error__WEBPACK_IMPORTED_MODULE_0__.FieldError),
/* harmony export */   FieldLabel: () => (/* reexport safe */ _field_label__WEBPACK_IMPORTED_MODULE_1__.FieldLabel),
/* harmony export */   Fieldset: () => (/* reexport safe */ _fieldset__WEBPACK_IMPORTED_MODULE_2__.Fieldset),
/* harmony export */   useErrorId: () => (/* reexport safe */ _generate_id__WEBPACK_IMPORTED_MODULE_3__.useErrorId),
/* harmony export */   useInputId: () => (/* reexport safe */ _generate_id__WEBPACK_IMPORTED_MODULE_3__.useInputId),
/* harmony export */   useLabelId: () => (/* reexport safe */ _generate_id__WEBPACK_IMPORTED_MODULE_3__.useLabelId)
/* harmony export */ });
/* harmony import */ var _field_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/form/parts/field-error.js");
/* harmony import */ var _field_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/form/parts/field-label.js");
/* harmony import */ var _fieldset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/form/parts/fieldset.js");
/* harmony import */ var _generate_id__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/form/parts/generate-id.js");





/***/ }),

/***/ "../../@calendly/ui/dist/components/form/text-field.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextField: () => (/* binding */ TextField)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _inputs_text_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/form/inputs/text-input/index.js");
/* harmony import */ var _parts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/form/parts/index.js");

const _excluded = ["className", "error", "label", "proTip", "size"];




const TextField = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((_ref, forwardedRef) => {
  let {
      className,
      error,
      label,
      proTip,
      size = 'standard'
    } = _ref,
    inputProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const {
    id
  } = inputProps;
  const inputId = (0,_parts__WEBPACK_IMPORTED_MODULE_4__.useInputId)({
    id
  });
  const errorId = (0,_parts__WEBPACK_IMPORTED_MODULE_4__.useErrorId)({
    error
  });
  const {
    required
  } = inputProps;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: className,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_parts__WEBPACK_IMPORTED_MODULE_4__.FieldLabel, {
      text: label,
      proTip: proTip,
      isRequired: required,
      htmlFor: inputId
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_inputs_text_input__WEBPACK_IMPORTED_MODULE_3__.TextInput, Object.assign({
      maxLength: inputProps.type === 'textarea' ? 10000 : 255,
      autoComplete: "off",
      size: size
    }, inputProps, {
      id: inputId,
      ref: forwardedRef,
      autoCorrect: "off",
      "aria-invalid": Boolean(error),
      "aria-describedby": errorId
    })), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_parts__WEBPACK_IMPORTED_MODULE_4__.FieldError, {
      text: error,
      id: errorId
    })]
  });
});

/***/ }),

/***/ "../../@calendly/ui/dist/components/icon-button/icon-button.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconButton: () => (/* binding */ IconButton)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/icon-button/styles.js");

const _excluded = ["title", "size", "children"];



const IconButton = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((_ref, forwardedRef) => {
  let {
      title,
      size = 'normal',
      children
    } = _ref,
    restProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styles__WEBPACK_IMPORTED_MODULE_3__.Container, Object.assign({}, restProps, {
    size: size,
    tooltip: title,
    ref: forwardedRef,
    children: children
  }));
});

/***/ }),

/***/ "../../@calendly/ui/dist/components/icon-button/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconButton: () => (/* reexport safe */ _icon_button__WEBPACK_IMPORTED_MODULE_0__.IconButton)
/* harmony export */ });
/* harmony import */ var _icon_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/icon-button/icon-button.js");


/***/ }),

/***/ "../../@calendly/ui/dist/components/icon-button/styles.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Container: () => (/* binding */ Container)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _bare_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _internal_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/components/internal/box/index.js");

const _excluded = ["size"];





const sizeSmall = "squ495l";
const base = "b14cut1e";
const Container = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((props, ref) => {
  const {
      size
    } = props,
    rest = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);
  const [spacingProps, buttonProps] = (0,_internal_box__WEBPACK_IMPORTED_MODULE_5__.extractSpacingProps)(rest);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_internal_box__WEBPACK_IMPORTED_MODULE_5__.Box, Object.assign({}, spacingProps, {
    asChild: true,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_bare_button__WEBPACK_IMPORTED_MODULE_4__.BareButton, Object.assign({}, buttonProps, {
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(base, {
        [sizeSmall]: size === 'small'
      }, props.className),
      ref: ref
    }))
  }));
});
__webpack_require__("../../@calendly/ui/dist/components/icon-button/styles.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/icon-button/styles.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/inline-search/elements.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClearButton: () => (/* binding */ ClearButton),
/* harmony export */   Container: () => (/* binding */ Container),
/* harmony export */   InnerInput: () => (/* binding */ InnerInput),
/* harmony export */   LeadingIcon: () => (/* binding */ LeadingIcon)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectDestructuringEmpty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty.js");
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/components/icons/index.js");
/* harmony import */ var _bare_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");


const _excluded = ["variant"];






const Container = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_7__.styled)('div')({
  name: "Container",
  class: "c1rpk3l",
  propsAsIs: false
});
const searchIconBase = "s1hhahju";
const LeadingIcon = () => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
  className: searchIconBase,
  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_5__.SearchIcon, {})
});
const innerInputVariantDefault = "iwt4bmh";
const innerInputVariantUnderline = "isiizy7";
const innerInputVariantMinimal = "i14mgsrr";
const innerInputBase = "ifkizlz";
const InnerInput = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)((_ref, ref) => {
  let {
      variant
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", Object.assign({
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(innerInputBase, {
      [innerInputVariantDefault]: variant === 'default',
      [innerInputVariantUnderline]: variant === 'underline',
      [innerInputVariantMinimal]: variant === 'minimal'
    }),
    inputMode: "search"
  }, props, {
    ref: ref
  }));
});
const clearButtonBase = "c1qn0dod";
const ClearButton = _ref2 => {
  let props = Object.assign({}, ((0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectDestructuringEmpty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2), _ref2));
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_bare_button__WEBPACK_IMPORTED_MODULE_6__.BareButton, Object.assign({}, props, {
    "data-testid": "clear-button",
    className: clearButtonBase,
    tabIndex: -1,
    "aria-hidden": true,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_5__.CloseCircleIcon, {})
  }));
};
__webpack_require__("../../@calendly/ui/dist/components/inline-search/elements.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/inline-search/elements.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/inline-search/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InlineSearch: () => (/* reexport safe */ _inline_search__WEBPACK_IMPORTED_MODULE_0__.InlineSearch)
/* harmony export */ });
/* harmony import */ var _inline_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/inline-search/inline-search.js");


/***/ }),

/***/ "../../@calendly/ui/dist/components/inline-search/inline-search.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InlineSearch: () => (/* binding */ InlineSearch)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _calendly_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/i18n/src/index.js");
/* harmony import */ var _utils_merge_refs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/utils/merge-refs.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/components/inline-search/elements.js");

const _excluded = ["className", "value", "onChange", "disabled", "placeholder", "variant"];





const InlineSearch = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((_ref, ref) => {
  let {
      className,
      value,
      onChange,
      disabled = false,
      placeholder,
      variant = 'default'
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const handleChange = event => {
    onChange(event.target.value);
  };
  const handleClear = () => {
    var _inputRef$current;
    onChange('');
    (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
  };
  const handleKeyDown = event => {
    if (disabled) return;
    if (event.key === 'Escape') {
      onChange('');
      event.stopPropagation();
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_elements__WEBPACK_IMPORTED_MODULE_5__.Container, {
    className: className,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_elements__WEBPACK_IMPORTED_MODULE_5__.LeadingIcon, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_elements__WEBPACK_IMPORTED_MODULE_5__.InnerInput, Object.assign({}, props, {
      ref: (0,_utils_merge_refs__WEBPACK_IMPORTED_MODULE_4__.mergeRefs)(inputRef, ref),
      disabled: disabled,
      value: value,
      placeholder: placeholder || _calendly_i18n__WEBPACK_IMPORTED_MODULE_3__.I18n.t('ui.shared.search'),
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      variant: variant
    })), value && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_elements__WEBPACK_IMPORTED_MODULE_5__.ClearButton, {
      onClick: handleClear
    })]
  });
});

/***/ }),

/***/ "../../@calendly/ui/dist/components/internal/selectable-containers/hidden-input.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HiddenInput: () => (/* binding */ HiddenInput)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var _visually_hidden__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/visually-hidden/index.js");



const HiddenInputComponent = props => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_visually_hidden__WEBPACK_IMPORTED_MODULE_1__.VisuallyHidden, Object.assign({
  as: "input",
  type: "checkbox"
}, props));
const _exp = /*#__PURE__*/() => HiddenInputComponent;
const HiddenInput = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_2__.styled)(_exp())({
  name: "HiddenInput",
  class: "h1gvz7ay",
  propsAsIs: true
});
__webpack_require__("../../@calendly/ui/dist/components/internal/selectable-containers/hidden-input.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/internal/selectable-containers/hidden-input.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/internal/selectable-containers/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Checkbox: () => (/* reexport safe */ _variants__WEBPACK_IMPORTED_MODULE_0__.Checkbox),
/* harmony export */   Chip: () => (/* reexport safe */ _variants__WEBPACK_IMPORTED_MODULE_0__.Chip),
/* harmony export */   HiddenInput: () => (/* reexport safe */ _hidden_input__WEBPACK_IMPORTED_MODULE_1__.HiddenInput),
/* harmony export */   Selectable: () => (/* reexport safe */ _variants__WEBPACK_IMPORTED_MODULE_0__.Selectable)
/* harmony export */ });
/* harmony import */ var _variants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/internal/selectable-containers/variants/index.js");
/* harmony import */ var _hidden_input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/internal/selectable-containers/hidden-input.js");



/***/ }),

/***/ "../../@calendly/ui/dist/components/internal/selectable-containers/variants/checkbox.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Checkbox: () => (/* binding */ Checkbox)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);



const SvgComponent = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_2__.styled)('svg')({
  name: "SvgComponent",
  class: "sf4oyjo",
  propsAsIs: false
});
const bodyStandard = "b1iyvwko";
const bodySmall = "b1lto3vy";
const bodyChecked = "bkf30s3";
const bodyIndeterminate = "bz1j62y";
const bodyDisabled = "b1uxaw58";
const bodyBase = "b6sz5c2";
const Body = ({
  size,
  checked,
  indeterminate,
  disabled,
  children
}) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(bodyBase, {
    [bodyStandard]: size === 'standard',
    [bodySmall]: size === 'small',
    [bodyChecked]: checked && !indeterminate,
    [bodyIndeterminate]: indeterminate,
    [bodyDisabled]: disabled
  }),
  children: children
});
const svgDisplayBlock = "sv5ny76";
const Checkbox = ({
  size: _size = 'standard',
  children,
  checked,
  indeterminate,
  disabled
}) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Body, {
  size: _size,
  checked: checked,
  indeterminate: indeterminate,
  disabled: disabled,
  children: [children, checked && !indeterminate && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SvgComponent, {
    className: svgDisplayBlock,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: `M23.15,5.4l-2.8-2.8a.5.5,0,0,0-.7,0L7.85,14.4a.5.5,0,0,1-.7,0l
                  -2.8-2.8a.5.5,0,0,0-.7,0L.85,14.4a.5.5,0,0,0,0,.7l6.3,6.3a.5.5,0,
                  0,0,.7,0L23.15,6.1A.5.5,0,0,0,23.15,5.4Z`,
      fill: "currentColor"
    })
  }), indeterminate && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SvgComponent, {
    className: svgDisplayBlock,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
      y: "8.5",
      width: "24",
      height: "6",
      rx: "1.5",
      fill: "currentColor"
    })
  })]
});
__webpack_require__("../../@calendly/ui/dist/components/internal/selectable-containers/variants/checkbox.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/internal/selectable-containers/variants/checkbox.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/internal/selectable-containers/variants/chip.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Chip: () => (/* binding */ Chip)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");

const _excluded = ["checked", "disabled"];


const bodyCheckedCss = "bn6tdez";
const BodyComponent = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_2__.styled)('div')({
  name: "BodyComponent",
  class: "b1ufi77z",
  propsAsIs: false
});
const Body = _ref => {
  let {
      checked
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(BodyComponent, Object.assign({}, props, {
    className: checked ? bodyCheckedCss : ''
  }));
};
const checkmarkBase = "cj6sh97";
const CheckMark = () => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
  viewBox: "0 0 18 14",
  xmlns: "http://www.w3.org/2000/svg",
  className: checkmarkBase,
  children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
    d: "M6 11.17L1.83 7 .415 8.415 6 14 18 2 16.585.585 6 11.17z",
    fill: "currentColor"
  })
});
const Chip = ({
  label,
  disabled,
  children,
  checked
}) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Body, {
  checked: checked,
  disabled: disabled,
  children: [children, label, checked && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CheckMark, {})]
});
__webpack_require__("../../@calendly/ui/dist/components/internal/selectable-containers/variants/chip.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/internal/selectable-containers/variants/chip.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/internal/selectable-containers/variants/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Checkbox: () => (/* reexport safe */ _checkbox__WEBPACK_IMPORTED_MODULE_2__.Checkbox),
/* harmony export */   Chip: () => (/* reexport safe */ _chip__WEBPACK_IMPORTED_MODULE_0__.Chip),
/* harmony export */   Selectable: () => (/* reexport safe */ _selectable__WEBPACK_IMPORTED_MODULE_1__.Selectable)
/* harmony export */ });
/* harmony import */ var _chip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/internal/selectable-containers/variants/chip.js");
/* harmony import */ var _selectable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/internal/selectable-containers/variants/selectable.js");
/* harmony import */ var _checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/internal/selectable-containers/variants/checkbox.js");




/***/ }),

/***/ "../../@calendly/ui/dist/components/internal/selectable-containers/variants/selectable.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Selectable: () => (/* binding */ Selectable)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");

const _excluded = ["layout", "checked", "showControl", "disabled", "singleLine"];



const bodyCheckedCss = "bbtqm68";
const bodyLayoutHorizontal = "b1tw26sg";
const bodyLayoutVertical = "bqy9v38";
const bodyShowControl = "b1d9nwzl";
const bodyDisabled = "bzrfy5g";
const bodySingleLine = "b1v797ck";
const bodyBase = "bqg7bas";
const Body = _ref => {
  let {
      layout,
      checked,
      showControl,
      disabled,
      singleLine
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", Object.assign({}, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(bodyBase, {
      [bodyCheckedCss]: checked,
      [bodyLayoutHorizontal]: layout === 'horizontal',
      [bodyLayoutVertical]: layout === 'vertical',
      [bodyShowControl]: showControl,
      [bodyDisabled]: disabled,
      [bodySingleLine]: singleLine
    })
  }));
};
const ContentWrapper = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_3__.styled)('div')({
  name: "ContentWrapper",
  class: "c1vz9suj",
  propsAsIs: false
});
const Selectable = ({
  checked,
  disabled,
  control,
  children,
  label,
  layout,
  singleLine
}) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Body, {
  layout: layout,
  disabled: disabled,
  checked: checked,
  showControl: !!control,
  singleLine: singleLine,
  children: [control, children, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ContentWrapper, {
    children: label
  })]
});
__webpack_require__("../../@calendly/ui/dist/components/internal/selectable-containers/variants/selectable.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/internal/selectable-containers/variants/selectable.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/link/elements.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Container: () => (/* binding */ Container),
/* harmony export */   Spacer: () => (/* binding */ Spacer)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bare_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _utils_with_as__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/utils/with-as.js");
/* harmony import */ var _hooks_use_safe_colors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/hooks/use-safe-colors.js");

const _excluded = ["as", "variant", "underline"];





const spacerBase = "sjqhv85";
const Spacer = props => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", Object.assign({}, props, {
  className: spacerBase
}));
const disabledState = "d17bjcy6";
const underline = "u15p2i21";
const variantPrimary = "v1ubpq6g";
const variantSubtle = "vqai0dw";
const variantInverse = "ver5b93";
const primaryAccessibleColors = "pwjud0l";
const base = "bwl0s8";
const ContainerComponent = (props, ref) => {
  const {
      as = 'a',
      variant = 'primary',
      underline: underlineProp
    } = props,
    restProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);
  const safeColors = (0,_hooks_use_safe_colors__WEBPACK_IMPORTED_MODULE_5__.useSafeColors)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_bare_button__WEBPACK_IMPORTED_MODULE_3__.BareButton, Object.assign({
    as: as
  }, restProps, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(base, {
      [underline]: underlineProp,
      [variantPrimary]: variant === 'primary',
      [variantSubtle]: variant === 'subtle',
      [variantInverse]: variant === 'inverse',
      [disabledState]: restProps.disabled,
      [primaryAccessibleColors]: variant === 'primary' && safeColors
    }, props.className),
    ref: ref
  }));
};
const Container = (0,_utils_with_as__WEBPACK_IMPORTED_MODULE_4__.forwardRefWithAs)(ContainerComponent);
__webpack_require__("../../@calendly/ui/dist/components/link/elements.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/link/elements.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/link/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Link: () => (/* reexport safe */ _link__WEBPACK_IMPORTED_MODULE_0__.Link)
/* harmony export */ });
/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/link/link.js");


/***/ }),

/***/ "../../@calendly/ui/dist/components/link/link.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Link: () => (/* binding */ Link)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/link/elements.js");

const _excluded = ["children", "underline"];



const Link = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((_ref, forwardedRef) => {
  let {
      children,
      underline = true
    } = _ref,
    restProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const numberOfChildren = react__WEBPACK_IMPORTED_MODULE_2__.Children.count(children);
  const wrappedChildren = react__WEBPACK_IMPORTED_MODULE_2__.Children.map(children, (child, index) => {
    if (typeof child === 'string') {
      return child;
    }
    const elements = [];
    if (index !== 0) {
      elements.push((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_elements__WEBPACK_IMPORTED_MODULE_3__.Spacer, {}));
    }
    elements.push(child);
    if (index !== numberOfChildren - 1) {
      elements.push((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_elements__WEBPACK_IMPORTED_MODULE_3__.Spacer, {}));
    }
    return elements;
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_elements__WEBPACK_IMPORTED_MODULE_3__.Container, Object.assign({
    ref: forwardedRef
  }, restProps, {
    underline: underline,
    children: wrappedChildren
  }));
});

/***/ }),

/***/ "../../@calendly/ui/dist/components/loader/elements.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bouncer: () => (/* binding */ Bouncer),
/* harmony export */   Container: () => (/* binding */ Container)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);

const _excluded = ["size"],
  _excluded2 = ["size", "inline", "inheritColor"];


const bouncerSizeDefault = "b1ysqzqw";
const bouncerSizeSmall = "be79a5j";
const baseBouncer = "bbw1oog";
const Bouncer = _ref => {
  let {
      size
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", Object.assign({}, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(baseBouncer, {
      [bouncerSizeDefault]: size === 'default',
      [bouncerSizeSmall]: size === 'small'
    })
  }));
};
const baseContainer = "b1npgw33";
const sizeDefault = "s187wkzt";
const sizeSmall = "sdt33o0";
const inline = "i1a0kqap";
const inheritColor = "i1r6i7h2";
const Container = _ref2 => {
  let {
      size,
      inline: inlineProp,
      inheritColor: inheritColorProp
    } = _ref2,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded2);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", Object.assign({}, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(baseContainer, {
      [sizeDefault]: size === 'default',
      [sizeSmall]: size === 'small',
      [inline]: inlineProp,
      [inheritColor]: inheritColorProp
    })
  }));
};
__webpack_require__("../../@calendly/ui/dist/components/loader/elements.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/loader/elements.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/loader/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Loader: () => (/* binding */ Loader)
/* harmony export */ });
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/loader/loader.js");


const _exp = /*#__PURE__*/() => _loader__WEBPACK_IMPORTED_MODULE_0__.Loader;
const Loader = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_1__.styled)(_exp())({
  name: "Loader",
  class: "l15n0cex",
  propsAsIs: true
});
__webpack_require__("../../@calendly/ui/dist/components/loader/index.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/loader/index.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/loader/loader.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Loader: () => (/* binding */ Loader)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/loader/elements.js");


const Loader = props => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_elements__WEBPACK_IMPORTED_MODULE_1__.Container, Object.assign({}, props, {
  children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements__WEBPACK_IMPORTED_MODULE_1__.Bouncer, {
    size: props.size
  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements__WEBPACK_IMPORTED_MODULE_1__.Bouncer, {
    size: props.size
  }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_elements__WEBPACK_IMPORTED_MODULE_1__.Bouncer, {
    size: props.size
  })]
}));
Loader.defaultProps = {
  inline: false,
  size: 'default',
  inheritColor: false
};

/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/group.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Group: () => (/* binding */ Group),
/* harmony export */   GroupTitle: () => (/* binding */ GroupTitle)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");

const _excluded = ["children"];


const Group = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_2__.styled)('div')({
  name: "Group",
  class: "g1uffhn2",
  propsAsIs: false
});
const GroupTitleContainer = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_2__.styled)('div')({
  name: "GroupTitleContainer",
  class: "gwvig3s",
  propsAsIs: false
});
const GroupTitle = _ref => {
  let {
      children
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(GroupTitleContainer, Object.assign({}, props, {
    children: children
  }));
};
__webpack_require__("../../@calendly/ui/dist/components/menu/group.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/group.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncItem: () => (/* reexport safe */ _item__WEBPACK_IMPORTED_MODULE_2__.AsyncItem),
/* harmony export */   BareItem: () => (/* reexport safe */ _item__WEBPACK_IMPORTED_MODULE_2__.BareItem),
/* harmony export */   CheckboxItem: () => (/* reexport safe */ _item__WEBPACK_IMPORTED_MODULE_2__.CheckboxItem),
/* harmony export */   Group: () => (/* reexport safe */ _group__WEBPACK_IMPORTED_MODULE_1__.Group),
/* harmony export */   GroupTitle: () => (/* reexport safe */ _group__WEBPACK_IMPORTED_MODULE_1__.GroupTitle),
/* harmony export */   Item: () => (/* reexport safe */ _item__WEBPACK_IMPORTED_MODULE_2__.Item),
/* harmony export */   Menu: () => (/* reexport safe */ _menu__WEBPACK_IMPORTED_MODULE_0__.Menu),
/* harmony export */   MultilineContainer: () => (/* reexport safe */ _item__WEBPACK_IMPORTED_MODULE_2__.MultilineContainer),
/* harmony export */   PopupDropdownMenu: () => (/* reexport safe */ _popup_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__.PopupDropdownMenu)
/* harmony export */ });
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/menu/menu.js");
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/menu/group.js");
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/index.js");
/* harmony import */ var _popup_dropdown_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/menu/popup-dropdown-menu.js");





/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/item/async.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Async: () => (/* binding */ Async)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var _linaria_autopilot_runtime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/linaria-autopilot/runtime.js");
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/index.js");
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/components/loader/index.js");
/* harmony import */ var _text_container__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/text-container.js");
/* harmony import */ var _base_container__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/base-container.js");

const _excluded = ["onClick", "children"];
// Linaria Autopilot DONE








const linariaAutopilotInterpolations0 = {
  'isLoading': "iv5zzvw"
};
const _exp = /*#__PURE__*/() => _base_container__WEBPACK_IMPORTED_MODULE_7__.BaseContainer;
const LinariaAutopilotInternalComponent0 = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_8__.styled)(_exp())({
  name: "LinariaAutopilotInternalComponent0",
  class: "l1127kha",
  propsAsIs: true
});
const Container = (0,_linaria_autopilot_runtime_js__WEBPACK_IMPORTED_MODULE_3__.getRuntimeNode)(LinariaAutopilotInternalComponent0, linariaAutopilotInterpolations0);
const Wrapper = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_8__.styled)('span')({
  name: "Wrapper",
  class: "wparex3",
  propsAsIs: false
});
const Async = _ref => {
  let {
      onClick,
      children
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const closeMenu = (0,_dropdown__WEBPACK_IMPORTED_MODULE_4__.useClose)();
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const asyncOnClick = async () => {
    if (!onClick) {
      return;
    }
    const result = onClick();
    if (result instanceof Promise) {
      setLoading(true);
      await result;
      closeMenu();
    }
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Container, Object.assign({}, props, {
    isLoading: loading,
    onClick: asyncOnClick,
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_text_container__WEBPACK_IMPORTED_MODULE_6__.TextContainer, {
      children: children
    }), loading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Wrapper, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_loader__WEBPACK_IMPORTED_MODULE_5__.Loader, {
        inheritColor: true,
        size: "small"
      })
    })]
  }));
};
__webpack_require__("../../@calendly/ui/dist/components/menu/item/async.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/item/async.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/item/bare.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bare: () => (/* binding */ Bare)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var _utils_with_as__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/utils/with-as.js");
/* harmony import */ var _text_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/text-container.js");
/* harmony import */ var _base_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/base-container.js");

const _excluded = ["children"];




const Renderer = (_ref, ref) => {
  let {
      children
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_base_container__WEBPACK_IMPORTED_MODULE_4__.BaseContainer, Object.assign({
    ref: ref
  }, props, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_text_container__WEBPACK_IMPORTED_MODULE_3__.TextContainer, {
      children: children
    })
  }));
};
const Bare = (0,_utils_with_as__WEBPACK_IMPORTED_MODULE_2__.forwardRefWithAs)(Renderer);

/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/item/base-container.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseContainer: () => (/* binding */ BaseContainer)
/* harmony export */ });
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var _bare_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");


const _exp = /*#__PURE__*/() => _bare_button__WEBPACK_IMPORTED_MODULE_0__.BareButton;
const BaseContainer = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_1__.styled)(_exp())({
  name: "BaseContainer",
  class: "b1mzux6g",
  propsAsIs: true
});
__webpack_require__("../../@calendly/ui/dist/components/menu/item/base-container.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/item/base-container.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/item/checkbox.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Checkbox: () => (/* binding */ Checkbox)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _internal_selectable_containers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/internal/selectable-containers/index.js");
/* harmony import */ var _base_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/base-container.js");
/* harmony import */ var _text_container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/text-container.js");

const _excluded = ["children", "checked"];





const Checkbox = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((_ref, ref) => {
  let {
      children,
      checked
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_base_container__WEBPACK_IMPORTED_MODULE_4__.BaseContainer, Object.assign({
    role: "menuitemcheckbox",
    "aria-checked": checked,
    ref: ref
  }, props, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_text_container__WEBPACK_IMPORTED_MODULE_5__.TextContainer, {
      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_internal_selectable_containers__WEBPACK_IMPORTED_MODULE_3__.Checkbox, {
        checked: checked
      }), children]
    })
  }));
});

/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/item/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncItem: () => (/* reexport safe */ _async__WEBPACK_IMPORTED_MODULE_1__.Async),
/* harmony export */   BareItem: () => (/* reexport safe */ _bare__WEBPACK_IMPORTED_MODULE_2__.Bare),
/* harmony export */   CheckboxItem: () => (/* reexport safe */ _checkbox__WEBPACK_IMPORTED_MODULE_4__.Checkbox),
/* harmony export */   Item: () => (/* reexport safe */ _item__WEBPACK_IMPORTED_MODULE_3__.Item),
/* harmony export */   MultilineContainer: () => (/* reexport safe */ _multiline_container__WEBPACK_IMPORTED_MODULE_0__.MultilineContainer)
/* harmony export */ });
/* harmony import */ var _multiline_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/multiline-container.js");
/* harmony import */ var _async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/async.js");
/* harmony import */ var _bare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/bare.js");
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/item.js");
/* harmony import */ var _checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/checkbox.js");






/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/item/item.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Item: () => (/* binding */ Item)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_use_ui_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/dist/hooks/use-ui-settings.js");
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/index.js");
/* harmony import */ var _text_container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/text-container.js");
/* harmony import */ var _base_container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/components/menu/item/base-container.js");






const ButtonContainer = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((props, ref) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_container__WEBPACK_IMPORTED_MODULE_5__.BaseContainer, Object.assign({}, props, {
  ref: ref
})));
const AnchorContainer = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((props, ref) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_container__WEBPACK_IMPORTED_MODULE_5__.BaseContainer, Object.assign({}, props, {
  as: "a",
  ref: ref
})));
const LinkContainer = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((props, ref) => {
  const {
    LinkComponent
  } = (0,_hooks_use_ui_settings__WEBPACK_IMPORTED_MODULE_2__.useUiSettings)();
  if (!LinkComponent) return null;
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_container__WEBPACK_IMPORTED_MODULE_5__.BaseContainer, Object.assign({}, props, {
    as: LinkComponent,
    ref: ref
  }));
});
const isAnchor = props => Boolean(props.href);
const isLink = props => Boolean(props.to);
const Container = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((props, ref) => {
  if (isAnchor(props)) return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AnchorContainer, Object.assign({}, props, {
    ref: ref
  }));
  if (isLink(props)) return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(LinkContainer, Object.assign({}, props, {
    ref: ref
  }));
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonContainer, Object.assign({}, props, {
    ref: ref
  }));
});
const Item = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((props, ref) => {
  const closeMenu = (0,_dropdown__WEBPACK_IMPORTED_MODULE_3__.useClose)();
  const wrappedOnClick = event => {
    props.onClick == null || props.onClick(event);
    closeMenu();
  };
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Container, Object.assign({}, props, {
    onClick: wrappedOnClick,
    ref: ref,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_text_container__WEBPACK_IMPORTED_MODULE_4__.TextContainer, {
      children: props.children
    })
  }));
});

/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/item/multiline-container.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MultilineContainer: () => (/* binding */ MultilineContainer)
/* harmony export */ });
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");

const MultilineContainer = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_0__.styled)('div')({
  name: "MultilineContainer",
  class: "myjz7fb",
  propsAsIs: false
});
__webpack_require__("../../@calendly/ui/dist/components/menu/item/multiline-container.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/item/multiline-container.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/item/text-container.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextContainer: () => (/* binding */ TextContainer)
/* harmony export */ });
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");

const TextContainer = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_0__.styled)('div')({
  name: "TextContainer",
  class: "t1922313",
  propsAsIs: false
});
__webpack_require__("../../@calendly/ui/dist/components/menu/item/text-container.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/item/text-container.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/menu.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Menu: () => (/* binding */ Menu)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_with_as__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/utils/with-as.js");

const _excluded = ["children", "as"];



const base = "bk88u2j";
const MenuComponent = (_ref, forwardedRef) => {
  let {
      children,
      as: Component = 'div'
    } = _ref,
    restProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Component, Object.assign({}, restProps, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(base, restProps.className),
    ref: forwardedRef,
    children: children
  }));
};
const Menu = (0,_utils_with_as__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(MenuComponent);
__webpack_require__("../../@calendly/ui/dist/components/menu/menu.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/menu.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/popup-dropdown-menu.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopupDropdownMenu: () => (/* binding */ PopupDropdownMenu)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var _calendly_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/i18n/src/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _hooks_use_device_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/hooks/use-device-type.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../@calendly/ui/dist/components/button/index.js");
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/index.js");
/* harmony import */ var _fixed_container__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../@calendly/ui/dist/components/fixed-container/index.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../@calendly/ui/dist/components/menu/menu.js");

const _excluded = ["children"];










const isPhoneCss = "iyuqzvp";
const baseContainer = "bobhlom";
const Footer = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_10__.styled)('div')({
  name: "Footer",
  class: "f1hkvg3v",
  propsAsIs: false
});
const PopupDropdownMenu = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((_ref, forwardedRef) => {
  let {
      children
    } = _ref,
    restProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const isPhone = (0,_hooks_use_device_type__WEBPACK_IMPORTED_MODULE_5__.useDeviceType)('isPhone');
  const closeDropdown = (0,_dropdown__WEBPACK_IMPORTED_MODULE_7__.useClose)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_menu__WEBPACK_IMPORTED_MODULE_9__.Menu, Object.assign({}, restProps, {
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()(baseContainer, {
      [isPhoneCss]: isPhone
    }, restProps.className),
    as: _fixed_container__WEBPACK_IMPORTED_MODULE_8__.FixedContainer,
    fixedWhen: isPhone,
    ref: forwardedRef,
    children: [children, isPhone && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Footer, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_button__WEBPACK_IMPORTED_MODULE_6__.Button, {
        wide: true,
        onClick: closeDropdown,
        decoration: "secondary-outline",
        children: _calendly_i18n__WEBPACK_IMPORTED_MODULE_3__.I18n.t('ui.shared.close')
      })
    })]
  }));
});
__webpack_require__("../../@calendly/ui/dist/components/menu/popup-dropdown-menu.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/popup-dropdown-menu.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/minimal-button/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MinimalButton: () => (/* binding */ MinimalButton)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _calendly_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/i18n/src/index.js");
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/loader/index.js");
/* harmony import */ var _utils_with_as__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/utils/with-as.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../@calendly/ui/dist/components/minimal-button/styles.js");

const _excluded = ["decoration", "loading", "disabled", "fontSize", "children", "onClick"];






const MinimalButtonComponent = (_ref, forwardedRef) => {
  let {
      decoration = 'primary',
      loading = false,
      disabled = false,
      fontSize = 'medium',
      children,
      onClick
    } = _ref,
    nativeProps = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const wrappedOnClick = event => {
    if (loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };
  const ariaProps = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    const props = {};
    if (loading) {
      props['aria-label'] = _calendly_i18n__WEBPACK_IMPORTED_MODULE_3__.I18n.t('ui.shared.loading');
    }
    return props;
  }, [loading]);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_styles__WEBPACK_IMPORTED_MODULE_6__.Container, Object.assign({
    decoration: decoration,
    loading: loading,
    disabled: disabled,
    ref: forwardedRef,
    onClick: wrappedOnClick,
    fontSize: fontSize
  }, ariaProps, nativeProps, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styles__WEBPACK_IMPORTED_MODULE_6__.TextContainer, {
      loading: loading,
      size: "small",
      children: children
    }), loading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_styles__WEBPACK_IMPORTED_MODULE_6__.LoaderContainer, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_loader__WEBPACK_IMPORTED_MODULE_4__.Loader, {
        inheritColor: true,
        size: "small"
      })
    })]
  }));
};
const ButtonWithForwardRef = (0,_utils_with_as__WEBPACK_IMPORTED_MODULE_5__.forwardRefWithAs)(MinimalButtonComponent);
const MinimalButton = ButtonWithForwardRef;

/***/ }),

/***/ "../../@calendly/ui/dist/components/minimal-button/styles.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Container: () => (/* binding */ Container),
/* harmony export */   LoaderContainer: () => (/* binding */ LoaderContainer),
/* harmony export */   TextContainer: () => (/* binding */ TextContainer)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _bare_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _internal_box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/components/internal/box/index.js");

const _excluded = ["size", "loading"],
  _excluded2 = ["decoration", "loading", "disabled", "fontSize"];





const textContainerLoading = "t3xn08r";
const textContainerSizeSmall = "t1lrigc3";
const textContainerNormalOrLarge = "t1xm7d2y";
const textContainerBase = "t2ngs82";
const TextContainer = _ref => {
  let {
      size,
      loading
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", Object.assign({}, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(textContainerBase, {
      [textContainerLoading]: loading,
      [textContainerSizeSmall]: size === 'small',
      [textContainerNormalOrLarge]: size !== 'small'
    })
  }));
};
const loaderContainerBase = "l9z9u94";
const LoaderContainer = props => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", Object.assign({}, props, {
  className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(loaderContainerBase, props.className)
}));
const decorationDanger = "d1fd75sc";
const fontSizeSmall = "f1vvfp61";
const fontSizeMedium = "f1a0p7qj";
const loading = "l1iqh7u6";
const base = "b1xup8ku";
const Container = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((_ref2, ref) => {
  let {
      decoration,
      loading: loadingProp,
      disabled,
      fontSize
    } = _ref2,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded2);
  const [spacingProps, buttonProps] = (0,_internal_box__WEBPACK_IMPORTED_MODULE_5__.extractSpacingProps)(props);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_internal_box__WEBPACK_IMPORTED_MODULE_5__.Box, Object.assign({}, spacingProps, {
    asChild: true,
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_bare_button__WEBPACK_IMPORTED_MODULE_4__.BareButton, Object.assign({
      disabled: disabled
    }, buttonProps, {
      ref: ref,
      className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(base, {
        [decorationDanger]: decoration === 'danger',
        [loading]: loadingProp,
        [fontSizeSmall]: fontSize === 'small',
        [fontSizeMedium]: fontSize === 'medium'
      }, props.className)
    }))
  }));
});
__webpack_require__("../../@calendly/ui/dist/components/minimal-button/styles.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/minimal-button/styles.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/pro-tip/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProTip: () => (/* reexport safe */ _pro_tip__WEBPACK_IMPORTED_MODULE_0__.ProTip)
/* harmony export */ });
/* harmony import */ var _pro_tip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/pro-tip/pro-tip.js");


/***/ }),

/***/ "../../@calendly/ui/dist/components/pro-tip/pro-tip.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProTip: () => (/* binding */ ProTip)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _linaria_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("../../node_modules/@linaria/react/dist/index.mjs");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _calendly_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/i18n/src/index.js");
/* harmony import */ var _hooks_use_device_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../../@calendly/ui/dist/hooks/use-device-type.js");
/* harmony import */ var _hooks_use_floating__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../../@calendly/ui/dist/hooks/use-floating.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var _typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../../@calendly/ui/dist/components/typography/index.js");
/* harmony import */ var _bare_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../../@calendly/ui/dist/components/bare-button/index.js");
/* harmony import */ var _dropdown__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("../../@calendly/ui/dist/components/dropdown/index.js");
/* harmony import */ var _fixed_container__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("../../@calendly/ui/dist/components/fixed-container/index.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../../@calendly/ui/dist/components/icons/index.js");
/* harmony import */ var _internal_box__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("../../@calendly/ui/dist/components/internal/box/index.js");

const _excluded = ["children"],
  _excluded2 = ["children", "title", "disabled", "className", "hideControls", "size", "icon", "color", "inline"];














const _exp = /*#__PURE__*/() => _internal_box__WEBPACK_IMPORTED_MODULE_13__.Box;
const Wrapper = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_14__.styled)(_exp())({
  name: "Wrapper",
  class: "wl0l3gf",
  propsAsIs: true
});
const _exp2 = /*#__PURE__*/() => _bare_button__WEBPACK_IMPORTED_MODULE_9__.BareButton;
const Control = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_14__.styled)(_exp2())({
  name: "Control",
  class: "c1htyp07",
  propsAsIs: true
});
const Overlay = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_14__.styled)('div')({
  name: "Overlay",
  class: "o172okox",
  propsAsIs: false
});
const bodyPhone = "b9g82w4";
const bodyTabletUp = "bcf0wxg";
const bodyBase = "bs63iis";
const Body = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((_ref, ref) => {
  let {
      children
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  const isPhone = (0,_hooks_use_device_type__WEBPACK_IMPORTED_MODULE_5__.useDeviceType)('isPhone');
  const isTabletUp = (0,_hooks_use_device_type__WEBPACK_IMPORTED_MODULE_5__.useDeviceType)('isTabletUp');
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_fixed_container__WEBPACK_IMPORTED_MODULE_11__.FixedContainer, Object.assign({}, props, {
    ref: ref,
    fixedWhen: isPhone,
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()(bodyBase, {
      [bodyPhone]: isPhone,
      [bodyTabletUp]: isTabletUp
    }),
    children: children
  }));
});
const _exp10 = /*#__PURE__*/() => _bare_button__WEBPACK_IMPORTED_MODULE_9__.BareButton;
const CloseButton = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_14__.styled)(_exp10())({
  name: "CloseButton",
  class: "cunsnep",
  propsAsIs: true
});
const Content = /*#__PURE__*/(0,_linaria_react__WEBPACK_IMPORTED_MODULE_14__.styled)('div')({
  name: "Content",
  class: "c10bvcek",
  propsAsIs: false
});
const Controls = () => {
  const onClose = (0,_dropdown__WEBPACK_IMPORTED_MODULE_10__.useClose)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CloseButton, {
    onClick: onClose,
    children: _calendly_i18n__WEBPACK_IMPORTED_MODULE_4__.I18n.t('ui.pro_tip.got_it')
  });
};
const ProTip = _ref2 => {
  let {
      children,
      title = '',
      disabled = false,
      className,
      hideControls = false,
      size = 'standard',
      icon,
      color,
      inline
    } = _ref2,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded2);
  const [toggle, Dropdown, isExpanded] = (0,_dropdown__WEBPACK_IMPORTED_MODULE_10__.useDropdown)();
  const isMobile = (0,_hooks_use_device_type__WEBPACK_IMPORTED_MODULE_5__.useDeviceType)('isPhone');
  const ProTipIcon = icon || _icons__WEBPACK_IMPORTED_MODULE_12__.InformationCircleMiniIcon;
  const [spacingProps] = (0,_internal_box__WEBPACK_IMPORTED_MODULE_13__.extractSpacingProps)(props);
  const [setReference, FloatingWrapper] = (0,_hooks_use_floating__WEBPACK_IMPORTED_MODULE_6__.useFloating)(isExpanded, {
    placement: 'bottom-start'
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Wrapper, Object.assign({
    className: className
  }, spacingProps, {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Control, {
      disabled: disabled,
      ref: setReference,
      "aria-label": _calendly_i18n__WEBPACK_IMPORTED_MODULE_4__.I18n.t('ui.pro_tip.help'),
      onClick: toggle,
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ProTipIcon, {
        color: color,
        inline: inline,
        size: size === 'standard' ? 'x-large' : 'large'
      })
    }), isExpanded && isMobile && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Overlay, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Dropdown, {
      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(FloatingWrapper, {
        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Body, {
          children: [title && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_typography__WEBPACK_IMPORTED_MODULE_8__.HeadingText, {
            level: 3,
            color: _theme__WEBPACK_IMPORTED_MODULE_7__.colorTextInverseStandard,
            children: title
          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Content, {
            children: children
          }), !hideControls && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Controls, {})]
        })
      })
    })]
  }));
};
__webpack_require__("../../@calendly/ui/dist/components/pro-tip/pro-tip.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/pro-tip/pro-tip.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/text-input/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextInput: () => (/* reexport safe */ _form_inputs_text_input__WEBPACK_IMPORTED_MODULE_0__.TextInput)
/* harmony export */ });
/* harmony import */ var _form_inputs_text_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/form/inputs/text-input/index.js");


/***/ }),

/***/ "../../@calendly/ui/dist/components/typography/body-text.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BodyText: () => (/* binding */ BodyText)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var _utils_no_css_overrides__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/utils/no-css-overrides.js");

const _excluded = ["as", "size", "weight"],
  _excluded2 = ["color", "inline", "size", "weight", "children"];




const colorMapping = {
  muted: _theme__WEBPACK_IMPORTED_MODULE_3__.colorTextSecondary,
  standard: _theme__WEBPACK_IMPORTED_MODULE_3__.colorTextStandard
};
const containerSizeLarge = "cxopxkx";
const containerSizeMedium = "c14ckrlr";
const containerSizeSmall = "c1fyv2su";
const containerSizeXSmall = "c1qkwyyh";
const containerWeightStandard = "c18ugapo";
const containerWeightSemibold = "c1955pmv";
const containerWeightBold = "cz2ds4u";
const containerBase = "c1h02tgv";
const Container = _ref => {
  let {
      as: Component = 'p',
      size,
      weight
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Component, Object.assign({
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(containerBase, {
      [containerSizeLarge]: size === 'large',
      [containerSizeMedium]: size === 'medium',
      [containerSizeSmall]: size === 'small',
      [containerSizeXSmall]: size === 'x-small',
      [containerWeightStandard]: weight === 'standard',
      [containerWeightBold]: weight === 'bold',
      [containerWeightSemibold]: weight === 'semibold'
    })
  }, props));
};
const BodyText = (0,_utils_no_css_overrides__WEBPACK_IMPORTED_MODULE_4__.withNoCssOverrides)(_ref2 => {
  let {
      color,
      inline,
      size = 'medium',
      weight = 'standard',
      children
    } = _ref2,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded2);
  const realColor = color ? colorMapping[color] || color : 'currentColor';
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Container, Object.assign({
    size: size,
    weight: weight
  }, props, {
    style: {
      color: realColor
    },
    as: inline ? 'span' : 'p',
    children: children
  }));
});
__webpack_require__("../../@calendly/ui/dist/components/typography/body-text.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/typography/body-text.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/typography/heading-text.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeadingText: () => (/* binding */ HeadingText)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/theme.js");
/* harmony import */ var _utils_no_css_overrides__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../../@calendly/ui/dist/utils/no-css-overrides.js");

const _excluded = ["as", "color", "variant", "size"],
  _excluded2 = ["as", "level", "variant"];




const headingTextSizeLarge = "hkcrkfb";
const headingTextSizeMedium = "h13d0r4u";
const headingTextSizeSmall = "h1nds1zr";
const headingTextVariantEyebrow = "h179l05x";
const headingTextBase = "h1gzl5c7";
const HeadingTextContainer = _ref => {
  let {
      as: Component = 'p',
      color,
      variant,
      size
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Component, Object.assign({}, props, {
    style: variant === 'eyebrow' ? {
      color: color || _theme__WEBPACK_IMPORTED_MODULE_3__.colorTextStandard
    } : {
      color: color || 'currentColor'
    },
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(headingTextBase, {
      [headingTextSizeLarge]: size === 'large' && variant === 'standard',
      [headingTextSizeMedium]: size === 'medium' && variant === 'standard',
      [headingTextSizeSmall]: size === 'small' && variant === 'standard',
      [headingTextVariantEyebrow]: variant === 'eyebrow'
    }, props.className)
  }));
};
const defaultSizes = {
  1: 'large',
  2: 'medium',
  3: 'small'
};
const defaultTags = {
  1: 'h1',
  2: 'h2',
  3: 'h3'
};
const HeadingText = (0,_utils_no_css_overrides__WEBPACK_IMPORTED_MODULE_4__.withNoCssOverrides)(_ref2 => {
  let {
      as,
      level,
      variant = 'standard'
    } = _ref2,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded2);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(HeadingTextContainer, Object.assign({
    variant: variant,
    size: variant === 'eyebrow' ? undefined : defaultSizes[level]
  }, props, {
    as: as || defaultTags[level]
  }));
});
__webpack_require__("../../@calendly/ui/dist/components/typography/heading-text.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/typography/heading-text.js");

/***/ }),

/***/ "../../@calendly/ui/dist/components/typography/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BodyText: () => (/* reexport safe */ _body_text__WEBPACK_IMPORTED_MODULE_1__.BodyText),
/* harmony export */   HeadingText: () => (/* reexport safe */ _heading_text__WEBPACK_IMPORTED_MODULE_0__.HeadingText)
/* harmony export */ });
/* harmony import */ var _heading_text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/typography/heading-text.js");
/* harmony import */ var _body_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../@calendly/ui/dist/components/typography/body-text.js");



/***/ }),

/***/ "../../@calendly/ui/dist/components/visually-hidden/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VisuallyHidden: () => (/* reexport safe */ _visually_hidden__WEBPACK_IMPORTED_MODULE_0__.VisuallyHidden)
/* harmony export */ });
/* harmony import */ var _visually_hidden__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../@calendly/ui/dist/components/visually-hidden/visually-hidden.js");


/***/ }),

/***/ "../../@calendly/ui/dist/components/visually-hidden/visually-hidden.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VisuallyHidden: () => (/* binding */ VisuallyHidden)
/* harmony export */ });
/* harmony import */ var _app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/@nx/js/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../../@calendly/ui/node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_with_as__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../../@calendly/ui/dist/utils/with-as.js");

const _excluded = ["as"];



const baseCss = "bcim6wf";
const VisuallyHiddenComponent = (_ref, ref) => {
  let {
      as: Component = 'div'
    } = _ref,
    props = (0,_app_node_modules_nx_js_node_modules_babel_runtime_helpers_esm_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Component, Object.assign({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(baseCss, props.className)
  }));
};
const VisuallyHidden = (0,_utils_with_as__WEBPACK_IMPORTED_MODULE_3__.forwardRefWithAs)(VisuallyHiddenComponent);
__webpack_require__("../../@calendly/ui/dist/components/visually-hidden/visually-hidden.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/visually-hidden/visually-hidden.js");

/***/ }),

/***/ "../../@calendly/ui/dist/hooks/use-close-on-escape.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCloseOnEscape: () => (/* binding */ useCloseOnEscape)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const handlers = new Set();
const onEscape = event => {
  if (!['Esc', 'Escape'].includes(event.key)) return;
  const handler = Array.from(handlers).pop();
  if (!handler) return;
  const result = handler(event);
  if (result !== false) {
    handlers.delete(handler);
  }
};
const useCloseOnEscape = ({
  isOpen,
  onClose
}) => {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (handlers.size === 0) {
      window.addEventListener('keyup', onEscape);
    }
    if (isOpen) {
      handlers.add(onClose);
    }
    return () => {
      handlers.delete(onClose);
      if (handlers.size === 0) {
        window.removeEventListener('keyup', onEscape);
      }
    };
  });
};

/***/ }),

/***/ "../../@calendly/ui/dist/hooks/use-device-type.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeviceTypeProvider: () => (/* binding */ DeviceTypeProvider),
/* harmony export */   useDeviceType: () => (/* binding */ useDeviceType)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var json2mq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/json2mq/index.js");
/* harmony import */ var json2mq__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(json2mq__WEBPACK_IMPORTED_MODULE_1__);


const breakSmall = 500;
const breakMedium = 800;
const breakLarge = 1100;
const breakLargeDesktop = 1500;
const defaultBreakpoints = {
  isSmallPhone: {
    maxWidth: breakSmall
  },
  isBigPhone: {
    minWidth: breakSmall + 1,
    maxWidth: breakMedium
  },
  isBigPhoneUp: {
    minWidth: breakSmall + 1
  },
  isPhone: {
    maxWidth: breakMedium
  },
  isTabletDown: {
    maxWidth: breakLarge
  },
  isTablet: {
    minWidth: breakMedium + 1,
    maxWidth: breakLarge
  },
  isTabletUp: {
    minWidth: breakMedium + 1
  },
  isDesktopUp: {
    minWidth: breakLarge + 1
  },
  isLargeDesktopDown: {
    minWidth: breakLarge + 1,
    maxWidth: breakLargeDesktop
  }
};
const DeviceTypeContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  breakpoints: defaultBreakpoints
});
const DeviceTypeProvider = DeviceTypeContext.Provider;
const getMediaQueryList = query => {
  if (typeof window === 'undefined') return null;
  return window.matchMedia(json2mq__WEBPACK_IMPORTED_MODULE_1___default()(query));
};
const useDeviceType = deviceType => {
  const {
    breakpoints
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(DeviceTypeContext);
  const mediaQueryListRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const query = breakpoints[deviceType];
  mediaQueryListRef.current = getMediaQueryList(query);
  const [matches, setMatches] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(mediaQueryListRef.current ? mediaQueryListRef.current.matches : false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _mediaQueryListRef$cu2;
    mediaQueryListRef.current = getMediaQueryList(query);
    let active = true;
    const listener = () => {
      var _mediaQueryListRef$cu;
      if (!active) return;
      if ((_mediaQueryListRef$cu = mediaQueryListRef.current) != null && _mediaQueryListRef$cu.matches) {
        setMatches(true);
      } else {
        setMatches(false);
      }
    };
    (_mediaQueryListRef$cu2 = mediaQueryListRef.current) == null || _mediaQueryListRef$cu2.addListener(listener);
    setMatches(mediaQueryListRef.current ? mediaQueryListRef.current.matches : false);
    return () => {
      var _mediaQueryListRef$cu3;
      active = false;
      (_mediaQueryListRef$cu3 = mediaQueryListRef.current) == null || _mediaQueryListRef$cu3.removeListener(listener);
    };
  }, [query]);
  return matches;
};

/***/ }),

/***/ "../../@calendly/ui/dist/hooks/use-safe-colors.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Provider: () => (/* binding */ Provider),
/* harmony export */   SafeColorsContext: () => (/* binding */ SafeColorsContext),
/* harmony export */   useSafeColors: () => (/* binding */ useSafeColors)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const defaultValue = false;
const Context = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(defaultValue);
const {
  Provider
} = Context;
const useSafeColors = () => (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(Context);
const SafeColorsContext = ({
  children,
  safeColors
}) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Provider, {
  value: safeColors,
  children: children
});

/***/ }),

/***/ "../../@calendly/ui/dist/hooks/use-ui-settings.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UiSettingsProvider: () => (/* binding */ UiSettingsProvider),
/* harmony export */   useUiSettings: () => (/* binding */ useUiSettings)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const UiSettingsContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
const UiSettingsProvider = UiSettingsContext.Provider;
const useUiSettings = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(UiSettingsContext);

/***/ }),

/***/ "../../@calendly/ui/dist/utils/generate-id.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateId: () => (/* binding */ generateId)
/* harmony export */ });
const generateId = () => Array.from({
  length: 5
}, () => Math.floor(Math.random() * 16).toString(16)).join('');


/***/ }),

/***/ "../../@calendly/ui/dist/components/button/styles.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/button/styles.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/dropdown/elements.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/dropdown/elements.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/dropdown/filter-select-or-clear.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/dropdown/filter-select-or-clear.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/fixed-container/fixed-container.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/fixed-container/fixed-container.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/form/inputs/text-input/text-input.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/form/inputs/text-input/text-input.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/form/parts/field-error.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/form/parts/field-error.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/form/parts/field-label.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/form/parts/field-label.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/form/parts/fieldset.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/form/parts/fieldset.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/icon-button/styles.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/icon-button/styles.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/inline-search/elements.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/inline-search/elements.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/internal/selectable-containers/hidden-input.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/internal/selectable-containers/hidden-input.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/internal/selectable-containers/variants/checkbox.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/internal/selectable-containers/variants/checkbox.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/internal/selectable-containers/variants/chip.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/internal/selectable-containers/variants/chip.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/internal/selectable-containers/variants/selectable.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/internal/selectable-containers/variants/selectable.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/link/elements.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/link/elements.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/loader/elements.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/loader/elements.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/loader/index.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/loader/index.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/group.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/group.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/item/async.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/item/async.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/item/base-container.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/item/base-container.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/item/multiline-container.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/item/multiline-container.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/item/text-container.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/item/text-container.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/menu.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/menu.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/menu/popup-dropdown-menu.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/menu/popup-dropdown-menu.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/minimal-button/styles.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/minimal-button/styles.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/pro-tip/pro-tip.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/pro-tip/pro-tip.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/typography/body-text.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/typography/body-text.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/typography/heading-text.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/typography/heading-text.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../@calendly/ui/dist/components/visually-hidden/visually-hidden.linaria.css!=!../../node_modules/@linaria/webpack5-loader/lib/outputCssLoader.js?cacheProvider=!../../@calendly/ui/dist/components/visually-hidden/visually-hidden.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);