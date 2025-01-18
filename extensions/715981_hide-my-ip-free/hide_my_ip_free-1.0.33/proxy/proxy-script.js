/* exported FindProxyForURL */

var proxified = "DIRECT";
var skiped = "DIRECT";

// tell the background script that we are ready
browser.runtime.sendMessage("init");

// listen for updates to the blocked host list
browser.runtime.onMessage.addListener((message) => {
  proxified = message;
});

// required PAC function that will be called to determine
// if a proxy should be used.
function FindProxyForURL(url, host) {
  if (url.indexOf('api.hide-my-ip.com') != -1 || url.indexOf('www.hideyourselfonline.com') != -1) {
    browser.runtime.sendMessage(`skiped ${url}`);
    return skiped;
  }
  // proxified.host && browser.runtime.sendMessage(`proxified ${proxified.host}:${proxified.port} type=${proxified.type}`);
  if (proxified.type === 'https' && url.indexOf('https') === -1) {
    proxified.type = 'http';
  }
  return proxified.host ? [proxified] : 'DIRECT';
}
