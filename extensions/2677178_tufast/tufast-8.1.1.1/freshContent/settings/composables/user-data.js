import {useChrome} from "./chrome.js";
const {
  setChromeLocalStorage,
  sendChromeRuntimeMessage
} = useChrome();
export const useUserData = () => ({
  saveUserData,
  deleteUserData
});
const saveUserData = async (uname, pwd, platform) => {
  await setChromeLocalStorage({isEnabled: true});
  await sendChromeRuntimeMessage({
    cmd: "set_user_data",
    userData: {user: uname, pass: pwd},
    platform
  });
};
const deleteUserData = async (platform) => {
  await sendChromeRuntimeMessage({cmd: "clear_badge"});
  await sendChromeRuntimeMessage({cmd: "delete_user_data", platform});
  await setChromeLocalStorage({isEnabled: false});
  if (platform === "zih") {
    await sendChromeRuntimeMessage({cmd: "disable_owa_fetch"});
    await setChromeLocalStorage({enabledOWAFetch: false});
    await setChromeLocalStorage({additionalNotificationOnNewMail: false});
  }
};
