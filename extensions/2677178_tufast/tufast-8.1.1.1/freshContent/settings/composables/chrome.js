export const useChrome = () => ({
  setChromeLocalStorage,
  getChromeLocalStorage,
  removeChromeLocalStorage,
  sendChromeRuntimeMessage
});
const setChromeLocalStorage = async (items) => await chrome.storage.local.set(items);
const getChromeLocalStorage = async (keys) => {
  if (typeof keys === "string") {
    const {[keys]: response} = await chrome.storage.local.get(keys);
    return response;
  } else {
    return await chrome.storage.local.get(keys);
  }
};
const removeChromeLocalStorage = async (keys) => await chrome.storage.local.remove(keys);
const sendChromeRuntimeMessage = async (cmd) => await chrome.runtime.sendMessage(cmd);
