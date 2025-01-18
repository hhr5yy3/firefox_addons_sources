globalThis.emptyContentScripts = function () {
    return {
        "contentScriptsVersion": null,
        "content_scripts": [],
        "bug_fixes": []
    }
}
globalThis.removeDuplicates = function (array) {
    const seen = new Set();
    return array.filter(item => {
        const duplicate = seen.has(item.id);
        seen.add(item.id);
        return !duplicate;
    });
}
globalThis.WORKER_MESSAGE_CALLBACKS = [];
globalThis.WEB_REQUESTS = [];
globalThis.workersArray = [];

globalThis.USER_SALT = null;
globalThis.SERVER_DOMAINS = ["qui-quo.com", "qui-quo.online", "qui-quo.ru"];
globalThis.DEFAULT_DOMAIN = SERVER_DOMAINS[0];
globalThis.REQUESTS_DOMAIN = null;
globalThis.AGENCY_DOMAIN = null;
globalThis.CONTENT_SCRIPTS_DATA = emptyContentScripts();
globalThis.AG_INF_ERR = 0;
globalThis.DOMAIN = null;
globalThis.GUARD_DOMAIN = null;

function getI18nMessage(caption) {
    try {
        return chrome.i18n.getMessage(caption);
    } catch (e) {
        console.log(e);
        return null;
    }
}

function addWorkerMessageListener(type, callback) {
    WORKER_MESSAGE_CALLBACKS.push({"type": type, "callback": callback});
}

function onWorkerMessage(worker, request, sendResponse) {
    for (let i = 0; i < WORKER_MESSAGE_CALLBACKS.length; i++) {
        if (request.type === WORKER_MESSAGE_CALLBACKS[i].type) {
            WORKER_MESSAGE_CALLBACKS[i].callback(request.data, worker, sendResponse);
        }
    }
}

// ---->> chrome >>---- //

async function getAgencyId() {
    const {'agency-id': agencyId} = await getStorageData('agency-id');
    return agencyId;
}

async function storeAgencyId(agencyId) {
    await setStorageData({'agency-id': agencyId});
    await initQuote();
    console.log('agency ID has been saved');
}

async function getStorageData(keys) {
    return chrome.storage.local.get(keys);
}

async function setStorageData(items) {
    return chrome.storage.local.set(items);
}

function addPopupMessageListener(type, callback) {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.type === type) {
                callback(request.data, sender, sendResponse);
            }
        }
    );
}

async function sendMessageToPopup(type, payload) {
    await chrome.runtime.sendMessage({"type": type, "data": payload}).catch(_ => null);
}

function openTab(url, callback, inBackground) {
    chrome.tabs.create({'url': url, active: (!inBackground)}, callback);
}

async function createNotification(title, text) {
    if ( isMobileDevice()) {
        console.log('createNotification')
        const activeTab = await chrome.tabs.query({active: true});

        if (activeTab.length !== 0) {
            chrome.tabs.sendMessage(activeTab[0].id, {
                "type": 'showSnackBarNotification',
                "data": {title, text}
            }).catch(_ => false);
        }

        return;
    }
        let idN = new Date().getTime().toString();
        chrome.notifications.create(idN, {
            "type": "basic",
            "iconUrl": chrome.runtime.getURL("data/img/icon.png"),
            "title": title,
            "message": text
        });
        setTimeout(function () {
            chrome.notifications.clear(idN);
        }, 4000);
}

async function post(request, requestHeaders = []) {
    const errorTemplate = `Возникла сетевая ошибка коммуникации с сервером (%error%). Повторите попытку чуть позже или обратитесь в техническую поддержку`
    const formatError = (error, status) => ({
        error: errorTemplate.replace('%error%', `${error} : ${request.url}`),
        status
    });
    const formatResponseError = (response) => formatError(
        `${response.status} — ${response.statusText}`,
        response.status
    );

    try {
        const response = await fetch(request.url, {
            headers: constructHeaders(request, requestHeaders),
            method: 'POST',
            body: request.content
        });
        let json;
        try {
            json = await response.json();
        } catch (parseError) {
            return formatResponseError(response);
        }

        if ( response.ok ) {
            return json;
        }

        return {
            json,
            ...formatResponseError(response)
        };

    } catch (e) {
        return formatError(e.message, null);
    }
}

function constructHeaders(request, requestHeaders) {
    const headers = new Headers();
    headers.append('Content-Type', request.contentType || 'application/x-www-form-urlencoded')

    for (const head of requestHeaders) {
        headers.append(head.header, head.value);
    }
    return headers;
}

function getAddonVersion() {
    return chrome.runtime.getManifest().version;
}

function getBrowserVersion() {
    let ua = typeof navigator === "object" && navigator.userAgent;
    if (ua) {
        let browsers = ["YaBrowser", "Seamonkey", "Firefox", "OPR", "MSIE", "Chromium", "Chrome", "Safari"];
        for (let i = 0; i < browsers.length; i++) {
            let m = ua.match(new RegExp(browsers[i] + "[/\\s]([^\\s]+)"));
            if (m) {
                return browsers[i] + " " + m[1];
            }
        }
    }
    return "Chrome";
}

function getOS() {
    return navigator.appVersion;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        onWorkerMessage(sender, request, sendResponse);
        return true;
    }
);

chrome.runtime.onInstalled.addListener(
    async function (details) {
        if (typeof (onInstalledOrUpdated) === 'function') {
            if (details.reason === "install") {
                await onInstalledOrUpdated(false);
            } else if (details.reason === "update") {
                await onInstalledOrUpdated(true);
            }
        }
    }
);

async function getCurrentTab(callback) {
    const tabs = await chrome.tabs.query(
        {
            'currentWindow': true,
            'active': true
        })
    if (tabs && tabs.length === 1) {
        return tabs[0];
    }
}

async function getCurrentTabUrl() {
    const tab = await getCurrentTab();
    return tab && tab.url;
}

async function openUrlInCurrentTab(url) {
    const tab = await getCurrentTab();
    await chrome.tabs.update(tab.tabId, {'url': url})
}

async function reloadCurrentTab() {
    const {tab} = await getCurrentTab();
    await chrome.tabs.reload(tab.tabId);
}


function sendMessageToWorker(worker, type, data) {
    chrome.tabs.sendMessage(worker.tab.id, {"type": type, "data": data}).catch(_ => false);
}

async function sendMessageToAllTabs(type, data) {
    const tabs = await chrome.tabs.query({});
    for (let tab of tabs) {
        await chrome.tabs.sendMessage(tab.id, {"type": type, "data": data}).catch(_ => false);
    }
}

function emptyQuote() {
    return {
        options: [],
        sendCheckinDt: true,
        sendNights: true,
        sendPrices: true,
        sendCurrencies: true,
        sendBoardType: true,
        sendRooms: false,
        smscampaign: false,
        smsText: "",
        notes: "",
        sendSMS: true,
        postponed: false,
        dontSendEmail: false
    }
}

function trim(s) {
    if (!s) {
        return s;
    }
    return s.split("&" + "nbsp;").join(" ").split(/\s+/).join(" ").trim();
}

async function clearQuote(data, worker, sendResponse) {
    await chrome.storage.local.remove('quote');
    await setStorageData({'quote': emptyQuote()});
    await updateBadge();
    sendResponse(true)
}

function createItems(quote) {
    let items = [];
    for (let i = 0; i < quote.options.length; ++i) {
        let r = quote.options[i].checkinDt.match(/(\d+)\.(\d+)\.(\d+)/);
        let checkin = r[3] + "-" + r[2] + "-" + r[1];
        let item = {
            checkin: checkin,
            nights: parseInt(quote.options[i].nights),
            extra_nights: (quote.options[i].extra_nights ? parseInt(quote.options[i].extra_nights) : 0),
            name: quote.options[i].hotelName,
            href: quote.options[i].href,
            hrefUpdated: quote.options[i].hrefUpdated,
            resort: quote.options[i].region,
            board: quote.options[i].boardType,
            room: quote.options[i].roomType,
            price: quote.options[i].price,
            currency: quote.options[i].currency,
            country: quote.options[i].country,
            operator: quote.options[i].operator,
            initial_price: quote.options[i].initial_price,
            comment: quote.options[i].comment,
            city_from: quote.options[i].city_from,
            adults: (quote.options[i].occupancy ? quote.options[i].occupancy.adultsCount : null),
            children: (quote.options[i].occupancy ? quote.options[i].occupancy.childrenCount : null),
            child_ages: (quote.options[i].occupancy ? quote.options[i].occupancy.childAges : null),
            operator_sletat_id: quote.options[i].operatorSletatId,
            thumbnail: quote.options[i].thumbnail,
            tour_url: quote.options[i].tour_url,
            tour_name: quote.options[i].tour_name,
            excursion: quote.options[i].excursion,
            book_tour_url: quote.options[i].book_tour_url,
            agency_website: quote.options[i].agencyWebsite === true,
            pageUrl: quote.options[i].pageUrl,
            competitorExts: quote.options[i].competitorExts,
            hotel_id: quote.options[i].hotel_id,
            hotel_desc: quote.options[i].hotel_desc,
            flight: quote.options[i].flight,
            product_type: quote.options[i].product_type,
            has_discount: quote.options[i].has_discount,
            custom_thumbnail: quote.options[i].custom_thumbnail
        };
        items.push(item);
    }
    return items
}

function createAddQuoteRequest(agencyId, quote, managerId, addonVersion, addonGuid, quoteName, ord) {
    return JSON.stringify({
        quoteDetails: quote.quoteDetails,
        sms: quote.smsText,
        dontSendEmail: quote.dontSendEmail,
        items: createItems(quote),
        agency: agencyId,
        notes: quote.notes,
        addonVersion: addonVersion,
        operatingSystem: getOS(),
        browser: getBrowserVersion(),
        postponed: quote.postponed,
        managerId: managerId ? managerId : null,
        addonGuid: addonGuid,
        quote: quoteName,
        ord: Number(ord)
    });
}

async function addQuote(mode) {
    const actor = await getActorData();
    const agencyId = await getAgencyId();
    const {quote, managerId} = await getStorageData(['quote', 'managerId'])
    const addonVersion = getAddonVersion();

    quote.dontSendEmail = mode === "print quote";
    quote.smsText = mode === "print quote" ? null : quote.smsText;
    quote.postponed = (mode === "postpone quote");

    const payload = createAddQuoteRequest(agencyId, quote, managerId, addonVersion, actor.addonGuid);
    const url = `https://${DOMAIN}/quote/add`;
    const response = await post({
            url,
            content: "json=" + encodeURIComponent(payload)
        },
        [{header: "Authorization", value: `Token ${actor.idToken}`}])
    if (!response.error) {
        return onAddQuoteComplete(response, mode, quote, agencyId);
    }
    return onAddQuoteError(response.error);
}

async function addToursToQuote(options, quoteName, order, worker, sendResponse) {
    let actor = await getActorData();
    const agencyId = await getAgencyId();
    const {quote, managerId} = await getStorageData(['quote', 'managerId'])
    quote.options = options;
    const addonVersion = getAddonVersion();
    const url = `https://${DOMAIN}/quote/add-item`;
    const payload = createAddQuoteRequest(agencyId, quote, managerId, addonVersion, actor.addonGuid, quoteName, order);
    const response = await post({url, content: "json=" + encodeURIComponent(payload)}, [{
        header: "Authorization",
        value: `Token ${actor.idToken}`
    }]);
    if (!response.error) {
        sendMessageToWorker(worker, 'Items added to quote');
        sendResponse(true)
    } else {
        sendMessageToWorker(worker, 'show alert popup', {text: response.message || response.errorHtml || response.error, worker});
        sendResponse(false)
    }

}

async function logError(json) {
    const agencyId = await getAgencyId();
    const addonVersion = getAddonVersion();
    json.component = "addon";
    json.agencyId = agencyId;
    json.addonVersion = addonVersion;
    json.operatingSystem = getOS();
    json.browser = getBrowserVersion();
    json.contentScriptsVersion = typeof CONTENT_SCRIPTS_DATA === "object" ? CONTENT_SCRIPTS_DATA.contentScriptsVersion : null;

    let txt = JSON.stringify(json);
    console.log("Report error:\n" + json.stack, 'font-weight: bold; color: red', '');
    console.log(json);
    await post({
        url: `https://${DOMAIN}/report/issue`,
        content: "json=" + encodeURIComponent(txt),
    });
}

async function onAddQuoteComplete(json, mode, quote, agencyId) {
    if (json === null || json.id === null) {
        await onAddQuoteError(json && json.error ? json.errorHtml || json.error : getI18nMessage('error_operationFailed'));
        return;
    }
    await sendMessageToPopup("quote copyText", {json: json.copyText, quote: quote});
    if (quote.errors && quote.errors.length > 0) {
        await logError({
            text: "Options errors found!",
            quoteId: json.id,
            optionsErrors: quote.errors
        })
    }
    let msg = "";
    if (json.sms != null && !json.sms.success) {
        msg = getI18nMessage('error_failedSMSSend') + json.sms.error;
    }
    if (json.email != null && !json.email.success) {
        if (msg.length > 0) msg = msg + "\n";
        msg = msg + getI18nMessage('error_failedEmailSend') + json.email.error;
    }

    if (msg.length === 0) {
        await setStorageData({'quote': emptyQuote()});
        await sendMessageToPopup("quote added", {status: "success"})
        await updateBadge();
        await updatePreviousQuote(json.id);
        let url = `https://${GUARD_DOMAIN}/new/quote/` + json.id + "?agencyId=" + agencyId;
        if (mode === "print quote") {
            url = url + "&print";
        }
        openTab(url);

        if (json.additionalTabUrl) {
            openTab(json.additionalTabUrl, null, true);
        }
    } else {
        msg = getI18nMessage('caption_offersList') + " №" + json.id + getI18nMessage('text_offersListDoneAndOpen') + msg;
        await onAddQuoteError(msg, `https://${GUARD_DOMAIN}/` + json.id + "?agencyId=" + agencyId);
    }
}

async function onAddQuoteError(msg, url) {
    if (msg === getI18nMessage('error_incorrectAgencyId')) {
        await storeAgencyId("");
    }
    await sendMessageToPopup("quote added", {status: "error", message: msg, "url": url});
}

async function setOptionHref(option) {
    let actor = await getActorData();
    const agencyId = await getAgencyId();
    let payload = JSON.stringify({
        agencyId: agencyId,
        managerId: actor.managerId,
        addonGuid: actor.addonGuid,
        name: option.hotelName,
        hotel_id: option.hotel_id,
        country: option.country,
        resort: option.region,
        operatorSletatId: option.operatorSletatId,
        href: option.href,
        hrefManyhotels: option.hrefManyhotels,
        resortManyhotels: option.resortManyhotels,
        operator: option.operator,
        excursion: option.excursion,
        browser: getBrowserVersion(),
        addonVersion: chrome.runtime.getManifest().version,
        operatingSystem: getOS()
    });
    const response = await post({
            url: `https://${DOMAIN}/info/hotel-href`,
            content: "json=" + encodeURIComponent(payload)
        },
        [{header: "Authorization", value: `Token ${actor.idToken}`}]);
    const {quote} = await getStorageData(['quote'])
    if (!quote || quote.options.length === 0) {
        return;
    }

    const updatedOption = quote.options.find(o => o.hash === option.hash);
    updatedOption.href = response.href;
    updatedOption.hrefUpdated = true;
    await setStorageData({'quote': quote});

}

function trimCityFrom(city) {
    if ( typeof city !== 'string') {
        return null;
    }
    city = trim(city);
    if (  city === "" || city.match(getI18nMessage('regexp_withoutFly')) || city.toLowerCase().match(getI18nMessage('regexp_onlyHotel')) ) {
        return getI18nMessage('caption_withoutFly');
    }
    return city;
}

async function addOption(option, worker, sendResponse) {
    sendResponse('Success');
    let {quote} = await getStorageData(['quote'])
    if (!quote) {
        quote = emptyQuote();
    }

    option.checkinDt = checkObjLength(trim(option.checkinDt), "checkinDt", 10, quote);
    option.nights = checkObjLength(trim(option.nights), "nights", 3, quote);
    option.extra_nights = checkObjLength(trim(option.extra_nights), "extra_nights", 3, quote);
    option.hotelName = checkObjLength(trim(option.hotelName), "hotelName", 300, quote);
    option.href = checkObjLength(trim(option.href), "href", 1500, quote);
    option.hrefManyhotels = checkObjLength(trim(option.hrefManyhotels), "href", 1500, quote);
    option.resortManyhotels = checkObjLength(trim(option.resortManyhotels), "href", 500, quote);
    option.region = checkObjLength(trim(option.region), "region", 500, quote) || "";
    option.boardType = checkObjLength(trim(option.boardType), "boardType", 700, quote) || "";
    option.roomType = checkObjLength(trim(option.roomType), "roomType", 400, quote) || "";
    option.currency = checkObjLength(trim(option.currency), "currency", 3, quote);
    option.country = checkObjLength(trim(option.country), "country", 100, quote);
    option.comment = option.comment ? checkObjLength(option.comment.trim(), "comment", 25000, quote) : "";
    option.city_from = checkObjLength(trimCityFrom(option.city_from), "city_from", 100, quote);
    option.tour_url = checkObjLength(trim(option.tour_url), "tour_url", 1500, quote);
    option.excursion = option.excursion === true;
    option.book_tour_url = checkObjLength(trim(option.book_tour_url), "book_tour_url", 1500, quote);
    option.initial_price = checkObjLength(Math.floor(option.initial_price), "initial_price", 21, quote);
    option.price = checkObjLength(Math.floor(option.price), "price", 21, quote);
    option.pageUrl = checkObjLength(trim(option.pageUrl), "pageUrl", 1500, quote);
    option.competitorExts = checkObjLength(trim(option.competitorExts), "competitorExts", 500, quote);
    option.has_discount = option.has_discount === true;
    option.hotel_desc = checkObjLength(trim(option.hotel_desc), "hotel_desc", 10000, quote);
    option.flight = checkObjLength(option.flight, "flight", 20000, quote);
    option.occupancy = checkObjLength(option.occupancy, "occupancy", 100, quote);

    quote.options.push(option);

    console.log("current option: ", option);
    console.log("current quote: ", quote);
    await setStorageData({'quote': quote});
    await updateBadge(quote);
    await showNotification(getI18nMessage('caption_hotelAdded'), option.hotelName + " " + option.price + " " + option.currency);
    if ( option.hrefUpdated !== true ) {
        setOptionHref(option, quote).then(_ => console.log("option href updated")).catch(e => console.log(e));
    }

}

function checkObjLength(obj, name, maxLength, quote) {
    if (!obj) {
        return obj;
    }
    let string = typeof obj !== "string" ? JSON.stringify(obj) : obj;
    if (string && string.length > maxLength) {
        let substr;
        if (["href", "tour_url", "book_tour_url", "pageUrl"].indexOf(name) !== -1) {
            substr = "";
        } else {
            substr = string.substring(0, maxLength);
        }
        quote.errors = quote.errors && Array.isArray(quote.errors) ? quote.errors : [];
        quote.errors.push({
            title: "Max option length exceeded: " + name,
            text: substr
        });
        return typeof obj !== "string" ? null : substr;
    }
    return obj;
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

async function notifyServerOnAddonInstalledOrUpdated() {
    let {'addon-version': prevVersion} = await getStorageData(['addon-version']);
    const agencyId = await getAgencyId();
    const addonVersion = getAddonVersion();
    const addonGuid = await getAddonGuid();
    let currVersion = addonVersion;
    if (!prevVersion) {
        prevVersion = null;
    }
    let payload = JSON.stringify({
        agencyId,
        addonVersion: currVersion,
        operatingSystem: getOS(),
        browser: getBrowserVersion(),
        previousVersion: prevVersion,
        guid: addonGuid
    });
    const response = await post({
        url: `https://${DOMAIN}/info/addon-updated`,
        content: "json=" + encodeURIComponent(payload)
    });
    if (response.url) {
        openTab(rs.url)
    }
    await setStorageData({'addon-version': currVersion});
}

function generateUUID() {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

async function getAddonGuid() {
    let {addonGuid} = await getStorageData(['addonGuid']);
    if (!addonGuid) {
        addonGuid = generateUUID();
        await setStorageData({'addonGuid': addonGuid});
    }
    return addonGuid;
}

async function onInstalledOrUpdated(isUpdated) {
    console.log("browser extension has just been installed or updated", {isUpdated});
    await updateContentScripts();
    globalThis.workersArray = [];
    const tabs = await chrome.tabs.query({});
    tabs.forEach(tab => {
        findApplicableContentScriptAndInject(tab);
    });
    await notifyServerOnAddonInstalledOrUpdated(isUpdated);
    const domain = tabs.map(tab => getOpenedQuiQuoDomain(tab.url))
        .find(domain => domain) || DEFAULT_DOMAIN;
    const url = await getCurrentTabUrl();
    if ( url && url.indexOf(`${domain}/agency/browser-extension`) !== -1 ) {
        await openUrlInCurrentTab(`https://${domain}/agency/tutorial-quote-create`);
    } else if ( url && endsWith(url, `${domain}/agency`) ) {
        await reloadCurrentTab();
    } else if ( !isUpdated ) {
        openTab(`https://${domain}/agency/tutorial-quote-create`);
    }

}

function getOpenedQuiQuoDomain(url) {
    return SERVER_DOMAINS.find(domain => {
        return url.indexOf(`${domain}`.replace(/\/+/g, '/')) !== -1;
    })
}

async function initQuote() {
    const {quote} = await getStorageData(['quote']);
    if (!quote) {
        await clearQuote();
    }
    await updateBadge(quote);
}

async function updateBadge(quote) {
    if (quote && quote.options && quote.options.length > 0) {
        await setBadgeText("" + quote.options.length);
    } else {
        await setBadgeText("");
    }
}

addPopupMessageListener("save quote", async function (quote) {
    await setStorageData({'quote': quote})
    await updateBadge(quote);
});

addPopupMessageListener("add quote", async function () {
    await addQuote("add quote");
});

addWorkerMessageListener("add items to quote", function (data, worker, sendResponse) {
    addToursToQuote(data.addingOptions, data.quoteName, data.order, worker, sendResponse);
});

addPopupMessageListener("postpone quote", async function () {
    await addQuote("postpone quote");
});

addPopupMessageListener("clear quote", clearQuote);
addPopupMessageListener("open tab", (data)=>openTab(data));

addWorkerMessageListener("get init params", async function (msg, worker, sendResponse) {

    const data = await getStorageData(['showSletatPrices', 'isQuickReservationActive', 'hideQuickReservationTutorial',
        'showTaRatingOnSite', 'hideTHRating', 'cannotMakeQuote', 'cannotMakeQuoteHtml',
        'extractFlight', 'managers', 'managerId',
        'hideQuickLogin', 'crmName', 'crmTutorial', 'isQuickBookingActive', 'hideQuickBookingTutorial', 'accountno', 'tourvisorMessage', 'tourvisorAllowed']);
    if ( !data.accountno ) {
        sendResponse(null)
    }

    sendResponse( {
        showSletatPrices: data.showSletatPrices === true,
        isQuickReservationActive: data.isQuickReservationActive === true,
        showTaRatingOnSite: getManagerFlag(data.managers, data.managerId, data.showTaRatingOnSite, "showTaRatingOnSite"),
        hideQuickReservationTutorial: data.hideQuickReservationTutorial === true,
        cannotMakeQuote: !!data.cannotMakeQuote === true,
        cannotMakeQuoteText: data.cannotMakeQuoteHtml || data.cannotMakeQuote,
        extractFlight: getManagerFlag(data.managers, data.managerId, data.extractFlight, "extractFlight"),
        crmName: data.crmName,
        crmTutorial: data.crmTutorial,
        isQuickBookingActive: data.isQuickBookingActive === true,
        hideQuickBookingTutorial: data.hideQuickBookingTutorial === true,
        tourvisorMessage: data.tourvisorMessage || '',
        tourvisorAllowed: data.tourvisorAllowed !== false

    });
});

addWorkerMessageListener("get info for freshdesk", async function (msg, worker, sendResponse) {
    const result = await sendFreshdeskInfo();
    sendResponse(result);
});

async function sendFreshdeskInfo() {
    const data = await getStorageData(['agencyLogin',
        'cannotMakeQuote', 'predefinedDiscounts', 'showPercentageDiscount', 'managers',
        'managerId', 'isTestPeriod', 'isQuickReservationActive', 'hideTHRating', 'showTaRatingOnSite',
        'hideQuickReservationTutorial', 'extractFlight', 'contentScriptsVersion', 'contentScriptsAutoInject',
        'quickLogin', 'accountno', 'hideQuickLogin', 'isQuickBookingActive', 'hideQuickBookingTutorial']);

    data.currentContentScriptsVersion = CONTENT_SCRIPTS_DATA.contentScriptsVersion;
    data.quickLogin = data.quickLogin ? data.quickLogin.isActive : false;
    return data;
}

addWorkerMessageListener("get agency id", async function (msg, worker, sendResponse) {
    const agencyId = await getAgencyId();
    sendResponse(agencyId);
});

addWorkerMessageListener("get agency login", async function (msg, worker) {
    const {agencyLogin} = await getStorageData(['agencyLogin']);
    sendMessageToWorker(worker, "agency login", agencyLogin);

});

addPopupMessageListener("save manager id", async function (managerId) {
    console.log("save manager id", managerId)
    const savedManager = await setStorageData({managerId});
    await sendFreshdeskInfo('to all tabs');
});

addPopupMessageListener("popuperror", logError);

function getManagerFlag(managers, managerId, agencyFlagValue, managerFlagName) {
    let currentManager = (managers || []).find(manager => manager.id === managerId);
    if (currentManager === undefined) {
        return agencyFlagValue === true;
    }
    return currentManager[managerFlagName] === undefined ? agencyFlagValue === true : currentManager[managerFlagName] === true;
}

async function updatePreviousQuote(lastQuote) {
    const {lastQuote: previousQuote} = await getStorageData(['lastQuote']);
    await setStorageData({'previousQuote': previousQuote, 'lastQuote': lastQuote});
}

function showErrorPage() {
    openTab(`https://${GUARD_DOMAIN}/addon-error/report?version=` + getAddonVersion());
}

addWorkerMessageListener("add clicked", addOption);

addWorkerMessageListener("store agency id and load", async function (newId) {
    const storedId = getAgencyId();
    if (storedId !== newId) {
        await storeAgencyId(newId)
        await updateAgencyInfo();
    }
});

addWorkerMessageListener("error", logError);

addWorkerMessageListener("get previous quote", async function (msg, worker, sendResponse) {
    const {previousQuote} = await getStorageData(['previousQuote']);
    if (previousQuote) {
        return sendResponse(previousQuote)
    }
    return sendResponse(null)
});

async function notifyServerOnQuoteLoaded(quoteId) {
    const agencyId = await getAgencyId();
    let payload = JSON.stringify({agencyId: agencyId, quoteId: quoteId});
    await post({
        url: `https://${DOMAIN}/info/quote-loaded`,
        content: "json=" + encodeURIComponent(payload),
    });

}

async function mergeQuotes(sq, q) {
    q.notes = sq.notes;
    q.quoteDetails = sq.quoteDetails;
    for (let i = 0; i < sq.items.length; ++i) {
        let si = sq.items[i];
        let op = {
            checkinDt: si.checkin,
            nights: parseInt(si.nights),
            extra_nights: parseInt(si.extra_nights),
            hotelName: si.name,
            href: si.href,
            pageUrl: si.pageUrl,
            hrefUpdated: true,
            region: si.resort,
            boardType: si.board,
            roomType: si.room,
            price: si.price,
            currency: si.currency,
            country: si.country,
            operator: si.operator,
            initial_price: si.initial_price,
            thumbnail: si.thumbnail,
            tour_url: si.tour_url,
            tour_name: si.tour_name,
            comment: si.comment,
            city_from: si.city_from,
            operator_sletat_id: si.operator_sletat_id,
            excursion: si.excursion,
            book_tour_url: si.book_tour_url,
            occupancy: {
                adultsCount: si.adults,
                childrenCount: si.children,
                childAges: si.child_ages
            },
            competitorExts: si.competitorExts,
            hotel_id: si.hotel_id,
            hotel_desc: si.hotel_desc,
            flight: si.flight,
            product_type: si.product_type,
            has_discount: si.has_discount,
            custom_thumbnail: si.custom_thumbnail
        };
        q.options.push(op);
    }

    await setStorageData({'quote': q});
    console.log('quote was loaded', q);
    await updateBadge(q);
    await showNotification(getI18nMessage('caption_quoteLoaded'), getI18nMessage('text_quoteLoaded'));

    await notifyServerOnQuoteLoaded(sq.id);
}

async function onServerQuoteReceived(sq) {
    let {quote} = await getStorageData(['quote']);
    if (!quote) {
        quote = emptyQuote();
    }
    await mergeQuotes(sq, quote);
}

async function sendLoadQuoteRQtoServer(quoteId) {
    try {
        console.log("loading quote " + quoteId);
        const agencyId = await getAgencyId();
        let payload = JSON.stringify({agencyId: agencyId, quoteId: quoteId});
        const response = await post({
            url: `https://${DOMAIN}/info/get-quote`,
            content: "json=" + encodeURIComponent(payload)
        });
        if (!response.error) {
            await onServerQuoteReceived(response.quote);
        }

    } catch (e) {
        showErrorPage();
        await logError({
            title: "Failed to load quote " + quoteId + " - " + e.message,
            stack: e.stack
        });
    }
}

addWorkerMessageListener("load quote", async function (quoteId) {
    await sendLoadQuoteRQtoServer(quoteId);
});

addWorkerMessageListener("copy quote", async function () {
    await showNotification(getI18nMessage('caption_copyQuote'),
        getI18nMessage('text_copyQuote'));
});

addWorkerMessageListener("showerrorpage", showErrorPage);

addWorkerMessageListener("get operator currency", async function (operator, worker) {
    const data = await getStorageData([operator + 'Currency']);
    sendMessageToWorker(worker, operator + " currency", data[operator + 'Currency']);
});

addWorkerMessageListener("set operator currency", async function (msg) {
    let json = {};
    json[msg.operator + 'Currency'] = msg.currency;
    await setStorageData(json);
});

addWorkerMessageListener("copy quote details from uon", async function (quoteDetails) {
    let {quote} = await getStorageData('quote');
    if (!quote) {
        quote = emptyQuote();
    }
    quote.quoteDetails = quoteDetails;
    console.log("saving quote details from U-ON to quote: ", quote);

    await setStorageData({'quote': quote});
    await showNotification(getI18nMessage('caption_dataSaved'), getI18nMessage('text_quoteDetailsSavedCrm'));
});

addWorkerMessageListener("empty quote details in uon", async function () {
    console.log("warning about empty quote details  in U-ON");
    await showNotification(getI18nMessage('error_emptyQuoteDetails'), getI18nMessage('text_emptyQuoteDetails'));
});

addWorkerMessageListener("captured uon api key", async function (key) {
    const agencyId = await getAgencyId()
    let json = {};
    json.agencyId = agencyId;
    json.key = key;

    let txt = JSON.stringify(json);
    console.log("sending captured uon api key to server");
    await post({
        url: `https://${DOMAIN}/agency/uon/api-key`,
        content: "json=" + encodeURIComponent(txt),
    });
});

addPopupMessageListener("set popupBannerClosed", async function (data) {
    await setStorageData({"popupBannerClosed": data});
});

addPopupMessageListener("popupshowerrorpage", showErrorPage);

addPopupMessageListener("copyText notify", async function () {
    await showNotification(getI18nMessage('caption_copyQuote'), getI18nMessage('text_copyQuote'));
});

async function showImportantNewsNotifications() {
    const {importantNews, newsBannerNotif} = await getStorageData(['importantNews', 'newsBannerNotif'])
    let news = importantNews || [];
    let notified = newsBannerNotif || [];

    news = news.filter(function (n) {
        return notified.indexOf(n.id) === -1;
    });

    if (news.length === 0) {
        return;
    }

    news.forEach(function (n) {
        showNotification(getI18nMessage('caption_importantNews'), n.plain_text);
        notified.push(n.id);
    });

    notified = notified.slice(-40);
    await setStorageData({'newsBannerNotif': notified});
}

async function checkAnnounces() {
    async function chooseAnnounceToShow(continuation) {
        const {shownAnnounces, announces = []} = await getStorageData(['shownAnnounces', 'announces']);
        let shown = shownAnnounces || "";
        let toShowIdx = -1;

        for (let i = 0; i < (announces || []).length; i++) {
            if (shown.indexOf("," + announces[i].id + ",") === -1) {
                console.log(announces[i])
                toShowIdx = i;
                break;
            }
        }
        continuation(toShowIdx !== -1 ? announces[toShowIdx] : null);
    }

    async function showAnnounce(announce) {
        let url = `https://${GUARD_DOMAIN}/announces/` + announce.url;
        openTab(url);
        const {shownAnnounces} = await getStorageData(['shownAnnounces'])
        let shown = shownAnnounces ? (shownAnnounces + announce.id + ",") : ("," + announce.id + ",");
        await setStorageData({'shownAnnounces': shown});
    }

    try {
        await chooseAnnounceToShow(function (announce) {
            if (announce)
                showAnnounce(announce);
        });
    } catch (e) {
        await logError({
            title: "Failed to process announces - " + e.message,
            stack: e.stack
        });
    }
    setTimeout(checkAnnounces, 10 * 60 * 1000);
}

addWorkerMessageListener("get discount settings", async function (msg, worker, sendResponse) {
    const data = await getStorageData(['predefinedDiscounts', 'showPercentageDiscount']);
    msg.discountSettings = {
        predefinedDiscounts: data.predefinedDiscounts || [],
        showPercentageDiscount: data.showPercentageDiscount
    };
    msg.url = worker.url;
    sendResponse(msg)
});

addPopupMessageListener("request agency id", async function (data) {
    await updateAgencyInfo(data);
});

addPopupMessageListener("update balance", async function () {
    await updateAgencyInfo(null, true);
});

async function storeAgencyInfo(rs) {
    async function getValidManagerId() {
        const data = await getStorageData(['managerId']);
        let managers = rs.managers ? rs.managers : [];
        let managerId = data['managerId'] ? data['managerId'] : null;
        let isIdValid = managers.filter(function (e) {
            return e.id === managerId;
        }).length > 0;
        if (managerId && !isIdValid) {
            console.log("manager #" + managerId + " was not found");
            managerId = null;
        }
        if (managers.length === 1) {
            managerId = managers[0].id;
        }
        return managerId;
    }

    const managerId = await getValidManagerId();
    await setStorageData({
        'agencyLogin': rs.login,
        'agencyLogoUrl': rs.agencyLogoUrl || false,
        'announces': rs.announces || [],
        'cannotMakeQuote': rs.cannotMakeQuote || false,
        'cannotMakeQuoteHtml': rs.cannotMakeQuoteHtml || false,
        'predefinedDiscounts': rs.predefinedDiscounts || [],
        'showPercentageDiscount': rs.showPercentageDiscount,
        'managers': (rs.managers || []).map(cutManagerName),
        'domain': rs.domain || DEFAULT_DOMAIN,
        'managerId': managerId,
        'showSletatPrices': rs.showSletatPrices,
        'isTestPeriod': rs.isTestPeriod,
        'importantNews': rs.importantNews,
        'isQuickReservationActive': rs.isQuickReservationActive,
        'hideTHRating': rs.hideTHRating,
        'showTaRatingOnSite': rs.showTaRatingOnSite,
        'hideQuickReservationTutorial': rs.hideQuickReservationTutorial,
        'extractFlight': rs.extractFlight,
        'idToken': rs.idToken,
        'contentScriptsVersion': rs.contentScriptsVersion,
        'contentScriptsAutoInject': rs.contentScriptsAutoInject,
        'quickLogin': rs.quickLogin,
        'hideQuickLogin': rs.hideQuickLogin,
        'hideQuickBookingTutorial': rs.hideQuickBookingTutorial,
        'isQuickBookingActive': rs.isQuickBookingActive,
        'accountno': rs.accountno,
        'tourvisorAllowed': rs.tourvisorAllowed !== false,
        'tourvisorMessage': rs.tourvisorMessage || ''
    });

    globalThis.GUARD_DOMAIN = rs.domain || DEFAULT_DOMAIN;
    globalThis.DOMAIN = 'extension.' + (rs.domain || DEFAULT_DOMAIN);
}

function cutManagerName(manager) {
    if (!manager.name) {
        return manager;
    }
    const nameLength = manager.name.length
    manager.name = nameLength > 30 ? `${manager.name.slice(0, 30)}...` : manager.name;
    return manager;
}


async function updateAgencyInfo(loginAndPassword, updateBalance, callback) {
    await setDomain();
    await getOrderData();
    let actor = await getActorData();
    const agencyId = await getAgencyId();
    if (!agencyId && !loginAndPassword) {
        return;
    }
    let payload = {
        managerId: actor.managerId || null,
        addonGuid: actor.addonGuid,
        browser: getBrowserVersion(),
        addonVersion: chrome.runtime.getManifest().version,
        operatingSystem: getOS()
    };
    payload = loginAndPassword ? Object.assign(payload, loginAndPassword) : Object.assign(payload, {id: agencyId});
    const response = await post({
        url: `https://${DOMAIN}/info/get-agency`,
        content: "json=" + encodeURIComponent(JSON.stringify(payload))
    });
    if (!response.error) {
        globalThis.AG_INF_ERR = 0;
        await storeAgencyInfo(response);
        if (loginAndPassword && loginAndPassword.login && loginAndPassword.password) {
            await storeAgencyId(response.id);
            const {quote} = await getStorageData(['quote']);
            response.quote = quote;
            response['agency-id'] = response.id;
            await sendMessageToPopup("obtained agency id", {status: "success", response});
        }
        if (updateBalance) {
            const agencyInfo = await getStorageData(['quote', 'managers', 'managerId', 'importantNews', 'cannotMakeQuote', 'cannotMakeQuoteHtml',
                'agencyLogoUrl', 'isTestPeriod', 'isQuickReservationActive', 'hideQuickReservationTutorial',
                'showTaRatingOnSite', 'extractFlight', 'hideQuickLogin',
                'isQuickBookingActive', 'hideQuickBookingTutorial'])
            agencyInfo['agency-id'] = agencyId;
            await sendMessageToPopup("updated balance", agencyInfo);

        }
        if (callback) {
            callback();
        }
        return response;
    }

    if (response.error || !response.ok) {
        const msg = response?.error.message || response.statusText;
        if (loginAndPassword && loginAndPassword.login && loginAndPassword.password) {
            await sendMessageToPopup("obtained agency id", {status: "error"});
        }

        if (updateBalance) {
            await sendMessageToPopup("updated balance", {status: "error", msg: msg, httpStatus: response.status});
        }

        if (msg && msg.indexOf(getI18nMessage('error_responseParsing')) >= 0 && msg.indexOf(getI18nMessage('error_internetBlocked')) >= 0)
            return;

        if (response.status === 0 && ++AG_INF_ERR < 6) {
            return;
        }

        await logError({
            title: "Failed to load agency info - " + msg
        });
        console.log('Failed to load agency info - ' + msg);

        if (response.status === 400) {
            await storeAgencyId("");
        }
    }
}

async function loadAgencyInfo() {
    await updateAgencyInfo(null, null, updateContentScripts);
    await showImportantNewsNotifications();
    checkActualUserSalt();
    setTimeout(loadAgencyInfo, 10 * 60 * 1000);
}

async function showNotification(title, text) {
    const {managers, managerId} = await getStorageData(['managers', 'managerId']);
    if (!managerId || !managers || managers.length === 0) {
        createNotification(title, text);
        return;
    }
    let manager = managers.find(mgr => {
        return mgr.id === managerId
    });
    if (manager && manager.plugin_notify !== false) {
        createNotification(title, text);
    }
}

async function setDomain() {
    const {domain} = await getStorageData('domain');
    if (!domain) {
        const fastestDomain = await getFastestDomain();
        globalThis.DOMAIN = 'extension.' + (fastestDomain || globalThis.DEFAULT_DOMAIN);
        globalThis.GUARD_DOMAIN = fastestDomain || globalThis.DEFAULT_DOMAIN;
    } else {
        globalThis.DOMAIN = 'extension.' + domain;
        globalThis.GUARD_DOMAIN = domain;
    }
}

async function getFastestDomain() {
    const result = await Promise.race(SERVER_DOMAINS.map(testConnection))
    console.log('Fastest domain: ', result);
    return result;
}

function testConnection(domain) {
    return fetch(`https://${domain}/nothing`).then(resp => resp.ok ? domain : null)
}

loadAgencyInfo().then(checkAnnounces);

addWorkerMessageListener("get orderData", async function (operator, worker, sendResponse) {
    const orderData = await getOrderData();
    sendResponse(orderData);
});

addWorkerMessageListener("copy order data", async function (orderData, worker) {
    await notifyServerOnQuickReservationActioned(orderData, worker);
});

async function getOrderData() {
    const {orderData} = await getStorageData('orderData');
    let current = new Date().getTime();
    if (orderData && current - orderData.time > 10800000) {
        const emptyOrderData = {
            crmName: orderData.crmName,
            crmTutorial: orderData.crmTutorial
        }
        await setStorageData({'orderData': emptyOrderData} );
        return emptyOrderData;

    }
    return orderData;
}

async function notifyServerOnQuickReservationActioned(orderData, worker) {
    const {addonGuid, managerId, agencyId} = await getActorData();
    const payload = JSON.stringify({
        agencyId,
        addonVersion: chrome.runtime.getManifest().version,
        operatingSystem: getOS(),
        browser: getBrowserVersion(),
        guid: addonGuid,
        manager: {id: managerId}
    });

    const result = await fetch(`https://${DOMAIN}/info/quick-reservation-actioned`, {
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        }, method: 'POST', body: "json=" + encodeURIComponent(payload)
    });
    if (result.ok) {
        await setStorageData({
            'orderData': orderData,
            'crmName': orderData.crmName,
            'crmTutorial': orderData.crmTutorial
        });
        return showNotification("Qui-Quo", getI18nMessage('caption_touristsDataSaved'));
    }
    const {message, messageHtml} = await result.json();
    sendMessageToWorker(worker, 'show alert popup', {text: 'Ошибка при сохранении', details: messageHtml || message})
}

initQuote();

//--------------------------------------------------------- Added tours -------------------------------//
async function removeOption(hash, worker, sendResponse) {
    let {quote} = await getStorageData('quote');
    if (!quote) {
        return;
    }
    quote.options = quote.options.filter(option => {
        return option.hash !== +hash.replace("qq-hash", "");
    });
    await setStorageData({'quote': quote});
    await updateBadge(quote);
    await showNotification('Qui-Quo', getI18nMessage('text_hotelRemoved'));
    sendResponse(true)
}

addWorkerMessageListener("remove clicked on TO page", removeOption);

addPopupMessageListener("remove clicked in QQ popup", function (hashList) {
    sendMessageToAllTabs("find and delete added option", hashList);
});

async function getActorData() {
    let actor = await getStorageData(['managerId', 'agency-id', 'addonGuid', 'idToken']);

    if (!actor.addonGuid) {
        actor.addonGuid = generateUUID();
        await setStorageData({'addonGuid': actor.addonGuid});
    }
    await setUninstallURL(actor.addonGuid, actor['agency-id']);
    return {
        managerId: actor.managerId,
        agencyId: actor['agency-id'],
        addonGuid: actor.addonGuid,
        idToken: actor.idToken,
        browser: getBrowserVersion()
    };
}

async function setUninstallURL(addonGuid, agencyId) {
    try {
        await chrome.runtime.setUninstallURL(`https://${GUARD_DOMAIN}/info/addon/remove?addonGuid=${addonGuid}&id=${agencyId}`);
    } catch (e) {
        return null;
    }
}


//--------------------------------------rating-----------------------------------------------

const ratingRequester = RatingRequester();
addWorkerMessageListener("get hotel link by hotel options", async function (review) {
    const data = {
        review
    };
    const url = `https://rating.${GUARD_DOMAIN}/review-link-v2`;
    await ratingRequester.getHotelLink(data, url);
});

addWorkerMessageListener("request ratings", function (options, worker, sendResponse) {
    console.log("request ratings", {options})
    ratingRequester.appendToQueue(createRatingRq(options))
    sendResponse(true)
});

function RatingRequester() {
    let hotelsQueue = [];
    let requestQueue = [];
    let currentRequests = 0;
    let maxBatchSize = 100;
    let timeout;
    let requestInProgress = false;
    let tooManyRequestsCount = 1;

    // Buckets to manage rate limits
    const requestBuckets = {
        second: {limit: 1, interval: 2000, timer: null, usedRequests: 0},
        minute: {limit: 20, interval: 60000, timer: null, usedRequests: 0},
        tenMinutes: {limit: 100, interval: 600000, timer: null, usedRequests: 0}
    };

    const appendToQueue = (options) => {
        hotelsQueue = [...hotelsQueue, ...options];
        clearTimeout(timeout);
        timeout = setTimeout(async ()=> {
            await updateAgencyInfo(null, null)
            if (hotelsQueue.length >= maxBatchSize) {
                return createBatchRequest();
            }
            processQueue();
        }, 1200);

    };

    const createBatchRequest = () => {
        if (hotelsQueue.length === 0) return;
        const options = hotelsQueue.splice(0, maxBatchSize);
        requestQueue.push(options);
        processQueue('createBatchRequest');
    };

    const processQueue = () => {
        if ( requestInProgress ) {
            return;
        }

        if (requestBuckets.tenMinutes.usedRequests >= requestBuckets.tenMinutes.limit ||
            requestBuckets.minute.usedRequests >= requestBuckets.minute.limit ||
            requestBuckets.second.usedRequests >= requestBuckets.second.limit) {
            return;
        }

        if (requestQueue.length === 0) {
            if (hotelsQueue.length > 0) {
                createBatchRequest();
            }
            return;
        }
        requestBuckets.second.usedRequests++;
        requestBuckets.minute.usedRequests++;
        requestBuckets.tenMinutes.usedRequests++;
        startTimers();
        sendRequest();
    };

    const startTimers = () => {
        if (!requestBuckets.second.timer) {
            requestBuckets.second.timer = setTimeout(() => {
                requestBuckets.second.timer = null;
                requestBuckets.second.usedRequests = 0;
                processQueue('second');
            }, requestBuckets.second.interval);
        }

        if (!requestBuckets.minute.timer) {
            requestBuckets.minute.timer = setTimeout(() => {
                requestBuckets.minute.timer = null;
                requestBuckets.minute.usedRequests = 0;
                processQueue('minute');
            }, requestBuckets.minute.interval);
        }

        if (!requestBuckets.tenMinutes.timer) {
            requestBuckets.tenMinutes.timer = setTimeout(() => {
                requestBuckets.tenMinutes.timer = null;
                requestBuckets.tenMinutes.usedRequests = 0;
                processQueue('tenMinutes');
            }, requestBuckets.tenMinutes.interval);
        }
    };

    const sendRequest = async () => {
        const options = requestQueue.pop();
        requestInProgress = true;
        if ( tooManyRequestsCount > 5 ) {
            requestInProgress = false;
            currentRequests = 0;
            hotelsQueue = [];
            requestQueue = [];
            timeout = null;
            tooManyRequestsCount = 1;
            return
        }
        try {
            const response = await getRatings(options);
            if ( response.status === 429 ) {
                currentRequests++;
                requestQueue.push(options)
                tooManyRequestsCount++;
                await waiting(tooManyRequestsCount * 1000);
            }
        } catch (error) {
            console.error('Request failed:', error);
        } finally {
            requestInProgress = false;
            currentRequests--;
            processQueue('sendRequest');
        }
    };

    const getHotelLink = async (data, url, attempt = 0) => {
        const {token, requestData} = await createRequestData(data)
        const response = await post({url, content: JSON.stringify(requestData), contentType: "application/json"}, [{
            header: "Authorization",
            value: `Token ${token}`
        }]);

        if (response.status === 401) {
            if (attempt === 0) {
                await updateAgencyInfo(null, null)
                return await getHotelLink(data, url, 1);
            }
            return null;
        }

        if (response.status === 429) {
            if (attempt  === 0) {
                await waiting(1000);
                return await getHotelLink(data, url, attempt + 1);
            }
            return null;
        }

        if (!response.error && response.url ) {
            const url = response.url.replace('qui-quo.ru', GUARD_DOMAIN)
            openTab(url, null, false);
        }

    }

    return {appendToQueue, getHotelLink};
}

async function createRequestData(initialData = {}) {
    const requestData = Object.assign({}, initialData);
    const actor = await getActorData();
    const token = actor.idToken;
    delete actor.idToken;
    requestData.actor = actor;
    return {requestData, token};
}

function createRatingRq(options) {
    return options.map(function (option) {
        return {
            id: option.id,
            country: option.country,
            hotelName: option.hotelName,
            operator: option.operator,
            resort: option.region
        };
    });
}


async function getRatings(options) {
    console.log('Send rating request', {options})
    const url = `https://rating.${GUARD_DOMAIN}/ratings`;
    const startTime = Date.now();
    const {requestData, token} = await createRequestData()
    requestData.options = options;

    const response = await post({
        url: url,
        content: JSON.stringify(requestData),
        contentType: "application/json"
    }, [{header: "Authorization", value: `Token ${token}`}]);
    if (!response.error) {
        sendMessageToAllTabs("ratings", {
            ratings: response,
            sendingTime: new Date().getTime() - startTime
        });
    }
    return response;

}

//------------------------------------------------------Program injecting--------------------------------------------//

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
        await findApplicableContentScriptAndInject(tab);
    }
});

chrome.tabs.onRemoved.addListener(function (tabId) {
    workersArray = removeDuplicates(workersArray.filter(worker => worker.id !== tabId));
});

addWorkerMessageListener("reinject content-scripts", async function (data, worker) {
    await findApplicableContentScriptAndInject(worker.tab, true);
});

addWorkerMessageListener("inject found module", async function (data, worker) {
    const contentScriptsAutoInject = await getContentScriptsAutoInject();
    console.log("found module", data);
    if (contentScriptsAutoInject === "inject") {
        await injectContentScripts(data, worker.tab)
    }
});

async function updateContentScripts() {
    await setDomain();
    if (checkDevMode()) {
        console.log(`%c The extension is running in developer mode`, 'background: green;color: #black;')
        return;
    }
    const {contentScriptsVersion} = await getStorageData('contentScriptsVersion');
    const contentScriptsLocal = await getContentScripts();
    filterBugFixesData(contentScriptsLocal['bug_fixes']);
    if (contentScriptsVersion && (contentScriptsLocal["contentScriptsVersion"] === contentScriptsVersion)) {
        return;
    }
    const contentScriptsRemote = await fetchJson(`https://${DOMAIN}/content-scripts/data/content-scripts.json`);
    if (contentScriptsRemote) {
        setContentScriptsData(contentScriptsRemote["content_scripts"], contentScriptsRemote['contentScriptsVersion'], contentScriptsRemote['bug_fixes']);
    }
}

function checkDevMode() {
    try {
        return typeof browser === 'undefined' && !chrome.runtime.getManifest().update_url;
    } catch (e) {
        return false;
    }
}

function filterBugFixesData(bugFixes) {
    CONTENT_SCRIPTS_DATA["bug_fixes"] = (bugFixes || []).filter(fix => {
        const manifestVersion = chrome.runtime.getManifest().version;
        return fix.from ? (lessOrEqualTo(fix.from, manifestVersion) && lessOrEqualTo(manifestVersion, fix.to)) :
            lessOrEqualTo(manifestVersion, fix.to);
    });
}

async function getContentScripts() {
    if (checkDevMode() || !globalThis.CONTENT_SCRIPTS_DATA.content_scripts || globalThis.CONTENT_SCRIPTS_DATA.content_scripts.length === 0) {
        globalThis.CONTENT_SCRIPTS_DATA = await fetchJson("../data/content-scripts.json");
    }
    if (!CONTENT_SCRIPTS_DATA) {
        globalThis.CONTENT_SCRIPTS_DATA = emptyContentScripts();
    }
    return globalThis.CONTENT_SCRIPTS_DATA;
}

function setContentScriptsData(cs, version, bugFixes) {
    CONTENT_SCRIPTS_DATA["contentScriptsVersion"] = version || null;
    CONTENT_SCRIPTS_DATA["content_scripts"] = cs;
    filterBugFixesData(bugFixes);
}


async function findApplicableContentScriptAndInject(tab, forceInject) {
    try {
        if (!tab.url && tab.id) {
            tab = await getTabById(tab.id);
        }
        const contentScriptsLocal = await getContentScripts();
        let found = (contentScriptsLocal["content_scripts"] || []).find(script => {
            const matched = (script.matches || []).find(urls => {
                return (tab.url.match(matchPatternToRegExp(urls)));

            });
            if (!matched) {
                return false;
            }
            const excluded = (script.exclude_matches || []).find(urls => {
                return (tab.url.match(matchPatternToRegExp(urls)));
            });
            return matched && !excluded;
        });
        if (found) {
            await injectContentScripts(found, tab, forceInject);
        } else {
            const contentScriptsAutoInject = await getContentScriptsAutoInject();
            if (contentScriptsAutoInject === "check" || contentScriptsAutoInject === "inject") {
                await injectContentScripts({"js": ["data/operators/find-module.js"]}, tab);
            }
            globalThis.workersArray = removeDuplicates(workersArray.filter(worker => worker.id !== tab.id));
        }
    } catch (e) {
        console.log(e)
        return null
    }
}

function getTabById(id) {
    return chrome.tabs.get(id)
}

async function getContentScriptsAutoInject() {
    const {contentScriptsAutoInject} = await getStorageData('contentScriptsAutoInject');
    return (contentScriptsAutoInject && contentScriptsAutoInject !== 'none') ? contentScriptsAutoInject : null
}

function fetchJson(url) {
    return fetch(url, {'cache': 'no-cache'}).then(resp => resp.json()).catch(_ => null);
}

function fetchTextUsingHttpCache(url) {
    return fetch(url).then(resp => resp.ok ? resp.text() : null).catch(_ => null);
}

/**
 * Transforms a valid match pattern into a regular expression
 * which matches all URLs included by that pattern.
 *
 * @param  {string}  pattern  The pattern to transform.
 * @return {RegExp}           The pattern's equivalent as a RegExp.
 * @throws {TypeError}        If the pattern is not a valid MatchPattern
 */
function matchPatternToRegExp(pattern) {
    if (pattern === '') {
        return (/^(?:http|https|file|ftp|app):\/\//);
    }

    const schemeSegment = '(\\*|http|https|file|ftp)';
    const hostSegment = '(\\*|(?:\\*\\.)?(?:[^/*]+))?';
    const pathSegment = '(.*)';
    const matchPatternRegExp = new RegExp(
        `^${schemeSegment}://${hostSegment}/${pathSegment}$`
    );

    let match = matchPatternRegExp.exec(pattern);
    if (!match) {
        throw new TypeError(`"${pattern}" is not a valid MatchPattern`);
    }

    let [, scheme, host, path] = match;
    if (!host) {
        throw new TypeError(`"${pattern}" does not have a valid host`);
    }

    let regex = '^';

    if (scheme === '*') {
        regex += '(http|https)';
    } else {
        regex += scheme;
    }

    regex += '://';

    if (host && host === '*') {
        regex += '[^/]+?';
    } else if (host) {
        if (host.match(/^\*\./)) {
            regex += '[^/]*?';
            host = host.substring(2);
        }
        regex += host.replace(/\./g, '\\.');
    }

    if (path) {
        if (path === '*') {
            regex += '(/.*)?';
        } else if (path.charAt(0) !== '/') {
            regex += '/';
            regex += path.replace(/\./g, '\\.').replace(/\*/g, '.*?');
            regex += '/?';
        }
    }

    regex += '$';
    return new RegExp(regex.replace(/\?+/g, "?"));
}

function waiting(ms) {
    return new Promise(resolve => {
        (function delay() {
            setTimeout(() => {
                resolve();
            }, ms);
        })();
    });
}

//return false if newVer > oldVer, return true if newVer > oldVer or newVer === old Ver
function lessOrEqualTo(oldVer, newVer) {
    if (!oldVer || !newVer) {
        return false;
    }
    if (oldVer === newVer) {
        return true;
    }
    const oldParts = oldVer.split('.');
    const newParts = newVer.split('.');
    for (let i = 0; i < newParts.length; i++) {
        const a = ~~newParts[i];
        const b = ~~oldParts[i];
        if (a > b) return true;
        if (a < b) return false;
    }
    return false
}

//-------------------------------------------------Quick Login--------------------------------------------------------//
addWorkerMessageListener("get quick login init data", async function (data, worker, sendResponse) {
    const {"agency-id": agencyId} = await getStorageData("agency-id");
    const {quickLogin} = await getStorageData("quickLogin") || {};
    const {cannotMakeQuote} = await getStorageData("cannotMakeQuote");
    const {hideQuickLogin} = await getStorageData("hideQuickLogin");
    if (quickLogin && hideQuickLogin !== true) {
        const hostsArray = Object.keys(quickLogin['hosts']);
        const host = hostsArray.find(login => data.match(login));
        const {managerId} = await getStorageData("managerId") || {managerId: null};
        sendResponse( {
            logins: host ? quickLogin['hosts'][host] : [],
            isActive: quickLogin['isActive'],
            inactivityReason: quickLogin['inactivityReason'],
            currentManager: managerId,
            cannotMakeQuote,
            agencyId
        })
    }
});

addWorkerMessageListener("get password by id", async function (data, worker, sendResponse) {
    sendResponse(true)
    if (data.isActive === false) {
        sendMessageToWorker(worker, "password response", {
            login: data["login"],
            isActive: data.isActive,
            inactivityReason: data.inactivityReason
        });
        return;
    }
    const {"agency-id": agencyId, managerId} = await getStorageData(["agency-id", "managerId"]);
    const userSalt = checkActualUserSalt();
    const actor = await getActorData();
    let fd = new FormData();
    fd.append('agencyId', agencyId);
    fd.append('pwdId', data["id"]);
    fd.append('managerId', managerId);

    fd.append('addonVersion', chrome.runtime.getManifest().version);
    fd.append('operatingSystem', getOS());

    fd.append('addonGuid', actor['addonGuid']);
    fd.append('browser', actor['browser']);

    const passObj = await fetch(`https://${DOMAIN}/info/get-password`,
        {
            method: 'POST',
            body: fd
        })
        .then(async resp => resp.ok ? resp.json() : {
            "error": true,
            "status": resp.status,
            "text": await resp.text() || resp.statusText
        })
        .catch(_ => {
            return {"error": true, "status": 0, "text": 'Internet failure'}
        });
    sendMessageToWorker(worker, "password response", {passObj, login: data["login"], userSalt})

});

addWorkerMessageListener('save user salt', (userSalt) => {
    USER_SALT = {value: userSalt, timestamp: new Date().getTime()};
});

function checkActualUserSalt() {
    if (USER_SALT && USER_SALT.value && USER_SALT.timestamp) {
        let current = new Date().getTime();
        if (current - USER_SALT.timestamp > 12 * 60 * 60 * 1000) { //12hours
            USER_SALT = {};
            return '';
        }
        return USER_SALT.value;
    }
    return '';
}

addWorkerMessageListener('decrypt password', async (data, worker, sendResponse) => {
    if (data.type === 'decrypt password') {
        const result = await decrypt(data.password, data.salt);
        return sendResponse(result)
    }
    return sendResponse(null)
});

addWorkerMessageListener('basic auth request', async ({login, password, url}, worker) => {
    try {
        const headers = new Headers();
        const encodedCredentials = btoa(`${login}:${password}`);
        headers.append('Authorization', `Basic ${encodedCredentials}`);
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });
        if (response.status === 200) {
            sendMessageToWorker(worker, 'basic auth request result', {auth: true, url});
        } else {
            sendMessageToWorker(worker, 'basic auth request result', {auth: false, url});
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        sendMessageToWorker(worker, 'basic auth request result', {auth: false, url});
    }
});

//---------------------------crypto functions --------------------------//
function fromBase64(string, type = Uint8Array) {
    const binaryString = atob(string);
    const len = binaryString.length;
    const bytes = new type(len);
    for (let index = 0; index < len; index++) {
        bytes[index] = binaryString.charCodeAt(index);
    }
    return bytes;
}

async function decrypt(string, salt) {
    try {
        const rawKey = await makeKey(salt);
        const stringBytes = fromBase64(string);
        const ivBytes = new Uint8Array(16);
        const decrypted = await crypto.subtle.decrypt(
            {
                name: 'AES-CBC',
                iv: ivBytes,
            },
            rawKey,
            stringBytes
        );
        return new TextDecoder().decode(decrypted);
    } catch (e) {
        return null;
    }
}

async function makeKey(password) {
    return await crypto.subtle.importKey(
        'raw',
        await makeSha256(password),
        'AES-CBC',
        true, ['decrypt']
    );
}

async function makeSha256(string) {
    const strUint8 = new TextEncoder().encode(string);
    return await crypto.subtle.digest('SHA-256', strUint8);
}

//---------

addWorkerMessageListener('save quick booking info', async (data) => {
    const {addonGuid, managerId, browser} = await getActorData();
    const quickBookingInfo = {
        addonVersion: chrome.runtime.getManifest().version,
        operatingSystem: getOS(),
        addonGuid,
        managerId,
        browser,
        booking: data
    };
    console.log({quickBookingInfo});
    await setStorageData({quickBookingInfo});
    openTab(`https://${GUARD_DOMAIN}/agency/quick-booking/to-crm`)
});

addWorkerMessageListener('get quick booking', async (data, worker) => {
    await getStorageData('quickBookingInfo').then(info => sendMessageToWorker(worker, 'quick booking info', info));
    await setStorageData({'quickBookingInfo': null});
});

//----------------------- Hotkey actions
if (chrome.commands) {
    chrome.commands.onCommand.addListener(async (command) => {
        if (command === "send-quote") {
            const {managerId, quote, managers} = await getStorageData(['quote', 'managerId', 'managers']);
            if (!managerId && managers.length > 0) {
                alert(getI18nMessage('error_noManager'));
                return;
            }
            if (quote.options.length === 0) {
                alert(getI18nMessage('error_emptyQuote'));
                return;
            }
            await addQuote("add quote");
        }
        if (command === "reload") {
            chrome.runtime.reload();
        }
    });
}

//-----------------------------Tourvisor fetch info---------------------//
addWorkerMessageListener('fetch request', async (data, worker, sendResponse) => {
    data.text = await fetchTextUsingHttpCache(data.url);
    sendResponse(data)
});

//-------------------------------------------------Save image-----------------------------//
addWorkerMessageListener("save image", async function (data) {
    let {images} = await getStorageData('images');
    if (!images || !Array.isArray(images)) {
        images = [];
    }
    if (!images.find(item => item === data)) {
        images.push(data);
    }
    images = images.slice(-5);
    await setStorageData({images});
});

addWorkerMessageListener("find tabs by url", async function (data, worker, sendResponse) {
    const {editorImageSize} = await getStorageData('editorImageSize');
    const isFound = workersArray.some(wrk => wrk.url.match(data.url))
    sendResponse({isFound, editorImageSize})
});

addWorkerMessageListener("send image", async (data) => {
    const editorWorkers = (await chrome.tabs.query({}) || []).filter(wrk => wrk.url && wrk.url.match(data.url));
    for (const worker of editorWorkers) {
        await chrome.tabs.sendMessage(worker.id, {
            "type": "incoming image",
            "data": {image: data.image}
        });
    }
    if (data.fast === true) {
        await chrome.tabs.update(editorWorkers[0].id, {'active': true});
    }
});

//--------------------------------------------Save/Get any Data from/by Worker
addWorkerMessageListener("save data", async (data) => {
    if (data.key) {
        const obj = {};
        obj[data.key] = data.value;
        await setStorageData(obj);
        if (data.response) {
            sendMessageToAllTabs(data.response, obj);
        }
    }
});

addWorkerMessageListener("get data", async (data, worker) => {
    const savedData = await getStorageData(data.key);
    sendMessageToWorker(worker, "data response", savedData)
});

chrome.runtime.onMessageExternal.addListener(
    async function (request, sender, sendResponse) {
        if (request.data === 'getAgency') {
            await updateAgencyInfo(null, true, null);
            return sendResponse({success: true});
        }
        return sendResponse({success: false});
    });

async function openDraftPage() {
    openTab(`https://${GUARD_DOMAIN}/draft-quote`)
}

addWorkerMessageListener('open draft page', openDraftPage);
addWorkerMessageListener('get request params', async (data, worker, sendResponse) => {
    const tabId = worker.tab.id;
    const requests = WEB_REQUESTS.filter(item => item.tabId === tabId);
    sendResponse(requests);
})

function isMobileDevice() {
    try {
        return !!(navigator && navigator.userAgent && !!navigator.userAgent.match(/mobile/i));
    } catch (e) {
        console.log(e);
        return false;
    }
}

globalThis.isMobileDevice = isMobileDevice

if ( isMobileDevice() && globalThis.popupPath !== 'data/material-ui/popup.html' && typeof setAction !== "undefined") {
     setAction();
}
