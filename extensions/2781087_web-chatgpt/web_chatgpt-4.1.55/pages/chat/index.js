import {
  OptionPageInit_default
} from "../../chunks/UMCONQCQ.js";
import {
  icon48_default
} from "../../chunks/ZZSFHXCT.js";
import "../../chunks/WP4FFO4A.js";
import {
  useTranslation
} from "../../chunks/DLRZRKOT.js";
import {
  SearchProviderAllInOneIcon,
  SearchProviderIcon_default
} from "../../chunks/UX2THGP6.js";
import "../../chunks/7VGRMZHF.js";
import "../../chunks/EPPA4V3R.js";
import "../../chunks/M6PYVE3O.js";
import {
  AppTheme_default,
  CustomIcon_default,
  require_client
} from "../../chunks/55DHG6VJ.js";
import "../../chunks/PXXULB6N.js";
import {
  SnackbarProvider
} from "../../chunks/2W4EJGTF.js";
import {
  require_createSvgIcon
} from "../../chunks/6MWXJIRO.js";
import "../../chunks/4QWY354J.js";
import {
  Recoil_index_20,
  Recoil_index_24,
  Recoil_index_5,
  Recoil_index_8
} from "../../chunks/FQZJQWJR.js";
import {
  Box_default,
  CssBaseline_default,
  IconButton_default,
  InputBase_default,
  ListItemIcon_default,
  MenuItem_default,
  Paper_default,
  Select_default,
  Tooltip_default,
  material_exports
} from "../../chunks/2FH7W2EF.js";
import {
  ListItemButton_default,
  ListItemText_default,
  Stack_default,
  Typography_default,
  require_interopRequireDefault,
  require_jsx_runtime,
  require_react_dom,
  styled_default
} from "../../chunks/JCIZV2AT.js";
import "../../chunks/JLH3KCIT.js";
import "../../chunks/LDFHRBBH.js";
import "../../chunks/42XSBB7P.js";
import {
  require_react
} from "../../chunks/AMCWABVH.js";
import {
  ContentScriptConnectionV2
} from "../../chunks/KFVZFM6T.js";
import "../../chunks/4NOIXOKC.js";
import {
  CHAT_HUB_LAYOUT_STORAGE_KEY,
  CHAT_HUB_PROVIDER_IFRAME_INFO_STORAGE_KEY,
  CHAT_HUB_SIDE_NAV_CONFIG_STORAGE_KEY
} from "../../chunks/XVTLOGGR.js";
import {
  require_browser_polyfill
} from "../../chunks/XOBJISN3.js";
import {
  debounce_default
} from "../../chunks/TOGVC2JX.js";
import {
  v4_default
} from "../../chunks/2RTBHBIC.js";
import {
  WEBCHATGPT_PROXY_SEARCH_EVENT
} from "../../chunks/LZOY24OK.js";
import {
  MenuQueryMap,
  SearchProviderList,
  SearchProviderMap,
  isLightColor
} from "../../chunks/V2QAWIDP.js";
import {
  __commonJS,
  __publicField,
  __toESM
} from "../../chunks/ERZ5UWI7.js";

// node_modules/.pnpm/@mui+icons-material@5.11.0_@mui+material@5.11.8_@emotion+react@11.10.5_@babel+core@7.26.0_@ty_emavingizmdywwdelxyq6ciy54/node_modules/@mui/icons-material/ExpandMoreOutlined.js
var require_ExpandMoreOutlined = __commonJS({
  "node_modules/.pnpm/@mui+icons-material@5.11.0_@mui+material@5.11.8_@emotion+react@11.10.5_@babel+core@7.26.0_@ty_emavingizmdywwdelxyq6ciy54/node_modules/@mui/icons-material/ExpandMoreOutlined.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _createSvgIcon = _interopRequireDefault(require_createSvgIcon());
    var _jsxRuntime = require_jsx_runtime();
    var _default = (0, _createSvgIcon.default)(/* @__PURE__ */ (0, _jsxRuntime.jsx)("path", {
      d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"
    }), "ExpandMoreOutlined");
    exports.default = _default;
  }
});

// src/pages/chat/index.tsx
var import_react16 = __toESM(require_react());
var import_client = __toESM(require_client());

// src/features/searchChatHub/components/ChatHub.tsx
var import_react15 = __toESM(require_react());

// src/features/searchChatHub/components/CustomContainer.tsx
var import_react5 = __toESM(require_react());

// node_modules/.pnpm/@dnd-kit+utilities@3.2.2_react@18.2.0/node_modules/@dnd-kit/utilities/dist/utilities.esm.js
var import_react = __toESM(require_react());
function useCombinedRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }
  return (0, import_react.useMemo)(
    () => (node) => {
      refs.forEach((ref) => ref(node));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}
var canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
function isWindow(element) {
  const elementString = Object.prototype.toString.call(element);
  return elementString === "[object Window]" || // In Electron context the Window object serializes to [object global]
  elementString === "[object global]";
}
function isNode(node) {
  return "nodeType" in node;
}
function getWindow(target) {
  var _target$ownerDocument, _target$ownerDocument2;
  if (!target) {
    return window;
  }
  if (isWindow(target)) {
    return target;
  }
  if (!isNode(target)) {
    return window;
  }
  return (_target$ownerDocument = (_target$ownerDocument2 = target.ownerDocument) == null ? void 0 : _target$ownerDocument2.defaultView) != null ? _target$ownerDocument : window;
}
function isDocument(node) {
  const {
    Document
  } = getWindow(node);
  return node instanceof Document;
}
function isHTMLElement(node) {
  if (isWindow(node)) {
    return false;
  }
  return node instanceof getWindow(node).HTMLElement;
}
function isSVGElement(node) {
  return node instanceof getWindow(node).SVGElement;
}
function getOwnerDocument(target) {
  if (!target) {
    return document;
  }
  if (isWindow(target)) {
    return target.document;
  }
  if (!isNode(target)) {
    return document;
  }
  if (isDocument(target)) {
    return target;
  }
  if (isHTMLElement(target) || isSVGElement(target)) {
    return target.ownerDocument;
  }
  return document;
}
var useIsomorphicLayoutEffect = canUseDOM ? import_react.useLayoutEffect : import_react.useEffect;
function useEvent(handler) {
  const handlerRef = (0, import_react.useRef)(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });
  return (0, import_react.useCallback)(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return handlerRef.current == null ? void 0 : handlerRef.current(...args);
  }, []);
}
function useInterval() {
  const intervalRef = (0, import_react.useRef)(null);
  const set = (0, import_react.useCallback)((listener, duration) => {
    intervalRef.current = setInterval(listener, duration);
  }, []);
  const clear = (0, import_react.useCallback)(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  return [set, clear];
}
function useLatestValue(value, dependencies) {
  if (dependencies === void 0) {
    dependencies = [value];
  }
  const valueRef = (0, import_react.useRef)(value);
  useIsomorphicLayoutEffect(() => {
    if (valueRef.current !== value) {
      valueRef.current = value;
    }
  }, dependencies);
  return valueRef;
}
function useLazyMemo(callback, dependencies) {
  const valueRef = (0, import_react.useRef)();
  return (0, import_react.useMemo)(
    () => {
      const newValue = callback(valueRef.current);
      valueRef.current = newValue;
      return newValue;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...dependencies]
  );
}
function useNodeRef(onChange) {
  const onChangeHandler = useEvent(onChange);
  const node = (0, import_react.useRef)(null);
  const setNodeRef = (0, import_react.useCallback)(
    (element) => {
      if (element !== node.current) {
        onChangeHandler == null ? void 0 : onChangeHandler(element, node.current);
      }
      node.current = element;
    },
    //eslint-disable-next-line
    []
  );
  return [node, setNodeRef];
}
function usePrevious(value) {
  const ref = (0, import_react.useRef)();
  (0, import_react.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
var ids = {};
function useUniqueId(prefix, value) {
  return (0, import_react.useMemo)(() => {
    if (value) {
      return value;
    }
    const id = ids[prefix] == null ? 0 : ids[prefix] + 1;
    ids[prefix] = id;
    return prefix + "-" + id;
  }, [prefix, value]);
}
function createAdjustmentFn(modifier) {
  return function(object) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }
    return adjustments.reduce((accumulator, adjustment) => {
      const entries = Object.entries(adjustment);
      for (const [key, valueAdjustment] of entries) {
        const value = accumulator[key];
        if (value != null) {
          accumulator[key] = value + modifier * valueAdjustment;
        }
      }
      return accumulator;
    }, {
      ...object
    });
  };
}
var add = /* @__PURE__ */ createAdjustmentFn(1);
var subtract = /* @__PURE__ */ createAdjustmentFn(-1);
function hasViewportRelativeCoordinates(event) {
  return "clientX" in event && "clientY" in event;
}
function isKeyboardEvent(event) {
  if (!event) {
    return false;
  }
  const {
    KeyboardEvent
  } = getWindow(event.target);
  return KeyboardEvent && event instanceof KeyboardEvent;
}
function isTouchEvent(event) {
  if (!event) {
    return false;
  }
  const {
    TouchEvent
  } = getWindow(event.target);
  return TouchEvent && event instanceof TouchEvent;
}
function getEventCoordinates(event) {
  if (isTouchEvent(event)) {
    if (event.touches && event.touches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.touches[0];
      return {
        x,
        y
      };
    } else if (event.changedTouches && event.changedTouches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.changedTouches[0];
      return {
        x,
        y
      };
    }
  }
  if (hasViewportRelativeCoordinates(event)) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }
  return null;
}
var CSS = /* @__PURE__ */ Object.freeze({
  Translate: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        x,
        y
      } = transform;
      return "translate3d(" + (x ? Math.round(x) : 0) + "px, " + (y ? Math.round(y) : 0) + "px, 0)";
    }
  },
  Scale: {
    toString(transform) {
      if (!transform) {
        return;
      }
      const {
        scaleX,
        scaleY
      } = transform;
      return "scaleX(" + scaleX + ") scaleY(" + scaleY + ")";
    }
  },
  Transform: {
    toString(transform) {
      if (!transform) {
        return;
      }
      return [CSS.Translate.toString(transform), CSS.Scale.toString(transform)].join(" ");
    }
  },
  Transition: {
    toString(_ref) {
      let {
        property,
        duration,
        easing
      } = _ref;
      return property + " " + duration + "ms " + easing;
    }
  }
});
var SELECTOR = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";
function findFirstFocusableNode(element) {
  if (element.matches(SELECTOR)) {
    return element;
  }
  return element.querySelector(SELECTOR);
}

// node_modules/.pnpm/@dnd-kit+modifiers@7.0.0_@dnd-kit+core@6.1.0_react-dom@18.2.0_react@18.2.0__react@18.2.0__react@18.2.0/node_modules/@dnd-kit/modifiers/dist/modifiers.esm.js
var restrictToHorizontalAxis = (_ref) => {
  let {
    transform
  } = _ref;
  return {
    ...transform,
    y: 0
  };
};
function restrictToBoundingRect(transform, rect, boundingRect) {
  const value = {
    ...transform
  };
  if (rect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top;
  } else if (rect.bottom + transform.y >= boundingRect.top + boundingRect.height) {
    value.y = boundingRect.top + boundingRect.height - rect.bottom;
  }
  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left;
  } else if (rect.right + transform.x >= boundingRect.left + boundingRect.width) {
    value.x = boundingRect.left + boundingRect.width - rect.right;
  }
  return value;
}
var restrictToWindowEdges = (_ref) => {
  let {
    transform,
    draggingNodeRect,
    windowRect
  } = _ref;
  if (!draggingNodeRect || !windowRect) {
    return transform;
  }
  return restrictToBoundingRect(transform, draggingNodeRect, windowRect);
};

// node_modules/.pnpm/@dnd-kit+core@6.1.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/@dnd-kit/core/dist/core.esm.js
var import_react3 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// node_modules/.pnpm/@dnd-kit+accessibility@3.1.0_react@18.2.0/node_modules/@dnd-kit/accessibility/dist/accessibility.esm.js
var import_react2 = __toESM(require_react());
var hiddenStyles = {
  display: "none"
};
function HiddenText(_ref) {
  let {
    id,
    value
  } = _ref;
  return import_react2.default.createElement("div", {
    id,
    style: hiddenStyles
  }, value);
}
function LiveRegion(_ref) {
  let {
    id,
    announcement,
    ariaLiveType = "assertive"
  } = _ref;
  const visuallyHidden = {
    position: "fixed",
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(100%)",
    whiteSpace: "nowrap"
  };
  return import_react2.default.createElement("div", {
    id,
    style: visuallyHidden,
    role: "status",
    "aria-live": ariaLiveType,
    "aria-atomic": true
  }, announcement);
}
function useAnnouncement() {
  const [announcement, setAnnouncement] = (0, import_react2.useState)("");
  const announce = (0, import_react2.useCallback)((value) => {
    if (value != null) {
      setAnnouncement(value);
    }
  }, []);
  return {
    announce,
    announcement
  };
}

// node_modules/.pnpm/@dnd-kit+core@6.1.0_react-dom@18.2.0_react@18.2.0__react@18.2.0/node_modules/@dnd-kit/core/dist/core.esm.js
var DndMonitorContext = /* @__PURE__ */ (0, import_react3.createContext)(null);
function useDndMonitor(listener) {
  const registerListener = (0, import_react3.useContext)(DndMonitorContext);
  (0, import_react3.useEffect)(() => {
    if (!registerListener) {
      throw new Error("useDndMonitor must be used within a children of <DndContext>");
    }
    const unsubscribe = registerListener(listener);
    return unsubscribe;
  }, [listener, registerListener]);
}
function useDndMonitorProvider() {
  const [listeners] = (0, import_react3.useState)(() => /* @__PURE__ */ new Set());
  const registerListener = (0, import_react3.useCallback)((listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, [listeners]);
  const dispatch = (0, import_react3.useCallback)((_ref) => {
    let {
      type,
      event
    } = _ref;
    listeners.forEach((listener) => {
      var _listener$type;
      return (_listener$type = listener[type]) == null ? void 0 : _listener$type.call(listener, event);
    });
  }, [listeners]);
  return [dispatch, registerListener];
}
var defaultScreenReaderInstructions = {
  draggable: "\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  "
};
var defaultAnnouncements = {
  onDragStart(_ref) {
    let {
      active
    } = _ref;
    return "Picked up draggable item " + active.id + ".";
  },
  onDragOver(_ref2) {
    let {
      active,
      over
    } = _ref2;
    if (over) {
      return "Draggable item " + active.id + " was moved over droppable area " + over.id + ".";
    }
    return "Draggable item " + active.id + " is no longer over a droppable area.";
  },
  onDragEnd(_ref3) {
    let {
      active,
      over
    } = _ref3;
    if (over) {
      return "Draggable item " + active.id + " was dropped over droppable area " + over.id;
    }
    return "Draggable item " + active.id + " was dropped.";
  },
  onDragCancel(_ref4) {
    let {
      active
    } = _ref4;
    return "Dragging was cancelled. Draggable item " + active.id + " was dropped.";
  }
};
function Accessibility(_ref) {
  let {
    announcements = defaultAnnouncements,
    container,
    hiddenTextDescribedById,
    screenReaderInstructions = defaultScreenReaderInstructions
  } = _ref;
  const {
    announce,
    announcement
  } = useAnnouncement();
  const liveRegionId = useUniqueId("DndLiveRegion");
  const [mounted, setMounted] = (0, import_react3.useState)(false);
  (0, import_react3.useEffect)(() => {
    setMounted(true);
  }, []);
  useDndMonitor((0, import_react3.useMemo)(() => ({
    onDragStart(_ref2) {
      let {
        active
      } = _ref2;
      announce(announcements.onDragStart({
        active
      }));
    },
    onDragMove(_ref3) {
      let {
        active,
        over
      } = _ref3;
      if (announcements.onDragMove) {
        announce(announcements.onDragMove({
          active,
          over
        }));
      }
    },
    onDragOver(_ref4) {
      let {
        active,
        over
      } = _ref4;
      announce(announcements.onDragOver({
        active,
        over
      }));
    },
    onDragEnd(_ref5) {
      let {
        active,
        over
      } = _ref5;
      announce(announcements.onDragEnd({
        active,
        over
      }));
    },
    onDragCancel(_ref6) {
      let {
        active,
        over
      } = _ref6;
      announce(announcements.onDragCancel({
        active,
        over
      }));
    }
  }), [announce, announcements]));
  if (!mounted) {
    return null;
  }
  const markup = import_react3.default.createElement(import_react3.default.Fragment, null, import_react3.default.createElement(HiddenText, {
    id: hiddenTextDescribedById,
    value: screenReaderInstructions.draggable
  }), import_react3.default.createElement(LiveRegion, {
    id: liveRegionId,
    announcement
  }));
  return container ? (0, import_react_dom.createPortal)(markup, container) : markup;
}
var Action;
(function(Action2) {
  Action2["DragStart"] = "dragStart";
  Action2["DragMove"] = "dragMove";
  Action2["DragEnd"] = "dragEnd";
  Action2["DragCancel"] = "dragCancel";
  Action2["DragOver"] = "dragOver";
  Action2["RegisterDroppable"] = "registerDroppable";
  Action2["SetDroppableDisabled"] = "setDroppableDisabled";
  Action2["UnregisterDroppable"] = "unregisterDroppable";
})(Action || (Action = {}));
function noop() {
}
function useSensor(sensor, options) {
  return (0, import_react3.useMemo)(
    () => ({
      sensor,
      options: options != null ? options : {}
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sensor, options]
  );
}
function useSensors() {
  for (var _len = arguments.length, sensors = new Array(_len), _key = 0; _key < _len; _key++) {
    sensors[_key] = arguments[_key];
  }
  return (0, import_react3.useMemo)(
    () => [...sensors].filter((sensor) => sensor != null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...sensors]
  );
}
var defaultCoordinates = /* @__PURE__ */ Object.freeze({
  x: 0,
  y: 0
});
function distanceBetween(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
function sortCollisionsAsc(_ref, _ref2) {
  let {
    data: {
      value: a
    }
  } = _ref;
  let {
    data: {
      value: b
    }
  } = _ref2;
  return a - b;
}
function sortCollisionsDesc(_ref3, _ref4) {
  let {
    data: {
      value: a
    }
  } = _ref3;
  let {
    data: {
      value: b
    }
  } = _ref4;
  return b - a;
}
function getFirstCollision(collisions, property) {
  if (!collisions || collisions.length === 0) {
    return null;
  }
  const [firstCollision] = collisions;
  return property ? firstCollision[property] : firstCollision;
}
function centerOfRectangle(rect, left, top) {
  if (left === void 0) {
    left = rect.left;
  }
  if (top === void 0) {
    top = rect.top;
  }
  return {
    x: left + rect.width * 0.5,
    y: top + rect.height * 0.5
  };
}
var closestCenter = (_ref) => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const centerRect = centerOfRectangle(collisionRect, collisionRect.left, collisionRect.top);
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect) {
      const distBetween = distanceBetween(centerOfRectangle(rect), centerRect);
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: distBetween
        }
      });
    }
  }
  return collisions.sort(sortCollisionsAsc);
};
function getIntersectionRatio(entry, target) {
  const top = Math.max(target.top, entry.top);
  const left = Math.max(target.left, entry.left);
  const right = Math.min(target.left + target.width, entry.left + entry.width);
  const bottom = Math.min(target.top + target.height, entry.top + entry.height);
  const width = right - left;
  const height = bottom - top;
  if (left < right && top < bottom) {
    const targetArea = target.width * target.height;
    const entryArea = entry.width * entry.height;
    const intersectionArea = width * height;
    const intersectionRatio = intersectionArea / (targetArea + entryArea - intersectionArea);
    return Number(intersectionRatio.toFixed(4));
  }
  return 0;
}
var rectIntersection = (_ref) => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const collisions = [];
  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);
    if (rect) {
      const intersectionRatio = getIntersectionRatio(rect, collisionRect);
      if (intersectionRatio > 0) {
        collisions.push({
          id,
          data: {
            droppableContainer,
            value: intersectionRatio
          }
        });
      }
    }
  }
  return collisions.sort(sortCollisionsDesc);
};
function adjustScale(transform, rect1, rect2) {
  return {
    ...transform,
    scaleX: rect1 && rect2 ? rect1.width / rect2.width : 1,
    scaleY: rect1 && rect2 ? rect1.height / rect2.height : 1
  };
}
function getRectDelta(rect1, rect2) {
  return rect1 && rect2 ? {
    x: rect1.left - rect2.left,
    y: rect1.top - rect2.top
  } : defaultCoordinates;
}
function createRectAdjustmentFn(modifier) {
  return function adjustClientRect(rect) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }
    return adjustments.reduce((acc, adjustment) => ({
      ...acc,
      top: acc.top + modifier * adjustment.y,
      bottom: acc.bottom + modifier * adjustment.y,
      left: acc.left + modifier * adjustment.x,
      right: acc.right + modifier * adjustment.x
    }), {
      ...rect
    });
  };
}
var getAdjustedRect = /* @__PURE__ */ createRectAdjustmentFn(1);
function parseTransform(transform) {
  if (transform.startsWith("matrix3d(")) {
    const transformArray = transform.slice(9, -1).split(/, /);
    return {
      x: +transformArray[12],
      y: +transformArray[13],
      scaleX: +transformArray[0],
      scaleY: +transformArray[5]
    };
  } else if (transform.startsWith("matrix(")) {
    const transformArray = transform.slice(7, -1).split(/, /);
    return {
      x: +transformArray[4],
      y: +transformArray[5],
      scaleX: +transformArray[0],
      scaleY: +transformArray[3]
    };
  }
  return null;
}
function inverseTransform(rect, transform, transformOrigin) {
  const parsedTransform = parseTransform(transform);
  if (!parsedTransform) {
    return rect;
  }
  const {
    scaleX,
    scaleY,
    x: translateX,
    y: translateY
  } = parsedTransform;
  const x = rect.left - translateX - (1 - scaleX) * parseFloat(transformOrigin);
  const y = rect.top - translateY - (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(" ") + 1));
  const w = scaleX ? rect.width / scaleX : rect.width;
  const h = scaleY ? rect.height / scaleY : rect.height;
  return {
    width: w,
    height: h,
    top: y,
    right: x + w,
    bottom: y + h,
    left: x
  };
}
var defaultOptions = {
  ignoreTransform: false
};
function getClientRect(element, options) {
  if (options === void 0) {
    options = defaultOptions;
  }
  let rect = element.getBoundingClientRect();
  if (options.ignoreTransform) {
    const {
      transform,
      transformOrigin
    } = getWindow(element).getComputedStyle(element);
    if (transform) {
      rect = inverseTransform(rect, transform, transformOrigin);
    }
  }
  const {
    top,
    left,
    width,
    height,
    bottom,
    right
  } = rect;
  return {
    top,
    left,
    width,
    height,
    bottom,
    right
  };
}
function getTransformAgnosticClientRect(element) {
  return getClientRect(element, {
    ignoreTransform: true
  });
}
function getWindowClientRect(element) {
  const width = element.innerWidth;
  const height = element.innerHeight;
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height
  };
}
function isFixed(node, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = getWindow(node).getComputedStyle(node);
  }
  return computedStyle.position === "fixed";
}
function isScrollable(element, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = getWindow(element).getComputedStyle(element);
  }
  const overflowRegex = /(auto|scroll|overlay)/;
  const properties2 = ["overflow", "overflowX", "overflowY"];
  return properties2.some((property) => {
    const value = computedStyle[property];
    return typeof value === "string" ? overflowRegex.test(value) : false;
  });
}
function getScrollableAncestors(element, limit) {
  const scrollParents = [];
  function findScrollableAncestors(node) {
    if (limit != null && scrollParents.length >= limit) {
      return scrollParents;
    }
    if (!node) {
      return scrollParents;
    }
    if (isDocument(node) && node.scrollingElement != null && !scrollParents.includes(node.scrollingElement)) {
      scrollParents.push(node.scrollingElement);
      return scrollParents;
    }
    if (!isHTMLElement(node) || isSVGElement(node)) {
      return scrollParents;
    }
    if (scrollParents.includes(node)) {
      return scrollParents;
    }
    const computedStyle = getWindow(element).getComputedStyle(node);
    if (node !== element) {
      if (isScrollable(node, computedStyle)) {
        scrollParents.push(node);
      }
    }
    if (isFixed(node, computedStyle)) {
      return scrollParents;
    }
    return findScrollableAncestors(node.parentNode);
  }
  if (!element) {
    return scrollParents;
  }
  return findScrollableAncestors(element);
}
function getFirstScrollableAncestor(node) {
  const [firstScrollableAncestor] = getScrollableAncestors(node, 1);
  return firstScrollableAncestor != null ? firstScrollableAncestor : null;
}
function getScrollableElement(element) {
  if (!canUseDOM || !element) {
    return null;
  }
  if (isWindow(element)) {
    return element;
  }
  if (!isNode(element)) {
    return null;
  }
  if (isDocument(element) || element === getOwnerDocument(element).scrollingElement) {
    return window;
  }
  if (isHTMLElement(element)) {
    return element;
  }
  return null;
}
function getScrollXCoordinate(element) {
  if (isWindow(element)) {
    return element.scrollX;
  }
  return element.scrollLeft;
}
function getScrollYCoordinate(element) {
  if (isWindow(element)) {
    return element.scrollY;
  }
  return element.scrollTop;
}
function getScrollCoordinates(element) {
  return {
    x: getScrollXCoordinate(element),
    y: getScrollYCoordinate(element)
  };
}
var Direction;
(function(Direction2) {
  Direction2[Direction2["Forward"] = 1] = "Forward";
  Direction2[Direction2["Backward"] = -1] = "Backward";
})(Direction || (Direction = {}));
function isDocumentScrollingElement(element) {
  if (!canUseDOM || !element) {
    return false;
  }
  return element === document.scrollingElement;
}
function getScrollPosition(scrollingContainer) {
  const minScroll = {
    x: 0,
    y: 0
  };
  const dimensions = isDocumentScrollingElement(scrollingContainer) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: scrollingContainer.clientHeight,
    width: scrollingContainer.clientWidth
  };
  const maxScroll = {
    x: scrollingContainer.scrollWidth - dimensions.width,
    y: scrollingContainer.scrollHeight - dimensions.height
  };
  const isTop = scrollingContainer.scrollTop <= minScroll.y;
  const isLeft = scrollingContainer.scrollLeft <= minScroll.x;
  const isBottom = scrollingContainer.scrollTop >= maxScroll.y;
  const isRight = scrollingContainer.scrollLeft >= maxScroll.x;
  return {
    isTop,
    isLeft,
    isBottom,
    isRight,
    maxScroll,
    minScroll
  };
}
var defaultThreshold = {
  x: 0.2,
  y: 0.2
};
function getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, _ref, acceleration, thresholdPercentage) {
  let {
    top,
    left,
    right,
    bottom
  } = _ref;
  if (acceleration === void 0) {
    acceleration = 10;
  }
  if (thresholdPercentage === void 0) {
    thresholdPercentage = defaultThreshold;
  }
  const {
    isTop,
    isBottom,
    isLeft,
    isRight
  } = getScrollPosition(scrollContainer);
  const direction = {
    x: 0,
    y: 0
  };
  const speed = {
    x: 0,
    y: 0
  };
  const threshold = {
    height: scrollContainerRect.height * thresholdPercentage.y,
    width: scrollContainerRect.width * thresholdPercentage.x
  };
  if (!isTop && top <= scrollContainerRect.top + threshold.height) {
    direction.y = Direction.Backward;
    speed.y = acceleration * Math.abs((scrollContainerRect.top + threshold.height - top) / threshold.height);
  } else if (!isBottom && bottom >= scrollContainerRect.bottom - threshold.height) {
    direction.y = Direction.Forward;
    speed.y = acceleration * Math.abs((scrollContainerRect.bottom - threshold.height - bottom) / threshold.height);
  }
  if (!isRight && right >= scrollContainerRect.right - threshold.width) {
    direction.x = Direction.Forward;
    speed.x = acceleration * Math.abs((scrollContainerRect.right - threshold.width - right) / threshold.width);
  } else if (!isLeft && left <= scrollContainerRect.left + threshold.width) {
    direction.x = Direction.Backward;
    speed.x = acceleration * Math.abs((scrollContainerRect.left + threshold.width - left) / threshold.width);
  }
  return {
    direction,
    speed
  };
}
function getScrollElementRect(element) {
  if (element === document.scrollingElement) {
    const {
      innerWidth,
      innerHeight
    } = window;
    return {
      top: 0,
      left: 0,
      right: innerWidth,
      bottom: innerHeight,
      width: innerWidth,
      height: innerHeight
    };
  }
  const {
    top,
    left,
    right,
    bottom
  } = element.getBoundingClientRect();
  return {
    top,
    left,
    right,
    bottom,
    width: element.clientWidth,
    height: element.clientHeight
  };
}
function getScrollOffsets(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return add(acc, getScrollCoordinates(node));
  }, defaultCoordinates);
}
function getScrollXOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollXCoordinate(node);
  }, 0);
}
function getScrollYOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollYCoordinate(node);
  }, 0);
}
function scrollIntoViewIfNeeded(element, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }
  if (!element) {
    return;
  }
  const {
    top,
    left,
    bottom,
    right
  } = measure(element);
  const firstScrollableAncestor = getFirstScrollableAncestor(element);
  if (!firstScrollableAncestor) {
    return;
  }
  if (bottom <= 0 || right <= 0 || top >= window.innerHeight || left >= window.innerWidth) {
    element.scrollIntoView({
      block: "center",
      inline: "center"
    });
  }
}
var properties = [["x", ["left", "right"], getScrollXOffset], ["y", ["top", "bottom"], getScrollYOffset]];
var Rect = class {
  constructor(rect, element) {
    this.rect = void 0;
    this.width = void 0;
    this.height = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.right = void 0;
    this.left = void 0;
    const scrollableAncestors = getScrollableAncestors(element);
    const scrollOffsets = getScrollOffsets(scrollableAncestors);
    this.rect = {
      ...rect
    };
    this.width = rect.width;
    this.height = rect.height;
    for (const [axis, keys, getScrollOffset] of properties) {
      for (const key of keys) {
        Object.defineProperty(this, key, {
          get: () => {
            const currentOffsets = getScrollOffset(scrollableAncestors);
            const scrollOffsetsDeltla = scrollOffsets[axis] - currentOffsets;
            return this.rect[key] + scrollOffsetsDeltla;
          },
          enumerable: true
        });
      }
    }
    Object.defineProperty(this, "rect", {
      enumerable: false
    });
  }
};
var Listeners = class {
  constructor(target) {
    this.target = void 0;
    this.listeners = [];
    this.removeAll = () => {
      this.listeners.forEach((listener) => {
        var _this$target;
        return (_this$target = this.target) == null ? void 0 : _this$target.removeEventListener(...listener);
      });
    };
    this.target = target;
  }
  add(eventName, handler, options) {
    var _this$target2;
    (_this$target2 = this.target) == null ? void 0 : _this$target2.addEventListener(eventName, handler, options);
    this.listeners.push([eventName, handler, options]);
  }
};
function getEventListenerTarget(target) {
  const {
    EventTarget
  } = getWindow(target);
  return target instanceof EventTarget ? target : getOwnerDocument(target);
}
function hasExceededDistance(delta, measurement) {
  const dx = Math.abs(delta.x);
  const dy = Math.abs(delta.y);
  if (typeof measurement === "number") {
    return Math.sqrt(dx ** 2 + dy ** 2) > measurement;
  }
  if ("x" in measurement && "y" in measurement) {
    return dx > measurement.x && dy > measurement.y;
  }
  if ("x" in measurement) {
    return dx > measurement.x;
  }
  if ("y" in measurement) {
    return dy > measurement.y;
  }
  return false;
}
var EventName;
(function(EventName2) {
  EventName2["Click"] = "click";
  EventName2["DragStart"] = "dragstart";
  EventName2["Keydown"] = "keydown";
  EventName2["ContextMenu"] = "contextmenu";
  EventName2["Resize"] = "resize";
  EventName2["SelectionChange"] = "selectionchange";
  EventName2["VisibilityChange"] = "visibilitychange";
})(EventName || (EventName = {}));
function preventDefault(event) {
  event.preventDefault();
}
function stopPropagation(event) {
  event.stopPropagation();
}
var KeyboardCode;
(function(KeyboardCode2) {
  KeyboardCode2["Space"] = "Space";
  KeyboardCode2["Down"] = "ArrowDown";
  KeyboardCode2["Right"] = "ArrowRight";
  KeyboardCode2["Left"] = "ArrowLeft";
  KeyboardCode2["Up"] = "ArrowUp";
  KeyboardCode2["Esc"] = "Escape";
  KeyboardCode2["Enter"] = "Enter";
})(KeyboardCode || (KeyboardCode = {}));
var defaultKeyboardCodes = {
  start: [KeyboardCode.Space, KeyboardCode.Enter],
  cancel: [KeyboardCode.Esc],
  end: [KeyboardCode.Space, KeyboardCode.Enter]
};
var defaultKeyboardCoordinateGetter = (event, _ref) => {
  let {
    currentCoordinates
  } = _ref;
  switch (event.code) {
    case KeyboardCode.Right:
      return {
        ...currentCoordinates,
        x: currentCoordinates.x + 25
      };
    case KeyboardCode.Left:
      return {
        ...currentCoordinates,
        x: currentCoordinates.x - 25
      };
    case KeyboardCode.Down:
      return {
        ...currentCoordinates,
        y: currentCoordinates.y + 25
      };
    case KeyboardCode.Up:
      return {
        ...currentCoordinates,
        y: currentCoordinates.y - 25
      };
  }
  return void 0;
};
var KeyboardSensor = class {
  constructor(props) {
    this.props = void 0;
    this.autoScrollEnabled = false;
    this.referenceCoordinates = void 0;
    this.listeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    const {
      event: {
        target
      }
    } = props;
    this.props = props;
    this.listeners = new Listeners(getOwnerDocument(target));
    this.windowListeners = new Listeners(getWindow(target));
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.attach();
  }
  attach() {
    this.handleStart();
    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    setTimeout(() => this.listeners.add(EventName.Keydown, this.handleKeyDown));
  }
  handleStart() {
    const {
      activeNode,
      onStart
    } = this.props;
    const node = activeNode.node.current;
    if (node) {
      scrollIntoViewIfNeeded(node);
    }
    onStart(defaultCoordinates);
  }
  handleKeyDown(event) {
    if (isKeyboardEvent(event)) {
      const {
        active,
        context,
        options
      } = this.props;
      const {
        keyboardCodes = defaultKeyboardCodes,
        coordinateGetter = defaultKeyboardCoordinateGetter,
        scrollBehavior = "smooth"
      } = options;
      const {
        code
      } = event;
      if (keyboardCodes.end.includes(code)) {
        this.handleEnd(event);
        return;
      }
      if (keyboardCodes.cancel.includes(code)) {
        this.handleCancel(event);
        return;
      }
      const {
        collisionRect
      } = context.current;
      const currentCoordinates = collisionRect ? {
        x: collisionRect.left,
        y: collisionRect.top
      } : defaultCoordinates;
      if (!this.referenceCoordinates) {
        this.referenceCoordinates = currentCoordinates;
      }
      const newCoordinates = coordinateGetter(event, {
        active,
        context: context.current,
        currentCoordinates
      });
      if (newCoordinates) {
        const coordinatesDelta = subtract(newCoordinates, currentCoordinates);
        const scrollDelta = {
          x: 0,
          y: 0
        };
        const {
          scrollableAncestors
        } = context.current;
        for (const scrollContainer of scrollableAncestors) {
          const direction = event.code;
          const {
            isTop,
            isRight,
            isLeft,
            isBottom,
            maxScroll,
            minScroll
          } = getScrollPosition(scrollContainer);
          const scrollElementRect = getScrollElementRect(scrollContainer);
          const clampedCoordinates = {
            x: Math.min(direction === KeyboardCode.Right ? scrollElementRect.right - scrollElementRect.width / 2 : scrollElementRect.right, Math.max(direction === KeyboardCode.Right ? scrollElementRect.left : scrollElementRect.left + scrollElementRect.width / 2, newCoordinates.x)),
            y: Math.min(direction === KeyboardCode.Down ? scrollElementRect.bottom - scrollElementRect.height / 2 : scrollElementRect.bottom, Math.max(direction === KeyboardCode.Down ? scrollElementRect.top : scrollElementRect.top + scrollElementRect.height / 2, newCoordinates.y))
          };
          const canScrollX = direction === KeyboardCode.Right && !isRight || direction === KeyboardCode.Left && !isLeft;
          const canScrollY = direction === KeyboardCode.Down && !isBottom || direction === KeyboardCode.Up && !isTop;
          if (canScrollX && clampedCoordinates.x !== newCoordinates.x) {
            const newScrollCoordinates = scrollContainer.scrollLeft + coordinatesDelta.x;
            const canScrollToNewCoordinates = direction === KeyboardCode.Right && newScrollCoordinates <= maxScroll.x || direction === KeyboardCode.Left && newScrollCoordinates >= minScroll.x;
            if (canScrollToNewCoordinates && !coordinatesDelta.y) {
              scrollContainer.scrollTo({
                left: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }
            if (canScrollToNewCoordinates) {
              scrollDelta.x = scrollContainer.scrollLeft - newScrollCoordinates;
            } else {
              scrollDelta.x = direction === KeyboardCode.Right ? scrollContainer.scrollLeft - maxScroll.x : scrollContainer.scrollLeft - minScroll.x;
            }
            if (scrollDelta.x) {
              scrollContainer.scrollBy({
                left: -scrollDelta.x,
                behavior: scrollBehavior
              });
            }
            break;
          } else if (canScrollY && clampedCoordinates.y !== newCoordinates.y) {
            const newScrollCoordinates = scrollContainer.scrollTop + coordinatesDelta.y;
            const canScrollToNewCoordinates = direction === KeyboardCode.Down && newScrollCoordinates <= maxScroll.y || direction === KeyboardCode.Up && newScrollCoordinates >= minScroll.y;
            if (canScrollToNewCoordinates && !coordinatesDelta.x) {
              scrollContainer.scrollTo({
                top: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }
            if (canScrollToNewCoordinates) {
              scrollDelta.y = scrollContainer.scrollTop - newScrollCoordinates;
            } else {
              scrollDelta.y = direction === KeyboardCode.Down ? scrollContainer.scrollTop - maxScroll.y : scrollContainer.scrollTop - minScroll.y;
            }
            if (scrollDelta.y) {
              scrollContainer.scrollBy({
                top: -scrollDelta.y,
                behavior: scrollBehavior
              });
            }
            break;
          }
        }
        this.handleMove(event, add(subtract(newCoordinates, this.referenceCoordinates), scrollDelta));
      }
    }
  }
  handleMove(event, coordinates) {
    const {
      onMove
    } = this.props;
    event.preventDefault();
    onMove(coordinates);
  }
  handleEnd(event) {
    const {
      onEnd
    } = this.props;
    event.preventDefault();
    this.detach();
    onEnd();
  }
  handleCancel(event) {
    const {
      onCancel
    } = this.props;
    event.preventDefault();
    this.detach();
    onCancel();
  }
  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll();
  }
};
KeyboardSensor.activators = [{
  eventName: "onKeyDown",
  handler: (event, _ref, _ref2) => {
    let {
      keyboardCodes = defaultKeyboardCodes,
      onActivation
    } = _ref;
    let {
      active
    } = _ref2;
    const {
      code
    } = event.nativeEvent;
    if (keyboardCodes.start.includes(code)) {
      const activator = active.activatorNode.current;
      if (activator && event.target !== activator) {
        return false;
      }
      event.preventDefault();
      onActivation == null ? void 0 : onActivation({
        event: event.nativeEvent
      });
      return true;
    }
    return false;
  }
}];
function isDistanceConstraint(constraint) {
  return Boolean(constraint && "distance" in constraint);
}
function isDelayConstraint(constraint) {
  return Boolean(constraint && "delay" in constraint);
}
var AbstractPointerSensor = class {
  constructor(props, events2, listenerTarget) {
    var _getEventCoordinates;
    if (listenerTarget === void 0) {
      listenerTarget = getEventListenerTarget(props.event.target);
    }
    this.props = void 0;
    this.events = void 0;
    this.autoScrollEnabled = true;
    this.document = void 0;
    this.activated = false;
    this.initialCoordinates = void 0;
    this.timeoutId = null;
    this.listeners = void 0;
    this.documentListeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    this.events = events2;
    const {
      event
    } = props;
    const {
      target
    } = event;
    this.props = props;
    this.events = events2;
    this.document = getOwnerDocument(target);
    this.documentListeners = new Listeners(this.document);
    this.listeners = new Listeners(listenerTarget);
    this.windowListeners = new Listeners(getWindow(target));
    this.initialCoordinates = (_getEventCoordinates = getEventCoordinates(event)) != null ? _getEventCoordinates : defaultCoordinates;
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.removeTextSelection = this.removeTextSelection.bind(this);
    this.attach();
  }
  attach() {
    const {
      events: events2,
      props: {
        options: {
          activationConstraint,
          bypassActivationConstraint
        }
      }
    } = this;
    this.listeners.add(events2.move.name, this.handleMove, {
      passive: false
    });
    this.listeners.add(events2.end.name, this.handleEnd);
    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.DragStart, preventDefault);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    this.windowListeners.add(EventName.ContextMenu, preventDefault);
    this.documentListeners.add(EventName.Keydown, this.handleKeydown);
    if (activationConstraint) {
      if (bypassActivationConstraint != null && bypassActivationConstraint({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      })) {
        return this.handleStart();
      }
      if (isDelayConstraint(activationConstraint)) {
        this.timeoutId = setTimeout(this.handleStart, activationConstraint.delay);
        return;
      }
      if (isDistanceConstraint(activationConstraint)) {
        return;
      }
    }
    this.handleStart();
  }
  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll();
    setTimeout(this.documentListeners.removeAll, 50);
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
  handleStart() {
    const {
      initialCoordinates
    } = this;
    const {
      onStart
    } = this.props;
    if (initialCoordinates) {
      this.activated = true;
      this.documentListeners.add(EventName.Click, stopPropagation, {
        capture: true
      });
      this.removeTextSelection();
      this.documentListeners.add(EventName.SelectionChange, this.removeTextSelection);
      onStart(initialCoordinates);
    }
  }
  handleMove(event) {
    var _getEventCoordinates2;
    const {
      activated,
      initialCoordinates,
      props
    } = this;
    const {
      onMove,
      options: {
        activationConstraint
      }
    } = props;
    if (!initialCoordinates) {
      return;
    }
    const coordinates = (_getEventCoordinates2 = getEventCoordinates(event)) != null ? _getEventCoordinates2 : defaultCoordinates;
    const delta = subtract(initialCoordinates, coordinates);
    if (!activated && activationConstraint) {
      if (isDistanceConstraint(activationConstraint)) {
        if (activationConstraint.tolerance != null && hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }
        if (hasExceededDistance(delta, activationConstraint.distance)) {
          return this.handleStart();
        }
      }
      if (isDelayConstraint(activationConstraint)) {
        if (hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }
      }
      return;
    }
    if (event.cancelable) {
      event.preventDefault();
    }
    onMove(coordinates);
  }
  handleEnd() {
    const {
      onEnd
    } = this.props;
    this.detach();
    onEnd();
  }
  handleCancel() {
    const {
      onCancel
    } = this.props;
    this.detach();
    onCancel();
  }
  handleKeydown(event) {
    if (event.code === KeyboardCode.Esc) {
      this.handleCancel();
    }
  }
  removeTextSelection() {
    var _this$document$getSel;
    (_this$document$getSel = this.document.getSelection()) == null ? void 0 : _this$document$getSel.removeAllRanges();
  }
};
var events = {
  move: {
    name: "pointermove"
  },
  end: {
    name: "pointerup"
  }
};
var PointerSensor = class extends AbstractPointerSensor {
  constructor(props) {
    const {
      event
    } = props;
    const listenerTarget = getOwnerDocument(event.target);
    super(props, events, listenerTarget);
  }
};
PointerSensor.activators = [{
  eventName: "onPointerDown",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    if (!event.isPrimary || event.button !== 0) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
var events$1 = {
  move: {
    name: "mousemove"
  },
  end: {
    name: "mouseup"
  }
};
var MouseButton;
(function(MouseButton2) {
  MouseButton2[MouseButton2["RightClick"] = 2] = "RightClick";
})(MouseButton || (MouseButton = {}));
var MouseSensor = class extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$1, getOwnerDocument(props.event.target));
  }
};
MouseSensor.activators = [{
  eventName: "onMouseDown",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    if (event.button === MouseButton.RightClick) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
var events$2 = {
  move: {
    name: "touchmove"
  },
  end: {
    name: "touchend"
  }
};
var TouchSensor = class extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$2);
  }
  static setup() {
    window.addEventListener(events$2.move.name, noop2, {
      capture: false,
      passive: false
    });
    return function teardown() {
      window.removeEventListener(events$2.move.name, noop2);
    };
    function noop2() {
    }
  }
};
TouchSensor.activators = [{
  eventName: "onTouchStart",
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    const {
      touches
    } = event;
    if (touches.length > 1) {
      return false;
    }
    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];
var AutoScrollActivator;
(function(AutoScrollActivator2) {
  AutoScrollActivator2[AutoScrollActivator2["Pointer"] = 0] = "Pointer";
  AutoScrollActivator2[AutoScrollActivator2["DraggableRect"] = 1] = "DraggableRect";
})(AutoScrollActivator || (AutoScrollActivator = {}));
var TraversalOrder;
(function(TraversalOrder2) {
  TraversalOrder2[TraversalOrder2["TreeOrder"] = 0] = "TreeOrder";
  TraversalOrder2[TraversalOrder2["ReversedTreeOrder"] = 1] = "ReversedTreeOrder";
})(TraversalOrder || (TraversalOrder = {}));
function useAutoScroller(_ref) {
  let {
    acceleration,
    activator = AutoScrollActivator.Pointer,
    canScroll,
    draggingRect,
    enabled,
    interval = 5,
    order = TraversalOrder.TreeOrder,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects,
    delta,
    threshold
  } = _ref;
  const scrollIntent = useScrollIntent({
    delta,
    disabled: !enabled
  });
  const [setAutoScrollInterval, clearAutoScrollInterval] = useInterval();
  const scrollSpeed = (0, import_react3.useRef)({
    x: 0,
    y: 0
  });
  const scrollDirection = (0, import_react3.useRef)({
    x: 0,
    y: 0
  });
  const rect = (0, import_react3.useMemo)(() => {
    switch (activator) {
      case AutoScrollActivator.Pointer:
        return pointerCoordinates ? {
          top: pointerCoordinates.y,
          bottom: pointerCoordinates.y,
          left: pointerCoordinates.x,
          right: pointerCoordinates.x
        } : null;
      case AutoScrollActivator.DraggableRect:
        return draggingRect;
    }
  }, [activator, draggingRect, pointerCoordinates]);
  const scrollContainerRef = (0, import_react3.useRef)(null);
  const autoScroll = (0, import_react3.useCallback)(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }
    const scrollLeft = scrollSpeed.current.x * scrollDirection.current.x;
    const scrollTop = scrollSpeed.current.y * scrollDirection.current.y;
    scrollContainer.scrollBy(scrollLeft, scrollTop);
  }, []);
  const sortedScrollableAncestors = (0, import_react3.useMemo)(() => order === TraversalOrder.TreeOrder ? [...scrollableAncestors].reverse() : scrollableAncestors, [order, scrollableAncestors]);
  (0, import_react3.useEffect)(
    () => {
      if (!enabled || !scrollableAncestors.length || !rect) {
        clearAutoScrollInterval();
        return;
      }
      for (const scrollContainer of sortedScrollableAncestors) {
        if ((canScroll == null ? void 0 : canScroll(scrollContainer)) === false) {
          continue;
        }
        const index = scrollableAncestors.indexOf(scrollContainer);
        const scrollContainerRect = scrollableAncestorRects[index];
        if (!scrollContainerRect) {
          continue;
        }
        const {
          direction,
          speed
        } = getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, rect, acceleration, threshold);
        for (const axis of ["x", "y"]) {
          if (!scrollIntent[axis][direction[axis]]) {
            speed[axis] = 0;
            direction[axis] = 0;
          }
        }
        if (speed.x > 0 || speed.y > 0) {
          clearAutoScrollInterval();
          scrollContainerRef.current = scrollContainer;
          setAutoScrollInterval(autoScroll, interval);
          scrollSpeed.current = speed;
          scrollDirection.current = direction;
          return;
        }
      }
      scrollSpeed.current = {
        x: 0,
        y: 0
      };
      scrollDirection.current = {
        x: 0,
        y: 0
      };
      clearAutoScrollInterval();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      acceleration,
      autoScroll,
      canScroll,
      clearAutoScrollInterval,
      enabled,
      interval,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(rect),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(scrollIntent),
      setAutoScrollInterval,
      scrollableAncestors,
      sortedScrollableAncestors,
      scrollableAncestorRects,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(threshold)
    ]
  );
}
var defaultScrollIntent = {
  x: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  },
  y: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  }
};
function useScrollIntent(_ref2) {
  let {
    delta,
    disabled
  } = _ref2;
  const previousDelta = usePrevious(delta);
  return useLazyMemo((previousIntent) => {
    if (disabled || !previousDelta || !previousIntent) {
      return defaultScrollIntent;
    }
    const direction = {
      x: Math.sign(delta.x - previousDelta.x),
      y: Math.sign(delta.y - previousDelta.y)
    };
    return {
      x: {
        [Direction.Backward]: previousIntent.x[Direction.Backward] || direction.x === -1,
        [Direction.Forward]: previousIntent.x[Direction.Forward] || direction.x === 1
      },
      y: {
        [Direction.Backward]: previousIntent.y[Direction.Backward] || direction.y === -1,
        [Direction.Forward]: previousIntent.y[Direction.Forward] || direction.y === 1
      }
    };
  }, [disabled, delta, previousDelta]);
}
function useCachedNode(draggableNodes, id) {
  const draggableNode = id !== null ? draggableNodes.get(id) : void 0;
  const node = draggableNode ? draggableNode.node.current : null;
  return useLazyMemo((cachedNode) => {
    var _ref;
    if (id === null) {
      return null;
    }
    return (_ref = node != null ? node : cachedNode) != null ? _ref : null;
  }, [node, id]);
}
function useCombineActivators(sensors, getSyntheticHandler) {
  return (0, import_react3.useMemo)(() => sensors.reduce((accumulator, sensor) => {
    const {
      sensor: Sensor
    } = sensor;
    const sensorActivators = Sensor.activators.map((activator) => ({
      eventName: activator.eventName,
      handler: getSyntheticHandler(activator.handler, sensor)
    }));
    return [...accumulator, ...sensorActivators];
  }, []), [sensors, getSyntheticHandler]);
}
var MeasuringStrategy;
(function(MeasuringStrategy2) {
  MeasuringStrategy2[MeasuringStrategy2["Always"] = 0] = "Always";
  MeasuringStrategy2[MeasuringStrategy2["BeforeDragging"] = 1] = "BeforeDragging";
  MeasuringStrategy2[MeasuringStrategy2["WhileDragging"] = 2] = "WhileDragging";
})(MeasuringStrategy || (MeasuringStrategy = {}));
var MeasuringFrequency;
(function(MeasuringFrequency2) {
  MeasuringFrequency2["Optimized"] = "optimized";
})(MeasuringFrequency || (MeasuringFrequency = {}));
var defaultValue = /* @__PURE__ */ new Map();
function useDroppableMeasuring(containers, _ref) {
  let {
    dragging,
    dependencies,
    config
  } = _ref;
  const [queue, setQueue] = (0, import_react3.useState)(null);
  const {
    frequency,
    measure,
    strategy
  } = config;
  const containersRef = (0, import_react3.useRef)(containers);
  const disabled = isDisabled();
  const disabledRef = useLatestValue(disabled);
  const measureDroppableContainers = (0, import_react3.useCallback)(function(ids2) {
    if (ids2 === void 0) {
      ids2 = [];
    }
    if (disabledRef.current) {
      return;
    }
    setQueue((value) => {
      if (value === null) {
        return ids2;
      }
      return value.concat(ids2.filter((id) => !value.includes(id)));
    });
  }, [disabledRef]);
  const timeoutId = (0, import_react3.useRef)(null);
  const droppableRects = useLazyMemo((previousValue) => {
    if (disabled && !dragging) {
      return defaultValue;
    }
    if (!previousValue || previousValue === defaultValue || containersRef.current !== containers || queue != null) {
      const map = /* @__PURE__ */ new Map();
      for (let container of containers) {
        if (!container) {
          continue;
        }
        if (queue && queue.length > 0 && !queue.includes(container.id) && container.rect.current) {
          map.set(container.id, container.rect.current);
          continue;
        }
        const node = container.node.current;
        const rect = node ? new Rect(measure(node), node) : null;
        container.rect.current = rect;
        if (rect) {
          map.set(container.id, rect);
        }
      }
      return map;
    }
    return previousValue;
  }, [containers, queue, dragging, disabled, measure]);
  (0, import_react3.useEffect)(() => {
    containersRef.current = containers;
  }, [containers]);
  (0, import_react3.useEffect)(
    () => {
      if (disabled) {
        return;
      }
      measureDroppableContainers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dragging, disabled]
  );
  (0, import_react3.useEffect)(
    () => {
      if (queue && queue.length > 0) {
        setQueue(null);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(queue)]
  );
  (0, import_react3.useEffect)(
    () => {
      if (disabled || typeof frequency !== "number" || timeoutId.current !== null) {
        return;
      }
      timeoutId.current = setTimeout(() => {
        measureDroppableContainers();
        timeoutId.current = null;
      }, frequency);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [frequency, disabled, measureDroppableContainers, ...dependencies]
  );
  return {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled: queue != null
  };
  function isDisabled() {
    switch (strategy) {
      case MeasuringStrategy.Always:
        return false;
      case MeasuringStrategy.BeforeDragging:
        return dragging;
      default:
        return !dragging;
    }
  }
}
function useInitialValue(value, computeFn) {
  return useLazyMemo((previousValue) => {
    if (!value) {
      return null;
    }
    if (previousValue) {
      return previousValue;
    }
    return typeof computeFn === "function" ? computeFn(value) : value;
  }, [computeFn, value]);
}
function useInitialRect(node, measure) {
  return useInitialValue(node, measure);
}
function useMutationObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleMutations = useEvent(callback);
  const mutationObserver = (0, import_react3.useMemo)(() => {
    if (disabled || typeof window === "undefined" || typeof window.MutationObserver === "undefined") {
      return void 0;
    }
    const {
      MutationObserver
    } = window;
    return new MutationObserver(handleMutations);
  }, [handleMutations, disabled]);
  (0, import_react3.useEffect)(() => {
    return () => mutationObserver == null ? void 0 : mutationObserver.disconnect();
  }, [mutationObserver]);
  return mutationObserver;
}
function useResizeObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleResize = useEvent(callback);
  const resizeObserver = (0, import_react3.useMemo)(
    () => {
      if (disabled || typeof window === "undefined" || typeof window.ResizeObserver === "undefined") {
        return void 0;
      }
      const {
        ResizeObserver
      } = window;
      return new ResizeObserver(handleResize);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled]
  );
  (0, import_react3.useEffect)(() => {
    return () => resizeObserver == null ? void 0 : resizeObserver.disconnect();
  }, [resizeObserver]);
  return resizeObserver;
}
function defaultMeasure(element) {
  return new Rect(getClientRect(element), element);
}
function useRect(element, measure, fallbackRect) {
  if (measure === void 0) {
    measure = defaultMeasure;
  }
  const [rect, measureRect] = (0, import_react3.useReducer)(reducer2, null);
  const mutationObserver = useMutationObserver({
    callback(records) {
      if (!element) {
        return;
      }
      for (const record of records) {
        const {
          type,
          target
        } = record;
        if (type === "childList" && target instanceof HTMLElement && target.contains(element)) {
          measureRect();
          break;
        }
      }
    }
  });
  const resizeObserver = useResizeObserver({
    callback: measureRect
  });
  useIsomorphicLayoutEffect(() => {
    measureRect();
    if (element) {
      resizeObserver == null ? void 0 : resizeObserver.observe(element);
      mutationObserver == null ? void 0 : mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
      mutationObserver == null ? void 0 : mutationObserver.disconnect();
    }
  }, [element]);
  return rect;
  function reducer2(currentRect) {
    if (!element) {
      return null;
    }
    if (element.isConnected === false) {
      var _ref;
      return (_ref = currentRect != null ? currentRect : fallbackRect) != null ? _ref : null;
    }
    const newRect = measure(element);
    if (JSON.stringify(currentRect) === JSON.stringify(newRect)) {
      return currentRect;
    }
    return newRect;
  }
}
function useRectDelta(rect) {
  const initialRect = useInitialValue(rect);
  return getRectDelta(rect, initialRect);
}
var defaultValue$1 = [];
function useScrollableAncestors(node) {
  const previousNode = (0, import_react3.useRef)(node);
  const ancestors = useLazyMemo((previousValue) => {
    if (!node) {
      return defaultValue$1;
    }
    if (previousValue && previousValue !== defaultValue$1 && node && previousNode.current && node.parentNode === previousNode.current.parentNode) {
      return previousValue;
    }
    return getScrollableAncestors(node);
  }, [node]);
  (0, import_react3.useEffect)(() => {
    previousNode.current = node;
  }, [node]);
  return ancestors;
}
function useScrollOffsets(elements) {
  const [scrollCoordinates, setScrollCoordinates] = (0, import_react3.useState)(null);
  const prevElements = (0, import_react3.useRef)(elements);
  const handleScroll = (0, import_react3.useCallback)((event) => {
    const scrollingElement = getScrollableElement(event.target);
    if (!scrollingElement) {
      return;
    }
    setScrollCoordinates((scrollCoordinates2) => {
      if (!scrollCoordinates2) {
        return null;
      }
      scrollCoordinates2.set(scrollingElement, getScrollCoordinates(scrollingElement));
      return new Map(scrollCoordinates2);
    });
  }, []);
  (0, import_react3.useEffect)(() => {
    const previousElements = prevElements.current;
    if (elements !== previousElements) {
      cleanup(previousElements);
      const entries = elements.map((element) => {
        const scrollableElement = getScrollableElement(element);
        if (scrollableElement) {
          scrollableElement.addEventListener("scroll", handleScroll, {
            passive: true
          });
          return [scrollableElement, getScrollCoordinates(scrollableElement)];
        }
        return null;
      }).filter((entry) => entry != null);
      setScrollCoordinates(entries.length ? new Map(entries) : null);
      prevElements.current = elements;
    }
    return () => {
      cleanup(elements);
      cleanup(previousElements);
    };
    function cleanup(elements2) {
      elements2.forEach((element) => {
        const scrollableElement = getScrollableElement(element);
        scrollableElement == null ? void 0 : scrollableElement.removeEventListener("scroll", handleScroll);
      });
    }
  }, [handleScroll, elements]);
  return (0, import_react3.useMemo)(() => {
    if (elements.length) {
      return scrollCoordinates ? Array.from(scrollCoordinates.values()).reduce((acc, coordinates) => add(acc, coordinates), defaultCoordinates) : getScrollOffsets(elements);
    }
    return defaultCoordinates;
  }, [elements, scrollCoordinates]);
}
function useScrollOffsetsDelta(scrollOffsets, dependencies) {
  if (dependencies === void 0) {
    dependencies = [];
  }
  const initialScrollOffsets = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(
    () => {
      initialScrollOffsets.current = null;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );
  (0, import_react3.useEffect)(() => {
    const hasScrollOffsets = scrollOffsets !== defaultCoordinates;
    if (hasScrollOffsets && !initialScrollOffsets.current) {
      initialScrollOffsets.current = scrollOffsets;
    }
    if (!hasScrollOffsets && initialScrollOffsets.current) {
      initialScrollOffsets.current = null;
    }
  }, [scrollOffsets]);
  return initialScrollOffsets.current ? subtract(scrollOffsets, initialScrollOffsets.current) : defaultCoordinates;
}
function useSensorSetup(sensors) {
  (0, import_react3.useEffect)(
    () => {
      if (!canUseDOM) {
        return;
      }
      const teardownFns = sensors.map((_ref) => {
        let {
          sensor
        } = _ref;
        return sensor.setup == null ? void 0 : sensor.setup();
      });
      return () => {
        for (const teardown of teardownFns) {
          teardown == null ? void 0 : teardown();
        }
      };
    },
    // TO-DO: Sensors length could theoretically change which would not be a valid dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sensors.map((_ref2) => {
      let {
        sensor
      } = _ref2;
      return sensor;
    })
  );
}
function useSyntheticListeners(listeners, id) {
  return (0, import_react3.useMemo)(() => {
    return listeners.reduce((acc, _ref) => {
      let {
        eventName,
        handler
      } = _ref;
      acc[eventName] = (event) => {
        handler(event, id);
      };
      return acc;
    }, {});
  }, [listeners, id]);
}
function useWindowRect(element) {
  return (0, import_react3.useMemo)(() => element ? getWindowClientRect(element) : null, [element]);
}
var defaultValue$2 = [];
function useRects(elements, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }
  const [firstElement] = elements;
  const windowRect = useWindowRect(firstElement ? getWindow(firstElement) : null);
  const [rects, measureRects] = (0, import_react3.useReducer)(reducer2, defaultValue$2);
  const resizeObserver = useResizeObserver({
    callback: measureRects
  });
  if (elements.length > 0 && rects === defaultValue$2) {
    measureRects();
  }
  useIsomorphicLayoutEffect(() => {
    if (elements.length) {
      elements.forEach((element) => resizeObserver == null ? void 0 : resizeObserver.observe(element));
    } else {
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
      measureRects();
    }
  }, [elements]);
  return rects;
  function reducer2() {
    if (!elements.length) {
      return defaultValue$2;
    }
    return elements.map((element) => isDocumentScrollingElement(element) ? windowRect : new Rect(measure(element), element));
  }
}
function getMeasurableNode(node) {
  if (!node) {
    return null;
  }
  if (node.children.length > 1) {
    return node;
  }
  const firstChild = node.children[0];
  return isHTMLElement(firstChild) ? firstChild : node;
}
function useDragOverlayMeasuring(_ref) {
  let {
    measure
  } = _ref;
  const [rect, setRect] = (0, import_react3.useState)(null);
  const handleResize = (0, import_react3.useCallback)((entries) => {
    for (const {
      target
    } of entries) {
      if (isHTMLElement(target)) {
        setRect((rect2) => {
          const newRect = measure(target);
          return rect2 ? {
            ...rect2,
            width: newRect.width,
            height: newRect.height
          } : newRect;
        });
        break;
      }
    }
  }, [measure]);
  const resizeObserver = useResizeObserver({
    callback: handleResize
  });
  const handleNodeChange = (0, import_react3.useCallback)((element) => {
    const node = getMeasurableNode(element);
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    if (node) {
      resizeObserver == null ? void 0 : resizeObserver.observe(node);
    }
    setRect(node ? measure(node) : null);
  }, [measure, resizeObserver]);
  const [nodeRef, setRef] = useNodeRef(handleNodeChange);
  return (0, import_react3.useMemo)(() => ({
    nodeRef,
    rect,
    setRef
  }), [rect, nodeRef, setRef]);
}
var defaultSensors = [{
  sensor: PointerSensor,
  options: {}
}, {
  sensor: KeyboardSensor,
  options: {}
}];
var defaultData = {
  current: {}
};
var defaultMeasuringConfiguration = {
  draggable: {
    measure: getTransformAgnosticClientRect
  },
  droppable: {
    measure: getTransformAgnosticClientRect,
    strategy: MeasuringStrategy.WhileDragging,
    frequency: MeasuringFrequency.Optimized
  },
  dragOverlay: {
    measure: getClientRect
  }
};
var DroppableContainersMap = class extends Map {
  get(id) {
    var _super$get;
    return id != null ? (_super$get = super.get(id)) != null ? _super$get : void 0 : void 0;
  }
  toArray() {
    return Array.from(this.values());
  }
  getEnabled() {
    return this.toArray().filter((_ref) => {
      let {
        disabled
      } = _ref;
      return !disabled;
    });
  }
  getNodeFor(id) {
    var _this$get$node$curren, _this$get;
    return (_this$get$node$curren = (_this$get = this.get(id)) == null ? void 0 : _this$get.node.current) != null ? _this$get$node$curren : void 0;
  }
};
var defaultPublicContext = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /* @__PURE__ */ new Map(),
  droppableRects: /* @__PURE__ */ new Map(),
  droppableContainers: /* @__PURE__ */ new DroppableContainersMap(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: noop
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: defaultMeasuringConfiguration,
  measureDroppableContainers: noop,
  windowRect: null,
  measuringScheduled: false
};
var defaultInternalContext = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ""
  },
  dispatch: noop,
  draggableNodes: /* @__PURE__ */ new Map(),
  over: null,
  measureDroppableContainers: noop
};
var InternalContext = /* @__PURE__ */ (0, import_react3.createContext)(defaultInternalContext);
var PublicContext = /* @__PURE__ */ (0, import_react3.createContext)(defaultPublicContext);
function getInitialState() {
  return {
    draggable: {
      active: null,
      initialCoordinates: {
        x: 0,
        y: 0
      },
      nodes: /* @__PURE__ */ new Map(),
      translate: {
        x: 0,
        y: 0
      }
    },
    droppable: {
      containers: new DroppableContainersMap()
    }
  };
}
function reducer(state, action) {
  switch (action.type) {
    case Action.DragStart:
      return {
        ...state,
        draggable: {
          ...state.draggable,
          initialCoordinates: action.initialCoordinates,
          active: action.active
        }
      };
    case Action.DragMove:
      if (!state.draggable.active) {
        return state;
      }
      return {
        ...state,
        draggable: {
          ...state.draggable,
          translate: {
            x: action.coordinates.x - state.draggable.initialCoordinates.x,
            y: action.coordinates.y - state.draggable.initialCoordinates.y
          }
        }
      };
    case Action.DragEnd:
    case Action.DragCancel:
      return {
        ...state,
        draggable: {
          ...state.draggable,
          active: null,
          initialCoordinates: {
            x: 0,
            y: 0
          },
          translate: {
            x: 0,
            y: 0
          }
        }
      };
    case Action.RegisterDroppable: {
      const {
        element
      } = action;
      const {
        id
      } = element;
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.set(id, element);
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    case Action.SetDroppableDisabled: {
      const {
        id,
        key,
        disabled
      } = action;
      const element = state.droppable.containers.get(id);
      if (!element || key !== element.key) {
        return state;
      }
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.set(id, {
        ...element,
        disabled
      });
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    case Action.UnregisterDroppable: {
      const {
        id,
        key
      } = action;
      const element = state.droppable.containers.get(id);
      if (!element || key !== element.key) {
        return state;
      }
      const containers = new DroppableContainersMap(state.droppable.containers);
      containers.delete(id);
      return {
        ...state,
        droppable: {
          ...state.droppable,
          containers
        }
      };
    }
    default: {
      return state;
    }
  }
}
function RestoreFocus(_ref) {
  let {
    disabled
  } = _ref;
  const {
    active,
    activatorEvent,
    draggableNodes
  } = (0, import_react3.useContext)(InternalContext);
  const previousActivatorEvent = usePrevious(activatorEvent);
  const previousActiveId = usePrevious(active == null ? void 0 : active.id);
  (0, import_react3.useEffect)(() => {
    if (disabled) {
      return;
    }
    if (!activatorEvent && previousActivatorEvent && previousActiveId != null) {
      if (!isKeyboardEvent(previousActivatorEvent)) {
        return;
      }
      if (document.activeElement === previousActivatorEvent.target) {
        return;
      }
      const draggableNode = draggableNodes.get(previousActiveId);
      if (!draggableNode) {
        return;
      }
      const {
        activatorNode,
        node
      } = draggableNode;
      if (!activatorNode.current && !node.current) {
        return;
      }
      requestAnimationFrame(() => {
        for (const element of [activatorNode.current, node.current]) {
          if (!element) {
            continue;
          }
          const focusableNode = findFirstFocusableNode(element);
          if (focusableNode) {
            focusableNode.focus();
            break;
          }
        }
      });
    }
  }, [activatorEvent, disabled, draggableNodes, previousActiveId, previousActivatorEvent]);
  return null;
}
function applyModifiers(modifiers, _ref) {
  let {
    transform,
    ...args
  } = _ref;
  return modifiers != null && modifiers.length ? modifiers.reduce((accumulator, modifier) => {
    return modifier({
      transform: accumulator,
      ...args
    });
  }, transform) : transform;
}
function useMeasuringConfiguration(config) {
  return (0, import_react3.useMemo)(
    () => ({
      draggable: {
        ...defaultMeasuringConfiguration.draggable,
        ...config == null ? void 0 : config.draggable
      },
      droppable: {
        ...defaultMeasuringConfiguration.droppable,
        ...config == null ? void 0 : config.droppable
      },
      dragOverlay: {
        ...defaultMeasuringConfiguration.dragOverlay,
        ...config == null ? void 0 : config.dragOverlay
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config == null ? void 0 : config.draggable, config == null ? void 0 : config.droppable, config == null ? void 0 : config.dragOverlay]
  );
}
function useLayoutShiftScrollCompensation(_ref) {
  let {
    activeNode,
    measure,
    initialRect,
    config = true
  } = _ref;
  const initialized = (0, import_react3.useRef)(false);
  const {
    x,
    y
  } = typeof config === "boolean" ? {
    x: config,
    y: config
  } : config;
  useIsomorphicLayoutEffect(() => {
    const disabled = !x && !y;
    if (disabled || !activeNode) {
      initialized.current = false;
      return;
    }
    if (initialized.current || !initialRect) {
      return;
    }
    const node = activeNode == null ? void 0 : activeNode.node.current;
    if (!node || node.isConnected === false) {
      return;
    }
    const rect = measure(node);
    const rectDelta = getRectDelta(rect, initialRect);
    if (!x) {
      rectDelta.x = 0;
    }
    if (!y) {
      rectDelta.y = 0;
    }
    initialized.current = true;
    if (Math.abs(rectDelta.x) > 0 || Math.abs(rectDelta.y) > 0) {
      const firstScrollableAncestor = getFirstScrollableAncestor(node);
      if (firstScrollableAncestor) {
        firstScrollableAncestor.scrollBy({
          top: rectDelta.y,
          left: rectDelta.x
        });
      }
    }
  }, [activeNode, x, y, initialRect, measure]);
}
var ActiveDraggableContext = /* @__PURE__ */ (0, import_react3.createContext)({
  ...defaultCoordinates,
  scaleX: 1,
  scaleY: 1
});
var Status;
(function(Status2) {
  Status2[Status2["Uninitialized"] = 0] = "Uninitialized";
  Status2[Status2["Initializing"] = 1] = "Initializing";
  Status2[Status2["Initialized"] = 2] = "Initialized";
})(Status || (Status = {}));
var DndContext = /* @__PURE__ */ (0, import_react3.memo)(function DndContext2(_ref) {
  var _sensorContext$curren, _dragOverlay$nodeRef$, _dragOverlay$rect, _over$rect;
  let {
    id,
    accessibility,
    autoScroll = true,
    children,
    sensors = defaultSensors,
    collisionDetection = rectIntersection,
    measuring,
    modifiers,
    ...props
  } = _ref;
  const store = (0, import_react3.useReducer)(reducer, void 0, getInitialState);
  const [state, dispatch] = store;
  const [dispatchMonitorEvent, registerMonitorListener] = useDndMonitorProvider();
  const [status, setStatus] = (0, import_react3.useState)(Status.Uninitialized);
  const isInitialized = status === Status.Initialized;
  const {
    draggable: {
      active: activeId,
      nodes: draggableNodes,
      translate
    },
    droppable: {
      containers: droppableContainers
    }
  } = state;
  const node = activeId ? draggableNodes.get(activeId) : null;
  const activeRects = (0, import_react3.useRef)({
    initial: null,
    translated: null
  });
  const active = (0, import_react3.useMemo)(() => {
    var _node$data;
    return activeId != null ? {
      id: activeId,
      // It's possible for the active node to unmount while dragging
      data: (_node$data = node == null ? void 0 : node.data) != null ? _node$data : defaultData,
      rect: activeRects
    } : null;
  }, [activeId, node]);
  const activeRef = (0, import_react3.useRef)(null);
  const [activeSensor, setActiveSensor] = (0, import_react3.useState)(null);
  const [activatorEvent, setActivatorEvent] = (0, import_react3.useState)(null);
  const latestProps = useLatestValue(props, Object.values(props));
  const draggableDescribedById = useUniqueId("DndDescribedBy", id);
  const enabledDroppableContainers = (0, import_react3.useMemo)(() => droppableContainers.getEnabled(), [droppableContainers]);
  const measuringConfiguration = useMeasuringConfiguration(measuring);
  const {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled
  } = useDroppableMeasuring(enabledDroppableContainers, {
    dragging: isInitialized,
    dependencies: [translate.x, translate.y],
    config: measuringConfiguration.droppable
  });
  const activeNode = useCachedNode(draggableNodes, activeId);
  const activationCoordinates = (0, import_react3.useMemo)(() => activatorEvent ? getEventCoordinates(activatorEvent) : null, [activatorEvent]);
  const autoScrollOptions = getAutoScrollerOptions();
  const initialActiveNodeRect = useInitialRect(activeNode, measuringConfiguration.draggable.measure);
  useLayoutShiftScrollCompensation({
    activeNode: activeId ? draggableNodes.get(activeId) : null,
    config: autoScrollOptions.layoutShiftCompensation,
    initialRect: initialActiveNodeRect,
    measure: measuringConfiguration.draggable.measure
  });
  const activeNodeRect = useRect(activeNode, measuringConfiguration.draggable.measure, initialActiveNodeRect);
  const containerNodeRect = useRect(activeNode ? activeNode.parentElement : null);
  const sensorContext = (0, import_react3.useRef)({
    activatorEvent: null,
    active: null,
    activeNode,
    collisionRect: null,
    collisions: null,
    droppableRects,
    draggableNodes,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  });
  const overNode = droppableContainers.getNodeFor((_sensorContext$curren = sensorContext.current.over) == null ? void 0 : _sensorContext$curren.id);
  const dragOverlay = useDragOverlayMeasuring({
    measure: measuringConfiguration.dragOverlay.measure
  });
  const draggingNode = (_dragOverlay$nodeRef$ = dragOverlay.nodeRef.current) != null ? _dragOverlay$nodeRef$ : activeNode;
  const draggingNodeRect = isInitialized ? (_dragOverlay$rect = dragOverlay.rect) != null ? _dragOverlay$rect : activeNodeRect : null;
  const usesDragOverlay = Boolean(dragOverlay.nodeRef.current && dragOverlay.rect);
  const nodeRectDelta = useRectDelta(usesDragOverlay ? null : activeNodeRect);
  const windowRect = useWindowRect(draggingNode ? getWindow(draggingNode) : null);
  const scrollableAncestors = useScrollableAncestors(isInitialized ? overNode != null ? overNode : activeNode : null);
  const scrollableAncestorRects = useRects(scrollableAncestors);
  const modifiedTranslate = applyModifiers(modifiers, {
    transform: {
      x: translate.x - nodeRectDelta.x,
      y: translate.y - nodeRectDelta.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect,
    over: sensorContext.current.over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  });
  const pointerCoordinates = activationCoordinates ? add(activationCoordinates, translate) : null;
  const scrollOffsets = useScrollOffsets(scrollableAncestors);
  const scrollAdjustment = useScrollOffsetsDelta(scrollOffsets);
  const activeNodeScrollDelta = useScrollOffsetsDelta(scrollOffsets, [activeNodeRect]);
  const scrollAdjustedTranslate = add(modifiedTranslate, scrollAdjustment);
  const collisionRect = draggingNodeRect ? getAdjustedRect(draggingNodeRect, modifiedTranslate) : null;
  const collisions = active && collisionRect ? collisionDetection({
    active,
    collisionRect,
    droppableRects,
    droppableContainers: enabledDroppableContainers,
    pointerCoordinates
  }) : null;
  const overId = getFirstCollision(collisions, "id");
  const [over, setOver] = (0, import_react3.useState)(null);
  const appliedTranslate = usesDragOverlay ? modifiedTranslate : add(modifiedTranslate, activeNodeScrollDelta);
  const transform = adjustScale(appliedTranslate, (_over$rect = over == null ? void 0 : over.rect) != null ? _over$rect : null, activeNodeRect);
  const instantiateSensor = (0, import_react3.useCallback)(
    (event, _ref2) => {
      let {
        sensor: Sensor,
        options
      } = _ref2;
      if (activeRef.current == null) {
        return;
      }
      const activeNode2 = draggableNodes.get(activeRef.current);
      if (!activeNode2) {
        return;
      }
      const activatorEvent2 = event.nativeEvent;
      const sensorInstance = new Sensor({
        active: activeRef.current,
        activeNode: activeNode2,
        event: activatorEvent2,
        options,
        // Sensors need to be instantiated with refs for arguments that change over time
        // otherwise they are frozen in time with the stale arguments
        context: sensorContext,
        onStart(initialCoordinates) {
          const id2 = activeRef.current;
          if (id2 == null) {
            return;
          }
          const draggableNode = draggableNodes.get(id2);
          if (!draggableNode) {
            return;
          }
          const {
            onDragStart
          } = latestProps.current;
          const event2 = {
            active: {
              id: id2,
              data: draggableNode.data,
              rect: activeRects
            }
          };
          (0, import_react_dom.unstable_batchedUpdates)(() => {
            onDragStart == null ? void 0 : onDragStart(event2);
            setStatus(Status.Initializing);
            dispatch({
              type: Action.DragStart,
              initialCoordinates,
              active: id2
            });
            dispatchMonitorEvent({
              type: "onDragStart",
              event: event2
            });
          });
        },
        onMove(coordinates) {
          dispatch({
            type: Action.DragMove,
            coordinates
          });
        },
        onEnd: createHandler(Action.DragEnd),
        onCancel: createHandler(Action.DragCancel)
      });
      (0, import_react_dom.unstable_batchedUpdates)(() => {
        setActiveSensor(sensorInstance);
        setActivatorEvent(event.nativeEvent);
      });
      function createHandler(type) {
        return async function handler() {
          const {
            active: active2,
            collisions: collisions2,
            over: over2,
            scrollAdjustedTranslate: scrollAdjustedTranslate2
          } = sensorContext.current;
          let event2 = null;
          if (active2 && scrollAdjustedTranslate2) {
            const {
              cancelDrop
            } = latestProps.current;
            event2 = {
              activatorEvent: activatorEvent2,
              active: active2,
              collisions: collisions2,
              delta: scrollAdjustedTranslate2,
              over: over2
            };
            if (type === Action.DragEnd && typeof cancelDrop === "function") {
              const shouldCancel = await Promise.resolve(cancelDrop(event2));
              if (shouldCancel) {
                type = Action.DragCancel;
              }
            }
          }
          activeRef.current = null;
          (0, import_react_dom.unstable_batchedUpdates)(() => {
            dispatch({
              type
            });
            setStatus(Status.Uninitialized);
            setOver(null);
            setActiveSensor(null);
            setActivatorEvent(null);
            const eventName = type === Action.DragEnd ? "onDragEnd" : "onDragCancel";
            if (event2) {
              const handler2 = latestProps.current[eventName];
              handler2 == null ? void 0 : handler2(event2);
              dispatchMonitorEvent({
                type: eventName,
                event: event2
              });
            }
          });
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draggableNodes]
  );
  const bindActivatorToSensorInstantiator = (0, import_react3.useCallback)((handler, sensor) => {
    return (event, active2) => {
      const nativeEvent = event.nativeEvent;
      const activeDraggableNode = draggableNodes.get(active2);
      if (
        // Another sensor is already instantiating
        activeRef.current !== null || // No active draggable
        !activeDraggableNode || // Event has already been captured
        nativeEvent.dndKit || nativeEvent.defaultPrevented
      ) {
        return;
      }
      const activationContext = {
        active: activeDraggableNode
      };
      const shouldActivate = handler(event, sensor.options, activationContext);
      if (shouldActivate === true) {
        nativeEvent.dndKit = {
          capturedBy: sensor.sensor
        };
        activeRef.current = active2;
        instantiateSensor(event, sensor);
      }
    };
  }, [draggableNodes, instantiateSensor]);
  const activators = useCombineActivators(sensors, bindActivatorToSensorInstantiator);
  useSensorSetup(sensors);
  useIsomorphicLayoutEffect(() => {
    if (activeNodeRect && status === Status.Initializing) {
      setStatus(Status.Initialized);
    }
  }, [activeNodeRect, status]);
  (0, import_react3.useEffect)(
    () => {
      const {
        onDragMove
      } = latestProps.current;
      const {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        over: over2
      } = sensorContext.current;
      if (!active2 || !activatorEvent2) {
        return;
      }
      const event = {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        delta: {
          x: scrollAdjustedTranslate.x,
          y: scrollAdjustedTranslate.y
        },
        over: over2
      };
      (0, import_react_dom.unstable_batchedUpdates)(() => {
        onDragMove == null ? void 0 : onDragMove(event);
        dispatchMonitorEvent({
          type: "onDragMove",
          event
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollAdjustedTranslate.x, scrollAdjustedTranslate.y]
  );
  (0, import_react3.useEffect)(
    () => {
      const {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        droppableContainers: droppableContainers2,
        scrollAdjustedTranslate: scrollAdjustedTranslate2
      } = sensorContext.current;
      if (!active2 || activeRef.current == null || !activatorEvent2 || !scrollAdjustedTranslate2) {
        return;
      }
      const {
        onDragOver
      } = latestProps.current;
      const overContainer = droppableContainers2.get(overId);
      const over2 = overContainer && overContainer.rect.current ? {
        id: overContainer.id,
        rect: overContainer.rect.current,
        data: overContainer.data,
        disabled: overContainer.disabled
      } : null;
      const event = {
        active: active2,
        activatorEvent: activatorEvent2,
        collisions: collisions2,
        delta: {
          x: scrollAdjustedTranslate2.x,
          y: scrollAdjustedTranslate2.y
        },
        over: over2
      };
      (0, import_react_dom.unstable_batchedUpdates)(() => {
        setOver(over2);
        onDragOver == null ? void 0 : onDragOver(event);
        dispatchMonitorEvent({
          type: "onDragOver",
          event
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [overId]
  );
  useIsomorphicLayoutEffect(() => {
    sensorContext.current = {
      activatorEvent,
      active,
      activeNode,
      collisionRect,
      collisions,
      droppableRects,
      draggableNodes,
      draggingNode,
      draggingNodeRect,
      droppableContainers,
      over,
      scrollableAncestors,
      scrollAdjustedTranslate
    };
    activeRects.current = {
      initial: draggingNodeRect,
      translated: collisionRect
    };
  }, [active, activeNode, collisions, collisionRect, draggableNodes, draggingNode, draggingNodeRect, droppableRects, droppableContainers, over, scrollableAncestors, scrollAdjustedTranslate]);
  useAutoScroller({
    ...autoScrollOptions,
    delta: translate,
    draggingRect: collisionRect,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects
  });
  const publicContext = (0, import_react3.useMemo)(() => {
    const context = {
      active,
      activeNode,
      activeNodeRect,
      activatorEvent,
      collisions,
      containerNodeRect,
      dragOverlay,
      draggableNodes,
      droppableContainers,
      droppableRects,
      over,
      measureDroppableContainers,
      scrollableAncestors,
      scrollableAncestorRects,
      measuringConfiguration,
      measuringScheduled,
      windowRect
    };
    return context;
  }, [active, activeNode, activeNodeRect, activatorEvent, collisions, containerNodeRect, dragOverlay, draggableNodes, droppableContainers, droppableRects, over, measureDroppableContainers, scrollableAncestors, scrollableAncestorRects, measuringConfiguration, measuringScheduled, windowRect]);
  const internalContext = (0, import_react3.useMemo)(() => {
    const context = {
      activatorEvent,
      activators,
      active,
      activeNodeRect,
      ariaDescribedById: {
        draggable: draggableDescribedById
      },
      dispatch,
      draggableNodes,
      over,
      measureDroppableContainers
    };
    return context;
  }, [activatorEvent, activators, active, activeNodeRect, dispatch, draggableDescribedById, draggableNodes, over, measureDroppableContainers]);
  return import_react3.default.createElement(DndMonitorContext.Provider, {
    value: registerMonitorListener
  }, import_react3.default.createElement(InternalContext.Provider, {
    value: internalContext
  }, import_react3.default.createElement(PublicContext.Provider, {
    value: publicContext
  }, import_react3.default.createElement(ActiveDraggableContext.Provider, {
    value: transform
  }, children)), import_react3.default.createElement(RestoreFocus, {
    disabled: (accessibility == null ? void 0 : accessibility.restoreFocus) === false
  })), import_react3.default.createElement(Accessibility, {
    ...accessibility,
    hiddenTextDescribedById: draggableDescribedById
  }));
  function getAutoScrollerOptions() {
    const activeSensorDisablesAutoscroll = (activeSensor == null ? void 0 : activeSensor.autoScrollEnabled) === false;
    const autoScrollGloballyDisabled = typeof autoScroll === "object" ? autoScroll.enabled === false : autoScroll === false;
    const enabled = isInitialized && !activeSensorDisablesAutoscroll && !autoScrollGloballyDisabled;
    if (typeof autoScroll === "object") {
      return {
        ...autoScroll,
        enabled
      };
    }
    return {
      enabled
    };
  }
});
var NullContext = /* @__PURE__ */ (0, import_react3.createContext)(null);
var defaultRole = "button";
var ID_PREFIX = "Droppable";
function useDraggable(_ref) {
  let {
    id,
    data,
    disabled = false,
    attributes
  } = _ref;
  const key = useUniqueId(ID_PREFIX);
  const {
    activators,
    activatorEvent,
    active,
    activeNodeRect,
    ariaDescribedById,
    draggableNodes,
    over
  } = (0, import_react3.useContext)(InternalContext);
  const {
    role = defaultRole,
    roleDescription = "draggable",
    tabIndex = 0
  } = attributes != null ? attributes : {};
  const isDragging = (active == null ? void 0 : active.id) === id;
  const transform = (0, import_react3.useContext)(isDragging ? ActiveDraggableContext : NullContext);
  const [node, setNodeRef] = useNodeRef();
  const [activatorNode, setActivatorNodeRef] = useNodeRef();
  const listeners = useSyntheticListeners(activators, id);
  const dataRef = useLatestValue(data);
  useIsomorphicLayoutEffect(
    () => {
      draggableNodes.set(id, {
        id,
        key,
        node,
        activatorNode,
        data: dataRef
      });
      return () => {
        const node2 = draggableNodes.get(id);
        if (node2 && node2.key === key) {
          draggableNodes.delete(id);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draggableNodes, id]
  );
  const memoizedAttributes = (0, import_react3.useMemo)(() => ({
    role,
    tabIndex,
    "aria-disabled": disabled,
    "aria-pressed": isDragging && role === defaultRole ? true : void 0,
    "aria-roledescription": roleDescription,
    "aria-describedby": ariaDescribedById.draggable
  }), [disabled, role, tabIndex, isDragging, roleDescription, ariaDescribedById.draggable]);
  return {
    active,
    activatorEvent,
    activeNodeRect,
    attributes: memoizedAttributes,
    isDragging,
    listeners: disabled ? void 0 : listeners,
    node,
    over,
    setNodeRef,
    setActivatorNodeRef,
    transform
  };
}
function useDndContext() {
  return (0, import_react3.useContext)(PublicContext);
}
var ID_PREFIX$1 = "Droppable";
var defaultResizeObserverConfig = {
  timeout: 25
};
function useDroppable(_ref) {
  let {
    data,
    disabled = false,
    id,
    resizeObserverConfig
  } = _ref;
  const key = useUniqueId(ID_PREFIX$1);
  const {
    active,
    dispatch,
    over,
    measureDroppableContainers
  } = (0, import_react3.useContext)(InternalContext);
  const previous = (0, import_react3.useRef)({
    disabled
  });
  const resizeObserverConnected = (0, import_react3.useRef)(false);
  const rect = (0, import_react3.useRef)(null);
  const callbackId = (0, import_react3.useRef)(null);
  const {
    disabled: resizeObserverDisabled,
    updateMeasurementsFor,
    timeout: resizeObserverTimeout
  } = {
    ...defaultResizeObserverConfig,
    ...resizeObserverConfig
  };
  const ids2 = useLatestValue(updateMeasurementsFor != null ? updateMeasurementsFor : id);
  const handleResize = (0, import_react3.useCallback)(
    () => {
      if (!resizeObserverConnected.current) {
        resizeObserverConnected.current = true;
        return;
      }
      if (callbackId.current != null) {
        clearTimeout(callbackId.current);
      }
      callbackId.current = setTimeout(() => {
        measureDroppableContainers(Array.isArray(ids2.current) ? ids2.current : [ids2.current]);
        callbackId.current = null;
      }, resizeObserverTimeout);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [resizeObserverTimeout]
  );
  const resizeObserver = useResizeObserver({
    callback: handleResize,
    disabled: resizeObserverDisabled || !active
  });
  const handleNodeChange = (0, import_react3.useCallback)((newElement, previousElement) => {
    if (!resizeObserver) {
      return;
    }
    if (previousElement) {
      resizeObserver.unobserve(previousElement);
      resizeObserverConnected.current = false;
    }
    if (newElement) {
      resizeObserver.observe(newElement);
    }
  }, [resizeObserver]);
  const [nodeRef, setNodeRef] = useNodeRef(handleNodeChange);
  const dataRef = useLatestValue(data);
  (0, import_react3.useEffect)(() => {
    if (!resizeObserver || !nodeRef.current) {
      return;
    }
    resizeObserver.disconnect();
    resizeObserverConnected.current = false;
    resizeObserver.observe(nodeRef.current);
  }, [nodeRef, resizeObserver]);
  useIsomorphicLayoutEffect(
    () => {
      dispatch({
        type: Action.RegisterDroppable,
        element: {
          id,
          key,
          disabled,
          node: nodeRef,
          rect,
          data: dataRef
        }
      });
      return () => dispatch({
        type: Action.UnregisterDroppable,
        key,
        id
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id]
  );
  (0, import_react3.useEffect)(() => {
    if (disabled !== previous.current.disabled) {
      dispatch({
        type: Action.SetDroppableDisabled,
        id,
        key,
        disabled
      });
      previous.current.disabled = disabled;
    }
  }, [id, key, disabled, dispatch]);
  return {
    active,
    rect,
    isOver: (over == null ? void 0 : over.id) === id,
    node: nodeRef,
    over,
    setNodeRef
  };
}

// node_modules/.pnpm/@dnd-kit+sortable@8.0.0_@dnd-kit+core@6.1.0_react-dom@18.2.0_react@18.2.0__react@18.2.0__react@18.2.0/node_modules/@dnd-kit/sortable/dist/sortable.esm.js
var import_react4 = __toESM(require_react());
function arrayMove(array, from, to) {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
  return newArray;
}
function getSortedRects(items, rects) {
  return items.reduce((accumulator, id, index) => {
    const rect = rects.get(id);
    if (rect) {
      accumulator[index] = rect;
    }
    return accumulator;
  }, Array(items.length));
}
function isValidIndex(index) {
  return index !== null && index >= 0;
}
function itemsEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
function normalizeDisabled(disabled) {
  if (typeof disabled === "boolean") {
    return {
      draggable: disabled,
      droppable: disabled
    };
  }
  return disabled;
}
var rectSortingStrategy = (_ref) => {
  let {
    rects,
    activeIndex,
    overIndex,
    index
  } = _ref;
  const newRects = arrayMove(rects, overIndex, activeIndex);
  const oldRect = rects[index];
  const newRect = newRects[index];
  if (!newRect || !oldRect) {
    return null;
  }
  return {
    x: newRect.left - oldRect.left,
    y: newRect.top - oldRect.top,
    scaleX: newRect.width / oldRect.width,
    scaleY: newRect.height / oldRect.height
  };
};
var rectSwappingStrategy = (_ref) => {
  let {
    activeIndex,
    index,
    rects,
    overIndex
  } = _ref;
  let oldRect;
  let newRect;
  if (index === activeIndex) {
    oldRect = rects[index];
    newRect = rects[overIndex];
  }
  if (index === overIndex) {
    oldRect = rects[index];
    newRect = rects[activeIndex];
  }
  if (!newRect || !oldRect) {
    return null;
  }
  return {
    x: newRect.left - oldRect.left,
    y: newRect.top - oldRect.top,
    scaleX: newRect.width / oldRect.width,
    scaleY: newRect.height / oldRect.height
  };
};
var ID_PREFIX2 = "Sortable";
var Context = /* @__PURE__ */ import_react4.default.createContext({
  activeIndex: -1,
  containerId: ID_PREFIX2,
  disableTransforms: false,
  items: [],
  overIndex: -1,
  useDragOverlay: false,
  sortedRects: [],
  strategy: rectSortingStrategy,
  disabled: {
    draggable: false,
    droppable: false
  }
});
function SortableContext(_ref) {
  let {
    children,
    id,
    items: userDefinedItems,
    strategy = rectSortingStrategy,
    disabled: disabledProp = false
  } = _ref;
  const {
    active,
    dragOverlay,
    droppableRects,
    over,
    measureDroppableContainers
  } = useDndContext();
  const containerId = useUniqueId(ID_PREFIX2, id);
  const useDragOverlay = Boolean(dragOverlay.rect !== null);
  const items = (0, import_react4.useMemo)(() => userDefinedItems.map((item) => typeof item === "object" && "id" in item ? item.id : item), [userDefinedItems]);
  const isDragging = active != null;
  const activeIndex = active ? items.indexOf(active.id) : -1;
  const overIndex = over ? items.indexOf(over.id) : -1;
  const previousItemsRef = (0, import_react4.useRef)(items);
  const itemsHaveChanged = !itemsEqual(items, previousItemsRef.current);
  const disableTransforms = overIndex !== -1 && activeIndex === -1 || itemsHaveChanged;
  const disabled = normalizeDisabled(disabledProp);
  useIsomorphicLayoutEffect(() => {
    if (itemsHaveChanged && isDragging) {
      measureDroppableContainers(items);
    }
  }, [itemsHaveChanged, items, isDragging, measureDroppableContainers]);
  (0, import_react4.useEffect)(() => {
    previousItemsRef.current = items;
  }, [items]);
  const contextValue = (0, import_react4.useMemo)(
    () => ({
      activeIndex,
      containerId,
      disabled,
      disableTransforms,
      items,
      overIndex,
      useDragOverlay,
      sortedRects: getSortedRects(items, droppableRects),
      strategy
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeIndex, containerId, disabled.draggable, disabled.droppable, disableTransforms, items, overIndex, droppableRects, useDragOverlay, strategy]
  );
  return import_react4.default.createElement(Context.Provider, {
    value: contextValue
  }, children);
}
var defaultNewIndexGetter = (_ref) => {
  let {
    id,
    items,
    activeIndex,
    overIndex
  } = _ref;
  return arrayMove(items, activeIndex, overIndex).indexOf(id);
};
var defaultAnimateLayoutChanges = (_ref2) => {
  let {
    containerId,
    isSorting,
    wasDragging,
    index,
    items,
    newIndex,
    previousItems,
    previousContainerId,
    transition
  } = _ref2;
  if (!transition || !wasDragging) {
    return false;
  }
  if (previousItems !== items && index === newIndex) {
    return false;
  }
  if (isSorting) {
    return true;
  }
  return newIndex !== index && containerId === previousContainerId;
};
var defaultTransition = {
  duration: 200,
  easing: "ease"
};
var transitionProperty = "transform";
var disabledTransition = /* @__PURE__ */ CSS.Transition.toString({
  property: transitionProperty,
  duration: 0,
  easing: "linear"
});
var defaultAttributes = {
  roleDescription: "sortable"
};
function useDerivedTransform(_ref) {
  let {
    disabled,
    index,
    node,
    rect
  } = _ref;
  const [derivedTransform, setDerivedtransform] = (0, import_react4.useState)(null);
  const previousIndex = (0, import_react4.useRef)(index);
  useIsomorphicLayoutEffect(() => {
    if (!disabled && index !== previousIndex.current && node.current) {
      const initial = rect.current;
      if (initial) {
        const current = getClientRect(node.current, {
          ignoreTransform: true
        });
        const delta = {
          x: initial.left - current.left,
          y: initial.top - current.top,
          scaleX: initial.width / current.width,
          scaleY: initial.height / current.height
        };
        if (delta.x || delta.y) {
          setDerivedtransform(delta);
        }
      }
    }
    if (index !== previousIndex.current) {
      previousIndex.current = index;
    }
  }, [disabled, index, node, rect]);
  (0, import_react4.useEffect)(() => {
    if (derivedTransform) {
      setDerivedtransform(null);
    }
  }, [derivedTransform]);
  return derivedTransform;
}
function useSortable(_ref) {
  let {
    animateLayoutChanges = defaultAnimateLayoutChanges,
    attributes: userDefinedAttributes,
    disabled: localDisabled,
    data: customData,
    getNewIndex = defaultNewIndexGetter,
    id,
    strategy: localStrategy,
    resizeObserverConfig,
    transition = defaultTransition
  } = _ref;
  const {
    items,
    containerId,
    activeIndex,
    disabled: globalDisabled,
    disableTransforms,
    sortedRects,
    overIndex,
    useDragOverlay,
    strategy: globalStrategy
  } = (0, import_react4.useContext)(Context);
  const disabled = normalizeLocalDisabled(localDisabled, globalDisabled);
  const index = items.indexOf(id);
  const data = (0, import_react4.useMemo)(() => ({
    sortable: {
      containerId,
      index,
      items
    },
    ...customData
  }), [containerId, customData, index, items]);
  const itemsAfterCurrentSortable = (0, import_react4.useMemo)(() => items.slice(items.indexOf(id)), [items, id]);
  const {
    rect,
    node,
    isOver,
    setNodeRef: setDroppableNodeRef
  } = useDroppable({
    id,
    data,
    disabled: disabled.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: itemsAfterCurrentSortable,
      ...resizeObserverConfig
    }
  });
  const {
    active,
    activatorEvent,
    activeNodeRect,
    attributes,
    setNodeRef: setDraggableNodeRef,
    listeners,
    isDragging,
    over,
    setActivatorNodeRef,
    transform
  } = useDraggable({
    id,
    data,
    attributes: {
      ...defaultAttributes,
      ...userDefinedAttributes
    },
    disabled: disabled.draggable
  });
  const setNodeRef = useCombinedRefs(setDroppableNodeRef, setDraggableNodeRef);
  const isSorting = Boolean(active);
  const displaceItem = isSorting && !disableTransforms && isValidIndex(activeIndex) && isValidIndex(overIndex);
  const shouldDisplaceDragSource = !useDragOverlay && isDragging;
  const dragSourceDisplacement = shouldDisplaceDragSource && displaceItem ? transform : null;
  const strategy = localStrategy != null ? localStrategy : globalStrategy;
  const finalTransform = displaceItem ? dragSourceDisplacement != null ? dragSourceDisplacement : strategy({
    rects: sortedRects,
    activeNodeRect,
    activeIndex,
    overIndex,
    index
  }) : null;
  const newIndex = isValidIndex(activeIndex) && isValidIndex(overIndex) ? getNewIndex({
    id,
    items,
    activeIndex,
    overIndex
  }) : index;
  const activeId = active == null ? void 0 : active.id;
  const previous = (0, import_react4.useRef)({
    activeId,
    items,
    newIndex,
    containerId
  });
  const itemsHaveChanged = items !== previous.current.items;
  const shouldAnimateLayoutChanges = animateLayoutChanges({
    active,
    containerId,
    isDragging,
    isSorting,
    id,
    index,
    items,
    newIndex: previous.current.newIndex,
    previousItems: previous.current.items,
    previousContainerId: previous.current.containerId,
    transition,
    wasDragging: previous.current.activeId != null
  });
  const derivedTransform = useDerivedTransform({
    disabled: !shouldAnimateLayoutChanges,
    index,
    node,
    rect
  });
  (0, import_react4.useEffect)(() => {
    if (isSorting && previous.current.newIndex !== newIndex) {
      previous.current.newIndex = newIndex;
    }
    if (containerId !== previous.current.containerId) {
      previous.current.containerId = containerId;
    }
    if (items !== previous.current.items) {
      previous.current.items = items;
    }
  }, [isSorting, newIndex, containerId, items]);
  (0, import_react4.useEffect)(() => {
    if (activeId === previous.current.activeId) {
      return;
    }
    if (activeId && !previous.current.activeId) {
      previous.current.activeId = activeId;
      return;
    }
    const timeoutId = setTimeout(() => {
      previous.current.activeId = activeId;
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [activeId]);
  return {
    active,
    activeIndex,
    attributes,
    data,
    rect,
    index,
    newIndex,
    items,
    isOver,
    isSorting,
    isDragging,
    listeners,
    node,
    overIndex,
    over,
    setNodeRef,
    setActivatorNodeRef,
    setDroppableNodeRef,
    setDraggableNodeRef,
    transform: derivedTransform != null ? derivedTransform : finalTransform,
    transition: getTransition()
  };
  function getTransition() {
    if (
      // Temporarily disable transitions for a single frame to set up derived transforms
      derivedTransform || // Or to prevent items jumping to back to their "new" position when items change
      itemsHaveChanged && previous.current.newIndex === index
    ) {
      return disabledTransition;
    }
    if (shouldDisplaceDragSource && !isKeyboardEvent(activatorEvent) || !transition) {
      return void 0;
    }
    if (isSorting || shouldAnimateLayoutChanges) {
      return CSS.Transition.toString({
        ...transition,
        property: transitionProperty
      });
    }
    return void 0;
  }
}
function normalizeLocalDisabled(localDisabled, globalDisabled) {
  var _localDisabled$dragga, _localDisabled$droppa;
  if (typeof localDisabled === "boolean") {
    return {
      draggable: localDisabled,
      // Backwards compatibility
      droppable: false
    };
  }
  return {
    draggable: (_localDisabled$dragga = localDisabled == null ? void 0 : localDisabled.draggable) != null ? _localDisabled$dragga : globalDisabled.draggable,
    droppable: (_localDisabled$droppa = localDisabled == null ? void 0 : localDisabled.droppable) != null ? _localDisabled$droppa : globalDisabled.droppable
  };
}
var directions = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];

// src/features/searchChatHub/components/CustomContainer.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var SortableItemContext = (0, import_react5.createContext)({
  isDragging: false,
  attributes: {},
  listeners: void 0,
  setActivatorNodeRef: () => {
  },
  setDisableSortable: () => {
  }
});
var Divider = styled_default(Box_default)(({ theme }) => ({
  width: "12px",
  color: theme.palette.divider,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "col-resize"
}));
var CustomContainerItem = (props) => {
  const { id, width, order = 0, setOverlay, children } = props;
  const [disableSortable, setDisableSortable] = (0, import_react5.useState)(false);
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef
  } = useSortable({
    id,
    disabled: disableSortable
  });
  (0, import_react5.useEffect)(() => {
    setOverlay(isDragging);
  }, [isDragging]);
  const context = (0, import_react5.useMemo)(
    () => ({
      isDragging,
      attributes,
      listeners,
      setActivatorNodeRef,
      setDisableSortable
    }),
    [attributes, listeners, isDragging, setActivatorNodeRef]
  );
  const sxTransform = {
    // 先只显示拖拽时的 transform，后面的不好处理。因为用了 order 排序后，transform 的值不对了
    transform: isDragging ? CSS.Transform.toString(transform) : void 0,
    transition: isDragging ? transition || void 0 : void 0,
    // ---
    opacity: isDragging ? "0.7" : "1",
    // transformOrigin: '50% 50%',
    backgroundColor: isDragging ? "rgba(0, 0, 0, 0.3)" : "transparent",
    boxShadow: isDragging ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px" : "none",
    zIndex: isDragging ? 1 : "auto"
    // ---
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Box_default,
    {
      "data-testid": "chat_hub__custom_container_item",
      sx: {
        width: `${width}%`,
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
        order,
        ...sxTransform
      },
      ref: setNodeRef,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableItemContext.Provider, { value: context, children })
    },
    id
  );
};
var CustomContainer = (props) => {
  const { columns, sx: stackSx, widthsChanged, onOrderSwap, ...stackProps } = props;
  const [widths, setWidths] = (0, import_react5.useState)(columns.map((column) => column.width));
  const [overlay, setOverlay] = (0, import_react5.useState)(false);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 0,
        // 鼠标移动距离超过8像素才开始拖拽
        tolerance: 8
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 0,
        // 触摸移动距离超过8像素才开始拖拽
        tolerance: 8
      }
    })
  );
  (0, import_react5.useEffect)(() => {
    const newWidths = columns.map((column) => column.width);
    const totalWidth = newWidths.reduce((sum, width) => sum + width, 0);
    if (totalWidth > 100) {
    }
    setWidths(newWidths);
  }, [columns]);
  const memoizedColumns = (0, import_react5.useMemo)(() => {
    return columns.sort((a, b) => a.id > b.id ? 1 : -1);
  }, [columns]);
  const handleDividerDragStart = (0, import_react5.useCallback)((e, index) => {
    e.preventDefault();
    setOverlay(true);
    let newWidths = [...widths];
    const handleMouseMove = (e2) => {
      const container = document.querySelector('[data-testid="chat_hub__custom_container"]');
      if (container) {
        const containerWidth = container.offsetWidth;
        const mouseX = e2.clientX - container.getBoundingClientRect().left;
        newWidths = [...widths];
        const totalWidth = newWidths[index] + newWidths[index + 1];
        let leftWidthPercent = mouseX / containerWidth * 100;
        const previousWidthSum = newWidths.slice(0, index).reduce((sum, width) => sum + width, 0);
        leftWidthPercent = leftWidthPercent - previousWidthSum;
        const minWidth = 10;
        leftWidthPercent = Math.max(minWidth, Math.min(totalWidth - minWidth, leftWidthPercent));
        newWidths[index] = leftWidthPercent;
        newWidths[index + 1] = totalWidth - leftWidthPercent;
        setWidths(newWidths);
      }
    };
    const handleMouseUp = () => {
      setOverlay(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      widthsChanged(newWidths.map((width, index2) => ({
        id: memoizedColumns[index2].id,
        width
      })));
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [widths, widthsChanged]);
  const handleDragEnd = (0, import_react5.useCallback)((event) => {
    const { active, over } = event;
    if (active.id && (over == null ? void 0 : over.id) && active.id !== (over == null ? void 0 : over.id)) {
      onOrderSwap(active.id, over == null ? void 0 : over.id);
    }
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Stack_default,
      {
        "data-testid": "chat_hub__custom_container",
        direction: "row",
        sx: {
          width: "100%",
          height: "100%",
          position: "relative",
          ...stackSx
        },
        ...stackProps,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          DndContext,
          {
            sensors,
            collisionDetection: closestCenter,
            onDragEnd: handleDragEnd,
            modifiers: [
              restrictToHorizontalAxis,
              // 只能水平拖拽
              restrictToWindowEdges
              // 不能拖出窗口外
            ],
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, { items: memoizedColumns, strategy: rectSwappingStrategy, children: memoizedColumns.map((column, index) => {
              if (index === 0) {
              }
              return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react5.default.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomContainerItem, { id: column.id, width: widths[column.order], order: column.order, setOverlay, children: column.children }),
                column.order < memoizedColumns.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  Divider,
                  {
                    sx: {
                      order: column.order
                    },
                    onMouseDown: (e) => handleDividerDragStart(e, column.order),
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box_default, { sx: {
                      width: "3px",
                      borderRadius: "1.5px",
                      height: "20px",
                      backgroundColor: "rgba(255, 255, 255, 0.08)"
                    } })
                  }
                )
              ] }, column.id);
            }) })
          }
        )
      }
    ),
    overlay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      Box_default,
      {
        sx: {
          position: "fixed",
          // border: '1px solid red',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999
        }
      }
    )
  ] });
};
var CustomContainer_default = CustomContainer;

// src/features/searchChatHub/components/TextOnlyTooltip.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var TextOnlyTooltip = (props) => {
  const { title, children, ...restTooltipProps } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    Tooltip_default,
    {
      title,
      TransitionProps: {
        style: { margin: "4px" }
        // 设置距离
        // timeout: 150,      // 过渡动画时长
      },
      componentsProps: {
        tooltip: {
          sx: {
            fontSize: "14px",
            lineHeight: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "4.5px 6px",
            borderRadius: "6px"
          }
        }
      },
      ...restTooltipProps,
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { display: "inline-flex" }, children })
    }
  );
};
var TextOnlyTooltip_default = TextOnlyTooltip;

// src/features/searchChatHub/components/ChatHubLayoutButton.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var ChatHubLayoutButton = (props) => {
  const { icon, tooltipTitle, onClick, isActive } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TextOnlyTooltip_default, { title: tooltipTitle, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    IconButton_default,
    {
      sx: {
        width: "38px",
        height: "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      onClick: (event) => {
        event.stopPropagation();
        onClick();
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        CustomIcon_default,
        {
          icon,
          sx: {
            color: isActive ? "rgba(196, 197, 197, 1)" : "rgb(121,122,123)",
            fontSize: "22px"
          }
        }
      )
    }
  ) });
};
var ChatHubLayoutButton_default = ChatHubLayoutButton;

// src/features/searchChatHub/store/chatHub.ts
var defaultChatHubColumnConfig = () => [
  {
    id: v4_default(),
    provider: "ChatGPT" /* ChatGPT */
  },
  {
    id: v4_default(),
    provider: "Google" /* Google */
  }
];
var chatHubColumnConfigState = Recoil_index_8({
  key: "chatHubColumnConfigState",
  default: void 0
  // 如果是 undefined 表示正在 localStorage 载入中
});
var chatHubIframesLoadedState = Recoil_index_8({
  key: "chatHubIframesLoadedState",
  default: {}
});
var defaultChatHubSideNavConfig = () => ({
  isExpand: true
});
var chatHubSideNavConfigState = Recoil_index_8({
  key: "chatHubSideNavConfigState",
  default: void 0
  // 如果是 undefined 表示正在 localStorage 载入中
});
var chatHubSideNavActiveMenuState = Recoil_index_8({
  key: "chatHubSideNavActiveMenuState",
  default: "all_in_one"
});
var chatHubProviderIframeInfoState = Recoil_index_8({
  key: "chatHubProviderIframeInfoState",
  default: {}
});
var chatHubResetState = Recoil_index_8({
  key: "chatHubResetState",
  default: false
});

// src/features/searchChatHub/hooks/useChatHub.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());
var import_react6 = __toESM(require_react());

// src/features/searchChatHub/utils/index.ts
var emitSearchChatHubHeartbeat = () => {
  const port = new ContentScriptConnectionV2({
    runtime: "client"
  });
  return port.postMessage({
    event: "Client_allSearchChatHubHeartbeat"
  });
};
var createChatHubColumnConfig = (data) => {
  return {
    id: v4_default(),
    ...data
  };
};

// src/features/searchChatHub/hooks/useChatHub.ts
var useChatHubConfigValue = () => {
  return Recoil_index_20(chatHubColumnConfigState);
};
var useChatHubConfigActions = () => {
  const setColumnsConfig = Recoil_index_24(chatHubColumnConfigState);
  const saveToLocalStorage = (data) => {
    import_webextension_polyfill.default.storage.local.set({
      [CHAT_HUB_LAYOUT_STORAGE_KEY]: data
    });
  };
  const autoPushProviders = (prev, cols) => {
    let newArray = [...prev];
    if (newArray.length > cols) {
      newArray = newArray.slice(0, cols);
    } else if (newArray.length < cols) {
      const restProviders = SearchProviderList.filter(
        (provider) => !newArray.map((column) => column.provider).includes(provider)
      );
      const restNum = cols - newArray.length;
      for (let i = 0; i < restNum; i++) {
        newArray = [
          ...newArray,
          createChatHubColumnConfig({
            provider: restProviders[i],
            width: Math.floor(100 / cols)
          })
        ];
      }
    }
    return newArray;
  };
  const changeLayout = (cols) => {
    setColumnsConfig((prev) => {
      if ((prev == null ? void 0 : prev.length) === cols) {
        return prev;
      }
      const newData = autoPushProviders(prev || [], cols);
      const newDataWithWidth = newData.map((column) => ({
        ...column,
        width: Math.floor(100 / cols)
      }));
      saveToLocalStorage(newDataWithWidth);
      return newDataWithWidth;
    });
  };
  const updateWidths = (widths) => {
    setColumnsConfig((prev) => {
      if (!prev) {
        return prev;
      }
      const newData = prev.map((column, index) => {
        var _a;
        return {
          ...column,
          width: ((_a = widths.find((w) => w.id === column.id)) == null ? void 0 : _a.width) || column.width
        };
      });
      saveToLocalStorage(newData);
      return newData;
    });
  };
  const changeProviderById = (id, provider) => {
    setColumnsConfig((prev) => {
      if (!prev) {
        return prev;
      }
      const newData = prev.map((column) => ({
        ...column,
        provider: column.id === id ? provider : column.provider
      }));
      saveToLocalStorage(newData);
      return newData;
    });
  };
  const swapPositionByTwoId = (activeId, overId) => {
    if (!activeId || !overId) {
      return;
    }
    setColumnsConfig((prev) => {
      if (!prev) {
        return prev;
      }
      const newColumnsConfig = [...prev];
      const activeIndex = newColumnsConfig.findIndex((c) => c.id === activeId);
      const overIndex = newColumnsConfig.findIndex((c) => c.id === overId);
      if (!newColumnsConfig[overIndex] || !newColumnsConfig[activeIndex]) {
        return prev;
      }
      [newColumnsConfig[activeIndex], newColumnsConfig[overIndex]] = [
        newColumnsConfig[overIndex],
        newColumnsConfig[activeIndex]
      ];
      saveToLocalStorage(newColumnsConfig);
      return newColumnsConfig;
    });
  };
  const changeOrder = (activeId, positionId) => {
    setColumnsConfig((prev) => {
      if (!prev) {
        return prev;
      }
      const newColumnsConfig = [...prev];
      const activeIndex = newColumnsConfig.findIndex((c) => c.id === activeId);
      const positionIndex = newColumnsConfig.findIndex(
        (c) => c.id === positionId
      );
      if (activeIndex === -1 || positionIndex === -1 || activeIndex === positionIndex) {
        return prev;
      }
      const [activeItem] = newColumnsConfig.splice(activeIndex, 1);
      newColumnsConfig.splice(positionIndex, 0, activeItem);
      saveToLocalStorage(newColumnsConfig);
      return newColumnsConfig;
    });
  };
  return {
    changeLayout,
    updateWidths,
    changeProviderById,
    swapPositionByTwoId,
    changeOrder
  };
};
var useInitChatHubConfigState = () => {
  const setColumnsConfig = Recoil_index_24(chatHubColumnConfigState);
  const init = async () => {
    let data = defaultChatHubColumnConfig();
    try {
      const localColumnsConfig = (await import_webextension_polyfill.default.storage.local.get(CHAT_HUB_LAYOUT_STORAGE_KEY))[CHAT_HUB_LAYOUT_STORAGE_KEY];
      if (localColumnsConfig) {
        data = localColumnsConfig;
      }
    } catch (error) {
    }
    setColumnsConfig(data);
  };
  (0, import_react6.useLayoutEffect)(() => {
    init();
  }, []);
};
var useIframesLoaded = () => {
  return Recoil_index_20(chatHubIframesLoadedState);
};
var useSetIframesLoaded = () => {
  return Recoil_index_24(chatHubIframesLoadedState);
};
var useProviderIframeInfo = () => {
  return Recoil_index_20(chatHubProviderIframeInfoState);
};
var useProviderIframeInfoActions = () => {
  const setProviderIframeInfo = Recoil_index_24(
    chatHubProviderIframeInfoState
  );
  const saveToLocalStorage = (data) => {
    import_webextension_polyfill.default.storage.local.set({
      [CHAT_HUB_PROVIDER_IFRAME_INFO_STORAGE_KEY]: data
    });
  };
  const updateBgColorByProvider = (provider, bgColor) => {
    setProviderIframeInfo((prev) => {
      const newData = {
        ...prev,
        [provider]: { bgColor }
      };
      saveToLocalStorage(newData);
      return newData;
    });
  };
  return {
    setProviderIframeInfo,
    updateBgColorByProvider
  };
};
var useInitProviderIframeInfo = () => {
  const setProviderIframeInfo = Recoil_index_24(
    chatHubProviderIframeInfoState
  );
  const init = async () => {
    let data = {};
    try {
      const localData = (await import_webextension_polyfill.default.storage.local.get(
        CHAT_HUB_PROVIDER_IFRAME_INFO_STORAGE_KEY
      ))[CHAT_HUB_PROVIDER_IFRAME_INFO_STORAGE_KEY];
      if (localData) {
        data = localData;
      }
    } catch (error) {
    }
    setProviderIframeInfo(data);
  };
  (0, import_react6.useLayoutEffect)(() => {
    init();
  }, []);
};
var useResetChatHubState = () => {
  return Recoil_index_20(chatHubResetState);
};
var useSetResetChatHub = () => {
  const setResetState = Recoil_index_24(chatHubResetState);
  const reset = () => {
    setResetState(true);
  };
  return {
    reset,
    setResetState
  };
};
var useListenResetChatHubState = () => {
  const resetState = useResetChatHubState();
  const { setResetState } = useSetResetChatHub();
  (0, import_react6.useEffect)(() => {
    if (resetState) {
      setResetState(false);
    }
  }, [resetState]);
};

// src/features/searchChatHub/components/ChatHubLayoutButtonGroup.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var ChatHubLayoutButtonGroup = () => {
  const { t } = useTranslation(["client"]);
  const { changeLayout } = useChatHubConfigActions();
  const columnsConfig = useChatHubConfigValue();
  const isActive = (cols) => cols === (columnsConfig == null ? void 0 : columnsConfig.length);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Stack_default, { sx: {
    flexDirection: "row",
    gap: "2px",
    padding: "3px",
    height: "44px",
    borderRadius: "22px",
    backgroundColor: "rgba(59, 61, 62, 1)"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ChatHubLayoutButton_default,
      {
        icon: "ChatHubTwoLayoutIcon",
        tooltipTitle: t("client:chatHub__footer_toolbar__btn_layout_2"),
        onClick: () => changeLayout(2),
        isActive: isActive(2)
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ChatHubLayoutButton_default,
      {
        icon: "ChatHubThreeLayoutIcon",
        tooltipTitle: t("client:chatHub__footer_toolbar__btn_layout_3"),
        onClick: () => changeLayout(3),
        isActive: isActive(3)
      }
    )
  ] });
};
var ChatHubLayoutButtonGroup_default = ChatHubLayoutButtonGroup;

// src/features/searchChatHub/components/ChatHubChatInput.tsx
var import_react8 = __toESM(require_react());

// src/contentScripts/proxySearch/proxySearchController.ts
var ProxySearchController = class {
  constructor() {
    __publicField(this, "iframeMap", {});
    __publicField(this, "iframeInjectDoneTimer", {});
    const messageHandler = (event) => {
      if (event.data.type === "proxy_search_iframe_pong" /* proxy_search_iframe_pong */) {
        const id = event.data.data.id;
        this.iframeInjectDoneTimer[id] && clearTimeout(this.iframeInjectDoneTimer[id]);
      }
    };
    window.addEventListener("message", messageHandler);
  }
  sendMessageToProvider(id, message) {
    var _a;
    const iframe = this.iframeMap[id];
    if (iframe) {
      (_a = iframe.contentWindow) == null ? void 0 : _a.postMessage(
        {
          eventId: WEBCHATGPT_PROXY_SEARCH_EVENT,
          ...message
        },
        "*"
      );
    }
  }
  // 绑定 iframe
  async bindIframe(id, iframe) {
    this.iframeMap[id] = iframe;
    if (!id || !iframe) {
      return;
    }
    this.iframeInjectDoneTimer[id] && clearTimeout(this.iframeInjectDoneTimer[id]);
    this.iframeInjectDoneTimer[id] = setInterval(() => {
      var _a;
      (_a = iframe.contentWindow) == null ? void 0 : _a.postMessage(
        {
          eventId: WEBCHATGPT_PROXY_SEARCH_EVENT,
          type: "ping" /* ping */,
          data: { id }
        },
        "*"
      );
    }, 200);
  }
  // 搜索单个
  search(id, query) {
    this.sendMessageToProvider(id, {
      type: "search" /* search */,
      query
    });
  }
  // 搜索所有
  searchAll(query) {
    Object.keys(this.iframeMap).forEach((id) => {
      this.search(id, query);
    });
  }
  // 重置单个
  reset(id) {
    this.sendMessageToProvider(id, {
      type: "reset" /* reset */,
      query: ""
    });
  }
  // 重置所有
  resetAll() {
    Object.keys(this.iframeMap).forEach((id) => {
      this.reset(id);
    });
  }
  // 刷新主题信息 单个
  updateThemeInfo(id) {
    this.sendMessageToProvider(id, {
      type: "update_theme_info" /* update_theme_info */,
      query: ""
    });
  }
  // 刷新主题信息 所有
  updateThemeInfoAll() {
    Object.keys(this.iframeMap).forEach((id) => {
      this.updateThemeInfo(id);
    });
  }
};
var proxySearchController = new ProxySearchController();
var proxySearchController_default = proxySearchController;

// src/features/searchChatHub/components/ChatHubSendButton.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var ChatHubSendButton = (props) => {
  const { disabled, onClick } = props;
  const { t } = useTranslation();
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    TextOnlyTooltip_default,
    {
      placement: "top",
      title: disabled ? t("client:chatHub__footer_toolbar__chat_input__text_is_empty") : "",
      children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        IconButton_default,
        {
          disabled,
          type: "button",
          sx: {
            width: "32px",
            height: "32px",
            backgroundColor: "rgba(252, 252, 252, 1)",
            "&:hover": {
              backgroundColor: "rgb(191,191,191)"
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(103, 103, 103, 1)"
            }
          },
          "aria-label": "send",
          onClick,
          children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CustomIcon_default, { icon: "ArrowRight", sx: {
            fontSize: "14px",
            color: "rgba(47, 47, 47, 1)"
          } })
        }
      )
    }
  );
};
var ChatHubSendButton_default = ChatHubSendButton;

// src/features/searchChatHub/hooks/proxySearchReceiveMessage.ts
var import_react7 = __toESM(require_react());
var useProxySearchReceiveMessage = (listener) => {
  window.addEventListener("message", listener);
  const stop = () => {
    window.removeEventListener("message", listener);
  };
  return {
    stop
  };
};
var useListenProxySearchIframeLoadedMessage = (callback) => {
  const setIframesLoaded = useSetIframesLoaded();
  const { updateBgColorByProvider } = useProviderIframeInfoActions();
  (0, import_react7.useEffect)(() => {
    const listener = (event) => {
      const { type, data } = event.data;
      switch (type) {
        case "proxy_search_iframe_loaded" /* proxy_search_iframe_loaded */: {
          setIframesLoaded((prev) => ({
            ...prev,
            [data.id]: true
          }));
          data.bgColor && updateBgColorByProvider(data.provider, data.bgColor);
          callback(data);
          break;
        }
        case "proxy_search_iframe_theme_info_updated" /* proxy_search_iframe_theme_info_updated */: {
          data.bgColor && updateBgColorByProvider(data.provider, data.bgColor);
          callback(data);
          break;
        }
        default: {
          break;
        }
      }
    };
    const { stop } = useProxySearchReceiveMessage(listener);
    return () => {
      stop();
    };
  }, []);
};
var useListenProxySearchIframeFocusMessage = (callback) => {
  (0, import_react7.useEffect)(() => {
    const listener = (event) => {
      const { type } = event.data;
      switch (type) {
        case "proxy_search_iframe_focus" /* proxy_search_iframe_focus */: {
          callback();
          break;
        }
      }
    };
    const { stop } = useProxySearchReceiveMessage(listener);
    return () => {
      stop();
    };
  }, []);
};

// src/features/searchChatHub/components/ChatHubChatInput.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var ChatHubChatInput = () => {
  const { t } = useTranslation(["client"]);
  const searchTextRef = (0, import_react8.useRef)("");
  const [searchText, setSearchText] = (0, import_react8.useState)(searchTextRef.current);
  const inputRef = (0, import_react8.useRef)(null);
  const isComposingRef = (0, import_react8.useRef)(false);
  const updateSearchText = (value) => {
    searchTextRef.current = value;
    setSearchText(value);
  };
  const needFocusOnce = (0, import_react8.useRef)(false);
  const needFocusOnceTimer = (0, import_react8.useRef)(null);
  const startFocusOnce = () => {
    needFocusOnce.current = true;
    focusInput();
    needFocusOnceTimer.current && clearTimeout(needFocusOnceTimer.current);
    needFocusOnceTimer.current = setTimeout(() => {
      needFocusOnce.current = false;
    }, 1500);
  };
  (0, import_react8.useEffect)(() => {
    searchTextRef.current = searchText;
  }, [searchText]);
  const focusInput = debounce_default(() => {
    var _a;
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  }, 300);
  (0, import_react8.useEffect)(() => {
    return () => {
      focusInput.cancel();
    };
  }, []);
  useListenProxySearchIframeFocusMessage(() => {
    if (needFocusOnce.current) {
      focusInput();
    }
  });
  (0, import_react8.useEffect)(() => {
    setTimeout(() => {
      startFocusOnce();
    }, 1500);
  }, []);
  const handleSendAll = () => {
    if (!searchTextRef.current) {
      return;
    }
    proxySearchController_default.searchAll(searchTextRef.current);
    updateSearchText("");
    startFocusOnce();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(Paper_default, { sx: {
    p: "6px 6px",
    display: "flex",
    alignItems: "flex-end",
    maxWidth: "582px",
    width: "100%",
    minHeight: "44px",
    maxHeight: "120px",
    borderRadius: "22px",
    overflow: "hidden",
    backgroundColor: "rgba(59, 61, 62, 1)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxSizing: "border-box",
    "&:focus-within": {
      borderWidth: "2px",
      padding: "5px 5px"
    }
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      InputBase_default,
      {
        inputRef,
        sx: {
          maxHeight: "120px",
          padding: "4px 12px",
          color: "#fff",
          "& > .MuiInputBase-input": {
            overflowY: "auto!important",
            maxHeight: "100px",
            "&::-webkit-scrollbar": {
              width: "8px"
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent"
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "4px"
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(255, 255, 255, 0.3)"
            }
          }
        },
        multiline: true,
        fullWidth: true,
        placeholder: t("client:chatHub__footer_toolbar__chat_input_placeholder"),
        value: searchText,
        onChange: (e) => updateSearchText(e.target.value),
        onCompositionStart: () => isComposingRef.current = true,
        onCompositionEnd: () => isComposingRef.current = false,
        onKeyDownCapture: (event) => {
          if (event.key === "Enter" && !event.shiftKey && !isComposingRef.current) {
            event.preventDefault();
            handleSendAll();
          }
        },
        onFocus: () => void 0,
        onBlur: () => void 0
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ChatHubSendButton_default, { onClick: handleSendAll, disabled: !searchText })
  ] });
};
var ChatHubChatInput_default = ChatHubChatInput;

// src/features/searchChatHub/components/ChatHubResetButton.tsx
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var ChatHubResetButton = () => {
  const { t } = useTranslation(["client"]);
  const { reset } = useSetResetChatHub();
  const handleReset = () => {
    reset();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(TextOnlyTooltip_default, { title: t("client:chatHub__footer_toolbar__btn_reset"), children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    IconButton_default,
    {
      type: "button",
      sx: {
        width: "44px",
        height: "44px",
        backgroundColor: "rgba(59, 61, 62, 1)"
      },
      "aria-label": "reset",
      onClick: handleReset,
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(CustomIcon_default, { icon: "Restart", sx: { fontSize: "22px", color: "rgba(255, 255, 255, 0.7)" } })
    }
  ) });
};
var ChatHubResetButton_default = ChatHubResetButton;

// src/features/searchChatHub/components/ChatHubFooterToolbar.tsx
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var ChatHubFooterToolbar = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    Stack_default,
    {
      "data-testid": "chat_hub__footer_toolbar",
      sx: {
        padding: "12px 0",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: "24px"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ChatHubLayoutButtonGroup_default, {}),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ChatHubResetButton_default, {}),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ChatHubChatInput_default, {})
      ]
    }
  );
};
var ChatHubFooterToolbar_default = ChatHubFooterToolbar;

// src/features/searchChatHub/components/SearchProviderSelector.tsx
var import_react9 = __toESM(require_react());
var import_ExpandMoreOutlined = __toESM(require_ExpandMoreOutlined());
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var SearchProviderSelector = (props) => {
  const { dataTestId, defaultProvider, onChange, bgColorIsLight } = props;
  const { t } = useTranslation(["client"]);
  const [showTooltip, setShowTooltip] = (0, import_react9.useState)(false);
  const [isSelectOpen, setIsSelectOpen] = (0, import_react9.useState)(false);
  const handleMouseEnter = () => {
    if (!isSelectOpen) {
      setShowTooltip(true);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    TextOnlyTooltip_default,
    {
      title: t("client:chatHub__search_provider_selector__title"),
      open: showTooltip,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: () => setShowTooltip(false),
      children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        Select_default,
        {
          "data-testid": dataTestId,
          value: defaultProvider,
          onOpen: () => {
            setShowTooltip(false);
            setIsSelectOpen(true);
          },
          onMouseDown: (e) => {
            e.stopPropagation();
          },
          onClose: () => setIsSelectOpen(false),
          IconComponent: (props2) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_ExpandMoreOutlined.default, { ...props2, sx: {
            fontSize: "16px",
            color: bgColorIsLight ? "rgba(0, 0, 0, 0.45)!important" : "rgba(255, 255, 255, 0.45)!important"
          } }),
          MenuProps: {
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left"
            }
          },
          sx: {
            padding: "2px 4px",
            height: "24px",
            fontSize: "14px",
            lineHeight: "20px",
            borderRadius: "8px",
            color: bgColorIsLight ? "rgba(0, 0, 0, 0.87)" : "rgba(255, 255, 255, 0.87)",
            "--bg-color": bgColorIsLight ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.06)",
            // 默认无背景，hover 或 open 后才有
            backgroundColor: isSelectOpen ? "var(--bg-color)" : "transparent",
            "&:hover": {
              backgroundColor: "var(--bg-color)"
            },
            border: "none",
            alignItems: "center",
            cursor: "pointer",
            // 选择框内容
            "& > .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              gap: "2px",
              padding: "0",
              paddingRight: "24px!important"
            },
            // 无边框
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none"
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none"
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none"
            },
            // 展开的菜单背景
            "& .MuiPaper-root": {
              paddingTop: "2px",
              // 留点间隙
              backgroundColor: "transparent",
              backgroundImage: "none"
            },
            // 菜单列表样式
            "& .MuiMenu-list": {
              backgroundColor: "rgba(44, 44, 44, 1)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
              padding: "4px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              "& .web_chat_gpt__search_hub__chatgpt_svg": {
                fill: "#fff"
                // 菜单下的 chatgpt_svg 一直是白色
              }
            }
          },
          onChange: (e) => {
            onChange(e.target.value);
          },
          children: SearchProviderList.map((option) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(MenuItem_default, { value: option, sx: {
            gap: "2px",
            height: "32px",
            borderRadius: "4px",
            padding: "6px 4px",
            color: "#fff",
            "--hover-bg-color": bgColorIsLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)",
            "&:hover": {
              backgroundColor: "var(--hover-bg-color)"
            },
            "&.Mui-selected": {
              backgroundColor: "var(--hover-bg-color)",
              "&:hover": {
                backgroundColor: "var(--hover-bg-color)"
              }
            }
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SearchProviderIcon_default, { icon: option, bgColorIsLight }),
            SearchProviderMap[option].name
          ] }, option))
        }
      )
    }
  );
};
var SearchProviderSelector_default = SearchProviderSelector;

// src/features/searchChatHub/components/ChatWindowFullScreenButton.tsx
var import_react10 = __toESM(require_react());
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var ChatWindowFullScreenButton = (props) => {
  const { tooltipTitle, onClick, icon, bgColorIsLight } = props;
  const [open, setOpen] = (0, import_react10.useState)(false);
  const handleClick = (event) => {
    setOpen(false);
    onClick(event);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    TextOnlyTooltip_default,
    {
      title: tooltipTitle,
      open,
      onClose: () => setOpen(false),
      onOpen: () => setOpen(true),
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        IconButton_default,
        {
          sx: {
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          onMouseDown: (e) => {
            e.stopPropagation();
          },
          onClick: handleClick,
          children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            CustomIcon_default,
            {
              icon,
              sx: {
                color: bgColorIsLight ? "rgba(0, 0, 0, 0.54)" : "rgba(255, 255, 255, 0.54)",
                fontSize: 14
              }
            }
          )
        }
      )
    }
  );
};
var ChatWindowFullScreenButton_default = ChatWindowFullScreenButton;

// src/features/searchChatHub/components/ChatWindowHeader.tsx
var import_react11 = __toESM(require_react());
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var ChatWindowHeader = (props) => {
  const { columnConfig, defaultProvider, isFullScreen, onFullScreen } = props;
  const { t } = useTranslation(["client"]);
  const { isDragging, attributes, listeners, setActivatorNodeRef, setDisableSortable } = (0, import_react11.useContext)(SortableItemContext);
  const providerIframeInfo = useProviderIframeInfo();
  const { changeProviderById } = useChatHubConfigActions();
  const bgColor = (0, import_react11.useMemo)(() => {
    var _a;
    return ((_a = providerIframeInfo[columnConfig.provider]) == null ? void 0 : _a.bgColor) || "rgba(33, 33, 33, 1)";
  }, [providerIframeInfo, columnConfig.provider]);
  const bgColorIsLight = (0, import_react11.useMemo)(() => {
    return isLightColor(bgColor);
  }, [bgColor]);
  const fullScreenIcon = isFullScreen ? "FullScreenExit" : "FullScreen";
  const fullScreenTooltipTitle = isFullScreen ? t("client:chatHub__window__header__btn_exit_full_screen") : t("client:chatHub__window__header__btn_full_screen");
  const handleFullScreen = () => {
    onFullScreen();
  };
  const onChangeProvider = (provider) => {
    changeProviderById(columnConfig.id, provider);
  };
  (0, import_react11.useEffect)(() => {
    setDisableSortable(isFullScreen);
  }, [isFullScreen]);
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    Stack_default,
    {
      "data-testid": "chat_hub__chat_box_header",
      sx: {
        flexDirection: "row",
        alignItems: "center",
        padding: "4px 12px",
        backgroundColor: bgColor,
        ...!isFullScreen ? { cursor: isDragging ? "grabbing" : "grab" } : {}
      },
      ...attributes,
      ...listeners,
      ref: setActivatorNodeRef,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          Stack_default,
          {
            sx: {
              flex: 1,
              flexDirection: "row",
              justifyContent: "center"
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              SearchProviderSelector_default,
              {
                dataTestId: "chat_hub__chat_box_header__search_provider_selector",
                defaultProvider,
                onChange: onChangeProvider,
                bgColorIsLight
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          Stack_default,
          {
            sx: {
              flexDirection: "row",
              alignItems: "center"
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              ChatWindowFullScreenButton_default,
              {
                tooltipTitle: fullScreenTooltipTitle,
                icon: fullScreenIcon,
                onClick: handleFullScreen,
                bgColorIsLight
              }
            )
          }
        )
      ]
    }
  );
};
var ChatWindowHeader_default = ChatWindowHeader;

// src/features/searchChatHub/components/ChatWindow.tsx
var import_react12 = __toESM(require_react());
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
var ChatWindow = (props) => {
  var _a;
  const { columnConfig, hideHeader = false } = props;
  const providerInfo = SearchProviderMap[columnConfig.provider];
  const [currentIsFocused, setCurrentIsFocused] = (0, import_react12.useState)(false);
  const providerIframeInfo = useProviderIframeInfo();
  const [fullScreen, setFullScreen] = (0, import_react12.useState)(false);
  const iframeRef = (0, import_react12.useRef)(null);
  const resetState = useResetChatHubState();
  const bindIframeRef = (ref) => {
    proxySearchController_default.bindIframe(columnConfig.id, ref);
  };
  (0, import_react12.useEffect)(() => {
    if (iframeRef.current) {
      iframeRef.current.addEventListener("load", function() {
      });
    }
  }, []);
  const handleFullScreen = () => {
    setFullScreen(!fullScreen);
  };
  const [resetBgColor, setResetBgColor] = (0, import_react12.useState)(null);
  const focusStyle = currentIsFocused ? {
    boxShadow: "0px 0px 1px 0px rgba(255, 255, 255, 0.4), 0px 1px 12px 0px rgba(255, 255, 255, 0.12)"
  } : {};
  const iframeElement = (0, import_react12.useMemo)(() => {
    var _a2;
    return !resetState && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      "iframe",
      {
        ref: (ref) => bindIframeRef(ref),
        src: providerInfo.url,
        style: {
          border: 0,
          flex: 1,
          backgroundColor: resetBgColor || ((_a2 = providerIframeInfo[columnConfig.provider]) == null ? void 0 : _a2.bgColor) || "#fff"
        }
      }
    );
  }, [resetState, providerInfo.url, (_a = providerIframeInfo[columnConfig.provider]) == null ? void 0 : _a.bgColor, resetBgColor]);
  (0, import_react12.useEffect)(() => {
    const timer = setTimeout(() => {
      setResetBgColor("#fff");
    }, 5e3);
    return () => {
      timer && clearTimeout(timer);
    };
  }, []);
  return (
    // wrapper
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      Stack_default,
      {
        "data-testid": "chat_hub__chat_box",
        sx: {
          height: "100%",
          overflow: "hidden",
          ...fullScreen ? {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1
          } : {
            borderRadius: "12px",
            ...focusStyle
            // 没有全屏时，focusStyle 挂载 wrapper 上
          }
        },
        onMouseEnter: () => setCurrentIsFocused(true),
        onMouseLeave: () => setCurrentIsFocused(false),
        onClick: (e) => {
          if (e.target === e.currentTarget && fullScreen) {
            handleFullScreen();
          }
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
          Stack_default,
          {
            sx: {
              position: "relative",
              height: "100%",
              width: "100%",
              borderRadius: "12px",
              overflow: "hidden",
              ...fullScreen && {
                // 注意这里的居中使用 margin 来实现，如果用 translate(-50%, -50%) 会导致全屏时 ProviderSelector 的菜单偏移
                height: "90%",
                width: "90%",
                margin: "auto",
                // 阴影
                ...focusStyle
              }
            },
            onClick: (e) => {
              e.stopPropagation();
            },
            children: [
              !hideHeader && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                ChatWindowHeader_default,
                {
                  columnConfig,
                  defaultProvider: providerInfo.providerKey,
                  isFullScreen: fullScreen,
                  onFullScreen: handleFullScreen
                }
              ),
              iframeElement
            ]
          }
        )
      },
      columnConfig.id
    )
  );
};
var ChatWindow_default = ChatWindow;

// src/features/searchChatHub/hooks/useChatHubSideNav.ts
var import_webextension_polyfill2 = __toESM(require_browser_polyfill());
var import_react13 = __toESM(require_react());
var useChatHubSideNavConfigState = () => {
  return Recoil_index_20(chatHubSideNavConfigState);
};
var useChatHubSideNavExpandAction = () => {
  const saveToLocalStorage = (data) => {
    import_webextension_polyfill2.default.storage.local.set({
      [CHAT_HUB_SIDE_NAV_CONFIG_STORAGE_KEY]: data
    });
  };
  const setSideNavConfig = Recoil_index_24(chatHubSideNavConfigState);
  const updateSideNavConfig = (data) => {
    setSideNavConfig((prev) => {
      var _a;
      const newState = {
        ...prev,
        ...data,
        isExpand: (_a = data.isExpand) != null ? _a : prev == null ? void 0 : prev.isExpand
      };
      saveToLocalStorage(newState);
      return newState;
    });
  };
  const toggleSideNavExpandState = () => {
    setSideNavConfig((prev) => {
      const newState = {
        ...prev,
        isExpand: !(prev == null ? void 0 : prev.isExpand)
      };
      saveToLocalStorage(newState);
      return newState;
    });
  };
  return { updateSideNavConfig, toggleSideNavExpandState };
};
var useInitChatHubSideNavExpandState = () => {
  const setSideNavConfig = Recoil_index_24(chatHubSideNavConfigState);
  const init = async () => {
    let data = defaultChatHubSideNavConfig();
    try {
      const expandState = (await import_webextension_polyfill2.default.storage.local.get(CHAT_HUB_SIDE_NAV_CONFIG_STORAGE_KEY))[CHAT_HUB_SIDE_NAV_CONFIG_STORAGE_KEY];
      if (expandState) {
        data = expandState;
      }
    } catch (error) {
    }
    setSideNavConfig(data);
  };
  (0, import_react13.useLayoutEffect)(() => {
    init();
  }, []);
};
var useChatHubSideNavActiveMenuState = () => {
  return Recoil_index_20(chatHubSideNavActiveMenuState);
};
var useChatHubSideNavActiveMenuAction = () => {
  const setActiveMenu = Recoil_index_24(chatHubSideNavActiveMenuState);
  return { setActiveMenu };
};
var useInitChatHubSideNavActiveMenu = () => {
  const { setActiveMenu } = useChatHubSideNavActiveMenuAction();
  (0, import_react13.useLayoutEffect)(() => {
    const url = new URL(window.location.href);
    const menu = url.searchParams.get("menu");
    const activeMenu = Object.keys(MenuQueryMap).find(
      (key) => MenuQueryMap[key] === menu
    );
    activeMenu && setActiveMenu(activeMenu);
  }, []);
};

// src/features/searchChatHub/components/ChatHubSideNav/ChatHubSideNavHeader.tsx
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
var ChatHubSideNavHeader = () => {
  const { t } = useTranslation("client");
  const { isExpand } = useChatHubSideNavConfigState() || {};
  const { toggleSideNavExpandState } = useChatHubSideNavExpandAction();
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(Box_default, { sx: {
    marginTop: "12px",
    position: "relative",
    "--base-height": "32px",
    color: "#fff",
    height: "var(--base-height)",
    transition: "all var(--nav-expand-transition-duration) ease-in-out",
    ...!isExpand ? {
      height: "92px"
    } : {}
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(Stack_default, { sx: {
      width: "100%",
      // border: '1px solid red',
      flexDirection: "row",
      // justifyContent: 'center',
      position: "absolute",
      left: "0",
      bottom: "0",
      height: "var(--base-height)",
      alignItems: "center",
      alignSelf: "flex-end",
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        Box_default,
        {
          component: "img",
          src: icon48_default,
          alt: "logo",
          sx: {
            width: "26px",
            height: "26px",
            transition: "all var(--nav-expand-transition-duration) ease-in-out",
            ...!isExpand ? {
              transform: "translateX(7.5px)",
              width: "28px",
              height: "28px"
            } : {}
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Box_default, { sx: {
        width: "100%",
        overflow: "hidden",
        transition: "all var(--nav-expand-transition-duration) ease-in-out",
        ...!isExpand ? {
          width: "0px",
          opacity: "0"
        } : {}
      }, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        Typography_default,
        {
          sx: {
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "27px",
            paddingLeft: "6px"
          },
          children: "WebChatGPT"
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Stack_default, { sx: {
      // border: '1px solid green',
      position: "absolute",
      right: "0",
      top: "0",
      height: "var(--base-height)",
      flexDirection: "row",
      justifyContent: "center",
      alignSelf: "flex-start",
      // border: '1px solid red',
      width: "32px",
      transition: "all var(--nav-expand-transition-duration) ease-in-out",
      ...!isExpand ? {
        width: "100%"
      } : {}
    }, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      TextOnlyTooltip_default,
      {
        placement: "right",
        title: isExpand ? t("client:chatHub__side_nav__header__btn_close_toolbar__tooltip") : t("client:chatHub__side_nav__header__btn_open_toolbar__tooltip"),
        PopperProps: {
          container: document.body
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          IconButton_default,
          {
            sx: {
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)"
              }
            },
            onClick: toggleSideNavExpandState,
            children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              CustomIcon_default,
              {
                icon: "Expand",
                sx: {
                  width: "14px",
                  height: "12px",
                  color: "rgba(255, 255, 255, 0.6)",
                  transition: "transform var(--nav-expand-transition-duration) step-end",
                  ...!isExpand ? {
                    transform: "rotate(180deg)"
                  } : {}
                }
              }
            )
          }
        )
      }
    ) })
  ] });
};
var ChatHubSideNavHeader_default = ChatHubSideNavHeader;

// src/features/searchChatHub/components/ChatHubSideNav/ChatHubSideNavMenu/ChatHubSideNavMenuGroup.tsx
var import_react14 = __toESM(require_react());

// src/features/searchChatHub/components/ChatHubSideNav/ChatHubSideNavMenu/ChatHubSideNavMenuGroupTitleItem.tsx
var import_ExpandMoreOutlined2 = __toESM(require_ExpandMoreOutlined());
var import_jsx_runtime14 = __toESM(require_jsx_runtime());
var ChatHubSideNavMenuGroupTitleItem = ({ title, open, onClick }) => {
  const { isExpand } = useChatHubSideNavConfigState() || {};
  const { t } = useTranslation("client");
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    Stack_default,
    {
      sx: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Typography_default, { sx: {
          flex: "1",
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition: "all var(--nav-expand-transition-duration) ease-in-out",
          // transition: 'all 0.1s ease-in-out',
          ...!isExpand ? {
            width: "0px",
            opacity: "0"
          } : {}
        }, children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          Stack_default,
          {
            sx: {
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "24px",
              transition: "all var(--nav-expand-transition-duration) ease-in-out",
              ...!isExpand ? {
                width: "100%"
              } : {}
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              TextOnlyTooltip_default,
              {
                placement: "right",
                title: open ? t("client:chatHub__side_nav__menu_item_group__hide_more_providers__tooltip") : t("client:chatHub__side_nav__menu_item_group__show_more_providers__tooltip"),
                PopperProps: {
                  container: document.body
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  IconButton_default,
                  {
                    sx: {
                      width: "24px",
                      height: "24px",
                      borderRadius: "6px",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.06)"
                      }
                    },
                    onClick,
                    children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_ExpandMoreOutlined2.default, { sx: {
                      fontSize: "24px",
                      color: "rgba(255, 255, 255, 0.45)!important",
                      transition: "all 0.15s ease-in-out",
                      ...open ? {
                        transform: "rotate(180deg)"
                      } : {}
                    } })
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
};
var ChatHubSideNavMenuGroupTitleItem_default = ChatHubSideNavMenuGroupTitleItem;

// src/features/searchChatHub/components/ChatHubSideNav/ChatHubSideNavMenu/ChatHubSideNavMenuGroup.tsx
var import_jsx_runtime15 = __toESM(require_jsx_runtime());
var ChatHubSideNavMenuGroup = (props) => {
  const { groupTitle, children, sx } = props;
  const [open, setOpen] = (0, import_react14.useState)(true);
  const { isExpand } = useChatHubSideNavConfigState() || {};
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(Stack_default, { sx: {
    marginTop: "32px",
    gap: "4px",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0)",
    // outline: '1px solid red',
    width: "100%",
    transition: "all var(--nav-expand-transition-duration) ease-in-out",
    ...!isExpand ? {
      backgroundColor: "rgba(255, 255, 255, 0.04)",
      width: "44px"
    } : {},
    ...sx
  }, children: [
    groupTitle && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ChatHubSideNavMenuGroupTitleItem_default, { title: groupTitle, open, onClick: () => setOpen(!open) }),
    open && children
  ] });
};
var ChatHubSideNavMenuGroup_default = ChatHubSideNavMenuGroup;

// src/features/searchChatHub/components/ChatHubSideNav/ChatHubSideNavMenu/ChatHubSideNavMenuItem.tsx
var import_jsx_runtime16 = __toESM(require_jsx_runtime());
var ChatHubSideNavMenuItem = (props) => {
  const { icon, title, isActive, sx, onClick } = props;
  const { isExpand } = useChatHubSideNavConfigState() || {};
  const menuButton = /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
    ListItemButton_default,
    {
      sx: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        height: "49px",
        width: "100%",
        padding: "0 12px",
        borderRadius: "12px",
        backgroundColor: "transparent",
        justifyContent: "center",
        transition: "all var(--nav-expand-transition-duration) ease-in-out",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.06)"
        },
        ...isActive ? {
          background: "linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)),linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08))"
        } : {},
        ...!isExpand ? {
          height: "40px",
          width: "40px"
        } : {},
        ...sx
      },
      onClick,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(ListItemIcon_default, { sx: { minWidth: "0px" }, children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(ListItemText_default, { sx: {
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition: "all var(--nav-expand-transition-duration) ease-in-out",
          ...!isExpand ? {
            width: "0px",
            opacity: "0"
          } : {}
        }, children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Typography_default, { sx: {
          paddingLeft: "8px"
        }, children: title }) })
      ]
    }
  );
  return !isExpand ? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    TextOnlyTooltip_default,
    {
      title,
      placement: "right",
      children: menuButton
    }
  ) : menuButton;
};
var ChatHubSideNavMenuItem_default = ChatHubSideNavMenuItem;

// src/features/searchChatHub/components/ChatHubSideNav/ChatHubSideNavMenu/ChatHubSideNavMenu.tsx
var import_jsx_runtime17 = __toESM(require_jsx_runtime());
var ChatHubSideNavMenu = () => {
  const { isExpand } = useChatHubSideNavConfigState() || {};
  const activeMenu = useChatHubSideNavActiveMenuState();
  const { setActiveMenu } = useChatHubSideNavActiveMenuAction();
  const menuClickHandler = (menu) => {
    setActiveMenu(menu);
    const url = new URL(window.location.href);
    if (menu && menu !== "all_in_one") {
      url.searchParams.set("menu", MenuQueryMap[menu]);
    } else {
      url.searchParams.delete("menu");
    }
    url.searchParams.delete("q");
    window.history.replaceState({}, "", url.toString());
  };
  const iconSx = { fontSize: "26px" };
  const { t } = useTranslation("client");
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(Stack_default, { sx: {
    color: "rgba(255, 255, 255, 0.87)"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ChatHubSideNavMenuGroup_default, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      ChatHubSideNavMenuItem_default,
      {
        sx: {
          ...!isExpand ? {
            height: "44px",
            width: "44px"
          } : {}
        },
        isActive: activeMenu === "all_in_one",
        onClick: () => menuClickHandler("all_in_one"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(SearchProviderAllInOneIcon, { sx: iconSx }),
        title: t("client:chatHub__side_nav__menu_item__all_in_one__title")
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      ChatHubSideNavMenuGroup_default,
      {
        sx: {
          padding: "10px 2px",
          ...!isExpand ? {
            marginTop: "4px",
            gap: "6px"
          } : {}
        },
        groupTitle: "Direct",
        children: SearchProviderList.map((item) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          ChatHubSideNavMenuItem_default,
          {
            isActive: activeMenu === item,
            onClick: () => menuClickHandler(item),
            icon: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(SearchProviderIcon_default, { icon: item, sx: iconSx, bgColorIsLight: false }),
            title: SearchProviderMap[item].name
          },
          item
        ))
      }
    )
  ] });
};
var ChatHubSideNavMenu_default = ChatHubSideNavMenu;

// src/features/searchChatHub/components/ChatHubSideNav/ChatHubSideNav.tsx
var import_jsx_runtime18 = __toESM(require_jsx_runtime());
var ChatHubSideNav = () => {
  const { isExpand } = useChatHubSideNavConfigState() || {};
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(Stack_default, { sx: {
    "--nav-expand-transition-duration": ".15s",
    transition: "all var(--nav-expand-transition-duration) ease-in-out",
    minWidth: "240px",
    width: "240px",
    // 先设置一个宽度，否则过渡动画没有效果
    padding: "12px",
    overflow: "hidden",
    backgroundColor: "rgba(44, 44, 44, 1)",
    ...!isExpand ? {
      minWidth: "70px",
      width: "70px"
    } : {}
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(ChatHubSideNavHeader_default, {}),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(ChatHubSideNavMenu_default, {})
  ] });
};
var ChatHubSideNav_default = ChatHubSideNav;

// src/features/searchChatHub/components/ChatHub.tsx
var import_jsx_runtime19 = __toESM(require_jsx_runtime());
var ChatHub = () => {
  useInitChatHubSideNavActiveMenu();
  useInitChatHubConfigState();
  useListenProxySearchIframeLoadedMessage((data) => {
  });
  useInitChatHubSideNavExpandState();
  useInitProviderIframeInfo();
  useListenResetChatHubState();
  const sideNavConfig = useChatHubSideNavConfigState();
  const activeMenu = useChatHubSideNavActiveMenuState();
  const chatHubColumnsConfig = useChatHubConfigValue();
  const { updateWidths, changeOrder, swapPositionByTwoId } = useChatHubConfigActions();
  const [addRulesSuccess, setAddRulesSuccess] = (0, import_react15.useState)(false);
  const containerColumns = (0, import_react15.useMemo)(() => {
    let columnsConfig = [];
    if (activeMenu === "all_in_one") {
      columnsConfig = chatHubColumnsConfig || [];
    } else if (activeMenu) {
      const singleColumnMenu = createChatHubColumnConfig({
        provider: activeMenu,
        width: 100
      });
      columnsConfig = [singleColumnMenu];
    }
    return columnsConfig.map((column, index) => ({
      id: column.id,
      order: index,
      width: column.width || Math.floor(100 / columnsConfig.length),
      children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        ChatWindow_default,
        {
          columnConfig: column,
          hideHeader: activeMenu !== "all_in_one"
        },
        column.id
      )
    }));
  }, [chatHubColumnsConfig, activeMenu]);
  const heartbeat = (0, import_react15.useCallback)(() => {
    emitSearchChatHubHeartbeat().then(() => {
      setTimeout(() => {
        if (!addRulesSuccess) {
          setAddRulesSuccess(true);
        }
      }, 100);
    });
  }, []);
  (0, import_react15.useEffect)(() => {
    heartbeat();
    const interval = setInterval(() => {
      heartbeat();
      return () => {
        clearInterval(interval);
      };
    }, 4e3);
  }, []);
  (0, import_react15.useEffect)(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = (e) => {
      proxySearchController_default.updateThemeInfoAll();
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  const iframesLoaded = useIframesLoaded();
  const sendImmediatelyRef = (0, import_react15.useRef)({});
  const handleSendImmediately = (id, query) => {
    proxySearchController_default.search(id, query);
  };
  (0, import_react15.useEffect)(() => {
    var _a, _b;
    const searchParams = ((_b = (_a = location.search.split("?")[1]) == null ? void 0 : _a.split("&")) == null ? void 0 : _b.reduce((acc, param) => {
      const [key, value] = param.split("=");
      acc[key] = value;
      return acc;
    }, {})) || {};
    const q = searchParams["q"];
    if (q) {
      const query = decodeURIComponent(q);
      Object.entries(iframesLoaded).forEach(([key, loaded]) => {
        const id = key;
        if (loaded && !sendImmediatelyRef.current[id]) {
          sendImmediatelyRef.current[id] = true;
          handleSendImmediately(id, query);
        }
      });
    }
  }, [iframesLoaded]);
  const syncLocalStorageDone = (0, import_react15.useMemo)(() => {
    return !chatHubColumnsConfig || !sideNavConfig;
  }, [chatHubColumnsConfig, sideNavConfig]);
  if (syncLocalStorageDone) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
    Stack_default,
    {
      sx: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--base-bg-color)",
        // 背景颜色定在了 index.html 的 body 上。避免刷新时闪白色
        flexDirection: "row"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(ChatHubSideNav_default, {}),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(Stack_default, { sx: {
          flex: 1,
          height: "100%"
        }, children: !addRulesSuccess ? /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_jsx_runtime19.Fragment, {}) : /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(import_jsx_runtime19.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
            CustomContainer_default,
            {
              columns: containerColumns,
              widthsChanged: updateWidths,
              onOrderSwap: swapPositionByTwoId,
              sx: {
                flex: 1,
                padding: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                borderRadius: "0 0 0 20px",
                borderWidth: "0px 0px 1px 1px",
                borderStyle: "solid",
                borderColor: "rgba(255, 255, 255, 0.06)",
                marginBottom: containerColumns.length > 1 ? "0" : "12px"
              }
            }
          ),
          containerColumns.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(ChatHubFooterToolbar_default, {})
        ] }) })
      ]
    }
  );
};
var ChatHub_default = ChatHub;

// src/pages/chat/index.tsx
var import_jsx_runtime20 = __toESM(require_jsx_runtime());
var rootElement = document.getElementById("chat");
if (rootElement) {
  const root = (0, import_client.createRoot)(rootElement);
  document.title = `Chat | WebChatGPT`;
  root.render(
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_react16.default.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Recoil_index_5, { children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(AppTheme_default, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(OptionPageInit_default, {}),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(CssBaseline_default, {}),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(SnackbarProvider, { maxSnack: 3, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(ChatHub_default, {}) })
    ] }) }) })
  );
}
