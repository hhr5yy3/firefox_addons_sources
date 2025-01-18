// САМО-тур online бронирование

var OPERATOR_NAME = "KOMPAS";
var OPERATOR_SLETAT_ID = 194;
var isTransportColToShrink = true;
var showTopHotelsRating = true;
var DEFAULT_CURRENCY = "National";

function createLargeSector(sector) {
    return {
        segments: sector.map(tr => {
            var tds = querySelectorAll(tr, "td").filter( td => !td.getAttribute("rowspan") );

            var dataTds = tds.filter( td => td.getAttribute("data-title") );
            var dateTimeDep = parseDateTime(dataTds[1].dataset.title);
            var dateTimeArr = parseDateTime(dataTds[2].dataset.title);
            var depCity = getText(dataTds[3]).split(", ");
            var arrCity = getText(dataTds[4]).split(", ");
            return {
                flightNumber: getText(tds[0]),
                airline: JSON.parse(tr.dataset.bindFilter).full_airline,
                departureDate: dateTimeDep.date,
                departureTime:  dateTimeDep.time,
                departureCity: depCity[0],
                departureAirport: depCity[1],
                departureAirportID: null,
                departureTerminal: null,
                serviceClass: dataTds[5].dataset.title,
                arrivalDate: dateTimeArr.date,
                arrivalTime: dateTimeArr.time,
                arrivalCity: arrCity[0],
                arrivalAirport: arrCity[1],
                arrivalAirportID: null,
                arrivalTerminal: null,
                travelTime: getText(tds[2]) || null,
                plane: null
            }
        })
    }
}
