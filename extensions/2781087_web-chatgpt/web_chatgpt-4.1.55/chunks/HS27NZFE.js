import {
  SettingsFeatureCardLayout_default
} from "./MN257VDU.js";
import {
  require_OpenInNewOutlined
} from "./NJI2XFKT.js";
import {
  useTranslation
} from "./DLRZRKOT.js";
import "./6MWXJIRO.js";
import {
  ListItemButton_default,
  ListItemText_default,
  List_default,
  require_jsx_runtime
} from "./JCIZV2AT.js";
import {
  chromeExtensionClientOpenPage
} from "./42XSBB7P.js";
import "./AMCWABVH.js";
import "./KFVZFM6T.js";
import "./XVTLOGGR.js";
import "./XOBJISN3.js";
import "./TOGVC2JX.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/pages/options/pages/prompt/index.tsx
var import_OpenInNewOutlined = __toESM(require_OpenInNewOutlined());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var SettingsPromptPage = () => {
  const { t } = useTranslation("settings");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    SettingsFeatureCardLayout_default,
    {
      title: t("feature__prompts__title"),
      id: "one-click-prompts",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        List_default,
        {
          component: "nav",
          sx: {
            bgcolor: (theme) => theme.palette.mode === "dark" ? "rgb(32, 33, 36)" : "rgb(255,255,255)",
            p: "0 !important",
            borderRadius: "4px",
            border: (t2) => t2.palette.mode === "dark" ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.12)",
            "& > * + .MuiListItem-root": {
              borderTop: "1px solid",
              borderColor: "customColor.borderColor"
            }
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            ListItemButton_default,
            {
              onClick: () => {
                chromeExtensionClientOpenPage({
                  url: "https://api.maxai.me/app/prompts-web?ref=webchatgpt-settings-prompts-web"
                });
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItemText_default, { primary: "MaxAI.me/prompts" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_OpenInNewOutlined.default, { sx: { fontSize: 20 } })
              ]
            }
          )
        }
      )
    }
  );
};
var prompt_default = SettingsPromptPage;
export {
  prompt_default as default
};
