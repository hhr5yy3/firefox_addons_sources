window.OPERATOR_NAME = "Magput";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return {
        cityFrom: getNodeData('.wg-input-selector__input', $1('.uwg-search__from'),'value')
    };
}

function parseMagputDate(date) {
    const [day, month] = date.slice(0, -4).split(' ');
    return appendYear(day, monthNameToNumber(month));
}

function getSearchButton() {
    return $1('.uwg-search__button');
}

function injectData() {
    $$(".wg-wagon-type__price-list").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});
            btns.style.setProperty('margin', '-8px -8px 0 4px')
            div.parentNode.style.setProperty('justify-content', 'space-between')
            div.style.setProperty('max-width', '190px')
            div.style.setProperty('width', '100%')
            $1('.wg-wagon-type__available-seats', div).style.setProperty('margin-left', '10px')
            div.append(btns);
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const data = tour.closest('.wg-block__inner');

    const [departure, arrival] = $$('.wg-track-info__col', data);
    const checkinDt = parseMagputDate(getNodeData('.wg-track-info__date', departure));
    const checkoutDt = parseMagputDate(getNodeData('.wg-track-info__date', arrival));
    const priceText = getNodeData('.wg-wagon-type__price-value', tour);
    const currencyText = getNodeData('.wg-wagon-type__price-value > span > span', tour);
    const departStation = getNodeData('.wg-track-info__station', departure) || getNodeData('.wg-track-info__direction', departure);
    const arrivalStation = getNodeData('.wg-track-info__station', arrival) || getNodeData('.wg-track-info__direction', arrival);
    const departTime = getNodeData('.wg-track-info__time', departure);
    const arrivalTime = getNodeData('.wg-track-info__time', arrival);

    let option = {
        checkinDt: checkinDt,
        nights: getDistance(checkinDt, checkoutDt),
        hotelName: `Ж/Д: ${departStation} (${checkinDt} ${departTime}) → ${arrivalStation} (${checkoutDt} ${arrivalTime})`,
        region: "Поезд: " + getNodeData('.wg-train-info__num', data),
        roomType: getNodeData('.wg-wagon-type__title', tour) ?? '',
        price: priceText?.replace(/[^0-9,]+/g, '')?.replace(',', '.'),
        currency: mapCurrencyUtil(currencyText ?? ''),
        city_from: SEARCH_CRITERIA.cityFrom,
        operator: OPERATOR_NAME,
        occupancy: {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null
        },
        product_type: 'Train',
        href: "",
        boardType: "",
        thumbnail: "",
        hotel_desc: "",
    };

    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.wg-wagon-type__item');
}