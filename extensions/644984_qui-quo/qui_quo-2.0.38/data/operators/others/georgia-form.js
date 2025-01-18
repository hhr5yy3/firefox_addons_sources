window.OPERATOR_NAME = 'Form for Georgia';

function injectQuickReservationData(selInsert, func) {
    const form = document.querySelector('.crm-webform-body');
    if (form) {
        if (!document.querySelector(selInsert)) {
            form.prepend(func({
                addTag: "div"
            }));
        }
    }
}

async function pasteOrderData(div, data, passport, errors) {
    const rows = $$('#bxform div.row');
    const findInputByText = (caption) => {
        const row = rows.find(row => {
            const label = getNodeProperty(row.querySelector('.crm-webform-label-title label'));
            return label ? label.match(caption) : null;
        })
        return row.querySelector('input.crm-webform-input, select.crm-webform-input');
    }

    setInputValues(div, [
        findInputByText(/Name Surname/i), { value: passport.name.value + ' ' + passport.surname.value, caption: 'Name Surname' },
        findInputByText(/Passport Number/i), {value: passport.serial.value + passport.number.value, caption: 'Passport Number'},
        findInputByText(/Alternative Phone Number/i), data.phones.mobile,
        findInputByText(/Phone Number/i), data.entryFormData.originalPhones.mobile,
        findInputByText(/E-mail/i), data.email,
        findInputByText(/The address of the accommodation/i), data.hotel.hotelName
    ], errors, );

    setSelectIndex(div, [
        findInputByText(/Nationality/i), data.nationalityEng,
        findInputByText(/Country of residence/i), data.nationalityEng,
        findInputByText(/Port of Departure/i), data.nationalityEng
    ], errors)
}

function getPassengerRowBySelect(select) {
    return select.closest('.crm-webform-body');
}
