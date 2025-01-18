const OPERATOR_NAME = "ИНТЕРСИТИ";
const showTopHotelsRating = true;
function initializeSearchCriteria() {
    return {
        occupancy: getOccupancy(),
        country: selectedOption(document.querySelector("#Destination")),
        city: selectedOption(document.querySelector("#departureCities")),
    };
}

function getSearchButton() {
    return document.querySelector("input[name='TOUR_FIND']")
}

function injectData() {
    querySelectorAll(document, ".catalog-list__cell table.hotel-offers thead tr").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createHeadCell());
        }
    });
    querySelectorAll(document, ".catalog-list__cell table.hotel-offers tr.offer").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createCell());
        }
    });
}

function createHeadCell() {
    const newTh = document.createElement("th");
    newTh.textContent = "QQ";
    newTh.classList.add("qq");
    return newTh;
}

function createCell() {
    const newTd = document.createElement("td");
    newTd.classList.add("qq");
    newTd.append(qqBtns({align: "qq-horizontal", asyncFunc: getAsyncInfo}));
    return newTd;
}

function createOption(img) {
    const room = getHotelRowByImage(img);
    const hotel = room.closest(".catalog-list__cell");
    const accoms = hotel.querySelector(".hotel-offers");
    const ths = querySelectorAll(accoms, "thead>tr>th");
    const tds = querySelectorAll(room, "td");
    const hotelTitleTds = querySelectorAll(hotel, ".hotel-title td");
    const getCell = (caption) => tds[findTableTdIndex(ths, caption)];
    const getCellText = (caption) => getText(getCell(caption));
    let option = {
        checkinDt: getDate(getCellText(/даты/i)),
        nights: getCellText(/ноч/i),
        hotelName: getHotelName(hotelTitleTds),
        href: getNodeProperty(hotelTitleTds[0].querySelector("a"), null, "href"),
        country: SEARCH_CRITERIA.country,
        region: getNodeProperty(hotelTitleTds[2], "", "innerText").replace("\n", ", "),
        roomType: [getCellText(/Тип/i), getCellText(/Категория/i), getCellText(/Размещение/i)].join(", "),
        boardType: getCellText(/питание/i),
        price: extractIntFromStr(getText(room.querySelector(".price .bold")).replace(/\s+|,/g, "")),
        currency: mapCurrencyUtil(getText(room.querySelector(".price .bold")).replace(/[\s,\.\d]+/g, "")),
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        thumbnail: hotel.getAttribute("thumbnail"),
        occupancy: SEARCH_CRITERIA.occupancy,
    };
    return option;
}

function getDate(text) {
    return text.match(/\d{2}\.\d{2}\.\d{4}/)[0];
}

function getHotelName(tds) {
    const name = getText(tds[0]);
    const stars = getNodeProperty(tds[1]);
    return stars ? `${name} ${stars}` : name;
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    const adultInput = querySelectorAll(document, "#filter input[type=input]")
                     .find(input => input.parentNode.textContent.match(/Количество взрослых/i));
    if ( !adultInput || adultInput.value < 1 ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adultInput.value);
    const childrenCount = querySelectorAll(document, "#ChildAges input")
        .filter(input => input.offsetHeight > 0)
        .map(input => input.value);
    if ( childrenCount.length > 0 ) {
        occupancy.childrenCount = childrenCount.length;
        occupancy.childAges = childrenCount.filter(inp=>inp).join();
    }
    return occupancy;
}

async function getAsyncInfo(img) {
    const hotel = img.closest(".catalog-list__cell");
    const href = hotel ? getNodeProperty(hotel.querySelector(".hotel-title a"), null, "href") : null;
    if ( !href ) {
        return img;
    }
    if ( hotel.getAttribute("thumbnail") ) {
        return img;
    }
    const htmlPage = await getPageWithFetchUtil(href);
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlPage, "text/html");
    if ( !doc ) {
        return;
    }
    const image = doc.querySelector("img.second-slider__slide-image");
    const lazyImage = image && image.dataset.lazy ? image.dataset.lazy : null;
    if ( image ) {
        hotel.setAttribute("thumbnail", "https://intercity.by"+lazyImage);
    }
    return img;
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.tagName === "TR") {
            break;
        }
        div = div.parentNode;
    }
    return div;
}