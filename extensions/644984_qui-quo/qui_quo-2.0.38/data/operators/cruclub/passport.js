var OPERATOR_NAME = "cruclub.ru";

function injectQuickReservationData(selInsert, func) {
    var stepThree = document.querySelector('[href="#step3"]');
    if ( !stepThree ||  stepThree.parentNode.getAttribute("aria-expanded") === "false") {
        return;
    }
    querySelectorAll(document, "table.pt.bperson tbody tr.hr, table.pt.bperson tbody tr.adult, " +
        "table.pt.bperson tbody tr.child, " +
        "table.pt.bcontact tbody tr.hr, " +
        "table.pt.bcontact tbody.body tr").forEach(tr => {
        if ( tr.className === "hr" && !tr.querySelector(".qq-caption") ) {
            tr.append(createHeadCell());
        } else {
            if ( !tr.querySelector(selInsert) && !tr.querySelector(".qq-caption") ) {
                tr.append(func({
                    addTag: "td",
                    tagStyle: "padding: 10px;",
                    selectStyle: "width: auto;color: black;",
                    displayCaption: false
                }));
            }
        }
    });
}

function createHeadCell() {
    var newTd = document.createElement("td");
    newTd.innerHTML = "Быстрое бронирование через <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo  и U-ON: ";
    newTd.style = "vertical-align: middle;";
    newTd.className = "qq-caption";
    return newTd;
}

function pasteOrderData(tr, data, passport, errors) {
    setInputValues(tr, [
            "input.lname", passport.surname,
            "input.fname", passport.name,
            "input.mname", data.secondName,
            "input.bdate", customDateToFullString(data.birthday),
            "input.pid", { value: passport.serial.value + " " + passport.number.value, caption: "Номер паспорта" },
            "input.pedate", customDateToFullString(passport.expire),
            "input.nationality", getCountryCode(data.nationalityEng.value),
            "input.email", data.email,
            "input.phone", data.phones.mobile
        ], errors
    );
    setSelectIndex(tr, [
            "select.sex", {
                value: mapTATitle(data.sex.value),
                caption: data.sex.caption
            }
        ], errors
    );

}

function getPassengerRowBySelect(select) {
    var tr = select.parentNode;
    while (true) {
        if ( tr.tagName === "TR" ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}

function mapTATitle(sex) {
    if ( sex == "0" ) {
        return null;
    }
    if ( sex == "1" ) {
        return "М"
    }
    if ( sex == "2" ) {
        return "F"
    }
}