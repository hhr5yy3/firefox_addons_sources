var OPERATOR_NAME = "GTO TRAVEL";

function injectQuickReservationData(selInsert, func) {
    var divs = querySelectorAll(document, "#gw_temp_book_tourist_new");
    divs.forEach((div) => {
        if ( !div.querySelector(selInsert) ) {
            div.append(func({
                addTag: "div"
            }));
        }
    });
}

function pasteOrderData(div, data, passport, errors) {
    setSelectIndex(div, ["select[id*='country_id']",  data.nationality,
        "select[id='prefix']", mapSex(data.sex)], errors);

    setInputValues(div, [
            "input[id*='lastname']", passport.surname,
            "input[id*='_name']", passport.name,
            "input[id*='dbirth']", customDateToFullString(data.birthday),
            "input[id*='passport_number']", { value: passport.serial.value + passport.number.value, caption: "Паспорт"},
            "input[id*='passport_expired']", customDateToFullString(passport.expire),
            "input[id*='phone']", data.phones.mobile.value ? data.phones.mobile : data.phones.main
        ], errors
    );
}

function mapSex(sex){
    switch (sex.value) {
        case "1" :
            sex.value = "MR";
            break;
        case "2" :
            sex.value = "MS";
            break;
    }
    return sex;
}

function getPassengerRowBySelect(select) {
    var div = select.parentNode;
    while (true) {
        if ( div.id === "gw_temp_book_tourist_new" ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}