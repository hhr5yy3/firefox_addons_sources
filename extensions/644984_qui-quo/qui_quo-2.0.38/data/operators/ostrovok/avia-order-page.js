window.OPERATOR_NAME = "b2b.ostrovok.ru";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const priceNode = $1('[class*="TotalPrice_tota"]');
    if ( priceNode && !$1('.qq') ) {
        priceNode.after(qqBtns())
    }
}

async function createOption(img) {
    const flight = await getFlight();
    const option = createOptionFromFlight(flight)
    const price = getNodeData('[class*="ClientPrice_amount"]') || getNodeData('[class*="TotalPrice_totalSum"]')
    option.price = extractIntFromStr(price.replace(/\D+/, ''))
    option.currency = mapCurrencyUtil(price.replace(/\s+|\d+|\./g, ''))

    return option;
}

async function getFlight() {
    const sectors = await $$('[class*="BookingWay_wrapper"]').asyncMap(parseSector);
    return {sectors};
}

async function parseSector(node) {
    let detailWrapper = $1('[class*="BookingWay_detailsWrapper"]', node);
    if ( !detailWrapper ) {
        const collapseButton = $1('button[class*="BookingWay_collapseButton"]', node);
        await waiting(50);
        collapseButton.click();
        await waiting(50);
        detailWrapper = $1('[class*="BookingWay_detailsWrapper"]', node);
    }
    const segments = $$('[class*="RouteDetailsSegment_container"]',detailWrapper).map(parseSegment);
    return {segments}
}

function parseSegment(segmentNode) {
    const departureRow = $1('[class*="segmentRow_start"]',segmentNode);
    const arrivalRow = $1('[class*="segmentRow_end"]', segmentNode);
    const [flightNumber, plane, serviceClass] =
        $$('[class*="RouteDetailsSegment_info"]', segmentNode).extractNodesText().join('・').split('・')
    return new FlightSegment({
        flightNumber,
        plane,
        departureDate: dateFromDayAndMonthName(...getNodeData('[data-testid="departure_date"]', departureRow).split(/\s+/)),
        departureTime: getNodeData('[data-testid="departure_time"]', departureRow),
        departureCity: getNodeData('[data-testid="departure_cityName"]', departureRow),
        departureAirport: getNodeData('[data-testid="departure_airportName"]', departureRow),
        departureAirportID: getNodeData('[data-testid="departure_airportCode"]', departureRow),
        departureTerminal: getNodeData('[data-testid="departure_terminal"]', departureRow),
        serviceClass,
        arrivalDate: dateFromDayAndMonthName(...getNodeData('[data-testid="arrival_date"]', arrivalRow).split(/\s+/)),
        arrivalTime: getNodeData('[data-testid="arrival_time"]', arrivalRow),
        arrivalCity: getNodeData('[data-testid="arrival_cityName"]', arrivalRow),
        arrivalAirport: getNodeData('[data-testid="arrival_airportName"]', arrivalRow),
        arrivalAirportID: getNodeData('[data-testid="arrival_airportCode"]', arrivalRow),
        arrivalTerminal: getNodeData('[data-testid="arrival_terminal"]', arrivalRow),
    })
}

function getHotelRowByImage(img) {
    return document;
}

//-----------------------------------------------quickBooking Export---------------------------------//

function injectQuickReservationData(selInsert, func) {
    $$('[data-testid="bookingPassenger"]').forEach((form) => {
        if (!form.querySelector(selInsert)) {
            form.append(
                func({
                    style: 'margin-top: 12px;'
                })
            );
        }
    });
}

/**
 * @param {Record<caption: string, value: string | Record<string, string>>[]} data
 * @returns 'Муж' | 'Жен' | undefined
 */
function _getSex(data) {
    let sex = undefined;

    if (data.sex && data.sex.value) {
        switch (data.sex.value) {
            case '1':
                return 'Муж';
            case '2':
                return 'Жен';
        }
    }
    // if (data.title && data.title.value) {
    //     switch (data.title.value) {
    //         case 'Mr':
    //             return 'Муж';
    //         case 'Mrs':
    //             return 'Жен';
    //     }
    // }
    return sex;
}

async function pasteOrderData(form, data, passport, errors) {
    setInputValues(form, [
        $1('[id*="citizenship"]', form),
        mapNationality(data.nationality)
    ], errors, 'blur', 'focus', true);

    $$({sel: 'span[class*="Option_label"]', searchString: data.nationality.value}).forEach(elem => elem.click())

    await waiting(150);

    const dataArr = [
        $1('[name*="last_name"]', form),
        passport.surname,
        $1('[name*="first_name"]', form),
        passport.name
    ];
    dataArr.push.apply(dataArr, [
        $1('[name*="doc_num"]', form),
        passport.fullNumber
    ]);




    let input;

    if ((input = $1('[name*="middle_name"]', form))) {
        dataArr.push.apply(dataArr, [input, passport.secondName]);
        input = undefined;
    }

    dataArr.push.apply(dataArr, [$1('[name*="birthday"]', form), customDateToFullString(data.birthday)]);

    const sex = _getSex(data);
    if (sex) {
        const inputsRadios = $$('[class*="ButtonRadio_button"]', form);
        const sexRadio = inputsRadios.find((e) => getText(e) === sex);
        if (sexRadio) {
            sexRadio.click();
        } else {
            dataArr.push.apply(dataArr, [{}, data.sex]);
        }
    } else {
        dataArr.push.apply(dataArr, [{}, data.sex]);
    }



    if ((input = $1('[name*="doc_expire_date"]', form))) {
        dataArr.push.apply(dataArr, [input, customDateToFullString(passport.expire)]);
        input = undefined;
    }

    if ((input = $1('[name*="phone"]', form))) {
        dataArr.push.apply(dataArr, [input, data.phones.mobile]);
        input = undefined;
    }

    if ((input = $1('[name*="email"]', form))) {
        dataArr.push.apply(dataArr, [input, data.email]);
        input = undefined;
    }

    setInputValues(form, dataArr, errors, 'blur', 'focus', true);
}

function getPassengerRowBySelect(select) {
    return select.closest('[data-testid="bookingPassenger"]');
}

function mapNationality(nationality) {
    if ( nationality.value.match(/росс/i) ) {
        nationality.value = 'Российская Федерация'
    }
    return nationality;
}
