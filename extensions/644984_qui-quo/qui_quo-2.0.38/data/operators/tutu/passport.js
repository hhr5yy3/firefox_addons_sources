window.OPERATOR_NAME = "TUTU";

function injectQuickReservationData(selInsert, func) {
    $$( '[data-ti="passenger_form"]>div:last-child').forEach(div => {
        if ( div && !div.querySelector(selInsert) ) {
            div.append(func({
                addTag: "div",
                newTagStyle: 'border:1px solid #ccc;border-radius: 6px;padding: 5px;width: 450px;',
                legendStyle: "font-size:12px;font-weight: bold;border:none;margin:0"
            }));
        }
    })
}

async function pasteOrderData(div, data, passport, errors) {
    const switchDocTypeBtn = $first('[data-ti="order-button"]', div);
    const docType = getDocType(div, passport);
    if ( switchDocTypeBtn && getNodeProperty(switchDocTypeBtn) !== docType ) {
        switchDocTypeBtn.click();
        const docTypes = $$('[data-ti="suggest"] [data-ti^="doc_type_"]').filter(t => t.clientHeight > 0);
        const div = docTypes.find( t => getText(t) === docType );
        if ( div ) {
            simulateMouseEvent(div, 'mousedown')
        }
    }
    await waitingFor(()=>null, 50, 2);
    setInputValues(div, [
        'input[data-ti="last_name"]', passport.surname,
        'input[data-ti="first_name"]', passport.name,
        'input[data-ti="middle_name"]', data.secondName,
        'input[data-ti="birth_date"]', customDateToFullString(data.birthday),
        'input[data-ti="doc_number"]', {
            value: passport.serial.value +" "+ passport.number.value, caption: "Серия и номер документа"
        },
        'input[data-ti="input"][type="tel"]', data.phones.mobile,
        '[data-ti="email"] input', data.email,
    ], errors, ["blur"], ["focus", "input", "change"], true);


}

function getPassengerRowBySelect(select) {
    return select.closest('[data-ti="passenger_form"]');
}

function getDocType(div, passport) {
    var select = div.querySelector(".qq-select select");
    var value = select.options[select.selectedIndex].parentNode.label;
    switch ( value ) {
        case "Внутренний паспорт" :
            if ( passport.docType === "birthday_certificate" ) {
                return "Св-во о рождении"
            } else {
                return "Паспорт РФ";
            }
        case  "Заграничный паспорт" :
            return'Загранпаспорт РФ'
    }
    return value;
}

// function mapSex(data) {
//     var sex = data.sex;
//     switch ( sex.value ) {
//         case "1" :
//             sex.value = "Мужской";
//             return sex;
//         case "2" :
//             sex.value = "Женский";
//             return sex;
//         default  :
//             sex.value = "WRONG";
//             return sex;
//     }
// }
