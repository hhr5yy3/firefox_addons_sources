window.OPERATOR_NAME = "Волгаплёс";

/**
 * Add quick login form
 * @param {string} selInsert Selector.
 * @param {function} createCell Callback createGuide or createCell.
 * @returns {void}
 */
function injectQuickReservationData(selInsert, createCell) {
    const forms = $$('input[name^="dd"]').map(input => input.closest('.msg'))
    for (const form of forms) {
        if (!$1(selInsert, form)) {
            form.append(createCell({
                style: "margin-left: 6px;",
                selectStyle: 'width: 270px'
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
    const docType = getDocType(form, passport)
    const docText =
        {value: `${docType}, серия: ${passport.serial.value}, номер: ${passport.number.value}, дата выдачи: ${customDateToFullString(passport.issueDate).value}, выдан:  ${passport.authority.value} ${passport.authorityCode.value}`, caption: 'Документ'}
    setInputValues(form, [
            'input[name^="name"]', passport.fio,
            'input[name^="phone"]', data.phones.mobile,
            'input[name^="dd"]', {value: String(data.birthday.value.day).padStart(2, '0'), caption: 'День рождения'},
            'input[name^="mm"]', {value: String(data.birthday.value.month).padStart(2, '0'), caption: 'Месяц рождения'},
            'input[name^="yyyy"]', {value: String(data.birthday.value.year), caption: 'год рождения'},
            'textarea[name^="doc"]',docText,
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
                value = "Паспорт";
            }
            break;
        case "Заграничный паспорт" :
            value = "Заграничный паспорт";
            break;
    }
    return value
}

/**
 * Add quick login form
 * @param {HTMLElement} select Select node.
 * @returns {Node} passenger form
 */
function getPassengerRowBySelect(select) {
    return select.closest('.msg')
}
