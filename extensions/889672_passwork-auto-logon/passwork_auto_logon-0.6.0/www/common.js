let _browser;
if(chrome) {
    _browser = chrome;
} else if(browser){
    _browser = browser;
}

function el(s) {
    return document.getElementById(s);
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function msgAction(action) {
    top.postMessage({action: action}, '*');
}

function setLangText(code) {
    el(code).innerText = _browser.i18n.getMessage(code);
}

function closeIFrame() {
    if (inIframe()) {
        msgAction("pw_closeIFrame");
    } else {
        window.close();
    }
}