window.OPERATOR_NAME = "Инфофлот";

/**
 * Add quick login form
 * @param {string} selInsert Selector.
 * @param {Function} createCell Callback createGuide or createCell.
 * @returns {void}
 */
function injectQuickReservationData(selInsert, createCell) {
    const forms = $$('[name*="last_name"]').map(input => input.closest('.modal-body'))
    for (const form of forms) {
        if (!$1(selInsert, form)) {
            form.append(createCell({
                style: "margin-right: 6px;",
                legendStyle: 'font-size: 12px;line-height:12px;margin-bottom:6px'
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
            'input#passenger-last-name', passport.surname,
            'input#passenger-first-name', passport.name,
            'input#passenger-middle-name', passport.secondName,
            'input#passenger-birthday', customDateToFullString(data.birthday),
            'input#passenger-passport-series', passport.serial,
            'input#passenger-passport-number', passport.number,
            'input#passenger-passport-issued-date', customDateToFullString(passport.issueDate),
            'input#passenger-passport-issued', passport.authority,
        ], errors
    );
}

/**
 * Add quick login form
 * @param {HTMLElement} select Select node.
 * @returns {Node} passenger form
 */
function getPassengerRowBySelect(select) {
    return select.closest('.modal-body')
}
