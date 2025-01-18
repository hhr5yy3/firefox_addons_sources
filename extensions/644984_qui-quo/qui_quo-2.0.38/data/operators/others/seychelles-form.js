window.OPERATOR_NAME = 'Form for Seychelles';

function injectQuickReservationData(selInsert, func) {
    if (document.querySelector(selInsert)) {
        return;
    }
    const form = document.querySelector('app-user-information');
    if (form) {
        const wrapper = func({
            addTag: "div",
            legendStyle: 'font-size:12px;'
        });
        const qqContainer = createQRContainer(wrapper);
        qqContainer.classList.add(selInsert.replace('.', ''));
        qqContainer.style.color = 'black';
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
    if (pasteAgainBtn) {
        pasteAgainBtn.style.display = 'initial';
        pasteAgainBtn.onclick = () => pasteOrderData(div, data, passport, errors);
    }
    const touristPhone = data.entryFormData.originalPhones.mobile.value.replace(/\D+/g, '');
    setSelectValue(data.nationalityEng.value, div.querySelector('.select-countries ng-select'))
    $$('.select-countries ng-select').forEach(select => setSelectValue(data.nationalityEng.value, select))
    setPhone(touristPhone, div.querySelector('.phone-number-container ng-select'));

    setInputValues(div, [
        'input.country-code-input', {
            value: touristPhone.length > 11 ? touristPhone.slice(-9) : touristPhone.slice(-10),
            caption: 'Mobile phone'
        },
        'input.email-field', data.email,
        'input.flight-number', data.entryFormData.aviaFlightNumber,
    ], errors, ['blur'], ['keyup'], true);


    setDate('input[placeholder="Expected arrival date in the Seychelles"]', data.tourStartDate, errors)
    await waitingFor(()=>null, 150, 2);
    setDate('input[placeholder="Departure Date"]', data.tourEndDate, errors)
    await waitingFor(() => null, 150, 2);
    setDate('input[placeholder="From Date"]', data.tourStartDate, errors)
    await waitingFor(() => null, 150, 2);
    setDate('input[placeholder="To Date"]', data.tourEndDate, errors)
}

function setPhone(phone, select) {
    let prefix = phone.length > 11 ? phone.slice(0, -9) : phone.slice(0, -10);
    if (prefix) {
        prefix = '+' + prefix.replace(/\D+/g, '');
        setSelectValue(prefix, select);
    }
}

function setDate(selector, date,  errors) {
    try {
        const select = document.querySelector(selector)
        select.click();
        const calendarInput = document.querySelector('.ant-calendar-date-input-wrap ' + selector);
        setInputValues(document, [
            calendarInput, customDateToFullString(date, reformatDate)
        ], errors, ['blur'], ['keyup'], true);
        const picker = calendarInput.closest('.ant-calendar-panel').querySelector('.ant-calendar-date[aria-selected="true"]')
        picker.click();
    } catch(e) {
        console.log(e);
    }
}

function setSelectValue(value, select) {
    if ( select ) {
        const searchInput = select.querySelector('input');
        simulateEvent(searchInput, 'input');
        const options = $$('.ng-option', select);
        const option = options.find(opt => getText(opt).match(new RegExp(value.replace('+', '\\+'), 'i')));
        if (option) {
            option.click();
        }
    }
}

function getPassengerRowBySelect(select) {
    return select.closest('app-user-information');
}

// "21.08.1987" -> "1987-08-21"
function reformatDate(date) {
    return date.split('.').reverse().join('-');
}
