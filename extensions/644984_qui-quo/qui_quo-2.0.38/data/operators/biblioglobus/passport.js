var OPERATOR_NAME = "Biblioglobus";

function injectQuickReservationData(selInsert, func) {
    var tables = querySelectorAll(document, ".passengers table");
    tables.forEach((table) => {
        if ( !table.querySelector(selInsert) ) {
            table.tBodies[0].append(func({
                style: "",
                addTag: "div",
                tagStyle: "padding: 10px;",
                selectStyle: "width: auto;background: white;"
            }));
        }
    });
}

function pasteOrderData(table, data, passport, errors) {
    var labels = querySelectorAll(table, "label");
    if ( passport.docType === 'birthday_certificate' ) {
        passport.serial.value = passport.number.value.replace(/\d+|s+|-№|№|#|-/g, '');
        passport.number.value = passport.number.value.replace(/\D+/g, '');
    }
    setInputValues(table, [
            searchDiv(labels, /Дата рождения/i), customDateToFullString(data.birthday),
            searchDiv(labels, /Фамилия/i), passport.surname,
            searchDiv(labels, /имя/i), passport.name,
            searchDiv(labels, /Отчество\(/i), data.secondName,
            searchDiv(labels, /Серия/i), passport.serial,
            searchDiv(labels, /№/i), passport.number,
            searchDiv(labels, /Действителен/i), customDateToFullString(passport.expire),
            searchDiv(labels, /телефон/i), data.phones.mobile,
            searchDiv(labels, /E-mail/i), data.email,
            searchDiv(labels, /Адрес регистрации/i), data.address
        ], errors
    );
    var title =  mapTATitle(data.title.value);
    setSelectIndex(table, [searchDiv(labels, /Гражданство/i), data.nationality,
        searchDiv(labels, /Пол/i), {
            value: title,
            caption: data.title.caption
        }], errors
    );
    if ( title === "Chld" || title ===  "Inf" ) {
        var sexSelect =  searchDiv(labels, /Пол/i);
        setSelectIndex(table, [sexSelect ? sexSelect.nextElementSibling : null, {
                value: mapSex(data.sex.value),
                caption: data.sex.caption
            }], errors
        );
    }
    errors.push("Виза");
}


function searchDiv(labels, caption) {
    var label = labels.find(label => {
        return label.textContent.match(caption);
    });
    return label ? label.nextElementSibling : null;
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

function mapTATitle(title) {
    switch(title) {
        case "Mr" : return "Mr";
        case "Mrs" : return "Mrs";
        case "Child" : return "Chld";
        case "Infant" : return "Inf";
        default  : return null;
    }
}

function mapSex(title) {
    switch(title) {
        case "2" : return "жен.";
        case "1" : return "муж.";
        default  : return null;
    }
}
