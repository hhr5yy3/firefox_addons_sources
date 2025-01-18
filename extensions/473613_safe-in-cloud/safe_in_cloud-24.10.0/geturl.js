(function mainGetUrl() {
    // listen
    chrome.runtime.onMessage.addListener(function onMessage(message, sender, callback) {
        // calling us ?
        if (message.target === "geturl.js") {
            callback({
                url: document.location.hostname,
                href: document.location.href,
                title: document.title
            });
        }
    });
})();