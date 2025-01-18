window.OPERATOR_NAME = window.location.host.match(/coral/i) ? "Coral" : "Sunmar";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    const occupancy = getOccupancy();
    return {
        'occupancy': occupancy
    };
}

function getSearchButton() {
    return $1('[data-testid="quickSearchPackageTourSearchButton"]');
}

function injectData() {
    const priceInFlightPage = $1('.prices .bonus');
    if (priceInFlightPage) {
        if (!$1(".qq", priceInFlightPage.nextElementSibling)) {
            const qqElement = document.createElement('div');
            priceInFlightPage.nextElementSibling.style.display = 'flex';
            qqElement.append(qqBtns({align: "qq-horizontal"}));
            priceInFlightPage.nextElementSibling.prepend(qqElement);
        }
    }
    $$('.select-room-container .ant-btn.ant-btn-primary').forEach(button => {
        if (!$1(".qq", button.parentElement) && button.getAttribute('name') !== 'showMore') {
            button.parentElement.prepend(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function getPrice(tour, checkingElementOnFlightPage) {
    let price;
    let currency;

    if (!checkingElementOnFlightPage) {
        const divs = $$('div', tour)
        const discountPrice = $1('.discount-container', tour);
        if ( discountPrice) {
            const priceAndCurrency = getText(
                discountPrice.previousElementSibling)
                .replace(/\s+/g, '')
                .match(/([\d,]+)\s*([^\d\s]+)/);
            price = parseInt(priceAndCurrency[1]);
            currency = mapCurrencyUtil(priceAndCurrency[2]);
            return {
                price,
                currency
            }
        }
        const priceAndCurrency = getText(divs
            .find(div => div.textContent === ('Цена от'))
            .nextElementSibling)
            .replace(/\s+/g, '')
            .match(/([\d,]+)\s*([^\d\s]+)/);
        price = parseInt(priceAndCurrency[1]);
        currency = mapCurrencyUtil(priceAndCurrency[2]);
        return {
            price,
            currency
        }
    }

    const priceElem = $$('.prices').filter(i => i.getBoundingClientRect().height > 0)[0];
    const priceAndCurrency = getText(priceElem.lastElementChild.lastChild)
        .replace(/\s+/g, '')
        .match(/([\d,]+)\s*([^\d\s]+)/);
    price = parseInt(priceAndCurrency[1]);
    currency = mapCurrencyUtil(priceAndCurrency[2]);
    return {
        price,
        currency
    }
}
function getRoomTypeAndBoardType (tour, checkingElementOnFlightPage) {
    let roomType;
    let boardType;
    if (!checkingElementOnFlightPage) {
        roomType = getText($1('h3', tour));
        boardType = $1('.ant-select-selection-item', tour).title.split('-')[0];
        return {
            roomType,
            boardType
        }
    }

    const flightData = $$('.info');
    roomType = getText(flightData[3]);
    boardType = getText(flightData[2]);
    return {
        roomType,
        boardType
    }
}

function getCityFrom (tour, checkingElementOnFlightPage) {
    try {
        if (!checkingElementOnFlightPage) {
            return getText($1('.target-departure', tour)).split(': ')[1]
        }

        return getText($1('.flight-locations .flight-location')).split(' - ')[1];
    } catch (e) {
        console.log(e);
        return "";
    }

}

async function waitForAndClick(flight) {

    await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            const element = $1('[name="show-popover"]');
            setTimeout(()=>{
                clearInterval(interval);
                reject(null)
            }, 3000)
            if (element) {
                clearInterval(interval);
                resolve(element);
            }
        }, 100);
    });

    $1('[name="show-popover"]').click();

    await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            const element = $1('#popover-content');
            setTimeout(() => {
                clearInterval(interval);
                reject(null)
            }, 3000)
            if (element) {
                clearInterval(interval);
                resolve(element);
            }
        }, 100);
    });
    $1('[name="show-popover"]').click();

    if (flight) {
        return await new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                const element = $$('.flight-card-detail');
                setTimeout(() => {
                    clearInterval(interval);
                    reject(null)
                }, 3000)
                if (element.length > 0) {
                    clearInterval(interval);
                    resolve(element);
                }
            }, 100);
        });
    }
}

waitForAndClick();

function getNightsAndExtra (tourDetails) {
    if ( tourDetails[1] ) {
        const nightsAndExtra = getText($1('div', tourDetails[1])).match(/\d+\s*н|ночей.+?\d*/g).map(item => item.replace(/\D/g, ''))
        return {
            nights: nightsAndExtra[0],
            extra_nights: nightsAndExtra.length > 1 ? nightsAndExtra[1] : null
        }
    }

    const nightsAndExtra = getText($1('.duration')).match(/\d+/g).map(item => item.replace(/\D/g, ''))
    return {
        nights: nightsAndExtra[0],
        extra_nights: nightsAndExtra.length > 1 ? nightsAndExtra[1] : null
    }

}

async function createOption(img) {
    const checkingElementOnFlightPage = $1('.prices .bonus');
    const tour = getHotelRowByImage(img);
    const tourDetails = $$('.information-column-content');
    const location = getText($1('.location', $1('#HotelName').parentElement));
    const {price, currency} = getPrice(tour, checkingElementOnFlightPage);
    const {roomType, boardType} = getRoomTypeAndBoardType(tour, checkingElementOnFlightPage);
    const {nights, extra_nights} = getNightsAndExtra(tourDetails);
    const nextData = getNodeData('#__NEXT_DATA__', document, 'textContent', '');
    const dateBegin  = nextData.match(/tourBeginDate.+?(\d{4}.\d{2}.\d{2})/);
    const dateFromDetails = getNodeData('div', tourDetails[0], 'textContent', '').split(' - ')[0]

    let option = {
        checkinDt: dateFromDetails && dateFromDetails.match(getRegexPatterns().date)  ? dateFromDetails :  (dateBegin && dateBegin[1].split('-').reverse().join('.')),
        nights,
        extra_nights,
        hotelName: getText($1('#HotelName')),
        hotel_desc: null,
        href: window.location.href,
        country: location.split(', ')[0],
        region: location.split(', ').slice(1).join(', '),
        roomType,
        boardType,
        price,
        currency,
        city_from: getCityFrom(tour, checkingElementOnFlightPage),
        operator: window.OPERATOR_NAME,
        thumbnail: $1('.previewImageWrapper ').firstElementChild.src,
        occupancy: SEARCH_CRITERIA.occupancy,
        flight: img.classList.contains('qq-rating-btn') ? null : await getFlight()
    };
    return option;
}

function getOccupancy () {
    try {
        const occupancyNode = $1('#popover-content');
        const adultsCount = parseInt($1('[name="adultInput"]', occupancyNode).value);
        const childrenCount = parseInt($1('[name="childrenInput"]', occupancyNode).value);
        let childAges = null;
        if (!isNaN(adultsCount)) {
            childAges = $$('.ant-select-selection-item', occupancyNode).map(item => item.title).join(', ');
        }
        return {
            adultsCount: !isNaN(adultsCount) ? adultsCount : null,
            childrenCount: !isNaN(childrenCount) ? childrenCount : null,
            childAges
        };
    } catch (e) {
        return null;
    }

}

function getHotelRowByImage(img) {
    const tour = $1('.select-room-container').lastElementChild.children;
    for (const element of tour) {
        if (element.contains(img)) {
            return element;
        }
    }
    return null;
}

async function getFlight () {
    try {
        const flightCardsSelected = $$('.flight-card.selected');
        if ( flightCardsSelected.length <= 0 ) {
            return null
        }

        flightCardsSelected.map(card => $1('.show-more-icon', card).click());

        const flightCardDetails = await waitForAndClick(true);
        const departureSector = {
            segments: createSegment(flightCardDetails[0])
        }

        const arrivalSector = {
            segments: createSegment(flightCardDetails[1])
        }
        flightCardsSelected.map(card => $1('.show-more-icon', card).click());

        return {
            sectors: [departureSector, arrivalSector]
        };
    } catch (e) {
        console.log(e);
        return null;
    }


}
