window.OPERATOR_NAME = "Pegas";
window.injectionSelector = 'table.search-results td.booking';
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    if ( !initParams || initParams.hideQuickBookingTutorial === true ) {
        return;
    }
    $$( "table.search-results td.booking").forEach(div => {
        if (!div.querySelector(".qq") && !div.querySelector('.cancelledprebooking')) {
            const container = createQQContainer('transform: scale(0.8); margin-left: -15px;');
            const qqBtns = container.querySelector('.qq-box');
            const exportBtn = container.querySelector('.qq-export-button');
            qqBtns.style.display = 'none';
            exportBtn.style.minWidth = '160px';
            div.append(container);
        }
    });
}

async function createOption(img) {
    const bookRow = getHotelRowByImage(img);
    const searchResults = bookRow.closest('.search-results');
    const bookingId =  bookRow.dataset.bookingId;
    const row = searchResults.querySelector(`.border-row[data-booking-id="${bookingId}"]`);
    const expButton = row.querySelector('.exp-button.collapsed');
    if ( expButton ) {
        expButton.click();
    }
    const bookingDescription = await waitingFor(() => row.querySelector('.booking-description'), 100, 150);
    const serviceTrs = $$('table.services > tbody > tr' , bookingDescription);
    const [dateStart, dateEnd] = $$('.tour-dates span', bookRow).map(date => getText(date));
    const region = getNodeProperty(bookRow.querySelector('.tour-name'), '').replace(/\s*\(.+/, '');
    const transfers = parseService(getServicesRows(serviceTrs, /Трансфер/i));
    const insurance = parseService(getServicesRows(serviceTrs, /Страх/i), dateStart, dateEnd);
    const other = parseService(getServicesRows(serviceTrs, /Доп\. услуги|в.за/i), );
    const country = insurance.length > 0 ? (insurance[0].description.match(/.+\((.+?)\)$/) || [])[1] : null;
    const hotels = getServicesRows(serviceTrs, /Прожив/i).map(arr => parseHotel(arr[0], country, region, arr[2]));
    const flightRow = extractServiceRow(serviceTrs, /Перел/i);

    const flight = getFlight(flightRow);
    const {totalPrice, nettPrice, totalPriceCurrency, nettPriceCurrency, prices} = await getPrice(bookRow);
    let option = {
        hotels,
        flight,
        transfers,
        insurance,
        other,
        dateStart,
        dateEnd,
        nights: hotels.reduce((a, b) => a + parseInt(b.nights), 0),
        country: insurance.length > 0 ? (insurance[0].description.match(/.+\((.+?)\)$/) || [])[1] : null,
        region: "",
        nettPrice,
        nettPriceCurrency,
        prices,
        tourOperatorReference: bookingId,
        price: totalPrice,
        currency: totalPriceCurrency,
        city_from: flight && flight.sectors && flight.sectors[0] ? flight.sectors[0].segments[0].departureCity : 'Нет данных' ,
        operator: window.OPERATOR_NAME,
    };
    return option;
}

function extractPrice(priceText) {
    return parseFloat(priceText.replace(/\s+/, ''));
}

async function getPrice(bookRow) {
    try {
        const btn = bookRow.querySelector('.payment-status a');
        if ( btn ) {
            btn.click();
            const priceTable = await waitingFor(() => { const table = $1('#payments-form-dialog table.prices'); return table && table.clientHeight > 0 ? table : null} , 200, 100);
            if ( !priceTable ) {
                return {};
            }
            await waiting(150)
            let closeBtn =  priceTable.closest('.payment-form-dialog');
            closeBtn = closeBtn ? closeBtn.querySelector('.ui-icon-closethick') : null;
            const trs = $$('tr', priceTable);
            const totalPriceText = getNodeProperty(trs
                .find(tr => getNodeProperty(tr.querySelector('.label'), '').match(/Ціна туру|Цена тура/i))
                .querySelector('.value'), 0);
            const nettPriceText = getNodeProperty(trs
                .find(tr => getNodeProperty(tr.querySelector('.label'), '').match(/для агента/i))
                .querySelector('.value'), 0);
            const totalPrice = extractPrice(totalPriceText);
            const nettPrice = extractPrice(nettPriceText);

            const totalPriceCurrency = mapCurrencyUtil(totalPriceText.replace(/\d+|\s+|,|\./g, ''));
            const nettPriceCurrency = mapCurrencyUtil(nettPriceText.replace(/\d+|\s+|,|\./g, ''));


            const prices = new Prices();
            const totalPriceType = mapPriceType(totalPriceCurrency);
            const nettPriceType = mapPriceType(nettPriceCurrency);

            prices[`${totalPriceType}`].gross = totalPrice;
            prices[`${totalPriceType}`].currency = totalPriceType;

            prices[`${nettPriceType}`].nett = nettPrice;
            prices[`${nettPriceType}`].currency = nettPriceCurrency;

            closeBtn ? closeBtn.click() : null;
            return {
                totalPrice,
                nettPrice,
                totalPriceCurrency,
                nettPriceCurrency,
                prices
            }
        }
        return {};
    } catch(e) {
        return {};
    }
}

function getServicesRows(serviceTrs, regExp) {
    try {
        const mainRow = extractServiceRow(serviceTrs, regExp);
        if  ( !mainRow ) {
            return [];
        }
        return $$('.service-descriptions tbody tr[data-service-name]', mainRow)
            .filter(tr => tr.querySelector('.service-status.confirmed, .service-status.request'))
            .map(tr =>  [getText(tr.querySelector('.description')), getNodeProperty(tr.querySelector('.service-users')), tr]);
    } catch (e) {
        return [];
    }
}

function parseService(textArray, dateStart, dateEnd) {
    return textArray.map(arr => {
        const date = (arr[0].match(getRegexPatterns().date) || [''])[0];
        return new quickBookingValue({
            description: arr[0].replace(date, '').replace(/,\s*$/, ''),
            dateStart,
            dateEnd,
            date,
            count: parseInt(arr[1])
        })
    })
}

function parseHotel(hotelText, country, region, tr) {
    const hotelNodeText = getNodeProperty(tr.querySelector('.hotel-description-link-text'), '');
    const [regionText, dates, room, boardType] = hotelText.replace(hotelNodeText, '').split(/\s*,\s*/);
    const hotelRegion = regionText.match(/\((.*?)\)/);
    const [roomType, accommodation] = room.split("/");
    const [dateStart, dateEnd] = dates.split(/-|—/);
    return {
        dateStart,
        nights: getDistance(dayMonthYearToDate(dateStart), dayMonthYearToDate(dateEnd)).toString(),
        dateEnd,
        hotelName: hotelNodeText,
        roomType,
        accommodation,
        boardType,
        country,
        region: hotelRegion ? hotelRegion[1] : region
    };
}

function extractServiceRow(trs, regExp) {
    return trs.find(tr => getNodeProperty(tr.querySelector('.service-label'), '').match(regExp));
}

function getFlight(flightRow) {
    try {
        const sectorsRows = $$('.service-descriptions tbody tr[data-service-name]', flightRow).filter(tr => tr.querySelector('.service-status.confirmed'));
        const sectors = sectorsRows.map(parseSector);
        return {sectors}
    } catch(e) {
        return null;
    }
}

function parseSector(sector) {
    const descriptions = sector.querySelector('.service-description');
    const descriptionSegments = $$('.description:not(.additional-description)', descriptions);
    const additionalDescriptionSegments = $$('.additional-description', descriptions);
    const segments = descriptionSegments.map((elem, index) =>{
        return {description: getText(elem), additionalDescription: additionalDescriptionSegments[index]};
    }).map(parseSegment);
    return {segments}
}

function parseSegment(segment) {
    const {description, additionalDescription} = segment;
    const [depText, arText] = description.split(/\s+-|—\s+/);
    const depAirport = depText.match(/\((.+?)\)/)[1].split(" ");
    const arAirport = arText.match(/\((.+?)\)/)[1].split(" ");
    return new FlightSegment({
        flightNumber: depText.match(/(.+?),/)[1],
        departureDate: makeYear4Digits(depText.match(/\d{2}\.\d{2}\.\d+/)[0]),
        departureTime: depText.match(/\d{2}:\d{2}/)[0],
        departureCity: depText.match(/,\s*(.+?)\s*\(/)[1],
        departureAirportID: depAirport[0],
        departureTerminal: depAirport[1],
        arrivalDate: makeYear4Digits(arText.match(/\d{2}\.\d{2}\.\d+/)[0]),
        arrivalTime: arText.match(/\d{2}:\d{2}/)[0],
        arrivalCity: arText.match(/\s*(.+?)\s*\(/)[1],
        arrivalAirportID: arAirport[0],
        arrivalTerminal: arAirport[1],
        serviceClass: getNodeProperty(additionalDescription.firstChild),
        baggage: getNodeProperty(additionalDescription.querySelector('span'))
    });
}

async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const services = {
        insurance: tourOptions.insurance,
        transfers: tourOptions.transfers,
        other: tourOptions.other,
        tourOptions,
        nettPrice: tourOptions.nettPrice,
        nettPriceCurrency: tourOptions.nettPriceCurrency,
        tourOperatorReference: tourOptions.tourOperatorReference
    };
    return services;
}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

function getHotelRowByImage(img) {
    return img.closest('tr.booking');
}

async function parsePassengers(button) {
    const bookRow = getHotelRowByImage(button);
    const searchResults = bookRow.closest('.search-results');
    const bookingId = bookRow.dataset.bookingId;
    const row = searchResults.querySelector(`.border-row[data-booking-id="${bookingId}"]`);
    const tourists = querySelectorAll(row, '.tourists tbody tr').filter(quickBookingsFilterCallback);
    let parsedTourists = [];
    for ( const tourist of tourists ) {
         const parsedTourist = await extractPassengerInfo(tourist);
         parsedTourists.push(parsedTourist);
    }
    return parsedTourists;
}


async function extractPassengerInfo(tourist) {
    //const a = tourist.querySelector('a.change-person');
    const a = null;
    if ( a) {
        a.click();
        const touristPanel = await waitingFor(returnPersonPanel, 100, 100);
        if ( touristPanel ) {
            const closeBtn = touristPanel.closest('#changePerson').querySelector('.bottom-bar-cancel-button');
            const passenger = new Passenger(
                getInputsValues(touristPanel, {
                    lastName: "#surname, #customer_LastName, .private-customer-last-name, #change-person-last-name",
                    firstName: "#name, #customer_FirstName, .private-customer-first-name, #change-person-first-name",
                    secondName: "#customer_MiddleName, .private-customer-middle-name",
                    birthday: "#birthdate, #customer_DateOfBirth, .private-customer-date-of-birth, #change-person-birth-date",
                    issueDate: "#passport_where, #customer_DocumentIssue, .private-customer-document-issue-date, #change-person-passport-issue-date",
                    expire: "#passport_due, #change-person-passport-expiration-date",
                    address: "#address, #customer_Address, .private-customer-address, #change-person-address",
                    authority: "#passport_who, #customer_DocumentIssuerName, .private-customer-document-issuer-name, #change-person-passport-issuer",
                    number: "#passport_number, #customer_DocumentNumber, .private-customer-document-number, #change-person-passport-number"
                }));
            passenger.docType = mapDocType(selectedOption(touristPanel.querySelector('#change-person-traveldocumenttype')));
            closeBtn.click();
            await waitingFor(() => null, 100, 3);
            return passenger;
        }
    }
    const passportNumber = getNodeProperty(tourist.querySelector('.tourist-passport span'), '').replace(/\s+/g, '').slice(2);
    const name = getNodeProperty(tourist.querySelector('.full-name a') || tourist.querySelector('.full-name'), '').split(/\s+/);
    if ( name[0].match(/турист/i) ) {
        return null;
    }
    return new Passenger(
        {
            birthday: getNodeProperty(tourist.querySelector('.birth-date')),
            expire: (getNodeProperty(tourist.querySelector('.expiration-date'), '').match(getRegexPatterns().date) || '')[0],
            lastName: name[0],
            firstName: name[1],
            serial: passportNumber[0]+passportNumber[1],
            number: passportNumber.slice(2),
        })
}

function returnPersonPanel() {
    const panel =  document.querySelector('#changePerson .change-person-container table.controls');
    if ( panel && panel.clientHeight > 0 ) {
        return panel;
    }
    return null;
}

function quickBookingsFilterCallback(tr) {
    return tr.clientHeight > 0;
}

function parseClient(button) {
    const bookRow = getHotelRowByImage(button);
    const searchResults = bookRow.closest('.search-results');
    const bookingId = bookRow.dataset.bookingId;
    const row = searchResults.querySelector(`.border-row[data-booking-id="${bookingId}"]`);
    const clientNode = row.querySelector('.booking-private-customer');
    if (!clientNode) {
        return null;
    }
    const client = new Passenger(
        getInputsValues(clientNode, {
            lastName: "input.private-customer-last-name",
            firstName: "input.private-customer-first-name",
            secondName: "input.private-customer-middle-name",
            birthday: "input.private-customer-date-of-birth",
            issueDate: "input.private-customer-document-issue-date",
            address: "textarea.private-customer-address",
            authority: "textarea.private-customer-document-issuer-name",
            authorityCode: "input.private-customer-document-issuer-code",
            email: "input.private-customer-email",
            phone: "input.private-customer-phone",
            docType: "nationalPassport"
        }));
    client.isClient = true;
    client.setDocNumber(getNodeProperty(clientNode.querySelector('input.private-customer-document-number'), '', 'value'));
    return client;
}
