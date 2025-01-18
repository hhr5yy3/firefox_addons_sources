window.OPERATOR_NAME = "ERV";

function injectQuickReservationData(selInsert, func) {
    var inputs = querySelectorAll(document, "[name*='tfHolderName'], [name*='tfName']");
    inputs.forEach((input) => {
        var tbody = input.parentNode.parentNode.parentNode;
        if ( !tbody.querySelector(selInsert) ) {
            var tr = document.createElement("tr");
            tr.append(func({
                addTag: "td",
                newTagAttribute: {
                    name: "colspan",
                    value: "6"
                }
            }));
            tbody.append(tr);
        }
    });
}

function pasteOrderData(div, data, passport, errors) {
    setInputValues(div, [
            "input[name='tfHolderName'], input[name*='tfName']", { value:  passport.surname.value + " " + passport.name.value, caption: "Фамилия и имя"},
            "input[name='tfHolderBirthDate'], input[name*='hfBornDate']", customDateToFullString(data.birthday),
            "input[name='tfHolderId'], input[name*='tfIdNum']", { value:  passport.serial.value  + passport.number.value, caption: "Паспорт"},
            "input[name='tfPhone']", data.phones.mobile,
            "input[name='tfEmail']", data.email,
        ], errors
    );

    setSelectIndex(div, ["select[name='tfSex']", mapSex(data.sex),
                         "select[name='tfCountry']", data.nationalityEng], errors);
}

function mapSex(sex){
    switch (sex.value) {
        case "1" :
            sex.value = "Мужской";
            break;
        case "2" :
            sex.value = "Женский";
            break;
    }
    return sex;
}

function getPassengerRowBySelect(select) {
    var tr = select.parentNode;
    while (true) {
        if ( tr.tagName === "TBODY" ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}
