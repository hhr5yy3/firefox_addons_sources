var OPERATOR_NAME = "Anex";
var showTopHotelsRating = true;
let currentSearchPanel ;
function initializeSearchCriteria() {
    var city = getElementByAngularAttribute(document, "ng-model", "HSSelectedRegion");
    var region =  document.querySelector("#smartSearch");
    let searchDates = [...new Set(getNodeProperty((currentSearchPanel || document).querySelector('#hotel-flight-days, #flight-days'), '').match(getRegexPatterns().date))];
    if ( searchDates && searchDates.length === 1 ) {
         searchDates = searchDates[0];
    }  else {
        searchDates = null;
    }
    return {
        city: city ? city.textContent.replace("Выбрать регион", "").trim() : null,
        region: region ? region.placeholder : '',
        date: searchDates
    };
}

function getSearchButton() {
    const btns = $$(".search-button");
    btns.forEach(btn => {
        btn.addEventListener('click', ()=> {
           currentSearchPanel = btn.closest("#hotel-search-panel, #mini-search");
        })
    });
    return btns;
}

function injectData() {
    querySelectorAll(document, ".search-result-table .td-price").forEach(td => {
        if (!td.querySelector(".qq")) {
            if ( extractDate(td)) {
                td.append(createCell(createOption));
            }
        }
    });
    querySelectorAll(document, ".hotel-search-room-list .btn-buy-agency").forEach(a => {
        if ( !a.parentNode.querySelector(".qq") ) {
            if ( extractDate(a) ) {
                a.before(createCell(createTourOption));
            }
        }
    });
}

function extractDate(item) {
    const row = getHotelRowByImage(item);
    const date = getNodeProperty(row.querySelector('[ng-bind*="price.CheckIn"], [ng-bind*="item.CheckIn"], [ng-bind*="price.hotelCheckIn"]'), '');
    if ( (!date || !date.match(getRegexPatterns().date)) && !SEARCH_CRITERIA.date ) {
        return null;
    }
    return String((date.match(getRegexPatterns().date) || '')) || SEARCH_CRITERIA.date;

}

function createCell(action) {
    return qqBtns({align: "horizontal"}, action);
}

function createOption(img) {
    var row = getHotelRowByImage(img);
    var option = {
        checkinDt: extractDate(img),
        nights: getElementByAngularAttribute(row, "ng-bind", "price.Nights").textContent.trim(),
        hotelName: getHotelName(row, "price.HotelName", "price.StarName"),
        href: getUrl(row),
        roomType: getRoomType(row, "price"),
        region: getElementByAngularAttribute(row, "ng-bind","price.RegionName").textContent.trim(),
        boardType: getBoardType(row, "price"),
        price: extractIntFromStr(row.querySelector(".price-text").textContent.replace(" ", "")),
        currency: getElementByAngularAttribute(document, "ng-model", "CurrencySelected").textContent.trim(),
        country:  getElementByAngularAttribute(row, "ng-bind", "searchState.Name").textContent.trim(),
        city_from:  getElementByAngularAttribute(document, "ng-model", "searchRegionsSelected").textContent.replace("Выбрать регион", "").trim(),
        thumbnail: getImg(row),
    };
    console.log(option);
    return option;
}


function createTourOption(img) {
    var row = getHotelRowByImage(img);
    var option = {
        checkinDt: extractDate(img),
        nights: getElementByAngularAttribute(row, "ng-bind", "item.Nights").textContent.trim(),
        hotelName:  getTourHotelName(),
        href: window.location.href,
        roomType: getRoomType(row, "item"),
        region:  getTourRegion(),
        boardType: getBoardType(row, "item"),
        price: extractIntFromStr(getElementByAngularAttribute(row, "class", "hs-price").textContent.replace(" ", "")),
        currency: getElementByAngularAttribute(document, "ng-model", "HotelSearchCurrency").textContent.trim(),
        country: "",
        city_from: SEARCH_CRITERIA.city,
        thumbnail: getTourImg(),
    };
    return option;
}

function getHotelName(row, selHotel, selStars) {
    var name = getElementByAngularAttribute(row, "ng-bind", selHotel).textContent.trim();
    var stars = getElementByAngularAttribute(row, "ng-bind", selStars);
    return stars ? [name, stars.textContent.trim()].join(" ") : name;
}

function getTourRegion() {
    var flag = document.querySelector(".flag32");
    var region = flag ? flag.parentNode.textContent.split("-").map( elem => { return elem.trim() }).join(", ") : SEARCH_CRITERIA.region;
    return region;
}

function getUrl(row) {
    var a = row.querySelector("a.search-hotel-name");
    return a ? a.href : null;
}

function getRoomType(row, prefix) {
    var roomType = getElementByAngularAttribute(row, "ng-bind", `${prefix}.RoomName`);
    var placeName = getElementByAngularAttribute(row, "ng-bind", `${prefix}.HtPlaceName`).textContent.trim();
    var panel = row.closest(".panel-body");
    roomType = roomType ? roomType : ( panel ? panel.querySelector(".hs-room-name") : document.querySelector(".hs-room-name") );
    return roomType ? [roomType.textContent.trim(), placeName].join(", ") : placeName;
}

function getTourHotelName() {
    var name = getHotelName(document, "HotelDetail[0].info.name", "undefinedselector");
    var stars =  document.querySelector(".hotel-header").textContent.trim().match(/\d\s*\*+/);
    return stars ? [name, stars[0]].join(" ") : name;
}

function getBoardType(row, prefix) {
    var boardCode = getElementByAngularAttribute(row, "ng-bind", `${prefix}.MealName`);
    var boardText = boardCode.parentNode.getAttribute("uib-tooltip");
    boardText = boardText ? boardText : boardCode.nextElementSibling.getAttribute("uib-tooltip");
    return boardText ? [boardCode.textContent.trim(),boardText].join(", ") : boardCode.textContent.trim();
}

function getElementByAngularAttribute(row, attr, sel) {
    return row.querySelector(`[${attr}*='${sel}']`);
}

function getCurrency(sel) {
    return document.querySelector(`[ng-model*='${sel}']`).textContent.trim();
}

function getImg(row){
    var image = row.querySelector(".search-hotel-image");
    return image ? image.style.backgroundImage.slice(5, -2).split("?")[0] : null;
}

function getTourImg() {
    var image = document.querySelector("#hotel-gallery a");
    return image ? image.href : null;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (true) {
        if ( div.classList.contains("hotel-search-room-list") || div.classList.contains("panel-default") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
