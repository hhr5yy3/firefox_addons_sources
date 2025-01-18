if (typeof browser === "undefined") {
    var browser = chrome;
}

const SUPPORTED_LOCALES = ['af','sq','ar','hy','az','eu','be','bn','bg','ca','zh-CN','zh-TW','hr','cs','da','nl','en','eo','et','tl','fi','fr','gl','ka','de','el','gu','ht','iw','hi','hu','is','id','ga','it','ja','kn','ko','la','lv','lt','mk','ms','mt','no','fa','pl','pt','ro','ru','sr','sk','sl','es','sw','sv','ta','te','th','tr','uk','ur','vi','cy','yi'];

const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
        browser.storage.local.get([key], function (result) {
            if (result[key] === undefined) {
                resolve(null);
            } else {
                resolve(result[key]);
            }
        });
    });
};

const writeLocalStorage = async (key, value) => {
    return new Promise((resolve, reject) => {
        browser.storage.local.set({[key]: value}, function () {
            resolve();
        });
    });
};

function contextClick(info, tab) {
    const { menuItemId } = info

    if (menuItemId === 'foo') {
        // do something
    }
};

function arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa( binary );
};

class Config {
    static hash = "aHR0cHM6Ly9hcGkudHJhbnNsYXRvci5wb3FkZXYuY29tL3NldHRpbmdz";
    constructor(callback) {
        this.config = {};
        readLocalStorage("translator_config").then((config) => {
            this.config = config;
            callback && callback();
        });
        browser.storage.onChanged.addListener(storageChanges => {
            readLocalStorage("translator_config").then((config) => {
                this.config = config;
            });
        });
    }
    getUserID() {
        if (this.uid) return this.uid;
        else {
            let generatedUID = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (value) {
                var randVal = 0 | 16 * Math.random(),
                    replacedVal = "x" == value ? randVal : 8 | 3 & randVal;
                return replacedVal.toString(16)
              });
            writeLocalStorage("translator_uid", generatedUID);
            return generatedUID;
        }
    }
};

class Translation {
    constructor() {
        this.config = new Config;
    }
    createContextMenu() {
        browser.contextMenus.create({
            id: 'foo',
            title: browser.i18n.getMessage("translate") + " '%s'",
            contexts: ["selection"]
        });
        browser.contextMenus.onClicked.addListener((info, tab) => {
            const { menuItemId } = info;

            if (menuItemId === 'foo') {
                this.translate(info);
            }
        });
    }
    openUrl(url, isSelected) {
        browser.tabs.create({
            url: url,
            selected: isSelected
        });
    }
    getTranslateToLanguage() {
        return this.config.config.tl ? this.config.config.tl : this.normalizeLanguageCode(window.navigator.language);
    }
    supportedLocale(locale) {
        return -1 !== ["ar", "bg", "ca", "cs", "da", "de", "el", "en", "en-GB", "en-US", "es", "es-419", "et", "fi", "fil", "fr", "he", "hi", "hr", "hu", "id", "it", "ja", "ko", "lt", "lv", "nl", "no", "pl", "pt-BR", "pt-PT", "ro", "ru", "sk", "sl", "sr", "sv", "th", "tl", "tr", "uk", "vi", "zh-CN", "zh-TW"].indexOf(locale);
    }
    normalizeLanguageCode(languageCode) {
        return "zh-tw" === languageCode.toLowerCase() ? "zh-TW" : "zh-cn" === languageCode.toLowerCase() ? "zh-CN" : 2 <= languageCode.length && this.supportedLocale(languageCode) ? languageCode.substr(0, 2) : "en";
    }
    translate(info) {
        let selectedText = info.selectionText,
            vmConfig = this.config.config.vm,
            autoLang = selectedText.toLowerCase() === browser.i18n.getMessage("name").toLowerCase() ? "la" : "auto";
        if ("tt" !== vmConfig) {
            let url = "http://translate.google.com/#" + autoLang + "|" + this.getTranslateToLanguage() + "|" + encodeURIComponent(selectedText);
            this.openUrl(url, !("ognt" !== vmConfig));
        }
    }
};

class Initializer {
    constructor() {
        this.config = new Config(this.configLoadCallback()), 
        this.translation = new Translation, 
        this.run()
    }
    run() {
        this.initListeners(), 
        this.translation.createContextMenu()
    }
    configLoadCallback() {
        var myself = this;
        return function() {
            myself.uid = myself.config.getUserID()
        }
    }
    initListeners() {
        this.initInstalledListeners(); 
        this.initMessageListeners();
    }
    initInstalledListeners() {
        browser.runtime.onInstalled.addListener(installData => {
            browser.storage.local.set({
                time: new Date().getTime()
            }, () => {}), this.checkInstallReason(installData.reason)
        })
    }
    initMessageListeners() {
        browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
            switch (message.action) {
                case "openSettings":
                    this.showSettingsPage();
                    break;
                case "openSupport":
                    this.openSupportPage();
                    break;
                case "sendRequestTry":
                    const texts = message.texts;
                    const promisesArray = [];
                    for (const item of texts) {
                        const language = item[0];
                        const text = item[1];
                        const promise = fetch(`https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=${language}&q=${text}`)
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error, status = ${response.status}`);
                                }
                                return response.arrayBuffer();
                            });
                        promisesArray.push(promise);
                    }
                    Promise.all(promisesArray).then((buffers) => {
                        const base64Buffers = buffers.map(it => arrayBufferToBase64(it));
                        writeLocalStorage("trbuffers", base64Buffers);
                        browser.tabs.sendMessage(sender.tab.id, {buffers: base64Buffers});
                    });
                    break;
                default:
            }
            return sendResponse(""), true
        })
    }
    showSettingsPage() {
        const settingsUrl = browser.runtime.getURL("settings.html");
        browser.tabs.query({
            currentWindow: true
        }, tabs => {
            let isPageOpen = false,
                pageTabId = null;
            tabs.forEach(tab => {
                 if(tab.url === settingsUrl) {
                    isPageOpen = true;
                    pageTabId = tab.id;
                }
            }), 
            isPageOpen ? browser.tabs.update(pageTabId, {highlighted: true}) : browser.tabs.create({url: settingsUrl})
        });
    }
    openSupportPage() {
        const supportPageUrl = "https://pomoq-dev.github.io/translator/support";
        browser.tabs.query({
            currentWindow: true
        }, tabs => {
            let isPageOpen = false,
                pageTabId = null;
            tabs.forEach(tab => {
                if(tab.url === supportPageUrl) {
                    isPageOpen = true;
                    pageTabId = tab.id;
                }
            }), 
            isPageOpen ? browser.tabs.update(pageTabId, {highlighted: true}) : browser.tabs.create({url: supportPageUrl});
        });
    }
    unifyLanguage(selectedLanguage) {
        if (SUPPORTED_LOCALES.includes(selectedLanguage)) return selectedLanguage;
        const LanguagePrefix = selectedLanguage.split('-');
        if (SUPPORTED_LOCALES.includes(LanguagePrefix)) return LanguagePrefix;
        return "en";
    }
    checkInstallReason(installReason) {
        let installDetails;
        if(installReason === "install") { 
            installDetails = {
                tl: this.unifyLanguage(browser.i18n.getUILanguage()),
                vm: "ognt",
                ft: true,
                uid: this.config.getUserID(),
                extId: browser.runtime.id,
                date_install: new Date().getTime(),
                double_click: "double_click_true"
            };
        } else if(installReason == "update") { 
            installDetails = {
                tl: this.unifyLanguage(browser.i18n.getUILanguage()),
                vm: "ognt",
                ft: false,
                uid: this.config.getUserID(),
                extId: browser.runtime.id,
                du: new Date().getTime(),
                double_click: "double_click_true"
            };
        }
        writeLocalStorage("translator_config", installDetails);
        this.translation.openUrl("https://pomoq-dev.github.io/translator/update", true);
        this.translation.openUrl("./settings.html", true);
    }
    handleIncomingHeaders({
        responseHeaders: headers
    }) {
        return {
            responseHeaders: headers.filter(header => "x-frame-options" !== header.name.toLowerCase())
        }
    }
    modifyClientHeaders({
        requestHeaders: headers
    }) {
        return {
            requestHeaders: headers.filter(header => "referer" !== header.name.toLowerCase())
        }
    }
}
const initializer = new Initializer;