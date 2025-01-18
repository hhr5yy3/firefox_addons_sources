var OPERATOR_NAME = "Cruise-Life.PRO";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    querySelectorAll(document, ".cruize-block .price-block").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({ align:  "qq-horizontal" }));
        }
    });
}

function createOption(img) {
    var main = getHotelRowByImage(img);
    var resBtn = main.querySelector(".next_to_routers.yellow");
    var comp = main.querySelector(".logo-comp");
    var option = {
        checkinDt: getDate(main),
        nights: extractIntFromStr(getNodeProperty(main.querySelector(".price-block .nights"))).toString(),
        hotelName: getNodeProperty(main.querySelector(".block-title.bord-bot .name")),
        href: resBtn ? window.location.origin+"/search/" + resBtn.getAttribute("dates") : window.location.href,
        roomType: getNodeProperty(main.querySelector(".img.case, .fa-briefcase").nextElementSibling.nextElementSibling),
        region:  getNodeProperty(main.querySelector(".img.marker, .fa-map-marker").nextElementSibling.nextElementSibling),
        boardType: getNodeProperty(main.querySelector(".img.food, .fa-cutlery").nextElementSibling.nextElementSibling),
        price:  querySelectorAll(main, `.price_date span`).find( e => e.offsetHeight > 0 ).textContent.replace(/\D+/g,""),
        currency:  mapCurrency(querySelectorAll(main, `.price_date .curr`).find( e => e.offsetHeight > 0 ).textContent),
        country: "",
        city_from: "",
        operator: comp ? OPERATOR_NAME + " / " + comp.title : OPERATOR_NAME,
        comment: getNodeProperty(main.querySelector(".infos.route .desc")),
        thumbnail: getBackgroundImageUrl(main.querySelector(".prev-img"))
    };
    return option;
}

function getDate(main) {
    return querySelectorAll(main, ".infos.dates input").find( e => e.checked).value;
}

function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch (c) {
        case "ГРН.": return "UAH";
        case "БЕЛ. РУБ": return "BYN";
    }
    return c;
}

function getHotelRowByImage(img) {
    var node = img.parentNode;
    while (node) {
        if ( node.classList.contains("cruize-block") ) {
            break;
        }
        node = node.parentNode;
    }
    return node;
}