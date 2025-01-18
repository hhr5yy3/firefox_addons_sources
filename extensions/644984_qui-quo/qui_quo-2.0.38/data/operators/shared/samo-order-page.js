window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || window.OPERATOR_NAME : window.OPERATOR_NAME || location.hostname;
var DEFAULT_CURRENCY = "National";
var OPERATOR_CURRENCY = "samo-tour";
var CURRENCY_SELECTION_STYLE = "width:auto;float:left;margin-right:6px;font-size:12px;color:black;";
window.showTopHotelsRating = true;
window.injectionSelector = '.top_container';

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    injectCurrencySelectionUtil(".qq", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "font-size:12px", "display:flex;flex-direction: column;");
    querySelectorAll(document, window.injectionSelector).filter(panel => panel.querySelector('.claim_info')).forEach(panel => {
        var qq = panel.querySelector(".qq");
        if (!qq) {
            const orderCell = window.innerWidth > 1600 ? createOrderCell() :
                createQQContainer('position:fixed;right: 2em;top:16em;z-index:9999;width: 185px;background-color:rgba(255, 255, 255, 0.8);padding:6px;border-radius:4px');
            panel.prepend(orderCell);
        }
        var currency = document.querySelector("#qq-currency");
        if (qq && qq.lastElementChild !== currency ) {
            qq.append(currency);
        }
    });

}

function createOrderCell() {
    var container = createQQContainer('position:fixed;right: 2em;top:16em;z-index:9999;width: 185px;background-color:rgba(255, 255, 255, 0.8);padding:6px;border-radius:4px');

    container.style.zIndex = "9999999";
    return container;
}

function createOption(img) {
    var hotel = document.querySelector(".HOTELSINFO .hotels table, .HOTELSINFO table");
    if ( !hotel ) {
        const flightOption = createFlightOption(img)
        if ( !flightOption.flight ) {
           const btns = img.closest('.qq-box');
           if ( btns ) {
               btns.style.display = 'none';
           }
        }
        return flightOption;
    }
    var option = {};
    var datesHotel = extractAccommodationOptions(option, hotel); //Извлекаем данные из таблицы проживания

    var tour = document.querySelector(".TOURINFO .tour_info");
    var tourThs = querySelectorAll(tour, "th");
    var tourTds = querySelectorAll(tour, "tbody td");
    if ( tourTds.length === 0 ) {
        tourTds = tourThs.map(th => $$('div', th)[1]);
        tourThs = tourThs.map(th => $$('div', th)[0]);
    }

    var nightsTour = +getText(tourTds[findTableTdIndex(tourThs, /ночей|nights|nopti/i)]);
    var nightsHotel = getDistance(dayMonthYearToDate(datesHotel[0]), dayMonthYearToDate(datesHotel[1]));

    const nightsDifference = (Number(nightsTour) - Number(nightsHotel));
    const tourName = getText(tourTds[findTableTdIndex(tourThs, /Описание тура|Ekskursijos aprašymas|Опис туру|Tour description|Descrierea turului/i)]);
    const isEarlyBooking = checkEarlyBooking(nightsDifference, tourName);
    var price = getPriceAndCurrency();
    var flights = getFlight(img);
    option.checkinDt = tour.dataset.checkin;
    option.dateStart = datesHotel[0];
    option.nights = isEarlyBooking ? String(nightsHotel + (nightsDifference)) : String(nightsHotel);
    option.comment = isEarlyBooking ? tourName : null;
    option.extra_nights = isEarlyBooking ? "0" : String(nightsDifference);

    option.href = getNodeProperty(hotel.querySelector("a"), null, "href");
    if ( option.href && option.href.match('agent.anextour.ru') ) {
        option.href = option.href.replace('agent.anextour.ru', 'anextour.ru');
    }
    option.price = price.price;
    option.currency = price.currency;
    option.country = getText(tourTds[findTableTdIndex(tourThs, /Страна|State|Країна|Šalis|Tara/i)]);
    option.city_from = flights ? flights.sectors[0].segments[0].departureCity : "";
    option.operator = OPERATOR_NAME;
    option.flight = flights && !flights.isBusRoute ? flights : null ;
    option.busRoutes = flights && flights.isBusRoute ? convertFlightToBusRoute(flights) : null;
    const passengersCount = parsePassengersCountModule();
    option.occupancy = {
        adultsCount: passengersCount.adults,
        childrenCount: passengersCount.children + passengersCount.infants
    };
    return option;
}

function convertFlightToBusRoute(flights) {
    if ( !flights.sectors ) {
        return null;
    }
   return flights.sectors.map(extractBusRoute)
}

function extractBusRoute(sector) {
    const text = sector.segments[0].flightNumber;
    return new quickBookingValue({
        dateEnd: sector.segments[0].arrivalDate,
        dateStart: sector.segments[0].departureDate,
        description: trim(text)
    })
}

function checkEarlyBooking(nightsDifference, tourName) {
    return !!(nightsDifference < 0 && tourName.match(/ранним|раннее/));
}

function createFlightOption(img) {
     const flights =  getFlight(img);
     const price = getPriceAndCurrency();
     const option = flights ? createOptionFromFlight(flights) : {};
     const tour = document.querySelector(".TOURINFO table.tour_info");
     if ( tour && tour.dataset.checkin) {
         const tourThs = querySelectorAll(tour, "th");
         const tourTds = querySelectorAll(tour, "tbody td");
         const dateStart = tour.dataset.checkin;
         const dateEnd = tour.dataset.checkout;
         const nightsTour = getNodeProperty(tourTds[findTableTdIndex(tourThs, /ночей|nights|Naktys/i)]);
         option.nights = nightsTour || String(getDistance(dateStart, dateEnd));
         option.checkinDt = dateStart;
         option.hotelName = getNodeProperty(tourTds[findTableTdIndex(tourThs, /Описание тура|Ekskursijos aprašymas|Опис туру|Tour description/i)]);
         option.country = getNodeProperty(tourTds[findTableTdIndex(tourThs, /Страна|State|Країна|Šalis/i)]);
         option.operator = OPERATOR_NAME;
         option.city_from = flights ? flights.sectors[0].segments[0].departureCity : "";
     }

     option.price = price.price;
     option.currency = price.currency;
     option.operator = OPERATOR_NAME;
     return option;
}

function extractAccommodationOptions(option, hotel) {
    var multiHotels = checkAndGetMultiHotels(hotel); // проверяем и парсим тур из нескольких отелей (экскурсионка, комби)
    var hotelThs = querySelectorAll(hotel, "th");
    var hotelTds = querySelectorAll(hotel, "tbody td");
    var datesHotel;
    if ( multiHotels ) {
        option.region = multiHotels.region;
        option.roomType = (multiHotels.rooms || '');
        option.boardType = multiHotels.meals;
        option.hotelName = multiHotels.hotels;
        datesHotel = [multiHotels.datesBeg[0], lastElement(multiHotels.datesEnd)];
    } else {
        if ( hotelThs.length < 3 ) {
            getAnexAccommodation(hotel, hotelTds, option); // У анекс свои особые таблицы, достаем проживание из них
            datesHotel = getDate(getText(hotelTds[1]));
        } else {
            datesHotel = getDate(getText(hotelTds[findTableTdIndex(hotelThs, /Период|Period|Період проживання|Gyvenimo laikotarpis|Perioada/i)]));
            getAccommodation(hotel,hotelThs, hotelTds, option)
        }
    }
    return datesHotel;
}

function getAccommodation(hotel, hotelThs, hotelTds, option) {
    var hotelNode = hotelTds[findTableTdIndex(hotelThs, /Гостиница|Hotel|Готель|Viešbutis/i)];
    option.region = getText(hotelTds[findTableTdIndex(hotelThs, /Город|Town|Місто|Miestas|Oras/i)]);
    option.roomType = (getRoomType(hotelTds, hotelThs) || '');
    option.boardType = getAdditionalBoard() || getText(hotelTds[findTableTdIndex(hotelThs, /Питание|Meal|Харчування|Maistas|Tip de masa/i)]);
    option.hotelName = getText(hotelNode);
}

function getAnexAccommodation(hotel, hotelTds, option) {
    var hotelText = getText( hotelTds[0]).split("|");
    option.region = hotelText[1].trim();
    option.roomType = hotelText[2].trim() + ", " + hotelText[3].trim();
    option.boardType = getAdditionalBoard() || hotelText[4].trim();
    option.hotelName = hotelText[0].trim();
}

function getAdditionalBoard() {
    let alternateBoard = $$('.ASERVICES tr').filter(quickBookingsFilterCallback).map(parseService).find(service => service && service.caption.match(/Питание|Meal|Харчування|Maistas/i));
    if ( alternateBoard ) {
        alternateBoard = alternateBoard.description.split(/::\s*|\s*\(/)[1]
    }
    return alternateBoard;
}

function createAnexMultiAcc(splittedText, optionsObj) {
    optionsObj.region.push(splittedText[1].trim());
    optionsObj.hotels.push(splittedText[0].trim());
    optionsObj.rooms.push([splittedText[2].trim(), splittedText[3].trim()].join(", "));
    optionsObj.meals.push(splittedText[4].trim());
}

function createMultiAcc(splittedText, optionsObj) {
    optionsObj.region.push((splittedText[0].match(/\((.+)/) || "")[1]);
    optionsObj.hotels.push((splittedText[0].match(/(.+)\(/) || "")[1]);
    optionsObj.rooms.push( [splittedText[1].trim(), splittedText[2].trim().split(" ")[0]].join(", "));
    optionsObj.meals.push( splittedText[2].trim().split(" ")[1] );
}

function checkAndGetMultiHotels(hotel) {
    var hotelsSelects = querySelectorAll(hotel, "tr select");
    if ( hotelsSelects.length > 0 ) {
        return createMultiOptions(hotelsSelects);
    }
    return false;
}

function createMultiOptions(hotelsSelects) {
    var optionsObj = {
        region: [],
        hotels: [],
        rooms: [],
        meals: [],
        datesBeg: [],
        datesEnd: []
    };
    hotelsSelects.forEach( select => {
        var option = selectedOption(select, false);
        var splittedText = selectedOption(select).trim().split(/\|/);
        if ( splittedText.length > 4 ) {
            createAnexMultiAcc(splittedText, optionsObj); //особые таблицы анекса
        } else {
            splittedText = selectedOption(select).trim().split(/\)|\//);
            createMultiAcc(splittedText, optionsObj); //обычне таблицы
        }
        var data = JSON.parse(option.dataset.json);
        optionsObj.datesBeg.push(data.datebeg);
        optionsObj.datesEnd.push(data.dateend);
    });
    for ( var prop in optionsObj ) {
        if ( prop !== "datesBeg" && prop!== "datesEnd" ) {
            optionsObj[prop] = optionsObj[prop].filter(elem => elem).join(" / ");
        }
    }
    return optionsObj
}

function getDate(dates) {
    return dates.split("—");
}

function getRoomType(hotelTrs,hotelThs) {
    var room =  hotelTrs[findTableTdIndex(hotelThs, /Номер|Room|Numeris|Camera/i)];
    var acc = hotelTrs[findTableTdIndex(hotelThs, /Размещение|Accommodation|Розміщення|Apgyvendinimas|Configuratie/i)];
    return [getText(room), getText(acc)].filter( text => text ).join(", ");
}

function getPriceAndCurrency(sel = ".price_details .CLAIMPRICE") {
    try {
        const priceCell = document.querySelector(sel);
        const priceText = priceCell.innerText;
        const nationalPrice = priceText.match(/(\d+\.*\d*)\s*(RUB|KZT|UAH|руб)/) || [];
        const foreignPrice = priceText.match(/(\d+\.*\d*)\s*(EUR|USD)/) || [];
        const currencyMatcher = isPrefferedDefaultCurrencyUtil() ? new RegExp(`(\\d+)\\.*\\d*\\s*(RUB|KZT|UAH|руб)`) : /(\d+)\.*\d*\s*(EUR|USD)/;
        const matched = priceCell.innerText.match(currencyMatcher) || priceCell.innerText.match(/(\d+)\.*\d*\s*(EUR|USD|RUB|KZT|UAH|руб)/);
        return {price: parseFloat(matched[1]), totalPrice: parseFloat(matched[1]) , currency: matched[2],
            all: {
            nationalPrice : {
                price: parseFloat(nationalPrice[1]),
                currency: nationalPrice[2]},
            foreignPrice: {
                price: parseFloat(foreignPrice[1]),
                currency: foreignPrice[2]}}}
    } catch(e) {
        return {};
    }
}

function getFlight() {
    try {
        if  ( !document.querySelector(".freights_container") ) {
            return null;
        }
        var flightElems = querySelectorAll(document, "select.freight").map( select => selectedOption(select, false) );
        if ( flightElems.length > 0 ) {
            return createSmallFlight(flightElems);
        }
        flightElems = querySelectorAll(document, '.freightTable tr.checked');
        if ( flightElems.length > 0 ) {
            return createLargeFlight(flightElems);
        }
    } catch (e) {
        console.log(e);
        return null;
    }
    return null;
}

function createSmallFlight(options) {
    let segments = options.map(option => {
        return createSmallSector(option);
    }).flatMap(seg => seg);

    let sectors = [];
    let obj = [];
    let isBusRoute = false;
    segments.forEach((segment, index) => {
        const arrival = segment.arrivalDate;
        const departure = segments[index + 1] ? segments[index + 1].departureDate : null;
        const distance = getDistance(arrival, departure);
        if (!segment.added) {
            obj.push(segment);
        }
        if ( segment.isBusRoute ) {
            isBusRoute = true;
        }
        if (arrival && departure && distance < 2 && (!segment.serviceClass || !segment.serviceClass.match(/купе|св|плацкар/i))) {
            obj.push(segments[index + 1]);
            segments[index + 1].added = true;
            return;
        }
        sectors.push({segments: obj});
        obj = [];
    });

    return {
        sectors,
        isBusRoute
    }
}

function createLargeFlight(trs) {
    var sectors = parseSectors(trs);
    return {
        sectors:
            sectors.map(sector => {
                return createLargeSector(sector);
            })
    }
}

function parseSectors(trs) {
    var sectorsArray = [];
    var tempArray = [];
    for ( var tr of trs ) {
        if ( tr.querySelector(".fr_place_r, .fr_place_l") ) {
            if ( tempArray.length > 0 ) {
                sectorsArray.push(tempArray);
            }
            tempArray = [];
        }
        tempArray.push(tr);
    }
    if ( tempArray.length > 0 ) {
        sectorsArray.push(tempArray);
    }
    return sectorsArray;
}

function createLargeSector(sector) {
    try {
        return {
            segments: sector.map(tr => {
                const segment = getSegmentFromAltIndexes(tr) || getSegmentFromBaseIndexes(tr)
                segment.serviceClass = segment.serviceClass ? segment.serviceClass.replace(/Блок/i, 'Эконом') : segment.serviceClass

                let flightPriceNodes = $1('.EXTERNALFREIGHT .external_freight_note') && $1('.EXTERNALFREIGHT .external_freight_note').childNodes;
                if ( flightPriceNodes && flightPriceNodes.length > 0 ) {
                    const flightString = [...flightPriceNodes].find(node => getNodeProperty(node, '').match(segment.flightNumber))
                    if ( flightString ) {
                        const flightStringArray = getText(flightString).split(/\n/);
                        const thisFlightString = flightStringArray.find(text => text.match(segment.flightNumber))
                        if ( !thisFlightString ) {
                            return segment;
                        }
                        const [departureAirportID, arrivalAirportID] = thisFlightString.match(/\b[A-Z]{3}\b/g) || [];
                        if ( departureAirportID ) {
                            segment.departureAirportID = departureAirportID;
                        }
                        if ( arrivalAirportID ) {
                            segment.arrivalAirportID = arrivalAirportID;
                        }
                    }
                }
                return segment;
            })
        }
    } catch (e) {
        return null;
    }

}

function getSegmentFromBaseIndexes(tr) {
    try {
        var tds = querySelectorAll(tr, "td").filter(td => !td.getAttribute("rowspan"));
        var dateTimeDep = parseDateTime(tds[2].dataset.title);
        var dateTimeArr = parseDateTime(tds[3].dataset.title);
        var depCity = tds[4].dataset.title.split(", ");
        var arrCity = tds[5].dataset.title.split(", ");
        const flightNumber = getText(tds[0]);

        return {
            flightNumber,
            airline: tds[0].dataset ? tds[0].dataset.title : JSON.parse(tr.dataset.bindFilter).full_airline,
            departureDate: dateTimeDep.date,
            departureTime: dateTimeDep.time,
            departureCity: depCity[0],
            departureAirport: depCity[1],
            departureAirportID: null,
            departureTerminal: null,
            serviceClass: tds[6].dataset.title,
            arrivalDate: dateTimeArr.date,
            arrivalTime: dateTimeArr.time,
            arrivalCity: arrCity[0],
            arrivalAirport: arrCity[1],
            arrivalAirportID: null,
            arrivalTerminal: null,
            travelTime: getText(tds[1]) || null,
            plane: null
        }
    } catch (e) {
        console.log(e);
        return null;
    }

}

function getSegmentFromAltIndexes(tr) {
    try {
        var tds = querySelectorAll(tr, "td");

        const tdsTitles = $$('td[data-title]', tr)

        var dateTimeDep = parseDateTime(tdsTitles[2].dataset.title);
        var dateTimeArr = parseDateTime(tdsTitles[3].dataset.title);
        var depCity = tdsTitles[4].dataset.title.split(", ");
        var arrCity = tdsTitles[5].dataset.title.split(", ");

        return {
            flightNumber: getText(tdsTitles[0]),
            airline: tdsTitles[0].dataset ? tdsTitles[0].dataset.title : JSON.parse(tr.dataset.bindFilter).full_airline,
            departureDate: dateTimeDep.date,
            departureTime: dateTimeDep.time,
            departureCity: depCity[0],
            departureAirport: depCity[1],
            departureAirportID: null,
            departureTerminal: null,
            serviceClass: tdsTitles[5].dataset.title,
            baggage: tdsTitles[6].dataset.title,
            arrivalDate: dateTimeArr.date,
            arrivalTime: dateTimeArr.time,
            arrivalCity: arrCity[0],
            arrivalAirport: arrCity[1],
            arrivalAirportID: null,
            arrivalTerminal: null,
            travelTime: getText(tds[1]) || null,
            plane: null
        }
    } catch (e) {
        console.log(e);
        return null;
    }

}

function parseDateTime(text) {
    var cleanText = text.replace(/\+\d+/,"");
    var date = cleanText.match(/(\d{2}\.\d{2}\.\d{4})/) || "";
    var time = cleanText.match(/(\d{2}:\d{2})/) || "";
    return { date: date[1], time: time[1] }
}

function createSmallSector(option) {
    var fromJson = JSON.parse(option.dataset.json);
    var text = getText(option);
    const isBusRoute = !!text.match(/автобус|bus/i) && !text.match(/BUS/).length > 0;

    var service = text.match(/\[(.+)\]/);
    text = (text.match(/\d+\s+\((.+ — .+)\)/) || text.match(/\(.+\((.+ — .+)\)/));
    if ( !text ) {
        return createTicketSector(option, fromJson, service);
    }
    text = text[1];
    var cities = text.replace(/\d{2}:\d{2}|\s+[A-Z]{3}\s+|\s+[A-Z]{3}-[A-Z]\s+|\+\d+|\d+/g, "").trim().split("—");
    var times = text.match(/\d{2}:\d{2}/g) || [];
    var airportId = text.replace(new RegExp([...cities.map(city => city.replace(/\)/g, "\\)").replace(/\(/g, "\\(")),...times].join("|"), "g"), "").trim().split("—");
    const serviceClass = service && service[1] ? service[1].replace(/Блок/i, 'Эконом') : null;
    const sector = {
        flightNumber: fromJson.name,
        airline: "",
        departureDate: fromJson.datebeg,
        departureTime: times[0],
        departureCity: cities[0].trim(),
        departureAirport: null,
        departureAirportID: (airportId[0].match(/[A-Z]{3}/) || "")[0],
        departureTerminal: (airportId[0].match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1],
        serviceClass,
        arrivalDate: compareTime(times[0], times[1]) ? addDaysToStringDate(fromJson.datebeg, 1) : fromJson.datebeg,
        arrivalTime: times[1],
        arrivalCity: cities[1].trim(),
        arrivalAirport: "",
        arrivalAirportID: (airportId[1].match(/[A-Z]{3}/) || "")[0],
        arrivalTerminal: (airportId[1].match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1],
        travelTime: "",
        plane: ""

    }
    sector.isBusRoute = isBusRoute;
    return [sector]
}

function createTicketSector(option, fromJson, service) {
    const text = getText(option);
    const segments = text.split(/\s*\/\s*/).map(seg => parseTicketSegment(seg, fromJson, service));
    return segments;
}

function parseTicketSegment(segment, fromJson, service) {
    const text = (segment.match(/\d+\s+\((.+ - .+)\)/) || segment.match(/\(.+\((.+ — .+)\)/) || segment.match(/\d+\s+\((.+ — .+)\)/))[1];
    const cities = text.replace(/\d{2}:\d{2}|\s+[A-Z]{3}\s+|\s+[A-Z]{3}-[A-Z]\s+|\+\d+|\d+/g, "").trim().split(/—|-/);
    const times = text.match(/\d{2}:\d{2}/g) || [];
    const airportId = text.replace(new RegExp([...cities.map(city => city.replace(/\)/g, "\\)").replace(/\(/g, "\\(")), ...times].join("|"), "g"), "").trim().split(/—|-/);
    const serviceClass = service && service[1] ? service[1].replace(/Блок/i, 'Эконом') : null;
    return {
        flightNumber: segment.match(/(.+?)\s*\(/)[1],
        airline: "",
        departureDate: fromJson.datebeg,
        departureTime: times[0],
        departureCity: cities[0].trim(),
        departureAirport: null,
        departureAirportID: (airportId[0].match(/[A-Z]{3}/) || "")[0],
        departureTerminal: (airportId[0].match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1],
        serviceClass,
        arrivalDate: fromJson.dateend,
        arrivalTime: times[1],
        arrivalCity: cities[1].trim(),
        arrivalAirport: "",
        arrivalAirportID: (airportId[1].match(/[A-Z]{3}/) || "")[0],
        arrivalTerminal: (airportId[1].match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1],
        travelTime: "",
        plane: ""

    }
}

function getHotelRowByImage(img) {
    return document.body;
}

function injectCurrencySelection(selector = "", operator = OPERATOR_CURRENCY, legendStyle = "width:auto;float:left;margin-right:6px;font-size:12px;color:white;", selectStyle = "margin-top:-3px;", display = "display: block;") {
    if( document.querySelector("#qq-currency") ) {
        document.querySelector("#qq-currency").setAttribute("style", display);
        return;
    }
    var submit = document.querySelector(selector);
    if ( !submit ) {
        return;
    }
    addCurrencySelectionUtil(submit, legendStyle, selectStyle);
    addAddonMessageListener(operator + " currency", function(currency) {
        document.querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
        document.querySelector("#qq-currency").setAttribute("style", display);
    });
    sendMessageToAddon("get operator currency", OPERATOR_CURRENCY);
}

function createQuickBookingOption(button) {
    const other = querySelectorAll(document, '.ASERVICES tr')
                    .filter(quickBookingsFilterCallback)
                    .map(parseService)
                    .filter(val => val);
    const insurance = $$('.INSURESINFO tr[data-selected="1"][data-uid]')
                     .map(parseInsurance);

    const notes = querySelectorAll(document, '.claim_info_note input[type="checkbox"]:checked')
                  .map( input => getNodeProperty(input.parentNode) ).join("; ");


    const price = getPriceAndCurrency(".COMMISSIONS .amount_money");
    const grossPrice = getPriceAndCurrency();
    let nettPrice = price.price;
    let nettPriceCurrency = price.currency;
    const prices = new Prices();

    if ( grossPrice.all ) {
        prices.foreignCurrency = grossPrice.all.foreignPrice.currency;

        prices.foreignGrossPrice = grossPrice.all.foreignPrice.price;
        prices.nationalCurrency = grossPrice.all.nationalPrice.currency;
        prices.nationalGrossPrice = grossPrice.all.nationalPrice.price;
    }

    if ( price.all ) {
        prices.foreignNettPrice = price.all.foreignPrice.price;
        prices.foreignCurrency = grossPrice.all.foreignPrice.currency;
        prices.nationalNettPrice = price.all.nationalPrice.price;
    }


    let commission = getPriceAndCurrency(".COMMISSIONS .commission_money").price;
    const commissionPercent = parseFloat(getNodeProperty(document.querySelector('.COMMISSIONS .COMMISSION .value')));
    const services = {
        insurance,
        transfers: other.filter(service => service.caption.match(/Трансфер|Transfer/i )),
        fuelCharge: other.filter(service => service.caption.match(/Топлив|fuel/i )),
        flightType: getFlightType(),
        other: other.filter(service => !service.caption.match(/топлив|трансфер|Transfer/i )),
        notes,
        nettPrice,
        nettPriceCurrency,
        commission,
        commissionPercent,
        prices
    };
    return services;
}

function getFlightType() {
    return $$( '.freightTable tr.checked').length > 0 ? 'Scheduled' : 'Charter';
}

function quickBookingsFilterCallback(tr) {
    const btnAdd = tr.querySelector('.offered_additional_insure');
    if ( (btnAdd && getText(btnAdd).match(/Добавить/i)) || tr.querySelector('.insure_note') ) {
        return false;
    }
    return tr.clientHeight > 0 &&
           Object.keys(tr.dataset).length > 0 &&
           (tr.dataset.selected && tr.dataset.selected === "1" || tr.dataset.selected === undefined);
}

function parseInsurance(tr) {
    const json = JSON.parse(tr.dataset.json);
    return new quickBookingValue({
        description: json.name,
        dateStart: json.datebeg,
        dateEnd: json.dateend,
        count: json.count,
        caption: 'insurance'
    })
}

function parseService(tr) {
    const parts = getNodeProperty(tr, '').split(/:\s*|\n/).filter(text => text);
    const tds = querySelectorAll(tr, 'td').map(td => getNodeProperty(td, ''));
    if ( !tr.dataset.json ) {
        return null;
    }
    const json = JSON.parse(tr.dataset.json);
    if (json.count === 0) {
        return null;
    }
    return new quickBookingValue({
        description: tds[0],
        dateStart: json.datebeg,
        dateEnd: json.dateend,
        caption: parts[0],
        price: parseInt(tds[3]),
        currency: parseInt(tds[3]) ? mapCurrencyUtil(tds[3].replace(/\d+|\s+/, '')) : null
    })
}

function parsePassengers() {
    const panels = querySelectorAll(document, ".tourists-tabs .panel").filter(panel => panel.offsetHeight > 0);
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const sex = String(+getNodeProperty(panel.querySelector('.sex:checked'), null, 'value'));
    const isClient = !!panel.closest('.BUYERINFO')
    let passenger = getInputsValues(panel, {
        authority: "input[name*='[PGIVENORG]']",
        birthday: "input[name*='[BORN]']",
        issueDate: "input[name*='[PGIVEN]']",
        expire: "input[name*='[PVALID]']",
        lastName: "input[data-field-title='Фамилия'],input[name*='[LASTNAME'], input[name*='[LASTNAME_LNAME]']",
        firstName: "input[data-field-title='Имя'],input[name*='[FIRSTNAME'], input[name*='[FIRSTNAME_LNAME]']",
        serial: "input[data-field-title='Серия паспорта'], input[name*='[PSERIE]']",
        number: "input[data-field-title='Номер паспорта'], input[name*='[PNUMBER]']",
        phone: "input[data-field-title='Мобильный телефон'], input[name*='[PHONE]'], input[name*='[MOBILE]']",
        address: "input[name*='[ADDRESS]']",
        email: "input[name*='[EMAIL]']",
        inn: "input[name*='[INN]']"
    })
    if ( isClient ) {
        passenger.isClient = true;
        const fio = getNodeData("input[name*='[NAME]']", panel, 'value');
        if ( fio ) {
            const [lastName, firstName, secondName] = fio.split(/\s+/);
            passenger.lastName = lastName;
            passenger.firstName = firstName;
            passenger.secondName = secondName;
        }
    }
    const obj = {
        nationality: selectedOption(panel.querySelector('[name*="NATIONALITY"]')),
        sex: sex === '0' ? '1' : (sex === '1' ? '2' :null ),
        type: getNodeProperty(panel.querySelector('legend'), '').match(/Младенец/i) ? 'infant' : 'adult',
        title: selectedOption(panel.querySelector('[name*="HUMAN"]'))
    }
    return new Passenger(Object.assign(passenger, obj), panel);
}

function parseClient() {
    const clientNode =  $1('.BUYERINFO .panel');
    if ( clientNode && clientNode.offsetHeight > 0 ) {
        return extractPassengerInfo(clientNode);
    }
}

function parsePassengersCountModule() {
    try {
        const passengersCount = {
            adults: 0,
            children: 0,
            infants: 0,
            count: 1
        };
        const insurance = $$('tr[data-selected="1"][data-uid]')[0];
        const json = JSON.parse(insurance.dataset.json);

        passengersCount.adults = json.clients.filter(c => c.human === 'MRS' || c.human === 'MR').length;
        passengersCount.children = json.clients.filter(c => c.human === 'CHD').length;
        passengersCount.infants = json.clients.filter(c => c.human === 'INF').length;
        passengersCount.count = passengersCount.adults + passengersCount.children+ passengersCount.infants
        return passengersCount;

    } catch (e) {
        return {};
    }
}
