(function () {
    var component = {};

    component.namespace = 'postila';

    chrome.runtime.onMessage.addListener(function (msg) {
        if (msg.namespace == 'postila') {
            if (msg.preparePageForScreenshot) {
                document.body.style.cursor = 'wait';
                console.info('wait');
            }

            if (msg.screenshotDone) {
                document.body.style.cursor = 'inherit';
            }
        }
    });

    if (typeof shortcut != 'undefined') {
        shortcut.add('Ctrl+Shift+A', function() {
            chrome.runtime.sendMessage({
                namespace: component.namespace,
                action: 'newPost'
            });
        });

        shortcut.add('Ctrl+Shift+C', function() {
            chrome.runtime.sendMessage({
                namespace: component.namespace,
                action: 'screenshot'
            });
        });

        shortcut.add('Ctrl+Shift+P', function() {
            chrome.runtime.sendMessage({
                namespace: component.namespace,
                action: 'gotoPostila'
            });
        });
    }
})();