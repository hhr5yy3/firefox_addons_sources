var manifest = chrome.runtime.getManifest();
var info = {
    type: 'chrome',
    version: manifest.version
};

const ERROR = {
    EMPTY: 'OK',
    HOST_NOT_FOUND: 'HOST_NOT_FOUND',
    HOST_HAS_EXITED: 'HOST_HAS_EXITED',
    UNKNOWN: 'INTERNAL_ERROR'
};

let sessions = new Map();
let nativePort;

let debugEnabled = true;

createNativePort();

function createNativePort() {
    nativePort = chrome.runtime.connectNative('infosysco.crypto.plugin');
    nativePort.onMessage.addListener(onMessage);
    nativePort.onDisconnect.addListener(onDisconnect);
}

function onMessage(message) {
    let session = sessions.get(message.sessionId);
    if (session) {
        session.onHostMessage(message);
    }
}

function onDisconnect() {
    debug('Host disconnected');

    sessions.forEach(session => {
            let message = {
                sessionId: session.id,
                event: 'disconnected'
            };
            session.port.postMessage(message);
        }
    );

    let errorCode = getLastErrorCode();
    if (errorCode === ERROR.HOST_NOT_FOUND) {
        debug('Host not found');
        nativePort = null;
    }

    if (errorCode === ERROR.HOST_HAS_EXITED) {
        debug('Host has exited. Restarting host.');
        createNativePort();
    }
}

function Session(sessionId) {

    this.id = sessionId;
    this.port = null;
    let buffers = {};

    this.onBrowserMessage = function(message) {
        if (message.type === 'extension.info') {
            return;
        }
        
        if (message.type === 'extension.close') {
            return;
        }

        if (nativePort) {
            debug("Sending message: " + JSON.stringify(message));
            try {
                nativePort.postMessage(message);
            } catch (e) {
                this.replyError(message, 'INTERNAL_ERROR', e.toString());
            }
        } else {
            this.replyError(message, 'HOST_NOT_FOUND', 'Приложение не установлено');
        }
    };

    this.replyError = function(message, errorCode, errorMessage) {
        this.port.postMessage({
            sessionId: message.sessionId,
            requestId: message.requestId,
            methodName: message.methodName,
            hasError: true,
            data: {
                code: errorCode,
                message: errorMessage
            }
        });
    };
    
    this.onHostMessage = function(message) {
        if (message.isChunked) {
            var id = message.id;
            var buffer = buffers[id] || '';
            buffer += message.data;
            if (!message.isFinalChunk) {
                buffers[id] = buffer;
                return;
            }
            delete buffers[id];
            message = JSON.parse(buffer);
        }
        this.port.postMessage(message);
    };
}

chrome.runtime.onConnect.addListener(function(port) {
    debug('onConnect started, port: ' + JSON.stringify(port));

    let sessionId = port.name;
    let session = sessions.get(sessionId);
    if (!session) {
        session = new Session(sessionId);
        sessions.set(sessionId, session);
    }
    session.port = port;

    port.onMessage.addListener(function(message) {
        debug('Message received: ' + JSON.stringify(message));
        session.onBrowserMessage(message);
    });

    port.onDisconnect.addListener(function() {
        debug('Client disconnected');
    });
});

chrome.runtime.onInstalled.addListener(function(details) {
    debug('onInstalled started');
});

function getLastErrorCode() {
    let lastError = chrome.runtime.lastError;
    if (lastError.message.indexOf('host not found') > 0)
        return ERROR.HOST_NOT_FOUND;

    if (lastError.message.indexOf('host has exited') > 0)
        return ERROR.HOST_HAS_EXITED;

    return lastError ? ERROR.UNKNOWN : ERROR.EMPTY;
}

function debug(message) {
    if (debugEnabled) {
        let formattedDate = formatDate(new Date());
        let formattedMessage = `${formattedDate} [DEBUG] ${message}`;
        chrome.extension.getBackgroundPage().console.log(formattedMessage);
    }
}

function formatDate(date) {

    let day = formatNumber(date.getDate(), 2);
    let month = formatNumber(date.getMonth(), 2);
    let year = date.getFullYear();

    let hours = formatNumber(date.getHours(), 2);
    let minutes = formatNumber(date.getMinutes(), 2);
    let seconds = formatNumber(date.getSeconds(), 2);

    let millis = formatNumber(date.getMilliseconds(), 3);

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}.${millis}`;
}

function formatNumber(number, length) {
    let strNumber = number.toString();
    while (strNumber.length < length) {
        strNumber = '0' + strNumber;
    }

    return strNumber;
}
