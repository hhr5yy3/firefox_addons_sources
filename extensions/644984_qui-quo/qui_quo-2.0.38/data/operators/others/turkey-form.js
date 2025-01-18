window.OPERATOR_NAME = 'Form for Entry to Turkey';

function injectQuickReservationData(selInsert, func) {
   $$('.form-wizard .wizard-fieldset').forEach(wizard => {
       if (wizard && !wizard.querySelector(selInsert)) {
           wizard.append(func({
               addTag: "div",
               style: "padding-right: 2rem;padding-left: 2rem;"
           }));
       }
   });
}

async function pasteOrderData(div, data, passport, errors) {
    const findFieldset = (label) => $$('fieldset', div).find(fs => getNodeProperty(fs.querySelector('legend'), '').match(label));
    const findElemInFieldset = (label, sel) => {
        const fl = findFieldset(label);
        return fl ? fl.querySelector(sel) : null;
    }

    const arrivalDate = findElemInFieldset(/Arrival Date|Дата прибытия/i, 'input');
    const birthdayDate = findElemInFieldset(/Birth Date|День рождения|Год рождения/i, 'input');

    await datepickerSetValue(data.birthday.value, birthdayDate, errors, data.birthday.caption);
    await datepickerSetValue(data.tourStartDate.value, arrivalDate, errors, data.tourStartDate.caption);

    const entryType = $$('li span', findElemInFieldset(/Entry Type|Тип выезда|тип въездa/i, 'ul'))
        .find(span => getText(span).match(/airway|самол.т/i));

    entryType ? entryType.click() : null;
    setInputValues(div, [
        findElemInFieldset(/Flight Number|Номер рейса/i, 'input'), data.entryFormData.aviaFlightNumber,
        findElemInFieldset(/Transportation Company Name|Название компании/i, 'input'), data.entryFormData.aviaCompany,
        findElemInFieldset(/^name|имя/i, 'input'), passport.name,
        findElemInFieldset(/Surname|фамилия/i, 'input'), passport.surname,
        findElemInFieldset(/^Адрес|address/i, 'textarea'), data.hotel.hotelName,
        findElemInFieldset(/Passport Number|номер паспорта/i, 'input'), {
            value: passport.serial.value + passport.number.value,
            caption: "Серия и номер документа"
        },
        findElemInFieldset(/E-mail\s*Address|почты/i, 'input'), data.entryFormData.emailOriginal,
        findElemInFieldset(/phone|телефонный/i, 'input'), data.entryFormData.originalPhones.mobile
    ], errors, ['click', 'focus', 'input', 'keyup', 'blur']);

    const gender = $$('li span',findElemInFieldset(/gender|Пол /i, 'ul'))
        .find( span => getText(span).match(mapSex(data.sex)));

    if ( gender ) {
        gender.click();
    }
    const nationality = $$('li span', findElemInFieldset(/Nationality|национальность/i, 'ul'))
        .find(span => getText(span).match(data.nationalityEng.value));
    if ( nationality && !nationality.classList.contains('multiselect__option--selected') ) {
        nationality.click();
        nationality.click();
    }
    const place = $$('li span', findElemInFieldset(/location|проживания/i, 'ul'))
        .find(span => getText(span).match(data.nationalityEng.value));
    if ( place && !place.classList.contains('multiselect__option--selected') ) {
        place.click();
        place.click();
    }
    await waitingFor(()=>null, 2, 100);
    setInputValues(div, [
        findElemInFieldset(/Flight Number|Номер рейса/i, 'input'), data.entryFormData.aviaFlightNumber,
    ], errors, ['click', 'focus', 'input', 'keyup', 'blur']);
}

async function datepickerSetValue({day, month, year}, input, errors, caption) {
    try {
        input.click();
        const calendar = input.closest('.vdp-datepicker');

        $first('.day__month_btn', calendar).click();
        for ( let i = new Date().getFullYear(); i > year; i-- ) {
            await waitingFor(() => null, 10, 1);
            $$('.prev', calendar).find(n => n.clientHeight > 0).click();
        }

        await waitingFor(() => null, 10, 1);
        $$('.cell.month', calendar).filter(n => n.clientHeight > 0)[month - 1].click();
        await waitingFor(() => null, 10, 1);
        $$('.cell.day:not(.blank)', calendar).filter(n => n.clientHeight > 0)[day - 1].click();
    } catch(e) {
          errors.push(caption);
    }
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return /^male|мужской/i;
        case "2" :
          return /female|женский/i;
    }
    return "";
}

function getPassengerRowBySelect(select) {
    return select.closest('.wizard-fieldset');
}
