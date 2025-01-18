window.OPERATOR_NAME = "ВолгаWolga";

function injectQuickReservationData(selInsert, func) {
    $$('form[action*="cabinet/changeMan"] .js-change-man-watcher').forEach(passenger => {
        if (!passenger.querySelector(selInsert)) {
            passenger.append(func({
                legendStyle: 'margin: 0'
            }));
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    const number = {value: passport.serial.value + passport.number.value, caption: passport.number.caption}
    setInputValues(div, [
        'input[placeholder="Фамилия"]', passport.surname,
        'input[placeholder="Имя"]', passport.name,
        'input[placeholder="Отчество"]', passport.secondName,
        'input[name*="p_ser"]', number,
        'input[name*="phone"]', data.phones.mobile,
        'input[name*="address"]', data.address,
        'input[name*="birthday"]', {
            value: Object.values(data.birthday.value).reverse().join('-'),
            caption: data.birthday.caption
        },
    ], errors, ['change', 'blur'], ['focus', 'input'], true)

    const sexSelect = $1('select[name*="sex"]');
    if ( !sexSelect ) {
        return;
    }
    if (data.sex.value === '1') {
        sexSelect.value = 'M';
    }
    if (data.sex.value === '2') {
        sexSelect.value = 'F';
    }

}

function getPassengerRowBySelect(select) {
    return select.closest('form');
}
