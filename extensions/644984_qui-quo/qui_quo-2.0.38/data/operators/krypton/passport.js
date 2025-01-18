window.OPERATOR_NAME = "Krypton";

function injectQuickReservationData(selInsert, func) {
    $$('.cart-tourist-item').forEach(person => {
        if ( person && !person.querySelector(selInsert) ) {
            person.append(func({
                style: "font-size:13px;padding: 18px;",
                legendStyle: "font-size:13px;margin-bottom:8px;font-weight:bold;"
            }));
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    setSelectIndex(div, [
        'select[data-bind*="availableCitizenships"]', data.nationality,
    ], errors)

    await waitingFor(()=>null, 2, 100);
    setSelectIndex(div, [
        'select[data-bind*="selectPicker: documentType"]', getDocType(div, passport)
    ], errors)

    setInputValues(div, [
        'input[data-bind*="textInput:lastName"]', passport.surname,
        'input[data-bind*="textInput:firstName"]', passport.name,
        'input[data-bind*="textInput: middleName"]', passport.secondName,
        'input[data-bind*="value:birthday"]', customDateToFullString(data.birthday),
        'input[data-bind*="value:russianPassportDate"]', customDateToFullString(passport.issueDate),
        'input[data-bind*="value:foreignPassportValidTo"]', customDateToFullString(passport.expire),
        'input[data-bind*="textInput:russianPassportSeries"]', passport.serial,
        'input[data-bind*="textInput:russianPassportNumber"]', passport.number,
        'input[data-bind*="textInput:foreignPassportSeries"]', passport.serial,
        'input[data-bind*="textInput:foreignPassportNumber"]', passport.number,
        'input[data-bind*="birthCertSerial"]', {
            value: passport.number.value.slice(0,-6), caption: 'Свидетельство о рождении'
        },
        'input[data-bind*="birthCertNumber"]', {value: passport.number.value.slice(-6), caption: 'Свидетельство о рождении'}
    ], errors,[], [], true);

    const [man, woman] = $$('input[title="М"], input[title="Ж"]',div);
    if ( data.sex.value === "1" ) {
        man.click();
    }
    if ( data.sex.value === "2" ) {
        woman.click();
    }

}

function getDocType(form, passport) {
    const select = form.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch ( value ) {
        case "Внутренний паспорт" :
            if ( passport.docType === "birthday_certificate" ) {
                value = "Св-во о рождении"
            }

            if ( passport.docType === "passport" ) {
                value = "Паспорт РФ";
            }
            break;
        case "Заграничный паспорт" :
            value = "Загранпаспорт";
            break;
    }
    return {
        value: value,
        caption: "Тип документа"
    };
}

function getPassengerRowBySelect(select) {
    return select.closest('.cart-tourist-item');
}
