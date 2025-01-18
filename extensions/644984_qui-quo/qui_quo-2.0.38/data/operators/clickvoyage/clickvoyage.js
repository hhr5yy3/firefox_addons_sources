var OPERATOR_NAME = "ClickVoyage";
var DEFAULT_CURRENCY = "RUB";
var OPERATOR_CURRENCY = "clickvoyage";
var CURRENCY_SELECTION_STYLE = "font-size: 12px;margin: 0;padding: 0;display:inline-flex;width: 275px;";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    if ( !document.querySelector("#qq-currency") ) {
       injectCurrencySelectionUtil(".mag-tour-list-item",
           OPERATOR_CURRENCY,
           CURRENCY_SELECTION_STYLE,
           "font-size: 12px; margin-left: 1em;padding: 0;display:inline-flex",
           "display:flex;width: 400px;margin: 0;");
        injectCurrencySelectionUtil(".mag-tour-cart-price",
            OPERATOR_CURRENCY,
            "font-size: 12px;margin-top: 0.5em;padding: 0;display:inline-flex;width: 175px;",
            "font-size: 12px;margin-top: 1em;;padding: 0;display:inline-flex;height: 20px;",
            "display:flex;width: 160px;margin: 0;");
    }
    querySelectorAll(document, ".mag-tour-list-item-info .mag-tour-list-item-info__cost").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.appendChild(qqBtns({align: "horizontal"}));
        }
    });
    querySelectorAll(document, ".mag-tour-item-table .mag-tour-item-table__row:not(.mag-tour-item-table__header)").forEach(div => {
        if ( !div.querySelector(".qq") && !document.querySelector('.mag-tour-cart') ) {
            div.appendChild(qqBtns({align: "vertical"}, createTableOption));
        }
    });
    querySelectorAll(document, '.mag-tour-cart-price').forEach( cart => {
        if ( !cart.querySelector(".qq") ) {
            cart.appendChild(qqBtns({align: "horizontal"}, createCartOption));
        }
    });
}

function createCell(className, action = createOption) {
    var newDiv = document.createElement("div");
    newDiv.appendChild(createAddButton(action));
    newDiv.appendChild(createEditButton(action));
    newDiv.style.marginRight = "1em";
    newDiv.classList.add("qq", className);
    return newDiv;
}

function createOption(img) {
    var tourInfo = getHotelRowByImage(img, "mag-tour-list-item-info");
    var tourInfoListArray = querySelectorAll(tourInfo, ".mag-tour-list-item-info__info div");
    var priceAndCurrency = getPrice(tourInfo);
    var option = {
        checkinDt: tourInfoListArray[0].textContent.trim(),
        nights: tourInfoListArray[2].textContent.replace(/\D+/g, ""),
        hotelName: tourInfo.querySelector(".mag-tour-list-item-info__name").textContent.trim() + getHotelCategory(tourInfo),
        href: null,
        roomType: tourInfoListArray[1].textContent.trim(),
        region: tourInfo.querySelector(".mag-tour-list-item-info__city").textContent.trim(),
        boardType: tourInfoListArray[3].textContent.trim(),
        price: priceAndCurrency.price,
        currency: priceAndCurrency.currency,
        country: "",
        city_from: getCityFrom(tourInfo),
        thumbnail: getImage(tourInfo)
    };
    return option;
}

function getHotelCategory(tourInfo) {
    var stars = tourInfo.querySelector(".mag-tour-list-item-info__category .el-rate, .mag-tour-cart-hotel__category .el-rate");
    return stars ? " " + stars.getAttribute("aria-valuenow") + "*" : "";
}

function getPrice(tour) {
    var price = isPrefferedDefaultCurrencyUtil() ? tour.querySelector(".mag-tour-list-item-info__cost-ru, .mag-tour-item-table__price") :
        tour.querySelector(".mag-tour-list-item-info__cost-en");
    price = price ? price.textContent : tour.querySelector(".mag-tour-list-item-info__cost-ru, .mag-tour-item-table__price").textContent;
    return {
        price: extractIntFromStr(price.replace(/\D+/g, "")),
        currency: mapCurrency(price.replace(/[\s\d,.)(]/g, ""))
    };
}

function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch ( c ) {
        case "₽":
            return "RUB";
        case "$":
            return "USD";
        case "€":
            return "EUR";
    }
    return c;
}

function getCityFrom(tourInfo) {
    var tourName = tourInfo.textContent;
    var transit = document.querySelector(".mag-tour-list-name.transition-box div").textContent.match(/вылет из\s*(.+)\s*,/i);
    if ( tourName.match(/с перелетом|прямые рейсы|авиаперелет/i) ) {
         return transit ? transit[1] : "";
    }
    return null;
}

function getImage(tour) {
    var image = tour.querySelector(".mag-tour-list-item-info__image img");
    return image ? image.src : null;
}

function createTableOption(img) {
    var tourRow = getHotelRowByImage(img, "mag-tour-item-table__row");
    var tourInfo = getHotelRowByImage(img);
    var headerDivs = querySelectorAll(tourInfo, ".mag-tour-item-table__header.mag-tour-item-table__row [class*='mag-tour-item-table__col']");
    var tourRowDivs = querySelectorAll(tourRow, "[class*='mag-tour-item-table__col']");
    var priceAndCurrency = getPrice(tourRow);
    var option = {
        checkinDt: tourRowDivs[findTableTdIndex(headerDivs, /Заезд/i)].textContent.trim(),
        nights:  tourRowDivs[findTableTdIndex(headerDivs, /Продолж/i)].textContent.replace(/\D+/g, ""),
        hotelName: tourRow.querySelector(".mag-tour-item-table__hotel").textContent.trim(),
        href: null,
        roomType: tourRowDivs[findTableTdIndex(headerDivs, /Размещение/i)].textContent.trim(),
        region: tourInfo.querySelector(".mag-tour-list-item-info__city").textContent.trim(),
        boardType: tourRowDivs[findTableTdIndex(headerDivs, /Питание/i)].textContent.trim(),
        price: priceAndCurrency.price,
        currency: priceAndCurrency.currency,
        country: "",
        city_from: getCityFrom(tourInfo),
        thumbnail: getImage(tourInfo)
    };
    return option;
}

function createCartOption(img) {
    var tourRow = getHotelRowByImage(document.querySelector('.mag-tour-item-table__price-chk'), "mag-tour-item-table__row");
    var headerDivs = querySelectorAll(document, ".mag-tour-item-table__header.mag-tour-item-table__row [class*='mag-tour-item-table__col']");
    var tourRowDivs = querySelectorAll(tourRow, "[class*='mag-tour-item-table__col']");
    var priceAndCurrency = getCartPrice(tourRow);
    var option = {
        checkinDt: tourRowDivs[findTableTdIndex(headerDivs, /Заезд/i)].textContent.trim(),
        nights:  tourRowDivs[findTableTdIndex(headerDivs, /Продолж/i)].textContent.replace(/\D+/g, ""),
        hotelName: document.querySelector(".mag-tour-cart-hotel__name").textContent.trim() + getHotelCategory(document),
        href: null,
        roomType: tourRowDivs[findTableTdIndex(headerDivs, /Размещение/i)].textContent.trim(),
        region: document.querySelector(".mag-tour-cart-hotel__city").textContent.trim(),
        boardType: tourRowDivs[findTableTdIndex(headerDivs, /Питание/i)].textContent.trim(),
        price: priceAndCurrency.price,
        currency: priceAndCurrency.currency,
        country: "",
        city_from: getCityFrom(document.querySelector(".mag-tour-cart-hotel__content-tour")),
        thumbnail: getCartImage()
    };
    return option;
}

function getCartPrice() {
    var price = isPrefferedDefaultCurrencyUtil() ? document.querySelector(".mag-tour-cart-price__cost-sum b") :
        document.querySelector(".mag-tour-cart-price__cost-sum span");
    price = price ? price.textContent : document.querySelector(".mag-tour-cart-price__cost-sum b").textContent;
    return {
        price: extractIntFromStr(price.replace(/\D+/g, "")),
        currency: mapCurrency(price.replace(/[\s\d,.)(]/g, ""))
    };
}

function getCartImage() {
    var image = document.querySelector(".mag-tour-cart-hotel__img img");
    return image ? image.src : null;
}

function getHotelRowByImage(img, className = "mag-tour-list-item") {
    var div = img.parentNode;
    while ( div ) {
        if ( div.classList.contains(className) ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
