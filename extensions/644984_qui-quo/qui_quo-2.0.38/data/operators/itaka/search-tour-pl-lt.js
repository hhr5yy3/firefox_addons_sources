window.OPERATOR_NAME = 'Itaka';
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$('[data-testid="offer-list-item"]').forEach((div) => {
        if (!div.querySelector('.qq')) {
            div.append(qqBtns({ align: 'qq-horizontal', cssText: 'margin: 6px' }));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const dates = getDates(tour);
    const [country, region] = $$('[data-testid="offer-list-item-destination"] a', tour).extractNodesText();
    const hotelNode = $1('[class*="styles_title"] a', tour) || $1('[class*="styles_title"] a', tour);
    const priceNode = $1('[data-price-catalog-code]', tour);
    let option = {
        checkinDt: dates.checkinDt,
        nights: dates.nights,
        hotelName: getText(hotelNode),
        href: getNodeProperty(hotelNode, null, 'href'),
        country,
        region,
        roomType: '',
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
    return node ? getText(node.parentNode) : null;
}

function getDates(tour) {
    const text = getTextByIcon('.icon-calendar', tour);
    const lang = /\.(\w+)$/g.exec(window.location.origin)[1];
    const dates = getDatesByLang(text, lang) || text.match(/\d+\.\d+/g).map((str) => appendYear(...str.split('.')));
    return { checkinDt: dates[0], nights: getDistance(dates[0], dates[1]) };
}

/**
 * @param {string} datesStr
 * @param {string} lang
 * @returns {[string, string] | undefined}
 */
function getDatesByLang(datesStr, lang) {
    const datesExtractor = {
        lt(text) {
            const matchObj = /(\d+)-(\d+)[\s-]+(\d{4})-(\d+)-(\d+)/g.exec(text);
            if (!matchObj) return undefined;
            return [appendYear(matchObj[2], matchObj[1]), dayMonthYearToString(matchObj[5], matchObj[4], matchObj[3])];
        },
        pl(text) {
            const matchObj = /(\d+)\.(\d+)[\s-]+(\d+)\.(\d+)\.(\d{4})/g.exec(text);
            if (!matchObj) return undefined;
            return [appendYear(matchObj[1], matchObj[2]), dayMonthYearToString(matchObj[3], matchObj[4], matchObj[5])];
        }
    };

    if (datesExtractor[lang] != null) return datesExtractor[lang](datesStr);
}

function getHotelRowByImage(img) {
    return img.closest('[data-testid="offer-list-item"]');
}
