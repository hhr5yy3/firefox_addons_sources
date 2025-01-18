window.OPERATOR_NAME = 'CoralTravel';
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$('.row .priceDetailes .resultPriceWrap').forEach(div => {
        if (!div.querySelector('.qq')) {
            div.prepend(qqBtns({align: 'qq-horizontal'}));
        }
    })
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const dateStart= getNodeData('#vsearcherFlightFromDate', document, 'value').replace(/\//g, '.');
    const dateEnd= getNodeData('#vsearcherFlightToDate', document, 'value').replace(/\//g, '.');
    const price = getNodeData('.priceVal', tour);
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getNodeData('.resultTitle', tour),
        href: getNodeData('a', tour, 'href'),
        country: getNodeData('.resultRegion').split(',')[0],
        region: getNodeData('.resultRegion').split(',')[1],
        roomType: getNodeData('.resultRoom', tour).split(': ')[1],
        boardType: getNodeData('.resultMeal', tour).split(': ')[1],
        price: Math.floor((Number(price.split(',')[0]) * Number(getDistance(dateStart, dateEnd)))),
        currency: getNodeData('.price', tour).split(' ')[2].split('/')[0],
        city_from: getNodeData('.flight-to-destination-airport', tour),
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('.resultPic', tour, 'src'),
        occupancy: getOccupancy(),
    };
    return option;
}

function getOccupancy() {
    const adultsCount = Number(getNodeProperty(getElementByXpath('//div[text() = \'Pieaugušo skaits\']/parent::div//input[@checked = \'checked\']'), '0', 'value'));
    const childrenCount = Number(getNodeProperty(getElementByXpath('//div[text() = \'Bērnu skaits\']/parent::div//input[@checked = \'checked\']'), '0', 'value'));

    const fullAgeOneChild = (node) => {
        const wasBornString = getNodeData('.datepickerChdAge', node, 'value');
        return ageFromDate(wasBornString, new Date().toLocaleDateString('ru'));
    }

    const howManyChildren = document.querySelectorAll('.chdBirthDayWrap');

    const addChildAgeToArray = () => {
        const agesArray = [];
        for (let i = 0; i <= howManyChildren.length - 1; i++) {
            if (howManyChildren[i].style.display === 'block') {
                agesArray.push(fullAgeOneChild(howManyChildren[i]));
            }
        }
        return agesArray;
    }

    const childAges = addChildAgeToArray().join();

    return {
        adultsCount,
        childrenCount,
        childAges,
    }

}

function getHotelRowByImage(img) {
    return img.closest('.row');
}
