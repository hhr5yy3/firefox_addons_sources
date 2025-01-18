window.OPERATOR_NAME = "Portbilet";

function injectQuickReservationData(selInsert, func) {
    $$('.sln-travellers .js-view-container').forEach(person => {
        const traveler = person.querySelector('.js-passenger-autocompleted');
        if ( traveler && !traveler.querySelector(selInsert) ) {
            traveler.prepend(func({
                style: "font-size:13px;padding: 18px;",
                legendStyle: "font-size:13px;margin-bottom:8px;font-weight:bold;",
                selectStyle: "width: 20%"
            }));
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    if ( data.phones.mobile.value  ) {
        const phone = data.phones.mobile.value.split('').reverse().join('').replace(/\D/g, '');
        const phoneBody = phone.slice(0, 7).split('').reverse().join('');
        const phoneOperatorCode = phone.slice(7, 10).split('').reverse().join('');
        const phoneCode = phone.slice(10).split('').reverse().join('');
        setInputValues(div, [
            'input[data-field="number"]', {value: phoneBody, caption: 'Телефон'},
            'input[data-field="code"]', {value: phoneOperatorCode, caption: 'Телефон'},
            'input[data-field="countryCode"]', {value: phoneCode, caption: 'Телефон'}
        ], errors, ['blur'], ['focus', 'input', 'keyup-change', 'change'], true);
    }
    setInputValues(div, [
        'input[fieldbinding="model.passport.lastName"]', {
            value: transliterate(passport.surname.value.toLowerCase()).toUpperCase(), caption: "Фамилия"
        },
        'input[fieldbinding="model.passport.firstName"]', {
            value: transliterate(passport.name.value.toLowerCase()).toUpperCase(), caption: "Имя"
        },
        'input[fieldbinding="model.passport.middleName"]', {
            value: transliterate(data.secondName.value.toLowerCase()).toUpperCase(), caption: "Отчество"
        },
        'input[fieldbinding="model.email.email"]', data.email
    ], errors, [ "paste","keydown", "keyup", "keyup-change", "change", "binding:change", "blur"], ['click', 'focus', "input"], true);
    setInputValues(div, [
        'input[fieldbinding="model.passport.birthDate"]', customDateToFullString(data.birthday)
    ], errors, ['focus', 'input', 'keyup-change', 'change'], ['blur'], true);

    const genderInputs = $$('input[fieldbinding="model.passport.gender"]',div);
    if ( data.sex.value === '1' && genderInputs.length > 0) {
        genderInputs[0].click();
    }
    if ( data.sex.value === '2' && genderInputs.length > 1) {
        genderInputs[1].click();
    }

    const docType = getDocType(div);
    const docTypeInput = div.querySelector('input[fieldbinding="model.passport.type"]');
    await waitingFor(() => null, 50, 5);
    if ( docTypeInput ) {
        docTypeInput.parentNode.querySelector('.select2-search').click();
        await waitingFor(() =>null,50, 5);
        const opt = $first(`li div[data-option-id="${docType}"]`);
        if  ( opt ) {
            opt.click();
            simulateMouseEvent(opt, 'mousedown');
            simulateMouseEvent(opt, 'mouseup')
        }
    }
    await waitingFor(() => null, 50, 5);
    setInputValues(div, [
        'input[fieldbinding="model.passport.number"]', {
            value: passport.serial.value + passport.number.value, caption: 'Серия и номер'
        },
        'input[fieldbinding="model.passport.expirationDate"]', customDateToFullString(passport.expire)
    ], errors, ['focus', 'input', 'keyup-change', 'change'], ['blur'], true);

}

function getDocType(form) {
    let select = form.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch ( value ) {
        case "Внутренний паспорт" :
            return "INTERNAL";
        case "Заграничный паспорт" :
            return "FOREIGN";
        case "Свидетельство о рождении" :
            return "BIRTHDAY_NOTIFICATION";
    }
    return 'FOREIGN';
}

function getPassengerRowBySelect(select) {
    return select.closest('.js-view-container');
}
