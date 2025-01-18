window.OPERATOR_NAME = "Онлайн Экспресс";
function injectQuickReservationData(selInsert, func) {
    var trs = querySelectorAll(document, "#ctl00_generalContent_BasketTourists_touristData_dgTourists tr, #ctl00_generalContent_touristData_dgTourists tr, #ctl00_generalContent_orderTouristData_dgTourists tr").filter( tr => {
        return tr.querySelector("[name*='BirthDate$txtDay']") || tr.textContent.match(/Дата рождения/);
    });
    trs.forEach(tr => {
        if ( tr.classList.contains("h1") && !tr.querySelector(".qq-caption") ) {
            tr.append(createHeadCell());
        } else {
            if ( !tr.querySelector(selInsert) && !tr.querySelector(".qq-caption") ) {
                tr.append(func({
                    addTag: "td",
                    tagStyle: "padding: 10px;",
                    selectStyle: "width: auto",
                    displayCaption: false,
                    legendStyle: "font-size: 12px;"
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
    const lastNameInput = $1('[id*="txtLastName"]', tr);

    const touristIndex = (lastNameInput.id.match(/_ctl(\d+)/) || [])[1]
    setInputValues(tr, [
            "[name*='BirthDate$txtDay']", {value:  checkDate(data.birthday.value).day, caption: "Дата рождения 'День'"},
            "[name*='BirthDate$txtMonth']", {value:  checkDate(data.birthday.value).month, caption: "Дата рождения 'Месяц'"},
            "[name*='BirthDate$txtYear']", {value:  checkDate(data.birthday.value).year, caption: "Дата рождения 'Год'"},
            "[id*='txtLastName']", passport.surname,
            "[id*='txtFirstName']", passport.name,
            "[name*='txtPassportSeries']", passport.serial,
            "[name*='txtPassportNumber']", passport.number,
            "[name*='PassportDateEnd$txtDay']", {value:  checkDate(passport.expire.value).day, caption: "Действителен до 'День'"},
            "[name*='PassportDateEnd$txtMonth']", {value:  checkDate(passport.expire.value).month, caption: "Действителен до 'Месяц'"},
            "[name*='PassportDateEnd$txtYear']", {value:  checkDate(passport.expire.value).year, caption: "Действителен до 'Год'"},
            "[name*='txtEmail']", data.email,
            "[name*='txtPhone']", data.phones.mobile,
            "[name*='txtPassportByWhomRus']", data.inn
        ], errors
    );
    if ( touristIndex ) {
        setInputValues(document, [
                `[id*="_ctl${touristIndex}_txtPhone"]`, data.phones.mobile,

            ], errors
        );
    }

    setSelectIndex(tr, [
            "[id*='ddlSex']", {
                value: mapTATitle(data.title.value, data.sex.value),
                caption: data.sex.caption
            },
            "select[id*='Citizenship']", data.nationality
        ], errors
    );
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
    var tr = select.parentNode;
    while (true) {
        if ( tr.tagName === "TR" ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
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
