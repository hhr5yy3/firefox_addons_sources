var OPERATOR_NAME = "PayTravel";

function injectQuickReservationData(selInsert, func) {
    querySelectorAll(document, '[data-bind*="orderData.tourists"] .list-group-item').forEach(item => {
        if ( item && !item.querySelector(selInsert) ) {
            item.append(func({
                addTag: "div",
                style: "color:#413184;font-size: 14px;",
                legendStyle: "font-size: 14px;margin-bottom: 0px;border-bottom: none;"
            }));
        }
    })
}

function pasteOrderData(form, data, passport, errors) {
    var sex = form.querySelector(`[value=${mapSex(data.sex)}]`);
    if ( sex ) {
        sex.click();
    } else {
        errors.push("Пол");
    }
    setSelectIndex(form, ["select[name*='passportType']", getDocType(form)], errors);
    setInputValues(form, [
            "[data-bind*='lastName']", passport.surname,
            "[data-bind*='firstName']", passport.name,
            "textarea[data-bind*='passportDetails().issuedBy']", passport.authority,
            "[data-bind*='dateOfBirth']", customDateToFullString(data.birthday),
            "input[data-bind*='passportDetails().date']", getDocType(form).value  === "Паспорт гражданина РФ" ? customDateToFullString(passport.issueDate) : customDateToFullString(passport.expire),
        ], errors, ["change","input","blur"]
    );
    var passportNumber = form.querySelector("[data-bind*='passportDetails().number']");
    passportNumber.select();
    setInputValues(form, [
        passportNumber,
        {value:  "", caption: "Серия и номер"}], [], ["paste", "blur"]
    );

    setInputValues(form, [
        passportNumber,
        {value:  [passport.serial.value, passport.number.value].join(""), caption: "Серия и номер"}], errors, ["paste", "blur"]
    );
}

function getDocType(form) {
    var select = form.querySelector(".qq-select select");
    var value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            value = "Паспорт гражданина РФ";
            break;
        case "Заграничный паспорт" :
            value = "Заграничный паспорт гражданина РФ";
            break;
    }
    return {
        value: value,
        caption: "Паспортные данные:"
    };
}

function getPassengerRowBySelect(select) {
    var div = select.parentNode;
    while (true) {
        if ( div.classList.contains("list-group-item") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return "male";
        case "2" :
            return "female";
        default  :
            return "WRONG";
    }
}