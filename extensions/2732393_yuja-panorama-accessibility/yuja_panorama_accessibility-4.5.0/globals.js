let receivedMessage = false;
const MESSAGE_RETRY_INTERVAL_MS = 500;
const MAX_RETRIES = 5;
let isLoggedIn = false;

let GLOBALS = {
    domain: null,
    lmsType: null,
    userRole: null,
    userId: null,
    institution: null,
    token: null,
    panoramaCDNUrl: null,
    panoramaServerUrl: null,
    portalServerUrl: null,
};

const LMS_TYPES = {
    D2L: 'd2l',
    BLACKBOARD: 'blackboard-rest',
    CANVAS: 'canvas',
    MOODLE: 'moodle',
    EXTERNAL: 'website-accessibility',
    SMART_SPEAKER: 'smart-speaker',
};

function loadScript(url, elementToLoadIn = document, scriptId = null) {
    const script = elementToLoadIn.createElement('script');
    script.src = url;
    if (scriptId && scriptId.length > 0) {
        script.id = scriptId;
    }
    elementToLoadIn.head.appendChild(script);
}

function removeScript(scriptId) {
    const script = document.getElementById(scriptId);
    script?.remove();
}

async function getObjectFromGoogleStorage(keys) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(keys, function (value) {
                resolve(value);
            });
        } catch (ex) {
            reject(ex);
        }
    });
}

async function setObjectToGoogleStorage(obj) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.set(obj, function () {
                resolve();
            });
        } catch (ex) {
            reject(ex);
        }
    });
}

async function removeObjectToGoogleStorage(keys) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.remove(keys, function () {
                resolve();
            });
        } catch (ex) {
            reject(ex);
        }
    });
}

function warnOnClientBrowser(msg) {
    console.warn(msg);
}

function injectCallbackOnClickEventsToElements(elements, callback) {
    if (!elements) {
        return;
    }

    elements.forEach((element) => {
        element.onclick = () => {
            callback(element);
        };
    });
}

function injectCallbackOnFocusEventsToElements(elements, callback) {
    if (!elements) {
        return;
    }

    elements.forEach((element) => {
        element.onfocus = () => {
            callback(element);
        };
    });
}

function injectCallbackOnMouseOverEventsToElements(elements, callback) {
    if (!elements) {
        return;
    }

    elements.forEach((element) => {
        element.onmouseover = () => {
            callback(element);
        };
    });
}

function injectCallbackOnFocusAndOnMouseOverEventsToElements(
    elements,
    callback,
) {
    injectCallbackOnFocusEventsToElements(elements, callback);
    injectCallbackOnMouseOverEventsToElements(elements, callback);
}

function callbackWhenDOMReady(dom, callback) {
    if (!dom.readyState) {
        return;
    }

    if (dom.readyState === 'complete') {
        callback();
    } else {
        dom.addEventListener('readystatechange', (event) => {
            if (event.target.readyState === 'complete') {
                callback();
            }
        });
    }
}

function callbackOnDomElementsLoaded(dom, queryString, callback) {
    if (!dom.readyState) {
        return;
    }

    const maxTries = 20;
    let tryCount = 0;
    let checker = setInterval(function () {
        tryCount++;
        if (tryCount > maxTries) {
            clearInterval(checker);
        }

        if (!dom.readyState || !dom.querySelectorAll) {
            clearInterval(checker);
            return;
        }

        let elements = dom.querySelectorAll(queryString);
        if (elements && elements.length > 0) {
            clearInterval(checker);
            callback(elements);
        }
    }, 1000);
}

function callBackOnPageURLChange(checkFunction, callback) {
    const maxTries = 20;
    let tryCount = 0;
    let checker = setInterval(function () {
        tryCount++;
        if (tryCount > maxTries) {
            clearInterval(checker);
        }

        if (checkFunction()) {
            clearInterval(checker);
            callback();
        }
    }, 500);
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function formDomQueryStringFromMap(map) {
    let queryString = '';
    let mapEntries = Object.entries(map);

    for (const [index, [key, value]] of Object.entries(mapEntries)) {
        queryString += value;
        if (index < mapEntries.length - 1) {
            queryString += ', ';
        }
    }

    return queryString;
}

window.globalInitialized = true;
