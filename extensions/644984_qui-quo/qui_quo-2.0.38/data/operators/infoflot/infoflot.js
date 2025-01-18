var OPERATOR_NAME = "Инфофлот";

// -------- Search Criteria ---------------------------
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

// --------- Rows ---------------------------------

function getCountry(element) {
    var result = element.querySelector(".result-route").textContent.match(/\s*\(([^\)]+)\)\s*–/);
    if ( result ) {
        result = result[1].split(",");
        return result.length > 1 ? result[1] : result[0];
    }
}

function extractNights(element) {
    return element.querySelector("div:last-child").textContent.match(/\d+\/(\d+)/)[1];
}

function extractDate(element) {
    var match = element.querySelector("td nobr").textContent.match(/(\d+)\s*(\S+)\s*(\d{4})/);
    return dateFromDayAndMonthName(match[1], match[2], match[3]);
}

function extractHotelName(element) {
    return element.querySelector("[href*='Ship']").textContent;
}

function extractHotelUrl(element) {
    return element.querySelector("[href*='Ship']").href;
}

function extractRoomType(element) {
    var cIndx = element.parentNode.cellIndex;
    return element.textContent.split(":")[0].trim() + ", " +
            element.parentNode.parentNode.parentNode.parentNode.querySelectorAll("thead td")[cIndx].querySelector("[class$='description']").textContent.replace("(?)", "").trim();
}

function extractPrice(element) {
    return extractIntFromStr(element.textContent.replace(/\s+/g, ''));
}

function extractRegion(element) {
    return getNodeData(".result-route a", element) || getNodeData(".result-route a", element);
}

function createOption(img) {
    var div = img.closest('tr.result');

    var option = {
        checkinDt : extractDate(div),
        nights : extractNights(div),
        hotelName : extractHotelName(div),
        href : extractHotelUrl(div),
        roomType: extractRoomType(img.parentNode.parentNode.parentNode),
        region : extractRegion(div),
        boardType : "",
        price : extractPrice(img.parentNode.parentNode),
        currency : "RUB",
        city_from: "",
        thumbnail: getNodeData('.image-preview', div, 'href')
    };

    return option;
}

function injectData() {
    var rows = document.querySelectorAll(".clearfix .pull-right");
    for ( var i = 0; i < rows.length; ++i ) {
        if ( !rows[i].querySelector(".qq") ) {
            rows[i].appendChild(qqBtns({align: "qq-horizontal"}));
        }
    }
}
