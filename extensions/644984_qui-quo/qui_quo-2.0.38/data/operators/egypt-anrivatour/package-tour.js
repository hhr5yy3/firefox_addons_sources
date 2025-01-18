window.OPERATOR_NAME = 'Egypt-Anrivatour';
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".localPriceView").forEach(div => {
        if (!div.parentNode.querySelector(".qq")) {
            div.after(qqBtns({align: "qq-horizontal"}));
        }
    })
}

function getCheckinDtAndNights() {
    const checkinDt = getText($1('.hotel_dep_col')).split(' ')[2].replace(/-/g, '.');
    const dateArrivalArray = new Date(checkinDt.split('.').reverse().join('-'));
    const dateOfDepartureArray = new Date(getText($1('.hotel_ret_col')).split(' ')[2].split('-').reverse().join('-'));

    return {
        checkinDt,
        nights: getDistance(dateArrivalArray, dateOfDepartureArray).toString()
    };
}

function getCountry(region) {
    const countries = {
        Egypt: ['Sharm El Sheikh', 'Marsa Alam', 'Luxor', 'Hurghada', 'Cairo', 'Alexandria'],
        Armenia: ['Yerevan'],
        Greece: ['Thessaloniki'],
        Georgia: ['Tbilisi'],
        Tunisia: ['Monastir', 'Tunisia'],
        Jordan: ['Aqaba', 'Amman']
    }

    switch (true) {
        case countries.Egypt.includes(region):
            return 'Egypt'
        case countries.Armenia.includes(region):
            return 'Armenia'
        case countries.Greece.includes(region):
            return 'Greece'
        case countries.Georgia.includes(region):
            return 'Georgia'
        case countries.Tunisia.includes(region):
            return 'Tunisia'
        case countries.Jordan.includes(region):
            return 'Jordan'
    }

    return null

/*
    return Object.entries(countries).map(([key, value]) => value.includes(region) ? key : null).filter(Boolean).join()
*/

/*
    for (let country in countries) {
        for (let i = 0; i <= countries[country].length - 1; i++) {
            if (countries[country][i] === region) {
                return country
            }
        }
    }
    return null
    */

/*

        for (let i = 0; i <= Object.keys(countries).length - 1; i++) {
            if (Object.values(countries)[i].includes(region)) {
                return Object.keys(countries)[i]
            }
        }
    return null
*/

}

function getRoomType(tour) {
    if ($$('.room_type_members .infant', tour).length > 0 || $$('.room_type_members .child', tour).length > 0) {
        return getText($1('.room_type_name', tour)).split(' ').slice(0, -2).join(' ');
    }
    return getText($1('.room_type_name', tour));
}

function getBoardType() {
    const hotelFeatures = $1('.hotel_features');
    if (hotelFeatures) {
        const allLiInHotelFeatures = $$('li', $1('.hotel_features').lastElementChild)
        for (let i = 0; i <= allLiInHotelFeatures.length - 1; i++) {
            if (allLiInHotelFeatures[i].innerText.match('Питание')) {
                return allLiInHotelFeatures[i].innerText.split(' ').slice(1).join(' ')
            }
        }
    }
    return null
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const region = getText($1('.hotel_of_map').firstElementChild);
    const {checkinDt, nights} = getCheckinDtAndNights();

    let option = {
        checkinDt,
        nights,
        hotelName: getText($1('.hotel_single_name')),
        hotel_desc: getText($1('.hotel_info_txt_content')),
        href: null,
        country: getCountry(region),
        region,
        roomType: getRoomType(tour),
        boardType: getBoardType(),
        price: extractIntFromStr(getText($1('.localPriceView'))),
        currency: mapCurrencyUtil(getComputedStyle($1('.localPriceView'), '::after').content[2]),
        city_from: getUrlSearchParameters('from_value'),
        operator: window.OPERATOR_NAME,
        thumbnail: $1('.hotel_main_image').firstElementChild.src, //Но ее нет
        occupancy: getOccupancy(tour),
    };
    return option;
}

function getOccupancy(tour) {
    const allLiInTour = $$('ul li', $1('.room_type_members', tour));
    let adultsCount = 0;
    let childrenCount = 0;
    for (let i = 0; i <= allLiInTour.length - 1; i++) {
        if (allLiInTour[i].classList.contains('infant') || allLiInTour[i].classList.contains('child')) {
            childrenCount += 1;
        } else {adultsCount += 1;}
    }

    return {
        adultsCount,
        childrenCount
    }
}

function getHotelRowByImage(img) {
    return img.closest('.room_type_table_item');
}
