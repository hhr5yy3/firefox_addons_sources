function injectQuickReservationData(selInsert, func) {
    var trs = querySelectorAll(document, ".touristTable.reservation tr");
    trs.forEach((tr) => {
        if ( !tr.querySelector(selInsert) && !tr.querySelector('.qq-caption') && tr.querySelector("th") ) {
            tr.append(createHeadCell());
        }
        if ( !tr.querySelector(selInsert) && !tr.querySelector('.qq-caption') && !tr.querySelector("th") ) {
            tr.append(func({
                addTag: "td",
                displayCaption: false
            }));
        }
    });
}

function createHeadCell() {
    var newTh = document.createElement("th");
    newTh.innerHTML = "Быстрое бронирование через <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo  и U-ON: ";
    newTh.style = "vertical-align: middle;";
    newTh.className = "qq-caption";
    return newTh;
}

function pasteOrderData(tr, data, passport, errors) {
    setSex(tr, data.sex, errors);
    setInputValues(tr, [
        "[id*='LastName']", passport.surname,
        "[id*='FirstName']", passport.name,
        "[id*='BirthDate']", customDateToFullString(data.birthday),
        "[id*='PassportSeries']", passport.serial,
        "[id*='PassportNumber']", passport.number,
        "[id*='PassportValidDate']", customDateToFullString(passport.expire),
        "[id*='PassportIssueDate']", customDateToFullString(passport.issueDate)
        ],errors ,["blur", "change"]
    );
    setSelectIndex(tr, ["[id*='CitizenId']", data.nationality], errors);
}

function setSex(tr, sex, errors) {
    if ( sex.value === "0") {
        errors.push(sex.caption);
        return;
    }
    if ( sex.value=== "1" ) {
        tr.querySelector("[id*='GenderMale']").click();
        return;
    }
    if ( sex.value=== "2" ) {
        tr.querySelector("[id*='GenderFemale']").click();
        return;
    }
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