/* The Background script is the part of the WebExtension which is constantly running,
    managing messages from and to Content scripts and NativeApplications. It acts as
    a simple relay with privileged access to the NativeApplication.

    To display the console, go to Chrome Extensions manager and click on 'background
    page' in the Extension details. It will open a console page with background.js */

if (typeof (browser) === 'undefined') {
    console.log("'browser' namespace not defined - running in Chrome/Edge");
    browserName = "Chrome";
    browser = chrome;

    if (chrome.system === undefined) {
        throw new Error("Chromium based browser and no chrome.system available.");
    }
}

if (browserName != "Safari" && browser.runtime.getManifest().manifest_version === 3) {
    console.log("importing scripts");
    
    // also import all custom.js files mentioned in the content script list
    let contentScripts = browser.runtime.getManifest().content_scripts[0].js;
    const customFileRegexp = new RegExp("^([\\w\\-]*\\/)*custom.js$"); // match all custom.js files
    let customContentScripts = contentScripts.filter((item)=> customFileRegexp.test(item));
    console.log("Found the following 'custom' scripts:", customContentScripts);

    importScripts("externalLibraries/base64.js", "app_settings.js", ...customContentScripts, "utility.js", "logger.js");
}
console.log("app_settings: ", boundaries);

var g_transactions = {};
var g_lastTransactionTimestamp = 0; // for Safari keep-alive interval function
let overalZoom = 1;  // default value. will be properly set-up later by "init" message
// let osZoom = 1;      // device pixel ratio on OS level
// let browserZoom = 1;
// let toolbarHeight = 0;

var backend = {
    version: "unknown",
    connected: true
};

var middleware = {
    connected: true // we assume middleware is connected as long as we dont have a response from the backend (can be ~.4s)
};
var webSignerTabs = {};

var port = browser.runtime.connectNative('com.gemalto.esignerwe');

port.onDisconnect.addListener(function() {
    backend.connected = false;
    console.log("Native port disconnected");
    for (var values of Object.entries(webSignerTabs)) {
        sendDisconnectMessageToContent(parseInt(values[0]), "disconnect", "Backend disconnected.");
    }
});
browser.tabs.onRemoved.addListener(function(tabId) {
    if (webSignerTabs[tabId]) {
        if (webSignerTabs[tabId].calledBackend) {
            // tab called the backend once, notify backend to cease communication
            var command = {request: "terminate", id: {"tabId": tabId, "transactionId": 0}};
            portPostMessage(command, tabId);
        }
        // if tab is in the tabtracker object, remove it
        delete webSignerTabs[tabId];
    }
});

browser.tabs.onUpdated.addListener(function(tabId, operation) {
    if (tabId in webSignerTabs && operation.status === 'loading') {
        // as soon as the tab changes we remove it from the array, to add it again if 'init' msg is received
        delete webSignerTabs[tabId];
    }
});

function sendDisconnectMessageToContent(tabId, subject, exception) {
    var errorMsgToContent = {
        from: "background",
        subject,
        exception
    };
    browser.tabs.sendMessage(tabId, errorMsgToContent);
}

function sendErrorMessageToContent(tabId, originalMessage, errorMessage) {
    var errorMsgToContent = {
        from: "background",
        transaction: originalMessage.transaction,
        subject: originalMessage.subject,
        exception: errorMessage
    };
    browser.tabs.sendMessage(tabId, errorMsgToContent);
}

function sanitizeMessage(message) { // prepare message for logging (security and cleanliness)
    var changes = {};
    if (message.data) {
        changes['data'] = "sensitive data (" + message.data.length + " characters)";
    }
    if (message.signature) {
        changes['signature'] = "sensitive data (" + message.signature.length + " characters)";
    }
    if (message.pin) {
        changes['pin'] = 'redacted';
    }
    return Object.assign({}, message, changes);
}

function portPostMessage(command, tabId) {
    // this function must be used when a tab (content scripts) makes a request to backend
    if (tabId && webSignerTabs[tabId]) {
        webSignerTabs[tabId].calledBackend = true;
        g_lastTransactionTimestamp = Date.now();
        port.postMessage(command);
    } else {
        console.error("Unrecognized tab, message was not sent", command);
    }
}

// Returns one long hex string from buffer
function hex(buffer) {
    var hexCodes = [];
    var view = new DataView(buffer);
    for (var i = 0; i < view.byteLength; i += 4) {
        // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
        var value = view.getUint32(i);
        // toString(16) will give the hex representation of the number without padding
        var stringValue = value.toString(16);
        // We use concatenation and slice for padding
        var padding = '00000000';
        var paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }

    // Join all the hex strings into one
    return hexCodes.join("");
}

// Returns an array of arrays of 16 bytes, up to 48 bytes
function getWysiwysSamples(data) {
    var samples = [];

    var arrOfFourConsecutivePixels = data.data.reduce(function(result, value, index, array) {
        if (index % 16 === 0) {
            result.push(array.slice(index, index + 16));
        }
        return result;
    }, []);

    for (i = 0; i < arrOfFourConsecutivePixels.length; i++) {
        var fourPixels = arrOfFourConsecutivePixels[i];
        var x = (i * 4) % data.width;
        var y = (i * 4 - x) / data.width;

        // all four pixels of a sample should be on the same line
        if (x + 4 <= data.width) {
            if (new Set(fourPixels.reduce(function(result, value, index, array) {
                // check that the fourPixels array contains at least two different colors
                if (index % 4 === 0) {
                    result.push(array.slice(index, index + 4).join(''));
                }
                return result;
            }, [])).size > 1) {
                samples.push({
                    rgba: Array.from(fourPixels),
                    offset: {
                        x,
                        y
                    }
                });
                var skip = Math.floor(data.width / 4);
                i += skip; // index skips to next line
            }
        }
    }

    if (samples.length > 3) {
        // will only execute if more than three samples were retrieved, preventing an array of undefined values to be unnecessarily sent to backend
        var randomThree = [];
        do {
            randomThree[randomThree.length] = samples.splice(Math.floor(Math.random() * samples.length), 1)[0];
        } while (randomThree.length < 3);

        return randomThree;
    }

    return samples;
}

const asyncMessages = ['guiRemoved'];

function markAsyncMessages(message) {
    if (asyncMessages.includes(message.subject)) {
        message.async = true; // bypass discarding message when waiting for response to other
    } else {
        message.async = false;
    }
}

browser.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    // we retrieve window.devicePixelRatio from the content scripts messages since it can be different for each tab
    browser.storage.local.get("logger", function(result) {
        if (result && result.logger) {
            activateLogStorage();
        };
    });
    // use the default from app_settings.js and override with customerSettings from custom.js
    var settings = Object.assign(default_settings, customerSettings);

    if (message.from === 'content') {
        if (message.transaction) {
            console.log("Message from Content", sanitizeMessage(message));
            markAsyncMessages(message);
            // extract id
            var command = {
                id: {tabId: sender.tab.id, transactionId: message.transaction}
            };

            if (middleware) { // old backend: middleware is undefined (see initial backend version request below), we shouldnt block with error message
                if (!backend.connected || !middleware.connected) {
                    console.log('BACKEND FAILURE!\nIs backend connected to the WebExtension?', backend.connected,
                        '\nIs backend able to use middleware?', middleware && middleware.connected);
                    errorMessage = "Web Signer components are not installed properly.\nPlease re-install the software or contact your Bank Support.";
                    browser.tabs.sendMessage(sender.tab.id,
                        {
                            from: "background",
                            transaction: message.transaction,
                            subject: "backend-error",
                            error: errorMessage
                        });
                    return;
                }
            }

            // message subject must always be lowerCase
            message.subject = ('' + message.subject).toLowerCase(); // implicit type coercion prevents error if message.subject is undefined

            var tid = sender.tab.id.toString();
            if (!message.async && tid in g_transactions) {
                console.log("Active transaction found for tabId: " + tid + ", will not be sent to backend.");
                return;
            } else {
                if (message.async) {
                    console.log("---> ASYNC message: do not care about existing transaction");
                }
                console.log("tabId: " + tid + " - new transaction ID: " + message.transaction);
                g_transactions[tid] = {
                    txId: message.transaction,
                    subject: message.subject,
                    complete: true // by default, messages consist of a single chunk
                };
                console.log("Transactions:", g_transactions);
            }
            console.log("COMMAND:", message.subject);
            if (!(sender.tabId in webSignerTabs)) {
                webSignerTabs[sender.tab.id] = {calledBackend: false}; // add tab to the list, but it has not made any backend request yet - see portPostMessage()
            }

            switch (message.subject) {
                case "init":
                    command['request'] = "init";
                    portPostMessage(command, sender.tab.id);
                    break;
                case "guiremoved":
                    // pass on to backend
                    command['request'] = "guiRemoved";
                    command['reason'] = message.reason;
                    portPostMessage(command, sender.tab.id);
                    break;
                case "get-display-info":
                    let zoom = await getBrowserZoom(sender.tab.id);
                    let display = await getScreenResolution(message.screen, message.point);
                    console.log("display.size:", display.width, "x", display.height);
                    console.log("display.dpr: ", display.dpr);
                    console.log("browser zoom:", zoom);
                    osZoom = display.dpr;
                    browserZoom = zoom;
                    overalZoom = (display.dpr * 10) * (zoom * 10) / 100; // prevent float math artifacts (like 1.5 * 1.2 = 1.7999999)
                    console.log("overalZoom:", overalZoom);
                    browser.tabs.sendMessage(sender.tab.id,
                        {
                            from: "background",
                            transaction: message.transaction,
                            subject: "display-info",
                            zoom: zoom,
                            displaySize: {width: display.width, height: display.height},
                            dpr: display.dpr,
                        });
                    delete g_transactions[tid];
                    break;
                case "ocr": // TODO: is it possible to put this into message handler like "render" or "init" to avoid this double content-bacground messaging?
                    console.log("=== OCR === received request from content ===");
                    command['request'] = "ocr";
                    command['image'] = message.image;
                    command['canvasRect'] = message.canvasRect;
                    portPostMessage(command, sender.tab.id);
                    break;
                case "wysiwys": // wysiwys check
                    // message.data, message.mimeType, message.pageNumber, message.pageHeight, message.dataWindowWidth,
                    // message.dataWindowHeight, settings, dPR, message.xOffset, message.yOffset
                    // check backend version as wysiwys2 requests are supported by versions 1.3.99 and newer
                    if (compareVersionStrings(backend.version, "1.3.99") == -1) {
                        console.log("WYSIWYS v1");
                        command['request'] = "wysiwys";
                        command['data'] = message.data;
                        command['width'] = message.width;
                        command['height'] = message.height;
                        command['encoding'] = "base64";
                        command['matchType'] = "perfect";
                        console.log("Command to backend:", command);
                        portPostMessage(command, sender.tab.id);
                    } else if (message.wysiwysType === "ocr") {
                        console.log("WYSIWYS v3");
                        command['request'] = "wysiwys3";
                        console.log("canvasRect:", message.canvasRect);
                        let browserZoom = await getBrowserZoom(sender.tab.id);
                        let display = await getCurrentDisplay(message.window.screen, message.canvasRect.origin);
                        let osZoom;
                        let canvasRectReal = {};
                        if (display !== undefined) {
                            osZoom = display.dpr;
                            // align with the first wholly visible character
                            message.canvasRect.bbox = pointPlusOffset(message.canvasRect.bbox, message.canvasRect.plaintextOffset);
                            if (platform == "Windows") {
                                canvasRectReal = await adjustCanvasRect(message.window, message.canvasRect, osZoom, browserZoom);
                            } else {
                                // no adjustments needed on Mac, even for Chrome
                                canvasRectReal = message.canvasRect;
                            }
                            console.log("message.canvasRect.bbox.x:", message.canvasRect.bbox.x);
                        } else {
                            console.log("Firefox? Ok, go direct...");
                            console.log("DEBUG Canvas canvasRect:,", message.canvasRect);
                            console.log("DEBUG Canvas dpr:,", message.dpr);
                            canvasRectReal.origin = message.canvasRect.origin;
                            canvasRectReal.size = message.canvasRect.size;
                            if ( platform == "Windows") {
                                canvasRectReal = multiplyRectByFactor(message.canvasRect, message.dpr);
                            }
                        }

                        console.log("canvasRectReal:", canvasRectReal);
                        command['renderRect'] = RectRound(canvasRectReal);
                        console.log("Command to backend:", command);
                        portPostMessage(command, sender.tab.id);
                    } else if (message.wysiwysType === "v2") {
                        console.log("WYSIWYS v2");

                        if (typeof(message.hash) !== "undefined") {
                            hashes[tid] = message.hash;
                            console.log("Image hash (computed in content):", hashes[tid]);
                        } else {
                            // compute the hash if it was not sent with the message
                            hashes[tid] = hex(await crypto.subtle.digest("SHA-256", Uint8Array.from(base64ToBytes(message.b64data))));
                            console.log("Image hash (computed in background):", hashes[tid]);
                        }

                        command['renderSize'] = {
                            width: Math.round(message.dataWindowWidth * message.dpr),
                            height: Math.round(Math.min(message.dataWindowHeight * message.dpr, message.pageHeight * message.dpr))
                        };

                        command['request'] = "wysiwys2";
                        command['samples'] = message.samples;
                        console.log("Command to backend:", command);
                        portPostMessage(command, sender.tab.id);
                    } else {
                        // report to the user
                        browser.tabs.sendMessage(sender.tab.id, {
                            from: "background",
                            transaction: message.transaction,
                            subject: "wysiwys",
                            result: -1 // see updateWysiwysWarning() in content.js
                        });
                        delete g_transactions[tid];
                    }
                    break;
                case "certificates":
                    command['request'] = "getCertificates";
                    portPostMessage(command, sender.tab.id);
                    break;
                case "version":
                    command['request'] = "about";
                    portPostMessage(command, sender.tab.id);
                    break;
                case "sign":
                    try {
                        command['request'] = "sign";
                        // encode to base64 in case there are non-ASCII characters inside
                        command['inData'] = utf8toBase64(message.data);
                        command['inDataEncoding'] = "base64";
                        if (typeof message.swysMessage !== "undefined") {
                            command['swysMessage'] = message.swysMessage;
                        }
                        if (typeof message.swysHiddenData !== "undefined") {
                            command['swysHiddenData'] = message.swysHiddenData;
                        }
                        if (typeof message.swysType !== "undefined") {
                            command['swysType'] = message.swysType;
                        }
                        command['signatureType'] = message.signatureType;
                        command['slotId'] = message.slotId;
                        command['certificateId'] = message.certificateId;
                        command['certificateHash'] = message.certificateHash;
                        command['pin'] = message.pin;
                        if (typeof message.signTimeout !== "undefined") {
                            command['signTimeout'] = message.signTimeout;
                        }
                        portPostMessage(command, sender.tab.id);
                    } catch (e) {
                        console.log(e);
                        sendErrorMessageToContent(sender.tab.id, message, "Internal error, signing cancelled");
                        delete g_transactions[tid];
                    }
                    break;
                case "verify":
                    command['request'] = "verify";
                    command['signature'] = message.signature;
                    command['signatureType'] = message.signatureType;
                    portPostMessage(command, sender.tab.id);
                    break;
                default:
                    console.warn("Unknown message from Content:", sanitizeMessage(message));
            }
        } else if (message.subject === 'logs') {
            // logger.js
            extractLog(message.log, message.from, {
                id: sender.tab.id,
                url: sender.tab.url,
                title: sender.tab.title
            });
        } else {
            console.warn("No transaction found in message from Content:", sanitizeMessage(message));
        }
    } else if (message.from === 'diagTools' || message.subject === 'tabislogging') {
        switch (message.subject) {
            case "startlogs":
                activateLogStorage();
                // using -2 as tabID since this call is coming from diagTools and not from a specific tab, but we still need to identify the transaction
                port.postMessage({id: {tabId: -2, transactionId: message.startedAt}, request: "startlogs"});
                g_transactions['-2'] = {
                    txId: message.startedAt,
                    subject: message.subject,
                    complete: false // completed once collectlogs is received from the backend
                };
                break;
            case "collectlogs":
                endLogSession(message.startedAt);
                break;
            case "cancellogs":
                endLogSession(undefined);
                // using -2 as tabID since this call is coming from diagTools and not from a specific tab, but we still need to identify the transaction
                port.postMessage({id: {tabId: -2, transactionId: -2}, request: "cancellogs"});
                g_transactions['-2'] = {
                    txId: message.startedAt,
                    subject: message.subject,
                    complete: true
                };
                break;
            case "cleanlogs":
                // more to come
                break;
            default:
                console.warn("Unknown message from Diagnostic Tools:", sanitizeMessage(message));
        }
    } else if (message.from !== 'background') { // Unknown origin
        console.warn("Message from unknown origin:", sanitizeMessage(message));
    }
});

let hashes = {};
port.onMessage.addListener(function(msg) {
    console.log("Message from Backend", sanitizeMessage(msg));
    if ('id' in msg) {
        var id = msg['id'];
        var tabId;
        var transactionId;
        // response to the initial backend version request
        if (('tabId' in id) && (msg.id.tabId == -1) && ('transactionId' in id) && (msg.id.transactionId == -1)) {
            backend.version = msg['version'];
            browser.storage.local.set({
                backendVersion: backend.version
            });

            middleware = msg.middleware;
            return;
        }

        if (('tabId' in id) && ('transactionId' in id)) {
            tabId = id['tabId'];
            transactionId = id['transactionId'];

            console.log("Tab ID = " + tabId, "Transaction ID = " + transactionId);
            delete msg.id;

            var tid = tabId.toString();
            // message to be sent to content script, these are common attributes
            var msgToContent = {from: "background", transaction: transactionId};

            // check transactionId

            if (tid in g_transactions) {
                if (g_transactions[tid].txId === transactionId) {
                    // found the transaction
                    console.log("tab ID: " + tid + "  transaction: " + transactionId + " - transaction OK");
                    console.log("g_transactions[tid]:", g_transactions[tid]);
                    msgToContent.subject = g_transactions[tid].subject;
                } else {
                    // the transactionId does not match for the given tabId
                    console.log("tab ID: " + tid + "  msg transaction: " + transactionId + " does not match the active transaction: " + g_transactions[tid]);
                    return;
                }
            } else {
                // no such tabId in transaction list
                console.log("No transaction for tab " + tid + " active");
                return;
            }

            if (msg['exception'] != null) {
                msgToContent.exception = removePIN(msg['exception']); // PIN keyword removal
                browser.tabs.sendMessage(tabId, msgToContent);
            }

            // message response is always lowerCase
            msg.response = ('' + msg.response).toLowerCase(); // implicit type coercion prevents error if msg.response is undefined

            // parse for reply
            switch (msg.response) {
                case 'init':
                    console.log("active:" + msg['active']);
                    msgToContent.active = msg['active'];
                    break;
                case 'guiremoved':
                    delete g_transactions[tid]; // don't pass back to content
                    break;
                case 'about':
                    msgToContent.version = msg['version'];
                    break;
                case 'getcertificates':
                    msgToContent.certificates = msg['certificates'];
                    msgToContent.readers = msg['readers'];
                    msgToContent.pinpadLessAuthenticated = msg['pinpadLessAuthenticated'];
                    break;
                case 'sign':
                    // chunk handling
                    if (typeof (msg['chunk']) !== "undefined") {
                        g_transactions[tid].complete = false;
                        console.log("Signature chunking detected, chunk number " + msg.chunk.packetNum + " out of " + msg.chunk.packetTotal);
                        if (msg.chunk.packetNum == 1) {
                            g_transactions[tid].signature = msg.signature;
                        } else {
                            g_transactions[tid].signature += msg.signature;
                        }
                        if (msg.chunk.packetNum == msg.chunk.packetTotal) {
                            // this is the last chunk
                            msgToContent.signature = g_transactions[tid].signature;
                            msgToContent.backendVersion = backend.version;
                            g_transactions[tid].complete = true;
                            console.log("Signature completed, " + msgToContent.signature.length + " bytes long");
                        }
                    } else {
                        msgToContent.signature = msg.signature;
                        msgToContent.backendVersion = backend.version;
                        g_transactions[tid].complete = true;
                    }
                    break;
                case 'wysiwys':
                    console.log("=== WYSIWYS (v1) === reply from backend ===");
                    msgToContent.result = msg['result'];
                    break;
                case 'wysiwys2':
                    console.log("=== WYSIWYS (v2) === reply from backend ===");
                    msgToContent.subject = "wysiwys"; // content scripts do not differentiate between wysiwys and wysiwys2
                    if (hashes[tid] && msg.result && msg.result.length !== undefined) {
                        // constructing a simple array of digests, to return how many instances of the hash is/are inside
                        msgToContent.result = msg.result.map(res => res.digest).filter(digest => digest === hashes[tid]).length;
                    } else {
                        msgToContent.result = 'error';
                    }
                    delete hashes[tid];
                    break;
                case "wysiwys3":
                    console.log("=== WYSIWYS (v3) OCR === reply from backend ===");
                    console.log(msg.ocr);
                    console.log("=== ------------ ===");
                    msgToContent.subject = "wysiwys3";
                    msgToContent.result = msg.ocr;
                    break;
                case "ocr":
                    console.log("=== OCR === reply from backend ===");
                    console.log(msg);
                    console.log("=== ------------ ===");
                    //msgToContent.subject = "wysiwys3";
                    msgToContent.result = msg.ocr;
                    break;
                case 'verify':
                    msgToContent.criteria = msg['criteria'];
                    msgToContent.certificates = msg['certificates'];
                    break;
                case 'collectlogs':
                    browser.runtime.sendMessage({
                        from: "background",
                        subject: "deliverlogs",
                        sessionId: "session-" + transactionId,
                        path: msg.path
                    });
                    g_transactions[tid].complete = true;
                    // we set the key for diagTools to display, in case diagTools window is closed at the moment
                    browser.storage.local.set({"lastLocation": msg.path});
                    break;
            }
            if (g_transactions[tid] && g_transactions[tid].complete == true) {
                // close the transaction and reply to content only when the message is complete
                delete g_transactions[tid];
                // notify the tab, if indeed the transaction originated from a tab
                (tabId > -1) && browser.tabs.sendMessage(tabId, msgToContent);
            }
        } else {
            console.log('anonymous message - wrong id (' + msg['id'] + ')');
        }
    } else {
        console.log('anonymous message - unknown id (' + msg['id'] + ')');
    }
});

// backend init messages: using negative transactionId to differentiate from content's positive-only values
br = navigator.userAgent.match(/(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)\.(\d+)/i) || [];
port.postMessage({id: {tabId: -1, transactionId: -1}, request: "about", browserName: br[1], browserVersion: br[2]}); // ask for backend version

// if there is no logging session opened at the loading of background scripts, we cancel backend logs
browser.storage.local.get("logger", function(result) {
    if (result && result.logger) {
        // allow logs to be collected after restarting the browser
        g_transactions['-2'] = {
            txId: result.logger.startedAt,
            subject: "resumeLogs",
            complete: false // completed once collectlogs is received from the backend
        };
    } else {
        port.postMessage({id: {tabId: -2, transactionId: -2}, request: "cancellogs"});
    }
});

// PIN keyword removal
function removePIN(string) {
    if (typeof (string) != "string") {
        // don't process non-string inputs
        return string;
    }

    if (string == "wrong pin data format") {
        string = "Wrong data format";
    } else if (string == "Login failed, no PIN supplied") {
        string = "Login failed, no credentials provided";
    } else if (string.includes("Login: Incorrect PIN given")) {
        // "remaining tries left: x" is appended to this message and must be kept
        string = string.replace(/Incorrect PIN given/, "Error");
    } else if (string == "Login failed: PIN locked") {
        string = "Login: credentials locked";
    } else if (string == "Login: PIN entry canceled") {
        string = "Login: cancelled";
    } else if (string == "User PIN is not initialized.") {
        string = "Credentials not initialized";
    }

    return string;
}

/**
 * @param screen - window.screen object identifying "current" screeen position and size relative to the main screen
 * @param {{x:number, y:number}} point - coords specifying screen in interest
 */
function getScreenResolution(screen, point) {
    console.log(`getScreenResolution: screen: [left: ${screen.availLeft}, top: ${screen.availTop}], point: [${point.x} x ${point.y}]`);
    return new Promise((resolve, reject) => { 
        console.log(`getScreenResolution: screen: [left: ${screen.availLeft}, top: ${screen.availTop}], point: [${point.x} x ${point.y}]`);
        // get the display layout
        if ( typeof(chrome) !== "undefined" && typeof (chrome.system) !== "undefined") {
            chrome.system.display.getInfo({}, (displays) => {
                console.log("Displays:", displays);
                console.log("typeof displays:", typeof displays);
                let display = displays.find((display) => {
                    let px = point.x + screen.availLeft;
                    let py = point.y + screen.availTop;
                    if ( px >= display.bounds.left && px <= display.bounds.left + display.bounds.width
                        && py >= display.bounds.top && py <= display.bounds.top + display.bounds.height ) {return true;}
                });
                let dpr = display.dpiX / 96;
                console.log("Display found:", display);
                if (typeof display !== "undefined") {
                    console.log("Display name:", display.name);
                }
                console.log("Display dpr:", dpr);
                resolve({width: Math.round(display.bounds.width * dpr), height: Math.round(display.bounds.height * dpr), dpr: dpr});
            });
        } else {
            console.log("Not Chrome browser, try Firefox style...");
            console.log(window.screen);
            console.log("What about FF and window.devicePixelRatio in bacground:", window.devicePixelRatio);
            console.log(`Screen width: ${window.screen.width * window.devicePixelRatio}, height: ${window.screen.height * window.devicePixelRatio}`);
            resolve({width: window.screen.width * window.devicePixelRatio, height: window.screen.height * window.devicePixelRatio, dpr: window.devicePixelRatio});
        }
    });
}
function getCurrentDisplay(screen, point) {
    console.log(`getCurrentDisplay: screen: [left: ${screen.availLeft}, top: ${screen.availTop}], point: [${point.x} x ${point.y}]`);
    return new Promise((resolve, reject) => { 
        console.log(`getCurrentDisplay: screen: [left: ${screen.availLeft}, top: ${screen.availTop}], point: [${point.x} x ${point.y}]`);
        // get the display layout
        if ( typeof(chrome) !== "undefined" && typeof (chrome.system) !== "undefined") {
            chrome.system.display.getInfo({}, (displays) => {
                console.log("Displays:", displays);
                console.log("typeof displays:", typeof displays);
                let display = displays.find((display) => {
                    let px = point.x;// + screen.availLeft;
                    let py = point.y;// + screen.availTop;
                    if ( px >= display.bounds.left && px <= display.bounds.left + display.bounds.width
                        && py >= display.bounds.top && py <= display.bounds.top + display.bounds.height ) {return true;}
                });
                console.log("Display found:", display);
                if (typeof display !== "undefined") {
                    console.log("Display name:", display.name);
                    let dpr = display.dpiX / 96;
                    console.log("Display dpr:", dpr);
                    display.dpr = (dpr == 0) ? 1 : dpr; // macOS returns dpr 0, assume 1
                    
                    }
                resolve(display);
            });
        } else {
            console.log("Not Chrome browser, try Firefox style...");
            resolve(undefined);
        }
    });
}

async function getOverallZoom(screen, point, tabId, contentDpr = 0) {
    if (browserName == "Firefox") {
        if (contentDpr !== undefined && contentDpr != 0) { // Firefox
            return contentDpr;
        } else {
            throw new Error("Mozilla based browser and no DPR info from content script.");
        }
    }
    return await getOverallZoomChromium(screen, point, tabId);
}

async function getOverallZoomChromium(screen, point, tabId) {
    let display = await getScreenResolution(screen, point);
    console.log("display.size:", display.width, "x", display.height);
    console.log("display.dpr: ", display.dpr);
    let bz = await getBrowserZoom(tabId);
    
    return bz * display.dpr;
}


//multiplyPointByFactor
// TODO: take care about maximized window
function adjustWindowOrigin(window, osZoom) {
    let rvOrigin = {};
    rvOrigin.x = (window.screenX + 7) * osZoom;
    rvOrigin.y = (window.screenY + 0) * osZoom;
    return rvOrigin;
}
async function isMaximized() {
    // use the WebExtension API to get the current window state
    return new Promise((resolve, reject) => {
        browser.windows.getCurrent({}, (currentWindow) => {

            if ( typeof(currentWindow) === "undefined" || typeof(currentWindow.state) === "undefined"){
                reject(Error("Failed to get the state of the current window"));
            }
            resolve(currentWindow.state == "maximized");
        });
    });
}

// posX = (window.screen.availWidth + window.screenX + 8) * DPR
// posY = (window.screen.availTop + window.screenY + 1) * DPR
async function getWindowPositionAtScreen(window, currentDisplayDpr) { // position inside currect screen (where websigner is displayed)
    let posX = 0, posY = 0;
    if (await isMaximized() === false) {
        posX = (window.screenX - window.screen.availLeft + 8) * currentDisplayDpr;
        posY = (window.screenY - window.screen.availTop + 1) * currentDisplayDpr;
    }
    return {x: posX, y: posY};
}
async function getWindowHeight(window) {
    let windowHeight = window.outerHeight; // height of window w/o frame if not-maximized
    if (await isMaximized() === false) {
        windowHeight -= 10; 
    }
    return windowHeight;
}
async function getToolbarHeight(window, osZoom) {
    let toolbarHeight = 0;
    let windowHeight = await getWindowHeight(window); // need calc because of the shade that is inserted to window.outerHeight
    if (await isMaximized() === false) {
        toolbarHeight += (8 * osZoom) + 1;
    }
    toolbarHeight = (windowHeight - window.innerHeight * browserZoom) * osZoom;
    console.log("ToolbarHeight:", toolbarHeight);
    return toolbarHeight;
}
function getDisplayList() {
    return new Promise((resolve, reject) => {
        console.log("getDisplayList - callback");
        if ( typeof (chrome.system) !== "undefined") {
            console.log("chrome.system:", chrome.system);
            chrome.system.display.getInfo({}, (displays) => {
                let displaysSorted = Array.from(displays).sort( (a,b) => a.bounds.left - b.bounds.left );
                resolve(displaysSorted);
                return;
            });
        } else {
            console.log("chrome.system is not defined -> Firefox?");
            resolve(new Array()); // ERROR: do not have chrome.system => Firefox?
            return;
        }
    });
}
const dpi2dpr = 1 / 96; // if getInfo returns 96 "dpi" for a display, we assume its device pixel ratio is 1
function setDpr(display) {
    display.dpr = display.dpiX * dpi2dpr;
}
function getPrimaryDisplayIdx(displays) {
    for ( let i = 0; i < displays.length; i++) {
        if (displays[i].isPrimary) { return i; }
    }
    // TODO: raise exception
}
function getCurrentDisplayIdx(displays, point) {
    for ( let i = 0; i < displays.length; i++) {
        let display = displays[i];
        if ( (point.x >= display.bounds.left) && (point.x <= display.bounds.left + display.bounds.width)
               && ((point.y >= display.bounds.top) && (point.y <= display.bounds.top + display.bounds.height))
           ) {
            console.log(`The point is located in the display named: ${display.name}`);
            return i;
        }
    }
    return undefined; // no display contains point
}
function getScreenOffset(displays, displayIdx) {
    let primaryDisplayIdx = getPrimaryDisplayIdx(displays);

    console.log("Primary display idx:", primaryDisplayIdx);
    console.log("Current display idx:", displayIdx);

    const dpi2dpr = 1 / 96; // if getInfo returns 96 "dpi" for a display, we assume its device pixel ratio is 1
    let xOffset = 0;
    let yOffset = 0;
    if ( displayIdx > primaryDisplayIdx) {
        // the point is located on a display right of the primary one
        for( let i = primaryDisplayIdx; i < displayIdx; i++) {
            let display = displays[i];
            let dpr = display.dpiX * dpi2dpr;
            xOffset += display.bounds.width * dpr;
            console.log("xOffset:", xOffset);
        }
    } else if (displayIdx < primaryDisplayIdx) {
        // the point is located on a display left of the primary one
        for( let i = displayIdx; i < primaryDisplayIdx; i++) {
            let display = displays[i];
            let dpr = display.dpiX * dpi2dpr;
            xOffset -= display.bounds.width * dpr;
            console.log("xOffset:", xOffset);
        }
    }

    // compute vertical offset
    if (displayIdx != primaryDisplayIdx) {
        if (displays[displayIdx].bounds.top < 0 ) {
            // TODO: make it work for negative bounds.top of the secondary screen (Chrome/Edge)
            yOffset = displays[displayIdx].bounds.top * displays[displayIdx].dpiX * dpi2dpr;
        } else {
            yOffset = displays[displayIdx].bounds.top * displays[primaryDisplayIdx].dpiX * dpi2dpr;
        }
    }
    return {x: xOffset, y: yOffset};
}

function toolbarHeightDecisionFunctionMaximized(zoom) {
    // this function approximates the former decision table
        if (zoom <= 100) {
        return {threshold:96, below:71, above:103};
    }
    return {
        threshold : Math.trunc (0.972 * zoom - 15.7),
        below : Math.trunc (0.704 * zoom + 1.1),
        above : Math.trunc (1.024 * zoom + 1.1)
    }
}

function toolbarHeightDecisionFunctionStandardWin(zoom) {
    // this function approximates the former decision table
    if (zoom <= 100) {
        return {threshold:104, below:79, above:111};
    }
    return {
        threshold : Math.trunc (1.064 * zoom - 17.4),
        below : Math.trunc (0.8 * zoom - 1),
        above : Math.trunc (1.12 * zoom - 1)
    }
}

async function getToolbarHeight(window, osZoom, browserZoom) {
    // toolbarHeight = window.outerHeight - ( window.innerHeight * browserZoom )
    let tmpTH = (window.outerHeight - ( window.innerHeight * browserZoom )) * osZoom;
    console.log("Toolbar height: tmpTH:", tmpTH);
    let zoom = Math.trunc(osZoom * 100);
    
    let decisionObject = toolbarHeightDecisionFunctionMaximized(zoom);
    if (await isMaximized() === false) {
        decisionObject = toolbarHeightDecisionFunctionStandardWin(zoom);
    }
    if (tmpTH < decisionObject.threshold) return decisionObject.below;
    return decisionObject.above;
}

async function adjustCanvasRect(window, rect, osZoom, browserZoom) {
    console.log("adjustCanvasRect()");
    console.log(`bbox:[x: ${rect.bbox.x}, y: ${rect.bbox.y}]`);
    let tbHeight = await getToolbarHeight(window, osZoom, browserZoom);
    console.log("Toolbar height:", tbHeight);
    let rv = {};
    rv.origin = {};
    rv.size = {};
    let displays = await getDisplayList();
    let rectOrigin = {};
    if (displays.length === 0) {
        // Firefox
        console.log("Firefox... Uhmm? What are we doing here?");
        return rv;
    } else {
        displays.forEach(setDpr);
        rectOrigin.x = rect.bbox.x * osZoom * browserZoom;
        rectOrigin.y = rect.bbox.y * osZoom * browserZoom; // relative to viewport = without toolbar
        rectOrigin.y += tbHeight;
        let currentDisplayIdx = getCurrentDisplayIdx(displays, rect.origin);
        let windowPositionAtScreen = await getWindowPositionAtScreen(window, displays[currentDisplayIdx].dpr);
        console.log("Window position at screen:", windowPositionAtScreen);
        let rectOriginAtScreen = pointPlusOffset(rectOrigin, windowPositionAtScreen);
        console.log("rectOriginAtScreen:", rectOriginAtScreen);
        let screenOffset = getScreenOffset(displays, currentDisplayIdx);
        let rectOriginRelativeToPrimaryScreenOrigin = pointPlusOffset(rectOriginAtScreen, screenOffset);

        rv.origin = rectOriginRelativeToPrimaryScreenOrigin;
        console.log("final rect origin:", rv.origin);
        rv.size.width = rect.size.width * osZoom * browserZoom;
        rv.size.height = rect.size.height * osZoom * browserZoom;
    }
    return rv;
}

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/getZoom
// investigated: browser.tabs.getZoom() returns undefined, return value is just in the callback
// function getZoom(tabId) {
//     let gettingZoomFactor = browser.tabs.getZoom(tabId, (param) => {console.log("WOW we are here:", param); return param;});
//     console.log("getZoom(): is gettingZoomFactor a Promise? ", isPromise(gettingZoomFactor));
//     console.log("getZoom(): typeof gettingZoomFactor = ", gettingZoomFactor);
// }

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/getZoom
// https://stackoverflow.com/questions/5010288/how-to-make-a-function-wait-until-a-callback-has-been-called-using-node-js
// investigated: browser.tabs.getZoom() returns undefined, return value is just in the callback (that is undocumented)
// lets write a wrapper using Promise
// errorCallback is/will be never used because the tabs.getZoom() has no API for that
// question is if has some error state(s)...
function getZoomWithCallback(tabId, successCallback, errorCallback) {
    browser.tabs.getZoom(tabId, successCallback);
}
function getZoomWrapper(tabId) {
    return new Promise((resolve, reject) => {
        getZoomWithCallback(tabId, (successResponse) => { resolve(successResponse);},
                                   (errorResponse) => { resolve(errorResponse);}
        );
    });
}

async function getBrowserZoom(tabId) {
    let zoom;
    try {
        zoom = await getZoomWrapper(tabId);
    }
    catch (error) {
        console.log("ERROR: cannot get zoom:", error);
    }
    console.log("getBrowserZoom: zoom =", zoom);
    return zoom;
}
