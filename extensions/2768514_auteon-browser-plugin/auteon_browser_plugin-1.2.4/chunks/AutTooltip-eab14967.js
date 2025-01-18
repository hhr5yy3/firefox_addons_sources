import { d as defineComponent, c as createElementBlock, r as resolveComponent, a as createBlock, b as withCtx, j as createCommentVNode, u as useCssVars, x as useSlots, p as ref, y as onMounted, z as toRefs, A as computed, B as watch, C as watchEffect, o as openBlock, f as createBaseVNode, q as renderSlot, D as withKeys, g as createVNode, w as withDirectives, v as vShow, E as unref, m as createTextVNode, t as toDisplayString$1, T as Transition, i as normalizeStyle, n as normalizeClass, h as withModifiers, F as onBeforeUnmount, G as reactive, H as nextTick, I as isRef } from './AutStylesheet-2c420ffc.js';
import { s as script$a } from './AutLogo-574084e3.js';
import { s as script$9 } from './AutButton-9a5afc83.js';
import { e as eventBus, s as syncedStorage } from './event-bus-eb77ec2c.js';

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce$1(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  }
  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}
// Adds compatibility for ES modules
debounce$1.debounce = debounce$1;

var debounce_1 = debounce$1;

function useEventListener(target, event, handler) {
  if (isRef(target)) {
    watch(target, (value, oldValue) => {
      oldValue === null || oldValue === void 0 ? void 0 : oldValue.removeEventListener(event, handler);
      value === null || value === void 0 ? void 0 : value.addEventListener(event, handler);
    });
  } else {
    onMounted(() => {
      target.addEventListener(event, handler);
    });
  }

  onBeforeUnmount(() => {
    var _unref;

    (_unref = unref(target)) === null || _unref === void 0 ? void 0 : _unref.removeEventListener(event, handler);
  });
}

function useClickAway(target, handler) {
  const event = "pointerdown";

  if (typeof window === 'undefined' || !window) {
    return;
  }

  const listener = event => {
    const el = unref(target);

    if (!el) {
      return;
    }

    if (el === event.target || event.composedPath().includes(el)) {
      return;
    }

    handler(event);
  };

  return useEventListener(window, event, listener);
}

function useContent(slots, popperNode, content) {
  let observer = null;
  const hasContent = ref(false);
  onMounted(() => {
    if (slots.content !== undefined || content.value) {
      hasContent.value = true;
    }

    observer = new MutationObserver(checkContent);
    observer.observe(popperNode.value, {
      childList: true,
      subtree: true
    });
  });
  onBeforeUnmount(() => observer.disconnect());
  /**
   * Watch the content prop
   */

  watch(content, content => {
    if (content) {
      hasContent.value = true;
    } else {
      hasContent.value = false;
    }
  });
  /**
   * Check the content slot
   */

  const checkContent = () => {
    if (slots.content) {
      hasContent.value = true;
    } else {
      hasContent.value = false;
    }
  };

  return {
    hasContent
  };
}

// import { isHTMLElement } from './instanceOf';
function getBoundingClientRect(element, // eslint-disable-next-line unused-imports/no-unused-vars
includeScale) {

  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1; // FIXME:
  // `offsetWidth` returns an integer while `getBoundingClientRect`
  // returns a float. This results in `scaleX` or `scaleY` being
  // non-1 when it should be for elements that aren't a full pixel in
  // width or height.
  // if (isHTMLElement(element) && includeScale) {
  //   const offsetHeight = element.offsetHeight;
  //   const offsetWidth = element.offsetWidth;
  //   // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
  //   // Fallback to 1 in case both values are `0`
  //   if (offsetWidth > 0) {
  //     scaleX = rect.width / offsetWidth || 1;
  //   }
  //   if (offsetHeight > 0) {
  //     scaleY = rect.height / offsetHeight || 1;
  //   }
  // }

  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = rect.width / element.offsetWidth || 1;
  var scaleY = rect.height / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function getVariation(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var passive = {
  passive: true
};

function effect$2(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect$2,
  data: {}
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(round(x * dpr) / dpr) || 0,
    y: round(round(y * dpr) / dpr) || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$1(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$1,
  requires: ['computeStyles']
};

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = popperOffsets[mainAxis] + overflow[mainSide];
    var max$1 = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

    if (checkMainAxis) {
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? top : left;

      var _altSide = mainAxis === 'x' ? bottom : right;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


var arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

const toInt = x => parseInt(x, 10);

function usePopper({
  arrowPadding,
  emit,
  locked,
  offsetDistance,
  offsetSkid,
  placement,
  popperNode,
  triggerNode
}) {
  const state = reactive({
    isOpen: false,
    popperInstance: null
  }); // Enable or disable event listeners to optimize performance.

  const setPopperEventListeners = enabled => {
    var _state$popperInstance;

    (_state$popperInstance = state.popperInstance) === null || _state$popperInstance === void 0 ? void 0 : _state$popperInstance.setOptions(options => ({ ...options,
      modifiers: [...options.modifiers, {
        name: "eventListeners",
        enabled
      }]
    }));
  };

  const enablePopperEventListeners = () => setPopperEventListeners(true);

  const disablePopperEventListeners = () => setPopperEventListeners(false);

  const close = () => {
    if (!state.isOpen) {
      return;
    }

    state.isOpen = false;
    emit("close:popper");
  };

  const open = () => {
    if (state.isOpen) {
      return;
    }

    state.isOpen = true;
    emit("open:popper");
  }; // When isOpen or placement change


  watch([() => state.isOpen, placement], async ([isOpen]) => {
    if (isOpen) {
      await initializePopper();
      enablePopperEventListeners();
    } else {
      disablePopperEventListeners();
    }
  });

  const initializePopper = async () => {
    await nextTick();
    state.popperInstance = createPopper(triggerNode.value, popperNode.value, {
      placement: placement.value,
      modifiers: [preventOverflow$1, flip$1, {
        name: "flip",
        enabled: !locked.value
      }, arrow$1, {
        name: "arrow",
        options: {
          padding: toInt(arrowPadding.value)
        }
      }, offset$1, {
        name: "offset",
        options: {
          offset: [toInt(offsetSkid.value), toInt(offsetDistance.value)]
        }
      }]
    }); // Update its position

    state.popperInstance.update();
  };

  onBeforeUnmount(() => {
    var _state$popperInstance2;

    (_state$popperInstance2 = state.popperInstance) === null || _state$popperInstance2 === void 0 ? void 0 : _state$popperInstance2.destroy();
  });
  return { ...toRefs(state),
    open,
    close
  };
}

const _hoisted_1$1$1 = {
  id: "arrow",
  "data-popper-arrow": ""
};
function render$8(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$1$1);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = "\n#arrow[data-v-20b7fd4a],\n  #arrow[data-v-20b7fd4a]::before {\n    transition: background 250ms ease-in-out;\n    position: absolute;\n    width: calc(10px - var(--popper-theme-border-width, 0px));\n    height: calc(10px - var(--popper-theme-border-width, 0px));\n    box-sizing: border-box;\n    background: var(--popper-theme-background-color);\n}\n#arrow[data-v-20b7fd4a] {\n    visibility: hidden;\n}\n#arrow[data-v-20b7fd4a]::before {\n    visibility: visible;\n    content: \"\";\n    transform: rotate(45deg);\n}\n\n  /* Top arrow */\n.popper[data-popper-placement^=\"top\"] > #arrow[data-v-20b7fd4a] {\n    bottom: -5px;\n}\n.popper[data-popper-placement^=\"top\"] > #arrow[data-v-20b7fd4a]::before {\n    border-right: var(--popper-theme-border-width)\n      var(--popper-theme-border-style) var(--popper-theme-border-color);\n    border-bottom: var(--popper-theme-border-width)\n      var(--popper-theme-border-style) var(--popper-theme-border-color);\n}\n\n  /* Bottom arrow */\n.popper[data-popper-placement^=\"bottom\"] > #arrow[data-v-20b7fd4a] {\n    top: -5px;\n}\n.popper[data-popper-placement^=\"bottom\"] > #arrow[data-v-20b7fd4a]::before {\n    border-left: var(--popper-theme-border-width)\n      var(--popper-theme-border-style) var(--popper-theme-border-color);\n    border-top: var(--popper-theme-border-width)\n      var(--popper-theme-border-style) var(--popper-theme-border-color);\n}\n\n  /* Left arrow */\n.popper[data-popper-placement^=\"left\"] > #arrow[data-v-20b7fd4a] {\n    right: -5px;\n}\n.popper[data-popper-placement^=\"left\"] > #arrow[data-v-20b7fd4a]::before {\n    border-right: var(--popper-theme-border-width)\n      var(--popper-theme-border-style) var(--popper-theme-border-color);\n    border-top: var(--popper-theme-border-width)\n      var(--popper-theme-border-style) var(--popper-theme-border-color);\n}\n\n  /* Right arrow */\n.popper[data-popper-placement^=\"right\"] > #arrow[data-v-20b7fd4a] {\n    left: -5px;\n}\n";
styleInject(css_248z$1);

const script$1$1 = {};
script$1$1.render = render$8;
script$1$1.__scopeId = "data-v-20b7fd4a";
var Arrow = script$1$1;

const _hoisted_1$8 = ["onKeyup"];
var script$8 = {
  props: {
    /**
     * Preferred placement (the "auto" placements will choose the side with most space.)
     */
    placement: {
      type: String,
      default: "bottom",
      validator: function (value) {
        return ["auto", "auto-start", "auto-end", "top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "right", "right-start", "right-end", "left", "left-start", "left-end"].includes(value);
      }
    },

    /**
     * Disables automatically closing the popover when the user clicks away from it
     */
    disableClickAway: {
      type: Boolean,
      default: false
    },

    /**
     * Offset in pixels along the trigger element
     */
    offsetSkid: {
      type: String,
      default: "0"
    },

    /**
     * Offset in pixels away from the trigger element
     */
    offsetDistance: {
      type: String,
      default: "12"
    },

    /**
     * Trigger the popper on hover
     */
    hover: {
      type: Boolean,
      default: false
    },

    /**
     * Manually open/close the Popper, other events are ignored if this prop is set
     */
    show: {
      type: Boolean,
      default: null
    },

    /**
     * Disables the Popper. If it was already open, it will be closed.
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Open the Popper after a delay (ms).
     */
    openDelay: {
      type: [Number, String],
      default: 0
    },

    /**
     * Close the Popper after a delay (ms).
     */
    closeDelay: {
      type: [Number, String],
      default: 0
    },

    /**
     * The z-index of the Popper.
     */
    zIndex: {
      type: [Number, String],
      default: 9999
    },

    /**
     * Display an arrow on the popper
     */
    arrow: {
      type: Boolean,
      default: false
    },

    /**
     * Stop arrow from reaching the edge of the popper
     */
    arrowPadding: {
      type: String,
      default: "0"
    },

    /**
     * If the Popper should be interactive, it will close when clicked/hovered if false
     */
    interactive: {
      type: Boolean,
      default: true
    },

    /**
     * Lock the Popper into place, it will not flip dynamically when it runs out of space if true
     */
    locked: {
      type: Boolean,
      default: false
    },

    /**
     * If the content is just a simple string, it can be passed in as a prop
     */
    content: {
      type: String,
      default: null
    }
  },
  emits: ["open:popper", "close:popper"],

  setup(__props, {
    emit
  }) {
    const props = __props;

    useCssVars(_ctx => ({
      "c81fc0a4": __props.zIndex
    }));

    const slots = useSlots();
    const popperContainerNode = ref(null);
    const popperNode = ref(null);
    const triggerNode = ref(null);
    const modifiedIsOpen = ref(false);
    onMounted(() => {
      const children = slots.default();

      if (children && children.length > 1) {
        return console.error(`[Popper]: The <Popper> component expects only one child element at its root. You passed ${children.length} child nodes.`);
      }
    });
    const {
      arrowPadding,
      closeDelay,
      content,
      disableClickAway,
      disabled,
      interactive,
      locked,
      offsetDistance,
      offsetSkid,
      openDelay,
      placement,
      show
    } = toRefs(props);
    const {
      isOpen,
      open,
      close
    } = usePopper({
      arrowPadding,
      emit,
      locked,
      offsetDistance,
      offsetSkid,
      placement,
      popperNode,
      triggerNode
    });
    const {
      hasContent
    } = useContent(slots, popperNode, content);
    const manualMode = computed(() => show.value !== null);
    const invalid = computed(() => disabled.value || !hasContent.value);
    const shouldShowPopper = computed(() => isOpen.value && !invalid.value);
    const enableClickAway = computed(() => !disableClickAway.value && !manualMode.value); // Add an invisible border to keep the Popper open when hovering from the trigger into it

    const interactiveStyle = computed(() => interactive.value ? `border: ${offsetDistance.value}px solid transparent; margin: -${offsetDistance.value}px;` : null);
    const openPopperDebounce = debounce_1.debounce(open, openDelay.value);
    const closePopperDebounce = debounce_1.debounce(close, closeDelay.value);

    const openPopper = async () => {
      if (invalid.value || manualMode.value) {
        return;
      }

      closePopperDebounce.clear();
      openPopperDebounce();
    };

    const closePopper = async () => {
      if (manualMode.value) {
        return;
      }

      openPopperDebounce.clear();
      closePopperDebounce();
    };

    const togglePopper = () => {
      isOpen.value ? closePopper() : openPopper();
    };
    /**
     * If Popper is open, we automatically close it if it becomes
     * disabled or without content.
     */


    watch([hasContent, disabled], ([hasContent, disabled]) => {
      if (isOpen.value && (!hasContent || disabled)) {
        close();
      }
    });
    /**
     * In order to eliminate flickering or visibly empty Poppers due to
     * the transition when using the isOpen slot property, we need to return a
     * separate debounced value based on isOpen.
     */

    watch(isOpen, isOpen => {
      if (isOpen) {
        modifiedIsOpen.value = true;
      } else {
        debounce_1.debounce(() => {
          modifiedIsOpen.value = false;
        }, 200);
      }
    });
    /**
     * Watch for manual mode.
     */

    watchEffect(() => {
      if (manualMode.value) {
        show.value ? openPopperDebounce() : closePopperDebounce();
      }
    });
    /**
     * Use click away if it should be enabled.
     */

    watchEffect(() => {
      if (enableClickAway.value) {
        useClickAway(popperContainerNode, closePopper);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "inline-block",
        style: normalizeStyle(unref(interactiveStyle)),
        onMouseleave: _cache[2] || (_cache[2] = $event => __props.hover && closePopper()),
        ref: (_value, _refs) => {
          _refs['popperContainerNode'] = _value;
          popperContainerNode.value = _value;
        }
      }, [createBaseVNode("div", {
        ref: (_value, _refs) => {
          _refs['triggerNode'] = _value;
          triggerNode.value = _value;
        },
        onMouseover: _cache[0] || (_cache[0] = $event => __props.hover && openPopper()),
        onClick: togglePopper,
        onFocus: openPopper,
        onKeyup: withKeys(closePopper, ["esc"])
      }, [renderSlot(_ctx.$slots, "default")], 40, _hoisted_1$8), createVNode(Transition, {
        name: "fade"
      }, {
        default: withCtx(() => [withDirectives(createBaseVNode("div", {
          onClick: _cache[1] || (_cache[1] = $event => !unref(interactive) && closePopper()),
          class: "popper",
          ref: (_value, _refs) => {
            _refs['popperNode'] = _value;
            popperNode.value = _value;
          }
        }, [renderSlot(_ctx.$slots, "content", {
          close: unref(close),
          isOpen: modifiedIsOpen.value
        }, () => [createTextVNode(toDisplayString$1(unref(content)), 1)]), __props.arrow ? (openBlock(), createBlock(Arrow, {
          key: 0
        })) : createCommentVNode("", true)], 512), [[vShow, unref(shouldShowPopper)]])]),
        _: 3
      })], 36);
    };
  }

};

var css_248z = "\n.inline-block[data-v-5784ed69] {\n    display: inline-block;\n}\n.popper[data-v-5784ed69] {\n    transition: background 250ms ease-in-out;\n    background: var(--popper-theme-background-color);\n    padding: var(--popper-theme-padding);\n    color: var(--popper-theme-text-color);\n    border-radius: var(--popper-theme-border-radius);\n    border-width: var(--popper-theme-border-width);\n    border-style: var(--popper-theme-border-style);\n    border-color: var(--popper-theme-border-color);\n    box-shadow: var(--popper-theme-box-shadow);\n    z-index: var(--c81fc0a4);\n}\n.popper[data-v-5784ed69]:hover,\n  .popper:hover > #arrow[data-v-5784ed69]::before {\n    background: var(--popper-theme-background-color-hover);\n}\n.inline-block[data-v-5784ed69] {\n    display: inline-block;\n}\n.fade-enter-active[data-v-5784ed69],\n  .fade-leave-active[data-v-5784ed69] {\n    transition: opacity 0.2s ease;\n}\n.fade-enter-from[data-v-5784ed69],\n  .fade-leave-to[data-v-5784ed69] {\n    opacity: 0;\n}\n";
styleInject(css_248z);

script$8.__scopeId = "data-v-5784ed69";

// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = script$8; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.component("Popper", installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can

const _hoisted_1$7 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16px",
  height: "16px",
  viewBox: "0 0 24 24",
  "aria-labelledby": "close",
  color: "#000000"
};
const _hoisted_2$6 = /*#__PURE__*/createBaseVNode("title", { id: "close" }, "close icon", -1 /* HOISTED */);
const _hoisted_3$6 = /*#__PURE__*/createBaseVNode("g", { fill: "currentColor" }, [
  /*#__PURE__*/createBaseVNode("path", { d: "M20.6143 3.38571C20.1 2.87143 19.3286 2.87143 18.8143 3.38571L12 10.2L5.18571 3.38571C4.67143 2.87143 3.9 2.87143 3.38571 3.38571C2.87143 3.9 2.87143 4.67143 3.38571 5.18571L10.2 12L3.38571 18.8143C2.87143 19.3286 2.87143 20.1 3.38571 20.6143C3.64286 20.8714 3.9 21 4.28571 21C4.67143 21 4.92857 20.8714 5.18571 20.6143L12 13.8L18.8143 20.6143C19.0714 20.8714 19.4571 21 19.7143 21C19.9714 21 20.3571 20.8714 20.6143 20.6143C21.1286 20.1 21.1286 19.3286 20.6143 18.8143L13.8 12L20.6143 5.18571C21.1286 4.67143 21.1286 3.9 20.6143 3.38571Z" })
], -1 /* HOISTED */);
const _hoisted_4$3 = [
  _hoisted_2$6,
  _hoisted_3$6
];

function render$7(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$7, [..._hoisted_4$3]))
}

const script$7 = {};


script$7.render = render$7;
script$7.__file = "src/components/icons/AutCloseIcon.vue";

const _hoisted_1$6 = {
  width: "6",
  height: "12",
  viewBox: "0 0 6 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$5 = /*#__PURE__*/createBaseVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M0.593243 0.454329C0.855311 0.229677 1.24987 0.260009 1.47453 0.522076L5.82162 5.59318C6.02227 5.82725 6.02227 6.17265 5.82162 6.40672L1.47453 11.4778C1.24987 11.7399 0.855311 11.7702 0.593243 11.5456C0.331176 11.3209 0.300844 10.9264 0.525496 10.6643L4.5239 5.99995L0.525496 1.33561C0.300844 1.07354 0.331176 0.678981 0.593243 0.454329Z",
  fill: "#093DA7"
}, null, -1 /* HOISTED */);
const _hoisted_3$5 = [
  _hoisted_2$5
];

function render$6(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$6, [..._hoisted_3$5]))
}

const script$6 = {};


script$6.render = render$6;
script$6.__file = "src/components/icons/AutChevronRightIcon.vue";

var script$5 = defineComponent({
    name: 'AutInput',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: undefined,
        },
    },
    emits: [
        'update:modelValue',
    ],
    methods: {
        /**
         * On update value event.
         * @param event
         */
        onUpdateValue(event) {
            const target = event.target;
            this.$emit('update:modelValue', target.value);
        },
    },
});

const _hoisted_1$5 = ["value", "placeholder"];

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("input", {
    value: _ctx.modelValue,
    placeholder: _ctx.placeholder,
    class: "aut-input",
    type: "text",
    onInput: _cache[0] || (_cache[0] = (...args) => (_ctx.onUpdateValue && _ctx.onUpdateValue(...args)))
  }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_1$5))
}

script$5.render = render$5;
script$5.__scopeId = "data-v-3c126dc5";
script$5.__file = "src/components/ui/AutInput.vue";

const _hoisted_1$4 = {
  "aria-hidden": "true",
  role: "status",
  class: "inline w-4 h-4 text-gray-200 animate-spin",
  viewBox: "0 0 100 101",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$4 = /*#__PURE__*/createBaseVNode("path", {
  d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
  fill: "currentColor"
}, null, -1 /* HOISTED */);
const _hoisted_3$4 = /*#__PURE__*/createBaseVNode("path", {
  d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
  fill: "#1C64F2"
}, null, -1 /* HOISTED */);
const _hoisted_4$2 = [
  _hoisted_2$4,
  _hoisted_3$4
];

function render$4(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$4, [..._hoisted_4$2]))
}

const script$4 = {};


script$4.render = render$4;
script$4.__file = "src/components/icons/AutLoadingIcon.vue";

const _hoisted_1$3 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-4 h-4"
};
const _hoisted_2$3 = /*#__PURE__*/createBaseVNode("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
}, null, -1 /* HOISTED */);
const _hoisted_3$3 = [
  _hoisted_2$3
];

function render$3(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$3, [..._hoisted_3$3]))
}

const script$3 = {};


script$3.render = render$3;
script$3.__file = "src/components/icons/AutSuccessIcon.vue";

const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  class: "w-4 h-4"
};
const _hoisted_2$2 = /*#__PURE__*/createBaseVNode("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
}, null, -1 /* HOISTED */);
const _hoisted_3$2 = [
  _hoisted_2$2
];

function render$2(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$2, [..._hoisted_3$2]))
}

const script$2 = {};


script$2.render = render$2;
script$2.__file = "src/components/icons/AutErrorIcon.vue";

const _hoisted_1$1 = {
  width: "25px",
  height: "24px",
  viewBox: "0 0 25 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$1 = /*#__PURE__*/createBaseVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M1.90161 11.1448C1.90161 5.36852 6.89125 0.800049 12.9016 0.800049C18.912 0.800049 23.9016 5.36852 23.9016 11.1448C23.9016 16.921 18.912 21.4895 12.9016 21.4895C11.846 21.4895 10.8295 21.3444 9.86722 21.0833L6.97642 22.7719C5.61383 23.5678 3.90161 22.585 3.90161 21.007V17.0763C2.65158 15.4035 1.90161 13.3618 1.90161 11.1448ZM12.9016 2.80005C7.86597 2.80005 3.90161 6.59861 3.90161 11.1448C3.90161 12.9989 4.56223 14.7125 5.68187 16.1092L5.90161 16.3833V21.007C5.90161 21.0167 5.90336 21.0236 5.90336 21.0236C5.90393 21.0256 5.90556 21.0287 5.90556 21.0287C5.90775 21.0324 5.91333 21.0391 5.92367 21.0451C5.93401 21.051 5.94266 21.0524 5.9469 21.0525C5.9469 21.0525 5.95039 21.0523 5.95243 21.0518C5.95243 21.0518 5.95929 21.0498 5.96768 21.0449L9.61093 18.9169L10.0323 19.0485C10.9372 19.3312 11.8993 19.4895 12.9016 19.4895C17.9373 19.4895 21.9016 15.6909 21.9016 11.1448C21.9016 6.59861 17.9373 2.80005 12.9016 2.80005Z",
  fill: "#12121B"
}, null, -1 /* HOISTED */);
const _hoisted_3$1 = /*#__PURE__*/createBaseVNode("path", {
  d: "M9.35533 8.02505C9.05533 8.58005 8.92033 9.19505 8.92033 9.85505H11.0653C11.0653 9.31505 11.2003 8.86505 11.5003 8.53505C11.7853 8.20505 12.1753 8.02505 12.6553 8.02505C13.0753 8.02505 13.4053 8.14505 13.6603 8.37005C13.9003 8.59505 14.0353 8.88005 14.0353 9.24005C14.0353 9.54005 13.9453 9.81005 13.7953 10.035C13.6303 10.275 13.3753 10.5 13.0303 10.71C12.4753 11.04 12.0703 11.355 11.8153 11.67C11.5603 12 11.4403 12.435 11.4403 13.005V13.425H13.4203V13.23C13.4203 12.93 13.5103 12.675 13.6903 12.45C13.8703 12.24 14.2003 11.97 14.6503 11.67C15.1603 11.325 15.5353 10.965 15.8053 10.59C16.0753 10.215 16.2103 9.70505 16.2103 9.04505C16.2103 8.50505 16.0603 8.01005 15.7753 7.57505C15.4753 7.15505 15.0703 6.81005 14.5303 6.57005C13.9903 6.33005 13.3603 6.21005 12.6403 6.21005C11.8603 6.21005 11.2003 6.37505 10.6453 6.70505C10.0753 7.03505 9.65533 7.47005 9.35533 8.02505ZM11.5903 14.82C11.3503 15.045 11.2453 15.33 11.2453 15.675C11.2453 16.035 11.3653 16.32 11.6053 16.545C11.8453 16.785 12.1303 16.89 12.4903 16.89C12.8353 16.89 13.1353 16.785 13.3753 16.545C13.6153 16.32 13.7353 16.035 13.7353 15.675C13.7353 15.33 13.6153 15.045 13.3753 14.82C13.1353 14.595 12.8503 14.475 12.4903 14.475C12.1303 14.475 11.8303 14.595 11.5903 14.82Z",
  fill: "#12121B"
}, null, -1 /* HOISTED */);
const _hoisted_4$1 = [
  _hoisted_2$1,
  _hoisted_3$1
];

function render$1(_ctx, _cache) {
  return (openBlock(), createElementBlock("svg", _hoisted_1$1, [..._hoisted_4$1]))
}

const script$1 = {};


script$1.render = render$1;
script$1.__file = "src/components/icons/AutHelpIcon.vue";

var script = defineComponent({
    name: 'AutTooltip',
    components: {
        AutHelpIcon: script$1,
        AutErrorIcon: script$2,
        AutSuccessIcon: script$3,
        AutLoadingIcon: script$4,
        AutInput: script$5,
        AutButton: script$9,
        AutChevronRightIcon: script$6,
        AutLogo: script$a,
        AutCloseIcon: script$7,
        Popper: entry_esm,
    },
    emits: [
        'update:active',
        'manually-closed',
    ],
    $refs: {
        reference: HTMLInputElement,
    },
    props: {
        active: {
            type: Boolean,
            required: true,
        },
        demo: {
            type: Boolean,
            required: false,
            default: false,
        },
        selection: {
            type: Object,
            required: true,
        },
        orderReference: {
            type: String,
            required: false,
            default: null,
        },
        vin: {
            type: String,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            arrowPadding: 16,
            isReferenceChangedByUser: false,
            state: 'default',
            auteonUrl: null,
            reference: '',
        };
    },
    computed: {
        selectionLayerExtraHeight() {
            return this.placement === 'top'
                ? (this.arrowPadding * 2)
                : (this.arrowPadding / 2);
        },
        placement() {
            return this.selection.placement;
        },
        offsetSkid() {
            return this.placement === 'top' ? 127 : -68;
        },
        offsetDistance() {
            return this.placement === 'top' ? 0 : 14;
        },
        watchedState() {
            return JSON.stringify([
                this.active,
                this.selection.hash,
            ]);
        },
    },
    mounted() {
        this.updateReference();
    },
    updated() {
        this.updateReference();
    },
    watch: {
        watchedState: {
            immediate: true,
            handler() {
                eventBus.clearCallbacks();
                this.state = 'default';
            },
        },
    },
    methods: {
        /**
         * Closes the tooltip by emitting an event to update the 'active' property.
         * Also emits a 'manually-closed' event.
         * @returns {void}
         */
        manuallyCloseTooltip() {
            this.$emit('manually-closed');
            this.closeTooltip();
        },
        /**
         * Closes the tooltip by emitting an event to update the 'active' property.
         * @returns {void}
         */
        closeTooltip() {
            // Emit an event to update the 'active' property.
            this.$emit('update:active', false);
            // Reset some selection properties.
            this.selection.detected = false;
        },
        /**
         * Opens the Auteon URL in a new browser tab.
         * @returns {void}
         */
        async openAuteonUrl() {
            const targetUrl = this.auteonUrl || "https://portal.auteon.com" || '';
            await eventBus.emitAuteonPortalEvent({ name: 'open-url', payload: targetUrl, focus: true }, () => {
                this.closeTooltip();
            });
        },
        /**
         * Marks the reference as changed by the user.
         * @return {void}
         */
        markAsChanged() {
            this.isReferenceChangedByUser = true;
        },
        /**
         * Disables the auto close of the tooltip.
         * @returns {void}
         */
        disableAutoClose() {
            // If the selection was not initially detected, do nothing.
            if (!this.selection.detected)
                return;
            // Temporary disable the auto close behavior of the tooltip.
            this.selection.autoClose = false;
        },
        /**
         * Enables the auto close of the tooltip.
         * @returns {void}
         */
        enableAutoClose() {
            // If the selection was not initially detected, do nothing.
            if (!this.selection.detected)
                return;
            // Enable the auto close behavior of the tooltip.
            this.selection.autoClose = true;
        },
        /**
         * Updates the reference value based on specific conditions.
         * If the reference has been changed by the user, the method exits without making any changes.
         * If the `orderReference` property is provided, the reference value is set to the value of `orderReference`.
         * If the `demo` property is set to true, the reference value is set to a demo value retrieved from the translation file.
         * If none of the conditions above are met, the reference value is automatically set to the first 30 characters of the current website title.
         * @return {void}
         */
        updateReference() {
            // Do nothing if the reference has been changed by the user.
            if (this.isReferenceChangedByUser)
                return;
            // Set the reference to the automatic detected order reference if it is provided.
            if (this.orderReference) {
                this.reference = this.orderReference;
                return;
            }
            // Set the reference to a demo value if the demo state is true.
            if (this.demo) {
                this.reference = this.$t('tooltip.referenceDemoValue');
                return;
            }
            // Automatically set the reference to the title of the current website.
            this.reference = document?.title?.slice(0, 30) || '';
        },
        /**
         * Performs a search using the provided parameters and opens the search URL in a new browser tab.
         * @return {void}
         */
        async performSearch() {
            // Avoid multiple submits.
            if (this.state !== 'default')
                return;
            // Set the state to loading and disable the auto close of the tooltip.
            this.state = 'pending';
            this.disableAutoClose();
            // Do nothing if demo state is true.
            if (this.demo) {
                // Simulate states in demo mode.
                setTimeout(() => (this.state = 'unauthorized'), 2000);
                setTimeout(() => (this.state = 'error'), 4000);
                setTimeout(() => (this.state = 'success'), 6000);
                return;
            }
            // Prepare params.
            const params = new URLSearchParams({
                query: this.selection.text,
                order_reference: this.reference,
                referrer: `browserplugin:${window.location.hostname}`,
                ...(this.selection.quantity ? { requested_quantity: this.selection.quantity.toString() } : {}),
                ...(this.selection.category ? { category: this.selection.category.toString() } : {}),
                ...(this.vin ? { vin: this.vin } : {}),
            });
            const onlyNewTab = await syncedStorage.get('performSearchMode') === 'new-tab';
            await eventBus.emitAuteonPortalEvent({ name: 'search', focus: onlyNewTab, payload: params.toString() }, async (event) => {
                if (event.response?.url)
                    this.auteonUrl = event.response.url;
                if (event.status === 'error')
                    this.state = 'error';
                if (event.status === 'unauthorized')
                    this.state = 'unauthorized';
                if (event.status === 'success') {
                    this.enableAutoClose();
                    this.state = 'success';
                }
            });
            if (onlyNewTab) {
                this.closeTooltip();
            }
        },
    },
});

const _hoisted_1 = { class: "font-sans text-base z-10" };
const _hoisted_2 = { class: "flex flex-row justify-between items-center" };
const _hoisted_3 = { class: "relative" };
const _hoisted_4 = { class: "text-primary" };
const _hoisted_5 = { class: "w-full my-1 text-2xl font-bold truncate" };
const _hoisted_6 = { class: "mb-4" };
const _hoisted_7 = {
  for: "auteon-reference",
  class: "block text-xs font-medium leading-6 text-gray-700"
};
const _hoisted_8 = {
  key: "pending",
  class: "flex flex-row items-center gap-2"
};
const _hoisted_9 = {
  key: "default",
  class: "flex flex-row items-center gap-2"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AutLogo = resolveComponent("AutLogo");
  const _component_AutCloseIcon = resolveComponent("AutCloseIcon");
  const _component_AutHelpIcon = resolveComponent("AutHelpIcon");
  const _component_AutSuccessIcon = resolveComponent("AutSuccessIcon");
  const _component_AutButton = resolveComponent("AutButton");
  const _component_AutInput = resolveComponent("AutInput");
  const _component_AutLoadingIcon = resolveComponent("AutLoadingIcon");
  const _component_AutErrorIcon = resolveComponent("AutErrorIcon");
  const _component_AutChevronRightIcon = resolveComponent("AutChevronRightIcon");
  const _component_Popper = resolveComponent("Popper");

  return (_ctx.active)
    ? (openBlock(), createBlock(_component_Popper, {
        key: 0,
        arrowPadding: _ctx.arrowPadding,
        offsetSkid: _ctx.offsetSkid,
        offsetDistance: _ctx.offsetDistance,
        placement: _ctx.placement,
        locked: _ctx.demo,
        arrow: "",
        show: ""
      }, {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createVNode(_component_AutLogo, { class: "text-primary" }),
              createBaseVNode("button", {
                class: "appearance-none bg-gray-350 rounded-full p-2 hover:bg-gray-300",
                onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.manuallyCloseTooltip && _ctx.manuallyCloseTooltip(...args)))
              }, [
                (!_ctx.selection.detected)
                  ? (openBlock(), createBlock(_component_AutCloseIcon, { key: 0 }))
                  : (openBlock(), createBlock(_component_AutHelpIcon, { key: 1 }))
              ])
            ]),
            createBaseVNode("div", _hoisted_3, [
              createCommentVNode(" Success overlay"),
              createBaseVNode("div", {
                class: normalizeClass({
              'absolute left-0 top-0 w-full h-full flex flex-col gap-2 items-center justify-center text-primary transition-all': true,
              'opacity-0 pointer-events-none': _ctx.state !== 'success',
            })
              }, [
                createVNode(_component_AutSuccessIcon, { class: "!w-12 !h-12" }),
                createVNode(_component_AutButton, {
                  color: "transparent",
                  onClick: _ctx.openAuteonUrl
                }, {
                  default: withCtx(() => [
                    createBaseVNode("span", _hoisted_4, toDisplayString$1(_ctx.$t('tooltip.searchShow')), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick"])
              ], 2 /* CLASS */),
              createCommentVNode(" Tooltip content "),
              createBaseVNode("div", {
                class: normalizeClass({
              'transition-all': true,
              'grayscale opacity-70 pointer-events-none': _ctx.state === 'pending',
              'opacity-0 pointer-events-none': _ctx.state === 'success',
            })
              }, [
                createBaseVNode("form", {
                  onSubmit: _cache[5] || (_cache[5] = withModifiers((...args) => (_ctx.performSearch && _ctx.performSearch(...args)), ["prevent","stop"]))
                }, [
                  createBaseVNode("div", _hoisted_5, toDisplayString$1(_ctx.selection.text || 'invalid selection'), 1 /* TEXT */),
                  createBaseVNode("div", _hoisted_6, [
                    createBaseVNode("label", _hoisted_7, toDisplayString$1(_ctx.$t('tooltip.referenceLabel')), 1 /* TEXT */),
                    createVNode(_component_AutInput, {
                      id: "auteon-reference",
                      ref: "reference",
                      modelValue: _ctx.reference,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.reference) = $event)),
                      placeholder: _ctx.$t('tooltip.referencePlaceholder'),
                      onFocus: _ctx.disableAutoClose,
                      onBlur: _ctx.enableAutoClose,
                      onChange: _ctx.markAsChanged
                    }, null, 8 /* PROPS */, ["modelValue", "placeholder", "onFocus", "onBlur", "onChange"])
                  ]),
                  createVNode(_component_AutButton, { color: "transparent" }, {
                    default: withCtx(() => [
                      createVNode(Transition, {
                        mode: "out-in",
                        name: "fade"
                      }, {
                        default: withCtx(() => [
                          (_ctx.state === 'pending')
                            ? (openBlock(), createElementBlock("div", _hoisted_8, [
                                createVNode(_component_AutLoadingIcon),
                                createBaseVNode("span", null, toDisplayString$1(_ctx.$t('tooltip.searchLoading')), 1 /* TEXT */)
                              ]))
                            : (_ctx.state === 'error')
                              ? (openBlock(), createElementBlock("div", {
                                  key: "error",
                                  class: "flex flex-row items-center gap-2 text-red-500",
                                  onClick: _cache[3] || (_cache[3] = withModifiers($event => (_ctx.state = 'default'), ["prevent","stop"]))
                                }, [
                                  createVNode(_component_AutErrorIcon),
                                  createBaseVNode("span", null, toDisplayString$1(_ctx.$t('tooltip.searchError')), 1 /* TEXT */)
                                ]))
                              : (_ctx.state === 'unauthorized')
                                ? (openBlock(), createElementBlock("div", {
                                    key: "unauthorized",
                                    class: "flex flex-row items-center gap-2 text-orange-500",
                                    onClick: _cache[4] || (_cache[4] = withModifiers($event => (_ctx.state = 'default'), ["prevent","stop"]))
                                  }, [
                                    createVNode(_component_AutErrorIcon),
                                    createBaseVNode("span", null, toDisplayString$1(_ctx.$t('tooltip.searchUnauthorized')), 1 /* TEXT */)
                                  ]))
                                : (openBlock(), createElementBlock("div", _hoisted_9, [
                                    createBaseVNode("span", null, toDisplayString$1(_ctx.$t('tooltip.searchButton')), 1 /* TEXT */),
                                    createVNode(_component_AutChevronRightIcon)
                                  ]))
                        ]),
                        _: 1 /* STABLE */
                      })
                    ]),
                    _: 1 /* STABLE */
                  })
                ], 32 /* NEED_HYDRATION */)
              ], 2 /* CLASS */)
            ])
          ])
        ]),
        default: withCtx(() => [
          createBaseVNode("div", {
            class: "relative",
            style: normalizeStyle(`
        width: ${_ctx.selection.width}px;
        height: ${_ctx.selection.height + _ctx.selectionLayerExtraHeight}px;
      `),
            onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.closeTooltip && _ctx.closeTooltip(...args)))
          }, null, 4 /* STYLE */)
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["arrowPadding", "offsetSkid", "offsetDistance", "placement", "locked"]))
    : createCommentVNode("v-if", true)
}

script.render = render;
script.__file = "src/content-scripts/AutTooltip.vue";

export { script$3 as a, script$2 as b, script$5 as c, script$6 as d, script$7 as e, script as f, script$4 as s };
