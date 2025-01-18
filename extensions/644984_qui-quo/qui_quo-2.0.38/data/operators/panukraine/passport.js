window.OPERATOR_NAME = "panukraine";
function injectQuickReservationData(selInsert, func) {
    const tables = querySelectorAll(document, ".tourist-block");
    tables.forEach((table) => {
        if ( !table.querySelector(selInsert) ) {
            table.append(func({
                addTag: "div",
                legendStyle: 'font-size: 12px;margin-bottom:3px;'
            }));
        }
    });
}

function pasteOrderData(touristNode, data, passport, errors) {
    data.sex.value = mapSex(data.sex);
    if ( data.sex.value ) {
        const sexNode = touristNode.querySelector("select[name*='[prefix]']");
        setSelectIndex(touristNode, [sexNode,  data.sex], errors);
    } else {
        errors.push("Пол")
    }
    setInputValues(touristNode, [
            "input[name*='[lastname]']", passport.surname,
            "input[name*='[name]']", passport.name,
            "input[name*='[passport_number]']", {value: passport.serial.value + passport.number.value, caption: "Паспорт"},
            "input[name*='[dbirth]']", customDateToFullString(data.birthday),
            "input[name*='[passport_expired]']", customDateToFullString(passport.expire),
            "input[name*='[phone1]']", data.phones.mobile
        ], errors, ["change", "blur"]
    );
}

function getPassengerRowBySelect(select) {
    let elem = select.parentNode;
    while (elem) {
        if ( elem.classList.contains("tourist-block") ) {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}

function mapSex(sex) {
    if ( !sex ) {
        return null;
    }
    switch (sex.value) {
        case "1" :
            return "MR";
        case "2" :
            return "MS";
        default  :
            return null;
    }
}
