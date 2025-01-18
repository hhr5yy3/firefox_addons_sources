window.OPERATOR_NAME = 'Form for Croatia';


function injectQuickReservationData(selInsert, func) {
   $$('#najavaForm, [data-delete-message="Are you sure you wish to delete passenger?"]').forEach(form => {
            if (!form.parentNode.querySelector(selInsert)) {
                form.prepend(func({
                    addTag: "div",
                    style: 'zoom:0.7;margin: 20px;'
                }));
            }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    let addAddressNode = document.querySelector('#accommodationError');
    addAddressNode = addAddressNode ? addAddressNode.closest('.dependents-section') : null;
    addAddressNode = addAddressNode ? addAddressNode.querySelector('a.dependents-create-cmd') : null;
    if ( addAddressNode && !document.querySelector('#Obrazac_NajaveObjektiSmjestaja_0__NosBoravakDo')) {
        addAddressNode.click();
    }

    (document.querySelector('#Obrazac_PotvrdaUnosa')||[]).checked = true;

    setSelectIndex(div, [
        '#Obrazac_NpaRazlogPutovanjaId', {value: 'TOURIST', caption: 'Purpose of travel to the RC'},
        '#Obrazac_NpaDrzavaPolazistaId', data.nationalityEng,
        '#Obrazac_Voditelj_NpoDokumentDrzavaId, [name*="NpoDokumentDrzavaId"]', data.nationalityEng,
        '#Obrazac_Voditelj_NpoDrzavljanstvoId, [name*="NpoDrzavljanstvoId"]', data.nationalityEng,
        '#Obrazac_Voditelj_NpoTipIsprave, [name*="NpoTipIsprave"]', {value: 'Passport', caption: 'Document type'}
    ], errors, ['input', 'change'])


    setInputValues(div, [
        '#Obrazac_NpaDatumPutovanjaOd', customDateToFullString(data.tourStartDate, reformatDate),
        '#Obrazac_NpaDatumPutovanjaDo', customDateToFullString(data.tourEndDate, reformatDate),
        '#Obrazac_Voditelj_NpoIme, [name*="NpoIme"]', passport.name,
        '#Obrazac_Voditelj_NpoPrezime, [name*="NpoPrezime"]', passport.surname,
        '#Obrazac_Voditelj_NpoDatumRodenja, [name*="NpoDatumRodenja"]', customDateToFullString(data.birthday, reformatDate),
        '#Obrazac_Voditelj_NpoTelefon, [name*="NpoTelefon"]', {
            value: (data.entryFormData.originalPhones.mobile.value || data.entryFormData.originalPhones.main.value),
            caption: data.phones.mobile.caption
        },
        '#Obrazac_Voditelj_NpoDokumentSerBr, [name*="NpoDokumentSerBr"]', {
            value: passport.serial.value + passport.number.value,
            caption: 'Passport Number'
        },
        '#Obrazac_Voditelj_NpoEmail, [name*="NpoEmail"]', data.email,
        '#Obrazac_NajaveObjektiSmjestaja_0__NosNazivSmjestaja', data.hotel.hotelName,
        '#Obrazac_NajaveObjektiSmjestaja_0__NosBoravakOd', customDateToFullString(data.hotel.dateStart, reformatDate),
        '#Obrazac_NajaveObjektiSmjestaja_0__NosBoravakDo', customDateToFullString(data.hotel.dateEnd, reformatDate)

    ], errors, ['input', 'change']);
}

function getPassengerRowBySelect(select) {
    return select.closest('.shadow-sm.item-row, form');
}


// "21.08.1987" -> "08/21/1987"
function reformatDate(date) {
    const parts = date.split('.');
    return parts[1] + '/' + parts[0] + '/' + parts[2];
}
