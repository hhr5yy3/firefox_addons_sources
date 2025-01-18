window.OPERATOR_NAME = "Itaka";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".offer_offer-info").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", cssText: 'margin-left:24px;'}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const dateText = getNodeData('.offer_date', tour);
    const [dateStart, dateEnd] = dateText.replace(/[^ \-–—0-9.()]|\s+/g, '').split('-').map(extractDateItalka);
    const hotelCell = $first('.header_title', tour);
    const [country, ...region] = getNodeData('.header_geo-labels', tour).split(/\s*\/\s*/);
    const price = getNodeData('.current-price_value', tour);
    const cityFrom = getNodeData('.filter-departureRegion .expand-button');
    const nights = dateText.match(/\(.*(\d+).*\)/);
    let option = {
        checkinDt: dateStart,
        nights: dateEnd ?  String(getDistance(dateStart, dateEnd)) : String(nights[1]-1),
        hotelName: `${getText(hotelCell)}`,
        hotel_desc: "",
        href: getNodeData('.header_stars_link', hotelCell, 'href'),
        country,
        region: region.join(', '),
        roomType: "",
        boardType: getNodeData('.offer_food ', tour),
        price: extractIntFromStr(price.replace(/\D+/g, '')),
        currency: (price.replace(/\d+|\s+|\/.+/g, '')) || getNodeData('.current-price_currency', tour),
        city_from: cityFrom,
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('img.figure_main-photo', tour, 'src'),
        occupancy: {
                adultsCount: 2,
                childrenCount: 0,
                childAges: null
            },
        excursion: "",
    };
    return option;
}

function extractDateItalka(dateText) {
    const [day, month] = dateText.split('.');
    return appendYear(day, month);
}


function getHotelRowByImage(img) {
    return img.closest('article');
}
