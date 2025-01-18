window.OPERATOR_NAME = 'Form for Sri-Lanka';

function injectQuickReservationData(selInsert, func) {
    const form = document.querySelector('[action="health_confirm"]');
    if (form) {
        if (!document.querySelector(selInsert)) {
            const wrapper = func({
                addTag: "div",
                legendStyle: 'font-size:12px;'
            });
            const qqContainer = createQRContainer(wrapper);
            qqContainer.classList.add(selInsert.replace('.', ''))
            form.append(qqContainer)
        }
    }
}

async function pasteOrderData(div, data, passport, errors) {
    setInputValues(div, [
        'input#txtnamewithinitials', {
            value: passport.name.value + ' ' + passport.surname.value,
            caption: 'Name Surname'
        },
        'input#txtpassportNo', {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport Number'
        },
        'input#txtEmail', data.email,
        'input#txtContact', {
            value: (data.entryFormData.originalPhones.mobile.value || data.entryFormData.originalPhones.main.value).replace(/\D+/g, ''),
            caption: data.phones.mobile.caption
        },
        'input#txtOrigin', data.nationalityEng,
        'input#txtFlightNo', data.entryFormData.aviaFlightNumber,
        'input#txtAddress', {value: (data.hotel.hotelName.value || '').replace(/[^A-z ]/g, ''), caption: 'Address'},
        '#dtpDateOfBirth', customDateToFullString(data.birthday, reformatDate),
        '#dtpDepature', customDateToFullString(data.tourStartDate, reformatDate)
    ], errors,);

    decorateSelectSetter(div, [
        'select#txtNationality', data.nationalityEng
    ], errors);

    const gender = $$('input[name="rbGender"]', div)
        .find(input => (input.value === 'M' && data.sex.value === '1') || (input.value === 'F' && data.sex.value === '2'));

    if (gender) {
        gender.click();
    }
}

function decorateSelectSetter(div, array, errors) {
    setSelectIndex(div, array, errors);
    for (let i = 0; i < array.length; i += 2) {
        const select = div.querySelector(array[i]);
        select.style.opacity = 1;
    }
}

function getPassengerRowBySelect(select) {
    return select.closest('form');
}                 3

// "21.08.1987" -> "1987-08-21"
function reformatDate(date) {
    return date.split('.').reverse().join('-');
}

