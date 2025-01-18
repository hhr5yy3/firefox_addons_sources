window.OPERATOR_NAME = "Booking.com";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);
function injectData() {
    $$('[data-testid="property-card"]').forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const [dateStart, dateEnd] = getDates();
    const stars = $$('[data-testid="rating-stars"] span', tour).length
    const priceText = getNodeData('[data-testid="price-and-discounted-price"]', tour).replace(/\s+/g, '')
    const servicesList = [...new Set($$('[data-testid="recommended-units"] *', tour).filter( node => node.childElementCount === 0 ).extractNodesText())].filter(str => !str.match(/рекомендов/i));

    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: `${getNodeData('[data-testid="title"]', tour)}${stars > 0 ? ' ' + stars + '*' : ''}`,
        href: getNodeData('[href*="booking.com/hotel/"][data-testid="title-link"]', tour, 'href'),
        country: getNodeData('[href*="booking.com/country/"]'),
        region: getNodeData('[data-testid="address"]'),
        roomType: servicesList.find(text => text.match(/номер|люкс|Апартамент /i)) || servicesList[0],
        boardType: servicesList.find(text => text.match(/включен/)),
        price: extractIntFromStr(priceText),
        currency: mapCurrencyUtil(priceText),
        city_from: "",
        thumbnail: getNodeData('img[data-testid="image"]', tour, 'src'),
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null
    };
    return option;
}


function getHotelRowByImage(img) {
    return img.closest('[data-testid="property-card"]');
}
