window.showTopHotelsRating = true;
window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || "Ростинг" : "Ростинг";
window.DEFAULT_CURRENCY = "BYN";
window.OPERATOR_CURRENCY = window.operators ? window.operators[window.location.hostname] || "Rosting" : "Rosting";

function initializeSearchCriteria() {
    const country = getCountry();
    const city = getCity();
    if ( !country || !city ) {
        return null;
    }
    return {
        "country": country,
        "city": city
    };
}

function getSearchButton() {
    return $$('.tc-go-search');
}

function injectData() {
    injectCurrencySelectionUtil('.search-results-original .module', window.OPERATOR_CURRENCY, "width:auto;float:left;margin:6px;font-size:16px;color:black;");
    $$(".search-results-seemore-inn .book-it").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", cssText: '    width: 100%;justify-content: end;'}));
        }
    });
}

function createOption(img) {
    const toursList = getHotelRowByImage(img);
    const tour = img.closest('tr')
    const hotelId = toursList.id;
    const hotelCard = document.querySelector(`.block [class*="${hotelId}"]`);

    const price = getPrice(tour);
    const roomOpts = $$('.place-in-tour span',tour).map( span => [getText(span), span.title].join(' — ') );
    let option = {
        checkinDt: dateFromDayAndMonthName(...getNodeData('.date-out a', tour).split(/\s+,*\s*/).slice(0,2)),
        nights: getNodeData('.search-results-nights', tour).replace(/\D+/g, ''),
        hotelName: getHotelName(hotelCard),
        href: null,
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        region: getNodeData('.allocation-link', hotelCard),
        accommodation: [getNodeData({node:'.type-number', doc: tour, method: 'title', safe: false}), getNodeData('.type-number', tour)].filter(t=>t).join(' — '),
        roomType: [roomOpts[0], roomOpts[2]].join(', '),
        boardType: roomOpts[1],
        price: extractIntFromStr(price.replace(/\D+/g, '')),
        currency: mapCurrency(price.replace(/\d+|\s+/g, '')),
        thumbnail: getBackgroundImageUrl($first('.photo.slick-active', hotelCard))
    };
    return option;
}


function getHotelName(hotelCard) {
    const caption = getNodeData('.hotel-header .search-results-title-name', hotelCard, 'title');
    const stars = $$('.stars .ico-star', hotelCard).length;
    return `${caption}${stars > 0 ? ' '+stars+'*' : ''}`;
}

function getPrice(tour) {
    const firstPrice = getNodeData('.main-price', tour);
    const secondPrice = getNodeData('.second-price', tour, );
    return isPrefferedDefaultCurrencyUtil() ? firstPrice : secondPrice || firstPrice;
}

function mapCurrency(text) {
    switch ( text.trim() ) {
        case "€":
            return "EUR";
        case "РБ":
            return "RUB";
        case "$":
            return "USD";
        case "BY":
            return "BYN";
        case "руб.":
            return "BYN";
        default:
            return text;
    }
}

function getCountry() {
    const country = selectedOption($first("select[name='tc_country']"));
    if ( country ) {
        sessionStorage.setItem('country', country)
    }
    return sessionStorage.getItem('country');
}

function getCity() {
    const city = selectedOption($first("select[name='tc_city']"));
    if ( city ) {
        sessionStorage.setItem('city', city)
    }
    return sessionStorage.getItem('city');
}

function getHotelRowByImage(img) {
    return img.closest('.search-results-seemore-inn');
}
