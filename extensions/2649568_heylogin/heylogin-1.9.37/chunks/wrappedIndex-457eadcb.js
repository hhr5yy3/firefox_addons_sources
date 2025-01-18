import { K as Ko, r as reactExports, A as deepEqual, a as jsxs, c as classNames, j as jsx, B as Th, C as Fc, i as i18n, d as he, G as AUTOSNATCH_OVERLAY_SHADOW_WIDTH_PX, H as i_, O, J as g, T as Trans, M as Ge, N as at, f as useLingui, P as Ht, Q as Si, U as Formik, V as vh, s as be, S as Sh, W as f, X as a, Y as useCombobox, a0 as getLoginDisplayLabel, a1 as Fragment, h as ho, e as getFrontendServerUrl, I as Ih, R as React, a2 as assertExhaustive, a3 as newUuid, a4 as WebpageOverrideStatus, a5 as $t, a6 as sleep, a7 as yo, a8 as qt, a9 as dn, aa as Ki, ab as sp, ac as Li, ad as Da, ae as ch, af as ja, t as initSentry, v as initUiLocale, b as ReactDOM, w as I18nProvider, E as ExtDebugVisibleContextProvider } from "./ExtDebugVisibleContext-6460380f.js";
import { d as debounce, o as openConnection, s as searchPredicate, u as useUnlock, a as addAchievement, g as getUnprotectedValueForContentLogin, b as useCopyToClipboard, e as getUnprotectedValueForVaultWithContentId, c as copyToClipboardWithClear } from "./useUnlock-23c9a9eb.js";
import { d as debugConsole, t as trackError, b as browser, s as sendMessage, c as messageError, m as makeMessageListener, a as Achievement, V as VaultType, S as SubscriptionError } from "./message-939596d6.js";
import { r as requiredArgs, t as toDate, g as getTimezoneOffsetInMilliseconds, s as subMilliseconds, f as format, u as useAutosnatchSettings, a as addMilliseconds, b as getHost, c as useClientOutdated, C as ClientOutdatedMessage } from "./getHost-60a40713.js";
import { S as SvgHeyloginIcon, u as useCloseOnEscape } from "./useCloseOnEscape-1abcbbd4.js";
import { u as useErrorHandlingCallback } from "./useErrorHandlingCallback-683f360e.js";
function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}
var MILLISECONDS_IN_DAY = 864e5;
function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}
function differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  return dateLeft.getTime() - dateRight.getTime();
}
function formatRelative(dirtyDate, dirtyBaseDate, dirtyOptions) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var baseDate = toDate(dirtyBaseDate);
  var options = dirtyOptions || {};
  var locale = options.locale || Ko;
  if (!locale.localize) {
    throw new RangeError("locale must contain localize property");
  }
  if (!locale.formatLong) {
    throw new RangeError("locale must contain formatLong property");
  }
  if (!locale.formatRelative) {
    throw new RangeError("locale must contain formatRelative property");
  }
  var diff = differenceInCalendarDays(date, baseDate);
  if (isNaN(diff)) {
    throw new RangeError("Invalid time value");
  }
  var token;
  if (diff < -6) {
    token = "other";
  } else if (diff < -1) {
    token = "lastWeek";
  } else if (diff < 0) {
    token = "yesterday";
  } else if (diff < 1) {
    token = "today";
  } else if (diff < 2) {
    token = "tomorrow";
  } else if (diff < 7) {
    token = "nextWeek";
  } else {
    token = "other";
  }
  var utcDate = subMilliseconds(date, getTimezoneOffsetInMilliseconds(date));
  var utcBaseDate = subMilliseconds(baseDate, getTimezoneOffsetInMilliseconds(baseDate));
  var formatStr = locale.formatRelative(token, utcDate, utcBaseDate, options);
  return format(date, formatStr, options);
}
const autosnatchNotificationIframeStateDescriptor = {
  mode: "autosnatchNotification",
  initialState: {
    intrinsicSize: {
      width: 0,
      height: 0
    },
    autosnatchInfo: void 0,
    uiState: void 0
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "setIntrinsicSize":
        return {
          ...state,
          intrinsicSize: action.size
        };
      case "undo":
        return state;
      case "close":
        return state;
      case "moveLogin":
        return state;
      case "setExpanded":
        return {
          ...state,
          uiState: state.uiState ? {
            ...state.uiState,
            expanded: action.expanded
          } : void 0
        };
      case "setMoveSelected":
        return {
          ...state,
          uiState: state.uiState ? {
            ...state.uiState,
            moveSelected: action.moveSelected
          } : void 0
        };
      case "setMoveTargetInternal":
        return {
          ...state,
          uiState: state.uiState ? {
            ...state.uiState,
            moveTargetInternal: action.moveTargetInternal
          } : void 0
        };
    }
  }
};
function useDispatchSetter(dispatch, makeAction) {
  const makeActionRef = reactExports.useRef(makeAction);
  makeActionRef.current = makeAction;
  return reactExports.useCallback((param) => {
    dispatch(makeActionRef.current(param));
  }, [dispatch]);
}
function useIframeState(port, descriptor) {
  const [iframeState, setIframeState] = useStateWithReferentialIdentityPreservation(descriptor.initialState);
  reactExports.useEffect(() => {
    if (!port) {
      return void 0;
    }
    function handleMessage(msg) {
      if (isStateUpdateMessage(msg, descriptor.mode)) {
        const newState = msg.state;
        debugConsole.log("[useIframeState]", descriptor.mode, "StateUpdate", newState);
        setIframeState(newState);
      }
    }
    port.postMessage({
      type: "RequestState",
      iframeMode: descriptor.mode
    });
    port.onMessage.addListener(handleMessage);
  }, [descriptor.mode, port, setIframeState]);
  const actionQueueRef = reactExports.useRef([]);
  const processActionQueueDebounced = reactExports.useMemo(() => debounce(20, (p) => {
    if (!actionQueueRef.current.length) {
      return;
    }
    p.postMessage({
      type: "DispatchStateActions",
      iframeMode: descriptor.mode,
      actions: actionQueueRef.current
    });
    actionQueueRef.current = [];
  }), [descriptor.mode]);
  const dispatch = reactExports.useCallback((...actions) => {
    debugConsole.log("[useIframeState]", descriptor.mode, "dispatch", ...actions);
    setIframeState((oldState) => actions.reduce(descriptor.reducer, oldState));
    actionQueueRef.current.push(...actions);
    if (port) {
      processActionQueueDebounced(port);
    } else {
      debugConsole.warn("[useIframeState]", descriptor.mode, "dispatch", "not scheduling action processing since port is not yet set");
    }
  }, [descriptor.mode, descriptor.reducer, port, processActionQueueDebounced, setIframeState]);
  const oldPortRef = reactExports.useRef(port);
  reactExports.useEffect(() => {
    if (oldPortRef.current === port) {
      return;
    }
    oldPortRef.current = port;
    if (port) {
      processActionQueueDebounced(port);
    }
  }, [port, processActionQueueDebounced]);
  return {
    iframeState,
    dispatch
  };
}
function useStateWithReferentialIdentityPreservation(initialState) {
  const [state, setState] = reactExports.useState(initialState);
  const setStateIfNotDeepEquals = reactExports.useCallback((setStateAction) => {
    setState((oldState) => {
      const newState = typeof setStateAction == "function" ? setStateAction(oldState) : setStateAction;
      if (deepEqual(oldState, newState)) {
        return oldState;
      }
      return newState;
    });
  }, []);
  return [state, setStateIfNotDeepEquals];
}
function isStateUpdateMessage(msg, iframeMode) {
  if (msg.type !== "StateUpdate") {
    return false;
  }
  checkIframeMode(msg, iframeMode);
  return true;
}
function checkIframeMode(msg, iframeMode) {
  if (msg.iframeMode !== iframeMode) {
    throw new Error(`Received incorrect iframe mode message! Expected: ${iframeMode}, got: ${msg.iframeMode}`);
  }
}
function useAutosnatchTargetOverride(targetOverride, setAutosnatchTargetOverride) {
  const autosnatchTargetOptions = useAutosnatchTargetOptions();
  reactExports.useEffect(() => {
    if (!autosnatchTargetOptions) {
      return;
    }
    if (!autosnatchTargetOptions.targetGroups.find((g2) => g2.vaults.find((v) => v.vaultId === targetOverride))) {
      setAutosnatchTargetOverride(void 0);
    }
  }, [autosnatchTargetOptions, targetOverride, setAutosnatchTargetOverride]);
  return {
    autosnatchTargetOverride: targetOverride,
    setAutosnatchTargetOverride,
    autosnatchTargetOptions
  };
}
function useAutosnatchTargetOptions() {
  const [targetOptions, setTargetOptions] = reactExports.useState();
  reactExports.useEffect(() => {
    const updateTargetOptions = async () => {
      const resp = await sendMessage({
        type: "GetAutosnatchTargets"
      });
      setTargetOptions(resp === messageError ? void 0 : resp);
    };
    updateTargetOptions().catch(trackError);
    const messageListener = makeMessageListener({
      DataUpdate: updateTargetOptions
    });
    browser.runtime.onMessage.addListener(messageListener);
    return () => browser.runtime.onMessage.removeListener(messageListener);
  }, []);
  return targetOptions;
}
const Container$2 = "_Container_1oq61_1";
const TargetSelectorWrapper = "_TargetSelectorWrapper_1oq61_8";
const TargetSelector$3 = "_TargetSelector_1oq61_8";
const TargetPlaceholder = "_TargetPlaceholder_1oq61_16";
const SaveTargetButton = "_SaveTargetButton_1oq61_22";
const hidden = "_hidden_1oq61_26";
const styles$e = {
  Container: Container$2,
  TargetSelectorWrapper,
  TargetSelector: TargetSelector$3,
  TargetPlaceholder,
  SaveTargetButton,
  hidden
};
function AutosnatchTargetSelector({
  autosnatchTargetOptions,
  setAutosnatchTarget,
  autosnatchTarget,
  className,
  autosnatchTargetOverride,
  setAutosnatchTargetOverride,
  fixedSize
}) {
  var _a;
  const selectedAccount = reactExports.useMemo(() => autosnatchTargetOptions.targetGroups.find((o) => o.vaults.some((v) => v.vaultId === (autosnatchTargetOverride ?? autosnatchTarget))), [autosnatchTarget, autosnatchTargetOptions, autosnatchTargetOverride]);
  const selectFirstVault = reactExports.useCallback((profileId) => {
    const newAcc = autosnatchTargetOptions.targetGroups.find((acc) => acc.profileId === profileId);
    if (!(newAcc == null ? void 0 : newAcc.vaults.length)) {
      return;
    }
    setAutosnatchTargetOverride(newAcc.vaults[0].vaultId);
  }, [autosnatchTargetOptions, setAutosnatchTargetOverride]);
  if (!shouldShowAutosnatchTargetSelector(autosnatchTargetOptions)) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: classNames(styles$e.Container, className), children: [
    autosnatchTargetOptions.targetGroups.length > 1 ? /* @__PURE__ */ jsx(Th, { className: styles$e.TargetSelector, wrapperClassName: styles$e.TargetSelectorWrapper, value: selectedAccount == null ? void 0 : selectedAccount.profileId, onChange: (e) => selectFirstVault(e.target.value), children: autosnatchTargetOptions.targetGroups.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.profileId, children: opt.accountLabel }, opt.profileId)) }) : /* @__PURE__ */ jsx("span", { className: styles$e.TargetPlaceholder, children: selectedAccount == null ? void 0 : selectedAccount.accountLabel }),
    selectedAccount && (selectedAccount.vaults.length > 1 ? /* @__PURE__ */ jsx(Th, { onChange: (e) => setAutosnatchTargetOverride(e.target.value), value: autosnatchTargetOverride ?? autosnatchTarget, wrapperClassName: styles$e.TargetSelectorWrapper, className: styles$e.TargetSelector, children: selectedAccount == null ? void 0 : selectedAccount.vaults.map((v) => /* @__PURE__ */ jsx("option", { value: v.vaultId, children: v.label }, v.vaultId)) }) : /* @__PURE__ */ jsx("span", { className: styles$e.TargetPlaceholder, children: (_a = selectedAccount.vaults.find((v) => v.vaultId === (autosnatchTargetOverride ?? autosnatchTarget))) == null ? void 0 : _a.label })),
    /* @__PURE__ */ jsx(Fc, { className: classNames(styles$e.SaveTargetButton, {
      [styles$e.hidden]: !autosnatchTargetOverride || autosnatchTargetOverride === autosnatchTarget
    }), visible: fixedSize || !!autosnatchTargetOverride && autosnatchTargetOverride !== autosnatchTarget, onClick: () => {
      if (autosnatchTargetOverride) {
        setAutosnatchTarget(autosnatchTargetOverride);
      }
    }, label: i18n._(
      /*i18n*/
      {
        id: "SeI3Z8"
      }
    ), successLabel: i18n._(
      /*i18n*/
      {
        id: "idD8Ev"
      }
    ) })
  ] });
}
function shouldShowAutosnatchTargetSelector(options) {
  if (options.hasDisabledProfiles) {
    return true;
  }
  if (options.targetGroups.length === 0) {
    return false;
  }
  if (options.targetGroups.length === 1 && options.targetGroups[0].vaults.length < 2) {
    return false;
  }
  return true;
}
const Wrapper = "_Wrapper_hk9lq_1";
const Overlay = "_Overlay_hk9lq_7";
const undone = "_undone_hk9lq_20";
const Header$1 = "_Header_hk9lq_24";
const Logo = "_Logo_hk9lq_35";
const CloseButton = "_CloseButton_hk9lq_40 _UnstyledButton_qo5hw_20";
const expanded = "_expanded_hk9lq_60";
const LoginInfo$1 = "_LoginInfo_hk9lq_77";
const Line = "_Line_hk9lq_89";
const NoUsernameIcon = "_NoUsernameIcon_hk9lq_94";
const InLabel = "_InLabel_hk9lq_100";
const MoreOptionsButton = "_MoreOptionsButton_hk9lq_104 _UnstyledButton_qo5hw_20";
const Actions = "_Actions_hk9lq_109";
const list = "_list_hk9lq_113";
const Action = "_Action_hk9lq_109";
const TargetSelectorGroup$2 = "_TargetSelectorGroup_hk9lq_128";
const ToLabel$2 = "_ToLabel_hk9lq_134";
const TargetSelector$2 = "_TargetSelector_hk9lq_128";
const MoveButtonGroup = "_MoveButtonGroup_hk9lq_145";
const styles$d = {
  Wrapper,
  Overlay,
  undone,
  Header: Header$1,
  Logo,
  CloseButton,
  expanded,
  LoginInfo: LoginInfo$1,
  Line,
  NoUsernameIcon,
  InLabel,
  MoreOptionsButton,
  Actions,
  list,
  Action,
  TargetSelectorGroup: TargetSelectorGroup$2,
  ToLabel: ToLabel$2,
  TargetSelector: TargetSelector$2,
  MoveButtonGroup
};
const SvgCross = (props) => /* @__PURE__ */ reactExports.createElement("svg", { width: 6.962, height: 6.962, viewBox: "0 0 6.962 6.962", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ reactExports.createElement("path", { d: "m.354.354 6.255 6.255m0-6.255L.354 6.609M.707 0 0 .707 2.773 3.48 0 6.256l.707.707L3.48 4.187l2.776 2.776.707-.707L4.187 3.48 6.963.707 6.256 0 3.48 2.773z" }));
function AutosnatchNotificationOverlay({
  login,
  useFullVaultLabel,
  state,
  expanded: expanded2,
  setExpanded,
  autosnatchTargetOptions,
  moveTargetInternal,
  setMoveTargetInternal,
  moveSelected,
  setMoveSelected,
  undo,
  close,
  setIntrinsicSize,
  onClick,
  onMouseEnter,
  onMouseLeave,
  moveLogin,
  autosnatchTarget,
  setAutosnatchTarget
}) {
  const ref = reactExports.useRef(null);
  const [setSizeElement, size] = he();
  reactExports.useEffect(() => {
    setIntrinsicSize(size);
  }, [size, setIntrinsicSize]);
  const multiplexedRef = reactExports.useCallback((el) => {
    setSizeElement(el);
    ref.current = el;
  }, [setSizeElement]);
  const headline = reactExports.useMemo(() => {
    switch (state) {
      case "snatched":
        return i18n._(
          /*i18n*/
          {
            id: "J9IEfH"
          }
        );
      case "snatchUndone":
        return i18n._(
          /*i18n*/
          {
            id: "Gx/Vss"
          }
        );
      case "passwordChanged":
        return i18n._(
          /*i18n*/
          {
            id: "zJx6Vx"
          }
        );
      case "passwordChangeUndone":
        return i18n._(
          /*i18n*/
          {
            id: "PPgwqo"
          }
        );
      case "loginMoved":
        return i18n._(
          /*i18n*/
          {
            id: "ZZ1E+C"
          }
        );
    }
  }, [state]);
  return /* @__PURE__ */ jsx("div", { className: styles$d.Wrapper, ref: multiplexedRef, style: {
    "--overlay-shadow-width": `${AUTOSNATCH_OVERLAY_SHADOW_WIDTH_PX}px`
  }, children: /* @__PURE__ */ jsxs("div", { className: classNames(styles$d.Overlay, {
    [styles$d.undone]: state === "passwordChangeUndone" || state === "snatchUndone",
    [styles$d.expanded]: expanded2
  }), onClick: () => {
    onClick();
    setExpanded(true);
  }, onMouseEnter, onMouseLeave, children: [
    /* @__PURE__ */ jsx("button", { className: styles$d.CloseButton, onClick: close, children: /* @__PURE__ */ jsx(SvgCross, { title: i18n._(
      /*i18n*/
      {
        id: "yz7wBu"
      }
    ) }) }),
    /* @__PURE__ */ jsxs("header", { className: styles$d.Header, children: [
      /* @__PURE__ */ jsx("h2", { children: headline }),
      /* @__PURE__ */ jsx(i_, { className: styles$d.Logo })
    ] }),
    /* @__PURE__ */ jsx(LoginInfo, { login, useFullVaultLabel }),
    state === "snatched" || state === "loginMoved" ? /* @__PURE__ */ jsx(SnatchActions, { login, expanded: expanded2, autosnatchTargetOptions, setExpanded, undo, close, moveTargetInternal, setMoveTargetInternal, moveSelected, setMoveSelected, moveLogin, autosnatchTarget, setAutosnatchTarget }) : state === "passwordChanged" ? /* @__PURE__ */ jsx(PasswordChangedActions, { login, expanded: expanded2, setExpanded, undo, close }) : null
  ] }) });
}
function LoginInfo({
  login,
  useFullVaultLabel
}) {
  const vaultLabel = reactExports.useMemo(() => {
    if (!login.vaultInfo) {
      return i18n._(
        /*i18n*/
        {
          id: "1ZAe/6"
        }
      );
    }
    return useFullVaultLabel ? O(login.vaultInfo, login.organizationInfo ?? null) : g(login.vaultInfo);
  }, [login.organizationInfo, login.vaultInfo, useFullVaultLabel]);
  return /* @__PURE__ */ jsxs("div", { className: styles$d.LoginInfo, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$d.Line, children: [
      login.username ?? /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx(SvgCross, { className: styles$d.NoUsernameIcon }),
        " ",
        /* @__PURE__ */ jsx(Trans, { id: "i0/HKI" })
      ] }),
      " "
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$d.Line, children: /* @__PURE__ */ jsx(Trans, { id: "8d6VgQ", values: {
      vaultLabel
    }, components: {
      0: /* @__PURE__ */ jsx("span", { className: styles$d.InLabel })
    } }) })
  ] });
}
function SnatchActions({
  login,
  undo,
  close,
  expanded: expanded2,
  setExpanded,
  autosnatchTargetOptions,
  moveTargetInternal,
  setMoveTargetInternal,
  moveSelected,
  setMoveSelected,
  moveLogin,
  autosnatchTarget,
  setAutosnatchTarget
}) {
  var _a;
  if (!expanded2) {
    return /* @__PURE__ */ jsx("button", { onClick: () => setExpanded(true), className: styles$d.MoreOptionsButton, children: /* @__PURE__ */ jsx(Trans, { id: "fFUXog" }) });
  }
  if (autosnatchTargetOptions && moveSelected) {
    return /* @__PURE__ */ jsxs("div", { className: styles$d.Actions, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$d.TargetSelectorGroup, children: [
        /* @__PURE__ */ jsx("div", { className: styles$d.ToLabel, children: /* @__PURE__ */ jsx(Trans, { id: "/jQctM" }) }),
        /* @__PURE__ */ jsx(AutosnatchTargetSelector, { className: styles$d.TargetSelector, autosnatchTargetOverride: moveTargetInternal, autosnatchTargetOptions, autosnatchTarget, setAutosnatchTarget, setAutosnatchTargetOverride: setMoveTargetInternal, fixedSize: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$d.MoveButtonGroup, children: [
        /* @__PURE__ */ jsx(Ge, { className: styles$d.Action, onClick: () => setMoveSelected(false), children: /* @__PURE__ */ jsx(Trans, { id: "iH8pgl" }) }),
        /* @__PURE__ */ jsx(Ge, { disabled: !moveTargetInternal || moveTargetInternal === ((_a = login.vaultInfo) == null ? void 0 : _a.id), className: styles$d.Action, onClick: () => {
          if (!moveTargetInternal) {
            return;
          }
          moveLogin(moveTargetInternal);
        }, children: /* @__PURE__ */ jsx(Trans, { id: "QWdKwH" }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("ul", { className: classNames(styles$d.Actions, styles$d.list), children: [
    !login.username && login.url && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: styles$d.Action, href: login.url, target: "_blank", rel: "noreferrer", onClick: close, children: /* @__PURE__ */ jsx(Trans, { id: "2vJK8B" }) }) }),
    login.url && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: styles$d.Action, href: login.url, target: "_blank", rel: "noreferrer", onClick: close, children: /* @__PURE__ */ jsx(Trans, { id: "+Gd0x/" }) }) }),
    login.vaultInfo && autosnatchTargetOptions && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Ge, { className: styles$d.Action, type: "button", onClick: () => setMoveSelected(true), children: /* @__PURE__ */ jsx(Trans, { id: "00OyIR" }) }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Ge, { className: styles$d.Action, onClick: undo, children: /* @__PURE__ */ jsx(Trans, { id: "OdTay+" }) }) })
  ] });
}
function PasswordChangedActions({
  expanded: expanded2,
  setExpanded,
  login,
  undo,
  close
}) {
  if (!expanded2) {
    return /* @__PURE__ */ jsx("button", { onClick: () => setExpanded(true), className: styles$d.MoreOptionsButton, children: /* @__PURE__ */ jsx(Trans, { id: "fFUXog" }) });
  }
  return /* @__PURE__ */ jsxs("ul", { className: classNames(styles$d.Actions, styles$d.list), children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: styles$d.Action, href: login.url, target: "_blank", rel: "noreferrer", onClick: close, children: /* @__PURE__ */ jsx(Trans, { id: "+Gd0x/" }) }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Ge, { className: styles$d.Action, onClick: undo, children: /* @__PURE__ */ jsx(Trans, { id: "9uI/rE" }) }) })
  ] });
}
function useContentScriptConnection() {
  const [port, setPort] = reactExports.useState();
  reactExports.useEffect(() => {
    const connectionId = new URLSearchParams(window.location.search).get("connectionId");
    if (!connectionId) {
      trackError(new Error("Iframe opened without connectionId"));
      return;
    }
    const newPort = openConnection("ForwardIframe", connectionId);
    setPort(newPort);
  }, []);
  return port;
}
const AUTO_CLOSE_TIMEOUT = 5e3;
function AutosnatchNotificationOverlayContainer() {
  const port = useContentScriptConnection();
  const {
    iframeState,
    dispatch
  } = useIframeState(port, autosnatchNotificationIframeStateDescriptor);
  const setIntrinsicSize = useDispatchSetter(dispatch, (size) => ({
    type: "setIntrinsicSize",
    size
  }));
  const undo = reactExports.useCallback(() => dispatch({
    type: "undo"
  }), [dispatch]);
  const close = reactExports.useCallback(() => dispatch({
    type: "close"
  }), [dispatch]);
  const moveLogin = reactExports.useCallback((targetVaultId) => dispatch({
    type: "moveLogin",
    targetVaultId
  }), [dispatch]);
  const setExpanded = useDispatchSetter(dispatch, (expanded2) => ({
    type: "setExpanded",
    expanded: expanded2
  }));
  const setMoveTargetInternal = useDispatchSetter(dispatch, (moveTargetInternal) => ({
    type: "setMoveTargetInternal",
    moveTargetInternal
  }));
  const setMoveSelected = useDispatchSetter(dispatch, (moveSelected) => ({
    type: "setMoveSelected",
    moveSelected
  }));
  const {
    cancelTimeout,
    resetTimeout,
    pauseTimeout,
    resumeTimeout
  } = useAutoclose(!!iframeState.uiState, close);
  reactExports.useEffect(() => {
    var _a, _b;
    if (((_a = iframeState.uiState) == null ? void 0 : _a.state) === "passwordChangeUndone" || ((_b = iframeState.uiState) == null ? void 0 : _b.state) === "snatchUndone") {
      resetTimeout();
    }
  }, [iframeState.uiState, resetTimeout]);
  const autosnatchTargetOptions = useAutosnatchTargetOptions();
  const {
    autosnatchTarget,
    setAutosnatchTarget
  } = useAutosnatchSettings();
  if (!iframeState.uiState) {
    return null;
  }
  return /* @__PURE__ */ jsx(AutosnatchNotificationOverlay, { setIntrinsicSize, ...iframeState.uiState, undo, moveLogin, onClick: cancelTimeout, onMouseEnter: pauseTimeout, onMouseLeave: resumeTimeout, setExpanded, close, autosnatchTargetOptions, setMoveTargetInternal, setMoveSelected, autosnatchTarget, setAutosnatchTarget });
}
function useAutoclose(isOpen, close) {
  const timeoutStateRef = reactExports.useRef();
  const cancelTimeout = reactExports.useCallback(() => {
    var _a;
    if (((_a = timeoutStateRef.current) == null ? void 0 : _a.state) === "active") {
      window.clearTimeout(timeoutStateRef.current.timeoutId);
    }
    timeoutStateRef.current = {
      state: "canceled"
    };
  }, []);
  const startTimeout = reactExports.useCallback((timeoutMs) => {
    cancelTimeout();
    timeoutStateRef.current = {
      state: "active",
      timeoutId: window.setTimeout(() => {
        close();
        timeoutStateRef.current = void 0;
      }, timeoutMs),
      endsAt: addMilliseconds(/* @__PURE__ */ new Date(), timeoutMs)
    };
  }, [cancelTimeout, close]);
  const pauseTimeout = reactExports.useCallback(() => {
    var _a;
    if (((_a = timeoutStateRef.current) == null ? void 0 : _a.state) !== "active") {
      return;
    }
    window.clearTimeout(timeoutStateRef.current.timeoutId);
    const remainingMs = Math.max(differenceInMilliseconds(timeoutStateRef.current.endsAt, /* @__PURE__ */ new Date()), 0);
    timeoutStateRef.current = {
      state: "paused",
      remainingMs
    };
  }, []);
  const resumeTimeout = reactExports.useCallback(() => {
    var _a;
    if (((_a = timeoutStateRef.current) == null ? void 0 : _a.state) !== "paused") {
      return;
    }
    startTimeout(timeoutStateRef.current.remainingMs);
  }, [startTimeout]);
  const resetTimeout = reactExports.useCallback((unpause) => {
    var _a;
    if (((_a = timeoutStateRef.current) == null ? void 0 : _a.state) === "paused" && !unpause) {
      timeoutStateRef.current.remainingMs = AUTO_CLOSE_TIMEOUT;
    } else {
      cancelTimeout();
      startTimeout(AUTO_CLOSE_TIMEOUT);
    }
  }, [cancelTimeout, startTimeout]);
  reactExports.useEffect(() => {
    if (!isOpen) {
      cancelTimeout();
      timeoutStateRef.current = void 0;
      return;
    }
    if (timeoutStateRef.current) {
      return;
    }
    startTimeout(AUTO_CLOSE_TIMEOUT);
  }, [cancelTimeout, isOpen, startTimeout]);
  return {
    cancelTimeout,
    pauseTimeout,
    resumeTimeout,
    resetTimeout
  };
}
const autosnatchIframeStateDescriptor = {
  mode: "autosnatch",
  initialState: {
    intrinsicSize: {
      width: 0,
      height: 0
    },
    expanded: false,
    visible: false,
    pageHasLogins: false
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "setIntrinsicSize":
        return {
          ...state,
          intrinsicSize: action.size
        };
      case "setExpanded":
        return {
          ...state,
          expanded: action.expanded
        };
      case "setVisible":
        return {
          ...state,
          visible: action.visible
        };
      case "setAutosnatchTargetOverride":
        return {
          ...state,
          autosnatchTargetOverride: action.autosnatchTargetOverride
        };
      case "showPasswordGenerator":
      case "showLoginOverlay":
        return {
          ...state,
          expanded: false
        };
    }
  }
};
const SvgArrowDown = (props) => /* @__PURE__ */ reactExports.createElement("svg", { id: "svg12", viewBox: "0 0 14.684727 8.390773", height: 8.3907728, width: 14.684727, ...props }, /* @__PURE__ */ reactExports.createElement("path", { id: "path10", d: "m 7.3380721,5.8626537 -5.551,-5.55599997 A 1.049,1.049 0 0 0 0.30607208,1.7926537 L 6.5990721,8.0866534 a 1.047,1.047 0 0 0 1.443,0.031 L 14.376072,1.7926537 a 1.0493474,1.0493474 0 1 0 -1.482,-1.48599997 z" }));
const SvgArrowUp = (props) => /* @__PURE__ */ reactExports.createElement("svg", { id: "svg12", viewBox: "0 0 14.684727 8.390773", height: 8.3907728, width: 14.684727, ...props }, /* @__PURE__ */ reactExports.createElement("path", { id: "path10", d: "m 7.3380721,2.5284254 -5.551,5.556 a 1.049,-1.049 0 0 1 -1.48100002,-1.486 L 6.5990721,0.30442574 a 1.047,-1.047 0 0 1 1.443,-0.031 L 14.376072,6.5984254 a 1.0493474,-1.0493474 0 1 1 -1.482,1.486 z" }));
const SvgHeyloginIconDisabled = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 12.435, height: 12.434, viewBox: "0 0 12.435 12.434", ...props }, /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("style", null, ".a{opacity:0.578;}.b{fill:#b9b9b9;}.c{fill:#dbdbdb;}.d{fill:#898989;}.e{fill:#707070;}")), /* @__PURE__ */ reactExports.createElement("g", { transform: "translate(-747.858 -280.283)" }, /* @__PURE__ */ reactExports.createElement("g", { className: "a", transform: "translate(747.923 280.318)" }, /* @__PURE__ */ reactExports.createElement("g", { transform: "translate(-0.064 -0.036)" }, /* @__PURE__ */ reactExports.createElement("path", { className: "b", d: "M44.533,125.978a6.184,6.184,0,0,0,3.561-1.122l-2.417-2.885a2.477,2.477,0,0,1-2.072.1l-2.445,2.914a6.19,6.19,0,0,0,3.373,1Z", transform: "translate(-38.313 -113.544)" }), /* @__PURE__ */ reactExports.createElement("path", { className: "c", d: "M109.932,28.76l-2.445,2.917a2.48,2.48,0,0,1-.967,3.522l2.421,2.885a6.216,6.216,0,0,0,.992-9.323Z", transform: "translate(-99.159 -26.771)" }), /* @__PURE__ */ reactExports.createElement("path", { className: "d", d: "M79.993,72.312A2.473,2.473,0,0,0,79.615,71L76.58,74.618a2.486,2.486,0,0,0,3.413-2.306Z", transform: "translate(-71.287 -66.094)" }), /* @__PURE__ */ reactExports.createElement("path", { className: "e", d: "M2.781,11.4,5.225,8.488A2.486,2.486,0,1,1,8.264,4.866l2.444-2.913h0A6.216,6.216,0,1,0,2.781,11.4Z", transform: "translate(0.064 0.036)" })))));
const Container$1 = "_Container_afb8p_1";
const Button$1 = "_Button_afb8p_13";
const Arrow = "_Arrow_afb8p_37";
const HeyloginIcon$2 = "_HeyloginIcon_afb8p_43";
const Menu$3 = "_Menu_afb8p_49";
const ToggleActive = "_ToggleActive_afb8p_62";
const ToggleActiveLabel = "_ToggleActiveLabel_afb8p_67";
const Switch = "_Switch_afb8p_71";
const TargetSelectorGroup$1 = "_TargetSelectorGroup_afb8p_76";
const ToLabel$1 = "_ToLabel_afb8p_82";
const TargetSelector$1 = "_TargetSelector_afb8p_76";
const MenuButton = "_MenuButton_afb8p_93 _UnstyledButton_qo5hw_20";
const primary = "_primary_afb8p_117";
const hide = "_hide_afb8p_122";
const styles$c = {
  Container: Container$1,
  Button: Button$1,
  Arrow,
  HeyloginIcon: HeyloginIcon$2,
  Menu: Menu$3,
  ToggleActive,
  ToggleActiveLabel,
  Switch,
  TargetSelectorGroup: TargetSelectorGroup$1,
  ToLabel: ToLabel$1,
  TargetSelector: TargetSelector$1,
  MenuButton,
  primary,
  hide
};
const SvgEyeOff$1 = (props) => /* @__PURE__ */ reactExports.createElement("svg", { width: 25, height: 25, viewBox: "0 0 25 25", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ reactExports.createElement("g", { clipPath: "url(#clip0_8046_20786)" }, /* @__PURE__ */ reactExports.createElement("path", { d: "M12.4994 21.8743C4.65569 21.8743 0.286944 13.2931 0.105694 12.9243C0.0381304 12.7906 0.00292969 12.6429 0.00292969 12.4931C0.00292969 12.3433 0.0381304 12.1956 0.105694 12.0618C1.47718 9.50676 3.38289 7.27704 5.69319 5.52435C5.89133 5.3882 6.13419 5.33337 6.3716 5.37118C6.609 5.40899 6.82281 5.53656 6.96884 5.72753C7.11488 5.91849 7.18197 6.15825 7.15626 6.39728C7.13055 6.6363 7.014 6.85631 6.83069 7.01185C4.87397 8.49893 3.23719 10.3653 2.01819 12.4993C2.96194 14.1431 6.73069 19.9993 12.4994 19.9993C14.5519 19.9657 16.5392 19.2733 18.1682 18.0243C18.2663 17.9497 18.3781 17.895 18.4973 17.8635C18.6165 17.8321 18.7407 17.8244 18.8629 17.8409C18.9851 17.8575 19.1028 17.8979 19.2093 17.9599C19.3159 18.022 19.4091 18.1044 19.4838 18.2025C19.5585 18.3006 19.6131 18.4124 19.6446 18.5316C19.6761 18.6508 19.6838 18.775 19.6672 18.8972C19.6507 19.0193 19.6103 19.1371 19.5482 19.2436C19.4862 19.3501 19.4038 19.4434 19.3057 19.5181C17.3488 21.014 14.9624 21.8402 12.4994 21.8743ZM21.7744 16.8243C21.5454 16.8293 21.3227 16.7491 21.1494 16.5993C21.0549 16.5205 20.977 16.4237 20.9201 16.3146C20.8633 16.2054 20.8286 16.0861 20.8181 15.9634C20.8077 15.8408 20.8216 15.7173 20.8592 15.6001C20.8967 15.4829 20.9572 15.3743 21.0369 15.2806C21.7681 14.4146 22.4188 13.4836 22.9807 12.4993C22.0369 10.8743 18.2682 5.0431 12.4994 5.0431C11.8368 5.04276 11.1762 5.11825 10.5307 5.2681C10.4092 5.30096 10.2823 5.30901 10.1575 5.29176C10.0328 5.27451 9.91287 5.23232 9.80482 5.1677C9.69677 5.10309 9.60284 5.01737 9.52864 4.91566C9.45443 4.81396 9.40147 4.69835 9.37292 4.57573C9.34436 4.45311 9.3408 4.326 9.36243 4.20198C9.38407 4.07795 9.43047 3.95955 9.49885 3.85385C9.56724 3.74814 9.65622 3.6573 9.76048 3.58673C9.86474 3.51616 9.98215 3.46731 10.1057 3.4431C10.8898 3.25636 11.6934 3.16404 12.4994 3.1681C20.3432 3.1681 24.7057 11.7243 24.8869 12.0868C24.956 12.2201 24.992 12.368 24.992 12.5181C24.992 12.6682 24.956 12.8161 24.8869 12.9493C24.2185 14.2019 23.4181 15.3794 22.4994 16.4618C22.4123 16.5665 22.3034 16.6509 22.1804 16.7091C22.0574 16.7674 21.9231 16.7982 21.7869 16.7993L21.7744 16.8243ZM12.3994 16.7243C11.6026 16.7273 10.8222 16.4977 10.154 16.0636C9.48576 15.6295 8.95874 15.0098 8.63758 14.2806C8.31641 13.5513 8.21506 12.7442 8.34595 11.9582C8.47684 11.1722 8.83429 10.4414 9.37444 9.8556C9.45935 9.76343 9.54906 9.67581 9.64319 9.5931C9.83032 9.45899 10.0602 9.39842 10.2892 9.42294C10.5181 9.44746 10.73 9.55535 10.8844 9.72604C11.0389 9.89674 11.1252 10.1183 11.1268 10.3485C11.1284 10.5787 11.0453 10.8015 10.8932 10.9743L10.7494 11.1181C10.3558 11.5524 10.1499 12.1247 10.1769 12.7102C10.2038 13.2958 10.4613 13.8468 10.8932 14.2431C11.3299 14.634 11.9013 14.8401 12.4869 14.8181C13.0752 14.7894 13.6281 14.5287 14.0244 14.0931C14.1973 13.941 14.4201 13.8579 14.6503 13.8595C14.8805 13.8611 15.102 13.9474 15.2727 14.1019C15.4434 14.2563 15.5513 14.4682 15.5759 14.6971C15.6004 14.926 15.5398 15.156 15.4057 15.3431C15.0453 15.7408 14.6094 16.0628 14.1233 16.2902C13.6372 16.5177 13.1107 16.6462 12.5744 16.6681L12.3994 16.7243Z", fill: "#4256EC" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M24.0498 25.0002C23.9266 25.0011 23.8044 24.9773 23.6906 24.93C23.5768 24.8828 23.4736 24.8131 23.3873 24.7252L0.262301 1.60019C0.0890811 1.42117 -0.00592795 1.18067 -0.00182559 0.931598C0.00227677 0.682527 0.105154 0.445286 0.284176 0.272066C0.463197 0.0988467 0.703697 0.00383768 0.952769 0.00794004C1.20184 0.0120424 1.43908 0.11492 1.6123 0.293941L24.7373 23.4189C24.825 23.5056 24.8946 23.6087 24.9421 23.7224C24.9896 23.8362 25.0141 23.9582 25.0141 24.0814C25.0141 24.2047 24.9896 24.3267 24.9421 24.4404C24.8946 24.5542 24.825 24.6573 24.7373 24.7439C24.6469 24.8322 24.539 24.9006 24.4206 24.9448C24.3022 24.9889 24.1759 25.0078 24.0498 25.0002Z", fill: "#4256EC" })), /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("clipPath", { id: "clip0_8046_20786" }, /* @__PURE__ */ reactExports.createElement("rect", { width: 25, height: 25, fill: "white" }))));
const SvgLock = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", "data-name": "Ebene 7", viewBox: "0 0 40 40", ...props }, /* @__PURE__ */ reactExports.createElement("path", { d: "M19.89.006A10.72 10.72 0 0 0 9.32 10.83v5.88H7.13a5.19 5.19 0 0 0-5.19 5.19v12.92A5.17 5.17 0 0 0 7.13 40H33a5.19 5.19 0 0 0 5.19-5.19V21.9A5.19 5.19 0 0 0 33 16.71h-2.24v-6.09A10.72 10.72 0 0 0 19.89.005zM20 3a7.53 7.53 0 0 1 5.44 2.21 7.71 7.71 0 0 1 2.32 5.44v6.06H12.32l.05-5.91A7.72 7.72 0 0 1 20 3zM7.13 19.71H33a2.21 2.21 0 0 1 1.55.64 2.18 2.18 0 0 1 .64 1.55v12.92A2.19 2.19 0 0 1 33 37H7.13a2.14 2.14 0 0 1-1.55-.65 2.17 2.17 0 0 1-.64-1.54V21.9a2.19 2.19 0 0 1 2.19-2.19z" }));
const SvgLoginOverlay = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 25, height: 25, fill: "none", viewBox: "0 0 25 25", ...props }, /* @__PURE__ */ reactExports.createElement("rect", { width: 22.866, height: 22.866, x: 1.067, y: 1.067, rx: 5.531, style: {
  fill: "none",
  fillRule: "evenodd",
  stroke: "#4256ec",
  strokeWidth: 2.134,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeOpacity: 1,
  strokeDasharray: "none"
} }), /* @__PURE__ */ reactExports.createElement("rect", { width: 15.439, height: 7.082, x: 4.781, y: 8.959, rx: 2.921, ry: 3.541, style: {
  fill: "none",
  fillRule: "evenodd",
  stroke: "#4256ec",
  strokeWidth: 2.11792,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeDasharray: "none",
  strokeOpacity: 1
} }));
function AutosnatchOverlay({
  onResize,
  setAutosnatchActive: setActive,
  setExpanded,
  openPasswordGenerator,
  expanded: expanded2,
  autosnatchActive: active,
  passwordFieldHeight,
  ...menuProps
}) {
  const ref = reactExports.useRef(null);
  const [rootRef, size] = he();
  reactExports.useEffect(() => {
    onResize(size.width, size.height);
  }, [size.height, size.width, onResize]);
  const fontSize = reactExports.useMemo(() => passwordFieldHeight / 2, [passwordFieldHeight]);
  return /* @__PURE__ */ jsxs("div", { className: styles$c.Container, ref: rootRef, onClick: (e) => {
    if (e.target === ref.current) {
      setExpanded(false);
    }
  }, children: [
    /* @__PURE__ */ jsxs("button", { onClick: () => setExpanded(!expanded2), className: styles$c.Button, style: {
      fontSize: `${fontSize}px`
    }, children: [
      active ? /* @__PURE__ */ jsx(SvgHeyloginIcon, { className: styles$c.HeyloginIcon }) : /* @__PURE__ */ jsx(SvgHeyloginIconDisabled, { className: styles$c.HeyloginIcon }),
      expanded2 ? /* @__PURE__ */ jsx(SvgArrowUp, { className: styles$c.Arrow }) : /* @__PURE__ */ jsx(SvgArrowDown, { className: styles$c.Arrow })
    ] }),
    expanded2 && /* @__PURE__ */ jsx(AutosnatchOverlayMenu, { autosnatchActive: active, openPasswordGenerator, setAutosnatchActive: setActive, ...menuProps })
  ] });
}
function AutosnatchOverlayMenu({
  autosnatchActive: active,
  setAutosnatchActive: setActive,
  openPasswordGenerator,
  autosnatchTarget,
  autosnatchTargetOptions,
  setAutosnatchTarget,
  autosnatchTargetOverride,
  setAutosnatchTargetOverride,
  close,
  pageHasLogins,
  showLoginOverlay
}) {
  return /* @__PURE__ */ jsxs("div", { className: styles$c.Menu, children: [
    /* @__PURE__ */ jsxs("label", { className: styles$c.ToggleActive, children: [
      /* @__PURE__ */ jsx(at, { className: styles$c.Switch, onChange: (e) => setActive(e.target.checked), checked: active }),
      /* @__PURE__ */ jsx("span", { className: styles$c.ToggleActiveLabel, children: /* @__PURE__ */ jsx(Trans, { id: "jJzLu4" }) })
    ] }),
    active && autosnatchTargetOptions && shouldShowAutosnatchTargetSelector(autosnatchTargetOptions) && /* @__PURE__ */ jsxs("div", { className: styles$c.TargetSelectorGroup, children: [
      /* @__PURE__ */ jsx("div", { className: styles$c.ToLabel, children: /* @__PURE__ */ jsx(Trans, { id: "/jQctM" }) }),
      /* @__PURE__ */ jsx(AutosnatchTargetSelector, { className: styles$c.TargetSelector, autosnatchTarget, autosnatchTargetOverride, setAutosnatchTargetOverride, autosnatchTargetOptions, setAutosnatchTarget })
    ] }),
    /* @__PURE__ */ jsxs("button", { type: "button", onClick: openPasswordGenerator, className: classNames(styles$c.MenuButton, styles$c.primary), children: [
      /* @__PURE__ */ jsx(SvgLock, {}),
      /* @__PURE__ */ jsx(Trans, { id: "19BWU3" })
    ] }),
    pageHasLogins && /* @__PURE__ */ jsxs("button", { type: "button", onClick: showLoginOverlay, className: classNames(styles$c.MenuButton, styles$c.primary), children: [
      /* @__PURE__ */ jsx(SvgLoginOverlay, {}),
      /* @__PURE__ */ jsx(Trans, { id: "IHjtVj" })
    ] }),
    /* @__PURE__ */ jsxs("button", { type: "button", onClick: close, className: classNames(styles$c.MenuButton, styles$c.hide), children: [
      /* @__PURE__ */ jsx(SvgEyeOff$1, {}),
      /* @__PURE__ */ jsx(Trans, { id: "leDFPX" })
    ] })
  ] });
}
function useExtrinsicIframeSize() {
  const [size, setSize] = reactExports.useState(getExtrinsicSizeFromLocation());
  reactExports.useEffect(() => {
    window.addEventListener("hashchange", () => {
      setSize(getExtrinsicSizeFromLocation());
    });
  }, []);
  return size;
}
function getExtrinsicSizeFromLocation() {
  const hash = new URLSearchParams(window.location.hash.substring(1));
  return {
    width: parseInt(hash.get("extrinsicWidth"), 10),
    height: parseInt(hash.get("extrinsicHeight"), 10)
  };
}
function AutosnatchOverlayContainer() {
  const port = useContentScriptConnection();
  const {
    iframeState,
    dispatch
  } = useIframeState(port, autosnatchIframeStateDescriptor);
  const setExpanded = useDispatchSetter(dispatch, (expanded2) => ({
    type: "setExpanded",
    expanded: expanded2
  }));
  const setVisible = useDispatchSetter(dispatch, (visible) => ({
    type: "setVisible",
    visible
  }));
  const setIntrinsicSize = useDispatchSetter(dispatch, (size) => ({
    type: "setIntrinsicSize",
    size
  }));
  const setAutosnatchTargetOverride = useDispatchSetter(dispatch, (autosnatchTargetOverride) => ({
    type: "setAutosnatchTargetOverride",
    autosnatchTargetOverride
  }));
  const {
    height: passwordFieldHeight
  } = useExtrinsicIframeSize();
  const handleResize = reactExports.useCallback((width, height) => {
    setIntrinsicSize({
      width,
      height
    });
  }, [setIntrinsicSize]);
  const openPasswordGenerator = reactExports.useCallback(() => {
    dispatch({
      type: "showPasswordGenerator"
    });
  }, [dispatch]);
  const showLoginOverlay = reactExports.useCallback(() => {
    dispatch({
      type: "showLoginOverlay"
    });
  }, [dispatch]);
  const close = reactExports.useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  useCloseOnEscape(() => setExpanded(false));
  const {
    autosnatchTarget,
    setAutosnatchTarget,
    autosnatchDisabled,
    setAutosnatchDisabled
  } = useAutosnatchSettings();
  const setAutosnatchDisabledWithAchievement = reactExports.useCallback((disabled) => {
    setAutosnatchDisabled(disabled);
    sendMessage({
      type: "AddAchievements",
      achievements: [Achievement.EXT_OVERLAY_DISABLE_AUTOSNATCH]
    }).catch(trackError);
  }, [setAutosnatchDisabled]);
  const overrideProps = useAutosnatchTargetOverride(iframeState.autosnatchTargetOverride, setAutosnatchTargetOverride);
  return /* @__PURE__ */ jsx(AutosnatchOverlay, { autosnatchTarget, setAutosnatchTarget, onResize: handleResize, autosnatchActive: !autosnatchDisabled, expanded: iframeState.expanded, setAutosnatchActive: (v) => setAutosnatchDisabledWithAchievement(!v), setExpanded, openPasswordGenerator, passwordFieldHeight, close, pageHasLogins: iframeState.pageHasLogins, showLoginOverlay, ...overrideProps });
}
function useFormatDateDayRelative(dateString) {
  const {
    _
  } = useLingui();
  return reactExports.useMemo(() => formatDateRelative(dateString, _), [_, dateString]);
}
function formatDateRelative(dateString, t) {
  const dateFnsLocale = Ht();
  const formatRelativeLocale = {
    lastWeek: () => `'${t(
      /*i18n*/
      {
        id: "Jq4085"
      }
    )}' eeee`,
    yesterday: () => `'${t(
      /*i18n*/
      {
        id: "rQRrkB"
      }
    )}'`,
    today: () => `'${t(
      /*i18n*/
      {
        id: "yPCvpC"
      }
    )}' p`,
    tomorrow: () => `'${t(
      /*i18n*/
      {
        id: "t9zNOe"
      }
    )}'`,
    nextWeek: () => `'${t(
      /*i18n*/
      {
        id: "S8X3Kf"
      }
    )}' eeee`,
    other: () => {
      var _a;
      const atAbsoluteDate = ((_a = dateFnsLocale.formatRelative) == null ? void 0 : _a.call(dateFnsLocale, "other")) ?? "yyyy-MM-dd";
      return t(
        /*i18n*/
        {
          values: {
            atAbsoluteDate
          },
          id: "ZsmGRL"
        }
      );
    }
  };
  const locale = {
    ...dateFnsLocale,
    formatRelative: (token) => formatRelativeLocale[token]()
  };
  return formatRelative(new Date(dateString), /* @__PURE__ */ new Date(), {
    locale
  });
}
const UpdateLoginForm$1 = "_UpdateLoginForm_1cr2c_1";
const Header = "_Header_1cr2c_5";
const LogInto = "_LogInto_1cr2c_11";
const Website = "_Website_1cr2c_12";
const landscape$1 = "_landscape_1cr2c_20";
const PendingInfo$1 = "_PendingInfo_1cr2c_29";
const ClearPending = "_ClearPending_1cr2c_34 _UnstyledButton_qo5hw_20";
const Form = "_Form_1cr2c_41";
const FormElement = "_FormElement_1cr2c_46";
const portrait = "_portrait_1cr2c_55";
const styles$b = {
  UpdateLoginForm: UpdateLoginForm$1,
  Header,
  LogInto,
  Website,
  landscape: landscape$1,
  PendingInfo: PendingInfo$1,
  ClearPending,
  Form,
  FormElement,
  portrait
};
function UpdateLoginForm({
  onSave,
  host,
  landscape: landscape2,
  password,
  creationTime,
  archiveAddUsernameLogin
}) {
  const size = landscape2 ? "small" : "medium";
  return /* @__PURE__ */ jsx(Si, { uiStyle: "highlight", children: /* @__PURE__ */ jsx(Formik, { initialValues: {
    username: "",
    password
  }, onSubmit: (values) => {
    onSave(values.username, values.password);
  }, children: (formik) => /* @__PURE__ */ jsxs("div", { className: classNames(styles$b.UpdateLoginForm, {
    [styles$b.landscape]: landscape2,
    [styles$b.portrait]: !landscape2
  }), children: [
    /* @__PURE__ */ jsxs("header", { className: styles$b.Header, children: [
      /* @__PURE__ */ jsx("h1", { className: styles$b.LogInto, children: /* @__PURE__ */ jsx(Trans, { id: "aoJeWE" }) }),
      " ",
      /* @__PURE__ */ jsx("h2", { className: styles$b.Website, children: host }),
      /* @__PURE__ */ jsx(PendingInfo, { creationTime, onClear: archiveAddUsernameLogin })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: formik.handleSubmit, className: styles$b.Form, children: [
      /* @__PURE__ */ jsx("div", { className: styles$b.FormElement, children: /* @__PURE__ */ jsx(vh, { type: "text", placeholder: i18n._(
        /*i18n*/
        {
          id: "7sNhEz"
        }
      ), ...formik.getFieldProps("username"), error: formik.touched.username ? formik.errors.username : void 0, size }) }),
      /* @__PURE__ */ jsx("div", { className: styles$b.FormElement, children: /* @__PURE__ */ jsx(vh, { type: "password", placeholder: i18n._(
        /*i18n*/
        {
          id: "8ZsakT"
        }
      ), ...formik.getFieldProps("password"), error: formik.touched.password ? formik.errors.password : void 0, size }) }),
      /* @__PURE__ */ jsx("div", { className: styles$b.FormElement, children: /* @__PURE__ */ jsx(be, { buttonStyle: "primary", type: "submit", size, children: /* @__PURE__ */ jsx(Trans, { id: "3oE2TF" }) }) })
    ] })
  ] }) }) });
}
function PendingInfo({
  creationTime,
  onClear
}) {
  const relativeDate = useFormatDateDayRelative(creationTime);
  return /* @__PURE__ */ jsxs("div", { className: styles$b.PendingInfo, children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Trans, { id: "8MPwY1", values: {
      relativeDate
    } }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", { className: styles$b.ClearPending, onClick: onClear, children: /* @__PURE__ */ jsx(Trans, { id: "7LG+7N" }) }) })
  ] });
}
const loginIframeStateDescriptor = {
  mode: "login",
  initialState: {
    intrinsicSize: {
      width: 0,
      height: 0
    }
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "setIntrinsicSize":
        return {
          ...state,
          intrinsicSize: action.size
        };
      case "hide":
      case "updateLoginAndFillForm":
        return state;
    }
  }
};
function getLoginOverlayLandscape(extrinsicSize) {
  const aspectRatio = extrinsicSize.width / extrinsicSize.height;
  return extrinsicSize.height < 50 || extrinsicSize.height < 100 && aspectRatio >= 2.5;
}
function shouldAskForLoginUsername(login) {
  return !login.username && !login.title && login.permissions.editLogin;
}
const ConfirmLoginUse$1 = "_ConfirmLoginUse_zq1wu_1";
const Headline$1 = "_Headline_zq1wu_8";
const LoginButton$2 = "_LoginButton_zq1wu_14";
const ShowLoginLink = "_ShowLoginLink_zq1wu_17";
const styles$a = {
  ConfirmLoginUse: ConfirmLoginUse$1,
  Headline: Headline$1,
  LoginButton: LoginButton$2,
  ShowLoginLink
};
function ConfirmLoginUse({
  loginLink,
  label,
  confirm: confirm2
}) {
  const handleAcceptClick = useErrorHandlingCallback(() => confirm2(), [confirm2]);
  return /* @__PURE__ */ jsxs("div", { className: styles$a.ConfirmLoginUse, children: [
    /* @__PURE__ */ jsx("h1", { className: styles$a.Headline, children: /* @__PURE__ */ jsx(Trans, { id: "vNZ8of" }) }),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Sh, { onClick: handleAcceptClick, className: styles$a.LoginButton, icon: "inbox", children: /* @__PURE__ */ jsx("div", { children: label }) }) }),
    loginLink && /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: loginLink, target: "_blank", rel: "noreferrer", className: styles$a.ShowLoginLink, children: /* @__PURE__ */ jsx(Trans, { id: "hdwiS9" }) }) })
  ] });
}
function getDisambiguatedLogins(logins, url) {
  var _a;
  const uriWithPsl = url !== void 0 ? f(url) : void 0;
  const loginsWithWebsite = logins.map((login) => ({
    ...login,
    website: getBestMatchingWebsite(login.websites, uriWithPsl)
  }));
  const firstWebsite = (_a = loginsWithWebsite[0]) == null ? void 0 : _a.website;
  const websitesDiffer = loginsWithWebsite.some(({
    website
  }) => website !== firstWebsite);
  if (websitesDiffer) {
    return loginsWithWebsite;
  }
  return logins;
}
function getBestMatchingWebsite(websites, uriWithPsl) {
  if (!uriWithPsl) {
    let bestMatchingWebsite2 = void 0;
    for (const ws of websites) {
      if (!bestMatchingWebsite2 || ws.length > bestMatchingWebsite2.length) {
        bestMatchingWebsite2 = ws;
      }
    }
    return bestMatchingWebsite2;
  }
  let bestMatchingWebsite = void 0;
  let bestMatchingWebsiteSimilarity = 0;
  for (const ws of websites) {
    const similarity = a(uriWithPsl, ws);
    if (!similarity) {
      continue;
    }
    if (similarity > bestMatchingWebsiteSimilarity || // If we have multiple urls with same similarity, prefer the shortest one because it's going to be
    // easiest for the user to read that one.
    similarity === bestMatchingWebsiteSimilarity && (!bestMatchingWebsite || ws.length < (bestMatchingWebsite == null ? void 0 : bestMatchingWebsite.length))) {
      bestMatchingWebsite = ws;
      bestMatchingWebsiteSimilarity = similarity;
    }
  }
  return bestMatchingWebsite;
}
const LoginList = "_LoginList_tdimc_1";
const horizontal = "_horizontal_tdimc_11";
const LoginButton$1 = "_LoginButton_tdimc_15";
const LoginButtonSubtitle = "_LoginButtonSubtitle_tdimc_18";
const LoginListItem$1 = "_LoginListItem_tdimc_21";
const ShowAllButton = "_ShowAllButton_tdimc_30";
const styles$9 = {
  LoginList,
  horizontal,
  LoginButton: LoginButton$1,
  LoginButtonSubtitle,
  LoginListItem: LoginListItem$1,
  ShowAllButton
};
const SvgForward = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 13.27, height: 8.85, viewBox: "0 0 13.27 8.85", ...props }, /* @__PURE__ */ reactExports.createElement("path", { d: "M16.337,11.421a.6.6,0,0,0,0,.848l2.8,2.807H8.47a.6.6,0,0,0,0,1.2H19.13l-2.8,2.807a.607.607,0,0,0,0,.848.6.6,0,0,0,.843,0l3.8-3.826h0a.673.673,0,0,0,.124-.189.572.572,0,0,0,.046-.23.6.6,0,0,0-.171-.419l-3.8-3.826A.587.587,0,0,0,16.337,11.421Z", transform: "translate(-7.875 -11.252)" }));
const SvgSearch = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 16.018, height: 16.018, viewBox: "0 0 16.018 16.018", ...props }, /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("style", null, ".search_svg__a{fill:none;stroke:#8e8e8e;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.5px}")), /* @__PURE__ */ reactExports.createElement("path", { className: "search_svg__a", d: "M12.806 7.028A5.778 5.778 0 1 1 7.028 1.25a5.778 5.778 0 0 1 5.778 5.778zM14.25 14.25l-3.142-3.142" }));
const SvgTeam = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 14.935, height: 9.504, viewBox: "0 0 14.935 9.504", ...props }, /* @__PURE__ */ reactExports.createElement("path", { d: "M10.183 4.073a2.037 2.037 0 10-2.037-2.036 2.028 2.028 0 002.037 2.036zm-5.431 0a2.037 2.037 0 10-2.037-2.036 2.028 2.028 0 002.037 2.036zm0 1.358C3.17 5.431 0 6.225 0 7.807V9.5h9.5V7.8c0-1.575-3.166-2.369-4.748-2.369zm5.431 0a8 8 0 00-.658.034 2.865 2.865 0 011.337 2.342V9.5h4.073V7.8c0-1.575-3.171-2.369-4.752-2.369z", fill: "#272745" }));
const OverlayLoginSearch$1 = "_OverlayLoginSearch_jkm7u_1";
const medium = "_medium_jkm7u_7";
const small = "_small_jkm7u_13";
const open = "_open_jkm7u_18";
const InputWrapper = "_InputWrapper_jkm7u_22";
const Input = "_Input_jkm7u_22";
const Placeholder = "_Placeholder_jkm7u_54";
const PlaceholderIcon = "_PlaceholderIcon_jkm7u_68";
const PlaceholderText = "_PlaceholderText_jkm7u_71";
const MenuWrapper = "_MenuWrapper_jkm7u_75";
const Menu$2 = "_Menu_jkm7u_75";
const MenuItem = "_MenuItem_jkm7u_101";
const highlighted = "_highlighted_jkm7u_113";
const Label$1 = "_Label_jkm7u_126";
const Title = "_Title_jkm7u_131";
const Subtitle = "_Subtitle_jkm7u_132";
const NothingFoundMessage = "_NothingFoundMessage_jkm7u_141";
const visuallyhidden = "_visuallyhidden_jkm7u_150";
const styles$8 = {
  OverlayLoginSearch: OverlayLoginSearch$1,
  medium,
  small,
  open,
  InputWrapper,
  Input,
  Placeholder,
  PlaceholderIcon,
  PlaceholderText,
  MenuWrapper,
  Menu: Menu$2,
  MenuItem,
  highlighted,
  Label: Label$1,
  Title,
  Subtitle,
  NothingFoundMessage,
  visuallyhidden
};
function OverlayLoginSearch({
  logins,
  size,
  menuHeight,
  handleLoginClick,
  performDefaultActionRef
}) {
  const [filteredLogins, setFilteredLogins] = reactExports.useState(logins);
  const {
    isOpen,
    highlightedIndex,
    inputValue,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    openMenu
  } = useCombobox({
    itemToString: (item) => item ? getLoginDisplayLabel(item) ?? "" : "",
    // @ts-ignore
    items: filteredLogins,
    onSelectedItemChange: ({
      selectedItem
    }) => {
      if (selectedItem) {
        handleLoginClick(selectedItem);
      }
    }
  });
  reactExports.useEffect(() => {
    setFilteredLogins(!inputValue ? logins : logins.filter((item) => searchPredicate(item, inputValue)));
  }, [inputValue, logins]);
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (performDefaultActionRef) {
      performDefaultActionRef.current = () => {
        var _a;
        (_a = inputRef.current) == null ? void 0 : _a.focus();
      };
    }
  }, [performDefaultActionRef]);
  return /* @__PURE__ */ jsxs("div", { className: classNames(styles$8.OverlayLoginSearch, styles$8[size ?? "medium"], {
    [styles$8.open]: isOpen
  }), children: [
    /* @__PURE__ */ jsxs("div", { ...getComboboxProps(), className: styles$8.InputWrapper, children: [
      /* @__PURE__ */ jsxs("label", { ...getLabelProps(), className: classNames(styles$8.Placeholder, {
        [styles$8.visuallyhidden]: inputValue !== ""
      }), children: [
        /* @__PURE__ */ jsx(SvgSearch, { title: "", className: styles$8.PlaceholderIcon }),
        /* @__PURE__ */ jsx("span", { className: styles$8.PlaceholderText, children: /* @__PURE__ */ jsx(Trans, { id: "0FzuA+", values: {
          0: logins.length
        } }) })
      ] }),
      /* @__PURE__ */ jsx("input", { ...getInputProps({
        onFocus: () => {
          if (!isOpen) {
            openMenu();
          }
        },
        ref: inputRef
      }), className: styles$8.Input })
    ] }),
    /* @__PURE__ */ jsx("div", { className: classNames(styles$8.MenuWrapper, {
      [styles$8.visuallyhidden]: !isOpen
    }), children: /* @__PURE__ */ jsx("ul", { ...getMenuProps(), className: styles$8.Menu, style: {
      "--menu-height": `${menuHeight}px`
    }, children: isOpen && filteredLogins.length ? filteredLogins.map((login, index) => {
      var _a;
      return /* @__PURE__ */ jsxs("li", { className: classNames(styles$8.MenuItem, {
        [styles$8.highlighted]: highlightedIndex === index
      }), ...getItemProps({
        item: login,
        index
      }), children: [
        ((_a = login.vaultMetadata) == null ? void 0 : _a.type) === VaultType.TEAM && /* @__PURE__ */ jsx(SvgTeam, { title: i18n._(
          /*i18n*/
          {
            id: "KM6m8p"
          }
        ) }),
        /* @__PURE__ */ jsx(MenuItemLabel, { login }),
        /* @__PURE__ */ jsx(SvgForward, { title: "" })
      ] }, login.id);
    }) : /* @__PURE__ */ jsx("li", { className: styles$8.NothingFoundMessage, children: /* @__PURE__ */ jsx(Trans, { id: "OCApeu" }) }) }) })
  ] });
}
function MenuItemLabel({
  login
}) {
  const displayLabel = getLoginDisplayLabel(login);
  const dateString = login.creationTime;
  const relativeDate = useFormatDateDayRelative(dateString);
  if (!displayLabel) {
    return /* @__PURE__ */ jsxs("div", { className: styles$8.Label, children: [
      /* @__PURE__ */ jsx("div", { className: styles$8.Title, children: /* @__PURE__ */ jsx(Trans, { id: "4QFgr2" }) }),
      /* @__PURE__ */ jsx("div", { className: styles$8.Subtitle, children: /* @__PURE__ */ jsx(Trans, { id: "8MPwY1", values: {
        relativeDate
      } }) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: styles$8.Label, children: [
    /* @__PURE__ */ jsx("div", { className: styles$8.Title, children: displayLabel }),
    login.website && /* @__PURE__ */ jsx("div", { className: styles$8.Subtitle, children: /* @__PURE__ */ jsx(Trans, { id: "UCQiqt", values: {
      0: login.website
    } }) })
  ] });
}
function OverlayLoginList({
  logins,
  landscape: landscape2,
  handleLoginClick,
  url,
  extrinsicHeight,
  performDefaultActionRef,
  preferredLoginIds
}) {
  const [hideInferiorMatches, setHideInferiorMatches] = reactExports.useState(true);
  const disambiguatedLogins = reactExports.useMemo(() => getDisambiguatedLogins(logins, url), [logins, url]);
  const bestMatchLogins = reactExports.useMemo(() => {
    const preferredLogins = preferredLoginIds && disambiguatedLogins.filter(({
      id
    }) => preferredLoginIds.includes(id));
    const loginsToProcess = (preferredLogins == null ? void 0 : preferredLogins.length) ? preferredLogins : disambiguatedLogins;
    const index = loginsToProcess.findIndex((l) => l.urlSimilarity < loginsToProcess[0].urlSimilarity);
    return index === -1 ? loginsToProcess : loginsToProcess.slice(0, index);
  }, [disambiguatedLogins, preferredLoginIds]);
  const displayedLogins = hideInferiorMatches ? bestMatchLogins : disambiguatedLogins;
  const hiddenLoginsCount = disambiguatedLogins.length - displayedLogins.length;
  const loginsHidden = hiddenLoginsCount > 0;
  const horizontal2 = landscape2 && displayedLogins.length < (loginsHidden ? 2 : 3);
  const [loginItemRef, {
    height: loginItemHeight
  }] = he();
  const maxLoginItemCount = reactExports.useMemo(() => {
    if (loginItemHeight === 0 || horizontal2) {
      return Infinity;
    }
    const availableHeight = extrinsicHeight;
    const loginsFittingInHeight = Math.floor(availableHeight / loginItemHeight) - 1;
    return Math.max(loginsFittingInHeight, 3);
  }, [extrinsicHeight, horizontal2, loginItemHeight]);
  const showSearch = displayedLogins.length > (loginsHidden ? maxLoginItemCount - 1 : maxLoginItemCount);
  const listLogins = showSearch ? displayedLogins.slice(0, maxLoginItemCount - 1) : displayedLogins;
  const [, setListLoginLength] = reactExports.useState();
  reactExports.useEffect(() => {
    setListLoginLength(listLogins.length);
  }, [listLogins.length]);
  const searchMenuHeight = loginItemHeight * listLogins.length;
  const listRef = reactExports.useRef(null);
  const searchItemRef = reactExports.useRef(null);
  useArrowFocus(listRef, searchItemRef);
  reactExports.useEffect(() => {
    if (!performDefaultActionRef || showSearch) {
      return;
    }
    if (listLogins.length === 1) {
      performDefaultActionRef.current = () => handleLoginClick(listLogins[0]);
    } else {
      performDefaultActionRef.current = () => {
        var _a, _b;
        return (_b = (_a = listRef.current) == null ? void 0 : _a.querySelector("button")) == null ? void 0 : _b.focus();
      };
    }
  }, [handleLoginClick, listLogins, listLogins.length, performDefaultActionRef, showSearch]);
  return /* @__PURE__ */ jsxs("ul", { className: classNames(styles$9.LoginList, {
    [styles$9.horizontal]: horizontal2
  }), ref: listRef, children: [
    showSearch && /* @__PURE__ */ jsx("li", { className: styles$9.LoginListItem, ref: searchItemRef, children: /* @__PURE__ */ jsx(
      OverlayLoginSearch,
      {
        logins: disambiguatedLogins,
        size: landscape2 ? "small" : "medium",
        handleLoginClick,
        menuHeight: searchMenuHeight,
        performDefaultActionRef
      }
    ) }, "search"),
    listLogins.map((l, i) => (
      // Use one of the li's to measure the login item height. We don't use the 0th on, since it
      // doesn't have margin in all situations.
      /* @__PURE__ */ jsx("li", { className: styles$9.LoginListItem, ref: i === 1 ? loginItemRef : void 0, children: /* @__PURE__ */ jsx(LoginListItem, { onClick: () => handleLoginClick(l), login: l, landscape: landscape2 }) }, i)
    )),
    hiddenLoginsCount > 0 && !showSearch && /* @__PURE__ */ jsx("li", { className: styles$9.LoginListItem, children: /* @__PURE__ */ jsx(be, { buttonStyle: "tertiary", type: "button", onClick: () => setHideInferiorMatches(false), className: styles$9.ShowAllButton, children: /* @__PURE__ */ jsx(Trans, { id: "uooG+Q", values: {
      hiddenLoginsCount
    } }) }) }, "showAll")
  ] });
}
function LoginListItem({
  onClick,
  login,
  landscape: landscape2
}) {
  var _a, _b;
  const relativeDate = useFormatDateDayRelative(login.creationTime);
  const displayLabel = getLoginDisplayLabel(login);
  return /* @__PURE__ */ jsx(Sh, { onClick, size: landscape2 ? "small" : "medium", className: styles$9.LoginButton, icon: ((_a = login.vaultMetadata) == null ? void 0 : _a.type) === VaultType.TEAM ? "team" : ((_b = login.vaultMetadata) == null ? void 0 : _b.type) === VaultType.INBOX ? "inbox" : void 0, children: displayLabel ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { children: displayLabel }),
    login.website && /* @__PURE__ */ jsx("div", { className: styles$9.LoginButtonSubtitle, children: /* @__PURE__ */ jsx(Trans, { id: "UCQiqt", values: {
      0: login.website
    } }) })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Trans, { id: "4QFgr2" }) }),
    /* @__PURE__ */ jsx("div", { className: styles$9.LoginButtonSubtitle, children: /* @__PURE__ */ jsx(Trans, { id: "8MPwY1", values: {
      relativeDate
    } }) })
  ] }) });
}
function useArrowFocus(listRef, searchItemRef) {
  reactExports.useEffect(() => {
    function onKeyDown(e) {
      var _a, _b;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.defaultPrevented) {
        return;
      }
      let direction;
      if (e.key === "ArrowUp") {
        direction = -1;
      } else if (e.key === "ArrowDown") {
        direction = 1;
      } else {
        return;
      }
      const focused = document.querySelector(":focus");
      if (!focused || !((_a = listRef.current) == null ? void 0 : _a.contains(focused)) || ((_b = searchItemRef.current) == null ? void 0 : _b.contains(focused))) {
        return;
      }
      const focusable = [...listRef.current.querySelectorAll("button, input")].filter((f2) => f2 instanceof HTMLElement);
      const index = focusable.indexOf(focused);
      if (index === -1) {
        return;
      }
      const newIndex = (index + direction + focusable.length) % focusable.length;
      focusable[newIndex].focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });
}
const OverlayTotpWarning$1 = "_OverlayTotpWarning_1fbhb_1";
const LoginButton = "_LoginButton_1fbhb_4";
const styles$7 = {
  OverlayTotpWarning: OverlayTotpWarning$1,
  LoginButton
};
function OverlayTotpWarning({
  performLogin,
  close,
  warningCleared,
  recheck
}) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(ho, { className: styles$7.OverlayTotpWarning, onClose: close, hidden: warningCleared, recheck, onRecheckSuccess: performLogin, children: /* @__PURE__ */ jsx(Sh, { size: "small", onClick: performLogin, className: styles$7.LoginButton, children: /* @__PURE__ */ jsx(Trans, { id: "NoL4kU" }) }) }) });
}
const SubscriptionNag$1 = "_SubscriptionNag_wab9u_1";
const Headline = "_Headline_wab9u_14";
const Info$1 = "_Info_wab9u_19";
const landscape = "_landscape_wab9u_23";
const ButtonGroup = "_ButtonGroup_wab9u_27";
const UpgradeButton = "_UpgradeButton_wab9u_38";
const styles$6 = {
  SubscriptionNag: SubscriptionNag$1,
  Headline,
  Info: Info$1,
  landscape,
  ButtonGroup,
  UpgradeButton
};
function SubscriptionNag({
  subscriptionSettingsLink,
  organizationName,
  landscape: landscape2,
  subscriptionError
}) {
  return /* @__PURE__ */ jsx(Si, { uiStyle: "highlight", children: /* @__PURE__ */ jsxs("div", { className: classNames(styles$6.SubscriptionNag, {
    [styles$6.landscape]: landscape2
  }), children: [
    /* @__PURE__ */ jsx("h1", { className: styles$6.Headline, children: subscriptionError === SubscriptionError.TRIAL_EXCEEDED ? /* @__PURE__ */ jsx(Trans, { id: "HyrObi" }) : /* @__PURE__ */ jsx(Trans, { id: "3hTaGP" }) }),
    /* @__PURE__ */ jsx("p", { className: styles$6.Info, children: subscriptionError === SubscriptionError.TRIAL_EXCEEDED ? /* @__PURE__ */ jsx(Trans, { id: "+zHEzW", values: {
      organizationName
    }, components: {
      0: /* @__PURE__ */ jsx("strong", {})
    } }) : /* @__PURE__ */ jsx(Trans, { id: "gOW54d", values: {
      organizationName
    }, components: {
      0: /* @__PURE__ */ jsx("strong", {})
    } }) }),
    subscriptionSettingsLink && /* @__PURE__ */ jsx("div", { className: styles$6.ButtonGroup, children: /* @__PURE__ */ jsx(be, { element: "a", buttonStyle: "primary", href: subscriptionSettingsLink, target: "_blank", className: styles$6.UpgradeButton, rel: "noreferrer", children: subscriptionError === SubscriptionError.TRIAL_EXCEEDED ? /* @__PURE__ */ jsx(Trans, { id: "IURrEe" }) : /* @__PURE__ */ jsx(Trans, { id: "rkcRqy" }) }) })
  ] }) });
}
function useParentPageUrl() {
  return reactExports.useMemo(() => {
    const url = new URLSearchParams(window.location.search).get("url") ?? void 0;
    const host = url ? getHost(url) : void 0;
    return {
      url,
      host
    };
  }, []);
}
function LoginOverlay() {
  var _a, _b;
  const port = useContentScriptConnection();
  const {
    iframeState,
    dispatch
  } = useIframeState(port, loginIframeStateDescriptor);
  const setIntrinsicSize = useDispatchSetter(dispatch, (size) => ({
    type: "setIntrinsicSize",
    size
  }));
  const {
    host,
    url
  } = useParentPageUrl();
  const {
    performLogin,
    cancelLogin,
    requestUnlock,
    pushState,
    unlockDeviceType
  } = useUnlock({
    achievement: Achievement.EXT_OVERLAY_UNLOCK
  });
  const [selectedLoginId, setSelectedLoginId] = reactExports.useState();
  const [confirmUseLogin, setConfirmUseLogin] = reactExports.useState();
  const [addUsernameLoginId, setAddUsernameLoginId] = reactExports.useState();
  const [subscriptionNagLogin, setSubscriptionNagLogin] = reactExports.useState();
  const [totpTimeOffsetWarningLoginId, setTotpTimeOffsetWarningLoginId] = reactExports.useState();
  const subscriptionSettingsLink = reactExports.useMemo(() => {
    const orgInfo = subscriptionNagLogin == null ? void 0 : subscriptionNagLogin.organization;
    if (!orgInfo) {
      return void 0;
    }
    const error = orgInfo.subscriptionError;
    if (!error) {
      return void 0;
    }
    if (!orgInfo.isAdmin) {
      return void 0;
    }
    return `${getFrontendServerUrl()}/organizations/${orgInfo.id}/manage/plan`;
  }, [subscriptionNagLogin]);
  const handleLoginClick = reactExports.useCallback((login) => {
    var _a2;
    setSelectedLoginId(login.id);
    addAchievement(Achievement.EXT_OVERLAY_LOGIN);
    if (login.pendingInboxConfirmation) {
      setConfirmUseLogin(login);
    } else if (shouldAskForLoginUsername(login)) {
      requestUnlock();
      window.setTimeout(() => setAddUsernameLoginId(login.id), 10);
    } else if ((_a2 = login.organization) == null ? void 0 : _a2.subscriptionError) {
      setSubscriptionNagLogin(login);
      addAchievement(Achievement.EXT_OVERLAY_SAW_NAG_SCREEN);
    } else if (login.showTotpTimeOffsetWarning) {
      setTotpTimeOffsetWarningLoginId(login.id);
    } else {
      performLogin(login.id);
    }
  }, [performLogin, requestUnlock]);
  const handleResize = reactExports.useCallback((width, height) => {
    setIntrinsicSize({
      width,
      height
    });
  }, [setIntrinsicSize]);
  const [newLoginSuccess, setNewLoginSuccess] = reactExports.useState(false);
  const handleClose = reactExports.useMemo(() => {
    if (pushState === "confirmed") {
      return void 0;
    }
    return () => dispatch({
      type: "hide"
    });
  }, [dispatch, pushState]);
  useCloseOnEscape(handleClose);
  const {
    landscape: landscape2,
    extrinsicHeight
  } = useOverlayLayout();
  const [addUsernameLogin, setAddUsernameLogin] = reactExports.useState();
  reactExports.useEffect(() => {
    if ((addUsernameLogin == null ? void 0 : addUsernameLogin.id) === addUsernameLoginId) {
      return;
    }
    async function updateAddUsernameLogin() {
      var _a2;
      const login = (_a2 = iframeState.logins) == null ? void 0 : _a2.find(({
        id
      }) => id === addUsernameLoginId);
      if (!login) {
        setAddUsernameLogin(void 0);
        return;
      }
      const unprotectedPassword = await getUnprotectedValueForContentLogin(login, login == null ? void 0 : login.password);
      if (!unprotectedPassword) {
        setAddUsernameLogin(void 0);
        return;
      }
      setAddUsernameLogin({
        ...login,
        unprotectedPassword
      });
    }
    updateAddUsernameLogin().catch(trackError);
  }, [addUsernameLogin == null ? void 0 : addUsernameLogin.id, addUsernameLoginId, iframeState.logins]);
  const clientOutdated = useClientOutdated();
  const performDefaultActionRef = reactExports.useRef(() => {
  });
  reactExports.useEffect(() => {
    if (!port) {
      return void 0;
    }
    function handleMessage(msg) {
      if (msg.type === "PerformEnterDefaultAction") {
        performDefaultActionRef.current();
      }
    }
    port.onMessage.addListener(handleMessage);
    return () => port.onMessage.removeListener(handleMessage);
  }, [port]);
  return /* @__PURE__ */ jsx(Ih, { onClose: addUsernameLoginId ? void 0 : handleClose, onResize: handleResize, onRetry: () => {
    if (addUsernameLoginId) {
      requestUnlock();
    } else if (selectedLoginId) {
      performLogin(selectedLoginId);
    }
  }, onCancel: cancelLogin, state: newLoginSuccess ? "confirmed" : pushState, landscape: landscape2, cornerBackground: !!addUsernameLoginId || !!subscriptionNagLogin || !!confirmUseLogin, onBack: pushState ? void 0 : addUsernameLoginId ? () => setAddUsernameLoginId(void 0) : confirmUseLogin ? () => setConfirmUseLogin(void 0) : subscriptionNagLogin ? () => setSubscriptionNagLogin(void 0) : void 0, unlockDeviceType, children: clientOutdated ? /* @__PURE__ */ jsx(ClientOutdatedMessage, {}) : confirmUseLogin ? /* @__PURE__ */ jsx(ConfirmLoginUse, { confirm: async () => performLogin(confirmUseLogin.id, {
    confirmLogin: true
  }), label: getLoginDisplayLabel(confirmUseLogin) ?? i18n._(
    /*i18n*/
    {
      id: "4QFgr2"
    }
  ), loginLink: confirmUseLogin.loginUrl }) : addUsernameLogin ? /* @__PURE__ */ jsx(UpdateLoginForm, { onSave: (username, password) => {
    var _a2;
    dispatch({
      type: "updateLoginAndFillForm",
      targetLoginId: addUsernameLogin.id,
      targetVaultId: (_a2 = addUsernameLogin.vaultMetadata) == null ? void 0 : _a2.id,
      username,
      password
    });
    setNewLoginSuccess(true);
    setAddUsernameLoginId(void 0);
    addAchievement(Achievement.EXT_OVERLAY_UPDATE_GENERATED_PASSWORD);
  }, host, landscape: landscape2, creationTime: addUsernameLogin.creationTime, password: addUsernameLogin.unprotectedPassword, archiveAddUsernameLogin: () => {
    sendMessage({
      type: "ArchiveAddUsernameLogin",
      loginId: addUsernameLogin.id
    }).catch(trackError);
    setAddUsernameLoginId(void 0);
  } }) : subscriptionNagLogin ? /* @__PURE__ */ jsx(SubscriptionNag, { subscriptionSettingsLink, organizationName: subscriptionNagLogin.organization.name, subscriptionError: subscriptionNagLogin.organization.subscriptionError, landscape: landscape2 }) : totpTimeOffsetWarningLoginId ? /* @__PURE__ */ jsx(OverlayTotpWarning, { close: () => setTotpTimeOffsetWarningLoginId(void 0), performLogin: () => performLogin(totpTimeOffsetWarningLoginId), warningCleared: !((_b = (_a = iframeState.logins) == null ? void 0 : _a.find((l) => l.id === totpTimeOffsetWarningLoginId)) == null ? void 0 : _b.showTotpTimeOffsetWarning), recheck: async () => {
    await sendMessage({
      type: "RequestSync"
    });
  } }) : /* @__PURE__ */ jsx(OverlayLoginList, { logins: iframeState.logins ?? [], landscape: landscape2, handleLoginClick, url, extrinsicHeight, performDefaultActionRef, preferredLoginIds: iframeState.preferredLoginIds }) });
}
function useOverlayLayout() {
  const extrinsicSize = useExtrinsicIframeSize();
  const {
    width: extrinsicWidth,
    height: extrinsicHeight
  } = extrinsicSize;
  const landscape2 = reactExports.useMemo(() => getLoginOverlayLandscape(extrinsicSize), [extrinsicSize]);
  return {
    landscape: landscape2,
    extrinsicWidth,
    extrinsicHeight
  };
}
const OverrideCreateOverlay$1 = "_OverrideCreateOverlay_xhtog_1";
const styles$5 = {
  OverrideCreateOverlay: OverrideCreateOverlay$1
};
const SelectorContext = React.createContext({
  results: {},
  selectElement: async () => ""
});
function SelectorContextProvider({
  children,
  selectorResults,
  selectElementState,
  setSelectElementState
}) {
  const selectElementPromiseRef = reactExports.useRef();
  const selectElement = reactExports.useCallback((tagNames) => {
    if (!selectElementPromiseRef.current) {
      let resolve;
      const promise = new Promise((r) => {
        resolve = r;
      });
      selectElementPromiseRef.current = {
        promise,
        resolve
      };
    }
    setSelectElementState({
      state: "inProgress",
      tagNames
    });
    return selectElementPromiseRef.current.promise;
  }, [setSelectElementState]);
  reactExports.useEffect(() => {
    if ((selectElementState == null ? void 0 : selectElementState.state) === "done" && selectElementPromiseRef.current) {
      selectElementPromiseRef.current.resolve(selectElementState.selector);
      selectElementPromiseRef.current = void 0;
    }
  });
  return /* @__PURE__ */ jsx(SelectorContext.Provider, { value: {
    results: selectorResults,
    selectElement
  }, children });
}
function useSelectorContext() {
  return reactExports.useContext(SelectorContext);
}
function SelectorInput({
  selector,
  setSelector,
  disabled,
  tagNames
}) {
  const {
    results,
    selectElement
  } = useSelectorContext();
  const selectorResult = typeof selector === "string" ? results[selector] : void 0;
  return /* @__PURE__ */ jsxs("span", { children: [
    /* @__PURE__ */ jsx("input", { value: selector, onChange: (e) => setSelector(e.currentTarget.value), disabled }),
    " ",
    selector === "" ? /* @__PURE__ */ jsx("span", { title: "Enter selector", children: "⏺️" }) : selectorResult === void 0 ? /* @__PURE__ */ jsx("span", { title: "Checking if present in page", children: "🔄" }) : selectorResult === "found" ? /* @__PURE__ */ jsx("span", { title: "Present in page", children: "✅" }) : selectorResult === "notFound" ? /* @__PURE__ */ jsx("span", { title: "Not present in page", children: "❌" }) : selectorResult === "malformed" ? /* @__PURE__ */ jsx("span", { title: "Selector malformed", children: "⚠️" }) : void 0,
    " ",
    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
      (async () => {
        setSelector(await selectElement(tagNames));
      })().catch(trackError);
    }, children: "🎯" })
  ] });
}
function PredicateEdit({
  predicate,
  setPredicate
}) {
  if (!predicate) {
    return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setPredicate({
      type: "elementExists",
      selector: ""
    }), children: "Add predicate" }) });
  }
  return /* @__PURE__ */ jsxs("fieldset", { children: [
    /* @__PURE__ */ jsxs("legend", { children: [
      "Predicate: ",
      predicate.type
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setPredicate(void 0), children: "Delete predicate" }),
      " ",
      /* @__PURE__ */ jsxs("label", { children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: predicate.negated, onChange: (e) => setPredicate({
          ...predicate,
          negated: e.currentTarget.checked
        }) }),
        " ",
        "Negated"
      ] })
    ] }),
    predicate.type === "elementExists" ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
        "Selector:",
        " ",
        /* @__PURE__ */ jsx(SelectorInput, { selector: predicate.selector, setSelector: (selector) => setPredicate({
          ...predicate,
          selector
        }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: predicate.requireVisible, onChange: (e) => setPredicate({
          ...predicate,
          requireVisible: e.currentTarget.checked
        }) }),
        " ",
        "Require element visible"
      ] }) })
    ] }) : /* @__PURE__ */ jsx("div", { children: "Not supported" })
  ] });
}
const ruleTypes = ["loginForm", "registrationForm", "noForm", "formKindHint"];
const emptyLoginSelectors = {
  formElement: null,
  usernameElement: null,
  passwordElement: null,
  totpElements: null,
  stayLoggedInElement: null,
  submitElement: null
};
const emptyRegistrationSelectors = {
  formElement: null,
  usernameElement: null,
  passwordElement: null,
  repeatPasswordElement: null,
  submitElement: null
};
const emptyRules = {
  loginForm: {
    type: "loginForm",
    selectors: emptyLoginSelectors
  },
  registrationForm: {
    type: "registrationForm",
    selectors: emptyRegistrationSelectors
  },
  formKindHint: {
    type: "formKindHint",
    kind: "login"
  },
  noForm: {
    type: "noForm"
  }
};
function RuleCreate({
  addRule
}) {
  const [ruleType, setRuleType] = reactExports.useState("initial");
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("label", { children: [
      "Rule Type:",
      " ",
      /* @__PURE__ */ jsxs("select", { value: ruleType, onChange: (e) => setRuleType(e.currentTarget.value), children: [
        /* @__PURE__ */ jsx("option", { value: "initial", children: "Select type" }),
        ruleTypes.map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
      ] })
    ] }),
    " ",
    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
      if (ruleType !== "initial") {
        addRule(emptyRules[ruleType]);
        setRuleType("initial");
      }
    }, disabled: ruleType === "initial", children: "Add new rule here" })
  ] });
}
function RuleEdit({
  rule,
  applied,
  setRule,
  deleteRule
}) {
  return /* @__PURE__ */ jsxs("fieldset", { children: [
    /* @__PURE__ */ jsx("legend", { children: applied ? /* @__PURE__ */ jsxs("strong", { title: "Applied on this page", children: [
      "✅ ",
      rule.type
    ] }) : /* @__PURE__ */ jsxs("span", { title: "Not applied on this page", children: [
      "❌ ",
      rule.type
    ] }) }),
    /* @__PURE__ */ jsx(PredicateEdit, { predicate: rule.predicate, setPredicate: (predicate) => setRule({
      ...rule,
      predicate
    }) }),
    rule.type === "loginForm" ? /* @__PURE__ */ jsx(LoginRuleEdit, { rule, setRule }) : rule.type === "registrationForm" ? /* @__PURE__ */ jsx(RegistrationRuleEdit, { rule, setRule }) : rule.type === "formKindHint" ? /* @__PURE__ */ jsx(FormKindHintRuleEdit, { rule, setRule }) : rule.type === "noForm" ? (
      // Rule of type 'noForm'  has no editable properties
      /* @__PURE__ */ jsx(Fragment, {})
    ) : assertExhaustive(),
    /* @__PURE__ */ jsx("button", { type: "button", onClick: deleteRule, children: "Delete rule" })
  ] });
}
function LoginRuleEdit({
  rule,
  setRule
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
      /* @__PURE__ */ jsx("input", { type: "checkbox", checked: rule.selectors !== null, onChange: (e) => setRule({
        ...rule,
        selectors: e.target.checked ? rule.selectors ?? emptyLoginSelectors : null
      }) }),
      " ",
      "Has login form"
    ] }) }),
    rule.selectors !== null && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(SelectorEdit, { name: "Username", selector: rule.selectors.usernameElement, setSelector: (s) => rule.selectors && setRule({
        ...rule,
        selectors: {
          ...rule.selectors,
          usernameElement: s
        }
      }), tagNames: ["input"] }),
      /* @__PURE__ */ jsx(SelectorEdit, { name: "Password", selector: rule.selectors.passwordElement, setSelector: (s) => rule.selectors && setRule({
        ...rule,
        selectors: {
          ...rule.selectors,
          passwordElement: s
        }
      }), tagNames: ["input"] }),
      /* @__PURE__ */ jsx(SelectorEdit, { name: "Totp", selector: Array.isArray(rule.selectors.totpElements) ? "" : rule.selectors.totpElements, setSelector: (s) => rule.selectors && setRule({
        ...rule,
        selectors: {
          ...rule.selectors,
          totpElements: s
        }
      }), tagNames: ["input"] }),
      /* @__PURE__ */ jsx(SelectorEdit, { name: "Form", selector: rule.selectors.formElement, setSelector: (s) => rule.selectors && setRule({
        ...rule,
        selectors: {
          ...rule.selectors,
          formElement: s
        }
      }), tagNames: ["form"] }),
      /* @__PURE__ */ jsx(SelectorEdit, { name: "Submit", selector: rule.selectors.submitElement, setSelector: (s) => rule.selectors && setRule({
        ...rule,
        selectors: {
          ...rule.selectors,
          submitElement: s
        }
      }), tagNames: ["input", "button"] }),
      /* @__PURE__ */ jsx(SelectorEdit, { name: "Stay logged in", selector: rule.selectors.stayLoggedInElement, setSelector: (s) => rule.selectors && setRule({
        ...rule,
        selectors: {
          ...rule.selectors,
          stayLoggedInElement: s
        }
      }), tagNames: ["input"] })
    ] })
  ] });
}
function RegistrationRuleEdit({
  rule,
  setRule
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
      /* @__PURE__ */ jsx("input", { type: "checkbox", checked: rule.selectors !== null, onChange: (e) => setRule({
        ...rule,
        selectors: e.target.checked ? rule.selectors ?? emptyRegistrationSelectors : null
      }) }),
      " ",
      "Has registration form"
    ] }) }),
    rule.selectors !== null && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(SelectorEdit, { name: "Username", selector: rule.selectors.usernameElement, setSelector: (s) => rule.selectors && setRule({
        ...rule,
        selectors: {
          ...rule.selectors,
          usernameElement: s
        }
      }), tagNames: ["input"] }),
      /* @__PURE__ */ jsx(SelectorEdit, { name: "Password", selector: rule.selectors.passwordElement, setSelector: (s) => rule.selectors && setRule({
        ...rule,
        selectors: {
          ...rule.selectors,
          passwordElement: s
        }
      }), tagNames: ["input"] }),
      /* @__PURE__ */ jsx(SelectorEdit, { name: "Repeat PW", selector: rule.selectors.repeatPasswordElement, setSelector: (s) => rule.selectors && setRule({
        ...rule,
        selectors: {
          ...rule.selectors,
          repeatPasswordElement: s
        }
      }), tagNames: ["input"] }),
      /* @__PURE__ */ jsx(SelectorEdit, { name: "Form", selector: rule.selectors.formElement, setSelector: (s) => rule.selectors && setRule({
        ...rule,
        selectors: {
          ...rule.selectors,
          formElement: s
        }
      }), tagNames: ["form"] }),
      /* @__PURE__ */ jsx(SelectorEdit, { name: "Submit", selector: rule.selectors.submitElement, setSelector: (s) => rule.selectors && setRule({
        ...rule,
        selectors: {
          ...rule.selectors,
          submitElement: s
        }
      }), tagNames: ["input", "button"] })
    ] })
  ] });
}
function FormKindHintRuleEdit({
  rule,
  setRule
}) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { children: [
    "Form kind:",
    " ",
    /* @__PURE__ */ jsx("select", { value: rule.kind, onChange: (e) => setRule({
      ...rule,
      kind: e.currentTarget.value
    }), children: ["login", "registration"].map((kind) => /* @__PURE__ */ jsx("option", { value: kind, children: kind }, kind)) })
  ] }) }) });
}
function SelectorEdit({
  name,
  selector,
  setSelector,
  tagNames
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("label", { children: [
      /* @__PURE__ */ jsx("input", { type: "checkbox", checked: selector !== null, onChange: (e) => setSelector(e.currentTarget.checked ? "" : null), title: "Element exists" }),
      " ",
      /* @__PURE__ */ jsxs("span", { style: {
        display: "inline-block",
        width: "7.5rem"
      }, children: [
        name,
        ":"
      ] })
    ] }),
    " ",
    /* @__PURE__ */ jsx(SelectorInput, { selector: selector ?? "", disabled: selector === null, setSelector, tagNames })
  ] });
}
function OverrideCreateOverlay({
  appliedInfo,
  hostname,
  override,
  selectElementState,
  selectorResults,
  overrideIsReplace,
  setIntrinsicSize,
  setOverride,
  setSelectElementState,
  deleteOverride,
  replaceOverride,
  setAlign,
  align
}) {
  const overrideOrDefault = reactExports.useMemo(() => override ?? {
    id: newUuid(),
    status: WebpageOverrideStatus.hotfix,
    hostnameContains: hostname ?? "",
    rules: []
  }, [hostname, override]);
  const hasHostnameContains = "hostnameContains" in overrideOrDefault && typeof overrideOrDefault.hostnameContains === "string";
  const addRuleAtIndex = reactExports.useCallback((rule, index) => {
    const rules = [...overrideOrDefault.rules];
    rules.splice(index, 0, rule);
    setOverride({
      ...overrideOrDefault,
      rules
    });
  }, [overrideOrDefault, setOverride]);
  const [rootRef, size] = he();
  reactExports.useEffect(() => {
    if (size.width > 0 && size.height > 0) {
      setIntrinsicSize(size);
    }
  }, [setIntrinsicSize, size]);
  const handleReplace = useErrorHandlingCallback(async () => {
    if (!override) {
      return;
    }
    await replaceOverride(override);
    setOverride(void 0);
  }, [override, replaceOverride, setOverride]);
  const handleDelete = useErrorHandlingCallback(async () => {
    if (!override) {
      return;
    }
    await deleteOverride(override.id);
    setOverride(void 0);
  }, [override, deleteOverride, setOverride]);
  return /* @__PURE__ */ jsx(SelectorContextProvider, { selectorResults, selectElementState, setSelectElementState, children: /* @__PURE__ */ jsxs("main", { ref: rootRef, className: styles$5.OverrideCreateOverlay, children: [
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsxs("h3", { children: [
        overrideIsReplace ? "Edit override" : "Create override",
        " ",
        /* @__PURE__ */ jsx("button", { onClick: () => setAlign(align === "left" ? "right" : "left"), children: align === "left" ? "Move overlay right" : "Move overlay left" })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("button", { type: "button", disabled: !override, onClick: handleReplace, children: overrideIsReplace ? "Replace existing override" : "Upload new override" }),
        " ",
        /* @__PURE__ */ jsx("button", { type: "button", disabled: !override || !overrideIsReplace, onClick: handleDelete, children: "Delete override" }),
        " ",
        /* @__PURE__ */ jsx("button", { type: "button", disabled: !override, onClick: () => {
          if (
            // eslint-disable-next-line no-restricted-globals
            confirm("The override in creation will be discarded. Continue?")
          ) {
            setOverride(void 0);
          }
        }, children: overrideIsReplace ? "Discard changes" : "Discard new override" })
      ] }),
      override && /* @__PURE__ */ jsx("p", { children: overrideIsReplace ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "Replacing override with id ",
        /* @__PURE__ */ jsx("code", { children: override.id })
      ] }) : /* @__PURE__ */ jsx(Fragment, { children: "Creating new override" }) }),
      /* @__PURE__ */ jsx("p", { children: (appliedInfo == null ? void 0 : appliedInfo.override.id) === (overrideOrDefault == null ? void 0 : overrideOrDefault.id) ? /* @__PURE__ */ jsx("strong", { children: "✅ This override is active" }) : appliedInfo ? /* @__PURE__ */ jsxs("span", { children: [
        "❌ Another override is active",
        " ",
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
          if (!override || // eslint-disable-next-line no-restricted-globals
          confirm("This will discard the override you're currently creating/editing.")) {
            setOverride(appliedInfo.override);
          }
        }, children: "Edit" }),
        /* @__PURE__ */ jsx("br", {}),
        "Id: ",
        /* @__PURE__ */ jsx("code", { children: appliedInfo.override.id }),
        "hostnameContains" in appliedInfo.override && /* @__PURE__ */ jsxs(Fragment, { children: [
          " ",
          ", hostnameContains: ",
          /* @__PURE__ */ jsx("code", { children: appliedInfo.override.hostnameContains })
        ] })
      ] }) : /* @__PURE__ */ jsx("span", { children: "⏺️ No override active" }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h4", { children: "Override properties" }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsxs("label", { children: [
        /* @__PURE__ */ jsx("input", { type: "checkbox", checked: overrideOrDefault.status === WebpageOverrideStatus.hotfix, onChange: (e) => setOverride({
          ...overrideOrDefault,
          status: e.currentTarget.checked ? WebpageOverrideStatus.hotfix : void 0
        }) }),
        " ",
        "Hotfix"
      ] }) }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: overrideOrDefault.comment !== void 0, onChange: (e) => setOverride({
            ...overrideOrDefault,
            comment: e.currentTarget.checked ? "" : void 0
          }) }),
          " ",
          "Comment"
        ] }),
        /* @__PURE__ */ jsx(CommentEdit, { setOverride, overrideOrDefault })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h4", { children: "Webpage Conditions" }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("em", { children: "Either a hostname contains or a predicate must be present." }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: hasHostnameContains, onChange: (e) => {
            setOverride(e.currentTarget.checked ? {
              ...overrideOrDefault,
              hostnameContains: hasHostnameContains && "hostnameContains" in overrideOrDefault ? overrideOrDefault.hostnameContains : hostname ?? ""
            } : withDeleteProperty({
              ...overrideOrDefault,
              predicate: overrideOrDefault.predicate ?? {
                type: "elementExists",
                selector: ""
              }
            }, "hostnameContains"));
          } }),
          " ",
          "Filter by hostname contains"
        ] }),
        ":",
        " ",
        /* @__PURE__ */ jsx("input", { type: "text", value: hasHostnameContains && "hostnameContains" in overrideOrDefault ? overrideOrDefault.hostnameContains : "", onChange: (e) => setOverride({
          ...overrideOrDefault,
          hostnameContains: e.currentTarget.value
        }), disabled: !hasHostnameContains, placeholder: "example.org" })
      ] }),
      /* @__PURE__ */ jsx(PredicateEdit, { predicate: overrideOrDefault.predicate, setPredicate: (p) => setOverride(p ? {
        ...overrideOrDefault,
        predicate: p
      } : withDeleteProperty({
        ...overrideOrDefault,
        hostnameContains: "hostnameContains" in overrideOrDefault ? overrideOrDefault.hostnameContains : ""
      }, "predicate")) })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h4", { children: "Rules" }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("em", { children: "Rules are evaluated from top to bottom." }) }),
      overrideOrDefault.rules.map((rule, i) => /* @__PURE__ */ jsxs(reactExports.Fragment, { children: [
        /* @__PURE__ */ jsx(RuleCreate, { addRule: (r) => addRuleAtIndex(r, i) }),
        /* @__PURE__ */ jsx(RuleEdit, { rule, applied: (appliedInfo == null ? void 0 : appliedInfo.override.id) === overrideOrDefault.id && appliedInfo.ruleIndexes.includes(i), setRule: (r) => {
          const rules = [...overrideOrDefault.rules];
          rules.splice(i, 1, r);
          setOverride({
            ...overrideOrDefault,
            rules
          });
        }, deleteRule: () => {
          const rules = [...overrideOrDefault.rules];
          rules.splice(i, 1);
          setOverride({
            ...overrideOrDefault,
            rules
          });
        } })
      ] }, i)),
      /* @__PURE__ */ jsx(RuleCreate, { addRule: (r) => addRuleAtIndex(r, overrideOrDefault.rules.length) })
    ] })
  ] }) });
}
function CommentEdit({
  setOverride,
  overrideOrDefault
}) {
  const [commentInEdit, setCommentInEdit] = reactExports.useState();
  const updateCommentDebounced = reactExports.useMemo(() => debounce(100, (comment) => {
    setOverride({
      ...overrideOrDefault,
      comment
    });
  }), [overrideOrDefault, setOverride]);
  if (overrideOrDefault.comment === void 0) {
    return null;
  }
  return /* @__PURE__ */ jsx("textarea", { value: commentInEdit ?? overrideOrDefault.comment, onChange: (e) => {
    const comment = e.currentTarget.value;
    setCommentInEdit(comment);
    updateCommentDebounced(comment);
  }, onFocus: () => {
    setCommentInEdit(overrideOrDefault.comment);
  }, onBlur: () => {
    if (commentInEdit !== void 0) {
      updateCommentDebounced(commentInEdit);
    }
    setCommentInEdit(void 0);
  } });
}
function withDeleteProperty(obj, k) {
  const newObj = {
    ...obj
  };
  delete newObj[k];
  return newObj;
}
const overrideCreateIframeStateDescriptor = {
  mode: "overrideCreate",
  initialState: {
    override: void 0,
    intrinsicSize: {
      width: 0,
      height: 0
    },
    selectorResults: {},
    overrideIsReplace: false,
    align: "left"
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "setOverride":
        return {
          ...state,
          override: action.override
        };
      case "setIntrinsicSize":
        return {
          ...state,
          intrinsicSize: action.size
        };
      case "setSelectElementState":
        return {
          ...state,
          selectElementState: action.selectElementState
        };
      case "setAlign":
        return {
          ...state,
          align: action.align
        };
    }
  }
};
function OverrideCreateOverlayContainer() {
  const port = useContentScriptConnection();
  const {
    iframeState,
    dispatch
  } = useIframeState(port, overrideCreateIframeStateDescriptor);
  const setOverride = useDispatchSetter(dispatch, (override) => ({
    type: "setOverride",
    override
  }));
  const setIntrinsicSize = useDispatchSetter(dispatch, (size) => ({
    type: "setIntrinsicSize",
    size
  }));
  const setSelectElementState = useDispatchSetter(dispatch, (selectElementState) => ({
    type: "setSelectElementState",
    selectElementState
  }));
  const replaceOverride = reactExports.useCallback(async (override) => {
    await sendMessage({
      type: "ReplaceOverrides",
      overrides: [override]
    });
  }, []);
  const deleteOverride = reactExports.useCallback(async (overrideId) => {
    await sendMessage({
      type: "DeleteOverrides",
      overrideIds: [overrideId]
    });
  }, []);
  const setAlign = useDispatchSetter(dispatch, (align) => ({
    type: "setAlign",
    align
  }));
  return /* @__PURE__ */ jsx(OverrideCreateOverlay, { appliedInfo: iframeState.appliedInfo, hostname: iframeState.hostname, override: iframeState.override, selectElementState: iframeState.selectElementState, selectorResults: iframeState.selectorResults, overrideIsReplace: iframeState.overrideIsReplace, setIntrinsicSize, setOverride, setSelectElementState, replaceOverride, deleteOverride, setAlign, align: iframeState.align });
}
const Content$1 = "_Content_1sfem_1";
const PasswordGenerator$1 = "_PasswordGenerator_1sfem_13";
const TargetSelectorGroup = "_TargetSelectorGroup_1sfem_19";
const ToLabel = "_ToLabel_1sfem_26";
const TargetSelector = "_TargetSelector_1sfem_19";
const styles$4 = {
  Content: Content$1,
  PasswordGenerator: PasswordGenerator$1,
  TargetSelectorGroup,
  ToLabel,
  TargetSelector
};
const SvgClose = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 6.962, height: 6.962, viewBox: "0 0 6.962 6.962", ...props }, /* @__PURE__ */ reactExports.createElement("g", { transform: "translate(0.354 0.354)" }, /* @__PURE__ */ reactExports.createElement("line", { stroke: "#282846", x2: 6.255, y2: 6.255 }), /* @__PURE__ */ reactExports.createElement("line", { stroke: "#282846", x1: 6.255, y2: 6.255 })));
const SvgEyeOff = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24.5, height: 20.995, viewBox: "0 0 24.5 20.995", ...props }, /* @__PURE__ */ reactExports.createElement("path", { d: "M14.5,8.918a5.554,5.554,0,0,1,5.571,5.528,5.317,5.317,0,0,1-.4,2.023l3.253,3.226a13.071,13.071,0,0,0,3.822-5.249A13.194,13.194,0,0,0,10.058,6.928l2.406,2.389A5.509,5.509,0,0,1,14.5,8.918ZM3.365,5.905,5.908,8.426l.514.508A13.008,13.008,0,0,0,2.25,14.445,13.214,13.214,0,0,0,19.38,21.8l.47.465L23.114,25.5,24.53,24.09,4.776,4.5Zm6.156,6.107,1.728,1.711a3.132,3.132,0,0,0-.087.716A3.324,3.324,0,0,0,14.5,17.753a3.142,3.142,0,0,0,.722-.087l1.728,1.711a5.542,5.542,0,0,1-8.021-4.943A5.461,5.461,0,0,1,9.522,12.012Zm4.8-.858,3.51,3.483.022-.175a3.324,3.324,0,0,0-3.341-3.313Z", transform: "translate(-2.25 -4.5)" }));
const SvgEye = (props) => /* @__PURE__ */ reactExports.createElement("svg", { id: "svg845", viewBox: "0 0 24.5 20.995", height: 20.995, width: 24.5, ...props }, /* @__PURE__ */ reactExports.createElement("defs", { id: "defs849" }), /* @__PURE__ */ reactExports.createElement("path", { style: {
  display: "inline",
  strokeWidth: 1.02955
}, d: "M 12.248515,1.6921259 A 13.170988,13.170988 0 0 0 -3e-7,9.9459999 a 13.2132,13.2132 0 0 0 24.4960003,0 13.170988,13.170988 0 0 0 -12.247485,-8.253874 z m 0,13.7629771 a 5.5060146,5.5060146 0 1 1 5.565728,-5.5091031 5.5523442,5.5523442 0 0 1 -5.565728,5.5080741 z m 0,-8.8087991 a 3.3027851,3.3027851 0 1 0 3.340878,3.299696 3.332642,3.332642 0 0 0 -3.340878,-3.299696 z", id: "path833" }));
const SvgPasswordGeneratorPillImage = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 60.664, height: 16.543, viewBox: "0 0 16.051 4.377", ...props }, /* @__PURE__ */ reactExports.createElement("path", { d: "M.522 3.87L1.56 2.445 0 1.98l.243-.775 1.56.574L1.758 0h.785l-.051 1.809 1.54-.574.237.79-1.586.471 1.018 1.4-.64.481-.957-1.488-.935 1.452zm5.891 0l1.039-1.426-1.56-.465.242-.775 1.56.574L7.649 0h.786l-.052 1.809 1.54-.574.238.79-1.587.471 1.018 1.4-.64.481-.957-1.488L7.06 4.34zm5.891 0l1.039-1.426-1.56-.465.242-.775 1.56.574L13.54 0h.786l-.052 1.809 1.54-.574.238.79-1.587.471 1.018 1.4-.64.481-.957-1.488-.935 1.452z", "aria-label": "Password" }));
const PasswordFieldOverlay$1 = "_PasswordFieldOverlay_1dolc_1";
const Info = "_Info_1dolc_5";
const successBackground = "_successBackground_1dolc_20";
const SecurePasswordPill = "_SecurePasswordPill_1dolc_24 _UnstyledButton_qo5hw_20";
const HeyloginIcon$1 = "_HeyloginIcon_1dolc_40";
const PillText = "_PillText_1dolc_44";
const EyeIcon = "_EyeIcon_1dolc_55";
const Close = "_Close_1dolc_62";
const styles$3 = {
  PasswordFieldOverlay: PasswordFieldOverlay$1,
  Info,
  successBackground,
  SecurePasswordPill,
  HeyloginIcon: HeyloginIcon$1,
  PillText,
  EyeIcon,
  Close
};
function PasswordFieldOverlay({
  children,
  eyeIcon,
  passwordFieldHeight,
  passwordFieldWidth,
  pillText,
  spinner,
  successBackground: successBackground2,
  onButtonClick,
  onClose,
  onResize
}) {
  const [sizeRoot, size] = he();
  reactExports.useEffect(() => {
    if (onResize) {
      onResize(size);
    }
  }, [onResize, size]);
  const infoFontSizeRem = reactExports.useMemo(() => {
    const baseSize = Math.min(passwordFieldWidth / 300, passwordFieldHeight / 50);
    return Math.min(Math.max(baseSize, 0.7), 1.25);
  }, [passwordFieldHeight, passwordFieldWidth]);
  return /* @__PURE__ */ jsxs("div", { className: styles$3.PasswordFieldOverlay, ref: sizeRoot, style: {
    minWidth: `${passwordFieldWidth}px`
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: classNames(styles$3.Info, {
      [styles$3.successBackground]: successBackground2
    }), style: {
      minHeight: `${passwordFieldHeight}px`,
      fontSize: `${infoFontSizeRem}rem`
    }, children: [
      /* @__PURE__ */ jsxs("button", { type: "button", className: styles$3.SecurePasswordPill, onClick: onButtonClick, children: [
        spinner ? /* @__PURE__ */ jsx($t, { size: "1.5em" }) : /* @__PURE__ */ jsx(SvgHeyloginIcon, { className: styles$3.HeyloginIcon }),
        /* @__PURE__ */ jsx("span", { className: styles$3.PillText, children: pillText ?? /* @__PURE__ */ jsx(SvgPasswordGeneratorPillImage, {}) }),
        eyeIcon === "off" ? /* @__PURE__ */ jsx(SvgEyeOff, { className: styles$3.EyeIcon }) : eyeIcon === "on" ? /* @__PURE__ */ jsx(SvgEye, { className: styles$3.EyeIcon }) : null
      ] }),
      onClose && /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: styles$3.Close, children: /* @__PURE__ */ jsx(SvgClose, { "aria-label": "Close" }) })
    ] }),
    children
  ] });
}
function usePillText({
  passwordInsertedTimestampMs,
  generatorExpanded,
  passwordFieldWidth,
  strengthIndication,
  strengthIndicationFallback
}) {
  const [animationStep, setAnimationStep] = reactExports.useState();
  reactExports.useEffect(() => {
    async function runAnimation(offset) {
      setAnimationStep("generating");
      await sleep(offset + 700);
      setAnimationStep("done");
    }
    if (passwordInsertedTimestampMs && !animationStep) {
      runAnimation(passwordInsertedTimestampMs - Date.now()).catch(trackError);
    }
  }, [animationStep, passwordInsertedTimestampMs]);
  if (animationStep === "generating") {
    return {
      pillText: i18n._(
        /*i18n*/
        {
          id: "ziAjHi"
        }
      ),
      spinner: true
    };
  }
  if (!passwordInsertedTimestampMs || !animationStep) {
    return {
      pillText: i18n._(
        /*i18n*/
        {
          id: "ziAjHi"
        }
      )
    };
  }
  const eyeIcon = generatorExpanded ? "off" : "on";
  if (passwordFieldWidth < 200) {
    return {
      eyeIcon,
      generatorStrengthIndication: strengthIndication,
      successBackground: true
    };
  }
  if (!strengthIndication) {
    return {
      eyeIcon,
      pillText: strengthIndicationFallback,
      successBackground: true
    };
  }
  return {
    eyeIcon,
    pillText: strengthIndication,
    successBackground: true
  };
}
function MainPasswordFieldOverlay({
  setPassword,
  initialPassword,
  passwordInsertedTimestampMs,
  generatorExpanded,
  onButtonClick,
  passwordGeneratorSettings,
  savePasswordGeneratorSettings,
  autosnatchTargetOptions,
  autosnatchTarget,
  autosnatchTargetOverride,
  setAutosnatchTarget,
  setAutosnatchTargetOverride,
  ...fieldProps
}) {
  const {
    strengthIndication,
    ...passwordGeneration
  } = yo({
    initialValue: initialPassword,
    initialSettings: passwordGeneratorSettings,
    onChange: setPassword
  });
  const {
    generatorStrengthIndication,
    ...pillTextProps
  } = usePillText({
    passwordInsertedTimestampMs,
    generatorExpanded,
    passwordFieldWidth: fieldProps.passwordFieldWidth,
    strengthIndication,
    strengthIndicationFallback: i18n._(
      /*i18n*/
      {
        id: "8ZsakT"
      }
    )
  });
  return /* @__PURE__ */ jsx(PasswordFieldOverlay, { ...fieldProps, onButtonClick, ...pillTextProps, children: generatorExpanded && /* @__PURE__ */ jsxs("div", { className: styles$4.Content, children: [
    /* @__PURE__ */ jsx(qt, { ...passwordGeneration, hideButtons: true, oldPassword: void 0, writeToClipboard: (value) => fieldProps.writeToClipboard(value, true), className: styles$4.PasswordGenerator, strengthIndication: generatorStrengthIndication ?? null, hideNewPasswordLabel: true, saveSettings: savePasswordGeneratorSettings, savedSettings: passwordGeneratorSettings }),
    autosnatchTargetOptions && shouldShowAutosnatchTargetSelector(autosnatchTargetOptions) && /* @__PURE__ */ jsxs("div", { className: styles$4.TargetSelectorGroup, children: [
      /* @__PURE__ */ jsx("div", { className: styles$4.ToLabel, children: /* @__PURE__ */ jsx(Trans, { id: "TRo55K" }) }),
      /* @__PURE__ */ jsx(AutosnatchTargetSelector, { className: styles$4.TargetSelector, autosnatchTarget, autosnatchTargetOverride, setAutosnatchTargetOverride, autosnatchTargetOptions, setAutosnatchTarget })
    ] })
  ] }) });
}
function RepeatedPasswordFieldOverlay(props) {
  const pillProps = usePillText({
    passwordInsertedTimestampMs: props.passwordInsertedTimestampMs,
    generatorExpanded: props.generatorExpanded,
    passwordFieldWidth: props.passwordFieldWidth,
    strengthIndication: null,
    strengthIndicationFallback: i18n._(
      /*i18n*/
      {
        id: "WmGifL"
      }
    )
  });
  return /* @__PURE__ */ jsx(PasswordFieldOverlay, { ...props, ...pillProps });
}
const passwordGeneratorIframeStateDescriptor = {
  mode: "passwordGenerator",
  initialState: {
    hidden: false,
    intrinsicSize: {
      width: 0,
      height: 0
    },
    expanded: false,
    insertInitialPassword: false
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "setIntrinsicSize":
        return {
          ...state,
          intrinsicSize: action.size
        };
      case "setHidden":
        return {
          ...state,
          hidden: action.hidden
        };
      case "setAutosnatchTargetOverride":
        return {
          ...state,
          autosnatchTargetOverride: action.autosnatchTargetOverride
        };
      case "setGeneratedPassword":
        return {
          ...state,
          generatedPassword: action.generatedPassword
        };
      case "setExpanded":
        return {
          ...state,
          expanded: action.expanded
        };
      case "writeToClipboard":
        return state;
    }
  }
};
const repeatPasswordIframeStateDescriptor = {
  mode: "repeatPassword",
  initialState: {
    intrinsicSize: {
      width: 0,
      height: 0
    },
    expanded: false
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "setIntrinsicSize":
        return {
          ...state,
          intrinsicSize: action.size
        };
      case "setExpanded":
        return {
          ...state,
          expanded: action.expanded
        };
      case "hide":
      case "insertPassword":
        return state;
    }
  }
};
function PasswordFieldOverlayContainer({
  showGenerator
}) {
  const port = useContentScriptConnection();
  const {
    width: passwordFieldWidth,
    height: passwordFieldHeight
  } = useExtrinsicIframeSize();
  if (!port) {
    return null;
  }
  return showGenerator ? /* @__PURE__ */ jsx(PasswordGenerator, { port, passwordFieldHeight, passwordFieldWidth }) : /* @__PURE__ */ jsx(RepeatedPassword, { port, passwordFieldHeight, passwordFieldWidth });
}
function PasswordGenerator({
  port,
  ...fieldProps
}) {
  const {
    iframeState,
    dispatch
  } = useIframeState(port, passwordGeneratorIframeStateDescriptor);
  const setIntrinsicSize = useDispatchSetter(dispatch, (size) => ({
    type: "setIntrinsicSize",
    size
  }));
  const setHidden = useDispatchSetter(dispatch, (hidden2) => ({
    type: "setHidden",
    hidden: hidden2
  }));
  const setAutosnatchTargetOverride = useDispatchSetter(dispatch, (autosnatchTargetOverride) => ({
    type: "setAutosnatchTargetOverride",
    autosnatchTargetOverride
  }));
  const setExpanded = useDispatchSetter(dispatch, (expanded2) => ({
    type: "setExpanded",
    expanded: expanded2
  }));
  const setGeneratedPassword = useDispatchSetter(dispatch, (generatedPassword) => ({
    type: "setGeneratedPassword",
    generatedPassword
  }));
  const passwordInsertedTimestampMs = iframeState.passwordInsertedTimestampMs;
  const generatorExpanded = iframeState.expanded;
  const {
    passwordGeneratorSettings,
    savePasswordGeneratorSettings
  } = usePasswordGeneratorSettings();
  const initialPassword = reactExports.useMemo(() => passwordGeneratorSettings === void 0 ? void 0 : dn(passwordGeneratorSettings), [passwordGeneratorSettings]);
  const setPassword = reactExports.useMemo(() => debounce(1e3, setGeneratedPassword), [setGeneratedPassword]);
  reactExports.useEffect(() => {
    if (iframeState.insertInitialPassword && initialPassword && passwordInsertedTimestampMs === void 0) {
      setGeneratedPassword(initialPassword);
    }
  }, [iframeState.insertInitialPassword, initialPassword, passwordInsertedTimestampMs, setGeneratedPassword]);
  const writeToClipboard = reactExports.useCallback((text, clearAfterTimeout) => {
    dispatch({
      type: "writeToClipboard",
      text,
      clearAfterTimeout
    });
  }, [dispatch]);
  const autosnatchSettings = useAutosnatchSettings();
  const overrideProps = useAutosnatchTargetOverride(iframeState.autosnatchTargetOverride, setAutosnatchTargetOverride);
  return /* @__PURE__ */ jsx(Fragment, { children: initialPassword !== void 0 && passwordGeneratorSettings !== void 0 && /* @__PURE__ */ jsx(MainPasswordFieldOverlay, { initialPassword, setPassword, writeToClipboard, generatorExpanded, passwordInsertedTimestampMs, passwordGeneratorSettings, savePasswordGeneratorSettings, onButtonClick: passwordInsertedTimestampMs ? () => setExpanded(!generatorExpanded) : () => {
    setGeneratedPassword(initialPassword);
  }, onResize: setIntrinsicSize, onClose: () => setHidden(true), ...fieldProps, ...autosnatchSettings, ...overrideProps }) });
}
function RepeatedPassword({
  port,
  ...fieldProps
}) {
  const {
    iframeState,
    dispatch
  } = useIframeState(port, repeatPasswordIframeStateDescriptor);
  const generatorExpanded = iframeState.expanded;
  const passwordInsertedTimestampMs = iframeState.passwordInsertedTimestampMs;
  const setIntrinsicSize = useDispatchSetter(dispatch, (size) => ({
    type: "setIntrinsicSize",
    size
  }));
  const setExpanded = useDispatchSetter(dispatch, (expanded2) => ({
    type: "setExpanded",
    expanded: expanded2
  }));
  return /* @__PURE__ */ jsx(RepeatedPasswordFieldOverlay, { ...fieldProps, onResize: setIntrinsicSize, onClose: () => dispatch({
    type: "hide"
  }), onButtonClick: () => passwordInsertedTimestampMs ? setExpanded(!generatorExpanded) : dispatch({
    type: "insertPassword"
  }), generatorExpanded, passwordInsertedTimestampMs });
}
function usePasswordGeneratorSettings() {
  const [settings, setSettings] = reactExports.useState();
  const savePasswordGeneratorSettings = reactExports.useCallback((s) => {
    sendMessage({
      type: "SavePasswordGeneratorSettings",
      settings: s
    }).catch(trackError);
  }, []);
  reactExports.useEffect(() => {
    const updateSettings = async () => {
      const resp = await sendMessage({
        type: "GetPasswordGeneratorSettings"
      });
      if (resp !== messageError && resp) {
        setSettings(resp.settings);
      }
    };
    updateSettings().catch(trackError);
  }, []);
  return {
    passwordGeneratorSettings: settings,
    savePasswordGeneratorSettings
  };
}
const totpInputIframeStateDescriptor = {
  mode: "totpInput",
  initialState: {
    expanded: false,
    overlayGeometry: void 0,
    logins: [],
    intrinsicSize: {
      width: 0,
      height: 0
    },
    selectedLoginId: void 0
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "setExpanded":
        return {
          ...state,
          expanded: action.expanded
        };
      case "setIntrinsicSize":
        return {
          ...state,
          intrinsicSize: action.size
        };
      case "setSelectedLoginId":
        return {
          ...state,
          selectedLoginId: action.selectedLoginId
        };
    }
  }
};
const SvgArrowRight = (props) => /* @__PURE__ */ reactExports.createElement("svg", { width: 23, height: 23, viewBox: "0 0 23 23", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ reactExports.createElement("g", { id: "bi:arrow-right" }, /* @__PURE__ */ reactExports.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M1.4375 11.4999C1.4375 11.3093 1.51323 11.1265 1.64802 10.9917C1.78281 10.8569 1.96563 10.7812 2.15625 10.7812H19.1087L14.5849 6.25881C14.4499 6.12384 14.3741 5.9408 14.3741 5.74993C14.3741 5.55907 14.4499 5.37602 14.5849 5.24106C14.7198 5.10609 14.9029 5.03027 15.0937 5.03027C15.2846 5.03027 15.4677 5.10609 15.6026 5.24106L21.3526 10.9911C21.4196 11.0578 21.4727 11.1371 21.5089 11.2245C21.5451 11.3118 21.5638 11.4054 21.5638 11.4999C21.5638 11.5945 21.5451 11.6881 21.5089 11.7754C21.4727 11.8627 21.4196 11.942 21.3526 12.0088L15.6026 17.7588C15.4677 17.8938 15.2846 17.9696 15.0937 17.9696C14.9029 17.9696 14.7198 17.8938 14.5849 17.7588C14.4499 17.6238 14.3741 17.4408 14.3741 17.2499C14.3741 17.0591 14.4499 16.876 14.5849 16.7411L19.1087 12.2187H2.15625C1.96563 12.2187 1.78281 12.143 1.64802 12.0082C1.51323 11.8734 1.4375 11.6906 1.4375 11.4999Z", fill: "black" })));
const Container = "_Container_1lvga_1";
const Button = "_Button_1lvga_15 _UnstyledButton_qo5hw_20";
const overlayInput = "_overlayInput_1lvga_29";
const rightOfInput = "_rightOfInput_1lvga_42";
const HeyloginIcon = "_HeyloginIcon_1lvga_53";
const Menu$1 = "_Menu_1lvga_58";
const UnlockWrapper = "_UnlockWrapper_1lvga_68";
const EmptyListPlaceholder = "_EmptyListPlaceholder_1lvga_80";
const ListItem = "_ListItem_1lvga_85";
const ListItemButton = "_ListItemButton_1lvga_92 _UnstyledButton_qo5hw_20";
const Label = "_Label_1lvga_105";
const TotpCode = "_TotpCode_1lvga_112";
const ArrowIcon = "_ArrowIcon_1lvga_121";
const styles$2 = {
  Container,
  Button,
  overlayInput,
  rightOfInput,
  HeyloginIcon,
  Menu: Menu$1,
  UnlockWrapper,
  EmptyListPlaceholder,
  ListItem,
  ListItemButton,
  Label,
  TotpCode,
  ArrowIcon
};
function TotpInputOverlay({
  setIntrinsicSize,
  expanded: expanded2,
  setExpanded,
  overlayGeometry,
  ...menuProps
}) {
  const ref = reactExports.useRef(null);
  const [setSizeElement, size] = he();
  reactExports.useEffect(() => {
    setIntrinsicSize(size);
  }, [size, setIntrinsicSize]);
  const multiplexedRef = reactExports.useCallback((el) => {
    setSizeElement(el);
    ref.current = el;
  }, [setSizeElement]);
  return /* @__PURE__ */ jsxs("div", { className: styles$2.Container, ref: multiplexedRef, onClick: (e) => {
    if (e.target === ref.current) {
      setExpanded(false);
    }
  }, children: [
    /* @__PURE__ */ jsxs("button", { onClick: () => setExpanded(!expanded2), className: classNames(styles$2.Button, styles$2[overlayGeometry.type]), style: overlayGeometry.type === "overlayInput" ? {
      "--height": `${overlayGeometry.buttonHeight}px`
    } : void 0, children: [
      /* @__PURE__ */ jsx(SvgHeyloginIcon, { className: styles$2.HeyloginIcon }),
      overlayGeometry.type === "overlayInput" && /* @__PURE__ */ jsx(Trans, { id: "Kvajkr" })
    ] }),
    expanded2 && /* @__PURE__ */ jsx(Menu, { ...menuProps })
  ] });
}
function Menu({
  logins,
  selectLoginAndClose,
  pushState,
  unlockDeviceType
}) {
  const loginsWithTotp = reactExports.useMemo(() => logins.filter((l) => l.totpParameters), [logins]);
  if (pushState && pushState !== "confirmed" && pushState !== "connected") {
    return /* @__PURE__ */ jsx("div", { className: styles$2.Menu, children: /* @__PURE__ */ jsxs("div", { className: styles$2.UnlockWrapper, children: [
      /* @__PURE__ */ jsx(Ki, { small: true, state: pushState, unlockDeviceType }),
      {
        connecting: /* @__PURE__ */ jsx(sp, { unlockDeviceType }),
        error: i18n._(
          /*i18n*/
          {
            id: "zUtMod"
          }
        ),
        warning: i18n._(
          /*i18n*/
          {
            id: "7Bj3x9"
          }
        )
      }[pushState]
    ] }) });
  }
  if (!loginsWithTotp.length) {
    return /* @__PURE__ */ jsx("div", { className: styles$2.Menu, children: /* @__PURE__ */ jsx("div", { className: styles$2.EmptyListPlaceholder, children: /* @__PURE__ */ jsx(Trans, { id: "IL3O8e" }) }) });
  }
  return /* @__PURE__ */ jsx("ul", { className: styles$2.Menu, children: loginsWithTotp.map((login) => /* @__PURE__ */ jsx(MenuListEntry, { login, selectLoginAndClose }, login.id)) });
}
function MenuListEntry({
  login,
  selectLoginAndClose
}) {
  var _a, _b, _c, _d;
  const {
    totp,
    totpPercent
  } = Li((_a = login.totpParameters) == null ? void 0 : _a.secret, (_b = login.totpParameters) == null ? void 0 : _b.algorithm, (_c = login.totpParameters) == null ? void 0 : _c.digits, (_d = login.totpParameters) == null ? void 0 : _d.period);
  return /* @__PURE__ */ jsx("li", { className: styles$2.ListItem, children: /* @__PURE__ */ jsxs("button", { className: styles$2.ListItemButton, type: "button", onClick: () => selectLoginAndClose(login.id), disabled: !totp, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: styles$2.Label, children: login.displayName }),
      /* @__PURE__ */ jsxs("div", { className: styles$2.TotpCode, children: [
        totpPercent !== void 0 && /* @__PURE__ */ jsx(Da, { percent: totpPercent }),
        totp
      ] })
    ] }),
    /* @__PURE__ */ jsx(SvgArrowRight, { className: styles$2.ArrowIcon })
  ] }) });
}
function TotpInputOverlayContainer() {
  const port = useContentScriptConnection();
  const {
    iframeState,
    dispatch
  } = useIframeState(port, totpInputIframeStateDescriptor);
  const {
    requestUnlock,
    cancelLogin,
    pushState,
    unlockDeviceType,
    isUnlocked,
    unlockState
  } = useUnlock({
    achievement: Achievement.EXT_OVERLAY_UNLOCK
  });
  const setExpandedInternal = useDispatchSetter(dispatch, (expanded2) => ({
    type: "setExpanded",
    expanded: expanded2
  }));
  const setIntrinsicSize = useDispatchSetter(dispatch, (size) => ({
    type: "setIntrinsicSize",
    size
  }));
  const setExpanded = reactExports.useCallback((expanded2) => {
    if (expanded2 && !isUnlocked) {
      requestUnlock();
    } else if (!expanded2 && unlockState === "unlocking") {
      cancelLogin();
    }
    setExpandedInternal(expanded2);
  }, [cancelLogin, isUnlocked, requestUnlock, setExpandedInternal, unlockState]);
  const selectLoginAndClose = reactExports.useCallback((loginId) => dispatch({
    type: "setSelectedLoginId",
    selectedLoginId: loginId
  }, {
    type: "setExpanded",
    expanded: false
  }), [dispatch]);
  useCloseOnEscape(() => setExpanded(false));
  if (!iframeState.overlayGeometry || iframeState.logins.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(TotpInputOverlay, { expanded: iframeState.expanded, setExpanded, logins: iframeState.logins, overlayGeometry: iframeState.overlayGeometry, setIntrinsicSize, selectLoginAndClose, unlockDeviceType, pushState });
}
const Content = "_Content_1akao_1";
const TotpCodeContainer = "_TotpCodeContainer_1akao_17";
const TotpValue = "_TotpValue_1akao_25";
const TotpCopy = "_TotpCopy_1akao_34";
const TargetLogin = "_TargetLogin_1akao_39";
const TargetName = "_TargetName_1akao_45";
const Select = "_Select_1akao_54";
const SaveButton = "_SaveButton_1akao_58";
const saved = "_saved_1akao_62";
const styles$1 = {
  Content,
  TotpCodeContainer,
  TotpValue,
  TotpCopy,
  TargetLogin,
  TargetName,
  Select,
  SaveButton,
  saved
};
function TotpQrOverlay({
  logins,
  totpParameters,
  pushState,
  unlockDeviceType,
  addTotpToLogin,
  onResize,
  onClose,
  onCancel,
  copyToClipboardWithClear: copyToClipboardWithClear2
}) {
  var _a;
  const [selectedLoginId, setSelectedLoginId] = reactExports.useState(logins[0].id);
  reactExports.useEffect(() => {
    if (!logins.some(({
      id
    }) => id === selectedLoginId)) {
      setSelectedLoginId(logins[0].id);
    }
  }, [logins, selectedLoginId]);
  const selectedLogin = reactExports.useMemo(() => logins.find(({
    id
  }) => id === selectedLoginId) ?? logins[0], [logins, selectedLoginId]);
  const [saving, setSaving] = reactExports.useState(false);
  const [totpUpdated, setTotpUpdated] = reactExports.useState(false);
  reactExports.useEffect(() => {
    async function updateStatus() {
      var _a2, _b;
      const selectedLoginTotp = ((_a2 = selectedLogin.vaultMetadata) == null ? void 0 : _a2.id) && selectedLogin.totp ? await getUnprotectedValueForVaultWithContentId((_b = selectedLogin.vaultMetadata) == null ? void 0 : _b.id, selectedLogin.totp) : void 0;
      if (saving && (selectedLoginTotp == null ? void 0 : selectedLoginTotp.unencrypted) === totpParameters.secret) {
        setTotpUpdated(true);
      } else if (totpUpdated && (selectedLoginTotp == null ? void 0 : selectedLoginTotp.unencrypted) !== totpParameters.secret) {
        setTotpUpdated(false);
        setSaving(false);
      }
    }
    updateStatus().catch(trackError);
  }, [saving, selectedLogin.totp, (_a = selectedLogin.vaultMetadata) == null ? void 0 : _a.id, totpParameters, totpUpdated]);
  const {
    totp,
    totpPercent,
    totpDigits
  } = Li(totpParameters.secret, totpParameters.algorithm, totpParameters.digits, totpParameters.period);
  const [copied, copy] = useCopyToClipboard(copyToClipboardWithClear2);
  const {
    width: extrinsicWidth
  } = useExtrinsicIframeSize();
  return /* @__PURE__ */ jsx(Ih, { state: pushState, onResize, onClose, onCancel: onCancel ? () => {
    setSaving(false);
    onCancel();
  } : void 0, onRetry: () => {
    addTotpToLogin(selectedLoginId);
    setSaving(true);
  }, cornerBackground: true, cornerBackgroundTransparent: true, unlockDeviceType, children: /* @__PURE__ */ jsxs(ch, { uiStyle: "highlight", className: styles$1.Content, style: {
    // @ts-ignore
    "--extrinsic-width": `${extrinsicWidth}px`
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$1.TargetLogin, children: [
      /* @__PURE__ */ jsx("div", { className: styles$1.TargetName, children: /* @__PURE__ */ jsx(Trans, { id: "6xOPtp" }) }),
      /* @__PURE__ */ jsx("div", { className: styles$1.TargetName, children: logins.length > 1 ? /* @__PURE__ */ jsx(Th, { className: styles$1.Select, onChange: (e) => setSelectedLoginId(e.currentTarget.value), value: selectedLoginId, disabled: totpUpdated, children: logins.map((l) => /* @__PURE__ */ jsx("option", { value: l.id, children: getLoginDisplayLabel(l) ?? /* @__PURE__ */ jsx(Trans, { id: "4QFgr2" }) }, l.id)) }) : getLoginDisplayLabel(selectedLogin) ?? /* @__PURE__ */ jsx(Trans, { id: "4QFgr2" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(be, { buttonStyle: "secondary", size: "small", type: "button", onClick: () => {
      addTotpToLogin(selectedLoginId);
      setSaving(true);
    }, disabled: saving, className: classNames(styles$1.SaveButton, {
      [styles$1.saved]: totpUpdated
    }), children: totpUpdated ? /* @__PURE__ */ jsx(Trans, { id: "idD8Ev" }) : saving ? /* @__PURE__ */ jsx(Trans, { id: "K/F6pa" }) : /* @__PURE__ */ jsx(Trans, { id: "PWU3n3" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: styles$1.TotpCodeContainer, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$1.TotpValue, children: [
        totpUpdated && totp ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { children: totp.substring(0, totpDigits / 2) }),
          /* @__PURE__ */ jsx("span", { children: totp.substring(totpDigits / 2) })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { children: "?".repeat(totpDigits / 2) }),
          /* @__PURE__ */ jsx("span", { children: "?".repeat(totpDigits / 2 + totpDigits % 2) })
        ] }),
        /* @__PURE__ */ jsx(Da, { percent: totpPercent ?? 0, hidden: !(totpPercent && totpUpdated) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$1.TotpCopy, children: /* @__PURE__ */ jsx(ja, { copied, onClick: () => totp && copy(totp), disabled: !totpUpdated }) })
    ] })
  ] }) });
}
const totpQrIframeStateDescriptor = {
  mode: "totpQr",
  initialState: {
    hidden: false,
    intrinsicSize: {
      width: 0,
      height: 0
    }
  },
  reducer: (state, action) => {
    switch (action.type) {
      case "setIntrinsicSize":
        return {
          ...state,
          intrinsicSize: action.size
        };
      case "setHidden":
        return {
          ...state,
          hidden: action.hidden
        };
    }
  }
};
function TotpQrOverlayContainer() {
  const port = useContentScriptConnection();
  const {
    iframeState,
    dispatch
  } = useIframeState(port, totpQrIframeStateDescriptor);
  const setIntrinsicSize = useDispatchSetter(dispatch, (size) => ({
    type: "setIntrinsicSize",
    size
  }));
  const setHidden = useDispatchSetter(dispatch, (hidden2) => ({
    type: "setHidden",
    hidden: hidden2
  }));
  const {
    pushState,
    unlockDeviceType,
    addTotpParametersToLogin,
    cancelLogin
  } = useUnlock({
    achievement: Achievement.EXT_OVERLAY_UNLOCK
  });
  const logins = iframeState.logins;
  const totpParameters = iframeState.totpParameters;
  if (!(logins == null ? void 0 : logins.length) || !totpParameters) {
    return null;
  }
  return /* @__PURE__ */ jsx(TotpQrOverlay, { logins: logins.filter((l) => {
    var _a;
    return ((_a = l.vaultMetadata) == null ? void 0 : _a.id) && l.permissions.editLogin;
  }), totpParameters, addTotpToLogin: (loginId) => {
    const login = logins.find(({
      id
    }) => id === loginId);
    if (!(login == null ? void 0 : login.vaultMetadata)) {
      return;
    }
    return addTotpParametersToLogin(login.id, login.vaultMetadata.id, totpParameters);
  }, onClose: () => setHidden(true), onCancel: cancelLogin, onResize: (width, height) => setIntrinsicSize({
    width,
    height
  }), pushState: pushState === "confirmed" ? null : pushState, unlockDeviceType, copyToClipboardWithClear });
}
function IframeApp() {
  const mode = new URLSearchParams(window.location.search).get("mode");
  if (mode === "passwordGenerator") {
    return /* @__PURE__ */ jsx(PasswordFieldOverlayContainer, { showGenerator: true });
  }
  if (mode === "repeatPassword") {
    return /* @__PURE__ */ jsx(PasswordFieldOverlayContainer, { showGenerator: false });
  }
  if (mode === "login") {
    return /* @__PURE__ */ jsx(LoginOverlay, {});
  }
  if (mode === "autosnatch") {
    return /* @__PURE__ */ jsx(AutosnatchOverlayContainer, {});
  }
  if (mode === "totpQr") {
    return /* @__PURE__ */ jsx(TotpQrOverlayContainer, {});
  }
  if (mode === "overrideCreate") {
    return /* @__PURE__ */ jsx(OverrideCreateOverlayContainer, {});
  }
  if (mode === "totpInput") {
    return /* @__PURE__ */ jsx(TotpInputOverlayContainer, {});
  }
  if (mode === "autosnatchNotification") {
    return /* @__PURE__ */ jsx(AutosnatchNotificationOverlayContainer, {});
  }
  throw new Error("Unknown iframe mode!");
}
const iframe = "_iframe_qo5hw_1";
const UnstyledButton = "_UnstyledButton_qo5hw_20";
const styles = {
  iframe,
  UnstyledButton
};
document.documentElement.classList.add(styles.iframe);
initSentry({
  entryPoint: "contentIframe"
});
initUiLocale();
ReactDOM.render(/* @__PURE__ */ jsx(I18nProvider, { i18n, children: /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(ExtDebugVisibleContextProvider, { children: /* @__PURE__ */ jsx(IframeApp, {}) }) }) }), document.getElementById("root"));
//# sourceMappingURL=wrappedIndex-457eadcb.js.map
