import {
  UserConfigInit,
  useInitI18n
} from "./WP4FFO4A.js";
import {
  useSearchWithAISettingsInit_default
} from "./7VGRMZHF.js";
import {
  require_jsx_runtime
} from "./JCIZV2AT.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/components/AppInit/OptionPageInit.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var OptionPageInit = () => {
  useInitI18n();
  useSearchWithAISettingsInit_default();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserConfigInit, {}) });
};
var OptionPageInit_default = OptionPageInit;

export {
  OptionPageInit_default
};
