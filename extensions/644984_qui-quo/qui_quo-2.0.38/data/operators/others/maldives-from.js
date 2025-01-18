window.OPERATOR_NAME = 'Form for Maldives';

function injectQuickReservationData(selInsert, func) {
    if ( !document.querySelector(selInsert) ) {
        const element = $1('[name="given_name"], input[name="length_of_stay"]');
        if ( element && !document.querySelector(selInsert) ) {
            element.closest('form').before(func({
                addTag: "div"
            }));
        }
    }
}

async function pasteOrderData(div, data, passport, errors) {
    const daysOfStaying = (getDistance(customDateToFullString(data.tourStartDate).value, customDateToFullString(data.tourEndDate).value) || 1) - 1;
    setInputValues(div, [
        'input[name="given_name"]', passport.name,
        'input[name="surname"]', passport.surname,
        'input[name="date_of_birth"]', {caption: 'Дата рождения', value: `${data.birthday.value.year}-${data.birthday.value.month}-${data.birthday.value.day}`},
        'input[name="passport_expiry_date"]', {
            caption: 'Дата рождения',
            value: `${passport.expire.value.year}-${passport.expire.value.month}-${passport.expire.value.day}`
        },
        'input[name="passport_number"]', passport.fullNumber,
        'input[name="email_address"]', data.email,
        'input[name="mobile_number"]', data.phones.mobile,
        'input[name="arrival_date"]', customDateToFullString(data.tourStartDate, reformatDate),
        'input[name="length_of_stay"]', {
            value: daysOfStaying,
            caption: 'Duration of stay'
        }
    ], errors, ['click', 'focus', 'input', 'keyup', 'blur'], 'focus', true);

    const sex = mapSex(data.sex)
    const sexRadio = $1(`ui-radio[value="${sex}"]`);
    if ( sexRadio ) {
        sexRadio.click();
    }

    const nationality = data.nationalityEng.value;
    const nats = $$({sel: 'ui-option', searchString: new RegExp(nationality, 'i')})
    nats.forEach(nat => nat.click())
    console.log({nationality, nats})



}


function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return 'male';
        case "2" :
            return 'female';
    }
    return "other";
}

function getPassengerRowBySelect() {
    return document.body;
}

// "21.08.1987" -> "08-21-1987"
function reformatDate(date) {
    const parts = date.split('.');
    return parts[2] + '-' + parts[1] + '-' + parts[0];
}
