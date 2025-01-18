window.OPERATOR_NAME = 'Form for Jordan';

function injectQuickReservationData(selInsert, func) {
    const form = document.querySelector('#divForm');
    if (form) {
        if (!document.querySelector(selInsert)) {
            form.prepend(func({
                addTag: "div",
                style: 'margin-left: 15px',
                legendStyle: 'font-size: 16px;'
            }));
        }
    }
}

async function pasteOrderData(div, data, passport, errors) {
    const touristPhone = data.entryFormData.originalPhones.mobile.value.replace(/\D+/g, '');
    let prefix = '00' + (touristPhone.length > 11 ? touristPhone.slice(0, -9) : touristPhone.slice(0, -10));
    setSelectIndex(div, [
        'select#ddlNationality', data.nationalityEng,
        'select#ddlResidence', data.nationalityEng,
    ], errors);
    setSelectIndex(div, [
        'select#ddlCountryCode', {value: prefix, caption: 'Код телефона'}
    ], errors, prefixComparator)

    setInputValues(div, [
        'input#txtName', {
            value: passport.name.value + ' ' + passport.surname.value,
            caption: 'Name Surname'
        },
        'input#txtDOB', customDateToFullString(data.birthday, reformatDate),
        'input#txtArrivalDate', customDateToFullString(data.tourStartDate),
        'input#txtAddress', data.hotel.hotelName,
        'input#txtPassportNu', {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport number'
        },
        'input#txtMobile', {
            value: touristPhone.length > 11 ? touristPhone.slice(-9) : touristPhone.slice(-10),
            caption: 'Mobile phone'
        },
        'input#txtFlightNu', data.entryFormData.aviaFlightNumber,
        'input#txtEmail', data.email,
        'input#txtEmail2', data.email
    ], errors);

    const sexInput = (data.sex.value === '1' ? div.querySelector('#rbmale') : data.sex.value === '2' ? div.querySelector('#rbfemale') : null);
    if ( sexInput ) {
        sexInput.click();
    } else {
        errors.push('Пол')
    }

}

function prefixComparator(text, caption) {
    if (text && caption && ((text.toUpperCase().replace(/\D+/g, ''))  === caption.toUpperCase())) {
        return true;
    }
}

function getPassengerRowBySelect(select) {
    return select.closest('#divForm');
}

// "21.08.1987" -> "21/08/1987"
function reformatDate(date) {
    return date.split('.').reverse().join('/');
}

