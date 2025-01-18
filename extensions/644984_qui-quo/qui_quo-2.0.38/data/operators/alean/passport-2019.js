function injectQuickReservationData(selInsert, func) {
    var divs = querySelectorAll(document, ".bookingTouristsForm-item .bookingTouristsForm-itemContent, form.bookingTouristsContactsForm ");
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
    createQuickReservationButton()
}

function createQuickReservationButton() {
    if ( !document.querySelector('.qq.quick-reservation-btn') ) {
        const commentBlock = document.querySelector('.bookingCommentForm textarea');
        if ( !commentBlock ) {
            return;
        }
        const btn = document.createElement('button');
        btn.textContent = 'Вставить данные пассажиров с помощью Qui-Quo';
        btn.classList.add('qq', 'quick-reservation-btn', 'btn', 'btn-danger');
        btn.style.marginTop = '10px';
        btn.addEventListener('click', () => pasteOrderDataToTextArea(btn, commentBlock))
        commentBlock.after(btn);
    }
}

function pasteOrderDataToTextArea(btn, commentBlock) {
    const delimiter = '=====Паспортные данные туристов=====';
    const tourists = $$('.bookingTouristsForm-item .bookingTouristsForm-itemContent .qq-select select').map(select => {
        return parseTouristData(new InitialData(ORDER_DATA, {target: select}), select);
    }).filter(t => t);
    commentBlock.value = commentBlock.value.split(delimiter)[0].trim();
    if ( !tourists || tourists.length === 0 ) {
        return;
    }
    commentBlock.value = (commentBlock.value ? commentBlock.value + '\n' : commentBlock.value) + delimiter + '\n' + tourists.join('\n');
}

function parseTouristData(initialData, select) {
    try {
        const {passport, data} = initialData;
        const fio = [passport.surname,
            passport.name,
            passport.secondName].filter(d => d).map(t => t.value).join(' ')
        const passportData = [
            {value: data.birthday ? "Дата рождения:" : null},
            customDateToFullString(data.birthday),
            getDocType(select.parentNode, passport),
            {value: passport.serial.value && passport.number.value ? "Серия и номер:" : null},
            passport.serial,
            passport.number,
            {value: passport.expire && passport.issueDate.value ? "Дата выдачи:" : null},
            customDateToFullString(passport.issueDate),
            {value: passport.expire && passport.expire.value ? "Действителен до:" : null},
            customDateToFullString(passport.expire)].filter(d => d).map(t => t.value).filter(d => d).join(' ')
        const other = [
            {value: data.nationality.value ? "Национальность:" : null},
            data.nationality,
            {value: data.inn.value ? "ИНН:" : null},
            data.inn,
            {value: data.address.value ?"Адрес:" : null},
            data.address,
            {value: "Контакты:"},
            data.phones.mobile,
            data.email
        ].filter(d => d).map(t => t.value).filter(d => d).join(' ')
        return [fio, passportData, other].join(', ');
    } catch (e) {
        return null;
    }
}

function pasteOrderData(div, data, passport, errors) {
     setSelectIndex(div, [
            "tourist-input-gender select", {
                value: mapSex(data.sex),
                caption: data.sex.caption
            },
            "tourist-input-citizenship select", data.nationality,
            "tourist-input-document-select select", getDocType(div, passport)
        ], errors
    );

    setInputValues(div, [
            "tourist-input-birthdate input", customDateToFullString(data.birthday),
            "tourist-input-surname-uppercase-latin input", { value : transliterate(passport.surname.value.toLowerCase()).toUpperCase() , caption: passport.surname.caption },
            "tourist-input-name-uppercase-latin input", { value :transliterate(passport.name.value.toLowerCase()).toUpperCase(), caption : passport.name.caption },
            "tourist-input-surname input", passport.surname,
            "tourist-input-name input", passport.name,
            "tourist-input-midname input", passport.secondName,
            "tourist-input-midname-uppercase-latin input", { value : transliterate(data.secondName.value.toLowerCase()).toUpperCase(), caption: data.secondName.caption },
            "tourist-input-passport input, tourist-input-birth-certificate input, tourist-input-passport-foreign input, tourist-input-passport-national input",
                                                          { value: passport.serial.value  + passport.number.value, caption: "Серия и номер документа"},
            "tourist-input-date-issue input", customDateToFullString(passport.issueDate),
            "tourist-input-date-expiry input", customDateToFullString(passport.expire),
            'input[booking-tourist-input="PHONE_ITU"]', data.phones.mobile,
            'input[ng-model="vm.contacts.email"]', data.email
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
        if ( tr.className.match(/bookingTouristsForm-itemContent|bookingTouristsContactsForm /)) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}
