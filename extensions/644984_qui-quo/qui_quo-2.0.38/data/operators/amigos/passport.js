window.OPERATOR_NAME = "Амиго-С";

function injectQuickReservationData(selInsert, func) {
    const pastedRows = Object.keys(saveTrsStates);
    querySelectorAll(document, "#tourist_data_list .fui-tourists-form").forEach((tr, index) => {
        if (!tr.querySelector(selInsert) && !tr.querySelector(".qq-caption")) {
            tr.append(func({
                addTag: "tr",
                style: "width: 500px;height: 50px;position: absolute;margin: 10px;",
                tagStyle: "width: 400px;margin:10px;height: 30px;",
                newTagStyle: "width: 400px;margin:10px;height: 55px;",
            }));
        }
        const warning = tr.querySelector('.qq-warning');
        const qqSelect = tr.querySelector(".qq-select select");
        if (warning && warning.hidden && pastedRows.length > 0 && saveTrsStates[index] && qqSelect) {
            qqSelect.selectedIndex = saveTrsStates[index].index;
            showWarning(saveTrsStates[index].errors, tr, `Данные заполнены. Проверьте все поля.`, "black");
        }
    });

    const clientContainer = $1('#ctl00_generalContent_MainManTouristEP');
    if ( clientContainer && !$1(selInsert, clientContainer) ) {
        clientContainer.append(func({
            style: "width: 500px;height: 50px;position: absolute;margin: 10px;",
            tagStyle: "width: 400px;margin:10px;height: 30px;",
            newTagStyle: "width: 400px;margin:10px;height: 55px;",
        }));
    }
}

function pasteOrderDatAmigos(tr, data, passport, errors) {
    setInputValues(tr, [
            "#ctl00_generalContent_FIOMainManTourist", passport.fio,
            "#ctl00_generalContent_PassportMainTourist", passport.fullNumber,
            "#ctl00_generalContent_BirthdayMainTouristDay", {
                value: checkDate(data.birthday.value).day,
                caption: "Дата рождения 'День'"
            },
            "#ctl00_generalContent_BirthdayMainTouristMonth", {
                value: checkDate(data.birthday.value).month,
                caption: "Дата рождения 'Месяц'"
            },
            "#ctl00_generalContent_BirthdayMainTouristYear", {
                value: checkDate(data.birthday.value).year,
                caption: "Дата рождения 'Год'"
            },
        ], errors
    );
}

function getPassengerRowBySelect(select) {
    return select.closest('.fui-tourists-form, #ctl00_generalContent_MainManTouristEP');
}
