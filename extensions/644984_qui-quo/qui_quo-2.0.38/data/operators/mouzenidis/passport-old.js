var OPERATOR_NAME = "Mouzenidis";

function injectQuickReservationData(selInsert, func) {
    var trs = querySelectorAll(document, ".basket-tourist");
    trs.forEach((tr) => {
        if ( !tr.querySelector(selInsert) && !tr.querySelector(".qq-caption") ) {
            tr.append(func({
                style: "",
                addTag: "div",
                tagStyle: "padding: 10px;",
                selectStyle: "width: auto"
            }));
        }
    });
    querySelectorAll(document, ".qq-select legend").forEach(legend => {
        legend.style.fontSize = "12px";
    });
}

function pasteOrderData(div, data, passport, errors) {

    setSex(div, data.sex, errors);
    setInputValues(div, [
        "[data-bind*='LName']", { value : passport.surname.value.toUpperCase(), caption : "Фамилия"},
        "[data-bind*='FName']", { value : passport.name.value.toUpperCase(), caption : "Имя"},
        "[data-bind*='PassportSerie']", passport.serial,
        "[data-bind*='PassportNumber']", passport.number,
        "[data-bind*='PhoneNumber']", { value : data.phones.mobile.value.replace(/\D/, ""), caption : "Номер моб. телефона"}
        ],errors ,"change"
    );

    setValueAndExecEvent({ node: div.querySelector("[data-bind*='Dob']"),
                          data : { value : customDateToFullString(data.birthday).value.replace(/\./g,"-"), caption : "Дата рождения"},
        eventAfterName: "blur" }, errors);
    setValueAndExecEvent({ node: div.querySelector("[data-bind*='PassportExpire']"),
                          data :  { value : customDateToFullString(passport.expire).value.replace(/\./g,"-"), caption : "Действие паспорта"},
        eventAfterName: "blur" }, errors);
    setSelectIndex(div, ["[data-bind*='touristNationality']", data.nationality], errors);
}

function setSex(div, sex, errors) {
    if ( sex.value === "0") {
        errors.push(sex.caption);
        return;
    }
    if ( sex.value=== "1" ) {
        div.querySelector("[value='M']").click();
        return;
    }
    if ( sex.value=== "2" ) {
        div.querySelector("[value='Ж']").click();
        return;
    }
}

function getPassengerRowBySelect(select) {
    var div = select.parentNode;
    while (true) {
        if ( div.className === "basket-tourist" ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
