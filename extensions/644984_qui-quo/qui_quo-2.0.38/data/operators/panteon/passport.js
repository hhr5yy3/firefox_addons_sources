function injectQuickReservationData(selInsert, func) {
    var tables = querySelectorAll(document, ".tourist");
    tables.forEach((table) => {
        if (!table.querySelector(selInsert)) {
            table.append(func({
                legendStyle: 'font-size: 12px;margin-bottom:3px;'
            }));
        }
    });
}

function getSex (touristNode,  data, errors) {
    const sexElem = $1('#slSex', touristNode);
    if (data.sex.value === '1') {
        sexElem. selectedIndex = 0;
        simulateMouseEvent(sexElem, "change");
    }else if (data.sex.value === '2'){
        sexElem. selectedIndex = 1;
        simulateMouseEvent(sexElem, "change");
    }else {
        errors.push("Пол")
    }
}

async function pasteOrderData(touristNode, data, passport, errors) {
    console.log(data)
    getSex (touristNode, data, errors)
    setInputValues(touristNode, [
            "input.ipLastName", passport.surname,
            "input.ipFirstName", passport.name,
            "input.ipLastNameRus", data.nationalPassport.surname,
            "input.ipFirstNameRus", data.nationalPassport.name,
            "input.ipPatronymicRus", data.nationalPassport.secondName,
            "input.ipPassportSeries", passport.serial,
            "input.ipPassport", passport.number,
            "input.ipPhone", data.phones ? data.phones.mobile : "",
            "input.ipEmail", data.email,
            "input.ipPassportByWhomRus", data.address,
            "input.ipCitizenID", data.inn,
        ], errors, ["change", "keyup", "blur"], ["input"], true
    );
    setInputValues(touristNode, [
            "input.ipPassportDate", customDateToFullString(passport.issueDate)
        ], errors, ["keyup", "blur"]
    );
    setInputValues(touristNode, [
            "input.ipPassportDateEnd", customDateToFullString(passport.expire)
        ], errors, ["keyup", "blur"]
    );
    setInputValues(touristNode, [
            "input.ipBirthDate", customDateToFullString(data.birthday)
        ], errors, ["keyup", "blur"]
    );
    const natInput = $1('input.ipCitizenship', touristNode)?.closest('td')?.querySelector('ul');
    const nationalityCloseButton = $1('a.select2-search-choice-close', touristNode);
    if (nationalityCloseButton) {
        simulateMouseEvent(nationalityCloseButton, "click");
    }
    if ( natInput && data.nationality.value ) {
        const natUl = natInput.closest('td').querySelector('ul');
        natUl.click()
        const natOption = await waitingFor(() => findNationalityOption(data.nationality.value), 200, 10)
        if (natOption) {
            simulateMouseEvent(natOption, "click");
            simulateMouseEvent(natOption, "mousedown");
            simulateMouseEvent(natOption, "mouseup");
        } else {
            errors.push("Гражданство")
        }
    }



}

function findNationalityOption(nationality, ) {
    const nationalityElem = $1('#select2-drop .select2-results');
    nationalityElem.scrollTop += 1000;
    return $$('.select2-results [role="option"]').find(option => {
        if (getText(option) === nationality) {
            return option
        }
    }) || null;
}

function getPassengerRowBySelect(select) {
    var elem = select.parentNode;
    while (elem) {
        if (elem.classList.contains("tourist")) {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}
