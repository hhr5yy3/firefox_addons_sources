window.OPERATOR_NAME = "Novatours";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return {
        occupancy: getOccupancy()
    }
}

function getSearchButton() {
    return $1('.searchBtnBlock .btn-primary');
}

function injectData() {
    const neededElementsArray = $$(".special-agent-offer");
    neededElementsArray.forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const isForRating = img.classList.contains('qq-rating-btn');
    const allTdsInTour = $$('td', tour);
    const aWithHotelNameAndHref = $1('a', allTdsInTour[2]) || $1('a', tour);
    const stars =
        aWithHotelNameAndHref &&
        aWithHotelNameAndHref.nextSibling &&
        getText(aWithHotelNameAndHref.nextSibling).match(/\d+/g);
    const flightInfoIcon = $1('.flightsInfoModalShow', tour);
    const flightUrl = flightInfoIcon.dataset.url;

    const region = getText(allTdsInTour[0])
        .split(' ')
        .filter((item) => item !== '')
        .map((i) => i.replace('\n', ''))
        .join(' ');
    let option = {
        checkinDt: extractDate(getText(allTdsInTour[3])),
        nights: getText(allTdsInTour[5]),
        hotelName: getText(aWithHotelNameAndHref) + (stars ? ' ' + stars[0] + '*' : ''),
        hotel_desc: null,
        href: aWithHotelNameAndHref.href,
        country: getCountryByRegion(region.split(/\s*\/\s*/g)[0].toLowerCase()),
        region: region.replace(/\s*\/\s*/g, ', '),
        roomType: getText($1('small', allTdsInTour[2])),
        boardType: getText(allTdsInTour[7]),
        price: extractIntFromStr(getText($1('strong', allTdsInTour[4]))),
        currency: mapCurrencyUtil(getText($1('small', allTdsInTour[4]))),
        operator: window.OPERATOR_NAME,
        thumbnail: null,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    if (!isForRating) {
        const flightText = await fetch(location.origin + '/' + flightUrl).then((r) => r.text());
        const flightPopup = getDocumentFromString(flightText);
        option.city_from = getDataByCode(getText($1('.flight-info-date', flightPopup).nextElementSibling), 'region');
    }
    if (option.city_from && option.city_from === option.region) {
        option.region = getText(allTdsInTour[1])
            .split(' ')
            .filter((item) => item !== '')
            .map((i) => i.replace('\n', ''))
            .join(' ');
    }
    return option;
}

function extractDate(dateText) {
    const dateArray = dateText.split(/-/);
    const yearIndex = dateArray.findIndex(str => str.match(/\d{4}/));
    if ( yearIndex === 0 ) {
         return dateArray.reverse().join('.');
    }
    return dateArray.join('.');
}

function getCountryByRegion(region) {
    const locations = $$('#country option').filter(option => option.value !== 'all');
    const groups = locations.filter(option => option.classList.contains('optionGroup')).map(group => ({
        country: getText(group), node: group, children: []
    }));

    for ( const group of groups ) {
        group.children = collectGroupChild(group.node)
    }
    const searchGroupResult = groups.find( group =>  group.children.join('|').toLowerCase().match(region))
    return searchGroupResult ? searchGroupResult.country: null;
}

function collectGroupChild(group) {
    let child = group.nextElementSibling;
    const children = [];
    while ( child &&  child.classList.contains('optionChild') ) {
        children.push(child)
        child = child.nextElementSibling;
    }
    return children.extractNodesText();
}

function getOccupancy() {
    try {
        const adultsCount = Number($$('option', $1('#adults')).filter(i => i.defaultSelected)[0].label);
        const childrenCount = Number($$('option', $1('#childs')).filter(i => i.defaultSelected)[0].label);
        const childAges = $$('.col-xs-3').filter(i => i.style.display === 'block').map(i => $$('option', i).filter(i => i.defaultSelected)[0].label);

        return {
            adultsCount,
            childrenCount,
            childAges
        }
    } catch (e) {
        return null;
    }
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
