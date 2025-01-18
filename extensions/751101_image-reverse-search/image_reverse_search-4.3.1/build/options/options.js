import {
  __commonJS,
  __toESM,
  arraymove,
  base64EncodeIcon,
  defaultOptions,
  getLowerIndex,
  getMessage,
  getOptions,
  getUpperIndex,
  isFirefox,
  newProvider
} from "../chunk-JQ4RUT3N.js";

// node_modules/@popperjs/core/dist/cjs/popper.js
var require_popper = __commonJS({
  "node_modules/@popperjs/core/dist/cjs/popper.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getWindow(node) {
      if (node == null) {
        return window;
      }
      if (node.toString() !== "[object Window]") {
        var ownerDocument = node.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
      }
      return node;
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
      if (typeof ShadowRoot === "undefined") {
        return false;
      }
      var OwnElement = getWindow(node).ShadowRoot;
      return node instanceof OwnElement || node instanceof ShadowRoot;
    }
    var max = Math.max;
    var min = Math.min;
    var round = Math.round;
    function getUAString() {
      var uaData = navigator.userAgentData;
      if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
        return uaData.brands.map(function(item) {
          return item.brand + "/" + item.version;
        }).join(" ");
      }
      return navigator.userAgent;
    }
    function isLayoutViewport() {
      return !/^((?!chrome|android).)*safari/i.test(getUAString());
    }
    function getBoundingClientRect(element2, includeScale, isFixedStrategy) {
      if (includeScale === void 0) {
        includeScale = false;
      }
      if (isFixedStrategy === void 0) {
        isFixedStrategy = false;
      }
      var clientRect = element2.getBoundingClientRect();
      var scaleX = 1;
      var scaleY = 1;
      if (includeScale && isHTMLElement(element2)) {
        scaleX = element2.offsetWidth > 0 ? round(clientRect.width) / element2.offsetWidth || 1 : 1;
        scaleY = element2.offsetHeight > 0 ? round(clientRect.height) / element2.offsetHeight || 1 : 1;
      }
      var _ref = isElement(element2) ? getWindow(element2) : window, visualViewport = _ref.visualViewport;
      var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
      var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
      var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
      var width = clientRect.width / scaleX;
      var height = clientRect.height / scaleY;
      return {
        width,
        height,
        top: y,
        right: x + width,
        bottom: y + height,
        left: x,
        x,
        y
      };
    }
    function getWindowScroll(node) {
      var win = getWindow(node);
      var scrollLeft = win.pageXOffset;
      var scrollTop = win.pageYOffset;
      return {
        scrollLeft,
        scrollTop
      };
    }
    function getHTMLElementScroll(element2) {
      return {
        scrollLeft: element2.scrollLeft,
        scrollTop: element2.scrollTop
      };
    }
    function getNodeScroll(node) {
      if (node === getWindow(node) || !isHTMLElement(node)) {
        return getWindowScroll(node);
      } else {
        return getHTMLElementScroll(node);
      }
    }
    function getNodeName(element2) {
      return element2 ? (element2.nodeName || "").toLowerCase() : null;
    }
    function getDocumentElement(element2) {
      return ((isElement(element2) ? element2.ownerDocument : (
        // $FlowFixMe[prop-missing]
        element2.document
      )) || window.document).documentElement;
    }
    function getWindowScrollBarX(element2) {
      return getBoundingClientRect(getDocumentElement(element2)).left + getWindowScroll(element2).scrollLeft;
    }
    function getComputedStyle2(element2) {
      return getWindow(element2).getComputedStyle(element2);
    }
    function isScrollParent(element2) {
      var _getComputedStyle = getComputedStyle2(element2), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
      return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
    }
    function isElementScaled(element2) {
      var rect = element2.getBoundingClientRect();
      var scaleX = round(rect.width) / element2.offsetWidth || 1;
      var scaleY = round(rect.height) / element2.offsetHeight || 1;
      return scaleX !== 1 || scaleY !== 1;
    }
    function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
      if (isFixed === void 0) {
        isFixed = false;
      }
      var isOffsetParentAnElement = isHTMLElement(offsetParent);
      var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
      var documentElement = getDocumentElement(offsetParent);
      var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
      var scroll = {
        scrollLeft: 0,
        scrollTop: 0
      };
      var offsets = {
        x: 0,
        y: 0
      };
      if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
        isScrollParent(documentElement)) {
          scroll = getNodeScroll(offsetParent);
        }
        if (isHTMLElement(offsetParent)) {
          offsets = getBoundingClientRect(offsetParent, true);
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
    function getLayoutRect(element2) {
      var clientRect = getBoundingClientRect(element2);
      var width = element2.offsetWidth;
      var height = element2.offsetHeight;
      if (Math.abs(clientRect.width - width) <= 1) {
        width = clientRect.width;
      }
      if (Math.abs(clientRect.height - height) <= 1) {
        height = clientRect.height;
      }
      return {
        x: element2.offsetLeft,
        y: element2.offsetTop,
        width,
        height
      };
    }
    function getParentNode(element2) {
      if (getNodeName(element2) === "html") {
        return element2;
      }
      return (
        // this is a quicker (but less type safe) way to save quite some bytes from the bundle
        // $FlowFixMe[incompatible-return]
        // $FlowFixMe[prop-missing]
        element2.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element2.parentNode || // DOM Element detected
        (isShadowRoot(element2) ? element2.host : null) || // ShadowRoot detected
        // $FlowFixMe[incompatible-call]: HTMLElement is a Node
        getDocumentElement(element2)
      );
    }
    function getScrollParent(node) {
      if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
        return node.ownerDocument.body;
      }
      if (isHTMLElement(node) && isScrollParent(node)) {
        return node;
      }
      return getScrollParent(getParentNode(node));
    }
    function listScrollParents(element2, list) {
      var _element$ownerDocumen;
      if (list === void 0) {
        list = [];
      }
      var scrollParent = getScrollParent(element2);
      var isBody = scrollParent === ((_element$ownerDocumen = element2.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
      var win = getWindow(scrollParent);
      var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
      var updatedList = list.concat(target);
      return isBody ? updatedList : (
        // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
        updatedList.concat(listScrollParents(getParentNode(target)))
      );
    }
    function isTableElement(element2) {
      return ["table", "td", "th"].indexOf(getNodeName(element2)) >= 0;
    }
    function getTrueOffsetParent(element2) {
      if (!isHTMLElement(element2) || // https://github.com/popperjs/popper-core/issues/837
      getComputedStyle2(element2).position === "fixed") {
        return null;
      }
      return element2.offsetParent;
    }
    function getContainingBlock(element2) {
      var isFirefox2 = /firefox/i.test(getUAString());
      var isIE = /Trident/i.test(getUAString());
      if (isIE && isHTMLElement(element2)) {
        var elementCss = getComputedStyle2(element2);
        if (elementCss.position === "fixed") {
          return null;
        }
      }
      var currentNode = getParentNode(element2);
      if (isShadowRoot(currentNode)) {
        currentNode = currentNode.host;
      }
      while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
        var css = getComputedStyle2(currentNode);
        if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox2 && css.willChange === "filter" || isFirefox2 && css.filter && css.filter !== "none") {
          return currentNode;
        } else {
          currentNode = currentNode.parentNode;
        }
      }
      return null;
    }
    function getOffsetParent(element2) {
      var window2 = getWindow(element2);
      var offsetParent = getTrueOffsetParent(element2);
      while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
        offsetParent = getTrueOffsetParent(offsetParent);
      }
      if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
        return window2;
      }
      return offsetParent || getContainingBlock(element2) || window2;
    }
    var top = "top";
    var bottom = "bottom";
    var right = "right";
    var left = "left";
    var auto = "auto";
    var basePlacements = [top, bottom, right, left];
    var start = "start";
    var end = "end";
    var clippingParents = "clippingParents";
    var viewport = "viewport";
    var popper = "popper";
    var reference = "reference";
    var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
      return acc.concat([placement + "-" + start, placement + "-" + end]);
    }, []);
    var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
      return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
    }, []);
    var beforeRead = "beforeRead";
    var read = "read";
    var afterRead = "afterRead";
    var beforeMain = "beforeMain";
    var main = "main";
    var afterMain = "afterMain";
    var beforeWrite = "beforeWrite";
    var write = "write";
    var afterWrite = "afterWrite";
    var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
    function order(modifiers) {
      var map = /* @__PURE__ */ new Map();
      var visited = /* @__PURE__ */ new Set();
      var result = [];
      modifiers.forEach(function(modifier) {
        map.set(modifier.name, modifier);
      });
      function sort(modifier) {
        visited.add(modifier.name);
        var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
        requires.forEach(function(dep) {
          if (!visited.has(dep)) {
            var depModifier = map.get(dep);
            if (depModifier) {
              sort(depModifier);
            }
          }
        });
        result.push(modifier);
      }
      modifiers.forEach(function(modifier) {
        if (!visited.has(modifier.name)) {
          sort(modifier);
        }
      });
      return result;
    }
    function orderModifiers(modifiers) {
      var orderedModifiers = order(modifiers);
      return modifierPhases.reduce(function(acc, phase) {
        return acc.concat(orderedModifiers.filter(function(modifier) {
          return modifier.phase === phase;
        }));
      }, []);
    }
    function debounce(fn) {
      var pending;
      return function() {
        if (!pending) {
          pending = new Promise(function(resolve) {
            Promise.resolve().then(function() {
              pending = void 0;
              resolve(fn());
            });
          });
        }
        return pending;
      };
    }
    function mergeByName(modifiers) {
      var merged = modifiers.reduce(function(merged2, current) {
        var existing = merged2[current.name];
        merged2[current.name] = existing ? Object.assign({}, existing, current, {
          options: Object.assign({}, existing.options, current.options),
          data: Object.assign({}, existing.data, current.data)
        }) : current;
        return merged2;
      }, {});
      return Object.keys(merged).map(function(key) {
        return merged[key];
      });
    }
    function getViewportRect(element2, strategy) {
      var win = getWindow(element2);
      var html = getDocumentElement(element2);
      var visualViewport = win.visualViewport;
      var width = html.clientWidth;
      var height = html.clientHeight;
      var x = 0;
      var y = 0;
      if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height;
        var layoutViewport = isLayoutViewport();
        if (layoutViewport || !layoutViewport && strategy === "fixed") {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }
      return {
        width,
        height,
        x: x + getWindowScrollBarX(element2),
        y
      };
    }
    function getDocumentRect(element2) {
      var _element$ownerDocumen;
      var html = getDocumentElement(element2);
      var winScroll = getWindowScroll(element2);
      var body = (_element$ownerDocumen = element2.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
      var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
      var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
      var x = -winScroll.scrollLeft + getWindowScrollBarX(element2);
      var y = -winScroll.scrollTop;
      if (getComputedStyle2(body || html).direction === "rtl") {
        x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
      }
      return {
        width,
        height,
        x,
        y
      };
    }
    function contains(parent, child) {
      var rootNode = child.getRootNode && child.getRootNode();
      if (parent.contains(child)) {
        return true;
      } else if (rootNode && isShadowRoot(rootNode)) {
        var next = child;
        do {
          if (next && parent.isSameNode(next)) {
            return true;
          }
          next = next.parentNode || next.host;
        } while (next);
      }
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
    function getInnerBoundingClientRect(element2, strategy) {
      var rect = getBoundingClientRect(element2, false, strategy === "fixed");
      rect.top = rect.top + element2.clientTop;
      rect.left = rect.left + element2.clientLeft;
      rect.bottom = rect.top + element2.clientHeight;
      rect.right = rect.left + element2.clientWidth;
      rect.width = element2.clientWidth;
      rect.height = element2.clientHeight;
      rect.x = rect.left;
      rect.y = rect.top;
      return rect;
    }
    function getClientRectFromMixedType(element2, clippingParent, strategy) {
      return clippingParent === viewport ? rectToClientRect(getViewportRect(element2, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element2)));
    }
    function getClippingParents(element2) {
      var clippingParents2 = listScrollParents(getParentNode(element2));
      var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element2).position) >= 0;
      var clipperElement = canEscapeClipping && isHTMLElement(element2) ? getOffsetParent(element2) : element2;
      if (!isElement(clipperElement)) {
        return [];
      }
      return clippingParents2.filter(function(clippingParent) {
        return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
      });
    }
    function getClippingRect(element2, boundary, rootBoundary, strategy) {
      var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element2) : [].concat(boundary);
      var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
      var firstClippingParent = clippingParents2[0];
      var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
        var rect = getClientRectFromMixedType(element2, clippingParent, strategy);
        accRect.top = max(rect.top, accRect.top);
        accRect.right = min(rect.right, accRect.right);
        accRect.bottom = min(rect.bottom, accRect.bottom);
        accRect.left = max(rect.left, accRect.left);
        return accRect;
      }, getClientRectFromMixedType(element2, firstClippingParent, strategy));
      clippingRect.width = clippingRect.right - clippingRect.left;
      clippingRect.height = clippingRect.bottom - clippingRect.top;
      clippingRect.x = clippingRect.left;
      clippingRect.y = clippingRect.top;
      return clippingRect;
    }
    function getBasePlacement(placement) {
      return placement.split("-")[0];
    }
    function getVariation(placement) {
      return placement.split("-")[1];
    }
    function getMainAxisFromPlacement(placement) {
      return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
    }
    function computeOffsets(_ref) {
      var reference2 = _ref.reference, element2 = _ref.element, placement = _ref.placement;
      var basePlacement = placement ? getBasePlacement(placement) : null;
      var variation = placement ? getVariation(placement) : null;
      var commonX = reference2.x + reference2.width / 2 - element2.width / 2;
      var commonY = reference2.y + reference2.height / 2 - element2.height / 2;
      var offsets;
      switch (basePlacement) {
        case top:
          offsets = {
            x: commonX,
            y: reference2.y - element2.height
          };
          break;
        case bottom:
          offsets = {
            x: commonX,
            y: reference2.y + reference2.height
          };
          break;
        case right:
          offsets = {
            x: reference2.x + reference2.width,
            y: commonY
          };
          break;
        case left:
          offsets = {
            x: reference2.x - element2.width,
            y: commonY
          };
          break;
        default:
          offsets = {
            x: reference2.x,
            y: reference2.y
          };
      }
      var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
      if (mainAxis != null) {
        var len = mainAxis === "y" ? "height" : "width";
        switch (variation) {
          case start:
            offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element2[len] / 2);
            break;
          case end:
            offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element2[len] / 2);
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
      return keys.reduce(function(hashMap, key) {
        hashMap[key] = value;
        return hashMap;
      }, {});
    }
    function detectOverflow(state, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      var _options = options2, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
      var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
      var altContext = elementContext === popper ? reference : popper;
      var popperRect = state.rects.popper;
      var element2 = state.elements[altBoundary ? altContext : elementContext];
      var clippingClientRect = getClippingRect(isElement(element2) ? element2 : element2.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
      var referenceClientRect = getBoundingClientRect(state.elements.reference);
      var popperOffsets2 = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: "absolute",
        placement
      });
      var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
      var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
      var overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right: elementClientRect.right - clippingClientRect.right + paddingObject.right
      };
      var offsetData = state.modifiersData.offset;
      if (elementContext === popper && offsetData) {
        var offset2 = offsetData[placement];
        Object.keys(overflowOffsets).forEach(function(key) {
          var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
          var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
          overflowOffsets[key] += offset2[axis] * multiply;
        });
      }
      return overflowOffsets;
    }
    var DEFAULT_OPTIONS = {
      placement: "bottom",
      modifiers: [],
      strategy: "absolute"
    };
    function areValidElements() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return !args.some(function(element2) {
        return !(element2 && typeof element2.getBoundingClientRect === "function");
      });
    }
    function popperGenerator(generatorOptions) {
      if (generatorOptions === void 0) {
        generatorOptions = {};
      }
      var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
      return function createPopper2(reference2, popper2, options2) {
        if (options2 === void 0) {
          options2 = defaultOptions2;
        }
        var state = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions2),
          modifiersData: {},
          elements: {
            reference: reference2,
            popper: popper2
          },
          attributes: {},
          styles: {}
        };
        var effectCleanupFns = [];
        var isDestroyed = false;
        var instance4 = {
          state,
          setOptions: function setOptions(setOptionsAction) {
            var options3 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
            cleanupModifierEffects();
            state.options = Object.assign({}, defaultOptions2, state.options, options3);
            state.scrollParents = {
              reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
              popper: listScrollParents(popper2)
            };
            var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
            state.orderedModifiers = orderedModifiers.filter(function(m) {
              return m.enabled;
            });
            runModifierEffects();
            return instance4.update();
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
            var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
            if (!areValidElements(reference3, popper3)) {
              return;
            }
            state.rects = {
              reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
              popper: getLayoutRect(popper3)
            };
            state.reset = false;
            state.placement = state.options.placement;
            state.orderedModifiers.forEach(function(modifier) {
              return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
            });
            for (var index = 0; index < state.orderedModifiers.length; index++) {
              if (state.reset === true) {
                state.reset = false;
                index = -1;
                continue;
              }
              var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
              if (typeof fn === "function") {
                state = fn({
                  state,
                  options: _options,
                  name,
                  instance: instance4
                }) || state;
              }
            }
          },
          // Async and optimistically optimized update – it will not be executed if
          // not necessary (debounced to run at most once-per-tick)
          update: debounce(function() {
            return new Promise(function(resolve) {
              instance4.forceUpdate();
              resolve(state);
            });
          }),
          destroy: function destroy() {
            cleanupModifierEffects();
            isDestroyed = true;
          }
        };
        if (!areValidElements(reference2, popper2)) {
          return instance4;
        }
        instance4.setOptions(options2).then(function(state2) {
          if (!isDestroyed && options2.onFirstUpdate) {
            options2.onFirstUpdate(state2);
          }
        });
        function runModifierEffects() {
          state.orderedModifiers.forEach(function(_ref) {
            var name = _ref.name, _ref$options = _ref.options, options3 = _ref$options === void 0 ? {} : _ref$options, effect2 = _ref.effect;
            if (typeof effect2 === "function") {
              var cleanupFn = effect2({
                state,
                name,
                instance: instance4,
                options: options3
              });
              var noopFn = function noopFn2() {
              };
              effectCleanupFns.push(cleanupFn || noopFn);
            }
          });
        }
        function cleanupModifierEffects() {
          effectCleanupFns.forEach(function(fn) {
            return fn();
          });
          effectCleanupFns = [];
        }
        return instance4;
      };
    }
    var passive = {
      passive: true
    };
    function effect$2(_ref) {
      var state = _ref.state, instance4 = _ref.instance, options2 = _ref.options;
      var _options$scroll = options2.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options2.resize, resize = _options$resize === void 0 ? true : _options$resize;
      var window2 = getWindow(state.elements.popper);
      var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
      if (scroll) {
        scrollParents.forEach(function(scrollParent) {
          scrollParent.addEventListener("scroll", instance4.update, passive);
        });
      }
      if (resize) {
        window2.addEventListener("resize", instance4.update, passive);
      }
      return function() {
        if (scroll) {
          scrollParents.forEach(function(scrollParent) {
            scrollParent.removeEventListener("scroll", instance4.update, passive);
          });
        }
        if (resize) {
          window2.removeEventListener("resize", instance4.update, passive);
        }
      };
    }
    var eventListeners = {
      name: "eventListeners",
      enabled: true,
      phase: "write",
      fn: function fn() {
      },
      effect: effect$2,
      data: {}
    };
    function popperOffsets(_ref) {
      var state = _ref.state, name = _ref.name;
      state.modifiersData[name] = computeOffsets({
        reference: state.rects.reference,
        element: state.rects.popper,
        strategy: "absolute",
        placement: state.placement
      });
    }
    var popperOffsets$1 = {
      name: "popperOffsets",
      enabled: true,
      phase: "read",
      fn: popperOffsets,
      data: {}
    };
    var unsetSides = {
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto"
    };
    function roundOffsetsByDPR(_ref, win) {
      var x = _ref.x, y = _ref.y;
      var dpr = win.devicePixelRatio || 1;
      return {
        x: round(x * dpr) / dpr || 0,
        y: round(y * dpr) / dpr || 0
      };
    }
    function mapToStyles(_ref2) {
      var _Object$assign2;
      var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
      var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
      var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
        x,
        y
      }) : {
        x,
        y
      };
      x = _ref3.x;
      y = _ref3.y;
      var hasX = offsets.hasOwnProperty("x");
      var hasY = offsets.hasOwnProperty("y");
      var sideX = left;
      var sideY = top;
      var win = window;
      if (adaptive) {
        var offsetParent = getOffsetParent(popper2);
        var heightProp = "clientHeight";
        var widthProp = "clientWidth";
        if (offsetParent === getWindow(popper2)) {
          offsetParent = getDocumentElement(popper2);
          if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
            heightProp = "scrollHeight";
            widthProp = "scrollWidth";
          }
        }
        offsetParent = offsetParent;
        if (placement === top || (placement === left || placement === right) && variation === end) {
          sideY = bottom;
          var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
            // $FlowFixMe[prop-missing]
            offsetParent[heightProp]
          );
          y -= offsetY - popperRect.height;
          y *= gpuAcceleration ? 1 : -1;
        }
        if (placement === left || (placement === top || placement === bottom) && variation === end) {
          sideX = right;
          var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
            // $FlowFixMe[prop-missing]
            offsetParent[widthProp]
          );
          x -= offsetX - popperRect.width;
          x *= gpuAcceleration ? 1 : -1;
        }
      }
      var commonStyles = Object.assign({
        position
      }, adaptive && unsetSides);
      var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
        x,
        y
      }, getWindow(popper2)) : {
        x,
        y
      };
      x = _ref4.x;
      y = _ref4.y;
      if (gpuAcceleration) {
        var _Object$assign;
        return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
      }
      return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
    }
    function computeStyles(_ref5) {
      var state = _ref5.state, options2 = _ref5.options;
      var _options$gpuAccelerat = options2.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options2.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options2.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
      var commonStyles = {
        placement: getBasePlacement(state.placement),
        variation: getVariation(state.placement),
        popper: state.elements.popper,
        popperRect: state.rects.popper,
        gpuAcceleration,
        isFixed: state.options.strategy === "fixed"
      };
      if (state.modifiersData.popperOffsets != null) {
        state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.popperOffsets,
          position: state.options.strategy,
          adaptive,
          roundOffsets
        })));
      }
      if (state.modifiersData.arrow != null) {
        state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
          offsets: state.modifiersData.arrow,
          position: "absolute",
          adaptive: false,
          roundOffsets
        })));
      }
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        "data-popper-placement": state.placement
      });
    }
    var computeStyles$1 = {
      name: "computeStyles",
      enabled: true,
      phase: "beforeWrite",
      fn: computeStyles,
      data: {}
    };
    function applyStyles(_ref) {
      var state = _ref.state;
      Object.keys(state.elements).forEach(function(name) {
        var style = state.styles[name] || {};
        var attributes = state.attributes[name] || {};
        var element2 = state.elements[name];
        if (!isHTMLElement(element2) || !getNodeName(element2)) {
          return;
        }
        Object.assign(element2.style, style);
        Object.keys(attributes).forEach(function(name2) {
          var value = attributes[name2];
          if (value === false) {
            element2.removeAttribute(name2);
          } else {
            element2.setAttribute(name2, value === true ? "" : value);
          }
        });
      });
    }
    function effect$1(_ref2) {
      var state = _ref2.state;
      var initialStyles = {
        popper: {
          position: state.options.strategy,
          left: "0",
          top: "0",
          margin: "0"
        },
        arrow: {
          position: "absolute"
        },
        reference: {}
      };
      Object.assign(state.elements.popper.style, initialStyles.popper);
      state.styles = initialStyles;
      if (state.elements.arrow) {
        Object.assign(state.elements.arrow.style, initialStyles.arrow);
      }
      return function() {
        Object.keys(state.elements).forEach(function(name) {
          var element2 = state.elements[name];
          var attributes = state.attributes[name] || {};
          var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
          var style = styleProperties.reduce(function(style2, property) {
            style2[property] = "";
            return style2;
          }, {});
          if (!isHTMLElement(element2) || !getNodeName(element2)) {
            return;
          }
          Object.assign(element2.style, style);
          Object.keys(attributes).forEach(function(attribute) {
            element2.removeAttribute(attribute);
          });
        });
      };
    }
    var applyStyles$1 = {
      name: "applyStyles",
      enabled: true,
      phase: "write",
      fn: applyStyles,
      effect: effect$1,
      requires: ["computeStyles"]
    };
    function distanceAndSkiddingToXY(placement, rects, offset2) {
      var basePlacement = getBasePlacement(placement);
      var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
      var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
        placement
      })) : offset2, skidding = _ref[0], distance = _ref[1];
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
      var state = _ref2.state, options2 = _ref2.options, name = _ref2.name;
      var _options$offset = options2.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
      var data = placements.reduce(function(acc, placement) {
        acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
        return acc;
      }, {});
      var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
      if (state.modifiersData.popperOffsets != null) {
        state.modifiersData.popperOffsets.x += x;
        state.modifiersData.popperOffsets.y += y;
      }
      state.modifiersData[name] = data;
    }
    var offset$1 = {
      name: "offset",
      enabled: true,
      phase: "main",
      requires: ["popperOffsets"],
      fn: offset
    };
    var hash$1 = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    function getOppositePlacement(placement) {
      return placement.replace(/left|right|bottom|top/g, function(matched) {
        return hash$1[matched];
      });
    }
    var hash2 = {
      start: "end",
      end: "start"
    };
    function getOppositeVariationPlacement(placement) {
      return placement.replace(/start|end/g, function(matched) {
        return hash2[matched];
      });
    }
    function computeAutoPlacement(state, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      var _options = options2, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
      var variation = getVariation(placement);
      var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
        return getVariation(placement2) === variation;
      }) : basePlacements;
      var allowedPlacements = placements$1.filter(function(placement2) {
        return allowedAutoPlacements.indexOf(placement2) >= 0;
      });
      if (allowedPlacements.length === 0) {
        allowedPlacements = placements$1;
      }
      var overflows = allowedPlacements.reduce(function(acc, placement2) {
        acc[placement2] = detectOverflow(state, {
          placement: placement2,
          boundary,
          rootBoundary,
          padding
        })[getBasePlacement(placement2)];
        return acc;
      }, {});
      return Object.keys(overflows).sort(function(a, b) {
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
    function flip2(_ref) {
      var state = _ref.state, options2 = _ref.options, name = _ref.name;
      if (state.modifiersData[name]._skip) {
        return;
      }
      var _options$mainAxis = options2.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options2.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options2.fallbackPlacements, padding = options2.padding, boundary = options2.boundary, rootBoundary = options2.rootBoundary, altBoundary = options2.altBoundary, _options$flipVariatio = options2.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options2.allowedAutoPlacements;
      var preferredPlacement = state.options.placement;
      var basePlacement = getBasePlacement(preferredPlacement);
      var isBasePlacement = basePlacement === preferredPlacement;
      var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
      var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
        return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
          placement: placement2,
          boundary,
          rootBoundary,
          padding,
          flipVariations,
          allowedAutoPlacements
        }) : placement2);
      }, []);
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var checksMap = /* @__PURE__ */ new Map();
      var makeFallbackChecks = true;
      var firstFittingPlacement = placements2[0];
      for (var i = 0; i < placements2.length; i++) {
        var placement = placements2[i];
        var _basePlacement = getBasePlacement(placement);
        var isStartVariation = getVariation(placement) === start;
        var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
        var len = isVertical ? "width" : "height";
        var overflow = detectOverflow(state, {
          placement,
          boundary,
          rootBoundary,
          altBoundary,
          padding
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
        if (checks.every(function(check) {
          return check;
        })) {
          firstFittingPlacement = placement;
          makeFallbackChecks = false;
          break;
        }
        checksMap.set(placement, checks);
      }
      if (makeFallbackChecks) {
        var numberOfChecks = flipVariations ? 3 : 1;
        var _loop = function _loop2(_i2) {
          var fittingPlacement = placements2.find(function(placement2) {
            var checks2 = checksMap.get(placement2);
            if (checks2) {
              return checks2.slice(0, _i2).every(function(check) {
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
    }
    var flip$1 = {
      name: "flip",
      enabled: true,
      phase: "main",
      fn: flip2,
      requiresIfExists: ["offset"],
      data: {
        _skip: false
      }
    };
    function getAltAxis(axis) {
      return axis === "x" ? "y" : "x";
    }
    function within(min$1, value, max$1) {
      return max(min$1, min(value, max$1));
    }
    function withinMaxClamp(min2, value, max2) {
      var v = within(min2, value, max2);
      return v > max2 ? max2 : v;
    }
    function preventOverflow(_ref) {
      var state = _ref.state, options2 = _ref.options, name = _ref.name;
      var _options$mainAxis = options2.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options2.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options2.boundary, rootBoundary = options2.rootBoundary, altBoundary = options2.altBoundary, padding = options2.padding, _options$tether = options2.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options2.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
      var overflow = detectOverflow(state, {
        boundary,
        rootBoundary,
        padding,
        altBoundary
      });
      var basePlacement = getBasePlacement(state.placement);
      var variation = getVariation(state.placement);
      var isBasePlacement = !variation;
      var mainAxis = getMainAxisFromPlacement(basePlacement);
      var altAxis = getAltAxis(mainAxis);
      var popperOffsets2 = state.modifiersData.popperOffsets;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
        placement: state.placement
      })) : tetherOffset;
      var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
        mainAxis: tetherOffsetValue,
        altAxis: tetherOffsetValue
      } : Object.assign({
        mainAxis: 0,
        altAxis: 0
      }, tetherOffsetValue);
      var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
      var data = {
        x: 0,
        y: 0
      };
      if (!popperOffsets2) {
        return;
      }
      if (checkMainAxis) {
        var _offsetModifierState$;
        var mainSide = mainAxis === "y" ? top : left;
        var altSide = mainAxis === "y" ? bottom : right;
        var len = mainAxis === "y" ? "height" : "width";
        var offset2 = popperOffsets2[mainAxis];
        var min$1 = offset2 + overflow[mainSide];
        var max$1 = offset2 - overflow[altSide];
        var additive = tether ? -popperRect[len] / 2 : 0;
        var minLen = variation === start ? referenceRect[len] : popperRect[len];
        var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
        var arrowElement = state.elements.arrow;
        var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
          width: 0,
          height: 0
        };
        var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
        var arrowPaddingMin = arrowPaddingObject[mainSide];
        var arrowPaddingMax = arrowPaddingObject[altSide];
        var arrowLen = within(0, referenceRect[len], arrowRect[len]);
        var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
        var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
        var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
        var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
        var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
        var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
        var tetherMax = offset2 + maxOffset - offsetModifierValue;
        var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
        popperOffsets2[mainAxis] = preventedOffset;
        data[mainAxis] = preventedOffset - offset2;
      }
      if (checkAltAxis) {
        var _offsetModifierState$2;
        var _mainSide = mainAxis === "x" ? top : left;
        var _altSide = mainAxis === "x" ? bottom : right;
        var _offset = popperOffsets2[altAxis];
        var _len = altAxis === "y" ? "height" : "width";
        var _min = _offset + overflow[_mainSide];
        var _max = _offset - overflow[_altSide];
        var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
        var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
        var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
        var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
        var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
        popperOffsets2[altAxis] = _preventedOffset;
        data[altAxis] = _preventedOffset - _offset;
      }
      state.modifiersData[name] = data;
    }
    var preventOverflow$1 = {
      name: "preventOverflow",
      enabled: true,
      phase: "main",
      fn: preventOverflow,
      requiresIfExists: ["offset"]
    };
    var toPaddingObject = function toPaddingObject2(padding, state) {
      padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
        placement: state.placement
      })) : padding;
      return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    };
    function arrow(_ref) {
      var _state$modifiersData$;
      var state = _ref.state, name = _ref.name, options2 = _ref.options;
      var arrowElement = state.elements.arrow;
      var popperOffsets2 = state.modifiersData.popperOffsets;
      var basePlacement = getBasePlacement(state.placement);
      var axis = getMainAxisFromPlacement(basePlacement);
      var isVertical = [left, right].indexOf(basePlacement) >= 0;
      var len = isVertical ? "height" : "width";
      if (!arrowElement || !popperOffsets2) {
        return;
      }
      var paddingObject = toPaddingObject(options2.padding, state);
      var arrowRect = getLayoutRect(arrowElement);
      var minProp = axis === "y" ? top : left;
      var maxProp = axis === "y" ? bottom : right;
      var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
      var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
      var arrowOffsetParent = getOffsetParent(arrowElement);
      var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
      var centerToReference = endDiff / 2 - startDiff / 2;
      var min2 = paddingObject[minProp];
      var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
      var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
      var offset2 = within(min2, center, max2);
      var axisProp = axis;
      state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
    }
    function effect(_ref2) {
      var state = _ref2.state, options2 = _ref2.options;
      var _options$element = options2.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
      if (arrowElement == null) {
        return;
      }
      if (typeof arrowElement === "string") {
        arrowElement = state.elements.popper.querySelector(arrowElement);
        if (!arrowElement) {
          return;
        }
      }
      if (!contains(state.elements.popper, arrowElement)) {
        return;
      }
      state.elements.arrow = arrowElement;
    }
    var arrow$1 = {
      name: "arrow",
      enabled: true,
      phase: "main",
      fn: arrow,
      effect,
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"]
    };
    function getSideOffsets(overflow, rect, preventedOffsets) {
      if (preventedOffsets === void 0) {
        preventedOffsets = {
          x: 0,
          y: 0
        };
      }
      return {
        top: overflow.top - rect.height - preventedOffsets.y,
        right: overflow.right - rect.width + preventedOffsets.x,
        bottom: overflow.bottom - rect.height + preventedOffsets.y,
        left: overflow.left - rect.width - preventedOffsets.x
      };
    }
    function isAnySideFullyClipped(overflow) {
      return [top, right, bottom, left].some(function(side) {
        return overflow[side] >= 0;
      });
    }
    function hide(_ref) {
      var state = _ref.state, name = _ref.name;
      var referenceRect = state.rects.reference;
      var popperRect = state.rects.popper;
      var preventedOffsets = state.modifiersData.preventOverflow;
      var referenceOverflow = detectOverflow(state, {
        elementContext: "reference"
      });
      var popperAltOverflow = detectOverflow(state, {
        altBoundary: true
      });
      var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
      var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
      var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
      var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
      state.modifiersData[name] = {
        referenceClippingOffsets,
        popperEscapeOffsets,
        isReferenceHidden,
        hasPopperEscaped
      };
      state.attributes.popper = Object.assign({}, state.attributes.popper, {
        "data-popper-reference-hidden": isReferenceHidden,
        "data-popper-escaped": hasPopperEscaped
      });
    }
    var hide$1 = {
      name: "hide",
      enabled: true,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: hide
    };
    var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
    var createPopper$1 = /* @__PURE__ */ popperGenerator({
      defaultModifiers: defaultModifiers$1
    });
    var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
    var createPopper = /* @__PURE__ */ popperGenerator({
      defaultModifiers
    });
    exports.applyStyles = applyStyles$1;
    exports.arrow = arrow$1;
    exports.computeStyles = computeStyles$1;
    exports.createPopper = createPopper;
    exports.createPopperLite = createPopper$1;
    exports.defaultModifiers = defaultModifiers;
    exports.detectOverflow = detectOverflow;
    exports.eventListeners = eventListeners;
    exports.flip = flip$1;
    exports.hide = hide$1;
    exports.offset = offset$1;
    exports.popperGenerator = popperGenerator;
    exports.popperOffsets = popperOffsets$1;
    exports.preventOverflow = preventOverflow$1;
  }
});

// node_modules/bootstrap/js/dist/dom/data.js
var require_data = __commonJS({
  "node_modules/bootstrap/js/dist/dom/data.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.Data = factory());
    })(exports, function() {
      "use strict";
      const elementMap = /* @__PURE__ */ new Map();
      const data = {
        set(element2, key, instance4) {
          if (!elementMap.has(element2)) {
            elementMap.set(element2, /* @__PURE__ */ new Map());
          }
          const instanceMap = elementMap.get(element2);
          if (!instanceMap.has(key) && instanceMap.size !== 0) {
            console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
            return;
          }
          instanceMap.set(key, instance4);
        },
        get(element2, key) {
          if (elementMap.has(element2)) {
            return elementMap.get(element2).get(key) || null;
          }
          return null;
        },
        remove(element2, key) {
          if (!elementMap.has(element2)) {
            return;
          }
          const instanceMap = elementMap.get(element2);
          instanceMap.delete(key);
          if (instanceMap.size === 0) {
            elementMap.delete(element2);
          }
        }
      };
      return data;
    });
  }
});

// node_modules/bootstrap/js/dist/util/index.js
var require_util = __commonJS({
  "node_modules/bootstrap/js/dist/util/index.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Index = {}));
    })(exports, function(exports2) {
      "use strict";
      const MAX_UID = 1e6;
      const MILLISECONDS_MULTIPLIER = 1e3;
      const TRANSITION_END = "transitionend";
      const parseSelector = (selector) => {
        if (selector && window.CSS && window.CSS.escape) {
          selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
        }
        return selector;
      };
      const toType = (object) => {
        if (object === null || object === void 0) {
          return `${object}`;
        }
        return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
      };
      const getUID = (prefix) => {
        do {
          prefix += Math.floor(Math.random() * MAX_UID);
        } while (document.getElementById(prefix));
        return prefix;
      };
      const getTransitionDurationFromElement = (element2) => {
        if (!element2) {
          return 0;
        }
        let {
          transitionDuration,
          transitionDelay
        } = window.getComputedStyle(element2);
        const floatTransitionDuration = Number.parseFloat(transitionDuration);
        const floatTransitionDelay = Number.parseFloat(transitionDelay);
        if (!floatTransitionDuration && !floatTransitionDelay) {
          return 0;
        }
        transitionDuration = transitionDuration.split(",")[0];
        transitionDelay = transitionDelay.split(",")[0];
        return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
      };
      const triggerTransitionEnd = (element2) => {
        element2.dispatchEvent(new Event(TRANSITION_END));
      };
      const isElement = (object) => {
        if (!object || typeof object !== "object") {
          return false;
        }
        if (typeof object.jquery !== "undefined") {
          object = object[0];
        }
        return typeof object.nodeType !== "undefined";
      };
      const getElement = (object) => {
        if (isElement(object)) {
          return object.jquery ? object[0] : object;
        }
        if (typeof object === "string" && object.length > 0) {
          return document.querySelector(parseSelector(object));
        }
        return null;
      };
      const isVisible = (element2) => {
        if (!isElement(element2) || element2.getClientRects().length === 0) {
          return false;
        }
        const elementIsVisible = getComputedStyle(element2).getPropertyValue("visibility") === "visible";
        const closedDetails = element2.closest("details:not([open])");
        if (!closedDetails) {
          return elementIsVisible;
        }
        if (closedDetails !== element2) {
          const summary = element2.closest("summary");
          if (summary && summary.parentNode !== closedDetails) {
            return false;
          }
          if (summary === null) {
            return false;
          }
        }
        return elementIsVisible;
      };
      const isDisabled = (element2) => {
        if (!element2 || element2.nodeType !== Node.ELEMENT_NODE) {
          return true;
        }
        if (element2.classList.contains("disabled")) {
          return true;
        }
        if (typeof element2.disabled !== "undefined") {
          return element2.disabled;
        }
        return element2.hasAttribute("disabled") && element2.getAttribute("disabled") !== "false";
      };
      const findShadowRoot = (element2) => {
        if (!document.documentElement.attachShadow) {
          return null;
        }
        if (typeof element2.getRootNode === "function") {
          const root = element2.getRootNode();
          return root instanceof ShadowRoot ? root : null;
        }
        if (element2 instanceof ShadowRoot) {
          return element2;
        }
        if (!element2.parentNode) {
          return null;
        }
        return findShadowRoot(element2.parentNode);
      };
      const noop2 = () => {
      };
      const reflow = (element2) => {
        element2.offsetHeight;
      };
      const getjQuery = () => {
        if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
          return window.jQuery;
        }
        return null;
      };
      const DOMContentLoadedCallbacks = [];
      const onDOMContentLoaded = (callback) => {
        if (document.readyState === "loading") {
          if (!DOMContentLoadedCallbacks.length) {
            document.addEventListener("DOMContentLoaded", () => {
              for (const callback2 of DOMContentLoadedCallbacks) {
                callback2();
              }
            });
          }
          DOMContentLoadedCallbacks.push(callback);
        } else {
          callback();
        }
      };
      const isRTL = () => document.documentElement.dir === "rtl";
      const defineJQueryPlugin = (plugin) => {
        onDOMContentLoaded(() => {
          const $ = getjQuery();
          if ($) {
            const name = plugin.NAME;
            const JQUERY_NO_CONFLICT = $.fn[name];
            $.fn[name] = plugin.jQueryInterface;
            $.fn[name].Constructor = plugin;
            $.fn[name].noConflict = () => {
              $.fn[name] = JQUERY_NO_CONFLICT;
              return plugin.jQueryInterface;
            };
          }
        });
      };
      const execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
        return typeof possibleCallback === "function" ? possibleCallback(...args) : defaultValue;
      };
      const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
        if (!waitForTransition) {
          execute(callback);
          return;
        }
        const durationPadding = 5;
        const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
        let called = false;
        const handler = ({
          target
        }) => {
          if (target !== transitionElement) {
            return;
          }
          called = true;
          transitionElement.removeEventListener(TRANSITION_END, handler);
          execute(callback);
        };
        transitionElement.addEventListener(TRANSITION_END, handler);
        setTimeout(() => {
          if (!called) {
            triggerTransitionEnd(transitionElement);
          }
        }, emulatedDuration);
      };
      const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
        const listLength = list.length;
        let index = list.indexOf(activeElement);
        if (index === -1) {
          return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
        }
        index += shouldGetNext ? 1 : -1;
        if (isCycleAllowed) {
          index = (index + listLength) % listLength;
        }
        return list[Math.max(0, Math.min(index, listLength - 1))];
      };
      exports2.defineJQueryPlugin = defineJQueryPlugin;
      exports2.execute = execute;
      exports2.executeAfterTransition = executeAfterTransition;
      exports2.findShadowRoot = findShadowRoot;
      exports2.getElement = getElement;
      exports2.getNextActiveElement = getNextActiveElement;
      exports2.getTransitionDurationFromElement = getTransitionDurationFromElement;
      exports2.getUID = getUID;
      exports2.getjQuery = getjQuery;
      exports2.isDisabled = isDisabled;
      exports2.isElement = isElement;
      exports2.isRTL = isRTL;
      exports2.isVisible = isVisible;
      exports2.noop = noop2;
      exports2.onDOMContentLoaded = onDOMContentLoaded;
      exports2.parseSelector = parseSelector;
      exports2.reflow = reflow;
      exports2.toType = toType;
      exports2.triggerTransitionEnd = triggerTransitionEnd;
      Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
    });
  }
});

// node_modules/bootstrap/js/dist/dom/event-handler.js
var require_event_handler = __commonJS({
  "node_modules/bootstrap/js/dist/dom/event-handler.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_util()) : typeof define === "function" && define.amd ? define(["../util/index"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.EventHandler = factory(global2.Index));
    })(exports, function(index_js) {
      "use strict";
      const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
      const stripNameRegex = /\..*/;
      const stripUidRegex = /::\d+$/;
      const eventRegistry = {};
      let uidEvent = 1;
      const customEvents = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
      };
      const nativeEvents = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
      function makeEventUid(element2, uid) {
        return uid && `${uid}::${uidEvent++}` || element2.uidEvent || uidEvent++;
      }
      function getElementEvents(element2) {
        const uid = makeEventUid(element2);
        element2.uidEvent = uid;
        eventRegistry[uid] = eventRegistry[uid] || {};
        return eventRegistry[uid];
      }
      function bootstrapHandler(element2, fn) {
        return function handler(event) {
          hydrateObj(event, {
            delegateTarget: element2
          });
          if (handler.oneOff) {
            EventHandler.off(element2, event.type, fn);
          }
          return fn.apply(element2, [event]);
        };
      }
      function bootstrapDelegationHandler(element2, selector, fn) {
        return function handler(event) {
          const domElements = element2.querySelectorAll(selector);
          for (let {
            target
          } = event; target && target !== this; target = target.parentNode) {
            for (const domElement of domElements) {
              if (domElement !== target) {
                continue;
              }
              hydrateObj(event, {
                delegateTarget: target
              });
              if (handler.oneOff) {
                EventHandler.off(element2, event.type, selector, fn);
              }
              return fn.apply(target, [event]);
            }
          }
        };
      }
      function findHandler(events, callable, delegationSelector = null) {
        return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
      }
      function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
        const isDelegated = typeof handler === "string";
        const callable = isDelegated ? delegationFunction : handler || delegationFunction;
        let typeEvent = getTypeEvent(originalTypeEvent);
        if (!nativeEvents.has(typeEvent)) {
          typeEvent = originalTypeEvent;
        }
        return [isDelegated, callable, typeEvent];
      }
      function addHandler(element2, originalTypeEvent, handler, delegationFunction, oneOff) {
        if (typeof originalTypeEvent !== "string" || !element2) {
          return;
        }
        let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
        if (originalTypeEvent in customEvents) {
          const wrapFunction = (fn2) => {
            return function(event) {
              if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
                return fn2.call(this, event);
              }
            };
          };
          callable = wrapFunction(callable);
        }
        const events = getElementEvents(element2);
        const handlers = events[typeEvent] || (events[typeEvent] = {});
        const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
        if (previousFunction) {
          previousFunction.oneOff = previousFunction.oneOff && oneOff;
          return;
        }
        const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
        const fn = isDelegated ? bootstrapDelegationHandler(element2, handler, callable) : bootstrapHandler(element2, callable);
        fn.delegationSelector = isDelegated ? handler : null;
        fn.callable = callable;
        fn.oneOff = oneOff;
        fn.uidEvent = uid;
        handlers[uid] = fn;
        element2.addEventListener(typeEvent, fn, isDelegated);
      }
      function removeHandler(element2, events, typeEvent, handler, delegationSelector) {
        const fn = findHandler(events[typeEvent], handler, delegationSelector);
        if (!fn) {
          return;
        }
        element2.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
        delete events[typeEvent][fn.uidEvent];
      }
      function removeNamespacedHandlers(element2, events, typeEvent, namespace) {
        const storeElementEvent = events[typeEvent] || {};
        for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
          if (handlerKey.includes(namespace)) {
            removeHandler(element2, events, typeEvent, event.callable, event.delegationSelector);
          }
        }
      }
      function getTypeEvent(event) {
        event = event.replace(stripNameRegex, "");
        return customEvents[event] || event;
      }
      const EventHandler = {
        on(element2, event, handler, delegationFunction) {
          addHandler(element2, event, handler, delegationFunction, false);
        },
        one(element2, event, handler, delegationFunction) {
          addHandler(element2, event, handler, delegationFunction, true);
        },
        off(element2, originalTypeEvent, handler, delegationFunction) {
          if (typeof originalTypeEvent !== "string" || !element2) {
            return;
          }
          const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
          const inNamespace = typeEvent !== originalTypeEvent;
          const events = getElementEvents(element2);
          const storeElementEvent = events[typeEvent] || {};
          const isNamespace = originalTypeEvent.startsWith(".");
          if (typeof callable !== "undefined") {
            if (!Object.keys(storeElementEvent).length) {
              return;
            }
            removeHandler(element2, events, typeEvent, callable, isDelegated ? handler : null);
            return;
          }
          if (isNamespace) {
            for (const elementEvent of Object.keys(events)) {
              removeNamespacedHandlers(element2, events, elementEvent, originalTypeEvent.slice(1));
            }
          }
          for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
            const handlerKey = keyHandlers.replace(stripUidRegex, "");
            if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
              removeHandler(element2, events, typeEvent, event.callable, event.delegationSelector);
            }
          }
        },
        trigger(element2, event, args) {
          if (typeof event !== "string" || !element2) {
            return null;
          }
          const $ = index_js.getjQuery();
          const typeEvent = getTypeEvent(event);
          const inNamespace = event !== typeEvent;
          let jQueryEvent = null;
          let bubbles = true;
          let nativeDispatch = true;
          let defaultPrevented = false;
          if (inNamespace && $) {
            jQueryEvent = $.Event(event, args);
            $(element2).trigger(jQueryEvent);
            bubbles = !jQueryEvent.isPropagationStopped();
            nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
            defaultPrevented = jQueryEvent.isDefaultPrevented();
          }
          const evt = hydrateObj(new Event(event, {
            bubbles,
            cancelable: true
          }), args);
          if (defaultPrevented) {
            evt.preventDefault();
          }
          if (nativeDispatch) {
            element2.dispatchEvent(evt);
          }
          if (evt.defaultPrevented && jQueryEvent) {
            jQueryEvent.preventDefault();
          }
          return evt;
        }
      };
      function hydrateObj(obj, meta = {}) {
        for (const [key, value] of Object.entries(meta)) {
          try {
            obj[key] = value;
          } catch (_unused) {
            Object.defineProperty(obj, key, {
              configurable: true,
              get() {
                return value;
              }
            });
          }
        }
        return obj;
      }
      return EventHandler;
    });
  }
});

// node_modules/bootstrap/js/dist/dom/manipulator.js
var require_manipulator = __commonJS({
  "node_modules/bootstrap/js/dist/dom/manipulator.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.Manipulator = factory());
    })(exports, function() {
      "use strict";
      function normalizeData(value) {
        if (value === "true") {
          return true;
        }
        if (value === "false") {
          return false;
        }
        if (value === Number(value).toString()) {
          return Number(value);
        }
        if (value === "" || value === "null") {
          return null;
        }
        if (typeof value !== "string") {
          return value;
        }
        try {
          return JSON.parse(decodeURIComponent(value));
        } catch (_unused) {
          return value;
        }
      }
      function normalizeDataKey(key) {
        return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
      }
      const Manipulator = {
        setDataAttribute(element2, key, value) {
          element2.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
        },
        removeDataAttribute(element2, key) {
          element2.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
        },
        getDataAttributes(element2) {
          if (!element2) {
            return {};
          }
          const attributes = {};
          const bsKeys = Object.keys(element2.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));
          for (const key of bsKeys) {
            let pureKey = key.replace(/^bs/, "");
            pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
            attributes[pureKey] = normalizeData(element2.dataset[key]);
          }
          return attributes;
        },
        getDataAttribute(element2, key) {
          return normalizeData(element2.getAttribute(`data-bs-${normalizeDataKey(key)}`));
        }
      };
      return Manipulator;
    });
  }
});

// node_modules/bootstrap/js/dist/util/config.js
var require_config = __commonJS({
  "node_modules/bootstrap/js/dist/util/config.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_manipulator(), require_util()) : typeof define === "function" && define.amd ? define(["../dom/manipulator", "./index"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.Config = factory(global2.Manipulator, global2.Index));
    })(exports, function(Manipulator, index_js) {
      "use strict";
      class Config {
        // Getters
        static get Default() {
          return {};
        }
        static get DefaultType() {
          return {};
        }
        static get NAME() {
          throw new Error('You have to implement the static method "NAME", for each component!');
        }
        _getConfig(config) {
          config = this._mergeConfigObj(config);
          config = this._configAfterMerge(config);
          this._typeCheckConfig(config);
          return config;
        }
        _configAfterMerge(config) {
          return config;
        }
        _mergeConfigObj(config, element2) {
          const jsonConfig = index_js.isElement(element2) ? Manipulator.getDataAttribute(element2, "config") : {};
          return {
            ...this.constructor.Default,
            ...typeof jsonConfig === "object" ? jsonConfig : {},
            ...index_js.isElement(element2) ? Manipulator.getDataAttributes(element2) : {},
            ...typeof config === "object" ? config : {}
          };
        }
        _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
          for (const [property, expectedTypes] of Object.entries(configTypes)) {
            const value = config[property];
            const valueType = index_js.isElement(value) ? "element" : index_js.toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          }
        }
      }
      return Config;
    });
  }
});

// node_modules/bootstrap/js/dist/base-component.js
var require_base_component = __commonJS({
  "node_modules/bootstrap/js/dist/base-component.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_data(), require_event_handler(), require_config(), require_util()) : typeof define === "function" && define.amd ? define(["./dom/data", "./dom/event-handler", "./util/config", "./util/index"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.BaseComponent = factory(global2.Data, global2.EventHandler, global2.Config, global2.Index));
    })(exports, function(Data, EventHandler, Config, index_js) {
      "use strict";
      const VERSION2 = "5.3.3";
      class BaseComponent extends Config {
        constructor(element2, config) {
          super();
          element2 = index_js.getElement(element2);
          if (!element2) {
            return;
          }
          this._element = element2;
          this._config = this._getConfig(config);
          Data.set(this._element, this.constructor.DATA_KEY, this);
        }
        // Public
        dispose() {
          Data.remove(this._element, this.constructor.DATA_KEY);
          EventHandler.off(this._element, this.constructor.EVENT_KEY);
          for (const propertyName of Object.getOwnPropertyNames(this)) {
            this[propertyName] = null;
          }
        }
        _queueCallback(callback, element2, isAnimated = true) {
          index_js.executeAfterTransition(callback, element2, isAnimated);
        }
        _getConfig(config) {
          config = this._mergeConfigObj(config, this._element);
          config = this._configAfterMerge(config);
          this._typeCheckConfig(config);
          return config;
        }
        // Static
        static getInstance(element2) {
          return Data.get(index_js.getElement(element2), this.DATA_KEY);
        }
        static getOrCreateInstance(element2, config = {}) {
          return this.getInstance(element2) || new this(element2, typeof config === "object" ? config : null);
        }
        static get VERSION() {
          return VERSION2;
        }
        static get DATA_KEY() {
          return `bs.${this.NAME}`;
        }
        static get EVENT_KEY() {
          return `.${this.DATA_KEY}`;
        }
        static eventName(name) {
          return `${name}${this.EVENT_KEY}`;
        }
      }
      return BaseComponent;
    });
  }
});

// node_modules/bootstrap/js/dist/util/sanitizer.js
var require_sanitizer = __commonJS({
  "node_modules/bootstrap/js/dist/util/sanitizer.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Sanitizer = {}));
    })(exports, function(exports2) {
      "use strict";
      const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
      const DefaultAllowlist = {
        // Global attributes allowed on any supplied element below.
        "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        dd: [],
        div: [],
        dl: [],
        dt: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
      };
      const uriAttributes = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]);
      const SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
      const allowedAttribute = (attribute, allowedAttributeList) => {
        const attributeName = attribute.nodeName.toLowerCase();
        if (allowedAttributeList.includes(attributeName)) {
          if (uriAttributes.has(attributeName)) {
            return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
          }
          return true;
        }
        return allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp).some((regex) => regex.test(attributeName));
      };
      function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
        if (!unsafeHtml.length) {
          return unsafeHtml;
        }
        if (sanitizeFunction && typeof sanitizeFunction === "function") {
          return sanitizeFunction(unsafeHtml);
        }
        const domParser = new window.DOMParser();
        const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
        const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
        for (const element2 of elements) {
          const elementName = element2.nodeName.toLowerCase();
          if (!Object.keys(allowList).includes(elementName)) {
            element2.remove();
            continue;
          }
          const attributeList = [].concat(...element2.attributes);
          const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
          for (const attribute of attributeList) {
            if (!allowedAttribute(attribute, allowedAttributes)) {
              element2.removeAttribute(attribute.nodeName);
            }
          }
        }
        return createdDocument.body.innerHTML;
      }
      exports2.DefaultAllowlist = DefaultAllowlist;
      exports2.sanitizeHtml = sanitizeHtml;
      Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
    });
  }
});

// node_modules/bootstrap/js/dist/dom/selector-engine.js
var require_selector_engine = __commonJS({
  "node_modules/bootstrap/js/dist/dom/selector-engine.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_util()) : typeof define === "function" && define.amd ? define(["../util/index"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.SelectorEngine = factory(global2.Index));
    })(exports, function(index_js) {
      "use strict";
      const getSelector = (element2) => {
        let selector = element2.getAttribute("data-bs-target");
        if (!selector || selector === "#") {
          let hrefAttribute = element2.getAttribute("href");
          if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
            return null;
          }
          if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
            hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
          }
          selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
        }
        return selector ? selector.split(",").map((sel) => index_js.parseSelector(sel)).join(",") : null;
      };
      const SelectorEngine = {
        find(selector, element2 = document.documentElement) {
          return [].concat(...Element.prototype.querySelectorAll.call(element2, selector));
        },
        findOne(selector, element2 = document.documentElement) {
          return Element.prototype.querySelector.call(element2, selector);
        },
        children(element2, selector) {
          return [].concat(...element2.children).filter((child) => child.matches(selector));
        },
        parents(element2, selector) {
          const parents = [];
          let ancestor = element2.parentNode.closest(selector);
          while (ancestor) {
            parents.push(ancestor);
            ancestor = ancestor.parentNode.closest(selector);
          }
          return parents;
        },
        prev(element2, selector) {
          let previous = element2.previousElementSibling;
          while (previous) {
            if (previous.matches(selector)) {
              return [previous];
            }
            previous = previous.previousElementSibling;
          }
          return [];
        },
        // TODO: this is now unused; remove later along with prev()
        next(element2, selector) {
          let next = element2.nextElementSibling;
          while (next) {
            if (next.matches(selector)) {
              return [next];
            }
            next = next.nextElementSibling;
          }
          return [];
        },
        focusableChildren(element2) {
          const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
          return this.find(focusables, element2).filter((el) => !index_js.isDisabled(el) && index_js.isVisible(el));
        },
        getSelectorFromElement(element2) {
          const selector = getSelector(element2);
          if (selector) {
            return SelectorEngine.findOne(selector) ? selector : null;
          }
          return null;
        },
        getElementFromSelector(element2) {
          const selector = getSelector(element2);
          return selector ? SelectorEngine.findOne(selector) : null;
        },
        getMultipleElementsFromSelector(element2) {
          const selector = getSelector(element2);
          return selector ? SelectorEngine.find(selector) : [];
        }
      };
      return SelectorEngine;
    });
  }
});

// node_modules/bootstrap/js/dist/util/template-factory.js
var require_template_factory = __commonJS({
  "node_modules/bootstrap/js/dist/util/template-factory.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_selector_engine(), require_config(), require_sanitizer(), require_util()) : typeof define === "function" && define.amd ? define(["../dom/selector-engine", "./config", "./sanitizer", "./index"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.TemplateFactory = factory(global2.SelectorEngine, global2.Config, global2.Sanitizer, global2.Index));
    })(exports, function(SelectorEngine, Config, sanitizer_js, index_js) {
      "use strict";
      const NAME = "TemplateFactory";
      const Default = {
        allowList: sanitizer_js.DefaultAllowlist,
        content: {},
        // { selector : text ,  selector2 : text2 , }
        extraClass: "",
        html: false,
        sanitize: true,
        sanitizeFn: null,
        template: "<div></div>"
      };
      const DefaultType = {
        allowList: "object",
        content: "object",
        extraClass: "(string|function)",
        html: "boolean",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        template: "string"
      };
      const DefaultContentType = {
        entry: "(string|element|function|null)",
        selector: "(string|element)"
      };
      class TemplateFactory extends Config {
        constructor(config) {
          super();
          this._config = this._getConfig(config);
        }
        // Getters
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        // Public
        getContent() {
          return Object.values(this._config.content).map((config) => this._resolvePossibleFunction(config)).filter(Boolean);
        }
        hasContent() {
          return this.getContent().length > 0;
        }
        changeContent(content) {
          this._checkContent(content);
          this._config.content = {
            ...this._config.content,
            ...content
          };
          return this;
        }
        toHtml() {
          const templateWrapper = document.createElement("div");
          templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
          for (const [selector, text2] of Object.entries(this._config.content)) {
            this._setContent(templateWrapper, text2, selector);
          }
          const template = templateWrapper.children[0];
          const extraClass = this._resolvePossibleFunction(this._config.extraClass);
          if (extraClass) {
            template.classList.add(...extraClass.split(" "));
          }
          return template;
        }
        // Private
        _typeCheckConfig(config) {
          super._typeCheckConfig(config);
          this._checkContent(config.content);
        }
        _checkContent(arg) {
          for (const [selector, content] of Object.entries(arg)) {
            super._typeCheckConfig({
              selector,
              entry: content
            }, DefaultContentType);
          }
        }
        _setContent(template, content, selector) {
          const templateElement = SelectorEngine.findOne(selector, template);
          if (!templateElement) {
            return;
          }
          content = this._resolvePossibleFunction(content);
          if (!content) {
            templateElement.remove();
            return;
          }
          if (index_js.isElement(content)) {
            this._putElementInTemplate(index_js.getElement(content), templateElement);
            return;
          }
          if (this._config.html) {
            templateElement.innerHTML = this._maybeSanitize(content);
            return;
          }
          templateElement.textContent = content;
        }
        _maybeSanitize(arg) {
          return this._config.sanitize ? sanitizer_js.sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
        }
        _resolvePossibleFunction(arg) {
          return index_js.execute(arg, [this]);
        }
        _putElementInTemplate(element2, templateElement) {
          if (this._config.html) {
            templateElement.innerHTML = "";
            templateElement.append(element2);
            return;
          }
          templateElement.textContent = element2.textContent;
        }
      }
      return TemplateFactory;
    });
  }
});

// node_modules/bootstrap/js/dist/tooltip.js
var require_tooltip = __commonJS({
  "node_modules/bootstrap/js/dist/tooltip.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_popper(), require_base_component(), require_event_handler(), require_manipulator(), require_util(), require_sanitizer(), require_template_factory()) : typeof define === "function" && define.amd ? define(["@popperjs/core", "./base-component", "./dom/event-handler", "./dom/manipulator", "./util/index", "./util/sanitizer", "./util/template-factory"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.Tooltip = factory(global2["@popperjs/core"], global2.BaseComponent, global2.EventHandler, global2.Manipulator, global2.Index, global2.Sanitizer, global2.TemplateFactory));
    })(exports, function(Popper, BaseComponent, EventHandler, Manipulator, index_js, sanitizer_js, TemplateFactory) {
      "use strict";
      function _interopNamespaceDefault(e) {
        const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
        if (e) {
          for (const k in e) {
            if (k !== "default") {
              const d = Object.getOwnPropertyDescriptor(e, k);
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: () => e[k]
              });
            }
          }
        }
        n.default = e;
        return Object.freeze(n);
      }
      const Popper__namespace = /* @__PURE__ */ _interopNamespaceDefault(Popper);
      const NAME = "tooltip";
      const DISALLOWED_ATTRIBUTES = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]);
      const CLASS_NAME_FADE = "fade";
      const CLASS_NAME_MODAL = "modal";
      const CLASS_NAME_SHOW = "show";
      const SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
      const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
      const EVENT_MODAL_HIDE = "hide.bs.modal";
      const TRIGGER_HOVER = "hover";
      const TRIGGER_FOCUS = "focus";
      const TRIGGER_CLICK = "click";
      const TRIGGER_MANUAL = "manual";
      const EVENT_HIDE = "hide";
      const EVENT_HIDDEN = "hidden";
      const EVENT_SHOW = "show";
      const EVENT_SHOWN = "shown";
      const EVENT_INSERTED = "inserted";
      const EVENT_CLICK = "click";
      const EVENT_FOCUSIN = "focusin";
      const EVENT_FOCUSOUT = "focusout";
      const EVENT_MOUSEENTER = "mouseenter";
      const EVENT_MOUSELEAVE = "mouseleave";
      const AttachmentMap = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: index_js.isRTL() ? "left" : "right",
        BOTTOM: "bottom",
        LEFT: index_js.isRTL() ? "right" : "left"
      };
      const Default = {
        allowList: sanitizer_js.DefaultAllowlist,
        animation: true,
        boundary: "clippingParents",
        container: false,
        customClass: "",
        delay: 0,
        fallbackPlacements: ["top", "right", "bottom", "left"],
        html: false,
        offset: [0, 6],
        placement: "top",
        popperConfig: null,
        sanitize: true,
        sanitizeFn: null,
        selector: false,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        title: "",
        trigger: "hover focus"
      };
      const DefaultType = {
        allowList: "object",
        animation: "boolean",
        boundary: "(string|element)",
        container: "(string|element|boolean)",
        customClass: "(string|function)",
        delay: "(number|object)",
        fallbackPlacements: "array",
        html: "boolean",
        offset: "(array|string|function)",
        placement: "(string|function)",
        popperConfig: "(null|object|function)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        selector: "(string|boolean)",
        template: "string",
        title: "(string|element|function)",
        trigger: "string"
      };
      class Tooltip2 extends BaseComponent {
        constructor(element2, config) {
          if (typeof Popper__namespace === "undefined") {
            throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
          }
          super(element2, config);
          this._isEnabled = true;
          this._timeout = 0;
          this._isHovered = null;
          this._activeTrigger = {};
          this._popper = null;
          this._templateFactory = null;
          this._newContent = null;
          this.tip = null;
          this._setListeners();
          if (!this._config.selector) {
            this._fixTitle();
          }
        }
        // Getters
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        // Public
        enable() {
          this._isEnabled = true;
        }
        disable() {
          this._isEnabled = false;
        }
        toggleEnabled() {
          this._isEnabled = !this._isEnabled;
        }
        toggle() {
          if (!this._isEnabled) {
            return;
          }
          this._activeTrigger.click = !this._activeTrigger.click;
          if (this._isShown()) {
            this._leave();
            return;
          }
          this._enter();
        }
        dispose() {
          clearTimeout(this._timeout);
          EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
          if (this._element.getAttribute("data-bs-original-title")) {
            this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title"));
          }
          this._disposePopper();
          super.dispose();
        }
        show() {
          if (this._element.style.display === "none") {
            throw new Error("Please use show on visible elements");
          }
          if (!(this._isWithContent() && this._isEnabled)) {
            return;
          }
          const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW));
          const shadowRoot = index_js.findShadowRoot(this._element);
          const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
          if (showEvent.defaultPrevented || !isInTheDom) {
            return;
          }
          this._disposePopper();
          const tip = this._getTipElement();
          this._element.setAttribute("aria-describedby", tip.getAttribute("id"));
          const {
            container
          } = this._config;
          if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
            container.append(tip);
            EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
          }
          this._popper = this._createPopper(tip);
          tip.classList.add(CLASS_NAME_SHOW);
          if ("ontouchstart" in document.documentElement) {
            for (const element2 of [].concat(...document.body.children)) {
              EventHandler.on(element2, "mouseover", index_js.noop);
            }
          }
          const complete = () => {
            EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN));
            if (this._isHovered === false) {
              this._leave();
            }
            this._isHovered = false;
          };
          this._queueCallback(complete, this.tip, this._isAnimated());
        }
        hide() {
          if (!this._isShown()) {
            return;
          }
          const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE));
          if (hideEvent.defaultPrevented) {
            return;
          }
          const tip = this._getTipElement();
          tip.classList.remove(CLASS_NAME_SHOW);
          if ("ontouchstart" in document.documentElement) {
            for (const element2 of [].concat(...document.body.children)) {
              EventHandler.off(element2, "mouseover", index_js.noop);
            }
          }
          this._activeTrigger[TRIGGER_CLICK] = false;
          this._activeTrigger[TRIGGER_FOCUS] = false;
          this._activeTrigger[TRIGGER_HOVER] = false;
          this._isHovered = null;
          const complete = () => {
            if (this._isWithActiveTrigger()) {
              return;
            }
            if (!this._isHovered) {
              this._disposePopper();
            }
            this._element.removeAttribute("aria-describedby");
            EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN));
          };
          this._queueCallback(complete, this.tip, this._isAnimated());
        }
        update() {
          if (this._popper) {
            this._popper.update();
          }
        }
        // Protected
        _isWithContent() {
          return Boolean(this._getTitle());
        }
        _getTipElement() {
          if (!this.tip) {
            this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
          }
          return this.tip;
        }
        _createTipElement(content) {
          const tip = this._getTemplateFactory(content).toHtml();
          if (!tip) {
            return null;
          }
          tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW);
          tip.classList.add(`bs-${this.constructor.NAME}-auto`);
          const tipId = index_js.getUID(this.constructor.NAME).toString();
          tip.setAttribute("id", tipId);
          if (this._isAnimated()) {
            tip.classList.add(CLASS_NAME_FADE);
          }
          return tip;
        }
        setContent(content) {
          this._newContent = content;
          if (this._isShown()) {
            this._disposePopper();
            this.show();
          }
        }
        _getTemplateFactory(content) {
          if (this._templateFactory) {
            this._templateFactory.changeContent(content);
          } else {
            this._templateFactory = new TemplateFactory({
              ...this._config,
              // the `content` var has to be after `this._config`
              // to override config.content in case of popover
              content,
              extraClass: this._resolvePossibleFunction(this._config.customClass)
            });
          }
          return this._templateFactory;
        }
        _getContentForTemplate() {
          return {
            [SELECTOR_TOOLTIP_INNER]: this._getTitle()
          };
        }
        _getTitle() {
          return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
        }
        // Private
        _initializeOnDelegatedTarget(event) {
          return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
        }
        _isAnimated() {
          return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE);
        }
        _isShown() {
          return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW);
        }
        _createPopper(tip) {
          const placement = index_js.execute(this._config.placement, [this, tip, this._element]);
          const attachment = AttachmentMap[placement.toUpperCase()];
          return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
        }
        _getOffset() {
          const {
            offset
          } = this._config;
          if (typeof offset === "string") {
            return offset.split(",").map((value) => Number.parseInt(value, 10));
          }
          if (typeof offset === "function") {
            return (popperData) => offset(popperData, this._element);
          }
          return offset;
        }
        _resolvePossibleFunction(arg) {
          return index_js.execute(arg, [this._element]);
        }
        _getPopperConfig(attachment) {
          const defaultBsPopperConfig = {
            placement: attachment,
            modifiers: [{
              name: "flip",
              options: {
                fallbackPlacements: this._config.fallbackPlacements
              }
            }, {
              name: "offset",
              options: {
                offset: this._getOffset()
              }
            }, {
              name: "preventOverflow",
              options: {
                boundary: this._config.boundary
              }
            }, {
              name: "arrow",
              options: {
                element: `.${this.constructor.NAME}-arrow`
              }
            }, {
              name: "preSetPlacement",
              enabled: true,
              phase: "beforeMain",
              fn: (data) => {
                this._getTipElement().setAttribute("data-popper-placement", data.state.placement);
              }
            }]
          };
          return {
            ...defaultBsPopperConfig,
            ...index_js.execute(this._config.popperConfig, [defaultBsPopperConfig])
          };
        }
        _setListeners() {
          const triggers = this._config.trigger.split(" ");
          for (const trigger of triggers) {
            if (trigger === "click") {
              EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK), this._config.selector, (event) => {
                const context = this._initializeOnDelegatedTarget(event);
                context.toggle();
              });
            } else if (trigger !== TRIGGER_MANUAL) {
              const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN);
              const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT);
              EventHandler.on(this._element, eventIn, this._config.selector, (event) => {
                const context = this._initializeOnDelegatedTarget(event);
                context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
                context._enter();
              });
              EventHandler.on(this._element, eventOut, this._config.selector, (event) => {
                const context = this._initializeOnDelegatedTarget(event);
                context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
                context._leave();
              });
            }
          }
          this._hideModalHandler = () => {
            if (this._element) {
              this.hide();
            }
          };
          EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
        }
        _fixTitle() {
          const title = this._element.getAttribute("title");
          if (!title) {
            return;
          }
          if (!this._element.getAttribute("aria-label") && !this._element.textContent.trim()) {
            this._element.setAttribute("aria-label", title);
          }
          this._element.setAttribute("data-bs-original-title", title);
          this._element.removeAttribute("title");
        }
        _enter() {
          if (this._isShown() || this._isHovered) {
            this._isHovered = true;
            return;
          }
          this._isHovered = true;
          this._setTimeout(() => {
            if (this._isHovered) {
              this.show();
            }
          }, this._config.delay.show);
        }
        _leave() {
          if (this._isWithActiveTrigger()) {
            return;
          }
          this._isHovered = false;
          this._setTimeout(() => {
            if (!this._isHovered) {
              this.hide();
            }
          }, this._config.delay.hide);
        }
        _setTimeout(handler, timeout) {
          clearTimeout(this._timeout);
          this._timeout = setTimeout(handler, timeout);
        }
        _isWithActiveTrigger() {
          return Object.values(this._activeTrigger).includes(true);
        }
        _getConfig(config) {
          const dataAttributes = Manipulator.getDataAttributes(this._element);
          for (const dataAttribute of Object.keys(dataAttributes)) {
            if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
              delete dataAttributes[dataAttribute];
            }
          }
          config = {
            ...dataAttributes,
            ...typeof config === "object" && config ? config : {}
          };
          config = this._mergeConfigObj(config);
          config = this._configAfterMerge(config);
          this._typeCheckConfig(config);
          return config;
        }
        _configAfterMerge(config) {
          config.container = config.container === false ? document.body : index_js.getElement(config.container);
          if (typeof config.delay === "number") {
            config.delay = {
              show: config.delay,
              hide: config.delay
            };
          }
          if (typeof config.title === "number") {
            config.title = config.title.toString();
          }
          if (typeof config.content === "number") {
            config.content = config.content.toString();
          }
          return config;
        }
        _getDelegateConfig() {
          const config = {};
          for (const [key, value] of Object.entries(this._config)) {
            if (this.constructor.Default[key] !== value) {
              config[key] = value;
            }
          }
          config.selector = false;
          config.trigger = "manual";
          return config;
        }
        _disposePopper() {
          if (this._popper) {
            this._popper.destroy();
            this._popper = null;
          }
          if (this.tip) {
            this.tip.remove();
            this.tip = null;
          }
        }
        // Static
        static jQueryInterface(config) {
          return this.each(function() {
            const data = Tooltip2.getOrCreateInstance(this, config);
            if (typeof config !== "string") {
              return;
            }
            if (typeof data[config] === "undefined") {
              throw new TypeError(`No method named "${config}"`);
            }
            data[config]();
          });
        }
      }
      index_js.defineJQueryPlugin(Tooltip2);
      return Tooltip2;
    });
  }
});

// node_modules/svelte/src/runtime/internal/utils.js
function noop() {
}
var identity = (x) => x;
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
var src_url_equal_anchor;
function src_url_equal(element_src, url) {
  if (element_src === url) return true;
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement("a");
  }
  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function split_css_unit(value) {
  const split = typeof value === "string" && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return split ? [parseFloat(split[1]), split[2] || "px"] : [
    /** @type {number} */
    value,
    "px"
  ];
}

// node_modules/svelte/src/runtime/internal/environment.js
var is_client = typeof window !== "undefined";
var now = is_client ? () => window.performance.now() : () => Date.now();
var raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;

// node_modules/svelte/src/runtime/internal/loop.js
var tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}

// node_modules/svelte/src/runtime/internal/globals.js
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);

// node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js
var ResizeObserverSingleton = class _ResizeObserverSingleton {
  /**
   * @private
   * @readonly
   * @type {WeakMap<Element, import('./private.js').Listener>}
   */
  _listeners = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
  /**
   * @private
   * @type {ResizeObserver}
   */
  _observer = void 0;
  /** @type {ResizeObserverOptions} */
  options;
  /** @param {ResizeObserverOptions} options */
  constructor(options2) {
    this.options = options2;
  }
  /**
   * @param {Element} element
   * @param {import('./private.js').Listener} listener
   * @returns {() => void}
   */
  observe(element2, listener) {
    this._listeners.set(element2, listener);
    this._getObserver().observe(element2, this.options);
    return () => {
      this._listeners.delete(element2);
      this._observer.unobserve(element2);
    };
  }
  /**
   * @private
   */
  _getObserver() {
    return this._observer ?? (this._observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        _ResizeObserverSingleton.entries.set(entry.target, entry);
        this._listeners.get(entry.target)?.(entry);
      }
    }));
  }
};
ResizeObserverSingleton.entries = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;

// node_modules/svelte/src/runtime/internal/dom.js
var is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function append(target, node) {
  target.appendChild(node);
}
function get_root_for_style(node) {
  if (!node) return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && /** @type {ShadowRoot} */
  root.host) {
    return (
      /** @type {ShadowRoot} */
      root
    );
  }
  return node.ownerDocument;
}
function append_empty_stylesheet(node) {
  const style_element = element("style");
  style_element.textContent = "/* empty */";
  append_stylesheet(get_root_for_style(node), style_element);
  return style_element.sheet;
}
function append_stylesheet(node, style) {
  append(
    /** @type {Document} */
    node.head || node,
    style
  );
  return style.sheet;
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options2) {
  node.addEventListener(event, handler, options2);
  return () => node.removeEventListener(event, handler, options2);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.data === data) return;
  text2.data = /** @type {string} */
  data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function select_option(select, value, mounting) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
  if (!mounting || value !== void 0) {
    select.selectedIndex = -1;
  }
}
function select_value(select) {
  const selected_option = select.querySelector(":checked");
  return selected_option && selected_option.__value;
}
function toggle_class(element2, name, toggle) {
  element2.classList.toggle(name, !!toggle);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
function get_custom_elements_slots(element2) {
  const result = {};
  element2.childNodes.forEach(
    /** @param {Element} node */
    (node) => {
      result[node.slot || "default"] = true;
    }
  );
  return result;
}

// node_modules/svelte/src/runtime/internal/style_manager.js
var managed_styles = /* @__PURE__ */ new Map();
var active = 0;
function hash(str) {
  let hash2 = 5381;
  let i = str.length;
  while (i--) hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
  return hash2 >>> 0;
}
function create_style_information(doc, node) {
  const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
  managed_styles.set(doc, info);
  return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
  const step = 16.666 / duration;
  let keyframes = "{\n";
  for (let p = 0; p <= 1; p += step) {
    const t = a + (b - a) * ease(p);
    keyframes += p * 100 + `%{${fn(t, 1 - t)}}
`;
  }
  const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
  const name = `__svelte_${hash(rule)}_${uid}`;
  const doc = get_root_for_style(node);
  const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
  if (!rules[name]) {
    rules[name] = true;
    stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
  }
  const animation = node.style.animation || "";
  node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
  active += 1;
  return name;
}
function delete_rule(node, name) {
  const previous = (node.style.animation || "").split(", ");
  const next = previous.filter(
    name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1
    // remove all Svelte animations
  );
  const deleted = previous.length - next.length;
  if (deleted) {
    node.style.animation = next.join(", ");
    active -= deleted;
    if (!active) clear_rules();
  }
}
function clear_rules() {
  raf(() => {
    if (active) return;
    managed_styles.forEach((info) => {
      const { ownerNode } = info.stylesheet;
      if (ownerNode) detach(ownerNode);
    });
    managed_styles.clear();
  });
}

// node_modules/svelte/src/runtime/internal/animations.js
function create_animation(node, from, fn, params) {
  if (!from) return noop;
  const to = node.getBoundingClientRect();
  if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
    return noop;
  const {
    delay = 0,
    duration = 300,
    easing = identity,
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now() + delay,
    // @ts-ignore todo:
    end = start_time + duration,
    tick: tick2 = noop,
    css
  } = fn(node, { from, to }, params);
  let running = true;
  let started = false;
  let name;
  function start() {
    if (css) {
      name = create_rule(node, 0, 1, duration, delay, easing, css);
    }
    if (!delay) {
      started = true;
    }
  }
  function stop() {
    if (css) delete_rule(node, name);
    running = false;
  }
  loop((now2) => {
    if (!started && now2 >= start_time) {
      started = true;
    }
    if (started && now2 >= end) {
      tick2(1, 0);
      stop();
    }
    if (!running) {
      return false;
    }
    if (started) {
      const p = now2 - start_time;
      const t = 0 + 1 * easing(p / duration);
      tick2(t, 1 - t);
    }
    return true;
  });
  start();
  tick2(0, 1);
  return stop;
}
function fix_position(node) {
  const style = getComputedStyle(node);
  if (style.position !== "absolute" && style.position !== "fixed") {
    const { width, height } = style;
    const a = node.getBoundingClientRect();
    node.style.position = "absolute";
    node.style.width = width;
    node.style.height = height;
    add_transform(node, a);
  }
}
function add_transform(node, a) {
  const b = node.getBoundingClientRect();
  if (a.left !== b.left || a.top !== b.top) {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
  }
}

// node_modules/svelte/src/runtime/internal/lifecycle.js
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}

// node_modules/svelte/src/runtime/internal/scheduler.js
var dirty_components = [];
var binding_callbacks = [];
var render_callbacks = [];
var flush_callbacks = [];
var resolved_promise = /* @__PURE__ */ Promise.resolve();
var update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
var seen_callbacks = /* @__PURE__ */ new Set();
var flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}

// node_modules/svelte/src/runtime/internal/transitions.js
var promise;
function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(() => {
      promise = null;
    });
  }
  return promise;
}
function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
}
var outroing = /* @__PURE__ */ new Set();
var outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
    // parent group
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2) block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
var null_transition = { duration: 0 };
function create_bidirectional_transition(node, fn, params, intro) {
  const options2 = { direction: "both" };
  let config = fn(node, params, options2);
  let t = intro ? 0 : 1;
  let running_program = null;
  let pending_program = null;
  let animation_name = null;
  let original_inert_value;
  function clear_animation() {
    if (animation_name) delete_rule(node, animation_name);
  }
  function init2(program, duration) {
    const d = (
      /** @type {Program['d']} */
      program.b - t
    );
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d,
      duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }
  function go(b) {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick: tick2 = noop,
      css
    } = config || null_transition;
    const program = {
      start: now() + delay,
      b
    };
    if (!b) {
      program.group = outros;
      outros.r += 1;
    }
    if ("inert" in node) {
      if (b) {
        if (original_inert_value !== void 0) {
          node.inert = original_inert_value;
        }
      } else {
        original_inert_value = /** @type {HTMLElement} */
        node.inert;
        node.inert = true;
      }
    }
    if (running_program || pending_program) {
      pending_program = program;
    } else {
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }
      if (b) tick2(0, 1);
      running_program = init2(program, duration);
      add_render_callback(() => dispatch(node, b, "start"));
      loop((now2) => {
        if (pending_program && now2 > pending_program.start) {
          running_program = init2(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, "start");
          if (css) {
            clear_animation();
            animation_name = create_rule(
              node,
              t,
              running_program.b,
              running_program.duration,
              0,
              easing,
              config.css
            );
          }
        }
        if (running_program) {
          if (now2 >= running_program.end) {
            tick2(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, "end");
            if (!pending_program) {
              if (running_program.b) {
                clear_animation();
              } else {
                if (!--running_program.group.r) run_all(running_program.group.c);
              }
            }
            running_program = null;
          } else if (now2 >= running_program.start) {
            const p = now2 - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick2(t, 1 - t);
          }
        }
        return !!(running_program || pending_program);
      });
    }
  }
  return {
    run(b) {
      if (is_function(config)) {
        wait().then(() => {
          const opts = { direction: b ? "in" : "out" };
          config = config(opts);
          go(b);
        });
      } else {
        go(b);
      }
    },
    end() {
      clear_animation();
      running_program = pending_program = null;
    }
  };
}

// node_modules/svelte/src/runtime/internal/each.js
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}
function fix_and_outro_and_destroy_block(block, lookup) {
  block.f();
  outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block2, next, get_context) {
  let o = old_blocks.length;
  let n = list.length;
  let i = o;
  const old_indexes = {};
  while (i--) old_indexes[old_blocks[i].key] = i;
  const new_blocks = [];
  const new_lookup = /* @__PURE__ */ new Map();
  const deltas = /* @__PURE__ */ new Map();
  const updates = [];
  i = n;
  while (i--) {
    const child_ctx = get_context(ctx, list, i);
    const key = get_key(child_ctx);
    let block = lookup.get(key);
    if (!block) {
      block = create_each_block2(key, child_ctx);
      block.c();
    } else if (dynamic) {
      updates.push(() => block.p(child_ctx, dirty));
    }
    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
  }
  const will_move = /* @__PURE__ */ new Set();
  const did_move = /* @__PURE__ */ new Set();
  function insert2(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }
  while (o && n) {
    const new_block = new_blocks[n - 1];
    const old_block = old_blocks[o - 1];
    const new_key = new_block.key;
    const old_key = old_block.key;
    if (new_block === old_block) {
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert2(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert2(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }
  while (o--) {
    const old_block = old_blocks[o];
    if (!new_lookup.has(old_block.key)) destroy(old_block, lookup);
  }
  while (n) insert2(new_blocks[n - 1]);
  run_all(updates);
  return new_blocks;
}

// node_modules/svelte/src/shared/boolean_attributes.js
var _boolean_attributes = (
  /** @type {const} */
  [
    "allowfullscreen",
    "allowpaymentrequest",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "hidden",
    "inert",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected"
  ]
);
var boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);

// node_modules/svelte/src/runtime/internal/Component.js
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options2, instance4, create_fragment4, not_equal, props, append_styles = null, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options2.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options2.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance4 ? instance4(component, options2.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment4 ? create_fragment4($$.ctx) : false;
  if (options2.target) {
    if (options2.hydrate) {
      start_hydrating();
      const nodes = children(options2.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options2.intro) transition_in(component.$$.fragment);
    mount_component(component, options2.target, options2.anchor);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    /** The Svelte component constructor */
    $$ctor;
    /** Slots */
    $$s;
    /** The Svelte component instance */
    $$c;
    /** Whether or not the custom element is connected */
    $$cn = false;
    /** Component props data */
    $$d = {};
    /** `true` if currently in the process of reflecting component props back to attributes */
    $$r = false;
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    $$p_d = {};
    /** @type {Record<string, Function[]>} Event listeners */
    $$l = {};
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    $$l_u = /* @__PURE__ */ new Map();
    constructor($$componentCtor, $$slots, use_shadow_dom) {
      super();
      this.$$ctor = $$componentCtor;
      this.$$s = $$slots;
      if (use_shadow_dom) {
        this.attachShadow({ mode: "open" });
      }
    }
    addEventListener(type, listener, options2) {
      this.$$l[type] = this.$$l[type] || [];
      this.$$l[type].push(listener);
      if (this.$$c) {
        const unsub = this.$$c.$on(type, listener);
        this.$$l_u.set(listener, unsub);
      }
      super.addEventListener(type, listener, options2);
    }
    removeEventListener(type, listener, options2) {
      super.removeEventListener(type, listener, options2);
      if (this.$$c) {
        const unsub = this.$$l_u.get(listener);
        if (unsub) {
          unsub();
          this.$$l_u.delete(listener);
        }
      }
    }
    async connectedCallback() {
      this.$$cn = true;
      if (!this.$$c) {
        let create_slot = function(name) {
          return () => {
            let node;
            const obj = {
              c: function create() {
                node = element("slot");
                if (name !== "default") {
                  attr(node, "name", name);
                }
              },
              /**
               * @param {HTMLElement} target
               * @param {HTMLElement} [anchor]
               */
              m: function mount(target, anchor) {
                insert(target, node, anchor);
              },
              d: function destroy(detaching) {
                if (detaching) {
                  detach(node);
                }
              }
            };
            return obj;
          };
        };
        await Promise.resolve();
        if (!this.$$cn || this.$$c) {
          return;
        }
        const $$slots = {};
        const existing_slots = get_custom_elements_slots(this);
        for (const name of this.$$s) {
          if (name in existing_slots) {
            $$slots[name] = [create_slot(name)];
          }
        }
        for (const attribute of this.attributes) {
          const name = this.$$g_p(attribute.name);
          if (!(name in this.$$d)) {
            this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
          }
        }
        for (const key in this.$$p_d) {
          if (!(key in this.$$d) && this[key] !== void 0) {
            this.$$d[key] = this[key];
            delete this[key];
          }
        }
        this.$$c = new this.$$ctor({
          target: this.shadowRoot || this,
          props: {
            ...this.$$d,
            $$slots,
            $$scope: {
              ctx: []
            }
          }
        });
        const reflect_attributes = () => {
          this.$$r = true;
          for (const key in this.$$p_d) {
            this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
            if (this.$$p_d[key].reflect) {
              const attribute_value = get_custom_element_value(
                key,
                this.$$d[key],
                this.$$p_d,
                "toAttribute"
              );
              if (attribute_value == null) {
                this.removeAttribute(this.$$p_d[key].attribute || key);
              } else {
                this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
              }
            }
          }
          this.$$r = false;
        };
        this.$$c.$$.after_update.push(reflect_attributes);
        reflect_attributes();
        for (const type in this.$$l) {
          for (const listener of this.$$l[type]) {
            const unsub = this.$$c.$on(type, listener);
            this.$$l_u.set(listener, unsub);
          }
        }
        this.$$l = {};
      }
    }
    // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
    // and setting attributes through setAttribute etc, this is helpful
    attributeChangedCallback(attr2, _oldValue, newValue) {
      if (this.$$r) return;
      attr2 = this.$$g_p(attr2);
      this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
      this.$$c?.$set({ [attr2]: this.$$d[attr2] });
    }
    disconnectedCallback() {
      this.$$cn = false;
      Promise.resolve().then(() => {
        if (!this.$$cn && this.$$c) {
          this.$$c.$destroy();
          this.$$c = void 0;
        }
      });
    }
    $$g_p(attribute_name) {
      return Object.keys(this.$$p_d).find(
        (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
      ) || attribute_name;
    }
  };
}
function get_custom_element_value(prop, value, props_definition, transform) {
  const type = props_definition[prop]?.type;
  value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
  if (!transform || !props_definition[prop]) {
    return value;
  } else if (transform === "toAttribute") {
    switch (type) {
      case "Object":
      case "Array":
        return value == null ? null : JSON.stringify(value);
      case "Boolean":
        return value ? "" : null;
      case "Number":
        return value == null ? null : value;
      default:
        return value;
    }
  } else {
    switch (type) {
      case "Object":
      case "Array":
        return value && JSON.parse(value);
      case "Boolean":
        return value;
      case "Number":
        return value != null ? +value : value;
      default:
        return value;
    }
  }
}
var SvelteComponent = class {
  /**
   * ### PRIVATE API
   *
   * Do not use, may change at any time
   *
   * @type {any}
   */
  $$ = void 0;
  /**
   * ### PRIVATE API
   *
   * Do not use, may change at any time
   *
   * @type {any}
   */
  $$set = void 0;
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1) callbacks.splice(index, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true;
      this.$$set(props);
      this.$$.skip_bound = false;
    }
  }
};

// node_modules/svelte/src/shared/version.js
var PUBLIC_VERSION = "4";

// node_modules/svelte/src/runtime/internal/disclose-version/index.js
if (typeof window !== "undefined")
  (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);

// source/options/components/Form.svelte
var import_tooltip = __toESM(require_tooltip());

// node_modules/svelte/src/runtime/easing/index.js
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}

// node_modules/svelte/src/runtime/animate/index.js
function flip(node, { from, to }, params = {}) {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;
  const [ox, oy] = style.transformOrigin.split(" ").map(parseFloat);
  const dx = from.left + from.width * ox / to.width - (to.left + ox);
  const dy = from.top + from.height * oy / to.height - (to.top + oy);
  const { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;
  return {
    delay,
    duration: is_function(duration) ? duration(Math.sqrt(dx * dx + dy * dy)) : duration,
    easing,
    css: (t, u) => {
      const x = u * dx;
      const y = u * dy;
      const sx = t + u * from.width / to.width;
      const sy = t + u * from.height / to.height;
      return `transform: ${transform} translate(${x}px, ${y}px) scale(${sx}, ${sy});`;
    }
  };
}

// node_modules/svelte/src/runtime/transition/index.js
function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  const [xValue, xUnit] = split_css_unit(x);
  const [yValue, yUnit] = split_css_unit(y);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
			opacity: ${target_opacity - od * u}`
  };
}
function slide(node, { delay = 0, duration = 400, easing = cubicOut, axis = "y" } = {}) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const primary_property = axis === "y" ? "height" : "width";
  const primary_property_value = parseFloat(style[primary_property]);
  const secondary_properties = axis === "y" ? ["top", "bottom"] : ["left", "right"];
  const capitalized_secondary_properties = secondary_properties.map(
    (e) => `${e[0].toUpperCase()}${e.slice(1)}`
  );
  const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
  const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
  const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
  const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
  const border_width_start_value = parseFloat(
    style[`border${capitalized_secondary_properties[0]}Width`]
  );
  const border_width_end_value = parseFloat(
    style[`border${capitalized_secondary_properties[1]}Width`]
  );
  return {
    delay,
    duration,
    easing,
    css: (t) => `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};${primary_property}: ${t * primary_property_value}px;padding-${secondary_properties[0]}: ${t * padding_start_value}px;padding-${secondary_properties[1]}: ${t * padding_end_value}px;margin-${secondary_properties[0]}: ${t * margin_start_value}px;margin-${secondary_properties[1]}: ${t * margin_end_value}px;border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
  };
}

// node_modules/svelte/src/runtime/store/index.js
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update2) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}

// source/options/stores/alert-store.ts
function createStore() {
  const { subscribe: subscribe2, set } = writable({
    variant: null,
    message: null
  });
  return {
    subscribe: subscribe2,
    success: (message) => set({ variant: "success", message }),
    error: (message) => set({ variant: "danger", message }),
    hide: () => set({ variant: null, message: null })
  };
}
var alert = createStore();

// source/options/stores/options-store.ts
var createStore2 = () => {
  const { subscribe: subscribe2, set, update: update2 } = writable(
    structuredClone(defaultOptions)
  );
  return {
    set,
    subscribe: subscribe2,
    resetAll: () => set(structuredClone(defaultOptions)),
    addProvider: () => update2((previous) => ({
      ...previous,
      storageProviders: [...previous.storageProviders, { ...newProvider }]
    })),
    removeProvider: (indexToRemove) => update2((previous) => ({
      ...previous,
      storageProviders: previous.storageProviders.filter(
        (_, i) => i !== indexToRemove
      )
    })),
    resetProviders: () => update2((previous) => ({
      ...previous,
      storageProviders: defaultOptions.storageProviders.map((p) => ({
        ...p
      }))
    })),
    moveProviderUp: (providerIndex) => update2((previous) => ({
      ...previous,
      storageProviders: arraymove(
        previous.storageProviders,
        providerIndex,
        getUpperIndex(previous.storageProviders.length, providerIndex)
      )
    })),
    moveProviderDown: (providerIndex) => update2((previous) => ({
      ...previous,
      storageProviders: arraymove(
        previous.storageProviders,
        providerIndex,
        getLowerIndex(previous.storageProviders.length, providerIndex)
      )
    })),
    loadFromStorage: async () => set(await getOptions())
  };
};
var options = createStore2();

// source/options/components/Provider.svelte
function create_if_block_1(ctx) {
  let div3;
  let div2;
  let div0;
  let label0;
  let input0;
  let t0;
  let t1_value = getMessage("doNotEncodeUrlLabel") + "";
  let t1;
  let t2;
  let div1;
  let label1;
  let input1;
  let t3;
  let t4_value = getMessage("stripProtocolLabel") + "";
  let t4;
  let div3_transition;
  let current;
  let mounted;
  let dispose;
  return {
    c() {
      div3 = element("div");
      div2 = element("div");
      div0 = element("div");
      label0 = element("label");
      input0 = element("input");
      t0 = space();
      t1 = text(t1_value);
      t2 = space();
      div1 = element("div");
      label1 = element("label");
      input1 = element("input");
      t3 = space();
      t4 = text(t4_value);
      attr(input0, "class", "form-check-input");
      attr(input0, "type", "checkbox");
      attr(input0, "name", "doNotEncodeUrl");
      attr(label0, "class", "form-check-label");
      attr(div0, "class", "form-check form-check-inline");
      attr(input1, "class", "form-check-input");
      attr(input1, "type", "checkbox");
      attr(input1, "name", "stripProtocol");
      attr(label1, "class", "form-check-label");
      attr(div1, "class", "form-check form-check-inline");
      attr(div2, "class", "col");
      attr(div3, "class", "row");
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div2);
      append(div2, div0);
      append(div0, label0);
      append(label0, input0);
      input0.checked = /*provider*/
      ctx[0].doNotEncodeUrl;
      append(label0, t0);
      append(label0, t1);
      append(div2, t2);
      append(div2, div1);
      append(div1, label1);
      append(label1, input1);
      input1.checked = /*provider*/
      ctx[0].stripProtocol;
      append(label1, t3);
      append(label1, t4);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            input0,
            "change",
            /*input0_change_handler_1*/
            ctx[14]
          ),
          listen(
            input1,
            "change",
            /*input1_change_handler*/
            ctx[15]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*provider*/
      1) {
        input0.checked = /*provider*/
        ctx2[0].doNotEncodeUrl;
      }
      if (dirty & /*provider*/
      1) {
        input1.checked = /*provider*/
        ctx2[0].stripProtocol;
      }
    },
    i(local) {
      if (current) return;
      if (local) {
        add_render_callback(() => {
          if (!current) return;
          if (!div3_transition) div3_transition = create_bidirectional_transition(div3, slide, {}, true);
          div3_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      if (local) {
        if (!div3_transition) div3_transition = create_bidirectional_transition(div3, slide, {}, false);
        div3_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
      if (detaching && div3_transition) div3_transition.end();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block(ctx) {
  let div2;
  let div1;
  let div0;
  let t0;
  let t1;
  let button;
  let div2_transition;
  let current;
  let mounted;
  let dispose;
  return {
    c() {
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      t0 = text(
        /*errorMsg*/
        ctx[3]
      );
      t1 = space();
      button = element("button");
      button.textContent = "\xA0";
      attr(button, "type", "button");
      attr(button, "class", "btn-close");
      attr(button, "data-bs-dismiss", "alert");
      attr(button, "aria-label", "Close");
      attr(div0, "class", "alert alert-danger alert-dismissible");
      attr(div0, "role", "alert");
      attr(div1, "class", "col");
      attr(div2, "class", "row mt-3");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div1);
      append(div1, div0);
      append(div0, t0);
      append(div0, t1);
      append(div0, button);
      current = true;
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*hideAlert*/
          ctx[5]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!current || dirty & /*errorMsg*/
      8) set_data(
        t0,
        /*errorMsg*/
        ctx2[3]
      );
    },
    i(local) {
      if (current) return;
      if (local) {
        add_render_callback(() => {
          if (!current) return;
          if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fly, {}, true);
          div2_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      if (local) {
        if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fly, {}, false);
        div2_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      if (detaching && div2_transition) div2_transition.end();
      mounted = false;
      dispose();
    }
  };
}
function create_fragment(ctx) {
  let fieldset;
  let button0;
  let t1;
  let button1;
  let t3;
  let div0;
  let input0;
  let t4;
  let div1;
  let img;
  let img_src_value;
  let t5;
  let input1;
  let input1_placeholder_value;
  let t6;
  let input2;
  let input2_placeholder_value;
  let t7;
  let button2;
  let t9;
  let button3;
  let fieldset_transition;
  let t11;
  let div2;
  let t12;
  let if_block1_anchor;
  let current;
  let mounted;
  let dispose;
  let if_block0 = (
    /*showAdvanced*/
    ctx[2] && create_if_block_1(ctx)
  );
  let if_block1 = (
    /*errorMsg*/
    ctx[3] !== null && create_if_block(ctx)
  );
  return {
    c() {
      fieldset = element("fieldset");
      button0 = element("button");
      button0.textContent = "\u25B2";
      t1 = space();
      button1 = element("button");
      button1.textContent = "\u25BC";
      t3 = space();
      div0 = element("div");
      input0 = element("input");
      t4 = space();
      div1 = element("div");
      img = element("img");
      t5 = space();
      input1 = element("input");
      t6 = space();
      input2 = element("input");
      t7 = space();
      button2 = element("button");
      button2.textContent = "\u2699";
      t9 = space();
      button3 = element("button");
      button3.textContent = "\u274C";
      t11 = space();
      div2 = element("div");
      if (if_block0) if_block0.c();
      t12 = space();
      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
      attr(button0, "class", "btn btn-sm btn-secondary");
      attr(button0, "type", "button");
      attr(button1, "class", "btn btn-sm btn-secondary");
      attr(button1, "type", "button");
      attr(input0, "class", "form-check-input");
      attr(input0, "type", "checkbox");
      attr(input0, "name", "selected");
      attr(div0, "class", "input-group-text");
      attr(img, "class", "pointer");
      attr(img, "alt", "Icon");
      attr(img, "width", "24");
      attr(img, "height", "24");
      if (!src_url_equal(img.src, img_src_value = /*iconUrl*/
      ctx[4])) attr(img, "src", img_src_value);
      attr(div1, "class", "input-group-text");
      attr(input1, "class", "form-control");
      attr(input1, "type", "text");
      attr(input1, "name", "name");
      attr(input1, "placeholder", input1_placeholder_value = getMessage("providerNamePlaceholder"));
      input1.required = true;
      attr(input1, "minlength", "2");
      attr(input1, "maxlength", "15");
      attr(input2, "class", "form-control w-50");
      attr(input2, "type", "url");
      attr(input2, "name", "url");
      attr(input2, "placeholder", input2_placeholder_value = getMessage("providerURLPlaceholder"));
      input2.required = true;
      attr(input2, "pattern", "https?:\\/\\/.*%s.*");
      attr(button2, "class", "btn btn-sm");
      attr(button2, "type", "button");
      toggle_class(button2, "btn-outline-secondary", !/*showAdvanced*/
      ctx[2]);
      toggle_class(
        button2,
        "btn-secondary",
        /*showAdvanced*/
        ctx[2]
      );
      attr(button3, "class", "btn btn-sm btn-outline-danger");
      attr(button3, "type", "button");
      attr(fieldset, "class", "input-group");
      attr(fieldset, "name", "storageProviders");
      toggle_class(
        div2,
        "mt-2",
        /*showAdvanced*/
        ctx[2]
      );
    },
    m(target, anchor) {
      insert(target, fieldset, anchor);
      append(fieldset, button0);
      append(fieldset, t1);
      append(fieldset, button1);
      append(fieldset, t3);
      append(fieldset, div0);
      append(div0, input0);
      input0.checked = /*provider*/
      ctx[0].selected;
      append(fieldset, t4);
      append(fieldset, div1);
      append(div1, img);
      append(fieldset, t5);
      append(fieldset, input1);
      set_input_value(
        input1,
        /*provider*/
        ctx[0].name
      );
      append(fieldset, t6);
      append(fieldset, input2);
      set_input_value(
        input2,
        /*provider*/
        ctx[0].url
      );
      append(fieldset, t7);
      append(fieldset, button2);
      append(fieldset, t9);
      append(fieldset, button3);
      insert(target, t11, anchor);
      insert(target, div2, anchor);
      if (if_block0) if_block0.m(div2, null);
      insert(target, t12, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler*/
            ctx[7]
          ),
          listen(
            button1,
            "click",
            /*click_handler_1*/
            ctx[8]
          ),
          listen(
            input0,
            "change",
            /*input0_change_handler*/
            ctx[9]
          ),
          listen(
            img,
            "click",
            /*uploadIcon*/
            ctx[6]
          ),
          listen(
            input1,
            "input",
            /*input1_input_handler*/
            ctx[10]
          ),
          listen(
            input2,
            "input",
            /*input2_input_handler*/
            ctx[11]
          ),
          listen(
            button2,
            "click",
            /*click_handler_2*/
            ctx[12]
          ),
          listen(
            button3,
            "click",
            /*click_handler_3*/
            ctx[13]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*provider*/
      1) {
        input0.checked = /*provider*/
        ctx2[0].selected;
      }
      if (!current || dirty & /*iconUrl*/
      16 && !src_url_equal(img.src, img_src_value = /*iconUrl*/
      ctx2[4])) {
        attr(img, "src", img_src_value);
      }
      if (dirty & /*provider*/
      1 && input1.value !== /*provider*/
      ctx2[0].name) {
        set_input_value(
          input1,
          /*provider*/
          ctx2[0].name
        );
      }
      if (dirty & /*provider*/
      1 && input2.value !== /*provider*/
      ctx2[0].url) {
        set_input_value(
          input2,
          /*provider*/
          ctx2[0].url
        );
      }
      if (!current || dirty & /*showAdvanced*/
      4) {
        toggle_class(button2, "btn-outline-secondary", !/*showAdvanced*/
        ctx2[2]);
      }
      if (!current || dirty & /*showAdvanced*/
      4) {
        toggle_class(
          button2,
          "btn-secondary",
          /*showAdvanced*/
          ctx2[2]
        );
      }
      if (
        /*showAdvanced*/
        ctx2[2]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*showAdvanced*/
          4) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div2, null);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (!current || dirty & /*showAdvanced*/
      4) {
        toggle_class(
          div2,
          "mt-2",
          /*showAdvanced*/
          ctx2[2]
        );
      }
      if (
        /*errorMsg*/
        ctx2[3] !== null
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*errorMsg*/
          8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      if (local) {
        add_render_callback(() => {
          if (!current) return;
          if (!fieldset_transition) fieldset_transition = create_bidirectional_transition(fieldset, fly, {}, true);
          fieldset_transition.run(1);
        });
      }
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      if (local) {
        if (!fieldset_transition) fieldset_transition = create_bidirectional_transition(fieldset, fly, {}, false);
        fieldset_transition.run(0);
      }
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(fieldset);
        detach(t11);
        detach(div2);
        detach(t12);
        detach(if_block1_anchor);
      }
      if (detaching && fieldset_transition) fieldset_transition.end();
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let iconUrl;
  let { index } = $$props;
  let { provider } = $$props;
  const advancedOptionsChanged = provider.stripProtocol || provider.doNotEncodeUrl;
  let showAdvanced = advancedOptionsChanged;
  let errorMsg = null;
  const hideAlert = () => {
    $$invalidate(3, errorMsg = null);
  };
  const getIcon = (icon) => {
    if (icon.startsWith("icons/")) {
      return chrome.runtime.getURL(icon);
    }
    return icon;
  };
  const uploadIcon = () => {
    if (!isFirefox) {
      $$invalidate(3, errorMsg = getMessage("msgIconUploadNotSupported"));
      return;
    }
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", () => {
      if (!fileInput.files || fileInput.files.length === 0) {
        return;
      }
      $$invalidate(3, errorMsg = null);
      const file = fileInput.files[0];
      if (!file.type.startsWith("image/")) {
        $$invalidate(3, errorMsg = getMessage("msgIconUploadNotImage"));
        return;
      }
      const tmpImg = new Image();
      tmpImg.addEventListener("error", () => {
        $$invalidate(3, errorMsg = getMessage("msgIconUploadNotImage"));
      });
      tmpImg.addEventListener("load", () => {
        if (tmpImg.naturalHeight !== tmpImg.naturalWidth) {
          $$invalidate(3, errorMsg = getMessage("msgIconUploadNotSquareImage"));
          return;
        }
        const canvas = document.createElement("canvas");
        canvas.width = 24;
        canvas.height = 24;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          $$invalidate(3, errorMsg = getMessage("msgIconUploadNotImage"));
          return;
        }
        ctx.drawImage(tmpImg, 0, 0, 24, 24);
        $$invalidate(0, provider.icon = base64EncodeIcon(ctx), provider);
      });
      tmpImg.src = URL.createObjectURL(file);
    });
    fileInput.click();
  };
  const click_handler = () => options.moveProviderUp(index);
  const click_handler_1 = () => options.moveProviderDown(index);
  function input0_change_handler() {
    provider.selected = this.checked;
    $$invalidate(0, provider);
  }
  function input1_input_handler() {
    provider.name = this.value;
    $$invalidate(0, provider);
  }
  function input2_input_handler() {
    provider.url = this.value;
    $$invalidate(0, provider);
  }
  const click_handler_2 = () => $$invalidate(2, showAdvanced = !showAdvanced);
  const click_handler_3 = () => options.removeProvider(index);
  function input0_change_handler_1() {
    provider.doNotEncodeUrl = this.checked;
    $$invalidate(0, provider);
  }
  function input1_change_handler() {
    provider.stripProtocol = this.checked;
    $$invalidate(0, provider);
  }
  $$self.$$set = ($$props2) => {
    if ("index" in $$props2) $$invalidate(1, index = $$props2.index);
    if ("provider" in $$props2) $$invalidate(0, provider = $$props2.provider);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*provider*/
    1) {
      $: $$invalidate(4, iconUrl = getIcon(provider.icon));
    }
  };
  return [
    provider,
    index,
    showAdvanced,
    errorMsg,
    iconUrl,
    hideAlert,
    uploadIcon,
    click_handler,
    click_handler_1,
    input0_change_handler,
    input1_input_handler,
    input2_input_handler,
    click_handler_2,
    click_handler_3,
    input0_change_handler_1,
    input1_change_handler
  ];
}
var Provider = class extends SvelteComponent {
  constructor(options2) {
    super();
    init(this, options2, instance, create_fragment, safe_not_equal, { index: 1, provider: 0 });
  }
};
var Provider_default = Provider;

// source/options/components/Form.svelte
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  child_ctx[12] = i;
  return child_ctx;
}
function create_each_block(key_1, ctx) {
  let div1;
  let div0;
  let provider_1;
  let rect;
  let stop_animation = noop;
  let current;
  provider_1 = new Provider_default({
    props: {
      index: (
        /*index*/
        ctx[12]
      ),
      provider: (
        /*provider*/
        ctx[10]
      )
    }
  });
  return {
    key: key_1,
    first: null,
    c() {
      div1 = element("div");
      div0 = element("div");
      create_component(provider_1.$$.fragment);
      attr(div0, "class", "col");
      attr(div1, "class", "row mb-2");
      this.first = div1;
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      mount_component(provider_1, div0, null);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const provider_1_changes = {};
      if (dirty & /*$options*/
      1) provider_1_changes.index = /*index*/
      ctx[12];
      if (dirty & /*$options*/
      1) provider_1_changes.provider = /*provider*/
      ctx[10];
      provider_1.$set(provider_1_changes);
    },
    r() {
      rect = div1.getBoundingClientRect();
    },
    f() {
      fix_position(div1);
      stop_animation();
    },
    a() {
      stop_animation();
      stop_animation = create_animation(div1, rect, flip, { duration: (
        /*func*/
        ctx[9]
      ) });
    },
    i(local) {
      if (current) return;
      transition_in(provider_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(provider_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(provider_1);
    }
  };
}
function create_if_block2(ctx) {
  let div2;
  let div1;
  let div0;
  let t0_value = (
    /*$alert*/
    ctx[1].message + ""
  );
  let t0;
  let t1;
  let button;
  let div0_class_value;
  let div2_transition;
  let current;
  let mounted;
  let dispose;
  return {
    c() {
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      button = element("button");
      button.textContent = "\xA0";
      attr(button, "type", "button");
      attr(button, "class", "btn-close");
      attr(button, "data-bs-dismiss", "alert");
      attr(button, "aria-label", "Close");
      attr(div0, "class", div0_class_value = `alert alert-${/*$alert*/
      ctx[1].variant} alert-dismissible`);
      attr(div0, "role", "alert");
      attr(div1, "class", "col");
      attr(div2, "class", "row mt-3");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div1);
      append(div1, div0);
      append(div0, t0);
      append(div0, t1);
      append(div0, button);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", alert.hide);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if ((!current || dirty & /*$alert*/
      2) && t0_value !== (t0_value = /*$alert*/
      ctx2[1].message + "")) set_data(t0, t0_value);
      if (!current || dirty & /*$alert*/
      2 && div0_class_value !== (div0_class_value = `alert alert-${/*$alert*/
      ctx2[1].variant} alert-dismissible`)) {
        attr(div0, "class", div0_class_value);
      }
    },
    i(local) {
      if (current) return;
      if (local) {
        add_render_callback(() => {
          if (!current) return;
          if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fly, {}, true);
          div2_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      if (local) {
        if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fly, {}, false);
        div2_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      if (detaching && div2_transition) div2_transition.end();
      mounted = false;
      dispose();
    }
  };
}
function create_fragment2(ctx) {
  let form;
  let div1;
  let label0;
  let t1;
  let div0;
  let input0;
  let t2;
  let div3;
  let label1;
  let t4;
  let div2;
  let input1;
  let input1_disabled_value;
  let t5;
  let div5;
  let label2;
  let t7;
  let div4;
  let input2;
  let input2_disabled_value;
  let t8;
  let div7;
  let label3;
  let t9_value = getMessage("searchAllByDefault") + "";
  let t9;
  let t10;
  let button0;
  let button0_title_value;
  let t12;
  let div6;
  let input3;
  let t13;
  let div9;
  let label4;
  let t15;
  let div8;
  let select;
  let option0;
  let option1;
  let option2;
  let t19;
  let hr0;
  let t20;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let t21;
  let div11;
  let div10;
  let button1;
  let t23;
  let button2;
  let t25;
  let hr1;
  let t26;
  let t27;
  let div13;
  let div12;
  let button3;
  let current;
  let mounted;
  let dispose;
  let each_value = ensure_array_like(
    /*$options*/
    ctx[0].storageProviders
  );
  const get_key = (ctx2) => (
    /*provider*/
    ctx2[10]
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  let if_block = (
    /*$alert*/
    ctx[1].variant !== null && create_if_block2(ctx)
  );
  return {
    c() {
      form = element("form");
      div1 = element("div");
      label0 = element("label");
      label0.textContent = `${getMessage("openInBackgroundLabel")}`;
      t1 = space();
      div0 = element("div");
      input0 = element("input");
      t2 = space();
      div3 = element("div");
      label1 = element("label");
      label1.textContent = `${getMessage("showOpenAll")}`;
      t4 = space();
      div2 = element("div");
      input1 = element("input");
      t5 = space();
      div5 = element("div");
      label2 = element("label");
      label2.textContent = `${getMessage("showOpenAllAtTop")}`;
      t7 = space();
      div4 = element("div");
      input2 = element("input");
      t8 = space();
      div7 = element("div");
      label3 = element("label");
      t9 = text(t9_value);
      t10 = space();
      button0 = element("button");
      button0.textContent = "i";
      t12 = space();
      div6 = element("div");
      input3 = element("input");
      t13 = space();
      div9 = element("div");
      label4 = element("label");
      label4.textContent = `${getMessage("openTabAtLabel")}`;
      t15 = space();
      div8 = element("div");
      select = element("select");
      option0 = element("option");
      option0.textContent = `${getMessage("openTabAtRight")}`;
      option1 = element("option");
      option1.textContent = `${getMessage("openTabAtLeft")}`;
      option2 = element("option");
      option2.textContent = `${getMessage("openTabAtEnd")}`;
      t19 = space();
      hr0 = element("hr");
      t20 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t21 = space();
      div11 = element("div");
      div10 = element("div");
      button1 = element("button");
      button1.textContent = `${getMessage("addSearchProvider")}`;
      t23 = space();
      button2 = element("button");
      button2.textContent = `${getMessage("restoreDefaultSearchProviders")}`;
      t25 = space();
      hr1 = element("hr");
      t26 = space();
      if (if_block) if_block.c();
      t27 = space();
      div13 = element("div");
      div12 = element("div");
      button3 = element("button");
      button3.textContent = `${getMessage("saveOptions")}`;
      attr(label0, "class", "col-sm-3 col-form-label form-check-label");
      attr(label0, "for", "openInBackground");
      attr(input0, "id", "openInBackground");
      attr(input0, "class", "form-check-input mt-2");
      attr(input0, "name", "openInBackground");
      attr(input0, "type", "checkbox");
      attr(div0, "class", "col-sm-9");
      attr(div1, "class", "row");
      attr(label1, "class", "col-sm-3 col-form-label form-check-label");
      attr(label1, "for", "showOpenAll");
      attr(input1, "id", "showOpenAll");
      attr(input1, "class", "form-check-input mt-2");
      attr(input1, "name", "showOpenAll");
      attr(input1, "type", "checkbox");
      input1.disabled = input1_disabled_value = /*$options*/
      ctx[0].searchAllByDefault === true;
      attr(div2, "class", "col-sm-9");
      attr(div3, "class", "row");
      attr(label2, "class", "col-sm-3 col-form-label form-check-label");
      attr(label2, "for", "showOpenAllAtTop");
      attr(input2, "id", "showOpenAllAtTop");
      attr(input2, "class", "form-check-input mt-2");
      attr(input2, "name", "showOpenAllAtTop");
      attr(input2, "type", "checkbox");
      input2.disabled = input2_disabled_value = /*$options*/
      ctx[0].searchAllByDefault === true || /*$options*/
      ctx[0].showOpenAll === false;
      attr(div4, "class", "col-sm-9");
      attr(div5, "class", "row");
      attr(button0, "class", "btn btn-secondary badge rounded-pill");
      attr(button0, "title", button0_title_value = getMessage("searchAllByDefault_info"));
      attr(button0, "type", "button");
      attr(button0, "data-bs-toggle", "tooltip");
      attr(button0, "data-bs-placement", "top");
      attr(label3, "class", "col-sm-3 col-form-label form-check-label");
      attr(label3, "for", "searchAllByDefault");
      attr(input3, "id", "searchAllByDefault");
      attr(input3, "class", "form-check-input mt-2");
      attr(input3, "name", "searchAllByDefault");
      attr(input3, "type", "checkbox");
      attr(div6, "class", "col-sm-9");
      attr(div7, "class", "row");
      attr(label4, "class", "col-sm-3 col-form-label form-check-label");
      attr(label4, "for", "openTabAt");
      option0.__value = "right";
      set_input_value(option0, option0.__value);
      option1.__value = "left";
      set_input_value(option1, option1.__value);
      option2.__value = "end";
      set_input_value(option2, option2.__value);
      attr(select, "id", "openTabAt");
      attr(select, "class", "form-select");
      attr(select, "name", "openTabAt");
      if (
        /*$options*/
        ctx[0].openTabAt === void 0
      ) add_render_callback(() => (
        /*select_change_handler*/
        ctx[8].call(select)
      ));
      attr(div8, "class", "col-sm");
      attr(div9, "class", "row");
      attr(button1, "class", "btn btn-primary");
      attr(button1, "type", "button");
      attr(button2, "class", "btn btn-outline-secondary");
      attr(button2, "type", "button");
      attr(div10, "class", "col text-center");
      attr(div11, "class", "row");
      attr(button3, "class", "btn btn-success");
      attr(button3, "type", "submit");
      attr(div12, "class", "col");
      attr(div13, "class", "row");
    },
    m(target, anchor) {
      insert(target, form, anchor);
      append(form, div1);
      append(div1, label0);
      append(div1, t1);
      append(div1, div0);
      append(div0, input0);
      input0.checked = /*$options*/
      ctx[0].openInBackground;
      append(form, t2);
      append(form, div3);
      append(div3, label1);
      append(div3, t4);
      append(div3, div2);
      append(div2, input1);
      input1.checked = /*$options*/
      ctx[0].showOpenAll;
      append(form, t5);
      append(form, div5);
      append(div5, label2);
      append(div5, t7);
      append(div5, div4);
      append(div4, input2);
      input2.checked = /*$options*/
      ctx[0].showOpenAllAtTop;
      append(form, t8);
      append(form, div7);
      append(div7, label3);
      append(label3, t9);
      append(label3, t10);
      append(label3, button0);
      append(div7, t12);
      append(div7, div6);
      append(div6, input3);
      input3.checked = /*$options*/
      ctx[0].searchAllByDefault;
      append(form, t13);
      append(form, div9);
      append(div9, label4);
      append(div9, t15);
      append(div9, div8);
      append(div8, select);
      append(select, option0);
      append(select, option1);
      append(select, option2);
      select_option(
        select,
        /*$options*/
        ctx[0].openTabAt,
        true
      );
      append(form, t19);
      append(form, hr0);
      append(form, t20);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(form, null);
        }
      }
      append(form, t21);
      append(form, div11);
      append(div11, div10);
      append(div10, button1);
      append(div10, t23);
      append(div10, button2);
      append(form, t25);
      append(form, hr1);
      append(form, t26);
      if (if_block) if_block.m(form, null);
      append(form, t27);
      append(form, div13);
      append(div13, div12);
      append(div12, button3);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            input0,
            "change",
            /*input0_change_handler*/
            ctx[4]
          ),
          listen(
            input1,
            "change",
            /*input1_change_handler*/
            ctx[5]
          ),
          listen(
            input2,
            "change",
            /*input2_change_handler*/
            ctx[6]
          ),
          listen(
            input3,
            "change",
            /*input3_change_handler*/
            ctx[7]
          ),
          listen(
            select,
            "change",
            /*select_change_handler*/
            ctx[8]
          ),
          listen(button1, "click", options.addProvider),
          listen(button2, "click", prevent_default(
            /*reset*/
            ctx[3]
          )),
          listen(form, "submit", prevent_default(
            /*save*/
            ctx[2]
          ))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*$options*/
      1) {
        input0.checked = /*$options*/
        ctx2[0].openInBackground;
      }
      if (!current || dirty & /*$options*/
      1 && input1_disabled_value !== (input1_disabled_value = /*$options*/
      ctx2[0].searchAllByDefault === true)) {
        input1.disabled = input1_disabled_value;
      }
      if (dirty & /*$options*/
      1) {
        input1.checked = /*$options*/
        ctx2[0].showOpenAll;
      }
      if (!current || dirty & /*$options*/
      1 && input2_disabled_value !== (input2_disabled_value = /*$options*/
      ctx2[0].searchAllByDefault === true || /*$options*/
      ctx2[0].showOpenAll === false)) {
        input2.disabled = input2_disabled_value;
      }
      if (dirty & /*$options*/
      1) {
        input2.checked = /*$options*/
        ctx2[0].showOpenAllAtTop;
      }
      if (dirty & /*$options*/
      1) {
        input3.checked = /*$options*/
        ctx2[0].searchAllByDefault;
      }
      if (dirty & /*$options*/
      1) {
        select_option(
          select,
          /*$options*/
          ctx2[0].openTabAt
        );
      }
      if (dirty & /*$options*/
      1) {
        each_value = ensure_array_like(
          /*$options*/
          ctx2[0].storageProviders
        );
        group_outros();
        for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].r();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, form, fix_and_outro_and_destroy_block, create_each_block, t21, get_each_context);
        for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].a();
        check_outros();
      }
      if (
        /*$alert*/
        ctx2[1].variant !== null
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*$alert*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(form, t27);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(if_block);
      current = true;
    },
    o(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(form);
      }
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance2($$self, $$props, $$invalidate) {
  let $options;
  let $alert;
  component_subscribe($$self, options, ($$value) => $$invalidate(0, $options = $$value));
  component_subscribe($$self, alert, ($$value) => $$invalidate(1, $alert = $$value));
  const save = () => {
    if ($options.storageProviders.length === 0 || $options.storageProviders.filter((provider) => provider.selected).length === 0) {
      alert.error(getMessage("msgAtLeastOneSearchProvider"));
      return;
    }
    const nameSet = /* @__PURE__ */ new Set();
    for (let index = 0; index < $options.storageProviders.length; index++) {
      const providerNumber = index + 1;
      const storageProvider = $options.storageProviders[index];
      if (!/^https?:\/\/.*%s.*$/.test(storageProvider.url)) {
        alert.error(getMessage("providerURLPlaceholderError", providerNumber.toString()));
        return;
      }
      if (storageProvider.name.length < 2 || storageProvider.name.length > 15) {
        alert.error(getMessage("providerNamePlaceholderError", providerNumber.toString()));
        return;
      }
      nameSet.add(storageProvider.name);
    }
    if (nameSet.size !== $options.storageProviders.length) {
      alert.error(getMessage("msgDuplicatedProviderName"));
      return;
    }
    chrome.storage.sync.set($options).then(() => {
      alert.success(getMessage("msgSuccessSaveOptions"));
      setTimeout(() => alert.hide(), 3e3);
    }).catch(() => alert.error(getMessage("errorWhileSaving")));
  };
  const reset = () => {
    options.resetProviders();
    alert.hide();
  };
  onMount(async () => {
    for (const toastNode of document.querySelectorAll('[data-bs-toggle="tooltip"]')) new import_tooltip.default(toastNode);
  });
  function input0_change_handler() {
    $options.openInBackground = this.checked;
    options.set($options);
  }
  function input1_change_handler() {
    $options.showOpenAll = this.checked;
    options.set($options);
  }
  function input2_change_handler() {
    $options.showOpenAllAtTop = this.checked;
    options.set($options);
  }
  function input3_change_handler() {
    $options.searchAllByDefault = this.checked;
    options.set($options);
  }
  function select_change_handler() {
    $options.openTabAt = select_value(this);
    options.set($options);
  }
  const func = (d) => 30 * Math.sqrt(d);
  return [
    $options,
    $alert,
    save,
    reset,
    input0_change_handler,
    input1_change_handler,
    input2_change_handler,
    input3_change_handler,
    select_change_handler,
    func
  ];
}
var Form = class extends SvelteComponent {
  constructor(options2) {
    super();
    init(this, options2, instance2, create_fragment2, safe_not_equal, {});
  }
};
var Form_default = Form;

// source/options/App.svelte
function create_else_block(ctx) {
  let p;
  return {
    c() {
      p = element("p");
      p.textContent = "...";
      attr(p, "class", "h1");
    },
    m(target, anchor) {
      insert(target, p, anchor);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_if_block3(ctx) {
  let h1;
  let t1;
  let div;
  let form;
  let current;
  form = new Form_default({});
  return {
    c() {
      h1 = element("h1");
      h1.textContent = `${getMessage("extensionName")}`;
      t1 = space();
      div = element("div");
      create_component(form.$$.fragment);
      attr(h1, "class", "text-center");
      attr(div, "class", "p-3 bg-light");
    },
    m(target, anchor) {
      insert(target, h1, anchor);
      insert(target, t1, anchor);
      insert(target, div, anchor);
      mount_component(form, div, null);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(form.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(form.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(h1);
        detach(t1);
        detach(div);
      }
      destroy_component(form);
    }
  };
}
function create_fragment3(ctx) {
  let main;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block3, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*doneLoading*/
      ctx2[0]
    ) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx, -1);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      main = element("main");
      if_block.c();
      attr(main, "class", "container mt-3");
    },
    m(target, anchor) {
      insert(target, main, anchor);
      if_blocks[current_block_type_index].m(main, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2, dirty);
      if (current_block_type_index !== previous_block_index) {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
        }
        transition_in(if_block, 1);
        if_block.m(main, null);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(main);
      }
      if_blocks[current_block_type_index].d();
    }
  };
}
function instance3($$self, $$props, $$invalidate) {
  let doneLoading = false;
  onMount(async () => {
    document.title = `${getMessage("extensionName")} | ${getMessage("optionsPageTitle")}`;
    await options.loadFromStorage();
    $$invalidate(0, doneLoading = true);
  });
  return [doneLoading];
}
var App = class extends SvelteComponent {
  constructor(options2) {
    super();
    init(this, options2, instance3, create_fragment3, safe_not_equal, {});
  }
};
var App_default = App;

// source/options/options.ts
new App_default({
  target: document.body
});
