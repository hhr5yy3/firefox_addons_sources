window.OPERATOR_NAME = "География";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const searchPrevContainers = $$('.search-preview').map(cont => {
        return {
            header: getNodeData('.search-preview-header', cont),
            text: getNodeData('.search-preview-data', cont)
        }
    });
    return {
        city_from: searchPrevContainers.find(cont => cont.header=== 'Город вылeта'),
        country: searchPrevContainers.find(cont => cont.header === 'страна'),
        occupancy: getOccupancy(searchPrevContainers.find(cont => cont.header === 'туристы'))
    };
}

function getSearchButton() {
    return $1('.search-button');
}

function injectData() {
    $$(".agency--mini-tour").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-box", cssText: 'margin-left:8px;'}));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelCard = searchHotelCard(tour);
    const [country, region] = getNodeData('.tour-hotel__title', hotelCard).split(/\s*,\s*/);
    const isForRating = img.classList.contains('qq-rating-btn');
    let option = {
        checkinDt: getNodeData('.price__nights', tour).match(getRegexPatterns().date).toString(),
        nights: getNodeData('.price__nights span', tour).replace(/\D+/g, ''),
        hotelName: getNodeData('.hotelname', hotelCard),
        hotel_desc: getNodeData('.tour-hotel__description', hotelCard),
        href: null,
        country: country || SEARCH_CRITERIA.country.text,
        region,
        roomType: getNodeData('.price__place', tour, 'innerText'),
        boardType: getNodeData('.price__meal', tour, 'innerText'),
        price: parseInt(getNodeData('.price__price', tour).replace(/\D+/g, '')),
        currency: getNodeData('.price__price small', tour),
        city_from: SEARCH_CRITERIA.city_from ? SEARCH_CRITERIA.city_from.text : "",
        thumbnail: getNodeData('.js-tour-hotel__image', hotelCard, 'src'),
        occupancy: SEARCH_CRITERIA.occupancy ? SEARCH_CRITERIA.occupancy : null,
        flight: isForRating ? null : await getFlight(tour)
    };
    return option;
}

async function getFlight(tour) {
    try {
      const flightClockButton = $1('.flight-clock', tour);
      flightClockButton.click();
      const miniPopup = await waitingFor(()=>$1('.flight-info__popup', tour), 100, 20);
      if ( miniPopup ) {
          const closeButton = $1('.popup__close', miniPopup);
          const sectors = $$('.flight-info__popup > div', miniPopup)
              .filter(div => div.childElementCount === 3).map(parseSector)
          closeButton.click();
          return {sectors};
      }
    } catch (e) {
        console.log(e)
        return getNewPopupFlight();
    }
}

function parseSector(sector) {
    const [date, _, time] = $$('div', sector).extractNodesText();
    const departureDate = String(date.match((getRegexPatterns().date)));
    const times = time.match(getRegexPatterns().time)
    const [departure, arrival] = $$('.deparive').extractNodesText().map(str => str.split(/\s*,\s*/));
    return {segments: [new FlightSegment({
        departureDate,
        departureTime: times[0],
        departureCity: departure[0],
        departureAirport: departure[1],
        arrivalDate: compareTime(times[0], times[1]) ? addDaysToStringDate(departureDate, 1) : departureDate,
        arrivalTime: times[1],
        arrivalCity: arrival[0],
        arrivalAirport: arrival[1],
    })]}
}

async function getNewPopupFlight(tour) {
    try {
        const miniPopup = await waitingFor(() => $1('.flight-info__popup', tour), 100, 20);
        if (miniPopup) {
            const closeButton = $1('.popup__close', miniPopup);
            const sectors = $$('.flight-info__popup > div', miniPopup)
                .filter(div => div.childElementCount === 3).map(parseNewSector)
            return {sectors};
        }
    } catch (e) {
        console.log(e)
        return null
    }
}


function parseNewSector(sector) {
    const departureDate = getNodeData('.tour_date', sector);
    const times = $$('.direction .time', sector).extractNodesText()
    const [departure, arrival] = $$('.deparive', sector).extractNodesText().map(str => str.split(/\s*,\s*|\s+/));
    return {
        segments: [new FlightSegment({
            departureDate,
            departureTime: times[0],
            departureCity: departure[0],
            departureAirport: departure[1],
            arrivalDate: compareTime(times[0], times[1]) ? addDaysToStringDate(departureDate, 1) : departureDate,
            arrivalTime: times[1],
            arrivalCity: arrival[0],
            arrivalAirport: arrival[1],
        })]
    }
}

function searchHotelCard(tour) {
    let searchResult = tour.parentNode;
    while ( searchResult ) {
        const hotelCard = searchResult.classList.contains('tour-hotel__card');
        if ( hotelCard ) {
            return searchResult;
        }
        searchResult = searchResult.previousElementSibling;
    }
    return null;
}

function getOccupancy(node) {
    try {
        const text = node.text;
        const occupancy = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null
        };
        occupancy.adultsCount = extractIntFromStr((text.match(/(\d+)\s*взр/) || "00")[1]);
        occupancy.childrenCount = extractIntFromStr((text.match(/(\d+)\s*реб/) || "00")[1]);
        if ( !occupancy.adultsCount ) {
            return null;
        }
        return occupancy;

    } catch (e) {
        console.log(e);
        return null;
    }

}

function getHotelRowByImage(img) {
    return img.closest('.agency-mini-tour');
}
