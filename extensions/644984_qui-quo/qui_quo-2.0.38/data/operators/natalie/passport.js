function getQRDoc() {
    var doc = document.querySelector("#VAR_SEARCH");
    return doc ? doc.contentDocument : document;
}
function injectQuickReservationData(selInsert, func) {
    var head = getQRDoc().querySelector("#tPaxes > table > tbody > tr > td > table:nth-child(1) > thead > tr");
    if ( head && !head.querySelector(".qq-caption") ) {
        head.append(createQRHeadCell());
    }
    var trs = querySelectorAll(getQRDoc(), "#tPaxes tr[class*='grow']");
    trs.forEach((tr) => {
            if ( !tr.querySelector(selInsert) ) {
                tr.append(func({
                    addTag: "td",
                    tagStyle: "padding: 10px;",
                    selectStyle: "width: auto",
                    displayCaption: false
                }));
            }
    });
}

function createQRHeadCell() {
    var newTh = document.createElement("th");
    newTh.innerHTML = "Быстрое бронирование через <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo  и U-ON: ";
    newTh.style = "align: center; color: white";
    newTh.className = "qq-caption";
    return newTh;
}

function pasteOrderData(tr, data, passport, errors) {
    if ( data.sex.value && data.sex.value !== "0" ) {
        var sexSelect = data.sex.value == "1" ? "#fSelect__M" : "#fSelect__F";
        simulateEvent(tr.querySelector(sexSelect), "click");
    }
    var tds = querySelectorAll(tr, "td input.field").filter(input => {
        return input.offsetHeight !== 0;
    });
    setInputValues(tr, [
            tds[2], { value: customDateToFullString(data.birthday).value.replace(/\./g, "/"), caption: "Дата рождения" },
            tds[0], passport.surname,
            tds[1], passport.name,
            tds[3], { value: passport.serial.value + passport.number.value, caption: "Паспорт" },
            tds[4], {
                value: customDateToFullString(passport.expire).value.replace(/\./g, "/"),
                caption: "Действителен до"
            },
            tds[5], { value: data.phones.main.value.replace(/\D/, ""), caption: "PHONE" }
        ], errors, ["focus", "input", "keyup", "change", "blur"]
    );

    var pseudoSelect = tr.querySelector("#fSelect__178").parentNode;
    searchAndSetCountry( querySelectorAll(pseudoSelect, "div.seloptnormal"), data.nationality, errors );

}

function getPassengerRowBySelect(select) {
    var tr = select.parentNode;
    while (true) {
        if ( tr.className.match(/grow/i) ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}

function searchAndSetCountry(array, nationality, errors) {
    if ( !nationality.value ) {
        errors.push(nationality.caption);
        return;
    }
    var country = array.find(div => {
        return div.textContent.trim() === nationality.value;
    });
    if ( country ) {
        simulateEvent(country, "click")
    }
}