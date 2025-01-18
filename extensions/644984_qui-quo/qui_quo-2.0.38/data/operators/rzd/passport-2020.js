window.OPERATOR_NAME = "RZD";

function injectQuickReservationData(selInsert, func) {
    querySelectorAll(document, ".rzd-card__content-container rzd-passenger-general-info").forEach(card => {

        const cardContainer = card.closest('.rzd-card__content-container ');
        if ( cardContainer && !cardContainer.querySelector(selInsert) ) {
            const contentContainer = card.closest('rzd-card-content');
            const attributes = [...contentContainer.attributes];
            const newCard = func({
                addTag: "rzd-card-content",
                legendStyle: "font-size:12px;font-weight: bold;border:none;margin:0"
            });
            attributes.forEach(attr => newCard.setAttribute(attr.name, attr.value));
            cardContainer.prepend(newCard);
        }
    })
}

async function pasteOrderData(div, data, passport, errors) {
    const documentTypeSelect = div.querySelector('[formcontrolname="docType"]');
    const documentTypeSelectControl = documentTypeSelect.querySelector('.select--closed');
    if ( documentTypeSelectControl ) {
       await waitingFor(() => null, 50, 2);
     //  documentTypeSelectControl.click();
       simulateMouseEvent(documentTypeSelectControl, 'mousedown');
       await waitingFor(() => null, 50, 2);
    }

    const docType = getDocType(div, passport);
    const doctypeSelectNode = $1('ui-kit-form-field[formcontrolname="docType"] ui-kit-select div.select');
    let options = $$('[aria-label*="Выберите тип документа"] ui-kit-option');
    if ( options.length === 0 )  {
        simulateEvent(doctypeSelectNode, 'focus');
        simulateMouseEvent(doctypeSelectNode, 'mousedown');
        await waitingFor(() => null, 100, 2);
    }
    options = $$('[aria-label*="Выберите тип документа"] ui-kit-option')
    const option = options.find(option => getNodeProperty(option) === docType);
    if ( option ) {
        option.click();
        simulateMouseEvent(option, 'mousedown');
    } else {
        errors.push("Тип документа");
    }

    await waitingFor(() => null, 50, 2);
    const genderSelector = document.querySelector('rzd-bkit-gender-selector');
    const sexSel = mapSex(data);
    const selectSex = genderSelector.querySelector(sexSel.value);
    if ( selectSex ) {
        selectSex.click()
    } else {
        errors.push("Пол");
    }
    setInputValues(div, [
        "[formcontrolname='lastName'] input, [controlname='lastName'] input, [controlname='lastNameCyrillic'] input", data.surname,
        "[formcontrolname='firstName'] input, [controlname='firstName'] input, [controlname='firstNameCyrillic'] input", data.name,
        "[formcontrolname='patronymic'] input, [controlname='patronymic'] input, [controlname='patronymicCyrillic'] input", data.secondName,


        "[formcontrolname='birthday'] input, [controlname='birthday'] input", customDateToFullString(data.birthday),
        "[formcontrolname='docNumber'] input, [controlname='docNumber'] input", {
            value: passport.serial.value + passport.number.value,
            caption: "Серия и номер документа"
        },
    ], errors, ["focus", "change", "input", "keyup", "blur"], ["focus"], true);
    if ( docType === "Заграничный паспорт" ) {
        setInputValues(div, [
            "[controlname='lastNameCyrillic'] input", data.surname,
            "[controlname='firstNameCyrillic'] input", data.name,
            "[controlname='patronymicCyrillic'] input", data.secondName,
            "[formcontrolname='lastNameEn'] input, [controlname='lastNameEn'] input", passport.surname,
            "[formcontrolname='firstNameEn'] input, [controlname='firstNameEn'] input", passport.name,
            "[formcontrolname='patronymicEn'] input, [controlname='patronymicEn'] input", { value: transliterate(data.secondName.value.toLowerCase()).toUpperCase(), caption: "Отчество" },
            "[formcontrolname='validTill'] input, [controlname='validTill'] input", customDateToFullString(passport.expire),

        ], errors, ["focus", "change", "input", "keyup", "blur"]);
    }

    simulateEvent(document.body, "mousedown");
}

function getDocType(div, passport) {
    const select = div.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            if ( passport.docType === "birthday_certificate" ) {
                value = "Свидетельство о рождении";
            } else {
                value = "Паспорт РФ";
            }
            break;
        case "Заграничный паспорт":
            value = "Заграничный паспорт";
            break;
    }
    return value;
}

function getPassengerRowBySelect() {
    return document.body;
}


function mapSex(data) {
    const sex = data.sex;
    switch (sex.value) {
        case "1" :
            sex.value =  ".btn--male";
            return sex;
        case "2" :
            sex.value =  ".btn--female";
            return sex;
        default  :
            sex.value =  "WRONG";
            return sex;
    }
}
