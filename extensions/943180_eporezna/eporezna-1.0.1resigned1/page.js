
var K_EXTENSION_ID = "firefoxextension@porezna-uprava.hr";

// Promises
var _eid_promises = {};
// Turn the incoming message from extension
// into pending Promise resolving
window.addEventListener("message", function(event) {
    if (event.source !== window || event.data.extensionId != K_EXTENSION_ID) {       
        writeToLog(event.data);
        return;
    }
       
    if(event.data.src && (event.data.src === "background.js")) {       
        // Get the promise
        if(event.data.nonce) {
            var p = _eid_promises[event.data.nonce];

            if (!p) {
                writeToLog("No promise!");
                return;
            }

            // resolve
            if(event.data.result === "ok") {
                if(event.data.signature !== undefined) {
                    p.resolve({hex: event.data.signature, result: event.data.result});
                } else if(event.data.version !== undefined) {
                    p.resolve(event.data);
                    //p.resolve(event.data.extension + "/" + event.data.version);
                } else if(event.data.cert !== undefined) {
                    p.resolve({hex: event.data.cert, result: event.data.result});
                } else if(event.data.fileData !== undefined) {
                    p.resolve({fileData: event.data.fileData, result: event.data.result});
                } 
                else {
                    writeToLog("No idea how to handle message");
                    writeToLog(event.data);
                }
            } else if(event.data.result === "no_implementation"){
                    p.resolve(event.data);
                }
            else {
                // reject
                p.reject(new Error(event.data.result));
            }
            delete _eid_promises[event.data.nonce];
        } else {
            writeToLog("No nonce in event msg:" + JSON.stringify(event.data));           
        }
    }
}, false);


function SigningFunctions() {

    // Function for create nonce
    // Nonce is a number or bit string used only once, in security engineering
    function nonce() {
        var val = "";
        var hex = "abcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < 16; i++) val += hex.charAt(Math.floor(Math.random() * hex.length));
        return val;
    }

    function sendPreparedData(msg) {
        return new Promise(function(resolve, reject) {
            // amend with necessary metadata
            msg['nonce'] = nonce();
            msg['src'] = 'page.js';
            msg['extensionId'] = K_EXTENSION_ID;
            // send message
            window.postMessage(msg, "*");
            // and store promise callbacks
            _eid_promises[msg.nonce] = {
                resolve: resolve,
                reject: reject
            };
        });
    }


    //Functions called from host web application
    //Functions call sendPreparedData, which returns promise object 
    //that enables further handling of result/exception in host web application
    //-------------------------------------------------------------------------------
        
    //forwards CERT JSON message to native component, requesting certificate to use for signing
    this.getCertificate = function(options) {
        var msg = {type: 'CERT', lang: options.lang};
        writeToLog("getCertificate()");
        return sendPreparedData(msg);
    };


    //forwards GETFILE JSON message to native component, requesting File Select Dialog
    //and gets file from native component
    this.getFile = function(options) {
        var msg = {type: 'GETFILE', lang: options.lang, methodName:options.methodName, params:options.params};
        writeToLog("getFile()");
        return sendPreparedData(msg);
    };

    //forwards SIGN JSON message to native component which starts HASH signing.
    //needs certificate of signer and hash to sign
    //Result is signature value.
    this.sign = function(cert, hash, options) {
        var msg = {type: 'SIGN', cert: cert.hex, hash: hash.hex, hashtype: hash.type, lang: options.lang};
        writeToLog("sign()");
        return sendPreparedData(msg);
    };


    //NOT USED - RESOLVED USING chrome.runtime.sendMessage & listeners
    //forwards VERSION JSON message to native component, and gets current version of native component installed.
    this.getVersion = function() {
        writeToLog("getVersion()");
        return sendPreparedData({
            type: 'VERSION'
        });
    };
}

var isWriteToLogEnabled= false;

function writeToLog(message) {
    if (isWriteToLogEnabled) {
        console.log(K_EXTENSION_ID + ":  " + message);
    }
}
