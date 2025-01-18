window.OPERATOR_NAME = 'Form for Cuba';

function injectQuickReservationData(selInsert, func) {
    const form = document.querySelector('form');
    if (form) {
        if (!document.querySelector(selInsert)) {
            form.prepend(func({
                addTag: "div"
            }));
        }
    }
}

async function pasteOrderData(div, data, passport, errors) {
    setInputValues(div, [
        'input[formcontrolname="primerNombre"]', passport.name,
        'input[formcontrolname="primerApellido"]', passport.surname,
        'input[formcontrolname="fechaNacimiento"]', customDateToFullString(data.birthday, reformatDate),
        'input[formcontrolname="fechaArribo"]', customDateToFullString(data.hotel.dateStart, reformatDate),
        "input#dia", {value: (data.birthday.value).day, caption: "Дата рождения 'День'"},
        "input#mes", {value: (data.birthday.value).month, caption: "Дата рождения 'Месяц'"},
        "input#año", {value: (data.birthday.value).year, caption: "Дата рождения 'Год'"},
        'input[formcontrolname="numeroVuelo"]', data.entryFormData.aviaFlightNumber,
        'input[formcontrolname="pasaporte"]', {value: passport.serial.value + passport.number.value, caption: 'Passport number'},
        'input[formcontrolname="telefono1"]', data.phones.mobile,
        'input[formcontrolname="telefono1"]', data.entryFormData.originalPhones.mobile,
        'input[formcontrolname="correo"]', data.email
    ], errors, ['keydown','keyup'], ['focus', 'input', 'change'], true);

    setSelectIndex(div, [
        'select[formcontrolname="nacionalidad"]', data.nationalityEng,
        'select[formcontrolname="ciudadania"]', data.nationalityEng,
        'select[formcontrolname="paisResidencia"]', data.nationalityEng,
        'select[formcontrolname="paisOrigen"]', data.nationalityEng,
        'select[formcontrolname="sexo"]', {value: mapSex(data.sex.value), caption: 'Sex'},
    ], errors)

    $$('.dropdown-list li').filter(li => getText(li).match(new RegExp(data.nationalityEng.value, 'i'))).forEach(c => c.click())
}

function mapSex(sex) {
     if ( sex === '1' ) {
         return 'Male';
     }
    if (sex === '2') {
        return 'Feminine';
    }
    return 'N/A'
}

function getPassengerRowBySelect(select) {
    return select.closest('form');
}

// "21.08.1987" => "1987-08-21"
function reformatDate(date) {
    return date.split('.').reverse().join('-');
}
