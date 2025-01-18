window.OPERATOR_NAME = "Otpusk.pro";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function parseOtpuskDate(date) {
    if(!date) return null;

    const [day, month, year] = date.split(/\s/g);

    return `${day}.${monthNameToNumber(month)}.${year}`
}

function initializeSearchCriteria() {
    const dateText = $1('#calendar-input > input')?.value;
    const [dateStart, dateEnd] = dateText?.split(' - ')?.map(i => parseOtpuskDate(i));

    const adultsNumber = getNodeData('.guests-bvk_adults input.form-control-bvk', document, 'value');
    const childrenNumber = $$('.children-list-bvk_item.child-bvk').map(i => getText(i).replace(/\D+/g, ''));

    return {
        checkinDt: dateStart,
        nights: getDistance(dateStart, dateEnd),
        occupancy: adultsNumber && {
            adultsCount: Number(adultsNumber),
            childrenCount: childrenNumber.length,
            childAges: childrenNumber.join(',') ?? null
        }
    };
}

function getSearchButton() {
    return $1('.search-body_search-btn > .search-body_actions > button')
}

function injectData() {
    $$(".hotel_booking").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"})
            
            btns.style.setProperty('top', '8px');
            
            div.append(btns);
        }
    });
}

const foodRegex = /завтрак|обед|ужин|шведский|все вклю|inclus|ланч|пансион/g

function createOption(img) {
    const tour = getHotelRowByImage(img);

    const hotelLink = $1('.hotel-title_link', tour);
    const priceText = getNodeData('.person-offer .person-offer_price', tour);
    const stars = Array.from($1('.stars', tour).classList).find(i => i.startsWith('n-')).replace(/\D+/g, '');
    const boardType = getNodeData('.person-offer > div > div:nth-child(2)', tour);

    let option = {
        checkinDt: SEARCH_CRITERIA.checkinDt,
        nights: SEARCH_CRITERIA.nights,
        hotelName: getText(hotelLink) + (stars ? ` ${stars}*` : ''),
        hotel_desc: "",
        href: hotelLink?.href,
        country: "",
        region: getNodeData('.contact.contact-location', tour),
        roomType: getNodeData('.person-offer > div > .person-offer_room', tour),
        boardType: (boardType.match(foodRegex) && boardType) ?? '',
        price: priceText.replace(/\D+/g, ''),
        currency: mapCurrencyUtil(priceText.replace(/[^а-яА-Яa-zA-Z]/g, '')),
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeData('.carousel-bvk_item.active > img', tour, 'src'),
        occupancy: SEARCH_CRITERIA.occupancy,
    };

    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.hotels_item');
}