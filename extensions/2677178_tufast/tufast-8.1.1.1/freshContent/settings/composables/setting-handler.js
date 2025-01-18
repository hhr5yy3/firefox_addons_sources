import {useChrome} from "./chrome.js";
import * as owaModule from "../../../modules/owaFetch.js";
import * as opalModule from "../../../modules/opalInline.js";
const {sendChromeRuntimeMessage} = useChrome();
export const useSettingHandler = () => ({
  opalPdf,
  owa,
  se
});
const opalPdf = async (verb, option) => {
  switch (verb) {
    case "check":
      return await opalModule.checkOpalFileStatus();
    case "enable":
      return await (option === "inline" ? opalModule.enableOpalInline() : opalModule.enableOpalFileNewTab());
    case "disable":
      await (option === "inline" ? opalModule.disableOpalInline() : opalModule.disableOpalFileNewTab());
      return true;
  }
  return false;
};
const owa = async (verb, option) => {
  switch (verb) {
    case "check":
      return await owaModule.checkOWAStatus();
    case "enable":
      return await (option === "fetch" ? owaModule.enableOWAFetch() : owaModule.enableOWANotifications());
    case "disable":
      await (option === "fetch" ? owaModule.disableOWAFetch() : owaModule.disableOWANotifications());
      return true;
  }
  return false;
};
const se = async (verb, option) => {
  if (verb === "check")
    return await sendChromeRuntimeMessage({cmd: `${verb}_se_status`});
  else
    return await sendChromeRuntimeMessage({cmd: `${verb}_se_${option}`});
};
