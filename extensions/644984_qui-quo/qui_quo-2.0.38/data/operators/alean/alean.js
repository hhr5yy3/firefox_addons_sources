var OPERATOR_NAME = "Алеан";
var OPERATOR_SLETAT_ID = 252;
var DEFAULT_EXTRACT_FLIGHT = false;

//-------- Search Criteria ---------------------------

function getSearchButton() {
    btn = document.querySelector(".aleanUi-btn--danger .glyphicon-search");
    return btn ? btn.parentNode : null;
}

function initializeSearchCriteria() {
    var finder = document.querySelector("div[crs-finder]");
    var catalog = document.querySelector("div[crs-catalog-finder]");
    var hotel = document.querySelector("div[crs-hotel-finder]");
    var city = document.querySelector('select[name="tspTown"]');
    city = city ? selectedOption(city) : null;

    if ( finder !== null  ) {
        var region = getFinderRegion();
        if ( !region ) {
            return null;
        }

        region = region.replace(/,?\s?проживание\s?\/?/, "")
            .replace("гостиницы", "")
            .replace("экскурсии", "")
            .replace("(все курорты)", "")
            .replace(/турпакет.+/i, "")
            .trim();

        var countries = ["Абхазия", "Азербайджан", "Армения",
            "Беларусь", "Грузия", "Казахстан",
            "Киргизия", "Латвия", "Литва",
            "Россия", "Узбекистан", "Эстония"];

        for (var i = 0; i < countries.length; i++) {
            if ( region.startsWith(countries[i]) ) {
                region = region.substring(countries[i].length);
                if ( region.startsWith(",") ) {
                    region = region.substring(1).trim();
                }
                return {region: region, country: countries[i], occupancy: getOccupancy()};
            }
        }

        var regions = ["КМВ", "Кавказские Минеральные Воды", "Калининградская область",
            "Краснодарский край", "Крым", "Регионы России", "Алтайский край"];
        for (var i = 0; i < regions.length; i++) {
            if ( region.startsWith(regions[i]) ) {
                return {region: region, country: "Россия", occupancy: getOccupancy(), city: city};
            }
        }

        return {region: region, country: "", occupancy: getOccupancy(), city: city};
    }

    if ( catalog !== null ) {
        return {
            region : getCatalogRegion(),
            occupancy : getOccupancy(),
            city: city
        }
    }

    if ( hotel !== null ) {
        return {
            city : getHotelCity(),
            occupancy : getOccupancy()
        }
    }
}

function injectData() {
    var finder = document.querySelector("div[crs-finder]");
    var catalog = document.querySelector("div[crs-catalog-finder]");
    var hotel = document.querySelector("div[crs-hotel-finder]");
    if ( finder !== null ) {
        injectFinderData();
    }
    if ( catalog !== null ) {
        injectCatalogData();
    }
    if ( hotel !== null ) {
        injectHotelData();
    }
}

//--------------------------------ALEANS-FINDER FUNCTIONS-----------------------------------------------------

function injectFinderData() {
    if ( !SEARCH_CRITERIA ) {
        return;
    }
    // hotel view

    var tbls = document.querySelectorAll("table.b-visit_list");
    if ( tbls.length > 0 ) {
        for (var i = 0; i < tbls.length; i++) {
            var head = tbls[i].querySelector("thead>tr");
            if ( head ) {
                injectFinderTitle(head)
            }

            var rows = tbls[i].querySelectorAll("tbody>tr");
            for (var j = 0; j < rows.length; j++) {
                injectFinderRow(rows[j]);
            }
        }
    }

    // table view

    var tbl = document.querySelector(".b-offers table");
    if ( !tbl ) {
        return;
    }

    var th = tbl.querySelector("thead tr");
    if ( th !== null && th.querySelector(".qq") === null ) {
        var td = document.createElement("th");
        td.className = "qq";
        td.setAttribute("style", "width:40px");
        td.appendChild(document.createTextNode("QQ"));
        th.appendChild(td);
    }

    var trs = tbl.querySelectorAll("tbody>tr");
    for ( var i = 0; i < trs.length; i++ ) {
        if ( trs[i].querySelector("td.qq") === null ) {

            var td = document.createElement("td");
            td.className = "qq";
            td.append(qqBtns({asyncFunc: getFinderAsyncInfo, align: "vertical"}, createFinderTableOption));
            trs[i].appendChild(td);
        }
    }
}


function hasClass(e, className) {
    var c = e.getAttribute('class');
    return c && c.indexOf(className) >= 0;
}

function getParentByClass(e, className) {
    while ( !hasClass(e, className) ) {
        e = e.parentNode;
    }
    return e;
}

function injectFinderTitle(row) {
    if ( row.querySelector("th.qq") !== null ) {
        return;
    }

    fixFinderColumnHeaders(row);

    var td = document.createElement("th");
    td.className = "qq ui-widget-header";
    td.appendChild(document.createTextNode("QQ"));
    row.appendChild(td);
}

function fixFinderColumnHeaders(row) {
    var ths = row.querySelectorAll("th");
    for (var i = 0; i < ths.length; i++) {
        if ( ths[i].innerHTML === "Кол-во дней" ) {
            ths[i].innerHTML = "Дней";
        } else if ( ths[i].innerHTML === "Кол-во номеров" ) {
            ths[i].innerHTML = "Номеров";
        }
    }
}

function injectFinderRow(row) {
    if ( row.querySelector(".qq") !== null ) {
        return;
    }
    var td = document.createElement("td");
    td.classList.add("qq");
    td.append(qqBtns({asyncFunc: getFinderAsyncInfo, align: "horizontal"}, createFinderOption));
    row.append(td);
}

function getFinderRegion() {
    var e = document.querySelector('input[name=lookLabel]');
    if ( e )
        return e.value;

    e = document.querySelector('select[name=tspRegion], select[name=tspTour]');
    if ( e )
        return selectedOption(e);

    return null;
}

function createFinderOption(img) {
    var tr = img.parentNode.parentNode.parentNode;
    var tds = getChildElementsByTagName(tr, "td");
    var hotel = getParentByClass(img, "b-hotel");
    var flight = JSON.parse(tr.getAttribute("flight-info") || null);
    var option = {
        hotelName : extractFinderHotelName(hotel.querySelector(".b-hotel .b-name")),
        href : extractFinderHotelHref(hotel.querySelector(".b-hotel .b-name")),
        roomType : extractFinderRoomType(img),
        boardType : extractFinderBoardType(img),
        checkinDt : extractDate(tds[1].textContent),
        nights : extractIntFromStr(tds[2].textContent) + "",
        price : extractIntFromStr(tds[4].querySelector(".b-cost").textContent.replace(/[^\d]+/g, "")),
        currency : extractFinderCurrency(getParentByClass(img, "b-visit_list")),
        region : SEARCH_CRITERIA.region,
        country : SEARCH_CRITERIA.country,
        occupancy: SEARCH_CRITERIA.occupancy,
        city_from: getFinderCityFrom(tr),
        thumbnail : extractFinderThumbnail(hotel)
    };
    option.flight = addFlightInfo(flight, option);
    return option;
}

function createFinderTableOption(img) {
    img = img.parentNode;
    var tbl = document.querySelector(".b-offers table");
    var tr = img.parentNode.parentNode;
    var tds = getChildElementsByTagName(tr, "td");
    var flight = JSON.parse(tr.getAttribute("flight-info") || null);
    var option = {
        hotelName : extractFinderHotelName(tds[0]),
        href : extractFinderHotelHref(tds[0]),
        checkinDt : extractDate(tds[1].textContent),
        nights : tds[1].querySelector("dd").textContent,
        roomType :  tds[2].textContent.split("Кол-во номеров")[0],
        boardType : extractFinderTableBoardType(tds[3]),
        price : extractIntFromStr(tr.querySelector(".b-cost").textContent.split(/\s+/).join("").match(/\d+/)[0]),
        currency : extractFinderCurrency(tbl),
        region : SEARCH_CRITERIA.region,
        country : SEARCH_CRITERIA.country,
        occupancy: SEARCH_CRITERIA.occupancy,
        city_from: getFinderCityFrom(tr)
    };
    option.flight = addFlightInfo(flight, option);
    return option;
}

function extractFinderHotelName(td) {
    var a = td.querySelector("a");
    return a === null ? td.textContent : a.textContent;
}

function extractFinderHotelHref(td) {
    var a = td.querySelector("a");
    return a === null ? null : a.href;
}

function extractFinderRoomType(img) {
    var div = getParentByClass(img, "b-room");
    return div.querySelector(".b-overview .b-name").textContent +
        " / " +
        div.querySelector(".b-placing .b-name").textContent.replace("Размещение:", "");
}

function extractFinderBoardType(img) {
    var room = getParentByClass(img, "b-room");
    var radio = room.querySelector(".b-packet_active");
    if ( radio ) {
        return radio.textContent;
    } else {
        var packets = room.querySelectorAll(".b-packet");
        if ( packets.length === 1 ) {
            return packets[0].textContent;
        }
    }

    return "";
}

function extractFinderTableBoardType(td) {
    var s = td.querySelector("[uib-tooltip]");
    if ( s ) {
        return s.getAttribute("uib-tooltip");
    }
    s = td.querySelector("div");
    return s ? s.textContent : "";
}

function extractFinderCurrency(tbl) {
    var ths = tbl.querySelectorAll("th");

    var c = ths[4].textContent.split(/Цена(?:\sв)?/).join("").trim();
    switch(c) {
        case "руб.": return "RUB";
        case "грн.": return "UAH";
    }
    return c;
}

function extractFinderThumbnail(hotel) {
    var img = hotel.querySelector(".b-pic img");
    return img && img.src ? img.src : null;
}

function getFinderCityFrom(tr) {
    var plane = getParameterByNameEx("plane");
    if ( plane && plane != "" && tr.querySelector(".p-plane") ) {
        return plane;
    }
    plane = tr.querySelector(".p-plane");
    return plane ? SEARCH_CRITERIA.city : "";
}

function getFlight() {
    return true;
}

async function getFinderAsyncInfo(img) {
    if ( !canGetFlightInfo(img) ) {
        return null;
    }
    var tr = img.parentNode.parentNode.parentNode;
    var closeBtn = document.querySelector(".opentip-container .ot-header a span");
    closeBtn ? closeBtn.click() : null;
    var ticketLink = tr.querySelector('a[ng-click*="vm.openTicketHint"]');
    ticketLink.click();
    await waitingFor(getFlightFromTooltip, 100, 250)
        .then(flight => tr.setAttribute("flight-info", JSON.stringify(flight)));

    function getFlightFromTooltip() {
        try {
            var popup = document.querySelector(".opentip-container");
            var text = getNodeProperty(popup, "", "innerText");
            if ( text.match(/Авиабилет/i) ) {
                var sectors = {
                    sectors: querySelectorAll(popup, "dl").map(dl => {
                        return {segments: [createSegment(dl)]}
                    })
                };
                closeBtn = popup.querySelector(".opentip-container .ot-header a span");
                closeBtn ? closeBtn.click() : null;
                return sectors;
            }
            return null;
        } catch (e) {
            return "null";
        }
    }
    closeBtn = document.querySelector(".opentip-container .ot-header a span");
    closeBtn ? closeBtn.click() : null;
    return true;
}

function  createSegment(dl) {
   var textSegments = querySelectorAll(dl, "dd").map( dd => getText(dd) );
   var airline = textSegments[0].split(":");
   var depDateTime = textSegments[1].split(" ");
   var arrDateTime = textSegments[2].split(" ");
    return new FlightSegment({
        flightNumber: airline[1].replace(/\(.+\)/, "").trim(),
        airline: airline[0],
        departureDate: depDateTime[0],
        departureTime: depDateTime[1],
        arrivalDate: arrDateTime[0],
        arrivalTime: arrDateTime[1]
    })
}

function addFlightInfo(flight, option) {
    if ( flight && flight !== "null") {
        flight.sectors[0].segments[0].departureCity = option.city_from;
        flight.sectors[0].segments[0].arrivalCity = "";
        lastElement(flight.sectors).segments[0].departureCity = "";
        lastElement(flight.sectors).segments[0].arrivalCity = option.city_from;
    }
    return flight;
}
//--------------------------------END --- --  ALEANS-FINDER FUNCTIONS---------------------------------------------------

//------------------------------------------ALEANS-CATALOG FUNCTIONS----------------------------------------------------
function getCatalogRegion() {
    var c = document.querySelector("#s-opentip");
    return c == null? null : c.getAttribute("value");
}

function injectCatalogData() {

    var tables = document.querySelectorAll(".b-room .b-visit_list");
    for (var k = 0; k < tables.length; k++) {
        var th = tables[k].querySelector("thead>tr");
        if ( th != null && th.querySelector(".qq") === null ) {
            var td = document.createElement("th");
            td.className = "qq";
            td.appendChild(document.createTextNode("QQ"));
            th.appendChild(td);

            var cg = tables[k].querySelector("colgroup");
            if ( cg != null ) {
                var col = document.createElement("col");
                col.setAttribute("width", "30");
                cg.appendChild(col);
            }
        }

        var trs = tables[k].querySelectorAll("tbody>tr");
        for (var i = 0; i < trs.length; i++) {
            if ( trs[i].querySelector("td.qq") === null ) {
                var td = document.createElement("td");
                td.className = "qq";
                td.append(qqBtns({asyncFunc: getFinderAsyncInfo, align: "horizontal"}, createCatalogOption));
                trs[i].appendChild(td);
            }
        }
    }
}

function createCatalogOption(img) {
    img = img.parentNode;
    var tr = img.parentNode.parentNode;
    var details = getChildElementsByTagName(tr, "td");
    var alloc = tr.parentNode.parentNode.parentNode.parentNode;
    if ( !alloc.parentNode.querySelector(".b-overview") ) {
        alloc = alloc.parentNode.parentNode;
    }
    var hotel = alloc.parentNode.parentNode.parentNode.querySelector(".b-hotel_title .b-name");
    var offset = img.parentNode.parentNode.querySelector(".b-services") ? 1 : 0;
    var offset2 = img.parentNode.parentNode.querySelector(".h-cart") ? 1 : 0;
    var flight = JSON.parse(tr.getAttribute("flight-info") || null);
    var option = {
        checkinDt : extractDate(details[0+offset+offset2].textContent),
        nights : extractIntFromStr(details[1+offset+offset2].textContent) + "",
        price : extractIntFromStr(details[details.length-3].querySelector(".b-cost").textContent.split(/\s+/).join("").match(/\d+/)[0]),
        currency : mapCatalogCurrency(alloc.querySelector(".b-visit_list thead>tr th:nth-child(" + (details.length-2) +  ")")
            .textContent.match(/Цена\s+в\s+(.*)/)[1]),
        roomType :  extractCatalogRoomType(alloc),
        hotelName : extractCatalogHotelName(hotel),
        href : extractCatalogHotelHref(hotel),
        boardType : extractCatalogBoardType(hotel, alloc),
        region : SEARCH_CRITERIA && SEARCH_CRITERIA.region ? SEARCH_CRITERIA.region : "",
        country : "",
        city_from: getCatalogCityFrom(tr),
        occupancy: SEARCH_CRITERIA.occupancy,
        thumbnail : extractCatalogThumbnail()
    };
    option.flight = addFlightInfo(flight, option);
    return option;
}

function mapCatalogCurrency(c) {
    switch(c.toLowerCase()) {
        case "руб.": return "RUB";
    }
    return c;
}

function extractCatalogRoomType(alloc) {
    var t = alloc.parentNode.querySelector(".b-overview .b-name");
    var a = alloc.querySelector(".b-placing .b-name").textContent.replace("Размещение:", "").trim();
    return t ? t.textContent.trim() + " / " + a : a;
}

function extractCatalogHotelName(td) {
    if ( !td ) {
        return document.querySelector(".b-obj_name .b-title, .breadcrumb .active").textContent;
    }

    var a = td.querySelector("a");
    return a === null ? td.textContent : a.textContent;
}

function extractCatalogBoardType(hotel, alloc) {
    if ( hotel ) {
        var trs = hotel.parentNode.parentNode.querySelectorAll(".b-hotel_info tr");
        for ( var i = 0; i < trs.length; i++) {
            var tds = getChildElementsByTagName(trs[i], "td");
            if ( tds.length > 1 && tds[0].textContent.indexOf("Питание") >= 0 ) {
                return tds[1].textContent;
            }
        }
    } else {
        var radio = alloc.querySelector(".b-packet_active");
        if ( radio ) {
            return radio.textContent;
        } else {
            var packets = alloc.querySelectorAll(".b-packet")
            if ( packets.length === 1 ) {
                return packets[0].textContent;
            }
        }
    }
    return "";
}

function extractCatalogHotelHref(td) {
    if ( !td ) {
        return location.href;
    }
    var a = td.querySelector("a");
    return a === null ? null : a.href;
}

function getCatalogCityFrom(tr) {
    var city = getParameterByNameEx("avia");
    if ( city && city !== "" && tr.querySelector(".b-service_avia") ) {
        return city;
    }

    var plane = getParameterByNameEx("plane");
    if ( plane && plane !== "" && tr.querySelector(".p-plane") ) {
        return plane;
    }
    return tr.querySelector(".p-plane") ? SEARCH_CRITERIA.city : "";
}

function extractCatalogThumbnail() {
    var img = document.querySelector(".b-gallery .b-big img")
    return img && img.src ? img.src : null;
}
//-----------------------------------------END-- -ALEANS-CATALOG FUNCTIONS----------------------------------------------


//----------------------------------ALEANS-HOTEL FUNCTIONS--------------------------------------------------------------
function injectHotelData() {
    var expanded = 	document.querySelectorAll(".hotelResult-visits");
    for ( var k = 0; k < expanded.length; k++ ) {
        var trs = expanded[k].querySelectorAll("table tbody tr");
        for ( var i = 0; i < trs.length; i++) {
            if ( trs[i].querySelector("td.qq") === null ) {
                var tds = trs[i].querySelectorAll("td");
                var td = document.createElement("td");
                td.className = "qq hotelResult-visitCell";
                td.style = "text-align:center";
                td.appendChild(createAddButton(createHotelOption));
                td.appendChild(createEditButton(createHotelOption));
                trs[i].insertBefore(td,tds[tds.length-1]);
            }
        }
        var head_trs = expanded[k].querySelectorAll("table thead tr");
        for ( var j = 0; j < head_trs.length; j++ ) {
            if ( head_trs[j].querySelector(".qq") === null ) {
                var th = document.createElement("th");
                var ths = head_trs[j].querySelectorAll("th");
                th.className = "qq hotelResult-visitCell";
                th.appendChild(document.createTextNode("QQ"));
                head_trs[j].insertBefore(th,ths[ths.length-1]);
            }
        }
    }
}

function createHotelOption(img) {
    var tr = img.parentNode.parentNode;
    var tds = querySelectorAll(tr, "td");
    var room = getHotelRowByImage(img);
    var option = {
        checkinDt :extractDate(tds[findIndex(tds, /Begin.+simDate/i)].querySelector("span").textContent),
        nights : tds[findIndex(tds, /Amount/i)].textContent,
        hotelName : getHotelHotelName(),
        href : window.location.href,
        roomType: getHotelRoomType(room),
        region : getHotelRegion(),
        boardType : getHotelBoardType(room),
        price : getHotelPrice(tds[findIndex(tds,/cost/i)]),
        currency : getHotelCurrency(room),
        country:  getHotelCountry(),
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        thumbnail: extractHotelThumbnail(),
        comment: getHotelComment(room),
        occupancy : SEARCH_CRITERIA.occupancy
    }
    return option;
}

function findIndex(tds, caption) {
    var index = tds.findIndex(function (td) {
        var cellAtr = td.getAttribute("ng-bind");
        var span = td.querySelector("span");
        if ( (cellAtr && cellAtr.match(caption)) ||
            (span && span.getAttribute("ng-bind") && span.getAttribute("ng-bind").match(caption)) ||
            (td.textContent.match(caption)) ) {
            return true;
        }
        return false;
    });
    return index;
}

function getHotelHotelName() {
    return document.querySelector("h4.productHead-title, h1.productHead-title").textContent;
}

function getHotelRoomType(div) {
    var room =  div.parentNode.parentNode.parentNode.querySelector(".hotelResult-roomCell--name").textContent.trim();
    var occup = div.querySelector(".hotelResult-placing").textContent.replace("Размещение:","").trim();
    return room + ", " + occup;
}

function getHotelRegion() {
    var lis = document.querySelectorAll(".breadcrumb li");
    if ( lis.length < 3 ) {
        var address = querySelectorAll(document, ".b-left-content .b-line-box td.h-rpad").find( td => {
            return td.textContent.trim() ===   "Адрес";
        });
        return address ? address.nextElementSibling.textContent.trim() : "";
    }
    return document.querySelectorAll(".breadcrumb li")[2].textContent;
}

function getHotelBoardType(div) {
    var services = getHotelComment(div);
    if ( !services ) {
        return "";
    }
    services =  services.match(/(\S+питание)/i) ? services.match(/(\S+питание)/i) :  services.match(/\завтрак/i);
    return  services ? services[0] : "См. комментарий";
}

function getHotelPrice(td) {
    var del = getNodeProperty(td.querySelector("del"));
    return extractIntFromStr(td.textContent.replace(del, "").replace(/\D+/g,""));
}

function getHotelCurrency(room) {
    var ths = querySelectorAll(room, "th");
    var text = ths[findIndex(ths, /цена/i)].textContent.trim().replace("Цена в ","");
    switch(text.toLowerCase()) {
        case "руб.": return "RUB";
        case "бел. руб.": return "BYN";
        case "USD": return "USD";
    }
    return text;
}

function getHotelCountry() {
    var lis = document.querySelectorAll(".breadcrumb li");
    if ( lis.length < 3 ) {
        return "";
    }
    return lis[1].textContent;
}

function getHotelCity() {
    var city = document.querySelector("select[name='tspTown']");
    return city ? selectedOption(city) : "";
}


function extractHotelThumbnail() {
    var img = document.querySelector(".b-gallery .b-big img");
    return img && img.src ? img.src : null;
}

function getHotelComment(div) {
    var radio = div.querySelector(".hotelResult-radio--checked");
    if ( radio ) {
        return radio.nextElementSibling.textContent;
    }
    var services = div.querySelector(".hotelResult-packet");
    return  services ? services.textContent : null;
}

//-------------------------------END---ALEANS-HOTEL FUNCTIONS--------------------------------------------------------------

//------------------------------------------COMMON FUNCTIONS------------------------------------------------------------
function extractDate(s) {
    var m = s.match(/(\d\d)\.(\d\d)/);
    return appendYear(extractIntFromStr(m[1]),extractIntFromStr(m[2]));
}

function getParameterByNameEx(name) {
    var query = window.location.search;
    if ( query === "" && window.location.hash && window.location.hash !== "" ) {
        query = window.location.hash;
    }
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(query);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getOccupancy() {

    function extractOptionalInt(text) {
        return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
    }

    var occupancy = {
        adultsCount: extractOptionalInt(selectedOption(document.querySelector("select[ng-model='vm.ad']"))),
        childrenCount: extractOptionalInt(selectedOption(document.querySelector("select[ng-model='vm.chCount']"))),
        childAges: null
    };

    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;

    if ( occupancy.childrenCount > 0 ) {
        var sels = document.querySelectorAll("select[ng-model='vm.ch[idx]']");

        var ages = [];
        for (var i = 0; i < occupancy.childrenCount; ++i) {
            if ( i < sels.length ) {
                var age = extractOptionalInt(selectedOption(sels[i]));
                if ( age === null ) {
                    return null;
                }
                ages.push(age);
            } else {
                return null;
            }
        }
        occupancy.childAges = ages.join(",");
    }

    return occupancy;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (true) {
        if ( div.tagName === "DIV") {
            break;
        }
        div = div.parentNode;
    }
    return div.parentNode;
}