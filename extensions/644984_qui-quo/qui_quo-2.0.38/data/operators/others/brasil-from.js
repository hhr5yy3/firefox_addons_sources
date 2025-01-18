window.OPERATOR_NAME = 'Form for Brasil';

function injectQuickReservationData(selInsert, func) {
    const form = document.querySelector('#limesurvey');
    if (form) {
        if (!document.querySelector(selInsert)) {
            form.prepend(func({
                addTag: "div",
                legendStyle: 'font-size:12px',
                style: 'margin-left: 16.6%'
            }));
        }
    }
}


async function pasteOrderData(div, data, passport, errors) {
    const touristPhone = data.entryFormData.originalPhones.mobile.value.replace(/\D+/g, '');

    fillDate(div, data.birthday, '#question5', errors);
    fillDate(div, data.tourStartDate, '#question11', errors);
    fillDate(div, formatToCDate(getFlightPropByIndex(data.flights, 'departureDate').value, 'Departure date' ), '#question11', errors);
    fillDate(div, formatToCDate(getFlightPropByIndex(data.flights, 'arrivalDate').value, 'Arrival date'), '#question10', errors);

    setSelectIndex(div, [
        '#question6 select', data.nationalityEng,
        '#question8 select', {value: 'Passport', caption: 'Travel document'},
        '#question199 select', {value: 'Tourism in Brazil', caption: 'Reason for the trip'}
    ], errors);

    setSelectIndex(div, [
        '#question30 select', data.nationalityEng
    ], errors, (text, caption)=>text && caption && !!text.toLowerCase().match(caption.toLowerCase()));

    setInputValues(div, [
        'input#register_firstname, #question2 input', passport.name,
        'input#register_lastname,  #question3 input', passport.surname,
        'input#DatumNarozeni', customDateToFullString(data.birthday),
        'input#DatumPrepravyOd', customDateToFullString(data.tourStartDate),
        'input#Misto1Adresa', data.hotel.hotelName,
        '#question9 input', {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport number'
        },
        'input#Telefon', data.entryFormData.originalPhones.mobile,
        'input#DopravniProstredky_0__NazevPrepravniSpolecnosti', data.entryFormData.aviaCompany,
        'input#DopravniProstredky_0__CisloSpoje', data.entryFormData.aviaFlightNumber,
        'input#register_email', data.email,
        '#question14 input', {value: data.entryFormData.aviaFlightNumber.value.replace(/\D+/g, ''), caption: 'Flight number'} ,
        '#question12 input', getFlightPropByIndex(data.flights, 'departureCityCode'),
        '#question16 input', {
                value: touristPhone.length > 11 ? touristPhone.slice(-9) : touristPhone.slice(-10),
                caption: 'Mobile phone'
            },
        '#question17 input', data.email,
        '#question77 input', data.hotel.hotelName
    ], errors);

    const genderForm = div.querySelector('.row.gender');
    if ( genderForm ) {
        const sexInputs = $$('input', genderForm);
        if ( data.sex.value === '1' ) {
            sexInputs[1].click();
        }

        if ( data.sex.value === '2') {
            sexInputs[0].click();
        }
    }

    const liveInput = div.querySelector('#question7 input[value="N"]');
    if (liveInput) {
        liveInput.click();
    }
}

function formatToCDate(stringDate, caption) {
    if (!stringDate )  {
        return null;
    }
    const [day, month, year] = stringDate.split('.');
    return {caption, value: {day, month, year}}
}

function fillDate(div, date, selector, errors) {
    setSelectIndex(div, [selector+' select[id*="day"]', {
        value: date.value.day, caption: 'Day of ' + date.caption
    }, selector +' select[id*="month"]', {
        value: String(date.value.month).padStart(2, '0'), caption: 'Month of ' + date.caption
    }, selector +' select[id*="year"]', {
        value: date.value.year, caption: 'Year of ' + date.caption
    }, selector + ' select[id*="hour"]', {
        value: '12', caption: 'hour  of ' + date.caption
    }, selector + ' select[id*="minute"]', {
        value: '0', caption: 'hour  of ' + date.caption
    }], errors, null, true);
    setInputValues(div, [
        selector+' input.date', customDateToFullString(date, div.querySelector(selector + ' select[id*="hour"]') ? reformatDateWithTime: reformatDate),
    ], errors);

}

function getPassengerRowBySelect(select) {
    return select.closest('#limesurvey');
}

// "21.08.1987" => "08-21-1987"
function reformatDate(date) {
    const arr = date.split('.');
    return [arr[1], arr[0], arr[2]].join('-');
}

// "21.08.1987" => "08-21-1987 12:00"
function reformatDateWithTime(date) {
    return reformatDate(date);
}
