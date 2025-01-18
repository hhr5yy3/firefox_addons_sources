var OPERATOR_NAME = "all4tur";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    querySelectorAll(document, ".b-camps__camp").forEach(function (div) {
        if ( !div.querySelector(".qq") ) {
            div.insertBefore(createCell(), div.querySelector(".b-camps__title"));
        }
    });
    querySelectorAll(document, ".news-item").forEach(function (div) {
        if ( !div.querySelector(".qq") ) {
            div.querySelector("h2").parentNode.appendChild(createCell());
        }
    });
}

function createCell() {
    var newDiv = document.createElement("div");
    var add = createAddButton();
    var edit = createEditButton();
    add.style = "width:22px; height:21px; margin:0;cursor: pointer !important ";
    edit.style = "width:24px; height:21px; margin:0; cursor: pointer  !important";
    newDiv.appendChild(add);
    newDiv.appendChild(edit);
    newDiv.className = "qq";
    newDiv.style = "float:right;padding-left:5px ";
    return newDiv;
}

function createOption(img) {
    var card = getHotelRowByImage(img);
    var option = {
        checkinDt: "01.01.1970",
        nights: "0",
        hotelName: getHotelName(card),
        href: getURL(card),
        roomType: "",
        region: getRegion(card),
        boardType: "",
        price: getPrice(card),
        currency: mapCurrency(card),
        country: "",
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getImg(card),
        occupancy: null,
        excursion: true
    }
    return option;
}

function getHotelName(card) {
    var title = card.querySelector(".b-camps__title");
    title = title ? title : card.querySelector("a");
    return title.textContent.trim();
}

function getURL(card) {
    var a = card.querySelector(".b-camps__title a");
    a = a ? a : card.querySelector("a");
    return a ? a.href : null;
}

function getRegion(card) {
    var region = card.querySelector(".b-camps__location");
    return region ? region.textContent.replace(region.querySelector("b").textContent, "") : card.querySelector("div").textContent;
}

function getPrice(card) {
    var price = card.querySelector(".price-to");
    return price ? extractIntFromStr(price.textContent.replace(/\D+/g, "")) : extractOptionalInt(card.querySelector("h2").textContent.replace(/\D+/g, ""));
}

function mapCurrency(card) {
    var price = card.querySelector(".price-to");
    price = price ? price : card.querySelector("h2");
    var text = price.textContent.match(/от.([\d\s]+)([^\s\.]*)/);
    if ( text && text.length > 2 ) {
        switch (text[2]) {
            case "€": return "EUR";
            case "руб": return "RUB";
            case "$": return "USD";
            default: return text[2];
        }
    }
}

function getImg(card) {
    var image = card.querySelector(".b-camps__title");
    return image ? image.nextElementSibling.src : card.querySelector("img").src;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (true) {
        if ( div.className === "news-item" || div.className === "b-camps__camp" ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
