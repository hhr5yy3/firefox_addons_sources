(function mainContextMenu() {
    D.func();

    // create context menu
    chrome.commands.getAll(function onGetAllCommands(commands) {
        D.func();
        chrome.contextMenus.create({
            title: Strings.get("paste_login_command") + getCommandShortcut(commands, "paste_login"),
            contexts: Browser.getContextMenuContexts(),
            onclick: function onPasteLoginCommand(info, tab) {
                D.func();
                onPasteCommand(tab.id, "paste_login", info.frameUrl || info.pageUrl, info.frameUrl || info.pageUrl);
            }
        });
        chrome.contextMenus.create({
            title: Strings.get("paste_password_command") + getCommandShortcut(commands, "paste_password"),
            contexts: Browser.getContextMenuContexts(),
            onclick: function onPastePasswordCommand(info, tab) {
                D.func();
                onPasteCommand(tab.id, "paste_password", info.frameUrl || info.pageUrl, info.frameUrl || info.pageUrl);
            }
        });
        chrome.contextMenus.create({
            title: Strings.get("paste_one_time_password_command") + getCommandShortcut(commands, "paste_one_time_password"),
            contexts: Browser.getContextMenuContexts(),
            onclick: function onPasteOneTimePasswordCommand(info, tab) {
                D.func();
                onPasteCommand(tab.id, "paste_one_time_password", info.frameUrl || info.pageUrl, info.frameUrl || info.pageUrl);
            }
        });
        chrome.contextMenus.create({
            title: Strings.get("generate_password_command"),
            contexts: Browser.getContextMenuContexts(),
            onclick: function onGeneratePasswordCommand(info, tab) {
                D.func();
                onGenerateCommand(tab.id, info.frameUrl || info.pageUrl);
            }
        });
        // and set tooltip
        chrome.browserAction.setTitle({ title: "SafeInCloud 2" + getCommandShortcut(commands, "_execute_browser_action") });
    });

    // keyboard shortcuts
    chrome.commands.onCommand.addListener(function onCommandShortcut(command) {
        D.func();
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function onQueryActiveTab(tabs) {
            D.func();
            if (tabs && tabs.length != 0) {
                if (command == "paste_login" || command == "paste_password" || command == "paste_one_time_password") {
                    // TODO: make getfocusedurl.js that sends its url back if there is an active element
                    // get page url
                    chrome.tabs.sendMessage(tabs[0].id, {
                        target: "geturl.js"
                    }, function onGetUrl(response) {
                        D.func();
                        // paste
                        onPasteCommand(tabs[0].id, command, response.href, null);
                    });
                }
            }
        });
    });

    function getCommandShortcut(commands, name) {
        for (var i = 0; i < commands.length; i++) {
            if (commands[i].name == name) {
                if (commands[i].shortcut && commands[i].shortcut.lenght != 0) {
                    return " (" + commands[i].shortcut + ")";
                }
            }
        }
        return "";
    }

    function onGenerateCommand(tabId, target) {
        D.func();
        const length = Settings.getPasswordLength();
        const type = Settings.getPasswordType();
        const password = Generator.generatePassword(length, type);
        copyToClipboard(password);
        paste(tabId, target, { password: password }, "paste_password");
    }

    function onPasteCommand(tabId, command, href, target) {
        D.func(command, target);
        if (Client.hasToken()) {
            // has account ?
            let url = new URL(href).hostname;
            var currentAccount = Data.getCurrentAccount(url);
            if (currentAccount) {
                // paste it
                paste(tabId, target, currentAccount, command);
            } else {
                // get accounts
                Client.getAccounts(url, function(response) {
                    onGetAccounts(tabId, response, { target: target, command: command });
                });
            }
        } else {
            showMessage(Strings.get("locked_error"));
        }
    }

    function showMessage(message) {
        D.func();
        if (Browser.supportAlerts()) {
            window.alert(message);
        } else {
            chrome.notifications.create("safeincloud", {
                type: "basic",
                title: Strings.get("app_title"),
                message: message
            });
        }
    }

    function onGetAccounts(tabId, response, args) {
        D.func();
        D.print(response);
        if (response.error) {
            // error
            showMessage(response.error);
        } else {
            // success
            if (response.success) {
                if (!response.accounts || response.accounts.length == 0) {
                    // not found
                    showMessage(Strings.get("not_found_error"));
                } else {
                    // paste
                    var account = selectAccount(response.url, response.accounts);
                    var currentAccount = Data.setCurrentAccount(response.url, account);
                    paste(tabId, args.target, currentAccount, args.command);
                }
            } else {
                // access denied
                showMessage(Strings.get("locked_error"));
            }
        }
    }

    function selectAccount(url, accounts) {
        D.func(url);
        // select account with same login
        var currentAccount = Data.getCurrentAccount(url);
        if (currentAccount) {
            for (var i = 0; i < accounts.length; i++) {
                if (accounts[i].login == currentAccount.login) {
                    return accounts[i];
                }
            }
        }
        // select first
        return accounts.lenght != 0 ? accounts[0] : null;
    }

    function paste(tabId, href, account, command) {
        D.func();
        chrome.tabs.sendMessage(tabId, {
            target: "paste.js",
            href: href,
            account: account,
            command: command
        });
    }

    function copyToClipboard(text) {
        D.func(text);
        if (text) {
            // copy text
            const textArea = document.createElement("textarea");
            textArea.textContent = text;
            const body = document.querySelector("body");
            body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            body.removeChild(textArea);
        }
    }

})();