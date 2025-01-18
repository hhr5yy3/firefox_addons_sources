window.OPERATOR_NAME = 'Global Travel Hub';
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    const country = getNodeProperty(document.querySelector('[id*="select2-country_id"]'));
    const city_from = getNodeProperty(document.querySelector('[id*="select2-town_from_id"]'));
    if ( !country ) {
        return null;
    }
    return {
        country,
        city_from,
        occupancy: getOccupancy()
    };
}

function getSearchButton() {
    return document.querySelector('.tour-search');
}

function injectData() {
    return null;
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const tds = $$( "td", tour);
    const ths = $$( ".prices-container.tours th", document);
    const {nights, extra_nights} = getNights(getText(tds[findTableTdIndex(ths, /ночей/i)]));
    const price = getText(tour.querySelector(".price"));
    let option = {
        checkinDt: getText(tds[findTableTdIndex(ths, /Заезд/i)]),
        nights,
        extra_nights,
        hotelName: getText(tds[findTableTdIndex(ths, /Отель/i)]),
        href: getNodeProperty(tds[findTableTdIndex(ths, /Отель/i)].querySelector('a'), null, "href"),
        country: SEARCH_CRITERIA.country,
        region: getText(tds[findTableTdIndex(ths, /Город/i)]),
        roomType: getText(tds[findTableTdIndex(ths, /Размещение/i)]),
        boardType: getText(tds[findTableTdIndex(ths, /Питание/i)]),
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+|\.+/g, '')),
        city_from: SEARCH_CRITERIA.city_from,
        thumbnail: null,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getNights(text) {
    const [fullNights, nights] = text.match(/\d+/g);
    return {nights, extra_nights: (fullNights-nights).toString()};

}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = parseInt(getNodeProperty(document.querySelector('input[name="adults"]'), 0, 'value'));
    if ( occupancy.adultsCount === 0 ) {
        return null;
    }
   occupancy.childrenCount = parseInt(getNodeProperty(document.querySelector('input[name="childs"]'), 0, 'value'));
   if ( occupancy.childrenCount > 0 ) {
       occupancy.childAges = querySelectorAll(document, 'input[name*="childage"]').map( input => input.value ).join();
   }
   return occupancy;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
