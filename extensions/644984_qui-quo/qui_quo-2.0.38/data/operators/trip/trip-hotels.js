window.OPERATOR_NAME = "Trip";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    const checkinDt = $1('#checkIn').dataset.key.split('/').reverse().join('.');
    const nights = getText($1('#preload-nights')).split(' ')[0];
    return {
        checkinDt,
        nights,
    };
}

function getSearchButton() {
    return $1('.search-button-new')
}

async function getCountryAndRegion (hotel) {
    const response = await fetch(`https://${location.hostname}/htls/getKeyWordSearch`, {
        "headers": {
            "accept": "application/json",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/json",

        },
        "body": `{"code":0,"codeType":"","keyWord":"${hotel}","searchType":"D","scenicCode":0,"cityCodeOfUser":0,"searchConditions":[{"type":"D_PROVINCE","value":"T"},{"type":"SupportNormalSearch","value":"T"}],"head":{"platform":"PC","region":"RU","locale":"ru-RU","timeZone":"3","p":"29504878345"}}`,
        "method": "POST"
    }).then(resp => resp.json());

    const countryAndRegionObject = response.keyWordSearchResults.find(item => item.resultWord === hotel);
    return {
        country: countryAndRegionObject.country.currentLocaleName,
        region: countryAndRegionObject.city.currentLocaleName
    }
}

function getBoardType (tour) {
    const boardType = $$('.highlight-tag', tour)
        .map(item => getText(item).toLowerCase())
        .filter(item => item.includes('завтрак'));
    return boardType.length > 0
        ? boardType.join().charAt(0).toUpperCase() + boardType.join().slice(1)
        : "Без питания"
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelName = getText($1('.name', tour));
    const {country, region} = await getCountryAndRegion(hotelName);
    const nights = SEARCH_CRITERIA.nights;
    const {price, currency} =
        getPriceAndCurrency(tour, nights, true, $1('#meta-real-price span', tour));
    let option = {
        checkinDt: SEARCH_CRITERIA.checkinDt,
        nights,
        hotelName,
        hotel_desc: "",
        href: "",
        country,
        region,
        roomType: getText($1('.room-panel-roominfo-name, .physicalRoomName', tour)),
        boardType: getBoardType(tour),
        price,
        currency,
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: $1('.m-lazyImg__img', tour)?.src,
        occupancy: getOccupancy(),
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.hotel-info');
}
