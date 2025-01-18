window.OPERATOR_NAME = "TPG";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const city_from = getCity();
    if ( !city_from ) {
        return null;
    }
    const country = getNodeData('#suggest button')
    const occupancy = getOccupancy();
    return {city_from, occupancy, country};
}

function getSearchButton() {
    return $1('#tpg-search-extension button[type="submit"]')
}

function injectData() {
    $$("a[href*='tour/']").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            const buttons = qqBtns({align: "qq-horizontal", cssText: 'margin:4px'});
            const ratingBtn = $1('.qq-rating-btn', buttons);
            if ( ratingBtn ) {
                ratingBtn.style.cssText = `background: initial; width: initial;`;
            }
            div.after(buttons);
        }
    });
    $$("[href*='basket']").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") && checkDivByChildCount(div, 10) ) {
            const buttons = qqBtns({align: "qq-horizontal", cssText: 'margin:4px' }, createAgencyOption);
            const ratingBtn = $1('.qq-rating-btn', buttons);
            if ( ratingBtn ) {
                ratingBtn.style.cssText = `background: initial; width: initial;`;
            }
            div.after(buttons);
        }
    });
}

function getCity() {
    return getNodeData('input[placeholder="Выберите город"], input[placeholder="Виберіть місто"]', document, 'value')
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelNode = findHotelDiv(tour);
    const anchor = $1('a', hotelNode);
    let priceValue = 0;
    const href = getNodeData("a[href*='tour/']", tour, 'href');
    const url = new URL(href);
    const tourLink = url.pathname.split(/\//).reverse()[0];
    const tourInfo = await fetch(`https://tours-api.tpg.ua/api/tour/prices/${tourLink}`).then(r => r.json());

    priceValue = tourInfo.prices[0].price['uah'];
    const tourData = tourInfo.prices[0];


    let option = {
        checkinDt: new Date(tourData.date).toLocaleDateString('ru'),
        nights: String(tourData.nights),
        hotelName: tourData.hotelsCombination.map(c => c.name).join(' / ') || tourInfo.name,
        href: anchor.href,
        country: tourInfo.country.name,
        region: tourInfo.city.name,
        roomType: tourData.room.name,
        boardType: tourData.room.meal,
        price: priceValue,
        currency: "UAH",
        city_from: tourData.departureCity.name ||  "",
        operator: window.OPERATOR_NAME,
        thumbnail: tourInfo.photo,
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : "",
    };
    return option;
}

async function createAgencyOption(img) {
    const tour = getHotelRowByImage(img);
    const divs = [...tour.childNodes].filter(d => d.tagName === 'DIV' || d.tagName === 'A');
    const dates = getText(divs[0]).split(/\//).map(dt => makeYear4Digits(dt))
    const [fullNights, hotelNights] = getText(divs[1]).match(/\d+/g);
    let priceValue = 0;
    if ( !img.classList.contains('qq-rating-btn') ) {
        const priceImage = $1('canvas', tour).parentNode;
        priceImage.classList.add('qq-zoom-captcha')
        await waitingFor(() => null, 2, 50);
        priceValue = prompt('Пожалуйста, введите цену с картинки (без пробелов и валюты)');
        priceImage.classList.remove('qq-zoom-captcha')
    }
    let option = {
        checkinDt: dates[0],
        nights: hotelNights || fullNights,
        extra_nights: String(fullNights-hotelNights),
        hotelName: getText(divs[2]),
        href: getNodeProperty($1('a', divs[2]), null, 'href'),
        country: SEARCH_CRITERIA.country,
        region: getText(divs[3]),
        roomType: getText(divs[5]),
        boardType: getText(divs[4]),
        price: Number(priceValue),
        currency: "UAH",
        city_from: SEARCH_CRITERIA ? SEARCH_CRITERIA.city_from : "",
        operator: window.OPERATOR_NAME,
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null,
    };
    return option;
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const text = getNodeData('input[value*="взр"], input[value*="дорос"]', document, 'value');
    const matchResultAdults = text.match(/\d+\s*взр|\d+\s*дорос/);
    if ( !matchResultAdults ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(matchResultAdults[0]);
    const matchResultKids = text.match(/\d+\s*діт|\d+\s*дет|\d+\s*дит|\d+\s*реб/);
    if ( matchResultKids ) {
        occupancy.childrenCount = extractIntFromStr(matchResultKids[0])
    }
}

function getDate(dateDiv) {
    const dateText = getText(dateDiv);
    return dateFromDayAndMonthName(...dateText.split(/\s+/))
}

function checkDivByChildCount(checkDiv, count=7) {
   const div = checkDiv.parentNode.parentNode.parentNode.parentNode;
   return (div && div.childElementCount === 7) || (div && div.childElementCount === 8) || (div && div.childElementCount === count)
}

function findHotelDiv(tour) {
   let hotelDiv = tour;
   while (hotelDiv) {
       if ( hotelDiv.firstChild && hotelDiv.firstChild.tagName === 'A' ) {
           return hotelDiv;
       }
       hotelDiv = hotelDiv.parentNode;
   }
}

function getHotelRowByImage(img) {
    const hotelDiv = img.parentNode.parentNode;
    if (hotelDiv.firstChild && hotelDiv.firstChild.tagName === 'A') {
        return hotelDiv;
    }
    return img.parentNode.parentNode.parentNode.parentNode.parentNode;
}
