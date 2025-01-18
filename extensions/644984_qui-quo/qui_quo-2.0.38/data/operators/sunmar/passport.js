var OPERATOR_NAME = "Sunmar";

function injectQuickReservationData(selInsert, func) {
    var tables = querySelectorAll(document, ".resTouristAdultTable > table, .resTouristChildTable > table");
    tables.forEach((table) => {
        if ( !table.querySelector(selInsert) ) {
            table.tBodies[0].append(func({
                style: "width:auto;margin-right:6px;margin-left: 10px;margin-top: 2px;",
                addTag: "tr",
                selectStyle: "padding: 2px;font: 11px tahoma;background: #ffffff;border: 1px solid #699cb7;"
            }));
        }
    });
}

function pasteOrderData(table, data, passport, errors) {
    var sex = mapSex(data.sex);
    querySelectorAll(table, "span[name*='gender'] input").forEach(sexInput => {
        sexInput.checked = false
    });
    setCheckboxValues(table, [
        "span[name*='gender'] input[value='" + sex + "']", {value: true, caption: data.sex.caption},
    ], errors);
    if ( passport.docType === 'birthday_certificate' ) {
         passport.serial.value = passport.number.value.replace(/\d+|s+|-№|№|#|-/g,'');
         passport.number.value = passport.number.value.replace(/\D+/g,'');
    }
    setInputValues(table, [
            "[name*='_surname']", passport.surname,
            "[name*='identityNumber']", data.inn,
            "[name*='_name']", passport.name,
            "[name*='_patronymic']", data.secondName,
            "[name*='passportSerialNumber']", passport.serial,
            "[name*='passportNo']", passport.number,
            "[name*='passportGivenBy']", passport.authority,
            "[name*='addressInfo']", data.address,
            "[name*='InvoiceMail']", data.email,
            "[name*='_birthday']", customDateToFullString(data.birthday),
            "[name*='passportExpiryDate']", customDateToFullString(passport.expire),
            "[name*='passportBeginDate']", customDateToFullString(passport.issueDate)
        ], errors
    );

    setSelectIndex(table, ["[name*='nationality']", data.nationalityEng], errors);
    errors.push("Страна рождения");
}

function getPassengerRowBySelect(select) {
    var tr = select.parentNode;
    while (true) {
        if ( tr.tagName === "TABLE" ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return "0";
        case "2" :
            return "1";
        default  :
            return "WRONG";
    }
}
