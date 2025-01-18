window.OPERATOR_NAME = "Ntk Intourist";
window.DEFAULT_CURRENCY = "RUB";
window.OPERATOR_CURRENCY = "ntkintourist";
window.CURRENCY_SELECTION_STYLE = "width:auto;float:left;margin-right:6px;font-size:12px;color:black;";
window.QQ_OPTION = null;
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    injectCurrencySelectionUtil(".results__main-filter", window.OPERATOR_CURRENCY, window.CURRENCY_SELECTION_STYLE, "margin-top:-3px;font-size: 12px", "display: flex;margin-bottom:5px;");
    querySelectorAll(document, " .results__main-view sap-tour-card, sap-hotel-card this-tour-card-mini").filter(div => {
        const sale = div.querySelector(".stop-sale");
        return !(sale && sale.offsetHeight > 0)
            && !div.closest(".wish-list__hotels-type"); // не добавляем галочки в избранные туры
    }).forEach(table => {
        const qqDiv = table.querySelector(".qq");
        const mobileView = table.querySelector('.mobile-pro-mode');
        if ( !qqDiv && !mobileView ) {
            table.append(createCell(getAsyncInfo));
            const btnBuy = table.querySelector("button.results-table__btn");
            if ( btnBuy ) {
                btnBuy.addEventListener("click", saveOption);
            }
        }

        if ( mobileView && qqDiv ) {
            qqDiv.remove();
        }
    });

    querySelectorAll(document, "int-flight-card .total-cost").forEach(table => {
        if ( !QQ_OPTION ) {
            return;
        }
        const qqDiv = table.querySelector(".qq");
        const mobileView = table.querySelector('.mobile-pro-mode');
        if ( !qqDiv && !mobileView ) {
            table.append(createCell(getAsyncInfoPopup));
        }

        if ( mobileView && qqDiv ) {
            qqDiv.remove();
        }
    });
}

function createCell(asyncFunc) {
    let container = document.createElement("div");
    container.style.display = "block";
    container.style.textAlign = "end";
    container.className = "qq";
    const btnDiv = qqBtns({asyncFunc: asyncFunc, align: "qq-box"});
    btnDiv.style.display = 'inline-flex';
    container.append(btnDiv);
    return container;
}

function saveOption(event) {
    const img = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".qq-add-btn");
    window.QQ_OPTION = createOption(img);
}

function createOption(img) {
    const hotelCard = getHotelRowByImage(img);
    const isPopupFlag = isPopup(img);
    const tour = isPopupFlag ? img.parentNode.parentNode.parentNode.parentNode.parentNode : img.parentNode.parentNode.parentNode;
    const priceAndCurrency = getPrice(tour);
    if ( isPopupFlag === true && QQ_OPTION ) {
        return getSavedOption(tour, priceAndCurrency);
    }
    let ths = querySelectorAll(hotelCard, '.results-table__table .results-table__column');
    if ( ths.length === 0 ) {
        ths = querySelectorAll(document, '.results-table__table .results-table__column');
    }
    const tds = tour.querySelector('div.row').children;
    let getCell = (caption) => tds[findTableTdIndex(ths, caption)];
    let getCellText = (caption) => getText(getCell(caption));
    if ( tds.length < 5 ) {
       const rows = $$('div.row', tour);
       const rowNames = rows.map(r => r.querySelector('div'));
       getCell = (caption) => optionalChaining(rows[findTableTdIndex(rowNames, caption)], ['lastElementChild'])
    }

    const {city, country} = getSearchCountryAndCity();
    const {boardCode, board} = getBoardType(getCell(/Питание/));
    const hotelNameAndHref = getHotelNameAndHref(getCell(/Отель/i), hotelCard, tour);
    let option = {
        checkinDt: makeYear4Digits(getCellText(/Начало/i).match(/\d{2}\.\d{2}\.\d{2}/)[0]),
        nights: getCellText(/Ночей/i),
        hotelName: hotelNameAndHref.caption,
        href: hotelNameAndHref.href,
        roomType: getRoomType(getCellText(/Размещение/i), getCell(/номер/i), getCell(/Отель/i)),
        region: getRegion(hotelCard, getCell(/Отель/), tour),
        boardType: board,
        boardCode: boardCode,
        price: priceAndCurrency.price,
        currency: priceAndCurrency.currency,
        country: country,
        city_from: city,
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getImg(hotelCard),
        occupancy: getOccupancy(),
        flight: JSON.parse((tour.getAttribute("flight-info") || null))
    }
    return option;
}

function getSavedOption(tour, priceAndCurrency) {
        const flights = querySelectorAll(tour, ".fly__date")
            .filter(div => {
                return div.textContent.match(/\d\d\.\d\d\.\d\d/)
            })
            .map(fdiv => {
                return makeYear4Digits(fdiv.textContent.trim());
            });
        let extraNights = 0;
        if ( flights.length === 4 ) {
            extraNights = getDistance(dayMonthYearToDate(flights[0]), dayMonthYearToDate(flights[3])) - QQ_OPTION.nights;
        }
        QQ_OPTION.extra_nights = extraNights.toString();
        QQ_OPTION.flight = JSON.parse((tour.getAttribute("flight-info") || null)) ;
        QQ_OPTION.price = priceAndCurrency.price;
        QQ_OPTION.currency = priceAndCurrency.currency;
        return QQ_OPTION;
}

function getRoomType(code, room, hotel) {
    if ( room ) {
        return [code, getText(room.querySelector('.text-primary:not(a)'))].join(', ')
    }
    if ( hotel ) {
        return [code, getText(hotel.querySelector('.text-primary:not(a)'))].join(', ')
    }
    return code;
}

function getSearchCountryAndCity() {
    let city = document.querySelector('[name="departureCity"] .Select-control, [formcontrolname="startCity"] .control-field__label');
    city = city ? city : document.querySelector(".Select-control, int-tour-search-history > div > div:nth-child(1) > div.tour-history-field-value");
    let avia = document.querySelector('[formcontrolname="transportType"] button.active, [formcontrolname="searchType"] button.active');
    city = city ? city.textContent.trim() : "";
    let country =  document.querySelector('[formcontrolname="destCountry"] .control-field__label');
    if ( country ) {
         return { city: city, country: getText(country)};
    }
    country = avia ? avia.textContent.match(/(.+)\s+\(.+\)/) : null;
    country = country ? country[1] : getNodeProperty(avia, "");
    return { city: city, country: country };
}

function getHotelNameAndHref(hotelName, hotelCard, tour) {
    if ( hotelName ) {
        const tableViewAnchor = hotelName.querySelector('a');
        if ( tableViewAnchor ) {
            return {
                'caption': getNodeProperty(tableViewAnchor, getNodeProperty(hotelName.querySelector('.hotel-description'))),
                'href': tableViewAnchor ? tableViewAnchor.href : null
            };
        }
    }
    if ( hotelCard ) {
        const groupViewAnchor = hotelCard.querySelector('a.title-link-link, h3.title, .title-link.text-12');
        const hotelGroupViewName = getNodeProperty(groupViewAnchor);
        const stars = hotelCard.querySelectorAll(".results-card__star");
        return {
            'caption': stars.length > 0 ? hotelGroupViewName + " " + stars.length + "* " : hotelGroupViewName,
            'href': groupViewAnchor ? groupViewAnchor.href : null
        };
    }
    const desc = tour.querySelector('.hotel-description');
    const name = getNodeProperty(desc);
    return {
        'caption': name,
        'href': desc ? desc.href : null
    };

}

function getBoardType(cell) {
    const boardCode = getNodeProperty(cell);
    const title = cell && cell.firstElementChild ? cell.firstElementChild.getAttribute('ng-reflect-tooltip-value') : null;
    return { boardCode: boardCode, board: title || boardCode  };
}

function getRegion(hotelCard, hotelCell, tour) {
    if ( hotelCell ) {
        return getNodeProperty(hotelCell.querySelector('.text-grey'));
    }
    if ( hotelCard ) {
        const region = getText(hotelCard.querySelector('.results-card__location, .results-card .text-lightgrey'));
        return lastElement(region.split('/')).trim()
    }

    return getNodeProperty(tour.querySelector('.hotel-description').closest('div').querySelector('.text-grey'));
}

function getPrice(tour) {
    const currency = isPrefferedDefaultCurrencyUtil() ? tour.querySelector('.text-extra-bold .currency, .total-cost__ru .currency') :
                                                        tour.querySelector('.text-medium .currency, .total-cost__us .currency, .text-extra-bold .currency');
    let price = getText(currency.closest('.text-primary, .total-cost__ru, .total-cost__us').firstChild);
    return {
        price: extractIntFromStr(price.replace(/\s+/g, "")),
        currency: mapCurrency(getText(currency))
    };
}

function mapCurrency(s) {
    const c = trim(s).toUpperCase();
    switch ( c ) {
        case "₽":
            return "RUB";
        case "РУБ":
            return "RUB";
        case "РБ":
            return "RUB";
        case "$":
            return "USD";
        case "€":
            return "EUR";
    }
    return c;
}

function getImg(hotelCard) {
    if ( !hotelCard ) {
        return null;
    }
    const image = hotelCard.querySelector(".custom-image-main img");
    return getNodeProperty(image, null, 'src')
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    let text = document.querySelector("int-tour-search-history > div > div:nth-child(5) > div.tour-history-field-value");
    let otherBtn = document.querySelector(".tour-history .expand-btn");
    let tourHistory  = document.querySelector(".tour-history-title");
    if (!text && tourHistory && !tourHistory.classList.contains("opened") ) {
        simulateEvent(tourHistory, "click");
    }
    text = document.querySelector("int-tour-search-history > div > div:nth-child(5) > div.tour-history-field-value");
    if (!text ) {
        simulateEvent(otherBtn, "click");
    }
    text = document.querySelector("int-tour-search-history > div > div:nth-child(5) > div.tour-history-field-value");
    if ( !text ) {
        return null;
    }
    let adults = text.textContent.match(/(\d+)\s+взр/);
    let kids = text.textContent.match(/(\d+)\s+реб/);
    if ( !adults ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adults[1]);
    occupancy.childrenCount = kids ? extractIntFromStr(kids[1]) : 0;

    return occupancy;
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while ( div ) {
        if ( !div  || div.tagName === "SAP-HOTEL-CARD") {
            break;
        }
        if ( div.className === "tour-variants-popup__container" ) {
            return null;
        }
        div = div.parentNode ? div.parentNode : null;
    }
    return div;
}

function isPopup(img) {
    return !!img.closest('.tour-variants-popup__body-box');
}

async function getAsyncInfo(img) {
    if ( !canGetFlightInfo(img) ) {
        return null;
    }
    const tour = img.parentNode.parentNode.parentNode;
    let tds = tour.querySelector('div.row').children;
    if ( tds.length < 5 ) {
        tds = $$('div.row', tour).slice(1);
    }
    if ( !tour.getAttribute("flight-info") ) {
        const placeOnRace = tds[7].querySelector('.results-table__places-values');
        simulateMouseEvent(placeOnRace, 'click');
        await waitingFor(getFlightFromTooltip, 100, 100)
            .then(flight => tour.setAttribute("flight-info", JSON.stringify(flight)));
        simulateMouseEvent(document.querySelector('.cdk-overlay-backdrop'), 'click');
    }

    function getFlightFromTooltip() {
        try {
            const popup = document.querySelector("sap-flight-info");
            if ( popup ) {
                if ( popup.querySelector('.modal-noinfo') ) {
                    return 'null';
                }
                popup.style.opacity = '0.1';
                const sectors = {
                    sectors: querySelectorAll(popup, ".modal-row")
                        .map(sectorNode => parseSector(sectorNode))
                };
                return sectors.sectors.length > 0 ? sectors : null;
            }
            return null;
        } catch (e) {
            console.log(e);
            return "null";
        }
    }
}

function getAsyncInfoPopup(img) {
    if ( !canGetFlightInfo(img) ) {
        return null;
    }
    const tour = img.parentNode.parentNode.parentNode.parentNode.parentNode;
    if ( !tour.getAttribute("flight-info") ) {
        const detailsBtn = tour.querySelector(".details.details_desktop i");
        if ( detailsBtn && !detailsBtn.classList.contains("details_revert-arrow") ) {
            simulateMouseEvent(detailsBtn, 'click');
        }
        tour.setAttribute("flight-info", JSON.stringify(getFlightsPopup(tour)));
    }
}

function getFlightsPopup(tour) {
    const sectorNodes = querySelectorAll(tour, ".option-left__item");
    return {sectors: querySelectorAll(tour, ".additional-info").map((additional, index) => parseSectorPopup(additional, sectorNodes[index]))};
}

function parseSector(sectorNode) {
        const [depSegment, arrSegment] = querySelectorAll(sectorNode, '.col-xs-5.text-center');
        const depDate = getText(depSegment.querySelector(".text-grey.text-12")).split(" ");
        const arrDate = getText(arrSegment.querySelector(".text-grey.text-12")).split(" ");
        const depCityText = depSegment.querySelector('.text-bold.text-primary.text-14');
        const arrCityText = arrSegment.querySelector('.text-bold.text-primary.text-14');
        const depCity = getText(depCityText).match(/(.*?)\(([A-Z][A-Z0-9]{2,3})\)/) || "";
        const arrCity = getText(arrCityText).match(/(.*?)\(([A-Z][A-Z0-9]{2,3})\)/) || "";
        const flightNumber = getText(sectorNode.querySelector("span.text-grey.text-12:not(.text-bold)")).split("(");
        return {segments: [new FlightSegment({
            airline: getText(sectorNode.querySelector("span.text-grey.text-bold")),
            flightNumber: flightNumber[0].trim(),
            plane: (flightNumber[1] || "").replace(/\)/, ""),
            departureDate: dateFromDayAndMonthName(depDate[0], depDate[1], depDate[2]),
            departureCity: depCity ? (depCity[1]|| "").trim() : getText(depCityText).split(/\s+\(/)[0],
            departureAirportID: depCity ? depCity[2].slice(0,3) : null,
            departureTerminal: depCity ? depCity[2][3] : null,
            arrivalDate:  dateFromDayAndMonthName(arrDate[0], arrDate[1], arrDate[2]),
            arrivalCity: arrCity ? (arrCity[1]|| "").trim() : getText(arrCityText).split(/\s+\(/)[0],
            arrivalAirportID: arrCity ? arrCity[2].slice(0,3) : null,
            arrivalTerminal: arrCity ? arrCity[2][3] : null
        })]}
}

function parseSectorPopup(additional, sectorNode) {
    const sectorDetails = querySelectorAll(sectorNode, ".fly.block");
    const flyTime = sectorNode.querySelector(".fly-time__time");
    const additionalNodes = querySelectorAll(additional, ".ng-star-inserted:not(.additional-info__transfer)");
    const segments = additionalNodes.map(node => {
        const flightNumber = getText(node.querySelector(".additional-info__info")).split("|");
        const infoItems = querySelectorAll(node, ".additional-info__item");
        const depArray = getText(infoItems[0]).split(/,/);
        const arrArray = getText(infoItems[1]).split(/,/);
        return new FlightSegment({
            airline: flightNumber[0].trim(),
            flightNumber: flightNumber[1].trim(),
            departureTime: depArray[0].split("—")[0].trim(),
            departureCity: depArray[1].trim(),
            departureAirport: depArray[3].trim(),
            departureAirportID: depArray[2].trim().slice(0, 3),
            arrivalTime: arrArray[0].split("—")[0].trim(),
            arrivalCity: arrArray[1].trim(),
            arrivalAirport: arrArray[3].trim(),
            arrivalAirportID: arrArray[2].trim().slice(0, 3),
        })
    });
    segments[0].departureDate = makeYear4Digits(getText(sectorDetails[0].querySelector(".fly__date")));
    segments[segments.length - 1].arrivalDate = makeYear4Digits(getText(sectorDetails[1].querySelector(".fly__date")));
    segments[segments.length - 1].travelTime = getText(flyTime);
    return {segments: segments}
}

function getFlight() {
    return true;
}
