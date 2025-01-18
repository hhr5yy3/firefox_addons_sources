window.OPERATOR_NAME = "Sutuchno";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".card-list .card .card-prices__bottom").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", cssText: `width:100%; justify-content: end;`}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const [dateStart, dateEnd] = getNodeData('#datepickerSearch').split(/\s*—\s*/)
        .map((str, index, array) => {
            let [day, month] = str.replace(/,.+/, '').split(/\s+/)
            if ( !month ) {
                 month = array[index+1].replace(/,.+/, '').split(/\s+/)[1]
            }
            return dateFromDayAndMonthName(day, month)
        });
    const price = getNodeData('.price-total', tour);
    const hotel = $1('.object-hotel__type', tour)
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: hotel ? getText(hotel.parentNode) : getNodeData('.card-content__top-item.card-content__object-subtext', tour),
        hotel_desc: getNodeData('.card-content__object-subtext', tour),
        href: getNodeData('a', tour, 'href'),
        country: "Россия",
        region: getNodeData('.address__text', tour),
        roomType: [getNodeData('.card-content__object-title', tour), getNodeData('.card-content__facilities', tour, 'innerText')].join(', '),
        boardType: getNodeData('.meals__included', tour) || getNodeData('.meals__item', tour),
        price: Number(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.replace(/за.+/, '').replace(/.+?\d+|\s+|\d+/g, '')),
        city_from: "",
        thumbnail: getNodeData('.card__img img', tour, 'src'),
        occupancy: getOccupancy()
    };
    return option;
}

function getOccupancy() {
    const text = getNodeData('.change-guest .select-guests--btn').match(/\d+/g);

    const adultsCount = Number(text[0]);
    const childrenCount = text[1] ? Number(text[1]) : 0;
    return {
        adultsCount,
        childrenCount,
        childAges: null
    };

}

function getHotelRowByImage(img) {
    return img.closest('.card');
}
