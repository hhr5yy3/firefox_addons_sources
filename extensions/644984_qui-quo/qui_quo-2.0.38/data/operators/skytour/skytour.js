window.OPERATOR_NAME = 'Skytour';
window.showTopHotelsRating = false;

function initializeSearchCriteria () {
    return {
        occupancy: getOccupancy()
    };
}

function getSearchButton () {
    return $1('.global_search');
}

function injectData () {
    $$('#animateblock').forEach(div => {
        if (!div.querySelector('.qq')) {
            getElementByXpath('a/div[1]/strong', div).after(qqBtns({align: 'qq-horizontal', createOption,cssText: 'margin-left:6px;'}))
        }
    })
}

function getCheckinDtAndNights (option) {
    const arrivalDateArray = getText(getElementByXpath('tbody/tr[1]/td[1]', $1('.responstable'))).split(' ');
    const arrivalDay = arrivalDateArray[0].match(/\d+/g);
    const arrivalMonth = monthNameToNumber(arrivalDateArray[1], '2');
    const checkinDt = [arrivalDay[0], arrivalMonth.toString(), arrivalDateArray[2]].join('.');
    const arrivalDate = new Date (Date.parse([arrivalDateArray[2], arrivalMonth.toString(), arrivalDay[0]].join('-')))
    const departureDateArray = getText(getElementByXpath('tbody/tr[2]/td[1]', $1('.responstable'))).split(' ');
    const departureDay = departureDateArray[0].match(/\d+/g);
    const departureMonth = monthNameToNumber(departureDateArray[1], '2');
    const departureDate = new Date (Date.parse([departureDateArray[2], departureMonth.toString(), departureDay[0]].join('-')))
    if (option === 'checkinDt') {
        return checkinDt
    }
    return getDistance(arrivalDate, departureDate).toString();
}
function createOption(img) {
    const tour = getHotelRowByImage(img);
    const desiredInfoInTour = getText(tour);

    let option = {
        checkinDt: getCheckinDtAndNights('checkinDt'),
        nights: getCheckinDtAndNights(),
        hotelName: getText($1('.hotelname', tour.parentNode)),
        href: null,
        country: 'EGYPT',
        region: 'SHARM EL-SHEIKH',
        roomType: desiredInfoInTour.split(' ').slice(0, -1).join(' '),
        boardType: desiredInfoInTour.split(' ').splice(-1).join(' ').split(/\d/)[0],
        price: Number(desiredInfoInTour.split(/[^\d+]/).filter(elem => elem !== '' && elem.length >= 2)),
        currency: mapCurrencyUtil(getText(getElementByXpath('a/div[2]', tour)).split('').splice(-1).join()),
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getElementByXpath('div[1]/img', tour.parentNode).src,
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null,
    };
    return option;
}

function getOccupancy () {
    try {
        const adultsCount = Number($1('#adults_count').value);
        const childrenCount = Number($1('#childs_count').value);
        let childAges = [];
        for ( let i = 0; i <= 3; i++ ) {
            if ( $1(`.childe_age_${i}`) !== null ) {
                childAges.push($1(`.childe_age_${i}`).value)
            }
        }
        return {
            adultsCount,
            childrenCount,
            childAges: childAges.join(', ')
        };
    } catch(e) {
        return null;
    }
}

function getHotelRowByImage(img) {
    return img.closest('#animateblock');
}
