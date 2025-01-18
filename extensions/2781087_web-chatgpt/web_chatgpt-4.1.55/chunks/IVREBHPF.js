import {
  SettingsFeatureCardLayout_default
} from "./MN257VDU.js";
import {
  LanguageSelect_default
} from "./UHZW46LQ.js";
import {
  useUserConfig
} from "./7X5SX6GV.js";
import {
  useTranslation
} from "./DLRZRKOT.js";
import "./6NLHHV4N.js";
import "./FNVQU4MI.js";
import "./4QWY354J.js";
import "./FQZJQWJR.js";
import {
  ListItem_default,
  material_exports
} from "./2FH7W2EF.js";
import {
  ListItemText_default,
  List_default,
  require_jsx_runtime
} from "./JCIZV2AT.js";
import "./IHKLZ7RH.js";
import "./PMGMIR4S.js";
import "./LDFHRBBH.js";
import "./RBTIXGC2.js";
import {
  require_react
} from "./AMCWABVH.js";
import "./QVVA4RGO.js";
import "./KFVZFM6T.js";
import "./4NOIXOKC.js";
import "./XVTLOGGR.js";
import "./XOBJISN3.js";
import "./TOGVC2JX.js";
import "./2RTBHBIC.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/pages/options/pages/language/index.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var SettingsLanguagePage = () => {
  const { t } = useTranslation("settings");
  const { userConfig, setUserConfig } = useUserConfig();
  const [selectedValue, setSelectedValue] = (0, import_react.useState)(userConfig.language);
  const handleLanguageChange = (value) => {
    setSelectedValue(value);
    setUserConfig({
      language: value
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    SettingsFeatureCardLayout_default,
    {
      title: t("feature__preferred_language__title"),
      id: "language",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        List_default,
        {
          sx: {
            bgcolor: (theme) => theme.palette.mode === "dark" ? "rgb(32, 33, 36)" : "rgb(255,255,255)",
            // p: ' !important',
            borderRadius: "4px",
            border: (t2) => t2.palette.mode === "dark" ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.12)"
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem_default, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ListItemText_default,
              {
                primary: t(
                  "settings:feature__preferred_language__field_preferred_language_title"
                ),
                secondary: t(
                  "settings:feature__preferred_language__field_preferred_language_description"
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              LanguageSelect_default,
              {
                disablePortal: false,
                label: t("feature__preferred_language__select_label"),
                value: selectedValue,
                onChange: handleLanguageChange,
                placement: "bottom",
                sx: {
                  height: 40
                }
              }
            )
          ] })
        }
      )
    }
  );
};
var language_default = SettingsLanguagePage;
export {
  language_default as default
};
