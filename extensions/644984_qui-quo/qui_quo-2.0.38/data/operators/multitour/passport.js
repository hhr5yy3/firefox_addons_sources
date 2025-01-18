window.OPERATOR_NAME = "МУЛЬТИТУР";
function injectQuickReservationData(selInsert, func) {
    const elements = $$("[name*='[firstname]']").map( input => input.closest('tr') );
    let headTr = null;
    elements.forEach((element) => {
        const table = element.closest('table');
        if ( table ) {
            headTr = table.querySelector('th').closest('tr');
            if ( headTr && !headTr.querySelector('.qq-caption') ) {
                headTr.append(createHeadCell());
            }
        }
        if ( !element.querySelector(selInsert) ) {
            element.append((func({
                addTag: "td",
                displayCaption: false
            })));
        }
    });
}

function createHeadCell() {
    const newTd = document.createElement("th");
    newTd.innerHTML = "Быстрое бронирование через <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo  и U-ON: ";
    newTd.style.cssText = "vertical-align: middle;";
    newTd.className = "qq-caption";
    return newTd;
}

function pasteOrderData(div, data, passport, errors) {
    const title = calcTtile(data.sex.value, data.title.value);
    setSelectIndex(div, [
        "select[name*='[sex]']", {caption: 'Пол', value: title},
        "select[name*='[citizen]']", data.nationality], errors)
    setInputValues(div, [
            "input[name*='[tel]']", data.phones.mobile
        ], errors, ['setvalue']
    );
    setInputValues(div, [
            "input[name*='[surname]']", passport.surname,
            "input[name*='[firstname]']", passport.name,
            "input[name*='[middlename]']", passport.secondName,
            "input[name*='[passports]']", passport.serial,
            "input[name*='[passportn]']", passport.number,
            "input[name*='[passportdate]']", customDateToFullString(passport.expire),
            "input[name*='[birthday]']", customDateToFullString(data.birthday),
            "input[name*='[tel]']", data.phones.mobile
        ], errors, ['focus', 'input', 'change', 'setvalue']
    );
}

function calcTtile(sex, title) {
    if ( sex === "1") {
        if ( title === "Mr" ) return "М";
        if ( title === "Child" ) return "Реб-М";
        if ( title === "Infant" ) return "Млад-М";
    }
    if ( sex === "2") {
        if ( title === "Mrs" ) return "Ж";
        if ( title === "Child" ) return "Реб-Ж";
        if ( title === "Infant" ) return "Млад-Ж";
    }
    return sex;
}

function mapTitle(title) {
    switch (title) {
        case "Mr" :
            return "Mr";
        case "Mrs" :
            return "Mrs";
        case "Child" :
            return "Chl";
        case "Infant" :
            return "Inf";
        default  :
            return null;
    }
}


function getPassengerRowBySelect(select) {
    return select.closest('tr');
}
