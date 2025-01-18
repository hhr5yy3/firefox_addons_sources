window.OPERATOR_NAME = "JoinUP";
window.showTopHotelsRating = true;

const i18nSelectors = {
    departureDate: '[content="Departure date"], [content="Izlidošanas datums"], [content="Išvykimo data"], [content="Väljumise kuupäev"]',
    duration: '[content="Tour duration"],[content="Ceļojuma ilgums"],[content="Kelionės trukmė"],[content="Ekskursiooni kestus"]',
    meal: '[content*="Class of service"], [content*="Pakalpojuma veids"],[content*="Maitinimo tipas"],[content*="Pakett"]',
    touristNumber:'[content="Number of tourists"],[content="Ceļotāju skaits"],[content="Keliautojų skaičius"],[content="Turistide arv"]'
}

function initializeSearchCriteria() {
    const city = getNodeData('.search-form__from-city .multiselect__single');
    return {city};
}

function getSearchButton() {
    return $first('button.search-form__search-btn')
}

function injectData() {
    $$(".tours__tour.tour-line .tour-line__action, .tour-line__bottom .tour-line__price-link").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", cssText: 'margin-left: 4px'}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const checkinDt = getNodeData(i18nSelectors.departureDate, tour, "innerText");
    const [country, region] = getNodeData('.tour-line__location', tour, "innerText").split(/\s+.\s+/);
    const touristsNode = $first(i18nSelectors.touristNumber, tour);
    const price = getNodeData('.tour-line__price', tour).replace(/\s+/g, '');
    const hotelStars = $$('.star-rating .star-rating__item', tour);
    let option = {
        checkinDt: dateFromDayAndMonthName(...checkinDt.split(/\s+/)),
        nights: getNodeData(i18nSelectors.duration, tour, "innerText"),
        hotelName: getNodeData('.tour-line__name', tour, "innerText") + `${hotelStars.length > 0 ? ' ' + hotelStars.length + '*' : ''}`,
        hotel_desc: getNodeData('.tour-line__desc', tour, "innerText"),
        href: getNodeData('.tour-line__name a', tour, "href"),
        country,
        region,
        roomType: `${touristsNode.getAttribute('content')}: ${getText($first('span', touristsNode), 'innerText')}`,
        boardType: getNodeData(i18nSelectors.meal, tour, "innerText"),
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price.replace(/\d+/g, '')),
        city_from: SEARCH_CRITERIA.city,
        thumbnail: getNodeData('img.tour-photos__img', tour, "src")
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.tour-line');
}
