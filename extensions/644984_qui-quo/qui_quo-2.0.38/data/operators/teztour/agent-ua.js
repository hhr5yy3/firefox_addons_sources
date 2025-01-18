var OPERATOR_NAME = "TEZ TOUR";
var showTopHotelsRating = true;

function initializeSearchCriteria() {
    const isTour = !!getNodeProperty(document.querySelector('.product-select-col .current'), '').match(/туры/i);
    let city = document.querySelector('input[name="cityId"]');
    if (!city) {
        city = document.querySelector('select[name="cityId"]');
        if (city) {
            return {
                occupancy: getOccupancy(),
                city_from: isTour ? selectedOption(city) : "",
                countryHotelSearch: getNodeProperty(document.querySelector('[onclick*="SearchForm.Hotel.Point.Arr"].is-check'), null),
                country:  selectedOption(document.querySelector('select[name="countryId"]'))
            }
        }
        return null;
    }
    return {
        occupancy: getOccupancy(),
        city_from: city && city.parentNode && isTour ? getNodeProperty(city.parentNode) : "",
        countryHotelSearch: getNodeProperty(document.querySelector('[onclick*="SearchForm.Hotel.Point.Arr"].is-check'), null),
        country: getNodeProperty(document.querySelector('[onclick*="SearchForm.Tour.Point.Arr"]')) || getCountry()
    };
}

function getCountry() {
    var input = document.querySelector('[name="countryId"][checked="checked"]');
    if ( input ) {
        return getNodeProperty(document.querySelector(`label[for|='${input.id}']`));
    }
    return null;
}

function getSearchButton() {
    return [...document.querySelectorAll("#submitButton, .progress-button")];
}

function injectData() {
    if ( $first('.is-mobile') ) {
        return;
    }
    querySelectorAll(document, ".price_list").forEach( elem => {         //Для режима списка Cell и  списка Cell с картой ( Описание отеля + опции )
        if ( !elem.querySelector(".qq") ) {
            elem.append(createCell("div", "text-align:center;", createHotelCellOption));
        }
    });
    querySelectorAll(document, ".room-item").forEach( elem => {      //Для режима списка Cell и  списка Cell с картой ( опции )
        if ( !elem.querySelector(".qq") ) {
            elem.append(createCell("td", "", createTableOption));
        }
    });

    querySelectorAll(document, "tr.filter-item[data-hotel]").forEach( elem => {     //Для режима списка и списка с картой (опции )
        const ths = querySelectorAll(document, '#itemBox .head-box th');
        if ( !elem.querySelector(".qq") && ths.find(th => getText(th).match(/ЗАЕЗД|ЗАЇЗД|SAABUMINE|IŠVYKIMAS|ATVYKIMAS/i)) ) {
            elem.append(createCell("td", "", createTableOption));
        }
    });
    querySelectorAll(document, ".display_table_cell .price-list-info").forEach( elem => {         //Для режима сетки ( Описание отеля )
        if ( !elem.querySelector(".qq") ) {
            elem.append(createCell("div", "text-align:center;", createTableCellOption));
        }
    });
    // querySelectorAll(document, ".room-rates-price-inner").forEach( elem => {         //Для режима выбора доступных туров
    //     if ( !elem.querySelector(".qq") ) {
    //         elem.append(createCell("div", "padding-left: 5px;margin-top: 7px;", createOption, "vertical"));
    //     }
    // });
    // querySelectorAll(document, ".total-price-table").forEach( elem => {         //Для режима бронирования тура
    //     if ( !elem.querySelector(".qq") ) {
    //         elem.append(createCell("div", "text-align:right;", createOption));
    //     }
    // });
    querySelectorAll(document, "th.head1:last-child").forEach( elem => {   // //Для режима списка, списка с картой, таблицы (thead )
        const ths = querySelectorAll(document, '#itemBox .head-box th');
        if (elem && !elem.parentNode.querySelector(".qq") ) {
            var col = querySelectorAll(document, "table#itemBox>colgroup>col").find( elem => { return elem.style.width === "20%"; });
            if ( col ) {
                col.style.width = "18.5%";
            }
            elem.parentNode.appendChild(createCell("th", "width:60px", null, "head1")).textContent = "QQ";
        }});
}

function createCell(tagName, style, action, adSel = null) {
    var newDiv = document.createElement(tagName);
    if ( action && typeof action === "function" ) {
        const btns = qqBtns({align: 'qq-box'}, action);
        newDiv.appendChild(btns);
    }
    if ( adSel ) {
        newDiv.classList.add(adSel);
    }
    newDiv.classList.add("qq");
    newDiv.style.cssText = style;
    return newDiv;
}

function createHotelCellOption(img) {      //Для режима списка Cell и  списка Cell с картой ( Описание отеля + опции )
    const hotel = getHotelRowByImage(img);
    const region = getCellCountryAndRegion(hotel);
    const dateNights = getHotelCellDate(hotel);
    const priceFromNode = getNodeProperty(hotel.querySelector(".price-button, .price-box small, .price.new small, .price.new"), '').replace(/\s+/g, '');
    const option = {
        checkinDt: dateNights.checkinDt,
        nights: dateNights.nights,
        hotelName: getCellHotelName(hotel),
        hotel_desc: getCellHotelDescription(hotel),
        href: extractHref(getNodeProperty(hotel.querySelector(".h5 a"), null, "href")),
        roomType: getCellRoomType(hotel) + extractAccomodation(),
        boardType: getNodeProperty(hotel.querySelector(".fav-mealplan, [data-mealplan]"), ""),
        price: extractIntFromStr(priceFromNode || hotel.querySelector("[data-price]").dataset.price),
        currency: getCellCurrency(hotel),
        country: region.country,
        region: region.region,
        city_from: SEARCH_CRITERIA.city_from && !hotel.querySelector('.table-imitate-cell .fa-calendar-check-o') ? SEARCH_CRITERIA.city_from : getNodeProperty(hotel.querySelector(".airport-name"), ""),
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(hotel.querySelector(".preview"), null, "src"),
        occupancy: SEARCH_CRITERIA.occupancy,
        flight: getHotelCellFlight(hotel)

    };
    return option;
}

function getFlight() {
    return true;
}

function getHotelCellFlight(hotel) {
    try {
        let sectors = querySelectorAll(hotel, '.flight-number').map(box => box.closest('tr'));
        if ( sectors.length > 2 ) {
            return null;
        }
        sectors = sectors.map(sector => {
            return createHotelCellFlightSegment(sector);
        })
        return {sectors}
    } catch(e) {
        return null;
    }
}

function createHotelCellFlightSegment(sector) {
    const flightNumber = getNodeProperty(sector.querySelector('.flight-number'));
    const airports = querySelectorAll(sector, '.airport-name').map(parseAirports);
    const times = querySelectorAll(sector, '.time');
    const dates = times.map( time => makeYear4Digits(getText(time.previousSibling)));
    const segment = new FlightSegment({
        flightNumber: flightNumber,
        departureDate: dates[0],
        departureTime: getNodeProperty(times[0]),
        departureAirport: airports[0].name,
        departureAirportID: airports[0].id,
        departureTerminal: airports[0].terminal,
        arrivalDate: dates[1],
        arrivalTime: getNodeProperty(times[1]),
        arrivalAirport: airports[1].name,
        arrivalAirportID: airports[1].id,
        arrivalTerminal: airports[1].terminal
    })
    return {segments: [segment]}
}

function parseAirports(airport) {
    const text = typeof airport === "string" ? airport : getText(airport);
    const matched = text.match(/(\S+)\s*\((.+?)\)/);
    const idAndTerminal = matched ? matched[2].split("/") : [];
    return {
        name: matched ? matched[1] : text,
        id: idAndTerminal[0],
        terminal: idAndTerminal[1]
    }
}

function getCellHotelDescription(hotel) {
    return querySelectorAll(hotel, ".hotel-comment .our-comment-block div, .hotel-comment .clipped-text").map(div => getText(div)).reduce((longest, current) => {
        return current.length > longest.length ? current : longest;
    }, "")
}

function getHotelCellDate(hotel) {
    try {
        var tourinfo = hotel.querySelector(".description [data-tourinfo]");
        if (tourinfo) {
            const date = tourinfo.dataset.tourinfo.split(":");
            return {checkinDt: date[0], nights: date[1]}
        }
        const cells = querySelectorAll(hotel, '.table-imitate-cell');
        const date = cells.find(cell => getText(cell).match(/заезд|заїзд/) || cell.querySelector('.fa-calendar-check-o, .airplane-ico'));
        const nights = cells.find(cell => getText(cell).match(/\d+\s+ноч|n\./) || cell.querySelector('.fa-moon-o'));
        return {
            checkinDt: getText(date).match(/\d{2}\.\d{2}\.\d{4}/)[0],
            nights: getText(nights).match(/(\d+)/)[1]
        }
    } catch(e) {
        console.log(e);
        return null;
    }
}

function getCellHotelName(hotel) {
    var hotelName = hotel.querySelector(".h5").innerText.trim();
    var stars = hotel.querySelector(".hotel-star-box");
    stars = stars && !hotelName.match(/\*/) ? stars.className.replace(/\D+/g,"") : "";
    return stars ? hotelName + " " + stars + "*" : hotelName;
}

function getCellRoomType(hotel) {
    var roomData = hotel.querySelector("[data-room]");
    roomData = roomData ? roomData.dataset.room.split(":") : null;
    var room = getNodeProperty(hotel.querySelector(".fav-room"));
    return roomData && roomData.length > 1 ? roomData[1] : room;
}

function getCellCurrency(hotel) {
    var code = hotel.querySelector('[data-currency]');
    const priceFromNode = getNodeProperty(hotel.querySelector(".price-button, .price-box small, .price.new small, .price.new"), '').replace(/\d+|\s+/g, "");
    code = priceFromNode ? priceFromNode : code.dataset.currency;
    switch(code) {
        case "5561": return "USD";
        case "18864": return "EUR";
        case "46688": return "UAH";
        case "533067": return "BYN";
        case "8390": return "RUB";
        case "$": return "USD";
        case "€": return "EUR";
        case "грн.": return "UAH";
        case "BYN": return "BYN";
        case "₽": return "RUB";
        case "122196":return "KZT";
        default: return code;
    }
}

function getCellCountryAndRegion(hotel) {
    var text = hotel.querySelector(".city-name, .show_map_link, .dashed-text-line.simple_link").innerText.trim().split(",");
    return {
        country: text[text.length - 1],
        region: text.slice(0, -1).join(", ")
    }
}

function createHotelCellListOption(img) {       //Для режима списка и списка с картой (опции )
    const hotel = getHotelRowByImage(img);
    const row = getRowByImage(img);
    let prevTds = null;
    let prevRow = null;
    const region = getCellCountryAndRegion(hotel);
    const tds = querySelectorAll(row, "td");
    if ( tds.length < 7 ) {
        prevRow = row.previousElementSibling;
        prevTds = querySelectorAll(prevRow, 'td');
    }
    const date = getHotelCellListDate(row, tds, prevTds);
    var option = {
        checkinDt: date.checkinDt,
        nights:  date.nights,
        hotelName: getCellHotelName(hotel),
        hotel_desc: getCellHotelDescription(hotel),
        href: extractHref(getNodeProperty(hotel.querySelector(".h5 a"), null, "href")),
        roomType: getNodeProperty((prevRow || row).querySelector(".room-name")) + extractAccomodation(),
        boardType: getNodeProperty((prevRow || row).querySelector(".select-meal-ico")),
        price: extractIntFromStr(row.querySelector(".price.new").textContent.replace(/\D+/g,"")),
        currency: getCellCurrency(row),
        country: region.country.trim(),
        region: region.region,
        city_from: SEARCH_CRITERIA.city_from && !hotel.querySelector('.table-imitate-cell .fa-calendar-check-o') ? SEARCH_CRITERIA.city_from : getNodeProperty(hotel.querySelector(".airport-name"), ""),
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(hotel.querySelector(".preview"), null, "src"),
        occupancy: SEARCH_CRITERIA.occupancy,
        flight:  getHotelCellListFlight(row)

    };
    return option;
}

function getHotelCellListFlight(tour) {
    try {
        let sectors = querySelectorAll(tour, ".air-info [data-title]").map(sector => {
            return { segments : [parseHotelCellListSegment(sector)] };
        }).filter( segment => segment);
        return sectors.length > 0 ? {sectors: sectors} : null;
    } catch (e) {
        return null;
    }
}

function parseHotelCellListSegment(sector) {
    const text = sector.dataset.title.replace(/.+<br>/, "");
    const split = text.split("~").map(trim);
    const airports =  split[0].split("->").map(parseAirports);
    const dateAnTime = split[2].split(' ');
    const segment = new FlightSegment({
        flightNumber: split[1],
        departureDate: dateAnTime[0],
        departureTime: dateAnTime[1],
        departureAirport: airports[0].name,
        departureAirportID: airports[0].id,
        departureTerminal: airports[0].terminal,
        arrivalAirport: airports[1].name,
        arrivalAirportID: airports[1].id,
        arrivalTerminal: airports[1].terminal
    })
    return segment;
}

function getHotelCellListDate(row, tds, prevTds) {
    return createTableOption(row.querySelector('.qq-add-btn'));
    const airInfo = row.querySelector(".air-info");
    if ( airInfo ) {
        const checkinDt = getText(airInfo).match(/\d{2}\.\d{2}\.\d{4}/)[0];
        const nights = getText(airInfo.parentNode.querySelector(".font_bold")).replace(/\D+/g, "");
        return {nights, checkinDt}
    } else {
        const text = getText(prevTds ? prevTds[1] : tds[1]);
        const date = text.match(/(\d{2})\.(\d{2})/);
        const checkinDt = appendYear(date[1], date[2]);
        const nights = text.match(/(\d+)\s+ноч/)[1];
        return {nights, checkinDt}
    }
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = +getNodeProperty(document.querySelector('[name="adults"]'), null, "value");
    if ( !occupancy.adultsCount ) {
        return null;
    }
    occupancy.childAges = getNodeProperty(document.querySelector("[name='ages']"), null, "value");
    occupancy.childrenCount = occupancy.childAges ? occupancy.childAges.split(",").length : 0;

    if ( occupancy.childrenCount && +occupancy.childrenCount > 0 ) {
        var ages = document.querySelector("[name='ages']");
        occupancy.childAges = ages ? ages.value : null;
    }
    return occupancy;
}

function createTableCellOption(img) {      //Для режима списка Cell и  списка Cell с картой ( Описание отеля + опции )
    var hotel = getHotelRowByImage(img);
    var region = getCellCountryAndRegion(hotel);
    var dateNights = hotel.querySelector(".description [data-tourinfo]").dataset.tourinfo.split(":");
    var option = {
        checkinDt: dateNights[0],
        nights: dateNights[1],
        hotelName: getCellHotelName(hotel),
        hotel_desc: getCellHotelDescription(hotel),
        href: extractHref(getNodeProperty(hotel.querySelector(".h5 a"), null, "href")),
        roomType: getTableCellRoomtype(hotel) + extractAccomodation(),
        boardType: getNodeProperty(hotel.querySelector("[data-mealplan]"), ""),
        price: extractIntFromStr(hotel.querySelector("[data-price]").dataset.price),
        currency: getCellCurrency(hotel),
        country: region.country,
        region: region.region,
        city_from: SEARCH_CRITERIA.city_from && !hotel.querySelector('.table-imitate-cell .fa-calendar-check-o') ? SEARCH_CRITERIA.city_from : getNodeProperty(hotel.querySelector(".airport-name")),
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(hotel.querySelector(".preview, .image_row img"), null, "src"),
        occupancy: SEARCH_CRITERIA.occupancy

    };
    return option;
}

function getTableCellRoomtype(hotel) {
    var roomData = hotel.querySelector(".fav-room").parentNode;
    return getNodeProperty(roomData.querySelector(".type"));
}

// function createTableOption(img) { //Для режима table
//     var tr = getHotelRowByImage(img);
//     var tds = [...tr.querySelector('tr').children].filter(elem => elem.tagName === 'TD');
//
//     console.log(tr.querySelector('tr'));
//     console.log(tds);
//     var thIndexs = {};
//     querySelectorAll(document, "#itemBox .head-box th").forEach( (th, index) =>  {
//         var caption = th.textContent.trim().toLowerCase();
//         if ( caption ) {
//             thIndexs[caption] = index;
//         }
//     });
//     console.log(thIndexs);
//     const region = tds[thIndexs["отель"] || thIndexs["готель"]].querySelector(".city-name").innerText.trim().split(/,\s*/);
//     var option = {
//         checkinDt: tds[thIndexs["заезд/вылет"] || thIndexs["заїзд"]].textContent.match(/\d{2}\.\d{2}\.\d{4}/)[0],
//         nights: tds[thIndexs["ночей"] || thIndexs["ночей"]].textContent.match(/\d+/)[0],
//         hotelName: getCellHotelName(tds[thIndexs["отель"] || thIndexs["готель"]]),
//         href: extractHref(getNodeProperty(tds[thIndexs["отель"] || thIndexs["готель"]].querySelector(".h5 a"), null, "href")),
//         roomType: [getNodeProperty(tds[thIndexs["тип номера"] || thIndexs["тип номеру"]], ""),
//                    getNodeProperty(tds[thIndexs["размещение"]], "" ).replace(/\s{2,}/g, ', ')].filter(s=>s).join(', '),
//         boardType:getNodeProperty(tds[thIndexs["питание"] || thIndexs["харчування"]], ""),
//         price: extractIntFromStr(tr.querySelector(".cost .price-button").textContent.trim().replace(/\D+/g,"")),
//         currency: getCellCurrency(tr.querySelector(".cost")),
//         country: SEARCH_CRITERIA.country,
//         region: region.filter( elem => !elem.match(SEARCH_CRITERIA.country)).join(', '),
//         city_from: SEARCH_CRITERIA.city_from,
//         operator: OPERATOR_NAME,
//         thumbnail: getTableImage(tds, thIndexs),
//         occupancy: SEARCH_CRITERIA.occupancy,
//         flight: getHotelCellFlight(tr)
//
//     };
//     return option;
// }
function createTableOption(img) { //Для режима table
    let tour = img.closest('tr');
    const hotelDiv = img.closest('[data-hid], [data-hotel], .hotel_point') || tour;
    let tourInfo = tour.querySelector('[data-tourinfo], .fav-mealplan.fav-room');
    if ( !tourInfo ) {
        const favData = tour.querySelector('[data-favdata]');
        tourInfo = favData ? {dataset: JSON.parse(favData.dataset.favdata)} : null;
    }
    let dataTitle = hotelDiv.querySelector(".table-hotel-td .detail-link, .hotel-top-main a, .detail-link");
    let dateAndNights = (tourInfo.dataset.tourinfo || '').split(":");
    if ( !dateAndNights[1] ) {
        dateAndNights = getDateFromTd(tour) || dateFromHref() || getHotelCellDate(hotelDiv);
    }
    const prices = $$('.price.new, .eur-currency, .price-button', tour).extractNodesText();
    let price = lastElement(prices);
    let option = {
        checkinDt: dateAndNights[0] || dateAndNights.checkinDt,
        nights: dateAndNights[1] || dateAndNights.nights,
        hotelName: getHotelName( hotelDiv),
        href: extractHref(getNodeProperty(dataTitle, '', "href")),
        country: SEARCH_CRITERIA.countryHotelSearch ? lastElement(SEARCH_CRITERIA.countryHotelSearch.split(",")).trim() : SEARCH_CRITERIA.country,
        region: getText(hotelDiv.querySelector(".right-offset .h7, .city-name") || document.querySelector('#hotel-info-address')).split(/\s*,\s*/).filter(c=> c !== SEARCH_CRITERIA.country).join(', '),
        roomType: tourInfo.dataset.room.replace(/\d+:/, "") + extractAccomodation(),
        boardType: tourInfo.dataset.mealplan.replace(/\d+:/, ""),
        price: extractIntFromStr(price.replace(/\s+/g, "") || String(tourInfo.dataset.price)),
        currency: mapCurrency(String( price.replace(/\d+|\s+|\./g, "") || tourInfo.dataset.currency)),
        city_from: SEARCH_CRITERIA.city_from && !hotelDiv.querySelector('.table-imitate-cell .fa-calendar-check-o') ? SEARCH_CRITERIA.city_from : getNodeProperty(hotelDiv.querySelector(".airport-name"), ""),
        operator: OPERATOR_NAME,
        thumbnail: ((dataTitle ? dataTitle.dataset.title : null) || "").replace(/.+?'/, "").replace(/'.+/, "")
            || getNodeProperty(document.querySelector('img.fotorama__img'), null, 'src'),
        occupancy: SEARCH_CRITERIA.occupancy,
        excursion: false,
        flight: getHotelCellFlight(tour)
    };
    return option;
}

function getDateFromTd(tr) {
    try {
        const tds = $$('td>b', tr);
        const dateTd = tds.find(td => getText(td).match(getRegexPatterns().date));
        const nightsTd = tds.find(td => getText(td).match(/ноч|ніч/));
        return [getText(dateTd).match(getRegexPatterns().date)[0], getText(nightsTd).replace(/\D+/g, '')]
    } catch(e) {
        console.log(e);
        return null;
    }
}

function getHotelName(tour) {
    let caption = getText(tour.querySelector(".side-has-rating .h5, .h5") || document.querySelector('.hotel-title-box'));
    let stars = tour.querySelector(".hotel-star-box") || document.querySelector('.hotel-title-box .hotel_star');
    stars = stars ? stars.className.replace(/\D+/g, "") : null;
    return stars ? `${caption} ${stars}*` : caption;
}

function dateFromHref() {
    try {


        const chDate = window.location.href.match(/from_date.(\d{2}\.\d{2}\.\d{4})/) || window.location.href.match(/from_date\/(.*?)\//);
        const endDate = window.location.href.match(/to_date\/(.*?)\//);
        return [
            chDate[1],
            getDistance(dayMonthYearToDate(chDate[1]), dayMonthYearToDate(endDate[1])).toString()
        ]
    } catch(e) {
        return null;
    }
}

function mapCurrency(c) {
    c = c.trim().toUpperCase();
    switch (c) {
        case "5561":
            return "USD";
        case "8390":
            return "RUB";
        case "18864":
            return "EUR";
        case "46688":
            return "UAH";
        case "122196":
            return "KZT";
        case "132329":
            return "BYR";
        case "533067":
            return "BYN";
        case "$":
            return "USD";
        case "₽":
            return "RUB";
        case "€":
            return "EUR";
        case "ГРН.":
            return "UAH";
    }
    return c;
}

function getTableImage(tds, thIndexs) {
    var data = tds[thIndexs["отель"] || thIndexs["готель"]].querySelector(".h5 a");
    data = data && data.dataset ? data.dataset.title : null;
    if ( !data ) {
        return null;
    }
    var temp = document.createElement("img");
    temp.innerHTML = data;
    data = temp.querySelector("img").src;
    temp.remove();
    return data;
}

function extractAccomodation() {
    const people = SEARCH_CRITERIA && SEARCH_CRITERIA.occupancy ?
                                     [SEARCH_CRITERIA.occupancy.adultsCount,
                                      SEARCH_CRITERIA.occupancy.childrenCount] : [];
    return people.length > 0 ? ', '+people.join('+') : '';
}

function getHotelRowByImage(img) {
    var elem = img.parentNode;
    while (elem) {
        if ( elem.classList.contains("hotel_point") || elem.classList.contains("filter-item") ) {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}

function extractHref(href) {
    const id = href.match(/hotel\/(\d+)/);
    if ( !id ) {
        return href;
    }
    return `${window.location.origin.replace("agent.", '')}/hotel.html?id=${id[1]}`;
}

function getRowByImage(img) {
    var elem = img.parentNode;
    while (elem) {
        if ( elem.classList.contains("room-item") ) {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}
