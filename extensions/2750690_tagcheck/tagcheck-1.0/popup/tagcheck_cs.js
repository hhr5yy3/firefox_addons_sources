
(function() {
    if (window.tc_hasRun) {
        console.warn("not running again");
        return;
    }
    window.tc_hasRun = true;
    function handleMessage(request, sender, sendResponse) {
        function notifyHelper(message) {
            console.log("notify helper");
            browser.runtime.sendMessage(message);
        }
        exportFunction(notifyHelper, window, { defineAs: 'tagCheck_notifyHelper'});
        window.eval(`
            (function() {
                if(typeof window.ga != 'undefined') {
                    console.log("UA detected");
                    window.ga(() => {
                        try {
                            var tagCheck_gaResults = window.ga.getAll().map(tag => tag.get('trackingId'));
                            window.tagCheck_notifyHelper({ ua: tagCheck_gaResults });
                        } catch(e) {
                            console.error(e);
                        }
                    });
                }
                const gaFourKeys = [];
                if(typeof window.google_tag_manager != 'undefined') {
                    console.log("GTM detected");
                    const keys = Object.keys(window.google_tag_manager).filter(key => key.startsWith("GTM-"));
                    if(keys.length > 0)
                        window.tagCheck_notifyHelper({ gtm: keys });
                    gaFourKeys.push(...Object.keys(window.google_tag_manager).filter(key => key.startsWith("G-")));
                }
                if(gaFourKeys.length > 0)
                    window.tagCheck_notifyHelper({ "ga4": gaFourKeys });
            })();
            
        `);
    }
      
    browser.runtime.onMessage.addListener(handleMessage);
})();
