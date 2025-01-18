var OPERATOR_NAME = "Тари Тур";

function initializeSearchCriteria() {
    var city = selectedOption(document.querySelector("#tour_city"));
    return {
        city : city
    };
}

function getSearchButton() {
    return document.querySelector("#button_search_tour a");
}

function injectData() {
    querySelectorAll(document, "#searchresult tr[data-item='sort']").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createCell());
        }
    });
    var head = document.querySelector("#searchresult thead tr");
    if (head && !head.querySelector(".qq") ) {
        head.append(createHeadCell())
    }
}

function createCell() {
    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.append(createAddButton());
    newTd.append(createEditButton());
    return newTd;
}

function createHeadCell() {
    var newTh = document.createElement("th");
    newTh.className = "qq";
    newTh.append(document.createTextNode("QQ"));
    return newTh;
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var option = {
        checkinDt: getCellText(tr, "tourDate"),
        nights: getCellText(tr, "nights"),
        hotelName: getCellText(tr, "hn") + getStars(tr),
        href: getUrl(tr),
        roomType: getCellText(tr, "roomTypeName"),
        region: SEARCH_CRITERIA.city,
        boardType: "Тур: " + getCellText(tr, "tn"),
        price: extractIntFromStr(getCellText(tr, "price")),
        currency: mapCurrency(getCellText(tr, "price")),
        country: "Россия",
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: true,
        thumbnail:null,
        occupancy: null
    };
    return option;
}

function getCellText(tr, dataname) {
    return tr.querySelector(`td[data-orderby=${dataname}]`).textContent.trim();
}

function getUrl(tr) {
    var a = tr.querySelector(`td[data-orderby=hn] a, td[data-orderby=hn] a`);
    return a ? a.href : null;
}

function  getStars(tr) {
    var stars =  tr.querySelector(`td[data-orderby=hn] .use_sprites_stars`).className.match(/stars(\d+)/);
    return stars ? " " + stars[1] + "*" : "";
}

function mapCurrency(price) {
    var priceText = price.replace(/\d+|\s+|\./g,"");
    switch (priceText) {
        case "€" : return "EUR";
        case "$" : return "USD";
        case "руб" : return "RUB";
        default : return priceText;
    }
}

function getHotelRowByImage(img) {
    var elem = img.parentNode;
    while (elem) {
        if ( elem.tagName === "TR" ) {
            break;
        }
        elem = elem.parentNode
    }
    return elem;
}
