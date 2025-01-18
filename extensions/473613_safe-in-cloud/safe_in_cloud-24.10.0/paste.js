(function mainPaste() {
    D.func();

    // listen
    chrome.runtime.onMessage.addListener(function onMessage(message, sender, callback) {
        // calling us ?
        if (message.target == "paste.js" && (!message.href || message.href == document.location.href)) {
            paste(message.account, message.command);
        }
    });

    function paste(account, command) {
        D.func();
        if (account && FindHelper.isInput(document.activeElement)) {
            if (command == "paste_login") {
                InputFiller.fillText(document.activeElement, account.login);
            } else if (command == "paste_password") {
                InputFiller.fillText(document.activeElement, account.password);
            } else if (command == "paste_one_time_password") {
                InputFiller.fillText(document.activeElement, account.passcode);
            }
        }
    }
})();