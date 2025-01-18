window.OPERATOR_NAME = "Asistour";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('[data-cy*="room-offer-card"] .price-col').forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const room = tour.closest('.v-item-group') || tour;
    const hotel = room.closest('.hotel-card, [data-cy*="hotel-offer"]') || $1('[data-cy="hotel-name"]').closest('.mb-3');
    const dateStart = getUrlSearchParameters('startDate').split('-').reverse().join('.');
    const dateEnd = getUrlSearchParameters('endDate').split('-').reverse().join('.');
    const [region, country] = getNodeData('.v-breadcrumbs li:last-child').split(/\s*,\s*/)
    const price = getNodeData('[data-cy="client-price"]', tour);
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getHotelName(hotel),
        href: getNodeData('a.text-decoration-none', hotel, 'href'),
        country,
        region,
        roomType: getNodeData('.v-expansion-panel-header > div', room),
        boardType: getTextByIcon('.mdi-silverware-fork-knife', tour) || 'Завтрак не включен',
        price: extractIntFromStr(price.split('.')[0].replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|\.|\s+/g, '')),
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl($$('.v-image__image--cover', hotel).find(t => t.clientHeight > 0)) || getBackgroundImageUrl($$('.v-image__image--cover').find(t => t.clientHeight > 0)),
    };
    return option;
}

function getHotelName(hotel) {
    const header = $1('a.text-decoration-none', hotel) || $1('[data-cy="hotel-name"]');
    const stars = $$('.amber--text', hotel).length;
    return `${getText(header)} ${stars > 0 ? ' ' + stars + '*' : ''}`;
}

function getTextByIcon(iconClass, tour) {
    const node = $1(iconClass, tour);
    return node ? getText(node.parentNode) : null
}

function getHotelRowByImage(img) {
    return img.closest('[data-cy*="room-offer-card"]');
}
