window.OPERATOR_NAME = "Спутник Гермес";

function injectQuickReservationData(selInsert, func) {
    $$('.place_form_pasanger [id*="body_kauta"], #dogovor_form').forEach(passenger => {
        if (!passenger.querySelector(selInsert)) {
            passenger.append(func({
                style: 'margin: 16px'
            }));
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    const number = {value: passport.serial.value + passport.number.value, caption: passport.number.caption}
    const fio = [passport.surname,
        passport.name,
        passport.secondName].filter(d => d).map(t => t.value).join(' ')
    const docType = getDocType(div)
    setSelectIndex(div, [
        'select[name="doctype"]', {
            value: docType,
            caption: 'Удостоверение личности'
        }
    ], errors)



    if (docType === "Свидетельство о рождении") {
        const birthCertNumber = passport.number.value.match(/\d+/)[0];
        const birthCertSeries = passport.number.value.match(/\D+/)[0];
        setInputValues(div, [
            'input[name="passport_s"]', {value: birthCertSeries, caption: 'Серия'},
            'input[name="passport_n"]', {value: birthCertNumber, caption: 'Номер'},
        ], errors, ['change', 'blur'], ['focus', 'input'], true)
    } else {
        setInputValues(div, [
            'input[name="passport_s"]', passport.serial,
            'input[name="passport_n"]', passport.number,
        ], errors, ['change', 'blur'], ['focus', 'input'], true)
    }


    setInputValues(div, [
        'input.inputfio, #holder_name', {value: fio, caption: "ФИО"},
        'input[name="InputBirthDay"], #holder_birth', customDateToFullString(data.birthday),
        '#holder_passport', number,
        '#holder_phone', data.phones.mobile,
        '#holder_email', data.email,
        'input[name="passport_data"]', customDateToFullString(passport.issueDate),
        '[name="passport_who"]', passport.authority,
        '[name="address"]', data.address
    ], errors, ['change', 'blur'], ['focus', 'input'])

    const sexSelect = $1('select[name="gender"]');
    if (!sexSelect) {
        return;
    }
    if (data.sex.value === '1') {
        sexSelect.value = 'm';
    }
    if (data.sex.value === '2') {
        sexSelect.value = 'f';
    }

}

function getDocType(form) {
    let select = form.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            return "Паспорт гражданина РФ";
        case "Заграничный паспорт" :
            return "Общегражданский заграничный паспорт РФ";
        case "Свидетельство о рождении" :
            return "Свидетельство о рождении";
    }
    return "Паспорт гражданина РФ";
}


function getPassengerRowBySelect(select) {
    return select.closest('[id*="body_kauta"], #dogovor_form');
}
