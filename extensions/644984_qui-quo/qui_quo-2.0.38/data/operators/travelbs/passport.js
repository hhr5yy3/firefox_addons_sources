var OPERATOR_NAME = "TBS";

function injectQuickReservationData(selInsert, func) {
    querySelectorAll(document, "#mycontainerTourist table tbody, #mycontainerInfant table tbody")
        .forEach((table) => {
            if ( !table.querySelector(selInsert) ) {
                table.append(func({
                    addTag: "tr"
                }));
            }
        });
}

function pasteOrderData(elem, data, passport, errors) {
    setInputValues(elem, [
            'input[name*="tourists_sname"], input[name*="infant_sname"]', passport.surname,
            'input[name*="tourists_fname"], input[name*="infant_fname"]', passport.name,
            'input[name*="tourists_birthdate"], input[name*="infant_birthdate"]', customDateToFullString(data.birthday),
            'input[name*="tourists_nationality"], input[name*="infant_nationality"]', data.nationality,
            'input[name*="tourists_pasportseria"], input[name*="infant_pasportseria"]', passport.serial,
            'input[name*="tourists_pasportnum"], input[name*="infant_pasportnum"]', passport.number,
            'input[name*="tourists_pasportvalided"], input[name*="infant_pasportvalided"]', customDateToFullString(passport.expire),
        ], errors
    );
    setSelectIndex(elem, [
        'select[name*="tourists_gender"]', {
            value: mapSex(data.sex),
            caption: "Пол"
        }
    ], errors);
    elem.click();
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return "MR";
        case "2" :
            return "MRS";
        default  :
            return "Не выбран";
    }
}

function getPassengerRowBySelect(select) {
    let el = select.parentNode;
    while (el) {
        if ( el.tagName === "TBODY") {
            break;
        }
        el = el.parentNode;
    }
    return el;
}