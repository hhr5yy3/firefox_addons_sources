var OPERATOR_NAME = "Brisco";
var OPERATOR_SLETAT_ID = 79;

// -------- Search Criteria ---------------------------

function getCountry(match, airports) {
    return getDataByCode(match[2], "country", airports);
}

function getCity(match, airports) {
    return getDataByCode(match[1], "region", airports);
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function selectOptionalInt(sel) {
    var s = document.querySelector(sel);
    return s ? extractOptionalInt( s.value ) : null;
}

function getChildAge(input) {
    var i = document.querySelector(input);
    if ( !i ) {
        return null;
    }
    return i.value.trim();
}

function getOccupancy() {
    var occupancy = {
            adultsCount: selectOptionalInt("select#cbAdults"),
            childrenCount: selectOptionalInt("select#cbChilds"),
            childAges: null 
        };

    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        for ( var i = 0; i < occupancy.childrenCount; ++i ) {
            var input = getChildAge("input#childBirth" + (i + 1));
            if ( input === null )
                return null;
            ages.push(input);
        }

        occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function getCurrency(td) {
    var currencyElement = document.querySelector("#cbCurrency") || document.querySelector("#ctl00_ContentPlaceHolder_cbCurrency");
    if ( currencyElement ) {
        return currencyElement.value;
    }
    return null;
}

function initializeSearchCriteria() {
    var currency = getCurrency();
    if ( !currency ) {
        return null;
    }

    return { 
        currency : currency,
        occupancy : getOccupancy()
    };
}


function getSearchButton() {
    var resQs = document.querySelectorAll("input[value='Поиск']");
    var buttons = [];
    for ( var i = 0; i < resQs.length; ++i ) {
        buttons.push(resQs[i]);
    };
    return buttons;
}


// --------- Rows ---------------------------------

function extractDate(tr) {
    return tr.querySelector("[field='CheckInDate']").textContent;
}

function extractHotelName() {
    var bTableRow = document.querySelectorAll("table.datagrid-btable")[1].querySelector(".datagrid-row-selected");
    return bTableRow.querySelector("[field='HotelName']").textContent.trim() +
            " " + bTableRow.querySelector("[field='Stars']").textContent.trim() + "*";
}

function extractRegion(match, airports) {
    return getDataByCode(match[2], "region", airports);
}

function extractRoomType(tr) {
    return tr.querySelector("[field='RoomType']").textContent;
}

function extractBoardType(tr) {
    return tr.querySelector("[field='MealType']").textContent;
}

function extractPrice(tr) {
    return extractIntFromStr(tr.querySelector("[field='TotalPrice']").textContent.match(/\d+/)[0]);    
}

function extractNights(tr) {
    return tr.querySelector("[field='NumberOfNights']").textContent;
}

function getOccupancyWithChildAge(tr) {
    if ( !SEARCH_CRITERIA.occupancy ) {
        return null;
    }
    if ( !SEARCH_CRITERIA.occupancy.childAges || !SEARCH_CRITERIA.occupancy.childrenCount ) {
        return SEARCH_CRITERIA.occupancy;
    }
    var endTourDate = tr.querySelector("[field='CheckOutDate']").textContent.trim();
    var agesOccupancy = SEARCH_CRITERIA.occupancy.childAges.split(",");
    var agesResult = [];
    for ( var i = 0; i < agesOccupancy.length; ++i ) {
        agesResult[i] = ageFromDate(agesOccupancy[i], endTourDate);
    };
    return {
    	adultsCount: SEARCH_CRITERIA.occupancy.adultsCount,
    	childrenCount: SEARCH_CRITERIA.occupancy.childrenCount,
    	childAges: agesResult.join(",")
    };
}

function createOption(img) {
    var tr = img.parentNode.parentNode.parentNode;
    var airports = tr.querySelector("[field='OutFlight']").textContent;
    var cc = airports.match(/([a-z]{3})\s([a-z]{3})/i);

    var option = {
        checkinDt : extractDate(tr),
        hotelName : extractHotelName(),
        href : "",
        region : extractRegion(cc, airports),
        roomType: extractRoomType(tr),
        boardType : extractBoardType(tr),
        price : extractPrice(tr),
        currency : SEARCH_CRITERIA.currency,
        nights : extractNights(tr),
        country: getCountry(cc, airports),
        city_from: getCity(cc, airports),
        occupancy : getOccupancyWithChildAge(tr)
    };

    return option;
}

function createHeaderCell() {
    var newTd = document.createElement("td");
    newTd.className = "qq datagrid-cell-c2-qq"
    var newContent = document.createTextNode("QQ");
    newTd.appendChild(newContent);

    return newTd;
}

function createCell() {
    var nobr = document.createElement("nobr")
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    
    var newTd = document.createElement("td");
    newTd.className = "qq datagrid-cell-c2-qq";
    newTd.appendChild(nobr)
    
    return newTd
}
    
function injectData() {
    var bTable = document.querySelectorAll("table.datagrid-btable");
    if ( bTable.length < 4 ) {
        return;
    }
    if ( !bTable[1].querySelector(".datagrid-row-selected") ) {
        var qqElements = document.querySelectorAll(".qq");
        for ( var i = 0; i < qqElements.length; ++i ) {
            qqElements[i].parentNode.removeChild(qqElements[i]);
        };
        return;
    }
    var hTable = document.querySelectorAll("table.datagrid-htable");
    if ( hTable.length < 4 ) {
        return;
    }
    var headTr = hTable[3].querySelector("tr");

    if ( headTr && headTr.querySelector("td.qq") == null) {
        var tds = headTr.querySelectorAll("td");
        tds[5].querySelector("div span").textContent = "Топливо";
        tds[7].querySelector("div span").textContent = "Питание";
        document.querySelectorAll("style")[1].textContent = 
            '.datagrid-cell-c2-CheckInDate{width:69px}'+
            '.datagrid-cell-c2-CheckOutDate{width:79px}'+
            '.datagrid-cell-c2-RoomType{width:79px}'+
            '.datagrid-cell-c2-NumberOfNights{width:50px}'+
            '.datagrid-cell-c2-TourPrice{width:66px}'+
            '.datagrid-cell-c2-Surcharges{width:50px}'+
            '.datagrid-cell-c2-TotalPrice{width:99px}'+
            '.datagrid-cell-c2-MealType{width:50px}'+
            '.datagrid-cell-c2-OutFlight{width:180px}'+
            '.datagrid-cell-c2-RetFlight{width:180px}'+
            '.datagrid-cell-c2-Availability{width:99px}'+
            '.datagrid-cell-c2-qq{width:47px}';
        headTr.appendChild(createHeaderCell());
    }

    var bTable = document.querySelectorAll("table.datagrid-btable");
    if ( bTable.length < 4 ) {
        return;
    }
    var bodyTrs = bTable[3].querySelectorAll("tr");

    for ( var i = 0; i < bodyTrs.length; ++i ) {  
        if ( bodyTrs[i].querySelector("td.qq") == null && bodyTrs[i].querySelector("[field='CheckInDate']").textContent != "" ) {
            bodyTrs[i].appendChild(createCell());
        }
    }
}

