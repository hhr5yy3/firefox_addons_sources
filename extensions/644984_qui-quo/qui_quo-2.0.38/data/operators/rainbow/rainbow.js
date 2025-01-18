window.OPERATOR_NAME = "Rainbow";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".r-bloczek-cena").forEach(div => {
        if (!div.firstElementChild.querySelector(".qq")) {
            div.firstElementChild.prepend(qqBtns({align: "qq-horizontal"}));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const dateData = getText($1('.r-bloczek-wlasciwosci__dni', tour).firstElementChild).split(' ');
    const hotelNameNode = $1('.r-bloczek-naglowek.r-bloczek__body-naglowek', tour);
    const countryAndRegionArray = getText(hotelNameNode.nextElementSibling).split(' • ')[1].split(': ');
    const boardTypeAndCity_fromArray = $$('.icons-3__icon.icons-3__fill.r-bloczek-wlasciwosci__icon', tour);
    const price = getText($1(".r-bloczek-cena", tour).firstElementChild);
    let option = {
        checkinDt: dateData[0],
        nights: dateData[4],
        hotelName: getText(hotelNameNode.firstElementChild),
        hotel_desc: null,
        href: tour.href,
        country: countryAndRegionArray[0],
        region: countryAndRegionArray[1],
        roomType: null,
        boardType: getText(boardTypeAndCity_fromArray[1].nextElementSibling),
        price: parseInt(price.replace(/\D/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+/g, '').split('/')[0]),
        city_from: getText(boardTypeAndCity_fromArray[0].nextElementSibling),
        operator: window.OPERATOR_NAME,
        thumbnail: `https://${AGENCY_DOMAIN}/image-proxy?url=${$1('img[alt="zdjęcie oferty"]', tour).src}`,
        occupancy: getOccupancy(),
    };
    return option;
}

function getOccupancy() {
    const url = window.location.href;
    const adultsCount = url.match(/dorosli/g).length;
    let childrenCount = null;
    let childAges = null;
    const children = url.match((/dzieci=([\d-]+)/g));

    if (children) {
        childrenCount = children.length;
    }

    if (childrenCount) {
        const today = new Date().toLocaleDateString('ru-RU');
        const childrenBirth =  children.map(child => child.split('=')[1]);
        childAges = childrenBirth.map(item => ageFromDate(item.split('-').reverse().join('-'), today)).join(', ');
    }

    return {
        adultsCount,
        childrenCount,
        childAges
    }
}

function getHotelRowByImage(img) {
    return img.closest('.n-bloczek.szukaj-bloczki__element');
}
