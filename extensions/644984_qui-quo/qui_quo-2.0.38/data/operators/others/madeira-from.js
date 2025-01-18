window.OPERATOR_NAME = 'Form for Madeira';

function injectQuickReservationData(selInsert, func) {
    const form = document.querySelector('form.simple-form');
    if (form) {
        if (!document.querySelector(selInsert)) {
            form.prepend(func({
                addTag: "div",
                newTagStyle: 'margin:16px',
                tagStyle: 'margin:16px'
            }));
        }
    }
}

async function pasteOrderData(div, data, passport, errors) {
    const touristPhone = data.entryFormData.originalPhones.mobile.value.replace(/\D+/g, '');
    const rows = $$('.ra-input .MuiBox-root, .ra-input .MuiTextField-root');
    const findInputByText = (caption) => {
        const row = rows.find(row => {
            const label = getNodeProperty(row.querySelector('label'));
            return label ? label.match(caption) : null;
        })
        return row ? row.querySelector('input') : null;
    }
    setInputValues(div, [
        'input#name', {
            value: passport.name.value + ' ' + passport.surname.value,
            caption: 'Name Surname'
        },
        'input#CC', {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport number'
        },
        'input#mobile_number', {
            value: touristPhone.length > 11 ? touristPhone.slice(-9) : touristPhone.slice(-10),
            caption: 'Mobile phone'
        },
        'input#email', data.email,
        'input#vehicle_name', data.entryFormData.aviaFlightNumber,
        findInputByText(/Arrival date in Madeira Islands/i), customDateToFullString(data.hotel.dateStart, reformatDate),
        findInputByText(/Date of departure from Madeira Islands/i), customDateToFullString(data.hotel.dateEnd, reformatDate),
        findInputByText(/Birthday/), customDateToFullString(data.birthday, reformatDate)
    ], errors, ['blur'], ['focus', 'input'], true);
    setTextAreaValues(div, [
        'textarea#address', data.hotel.hotelName
    ], errors, ['blur'], ['focus', 'input'], true);

    const prefixNode = div.querySelector('#country-menu-button');
    if (prefixNode) {
        prefixNode.nextElementSibling.click();
        await waitingFor(() => null, 2, 50);
        const countries = $$('.country-name');
        const country = countries.find(c => getText(c).toLocaleLowerCase() === data.nationalityEng.value.toLocaleLowerCase());
        if (country) {
            country.click();
        }
    }

    for (let [input, obj] of [
        [div.querySelector('[id^="origin_country"]'), data.nationalityEng],
        [div.querySelector('#professional_area'), {value: 'Tourist', caption: 'Traveler Type'}],
        [div.querySelector('#arriving_by'), {value: 'Plane', caption: 'Mean of transport'}],
        [div.querySelector('#gender'), {value: mapSex(data.sex.value), caption: 'Gender'}]
    ]) {
        if (input) {
            await waitingFor(() => null, 50, 2);
            fillSelectInput(input, obj, errors);
        }
    }
    await setDatePickerValue(findInputByText(/Arrival date in Madeira Islands/i), customDateToFullString(data.hotel.dateStart), errors, 'Arrival date in Madeira Islands');
    await setDatePickerValue(findInputByText(/Date of departure from Madeira Islands/i), customDateToFullString(data.hotel.dateEnd), errors, 'Date of departure from Madeira Islands');

}

function setTextAreaValues(node, dataArray, errors, eventAfterName = "blur", eventBeforeName = null, isReact = false) {
    if (node && dataArray && dataArray.length > 0) {
        for (let i = 0; i < dataArray.length; i += 2) {
            let prepareNode = typeof (dataArray[i]) === "string" ? node.querySelector(dataArray[i]) : dataArray[i];
            setTextAreaValueAndExecEvent({
                node: prepareNode, data: dataArray[i + 1], eventAfterName, eventBeforeName, isReact
            }, errors);
        }
    }
}

function setTextAreaValueAndExecEvent({
                                          node = null, data = "", type = "value", eventAfterName = "blur",
                                          eventBeforeName = null, isReact = false
                                      }, errors) {
    if (!node) {
        return;
    }
    if (!data.value) {
        errors.push(data.caption);
        node[type] = "";
        return;
    }
    if (isReact) {
        setReactTextAreaValue(node, data.value);
        setReactTextAreaValueKeyBoard(node, data.value);
    }

    if (eventBeforeName) {
        simulateEvent(node, eventBeforeName);
    }
    node[type] = data.value;
    if (eventAfterName) {
        simulateEvent(node, eventAfterName);
    }
}

function setReactTextAreaValue(input, value) {
    callNativeTextAreaSetter(input, value);
    const inputEvent = new Event("input", {bubbles: true});
    input.dispatchEvent(inputEvent);
}

function setReactTextAreaValueKeyBoard(input, value, event = 'keyup') {
    callNativeTextAreaSetter(input, value);
    const inputEvent = new KeyboardEvent(event, {bubbles: true});
    input.dispatchEvent(inputEvent);
}

function callNativeTextAreaSetter(input, value) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        "value"
    ).set;
    nativeInputValueSetter.call(input, value);
}

async function setDatePickerValue(input, data, errors, caption) {
    try {
        if (!input) {
            return;
        }
        const date = dayMonthYearToDate(data.value);
        const node = input.closest('[format]');
        if (!node) {
            return;
        }
        node.click();
        const month = date.toLocaleDateString('en', {month: 'long'});
        const day = date.toLocaleDateString('en', {day: 'numeric'});
        let pickerContainer = document.querySelector('.MuiPickersBasePicker-container');
        const pickerHeader = pickerContainer.querySelector('.MuiPickersCalendarHeader-switchHeader');
        const arrowRight = $$('.MuiPickersCalendarHeader-iconButton', pickerContainer)[1];
        let headCaption = getText(pickerHeader.querySelector('.MuiPickersCalendarHeader-transitionContainer > p')).replace(/\s+|\d+/g, '').toLowerCase();
        while (headCaption !== month.toLowerCase()) {
            arrowRight.click();
            await waitingFor(() => null, 50, 2);
            headCaption = getText(pickerHeader.querySelector('.MuiPickersCalendarHeader-transitionContainer > p')).replace(/\s+|\d+/g, '').toLowerCase();
        }

        const dayNode = $$('.MuiPickersDay-day p', pickerContainer).find(p => getText(p) === day);
        if (!dayNode) {
            return;
        }
        dayNode.click();
        const pickerContainer2 = document.querySelector('.MuiPickersBasePicker-container');
        const buttons = $$('.MuiButton-textPrimary', pickerContainer2.closest('.MuiDialog-root'));
        const okBtn = buttons.find(btn => getNodeProperty(btn.querySelector('.MuiButton-label'), '') === 'OK');
        if (okBtn) {
            okBtn.click();
        }
        await waitingFor(() => null, 1, 200);
    } catch (e) {
        errors.push(caption);
    }
}

function fillSelectInput(input, obj, errors) {
    if (!input) {
        return;
    }

    simulateEvent(input, 'focus');
    simulateMouseEvent(input, 'mousedown');

    const option = $$('[role="listbox"] li.MuiListItem-button').find(opt => getNodeProperty(opt, '').match(obj.value));
    if (option) {
        option.click();
    } else {
        errors.push(obj.caption)
    }
}

function mapSex(sex) {
    const obj = {
        "1": /Male/i,
        "2": /Female/i
    };
    return obj[sex] || null;
}

function getPassengerRowBySelect(select) {
    return select.closest('form');
}

// "21.08.1987" -> "1987/08/21"
function reformatDate(date) {
    return date.replace(/\./g, '/').split('/').reverse().join('/');
}
