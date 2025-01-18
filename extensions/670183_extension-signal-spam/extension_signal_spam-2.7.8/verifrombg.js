

var PARAM = undefined;
var options = undefined;
var pendingSignaling = [];
var readyTabs = {};
var clickedWhileInit = false;
var hashLinkArray = new Map();
var hashLinkById = {};
var checkHostHashCache = new Map();
var surfsafeStatsInterval;
var hostHashTable = [];
var localizationData;
var newVersionNotification = 0;
var configRE=new RegExp(".*"+verifrom.appInfo.localesFileprefix+"\:config","i");
var socketClient = null;
var previousUrlChecked = {};

function openReportsList() {
    browser.tabs.create({active:true, url:"https://www.signal-spam.fr/espace-membre"});
}

function reportURLMsgHandler(msg, sender) {
    void 0;
    verifrom.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
        if (arrayOfTabs && arrayOfTabs.length > 0) {
            var activeTab = arrayOfTabs[0];
            void 0;
            if (/^http/i.test(activeTab.url) === false)
                return;
            var header;
            try {
                var hostname = verifrom.parseUrl(activeTab.url).host || "";
                header = PARAM.DUMMYHEADER.replace(/__URL__/g, btoa(encode("site : " + hostname)));
            } catch (e) {
                void 0;
                try {
                    if (activeTab.title)
                        header = btoa(encode(activeTab.title));
                    else header = "";
                } catch (e) {
                    void 0;
                    header = "";
                }
            }
            var payLoad = {
                "action": "reportURL",
                email: {"header": header, "body": PARAM.DUMMYBODY.replace(/__URL__/gm, activeTab.url), "folder": 0}
            };
            var message = {
                payLoad: payLoad,
                webmail: verifrom.appInfo.extensionName,
                url: PARAM.REPORT_API.SCHEME + PARAM.REPORT_API.HOSTNAME + PARAM.REPORT_API.PATHNAME,
                appid: PARAM.VERIFROMGADGETID
            };
            reportEmail(message);
        }
    });
}

function payloadForSignalSpam(payload) {
    var payloadTable;
    var emailPayload;

    if (payload.action === "reportURL") {
        emailPayload = payload.email.header;
        emailPayload += payload.email.body;
        try {
            emailPayload = btoa(encode(emailPayload)); 
        } catch (e) {
            emailPayload = payload.email.header;
            emailPayload += payload.email.body;
            emailPayload = escape(base64Encode(emailPayload));
        }
    } else if (payload.action === "signalHeader") {
        emailPayload = payload.email.header;
        emailPayload = emailPayload.replace(/^Content-(Type|Transfer).*/gm, '') + '\n';
        emailPayload += "Content-Type: text/html; charset=utf-8\nContent-Transfer-Encoding: quoted-printable\n\n";
        emailPayload += "Liens extraits par l'extension :\n";
        for (var i = 0; i < payload.email.links.length; i++) {
            emailPayload += '<a href="' + unescape(payload.email.links[i]) + '">lien ' + i + '</a>\n';
        }
        emailPayload += '\nBody :\n';
        emailPayload += payload.email.body;
        var emailPayloadEncoded;
        try {
            emailPayloadEncoded = btoa(encode(emailPayload)); 
        } catch (e) {
            emailPayloadEncoded = escape(base64Encode(emailPayload));
        }
        emailPayload = emailPayloadEncoded;
    } else {
        try {
            emailPayload = btoa(encode(payload.email)); 
        } catch (e) {
            emailPayload = escape(base64Encode(payload.email));
        }
    }

    var folderId = 0;
    if (payload.email.folder !== undefined)
        folderId = payload.email.folder;
    else if (payload.folder !== undefined)
        folderId = payload.folder;
    return "dossier=" + folderId + "&message=" + emailPayload;
}

function reportEmail(message) {

    if (!message || !message.payLoad) {
        var err="no message to report";
        void 0;
        verifrom.message.toAllTabs({
            response: 'Exception - No message to report' + JSON.stringify(message),
            reportId: message.reportId
        }, {channel: "PayloadFailed"});
        ExceptionReportHandler(err);
        return;
    }

    var payload = message.payLoad;

    void 0;
    try {
        var sigspamPayload = payloadForSignalSpam(payload);
        $.ajax({
            url: PARAM.REPORT_API.SCHEME + PARAM.REPORT_API.HOSTNAME + PARAM.REPORT_API.PATHNAME,
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            method: 'POST',
            type: 'POST',
            processData: false,
            data: sigspamPayload,
            timeout: 120000,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                request.setRequestHeader('X-User-Agent', 'Plugin Navigateur - Version ' + verifrom.extension.name() + ' ' + verifrom.extension.version() + ' - Webmail ' + message.webmail + ' - ' + window.navigator.userAgent + ' - ');
                request.setRequestHeader("Authorization", "Basic " + passwordEncrypt(options.email + ':' + passwordDecrypt(options.password)));
            },
            error: function (request, textStatus, errorThrown) {
                if (request.status === 401) {
                    pendingSignaling.push(message);
                    verifrom.message.toAllTabs({
                        response: verifrom.locales.getMessage('contentScript.reportStatus.invalidpassword'),
                        reportId: message.reportId
                    }, {channel: "PayloadFailed"});
                    setTimeout(function () {
                        openOptionsMsgHandler('?invalidpassword=true');
                    }, 500);
                } else if (request.status === 403) {
                    pendingSignaling.push(message);
                    verifrom.message.toAllTabs({
                        response: verifrom.locales.getMessage('contentScript.reportStatus.error403'),
                        reportId: message.reportId
                    }, {channel: "PayloadFailed"});
                } else verifrom.message.toAllTabs({
                    response: verifrom.locales.getMessage('contentScript.reportStatus.error') + " " + request.status,
                    reportId: message.reportId
                }, {channel: "PayloadFailed"});
                void 0;
            },
            success: function (HTTPResponse, textStatus, request) {
                if (request.status===202 && request.statusText==='Accepted') {
                    verifrom.message.toAllTabs({
                        response: verifrom.locales.getMessage('contentScript.reportStatus.success'),
                        reportId: message.reportId
                    }, {channel: "PayloadPosted"});
                    void 0;
                } else {
                    if (request.status===403)
                        verifrom.message.toAllTabs({
                            response: verifrom.locales.getMessage('contentScript.reportStatus.error403') + " " + request.status,
                            reportId: message.reportId
                        }, {channel: "PayloadFailed"});
                    else verifrom.message.toAllTabs({
                        response: verifrom.locales.getMessage('contentScript.reportStatus.error') + " " + request.status,
                        reportId: message.reportId
                    }, {channel: "PayloadFailed"});
                    void 0;
                }
            }
        });
    } catch (err) {
        void 0;
        verifrom.message.toAllTabs({
            response: 'Exception ' + err,
            reportId: message.reportId
        }, {channel: "PayloadFailed"});
        ExceptionReportHandler(err);
    }
}


function setSurfSafe(hostname, action) {
    if (PARAM.OPTIONS.SURFSAFE_ENABLED === false)
        return;
    try {
        hostname = hostname.replace(/^www\./i, "").toLowerCase();
        let hostHash = XXH64(hostname, 0x0).toString();
        if (hostHashTable.findIndex(function (hashItem) {
            return (hashItem.hash === hostHash && hashItem.action === action);
        }) === -1)
            hostHashTable.push({"action": action, "hash": hostHash});
        if (!surfsafeStatsInterval)
            surfsafeStatsInterval = setInterval(pushSurfSafe, 60000);
    } catch (e) {
        void 0;
    }
}

function pushSurfSafe() {
    if (hostHashTable.length === 0)
        return;

    if (PARAM.OPTIONS.SURFSAFE_ENABLED === false || !PARAM.URL_SURFSAFE || PARAM.URL_SURFSAFE.length === 0) {
        hostHashTable = [];
        return;
    }

    void 0;

    $.ajax({
        url: PARAM.URL_SURFSAFE,
        cache: false,
        method: 'POST',
        type: 'POST',
        processData: false,
        data: JSON.stringify({"hostHashes": hostHashTable}),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        timeout: 30000,
        async: true,
        error: function (request, textStatus, errorThrown) {
            void 0;
        },
        success: function (HTTPResponse, textStatus, request) {
            void 0;
            hostHashTable = [];
        }
    });
}


function sendPhishingStat(msg) {
    try {
        $.ajax({
            url: PARAM.URL_STATS_PHISHING,
            contentType: "application/json",
            cache: false,
            method: 'POST',
            type: 'POST',
            processData: false,
            data: JSON.stringify(msg),
            timeout: 120000,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                request.setRequestHeader('X-User-Agent', 'Plugin Navigateur - Version ' + verifrom.extension.name() + ' ' + verifrom.extension.version() + ' - Webmail ' + msg.webmail + ' - ' + window.navigator.userAgent + ' - ');
            },
            error: function (request, textStatus, errorThrown) {
                void 0;
            },
            success: function (HTTPResponse, textStatus, request) {
                void 0;
            }
        });
    } catch (err) {
        void 0;
    }
}

function ExceptionReportHandler(message) {
    if (!message)
        return;
    try {
        $.ajax({
            url: PARAM.URL_REPORT_FAILURE,
            contentType: "application/json",
            cache: false,
            method: 'POST',
            type: 'POST',
            data: JSON.stringify(message),
            timeout: 120000,
            beforeSend: function (request) {
                request.setRequestHeader("Content-type", "application/json");
                request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                request.setRequestHeader('X-User-Agent', 'Plugin Navigateur - Version ' + verifrom.extension.name() + ' ' + verifrom.extension.version() + ' - Webmail ' + message.webmail + ' - ' + window.navigator.userAgent + ' - ');
            },
            error: function (request, textStatus, errorThrown) {
                void 0;
            },
            success: function (HTTPResponse, textStatus, request) {
                void 0;
            }
        });
    } catch (err) {
        void 0;
    }
}
var _usingManualPolling = false;
function backToManualPolling() {
    void 0;
    if (_usingManualPolling === true)
        return; 
    _usingManualPolling = true;
    setTimeout(planUpdatePhishingDatabase, PARAM.NOPUSHINTERVAL || 300000);
    setTimeout(() => {
        _usingManualPolling = false;
    }, (PARAM.BACKTOPUSHTIMEOUT || PARAM.NOPUSHINTERVAL || 300000) * 10);
}

function downloadDatabase(callback, retries=0) {
    retries=Math.min(++retries,10);
    void 0;

    disconnectFromProxy(()=>{
        $.ajax({
            url: PARAM.URL_PROXY_DATABASE,
            contentType: "application/json",
            cache: false,
            method: 'GET',
            type: 'GET',
            dataType: 'json',
            timeout: 300000,
            async: true,
            error: function (request, textStatus, errorThrown) {
                void 0;
                setTimeout(downloadDatabase.bind(this, callback, retries), 60000*retries);
            },
            success: function (JSONresponse, textStatus, request) {
                void 0;
                switch (request.status) {
                    case 503:
                        setTimeout(downloadDatabase.bind(this, callback, retries), 60000*retries);
                        break;
                    case 200:
                        let recordsArray;
                        void 0;
                        if (typeof JSONresponse !== 'object') {
                            void 0;
                            recordsArray = JSON.parse(JSONresponse);
                        }
                        else recordsArray = JSONresponse;
                        storeDBRecords(recordsArray);
                        checkHostHashCache.clear();
                        if (typeof callback === 'function')
                            callback();
                        break;
                    default:
                        break;
                }
            }
        });
    });
}

let nextPhishingDBUpdate = 0;
function planUpdatePhishingDatabase() {
    nextPhishingDBUpdate++;
    if (nextPhishingDBUpdate === 1)
        updatePhishingDatabase();
}

function updatePhishingDatabase() {
    let lastTimeStamp;
    lastTimeStamp = getLatestTimeStamp();
    let lastResetTimeStamp;
    lastResetTimeStamp = getLastReset();

    void 0;

    if (!lastTimeStamp) {
        void 0;
        nextPhishingDBUpdate = 0;
        downloadDatabase(planUpdatePhishingDatabase);
        return;
    }

    if (backToManualPolling!==true)
        connectToPushProxy(true);

    let ids = hashLinkById ? Object.keys(hashLinkById): [];
    if (ids.length > (PARAM.MAXIDS || 5000))
        ids = ids.slice(ids.length-(PARAM.MAXIDS || 5000));
    const data = JSON.stringify({"lastTimeStamp": lastTimeStamp, "lastResetTimeStamp": lastResetTimeStamp, "dbsize": hashLinkArray.size, ids: ids, _usingManualPolling: _usingManualPolling});
    $.ajax({
        url: PARAM.URL_PROXY_UPDATE,
        contentType: "application/json",
        cache: false,
        method: 'POST',
        type: 'POST',
        dataType: 'json',
        data: data,
        timeout: 60000,
        async: true,
        error: function (request, textStatus, errorThrown) {
            void 0;
            nextPhishingDBUpdate = 0;
            switch (request.status) {
                case 429:
                    backToManualPolling();
                    disconnectFromProxy();
                    break;
                case 503:
                    setTimeout(planUpdatePhishingDatabase, PARAM.WaitDBIsBack || 60000);
                    break;
                default:
                    setTimeout(planUpdatePhishingDatabase, PARAM.WaitDBIsBack || 60000);
                    break;
            }
        },
        success: function (JSONresponse, textStatus, request) {
            void 0;
            switch (request.status) {
                case 429:
                    backToManualPolling();
                    disconnectFromProxy();
                    break;
                case 503:
                    setTimeout(planUpdatePhishingDatabase, PARAM.WaitDBIsBack || 60000);
                    break;
                case 204:
                    resetDB("204 received from proxy");
                    checkHostHashCache.clear();
                    nextPhishingDBUpdate = 0;
                    downloadDatabase(function () {
                        planUpdatePhishingDatabase()
                    });
                    break;
                case 200:
                    let recordsArray;

                    if (typeof JSONresponse !== 'object') {
                        void 0;
                        recordsArray = JSON.parse(JSONresponse);
                    }
                    else recordsArray = JSONresponse;

                    if (recordsArray.length > 0) {
                        void 0;
                        storeDBRecords(recordsArray);
                        checkHostHashCache.clear();
                    }
                    else void 0;
                    if (_usingManualPolling===true)
                        setTimeout(planUpdatePhishingDatabase, PARAM.NOPUSHINTERVAL || 300000);
                    break;
                default:
                    setTimeout(planUpdatePhishingDatabase, PARAM.WaitDBIsBack || 60000);
                    break;
            }
            nextPhishingDBUpdate = 0;
        }
    });
}

const disconnectListeners=[];
function disconnectFromProxy(callback) {
    try {
        if (socketClient && !socketClient.disconnected) {
            void 0;
            if (typeof callback==="function")
                disconnectListeners.push(callback);
            socketClient.disconnect();
        } else {
            void 0;
            if (typeof callback==="function")
                disconnectListeners.push(callback);
            let disconnectResolver;
            while (disconnectResolver = disconnectListeners.shift()) {
                void 0;
                disconnectResolver();
            }
        }
    } catch (e) {
        void 0;
        if (typeof callback==="function")
            disconnectListeners.push(callback);
        let disconnectResolver;
        while (disconnectResolver = disconnectListeners.shift()) {
            void 0;
            disconnectResolver();
        }
    }
}

let _reconnecting = false;
const eventHandlers = {
    reload: {
        handler: function() {
            void 0;
            refreshParams().then(err => {
                setTimeout(() => {
                    void 0;
                    planUpdatePhishingDatabase();
                },(PARAM.WaitDBIsBack || 30000) + Math.round(Math.random()*30000));
            });
        },
        target: "socket"
    },
    updates: {
        handler: function(JSONresponse) {
            let recordsArray;
            void 0;
            if (typeof JSONresponse !== 'object') {
                void 0;
                recordsArray = JSON.parse(JSONresponse);
            }
            else recordsArray = JSONresponse;
            storeDBRecords(recordsArray);
            checkHostHashCache.clear();
        },
        target: "socket"
    },
    reportstatus: {
        active: "function"===typeof updateReport,
        handler: function(message) {
            void 0;
            updateReport(message.UID,message.s,message.t);
        },
        target: "socket"
    },
    reset: {
        handler: function(JSONresponse) {
            void 0;
            resetDB("Reset received from proxy");
            checkHostHashCache.clear();
            setTimeout(() => {
                downloadDatabase(planUpdatePhishingDatabase);
            }, (PARAM.WaitDBIsBack || 30000) + Math.round(Math.random()*30000));
        },
        target: "socket"
    },
    close: {
        handler: function(JSONresponse) {
            void 0;
            disconnectFromProxy(()=>{
                setTimeout(() => {
                    void 0;
                    planUpdatePhishingDatabase();
                },(PARAM.WaitDBIsBack || 30000) + Math.round(Math.random()*30000)); 
            });
        },
        target: "socket"
    },
    open: {
        active: true,
        handler: function() {
            void 0;
        },
        target: "socket"
    },
    reconnect_attempt: {
        active: true,
        handler: function(nbAttempts) {
            void 0;
            try {
                if (nbAttempts >= (PARAM.SOCKETIO.OPTIONS.reconnectionAttempts || PARAM.MAXPOLLINGATTEMPTS || 10)) {
                    disconnectFromProxy(()=>{
                        try {
                            destroySocketConnection();
                            if (socketClient.io && typeof socketClient.io.reconnectionAttempts==='function')
                                socketClient.io.reconnectionAttempts((PARAM.SOCKETIO.OPTIONS.reconnectionAttempts || PARAM.MAXPOLLINGATTEMPTS || 10));
                        } catch(e) {}
                        socketClient = null;
                        backToManualPolling();
                    });
                } else _reconnecting = true;
            } catch(e) {
                disconnectFromProxy(()=>{
                    try {
                        destroySocketConnection();
                        if (socketClient.io && typeof socketClient.io.reconnectionAttempts==='function')
                            socketClient.io.reconnectionAttempts((PARAM.SOCKETIO.OPTIONS.reconnectionAttempts || PARAM.MAXPOLLINGATTEMPTS || 10));
                    } catch(e) {}
                    socketClient = null;
                    backToManualPolling();
                });
            }
        },
        target: "socket.io",
        removeOnDisconnect: false
    },
    connect: {
        handler: function () {
            void 0;
            _reconnecting = false;
        },
        target: "socket",
        removeOnDisconnect: false
    },
    disconnect: {
        handler: function (reason) {
            void 0;
            if (socketClient.connected === false) {
                void 0;
                setHandlers(false);
            } else {
                void 0;
            }
            if (PARAM.SOCKETIO.PARAMS && PARAM.SOCKETIO.PARAMS.RECONNECT_ON && PARAM.SOCKETIO.PARAMS.RECONNECT_ON.includes(reason)) {
                void 0;
                setTimeout(() => {
                    void 0;
                    planUpdatePhishingDatabase();
                },(PARAM.WaitDBIsBack || 30000) + Math.round(Math.random()*30000));
            }
            let disconnectResolver;
            while (disconnectResolver = disconnectListeners.shift()) {
                void 0;
                disconnectResolver();
            }
        },
        target: "socket",
        removeOnDisconnect: false
    },
    reconnect: {
        handler: function () {
            void 0;
            _reconnecting = false;
            planUpdatePhishingDatabase();
        },
        target: "socket.io",
        removeOnDisconnect: false
    }
};

let _initializingHandlers = false;
function setHandlers(activate = true) {
    if (_initializingHandlers)
        return setTimeout(setHandlers, 500, activate);
    else _initializingHandlers = true;
    let events = Object.keys(eventHandlers);
    try {
        for (let eventName of events) {
            if (!socketClient)
                break;
            const event = eventHandlers[eventName];
            if (event.active !== false) {
                let target;
                switch (event.target) {
                    case "socket":
                        target = socketClient;
                        break;
                    case "socket.io":
                        target = socketClient.io;
                        break;
                    default:
                        target = socketClient;
                        break;
                }
                if (!target)
                    continue;
                if (event.removeOnDisconnect !== false && event.listening) {
                    void 0;
                    target.removeEventListener(eventName, event.handler);
                    event.listening=false;
                }
                if (activate) {
                    if (!event.listening) {
                        event.listening = event.handler;
                        target.addEventListener(eventName, event.handler);
                        void 0;
                    } else void 0;
                }
            }
        }
    } catch(e) {}
    _initializingHandlers=false;
}

let _listeningForConnect=false;
function socketConnected() {
    _reconnecting = false;
    void 0;
    if (socketClient.connected !== true)
        void 0;
    if (_usingManualPolling===true) {
        _listeningForConnect = false;
        destroySocketConnection();
    }
    setHandlers();
    _listeningForConnect=false;
}

function listenForConnect() {
    if (_listeningForConnect)
        return;
    else _listeningForConnect=true;
    socketClient.once("connect",socketConnected);
}

function destroySocketConnection() {
    try {
        if (socketClient) {
            setHandlers(false);
            socketClient.destroy();
            socketClient.close();
        }
    } catch(e) {}
    socketClient = null;
    _listeningForConnect = false;
}

let lastConnParams = "";
function connectToPushProxy(ifNotConnected) { 
    try {
        if (!ifNotConnected && socketClient.connected === true) {
            return disconnectFromProxy(()=>{
                if (socketClient.connected !== false) {
                    void 0;
                    socketClient.connected = false;
                }
                connectToPushProxy(ifNotConnected);
            });
        }
        if (_usingManualPolling===true)
            return; 
        if (socketClient && PARAM.SOCKETIO && lastConnParams && lastConnParams !== JSON.stringify(PARAM.SOCKETIO)) {
            void 0;
            destroySocketConnection();
        }
        if (!socketClient) {
            void 0;
            socketClient = io.connect(PARAM.URL_PROXY_PUSH, PARAM.SOCKETIO ? PARAM.SOCKETIO.OPTIONS : undefined);
            listenForConnect();
            lastConnParams = JSON.stringify(PARAM.SOCKETIO);
        } else {
            if (socketClient.connected === false && _reconnecting === false)  {
                void 0;
                socketClient.connect();
                listenForConnect();
            } else void 0;
        }
        void 0;
    } catch (err) {
        void 0;
    }
}

function updateLastDBReset() {
    let timestamp;
    timestamp = (new Date()).getTime();
    verifrom.dbStorage.set('lastreset', timestamp);
}

function getLastReset() {
    let lastreset;
    lastreset = verifrom.dbStorage.get('lastreset');
    if (lastreset === undefined || lastreset === null)
        lastreset = 0;
    return lastreset;
}

function resetDB(reason) {
    disconnectFromProxy(()=>{
        let previousVersion;
        previousVersion = verifrom.dbStorage.get(verifrom.appInfo.extensionName + '_Version');
        void 0;
        verifrom.dbStorage.clear();
        hashLinkArray.clear();
        hashLinkById = {};
        if (previousVersion)
            verifrom.dbStorage.set(verifrom.appInfo.extensionName + '_Version', previousVersion);
        if (PARAM)
            verifrom.dbStorage.set(verifrom.appInfo.extensionName + 'PARAMS', PARAM);
        updateLastDBReset();
    });
}

function getLatestTimeStamp() {
    let latestTimeStamp;
    latestTimeStamp = verifrom.dbStorage.get('timestamp');
    if (!latestTimeStamp)
        latestTimeStamp = 0;
    void 0;
    return latestTimeStamp;
}

function updateLatestTimeStamp(timestamp) {
    verifrom.dbStorage.set('timestamp', timestamp);
}

function storeDBRecords(recordsArray, callback) {
    let latestTimeStamp;
    let previousRecord;

    latestTimeStamp = getLatestTimeStamp();
    void 0;
    try {
        recordsArray.forEach(function (record) {
            if (record.url) {
                record.url = parseInt(record.url);
                record.id = parseInt(record.id);
                switch (record.action) {
                    case 1:
                        if (!(previousRecord = hashLinkArray.get(record.url)))
                            hashLinkArray.set(record.url, [record.id]);
                        else {
                            if (!previousRecord.includes(record.id))
                                previousRecord.push(record.id);
                            hashLinkArray.set(record.url, previousRecord);
                        }
                        hashLinkById[record.id] = record.url;
                        break;
                    case 0:
                        previousRecord = hashLinkArray.get(record.url);
                        if (previousRecord) {
                            for (let i = 0; i < previousRecord.length; i++)
                                delete hashLinkById[previousRecord[i]];
                        }
                        hashLinkArray.delete(record.url);
                        delete hashLinkById[record.id];
                        break;
                }
                if (record.time > latestTimeStamp)
                    latestTimeStamp = record.time;
            }
        });
    } catch (e) {
        void 0;
    }
    finally {
        verifrom.dbStorage.set("phishingDB", JSON.stringify(hashLinkById));
        updateLatestTimeStamp(latestTimeStamp);
    }
    void 0;
    if (typeof callback === 'function')
        callback();
}

function loadDBRecords(tabId) {
    if (options.userAuthentified === false && PARAM.OPTIONS.STOPPHISHING_USERACCOUNT_REQUIRED_ENABLED === true)
        return;

    if (verifrom.appInfo.chrome===true && browser.extension.inIncognitoContext===true) {
        let previousRecord;
        void 0;
        void 0;
        let dbRecords = verifrom.dbStorage.get("phishingDB");
        if (!dbRecords) {
            void 0;
            checkHostHashCache.clear();
            return;
        }
        dbRecords = JSON.parse(dbRecords);
        void 0;
        hashLinkById = {};
        hashLinkArray.clear();
        Object.keys(dbRecords).forEach(function (id) {
            let urlHash = parseInt(dbRecords[id]); 
            if (!(previousRecord = hashLinkArray.get(urlHash)))
                hashLinkArray.set(urlHash, [id]);
            else {
                if (!previousRecord.includes(id))
                    previousRecord.push(id);
                hashLinkArray.set(urlHash, previousRecord);
            }
            hashLinkById[id] = urlHash;
        });
        void 0;
        verifrom.dbStorage.onChange(loadDBRecords); 
        return;
    }

    let previousRecord;
    void 0;
    void 0;
    let dbRecords = verifrom.dbStorage.get("phishingDB");
    if (!dbRecords) {
        void 0;
        resetDB("not found");
        checkHostHashCache.clear();
        downloadDatabase(function () {
            planUpdatePhishingDatabase()
        });
        return;
    }
    dbRecords = JSON.parse(dbRecords);
    void 0;
    hashLinkById = {};
    hashLinkArray.clear();
    Object.keys(dbRecords).forEach(function (id) {
        let urlHash = parseInt(dbRecords[id]); 
        if (!(previousRecord = hashLinkArray.get(urlHash)))
            hashLinkArray.set(urlHash, [id]);
        else {
            if (!previousRecord.includes(id))
                previousRecord.push(id);
            hashLinkArray.set(urlHash, previousRecord);
        }
        hashLinkById[id] = urlHash;
    });
    void 0;
    if (!tabId)
        planUpdatePhishingDatabase();
}

function checkHostHash(hostname, urlHash, hashFullCanonLink, onPhishingCallback) {
    try {
        hostname = verifrom.normalizeHostName(hostname);
        let previousResponse = checkHostHashCache.get(urlHash);
        let sources=[];
        if (typeof previousResponse !== "undefined") {
            let hostHashMatching = false;
            void 0;
            if ("undefined" !== typeof previousResponse.hostname && previousResponse.hostname.length > 0) {
                let hostHash = parseInt(XXH(hostname, 0x0).toString());
                for (let i = 0; i < previousResponse.hostname.length; i++) {
                    if (previousResponse.hostname[i].hash32_hostname === hostHash) {
                        if (typeof previousResponse.hostname[i].hash32_url !== 'undefined') {
                            void 0;
                            for (let j = 0; j < previousResponse.hostname[i].hash32_url.length; j++) {
                                if (previousResponse.hostname[i].hash32_url[j].toString() === hashFullCanonLink) {
                                    void 0;
                                    hostHashMatching = true;
                                    if (previousResponse.hostname[i].source)
                                        sources.push(previousResponse.hostname[i].source);
                                } else {
                                    void 0;
                                }
                            }
                        }
                        else {
                            void 0;
                            hostHashMatching = true;
                            if (previousResponse.hostname[i].source)
                                sources.push(previousResponse.hostname[i].source);
                        }
                    }
                }
            }
            if (hostHashMatching===true)
                onPhishingCallback(urlHash, sources);
             else onPhishingCallback(false);
        }
        else {
            let hostHashMatching = false;
            verifrom.request.get({
                url: PARAM.URL_STOPPHISHING_API + urlHash,
                onSuccess: function (JSONresponse, additionalInfo) {
                    let sources=[];
                    if ("undefined" !== typeof JSONresponse.hostname && JSONresponse.hostname.length > 0) {
                        let hostHash = parseInt(XXH(hostname, 0x0).toString());
                        checkHostHashCache.set(urlHash, JSONresponse);
                        for (let i = 0; i < JSONresponse.hostname.length; i++) {
                            if (JSONresponse.hostname[i].hash32_hostname === hostHash) {
                                if (typeof JSONresponse.hostname[i].hash32_url !== 'undefined') {
                                    void 0;

                                    for (let j = 0; j < JSONresponse.hostname[i].hash32_url.length; j++) {
                                        if (JSONresponse.hostname[i].hash32_url[j].toString() === hashFullCanonLink) {
                                            void 0;
                                            hostHashMatching = true;
                                            if (JSONresponse.hostname[i].source)
                                                sources.push(JSONresponse.hostname[i].source);
                                            break;
                                        } else {
                                            void 0;
                                        }
                                    }
                                }
                                else {
                                    void 0;
                                    hostHashMatching = true;
                                    if (JSONresponse.hostname[i].source)
                                        sources.push(JSONresponse.hostname[i].source);
                                }
                            }
                        }
                    }
                    if (!hostHashMatching) {
                        void 0;
                        onPhishingCallback(false);
                    } else {
                        onPhishingCallback(urlHash, sources);
                    }
                },
                onFailure: function (httpCode) {
                    void 0;
                    hostHashMatching = false;
                    void 0;
                    onPhishingCallback(false);
                },
                additionalRequestHeaders: {'Verifrom-id': PARAM.VERIFROMGADGETID},
                contentType: 'application/x-www-form-urlencoded',
                responseDataType: 'json'
            });
        }
    } catch (err) {
        void 0;
        onPhishingCallback(false);
    }
}

function checkHostPathCombination(hostname, port, path, query, onPhishingCallback) {
    let ipv4v6Addr = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:)(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(hostname);
    let hostComponents;
    let trailingSlash = /\/$/.test(path) ? '/' : '';
    let hashCanonLink;
    let hashFullCanonLink;

    hostComponents = hostname.split('.');
    port = port !== "" ? ":" + port : "";

    hashFullCanonLink = XXH(hostname.replace(/^www\./i, '') + port + path + query, 0x0).toString();

    while (hostComponents.length > 1) {
        let hostToHash = hostComponents.join('.');
        if (query.length > 0) {
            hashCanonLink = parseInt(XXH(hostToHash + port + path + query, 0x0).toString());

            if (hashLinkArray.has(hashCanonLink)) {
                void 0;
                if (verifrom.appInfo.stopPhishingCollisionCheckAPI)
                    checkHostHash(hostname, hashCanonLink, hashFullCanonLink, onPhishingCallback);
                else onPhishingCallback(hashCanonLink);
                return true;
            }
            else {
            }
        }

        let URLpathComponents = path.split('/');
        if (URLpathComponents[0].length === 0)
            URLpathComponents.shift();
        if (URLpathComponents[URLpathComponents.length - 1].length === 0)
            URLpathComponents.pop();
        while (URLpathComponents.length >= 0) {
            let pathToHash;
            pathToHash = '/' + URLpathComponents.join('/');
            if (pathToHash.length === path.length)
                pathToHash += trailingSlash;
            else pathToHash += '/';
            if (/^\/*$/.test(pathToHash))
                pathToHash = '/';
            hashCanonLink = parseInt(XXH(hostToHash + port + pathToHash, 0x0).toString());
            if (hashLinkArray.has(hashCanonLink)) {
                if (verifrom.appInfo.stopPhishingCollisionCheckAPI)
                    checkHostHash(hostname, hashCanonLink, hashFullCanonLink, onPhishingCallback);
                else onPhishingCallback(hashCanonLink);
                void 0;
                return true;
            }
            else {
                void 0;
            }

            if (URLpathComponents.length === 0)
                break;
            if (URLpathComponents.length > 3)
                URLpathComponents.splice(3);
            else URLpathComponents.pop();
        }
        if (ipv4v6Addr)
            return false;
        if (hostComponents.length > 5)
            hostComponents = hostComponents.splice(-5, 5);
        else hostComponents.shift();
    }
    onPhishingCallback(false);
    return false;
}

function checkHashHandler(msg, sender, response) {
    let reply = [];
    let foundOne = false;
    let h;
    let surfsafe = [];
    let checkId;
    let hashList;

    if ('undefined' !== typeof msg.computedHash)
        hashList = msg.computedHash;
    if ('undefined' !== typeof msg.checkId)
        checkId = msg.checkId;

    void 0;

    for (let i = 0; i < hashList.length; i++) {
        h = hashList[i];
        reply[i] = null;
        if (hashLinkArray.has(parseInt(h.greyHash))) {
            if (verifrom.dbStorage.get(h.greyHash + '-falsePositive') === undefined) {
                reply[i] = h.greyHash;
                foundOne = true;
            }
        } else {
            let hashMatches = false;
            for (let j = 0; j < h.hash.length && hashMatches === false; j++) {
                if (hashLinkArray.has(parseInt(h.hash[j])) && verifrom.dbStorage.get(h.hash[j] + '-falsePositive') === undefined) {
                    reply[i] = h.hash[j];
                    hashMatches = true;
                }
            }
            if (hashMatches)
                foundOne = true;
            else surfsafe.push(h.host);
        }
    }
    if (!foundOne) {
        if (verifrom.appInfo.quantum)
            response({"checkId": checkId, "phish": false, "hash": null});
        else verifrom.message.toTab(sender.tab.id, {"checkId": checkId, "phish": false, "hash": null}, {"channel": "checkedHash"});
    }
    else {
        if (!verifrom.appInfo.stopPhishingCollisionCheckAPI) {
            if (verifrom.appInfo.quantum)
                response({"checkId": checkId, "phish": foundOne, "hash": reply});
            else verifrom.message.toTab(sender.tab.id, {"checkId": checkId, "phish": foundOne, "hash": reply}, {"channel": "checkedHash"});
            return;
        }
        foundOne = false;
        for (let i = 0; i < reply.length && foundOne === false; i++) {
            if (reply[i]) {
                let h = hashList[i];
                checkHostHash(h.host, reply[i], h.greyHash, function (isPhishing, sources) {
                    if (isPhishing === false) {
                        return;
                    }
                    if (verifrom.appInfo.quantum)
                        response({"checkId": checkId, "phish": true, "hash": reply, sources: sources});
                    else verifrom.message.toTab(sender.tab.id, {"checkId": checkId, "phish": true, "hash": reply, sources:sources}, {channel: "checkedHash"});
                    foundOne = true;
                });
            }
        }
    }
    for (let i = 0; i < surfsafe.length; i++)
        setSurfSafe(surfsafe[i], 'h2');
}

function reformatURL(url) {
    if (PARAM.LINKS_CONVERSIONS_RULES) {
        let rulename = PARAM.LINKS_CONVERSIONS_RULES["BACKGROUND"];
        if (!rulename)
            return url;
        let rule = PARAM.LINKS_CONVERSIONS[rulename];
        let applyAction = function (action, linkString) {
            void 0;
            if (!linkString)
                return linkString;
            try {
                let r = new RegExp(action.replace, "i");
                linkString = linkString.replace(r, action.replaceBy);
            } catch (e) {
                void 0;
                linkString = null;
            } finally {
                return linkString;
            }
        };
        let applyActions = function (actions, linkString) {
            void 0;
            if (!linkString)
                return linkString;
            if (actions && actions.length) {
                try {
                    for (action of actions) {
                        linkString = applyAction(action, linkString);
                    }
                } catch (e) {
                    void 0;
                    if (typeof action.onError === "string" && PARAM.LINKS_CONVERSIONS[action.onError]) {
                        linkString = applyRule(PARAM.LINKS_CONVERSIONS[action.onError], linkString);
                    }
                }
            } else void 0;
            return linkString;
        };
        let applyRule = function (ruleToApply, linkString) {
            void 0;
            if (!linkString)
                return linkString;
            try {
                let r = new RegExp(ruleToApply.match, "i");
                let nullit = false;

                if (ruleToApply.shouldMatch === false) {
                    void 0;
                    if (linkString.match(r) === null)
                        linkString = applyActions(ruleToApply.actions, linkString);
                    else nullit = true;
                } else if (ruleToApply.shouldMatch === true || !ruleToApply.shouldMatch) {
                    void 0;
                    if (linkString.match(r) !== null)
                        linkString = applyActions(ruleToApply.actions, linkString);
                    else nullit = true;
                } else nullit = true;
                if (nullit === true && ruleToApply.else === "null")
                    linkString = null;
                else if (nullit === true && ruleToApply.else && ruleToApply.else[0] === "#") {
                    let elseRule = PARAM.LINKS_CONVERSIONS[ruleToApply.else.slice(1)];
                    if (elseRule)
                        linkString = applyRule(elseRule, linkString);
                    else void 0;
                } 

            } catch (e) {
                void 0;
                linkString = null;
            }
            void 0;
            return linkString;
        };
        if (rule instanceof Array) {
            for (singleRule of rule)
                url = applyRule(singleRule, url);
        } else if (rule instanceof Object)
            url = applyRule(rule, url);
        return url;
    } else return url;
}

function checkURLBeforeNavigate(eventDetails) {
        void 0;


        if (verifrom.appInfo.safari && configRE.test(eventDetails.url)===true)
        {
            void 0;
            eventDetails.target.url= verifrom.getURL("html/options.html");
            return;
        }

        if (options.URLDETECT === false || PARAM.OPTIONS.STOPPHISHING_BROWSING_ENABLED !== true || !eventDetails || eventDetails.tabId < 0) {
            return;
        }
        if ((eventDetails.redirect_url || eventDetails.url) === previousUrlChecked[eventDetails.tabId]) {
            void 0;
            return;
        }
        if (verifrom.appInfo.safari)
            eventDetails.tabId=verifrom.message.setTabId(eventDetails.target);

        if (eventDetails.tabId && (readyTabs[eventDetails.tabId] === 'ready' || readyTabs[eventDetails.tabId] === 'init'))
            UnloadMsgHandler(null, {tab: {id: eventDetails.tabId}});

        try {
            let urlToCheck = (eventDetails.redirect_url || eventDetails.url);
            if (/^http/.test(urlToCheck) === false) {
                return;
            }
            if (verifrom.appInfo.safari!==true && eventDetails.parentFrameId !== -1) {
                return;
            }
            previousUrlChecked[eventDetails.tabId] = urlToCheck;
            urlToCheck = reformatURL(urlToCheck);
            let parsedCanonUrl = verifromURLCanonicalization.canonicalize(urlToCheck);
            parsedCanonUrl = verifrom.parseUrl(parsedCanonUrl);

            checkHostPathCombination(parsedCanonUrl.host, parsedCanonUrl.port, parsedCanonUrl.path, parsedCanonUrl.query, function (phishingAlert, sources) {
                if (phishingAlert===false){
                    return;
                }
                void 0;
                if (verifrom.dbStorage.get(phishingAlert + '-' + eventDetails.tabId) === undefined && verifrom.dbStorage.get(phishingAlert + '-falsePositive') === undefined) {
                    void 0;
                    let alertTimeout = ("object" === typeof PARAM && PARAM.PHISHING_ALERT_TIMEOUT) ? parseInt(PARAM.PHISHING_ALERT_TIMEOUT) : 3600;
                    verifrom.dbStorage.set(phishingAlert + '-' + eventDetails.tabId, {
                            mutex: true,
                            url: (eventDetails.redirect_url || eventDetails.url),
                            sources: sources
                        }, verifrom.time.secondsFromNow(alertTimeout));
                    verifrom.tabs.update(eventDetails.tabId, {url: verifrom.getURL("/html/phishingAlert.html?" + phishingAlert+'-'+eventDetails.tabId)});
                    sendPhishingStat({
                        'event': 'PHISHING_SITE',
                        'eventDetail': 'page opened',
                        'links': (eventDetails.redirect_url || eventDetails.url)
                    });
                }
            });
            setSurfSafe(parsedCanonUrl.host, "h1");
        } catch (e) {
            void 0;
            return;
        }
}

function checkOnCreatedNavigationTarget(details) {
    void 0;
    checkURLBeforeNavigate(details);
}

function checkURLOnTabUpdated(tabId, changeInfo, tabInfo) {
    void 0;
    void 0;
    void 0;
    if (tabInfo.url && /^http/i.test(tabInfo.url)) {
        void 0;
        checkURLBeforeNavigate({tabId:tabInfo.id,url:tabInfo.url, parentFrameId:-1});
    } else if (tabInfo.title && /^([^\/]+\.)+[a-z]{2,}(\/.*)/i.test(tabInfo.title)===true) {
        void 0;
        checkURLBeforeNavigate({tabId:tabInfo.id,url:"http://"+tabInfo.title, parentFrameId:-1});
    }
}


function checkReminder(reminderCallback) {
    let currentTimestamp = +new Date();

    verifrom.settings.get(PARAM.USER_SETTINGS.DEFAULT, function (items) {
        if (items.REMINDER === true) {
            if (typeof items.REMINDER_FREQUENCY !== 'number')
                items.REMINDER_FREQUENCY = parseInt(items.REMINDER_FREQUENCY);

            if (currentTimestamp - items.REMINDER_LASTDISPLAYED < items.REMINDER_FREQUENCY * 24 * 3600 * 1000)
                void 0;
            else if (typeof reminderCallback === 'function')
                reminderCallback(items.REMINDER_FREQUENCY);
            else void 0;
        }
    });
}

function updateReminder() {
    let currentTimestamp = +new Date();
    verifrom.settings.get(PARAM.USER_SETTINGS.DEFAULT, function (items) {
        items.REMINDER_LASTDISPLAYED = currentTimestamp;
        verifrom.settings.set(items, function () {
            void 0;
        });
    });
}

function displayReminder(frequency) {
    verifrom.message.toAllTabs({
        action: "displayReminder",
        "rootFolder": verifrom.getURL('/'),
        "frequency": frequency
    }, {channel: "displayReminder"});
    updateReminder();
}

function restoreOptions(openOptions, callback) {
    void 0;
    verifrom.settings.get(PARAM.USER_SETTINGS.DEFAULT, function (items) {
        if (verifrom.appInfo.safari){
            if (safari.extension.settings.newPasswordFormat===undefined && items.password && items.password.length>0) {
                try {
                    items.password=passwordEncrypt(items.password);
                } catch(e) {
                    void 0;
                }
                safari.extension.secureSettings.password=items.password;
            }
            safari.extension.settings.newPasswordFormat=true;
        }
        options = items;
        void 0;
        if (typeof callback === 'function')
            callback();
    });
}

function loadParamsFromLocalFile(onSuccessCallback, onFailureCallback) {
    PARAM = verifrom.dbStorage.get(verifrom.appInfo.extensionName + 'PARAMS');
    if (typeof PARAM === 'object') {
        void 0;
        onSuccessCallback();
        return;
    }

    verifrom.request.get({
            url: verifrom.getURL(extensionConfig.jsonConfig.localFileName),
            onSuccess: function (JSONresponse, additionalInfo) {
                PARAM = JSONresponse;
                void 0;
                verifrom.dbStorage.set(verifrom.appInfo.extensionName + 'PARAMS', PARAM);
                onSuccessCallback();
            },
            onFailure: function (httpCode) { 
                void 0;
                if (typeof onFailureCallback === 'function')
                    onFailureCallback();
            },
            contentType: 'application/x-www-form-urlencoded',
            responseDataType: 'json'
        }
    );
}

function loadParams(onSuccessCallback, onFailureCallback) {
    void 0;
    try {
        let paramsUrl = extensionConfig.jsonConfig.url;
        if (extensionConfig.appInfo.staging===true || extensionConfig.appInfo.logLevel > 0)
            paramsUrl = extensionConfig.jsonConfig.staging;
        verifrom.request.get({
            url: paramsUrl + '?nocache=' + (new Date().getTime()),
            onSuccess: function (JSONresponse, additionalInfo) {
                PARAM = JSONresponse;
                void 0;
                if (typeof PARAM !== 'object')
                    loadParamsFromLocalFile(onSuccessCallback, onFailureCallback);
                else
                    verifrom.dbStorage.set(verifrom.appInfo.extensionName + 'PARAMS', PARAM);
                onSuccessCallback();
            },
            onFailure: function (httpCode) { 
                void 0;
                    loadParamsFromLocalFile(onSuccessCallback, onFailureCallback);
            },
            contentType: 'application/x-www-form-urlencoded',
            responseDataType: 'json',
            timeout:5000
        });
    } catch (err) {
        void 0;
        if (typeof onFailureCallback === 'function')
            onFailureCallback();
    }
}

function contextMenuHandler(info, tab) {
    void 0;
    switch (info.menuItemId) {
        case 'reportsList':
            openReportsList();
        break;
        case 'options':
            verifrom.extension.openOptions();
        break;
    }
}

function setEventListeners() {

    void 0;
    if (PARAM.OPTIONS.STOPPHISHING_BROWSING_ENABLED === true && ((options.userAuthentified === true && PARAM.OPTIONS.STOPPHISHING_USERACCOUNT_REQUIRED_ENABLED === true) || PARAM.OPTIONS.STOPPHISHING_USERACCOUNT_REQUIRED_ENABLED === false)) {
        void 0;
        if (verifrom.appInfo.safari) {
            safari.application.addEventListener("beforeNavigate",checkURLBeforeNavigate);
        } else {

            if (browser.webNavigation.onCreatedNavigationTarget)
                browser.webNavigation.onCreatedNavigationTarget.addListener(checkOnCreatedNavigationTarget);

            browser.webNavigation.onBeforeNavigate.addListener(checkURLBeforeNavigate);

            if (verifrom.appInfo.quantum)
                browser.tabs.onUpdated.addListener(checkURLOnTabUpdated,{"properties":["status"]});
        }
    }
    if (!verifrom.appInfo.quantum) {
        if (PARAM.OPTIONS.STOPPHISHING_BROWSING_ENABLED === true && ((options.userAuthentified === true && PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true) || PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === false)) {
            verifrom.browserAction.setPopup({"popup": "html/reportphishing.html"});
        }
        else if (PARAM.OPTIONS.STOPPHISHING_BROWSING_ENABLED === true && PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true && options.userAuthentified !== true) {
            verifrom.browserAction.setPopup({"popup": "html/notAuthentified.html"});
        }
    }
    verifrom.contextMenus.removeAll(()=>{
        verifrom.contextMenus.create({
            id: "reportsList",
            title: verifrom.locales.getMessage("reports.title"),
            contexts: ["browser_action"],
            type: "normal"
        });
        if (extensionConfig.appInfo.quantum || extensionConfig.appInfo.edge) {
            verifrom.contextMenus.create({
                id: "options",
                title: verifrom.locales.getMessage("options.title"),
                contexts: ["browser_action"],
                type: "normal"
            });
        }
        verifrom.contextMenus.onClicked.addListener(contextMenuHandler);
    });
    verifrom.browserAction.onClicked(clickOnActionButton);
}

function setChromeExtensionEventListeners() {
    verifrom.extension.onInstalled(function () {
        void 0;
        resetDB("extension just installed");
        restoreOptions(true);
        verifrom.tabs.reload(PARAM.WEBMAILS_URL_PATTERNS);
    });

    if (verifrom.appInfo.safari===false) {
        chrome.runtime.onUpdateAvailable.addListener(function (object) {
            void 0;
            chrome.runtime.reload();
        });

        if (verifrom.appInfo.uninstallURL)
            chrome.runtime.setUninstallURL(verifrom.appInfo.uninstallURL, function () {});
    }
}

function surfstatMsgHandler(msg, sender) {
    setSurfSafe(msg.host, msg.action);
}

function emailReportMsgHandler(message) {
    if (PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED && (options === undefined || options.email === undefined)) {
        openOptionsMsgHandler('missing=true');
        pendingSignaling.push(message);
    } else {
        reportEmail(message);
    }
}

function openOptionsMsgHandler(query) {
    void 0;
    verifrom.extension.openOptions(query);
}

function PhishingStatsMsgHandler(message) {
    if (message.event === 'PHISHING_EMAIL_SIDEBAR') {
        sendPhishingStat(message);
    }
}


function ReminderSettingsMsgHandler(msg, sender) {
    verifrom.settings.get(PARAM.USER_SETTINGS.DEFAULT, function (items) {
        if (typeof msg.REMINDER !== 'undefined') {
            items.REMINDER = msg.REMINDER;
            items.REMINDER_FREQUENCY = msg.REMINDER_FREQUENCY;
            verifrom.settings.set(items, function () {
                void 0;
            });
        }
    });
}

function PARAMSMsgHandler(msg, sender, sendResponse) {
    void 0;
    if (sender && sender.tab && sender.tab.id)
        void 0;
    else void 0;
    switch (msg.action) {
        case 'getParam':
            if (!PARAM || typeof PARAM !== 'object')
            {
                void 0;
                PARAM = verifrom.dbStorage.get(verifrom.appInfo.extensionName + 'PARAMS');
            }
            void 0;
            if (!PARAM || typeof PARAM !== 'object') {
                void 0;
                if (sendResponse && verifrom.appInfo.quantum === true)
                    sendResponse({});
                else
                    verifrom.message.toTab(sender.tab.id, {}, {channel: "PARAMS"});
            } else {
                if ('function'===typeof sendResponse)
                    sendResponse(PARAM);
                else if (sender.tab && sender.tab.id)
                            verifrom.message.toTab(sender.tab.id, PARAM, {channel: "PARAMS"});
                     else verifrom.message.toAllTabs(PARAM, {channel: "PARAMS"});
            }
            break;
        case 'setParam':
            void 0;
            verifrom.dbStorage.set(verifrom.appInfo.extensionName + 'PARAMS', msg.PARAM);
            break;
    }
}



function falsePositiveReport(msg, sender) {
    if (msg) {
        void 0;
        msg.falsePositiveEmail = msg.phishingPageAlert!==true;
        try {
            $.ajax({
                url: PARAM.URL_FALSE_POSITIVE,
                contentType: "application/json",
                cache: false,
                method: 'POST',
                type: 'POST',
                processData: false,
                data: JSON.stringify(msg),
                timeout: 120000,
                beforeSend: function (request) {
                    request.setRequestHeader("Content-type", "application/json");
                    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    request.setRequestHeader('X-User-Agent', 'Plugin Navigateur - Version ' + verifrom.extension.name() + ' ' + verifrom.extension.version() + ' - Webmail ' + msg.webmail + ' - ' + window.navigator.userAgent + ' - ');
                },
                error: function (request, textStatus, errorThrown) {
                    void 0;
                },
                success: function (HTTPResponse, textStatus, request) {
                    void 0;
                }
            });
        } catch (err) {
            void 0;
        }
        if (msg.phishingHashes) {
            void 0;
            for (let i = 0; i < msg.phishingHashes.length; i++) {
                let hash = parseInt(msg.phishingHashes[i]);
                let ids = hashLinkArray.get(hash);
                verifrom.dbStorage.set(hash + '-falsePositive', {mutex: true}, verifrom.time.secondsFromNow(24 * 3600));
                if (ids.length>0)
                    for (let j = 0; j < ids.length; j++)
                        delete(hashLinkById[ids[j]]);
                hashLinkArray.delete(hash);
            }
            verifrom.dbStorage.set("phishingDB", JSON.stringify(hashLinkById));
        }
    } else {
        void 0;
    }
}

function phishingAlertMsgHandler(msg, sender) {
    switch (msg.action) {
        case 'getUrl':
            let phishingData=verifrom.dbStorage.get(msg.phishingId);
            if (!phishingData)
                return;
            let phishingUrl=phishingData.url;
            let urlSources=phishingData.sources;
            let sources=[];
            if (urlSources && urlSources.length>0)
                for (let i=0;i<urlSources.length;i++) {
                    let urlSource=urlSources[i];
                    if (PARAM.PARTNERS[urlSource] && PARAM.PARTNERS[urlSource].display===true)
                           sources.push(PARAM.PARTNERS[urlSource].logo);
                    else if (!PARAM.PARTNERS[urlSource] || PARAM.PARTNERS[urlSource].display!==false)
                        sources.push(PARAM.PARTNERS_ROOTURL.replace("__SOURCE__",urlSource.replace(PARAM.PARTNERS_PREFIX,"")));
                }

            verifrom.message.toTab(sender.tab.id,
                {
                    url:phishingUrl
                    ,sources:sources
                    ,PARAM:{
                        "PHISHING_ALERT_TIMEOUT":PARAM.PHISHING_ALERT_TIMEOUT,
                        "URL_FALSE_POSITIVE": PARAM.URL_FALSE_POSITIVE
                    }
                }
                ,{channel:'phishingalert'});
        break;
        case 'store':
            verifrom.dbStorage.set(msg.phishingId, msg.data, msg.data.DBtimeout);
        break;
        case 'remove':
            verifrom.dbStorage.remove(msg.phishingId);
        break;
    }

}

function notificationUpdateClick() {
    void 0;

    let lang = verifrom.locales.getMessage("language");

    verifrom.tabs.create({
             url: verifrom.appInfo.updateManifestURL[lang]
    },()=>{
        void 0;
    });
}

function notifyUpdate() {
    try {
        let lang = verifrom.locales.getMessage("language");

        if (!verifrom.appInfo.updateManifestURL || !verifrom.appInfo.updateManifestURL[lang])
            return;
        verifrom.request.get({
            url: verifrom.appInfo.updateManifestURL[lang],
            onSuccess: function (HTMLresponse, additionalInfo) {
                displayNotification({
                    id:extensionConfig.appInfo.extensionCodeName+"UPDATE",
                    title:extensionConfig.appInfo.extensionName,
                    message:verifrom.locales.getMessage("update.updated"),
                    onClicked:notificationUpdateClick
                });
            },
            onFailure: function (httpCode) { 
                void 0;
            },
            contentType: 'application/x-www-form-urlencoded',
            responseDataType: 'html'
        });
    } catch (e) {
        void 0;
    }
}


function compareversion(version1,version2){

    if (!version1 || !version2)
        return false;
    let result=false;

    if(typeof version1!=='object'){ version1=version1.toString().split('.'); }
    if(typeof version2!=='object'){ version2=version2.toString().split('.'); }

    for(let i=0;i<(Math.max(version1.length,version2.length));i++){
        if(typeof version1[i]==="string"){ version1[i]=parseInt(version1[i]); }
        if(typeof version2[i]==="string"){ version2[i]=parseInt(version2[i]); }

        if(Number(version1[i])<Number(version2[i])){
            result=true;
            break;
        }
        if(version1[i]!==version2[i]){
            break;
        }
    }
    return(result);
}

function checkUpdate() {
    let lang = verifrom.locales.getMessage("language");
    void 0;
    let lastExtensionVersion = verifrom.dbStorage.get(verifrom.appInfo.extensionName + '_Version');
    if (typeof lastExtensionVersion === 'object' && compareversion(lastExtensionVersion.version,verifrom.appInfo.version)) {
        if (verifrom.appInfo.updateManifestURL.display === true && verifrom.appInfo.updateManifestURL && verifrom.appInfo.updateManifestURL[lang].length > 0) {
            verifrom.dbStorage.set(`${verifrom.appInfo.extensionName}_Version`, {version: verifrom.appInfo.version});
            notifyUpdate();
        }
    } else if ((typeof lastExtensionVersion !== 'object' || typeof lastExtensionVersion.version !== 'string') && typeof verifrom.appInfo.installManifestURL === 'object' && verifrom.appInfo.installManifestURL.display === true && verifrom.appInfo.installManifestURL[lang].length > 0) {
        verifrom.tabs.create({url:verifrom.getURL(verifrom.appInfo.installManifestURL[lang])},function() {
            void 0;
        });
    }
    verifrom.dbStorage.set(`${verifrom.appInfo.extensionName}_Version`, {version: verifrom.appInfo.version});
}

function checkUpdateAvailable() {
    void 0;
    let lang = verifrom.locales.getMessage("language");

    if (typeof PARAM.LAST_VERSION === 'object' && typeof PARAM.LAST_VERSION.VERSION_NUMBER === 'string' && compareversion(verifrom.appInfo.version, PARAM.LAST_VERSION.VERSION_NUMBER)) {
        if (newVersionNotification < Date.now() - 1000 * 3600 * 24) {
            if (Object.keys(readyTabs) && Object.keys(readyTabs).length > 0) {
                verifrom.message.toAllTabs({
                    version: PARAM.LAST_VERSION.VERSION_NUMBER,
                    url: (PARAM.LAST_VERSION.UPDATE_MANIFEST && PARAM.LAST_VERSION.UPDATE_MANIFEST[lang] ? verifrom.getURL(PARAM.LAST_VERSION.UPDATE_MANIFEST[lang]) : null)
                }, {channel: "ExtensionUpdateAvailable"});
            }
        }
    }
}

function updateAvailableDisplayedHandler(msg) {
    newVersionNotification = Date.now();
}

function ReadyMsgHandler(msg, sender, sendResponse) {
    if (sender && sender.tab) {
        if (readyTabs[sender.tab.id] && readyTabs[sender.tab.id].time && msg.time < readyTabs[sender.tab.id].time) {
            void 0;
            return;
        }
        readyTabs[sender.tab.id] = {status: 'ready', host: verifrom.parseUrl(sender.tab.url).host, time: msg.time};
        if (!verifrom.appInfo.quantum) {
            let popup;
            if (options.userAuthentified === false && (PARAM.OPTIONS.STOPPHISHING_USERACCOUNT_REQUIRED_ENABLED === true || PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true))
                popup = {"tabId": sender.tab.id, "popup": "html/notAuthentified.html"};
            else popup = {"tabId": sender.tab.id, "popup": ""};
            verifrom.browserAction.setPopup(popup);
        }
    }
    if (clickedWhileInit) {
        clickedWhileInit = false;
        verifrom.message.toActiveTabs({
            action: "checkThisMail",
            oneClickOption: options.oneClickOption,
            privacy: options.minprivacy,
            notifications:options.notifications
        }, {channel: "Check"});
    }
    void 0;


    checkReminder(displayReminder);
}

function InitMsgHandler(msg, sender) {

    if (sender && sender.tab) {
        if (readyTabs[sender.tab.id] && readyTabs[sender.tab.id].time && msg.time < readyTabs[sender.tab.id].time) {
            void 0;
            return;
        }
        readyTabs[sender.tab.id] = {status: 'init', time: msg.time, host: verifrom.parseUrl(sender.tab.url).host};
        if (!verifrom.appInfo.quantum) {
            let popup;
            if (options.userAuthentified === false && (PARAM.OPTIONS.STOPPHISHING_USERACCOUNT_REQUIRED_ENABLED === true || PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true))
                popup = {"tabId": sender.tab.id, "popup": "html/notAuthentified.html"};
            else popup = {"tabId": sender.tab.id, "popup": "html/notReady.html"};
            verifrom.browserAction.setPopup(popup);
        }
    }
    void 0;
}

function UnavailableMsgHandler(msg, sender) {
    if (sender && sender.tab) {
        if (readyTabs[sender.tab.id] && readyTabs[sender.tab.id].time && msg.time < readyTabs[sender.tab.id].time) {
            void 0;
            return;
        }
        readyTabs[sender.tab.id] = {
            status: 'unavailable',
            time: msg.time,
            host: verifrom.parseUrl(sender.tab.url).host
        };
        if (!verifrom.appInfo.quantum) {
            let popup;
            if (options.userAuthentified === false && (PARAM.OPTIONS.STOPPHISHING_USERACCOUNT_REQUIRED_ENABLED === true || PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true))
                popup = {"tabId": sender.tab.id, "popup": "html/notAuthentified.html"};
            else popup = {"tabId": sender.tab.id, "popup": "html/notAvailable.html"};
            verifrom.browserAction.setPopup(popup);
        }
    }
    void 0;
}

function UnloadMsgHandler(msg, sender) {
    if (sender && sender.tab && sender.tab.id && sender.tab.url && readyTabs[sender.tab.id] && readyTabs[sender.tab.id].host === verifrom.parseUrl(sender.tab.url).host) {
        if (readyTabs[sender.tab.id] && readyTabs[sender.tab.id].time && msg.time < readyTabs[sender.tab.id].time) {
            void 0;
            return;
        }
        delete readyTabs[sender.tab.id];
        if (verifrom.appInfo.quantum)
            verifrom.browserAction.setPopup({"tabId": sender.tab.id, "popup": ""});
        else {
            const popup = {"tabId": sender.tab.id, "popup": "html/notListening.html"};
            verifrom.browserAction.setPopup(popup);
        }
    }
    void 0;
}

function clickOnActionButton(tab) {
    void 0;
    if (verifrom.appInfo.safari) {
        tab=tab.currentTarget.activeBrowserWindow.activeTab;
        tab.id=verifrom.message.setTabId(tab);
    }
    if ((!tab.url || /^about\:/i.test(tab.url) || /^chrome\:/i.test(tab.url)) && ((PARAM.OPTIONS.STOPPHISHING_BROWSING_ENABLED === true && PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true && options.userAuthentified === true) || (PARAM.OPTIONS.STOPPHISHING_BROWSING_ENABLED === false || PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === false)))
        return false;
    if (readyTabs[tab.id] && readyTabs[tab.id].host !== verifrom.parseUrl(tab.url).host) {
        void 0;
        delete readyTabs[tab.id];
        verifrom.browserAction.setPopup({"tabId": tab.id, "popup": ""});
    }
    switch (readyTabs[tab.id] ? readyTabs[tab.id].status : '') {
        case 'init':
            if (PARAM.OPTIONS.STOPPHISHING_BROWSING_ENABLED === true && PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true && options.userAuthentified !== true) {
                verifrom.browserAction.setPopup({"popup": "html/notAuthentified.html"});
            } else {
                let popup;
                if (options.userAuthentified === false && (PARAM.OPTIONS.STOPPHISHING_USERACCOUNT_REQUIRED_ENABLED === true || PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true))
                    popup = {"tabId": tab.id, "popup": "html/notAuthentified.html"};
                else popup = {"tabId": tab.id, "popup": "html/notReady.html"};
                verifrom.browserAction.setPopup(popup);

                void 0;
                clickedWhileInit = true;
            }
            if (verifrom.appInfo.quantum || verifrom.appInfo.safari) {
                verifrom.browserAction.openPopup();
                verifrom.browserAction.setPopup({"tabId": tab.id, "popup": ""});
            }
            break;
        case 'ready':
            if (PARAM.OPTIONS.STOPPHISHING_BROWSING_ENABLED === true && PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true && options.userAuthentified !== true) {
                verifrom.browserAction.setPopup({"popup": "html/notAuthentified.html"});
                if (verifrom.appInfo.quantum || verifrom.appInfo.safari) {
                    verifrom.browserAction.openPopup();
                    verifrom.browserAction.setPopup({"tabId": tab.id, "popup": ""});
                }
            } else {
                void 0;
                verifrom.message.toActiveTabs({
                    action: "checkThisMail",
                    oneClickOption: options.oneClickOption,
                    privacy: options.minprivacy,
                    notifications:options.notifications
                }, {channel: "Check"});
            }
            break;
        case 'unavailable':

            if (PARAM.OPTIONS.STOPPHISHING_BROWSING_ENABLED === true && PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true && options.userAuthentified !== true) {
                verifrom.browserAction.setPopup({"popup": "html/notAuthentified.html"});
            } else {
                let popup;
                if (options.userAuthentified === false && (PARAM.OPTIONS.STOPPHISHING_USERACCOUNT_REQUIRED_ENABLED === true || PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true))
                    popup = {"tabId": tab.id, "popup": "html/notAuthentified.html"};
                else popup = {"tabId": tab.id, "popup": "html/notAvailable.html"};
                verifrom.browserAction.setPopup(popup);

                void 0;
            }
            if (verifrom.appInfo.quantum || verifrom.appInfo.safari) {
                verifrom.browserAction.openPopup();
                verifrom.browserAction.setPopup({"tabId": tab.id, "popup": ""});
            }
            break;
        case 'unload':
            void 0;
        default:
            void 0;
            if (PARAM.OPTIONS.STOPPHISHING_BROWSING_ENABLED === true && ((options.userAuthentified === true && PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true) || PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === false)) {
                verifrom.browserAction.setPopup({"tabId": tab.id, "popup": "html/reportphishing.html"});
            }
            else if (PARAM.OPTIONS.STOPPHISHING_BROWSING_ENABLED === true && PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true && options.userAuthentified !== true) {
                verifrom.browserAction.setPopup({"tabId": tab.id, "popup": "html/notAuthentified.html"});
            } else verifrom.browserAction.setPopup({"tabId": tab.id, "popup": "html/notListening.html"});
            if (verifrom.appInfo.quantum || verifrom.appInfo.safari) {
                verifrom.browserAction.openPopup();
                verifrom.browserAction.setPopup({"tabId": tab.id, "popup": ""});
            }
            break;
    }
}

function displayNotification(msg) {
    verifrom.notifications.display(msg);
}

function loadResource(paramObject, sender, response) {
        $.ajax({url:paramObject.url, context: paramObject.context,
            success: content => {
                verifrom.message.toTab(sender.tab.id,content,{channel:paramObject.url});
            },
            error: httpCode => {
                throw `loadResource - error ${httpCode}`;
            },
            contentType:paramObject.contentType,
            type:"get",
            dataType:paramObject.responseDataType,
            crossDomain:true,
            headers:paramObject.additionalRequestHeaders ?  paramObject.additionalRequestHeaders : {}
        });
}

function executeCorsRequest(paramObject, sender, response) {
    let queue = new verifrom.request.Queue();
    paramObject.requests = JSON.parse(paramObject.requests);
    for (let i=0;i<paramObject.requests.length;i++) {
        if (chrome.runtime.id===sender.id)
            queue.addRequest(paramObject.requests[i]);
    }
    queue.done(function (queueArray) {
        if (queue.nbError>0 && queue.nbSuccess===0) {
            verifrom.message.toTab(sender.tab.id, {allRequestsOnError:true} , {channel: "corsRequestResult" + paramObject.id});
            return;
        }
        for (let i = 0; i < queueArray.length; i++) {
            try {
                let requestResponse = queueArray[i];
                let requestResponseString = JSON.stringify(requestResponse);
                let parts = verifrom.chunkString(requestResponseString,3000000);
                for (let j=0;j<parts.length;j++)
                    verifrom.message.toTab(sender.tab.id, {reqNumber:i,parts: parts.length, part:j, data:parts[j]} , {channel: "corsRequestResult" + paramObject.id});
            } catch(e) {
                void 0;
                verifrom.message.toTab(sender.tab.id, {reqNumber:i,parts: 1, part:0, data:""} , {channel: "corsRequestResult" + paramObject.id});
            }
        }
    },true);
}

function setMessageListeners() {
    void 0;
    verifrom.message.addListener({channel: "Init"}, InitMsgHandler);
    verifrom.message.addListener({channel: "Ready"}, ReadyMsgHandler);
    verifrom.message.addListener({channel: "Unavailable"}, UnavailableMsgHandler);
    verifrom.message.addListener({channel: "notification"}, displayNotification);
    verifrom.message.addListener({channel: "surfstat"}, surfstatMsgHandler);
    verifrom.message.addListener({channel: "signalPhishing"}, emailReportMsgHandler);
    verifrom.message.addListener({channel: "openOptions"}, openOptionsMsgHandler);
    verifrom.message.addListener({channel: "PhishingStats"}, PhishingStatsMsgHandler);
    verifrom.message.addListener({channel: "ReportException"}, ExceptionReportHandler);
    verifrom.message.addListener({channel: "ReminderSettings"}, ReminderSettingsMsgHandler);
    verifrom.message.addListener({channel: "PARAMS"}, PARAMSMsgHandler);
    verifrom.message.addListener({channel: "reportURL"}, reportURLMsgHandler);
    verifrom.message.addListener({channel: "Unload"}, UnloadMsgHandler);
    verifrom.message.addListener({channel: "FalsePositive"}, falsePositiveReport);
    verifrom.message.addListener({channel: "verifyHashURLs"}, checkHashHandler);
    verifrom.message.addListener({channel: "updateAvailableDisplayed"}, updateAvailableDisplayedHandler);
    verifrom.message.addListener({channel: "settings"}, settingsMessageHandler);
    verifrom.message.addListener({channel: 'phishingalert'}, phishingAlertMsgHandler);
    verifrom.message.addListener({channel: 'loaduri'}, loadResource);
    verifrom.message.addListener({channel:"corsRequest"}, executeCorsRequest);
    if ("function"===typeof reportsTabsHandler)
        verifrom.message.addListener({channel: 'reportsTab'}, reportsTabsHandler);
    if ("function"===typeof deleteReports)
        verifrom.message.addListener({channel: 'deleteReports'}, deleteReports);
    if ("function"===typeof resetBadge)
        verifrom.message.addListener({channel: 'resetBadge'}, resetBadge);
    verifrom.tabs.reload(PARAM.WEBMAILS_URL_PATTERNS);
}

function settingsMessageHandler(msg, sender) {
    void 0;

    switch (msg.action)
    {
        case 'savesettings' :
            delete msg.action;
            optionsUpdate(msg);
            break;
        case 'getsettings':
            verifrom.settings.get(PARAM.USER_SETTINGS.DEFAULT, optionsCopy => {
                optionsCopy.action="setsettings";
                void 0;
                verifrom.message.toTab(sender.tab.id, optionsCopy, {channel: "settings"});
            });
            break;
    }
}

function alertUserOnCredentials(display) {
    if (display===true){
        browser.browserAction.setBadgeText({text:"!"});
        browser.browserAction.setBadgeBackgroundColor({color:"red"})
    } else {
        browser.browserAction.setBadgeText({text:""})
    }
}

function checkUserCredentials(userOKCallback, userNotOKCallback) {
    void 0;
    if (PARAM.OPTIONS.STOPPHISHING_USERACCOUNT_REQUIRED_ENABLED !== true) {
        userOKCallback();
        return;
    }
    if (!options.email || !options.password || options.email.length===0 || options.password.length===0)
    {
        void 0;
        if (typeof userNotOKCallback === 'function')
            userNotOKCallback();
        return;
    }

    try {
        void 0;
        if (verifrom.appInfo.safari) {
            let xmlhttp=new XMLHttpRequest;
            xmlhttp.withCredentials=true;
            xmlhttp.open("OPTIONS",PARAM.REPORT_API.SCHEME+PARAM.REPORT_API.HOSTNAME+PARAM.REPORT_API.PATHNAME,true,options.email,passwordDecrypt(options.password));
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xmlhttp.setRequestHeader('X-User-Agent','Plugin Navigateur - Version '+verifrom.extension.name()+' '+verifrom.extension.version()+' - '+window.navigator.userAgent+' - User Setup');
            xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState===4)
                {
                    if (xmlhttp.status>=200 && xmlhttp.status<300)
                    {
                        void 0;
                        options.userAuthentified = true;
                        if (typeof userOKCallback === 'function')
                            userOKCallback();
                    }
                    else
                    {
                        void 0;
                        options.userAuthentified = false;
                        void 0;
                        if (typeof userNotOKCallback === 'function')
                            userNotOKCallback();
                    }
                }
            };
            xmlhttp.send(null);
        }
        else {
            $.ajax({
                url: PARAM.REPORT_API.SCHEME + PARAM.REPORT_API.HOSTNAME + PARAM.REPORT_API.PATHNAME,
                contentType: "application/x-www-form-urlencoded",
                cache: false,
                method: 'OPTIONS',
                type: 'OPTIONS',
                processData: false,
                data: "",
                timeout: 120000,
                username:options.email,
                password:atob(options.password),
                crossDomain:true,
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "Authorization": `Basic ${passwordEncrypt(options.email + ':' + passwordDecrypt(options.password))}`
                },
                beforeSend: request => {
                    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    request.setRequestHeader('X-User-Agent', 'Plugin Navigateur - Version ' + verifrom.extension.name() + ' ' + verifrom.extension.version() + ' - Webmail none - ' + window.navigator.userAgent + ' - ');
                },
                statusCode: {
                    401: () => {
                        options.userAuthentified = false;
                        void 0;
                        if (typeof userNotOKCallback === 'function')
                            userNotOKCallback();
                    }
                },
                error: (request, textStatus, errorThrown) => {
                    if (request.status === 401) {
                        options.userAuthentified = false;
                        void 0;
                        if (typeof userNotOKCallback === 'function')
                            userNotOKCallback();
                    } else if (request.status === 200) {
                        options.userAuthentified = true;
                        if (typeof userOKCallback === 'function')
                            userOKCallback();
                    }
                    else {
                        options.userAuthentified = true;
                        void 0;
                        if (typeof userOKCallback === 'function')
                            userOKCallback();
                    }
                },
                success: (HTTPResponse, textStatus, request) => {
                    options.userAuthentified = true;
                    if (typeof userOKCallback === 'function')
                        userOKCallback();
                }
            });
        }
    } catch (err) {
        void 0;
        options.userAuthentified = false;
        void 0;
        if (typeof userNotOKCallback === 'function')
            userNotOKCallback();
    }
}

function refreshParams() {
    return new Promise((resolve,reject)=> {
        loadParams(
            function () {
                checkUpdateAvailable();
                verifrom.message.toAllTabs(PARAM, {channel: "PARAMS"});
                resolve();
            },
            function (err) {
                void 0;
                resolve(err);
            }
        );
    });
}

function startExtension() {
    void 0;
    verifrom.tabs.close({active: false, currentWindow: false, url: /safari-extension:\/\/com.verifrom.*/i});

    verifrom.browserAction.setTitle({"title": verifrom.locales.getMessage("actionButton")});

    loadParams(
        function () {

            if (verifrom.appInfo.edge===true && getExtensionProtocol()==="ms-browser-extension://") {
                verifrom.notifications.enabled=false;
                try {
                    let EDGEVersion=parseFloat(navigator.userAgent.replace(/.*Edge\/(.*)$/i));
                    if (PARAM && PARAM.EDGE.NOTIFICATIONS) {
                        for (let i=0;i<PARAM.EDGE.NOTIFICATIONS.length;i++) {
                            if (PARAM.EDGE.NOTIFICATIONS[i].v>EDGEVersion)
                                verifrom.notifications.enabled=PARAM.EDGE.NOTIFICATIONS[i].s;
                        }
                    }
                } catch(e) {
                    void 0;
                    verifrom.notifications.enabled=false;
                }
            }

            setChromeExtensionEventListeners();
            restoreOptions(false, function () {
                checkUserCredentials(
                    function () {
                        loadDBRecords();
                        setMessageListeners();
                        setEventListeners();
                        alertUserOnCredentials(false);
                    },
                    function () {
                        if (PARAM.OPTIONS.STOPPHISHING_USERACCOUNT_REQUIRED_ENABLED !== true)
                            loadDBRecords();
                        setMessageListeners();
                        setEventListeners();
                        alertUserOnCredentials(true);
                    }
                );
            });
            checkUpdate();
            checkUpdateAvailable();
            verifrom.settings.get(
                PARAM.USER_SETTINGS.DEFAULT,
                function (items) {
                    items.firstTime = false;
                    verifrom.settings.set(items, function () {
                    });
                }
            );
            if ("function"===typeof openReportsDB)
            openReportsDB();
        },
        function () {
            if (!PARAM || typeof PARAM !== 'object') {
                void 0;
                displayNotification(verifrom.locales.getMessage("critical.noparams"));
            } else {
                void 0;

                setChromeExtensionEventListeners();
                restoreOptions(false, function () {
                    checkUserCredentials(
                        function () {
                            loadDBRecords();
                            setEventListeners();
                            setMessageListeners();
                            alertUserOnCredentials(false);
                        },
                        function () {
                            if (PARAM.OPTIONS.STOPPHISHING_USERACCOUNT_REQUIRED_ENABLED !== true)
                                loadDBRecords();
                            setEventListeners();
                            setMessageListeners();
                            alertUserOnCredentials(true);
                        }
                    );
                });
                checkUpdate();
                checkUpdateAvailable();
                verifrom.settings.get(
                    PARAM.USER_SETTINGS.DEFAULT,
                    function (items) {
                        items.firstTime = false;
                        verifrom.settings.set(items, function () {
                        });
                    }
                );
                if ("function"===typeof openReportsDB)
                   openReportsDB();
            }
        });

    verifrom.settings.onChanged.addListener(optionsUpdate);
    setInterval(refreshParams, 3600000);
}


function base64Encode(str) {
    let charBase64 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];

    let out = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    let len = str.length;

    do {
        chr1 = str.charCodeAt(i++);
        chr2 = str.charCodeAt(i++);
        chr3 = str.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 0x03) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 0x0F) << 2) | (chr3 >> 6);
        enc4 = chr3 & 0x3F;

        out += charBase64[enc1] + charBase64[enc2];
        if (out.length % 79 === 78)
            out += '\n';
        if (isNaN(chr2)) {
            out += '==';
        } else if (isNaN(chr3)) {
            out += charBase64[enc3] + '=';
        } else {
            out += charBase64[enc3] + charBase64[enc4];
        }
        if (out.length % 79 === 78)
            out += '\n';
    } while (i < len);
    return out;
}

function encode(stringToEncode) {
    let result = "";
    let s = stringToEncode.replace(/\r\n/g, "\n");
    for (let index = 0; index < s.length; index++) {
        let c = s.charCodeAt(index);

        if(c < 128) {
            result += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            result += String.fromCharCode((c >> 6) | 192);
            result += String.fromCharCode((c & 63) | 128);
        }
        else {
            result += String.fromCharCode((c >> 12) | 224);
            result += String.fromCharCode(((c >> 6) & 63) | 128);
            result += String.fromCharCode((c & 63) | 128);
        }
    }
    return result;
}

function decode(string) {
    let result = "";
    let index = 0;
    let c = 0;
    let c1 = 0;
    let c2 = 0;
    let c3 = 0;

    while(index < string.length) {
        c = string.charCodeAt(index);

        if(c < 128) {
            result += String.fromCharCode(c);
            index++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = string.charCodeAt(index + 1);
            result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            index += 2;
        }
        else {
            c2 = string.charCodeAt(index + 1);
            c3 = string.charCodeAt(index + 2);
            result += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            index += 3;
        }
    }
    return result;
}

function passwordEncrypt(string) {
    return btoa(encode(string));
}

function passwordDecrypt(string){
    return decode(atob(string));
}

function optionsUpdate(newSettings) {
    let userWasAuthentified = options ? options.userAuthentified : false;
    if (verifrom.appInfo.safari!==true) {
        let _newSettings={};
        let settingKeys=Object.keys(newSettings);
        for (let i=0;i<settingKeys.length;i++) {
            if (typeof newSettings[settingKeys[i]].newValue!=='undefined')
                _newSettings[settingKeys[i]]=newSettings[settingKeys[i]].newValue;
        }
        newSettings=_newSettings;
    }

    verifrom.settings.get(PARAM.USER_SETTINGS.DEFAULT,
        function (currentSettings) {
            void 0;
            let items=verifrom.merge(PARAM.USER_SETTINGS.DEFAULT,currentSettings,newSettings);

            let settingKeys=Object.keys(PARAM.USER_SETTINGS.DEFAULT);
            let settingsChanged=false;
            for (let i=0;i<settingKeys.length;i++) {
                let settingKey=settingKeys[i];
                if (typeof newSettings[settingKey] !== 'undefined' && options[settingKey] !== newSettings[settingKey]) {
                    options[settingKey] = items[settingKey];
                    settingsChanged=true;
                    void 0;
                }
            }

            if (settingsChanged)
                verifrom.settings.set(items,function(items) {
                    if (!userWasAuthentified && options.userAuthentified === true) {
                        options.userAuthentified = true;
                        loadDBRecords();
                        setEventListeners();
                        setMessageListeners();
                        alertUserOnCredentials(false);
                    }

                    if (PARAM.OPTIONS.REPORT_USERACCOUNT_REQUIRED_ENABLED === true && options.userAuthentified === true && pendingSignaling.length > 0) {
                        void 0;
                        while (pendingSignaling.length > 0) {
                            reportEmail(pendingSignaling.shift());
                        }
                    }
                });
        }
    );
}


try {
    verifrom.dbStorage.init().then(()=>{
        startExtension();
    }).catch(reason=>{
        void 0;
        startExtension();
    })
} catch(e) {
    void 0;
    ExceptionReportHandler(e);
}


