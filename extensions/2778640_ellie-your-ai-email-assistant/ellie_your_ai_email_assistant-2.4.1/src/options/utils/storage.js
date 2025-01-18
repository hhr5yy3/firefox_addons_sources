export async function getStorage(...keys) {
  return new Promise((resolve) => {
    let getter = keys.reduce((out, k) => ({ ...out, [k]: "" }), {});
    chrome.storage.sync.get(getter, resolve);
  });
}

export async function setStorage(obj) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(obj, resolve);
  });
}
