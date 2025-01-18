var OPERATOR_NAME = "Bell Company";

// -------- Search Criteria ---------------------------

function getCountry() {
    return selectedOption(document.querySelector("#SearchFormModel_direction"));
}

function getCity() {
    return selectedOption(document.querySelector("#SearchFormModel_cityFrom"));
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function selectOptionalInt(sel) {
    var s = document.querySelector(sel);
    return s ? extractOptionalInt( s.value ) : null;
}

function getChildAge(text) {
    var match = text.match(/\d+/);
    return match ? match[0] : null;
}

function getOccupancy() {
    var occupancy = {
            adultsCount: selectOptionalInt("select#SearchFormModel_cntAdult"),
            childrenCount: selectOptionalInt("select#SearchFormModel_cntChild"),
            childAges: null 
        };

    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        var ageInputs = document.querySelectorAll(".fld_child_age");
        for ( var i = 0; i < occupancy.childrenCount; ++i ) {
            var input = getChildAge(ageInputs[i].value);
            if ( input === null )
                return null;
            ages.push(input);
        }

        occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function initializeSearchCriteria() {
    return { occupancy : getOccupancy() };
}


function getSearchButton() {
    return document.querySelector("#run_search");
}


// --------- Rows ---------------------------------

function extractDate(td) {
    return td.textContent;
}

function extractHotelName(td) {
    var match = td.textContent.match(/[^\(]+/);
    return match[0];
}

function extractHotelHref(td) {
    var a = td.querySelector("a");
    return a ? a.href : "";
}

function extractRegion(td) {
    var match = td.textContent.trim().match(/\((.+)\)$/);
    return match[1];
}

function extractRoomType(td) {
    return td.textContent;
}

function extractBoardType(td) {
    return td.textContent;
}

function extractPrice(td) {
    return extractIntFromStr(td.textContent.replace(/[^\d]/g, ""));    
}

function extractCurrency(td) {
    return td.textContent.replace(/\d/g, "");    
}

function extractNights(td) {
    return td.textContent;
}

function createOption(img) {
    var tds = img.parentNode.parentNode.parentNode.querySelectorAll("td");

    var option = {
        checkinDt : extractDate(tds[0]),
        hotelName : extractHotelName(tds[2]),
        href : extractHotelHref(tds[2]),
        region : extractRegion(tds[2]),
        roomType: extractRoomType(tds[3]),
        boardType : extractBoardType(tds[4]),
        price : extractPrice(tds[6]),
        currency : extractCurrency(tds[6]),
        nights : extractNights(tds[1]),
        country: getCountry(),
        city_from: getCity(),
        occupancy : SEARCH_CRITERIA.occupancy
    };

    return option;
}

function createHeaderCell() {
    var newTd = document.createElement("td");
    newTd.className = "qq"
    var newContent = document.createTextNode("QQ");
    newTd.appendChild(newContent);

    return newTd;
}

function createCell() {
    var nobr = document.createElement("nobr")
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    
    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.appendChild(nobr)
    
    return newTd
}
    
function injectData() {
    var headTr = document.querySelector(".result_header");
    if ( headTr && !headTr.querySelector(".qq") ) {
        headTr.appendChild(createHeaderCell());
    }

    var bodyTrs = document.querySelectorAll(".result_row");
    for ( var i = 0; i < bodyTrs.length; ++i ) {  
        if ( !bodyTrs[i].querySelector("td.qq") ) {
            bodyTrs[i].appendChild(createCell());
        }
    }
}

