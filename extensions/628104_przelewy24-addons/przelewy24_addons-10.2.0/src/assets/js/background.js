browser = typeof browser === "undefined" ? chrome : browser;

 async function asyncResponse(promise) {
    return await promise;
}

browser.runtime.onMessage.addListener(function (message, sender, response) {
    let promise = {};
    switch (message.action) {
        case 'saveScenario':
            browser.storage.local.set({scenario: message.payload});
            break;
        case 'getScenario':
            promise = new Promise((resolve) => {
                browser.storage.local.get('scenario', function (scenario) {
                    resolve(scenario.scenario);
                });
            });
            asyncResponse(promise).then(response);
            return true;
        case 'saveValues':
            browser.storage.local.set({values: message.payload});
            break;
        case 'saveMethodId':
            browser.storage.local.set({methodId: message.payload});
            break;
        case 'saveP24Url':
            browser.storage.local.set({p24Url: message.payload});
            break;
        case 'getValues':
            promise = new Promise((resolve) => {
                browser.storage.local.get('values', function (values) {
                    resolve(values.values);
                })
            });
            asyncResponse(promise).then(response);
            return true;
        case 'getP24Url':
            promise = new Promise((resolve) => {
                browser.storage.local.get('p24Url', function (values) {
                    resolve(values.p24Url);
                })
            });
            asyncResponse(promise).then(response);
            return true;
        case 'getMethodId':
            promise = new Promise((resolve) => {
                browser.storage.local.get('methodId', function (values) {
                    resolve(values.methodId);
                })
            });
            asyncResponse(promise).then(response);
            return true;
    }
});
