window.OPERATOR_NAME = 'Form for Hellootel';

function injectQuickReservationData(selInsert, func) {
    const form = document.querySelector('#reservation_tourist_info_edit_form');
    if ( form && !form.querySelector(selInsert) ) {
        form.prepend(func({
                              addTag: "div",
                              style: "padding-right: 2rem;padding-left: 2rem;"
                          }));
    }
}

async function pasteOrderData(div, data, passport, errors) {
    setInputValues(div, [
        "#reservationtouristinfo-name", {
            value: passport.name.value + ' ' + passport.surname.value,
            caption: 'Имя Фамилия'
        },
        "#reservationtouristinfo-address", data.address,
        "#reservationtouristinfo-country", data.nationalityEng,
        "#reservationtouristinfo-phone", data.phones.mobile,
        "#reservationtouristinfo-birth_day_display", customDateToFullString(data.birthday),
        "#reservationtouristinfo-email", data.email,
        "#reservationtouristinfo-passport", {
            value: passport.serial.value + passport.number.value,
            caption: 'Номер паспорта'
        }
    ], errors, ['click', 'focus', 'input', 'keyup', 'blur']);
    const anotherPassengers = ORDER_DATA.passengers.filter(passenger => passenger !== data);
    pasteAnotherPassengers(div, anotherPassengers);
    
}

function pasteAnotherPassengers(div, anotherPassengers, errors) {
    const fields = $$('[id*="_name"][name*="ReservationTouristInfo"]', div).map(f => f.closest('.form-fields'));
    anotherPassengers.forEach((passenger,index) => {
           const field = fields[index];
           const name = {
               value: passenger.internationalPassport.name.value + ' ' + passenger.internationalPassport.surname.value,
               caption: 'Имя Фамилия пассажира №'+index
           }
           const birthday = customDateToFullString(passenger.birthday);
        setInputValues(field, [
            'input[id*="_name"]', name,
            'input[id*="birth_day_display"]', birthday])
    });
    
}

function getPassengerRowBySelect(select) {
    return select.closest('#reservation_tourist_info_edit_form');
}
