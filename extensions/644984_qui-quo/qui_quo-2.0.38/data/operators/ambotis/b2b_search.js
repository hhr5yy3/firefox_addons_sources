window.operators = {
    'b2b.ambotis.com': "Ambotis",
    'b2b.blissmaldives.com': "Bliss Maldives",
    'b2b.exoticvoyage.com': 'Exotic Voyage',
    'online.khalidiah.ae': 'Al Khalidiah Tourism'
}
window.OPERATOR_NAME = window.operators[location.hostname] || "Ambotis";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".hotel-other-price").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", cssText: "margin-left:15px"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotel = tour.closest('[data-samo-hotel]');
    const searchHeader = getNodeData('#samo-form-modal-title-hotel');
    const [dateStart, dateEnd] = searchHeader.match(getRegexPatterns().date);
    const price = $1('[data-samo-price]', tour).dataset.samoFullprice;
    const captions = $$('label b', tour).extractNodesText();
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getHotelName(hotel),
        href: null,
        country: "",
        region: searchHeader.split(/\s*,\s*/)[0],
        roomType: getNodeData('.type-room', tour),
        accommodation: getTextByIcon('.fa-user-friends', tour),
        boardType: getTextByIcon('.fa-utensils', tour) || captions.find(t => t !== getNodeData('.type-room', tour) ),
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price.replace(/\d+|\./g, '')),
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeData('.samo-hotel_list2_image img', hotel, 'src') || getNodeData('.media  img', hotel, 'src')
    };
    return option;
}

function getTextByIcon(iconClass, tour) {
    const node = $1(iconClass, tour);
    return node ? getText(node.parentNode) : null
}

function getHotelName(hotel) {
    const header = $1('.samo-hotel-easy-heading, h4.media-heading b', hotel);
    const stars = $$('h4.media-heading b', hotel).extractNodesText();
    return `${getText(header)} ${stars[1] ? stars[1] : ''}`;
}

function getHotelRowByImage(img) {
    return img.closest('.hotel-other-price');
}
