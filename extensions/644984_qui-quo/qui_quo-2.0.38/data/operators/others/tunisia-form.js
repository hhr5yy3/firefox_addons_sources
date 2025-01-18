window.OPERATOR_NAME = 'Form for Tunisia';


function injectQuickReservationData(selInsert, func) {
    const form = document.querySelector('app-traveler');
        if (form && !form.parentNode.querySelector(selInsert)) {
            form.before(func({
                addTag: "div"
            }));
        }
}

async function pasteOrderData(div, data, passport, errors) {
    (document.querySelector('#privacy') || []).checked = true;

    setSelectIndex(div, [
        '[name="nationality-country-id"]', data.nationalityEng,
        '[name="resident-country-id"]', data.nationalityEng,
        '[name="trip-started-from-country-id"]', data.nationalityEng,
        '[name="entry-type"]', {value: 'Air access', caption: 'Access to Tunisian territory'},
        '[name="gender"]', mapSex(data.sex)
    ], errors, ['input', 'change'])


    setInputValues(div, [
        '[name="trip-started-at"]', customDateToFullString(data.tourStartDate, reformatDate),
        '[name="first-name"]', passport.name,
        '[name="last-name"]', passport.surname,
        '[name="birthDate"]', customDateToFullString(data.birthday, reformatDate),
        '[name="mobile-phone-number"] input[type=text]', {
            value: (data.entryFormData.originalPhones.mobile.value || data.entryFormData.originalPhones.main.value),
            caption: data.phones.mobile.caption
        },
        '[name="passeport-number"]', {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport Number'
        },
        '[name="email"]', data.email,
        '[name="flight-number"]', data.entryFormData.aviaFlightNumber

    ], errors, ['input', 'change']);
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            sex.value = 'MALE';
            return sex;
        case "2" :
            sex.value = 'FEMALE';
            return sex;
    }
    return sex;
}

function getPassengerRowBySelect(select) {
    return select.closest('app-traveler-add');
}


// "21.08.1987" -> "08/21/1987"
function reformatDate(date) {
    const parts = date.split('.');
    return parts[1] + '/' + parts[0] + '/' + parts[2];
}
