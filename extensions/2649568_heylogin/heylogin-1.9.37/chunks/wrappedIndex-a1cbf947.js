import { am as Bowser, an as m, i as i18n, r as reactExports, a as jsxs, c as classNames, j as jsx, T as Trans, M as Ge, ao as Ah, ae as ch, aa as Ki, ab as sp, s as be, a1 as Fragment, ap as ct, e as getFrontendServerUrl, N as at, ac as Li, g as getValueWithPlaceholder, m as mh, ad as Da, h as ho, P as Ht, aq as qa, af as ja, $ as $h, ar as wh, as as J, _ as _h, at as Ni, ak as debugMode, au as I, D, d as he, av as psl, t as initSentry, v as initUiLocale, b as ReactDOM, w as I18nProvider, R as React, E as ExtDebugVisibleContextProvider } from "./ExtDebugVisibleContext-6460380f.js";
import { b as useCopyToClipboard, s as searchPredicate, a as addAchievement, u as useUnlock, h as getUnprotectedValueForContentLoginWithContentId, c as copyToClipboardWithClear, d as debounce } from "./useUnlock-23c9a9eb.js";
import { A as AuditlogEventType, t as trackError, R as ReportPageProblem, a as Achievement, s as sendMessage, b as browser, c as messageError, m as makeMessageListener, e as sendMessageToTab, d as debugConsole } from "./message-939596d6.js";
import { f as format, b as getHost, c as useClientOutdated, u as useAutosnatchSettings, C as ClientOutdatedMessage } from "./getHost-60a40713.js";
import { i as isEmptyValue } from "./isEmptyValue-338a5af1.js";
import { u as useErrorHandlingCallback } from "./useErrorHandlingCallback-683f360e.js";
const popup = "_popup_w9xap_1";
const UnstyledButton = "_UnstyledButton_w9xap_22";
const styles$a = {
  popup,
  UnstyledButton
};
function isMobileSafari(precomputedBrowser) {
  const browser2 = precomputedBrowser ?? Bowser.parse(navigator.userAgent);
  return browser2.browser.name === "Safari" && browser2.os.name === "iOS" || m(browser2);
}
function isDesktopSafari(precomputedBrowser) {
  const browser2 = precomputedBrowser ?? Bowser.parse(navigator.userAgent);
  return browser2.browser.name === "Safari" && browser2.os.name === "macOS" && !m(browser2);
}
const contentScriptBlockedUrls = [
  // firefox
  "accounts-static.cdn.mozilla.net",
  "accounts.firefox.com",
  "addons.cdn.mozilla.net",
  "addons.mozilla.org",
  "api.accounts.firefox.com",
  "content.cdn.mozilla.net",
  "discovery.addons.mozilla.org",
  "input.mozilla.org",
  "install.mozilla.org",
  "oauth.accounts.firefox.com",
  "profile.accounts.firefox.com",
  "support.mozilla.org",
  "sync.services.mozilla.com",
  "testpilot.firefox.com",
  // chrome, edge
  "chrome.google.com",
  // edge
  "microsoftedge.microsoft.com"
];
function isContentScriptBlockedByBrowser(urlStr) {
  let url;
  try {
    url = new URL(urlStr);
  } catch {
    return false;
  }
  return contentScriptBlockedUrls.some((u) => `.${url.host}`.endsWith(`.${u}`));
}
function getBrowserName(precomputedBowser) {
  const browser2 = precomputedBowser ?? Bowser.parse(navigator.userAgent);
  return browser2.browser.name ?? i18n._(
    /*i18n*/
    {
      id: "AlS6pf"
    }
  );
}
const MobileSafariSetupSuccessMessage = "_MobileSafariSetupSuccessMessage_12ry4_1";
const styles$9 = {
  MobileSafariSetupSuccessMessage
};
const SvgArrowRight = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 10.279, height: 5.053, viewBox: "0 0 10.279 5.053", ...props }, /* @__PURE__ */ reactExports.createElement("path", { className: "b", d: "M7.2,11.867H.275A.275.275,0,0,0,0,12.142v1.285a.275.275,0,0,0,.275.275H7.2v1.057a.551.551,0,0,0,.94.389l1.975-1.975a.551.551,0,0,0,0-.779L8.143,10.421a.551.551,0,0,0-.94.389Z", transform: "translate(0 -10.258)" }));
const SvgReport = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 48, height: 48, viewBox: "0 0 48 48", ...props }, /* @__PURE__ */ reactExports.createElement("path", { d: "M31.46 6H16.54L6 16.54v14.91L16.54 42h14.91L42 31.46V16.54L31.46 6zM24 34.6c-1.43 0-2.6-1.16-2.6-2.6 0-1.43 1.17-2.6 2.6-2.6 1.43 0 2.6 1.16 2.6 2.6 0 1.44-1.17 2.6-2.6 2.6zm2-8.6h-4V14h4v12z" }));
const Footer$1 = "_Footer_1ocdh_1";
const withoutGlobalSearch = "_withoutGlobalSearch_1ocdh_17";
const ManageLink = "_ManageLink_1ocdh_22";
const FooterArrow = "_FooterArrow_1ocdh_26";
const ReportButton = "_ReportButton_1ocdh_33";
const QuickAccessButton = "_QuickAccessButton_1ocdh_59";
const styles$8 = {
  Footer: Footer$1,
  withoutGlobalSearch,
  ManageLink,
  FooterArrow,
  ReportButton,
  QuickAccessButton
};
function Footer({
  manageLink,
  report,
  globalSearchShortcut,
  applePlatform,
  openGlobalSearchWindow
}) {
  return /* @__PURE__ */ jsxs("footer", { className: classNames(styles$8.Footer, {
    [styles$8.withoutGlobalSearch]: !openGlobalSearchWindow
  }), children: [
    manageLink && /* @__PURE__ */ jsxs("a", { href: manageLink, className: styles$8.ManageLink, target: "_blank", rel: "noopener noreferrer", children: [
      /* @__PURE__ */ jsx(Trans, { id: "wckWOP" }),
      " ",
      /* @__PURE__ */ jsx(SvgArrowRight, { className: styles$8.FooterArrow })
    ] }),
    report && /* @__PURE__ */ jsxs("button", { className: styles$8.ReportButton, onClick: report, children: [
      /* @__PURE__ */ jsx(Trans, { id: "13X+48" }),
      /* @__PURE__ */ jsx(SvgReport, {})
    ] }),
    openGlobalSearchWindow && /* @__PURE__ */ jsxs(Ge, { className: styles$8.QuickAccessButton, onClick: openGlobalSearchWindow, children: [
      /* @__PURE__ */ jsx(Trans, { id: "Qf8ECA" }),
      /* @__PURE__ */ jsx(Ah, { shortcut: globalSearchShortcut, small: true, applePlatform, invertColors: true })
    ] })
  ] });
}
const LoginContainer = "_LoginContainer_kp3yu_1";
const isUnlocking = "_isUnlocking_kp3yu_10";
const hasSecurityKeyUnlock = "_hasSecurityKeyUnlock_kp3yu_13";
const UnlockOverlay = "_UnlockOverlay_kp3yu_17";
const error = "_error_kp3yu_38";
const warning$1 = "_warning_kp3yu_42";
const UnlockLabel = "_UnlockLabel_kp3yu_46";
const Locked = "_Locked_kp3yu_50";
const LockedMessage = "_LockedMessage_kp3yu_53";
const UnlockButton = "_UnlockButton_kp3yu_57";
const SecurityKeyUnlockArrow = "_SecurityKeyUnlockArrow_kp3yu_61";
const styles$7 = {
  LoginContainer,
  isUnlocking,
  hasSecurityKeyUnlock,
  UnlockOverlay,
  error,
  warning: warning$1,
  UnlockLabel,
  Locked,
  LockedMessage,
  UnlockButton,
  SecurityKeyUnlockArrow
};
function PopupUnlockFrame({
  isUnlocked,
  pushState,
  childrenUIStyle,
  unlockDeviceType,
  requestUnlock,
  openWebappForSecurityKeyUnlock,
  children
}) {
  const hasSecurityKeyUnlock2 = unlockDeviceType === "securityKey" || unlockDeviceType === "multiple";
  const filteredUnlockDeviceType = unlockDeviceType === "multiple" || unlockDeviceType === "securityKey" ? "phone" : unlockDeviceType;
  return isUnlocked || pushState ? /* @__PURE__ */ jsxs(ch, { uiStyle: childrenUIStyle, className: classNames(styles$7.LoginContainer, {
    [styles$7.isUnlocking]: pushState,
    [styles$7.hasSecurityKeyUnlock]: hasSecurityKeyUnlock2
  }), children: [
    children,
    pushState && /* @__PURE__ */ jsxs(ch, { uiStyle: "default", className: classNames(styles$7.UnlockOverlay, {
      [styles$7.error]: pushState === "error",
      [styles$7.warning]: pushState === "warning"
    }), children: [
      /* @__PURE__ */ jsx(Ki, { small: true, state: pushState, unlockDeviceType: filteredUnlockDeviceType }),
      /* @__PURE__ */ jsx("div", { className: styles$7.UnlockLabel, children: {
        connecting: /* @__PURE__ */ jsx(sp, { unlockDeviceType: filteredUnlockDeviceType }),
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
      }[pushState] }),
      hasSecurityKeyUnlock2 && /* @__PURE__ */ jsxs(Ge, { onClick: openWebappForSecurityKeyUnlock, children: [
        /* @__PURE__ */ jsx(Trans, { id: "Ha3UBC" }),
        " ",
        /* @__PURE__ */ jsx(SvgArrowRight, { className: styles$7.SecurityKeyUnlockArrow })
      ] })
    ] })
  ] }) : /* @__PURE__ */ jsxs("div", { className: classNames(styles$7.Locked), children: [
    /* @__PURE__ */ jsx("div", { className: classNames(styles$7.LockedMessage), children: /* @__PURE__ */ jsx(Trans, { id: "sGsut8" }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(be, { buttonStyle: "primary", className: styles$7.UnlockButton, type: "button", onClick: requestUnlock, children: /* @__PURE__ */ jsx(Trans, { id: "Ym+sui" }) }) })
  ] });
}
function Basic({
  isUnlocked,
  pushState,
  requestUnlock,
  browserIsMobileSafari,
  unlockDeviceType,
  applePlatform,
  globalSearchShortcut,
  openGlobalSearchWindow,
  openWebappForSecurityKeyUnlock
}) {
  const manageLink = browserIsMobileSafari ? void 0 : getFrontendServerUrl();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isUnlocked !== void 0 && requestUnlock && /* @__PURE__ */ jsx(PopupUnlockFrame, { isUnlocked, pushState, unlockDeviceType, requestUnlock, childrenUIStyle: "highlight", openWebappForSecurityKeyUnlock, children: browserIsMobileSafari && /* @__PURE__ */ jsx(ct, { type: "success", className: styles$9.MobileSafariSetupSuccessMessage, children: /* @__PURE__ */ jsx(Trans, { id: "RQWed3" }) }) }),
    /* @__PURE__ */ jsx(Footer, { manageLink, applePlatform, globalSearchShortcut, openGlobalSearchWindow })
  ] });
}
const DisableForPage = "_DisableForPage_gjtl4_1";
const Value$1 = "_Value_gjtl4_17";
const SwitchLabel = "_SwitchLabel_gjtl4_27";
const styles$6 = {
  DisableForPage,
  Value: Value$1,
  SwitchLabel
};
function DisableSwitches({
  pageDisabled: disabled,
  setPageDisabled: setDisabled,
  disabledPageHost,
  autosnatchDisabled,
  setAutosnatchDisabled,
  contentScriptBlocked,
  browserName,
  incognito
}) {
  const incognitoMessage = useIncognitoMessage(browserName);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    incognito ? /* @__PURE__ */ jsxs("div", { className: styles$6.DisableForPage, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$6.Value, children: [
        /* @__PURE__ */ jsx("strong", { children: /* @__PURE__ */ jsx(Trans, { id: "aabQDn" }) }),
        /* @__PURE__ */ jsx("span", { children: incognitoMessage })
      ] }),
      /* @__PURE__ */ jsx("label", { className: styles$6.SwitchLabel, children: /* @__PURE__ */ jsx(at, { checked: false, disabled: true }) })
    ] }) : /* @__PURE__ */ jsxs("div", { className: styles$6.DisableForPage, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$6.Value, children: [
        /* @__PURE__ */ jsx("strong", { children: autosnatchDisabled ? i18n._(
          /*i18n*/
          {
            id: "aabQDn"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "m2TB6y"
          }
        ) }),
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Trans, { id: "7h/ahr" }) })
      ] }),
      /* @__PURE__ */ jsx("label", { className: styles$6.SwitchLabel, children: /* @__PURE__ */ jsx(at, { checked: !autosnatchDisabled, onChange: (e) => setAutosnatchDisabled(!e.currentTarget.checked) }) })
    ] }),
    contentScriptBlocked ? /* @__PURE__ */ jsx("div", { className: styles$6.DisableForPage, children: /* @__PURE__ */ jsxs("div", { className: styles$6.Value, children: [
      /* @__PURE__ */ jsx("strong", { children: /* @__PURE__ */ jsx(Trans, { id: "aHvVg8", values: {
        browserName
      } }) }),
      /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Trans, { id: "qjzFN0", values: {
        disabledPageHost
      } }) })
    ] }) }) : /* @__PURE__ */ jsxs("div", { className: styles$6.DisableForPage, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$6.Value, children: [
        /* @__PURE__ */ jsx("strong", { children: disabled ? i18n._(
          /*i18n*/
          {
            id: "jMvyI+"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "dkq141"
          }
        ) }),
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Trans, { id: "EB0nRS", values: {
          disabledPageHost
        } }) })
      ] }),
      /* @__PURE__ */ jsx("label", { className: styles$6.SwitchLabel, children: /* @__PURE__ */ jsx(at, { checked: !disabled, onChange: (e) => setDisabled(!e.currentTarget.checked) }) })
    ] })
  ] });
}
function useIncognitoMessage(browserName) {
  const incognitoMessages = {
    Chrome: i18n._(
      /*i18n*/
      {
        id: "qxcrNq"
      }
    ),
    Firefox: i18n._(
      /*i18n*/
      {
        id: "96zC3l"
      }
    ),
    "Microsoft Edge": i18n._(
      /*i18n*/
      {
        id: "lKI/c0"
      }
    )
  };
  return incognitoMessages[browserName] ?? incognitoMessages.Chrome;
}
const UIStyleContainer = "_UIStyleContainer_1qo2t_1";
const styles$5 = {
  UIStyleContainer
};
const SearchWrapper = "_SearchWrapper_1v70n_1";
const LoginList$1 = "_LoginList_1v70n_6";
const NoLoginsFound = "_NoLoginsFound_1v70n_17";
const styles$4 = {
  SearchWrapper,
  LoginList: LoginList$1,
  NoLoginsFound
};
const SvgUndo = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 15.354, height: 15.344, viewBox: "0 0 15.354 15.344", ...props }, /* @__PURE__ */ reactExports.createElement("path", { d: "M6.464 6.83H.365A.365.365 0 010 6.464V.365A.365.365 0 01.365 0h1.462a.365.365 0 01.365.365v2.378a7.55 7.55 0 11.543 10.645.366.366 0 01-.014-.53l1.034-1.034a.365.365 0 01.5-.016 5.358 5.358 0 10-.781-7.171h2.99A.365.365 0 016.83 5v1.464a.365.365 0 01-.365.365z", fill: "#262a47" }));
const LoginListItem$1 = "_LoginListItem_asb37_1";
const ItemRow = "_ItemRow_asb37_18";
const BorderedItemRow = "_BorderedItemRow_asb37_26";
const TotpTimeOffsetWarning = "_TotpTimeOffsetWarning_asb37_32";
const Content = "_Content_asb37_36";
const Value = "_Value_asb37_40";
const Label = "_Label_asb37_41";
const Totp = "_Totp_asb37_32";
const RowButton = "_RowButton_asb37_65";
const Undo = "_Undo_asb37_74";
const success = "_success_asb37_77";
const warning = "_warning_asb37_80";
const UndoHeadline = "_UndoHeadline_asb37_84";
const UndoSubheadline = "_UndoSubheadline_asb37_88";
const styles$3 = {
  LoginListItem: LoginListItem$1,
  ItemRow,
  BorderedItemRow,
  TotpTimeOffsetWarning,
  Content,
  Value,
  Label,
  Totp,
  RowButton,
  Undo,
  success,
  warning,
  UndoHeadline,
  UndoSubheadline
};
const PROTECTED_PLACEHOLDER = "************";
function LoginListItem({
  login,
  undo,
  undone,
  checkTotpTimeOffset,
  getUnprotectedValueForContentLoginWithContentId: getUnprotectedValueForContentLoginWithContentId2,
  copyToClipboardWithClear: copyToClipboardWithClear2
}) {
  var _a;
  const unprotect = reactExports.useCallback(async (value) => {
    var _a2;
    return (_a2 = await getUnprotectedValueForContentLoginWithContentId2(login, value)) == null ? void 0 : _a2.unencrypted;
  }, [getUnprotectedValueForContentLoginWithContentId2, login]);
  const customFields = useVisibleCustomFields(login);
  const totpSecret = useTotpSecret(login, getUnprotectedValueForContentLoginWithContentId2);
  const {
    totp,
    totpPercent,
    totpDigits
  } = Li(totpSecret, getValueWithPlaceholder(login.totpAlgorithm), login.totpDigits, login.totpPeriod);
  const {
    writeAuditlogEvent
  } = mh();
  const hideLogin = undone && ((_a = login.undo) == null ? void 0 : _a.type) === "create";
  const label = login.username && login.title ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: styles$3.Label, children: login.title }),
    /* @__PURE__ */ jsx("div", { className: styles$3.Value, children: login.username })
  ] }) : /* @__PURE__ */ jsx("div", { className: styles$3.Value, children: login.username ? login.username : login.title });
  const handleUndoClick = useErrorHandlingCallback(() => undo(), [undo]);
  return /* @__PURE__ */ jsxs("li", { className: styles$3.LoginListItem, children: [
    !hideLogin && /* @__PURE__ */ jsxs(Fragment, { children: [
      !!(login.username || login.title) && /* @__PURE__ */ jsxs("div", { className: classNames(styles$3.ItemRow, styles$3.BorderedItemRow), children: [
        /* @__PURE__ */ jsx("div", { className: styles$3.Content, children: login.loginUrl ? /* @__PURE__ */ jsx("a", { href: login.loginUrl, target: "_blank", rel: "noopener noreferrer", children: label }) : label }),
        login.username && login.permissions.viewSecrets && /* @__PURE__ */ jsx(RowCopyButton, { unprotect, value: login.username, copyToClipboardWithClear: copyToClipboardWithClear2 })
      ] }),
      login.permissions.viewSecrets && !isEmptyValue(login.password) && /* @__PURE__ */ jsxs("div", { className: classNames(styles$3.ItemRow, styles$3.BorderedItemRow), children: [
        /* @__PURE__ */ jsx("div", { className: styles$3.Content, children: /* @__PURE__ */ jsx("div", { className: styles$3.Value, children: PROTECTED_PLACEHOLDER }) }),
        /* @__PURE__ */ jsx(RowCopyButton, { unprotect, clearAfterTimeout: true, value: login.password, onCopy: login.organization ? () => {
          var _a2, _b;
          writeAuditlogEvent(login.organization.id, {
            type: AuditlogEventType.LOGIN_R_PASSWORD_COPY,
            loginId: login.id,
            vaultId: (_a2 = login.vaultMetadata) == null ? void 0 : _a2.id,
            loginRevisionId: (_b = login.history) == null ? void 0 : _b.currentRevisionId,
            loginEditTime: login.editTime
          });
        } : void 0, copyToClipboardWithClear: copyToClipboardWithClear2 })
      ] }),
      totp && totpPercent && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: classNames(styles$3.ItemRow, styles$3.BorderedItemRow, styles$3.Totp), children: [
          /* @__PURE__ */ jsx("div", { className: styles$3.Content, children: /* @__PURE__ */ jsxs("div", { className: styles$3.Value, children: [
            /* @__PURE__ */ jsx("span", { children: totp.substring(0, totpDigits / 2) }),
            /* @__PURE__ */ jsx("span", { children: totp.substring(totpDigits / 2) }),
            /* @__PURE__ */ jsx(Da, { percent: totpPercent })
          ] }) }),
          /* @__PURE__ */ jsx(RowCopyButton, { unprotect, value: totp, copyToClipboardWithClear: copyToClipboardWithClear2 })
        ] }),
        /* @__PURE__ */ jsx(ho, { className: styles$3.TotpTimeOffsetWarning, hidden: !login.showTotpTimeOffsetWarning, recheck: checkTotpTimeOffset })
      ] }),
      customFields.map((cf) => cf.name.trim() === "" || cf.protected && isEmptyValue(cf.value) ? null : /* @__PURE__ */ jsxs("div", { className: classNames(styles$3.ItemRow, styles$3.BorderedItemRow), children: [
        /* @__PURE__ */ jsxs("div", { className: styles$3.Content, children: [
          /* @__PURE__ */ jsx("div", { className: styles$3.Label, children: cf.name }),
          /* @__PURE__ */ jsx("div", { className: styles$3.Value, children: cf.protected ? PROTECTED_PLACEHOLDER : cf.value })
        ] }),
        /* @__PURE__ */ jsx(RowCopyButton, { unprotect, clearAfterTimeout: cf.protected, value: cf.value, onCopy: login.organization && cf.protected ? () => {
          var _a2, _b;
          writeAuditlogEvent(login.organization.id, {
            type: AuditlogEventType.LOGIN_R_CUSTOM_FIELD_COPY,
            loginId: login.id,
            vaultId: (_a2 = login.vaultMetadata) == null ? void 0 : _a2.id,
            customFieldId: cf.id,
            loginRevisionId: (_b = login.history) == null ? void 0 : _b.currentRevisionId,
            loginEditTime: login.editTime
          });
        } : void 0, copyToClipboardWithClear: copyToClipboardWithClear2 })
      ] }))
    ] }),
    login.undo && !undone && /* @__PURE__ */ jsxs("div", { className: classNames(styles$3.ItemRow, styles$3.Undo, {
      [styles$3.success]: login.undo.type === "create",
      [styles$3.warning]: login.undo.type === "update"
    }), children: [
      /* @__PURE__ */ jsx("div", { className: styles$3.Content, children: /* @__PURE__ */ jsxs("div", { className: styles$3.Value, children: [
        /* @__PURE__ */ jsx("strong", { className: styles$3.UndoHeadline, children: login.undo.type === "create" ? i18n._(
          /*i18n*/
          {
            id: "DhwLlb"
          }
        ) : i18n._(
          /*i18n*/
          {
            id: "71P+9z"
          }
        ) }),
        /* @__PURE__ */ jsx("time", { className: styles$3.UndoSubheadline, dateTime: login.undo.date, children: format(new Date(login.undo.date), "PPPp", {
          locale: Ht()
        }) })
      ] }) }),
      /* @__PURE__ */ jsx(qa, { defaultIcon: SvgUndo, defaultText: i18n._(
        /*i18n*/
        {
          id: "9uI/rE"
        }
      ), onClick: handleUndoClick, className: styles$3.RowButton })
    ] }),
    login.undo && undone && /* @__PURE__ */ jsx("div", { className: classNames(styles$3.ItemRow, styles$3.Undo, styles$3.warning), children: /* @__PURE__ */ jsx("div", { className: styles$3.Content, children: /* @__PURE__ */ jsxs("div", { className: styles$3.Value, children: [
      /* @__PURE__ */ jsx("strong", { className: styles$3.UndoHeadline, children: login.undo.type === "create" ? i18n._(
        /*i18n*/
        {
          id: "z1owM3"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "GpHZ5V"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: styles$3.UndoSubheadline, children: login.username })
    ] }) }) })
  ] });
}
function RowCopyButton({
  value,
  onCopy,
  clearAfterTimeout,
  unprotect,
  copyToClipboardWithClear: copyToClipboardWithClear2
}) {
  const [copied, copy] = useCopyToClipboard(copyToClipboardWithClear2);
  const requestCopy = reactExports.useCallback(() => {
    if (value === void 0) {
      trackError(new Error("Tried to copy from popup while value not present!"));
      return;
    }
    const valueToCopy = value;
    onCopy == null ? void 0 : onCopy();
    async function getValue() {
      if (typeof valueToCopy === "string") {
        return valueToCopy;
      }
      return unprotect(valueToCopy);
    }
    copy(getValue(), clearAfterTimeout);
  }, [clearAfterTimeout, copy, onCopy, unprotect, value]);
  return /* @__PURE__ */ jsx(ja, { copied, onClick: requestCopy, className: styles$3.RowButton });
}
function useVisibleCustomFields(login) {
  return reactExports.useMemo(() => {
    if (login.permissions.viewSecrets) {
      return login.customFields;
    }
    return login.customFields.filter((cf) => !cf.protected);
  }, [login]);
}
function useTotpSecret(login, getUnprotectedValueForContentLoginWithContentId2) {
  var _a;
  const [totpSecret, setTotpSecret] = reactExports.useState();
  reactExports.useEffect(() => {
    var _a2;
    if (((_a2 = login.totp) == null ? void 0 : _a2.contentId) === (totpSecret == null ? void 0 : totpSecret.contentId)) {
      return;
    }
    if (!login.totp) {
      setTotpSecret(void 0);
      return;
    }
    const totp = login.totp;
    async function updateTotpSecret() {
      const secret = await getUnprotectedValueForContentLoginWithContentId2(login, totp);
      setTotpSecret(secret);
    }
    updateTotpSecret().catch(trackError);
  }, [getUnprotectedValueForContentLoginWithContentId2, login, login.totp, (_a = login.vaultMetadata) == null ? void 0 : _a.id, totpSecret == null ? void 0 : totpSecret.contentId]);
  return totpSecret == null ? void 0 : totpSecret.unencrypted;
}
function LoginList({
  displayLogins,
  checkTotpTimeOffset,
  recentUndoIndex,
  performUndo,
  getUnprotectedValueForContentLoginWithContentId: getUnprotectedValueForContentLoginWithContentId2,
  copyToClipboardWithClear: copyToClipboardWithClear2
}) {
  const {
    filteredLogins,
    searchString,
    setSearchString
  } = useLoginFilter(displayLogins);
  const showSearch = !!displayLogins && displayLogins.length >= 5;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    showSearch && /* @__PURE__ */ jsx("div", { className: styles$4.SearchWrapper, children: /* @__PURE__ */ jsx($h, { size: "small", placeholder: i18n._(
      /*i18n*/
      {
        id: "jBI8Lx",
        values: {
          0: displayLogins.length
        }
      }
    ), value: searchString, onChange: (e) => setSearchString(e.target.value), clear: () => setSearchString("") }) }),
    /* @__PURE__ */ jsxs("ul", { className: styles$4.LoginList, children: [
      filteredLogins && filteredLogins.map((l, i) => /* @__PURE__ */ jsx(LoginListItem, { login: l, undo: () => performUndo(l, i), undone: recentUndoIndex === i, checkTotpTimeOffset, getUnprotectedValueForContentLoginWithContentId: getUnprotectedValueForContentLoginWithContentId2, copyToClipboardWithClear: copyToClipboardWithClear2 }, l.id)),
      filteredLogins && displayLogins && filteredLogins.length === 0 && displayLogins.length > 0 && /* @__PURE__ */ jsx("li", { className: styles$4.NoLoginsFound, children: /* @__PURE__ */ jsx(Trans, { id: "OCApeu" }) })
    ] })
  ] });
}
function useLoginFilter(logins) {
  const [searchString, setSearchString] = reactExports.useState("");
  const filteredLogins = reactExports.useMemo(() => {
    if (!logins) {
      return void 0;
    }
    return logins.filter((l) => searchPredicate(l, searchString));
  }, [logins, searchString]);
  return {
    filteredLogins,
    searchString,
    setSearchString
  };
}
function useUndoState(logins, undo) {
  const [recentUndoIndex, setRecentUndoIndex] = reactExports.useState();
  reactExports.useEffect(() => {
    if (recentUndoIndex === void 0) {
      return;
    }
    const tid = window.setTimeout(() => {
      setRecentUndoIndex(void 0);
    }, 5e3);
    return () => window.clearTimeout(tid);
  }, [recentUndoIndex, setRecentUndoIndex]);
  const [displayLogins, setDisplayLogins] = reactExports.useState();
  reactExports.useEffect(() => {
    if (recentUndoIndex !== void 0) {
      return;
    }
    setDisplayLogins(logins);
  }, [logins, recentUndoIndex]);
  const performUndo = reactExports.useCallback(async (login, index) => {
    var _a;
    if (!((_a = login.undo) == null ? void 0 : _a.id)) {
      return;
    }
    setDisplayLogins(logins);
    setRecentUndoIndex(index);
    await undo(login.undo.id);
  }, [undo, logins, setDisplayLogins, setRecentUndoIndex]);
  return {
    displayLogins,
    recentUndoIndex,
    performUndo
  };
}
function LoggedIn({
  isUnlocked,
  pushState,
  requestUnlock,
  report,
  eTLDPlusOne,
  disabledForPage,
  setDisabledForPage,
  disabledPageHost,
  autosnatchDisabled,
  setAutosnatchDisabled,
  contentScriptBlocked,
  browserName,
  browserIsMobileSafari,
  unlockDeviceType,
  incognito,
  logins,
  undo,
  checkTotpTimeOffset,
  globalSearchShortcut: globalSearchShortCut,
  applePlatform,
  openGlobalSearchWindow,
  openWebappForSecurityKeyUnlock,
  getUnprotectedValueForContentLoginWithContentId: getUnprotectedValueForContentLoginWithContentId2,
  copyToClipboardWithClear: copyToClipboardWithClear2
}) {
  const manageLink = reactExports.useMemo(() => {
    if (browserIsMobileSafari) {
      return void 0;
    }
    if (!eTLDPlusOne || logins.length === 0) {
      return getFrontendServerUrl();
    }
    return `${getFrontendServerUrl()}/search?filter=${eTLDPlusOne}`;
  }, [browserIsMobileSafari, eTLDPlusOne, logins.length]);
  const {
    displayLogins,
    recentUndoIndex,
    performUndo
  } = useUndoState(logins, undo);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ch, { uiStyle: "default", className: styles$5.UIStyleContainer, children: /* @__PURE__ */ jsx(DisableSwitches, { incognito, pageDisabled: disabledForPage, setPageDisabled: setDisabledForPage, disabledPageHost, autosnatchDisabled, setAutosnatchDisabled, contentScriptBlocked, browserName }) }),
    /* @__PURE__ */ jsx(PopupUnlockFrame, { isUnlocked, pushState, childrenUIStyle: displayLogins && displayLogins.length > 0 ? "default" : "highlight", unlockDeviceType, requestUnlock, openWebappForSecurityKeyUnlock, children: /* @__PURE__ */ jsx(LoginList, { displayLogins, performUndo, recentUndoIndex, checkTotpTimeOffset, getUnprotectedValueForContentLoginWithContentId: getUnprotectedValueForContentLoginWithContentId2, copyToClipboardWithClear: copyToClipboardWithClear2 }) }),
    /* @__PURE__ */ jsx(Footer, { manageLink, report, globalSearchShortcut: globalSearchShortCut, applePlatform, openGlobalSearchWindow })
  ] });
}
const LoggedOut$1 = "_LoggedOut_15s3h_1";
const PermissionDenied = "_PermissionDenied_15s3h_12";
const styles$2 = {
  LoggedOut: LoggedOut$1,
  PermissionDenied
};
function LoggedOut({
  openWebapp: openWebapp2
}) {
  const [permissionDenied, setPermissionDenied] = reactExports.useState(false);
  const handleLoginClick = useErrorHandlingCallback(async () => {
    const {
      permissionGranted
    } = await openWebapp2();
    setPermissionDenied(!permissionGranted);
  }, [openWebapp2]);
  return /* @__PURE__ */ jsxs("div", { className: styles$2.LoggedOut, children: [
    /* @__PURE__ */ jsx(be, { buttonStyle: "primary", element: "button", onClick: handleLoginClick, children: /* @__PURE__ */ jsx(Trans, { id: "Ym+sui" }) }),
    permissionDenied && /* This is only for safari */
    /* @__PURE__ */ jsx("p", { className: styles$2.PermissionDenied, children: /* @__PURE__ */ jsx(Trans, { id: "hYzVzQ" }) })
  ] });
}
const SvgHeyloginLogoDarkMode = (props) => /* @__PURE__ */ reactExports.createElement("svg", { width: 181, height: 48, viewBox: "0 0 181 48", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ reactExports.createElement("g", { clipPath: "url(#heylogin_logo_negative_svg__a)" }, /* @__PURE__ */ reactExports.createElement("path", { d: "M66.278 9.021v10.107h.061c.118-.308.29-.593.508-.84.254-.291.547-.544.87-.752a4.687 4.687 0 0 1 1.196-.534 5.15 5.15 0 0 1 1.496-.213 6.203 6.203 0 0 1 2.755.533c.668.321 1.233.823 1.632 1.448.41.67.681 1.417.798 2.195.146.905.22 1.82.218 2.736v8.056h-4.477V24.6c0-.424-.016-.856-.045-1.307a4.192 4.192 0 0 0-.266-1.25 1.941 1.941 0 0 0-2.026-1.291 2.761 2.761 0 0 0-1.41.301 2.09 2.09 0 0 0-.836.85 3.437 3.437 0 0 0-.376 1.198c-.063.458-.093.92-.09 1.381v7.275h-4.533V9.021h4.525zM92.896 29.232a7.19 7.19 0 0 1-2.72 2.133 8.24 8.24 0 0 1-3.421.752 9.223 9.223 0 0 1-3.167-.533 7.605 7.605 0 0 1-2.58-1.547 7.285 7.285 0 0 1-1.725-2.421 8.217 8.217 0 0 1 0-6.315 7.283 7.283 0 0 1 1.725-2.421 7.646 7.646 0 0 1 2.572-1.547 9.238 9.238 0 0 1 3.17-.533 7.21 7.21 0 0 1 2.81.533 5.918 5.918 0 0 1 2.162 1.547 7.1 7.1 0 0 1 1.376 2.43 9.93 9.93 0 0 1 .482 3.157v1.4H83.138a3.596 3.596 0 0 0 1.168 2.055c.623.52 1.413.793 2.223.768.66.021 1.312-.151 1.876-.495a5.118 5.118 0 0 0 1.331-1.278l3.16 2.315zM89.08 22.8a2.616 2.616 0 0 0-.75-1.952 2.662 2.662 0 0 0-2.013-.813 3.268 3.268 0 0 0-2.297.855 2.87 2.87 0 0 0-.897 1.91h5.957zM104.722 34.133a39.082 39.082 0 0 1-.873 2.072 5.013 5.013 0 0 1-1.065 1.52 4.151 4.151 0 0 1-1.637.941 8.837 8.837 0 0 1-2.614.317 10.442 10.442 0 0 1-3.362-.533l.6-3.699c.657.297 1.37.45 2.091.451.417.013.834-.042 1.233-.163.299-.098.572-.263.798-.482.221-.224.401-.483.533-.768.138-.299.298-.654.447-1.048l.333-.843-6.389-14.736h4.866l3.753 9.65h.059l3.21-9.65h4.621l-6.604 16.97zM113.86 9.021h4.503v22.736h-4.503V9.021zM121.062 24.45a7.712 7.712 0 0 1 .631-3.149 7.28 7.28 0 0 1 1.725-2.419 7.629 7.629 0 0 1 2.585-1.549 9.507 9.507 0 0 1 6.329 0 7.62 7.62 0 0 1 2.582 1.55 7.198 7.198 0 0 1 1.725 2.418 8.187 8.187 0 0 1 0 6.315 7.15 7.15 0 0 1-1.725 2.421 7.596 7.596 0 0 1-2.592 1.539 9.51 9.51 0 0 1-6.33 0 7.54 7.54 0 0 1-2.582-1.547 7.252 7.252 0 0 1-1.725-2.421 7.661 7.661 0 0 1-.623-3.158zm4.504 0a3.76 3.76 0 0 0 .945 2.667c.628.683 1.515 1.024 2.662 1.024 1.146 0 2.033-.341 2.662-1.024a4.276 4.276 0 0 0 0-5.35c-.634-.678-1.521-1.019-2.662-1.02-1.141-.002-2.029.338-2.662 1.02a3.772 3.772 0 0 0-.945 2.683zM155.162 30.523c0 2.764-.697 4.86-2.092 6.29-1.395 1.43-3.51 2.15-6.346 2.16-1.291 0-2.579-.146-3.838-.434a8.72 8.72 0 0 1-3.484-1.702l2.491-3.733a9.482 9.482 0 0 0 2.207 1.384c.8.348 1.664.522 2.537.512 1.382 0 2.397-.337 3.045-1.01a3.548 3.548 0 0 0 .979-2.566V30.01h-.061a4.299 4.299 0 0 1-1.938 1.495 6.203 6.203 0 0 1-2.177.438 7.518 7.518 0 0 1-2.941-.557 6.604 6.604 0 0 1-2.266-1.563 6.948 6.948 0 0 1-1.456-2.4 9.089 9.089 0 0 1-.045-5.867 7.793 7.793 0 0 1 1.331-2.44 6.66 6.66 0 0 1 2.095-1.683 5.927 5.927 0 0 1 2.779-.634 6.856 6.856 0 0 1 1.756.213c.493.127.972.306 1.427.534.389.2.752.447 1.081.735.268.24.509.508.719.8h.061v-1.938h4.155l-.019 13.379zm-11.36-6.163a3.517 3.517 0 0 0 1.032 2.51c.329.332.715.603 1.14.8a3.524 3.524 0 0 0 2.837 0 3.939 3.939 0 0 0 1.158-.8 3.56 3.56 0 0 0 0-5.021v-.001a3.933 3.933 0 0 0-1.158-.8 3.505 3.505 0 0 0-2.837 0c-.424.197-.81.467-1.14.8a3.527 3.527 0 0 0-1.032 2.512zM158.465 12.549a2.62 2.62 0 0 1 .594-1.657 2.606 2.606 0 0 1 4.426.661 2.62 2.62 0 0 1-.962 3.172 2.606 2.606 0 0 1-3.294-.325 2.526 2.526 0 0 1-.764-1.85v-.001zm.36 4.597h4.503v14.611h-4.503v-14.61zM166.946 17.144h4.325v1.984h.059a3.89 3.89 0 0 1 .599-.843 4.65 4.65 0 0 1 .929-.752A5.748 5.748 0 0 1 174.09 17c.485-.145.99-.216 1.496-.214a6.24 6.24 0 0 1 2.757.534c.672.324 1.239.829 1.64 1.458.409.672.68 1.418.799 2.195.145.901.218 1.812.218 2.725v8.059h-4.504v-7.16c0-.421-.013-.853-.045-1.307a4.108 4.108 0 0 0-.266-1.248 1.928 1.928 0 0 0-2.026-1.29 2.777 2.777 0 0 0-1.411.298c-.35.2-.636.495-.827.85a3.437 3.437 0 0 0-.376 1.198c-.06.458-.091.92-.09 1.382v7.277h-4.509V17.144z", fill: "#fff" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M23.956 48a23.804 23.804 0 0 0 13.724-4.333l-9.316-11.142a9.53 9.53 0 0 1-7.986.376l-9.422 11.251a23.827 23.827 0 0 0 13 3.848z", fill: "#D9D9D9" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M41.505 7.67 32.08 18.932a9.587 9.587 0 0 1-3.727 13.6l9.33 11.142a23.984 23.984 0 0 0 6.9-7.467 24.03 24.03 0 0 0-3.075-28.533l-.003-.006z", fill: "#B8B8B8" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M33.538 24a9.563 9.563 0 0 0-1.458-5.067l-11.696 13.97a9.567 9.567 0 0 0 8.936-.953A9.614 9.614 0 0 0 33.538 24z", fill: "#999" }), /* @__PURE__ */ reactExports.createElement("path", { d: "m10.95 44.152 9.42-11.248a9.605 9.605 0 0 1-5.755-11.06 9.584 9.584 0 0 1 10.008-7.42 9.57 9.57 0 0 1 7.46 4.493l9.42-11.248a23.955 23.955 0 0 0-8.257-5.793 23.917 23.917 0 0 0-19.703.493 23.962 23.962 0 0 0-7.957 6.198A24.043 24.043 0 0 0 3.82 37.019a23.977 23.977 0 0 0 7.13 7.138v-.005z", fill: "#F9F9F9" }), /* @__PURE__ */ reactExports.createElement("circle", { cx: 24, cy: 24, r: 22.75, fill: "#fff", stroke: "#fff", strokeWidth: 2.5 }), /* @__PURE__ */ reactExports.createElement("path", { d: "M24.008 44a19.89 19.89 0 0 0 11.454-3.61l-7.775-9.283a7.966 7.966 0 0 1-6.665.313l-7.864 9.374A19.91 19.91 0 0 0 24.008 44z", fill: "#3E48F8" }), /* @__PURE__ */ reactExports.createElement("path", { d: "m38.654 10.398-7.866 9.385a7.98 7.98 0 0 1-3.11 11.33l7.786 9.283a19.993 19.993 0 0 0 7.513-22.7 19.996 19.996 0 0 0-4.32-7.294l-.003-.004z", fill: "#00C8FF" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M32.005 24.004a7.957 7.957 0 0 0-1.217-4.222l-9.762 11.64a7.998 7.998 0 0 0 10.979-7.418z", fill: "#00F500" }), /* @__PURE__ */ reactExports.createElement("path", { d: "m13.153 40.793 7.862-9.371a7.998 7.998 0 1 1 9.775-11.654l7.862-9.371A19.994 19.994 0 0 0 7.202 34.85a19.994 19.994 0 0 0 5.951 5.947v-.004z", fill: "#282846" })), /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("clipPath", { id: "heylogin_logo_negative_svg__a" }, /* @__PURE__ */ reactExports.createElement("path", { fill: "#fff", d: "M0 0h181v48H0z" }))));
const mobileSafariBottomSheet = "_mobileSafariBottomSheet_drkss_1";
const Popup = "_Popup_drkss_8";
const desktopPopup = "_desktopPopup_drkss_20";
const mobileSafariPopup = "_mobileSafariPopup_drkss_29";
const Header$1 = "_Header_drkss_45";
const Domain = "_Domain_drkss_64";
const styles$1 = {
  mobileSafariBottomSheet,
  Popup,
  desktopPopup,
  mobileSafariPopup,
  Header: Header$1,
  Domain
};
function PopupFrame({
  domain,
  children,
  displayMode = "desktopPopup"
}) {
  reactExports.useEffect(() => {
    document.documentElement.classList.add(styles$1[displayMode]);
    return () => document.documentElement.classList.remove(styles$1[displayMode]);
  }, [displayMode]);
  return /* @__PURE__ */ jsxs(ch, { uiStyle: "highlight", className: classNames(styles$1.Popup), children: [
    /* @__PURE__ */ jsxs("header", { className: styles$1.Header, children: [
      /* @__PURE__ */ jsx(SvgHeyloginLogoDarkMode, { role: "img", "aria-label": "heylogin" }),
      domain && /* @__PURE__ */ jsxs("span", { className: styles$1.Domain, children: [
        /* @__PURE__ */ jsx(Trans, { id: "Fdp03t" }),
        " ",
        /* @__PURE__ */ jsx("strong", { children: domain })
      ] })
    ] }),
    children
  ] });
}
const SvgCheckCircleWhiteCheckmark = (props) => /* @__PURE__ */ reactExports.createElement("svg", { id: "svg4", viewBox: "0 0 12.624 12.624", height: 12.624, width: 12.624, ...props }, /* @__PURE__ */ reactExports.createElement("defs", { id: "defs8" }), /* @__PURE__ */ reactExports.createElement("path", { id: "path821", d: "M 6.312,0 A 6.312,6.312 0 1 0 12.624,6.312 6.314,6.314 0 0 0 6.312,0 Z" }), /* @__PURE__ */ reactExports.createElement("path", { style: {
  fill: "#fff"
}, id: "path2", d: "m 5.05,9.468 -3.156,-3.156 0.89,-0.89 2.266,2.26 4.79,-4.791 0.89,0.9 z" }));
const SvgRocket = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 35.499, height: 35.47, viewBox: "0 0 35.499 35.47", ...props }, /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("style", null, ".a{fill:#3c50f0;}")), /* @__PURE__ */ reactExports.createElement("g", { transform: "translate(-3.366 -3.372)" }, /* @__PURE__ */ reactExports.createElement("path", { className: "a", d: "M38.678,3.853a.377.377,0,0,0-.282-.29c-4.641-1.135-15.364,2.909-21.174,8.719A25.112,25.112,0,0,0,14.4,15.618a10.507,10.507,0,0,0-5.11.64C4.981,18.151,3.727,23.1,3.377,25.224a.764.764,0,0,0,.836.887l6.919-.759a15.381,15.381,0,0,0,.094,1.561,1.548,1.548,0,0,0,.452.947l2.679,2.679a1.548,1.548,0,0,0,.947.452,15.35,15.35,0,0,0,1.553.094l-.759,6.91a.764.764,0,0,0,.887.836c2.124-.341,7.081-1.6,8.966-5.9a10.555,10.555,0,0,0,.648-5.093,25.152,25.152,0,0,0,3.344-2.824C35.778,19.209,39.8,8.725,38.678,3.853ZM24.756,17.494a3.644,3.644,0,1,1,5.153,0A3.64,3.64,0,0,1,24.756,17.494Z", transform: "translate(0 0)" }), /* @__PURE__ */ reactExports.createElement("path", { className: "a", d: "M13.652,27.482h0a3.236,3.236,0,0,1-1.689.682A2.3,2.3,0,0,1,9.319,25.52a3.173,3.173,0,0,1,.674-1.681L10,23.83a.285.285,0,0,0-.239-.486,3.922,3.922,0,0,0-2.295,1.118C5.932,26,5.787,31.7,5.787,31.7s5.707-.145,7.243-1.681a3.9,3.9,0,0,0,1.118-2.295A.292.292,0,0,0,13.652,27.482Z", transform: "translate(0.516 4.26)" })));
const SvgStemmedArrowRight = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 12.743, height: 8.499, viewBox: "0 0 12.743 8.499", ...props }, /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("style", null, ".a{fill:#3c50f0;}")), /* @__PURE__ */ reactExports.createElement("path", { className: "a", d: "M16,11.414a.578.578,0,0,0,0,.814l2.691,2.7H8.446a.575.575,0,0,0,0,1.151H18.684l-2.691,2.7a.583.583,0,0,0,0,.814.573.573,0,0,0,.81,0l3.647-3.674h0a.646.646,0,0,0,.12-.181.549.549,0,0,0,.044-.221.577.577,0,0,0-.164-.4l-3.647-3.674A.564.564,0,0,0,16,11.414Z", transform: "translate(-7.875 -11.252)" }));
const Header = "_Header_10zvg_1";
const Form = "_Form_10zvg_15";
const SelectionButton$1 = "_SelectionButton_10zvg_26 _UnstyledButton_w9xap_22";
const SelectionButtonContent = "_SelectionButtonContent_10zvg_38";
const ErrorSelector = "_ErrorSelector_10zvg_57";
const Switch = "_Switch_10zvg_64";
const CommentField = "_CommentField_10zvg_69";
const Screenshot = "_Screenshot_10zvg_74";
const SubmitButton = "_SubmitButton_10zvg_97";
const CancelButton = "_CancelButton_10zvg_101";
const Loading = "_Loading_10zvg_105";
const Reported = "_Reported_10zvg_112";
const ReportedMessage = "_ReportedMessage_10zvg_133";
const ReportedNav = "_ReportedNav_10zvg_138";
const NavButton = "_NavButton_10zvg_144";
const styles = {
  Header,
  Form,
  SelectionButton: SelectionButton$1,
  SelectionButtonContent,
  ErrorSelector,
  Switch,
  CommentField,
  Screenshot,
  SubmitButton,
  CancelButton,
  Loading,
  Reported,
  ReportedMessage,
  ReportedNav,
  NavButton
};
function ReportPage({
  url,
  back,
  reportPage,
  captureScreen: takeScreenshot,
  logins
}) {
  const [state, setState] = reactExports.useState("form");
  const [storedReport, setStoredReport] = reactExports.useState(void 0);
  const [screenshot, setScreenshot] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    const fn = async () => {
      const s = await takeScreenshot();
      setScreenshot(s);
    };
    fn().catch(trackError);
  }, [takeScreenshot]);
  const sendReport = useErrorHandlingCallback(async (r) => {
    setState("loading");
    setStoredReport(r);
    const success2 = await reportPage(r);
    if (success2) {
      setState("reported");
    } else {
      setState("error");
    }
  }, [reportPage, setStoredReport]);
  const resendReport = reactExports.useCallback(() => {
    if (!storedReport) {
      trackError(new Error("report is missing, this should never happen"));
      setState("form");
    } else {
      sendReport(storedReport);
    }
  }, [sendReport, storedReport]);
  return /* @__PURE__ */ jsx(ch, { uiStyle: "default", children: state === "form" && url ? (
    // NOTE: fall back to 'loading' state while url is not set
    /* @__PURE__ */ jsx(ReportPageForm, { url, back, sendReport, screenshot, logins })
  ) : state === "reported" ? /* @__PURE__ */ jsxs("div", { className: classNames(styles.Reported), children: [
    /* @__PURE__ */ jsx(SvgRocket, {}),
    /* @__PURE__ */ jsxs("div", { className: styles.ReportedMessage, children: [
      /* @__PURE__ */ jsx("b", { children: /* @__PURE__ */ jsx(Trans, { id: "JzZPb0" }) }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "U03GX6" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles.ReportedNav, children: /* @__PURE__ */ jsx("button", { onClick: back, className: styles.NavButton, children: /* @__PURE__ */ jsx(Trans, { id: "iH8pgl" }) }) })
  ] }) : state === "error" ? /* @__PURE__ */ jsxs("div", { className: classNames(styles.Reported), children: [
    /* @__PURE__ */ jsxs("div", { className: styles.ReportedMessage, children: [
      /* @__PURE__ */ jsx("b", { children: /* @__PURE__ */ jsx(Trans, { id: "kf83Ld" }) }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "Tpekep" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles.ReportedNav, children: [
      /* @__PURE__ */ jsx("button", { className: styles.NavButton, onClick: resendReport, children: /* @__PURE__ */ jsx(Trans, { id: "KDw4GX" }) }),
      /* @__PURE__ */ jsx("button", { className: styles.NavButton, onClick: back, children: /* @__PURE__ */ jsx(Trans, { id: "iH8pgl" }) })
    ] })
  ] }) : /* @__PURE__ */ jsx("div", { className: classNames(styles.Loading), children: /* @__PURE__ */ jsx(wh, {}) }) });
}
function SelectionButton({
  text,
  onClick
}) {
  return /* @__PURE__ */ jsx("button", { className: styles.SelectionButton, onClick, children: /* @__PURE__ */ jsxs("div", { className: styles.SelectionButtonContent, children: [
    text,
    /* @__PURE__ */ jsx(SvgStemmedArrowRight, {})
  ] }) });
}
function TypeSelection({
  select
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(SelectionButton, { text: i18n._(
      /*i18n*/
      {
        id: "XZBV9j"
      }
    ), onClick: () => select(ReportPageProblem.DETECTION) }),
    /* @__PURE__ */ jsx(SelectionButton, { text: i18n._(
      /*i18n*/
      {
        id: "6gkdg6"
      }
    ), onClick: () => select(ReportPageProblem.POSITION) }),
    /* @__PURE__ */ jsx(SelectionButton, { text: i18n._(
      /*i18n*/
      {
        id: "Izy/1n"
      }
    ), onClick: () => select(ReportPageProblem.SUBMISSION) }),
    /* @__PURE__ */ jsx(SelectionButton, { text: i18n._(
      /*i18n*/
      {
        id: "/IX/7x"
      }
    ), onClick: () => select(ReportPageProblem.OTHER) })
  ] });
}
function ReportPageForm({
  url,
  className,
  back,
  sendReport,
  screenshot,
  logins
}) {
  const [errorType, setErrorType] = reactExports.useState(void 0);
  const [comment, setComment] = reactExports.useState("");
  const [includeScreenshot, setIncludeScreenshot] = reactExports.useState(true);
  const submit = reactExports.useCallback(async () => {
    const info = {
      problem: errorType ?? ReportPageProblem.OTHER,
      comment,
      screenshot: includeScreenshot ? screenshot : void 0,
      hasLogin: !!(logins == null ? void 0 : logins.length),
      hasHideSecretsLogin: !!logins && logins.some((l) => !l.permissions.viewSecrets)
    };
    sendReport(info);
  }, [errorType, comment, includeScreenshot, screenshot, logins, sendReport]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: classNames(styles.Header, className), children: /* @__PURE__ */ jsx(Trans, { id: "aAnzIW", values: {
      0: getHost(url)
    } }) }),
    errorType === void 0 ? /* @__PURE__ */ jsx(TypeSelection, { select: setErrorType }) : /* @__PURE__ */ jsx("div", { className: classNames(styles.Form, className), children: /* @__PURE__ */ jsxs("form", { children: [
      /* @__PURE__ */ jsx(J, { element: {
        type: "textarea",
        props: {
          autoFocus: true,
          value: comment,
          onChange: (e) => setComment(e.target.value)
        }
      }, placeholder: i18n._(
        /*i18n*/
        {
          id: "06CVam"
        }
      ), className: styles.CommentField }),
      /* @__PURE__ */ jsxs("label", { className: styles.ErrorSelector, children: [
        /* @__PURE__ */ jsx(at, { className: styles.Switch, checked: includeScreenshot, onChange: () => setIncludeScreenshot(!includeScreenshot) }),
        /* @__PURE__ */ jsx(Trans, { id: "8uQ9hR" })
      ] }),
      includeScreenshot && screenshot && /* @__PURE__ */ jsxs("div", { className: styles.Screenshot, children: [
        /* @__PURE__ */ jsx("img", { src: screenshot, alt: i18n._(
          /*i18n*/
          {
            id: "VObepA"
          }
        ) }),
        /* @__PURE__ */ jsx(SvgCheckCircleWhiteCheckmark, {})
      ] }),
      /* @__PURE__ */ jsx(be, { buttonStyle: "primary", type: "submit", onClick: submit, className: styles.SubmitButton, children: /* @__PURE__ */ jsx(Trans, { id: "JlFcis" }) }),
      /* @__PURE__ */ jsx(be, { buttonStyle: "tertiary", onClick: back, className: styles.CancelButton, children: /* @__PURE__ */ jsx(Trans, { id: "dEgA5A" }) })
    ] }) })
  ] });
}
function usePushProgressState(unlockState) {
  const [pushState, setPushState] = reactExports.useState();
  const delayChangesUntilRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    const newPushState = PushProgressStateFromUnlockState(unlockState);
    if (delayChangesUntilRef.current === void 0) {
      setPushState(newPushState);
    } else {
      setTimeout(() => {
        setPushState(newPushState);
        delayChangesUntilRef.current = void 0;
      }, Math.max(0, delayChangesUntilRef.current - Date.now()));
    }
    if (newPushState === "error" || newPushState === "warning") {
      delayChangesUntilRef.current = Date.now() + 2e3;
    }
  }, [unlockState]);
  return pushState;
}
function PushProgressStateFromUnlockState(unlockState) {
  if (unlockState === "unlocking") {
    return "connecting";
  }
  if (unlockState === "error") {
    return "error";
  }
  if (unlockState === "warning") {
    return "warning";
  }
  return void 0;
}
function PopupContainer() {
  reactExports.useEffect(() => {
    addAchievement(Achievement.EXT_POPUP_OPEN);
  }, []);
  const userLoggedIn = useUserLoggedIn();
  const logins = useLogins();
  const {
    isUnlocked,
    unlockState,
    requestUnlock,
    unlockDeviceType,
    webauthnOnlyUnlockSkipped
  } = useUnlock({
    achievement: Achievement.EXT_POPUP_UNLOCK,
    unlockOnInitialRender: true,
    skipWebauthnUnlock: true
  });
  const currentTab = useCurrentTab();
  const reportPage = async (info) => {
    const success2 = await Promise.race([
      sendMessage({
        type: "SendHeyproblemsReport",
        info
      }),
      // Fake success after 1.5s. May loose some reports, but a overlong long delay makes report
      // feel broken.
      new Promise((resolve) => setTimeout(() => resolve(true), 1500))
    ]);
    return !!success2;
  };
  const undo = reactExports.useCallback(async (id) => {
    await sendMessage({
      type: "UndoAutosnatch",
      id
    });
  }, []);
  const {
    disabledForPage,
    setDisabledForPage,
    disabledPageHost
  } = useDisabledForPage(currentTab == null ? void 0 : currentTab.url);
  const [isReportingPage, setIsReportingPage] = reactExports.useState(false);
  const captureScreen = reactExports.useCallback(async () => {
    const [activeTab] = await browser.tabs.query({
      active: true,
      currentWindow: true
    });
    return browser.tabs.captureVisibleTab(activeTab.windowId);
  }, []);
  const pushState = usePushProgressState(unlockState);
  const contentScriptBlockedByBrowser = !!currentTab && currentTab.contentScriptMode === void 0 && isContentScriptBlockedByBrowser(currentTab.url);
  const basicPopup = !contentScriptBlockedByBrowser && ((currentTab == null ? void 0 : currentTab.contentScriptMode) === void 0 || currentTab.contentScriptMode === "heyloginWebapp");
  const clientOutdated = useClientOutdated();
  const {
    autosnatchDisabled,
    setAutosnatchDisabled
  } = useAutosnatchSettings();
  const disableAutosnatchWithAchievement = reactExports.useCallback((disabled) => {
    setAutosnatchDisabled(disabled);
    sendMessage({
      type: "AddAchievements",
      achievements: [Achievement.EXT_POPUP_DISABLE_AUTOSNATCH]
    }).catch(trackError);
  }, [setAutosnatchDisabled]);
  const {
    browserName,
    browserSupportsQuickAccess,
    applePlatform
  } = useBrowserProperties();
  const globalSearchShortcut = useGlobalSearchShortcut();
  const {
    displayMode,
    browserIsMobileSafari
  } = usePopupDisplayMode();
  const openGlobalSearchWindow = reactExports.useCallback(() => {
    sendMessage({
      type: "OpenGlobalSearchWindow"
    }).then(() => window.close()).catch(trackError);
  }, []);
  const openWebappForSecurityKeyUnlock = reactExports.useCallback(() => {
    browser.tabs.create({
      url: getFrontendServerUrl()
    }).catch(trackError);
    window.close();
  }, []);
  const doRequestUnlock = reactExports.useCallback(() => {
    if (webauthnOnlyUnlockSkipped) {
      openWebappForSecurityKeyUnlock();
    } else {
      requestUnlock();
    }
  }, [openWebappForSecurityKeyUnlock, requestUnlock, webauthnOnlyUnlockSkipped]);
  return /* @__PURE__ */ jsx(_h, { writeAuditlogEvent: (organizationId, event) => {
    sendMessage({
      type: "WriteAuditlogEvent",
      organizationId,
      event
    }).catch(trackError);
  }, children: /* @__PURE__ */ jsxs(PopupFrame, { domain: basicPopup ? void 0 : currentTab.host, displayMode, children: [
    clientOutdated ? /* @__PURE__ */ jsx(ClientOutdatedMessage, {}) : isReportingPage ? /* @__PURE__ */ jsx(ReportPage, { back: () => setIsReportingPage(false), reportPage, url: currentTab == null ? void 0 : currentTab.url, captureScreen, logins }) : userLoggedIn === void 0 ? /* @__PURE__ */ jsx(Basic, { unlockDeviceType, globalSearchShortcut, applePlatform, openGlobalSearchWindow: browserSupportsQuickAccess ? openGlobalSearchWindow : void 0, openWebappForSecurityKeyUnlock }) : !userLoggedIn ? /* @__PURE__ */ jsx(LoggedOut, { openWebapp }) : logins === void 0 || disabledForPage === void 0 || currentTab === void 0 || isUnlocked === void 0 || basicPopup ? /* @__PURE__ */ jsx(Basic, { isUnlocked, pushState, browserIsMobileSafari, requestUnlock: doRequestUnlock, unlockDeviceType, globalSearchShortcut, applePlatform, openGlobalSearchWindow: browserSupportsQuickAccess ? openGlobalSearchWindow : void 0, openWebappForSecurityKeyUnlock }) : /* @__PURE__ */ jsx(LoggedIn, { contentScriptBlocked: contentScriptBlockedByBrowser, logins, isUnlocked, pushState, requestUnlock: doRequestUnlock, undo, eTLDPlusOne: currentTab.eTLDPlusOne, disabledForPage, setDisabledForPage, disabledPageHost, autosnatchDisabled: !!autosnatchDisabled, setAutosnatchDisabled: disableAutosnatchWithAchievement, report: () => setIsReportingPage(true), browserName, checkTotpTimeOffset: async () => {
      await sendMessage({
        type: "RequestSync"
      });
    }, browserIsMobileSafari, incognito: currentTab.incognito, unlockDeviceType, applePlatform, globalSearchShortcut, openGlobalSearchWindow: browserSupportsQuickAccess ? openGlobalSearchWindow : void 0, openWebappForSecurityKeyUnlock, getUnprotectedValueForContentLoginWithContentId, copyToClipboardWithClear }),
    /* @__PURE__ */ jsxs(Ni, { children: [
      "Debug mode enabled!",
      " ",
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => debugMode.debug = false, className: "browser-style", children: "Disable" })
    ] })
  ] }) });
}
function useBrowserProperties() {
  return reactExports.useMemo(() => {
    const parsedBrowser = Bowser.parse(window.navigator.userAgent);
    const browserName = getBrowserName(parsedBrowser);
    const browserSupportsQuickAccess = I(parsedBrowser);
    const applePlatform = D(parsedBrowser);
    return {
      browserName,
      browserSupportsQuickAccess,
      applePlatform
    };
  }, []);
}
function useUserLoggedIn() {
  const [userLoggedIn, setUserLoggedIn] = reactExports.useState();
  reactExports.useEffect(() => {
    (async () => {
      const response = await sendMessage({
        type: "GetUser"
      });
      setUserLoggedIn(response !== messageError && !!(response == null ? void 0 : response.userId));
    })().catch(trackError);
  }, []);
  return userLoggedIn;
}
function useLogins() {
  const [logins, setLogins] = reactExports.useState();
  reactExports.useEffect(() => {
    const updateLogins = debounce(100, () => {
      (async () => {
        debugConsole.log("[PopupContainer]", "Update logins");
        const getLoginsResponse = await sendMessage({
          type: "GetLogins"
        });
        const newLogins = getLoginsResponse === messageError ? void 0 : getLoginsResponse == null ? void 0 : getLoginsResponse.logins;
        setLogins(newLogins);
      })().catch(trackError);
    });
    updateLogins();
    const messageListener = makeMessageListener({
      DataUpdate: updateLogins
    });
    browser.runtime.onMessage.addListener(messageListener);
    return () => browser.runtime.onMessage.removeListener(messageListener);
  }, []);
  useMarkAutosnatchesSeen(logins);
  return logins;
}
async function openWebapp() {
  if (isDesktopSafari()) {
    const webappUrl = new URL(getFrontendServerUrl());
    webappUrl.port = "";
    const granted = await browser.permissions.request({
      origins: [`${webappUrl}*`]
    });
    if (!granted) {
      return {
        permissionGranted: false
      };
    }
    await browser.runtime.sendNativeMessage("application.id", {
      type: "openHostApp"
    });
    return {
      permissionGranted: true
    };
  }
  window.open(getFrontendServerUrl());
  return {
    permissionGranted: true
  };
}
function useMarkAutosnatchesSeen(logins) {
  reactExports.useEffect(() => {
    if (!logins || !logins.length) {
      return;
    }
    const ids = logins.map((l) => l.undo).filter((u) => !!u && !u.seen).map((u) => u.id);
    if (!ids.length) {
      return;
    }
    const tid = window.setTimeout(() => {
      sendMessage({
        type: "MarkAutosnatchesSeen",
        ids
      }).catch(trackError);
    }, 500);
    return () => window.clearTimeout(tid);
  }, [logins]);
}
function useCurrentTab() {
  const [currentTab, setCurrentTab] = reactExports.useState();
  const initialRenderRef = reactExports.useRef(true);
  reactExports.useEffect(() => {
    if (!initialRenderRef.current) {
      return;
    }
    initialRenderRef.current = false;
    async function updateCurrentTab() {
      const activeTabs = await browser.tabs.query({
        active: true,
        currentWindow: true
      });
      const activeTab = activeTabs.length ? activeTabs[0] : void 0;
      if (activeTab == null ? void 0 : activeTab.url) {
        const url = activeTab.url;
        const incognito = activeTab.incognito;
        const host = getHost(url);
        const parsed = psl.parse(host);
        const eTLDPlusOne = parsed.error || parsed.domain === null ? host : parsed.domain;
        setCurrentTab((c) => ({
          url,
          incognito,
          host,
          eTLDPlusOne,
          contentScriptMode: c ? c.contentScriptMode : "default"
        }));
        const contentScriptMode = activeTab.id ? await sendMessageToTab(activeTab.id, {
          type: "GetContentScriptMode"
        }) : void 0;
        setCurrentTab({
          url,
          incognito,
          host,
          eTLDPlusOne,
          contentScriptMode: contentScriptMode === messageError ? void 0 : contentScriptMode
        });
      } else {
        setCurrentTab(void 0);
      }
    }
    updateCurrentTab().catch(trackError);
  }, []);
  return currentTab;
}
function useDisabledForPage(url) {
  const [disabledForPage, setDisabledForPage] = reactExports.useState();
  const [disabledPageHost, setDisabledPageHost] = reactExports.useState("");
  reactExports.useEffect(() => {
    (async () => {
      if (!url) {
        setDisabledForPage(void 0);
        setDisabledPageHost("");
        return;
      }
      const disabledSiteSettingResult = await sendMessage({
        type: "GetDisabledSiteSettingForUrl",
        url
      });
      if (disabledSiteSettingResult === messageError) {
        setDisabledForPage(void 0);
        setDisabledPageHost(getHost(url));
      } else {
        setDisabledForPage(disabledSiteSettingResult == null ? void 0 : disabledSiteSettingResult.disabled);
        setDisabledPageHost(disabledSiteSettingResult.host ?? getHost(url));
      }
    })().catch(trackError);
  }, [url]);
  const updateDisabled = reactExports.useCallback((newDisabled) => {
    if (!url || newDisabled === disabledForPage) {
      return;
    }
    setDisabledForPage(newDisabled);
    if (newDisabled) {
      addAchievement(Achievement.EXT_DISABLE_FOR_PAGE);
    }
    sendMessage({
      type: "SetDisabledSiteSettingForUrl",
      url,
      disabled: newDisabled
    }).catch(trackError);
    if (!newDisabled) {
      setDisabledPageHost(getHost(url));
    }
  }, [url, disabledForPage, setDisabledForPage]);
  return {
    disabledForPage,
    setDisabledForPage: updateDisabled,
    disabledPageHost
  };
}
function usePopupDisplayMode() {
  const [ref, {
    width: windowWidth
  }] = he();
  reactExports.useEffect(() => {
    ref(document.documentElement);
  }, [ref]);
  if (!isMobileSafari()) {
    return {
      displayMode: "desktopPopup",
      browserIsMobileSafari: false
    };
  }
  if (windowWidth === 320 || windowWidth === 375) {
    return {
      displayMode: "mobileSafariPopup",
      browserIsMobileSafari: true
    };
  }
  return {
    displayMode: "mobileSafariBottomSheet",
    browserIsMobileSafari: true
  };
}
function useGlobalSearchShortcut() {
  const [shortcut, setShortcut] = reactExports.useState();
  const requestingRef = reactExports.useRef();
  reactExports.useEffect(() => {
    if (requestingRef.current) {
      return;
    }
    const updateShortcut = async () => {
      requestingRef.current = true;
      const resp = await sendMessage({
        type: "GetGlobalSearchShortcut"
      });
      setShortcut(resp === messageError ? void 0 : resp == null ? void 0 : resp.globalSearchShortcut);
    };
    updateShortcut().catch(trackError);
  }, []);
  return shortcut;
}
function applyChromeRenderFix() {
  if (!chrome) {
    return;
  }
  if (
    // From testing the following conditions seem to indicate that the popup was opened on a secondary monitor
    window.screenLeft < 0 || window.screenTop < 0 || window.screenLeft > window.screen.width || window.screenTop > window.screen.height
  ) {
    chrome.runtime.getPlatformInfo((info) => {
      if (info.os === "mac") {
        const fontFaceSheet = new CSSStyleSheet();
        fontFaceSheet.insertRule(`
          @keyframes redraw {
            0% {
              opacity: 1;
            }
            100% {
              opacity: .99;
            }
          }
        `);
        fontFaceSheet.insertRule(`
          html {
            animation: redraw 1s linear infinite;
          }
        `);
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, fontFaceSheet];
      }
    });
  }
}
initSentry({
  entryPoint: "popup"
});
initUiLocale();
applyChromeRenderFix();
document.documentElement.classList.add(styles$a.popup);
ReactDOM.render(/* @__PURE__ */ jsx(I18nProvider, { i18n, children: /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(ExtDebugVisibleContextProvider, { children: /* @__PURE__ */ jsx(PopupContainer, {}) }) }) }), document.getElementById("root"));
//# sourceMappingURL=wrappedIndex-a1cbf947.js.map
