window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || "Unknown" : "Unknown";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME} SEARCH`);

function initializeSearchCriteria() {
    let country = getCountry();
    if ( !country ) {
        return null;
    }
    return {country, occupancy: getOccupancy()};
}

function getCountry() {
    return getNodeData('#country_to-select', document, 'innerText');
}

function getSearchButton() {
    return $1('[data-test="submit-button"]');
}

function injectData() {
    if ( window.ADDED_BUTTONS ) {
        const allButtons = window.ADDED_BUTTONS.entries();
        for (const [div, {newCell}] of allButtons) {
            if ( newCell.offsetHeight === 0 ) {
                newCell.remove()
                window.ADDED_BUTTONS.delete(div);
            }
        }
    }
    $$(".accommodation").forEach(div => {
        if ( !window.ADDED_BUTTONS.has(div) ) {
            createShadowButtons({data: {align: "qq-horizontal", cssText: 'margin-left:12px'}}, div)
        }
    });
    $$(".order-container .order-container__actions").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const {container,} = createQuickBookingContainer({action: createQBOption});
            div.append(container);
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const isRatingBtn = img.classList.contains("qq-rating-btn")
    const [hotelName, region] = getNodeData('.hotel', tour, 'innerText').split(/\n/);
    const price = (getNodeData('.prices .btn-primary', tour) || getNodeData('.prices button', tour)).replace(/\s+/g, '');
    const flight = getFlight(tour);
    const [hotel_desc, thumbnail] = !isRatingBtn ? await getThumbnail(tour) : [];
    let option = {
        checkinDt: parseDateToco($1('.departure_from', tour)) || getNodeData('#date_from-datepicker', document, 'value'),
        nights: getNodeData('.nights .text-bold', tour).replace(/\D+/, ''),
        extra_nights: getNodeData('.nights .badge', tour, 'textContent', '').replace(/\D+/, ''),
        hotelName,
        hotel_desc,
        href: null,
        country: SEARCH_CRITERIA ? SEARCH_CRITERIA.country : null,
        region,
        roomType: getNodeData('.accommodation', tour, 'innerText').split(/\n/).join(', '),
        boardType: getNodeData('.meals', tour, 'innerText'),
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price),
        city_from: getCityFromFlight(flight),
        operator: window.OPERATOR_NAME,
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null,
        flight,
        thumbnail
    };
    return option;
}

async function getThumbnail(tour) {
    try {
        const hotelPointer = $1('.hotel .hotel-with-details', tour);
        if ( hotelPointer ) {
            hotelPointer.click();
            const imageSrc = await waitingFor(findImage, 200, 10);
            const description = $$('.hotel-container .hotel-container__property').reverse()[0];
            const closeBtn = $1('.icon.multiply__ui--icon.cursor-pointer');
            if ( closeBtn ) {
                simulateEvent(closeBtn, 'click');
            }
            return [getNodeProperty(description, null, 'innerHTML'), imageSrc];
        }
        return [];
    } catch (e) {
        return [];
    }
}

function findImage() {
    const src = getNodeData('.hotel-container li.is-active img.main-image', document, 'src');
    if ( src && src.match('empty') ) {
        return null;
    }
    return src;
}

function getFlight(tour) {
    try {
     const sectors = $$('.departure_from, .departure_to', tour);
     if ( sectors.length === 0 ) {
         return null
     }
     return {
         sectors: sectors.map(parseSector)
     }

    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSector(cell) {
    const parts = getText(cell, 'innerText').split(/\n/);
    const departureDate = parseDateToco(cell);
    const departureAirportID = parts[3];
    const arrivalAirportID = parts[4];
    return {segments: [new FlightSegment({
        flightNumber: [parts[5], parts[6]].join(''),
        departureDate,
        departureTime: parts[2],
        departureCity: getDataByCode(departureAirportID, 'region'),
        departureAirportID,
        arrivalCity: getDataByCode(arrivalAirportID, 'region'),
        arrivalAirportID,
    })]}
}

function parseDateToco(target) {
    try {
        if ( !target ) {
            return null;
        }
        return dateFromDayAndMonthName(...getNodeData('.fw-bold', target).split(/\s+/))
    } catch (e) {
        return null;
    }

}

function getOccupancy() {
    try {
        return {
            adultsCount: Number(getNodeData('#adults-select', document, 'innerText')),
            childrenCount: Number(getNodeData('#kids-select', document, 'innerText')),
            childAges: $$('[id*="child_"]').map(sel => getText(sel, 'innerText')).join()
        };
    } catch (e) {
        console.log(e);
        return null;
    }
}

function getHotelRowByImage(img) {
    return (img.tourRow || img).closest('div[data-key]');
}

function createEditPopupIframeCustom(doc) {
    const iframe = doc.createElement('div');
    iframe.style.cssText = `
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: auto;
    background-color: #06060699;
    border: none;
    z-index: 999999;
    padding-top: 5%;
    `
    return iframe;
}


async function createQBOption(img) {
    const modal = img.closest('.order-container');
    const id = getNodeData('.order-container__title', modal).match(/ID:\s*(\d+)/)[1]
    const auth = JSON.parse(localStorage.getItem('credentials'))
    const response = await fetch(`${location.origin}/api/orders/${id}`, {
        headers: {
            "Authorization": `${auth.token_type} ${auth.access_token}`
        }
    }).then(resp => resp.json());

    const hotels = response.hotels.map(parseHotel)
    const insurance = parseInsurance(response.medical_insurances[0]);
    const transfers = parseTransfer(response.transfers);
    const prices = new Prices();
    prices.addPriceAuto(response.order_price, response.order_total_sum, response.currency);
    const cachedPassengers = response.hotels[0].tourists.map(extractPassengerInfo)
    let option = {
        checkinDt: "",
        nights: "",
        hotelName: "",
        hotel_desc: "",
        href: "",
        country: "",
        region: "",
        roomType: "",
        boardType: "",
        operator: OPERATOR_NAME,
        transfers,
        insurance,
        hotels,
        prices,
        cachedPassengers,
        flight: getFlight(response.charter)
    };
    return option;

    function getFlight(tickets) {
        try {
            const sectors = [tickets[0].fly_segments_there, tickets[0].fly_segments_back].map(parseSector)
            return {sectors}
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    function parseTransfer(transfer) {
        return [...transfer[0].airport_hotel, ...transfer[0].hotel_airport].map(t => {
            return new quickBookingValue({
                description: `${t.name}, ${t.destination.from} -> ${t.destination.to}`,
                dateStart: t.date
            })
        });
    }

    function parseInsurance(ins) {
        const [dateStart, dateEnd] = ins.validity.split(/\s*\-\s*/)
        return [new quickBookingValue({
            description: ins.type,
            dateStart,
            dateEnd
        })]
    }

    function parseSector(sector) {
        const segments = sector.map(parseSegment)
        return {segments}
    }

    function parseSegment(segment) {
        const [departureTime, arrivalTime] = segment.fly_time.split(/\s*\-\s*/)
        return new FlightSegment({
            flightNumber: `${segment.prefix} ${segment.flight}`,
            airline: segment.airline,
            departureDate: segment.departure_date,
            departureTime,
            departureCity: segment.destination.city_from,
            departureAirportID: segment.destination.airport_from,
            arrivalDate: compareTime(departureTime, arrivalTime) ? addDaysToStringDate(segment.departure_date, 1) : segment.departure_date,
            arrivalTime,
            arrivalCity: segment.destination.airport_to,
            arrivalAirportID: segment.destination.city_from,
        })
    }

    function parseHotel(obj) {
        return {
            nights: String(obj.days),
            dateStart: obj.check_in,
            hotelName: [obj.name, obj.category].join(' '),
            roomType: obj.room,
            accommodation: obj.placement,
            boardType: obj.meal,
            region: obj.city,
            country: ""
        }
    }

}


//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createQBOption(button);
    const {
        transfers,
        insurance,
        hotels,
        prices, cachedPassengers
    } = tourOptions
    return {
        cachedPassengers,
        insurance,
        transfers,
        hotels,
        tourOptions,
        prices
    };
}

function parsePassengers(_, cachedPassengers) {
    return cachedPassengers;
}

function extractPassengerInfo(obj) {
    const [lastName, firstName] = obj.name.split(/\s+/);
    const passenger = new Passenger({
        birthday: obj.birthday.match(getRegexPatterns().date).toString(),
        issueDate: '',
        expire: obj.passport.match(getRegexPatterns().date).toString(),
        lastName,
        firstName,
        nationality: obj.citizenship,
        title: obj.category,
        number: obj.passport.split(/\s+/)[0],
        docType: 'internationalPassport'
    });
    return passenger;
}
