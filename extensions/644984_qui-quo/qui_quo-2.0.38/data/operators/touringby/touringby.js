var OPERATOR_NAME = "Touring.by";


var OPERATOR_CURRENCY = "touringby";
var DEFAULT_CURRENCY = "BYN";

function getTable() {
    return document.querySelector("table#ctl00_SearchResultContent_gvwSrchRes_DXMainTable");
}

//-------- Search Criteria ---------------------------

function getCountry() {
    return selectedOption(document.querySelector("select[id$='_ddlCountriesTo']"));
}

function getCity() {
    return selectedOption(document.querySelector("select[id$='_ddlCitiesFrom']"));
}

function getOperator() {
    var operator = selectedOption(document.querySelector("select[id$='_ddlTo']"));

    if ( !operator ) {
        var img = document.querySelector("div.Header div.logo a img");
        if ( !img ) {
            return null;
        }
        var match = img.src.match(/([^\/]*)THEME\//i);
        operator = match ? match[1] : "";
    }

    return /=ОПЕРАТОР=/i.test(operator) ? "" : operator;
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function selectOptionalInt(sel) {
    var s = document.querySelector(sel);
    return s ? extractOptionalInt( s.tagName == "INPUT" ? s.value : selectedOption(s) ) : null;
}

function getOccupancy() {
    var occupancy = {
            adultsCount: selectOptionalInt("select#ctl00_mainContent_ddlNumParents"),
            childrenCount: selectOptionalInt("select#ctl00_mainContent_ddlNumChild"),
            childAges: null 
        };

    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        for ( var i = 0; i < occupancy.childrenCount; ++i ) {
            var input = selectOptionalInt("input#ctl00_mainContent_tbYear" + (i + 1));
            if ( input === null )
                continue;
            ages.push(input);
        }

        occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function initializeSearchCriteria() {
    var country = getCountry();
    if ( !country ) {
        return null;
    }

    var city = getCity();
    if ( !city ) {
        return null;
    }

    return { country : country,
             city : city,
             operator : getOperator(),
             occupancy : getOccupancy() };
}

function getSearchButton() {
    return document.querySelector("a.search_button");
}

// --------- Rows ---------------------------------

function extractDate(td) {
    return makeYear4Digits(td.textContent.trim());
}

function extractHotelName(td) {
    return td.textContent.trim();
}

function extractHotelUrl(td) {
    var a = td.querySelector("a");
    return a ? a.href : "";
}

function extractRegion(td) {
    return td.textContent.trim();
}

function extractRoomType(td) {
    return td.textContent.trim().split(/\n/).map(function(s) {
                return s.trim().replace(/\//g, ", "); 
            }).filter(function(s) { return s != ""; }).join(" / ");
}

function getPrCurSelector() {
    return isPrefferedDefaultCurrency() ? "span[id$='_lblFullCost']" : "span[id$='_Label11']";
}

function extractPrice(td) {
    return extractIntFromStr(td.querySelector(getPrCurSelector()).textContent.replace(/[^\d]/g, ""));
}

function extractCurrency(td) {
    return td.querySelector(getPrCurSelector()).textContent.replace(/[\s\d]/g, "");
}

function extractNights(td) {
    return td.textContent.trim();
}

function extractBoardType(td) {
    return trim(td.textContent);
}

function createOption(img) {
    var tds = img.parentNode.parentNode.parentNode.querySelectorAll("td");
    var offset = 0;
    if ( tds.length != 18 ) {
        offset = 18 - tds.length;
    }

    var option = {
        checkinDt : extractDate( tds[2] ),
        hotelName : extractHotelName( tds[6 - offset] ),
        href : extractHotelUrl( tds[6 - offset] ),
        region : extractRegion( tds[5 - offset] ),
        roomType: extractRoomType( tds[7 - offset] ),
        boardType : extractBoardType( tds[8 - offset] ),
        price : extractPrice( tds[10 - offset] ),
        currency : extractCurrency( tds[10 - offset] ),
        nights : extractNights( tds[4 - offset] ),
        country : SEARCH_CRITERIA.country,
        city_from : SEARCH_CRITERIA.city,
        occupancy : SEARCH_CRITERIA.occupancy,
        operator : SEARCH_CRITERIA.operator ? OPERATOR_NAME + " / " + SEARCH_CRITERIA.operator : OPERATOR_NAME
    };

    return option;
}

function createHeaderCell() {
    var td = document.createElement("td");
    td.className = "qq";
    td.setAttribute("style", "text-align:center;background-color: #94B6E8;border-top-width:0px;border-left-width:0px;border-right-width:0px;border-left: 1px solid #4f93e3");
    td.appendChild(document.createTextNode("QQ"));
    
    return td;
}

function createCell(rowspan) {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());

    var td = document.createElement("td");
    td.className = "qq dxgv";
    td.appendChild(nobr);
    td.setAttribute("style", "border-left: 1px solid #bfd3ee;");
    return td;
}

function injectData() {
    injectCurrencySelection();
    var table = getTable();
    if ( !table ) {
        return;
    }

    var trs = document.querySelectorAll("table#ctl00_SearchResultContent_gvwSrchRes_DXMainTable > tbody > tr");
    if ( trs.length > 0 && !trs[0].querySelector("td.qq") ) {
        trs[0].appendChild(createHeaderCell());
    }

    for ( var i = 1; i < trs.length; ++i ) {
        if ( !trs[i].querySelector("td.qq") && getChildElementsByTagName(trs[i], "td").length > 10 ) {
            trs[i].appendChild(createCell());
        }
    };
}

function injectCurrencySelection() {
    if( document.querySelector("#qq-currency") ) {
        return;
    }
    var submit = document.querySelector("div[id$='_UPanSearchRes']");
    if ( !submit ) {
        return;
    }
    addCurrencySelection(submit);
    addAddonMessageListener("touringby currency", function(currency) {
        document.querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
        document.querySelector("#qq-currency").setAttribute("style", "margin-top: 10px; cursor: default;");
    });
    sendMessageToAddon("get operator currency", OPERATOR_CURRENCY);
}

function isPrefferedDefaultCurrency() {
    var sel = document.querySelector("#qq-currency select");
    return !sel || sel.value != "USDEUR";
}


function addCurrencySelection(submit) {
    var div = document.createElement("div");
    div.id = "qq-currency";
    div.className = "b-pfs3 dxgvHeader_Office2003Blue";
    div.setAttribute("style", "margin-top: 10px; cursor: default;")
    
    var legend = document.createElement("legend");
    legend.setAttribute("style", "width:auto;float:left;margin-right:6px;");
    legend.innerHTML = "Выберите предпочитаемую валюту для <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo:";
    div.appendChild(legend);
    
    var select = document.createElement("select");
    select.setAttribute("style", "margin-top:-3px;");
    select.onchange = function () {
        sendMessageToAddon("set operator currency", {operator: OPERATOR_CURRENCY, currency: select.value});
    };
    
    var defaultCurr = document.createElement("option");
    defaultCurr.value = DEFAULT_CURRENCY;
    defaultCurr.textContent = DEFAULT_CURRENCY;
    select.appendChild(defaultCurr);
    
    var foreign = document.createElement("option");
    foreign.value = "USDEUR";
    foreign.textContent = "USD / EUR";
    select.appendChild(foreign);

    div.appendChild(select);
    
    submit.parentElement.insertBefore(div, submit);
}