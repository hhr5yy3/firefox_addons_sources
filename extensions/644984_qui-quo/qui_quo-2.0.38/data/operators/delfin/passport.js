var OPERATOR_NAME = "Дельфин";

function injectQuickReservationData(selInsert, func) {
 querySelectorAll(document, '[data-field="surName"]').forEach((input) => {
        var tr = getTr(input);
        var head = tr.parentNode.parentNode.querySelector("thead tr");
        if ( head && !head.querySelector(".qq-caption") ) {
            head.append(createHeadCell());
        }
        if ( tr && !tr.querySelector(selInsert) ) {
            tr.append(func({
                addTag: "td",
                newTagStyle: "vertical-align: middle;",
                displayCaption: false,
                legendStyle: "vertical-align: middle; font-size:12px; border-bottom: 0px;margin-bottom: 0px"
            }));
        }
    });
}

function createHeadCell() {
    var newTd = document.createElement("th");
    newTd.innerHTML = "Быстрое бронирование через <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo  и U-ON: ";
    newTd.style = "vertical-align: middle; font-size:12px";
    newTd.className = "qq-caption";
    return newTd;
}

function getTr(input) {
    var tr = input.parentNode;
    while (tr) {
        if ( tr.tagName === "TR" ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}

function pasteOrderData(tr, data, passport, errors) {
    var sexNode = tr.querySelector(mapSex(data.sex.value)); displayCaption: false
    if ( sexNode ) {
        sexNode.click();
    } else {
        errors.push("Пол");
    }
    setInputValues(tr, [
            '[data-field="surName"]', passport.surname,
            '[data-field="name"]', passport.name,
            '[data-field="patronymic"]', data.secondName,
            '[data-field="birthdate"]', customDateToFullString(data.birthday),
            '[data-field="documentSerial"]', passport.serial,
            '[data-field="documentNumber"]',  passport.number
        ], errors, ["focus","input", "change", "blur"]
    );
}

function getPassengerRowBySelect(select) {
    var tr = select.parentNode;
    while (true) {
        if ( tr.tagName === "TR" ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}

function  mapSex(sex) {
    if ( sex == "0" ) {
        return null;
    }
    if ( sex == "1" ) {
        return '[title="Мужской"]'
    }
    if ( sex == "2" ) {
        return '[title="Женский"]'
    }
}
