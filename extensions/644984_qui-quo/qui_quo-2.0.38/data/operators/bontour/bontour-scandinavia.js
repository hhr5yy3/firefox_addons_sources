var OPERATOR_NAME = "БОНТУР";
var showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    querySelectorAll(document, '.info_td1 img[src*="dot.png"]').forEach(img => {
        if ( !img.nextElementSibling || !img.nextElementSibling.classList.contains("qq") ) {
            img.nextSibling.after(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var tds = querySelectorAll(tr, "td");
    var td0Text = getText(tds[0]);
    var price = getText(tds[1]);
    var option = {
        checkinDt: appendYear(...getText(img.parentNode.previousSibling).split(".")),
        nights: getNights(td0Text),
        hotelName: td0Text.replace(/\s*-\s*\d+\s*де*н.+/, ""),
        href: getNodeProperty(tds[0].querySelector("a"), null, "href"),
        country: "",
        region: getRegion(tr),
        roomType: getTourType(tds[2]),
        boardType: "",
        price: extractIntFromStr(price.replace(/\D+/g, "")),
        currency: mapCurrency(price),
        city_from: "",
        excursion: true,
    };
    return option;
}

function getNights(text) {
    var days = text.match(/(\d+)\s*де*н/)[1];
    return (days-1).toString();
}

function getRegion(tr) {
    var tourInfo = tr.previousElementSibling;
    while (tourInfo) {
        if ( tourInfo.tagName === "TR" && tourInfo.querySelector("strong") && tourInfo.querySelector("td") && tourInfo.querySelector("td").getAttribute("colspan") == "11" ) {
            break;
        }
        tourInfo = tourInfo.previousElementSibling;
    }
    return tourInfo.textContent.trim();
}

function getTourType(td) {
    return querySelectorAll(td, "img").map( img => img.title ).filter( title => title ).join(", ");
}

function mapCurrency(price) {
    var text = price.replace(/\d+/g, "").trim();
    switch (text) {
        case "€": return "EUR";
        case "руб.": return "RUB";
        case "$": return "USD";
    }
    return text;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( div.tagName === "TR" ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}