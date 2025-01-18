window.AGENCY_ID = "";
window.backgroundFetchResponses = {};
window.SEARCH_CRITERIA = null;
window.RECIEVED_RATINGS = new Map();
window.ADDED_BUTTONS = window.ADDED_BUTTONS || new Map();

async function initAgencyId() {
    console.log("init agency id");

    const agencyId = await sendMessageToAddon("get agency id");
    console.log("recieived agency id " + agencyId);
    const {domain} = await getStorageDataAsync('domain');
    window.AGENCY_DOMAIN = domain || DEFAULT_DOMAIN;
    window.AGENCY_ID = agencyId;
}

initAgencyId().then(initVersionChecker).then(startInjection);

async function startInjection() {
    window.initParams = await getInitParams();
    if ( !window.initParams && !isNewVersionLoaded() )  {
         return window.setTimeout(startInjection, TIMEOUT);
    }
    window.setTimeout(injectColumn, TIMEOUT);
}

function injectFindAction() {
    const btn = getSearchButton();
    if ( Array.isArray(btn) ) {
        for (let i = 0; i < btn.length; i++) {
            injectSearchButton(btn[i]);
        }
    } else {
        injectSearchButton(btn);
    }
}

function injectSearchButton(btn) {
    if ( !btn ) {
        //console.log("button is not found");
        return;
    }
    if ( btn.getAttribute("injected") != null ) {
        return;
    }
    btn.setAttribute("injected", "true");
    btn.addEventListener("click", function () {
        try {
            window.SEARCH_CRITERIA = initializeSearchCriteria(btn);
        } catch (e) {
            logError("failed to initialize search criteria", e);
        }
    });
    console.log("injected search event");
}

window.injectedButtons = []; // is populated by createAddButton

async function injectColumn() {
    if ( isNewVersionLoaded() && window.ADDED_BUTTONS ) {
        window.ADDED_BUTTONS.values().forEach(obj => obj.newCell && obj.newCell.remove());
        return;
    }
    if ( isNewVersionLoaded() ||
        document.querySelector("#agency-quote-id") ||
        typeof getPageWithFetchUtil !== "function" ||
        typeof initializeSearchCriteria !== "function" ) {
        return;
    }
    try {
        if ( !window.SEARCH_CRITERIA )
            window.SEARCH_CRITERIA = initializeSearchCriteria();
        injectFindAction();
        window.injectedButtons = [];
        injectStyleSheet(document);
        const stopInjecting = await injectData();
        if ( window.RATING_QUEUE ) {
            injectedButtons.forEach(i => window.RATING_QUEUE.push(i))
        }
        window.injectedButtons = [];
        if ( stopInjecting === true ) {
            return
        }
        window.setTimeout(injectColumn, TIMEOUT);
    } catch (e) {
        logError("failed to inject QQ buttons", e);
    }
}

function createImageDiv() {  //переименовал фукнцию, у img ограничения и неудобства применения стилей.
    return document.createElement("div");
}

async function createAndPostInitOption(action, zis, isForSletat, isForQuickBooking = false) {
    const option = action ? await action(zis) : await createOption(zis, isForQuickBooking);

    optionPostProcessing(zis, option, isForQuickBooking)
    if ( typeof optionPostProcessingCustom !== 'undefined' ) {
        optionPostProcessingCustom(zis, option);
    }

    return option;
}

async function optionCreationAllowed() {
    try {
        if ( location.hostname === 'tourvisor.ru' ) {
            if ( initParams.tourvisorMessage ) {
                await createAlertMessage(initParams.tourvisorMessage);
            }
            return !!initParams.tourvisorAllowed;
        }
        return true;
    } catch (e) {
        console.log(e);
        return true;
    }
}

function optionPostProcessing(zis, option, isForQuickBooking) {
    option.price = option.price || 0;
    option.currency = option.currency || 'NULL';
    option.nights = String(option.nights)
    option.operator = option.operator || OPERATOR_NAME || window.location.hostname;

    if ( !option.operatorSletatId && (typeof OPERATOR_SLETAT_ID != 'undefined') ) {
        option.operatorSletatId = OPERATOR_SLETAT_ID;
    }

    if ( option.href && !isUrlValid(option.href) && !zis.classList.contains("qq-rating-btn") ) {
        if ( !zis.closest('.qq-rating-btn') ) {
            logError("href is not valid", {message: `href: ${option.href}`, stack: null});
            option.href = null;
        }
    }

    if ( !isForQuickBooking ) {
        prepareQuickBookingOption(zis, option)
    }

    if ( (!option.city_from || option.city_from.match(/без.*перелет|только.*отель/)) &&
        option.flight &&
        option.flight.sectors &&
        option.flight.sectors[0] &&
        option.flight.sectors[0].segments ) {
        option.city_from = option.flight.sectors[0].segments[0].departureCity || option.flight.sectors[0].segments[0].departureAirport || option.city_from;
        if ( !option.country ) {
            option.country = lastElement(option.flight.sectors[0].segments).arrivalCountry;
        }
        if ( !option.region ) {
            option.region = lastElement(option.flight.sectors[0].segments).arrivalCity;
        }
    }
    if ( isAgencyWebsite() ) {
        option.agencyWebsite = true;

        if ( option.href ) {
            option.hrefUpdated = true
        }
        if ( initParams && !initParams.isQuickBookingActive ) {
            throw new QuiQuoError(window.location.hostname, 'Ваш текущий тариф не позволяет выбирать туры на сайте турагентства.');
        }
    }


    if ( option.hotel_desc && option.hotel_desc.match(/<\/?[a-z][\s\S]*>/i) ) {
        parseHotelDescription(option)
    }
}

function prepareQuickBookingOption(zis, option) {
    checkAndValidateFlight(option, zis);
    option.initial_price = option.initial_price || option.price;
    option.pageUrl = option.pageUrl || window.location.href;
    option.checkinDt = dayMonthYearToString(...(option.checkinDt).split("."));
    if ( option.dateStart && option.dateEnd && option.checkinDt && option.checkoutDt ) {
        const nights = getDistance(option.checkinDt, option.checkoutDt)
        option.nights = String(nights);
        option.extra_nights = String(getDistance(option.dateStart, option.dateEnd) - nights);
        option.checkinDt = option.dateStart;
    }
    option.competitorExts = getInstalledCompetitorsExtension();
    option.hotel_id = zis.getAttribute("qq-hotel-id") || null;
    option.product_type = option.product_type || setProductType(option);
    option.roomType = option.accommodation ? [option.roomType, option.accommodation].filter(s => s).join(', ') : option.roomType;
    option.currency = mapCurrencyUtil(option.currency)
}

function parseHotelDescription(option) {
    try {
        option.hotel_desc = updateRelativeLinks(option.hotel_desc) || option.hotel_desc;
        option.hotel_desc = truncateHTML(option.hotel_desc, 10_000) || option.hotel_desc
    } catch (e) {
        return null;
    }


}

function truncateHTML(input, maxLength) {
    if ( input.length <= maxLength ) {
        return input;
    }

    const dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = input;

    function traverseAndTruncate(node) {
        if ( node.nodeType === Node.TEXT_NODE ) {
            return node.cloneNode(true);
        }

        if ( node.nodeType === Node.ELEMENT_NODE ) {
            const newNode = document.createElement(node.nodeName.toLowerCase());
            for (const attr of node.attributes) {
                newNode.setAttribute(attr.name, attr.value);
            }
            Array.from(node.childNodes).forEach(childNode => {
                const truncatedChild = traverseAndTruncate(childNode);
                if ( truncatedChild ) {
                    newNode.appendChild(truncatedChild);
                }
            });

            return newNode;
        }

        return null;
    }

    let truncatedContent = document.createElement('div');
    let prevResult = null;
    for (const childNode of dummyDiv.childNodes) {
        const result = traverseAndTruncate(childNode);
        if ( result ) {
            prevResult = result;
            truncatedContent.appendChild(result);
            if ( truncatedContent.outerHTML.length >= maxLength ) {
                result.remove();
                break;
            }
        }
    }

    dummyDiv.remove();
    return truncatedContent.innerHTML;
}

function updateRelativeLinks(html) {
    const dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = html;
    $$('a[href]', dummyDiv).forEach(anchor => {
        const hrefValue = anchor.getAttribute('href');
        const updatedHref = makeAbsolute(hrefValue);
        anchor.setAttribute('href', updatedHref);
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('rel', 'noopener noreferrer');
    });

    return dummyDiv.innerHTML;

    function makeAbsolute(href) {
        try {
            return new URL(href, window.location.origin).href;
        } catch (e) {
            return href;
        }
    }
}


function setProductType(option) {
    if ( option.city_from === null || option.city_from === undefined ) {
        return "Package";
    }
    if ( option.city_from === "" ||
        option.city_from.match(/без.*перелет/i) ||
        option.city_from.match(/только.*отель/i) ) {
        return "Hotel";
    }
    return "Package";
}

function checkAndValidateFlight(option, img) {
    if ( !canGetFlightInfo(img, option) ||
        !option.flight ||
        !option.flight.sectors ||
        option.flight.sectors.length === 0 ||
        !option.flight.sectors[0].segments ||
        option.flight.sectors[0].segments.length === 0 ) {
        option.flight = null;
    }
}

function createEditButton(action) {
    const img = createImageDiv();
    img.className = "qq-edit-btn";
    img.clickAction = action;
    img.title = "Изменить и добавить тур";
    attachEditButtonEvents(img, action);
    return img;
}

function attachEditButtonEvents(img, action) {
    attachEditButtonOnClick(img, action);
}

window.editBtnGlobal = null;

function qqBtns(data, action, cssText) {
    const options = data ? data : {};
    const div = document.createElement("div");
    const addBtn = document.createElement("div");
    const editBtn = document.createElement("div");
    const flyBtn = typeof getFlight === "function" && !options.hideFlight ? createFlyButton(div, addBtn, editBtn) : null;
    const ratingBtn = document.createElement("a");
    attachAddButtonEvents(addBtn, action);
    attachEditButtonEvents(editBtn, action);
    addBtn.className = "qq-add-btn";
    addBtn.title = "Добавить тур";
    editBtn.className = "qq-edit-btn";
    editBtn.title = "Изменить и добавить тур";
    ratingBtn.className = "qq-rating-btn";
    ratingBtn.classList.add("qq-loading");
    ratingBtn.title = "Рейтинг отеля: ";

    div.className = "qq";
    if ( !initParams ||
        initParams.showTaRatingOnSite === false ||
        initParams.cannotMakeQuote === true || !canGetRatingTopHotels() ) {
        ratingBtn.classList.remove("qq-loading");
        ratingBtn.classList.add("qq-off");
        div.classList.add("qq-rating-off");
    }
    if ( options.asyncInfo ) {
        options.asyncInfo(addBtn);
        options.asyncInfo(editBtn);
    }

    if ( window !== top ) {
        editBtn.setAttribute("popupStick", "true");
    }

    if ( options.asyncFunc ) {
        loadAsyncInfoUtil(addBtn, options.asyncFunc);
        loadAsyncInfoUtil(editBtn, options.asyncFunc);
    }
    div.classList.add(options.align || "qq-box");

    div.append(...[addBtn, editBtn, flyBtn, ratingBtn].filter(elem => elem));
    window.injectedButtons = window.injectedButtons || [];
    window.injectedButtons.push({img: ratingBtn, action: action, parentElement: options && options.parentElement});
    if ( cssText ) {
        div.style.cssText = cssText;
    }

    if ( options.cssText ) {
        div.style.cssText = data.cssText;
    }
    return div;
}

function createShadowButtons({data, action, cssText}, cell) {
    if ( !window.ADDED_BUTTONS ) {
        window.ADDED_BUTTONS = new Map();
    }
    const newCell = document.createElement("div");
    const shadow = newCell.attachShadow({mode: 'closed'});
    const newDiv = qqBtns(data, action, cssText);
    newDiv.querySelectorAll("div").forEach(div => div.tourRow = cell);
    shadow.append(newDiv, appendStyleElement(document));
    cell.append(newCell);
    window.ADDED_BUTTONS.set(cell, {newCell, quiQuoNode: newDiv});
}

function createOnlyRatingButtons(action, cssText) {
    const div = document.createElement("div");
    const span = document.createElement('span');
    const ratingBtn = document.createElement("a");

    ratingBtn.className = "qq-rating-btn";
    ratingBtn.classList.add("qq-loading");
    ratingBtn.title = "Рейтинг TripAdvisor: ";

    ratingBtn.style.wordBreak = 'unset';

    div.classList.add('qq', 'qq-only-rating');
    if ( !initParams ||
        initParams.showTaRatingOnSite === false ||
        initParams.cannotMakeQuote === true || !canGetRatingTopHotels() ) {
        ratingBtn.classList.remove("qq-loading");
        ratingBtn.classList.add("qq-off");
        div.style.display = 'none';
        div.classList.add("qq-rating-off");
    }
    span.innerHTML = "Рейтинг:&nbsp;"
    div.append(span, ratingBtn);
    window.injectedButtons = window.injectedButtons || [];
    window.injectedButtons.push({img: ratingBtn, action: action});
    if ( cssText ) {
        div.style.cssText = cssText;
    }
    div.style.display = 'none';
    return {container: div, ratingBtn};
}

function createFlyButton(div, addBtn, editBtn) {
    const flyBtn = document.createElement("div");
    if ( typeof flyBtn.attachShadow !== 'function' ) {
        return createFlyButtonOld(div, addBtn, editBtn, flyBtn);
    }
    flyBtn.attachShadow({mode: 'open'})
    let flyBtnShadowDom = flyBtn.shadowRoot;
    flyBtn.className = "qq-fly-btn";
    flyBtn.title = "Информация о перелете";
    const toggleSwitch = document.createElement("label");
    toggleSwitch.classList.add("qq-switch");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    span.className = "qq-slider round";
    checkbox.type = "checkbox";
    checkbox.checked = typeof DEFAULT_EXTRACT_FLIGHT !== "undefined" ? false : !!(initParams ? initParams.extractFlight : true);
    setButtonsFlightAttribute([addBtn, editBtn], checkbox.checked);
    checkbox.addEventListener("change", () => {
        setButtonsFlightAttribute([addBtn, editBtn], checkbox.checked);
    });
    toggleSwitch.append(checkbox, span);
    flyBtnShadowDom.append(toggleSwitch);
    flyBtnShadowDom.prepend(getFlyBtnStyles());
    return flyBtn;
}

function createFlyButtonOld(div, addBtn, editBtn, flyBtn) {
    flyBtn.className = "qq-fly-btn";
    flyBtn.title = "Информация о перелете";
    const toggleSwitch = document.createElement("label");
    toggleSwitch.classList.add("qq-switch");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    span.className = "qq-slider round";
    checkbox.type = "checkbox";
    checkbox.checked = typeof DEFAULT_EXTRACT_FLIGHT !== "undefined" ? false : !!(initParams ? initParams.extractFlight : true);
    setButtonsFlightAttribute([addBtn, editBtn], checkbox.checked);
    checkbox.addEventListener("change", () => {
        setButtonsFlightAttribute([addBtn, editBtn], checkbox.checked);
    });
    toggleSwitch.append(checkbox, span);
    flyBtn.append(toggleSwitch);
    return flyBtn;
}

function getFlyBtnStyles() {
    const text = `
label.qq-switch {
    display: inline-block !important;
    width: 44px !important;
    height: 18px !important;
}

label.qq-switch input {
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
}

span.qq-slider {
    position: absolute !important;
    cursor: pointer !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background-color: #ccc !important;;
    transition: .4s !important;;
    border-radius: 24px !important;;
}

span.qq-slider:before {
    all: initial;
    position: absolute !important;
    border-radius: 50% !important;
    content: "" !important;
    height: 14px !important;
    width: 14px !important;
    left: 2px !important;
    bottom: 2px !important;
    transition: .4s !important;
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDE0IDE0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KIDxnIHRyYW5zZm9ybT0ibWF0cml4KC4wNDcgMCAwIC4wNDcgLS4wMDAxNCAtLjAwMDI4KSIgZmlsbD0iI2ZmZiI+DQogIDxnIGZpbGw9IiNmZmYiPg0KICAgPHBhdGggZD0ibTE1MCAwYy04MyAwLTE1MCA2Ny0xNTAgMTUwczY3IDE1MCAxNTAgMTUwIDE1MC02NyAxNTAtMTUwLTY3LTE1MC0xNTAtMTUwem03MyA5OS0zMiAzMSAyMSA4My0xMiAxMi0zOS02NC0wLjktMC45LTQwIDM4Yy0wLjIzIDAuMjMtMC40OCAwLjQtMC43MiAwLjYybC0xLjMgMjktNDUtNDUgMjktMS4zYzAuMjItMC4yNCAwLjM5LTAuNDkgMC42Mi0wLjcybDM4LTQwLTAuMzItMC4zMy02NS00MCAxMi0xMiA4MiAyMSAzMS0zM2M2LjItNi4yIDE2LTYuMiAyMiAwIDYuMiA2LjIgNi4yIDE2LTJlLTMgMjJ6IiBmaWxsPSIjZmZmIi8+DQogIDwvZz4NCiA8L2c+DQo8L3N2Zz4NCg==) no-repeat !important;
}

.qq-vertical span.qq-slider:before {
    transform: rotate(90deg) !important;
}

input:checked + span.qq-slider {
    background-color: #2196F3 !important;

}

input:focus + span.qq-slider {
    all: initial;
    box-shadow: 0 0 1px #2196F3 !important;
}

input:checked + span.qq-slider:before {
    transform: translateX(26px) !important;
}

input:checked + span.qq-slider:after {
   all: initial !important;
}

.qq-vertical input:checked + span.qq-slider:before {
    transform: translateX(26px) rotate(90deg) !important;
}
`;
    const style = document.createElement('style');
    style.textContent = text;
    style.id = "qq-css";
    return style;
}

function setButtonsFlightAttribute(btns, flag) {
    btns.forEach(btn => btn.setAttribute("get-flight", flag));
}

function canGetFlightInfo(img, option) {
    return img.getAttribute("get-flight") === "true" ||
        (option && option.product_type === "Flight");
}

// addAddonMessageListener("discount settings", function (data) {
//     showEditPopup(data);
// });

function getBtnTitle(btn) {
    const isAdded = !!btn.classList.contains("added");
    const classObj = {
        "qq-add-btn": isAdded ? "Удалить тур из подборки" : "Добавить тур",
        "qq-edit-btn": isAdded ? "Добавить еще раз" : "Изменить и добавить тур"
    };
    for (const value of btn.classList) {
        if ( classObj[value] ) {
            return classObj[value];
        }
    }
    return btn.title;
}

function attachEditButtonOnClick(img, action) {
    img.onclick = async function (event) {
        event.stopImmediatePropagation();
        const loadingFunc = toggleLoading(img);
        loadingFunc.on();
        try {
            if ( this.classList.contains("added") ) {
                switchAddedButtons(this.parentNode, event);
                return;
            }
            if ( !await optionCreationAllowed() ) {
                event.stopPropagation();
                event.preventDefault();
                return;
            }

            const option = await createAndPostInitOption(action, this, false);
            if ( option === false ) {
                event.stopPropagation();
                event.preventDefault();
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            const rect = img.getBoundingClientRect();
            const editBtnCenter = Math.round((rect.top + rect.bottom) / 2) + window.pageYOffset;
            const stick = img.getAttribute("popupStick");
            const data = await sendMessageToAddon("get discount settings", {
                option: option,
                editBtnCenter: editBtnCenter,
                stick: stick
            });
            window.editBtnGlobal = img;
            showEditPopup(data);
        } catch (e) {
            logError("failed to process btn click", e, getLogErrorHtml(this));
            notifyPageRefreshRequired(e);
            if ( e.name === 'QuiQuoError' ) {
                createAlertPopup(e.userMessage, e.message);
            } else {
                sendMessageToAddon("showerrorpage");
            }
        } finally {
            loadingFunc.off();
        }
    };
}

function createAddButton(action) {
    const img = createImageDiv();
    img.className = "qq-add-btn";
    img.clickAction = action;
    img.title = "Добавить тур";
    attachAddButtonEvents(img, action);
    window.injectedButtons.push({img: img, action: action});
    return img;
}

function attachAddButtonEvents(img, action) {
    attachAddButtonOnClick(img, action);
}

function attachAddButtonOnClick(img, action) {
    img.onclick = async function (event) {
        event.stopImmediatePropagation();
        const loadingFunc = toggleLoading(img);
        loadingFunc.on();
        try {
            const btnsContainer = this.parentNode;
            if ( this.classList.contains("added") ) {
                loadingFunc.off();
                switchAddedButtons(btnsContainer, event);
                await sendMessageToAddon("remove clicked on TO page", btnsContainer.id);

                return;
            }

            if ( !await optionCreationAllowed() ) {
                event.stopPropagation();
                event.preventDefault();
                return;
            }

            const option = await createAndPostInitOption(action, this, false);
            if ( option === false ) {
                event.stopPropagation();
                event.preventDefault();
                return;
            }
            const hash = crc32(JSON.stringify(option) + new Date());
            option.hash = hash;
            const city_from = option.city_from;
            sendMessageToAddon("add clicked", option);
            btnsContainer.setAttribute("id", "qq-hash" + hash);
            querySelectorAll(btnsContainer, "div:not(.qq-rating-btn)").forEach(btn => {
                btn.classList.add("added");
                btn.title = getBtnTitle(btn);
            });
            event.stopPropagation();
            event.preventDefault();
        } catch (e) {
            if ( e.name !== 'QuiQuoError' && chrome.runtime && chrome.runtime.getManifest() && !chrome.runtime.getManifest().update_url ) { // Do not send an error if the extension is installed locally
                console.log(e);
                return null;
            }
            logError("failed to process btn click", e, getLogErrorHtml(this));
            notifyPageRefreshRequired(e);
            if ( e.name === 'QuiQuoError' ) {
                createAlertPopup(e.userMessage, e.message);
            } else {
                await sendMessageToAddon("showerrorpage");
            }
        } finally {
            loadingFunc.off();
        }
    };
}

function switchAddedButtons(btnsContainer, event) {
    Array.from(btnsContainer.getElementsByClassName("added")).forEach(btn => {
        btn.title = getBtnTitle(btn);
        btn.classList.remove("added");
    });
    event.stopPropagation();
    event.preventDefault();
}

function checkAndRestoreEvents(el, action, options = {}) {
    querySelectorAll(el, ".qq-add-btn, .qq-edit-btn").forEach(btn => {
        if ( !btn.onclick ) {
            btn.classList.contains("qq-add-btn") ? attachAddButtonEvents(btn, action) : attachEditButtonEvents(btn, action);
            if ( options.asyncInfo ) {
                options.asyncInfo(btn);
            }
            if ( options.asyncFunc ) {
                loadAsyncInfoUtil(btn, options.asyncFunc);
            }
        }
    });
}

function notifyPageRefreshRequired(e) {
    if ( e != null && e.message != null ) {
        if ( e.message.indexOf("Error connecting to extension") >= 0 ||
            e.message.indexOf("can't access dead object") >= 0 )
            alert("Программа Qui-Quo была автоматически обновлена браузером, после того как был сделан поиск на этом сайте. " +
                "Для продолжения работы необходимо обновить страницу (F5 на клавиатуре) и сделать поиск заново. \n\n" +
                "Извините, пожалуйста, за причиненные неудобства. К сожалению, мы не можем это исправить - так работает обновление расширений в браузерах.\n\n" +
                "Команда разработчиков Qui-Quo.\n\n");
    }
}

function getLogErrorHtml(img, fragment) {
    try {
        if ( fragment ) {
            return fragment.innerHTML;
        }
        if ( typeof getHotelRowByImage == 'function' ) {
            return getHotelRowByImage(img).innerHTML;
        }
        return img.parentNode.parentNode.parentNode.innerHTML;
    } catch (e) {
        return document.body;
    }
}

function logError(msg, e, html) {
    const data = {
        title: "[" + OPERATOR_NAME + "] " + msg,
        url: document.location.href
    };

    if ( e != null ) {
        if ( e.stack != null )
            data.stack = "%c" + e.stack + "%c";
        if ( e.message != null )
            data.title = data.title + " - " + e.message;
    }

    if ( html != null ) {
        data.html = html.length > 100 * 1024 ? html.substring(0, 100 * 1024) : html;
    }

    sendMessageToAddon("error", data);
}

{

    /*
    Based on ndef.parser, by Raphael Graf(r@undefined.ch)
    http://www.undefined.ch/mparser/index.html

    Ported to JavaScript and modified by Matthew Crumley (email@matthewcrumley.com, http://silentmatt.com/)

    You are free to use and modify this code in anyway you find useful. Please leave this comment in the code
    to acknowledge its original source. If you feel like it, I enjoy hearing about projects that use my code,
    but don't feel like you have to let me know or ask permission.
    */

window.Parser = (function (scope) {
        function object(o) {
            function F() {
            }

            F.prototype = o;
            return new F();
        }

        let TNUMBER = 0;
        let TOP1 = 1;
        let TOP2 = 2;
        let TVAR = 3;
        let TFUNCALL = 4;

        function Token(type_, index_, prio_, number_) {
            this.type_ = type_;
            this.index_ = index_ || 0;
            this.prio_ = prio_ || 0;
            this.number_ = (number_ !== undefined && number_ !== null) ? number_ : 0;
            this.toString = function () {
                switch (this.type_) {
                    case TNUMBER:
                        return this.number_;
                    case TOP1:
                    case TOP2:
                    case TVAR:
                        return this.index_;
                    case TFUNCALL:
                        return "CALL";
                    default:
                        return "Invalid Token";
                }
            };
        }

        function Expression(tokens, ops1, ops2, functions) {
            this.tokens = tokens;
            this.ops1 = ops1;
            this.ops2 = ops2;
            this.functions = functions;
        }

        // Based on http://www.json.org/json2.js
        let cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                "'": "\\'",
                '\\': '\\\\'
            };

        function escapeValue(v) {
            if ( typeof v === "string" ) {
                escapable.lastIndex = 0;
                return escapable.test(v) ?
                    "'" + v.replace(escapable, function (a) {
                        let c = meta[a];
                        return typeof c === 'string' ? c :
                            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    }) + "'" :
                    "'" + v + "'";
            }
            return v;
        }

        Expression.prototype = {
            simplify: function (values) {
                values = values || {};
                let nstack = [];
                let newexpression = [];
                let n1;
                let n2;
                let f;
                let L = this.tokens.length;
                let item;
                let i = 0;
                for (i = 0; i < L; i++) {
                    item = this.tokens[i];
                    let type_ = item.type_;
                    if ( type_ === TNUMBER ) {
                        nstack.push(item);
                    } else if ( type_ === TVAR && (item.index_ in values) ) {
                        item = new Token(TNUMBER, 0, 0, values[item.index_]);
                        nstack.push(item);
                    } else if ( type_ === TOP2 && nstack.length > 1 ) {
                        n2 = nstack.pop();
                        n1 = nstack.pop();
                        f = this.ops2[item.index_];
                        item = new Token(TNUMBER, 0, 0, f(n1.number_, n2.number_));
                        nstack.push(item);
                    } else if ( type_ === TOP1 && nstack.length > 0 ) {
                        n1 = nstack.pop();
                        f = this.ops1[item.index_];
                        item = new Token(TNUMBER, 0, 0, f(n1.number_));
                        nstack.push(item);
                    } else {
                        while (nstack.length > 0) {
                            newexpression.push(nstack.shift());
                        }
                        newexpression.push(item);
                    }
                }
                while (nstack.length > 0) {
                    newexpression.push(nstack.shift());
                }

                return new Expression(newexpression, object(this.ops1), object(this.ops2), object(this.functions));
            },

            substitute: function (variable, expr) {
                if ( !(expr instanceof Expression) ) {
                    expr = new Parser().parse(String(expr));
                }
                let newexpression = [];
                let L = this.tokens.length;
                let item;
                let i = 0;
                for (i = 0; i < L; i++) {
                    item = this.tokens[i];
                    let type_ = item.type_;
                    if ( type_ === TVAR && item.index_ === variable ) {
                        for (let j = 0; j < expr.tokens.length; j++) {
                            let expritem = expr.tokens[j];
                            let replitem = new Token(expritem.type_, expritem.index_, expritem.prio_, expritem.number_);
                            newexpression.push(replitem);
                        }
                    } else {
                        newexpression.push(item);
                    }
                }

                let ret = new Expression(newexpression, object(this.ops1), object(this.ops2), object(this.functions));
                return ret;
            },

            evaluate: function (values) {
                values = values || {};
                let nstack = [];
                let n1;
                let n2;
                let f;
                let L = this.tokens.length;
                let item;
                let i = 0;
                for (i = 0; i < L; i++) {
                    item = this.tokens[i];
                    let type_ = item.type_;
                    if ( type_ === TNUMBER ) {
                        nstack.push(item.number_);
                    } else if ( type_ === TOP2 ) {
                        n2 = nstack.pop();
                        n1 = nstack.pop();
                        f = this.ops2[item.index_];
                        nstack.push(f(n1, n2));
                    } else if ( type_ === TVAR ) {
                        if ( item.index_ in values ) {
                            nstack.push(values[item.index_]);
                        } else if ( item.index_ in this.functions ) {
                            nstack.push(this.functions[item.index_]);
                        } else {
                            throw new Error("undefined variable: " + item.index_);
                        }
                    } else if ( type_ === TOP1 ) {
                        n1 = nstack.pop();
                        f = this.ops1[item.index_];
                        nstack.push(f(n1));
                    } else if ( type_ === TFUNCALL ) {
                        n1 = nstack.pop();
                        f = nstack.pop();
                        if ( f.apply && f.call ) {
                            if ( Object.prototype.toString.call(n1) === "[object Array]" ) {
                                nstack.push(f.apply(undefined, n1));
                            } else {
                                nstack.push(f.call(undefined, n1));
                            }
                        } else {
                            throw new Error(f + " is not a function");
                        }
                    } else {
                        throw new Error("invalid Expression");
                    }
                }
                if ( nstack.length > 1 ) {
                    throw new Error("invalid Expression (parity)");
                }
                return nstack[0];
            },

            toString: function (toJS) {
                let nstack = [];
                let n1;
                let n2;
                let f;
                let L = this.tokens.length;
                let item;
                let i = 0;
                for (i = 0; i < L; i++) {
                    item = this.tokens[i];
                    let type_ = item.type_;
                    if ( type_ === TNUMBER ) {
                        nstack.push(escapeValue(item.number_));
                    } else if ( type_ === TOP2 ) {
                        n2 = nstack.pop();
                        n1 = nstack.pop();
                        f = item.index_;
                        if ( toJS && f == "^" ) {
                            nstack.push("Math.pow(" + n1 + "," + n2 + ")");
                        } else {
                            nstack.push("(" + n1 + f + n2 + ")");
                        }
                    } else if ( type_ === TVAR ) {
                        nstack.push(item.index_);
                    } else if ( type_ === TOP1 ) {
                        n1 = nstack.pop();
                        f = item.index_;
                        if ( f === "-" ) {
                            nstack.push("(" + f + n1 + ")");
                        } else {
                            nstack.push(f + "(" + n1 + ")");
                        }
                    } else if ( type_ === TFUNCALL ) {
                        n1 = nstack.pop();
                        f = nstack.pop();
                        nstack.push(f + "(" + n1 + ")");
                    } else {
                        throw new Error("invalid Expression");
                    }
                }
                if ( nstack.length > 1 ) {
                    throw new Error("invalid Expression (parity)");
                }
                return nstack[0];
            },

            variables: function () {
                let L = this.tokens.length;
                let vars = [];
                for (let i = 0; i < L; i++) {
                    let item = this.tokens[i];
                    if ( item.type_ === TVAR && (vars.indexOf(item.index_) == -1) ) {
                        vars.push(item.index_);
                    }
                }

                return vars;
            },
//
//		toJSFunction: function (param, variables) {
//		   removed to pass Mozilla Validation
//		}
        };

        function add(a, b) {
            return Number(a) + Number(b);
        }

        function sub(a, b) {
            return a - b;
        }

        function mul(a, b) {
            return a * b;
        }

        function div(a, b) {
            return a / b;
        }

        function mod(a, b) {
            return a % b;
        }

        function concat(a, b) {
            return "" + a + b;
        }

        function sinh(a) {
            return Math.sinh ? Math.sinh(a) : ((Math.exp(a) - Math.exp(-a)) / 2);
        }

        function cosh(a) {
            return Math.cosh ? Math.cosh(a) : ((Math.exp(a) + Math.exp(-a)) / 2);
        }

        function tanh(a) {
            if ( Math.tanh ) return Math.tanh(a);
            if ( a === Infinity ) return 1;
            if ( a === -Infinity ) return -1;
            return (Math.exp(a) - Math.exp(-a)) / (Math.exp(a) + Math.exp(-a));
        }

        function asinh(a) {
            if ( Math.asinh ) return Math.asinh(a);
            if ( a === -Infinity ) return a;
            return Math.log(a + Math.sqrt(a * a + 1));
        }

        function acosh(a) {
            return Math.acosh ? Math.acosh(a) : Math.log(a + Math.sqrt(a * a - 1));
        }

        function atanh(a) {
            return Math.atanh ? Math.atanh(a) : (Math.log((1 + a) / (1 - a)) / 2);
        }

        function log10(a) {
            return Math.log(a) * Math.LOG10E;
        }

        function neg(a) {
            return -a;
        }

        function trunc(a) {
            if ( Math.trunc ) return Math.trunc(a);
            else return x < 0 ? Math.ceil(x) : Math.floor(x);
        }

        function random(a) {
            return Math.random() * (a || 1);
        }

        function fac(a) { //a!
            a = Math.floor(a);
            let b = a;
            while (a > 1) {
                b = b * (--a);
            }
            return b;
        }

        // TODO: use hypot that doesn't overflow
        function hypot() {
            if ( Math.hypot ) return Math.hypot.apply(this, arguments);
            let y = 0;
            let length = arguments.length;
            for (let i = 0; i < length; i++) {
                if ( arguments[i] === Infinity || arguments[i] === -Infinity ) {
                    return Infinity;
                }
                y += arguments[i] * arguments[i];
            }
            return Math.sqrt(y);
        }

        function append(a, b) {
            if ( Object.prototype.toString.call(a) != "[object Array]" ) {
                return [a, b];
            }
            a = a.slice();
            a.push(b);
            return a;
        }

        function Parser() {
            this.success = false;
            this.errormsg = "";
            this.expression = "";

            this.pos = 0;

            this.tokennumber = 0;
            this.tokenprio = 0;
            this.tokenindex = 0;
            this.tmpprio = 0;

            this.ops1 = {
                "sin": Math.sin,
                "cos": Math.cos,
                "tan": Math.tan,
                "asin": Math.asin,
                "acos": Math.acos,
                "atan": Math.atan,
                "sinh": sinh,
                "cosh": cosh,
                "tanh": tanh,
                "asinh": asinh,
                "acosh": acosh,
                "atanh": atanh,
                "sqrt": Math.sqrt,
                "log": Math.log,
                "lg": log10,
                "log10": log10,
                "abs": Math.abs,
                "ceil": Math.ceil,
                "floor": Math.floor,
                "round": Math.round,
                "trunc": trunc,
                "-": neg,
                "exp": Math.exp
            };

            this.ops2 = {
                "+": add,
                "-": sub,
                "*": mul,
                "/": div,
                "%": mod,
                "^": Math.pow,
                ",": append,
                "||": concat
            };

            this.functions = {
                "random": random,
                "fac": fac,
                "min": Math.min,
                "max": Math.max,
                "hypot": hypot,
                "pyt": hypot, // backward compat
                "pow": Math.pow,
                "atan2": Math.atan2
            };

            this.consts = {
                "E": Math.E,
                "PI": Math.PI
            };
        }

        Parser.parse = function (expr) {
            return new Parser().parse(expr);
        };

        Parser.evaluate = function (expr, variables) {
            return Parser.parse(expr).evaluate(variables);
        };

        Parser.Expression = Expression;

        Parser.values = {
            sin: Math.sin,
            cos: Math.cos,
            tan: Math.tan,
            asin: Math.asin,
            acos: Math.acos,
            atan: Math.atan,
            sinh: sinh,
            cosh: cosh,
            tanh: tanh,
            asinh: asinh,
            acosh: acosh,
            atanh: atanh,
            sqrt: Math.sqrt,
            log: Math.log,
            lg: log10,
            log10: log10,
            abs: Math.abs,
            ceil: Math.ceil,
            floor: Math.floor,
            round: Math.round,
            trunc: trunc,
            random: random,
            fac: fac,
            exp: Math.exp,
            min: Math.min,
            max: Math.max,
            hypot: hypot,
            pyt: hypot, // backward compat
            pow: Math.pow,
            atan2: Math.atan2,
            E: Math.E,
            PI: Math.PI
        };

        let PRIMARY = 1 << 0;
        let OPERATOR = 1 << 1;
        let FUNCTION = 1 << 2;
        let LPAREN = 1 << 3;
        let RPAREN = 1 << 4;
        let COMMA = 1 << 5;
        let SIGN = 1 << 6;
        let CALL = 1 << 7;
        let NULLARY_CALL = 1 << 8;

        Parser.prototype = {
            parse: function (expr) {
                this.errormsg = "";
                this.success = true;
                let operstack = [];
                let tokenstack = [];
                this.tmpprio = 0;
                let expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
                let noperators = 0;
                this.expression = expr;
                this.pos = 0;

                while (this.pos < this.expression.length) {
                    if ( this.isOperator() ) {
                        if ( this.isSign() && (expected & SIGN) ) {
                            if ( this.isNegativeSign() ) {
                                this.tokenprio = 2;
                                this.tokenindex = "-";
                                noperators++;
                                this.addfunc(tokenstack, operstack, TOP1);
                            }
                            expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
                        } else if ( this.isComment() ) {

                        } else {
                            if ( (expected & OPERATOR) === 0 ) {
                                this.error_parsing(this.pos, "unexpected operator");
                            }
                            noperators += 2;
                            this.addfunc(tokenstack, operstack, TOP2);
                            expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
                        }
                    } else if ( this.isNumber() ) {
                        if ( (expected & PRIMARY) === 0 ) {
                            this.error_parsing(this.pos, "unexpected number");
                        }
                        let token = new Token(TNUMBER, 0, 0, this.tokennumber);
                        tokenstack.push(token);

                        expected = (OPERATOR | RPAREN | COMMA);
                    } else if ( this.isString() ) {
                        if ( (expected & PRIMARY) === 0 ) {
                            this.error_parsing(this.pos, "unexpected string");
                        }
                        let token = new Token(TNUMBER, 0, 0, this.tokennumber);
                        tokenstack.push(token);

                        expected = (OPERATOR | RPAREN | COMMA);
                    } else if ( this.isLeftParenth() ) {
                        if ( (expected & LPAREN) === 0 ) {
                            this.error_parsing(this.pos, "unexpected \"(\"");
                        }

                        if ( expected & CALL ) {
                            noperators += 2;
                            this.tokenprio = -2;
                            this.tokenindex = -1;
                            this.addfunc(tokenstack, operstack, TFUNCALL);
                        }

                        expected = (PRIMARY | LPAREN | FUNCTION | SIGN | NULLARY_CALL);
                    } else if ( this.isRightParenth() ) {
                        if ( expected & NULLARY_CALL ) {
                            let token = new Token(TNUMBER, 0, 0, []);
                            tokenstack.push(token);
                        } else if ( (expected & RPAREN) === 0 ) {
                            this.error_parsing(this.pos, "unexpected \")\"");
                        }

                        expected = (OPERATOR | RPAREN | COMMA | LPAREN | CALL);
                    } else if ( this.isComma() ) {
                        if ( (expected & COMMA) === 0 ) {
                            this.error_parsing(this.pos, "unexpected \",\"");
                        }
                        this.addfunc(tokenstack, operstack, TOP2);
                        noperators += 2;
                        expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
                    } else if ( this.isConst() ) {
                        if ( (expected & PRIMARY) === 0 ) {
                            this.error_parsing(this.pos, "unexpected constant");
                        }
                        let consttoken = new Token(TNUMBER, 0, 0, this.tokennumber);
                        tokenstack.push(consttoken);
                        expected = (OPERATOR | RPAREN | COMMA);
                    } else if ( this.isOp2() ) {
                        if ( (expected & FUNCTION) === 0 ) {
                            this.error_parsing(this.pos, "unexpected function");
                        }
                        this.addfunc(tokenstack, operstack, TOP2);
                        noperators += 2;
                        expected = (LPAREN);
                    } else if ( this.isOp1() ) {
                        if ( (expected & FUNCTION) === 0 ) {
                            this.error_parsing(this.pos, "unexpected function");
                        }
                        this.addfunc(tokenstack, operstack, TOP1);
                        noperators++;
                        expected = (LPAREN);
                    } else if ( this.isVar() ) {
                        if ( (expected & PRIMARY) === 0 ) {
                            this.error_parsing(this.pos, "unexpected variable");
                        }
                        let vartoken = new Token(TVAR, this.tokenindex, 0, 0);
                        tokenstack.push(vartoken);

                        expected = (OPERATOR | RPAREN | COMMA | LPAREN | CALL);
                    } else if ( this.isWhite() ) {
                    } else {
                        if ( this.errormsg === "" ) {
                            this.error_parsing(this.pos, "unknown character");
                        } else {
                            this.error_parsing(this.pos, this.errormsg);
                        }
                    }
                }
                if ( this.tmpprio < 0 || this.tmpprio >= 10 ) {
                    this.error_parsing(this.pos, "unmatched \"()\"");
                }
                while (operstack.length > 0) {
                    let tmp = operstack.pop();
                    tokenstack.push(tmp);
                }
                if ( noperators + 1 !== tokenstack.length ) {
                    //print(noperators + 1);
                    //print(tokenstack);
                    this.error_parsing(this.pos, "parity");
                }

                return new Expression(tokenstack, object(this.ops1), object(this.ops2), object(this.functions));
            },

            evaluate: function (expr, variables) {
                return this.parse(expr).evaluate(variables);
            },

            error_parsing: function (column, msg) {
                this.success = false;
                this.errormsg = "parse error [column " + (column) + "]: " + msg;
                this.column = column;
                throw new Error(this.errormsg);
            },

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

            addfunc: function (tokenstack, operstack, type_) {
                let operator = new Token(type_, this.tokenindex, this.tokenprio + this.tmpprio, 0);
                while (operstack.length > 0) {
                    if ( operator.prio_ <= operstack[operstack.length - 1].prio_ ) {
                        tokenstack.push(operstack.pop());
                    } else {
                        break;
                    }
                }
                operstack.push(operator);
            },

            isNumber: function () {
                let r = false;
                let str = "";
                while (this.pos < this.expression.length) {
                    let code = this.expression.charCodeAt(this.pos);
                    if ( (code >= 48 && code <= 57) || code === 46 ) {
                        str += this.expression.charAt(this.pos);
                        this.pos++;
                        this.tokennumber = parseFloat(str);
                        r = true;
                    } else {
                        break;
                    }
                }
                return r;
            },

            // Ported from the yajjl JSON parser at http://code.google.com/p/yajjl/
            unescape: function (v, pos) {
                let buffer = [];
                let escaping = false;

                for (let i = 0; i < v.length; i++) {
                    let c = v.charAt(i);

                    if ( escaping ) {
                        switch (c) {
                            case "'":
                                buffer.push("'");
                                break;
                            case '\\':
                                buffer.push('\\');
                                break;
                            case '/':
                                buffer.push('/');
                                break;
                            case 'b':
                                buffer.push('\b');
                                break;
                            case 'f':
                                buffer.push('\f');
                                break;
                            case 'n':
                                buffer.push('\n');
                                break;
                            case 'r':
                                buffer.push('\r');
                                break;
                            case 't':
                                buffer.push('\t');
                                break;
                            case 'u':
                                // interpret the following 4 characters as the hex of the unicode code point
                                let codePoint = parseInt(v.substring(i + 1, i + 5), 16);
                                buffer.push(String.fromCharCode(codePoint));
                                i += 4;
                                break;
                            default:
                                throw this.error_parsing(pos + i, "Illegal escape sequence: '\\" + c + "'");
                        }
                        escaping = false;
                    } else {
                        if ( c == '\\' ) {
                            escaping = true;
                        } else {
                            buffer.push(c);
                        }
                    }
                }

                return buffer.join('');
            },

            isString: function () {
                let r = false;
                let str = "";
                let startpos = this.pos;
                if ( this.pos < this.expression.length && this.expression.charAt(this.pos) == "'" ) {
                    this.pos++;
                    while (this.pos < this.expression.length) {
                        let code = this.expression.charAt(this.pos);
                        if ( code != "'" || str.slice(-1) == "\\" ) {
                            str += this.expression.charAt(this.pos);
                            this.pos++;
                        } else {
                            this.pos++;
                            this.tokennumber = this.unescape(str, startpos);
                            r = true;
                            break;
                        }
                    }
                }
                return r;
            },

            isConst: function () {
                let str;
                for (let i in this.consts) {
                    if ( true ) {
                        let L = i.length;
                        str = this.expression.substr(this.pos, L);
                        if ( i === str ) {
                            this.tokennumber = this.consts[i];
                            this.pos += L;
                            return true;
                        }
                    }
                }
                return false;
            },

            isOperator: function () {
                let code = this.expression.charCodeAt(this.pos);
                if ( code === 43 ) { // +
                    this.tokenprio = 0;
                    this.tokenindex = "+";
                } else if ( code === 45 ) { // -
                    this.tokenprio = 0;
                    this.tokenindex = "-";
                } else if ( code === 124 ) { // |
                    if ( this.expression.charCodeAt(this.pos + 1) === 124 ) {
                        this.pos++;
                        this.tokenprio = 0;
                        this.tokenindex = "||";
                    } else {
                        return false;
                    }
                } else if ( code === 42 || code === 8729 || code === 8226 ) { // * or в€™ or вЂў
                    this.tokenprio = 1;
                    this.tokenindex = "*";
                } else if ( code === 47 ) { // /
                    this.tokenprio = 2;
                    this.tokenindex = "/";
                } else if ( code === 37 ) { // %
                    this.tokenprio = 2;
                    this.tokenindex = "%";
                } else if ( code === 94 ) { // ^
                    this.tokenprio = 3;
                    this.tokenindex = "^";
                } else {
                    return false;
                }
                this.pos++;
                return true;
            },

            isSign: function () {
                let code = this.expression.charCodeAt(this.pos - 1);
                if ( code === 45 || code === 43 ) { // -
                    return true;
                }
                return false;
            },

            isPositiveSign: function () {
                let code = this.expression.charCodeAt(this.pos - 1);
                if ( code === 43 ) { // +
                    return true;
                }
                return false;
            },

            isNegativeSign: function () {
                let code = this.expression.charCodeAt(this.pos - 1);
                if ( code === 45 ) { // -
                    return true;
                }
                return false;
            },

            isLeftParenth: function () {
                let code = this.expression.charCodeAt(this.pos);
                if ( code === 40 ) { // (
                    this.pos++;
                    this.tmpprio += 10;
                    return true;
                }
                return false;
            },

            isRightParenth: function () {
                let code = this.expression.charCodeAt(this.pos);
                if ( code === 41 ) { // )
                    this.pos++;
                    this.tmpprio -= 10;
                    return true;
                }
                return false;
            },

            isComma: function () {
                let code = this.expression.charCodeAt(this.pos);
                if ( code === 44 ) { // ,
                    this.pos++;
                    this.tokenprio = -1;
                    this.tokenindex = ",";
                    return true;
                }
                return false;
            },

            isWhite: function () {
                let code = this.expression.charCodeAt(this.pos);
                if ( code === 32 || code === 9 || code === 10 || code === 13 ) {
                    this.pos++;
                    return true;
                }
                return false;
            },

            isOp1: function () {
                let str = "";
                for (let i = this.pos; i < this.expression.length; i++) {
                    let c = this.expression.charAt(i);
                    if ( c.toUpperCase() === c.toLowerCase() ) {
                        if ( i === this.pos || (c != '_' && (c < '0' || c > '9')) ) {
                            break;
                        }
                    }
                    str += c;
                }
                if ( str.length > 0 && (str in this.ops1) ) {
                    this.tokenindex = str;
                    this.tokenprio = 5;
                    this.pos += str.length;
                    return true;
                }
                return false;
            },

            isOp2: function () {
                let str = "";
                for (let i = this.pos; i < this.expression.length; i++) {
                    let c = this.expression.charAt(i);
                    if ( c.toUpperCase() === c.toLowerCase() ) {
                        if ( i === this.pos || (c != '_' && (c < '0' || c > '9')) ) {
                            break;
                        }
                    }
                    str += c;
                }
                if ( str.length > 0 && (str in this.ops2) ) {
                    this.tokenindex = str;
                    this.tokenprio = 5;
                    this.pos += str.length;
                    return true;
                }
                return false;
            },

            isVar: function () {
                let str = "";
                for (let i = this.pos; i < this.expression.length; i++) {
                    let c = this.expression.charAt(i);
                    if ( c.toUpperCase() === c.toLowerCase() ) {
                        if ( i === this.pos || (c != '_' && (c < '0' || c > '9')) ) {
                            break;
                        }
                    }
                    str += c;
                }
                if ( str.length > 0 ) {
                    this.tokenindex = str;
                    this.tokenprio = 4;
                    this.pos += str.length;
                    return true;
                }
                return false;
            },

            isComment: function () {
                let code = this.expression.charCodeAt(this.pos - 1);
                if ( code === 47 && this.expression.charCodeAt(this.pos) === 42 ) {
                    this.pos = this.expression.indexOf("*/", this.pos) + 2;
                    if ( this.pos === 1 ) {
                        this.pos = this.expression.length;
                    }
                    return true;
                }
                return false;
            }
        };

        scope.Parser = Parser;
        return Parser
    })(typeof exports === 'undefined' ? {} : exports);
}


function calcToDate(date, nights, extra_nights) {
    try {
        const d = parseDate(date);
        d.setDate(d.getDate() + parseInt(nights, 10) + parseInt(extra_nights, 10));
        return formatDate(d);
    } catch (e) {
        return null;
    }
}

function formatDate(d) {
    return d ? padZero(d.getDate()) + "." + padZero(d.getMonth() + 1) + "." + d.getFullYear() : d;
}

function parseDate(date) {
    const dateSegments = date.split('.').map(seg => seg.padStart(2, "0")).join('.');
    const r = dateSegments.match(/(\d\d)\.(\d\d)\.(\d\d\d\d)/);
    return r ? new Date(parseInt(r[3], 10), parseInt(r[2], 10) - 1, parseInt(r[1], 10)) : null;
}

function padZero(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function isAgencyWebsite() {
    if ( location.hostname.indexOf("eto.travel") > -1 ) {         // TODO FIX Safari HACK for eto.travel
        return false;
    }
    return (typeof AGENCY_WEBSITE != 'undefined') && (AGENCY_WEBSITE === true);
}

//---------------------------   Рейтинги   ------------------------------------------------------------------

window.useSendRating = sendRating()
window.RATING_QUEUE = new Proxy(window.injectedButtons, {
    get(target, property, receiver) {
        if ( property === 'push' ) {
            return function (...args) {
                const result = Reflect.apply(target[property], target, args);
                args.forEach(useSendRating);
                return result;
            };
        }
        return Reflect.get(target, property, receiver);
    }
});

function canGetRatingTopHotels() {
    if ( typeof showTopHotelsRating !== "undefined" && showTopHotelsRating === true ) {
        return true;
    }
    return false;
}

function sendRating() {
    let items = []
    let timerId = null;
    return function (item) {
        items.push(item)
        clearTimeout(timerId)
        timerId = setTimeout(() => sendRatingRq(items), 500)
    }
}

async function sendRatingRq(items) {
    try {
        if ( !canGetRatingTopHotels() ) {
            return;
        }
        const buttons = items;
        let options = [];
        for (const el of buttons) {
            options.push(await collectOptionForRating(el));
        }

        options = options.filter(opt => {
            return opt;
        });
        options = deduplicateCollectionByField(options, "id");
        if ( options.length > 0 ) {
            await sendMessageToAddon("request ratings", options);
        }
    } catch (_) {
        if ( !window.RATING_ERROR_REPORTED ) {
            window.RATING_ERROR_REPORTED = true;
        }
        return null;
    } finally {
        items.length = 0;
    }
}

async function collectOptionForRating(el) {
    try {
        el.img.tourRow = el.parentElement;
        let option = await createAndPostInitOption(el.action, el.img);
        if ( !option || !option.hotelName || !option.country || !option.region || !option.operator || option.skipRatingSearch ) {
            const ratigBtn = el.img.parentNode.querySelector(".qq-rating-btn");
            if ( ratigBtn ) {
                ratigBtn.classList.add("qq-not-available");
                ratigBtn.textContent = "N/A";
            }
            if ( !window.RATING_ERROR_REPORTED ) {
                window.RATING_ERROR_REPORTED = true;
            }
            return null;
        }
        const id = crc32([option.hotelName, option.country, option.region, option.operator].join()).toString();
        el.img.parentNode.classList.add(id);
        el.img.parentNode.dataset.qqCountry = option.country;
        el.img.parentNode.dataset.qqRegion = option.region;
        el.img.parentNode.dataset.qqOperator = option.operator;
        el.img.parentNode.dataset.qqHotelName = option.hotelName;
        return {
            hotelName: option.hotelName,
            country: option.country,
            region: option.region,
            operator: option.operator,
            id
        }
    } catch (e) {
        el?.img?.classList.remove("qq-loading");
        el?.img?.classList.add("qq-not-available");
        return null;
    }
}

addAddonMessageListener("ratings", function (rs) {
    const msg = !rs.sendingTime ? "(from cache)" : "(from server)";

    console.log("Received ratings for " + rs.ratings.length + " hotels" + msg);
    if ( initParams.showTaRatingOnSite === true && initParams.cannotMakeQuote === false ) {
        rs.ratings.forEach(hotel => {
            setRating(hotel);
        });
    }
});

function setRating(hotel) {
    const documents = collectAllDocuments();
    let els = documents.reduce((acc, document) => acc.concat(Array.from(document.getElementsByClassName(hotel.id))), []);
    if ( window.ADDED_BUTTONS ) {
        const values = [...window.ADDED_BUTTONS.values()]
        values.forEach(obj => {
            if ( obj.quiQuoNode.classList.contains(hotel.id) ) {
                els.push(obj.quiQuoNode);
            }
        });
    }
    els.forEach(el => {

        querySelectorAll(el, ".qq-add-btn, .qq-edit-btn, .qq-only-rating").forEach(btn => {
            btn.setAttribute("qq-hotel-id", hotel.hotel_id);
        });
        el.setAttribute("qq-rating", hotel.tripAdvRating);
        const ratingBtn = el.querySelector(".qq-rating-btn");
        ratingBtn.classList.remove("qq-loading");
        if ( !ratingBtn ) {
            //ratingBtn.classList.add("qq-not-available");
            return;
        }
        if ( hotel.tripAdvRating === null ) {
            ratingBtn.classList.add("qq-not-available");
            ratingBtn.classList.add("qq-rating-off");
            return;
        }
        ratingBtn.addEventListener("click", function (event) {
            sendMessageToAddon("get hotel link by hotel options",
                {
                    hotelName: el.dataset.qqHotelName,
                    country: el.dataset.qqCountry,
                    operator: el.dataset.qqOperator,
                    resort: el.dataset.qqRegion
                });
            sendMessageToAddon("get hotel link", hotel.hotel_id);
        });
        ratingBtn.textContent = typeof String.prototype.padEnd === "function" ?
            hotel.tripAdvRating.toString().padEnd(3, ".0") : hotel.tripAdvRating;
        ratingBtn.title += ratingBtn.textContent;
        const onlyRatingContainer = ratingBtn.closest('.qq-only-rating');
        if ( onlyRatingContainer ) {
            onlyRatingContainer.style.display = 'block';
        }
        if ( +hotel.tripAdvRating >= 4 ) {
            ratingBtn.classList.add("qq-excellent");
            onlyRatingContainer ? ratingBtn.style.backgroundColor = '#5cb85c' : null
        }
        if ( +hotel.tripAdvRating <= 2 ) {
            ratingBtn.classList.add("qq-bad");
            onlyRatingContainer ? ratingBtn.style.backgroundColor = '#e07a55' : null
        }
        if ( +hotel.tripAdvRating > 2 && +hotel.tripAdvRating < 4 ) {
            ratingBtn.classList.add("qq-good");
            onlyRatingContainer ? ratingBtn.style.backgroundColor = '#e6b661' : null
        }
    });
}

//--------------------------------------------------------- Отображение добавленных туров-------------------------------//

function findAndRemoveAddedOptions(hashList) {
    if ( hashList.data ) {
        hashList = hashList.data;
    }
    if ( hashList && hashList.length > 0 ) {
        const elements = window.ADDED_BUTTONS ? [...window.ADDED_BUTTONS.values()].map(elem => elem.quiQuoNode) : []
        const docs = collectAllDocuments(typeof getDoc == 'function' ? getDoc() : document);
        hashList.forEach(hash => {
            removeAddedToursShadow(elements, hash)
            removeAddedTours(docs, hash)
        });
    }
}

function removeAddedToursShadow(elements, hash) {
    elements.filter(node => node.id.includes(hash)).forEach(node => {
        querySelectorAll(node, "div").forEach(btn => {
            btn.title = getBtnTitle(btn);
            btn.classList.remove("added");
        });
    })
}

function removeAddedTours(docs, hash) {
    const elem = docs.map(doc => doc.getElementById("qq-hash" + hash) || null).find(elem => elem);
    if ( !elem ) {
        return;
    }
    querySelectorAll(elem, "div").forEach(btn => {
        btn.title = getBtnTitle(btn);
        btn.classList.remove("added");
    });
}

addAddonMessageListener("find and delete added option", function (hashList) {
    findAndRemoveAddedOptions(hashList);
});

//---------------------------------------------------------Поиск установленных расширений конкурента-------------------------------//

function getInstalledCompetitorsExtension() {
    try {
        const doc = typeof getDoc == 'function' ? getDoc() : document;
        const extns =
            [
                {
                    sel: ".podborka-turov-button, .podborka-turov-toggle-tour-button",
                    name: "Подборка туров"
                },
                {sel: ".js-aicrm-add-btn", name: "All-Inclusive CRM"},
                {
                    sel: ".samo-basket-button",
                    name: "SAMO-Select"
                }
            ];
        const foundExtensions = extns.reduce((prevItem, item) => {
            if ( !item.id ) {
                return prevItem;
            }

            const isInstalled = !!doc.querySelector(item.sel);
            isInstalled ? prevItem.push(item.name) : null;
            return prevItem;
        }, []);
        return foundExtensions.join();
    } catch (e) {
        return null;
    }
}

//-----------------------------------------------Export to CRM----------------------------------------------------------//
async function collectQuickBookingOptions(button, selectedManagerId = null) {
    try {
        const {
            managerId,
            managers
        } = typeof safari === 'undefined' ? (await getStorageDataAsync(['managerId', 'managers'])) : {
            managerId: initParams.currentManager,
            managers: initParams.managers
        };
        if ( managers && managers.length > 0 ) {
            if ( !selectedManagerId && !managerId ) {
                await createSelectManagerAlert(button, managers);
                return;
            }
        }
        button.textContent = 'Загрузка...';
        const doc = typeof getDoc == 'function' ? getDoc() : document;
        const addBtn = doc.querySelector('.qq-add-btn');
        const quickBookingOption = await createQuickBookingOption(button);
        if ( quickBookingOption.isAdapted ) {
            sendMessageToAddon('save quick booking info', JSON.parse(JSON.stringify(quickBookingOption.booking || quickBookingOption)));
            button.textContent = button.dataset.qqCaption || 'Быстрая Заявка в CRM';
            return;
        }
        let {
            transfers, insurance,
            booking,
            other: supplements = [], notes, flightType,
            fuelCharge, tourOptions, prices, railways, busRoutes, cruises,
            commission, commissionCurrency, bookingUrl,
            commissionPercent, tourOperatorReference, cachedPassengers
        } = quickBookingOption;

        if ( booking ) {
            booking.general.bookingUrl = window.location.href;
            sendMessageToAddon('save quick booking info', booking);
            button.textContent = button.dataset.qqCaption || 'Быстрая Заявка в CRM';
            return;
        }

        tourOptions = tourOptions ? tourOptions : await createAndPostInitOption(null, addBtn, false, true);
        let {operator, city_from: cityFrom, nights, flight = {}, flights} = tourOptions;
        if ( tourOptions && tourOptions.busRoutes ) {
            busRoutes = tourOptions.busRoutes;
        }
        let hotels = typeof parseHotels !== 'undefined' ? parseHotels(tourOptions) : parseHotelsUtil(tourOptions);
        let passengers = typeof parsePassengers === 'function' ? (await parsePassengers(button, cachedPassengers) || []) : cachedPassengers;
        const client = typeof parseClient === 'function' ? await parseClient(button) :
            passengers.find(passenger => passenger && passenger.isClient === true) || null;
        if ( flight ) {
            flight.fuelCharge = fuelCharge;
            flight.type = flightType;
        }
        const allTourStartDates = [optionalChaining(flight, ['sectors', '0', 'segments', '0', 'departureDate']),
            tourOptions.dateStart,
            tourOptions.checkinDt].filter(d => d)
            .map(dt => dayMonthYearToDate(dt))
            .sort((a, b) => b - a)
            .map(dt => dt.toLocaleDateString('ru'));
        const allTourEndDates = [
            calcToDate((tourOptions.checkinDt || tourOptions.dateStart), tourOptions.nights || "0", tourOptions.extra_nights || "0"),
            getFlightReturnDate(flight),
            tourOptions.dateEnd].filter(d => d)
            .map(dt => dayMonthYearToDate(dt))
            .sort((a, b) => a - b)
            .map(dt => dt.toLocaleDateString('ru'));
        const dateStart = lastElement(allTourStartDates);
        const dateEnd = lastElement(allTourEndDates);

        const passengersCount = typeof parsePassengersCountModule === 'function' ? parsePassengersCountModule(passengers, tourOptions) || parsePassengersCount(passengers) : parsePassengersCount(passengers);
        passengers = filterEmptyPassengers(passengers);
        [transfers, insurance, supplements, hotels, railways, busRoutes, cruises] = servicesPostProcessing([transfers, insurance, supplements, hotels, railways, busRoutes, cruises], passengersCount, dateStart, dateEnd);

        const general = {
            dateStart,
            dateEnd,
            operator: operator || window.OPERATOR_NAME,
            tourOperatorReference,
            bookingUrl: bookingUrl || window.location.href,
            cityFrom,
            nights,
            adults: passengersCount.adults,
            children: passengersCount.children,
            infants: passengersCount.infants,
            prices: prices || tourOptions.prices,
        };

        calculatePrices(general, commission, commissionCurrency, commissionPercent, general.prices);
        const result = {
            general,
            hotels,
            flights: flights || [flight],
            transfers,
            railways,
            cruises,
            busRoutes,
            insurance,
            supplements,
            notes,
            client,
            passengers
        }
        const response = await sendMessageToAddon('save quick booking info', JSON.parse(JSON.stringify(result).replace(/\\"/g, "'")));
        button.textContent = button.dataset.qqCaption || 'Быстрая Заявка в CRM';
    } catch (e) {
        console.log(e);

        button.setAttribute('qq-error', 'true');

        button.textContent = 'Ошибка!';
        button.addEventListener('click', (e) => e.preventDefault());
        button.removeAttribute('qq-error');
        if ( e.name === 'QuiQuoError' ) {
            createAlertPopup(e.userMessage, e.message);
            return;
        }
        logError("failed to collect quick booking options", e, getLogErrorHtml(button.closest(window.injectionSelector)));
    }
}

function getFlightReturnDate(flight) {
    try {
        return lastElement(lastElement(flight.sectors).segments).arrivalDate;
    } catch (e) {
        return null;
    }
}

function filterEmptyPassengers(passengers) {
    return passengers.filter(passenger => Object.values(passenger).filter(a => a).length > 1 &&
        passenger['lastName'] && passenger['firstName']);
}

function servicesPostProcessing(services, passengersCount, dateStart, dateEnd) {
    try {
        let filteredServices = [];
        for (let service of services) {
            service = (service || []).filter(svc => svc);
            service = deduplicateCollectionByFields(service, ['description', 'dateStart', 'dateEnd']);
            service.forEach(svc => {
                if ( !svc.passengers ) {
                    svc.count = passengersCount.count;
                    svc.passengers = passengersCount;
                }
                if ( svc.addDates ) {
                    svc.dateStart = svc.dateStart || dateStart;
                    svc.dateEnd = svc.dateEnd || dateEnd;
                }
            });
            filteredServices.push(service);
        }
        services = filteredServices;
        return services;
    } catch (e) {
        console.log(e);
        return services;
    }
}

function parsePassengersCount(passengers) {
    const passengersCount = {
        adults: 0,
        children: 0,
        infants: 0,
        count: 1
    };

    for (const passenger of passengers) {
        const age = ageFromDate(passenger && passenger.birthday && passenger.birthday.match(/\d{2}\.\d{2}\.\d{4}/) ? passenger.birthday : '01.01.1970', new Date().toLocaleDateString('ru'));
        if ( passenger && passenger.type === 'infant' || age >= 0 && age <= 2 ) {
            passengersCount.infants++;
            continue;
        }
        if ( passenger && passenger.type === 'child' || age >= 3 && age <= 17 ) {
            passengersCount.children++;
            continue;
        }
        passengersCount.adults++;
    }
    passengersCount.count = (passengersCount.adults + passengersCount.children + passengersCount.infants) || 1;
    return passengersCount;
}

function calculatePrices(general, commission, commissionCurrency, commissionPercent, prices) {
    try {
        if ( commission && commissionCurrency ) {
            const nettPriceType = mapPriceType(commissionCurrency);
            const nettPrice = Number(prices[`${nettPriceType}`].gross) - Number(commission).toFixed(2);
            prices[`${nettPriceType}`].nett = !prices[`${nettPriceType}`].nett ? nettPrice : prices[`${nettPriceType}`].nett;
            prices[`${nettPriceType}`].currency = !prices[`${nettPriceType}`].currency ? nettPrice : prices[`${nettPriceType}`].currency;
        }

        if ( commissionPercent && commissionCurrency ) {
            calculateNettPrice(commissionPercent, general, prices);
        }
    } catch (_) {
        return null;
    }
}

function calculateNettPrice(commissionPercent, general, prices) {
    general.nettPrice = +(general.totalPrice - (general.totalPrice * (commissionPercent / 100))).toFixed(2);
    general.nettPriceCurrency = general.totalPriceCurrency;
    const nettPriceType = mapPriceType(general.nettPriceCurrency);
    prices[`${nettPriceType}`].nett = !prices[`${nettPriceType}`].nett ? general.nettPrice : prices[`${nettPriceType}`].nett;
    prices[`${nettPriceType}`].currency = !prices[`${nettPriceType}`].currency ? general.nettPriceCurrency : prices[`${nettPriceType}`].currency;
}

function createExportButton({classes = [], cssText = ''} = {}) {
    if ( !initParams || initParams.hideQuickBookingTutorial === true ) {
        const button = document.createElement('button');
        button.classList.add('button', 'qq', 'qq-export-button', ...classes);
        button.style.display = 'none';
        return button;
    }
    const isTutorialButton = initParams.isQuickBookingActive === true && initParams.cannotMakeQuote === false;
    const button = document.createElement('button');
    button.classList.add('button', 'qq', 'qq-export-button', ...classes);
    button.innerHTML = isTutorialButton ?
        'Быстрая Заявка в CRM' : 'Как работает<br>Быстрая заявка<br>в CRM?';
    button.style.cssText = cssText;
    button.style.minWidth = '180px';
    button.style.marginTop = '5px';
    button.style.minHeight = '48px';
    button.style.marginBottom = '5px';
    button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if ( initParams.cannotMakeQuote !== false && initParams.cannotMakeQuoteText ) {
            createAlertPopup(initParams.cannotMakeQuoteText);
            return;
        }
        if ( isTutorialButton ) {
            collectQuickBookingOptions(event.target);
        } else {
            window.open('https://help.qui-quo.support/support/solutions/articles/35000174727')
        }
    });
    return button;
}

function createQQContainer(style = '', asyncFunc = null, action = createOption, addCurrencySelection = false) {
    const details = document.createElement("details");
    const summary = document.createElement('summary');
    const container = document.createElement("div");
    const logoDiv = document.createElement("div");
    const btns = qqBtns({align: "qq-box", asyncFunc}, action);
    const logo = document.createElement('img');
    logoDiv.append(logo);
    logo.src = `https://${AGENCY_DOMAIN}/landing/eshill/i/logo.svg`;
    logo.style.height = '24px';
    btns.style.marginRight = "5px";
    details.append(summary, container)
    container.append(btns, logo, createExportButton());
    container.classList.add("qq", "qq-container");
    details.classList.add("qq");
    summary.textContent = 'Qui-Quo';
    summary.style.textAlign = 'initial';
    summary.style.cursor = 'pointer';
    details.setAttribute('open', 'open')
    details.style.cssText = style;
    if ( addCurrencySelection ) {
        createCurrencySelector(container);
    }
    return details;
}

function createQuickBookingContainer(options = {}) {
    const {style, asyncFunc, action, addCurrencySelection} = options;
    const container = document.createElement("div");
    const logoDiv = document.createElement("div");
    const buttons = qqBtns({align: "qq-box", asyncFunc}, action);
    const logo = document.createElement('img');
    logoDiv.append(logo);
    logo.src = `https://${AGENCY_DOMAIN}/landing/eshill/i/logo.svg`;
    logo.style.height = '24px';
    buttons.style.marginRight = "5px";
    const exportButton = createExportButton();
    container.append(buttons, logo, exportButton);
    container.classList.add("qq", "qq-container");
    container.style.cssText = style;
    if ( addCurrencySelection ) {
        createCurrencySelector(container);
    }
    return {container, buttons, exportButton, logo};
}

async function createCurrencySelector(container) {
    const div = document.createElement("div");
    const legend = document.createElement("legend");
    const select = document.createElement("select");
    const defaultCurr = document.createElement("option");
    const foreign = document.createElement("option");
    const savedCurrencyName = window.OPERATOR_NAME + 'Currency';
    const savedCurrency = await getStorageDataAsync(savedCurrencyName);

    div.id = "qq-currency";
    div.className = "qq-currency-container";

    legend.style.cssText = `
                 all: initial;
                 font-size: 11px;
                 font-family: 'Open Sans', sans-serif;
                 margin-bottom: 4px;
    `;
    legend.innerHTML = "Выберите валюту для <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo:";
    div.appendChild(legend);

    select.onchange = function () {
        const json = {};
        json[savedCurrencyName] = select.value;
        setStorageDataAsync(json).then();
    };

    select.style.width = "100%";
    select.style.marginBottom = "4px";

    defaultCurr.value = 'National';
    defaultCurr.textContent = 'National';
    select.appendChild(defaultCurr);

    foreign.value = "USDEUR";
    foreign.textContent = "USD/EUR";
    select.appendChild(foreign);

    div.appendChild(select);
    select.value = savedCurrency && savedCurrency[savedCurrencyName] ? savedCurrency[savedCurrencyName] : 'National';

    return container.append(div);
}


async function createSelectManagerAlert(button, managers, callback) {
    let {buttonsWrapper, okButton, iframe} = createAlertPopup('Пожалуйста, выберете менеджера:');
    const newOkButton = okButton.cloneNode(true);
    okButton.remove();
    const cancelButton = createAlertPopupButton('Отмена',  null,() => {
        iframe.remove();
    });
    const select = document.createElement('select');
    createManagerOption(select);
    managers.forEach((manager) => createManagerOption(select, manager));
    select.addEventListener('change', () => {
        const selectedManagerId = parseInt(select.value);
        if ( !selectedManagerId ) {
            newOkButton.classList.add('disabled');
            return;
        }
        newOkButton.classList.remove('disabled');
    });
    select.style.marginBottom = '5px';
    select.style.width = '80%';
    buttonsWrapper.before(select);
    buttonsWrapper.append(newOkButton, cancelButton);
    newOkButton.classList.add('disabled');
    newOkButton.textContent = 'Выбрать';
    newOkButton.addEventListener('click', async () => {
        const selectedManagerId = parseInt(select.value);
        if ( selectedManagerId ) {
            iframe.remove();
            await setStorageDataAsync({managerId: selectedManagerId});
            await collectQuickBookingOptions(button, selectedManagerId);
        }
    });
}


function createManagerOption(select, manager = {id: null, name: "Не выбран"}) {
    const option = document.createElement('option');
    option.value = manager.id;
    option.text = manager.name;
    select.append(option);
}

function showEditPopup(data) {
    try {
        if ( window.navigator.userAgent.match(/iPad|iPhone/) ) {
            return showEditPopupNew(data);
        }
        return showEditPopupNew(data)
    } catch (e) {
        console.log(e);
        showEditPopupOld(data);
    }
}

//-------------------Create Edit popup ----------------------------------------------------//
function getDocForPopup() {
    return window.editBtnGlobal && window.editBtnGlobal.closest('html') ? window.editBtnGlobal.closest('html').parentNode : document;
}

function showEditPopupNew(data) {
    const doc = getDocForPopup();

    const {wrapper, body, okButton: cancelBtn, iframe, iframeParent} = createEditPopup(doc);

    cancelBtn.textContent = 'Отмена';
    cancelBtn.classList.add('qq-edit-popup-btn-cancel');
    cancelBtn.classList.remove('qq-edit-popup-btn-ok');
    const okButton = doc.createElement('button');
    okButton.textContent = 'Добавить';
    okButton.classList.add('qq-edit-popup-btn-ok');
    okButton.id = 'qq-add';
    cancelBtn.after(okButton);

    body.insertAdjacentHTML('afterbegin', `
    <div class="container" style="padding:10px">
    <div id="qq-header">
        <h3 id="qq-hotel-name">Name of hotel here</h3>
        <span id="qq-accommodation">Room and board here</span>
    </div>
    <div class="row">
        <div class="col-45">
            <span>Ночей</span>
        </div>
        <div class="col-55">
            <input style="width:40px" id="qq-nights" name="nights" type="number" min="0" required>
            <span>+</span>
            <input style="width:40px" id="qq-nights_extra" name="nights_extra" type="number" min="0" required>
            <label for="nights_extra">в дороге</label></div>
    </div>
    <div class="row">
        <div class="col-45">
            <span>Даты</span>
        </div>
        <div class="col-55" id="qq-dates">
            <input style="width:45%" id="qq-checkin" type="text" maxlength="10" required
                   pattern="[0-9]{1,2}\\\\.[0-9]{1,2}\\\\.[0-9]{2,4}" placeholder="ДД.ММ.ГГГГ">
            <label style="width:5%" for="checkout">—</label>
            <input style="width:45%" id="qq-checkout" type="text" maxlength="10" disabled name="checkout"
                   pattern="[0-9]{1,2}\\\\.[0-9]{1,2}\\\\.[0-9]{2,4}">
        </div>
    </div>
    <div class="row">
        <div class="col-45">
            <b>Стоимость</b>
        </div>
    </div>
    <div class="row">
        <div class="col-45">
            <span>Цена на сайте</span>
        </div>
        <div class="col-50">
            <span id="qq-initial-price">000000 RUB</span>
        </div>
    </div>
    <div class="row"  id="qq-percent-value-tr">
        <div class="col-45">
            <label for="percent-value">Скидка, %</label>
        </div>
        <div class="col-55">
            <input type="text" autocomplete="off" id="qq-percent-value" name="percent-value" placeholder="0">
        </div>
    </div>
        <div class="row discount-select" id="qq-pattern-select-tr">
        <div class="col-45">
            <label for="percent-value">Предопределённая скидка</label>
        </div>
        <div class="col-55">
           <select name="pattern-select" id="qq-pattern-select"></select>
        </div>
    </div>
    <div class="row">
        <div class="col-45">
            <label for="flat-value">Расчёт цены для клиента</label>
        </div>
        <div class="col-55">
            <input type="text"  autocomplete="off" id="qq-flat-value" name="flat-value">
        </div>
    </div>
    <div class="row">
        <div class="col-45">
        </div>
        <div class="col-55" style="font-size: 14px">
            Введите итоговую цену или формулу. Подробнее
            <a href="https://help.qui-quo.support/support/solutions/articles/35000150959" target="_blank">здесь</a>.
        </div>
    </div>
    <div class="row">
        <div class="col-45">
            <b>Итоговая стоимость</b>
        </div>
        <div class="col-50">
            <b id="qq-final-price">000000 RUB</b>
        </div>
    </div>
    <div class="row">
        <div class="col-45">
            <b>Комментарий</b>
        </div>
    </div>
    <div class="row">
        <div class="col-100">
            <textarea style="width:100%;height: 100px" id="qq-comment"></textarea>
        </div>
    </div>
    <div class="row">
        <div class="col-100">
            <div id="qq-addurl">
                <ins id="qq-url_add" style="cursor: pointer; color: rgb(0, 62, 255); display: block;"> Ввести свою
                    ссылку на описание отеля
                </ins>
                <div id="qq-edit" style="display:none;"><input id="qq-url_change" type="text"
                                                            placeholder="Введите ссылку либо оставьте пустым"
                                                            size="50">
                    <ins id="qq-url_cancel" style="cursor:pointer;color: #003eff"> Отмена</ins>
                    <span class="url_error" style="display: none"></span>
                </div>
            </div>
        </div>
    </div>
</div>

    `);
    initialyzeEditPopup(iframe, data.option, data.discountSettings, window.editBtnGlobal, doc, iframeParent);

    const checkEvents = setInterval(checkAndRestoreEventsEditPopup, 500);

    if ( data && data.stick && data.editBtnCenter ) {
        wrapper.classList.add('sticky');
        wrapper.style.top = (+data.editBtnCenter - parseInt(getComputedStyle(wrapper).height) / (2)) + "px";
    }

    setFocus(iframe);

    function checkAndRestoreEventsEditPopup() {
        const frame = iframe;
        if ( !frame ) {
            clearInterval(checkEvents);
            return;
        }
        const button = frame.querySelector("#add");
        if ( button && button.onclick === null ) {
            setEventsEditPopup(frame, data.option, window.editBtnGlobal, doc, iframeParent);
        }

    }


    function createEditPopup(doc) {
        const oldIframe = doc.querySelector('.qq-edit-popup');
        if ( oldIframe ) {
            oldIframe.remove();
        }
        const wrapper = doc.createElement("div");
        const header = createEditPopupHeader(doc);
        const iframe = createEditPopupIframe(doc);
        iframe.style.transition = "opacity .5s linear";
        iframe.style.opacity = "0";
        iframe.setAttribute('tabindex', '-1');

        wrapper.classList.add('qq-edit-popup-wrapper');

        const {buttonsWrapper, okButton} = createEditPopupContainer(iframe, doc);
        const body = createEditPopupBody([buttonsWrapper], doc);

        doc.body.append(iframe);

        appendItemsToIframe();

        function appendItemsToIframe() {
            wrapper.append(header, body);
            iframe.style.opacity = "1";
            const shadow = iframe.attachShadow({mode: 'closed'});
            shadow.append(appendStyleElement(doc));
            shadow.append(wrapper);
        }

        return {wrapper, body, header, buttonsWrapper, okButton, iframe: wrapper, iframeParent: iframe}
    }

    function createEditPopupIframe(doc) {
        if ( typeof createEditPopupIframeCustom === 'function' ) {
            return createEditPopupIframeCustom(doc);
        }

        const iframe = doc.createElement('div');
        iframe.classList.add('qq-edit-popup');
        return iframe;
    }

    function createEditPopupHeader(doc) {
        const header = doc.createElement("div");
        const logo = doc.createElement("div");
        header.classList.add("qq-edit-popup-header");
        logo.classList.add('qq-edit-popup-logo');
        header.append(logo);
        return header;
    }

    function createEditPopupBody(appendList = [], doc) {
        const body = doc.createElement('div');
        const bodyText = doc.createElement('div');
        body.style.padding = '10px';
        bodyText.style.cssText = `
         margin-bottom: 5px;
    `;
        body.append(bodyText, ...appendList);
        return body;
    }

    function createEditPopupContainer(iframe, doc) {
        const buttonsWrapper = createEditPopupButtonsWrapper(doc);
        const okButton = createEditPopupButton('Понятно', 'qq-edit-popup-btn-ok', () => iframe.remove(), doc);

        buttonsWrapper.append(okButton);
        return {buttonsWrapper, okButton};
    }

    function createEditPopupButton(caption, className, eventListener, doc) {
        const button = doc.createElement('button');
        button.textContent = caption;
        button.classList.add(className);
        button.addEventListener("click", eventListener);
        return button;
    }

    function createEditPopupButtonsWrapper(doc) {
        const buttonsWrapper = doc.createElement('div');
        buttonsWrapper.classList.add("qq-edit-popup-buttons-wrapper");
        return buttonsWrapper;
    }

    function setFocus(frame) {
        const percentValue = frame.querySelector("#qq-percent-value");
        const flatValue = frame.querySelector("#qq-flat-value");
        if ( percentValue.offsetParent ) {
            percentValue.focus();
        } else {
            flatValue.focus();
            flatValue.setSelectionRange(flatValue.value.length, flatValue.value.length);
        }
    }

    function removeEditPopup(frameDoc) {
        try {
            const doc = frameDoc || getDocForPopup();
            const meta = doc.querySelector('#qq-meta');
            if ( meta ) {
                meta.remove();
            }
            const bg = doc.querySelector('.qq-edit-popup');
            if ( bg ) {
                bg.remove();
            }
            iframeParent.remove()
        } catch (e) {
            console.log(e);
            return null;
        }

    }

    function priceWithCurrency(price, currency) {
        return toMoney(price, 0, ",", " ") + " <span>" + currency + "</span>";
    }

    function initialyzeEditPopup(frame, option, discountSettings, img, doc) {
        const percentValue = frame.querySelector("#qq-percent-value");
        const flatValue = frame.querySelector("#qq-flat-value");
        const hotelName = frame.querySelector("#qq-hotel-name");
        const accommodation = frame.querySelector("#qq-accommodation");
        const initialPrice = frame.querySelector("#qq-initial-price");
        const finalPrice = frame.querySelector("#qq-final-price");
        const patternSelect = frame.querySelector("#qq-pattern-select");
        const comment = frame.querySelector("#qq-comment");
        const currency = frame.querySelectorAll("#qq-currency");
        const href = frame.querySelector("#qq-url_change");
        const nights = frame.querySelector("#qq-nights");
        const ex_nights = frame.querySelector("#qq-nights_extra");
        const checkinDt = frame.querySelector("#qq-checkin");
        nights.value = option.nights;
        ex_nights.value = option.extra_nights ? option.extra_nights : 0;
        checkinDt.value = option.checkinDt;
        frame.querySelector("#qq-edit").style.display = "none";
        href.value = "";
        frame.querySelector("#qq-url_add").style.display = "block";


        comment.value = option.comment ? option.comment : "";

        if ( discountSettings.showPercentageDiscount === true ) {
            frame.querySelector("#qq-percent-value-tr").setAttribute("style", "");
        } else {
            frame.querySelector("#qq-percent-value-tr").setAttribute("style", "display:none;");
        }

        function createSelectOption(predefDisc) {
            const selectOption = doc.createElement("option");
            selectOption.value = predefDisc.value;
            selectOption.text = predefDisc.name;
            selectOption.setAttribute("percentage", predefDisc.percentage);
            return selectOption;
        }

        if ( discountSettings.predefinedDiscounts.length > 0 ) {
            while (patternSelect.options.length > 0) {
                patternSelect.remove();
            }
            patternSelect.add(createSelectOption({name: "Не выбрана", value: null, percentage: null}));
            for (let i = 0; i < discountSettings.predefinedDiscounts.length; ++i) {
                patternSelect.add(createSelectOption(discountSettings.predefinedDiscounts[i]));
            }
            frame.querySelector("#qq-pattern-select-tr").setAttribute("style", "");
        } else {
            frame.querySelector("#qq-pattern-select-tr").setAttribute("style", "display: none;");
        }

        hotelName.innerHTML = option.hotelName;
        accommodation.textContent = [option.roomType, option.boardType].filter(text => text).join(', ');
        initialPrice.innerHTML = priceWithCurrency(option.initial_price, option.currency);
        finalPrice.innerHTML = priceWithCurrency(option.price, option.currency);
        for (let i = 0; i < currency.length; ++i) {
            currency[i].innerHTML = option.currency;
        }
        currency.innerHTML = option.currency;
        percentValue.value = '';
        flatValue.value = option.price;
        option.discount = 0;
        patternSelect.selectedIndex = 0;
        setEventsEditPopup(frame, option, img, doc, iframeParent);
    }

    function setEventsEditPopup(frame, option, img, doc, iframeParent) {
        const percentValue = frame.querySelector("#qq-percent-value");
        const flatValue = frame.querySelector("#qq-flat-value");
        const finalPrice = frame.querySelector("#qq-final-price");
        const patternSelect = frame.querySelector("#qq-pattern-select");
        const comment = frame.querySelector("#qq-comment");
        const href = frame.querySelector("#qq-url_change");
        const nights = frame.querySelector("#qq-nights");
        const ex_nights = frame.querySelector("#qq-nights_extra");
        const checkinDt = frame.querySelector("#qq-checkin");
        const checkoutDt = frame.querySelector("#qq-checkout");
        const urlErrorLabel = frame.querySelector(".url_error");

        frame.querySelector("#qq-add").onclick = async function () {
            await onEditFinished(option, img);
        };
        nights.onchange = ex_nights.onchange = nights.oninput = ex_nights.oninput = checkinDt.onkeyup = checkinDt.onchange = updateCheckoutDate;
        checkinDt.onblur = () => {
            const parsedDate = dayMonthYearToString(...checkinDt.value.trim().split("."));
            checkinDt.value = parsedDate ? parsedDate : checkinDt.value;
        };
        updateCheckoutDate();

        frame.querySelector("#qq-url_add").onclick = function () {
            frame.querySelector("#qq-url_add").style.display = "none";
            frame.querySelector("#qq-edit").style.display = "block";
            href.style.borderColor = "initial";
            urlErrorLabel.style.display = "none";
            href.focus();
        };

        frame.querySelector("#qq-url_cancel").onclick = function () {
            frame.querySelector("#qq-edit").style.display = "none";
            frame.querySelector("#qq-url_add").style.display = "block";
            href.style.borderColor = "initial";
            urlErrorLabel.style.display = "none";
        };

        percentValue.oninput = function () {
            const position = percentValue.selectionStart;
            percentValue.value = percentValue.value.replace(/[^0-9,.]/, "").replace(/[,.]/, "q").replace(/[,.]/g, "").replace(/q/, ".");
            percentValue.setSelectionRange(position, position);
            if ( parseFloat(percentValue.value.replace(/^[.]/, "0.")) > 100 ) {
                percentValue.value = 100;
            }
            calculateDiscount();
        };

        patternSelect.onchange = function () {
            calculateDiscount();
        };

        const onEnterOrEscape = async function (event) {
            if ( event.keyCode === 13 ) {
                await onEditFinished(option, img);
            }
            if ( event.keyCode === 27 ) {
                removeEditPopup(doc);
            }
        };


        comment.onkeydown = (e) => {
            if ( e.keyCode === 13 ) {
                e.stopPropagation()
            }
        };
        iframeParent.onkeydown = onEnterOrEscape;
        percentValue.onkeyup = flatValue.onkeyup = onEnterOrEscape;

        flatValue.oninput = function () {

            function err() {
                finalPrice.innerHTML = '<span style="color:red">Ошибка ввода стоимости</span>';
            }

            let expr = flatValue.value.replace(/,/g, ".");
            if ( expr == null || expr.length === 0 || expr.trim().length === 0 )
                expr = "0";
            else
                expr = expr.trim();

            // if user typed just an operator, dont do anything yet
            if ( /^[*+\-\/]$/.test(expr) ) {
                finalPrice.innerHTML = priceWithCurrency(option.price, option.currency);
                return;
            }


            if ( !/^[*+\-\/\d.\s()]+$/.test(expr) ) {
                err();
                return;
            }

            try {
                const result = Parser.evaluate(expr);

                if ( result === Infinity || result === -Infinity || isNaN(result) ) {
                    err();
                } else {
                    option.discount = parseInt(option.price - result, 10);
                    finalPrice.innerHTML = priceWithCurrency(result, option.currency);
                }
            } catch (e) {
                console.log({e})
                err();
            }
        };

        comment.oninput = function () {
            option.comment = comment.value;
        };

        function calculateDiscount() {
            const percentText = percentValue.value;
            if ( percentText.length === 0 ) {
                option.discount = 0;
            } else if ( !/^(\d*\.?,?\d*)$/.test(percentText) ) {
                option.discount = 0;
            } else {
                const discount = Math.round(option.initial_price * parseFloat(percentText.replace(/^[,.]/, "0."), 10) / 100);
                if ( discount <= option.initial_price ) {
                    option.discount = discount;
                } else {
                    option.discount = 0;
                }
            }

            const selectedOption = patternSelect.options[patternSelect.selectedIndex];
            if ( selectedOption ) {
                if ( selectedOption.getAttribute("percentage") !== "null" ) {
                    option.discount += Math.round((option.initial_price - option.discount) * parseFloat(selectedOption.getAttribute("percentage"), 10) / 100);
                }
                if ( selectedOption.value !== "null" ) {
                    option.discount += parseInt(selectedOption.value, 10);
                }
            }

            finalPrice.innerHTML = priceWithCurrency(option.initial_price - option.discount, option.currency);
            flatValue.value = option.initial_price - option.discount;
        }

        function updateCheckoutDate() {
            const dates = frame.querySelector("#qq-dates");
            dates.classList.remove("error");
            const checkin = dayMonthYearToString(...checkinDt.value.trim().split("."));

            if ( nights.validity.valid && ex_nights.validity.valid && checkin.length > 0 && checkin === formatDate(parseDate(checkin)) ) {
                checkoutDt.value = calcToDate(checkin, nights.value.toString(), ex_nights.value.toString());
                return true;
            } else {
                dates.classList.add("error");
                return false;
            }
        }

        async function onEditFinished(option, img) {
            try {
                if ( frame.querySelector("#qq-edit").style.display !== "none" ) {
                    href.style.borderColor = "initial";
                    urlErrorLabel.textContent = "Проверка ссылки...";
                    urlErrorLabel.style.color = "initial";
                    urlErrorLabel.style.display = "block";
                    let url = await validateUrl(href.value);
                    if ( url || href.value === "" ) {
                        option.href = url;
                        option.hrefUpdated = true;
                    } else {
                        href.style.borderColor = "red";
                        urlErrorLabel.textContent = "Некорректная ссылка!";
                        urlErrorLabel.style.color = "red";
                        urlErrorLabel.style.display = "block";
                        return;
                    }
                }

                if ( !updateCheckoutDate() ) {
                    return;
                }
                option.nights = nights.value.toString();
                option.extra_nights = ex_nights.value.toString();
                option.checkinDt = checkinDt.value.trim();

                if ( option.discount == null )
                    option.discount = 0;
                if ( option.comment )
                    option.comment = option.comment.trim();
                option.initial_price = option.initial_price || option.price;
                option.price = option.price - option.discount;
                option.has_discount = option.price < option.initial_price;
                option.hash = crc32(JSON.stringify(option) + new Date());
                removeEditPopup();
                if ( !option.operator ) {
                    option.operator = OPERATOR_NAME ? OPERATOR_NAME : "";
                }
                sendMessageToAddon("add clicked", option);
                if ( !img ) {
                    return;
                }
                const btnsContainer = img ? img.parentNode : null;
                btnsContainer.setAttribute("id", "qq-hash" + option.hash);
                querySelectorAll(btnsContainer, "div:not(.qq-rating-btn)").forEach(btn => {
                    btn.classList.add("added");
                    btn.title = getBtnTitle(btn);
                });
            } catch (e) {
                console.log(e);
                notifyPageRefreshRequired(e);
                logError("failed to process edit btn click", e, getLogErrorHtml(this));
                sendMessageToAddon("showerrorpage");
            }
        }

        async function validateUrl(address) {
            let addressForValidate = address;
            if ( addressForValidate.search(/^(http|https):\/\//) === -1 ) {
                addressForValidate = 'http://' + addressForValidate;
            }
            let isUrl = isUrlValid(addressForValidate);
            if ( isUrl && address.search(/^(http|https):\/\//) !== -1 ) {
                return address;
            }

            if ( isUrl ) {
                return await resolveProtocol(address);
            }
            return "";
        }

        function resolveProtocol(address) {
            let params = new FormData();
            params.append('urlWithoutProtocol', address);

            return fetchTimeout(4000, fetch(`https://${AGENCY_DOMAIN}/resolve-url-protocol`, {
                method: 'POST',
                body: params
            })).then(rsp => rsp.text()).catch(_ => 'http://' + address);
        }
    }

}

function isUrlValid(address) {
    try {
        let addressRegexp = new RegExp('^([\\w\\-]+?\\.?)+?\\.[\\w\\-]+?$');
        let url = new URL(address);
        return !(url.hostname.length < 4 || url.hostname.length > 255 || !addressRegexp.test(url.hostname));

    } catch (e) {
        return false;
    }
}

////--------------------OLD EDIT POPUP----------------//

function showEditPopupOld(data) {
    let frame = document.createElement("iframe");
    removeEditPopup();
    let height = 532;
    let top = '50%';
    if ( data && data.stick === "true" ) {
        top = data.editBtnCenter + "px";
    }
    if ( data && data.discountSettings.showPercentageDiscount !== true ) {
        height -= 23;
    }
    if ( data && data.discountSettings.predefinedDiscounts.length === 0 ) {
        height -= 23;
    }

    let marginHeight = Math.floor(height / 2);

    let bg = document.createElement("div");
    bg.setAttribute("id", "qq-adjust-price-bg");
    bg.setAttribute("style", "display:none;z-index:999999999;position: fixed;top:0;left:0;width: 100%;height: 100%;background-color: #ccc;opacity:.4;");
    document.body.appendChild(bg);


    frame.setAttribute("id", "qq-adjust-price-frame");
    frame.setAttribute("width", "508px");
    frame.setAttribute("height", height + "px");
    frame.setAttribute("frameborder", "0");
    frame.setAttribute("marginwidth", "0");
    frame.setAttribute("marginheight", "0");
    frame.setAttribute("vspace", "0");
    frame.setAttribute("hspace", "0");
    frame.setAttribute("align", "left");
    frame.onload = function () {
        loadEditPopupHtmlContent(frame);
        initialyzeEditPopup(frame, data.option, data.discountSettings, window.editBtnGlobal);
        onShowEditPopup(frame);
        setFocus(frame);
    };

    let popup = document.createElement("div");
    popup.setAttribute("id", "qq-adjust-price");
    popup.setAttribute("style", "display:none; position:fixed;z-index: 999999999;top:" + top + ";left:50%;width:508px;margin:-" + marginHeight + "px 0 0 -254px;height: " + height + "px; box-shadow: 0px 0px 5px #888;font-weight:400;font-style:normal;font-size-adjust:none;color:#262626;background-color:#FFFFFF;border: 1px solid #C0C0C0;padding-left: 25px; padding-right: 0px;");
    popup.appendChild(frame);

    document.body.appendChild(popup);

    displayEditPopup('block');
    let checkEvents = setInterval(checkAndRestoreEventsEditPopup, 500);

    function checkAndRestoreEventsEditPopup() {
        let doc = frame.contentDocument;
        if ( !doc ) {
            clearInterval(checkEvents);
            return;
        }
        let button = doc.getElementById("add");
        if ( button && button.onclick === null ) {
            setEventsEditPopup(frame, data.option, editBtnGlobal);
        }
    }


    function setFocus(frame) {
        let percentValue = frame.contentDocument.getElementById("percent-value");
        let flatValue = frame.contentDocument.getElementById("flat-value");
        if ( percentValue.offsetParent ) {
            percentValue.focus();
        } else {
            flatValue.focus();
            flatValue.setSelectionRange(flatValue.value.length, flatValue.value.length);
        }
    }

    function removeEditPopup() {
        let bg = document.getElementById('qq-adjust-price-bg');
        let popup = document.getElementById('qq-adjust-price');
        if ( bg ) {
            bg.remove();
        }
        if ( popup ) {
            popup.remove();
        }

        frame.remove();
    }

    function onShowEditPopup(frame) {
        let doc = frame.contentDocument;
    }

    function displayEditPopup(value) {
        document.getElementById("qq-adjust-price-bg").style.display = value;
        document.getElementById("qq-adjust-price").style.display = value;
    }

    function priceWithCurrency(price, currency) {
        return toMoney(price, 0, ",", " ") + " <span>" + currency + "</span>";
    }

    function initialyzeEditPopup(frame, option, discountSettings, img) {
        let doc = frame.contentDocument;

        let percentValue = doc.getElementById("percent-value");
        let flatValue = doc.getElementById("flat-value");
        let hotelName = doc.getElementById("hotel-name");
        let accommodation = doc.getElementById("accommodation");
        let initialPrice = doc.getElementById("initial-price");
        let finalPrice = doc.getElementById("final-price");
        let patternSelect = doc.getElementById("pattern-select");
        let comment = doc.getElementById("comment");
        let currency = doc.querySelectorAll("#currency");
        let href = doc.getElementById("url_change");
        let nights = doc.getElementById("nights");
        let ex_nights = doc.getElementById("nights_extra");
        let checkinDt = doc.getElementById("checkin");
        nights.value = option.nights;
        ex_nights.value = option.extra_nights ? option.extra_nights : 0;
        checkinDt.value = option.checkinDt;
        doc.getElementById("edit").style.display = "none";
        href.value = "";
        doc.getElementById("url_add").style.display = "block";


        comment.value = option.comment ? option.comment : "";

        if ( discountSettings.showPercentageDiscount === true ) {
            doc.querySelector("#percent-value-tr").setAttribute("style", "");
        } else {
            doc.querySelector("#percent-value-tr").setAttribute("style", "display:none;");
        }

        function createSelectOption(predefDisc) {
            let selectOption = document.createElement("option");
            selectOption.value = predefDisc.value;
            selectOption.text = predefDisc.name;
            selectOption.setAttribute("percentage", predefDisc.percentage);
            return selectOption;
        }

        if ( discountSettings.predefinedDiscounts.length > 0 ) {
            while (patternSelect.options.length > 0) {
                patternSelect.remove(0);
            }
            patternSelect.add(createSelectOption({name: "Не выбрана", value: null, percentage: null}));
            for (let i = 0; i < discountSettings.predefinedDiscounts.length; ++i) {
                patternSelect.add(createSelectOption(discountSettings.predefinedDiscounts[i]));
            }
            doc.querySelector("#pattern-select-tr").setAttribute("style", "");
        } else {
            doc.querySelector("#pattern-select-tr").setAttribute("style", "display: none;");
        }

        hotelName.innerHTML = option.hotelName;
        accommodation.textContent = [option.roomType, option.boardType].filter(text => text).join(', ');
        initialPrice.innerHTML = priceWithCurrency(option.initial_price, option.currency);
        finalPrice.innerHTML = priceWithCurrency(option.price, option.currency);
        for (let i = 0; i < currency.length; ++i) {
            currency[i].innerHTML = option.currency;
        }
        currency.innerHTML = option.currency;
        percentValue.value = '';
        flatValue.value = option.price;
        option.discount = 0;
        patternSelect.selectedIndex = 0;
        setEventsEditPopup(frame, option, img);

// fix for google chrome edit popup freeze (close btn javascript inside of html)
//	doc.getElementById("cancel").onclick = function() {
//		displayEditPopup('none');
//	};
    }

    function setEventsEditPopup(frame, option, img) {
        let doc = frame.contentDocument;
        let percentValue = doc.getElementById("percent-value");
        let flatValue = doc.getElementById("flat-value");
        let finalPrice = doc.getElementById("final-price");
        let patternSelect = doc.getElementById("pattern-select");
        let comment = doc.getElementById("comment");
        let href = doc.getElementById("url_change");
        let nights = doc.getElementById("nights");
        let ex_nights = doc.getElementById("nights_extra");
        let checkinDt = doc.getElementById("checkin");
        let checkoutDt = doc.getElementById("checkout");
        let urlErrorLabel = doc.querySelector(".url_error");

        doc.getElementById("add").onclick = async function () {
            if ( doc.getElementById("edit").style.display !== "none" ) {
                href.style.borderColor = "initial";
                urlErrorLabel.textContent = "Проверка ссылки...";
                urlErrorLabel.style.color = "initial";
                urlErrorLabel.style.display = "block";
                let url = await validateUrl(href.value);
                if ( url || href.value === "" ) {
                    option.href = url;
                    option.hrefUpdated = true;
                } else {
                    href.style.borderColor = "red";
                    urlErrorLabel.textContent = "Некорректная ссылка!";
                    urlErrorLabel.style.color = "red";
                    urlErrorLabel.style.display = "block";
                    return;
                }
            }

            if ( !updateCheckoutDate() ) {
                return;
            }
            option.nights = nights.value.toString();
            option.extra_nights = ex_nights.value.toString();
            option.checkinDt = checkinDt.value.trim();

            onEditFinished(option, img);
        };
        nights.onchange = ex_nights.onchange = nights.oninput = ex_nights.oninput = checkinDt.onkeyup = checkinDt.onchange = updateCheckoutDate;
        checkinDt.onblur = () => {
            let parsedDate = dayMonthYearToString(...checkinDt.value.trim().split("."));
            checkinDt.value = parsedDate ? parsedDate : checkinDt.value;
        };
        updateCheckoutDate();

        doc.getElementById("url_add").onclick = function () {
            doc.getElementById("url_add").style.display = "none";
            doc.getElementById("edit").style.display = "block";
            href.style.borderColor = "initial";
            urlErrorLabel.style.display = "none";
            href.focus();
        };

        doc.getElementById("url_cancel").onclick = function () {
            doc.getElementById("edit").style.display = "none";
            doc.getElementById("url_add").style.display = "block";
            href.style.borderColor = "initial";
            urlErrorLabel.style.display = "none";
        };

        percentValue.oninput = function () {
            let position = percentValue.selectionStart;
            percentValue.value = percentValue.value.replace(/[^0-9\,\.]/, "").replace(/[\,\.]/, "q").replace(/[\,\.]/g, "").replace(/q/, ".");
            percentValue.setSelectionRange(position, position);
            if ( parseFloat(percentValue.value.replace(/^[\.]/, "0.")) > 100 ) {
                percentValue.value = 100;
            }
            calculateDiscount();
        };

        patternSelect.onchange = function () {
            calculateDiscount();
        };
        let onEnterOrEscape = function (event) {
            if ( event.keyCode == 13 )
                onEditFinished(option, img);
            else if ( event.keyCode == 27 )
                removeEditPopup();
        };

        percentValue.onkeyup = flatValue.onkeyup = onEnterOrEscape;

        flatValue.oninput = function () {

            function err() {
                finalPrice.innerHTML = '<span style="color:red">Ошибка ввода стоимости</span>';
            }

            let expr = flatValue.value.replace(/,/g, ".");
            if ( expr == null || expr.length == 0 || expr.trim().length == 0 )
                expr = "0";
            else
                expr = expr.trim();

            // if user typed just an operator, dont do anything yet
            if ( /^[\*\+\-\/]$/.test(expr) ) {
                finalPrice.innerHTML = priceWithCurrency(option.price, option.currency);
                return;
            }


            if ( !/^[\*\+\-\/\d\.\s\(\)]+$/.test(expr) ) {
                err();
                return;
            }

            try {
                let result = Parser.evaluate(expr);

                if ( result == Infinity || result == -Infinity || isNaN(result) ) {
                    err();
                } else {
                    option.discount = parseInt(option.price - result, 10);
                    finalPrice.innerHTML = priceWithCurrency(result, option.currency);
                }
            } catch (e) {
                err();
            }
        };

        comment.oninput = function () {
            option.comment = comment.value;
        };

        function calculateDiscount() {
            let percentText = percentValue.value;
            if ( percentText.length == 0 ) {
                option.discount = 0;
            } else if ( !/^(\d*\.?\,?\d*)$/.test(percentText) ) {
                option.discount = 0;
            } else {
                let discount = Math.round(option.initial_price * parseFloat(percentText.replace(/^[\,\.]/, "0."), 10) / 100);
                if ( discount <= option.initial_price ) {
                    option.discount = discount;
                } else {
                    option.discount = 0;
                }
            }

            let selectedOption = patternSelect.options[patternSelect.selectedIndex];
            if ( selectedOption ) {
                if ( selectedOption.getAttribute("percentage") != "null" ) {
                    option.discount += Math.round((option.initial_price - option.discount) * parseFloat(selectedOption.getAttribute("percentage"), 10) / 100);
                }
                if ( selectedOption.value != "null" ) {
                    option.discount += parseInt(selectedOption.value, 10);
                }
            }

            finalPrice.innerHTML = priceWithCurrency(option.initial_price - option.discount, option.currency);
            flatValue.value = option.initial_price - option.discount;
        }

        function updateCheckoutDate() {
            let dates = doc.querySelector("#dates");
            dates.className = "";
            let checkin = dayMonthYearToString(...checkinDt.value.trim().split("."));
            if ( nights.validity.valid && ex_nights.validity.valid && checkin.length > 0 && checkin === formatDate(parseDate(checkin)) ) {
                checkoutDt.innerHTML = calcToDate(checkin, nights.value.toString(), ex_nights.value.toString());
                return true;
            } else {
                dates.className = "error";
                return false;
            }
        }
    }

    async function validateUrl(address) {
        let addressForValidate = address;
        if ( addressForValidate.search(/^(http|https):\/\//) === -1 ) {
            addressForValidate = 'http://' + addressForValidate;
        }
        let isUrl = isUrlValid(addressForValidate);
        if ( isUrl && address.search(/^(http|https):\/\//) !== -1 ) {
            return address;
        }

        if ( isUrl ) {
            let urlWithProtocol = await resolveProtocol(address);
            return urlWithProtocol;
        }
        return "";
    }

    function isUrlValid(address) {
        try {
            let addressRegexp = new RegExp('^([\\w\\-]+?\\.?)+?\\.[\\w\\-]+?$');
            let url = new URL(address);
            if ( url.hostname.length < 4 || url.hostname.length > 255 || !addressRegexp.test(url.hostname) ) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    function resolveProtocol(address) {
        let params = new FormData();
        params.append('urlWithoutProtocol', address);

        return fetchTimeout(4000, fetch(`https://${AGENCY_DOMAIN}/resolve-url-protocol`, {
            method: 'POST',
            body: params
        })).then(rsp => rsp.text()).catch(err => 'http://' + address);
    }

    function onEditFinished(option, img) {
        try {
            if ( option.discount == null )
                option.discount = 0;
            if ( option.comment )
                option.comment = option.comment.trim();
            option.initial_price = option.initial_price || option.price;
            option.price = option.price - option.discount;
            option.has_discount = option.price < option.initial_price;
            option.hash = crc32(JSON.stringify(option) + new Date());
            displayEditPopup('none');
            removeEditPopup();
            if ( !option.operator ) {
                option.operator = OPERATOR_NAME ? OPERATOR_NAME : "";
            }
            sendMessageToAddon("add clicked", option);
            if ( !img ) {
                return;
            }
            let btnsContainer = img ? img.parentNode : null;
            btnsContainer.setAttribute("id", "qq-hash" + option.hash);
            querySelectorAll(btnsContainer, "div:not(.qq-rating-btn)").forEach(btn => {
                btn.classList.add("added");
                btn.title = getBtnTitle(btn);
            });
        } catch (e) {
            notifyPageRefreshRequired(e);
            logError("failed to process edit btn click", e, getLogErrorHtml(this));
            sendMessageToAddon("showerrorpage");
        }
    }

    function loadEditPopupHtmlContent(frame) {
        let doc = frame.contentDocument;
        let head = doc.querySelector("head");
        let div = doc.createElement('div');
        div.setAttribute("style", "width: 492px;");
        head.innerHTML =
            '<style type="text/css">' +
            'body, h2, h4, table, table td, textarea { font-size: 16px; line-height: 1;' +
            '}' +
            'h3 {' +
            'font-size: 17px; line-height: 1;' +
            '}' +
            'input { font-size:14px; line-height: 1;' +
            '}' +
            '		body {' +
            '		    font-family:  Times New Roman;' +
            '			font-weight:	400;' +
            '			font-style:	normal;' +
            '			color:	#262626;' +
            '		  	background-color: #FFFFFF;' +
            '		  	padding: 3;' +
            '		  	line-height : 1;' +
            '		}' +
            '		#header {	' +
            '			margin-top: 25px;' +
            '			width: 475px;' +
            '		}' +
            '		#content {' +
            '			margin-top: 0px;' +
            '		    padding-bottom: 10px;' +
            '		}' +
            '		#content h3 {' +
            '			padding-top: 10px;' +
            '			margin-bottom: 0px;' +
            '		    height: 40px;' +
            '		    font-size:	16px;' +
            '		    overflow: hidden;' +
            '		    vertical-align: center;' +
            '		}' +
            '		#price-title {' +
            '			margin-bottom: -6px;' +
            '		}' +
            '		#discount {' +
            '		    width: 486px;' +
            '			padding-bottom: 10px;' +
            '			margin-left: -4px;' +
            '		}' +
            '		#discount tr:FIRST-CHILD td {' +
            '			padding-bottom: 10px;' +
            '		}' +
            '		#discount tr:last-child td {' +
            '			padding-top: 10px;' +
            '			font-weight: bold;' +
            '		}' +
            '		#supplements {' +
            '		    position: absolute;' +
            '		    bottom: 78px;' +
            '		    width: 468px;' +
            '			padding-top: 10px;' +
            '			padding-bottom: 10px;' +
            '		}' +
            '		td, input {' +
            '			margin: 0px;' +
            '			padding: 1px;' +
            '		}' +
            '		#supplements input {' +
            '			margin-left: 10px;' +
            '		}' +
            '		#pattern-select {' +
            '			width: 270px;' +
            '		}' +
            '		#flat-value {' +
            '			width: 270px;' +
            '		}' +
            '		#controls {' +
            '		    position: absolute;' +
            '		    bottom: 20px;' +
            '		    right: 30px;' +
            '		}' +
            '		#controls button {' +
            '		    width: 120px;' +
            '		}' +
            '		#comment-title {' +
            '			margin-bottom: 0px;' +
            '		}' +
            '		#comment {' +
            '			top: 10px;' +
            '			position: relative;' +
            '		    width: 475px;' +
            '		    height: 100px;' +
            '			resize: none;' +
            '		}' +
            '		#addurl {' +
            '			position: absolute;' +
            '			bottom: 45px;' +
            '		}' +
            '		#url_change {' +
            '			position: absolute;' +
            '		    bottom: 4px;' +
            '		    width: 375px;' +
            '		}' +
            '		#url_add {' +
            '           position: absolute;' +
            '           bottom: 4px;' +
            '           width: 300;' +
            '           left: 0;' +
            '		}' +
            '		#url_cancel {' +
            '           position: absolute;' +
            '           bottom: 4px;' +
            '           width: 75;' +
            '           left: 421;' +
            '       }' +
            '       #comment-title {' +
            '        display: block;' +
            '       -webkit-margin-before:0px;' +
            '		}' +
            '       #dates {' +
            '        margin-bottom:20px' +
            '		}' +
            '       #dates .message {' +
            '        display: none;' +
            '        color:red;' +
            '		}' +
            '       #dates.error nobr {' +
            '        display: none;' +
            '		}' +
            '       #dates.error .message {' +
            '        display: inline;' +
            '		}' +
            '       #dates input:invalid {' +
            '        border-color: red;' +
            '       }' +
            '	</style>   ';
        div.innerHTML =
            '   <div id="header">' +
            '    	<h3 id="hotel-name" style="margin-bottom: 0.5em;">name of hotel here</h3>' +
            '    	<div id="accommodation"  style="margin-bottom: 1em;">Room and board here</div>' +
            '   </div>' +
            '   <div id="dates" class = "noerr">' +
            '        <input id = "nights" type="number" min="1" required style="width: 40px">' +
            '&nbsp; ночей &nbsp;+ &nbsp;' +
            '        <input id = "nights_extra" type="number" min="0" required style="width: 40px">' +
            '&nbsp; в дороге, с &nbsp;' +
            '        <input id = "checkin" type="text" style="width: 90px" maxlength="10" required pattern="[0-9]{1,2}\\.[0-9]{1,2}\\.[0-9]{2,4}" placeholder="ДД.ММ.ГГГГ"">' +
            '&nbsp;&nbsp;' +
            '        <nobr>до &nbsp;<span id = "checkout">DD.MM.YYYY</span></nobr>' +
            '        <span class = "message">Ошибка ввода!</span>' +
            '   </div>' +
            '   <div id="content">' +
            '        <table id="discount">' +
            '            <tr>' +
            '                <td><h4 id="price-title"><span class="fLetter">С</span>тоимость</h4></td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td width="200px"><span class="fLetter">Ц</span>ена на сайте</td>' +
            '                <td/>' +
            '                <td class="priceTd" id="initial-price">initial</td>' +
            '                <td/>' +
            '            </tr>' +
            '            <tr class="detailing-price discount-value" id="percent-value-tr">' +
            '                <td><span class="fLetter">С</span>кидка</td>' +
            '                <td></td>' +
            '                <td class="priceTd"><input autocomplete="off" name="percent-value" id="percent-value" type="text" size="5" placeholder="0"/> %</td>' +
            '            </tr>' +
            '            <tr class="discount-select" id="pattern-select-tr">' +
            '                <td><span class="fLetter">П</span>редопределённая скидка</td>' +
            '                <td></td>' +
            '                <td class="priceTd"><select name="pattern-select" id="pattern-select"></select></td>' +
            '            </tr>' +
            '            <tr class="detailing-price">' +
            '                <td><span class="fLetter">Р</span>асчёт цены для клиента</td>' +
            '                <td></td>' +
            '                <td class="priceTd"><input  autocomplete="off" id="flat-value" type="text" size="30"/></td>' +
            '            </tr>' +
            '            <tr class="detailing-price">' +
            '                <td colspan="2"></td>' +
            '                <td class="priceTd">Введите итоговую цену или формулу. Подробнее <a href="https://help.qui-quo.support/support/solutions/articles/35000150959" target="_blank">здесь</a>.</td>' +
            '            </tr>' +
            '            <tr>' +
            '                <td><span class="fLetter">И</span>тоговая стоимость</td>' +
            '                <td/>' +
            '                <td class="priceTd" id="final-price">final</td>' +
            '            </tr>' +
            '        </table>' +
            '        <div id="supplements">' +
            '               <h4 id="comment-title"><span class="fLetter">К</span>омментарий</h4>' +
            '               <textarea id="comment"></textarea>' +
            '        </div>' +

            '    </div> ' +
            '<div id="addurl">' +
            '<ins id="url_add" style="cursor:pointer;color: #003eff"> Ввести свою ссылку на описание отеля </ins>' +
            '<div id="edit" style="display:none;" >' +
            '<input id = "url_change" type="text" placeholder="Введите ссылку либо оставьте пустым" size="50">' +
            '<ins id="url_cancel" style="cursor:pointer;color: #003eff"> Отмена </ins> ' +
            '</div>' +
            '</div>' +
            '    <div id="controls">' +
            ' <span class="url_error" style="color: red;display: none;left: -170px;position: absolute;">Некорректная ссылка!</span>' +
            '   	 <button id="cancel"><span class="fLetter">О</span>тмена</button>' +
            '        <button id="add"><span class="fLetter">Д</span>обавить</button>' +

            '</div>';
        div.querySelector("#cancel").onclick = function () {
            document.querySelector('#qq-adjust-price-bg').remove();
            document.querySelector('#qq-adjust-price').remove();
        };
        doc.body.appendChild(div);

    }
}

///--------------------------------------
{
    class Passenger {
        constructor(initialObject, row) {
            const passenger = validatePassengerFields(initialObject);
            this.crmId = findPassengerCrmId(row);
            this.firstName = passenger.firstName;
            this.lastName = passenger.lastName;
            this.firstNameRu = passenger.firstNameRu;
            this.lastNameRu = passenger.lastNameRu;
            this.secondName = passenger.secondName;
            this.authority = passenger.authority;
            this.authorityCode = passenger.authorityCode;
            this.issueDate = passenger.issueDate;
            this.number = String(passenger.number || '').replace(/[А-я]+/g, '');
            this.serial = String(passenger.serial || '').replace(/[А-я]+/g, '');
            this.expire = passenger.expire;
            this.address = passenger.address;
            this.birthday = passenger.birthday;
            this.nationality = passenger.nationality;
            this.email = passenger.email;
            this.phone = passenger.phone;
            this.sex = passenger.sex;
            this.title = passenger.title;
            this.inn = passenger.inn;
            this.docType = passenger.docType || this.parseDocType(passenger);
            this.isClient = passenger.isClient || false;
            this.type = passenger.type || 'adult';
        }

        setDocNumber(number, type = this.docType) {
            if ( !number ) {
                return;
            }
            switch (type) {
                case 'internationalPassport':
                    this.serial = number.slice(0, 2);
                    this.number = number.slice(2);
                    break;
                case 'nationalPassport':
                    this.serial = number.slice(0, 4);
                    this.number = number.slice(4);
                    break;
                case 'birthdayCertificate':
                    this.number = number
                    break;
            }
        }

        parseDocType(passenger) {
            if ( passenger.serial && passenger.serial !== 'KAZ' && passenger.serial.toUpperCase().match(/[MDCLXI]/) && passenger.number && passenger.number.length === 6 ) {
                return 'birthdayCertificate'
            }

            if ( passenger.serial === 'KAZ' || (passenger.number && passenger.number[0].toUpperCase() === 'N') ) {
                passenger.serial = '';
                return 'internationalPassport';  //For Kzt
            }
            if ( passenger.expire && passenger.number && passenger.serial && passenger.serial.length === 2 ) {
                return 'internationalPassport';
            }
            return 'nationalPassport';
        }
    }

    class Prices {
        constructor(obj = {}) {
            this.inForeignCurrency = {
                gross: obj.foreignGrossPrice,
                nett: obj.foreignNettPrice,
                currency: obj.foreignCurrency,
                paymentSchedule: [],
                payments: []
            };
            this.inNationalCurrency = {
                gross: obj.nationalGrossPrice,
                nett: obj.nationalNettPrice,
                currency: obj.nationalCurrency,
                paymentSchedule: [],
                payments: []
            };
            this.paidStatus = window.PAID_STASTUSES.unknown;
        }

        set foreignNettPrice(price) {
            this.inForeignCurrency.nett = parseFloat(price) || 0;
        }

        get foreignNettPrice() {
            return this.inForeignCurrency.nett;
        }

        set foreignGrossPrice(price) {
            this.inForeignCurrency.gross = parseFloat(price) || 0;
        }

        get foreignGrossPrice() {
            return this.inForeignCurrency.gross;
        }

        set foreignCurrency(currency) {
            if ( !currency ) {
                this.inForeignCurrency.currency = null;
                return;
            }
            this.inForeignCurrency.currency = mapCurrencyUtil(currency.slice(0, 3));
        }

        get foreignCurrency() {
            return this.inForeignCurrency.currency;
        }

        set nationalNettPrice(price) {
            this.inNationalCurrency.nett = parseFloat(price) || 0;
        }

        get nationalNettPrice() {
            return this.inNationalCurrency.nett;
        }

        set nationalGrossPrice(price) {
            this.inNationalCurrency.gross = parseFloat(price) || 0;
        }

        get nationalGrossPrice() {
            return this.inNationalCurrency.gross;
        }

        set nationalCurrency(currency) {
            if ( !currency ) {
                this.inNationalCurrency.currency = null;
                return;
            }
            this.inNationalCurrency.currency = mapCurrencyUtil(currency.slice(0, 3));
        }

        get nationalCurrency() {
            return this.inNationalCurrency.currency;
        }

        addNationalPaymentToSchedule(obj) {
            this.inNationalCurrency.paymentSchedule.push(new Payment(obj))
        }

        addForeignPaymentToSchedule(obj) {
            this.inForeignCurrency.paymentSchedule.push(new Payment(obj))
        }

        addNationalPayment(obj) {
            this.inNationalCurrency.payments.push(new Payment(obj))
        }

        addForeignPayment(obj) {
            this.inForeignCurrency.payments.push(new Payment(obj))
        }

        addPriceAuto(nettPrice, grossPrice, currency, commission) {
            nettPrice = nettPrice ? String(nettPrice) : null;
            grossPrice = grossPrice ? String(grossPrice) : null;
            const nettPriceType = nettPrice ? mapPriceType(mapCurrencyUtil(currency || nettPrice.replace(/\d+|\s+/g, ''))) : null;
            const grossPriceType = mapPriceType(mapCurrencyUtil(currency || grossPrice.replace(/\d+|\s+/g, '')));


            const nettPriceValue = nettPrice ? Number(nettPrice.replace(/\s+/g, '').replace(/,/g, '.')) : null;
            const grossPriceValue = Number(grossPrice.replace(/\s+/g, '').replace(/,/g, '.'));


            if ( nettPrice ) {
                this[`${nettPriceType}`].nett = nettPriceValue;
                this[`${nettPriceType}`].currency = currency ? currency : (mapCurrencyUtil(nettPrice.replace(/\d+|\s|,|\.+/g, '')));
            }

            this[`${grossPriceType}`].gross = grossPriceValue;
            this[`${grossPriceType}`].currency = currency ? currency : (mapCurrencyUtil(grossPrice.replace(/\d+|\s+|,|\./g, '')));

            if ( nettPriceValue === 0 && grossPriceValue > 0 && commission ) {
                const commissionValue = Number(commission.replace(/\s+/g, '').replace(/,/g, '.'));
                this[`${nettPriceType}`].nett = grossPriceValue - commissionValue;
            }

        }
    }

    class Payment {
        constructor(obj = {}) {
            this.date = obj.date;
            this.time = obj.time;
            this.percent = obj.percent ? Number(obj.percent) : null;
            this.amount = obj.amount ? Number(obj.amount) : null;
        }
    }

    class QuiQuoError extends Error {
        constructor(message, userMessage) {
            super(message);
            this.name = "QuiQuoError";
            this.userMessage = userMessage;
        }
    }

    window.Passenger = Passenger;
    window.Prices = Prices;
    window.Payment = Payment;
    window.QuiQuoError = QuiQuoError;
}

function findPassengerCrmId(row) {
    try {
        if ( !row ) {
            return null;
        }
        const idElement = row.querySelector('[data-qq-crm-id]') || row.closest('[data-qq-crm-id]');
        if ( idElement ) {
            return idElement.dataset.qqCrmId;
        }
        return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

function validatePassengerFields(passenger) {
    function isNameValid(name) {
        return !!name.match(/^\D*$/);
    }

    function isDateValid(dateStr) {
        return !!dateStr.match(/^\d{2}\.\d{2}\.\d{4}$/);
    }

    try {
        const nameFields = ['firstName', 'lastName', 'firstNameRu', 'lastNameRu', 'secondName'];
        for (const field of nameFields) {
            if ( passenger[field] && !isNameValid(passenger[field]) ) {
                passenger[field] = null;
            }
        }

        const dateFields = ['issueDate', 'expire', 'birthday'];
        for (const field of dateFields) {
            if ( passenger[field] && !isDateValid(passenger[field]) ) {
                passenger[field] = null;
            }
        }

        if ( passenger.sex && String(passenger.sex) !== '1' && String(passenger.sex) !== '2' ) {
            passenger.sex = null;
        }

        return passenger;
    } catch (e) {
        console.log(e);
        return passenger;
    }

}
