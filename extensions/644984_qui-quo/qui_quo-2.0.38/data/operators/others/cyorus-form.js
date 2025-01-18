window.OPERATOR_NAME = 'Form for Cyprus';


function injectQuickReservationData(selInsert, func) {
    const form = document.querySelector('form[action*="https://cyprusflightpass.gov.cy/fly-requests"] #request_id');
    if (form) {
        if (!document.querySelector(selInsert)) {
            form.before(func({
                addTag: "div"
            }));
        }
    }
}

async function pasteOrderData(div, data, passport, errors) {
    $$('[name="flight_type"][value="1"],[name="stay_length"][value="0"],' +
        ' #valid_information_given_declaration, covid_test_consent_general, #declaration_4, #declaration_3, #declaration_2')
        .forEach(elem => elem.click())

    await waitingFor(()=>null, 100, 3);
    setInputValues(div, [
        '#first_name', passport.name,
        '#last_name', passport.surname,
        '#id_passport', {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport Number'
        },
        '#birth_date', customDateToFullString(data.birthday, reformatDate),
        '#ms-form-mobile_phone', {
            value: (data.entryFormData.originalPhones.mobile.value || data.entryFormData.originalPhones.main.value).replace(/\D+/g, ''),
            caption: data.phones.mobile.caption
        },
        '#ms-form-email', data.email,
        '#permanent_address', data.address,
        '#temporary_address_hotel', data.hotel.hotelName,
        '#inbound_flight_departure_date, #direct_flight_origin_departure_date', {value: reformatDate(getFlightPropByIndex(data.flights, 'departureDate').value), caption: 'Departure date'},
        '#leaving_date', {value: reformatDate(getFlightPropByIndex(data.flights, 'departureDate', (data.flights.value||[]).length-1).value), caption: 'Дата возвращения'}

    ], errors, ['input', 'change', 'blur'], ['focus'] );

    setSelectIndex(div, [
        '#gender-select', {value: mapSex(data.sex), caption: data.sex.caption},
        '#nationality_country', data.nationalityEng,
        '#country_of_birth', data.nationalityEng,
        '#permanent_country', data.nationalityEng,
        '#inbound_flight_airline', data.entryFormData.aviaCompany,
        '#inbound_flight_flight_number', data.entryFormData.aviaFlightNumber
    ], errors)
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return 'MALE';
        case "2" :
            return 'FEMALE';
    }
    return 'OTHERS';
}

function getPassengerRowBySelect(select) {
    return select.closest('form');
}


// "21.08.1987" => "21-08-1987"
function reformatDate(date) {
    return date.split('.').join('-');
}
