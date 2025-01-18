window.OPERATOR_NAME = "Travel brands";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$({sel: '#results-container .accordion-item a', searchString: /book|Verifica pret/i}).forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.after(qqBtns({align: "qq-vertical", cssText: 'margin-left: 4px'}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotel = tour.closest('.accordion-item');
    const dateNode = $1({sel: 'div.me-2, div.me-1', searchString: /Period:|Perioada:/i}, tour);

    const [dateStart, dateEnd] = getText(dateNode.firstChild).replace(/Period:|Perioada:/i, '').split(/\s*-\s*/).map(dt => dateFromDayAndMonthName(...dt.trim().split(/\s+/).slice(0, 2)))
    const [checkinDt, checkoutDt] = getText(dateNode.lastChild).replace(/Accomodation:|Cazare:/i, '').split(/\s*-\s*/).map(dt => dateFromDayAndMonthName(...dt.trim().split(/\s+/).slice(0,2)))
    const meItems = $$('[data-hide-element] div.me-1, [data-hide-element] div.me-2', tour);
    const [boardType, roomType] = $$('div', meItems[3]).extractNodesText()
    const price = getNodeData('[data-tooltip-title="Price Breakdown"], [data-tooltip-title="Detaliere pret"]', tour);

    let option = {
        checkinDt: dateStart,
        nights: getDistance(checkinDt, checkoutDt),
        extra_nights: String(getDistance(dateStart, dateEnd) - getDistance(checkinDt, checkoutDt)),
        hotelName: getNodeData('.accordion-header u b', hotel),
        hotel_desc: getNodeData('.hotel-description-search', hotel, 'innerHTML'),
        href: null,
        region: getNodeProperty($1('.iti__flag', hotel).parentNode),
        roomType,
        boardType,
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price.replace(/\d+|\.|\s+/g, '')),
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('img.w-100', hotel, 'src'),
        occupancy: "",
        flight: getFlight(tour),
    };

    return option;
}

function getFlight(tour) {
    function formatDate(dateStr) {
        const [year, month, day] = dateStr.split('-');
        return `${day}.${month}.${year}`;
    }
    try {
        const flightTooltip = $1('[data-tooltip-title="Flight schedule"], [data-tooltip-title="Orar de zbor"]', tour).dataset.tooltip;
        const tooltipNode = document.createElement('div');
        tooltipNode.innerHTML = flightTooltip;

        function getTextContent(element) {
            return element ? element.textContent.trim() : "";
        }

        const parsedSegments = [];

        const cells = tooltipNode.querySelectorAll('td');
        cells.forEach(cell => {
            const segments = cell.querySelectorAll('ul');
            segments.forEach(segment => {
                const segmentDetails = {};
                const listItems = segment.querySelectorAll('li');

                segmentDetails.flightNumber = getTextContent(listItems[3]);
                segmentDetails.airline = getTextContent(listItems[2]);

                const departure = getTextContent(listItems[0]).match(/(.+)\((.+)\)\s*-\s*(.+)\((.+)\)/);
                const times = getTextContent(listItems[1]).match(/(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})\s*-\s*(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})/);

                if ( departure && times ) {
                    segmentDetails.departureAirport = departure[1].trim();
                    segmentDetails.departureAirportID = departure[2].trim();
                    segmentDetails.arrivalAirport = departure[3].trim();
                    segmentDetails.arrivalAirportID = departure[4].trim();

                    segmentDetails.departureDate = formatDate(times[1]);
                    segmentDetails.departureTime = times[2];
                    segmentDetails.arrivalDate = formatDate(times[3]);
                    segmentDetails.arrivalTime = times[4];

                    segmentDetails.arrivalCity = segmentDetails.arrivalAirport;
                }

                parsedSegments.push(segmentDetails);
            });
        });

        if ( parsedSegments.length === 0) {
            return parseFlightInfoSimple(tooltipNode)
        }
        return {sectors: splitSegmentsToSectors(parsedSegments)};

    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseFlightInfoSimple(htmlElement) {
    const sectors = [];


    function formatDate(dateStr) {
        const [day, monthShort] = dateStr.split(' ');
        const monthMap = {
            "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
            "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
            "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
        };
        const month = monthMap[monthShort];
        const year = new Date().getFullYear(); // Assuming current year

        return `${day.padStart(2, '0')}.${month}.${year}`;
    }

    // Extract all table rows
    const rows = htmlElement.querySelectorAll('table tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');

        cells.forEach(cell => {
            const sector = {segments: []};

            const flightNumber = getText($1({sel: "div", searchString: /Flight number:|Numarul zborului:/}, cell)).replace(/Flight number:|Numarul zborului:/i, '');
            const airline = getText($1({sel: "div", searchString: /Airline company:|Companie aeriana:/}, cell)).replace(/'Airline company:|Companie aeriana:/i, '');
            const route = getText($1({sel: "div", searchString: /Flight route:|Ruta de zbor:/}, cell)).replace(/'Flight route:|Ruta de zbor:/i, '');
            const schedule = getText($1({sel: "div", searchString: /Flight schedule:|Orar de zbor:/}, cell)).replace(/'Flight schedule:|Orar de zbor:/i, '');

            const routeParts = route.match(/(.+)\((.+)\)\s*-\s*(.+)\((.+)\)/);
            const scheduleParts = schedule.match(/(\d{1,2} \w{3}) (\d{2}:\d{2})-(\d{1,2} \w{3}) (\d{2}:\d{2})/);

            if ( routeParts && scheduleParts ) {
                const segmentDetails = {};

                segmentDetails.flightNumber = flightNumber.split(': ')[1];
                segmentDetails.airline = airline.split(': ')[1];

                segmentDetails.departureAirport = routeParts[1].trim().replace(/Flight route:|Ruta de zbor/i, '');
                segmentDetails.departureAirportID = routeParts[2].trim();
                segmentDetails.arrivalAirport = routeParts[3].trim();
                segmentDetails.arrivalAirportID = routeParts[4].trim();

                const departureDate = formatDate(scheduleParts[1]);
                const arrivalDate = formatDate(scheduleParts[3]);

                segmentDetails.departureDate = departureDate;
                segmentDetails.departureTime = scheduleParts[2];
                segmentDetails.arrivalDate = arrivalDate;
                segmentDetails.arrivalTime = scheduleParts[4];

                sector.segments.push(segmentDetails);
            }

            sectors.push(sector);
        });
    });

    return {sectors};
}

function getHotelRowByImage(img) {
    return img.closest('.accordion-header');
}
