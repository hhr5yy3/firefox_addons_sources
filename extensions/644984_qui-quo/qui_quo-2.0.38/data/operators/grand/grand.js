// Система подбра туров "Megatec Мастер-WEB"

var OPERATOR_NAME = "Grand";
var OPERATOR_SLETAT_ID = 113;

function getAlternateFlight() {
    try {
        const flightTable = document.querySelector('#fightsTable');
        if ( !flightTable ) {
            return null;
        }
        const sectors = splitSegmentsToSectors($$('.fl.to, .fl.back', flightTable).map(parseSector));
        if ( sectors.length === 0 ) {
            return null;
        }
        return {sectors}
    } catch (e) {
        return null;
    }

    function parseSector(sector) {
        const segments = parseSegment(sector);
        return segments;
    }

    function parseSegment(sector) {
        const dates = $$('.fl_date', sector).map(t => getText(t));
        return new FlightSegment({
            flightNumber: getNodeProperty(sector.querySelector('.fl_number'), null, 'innerText'),
            airline: getNodeProperty(sector.querySelector('.fl_company')),
            departureDate: dates[0],
            departureTime: getNodeProperty(sector.querySelector('.time_start')),
            departureCity: getNodeProperty(sector.querySelector('.fl_from .fl_city'), '').replace(/\s*–\s*/, ''),
            departureAirport: getNodeProperty(sector.querySelector('.fl_from .fl_city_info')),
            serviceClass: getNodeProperty(sector.querySelector('.fl_class')),
            arrivalDate: dates[1],
            arrivalTime: getNodeProperty(sector.querySelector('.time_end')),
            arrivalCity: getNodeProperty(sector.querySelector('.fl_to .fl_city'), '').replace(/\s*–\s*/, ''),
            arrivalAirport: getNodeProperty(sector.querySelector('.fl_to .fl_city_info'))
        })
    }

}

