var OPERATOR_NAME = "Diamond Tours";
var OPERATOR_SLETAT_ID = 39;
var QQ_COL_WIDTH = "45px"; 

// -------- Search Criteria ---------------------------

function getCountry() {
    var c = document.querySelector("a[title=to]>.selectBox-label");
    if ( c == null ) {
        console.log("country selector is not found");
        return null;
    }
    
    return c.textContent;
}

function getCityFrom() {
    var cF = document.querySelector("a[title=from]>.selectBox-label");
    if ( cF == null ) {
        console.log("cityFrom selector is not found");
        return null;
    }

    return cF.textContent;
}

function initializeSearchCriteria() {
    return {
        country: getCountry(),
        cityFrom: getCityFrom()
    };
}

function getSearchButton() {
    return document.querySelector("#search");
}

// --------- Rows ---------------------------------

function extractNights(td) {
    return td.textContent.trim();
}

function extractDate(td) {
    return td.textContent.trim();
}

function extractHotelName(td) {
    var result = "";
    var trs = td.querySelectorAll("tr");

    if (trs.length < 2)
        return trs[0].querySelectorAll("td")[1].textContent.split("*")[0] + "*";

    for ( var i = 0; i < trs.length; i++ ) {
        var tds = trs[i].querySelectorAll("td");
        result += tds[1].textContent.split("*")[0] + "* " + tds[0].textContent + "н";
        if (i < trs.length - 1)
            result += ", ";
    }

    return result;
}

function extractHotelUrl(td) {
    var aElement = td.querySelector("a");
    return aElement == null ? "" : aElement.href;
}

function extractRoomType(tdR, tdH) {
    var result = "";

    var tdsR = tdR.querySelectorAll("td");
    var tdsH = tdH.querySelectorAll("tr");
    if ( tdsR.length < 1)
        result = tdR.textContent.trim().split(/\sВ\s/)[0].trim() + " / " + tdH.querySelector(".subsidiary").textContent;
    else {
        for ( var i = 0; i < tdsR.length; i++) {
            result += tdsR[i].textContent.trim().split(/\sВ\s/)[0].trim() + " / " + tdsH[i].querySelectorAll(".subsidiary")[0].textContent;
            if (i < tdsR.length - 1)
                result += ", ";;
        }
    }

    return result; 
}

function extractRegion(td) {
    return td.textContent;
}

function extractBoardType(td) {
    var result = "";

    var tds = td.querySelectorAll("td");
    if ( tds.length < 1 )
        result = td.querySelector(".prompt").textContent;
    else {
        for ( var i = 0; i < tds.length; i++) {
            result += tds[0].querySelector(".prompt").textContent;
            if (i < tds.length - 1)
                result += ", ";;
        }
    }

    return result; 
}

function extractDataPriceCurrency(td) {
    if (td.querySelector(".price.rub").offsetParent === null)
        return td.querySelector(".price.usd").textContent;
    else
        return td.querySelector(".price.rub").textContent;
}

function extractPrice(text) {
    return extractIntFromStr(text);
}

function extractCurrency(text) {
    return text.split(/\s/)[1];
}

function extractCityFrom(td) {
    if (td.textContent == "без авиа")
        return "";
    else
        return SEARCH_CRITERIA.cityFrom;
}

function createOption(img) {
    var tds = getChildElementsByTagName(img.parentNode.parentNode, "td");
    
    var tdsArray = [];
    for (i = 0; i < tds.length; i++)
        tdsArray.push(tds[i]);
    tds = tdsArray;

    for ( var i = 0; i < tds.length; i++ ) {
        if (i >= tds.length)
            break;

        if (tds[i].parentNode.parentNode.parentNode.className == "inner" || tds[i].parentNode.parentNode.parentNode.className == "inner hotel") {
            tds.splice(i, 1);
            i--;
        }
    }
    
    var option;
    option = {
        checkinDt : extractDate(tds[0]),
        nights : extractNights(tds[1]),
        hotelName : extractHotelName(tds[4]),
        href : extractHotelUrl(tds[4]),
        roomType: extractRoomType(tds[5], tds[4]),
        region : extractRegion(tds[2]),
        boardType : extractBoardType(tds[6]),
        price : extractPrice(extractDataPriceCurrency(tds[7])),
        currency : extractCurrency(extractDataPriceCurrency(tds[7])),
        country: SEARCH_CRITERIA.country,
        city_from: extractCityFrom(tds[tds.length - 2])
    };

    return option
}

function setColWidth() {
    if ( document.querySelector(".qqm") )
        return;

    var tblH = document.querySelector("#headerTableSearch>colgroup");
    var colH = document.createElement("col");
    colH.setAttribute("class", "qqm");
    colH.setAttribute("width", QQ_COL_WIDTH);
    tblH.appendChild(colH);

    var tblH1 = document.querySelectorAll("#headerTableSearch>colgroup>col");
    tblH1[4].width = parseInt(tblH1[4].width) - parseInt(QQ_COL_WIDTH) + "px";

    var tblR1 = document.querySelectorAll("#searchResult>colgroup>col");
    tblR1[4].width = parseInt(tblR1[4].width) - parseInt(QQ_COL_WIDTH) + "px";
}

function createHeaderCell() {
    setColWidth();

    var th = document.createElement("th");
    th.className = "title qq";
    th.appendChild(document.createTextNode("QQ"));
    return th;
}

function createButtons() {
    var td = document.createElement("td");
    td.className = "qq";
    td.appendChild(createAddButton());
    td.appendChild(createEditButton());
    
    return td;
}

function injectData() {
    var header = document.querySelector("#headerTableSearch>tbody>tr");
    if ( header != null && header.querySelector("th.qq") == null ) {
        header.appendChild(createHeaderCell());
    }

    var rows = document.querySelectorAll("#searchResult>tbody>tr");
    for ( var i = 0; i < rows.length; i++ ) {
        if ( rows[i].querySelector("td.qq") == null ) {
            var tds = getChildElementsByTagName(rows[i], "td");
            if ( tds.length > 6 ) {
                rows[i].appendChild(createButtons());
            }
        }
    }
}