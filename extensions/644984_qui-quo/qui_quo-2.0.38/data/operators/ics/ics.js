var OPERATOR_NAME = "ICS";
var OPERATOR_SLETAT_ID = 20;
window.showTopHotelsRating = true;

function getTable() {
    return document.querySelector("table.results")
}


// -------- Find Action ---------------------------

function getCountry() {
    var s = document.getElementById("cnt");
    if ( s === null ) {
        console.log("country selector is not found");
        return "";
    }
    return selectedOption(s);
}



function getCurrency() {
    var s = document.getElementById("cur");
    if ( s == null ) {
        console.log("currency selector is not found");
        return null;
    }
    
    if ( s.value == null ) {
        console.log("currency is not selected");
        return null;
    }
    s = selectedOption(s);
    switch (s) {
        case "руб": return "RUB";
        case "EURO": return "EUR";
        case "USD": return "USD";
    }
    
    console.log("unexpected currency id: " + s);
    return s;
}

function initializeSearchCriteria() {    
    var country = getCountry();

    var currency = getCurrency();
    if ( !currency || /ЗАГРУЗКА/i.test(country) )
        return null;
    
    var city = document.getElementById("city");
    city = city && city.clientHeight > 0 ? selectedOption(document.getElementById("city")) : "";

    return { "country" : country,
             "currency" : currency,
             "city" : city
             };
}

function getSearchButton() {
    return document.querySelector("button.infoButton");
}

// --------- Rows ---------------------------------

function extractPrice(td) {
	var s = td.querySelector(".bg span");
	var priceAndInfant = s != null ? s.textContent : td.textContent;
    var m = priceAndInfant.split(/\s+/).join("").match(/(\d+)(\s*\+\s*(\d+))?/)
    if ( m[3] != null ) {
        return parseInt(m[1], 10) + parseInt(m[3], 10);     
    }
    return parseInt(m[1], 10)    
}

function extractNights(nightsAndDays) {
    return nightsAndDays.match(/(\d+)/)[1]
}

function extractDate(dateAndDoW) {    
    var d = dateAndDoW.match(/(\d+\.\d+\.\d\d)/)[1];
    return makeYear4Digits(d);
}

function extractHotelUrl(td) {
    var anchor = td.querySelector("td>a");
    return anchor == null ? "" :  anchor.href
}

function extractHotelName(td, room) {
    var anchor = td.querySelector("td>a");    
    var name = anchor == null ? td.textContent : anchor.textContent;
    
    if ( room != null ) {
        name = name.replace("(" + room + ")", "");
        name = name.replace(/\(\)/, "");
    }
    
    // move rating to the end of hotel name
    var m = name.match(/^[\d\*\+\-\s]+/);
    if ( m != null ) {
        name = name.replace(m[0], "");
        if ( name.indexOf(m[0]) < 0 ) {
            name = name + " " + m[0];    
        }               
    }
    
    name = name.replace("доплаты отеля","").replace("изменить","").replace("состав тура и доплаты >>", "");
    
    return name;
}

function extractRoomType(td) {
    var anchor = td.querySelector("td>a");
    var s = anchor == null ? td.textContent : anchor.textContent;
    var regexp = /\(([^\(\)]+)\)/g;

    var result = null;
    for (var i = regexp.exec(s); i != null; i = regexp.exec(s)) {
        result = i;
    }

    if ( result != null ) {
        return result[1];
    }
    
    return s;
}

function extractRoom(tds, room, offset, heads) {
    var trs = getTable().querySelectorAll("table.results>tbody>tr");
    var ths = trs[1].querySelectorAll("tr>th");
    var occupancy = findTableTdIndex(heads, /Размещение/i) !== -1 ? tds[ findTableTdIndex(heads, /Размещение/i)].textContent : "";
    var alloc = ths[6].textContent;
    if ( alloc != null && alloc.trim().length > 0 ) {
    	if ( room == null ) {
    		room = alloc;
    	} else {
    		room = room + ", " + alloc;
    	}
    }
    
    if ( ths[7] && ths[7].textContent == "возраст ребенка" ) {
        room = room + " (" + tds[8-offset].textContent + ")";
    }
    return new RegExp(tds[findTableTdIndex(heads, /Питание/i)].textContent).test(room) ? occupancy :
           [room, occupancy].filter( text=> text ).join(", ");
}

function createOption(img) {
	var tr = img.parentNode.parentNode.parentNode;	
    var tds = getChildElementsByTagName(tr, "td");
    var ths = querySelectorAll( document.querySelector("th.qq").parentNode, "th");
    var offset = /srch_v2/i.test(window.location.href) ? 1 : 0;
    var room = extractRoomType(tds[5 - offset]);

    var option = {
        checkinDt : extractDate(tds[findTableTdIndex(ths, /Вылет/i)].textContent),
        nights : extractNights(tds[findTableTdIndex(ths, /Ночей/i)].textContent),
        region : tds[findTableTdIndex(ths, /курорт|Программа|Описание круиза/i)].textContent,
        boardType : tds[findTableTdIndex(ths, /Питание/i)].textContent,
        href : extractHotelUrl(tds[findTableTdIndex(ths, /Отель|Лайнер/i)]),
        currency : SEARCH_CRITERIA.currency,
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        roomType: extractRoom(tds, room, offset, ths),
        hotelName : extractHotelName(tds[findTableTdIndex(ths, /Отель|Лайнер/i)], room),
        price : extractPrice(tds[findTableTdIndex(ths, /Цена/i)])
    }

    return option

}

function createCell() {
    var newTd = document.createElement("td");
    newTd.className = "qq valcenter";
    newTd.appendChild(qqBtns());
    return newTd
}

function injectData() {
    var tbl = getTable();
    if ( tbl == null ) {
        return;
    }
    querySelectorAll(tbl, "table.results>tbody>tr.even, table.results>tbody>tr.odd").forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            tr.append(createCell());
        }
    });
    var header = tbl.querySelector("table.results>tbody>tr");
    if ( !header.querySelector("th.qq") ) {
        var newTh = document.createElement("th");
        newTh.className = "qq hcenter";
        newTh.setAttribute("rowspan", "3");
        var newContent = document.createTextNode("QQ");
        newTh.appendChild(newContent);
        header.appendChild(newTh);
    }
}
