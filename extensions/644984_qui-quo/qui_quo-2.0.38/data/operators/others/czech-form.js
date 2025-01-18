window.OPERATOR_NAME = 'Form for Czech';

function injectQuickReservationData(selInsert, func) {
    const form = document.querySelector('form');
    if (form) {
        if (!document.querySelector(selInsert)) {
            form.prepend(func({
                addTag: "div"
            }));
        }
    }
}

async function pasteOrderData(div, data, passport, errors) {
    setSelectIndex(div, [
        'select#StatniPrislusnostZemeKod', data.nationalityEng,
        'select#NavstiveneZemeKod', data.nationalityEng,
        'select#DopravniProstredky_0__TypDopravnihoProstredku', {value: 'Airplane', caption: 'Means of transport'}
    ], errors, selectOptionsComparator)


    setInputValues(div, [
        'input#Jmeno', passport.name,
        'input#Prijmeni', passport.surname,
        'input#DatumNarozeni', customDateToFullString(data.birthday),
        'input#DatumPrepravyOd', customDateToFullString(data.tourStartDate),
        'input#Misto1Adresa', data.hotel.hotelName,
        'input#CisloDokladu', {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport number'
        },
        'input#Telefon', data.entryFormData.originalPhones.mobile,
        'input#DopravniProstredky_0__NazevPrepravniSpolecnosti', data.entryFormData.aviaCompany,
        'input#DopravniProstredky_0__CisloSpoje', data.entryFormData.aviaFlightNumber,
        'input#Email', data.email
    ], errors);

}

function selectOptionsComparator(text, caption) {
    if (text && caption && (text.toUpperCase().match(caption.toUpperCase()))) {
        return true;
    }
}

function getPassengerRowBySelect(select) {
    return select.closest('form');
}
