var OPERATOR_NAME = "PAC GROUP";
var saveTrsStates  = {};

function injectQuickReservationData(selInsert, func) {
    var pastedRows = Object.keys(saveTrsStates);
    var trs = querySelectorAll(document, "#ctl00_generalContent_BasketTourists_touristData_dgTourists tr, #ctl00_generalContent_touristData_dgTourists tr");
    trs.forEach((tr, index) => {
        if ( tr.className === "h1" && !tr.querySelector(".qq-caption") ) {
            tr.append(createHeadCell());
        } else {
            if ( !tr.querySelector(selInsert) && !tr.querySelector(".qq-caption") ) {
                tr.append(func({
                    addTag: "td",
                    tagStyle: "padding: 10px;",
                    selectStyle: "width: auto",
                    displayCaption: false
                }));
            }
            var warning = tr.querySelector('.qq-warning');
            var qqSelect = tr.querySelector(".qq-select select");
            if ( warning && warning.hidden && pastedRows.length > 0 && saveTrsStates[index] && qqSelect ) {
                qqSelect.selectedIndex = saveTrsStates[index].index;
                var selSelect = tr.querySelector("select[id*='Citizenship']");
                var selText = selSelect ?  selSelect.options[selSelect.selectedIndex] : null ? selSelect.options[selSelect.selectedIndex].textContent : null;
                if ( selSelect && saveTrsStates[index].nationalitySet === true && selText && saveTrsStates[index].nationality !== selText ) {
                    setSelectIndex(tr, [
                            selSelect, saveTrsStates[index].nationality
                        ], saveTrsStates[index].errors
                    );
                }
                if (selSelect && saveTrsStates[index].nationalitySet === false ) {
                    simulateMouseEvent(tr.querySelector("a[id*='Citizenship']"), "click");
                    saveTrsStates[index].nationalitySet = true;
                }
                showWarning(saveTrsStates[index].errors, tr, `Данные заполнены. Проверьте все поля.`, "black");
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
    if ( tr.id === 'ctl00_generalContent_MainManTouristEP') {
        return pasteOrderDatAmigos(tr, data, passport, errors)
    }
    var citizen = tr.querySelector("a[id*='Citizenship']");
    if ( window.location.hostname.match(/intercity/i) ) {
        data.nationalityEng = data.nationality;
        setInputValues(tr, [
                "[name*='PassportDate$txtDay']", {value:  checkDate(passport.issueDate.value).day, caption: "Дата выдачи 'День'"},
                "[name*='PassportDate$txtMonth']", {value:  checkDate(passport.issueDate.value).month, caption: "Дата выдачи 'Месяц'"},
                "[name*='PassportDate$txtYear']", {value:  checkDate(passport.issueDate.value).year, caption: "Дата выдачи 'Год'"},
                "[name*='txtPassportByWhom']", passport.authority,
                "[name*='txtEmail']", data.email,
                "[name*='txtBirthPlace']", data.inn
            ], errors
        );
    }
    simulateMouseEvent(citizen, "click");
        setInputValues(tr, [
                "[name*='BirthDate$txtDay']", {value:  checkDate(data.birthday.value).day, caption: "Дата рождения 'День'"},
                "[name*='BirthDate$txtMonth']", {value:  checkDate(data.birthday.value).month, caption: "Дата рождения 'Месяц'"},
                "[name*='BirthDate$txtYear']", {value:  checkDate(data.birthday.value).year, caption: "Дата рождения 'Год'"},
                "[id*='txtLastName']", passport.surname,
                "[id*='txtFirstName']", passport.name,
                "[id*='_txtPatronymicRus']", data.secondName,
                "[name*='txtPassportSeries']", passport.serial,
                "[name*='txtPassportNumber']", passport.number,
                "[name*='PassportDateEnd$txtDay']", {value:  checkDate(passport.expire.value).day, caption: "Действителен до 'День'"},
                "[name*='PassportDateEnd$txtMonth']", {value:  checkDate(passport.expire.value).month, caption: "Действителен до 'Месяц'"},
                "[name*='PassportDateEnd$txtYear']", {value:  checkDate(passport.expire.value).year, caption: "Действителен до 'Год'"},
                "[name*='PassportDateRus$txtDay']", {value:  checkDate(passport.issueDate.value).day, caption: "Действителен до 'День'"},
                "[name*='PassportDateRus$txtMonth']", {value:  checkDate(passport.issueDate.value).month, caption: "Действителен до 'Месяц'"},
                "[name*='PassportDateRus$txtYear']", {value:  checkDate(passport.issueDate.value).year, caption: "Действителен до 'Год'"},
                "[name*='txtPhone']", data.phones.mobile
            ], errors
        );

    setSelectIndex(tr, [
            "[id*='ddlSex']", {
                value: mapTATitle(data.title.value, data.sex.value),
                caption: data.sex.caption
            },
            "select[id*='Citizenship']", data.nationality
        ], errors
    );
    var selSelect = tr.querySelector("select[id*='Citizenship']");
    var nationalitySet = true;
    if ( !selSelect || !selSelect.options[selSelect.selectedIndex] || selSelect.options[selSelect.selectedIndex].textContent !== data.nationalityEng ) {
        nationalitySet = false;
    }
    var key = tr.rowIndex;
    saveTrsStates[key] = {
        index: tr.querySelector(".qq-select select").selectedIndex,
        errors: errors,
        nationalitySet : nationalitySet,
        nationality: data.nationalityEng
    };

}

function checkDate(date) {
    if ( date ) {
        return date;
    } else {
        return {
            day: "",
            month: "",
            year: ""
        };
    }
}

function getPassengerRowBySelect(select) {
    return select.closest("tr") || select.closest("#ctl00_generalContent_MainManTouristEP");
}

function mapTATitle(title, sex) {
    if ( sex == "0" ) {
        return null;
    }
    if ( sex == "1" ) {
        switch (title) {
            case "Mr" :
                return "М";
            case "Child" :
                return "Реб-М";
            case "Infant" :
                return "Млад-М";
        }
    }
    if ( sex == "2" ) {
        switch (title) {
            case "Mrs" :
                return "Ж";
            case "Miss" :
                return "Ж";
            case "Child" :
                return "Реб-Ж";
            case "Infant" :
                return "Млад-Ж";
        }
    }
}
