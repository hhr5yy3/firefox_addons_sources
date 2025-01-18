export function isFirefox() {
  return !!(typeof globalThis.browser !== "undefined" && globalThis.browser.runtime && globalThis.browser.runtime.getBrowserInfo);
}
export function getBrowserNetRequestPermissions() {
  return isFirefox() ? ["webRequest", "webRequestBlocking"] : ["declarativeNetRequestWithHostAccess"];
}
