window.OPERATOR_NAME = "ГАМА";

function injectQuickReservationData(selInsert, func) {
    $$('input[name*="_lastname"]').map(input => input.closest('[id*="vv__place"]')).forEach(passenger => {
        if (passenger && !passenger.querySelector(selInsert)) {
            passenger.append(func({
                legendStyle: 'font-size: 14px'
            }));
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    const number = {value: passport.serial.value + passport.number.value, caption: passport.number.caption}
    const docType = getDocType(div)
    setSelectIndex(div, [
        'select[name*="_doc"]', {
            value: docType,
            caption: 'Документ'
        }
    ], errors)


    setInputValues(div, [
        'input[name*="_lastname"]', passport.surname,
        'input[name*="_firstname"]', passport.name,
        'input[name*="_grandname"]', passport.secondName,
        'input[name*="_birthday"]', customDateToFullString(data.birthday),
        'input[name*="_pass_sn"]', number,
        'input[name*="_svvo_sn"]', number,
        'input[name*="_phone"]', data.phones.mobile,
        'input[name*="_pass_date"]', customDateToFullString(passport.issueDate),
        'input[name*="_pass_who"]', passport.authority,
        'input[name*="_svvo_date"]', customDateToFullString(passport.issueDate),
        'input[name*="_svvo_who"]', passport.authority,
        'input[name*="_pass_addr"]', data.address
    ], errors, ['change', 'blur'], ['focus', 'input'])

}

function getDocType(form) {
    let select = form.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            return "Паспорт";
        case "Заграничный паспорт" :
            return "Паспорт";
        case "Свидетельство о рождении" :
            return "Свидетельство о рождении";
    }
    return "Паспорт";
}


function getPassengerRowBySelect(select) {
    return select.closest('[id*="vv__place"]');
}
