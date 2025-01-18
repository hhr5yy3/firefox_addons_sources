
function injectQuickReservationData(selInsert, func) {
    const divs = querySelectorAll(document, "[class*='BookingFormPassenger__Right']");
    divs.forEach((div) => {
        if ( !div.querySelector(selInsert) ) {
            div.append(func({
                addTag: "div",
                style: "margin-bottom:15px;"
            }));
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    const sexButton = div.querySelector('[class*="BookingFormPassenger__Field--gender"] button');
    if (sexButton) {
        simulateMouseEvent(sexButton, ['mousedown', 'mouseup']);
        const items = querySelectorAll(div, '[class*="BookingFormPassenger__Field--gender"] .DropdownSelect__Item');
        const sex = mapSex(data.sex.value);
        const sexItem = items.find(item => getNodeProperty(item, '').match(sex));
        if (sexItem) {
            sexItem.click();
        } else {
            errors.push(data.sex.caption);
        }
    }
    const nationalityButton = div.querySelector('[class*="Field--citizenship"] button');
    if (nationalityButton) {
        simulateMouseEvent(nationalityButton, ['mousedown', 'mouseup']);
        const items = querySelectorAll(div, '[class*="Field--citizenship"] .CountryDropdownSelect__List__Country');
        const nationalityItem = items.find(item => getNodeProperty(item, '').match(data.nationality.value));
        if (nationalityItem) {
            nationalityItem.click();
        } else {
            errors.push(data.nationality.caption);
        }
    }

    const docTypeButton = div.querySelector('[class*="FormPassenger__Field--documentType"] button');
    if (docTypeButton) {
        simulateMouseEvent(docTypeButton, ['mousedown', 'mouseup']);
        const items = querySelectorAll(div, '[class*="FormPassenger__Field--documentType"] .DropdownSelect__Item ');
        const docTypeItem = items.find(item => getNodeProperty(item, '').match(getDocType(div, passport)));
        if (docTypeItem) {
            docTypeItem.click();
        } else {
            errors.push(passport.docType.caption);
        }
    }
    setInputValues(div, [
            "[class*='--lastName'] input", passport.surname,
            "[class*='--firstName'] input", passport.name,
            "[class*='--middleName'] input", data.secondName,
            "[class*='--birthDate'] input", customDateToFullString(data.birthday),
            "[class*='--documentValidThru'] input", customDateToFullString(passport.expire),
            "[class*='--documentNumber'] input", { value: passport.serial.value + " "+ passport.number.value, caption: "Паспорт"},
            "[class*='--email'] input", data.email,
            "[class*='--phone'] input", data.phones.mobile.value ? data.phones.mobile : data.phones.main
        ], errors, ["change", "MouseLeave", "blur"], null, true
    );
}

function getDocType(div, passport) {
    const select = div.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            if (passport.docType === "birthday_certificate") {
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

function getPassengerRowBySelect(select) {
    return select.closest("[class*='BookingFormPassenger__Right']");
}

function mapSex(sex) {
    const obj = {
        "1": /Мужской/i,
        "2": /Женский/i
    };
    return obj[sex] || null;
}
