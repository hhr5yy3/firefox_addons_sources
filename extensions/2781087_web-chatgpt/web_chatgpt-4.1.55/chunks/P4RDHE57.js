import {
  SearchWithAISettingsAtom
} from "./EPPA4V3R.js";
import {
  getSearchWithAISettings,
  setSearchWithAISettings
} from "./M6PYVE3O.js";
import {
  Recoil_index_22
} from "./FQZJQWJR.js";

// src/features/searchWithAI/hooks/useSearchWithAISettings.ts
var useSearchWithAISettings = () => {
  const [settings, setSettings] = Recoil_index_22(SearchWithAISettingsAtom);
  const updateSettings = async (settingsOrUpdateFunction) => {
    try {
      if (settingsOrUpdateFunction instanceof Function) {
        const oldSettings = await getSearchWithAISettings();
        const newSettings = settingsOrUpdateFunction(oldSettings);
        setSettings((pre) => ({
          ...pre,
          ...newSettings
        }));
        await setSearchWithAISettings(newSettings);
      } else {
        setSettings((pre) => ({
          ...pre,
          ...settingsOrUpdateFunction
        }));
        await setSearchWithAISettings(settingsOrUpdateFunction);
      }
      return true;
    } catch (e) {
      return false;
    }
  };
  return {
    searchWithAISettings: settings,
    setSearchWithAISettings: updateSettings
  };
};
var useSearchWithAISettings_default = useSearchWithAISettings;

export {
  useSearchWithAISettings_default
};
