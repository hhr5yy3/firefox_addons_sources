window.OPERATOR_NAME = "RZD";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const dateTextArr = getNodeData('.date-inp-short')?.split(' ');
    return {
        checkinDt: dateTextArr ? dayMonthYearToString(dateTextArr[0], monthNameToNumber(dateTextArr[1]), dateTextArr[2].split(',')[0]) : null,
    };
}

function parseDate(date) {
    const [day, month] = date.slice(0, -4).split(' ')
    return appendYear(day, monthNameToNumber(month));
}

function getSearchButton() {
    return $1('input[type="submit"].rn-submit');
}

function injectData() {
    $$(".route-cartype-price-rub").forEach(div => {
        if ( !div.parentNode.parentNode.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});
            btns.style.setProperty('margin', '0 4px 4px 0')
            div.parentNode.classList.replace('col-xs-14', 'col-xs-11')
            div.parentNode.parentNode.style.setProperty('display', 'flex');
            div.parentNode.parentNode.style.setProperty('align-items', 'center');
            div.parentNode.parentNode.append(btns);
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const data = tour.closest('.route-item');

    const [departure, arrival] = $$('.route-tr-arrdep-col:not(.col-xs-7)', data);
    const checkinDt = getNodeData('.train-info__route_date', departure);
    const checkoutDt = getNodeData('.train-info__route_date', arrival);
    const priceWrapperElem = $1('.route-cartype-places-left', tour).parentNode;
    const priceText = getNodeData('span:nth-child(2)', priceWrapperElem);
    const currencyText = getNodeData('span:nth-child(3)', priceWrapperElem);
    const departStation = getNodeData('.route-tr-stations > div', data);
    const arrivalStation = getNodeData('.route-tr-stations > div:last-child', data);
    const departTime = getNodeData('.train-info__route_time', departure);
    const arrivalTime = getNodeData('.train-info__route_time', arrival);

    let option = {
        checkinDt: SEARCH_CRITERIA.checkinDt,
        nights: getDistance(checkinDt, checkoutDt),
        hotelName: `Ж/Д: ${departStation} (${checkinDt} ${departTime}) → ${arrivalStation} (${checkoutDt} ${arrivalTime})`,
        region: "Поезд: " + getNodeData('.route-trtitle', data),
        roomType: getNodeData('.serv-cat', tour),
        price: priceText?.replace(/\D+/g, ''),
        currency: mapCurrencyUtil(currencyText ?? ''),
        city_from: departStation,
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
    return img.closest('[data-descr="car-type"]');
}