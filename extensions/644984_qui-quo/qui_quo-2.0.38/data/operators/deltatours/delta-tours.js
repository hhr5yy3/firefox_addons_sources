window.OPERATOR_NAME = "Deltatours";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const { city, country } = getCityAndCountry();
    return {
        occupancy: getOccupancy(),
        city_from: city,
        country
    };
}

function getSearchButton() {
    return $1('#sToursSearchButton')
}

const nonTourNameList = [
    'документ', 'визовое', 'виза'
]

function isTour(div) {
    const name = getText(div.closest('.hotel').querySelector('h5>a')).toLowerCase();
    return nonTourNameList.every(substring => !name.includes(substring));
}

function injectData() {
    $$(".hotel-room>.row").forEach(div => {
        const a = div.parentNode.parentNode;
        const isFirstHotel = a.firstElementChild.isEqualNode(div.parentNode);
        if (!div.querySelector(".qq") && isTour(div)) {
            div.append(createCell(isFirstHotel))
        }
    });
}

function createCell(isFirstHotel) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('qq');
    if(!isFirstHotel) {
        newDiv.style.display = 'flex';
        newDiv.style.alignItems = 'center';
    }
    newDiv.append(qqBtns({align: "qq-horizontal"}));

    const divContainer = document.createElement('div');
    divContainer.classList.add('row');
    divContainer.style.justifyContent = 'flex-end';
    divContainer.append(newDiv);

    return isFirstHotel ? divContainer : newDiv;
}


function getOccupancy() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    const selected = getNodeData("#select2-s_tourists-container")?.split(' ');
    if(!selected) {
        return null;
    }

    occupancy.adultsCount = +selected[0];
    occupancy.childrenCount = selected[3] ? +selected[3] : 0;

    if ( occupancy.childrenCount > 0 ) {
        const ages = [];
        for ( let i = 0; i < occupancy.childrenCount; ++i ) {
            const id = `select2-s_children_child_${(i + 1)}-container`;
            const el = $1(`#${id}`);
            const childrenNumText = getText(el);
            if(el && /\d+/.test(childrenNumText)) {
                ages.push(extractIntFromStr(childrenNumText));
            }else {
                ages.push(2);
            }
        }
        occupancy.childAges = ages.join(",");
    }

    return occupancy;
}

function getCityAndCountry() {
    return {
        city: getNodeData('#select2-sidebarToursDepartureCityId-container'),
        country: getNodeData('#select2-sidebarToursCountryId-container')
    }
}

function createOption(img) {
    const roomData = getHotelRowByImage(img);
    const tour = roomData.closest('.hotel');

    const priceText = getText(roomData.querySelector('.row>div:nth-child(2)>div>a:first-child')).replaceAll(' ', '');
    const hotelInfo = tour.querySelector('.hotel-stars').parentNode;
    
    const checkinDtElem = roomData.querySelector('div>div>div:nth-child(2)');
    const checkOutDtElem = roomData.querySelector('div>div>div:nth-child(3)');
    const hotelNameElem = tour.querySelector('h5>a');
    const regionElem = hotelInfo.querySelector('div>strong').parentNode;
    const hotelDescElem = hotelInfo.querySelector('div>p');
    const roomTypeElem = roomData.querySelector('.row>div>div');
    const thumbnailElem = tour.querySelector('.row>div>div>div>a>img');
    const boardTypeElem = roomData.querySelector('.row>div>div:nth-child(4)');
    const hrefElem = roomData.querySelector('.row>div:nth-child(2)>div>a');

    const checkidDtText = getText(checkinDtElem);
    const price = extractIntFromStr(priceText);
    let newCheckidDtText = '';
    let extra_nights = 0;

    if(checkidDtText.includes('+')) {
        const res = checkidDtText.split('+');
        newCheckidDtText = trim(res[0]);
        extra_nights = extractIntFromStr(trim(res[1]));
    }

    const checkinDt = newCheckidDtText ? newCheckidDtText : checkidDtText;
    const nights = getDistance(checkinDt, getText(checkOutDtElem));

    let option = {
        checkinDt,
        nights: String(nights - extra_nights),
        extra_nights: String(extra_nights),
        roomType: getText(roomTypeElem),
        boardType: getText(boardTypeElem),
        hotelName: getText(hotelNameElem),
        hotel_desc: getText(hotelDescElem) || 'Описание отсутствует',
        thumbnail: location.origin + thumbnailElem.getAttribute('src'),
        href: location.origin + hrefElem.getAttribute('href'),
        price,
        currency: mapCurrencyUtil(priceText.replace(String(price), '').toLowerCase()),
        region: getText(regionElem).replace('Местоположение:', '').replace(SEARCH_CRITERIA.country, ''),
        city_from: SEARCH_CRITERIA?.city_from,
        country: SEARCH_CRITERIA?.country,
        occupancy: SEARCH_CRITERIA?.occupancy,
        operator: window.OPERATOR_NAME,
    };

    return option;
}

function getHotelRowByImage(img) {
    return img.closest('div.hotel-room');
}

function fixMediaRequest() {
    if(window.matchMedia('(min-width: 1800px)').matches) {
        document.querySelectorAll('.container, .container-sm, .container-md, .container-lg, .container-xl, .container-xxl').forEach(item => {
            item.style.maxWidth = '1300px';
        })
    }
}

window.addEventListener('resize', function(e) {
    fixMediaRequest();
})

fixMediaRequest();