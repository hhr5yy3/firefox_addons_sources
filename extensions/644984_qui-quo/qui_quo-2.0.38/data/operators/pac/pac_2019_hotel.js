window.OPERATOR_NAME = "PAC GROUP";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    const checkinDt = getNodeProperty($first('input[data-name="filter_date_from"]'), null, 'value');
    const nights = getNodeProperty($first('input[name="Nights"]'), null, 'value');
    let fullRegion = getNodeProperty($first('#PointName'), '', 'value');
    if ( !checkinDt || !nights || !fullRegion) {
        return null;
    }
    fullRegion = fullRegion.split(/,\s*/);
    return {checkinDt, occupancy:  getOccupancy(),nights, country: lastElement(fullRegion), region: fullRegion.slice(0, -1).join(', ')};
}

function getSearchButton() {
    return $$('.js-m-filter-submit');
}

function injectData() {
    $$(".js-hotel_item-without-tour").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-vertical"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotel = tour.closest('.js-pacngo-hotelsearch-table-item');
    const price = $first('.hotel-page__output-item-block-price [data-money-amount]', tour);
    let option = {
        checkinDt: SEARCH_CRITERIA.checkinDt,
        nights: SEARCH_CRITERIA.nights,
        hotelName: getNodeProperty($first('.tour-block-middle a[data-id]', hotel)),
        href: getNodeProperty($first('.tour-block-middle a[data-id]', hotel), null, 'href'),
        country: SEARCH_CRITERIA.country,
        region: SEARCH_CRITERIA.region,
        roomType: getText($first('.hotel-page__placement-type', tour)),
        boardType: getText($first('.hotel-page__placement-board', tour)),
        price: extractIntFromStr(price.textContent.replace(/\s+/g, "")),
        currency: price.dataset.moneyCurrent,
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeProperty($first('.tour-block__img', hotel), null, 'src'),
        occupancy: SEARCH_CRITERIA.occupancy,
        excursion: false,
    };
    return option;
}

function getOccupancy() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    occupancy.adultsCount = $$( '[data-action*="\/hotel\/Search\/"] .filter-person.js-filter-man._active').length;
    const kids = $$('[data-action*="\/hotel\/Search\/"] .filter-person.js-filter-child._active');
    if ( occupancy.adultsCount === 0 ) {
        return null;
    }
    if ( kids.length > 0 ) {
        occupancy.childAges = kids.reduce((array, kid) => {
            let age = kid.querySelector(".filter-person-num.js-filter-person-num");
            age ? array.push(age.textContent) : array;
            return array;
        }, []).join();
    }
    occupancy.childrenCount = kids.length;
    return occupancy;
}

function getHotelRowByImage(img) {
    return img.closest('.js-hotel_item-without-tour');
}
