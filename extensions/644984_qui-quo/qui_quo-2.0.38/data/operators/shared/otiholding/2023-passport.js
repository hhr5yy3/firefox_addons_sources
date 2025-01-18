//Заполнение паспортных данных
window.OPERATOR_NAME = window.location.hostname === 'agency.sunmar.ru' ? "Sunmar" : "Coral";

/**
 * Add quick login form
 * @param {string} selInsert Selector.
 * @param {function} createCell Callback createGuide or createCell.
 * @returns {void}
 */
function injectQuickReservationData(selInsert, createCell) {
    const forms = $$('[id^="tourist-form"]')
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
async function pasteOrderData(tr, data, passport, errors) {
    if (data.nationality && data.nationality.value) {
        const nationality = tr.querySelector('[id="nationality"]');
        simulateMouseEvent(nationality.querySelector('.true__control'), ['focus', 'mousedown']);
        const nationalityOption = $$('.true__option', nationality).find(nat => data.nationality.value.toLowerCase().match(getText(nat).toLowerCase()))
        if (nationalityOption) {
            nationalityOption.click();
        }
        await waitingFor(() => null, 100, 10);
    }
    if (data.nationalityEng && data.nationalityEng.value) {
        const country = tr.querySelector('[id="countryOfBirth"]');
        simulateEvent(country.querySelector('.true__control'), ['focus', 'mousedown']);
        const countryOption = $$('.true__option').find(nat => data.nationalityEng.value.toLowerCase().match(getText(nat).toLowerCase()));
        if (countryOption) {
            countryOption.click();
        }
    }

    await waitingFor(() => null, 100, 10)
    const docType = getDocType(tr, passport);
    if (docType) {
        const type = tr.querySelector('[id="documentType"]');
        simulateMouseEvent(type.querySelector('.true__control'), ['focus', 'mousedown']);
        const typeOption = $$('.true__option', type).find(opt => docType.toLowerCase().match(getText(opt).toLowerCase()))
        if (typeOption) {
            typeOption.click();
        }
    }

    setInputValues(tr, [
            '[name="birthDate"]', customDateToFullString(data.birthday),
            '[name="passportGivenDate"]', customDateToFullString(passport.issueDate),
            '[name="passportValidThru"]', customDateToFullString(passport.expire),
            '[name="surName"]', passport.surname,
            '[name="name"]', passport.name,
            '[name="middleName"]', passport.secondName,
            '[name="passportSerie"]', passport.serial,
            '[name="passportNumber"]', passport.number,
            '[name="issuedby"]', passport.authority,
            '[name="phoneNumber"]', data.phones.mobile,
            '[name="invoiceMail"]', data.email,
            '[name="address"]', data.address
        ], errors, ['click', 'focus', 'input', 'change', 'blur']
    );
    const genderW = tr.querySelector('[name="gender"][value="1"]');
    const genderM = tr.querySelector('[name="gender"][value="0"]');
    if (data.sex.value === "2") {
        genderW.click();
    } else {
        genderM.click()
    }

}
/**
 * Add quick login form
 * @param {HTMLElement} select Select node.
 * @returns {Node} passenger form
 */
function getPassengerRowBySelect(select) {
    return select.closest('[id^="tourist-form"]')
}
