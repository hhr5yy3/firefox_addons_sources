window.OPERATOR_NAME = "ВодоходЪ";

function injectQuickReservationData(selInsert, func) {
    $$('input[id*="lastName"]').map(input => input.closest('.p-r-f')).forEach(passenger => {
        if (!passenger.querySelector(selInsert)) {
            passenger.prepend(func({
                style: "font-size:16px;padding-left:40px;padding-top: 20px;padding-bottom: 5px;background-color:#f4c263;font-weight:bold;",
            }));
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    setInputValues(div, [
        'input[id*="lastName"]', passport.surname,
        'input[id*="firstName"]', passport.name,
        'input[id*="patronymicName"]', passport.secondName,
        'input[id*="phone"]', data.phones.mobile,
        'input[id*="email"]', data.email,
        'input[id*="birthDate"]', customDateToFullString(data.birthday),
    ], errors, ['change', 'blur'], ['focus', 'input'], true)

    const options = $$('.option__name', div);
    const docType = getDocType(div);
    const docTypeButton = options.find(node => getText(node) === docType);
    if (docTypeButton) {
        docTypeButton.click();
    }

    const nationalityButton = options.find(node => getText(node).toLowerCase() === data.nationality.value.toLowerCase());
    if (nationalityButton) {
        nationalityButton.click();
    }

    if (docType === "Свидетельство о рождении РФ") {
        const birthCertNumber = passport.number.value.match(/\d+/)[0];
        const birthCertSeries = passport.number.value.match(/\D+/)[0];
        setInputValues(div, [
            'input[id*="documentSeparateSeries"]', {value: birthCertSeries, caption: 'Номер'},
            'input[id*="documentSeparateNumber"]', {value: birthCertNumber, caption: 'Номер'},
        ], errors, ['change', 'blur'], ['focus', 'input'], true)
    } else {
        setInputValues(div, [
            'input[id*="documentSeparateSeries"]', passport.serial,
            'input[id*="documentSeparateNumber"]', passport.number,
        ], errors, ['change', 'blur'], ['focus', 'input'], true)
    }


    if (data.sex.value === '1') {
        $1('input[value="male"]').click()
    }
    if (data.sex.value === '2') {
        $1('input[value="female"]').click()
    }

}

function getDocType(form) {
    let select = form.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            return "Паспорт РФ";
        case "Заграничный паспорт" :
            return "Иностранный документ";
        case "Свидетельство о рождении" :
            return "Свидетельство о рождении РФ";
    }
    return "Паспорт РФ";
}

function getPassengerRowBySelect(select) {
    return select.closest('section');
}
