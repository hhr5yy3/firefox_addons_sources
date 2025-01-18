window.OPERATOR_NAME = "GTO TRAVEL";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const country = getCountry();
    const cityFrom = getCity();
    return {country, cityFrom};
}

function getSearchButton() {
    return $1('.submit-button')
}

function injectData() {
    $$("#results [data-price].book-button").forEach(div => {
        if (!div.parentNode.querySelector(".qq")) {
            div.after(qqBtns({align: "qq-horizontal"}));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const buyButton = $1('[data-price]',tour);
    const dataset = buyButton.dataset;
    const dateStart =  dataset.dateFrom.split('-').reverse().join('.');
    const dateEnd = dataset.dateTo.split('-').reverse().join('.');


    const tourCard = tour.closest('.result')
    const hotelStars = $$('span.fa-star', tourCard).length;
  //  const flight = await getFlight(tourCard);

    const [roomType, accommodation] = getRoomType(tour);
        let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: `${dataset.hotelName} ${hotelStars ? hotelStars+'*' :''}`.trim(),
        href: getNodeData('a[href*="hotel"]', tourCard, 'href'),
        country: SEARCH_CRITERIA.country,
        region: dataset.cityName,
        roomType,
        accommodation,
        boardType: getBoard(tour),
        price: extractIntFromStr(dataset.price),
        currency: dataset.currency,
        city_from: SEARCH_CRITERIA.cityFrom,
        operator: window.OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl($1('[data-bg]', tourCard)),
        occupancy: {
            adultsCount: extractIntFromStr(dataset.adults),
            childrenCount: extractIntFromStr(dataset.kids),
            childAges: null
        }
    };
    return option;
}

function getRoomType(card) {
   const keyItem = $1('.fa-key', card);
   return getNodeProperty(keyItem.parentNode, '').split(/,\s+/)
}

function getBoard(card) {
    const item = $1('.fa-utensils', card);
    const boardItem = $1('[data-original-title]', item.parentNode)
    return `${getText(boardItem)}, ${boardItem.dataset.originalTitle}`;
}
function getCountry() {
    return getNodeData('.dropdown-accordion.expanded .dropdown-item-text')
}

function getCity() {
    const menu = $1('.menu-pick-city-from').parentNode;
    return getNodeProperty($1('a[role="button"]', menu))
}

// async function getFlight(card) {
//     try {
//         const tourInfoBtn = $1('.package-info[data-url]');
//         if (tourInfoBtn ) {
//             const url = tourInfoBtn.dataset.url;
//             const pageText = await fetch(url).then(resp => resp.text());
//             const pageDoc = getDocumentFromString(pageText);
//             console.log(pageDoc)
//             const sectors = $$('.tickets .row', pageDoc).map(parseSector)
//             console.log(sectors)
//         }
//     } catch (e) {
//         console.log(e);
//         return null;
//     }
// }

// function parseSector(sector) {
//     console.log(sector)
//     const atoms = $$('.pseudolink', sector)
//
//     console.log(segments)
// }

function getHotelRowByImage(img) {
    return img.closest('.card-body');
}
