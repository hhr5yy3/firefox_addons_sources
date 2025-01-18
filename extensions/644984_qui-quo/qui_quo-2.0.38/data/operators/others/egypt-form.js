window.OPERATOR_NAME = 'Form for Egypt';

function injectQuickReservationData(selInsert, func) {
    const form = document.querySelector('#formdiv');
    if (form) {
        if (!document.querySelector(selInsert)) {
            form.prepend(func({
                addTag: "div"
            }));
        }
    }
}

async function pasteOrderData(div, data, passport, errors) {
    setInputValues(div, [
        'input#fem', passport.surname,
        'input#name', passport.name,
        'input#citizenship', data.nationalityEng,
        'input#birth', customDateToFullString(data.birthday),
        'input#trip', data.entryFormData.aviaFlightNumber,
        'input#trip2', getFlightPropByIndex(data.flights, 'departureCityCode'),
        'input#passport_ser', passport.serial,
        'input#pasport_nomer', passport.number,
        'input#address', data.hotel.hotelName,
    ], errors);
}

function getPassengerRowBySelect(select) {
    return select.closest('#formdiv');
}
