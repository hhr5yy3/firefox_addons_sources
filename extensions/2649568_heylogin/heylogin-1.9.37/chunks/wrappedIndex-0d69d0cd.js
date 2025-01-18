import { ah as nn, Z, a as jsxs, c as classNames, ai as d, j as jsx, T as Trans, aj as HEYLOGIN_VERSION, ak as debugMode, e as getFrontendServerUrl, r as reactExports, al as jsonParseThaw, t as initSentry, v as initUiLocale, b as ReactDOM, w as I18nProvider, i as i18n, R as React, E as ExtDebugVisibleContextProvider, x as lh } from "./ExtDebugVisibleContext-6460380f.js";
import { s as sendMessage, t as trackError, b as browser } from "./message-939596d6.js";
import { u as useErrorHandlingCallback } from "./useErrorHandlingCallback-683f360e.js";
function Options() {
  const debugVisible = nn();
  const settingsLink = `${getFrontendServerUrl()}/settings`;
  const handleForceSyncClick = useErrorHandlingCallback(async () => {
    await Promise.all([sendMessage({
      type: "RequestSync"
    }), sendMessage({
      type: "ForceOverrideUpdate"
    })]);
  }, []);
  const handleForceRefreshClientCoreParameters = useErrorHandlingCallback(async () => {
    await sendMessage({
      type: "RequestForceRefreshClientCoreParameters"
    });
  }, []);
  const overridesUpdateTime = useOverrideUpdateTime();
  const uiMode = Z();
  return (
    // Q: Why is there className="browser-style" everywhere?
    // A: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Browser_styles
    // Q: When can we remove this?
    // A: https://bugzilla.mozilla.org/show_bug.cgi?id=1465256
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: classNames(d.defaultStyle, uiMode === "dark" ? d.darkMode : d.lightMode),
        style: {
          minHeight: "15rem"
        },
        children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx(Trans, { id: "csCoda" }),
            " ",
            HEYLOGIN_VERSION
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx(Trans, { id: "uP0aE4" }),
            " ",
            (overridesUpdateTime == null ? void 0 : overridesUpdateTime.toISOString()) ?? /* @__PURE__ */ jsx("em", { children: /* @__PURE__ */ jsx(Trans, { id: "rtir7c" }) })
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("a", { href: settingsLink, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsx("button", { type: "button", className: "browser-style", children: /* @__PURE__ */ jsx(Trans, { id: "Yp+Hi/" }) }) }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: handleForceSyncClick, className: "browser-style", children: /* @__PURE__ */ jsx(Trans, { id: "NAPj3s" }) })
          ] }),
          debugVisible && /* @__PURE__ */ jsxs("p", { style: {
            border: "5px solid #f0f"
          }, children: [
            "Debug mode enabled!",
            " ",
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => debugMode.debug = false, className: "browser-style", children: "Disable" }),
            " ",
            /* @__PURE__ */ jsx("button", { type: "button", onClick: handleForceRefreshClientCoreParameters, className: "browser-style", children: "Force refresh ClientCoreParameters" })
          ] })
        ]
      }
    )
  );
}
function useOverrideUpdateTime() {
  const [overridesUpdateTime, setOverridesUpdateTime] = reactExports.useState();
  reactExports.useEffect(() => {
    async function getOverrideUpdateTime() {
      const storageValues = await browser.storage.local.get(["overridesUpdateTime"]);
      try {
        const newTime = jsonParseThaw(storageValues.overridesUpdateTime);
        if (newTime === void 0 || newTime instanceof Date) {
          setOverridesUpdateTime(newTime);
        }
      } catch (e) {
        setOverridesUpdateTime(void 0);
      }
    }
    function handleStorageChanged(changes) {
      if (changes.overridesUpdateTime === void 0) {
        return;
      }
      getOverrideUpdateTime().catch(trackError);
    }
    getOverrideUpdateTime().catch(trackError);
    browser.storage.local.onChanged.addListener(handleStorageChanged);
    return () => {
      browser.storage.local.onChanged.removeListener(handleStorageChanged);
    };
  }, []);
  return overridesUpdateTime;
}
initSentry({
  entryPoint: "options"
});
initUiLocale();
ReactDOM.render(/* @__PURE__ */ jsx(I18nProvider, { i18n, children: /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(ExtDebugVisibleContextProvider, { children: /* @__PURE__ */ jsx(lh, { children: /* @__PURE__ */ jsx(Options, {}) }) }) }) }), document.getElementById("root"));
//# sourceMappingURL=wrappedIndex-0d69d0cd.js.map
