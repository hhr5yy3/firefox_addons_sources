var OPERATOR_NAME = "Mouzenidis";

function injectQuickReservationData(selInsert, func) {
    var trs = querySelectorAll(document, ".tourist-info, .basket-tourist-form");
    trs.forEach((tr) => {
        if ( !tr.querySelector(selInsert) && !tr.querySelector(".qq-caption") ) {
            tr.append(func({
                style: "text-align:right;",
                addTag: "div",
                legendStyle: "font-size: 12px"
            }));
        }
    });
}

function pasteOrderData(div, data, passport, errors) {
    setSex(div, data.sex, errors);
    setInputValues(div, [
            '[name*="firstName"]', passport.name,
            '[name*="lastName"]', passport.surname,
            getNextElement(findLabel(div, /Дата рождения|Дата народження/i)), customDateToFullString(data.birthday),
            '[name*="passport"]', { value: passport.serial.value + " " + passport.number.value, caption: "Паспорт" },
            getNextElement(findLabel(div, /Срок действия паспорта|Действует до|Діє до/i)), customDateToFullString(passport.expire),
            getNextElement(findLabel(div, /Гражданство|Громадянство/i)), data.nationality
        ], errors, "change"
    );
    var natSelect = div.querySelector(".VirtualizedSelectOption.VirtualizedSelectFocusedOption");
    if ( natSelect ) {
        natSelect.click();
    } else {
        errors.push("Гражданство");
    }
}

function findLabel(div, labelString) {
    return querySelectorAll(div, "label").find( label => {
        return label.textContent.match(labelString);
    });
}

function getNextElement(label, elemSel="input"){
    return label.nextElementSibling.querySelector(elemSel);
}

function setSex(div, sex, errors) {
    var label =  findLabel(div, "Пол");
    var btns = label ? label.nextElementSibling.querySelectorAll("button") : null;
    if ( sex.value === "0") {
        errors.push(sex.caption);
        return;
    }
    if ( !btns ) {
        return;
    }
    if ( sex.value=== "1" ) {
     btns[0].click();
        return;
    }
    if ( sex.value=== "2" ) {
        btns[1].click();
        return;
    }
}

function getPassengerRowBySelect(select) {
    var div = select.parentNode;
    while (div) {
        if ( div.className === "tourist-info" || div.className === "basket-tourist-form" ) { //basket-tourist-form
            break;
        }
        div = div.parentNode;
    }
    return div;
}