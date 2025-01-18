window.OPERATOR_NAME = "Delfin";
window.showTopHotelsRating = false;
window.qscript = document.createElement("script");
window.qscript.src = chrome.runtime.getURL('data/operators/delfin/inline_script.js');
document.head.append(window.qscript);

const countries = {
    "3229": "Абхазия",
    "3256": "Азербайджан",
    "3259": "Армения",
    "3239": "Беларусь",
    "3240": "Россия",
    "3224": "Россия",
    "1006": "Россия",
    "1004": "Россия",
    "20": "Россия",
    "999": "Россия",
    "1": "Россия",
    "3252": "Киргизия",
    "1003": "Россия",
    "3221": "Россия",
    "3248": "Латвия",
    "3250": "Литва",
    "1001": "Россия",
    "95": "Россия",
    "3235": "Россия",
    "1002": "Россия",
    "5": "Украина",
    "3249": "Эстония",
    "3271": "Узбекистан",
    "3281": "Россия"
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
    const headCell = document.querySelector('.table.dataTable thead tr');
    if ( headCell && !headCell.querySelector('.qq') ) {
        headCell.append(createHeadCell());
    }


    $$( "table.dataTable tbody tr").forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            createCell(tr);
        }
    });

    const claimBtn = document.querySelector('#bodyContainer .btn-primary');
    if ( claimBtn && !document.querySelector('.qq') ) {
        createOrderCell(claimBtn.parentNode);
    }
}

function createCell(tr) {
    const newTd = document.createElement("td");
    const container = createQQContainer();
    const qqBtns = container.querySelector('.qq-box');
    const logo = container.querySelector('img');
    logo.remove();
    newTd.classList.add('qq');
    container.style.justifyContent = 'center';
    qqBtns.style.display = 'none';

    newTd.append(container);
    tr.append(newTd);
}

function createOrderCell(div) {
    const newDiv = document.createElement("div");
    const container = createQQContainer();
    const qqBtns = container.querySelector('.qq-box');
    newDiv.classList.add('qq', 'list-group-item');
    container.style.justifyContent = 'center';
    container.style.maxWidth = '185px';
  //  qqBtns.style.display = 'none';

    newDiv.append(container);
    div.append(newDiv);
}

function createHeadCell() {
    const td = document.createElement('td');
    const container = createQQContainer();
    const logo = container.querySelector('img');
    logo.style.height = "16px";
    td.append(logo);
    td.style.textAlign = 'center';
    td.classList.add('qq')
    container.remove();
    return td;
}

async function createOption(img) {
    const tr = getHotelRowByImage(img) || document;
    const bookNumberElem = tr.querySelector('.ord-lab a') || tr.querySelector('.tabbable li a');
    const bookNumber = getNodeProperty(bookNumberElem, '', 'textContent').replace('№', '').trim();
    let book;
    if ( bookNumber  && img.classList.contains('qq-export-button')) {
        img.setAttribute('disabled', 'disabled');
        img.textContent = 'Загрузка...';
        book = await fetchDelfinBook(bookNumber);
    } else {
        book = JSON.parse(sessionStorage.getItem('order'))
    }
    if ( !book ) {
        book = await fetchTimeout(20000, fetch("https://www.delfin-tour.ru/cabinet/api/Orders/Calculate", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json;charset=UTF-8"
            },
            "body": JSON.stringify(requestFromQueryString()),
            "method": "POST"
        })).then(resp => resp.json()).catch(console.log);
    }
    const entry = book.entry || book.item1 ||book;
    const {services, cost, request, residence} = entry;


    if (img.classList.contains('qq-export-button')  ) {
        img.removeAttribute('disabled');
        img.textContent = 'Быстрая Заявка в CRM';
    }

    img.setAttribute('passengers', JSON.stringify(request.guests || []));

    let hotels = services.filter(svc => svc.type.case.match(/Hotel/))
        .map(extractHotel);

    const price = cost.brutto + (cost.fee || 0);
    const nettPrice = cost.brutto;
    const prices = new Prices({
        nationalGrossPrice: price,
        nationalNettPrice: nettPrice,
        nationalCurrency: 'RUB'
    });


    const other = services.filter(svc => !svc.type.case.match(/Hotel/) && !svc.name.match(/Штраф/))
        .map(parseBookingValue);

    let option = {
        ...hotels[0],
        hotels,
        other,
        checkinDt: hotels[0].dateStart,
        dateStart: hotels[0].dateStart,
        dateEnd: hotels[0].dateEnd,
        nights: hotels[0].nights,
        currency: 'RUB',
        prices,
        price: prices.inNationalCurrency.gross,
        operator: window.OPERATOR_NAME,
        city_from: 'Нет данных',
        hotelName: hotels[0].hotelName,
        tourOperatorReference: bookNumber
    };
    return option;
}

function parseBookingValue(svc) {
    return new quickBookingValue({
        description: svc.name,
        dateStart: svc.startDate,
        nettPrice: svc.cost.netto,
        nettCurrency: 'RUB',
        price: svc.cost.brutto,
        currency: 'RUB',
        totalPrice: svc.cost.brutto,
        totalCurrency: 'RUB'
    });
}

function extractHotel(hotel)  {
    const field = hotel.type.fields[0];
    return {
        dateStart: hotel.startDate,
        dateEnd: addDaysToStringDate(hotel.startDate, hotel.key.duration),
        nights: hotel.key.duration.toString(),
        hotelName: field.hotel.name,
        roomType: field.roomCat.name,
        accommodation: field.room.name,
        boardType: field.pansion.name,
        region: field.hotel.address,
        country: countries[field.hotel.direction]
    }
}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const services = {
        insurance: tourOptions.insurance,
        transfers: tourOptions.transfers,
        other: tourOptions.other,
        nettPrice: tourOptions.nettPrice,
        nettPriceCurrency: tourOptions.nettPriceCurrency,
        tourOptions,
        tourOperatorReference: tourOptions.tourOperatorReference,
        notes: ''
    };
    return services;
}

function parsePassengers(button) {
    try {
        if (document.querySelector('[data-field="surName"]'))  {
            return parsePassengersFromDOM(button);
        }
        const tourists = Object.values(JSON.parse(button.getAttribute('passengers')));
        return tourists.map(tourist => {
            const birthday = tourist.birthday;
            return new Passenger({
                sex: tourist.isMale ? "1" : "2",
                lastName: tourist.cyrilic.surName,
                firstName: tourist.cyrilic.name,
                secondName: tourist.cyrilic.patronymic,
                serial: tourist.documentSerial,
                number: tourist.documentNumber,
                birthday,
                nationality: tourist.citizenship,
                docType: "nationalPassport"
            })
        })
    } catch (e) {
        console.log(e)
        return [];
    }

}

function parsePassengersFromDOM() {
    const tourists = $$('[data-field="surName"]').map( input => input.closest('tr') );
    return tourists.map(tourist => {
        const sexInput = $1('input[data-field="isMale"]:checked', tourist);
        const passenger = new Passenger(getInputsValues(tourist, {
            lastName: '[data-field="surName"]',
            firstName: '[data-field="name"]',
            secondName: '[data-field="patronymic"]',
            birthday: '[data-field="birthdate"]',
            serial: '[data-field="documentSerial"]',
            number: '[data-field="documentNumber"]'
        }))
        passenger.sex =  sexInput && sexInput.value === '0' ? '2' : '1';
        passenger.type = parsePassengerType(tourist)
        return passenger;
    })
}

function parsePassengerType(tr) {
    const caption = getText(tr);
    if ( caption.match(/Ребенок/i) ) {
        return 'child';
    }
    if ( caption.match(/младенец/i) ) {
        return 'infant';
    }
    return 'adult';
}


function getHotelRowByImage(img) {
    return img.closest('tr');
}

async function fetchDelfinBook(bookNumber) {
    return await fetchTimeout(20000, fetch("https://www.delfin-tour.ru/cabinet/api/Orders/DetailedOrder", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json;charset=UTF-8"
        },
        "body": `"${bookNumber}"`,
        "method": "POST"
    })).then(resp => resp.json()).catch(console.log);
}


function requestFromQueryString() {
   const n = queryString();
   const token = (document.cookie.match(/token=(.+?);/) || document.cookie.match(/token=(.+?)$/))[1];
   const r = JSON.parse(decodeURIComponent(n.beds));
   return {
        priceKey: {
            hotel: parseInt(n.h),
            tour: parseInt(n.t),
            pansion: parseInt(n.p),
            room: parseInt(n.r),
            roomCat: parseInt(n.rc),
            date: n.d,
            nights: parseInt(n.n),
            beds: r
        },
        customer: userCreate("IndividualBuyer", {
            fullName: "",
            phone: "",
            email: "",
            address: ""
        }),
        access: userCreate("Session", token),
        adults: parseInt(n.adts),
        guests: r.map(mapGuests),
        childAges: JSON.parse(decodeURIComponent(n.ages)),
        addedServices: [],
        removedServices: [],
        provider: defined(n.sp) ? parseFloat(n.sp) : null,
        departureVenue: {
            flight: "",
            time: "",
            vagen: ""
        },
        arrivalVenue: {
            flight: "",
            time: "",
            vagen: ""
        },
        related: defined(n.oref) ? [tupl(n.oref, 3)] : []
    }
}

Array.prototype.fold = function (n, t) {
    for (var e = 0, r = this.length; e < r; e++)
        n = t(n, this[e], e);
    return n
}

function queryString () {
    return location.search.substring(1).split("&").concat(location.hash.substring(1).split("&")).fold({}, (function (n, t) {
            let e = t.split("=");
            return 2 === e.length && (n[e[0]] = e[1]),
                n
        }
    ))
}


function defined(n) {
    return null != n && null != n
}

function tupl() {
    for (var n = {}, t = 0; t < 8; t++) {
        var e = arguments[t];
        if (null == e)
            break;
        n["item" + (t + 1).toString()] = e
    }
    return n
}

function userCreate() {
    for (var n = arguments.length - 1, t = new Array(n), e = 0; e < n; e++)
        t[e] = arguments[e + 1];
    return {
        case: arguments[0],
        fields: t
    }
}

function mapGuests(e) {
    return {
        isMale: !1,
        cyrilic: {
            name: "",
            surName: "",
            patronymic: ""
        },
        latin: {
            name: null,
            surName: null,
            patronymic: null
        },
        birthday: null,
        documentNumber: "",
        documentSerial: "",
        citizenship: null,
        phone: null,
        id: 0
    }
}
