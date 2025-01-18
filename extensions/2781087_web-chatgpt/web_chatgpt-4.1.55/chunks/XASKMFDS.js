import {
  RadioCardGroup_default
} from "./SGBXAV6E.js";
import {
  SettingsFeatureCardLayout_default
} from "./MN257VDU.js";
import {
  useTranslation
} from "./DLRZRKOT.js";
import {
  useSearchWithAISettings_default
} from "./P4RDHE57.js";
import "./EPPA4V3R.js";
import "./M6PYVE3O.js";
import "./FQZJQWJR.js";
import {
  FormControlLabel_default,
  RadioGroup_default,
  Radio_default,
  material_exports
} from "./2FH7W2EF.js";
import {
  Stack_default,
  Typography_default,
  require_jsx_runtime
} from "./JCIZV2AT.js";
import {
  getChromeExtensionAssetsURL
} from "./PMGMIR4S.js";
import {
  require_react
} from "./AMCWABVH.js";
import "./XOBJISN3.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/pages/options/pages/search-with-ai/FeatureSearchWithAICard.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var FeatureSearchWithAICard = () => {
  const { t } = useTranslation("settings");
  const { searchWithAISettings, setSearchWithAISettings } = useSearchWithAISettings_default();
  const [selectedValue, setSelectedValue] = (0, import_react.useState)(
    searchWithAISettings.enable
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    SettingsFeatureCardLayout_default,
    {
      title: t("feature__search_with_ai__title"),
      id: "search-with-ai",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        RadioCardGroup_default,
        {
          defaultValue: selectedValue ? "enabled" : "disabled",
          onChange: async (value) => {
            const isEnable = value === "enabled";
            setSelectedValue(isEnable);
            setSearchWithAISettings({
              enable: isEnable
            });
          },
          options: [
            {
              label: t("common:enabled"),
              value: "enabled",
              image: getChromeExtensionAssetsURL(
                "/images/settings/search-with-ai/search-with-ai-enabled.png"
              )
            },
            {
              label: t("common:disabled"),
              value: "disabled",
              image: getChromeExtensionAssetsURL(
                "/images/settings/search-with-ai/search-with-ai-disabled.png"
              )
            }
          ],
          maxWidth: 372
        }
      )
    }
  );
};
var FeatureSearchWithAICard_default = FeatureSearchWithAICard;

// src/pages/options/pages/search-with-ai/FeatureTriggerModeCard.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var TRIGGER_MODE_OPTIONS = [
  {
    name: "feature__search_with_ai__trigger_mode__always__name",
    value: "always",
    desc: "feature__search_with_ai__trigger_mode__always__desc"
  },
  {
    name: "feature__search_with_ai__trigger_mode__question-mask__name",
    value: "question-mask",
    desc: "feature__search_with_ai__trigger_mode__question-mask__desc"
  },
  {
    name: "feature__search_with_ai__trigger_mode__manual__name",
    value: "manual",
    desc: "feature__search_with_ai__trigger_mode__manual__desc"
  }
];
var FeatureTriggerModeCard = () => {
  const { t } = useTranslation("settings");
  const { searchWithAISettings, setSearchWithAISettings } = useSearchWithAISettings_default();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    SettingsFeatureCardLayout_default,
    {
      title: t("feature__search_with_ai__trigger_mode__title"),
      id: "trigger-mode",
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        RadioGroup_default,
        {
          "aria-labelledby": "demo-radio-buttons-group-label",
          value: searchWithAISettings.triggerMode,
          onChange: (event) => {
            const value = event.target.value;
            setSearchWithAISettings({
              triggerMode: value
            });
          },
          children: TRIGGER_MODE_OPTIONS.map((option) => {
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              FormControlLabel_default,
              {
                value: option.value,
                control: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Radio_default, {}),
                sx: {
                  mb: 2
                },
                label: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Stack_default, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    Typography_default,
                    {
                      variant: "body1",
                      color: "text.primary",
                      fontWeight: 600,
                      children: t(option.name)
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Typography_default, { variant: "body2", color: "text.secondary", children: t(option.desc) })
                ] })
              },
              option.value
            );
          })
        }
      )
    }
  );
};
var FeatureTriggerModeCard_default = FeatureTriggerModeCard;

// src/pages/options/pages/search-with-ai/index.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var SettingsSearchWithAIPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(Stack_default, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(FeatureSearchWithAICard_default, {}),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(FeatureTriggerModeCard_default, {})
  ] });
};
var search_with_ai_default = SettingsSearchWithAIPage;
export {
  search_with_ai_default as default
};
