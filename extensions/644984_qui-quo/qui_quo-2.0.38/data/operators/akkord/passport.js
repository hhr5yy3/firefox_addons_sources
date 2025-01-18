var OPERATOR_NAME = "Аккорд Тур";

function injectQuickReservationData(selInsert, func) {
        querySelectorAll(document, "tr[id*='dynamicInputRow']").forEach((table) => {
        var body = table.querySelector("tbody");
         if ( !body.querySelector(selInsert)) {
             var newTr = body.appendChild(createTr(selInsert));
             newTr.append(func({
                 addTag: "td",
                 newTagAttribute: { name: "colspan", value: "2" }
             }));
         }
    });
}

function createTr(selInsert) {
    var tr = document.createElement("tr");
    tr.className = selInsert.replace(/\./g, "");
    return tr;
}

function pasteOrderData(tr, data, passport, errors) {
    setInputValues(tr, [
            "[id*='turist_birthday']", customDateToFullString(data.birthday),
            "[id*='turist_last_name']", { value : transliterateUa(passport.surname.value.toLowerCase()).toUpperCase() , caption: passport.surname.caption },
            "[id*='turist_first_name']", { value :transliterateUa(passport.name.value.toLowerCase()).toUpperCase(), caption : passport.name.caption },
            "[id*='turist_passport_number']", { value: passport.serial.value  + passport.number.value, caption: "Серия и номер документа"},
            "[id*='turist_phone']", checkPhoneNumber(data.phones.mobile),
            "[id*='turist_email']", data.email
        ], errors, ["change", "blur"]
    );

}

function checkPhoneNumber(phone) {
    if ( phone.value.length > 10 ) {
        phone.value = phone.value.slice(-10)
    }
    return phone;
}

function getPassengerRowBySelect(select) {
    var tr = select.parentNode;
    while (true) {
        if ( tr.className.match("dynamicInputRow") ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}