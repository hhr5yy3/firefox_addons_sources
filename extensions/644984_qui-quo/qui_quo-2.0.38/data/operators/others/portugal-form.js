window.OPERATOR_NAME = 'Form for Portugal';

function injectQuickReservationData(selInsert, func) {
    const form = document.querySelector('form h2');
    if (form) {
        if (!document.querySelector(selInsert)) {
            form.before(func({
                addTag: "div",
                style: 'border: 1px solid; padding:5px',
                legendStyle: 'font-size: 16px;'
            }));
        }
    }
}

async function pasteOrderData(div, data, passport, errors) {
    const touristPhone = data.entryFormData.originalPhones.mobile.value.replace(/\D+/g, '');
    let touristPrefix = '+' + (touristPhone.length > 11 ? touristPhone.slice(0, -9) : touristPhone.slice(0, -10));

    const managerPhone = data.phones.mobile.value.replace(/\D+/g, '');
    let managerPrefix = '+' + (managerPhone.length > 11 ? managerPhone.slice(0, -9) : managerPhone.slice(0, -10));
    setInputValues(div, [
        'input#name', {
            value: passport.name.value + ' ' + passport.surname.value,
            caption: 'Name Surname'
        },
        'input#birth_date', customDateToFullString(data.birthday, reformatDate),
        'input#arrival_date', customDateToFullString(data.tourStartDate, reformatDate),
        'input#address', data.hotel.hotelName,
        'input#identification_number', {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport number'
        },
        'input#phone', {
            value: touristPhone.length > 11 ? touristPhone.slice(-9) : touristPhone.slice(-10),
            caption: 'Mobile phone'
        },
        'input#contact_phone', {
            value: managerPhone.length > 11 ? managerPhone.slice(-9) : managerPhone.slice(-10),
            caption: 'Emergency Mobile phone'
        },
        'input#phone_country_code', {value: touristPrefix, caption: 'Phone prefix'},
        'input#contact_phone_country_code', {value: managerPrefix, caption: 'Phone prefix'},
        'input#flight_number', {value: data.entryFormData.aviaFlightNumber.value.replace(/\s+/g, ''), caption:'Номер рейса' },
        'input#email', data.email
    ], errors);

    setSelectIndex(div, ['#gender', {value: data.sex.value === "1" ? 'Male' : (data.sex.value === "2" ? 'Female' : 'Other')}], errors)
    await fillFakeSelect(div.querySelector('#vs2__combobox input'), data.nationalityEng);
    await fillFakeSelect(div.querySelector('#vs3__combobox input'), data.nationalityEng);

}

async function fillFakeSelect(input, data) {
    simulateEvent(input, 'focus');
    await waitingFor(() => null, 75, 2);
    const parentDiv = input.closest('.v-select');
    const option = $$('li', parentDiv).find( li => getText(li).toUpperCase() === data.value.toUpperCase());
    option ? simulateMouseEvent(option, 'mousedown') : null;
}

function getPassengerRowBySelect(select) {
    return select.closest('form');
}

// "21.08.1987" -> "1987-08-21"
function reformatDate(date) {
    return date.split('.').reverse().join('-');
}

