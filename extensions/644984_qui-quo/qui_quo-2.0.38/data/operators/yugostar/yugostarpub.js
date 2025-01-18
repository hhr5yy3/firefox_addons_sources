var OPERATOR_NAME = "Юго-Стар";

// -------- Search Criteria ---------------------------

function getCountry() {
    return selectedOption(document.querySelector("#countries"));
}

function getCity() {
    return selectedOption(document.querySelector("#cityFrom"));
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function selectOptionalInt(sel) {
    var s = document.querySelector(sel);
    return s ? extractOptionalInt( s.textContent ) : null;
}

function getChildAge(text) {
    var match = text.match(/\d+/);
    return match ? match[0] : null;
}

function getOccupancy() {
    var occupancy = {
            adultsCount: selectOptionalInt(".adult-count"),
            childrenCount: document.querySelectorAll(".selected-child-age").length,
            childAges: null 
        };

    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        var ageInputs = document.querySelectorAll(".selected-child-age");
        for ( var i = 0; i < occupancy.childrenCount; ++i ) {
            var input = getChildAge(ageInputs[i].textContent);
            if ( input === null )
                return null;
            ages.push(input);
        }

        occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function getPagingMode() {
	var el = document.querySelector("#pagingMode-styler .jq-selectbox__select-text");
    return el ? el.textContent : null;
}

function initializeSearchCriteria() {
    var country = getCountry();
    var city = getCity();
    var pagingMode = getPagingMode();
    if ( !country || !city || !pagingMode )
        return null;

    return { country : country,
             city : city,
             occupancy : getOccupancy(),
             pagingMode : pagingMode };
}


function getSearchButton() {
    return document.querySelector("#btnSearch");
}


// --------- Rows ---------------------------------

function mapCurrency(c) {
    c = trim(c);
    switch(c.toLowerCase()) {
        case "$": return "USD";
        case "€": return "EUR";
        case "р": return "RUB";
    }
    return c;
}

function extractDate(td) {
    return td.textContent;
}

function extractHotelName(td, tdS) {
    var result = "";
    if ( tdS ) {
        result = trim(td.textContent) + " " + trim(tdS.textContent);
    } else {
        var stars = trim(td.querySelector(".spos_name .hotel_cat em").textContent);
        result = trim(td.querySelector(".spos_name").textContent).replace(new RegExp(stars), "") + " " + stars.replace(/stars?/, "*").replace(/\s/g, "");
    }
    var starsMatch = result.match(/\d+\*/g);
    if ( starsMatch && starsMatch.length > 1 ) {
        result = result.replace(/\d+\*/, "");
    }
    return result;
}

function extractHotelHref(td) {
    var a = td.querySelector(".spos_name a");
    return a ? a.href : "";
}

function extractRegion(td) {
    return td.querySelector(".spos_info li").textContent.trim().split(/,/)[0];
}

function extractRoomType(td1, td2) {
    return td1.textContent.trim() + " / " + td2.textContent.trim();
}

function extractBoardType(td) {
    return td.textContent;
}

function extractPrice(td) {
    return extractIntFromStr(td.textContent.replace(/[^\d]/g, ""));    
}

function extractCurrency(td) {
    return mapCurrency(td.textContent.replace(/\d/g, ""));    
}

function extractNights(td) {
    return td.textContent;
}

function createOption(img) {
    var tds = img.parentNode.parentNode.parentNode.querySelectorAll("td");
    var div = img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

    var option = {
        checkinDt : extractDate(tds[0]),
        hotelName : extractHotelName(div),
        href : extractHotelHref(div),
        region : extractRegion(div),
        roomType: extractRoomType(tds[3], tds[4]),
        boardType : extractBoardType(tds[2]),
        price : extractPrice(tds[6]),
        currency : extractCurrency(tds[6]),
        nights : extractNights(tds[1]),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        occupancy : SEARCH_CRITERIA.occupancy
    };

    return option;
}

function extractDateMain(ul) {
    return ul.querySelectorAll("li")[2].textContent.match(/\d{2}\.\d{2}\.\d{4}/)[0];
}

function extractRoomTypeMain(uls) {
    return uls[0].querySelector("span").textContent.trim() + " / " + uls[1].querySelector("span").textContent.trim();
}

function extractBoardTypeMain(ul) {
    return ul.querySelectorAll("li")[1].textContent;
}

function extractNightsMain(ul) {
    return ul.querySelectorAll("li")[2].textContent.match(/(\d+)\sНОЧ/i)[1];
}

function createOptionMain(img) {
    var div = img.parentNode.parentNode.parentNode.parentNode.parentNode;
    var uls = div.querySelectorAll("ul.reset");
    var pac = div.querySelector(".spos_price");

    var option = {
        checkinDt : extractDateMain(uls[0]),
        hotelName : extractHotelName(div),
        href : extractHotelHref(div),
        region : extractRegion(div),
        roomType: extractRoomTypeMain(uls),
        boardType : extractBoardTypeMain(uls[1]),
        price : extractPrice(pac),
        currency : extractCurrency(pac),
        nights : extractNightsMain(uls[0]),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        occupancy : SEARCH_CRITERIA.occupancy
    };

    return option;
}

function createHeaderCell() {
    var newTh = document.createElement("th");
    newTh.className = "qq"
    var newContent = document.createTextNode("QQ");
    newTh.appendChild(newContent);

    return newTh;
}

function createCell(f) {
    var nobr = document.createElement("nobr")
    nobr.appendChild(createAddButton(f));
    nobr.appendChild(createEditButton(f));
    
    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.appendChild(nobr)
    
    return newTd
}

var errorCount = 0;
function injectData() {
    var divs = document.querySelectorAll(".spos_price");
    var tbl = document.querySelector(".tbl1");
    if ( !SEARCH_CRITERIA && ( divs.length > 0 || tbl ) ) {
        errorCount++;
        if ( errorCount == 5 ) {
            var log = "";
            log += getCountry() || "null";
            log += " | ";
            log += getCity() || "null";
            log += " | ";
            log += getPagingMode() || "null";
            console.log(log);
            setTimeout(function() {
                logError("no SEARCH_CRITERIA", null, log);           
            }, 10);
        }
        return;
    }

    if ( SEARCH_CRITERIA && /ПО\sОТЕЛЯМ/i.test(SEARCH_CRITERIA.pagingMode) ) {
        for ( var i = 0; i < divs.length; ++i ) {
            if ( !divs[i].querySelector(".qq") ) {
                divs[i].appendChild(createCell(createOptionMain));
            }
        }

        var tbls = document.querySelectorAll(".tbl");

        for ( var i = 0; i < tbls.length; ++i ) {
            var headTr = tbls[i].querySelector("thead tr");
            if ( headTr && !headTr.querySelector(".qq") ) {
                headTr.appendChild(createHeaderCell());
            }

            var bodyTrs = tbls[i].querySelectorAll("tbody tr");
            for ( var j = 0; j < bodyTrs.length; ++j ) {  
                if ( bodyTrs[j].querySelectorAll("td").length > 4 && !bodyTrs[j].querySelector("td.qq") ) {
                    bodyTrs[j].appendChild(createCell());
                }
            }
        };
    }
    if ( SEARCH_CRITERIA && /БЕЗ\sГРУППИРОВКИ/i.test(SEARCH_CRITERIA.pagingMode) ) {
        if ( tbl ) {
            var headTr = tbl.querySelector("thead tr");
            if ( headTr && !headTr.querySelector(".qq") ) {
                headTr.appendChild(createHeaderCell(createOptionTable));
            }

            var bodyTrs = tbl.querySelectorAll("tbody tr");
            for ( var j = 0; j < bodyTrs.length; ++j ) {  
                if ( bodyTrs[j].querySelectorAll("td").length > 4 && !bodyTrs[j].querySelector("td.qq") ) {
                    bodyTrs[j].appendChild(createCell(createOptionTable));
                }
            }
        }
    }
}

// -------- Table ---------------------------

function extractRegionTable(td) {
    return td.textContent;
}

function createOptionTable(img) {
    var tds = img.parentNode.parentNode.parentNode.querySelectorAll("td");
    var div = img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

    var option = {
        checkinDt : extractDate(tds[0]),
        hotelName : extractHotelName(tds[3], tds[4]),
        href : extractHotelHref(tds[4]),
        region : extractRegionTable(tds[2]),
        roomType: extractRoomType(tds[5], tds[6]),
        boardType : extractBoardType(tds[7]),
        price : extractPrice(tds[8]),
        currency : extractCurrency(tds[8]),
        nights : extractNights(tds[1]),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        occupancy : SEARCH_CRITERIA.occupancy
    };

    return option;
}