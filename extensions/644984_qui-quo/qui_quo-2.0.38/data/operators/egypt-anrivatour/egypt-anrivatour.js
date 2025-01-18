window.OPERATOR_NAME = 'Egypt-Anrivatour'
window.showTopHotelsRating = true;

function initializeSearchCriteria () {
    const checkinDtAndNights = getCheckinDtAndNights();
    const occupancy = getOccupancy();
    return {
        'checkinDtAndNights': checkinDtAndNights,
        'occupancy': occupancy
    }
}

function getSearchButton () {
    return $1('.form_conf');
}

function injectData () {
    $$('.hotel_price_number').forEach(div => {
        if (!div.querySelector('.qq')) {
            div.prepend(qqBtns({align: 'qq-horizontal'}));
        }
    })
}

function getCheckinDtAndNights() {
    if (!$1('#Hdeparture_date')) {
        return
    }
    const checkinDt = $1('#Hdeparture_date').value.replace(/-/g, '.');
    let dateArrivalArray = [];
    for (let i = checkinDt.split('.').length - 1; i >= 0; i--) {
        dateArrivalArray.push(checkinDt.split('.')[i])
    }

    let dateOfDepartureArray = [];
    for (let i = $1('#Hreturn_date').value.split('-').length - 1; i >= 0; i--) {
        dateOfDepartureArray.push($1('#Hreturn_date').value.split('-')[i]);
    }

    return {
        checkinDt,
        nights: getDistance(new Date(dateArrivalArray.join('-')), new Date(dateOfDepartureArray.join('-'))).toString()
    };
}

function getBoardType(tour) {
    const allLiInHotelList = $$('li', $1('.hotel_list', tour));
    for (let i = 0; i <= allLiInHotelList.length - 1; i++) {
        if (getText(allLiInHotelList[i]).match('Питание')) {
            return getText(allLiInHotelList[i]).split(' ').slice(1).join(' ');
        }
    }
    return null
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    let option = {
        checkinDt: SEARCH_CRITERIA.checkinDtAndNights.checkinDt,
        nights: SEARCH_CRITERIA.checkinDtAndNights.nights,
        hotelName: getText($1('.hotel_title', tour)),
        href: null,
        country: getText($1('.serch_res_title_block')).split(' ').filter(Boolean)[3],
        region: getText(getElementByXpath('h3', $1('.hotel_of_map', tour))),
        roomType: null,
        boardType: getBoardType(tour),
        price: parseFloat(getText($1('.hotel_price_number', tour)).split(' ')[2]),
        currency: mapCurrencyUtil(getComputedStyle($1('.hotel_price_number', tour), '::after').content.split('')[2]),
        city_from: null,
        operator: window.OPERATOR_NAME,
        thumbnail: getComputedStyle($1('.hotel_thumbnail', tour)).background.split(' ')[4].split('"')[1], // Правда картинок нету :)
        occupancy: SEARCH_CRITERIA.occupancy,
    };
    return option;
}

function getOccupancy() {
    const adultsCount = Number(getText(getElementByXpath('div/p', $$('.passengers_column')[0])));
    const childrenCount = Number(getText(getElementByXpath('div/p', $$('.passengers_column')[1])));
    const babyCount = Number(getText(getElementByXpath('div/p', $$('.passengers_column')[2])));
/*
    // Подсчет возрастов
    const childrenAgesArray = $$('.age_of_children .eoc_block');
    const childAges = [];
    for (let i = 0; i <= childrenAgesArray.length - 1; i++) {
        childAges.push(getText(getElementByXpath('div/p', childrenAgesArray[i])))
    }
    for (let j = 1; j <= babyCount; j++) {
        childAges.push('1')
    }
*/

    return {
        adultsCount,
        childrenCount: childrenCount + babyCount,
    }
}

function getHotelRowByImage(img) {
    return img.closest('.hotel_search_res_item');
}
