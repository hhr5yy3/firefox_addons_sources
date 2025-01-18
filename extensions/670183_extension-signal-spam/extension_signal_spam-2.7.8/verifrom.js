
var stopPhishingExtensionStarted = false;

if (window.self === window.top) {
    if (/^mail.google.com$/i.test(location.hostname) === true) {
        startForGmail(0);
    } else
        startWebMailExtension();
    void 0;
} else void 0;

function startForGmail(tries) {
    if (++tries > 20) {
        void 0;
        return;
    }
    let loadingPane = window.document.getElementById("loading");
    let docState = window.document.readyState;
    void 0;
    if (loadingPane && loadingPane.style) {
        if (docState === "complete" && loadingPane.style.display === "none") {
            return setTimeout(startWebMailExtension, 500);
        } else {
            void 0;
            return setTimeout(startForGmail.bind(this, tries), 500*tries);
        }
    } else {
        if (!document || !document.body || "function" !== typeof document.body.getAttribute || document.body.getAttribute("jscontroller") == null) {
            void 0;
            return setTimeout(startForGmail.bind(this, tries), 500*tries);
        } else return setTimeout(startWebMailExtension, 500);
    }
}

function startWebMailExtension() {

    if (stopPhishingExtensionStarted)
        return;

    if (/loaded|complete|interactive/.test(window.top.document.readyState) !== true) {
        void 0;
        if (/^mail.google.com$/i.test(location.hostname) === true)
            verifrom.setTimeout(startWebMailExtension, 1000);
        else verifrom.setTimeout(startWebMailExtension, 500);
        return;
    } else stopPhishingExtensionStarted = true;

    void 0;

    var stopPhishingLocales = null;
    var stopPhishingLocalizeStandOpts = null;

        var lastPageUrl = null;
    var pageUrl = verifrom.dom.location.href;
    var pageHostName = '';
    var pageDomainName = '';
    var pageDomainId = null;

        var PARAM;
    var CSPisActive = false;
    var verifromMailContainer = undefined;
    var phishingLinks = [];
    var phishingHashes = [];
    var phishingLinksElements = [];
    var phishingEmailDOMElement;
    var DOMEventsTimeout = -1;

        var observer;
    var observerActive = false;
    var nbObserverErrors = 0;
    const maxObserverErrors = 20;

        var userClickedButton = false;
    var oneClickOption = false;
    var privacy = false;
    var notifications = true;

        var sidebar = null;

    var id;
    var currentCheckings = new Map();
    var lastCheckId = null;

    if (extensionConfig.appInfo.safari !== true)
        var sidebarParams = {
            position: 'right',
            html: '<div id="stopphishingnotifpanel"></div>',
            title: {
                content: verifrom.locales.getMessage("contentScript.notificationMessage.title"),
                close: true
            },
            preloader: false,
            sticky: true,
            slide: 100,
            openAction: ['click', 'dblclick'],
            closeAction: ['click', 'dblclick'],
            theme: 'default',
            scrollbars: true,
            openOnInstall: false,
            events: {
                onShow: function () {
                },
                onHide: function () {
                    hideMask();
                },
                onClose: function () {
                    hideMask();
                }
            },
            views: [

                {
                    id: 'reportMultipleEmails',
                    url: verifrom.getURL('/html/views/reportMultipleEmailsView.html'),
                    localize: true,
                    sanitize: true,
                    head: [
                        {base: {href: verifrom.getURL('/'), target: '_blank'}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebarViews.css')}}
                    ]
                },
                {
                    id: 'reportEmail',
                    url: verifrom.getURL('/html/views/reportEmailView.html'),
                    localize: true,
                    sanitize: true,
                    head: [
                        {base: {href: verifrom.getURL('/'), target: '_blank'}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebarViews.css')}}
                    ]
                },
                {
                    id: 'phishingEmailAlert',
                    url: verifrom.getURL('/html/views/phishingEmailAlertView.html'),
                    localize: true,
                    sanitize: true,
                    head: [
                        {base: {href: verifrom.getURL('/'), target: '_blank'}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebarViews.css')}}
                    ]
                },
                {
                    id: 'spinner',
                    url: verifrom.getURL('/html/views/spinnerView.html'),
                    localize: true,
                    sanitize: true,
                    head: [
                        {base: {href: verifrom.getURL('/'), target: '_blank'}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebarViews.css')}}
                    ]
                },
                {
                    id: 'sendingReports',
                    url: verifrom.getURL('/html/views/sendingReportsView.html'),
                    localize: true,
                    sanitize: true,
                    head: [
                        {base: {href: verifrom.getURL('/'), target: '_blank'}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebarViews.css')}}
                    ]
                },
                {
                    id: 'sendingSingleReport',
                    url: verifrom.getURL('/html/views/sendingSingleReportView.html'),
                    localize: true,
                    sanitize: true,
                    head: [
                        {base: {href: verifrom.getURL('/'), target: '_blank'}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebarViews.css')}}
                    ]
                },
                {
                    id: 'multipleReportsSent',
                    url: verifrom.getURL('/html/views/multipleReportsSentView.html'),
                    localize: true,
                    sanitize: true,
                    head: [
                        {base: {href: verifrom.getURL('/'), target: '_blank'}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebarViews.css')}}
                    ]
                },
                {
                    id: 'singleReportSent', url: verifrom.getURL('/html/views/singleReportSentView.html'),
                    localize: true,
                    sanitize: true,
                    head: [
                        {base: {href: verifrom.getURL('/'), target: '_blank'}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebarViews.css')}}
                    ]
                },
                {
                    id: 'multipleReportsFailed', url: verifrom.getURL('/html/views/multipleReportsFailedView.html'),
                    localize: true,
                    sanitize: true,
                    head: [
                        {base: {href: verifrom.getURL('/'), target: '_blank'}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebarViews.css')}}
                    ]
                },
                {
                    id: 'singleReportFailed', url: verifrom.getURL('/html/views/singleReportFailedView.html'),
                    localize: true,
                    sanitize: true,
                    head: [
                        {base: {href: verifrom.getURL('/'), target: '_blank'}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}},
                        {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebarViews.css')}}
                    ]
                }
            ]
        };

    function setWebMailDomain() {
        pageUrl = verifrom.dom.location.href;
        if (lastPageUrl===pageUrl)
            return; 
        let parsedUrl = verifrom.parseUrl(pageUrl);
        pageHostName = parsedUrl.host.toLowerCase();
        pageDomainName = parsedUrl.domain.toLowerCase();
        let pathname = parsedUrl.path.toLowerCase();

        let rules = PARAM.webmailRules || [
            {
                "f": {
                    "hostname": "^mail\\.google\\.com$",
                    "querySelectorAttribute": [
                        "body",
                        "jscontroller"
                    ]
                },
                "id": "GMAILV2"
            },
            {
                "f": {
                    "hostname": "^mail\\.google\\.com$"
                },
                "id": "GOOGLE"
            },
            {
                "f": {
                    "hostname": "outlook\\.office\\.com$",
                    "pathname": "^\\/mail"
                },
                "id": "BETAOWA"
            },
            {
                "f": {
                    "hostname": "outlook\\.office\\.com$",
                    "pathname": "^\\/owa"
                },
                "id": "OWA"
            },
            {
                "f": {
                    "hostname": "outlook\\.live\\.com$",
                    "pathname": "^\\/mail"
                },
                "id": "BETAOWA"
            },
            {
                "f": {
                    "hostname": "outlook\\.live\\.com$",
                    "pathname": "^\\/owa"
                },
                "id": "OUTLOOK"
            },
            {
                "f": {
                    "domain": "^live\\.com$"
                },
                "id": "LIVE"
            },
            {
                "f": {
                    "hostname": "mail\\.yahoo\\.com$",
                    "pathname": "^\\/b",
                    "querySelector": "body#Atom"
                },
                "id": "YMAILDORRIN"
            },
            {
                "f": {
                    "hostname": "mail\\.yahoo\\.com$",
                    "querySelector": "body#Atom"
                },
                "id": "YMAILNORRIN"
            },
            {
                "f": {
                    "hostname": "mail\\.yahoo\\.com$",
                    "querySelector": "html#Stencil"
                },
                "id": "YAHOO"
            },
            {
                "f": {
                    "hostname": "mail\\.yahoo\\.com$"
                },
                "id": "YMAILNEO"
            },
            {
                "f": {
                    "hostname": "^mail\\.aol\\.com$"
                },
                "id": "AOL"
            },
            {
                "f": {
                    "hostname": "webmail\\.sfr\\.fr$"
                },
                "id": "ATELIERSFR"
            },
            {
                "f": {
                    "domain": "sfr\\.fr$",
                    "querySelectorAll": "header.messagerie"
                },
                "id": "SFR"
            },
            {
                "f": {
                    "hostname": "^web-mail\\.laposte\\.net$"
                },
                "id": "LAPOSTEV2"
            },
            {
                "f": {
                    "hostname": "^webmail.?\\.laposte\\.net$"
                },
                "id": "LAPOSTE"
            },
            {
                "f": {
                    "hostname": "^webmail\\.mail\\.ovh\\.net$"
                },
                "id": "OUTLOOK"
            },
            {
                "f": {
                    "hostname": "^mail\\.ovh\\.net$"
                },
                "id": "RCOVH"
            },
            {
                "f": {
                    "hostname": "^webmail.*\\.orange\\.fr$"
                },
                "id": "ORANGE"
            },
            {
                "f": {
                    "hostname": "^mail.*\\.orange\\.fr$"
                },
                "id": "ORANGEOX"
            },
            {
                "f": {
                    "hostname": "^messageriepro[^\\.]*\\.orange\\.fr$"
                },
                "id": "ORANGEPRO"
            },
            {
                "f": {
                    "hostname": "apis\\.mail\\.yahoo\\.com$"
                },
                "id": null
            },
            {
                "f": {
                    "hostname": "overview\\.mails\\.yahoo\\.com$"
                },
                "id": null
            },
            {
                "f": {
                    "hostname": "^imp\\.free\\.fr$"
                },
                "id": "IMPFREE"
            },
            {
                "f": {
                    "hostname": "^zimbra\\.free\\.fr$"
                },
                "id": "ZIMBRAFREE"
            },
            {
                "f": {
                    "hostname": "^webmail-rc\\.free\\.fr$"
                },
                "id": "RCFREE"
            },
            {
                "f": {
                    "hostname": "^webmail\\.free\\.fr$"
                },
                "id": "RCFREE"
            },
            {
                "f": {
                    "hostname": "atelier\\.pp\\.messagerie\\.sfr\\.fr$"
                },
                "id": "ATELIERSFR"
            }
        ];

        let foundId = null;
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            let filtered = 1;
            let keys = Object.keys(rule.f);
            for (let j = 0; filtered && j < keys.length; j++) {
                let key = keys[j];
                try {
                    switch (key) {
                        case "hostname":
                            filtered &= RegExp(rule.f.hostname).test(pageHostName);
                            break;
                        case "domain":
                            filtered &= RegExp(rule.f.domain).test(pageDomainName);
                            break;
                        case "querySelectorAll":
                            filtered &= window.document.querySelectorAll(rule.f.querySelectorAll).length > 0;
                            break;
                        case "querySelector":
                            filtered &= window.document.querySelector(rule.f.querySelector) != null;
                            break;
                        case "querySelectorAttribute":
                            filtered &= window.document.querySelector(rule.f.querySelectorAttribute[0]).getAttribute(rule.f.querySelectorAttribute[1]) !== null;
                            break;
                        case "pathname":
                            filtered &= RegExp(rule.f.pathname).test(pathname);
                            break;
                    }
                } catch {
                }
            }
            if (filtered===1) {
                foundId = rule.id + "DOMAIN";
                if (rule.id === "$hostname")
                    foundId = pageHostName;
                break;
            }
        }
        pageUrl = verifrom.dom.location.href;
        pageHostName = verifrom.dom.location.hostname;
        pageDomainName = PARAM[foundId] || null;
        pageDomainId = foundId;
        void 0;
        return foundId;
    }

    function setLocales (localesData) {
        void 0;
        stopPhishingLocales = localesData.localizationData;
        let loadedLocale = localesData.loadedLocale;
        stopPhishingLocalizeStandOpts = {
            "languageData": stopPhishingLocales,
            "loadedLocale": loadedLocale
        };
    }

    function initContentScript() {
        try {
            if (verifrom.appInfo.quantum)
                verifrom.message.toBackground({'action': 'getParam'}, {'channel': 'PARAMS', 'response': setParam});
            else {
                verifrom.message.addListener({channel: 'PARAMS'}, setParam);
                verifrom.message.toBackground({'action': 'getParam'}, {'channel': 'PARAMS'});
            }
        } catch (err) {
            void 0;
            verifrom.message.toBackground({
                'event': 'PARAMETERS NOT LOADED FOR ' + pageDomainName,
                'fatal': true
            }, {channel: "ReportException"});
            notifyError('error1', true, true);
            return;
        }


    }

    function setParam(paramsToSet) {
        PARAM = paramsToSet;

        if (typeof PARAM === 'string') {
            void 0;
            PARAM = verifrom.JSON.parse(PARAM);
        }

        if (!paramsToSet || !PARAM || typeof PARAM !== 'object') {
            void 0;
            notifyError('error1', true, true);
            return;
        }

        if (setWebMailDomain()===null) {
            void 0;
            return;
        };

        if (PARAM.DISRUPTED_WEBMAILS && (new RegExp(PARAM.DISRUPTED_WEBMAILS, 'i')).test(pageDomainName) === true) {
            if (PARAM.DISRUPTION_URL[pageDomainName] && verifrom.cookie.get('verifromunavailable') !== 'off') {
                if (!CSPisActive) {
                    sidebar.addView('disruption'
                        , PARAM.DISRUPTION_URL[pageDomainName]
                        , true
                        , false
                        , null,
                        [{link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}}]
                        , null);
                    sidebar.showView('disruption');
                    verifrom.cookie.set('verifromunavailable', 'off', 0.5);
                    setTimeout(function () {
                        sidebar.addViewListener('disruption', "click", '.externallink', false, null, openExternalLink);
                    }, 500);
                } else {
                    verifrom.request.get({
                        url: PARAM.DISRUPTION_URL[pageDomainName],
                        onSuccess: function (HTMLresponse) {
                            sidebar.displaySanitizedBody(HTMLresponse);
                            verifrom.cookie.set('verifromunavailable', 'off', 0.5);
                        },
                        onFailure: function () { 
                            void 0;
                        },
                        contentType: 'application/x-www-form-urlencoded',
                        responseDataType: 'html'
                    });
                }
            }
            verifrom.message.toBackground({'status': 'Unavailable', 'time': Date.now()}, {channel: "Unavailable"});
            return;
        }
        startExt();
    }

    function notifyUser(message, browserNotification, browserNotificationOnly) {
        if (extensionConfig.appInfo.safari)
            verifrom.message.toBackground({reason: message, report: []}, {channel: "reportFromWebmail"});
        else {
            message = verifrom.locales.getMessage(`contentScript.notificationMessage.${message}`);

            if (!browserNotificationOnly) {
                verifrom.notifier.show({
                    'name': 'VF-Fail-' + verifrom.time.now(),
                    'title': verifrom.locales.getMessage('contentScript.notificationMessage.title') || extensionConfig.appInfo.extensionName,
                    'body': message,
                    'theme': 'orange',
                    'position': 'top-right',
                    'close': true,
                    'sticky': true,
                    'fadeAfter': 100,
                    'width': '30vw',
                    'closeWhenClicked': true,
                    head: {
                        base: {href: verifrom.getURL('/'), target: '_blank'},
                        link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/notification.css')}
                    }
                });
                $('.verifromNotifier-close-theme-orange').css('background-image', 'url(' + verifrom.getURL('/img/close.png') + ')');
            }
            if (browserNotification)
                verifrom.message.toBackground({message: message}, {channel: "notification"});
            sidebar.hide();
        }
    }

    function notifyError(message, browserNotification, browserNotificationOnly) {
        if (extensionConfig.appInfo.safari)
            verifrom.message.toBackground({reason: message, report: []}, {channel: "reportFromWebmail"});
        else {
            message = verifrom.locales.getMessage(`contentScript.notificationMessage.${message}`);

            if (!browserNotificationOnly) {
                verifrom.notifier.show({
                    'name': 'VF-Fail-' + verifrom.time.now(),
                    'title': verifrom.locales.getMessage('contentScript.notificationMessage.title') || extensionConfig.appInfo.extensionName,
                    'body': message,
                    'theme': 'red',
                    'position': 'top-right',
                    'close': true,
                    'sticky': true,
                    'fadeAfter': 100,
                    'width': '30vw',
                    'closeWhenClicked': true,
                    head: {
                        base: {href: verifrom.getURL('/'), target: '_blank'},
                        link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/notification.css')}
                    }
                });
                $('.verifromNotifier-close-theme-red').css('background-image', 'url(' + verifrom.getURL('/img/close.png') + ')');
            }
            if (browserNotification)
                verifrom.message.toBackground({message: message}, {channel: "notification"});
            sidebar.hide();
        }
    }

    if (extensionConfig.appInfo.safari !== true) {
        var openExternalLink = function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (event.target.href)
                window.open(event.target.href, "_verifromExtension");
            else if (event.target.parentElement && event.target.parentElement.href)
                window.open(event.target.parentElement.href, '_verifromExtension');
            else if (event.target.parent && event.target.parent.href)
                window.open(event.target.parent.href, '_verifromExtension');
        };

        function postPhishingDetails(rawData, links, body, folder, reportId, subject, sender, feedbackRequested, privacy) {
            let payLoad;

            if (body !== undefined || links !== undefined)
                payLoad = {
                    "action": "signalHeader",
                    email: {
                        "header": rawData,
                        "body": body,
                        "links": links,
                        "folder": folder === undefined ? 0 : folder
                    }
                };
            else payLoad = {"action": "signalRawMail", "email": rawData, "folder": folder === undefined ? 0 : folder};
            verifrom.message.toBackground({
                "reportId": reportId,
                payLoad: payLoad,
                webmail: pageDomainName,
                appid: PARAM.VERIFROMGADGETID,
                subject: subject,
                sender: sender,
                feedbackRequested: feedbackRequested,
                privacy: privacy
            }, {channel: "signalPhishing"});
        }
    }

    function getMailLinks(element, partialExtract) {
        let urlArray = [];
        let urlElementsArray = [];
        let uniqueUrlArray;
        let uniqueUrlElementsArray;
        let tagsAttrList;
        let tagsAttrPartialList = PARAM.TAGSATTRPARTIALLIST_CONST;
        let mailLink = "";
        let originalLink = "";
        let mailLinkScheme = "";

        tagsAttrList = PARAM.TAGSATTRLIST_CONST;

        if (partialExtract === true) {
            tagsAttrList = tagsAttrPartialList;
            void 0;
        }
        void 0;
        if (element && $(element).length === 1) {
            for (let i = 0; i < tagsAttrList.length; i++) {
                for (let j = 1; j < tagsAttrList[i].length; j++) {
                    let tagAttr = tagsAttrList[i][0] + "[" + tagsAttrList[i][j] + "]";
                    void 0;

                    let linksInElement = element.querySelectorAll(tagAttr);
                    for (let k = 0; k < linksInElement.length; k++) {
                        mailLink = linksInElement[k].getAttribute(tagsAttrList[i][j]);
                        if (pageDomainName === PARAM.BETAOWADOMAIN) {
                            mailLink = linksInElement[k].getAttribute('originalsrc');
                            if (!mailLink)
                                mailLink = linksInElement[k].getAttribute(tagsAttrList[i][j]);
                        }
                        originalLink = mailLink;
                        mailLinkScheme = mailLink.trim().match(/^([a-z]+):.+$/i);
                        if (mailLinkScheme && mailLinkScheme.length>=1)
                            mailLinkScheme = mailLinkScheme[1].toLowerCase();
                        else mailLinkScheme = "http";


                                                if (PARAM.LINKS_CONVERSIONS_RULES) {
                            let rulename = PARAM.LINKS_CONVERSIONS_RULES[pageDomainId];
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
                                    else if (nullit === true && ruleToApply.else  && ruleToApply.else[0] === "#") {
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
                                    mailLink = applyRule(singleRule,mailLink);
                            } else if (rule instanceof Object)
                                mailLink = applyRule(rule,mailLink);
                            else void 0;
                            if (PARAM.LINKS_CONVERSIONS_RULES["DEFAULT"] && PARAM.LINKS_CONVERSIONS[PARAM.LINKS_CONVERSIONS_RULES["DEFAULT"]]) {
                                rule = PARAM.LINKS_CONVERSIONS[PARAM.LINKS_CONVERSIONS_RULES["DEFAULT"]];
                                mailLink = applyRule(rule, mailLink);
                            }
                            void 0;
                        }
                        if (mailLink && mailLink.length>3) {
                            void 0;
                            urlArray.push(mailLinkScheme + '://' + mailLink);
                            urlElementsArray.push({url: mailLinkScheme + '://' + mailLink, element: linksInElement[k]});
                            void 0;
                        }
                    }
                }
            }
            urlArray.sort();
            urlElementsArray.sort(function (a, b) {
                if (a.url < b.url) return -1;
                else if (a.url > b.url) return 1;
                else return 0;
            });
            uniqueUrlArray = [];
            uniqueUrlElementsArray = [];
            if (urlArray.length > 0) {
                uniqueUrlArray[0] = urlArray[0];
                uniqueUrlElementsArray[0] = [];
                uniqueUrlElementsArray[0][0] = urlElementsArray[0].element;
                for (let i = 1; i < urlArray.length; i++) {
                    if (urlArray[i] !== uniqueUrlArray[uniqueUrlArray.length - 1]) {
                        uniqueUrlArray.push(urlArray[i]);
                        if (uniqueUrlElementsArray[i] === undefined) uniqueUrlElementsArray[uniqueUrlArray.length - 1] = [];
                    }
                    uniqueUrlElementsArray[uniqueUrlArray.length - 1].push(urlElementsArray[i].element);
                }
            }
        }
        return {urlArray: uniqueUrlArray, urlElementsArray: uniqueUrlElementsArray};
    }

    function getMailBody(element) {

        switch (pageDomainName) {
            case PARAM.YAHOODOMAIN:
                $(window).trigger('resize');
                return ($('.body,.msg-body', element).get(0).innerHTML);
            case PARAM.SFRDOMAIN:
            case PARAM.ORANGEDOMAIN:
                return ($(element).get(0).innerHTML);
        }
    }


    function handleRawMail(context, event) {
        let payLoad;
        let UrlPostData;
        let rawMailURI;
        let locationObj;
        let emailParts;
        let eventDetails = event.originalEvent.detail;
        let returnedEmailsNumber = 0;
        let queue;

        event.stopPropagation();
        void 0;

        if (eventDetails && eventDetails.exception === true) {

            notifyUser("error2");
            if (sidebar)
                sidebar.hide();
            if (context.callback)
                context.callback(undefined);
            verifrom.message.toBackground({
                fatal: true,
                event: eventDetails.exceptionDetails,
                time: Date.now(),
                userAgent: navigator.userAgent,
                location: location.href,
                version: verifrom.appInfo.version
            }, {"channel": "ReportException"});
            return;
        }

        switch (pageDomainName) {
            case PARAM.BLUEWINDOMAIN: {
                emailParts = [];
                returnedEmailsNumber = 0;
                if (!eventDetails.bluewinEmails || eventDetails.bluewinEmails.length === 0) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }
                for (let i = 0; i < eventDetails.bluewinEmails.length; i++) {
                    emailParts[returnedEmailsNumber] = [];
                    let responseText = $.ajax({
                        type: "GET",
                        url: 'https://' + window.location.hostname + '/cp/applink/mail/Downloader?accountName=' + eventDetails.bluewinEmails[i].accountName + '&folderPath=' + eventDetails.bluewinEmails[i].fid + '&messageId=' + eventDetails.bluewinEmails[i].mid + '&contentDisposition=attachment&dhid=messageDownloader&u=' + eventDetails.sessionParameters.u + '&d=' + eventDetails.sessionParameters.d + '&t=' + eventDetails.sessionParameters.t
                        ,
                        async: false
                    })
                        .responseText;
                    emailParts[returnedEmailsNumber]['folder'] = eventDetails.bluewinEmails[i].fid === 'Spam' ? 1 : 2;
                    emailParts[returnedEmailsNumber++]['header'] = responseText;
                }
                if (context.displaySideBar)
                    startUserReport(emailParts);
                if (context.callback)
                    context.callback(emailParts.length > 0 ? emailParts : undefined);
                return emailParts.length > 0 ? emailParts : undefined;
            }
            case PARAM.RCFREEDOMAIN:
            case PARAM.RCOVHDOMAIN: {
                emailParts = [];
                if (eventDetails && (eventDetails.selectedMessagesIds === undefined || eventDetails.selectedMessagesIds.length === 0)) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }
                if (eventDetails.selectedMessagesIds && eventDetails.selectedMessagesIds.length > 0) {
                    queue = new verifrom.request.Queue();

                    for (let i = 0; i < eventDetails.selectedMessagesIds.length; i++) {
                        try {
                            locationObj = $(location)[0];
                            void 0;
                            queue.addRequest(
                                {
                                    type: "GET",
                                    url: locationObj.origin + locationObj.pathname + '?_task=mail&_uid=' + eventDetails.selectedMessagesIds[i] + '&_mbox=' + eventDetails.fid[i] + '&_action=viewsource&_extwin=1',
                                    dataType: 'text',
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8'
                                });
                        } catch (err) {
                            void 0;
                        }
                    }
                    queue.done(function (queueArray) {
                        if (queueArray.length === 0) {
                            notifyUser("error2");
                            return undefined;
                        }
                        for (let i = 0; i < queueArray.length; i++) {
                            let requestResponse = queueArray[i].responseText;
                            emailParts[i] = {}; 
                            emailParts[i].header = requestResponse;
                            emailParts[i].folder = /Junk/.test(eventDetails.fid[i]) ? 1 : 2;
                        }
                        if (context.displaySideBar)
                            startUserReport(emailParts);
                        if (context.callback)
                            context.callback(emailParts);
                    });
                }
            }
                break;
            case PARAM.GMAILV2DOMAIN:
            case PARAM.GOOGLEDOMAIN: {
                emailParts = [];
                returnedEmailsNumber = 0;
                if (!eventDetails.msgIds || eventDetails.msgIds.length === 0) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }

                queue = new verifrom.request.Queue();
                for (let i = 0; i < eventDetails.msgIds.length; i++) {
                    if (PARAM.GMAIL.ATTACHMENTS === true)
                        queue.addRequest({
                            type: "GET",
                            url: 'https://mail-attachment.googleusercontent.com/attachment/u/1/?view=att&th=' + eventDetails.msgIds[i] + '&disp=comp&safe=1&zw'
                        });
                    else {
                        if (pageDomainName === PARAM.GMAILV2DOMAIN) {
                            let mid = eventDetails.msgIds[i];
                            if (/^\#?thread-f.*?\|\#?msg-f/.test(mid)) 
                                mid = mid.replace(/.*?\#?(msg-f.*$)/, '$1');
                            else mid = mid.replace('#thread-f:', 'msg-f:');
                            queue.addRequest({
                                type: "GET",
                                url: 'https://' + window.location.hostname + window.location.pathname + '?ik=' + eventDetails.ik + '&view=om&permmsgid=' + mid
                            });
                        } else queue.addRequest({
                            type: "GET",
                            url: 'https://' + window.location.hostname + window.location.pathname + '?ui=2&ik=' + eventDetails.ik + '&view=om&th=' + eventDetails.msgIds[i]
                        });
                    }
                }

                queue.done(function (queueArray) {
                    if (queueArray.length === 0) {
                        notifyUser("error2");
                        return undefined;
                    }

                    let sanitizedCount = queueArray.length;
                    for (let i = 0; i < queueArray.length; i++) {
                        let responseText = queueArray[i].responseText;
                        try {
                            verifrom.dom.createSanitizedDoc("No Title", responseText, function (doc) {
                                let rawMailContent = $('pre.raw_message_text', doc.body);
                                if (rawMailContent.length > 0)
                                    rawMailContent = rawMailContent.get(0).innerText;
                                else rawMailContent = responseText; 
                                if (rawMailContent.match(/^Received. (from|by) /gm)) {
                                    emailParts[returnedEmailsNumber] = {};
                                    emailParts[returnedEmailsNumber].folder = /spam/.test(eventDetails.folderIds[i]) ? 1 : 2;
                                    emailParts[returnedEmailsNumber].header = rawMailContent;
                                    returnedEmailsNumber++;
                                } else void 0;
                                sanitizedCount--;
                                if (sanitizedCount === 0 && returnedEmailsNumber > 0) {
                                    if (context.displaySideBar)
                                        startUserReport(emailParts);
                                    if (context.callback)
                                        context.callback(emailParts.length > 0 ? emailParts : undefined);
                                } else if (sanitizedCount === 0 && returnedEmailsNumber === 0) {
                                    notifyUser("nomail1");
                                    return undefined;
                                }
                            });
                        } catch (e) {
                            void 0;
                        }
                    }
                });
            }
                break;
            case PARAM.AOLDOMAIN: {
                emailParts = [];
                let selectedEmailsIndexes = [];
                if (eventDetails.currentUid)
                    selectedEmailsIndexes.push(eventDetails.currentUid);
                else {
                    for (let key in eventDetails.selectedUIDs) {
                        if (eventDetails.selectedUIDs.hasOwnProperty(key)) {
                            selectedEmailsIndexes.push(key);
                        }
                    }
                }

                if (selectedEmailsIndexes.length === 0) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }

                void 0;

                queue = new verifrom.request.Queue();
                for (let i = 0; i < selectedEmailsIndexes.length; i++) {
                    queue.addRequest({
                        type: "GET",
                        url: window.document.location['origin'] + '/webmail/viewSource?user=' + eventDetails.UserUID + '&uid=' + selectedEmailsIndexes[i],
                        contentType: 'application/x-www-form-urlencoded; charset=utf-8'
                    });
                }
                queue.done(function (queueArray) {
                    if (queueArray.length === 0) {
                        notifyUser("error2");
                        return undefined;
                    }
                    for (let i = 0; i < queueArray.length; i++) {
                        emailParts[i] = {};
                        emailParts[i]['header'] = queueArray[i].responseText;
                        emailParts[i]['folder'] = /Spam/.test(eventDetails.Folder) ? 1 : 2;
                    }
                    if (context.displaySideBar)
                        startUserReport(emailParts);
                    if (context.callback)
                        context.callback(emailParts);
                });
            }
                break;
            case PARAM.ZIMBRAFREEDOMAIN:
            case PARAM.LAPOSTEDOMAIN: {
                emailParts = [];
                if (eventDetails === undefined || eventDetails === null) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }
                if (eventDetails && eventDetails.msgIds.length === 0) {
                    void 0;
                    if (eventDetails.standardMode === false)
                        notifyUser("nomail1");
                    else notifyUser("nomail2");
                    return undefined;
                }
                let selectedEmailsIndexes = eventDetails.msgIds;

                queue = new verifrom.request.Queue();
                for (let i = 0; i < selectedEmailsIndexes.length; i++) {
                    queue.addRequest({
                        type: "GET",
                        url: window.document.location['origin'] + '/service/home/~/?auth=co&id=' + eventDetails.msgIds[i],
                        contentType: 'application/x-www-form-urlencoded; charset=utf-8'
                    });
                }
                queue.done(function (queueArray) {
                    if (queueArray.length === 0) {
                        notifyUser("error2");
                        return undefined;
                    }

                    for (let i = 0; i < queueArray.length; i++) {
                        emailParts[i] = {};
                        emailParts[i]['folder'] = /junk/.test(eventDetails.folderId) ? 1 : 2;
                        if (eventDetails.standardMode === false)
                            emailParts[i].folder = /junk/.test(eventDetails.folderId) ? 1 : 2;
                        else emailParts[i].folder = eventDetails.folderId;

                        emailParts[i]['header'] = queueArray[i].responseText;
                        void 0;
                    }
                    if (context.displaySideBar)
                        startUserReport(emailParts);
                    if (context.callback)
                        context.callback(emailParts);
                });
            }
                break;
            case PARAM.BETAOWADOMAIN: {
                emailParts = [];
                if (eventDetails === undefined || eventDetails === null || (eventDetails && eventDetails.msgIds.length === 0)) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }
                queue = new verifrom.request.Queue();

                for (let i = 0; i < eventDetails.msgIds.length; i++) {
                    locationObj = window.top.location;
                    let accountID = null;
                    if (/^\/mail\/[0-9]+\//i.test(locationObj.pathname) === true) {
                        accountID = locationObj.pathname.replace(/\/mail\/([0-9]+)\/.*/i, '$1');
                    }
                    if (accountID !== null)
                        rawMailURI = locationObj.origin + `/owa/${accountID}/service.svc?action=GetItem&EP=1&app=Mail`;
                    else rawMailURI = locationObj.origin + `/owa/service.svc?action=GetItem&EP=1&app=Mail`;
                    try {
                        UrlPostData = {
                            "__type": "GetItemJsonRequest:#Exchange",
                            "Header":
                                {
                                    "__type": "JsonRequestHeaders:#Exchange",
                                    "RequestServerVersion": "V2016_06_24",
                                    "TimeZoneContext":
                                        {
                                            "__type": "TimeZoneContext:#Exchange",
                                            "TimeZoneDefinition":
                                                {
                                                    "__type": "TimeZoneDefinitionType:#Exchange",
                                                    "Id": "Romance Standard Time"
                                                }
                                        }
                                },
                            "Body":
                                {
                                    "__type": "GetItemRequest:#Exchange",
                                    "ItemShape":
                                        {
                                            "__type": "ItemResponseShape:#Exchange",
                                            "BaseShape": "IdOnly",
                                            "IncludeMimeContent": true
                                        },
                                    "ItemIds":
                                        [
                                            {
                                                "__type": "ItemId:#Exchange",
                                                "Id": eventDetails.msgIds[i]
                                            }
                                        ],
                                    "ShapeName": null
                                }
                        };
                        queue.addRequest({
                            type: "POST"
                            , url: rawMailURI
                            , headers: {
                                'X-OWA-CorrelationId': eventDetails.header['X-OWA-CorrelationId'],
                                'X-OWA-CANARY': eventDetails.header['X-OWA-CANARY'],
                                'Accept': '*/*',
                                'content-type': 'application/json; charset=utf-8',
                                'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8,de;q=0.7,lb;q=0.6,nl;q=0.5,en-US;q=0.4,es;q=0.3,it;q=0.2,de-CH;q=0.1,bn;q=0.1,ar;q=0.1',
                                'X-OWA-UrlPostData': encodeURIComponent(JSON.stringify(UrlPostData)),
                                'Action': 'GetItem',
                                'x-req-source': 'Mail'
                            }
                        });
                    } catch (err) {
                        return undefined;
                    }

                }
                queue.done(function (queueArray) {
                    if (queueArray.length === 0) {
                        notifyUser("error2");
                        return undefined;
                    }

                    for (let i = 0; i < queueArray.length; i++) {
                        let requestResponse;
                        emailParts[i] = {};
                        requestResponse = JSON.parse(queueArray[i].responseText);

                        void 0;
                        if (requestResponse.Body.ResponseMessages.Items[0].ResponseCode === 'NoError' && requestResponse.Body.ResponseMessages.Items[0].ResponseClass === 'Success') {
                            void 0;
                            emailParts[i]['header'] = atob(requestResponse.Body.ResponseMessages.Items[0].Items[0].MimeContent.Value);
                            emailParts[i]['folder'] = eventDetails.junkIds[i] ? 1 : 2;
                        } else {
                            void 0;
                            emailParts[i]['header'] = undefined;
                            emailParts[i]['folder'] = undefined;
                        }
                    }
                    if (context.displaySideBar)
                        startUserReport(emailParts);
                    if (context.callback)
                        context.callback(emailParts);
                });
            }
                break;
            case PARAM.OWADOMAIN: {
                emailParts = [];
                if (eventDetails === undefined || eventDetails === null || (eventDetails && eventDetails.msgIds.length === 0)) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }
                queue = new verifrom.request.Queue();

                for (let i = 0; i < eventDetails.msgIds.length; i++) {
                    locationObj = $(location)[0];
                    rawMailURI = locationObj.origin + '/owa/service.svc?action=GetItem&EP=1&ID=-' + 70 + i + '&AC=1';
                    try {
                        UrlPostData = {
                            "__type": "GetItemJsonRequest:#Exchange",
                            "Header": {
                                "__type": "JsonRequestHeaders:#Exchange",
                                "RequestServerVersion": "Exchange2013",
                                "TimeZoneContext": {
                                    "__type": "TimeZoneContext:#Exchange",
                                    "TimeZoneDefinition": {
                                        "__type": "TimeZoneDefinitionType:#Exchange",
                                        "Id": "Romance Standard Time"
                                    }
                                }
                            },
                            "Body": {
                                "__type": "GetItemRequest:#Exchange",
                                "ItemShape": {
                                    "__type": "ItemResponseShape:#Exchange",
                                    "BaseShape": "IdOnly",
                                    "IncludeMimeContent": true
                                },
                                "ItemIds": [{
                                    "__type": "ItemId:#Exchange",
                                    "Id": eventDetails.msgIds[i]
                                }]
                            }
                        };
                        queue.addRequest({
                            type: "POST"
                            , url: rawMailURI
                            , crossOrigin: true
                            , headers: {
                                'X-UpnAnchorMailbox': eventDetails.header['X-UpnAnchorMailbox'],
                                'X-OWA-ClientBuildVersion': eventDetails.header['X-OWA-ClientBuildVersion'],
                                'X-OWA-CorrelationId': eventDetails.header['X-OWA-CorrelationId'],
                                'X-OWA-ClientBegin': eventDetails.header['X-OWA-ClientBegin'],
                                'X-OWA-CANARY': eventDetails.header['X-OWA-CANARY'],
                                'X-OWA-ActionId': '-' + 70 + i,
                                'X-OWA-Attempt': 1,
                                'Accept': '*/*',
                                'Accept-Language': 'fr-FR,fr;q=0.8,de;q=0.6,es;q=0.4,it;q=0.2,nl;q=0.2,en;q=0.2,de-CH;q=0.2,bn;q=0.2,ar;q=0.2,en-US;q=0.2',
                                'X-OWA-UrlPostData': JSON.stringify(UrlPostData),
                                'Action': 'GetItem',
                                'X-OWA-ActionName': 'GetItemAction',
                            }
                        });
                    } catch (err) {
                        return undefined;
                    }

                }
                queue.done(function (queueArray) {
                    if (queueArray.length === 0) {
                        notifyUser("error2");
                        return undefined;
                    }
                    for (let i = 0; i < queueArray.length; i++) {
                        emailParts[i] = {};
                        let requestResponse = JSON.parse(queueArray[i].responseText);

                        void 0;
                        if (requestResponse.Body.ResponseMessages.Items[0].ResponseCode === 'NoError' && requestResponse.Body.ResponseMessages.Items[0].ResponseClass === 'Success') {
                            void 0;
                            emailParts[i]['header'] = atob(requestResponse.Body.ResponseMessages.Items[0].Items[0].MimeContent.Value);
                            emailParts[i]['folder'] = eventDetails.junkIds[i] ? 1 : 2;
                        } else {
                            void 0;
                            emailParts[i]['header'] = undefined;
                            emailParts[i]['folder'] = undefined;
                        }
                    }
                    if (context.displaySideBar)
                        startUserReport(emailParts);
                    if (context.callback)
                        context.callback(emailParts);
                });
                break;
            }
            case PARAM.LIVEDOMAIN: {
                emailParts = [];
                if (eventDetails === undefined || eventDetails === null || (eventDetails && eventDetails.msgIds.length === 0)) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;

                }
                queue = new verifrom.request.Queue();

                for (let i = 0; i < eventDetails.msgIds.length; i++) {
                    locationObj = $(location)[0];
                    rawMailURI = locationObj.origin + '/mail/GetMessageSource.aspx?tid=' + eventDetails.msgIds[i] + (eventDetails.folderIds[i] ? '&fid=' + eventDetails.folderIds[i] : '');
                    queue.addRequest({
                        type: "GET",
                        url: rawMailURI,
                        contentType: 'application/x-www-form-urlencoded; charset=utf-8'
                    });
                }
                queue.done(function (queueArray) {
                    if (queueArray.length === 0) {
                        notifyUser("error2");
                        return undefined;
                    }
                    for (let i = 0; i < queueArray.length; i++) {
                        let requestResponse;
                        emailParts[i] = {};
                        requestResponse = queueArray[i];
                        void 0;
                        emailParts[i]['header'] = requestResponse.responseText;
                        emailParts[i]['header'] = emailParts[i]['header'].replace(/^<pre>/, '');
                        emailParts[i]['header'] = emailParts[i]['header'].replace(/<\/pre>$/, '');
                        emailParts[i]['header'] = $('<div>').html(emailParts[i]['header']).text();
                        emailParts[i]['folder'] = /junk/.test(eventDetails.folderIds[i]) ? 1 : 2;
                    }
                    if (context.displaySideBar)
                        startUserReport(emailParts);
                    if (context.callback)
                        context.callback(emailParts);
                });
            }
                break;
            case PARAM.YMAILDORRINDOMAIN: {
                emailParts = [];
                if (eventDetails === undefined || eventDetails === null || (eventDetails && eventDetails.data.length === 0)) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }
                queue = new verifrom.request.Queue();
                for (let i = 0; i < eventDetails.data.length; i++) {
                    locationObj = window.top.document.location;
                    queue.addRequest({
                        type: "GET"
                        ,
                        url: (verifrom.appInfo.safari ? "https://" : "https://apis.") + locationObj.hostname.replace(/.*?\.(mail.yahoo.*)/,"$1") + '/ws/v3/mailboxes/@.id==' + eventDetails.data[i].mailId + '/messages/@.id==' + eventDetails.data[i].ID + '/content/rawplaintext?appid=' + eventDetails.appId + '&wssid=' + eventDetails.mailWssid
                        ,
                        headers: {
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                            "upgrade-insecure-requests": "1"
                        }
                    });
                }
                queue.done(function (queueArray) {
                    if (queueArray.length === 0) {
                        notifyUser("error2");
                        return undefined;
                    }

                    for (let i = 0; i < queueArray.length; i++) {
                        let requestResponse;
                        emailParts[i] = {};
                        requestResponse = queueArray[i];
                        emailParts[i]['header'] = requestResponse.responseText;
                        emailParts[i]['folder'] = eventDetails.Folder === "6" ? 1 : 2;
                    }
                    if (context.displaySideBar)
                        startUserReport(emailParts);
                    if (context.callback)
                        context.callback(emailParts);
                }, true);
            }
                break;
            case PARAM.YMAILNORRINDOMAIN: {
                emailParts = [];
                if (eventDetails === undefined || eventDetails === null || (eventDetails && eventDetails.data.length === 0)) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;

                }
                queue = new verifrom.request.Queue();

                for (let i = 0; i < eventDetails.data.length; i++) {
                    locationObj = window.top.document.location;
                    queue.addRequest({
                        type: "GET"
                        ,
                        url: (verifrom.appInfo.safari ? "https://" : "https://apis.") + locationObj.hostname.replace(/.*?\.(mail.yahoo.*)/,"$1") + '/ws/v3/mailboxes/@.id==' + eventDetails.data[i].mailId + '/messages/@.id==' + eventDetails.data[i].ID + '/content/rawplaintext?appid=' + eventDetails.appId + '&wssid=' + eventDetails.mailWssid
                        ,
                        headers: {
                            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                            "upgrade-insecure-requests": "1"
                        }
                    });
                }

                queue.done(function (queueArray) {
                    if (queueArray.length === 0) {
                        notifyUser("error2");
                        return undefined;
                    }
                    for (let i = 0; i < queueArray.length; i++) {
                        let requestResponse;
                        emailParts[i] = {};
                        requestResponse = queueArray[i];
                        emailParts[i]['header'] = requestResponse.responseText;
                        emailParts[i]['folder'] = /Spam/.test(eventDetails.Folder) ? 1 : 2;
                    }
                    if (context.displaySideBar)
                        startUserReport(emailParts);
                    if (context.callback)
                        context.callback(emailParts);
                });
            }
                break;
            case PARAM.YAHOODOMAIN: {
                emailParts = [];
                let emailContent;

                void 0;
                if (eventDetails === undefined || eventDetails.body === undefined || eventDetails.body.display === undefined) {
                    void 0;
                    notifyUser("nomail3");
                    return undefined;
                }

                if (typeof eventDetails.V3MailboxId === 'undefined') {
                    locationObj = $(location)[0];
                    queue = new verifrom.request.Queue();

                    payLoad = '{"method":"GetMessageRawHeader","params":[{"fid":"' + eventDetails.fid + '","mid":"' + eventDetails.mid + '"}]}';
                    try {
                        queue.addRequest({
                            type: "POST",
                            url: locationObj.origin + '/ws/mail/v2.0/jsonrpc?appid=YahooMailNeo&m=GetMessageRawHeader&wssid=' + eventDetails.wssid + '&ymbucketid=exclusiveBkt',
                            data: payLoad,
                            dataType: "json",
                            contentType: "application/json"
                        });
                    } catch (err) {
                        void 0;
                        emailParts = undefined;
                    }
                    queue.done(function (queueArray) {
                        if (queueArray.length === 0) {
                            notifyUser("error2");
                            return undefined;
                        }

                        let emailParts = queueArray && queueArray.length > 0 ? queueArray[0].responseText : undefined;
                        if (typeof emailParts === 'string') {
                            try {
                                emailParts = JSON.parse(emailParts);
                            } catch (e) {

                            }
                        }
                        verifrom.dom.createSanitizedDoc('New Doc', eventDetails.body.display, function (doc) {
                            let mailLinks = getMailLinks(doc.body).urlArray;
                            let emailContent = {
                                'header': emailParts.result.rawheaders.join(''),
                                'links': mailLinks,
                                'body': eventDetails.body.display,
                                'folder': (/Bulk/.test(eventDetails.fid) ? 1 : 2)
                            };
                            if (context.displaySideBar)
                                startUserReport(emailContent);
                            if (context.callback)
                                context.callback(emailContent);
                        });
                    });
                } else {
                    locationObj = $(location)[0];
                    queue = new verifrom.request.Queue();

                    try {
                        queue.addRequest(
                            {
                                type: "GET",
                                url: 'apis.'+locationObj.origin.replace(/.*?\.(mail.yahoo.*)/,"$1") + '/ws/v3/mailboxes/@.id==' + eventDetails.V3MailboxId + '/messages/@.id==' + eventDetails.mid + '/content/rawplaintext?appid=YahooMailNeo&wssid=' + eventDetails.wssid + '&ymreqid=' + eventDetails.uuid.replace('SEQN', '0095')
                                , headers: {
                                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                                    "upgrade-insecure-requests": "1"
                                }
                            });
                    } catch (err) {
                        void 0;
                        emailParts = undefined;
                    }
                    queue.done(function (queueArray) {
                        if (queueArray.length === 0) {
                            notifyUser("error2");
                            return undefined;
                        }
                        emailParts = queueArray && queueArray.length > 0 ? queueArray[0].responseText : "";

                        emailContent = {'header': emailParts, 'folder': (/Bulk/.test(eventDetails.fid) ? 1 : 2)};
                        if (context.displaySideBar)
                            startUserReport(emailContent);
                        if (context.callback)
                            context.callback(emailContent);
                    });
                }
            }
                break;
            case PARAM.SFRDOMAIN: {
                emailParts = [];
                if (eventDetails && eventDetails.mid === undefined && (eventDetails.selectedMessagesIds === undefined || eventDetails.selectedMessagesIds.length === 0)) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }
                if (eventDetails.selectedMessagesIds && eventDetails.selectedMessagesIds.length > 0) {
                    queue = new verifrom.request.Queue();

                    for (let i = 0; i < eventDetails.selectedMessagesIds.length; i++) {
                        locationObj = $(location)[0];
                        payLoad = 'FOLDER=' + eventDetails.fid + '&IDMSG=' + eventDetails.selectedMessagesIds[i] + '&MODE=READ_ONLY&markAsRead=false&AUTO_REQUEST=false';
                        try {
                            queue.addRequest(
                                {
                                    type: "POST",
                                    url: locationObj.origin + '/webmail/xml/getMail.json',
                                    data: payLoad,
                                    dataType: 'json',
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8'
                                });
                        } catch (err) {
                            void 0;
                        }
                    }
                    queue.done(function (queueArray) {
                        if (queueArray.length === 0) {
                            notifyUser("error2");
                            return undefined;
                        }
                        let sanitizedCount = queueArray.length;
                        for (let i = 0; i < queueArray.length; i++) {
                            let requestResponse = queueArray[i].responseText;
                            emailParts[i] = {}; 

                            if (typeof requestResponse === 'string') {
                                try {
                                    requestResponse = JSON.parse(requestResponse.replace(/	/gim, ' ').replace(/\\'/gim, "\'").replace(/\r?\n|\r/gim, '').replace(/\\\&/gim, '\&'));
                                } catch (e) {
                                    void 0;
                                    void 0;
                                    jsonlint.parse(requestResponse.replace(/	/gim, ' ').replace(/\\'/gim, "\'").replace(/\r?\n|\r/gim, '').replace(/\\\&/gim, '\&'));
                                }
                            }
                            if (requestResponse.response.status.code !== 100)
                                void 0;
                            else {
                                emailParts[i].body = requestResponse.response.mail.message;
                                emailParts[i].header = '';
                                emailParts[i].folder = /JUNK/.test(eventDetails.fid) ? 1 : 2;
                                requestResponse.response.mail.headerProperty.forEach(function (item) {
                                    emailParts[i].header += (item.name + ': ' + item.value.replace(/<br>/gim, '\n') + '\n')
                                });
                                verifrom.dom.createSanitizedDoc('New Doc', requestResponse.response.mail.message, function (doc) {
                                    emailParts[i].links = getMailLinks(doc.body).urlArray;
                                    sanitizedCount--;
                                    if (sanitizedCount === 0) {
                                        if (context.displaySideBar)
                                            startUserReport(emailParts);
                                        if (context.callback)
                                            context.callback(emailParts);
                                    }
                                });
                            }
                        }
                    });
                } else {
                    let emailParts3 = {header: undefined, body: undefined, links: undefined};
                    emailParts3['header'] = eventDetails.header;
                    let mailBody = window.top.document.querySelectorAll(eventDetails.bodySelector)[0];
                    emailParts3['body'] = getMailBody(mailBody);
                    emailParts3['links'] = getMailLinks(mailBody).urlArray;
                    emailParts3['folder'] = /JUNK/.test(eventDetails.fid) ? 1 : 2;
                    if (context.displaySideBar)
                        startUserReport(emailParts3);
                    if (context.callback)
                        context.callback(emailParts3);
                }
            }
                break;
            case PARAM.LAPOSTEV2DOMAIN: {
                let emailParts = [];
                if (eventDetails && (eventDetails.selectedMessagesIds===undefined || eventDetails.selectedMessagesIds.length === 0)) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }

                for (let i = 0; i < eventDetails.eml.length; i++) {
                        emailParts[i] = {};
                        emailParts[i].header = eventDetails.eml[i].header;
                        emailParts[i].folder = eventDetails.eml[i].folder;
                    }
                if (context.displaySideBar)
                    startUserReport(emailParts);
                if (context.callback)
                    context.callback(emailParts);
            }
                break;
            case PARAM.ATELIERSFRDOMAIN: {
                emailParts = [];
                if (eventDetails && (eventDetails.selectedMessagesIds === undefined || eventDetails.selectedMessagesIds.length === 0)) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }
                if (eventDetails.selectedMessagesIds && eventDetails.selectedMessagesIds.length > 0) {
                    queue = new verifrom.request.Queue();
                    for (let i = 0; i < eventDetails.selectedMessagesIds.length; i++) {
                        locationObj = $(location)[0];
                        try {
                            locationObj = $(location)[0];
                            payLoad = 'FOLDER=' + eventDetails.selectedMessagesIds[i].split('%')[1] + '&IDMSG=' + eventDetails.selectedMessagesIds[i].split('%')[0] + '&ignoreSessionData=true&callContext=clickOnMailHeader&tok=' + eventDetails.token;
                            void 0;
                            queue.addRequest(
                                {
                                    type: "POST",
                                    url: locationObj.origin + '/webmail/xml/getMail.json',
                                    data: payLoad,
                                    dataType: 'json',
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8'
                                });
                        } catch (err) {
                            void 0;
                        }
                    }
                    queue.done(function (queueArray) {
                        if (queueArray.length === 0) {
                            notifyUser("error2");
                            return undefined;
                        }

                        for (let i = 0; i < queueArray.length; i++) {
                            let requestResponse = queueArray[i].responseText;
                            emailParts[i] = {}; 

                            if (typeof requestResponse === 'string') {
                                try {
                                    requestResponse = JSON.parse(requestResponse.replace(/	/gim, ' ').replace(/\\'/gim, "\'").replace(/\r?\n|\r/gim, '').replace(/\\\&/gim, '\&'));
                                } catch (e) {
                                    void 0;
                                    jsonlint.parse(requestResponse.replace(/	/gim, ' ').replace(/\\'/gim, "\'").replace(/\r?\n|\r/gim, '').replace(/\\\&/gim, '\&'));
                                }
                            }
                            if (requestResponse.response.status.code !== 100)
                                void 0;
                            else {
                                let boundary = null;
                                emailParts[i].header = '';
                                emailParts[i].folder = /SF_JUNK/.test(eventDetails.selectedMessagesIds[i].split('%')[1]) ? 1 : 2;
                                requestResponse.response.mail.headerProperty.forEach(function (item) {
                                    if (/Content-Transfer-Encoding/i.test(item.name))
                                        return;
                                    if (/Content-Type/i.test(item.name)) {
                                        if (/boundary\s*=/i.test(item.value)) {
                                            boundary = item.value.match(/boundary\s*=\s*"([^\"]*)"/, "$1");
                                            if (boundary && boundary.length)
                                                boundary = boundary[1];
                                            else boundary = null;
                                            emailParts[i].header += (item.name + ': ' + item.value + '\n');
                                        } else emailParts[i].header += "Content-Type: text/html; charset=utf-8\n";
                                    } else emailParts[i].header += (item.name + ': ' + item.value + '\n');
                                });
                                if (boundary)
                                    boundary = boundary.replace(/\n/g, '');
                                emailParts[i].header += "\n";
                                if (boundary) {
                                    emailParts[i].header += "--" + boundary + "\n";
                                    emailParts[i].header += "Content-Type: text/html; charset=utf-8\nContent-Transfer-Encoding: quoted-printable\n\n";
                                }
                                emailParts[i].header += requestResponse.response.mail.message;
                                if (boundary)
                                    emailParts[i].header += '\n--' + boundary + '--\n';
                            }
                        }
                        if (context.displaySideBar)
                            startUserReport(emailParts);
                        if (context.callback)
                            context.callback(emailParts);
                    });
                }
            }
                break;
            case PARAM.ORANGEOXDOMAIN: {
                emailParts = [];
                if (eventDetails && eventDetails.mid.length === 0) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }
                queue = new verifrom.request.Queue();

                for (let i = 0; i < eventDetails.mid.length; i++) {
                    let requestUrl = `https://${window.top.location.host}/appsuite/api/mail?action=get&timezone=utc&id=${eventDetails.mid[i]}&view=eml&src=1&save=1&folder=${encodeURIComponent(eventDetails.fid[i])}&session=${eventDetails.sessionId}`;
                    queue.addRequest({
                        type: "GET",
                        url: requestUrl
                        , headers: {
                            "Accept": "application/json, text/javascript, */*; q=0.01"
                        }
                    });
                }

                queue.done(function (queueArray) {
                    if (queueArray.length === 0) {
                        notifyUser("error2");
                        return undefined;
                    }

                    for (let i = 0; i < queueArray.length; i++) {
                        emailParts[i] = {};
                        emailParts[i].header = queueArray[i].responseText;
                        emailParts[i].folder = /QUARANTAINE/i.test(eventDetails.fid[i]) ? 1 : 2;
                    }
                    if (context.displaySideBar)
                        startUserReport(emailParts);
                    if (context.callback)
                        context.callback(emailParts);
                });
            }
                break;
            case PARAM.ORANGEPRODOMAIN: {
                emailParts = [];
                if (eventDetails && eventDetails.empty === true) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }
                queue = new verifrom.request.Queue();

                for (let i = 0; i < eventDetails.mid.length; i++) {
                    locationObj = $(location)[0];
                    try {
                        let formData = {
                            "token": eventDetails.token,
                            "_IDMSG": eventDetails.mid[i],
                            "_FOLDER": eventDetails.fid[i]
                        };
                        queue.addRequest(
                            {
                                type: "POST",
                                url: eventDetails.url + "?request.preventCache=" + Date.now() + "&request.source=webapp",
                                contentType: 'application/x-www-form-urlencoded;',
                                dataType: "text",
                                data: formData
                            });
                    } catch (err) {
                        void 0;
                    }
                }
                queue.done(function (queueArray) {
                    if (queueArray.length === 0) {
                        notifyUser("error2");
                        return undefined;
                    }

                    for (let i = 0; i < queueArray.length; i++) {
                        try {
                            let requestResponse = queueArray[i];
                            if (requestResponse.status < 200 || requestResponse.status >= 400) {
                                void 0;
                                notifyUser("nomail1");
                            } else {
                                let email = {};
                                if (typeof requestResponse.responseText === 'string') {
                                    try {
                                        requestResponse.response = JSON.parse(requestResponse.responseText.replace(/^{}&&/, '')).response;
                                    } catch (e) {
                                        void 0;
                                        requestResponse.response = jsonlint.parse(requestResponse.responseText.replace(/^{}&&/, '')).response;
                                    }
                                }
                                if (requestResponse.response.status.code !== "100")
                                    void 0;
                                else {
                                    let boundary;
                                    boundary = null;
                                    email.header = '';
                                    email.folder = eventDetails.fid[i] === "SF_JUNK" ? 1 : 2;
                                    requestResponse.response.mail.headerProperty.forEach(function (item) {
                                        if (/Content-Transfer-Encoding/i.test(item.name))
                                            return;
                                        if (/Content-Type/i.test(item.name)) {
                                            if (/boundary\s*=/i.test(item.value)) {
                                                boundary = item.value.match(/boundary\s*=\s*"([^\"]*)"/, "$1");
                                                if (boundary && boundary.length)
                                                    boundary = boundary[1];
                                                else boundary = null;
                                                email.header += (item.name + ': ' + item.value + '\n');
                                            } else email.header += "Content-Type: text/html; charset=utf-8\n";
                                        } else email.header += (item.name + ': ' + item.value + '\n');
                                    });
                                    if (boundary)
                                    { 
                                        boundary = boundary.replace(/\n/g, '');
                                    }
                                    email.header += "\n";
                                    if (boundary) {
                                        email.header += "--" + boundary + "\n";
                                        email.header += "Content-Type: text/html; charset=utf-8\nContent-Transfer-Encoding: quoted-printable\n\n";
                                    }
                                    email.header += requestResponse.response.mail.message;
                                    if (boundary)
                                        email.header += '\n--' + boundary + '--\n';
                                    emailParts.push(email);
                                }
                            }
                        } catch (e) {
                            void 0;
                        }
                    }
                    if (context.displaySideBar)
                        startUserReport(emailParts);
                    if (context.callback)
                        context.callback(emailParts);
                });

            }
                break;
            case PARAM.ORANGEDOMAIN: {
                emailParts = [];
                if (eventDetails && eventDetails.empty === true) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }
                if (eventDetails.multiselection === true) {
                    queue = new verifrom.request.Queue();

                    for (let i = 0; i < eventDetails.mid.length; i++) {
                        locationObj = $(location)[0];
                        try {
                            queue.addRequest(
                                {
                                    type: "GET",
                                    url: locationObj.origin + '/webmail/fr_FR/read.html?IDMSG=' + eventDetails.mid[i] + '&FOLDER=' + eventDetails.fid[i],
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8'
                                });
                        } catch (err) {
                            void 0;
                        }
                    }
                    queue.done(function (queueArray) {
                        if (queueArray.length === 0) {
                            notifyUser("error2");
                            return undefined;
                        }

                        let sanitizedCount = queueArray.length;
                        for (let i = 0; i < queueArray.length; i++) {
                            let requestResponse = queueArray[i];
                            emailParts[i] = {header: '', links: [], body: '', folder: 2}; 

                            if (requestResponse.status < 200 || requestResponse.status >= 400) {
                                void 0;
                                notifyUser("nomail1");
                            } else {
                                let htmlCode = requestResponse.responseText;
                                if (typeof htmlCode === 'string') {
                                    try {
                                        let folderName = eventDetails.fid[i];
                                        verifrom.dom.createSanitizedDoc("", htmlCode, function (newDoc) {
                                            let headerElements = $('.header-content>strong', newDoc);
                                            let header = "";
                                            let boundary = "";
                                            for (let j = 0; j < headerElements.length; j++) {
                                                let newline = headerElements[j].innerText;
                                                let nextSibling = headerElements[j].nextSibling;
                                                while (nextSibling) {
                                                    if (j < headerElements.length && nextSibling !== headerElements[j + 1]) {
                                                        if (/^\s+/.test(nextSibling.textContent))
                                                            newline += "\n\t" + nextSibling.textContent.replace(/^\s+/, '');
                                                        else
                                                            newline += nextSibling.textContent;
                                                        nextSibling = nextSibling.nextSibling;
                                                    } else nextSibling = null;
                                                }
                                                if (/^content-type.*boundary\s*=/i.test(newline))
                                                    boundary = newline.replace(/^Content-Type.*;\s*boundary\s*=\s*"([^\"]*)"/img, "$1");
                                                else if (/^content-type/i.test(newline))
                                                    newline = "Content-Type: text/html; charset=utf-8";
                                                if (/^Content-Transfer-Encoding/i.test(newline) === false)
                                                    header += newline + "\n";
                                            }
                                            if (boundary)
                                                boundary = boundary.replace(/\n/g, '');
                                            header += "\n";
                                            if (boundary) {
                                                header += "--" + boundary + "\n";
                                                header += "Content-Type: text/html; charset=utf-8\nContent-Transfer-Encoding: quoted-printable\n\n";
                                            }

                                            verifrom.dom.createSanitizedDoc("", $(".mail-content-read", newDoc.body).html(), function (newDoc) {
                                                header += '<html>';
                                                if (newDoc.head && newDoc.head.innerHTML) {
                                                    header += '<head>' + newDoc.head.innerHTML + '</head>';
                                                }
                                                header += '<body>';
                                                header += newDoc.body.innerHTML;
                                                header += '</body></html>\n';
                                                if (boundary)
                                                    header += '--' + boundary + '--\n';

                                                emailParts[i] = {
                                                    header: header,
                                                    folder: folderName === 'SF_JUNK' ? 1 : 2
                                                };
                                                sanitizedCount--;
                                                if (sanitizedCount === 0) {
                                                    if (context.displaySideBar)
                                                        startUserReport(emailParts);
                                                    if (context.callback)
                                                        context.callback(emailParts);
                                                }
                                            });
                                        });
                                    } catch (e) {
                                        void 0;
                                    }
                                }
                            }
                        }
                    });
                } else {
                    let emailElement = $(PARAM.MAILBODYSEARCHSTRING[pageDomainId], $(PARAM.MSGCONTAINERELEMENTID[pageDomainId]));
                    let mailHTMLBody = undefined;
                    emailParts = [];

                    if (emailElement && emailElement.length === 1) {
                        mailHTMLBody = getMailBody(emailElement.get(0));
                    } else {
                        void 0;
                        notifyUser("nomail1");
                        return undefined;
                    }

                    let emailHeaders = $('.header-content', $(PARAM.MSGCONTAINERELEMENTID[pageDomainName]));
                    let header = "";
                    if (emailHeaders && emailHeaders.length === 1) {
                        let headerElements = $('.header-content>strong');
                        let boundary = "";
                        for (let i = 0; i < headerElements.length; i++) {
                            let newline = headerElements[i].innerText;
                            let nextSibling = headerElements[i].nextSibling;
                            while (nextSibling) {
                                if (i < headerElements.length && nextSibling !== headerElements[i + 1]) {
                                    if (/^\s+/.test(nextSibling.textContent))
                                        newline += "\n\t" + nextSibling.textContent.replace(/^\s+/, '');
                                    else
                                        newline += nextSibling.textContent;
                                    nextSibling = nextSibling.nextSibling;
                                } else nextSibling = null;
                            }
                            if (/^content-type.*boundary\s*=/i.test(newline))
                                boundary = newline.replace(/^Content-Type.*;\s*boundary\s*=\s*"([^\"]*)"/img, "$1");
                            else if (/^content-type/i.test(newline))
                                newline = "Content-Type: text/html; charset=utf-8";
                            if (/^Content-Transfer-Encoding/i.test(newline) === false)
                                header += newline + "\n";
                        }
                        if (boundary)
                            boundary = boundary.replace(/\n/g, '');
                        header += "\n";
                        if (boundary) {
                            header += "--" + boundary + "\n";
                            header += "Content-Type: text/html; charset=utf-8\nContent-Transfer-Encoding: quoted-printable\n\n";
                        }
                        verifrom.dom.createSanitizedDoc("", mailHTMLBody, function (newDoc) {
                            header += '<html>';
                            if (newDoc.head && newDoc.head.innerHTML) {
                                header += '<head>' + newDoc.head.innerHTML + '</head>';
                            }
                            header += '<body>';
                            header += newDoc.body.innerHTML;
                            header += '</body></html>\n';
                            if (boundary)
                                header += '--' + boundary + '--\n';
                            emailParts[0] = {
                                header: header,
                                folder: eventDetails.folder === 'SF_JUNK' ? 1 : 2
                            };
                            if (context.displaySideBar)
                                startUserReport(emailParts);
                            if (context.callback)
                                context.callback(emailParts);
                        });
                    } else {
                        void 0;
                        notifyUser("nomail1");
                        return undefined;
                    }
                }
            }
                break;
        }
    }

    function getRawMail(rawMailParams, displaySideBar, callback) {
        let i;
        let HTMLResponse = {header: undefined, body: undefined, links: undefined};
        let elements = null;

        void 0;
        switch (pageDomainName) {
            case PARAM.RCFREEDOMAIN:
            case PARAM.RCOVHDOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('RoundCubeProxyRequest', {}));
                break;
            case PARAM.BLUEWINDOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('BluewinProxyRequest', {}));
                break;
            case PARAM.AOLDOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('AOLProxyRequest', {}));
                break;
            case PARAM.LAPOSTEV2DOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('LAPOSTEV2ProxyRequest', {}));
                break;
            case PARAM.ZIMBRAFREEDOMAIN:
            case PARAM.LAPOSTEDOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('ZimbraProxyRequest', {}));
                break;
            case PARAM.BETAOWADOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('BETAOWAProxyRequest', {detail: {"rootObject": PARAM.PROXY_DATA.BETAOWADOMAIN.ROOT}}));
                break;
            case PARAM.OWADOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('OWAProxyRequest', {detail: {"rootObject": PARAM.PROXY_DATA.OWADOMAIN.ROOT}}));
                break;
            case PARAM.LIVEDOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('LiveProxyRequest', {}));
                break;
            case PARAM.ATELIERSFRDOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('AtelierSFRProxyRequest', {}));
                break;
            case PARAM.SFRDOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('SFRProxyRequest', {}));
                break;
            case PARAM.GMAILV2DOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('GmailV2ProxyRequest', {detail: {"rootObject": PARAM.PROXY_DATA.GOOGLEDOMAIN.ROOT}}));
                break;
            case PARAM.GOOGLEDOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('GmailProxyRequest', {detail: {"rootObject": PARAM.PROXY_DATA.GOOGLEDOMAIN.ROOT}}));
                break;
            case PARAM.YMAILDORRINDOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('YMailDorrinProxyRequest', {}));
                break;
            case PARAM.YMAILNORRINDOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('YMailNorrinProxyRequest', {}));
                break;
            case PARAM.ORANGEPRODOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('OrangeProProxyRequest', {}));
                break;
            case PARAM.ORANGEOXDOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('OrangeOXProxyRequest', {}));
                break;
            case PARAM.ORANGEDOMAIN:
                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));
                verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('OrangeProxyRequest', {}));
                break;
            case PARAM.YAHOODOMAIN:
                let clickedToUnwrap = false;
                let threadElement1 = window.document.querySelectorAll('.tab-content:not(.offscreen)>.threadpane>.message.thread-content.content>.thread-item-list>.thread-item');
                let threadElement2 = window.document.querySelectorAll('.prevPaneVisible:not(.offscreen)>.threadpane>.message.thread-content.content>.thread-item-list>.thread-item');
                let threadElement = [];
                threadElement = threadElement1.length > 0 ? threadElement1 : threadElement2;

                if (threadElement.length > 0) {
                    if ($('.email-wrapped', threadElement[0]) === null || $('.email-wrapped', threadElement[0]).length === 0) {
                        void 0;
                        clickedToUnwrap = true;
                        threadElement[0].click();
                        let oh=threadElement[0].offsetHeight;
                        $(window).trigger('resize');
                    }
                }

                elements = {'displaySideBar': displaySideBar, 'callback': callback};
                verifrom.customEvent.one('Proxy', $.proxy(handleRawMail, this, elements));

                if (clickedToUnwrap) {
                    verifrom.setTimeout(function () {
                        threadElement[0].click();
                        $(window).trigger('resize');
                        let oh=threadElement[0].offsetHeight;
                        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('YAHOOProxyRequest', {}));
                    }, 500);
                } else {
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('YAHOOProxyRequest', {}));
                }
                break;
            case PARAM.IMPFREEDOMAIN:
                let selectedEmailsIndexes = [];
                let folderName;

                if (pageUrl.match(/mailbox.php/)) {
                    let emailsList = window.document.querySelectorAll('input[name*=indices]');

                    for (i = 0; i < emailsList.length; i++) {
                        if (emailsList[i].checked)
                            selectedEmailsIndexes.push(emailsList[i].value);
                    }
                } else if (pageUrl.match(/message.php/)) {
                    selectedEmailsIndexes.push(window.document.querySelectorAll('input[name=index]')[0].value);
                }

                if (selectedEmailsIndexes.length === 0) {
                    void 0;
                    notifyUser("nomail1");
                    return undefined;
                }

                folderName = window.document.querySelector('select[name=mailbox]');
                folderName = folderName.querySelectorAll('option[selected]')[0].value;
                folderName = encodeURIComponent(folderName);

                void 0;
                HTMLResponse = [];

                for (i = 0; i < selectedEmailsIndexes.length; i++) {
                    HTMLResponse[i] = [];
                    HTMLResponse[i]['header'] = $.ajax({
                        type: "GET",
                        url: window.document.location['origin'] + '/horde/imp/view.php?thismailbox=' + folderName + '&index=' + selectedEmailsIndexes[i] + '&id=0&actionID=115&mime=',
                        async: false
                    }).responseText;
                    HTMLResponse[i]['folder'] = folderName;
                    void 0;
                }
                if (callback)
                    callback(HTMLResponse);
                return HTMLResponse;
        }
    }

    function decodeMime(stringToDecode, sender) {
        let stringToDecodeBin;
        let qpdecode;
        if (stringToDecode && stringToDecode.length > 0) {
            if (/^\"?=\?UTF-8\?B\?/i.test(stringToDecode)) {
                try {
                    if (sender === true && /^\s*\"/.test(stringToDecode))
                        stringToDecode = stringToDecode.replace(/^\s*\"=\?UTF-8\?B\?(.*)\?=\s*\"(.*)$/ig, '"$1" $2');
                    else stringToDecode = stringToDecode.replace(/^\"?=\?UTF-8\?B\?(.*)=?=?\?=$/ig, '$1');
                    stringToDecode = stringToDecode.replace(/^=\?[^\?]*?\?B\?/ig, '');
                    stringToDecode = stringToDecode.replace(/\?==\?[^\?]*?\?B\?/ig, '');
                    stringToDecode = atob(stringToDecode);
                    stringToDecode = decodeURIComponent(escape(stringToDecode));
                } catch (e) {
                    void 0;
                }
            } else if (/^\"?=\?UTF-8\?Q\?/i.test(stringToDecode)) {
                try {
                    if (sender === true && /^\s*\"/.test(stringToDecode))
                        stringToDecode = stringToDecode.replace(/^\s*\"=\?UTF-8\?Q\?(.*)\?=\s*\"(.*)$/ig, '"$1" $2');
                    else
                        stringToDecode = stringToDecode.replace(/^\"?=\?UTF-8\?Q\?(.*)=?=?\?=(.*)/i, '$1 $2');
                    stringToDecode = stringToDecode.replace(/^=\?[^\?]*?\?Q\?/i, '');
                    stringToDecode = stringToDecode.replace(/\?==\?[^\?]*?\?Q\?/ig, '');
                    stringToDecode = stringToDecode.replace("%", "=25");
                    stringToDecode = stringToDecode.replace(/=/g, '%');
                    stringToDecode = stringToDecode.replace(/_/g, ' ');
                    stringToDecode = decodeURIComponent(stringToDecode);
                } catch (e) {
                    void 0;
                }
            } else if (/^\"?=\?[^\?]*?\?Q\?/i.test(stringToDecode)) {
                try {
                    if (sender === true && /^\s*\"/i.test(stringToDecode))
                        stringToDecode = stringToDecode.replace(/^\s*\"=\?[^\?]*?\?Q\?(.*)\?=\s*\"(.*)$/ig, '"$1" $2');
                    else stringToDecode = stringToDecode.replace(/^\"?=\?[^\?]*?\?Q\?(.*)=?=?\?=$/i, '$1');
                    stringToDecode = stringToDecode.replace(/^=\?[^\?]*?\?Q\?/i, '');
                    stringToDecode = stringToDecode.replace(/\?==\?[^\?]*?\?Q\?/ig, '');
                    qpdecode = function (str) {
                        str = (str || '').toString().
                        replace(/[\t ]+$/gm, '').
                        replace(/\=(?:\r?\n|$)/g, '');

                        let encodedBytesCount = (str.match(/\=[\da-fA-F]{2}/g) || []).length,
                            chr, hex,
                            buffer = [],
                            bufferPos = 0;

                        for (let i = 0, len = str.length; i < len; i++) {
                            chr = str.charAt(i);
                            if (chr === '=' && (hex = str.substr(i + 1, 2)) && /[\da-fA-F]{2}/.test(hex)) {
                                buffer[bufferPos++] = parseInt(hex, 16);
                                i += 2;
                                continue;
                            }
                            buffer[bufferPos++] = chr.charCodeAt(0);
                        }

                        return buffer;
                    };
                    stringToDecodeBin = qpdecode(stringToDecode);
                    stringToDecode = String.fromCharCode.apply(null, stringToDecodeBin);
                    stringToDecode = stringToDecode.replace(/_/g, " ");
                } catch (e) {
                    void 0;
                }
            } else if (/^\"?=\?[^\?]*?\?B\?/i.test(stringToDecode)) {
                try {
                    if (sender === true && /^\s*\"/i.test(stringToDecode))
                        stringToDecode = stringToDecode.replace(/^\s*\"=\?[^\?]*?\?B\?(.*)\?=\s*\"(.*)$/ig, '"$1" $2');
                    else stringToDecode = stringToDecode.replace(/^\"?=\?[^\?]*?\?B\?(.*)=?=?\?=$/i, '$1');
                    stringToDecode = stringToDecode.replace(/^=\?[^\?]*?\?B\?/i, '');
                    stringToDecode = stringToDecode.replace(/\?==\?[^\?]*?\?B\?/ig, '');
                    stringToDecode = atob(stringToDecode);
                    qpdecode = function (str) {
                        str = (str || '').toString().
                        replace(/[\t ]+$/gm, '').
                        replace(/\=(?:\r?\n|$)/g, '');

                        let encodedBytesCount = (str.match(/\=[\da-fA-F]{2}/g) || []).length,
                            chr, hex,
                            buffer = [],
                            bufferPos = 0;

                        for (let i = 0, len = str.length; i < len; i++) {
                            chr = str.charAt(i);
                            if (chr === '=' && (hex = str.substr(i + 1, 2)) && /[\da-fA-F]{2}/.test(hex)) {
                                buffer[bufferPos++] = parseInt(hex, 16);
                                i += 2;
                                continue;
                            }
                            buffer[bufferPos++] = chr.charCodeAt(0);
                        }

                        return buffer;
                    };
                    stringToDecodeBin = qpdecode(stringToDecode);
                    stringToDecode = String.fromCharCode.apply(null, stringToDecodeBin);
                    stringToDecode = stringToDecode.replace(/_/g, " ");
                } catch (e) {
                    void 0;
                }
            }
        }
        return stringToDecode;
    }

    function extractSubjectAndSender(emailContent) {
        let done = 0;
        let senderId = "";
        let emailSubject = "";
        let headers = emailContent.header.split('\n');
        let SubjectFound = false;
        let FromFound = false;
        for (let i = 0; i < headers.length && done < 2; i++) {
            if (/^\s*$/.test(headers[i])) {
                done = 2;
                continue;
            }
            if (FromFound === true && /^\s+/.test(headers[i])) {
                senderId += headers[i].replace(/\s*(.*)\s*$/, '$1');
            } else if (FromFound === true && /^\s+/.test(headers[i]) === false) {
                FromFound = null;
                done++;
            }
            if (SubjectFound === true && /^\s+/.test(headers[i])) {
                emailSubject += headers[i].replace(/\s*(.*)\s*$/, '$1');
            } else if (SubjectFound === true && /^\s+/.test(headers[i]) === false) {
                SubjectFound = null;
                done++;
            }
            if (/^From:/.test(headers[i])) {
                senderId = headers[i].replace(/^From:\s*(.*)\s*$/, '$1');
                FromFound = true;
            }
            if (/^Subject:/.test(headers[i])) {
                emailSubject = headers[i].replace(/^Subject:\s*(.*)\s*$/, '$1');
                SubjectFound = true;
            }
        }

        emailContent.subject = decodeMime(emailSubject, false);
        emailContent.sender = decodeMime(senderId, true);
    }

    function anonymizeMailHeader(header,subject,sender) {
        let headerLine;
        let i,j,k=0;
        if (!PARAM.UNDISCLOSED_RECIPIENT)
            return header;
        if (!header)
            return header;
        const headersToReplace = [
            "To",
            "Recipient",
            "Delivered-To",
            "X-Delivered-to",
            "X-Resolved-to",
            "Cc",
            "Bcc",
            "Resent-To",
            "Resent-CC",
            "Resent-BCC",
            "Alternate-Recipient",
            "Disclose-Recipients",
            "Downgraded-Bcc",
            "Downgraded-Cc",
            "Downgraded-Final-Recipient",
            "Downgraded-Original-Recipient",
            "Downgraded-Rcpt-To",
            "Downgraded-Resent-Bcc",
            "Downgraded-Resent-Cc",
            "Downgraded-Resent-To",
            "Downgraded-To",
            "X400-Recipients",
            "Original-Recipient"
        ];
        let emailAddresses = [];
        let names = [];
        let headers = header.replace(/\n\n.*/gm, ' ').replace(/\n\s+/gm, ' ').split('\n');
        try {
            let done = false;
            for (k = 0; k < headers.length && done === false; k++) {
                headerLine = headers[k];
                if (headerLine.length === 0) {
                    done = true;
                    continue;
                }
                for (let i = 0; i < headersToReplace.length; i++) {
                    let re = new RegExp("(^" + headersToReplace[i] + ":\\s{1,})(.*)$", "img");
                    if (!headerLine.match(re))
                        continue;
                    let headerValue = headerLine.replace(re, '$2');
                    headerValue = headerValue.split(',');
                    for (j = 0; j < headerValue.length; j++) {
                        const re2 = /(([^<]+)<)*(([\s\w\.#\$%&'\*\+-\/=\?\^_`\{\|\}~!"]+)@([^>]*))>?/gi;
                        let mailAddress = re2.exec(headerValue[j].trim()); 
                        if (mailAddress && mailAddress.length === 6) {
                            if (mailAddress[3] && mailAddress[3].length > 0)
                                emailAddresses.push(mailAddress[3]);
                            if (mailAddress[2] && mailAddress[2].length > 0) {
                                try {
                                    names.push.apply(names, mailAddress[2].trim().toLowerCase().split(/\s+/g).filter(function (a) {
                                        return a.length > 0
                                    }));
                                } catch (e) {
                                    void 0;
                                }
                            }
                        }
                    }
                }
                headers[k] = headerLine;
            }
            void 0;
            headers = header.split('\n');
            if (emailAddresses.length > 0) {
                emailAddresses = Array.from(new Set(emailAddresses));
                for (i = 0; i < emailAddresses.length; i++) {
                    for (k = 0; k < headers.length; k++) {
                        headerLine = headers[k];
                        if (headerLine.length < emailAddresses[i].length) {
                            continue;
                        }
                        headers[k] = headers[k].split(emailAddresses[i]).join(PARAM.UNDISCLOSED_RECIPIENT || "UNDISCLOSED_RECIPIENT@UNDISCLOSEDDOMAIN.TLD");
                    }
                }
            }
            try {
                if (names.length > 0) {
                    names = Array.from(new Set(names));
                    for (i = 0; i < names.length; i++) {
                        if (names[i].length < (PARAM.MINIMUM_NAME_LENGTH || 3))
                            continue;
                        for (k = 0; k < headers.length; k++) {
                            headerLine = headers[k];
                            if (headerLine.length < names[i].length) {
                                continue;
                            }
                            headers[k] = headers[k].replace(new RegExp("\\b" + names[i] + "\\b", 'gim'), PARAM.UNDISCLOSED_NAME || "UNDISCLOSED");
                        }
                    }
                }
            } catch (e) {
                void 0;
            }
        } catch (e) {
            headers = header.split('\n');
            void 0;
        }
        return headers.join("\n");
    }

    if (extensionConfig.appInfo.safari === true) {
        var startUserReport = function (emailContent) {
            if (emailContent && emailContent instanceof Array) {
                for (let email of emailContent) {
                    if (!email.header || email.header.length === 0)
                        continue;
                    extractSubjectAndSender(email);
                    email.header = anonymizeMailHeader(email.header, email.subject, email.from);
                }
            } else {
                extractSubjectAndSender(emailContent);
                email.header = anonymizeMailHeader(emailContent.header, emailContent.subject, emailContent.from);
            }
            if (emailContent !== undefined) {
                let reportsNumber = 0;
                let reportId = Date.now();
                if (emailContent.length > 1 && emailContent.header === undefined) {
                    verifrom.message.toBackground({
                        report: emailContent,
                        reportId: reportId
                    }, {channel: "reportMutipleEmails"});
                    reportsNumber = emailContent.length;
                } else if (emailContent.length === 1 && emailContent.header === undefined) {
                    verifrom.message.toBackground({
                        report: emailContent[0],
                        reportId: reportId
                    }, {channel: "reportSingleEmail"});
                    reportsNumber = 1;
                } else {
                    verifrom.message.toBackground({
                        report: emailContent,
                        reportId: reportId
                    }, {channel: "reportSingleEmail"});
                    reportsNumber = 1;
                }
                waitForReportCompletion(reportsNumber, reportId, emailContent);
            } else verifrom.message.toBackground({reason: "An error occured"}, {channel: "reportError"});
        };

        var startPhishingUserReport = function (emailContent) {
            let checkId = null;
            if (typeof this === "object")
                checkId = this.checkId;
            if (emailContent && emailContent instanceof Array) {
                for (let email of emailContent) {
                    if (!email.header || email.header.length === 0)
                        continue;
                    extractSubjectAndSender(email);
                    email.header = anonymizeMailHeader(email.header, email.subject, email.from);
                }
            } else {
                extractSubjectAndSender(emailContent);
                email.header = anonymizeMailHeader(emailContent.header, emailContent.subject, emailContent.from);
            }
            if (emailContent !== undefined) {
                if (emailContent.length > 1 && emailContent.header === undefined) {
                    verifrom.message.toBackground({
                        report: emailContent[0],
                        checkId: checkId
                    }, {channel: "reportPhishingEmail"});
                } else if (emailContent.length === 1 && emailContent.header === undefined) {
                    verifrom.message.toBackground({
                        report: emailContent[0],
                        checkId: checkId
                    }, {channel: "reportPhishingEmail"});
                } else {
                    verifrom.message.toBackground({
                        report: emailContent,
                        checkId: checkId
                    }, {channel: "reportPhishingEmail"});
                }
                waitForReportCompletion(1, checkId, emailContent);
            } else verifrom.message.toBackground({
                reason: "An error occured",
                checkId: checkId
            }, {channel: "reportError"});
        };

        var waitForReportCompletion = function (reportsNumber, reportId, emailContent) {
            displayMask();
            verifrom.message.addListener({channel: "PayloadPosted"}, function (msg) {
                if (msg.reportId !== reportId)
                    return;
                void 0;
                hideMask();
                feedbackLoop(emailContent);
            });
            verifrom.message.addListener({channel: "PayloadFailed"}, function (msg) {
                if (msg.reportId !== reportId)
                    return;
                hideMask();
            });
        };

    } else {

        var getContentToDisplay = function (emailContent) {
            let contentDisplayed;

            if (emailContent.links || emailContent.body) {
                contentDisplayed = '<table><tbody>';
                if (emailContent.header && (typeof emailContent.header === 'string')) {
                    contentDisplayed += '<tr><td><strong><i>En-tête&nbsp;:</i></td><td><pre>' + emailContent.header.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre></td></tr>';
                }
                if (emailContent.header && (typeof emailContent.header !== 'string')) {
                    for (let i = 0; i < emailContent.header.length; i++) {
                        let headerLine = emailContent.header[i].replace(/</g, '&lt;').replace(/>/g, '&gt;');
                        contentDisplayed += '<tr><td><strong><i>En-tête&nbsp;:</i></strong></td><td><pre>' + headerLine + '<BR></pre></td></tr>';
                    }
                }

                if (emailContent.links && (typeof emailContent.links === 'string')) {
                    contentDisplayed += '<tr><td><strong><i>Liens&nbsp;:</i></strong></td><td><pre>' + emailContent.links + '</pre></td></tr>';
                }
                if (emailContent.links && (typeof emailContent.links !== 'string')) {
                    contentDisplayed += '<tr><td><strong><i>Liens&nbsp;:</i></strong></td><td><pre>' + emailContent.links.join('<BR>') + '</pre></td></tr>';
                }

                contentDisplayed += '<tr><td><strong><i>Message&nbsp;:</i></strong></td>';
                contentDisplayed += '<td><pre style="padding-top: 2em;' +
                    '    display: block;' +
                    '    position: relative;' +
                    '    z-index: 0;">';
                const limit = 7000;
                let bodyToDisplay = emailContent.body || '';
                let bodyContentDisplayed = bodyToDisplay.substr(0, limit).replace(/</g, '&lt;').replace(/>/g, '&gt;');
                if (bodyToDisplay.length > limit)
                    bodyContentDisplayed += '</pre><span style="color:blue;">[...]</span>';
                if (bodyToDisplay.length > 2 * limit) {
                    bodyContentDisplayed += '<pre>' + (emailContent.substr(bodyToDisplay.length - limit, limit).replace(/</gm, '&lt;').replace(/>/gm, '&gt;'));
                } else if (emailContent.header.length > (1.5 * limit)) {
                    bodyContentDisplayed += '<pre>' + (emailContent.substr(bodyToDisplay.length - (limit / 2), limit / 2).replace(/</gm, '&lt;').replace(/>/gm, '&gt;'));
                } else bodyContentDisplayed += '<pre>';
                contentDisplayed += bodyContentDisplayed;
                contentDisplayed += '</pre></td></tr>';
                contentDisplayed += '</tbody></table>'
            } else {
                contentDisplayed = '<pre style="padding-top: 2em;' +
                    '    display: block;' +
                    '    position: relative;' +
                    '    z-index: 0;">';
                const limit = 7000;
                let bodyContentDisplayed = emailContent.header.substr(0, limit).replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
                if (emailContent.header.length > limit)
                    bodyContentDisplayed += '</pre><span style="color:blue;">[...]</span>';
                if (emailContent.header.length > 2 * limit) {
                    bodyContentDisplayed += '<pre>' + emailContent.header.substr(emailContent.header.length - limit, limit).replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
                } else if (emailContent.header.length > (1.5 * limit)) {
                    bodyContentDisplayed += '<pre>' + emailContent.header.substr(emailContent.header.length - (limit / 2), limit / 2).replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
                } else bodyContentDisplayed += '<pre>';
                contentDisplayed += bodyContentDisplayed;
                contentDisplayed += '</pre>';
            }
            return contentDisplayed;
        };


        var openOriginal = function (event) {
            verifrom.sanitizer.getSanitizedHTMLContent(encodeURIComponent(event.data.rawmail), function (rawMailContent) {
                let divWindow = document.createElement('div');
                divWindow.id = verifrom.appInfo.extensionCodeName + "zommOnOriginalDiv";
                divWindow.className = verifrom.appInfo.extensionCodeName + "zommOnOriginalDiv";
                divWindow.setAttribute('tabindex', 0);
                let newWindow = document.createElement('iframe');
                newWindow.id = "VF_zoomOnOriginal";
                newWindow.className = "SPiframeSource";
                newWindow.onload = function () {
                    newWindow.contentDocument.body.innerHTML = event.data.rawmail;
                    divWindow.addEventListener('click', function () {
                        if (divWindow.parentNode)
                            divWindow.parentNode.removeChild(divWindow);
                    });
                    divWindow.addEventListener('keydown', function (e) {
                        if (e.keyCode === 27 || e.keyCode === 13) {
                            if (divWindow.parentNode)
                                divWindow.parentNode.removeChild(divWindow);
                        }
                    });
                    newWindow.contentDocument.body.addEventListener('keydown', function (e) {
                        if (e.keyCode === 27 || e.keyCode === 13) {
                            if (divWindow.parentNode)
                                divWindow.parentNode.removeChild(divWindow);
                        }
                    });
                    divWindow.focus();
                };
                window.top.document.body.appendChild(divWindow);
                divWindow.appendChild(newWindow);
            });
        };

        var openOriginalMultiple = function (event) {
            verifrom.sanitizer.getSanitizedHTMLContent(encodeURIComponent(event.data.rawmail), function (rawMailContent) {
                let divWindow = document.createElement('div');
                divWindow.id = verifrom.appInfo.extensionCodeName + "zommOnOriginalDiv";
                divWindow.className = verifrom.appInfo.extensionCodeName + "zommOnOriginalDiv";
                divWindow.setAttribute('tabindex', 0);
                let newWindow = document.createElement('iframe');
                newWindow.id = "VF_zoomOnOriginal";
                newWindow.className = "SPiframeSource";
                let currentPage = 0;
                let loadPage = function () {
                    let emailsContent = rawMailContent.split("--VERIFROM--MAIL--SEPARATOR--");
                    newWindow.contentDocument.body.innerHTML = '<div style="z-index:1; color: white;font-weight: bold;background: darkgrey;text-align: center;position: fixed;top: auto;width: 50%;left: 25%;padding-left: 2%;padding-right: 2%;"><span id="previous" style="float: left; cursor: w-resize;">←</span>&nbsp;<span id="pageNumber">' + (currentPage + 1) + '/' + (emailsContent.length) + '</span>&nbsp;<span id="next" style="float: right; cursor: e-resize;">→</span></div>' + unescape(emailsContent[currentPage]);
                    divWindow.addEventListener('click', function () {
                        if (divWindow.parentNode)
                            divWindow.parentNode.removeChild(divWindow);
                    });
                    divWindow.addEventListener('keydown', function (e) {
                        if (e.keyCode === 27 || e.keyCode === 13) {
                            if (divWindow.parentNode)
                                divWindow.parentNode.removeChild(divWindow);
                        }
                    });
                    newWindow.contentDocument.body.addEventListener('keydown', function (e) {
                        if (e.keyCode === 27 || e.keyCode === 13) {
                            if (divWindow.parentNode)
                                divWindow.parentNode.removeChild(divWindow);
                        }
                    });
                    divWindow.focus();
                    newWindow.contentDocument.getElementById("previous").addEventListener("click", function () {
                        if (currentPage - 1 >= 0)
                            currentPage--;
                        setTimeout(loadPage, 50);
                    });
                    newWindow.contentDocument.getElementById("next").addEventListener("click", function () {
                        if (currentPage + 1 < emailsContent.length)
                            currentPage++;
                        setTimeout(loadPage, 50);
                    });
                };
                newWindow.onload = loadPage;
                window.top.document.body.appendChild(divWindow);
                divWindow.appendChild(newWindow);
            });
        };

        var displaySideBarSpinner = function () {
            sidebar.showView('spinner');
        };

        var displaySideBarMultipleSelect = function (emailsContent) {
            let contentDisplayed = "";
            let allMailsInSpamFolder = true;

            for (let i = 0; i < emailsContent.length; i++) {
                let emailContent = emailsContent[i];
                extractSubjectAndSender(emailContent);
                emailContent.header = anonymizeMailHeader(emailContent.header, emailContent.subject, emailContent.sender);
                contentDisplayed += getContentToDisplay(emailContent);
                if (i + 1 < emailsContent.length)
                    contentDisplayed += "--VERIFROM--MAIL--SEPARATOR--";
                allMailsInSpamFolder &= emailContent.folder === 1;
            }
            verifrom.sanitizer.getSanitizedHTMLContent(contentDisplayed, function (sanitizedContent) {
                sidebar.showView('reportMultipleEmails');
                sidebar.updateElementView('reportMultipleEmails', '#dataprivacy', 'checked', privacy);
                sidebar.updateElementView('reportMultipleEmails', '#feedback', 'checked', notifications);
                sidebar.updateTemplateView('reportMultipleEmails', '#VFSELECTEDMAILS', emailsContent.length.toString());
                sidebar.addViewListener('reportMultipleEmails', "click", '#zoomOriginalEmail', false, {rawmail: sanitizedContent}, openOriginalMultiple);
                displayMask();
                confirmReport('reportMultipleEmails', emailsContent);
            });
        };

        var displaySideBar = function (emailContent) {
            extractSubjectAndSender(emailContent);
            emailContent.header = anonymizeMailHeader(emailContent.header, emailContent.subject, emailContent.sender);
            let contentDisplayed = getContentToDisplay(emailContent);

            verifrom.sanitizer.getSanitizedHTMLContent(contentDisplayed, function (sanitizedContent) {
                let emailVignette = $("iframe[id$='EmailScaled']", sidebar.getViewFrame('reportEmail').contentDocument.body);
                if (emailVignette && emailVignette.length > 0)
                    emailVignette.contents().find("body").get(0).innerHTML = sanitizedContent;
                sidebar.addViewListener('reportEmail', "click", '#zoomOriginalEmail', false, {rawmail: sanitizedContent}, openOriginal);
                sidebar.showView('reportEmail');
                sidebar.updateElementView('reportEmail', '#dataprivacy', 'checked', privacy);
                sidebar.updateElementView('reportEmail', '#feedback', 'checked', notifications);
                sidebar.updateTemplateView('reportEmail', '#fromvalue', emailContent.sender);
                sidebar.updateTemplateView('reportEmail', '#emailsubject', emailContent.subject);
                displayMask();
                confirmReport('reportEmail', emailContent, false);
            });
        };

        var startUserReport = function (emailContent) {
            if (emailContent !== undefined) {
                if (oneClickOption === true) {
                    oneClickOption = false;
                    if (emailContent.length > 1 && emailContent.header === undefined) {
                        for (let i=0;i<emailContent.length;i++) {
                            extractSubjectAndSender(emailContent[i]);
                            emailContent[i].header = anonymizeMailHeader(emailContent[i].header, emailContent[i].subject, emailContent[i].sender);
                        }
                        postReport(emailContent);
                    } else if (emailContent.length === 1 && emailContent.header === undefined) {
                        emailContent = emailContent[0];
                        extractSubjectAndSender(emailContent);
                        emailContent.header = anonymizeMailHeader(emailContent.header, emailContent.subject, emailContent.sender);
                        postReport(emailContent);
                    } else {
                        extractSubjectAndSender(emailContent);
                        emailContent.header = anonymizeMailHeader(emailContent.header, emailContent.subject, emailContent.sender);
                        postReport(emailContent);
                    }
                } else {
                    if (emailContent.length > 1 && emailContent.header === undefined) {
                        displaySideBarMultipleSelect(emailContent);
                    } else if (emailContent.length === 1 && emailContent.header === undefined) {
                        displaySideBar(emailContent[0]);
                    } else displaySideBar(emailContent);
                }
            }
        };

        var startSignalMail = function () {
            getRawMail(undefined, false, startUserReport);
        };

        var computeHash = function (hostname, port, path, query) {
            const ipv4v6Addr = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:)(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(hostname);
            let hostComponents;
            let trailingSlash = /\/$/.test(path) ? '/' : '';
            let hashCanonLink;
            let hashFullCanonLink;
            let computed = {hash: [], host: hostname, greyHash: null};

            hostComponents = hostname.split('.');
            port = port !== "" ? ":" + port : "";
            hashFullCanonLink = XXH(hostname.replace(/^www\./i, '') + port + path + query, 0x0).toString();
            computed.greyHash = hashFullCanonLink;

            while (hostComponents.length > 1) {
                let hostToHash = hostComponents.join('.');
                if (query.length > 0) {
                    hashCanonLink = parseInt(XXH(hostToHash + port + path + query, 0x0).toString());
                    computed.hash.push(hashCanonLink);
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
                    computed.hash.push(hashCanonLink);
                    if (URLpathComponents.length === 0)
                        break;
                    if (URLpathComponents.length > 3)
                        URLpathComponents.splice(3);
                    else URLpathComponents.pop();
                }
                if (ipv4v6Addr)
                    return computed;
                if (hostComponents.length > 5)
                    hostComponents = hostComponents.splice(-5, 5);
                else hostComponents.shift();
            }
            return computed;
        };

        var waitForReportCompletion = function (reportsNumber, reportId, emailContent) {
            let multiple = reportsNumber > 1;
            let failureNumber = 0;
            let successNumber = 0;

            displayMask();

            verifrom.message.addListener({channel: "PayloadPosted"}, function (msg) {
                if (msg.reportId !== reportId)
                    return;
                reportsNumber--;
                successNumber++;
                void 0;
                if (reportsNumber === 0) {
                    verifrom.message.removeListener("PayloadFailed");
                    verifrom.message.removeListener("PayloadPosted");
                }
                if (multiple) {
                    if (reportsNumber === 0) {
                        hideMask();
                        if (failureNumber === 0) {
                            sidebar.showView('multipleReportsSent');
                            if (emailContent.hasOwnProperty("privacy")) {
                                if (emailContent.privacy === true)
                                    sidebar.updateTemplateView('multipleReportsSent', '#privacyChoice', "");
                                else sidebar.updateTemplateView('multipleReportsSent', '#privacyChoice', verifrom.locales.getMessage('contentScript.sidebar.dataprivacyonreport'));
                            }
                            if (emailContent.hasOwnProperty("feedbackRequested")) {
                                if (emailContent.feedbackRequested === false)
                                    sidebar.updateTemplateView('multipleReportsSent', '#feedbackChoice', "");
                                else sidebar.updateTemplateView('multipleReportsSent', '#feedbackChoice', verifrom.locales.getMessage('contentScript.sidebar.feedbackinfo'));
                            }
                            sidebar.addViewListener('multipleReportsSent', "click", '.SPOKBox', false, null, function () {
                                sidebar.hide();
                            });
                            sidebar.addViewListener('multipleReportsSent', "click", '.externallink', false, null, openExternalLink);
                            feedbackLoop(emailContent);
                        } else {
                            sidebar.updateTemplateView('multipleReportsFailed', '#successNumber', successNumber);
                            sidebar.updateTemplateView('multipleReportsFailed', '#failureNumber', failureNumber);
                            sidebar.updateTemplateView('multipleReportsFailed', '#failureReason', msg.response);
                            sidebar.showView('multipleReportsFailed');
                            sidebar.addViewListener('multipleReportsFailed', "click", '.SPOKBox', false, null, function () {
                                sidebar.hide();
                            });
                            sidebar.addViewListener('multipleReportsFailed', "click", '.externallink', false, null, openExternalLink);
                        }
                    } else {
                        sidebar.updateTemplateView('sendingReports', '#reportsNumber', reportsNumber);
                    }
                } else {
                    hideMask();
                    sidebar.showView('singleReportSent');
                    if (emailContent.hasOwnProperty("privacy")) {
                        if (emailContent.privacy === true)
                            sidebar.updateTemplateView('singleReportSent', '#privacyChoice', "");
                        else sidebar.updateTemplateView('singleReportSent', '#privacyChoice', verifrom.locales.getMessage('contentScript.sidebar.dataprivacyonreport'));
                    }
                    if (emailContent.hasOwnProperty("feedbackRequested")) {
                        if (emailContent.feedbackRequested === false)
                            sidebar.updateTemplateView('singleReportSent', '#feedbackChoice', "");
                        else sidebar.updateTemplateView('singleReportSent', '#feedbackChoice', verifrom.locales.getMessage('contentScript.sidebar.feedbackinfo'));
                    }
                    sidebar.addViewListener('singleReportSent', "click", '.SPOKBox', false, null, function () {
                        sidebar.hide();
                    });
                    sidebar.addViewListener('singleReportSent', "click", '.externallink', false, null, openExternalLink);
                    feedbackLoop(emailContent);
                }
            });
            verifrom.message.addListener({channel: "PayloadFailed"}, function (msg) {
                if (msg.reportId !== reportId)
                    return;
                reportsNumber--;
                failureNumber++;
                void 0;
                if (reportsNumber === 0) {
                    verifrom.message.removeListener("PayloadFailed");
                    verifrom.message.removeListener("PayloadPosted");
                }
                if (multiple && reportsNumber === 0) {
                    hideMask();
                    sidebar.updateTemplateView('multipleReportsFailed', '#successNumber', successNumber);
                    sidebar.updateTemplateView('multipleReportsFailed', '#failureNumber', failureNumber);
                    sidebar.updateTemplateView('multipleReportsFailed', '#failureReason', msg.response);
                    sidebar.showView('multipleReportsFailed');
                    sidebar.addViewListener('multipleReportsFailed', "click", '.SPOKBox', false, null, function () {
                        sidebar.hide();
                    });
                    sidebar.addViewListener('multipleReportsFailed', "click", '.externallink', false, null, openExternalLink);
                } else {
                    hideMask();
                    sidebar.updateTemplateView('singleReportFailed', '#failureReason', msg.response);
                    sidebar.showView('singleReportFailed');
                    sidebar.addViewListener('singleReportFailed', "click", '.SPOKBox', false, null, function () {
                        sidebar.hide();
                    });
                    sidebar.addViewListener('singleReportFailed', "click", '.externallink', false, null, openExternalLink);
                }
            });
        };

        var postReport = function (emailContent) {
            let reportId = Date.now();
            if (emailContent.length > 0 && emailContent.header === undefined) {
                sidebar.updateTemplateView('sendingReports', '#reportsNumber', emailContent.length);
                sidebar.showView('sendingReports');
                waitForReportCompletion(emailContent.length, reportId, emailContent);
                for (let i = 0; i < emailContent.length; i++) {
                    postPhishingDetails(emailContent[i].header, emailContent[i].links, emailContent[i].body, emailContent[i].folder, reportId, emailContent[i].subject, emailContent[i].sender, emailContent.feedbackRequested, emailContent.privacy);
                }
            } else if (emailContent.header !== undefined) {
                sidebar.showView('sendingSingleReport');
                waitForReportCompletion(1, reportId, emailContent);
                postPhishingDetails(emailContent.header, emailContent.links, emailContent.body, emailContent.folder, reportId, emailContent.subject, emailContent.sender, emailContent.feedbackRequested, emailContent.privacy);
            }
        };

        var confirmReport = function (viewId, emailContent) {
            try {
                sidebar.addViewListener(viewId, "click", '#falsePositiveLink', false, null, falsePositiveReport);
            } catch (e) {
                void 0;
            }
            sidebar.addViewListener(viewId, "click", '.externallink', false, null, openExternalLink);
            sidebar.addViewListener(viewId, "click", '.SPOKBox', false, null, function () {
                let feedbackRequested = sidebar.getElementValue(viewId, "#feedback", "checked");
                if (typeof feedbackRequested === "boolean")
                    emailContent.feedbackRequested = feedbackRequested;
                let privacy = sidebar.getElementValue(viewId, "#dataprivacy", "checked");
                if (typeof privacy === "boolean")
                    emailContent.privacy = privacy;
                postReport(emailContent);
            });
        };

        var falsePositiveReport = function () {
            verifrom.message.toBackground({
                'phishingLinks': phishingLinks,
                'phishingHashes': phishingHashes
            }, {channel: "FalsePositive"});
            for (let i = 0; i < phishingHashes.length; i++) {
                verifrom.db.set(phishingHashes[i], {mutex: true}, verifrom.time.secondsFromNow(3600 * 24));
            }
            removePhishingAlert();
            sidebar.hide();
        };
    }

    function feedbackLoop(emailContent) {
        if (verifrom.appInfo.feedBackLoop) {
            if (emailContent.length > 0 && emailContent.header === undefined) {
                let folderId;
                if (emailContent[0] !== undefined && emailContent[0].email !== undefined && emailContent[0].email.folder !== undefined)
                    folderId = emailContent[0].email.folder;
                else if (emailContent[0].folder !== undefined)
                    folderId = emailContent[0].folder;
                if (folderId !== 1) {
                    try {
                        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('SpamProxyRequest', {
                            detail: {
                                pageDomainName: pageDomainName,
                                "rootObject": PARAM.PROXY_DATA.BETAOWADOMAIN.ROOT
                            }
                        }));
                    } catch (e) {
                        void 0;
                        void 0;
                    }
                } else {
                    try {
                        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('MarkReadProxyRequest', {
                            detail: {
                                pageDomainName: pageDomainName,
                                "rootObject": PARAM.PROXY_DATA.BETAOWADOMAIN.ROOT
                            }
                        }));
                    } catch (e) {
                        void 0;
                        void 0;
                    }
                }
            } else {
                let folderId;
                if (emailContent.email !== undefined && emailContent.email.folder !== undefined)
                    folderId = emailContent.email.folder;
                else if (emailContent.folder !== undefined)
                    folderId = emailContent.folder;
                if (folderId !== 1)
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('SpamProxyRequest', {
                        detail: {
                            pageDomainName: pageDomainName,
                            "rootObject": PARAM.PROXY_DATA.BETAOWADOMAIN.ROOT
                        }
                    }));
                else verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('MarkReadProxyRequest', {
                    detail: {
                        pageDomainName: pageDomainName,
                        "rootObject": PARAM.PROXY_DATA.BETAOWADOMAIN.ROOT
                    }
                }));
            }
        }
    }

    function displayMask() {
        let maskOverlay = window.top.document.getElementById('verifromMask');
        if (maskOverlay) {
            maskOverlay.setAttribute('style', 'top:0px;left:0px;position:absolute;width:100vw;height:100vh;background-color:whitesmoke;visibility:visible;display:block;opacity:0.5;z-index:2147483640;');
        } else {
            maskOverlay = window.top.document.createElement('div');
            maskOverlay.setAttribute('style', 'top:0px;left:0px;position:absolute;width:100vw;height:100vh;background-color:whitesmoke;visibility:visible;display:block;opacity:0.5;z-index:2147483640;');
            maskOverlay.setAttribute('id', 'verifromMask');
            document.body.appendChild(maskOverlay)
        }
    }

    function hideMask() {
        let maskOverlay = window.top.document.getElementById('verifromMask');
        if (maskOverlay)
            maskOverlay.setAttribute('style', 'top:0px;left:0px;position:absolute;width:0vw;height:0vh;background-color:whitesmoke;visibility:hidden;display:none;opacity:0;z-index:0;');
    }


    function removePhishingAlert(msg) {
        if (extensionConfig.appInfo.safari === true && msg && msg.checkId !== lastCheckId) {
            void 0;
            return;
        }
        let emailDOMElement = phishingEmailDOMElement;
        if (emailDOMElement) {
            emailDOMElement.removeAttribute(verifrom.appInfo.extensionName + '-badmail');
            void 0;
        }
        let phishingLinksDisplayed = phishingLinksElements;
        if (phishingLinksDisplayed && phishingLinksDisplayed.length && phishingLinksDisplayed.length > 0) {
            for (let i = 0; i < phishingLinksDisplayed.length; i++)
                phishingLinksDisplayed[i].removeAttribute(verifrom.appInfo.extensionName + '-tip');
            void 0;
        }
    }

    function alertOnPhishingSuspect(emailDOMElement, links, linkElements, linksHash, checkId, alreadyChecked) {
        let displayAlertSideBar = false;
        phishingLinks = [];
        phishingHashes = [];
        phishingLinksElements = [];
        if (observer && observerActive) {
            observer.takeRecords(); 
            observer.disconnect();
            observerActive = false;
        }
        if (verifrom.appInfo.edge !== true)
            verifrom.insertCSSSheet(emailDOMElement);
        $(emailDOMElement).css('border', '');
        $(emailDOMElement).css('border-width', '');
        $(emailDOMElement).css('border-style', '');
        if (pageDomainName === 'betaowa.live.com' && emailDOMElement.children.length === 2)
            emailDOMElement = emailDOMElement.children[1];
        emailDOMElement.setAttribute(verifrom.appInfo.extensionName + '-badmail', 'warning');
        phishingEmailDOMElement = emailDOMElement;
        if ("function" === typeof emailDOMElement.scrollIntoViewIfNeeded)
        { 
            emailDOMElement.scrollIntoViewIfNeeded();
        }

        let addRule;
        if (verifrom.appInfo.edge === true)
            addRule = (function (style) {
                let sheet = document.head.appendChild(style).sheet;
                return function (selector, css) {
                    let propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
                        return p + ":" + (p === "content" ? css[p] : css[p]);
                    }).join(";");
                    sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
                };
            })(document.createElement("style"));

        for (let i = 0; i < linkElements.length; i++) {
            if (linksHash && linksHash.length > i) {
                if (verifrom.db.get(linksHash[i]) === undefined) {
                    displayAlertSideBar = true;
                    verifrom.db.set(linksHash[i], {mutex: true}, verifrom.time.secondsFromNow(60 * 5));
                }
                phishingHashes.push(linksHash[i]);
            }
            for (let j = 0; j < linkElements[i].length; j++) {
                if (verifrom.appInfo.edge !== true && j === 0)
                    verifrom.insertCSSSheet(emailDOMElement);
                $(linkElements[i][j]).css('cursor', 'no-drop');
                linkElements[i][j].setAttribute(verifrom.appInfo.extensionName + '-tip', 'warning');
                if (verifrom.appInfo.edge === true)
                    addRule(`[${verifrom.appInfo.extensionName}-tip]::before`, {
                        "content": 'url("' + verifrom.getURL("/img/icon16.png") + '");',
                        "position": "absolute",
                        "top": "5px",
                        "right": "-1.5em",
                        "font-size": "1em",
                        "color": "rgb(190, 0, 68)",
                        "z-index": "2147483647"
                    });
                phishingLinksElements.push(linkElements[i][j]);
            }
            phishingLinks.push(links[i]);
            phishingHashes.push(linksHash[i]);
        }

        if (displayAlertSideBar && extensionConfig.appInfo.safari !== true) {
            sidebar.showView('phishingEmailAlert');
            getRawMail(undefined, false, confirmReport.bind(null, 'phishingEmailAlert'));
            verifrom.message.toBackground({
                'event': 'PHISHING_EMAIL_SIDEBAR',
                'eventDetail': pageDomainName,
                'links': phishingLinks
            }, {channel: "PhishingStats"});
        } else if (extensionConfig.appInfo.safari === true && checkId === lastCheckId && alreadyChecked !== true)
            getRawMail(undefined, false, startPhishingUserReport.bind({checkId: checkId}));
        if (observer && !observerActive)
            setTimeout(activateMutationObserver, 500);
        return emailDOMElement.innerHTML;
    }

    function verifiedPhishing(msg) {
        void 0;
        void 0;

        let checkContext = null;
        if ("object" === typeof msg && msg.checkId) {
            msg.checkId = parseInt(msg.checkId);
            checkContext = currentCheckings.get(msg.checkId);
            currentCheckings.delete(msg.checkId);
        } else {
            void 0;
        }
        if (!checkContext) {
            void 0;
            return;
        }

        if (!msg.phishing && msg.hash) 
            msg.phishing = msg.hash;
        if (!msg || !msg.checkId || !msg.phish || !msg.phishing || msg.phishing.length === 0)
            return;

        if (extensionConfig.appInfo.safari === true && msg.checkId !== lastCheckId) {
            void 0;
            return
        }

        let mailLinks = checkContext.links;
        let linksHash = [];
        let linksToAlert = [];
        let elementsToAlert = [];

        for (let i = 0; i < msg.phishing.length; i++) {
            if (extensionConfig.appInfo.safari === true && msg.phishing[i] === true) {
                linksToAlert.push(mailLinks.urlArray[i]);
                elementsToAlert.push(mailLinks.urlElementsArray[i]);
                linksHash.push(msg.hash[i]);
            } else if (extensionConfig.appInfo.safari !== true && msg.hash[i] !== null) {
                linksToAlert.push(mailLinks.urlArray[i]);
                elementsToAlert.push(mailLinks.urlElementsArray[i]);
                linksHash.push(msg.hash[i]);
            }
        }
        if (extensionConfig.appInfo.safari === true)
            alertOnPhishingSuspect(checkContext.emailDOMElement, linksToAlert, elementsToAlert, linksHash, msg.checkId, msg.alreadyChecked);
        else alertOnPhishingSuspect(checkContext.emailDOMElement, linksToAlert, elementsToAlert, linksHash);
    }

    function startMailCheck(emailDOMElement, returnIframe, frameId) {
        if (!emailDOMElement) {
            void 0;
            return;
        }
        void 0;

        emailDOMElement.removeAttribute(verifrom.appInfo.extensionName + '-badmail');

        let mailLinks = getMailLinks(emailDOMElement, true);

        if (extensionConfig.appInfo.safari !== true) {
            let computedHash = [];
            let parsedCanonUrl;

            for (let i = 0; i < (mailLinks.urlArray ? mailLinks.urlArray.length : 0); i++) {
                let canonURL = null;
                canonURL = verifromURLCanonicalization.canonicalize(mailLinks.urlArray[i]);
                void 0;
                if (canonURL !== undefined && canonURL !== null) {
                    parsedCanonUrl = verifrom.parseUrl(canonURL);
                    computedHash.push(computeHash(parsedCanonUrl.host, parsedCanonUrl.port, parsedCanonUrl.path, parsedCanonUrl.query));
                }
            }

            if (computedHash.length > 0) {
                let checkId = Date.now();
                currentCheckings.set(checkId, {links: mailLinks, emailDOMElement: emailDOMElement});
                if (verifrom.appInfo.quantum)
                    verifrom.message.toBackground({
                        'computedHash': computedHash,
                        'checkId': checkId
                    }, {channel: "verifyHashURLs", response: verifiedPhishing});
                else {
                    verifrom.message.addListener({channel: "checkedHash"}, verifiedPhishing);
                    verifrom.message.toBackground({
                        'computedHash': computedHash,
                        'checkId': checkId
                    }, {'channel': 'verifyHashURLs'});
                }
            }
        } else {
            if (mailLinks && mailLinks.urlArray.length > 0) {
                let checkId = Date.now();
                currentCheckings.set(checkId, {links: mailLinks, emailDOMElement: emailDOMElement});
                lastCheckId = checkId;
                verifrom.message.addListener({channel: "checkedHash"}, verifiedPhishing);
                verifrom.message.toBackground({
                    'links': mailLinks.urlArray,
                    'checkId': checkId
                }, {'channel': 'verifyHashURLs'});
            }
        }
    }

    function checkMailIsDisplayed(rawMailParams) {
        if (!verifrom.appInfo.stopPhishingFeature)
            return;
        void 0;
        try {
            if (observer && observerActive) {
                observer.takeRecords().forEach(function (mutation) {
                });
                observer.disconnect();
                observerActive = false;
            }
        } catch (e) {
            void 0;
        }

        verifrom.customEvent.addEventListener('Proxy_check', checkMailIsDisplayed);

        switch (pageDomainName) {
            case PARAM.RCOVHDOMAIN:
            case PARAM.RCFREEDOMAIN:
                if (rawMailParams && rawMailParams.detail) {
                    void 0;
                    if (rawMailParams.detail.auditMessages && rawMailParams.detail.selectedMessagesIds.length > 0) {
                        let iFrameContent = window.top.document.querySelector('iframe#messagecontframe');
                        if (iFrameContent) {
                            if (iFrameContent.contentWindow.location.href && new RegExp('&_uid=' + rawMailParams.detail.selectedMessagesIds[0] + '&').test(iFrameContent.contentWindow.location.href) && iFrameContent.contentDocument.readyState === 'complete') {
                                let emailBody;
                                if (iFrameContent)
                                    emailBody = iFrameContent.contentDocument.querySelector('#messagebody');
                                else emailBody = window.top.document.querySelector('#messagebody');
                                if (emailBody)
                                    startMailCheck(emailBody);
                            } else {
                                verifrom.setTimeout(function () {
                                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('RoundCubeProxyRequest_check'), {});
                                }, 500);
                            }
                        } else {
                            let emailBody = window.top.document.querySelector('#messagebody');
                            if (emailBody)
                                startMailCheck(emailBody);
                        }
                    }
                } else {
                    void 0;
                    verifrom.setTimeout(function () {
                        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('RoundCubeProxyRequest_check'), {});
                    }, 500);
                }
                break;
            case PARAM.BLUEWINDOMAIN:
                if (rawMailParams && rawMailParams.detail) {
                    void 0;
                    for (let i = 0; i < rawMailParams.detail.bluewinEmails.length; i++) {
                        let bodyFrames = $('iframe[id=' + rawMailParams.detail.bluewinEmails[i].mailFrameId + ']');
                        if (bodyFrames)

                            try {
                                verifrom.message.addListener({channel: "BluewinGetBody"}, function (message) {
                                    verifrom.dom.createSanitizedDoc("Nouveau Document", message.body, function (doc) {
                                        startMailCheck(doc.body, true, message.mailFrameId);
                                    });
                                });
                                verifrom.message.toBackground({
                                    'action': 'getBody',
                                    'mailFrameId': rawMailParams.detail.bluewinEmails[i].mailFrameId
                                }, {channel: "BluewinGetBody"});
                            } catch (e) {
                                void 0;
                            }
                    }
                } else {
                    void 0;
                    verifrom.setTimeout(verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('BluewinProxyRequest_check'), {}), 1000);
                }
                break;
            case PARAM.AOLDOMAIN:
                if (rawMailParams && rawMailParams.detail) {
                    verifrom.customEvent.removeEventListener('Proxy_check', checkMailIsDisplayed);
                    void 0;
                    if (rawMailParams.detail.currentUid) {
                        if (rawMailParams.detail.bodyFrame) {
                            let bodyFrames = $('iframe[name=' + rawMailParams.detail.bodyFrame + '][style*="visibility"]');
                            for (let i = 0; i < bodyFrames.length; i++)
                                startMailCheck(bodyFrames.get(i).contentDocument.body);
                        } else if (rawMailParams.detail.bodyId) {
                            let mailBody = window.top.document.getElementById(rawMailParams.detail.bodyId);
                            if (mailBody)
                                startMailCheck(mailBody);
                        }
                    }
                } else {
                    void 0;
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('AOLProxyRequest_check'), {});
                }
                break;
            case PARAM.ZIMBRAFREEDOMAIN:
            case PARAM.LAPOSTEDOMAIN:
                if (rawMailParams && rawMailParams.detail) {
                    verifrom.customEvent.removeEventListener('Proxy_check', checkMailIsDisplayed);
                    void 0;
                    if (rawMailParams.detail.messageDisplayed) {
                        if (rawMailParams.detail.standardMode && rawMailParams.detail.frameId === undefined) {
                            let bodyFrame = $('#iframeBody > iframe');
                            if (bodyFrame && bodyFrame.length > 0)
                                bodyFrame = bodyFrame[0];
                            if (bodyFrame.contentWindow && bodyFrame.contentWindow.document)
                                startMailCheck(bodyFrame.contentWindow.document.body);
                        } else {
                            try {
                                if (rawMailParams.detail.frameId)
                                    startMailCheck(window.frames[rawMailParams.detail.frameId].document.body);
                                else {
                                    let mailBody = window.top.document.getElementById(rawMailParams.detail.bodyViewId);
                                    if (mailBody)
                                        startMailCheck(mailBody);
                                }
                            } catch (e) {
                                void 0;
                            }
                        }
                    }
                } else {
                    void 0;
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('ZimbraProxyRequest_check', {}));
                }
                break;
            case PARAM.IMPFREEDOMAIN:
                if (pageUrl.match(/message.php/)) {
                    let emailBody = document.querySelectorAll('.control>table', 'form[name=messages]')[0];
                    startMailCheck(emailBody);
                }
                break;

            case PARAM.GMAILV2DOMAIN:
                let emailBodies = window.top.document.querySelectorAll(PARAM.PROXY_DATA.GOOGLEDOMAIN.BODYSELECTOR);
                if (emailBodies && emailBodies.length > 0) {
                    for (let i = 0; i < emailBodies.length; i++)
                        if (emailBodies[i].getClientRects && emailBodies[i].getClientRects().length > 0)
                            startMailCheck(emailBodies[i]);
                } else void 0;
                break;
            case PARAM.GOOGLEDOMAIN:
                let currentPage = window.location.hash.match(/([#\/][^#\/]*)/g);
                let hashLastPart = currentPage[currentPage.length - 1];
                if (hashLastPart.match(/^\/[0-9,a-z]{16}$/)) {
                    let emailBodies = window.top.document.querySelectorAll(PARAM.PROXY_DATA.GOOGLEDOMAIN.BODYSELECTOR);
                    if (emailBodies && emailBodies.length > 0) {
                        for (let i = 0; i < emailBodies.length; i++)
                            startMailCheck(emailBodies[i]);
                    } else void 0;
                }
                break;
            case PARAM.BETAOWADOMAIN:
                verifrom.customEvent.removeEventListener(verifrom.appInfo.extensionCodeName + '_check', checkMailIsDisplayed);
                let mailElements = document.querySelectorAll(PARAM.MAILBODYSEARCHSTRING[pageDomainId] || 'div[role="main"]>div>div.wide-content-host>div>div:nth-child(2)');
                for (let i = 0; i < mailElements.length; i++)
                    startMailCheck(mailElements[i]);

                break;
            case PARAM.OWADOMAIN:
                if (rawMailParams && rawMailParams.detail) {
                    verifrom.customEvent.removeEventListener(verifrom.appInfo.extensionCodeName + '_check', checkMailIsDisplayed);
                    void 0;
                    if (rawMailParams.detail.auditMessages) {
                        let mailElements = $('.itemPartBody').parent(); 
                        if (mailElements.length === 0)
                            mailElements = document.querySelectorAll('div#Item\\.MessageUniqueBody');
                        for (let i = 0; i < mailElements.length; i++)
                            startMailCheck(mailElements[i]);
                    }
                } else {
                    void 0;
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('OWAProxyRequest_check', {detail: {"rootObject": PARAM.PROXY_DATA.OWADOMAIN.ROOT}}));
                }
                break;
            case PARAM.LIVEDOMAIN:
                if (rawMailParams && rawMailParams.detail) {
                    verifrom.customEvent.removeEventListener('Proxy_check', checkMailIsDisplayed);
                    void 0;
                    if (rawMailParams.detail.auditMessages) {
                        rawMailParams.detail.msgElements.forEach(function (bodyElement) {
                            bodyElement = document.getElementById(bodyElement);
                            bodyElement = bodyElement.querySelector('.c-ReadMessagePartBody');
                            startMailCheck(bodyElement);
                        });
                    }
                } else {
                    void 0;
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('LiveProxyRequest_check', {}));
                }
                break;
            case PARAM.YMAILDORRINDOMAIN:
                if (rawMailParams && rawMailParams.detail) {
                    verifrom.customEvent.removeEventListener('Proxy_check', checkMailIsDisplayed);
                    if (rawMailParams.detail.mailIsDisplayed) {
                        void 0;
                        let displayedMessages = window.top.document.querySelectorAll('.msg-body');
                        for (let i = 0; i < displayedMessages.length; i++) {
                            startMailCheck(displayedMessages[i]);
                        }
                    }
                } else {
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('YMailDorrinProxyRequest_check', {}));
                }
                break;
            case PARAM.YMAILNORRINDOMAIN:
                if (rawMailParams && rawMailParams.detail) {
                    verifrom.customEvent.removeEventListener('Proxy_check', checkMailIsDisplayed);
                    if (rawMailParams.detail.mailIsDisplayed) {
                        void 0;
                        let displayedMessages = window.top.document.querySelectorAll('div[data-test-id="message-view-body"]');
                        for (let i = 0; i < displayedMessages.length; i++) {
                            startMailCheck(displayedMessages[i]);
                        }
                    }
                } else {
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('YMailNorrinProxyRequest_check', {}));
                }
                break;
            case PARAM.YAHOODOMAIN:

                if (rawMailParams && rawMailParams.detail) {
                    verifrom.customEvent.removeEventListener('Proxy_check', checkMailIsDisplayed);
                    if (rawMailParams.detail.auditMessages) {
                        void 0;
                        let displayedMessages = window.top.document.querySelectorAll('div[stopphishing]');
                        for (let i = 0; i < displayedMessages.length; i++) {
                            displayedMessages[i].removeAttribute('stopphishing');
                            startMailCheck(displayedMessages[i]);
                        }
                    }
                } else {
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('YAHOOProxyRequest_check', {}));
                }
                break;
            case PARAM.LAPOSTEV2DOMAIN: {
                if (rawMailParams && rawMailParams.detail) {
                    verifrom.customEvent.removeEventListener('Proxy_check', checkMailIsDisplayed);
                    if (rawMailParams.detail.auditMessages) {
                        void 0;
                        let displayedMessage = window.top.document.querySelectorAll(rawMailParams.detail.bodySelector);
                        startMailCheck(displayedMessage[0]);
                    }
                } else {
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('LAPOSTEV2ProxyRequest_check', {}));
                }
            }
                break;
            case PARAM.ATELIERSFRDOMAIN: {
                if (rawMailParams && rawMailParams.detail) {
                    verifrom.customEvent.removeEventListener('Proxy_check', checkMailIsDisplayed);
                    if (rawMailParams.detail.auditMessages) {
                        void 0;
                        let displayedMessage = window.top.document.querySelectorAll(rawMailParams.detail.bodySelector);
                        startMailCheck(displayedMessage[0]);
                    }
                } else {
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('AtelierSFRProxyRequest_check', {}));
                }
            }
                break;
            case PARAM.SFRDOMAIN: {
                if (rawMailParams && rawMailParams.detail) {
                    verifrom.customEvent.removeEventListener('Proxy_check', checkMailIsDisplayed);
                    if (rawMailParams.detail.auditMessages) {
                        void 0;
                        let displayedMessage = window.top.document.querySelectorAll(rawMailParams.detail.bodySelector);
                        startMailCheck(displayedMessage[0]);
                    }
                } else {
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('SFRProxyRequest_check', {}));
                }
            }
                break;
            case PARAM.ORANGEPRODOMAIN:
                let mailBody = window.top.document.querySelector("#sandBox[" + verifrom.appInfo.extensionName + '-badmail' + "]");
                if (mailBody && "function" === typeof mailBody.removeAttribute)
                    mailBody.removeAttribute(verifrom.appInfo.extensionName + '-badmail');
                if (rawMailParams && rawMailParams.detail) {
                    verifrom.customEvent.removeEventListener('Proxy_check', checkMailIsDisplayed);
                    if (rawMailParams.detail.mailIsDisplayed) {
                        void 0;
                        let displayedMessage = window.top.document.getElementById(rawMailParams.detail.bodySelector);
                        startMailCheck(displayedMessage);
                    }
                } else {
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('OrangeProProxyRequest_check', {}));
                }
                break;
            case PARAM.ORANGEOXDOMAIN:
                if (rawMailParams && rawMailParams.detail) {
                    verifrom.customEvent.removeEventListener('Proxy_check', checkMailIsDisplayed);
                    if (rawMailParams.detail.mailIsDisplayed) {
                        void 0;
                        let  displayedMessages = window.top.document.querySelectorAll('article.mail-item.mail-detail.expanded>section.body');
                        for (let i = 0; i < displayedMessages.length; i++) {
                            let mailBody = displayedMessages[i];
                            if (mailBody && "function" === typeof mailBody.removeAttribute)
                                mailBody.removeAttribute(verifrom.appInfo.extensionName + '-badmail');
                            startMailCheck(mailBody);
                        }
                    }
                } else {
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('OrangeOXProxyRequest_check', {}));
                }
                break;
            case PARAM.ORANGEDOMAIN:
                let emailElement = $(PARAM.MAILBODYSEARCHSTRING[pageDomainId], $(PARAM.MSGCONTAINERELEMENTID[pageDomainId]));
                if (emailElement && emailElement.length === 1)
                    startMailCheck(emailElement[0]);
                break;
        }
        if (observer && !observerActive) {
            nbObserverErrors = 0;
            activateMutationObserver();
        }
    }

    function mutationHandler() {  
        void 0;
        try {
            verifrom.clearTimeout(DOMEventsTimeout, checkMailIsDisplayed);
            DOMEventsTimeout = verifrom.setTimeout(checkMailIsDisplayed, 300);
        } catch (e) {
            void 0;
        }
    }

    function addObserverDepth(parentElement, min, max, depth) {
        let tabul = '';
        let config2 = {
            attributes: true,
            childList: true,
            characterData: true,
            attributeOldValue: false,
            characterDataOldValue: false
        };

        if (depth >= min) {
            if (observer === null) {
                let MutationObserverClass = window.MutationObserver || window.WebKitMutationObserver;
                observer = new MutationObserverClass(mutationHandler);
                void 0;
            }

            void 0;
            if (parentElement.nodeType === 1) {
                observer.observe(parentElement, config2);
                observerActive = true;
                void 0;
            }
        }

        if (depth + 1 > max)
            return;
        void 0;
        for (let i = 0; i < parentElement.childNodes.length; i++) {
            if (parentElement.childNodes[i].nodeType === 1 && parentElement.childNodes[i].nodeName !== 'SCRIPT')
                addObserverDepth(parentElement.childNodes[i], min, max, depth + 1);
        }
    }

    function activateMutationObserver() {
        let minDepth = 0,maxDepth = 0;

        if (nbObserverErrors > maxObserverErrors || observerActive)
            return;

        if (!verifrom.appInfo.stopPhishingFeature || PARAM.OPTIONS.STOPPHISHING_WEBMAIL_ENABLE === false)
            return;

        if (setWebMailDomain() === null) {
            void 0;
            return;
        }


        if (pageHostName.match(new RegExp(PARAM.WEBMAIL_DOMAINS_MATCH))) {

            setWebMailDomain();

            if (pageDomainName === PARAM.IMPFREEDOMAIN
                || (pageDomainName === PARAM.ZIMBRAFREEDOMAIN && window.top.location.pathname.match('/h/'))
                || (pageDomainName === PARAM.LAPOSTEDOMAIN && window.top.location.pathname.match('/h/')))
                return;

            void 0;


            let MutationObserverClass = window.MutationObserver || window.WebKitMutationObserver;
            observer = observer || new MutationObserverClass(mutationHandler);

            let elementClass;
            let elementId;
            observerActive = false;


            if (PARAM.MUTATIONS_OBSERVER) {
                let o = PARAM.MUTATIONS_OBSERVER[pageDomainId];
                if (o instanceof Array) {
                    for (let selector of o) {
                        let elementsWebmail = window.top.document.querySelectorAll(selector.s);
                        for (let j = 0; j < elementsWebmail.length; j++)
                            addObserverDepth(elementsWebmail[j], selector.min, selector.max, selector.from ? selector.from : 0);
                    }
                }  else if (o instanceof Object) {
                    let elementsWebmail = window.top.document.querySelectorAll(o.s);
                    for (let j = 0; j < elementsWebmail.length; j++)
                        addObserverDepth(elementsWebmail[j], o.min, o.max, o.from ? o.from : 0);
                } else void 0
            } else {
                void 0;
                elementClass = PARAM.MUTATIONS_ELEMENT_CLASS[pageDomainName];
                elementId = PARAM.MUTATIONS_ELEMENT_ID[pageDomainName];
                minDepth = PARAM.MUTATIONS_MINDEPTH[pageDomainName];
                maxDepth = PARAM.MUTATIONS_MAXDEPTH[pageDomainName];
                if (elementClass !== undefined) {
                    void 0;
                    let elementsWebmail = window.top.document.querySelectorAll(elementClass);
                    for (let j = 0; j < elementsWebmail.length; j++)
                        addObserverDepth(elementsWebmail[j], minDepth, maxDepth, 0);
                }
                if (elementId !== undefined) {
                    let elementsWebmail = window.top.document.querySelectorAll(elementId);
                    for (let j = 0; j < elementsWebmail.length; j++)
                        addObserverDepth(elementsWebmail[j], minDepth, maxDepth, 0);
                }
            }
            if (observerActive === false) {
                observer = null;
                nbObserverErrors++;
                void 0;
                if (nbObserverErrors <= maxObserverErrors)
                    verifrom.setTimeout(activateMutationObserver, Math.pow(1.4, nbObserverErrors) * 500);
            } else nbObserverErrors = 0;
        } else
            void 0;
    }

    function displayExtensionUpdate(msg) {
        if (msg && msg.url)
            sidebar.addView('extensionUpdate',
                msg.url,
                true,
                false,
                null,
                {
                    base: {href: verifrom.getURL('/'), target: '_blank'},
                    link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}
                },
                function () {
                    sidebar.addViewListener('extensionUpdate', "span[style*='OPTIONS']", "click", false, null, function () {
                        verifrom.message.toBackground({'action': 'openOptions'}, {channel: "openOptions"});
                    });
                    sidebar.showView('extensionUpdate');
                }
            );
    }

    function displayExtensionUpdateAvailable(msg) {
        if (msg && msg.url !== null) {
            sidebar.addView('extensionUpdateAvailable',
                msg.url,
                true,
                false,
                null,
                [
                    {base: {href: verifrom.getURL('/'), target: '_blank'}},
                    {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}}
                ],
                function () {
                    sidebar.showView('extensionUpdateAvailable');
                    sidebar.updateTemplateView('extensionUpdateAvailable', '#VERSIONNUMBER', msg.version);
                    sidebar.updateTemplateView('extensionUpdateAvailable', '#CURRENTVERSIONNUMBER', verifrom.appInfo.version);
                    sidebar.addViewListener('extensionUpdateAvailable', "click", '.externallink', false, null, openExternalLink);
                    verifrom.message.toBackground({'action': 'updateAvailableDisplayed'}, {channel: "updateAvailableDisplayed"});
                }
            );
        } else if (msg && msg.url === null) {
            sidebar.addView('extensionUpdateAvailable',
                verifrom.getURL('/html/views/updateavailable.html'),
                true,
                true,
                stopPhishingLocalizeStandOpts,
                [
                    {base: {href: verifrom.getURL('/'), target: '_blank'}},
                    {link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/sidebar.css')}}
                ],
                function () {
                    sidebar.showView('extensionUpdateAvailable');
                    sidebar.updateTemplateView('extensionUpdateAvailable', '#VERSIONNUMBER', msg.version);
                    sidebar.updateTemplateView('extensionUpdateAvailable', '#CURRENTVERSIONNUMBER', verifrom.appInfo.version);
                    sidebar.addViewListener('extensionUpdateAvailable', "click", '#linkToNewVersion', false, null, function () {
                        verifrom.message.toBackground({'action': 'openOptions'}, {channel: "openOptions"});
                    });
                    sidebar.addViewListener('extensionUpdateAvailable', "click", '.externallink', false, null, openExternalLink);
                    verifrom.message.toBackground({'action': 'updateAvailableDisplayed'}, {channel: "updateAvailableDisplayed"});
                }
            );
        }
    }

    function displayReminder() {
        void 0;

        verifrom.notifier.show({
                'name': 'VF-Reminder-' + verifrom.time.now(),
                'title': verifrom.locales.getMessage('contentScript.reminder.title'),
                'url': verifrom.getURL('/html/reminder.html'),
                'localize': true,
                'localizeOptions': stopPhishingLocalizeStandOpts,
                'theme': 'white-blue',
                'position': 'top-right',
                'close': true,
                'sticky': true,
                'fadeAfter': 20000,
                'width': '500px',
                'height': '220px',
                'closeWhenClicked': false,
                head: {
                    base: {href: verifrom.getURL('/'), target: '_blank'},
                    link: {rel: 'stylesheet', type: 'text/css', href: verifrom.getURL('/css/notification.css')}
                }
            },
            function (notifierBody) {
                let myonoffswitch = $('#myonoffswitch', notifierBody).get(0);
                let frequencyRange = $('#frequencyRange', notifierBody).get(0);

                if (!myonoffswitch)
                    return;
                verifrom.message.toBackground({
                    'REMINDER': myonoffswitch.checked,
                    'REMINDER_FREQUENCY': frequencyRange.value
                }, {channel: "ReminderSettings"});
            },
            function (notifierBody) {
                void 0;
                try {
                    $(".onoffswitch-inner", notifierBody).attr('yes', verifrom.locales.getMessage('options.yes'));
                    $(".onoffswitch-inner", notifierBody).attr('no', verifrom.locales.getMessage('options.no'));

                    let myonoffswitch = $('#myonoffswitch', notifierBody).get(0);
                    let frequencyRange = $('#frequencyRange', notifierBody).get(0);
                    let frequencyDisplayed = $('#frequencyDisplayed', notifierBody).get(0);
                    let optionsLink = $('#options', notifierBody).get(0);

                    $(frequencyDisplayed).text(frequencyRange.value);
                    $(optionsLink).click(function () {
                        verifrom.message.toBackground({'action': 'openOptions'}, {channel: "openOptions"});
                    });
                    $(myonoffswitch).click(function () {
                        verifrom.message.toBackground({
                            'REMINDER': myonoffswitch.checked,
                            'REMINDER_FREQUENCY': frequencyRange.value
                        }, {channel: "ReminderSettings"});
                    });
                    $(frequencyRange).on('input change', function () {
                        verifrom.message.toBackground({
                            'REMINDER': myonoffswitch.checked,
                            'REMINDER_FREQUENCY': frequencyRange.value
                        }, {channel: "ReminderSettings"});
                        $(frequencyDisplayed).text(frequencyRange.value);
                    });
                    void 0;
                } catch (e) {
                    void 0;
                }
            }
        );
    }

    function getReport(msg) {
        void 0;
        userClickedButton = true;
        if (extensionConfig.appInfo.safari !== true) {
            displaySideBarSpinner();
            oneClickOption = msg.oneClickOption;
            if ("boolean" === typeof msg.privacy)
                privacy = msg.privacy;
            if ("boolean" === typeof msg.notifications)
                notifications = msg.notifications;
        }
        setTimeout(()=>{
            getRawMail(undefined, false, startUserReport);
        },100);
    }

    function startExt() {
        void 0;
        try {

            if (extensionConfig.appInfo.safari === true) {
                verifrom.insertSource('proxy', 'js', true, function () {
                    verifrom.customEvent.addEventListener('VFProxy_Ready', () => {
                        verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('SetProxyParam', {detail: {PARAM: PARAM.PROXYPARAMS}}));
                        checkMailIsDisplayed();
                    });
                });
            } else {

                try {
                    sidebar = new verifrom.Sidebar(sidebarParams, stopPhishingLocalizeStandOpts);
                    sidebar.hide();
                } catch(e) {
                    void 0;
                }

                verifrom.insertSourceWebExt('proxy.js');
                verifrom.customEvent.addEventListener('VFProxy_Ready', () => {
                    verifrom.customEvent.dispatchEvent(verifrom.customEvent.CustomEvent('SetProxyParam', {detail: {PARAM: PARAM.PROXYPARAMS}}));
                    checkMailIsDisplayed();
                });
            }

            try {
                nbObserverErrors = 0;
                activateMutationObserver();
            } catch (e) {
                void 0;
            }
            if (extensionConfig.appInfo.safari === true) {
                verifrom.message.addListener({channel: "getemails"}, getReport);
                verifrom.message.addListener({channel: "falsePositiveReported"}, removePhishingAlert);
                verifrom.message.toBackground({'status': 'ready', 'hostname': location.hostname}, {channel: "Ready"});
                setInterval(function () {
                    verifrom.message.toBackground({
                        'status': 'ready',
                        'hostname': location.hostname
                    }, {channel: "Ready"});
                }, 10000);
            } else {
                id = verifrom.message.addListener({channel: "Check"}, getReport);
                verifrom.message.addListener({channel: "displayReminder"}, displayReminder);
                verifrom.message.addListener({channel: "ExtensionUpdate"}, displayExtensionUpdate);
                verifrom.message.addListener({channel: "ExtensionUpdateAvailable"}, displayExtensionUpdateAvailable);
                verifrom.message.toBackground({'status': 'ready', 'time': Date.now()}, {channel: "Ready"});
            }
            void 0;

            if (extensionConfig.appInfo.testautomationAllowed) { 
                verifrom.customEvent.one('VFRUNTEST', function () { 
                    getReport({oneClickOption: false}); 
                }); 
            } 
        } catch (e) {
            void 0;
        }
    }

    window.onbeforeunload = function () {
        void 0;
        verifrom.message.toBackground({'status': 'unload'}, {channel: "Unload"});
        if (sidebar)
            sidebar.hide();
        return null;
    };

    if (extensionConfig.appInfo.safari === true) {
        verifrom.message.addListener({channel: 'Launch'}, function (msg) {
            try {
                if (launched) return;
                launched = !0;
                clearInterval(launchTimeout);
                verifrom.message.toBackground({'status': 'init', 'url': location.href}, {channel: "Init"});

                setLocales(msg.locales);
                if (extensionConfig.appInfo.safari !== true) {
                    try {
                        sidebar = new verifrom.Sidebar(sidebarParams, stopPhishingLocalizeStandOpts);
                        sidebar.hide();
                        if (!verifrom.appInfo.quantum) {
                            verifrom.message.toBackground({'action': 'getParam'}, {'channel': 'PARAMS'});
                        }

                    } catch (e) {
                        void 0;
                    }
                }

                PARAM = msg.params;
                if (!PARAM || "object" !== typeof PARAM) {
                    void 0;
                    return
                }

                setWebMailDomain();
                if (pageDomainName == null) {
                    void 0;

                } else startExt();

            } catch (e) {
                void 0;
            }
        });
        let launched = 0;
        let launchTimeout = setInterval(function () {
            if (!launched)
                verifrom.message.toBackground({'action': 'go'}, {'channel': 'Launch'});
        }, 500);
    } else {
        initContentScript();
    }
}
