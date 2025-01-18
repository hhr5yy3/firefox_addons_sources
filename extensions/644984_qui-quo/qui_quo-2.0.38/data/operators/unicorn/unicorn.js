let OPERATOR_NAME = "Unicorn";

function initializeSearchCriteria() {
    const datepicker = querySelectorAll(document, ".Datepicker input");
    const checkinDt =  getNodeProperty(datepicker.find( inp => inp.offsetHeight > 0 && inp.parentNode.textContent.match(/заезд/i) ), null, "value");
    const checkOutDate = getNodeProperty(datepicker.find( inp => inp.offsetHeight > 0 && inp.parentNode.textContent.match(/Выезд/i) ), null, "value");
    if ( !checkinDt || !checkOutDate ) {
        return null;
    }
    const nights = getDistance(dayMonthYearToDate(checkinDt), dayMonthYearToDate(checkOutDate))+"";
    const occupancy = getOccupancy(checkOutDate);
    const cityNode = document.querySelector(`#select2-tour_search_arrival_region-container`);
    return {
        checkinDt: checkinDt,
        nights: nights,
        city : cityNode && cityNode.offsetHeight ? getNodeProperty(cityNode, "", "title") : "",
        occupancy: occupancy,
        pathname: window.location.pathname
    };
}

function getSearchButton() {
    return document.querySelector(".SearchBar button.Button_accent, button[aria-label='Искать']");
}

function injectData() {
    if ( !SEARCH_CRITERIA ) {
        return;
    }
    querySelectorAll(document, ".TourCard .Button_accent, .TourCard .Button_red").forEach( elem => {
       if ( getText(elem).match(/\d/) && !elem.parentNode.parentNode.querySelector(".qq") ) {
           let btns = qqBtns({align: "qq-horizontal"});
           elem.parentNode.parentNode.append(btns);
       }
    });

    querySelectorAll(document, ".TourPage .old_col .row .Button_accent").forEach(elem => {
        if ( elem && getText(elem).match(/забронировать/i) && !elem.parentNode.querySelector(".qq") ) {
            let btns = qqBtns({align: "qq-horizontal"}, createHotelSearchOption);
            btns.style.marginLeft = '92%';
            elem.after(btns);
        }
    });
}

function getFlight() {
    return true;
}

function createOption(img) {
    if ( SEARCH_CRITERIA.pathname !== window.location.pathname ) {
        SEARCH_CRITERIA = initializeSearchCriteria();
    }
    let tour = getHotelRowByImage(img);
    let region = getNodeProperty(tour.querySelector(".unicorn-map, .ib_location").parentNode, "").trim().split(",");
    let setReg = new Set(region);
    setReg.delete(region[0]);
    const txtoels = querySelectorAll(tour, ".old_col .txtoel.capitalize");
    let roomAndBoard = tour.querySelector(".icon_bed") ||txtoels.find( div => getText(div).includes(" / ") );
    roomAndBoard = getNodeProperty(roomAndBoard, "").split("/");
    const flight = getSearchFlight(tour);
    const segments = flight ? flight.sectors.flatMap(sector => sector.segments) : null;
    let option = {
        checkinDt: flight ? segments[0].departureDate : SEARCH_CRITERIA.checkinDt,
        nights: flight ?
            getDistance(...[segments[0].departureDate, lastElement(segments).arrivalDate].map(dayMonthYearToDate)).toString() :
            SEARCH_CRITERIA.nights,
        hotelName: getHotelName(tour),
        href: getNodeProperty(tour.querySelector("a.unicorn-building, a.ib_hotelB"), window.location.href, "href"),
        roomType: roomAndBoard[0].trim(),
        region: Array.from(setReg).join(", "),
        boardType: roomAndBoard[1].trim() || "",
        price: extractIntFromStr(tour.querySelector(".Button_accent, .Button_red").textContent.replace(/\s+/g, "")),
        currency: tour.querySelector(".icon_rubleW") ? "RUB" : "",
        country: region[0],
        city_from: flight ? segments[0].departureAirportID : SEARCH_CRITERIA.city,
        excursion: false,
        thumbnail: getNodeProperty(tour.querySelector(".HotelCard-Image img"), null, "src"),
        occupancy: SEARCH_CRITERIA.occupancy,
        flight: flight
    };
    return option;
}

function getSearchFlight(tour) {
    try {
        const sectors = querySelectorAll(tour, '.Flight').map(sector => {
            const dates = querySelectorAll(sector, '.FlightSegmentTime').map(getSectorDates);
            const flightRoutes = querySelectorAll(sector, '.FlightRoute').map(route => getText(route));
            const airportsId = flightRoutes[1].split('-').map(trim)
            const segment = new FlightSegment(
                {
                    flightNumber: getNodeProperty(querySelectorAll(sector, '._old_row')
                        .find(row => getText(row).match(/рейс/i))
                        .querySelector('.monobold')),
                    departureDate: dates[0].date,
                    departureTime: dates[0].time,
                    departureAirportID: airportsId[0],
                    arrivalDate: dates[1].date,
                    arrivalTime: dates[1].time,
                    arrivalAirportID: airportsId[1]
                }
            )

            return {segments: [segment]}
        });
        return sectors.length > 0 ?  {sectors: sectors} : null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

function getSectorDates(date) {
    const text = getText(date);
    return {
        date: (text.match(/\d{2}\.\d{2}\.\d{4}/) || [])[0],
        time: (text.match(/\d{2}:\d{2}/) || [])[0]
    }
}


function getDate(name) {
    return document.querySelector(`input[name="${name}"]`).value;
}

function getHotelName(tour) {
    let name = getNodeProperty(tour.querySelector(".unicorn-building, .ib_hotelB").parentNode);
    const stars = " " + querySelectorAll(tour, "div.unicorn-star").length + "*";
    name =  name.replace(stars, "").replace(/0\*/, "");
    return (name + stars).trim();
}

function createHotelSearchOption(img) {
    const tourPage = document.querySelector('section.TourPage');
    const tour = getHotelRowByImage(img).parentNode;
    const region = getNodeProperty(tourPage.querySelector('h1[itemprop="name"]').nextElementSibling, '').split(",");
    let setReg = new Set(region);
    setReg.delete(region[0]);
    const flight = getHotelSearchFlight(tourPage);
    const segments = flight ? flight.sectors.flatMap(sector => sector.segments) : null;
    let option = {
        checkinDt: SEARCH_CRITERIA.checkinDt,
        nights: SEARCH_CRITERIA.nights,
        hotelName: getHotelNameSearch(tourPage),
        hotel_desc: getNodeProperty(tourPage.querySelector('[itemprop="description"]')),
        href: window.location.href,
        country: region[0],
        region: Array.from(setReg).join(", "),
        roomType: getText(tour.querySelector('h3.semibold')),
        boardType: getText(tour.querySelector('.unicorn-hamburger').parentNode),
        price: extractIntFromStr(getText(tour.querySelector('[itemprop="price"]')).replace(/\s+/g, "")),
        currency: tour.querySelector('[itemprop="priceCurrency"]').getAttribute('content'),
        city_from: flight ? segments[0].departureAirportID : "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(tourPage.querySelector('img[itemprop="photo"]'), null, 'src'),
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null,
        flight: flight
    };
    return option;
}

function getHotelNameSearch(tour) {
    let name = getNodeProperty(tour.querySelector('h1[itemprop="name"]'));
    const stars = " " + querySelectorAll(tour, '[itemprop="starRating"] div.unicorn-star').length + "*";
    name = name.replace(stars, "").replace(/0\*/, "");
    return (name + stars).trim();
}

function getHotelSearchFlight(tourPage) {
    try {
        const sectors = querySelectorAll(tourPage, 'select[name="tour_departure"]')
            .map( select => selectedOption(select))
            .map(text => {
            const dates = text.match(/\d{2}\.\d{2}\.\d{4}/g);
            const times = text.match(/\d{2}:\d{2}/g);
            const airportsId = text.match(/([A-Z]{3,4})-([A-Z]{3,4})/)
            const segment = new FlightSegment(
                {
                    flightNumber:text.match(/([A-Z1-9]{2}\s+\d{4})/)[1],
                    departureDate: dates[0],
                    departureTime: times[0],
                    departureAirportID: airportsId[1],
                    arrivalDate: dates[1],
                    arrivalTime: times[1],
                    arrivalAirportID: airportsId[2]
                }
            )

            return {segments: [segment]}
        });
        return sectors.length > 0 ? {sectors: sectors} : null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

function getOccupancy(checkOutDate) {
    let occupancy = {
        adultsCount: 2,
        childrenCount: 0,
        childAges: null
    };
    let adults = document.querySelector("#adult_count_text");
    let children = document.querySelector("#child_count_text");
    if ( !adults ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(getText(adults));
    occupancy.childrenCount = extractIntFromStr(getNodeProperty(children), "0");
    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = querySelectorAll(document, '.child-age-date input').map(input => ageFromDate(input.value, checkOutDate)).join();
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    let elem = img.parentNode;
    while (elem) {
        if ( elem.classList.contains("TourCard") || elem.classList.contains("row")) {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}