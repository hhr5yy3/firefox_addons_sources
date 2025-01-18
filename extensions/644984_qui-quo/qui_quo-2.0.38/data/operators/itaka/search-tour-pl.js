window.OPERATOR_NAME = "Itaka";        //https://www.itaka.pl/wyniki-wyszukiwania/wakacje/
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('[data-testid="offer-list-item"]').forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", cssText: 'margin: 6px'}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const dates = getDates(tour);
    const [country, region] = $$('[data-testid="offer-list-item-destination"] a',tour).extractNodesText()
    const hotelNode = $1('[class*="styles_title"] a',tour) || $1('[class*="styles_title"] a', tour);
    const priceNode = $1('[data-price-catalog-code]', tour)
    let option = {
        checkinDt: dates.checkinDt,
        nights: dates.nights,
        hotelName: getText(hotelNode),
        href: getNodeProperty(hotelNode, null, 'href'),
        country,
        region,
        roomType: "",
        boardType: getTextByIcon('.icon-cutlery-77', tour),
        price: extractIntFromStr(getText(priceNode).replace(/\D/g, '')),
        currency: mapCurrencyUtil(getText(priceNode)),
        city_from: getTextByIcon('.icon-airplane', tour),
        thumbnail: getNodeData('[data-testid="gallery-img"]', tour, 'src'),
        occupancy: null
    };
    return option;
}

function getTextByIcon(iconClass, tour) {
    const node = $1(iconClass, tour);
    return node ? getText(node.parentNode) : null
}

function getDates(tour) {
    const text = getTextByIcon('.icon-calendar', tour);
    console.log(text)
    const dates = text.match(/\d+\.\d+/g).map(str => appendYear(...str.split('.')));
    return {checkinDt: dates[0], nights: getDistance(dates[0], dates[1])}
}

function getHotelRowByImage(img) {
    return img.closest('[data-testid="offer-list-item"]');
}
