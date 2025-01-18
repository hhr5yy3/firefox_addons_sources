const OPERATOR_NAME = "Troyka";
const DEFAULT_CURRENCY = "RUB";
const OPERATOR_CURRENCY = "Troyka";
const CURRENCY_SELECTION_STYLE = "width:auto;float:left;margin-right:6px;font-size:12px;color:black;";
const showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    injectCurrencySelectionUtil(".qq", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "font-size:12px", "display:flex;flex-direction:column;margin-top:5%;");
    querySelectorAll(document, "#form").forEach(div => {
        const qq = div.querySelector(".qq");
        if ( !document.querySelector(".qq") ) {
            div.prepend(createOrderCell());
        }
        const currency = document.querySelector("#qq-currency");
        if ( qq && qq.lastElementChild !== currency ) {
            qq.append(currency);
        }
    });
}


function createOrderCell() {
    const container = document.createElement("div");
    const btn = qqBtns({align: "qq-vertical"});
    btn.style.marginRight = "5px";
    btn.style.marginTop = "5%";
    container.append(btn);
    container.classList.add("qq");
    container.style.display = "flex";
    container.style.position = "sticky";
    container.style.top = "0";
    container.style.marginLeft = "101%";
    container.style.marginBottom = "-10%";
    container.style.width = "45%";
    return container;
}

function createOption(img) {
    const tour = getHotelRowByImage();
    const hotelTable = document.querySelector("#hotelTable");

    const tourThs = querySelectorAll(tour, "tbody th");
    const tourTds = querySelectorAll(tour, "tbody td");

    const hotelThs = querySelectorAll(hotelTable, "tbody th");
    const hotelTds = querySelectorAll(hotelTable, "tbody td");

    const dates = getText(tourTds[findTableTdIndex(tourThs, /Продолжительность/i)]);

    const price = getPriceAndCurrency();
    const flight = getFlight(img);
    return {
        checkinDt: dates.split("-")[0].trim(),
        nights: getText(tourTds[findTableTdIndex(tourThs, /Ночей/i)]),
        hotelName: getText(hotelTable.querySelector("#hotelNameDiv")),
        hotel_desc: "",
        href: getNodeProperty(hotelTable.querySelector("#hotelNameDiv a"), null, "src"),
        country: getText(tourTds[findTableTdIndex(tourThs, /Страна/i)]),
        region: getText(hotelTds[findTableTdIndex(hotelThs, /Город/i)]),
        roomType: [getText(hotelTds[findTableTdIndex(hotelThs, /Номер/i)]), getText(hotelTds[findTableTdIndex(hotelThs, /Размещение/i)])].join(", "),
        boardType: getText(hotelTds[findTableTdIndex(hotelThs, /Питание/i)]),
        price: price.price,
        currency: price.currency,
        city_from: flight ? flight.sectors[0].segments[0].departureCity : 'Нет данных',
        operator: OPERATOR_NAME,
        thumbnail: null,
        occupancy: getOccupancy(),
        flight: flight
    };
}

function getPriceAndCurrency() {
    const priceCell = document.querySelector(".total-price-cur").parentNode;
    const price = isPrefferedDefaultCurrencyUtil() ? querySelectorAll(priceCell, ".total-price-rur").find( node => node.offsetHeight > 0 ) :  priceCell.querySelector(".total-price-cur");
    return {price: extractIntFromStr(getText(price)), currency: isPrefferedDefaultCurrencyUtil() ? "RUB" : getText(priceCell).match(/USD|EUR/)[0] }
}

function getFlight(img) {
    if ( !canGetFlightInfo(img) ) {
        return null;
    }
    try {
        let flightRow = document.querySelector("input.flightIds:checked");
        if ( flightRow ) {
            return largeFlight(flightRow);
        }
        let flightSelects = querySelectorAll(document, "#directFlightServiceId, #backFlightServiceId").filter(select => select.offsetHeight > 0);
        if ( flightSelects.length > 0 ) {
            return smallFlight(flightSelects);
        }

        return null;
    } catch (e) {
        return null;
    }
}

function smallFlight(selects) {
    return {
        sectors: selects.map(select => {
            return {segments: [createSegment(select)]}
        })
    }
}

function createSegment(select) {
    const optionText = selectedOption(select);
    const date = optionText.match(/\d{2}\.\d{2}/)[0];
    const times = optionText.match(/\d{2}:\d{2}/g);
    const cities = optionText.match(/\((.+?)\)/)[1]
        .replace(/[^А-я\sA-z-]/g, "")
        .replace(/\s+/g, " ")
        .split(" - ")
        .map(text => {
            return text.trim();
        })
        .map(text => text.split(" "));
    return new FlightSegment({
        flightNumber: optionText.replace(/\s*\(.+/, ""),
        departureDate: date,
        departureTime: times[0],
        departureCity: cities[0][0],
        departureAirport: cities[0][1],
        arrivalTime: times[1],
        arrivalCity: cities[1][0],
        arrivalAirport: cities[1][1],
    })
}

function largeFlight(flightRow) {
    flightRow = flightRow ? flightRow.closest("tr") : null;
    if ( !flightRow ) {
        return null;
    }
    let sectors = [querySelectorAll(flightRow, ".directFlight "), querySelectorAll(flightRow, ".backFlight ")].map(sectorArray => {
        if ( sectorArray.length % 7 !== 0 ) {
            throw new Error("sector array length is wrong")
        }
        const step = sectorArray.length / 7;
        let segmentsArray = [];
        for ( let i = 0; i < step; i++ ) {
            let segmentArray = [];
            for ( let j = i; j < sectorArray.length; j += step ) {
                segmentArray.push(sectorArray[j])
            }
            segmentsArray.push(segmentArray);
        }
        return segmentsArray;
    });
    return {
        sectors: sectors.map(segmentsArray => {
            return {
                segments: segmentsArray.map((segmentArray, index) => {
                    const numberAndCompany = getNodeProperty(segmentArray[0], "", "innerText").replace(/\n/, ",").split(",");
                    const dDate = getNodeProperty(segmentArray[1], "").split(" ").map(elem => elem.trim());
                    const aDate = getNodeProperty(segmentArray[2], "").split(" ").map(elem => elem.trim());
                    return new FlightSegment({
                        flightNumber: numberAndCompany[0],
                        airline: numberAndCompany[1],
                        travelTime: getNodeProperty(segmentArray[6]),
                        departureDate: dDate[0],
                        departureTime: dDate[1],
                        departureCity: getNodeProperty(segmentArray[3]),
                        serviceClass: numberAndCompany[2],
                        arrivalDate: aDate[0],
                        arrivalTime: aDate[1],
                        arrivalCity: segmentsArray.length > 1 && index !== segmentsArray.length - 1 ? getNodeProperty(segmentArray[5]) : getNodeProperty(segmentArray[4])
                    });
                })
            };
        })
    };
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const tourists = querySelectorAll(document, "select.touristCategory")
    if ( tourists.length === 0) {
        return null;
    }


    occupancy.adultsCount = tourists.filter( select => selectedOption(select) != "CHD" ).length;
    const kids = tourists.filter( select => selectedOption(select) == "CHD" );
    occupancy.childrenCount =kids.length;
    if ( occupancy.childrenCount > 0) {
        occupancy.childAges =kids.map( select =>  {
            const tr = select.closest("tr");
            if ( tr ) {
                return getNodeProperty(tr.querySelector(".age"), "");
            }
            return "";
        }).join();
    }
    return occupancy;
}

function getHotelRowByImage() {
    return document.querySelector("#tourTable");
}
