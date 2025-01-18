//Заполнение паспортных данных
var OPERATOR_NAME = "marioltula";

function injectQuickReservationData(selInsert, func) {
    var divs = querySelectorAll(document, '[id*="phone"]');
    divs.forEach((div) => {
        if ( !div.parentNode.querySelector(selInsert) ) {
            div.after(func({
                addTag: "div"
            }));
        }
    });
}

function pasteOrderData(div, data, passport, errors) {
    
    setInputValues(div, [
        findPreviousElement(div, 'input[name*="_surname"]'), passport.surname,
        findPreviousElement(div, 'input[name*="_name"]'), passport.name,
        findPreviousElement(div, 'input[name*="_patronymic"]'), data.secondName,
        findPreviousElement(div, 'input[name*="_birthday"]'), customDateToFullString(data.birthday),
        findPreviousElement(div, 'input[name*="_pasport"]'), { value: passport.serial.value + " " +passport.number.value, caption: "Паспорт" },
        findPreviousElement(div, 'input[name*="_phone"]'), data.phones.mobile,
        ], errors
    );
}

function findPreviousElement(prev, sel) {
    while (prev) {
        var elem = prev.querySelector(sel);
        if ( elem ) {
            return elem;
        }
        if ( prev.className !== "form-row") {
            return null;
        }
        prev = prev.previousElementSibling;
    }
    return prev;
}

function getPassengerRowBySelect(select) {
    var div = select.parentNode;
    while (true) {
        if ( div.classList.contains("form-row") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}