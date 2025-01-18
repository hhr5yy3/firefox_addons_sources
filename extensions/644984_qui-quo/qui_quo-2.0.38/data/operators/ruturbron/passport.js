//Заполнение паспортных данных
window.OPERATOR_NAME = "ruturbron";

function injectQuickReservationData(selInsert, func) {
    $$('input[id*="_passportNumber"]').map(i => i.parentNode.parentNode.parentNode).forEach((tourist) => {
        if ( !$first(selInsert, tourist) ) {
            tourist.append(func({
                addTag: "div",
                style: 'font-size:11px;margin: 2px;',
                tagStyle: 'font-size:11px;margin: 2px;',
                legendStyle: 'font-size:11px'
            }));
        }
    });
}

function pasteOrderData(select, data, passport, errors) {
    const docType = getDocTypeUtils(select);
    const choosenDrop = $$('li.active-result', select).find(li => getText(li).match(docType));
    if ( choosenDrop ) {
        simulateMouseEvent(choosenDrop, 'mouseup');
    }

    setInputValues(select, [
        (`input[id*="_name"]`), {
            value: passport.surname.value + ' ' + passport.name.value + ' ' + passport.secondName.value, caption: "Номер паспорта"
        },
        (`input[id*="_birthDate"]`), customDateToFullString(data.birthday),
        (`input[id*="_phoneNumber"]`), data.phones.mobile,
        (`input[id*="_passportNumber"]`), {
            value: passport.serial.value +' '+ passport.number.value, caption: "Номер паспорта"
        }
    ], errors, "blur", "focus", true)

}

function getPassengerRowBySelect(select) {
    return select.closest('.widget');
}

