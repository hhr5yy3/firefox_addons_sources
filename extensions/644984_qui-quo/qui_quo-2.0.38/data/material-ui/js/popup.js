window.agencyId = null;
window.isTestPeriod = null;
window.quote = null;

window.views = ["logon", "quote", "cant-make-quote"];
window.SERVER_DOMAINS = ["qui-quo.ru", "qui-quo.com", "qui-quo.online","podborka-turov.online"];
window.DEFAULT_DOMAIN = SERVER_DOMAINS[0];
window.AGENCY_DOMAIN = DEFAULT_DOMAIN;

function addMessageListener(type, callback) {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.type === type) {
                callback(request.data);
            }
            sendResponse(undefined);
        }
    );
}

function closePopup() {
    window.close();
}

function onPopupLoad() {
    window.loginInput = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field.login'));
    window.passwordInput = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field.password'));
    window.alertDialog = new mdc.dialog.MDCDialog(document.querySelector('.mdc-dialog'));
    window.snackBar = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
    window.managerSelect = document.querySelector('#manager');
    // window.passwordHelperText = new mdc.textField.MDCTextFieldHelperText(document.querySelector('#password-helper'));
    chrome.storage.local.get(['quote', 'agency-id', 'managers', 'managerId', 'cannotMakeQuote', 'cannotMakeQuoteHtml', 'agencyLogoUrl', 'isTestPeriod', 'importantNews'], function (data) {
        onLoad(data);
    });
}

document.addEventListener('DOMContentLoaded', onPopupLoad);

function showView(viewId) {
    for (let i = 0; i < views.length; i++) {
        if (views[i] !== viewId) {
            document.getElementById(views[i]).style.display = 'none';
        }
    }
    document.getElementById(viewId).style.display = 'block';
}

function loadSettings(args) {
    quote = args["quote"];
    waitingPopup(false);

    agencyId = args["agency-id"];
    isTestPeriod = args["isTestPeriod"];
    initQuoteContentView();
    updateMangers(args["managers"], args["managerId"]);

    //$("#header ul").removeClass("invisible");
    //$(".manager").removeClass("invisible");
}

function updateLogo(args) {
    const url = args["agencyLogoUrl"] || "../img/logo.png";
    const managerSelect = selectedOption(window.managerSelect, false);
    if (managerSelect) {
        managerSelect.setAttribute("logo", url);
    }
    document.querySelector(".logo").src = url;
}

function onLoad(args) {
    if ( args['domain'] ) {
        window.AGENCY_DOMAIN = args['domain'];
    }

    if (!args["agency-id"]) {
        initLogonView();
        updateMangers(null, null);
    } else {
        loadSettings(args);
    }

    window.managerSelect.addEventListener("change", async function () {
        await setStorageDataAsync({managerId: window.managerSelect.value === "none" ? null : parseInt(this.value, 10)});
        updateLogo(args);
    });
    if (args["cannotMakeQuote"]) {
        const button = document.querySelector("#cant-make-quote button");
        const msg = document.querySelector("#cant-make-quote-msg");
        document.querySelector("#cant-make-quote-msg").innerHTML = (args["cannotMakeQuoteHtml"]) || (args["cannotMakeQuote"]);
        button.removeAttribute("disabled");
        button.onclick = function () {
            button.setAttribute("disabled", "disabled");
            msg.textContent = ("Подождите, пожалуйста, выполняется обработка запроса...");
            sendMessageToAddon("update balance");
        };

        showView("cant-make-quote");
        activateButton("#quote-clear", false);
        activateButton("#quote-postpone", false);
        activateButton("#quote-done", false);
    }
    updateLogo(args);
}

addMessageListener("updated balance", async function (data) {
    if (data.status === "error") {
        if ( data.httpStatus === 400 ) {
            await chrome.storage.local.clear();
            sendMessageToAddon("clear quote");
            return onPopupLoad();

        }
        document.querySelector("#cant-make-quote-msg").textContent = "Ошибка: " + data.msg + ". Попробуйте еще раз чуть позже.";
        document.querySelector("#cant-make-quote button").removeAttribute("disabled");
    } else {
        onLoad(data);
    }
});
/*** LOGON VIEW ***/

function initLogonView() {
    showView('logon');
    attachLogonViewEvents();
}

function logon() {
    const login = document.getElementById("login-mdc-text-field").value;
    const password = document.getElementById("password-mdc-text-field").value;

    waitingPopup(true);
    sendMessageToAddon("request agency id", {
        'login': login,
        'password': password
    });
}

addMessageListener("obtained agency id", function (data) {
    waitingPopup(false);
    if (data.status === "success") {
        loadSettings(data.response);
    } else {
        showErrorMessagePopup('Неверный логин или пароль', "Пожалуйста, попробуйте снова.")
    }
});

/*** QUOTE CONTENT VIEW ***/

function initQuoteContentView() {
    showView('quote');
    updateQuoteContentView();
    const postPoneButton = document.querySelector("#quote-postpone")

    document.querySelector("#close").onclick = function (e) {
        closePopup();
        e.preventDefault();
    };

    document.querySelector("#quote-clear").onclick = function () {
        window.snackBar.close();
        removeDeletedOptions();
        clearQuote();
        clearQuoteContentTable();
        updateQuoteContentView();
    };

    postPoneButton.onclick = function () {
        if (!checkSelectedManager()) {
            removeDeletedOptions();
            waitingPopup(true);
            postponeQuote();
        }
    };

    document.querySelector("#quote-done").onclick = function () {
        if (!checkSelectedManager()) {
            removeDeletedOptions();
            waitingPopup(true);
            sendQuote();
        }

    };

    const addToursButton = document.querySelector("#add-tours");
    addToursButton.onclick = getOptionForPopup;
    checkOptionWithPopupActive(addToursButton, postPoneButton)

    attachQuoteViewEvents()
}

function checkSelectedManager() {
    const manager = document.getElementById("manager");
    if (manager.value === "none") {
        showErrorMessagePopup("Выберите менеджера", "Для продолжения работы выберите себя в списке менеджеров. Выпадающий список находится над таблицей с турами.");
        return true;
    }
    return false;
}

function clearQuoteContentTable() {
    $$('.card-container .qq-card').forEach(card => card.remove());
}

function fillQuoteContentTable() {
    try {
        const cardContainer = document.querySelector('.card-container');
        if (quote && quote.options && quote.options.length > 0) {
            quote.options.forEach((option, index) => {
                const cardElement = createTourCard(option, index);
                cardContainer.appendChild(cardElement);
            })
        }
    } catch (e) {
        handleCorruptedQuote(e);
    }
}

function createTourCard(option, optionIdx) {
    const card = document.createElement("div");
    const html = `
            <div class="mdc-card-wrapper__text-section">
                <div class="text-section__left"><img class="hotel-img"
                                                     src="https://media-cdn.tripadvisor.com/media/photo-s/0d/6c/ac/5e/grand-pasa-hotel.jpg">
                </div>
                <div class="text-section__right">
                    <div class="qq-card__title"><a class="hotel"><a/></div>
                    <div class="qq-card__subhead">
                         <i aria-hidden="true" class="material-icons mdc-text-field__icon"><!---->flight_takeoff<!----></i>
                         <span class="city"></span>
                          <i aria-hidden="true" class="material-icons mdc-text-field__icon"><!---->flight_land<!----></i>
                         <span class="region"></span>
                         </div>
                    <div class="qq-card__subhead">
                          <i aria-hidden="true" class="material-icons mdc-text-field__icon"> <!---->date_range<!----></i>
                         <span class='start-date'></span> — <span class='end-date'></span>,  <span class='nights'></span><span class='extra-nights' hidden>+</span> нч</div>

                    <div class="qq-card__subhead">
                        <i aria-hidden="true" class="material-icons mdc-text-field__icon"> <!---->restaurant<!----></i>
                        <span class="board">All inclusive</span>
                    </div>
                    
                    <div class="qq-card__subhead">
                         <i aria-hidden="true" class="material-icons mdc-text-field__icon"><!---->king_bed<!----></i>
                         <span class='room'></span>
                    </div>
                </div>
            </div>
            <div class="mdc-card-wrapper__text-section price">
                <div class="qq-card__title_price"></div>
                ${isSafari() ? '' : '<button class="material-icons mdc-top-app-bar__action-item mdc-icon-button remove">delete</button>'}
            </div>`;
    card.insertAdjacentHTML('afterbegin', html);
    card.classList.add('mdc-card', 'mdc-card--elevated', 'qq-card');
    card.setAttribute("optionIdx", optionIdx);
    card.setAttribute("hash", option.hash);
    const nodes = {
        hotelImg: card.querySelector('.hotel-img'),
        hotelName: card.querySelector('.hotel'),
        region: card.querySelector('.region'),
        dateStart: card.querySelector('.start-date'),
        endDate: card.querySelector('.end-date'),
        nights: card.querySelector('.nights'),
        extra_nights: card.querySelector('.extra-nights'),
        city: card.querySelector('.city'),
        board: card.querySelector('.board'),
        room: card.querySelector('.room'),
        price: card.querySelector('.qq-card__title_price')
    };
    nodes.hotelImg.src = option.thumbnail || '../img/hotel-no-photo.png';
    nodes.hotelName.textContent = option.hotelName;
    nodes.hotelName.href = option.href;
    nodes.region.textContent = makeRegion(option.country, option.region);
    nodes.dateStart.textContent = option.checkinDt;
    nodes.endDate.textContent = calcToDate(option.checkinDt, option.nights, option.extra_nights ? option.extra_nights : "0");
    nodes.nights.textContent = option.nights;
    nodes.extra_nights.textContent = option.extra_nights;
    if (option.extra_nights && parseInt(option.extra_nights) > 0) {
        nodes.extra_nights.removeAttribute('hidden');
    }
    nodes.city.textContent = option.city_from;
    nodes.board.textContent = option.boardType;
    nodes.room.textContent = option.roomType;
    nodes.price.textContent = toMoney(option.price, 0, ",", " ") + ' ' + option.currency.slice(0, 3);
    setElementDragable(card, optionIdx, option.hash);
    const removeBtn = card.querySelector('button.remove');
    if ( removeBtn ) {
        removeBtn.addEventListener('click', ()=> removeQuoteOption(optionIdx, option.hash))
    }
    return card;
}

function setElementDragable(elmnt, optionIdx, hash) {
    let pos1 = 0, pos3 = 0, max = 0, min = 0;
    elmnt.addEventListener('touchstart', dragMouseDown);


    function dragMouseDown(e) {

        pos3 = e.pageX;

        document.addEventListener('touchend', closeDragElement);
        document.addEventListener('touchmove', elementDrag);

    }

    function elementDrag(e) {
        pos1 = pos3 - e.pageX;
        pos3 = e.pageX;
        const summary = elmnt.offsetLeft - pos1;
        if (summary > max) {
            elmnt.style.left = (max) + "px";
            return;
        }
        if (summary < min - 300) {
            elmnt.style.left = (min - 300) + "px";
            removeQuoteOption(optionIdx, hash, elmnt);
            return;
        }
        elmnt.style.left = (summary) + "px";
    }

    function closeDragElement() {
        document.removeEventListener('touchend', closeDragElement);
        document.removeEventListener('touchmove', elementDrag);
        elmnt ? elmnt.style.left = '0px' : null;
    }
}

function removeQuoteOption(optionIdx, hash) {
    window.snackBar.open();
    const savedOption = quote.options[optionIdx];
    confirmRemoveQuoteOption(optionIdx, hash);
    displayEitherTableOrInstruction();
    const cardsCount = $$('.qq-card').length;
    activateButton("#quote-clear", cardsCount > 0);
    activateButton("#quote-postpone", cardsCount > 0);
    activateButton("#quote-done", cardsCount > 0);

    window.snackBar.foundation.adapter.notifyClosed = (reason) => {
        if (reason === 'action') {
            quote.options.splice(Number(optionIdx), 0, savedOption);
            saveQuote(quote);
            updateQuoteContentView();
        }
    };

}

function confirmRemoveQuoteOption(optionIdx, hash) {
    sendMessageToAddon("remove clicked in QQ popup", [hash]); // посылаем бэкграунд скрипту хэш тура, который удалили из подборки
    quote.options.splice(optionIdx, 1);
    saveQuote(quote);
    updateQuoteContentView();
}

function parseDate(date) {
    const r = date.match(/(\d+)\.(\d+)\.(\d+)/);
    return new Date(parseInt(r[3], 10), parseInt(r[2], 10) - 1, parseInt(r[1], 10));
}

function dow(date) {
    const DAYS_OF_WEEK = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    return DAYS_OF_WEEK[parseDate(date).getDay()];
}

function padZero(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function calcToDate(date, nights, extra_nights) {
    const d = parseDate(date);
    d.setDate(d.getDate() + parseInt(nights, 10) + parseInt(extra_nights, 10));
    return padZero(d.getDate()) + "." + padZero(d.getMonth() + 1) + "." + (d.getFullYear());
}

function nobr(e) {
    const nb = document.createElement("nobr");
    nb.appendChild(e);
    return nb;
}

function makeRegion(country, region) {
    if (country && region) {
        return country + ", " + region;
    }
    return region ? region : country;
}

function activateButton(s, activate) {
    const btn = document.querySelector(s);
    if (activate) {
        btn.removeAttribute("disabled");
    } else {
        btn.setAttribute("disabled", "disabled");
    }
}

function displayEitherTableOrInstruction() {
    const instructionCard = document.querySelector('.qq-instructions');
    if (quote && quote.options && quote.options.length === 0 || $$('.qq-card').length === 0) {
        instructionCard.style.display = 'flex';
        return;
    }
    instructionCard.style.display = 'none';
}

function updateQuoteContentView() {
    clearQuoteContentTable();
    fillQuoteContentTable();

    displayEitherTableOrInstruction();

    activateButton("#quote-clear", quote.options.length > 0);
    activateButton("#quote-postpone", quote.options.length > 0);
    activateButton("#quote-done", quote.options.length > 0);
}

function waitingPopup(show) {
    const bg = document.getElementById("popup-bg");
    const p = document.getElementById("popup");
    if (show) {
        bg.style.display = "block";
        p.style.display = "block";
    } else {
        bg.style.display = "none";
        p.style.display = "none";
    }
}

function clearQuote() {
    sendMessageToAddon("clear quote");
    quote.options = [];
}

function saveQuote(q) {
    sendMessageToAddon("save quote", q);
}

function sendQuote() {
    sendMessageToAddon("add quote");
}

function postponeQuote() {
    sendMessageToAddon("postpone quote");
}

function openTab(url) {
    sendMessageToAddon("open tab", url);
   // closePopup();
}

function showErrorMessagePopup(title, msg) {
    const container = alertDialog.container;
    const titleNode = container.querySelector('#qq-dialog-title');
    const content = alertDialog.content;
    titleNode.innerHTML = title;
    content.innerHTML = msg;
    alertDialog.open();
}

addMessageListener("quote added", function (data) {
    waitingPopup(false);
    if (data.status === "success") {
        closePopup();
    } else {
        if (data.message === "Неверный идентификатор турагентства") {
            initLogonView();
        }
        showErrorMessagePopup("Ошибка!", data.message);
        if (data.url) {
            openTab(data.url);
        }
    }
});

function copyTextToClipboard(text) {
    copyNewStyle(text);
    copyOldStyle(text);
}

function lastQuotesClickHandler(e, agencyId) {
    const manager = getNodeProperty(selectedOption(window.managerSelect, false), null, 'value');
    openTab(`https://${AGENCY_DOMAIN}/agency/quotes?agencyId=` + agencyId + "&since=week&managerId=" + manager);
    e.preventDefault();
}

addMessageListener("quote copyText", function (data) {
    copyQuoteToClipboard(data.json, data.quote);
});


//--------------------------------------------------------- Отображение добавленных туров-------------------------------//
function removeDeletedOptions() {                                        //при нажатии кнопок "Готово", "Очистить", "Отложить" посылаем хэши туров,
    const hashList = querySelectorAll(document, "[hash]").map(tr => {    // которые необходимо удалить из "добавленных"
        return tr.getAttribute("hash");
    });
    sendMessageToAddon("remove clicked in QQ popup", hashList);
}

function isSafari() {
    return !!(navigator && navigator.userAgent && !!navigator.userAgent.match(/ipad|iphone/i));
}

document.addEventListener("visibilitychange", onVisibilityChange, false);

function onVisibilityChange() {
    if (document.visibilityState === "visible" ) {
        onPopupLoad();
    }
}
