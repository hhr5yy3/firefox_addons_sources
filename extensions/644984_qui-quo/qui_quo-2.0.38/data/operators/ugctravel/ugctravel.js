var OPERATOR_NAME = "Ukraininan Global Company";
var OPERATOR_CURRENCY = "Ukraininan Global Company";
var DEFAULT_CURRENCY = "UAH";
var CURRENCY_SELECTION_STYLE =  "";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    var table = document.querySelector(".tour-result__table");
    if ( !table ) {
        return;
    }
    injectCurrencySelectionUtil(".tour-download_block", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE);
    var head = table.querySelector("tr.tour-result__head");
    if ( !head.querySelector(".qq") ) {
        head.appendChild(createHeaderCell());
    }
   querySelectorAll(table, ".result-tbody tr").filter( tr => {
       return tr.dataset.tpl === "item";
   }).forEach( tr => {
       if ( !tr.querySelector(".qq") ) {
           tr.append(createCell())
       }
   });
}

function createCell() {
    var newTd = document.createElement("td");
    newTd.appendChild(createAddButton());
    newTd.appendChild(createEditButton());
    newTd.className = "qq";
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
    var tr = getHotelRowByImage(img);
    var priceAndCurrency = getPrice(tr);
    var option = {
        checkinDt : findTdByDataId(tr, "DatesStr", getUgcText).split("/")[0],
        nights : findTdByDataId(tr, "nights", getUgcText),
        hotelName : findTdByDataId(tr, "hotel", getUgcText),
        href : findTdByDataId(tr, "hotel", getTd).href,
        roomType: findTdByDataId(tr, "nomer", getUgcText),
        region : findTdByDataId(tr, "resort", getUgcText),
        boardType : findTdByDataId(tr, "meal", getUgcText),
        price : priceAndCurrency[0],
        currency : priceAndCurrency[1],
        country:  getUgcText(document.querySelector('[data-country="title"]')),
        city_from: getCity()
    };
    return option;
}

function getPrice(tr) {
    var price = isPrefferedDefaultCurrencyUtil() ? findTdByDataId(tr, "priceUah", getUgcText) : findTdByDataId(tr, "priceFmt", getUgcText);
    return [extractIntFromStr(price), mapCurrency(price)];
}

function mapCurrency(priceText) {
    var text = priceText.replace(/\d+/g,"").trim();
    switch (text) {
        case "грн" : return "UAH";
        case "EUR" : return "EUR";
        case  "USD" : return "USD";
        default : return text;
    }
}

function getCity() {
    var aviaInput = document.querySelector('[data-switcher="Avia"] .tour-switch__input');
    if ( !aviaInput.checked ) {
        return "";
    }
    return getUgcText(document.querySelector('[data-city="title"]'));
}

function findTdByDataId(tr, dataId, callback) {
    var td = tr.querySelector(`[data-id='${dataId}']`);
    return callback(td);
}

function getUgcText(td) {
    return td ? td.textContent.trim().replace(/\s+/g, " ") : null;
}

function getTd(td) {
    return td;
}

function getHotelRowByImage(img) {
    var elem = img.parentNode;
    while (elem) {
        if ( elem.tagName === "TR" ) {
            return elem;
        }
        elem = elem.parentNode;
    }
    return null;
}
