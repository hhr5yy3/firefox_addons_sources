var OPERATOR_NAME = "Амиго-С";

var OPERATOR_CURRENCY = "amigos";
var DEFAULT_CURRENCY = "RUB";
var MATCH_CURRENCY = "р";
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return document.querySelector(".form-group.find-group input.btn-primary");
}

function injectData() {
    injectCurrencySelection()
    var table = document.querySelectorAll(".table.table-condensed.resultsGrid.no-margin");
    if ( table.length < 2 ){
        return;
    }
    var head = table[1].querySelector("thead tr");
    if ( !head.querySelector(".qq") ) {
        head.appendChild(createHeaderCell());
    }
    var trs = table[1].querySelectorAll("tbody tr");
    if ( trs.length > 0 ) {
        for ( var i = 0; i < trs.length; i++ ) {
            if ( !trs[i].querySelector(".qq") && trs[i].querySelector("td").getAttribute("rowspan") ) {
                trs[i].appendChild(createCell( trs[i].querySelector("td").getAttribute("rowspan")));
            }
        }
    }

}

function createCell(rowspan) {
    var newTd = document.createElement("td");
    newTd.appendChild(createAddButton());
    newTd.appendChild(createEditButton());
    newTd.className = "qq";
    newTd.setAttribute("rowspan", rowspan);
    return newTd;
}

function createHeaderCell() {
    var th = document.createElement("th");
    th.className = "qq";
    th.setAttribute("style", "width: 50px;");
    th.appendChild(document.createTextNode("QQ"));
    th.className = "qq";
    return th;
}

function createOption(img) {
    var tr = img.parentNode.parentNode;
    var rowspan = tr.querySelector("td").getAttribute("rowspan");
    var tds = tr.querySelectorAll("td");
    var trs = getTrs(tr, rowspan);
    var option = {
        checkinDt :getDate(tds[0]),
        nights : getNights(trs),
        extra_nights: extractExtraNights(tds[0], getNights(trs)),
        hotelName : getHotelName(trs),
        href : tds[2].querySelector("a").href,
        roomType: getRooms(trs),
        region : getRegionAndBoard(trs,"3"),
        boardType : getRegionAndBoard(trs,"5"),
        price : getPrice(tr),
        currency : getCurrency(tr),
        country:  getCountry(),
        city_from: getCity(),
        occupancy: getOccupancy()
    }
    return option;
}

function getDate(td) {
    var matcher = td.querySelector("div").textContent.match(/(\d\d)\.(\d\d)/);
    return appendYear(parseInt(matcher[1], 10), parseInt(matcher[2], 10));
}

function getNights(trs) {
    return trs.map(function (it) { return  extractIntFromStr(getTds(it,1).textContent) }).reduce(function (prev,cur) { return prev + cur }).toString();
}

function extractExtraNights(td,hnights) {
    var matcher = td.querySelector("div").textContent.match(/(\d\d).(\d\d)\s*-\s*(\d\d).(\d\d)/);
    if ( matcher && matcher.length === 5 ) {
        var date1 =  toDate(appendYear(extractIntFromStr(matcher[1]),extractIntFromStr(matcher[2])));
        var date2 =  toDate(appendYear(extractIntFromStr(matcher[3]),extractIntFromStr(matcher[4])));
        if ( date1 && date2 ){
            var fnights =  getDistance(date1, date2);
            hnights = extractIntFromStr(hnights);
            var extra_nights = fnights - hnights;
            if ( extra_nights > 0 ) {
                return extra_nights.toString();
            }
        }
    }
    return null;
}

function getHotelName(trs) {
    return trs.map(function (it) { return  getTds(it,2).querySelector("a").textContent.trim() }).join(" / ");
}

function getRooms(trs) {
    return trs.map(function (it) { return  getTds(it,4) }).map(getOneRoom).join(" / ");
}

function getOneRoom(td) {
    var span = td.querySelector(".text-muted");
    if ( span ) {
        var alloc = span.textContent.trim();
        return td.textContent.replace(alloc, "").trim() + ", " + alloc;
    }
    return td.textContent;
}

function getRegionAndBoard(trs,position) {
    return trs.map(function (it) { return  getTds(it,position).textContent.trim() }).join(" / ");
}

function getPrice(tr) {
    var price = "";
    if ( isPrefferedDefaultCurrency() ) {
        price = tr.querySelector(".results-price-rur.text-nowrap span") || tr.querySelector(".results-price");
    } else {
        price = tr.querySelector(".results-price");
    }
    return extractIntFromStr(getText(price));
}

function getCurrency(tr) {
    var currency = "";
    if ( isPrefferedDefaultCurrency() ) {
        currency = "p";
    } else {
        currency = tr.querySelector(".results-price").textContent.replace(/[\d,.\s]/g, '');
    }
    switch (currency.trim()) {
        case "€": return "EUR";
        case "p": return "RUB";
        case "pб": return "RUB";
        case "$": return "USD";
            return currency;
    }
}

function getCountry() {
    return document.querySelector(".btn-group.bootstrap-select button[data-id='countryTo']").title;
}

function getCity() {
    return document.querySelector(".btn-group.bootstrap-select button[data-id='cityFrom']").title;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var adults = document.querySelector("div[data-bind='radio:adultCount'] .active");
    var children = document.querySelector("div[data-bind='radio:childCount'] .active");
    if ( !adults || !children ) {
        return null;
    }
    occupancy.adultsCount = extractOptionalInt(adults.textContent);
    occupancy.childrenCount =  extractOptionalInt(children.textContent);
    if ( occupancy.childrenCount > 0 ) {
        var btns = document.querySelectorAll(".row.child-buttons button");
        var btns_tbix = document.querySelectorAll(".row.child-buttons button[tabindex='-1']");
        if ( btns.length-btns_tbix.length !== occupancy.childrenCount ) {
            return null;
        }
        var ages = [];
        for ( var i = 0; i < btns.length; i++ ) {
            if ( btns[i].getAttribute("tabindex") !== "-1" ) {
                var age = extractOptionalInt(btns[i].title);
                if ( age === null ) {
                    return null;
                }
                ages.push(age);
            }
        }
        occupancy.childAges = ages.join();
    }
    return occupancy;
}

function injectCurrencySelection() {
    if( document.querySelector("#qq-currency") ) {
        return;
    }
    var submit = document.querySelector("#searchResult");
    if ( !submit ) {
        return;
    }
    addCurrencySelection(submit);
    addAddonMessageListener("amigos currency", function(currency) {
        document.querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
        document.querySelector("#qq-currency").setAttribute("style", "display: block;");
    });
    sendMessageToAddon("get operator currency", OPERATOR_CURRENCY);
}

function isPrefferedDefaultCurrency() {
    var sel = document.querySelector("#qq-currency select");
    return !sel || sel.value != "USDEUR";
}

function addCurrencySelection(submit) {
    var div = document.createElement("div");
    div.id = "qq-currency";
    div.setAttribute("style", "display: none;");
    div.className = "container";


    var legend = document.createElement("legend");
    legend.setAttribute("style", "width:auto;float:left;margin-right:6px;font-size:12px;");
    legend.innerHTML = "Выберите предпочитаемую валюту для <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo:";
    div.appendChild(legend);

    var select = document.createElement("select");
    select.setAttribute("style", "margin-top:-3px;");
    select.onchange = function () {
        sendMessageToAddon("set operator currency", {operator: OPERATOR_CURRENCY, currency: select.value});
    };

    var defaultCurr = document.createElement("option");
    defaultCurr.value = DEFAULT_CURRENCY;
    defaultCurr.textContent = DEFAULT_CURRENCY;
    select.appendChild(defaultCurr);

    var foreign = document.createElement("option");
    foreign.value = "USDEUR";
    foreign.textContent = "USD / EUR";
    select.appendChild(foreign);

    div.appendChild(select);

    submit.parentElement.insertBefore(div, submit);
}

function toDate(text) {
    var m = text.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    return new Date(extractIntFromStr(m[3]), extractIntFromStr(m[2]) - 1, extractIntFromStr(m[1]));
}

function getTds(tr,position) {
    return tr.querySelector("td").getAttribute("rowspan") ? tr.querySelectorAll("td")[position] : tr.querySelectorAll("td")[position - 1] ;
}

function getTrs(tr, rowspan) {
    var trs = [];
    trs.push(tr);
    for ( var i = 1; i < rowspan; i++ ) {
        trs.push(tr.nextElementSibling);
    }
    return trs;
}