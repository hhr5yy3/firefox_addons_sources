(function mainHasCardForm() {
    D.func();

    // listen to badge
    chrome.runtime.onMessage.addListener(function onMessage(message) {
        // calling us ?
        if (message.target === "hascardform.js") {
            D.func(message.tabId);
            chrome.runtime.sendMessage({
                target: "Badge",
                method: "onHasCardFormResponse",
                args: [message.tabId, hasCardForm()]
            });
        }
    });

    function hasCardForm() {
        D.func();
        let response = {};
        // find card form 
        let cardInputs = CardFinder.findInputs(document.location.href, document);
        if (cardInputs) {
            response.hasCardForm = true;
        }
        D.print(response);
        return response;
    }
})();