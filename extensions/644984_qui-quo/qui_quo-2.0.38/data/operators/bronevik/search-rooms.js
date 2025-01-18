window.OPERATOR_NAME = "Bronevik";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function parseOtpuskDate(date) {
    if ( !date ) return null;

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
    $$(".room-offer_actions").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-box", cssText: 'margin: 6px;'}));
        }
    });
    $$(".hotels_item .offer  .booking-col").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-box", cssText: 'margin: 6px;'}, createAgentOptionGroup));
        }
    });
    $$(".offer  .booking-col").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-box", cssText: 'margin: 6px;'}, createAgentOptionGroup));
        }
    });

    $$(".hotel_booking").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"}, createOtpuskOption)

            btns.style.setProperty('top', '8px');

            div.append(btns);
        }
    });
}

function createOption(img) {
    const offer = getHotelRowByImage(img) || img.closest('.offer');
    const room = offer.closest('.rooms_item') || offer;
    const url = new URL(location.href);
    let startDate = new Date(url.searchParams.get('sd')).toLocaleDateString('ru');
    let endDate = new Date(url.searchParams.get('ed')).toLocaleDateString('ru');
    const price = getNodeData('.actual-price, .cost_value', offer);
    const isMeal = getNodeData('.room-meal_title', offer)
    const mealText = getNodeData('.room-meal_list > li > div', offer)
    let stars = $first('.stars-gray-block');
    if ( stars ) {
        stars = ' '+stars.className.replace(/\D+/, '')+'*';
    }

    if ( !url.searchParams.get('sd') )  {
         [startDate, endDate] = getNodeData('#calendar-input input', document, 'value').split(/\s*-\s*/).map(s => dateFromDayAndMonthName(...s.split(/\s+/)));
    }
    let option = {
        checkinDt: startDate,
        nights: String(getDistance(startDate, endDate)),
        hotelName: getNodeData('.dynamic-header_title .top-gray-block-title') + (stars || ''),
        hotel_desc: getNodeData('.hotel-description_text'),
        href: location.href,
        country: '',
        region: getNodeData('[data-target="#bvk-map-modal"]'),
        accommodation: getNodeData('.bed_name', offer),
        roomType: getNodeData('[data-target="#roomInfoModal"]', room),
        boardType: getNodeData('.service.free .service_text, .food_item', room) || isMeal + (mealText ? ': ' + mealText : ''),
        price: extractIntFromStr(price.replace(/\s+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\s+|\d+|,/g, '')) || getNodeData('#switch-currencies span'),
        city_from: "",
        occupancy: SEARCH_CRITERIA.occupancy,
        thumbnail: getNodeData('.carousel-bvk_item.active img', room, 'src') || getNodeData('.hotel-gallery-photo-wrapper_primary img', document, 'src')
    };
    return option;
}

function createAgentOptionGroup(img) {
    const roomNode =  img.closest('.offer')
    const hotelNode = roomNode.closest('.hotel')
    if ( !hotelNode ) {
        return createOption(img);
    }
    const url = new URL(location.href);
    let startDate = new Date(url.searchParams.get('sd')).toLocaleDateString('ru');
    let endDate = new Date(url.searchParams.get('ed')).toLocaleDateString('ru');
    let stars = $1('.stars', hotelNode);
    if (stars) {
        stars = ' ' + stars.className.replace(/\D+/, '') + '*';
    }
    const price = getNodeData('.cost_value', roomNode);
    const [country] = $$('.breadcrumb-bvk_link').map(l => getText(l));
    const region = getNodeData('[data-target="#modal-map"]', hotelNode)
    let option = {
        checkinDt: startDate,
        nights: String(getDistance(startDate, endDate)),
        hotelName: getNodeData('.hotel_title', hotelNode) + (stars || ''),
        hotel_desc: getNodeData('.hotel_description_content', hotelNode),
        href: location.href,
        country,
        region,
        accommodation: getNodeData('.room-capacity_text', roomNode),
        roomType: getNodeData('[data-target="#modal-hotel-room"]', roomNode),
        boardType: getNodeData('.food_item', roomNode),
        price: extractIntFromStr(price.replace(/\s+/g, '')),
        currency: mapCurrencyUtil(getNodeData('#switch-currencies .text-bvk-info')),
        city_from: "",
        thumbnail: getNodeData('.carousel-bvk_item.active img', hotelNode, 'src')
    };
    return option;
}

const foodRegex = /завтрак|обед|ужин|шведский|все вклю|inclus|ланч|пансион/g

function createOtpuskOption(img) {
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
    return img.closest('.room-offer') || img.closest('.hotels_item');
}
