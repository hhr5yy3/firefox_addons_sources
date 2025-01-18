/**
 * Provides background functionality to retrieve session id from the login page of http-proxy by injecting a hooker
 * script, then supply received session id as the proxy credentials to the browser
 *
 * @author Deniz Mert Tecimer
 * 		Date 12/04/2022 04:16 PM
 */

let sessionId = "Not initialized!";
const headerName = "x-kron-sessionid";
let addHeader = false;

//Checks if browser api is available, thus checking the browser type
if (browser) {

    browser.storage.sync.get("isActivated").then((result) => {

        let isActivated = result === undefined ? undefined : result.isActivated;
        if (isActivated === undefined) {
            browser.storage.sync.set({"isActivated": true});
        }
    }, (e) => {
        console.log(e);
    });

    //Triggered when the extension is installed and if the value with header name is undefined, sets such a variable in
    //the browser storage and configures the listeners according to the activation of the extension
    browser.runtime.onInstalled.addListener(() => {
        browser.storage.sync.get([headerName]).then((result) => {
            let headerSet = result === undefined ? undefined : result[headerName];
            if (headerSet === undefined) {
                browser.storage.sync.set({[headerName]: sessionId}).then(() => {
                    //console.log(headerName + " set as: " + sessionId);
                }, (e) => {
                    console.log(e);
                });
            }
        }, (e) => console.log(e));
        setupListeners();
    });

    //Triggered when browser starts up and configures the listeners according to the activation of the extension
    browser.runtime.onStartup.addListener(() => {
            setupListeners();
        }
    );

    //Triggered when an extension is enabled from the browser's extension settings and checks if it is our extension
    //by the extension id and configures the listeners according to the activation of the extension
    browser.management.onEnabled.addListener((extensionInfo) => {
        if (extensionInfo["id"] === browser.runtime.id) {
            setupListeners();
        }
    });

    //Triggered when an extension is disabled from the browser's extension settings and checks if it is our extension
    //by the extension id and configures the listeners according to the activation of the extension
    browser.management.onDisabled.addListener((extensionInfo) => {
        if (extensionInfo["id"] === browser.runtime.id) {
            setupListeners();
        }
    });

    //Triggered when an extension is uninstalled from the browser's extension settings and checks if it is our extension
    //by the extension id and configures the listeners according to the activation of the extension
    browser.management.onUninstalled.addListener((extensionInfo) => {
        if(extensionInfo["id"] === browser.runtime.id){
            setupListeners();
        }
    });

    //Triggered when a value in browser's storage has changed and applies changes according to the changed value
    browser.storage.onChanged.addListener(function (changes, namespace) {
        for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
            if (namespace === "sync" && key === headerName) {
                //If changed value is the session id, then updates the session id
                sessionId = newValue;

                //console.log(headerName + " value updated!");
                //updateSessionId();
            } else if (namespace === "sync" && key === "isActivated") {
                //If changed value is the activation of the extension, then configures the listeners
                if (newValue === true) {
                    registerListeners();
                } else if (newValue === false) {
                    cleanUp();
                }
            }
            /* console.log(
                 `Storage key "${key}" in namespace "${namespace}" changed.`,
                 `Old header value was "${oldValue}", new value is "${newValue}".`
             );*/
        }
    });
} else {
    console.log("Browser type is not compatible!");
}

//Returns the retrieved session id as proxy authentication credentials
function getCredentials() {
    //console.log("Authenticating...");
    //console.log(sessionId);
    if (sessionId === undefined || sessionId === null) {
        console.log(headerName + " cannot be retrieved, please try again after refreshing the page!");
    }
    return {authCredentials: {username: sessionId, password: "kron-trial"}};
}

// Extra functionality to append a header to requests that match some certain criteria
function updateSessionId() {
    //console.log("Header " + headerName + " and its value has been updated as " + sessionId);
    if (addHeader && !browser.webRequest.onBeforeSendHeaders.hasListener(updateHeaderListener)) {
        browser.webRequest.onBeforeSendHeaders.addListener(updateHeaderListener, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);
    }
}

//Sets up listeners based on the activation of the extension
function setupListeners() {
    browser.storage.sync.get("isActivated").then(
        (result) => {
            let isActive = result["isActivated"];
            if (isActive) {
                registerListeners();
            } else {
                cleanUp();
            }
        }, (e) => {
            console.log(e);
        }
    );
}

function cleanUp() {
    removeListeners();
    clearStorage();
}

function registerListeners() {
    if (!browser.webNavigation.onCommitted.hasListener(injectScript)) {
        //Triggered when user directs to a URL that contains the criteria
        browser.webNavigation.onCommitted.addListener(
            injectScript,
            {url: [{urlContains: "/auth?url="}]}
        );
    }

    if (!browser.webRequest.onAuthRequired.hasListener(getCredentials)) {
        //Triggered when a response with a 401 or 407 status code is returned
        browser.webRequest.onAuthRequired.addListener(getCredentials,
            {urls: ["https://*/?url=*", "http://*/?url=*"]}, ["blocking"]);
    }

    //updateSessionId();
    //console.log("Listeners have been registered!");
}

function updateHeaderListener(requestInfo) {
    //console.log("Header added with value: " + sessionId);
    let header = {
        name: headerName,
        value: sessionId
    };
    requestInfo.requestHeaders.push(header);
    return {requestHeaders: requestInfo.requestHeaders};
}

function removeListeners() {
    if (browser.webRequest.onBeforeSendHeaders.hasListener(updateHeaderListener)) {
        browser.webRequest.onBeforeSendHeaders.removeListener(updateHeaderListener);
    }

    if (browser.webNavigation.onCommitted.hasListener(injectScript)) {
        browser.webNavigation.onCommitted.removeListener(injectScript);
    }

    if (browser.webRequest.onAuthRequired.hasListener(getCredentials)) {
        browser.webRequest.onAuthRequired.removeListener(getCredentials);
    }
    //console.log("Existing listeners have been removed!");
}

function clearStorage() {
    browser.storage.sync.remove(headerName).then(
        () => {
            // console.log(headerName + " removed from storage!");
        }
        , (e) => {
            console.log(e);
        });
}

function injectScript() {
    browser.tabs.executeScript({
        file: 'hooker.js',
        runAt: "document_idle",
    });
}

