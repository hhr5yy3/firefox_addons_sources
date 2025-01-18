window.OPERATOR_NAME = 'Form for Poland';

function injectQuickReservationData(selInsert, func) {
    const form = document.querySelector('[name="Travel notification"]');
    if (form) {
        if (!document.querySelector(selInsert)) {
            form.prepend(func({
                addTag: "div",
                style: 'border: 1px solid; padding:5px',
                legendStyle: 'font-size: 16px;'
            }));
        }
    }

    $$('app-card-set fieldset').forEach(form => {
        if (!form.querySelector(selInsert)) {
            form.prepend(func({
                addTag: "div",
                style: 'border: 1px solid; padding:5px',
                legendStyle: 'font-size: 16px;'
            }));
        }
    })
}

async function pasteOrderData(div, data, passport, errors) {
    const touristPhone = data.entryFormData.originalPhones.mobile.value.replace(/\D+/g, '');
    setSelectIndex(div, [
        'select[id^="type"]', {value: 'passport', caption: 'Document type' }
    ])
    for (let [select, obj] of [[div.querySelector('[id^="flyInCountry"]'), data.nationalityEng],
                               [div.querySelector('[id^="issuingCountry"]'), data.nationalityEng],
                               [div.querySelector('[id^="areaCode"]'), data.nationalityEng],
                               [div.querySelector('#airport'), {value: optionalChaining(data.flights.value, ['0', 'arrivalCityCode']), caption: 'Airport of arrival'}] ]) {
        if (select) {
            await waitingFor(() => null, 50, 2);
            clickToSelectOption(select, obj, errors);
        }
    }
    setInputValues(div, [
        'input#flightNumber', data.entryFormData.aviaFlightNumber,
        'input[placeholder="Enter a place name"]', data.hotel.hotelName,
        'input[id^="dateFrom"]', customDateToFullString(data.hotel.dateStart, reformatDate),
        'input[id^="dateTo"]', customDateToFullString(data.hotel.dateEnd, reformatDate),
        'input#arrivalDate', customDateToFullString(data.general.dateStart, reformatDate),
        'input[id^="birthdate"]', customDateToFullString(data.birthday, reformatDate),
        'input[id^="name"]:not(input[placeholder="Enter a place name"])', passport.name,
        'input[id^="surname"]', passport.surname,
        'input[id^="documentNumber"]', {value: passport.serial.value+passport.number.value, caption: 'Document number' },
        'input[id^="phoneNumber_"]', {value: touristPhone.length > 11 ? touristPhone.slice(-9) : touristPhone.slice(-10), caption: 'Phone number'},
        'input[id^="phoneNumberRepeat"]', {
            value: touristPhone.length > 11 ? touristPhone.slice(-9) : touristPhone.slice(-10), caption: 'Phone number'
        },
    ], errors, 'blur', 'focus, input, change', true)
}

function clickToSelectOption(select, obj, errors) {
    if (!select) {
        return;
    }
    const arrow = select.querySelector('.mat-select-arrow-wrapper');
    if ( !arrow ) {
        return;
    }
    arrow.click();
    const option = $$('.mat-select-panel-wrap mat-option').find(opt => getNodeProperty(opt, '').match(obj.value));
    if (option) {
        option.click();
    } else {
        errors.push(obj.caption)
    }
}

function getPassengerRowBySelect(select) {
    return select.closest('mc-wizard-step, fieldset');
}

// "21.08.1987" -> "08/21/1987"
function reformatDate(date) {
    return date.replace('.', '/');
}
