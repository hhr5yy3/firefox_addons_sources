window.OPERATOR_NAME = 'Form for Dominican Republic';

function injectQuickReservationData(selInsert, func) {
    const input = $$('#IsArrival').find(inp => inp.checked);
    if ( input ) {
        const isArrival = input.value;
        sessionStorage.setItem('isArrival', isArrival);
    }
    if ( window.location.href.match(/TravelTicket\/StepTwo|PublicHealths/) ) {
        const input = document.querySelector('[name="MigratoryInformation.Names"], #form-1 #PhoneNumber');
        if (input) {
            const form = input.closest('form');
            if (form && !form.querySelector(selInsert)) {
                form.prepend(func({
                    addTag: "div"
                }));
            }
        }
    }
}



async function pasteOrderData(div, data, passport, errors) {
    const isArrival = sessionStorage.getItem('isArrival') !== 'False';
    const daysOfStaying = getDistance(customDateToFullString(data.tourStartDate).value, customDateToFullString(data.tourEndDate).value);
    const flightNumber = isArrival ? {value: data.entryFormData.aviaFlightNumber.value.replace(/\s+/, ''), caption: 'Номер рейса' }: getReturnFlight(data.flights)
    setInputValues(div, [
        '[name="MigratoryInformation.Names"]', passport.name,
        '[name="MigratoryInformation.LastNames"]', passport.surname,
        '[name="MigratoryInformation.BirthDate"]', {
            value: Object.values(data.birthday.value).reverse().join('-'),
            caption: data.birthday.caption
        },
        '[name="MigratoryInformation.PassportNumber"]', {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport Number'
        },
        '[name="MigratoryInformation.PassportConfirmation"]', {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport Number'
        },
        '[name="MigratoryInformation.Email"]', data.email,
        '#PhoneNumber', {
            value: (data.phones.mobile.value || data.phones.main.value || '').replace(/\D+/g, ''),
            caption: data.phones.mobile.caption
        },
        '[name="MigratoryInformation.DaysOfStaying"]', {
            value: daysOfStaying,
            caption: 'DAYS OF STAYING'
        },
        '[name="MigratoryInformation.EmbarcationDate"]', {
            value: Object.values(isArrival ? (getFlightDate(data, isArrival) || data.hotel.dateStart.value) : (getFlightDate(data, isArrival) || data.hotel.dateEnd.value)).reverse().join('-'),
            caption: data.hotel.dateStart.caption
        },
        '[name="MigratoryInformation.EmbarcationFlightNumber"]', flightNumber,
        '[name="MigratoryInformation.ConfirmationNumber"]', flightNumber
    ], errors, ['click', 'focus', 'input', 'keyup', 'blur']);
    setSelectIndexCustom(div, [
        'select[name="MigratoryInformation.Gender"]', {value: mapSex(data.sex), caption: data.sex.caption},
        'select[name="MigratoryInformation.BirthPlace"]', data.nationalityEng,
        'select[name="MigratoryInformation.Nationality"]', data.nationalityEng,
    ], errors)
}

function getFlightDate(data, isArrival) {
    try {
        const [day, month, year] = isArrival ? data.flights.value[0].arrival.split('.') :lastElement(data.flights.value).departureDate.split('.')
        return {day, month, year};
    } catch(e) {
        return null;
    }
}

function getReturnFlight(flights) {
    try {
        if (!flights || !flights.value || flights.value.length === 0) {
            return {
                caption: 'Номер рейса',
                value: ''
            }
        }

        if (flights.value.length === 2) {
            return {
                caption: 'Номер рейса',
                value: flights.value[1].flightNumber.replace(/\s+/, '')
            }
        }

        if (flights.value.length === 4) {
            return {
                caption: 'Номер рейса',
                value: flights.value[2].flightNumber.replace(/\s+/, '')
            }
        }

        return {
            caption: 'Номер рейса',
            value: flights.value[lastElement(flights.value)].flightNumber.replace(/\s+/, '')
        }
    }
    catch(e) {
       return {caption: 'Номер рейса', value: null};
    }
}


function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return 'MASCULINE';
        case "2" :
            return 'FEMENINE';
    }
    return 'OTHERS';
}

function getPassengerRowBySelect(select) {
    return select.closest('form');
}

function setSelectIndexCustom(node, selectArray, errors) {
    if ( node && selectArray && selectArray.length > 0 ) {
        for ( let i = 0; i < selectArray.length; i += 2 ) {
            const prepareNode = typeof (selectArray[i]) === "string" ? node.querySelector(selectArray[i]) : selectArray[i];
            if ( !prepareNode ) {
                return errors;
            }
            const data = selectArray[i + 1];
            const index = findSelectIndexCustom(prepareNode, data.value);
            if ( index !== -1 && data.value ) {
                prepareNode.selectedIndex = index;
                simulateEvent(prepareNode, "change");
            } else {
                errors.push(data.caption);
            }
        }
        return errors;
    }
}

function findSelectIndexCustom(select, caption) {
    const options = querySelectorAll(select, "option");
    const opt = find(options, caption, (text, caption)=> !!text.match(new RegExp(caption, 'i')));

    function find(options, caption, func) {
        return options.find(option => {
            const text = option.textContent.trim();
            return func(text, caption);
        });
    }

    return opt ? opt.index : -1;
}
