window.OPERATOR_NAME = "Otpusk";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    const $geoCol = $first('[class*="_geoCol"]')
    const $titles =  $$('[class*="__title"]', $geoCol);
    let city = $titles.find(t => t.textContent.match(/откуда|зв.дки/i)) || "";
    if ( city ) {
        city = city.nextElementSibling ? getNodeProperty(city.nextElementSibling.querySelector('[class*="__field"]')) : "";
    }
    let country = $titles.find(t => t.textContent.match(/куда|куди/i)) || "";
    if (country) {
        country = country.nextElementSibling ? getNodeProperty(country.nextElementSibling.querySelector('[class*="__field"]')) : "";
    }
    const occupancy = getOccupancy();
    if ( !city && !country ) {
        return null;
    }
    return {city, country, occupancy};
}

function getSearchButton() {
    return $$('[class*="SearchButton"]')
}

function injectData() {
    $$("[class*='Results-components-Item']").forEach((div, index) => {
        if (div && div.nextElementSibling && !div.nextElementSibling.classList.contains('qq')) {
            const wrapper = qqBtns({align: "qq-horizontal"});
            div.dataset.optionIndex = String(index);
            wrapper.dataset.optionIndex = String(index);
            wrapper.style.zIndex = '99999';
            createOption(null, div).then(option =>
                wrapper.dataset.option = JSON.stringify(option)
            ).catch(e => console.log(e));
            div.after(wrapper);
        }
    });
}

async function createOption(img, tour) {
    if ( !tour ) {
        const option = JSON.parse(img.closest('[data-option]').dataset.option);
        option.href =  option.hotelId ? await getHref(option.hotelId) : null;
        return JSON.parse(img.closest('[data-option]').dataset.option);
    }
    let  hotel = tour.closest('[class*="Results-components-Item"]');
    const container = tour.closest('[class*="PricesMatrix-styles__resultDropdownContainer"]');
    if ( container) {
        hotel = container.previousElementSibling.previousElementSibling;
    }
    const dates = extractDates(tour);
    const price = getText(tour.querySelector("[class*='resultTourPriceUah']") || tour.querySelector("[class*='_resultTourPrice']"));
    const hotelId = getNodeProperty(hotel.querySelector('a[class*="resultHotelName"]'), '', 'href').match(/offer\/(\d+)\//);
    let option = {
        checkinDt: dates.checkinDt,
        nights: dates.nights,
        extra_nights: dates.extra_nights || '0',
        hotelName: getText(hotel.querySelector('[class*="resultHotelName"]')),
        hotelId,

        country: SEARCH_CRITERIA.country,
        region: getText(hotel.querySelector('[class*="Hotel-components-GeoMarker"]')),
        roomType: getText(lastElement($$('[class*="resultTourRoomName"]'))),
        boardType: getText(lastElement($$('[class*="resultTourFood"]'))),
        price: extractIntFromStr(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|s+/g, '')),
        city_from: SEARCH_CRITERIA.city,
        operator: getNodeProperty(tour.querySelector('[class*="resultTourOperatorLogo"]'), null, 'alt'),
        thumbnail: getBackgroundImageUrl(hotel.querySelector('[class*="_resultHotelImg"]')),
        occupancy: SEARCH_CRITERIA.occupancy,
        flight: getFlight(tour)
    };
    return option;
}

function getFlight(tour) {
     try {
          const sectors = $$('[class*="bound"]', tour).map(parseSector);
          return {sectors}
     } catch(e) {
         console.log(e)
     }
}

function parseSector($sector) {
    const text = getText($sector);
    const [_, departureTime, departureAirportID, arrivalAirportID, aviaCompany] = text.match(/(\d{2}:\d{2})\s+([A-Z]+)-([A-Z]+)\s+([A-z ]+)\(*/) || [];
    const segments = [new FlightSegment({departureTime, departureAirportID, arrivalAirportID, aviaCompany})];
    return {segments};
}

function extractDates(tour) {
    const $dates = tour.querySelector('[class*="__dates"]');
    const [checkinDt, checkoutDt] = $$('[class*="_date"]', $dates).map(d => {
        const [day, month] = getText(d).split(/\s+/);
        return appendYear(day, monthNameToNumber(month));
    });
    const [nights, extra_nights] = getText($dates.querySelector('[class*="_duration"]')).match(/\d+/g);
    return {checkinDt, checkoutDt, nights, extra_nights}

}

async function getHref(hotelId) {
    const url = `https://www.turpravda.com/informers/hotel/?htl=${hotelId[1]}&tp=1&skin=1`;
    const html = await fetch(url).then(resp => resp.text()).catch(e => null);
    if ( !html ) {
        return null;
    }
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const a = tempDiv.querySelector('a');
    return a ? a.href : null;
}

function getOccupancy() {
    let occupancy = {
        adultsCount: parseInt(getNodeProperty($first('[class*=__adultsCount]'))),
        childrenCount: 0,
        childAges: null
    };
    const kids = $$('button[class*="TouristsControl-styles__children"]');
    occupancy.childrenCount = kids.length - 1;
    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = kids.map(k => getText(k).replace(/\D+/g, '')).slice(0, -1).join(',');
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    const indexData = img.closest('[data-option-index]');
    return $1(`[data-option-index="${indexData.dataset.optionIndex}"]:not(.qq)`);
}
