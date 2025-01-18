import {
  SearchWithAISettingsAtom
} from "./EPPA4V3R.js";
import {
  getSearchWithAISettings
} from "./M6PYVE3O.js";
import {
  Recoil_index_24
} from "./FQZJQWJR.js";
import {
  require_react
} from "./AMCWABVH.js";
import {
  ContentScriptConnectionV2
} from "./KFVZFM6T.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/features/searchWithAI/hooks/useSearchWithAISettingsInit.ts
var import_react = __toESM(require_react());
var port = new ContentScriptConnectionV2({
  runtime: "client"
});
var useSearchWithAISettingsInit = () => {
  const setSettings = Recoil_index_24(SearchWithAISettingsAtom);
  const firstLoaded = (0, import_react.useRef)(true);
  (0, import_react.useEffect)(() => {
    const updateAppSettings = async () => {
      const settings = await getSearchWithAISettings();
      if (settings) {
        if (firstLoaded.current) {
          setSettings({
            ...settings,
            loaded: true
          });
          firstLoaded.current = false;
        } else {
          setSettings((pre) => ({
            ...pre,
            ...settings
          }));
        }
      }
    };
    updateAppSettings();
    window.addEventListener("focus", updateAppSettings);
    return () => {
      window.removeEventListener("focus", updateAppSettings);
    };
  }, []);
  return null;
};
var useSearchWithAISettingsInit_default = useSearchWithAISettingsInit;

export {
  useSearchWithAISettingsInit_default
};
