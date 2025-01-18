window.OPERATOR_NAME = 'Form for Greece';

function injectQuickReservationData(selInsert, func) {
    const form = $$('form#step_1, form#step_3, form#step_6, form#step_7 .family-member, .companion, #step_5, #step_4')
    form.forEach(form => {
        if ( form && !form.querySelector(selInsert) ) {
            form.prepend(func({
                                  addTag: "div",
                                  style: "padding-right: 2rem;padding-left: 2rem;display:block",
                                  selectStyle: 'border-style:solid;',
                                  legendStyle: 'display:block;'
                              }));
        }
    });
    if ( form.length === 0 ) {
        $$(selInsert).forEach(sel => sel.remove());
    }
}

async function pasteOrderData(div, data, passport, errors) {
    const passportRadio = div.querySelector('.personal_doc_type_passport input');
    if ( passportRadio ) {
        passportRadio.click();
    }
    const age = ageFromDate(customDateToFullString(data.birthday).value, new Date().toLocaleDateString('ru'));
    setInputValues(div, [
        "#air_airline_name", data.entryFormData.aviaCompany,
        "#temporary_hotel", data.hotel.hotelName,
        "#air_flight_number", {value: data.entryFormData.aviaFlightNumber.value.replace(/\s+/g, ''), caption: data.entryFormData.aviaFlightNumber.caption },
        "input[id*='first_name']", passport.name,
        "input[id*='last_name']", passport.surname,
        "#personal_middle_initial", passport.secondName,
        "input[id*='_age']", {value: age, caption: 'age'},
        "#personal_msisdn, #emergency_msisdn", {
            value: '+'+(data.entryFormData.originalPhones.mobile.value || data.entryFormData.originalPhones.main.value).replace(/\D+/g, ''),
            caption: data.phones.mobile.caption
        },
        "#personal_email, #emergency_email", data.email
    ], errors, ['click', 'focus', 'input', 'keyup', 'blur']);

    // setInputValues(div, [
    //     "#air_date", customDateToFullString(data.tourStartDate, reformatDate),
    // ], errors, ['focus', 'input', 'blur']);
    //

    await waitingFor(()=>null, 100, 3);
    setInputValues(div, [
        "#passport_number, input[id*='passport_id_number']", {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport Number'
        }
    ], errors, ['click', 'focus', 'input', 'keyup', 'blur']);
    const sexRadio = div.querySelector(mapSex(data.sex));
    if (sexRadio) {
        sexRadio.click();
    }

}

function reformatDate(date) {
    return date.split('.').reverse().join('-')
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return '.personal_gender_m input';
        case "2" :
            return '.personal_gender_f input';
    }
    return '.personal_gender_o input';
}

function getPassengerRowBySelect(select) {
    return select.closest('form, .family-member, .companion');
}
