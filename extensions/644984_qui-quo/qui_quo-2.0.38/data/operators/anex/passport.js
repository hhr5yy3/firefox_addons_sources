//Заполнение паспортных данных
window.OPERATOR_NAME = window.OPERATOR_NAME === "SAMO-tour" ? "Anex" : window.OPERATOR_NAME;

function injectQuickReservationData(selInsert, func) {
    var panels = querySelectorAll(document, ".tourists-tabs .panel, #edit_tourist_form, #phys_byer, .BUYERINFO .panel, .reportForm");
    panels.filter(panel => $1('input[name*="NAME"]', panel)).forEach((panel) => {
        if (!panel.querySelector(selInsert)) {
            panel.append(func({
                style: "margin-left: 40px;max-width:500px",
                addTag: "div",
                tagStyle: "float: left;max-width:500px",
                selectStyle: "float:left"
            }));
        }
    });
    querySelectorAll(document, ".qq-select legend:not(.qq-warning)").forEach(legend => {
        legend.style = "position: inherit;";
    });
}


async function pasteOrderData(panel, data, passport, errors) {
    querySelectorAll(panel, "div.sex input").forEach(sexInput => {
        sexInput.checked = false;
    });

    if ( $1('div.sex input', panel) ) {

        setCheckboxValues(panel, [
            "div.sex input[value='" + mapSex(data.sex) + "']", {value: true, caption: data.sex.caption},
        ], errors);
    }


    if (OPERATOR_NAME === "TUI" || OPERATOR_NAME === "Calypso Tour") {
        mapNationality(data.nationality, data.nationalityEng);
    }

    const natSelect = panel.querySelector("select[name*='[NATIONALITY]']");
    setSelectIndex(panel, [natSelect, data.nationality], errors);
    applySelectOption(panel, "Гражданство", natSelect, errors);
    if (panel.id !== 'edit_tourist_form') {
        panel.style.opacity = '0.4';
        panel.style.position = 'relative';
        const text = document.createElement('span');
        let attempts = 5;
        text.textContent = 'Заполняем...' + attempts;
        text.style.cssText = `
            position: absolute;
            top: 50%;
            right: 45%;
            font-size: 32px;
            opacity: 1;
            font-weight: bold;`;
        panel.append(text);
        setTimeout(() => text.remove(), attempts * 500);
        await waitingFor(() => {
            text.textContent = 'Заполняем...' + (--attempts);
            return null
        }, 500, attempts);
        panel.style.opacity = '1';
    }
    const docSelect = panel.querySelector("select[name*='[IDENTITY_DOCUMENT]']")
    const docType = getDocType(panel);
    setSelectIndex(panel, [docSelect, {value: docType, caption: 'Документ'}], errors);
    applySelectOption(panel, "Тип документа", docSelect, errors);

    const kindSelect = panel.querySelector("select[name*='[HUMAN]']");
    const kind = mapKind(data.title);
    setSelectIndex(panel, [kindSelect, {value: kind, caption: 'MR/MRS/CHD/INF'}], errors);
    applySelectOption(panel, 'MR/MRS/CHD/INF', kindSelect, errors);
    if (!$first("input[data-field-title='Серия паспорта'], input[name*='[PSERIE]']", panel)) {
        passport.number.value = passport.serial.value + passport.number.value;
    }

    setInputValues(panel, [
            "input[name*='[NAME]']", passport.fio,
            "input[name*='[BORN]']", customDateToFullString(data.birthday),
            "input[name*='[PGIVEN]']", customDateToFullString(passport.issueDate),
            "input[name*='[PVALID]']", customDateToFullString(passport.expire),
            "input[data-field-title='Фамилия'],input[name*='[LASTNAME_LNAME]']", data.internationalPassport.surname && data.internationalPassport.surname.value ?
                data.internationalPassport.surname :
                {value: transliterate(data.nationalPassport.surname.value), caption: data.nationalPassport.surname.caption},
            "input[data-field-title='Имя'], input[name*='[FIRSTNAME_LNAME]']", data.internationalPassport.name && data.internationalPassport.name.value ? data.internationalPassport.name :
                {value: transliterate(data.nationalPassport.name.value), caption: data.nationalPassport.name.caption},
            "input[name*='[LASTNAME_NAME]']", data.nationalPassport.surname,
            "input[name*='[FIRSTNAME_NAME]']", data.nationalPassport.name,
            "input[name*='[PATRONYMIC_NAME]']", data.nationalPassport.secondName,
            "input[name*='[LASTNAME]']", passport.surname,
            "input[name*='[FIRSTNAME]']", passport.name,
            "input[data-field-title='Серия паспорта'], input[name*='[PSERIE]']", passport.serial,
            "input[data-field-title='Номер паспорта'], input[name*='[PNUMBER]']", passport.number,
            "input[name*='[PGIVENORG]']", passport.authority,
            "input[data-field-title='Мобильный телефон'], input[name*='[PHONE]'], input[name*='[MOBILE]']", {
                value: '+' +((data.phones.mobile.value || '').replace(/\D+/g, '')),
                caption: data.phones.mobile.caption
            },
            "input[name*='[ADDRESS]']", data.address,
            "input[name*='[EMAIL]']", data.email
        ], errors
    );

    const innInput = $first("input[name*='[INN]']", panel);
    if (innInput && innInput.disabled === false) {
        setInputValues(panel, [
                innInput, data.inn
            ], errors
        );
    }

    if (OPERATOR_NAME !== "KOMPAS" &&
        OPERATOR_NAME !== "Русский Экспресс" &&
        OPERATOR_NAME !== "TUI" &&
        OPERATOR_NAME !== "Kazunion" &&
        OPERATOR_NAME !== "Calypso Tour" &&
        OPERATOR_NAME !== "Selfie Travel" &&
        OPERATOR_NAME !== "Ветер Странствий") {
        errors.push("Страна рождения");
        errors.push("Виза");
    }

}

function applySelectOption(panel, caption, select, errors) {
    if (errors.indexOf(caption) === -1 && select) {
        const chosen = select ? select.parentNode.querySelector("ul.chosen-results") : null;
        if (chosen) {
            simulateEvent(chosen, "mousedown");
        }
        const pseudoSelectOption = select.parentNode.querySelector(`[data-option-array-index='${select.selectedIndex}']`);
        if (pseudoSelectOption) {
            simulateEvent(pseudoSelectOption, "mouseup");
        }
    }
}

function getDocType(div) {
    const select = div.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            return "Паспорт";
        case "Заграничный паспорт":
            return "Заграничный паспорт";
        case "Свидетельство о рождении":
            return "Свидетельство о рождении";
        default:
            return 'none'
    }
}

function getPassengerRowBySelect(select) {
    const tr = select.parentNode;
    return tr.closest('#edit_tourist_form, #phys_byer') || tr.closest('.panel');
}

function mapKind(kind) {
    switch (kind.value) {
        case "Mr" :
            return "MR";
        case "Mrs" :
            return "MRS";
        case "Miss" :
            return "MRS";
        case "Child" :
            return "CHD";
        case "Infant" :
            return "INF";
        default  :
            return "WRONG";
    }
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return "1";
        case "2" :
            return "0";
        default  :
            return "WRONG";
    }
}

function mapNationality(nationality) {
    switch (nationality.value) {
        case "Беларусь" :
            nationality.value = "Белоруссия";
            break;
    }
    return nationality;
}
