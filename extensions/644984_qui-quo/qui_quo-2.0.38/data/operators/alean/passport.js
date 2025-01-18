var OPERATOR_NAME = "Алеан";

function injectQuickReservationData(selInsert, func) {
    var divs = querySelectorAll(document, ".bookingTouristsForm-item");
    divs.forEach((div) => {
        if ( !div.querySelector(selInsert) ) {
            div.append(func({
                addTag: "div",
                style: "padding-bottom: 20px;",
                selectStyle: ""
            }));
        }
    });
    divs.forEach(div => {
        querySelectorAll(div, "legend").forEach(legend => {
            if ( legend && legend.getAttribute("qq-style") !== "applied" ) {
                legend.style.marginBottom = "5px";
                legend.style.fontSize = "12px";
                legend.setAttribute("qq-style", "applied");
            }
        })
    });
}

function pasteOrderData(div, data, passport, errors) {
    if ( !document.querySelector("[for*='f-surname']").textContent.match(/латинскими буквами/g) ) {
        transliterate = (it) => { return it; }
    }

    setSelectIndex(div, [
            "[id*='f-gender']", {
                value: mapSex(data.sex),
                caption: data.sex.caption
            },
           "[id*='f-docCountry']", data.nationality,
           "[id*='f-docType']", getDocType(div, passport)
        ], errors
    );

    setInputValues(div, [
            "[id*='birthDate']", customDateToFullString(data.birthday),
            "[id*='f-surname']", { value : transliterate(passport.surname.value.toLowerCase()).toUpperCase() , caption: passport.surname.caption },
            "[id^='f-name']", { value :transliterate(passport.name.value.toLowerCase()).toUpperCase(), caption : passport.name.caption },
            "[id^='f-midname']", { value : transliterate(data.secondName.value.toLowerCase()).toUpperCase(), caption: data.secondName.caption },
            "[id*='f-passport'], [id*='f-birthCert'], [id*='f-foreignPasp'], [id*='f-nationalPasp'], [id*='f-doc']:not([id*='f-docCountry']):not([id*='f-docType'])", { value: passport.serial.value  + passport.number.value, caption: "Серия и номер документа"},
            "[id*='f-issueDate']", customDateToFullString(passport.issueDate)
        ], errors, "change"
    );

}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return "Муж.";
        case "2" :
            return "Жен.";
        default  :
            return null;
    }
}

function getDocType(form, passport) {
    var select = form.querySelector(".qq-select select");
    var value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            if ( passport.docType === "birthday_certificate" ) {
                value = "Св-во о рождении"
            }
            if ( passport.docType === "other_passport" ) {
                value = "Национальный паспорт"
            }

            if ( passport.docType === "passport" ) {
                value = "Паспорт РФ";
            }
            break;
        case "Заграничный паспорт" :
            value = "Загранпаспорт";
            break;
    }
    return {
        value: value,
        caption: "Тип документа"
    };
}

function getPassengerRowBySelect(select) {
    var tr = select.parentNode;
    while (true) {
        if ( tr.className.match("bookingTouristsForm-item") ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}