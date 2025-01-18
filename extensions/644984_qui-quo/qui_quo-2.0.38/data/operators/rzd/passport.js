var OPERATOR_NAME = "RZD";

function injectQuickReservationData(selInsert, func) {
   querySelectorAll(document, "[class='t-user'], .passData-pass [name='lastName']").forEach( div => {
       const row = div.closest(".row");
       if ( row && !row.querySelector(selInsert) ) {
           row.prepend(func({
               addTag: "div",
               newTagStyle: 'border:1px solid #ccc;border-radius: 6px;padding: 5px;margin:10px',
               legendStyle: "font-size:12px;font-weight: bold;border:none;margin:0"
           }));
       }
   })
}

function pasteOrderData(div, data, passport, errors) {
    setInputValues(div, [
        "[name='lastName']", passport.surname,
        "[name='firstName']", passport.name,
        "[name='midName']", data.secondName,
        "[id*='birthdate'] input[name*='jqui-datepicker']", customDateToFullString(data.birthday),
        "[name='docNumber']",  { value: passport.serial.value  + passport.number.value, caption: "Серия и номер документа"},
        "[name='informationPhone']", data.phones.mobile,
        "[name='informationEmail']", data.email,
    ], errors, ["focus","change", "input", "keyup", "blur"]);
    setSelectIndex(div, ["[testid='country']",  data.nationality, "[testid='docType']", getDocType(div, passport), "[testid='gender']", mapSex(data)], errors);
    simulateEvent(document.body, "mousedown");
}

function getPassengerRowBySelect(select) {
    var div = select.parentNode;
    while (true) {
        if (  div.className === "t-user" || div.classList.contains("passData-pass") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function getDocType(div, passport) {
    var select = div.querySelector(".qq-select select");
    var value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            if ( passport.docType === "birthday_certificate" ) {
                value = "Свидетельство о рождении"
            } else {
                value =  "Паспорт РФ";
            }
    }
    return {
        value: value,
        caption: "Тип документа"
    };
}

function mapSex(data) {
    var sex = data.sex;
    switch (sex.value) {
        case "1" :
            sex.value =  "Мужской";
            return sex;
        case "2" :
            sex.value =  "Женский";
            return sex;
        default  :
            sex.value =  "WRONG";
            return sex;
    }
}