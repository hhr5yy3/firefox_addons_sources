

var HELLO_URL = "https://e-porezna.porezna-uprava.hr/";

var NATIVE_HOST = "hr.eporezna.pro";
var K_SRC = "src";
var K_ORIGIN = "origin";
var K_NONCE = "nonce";
var K_RESULT = "result";
var K_TAB = "tab";
var K_EXTENSION = "version";
var K_EXTENSION_ID = "firefoxextension@porezna-uprava.hr";

// Stores the longrunning ports per tab
// Used to route all request from a tab to the same host instance
var ports = {};

// Set to false if connection to host component is OK.
var missing = true;

writeToLog("Background page activated");


// Force kill of native process
// Becasue Port.disconnect() does not work
function _killPort(tab) {
    if (tab in ports) {
        writeToLog("KILL " + tab);
        // Force killing with an empty message
        ports[tab].postMessage({});
    }
}


// Check if native implementation is OK resolves with "ok", "missing" or "forbidden"

function _testNativeComponent() {

    return new Promise(function (resolve, reject) {

        browser.runtime.sendNativeMessage(NATIVE_HOST, {}, function (response) {
            if (!response) {

                // Try to be smart and do some string matching
                var permissions = "Access to the specified native messaging host is forbidden.";
                var missing = "Specified native messaging host not found.";


                if (browser.runtime.lastError.message === permissions) {
                    resolve("forbidden")
                }
                else if (browser.runtime.lastError.message === missing) {
                    resolve("missing");
                }
                else {
                    resolve("missing");
                }
            }
            else {
                if (response["result"] === "invalid_argument") {
                    writeToLog("Connection with native component is ok");
                    resolve("ok");
                }
                else {
                    resolve("missing"); // TODO: something better here
                }
            }
        });
    });
}


function getResponse(request) {
    if (request) {
        if (request.message) {
            //ako je dosao zahtjev za provjeru plugina
            if (request.message == "version") {
                writeToLog("version");
                var thisVersion = browser.runtime.getManifest().version;
                sendResponse({ version: thisVersion, pluginCheck: true, extensionId: K_EXTENSION_ID });
            }
            //ako je dosao zahtjev za provjeru nativne komponente
            if (request.message == "nativeCheck") {
                _getNativeVerison().then(function (result) {
                    writeToLog("nativeCheck");
                    sendResponse({ version: result, nativeCheck: true, extensionId: K_EXTENSION_ID });
                });
            }
        }
    }
}


//funkcija koja nam služi za dohvat verzije direktno iz nativne komponenetom

function _getNativeVerison() {

    writeToLog("_getNativeVerison");

    return new Promise(function (resolve, reject) {

        browser.runtime.sendNativeMessage(NATIVE_HOST, {
            type: "VERSION",
            nonce: "sdtgw7mhrsko7b15",
            src: "page.js",
            origin: "https://e-porezna.porezna-uprava.hr"
        }
            , function (response) {
                if (response) {
                    if (response["result"] === "ok") {
                        resolve(response.version);
                    }
                }
                else {
                    resolve("error"); // TODO: something better here
                }

            });
    });
}





// When extension is installed or updated, check for native component or direct to helping page
browser.runtime.onInstalled.addListener(function (details) {

    writeToLog("Provjera komunikacije s nativnom komponentom pri instalaciji ili updejtu");

    _checkNativeComponentAfterInstalation(details);
});



//Check connection with native component when plugin is first time installed or updated

function _checkNativeComponentAfterInstalation(msg) {

    if (msg.reason === "install" || msg.reason === "update") {
        _testNativeComponent().then(function (result) {
            //var url = null;
            if (result === "ok" && msg.reason === "install") {

                // Also set the flag
                missing = false;

                // Add back HELLO page on install
                //url = HELLO_URL;

            }
            else if (result === "missing" || result === "forbidden") {
                missing = true;

            }
            // if (url) {
            // 	browser.tabs.create({'url': url + "?" + msg.reason});
            // }
        });
    }
}



//check connection with native component when plugin is already installed

function _checkConnectionToNativeComponent() {

    return _testNativeComponent().then(function (result) {

        if (result === "ok") {
            // set the flag
            missing = false;
        }
        else if (result === "missing" || result === "forbidden") {
            // set the flag
            missing = true;
            writeToLog("Ne postoji komunikacija s nativnom komponentom");
        }
    });
}


// When message is received from page and connection with natvie component is ok,  forward data to native

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    // Not our extension, do nothing
    if (sender.id !== browser.runtime.id || request.extensionId != K_EXTENSION_ID) {
        writeToLog('WARNING: Ignoring message not from our extension');
        return;
    }       

    //plugin version handled here
    if (request.message == "version") {
        _replyVersion(sender.tab.id, request);
        return;
    }

    //else talk to native component:
    _checkConnectionToNativeComponent().then(function () {

        if (sender.tab) {

            // Check if page is DONE and close the native component without doing anything else
            if (request["type"] === "DONE") {
                writeToLog("DONE " + sender.tab.id);
                if (sender.tab.id in ports) {
                    // FIXME: would want to use Port.disconnect() here
                    _killPort(sender.tab.id);
                }
            }
            else {
                request[K_TAB] = sender.tab.id;
                if (missing) {
                    return _fail_with(request, "no_implementation");
                }
                // TODO: Check if the URL is in allowed list or not
                // Either way forward to native currently
                _forward(request);
            }
        }
    });


});

// Send the message back to the originating tab
function _reply(tab, msg) {
    msg[K_SRC] = "background.js";
    msg['extensionId'] = K_EXTENSION_ID;
    writeToLog("_reply response:" + JSON.stringify(msg));
    browser.tabs.sendMessage(tab, msg);
}

function _replyVersion(tab, msg) {

    writeToLog("version request: " + JSON.stringify(msg));

    msg[K_SRC] = "background.js";
    msg['extensionId'] = K_EXTENSION_ID;


    if (msg.message == "version") {

        msg[K_EXTENSION] = browser.runtime.getManifest().version;
        msg.pluginCheck = true;
        writeToLog("version response:" + JSON.stringify(msg));
        browser.tabs.sendMessage(tab, msg);
    } else if (msg.message == "nativeCheck") {
        _getNativeVerison().then(function (result) {
            msg.version = result;
            msg.nativeCheck = true;
            writeToLog("nativeCheck response:" + JSON.stringify(msg));
            browser.tabs.sendMessage(tab, msg);
        });
    }


}


// Fail an incoming message if the underlying implementation is not
// present
function _fail_with(msg, result) {
    var resp = {};
    resp[K_NONCE] = msg[K_NONCE];
    resp[K_RESULT] = result;
    resp['extensionId'] = K_EXTENSION_ID;
    _reply(msg[K_TAB], resp);
}

// Forward a message to the native component
function _forward(request) {

    writeToLog("_forward:" + JSON.stringify(request));

    var tabid = request[K_TAB];
    writeToLog("SEND " + tabid + ": " + JSON.stringify(request));

    //version handled separately
    if (request.message == "nativeCheck") {
        _replyVersion(tabid, request);
        return;
    }

    // Open a port if necessary
    if (!ports[tabid]) {
        // For some reason there does not seem to be a way to detect missing components from longrunning ports
        // So we probe before opening a new port.
        writeToLog("OPEN " + tabid + ": " + NATIVE_HOST);
        // create a new port
        var port = browser.runtime.connectNative(NATIVE_HOST);

        // XXX: does not indicate anything for some reason.
        if (!port) {
            writeToLog("OPEN ERROR: " + JSON.stringify(browser.runtime.lastError));
        }

        port.onMessage.addListener(function (response) {
            if (response) {
                if (!response.fileData) {
                    writeToLog("RECV " + tabid + ": " + JSON.stringify(response));
                }
                _reply(tabid, response);
            } else {
                writeToLog("ERROR " + tabid + ": " + JSON.stringify(browser.runtime.lastError));
                _fail_with(request, "technical_error");
            }
        });
        port.onDisconnect.addListener(function () {
            writeToLog("QUIT " + tabid);
            delete ports[tabid];
            // TODO: reject all pending promises for tab, if any
        });
        ports[tabid] = port;
        ports[tabid].postMessage(request);
    } else {
        // Port already open
        ports[tabid].postMessage(request);
    }
}

var isWriteToLogEnabled = true;

function writeToLog(message) {
    if (isWriteToLogEnabled) {
        console.log(K_EXTENSION_ID + ":  " + message);
    }
}