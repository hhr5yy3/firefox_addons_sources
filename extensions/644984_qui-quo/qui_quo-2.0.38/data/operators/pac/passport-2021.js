console.log('passport-2021.js')
window.OPERATOR_NAME = "PAC GROUP";

function injectQuickReservationData(selInsert, func) {
    const heads = $$(".order-person__head");
    heads.forEach(appendSelect);

    const avia = $$('.avia-booking-person.js-passenger, .js-passport-person');
    avia.forEach(appendSelect);
    const room = $$('.room-booking-persons .js-passenger');
    room.forEach(appendSelect)

    function appendSelect(div) {
        if ( !div.querySelector(selInsert) && !div.querySelector(".qq-caption") ) {
            div.prepend(func({
                style: "margin-left: 6px;zoom:0.9",
                selectStyle: "width: auto",
            }));
        }
    }
}

function choosesDocType (div) {
    const select = div.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    const documentTypeElem = $1('[data-type="documentType"]');
    const passportElem = $1('[data-val="Passport"]', documentTypeElem);
    const foreignPassportElem = $1('[data-val="ForeignPassport"]', documentTypeElem);
    if ( !passportElem  || !foreignPassportElem ) {
        return;
    }
    switch (value) {
        case "Внутренний паспорт" :
        case "Свидетельство о рождении" :
            passportElem.click()
            break;
        case "Заграничный паспорт":
            foreignPassportElem.click()
            break;
    }
}

function choosesNationality (data) {
    const nationalityInData = data.nationality.value;
    const nationalityElem = $1('[data-type*="citizenship"] [data-template="JelectOption"]');
    const allPossibleNationalityArray = $$('div', nationalityElem);
    allPossibleNationalityArray.map(div => {
        if (getText(div) === nationalityInData) {
            div.click();
        }
    });
}

function pasteOrderData(div, data, passport, errors) {
    choosesNationality(data);
    choosesDocType(div);
    const number = {value: passport.serial.value + passport.number.value, caption: passport.number.caption}
    const [genderM, genderF] = [$1('input.js-form-gender-input[value="Male"], input.js-form-gender-input[value="male"]', div),
                                $1('input.js-form-gender-input[value="Female"], input.js-form-gender-input[value="female"]', div)];
    const genderInput = $1('input[name*="Gender"]', div);
    if ( data.sex.value === '1' ) {
        if ( genderM ) {
            genderM.click()
        } else if ( genderInput && genderInput.value === 'Female' ) {
            genderInput.click()
        }
    }
    if ( data.sex.value === '2' ) {
        if ( genderF ) {
            genderF.click()
        } else if ( genderInput && genderInput.value === 'Male') {
            genderInput.click()
        }
    }

    setInputValues(div, [
        '[name*="Birthday"], input[data-type="birthday"]', customDateToFullString(data.birthday),
        '[name*="IssueDate"]', customDateToFullString(passport.issueDate),
        '[name*="ExpirationDate"], [name*="DocumentValidThrough"]', customDateToFullString(passport.expire),
        '[name*="LastName"], [data-type="lastname"]', passport.surname,
        '[name*="MiddleName"]:not([name*="MiddleNameRequirement"])', data.secondName,
        '[name*="FirstName"], [data-type="firstname"]', passport.name,
        '[name*="Email"]', data.email,
        '[name*="Phone"]', data.phones.mobile,
    ], errors, ['blur', 'change'], ['focus', 'input'], true)
    setInputValues(div, [
        '[name*="Number"], [name*="DocumentNumber"]', number,
        '[name*="DocumentNumber"]', number
    ], errors, ['input', 'change', 'keydown', 'keyup', 'blur'], ['focus'])
    const passportNumber = getNodeData('[name*="Number"]', div, 'value');
    if  (passportNumber && number.value !== passportNumber.replace(/\D+/g, '') ) {
        setInputValues(div, [
            '[name*="Number"]', {value: '________', caption: passport.number.caption},
        ], errors, ['blur', 'change'], ['focus'], true)
        errors.push(number.caption)
    }

}

function getPassengerRowBySelect(select) {
    return select.closest(".order-person__head, .js-passenger, .js-passport-person");
}
