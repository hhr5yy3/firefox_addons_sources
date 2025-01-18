window.OPERATOR_NAME = window.location.hostname === 'agency.sunmar.ru' ? "Sunmar" : "Coral";

function initializeSearchCriteria() {
    const occupancy = getOccupancy();
    const currency = selectedOption(document.querySelector('#currency'));
    return {occupancy, currency, city: selectedOption(document.querySelector('select#fromArea'))};
}

function getSearchButton() {
    return document.querySelector('#package-tour-form-box button[type="submit"]');
}

function injectData() {
    $$(".tour-package-list-box").forEach(div => createCell(div));
    $$(".excursion-list-box").forEach(div => createExcursionCell(div));
    $$(".hotel-info-list-by-price").forEach(div => createCell(div, createRoomOption));
    $$(".hotel-info-list-by-price-v2 .type-box").forEach(div => createRoomCell(div, createRoomOption));
}

function createCell(div, action = createOption) {
    if ( !div.querySelector(".qq") ) {
        const greenBtn = div.querySelector('.btn.green.small, .btn.green.smallW, .price-box, .mobil-div-nextbutton');
        if ( !greenBtn ) {
            return;
        }
        const btns = qqBtns({align: "qq-box"}, action);
        btns.style.position = 'absolute';
        btns.style.top = 0 + 'px';
        btns.style.right = -50 + 'px';
        btns.style.zIndex = '100';
        greenBtn.append(btns);
    }
}

function createExcursionCell(div) {
    if ( !div.querySelector(".qq") ) {
        const greenBtn = div.querySelector('.btn.green.small, .btn.green.smallW, .price-box');
        if ( !greenBtn ) {
            return;
        }
        const btns = qqBtns({align: "qq-box"}, createExcursionOption);
        btns.style.zIndex = '100';
        div.querySelector('.list-left').append(btns);
    }
}

function createRoomCell(div, action = createOption) {
    if (!div.querySelector(".qq")) {
        const greenBtn = div.querySelector('.btn.green.small, .btn.green.smallW, .price-box');
        if (!greenBtn) {
            return;
        }
        const btns = qqBtns({align: "qq-box"}, action);

        btns.style.zIndex = '100';
        btns.style.marginLeft = '4px';
        greenBtn.after(btns);
    }
}

function htmlToText(string) {
    if ( !string ) {
        return null
    }
    let span = document.createElement('span');
    span.innerHTML = string;
    const result = getText(span);
    span.remove();
    return result;
}

function parseSpan(span) {
    return htmlToText(span.dataset.originalTitle) || getText(span);
}

function createOption(img) {
    let storageInfo = getSessionStorageOption();
    const tour = getHotelRowByImage(img);
    const details = tour.querySelector('.tour-detail, .room-detail');
    const properties = details.querySelector('.properties'); // hotels search table has a ".properties" element
    let propertiesSpans = $$('span', details).map(parseSpan);
    let indexes = {
        date: 0,
        nights: 1,
        room: 2,
        accommodation: 3,
        board: 4
    }
    if ( properties ) {
        propertiesSpans = $$('span', properties).map(parseSpan);
        indexes = {
            date: 2,
            nights: 3,
            room: 1,
            accommodation: -1,
            board: 0
        }
    }
    const nights = propertiesSpans[indexes.nights].match(/\d+/g);
    const thumbnailNode = tour.querySelector('img.hotel-images, div.hotel-images');
    let thumbnail = thumbnailNode ? (thumbnailNode.getAttribute('src') || (getBackgroundImageUrl(thumbnailNode) || '').split(')')[0].replace(/"/g, '')) : null;
    const hotelHref = null;
    const priceNode = getText(tour.querySelector('.price, .price-box b, .next-button-package b'), 'innerText').split(/\n/)[0].replace(/\s+/g, '');
    const shortDate = propertiesSpans[indexes.date].match(/(\d{2})\.(\d{2})/);
    const date = appendYear(shortDate[1], shortDate[2]);
    let option = {
        checkinDt: date,
        nights: nights[1] || nights[0],
        extra_nights: (nights[0] - (nights[1] || nights[0])).toString(),
        hotelName: extractHotelName(tour),
        href: hotelHref,
        country: storageInfo.country,
        region: getNodeProperty(tour.querySelector('.hotel-area, .small-text')) || storageInfo.region,
        accommodation: propertiesSpans[indexes.accommodation],
        roomType: [propertiesSpans[indexes.room]].join(', '),
        boardType: propertiesSpans[indexes.board],
        price: extractIntFromStr(priceNode),
        currency: mapCurrencyUtil(priceNode.replace(/\d+|\.|\s+/g, '') || storageInfo.currency || SEARCH_CRITERIA.currency || ""),
        city_from: storageInfo.city_from || SEARCH_CRITERIA.city || "",
        operator: OPERATOR_NAME,
        thumbnail: thumbnail,
        occupancy: storageInfo.occupancy || SEARCH_CRITERIA.occupancy,
    };
    return option;
}

function createRoomOption(img) {
    let storageInfo = getSessionStorageOption();
    const tour = getHotelRowByImage(img);
    const hotelContainer = tour.closest('.tour-package-list-box');
    const roomNode = img.closest('.type-box');
    const properties = tour.querySelector('.properties');
    const propertiesSpans = $$('span', properties).map(span => getText(span));
    const patterns = getRegexPatterns();
    const nights = propertiesSpans[1].match(/\d+/g);
    const thumbnail = getNodeProperty(document.querySelector('.slider-hotel .slick-slide[aria-hidden="false"] img'), '', 'src');
    const hotelHref = `${window.location.origin}/hotel/${(thumbnail.match(/image\/(.+)\/.+jpg/) || '')[1]}`;
    const selectedNode = tour.querySelector('.selected') || roomNode;
    const priceNode = getText(selectedNode.querySelector('.right .text, .room-type-price span'), 'innerText').split(/\n/)[0].replace(/\s+/g, '');
    const region = getNodeProperty($1('.hotel-area, .small-text', hotelContainer)) || getNodeProperty($1('.sub-page-big-header .small-text').firstChild);
    const description = document.querySelector('#hotel-description');


    let option = {
        checkinDt: propertiesSpans[0].match(patterns.date)[0] || storageInfo.checkinDt ,
        nights: nights[1] || nights[0],
        extra_nights: (nights[0] - (nights[1] || nights[0])).toString(),
        hotelName: extractHotelName(hotelContainer).replace(region, '').trim(),
        hotel_desc: description ? getNodeProperty(document.querySelector('#hotel-description').parentNode, null, 'innerHTML') : null,
        href: hotelHref,
        country: storageInfo.country,
        region,
        accommodation: propertiesSpans[2],
        roomType: getText(tour.querySelector('.hotel-name')),
        boardType: getText(selectedNode.querySelector('.left .text, .food span')),
        price: extractIntFromStr(priceNode),
        currency: mapCurrencyUtil(priceNode.replace(/\d+|\.|\s+/g, '')) || 'RUB',
        city_from: storageInfo.city_from || SEARCH_CRITERIA.city || "",
        operator: OPERATOR_NAME,
        thumbnail: thumbnail,
        occupancy: storageInfo.occupancy || SEARCH_CRITERIA.occupancy,
        excursion: false,
    };
    return option;
}

function createExcursionOption(img) {
    const option = createOption(img);
    option.excursion = true;
    return option;
}

function extractHotelName(details) {
    const hotel = details ? details.querySelector('.hotel-name') : $1('.hotel-concept-title') || $1('.sub-page-big-header');
    const caption = getNodeProperty(details ? hotel.firstChild : hotel, hotel);
    const stars = $$('.scoring span', hotel).length;
    return `${caption}${stars > 0 ? ' ' + stars + '*' : ''}`
}

function getOccupancy() {
    try {
        return {
            adultsCount: +selectedOption(document.querySelector('#adult')),
            childrenCount: $$('[name*="child"]').length,
            childAges: $$('[name*="child"]').map(ch => ch.value).join() || null
        };
    } catch (e) {
        return null;
    }
}

function getHotelRowByImage(img) {
    return img.closest('.tour-package-list-box, .hotel-info-list-by-price, .hotel-info-list-by-price-v2, .excursion-list-box');
}
