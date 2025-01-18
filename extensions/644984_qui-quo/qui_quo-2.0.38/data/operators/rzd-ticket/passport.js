const OPERATOR_NAME = "Ticket-rzd";

function injectQuickReservationData(selInsert, func) {
    const h2Elements = $$('h2');
    const h2ContactsFromHTML = h2Elements.filter(el => el.textContent === 'Контакты');
        if ( h2ContactsFromHTML[0] && !h2ContactsFromHTML[0].parentElement.querySelector(selInsert) ) {
            h2ContactsFromHTML[0].parentElement.append(func({
                style: "",
                addTag: "div",
                tagStyle: "padding: 10px;",
                selectStyle: "width: auto;background: white;"
            }));
        }
}

async function pasteOrderData(div, data, passport, errors) {
    const documentTypeSelect = document.getElementById('documents.0.documentType');
    if (documentTypeSelect) {
        simulateMouseEvent(documentTypeSelect, 'mousedown');
        await waitingFor(() => null, 50, 2);
    }
    const options = $$('[role="option"]');
    const docType = getDocType(div, passport);
    const option = options.find(option => option.textContent.trim() === docType);
    if (option) {
        option.click();
    } else {
        errors.push("Тип документа");
    }

    const genderSelector = document.getElementById('gender');
    const sexSel = mapSex(data);
    simulateMouseEvent(genderSelector, 'mousedown');
    await waitingFor(() => null, 50, 2);
    const selectSex = document.querySelector(`[data-value="${sexSel.value}"]`);
    if (selectSex) {
        selectSex.click();
    } else {
        errors.push("Пол");
    }

    setInputValues(div, [
        "input[name='lastName']", data.surname,
        "input[name='firstName']", data.name,
        "input[name='middleName']", data.secondName,
        "#birthDay", customDateToFullString(data.birthday),
        "#documents\\.0\\.documentNumber", {
            value: passport.serial.value + passport.number.value,
            caption: "Серия и номер документа"
        },
    ], errors, ["focus", "change", "input", "keyup", "blur"], ["focus"], true);

    if ( docType === "Заграничный паспорт РФ" ) {
        setInputValues(div, [
            "input[name='documents\\.0\\.lastNameRu']", data.surname,
            "input[name='documents\\.0\\.firstNameRu']", data.name,
            "input[name='documents\\.0\\.middleNameRu']", data.secondName,
            "input[name='documents\\.0\\.lastNameEn']", passport.surname,
            "input[name='documents\\.0\\.firstNameEn']", passport.name,
            "input[name='documents\\.0\\.middleNameEn']", { value: transliterate(data.secondName.value.toLowerCase()).toUpperCase(), caption: "Отчество" },
            "input[name='documents\\.0\\.validUntil']", customDateToFullString(passport.expire),

        ], errors, ["focus", "change", "input", "keyup", "blur"]);
    }

    setInputValues(div, [
        "input[name='phone']", data.phones.mobile,
        "input[name='email']", data.email,
    ], errors, ["focus", "change", "input", "keyup", "blur"], ["focus"], true);
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
            value = "Заграничный паспорт РФ";
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
            sex.value =  "M";
            return sex;
        case "2" :
            sex.value =  "F";
            return sex;
        default  :
            sex.value =  "WRONG";
            return sex;
    }
}