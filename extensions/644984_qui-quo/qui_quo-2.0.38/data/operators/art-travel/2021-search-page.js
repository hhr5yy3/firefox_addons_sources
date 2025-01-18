window.OPERATOR_NAME = "Арт-тревел";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return {occupancy: getOccupancy()};
}

function getSearchButton() {
    return $$('[data-bind="formReset"]');
}

function injectData() {
    $$("#searchResult tr").filter(tr => tr.querySelector('.results-price')).forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createCell());
        }
    });
}

function createCell() {
    const td = document.createElement("td");
    td.classList.add('qq');
    td.append(qqBtns({align: "qq-box"}));
    return td;
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const tds = $$('td', tour);
    const price = getText(tour.querySelector(".results-price"));
    const dates = getText(tour.querySelector('[data-bind*="DateEnd"]')).split(/\s*-\s*/).map( date => appendYear(...date.split('.')) );
    const hotelText = getText(tds[3]);
    const region = getNodeProperty(tds[3].querySelector('[data-bind="text:City"]'));
    const city = document.querySelector('[data-id="cityFrom"]');
    const tourName = getText(tds[8]);
    let option = {
        checkinDt: dates[0],
        nights: getDistance(dates[0], dates[1]).toString(),
        hotelName: trim(hotelText.replace(region, '')),
        href: getNodeProperty(tds[3], null, 'href'),
        country: getText(document.querySelector('[data-id="countryTo"]')),
        region,
        roomType: [getText(tds[4]), getText(tds[5])].join(', '),
        boardType: getText(tds[6]),
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price.replace(/\d+/g, '')),
        city_from: city.classList.contains('disabled') ? "" : city.title,
        operator: OPERATOR_NAME,
        thumbnail: null,
        occupancy: SEARCH_CRITERIA.occupancy,
        excursion: !!tourName.match(/Экскурсионный/i)
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}

function getOccupancy() {
    try {
        let occupancy = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null
        };
    
        occupancy.adultsCount = +getNodeProperty(document.querySelector('.active [name="adultCount"]'), "0", 'value');
        occupancy.childrenCount = +getNodeProperty(document.querySelector('.active [name="childCount"]'), "0", 'value');
    
        if ( occupancy.childrenCount > 0 ) {
            occupancy.childAges = $$('[name="childAge"]').slice(0, occupancy.childrenCount).map(s => selectedOption(s)).join();
        }
        return occupancy;
    } catch(e) {
        return null;
    }
}
