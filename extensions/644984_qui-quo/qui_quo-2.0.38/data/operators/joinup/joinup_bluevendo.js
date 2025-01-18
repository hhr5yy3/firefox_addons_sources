window.OPERATOR_NAME = "JoinUP";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".hoverinfo").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.prepend(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function waitingForPriceChange(selector) {
    return new Promise(resolve => {
        const observer = new MutationObserver(() => {
            if (selector) {
                observer.disconnect();
                resolve(getText(selector.firstElementChild).split(' '));
            }
        });

        observer.observe(selector, {childList: true});
    });
}

async function getPriceAndCurrency () {
    const priceAndCurrencyArray = await waitingForPriceChange($1('#finalprice'));
    const price = parseInt(priceAndCurrencyArray[0]);
    const currency = priceAndCurrencyArray[1];
    return {
        price,
        currency
    }
}

function checksQQPresses(tour) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(reject, 500);
        const interval = setInterval(() => {
            const qqAddBtn = $1('.qq-add-btn', tour);
            if (qqAddBtn.classList.contains('qq-loading')) {
                clearTimeout(timer);
                clearInterval(interval);
                $1('input[type="radio"]', tour).click();
                resolve();
            }
        }, 100);
    })
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    await checksQQPresses(tour);
    const {price, currency} = await getPriceAndCurrency();
    const [hotelName, region, country] = getNodeData('.head').split(/[-,]/).map(item => item.trim());
    const [boardType, roomType, nights] = $$('.center', tour).reverse().map(item => getText(item));
    let option = {
        checkinDt: getElementShallowText($1('.left', tour)).split("-").reverse().join('.'),
        nights: nights.split(' ')[0],
        hotelName,
        hotel_desc: getNodeData('.field'),
        href: null,
        country,
        region,
        roomType,
        boardType,
        price,
        currency,
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: $1('img', $1('.gallery').firstElementChild).src,
        occupancy: getOccupancy(),
    };
    return option;
}

function getOccupancy() {
    const occupancyString = $1('.roomConfiguration').selectedOptions[0].value.split('_');
    const adultsCount = getAdultsCount(occupancyString);
    const childrenCount = occupancyString.filter(item => item.includes('CH') || item === 'INF').length;
    return {
        adultsCount,
        childrenCount,
        childAges: null
    }
}

function getAdultsCount (occupancyString) {
    const coreAdults = parseInt(occupancyString[0]);
    const additionalAdults = occupancyString.filter(item => item === 'AD').length;
    return coreAdults + additionalAdults;
}

function getHotelRowByImage(img) {
    return img.closest('.row_0, .row_1');
}