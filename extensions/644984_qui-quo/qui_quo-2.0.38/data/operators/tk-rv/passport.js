window.OPERATOR_NAME = "РусВояж";

/**
 * Add quick login form
 * @param {string} selInsert Selector.
 * @param {function} createCell Callback createGuide or createCell.
 * @returns {void}
 */
function injectQuickReservationData(selInsert, createCell) {
    const forms = $$('.modal-bron-cell .modal-bron-form')
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
    setInputValues(form, [
            'input[placeholder="Ф.И.О."]', passport.fio,
            'input[placeholder="Дата рождения"]', customDateToFullString(data.birthday),
            'input[placeholder="Телефон"]', data.phones.mobile,
            'input[placeholder="E-mail"]', data.email,
            'input[placeholder="Серия паспорта/свидетельства"]', passport.serial,
            'input[placeholder="Номер документа"]', passport.number,
            'input[placeholder="Дата выдачи"]', customDateToFullString(passport.issueDate),
            'input[placeholder="Кем выдан документ"]', passport.authority,
            'input[placeholder="Адрес"]', data.address,
        ], errors
    );
}

/**
 * Add quick login form
 * @param {HTMLElement} select Select node.
 * @returns {Node} passenger form
 */
function getPassengerRowBySelect(select) {
  return  select.closest('.modal-bron-form')
}
