var agencyId;
var isTestPeriod;
var quote;

var views = ["logon", "quote", "cant-make-quote"];
window.SERVER_DOMAINS = ["qui-quo.ru", "qui-quo.com", "qui-quo.online", "podborka-turov.online"];
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

function getStorageData(keys, callback) {
    return chrome.storage.local.get(keys, callback);
}

function onPopupLoad() {
    getStorageData(['quote', 'agency-id', 'managers', 'managerId', 'cannotMakeQuote', 'cannotMakeQuoteHtml', 'agencyLogoUrl', 'isTestPeriod', 'importantNews', 'domain'], function (data) {
        onLoad(data);
        sendMessageToAddon("update balance");
    });
}

document.addEventListener('DOMContentLoaded', onPopupLoad);

function showView(viewId) {
    for (var i = 0; i < views.length; i++) {
        if (views[i] != viewId) {
            document.getElementById(views[i]).style.display = 'none';
        }
    }
    document.getElementById(viewId).style.display = 'block';
}

function hideBanner() {
    $("#popupContainer").addClass("hide-banner");
}

function loadSettings(args) {
    quote = args["quote"];
    waitingPopup(false);

    agencyId = args["agency-id"];
    isTestPeriod = args["isTestPeriod"];
    initQuoteContentView();
    updateMangers(args["managers"], args["managerId"]);

    $("#header ul").removeClass("invisible");
    $(".manager").removeClass("invisible");
    checkPermissions()
}

function updateLogo(args) {
    let url = $("#manager option:selected").attr("logo") || args["agencyLogoUrl"] || "img/logo.png";
    setTimeout(() => $("#header .logo")[0].style.backgroundImage = `url(${url})`, 10);
}

function onLoad(args) {
    if ( args['domain'] ) {
        AGENCY_DOMAIN = args['domain']
    }

    if (!args["agency-id"]) {
        initLogonView();
        updateMangers(null, null);
        return;
    } else {
        loadSettings(args);
    }

    $("#manager").unbind("change").on("change", async function () {
        await setStorageDataAsync({managerId: this.value === "none" ? null : parseInt(this.value, 10)});
        updateLogo(args);
    });

    $("#quote-table-wrapper tbody").sortable({
        axis: 'y',
        cursor: "move",
        start: function (e, ui) {
            $(this).attr('data-previndex', ui.item.index());
        },
        update: function (e, ui) {
            disableSort(true);
            changeQuoteOptionOrder($(this).attr('data-previndex'), ui.item.index());
            $(this).removeAttr('data-previndex');
        }
    });
    if (args["cannotMakeQuote"]) {
        $("#cant-make-quote-msg").html(args["cannotMakeQuoteHtml"] ||args["cannotMakeQuote"]);
        //$("#cant-make-quote button").removeAttr("disabled");
        //$("#cant-make-quote button").unbind("click").on("click", function (e) {
            //$("#cant-make-quote button").attr("disabled", "disabled");
            //$("#cant-make-quote-msg").text("Подождите, пожалуйста, выполняется обработка запроса...");
            //sendMessageToAddon("update balance");
        //});
        showView("cant-make-quote");
	}

    updateLogo(args);
    $("#header .logo").removeClass("hide");
    showNews(args);
}

addMessageListener("updated balance", async function (data) {
    console.log("balance update notification: ", data);
    if (data.status === "error") {
        if ( data.httpStatus === 400 ) {
            await chrome.storage.local.clear();
            sendMessageToAddon("clear quote");
            return onPopupLoad();

        }
        $("#cant-make-quote-msg").text("Ошибка: " + data.msg + ". Попробуйте еще раз чуть позже.");
        $("#cant-make-quote button").removeAttr("disabled");
    } else {
        onLoad(data);
    }
});

function showNews(args) {
    var news = args.importantNews;
    if (news && news.length > 0) {
        var showId = getShowNewsId(news);
        $("#banner .content").empty().append(news[showId].html);
        $("#banner").unbind("click").on("click", function (e) {
            e.preventDefault();
            if (e.target.nodeName !== "A") {
                openTab(`https://${AGENCY_DOMAIN}/agency`);
            } else {
                var targetUrl = e.target.getAttribute("href");
                var url = targetUrl.match(/^http/i) ? targetUrl : `https://${AGENCY_DOMAIN}/` + targetUrl.replace(/^\//, "");
                openTab(url);
            }
        });
        $("#popupContainer").removeClass("hide-banner");
    } else {
        hideBanner();
    }
}

function getShowNewsId(news) {
    var showId = (localStorage.showId || 0) % news.length;
    localStorage.showId = showId + 1;
    return showId;
}

/*** LOGON VIEW ***/

function initLogonView() {
    showView('logon');
    $("#header ul").addClass("invisible");
    $(".manager").addClass("invisible");
    attachLogonViewEvents();
}

function logon() {
    var login = document.getElementById("logon-login").value;
    var password = document.getElementById("logon-password").value;

    waitingPopup(true);
    sendMessageToAddon("request agency id", {'login': login, 'password': password});
}

addMessageListener("obtained agency id", function (data) {
    $("#logonErrorDd").addClass("invisible");
    console.log("agency id event");
    waitingPopup(false);
    if (data.status === "success") {
        loadSettings(data.response);
    } else {
        $("#logonErrorDd").removeClass("invisible");
    }
});

/*** QUOTE CONTENT VIEW ***/

function initQuoteContentView() {
    updateQuoteContentView();

    showView('quote');

    document.querySelector("#close").onclick = function (e) {
        closePopup();
        e.preventDefault();
    };

    document.querySelector("#reload").onclick = function (e) {
        e.preventDefault();
        chrome.runtime.reload();
    };

    document.querySelector("#quote-clear").onclick = function () {
        removeDeletedOptions();
        clearQuote();
        clearQuoteContentTable();
        closePopup();
        disableSort(true);
    };

    document.querySelector("#quote-postpone").onclick = function () {
        if (!checkSelectedManager()) {
            removeDeletedOptions();
            waitingPopup(true);
            postponeQuote();
            disableSort(true);
        }
    };

    document.querySelector("#quote-done").onclick = function () {
        if (!checkSelectedManager()) {
            removeDeletedOptions();
            waitingPopup(true);
            sendQuote();
            disableSort(true);
        }
    };
    const addToursButton = document.querySelector("#add-tours");
    addToursButton.onclick = getOptionForPopup;
    checkOptionWithPopupActive(addToursButton)
    attachQuoteViewEvents();
    enableSort();
}

function checkSelectedManager() {
    var manager = document.getElementById("manager");
    var isWithManager = document.getElementById("popupContainer").classList.contains("with-manager");
    if (isWithManager && manager.value === "none") {
        showErrorMessagePopup("Выберите менеджера", "Для продолжения работы выберите себя в списке менеджеров. Выпадающий список находится над таблицей с турами.");
        return true;
    }
    return false;
}

function getQuoteContentTable() {
    return document.querySelector('#quote-table-wrapper>table>tbody');
}

function clearQuoteContentTable() {
    var t = getQuoteContentTable();
    while (t.firstChild) t.removeChild(t.firstChild);
}

function fillQuoteContentTable() {
    try {
        if ( quote && quote.options && quote.options.length > 0  ) {
        var t = getQuoteContentTable();
        for (var i = 0; i < quote.options.length; ++i) {
            t.appendChild(addQuoteOptionRow(quote.options[i], i));
        }
        }
    } catch (e) {
        handleCorruptedQuote(e);
    }
}

function addQuoteOptionRow(option, optionIdx) {
    var tr = document.createElement("tr");
    tr.setAttribute("optionIdx", optionIdx);
    tr.setAttribute("hash", option.hash);
    //addCell(tr, option.city_from ? option.city_from : "");
    var cityFrom = addCell(tr, option.city_from ? option.city_from : "");

    addCell(tr, option.checkinDt, dow(option.checkinDt), true);
    addCell(tr, option.nights + (option.extra_nights && option.extra_nights != "0" ? "+" + option.extra_nights : ""),
        "до " + calcToDate(option.checkinDt, option.nights, option.extra_nights ? option.extra_nights : "0"), true);
    addCell(tr, option.hotelName, makeRegion(option.country, option.region), false, option.href, option.comment);
    addCell(tr, option.boardType);
    addCell(tr, option.roomType);
    addPricesCell(tr, option);

    var removeBtn = document.createElement("td");
    var removeBtnImg = document.createElement("img");
    removeBtnImg.setAttribute("src", "img/glyphicons_197_remove.png");
    removeBtnImg.setAttribute("style", "cursor: pointer");
    removeBtn.style.textAlign = "center";
    removeBtnImg.onclick = function () {
        var tr = this.parentNode.parentNode;
        var optionIdx = tr.getAttribute("optionIdx");
        var hash = tr.getAttribute("hash");
        removeQuoteOption(optionIdx, hash);
    };
    removeBtn.appendChild(removeBtnImg);
    tr.appendChild(removeBtn);
    try {
        if (option.flight) {
            var flightDetails = document.createElement("div");
            flightDetails.classList.add('details')
            flightDetails.textContent = "Детали перелета";
            flightDetails.style = "font-size: 10px;cursor: pointer;text-decoration: underline;";
            var flightTitle = createFlightTitle(option.flight);
            tr.appendChild(flightTitle);
            cityFrom.onmouseover = function (e) {
                var x = e.clientX,
                    y = e.clientY;
                flightTitle.style.top = (y) + 'px';
                flightTitle.style.left = (x + 10) + 'px';
                flightTitle.style.bottom = 'unset';
                flightTitle.style.display = "grid";
                if (parseInt(getComputedStyle(flightTitle).bottom) < 1 && parseInt(getComputedStyle(flightTitle).top) > 1) {
                    flightTitle.style.bottom = (400 - y) + "px";
                    flightTitle.style.top = 'unset';

                }

            };
            cityFrom.onmouseout = function () {
                flightTitle.style.display = "none";
            };
            cityFrom.appendChild(flightDetails);
        }
    } catch (e) {
        console.log(e);
    }
    return tr;
}

function createFlightTitle(flight) {
    var div = document.createElement("div");
    div.style.display = "none";
    div.classList.add("flight-title");
    if (!flight || !flight.sectors) {
        return div;
    }
    for (var i = 0; i < flight.sectors.length; i++) {
        var sector = document.createElement("div");
        sector.classList.add("sector-wrapper");
        flight.sectors.length > 2 ? sector.appendChild(createGrid("#" + (i + 1), "font-size:12px;font-weight:bold;")) : null;
        var segmentsLength = flight.sectors[i].segments.length;
        var departure = flight.sectors[i].segments[0];
        var arrival = flight.sectors[i].segments[segmentsLength - 1];
        var gridsArray = createSegmentGrids(departure, arrival);
        gridsArray = gridsArray.filter(elem => {
            return elem && elem.textContent.trim();
        });
        gridsArray.forEach(elem => {
            sector.appendChild(elem);
        });
        if (segmentsLength > 1) {
            sector.appendChild(createGrid(createCaption("Пересадок: ", segmentsLength - 1), "font-weight:bold;color: brown;"));
        }
        div.appendChild(sector);
    }
    return div;
}

function createGrid(text, style) {
    if (!text) {
        return null;
    }
    var newDiv = document.createElement("div");
    style ? (newDiv.style = style) : null;
    newDiv.textContent = text.trim();
    return newDiv;
}

function createCaption(caption = "", text) {
    if (!text) {
        return "";
    }
    return caption + text;
}

function createSegmentGrids(dep, arr) {
    return [
        createGrid(createCaption("Вылет: ", dep.departureDate) + createCaption("  ", dep.departureTime)),
        createGrid(createCaption("", dep.departureCity || dep.departureAirport || "Нет данных")
            + createCaption(" (", dep.departureAirportID ? dep.departureAirportID + ")" : null)
            + createCaption(" → ", arr.arrivalCity || arr.arrivalAirport || "Нет данных")
            + createCaption(" (", arr.arrivalAirportID ? arr.arrivalAirportID + ")" : null),
            "font-weight:bold;"),
        createGrid(createCaption("Прибытие: ", arr.arrivalDate) + createCaption("  ", arr.arrivalTime)),
        createGrid(createCaption("Авиакомпания: ", dep.airline || arr.airline) + createCaption("  Рейс: ", dep.flightNumber) + createCaption("  Самолет: ", dep.plane))];
}

function changeQuoteOptionOrder(start, end) {
    var removed = quote.options.splice(start, 1);
    quote.options.splice(end, 0, removed[0]);
    saveQuote(quote);
    updateQuoteOptionIndexes();
}

function updateQuoteOptionIndexes() {
    $("#quote-table-wrapper tr[optionIdx]").each(function (index, tr) {
        $(tr).attr("optionIdx", index);
    });
}

function removeQuoteOption(optionIdx, hash) {
    sendMessageToAddon("remove clicked in QQ popup", [hash]); // посылаем бэкграунд скрипту хэш тура, который удалили из подборки
    quote.options.splice(optionIdx, 1);
    saveQuote(quote);
    if (quote.options.length === 0) {
        disableSort(true);
    }
    updateQuoteContentView();
}

function parseDate(date) {
    var r = date.match(/(\d+)\.(\d+)\.(\d+)/);
    return new Date(parseInt(r[3], 10), parseInt(r[2], 10) - 1, parseInt(r[1], 10));
}

function dow(date) {
    var DAYS_OF_WEEK = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    return DAYS_OF_WEEK[parseDate(date).getDay()];
}

function padZero(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function calcToDate(date, nights, extra_nights) {
    var d = parseDate(date);
    d.setDate(d.getDate() + parseInt(nights, 10) + parseInt(extra_nights, 10));
    return padZero(d.getDate()) + "." + padZero(d.getMonth() + 1);
}

function nobr(e) {
    var nb = document.createElement("nobr");
    nb.appendChild(e);
    return nb;
}

function addPricesCell(tr, option) {
    var td = document.createElement("td");

    var price = toMoney(option.price, 0, ",", " ");
    if (option.initial_price) {
        var ip = toMoney(option.initial_price, 0, ",", " ");
        if (price != ip) {
            var s = document.createElement("span");
            s.setAttribute("style", "text-decoration: line-through");
            s.appendChild(nobr(document.createTextNode(ip)));
            td.appendChild(s);
            td.appendChild(document.createElement("br"));
        }
    }

    var priceNode = td.appendChild(nobr(document.createTextNode(price)));

    var p = document.createElement("p");
    p.appendChild(document.createTextNode(option.currency));

    var priceTooltip = createOperatorTitle(option.operator);
    priceNode.onmouseover = function (e) {
        priceTooltip.style.top = '-1.5em';
        priceTooltip.style.right = '0';
        priceTooltip.style.display = 'block';
    };
    priceNode.onmouseout = function () {
        priceTooltip.style.display = "none";
    };

    priceNode.style.cssText = "cursor: pointer;text-decoration: underline;";

    priceNode.classList.add('details')

    td.appendChild(p);
    td.appendChild(priceTooltip);
    td.style.position = 'relative';
    tr.appendChild(td);
}


function createOperatorTitle(operator) {
    const div = document.createElement("div");
    div.style.display = "none";
    div.classList.add("sector-wrapper");
    div.textContent = operator;
    div.style.position = 'absolute';
    return div;
}

function addCell(tr, text, additionalText, nobr, href, comment) {
    var td = document.createElement("td");

    var textNode = document.createTextNode(text);

    if (href) {
        var a = document.createElement("a");
        a.setAttribute("href", href);
        a.setAttribute("target", "_blank");
        a.appendChild(textNode);
        if (typeof hotelLinkClick == "function") {
            a.onclick = function (e) {
                hotelLinkClick(href)
            };
        }
        textNode = a;
    }

    if (nobr) {
        var nobrEl = document.createElement("nobr");
        nobrEl.appendChild(textNode);
        textNode = nobrEl;
    }

    td.appendChild(textNode);

    if (additionalText) {
        var p = document.createElement("p");
        p.appendChild(document.createTextNode(additionalText));
        td.appendChild(p);
    }

    if (comment) {
        const tempDoc = new DOMParser().parseFromString(comment, "text/html");
        const htmlText = tempDoc.body.textContent;
        const p = document.createElement("p");
        p.setAttribute("id", "comment");
        p.setAttribute("title", htmlText);
        p.textContent = htmlText.length > 50 ? `${htmlText.slice(0, 50)}...` : htmlText;
        td.appendChild(p);
    }

    tr.appendChild(td);
    return td;
}

function makeRegion(country, region) {
    if (country && region) {
        return country + ", " + region;
    }
    return region ? region : country;
}

function activateButton(s, activate) {
    var btn = document.querySelector(s);
    if (activate) {
        btn.removeAttribute("disabled");
    } else {
        btn.setAttribute("disabled", "disabled");
    }
}

function displayEitherTableOrInstruction() {
    if (quote.options.length > 0) {
        document.querySelector('#quote-table-wrapper>table').style.display = 'table';
        document.querySelector('#quote-table-wrapper>p').style.display = 'none';
    } else {
        document.querySelector('#quote-table-wrapper>table').style.display = 'none';
        document.querySelector('#quote-table-wrapper>p').style.display = 'block';
    }
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
    var bg = document.getElementById("popup-bg");
    var p = document.getElementById("popup");
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
   window.open(url);
    closePopup();
}

function showErrorMessagePopup(title, msg) {
    $.colorbox({
        transition: "none",
        closeButton: false,
        width: "400px",
        opacity: 0.5,
        html: $("<div>")
            .attr("style", "text-align:left;")
            .append($("<div style='margin:0;padding: 6px 6px 6px 10px;border-bottom: 1px solid #ddd;font-weight:bold;text-align: center;'>").text(title))
            .append($("<p style='margin: 10px 6px 30px 10px;'>").html(msg))
            .append($("<div>").attr("style", "text-align:right;border-top: 1px solid #ddd;padding: 6px;").append(
                $("<button>")
                    .attr("style", "padding: 2px 10px 2px 10px;font-size:12px;")
                    .text("Закрыть")
                    .click(function () {
                        $.colorbox.close();
                    })))
    });
}

addMessageListener("quote added", function (data) {
    console.log("quote added event");
    waitingPopup(false);
    if (data.status == "success") {
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
    if (isMobileDevice()) {
        return;
    }
    copyNewStyle(text);
    copyOldStyle(text);
}

function lastQuotesClickHandler(e, agencyId) {
    const manager = getNodeProperty(selectedOption(document.querySelector('#manager'), false), null, 'value');
    openTab(`https://${AGENCY_DOMAIN}/agency/quotes?agencyId=` + agencyId + "&since=week&managerId=" + manager);
    e.preventDefault();
}

addMessageListener("quote copyText", function (data) {
    copyQuoteToClipboard(data.json, data.quote);
});

// addMessageListener("clear quote popup", function (data) {
//     removeDeletedOptions();
//     clearQuoteContentTable();
//     disableSort(true);
//     closePopup();
// });

//-------------------------Сортировка-------------------------------------------------//
function enableSort() {
    var table = disableSort(false);
    table.onclick = function (e) {

        if (e.target.tagName !== "TH" || e.target.classList.contains("sort-off")) {
            return;
        }
        var attr = e.target.getAttribute('class');

        if (attr === "sort-none") {
            var ths = table.querySelectorAll("th");
            for (var i = 0; i < ths.length - 1; i++) {
                ths[i].setAttribute("class", "sort-none");
            }
            e.target.setAttribute("class", "sort-up");
        }
        if (attr === "sort-up") {
            e.target.setAttribute("class", "sort-down");
        }
        if (attr === "sort-down") {
            e.target.setAttribute("class", "sort-up");
        }
        var sortObj = {
            type: e.target.getAttribute('data-type'),
            object: e.target.getAttribute('data-object'),
            className: e.target.getAttribute('class')
        };
        sortQuote(sortObj);
        saveSort(sortObj);
    };
    restoreSort(table);
}

function disableSort(clear) {
    var table = document.querySelector("#main-table");
    var ths = table.querySelectorAll("th");
    for (var i = 0; i < ths.length - 1; i++) {
        ths[i].setAttribute("class", "sort-none");
    }
    if (clear) {
        delete (localStorage.sort);
    }
    return table;
}

function sortQuote(sortObj) {
    var comparator = function (a, b) {
        if (sortObj.type === "str") {
            a = a[sortObj.object].toUpperCase();
            b = b[sortObj.object].toUpperCase();
        }

        if (sortObj.type === "int") {
            a = a[sortObj.object];
            b = b[sortObj.object];
        }

        if (sortObj.type === "date") {
            a = parseDate(a[sortObj.object]).getTime();
            b = parseDate(b[sortObj.object]).getTime();
        }

        if (sortObj.className === "sort-up") {
            return a > b ? 1 : a < b ? -1 : 0;
        }

        if (sortObj.className === "sort-down") {
            return a < b ? 1 : a > b ? -1 : 0;
        }

    };

    quote.options.sort(comparator);
    saveQuote(quote);
    updateQuoteOptionIndexes();
    clearQuoteContentTable();
    fillQuoteContentTable();
}

function restoreSort(table) {
    if (localStorage.sort) {
        var sortObj = JSON.parse(localStorage.getItem("sort"));
        table.querySelector("th[data-object=" + sortObj.object + "]").setAttribute("class", sortObj.className);
        sortQuote(sortObj);
    }
}

function saveSort(obj) {
    localStorage.setItem('sort', JSON.stringify(obj));
}

//---------------------------------------------------------- Конец сортировки-------------------------------------------//


//--------------------------------------------------------- Отображение добавленных туров-------------------------------//
function removeDeletedOptions() {                                        //при нажатии кнопок "Готово", "Очистить", "Отложить" посылаем хэши туров,
    var hashList = querySelectorAll(document, "tr[hash]").map(tr => {    // которые необходимо удалить из "добавленных"
        return tr.getAttribute("hash");
    });
    sendMessageToAddon("remove clicked in QQ popup", hashList);
}

function isMobileDevice() {
    return !!(navigator && navigator.userAgent && !!navigator.userAgent.match(/mobile/i));
}
