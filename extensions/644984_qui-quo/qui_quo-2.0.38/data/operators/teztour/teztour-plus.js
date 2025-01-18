window.OPERATOR_NAME = "Tez";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    let hotelViewDateNights = getHotelViewDateNights();
    const city = querySelectorAll(document, `input[name="cityId"],
                                                       [onclick*="SearchForm.Flight.Point.doChoose"],
                                                       [onclick*="SearchForm.Tour.Point.Dep"]`)
                                                       .find( input => input.offsetHeight > 0);
    if ( !city && !window.location.href.match(/com.hotelsearch/) ) {
        return null;
    }
    return {
        occupancy: getOccupancy(".box.visible"),
        country: getNodeProperty(document.querySelector('[onclick*="SearchForm.Tour.Point.Arr"].is-check'), null),
        countryHotelSearch: getNodeProperty(document.querySelector('[onclick*="SearchForm.Hotel.Point.Arr"].is-check'), null),
        date: hotelViewDateNights ? hotelViewDateNights.date : null,
        nights: hotelViewDateNights ? hotelViewDateNights.nights : null,
        city_from: city ? getNodeProperty(city) : "",
    };
}

//--------------------------------------------------Search criteria functions--------------------------------------------

function getHotelViewDateNights() {
    let chDate =  getNodeProperty(document.querySelector('[name="from_date"]'), null, "value");
    let outDate =  getNodeProperty(document.querySelector('[name="to_date"]'), null, "value");
    if ( !chDate || !outDate || chDate.length < 10 || outDate.length < 10 ) {
        return null;
    }
    let nights = getDistance(dayMonthYearToDate(chDate), dayMonthYearToDate(outDate));
    return { date: chDate, nights: nights.toString() }
}



//--------------------------------------------------End search criteria functions--------------------------------------------
function getSearchButton() {
    return querySelectorAll(document,".button.progress-button");
}

function injectData() {
    querySelectorAll(document, ".price-list-info:not(.hover-hint-container)").forEach(div => {
        if ( !div.querySelector(".qq") ) {
             div.append(createCell(createOption));
        }
    });

    querySelectorAll(document, ".room-rates-row .room-rates-row-inner").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createRoomCell(createRoomOption));
        }
    });

    querySelectorAll(document, ".room-item .collapse-item.cost").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createCell(createTableVariantsOption));
        }
    });

    querySelectorAll(document, ".room-item .cost.has-calendar:not(.collapse-item)").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createCell(createTableHotelsVariantsOption));
        }
    });

    querySelectorAll(document, "#itemBox tr.head-box").forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            tr.append(createHeadCell());
        }
    });
    querySelectorAll(document, "#itemBox tr.filter-item > td[colspan]").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.setAttribute("colspan", 11);
            div.querySelector("tr").append(createTableViewCell(createTableOption));
        }
    });
    querySelectorAll(document, "#itemBox tr.filter-item").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createTableViewCell(createHotelTableOption));
        }
    });
}

function createCell(action) {
    let buttons = qqBtns({align: "qq-horizontal"}, action);
    buttons.style.width = "100%";
    buttons.style.justifyContent = "center";
    return buttons;
}

function createRoomCell(action) {
    let buttons = qqBtns({align: "qq-vertical"}, action);
    buttons.style.justifyContent = "center";
    return buttons;
}

function createHeadCell() {
    let newTh = document.createElement("th");
    newTh.textContent = "QQ";
    newTh.className = "qq head1";
    return newTh;
}

function createTableViewCell(action) {
    let newTd = document.createElement("td");
    let buttons = qqBtns({align: "qq-horizontal"}, action);
    buttons.style.width = "100%";
    buttons.style.justifyContent = "center";
    newTd.classList.add("qq");
    newTd.append(buttons);
    return newTd;
}

function createOption(img) {
    let tour = getHotelRowByImage(img);
    let dateAndNights = getDate(tour);
    let dataTitle =  tour.querySelector("[data-hotel-id]");
    let region = getText((tour.querySelector(".city-name, .image_row .dashed-text-line.simple_link ") || dataTitle)).split(",");
    let priceText = getText(tour.querySelector(".price-box"));
    let option = {
        checkinDt: dateAndNights.checkinDt,
        nights: dateAndNights.nights,
        hotelName: getHotelName(tour),
        hotel_desc: getNodeProperty(lastElement(querySelectorAll(tour, ".our-comment-block .clipped-text:not(.simple_link)"))),
        href:  extractHref(getNodeProperty(tour.querySelector(".h5 a"), '', "href")),
        country: region.pop().trim() || SEARCH_CRITERIA.countryHotelSearch,
        region: region.join(),
        roomType: tour.querySelector(".fav-room").dataset.room.replace(/\d+:/, ""),
        boardType: getText(tour.querySelector(".mealplan") || tour.querySelector(".fav-mealplan")),
        price: extractIntFromStr(priceText.replace(/\D+/g,"")),
        currency: mapCurrency(priceText.replace(/\d+/g, "").trim()),
        city_from: SEARCH_CRITERIA.city_from,
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(tour.querySelector("img.preview, .image_row img"), null, "src") || (dataTitle ? dataTitle.dataset.image : null),
        occupancy: SEARCH_CRITERIA.occupancy,
        excursion: false,
        flight: getFlight(tour)
    };
    return option;
}

function getDate(hotel) {
     var tourinfo = hotel.querySelector(".description [data-tourinfo]");
     if ( tourinfo ) {
         const date = tourinfo.dataset.tourinfo.split(":");
         return {checkinDt: date[0], nights: date[1]}
     }
     const cells = querySelectorAll(hotel, '.table-imitate-cell');
     const date = cells.find( cell => getText(cell).match(/заезд|заїзд/) || cell.querySelector('.fa-calendar-check-o, .airplane-ico'));
     const nights = cells.find( cell => getText(cell).match(/\d+\s+ноч/) || cell.querySelector('.fa-moon-o') );
     return {checkinDt: getText(date).match(/\d{2}\.\d{2}\.\d{4}/)[0], nights: getText(nights).match(/(\d+)\s+ноч/)[1]}
}

function getHotelName(tour) {
    let caption = getText(tour.querySelector(".side-has-rating .h5, .h5"));
    let stars = tour.querySelector(".hotel-star-box");
    stars = stars ? stars.className.replace(/\D+/g, "") : null;
    return stars ? `${caption} ${stars}*` : caption;
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
    }
    return c;
}

function getCityFrom() {
    let city = querySelectorAll(document, ".h6")
        .find(div => getText(div).match(/Вылет/));
    if ( city && city.firstElementChild ) {
        return getNodeProperty(city.firstElementChild, "").split("/")[0].trim();
    }
    return SEARCH_CRITERIA.city_from;
}

function getFlight(tour) {
    try {
        let sectors = querySelectorAll(tour, ".flight-direction-box").map(sector => {
            let segmentsVariants = querySelectorAll(sector, ".available-flight-row");
            if ( segmentsVariants.length > 1 ) {
                return null;
            }
            return { segments : [parseSegment(segmentsVariants[0])] };
        }).filter( segment => segment);
        return sectors.length > 0 ? {sectors: sectors} : null;
    } catch (e) {
        return null;
    }
}


function parseSegment(segmentNode) {
    let text = getText(segmentNode).replace(/\s+/g, " ");
    let times = querySelectorAll(segmentNode, ".time").map( div => getText(div) );
    let airports = querySelectorAll(segmentNode, ".airport-name").map( div => {
        let caption = getText(div);
        if ( caption.length > 5 ) {
            return caption.match(/\(([A-Z|\-]+?)\)/)[1];
        }
        return caption;
    });
    let dates = text.match(/\d{2}\.\d{2}\.\d{2}/g).map( date => makeYear4Digits(date) );
    return new FlightSegment({
        flightNumber: getText(segmentNode.querySelector(".flight-number")),
        departureDate: dates[0],
        departureTime: times[0],
        departureAirportID: airports[0],
        arrivalDate: dates[1],
        arrivalTime: times[1],
        arrivalAirportID: airports[1]
    });
}

function getOccupancy(sel) {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    let adults = extractIntFromStr(getNodeProperty(document.querySelector(sel+" .quest_form .adult_counter .value"), "0"));
    if ( !adults ) {
        return null;
    }

    occupancy.adultsCount = adults;
    let ages = getNodeProperty(document.querySelector(sel+ ' [name="ages"]'), null, "value") ||
               querySelectorAll(document, sel+" .kid_age")
                   .filter( kid => kid && kid.parentNode && kid.parentNode.parentNode && kid.parentNode.parentNode.style.display !== "none" )
                   .map( age => extractIntFromStr(getNodeProperty(age, "0"))).join();


    if ( ages && ages.length > 0 ) {
        occupancy.childAges = ages;
        occupancy.childrenCount = ages.split(",").length;
    }
    return occupancy;
}

//--------------------------------------------------------------Table Tours variants view---------------------------------------------//

function createTableVariantsOption(img) {
    let option = createOption(img);
    let tr = img.parentNode.parentNode.parentNode.parentNode;
    let priceText = getText(tr.querySelector(".price.new"));
    option.checkinDt = getText(tr.querySelector(".air-info")).match(/\d{2}\.\d{2}\.\d{4}/)[0];
    option.nights = getText(tr.querySelector(".air-info").parentNode.querySelector(".font_bold")).replace(/\D+/g, "");
    option.roomType = getText(tr.querySelector(".room-name"));
    option.boardType = getText(tr.querySelector(".select-meal-ico"));
    option.price = extractIntFromStr(priceText.replace(/\D+/g,""));
    option.currency =  mapCurrency(priceText.replace(/\d+/g, "").trim());
    return option;
}


//--------------------------------------------------------------Table Hotel variants view---------------------------------------------//

function createTableHotelsVariantsOption(img) {
    let option = createOption(img);
    let tr = img.parentNode.parentNode.parentNode.parentNode;
    let favdata = JSON.parse(tr.querySelector("[data-favdata]").dataset.favdata);
    let priceText = getText(tr.querySelector(".price.new"));
    option.roomType = favdata.room.replace(/\d+:/, "");
    option.boardType =  favdata.mealplan.replace(/\d+:/, "");
    option.price = extractIntFromStr(priceText.replace(/\D+/g,""));
    option.currency =  mapCurrency(priceText.replace(/\d+/g, "").trim());
    return option;
}


//----------------------------------------------------Table view--------------------------------------------------------------//

function createTableOption(img) {
    let tour = img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    let tourInfo = tour.querySelector('[data-tourinfo]');
    let dataTitle =  tour.querySelector("[original-title], .detail-link");
    let dateAndNights = tourInfo.dataset.tourinfo.split(":");
    let option = {
        checkinDt: dateAndNights[0],
        nights: dateAndNights[1],
        hotelName: getText(dataTitle),
        href:  extractHref(getNodeProperty(dataTitle, '', "href")),
        country: SEARCH_CRITERIA.country,
        region: getText(tour.querySelector(".right-offset .h7, .city-name")),
        roomType: tourInfo.dataset.room.replace(/\d+:/, ""),
        boardType: tourInfo.dataset.mealplan.replace(/\d+:/, ""),
        price: extractIntFromStr(tourInfo.dataset.price),
        currency: mapCurrency(tourInfo.dataset.currency),
        city_from: SEARCH_CRITERIA.city_from,
        operator: OPERATOR_NAME,
        thumbnail: (dataTitle.dataset.title || "").replace(/.+?'/,"").replace(/'.+/,""),
        occupancy: SEARCH_CRITERIA.occupancy,
        excursion: false
    };
    return option;
}

//----------------------------------------------------Table view (Hotel)--------------------------------------------------------------//

function createHotelTableOption(img) {
    let tour = img.parentNode.parentNode.parentNode
    let tourInfo = tour.querySelector('[data-mealplan]');
    let price = getText(tour.querySelector('.price.new, .eur-currency, .price-button '));
    let image = tour.querySelector("[data-image]");
    const date = dateFromHref();
    let option = {
        checkinDt :date.date,
        nights: date.nights,
        hotelName: getHotelName(tour),
        href: extractHref(getNodeProperty(tour.querySelector(".h5 a"), "", "href")),
        country: lastElement(SEARCH_CRITERIA.countryHotelSearch.split(",")).trim(),
        region: getText(tour.querySelector(".right-offset .h7")),
        roomType: tourInfo.dataset.room.replace(/\d+:/, ""),
        boardType: tourInfo.dataset.mealplan.replace(/\d+:/, ""),
        price: extractIntFromStr(price.replace(/\s+/g, "")),
        currency: mapCurrency(price.replace(/\d+|\s+/g, "")),
        city_from: SEARCH_CRITERIA.city_from,
        operator: OPERATOR_NAME,
        thumbnail: image ? image.dataset.image : null,
        occupancy: SEARCH_CRITERIA.occupancy,
        excursion: false
    };
    return option;
}

function dateFromHref() {
    const chDate =  window.location.href.match(/from_date.(\d{2}\.\d{2}\.\d{4})/) || window.location.href.match(/from_date\/(.*?)\//) ;
    const endDate = window.location.href.match(/(\d{2}\.\d{2}\.\d{4}).to_date/) || window.location.href.match(/to_date\/(.*?)\//);
    return {
        date: chDate[1],
        nights: getDistance(dayMonthYearToDate(chDate[1]), dayMonthYearToDate(endDate[1])).toString()
    }

}

function extractHref(href) {
    const id = href.match(/hotel\/(\d+)/);
    if ( !id ) {
        return href;
    }
    return `https://www.tez-tour.com/hotel.html?id=${id[1]}`;
}

//------------------------------------------------------------------Room View (Hotel)--------------------------------------------//


function createRoomOption(img) {
    let tour =  getHotelRowByImage(img);
    let tourInfo = JSON.parse(tour.querySelector('[data-favdata]').dataset.favdata);
    let dateAndNights = tourInfo.tourinfo.split(":");
    let region = getText(document.querySelector("#hotel-info-address")) .split(",");
    let option = {
        checkinDt: dateAndNights[0],
        nights: dateAndNights[1],
        hotelName: getRoomHotelName(),
        href: extractHref(window.location.href),
        country: region.pop().trim(),
        region: region.join(),
        roomType: tourInfo.room.replace(/\d+:/, ""),
        boardType: tourInfo.mealplan.replace(/\d+:/, ""),
        price: extractIntFromStr(tourInfo.price),
        currency: mapCurrency(tourInfo.currency+""),
        city_from: SEARCH_CRITERIA.city_from,
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(document.querySelector(".hotel_block  img"), null, "src"),
        occupancy: getRoomOccupancy(tourInfo),
        excursion: false
    };
    return option;
}

function getRoomHotelName() {
    let caption = getText(document.querySelector(".hotel-title-box .h3"));
    let stars = document.querySelector(".hotel-title-box .hotel_star");
    stars = stars ? stars.className.replace(/\D+/g, "") : null;
    return stars ? `${caption} ${stars}*` : caption;
}

function getRoomOccupancy(tourInfo) {
    if ( !tourInfo.searchparams || !tourInfo.searchparams.adults ) {
        return null;
    }
    return  {
        adultsCount: +tourInfo.searchparams.adults,
        childrenCount: (+tourInfo.searchparams.children + tourInfo.searchparams.infants) || null,
        childAges: tourInfo.searchparams.ages
    }
}

function getItemByTitle(items, title) {
    return items.find(item => getText(item).match(title));
}

function getItemText(item) {
    return getText(item.querySelector(".type"));
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains("hotel_point") || div.classList.contains("room-rates-field")) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
