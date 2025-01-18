window.OPERATOR_NAME = "Kazunion";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const country = getNodeData('[formcontrolname="arrivalCountryCode"], [formcontrolname="countryCode"]');
    if ( !country ) {
        return null;
    }
    const city = getNodeData('[formcontrolname="departureCityUID"]')
    const occupancy = getOccupancy()
    return {country, city, occupancy};
}

function getSearchButton() {
    return $$('[type="submit"]')
}

function injectData() {
    $$("app-tours-result-desktop tbody tr").forEach(tr => {
        if (!tr.querySelector(".qq")) {
            tr.lastElementChild.append(qqBtns({align: "qq-horizontal"}));
        }
    });
    $$("app-hotels-results-desktop tbody tr").forEach(tr => {
        if (!tr.querySelector(".qq")) {
            tr.lastElementChild.append(qqBtns({align: "qq-horizontal"}, createHotelOption));
        }
    });
}

function createOption(img, hotelsTds) {
    const tour = getHotelRowByImage(img);
    const tds = hotelsTds || $$('td', tour).map( td => $$('td > div, td > span > div',td).extractNodesText());
    const [roomType, accommodation] = tds[4][0].split('/')
    const priceNode = getNodeData('button.stroked-button', tour);
    let option = {
        checkinDt: tds[0][0],
        nights: parseNightsUtil(tds[3][1]),
        hotelName: tds[2][0].replace(/\d+/g, '').trim() + (tds[2][0].match(/\d$/) ? (' '+tds[2][0].replace(/\D+/g, '')+'*') : ''),
        href: null,
        country: SEARCH_CRITERIA.country,
        region: [...new Set(tds[2][1].split(/\s*,\s*/))].join(', '),
        roomType,
        accommodation,
        boardType: tds[3][0].split(/\s*\/\s*/)[0],
        price: extractIntFromStr(priceNode.replace(/\s+/g, '')),
        currency: mapCurrencyUtil(priceNode),
        city_from: SEARCH_CRITERIA.city || "",
        operator: OPERATOR_NAME,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function createHotelOption(img) {
    const tour = getHotelRowByImage(img);
    const tds = $$('td', tour).map(td => $$('td > div, td > span > div', td).extractNodesText());
    return createOption(img, [tds[0], null, ...tds.slice(1)])
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    const node = $$('app-kz-desktop-button-popup .label > div').extractNodesText();
    occupancy.adultsCount = node[0] ? extractIntFromStr(node[0]) : 0;
    occupancy.childrenCount = node[1] ? parseInt(node[1]) || 0 : 0;
    return occupancy;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
