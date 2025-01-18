window.OPERATOR_NAME = "Tourindex";
window.OPERATOR_CURRENCY = "Tourindex";
window.DEFAULT_CURRENCY = "RUB";
window.CURRENCY_SELECTION_STYLE = "width:auto;float:left;margin-left:40px;font-size:12px;color:black;";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const country =
        getNodeData('#lsfcountry .bth__inp,#lsfcountry .lsfw-tour-search__input') ||
        $$('[class*="tour-search__input"].no-select-text').extractNodesText()[1];
    if ( !country ) {
        return null
    }
    const city =
        getNodeData('#lsfcity .bth__inp, #lsfcity .lsfw-tour-search__input') ||
        $$('[class*="tour-search__input"].no-select-text').extractNodesText()[0];

    const occupancy = getOccupancy()
    return {country, city, occupancy};
}

function getSearchButton() {
    return $1('#btnMtSearch')
}

function injectData() {
    injectCurrencySelectionUtil('[data-item="tour-search"]', window.OPERATOR_NAME, window.CURRENCY_SELECTION_STYLE)
    $$(".tours-min-prices .tours-min-prices__white").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal", cssText: 'margin:2px'}));
        }
    });
}

function getRoomDataOld(tour, mt5Blocks) {
    const dates = getNodeData('.tours-min-prices__dates', tour).match(getRegexPatterns().date)[0]
    const region = getText(mt5Blocks[0])
    const [accommodation, roomType, boardType] = $$('.tours-min-prices__inline', mt5Blocks[2]).extractNodesText().filter(Boolean)

    return { accommodation, roomType, boardType, region, dates }
}

function getRoomDataNew(tour) {
    const dates = getDates2025(tour)
    const region = getNodeData('.tours-min-prices__loc > .pr5', tour);
    const roomType = getNodeData('.tours-min-prices__room > span', tour);
    const boardType = $$('.tours-min-prices__eat > *', tour).map(e => getText(e)).join(' - ');

    return { roomType, boardType, region, dates }
}

function getRoomData(tour) {
    const mt5Blocks = $$('.tours-min-prices__col .mt5', tour);
    const data = mt5Blocks.length ? getRoomDataOld(tour, mt5Blocks) : getRoomDataNew(tour);

    return data;
}

function getDates2025(tour) {
    const [day, month, year] = getNodeData('.tours-min-prices__dates', tour).split('-')[0].split('.');
    return appendYear(day, month.slice(0, 2));
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const price = isPrefferedDefaultCurrencyUtil() ? getNodeData('.tours-min-prices__price', tour) : getNodeData('.tours-min-prices__currency', tour)
    const operator = getNodeData('.tours-min-prices__to', tour);
    const { accommodation, roomType, boardType, region, dates } = getRoomData(tour);
    let option = {
        checkinDt: makeYear4Digits(dates),
        nights: parseNightsUtil(getNodeData('.tours-min-prices__nights', tour)),
        hotelName: getNodeData('.tours-min-prices__hotel', tour),
        href: getNodeData('.tours-min-prices__hotel', tour, 'href'),
        country: SEARCH_CRITERIA.country,
        region,
        roomType,
        boardType,
        accommodation,
        price: extractIntFromStr(price.replace(/\D+/g,'')),
        currency: mapCurrencyUtil(price),
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME + (!operator ? "" : " / " + operator),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = $$('[class*="tour-search__input"] .fa-user.pr5, #lsfppl .fa-user.pr5').length;
    const ages = getNodeData('[class*="tour-search__input"] span.grey, #lsfppl span.grey', document, 'textContent', '').match(/\d+/g)
    occupancy.childAges = ages ? ages.join(',') : null;
    occupancy.childrenCount = ages ? ages.length : null;
    return occupancy;
}

function getHotelRowByImage(img) {
    return img.closest('.tours-min-prices');
}
