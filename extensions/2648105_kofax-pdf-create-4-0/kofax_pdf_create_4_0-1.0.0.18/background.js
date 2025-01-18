
// ---------- globals define
var web2pdfAction = { CONVERT: 0, APPEND: 1, EMAIL: 2, DMS: 4 };
var web2pdfContext = { PAGE: 0, LINK: 1 };
var web2pdfStatus = { STATUS_INITOLD: -3, STATUS_INIT: -2, STATUS_NONE: -1, STATUS_FAILED: 0, STATUS_SUCCESS: 1 };

// ---------- native message

var NativeMessagingClass = function() {

    var m_nativeHostPort = null;
    var m_nativeHostName = "com.kofax.html2pdf";
    var m_nativeHostNameOld = "com.nuance.html2pdf";
    var m_dmsAvailable = false;
    var m_status = web2pdfStatus.STATUS_NONE;
    var m_useOldNativeHost = false;

    var m_funcIsDMSAvailable = "IsDMSAvailable";
    var m_funcShowSettingDialog = "ShowSettingDialog";
    var m_funcConvertToPDF = "ConvertToPDF";

    function getBrowserInfo() {
        if (chrome.runtime.getManifest()["applications"] != undefined) {
            return "firefox";
        }
        return "chrome";
    }

    function onNativeMessage(message) {
        m_status = message.result;
        if (message.type == m_funcIsDMSAvailable) {
            m_dmsAvailable = (m_status == web2pdfStatus.STATUS_SUCCESS);
        }
    }

    function onDisconnected() {
        m_nativeHostPort = null;
        if (m_status == web2pdfStatus.STATUS_INIT) {
            m_useOldNativeHost = true;
            init();
        } else if (m_status == web2pdfStatus.STATUS_INITOLD) {
            m_useOldNativeHost = false;
        } else if (m_status == web2pdfStatus.STATUS_NONE) {
        	  var redirect = confirm(chrome.i18n.getMessage("web2pdfConversionNotInstalled"));
            if (redirect) {
                chrome.tabs.create({ "url": chrome.i18n.getMessage("web2pdfHomePage") });
            }
        }
    }

    function connectHost() {
        try {
        	  if (m_useOldNativeHost) {
        	  	  m_nativeHostPort = chrome.runtime.connectNative(m_nativeHostNameOld);
        	  } else {
        	  	  m_nativeHostPort = chrome.runtime.connectNative(m_nativeHostName);
        	  }
            m_nativeHostPort.onMessage.addListener(onNativeMessage);
            m_nativeHostPort.onDisconnect.addListener(onDisconnected);
        } catch (err) {
            alert(err);
        }
    }

    function sendToNative(message) {
    	  if (m_nativeHostPort == null) {
    	  	  connectHost();
    	  }
    	  m_nativeHostPort.postMessage(message);
    }

    function init() {
        // load dms state
        m_status = web2pdfStatus.STATUS_INIT;
        if (m_useOldNativeHost) {
            m_status = web2pdfStatus.STATUS_INITOLD;
        }
        sendToNative({ type: "IsDMSAvailable" });
    }

    function showSettingDialog() {
        m_status = web2pdfStatus.STATUS_NONE;
        sendToNative({ type: "ShowSettingDialog", browser: getBrowserInfo() });
    }

    function convertToPDF(domUrl, domTitle, domData, domCookie, userAction) {
        m_status = web2pdfStatus.STATUS_NONE;
        sendToNative({ type: "ConvertToPDF", action: userAction, url: domUrl, title: domTitle, dom: domData, cookie: domCookie, browser: getBrowserInfo() });
    }

    function isDMSAvailable() {
        return m_dmsAvailable;
    }

    return {
        init: init,
        showSettingDialog: showSettingDialog,
        convertToPDF: convertToPDF,
        isDMSAvailable: isDMSAvailable
    }
};

var plugin = new NativeMessagingClass();

// ---------- web2pdf functions

function web2pdf_alert(msg) {
    alert(msg);
}

function web2pdf_init() {
    try {
        plugin.init();
    } catch (err) {
        web2pdf_alert(err);
    }
}

function web2pdf_showSettingsDialog() {
    try {
        plugin.showSettingDialog();
    } catch (err) {
        web2pdf_alert(err);
    }
}

function web2pdf_isDMSAvailable() {
    return plugin.isDMSAvailable();
}

function web2pdf_handleConversionRequest(request) {
    var port = chrome.tabs.connect(request.tab, { name: "GetDOMData" });
    if (request.context == web2pdfContext.PAGE) {
        port.postMessage({ request: "GetPageData", action: request.action });
        port.onMessage.addListener(function(msg) {
            if (msg.response == "PageData") {
                port.disconnect();
                plugin.convertToPDF(msg.url, msg.domtitle, msg.domdata, msg.domcookie, msg.action);
            }
        });
    } else if (request.context == web2pdfContext.LINK) {
        port.postMessage({ request: "GetLinkData", url: request.url, action: request.action });
        port.onMessage.addListener(function(msg) {
            if (msg.response == "LinkData") {
                port.disconnect();
                plugin.convertToPDF(msg.url, msg.domtitle, msg.domdata, msg.domcookie, msg.action);
            }
        });
    } else {
        web2pdf_alert("Unsupported context request!!!");
    }
}

function web2pdf_handleConversionRequest2(request) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            web2pdf_handleConversionRequest({ tab: tabs[0].id, context: request.context, url: request.url, action: request.action });
        }
    });
}

// ---------- init extension

window.addEventListener("load", web2pdf_init, false);