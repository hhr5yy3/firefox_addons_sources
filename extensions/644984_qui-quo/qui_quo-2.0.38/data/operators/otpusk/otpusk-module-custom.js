window.OPERATOR_NAME = "XO";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    querySelectorAll(document, '[data-tourid]').forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.after(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const buyBtn = tour.querySelector('[data-tourid]');
    const {country, city: region, date, people, len} = buyBtn.dataset;
    const getLiText = (sel) => getNodeProperty(tour.querySelector(sel), '', 'innerText');

    let option = {
        checkinDt: new Date(date).toLocaleDateString('ru-Ru'),
        nights: (+len-1).toString(),
        hotelName: getHotelName(),
        hotel_desc:  getNodeProperty(document.querySelector('[class*="hotel-text"]'), '', 'textContent'),
        href: buyBtn.href,
        country,
        region,
        roomType: getLiText('[class*="tour-li-room"]'),
        boardType: getLiText('[class*="tour-li-food"]'),
        price: extractIntFromStr(getLiText('[class*="tour-li-price"] span').replace(/\D/g, '')),
        currency: mapCurrencyUtil(getLiText('[class*="tour-li-price"] span .currency')),
        city_from: getCity(),
        operator: ['XO', getLiText('[class*="tour-li-price"] small')].join(' / '),
        thumbnail: getBackgroundImageUrl(document.querySelector('[class*="full-image"]')),
        occupancy: getOccupancy(people)
    };
    return option;
}

function getHotelName() {
    const name = getText(document.querySelector('[class*="hotel-name"]'));
    const starsElem = document.querySelector('[class*="hotel-stars"]');
    const stars = starsElem ? starsElem.className.replace(/\D/g,'') : null;
    return stars ? `${name} ${stars}*` : name;
}

function getCity() {
    const filters = getNodeProperty(document.querySelector('[class*="tour-filters-container"] span'), '');
    const city = filters.split(', ').find(e => e.match(/из\s.+/));
    return city || '';
}

function getOccupancy(peopleStr) {
    try {
        let occupancy = {
            adultsCount: +peopleStr[0],
            childrenCount: 0,
            childAges: null
        };

        const kidsAges = peopleStr.slice(1);
        if ( kidsAges ) {
            occupancy.childrenCount = kidsAges.length / 2;
            occupancy.childAges = kidsAges.match(/.{2}/g).join();
        }
        return occupancy;
    } catch (e) {
        return null;
    }
}

function getHotelRowByImage(img) {
    return img.closest('[class*="tour-li-block"]');
}