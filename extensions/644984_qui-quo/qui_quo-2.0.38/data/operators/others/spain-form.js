window.OPERATOR_NAME = 'Form for Spain';

function injectQuickReservationData(selInsert, func) {
    if (document.querySelector(selInsert) ) {
        return;
    }
    const form = $$('form').find(form => form.querySelector('#surname, #flight, #idCard, #cvdBirthdate'));
    if (form) {
        const wrapper = func({
            addTag: "div",
            legendStyle: 'font-size:12px;'
        });
        const qqContainer = createQRContainer( wrapper);
        qqContainer.classList.add(selInsert.replace('.', ''))
        const pasteAgainBtn = document.createElement('button');
        pasteAgainBtn.textContent = 'Вставить данные еще раз';
        pasteAgainBtn.classList.add('qq-paste-again-btn');
        pasteAgainBtn.style.display = 'none';
        qqContainer.appendChild(pasteAgainBtn);

        form.append(qqContainer)
    }
}

async function pasteOrderData(div, data, passport, errors) {
    const pasteAgainBtn = document.querySelector('.qq-paste-again-btn');
    if ( pasteAgainBtn ) {
        pasteAgainBtn.style.display = 'initial';
        pasteAgainBtn.onclick = ()=> pasteOrderData(div, data, passport, errors);
    }
    const agencyPhone = data.phones.mobile.value.replace(/\D+/g, '');
    const touristPhone = data.entryFormData.originalPhones.mobile.value.replace(/\D+/g, '');
    setInputValues(div, [
        '#surname', passport.surname,
        '#name', passport.name,
        '#cvdSurname', passport.surname,
        '#cvdName', passport.name,
        '#idCard', {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport Number'
        },
        '#flight', data.entryFormData.aviaFlightNumber, '#email', data.email,
        '#birthdate', customDateToFullString(data.birthday, reformatDate),
        '#arrivalDate', customDateToFullString(data.tourStartDate, reformatDate),
        '#confirmEmail', data.email,
        '#phoneBody', {value: touristPhone.length > 11 ? touristPhone.slice(-9) : touristPhone.slice(-10), caption: 'Mobile phone'},
        '#phone2Body', {
            value: agencyPhone.length > 11 ? agencyPhone.slice(-9) : agencyPhone.slice(-10),
            caption: 'Mobile phone'
        },
        '#accommodationName', {value: data.hotel?.hotelName?.value.replace(/[^A-z ]/g, ''), caption: 'Hotel Name'},
    ], errors, null, null, true);

    const gender = $$('input[name="sexGroup"]', div)
        .find(input => input.value === data.sex.value);

    if (gender) {
        gender.click();
    }

    setPhone(touristPhone, '[inputid="phonePrefix"]');
    setPhone(agencyPhone, '[formcontrolname="phone2Prefix"]');

    const birthdayInput = div.querySelector('#birthdate, #cvdBirthdate');
    datepickerSetValue(data.birthday.value, birthdayInput, errors, 'Дата рождения');

    const arrivalInput = div.querySelector('#arrivalDate');
    datepickerSetValue(data.tourStartDate.value, arrivalInput, errors, 'Дата прибытия')

}

function setPhone(phone, sel) {
    let prefix = phone.length > 11 ? phone.slice(0, -9) : phone.slice(0, -10);
    if (prefix) {
        prefix = '+' + prefix.replace(/\D+/g, '');
        const dropdown = document.querySelector(sel);
        if (dropdown) {
            const btn = dropdown.querySelector('[role="button"]');
            if (btn) {
                btn.click();
                const code = $$('[role="option"]', dropdown).find(opt => getText(opt).replace(/[A-z]|\s+/gi, '') === prefix);
                if (code) {
                    code.click();
                }
            }
        }
    }
}

function datepickerSetValue({day, month, year}, input, errors, caption) {
    try {
        if (!input) {
            return;
        }
        input.click();
        const calendar = input.closest('p-calendar');
        const yearSelect = calendar.querySelector('.ui-datepicker-year');
        yearSelect.value = year;
        simulateEvent(yearSelect, 'change');

        const monthSelect = calendar.querySelector('.ui-datepicker-month');
        monthSelect.value = (parseInt(month) - 1);
        simulateEvent(monthSelect, 'change');

        const days = $$('.ui-datepicker-calendar  td>a', calendar).find(a => getText(a) === String(parseInt(day)));
        days.click();

    } catch (e) {
        errors.push(caption);
    }
}


function getPassengerRowBySelect(select) {
    return select.closest('form');
}

// "21.08.1987" -> "1987/08/21"
function reformatDate(date) {
    return date.split('.').reverse().join('/');
}
