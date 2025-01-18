window.OPERATOR_NAME = "Inspiro travel";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return {
        occupancy: getOccupancy()
    }
}

function getSearchButton() {
    return $1('#ContentPlaceHolder_ctl00_ctl01_ctl20_ctl00_cdTabsContent_Bsc_1_0_btnBuscar_0')
}

function injectData() {
    $$(".precio:not(.precio.sup)").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal", cssText: 'margin:4px'}));
        }
    });
}

function getNights(dates) {
    return getDistance(
        new Date(dates[0].split('.').reverse().join('-')),
        new Date(dates[1].split('.').reverse().join('-'))
    ).toString();
}

function getPriceAndCurrency(tour) {
    const priceAndCurrency = getText($1('.precio', tour).firstElementChild);
    const priceAndCurrencyArray = [priceAndCurrency.slice(0, -1), priceAndCurrency[priceAndCurrency.length - 1]];
    return {
        price: parseFloat(priceAndCurrencyArray[0].replace(".", "").replace(",", ".")),
        currency: mapCurrencyUtil(priceAndCurrencyArray[1]),
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const neededHotel = tour.closest('.vext');
    const dates = getText($1('.fechas .valor')).split(' - ').map(dt => dt.replace(/\D/g, '.'));
    const address = getText($1('.pob', neededHotel)).split(', ');

    let option = {
        checkinDt: dates[0],
        nights: getNights(dates),
        hotelName: getText($1('.tit', neededHotel).firstElementChild),
        hotel_desc: null,
        href: $1('.desc', neededHotel).firstElementChild.href,
        country: address[2],
        region: address[1],
        roomType: getText($1('.habitacion', tour)),
        boardType: getText($1('.regimen', tour)),
        price: getPriceAndCurrency(tour).price,
        currency: getPriceAndCurrency(tour).currency,
        city_from: null,
        operator: window.OPERATOR_NAME,
        thumbnail: $1('.imgCenter', neededHotel).dataset.src,
        occupancy: SEARCH_CRITERIA.occupancy,
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.cont');
}

function getAdultsCountOrChildrenCountOrChildAges(className, whatToReturn) {
    const occupancyInfo = $1(
        '#ContentPlaceHolder_ctl00_ctl01_ctl20_ctl00_cdTabsContent_Bsc_1_0_ctl02_0_pnlHabsDesglose_0');

    const allRooms = $$('.itm', occupancyInfo)
        .map(room => window.getComputedStyle(room).display !== 'none' ? room : null)
        .filter(elem => elem);

    const count = allRooms
        .map(room => $$(className, room)
            .map(adu => $$('option', adu)
                .map(option => option.selected ? option : null)
                .filter(option => option)
                .map(adult => adult.value)));

    if (whatToReturn === 'count') {
        const countArray = count.map(adult => Number(adult[0][0][0]));
        if (countArray.filter(count => count).length > 0) {
            return countArray.reduce((accumulator, currentValue) => accumulator + currentValue)
        }
        return 0
    }

    let childAges = [];
    count
        .map(arr => arr
            .map(age => Number(age))
            .filter(age => age !== -1)
            .map(age => childAges.push(age.toString())))
    return childAges
}

function getOccupancy() {
    const adultsCount = getAdultsCountOrChildrenCountOrChildAges('.cmb_itm_adu', 'count');
    const childrenCount = getAdultsCountOrChildrenCountOrChildAges('.cmb_itm_nin', 'count');

    let childAges;
    childrenCount !== 0 ?
        childAges = getAdultsCountOrChildrenCountOrChildAges('.cmb_itm_e') :
        childAges = null

    return {
        adultsCount,
        childrenCount,
        childAges,
    };
}
