import {
  RadioCardGroup_default
} from "./SGBXAV6E.js";
import {
  SettingsFeatureCardLayout_default
} from "./MN257VDU.js";
import {
  useUserConfig
} from "./7X5SX6GV.js";
import {
  useTranslation
} from "./DLRZRKOT.js";
import "./4QWY354J.js";
import "./FQZJQWJR.js";
import {
  material_exports
} from "./2FH7W2EF.js";
import {
  Stack_default,
  require_jsx_runtime
} from "./JCIZV2AT.js";
import {
  getChromeExtensionAssetsURL
} from "./PMGMIR4S.js";
import "./LDFHRBBH.js";
import {
  require_react
} from "./AMCWABVH.js";
import "./4NOIXOKC.js";
import "./XVTLOGGR.js";
import "./XOBJISN3.js";
import "./TOGVC2JX.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/pages/options/pages/appearance/FeatureAppearanceCard.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var FeatureAppearanceCard = () => {
  const { t } = useTranslation(["settings", "common"]);
  const { userConfig, setUserConfig } = useUserConfig();
  const [selectedValue, setSelectedValue] = (0, import_react.useState)(userConfig.colorSchema);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    SettingsFeatureCardLayout_default,
    {
      title: t("feature__appearance__title"),
      id: "appearance",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        RadioCardGroup_default,
        {
          defaultValue: selectedValue,
          onChange: async (selectValue) => {
            const value = selectValue;
            setSelectedValue(value);
            setUserConfig({
              colorSchema: value
            });
          },
          options: [
            {
              label: t("common:auto"),
              value: "auto",
              image: getChromeExtensionAssetsURL(
                "/images/settings/appearance/appearance-auto.png"
              )
            },
            {
              label: t("common:light"),
              value: "light",
              image: getChromeExtensionAssetsURL(
                "/images/settings/appearance/appearance-light.png"
              )
            },
            {
              label: t("common:dark"),
              value: "dark",
              image: getChromeExtensionAssetsURL(
                "/images/settings/appearance/appearance-dark.png"
              )
            }
          ],
          maxWidth: 372
        }
      )
    }
  );
};
var FeatureAppearanceCard_default = FeatureAppearanceCard;

// src/pages/options/pages/appearance/index.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var SettingsAppearancePage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Stack_default, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FeatureAppearanceCard_default, {}) });
};
var appearance_default = SettingsAppearancePage;
export {
  appearance_default as default
};
