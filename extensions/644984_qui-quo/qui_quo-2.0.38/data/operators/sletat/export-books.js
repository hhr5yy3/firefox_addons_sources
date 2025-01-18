window.OPERATOR_NAME = "sletat.ru";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const headerRow = $1('tr[id*="ClaimsGridView_DXHeadersRow"]');
    if ( initParams && initParams.hideQuickBookingTutorial === true ) {
        return true;
    }
    if ( headerRow && !$1('.qq', headerRow) ) {
        const th = document.createElement('td');
        th.classList.add('qq', 'dxgvHeader_TourOfficeBlue', 'touroffice-header');
        th.insertAdjacentHTML('beforeend', `<img src="https://${window.AGENCY_DOMAIN}/landing/eshill/i/logo.svg" style="height: 12px;">`)
        headerRow.append(th);
        const divSearch = $1('div[style*="1200px"]');
        if ( divSearch ) {
            divSearch.style.width = '1345px';
        }
    }

    $$('tr[id*="ClaimsGridView_DXDataRow"]').forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            const td = document.createElement('td');
            const {container, exportButton} = createQuickBookingContainer();
            const img = container.querySelector('img');
            const addBtns = container.querySelector('.qq-box');

            exportButton.style.cssText = `
                                        padding-right: 4px;
                                        background: none;
                                        border: none;
                                        padding: 0;
                                        margin: 0;
                                        color: #007bff;
                                        text-decoration: underline;
                                        cursor: pointer;
                                        font: inherit;
                                        text-wrap: auto;`

            container.style.minWidth = '74px';
            container.style.width = '74px';
            img.remove();
            addBtns.style.display = 'none';
            td.style.whiteSpace = 'nowrap';
            td.classList.add('qq', 'dxgv');
            container.style.zoom = '0.9'

            td.append(container)
            tr.append(td);
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const claimId = tour.dataset.claimId;
    const services = await fetch(`https://agent.sletat.ru/ClaimNextGen/GetClaimServices?claimId=${claimId}`, {
        "method": "GET",
    }).then(r => r.json())

    const claimInfo = await fetch(`https://agent.sletat.ru/ClaimNextGen/GetClaimTourInfo?claimId=${claimId}`, {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
        },
        "body": null,
        "method": "GET",
    }).then(r => r.json());

    const country = claimInfo.ResortName;

    const parser = new DOMParser();
    const servicesNodes = await services.Services.asyncMap(async svc => {
        const text = await fetch("https://agent.sletat.ru/ClaimPartSubClaimService/WindowServiceCallback", {
            "headers": {
                "accept": "text/html, */*; q=0.01",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            "body": `DXCallbackName=WindowService&__DXCallbackArgument=c0%3A-1%3B%5Bobject+Object%5D&TourServiceId=${svc.ServiceId}&windowIndex=-1`,
            "method": "POST",
        }).then(r => r.text());
        const node = parser.parseFromString(text, "text/html");
        return {node: node.body, "type": svc.ServiceType, obj: svc};

    });

    const hotels = servicesNodes.filter(svc => svc.type === 5).map(svc => parseHotel(svc, country));
    const transfers = servicesNodes.filter(svc => svc.type === 3).flatMap(svc => parseTransfer(svc));
    const insurance = servicesNodes.filter(svc => svc.type === 2).map(svc => parseInsurance(svc));

    const flight = getFlight(servicesNodes.filter(svc => svc.type === 1));

    const financialInfo = await fetch(`https://agent.sletat.ru/ClaimNextGen/GetClaimFinancialInfo?claimId=${claimId}`, {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
        },
        "method": "GET",
    }).then(r => r.json());
    const prices = new Prices();

    prices.nationalGrossPrice = financialInfo.WithCustomer.CustomerPriceInPaymentCurrency;
    prices.nationalNettPrice = financialInfo.PrimeCost.TotalPriceInPaymentCurrency;
    prices.nationalCurrency = financialInfo.WithCustomer.CustomerPriceInPaymentCurrencyText.replace(/\d+|\s+|,/g, '');
    if ( financialInfo.WithCustomer.PaymentCurrency !== financialInfo.WithCustomer.PaymentCurrency ) {
        prices.foreignGrossPrice = financialInfo.WithCustomer.CustomerPaidInTourCurrency;
        prices.foreignNettPrice = financialInfo.PrimeCost.TotalPriceInTourCurrency;
        prices.foreignCurrency = financialInfo.PrimeCost.TourPriceInTourCurrencyText.replace(/\d+|\s+|,/g, '');
    }
    prices.paidStatus = financialInfo.PaymentStatus === 2 ? window.PAID_STASTUSES.paid : window.PAID_STASTUSES.unknown;
    if ( financialInfo.WithCustomer.Invoices && financialInfo.WithCustomer.Invoices.length > 0 ) {
        financialInfo.WithCustomer.Invoices.forEach(invoice => {
            if ( invoice.Payments ) {
                invoice.Payments.forEach(payment => {
                    prices.addNationalPayment({
                        date: new Date(payment.TransactionDate).toLocaleDateString('ru'),
                        time: new Date(payment.TransactionDate).toLocaleTimeString('ru'),
                        amount: payment.AmountInPaymentCurrency
                    });
                    if ( financialInfo.WithCustomer.PaymentCurrency !== financialInfo.WithCustomer.PaymentCurrency ) {
                        prices.addForeignPayment({
                            date: new Date(payment.TransactionDate).toLocaleDateString('ru'),
                            time: new Date(payment.TransactionDate).toLocaleTimeString('ru'),
                            amount: payment.AmountInTourCurrency
                        });
                    }
                })
            }
        })
    }


    const cachedPassengers = await fetch(`https://agent.sletat.ru/ClaimNextGen/GetClaimTourists?claimId=${claimId}`, {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
        },
        "method": "GET",
    }).then(r => r.json());

    let option = {
        dateStart: claimInfo.TourDateBegin,
        dateEnd: claimInfo.TourDateEnd,
        checkinDt: claimInfo.TourDateBegin,
        nights: "2",
        hotelName: "",
        hotel_desc: "",
        href: "",
        country,
        region: "",
        roomType: "",
        boardType: "",
        price: "",
        currency: "",
        city_from: claimInfo.DepartureFromTown,
        operator: claimInfo.SletatTourOperator,
        thumbnail: "",
        occupancy: "",
        excursion: "",
        tourOperatorReference: claimInfo.TourOperatorNumber,
        flight,
        hotels,
        transfers,
        insurance,
        prices,
        cachedPassengers
    };
    Object.assign(option, hotels[0]);
    return option;
}

function getFlight(sectorsNodes) {
    try {
        const sectors = sectorsNodes.map(parseSegment);
        return {sectors}
    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSegment(seg) {
    const node = seg.node;
    const [departureAirportID, departureAirport, departureCity] = getNodeData('[name="FromIata"]', node, 'value').split(/,*\s+/);
    const [arrivalAirportID, arrivalAirport, arrivalCity] = getNodeData('[name="ToIata"]', node, 'value').split(/,*\s+/);
    const [departureDate, departureTime] = getNodeData('[name="DateStart"]', node, 'value').split(/\s+/)
    const [arrivalDate, arrivalTime] = getNodeData('[name="DateEnd"]', node, 'value').split(/\s+/)

    return {
        segments: [new FlightSegment({
            flightNumber: getNodeData('[name="FlightNumber"]', node, 'value'),
            airline: getNodeData('[name="AircompanyId"]', node, 'value'),
            departureDate,
            departureTime,
            departureCity,
            departureAirport,
            departureAirportID,
            departureTerminal: "",
            serviceClass: getNodeData('[name="Class"]', node, 'value'),
            arrivalDate,
            arrivalTime,
            arrivalCity,
            arrivalAirport,
            arrivalAirportID,
        })]
    }
}

function parseHotel(svc, country) {
    const node = svc.node;
    return {
        dateStart: getNodeData('[name="DateStart"]', node, 'value', '').split(/\s+/)[0],
        dateEnd: getNodeData('[name="DateEnd"]', node, 'value', '').split(/\s+/)[0],
        hotelName: getNodeData('[name="HotelId"]', node, 'value'),
        country: country,
        region: getNodeData('[name="ResortId"]', node, 'value'),
        roomType: getNodeData('[name="CustomRoomName"]', node, 'value') || getNodeData('[name="RoomId"]', node, 'value'),
        accommodation: getNodeData('[name="AccomodationRoomTypeId"]', node, 'value'),
        boardType: getNodeData('[name="MealId"]', node, 'value'),
    }
}

function parseTransfer(svc) {
    const node = svc.node;
    const dateStart = getNodeData('[name="DateStart"]', node, 'value', '').split(/\s+/)[0];
    const dateEnd = getNodeData('[name="DateEnd"]', node, 'value', '').split(/\s+/)[0];
    const description = [getNodeData('[name="Name"]', node, 'value', ''),
        getNodeData('[name="TransferType"]', node, 'value', ''),
        getNodeData('[name="TransportCategory"]', node, 'value', '')].filter(d => d).join(', ')
    return [new quickBookingValue({
        description,
        date: dateStart,
        caption: "Трансфер"
    }), new quickBookingValue({
        description,
        date: dateEnd,
        caption: "Трансфер"
    })]
}

function parseInsurance(svc) {
    const node = svc.node;
    const dateStart = getNodeData('[name="DateStart"]', node, 'value', '').split(/\s+/)[0];
    const dateEnd = getNodeData('[name="DateEnd"]', node, 'value', '').split(/\s+/)[0];
    const description = [getNodeData('[name="Name"]', node, 'value', ''),
        getNodeData('[name="InsuranceType"]', node, 'value', '')].filter(d => d).join(', ')
    return new quickBookingValue({
        description,
        dateStart,
        dateEnd,
        caption: "Страховка"
    })
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const {insurance, transfers, prices, cachedPassengers} = tourOptions;
    const services = {
        insurance,
        transfers,
        tourOptions,
        prices,
        cachedPassengers
    };
    return services;
}

function parseService(svc) {
    return new quickBookingValue({})
}

function parsePassengers(_, cachedPassengers) {
    return cachedPassengers.Tourists.map(extractPassengerInfo);
}

function extractPassengerInfo(tourist) {
    const isForeignPassport = !(tourist.SeriesAndNumberPassportAboard || '').trim();
    const [serial, number] = (isForeignPassport ? tourist.SeriesAndNumberPassportNational : tourist.SeriesAndNumberPassportAboard).split(/\s+/)
    const passenger = new Passenger({
        birthday: tourist.Birthday,
        expire: tourist.PassportExpirationDateMin ? new Date(tourist.PassportExpirationDateMin).toLocaleString('ru') : null,
        lastName: isForeignPassport ? tourist.FirstNameNational : tourist.FirstNameLat,
        firstName: isForeignPassport ? tourist.LastNameNational : tourist.LastNameLat,
        serial,
        number,
        sex: mapSex(tourist.Sex)
    });
    return passenger;
}

function mapSex(caption) {
    if ( caption === 'М' ) {
        return '1';
    }
    if ( caption === 'Ж' ) {
        return '2';
    }
}
