function createSmallSector(sector) {
    const textWith = trim(getText(sector));
    const text = textWith.replace('()', '');

    const [departure, arrival] = text.split(/\s*->|→\s*/);

    let [, flightNumber, airline, departureDate,
        departureCity, departureAirportId, departureTime] = departure
        .match(/([1-9A-ZА-Я]{2,3}\s*-*\d{2,4})\.*\s*(.+?)\s*(\d{2}\.\d{2}\.\d{4})\s*(.+?)\s*\((.+?)\)\s*(\d{2}:\d{2})/) || [];


    let [, arrivalCity, arrivalAirportId, arrivalTime, serviceClass] = arrival.match(/^(.+?)\s*\((.+?)\)\s*(\d{2}:\d{2}).*?\s*([A-Z]+)/) || [];


    const baggage = trim(getNodeProperty(sector.querySelector('.freight_note'), '', 'innerText'));
    const additionalDay = arrival.match(/\d{2}:\d{2}\s*\+(\d)/);
    if (!departureDate) {
        const dates = textWith.match(getRegexPatterns().date);
        if (dates[0]) {
            departureDate = dates[0]
        }
    }

    const arrivalDate = additionalDay ? addDaysToStringDate(departureDate, additionalDay[1]) : departureDate;
    return {
        segments: [{
            flightNumber,
            airline,
            departureDate,
            departureTime,
            departureCity,
            departureAirport: null,
            departureAirportID: departureAirportId ? (departureAirportId.match(/[A-Z]{3}/) || "")[0] : null,
            departureTerminal: departureAirportId ? (departureAirportId.match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1] : null,
            serviceClass,
            arrivalDate,
            arrivalTime,
            arrivalCity,
            arrivalAirportID: arrivalAirportId ? (arrivalAirportId.match(/[A-Z]{3}/) || "")[0] : null,
            arrivalTerminal: arrivalAirportId ? (arrivalAirportId.match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1] : null,
            baggage
        }]
    }
}


function parseHotel(hotel, region, country, option) {
    const roomTypeNode = $1('.hotel-room', hotel);
    if ( !roomTypeNode ) {
        const hotelData = getNodeData('.hotel-name', hotel).split(/\s*\)\s*|\s*\(\s*|\s*,\s*/).filter(Boolean)
        const hotelDataSecond = getNodeData('.hotel-name', hotel).split(/\s*,\s*/).filter(Boolean)
        const dates = getNodeData('.hotel-dates', hotel)
        let [dateBeg, dateEnd] = dates.match(getRegexPatterns().dateStrict);
        const hotelObj = {
            hotelName: hotelData[0],
            roomType: hotelDataSecond[2],
            boardType: lastElement(hotelData)
        };
        hotelObj.checkinDt = dateBeg;
        hotelObj.dateStart = dateBeg;
        hotelObj.dateEnd = dateEnd;
        hotelObj.href = getNodeProperty(hotel.querySelector('a'), null, 'href');
        hotelObj.nights = getDistance(dayMonthYearToDate(dateBeg), dayMonthYearToDate(dateEnd)).toString();
        hotelObj.region = region || hotelData[1];
        hotelObj.country = country || hotelData[2];
        return hotelObj;
    }
    const roomType = getText(roomTypeNode).split(/\s*\(|\)\s*/);
    const dates = getNodeData('.hotel-dates', hotel)
    let [dateBeg, dateEnd] = dates.match(getRegexPatterns().dateStrict);
    const hotelObj = {
        hotelName: getNodeData('.hotel-name', hotel),
        roomType: roomType[0],
        accommodation: roomType[1],
        boardType: getNodeData('.hotel-meal', hotel)
    };
    hotelObj.checkinDt = dateBeg;
    hotelObj.dateStart = dateBeg;
    hotelObj.dateEnd = dateEnd;
    hotelObj.href = getNodeProperty(hotel.querySelector('a'), null, 'href');
    hotelObj.nights = getDistance(dayMonthYearToDate(dateBeg), dayMonthYearToDate(dateEnd)).toString();
    hotelObj.region = region;
    hotelObj.country = country;
    return hotelObj;
}
