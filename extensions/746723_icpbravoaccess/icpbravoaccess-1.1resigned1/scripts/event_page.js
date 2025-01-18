/*
* =============================================================================
* VERSION EXT   | VERSION CLIENT    |VERSION APP 
* ------------------------------------------------------------------
*               | 0.1               |0.1
*               | 0.1               |0.2
*               | 0.3               |0.3
*               | 0.4               |0.4 
* 0.5           | 0.5               |0.5 
* 0.6           | 0.5               |0.6 
* 0.7           | 0.5               |0.7 
* 0.8           | 0.5               |0.7
* 0.9           | 0.5               |0.7
* ==============================================================================
*/

// Native Messaging
var portNMName = "com.scytl.icpbravoaccess";
// Message Parsing
var portMPName = 'com.scytl.icpbravoaccess.MP';
// Authorization Conn
var authMPName = 'com.scytl.icpbravoaccess.auth'

var lowestAppVersion = "0.7";
var lowestClientVersion = "0.5";

/*
 * Request and Response Body
 * 
 * request = {
 *      commnand,   // String
 *      requestId, // String
 *      content,  // String (JSON)
 *      license, // String
 *      domain  // String
 * } 
 * 
 * response = {
 *      requestId,        // String
 *      statusCode,      // int
 *      statusMessage,  // String 
 *      content,       // String (JSON)
 * } 
 * 
 */

// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Add your Analytics tracking ID here.
*/
var _AnalyticsCode = 'UA-73647068-1';

/**
* Below is a modified version of the Google Analytics asynchronous tracking
* code snippet.  It has been modified to pull the HTTPS version of ga.js
	 * instead of the default HTTP version.  It is recommended that you use this
	 * snippet instead of the standard tracking snippet provided when setting up
	 * a Google Analytics account.
	 */

//let request = new XMLHttpRequest();
//let message =
//  "v=1&tid=" + _AnalyticsCode + "&cid= " + 555 + "&aip=1" +
//  "&ds=add-on&t=event&ec=AAA&ea=" + aType;

//request.open("POST", "https://www.google-analytics.com/collect", true);
//request.send(message);

//var _gaq = _gaq || [];
//_gaq.push(['_setAccount', _AnalyticsCode]);
//_gaq.push(['_trackPageview']);

//(function () {
//    var ga = document.createElement('script');
//    ga.type = 'text/javascript';
//    ga.async = true;
//    ga.src = 'https://ssl.google-analytics.com/ga.js';
//    var s = document.getElementsByTagName('script')[0];
//    s.parentNode.insertBefore(ga, s);
//})();

/* ====================================================================================================
 * Start Long-lived connections (LLC) Handle
 */

//avaliable commands\
var commands = {
    sign: "sign",
    remove: "remove",
    certificate: "certificate",
    certificates: "certificates",
    check: "check",
    authorize: "authorize",
    encrypt: "encrypt",
    decrypt: "decrypt"
}

//avaliable response status codes
var statusCode = {
    error: 0,
    success: 1
}

function onRequestMessageMP(request, conn) {
    //var id = tab.id;
    //_gaq.push(['_trackEvent', request.domain, request.command]);

    switch (request.command) {
        case commands.certificates:
            certificates(request, conn);
            break;
        case commands.certificate:
            certificate(request, conn);
            break;
        case commands.sign:
            sign(request, conn);
            break;
        case commands.check:
            check(request, conn);
            break;
        case commands.remove:
            remove(request, conn);
            break;
        case commands.encrypt:
            encrypt(request, conn);
            break;
        case commands.decrypt:
            decrypt(request, conn);
            break;
        default:
            break;
    }
}

//init method
function onLoad() {

    chrome.runtime.onConnect.addListener(function (port) {
        console.assert(port.name == portMPName);

        //var portMP = registerMPPort(port);
        var conn = {
            portMP: port,
            portNM: null,
            isNMConnected: false,
            isMPConnected: true,
            connectionUuid: "",
            uuid: generateSecureIdentifier()
        }

        conn.portMP.onMessage.addListener(function (request) {
            onRequestMessageMP(request, conn);
        });
        conn.portMP.onDisconnect.addListener(function () {
            onDisconnectMP(conn);
        });

        log("MessageParsing connected : " + conn.uuid)
        //try to connect to NM app
        try {
            connectToNM(conn);
        } catch (ex) {
            log(ex);
            //error on connect to native app 
        }

    });
}

//receive a port
function onDisconnectMP(conn) {
    log("MessageParsing disconnected : " + conn.uuid)

    conn.isMPConnected = false;
    conn.isNMConnected = false;
    conn.portNM.disconnect();

};

//send response to MP Port
function onResponseMP(response, conn) {
    conn.portMP.postMessage(response);
}

/* 
 * END Long-lived connections (LLC) Handle
 * ====================================================================================================
*/


/* ====================================================================================================
 * Start Native Handle
*/

function certificates(request, conn) {
    onSendNM(request, conn);
}

function certificate(request, conn) {
    onSendNM(request, conn);
}

function encrypt(request, conn) {
    onSendNM(request, conn);
}

function decrypt(request, conn) {
    onSendNM(request, conn);
}

function sign(request, conn) {
    var content = JSON.parse(request.content);
    signAuthorized(request, conn);

    //to review
    //chrome.storage.sync.get(null, function (result) {

    //    list = result[content.thumbprint];
    //    if (list) {
    //        var index = list.indexOf(request.domain);
    //        if (index > -1) {
    //            signAuthorized(request, conn);
    //        } else {
    //            preAuthorize(request, conn);
    //        }
    //    } else {
    //        preAuthorize(request, conn);;
    //    }
    //});
}

//* request = {
//*      commnand,   // String
//*      requestId, // String
//*      content,  // String (JSON)
//*      license, // String
//*      domain  // String
//* } 
function preAuthorize(request, conn) {

    internalRequest = {
        command: commands.certificates,
        requestId: generateSecureIdentifier(),
        content: JSON.stringify(null),
        license: request.license,
        domain: request.domain
    }

    onSendNM(internalRequest, conn, signUnauthorized, request);
}

function signAuthorized(request, conn) {
    onSendNM(request, conn);
}

function signUnauthorized(requestPoolItem, request, conn) {

    var certObj = JSON.parse(request.content);
    var decodedContent = JSON.parse(requestPoolItem.subRequest.content);

    var selectedCert = {};
    for (var i = 0; i < certObj.certificates.length; i++) {
        if (certObj.certificates[i].thumbprint === decodedContent.thumbprint) {
            selectedCert = certObj.certificates[i];
            break;
        }
    }

    chrome.tabs.create({
        url: chrome.extension.getURL('views/confirm_domain.html'),
        active: false
    }, function (tab) {
        chrome.windows.getCurrent(function (win) {

            var currentWidth = 0;
            var currentHeight = 0;
            var width = 500;
            var height = 240;

            currentWidth = win.left / 2;
            currentHeight = win.top / 2;

            var left = (screen.width / 2) - (width / 2);
            var top = (screen.height / 2) - (height / 2);

            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true,
                width: width,
                height: height,
                left: left,
                top: top
            }, function (window) {
                chrome.tabs.sendMessage(tab.id, {
                    message: {
                        thumbprint: decodedContent.thumbprint,
                        subjectName: selectedCert.subjectName,
                        issuerName: selectedCert.issuerName,
                        domain: requestPoolItem.subRequest.domain
                    },
                });

                authorizationItem = {
                    request: requestPoolItem.subRequest,
                    subjectName: selectedCert.subjectName,
                    conn: conn
                };

                authorizationPool[decodedContent.thumbprint] = authorizationItem;
            });
        });
    });
}

var authorizationPool = {};


//* response = {
//*      requestId,        // String
//*      statusCode,      // int
//*      statusMessage,  // String 
//*      content,       // String (JSON)
//* } 
function checkAuthorization(message) {

    var authorizationItem = authorizationPool[message.thumbprint];

    if (authorizationItem === null) {
        //erro
    } else {
        delete authorizationPool[message.thumbprint];
    }

    var request = authorizationItem.request;
    var conn = authorizationItem.conn;

    var messageContent = JSON.parse(request.content);

    if (message.isAuthorized) {
        addDomain(request.domain, messageContent.thumbprint);
        signAuthorized(request, conn);
    } else {
        var response = {
            requestId: request.requestId,
            statusCode: statusCode.error,
            statusMessage: 'Acesso ao certificado ' + authorizationItem.subjectName + ' não autorizado para o domínio "' + request.domain + '"'
        }

        onResponseMP(response, conn);
    }
}

function addDomain(domain, thumbprint) {
    chrome.storage.sync.get(thumbprint, function (result) {
        var list;
        list = result[thumbprint];
        if (!list) {
            list = new Array();
        }

        list.push(domain);
        var obj = new Object();
        obj[thumbprint] = list;
        chrome.storage.sync.set(obj);
    });
}

function check(request, conn) {
    conn.connectionUuid = request.requestId;
    onSendNM(request, conn, checkApplication);
}

function remove(request, conn) {
    onSendNM(request, conn);
}

var appStatus = {
    BROWSER_NOT_SUPPORTED: 0,
    EXTENSION_NOT_INSTALLED: 1,
    NATIVE_NOT_INSTALLED: 2,
    NATIVE_OUTDATED: 3,
    JS_OUTDATED: 4,
    INSTALLED: 5
}

function checkApplication(requestItem, message, conn) {
    var messageContent = {};

    if (message.statusCode == statusCode.success) {

        messageContent = JSON.parse(message.content);

        var appUpdated = validateAppVersion(messageContent.appVersion);

        requestContent = JSON.parse(requestItem.request.content);
        var jsUpdated = validateClientVersion(requestContent.jsClientVersion);

        if (!appUpdated) {
            messageContent.instalationStatus = appStatus.NATIVE_OUTDATED;
        } else if (!jsUpdated) {
            messageContent.instalationStatus = appStatus.JS_OUTDATED;
        } else {
            messageContent.instalationStatus = appStatus.INSTALLED;
        }

        //_gaq.push(['_trackEvent', requestItem.request.domain, "JS: " + requestContent.jsClientVersion]);
        //_gaq.push(['_trackEvent', "NATIVE", messageContent.appVersion]);

        message.content = JSON.stringify(messageContent);
    }

    onResponseMP(message, conn);
}

function connectToNM(conn) {

    conn.portNM = chrome.runtime.connectNative(portNMName);

    conn.portNM.onMessage.addListener(function (request) {
        onReceiveNM(request, conn);
    });
    conn.portNM.onDisconnect.addListener(function () {
        onNativeDisconnect(conn);
    });

    conn.isNMConnected = true;
    log("NM connected : " + conn.uuid);
}

function onNativeDisconnect(conn) {
    conn.isNMConnected = false;

    var browserInformation = browserInfo();
    var browser = "0";

    if (browserInformation.indexOf("Chrome") >= 0) {
        browser = "2"
    } else if (browserInformation.indexOf("Firefox") >= 0) {
        browser = "3"
    } else if (browserInformation.indexOf("IE") >= 0) {
        browser = "1";
    }

    if (conn.isMPConnected) {
        setTimeout(function () {

            var message = {
                instalationStatus: appStatus.NATIVE_NOT_INSTALLED,
                requestId: conn.connectionUuid,
                statusCode: 0,
                statusMessage: "App does not respond",
                browser: browser
            }

            conn.connectionUuid = "";
            onResponseMP(message, conn);
        }, 1000);
    }

    log("NM disconnected : " + conn.uuid + " / " + chrome.runtime.lastError.message);
}

/*
* http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
* uuid format :  xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
* ex          : (227211e5-57e0-072c-3515-8eff3a2c2e3f)
*/
function generateSecureIdentifier() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var requestPool = {};

function browserInfo() {
    var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}

//Send message to native
function onSendNM(request, conn, internalCB, subRequest) {
    try {
        if (!conn.isNMConnected) {
            connectToNM(conn);
        }
    } catch (ex) {
        log(ex);
    }

    var uuid = generateSecureIdentifier();

    //create pool item request 
    var requestPoolItem = {
        callback: internalCB,
        requestTime: new Date(),
        request: request,
        subRequest: subRequest
    };

    requestPool[uuid] = requestPoolItem;
    request.internalId = uuid;

    try {
        conn.portNM.postMessage(request);
    } catch (ex) {
        log(ex)
    }
}

//receive message from native
function onReceiveNM(message, conn) {

    var requestPoolItem = requestPool[message.internalId];

    if (!requestPoolItem) {
        log("error invalid request id ----!")
    } else {
        log("Response internal uuid: " + message.internalId);

        delete requestPool[message.internalId];

        if (requestPoolItem.callback) {
            requestPoolItem.callback(requestPoolItem, message, conn);
        } else {
            onResponseMP(message, conn);
        }
    }
}

/* 
 * END Native actions Handle
 * ====================================================================================================
*/

/* ====================================================================================================
 * Start Util
*/

/*return true if version is higher than or equal to lowest version*/
function validateAppVersion(AppVersion) {
    return (cmpVersion(AppVersion, lowestAppVersion) >= 0);
}

/*return true if version is higher than or equal to lowest version*/
function validateClientVersion(clientVersion) {
    return (cmpVersion(clientVersion, lowestClientVersion) >= 0);
}

/*return true if version is higher than or equal to lowest version*/
function validateVersion(version, lowestVersion) {
    return (cmpVersion(version, lowestVersion) >= 0);
}

/*return 0 if a = b; return positive if a > b; return negative if a < b*/
function cmpVersion(a, b) {
    var i, cmp, len, re = /(\.0)+[^\.]*$/;
    a = (a + '').replace(re, '').split('.');
    b = (b + '').replace(re, '').split('.');
    len = Math.min(a.length, b.length);
    for (i = 0; i < len; i++) {
        cmp = parseInt(a[i], 10) - parseInt(b[i], 10);
        if (cmp !== 0) {
            return cmp;
        }
    }
    return a.length - b.length;
}


function log(message) {
    console.log(message);
}
/* 
 * END Native actions Handle
 * ====================================================================================================
*/

//Init Extension
onLoad();
