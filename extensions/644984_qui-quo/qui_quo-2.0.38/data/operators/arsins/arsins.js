const OPERATOR_NAME = "СК Арсеналъ";

function injectQuickReservationData(selInsert, func) {
    const person = document.querySelector("table[id*='apex_layout']");
    if ( person && !person.querySelector(selInsert) ) {
        person.style.position = "relative";
        person.style.marginBottom = "2em";
        person.append(func({
            addTag: "div",
            newTagStyle: "position:absolute;left: 692px;bottom: -15px;width:750px;",
            tagStyle:  "position:absolute;left: 692px;bottom: -15px;width:750px;"

        }));
    }
    querySelectorAll(document, ".uReportContainer .uReportBody table tbody tr")
        .filter(tr => tr.querySelector('[headers="DATE_BIRTH"]')).forEach(tr => {
        const mainForm = document.querySelector("#wwvFlowForm");
        if ( mainForm.style.width !== "1530px" ) {
            mainForm.style.width = "1530px";
        }
        if ( !tr.querySelector(selInsert) && tr.querySelector('[headers="DATE_BIRTH"] input') ) {
            tr.append(func({
                addTag: "td",
                displayCaption: false
            }))
        }
        if ( !tr.querySelector(selInsert) && !tr.querySelector('.qq') &&tr.querySelector('[headers="DATE_BIRTH"]')  && !tr.querySelector('[headers="DATE_BIRTH"] input') ) {
            tr.insertAdjacentHTML("beforeend", '<td class="qq"></td>');
        }

    });
    const headTr = querySelectorAll(document, ".uReportContainer .uReportBody table thead tr").find(tr => tr.querySelector("#ASSURED_NAME"));
    if ( headTr && !headTr.querySelector(".qq") ) {
        headTr.insertAdjacentHTML("beforeend",
            '<th class="qq"><legend>Быстрое бронирование через <span style="color:red;">Q</span>ui-<span style="color:red;">Q</span>uo  и U-ON: </legend></th>');
    }
}

function pasteOrderData(doc, data, passport, errors) {
     if ( doc.tagName === "TR" ) {
        pasteSmallOrderData(doc, data, passport, errors);
        return;
    }
    setInputValues(doc, [
            "input[name*='INSURER_NAME']", prepareFullName(data, passport),
            "input[name*='INSURER_DB']", customDateToFullString(data.birthday),
            "input[name*='TRIP_FROM']", customDateToFullString(data.tourStartDate),
            "input[name*='TRIP_TO']", customDateToFullString(data.tourEndDate),
            "input[name*='DOC_NUM']", {value: passport.serial.value + passport.number.value, caption: "Серия и номер"},
            "input[name*='EMAIL']", data.email
        ], errors
    );

    setSelectIndex(doc, ["select[name*='DOC_TYPE_ID']", getDocType(doc, passport)], errors)
}

function pasteSmallOrderData(doc, data, passport, errors) {
    setInputValues(doc, [
            "[headers*='ASSURED_NAME'] input", prepareFullName(data, passport),
            "[headers*='DATE_BIRTH'] input", customDateToFullString(data.birthday),
            "[headers*='ASSURED_DOC'] input", {value: passport.serial.value + passport.number.value, caption: "Серия и номер"}
        ], errors
    );
}


function prepareFullName(data, passport) {
    const fullName = [passport.name.value, passport.surname.value, (passport.secondName || {}).value].filter(value => value);
    return {
        value: fullName.join(" "),
        caption: "Страхователь"
    }
}

function getDocType(form) {
    let select = form.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            value = "Паспорт гражданина РФ";
            break;
        case "Заграничный паспорт" :
            value = "Загранпаспорт гражданина РФ";
            break;
    }
    return {
        value: value,
        caption: "Тип документа"
    };
}

function getPassengerRowBySelect(select) {
    let elem = select.parentNode;
    while (elem) {
        if ( elem.tagName === "TR" || elem.tagName === "TABLE") {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}
