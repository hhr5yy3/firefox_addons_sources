//Заполнение паспортных данных
window.OPERATOR_NAME = window.location.hostname === 'agency.sunmar.ru' ? "Sunmar" : "Coral";

function injectQuickReservationData(selInsert, func) {
    const panels = querySelectorAll(document, "[id*='create-a-tourist'] #modalBody, .create-payer-modal  #modalBody");
    panels.forEach((panel) => {
        if ( !panel.querySelector(selInsert) ) {
            const modalContent = panel.closest('.modal-content');
            if ( modalContent ) {
                modalContent.style.maxHeight = '660px';
            }
            panel.append(func({
                style: "margin-right: 40px;",
                addTag: "fieldset",
                tagStyle: "float: left",
                selectStyle: "float:left",
                legendStyle: "font-size:initial;"
            }));
        }
        if ( panel.clientHeight === 0 ) {
            panel.querySelector(selInsert) ? panel.querySelector(selInsert).remove() : null;
        }
    });

    const forms = $$('[id^="tourist-form"]')
    for (const form of forms) {
        if (!$1(selInsert, form)) {
            form.append(func({
                style: "margin-right: 6px;",
            }))
        }
    }
}

async function pasteOrderData(tr, data, passport, errors) {
    if ( data.nationality && data.nationality.value ) {
        const nationality = tr.querySelector('[id="nationality"], #citizenship');
        simulateMouseEvent(nationality.querySelector('.true__control'), ['focus', 'mousedown']);
        const nationalityOption = $$('.true__option', nationality).find(nat => data.nationality.value.toLowerCase().match(getText(nat).toLowerCase()))
        if ( nationalityOption ) {
            nationalityOption.click();
        }
        await waitingFor(() => null, 100, 10);
    }
    if ( data.nationalityEng && data.nationalityEng.value ) {
        const country = tr.querySelector('[id="countryOfBirth"]');
        if ( country ) {
            simulateEvent(country.querySelector('.true__control'), ['focus', 'mousedown']);
            const countryOption = $$('.true__option').find(nat => data.nationalityEng.value.toLowerCase().match(getText(nat).toLowerCase()));
            if (countryOption) {
                countryOption.click();
            }
        }
    }

    await waitingFor(() => null, 100, 10)
    const docType = getDocType(tr, passport);
    if ( docType ) {
        const type = tr.querySelector('[id="documentType"]');
        simulateMouseEvent(type.querySelector('.true__control'), ['focus', 'mousedown']);
        const typeOption = $$('.true__option', type).find(opt => docType.toLowerCase().match(getText(opt).toLowerCase()))
        if ( typeOption ) {
            typeOption.click();
        }
    }

    setInputValues(tr, [
            '[name="birthDate"]', customDateToFullString(data.birthday),
            '[name="birthday"]', customDateToFullString(data.birthday),
            '[name="passportGivenDate"]', customDateToFullString(passport.issueDate),
            '[name="passportValidThru"]', customDateToFullString(passport.expire),
            '[name="surName"], [name="surname"]', passport.surname,
            '[name="name"]', passport.name,
            '[name="middleName"], [name="patronymic"]', passport.secondName,
            '[name="documentSeries"]', passport.serial,
            '[name="documentNumber"]', passport.number,
            '[name="passportSerie"]', passport.serial,
            '[name="passportNumber"]', passport.number,
            '[name="issuedby"], [name="authority"]', passport.authority,
            '[name="phoneNumber"], [name="mobilePhone"]', data.phones.mobile,
            '[name="invoiceMail"], [name="email"]', data.email,
            '[name="address"]', data.address
        ], errors, ['click', 'focus', 'input'], [ 'change', 'blur'], true
    );
    const genderW = tr.querySelector('[name="gender"][value="1"]');
    const genderM = tr.querySelector('[name="gender"][value="0"]');
    if (  genderW && genderM ) {
        if (data.sex.value === "2") {
            genderW.click();
        } else {
            genderM.click()
        }
    }

}

function getDocType(div, passport) {
    const select = div.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch ( value ) {
        case "Внутренний паспорт" :
            if ( passport.docType === "birthday_certificate" ) {
                value = "Свидетельство о рождении";
            } else {
                value = "Паспорт РФ";
            }
            break;
        case "Заграничный паспорт":
            value = "Загранпаспорт";
            break;
    }
    return value;
}

function getPassengerRowBySelect(select) {
    return select.closest('#modalBody, [id^="tourist-form"]');
}
