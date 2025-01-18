window.OPERATOR_NAME = "Онлайн Экспресс";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);
window.FLIGHT_RESULTS = null;
window.FLIGHT_SEARCH_ACTIVE = false;


function initializeSearchCriteria() {
    if ( !localStorage.getItem(crc32(getTourId()) + '_flight') ) {
        getSearchResult(localStorage.getItem(crc32(getTourId())))
    }
    return null;
}

function getSearchButton() {
    return null
}

function getTourId() {
    return location.href.split(/\?|&/).find(str => str.match('recommendationId')).replace(/.+?=/, '');
}

function getSearchId() {
    return location.href.split(/\?|&/).find(str => str.match('searchId')).replace(/.+?=/, '');
}

function injectData() {
    $$(".avia-flight .avia-flight_side").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const buttonsDiv = createQQContainer();
            div.append(buttonsDiv);
        }
    });
    if ( window.FLIGHT_RESULTS ) {
        $$('.qq-loading, .qq-not-active').forEach(elem => {
            elem.classList.remove('qq-loading', 'qq-not-active');

        })
    }
}

async function createOption(img) {
    try {
        const tourId = getTourId();
        const priceText = getNodeData('.aside_price', document, 'innerText').split(/\n/).filter(s => s);
        const price = extractIntFromStr(priceText[0].replace(/\D+/g, ''));
        const nettPrice = priceText[1] ? parseFloat(priceText[1].split('+')[0].replace(/\D+/, '')) : 0;
        const currency = mapCurrencyUtil(priceText[0].replace(/Итого:/ig, '').replace(/\d+|\s+/g, ''));
        if (tourId && localStorage.getItem(crc32(tourId) + '_flight')) {
            const option = JSON.parse(localStorage.getItem(crc32(getTourId()) + '_flight'));
            option.price = price;
            option.nettPrice = nettPrice;
            option.currency = currency;
            return option;
        }

        const searchId = localStorage.getItem(crc32(getTourId())) || getSearchId();
        if (searchId) {
            const tour = getHotelRowByImage(img);
            const tourId = getNodeData('.avia-flight_booking a', tour, 'href').split(/\?|&/).find(str => str.match('recommendationId')).replace(/.+?=/, '');
            const flightList = window.FLIGHT_RESULTS;
            const flightItem = flightList.find(item => item.recommendationId === tourId)
            const flight = getFlight(flightItem);
            const option = createOptionFromFlight(flight);
            option.price = price;
            option.nettPrice = nettPrice;
            option.currency = currency;
            return option;
        }
    } catch (e) {
        console.log(e);
        return await alternateOption();
    }


}

async function alternateOption() {
    const searchId = getParameterByName('searchId')
    const recommendationId = getParameterByName('recommendationId')
    const result = await fetch(`https://${location.hostname}/search/aviatickets/getOfferInfo?searchId=${searchId}&recommendationId=${recommendationId}`).then(r => r.json());
    const priceText = getNodeData('.aside_price', document, 'innerText').split(/\n/).filter(s => s);
    const price = extractIntFromStr(priceText[0].replace(/\D+/g, ''));
    const nettPrice = priceText[1] ? parseFloat(priceText[1].split('+')[0].replace(/\D+/, '')) : 0;
    const currency = mapCurrencyUtil(priceText[0].replace(/Итого:/ig, '').replace(/\d+|\s+/g, ''));
    const flight = getFlight({directions: result.flights})
    const option = createOptionFromFlight(flight);
    option.price = price;
    option.nettPrice = nettPrice;
    option.currency = currency;
    return option;
}

async function createQuickBookingOption(button) {
    const tourOptions = await createOption();
    const prices = new Prices();
    const grossPriceType = mapPriceType(tourOptions.currency);

    prices[`${grossPriceType}`].gross = tourOptions.price;
    prices[`${grossPriceType}`].nett = tourOptions.nettPrice;
    prices[`${grossPriceType}`].currency = tourOptions.currency;

    return {
        tourOptions,
        prices
    };
}

function parsePassengers() {
    const passengers = $$('.avia-booking.tourist').map(extractPassengerInfo);
    return passengers;
}

function extractPassengerInfo(panel) {
    const inputs = getPassengerInputs(panel);
    return new Passenger( {
        birthday: inputs.birthday.value,
        expire: inputs.expire.value,
        lastName: inputs.surname.value,
        firstName: inputs.name.value,
        nationality: selectedOption(inputs.nationality),
        serial: inputs.serial.value.slice(0, 2),
        number: inputs.serial.value.slice(2),
        type: mapPassengerType(panel)
    });
}

function mapPassengerType(panel) {
   const header = getNodeData('.fieldset-header', panel, 'textContent', '');
   if ( header.match(/до 12-ти лет/i) ) {
       return 'child';
   }
    if ( header.match(/ДО 2-Х ЛЕТ/i) ) {
        return 'infant';
    }
    return 'adult';
}

//-------ORDER DATA

function injectQuickReservationData(selInsert, func) {
    $$('.avia-booking.tourist').forEach((table) => {
        if ( !table.querySelector(selInsert) ) {
            table.append(func({
                legendStyle: 'font-size: 12px;margin-bottom:3px;',
                style: 'margin:10px;'
            }));
        }
    });
}

function pasteOrderData(touristNode, data, passport, errors) {
    const sex = $first(mapSex(data.sex), touristNode);
    if ( sex ) {
        sex.click();
    }

    const inputs = getPassengerInputs(touristNode);

    setInputValues(touristNode, [
        inputs.surname, transliterateQuickReservationObject(passport.surname),
        inputs.name, transliterateQuickReservationObject(passport.name),
        inputs.serial, {
                value: passport.serial.value + passport.number.value, caption: 'Номер паспорта'
            },
        inputs.mobile, data.phones.mobile,
        inputs.email, data.email
        ], errors, ["input","change", "blur"], ['focus'], true
    );

    setInputValues(touristNode, [
        inputs.expire, customDateToFullString(passport.expire)
        ], errors, ["input","change", "blur"], ['focus'], true
    );
    setInputValues(touristNode, [
        inputs.birthday, customDateToFullString(data.birthday)
        ], errors, ["input","change", "blur"], ['focus'], true
    );

    setSelectIndex(touristNode, [
        inputs.nationality, data.nationality
    ], errors)
}

function getPassengerRowBySelect(select) {
    return select.closest('.tourist');
}

function mapSex(sex) {
    if ( !sex ) {
        return null;
    }
    switch ( sex.value ) {
        case "1" :
            return ".ba-gender-field__label--position--left";
        case "2" :
            return "ba-gender-field__label--position--right";
        default  :
            return null;
    }
}

function getPassengerInputs(touristNode) {
    const formGroups = $$('.form-group', touristNode);
    const getInputFromGroups = (caption) => {
        const group = formGroups.find(div => {
            const label = getNodeData('label', div, 'textContent', '');
            return !!label.match(caption)
        })
        if ( group ) {
            return $1('input, select', group);
        }
    }
    return {
        surname: getInputFromGroups(/Фамилия/i),
        name: getInputFromGroups(/Имя/i),
        serial: getInputFromGroups(/Номер документа/i),
        mobile: getInputFromGroups(/Номер телефона /i),
        expire: getInputFromGroups(/Годен до/i),
        birthday: getInputFromGroups(/Дата рождения/i),
        nationality: getInputFromGroups(/Гражданство/i),
        email: getInputFromGroups(/E-mail/i)
    }
}
