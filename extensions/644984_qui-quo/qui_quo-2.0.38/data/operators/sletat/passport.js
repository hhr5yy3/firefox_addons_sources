var OPERATOR_NAME = "sletat.ru";

function injectQuickReservationData(selInsert, func) {
    var person = document.querySelector("#FormPersonEditorContainer, #FormTouristEditorContainer, #TouristEditorForm, #FormCustomer, #PersonEditorFormContainer");
    if( person && !person.querySelector(selInsert) ) {
        person.append(func({
            addTag: "div",
            style: "float: right; width: 23em;",
            selectStyle: "width: 100%"
        }));
    }
}

async function pasteOrderData(div, data, passport, errors) {
    var brth = birthdayCertificate(data.birthdayCertificate);
    if ( brth ) {
        await setOnblurFunction("BirthCertificate.DocumentIssueDate", brth.issueDate, errors);
        setSletatInputValues(div,
            ["#birthCertificateContainer:not([style*='none']) #BirthCertificate\\.PassportIssueOrg_I", brth.authority
            ], errors, "change"
        );

        setSletatInputValues(div, [
                "#birthCertificateContainer:not([style*='none']) #BirthCertificate\\.DocumentSeries_I", brth.serial,
                "#birthCertificateContainer:not([style*='none']) #BirthCertificate\\.DocumentNumber_I", brth.number
            ], errors
        );
    }


    setSletatInputValues(div, [
           "#LastName_I", data.surname,
           "#FirstName_I", data.name,
           "#Patronymic_I", data.secondName,
           "#LastNameLat_I", data.internationalPassport.surname,
           "#FirstNameLat_I", data.internationalPassport.name,
           "#FactAddress_I", data.addressLiving,
           "#AdditionalPhone_I", data.phones.main,
           "#Phone_I", data.phones.mobile,
           "#Email_I", data.email,
           "#RussianPassport\\.DocumentSeries_I", data.nationalPassport.serial,
           "#RussianPassport\\.DocumentNumber_I", data.nationalPassport.number,
           "#RussianPassport\\.PassportIssueOrg_I", data.nationalPassport.authority,
           "#RussianPassport\\.PassportIssueOrgCode_I", data.nationalPassport.authorityCode,
           "#RussianPassport\\.PassportAddress_I", data.address,
           "#AbroadPassport\\.DocumentSeries_I", data.internationalPassport.serial,
           "#AbroadPassport\\.DocumentNumber_I", data.internationalPassport.number,
        '  input[name="CitizenshipCountryId"]', data.nationality,
        ], errors
    );

    setSletatInputValues(div,
        ["#AbroadPassport\\.PassportIssueOrg_I", data.internationalPassport.authority
        ], errors, "change"
    );

    var sex = mapSex(data.sex);
    if ( !sex ) {
        errors.push(data.sex.caption);
    } else {
        await execSelectASPxFunction(sex, "Sex");
    }
    errors.push("Код");


    await setOnblurFunction("BirthDate", data.birthday, errors);
    await setOnblurFunction("RussianPassport.DocumentIssueDate", data.nationalPassport.issueDate, errors);
    await setOnblurFunction("AbroadPassport.DocumentIssueDate", data.internationalPassport.issueDate, errors);
    await setOnblurFunction("AbroadPassport.ExpireDate", data.internationalPassport.expire, errors);

    const natSelect = $1('input[name="CitizenshipCountryId"]', div);
    natSelect.value = data.nationality.value;
    await execSelectASPxFunction(0, "CitizenshipCountryId", true);
    errors.push("Код");
    const input = $1('#LastName_I', div);
    if ( input ) {
        input.focus();
    }


}

async function execSelectASPxFunction(index, name, select = false) {
    if ( select === true ) {
        sessionStorage.setItem('select_set_q', 'true')
    } else {

        sessionStorage.setItem('name_q', name)
        sessionStorage.setItem('index_q', index)
    }

    const tempScript = document.createElement("script");
    tempScript.src = chrome.runtime.getURL('data/operators/sletat/inline-script_select.js');
    document.head.append(tempScript);
    tempScript.remove();
    await waiting(100)
}

async function setOnblurFunction(name, data, errors) {
    if ( !data || !data.value ) {
        errors.push(data.caption);
        return;
    }
    var date = customDateToFullString(data).value.match(/(\d+)\.(\d+)\.(\d+)/);
    if ( !date ) {
        errors.push(data.caption);
        return;
    }

    sessionStorage.setItem('name_q', name)
    sessionStorage.setItem('date_q', JSON.stringify(date))

    var tempScript = document.createElement("script");
    tempScript.src = chrome.runtime.getURL('data/operators/sletat/inline-script_input.js');
    document.head.append(tempScript);
    tempScript.remove();
    await waiting(100)
}

function getPassengerRowBySelect(select) {
    var div = select.parentNode;
    while (true) {
        if( div.id === "FormPersonEditorContainer" ||
            div.id === "FormTouristEditorContainer" ||
            div.id === "TouristEditorForm" ||
            div.id === "FormCustomer" ||
            div.id === "PersonEditorFormContainer") {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function setSletatValueAndExecEvent({node = null, data = "", type = "value", eventName = "blur"}, errors) {
    if( !node ) {
        return;
    }
    if( !data.value ) {
        errors.push(data.caption);
        node[type] = "";
    }
    node[type] = data.value;
    if( eventName ) {
        simulateUIEvent(node, eventName);
    }
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return "1";
        case "2" :
            return "0";
        default  :
            return "-1";
    }
}

function findTDSIndex(table, caption) {
    var options = querySelectorAll(table, "td");
    var opt = find(options, caption, accurateCompare);

    function find(options, caption, func) {
        return options.findIndex(option => {
            var text = option.textContent;
            return func(text, caption);
        });
    }

    return opt;
}

function setSletatInputValues(node, dataArray, errors, eventName = "blur") {
    if( node && dataArray && dataArray.length > 0 ) {
        for (var i = 0; i < dataArray.length; i += 2) {
            var prepareNode = typeof(dataArray[i]) === "string" ? node.querySelector(dataArray[i]) : dataArray[i];
            setSletatValueAndExecEvent({node: prepareNode, data: dataArray[i + 1], eventName: eventName}, errors);
        }
    }
}

function birthdayCertificate(bc) {
   try {
       var brth = {};
       if ( !bc ) {
           return null;
       }

       var array = bc.number.value.split(/№|\s+/);
       if ( array && array.length === 2 ) {
           brth.serial = {value: array[0], caption: "Серия свидетельства о рождении"};
           brth.number = {value: array[1], caption: "Номер свидетельства о рождении"};
       } else {

           var number = bc.number.value.match(/\d+.+/);
           var serial = number ? bc.number.value.replace(number[0], "") : bc.number.value;
           number = number ? number[0] : "";
           brth.serial = {value: serial ? serial : "", caption: "Серия свидетельства о рождении"};
           brth.number = {value: number ? number : "", caption: "Номер свидетельства о рождении"};
       }
       brth.authority = bc.authority;
       brth.issueDate = bc.issueDate;
       brth.docType = bc.docType;
       return brth;
   } catch (e) {
       return null;
   }
}

function simulateUIEvent(node, eventName) {
    if( node ) {
        var event = new UIEvent(eventName, {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        node.dispatchEvent(event);
    }
}

function createTempScript() {
    var tempScript = document.createElement("script");
    tempScript.classList.add("qq-script");
    return (document.head || document.body).appendChild(tempScript);
}
