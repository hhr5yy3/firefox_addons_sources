window.OPERATOR_NAME = "Белый лебедь";

/**
 * Add quick login form
 * @param {string} selInsert Selector.
 * @param {function} createCell Callback createGuide or createCell.
 * @returns {void}
 */
function injectQuickReservationData(selInsert, createCell) {
    const forms = $$('form.inptur')
    for (const form of forms) {
        if (!$1(selInsert, form)) {
            form.append(createCell({
                style: "margin-right: 6px;",
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
    setSelectIndex(form, [
        'select[id^="tipdok"]', getDocType(form, passport),
        'select[id^="country"]', data.nationality], errors)
    setInputValues(form, [
        'input[name^="fio"]', passport.fio,
        'input[name^="dr"]', customDateToFullString(data.birthday),
        ], errors
    );

    const genderBtn = $1(`[id="${mapSex(data.sex)}"]`, form);
    if (genderBtn) {
        genderBtn.click()
    }
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
                value = "Паспорт гражданина РФ";
            }
            break;
        case "Заграничный паспорт" :
            value = "Заграничный паспорт гражданина РФ";
            break;
    }
    return {
        value: value,
        caption: "Тип документа"
    };
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return "gen1";
        case "2" :
            return "gen2";
        default  :
            return "WRONG";
    }
}

/**
 * Add quick login form
 * @param {HTMLElement} select Select node.
 * @returns {Node} passenger form
 */
function getPassengerRowBySelect(select) {
    return select.closest('form.inptur')
}
