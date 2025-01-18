window.OPERATOR_NAME = "TUTU";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return {};
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('[data-ti="offer-tariffs"] > div:last-child > div > div > button').forEach(div => {
        if (div.querySelector(".qq")) {
            return;
        }

        div.append(qqBtns({align: "qq-horizontal"}));
    });

    $$('[data-ti="card_category"] > div > .card_price').forEach(div => {
        if (div.parentNode.querySelector(".qq")) {
            return;
        }

        const wrapper = div.parentNode;

        wrapper.onmouseover = (e) => preventPopupOnButtons(e, wrapper);
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'space-between';

        div.style.margin = '0';
        div.style.width = '36%';
        div.append(qqBtns({align: "qq-horizontal"}));
    });

    $$('[data-ti="offer-tariffs"] > div > div > button').forEach(div => {
        if (div.querySelector(".qq")) {
            return;
        }

        div.style.alignItems = 'flex-end';
        div.append(qqBtns({align: "qq-horizontal"}));
    });
}

function preventPopupOnButtons(e, wrapper) {
    const preventElem = $1('.card_price:not([data-ti="popup_card_price"])', wrapper);
    const popupWrapper = $1('.dist__wrapper__1uudg', wrapper);

    if(preventElem.contains(e.target)) {
        popupWrapper.classList.add('dist__hidden__3Mrti');
        return;
    }
    popupWrapper.classList.remove('dist__hidden__3Mrti');
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const data = img.closest('[data-ti="offer-card"] > div, .b-train__schedule__train_card');
    
    const [departure, arrival] = $$('[data-ti="departure"], [data-ti="arrival"], .col-3 > div, .col-4 > div', data);
    const checkinDtElem = getNodeData('[data-ti="date"]', departure) || getNodeData('.l-list_header > div > h2 > span', data.closest('div:not([class])'));
    const checkinDt = parseTravelataDate(checkinDtElem);
    const checkoutDtElem = getNodeData('[data-ti="date"]', arrival) || getNodeData('div:not([class]) > span.t-txt-s', arrival) || checkinDtElem;
    const checkoutDt = parseTravelataDate(checkoutDtElem);
    const priceText = getNodeData('.card_price > .seats_price', tour) || getNodeData('div:nth-child(2) > span, div:nth-child(3) > span', tour);
    const departCity = (getNodeData('[data-ti="city"]', departure) || getNodeData('[data-ti="route_departure_station"] > a', data));
    const departStation = getNodeData('[data-ti="place"]', departure) || getNodeData('.t-gray > span', departure);
    const arrivalCity = (getNodeData('[data-ti="city"]', arrival) || getNodeData('[data-ti="route_arrival_station"] > a', data));
    const arrivalStation = getNodeData('[data-ti="place"]', arrival) || getNodeData('.t-gray > span', arrival);
    const departTime = getNodeData('[data-ti="departure-time"]', data) || getNodeData('.departure_time', departure);
    const arrivalTime = getNodeData('[data-ti="arrival-time"]', data) || getNodeData('.schedule_time', arrival);

    let option = {
        checkinDt: (checkinDt),
        nights: getDistance(checkinDt, checkoutDt),
        hotelName: `Ж/Д: ${departCity + ', ' + departStation} (${checkinDt} ${departTime}) → ${arrivalCity + ', ' + arrivalStation} (${checkoutDt} ${arrivalTime})`,
        region: "Поезд: " + getNodeData('[data-ti="train-name-badge"], .train_number_link > span', data),
        roomType: getNodeData('div > span, .car_type', tour) || getNodeData('div:first-child', tour),
        price: priceText.replace(/\D+/g, ''),
        currency: mapCurrencyUtil(priceText.slice(-1)),
        city_from: departCity,
        operator: OPERATOR_NAME,
        occupancy: {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null
        },
        product_type: 'Train',
        href: "",
        boardType: "",
        thumbnail: "",
        hotel_desc: "",
    };

    return option;
}

function parseTravelataDate(date) {
    const [day, month] = date.split(' ')
    return appendYear(day, monthNameToNumber(month));
}

function getHotelRowByImage(img) {
    return img.closest('[data-ti="offer-tariffs"] > div > div > button, [data-ti="offer-tariffs"] > div:last-child > div > div > button, [data-ti="card_category"]');
}