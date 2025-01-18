window.OPERATOR_NAME = 'Itaka';
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}, order page`);

/**
 * @returns 'lt' | 'pl'
 */
function getPageLanguage() {
    return document.documentElement.lang;
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$('[class*="styles_price-summary-container"]').forEach((div) => {
        if (!div.querySelector('.qq')) {
            div.append(qqBtns({ align: 'qq-horizontal' }));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelName = $1('div.fresnel-container.fresnel-greaterThanOrEqual-lg h1');
    const regionText = getNodeData('.fresnel-container.fresnel-greaterThanOrEqual-lg h4');
    const [country, region] = regionText.split(/\s*,\s*/);
    const stars = $$('[data-testid="rating-stars"] .icon-shape-star', hotelName.parentNode.parentNode.parentNode);
    const booking = $1('[class*="styles_c__sidebar"]');
    const buttons = $$('button', booking);
    const dates = getDates(buttons);
    const getTextFromButton = (text) =>
        getText(
            $1(
                '[class*="styles_c__value"]',
                buttons.find((btn) => getText(btn).match(text))
            )
        );
    const price = getNodeData('[class*="styles_price-summary-container"] strong');
    let option = {
        checkinDt: dates.dateStart,
        nights: String(getDistance(dates.dateStart, dates.dateEnd)),
        hotelName: `${getText(hotelName)} ${stars.length}*`,
        href: location.href,
        country,
        region,
        accommodation: getTextFromButton(/Osoby|Keliautojai/i),
        roomType: getTextFromButton(/Pokój|Kambarys/i),
        boardType: getTextFromButton(/Wyżywienie|Maitinimas/i),
        price: extractIntFromStr(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.split(/\d+\s+/).reverse()[0]),
        city_from: getTextFromButton(/Wylot|Išvykimas/i),
        thumbnail: getNodeData('[data-testid="gallery-img"]', tour, 'src'),
        flight: await getFlight()
    };

    return option;
}

async function getFlight() {
    try {
        const getContainer = () => $1({sel: '#dropdown-container h6', searchString: 'Išvykimas'})

        let flightContainer = getContainer();
        if ( !flightContainer ) {
            const flightButton = $1({sel: 'button', searchString: 'Skrydžių tvarkaraštis'});
            flightButton.click();
            flightContainer = await waitingFor(getContainer, 100, 200)
        }
         flightContainer = flightContainer.closest('#dropdown-container');
         const flight = await waitingFor(()=> parseFlightData(flightContainer), 100, 50)
         $1('.icon-e-remove', flightContainer)?.click();
         return flight

    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseFlightData(html) {
    try {
    const sectors = [];

    function extractSegment(segment) {
        const allPoints = $$('li[class*="styles_c__listItem"]', segment);
        if ( allPoints.length=== 3 ) {
           const [departure, stop, arrival] = allPoints;
           const [departureItem, flightNumberItem] = $$('li', departure);
            console.log({departureItem})
            const departureTime = getNodeData('div > div', departureItem)
            const departureCity = getNodeData('.fresnel-greaterThanOrEqual-lg', departureItem)
            const departureDate = new Date(getNodeData('.oui-color-grey-800', departureItem).match(/\d{4}.\d{1,2}.\d{1,2}/)[0]).toLocaleDateString('ru');

            const stopTimes = $$({sel: '[class*="styles_c__children"] div', searchString: /\d{2}:\d{2}/}, stop).extractNodesText();
            const stopCity = getNodeData('.fresnel-greaterThanOrEqual-lg', stop)
            const flNumberText = getText(flightNumberItem).split(/\s*,\s*/)

            const arrivalDate = new Date(getNodeData('.oui-color-grey-800', arrival).match(/\d{4}.\d{1,2}.\d{1,2}/)[0]).toLocaleDateString('ru');
            const arrivalTime = getNodeData('div > div', arrival);
            const arrivalCity = getNodeData('.fresnel-greaterThanOrEqual-lg', arrival);

            return [{
                flightNumber: flNumberText[1],
                airline: flNumberText[0],
                departureDate,
                departureTime,
                departureCity,
                arrivalTime: stopTimes[0],
                arrivalCity: stopCity,
            }, {
                flightNumber: flNumberText[1],
                airline: flNumberText[0],
                departureDate,
                departureTime: stopTimes[1],
                departureCity: stopCity,
                arrivalDate,
                arrivalTime,
                arrivalCity,
            }];
        }
        const [departure, arrival] = $$('li[class*="styles_c__listItem"]', segment);
        const [departureItem, flightNumberItem] = $$('li', departure);

        const departureTime = getNodeData('div > div', departureItem)
        const departureCity = getNodeData('.fresnel-greaterThanOrEqual-lg', departureItem)
        const departureDate = new Date(getNodeData('.oui-color-grey-800', departureItem).match(/\d{4}.\d{2}.\d{2}/)[0]).toLocaleDateString('ru');

        const arrivalDate = new Date(getNodeData('.oui-color-grey-800', arrival).match(/\d{4}.\d{2}.\d{2}/)[0]).toLocaleDateString('ru');
        const arrivalTime = getNodeData('div > div', arrival);
        const arrivalCity = getNodeData('.fresnel-greaterThanOrEqual-lg', arrival);

        const flNumberText = getText(flightNumberItem).split(/\s*,\s*/)
        return [new FlightSegment({
            flightNumber: flNumberText[1],
            airline: flNumberText[0],
            travelTime: "",
            plane: "",
            departureDate,
            departureTime,
            departureCity,
            arrivalDate,
            arrivalTime,
            arrivalCity,
        })];
    }

    const departureHeader = $1({sel: '#dropdown-container h6', searchString: 'Išvykimas'}, html)
    const returnHeader = $1({sel: '#dropdown-container h6', searchString: 'Grįžimas'}, html)

    if ( departureHeader ) {
        const departureSection = departureHeader.closest('section');
        sectors.push({
            segments: $$('ul[class*="styles_c__list"]', departureSection).flatMap(extractSegment)
        });
    }

    if ( returnHeader ) {
        const returnSection = returnHeader.closest('section');
        sectors.push({
            segments: $$('ul[class*="styles_c__list"]', returnSection).flatMap(extractSegment)
        });
    }

    return {sectors};
    } catch (e) {
        console.log(e);
        return null;
    }
}


function getDates(buttons) {
    const datesButton = buttons.find((btn) => getText(btn).match(/Termin|Data/i));
    const datesText = getText($1('[class*="styles_c__value"]', datesButton));

    const datesArray = datesText.split(/\s*-\s*/).map((date) => date.split(/\s+/));

    let startMonth = datesArray[0].find(str => !str.match(/\d/));
    let endMonth = datesArray[1].find(str => !str.match(/\d/));
    const startDay = datesArray[0].find(str => str.match(/^\d{1,2}$/));
    const endDay = datesArray[1].find(str => str.match(/^\d{1,2}$/));
    if ( startMonth && startMonth.match(/rugp/i) ) {
         startMonth = 'rgp'
    }
    if ( endMonth && endMonth.match(/rugp/i) ) {
        endMonth = 'rgp'
    }
    return {
        dateStart: dateFromDayAndMonthName(startDay, startMonth, null, getPageLanguage()),
        dateEnd: dateFromDayAndMonthName(endDay, endMonth, null, getPageLanguage())
    };
}

function getHotelRowByImage(img) {
    return img.closest('.container');
}
