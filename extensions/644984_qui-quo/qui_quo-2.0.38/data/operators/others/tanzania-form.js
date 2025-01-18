window.OPERATOR_NAME = 'Form for Tanzania';

function injectQuickReservationData(selInsert, func) {
    const passportButton = document.querySelector('[data-test="passport-search-button"]');
    if ( passportButton && !document.querySelector(selInsert) ) {
         getPassengerRowBySelect(passportButton).append(createPassportNumberCell(func));
         return;
    }

    const stepper = document.querySelector('traveler-booking-form mat-vertical-stepper');
    if ( stepper && !document.querySelector(selInsert) ) {
        getPassengerRowBySelect(stepper).append(createPassportNumberCell(func));
    }

}

function createPassportNumberCell(func) {
    const newDiv = func({
        addTag: "div",
        legendStyle: 'font-size:12px;'
    });
    document.body.append(newDiv);
    newDiv.style.cssText = `
        position: fixed;
        top: 15%;
        left: 5%;
        z-index: 99999;
        background-color: white;
        padding: 10px;
        font-size:12px;`;
    newDiv.style.top = '10%';
    return newDiv;
}


async function pasteOrderData(div, data, passport, errors) {
    const daysOfStaying = (getDistance(customDateToFullString(data.tourStartDate).value, customDateToFullString(data.tourEndDate).value) || 1)-1;
    setInputValues(div, [
        'input[data-placeholder="passport"]', {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport Number'
        },
        findInput(div, /Surname/i), passport.surname,
        findInput(div, /Other Names/i), passport.name,
        findInput(div, /Traveller's Email/i), data.email,
        findInput(div, /Barua Pepe/i), data.email,
        findInput(div, /Date of birth/i), customDateToFullString(data.birthday, reformatDate),
        findInput(div, /Date of Arrival/i), customDateToFullString(data.tourStartDate, reformatDate),
        findInput(div, /Vessel/i), data.entryFormData.aviaFlightNumber,
        findInput(div, /Hotel name/i), data.hotel.hotelName,
        findInput(div, /Namba ya simu/i), data.phones.mobile,
        findInput(div, /Duration of stay/i), {
            value: daysOfStaying,
            caption: 'Duration of stay'
        }
    ], errors, null, null, true);

    const purposeSelect = findInput(div, /Visiting Purpose/i);
    if (purposeSelect) {
        purposeSelect.click();
        const purposeOption = $$('.mat-select-panel-wrap mat-option').find(opt => getNodeProperty(opt, '').match(/tourist/i));
        purposeOption.click();
    }

    for ( let [selectRegexp, optionRegexp] of [[/Nationality/i, data.nationalityEng.value],
                                               [/Sex/i, mapSex(data)],
                                               [/Mode of Transport/i, /air/i],
                                               [/Visiting Purpose/i, /tourist/i]] ) {

        clickToSelectOption(div, selectRegexp, optionRegexp, errors)
    }
}

function clickToSelectOption(div, selectRegexp, optionRegexp, errors) {
    if (!selectRegexp) {
        return errors.push(selectRegexp);
    }
    const select = findInput(div, selectRegexp);
    if ( !select ) {
        return;
    }
    select.click();
    const option = $$('.mat-select-panel-wrap mat-option').find(opt => getNodeProperty(opt, '').match(optionRegexp));
    option.click();
}

function findInput(div, regex) {
    const fields = $$('mat-form-field', div).map(mat =>  mat.parentNode);
    const result = fields.find(f => getNodeProperty(f.querySelector('p'), '').match(regex));
    return result ? result.querySelector('input, mat-select') : null;
}

function getPassengerRowBySelect(select) {
    const passportButton = document.querySelector('[data-test="passport-search-button"]');
    if ( passportButton ) {
        return passportButton.parentNode;
    }
    return select.closest('mat-vertical-stepper');
}

function mapSex(data) {
    if ( data.sex.value === '1' ) {
        return "Male";
    }
    if (data.sex.value === '2') {
        return "Female";
    }
    return "None";
}

// "21.08.1987" -> "08/21/1987"
function reformatDate(date) {
    const parts = date.split('.');
    return parts[1] + '/' + parts[0] + '/' + parts[2];
}
