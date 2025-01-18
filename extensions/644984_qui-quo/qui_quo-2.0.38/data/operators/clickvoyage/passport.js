var OPERATOR_NAME = "ClickVoyage";

function injectQuickReservationData(selInsert, func) {
    querySelectorAll(document, ".mag-tour-cart-tourist form").forEach(form => {
            if ( !form.parentNode.querySelector(selInsert) ) {
                form.after(func({
                    addTag: "div",
                    tagStyle: "",
                    selectStyle: "",
                    displayCaption: true,
                    legendStyle: "font-size:12px;margin:0.5em"
                }));
            }
    });
}

function pasteOrderData(form, data, passport, errors) {
    setSex(form, data.sex, errors);
    setInputValues(form, [
            getNextElement(findLabel(form, "Фамилия")), passport.surname,
            getNextElement(findLabel(form, "Имя")), passport.name,
            getNextElement(findLabel(form, "Дата рождения")), customDateToFullString(data.birthday),
            getNextElement(findLabel(form, "Загранпаспорт")), {value: passport.serial.value+ " " + passport.number.value, caption: "Загранпаспорт" },
            getNextElement(findLabel(form, "Действителен до")), customDateToFullString(passport.expire)
        ], errors, "change"
    );
}

function setSex(div, sex, errors) {
    var btns = div.querySelectorAll(".mag-tour-cart-tourist__gender .el-radio-button__inner");
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

function findLabel(div, labelString) {
    return querySelectorAll(div, "label").find( label => {
        return label.textContent.match(labelString);
    });
}

function getNextElement(label, elemSel="input"){
    return label.nextElementSibling.querySelector(elemSel);
}

function getPassengerRowBySelect(select) {
    var form = select.parentNode;
    while (form) {
        if ( form.classList.contains("mag-tour-cart-tourist") ) {
            break;
        }
        form = form.parentNode;
    }
    return form;
}