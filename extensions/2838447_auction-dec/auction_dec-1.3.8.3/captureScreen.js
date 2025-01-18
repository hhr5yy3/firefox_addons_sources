document.addEventListener('click', function (event) {
    const element = event.target;
    if (element.tagName === 'BUTTON' || element.tagName === 'A') {
        browser.runtime.sendMessage({command: "capture_screenshot"});
    }
    if (element.tagName === 'INPUT' && (element.type === 'button' || element.type === 'submit' || element.type === 'reset')) {
        browser.runtime.sendMessage({command: "capture_screenshot"});
    }
});
