window.browser.runtime.onMessage.addListener( (message, sender, sendResponse) => {
    if(message.action == 'GetScriptsList') {
        sendResponse({tab: message.tab, head: document.head.innerHTML, body: document.body.innerHTML});
    }
});