function calculateArrivalDate(departureTime, departureDate, travelTime) {
    const [hour, minute] = departureTime.split(':').map(Number);
    const [day, month, year] = departureDate.split('.').map(Number);
    const departureDateTime = new Date(year, month - 1, day, hour, minute);
    const [flightHours, flightMinutes] = travelTime.split(':').map(Number);
    const totalFlightMinutes = flightHours * 60 + flightMinutes;
    departureDateTime.setMinutes(departureDateTime.getMinutes() + totalFlightMinutes);
    return departureDateTime.toLocaleDateString('ru');
}

function getBaggage (flightCardDetails) {
    try {
        const flightOfferDetails = $1('.flight-baggages .baggage', flightCardDetails.parentElement);
        const baggage = getText(flightOfferDetails);
        return baggage ? baggage : null
    } catch (e) {
        return null;
    }
}

function createSegment (flightCardDetails) {
    const segmentsForwardFlight = $$('.flight-card-detail-item', flightCardDetails);
    return segmentsForwardFlight.map((flight, index, array) => {
        const flightInfo = getText($1('.airplane-info', flight)).split(' - ');
        const timeInfo = $$('.time-info', flight);
        const departureTime = timeInfo.length === 2 ? getText(timeInfo[0]) : null;
        const dateInfo = getText($1('.date-info', flight)).split('-');
        const departureDate = dateInfo[0];
        const travelTime = getTravelTime(dateInfo);
        const locationInfo = $$('.location-info', flight);
        const departureInfo = getText(locationInfo[0]).split(' - ');
        const arrivalInfo = getText(locationInfo[1]).split(' - ');
        const arrivalDate = array.length-1 === index ? lastElement($$('.flight-plan-box .flight-date', flightCardDetails).extractNodesText()) : null
        const arrivalTime = array.length - 1 === index ? getNodeData('.arrival-time', flightCardDetails) : (timeInfo.length === 2 ? getNodeProperty(timeInfo[1]) : null);
        return {
            flightNumber: flightInfo[1],
            airline: flightInfo[0],
            departureDate,
            departureTime,
            departureCity: departureInfo[2],
            departureAirport: departureInfo[1],
            departureAirportID: departureInfo[0],
            departureTerminal: null,
            serviceClass: null,
            arrivalDate: arrivalDate || (travelTime ? calculateArrivalDate(departureTime, departureDate, travelTime) : null),
            arrivalTime,
            arrivalCity: arrivalInfo[2],
            arrivalAirport: arrivalInfo[1],
            arrivalAirportID: arrivalInfo[0],
            travelTime,
            plane: flightInfo[2],
            baggage: getBaggage(flightCardDetails),
        }
    })
}

function getTravelTime (dateInfo) {
    try {
        const regex = /(\d+)ч\s*(\d*)м?/;
        const match = dateInfo[1].match(regex);
        const hours = match[1];
        const minutes = match[2] ? match[2] : '00';
        return `${hours}:${minutes.padStart(2, '0')}`;
    } catch (e) {
        console.log(e);
        return null;
    }
}
