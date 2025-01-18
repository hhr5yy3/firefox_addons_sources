var OPERATOR_NAME = "TPG";

function injectQuickReservationData(selInsert, func) {
    $$( "[data-id='TouristItem'] .tab_cont").forEach( tr =>{
        if ( !tr.querySelector(selInsert) ) {
            const td = document.createElement('td');
            td.classList.add('qq');
            td.style.margin = '6px';
            const wrapper = func({
                tagStyle: "white-space: normal;position:absolute;",
                style: "width: 600px;position:absolute;font-size:12px;",
                selectStyle: "font-size:12px!important;padding:2px;height:26px"

            })
            td.append(wrapper);
            tr.append(td);
        }
    });

}

function pasteOrderData(tr, data, passport, errors) {
    var ths = querySelectorAll(tr.parentNode, "th");
    var tds = querySelectorAll(tr, "td").map( td => {
       var inpts = querySelectorAll(td, "input");
        return inpts.length > 1 ? inpts : inpts[0];
    });
    setInputValues(tr, [
        tds[findIndex(ths, /Фамилия|Прізвище/i)], passport.surname,
        tds[findIndex(ths, /имя|Ім'я/i)], passport.name,
        tds[findIndex(ths, /Дата рождения|Дата народження/i)][0], {value:  checkDate(data.birthday.value).day, caption: "Дата рождения 'День'"},
        tds[findIndex(ths, /Дата рождения|Дата народження/i)][1], {value:  checkDate(data.birthday.value).month, caption: "Дата рождения 'Месяц'"},
        tds[findIndex(ths, /Дата рождения|Дата народження/i)][2], {value:  checkDate(data.birthday.value).year, caption: "Дата рождения 'Год'"},
        tds[findIndex(ths, /паспорт|Паспорт/i)][0], passport.serial,
        tds[findIndex(ths, /паспорт|Паспорт/i)][1], passport.number,
        tds[findIndex(ths, /Дата выдачи|Дата видачі/i)][0], {value:  checkDate(passport.issueDate.value).day, caption: "Дата выдачи 'День'"},
        tds[findIndex(ths, /Дата выдачи|Дата видачі/i)][1], {value:  checkDate(passport.issueDate.value).month, caption: "Дата выдачи 'Месяц'"},
        tds[findIndex(ths, /Дата выдачи|Дата видачі/i)][2], {value:  checkDate(passport.issueDate.value).year, caption: "Дата выдачи 'Год'"},
        tds[findIndex(ths, /Действителен до|Дійсний/i)][0], {value:  checkDate(passport.expire.value).day, caption: "Действителен до 'День'"},
        tds[findIndex(ths, /Действителен до|Дійсний/i)][1], {value:  checkDate(passport.expire.value).month, caption: "Действителен до 'Месяц'"},
        tds[findIndex(ths, /Действителен до|Дійсний/i)][2], {value:  checkDate(passport.expire.value).year, caption: "Действителен до 'Год'"},
        tds[findIndex(ths, /Ким виданий/i)], passport.authority
        ], errors, "keyup");
    setSelectIndex(tr, [tds[findIndex(ths, /Пол|Cтать/i)].parentNode.querySelector("select"), {
            value: mapSex(data.sex.value),
            caption: data.sex.caption
        }], errors
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

function findIndex(ths, caption) {
    return ths.findIndex(function (th) {
        if ( th.textContent.match(caption) ) {
            return true;
        }
        return false;
    });
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

function mapSex(sex) {
    switch (sex) {
        case "1" :
            return "Ч";
        case "2" :
            return "Ж";
        default  :
            return "WRONG";
    }
}