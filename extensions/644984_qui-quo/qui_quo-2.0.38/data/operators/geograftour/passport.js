const OPERATOR_NAME = "География";

function injectQuickReservationData(selInsert, func) {
    querySelectorAll(document, "[id*='table-form-tourist']>tbody").forEach( tr =>{
        if ( !tr.querySelector(selInsert) ) {
            tr.append(func({
                addTag: "tr",
                tagStyle: "white-space: normal;",
                selectStyle: "width: 100%"
            }));
        }
    });
}

function pasteOrderData(tr, data, passport, errors) {
    setSelectIndex(tr, ["select[name$='document_type']", getDocType(tr, passport)], errors);
    setSelectIndex(tr, ["select[name$='status']", {value: mapTitle(data.title.value), caption: "Статус"}], errors);
    setInputValues(tr, [
        "input[name$='name']", stickData(data,["surname", "name", "secondName"], "ФИО туриста"),
        "input[name$='name_eng']", stickData(data.internationalPassport,["surname", "name"], "ФИ туриста"),
        "input[name$='born']", customDateToFullString(data.birthday),
        "input[name$='issued_date']", customDateToFullString(passport.issueDate),
        "input[name$='expires_date']", customDateToFullString(passport.expire),
        "input[name$='address']", data.addressLiving,
        "input[name$='series']", passport.serial,
        "input[name$='number']", passport.number,
        "input[name$='document_issuer']", passport.authority,
        "input[name$='phone']", data.phones.mobile,
        "input[name$='e_mail']", data.email
    ], errors, "blur");
}

function stickData(data, keys, caption, delimiter = " ") {
    const value = keys.map(key => data[key].value || "").join(delimiter);
    return {
        value: value,
        caption: caption
    }
}

function mapTitle(title) {
    switch(title) {
        case "Mr" : return "Mr";
        case "Mrs" : return "Mrs";
        case "Child" : return "Chl";
        case "Infant" : return "Inf";
        default  : return null;
    }
}

function getDocType(form) {
    let select = form.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            value = "Гражданский паспорт";
            break;
        case "Заграничный паспорт" :
            value = "Заграничный паспорт";
            break;
    }
    return {
        value: value,
        caption: "Тип документа"
    };
}

function getPassengerRowBySelect(select) {
    let tr = select.parentNode;
    while (true) {
        if ( tr.classList.contains("main") ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}
