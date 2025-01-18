window.OPERATOR_NAME = "Grandtrain";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return {
        occupancy: getOccupancy()
    };
}

function getSearchButton() {
    return $1('.reserve__btn');
}

function parseTrainDate(date) {
    const [day, month] = date.slice(0, -4).split(' ');
    return appendYear(day, monthNameToNumber(month));
}

function injectData() {
    let isResize = false;

    $$(".seats_item").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%')
            btns.style.setProperty('max-width', '100px')
            btns.style.setProperty('justify-content', 'end')
            
            div.append(btns);
            isResize = true;
        }
    });

    if(isResize) {
        fixMediaRequest();
        isResize = false;
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const data = tour.closest('.train');

    const [departure, arrival] = $$('.dep, .arr', data);
    const checkinDt = parseTrainDate(getNodeData('.date', departure));
    const checkoutDt = parseTrainDate(getNodeData('.date', arrival));
    const priceText = getNodeData('.train_cost', tour);
    const currencyText = priceText.slice(-1);
    const departStation = getNodeData('.st', departure);
    const arrivalStation = getNodeData('.st', arrival);
    const departTime = getNodeData('.time', departure);
    const arrivalTime = getNodeData('.time', arrival);

    let option = {
        checkinDt: checkinDt,
        nights: getDistance(checkinDt, checkoutDt),
        hotelName: `Ж/Д: ${departStation} (${checkinDt} ${departTime}) → ${arrivalStation} (${checkoutDt} ${arrivalTime})`,
        region: "Поезд: " + getNodeData('.train_number_number', data),
        roomType: getNodeData('.train_places_name', tour) ?? '',
        price: priceText.replace(/[^0-9,]+/g, '').replace(',', '.'),
        currency: mapCurrencyUtil(currencyText ?? ''),
        city_from: getNodeData('.city', departure),
        operator: OPERATOR_NAME,
        occupancy: SEARCH_CRITERIA.occupancy,
        product_type: 'Train',
        href: "",
        boardType: "",
        thumbnail: "",
        hotel_desc: "",
    };

    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.seats_item');
}

function getOccupancy() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    }
    const data = $$('.menu__row').map(i => {
        return [getNodeData('.menu__passenger-type', i), getNodeData('.count__input', i, 'value')]
    })

    data.forEach(i => {
        const num = Number(i[1]);

        if(!num) return;

        if(i[0].match('зр')) {
            occupancy.adultsCount += num;
            return;
        }

        if(!i[0].match('ети')) return;

        if(occupancy.childAges === null) occupancy.childAges = [];

        if(i[0].match('без')) {
            occupancy.childAges.push(4);
        }else {
            occupancy.childAges.push(9);
        }

        occupancy.childrenCount += num;
    })

    if(occupancy.childAges) occupancy.childAges = occupancy.childAges.join(',');
    
    return occupancy;
}

function fixMediaRequest() {
    if(window.matchMedia('(min-width: 1220px)').matches) {
        document.querySelectorAll('.train_seats_count').forEach(item => {
            item.style.setProperty('width', '160px');
        })
        document.querySelectorAll('.train_places_name').forEach(item => {
            item.style.setProperty('width', '90px');
        })
    }else{
        document.querySelectorAll('.train_seats_count').forEach(item => {
            item.style.removeProperty('width');
        })
        document.querySelectorAll('.train_places_name').forEach(item => {
            item.style.removeProperty('width');
        })
    }
}

window.addEventListener('resize', function(e) {
    fixMediaRequest();
});