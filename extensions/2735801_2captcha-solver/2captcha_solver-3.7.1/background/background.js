/*
 * Show options page after installation
 */
browser.runtime.onInstalled.addListener(function(details) {
    if (details.reason == 'install') {
        if (browser.runtime.openOptionsPage) {
            browser.runtime.openOptionsPage();
        } else {
            self.open(browser.runtime.getURL('options/options.html'));
        }
    }
});


var API;

Config.getAll().then(config => {
    if (config.apiKey) {
        initApiClient(config.apiKey);
        if (config.valute === "RUB") {
            API.service = "rucaptcha.com";
        }
    }
});

function initApiClient(apiKey) {
    API = new TwoCaptcha({
        apiKey: apiKey,
        service: "2captcha.com",
        defaultTimeout: 300,
        pollingInterval: 5,
        softId: 2834,
    });
}

/*
 * Manage message passing
 */
browser.runtime.onConnect.addListener(function(port) {
    // Listen to messages sent from page
    port.onMessage.addListener(function (message) {
        // Register initial connection
        switch (message.command) {
            case 'recaptcha':
                API.grid(message.params)
                    .then((response) => {
                        port.postMessage({ command: 'recaptcha', request: message, response });
                    })
                    .catch(error => {
                        port.postMessage({ command: 'recaptcha', request: message, error: error.message});
                    });
                break;
            case 'solved':
                console.warn('Captcha already solved')
                break;
            default:
                let messageHandler = port.name + '_' + message.action;
                if (self[messageHandler] === undefined) return;
                self[messageHandler](message)
                    .then((response) => {
                        port.postMessage({action: message.action, request: message, response});
                    })
                    .catch(error => {
                        port.postMessage({action: message.action, request: message, error: error.message});
                    });
        }
    });
});

/*
 * Message handlers
 */
async function popup_login(msg) {
    initApiClient(msg.apiKey);

    let info = await API.userInfo();

    if (info.key_type !== "customer") {
        throw new Error("You entered worker key! Switch your account into \"customer\" mode to get right API-KEY");
    }

    info.valute = info.valute.toUpperCase();

    if (info.valute === "RUB") {
        API.service = "rucaptcha.com";
    }

    Config.set({
        apiKey: msg.apiKey,
        email:  info.email,
        valute: info.valute,
    });

    return info;
}

async function popup_logout(msg) {
    Config.set({apiKey: null});

    return {};
}

async function popup_getAccountInfo(msg) {
    let config = await Config.getAll();

    if (!config.apiKey) throw new Error("No apiKey");

    let info = await API.userInfo();

    info.valute = info.valute.toUpperCase();

    return info;
}

async function content_solve(msg) {
    return await API[msg.captchaType](msg.params);
}