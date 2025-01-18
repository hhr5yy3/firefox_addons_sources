window.OPERATOR_NAME = 'MoldovaTrans';
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return {
        occupancy: getOccupancy(),
    };
}

function getSearchButton() {
    const hideFilterButton = document.querySelector('#togglehideafter').closest('tr');
    return hideFilterButton.querySelector('input')
}

function injectData() {
    $$('.nowraptable .price').forEach(a => {
        if ( !a.parentNode.querySelector('.qq') ) {
            a.parentNode.append(qqBtns({align: 'qq-horizontal'}));
        }
    })
}

function getHotelName(hotelNameAndRegionArrayNode) {
    let hotelNameArray = hotelNameAndRegionArrayNode[0].text.split(' ')
    hotelNameArray.length = hotelNameArray.length - 1;
    return hotelNameArray.join(' ')
}

function getCountry() {
    const countryNode = getElementByXpath('//*[@id="isfilter"]/div[3]/div[1]/p[2]');
    const countryValue = getNodeData('.fx48', countryNode, 'value');
    const allPossibleCountries = countryNode.querySelectorAll('option');
    const countriesWithTheirNumbers = {};
    for ( let i = 0; i <= allPossibleCountries.length - 1; i++ ) {
        countriesWithTheirNumbers[allPossibleCountries[i].value] = allPossibleCountries[i].text
    }
    return countriesWithTheirNumbers[countryValue];
}

function getCheckinDt() {
    const tableWithHotels = document.querySelector('.nowraptable');
    const checkinDtNode = tableWithHotels.firstChild;
    return checkinDtNode.dataset.daterow.replace(/-/g, '.');
}

function getHotelNameAndRegionArrayNode(tour) {
    const hotelNameAndRegionNode = tour.querySelector('.fx48');
    return hotelNameAndRegionNode.querySelectorAll('a');
}

function getRoomType(tour, allTdInTour) {
    const allSpanInTd4 = allTdInTour[4].querySelectorAll('span');
    const howManyExtraBeds = Number(allSpanInTd4[2].attributes.extrabed.value) - 1;
    return `${getText(allSpanInTd4[0])} (${getText(allSpanInTd4[1])})${(howManyExtraBeds > 0) ? (`, ${howManyExtraBeds} extrabed`) : ''}`
}

function getCityFrom() {
    const cityFromNode = getElementByXpath('//*[@id="isfilter"]/div[3]/div[1]/p[4]/select');
    if ( !cityFromNode ) {
        return "";
    }
    const allPossibleCities = cityFromNode.querySelectorAll('option');
    const citiesWithTheirNumbers = {};
    for ( let i = 0; i <= allPossibleCities.length - 1; i++ ) {
        citiesWithTheirNumbers[allPossibleCities[i].value] = allPossibleCities[i].text;
    }
    return citiesWithTheirNumbers[cityFromNode.value]
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const allTdInTour = tour.querySelectorAll('td');

    let option = {
        checkinDt: getCheckinDt(),
        nights: getNodeData('.pakdays', tour),
        hotelName: getHotelName(getHotelNameAndRegionArrayNode(tour)),
        href: getNodeData('a', tour, 'href'),
        country: getCountry(),
        region: getHotelNameAndRegionArrayNode(tour)[1].text,
        roomType: getRoomType(tour, allTdInTour),
        boardType: allTdInTour[5].textContent,
        price: Math.floor(Number(tour.dataset.price)),
        currency: mapCurrencyUtil(getNodeData('.price.mbg.tipsy', tour).split(' ').pop()),
        city_from: getCityFrom(),
        operator: window.OPERATOR_NAME,
        thumbnail: null,
        occupancy: SEARCH_CRITERIA.occupancy,
    }
    return option;
}

function getOccupancy() {
    const adultsCount = Number(getElementByXpath('//*[@id="isfilter"]/div[3]/div[2]/p[2]/select').value);
    const childrenCount = Number(getElementByXpath('//*[@id="isfilter"]/div[3]/div[3]/p/select').value);

    const childrenAgesDiv = document.querySelector('#childrenages');
    const howManyChildren = childrenAgesDiv.querySelectorAll('.joinupmini');

    const addChildAgeToArray = () => {
        const agesArray = [];
        for ( let i = 0; i <= howManyChildren.length - 1; i++ ) {
            agesArray.push(howManyChildren[i].value)
        }
        return agesArray.join(', ');
    }

    const childAges = addChildAgeToArray();

    const neededReturn = {
        adultsCount,
        childrenCount,
        childAges,
    };

    if ( isFinite(adultsCount) ) {
        if ( isFinite(childrenCount) ) {
            return neededReturn;
        } else {
            neededReturn.childrenCount = 0;
            return neededReturn;
        }
    } else {
        return null;
    }
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
