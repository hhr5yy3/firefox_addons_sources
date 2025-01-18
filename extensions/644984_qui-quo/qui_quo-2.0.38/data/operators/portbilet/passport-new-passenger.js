window.OPERATOR_NAME = "Portbilet";

function injectQuickReservationData(selInsert, func) {
    $$('.sln-passenger-panel [fieldbinding="model.documents"]').forEach(passenger => {
        if (passenger && !passenger.querySelector(selInsert)) {
            passenger.prepend(func({
                style: "font-size:13px;padding: 18px;",
                legendStyle: "font-size:13px;margin-bottom:8px;font-weight:bold;",
                selectStyle: "width: 20%"
            }));
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    if (data.phones.mobile.value) {
        const phone = data.phones.mobile.value.replace(/\D/g, '').split('').reverse().join('');
        const phoneBody = phone.slice(0, 7).split('').reverse().join('');
        const phoneOperatorCode = phone.slice(7, 10).split('').reverse().join('');
        const phoneCode = phone.slice(10).split('').reverse().join('');
        setInputValues(document, [
            '.input-group-phone input[data-field="number"]', {value: phoneBody, caption: 'Телефон'},
            '.input-group-phone input[data-field="code"]', {value: phoneOperatorCode, caption: 'Телефон'},
            '.input-group-phone input[data-field="countryCode"]', {value: phoneCode, caption: 'Телефон'},
            'input[data-field="email"]', data.email
        ], errors, ['blur'], ['focus', 'input', 'keyup-change', 'change'], true);
    }
    setInputValues(div, [
        'input[data-field="lastNameCyrillic"]', {
            value: (data.nationalPassport.surname.value.toLowerCase()).toUpperCase(), caption: "Фамилия"
        },
        'input[data-field="firstNameCyrillic"]', {
            value: (data.nationalPassport.name.value.toLowerCase()).toUpperCase(), caption: "Имя"
        },
        'input[data-field="middleNameCyrillic"]', {
            value: (data.secondName.value.toLowerCase()).toUpperCase(), caption: "Отчество"
        },
        'input[data-field="lastNameLatin"]', {
            value: (data.internationalPassport.surname.value.toLowerCase()).toUpperCase(), caption: "Фамилия"
        },
        'input[data-field="firstNameLatin"]', {
            value: (data.internationalPassport.name.value.toLowerCase()).toUpperCase(), caption: "Имя"
        },
        'input[data-field="middleNameLatin"]', {
            value: transliterate(data.secondName.value.toLowerCase()).toUpperCase(), caption: "Отчество"
        }
    ], errors, ["paste", "keydown", "keyup", "keyup-change", "change", "binding:change", "blur"], ['click', 'focus', "input"], true);


    setInputValues(document, [
        'input[data-field="birthDate"]', customDateToFullString(data.birthday)
    ], errors, ['focus', 'input', 'keyup-change', 'change'], ['blur'], true);

    const genderInputs = $$('input[fieldbinding="model.gender"]');
    if (data.sex.value === '1' && genderInputs.length > 0) {
        genderInputs[0].click();
    }
    if (data.sex.value === '2' && genderInputs.length > 1) {
        genderInputs[1].click();
    }

    await waitingFor(() => null, 50, 5);
    setInputValues(div, [
        'input[fieldbinding="model.number"]', {
            value: passport.serial.value + passport.number.value, caption: 'Серия и номер'
        },
        'input[fieldbinding="model.issued"]', customDateToFullString(passport.issueDate),
        'input[fieldbinding="model.expired"]', customDateToFullString(passport.expire)
    ], errors, ['focus', 'input', 'keyup-change', 'change'], ['blur'], true);

    errors.push('Тип документа')

}

function getDocType(form) {
    let select = form.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
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
    return select.closest('[fieldbinding="model.documents"]');
}
