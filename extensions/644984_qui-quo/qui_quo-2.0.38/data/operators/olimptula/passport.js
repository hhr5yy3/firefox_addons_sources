//Заполнение паспортных данных
var OPERATOR_NAME = "Olimptula";

function injectQuickReservationData(selInsert, func) {
    var divs = querySelectorAll(document, ".modal-dialog .modal-body");
    divs.forEach((div) => {
        if ( !div.querySelector(selInsert) ) {
            div.append(func({
                addTag: "div"
            }));
        }
    });
}

function pasteOrderData(div, data, passport, errors) {
    var phone = data.phones.mobile.value ? [...data.phones.mobile.value].reverse().slice(0, 10).reverse().join("") : ""
    setInputValues(div, [
            "input[name='title']", { value: setFullName(passport, data), caption: "ФИО"},
            "[name='birthday'] input", customDateToFullString(data.birthday),
            "input[name='pasport_seria']", passport.serial,
            "input[name='pasport_number']", passport.number,
            "input[name='phone']", { value: phone, caption: "Телефон"},
        ], errors
    );
}

function setFullName(passport, data) {
    return [
        passport.surname.value , passport.name.value, data.secondName.value
    ].filter(it => it && it.trim()).join(" ");
}

function getPassengerRowBySelect(select) {
    var div = select.parentNode;
    while (true) {
        if ( div.classList.contains("modal-body") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}