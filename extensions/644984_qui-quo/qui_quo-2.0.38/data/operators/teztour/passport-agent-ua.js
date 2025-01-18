//Заполнение паспортных данных
var OPERATOR_NAME = "TEZ TOUR";

function injectQuickReservationData(selInsert, func) {
    var boxes = querySelectorAll(document, ".guest-items .guest-data-box .white-field-bg, #buyer-info-box");
    boxes.forEach((box) => {
        if ( !box.querySelector(selInsert) ) {
            box.append(func({
                addTag: "div",
                legendStyle: "color:#2a5fab;"
            }));
        }
    });
}

function pasteOrderData(elem, data, passport, errors) {
       setInputValues(elem, [
            '[name*="birthdate"]', customDateToFullString(data.birthday),
            '.p-issue', customDateToFullString(passport.issueDate),
            '.p-expiries:not([name="extradata_pissue"])', customDateToFullString(passport.expire),
            '[name="extradata_pissue"]', customDateToFullString(passport.issueDate),
            ".p-series", passport.serial,
            ".p-number", passport.number,
            ".tPhone", data.phones.mobile,
            '[name="extradata_address"]', data.address,
            ".b-personcode", data.inn,
            '[name="extradata_lname"]', passport.surname,
            '[name="extradata_fname"]', passport.name,
            '[name="extradata_sname"]', passport.secondName,
            '[name="extradata_pnumber"]', passport.fullNumber
        ], errors, 'blur', ['focus', 'change']
    );

    querySelectorAll(elem,"input.input-lastname, input.input-name" ).forEach( n => {
        if ( n.value === "" ) {
            errors.push(`${n.classList.contains("input-lastname") ? 'Фамилия' : 'Имя'} — возможно, требуется латиница.`);
        }
    });
    var sexElem = elem.querySelector('select[name*="prefix"]');
    var country = elem.querySelector('select[name*="id_citizenship"]');
    setSelectIndex(elem, [
            country, data.nationality,
            sexElem, {
                value: mapTezSex(data.sex),
                caption: "Пол"
            }
        ], errors
    );

    if ( sexElem ) {
        var sexLabel = sexElem.parentNode.querySelector(".selectBox-label");
        if ( sexLabel ) {
            sexLabel.textContent = selectedOption(sexElem);
        }
    }

    if ( country && country.selectedIndex !== -1 ) {
        simulateEvent(country.parentNode.querySelector(".chosen-container"), "mousedown");
        var li = elem.querySelector(`[data-option-array-index="${country.selectedIndex}"]`);
        if ( !li ) {
            errors.push("Гражданство");
        }
        simulateEvent(li, "mouseup");
    }
        setInputValues(elem, [
            "input.input-lastname", passport.surname,
            "input.input-name", passport.name,
            ".b-personcode", data.inn
        ], errors, "keyup"
    );

}

function getPassengerRowBySelect(select) {
    return select.closest('.guest-data-box, #buyer-info-box');
}

function mapTezSex(sex) {
    switch (sex.value) {
        case "1" :
            return "Муж";
        case "2" :
            return "Жен";
        default  :
            return "Не выбран";
    }
}
