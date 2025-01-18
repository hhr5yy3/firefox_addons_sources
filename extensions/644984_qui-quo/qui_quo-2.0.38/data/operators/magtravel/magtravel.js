window.OPERATOR_NAME = "MAG.Travel";
window.crmTutorial  = "https://help.qui-quo.support/support/solutions/articles/35000165989";
window.crmName  = "MAG.Travel";

function initializeSearchCriteria() {
    return {
        city: getCity(),
        country: getNodeProperty(document.querySelector(".el-form-item__content .select-cch__head span"), "").replace(",", "").trim(),
        occupancy: getOccupancy()
    };
}

function getSearchButton() {
    return querySelectorAll(document, ".m-button--1").find(btn => getText(btn) === "Найти")
}

function injectData() {
    querySelectorAll(document, ".search-tours-item__price").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", hideFlight: true}));
        }
    });
    querySelectorAll(document, ".search-tours-hotel-table__tr").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createHotelSearchCell());
        }
    });
    querySelectorAll(document, ".search-tours-hotel-table thead tr").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            appendHeadCells(div);
        }
    });
    let orderButton = document.querySelector(".search-tours-cart-price__submit");
    if ( !document.querySelector(".qq") && orderButton ) {
        orderButton.after(qqBtns({align: "qq-horizontal"}, createOrderOption))
    }
}

function appendHeadCells(div) {
    let qqTh = document.createElement("th");
    let emptyTh = document.createElement("th");
    qqTh.classList.add("qq");
    emptyTh.classList.add("qq");
    qqTh.textContent = "QQ";
    qqTh.setAttribute("width", "48");
    emptyTh.setAttribute("width", "30");
    div.append(emptyTh);
    div.append(qqTh);
}

function createHotelSearchCell() {
    let newTd = document.createElement("td");
    newTd.classList.add("qq");
    newTd.append(qqBtns({align: "qq-vertical", hideFlight: true}, createHotelOption));
    return newTd;
}

//--------------------------------------------------------Search Page-------------------------------------------------//
function createOption(img) {
    const tour = getHotelRowByImage(img);
    const offers = querySelectorAll(tour, '.search-tours-item__offer');
    const price = getText(tour.querySelector(".search-tours-item__btn"));
    let option = {
        checkinDt: getDate(tour, ".search-tours-item__offer-date"),
        nights: getText(offers[1]).replace(/\D+/g, ""),
        hotelName: getHotelName(tour),
        href: getNodeProperty(tour.querySelector(".search-tours-item__price a"), null, "href"),
        country: SEARCH_CRITERIA.country,
        region: getText(tour.querySelector(".search-tours-item__city")),
        roomType: getText(offers[3]),
        boardType: getText(offers[2]),
        price: extractIntFromStr(price.replace(/\D+/g,"")),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+|[А-я]+/g,"")),
        city_from: SEARCH_CRITERIA.city,
        operator: getOperator(tour),
        thumbnail: getNodeProperty(tour.querySelector(".search-tours-item__img-with-rating img"), null, "src"),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getDate(tour, sel) {
    const dates = getText(tour.querySelector(sel)).split(/\s|-/);
    return dateFromDayAndMonthName(dates[0], dates[1]);
}

function getHotelName(tour, sel = ".search-tours-item__name") {
    const caption = getText(tour.querySelector(sel));
    const stars = querySelectorAll(tour,"i.el-icon-star-on").filter( i => i.style.color.match(/247, 186, 42/) );
    return stars.length > 0 ? `${caption} ${stars.length}*` : caption;
}

function getCity() {
    const cityLabel = querySelectorAll(document, "label.el-form-item__label").find( label => getText(label) === "Откуда" );
    let city;
    if ( cityLabel ) {
        city = cityLabel.parentNode.querySelector("input");
        return city ? getNodeProperty(city, "", "value").replace(/без перелета/i, "") : null;
    }
    return null;
}
//--------------------------------------------------------End Search Page----------------------------------------------//

//--------------------------------------------------------Hotel Search Page--------------------------------------------//

function createHotelOption(img) {
    const row = getHotelRowByImage(img);
    const tds = querySelectorAll(row, "td");
    tds.findAndExtract = (caption, method = "textContent") => getText(tds[findTableTdIndex(ths, new RegExp(caption, "i"))], method);
    const ths = querySelectorAll(document, ".search-tours-hotel-table thead tr th");
    const price  = tds.findAndExtract("Цена");
    let region = getText(document.querySelector(".search-tours-hotel__city")).split(",");
    let cities = window.location.href.match(/([A-Z]+)-to-[A-Z]+/);
    let option = {
        checkinDt: getNodeProperty(document.querySelector(".search-tours-hotel-form .el-date-editor input"), null, "value"),
        nights: tds.findAndExtract("Ночей"),
        hotelName:  getHotelName(document, ".search-tours-hotel__name h2"),
        href: window.location.href,
        country: region.pop(),
        region: region.pop(),
        roomType: tds.findAndExtract("Номер"),
        boardType: tds.findAndExtract("Питание"),
        price: price.replace(/\D+/g, ""),
        currency: mapCurrencyUtil(price.replace(/\d+|/g, "")),
        city_from: cities ? cities[1] : 'Нет данных',
        operator: getOperator(row),
        thumbnail: getNodeProperty(document.querySelector("img[alt*='hotel img']"), null, "src"),
        occupancy: getOccupancy()
    };
    if ( row.querySelector(".search-tours-hotel-table__comb") ) {
        addCombiTourOptions(option, row)
    }
    return option;
}

function  addCombiTourOptions(option, row) {
    const combiRow = row.nextElementSibling;
    option.roomType = getInfoByIcon(".icon-accommodation",combiRow);
    option.boardType = getInfoByIcon(".icon-food",combiRow);
    option.hotelName = querySelectorAll(combiRow, ".search-tours-hotel-table__additional-hotel").map( div => getText(div) ).join(" / ");
    option.region = querySelectorAll(combiRow, ".search-tours-hotel-table__additional-info div:not(.search-tours-hotel-table__additional-hotel)").map( div => getText(div) ).join(" / ");
    option.nights =  getInfoByIcon(".icon-night",combiRow).split(" / ").reduce((sum, elem) => sum + +elem, 0).toString();
}

function getInfoByIcon(sel,combiRow) {
    return querySelectorAll(combiRow, sel).map( icon => getText(icon.parentNode) ).join(" / ")
}
//--------------------------------------------------------End Hotel Search Page----------------------------------------//
//--------------------------------------------------------Order Page---------------------------------------------------//
function createOrderOption(img) {
    const tour = document.querySelector(".search-tours-cart-hotel");
    let region = getText(tour.querySelector(".search-tours-cart-hotel__location")).split(",");
    const price = getText(document.querySelector(".search-tours-cart-price__cost div"));
    let cities = window.location.href.match(/([A-Z]+)-to-[A-Z]+/);
    let option = {
        checkinDt: getDate(tour, ".search-tours-cart-hotel__date"),
        nights: getText(tour.querySelector(".search-tours-cart-hotel__night")).replace(/\D+/g,""),
        hotelName: getHotelName(tour, ".search-tours-cart-hotel__name"),
        href: window.location.href,
        country: region.shift(),
        region: region.join(),
        roomType: getText(tour.querySelector(".search-tours-cart-hotel__room")),
        boardType: getText(tour.querySelector(".search-tours-cart-hotel__meal")),
        price:  extractIntFromStr(price.replace(/\D+/g,"")),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g,"")),
        city_from: cities ? cities[1] : 'Нет данных',
        operator: getOperator(tour),
        thumbnail:  getNodeProperty(tour.querySelector(".search-tours-cart-hotel__img img"), null, "src"),
        occupancy: getOccupancyFromUrl(),
        flight: getFlight()
    };
    return option;
}

function getOccupancyFromUrl() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const url = window.location.href;
    const adults = url.match(/(\d+)-adults/);
    const kids = url.match(/adults-(.+?)-kids/);
    if ( !adults ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adults[1]);
    occupancy.childrenCount = kids ? kids[1].split(",").length : 0;
    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = kids[1];
    }
    return occupancy;
}

function getFlight() {
    try {
        let sectors = querySelectorAll(document, ".search-tours-cart-airs .search-tours-cart-airs__item .el-select")
                      .map(div => getNodeProperty(div, null, "title"));
        if ( sectors.length !== 2 ) {
            return null;
        }
        return {
            sectors: sectors.map( sector => createSegment(sector))
        }
    } catch (e) {
        return null;
    }
}

function createSegment(sector) {
    const splitArray = sector.replace(/Авиаперелет:/i, "").split(/,/);
    const cities = splitArray[0].match(/(.+?)\((.+?)\)\s+-\s+(.+?)\((.+?)\)/) || [];
    const shortCities = cities.length > 0 ? [] : splitArray[0].split("-");
    const time = splitArray[2].split("-")
    return {
        segments: [new FlightSegment({
            flightNumber: splitArray[1].replace(/[А-я]+/g, "").trim(),
            departureTime: formatTime(time[0]),
            departureCity: shortCities[0] || (cities[1] || "").trim(),
            departureAirport: "",
            departureAirportID: (cities[2] || "").trim(),
            serviceClass: (splitArray[3] || "").trim(),
            arrivalTime: formatTime(time[1]),
            arrivalCity: shortCities[1] || (cities[3] || "").trim(),
            arrivalAirportID: (cities[4] || "").trim(),
        })]
    }
}

function formatTime(time) {
    const matcher = time.match(/(\d{1,2}):(\d{1,2})/);
    if ( !matcher ) {
        return null;
    }
    return `${matcher[1].padStart(2, "00")}:${matcher[2].padStart(2, "00")}`
}

//--------------------------------------------------------End Order Page---------------------------------------------------//

function getOperator(tour) {
    return `${OPERATOR_NAME} / ${getNodeProperty( tour.querySelector(".static-supplier"), "", "title" )}`;
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const adults = getNodeProperty(document.querySelector(".select-tourists .select-tourists__audit-text"));
    const kids = querySelectorAll(document, ".select-tourists .select-tourists__child-item");
    if ( !adults ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adults);
    occupancy.childrenCount = kids.length;

    if ( kids.length > 0 ) {
        occupancy.childAges = kids.map( kid => extractIntFromStr(getNodeProperty(kid), "0") ).join();
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains("search-tours-item") || div.classList.contains("search-tours-hotel-table__tr") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

//--------------------------------------------------------Quick Reservation---------------------------------------------------//

function injectQuickReservationData(selInsert, func) {
    querySelectorAll(document, "form.search-tours-cart-passport__form").forEach(form => {
        if (!form.parentNode.querySelector(selInsert)) {
            form.after(func({
                addTag: "div",
                tagStyle: "margin-top:15px",
                newTagStyle: "margin-top:15px",
                displayCaption: true,
                legendStyle: "font-size:12px;margin:0.5em"

            }));
            const select = form.parentNode.querySelector('.qq-select select');
            if (!select) {
                return;
            }
            select.classList.add('el-input__inner');
            select.style.width = '350px';
        }
    });
}

function pasteOrderData(form, data, passport, errors) {
    setInputValues(form, [
            getInputViaLabel(form, "DateOfBirth"), customDateToFullString(data.birthday),
            getInputViaLabel(form, "DocumentNumber"), {
                value: passport.serial.value + passport.number.value,
                caption: "Загранпаспорт"
            },
            getInputViaLabel(form, "DocumentDateOfIssuance"), customDateToFullString(passport.issueDate),
            getInputViaLabel(form, "DocumentValidDate"), customDateToFullString(passport.expire)
        ], errors, ["input", "blur"]
    );
    setInputValues(form, [
            getInputViaLabel(form, "LastNameLat"), passport.surname,
            getInputViaLabel(form, "FirstNameLat"), passport.name
        ], errors, ["input"]
    );
    const currentSex = querySelectorAll(form, ".l-input-gender__boy, .l-input-gender__girl").find(div => div.offsetHeight > 0);
    if ( data.sex.value !== "1" && data.sex.value !== "2" ) {
        errors.push(data.sex.caption);
        return;
    }
    if ( data.sex.value === "1" && currentSex.classList.contains("l-input-gender__girl") ) {
        currentSex.click();
        return;
    }
    if ( data.sex.value === "2" && currentSex.classList.contains("l-input-gender__boy") ) {
        currentSex.click();
        return;
    }
}

function getInputViaLabel(form, caption) {
    return form.querySelector(`label[for*=${caption}]`).parentNode.querySelector("input");
}

function getPassengerRowBySelect(select) {
    var form = select.parentNode;
    while (form) {
        if ( form.classList.contains("search-tours-cart-passport") ) {
            break;
        }
        form = form.parentNode;
    }
    return form;
}
