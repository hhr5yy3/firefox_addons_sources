window.OPERATOR_NAME = 'Travelleader';

function injectQuickReservationData(selInsert, func) {
    $$('#contentContainer .passinfo').forEach(passenger => {
        if ( passenger && !passenger.querySelector(selInsert) ) {
            passenger.append(func({
                addTag: "div",
                addTransliteratedNationalPassport: true
            }));
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    const sexInput = div.querySelector(mapSexSel(data.sex));
    if ( sexInput ) {
        sexInput.click();
    }

    setInputValues(div, [
            "input[name*='surname']", (passport.surname),
            "input[name^='name']", (passport.name),
            "input[name*='middlename']", (passport.secondName || {caption: "Отчество", value: null}),
            "input[name*='docExpire']", customDateToFullString(passport.expire),
            "input[name*='docNum']", {value: passport.serial.value + passport.number.value, caption: 'Номер документа'}
        ], errors, 'none', "focus"
    );
    await waitingFor(()=>null, 100, 2)
    setInputValues(div, [
            "input[name*='birth'", customDateToFullString(data.birthday),
        ], errors, 'none', "focus"
    );
}


function getDocType(div) {
    const select = div.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            return "Паспорт РФ";
        case "Заграничный паспорт":
            return "Загранпаспорт";
        case "Свидетельство о рождении":
            return "Свидетельство о рождении";
        default: return 'none'
    }
}


function mapSexSel(sex) {
    switch (sex.value) {
        case "1" :
            return '[value="male"]';
        case "2" :
            return '[value="female"]';
    }
    return "none";
}

function getPassengerRowBySelect(select) {
    return select.closest('.passinfo');
}
