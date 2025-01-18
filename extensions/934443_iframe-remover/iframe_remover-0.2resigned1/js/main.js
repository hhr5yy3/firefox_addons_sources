(function () {
    const SHORTCUT_REMOVE = 'shortcut_rm_iframes';
    const MSG_ANIMATE_ICON = 'animate_browser_action_icon';
    const MSG_PERFORM_REMOVING = 'perform_iframe_removing';
    const TAG = 'iframe';

    const OPTIONS_AUTO_ENABLED = 'enabled_auto_removing_doms';

    function removeDom() {
        console.log('removing iframe doms!!');
        let index = 0;
        let doms = document.getElementsByTagName(TAG);
        let element = document.getElementsByTagName(TAG);
        for (index = element.length - 1; index >= 0; index--) {
            element[index].parentNode.removeChild(element[index]);
        }
    }

    // to listen event from background script
    browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (msg === MSG_PERFORM_REMOVING) {
            browser.runtime.sendMessage(MSG_ANIMATE_ICON);
            removeDom();
        } else if (msg === SHORTCUT_REMOVE) {
            browser.runtime.sendMessage(MSG_ANIMATE_ICON);
            removeDom();
        }
    });

    // if auto-removing enabled, perform removing action in several times.
    browser.storage.local.get(OPTIONS_AUTO_ENABLED).then((r) => {
        if (r[OPTIONS_AUTO_ENABLED]) {
            // perform removing every 0.5 second, in case of js inject iFrame
            removeDom();
            let repeater = setInterval(() => {
                removeDom();
            }, 1000);

            // stop removing after 10 seconds
            setTimeout(function() {
                window.clearInterval(repeater);
            }, 10000);
        }
    });

})();

