window.OPERATOR_NAME = "Travelata";

function injectQuickReservationData(selInsert, func) {
    const elements = $$(".passport-item, .contacts-data__form");
    elements.forEach((element) => {
        if (!element.querySelector(selInsert)) {
            const div = document.createElement("div");
            div.append(func({
                addTag: "div",
                newTagStyle: 'font-size:14px',
                selectStyle: `      border: 1px solid black;
                                    border-radius: 6px;
                                    padding: 4px;
                                    cursor: pointer;`
            }));
            element.append(div);
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    const docType = getDocTypeNode(div, passport);
    if ( docType ) {
        docType.click()
        await waitingFor(() => null, 100, 3)
    }

    setInputValues(div, [
            'input[name*="internalLastName"], input[name*="foreignLastName"]', passport.surname,
            'input[name*="internalFirstName"], input[name*="foreignFirstName"]', passport.name,
            'input[name*="internalMiddleName"], input[name*="foreignMiddleName"]', passport.secondName,
            'input[name*="internalSerialNumber"]:not(input[name*="_part"]), input[name*="foreignSerialNumber"]', passport.fullNumber,
            'input[name*="birthday"]', customDateToFullString(data.birthday),
            'input[name*="internalIssueDate"]', customDateToFullString(passport.issueDate),
            'input[name*="foreignIssueExpireDate"]', customDateToFullString(passport.expire),
            'input[name="email"]', data.email,
            'input[name="phone"]', data.phones.mobile,
            'input[name="name"]', {value: [passport.surname.value, passport.name.value].join(' '), caption: 'Фамилия и Имя'}
        ], errors, ['change', 'blur'], ['focus', 'input'], true
    );

    if (passport.docType === 'birthday_certificate') {
        const fullNumber = passport.fullNumber.value.replace(/\s+/g, '')
        const part3 = passport.number.value.slice(-6);
        const part2 = passport.number.value.slice(-8).slice(0, 2);
        const part1 = fullNumber.replace(part3, '').replace(part2, '');

        setInputValues(div, [
            'input[name*="internalSerialNumber"][name*="_part3"]', {value: part3, caption: 'Свидетельство о рождении'},
        ], errors, ['change', 'blur'], ['focus', 'input'], true);
        await waitingFor(() => null, 100, 3)
        setInputValues(div, [
                'input[name*="internalSerialNumber"][name*="_part1"]', {value: part1, caption: 'Свидетельство о рождении'},
            ], errors, ['change', 'blur'], ['focus', 'input'], true
        );
        await waitingFor(() => null, 100, 3)
        setInputValues(div, [
                'input[name*="internalSerialNumber"][name*="_part2"]', {value: part2, caption: 'Свидетельство о рождении'},
            ], errors, ['change', 'blur'], ['focus', 'input'], true
        );

    }

    if (data.sex.value) {
        const sexInput = $1(`input[value="${data.sex.value}"]`, div);
        if (sexInput) {
            sexInput.click();
        }
    }
}

function getDocTypeNode(div, passport) {
    const select = div.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    const allLabels = $$('.passport-item__header .tabs__item-label', div);
    switch (value) {
        case "Внутренний паспорт" :
            if (passport.docType === "birthday_certificate") {
                return allLabels.find(l => getText(l).match(/Св-во о рождении РФ/i))
            } else {
                return allLabels.find(l => getText(l).match(/Паспорт РФ/i));
            }
        case "Заграничный паспорт":
            return allLabels.find(l => getText(l).match(/Загранпаспорт/i));
    }
    return null;
}

function getPassengerRowBySelect(select) {
    return select.closest('.passport-item, .contacts-data__form')
}
