window.OPERATOR_NAME = "Rainbow";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}


function injectData() {
    const div = $1(".kh-konfigurator-cena.kh-konfigurator-cena--calosc") && $1(".kh-konfigurator-cena.kh-konfigurator-cena--calosc").lastElementChild;
    if (div && !$1(".qq", div)) {
            div.prepend(qqBtns({align: "qq-horizontal"}));
        }
}

function getRegion(tourLocation) {
    return tourLocation[3] ? getText(tourLocation[3]) : null;
}

function createOption() {
    const checkinInfo = $$('.r-select-button__value');
    const checkinDtAndNights = getText($1('h5', checkinInfo[1]));
    const tourLocation = $$('.kh-breadcrumbs__link');
    const price = getText($1(".kh-konfigurator-cena.kh-konfigurator-cena--calosc").lastElementChild).split(/(?=\s+zł)/);
    let option = {
        checkinDt: checkinDtAndNights.split(' ')[0],
        nights: checkinDtAndNights.split('/ ')[1].split(' ')[0],
        hotelName: getText($1('.kh-header__container h1')),
        hotel_desc: getText($1('.kh-atuty-ofert span')),
        href: window.location.href,
        country: getText(tourLocation[2]),
        region: getRegion(tourLocation),
        roomType: getText($1('.kh-konfigurator-pokoj div').lastElementChild).replace(/[()]/g, ''),
        boardType: getText($1('span', checkinInfo[3])),
        price: parseInt(price[0].replace(/\s+/g, '')),
        currency: mapCurrencyUtil(price[1]),
        city_from: getText($1('span', checkinInfo[2])),
        operator: window.OPERATOR_NAME,
        thumbnail: `https://${AGENCY_DOMAIN}/image-proxy?url=${$1('.galeria-d__element').src}`,
        occupancy: getOccupancy(),
    };
    return option;
}

function getOccupancy() {
    const url = window.location.href;
    const passengers = url.match(/[?&]wiek=([^&]*)/g).map( men => men.split('=')[1]);
    const today = new Date().toLocaleDateString('ru-RU');
    const passengersAges = passengers.map(item => ageFromDate(item.split('-').reverse().join('-'), today));
    const adultsCount = passengersAges.filter(passengersAge => passengersAge >= '18').length;
    const childrenCount = passengersAges.filter(passengersAge => passengersAge < '18');
    let childAges = null;
    if (childrenCount) {
        childAges = childrenCount.join(', ');
    }
    return {
        adultsCount,
        childrenCount: childrenCount.length,
        childAges
    }
}
