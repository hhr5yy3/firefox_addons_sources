const OPERATOR_NAME = "Алеан";
window.showTopHotelsRating = true;
window.injectionSelector = '.bookingTotalCost';

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    querySelectorAll(document, ".bookingTotalCost").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const activeTab = getNodeProperty(document.querySelector('.bookingMenu-contentItem--active'), '');
            if ( !activeTab ) {
                return;
            }
            div.append(qqBtns({align: "qq-horizontal"}));

            if (activeTab.match(/БРОНИРОВАНИЕ/i) || activeTab.match(/ТУРИСТЫ/i)) {
                div.after(createExportButton({
                    classes: ['btn', 'btn-danger'],
                    cssText: 'margin-top:5px;margin-bottom:5px;'
                }));
            }
        }
    });
}

async function createOption(img) {
    const abode = await getAbode(img);
    const tour = getHotelRowByImage(img);
    const dates = tour.querySelector(".bookingSummaryAbodeInfo-descCell").textContent.trim().match(/\d{2}.\d{2}.\d{4}/g);
    const flight = getFlight();
    const price = getText(document.querySelector(".bookingTotalCost-value, .bookingTotalCost-sumValue")).replace(/\D+/g, "")
    const currency = mapCurrency(getText(document.querySelector(".bookingTotalCost-currency, .bookingTotalCost-sumCurrency")));

    const prices = new Prices();
    prices.nationalGrossPrice = price;
    prices.nationalCurrency = currency;

    let option = {
        checkinDt: dates[0],
        nights: getDistance(dayMonthYearToDate(dates[0]), dayMonthYearToDate(dates[1])).toString(),
        hotelName: getText(tour.querySelector(".bookingSummaryAbodeInfo-hotelName")),
        href: getNodeProperty(tour.querySelector("a.bookingSummaryAbodeInfo-hotelName"), null, "href"),
        country: abode ? abode.hotel.parents.country : "",
        region: abode ? [abode.hotel.parents.dir, abode.hotel.parents.res].filter(s=>s).join() : "",
        roomType: getRoomType(tour),
        boardType: getNodeProperty(tour.querySelector(".bookingServiceItem"), "").replace(/питание:/i,""),
        price,
        currency,
        prices,
        city_from: flight ? flight.sectors[0].segments[0].departureAirport : '',
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(tour.querySelector(".bookingSummaryAbodeInfo-img img"), null, "src"),
        occupancy: getOccupancy(tour),
        flight: flight
    };
    if ( abode ) {
        try {
            option.boardType = abode.sList ? Object.values(abode.sList).filter(s => s.ServiceTypeName.match(/питание/i)).map(s => s.Name).join(', ') : option.boardType;
            option.country = abode.hotel ? abode.hotel.parents.country : "";
            option.region = abode.hotel ? [abode.hotel.parents.dir, abode.hotel.parents.res].filter(s => s).join(', ') : "";
        } catch(e) {
            return option;
        }
    }
    return option;
}

async function getAbode(img) {
    try {
        const href = window.location.href;
        const query = {
            "line": getParameterByName('line', href),
            "ftsptown": getParameterByName('ftsptown', href),
            "tspline": getParameterByName('tspline', href),
            "tnline": getParameterByName('tnline', href),
            "diffcomm": getParameterByName('diffcomm', href),
            "ksbtid": getParameterByName('ksbtid', href),
            "uid": getParameterByName('uid', href),
            "step": getParameterByName('step', href)
        }
        const result = await fetchTimeout(10000, fetch('https://www.alean.ru/ksb-gate/agency/booking/session/', {
            "headers": {
                "content-type": "application/json;charset=UTF-8"
            },
            "body": JSON.stringify({query}),
            "method": 'POST'
        })).then(resp => resp.json());
        return result.abode;
    } catch(e) {
        return null;
    }
}

function getRoomType(tour) {
    const room = getText(tour.querySelector(".bookingSummaryAbodeInfo-roomName"));
    const accommodation = $$('.bookingSummaryAbodeInfoPlacing-tourist', tour).map( place => {
         const count = $$('.bookingSummaryAbodeInfoPlacing-touristIcon', place).length;
         const caption = getText(place);
         return [count, caption].join(' ');
    }).join(' + ');
    return [room, accommodation].join(', ');
}

function getOccupancy(tour) {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    let childs = [];
    const adults = querySelectorAll(tour, ".fa-male").filter( adult => {
        const item = getText(adult.parentNode.parentNode);
        if ( item.match(/ТУРИСТ БЕЗ МЕСТА/i) ) {
            childs.push("0-1");
            return false;
        }
        return true;
    });
    if ( adults.length < 1 ) {
        return null;
    }
    occupancy.adultsCount = adults.length;
    childs = childs.concat(querySelectorAll(tour, ".fa-child").map( child => getText(child.parentNode.parentNode).replace(/[А-я]+/ig, "").trim().replace(/\s+/, "-")));
    occupancy.childrenCount = childs.length;
    occupancy.childAges = childs.join();
    return occupancy;

}

function getFlight() {
    try {
        const tripWay = document.querySelector(".bookingSummaryTicketInfoTrip");
        if ( !tripWay ) {
            return null;
        }
        const sectors = querySelectorAll(tripWay,".bookingSummaryTicketInfoTrip-wayArea").map(sector => parseSector(sector));
        return { sectors: sectors }
    } catch(e) {
        return null;
    }

}

function parseSector(sector) {
    const depDate = getText(sector.querySelector(".bookingSummaryTicketInfoTrip-descDep .bookingSummaryTicketInfoTrip-flightDate [ng-bind*='depDT']")).split(" ");
    const arrDate = getText(sector.querySelector(".bookingSummaryTicketInfoTrip-descArr .bookingSummaryTicketInfoTrip-flightDate [ng-bind*='arrDT']")).split(" ");
    const sectorTravelTime =  getNodeProperty(sector.querySelector(".bookingSummaryTicketInfoTrip-flightDuration"));
    return {
        segments: [new FlightSegment({
            flightNumber: getText(sector.querySelector(".bookingSummaryTicketInfoTrip-number")).replace(/рейс\s*/i, ''),
            airline: getText(sector.querySelector(".bookingSummaryTicketInfoTrip-company")).replace(/«|»/g, ''),
            departureDate: dateFromDayAndMonthName(...depDate),
            departureTime: getText(sector.querySelector(".bookingSummaryTicketInfoTrip-descDep .bookingSummaryTicketInfoTrip-flightTimeVal")),
            departureAirport: getText(sector.querySelector(".bookingSummaryTicketInfoTrip-descDep .bookingSummaryTicketInfoTrip-airport")),
            arrivalDate: dateFromDayAndMonthName(...arrDate),
            arrivalTime: getText(sector.querySelector(".bookingSummaryTicketInfoTrip-descArr .bookingSummaryTicketInfoTrip-flightTimeVal")),
            arrivalAirport: getText(sector.querySelector(".bookingSummaryTicketInfoTrip-descArr .bookingSummaryTicketInfoTrip-airport")),
            baggage: getText(sector.querySelector('[ng-bind*="way.bag"]'))
        })], sectorTravelTime
    }
}

function mapCurrency(c) {
    switch (c.toLowerCase()) {
        case "р.":
            return "RUB";
        default:
            return c;
    }
}

function getHotelRowByImage() {
    return document.querySelector(".bookingOk");
}

//------------------------------quickBooking----------------------------------------------------------//

function createQuickBookingOption(button) {

    let commission = getNodeData('.bookingCommission-value', document, 'textContent', '');
    if ( !commission ) {
        const toggleIcon = $1('.bookingCommission-toggleIcon');
        if ( toggleIcon ) {
            toggleIcon.click();
            commission = getNodeData('.bookingCommission-value', document, 'textContent', '');
            toggleIcon.click();
        }
    }

    commission = parseFloat(commission.replace(/\D+/g, ''));
    const commissionCurrency = 'RUB';
    return {
        commission,
        commissionCurrency,
        transfers: $$('.bookingOk-itemArea[ng-if*="vm.stages.transfer"]').flatMap(trans => parseTransfers(trans)),
        flightType: getNodeData('.bookingSummaryTicketInfoTrip-ticketType', document, 'textContent', '').match(/Регулярный/i) ? 'Scheduled' : 'Charter'
    };
}

function parseTransfers(transfer) {
    const seemoreBtn = $1('.bookingOk-itemCell--toggle a', transfer);
    if ( !getNodeData('[ng-bind*="vm.transferFormData.directDate"]') && seemoreBtn ) {
        seemoreBtn.click();
    }
    const title = getNodeProperty(transfer.querySelector('.bookingSummaryTransferInfo-title'));
    const backDate = (getNodeProperty(transfer.querySelector('[ng-if="vm.transferFormData.backDate"], [ng-bind*="vm.transferFormData.backDate"]'), '').match(getRegexPatterns().date) || [])[0]
    const transfers = [
        new quickBookingValue({
            caption: getNodeProperty(transfer.querySelector('h2')),
            description: [title, getNodeProperty(transfer.querySelector('[ng-if="vm.transferFormData.directDate"] .bookingSummaryTransferInfo-itemLabel'), '').replace(/\s+/, ' -> ')].join(', '),
            dateStart: (getNodeProperty(transfer.querySelector('[ng-if="vm.transferFormData.directDate"], [ng-bind*="vm.transferFormData.directDate"]'), '').match(getRegexPatterns().date) || [])[0]
        }), new quickBookingValue({
            caption: getNodeProperty(transfer.querySelector('h2')),
            description: [title,
                getNodeProperty(transfer.querySelector('[ng-if="vm.transferFormData.backDate"] .bookingSummaryTransferInfo-itemLabel'), '').replace(/\s+/, ' -> '),
                backDate ? '' : 'Дата: ' + getNodeProperty(transfer.querySelector('[ng-if="vm.transferFormData.backDate"] .bookingSummaryTransferInfo-itemDesc'), '')].filter(s=>s).join(', '),
            dateStart: backDate
        })
    ]

      return transfers;
}

function parsePassengers() {
    const tourists = $$( '.bookingSummaryTouristsInfoExpanded-row, .bookingTouristsForm-item');
    return tourists.map(extractPassengerInfo)
}


function extractPassengerInfo(tourist) {
    const passenger = new Passenger(getInputsValues(tourist,
        {
            birthday: "tourist-input-birthdate input",
            sex: "tourist-input-gender select",
            firstName: "tourist-input-name-uppercase-latin input, tourist-input-name input",
            lastName: "tourist-input-surname-uppercase-latin input, tourist-input-surname input",
            secondName: "tourist-input-midname input, tourist-input-midname-uppercase-latin input",
        }));

    passenger.docType = mapDocType(selectedOption($1('tourist-input-document-select select', tourist)));
    passenger.sex = getNodeData('tourist-input-gender select', tourist, 'value') === 'MALE' ? "1" : "2";
    passenger.nationality = selectedOption($1('tourist-input-citizenship select', tourist))
    passenger.setDocNumber(getNodeProperty(tourist.querySelector("tourist-input-passport input, tourist-input-passport-foreign input, tourist-input-birth-certificate input"), '', 'value'));

    return passenger;
}

function parsePassengersCountModule(passengers, tourOptions) {
    try {
        const passengersCount = {
            adults: 0,
            children: 0,
            infants: 0,
            count: 1
        };

        const {roomType} = tourOptions;

        passengersCount.adults = Number((roomType.match(/(\d+)\s*AD/i) || roomType.match(/(\d+)\s*взр/i) || [0, 0])[1]);
        passengersCount.children = (roomType.match(/\d+\s*реб/g) || []).reduce((init, cur) =>{
            init = parseInt(cur) + init;
            return init
        } ,0);
        passengersCount.infants = Number((roomType.match(/(\d+)\s*in/i) || roomType.match(/(\d+)\s*мл/i) || [0, 0])[1]);
        passengersCount.count = passengersCount.adults + passengersCount.children + passengersCount.infants;
        return passengersCount;
    } catch (e) {
        return null;
    }
}

function parseClient() {
   return new Passenger({
       phone: getNodeData('.bookingTouristsContactsForm-input input[ng-model="vm.contacts.phone"]', document, 'value'),
       email: getNodeData('.bookingTouristsContactsForm-input input[ng-model="vm.contacts.email"]', document, 'value'),
       isClient: true
   })
}
