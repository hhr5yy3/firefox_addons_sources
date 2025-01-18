window.OPERATOR_NAME = location.hostname.match('coronatours.ru') ? "Corona Travel" : "Maldives Bonus";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return {
        country: selectedOption($1('#hotel-filter-country')),
    }
}

function getSearchButton() {
    return $1('.filters-block .btn-block');
}

function injectData() {
    $$(".hotel-card__price").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.prepend(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function calculateHasNewYear (stringDatesToArray, departureDate) {
    const day = Number(stringDatesToArray[1]);
    const month = monthNameToNumber(stringDatesToArray[2]);
    let year;
    Number(departureDate.split('.')[1]) > month ?  year = Number(departureDate.split('.')[2]) + 1 : year = Number(departureDate.split('.')[2]);
    return day + '.' + month + '.' + year;
}

function getCheckinDtAndNights (tour) {
    const departureDate = getNodeData('.start-flight-date', document, 'textContent', '').split(' ')[0];
    const dateStart =
        getNodeData('td', tour) ||
        calculateHasNewYear($1('.hotel-card__availability', tour).innerText.split(',')[1].split(' '), departureDate)
    const dateEnd = getNodeData('.end-flight-date', document, 'textContent', '').split(' ')[0];
    const extraNights = getDistance(departureDate, dateStart);
    return {
        checkinDt: departureDate || dateStart,
        nights: dateEnd ? String(getDistance(dateStart, dateEnd)): $$('td', tour).extractNodesText()[1],
        extra_nights: extraNights > 0 ? String(extraNights) : null,
    }
}

function getHotelNameAndHref (tour) {
    const hrefElement = $1('.hotel-card__title-link', tour);
    const hotelName = getNodeData('.hotel-card__title-link-td-name', hrefElement) || getText(hrefElement);
    return {
        hotelName,
        href: hrefElement.href,
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const {checkinDt, nights, extra_nights} = getCheckinDtAndNights(tour);
    const {hotelName, href} = getHotelNameAndHref(tour);
    const thumbnail = $1('.img-responsive', tour);
    const mainDataString = getNodeData('#flight-data--main-flight-price');

    let option = {
        checkinDt,
        nights,
        extra_nights,
        hotelName,
        hotel_desc: null,
        href,
        country: SEARCH_CRITERIA.country,
        region: getNodeData('.hotel-card__location-link--resort', tour),
        roomType: getNodeData(' .hotel-card__room-name, td:nth-child(4)', tour),
        boardType: getNodeData('.hotel-card__room-meal, td:nth-child(5)', tour),
        price: parseFloat(getNodeData('.hotel-card__price', tour).replace(/\s/g, '')),
        currency: mapCurrencyUtil(getNodeData('.hotel-card__price-currency', tour)),
        city_from: mainDataString ? mainDataString.match(/\s(.*?)-/)[1].trim() : '',
        operator: OPERATOR_NAME,
        thumbnail: thumbnail ? thumbnail.src : null,
        occupancy: getOccupancy(mainDataString),
    };
    console.log({option})
    return option;
}

function getOccupancy (mainDataString) {
    if (mainDataString ) {
        if (mainDataString.includes("CHD")) {
            const occupancyString = mainDataString.match(/\(([^)]*ADT[^)]*)\)/g)[0].replace(/\s+/g, "").slice(1);
            return {
                adultsCount: Number(occupancyString.match(/(\d+)ADT/)[1]),
                childrenCount: Number(occupancyString.match(/(\d+)CHD/)[1]),
                childAges: occupancyString.match(/\((.*?)\)/)[1].match(/\d+/g).join(', '),
            }
        }

        return {
            adultsCount: Number(mainDataString.match(/(\d+)\s*pax/)[1]),
            childrenCount: 0,
            childAges: null,
        }
    }
    return {
        adultsCount: parseInt(getParameterByName('adults')),
        childrenCount: parseInt(getParameterByName('childs')),
        childAges: null,
    }
}

function getHotelRowByImage(img) {
    return img.closest('.hotel-list-item-wrapper');
}
