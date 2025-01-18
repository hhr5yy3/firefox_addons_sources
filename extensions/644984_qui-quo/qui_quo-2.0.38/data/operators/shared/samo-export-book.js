window.OPERATOR_NAME = window.OPERATOR_NAME || "SAMO-tour";
window.showTopHotelsRating = false;
window.injectionSelector = '.cl_refer_result .cl_alink';
window.defaultOperatorsCountry = {
    'online.kvin-tur.ru': 'Россия'
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    if ( !initParams || initParams.hideQuickBookingTutorial === true ) {
        return '';
    }
    querySelectorAll(document, ".cl_refer_result .cl_alink").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const {container, exportButton} = createQuickBookingContainer();
            const qqBtns = container.querySelector('.qq-box');
            container.style.flexDirection = 'column';
            container.style.zoom = '0.85';
            container.style.maxWidth = '220px';
            container.style.marginTop = '5px';
            qqBtns.style.display = 'none';
            exportButton.style.position = 'inherit';
            div.prepend(container);
        }
    });
}

async function createOption(img) {
    const booking = getHotelRowByImage(img);
    let tbl_orders = booking.querySelector('table.tbl_orders');
    img.textContent = 'Загрузка...';
    if ( !tbl_orders ) {
        tbl_orders = await waitingFor(() => showOrdersTable(booking), 300, 50);
    }
    if ( !tbl_orders ) {
        return {};
    }
    let option = {};

    const flight = getFlight(booking);
    const claimStatus = booking.querySelector('.claim-status');
    const tourTr = claimStatus.closest('tr');
    const tourTds = $$('td', tourTr);
    const fakeTh = document.createElement('th');
    const tourHeadTds = $$('thead th:not(:first-child)', tourTr.closest('table'));
    tourHeadTds.unshift(fakeTh);
    const tourCaption = getText(tourTds[findTableTdIndex(tourHeadTds, /ТурСПО|^Тур|^Tour/i)]);
    const paymentsListNode = tourTds[findTableTdIndex(tourHeadTds, /Предоплата|Полная оплата/i)];
    const paymentsList = getNodeProperty(paymentsListNode, '', 'innerText').split(/\n/);
    const [city_or_country, region, ...other] = tourCaption.replace(/TUR\s*:\s*|\(|\)/g, '').split(/\s+/);
    const city = city_or_country.match(/:/) ? other[other.findIndex(txt => txt.match(/\bиз\b/i)) - 1] : city_or_country;
    const [dateStart, dateEnd] = getText(tourTds[findTableTdIndex(tourHeadTds, /Начало|Початок|From|От\s+до/i)], 'innerText').split(/\n+/);
    let country = parseCountry(img) ||
        getBookingCountry(city_or_country) ||
        (tourCaption.match(/абхазия/i) ? tourCaption : getDefaultCountry()) ||
        city_or_country.split(/\s*:\s*/)[0]

    if ( tourCaption.match(/\bUAE\b/) ) {
        country = "ОАЭ"
    }
    option.dateStart = dateStart;
    option.dateEnd = dateEnd;
    option.region = flight ? lastElement(flight.sectors[0].segments).arrivalCity : city_or_country.match(/:/) ? null : region;
    if ( getDefaultCountry() && !tourCaption.match(/абхазия/i) ) {
        option.region = tourCaption;
    }
    option.country = country;
    option.operator = OPERATOR_NAME;
    option.city_from = flight ? flight.sectors[0].segments[0].departureCity : ($$('tr.freight', booking).length > 0 ? city : null);
    option.flight = flight;
    option.tourOperatorReference = booking.dataset.claim;
    option.hotels = $$('tr.hotel td:first-child', booking).map(hotel => parseHotel(hotel, option.region, country, option));
    if ( getDefaultCountry() && !tourCaption.match(/абхазия/i) ) {
        option.region = tourCaption;
    }
    const priceLink = booking.querySelector('.link.cl_price');
    let costModalContent = null;
    if ( priceLink ) {
        priceLink.click();
        costModalContent = await waitingFor(() => findCostNode(), 200, 60);
        if ( costModalContent ) {
            const closeBtn = document.querySelector('.modalCloseImg.modalClose');
            const priceDetails = getPrice(costModalContent);

            const grossPriceType = mapPriceType(priceDetails.totalPriceCurrency);
            const nettPriceType = mapPriceType(priceDetails.nettPriceCurrency);
            const payedPriceType = mapPriceType(priceDetails.payedCurrency);

            const grossPriceTypeAlternate = mapPriceType(priceDetails.totalPriceCurrencyAlternate);
            const nettPriceTypeAlternate = mapPriceType(priceDetails.nettPriceCurrencyAlternate);
            const payedPriceTypeAlternate = mapPriceType(priceDetails.payedCurrencyAlternate);

            const prices = new Prices();

            prices[`${grossPriceType}`].gross = priceDetails.totalPrice;
            prices[`${grossPriceType}`].currency = priceDetails.totalPriceCurrency;

            prices[`${nettPriceType}`].nett = priceDetails.nettPrice;
            prices[`${nettPriceType}`].currency = priceDetails.nettPriceCurrency || priceDetails.totalPriceCurrency;

            if ( priceDetails.totalPriceAlternate && priceDetails.totalPriceCurrencyAlternate ) {
                prices[`${grossPriceTypeAlternate}`].gross = priceDetails.totalPriceAlternate;
                prices[`${grossPriceTypeAlternate}`].currency = priceDetails.totalPriceCurrencyAlternate;
            }

            if ( priceDetails.nettPriceAlternate && priceDetails.nettPriceCurrencyAlternate ) {
                prices[`${nettPriceTypeAlternate}`].nett = priceDetails.nettPriceAlternate;
                prices[`${nettPriceTypeAlternate}`].currency = priceDetails.nettPriceCurrencyAlternate;
            }

            if ( priceDetails.payed && priceDetails.payedCurrency ) {
                prices[`${payedPriceType}`].payments.push({
                        amount: priceDetails.payed,
                        currency: priceDetails.payedCurrency
                    }
                )
            }

            if ( priceDetails.payedAlternate && priceDetails.payedCurrencyAlternate ) {
                prices[`${payedPriceTypeAlternate}`].payments.push({
                        amount: priceDetails.payedAlternate,
                        currency: priceDetails.payedCurrencyAlternate
                    }
                )
            }

            if ( paymentsList ) {
                paymentsList.forEach(pay => {
                    const percent = (pay.match(/(\d+)\s*%/) || [])[1];
                    const priceString = percent ? null : pay.match(/(\d+\.*\d*)\s*([A-Z]{3})/);
                    const obj = {
                        amount: priceString ? priceString[1] : null,
                        currency: priceString ? priceString[2] : null,
                        date: String(pay.match(getRegexPatterns().dateStrict)),
                        time: String(pay.match(getRegexPatterns().time)),
                        percent
                    }
                    if ( percent || obj.currency === prices.foreignCurrency ) {
                        prices.addForeignPaymentToSchedule(obj)
                    }

                    if ( percent || obj.currency === prices.nationalCurrency ) {
                        prices.addNationalPaymentToSchedule(obj)
                    }
                })
            }
            if ( claimStatus && getText(claimStatus).match(/^Оплачена/) ) {
                prices.paidStatus = window.PAID_STASTUSES.paid;
            }
            if ( claimStatus && getText(claimStatus).match("Частично оплачена") ) {
                prices.paidStatus = window.PAID_STASTUSES.outstanding;
            }
            option.price = priceDetails.totalPrice;
            option.currency = priceDetails.totalPriceCurrency;
            option.nettPrice = priceDetails.nettPrice;
            option.nettPriceCurrency = priceDetails.totalPriceCurrency;
            option.prices = prices;

            closeBtn.click();
        }
    }
    return option;
}

function getDefaultCountry() {            // some operators order tours for only one country
    return window.defaultOperatorsCountry[window.location.hostname]
}

function parseHotel(hotel, region, country, option) {
    if ( $1('.hotel-room', hotel) ) {
        return parseHotelNew(hotel, region, country, option)
    }
    const hotelText = getNodeProperty(hotel);
    const hotelObj = {};
    const regexp = getRegexPatterns();
    let [dateBeg, dateEnd] = hotelText.match(regexp.dateStrict);
    if ( !dateBeg || !dateEnd ) {
        dateBeg = option.dateStart;
        dateEnd = option.dateEnd;
    }
    hotelObj.href = getNodeProperty(hotel.querySelector('a'), null, 'href');
    const hotelTextNodes = [...hotel.childNodes].filter(node => node.nodeName === '#text' && node.textContent.trim());
    if ( hotelTextNodes.length < 3 ) {
        let hotelArray = hotelText.split('/');
        if ( hotelArray.length < 3 ) {
            return Object.assign(hotelObj, parseHotelByDictionary(hotelText, regexp, dateBeg, dateEnd));
        }
        return Object.assign(hotelObj, parseHotelBySplash(hotelText, regexp, dateBeg, dateEnd));
    }
    const roomType = getText(hotelTextNodes[1]).replace(/,$/, '').split(/\s*\/\s*/);
    hotelObj.checkinDt = dateBeg;
    hotelObj.dateStart = dateBeg;
    hotelObj.dateEnd = dateEnd;
    hotelObj.nights = getDistance(dayMonthYearToDate(dateBeg), dayMonthYearToDate(dateEnd)).toString();
    hotelObj.hotelName = getHotelName(hotel, hotelText).trim();
    hotelObj.roomType = roomType.slice(0, -1).join('/');
    hotelObj.accommodation = lastElement(roomType);
    hotelObj.boardType = getText(hotelTextNodes[2]);
    hotelObj.region = region;
    hotelObj.country = country;
    return hotelObj;
}

function parseHotelNew(hotel, region, country, option) {
    const roomType = getNodeData('.hotel-room', hotel).split(/\s*\(|\)\s*/);
    const dates = getNodeData('.hotel-dates', hotel)
    let [dateBeg, dateEnd] = dates.match(getRegexPatterns().dateStrict);
    const hotelObj = {
        hotelName: [getNodeData('.hotel-name', hotel), getNodeData('.hotel-stars', hotel)].filter(Boolean).join(' '),
        roomType: roomType[0],
        accommodation: roomType[1],
        boardType: getNodeData('.hotel-meal', hotel)
    };
    hotelObj.checkinDt = dateBeg;
    hotelObj.dateStart = dateBeg;
    hotelObj.dateEnd = dateEnd;
    hotelObj.href = getNodeProperty(hotel.querySelector('a'), null, 'href');
    hotelObj.nights = getDistance(dayMonthYearToDate(dateBeg), dayMonthYearToDate(dateEnd)).toString();
    hotelObj.region = region;
    hotelObj.country = country;
    return hotelObj;
}

function parseCountry(button) {
    const booking = getHotelRowByImage(button);
    const allServices = $$('.service', booking).map(svc => svc.querySelector('td').textContent.trim());
    const insurance = $$('.insure', booking).map(svc => svc.querySelector('td').textContent.trim());
    let result = [...window.COUNTRY_LIST_RU, ...window.COUNTRY_LIST_ENG, ...window.COUNTRY_LIST_UA].find(country => {
        for ( const text of [...allServices, ...insurance] ) {
            if ( text.split(/[^A-zА-я]/).filter(s => s).find(p => p.toLowerCase() === country.toLowerCase()) ) {
                return true;
            }
        }
    })
    return result;
}

function parseHotelByDictionary(hotelText, regexp, dateBeg, dateEnd) {
    const roomAbrs = ["DBL", "TWIN", "SGL", "TRPL", "QDPL", "APT"];
    const pattern = new RegExp(roomAbrs.join('|'), 'i');
    const accommodation = (hotelText.match(pattern) || [null])[0];
    const textArray = hotelText.split(accommodation);
    return {
        hotelName: textArray[0].trim(),
        checkinDt: dateBeg,
        nights: getDistance(dayMonthYearToDate(dateBeg), dayMonthYearToDate(dateEnd)).toString(),
        accommodation,
        boardType: (textArray[1] || '').replace(regexp.dateStrict, '')
    };
}

function parseHotelBySplash(hotelText, regexp, dateBeg, dateEnd) {
    try {
        const array = hotelText.split(' / ');
        return {
            hotelName: array[0].trim(),
            checkinDt: dateBeg,
            nights: getDistance(dayMonthYearToDate(dateBeg), dayMonthYearToDate(dateEnd)).toString(),
            accommodation: array[2],
            roomType: trim(array[1]),
            boardType: array[3].split(regexp.dateStrict)[0].trim()
        };
    } catch ( e ) {
        return parseHotelByComma(hotelText, regexp, dateBeg, dateEnd);
    }
}

function parseHotelByComma(hotelText, regexp, dateBeg, dateEnd) {
    const array = hotelText.split(/\s*,\s*/);
    return {
        checkinDt: dateBeg,
        country: array[0],
        region: array[1],
        hotelName: array[2],
        boardType: trim(array[3]),
        roomType: array[4],
        nights: getDistance(dayMonthYearToDate(dateBeg), dayMonthYearToDate(dateEnd)).toString()
    }
}

function getBookingCountry(city_or_country) {
    return (city_or_country.match(/([A-Z]{2,3}):/) || "")[1]
}

function getPrice(costModalContent) {
    const totalPrices = getPrices(costModalContent, /Стоимость по каталогу|Стоимость брутто|брутто|Вартість за каталогом|Catalog/i);

    let nettPrice = getPrices(costModalContent, /всего|Стоимость нетто|нетто|Всього|Debt/i);
    if ( !nettPrice.price )  {
        nettPrice = getPrices(costModalContent, /всего|Стоимость нетто|нетто|Всього|Total/i);
    }
    const comission = getPrices(costModalContent, /Итого|Commission|комісія/i);
    const payed = getPrices(costModalContent, /Оплачено|Paid|Сплачено/i);

    return {
        totalPrice: totalPrices.price,
        totalPriceCurrency: totalPrices.currency,
        nettPrice: nettPrice.price || (totalPrices.price - comission.price),
        nettPriceCurrency: nettPrice.currency,
        payed: payed.price,
        payedCurrency: payed.currency,

        totalPriceAlternate: totalPrices.priceAlternate,
        totalPriceCurrencyAlternate: totalPrices.currencyAlternate,
        nettPriceAlternate: nettPrice.priceAlternate || (totalPrices.priceAlternate + comission.priceAlternate),
        nettPriceCurrencyAlternate: nettPrice.currencyAlternate,
        payedAlternate: payed.priceAlternate,
        payedCurrencyAlternate: payed.currencyAlternate
    };
}

function getPrices(costModalContent, regexp) {
    const headTr = $$('thead tr', costModalContent).filter(tr => !getText(tr).match(/владелец|owner|Власник/i))[0];
    const bodyTrs = $$('tbody tr', costModalContent);
    const priceTr = bodyTrs.find(tr => getText(tr).match(regexp));
    if ( !priceTr ) {
        return {price: null, currency: null, priceAlternate: null, currencyAlternate: null}
    }
    const priceTds = $$('td', priceTr);

    const priceTdIndexes = priceTds.map(findPriceIndexes).filter(idx => idx !== -1);
    const price = parseFloat(getNodeProperty(priceTds[priceTdIndexes[0]], "0"));
    const currency = getNodeProperty($$('td,th', headTr)[priceTdIndexes[0]], '').slice(0, 3);

    const priceAlternate = parseFloat(getNodeProperty(priceTds[priceTdIndexes[1]]));
    const currencyAlternate = getNodeProperty($$('td, th', headTr)[priceTdIndexes[1]], '').slice(0, 3);
    return {price, currency, priceAlternate, currencyAlternate}
}

function findPriceIndexes(td, index) {
    return !isNaN(parseFloat(getText(td))) ? index : -1;
}

function findCostNode() {
    const costNode = document.querySelector('#basicModalContent .cl_referer_cost');
    if ( costNode ) {
        return costNode.closest('#basicModalContent');
    }
    return null;
}

async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const booking = getHotelRowByImage(button);
    const allServices = $$('.service', booking).map(svc => parseService(svc.querySelector('td')));
    const insurance = $$('.insure', booking).map(svc => parseInsurance(svc.querySelector('td')));
    const busRoutes = getBusRoutes(booking);
    const services = {
        insurance,
        transfers: allServices.filter(service => service.caption.match(/Трансфер|Transfer/i)),
        fuelCharge: allServices.filter(service => service.caption.match(/Топлив|fuel/i)),
        other: allServices.filter(service => !service.caption.match(/топлив|трансфер|Transfer|fuel|страховка|insurance/i) && !service.description.match(/страховка|insurance/i)),
        nettPrice: tourOptions.nettPrice,
        nettPriceCurrency: tourOptions.nettPriceCurrency,
        tourOperatorReference: tourOptions.tourOperatorReference,
        tourOptions,
        busRoutes,
        notes: getNodeProperty(booking.querySelector('.partnercomment'))
    };
    return services;
}

function getBusRoutes(booking) {
    return $$('tr.freight', booking)
        .filter(tr => getText(tr).match(/автобус/i))
        .map(parseBusRoute);
}

function parseBusRoute(row) {
    const text = getText(row);
    const [departure, arrival] = text.split(/\s*->|→\s*/);

    const date = departure.match(getRegexPatterns().date)[0];
    const addDays = arrival.match(/\+\d+/);
    return new quickBookingValue({
        dateStart: date,
        dateEnd: addDays ? addDaysToStringDate(date, parseInt(addDays[0].replace(/\D+, ''/g))) : date,
        description: trim(text)
    })
}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

function getHotelName(hotel, hotelText) {
    let caption = getNodeProperty(hotel.querySelector('a'));
    if ( !caption ) {
        caption = hotelText.split(/\(\d\*|\d{2}/)[0].trim();
    }

    const starsCount = hotelText.match(/(\d)\s*\*/);
    const stars = starsCount ? +starsCount[1] : (hotelText.match(/\*/g) || []).length;
    return `${caption}${stars > 0 ? ' ' + stars + '*' : ''}`
}

function getHotelRowByImage(img) {
    return img.closest('.cl_refer_result');
}

function parseService(td) {
    const text = getText(td);
    const matched = text.match(/(.+?):\s+(.+?)\s+(\d{2}.\d{2}.\d{4}).+(\d{2}.\d{2}.\d{4})/);
    if ( matched ) {
        const [, caption, description, dateStart, dateEnd] = text.match(/(.+?):\s+(.+?)\s+(\d{2}.\d{2}.\d{4}).+(\d{2}.\d{2}.\d{4})/);
        return new quickBookingValue({
            caption, description, dateStart, dateEnd
        });
    }
    return parseUnknownService(text);
}

function parseInsurance(td) {
    const text = getText(td);
    const caption = 'Страховка';
    const matched = text.match(/^(.+?)\s+(\d{2}.\d{2}.\d{4}).+(\d{2}.\d{2}.\d{4})/);
    if ( matched ) {
        const [, description, dateStart, dateEnd] = text.match(/^(.+?)\s+(\d{2}.\d{2}.\d{4}).+(\d{2}.\d{2}.\d{4})/).map(s => s && typeof s === 'string' ? trim(s) : s);
        return new quickBookingValue({
            caption, description, dateStart, dateEnd
        });
    }
    return parseUnknownService(text, caption)
}

function parseUnknownService(text, caption) {
    const dates = text.match(getRegexPatterns().dateStrict);
    if ( dates ) {
        return new quickBookingValue({
            description: trim(text.split(dates[0])[0]),
            dateStart: dates[0],
            dateEnd: dates[1],
            caption: caption || (text.match(/топлив.+?\s+|трансфер|Transfer|fuel/i) || ['Другое'])[0]
        });
    }

    return new quickBookingValue({
        description: text, caption: caption || (text.match(/топлив.+?\s+|трансфер|Transfer|fuel/i) || ['Другое'])[0]
    });
}

function getFlight(booking) {
    let sectors = $$('tr.freight', booking);

    try {
        if ( sectors.some(tr => getText(tr).match(/автобус/i)) ) {
            return null;
        }
        sectors = sectors.map(createSmallSector);
        if ( sectors.length === 0 ) {
            return null;
        }
        return {sectors};
    } catch ( e ) {
        console.log(e)
        sectors = sectors.map(createRareSector).filter(sec => sec);
        if ( sectors.length === 0 ) {
            if ( sectors.length === 0 ) {
                return null;
            }
        }
        return {sectors};
    }
}

function createManualSector(sector) {
    try {
        let text = getText(sector);
        let fromJson = JSON.parse(sector.dataset.freight);
        let times = text.match(/\d{2}:\d{2}/g);
        let cities = text.match(/([A-zА-я]+)-([A-zА-я]+)/)
        return {
            segments: [{
                flightNumber: (text.match(/[A-Z0-9]{2}\s*\d{3,4}/) || '')[0],
                departureDate: fromJson.datebeg,
                departureTime: times[0],
                departureCity: cities[1].trim(),
                arrivalDate: fromJson.dateend,
                arrivalTime: times[1],
                arrivalCity: cities[2].trim(),
            }]
        }
    } catch ( e ) {
        return null;
    }
}

function createRareSector(sector) {
    try {
        let fromJson = JSON.parse(sector.dataset.freight);
        let text = getText(sector);
        let service = text.match(/\[(.+)\]/);
        text = (text.match(/\d+\s+\((.+ [—\-] .+)\)/) || text.match(/\(.+\((.+ [—\-] .+)\)/))[1];
        let cities = text.replace(/\d{2}:\d{2}|\s+[A-Z]{3}\s+|\s+[A-Z]{3}-[A-Z]\s+|\+\d+|\d+/g, "").trim().split(/[—\-]/);
        let times = text.match(/\d{2}:\d{2}/g);
        let airportId = text.replace(new RegExp([...cities.map(city => city.replace(/\)/g, "\\)").replace(/\(/g, "\\(")), ...times].join("|"), "g"), "").trim().split(/[—\-]/);
        const arrivalDate = compareTime(fromJson.datebeg, fromJson.dateend) ? addDaysToStringDate(departureDate, 1) : fromJson.dateend;
        return {
            segments: [{
                flightNumber: (getText(sector).match(/[A-Z0-9]{2}\s*\d{3,4}/) || '')[0],
                departureDate: fromJson.datebeg,
                departureTime: times[0],
                departureCity: cities[0].trim(),
                departureAirport: null,
                departureAirportID: (airportId[0].match(/[A-Z]{3}/) || "")[0],
                departureTerminal: (airportId[0].match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1],
                serviceClass: service ? service[1] : null,
                arrivalDate,
                arrivalTime: times[1],
                arrivalCity: cities[1].trim(),
                arrivalAirport: "",
                arrivalAirportID: (airportId[1].match(/[A-Z]{3}/) || "")[0],
                arrivalTerminal: (airportId[1].match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1]
            }]
        }
    } catch ( e ) {
        return createManualSector(sector);
    }
}

function createSmallSector(sector) {
    const textWith = trim(getText(sector));
    const text = textWith.replace('()', '');

    const [departure, arrival] = text.split(/\s*->|→\s*/);

    let [, flightNumber, airline, plane, departureDate,
        departureCity, departureAirportId, departureTime] = departure
        .match(/([1-9A-ZА-Я]{2,3}\s*-*\d{2,4})\s*(.+?)\s*\((.*?)\)\s*(\d{2}\.\d{2}\.\d{4})\s*(.+?)\s*\((.+?)\s*(\d{2}:\d{2})\)/) || [];

    if ( !flightNumber ) {
        const [departure, _] = textWith.split(/\s*->|→\s*/);
        [, flightNumber, airline, plane, departureDate,
            departureCity, departureAirportId, departureTime] = departure
            .match(/([1-9A-ZА-Я]{2,3}\s*-*\d{2,4})\s*(.+?)\s*\((.*?)\)\s*(\d{2}\.\d{2}\.\d{4})\s*(.+?)\s*\((.+?)\s*(\d{2}:\d{2})\)/) || [];
    }

    let [, arrivalCity, arrivalAirportId, arrivalTime, serviceClass] = arrival.match(/^(.+?)\s*\((.+?)\s*(\d{2}:\d{2}).*?\)\s*([A-Z])/) || [];
    if ( !departureCity ) {
        [, flightNumber, airline, plane, departureDate] = departure
            .match(/([1-9A-ZА-Я]{2}\s*\d{3,4})\s*(.+?)\s*\((.+?)\)\s*(\d{2}\.\d{2}\.\d{4})/) || [];
    }
    if ( !flightNumber ) {
        const [departure] = textWith.split(/\s*->|→\s*/);
        [, flightNumber, airline, plane, departureDate,
            departureCity, departureAirportId, departureTime] = departure
            .match(/([1-9A-ZА-Я]{2,3}\s*-*\d{3,4})\s*(.+?)\s*\((.*?)\)\s*(\d{2}\.\d{2}\.\d{4})\s*(.+?)\s*\((.+?)\s*(\d{2}:\d{2})\)/) || [];
    }

    const baggage = trim(getNodeProperty(sector.querySelector('.freight_note'), '', 'innerText'));
    const additionalDay = arrival.match(/\d{2}:\d{2}\s*\+(\d)/);
    if ( !departureDate ) {
        const dates = textWith.match(getRegexPatterns().date);
        if ( dates[0] ) {
            departureDate = dates[0]
        }
    }

    const arrivalDate = additionalDay ? addDaysToStringDate(departureDate, additionalDay[1]) : departureDate;
    if ( !departureCity ) {
        return createSmallSectorNew(sector)
    }
    return {
        segments: [{
            flightNumber,
            airline,
            departureDate,
            departureTime,
            departureCity,
            departureAirport: null,
            departureAirportID: departureAirportId ? (departureAirportId.match(/[A-Z]{3}/) || "")[0] : null,
            departureTerminal: departureAirportId ? (departureAirportId.match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1] : null,
            serviceClass,
            arrivalDate,
            arrivalTime,
            arrivalCity,
            arrivalAirportID: arrivalAirportId ? (arrivalAirportId.match(/[A-Z]{3}/) || "")[0] : null,
            arrivalTerminal: arrivalAirportId ? (arrivalAirportId.match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1] : null,
            plane,
            baggage
        }]
    }
}

function createSmallSectorNew(sector) {
    const textWith = trim(getText(sector));
    const text = textWith.replace('()', '');
    const [departure, arrival] = text.split(/\s*->|→\s*/);

    let [, flightNumber, airline, departureDate,
        departureCity, departureAirportId, departureTime] = departure
        .match(/([1-9A-ZА-Я]{2,3}\s*-*\d{2,4})\.*\s*(.+?)\s*(\d{2}\.\d{2}\.\d{4})\s*(.+?)\s*\((.+?)\)\s*(\d{2}:\d{2})/) || [];


    let [, arrivalCity, arrivalAirportId, arrivalTime, serviceClass] = arrival.match(/^(.+?)\s*\((.+?)\)\s*(\d{2}:\d{2}).*?\s*([A-Z]*)/) || [];

    const baggage = trim(getNodeProperty(sector.querySelector('.freight_note'), '', 'innerText'));
    const additionalDay = arrival.match(/\d{2}:\d{2}\s*\+(\d)/);
    if (!departureDate) {
        const dates = textWith.match(getRegexPatterns().date);
        if (dates[0]) {
            departureDate = dates[0]
        }
    }

    const arrivalDate = additionalDay ? addDaysToStringDate(departureDate, additionalDay[1]) : departureDate;
    return {
        segments: [{
            flightNumber,
            airline,
            departureDate,
            departureTime,
            departureCity,
            departureAirport: null,
            departureAirportID: departureAirportId ? (departureAirportId.match(/[A-Z]{3}/) || "")[0] : null,
            departureTerminal: departureAirportId ? (departureAirportId.match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1] : null,
            serviceClass,
            arrivalDate,
            arrivalTime,
            arrivalCity,
            arrivalAirportID: arrivalAirportId ? (arrivalAirportId.match(/[A-Z]{3}/) || "")[0] : null,
            arrivalTerminal: arrivalAirportId ? (arrivalAirportId.match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1] : null,
            baggage
        }]
    }
}


function showOrdersTable(booking) {
    const hotel = booking.querySelector('table.tbl_orders, table.orders-group');
    if (hotel) {
        return hotel;
    }
    const showMoreLink = booking.querySelector('.toggle_orders.link, .claim-orders__button.link');
    if ( showMoreLink ) {
        showMoreLink.click();
    }
    return null;
}

async function parsePassengers(button) {
    const booking = getHotelRowByImage(button);
    const panels = querySelectorAll(booking, ".tbl_peoples tr[id*='people']");
    const passengersSimple = panels.map(extractPassengerInfo);
    const passengersFull = (await extractFullPassengersInfo(panels)).filter(p => p && p.lastName);
    return passengersFull.length > 0 ? passengersFull : passengersSimple;
}

function extractPassengerInfo(panel) {
    const fio = getNodeProperty(panel.querySelector('.fio')).split(/\s+|\//);
    const passport = getNodeProperty(panel.querySelector('.passport_block, .passport'), '').split(/\s+.\D+\s+/);
    const passenger = new Passenger(
        {
            birthday: getNodeProperty(panel.querySelector('.born')),
            lastName: fio[0],
            firstName: fio[1],
            serial: passport[0].split(/\s+/)[0],
            number: passport[0].split(/\s+/)[1],
            expire: passport[1]
        });
    passenger.docType = passenger.parseDocType(passenger);
    return passenger;
}

async function extractFullPassengersInfo(panels) {                     //fetch("https://b2b.fstravel.com/edit_tourist?CLAIM=6040894&PEOPLE=7919704&CHECKOUT=20220529")
    try {
        const params = panels.map(constructGetUrl);
        const results = await Promise.all(params.map(url => fetch(url).then(resp => resp.text())));
        const passengers = results.map(extractFullPassenger);
        return passengers;
    } catch ( e ) {
        console.log(e);
        return [];
    }
}

function extractFullPassenger(text) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const values = $$('tr', doc).map(tr => ({
        label: getNodeProperty($first('label', tr)),
        value: getNodeProperty($first('input', tr), null, 'value')
    }));
    const findValue = (caption) => (values.find(val => val.label === caption) || {}).value || '';
    const sex = $first('input.sex:checked', doc);
    return new Passenger({
        title: findValue('MR/MRS/CHD/INF'),
        sex: sex ? mapSex(sex.value) : mapSex(findValue('Пол')),
        lastName: findValue('Фамилия по-латински'),
        firstName: findValue('Имя по-латински'),
        secondName: findValue('"Отчество по-латински'),
        birthday: findValue('Дата рождения'),
        serial: findValue('Серия документа') || findValue('Серия паспорта'),
        number: findValue('Номер документа') || findValue('Номер паспорта'),
        issueDate: findValue('Документ выдан') || findValue('Паспорт выдан'),
        nationality: findValue('Гражданство'),
        expire: findValue('Действителен до'),
        // phone: findValue('Телефон') || findValue('Мобильный телефон'),
        // email: findValue('E-Mail'),
        inn: findValue('ИНН')
    })
}

function mapSex(str) {
    if ( !str || typeof str !== 'string' ) {
        return null;
    }
    if ( str === '1' ) {
        return '1';
    }
    if ( str === '0' ) {
        return '2';
    }
    if ( str.match(/муж/i) ) {
        return '1';
    }
    if ( str.match(/жен/i) ) {
        return '2';
    }
}

function constructGetUrl(panel) {
    const claimNode = panel.closest('[data-claim]')
    const claim = claimNode.dataset.claim;
    const checkout = claimNode.dataset.checkout;
    const people = panel.dataset.people;
    const href = location.href;
    return href.replace(/cl_refer.*/, `edit_tourist&CLAIM=${claim}&PEOPLE=${people}&CHECKOUT=${checkout}`);
}


async function parseClient(button) {
    try {
        const claim = button.closest('[data-claim]')
        const clientHref = $1('.link.phys_byer', claim);
        if ( clientHref ) {
            clientHref.click();
            const popup = await waitingFor(() => {
                const p = $1(`#phys_byer[data-claim="${claim.dataset.claim}"]`);
                return p;
            }, 100, 200);
            if ( popup ) {
                const closeBtn = $1('.modalTitle .modalClose', popup.closest('#modalContainer'));
                const [last, first, second] = getNodeData('[name*="[NAME]"]', popup, 'value', '').split(/\s+/)
                if ( !last || !first || !second ) {
                    return null;
                }
                const passenger = new Passenger(getInputsValues(popup, {
                    serial: '[name*="[PSERIE]"]',
                    number: '[name*="[PNUMBER]"]',
                    address: '[name*="[ADDRESS]"]',
                    phone: '[name*="[MOBILE]"]',
                    email: '[name*="[EMAIL]"]',
                    inn: '[name*="[NAME]"]',
                    birthday: '[name*="[BORN]"]'
                }));

                passenger.lastName = last;
                passenger.firstName = first;
                passenger.secondName = second;
                passenger.isClient = true;
                passenger.nationality = selectedOption($1('select[name*="[NATIONALITY]"]', popup));

                if ( closeBtn ) {
                    closeBtn.click();
                }
                return passenger;
            }
        }
    } catch ( e ) {
        console.log(e);
        return null;
    }

}
