(function () {
var $76c59d0164f80671$exports = {};
chrome.runtime.onMessage.addListener(function(msg) {
    msg._skipForward = true;
    window.postMessage(msg, "*");
});
window.addEventListener("message", function(event) {
    if (event.origin === window.origin) {
        if (event.data && !event.data._skipForward) chrome.runtime.sendMessage(event.data);
    }
});
var $76c59d0164f80671$var$checkEle = document.createElement("div");
$76c59d0164f80671$var$checkEle.setAttribute("id", "w2g-extension-loaded");
$76c59d0164f80671$var$checkEle.setAttribute("data-version", chrome.runtime.getManifest().version);
$76c59d0164f80671$var$checkEle.style.display = "none";
document.body.appendChild($76c59d0164f80671$var$checkEle);
window.postMessage({
    w2g_extension_running: true
});

})();
