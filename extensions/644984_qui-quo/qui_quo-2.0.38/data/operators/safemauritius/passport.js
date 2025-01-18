window.OPERATOR_NAME = 'Form for safemauritius';
console.log(`Loaded ${OPERATOR_NAME}`)

function injectQuickReservationData(selInsert, func) {
    $$('moh-step-two-personal-information').forEach(wizard => {
        if (wizard && !wizard.querySelector(selInsert)) {
            wizard.append(func({
                addTag: "div",
                style: "padding-right: 2rem;padding-left: 2rem;"
            }));
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
     setInputValues(div, [
        'input[formcontrolname="lastName"]', passport.surname,
        'input[formcontrolname="firstName"', passport.name,
        'input[formcontrolname="middleName"]', passport.secondName,
        'input[formcontrolname="passportNumber"]', passport.fullNumber,
        'input[formcontrolname="email"]', data.email,
        'textarea[formcontrolname="permanentAddress"]', data.address,
        'input[formcontrolname="nationality"]', data.nationalityEng,
        'input[formcontrolname="dob"]', customDateToFullString(data.birthday, reformatDate),
        'input[type="tel"]', data.phones.mobile
    ], errors, ['click', 'focus', 'input', 'keyup', 'blur']);
    clickToSelectOption(data.nationalityEng, errors)
    const genderSelect = $$('mat-label').find(l => getText(l).match(/Gender|Sexe/i));
    if (genderSelect ) {
        genderSelect.click();
        clickToSelectOption({value: mapSex(data.sex), caption: 'Пол'}, errors)
    }
    }


function clickToSelectOption(obj, errors) {
    const option = $$('mat-option').find(opt => getNodeProperty(opt, '').match(obj.value));
    if (option) {
        option.click();
    } else {
        errors.push(obj.caption)
    }
}


function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return /^male/i;
        case "2" :
            return /female/i;
    }
    return "";
}

function getPassengerRowBySelect(select) {
    return select.closest('moh-step-two-personal-information');
}

// "21.08.1987" -> "08/21/1987"
function reformatDate(date) {
    return date.replace('.', '/');
}
