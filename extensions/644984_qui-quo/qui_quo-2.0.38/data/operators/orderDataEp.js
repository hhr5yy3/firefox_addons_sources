initVersionChecker();
window.ORDER_DATA = {};
window.addedTime = null;
getInitData();

async function getInitData() {
    const params = await getInitParams();
    if (params.hideQuickReservationTutorial === true) {
        return;
    }
    ORDER_DATA.crmName = params.crmName || window.crmName;
    ORDER_DATA.crmTutorial = params.crmTutorial || window.crmTutorial;
    if (params.isQuickReservationActive === true) {
        window.setTimeout(injectQuickReservationSelect, TIMEOUT);
    }
    if (params.isQuickReservationActive === false) {
        if (typeof injectQuickReservationData !== 'undefined') {
            window.setTimeout(() => injectQuickReservationData(".qq-guide", createGuide), TIMEOUT);
        }
    }
}

async function injectQuickReservationSelect() {
    if ( typeof injectQuickReservationData !== 'undefined' ) {
        if (isNewVersionLoaded()) {
            return;
        }
        try {
            if (!ORDER_DATA || !ORDER_DATA.passengers || ORDER_DATA.passengers.length === 0) {
                await getOrderData();
                deleteNode(".qq-select");
                injectQuickReservationData(".qq-guide", createGuide);
            }
            if (ORDER_DATA && ORDER_DATA.passengers && ORDER_DATA.passengers.length > 0) {
                await getOrderData();
                deleteNode(".qq-guide");
                if (addedTime && ORDER_DATA.time !== addedTime) {
                    deleteNode(".qq-select");
                    injectQuickReservationData(".qq-select", createQRCell);
                    querySelectorAll(document, ".qq-select").forEach(select => {
                        showWarning([], select, ` Получены обновлённые данные от ${ORDER_DATA.crmName || 'CRM'}. Выберите пассажира в списке, чтобы заново заполнить поля.`, "red", {target: select});
                    });
                } else {
                    injectQuickReservationData(".qq-select", createQRCell);
                }
                window.addedTime = ORDER_DATA.time;
            }
            window.setTimeout(injectQuickReservationSelect, TIMEOUT);
        } catch (e) {
            console.log({e})
            logQRError("failed to inject quick reservation select", e);
        }
    }
}

function logQRError(msg, e, orderData, html) {
    var data = {
        title: "[" + OPERATOR_NAME + "] " + msg,
        url: document.location.href,
        passengers: orderData ? orderData : ""
    };

    if ( e != null ) {
        if ( e.stack != null )
            data.stack = "%c" + e.stack + "%c";
        if ( e.message != null )
            data.title = data.title + " - " + e.message;
    }
    if ( html != null ) {
        data.html = html.length > 100 * 1024 ? html.substring(0, 100 * 1024) : html;
    }
    sendMessageToAddon("error", data);
}

//---------------------------------------------------------------------

async function getOrderData() {
    const data = await sendMessageToAddon("get orderData");
    if ( data ) {
        setData(data);
    }
}

function setData(data) {
    window.ORDER_DATA = (data && data.passengers && data.passengers.length > 0) ? data : {};
    window.ORDER_DATA.crmName = data.crmName || window.crmName;
    window.ORDER_DATA.crmTutorial = data.crmTutorial || window.crmTutorial;
}

function customDateToFullString(date, callback) {
    if ( !date.value ) {
        return {
            value: "",
            caption: date.caption
        };
    }
    const result = date.value.day + "." + date.value.month + "." + date.value.year;
    return {
        value: callback ? callback(result) : result,
        date: date,
        caption: date.caption
    };
}

function preparePassportData(event, data) {
    if ( event.target.options[event.target.selectedIndex].dataset.passport === "international" ) {
        return data.internationalPassport;
    }
    const mainInfo = {
        name: {
            value: data.name.value,
            caption: "Имя"
        },
        surname: {
            value: data.surname.value,
            caption: "Фамилия"
        },
        secondName: {
            value: data.secondName.value,
            caption: "Отчество"
        },
        expire: {
            caption: "Действует до"
        },
        serial: {
            value: '',
            caption: "Серия"
        }
    };
    if ( event.target.options[event.target.selectedIndex].dataset.passport === "national" ) {
        return Object.assign(mainInfo, data.nationalPassport);
    }
    if (event.target.options[event.target.selectedIndex].dataset.passport === "transliteratedNational") {
        const tempObject = Object.assign(mainInfo, data.nationalPassport);
        for (let opt in tempObject) {
            if (opt && tempObject[opt] && typeof tempObject[opt].value === "string") {
                tempObject[opt].value = transliterate(tempObject[opt].value.toLowerCase()).toUpperCase();
            }
        }
        return tempObject;
    }
    if ( event.target.options[event.target.selectedIndex].dataset.passport === "birthday_certificate" ) {
        return Object.assign(mainInfo, data.birthdayCertificate);
    }
}

function getFullName(passenger) {
    if ( !passenger ) {
        return '';
    }
    return [
        passenger.surname.value || passenger.internationalPassport.surname.value , passenger.name.value ||  passenger.internationalPassport.name.value, passenger.secondName.value
    ].filter(it => it && it.trim()).join(" ");
}

function createSelect(config) {
    const selectList = document.createElement("select");
    if ( config.selectIndex !== undefined ) {
        selectList.dataset.selectIndex = config.selectIndex;
    }
    const option = document.createElement("option");
    option.value = "default";
    option.text = "[Выберите пассажира для авто-заполнения]";
    option.selected = "selected";
    selectList.append(option);

    function createSelectPassengerGroup(label, type, passengers, isClient = false) {
        if ( isClient ) {
            const option = document.createElement("option");
            option.text = "Заказчик: " + getFullName(passengers[0]);
            option.dataset.passport = type;
            option.value = "client";
            option.style.fontWeight = "bold";
            return option;
        }
        const group = document.createElement("optgroup");
        group.label = label;
        for (var key in passengers) {
            const doc = passengers[key][keyFromDocType(type)];
            if ( (!doc || Object.keys(doc).length === 0) || !Object.values(doc).find(prop => !!prop.value) ) {
                continue;
            }
            var option = document.createElement("option");
            option.value = key;
            option.text = getFullName(passengers[key]);
            option.text += passengers[key].birthday.value ? ", " + customDateToFullString(passengers[key].birthday).value : "";
            option.dataset.passport = type;
            group.append(option);
        }
        if ( group.childNodes.length === 0 ) {
            return null;
        }
        return group;
    }

    selectList.append(createSelectPassengerGroup("Заграничный паспорт", "international", ORDER_DATA.passengers));
    selectList.append(createSelectPassengerGroup("Внутренний паспорт", "national", ORDER_DATA.passengers));
    if (config.addTransliteratedNationalPassport === true) {
         selectList.append(createSelectPassengerGroup("Внутренний паспорт транслит", "transliteratedNational", ORDER_DATA.passengers));
    }
    selectList.append(createSelectPassengerGroup("Свидетельство о рождении", "birthday_certificate", ORDER_DATA.passengers));
    selectList.append(createSelectPassengerGroup("Заказчик", "national", [ORDER_DATA.client], true));
    selectList.addEventListener("change", onChangeEvent);
    return selectList;
}

function keyFromDocType(type) {
    const keys = {
        'birthday_certificate': 'birthdayCertificate',
        'international': 'internationalPassport',
        'national': 'nationalPassport',
        'transliteratedNational': 'nationalPassport'
    };
    return keys[type];
}

function createGuide(config) {
    var a = document.createElement("a");
    a.href = ORDER_DATA.crmTutorial || window.crmTutorial || `https://${window.AGENCY_DOMAIN}/tutorial/quick-reservation`;
    a.innerHTML = `Быстрое бронирование через <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo и ${ORDER_DATA.crmName || 'CRM'}. Как это работает?`;
    a.setAttribute("target", "_blank");
    a.className = "qq-guide";
    if (config.style) {
        a.style.cssText = config.style;
    }
    if ( config.addTag ) {
        var tag = document.createElement(config.addTag);
        if ( config.tagStyle ) {
            tag.setAttribute("style", config.tagStyle);
        }
        tag.className = "qq-guide";
        tag.append(a);
        return tag;
    }

    return a;
}

function createLegend(html, style) {
    var legend = document.createElement("legend");
    legend.innerHTML = html;
    style ? legend.style = style : false;
    return legend;
}

function createQRCell(config) {
    var div = document.createElement("div");
    var newTag = document.createElement(config.addTag || "div");
    var select = createSelect(config);
    var warning = createLegend("<span style=\"color:red;\">Данные заполнены. Проверьте все поля.</span>", config.legendStyle);

    div.style.cssText = config.style;
    newTag.append(div);
    warning.style.display = 'none';
     warning.hidden = true;
    warning.style.position = 'initial';
    warning.className = "qq-warning";
    if ( config.displayCaption !== false ) {
        div.append(createLegend(`Быстрое бронирование через <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo  и ${ORDER_DATA.crmName || "CRM"}: `, config.legendStyle));
    }
    if ( config.selectStyle ) {
        select.style.cssText = config.selectStyle;
    }
    if ( config.newTagAttribute ) {
        newTag.setAttribute(config.newTagAttribute.name, config.newTagAttribute.value)
    }
    if ( config.newTagStyle ) {
        newTag.style.cssText = config.newTagStyle;
    }
    div.append(select);
    div.append(warning);
    div.className = "qq-select";
    newTag.className = "qq-select";
    return newTag;
}

function setValueAndExecEvent({node = null, data = "", type = "value", eventAfterName = "blur", eventBeforeName = null,
                                  isReact = false}, errors) {
    if ( !node || node.clientHeight === 0 ) {
        return;
    }
    if ( !data.value ) {
        errors.push(data.caption);
        node[type] = "";
        return;
    }
    if (isReact) {
        setReactInputValue(node, data.value);
        setReactInputValueKeyBoard(node, data.value);
    }

    if ( eventBeforeName ) {
        simulateEvent(node, eventBeforeName);
    }
    node[type] = data.value;
    if ( eventAfterName ) {
        simulateEvent(node, eventAfterName);
    }
}

function findSelectIndex(select, caption, comparator, byValue = false) {
    var options = querySelectorAll(select, "option");
    var opt = find(options, caption, comparator || accurateCompare);

    function find(options, caption, func) {
        return options.find(option => {
            var text = byValue ? option.value.trim() : option.textContent.trim();
            return func(text, caption);
        });
    }

    return opt ? opt.index : -1;
}

function accurateCompare(text, caption) {
    if ( text && caption && (text.toUpperCase() === caption.toUpperCase()) ) {
        return true;
    }
}

function setSelectIndex(node, selectArray, errors, comparator = null, byValue= false) {
    if ( node && selectArray && selectArray.length > 0 ) {
        for (var i = 0; i < selectArray.length; i += 2) {
            var prepareNode = typeof(selectArray[i]) === "string" ? node.querySelector(selectArray[i]) : selectArray[i];
            if ( !prepareNode ) {
                 continue;
            }
            var data = selectArray[i + 1];
            var index = findSelectIndex(prepareNode, data.value, comparator, byValue);
            if ( index !== -1 && data.value ) {
                prepareNode.selectedIndex = index;
                simulateEvent(prepareNode, "change");
            } else {
                errors.push(data.caption);
            }
        }
        return errors;
    }
}

function setInputValues(node, dataArray, errors, eventAfterName = "blur", eventBeforeName = null, isReact = false) {
    if ( node && dataArray && dataArray.length > 0 ) {
        for (let i = 0; i < dataArray.length; i += 2) {
            const prepareNode = typeof(dataArray[i]) === "string" ? node.querySelector(dataArray[i]) : dataArray[i];
            setValueAndExecEvent({node: prepareNode, data: dataArray[i + 1], eventAfterName, eventBeforeName, isReact}, errors);
        }
    }
}

function InitialData(ORDER_DATA, event) {
    this.selected = event.target.options[event.target.selectedIndex].value;
    if ( this.selected !== "default" && this.selected !== "client" ) {
        this.data = ORDER_DATA.passengers[this.selected];
        this.passport = preparePassportData(event, this.data);
    }
    if ( this.selected === "client" ) {
        this.data = ORDER_DATA.client;
        this.passport = preparePassportData(event, this.data);
    }
    if ( this.passport ) {
        this.passport.fio = createFullNameObject(this.passport);
        this.passport.fullNumber = {
            value: this.passport.serial.value + this.passport.number.value,
            caption: 'Серия и номер паспоорта'
        }
    }

    if ( this.data ) {
        this.data.fio = createFullNameObject(this.data);
    }
}

function createFullNameObject(passportData) {
    try {
        return {
            value: `${passportData.surname.value} ${passportData.name.value} ${passportData.secondName.value}`,
            caption: "ФИО"
        };
    } catch (e) {
        console.log(e);
        return {
            value: ``,
            caption: "ФИО"
        }
    }

}

async function onChangeEvent(event) {
    try {
        var mainElem = getPassengerRowBySelect(event.target);
        var {data, passport} = new InitialData(ORDER_DATA, event);
        if ( data && passport ) {
            var errors = [];
            mainElem ? mainElem.dataset.qqCrmId = data.crmId : null;
            await pasteOrderData(mainElem, data, passport, errors);
            showWarning(errors, mainElem, `Данные заполнены. Проверьте все поля.`, "black", event);
        }
    } catch (e) {
        logQRError("failed to process onChangeEvent", e, null, getlogQRErrorHtml(this));
        sendMessageToAddon("showerrorpage");
        showWarning([], getPassengerRowBySelect(event.target), "Произошла ошибка при вставке данных, обратитесь в тех. поддержку.", "red", event);
    }
}

function getlogQRErrorHtml(img) {
    try {
        if ( typeof getPassengerRowBySelect == 'function' ) {
            return getPassengerRowBySelect(event.target).innerHTML;
        }
        return img.parentNode.parentNode.parentNode.innerHTML;
    } catch (e) {
        return null;
    }
}

function showWarning(errors, node, message, color, event) {
    var warning = node.querySelector(".qq-warning");
    if ( !warning ) {
        warning = event.target.closest('.qq-select').querySelector('.qq-warning')
    }
    if ( errors.length > 0 ) {
        warning.textContent = `Проверьте все поля. Не удалось заполнить: [${deleteArrayDuplicates(errors).join(", ")}]`;
        warning.style.color = "red";
    } else {
        warning.textContent = message;
        warning.style.color = color;
    }
    warning.style.display = 'block';
    warning.hidden = false;
}

function deleteNode(selDelete) {
    var doc = typeof getQRDoc === "function" ? getQRDoc() : document;
    var deleteNode = querySelectorAll(doc, selDelete);
    if ( deleteNode.length > 0 ) {
        deleteNode.forEach(node => {
            node.replaceWith("");
        });
    }
}

function getCountryCode(countryName) {
    var codeKey = Object.keys(isoCountries).find(country => {
        return accurateCompare(country, countryName);
    });
    return codeKey !== undefined ? {value: isoCountries[codeKey], caption: "Гражданство"} : {
        value: null,
        caption: "Гражданство"
    };
}

function setCheckboxValues(node, inputArray, errors) {
    if ( node && inputArray && inputArray.length > 0 ) {
        for (let i = 0; i < inputArray.length; i += 2) {
            const input = typeof(inputArray[i]) === "string" ? node.querySelector(inputArray[i]) : inputArray[i];
            if ( !input ) {
                errors.push(inputArray[i + 1].caption);
                continue;
            }
            input.checked = inputArray[i + 1].value;
            simulateEvent(input, "click");
        }
    }
}

function createQRContainer( select) {
    const container = document.createElement("div");
    const logoDiv = document.createElement("div");
    const logo = document.createElement('img');
    logoDiv.append(logo);
    logo.src = `https://${window.AGENCY_DOMAIN}/landing/eshill/i/logo.svg`;
    logo.style.height = '24px';
    container.classList.add("qq", "qq-container");
    container.append(logo, select);
    container.style.cssText = `
        position: fixed;
        top: 10%;
        right: 10%;
        z-index: 9999;
        border: 2px solid;
        border-radius: 4px;
        padding: 5px;
        background-color: aliceblue;`;
    return container;
}
