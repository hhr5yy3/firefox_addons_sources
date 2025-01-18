window.OPERATOR_NAME = "FUN&SUN";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('form[class*="Ticket__BodyForm"]').forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const flight = await getFlight(tour);
    let option = createOptionFromFlight(flight);
    const priceText = getNodeData('.buy-button', tour );
    option.price = priceText.replace(/\D+/g, '');
    option.currency = mapCurrencyUtil(priceText.split(/\d+/).slice(-1)[0].replace(/\d+|\s+/g, ''));

    return option;
}

async function getFlight(tour) {
    const detailsLink = $1('a[class*="Ticket__BodyFormLink"]', tour);
    if ( detailsLink ) {
        detailsLink.click();
        await waiting(100);
    }
    const sectors = $$('[class*="Flight__Container"]', tour).map(parseSector)

    return {sectors}
}


function parseSector(sector) {
    const segments = $$('[class*="SegmentInfo__Container"]', sector).map(parseSegment)
    return {segments}
}

function parseSegment(segment) {
    const details = $$('[class*="SegmentInfo__DescriptionText"]', segment).extractNodesText();
    const [flightNumber, plane] = details[0].split(/\s*•\s*/);
    const travelTime = details[1].match(/(\d{1,2}).+?(\d{1,2})/);
    const [departureTime, arrivalTime] = $$('[class*="SegmentInfo__Time"]').extractNodesText();

    const [departureRegion, departureDate, arrivalRegion, arrivalDate] =  $$('[class*="Place__Description-"]', segment);
    const [departureAirportID, departureAirport] = [getNodeData('strong', departureRegion), getText(departureRegion.lastChild)]
    const [arrivalAirportID, arrivalAirport] = [getNodeData('strong', arrivalRegion), getText(arrivalRegion.lastChild)]


    const newSegment = {
        flightNumber: flightNumber.match(getRegexPatterns().flightNumber)[0],
        travelTime: travelTime ? [travelTime[1], travelTime[2]].join(':') : null,
        plane,
        departureDate: dateFromDayAndMonthName(...getText(departureDate).replace(/,/g, '').split(/\s+/).slice(0,3)),
        departureTime,
        departureAirport,
        departureAirportID,
        arrivalDate: dateFromDayAndMonthName(...getText(arrivalDate).replace(/,/g, '').split(/\s+/).slice(0, 3)),
        arrivalTime,
        arrivalAirport,
        arrivalAirportID,
    }
    console.log(newSegment)
    return new FlightSegment(newSegment)
}


function getHotelRowByImage(img) {
    return img.closest('li[class*="Ticket__ItemContainer"]');
}
