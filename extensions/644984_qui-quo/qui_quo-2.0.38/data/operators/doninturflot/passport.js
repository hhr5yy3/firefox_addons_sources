window.OPERATOR_NAME = "Донинтурфлот";
/**
 * Add quick login form
 * @param {string} selInsert Selector.
 * @param {function} createCell Callback createGuide or createCell.
 * @returns {void}
 */
function injectQuickReservationData(selInsert, createCell) {
    const forms = $$('#add-tourist-form, div[id*="tourist_"]')
    for (const form of forms) {
        if (!$1(selInsert, form)) {
            form.prepend(createCell({
                style: "margin-right: 6px;",
                legendStyle: 'font-size: 14px;margin-bottom:6px'
            }))
        }
    }
}

/**
 * Add quick login form
 * @param {HTMLElement} form Passenger form element.
 * @param {Object} data Full passenger data.
 * @param {Object} passport Passport passenger data.
 * @param {String[]} errors Errors array. Warn: It's a mutating array.
 * @returns {void}
 */
function pasteOrderData(form, data, passport, errors) {
    setSelectIndex(form, ['select[id*="DOCUMENT_TYPE"]', getDocType(form, passport)], errors)

    setInputValues(form, [
            'input[id*="LASTNAME"]', passport.surname,
            'input[id*="FIRSTNAME"]', passport.name,
            'input[id*="PATRONYMIC"]', passport.secondName,
            'input[id*="BIRTHDATE"]', {
                value: `${data.birthday.value.year}-${data.birthday.value.month}-${data.birthday.value.day}`,
                caption: 'Дата рождения'
            },
            'input[id*="DOCUMENT_NUMBER"]', passport.fullNumber,
            'input[id*="-PHONE"]', data.phones.mobile,
            'input[id*="EMAIL"]', data.email
        ], errors
    );
}

function getDocType(form, passport) {
    const select = form.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            if (passport.docType === "birthday_certificate") {
                value = "Свидетельство о рождении"
            }

            if (passport.docType === "passport") {
                value = "Паспорт РФ";
            }
            break;
        case "Заграничный паспорт" :
            value = "Заграничный паспорт РФ";
            break;
    }
    return {
        value: value,
        caption: "Тип документа"
    };
}

/**
 * Add quick login form
 * @param {HTMLElement} select Select node.
 * @returns {Node} passenger form
 */
function getPassengerRowBySelect(select) {
    return select.closest('#add-tourist-form, [id*="tourist_"]')
}
