window.OPERATOR_NAME = window.location.host.match(/coral/i) ? "Coral" : "Sunmar";
var OPERATOR_SLETAT_ID = 6;
var address;
var showTopHotelsRating = false;

// -------- Search Criteria ---------------------------

function getCountry() {
    var c = document.querySelector('[data-bind*="location"]');
    if (  c && c.textContent ) {
        return c.textContent.replace(/Месторасположение/i, "").trim();
    }
    return address ? address : "";
}

function getCity() {
    if ( document.querySelector(".onlyHotelOption_hotel_page") ) {
        return "";
    }
    var c = document.querySelector('[data-bind*="departureCityName"]');
    return c ? c.textContent : "";
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function selectOptionalInt(sel) {
    var s = document.querySelector(sel);
    return s ? extractOptionalInt( s.tagName == "SELECT" ? selectedOption(s) : s.value ) : null;
}

function getChildAge(input) {
    var i = document.querySelector(input);
    if ( !i ) {
        return null;
    }
    return i.value.trim();
}

function getOccupancy() {
    var occupancyDiv = document.querySelectorAll(".search-panel_dropdown-menu")[1];
    var occupancy = {
            adultsCount: selectOptionalInt("input[data-bind*='accomodationSelector.adults']"),
            childrenCount: selectOptionalInt("select[data-bind*='accomodationSelector.children']"),
            childAges: null
        };

    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        for ( var i = 0; i < occupancy.childrenCount; ++i ) {
            var input = getChildAge("input[data-bind*='accomodationSelector.childAge" + (i + 1) + "']");
            if ( input === null )
                return null;
            ages.push(input);
        }

        occupancy.childAges = ages.join(",");
    }

    return occupancy;
}

function initializeSearchCriteria() {
    return {
        city: getCity(),
        country: getCountry(),
        occupancy : getOccupancy() };
}


function getSearchButton() {
    return document.querySelector(".btn.search-panel_action-btn");
}


// --------- Rows ---------------------------------

function mapCurrency(c) {
    c = trim(c);
    switch(c.toLowerCase()) {
        case "dollar": return "USD";
        case "euro": return "EUR";
        case "rouble": return "RUB";
    }
    return c;
}

function extractDate(element) {
    var date = element.value.match(/(\d{2}).(\d{2})/);
    return appendYear(date[1],date[2]);
}

function extractHotelName(element) {
    var stars = element.querySelector(".place-heading_stars");
    return element.querySelector(".place-heading_title, .place-heading_title_hotel_page").textContent + ( stars ? " " + stars.getAttribute("data-val") + "*" : "" );
}

function extractHotelHref(element) {
    var a = element.querySelector(".place-heading_link");
    return a ? a.href : "";
}

function extractRegion(text) {
    return text.match(/[^\(]+/)[0];
}

function extractRoomType(element) {
    var text = element.parentNode.parentNode.querySelector(".room_name").textContent;
    var match = text.match(/([^\(]+)(\(.+\))?/);

    var result = "";
    var ad = element.querySelector(".guests_item-icon.__big");
    if ( ad ) {
        ad = ad.parentNode.querySelector(".guests_item-count");
        if ( ad ) {
            result = "взрослые: " + ad.textContent;
        } else {
            result = "взрослые: 1";
        }
    }
    var ch = element.querySelector(".guests_item-icon.__small");
    if ( ch ) {
        ch = ch.parentNode.querySelector(".guests_item-count");
        if ( result ) {
            result += ", ";
        }
        if ( ch ) {
            result += "дети: " + ch.textContent;
        } else {
            result += "дети: 1";
        }
    }

    var roomType = (match ? match[1].trim() : trim(text));
    if ( roomType && result )
    	roomType += " / ";
    if ( result )
    	roomType += result;
    return roomType;

    //return (match ? match[1].trim() : trim(text)) + ( result ? " / " + result : "" );
}

function extractBoardType(element) {
    return element.querySelector('.room_option-name, [data-bind*="name"]').textContent;
}

function extractPrice(row) {
    var priceElement = row.querySelector('.room_option-price, [data-bind*="price"]');
    var match = priceElement.textContent.match(/[^,]+/);
    return extractIntFromStr(match[0].replace(/[^\d]/g, ""));
}

function extractCurrency(row) {
    var currencyElement = row.querySelector(".currency");
    var clss = currencyElement.getAttribute("class");
    var matcher = clss.match(/icon-(.+)/);
    return matcher ? mapCurrency(matcher[1]) : "RUB";
}

function extractNights() {
    return document.querySelector(".sort-filter_value, .sort-filter_value_hotel_page").textContent.match(/\d+/)[0];
}

function createOption(img) {
    var row = img.parentNode.parentNode;
    var hotel = document.querySelector(".place-heading_wrapper");
    var option = {
        checkinDt : extractDate( document.querySelector('[data-bind*="calendar"]') ),
        hotelName : extractHotelName( hotel ),
        href : extractHotelHref( hotel ),
        roomType: extractRoomType( row ),
        boardType : extractBoardType( row ),
        price : extractPrice( row ),
        currency : extractCurrency( row ),
        nights : extractNights(),
        country: SEARCH_CRITERIA.country,
        city_from : SEARCH_CRITERIA.city,
        occupancy : SEARCH_CRITERIA.occupancy,
        thumbnail : extractThumbnail()
    };

    return option;
}

function extractThumbnail() {
	var img = document.querySelector(".promo-slider_nav img[src]");
	return img && img.src ? img.src : null;
}

function createCell() {
    var div = document.createElement("div")
    div.appendChild(createAddButton());
    div.appendChild(createEditButton());
    div.className = "qq";
    div.setAttribute("style", "position: absolute;right: -50px;");  //выглядит не очень красиво, зато гарантированно не будет наползать на текст или другие элементы управления
    return div;
}

function injectData() {
    var searchResults = document.querySelectorAll(".room_option-common, .room_option");
    for ( var i = 0; i < searchResults.length; i++ ) {
        if ( !searchResults[i].classList.contains("qq-check-mutation") ) {
            searchResults[i].classList.toggle("qq-check-mutation");
            addMutationObserver(searchResults[i]);
        }
        if ( !searchResults[i].querySelector(".qq") ) {
            searchResults[i].appendChild(createCell());
        }
    }
    var addressLink = querySelectorAll(document, ".overview_nav-link").find(a => {
        return a.textContent === "Адрес";
    });

    if ( addressLink ) {
        addressLink.click();
        address = document.querySelector(".overview_page.__current").textContent.trim();
    }
}

function addMutationObserver(targetNode) {
    var config = {attributes: false, characterData: true, subtree: true};
    var callback = function (mutationsList) {
        var mainQqElem = targetNode.querySelector("[id*='qq-hash']");
        for (var mutation of mutationsList) {
            if ( mutation.type === 'characterData' && mainQqElem ) {
                mainQqElem.querySelectorAll(".qq .added").forEach(btn => {
                    btn.classList.toggle("added");
                });
                mainQqElem.id = "";
                return;
            }
        }
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
