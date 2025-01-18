var OPERATOR_NAME = "Pegas";

function injectQuickReservationData(selInsert, func) {
    var doc = document.querySelector("#pegasys");
    doc = doc ? doc.contentDocument : document;
    querySelectorAll(document, "form.person_form").forEach((form) => {
        if ( !form.querySelector(selInsert) ) {
            var delimiter = form.querySelector(".marked_header");
            if ( delimiter ) {
                delimiter.before(func({
                    style: "float:left;",
                    addTag: "div",
                    selectStyle: "float:left;",
                    addTransliteratedNationalPassport: true
                }));
            } else {
                form.append(func({
                    style: "float:left;",
                    addTag: "div",
                    selectStyle: "float:left;",
                    addTransliteratedNationalPassport: true
                }));
            }
        }
    });

    querySelectorAll(doc, "#changePerson").forEach((form) => {
        if ( form.clientHeight === 0 && form.querySelector(selInsert) ) {
            form.querySelector(selInsert).remove();
            return;
        }
        if ( !form.querySelector(selInsert) ) {
            var delimiter = form.querySelector(".grey-title, .bottom-bar .buttons");
            if ( delimiter ) {
                delimiter.parentNode.before(createTd(func, selInsert));
            }
        }
    });

    var customerForm = document.querySelector("form[name='customer'], .booking-private-customer");
    if ( customerForm && !customerForm.querySelector(selInsert) ) {
        customerForm.append(func({
            style: "float:left;",
            addTag: "div",
            selectStyle: "float:left;",
            addTransliteratedNationalPassport: true
        }));
    }
}

function createTd(func, selInsert) {
    var newTr = document.createElement("tr");
    var newTd = func({
        style: "float:left;margin-left: 24px",
        addTag: "td",
        addTransliteratedNationalPassport: true
    });
    newTd.setAttribute("colspan", "2");
    newTr.className = selInsert.replace(/\./g, '');
    newTr.append(newTd);
    return newTr;
}

async function pasteOrderData(form, data, passport, errors) {

    if ( form.getAttribute("name") === "customer" || form.className === "booking-private-customer" ) {
        //errors.push("Код подразделения");
    } else {
        var sex = mapSex(data.sex);
        querySelectorAll(form, "#male, #female, #change-person-male, #change-person-female").forEach(sexInput => {
            sexInput.checked = false;
        });
        setCheckboxValues(form, [
            "input[value='" + sex + "'], input[id='change-person-" + sex + "']", { value: true, caption: data.sex.caption },
        ], errors);
    }

    setSelectIndex(form, ["#citizenship", mapNationality(data.nationality),
                                              "#doctypes", getDocType(form, passport)], errors);
    setSelectIndex(form, ["#change-person-citizenship", mapNationality(data.nationality),
                                              "#change-person-traveldocumenttype", getDocType(form, passport)], errors);

    setULSelectIndex(form, ["#change-person-citizenship", mapNationality(data.nationality)]);

    form.style.opacity = '0.4';
    form.style.position = 'relative';
    const text = document.createElement('span');
    let attempts = 2;
    text.textContent = 'Заполняем...';
    text.style.cssText = `
            position: absolute;
            top: 15%;
            right: 30%;
            font-size: 32px;
            opacity: 1;
            font-weight: bold;`;
    form.append(text);

    await waitingFor(() => {
        text.textContent = 'Заполняем...';
        if ( attempts === 1  && $1('.busy-indicator') && $1('.busy-indicator').clientHeight > 0) {
            attempts = 2;
        }
        if ( attempts === 0 ) {
            return true;
        }
        attempts--;
        return null
    }, 400, 100);
    text.remove()
    form.style.opacity = '1';


    setULSelectIndex(form, ["#change-person-traveldocumenttype", getDocType(form, passport)]);

    setInputValues(form, [
        "#customer_DocumentIssuerName, .private-customer-document-issuer-name", passport.authority,
        ".private-customer-document-issuer-code ", passport.authorityCode
    ], errors, "keyup");

    setInputValues(form, [
        "#birthdate, #customer_DateOfBirth, .private-customer-date-of-birth, #change-person-birth-date", customDateToFullString(data.birthday),
        "#passport_where, #customer_DocumentIssue, .private-customer-document-issue-date, #change-person-passport-issue-date", customDateToFullString(passport.issueDate),
        "#passport_due, #change-person-passport-expiration-date", customDateToFullString(passport.expire),
        "#surname, #customer_LastName, .private-customer-last-name, #change-person-last-name", passport.surname,
        "#name, #customer_FirstName, .private-customer-first-name, #change-person-first-name", passport.name,
        "#passport_number, #customer_DocumentNumber, .private-customer-document-number, #change-person-passport-number", {
            value: passport.serial.value + passport.number.value,
            caption: "Серия и номер документа"
        },
        "#passport_who, #change-person-passport-issuer", (() => {
            if ( !passport.authorityCode ) {
                return passport.authority
            }
            passport.authority.value += " " + passport.authorityCode.value;
            return passport.authority
        })(),
        "#phone, #customer_Phone, .private-customer-phone, #change-person-phone", data.phones.main,
        "#phone_mobile, #change-person-mobile-phone", data.phones.mobile,
        "#email, #customer_Email, .private-customer-email, #change-person-email", data.email,
        "#address, #customer_Address, .private-customer-address, #change-person-address", data.address,
        "#customer_MiddleName, .private-customer-middle-name", passport.secondName || data.secondName
    ], errors, "keyup");
    console.log(data.phones)

}

function setULSelectIndex(node, selectArray) {
    if ( node && selectArray && selectArray.length > 0 ) {
        for ( var i = 0; i < selectArray.length; i += 2 ) {
            var data = selectArray[i + 1];
            var prepareNode = data.value ? document.querySelector(`a[rel*='${data.value.replace(/\s+/g, "")}']`) : null;
            if ( prepareNode ) {
                simulateMouseEvent(prepareNode, "mouseup");
            }
        }
    }
}

function getPassengerRowBySelect(select) {
    var tr = select.parentNode;
    while (true) {
        if ( tr.tagName === "FORM" || tr.className === "booking-private-customer" || tr.id === "changePerson" ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return "male";
        case "2" :
            return "female";
        default  :
            return "WRONG";
    }
}

function mapNationality(nationality) {
    switch (nationality.value) {
        case "Беларусь" :
            nationality.value = "Республика Беларусь";
            break;
    }
    return nationality;
}

function getDocType(form, passport) {
    var select = form.querySelector(".qq-select select");
    var value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт транслит" :
        case "Внутренний паспорт" :
            if ( passport.docType === "birthday_certificate" ) {
                value = "Свидетельство о рождении"
            } else {
            value =  "Гражданский паспорт";
            }
    }
    return {
        value: value,
        caption: "Тип документа"
    };
}
