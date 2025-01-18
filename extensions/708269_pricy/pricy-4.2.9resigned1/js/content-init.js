// Send initialization message to background.js
chrome.runtime.sendMessage({
    message: "init"
}, function(response) {});
