//Заполнение паспортных данных
window.OPERATOR_NAME = "ETO.TRAVEL";

function injectQuickReservationData(selInsert, func) {
    $$( ".tourist ").forEach((tourist) => {
        if ( !tourist.querySelector(selInsert) ) {
            tourist.append(func({
                addTag: "div",
                style: 'font-size:12px',
                legendStyle: 'font-size:12px'
            }));
        }
    });
}

function pasteOrderData(div, data, passport, errors) {
    setSelectIndex(div, ["select[ng-change*='changeDocumentType']", getDocType(div, passport)], errors)
    setInputValues(div, [
        "input[name*='lastName']", data.nationalPassport.surname,
        "input[name*='firstName']", {
            caption: 'Имя отчество', value: data.nationalPassport.name.value + ' ' + data.nationalPassport.secondName.value
        },
        "input[name*='document_series']", passport.serial,
        "input[name*='document_number']", passport.number,
        '[name*="birthday"] input', customDateToFullString(data.birthday),
        '[tb-model-date*="issDate"] input', customDateToFullString(passport.issueDate),
        '[tb-model-date*="expDate"] input', customDateToFullString(passport.expire)
    ], errors, ['change', 'blur'], ['focus', 'input'], true);

    const btnTrans = $1('.btn.trans', div);
    if ( btnTrans ) {
        btnTrans.click();
    }

    if ( getDocType(div, passport).value === "Заграничный паспорт РФ" ) {
        setInputValues(div, [
            "input[name*='lastLName']", data.internationalPassport.surname,
            "input[name*='firstLName']", {
                caption: 'Имя отчество',
                value: data.internationalPassport.name.value + ' ' + data.internationalPassport.secondName.value
            }
        ], errors, ['change', 'blur'], ['focus', 'input'], true);
    }

    if ( getDocType(div, passport).value === "Свидетельство о рождении РФ" ) {
        const serial = passport.number.value.match(/\D+/) || [''];
        const number = passport.number.value.match(/\d+/) || [''];
        setInputValues(div, [
            "input[name*='document_series']", {value: serial[0].replace(/-|№/g, ''), caption: 'Серия'},
            "input[name*='document_number']", {value: number[0], caption: 'Номер'},
        ], errors, ['change', 'blur'], ['focus', 'input'], true);
    }

    const genderBtn = $1(`[name*="${mapSex(data.sex)}"]`, div);
    if ( genderBtn ) {
        genderBtn.click()
    }
}

function getPassengerRowBySelect(select) {
    return select.closest('.tourist');
}

function mapSex(sex) {
    switch ( sex.value ) {
        case "1" :
            return "man";
        case "2" :
            return "woman";
        default  :
            return "WRONG";
    }
}

function getDocType(form, passport) {
    const select = form.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch ( value ) {
        case "Внутренний паспорт" :
            if ( passport.docType === "birthday_certificate" ) {
                value = "Свидетельство о рождении РФ"
            }
            if ( passport.docType === "passport" ) {
                value = "Паспорт РФ";
            }
            break;
        case "Заграничный паспорт" :
            value = "Заграничный паспорт РФ";
            break;
        case "Свидетельство о рождении" :
            value = "Свидетельство о рождении РФ"
            break;
    }
    return {
        value: value,
        caption: "Тип документа"
    };
}
