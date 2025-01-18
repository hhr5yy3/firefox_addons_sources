window.OPERATOR_NAME = "Kazunion";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".list  .nights").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const price = getNodeData('.price-label', tour);
    const [region, country] = getNodeData('.box-header .country', tour).split(/\s*,\s*/);
    const [dates, roomType, boardType,accommodation] = $$('.nights div:not(.qq)', tour).flatMap(div => getText(div).split(/\s*,\s*/))
    const [dateStart, dateEnd] = dates.split(/\s*-\s*|\s*\(/);
    const [city_from, ct] = getNodeData('.result-info-box-content .place', document, 'innerText').split(/\n/)
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getHotelName(tour),
        href: null,
        country,
        region,
        roomType,
        accommodation,
        boardType,
        price: extractIntFromStr(price.split('.')[0].replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+|\./g, '')),
        city_from: city_from && ct ? city_from : '',
        operator: window.OPERATOR_NAME,
        thumbnail: null
    };
    return option;
}

function getHotelName(tour) {
    const caption = getNodeData('.box-header .title', tour);
    const stars = $$('.box-header .rating svg-fill-star', tour).length;
    return `${caption}${stars.length > 0 ? ' '+stars.length+'*' : ''}`;
}

function getHotelRowByImage(img) {
    return img.closest('.box');
}
