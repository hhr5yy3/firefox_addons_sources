window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == 'FROM_BANNER')) {
        chrome.runtime.sendMessage(event.data.data);
    }

}, false);