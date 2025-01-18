(function mainBackground() {
    D.func();
    // listen to messages from popup and content scripts
    chrome.runtime.onMessage.addListener(function onMessage(message, sender, callback) {
        D.func();
        // redirect message to background target
        if (message.target) {
            var target = window[message.target];
            if (target) {
                if (message.method) {
                    var method = target[message.method];
                    if (method) {
                        var args = message.args || [];
                        args.push(callback);
                        args.push(sender);
                        return method.apply(target, args);
                    }
                }
            }
            throw "Invalid message: " + message.target + "." + message.method;
        }
    });
})();
