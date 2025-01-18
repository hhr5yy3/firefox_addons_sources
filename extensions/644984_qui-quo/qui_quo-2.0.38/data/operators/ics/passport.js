var OPERATOR_NAME = "ICS";

function injectQuickReservationData(selInsert, func) {
    var tables = querySelectorAll(document, ".halfTab table[id*='tt']");
    tables.forEach((table) => {
        if ( !table.parentNode.querySelector(selInsert) ) {
            table.parentNode.append(func({
                addTag: "tr",
                style: "position: relative;font-size: 12px;",
                selectStyle: "border: solid 1px #808080;"
            }));
        }
    });
}

function pasteOrderData(table, data, passport, errors) {
    var sexSelect = table.querySelector("[name*='gender']");
    setSelectIndex(table, [
        sexSelect, {
                value: mapSex(data.sex, sexSelect),
                caption: data.sex.caption
            }, "[name*='citizenship']", getCountryCode(data.nationalityEng.value)
        ], errors
    );

    setInputValues(table, [
            "[name*='bdate']", customDateToFullString(data.birthday),
            "[name*='pass_begins']", customDateToFullString(passport.issueDate),
            "[name*='pass_ends']", customDateToFullString(passport.expire),
            "[name*='l_name']", { value : transliterate(passport.surname.value.toLowerCase()).toUpperCase() , caption: passport.surname.caption },
            "[name^='name']", { value :transliterate(passport.name.value.toLowerCase()).toUpperCase(), caption : passport.name.caption },
            "[name^='m_name']", { value : transliterate(data.secondName.value.toLowerCase()).toUpperCase(), caption: data.secondName.caption },
        ], errors, "change"
    );


    if ( table.querySelector("[id*='rusNumber']") && table.querySelector("[id*='rusNumber']").style.display === "none" ) {
        setInputValues(table, [
                "[name^='passport']",
                {value: passport.serial.value + passport.number.value, caption: "Серия и номер паспорта"}
            ], errors, "change"
        );
    } else {
        setInputValues(table, [
                "[name*='num_passport']", passport.serial,
                "[name^='passport']", passport.number
            ], errors, "change"
        );
    }

    errors.push("Страховка от невыезда");
    errors.push("Виза");

}

function getPassengerRowBySelect(select) {
    var tr = select.parentNode;
    while (true) {
        if ( tr.className === "halfTab" ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}

function mapSex(sex, sexSelect) {
    var postfix = sexSelect.querySelectorAll("option")[1].textContent.match(/Chld|Infant/i);
    postfix = postfix ? postfix[0] : "";
    switch (sex.value) {
        case "1" :
            return "MR" + postfix;
        case "2" :
            return "MRS" + postfix;
        default  :
            return null;
    }
}
