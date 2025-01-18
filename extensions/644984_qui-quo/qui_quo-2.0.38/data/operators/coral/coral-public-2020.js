window.OPERATOR_NAME = window.location.host.match(/coral/i) ?  "Coral" : "Sunmar";
const showTopHotelsRating = true;
let getFlight = null;

function initializeSearchCriteria() {
    try {  //fixed JSON parse
        const searchForm = document.querySelector("[data-searchparams]");
        if ( !searchForm ) {
            return null;
        }
        const searchData = JSON.parse(searchForm.dataset.searchparams);
        const query = searchData.OnlyHotelQuery || searchData.PackageSearchQuery;
        const destObj = (query.Destination[0] || query.Destination || {});
        return {
            countryTitle: destObj.TitleRu || destObj.ParentTitleRu,
            countryParentTitle: destObj.ParentTitleRu,
            city_from: query.Departures ? (query.Departures[0] || {Label: ""}).Label : "",
            occupancy: getOccupancy(query.Guest)
        }
    } catch (e) {
        return null;
    }
}

function getSearchButton() {
    return querySelectorAll(document, ".hotelsearch .btn-search, .btnSubmitPackageSearch")
          .find(btn => btn.offsetHeight > 0);
}

function injectData() {
    querySelectorAll(document, ".hotellist .btn.hotellist-actionlink").forEach(div => {
        if ( !div.closest("div").querySelector(".qq") ) {
            div.after(qqBtns({align: "qq-horizontal"}, createOption));
        }
    });

    querySelectorAll(document, ".rooms .room .action").forEach(div => {
        if ( !div.querySelector(".qq") && !div.textContent.match(/Номер недоступен/) ) {
            const btns = qqBtns({align: "qq-box"}, createHotelOption);//Страница номера в отеле
            btns.style.marginLeft = "5px";
            div.append(btns);
            div.addEventListener("click", ()=>saveOptionToSessionStorage(btns.querySelector(".qq-add-btn"), createHotelOption ))
        }
    });

    querySelectorAll(document, ".flight-buttons").forEach(div => {
        if ( !div.querySelector(".qq") ) {
             getFlight = createFlightInfo;
            const btns = qqBtns({align: "qq-horizontal"}, createFlightOption);
            div.append(btns); //Страница выбора перелета
            const buyBtn = div.querySelector(".flight-buttons a");
            buyBtn.addEventListener("click", () => saveOptionToSessionStorage(btns.querySelector(".qq-add-btn"), createFlightOption));
        }
    });

    const packageSummary = document.querySelector(".packageSummary_cardWrapper .card-footer");
    if ( packageSummary && !packageSummary.querySelector('.qq') ) {
       getFlight = createFlightInfo;
        packageSummary.append(qqBtns({align: "qq-horizontal"}, createOrderOption));
    }
}

function saveOptionToSessionStorage(img, action) {
    const option = action(img);
    sessionStorage.setItem("option", JSON.stringify(option));
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotel = getHotelRowByImage(tour);
    const json = JSON.parse(tour.dataset.packageLayer.replace(/,"Price":.+?,/, ','))
    const infoBLock = hotel.querySelector(".col.info");
    const searchDetails = getText(document.querySelector(".container h1")).split("->")
                                                                                     .map(removeBrackets);
    const href = getNodeProperty(infoBLock.querySelector("a"), null, "href")
    const flightDate = json.FlightDate;
    const hotelDate= json.CheckInDate;
    let option = {
        checkinDt: flightDate ? new Date(flightDate).toLocaleDateString('ru') : new Date(hotelDate).toLocaleDateString('ru'),
        nights: String(json.Night),
        extra_nights: String((json.Day-json.Night)),
        hotelName: getHotelName(infoBLock),
        href,
        country: SEARCH_CRITERIA ? SEARCH_CRITERIA.countryTitle :  (href ? href.match(/hotels\/(.+?)\//)[1] : null),
        region: getText(hotel.querySelector(".location abbr")).split(",").map(removeBrackets).join(", "),
        roomType:  json.RoomName,
        boardType: json.Hotel.MealType.split(/\s*,\s*/)[0],
        price:  parsePrice(tour.querySelector(".action-discount-price")),
        currency: mapCurrencyUtil(getText(tour.querySelector(".currencyfont"))),
        city_from:  SEARCH_CRITERIA ? SEARCH_CRITERIA.city_from : (searchDetails.length > 1 ? searchDetails[0] : ""),
        operator: OPERATOR_NAME,
        thumbnail:  getNodeProperty(hotel.querySelector(".imagewrapper img"), null, "src"),
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null,
        excursion: false
    };
    return option;
}

function removeBrackets(text) {
    return text.replace(/\(.+\)/g,"").trim();
}

function getHotelName(infoBLock) {
    const caption = getText(infoBLock.querySelector("h2"));
    const stars = querySelectorAll(infoBLock, ".rating .material-icons").length;
    return stars > 0 ? caption + ` ${stars}*` : caption;
}

function createHotelOption(img) {
    const variant = getHotelRowByImage(img, ".variant");
    const tourParamsNode = variant.querySelector('[data-price-layer]');

    const room = getHotelRowByImage(img, ".room");
    const hotel = document.body;
    const dateAndNights = getText(hotel.querySelector("#selectRoomTypes"));
    const mealAndAcc = querySelectorAll(variant, "h4").map(h4 => getText(h4));
    const countryFromHref = window.location.href.match(/hotels\/(.+?)\//);
    const nights = tourParamsNode ? tourParamsNode.dataset.night || getHotelViewNights(room) : getHotelViewNights(room);
    let option = {
        checkinDt: dateAndNights.match(/\d{2}\.\d{2}\.\d{4}/)[0],
        nights,
        hotelName: getHotelNameHotelView(hotel),
        href: window.location.href,
        country: SEARCH_CRITERIA ? lastElement(SEARCH_CRITERIA.countryParentTitle.split(", ")).trim() : (countryFromHref ? countryFromHref[1] : null),
        region: getText(hotel.querySelector(".location span")).split(",").map(removeBrackets).join(", "),
        roomType: tourParamsNode?.dataset.Name || [getText(room.querySelector(".roominfo h4")), mealAndAcc[1]].join(", "),
        boardType: tourParamsNode?.dataset.MealType || mealAndAcc[0],
        price: parsePrice(variant.querySelector('.price')),
        currency: mapCurrencyUtil(getText(variant.querySelector(".currencyfont"))),
        city_from:  SEARCH_CRITERIA ? SEARCH_CRITERIA.city_from : 'Нет данных',
        operator: OPERATOR_NAME,
        thumbnail:  getNodeProperty(hotel.querySelector(".gallery-layout img"), null, "src"),
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null,
        excursion: false
    };
    return option;
}

function getHotelViewNights() {
    const headingText = getNodeProperty($1('.active[data-night]'));
    return headingText ? headingText.replace(/\D+/g, '') : $1('[data-night]').dataset.night; //Только поехавшие могли использовать вместо русской H латинскую H
}

function getHotelNameHotelView(hotel) {
    const caption = getText(hotel.querySelector("h1[data-hotelid]"));
    const stars = querySelectorAll(hotel, ".ratingWrapper .material-icons").length;
    return stars > 0 ? caption + ` ${stars}*` : caption;
}

function createFlightOption(img) {
    let prevPageOption = sessionStorage.getItem("option");
    const ticket = getHotelRowByImage(img,".ticket");
    const selectedHotel = document.querySelector(".selectedHotelPartial");
    const items = querySelectorAll(selectedHotel, ".hotel-info-item");
    const findItem = (caption) => items.find(item => getText(item).match(caption));
    const itemText = (caption) => getText(findItem(caption)).replace(caption, "").replace(/|/g, "").trim();
    const dates = itemText(/Даты тура:/).match(/\d{2}.\d{2}.\d{4}/g);
    const nights =  getDistance(dayMonthYearToDate(dates[0]), dayMonthYearToDate(dates[1]));
    const flight = createFlightInfo(ticket);
    let option = {
        checkinDt: flight ? flight.sectors[0].segments[0].departureDate : dates[0],
        nights: nights.toString(),
        extra_nights: getExtraNights(nights, flight),
        hotelName: getHotelNameFlightView(selectedHotel),
        href: window.location.href,
        country: SEARCH_CRITERIA ? SEARCH_CRITERIA.countryTitle : null,
        region: getText(selectedHotel.querySelector(".location")).split(",").filter(s=> !SEARCH_CRITERIA.countryTitle || !s.match(new RegExp(SEARCH_CRITERIA.countryTitle, 'i'))).map(removeBrackets).join(", "),
        roomType:  itemText(/Тип номера:/),
        boardType: itemText(/Питание:/),
        city_from:  SEARCH_CRITERIA ? SEARCH_CRITERIA.city_from : 'Нет данных',
        operator: OPERATOR_NAME,
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null,
        excursion: false,
        flight
    }

    option.price = parsePrice(ticket.querySelector('.price'));
    option.currency = mapCurrencyUtil(getText(ticket.querySelector(".currencyfont")));
    option.thumbnail = prevPageOption ? JSON.parse(prevPageOption).thumbnail : null;
    return option;
}

function parsePrice(row) {
    const priceText= $$(`*`, row).filter(elem => elem.className.split('-').length > 5).filter(p => p.clientWidth > 0)
        .map(elem => ({
            elem: getText(elem),
            order: +getComputedStyle(elem).order
        })).sort((a, b) => a.order - b.order).map(e => e.elem).join('');
    return extractIntFromStr(priceText)
}

function getExtraNights(nights, flight) {
    if ( !flight ) {
        return null;
    }
    const startDate = flight.sectors[0].segments[0].departureDate;
    const endDate = lastElement(lastElement(flight.sectors).segments).arrivalDate;
    const fullNights = getDistance(dayMonthYearToDate(startDate), dayMonthYearToDate(endDate));
    return (fullNights - nights).toString();
}

function getHotelNameFlightView(hotel) {
    const caption = getText(hotel.querySelector(".title"));
    const stars = querySelectorAll(hotel, ".rating .material-icons").length;
    return stars > 0 ? caption + ` ${stars}*` : caption;
}


function createFlightInfo(ticket) {
    try {
       let sectorsInfo = querySelectorAll(ticket, ".outbound.row, .return.row")
       const ticketDetail = ticket.querySelector(".ticket-detail");
       let sectors = querySelectorAll(ticketDetail, ".outbound, .return")
                     .map((sector, index) => ({sector, sectorInfo: sectorsInfo[index]}));
       sectors = sectors.map(parseSector);
       return {sectors}
    } catch(e) {
      console.log(e);
    }
}

function parseSector({sector, sectorInfo}) {
    const segmentInfo = querySelectorAll(sector, ".ticket-detail-segments .ticket-detail-info");
    const segment = querySelectorAll(sector, ".ticket-detail-segments .ticket-detail-segment");
    const segments = segmentInfo.map((info, index) => ({info, segment: segment[index]}))
        .map(parseSegment)
    lastElement(segments).arrivalDate = (getNodeProperty(sectorInfo.querySelector(".arrival .flight-info"), "")
                                       .match(/\d{2}\.\d{2}\.\d{4}/) || [])[0];
    const sectorTravelTime = getNodeProperty(sectorInfo.querySelector(".connection .flight-info"));
    return {segments, sectorTravelTime};
}

function parseSegment({info, segment}) {
    const summary = querySelectorAll(info, ".ticket-detail-summary span").map(clearSpanText);

    const detailInfo = querySelectorAll(info, ".ticket-detail-flight-info span")
                       .map(clearSpanText);

    const departure = segment.querySelector(".segment-departure");
    const departureAirport = (getNodeProperty(departure.querySelector(".segment-airport")) || []).split(",").map(text => text.trim());

    const arrival = segment.querySelector(".segment-arrival");
    const arrivalAirport = (getNodeProperty(arrival.querySelector(".segment-airport")) || []).split(",").map(text => text.trim());

    const parsedSegment = new FlightSegment({
         flightNumber: detailInfo[2],
         airline:  detailInfo[0],
         travelTime: summary[1],
         plane :detailInfo[3],
         departureDate: summary[0],
         departureTime: (getNodeProperty(departure.querySelector(".segment-hour"), "")),
         departureCity: departureAirport[1],
         departureAirport: departureAirport[0],
         serviceClass: detailInfo[1],
         arrivalTime: (getNodeProperty(arrival.querySelector(".segment-hour"), "")),
         arrivalCity: arrivalAirport[1],
         arrivalAirport: arrivalAirport[0]
     });
    return parsedSegment;
}

function clearSpanText(span) {
    return getText(span).replace(/\s*-\s*/, "");
}

function createOrderOption(img) {
    let prevPageOption = sessionStorage.getItem("option");
    if ( prevPageOption ) {
        prevPageOption = JSON.parse(prevPageOption);
    }
    const card = getHotelRowByImage(img, ".packageSummary_cardWrapper");
    const checkinDate = getText(card.querySelector(".checkin .date"));
    const checkoutDate = getText(card.querySelector(".checkout .date"));
    const countryFromHref = window.location.href.match(/hotels\/(.+?)\//);
    const nights = getDistance(dayMonthYearToDate(checkinDate), dayMonthYearToDate(checkoutDate));
    const flight =  prevPageOption ? prevPageOption.flight : null;
    let option = {
        checkinDt: checkinDate,
        nights: nights.toString(),
        extra_nights: getExtraNights(nights, flight),
        hotelName: getHotelNameOrderView(card),
        href: window.location.href,
        country: SEARCH_CRITERIA ? SEARCH_CRITERIA.countryTitle : (countryFromHref ? countryFromHref[1] : null),
        region: getText(card.querySelector(".destination")).split(",").map(removeBrackets).join(", "),
        roomType:  getText(card.querySelector(".roomConcept")),
        boardType: [card.querySelector(".roomType")].map(clearSpanText).join(),
        price: extractIntFromStr(getText(card.querySelector(".totalprice")).replace(/\s+/g, "")),
        currency: mapCurrencyUtil(getText(card.querySelector(".currencyfont"))),
        city_from:  SEARCH_CRITERIA ? SEARCH_CRITERIA.city_from : 'Нет данных',
        operator: OPERATOR_NAME,
        thumbnail: prevPageOption ? prevPageOption.thumbnail : null,
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null,
        excursion: false,
        flight
    };
    return option;
}

function getHotelNameOrderView(card) {
    const caption = getText(card.querySelector(".hotelTitleAndDestination .hotelTitle"));
    const stars = querySelectorAll(card, ".stars .material-icons").length;
    return stars > 0 ? caption + ` ${stars}*` : caption;
}

function getOccupancy(Guest) {
    try {
        return {
            adultsCount: Guest.Adults,
            childrenCount: Guest.Children.length,
            childAges: Guest.Children.map(age => age.toString()).join() || null
        }
    } catch
        (e) {
        return null;
    }
}

function getHotelRowByImage(img, sel = ".row") {
    return img.closest(sel);
}

const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if ( hours === '12' ) {
        hours = '00';
    }
    if ( modifier === 'PM' ) {
        hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
}
