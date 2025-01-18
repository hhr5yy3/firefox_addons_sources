var contextMenuItem = {
    "id": "importToEnjaz",
    "title": "Import from Easyenjaz",
    "contexts": ["page"]
};

browser.contextMenus.create(contextMenuItem);

browser.contextMenus.onClicked.addListener(function (clickedItem) {
    browser.tabs.executeScript({
        code: ' getClipboardContents(); ' +
            ' async function getClipboardContents() { ' +
            '  try { ' +
            '    var currentUrl = document.URL; ' +

            '    if(currentUrl.includes("enjazit.com.sa") || currentUrl.includes("visa.mofa.gov.sa") || currentUrl.includes("Enjaz") || currentUrl.includes("Visa")) { ' +
            '     	var content = await navigator.clipboard.readText(); ' +
            '       var cbContent = ""; ' +
            '    	content = EncryptDecrypt(content, 18579); ' +
            '    	var startIndex = content.indexOf("[") + 1; ' +
            '    	var endIndex = content.indexOf("]"); ' +
            '    	var str = content.substring(startIndex, endIndex); ' +

            '    if(content.startsWith("FirstName[")) {  ' +
            '    	document.getElementById("EFIRSTNAME").value = str; ' +
            '       content = content.replace("FirstName[" + str + "]", ""); ' +
            '    	startIndex = content.indexOf("[") + 1; ' +
            '    	endIndex = content.indexOf("]"); ' +
            '       let currentDate = new Date(); let entrDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()); ' +
            ' str = content.substring(startIndex, endIndex); ' + '    	document.getElementById("EFATHER").value = str; ' + '    	content = content.replace("MiddleName[" + str + "]", ""); ' + '	startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + '	document.getElementById("EFAMILY").value = str; ' + ' content = content.replace("LastName[" + str + "]", ""); ' +
            ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("PASSPORTnumber").value = str; ' + ' content = content.replace("PassportNo[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' switch (str) { ' + '     case "Normal": ' + '    setSelectedOption("#PASSPORType", 1); ' + '    break; ' + '     case "Diplomatic": ' + '    setSelectedOption("#PASSPORType", 2); ' + '    break; ' + '     case "Special": ' + '    setSelectedOption("#PASSPORType", 3); ' + '    break; ' + '     case "Hajj Cert": ' + '    setSelectedOption("#PASSPORType", 4); ' + '    break; ' + '     case "Travel Cert": ' + '    setSelectedOption("#PASSPORType", 5); ' + '    break; ' + ' }    ' + ' content = content.replace("PassportType[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' +
            ' content = content.replace("PlaceOfIssue[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("PASSPORT_ISSUE_DATE").value = str; ' + ' content = content.replace("PasportIssuedDate[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("PASSPORT_EXPIRY_DATe").value = str; ' + ' content = content.replace("PasportExpiryDate[" + str + "]", ""); ' +
            ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("BIRTH_PLACE").value = str; ' + ' content = content.replace("PlaceOfBirth[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("BIRTH_DATE").value = str; ' + ' content = content.replace("DateOfBirth[" + str + "]", ""); ' + ' document.getElementById("PersonId").value = "0"; ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' if (str.toLowerCase().includes("ethiopia") ||  str == "") {' + ' setSelectedOption("#NATIONALITY", "ETH"); setSelectedOption("#NATIONALITY_FIRST", "ETH"); setSelectedOption("#PASSPORT_ISSUE_PLACE", "Ethiopia"); } ' + ' else {' + ' setSelectedOption("#NATIONALITY", ""); setSelectedOption("#NATIONALITY_FIRST", "");  setSelectedOption("#PASSPORT_ISSUE_PLACE", "");} ' + ' content = content.replace("CurrentNationality[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' content = content.replace("PastNationality[" + str + "]", "");  ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' if (str == "Islam") ' + ' setSelectedOption("#RELIGION", 1); ' + ' else ' + ' setSelectedOption("#RELIGION", 6); ' + ' content = content.replace("Religion[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' switch (str.toUpperCase()) { ' + '     case "SINGLE": ' + '    setSelectedOption("#SOCIAL_STATUS", 1); ' + '    break; ' + '     case "MARRIED": ' + '    setSelectedOption("#SOCIAL_STATUS", 2); ' + '    break; ' + '     case "DIVORCED": ' + '    setSelectedOption("#SOCIAL_STATUS", 3); ' + '    break; ' + '     case "WIDOW": ' + '    setSelectedOption("#SOCIAL_STATUS", 4); ' + '    break; ' + '     case "OTHER": ' + '    setSelectedOption("#SOCIAL_STATUS", 5); ' + '    break; ' + ' } ' + ' content = content.replace("MaritalStatus[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' if (str == "Male" || str == "MALE") ' + ' setSelectedOption("#Sex", 1); ' + ' else ' + ' setSelectedOption("#Sex", 2); ' + ' content = content.replace("Gender[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' /*document.getElementById("JOB_OR_RELATION").value = str;*/ ' + ' content = content.replace("Occupation[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("DEGREE").value = str; ' + ' content = content.replace("Qualification[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; '
            + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("DEGREE_SOURCE").value = str; ' + ' content = content.replace("SourceOfDegree[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' content = content.replace("ExperienceInCountry[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' content = content.replace("ExperienceInAbroad[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("ADDRESS_HOME").value = str; ' + ' content = content.replace("HomeAddress[" + str + "]", ""); ' + ' content = content.replace("PhoneNo[" + content.substring(content.indexOf("[") + 1, content.indexOf("]")) + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' content = content.replace("ContactPerson[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' content = content.replace("ContactPhone[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' content = content.replace("ContactAddress[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' +
            ' content = content.replace("ContactKinship[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' docNo = str = content.substring(startIndex, endIndex); ' + ' content = content.replace("VisaNo[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' if (str == "Work") { ' + ' setSelectedOption("#VisaKind", 1); ' + ' document.getElementById("porpose").value = "WORK"; ' + ' } ' + ' var visa_type = str; content = content.replace("VisaType[" + str + "]", ""); setSelectedOption("#NATIONALITY", "ETH"); setSelectedOption("#COMING_THROUGH", 2); setSelectedOption("#EmbassyCode", 301); ' + ' content = content.replace("VisaDate[" + content.substring(content.indexOf("[") + 1, content.indexOf("]")) + "]", ""); ' +
            ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("SPONSER_NAME").value = str; if(visa_type == "Business Visit"){ document.getElementById("Company_Business_Category").value = str;} ' + '  content = content.replace("SponsorName[" + str + "]", "");  ' + ' startIndex = content.indexOf("[") + 1; ' +
            ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("SPONSER_NUMBER").value = str; ' + ' content = content.replace("SponsorID[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("SPONSER_ADDRESS").value = str; ' + ' content = content.replace("SponsorAddress[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("SPONSER_PHONE").value = str; if(visa_type == "Business Visit"){ document.getElementById("Personal_Phone").value = str; } ' + ' content = content.replace("SponsorPhone[" + str + "]", ""); ' +
            ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' switch (str) { ' + '    case "Riyadh": ' + '    setSelectedOption("#ENTRY_POINT", 1); ' + '    break; ' + '    case "Jeddah": ' + '    setSelectedOption("#ENTRY_POINT", 2); ' + '    break; ' + '    case "Dhahran": ' + '    setSelectedOption("#ENTRY_POINT", 3); ' + '    break; ' + '    case "Al-Madinah": ' + '    setSelectedOption("#ENTRY_POINT", 4); ' + '    break; ' + '    case "Dammam": ' + '    setSelectedOption("#ENTRY_POINT", 5); ' + '    break; ' + ' } ' + ' content = content.replace("PortOfEntry[" + str + "]", ""); ' + ' setSelectedOption("#EmbassyCode", 301); document.getElementById("ExpectedEntryDate").value = entrDate.toISOString().slice(0, 10);  ' + ' setSelectedOption("#NUMBER_OF_ENTRIES", "0"); ' + ' setSelectedOption("#Number_Entry_Day", "90"); ' + ' setSelectedOption("#RESIDENCY_IN_KSA", 90); ' + ' document.getElementById("DocumentNumber").value = docNo; ' +
            ' content = content.substring(content.indexOf("Email")); startIndex = content.indexOf("[") + 1; endIndex = content.indexOf("]"); str = content.substring(startIndex, endIndex); document.getElementById("Personal_Email").value = str; ' +
            ' content = content.substring(content.indexOf("SponsorEmail")); startIndex = content.indexOf("[") + 1; endIndex = content.indexOf("]"); str = content.substring(startIndex, endIndex); if(visa_type == "Business Visit"){ document.getElementById("Personal_Email").value = str; document.getElementById("Company_Website").value = "-"; document.getElementById("Local_Company_Business_Category").value = "-"; } const hasnation = document.querySelector(\'input[name="Has_NATIONALITY_FIRST"][value="0"]\'); hasnation.checked = true; ' +
            ' var radioNo = document.getElementById("HaveTraveledToOtherCountriesNo"); radioNo.checked = true;  var endorsementCheckbox = document.getElementById("Endorsement"); endorsementCheckbox.checked = true; ' +


            '    } ' +
            '    else {' +
            '       cbContent = "VisaType<" + document.getElementById("VisaKind").value + ">"; ' +
            '       cbContent += "FullName<" + document.getElementById("EFIRSTNAME").value + " " + document.getElementById("EFATHER").value + " " + document.getElementById("EFAMILY").value + ">"; ' +
            '      try{ cbContent += "SponserName<" + document.getElementById("SPONSER_NAME").value + ">";}catch{cbContent += "SponserName<>";} ' +
            '      try{ cbContent += "SponserID<" + document.getElementById("SPONSER_NUMBER").value + ">";}catch{cbContent += "SponserID<>";} ' +
            '      try{ cbContent += "SponserPhone<" + document.getElementById("SPONSER_PHONE").value + ">";}catch{cbContent += "SponserPhone<>";} ' +
            '      try{ cbContent += "SponserAddress<" + document.getElementById("SPONSER_ADDRESS").value + ">";}catch{cbContent += "SponserAddress<>";} ' +
            '       cbContent += "PassportNo<" + document.getElementById("PASSPORTnumber").value + ">"; ' +
            '       cbContent += "PlaceOfIssue<" + document.getElementById("PASSPORT_ISSUE_PLACE").value + ">"; ' +
            '       cbContent += "IssuedDate<" + document.getElementById("PASSPORT_ISSUE_DATE").value + ">"; ' +
            '       cbContent += "ExpiryDate<" + document.getElementById("PASSPORT_EXPIRY_DATe").value + ">"; ' +
            '       cbContent += "BirthPlace<" + document.getElementById("BIRTH_PLACE").value + ">"; ' +
            '       cbContent += "BirthDate<" + document.getElementById("BIRTH_DATE").value + ">"; ' +
            '       cbContent += "Nationality<" + document.getElementById("NATIONALITY").value + ">"; ' +
            '       cbContent += "PreviousNationality<" + document.getElementById("NATIONALITY_FIRST").value + ">"; ' +

            '       cbContent += "Religion<" + document.getElementById("RELIGION").value + ">"; ' +
            '       cbContent += "MaritalStatus<" + document.getElementById("SOCIAL_STATUS").value + ">"; ' +
            '      try{ cbContent += "Sex<" + document.getElementById("Sex").value + ">";}catch{cbContent += "Sex<" + document.getElementById("SexName").value + ">";} ' +
            '       cbContent += "Qualification<" + document.getElementById("DEGREE").value + ">"; ' +
            '       cbContent += "SourceOfDegree<" + document.getElementById("DEGREE_SOURCE").value + ">"; ' +
            '       cbContent += "HomeAddress<" + document.getElementById("ADDRESS_HOME").value + ">"; ' +
            '      try{ cbContent += "PassportType<" + document.getElementById("PASSPORType").value + ">"; } catch{cbContent += "PassportType<>"}' +
            '       cbContent += "VisaNo<" + document.getElementById("DocumentNumber").value + ">"; ' +
            '       cbContent += "PortOfEntry<" + document.getElementById("ENTRY_POINT").value + ">"; ' +
            '       cbContent += "PurposeOfTravel<" + document.getElementById("porpose").value + ">"; ' +
            '       cbContent = EncryptDecrypt(cbContent, 18579); ' +
            '       navigator.clipboard.writeText(cbContent).then(() => { }, (e) => { }); document.execCommand("copy"); alert("Data sending to Easy Enjaz is successfull"); ' +
            '    } ' +
            ' } ' +
            '    if(currentUrl.includes("services.ksavisa.sa") || currentUrl.includes("services.ksavisa.sa/SmartForm/TraditionalApp")) { ' +
            '     	var content = await navigator.clipboard.readText(); ' +
            '       var cbContent = ""; ' +
            '    	content = EncryptDecrypt(content, 18579); ' +
            '    	var startIndex = content.indexOf("[") + 1; ' +
            '    	var endIndex = content.indexOf("]"); ' +
            '    	var str = content.substring(startIndex, endIndex); ' +
            '       if(content.startsWith("FirstName[")) {  ' +
            '    	document.getElementById("EFIRSTNAME").value = str; ' +
            '       content = content.replace("FirstName[" + str + "]", ""); ' +
            '    	startIndex = content.indexOf("[") + 1; ' +
            '   	endIndex = content.indexOf("]"); ' +
            '       let currentDate = new Date(); let entrDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()); ' +
            ' str = content.substring(startIndex, endIndex); ' + '    	document.getElementById("EFATHER").value = str; ' + '    	content = content.replace("MiddleName[" + str + "]", ""); ' + '	startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + '	document.getElementById("EFAMILY").value = str; ' + ' content = content.replace("LastName[" + str + "]", ""); ' +
            ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("PASSPORTnumber").value = str; ' + ' content = content.replace("PassportNo[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' switch (str) { ' + '     case "Normal": ' + '    setSelectedOption("#PASSPORType", 1); ' + '    break; ' + '     case "Diplomatic": ' + '    setSelectedOption("#PASSPORType", 2); ' + '    break; ' + '     case "Special": ' + '    setSelectedOption("#PASSPORType", 3); ' + '    break; ' + '     case "Hajj Cert": ' + '    setSelectedOption("#PASSPORType", 4); ' + '    break; ' + '     case "Travel Cert": ' + '    setSelectedOption("#PASSPORType", 5); ' + '    break; ' + ' }    ' + ' content = content.replace("PassportType[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' +
            ' content = content.replace("PlaceOfIssue[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("PASSPORT_ISSUE_DATE").value = str; ' + ' content = content.replace("PasportIssuedDate[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("PASSPORT_EXPIRY_DATe").value = str; ' + ' content = content.replace("PasportExpiryDate[" + str + "]", ""); ' +
            ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("BIRTH_PLACE").value = str; ' + ' content = content.replace("PlaceOfBirth[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("BIRTH_DATE").value = str; ' + ' content = content.replace("DateOfBirth[" + str + "]", ""); ' + ' document.getElementById("PersonId").value = "0"; ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' if (str.toLowerCase().includes("ethiopia") ||  str == "") {' + ' setSelectedOption("#NATIONALITY", "ETH"); setSelectedOption("#NATIONALITY_FIRST", "ETH"); setSelectedOption("#PASSPORT_ISSUE_PLACE", "Ethiopia"); } ' + ' else {' + ' setSelectedOption("#NATIONALITY", ""); setSelectedOption("#NATIONALITY_FIRST", "");  setSelectedOption("#PASSPORT_ISSUE_PLACE", "");} ' + ' content = content.replace("CurrentNationality[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' content = content.replace("PastNationality[" + str + "]", "");  ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' if (str == "Islam") ' + ' setSelectedOption("#RELIGION", 1); ' + ' else ' + ' setSelectedOption("#RELIGION", 6); ' + ' content = content.replace("Religion[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + '   switch (str.toUpperCase()) { ' + '     case "SINGLE": ' + '    setSelectedOption("#SOCIAL_STATUS", 1); ' + '    break; ' + '     case "MARRIED": ' + '    setSelectedOption("#SOCIAL_STATUS", 2); ' + '    break; ' + '     case "DIVORCED": ' + '    setSelectedOption("#SOCIAL_STATUS", 3); ' + '    break; ' + '     case "WIDOW": ' + '    setSelectedOption("#SOCIAL_STATUS", 4); ' + '    break; ' + '     case "OTHER": ' + '  setSelectedOption("#SOCIAL_STATUS", 5); ' + '    break; ' + ' } ' + ' content = content.replace("MaritalStatus[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' if (str == "Male" || str == "MALE") ' + ' setSelectedOption("#Sex", 1); ' + ' else ' + ' setSelectedOption("#Sex", 2); ' + ' content = content.replace("Gender[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' /*document.getElementById("JOB_OR_RELATION").value = str;*/ ' + ' content = content.replace("Occupation[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("DEGREE").value = str; ' + ' content = content.replace("Qualification[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; '
            + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("DEGREE_SOURCE").value = str; ' + ' content = content.replace("SourceOfDegree[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' content = content.replace("ExperienceInCountry[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' content = content.replace("ExperienceInAbroad[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("ADDRESS_HOME").value = str; ' + ' content = content.replace("HomeAddress[" + str + "]", ""); ' + ' content = content.replace("PhoneNo[" + content.substring(content.indexOf("[") + 1, content.indexOf("]")) + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' content = content.replace("ContactPerson[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' content = content.replace("ContactPhone[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' content = content.replace("ContactAddress[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' +
            ' content = content.replace("ContactKinship[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' docNo = str = content.substring(startIndex, endIndex); ' + ' content = content.replace("VisaNo[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' if (str == "Work") { ' + ' setSelectedOption("#VisaKind", 1); ' + ' document.getElementById("porpose").value = "WORK"; ' + ' } ' + ' var visa_type = str; content = content.replace("VisaType[" + str + "]", ""); setSelectedOption("#NATIONALITY", "ETH"); setSelectedOption("#COMING_THROUGH", 2); setSelectedOption("#EmbassyCode", 301); ' + ' content = content.replace("VisaDate[" + content.substring(content.indexOf("[") + 1, content.indexOf("]")) + "]", ""); ' +
            ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("SPONSER_NAME").value = str; if(visa_type == "Business Visit"){ document.getElementById("Company_Business_Category").value = str;} ' + '  content = content.replace("SponsorName[" + str + "]", "");  ' + ' startIndex = content.indexOf("[") + 1; ' +
            ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("SPONSER_NUMBER").value = str; ' + ' content = content.replace("SponsorID[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("SPONSER_ADDRESS").value = str; ' + ' content = content.replace("SponsorAddress[" + str + "]", ""); ' + ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' document.getElementById("SPONSER_PHONE").value = str; if(visa_type == "Business Visit"){ document.getElementById("Personal_Phone").value = str; } ' + ' content = content.replace("SponsorPhone[" + str + "]", ""); ' +
            ' startIndex = content.indexOf("[") + 1; ' + ' endIndex = content.indexOf("]"); ' + ' str = content.substring(startIndex, endIndex); ' + ' switch (str) { ' + '    case "Riyadh": ' + '    setSelectedOption("#ENTRY_POINT", 1); ' + '    break; ' + '    case "Jeddah": ' + '    setSelectedOption("#ENTRY_POINT", 2); ' + '    break; ' + '    case "Dhahran": ' + '    setSelectedOption("#ENTRY_POINT", 3); ' + '    break; ' + '    case "Al-Madinah": ' + '    setSelectedOption("#ENTRY_POINT", 4); ' + '    break; ' + '    case "Dammam": ' + '    setSelectedOption("#ENTRY_POINT", 5); ' + '    break; ' + ' } ' + ' content = content.replace("PortOfEntry[" + str + "]", ""); ' + ' setSelectedOption("#EmbassyCode", 301); document.getElementById("ExpectedEntryDate").value = entrDate.toISOString().slice(0, 10);  ' + ' setSelectedOption("#NUMBER_OF_ENTRIES", "0"); ' + ' setSelectedOption("#Number_Entry_Day", "90"); ' + ' setSelectedOption("#RESIDENCY_IN_KSA", 90); ' + ' document.getElementById("DocumentNumber").value = docNo; ' +
            ' content = content.substring(content.indexOf("Email")); startIndex = content.indexOf("[") + 1; endIndex = content.indexOf("]"); str = content.substring(startIndex, endIndex); document.getElementById("Personal_Email").value = str; ' +
            ' content = content.substring(content.indexOf("SponsorEmail")); startIndex = content.indexOf("[") + 1; endIndex = content.indexOf("]"); str = content.substring(startIndex, endIndex); if(visa_type == "Business Visit"){ document.getElementById("Personal_Email").value = str; document.getElementById("Company_Website").value = "-"; document.getElementById("Local_Company_Business_Category").value = "-"; } const hasnation = document.querySelector(\'input[name="Has_NATIONALITY_FIRST"][value="0"]\'); hasnation.checked = true; ' +
            ' var radioNo = document.getElementById("HaveTraveledToOtherCountriesNo"); radioNo.checked = true;  var endorsementCheckbox = document.getElementById("Endorsement"); endorsementCheckbox.checked = true; ' +
            '   } ' +
            ' } ' +
            /* ************************************************************************  ADD LMIS HERE *****************************************************************/
            '     else if(currentUrl.includes("lmis")) { ' +
            '           var content = await navigator.clipboard.readText(); ' +
            '           content = EncryptDecrypt(content, 18579); ' +
            '           content =  content.substring(content.indexOf("PassportNo[")).replace("PassportNo[","").trim(); ' +
            '    	    var endIndex = content.indexOf("]"); ' +
            '           var tmp = content.substring(0,endIndex); ' +

            '           const passportInput = document.querySelector(\'input[name = "passport_no"]\'); ' +
            '           passportInput.value = tmp; ' +
            '           const passportEvent = new Event("input", { bubbles: true }); ' +
            '           const passportChangeEvent = new Event("change", { bubbles: true }); ' +
            '           passportInput.dispatchEvent(passportEvent); ' +
            '           passportInput.dispatchEvent(passportChangeEvent); ' +

            '           content =  content.substring(content.indexOf("VisaNo[")).replace("VisaNo[","").trim(); ' +
            '    	    endIndex = content.indexOf("]"); ' +
            '           tmp = content.substring(0,endIndex); ' +


            '           const visaInput = document.querySelector(\'input[name = "visa_no"]\'); ' +
            '           visaInput.value = tmp; ' +
            '           const visaEvent = new Event("input", { bubbles: true }); ' +
            '           const visaChangeEvent = new Event("change", { bubbles: true }); ' +
            '           visaInput.dispatchEvent(visaEvent); ' +
            '           visaInput.dispatchEvent(visaChangeEvent); ' +

            '           content =  content.substring(content.indexOf("SponsorName[")).replace("SponsorName[","").trim(); ' +
            '    	    endIndex = content.indexOf("]"); ' +
            '           tmp = content.substring(0,endIndex); ' +

            '           const sponserInput = document.querySelector(\'input[name = "employer_name"]\'); ' +
            '           sponserInput.value = tmp; ' +
            '           const sponserEvent = new Event("input", { bubbles: true }); ' +
            '           const sponserChangeEvent = new Event("change", { bubbles: true }); ' +
            '           sponserInput.dispatchEvent(sponserEvent); ' +
            '           sponserInput.dispatchEvent(sponserChangeEvent); ' +

            '           content =  content.substring(content.indexOf("SponsorAddress[")).replace("SponsorAddress[","").trim(); ' +
            '    	    endIndex = content.indexOf("]"); ' +
            '           tmp = content.substring(0,endIndex); ' +

            '           const sponser_HnoInput = document.querySelector(\'input[name = "employer_house_no"]\'); ' +
            '           sponser_HnoInput.value = tmp; ' +
            '           const hnoEvent = new Event("input", { bubbles: true }); ' +
            '           const hnoChangeEvent = new Event("change", { bubbles: true }); ' +
            '           sponser_HnoInput.dispatchEvent(hnoEvent); ' +
            '           sponser_HnoInput.dispatchEvent(hnoChangeEvent); ' +


            '           content =  content.substring(content.indexOf("SponsorPhone[")).replace("SponsorPhone[","").trim(); ' +
            '    	    endIndex = content.indexOf("]"); ' +
            '           tmp = content.substring(0,endIndex); ' +

            '           const sponser_phoneInput = document.querySelector(\'input[name = "employer_phone_number"]\'); ' +
            '           sponser_phoneInput.value = tmp; ' +
            '           const sponserPhnEvent = new Event("input", { bubbles: true }); ' +
            '           const sponserPhnChangeEvent = new Event("change", { bubbles: true }); ' +
            '           sponser_phoneInput.dispatchEvent(sponserPhnEvent); ' +
            '           sponser_phoneInput.dispatchEvent(sponserPhnChangeEvent); ' +

            '           content =  content.substring(content.indexOf("BeginningOfContract[")).replace("BeginningOfContract[","").trim(); ' +
            '    	    endIndex = content.indexOf("]"); ' +
            '           tmp = content.substring(0,endIndex); ' +
            //
            '           const begOfConInput = document.querySelector(\'input[name="beginning_of_contract"]\'); ' +
            '           if (begOfConInput) { ' +
            '           var currentDate = tmp; ' +
            '           if(tmp == "") currentDate = new Date().toJSON().slice(0, 10); ' +
            '               begOfConInput.value = currentDate; ' +
            '               const bocEvent = new Event("input", { bubbles: true }); ' +
            '               const bocChangeEvent = new Event("change", { bubbles: true }); ' +
            '               begOfConInput.dispatchEvent(bocEvent); ' +
            '               begOfConInput.dispatchEvent(bocChangeEvent); ' +

            '               var dateObject = new Date(currentDate); ' +
            '               dateObject.setFullYear(dateObject.getFullYear() + 2); ' +
            '               dateObject.setDate(dateObject.getDate() + 45); ' +
            '               var year = dateObject.getFullYear(); ' +
            '               var month = ("0" + (dateObject.getMonth() + 1)).slice(-2); ' +
            '               var day = ("0" + dateObject.getDate()).slice(-2); ' +
            '               var endDt = year + "-" + month + "-" + day;' +

            '               const endOfConInput = document.querySelector(\'input[name="ending_of_contract"]\'); ' +
            '               if (endOfConInput) { ' +
            '                   endOfConInput.value = endDt; ' +
            '                   const eocEvent = new Event("input", { bubbles: true }); ' +
            '                   const eocChangeEvent = new Event("change", { bubbles: true }); ' +
            '                   endOfConInput.dispatchEvent(eocEvent); ' +
            '                   endOfConInput.dispatchEvent(eocChangeEvent); ' +
            '               } ' +
            '           } ' +

            //

            '     } ' +
            /*********************************************** INSURANCE ******************************************/
            '   else if(currentUrl.includes("niscofetap")) { ' +
            '   var content = await navigator.clipboard.readText(); ' +
            '   content = EncryptDecrypt(content, 18579); ' +
            '   var startIndex = content.indexOf("[") + 1; ' +
            '   var endIndex = content.indexOf("]"); ' +
            '   var str = content.substring(startIndex, endIndex); ' +
            '   const fname = document.querySelector(\'input[name="firstName"]\'); ' +
            '   fname.value = str; ' +
            '   fname.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '   fname.setAttribute("data-valid", "true"); ' +
            '   content = content.replace("FirstName[" + str + "]", ""); ' +
            '   startIndex = content.indexOf("[") + 1; ' +
            '   endIndex = content.indexOf("]"); ' +
            '   str = content.substring(startIndex, endIndex); ' +
            '   const mname = document.querySelector(\'input[name="fatherName"]\'); ' +
            '   mname.value = str; ' +
            '   mname.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '   mname.setAttribute("data-valid", "true"); ' +
            '   content = content.replace("MiddleName[" + str + "]", ""); ' +
            '   startIndex = content.indexOf("[") + 1; ' +
            '   endIndex = content.indexOf("]"); ' +
            '   str = content.substring(startIndex, endIndex); ' +
            '   const lname = document.querySelector(\'input[name="grandFatherName"]\'); ' +
            '   lname.value = str; ' +
            '   lname.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '   lname.setAttribute("data-valid", "true"); ' +


            '   content = content.replace("LastName[" + str + "]", ""); ' +
            '   startIndex = content.indexOf("[") + 1; ' +
            '   endIndex = content.indexOf("]"); ' +
            '   str = content.substring(startIndex, endIndex); ' +

            '   const passportNo = document.querySelector(\'input[name="passportNumber"]\'); ' +
            '   passportNo.value = str; ' +
            '   passportNo.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '   passportNo.setAttribute("data-valid", "true"); ' +

            '   startIndex = content.indexOf("DateOfBirth[") + 12; ' +
            '   content = content.substring(startIndex); ' +
            '   endIndex = content.indexOf("]"); ' +
            '   str = content.substring(0, endIndex); ' +

            '   const birthDate = document.querySelector(\'input[name="birthDate"]\'); ' +
            '   if (birthDate) { ' +
            '       birthDate.value = str; ' +
            '       birthDate.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       birthDate.setAttribute("data-valid", "true"); ' +
            '       const dobEvent = new Event("change", { bubbles: true }); ' +
            '       birthDate.dispatchEvent(dobEvent); ' +
            '   } ' +

            '   startIndex = content.indexOf("MaritalStatus[") + 14; ' +
            '   content = content.substring(startIndex); ' +
            '   endIndex = content.indexOf("]"); ' +
            '   str = content.substring(0, endIndex); ' +
            '   var maritalStatus = str.toUpperCase(); ' +

            '   startIndex = content.indexOf("Gender[") + 7; ' +
            '   content = content.substring(startIndex); ' +
            '   endIndex = content.indexOf("]"); ' +
            '   str = content.substring(0, endIndex); ' +

            '   const gender = document.querySelector(\'select[name="gender"]\'); ' +
            '   if (gender) { ' +
            '       var _gender = "Female"; ' +
            '       if (str.toUpperCase() == "MALE") ' +
            '           _gender = "Male"; ' +
            '       gender.value = _gender; ' +
            '       gender.setAttribute("data-val", JSON.stringify({ value: _gender })); ' +
            '       gender.setAttribute("data-valid", "true"); ' +

            '       const genderEvent = new Event("change", { bubbles: true }); ' +
            '       gender.dispatchEvent(genderEvent); ' +
            '   } ' +

            '    var _title = "Ms."; ' +
            '    if (str.toUpperCase() == "MALE") ' +
            '        _title = "Mr."; ' +
            '    else if (maritalStatus == "MARRIED") ' +
            '        _title = "Mrs."; ' +

            '   const title = document.querySelector(\'select[name="title"]\'); ' +
            '   if (title) { ' +
            '       title.value = _title; ' +
            '       title.setAttribute("data-val", JSON.stringify({ value: _title })); ' +
            '       title.setAttribute("data-valid", "true"); ' +

            '       const titleEvent = new Event("change", { bubbles: true }); ' +
            '       title.dispatchEvent(titleEvent); ' +
            '   } ' +

            '   startIndex = content.indexOf("PhoneNo[") + 8; ' +
            '   content = content.substring(startIndex); ' +
            '   endIndex = content.indexOf("]"); ' +
            '   str = content.substring(0, endIndex); ' +

            '   const phoneNo = document.querySelector(\'input[name="phone"]\'); ' +
            '   phoneNo.value = str; ' +
            '   phoneNo.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '   phoneNo.setAttribute("data-valid", "true"); ' +

            '   startIndex = content.indexOf("Subcity[") + 8; ' +
            '   content = content.substring(startIndex); ' +
            '   endIndex = content.indexOf("]"); ' +
            '   str = content.substring(0, endIndex); ' +

            '   const subCity = document.querySelector(\'input[name="subCity"]\'); ' +
            '   subCity.value = str; ' +
            '   subCity.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '   subCity.setAttribute("data-valid", "true"); ' +

            '   startIndex = content.indexOf("Kebele[") + 7; ' +
            '   content = content.substring(startIndex); ' +
            '   endIndex = content.indexOf("]"); ' +
            '   str = content.substring(0, endIndex); ' +

            '   const woreda = document.querySelector(\'input[name="woreda"]\'); ' +
            '   woreda.value = str; ' +
            '   woreda.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '   woreda.setAttribute("data-valid", "true"); ' +

            '   startIndex = content.indexOf("Region[") + 7; ' +
            '   content = content.substring(startIndex); ' +
            '   endIndex = content.indexOf("]"); ' +
            '   str = content.substring(0, endIndex); ' +

            '   const region = document.querySelector(\'select[name="state"]\'); ' +
            '   if (region) { ' +
            '       var _region = str; ' +
            '        switch (str) { ' +
            '           case "Amhara": ' +
            '               _region = "Amahara"; ' +
            '               break; ' +
            '           case "Benishangul-Gumuz": ' +
            '               _region = "Benishangul Gumz"; ' +
            '               break; ' +
            '           case "Somalia": ' +
            '               _region = "Somali"; ' +
            '               break; ' +
            '           case "SNNP": ' +
            '               _region = "South Ethiopia"; ' +
            '               break; ' +
            '       } ' +
            '       region.value = _region; ' +
            '       region.setAttribute("data-val", JSON.stringify({ value: _region })); ' +
            '       region.setAttribute("data-valid", "true"); ' +
            '       const regionEvent = new Event("change", { bubbles: true }); ' +
            '       region.dispatchEvent(regionEvent); ' +
            '   } ' +

            '   startIndex = content.indexOf("SponsorCountry[") + 15; ' +
            '   content = content.substring(startIndex); ' +
            '   endIndex = content.indexOf("]"); ' +
            '   str = content.substring(0, endIndex); ' +
            '   if (str.trim() != "") { ' +
            '       const country = document.querySelector(\'select[name="countryOfDestination"]\'); ' +
            '       if (country) { ' +
            '           var _country = str; ' +
            '           switch (str) { ' +
            '               case "SAUDI ARABIA": ' +
            '                   _country = "Saudi Arabia"; ' +
            '                   break; ' +
            '               case "QATAR": ' +
            '                   _country = "Qatar"; ' +
            '                   break; ' +
            '               case "KUWAIT": ' +
            '                   _country = "Somali"; ' +
            '                   break; ' +
            '               case "UAE": ' +
            '                   _country = "UAE"; ' +
            '                   break; ' +
            '               case "BAHRAIN": ' +
            '                   _country = "Bahrain"; ' +
            '                   break; ' +
            '               case "JORDAN": ' +
            '                   _country = "Jordan"; ' +
            '                   break; ' +
            '          } ' +

            '           country.value = _country; ' +
            '           country.setAttribute("data-val", JSON.stringify({ value: _country })); ' +
            '           country.setAttribute("data-valid", "true"); ' +

            '           const countryEvent = new Event("change", { bubbles: true }); ' +
            '           country.dispatchEvent(countryEvent); ' +
            '       } ' +
            '   } ' +

            '   startIndex = content.indexOf("LaborID[") + 8; ' +
            '   content = content.substring(startIndex); ' +
            '   endIndex = content.indexOf("]"); ' +
            '   str = content.substring(0, endIndex); ' + 
 
            '   const laborId = document.querySelector(\'input[name="laborId"]\'); ' +
            '   laborId.value = str; ' +
            '   laborId.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '   laborId.setAttribute("data-valid", "true"); ' +

            '} ' +
            /*********************************************** FINGER PRINT VC-TASHEER ******************************************/
            '   else if(currentUrl.includes("vc.tasheer")) { ' +
            '   var content = await navigator.clipboard.readText(); ' +
            '   content = EncryptDecrypt(content, 18579); ' +

            '   if(currentUrl.includes("sponsor")) { ' +
            '       content = content.substring(content.indexOf("VisaNo[")); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +
            '       const visano = document.querySelector(\'input[formcontrolname="invitationId"]\'); ' +
            '       visano.value = str; ' +
            '       visano.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       visano.setAttribute("data-valid", "true"); ' +
            '       visano.dispatchEvent(new Event(\'input\', { bubbles: true })); ' +
                   
            '       content = content.substring(content.indexOf("SponsorID")); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +
            '       const sponsorid = document.querySelector(\'input[formcontrolname="sponsorId"]\'); ' +
            '       sponsorid.value = str; ' +
            '       sponsorid.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       sponsorid.setAttribute("data-valid", "true"); ' +
            '       sponsorid.dispatchEvent(new Event(\'input\', { bubbles: true })); ' +

            '   } ' +
            '   else { ' +
            '       var startIndex = content.indexOf("[") + 1; ' +
            '       var endIndex = content.indexOf("]"); ' +
            '       var str = content.substring(startIndex, endIndex); ' +
            '       const fname = document.querySelector(\'input[placeholder="Mandatory"][required]\'); ' +
            '       fname.value = str; ' +
            '       fname.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       fname.setAttribute("data-valid", "true"); ' +
            '       fname.dispatchEvent(new Event(\'input\', { bubbles: true }));' +

            '       content = content.replace("FirstName[" + str + "]", ""); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +
            '       const mname = document.querySelector(\'input[placeholder="Optional"][oninput]\'); ' +
            '       mname.value = str; ' +
            '       mname.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       mname.setAttribute("data-valid", "true"); ' +
            '       mname.dispatchEvent(new Event(\'input\', { bubbles: true }));' +

            '       content = content.replace("MiddleName[" + str + "]", ""); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +
            '       const lname = document.querySelectorAll(\'input[placeholder="Mandatory"][required]\')[1]; ' +
            '       lname.value = str; ' +
            '       lname.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       lname.setAttribute("data-valid", "true"); ' +
            '       lname.dispatchEvent(new Event(\'input\', { bubbles: true }));' +

            '       content = content.replace("LastName[" + str + "]", ""); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +

            '       const passport_No = document.querySelectorAll(\'input[placeholder="Mandatory"][required]\')[10]; ' +
            '       passport_No.value = str; ' +
            '       passport_No.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       passport_No.setAttribute("data-valid", "true"); ' +
            '       passport_No.dispatchEvent(new Event(\'input\', { bubbles: true }));' +

            '       const passportConfirm = document.querySelectorAll(\'input[placeholder="Mandatory"][required]\')[11]; ' +
            '       passportConfirm.value = str; ' +
            '       passportConfirm.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       passportConfirm.setAttribute("data-valid", "true"); ' +
            '       passportConfirm.dispatchEvent(new Event(\'input\', { bubbles: true }));' +


            '       const passportType = document.querySelectorAll(\'select.form-select[required]\')[8]; ' +
            '       if (passportType) { ' +
            '           passportType.value = "14050"; ' +
            '           passportType.setAttribute("data-val", JSON.stringify({ value: "14050" })); ' +
            '           passportType.setAttribute("data-valid", "true"); ' +

            '           const passportTypeEvent = new Event("change", { bubbles: true }); ' +
            '           passportType.dispatchEvent(passportTypeEvent); ' +
            '       } ' +

            '       content = content.substring(content.indexOf("PlaceOfIssue")); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +
                            
            '       const placeOfIssue = document.querySelectorAll(\'input[placeholder="Mandatory"][required]\')[12]; ' +
            '       placeOfIssue.value = str; ' +
            '       placeOfIssue.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       placeOfIssue.setAttribute("data-valid", "true"); ' +
            '       placeOfIssue.dispatchEvent(new Event(\'input\', { bubbles: true }));' +

            '       content = content.substring(content.indexOf("PasportIssuedDate[")); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +

            '       const issueDt = new Date(str); ' +
            '       const issueDD = String(issueDt.getDate()).padStart(2, "0"); const issueMMM = issueDt.toLocaleString("default", { month: "short" }); ' + 
            '       const issueYYYY = issueDt.getFullYear(); ' +
            '       const issuedDate = document.querySelectorAll(\'input[placeholder="DD-MMM-YYYY"]\')[1]; ' +
            '       if(issuedDate) { ' +
            '           const formattedDate = issueDD + "-" + issueMMM + "-" + issueYYYY; ' +
            '           issuedDate.value = formattedDate;   ' +
            '           issuedDate.setAttribute("data-val", formattedDate); ' +
            '           issuedDate.setAttribute("data-valid", "true"); ' +
            '           const inputEvent = new Event("input", { bubbles: true }); ' +
            '           const changeEvent = new Event("change", { bubbles: true }); ' +
            '           issuedDate.dispatchEvent(inputEvent); ' +
            '           issuedDate.dispatchEvent(changeEvent); ' +
            '       } ' +

            '       content = content.substring(content.indexOf("PasportExpiryDate[")); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +

            '       const expDt = new Date(str); const expDD = String(expDt.getDate()).padStart(2, "0"); const expMMM = expDt.toLocaleString("default", { month: "short" }); const expYYYY = expDt.getFullYear(); ' +
            '       const expiryDate = document.querySelectorAll(\'input[placeholder="DD-MMM-YYYY"]\')[2]; ' +
            '       if (expiryDate) { ' +
            '           expiryDate.value = expDD+"-"+expMMM+"-"+expYYYY; ' +
            '           expiryDate.setAttribute("data-val", JSON.stringify({ value: expDt })); ' +
            '           expiryDate.setAttribute("data-valid", "true"); ' +
            '           const expEvent = new Event("change", { bubbles: true }); ' +
            '           expiryDate.dispatchEvent(expEvent); ' +
            '       } ' +


            '       content = content.substring(content.indexOf("PlaceOfBirth[")); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +

            '       const placeOfBirth = document.querySelectorAll(\'input[placeholder="Mandatory"][required]\')[13]; ' +
            '       placeOfBirth.value = str; ' +
            '       placeOfBirth.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       placeOfBirth.setAttribute("data-valid", "true"); ' +
            '       placeOfBirth.dispatchEvent(new Event(\'input\', { bubbles: true }));' +
            

            '       startIndex = content.indexOf("DateOfBirth[") + 12; ' +
            '       content = content.substring(startIndex); ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(0, endIndex); ' +

            '       const date = new Date(str); const birthDD = String(date.getDate()).padStart(2, "0"); const birthMMM = date.toLocaleString("default", { month: "short" }); const birthYYYY = date.getFullYear(); ' +
            '       const birthDate = document.querySelectorAll(\'input[placeholder="DD-MMM-YYYY"]\')[3]; ' +
            '       if (birthDate) { ' +
            '           const formattedBrDate = birthDD + "-" + birthMMM + "-" + birthYYYY; ' +
            '           birthDate.value = formattedBrDate; ' +
            '           birthDate.setAttribute("data-val", JSON.stringify({ value: formattedBrDate })); ' +
            '           birthDate.setAttribute("data-valid", "true"); ' +
            '           const dobEvent = new Event("change", { bubbles: true }); ' +
            '           const dobChangeEvent = new Event("change", { bubbles: true }); ' +
            '           birthDate.dispatchEvent(dobEvent); ' +
            '           birthDate.dispatchEvent(dobChangeEvent); ' +
            '       } ' +


            '       content = content.substring(content.indexOf("Religion[")); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +
            '       var _religion = str.toUpperCase(); ' +
            '               switch (_religion) { ' +
            '                   case "ISLAM": ' +
            '                       _religion = "15050"; ' +
            '                       break; ' +
            '                   case "CHRISTIAN": case "ORTHODOX": case "CATHOLIC": case "PROTESTANT": ' +
            '                       _religion = "15051"; ' +
            '                       break; ' +
            '                   case "BUDDHISM": ' +
            '                       _religion = "15052"; ' +
            '                       break; ' +
            '                   case "HINDUISM": ' +
            '                       _religion = "15053"; ' +
            '                       break; ' +
            '                   case "SIKHISM": ' +
            '                       _religion = "15054"; ' +
            '                       break; ' +
            '                   case "NON-MUSLIM": ' +
            '                       _religion = "15055"; ' +
            '                       break; ' +
            '              } ' +
            '       const religion = document.querySelectorAll(\'select.form-select[required]\')[3]; ' +
            '       if (religion) { ' +
            '           religion.value = _religion; ' +
            '           religion.setAttribute("data-val", JSON.stringify({ value: _religion })); ' +
            '           religion.setAttribute("data-valid", "true"); ' +

            '           const religionEvent = new Event("change", { bubbles: true }); ' +
            '           religion.dispatchEvent(religionEvent); ' +
            '       } ' +


            '       startIndex = content.indexOf("MaritalStatus[") + 14; ' +
            '       content = content.substring(startIndex); ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(0, endIndex); ' +
            '       var _maritalSt = str.toUpperCase(); ' +
            '               switch (_maritalSt) { ' +
            '                   case "SINGLE": ' +
            '                       _maritalSt = "12050"; ' +
            '                       break; ' +
            '                   case "MARRIED": ' +
            '                       _maritalSt = "12051"; ' +
            '                       break; ' +
            '                   case "DIVORCED": ' +
            '                       _maritalSt = "12052"; ' +
            '                       break; ' +
            '                   case "WIDOW": ' +
            '                       _maritalSt = "12053"; ' +
            '                       break; ' +
            '                   case "OTHER": ' +
            '                       _maritalSt = "12054"; ' +
            '                       break; ' +
            '              } ' +
            '       const maritalStatus = document.querySelectorAll(\'select.form-select[required]\')[1]; ' +
            '       if (maritalStatus) { ' +
            '           maritalStatus.value = _maritalSt; ' +
            '           maritalStatus.setAttribute("data-val", JSON.stringify({ value: _maritalSt })); ' +
            '           maritalStatus.setAttribute("data-valid", "true"); ' +

            '           const maritialEvent = new Event("change", { bubbles: true }); ' +
            '           maritalStatus.dispatchEvent(maritialEvent); ' +
            '       } ' +

            '       startIndex = content.indexOf("Gender[") + 7; ' +
            '       content = content.substring(startIndex); ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(0, endIndex); ' +

            '       const gender = document.querySelector(\'select.form-select[required]\'); ' +
            '       if (gender) { ' +
            '           var _gender = "F"; ' +
            '           if (str.toUpperCase() == "MALE") ' +
            '               _gender = "M"; ' +
            '           gender.value = _gender; ' +
            '           gender.setAttribute("data-val", JSON.stringify({ value: _gender })); ' +
            '           gender.setAttribute("data-valid", "true"); ' +

            '           const genderEvent = new Event("change", { bubbles: true }); ' +
            '           gender.dispatchEvent(genderEvent); ' +
            '       } ' +

            '       content = content.substring(content.indexOf("Occupation[")); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +

            '       const occupation = document.querySelectorAll(\'input[placeholder="Mandatory"][required]\')[2]; ' +
            '       occupation.value = str; ' +
            '       occupation.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       occupation.setAttribute("data-valid", "true"); ' +
            '       occupation.dispatchEvent(new Event(\'input\', { bubbles: true }));' +

            '       content = content.substring(content.indexOf("Qualification[")); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +

            '       const qualification = document.querySelectorAll(\'input[placeholder="Mandatory"][required]\')[3]; ' +
            '       qualification.value = str; ' +
            '       qualification.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       qualification.setAttribute("data-valid", "true"); ' +
            '       qualification.dispatchEvent(new Event(\'input\', { bubbles: true }));' +


            
            '       const houseNo = document.querySelectorAll(\'input[placeholder="Mandatory"][required]\')[6]; ' +
            '       houseNo.value = "0"; ' +
            '       houseNo.setAttribute("data-val", JSON.stringify({ value: "0" })); ' +
            '       houseNo.setAttribute("data-valid", "true"); ' +
            '       houseNo.dispatchEvent(new Event(\'input\', { bubbles: true }));' +

            '       const bldgName = document.querySelectorAll(\'input[placeholder="Mandatory"][required]\')[7]; ' +
            '       bldgName.value = str; ' +
            '       bldgName.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       bldgName.setAttribute("data-valid", "true"); ' +
            '       bldgName.dispatchEvent(new Event(\'input\', { bubbles: true }));' +
                            

            '       const srcDegree = document.querySelectorAll(\'select.form-select[required]\')[4]; ' +
            '       srcDegree.value = "46102"; ' +
            '       srcDegree.setAttribute("data-val", JSON.stringify({ value: "46102" })); ' +
            '       srcDegree.setAttribute("data-valid", "true"); ' +

            '       const srcDegreeEvent = new Event("change", { bubbles: true }); ' +
            '       srcDegree.dispatchEvent(srcDegreeEvent); ' +
            

            //'       document.querySelectorAll(\'select.form-select[required]\')[6].value = "18050"; ' +
            '       const transportMod = document.querySelectorAll(\'select.form-select[required]\')[6]; ' +
            '       transportMod.value = "18050"; ' +
            '       transportMod.setAttribute("data-val", JSON.stringify({ value: "18050" })); ' +
            '       transportMod.setAttribute("data-valid", "true"); ' +

            '       const transportModEvent = new Event("change", { bubbles: true }); ' +
            '       transportMod.dispatchEvent(transportModEvent); ' +

            '       const entries = document.querySelectorAll(\'select.form-select[required]\')[7]; ' +
            '       entries.value = "19050"; ' +
            '       entries.setAttribute("data-val", JSON.stringify({ value: "19050" })); ' +
            '       entries.setAttribute("data-valid", "true"); ' +

            '       const entriesEvent = new Event("change", { bubbles: true }); ' +
            '       entries.dispatchEvent(entriesEvent); ' +


            //'       document.querySelectorAll(\'select.form-select[required]\')[7].value = "19050"; ' +

            '       startIndex = content.indexOf("PhoneNo[") + 8; ' +
            '       content = content.substring(startIndex); ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(0, endIndex); ' +

            '       const phoneNo = document.querySelectorAll(\'input[placeholder="Mandatory"][required]\')[4]; ' +
            '       phoneNo.value = str; ' +
            '       phoneNo.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       phoneNo.setAttribute("data-valid", "true"); ' +
            '       phoneNo.dispatchEvent(new Event(\'input\', { bubbles: true }));' +

            '       content = content.substring(content.indexOf("SponsorAddress[")); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +

            '       var port_entry = str.toUpperCase(); ' +
            '       if(port_entry.includes("MADINA")) port_entry = "17053"; ' +
            '       else if(port_entry.includes("DAMMAM")) port_entry = "17054"; ' +
            '       else if(port_entry.includes("DAHARAN")) port_entry = "17052"; ' +
            '       else if(port_entry.includes("JEDDA")) port_entry = "17051"; ' +
            '       else port_entry = "17050"; ' +
                            
            '       const portOfEntry = document.querySelectorAll(\'select.form-select[required]\')[5]; ' +
            '       if (portOfEntry) { ' +
            '           portOfEntry.value = port_entry; ' +
            '           portOfEntry.setAttribute("data-val", JSON.stringify({ value: port_entry })); ' +
            '           portOfEntry.setAttribute("data-valid", "true"); ' +

            '           const portOfEntryEvent = new Event("change", { bubbles: true }); ' +
            '           portOfEntry.dispatchEvent(portOfEntryEvent); ' +
            '       } ' +


            '       const homeAddress = document.querySelectorAll(\'input[placeholder="Mandatory"][required]\')[8]; ' +
            '       homeAddress.value = str; ' +
            '       homeAddress.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       homeAddress.setAttribute("data-valid", "true"); ' +
            '       homeAddress.dispatchEvent(new Event(\'input\', { bubbles: true }));' +


            '       const city = document.querySelectorAll(\'input[placeholder="Mandatory"][required]\')[9]; ' +
            '       city.value = str; ' +
            '       city.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       city.setAttribute("data-valid", "true"); ' +
            '       city.dispatchEvent(new Event(\'input\', { bubbles: true }));' +

            '       content = content.substring(content.indexOf("Email[")); ' +
            '       startIndex = content.indexOf("[") + 1; ' +
            '       endIndex = content.indexOf("]"); ' +
            '       str = content.substring(startIndex, endIndex); ' +

            '       const email = document.querySelectorAll(\'input[placeholder="Mandatory"][required]\')[5]; ' +
            '       email.value = str; ' +
            '       email.setAttribute("data-val", JSON.stringify({ value: str })); ' +
            '       email.setAttribute("data-valid", "true"); ' +
            '       email.dispatchEvent(new Event(\'input\', { bubbles: true }));' +
            '   } ' +
            '}   ' +
            /*********************************************** END FINGER PRINT VC-TASHEER **************************************/
            /**************************************************************/
            '     else if(currentUrl.includes("wafid.com/book-appointment")) { ' +
            '           setSelectedOption("#id_country", "ETH");  setSelectedOption("#id_city", "121"); setSelectedOption("#id_traveled_country", "SA");  ' +
            '           var content = await navigator.clipboard.readText(); ' +
            '           content = EncryptDecrypt(content, 18579); ' +
            '           var startIndex = content.indexOf("[") + 1; ' +
            '           var endIndex = content.indexOf("]"); ' +
            '           var str = content.substring(startIndex, endIndex); ' +
            '           var name = str; ' +
            '           content = content.replace("FirstName[" + str + "]", ""); ' +
            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           document.getElementById("id_first_name").value = name + " " + str; ' +
            '           content = content.replace("MiddleName[" + str + "]", ""); ' +
            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           document.getElementById("id_last_name").value = str; ' +
            '           content = content.replace("LastName[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           document.getElementById("id_passport").value = str; ' +
            '           document.getElementById("id_confirm_passport").value = str; ' +
            '           content = content.replace("PassportNo[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("PassportType[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           document.getElementById("id_passport_issue_place").value = str; ' +
            '           content = content.replace("PlaceOfIssue[" + str + "]", ""); ' +
            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            /****************************************************  Issue Date  ***************************************/
            '           const passport_issue = document.getElementById("id_passport_issue_date"); ' +
            '           const issue_calendar = passport_issue.parentElement.querySelector(".popup.calendar");  ' +
            '           var isu_dt = str.substring(8,10) + "/" + str.substring(5,7) + "/" + str.substring(0,4); ' +
            '           const issue_date = new Date(isu_dt);  ' +
            '           passport_issue.value = isu_dt; ' + //issue_date.toISOString().slice(0, 10); ' +
            // Trigger a change event on the input element
            '           const issue_event = new Event("change", { bubbles: true }); ' +
            '           passport_issue.dispatchEvent(issue_event); ' +
            // Set the date value of the calendar to the date value
            '           const issue_activeDate = issue_calendar.querySelector(".today.focus"); ' +
            '           if(issue_activeDate) { ' +
            '               issue_activeDate.classList.remove("focus"); ' +
            '           } ' +
            '           const issue_dateCells = issue_calendar.querySelectorAll(".link:not(.adjacent):not(.disabled)"); ' +
            '           const issue_dateCell = Array.from(issue_dateCells).find(cell => cell.textContent.trim() === String(issue_date.getDate())); ' +
            '           if(issue_dateCell) { issue_dateCell.classList.add("focus");  } ' +
            '           const issueCal_event = new Event("change", { bubbles: true }); ' +
            '           issue_calendar.dispatchEvent(issueCal_event); ' +

        /****************************************************  End Issue Date  ***************************************/
            '           content = content.replace("PasportIssuedDate[" + str + "]", ""); ' +
            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            /****************************************************  Expiry Date  ***************************************/
            '           const passport_expiry = document.getElementById("id_passport_expiry_on"); ' +
            '           const exp_calendar = passport_expiry.parentElement.querySelector(".popup.calendar");  ' +
            '           var exp_dt = str.substring(8,10) + "/" + str.substring(5,7) + "/" + str.substring(0,4); ' +

            '           const exp_date = new Date(exp_dt); ' +
            '           passport_expiry.value = exp_dt; ' +
                        // Trigger a change event on the input element
            '           const exp_event = new Event("change", { bubbles: true }); ' +
            '           passport_expiry.dispatchEvent(exp_event); ' +
                        // Set the date value of the calendar to the date value
            '           const exp_activeDate = exp_calendar.querySelector(".today.focus"); ' +
            '           if(exp_activeDate) { ' +
            '               exp_activeDate.classList.remove("focus"); ' +
            '           } ' +
            '           const exp_dateCells = exp_calendar.querySelectorAll(".link:not(.adjacent):not(.disabled)"); ' +
            '           const exp_dateCell = Array.from(exp_dateCells).find(cell => cell.textContent.trim() === String(exp_date.getDate())); ' +
            '           if(exp_dateCell) { exp_dateCell.classList.add("focus");  } ' + 
            '           const expCal_event = new Event("change", { bubbles: true }); ' +
            '           exp_calendar.dispatchEvent(expCal_event); ' +
            '           content = content.replace("PasportExpiryDate[" + str + "]", ""); ' +
    /****************************************************  End Expiry Date  ***************************************/
            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("PlaceOfBirth[" + str + "]", ""); ' +
            /****************************************************  DOB ***************************************/
            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           const dobw = document.getElementById("id_dob"); ' +
            '           const dob_calendar = dobw.parentElement.querySelector(".popup.calendar");  ' +
            '           var dob_dt = str.substring(8,10) + "/" + str.substring(5,7) + "/" + str.substring(0,4); ' +
            '           const dob_date = new Date(dob_dt); ' +
            '           dobw.value = dob_dt; ' +
            // Trigger a change event on the input element
            '           const dobw_event = new Event("change", { bubbles: true }); ' +
            '           dobw.dispatchEvent(dobw_event); ' +
            // Set the date value of the calendar to the date value
            '           const dob_activeDate = dob_calendar.querySelector(".today.focus"); ' +
            '           if(dob_activeDate) { ' +
            '               dob_activeDate.classList.remove("focus"); ' +
            '           } ' +
            '           const dob_dateCells = dob_calendar.querySelectorAll(".link:not(.adjacent):not(.disabled)"); ' +
            '           const dob_dateCell = Array.from(dob_dateCells).find(cell => cell.textContent.trim() === String(dob_date.getDate())); ' +
            '           if(dob_dateCell) { dob_dateCell.classList.add("focus");  } ' +
            '           const dobCal_event = new Event("change", { bubbles: true }); ' +
            '           dob_calendar.dispatchEvent(dobCal_event); ' +
            '           content = content.replace("DateOfBirth[" + str + "]", ""); ' +
        /****************************************************  End DOB  ***************************************/
            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("CurrentNationality[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("PastNationality[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("Religion[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           var wmaried = "married"; if(str != "Married") wmaried ="unmarried"; ' +
            '           setSelectedOption("#id_marital_status", wmaried); ' +
            '           content = content.replace("MaritalStatus[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           setSelectedOption("#id_gender", str.toLowerCase()); ' +
            '           content = content.replace("Gender[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           var ocpn = ""; if(str.toUpperCase() == "HOUSE MAID") ocpn = "59"; ' +
            '           setSelectedOption("#id_applied_position", ocpn); ' +
            '           content = content.replace("Occupation[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("Qualification[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("SourceOfDegree[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("ExperienceInCountry[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("ExperienceInAbroad[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("HomeAddress[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           var phonw = str; if(str.length > 0 && str.startsWith("09")) phonw = "+251" + str.substring(1); else if(str.length > 0 && str.startsWith("9")) phonw = "+251" + str; ' + 
            '           document.getElementById("id_phone").value = phonw; ' +
            '           content = content.replace("PhoneNo[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("ContactPerson[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("ContactPhone[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("ContactAddress[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("ContactKinship[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("VisaNo[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           var vsaTyp = "wv"; if(str.toUpperCase() == "FAMILY VISIT") vsaTyp = "fv"; setSelectedOption("#id_visa_type", vsaTyp); ' +
            '           content = content.replace("VisaType[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("VisaDate[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("SponsorName[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("SponsorID[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("SponsorAddress[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("SponsorPhone[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("PortOfEntry[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("DateOfBirthHijri[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("IssuedDateHijri[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           content = content.replace("ExpiryDateHijri[" + str + "]", ""); ' +

            '           startIndex = content.indexOf("[") + 1; ' +
            '           endIndex = content.indexOf("]"); ' +
            '           str = content.substring(startIndex, endIndex); ' +
            '           document.getElementById("id_email").value = str; ' +
            '           content = ""; ' +
            '           document.getElementById("id_confirm").checked = true; ' +
            /**/'     } ' +
            /*****************END WAFID************************/
            '     else if(currentUrl.includes("tawtheeq.musaned") || currentUrl.includes("Pool")) { ' +
            '               var content = await navigator.clipboard.readText(); ' +
            '               content = EncryptDecrypt(content, 18579); ' +
            '               var startIndex = content.indexOf("[") + 1; ' +
            '               var endIndex = content.indexOf("]"); ' +
            '               var str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("FirstName[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("MiddleName[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("LastName[" + str + "]", ""); ' +

            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("PassportNo[" + str + "]", ""); ' +

            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("PassportType[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               const inputPOI = document.getElementById("passportIssuePlace");   inputPOI.value = str; inputPOI.dispatchEvent(new Event("input")); ' +
            '               content = content.replace("PlaceOfIssue[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +

            
            '               content = content.replace("PasportIssuedDate[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +

            '               content = content.replace("PasportExpiryDate[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               const inputPOB = document.getElementById("city");   inputPOB.value = str; inputPOB.dispatchEvent(new Event("input")); ' +
            '               content = content.replace("PlaceOfBirth[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +

            '               content = content.replace("DateOfBirth[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("CurrentNationality[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("PastNationality[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               const rlgItems = document.querySelectorAll(".form-check-input"); ' +
            '               var selectedReligion = "MUSLIM"; if(str != "Islam")selectedReligion = "NON_MUSLIM"; ' +
            '               rlgItems.forEach((rlgnItm) => { if(rlgnItm.type == "radio"){  if(rlgnItm.value == selectedReligion){rlgnItm.checked=true; var rlgnevt = document.createEvent("HTMLEvents");  rlgnevt.initEvent("change", true, true); rlgnItm.dispatchEvent(rlgnevt);} }}); ' +

            '               content = content.replace("Religion[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               const marStatusItems = document.querySelectorAll(".form-check-input"); ' +
            '               var selectedMartial = "SINGLE"; if(str == "Married")selectedMartial = "MARRIED"; ' +
            '               marStatusItems.forEach((msItm) => { if(msItm.type == "radio"){  if(msItm.value == selectedMartial){msItm.checked=true; var msevt = document.createEvent("HTMLEvents");  msevt.initEvent("change", true, true); msItm.dispatchEvent(msevt);} }}); ' +

            '               content = content.replace("MaritalStatus[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               const genderItems = document.querySelectorAll(".form-check-input"); ' +
            '               var selectedGndr = "FEMALE"; if(str == "Male")selectedGndr = "MALE"; ' +
            '               genderItems.forEach((sexItm) => { if(sexItm.type == "radio"){  if(sexItm.value == selectedGndr){sexItm.checked=true; var sexevt = document.createEvent("HTMLEvents");  sexevt.initEvent("change", true, true); sexItm.dispatchEvent(sexevt);} }}); ' +

            //  GENDER
            '               content = content.replace("Gender[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("Occupation[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            //'               const li_Items = document.querySelectorAll(".p-autocomplete-multiple-container"); alert(li_Items[1].selectedIndex); ' +
            //'               li_Items.forEach((liItm) => {liItm.value = 1;  }); ' +
            //'               for (let i = 0; i < li_Items.length; i++) { alert("li len = " + li_Items.name); li_Items[i].value = 1; var liqulevt = document.createEvent("HTMLEvents");  liqulevt.initEvent("change", true, true); li_Items[i].dispatchEvent(liqulevt); } ' +

            //'               const qualifItems = document.querySelectorAll(".ng-tns-c46-2"); ' +
            //'               for (let i = 0; i < qualifItems.length; i++) { if(qualifItems[i].placeholder == "Please select"){ qualifItems[i].value = "Master"; var qulevt = document.createEvent("HTMLEvents");  qulevt.initEvent("change", true, true); qualifItems[i].dispatchEvent(qulevt);} } ' +
            //'               qualifItems.forEach((qalItm) => { if(qalItm.placeholder == "Please select"){ qalItm.value = "Master"; var qulevt = document.createEvent("HTMLEvents");  qulevt.initEvent("change", true, true); qalItm.dispatchEvent(qulevt);} }); ' +

            //'               const jobItems = document.querySelectorAll(".ng-tns-c46-4"); ' +
            //'               jobItems.forEach((jobItm) => { if(jobItm.placeholder == "Occupation"){  jobItm.value = "House Maid";  var jobevt = document.createEvent("HTMLEvents");  jobevt.initEvent("change", true, true); jobItm.dispatchEvent(jobevt);}}); ' +

            '               content = content.replace("Qualification[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("SourceOfDegree[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               const inputExpLocl = document.getElementById("yearsOfExperienceInCountry");   inputExpLocl.value = str; inputExpLocl.dispatchEvent(new Event("input")); ' +
            '               content = content.replace("ExperienceInCountry[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               const inputExpAbroad = document.getElementById("yearsOfExperienceAbroad");   inputExpAbroad.value = str; inputExpAbroad.dispatchEvent(new Event("input")); ' +
            '               content = content.replace("ExperienceInAbroad[" + str + "]", ""); ' +

            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               const inputAddress = document.getElementById("address");   inputAddress.value = str; inputAddress.dispatchEvent(new Event("input")); ' +
            '               content = content.replace("HomeAddress[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               const inputMob = document.getElementById("mobileNumber");   inputMob.value = str.replace("+251", "0"); inputMob.dispatchEvent(new Event("input")); ' +
            '               content = content.replace("PhoneNo[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               const inputRelName = document.getElementById("relativeContactName");   inputRelName.value = str; inputRelName.dispatchEvent(new Event("input")); ' +
            '               content = content.replace("ContactPerson[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               const inputRelPhone = document.getElementById("relativeContactPhone");   inputRelPhone.value = str.replace("+251", "0"); inputRelPhone.dispatchEvent(new Event("input")); ' +
            '               content = content.replace("ContactPhone[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               const inputRelAddress = document.getElementById("relativeContactAddress");   inputRelAddress.value = str; inputRelAddress.dispatchEvent(new Event("input")); ' +
            '               content = content.replace("ContactAddress[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               const inputRelKin = document.getElementById("relativeContactKinship");   inputRelKin.value = str; inputRelKin.dispatchEvent(new Event("input")); ' +
            '               content = content.replace("ContactKinship[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("VisaNo[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("VisaType[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("VisaDate[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("SponsorName[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("SponsorID[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("SponsorAddress[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("SponsorPhone[" + str + "]", ""); ' +
            '               startIndex = content.indexOf("[") + 1; ' +
            '               endIndex = content.indexOf("]"); ' +
            '               str = content.substring(startIndex, endIndex); ' +
            '               content = content.replace("PortOfEntry[" + str + "]", "");  ' +
            '               const inputConfirm = document.getElementById("confirmCheck");   inputConfirm.checked = true; var confirmevt = document.createEvent("HTMLEvents");  confirmevt.initEvent("change", true, true); inputConfirm.dispatchEvent(confirmevt); ' +
        /*********************************************************/
            //'   const inputElement = document.querySelector(\'div.qualifications-container input[formcontrolname="qualifications"]\'); ' +
            '   const jobContainer = document.querySelector(\'p-autocomplete[data-cy= "occupation"]\'); ' +
            //'   const dropdownJob = jobContainer.querySelector("ul"); if(dropdownJob != null) alert("job combo found"); ' +
            '   const inputJob = jobContainer.querySelector("input"); ' +
            '   inputJob.value = "House Maid"; ' +
                // Get the dropdown element


// 2. Add an event listener to detect when the dropdown is shown
            '   inputJob.addEventListener("click", function () { ' +
            '   const job_items = inputJob.parentElement.querySelector("p-autocomplete");  ' +

            // 4. Loop through the list items to access their values or text content
            '   job_items.forEach(function (item) { ' +
            '    console.log(item.getAttribute("value")); ' +
            '    console.log(item.textContent); ' +
            '   }); ' +
            ' }); ' +
                        

            '   const qualifContainer = document.querySelector(\'div[data-cy= "qualification"]\'); ' +
            '   const dropdownQual = qualifContainer.querySelector("ul"); ' +
            '   const inputQual = qualifContainer.querySelector("input"); ' +
            //'   inputQual.value = "Master";' +
            // Get the dropdown element

            '   const listItems = dropdownQual.querySelectorAll("li"); ' +
            '   for(let i = 0; i<listItems.length; i++) {  ' +
            '        listItems[i].addEventListener("click", function () { ' +
            //'        Cons("You clicked on item " + (i + 1)); ' +
            '   }); }  ' +              
            
            '     } ' +
            
            /*END MUSANED*/
            '     } catch (err) { ' + '     console.error("Failed to read clipboard contents: ", err); ' + '  } ' + ' } ' +
            '  function setSelectedOption(control, valu) { ' + '    var selections = document.querySelector(control); ' + '    selections.value = valu; ' + '    var evt = document.createEvent("HTMLEvents"); ' + '    evt.initEvent("change", true, true); ' + '    selections.dispatchEvent(evt); ' + '    } ' +
            '  function setJobType(jobType) { ' + ' var jobValue = -1; ' + ' switch (jobType.toUpperCase()) { ' + '     case "DRIVER": ' + '    jobValue = 2; jobType = "Driver"; ' + '    break; ' + '     case "HOUSE WORKER": ' + '    jobValue = 3; jobType = "House Worker"; ' + '    break; ' + '     case "MALE COOKER": ' +
            '    jobValue = 4; jobType = "Male Cooker"; ' + '    break; ' + '     case "NANNY": ' + '    jobValue = 6; jobType = "Nanny";' + '    break; ' + '     case "FEMALE NURSE": ' + '    jobValue = 7; jobType = "Female Nurse"; ' + '    break; ' + '     case "HOUSE MAID": ' + '    jobValue = 8; jobType = "House Maid"; ' + '    break; ' + '     case "MALE NURSE": ' + '    jobValue = 9; jobType = "Male Nurse"; ' + '    break; ' + '     case "FARM WORKER": ' + '    jobValue = 10; jobType = "Farm Worker"; ' + '    break; ' + '     case "COOK / WAITER": ' + '    jobValue = 11; jobType = "Cook / Waiter"; ' + '    break; ' +
            '     case "COOK": ' + '    jobValue = 11; jobType = "Cook / Waiter"; ' + '    break; ' + '     case "WAITER": ' + '    jobValue = 11; jobType = "Cook / Waiter"; ' + '    break; ' + '     case "FEMALE COOKER": ' + '    jobValue = 12; jobType = "Female Cooker"; ' + '    break; ' + '     case "MALE PHYSIOTHERAPIST": ' + '    jobValue = 14; jobType = "Male Physiotherapist"; ' + '    break; ' + '     case "FEMALE PHYSIOTHERAPIST": ' + '    jobValue = 18; jobType = "Female Physiotherapist"; ' + '    break; ' + ' } ' + '    var jobOpt = document.getElementById("job_id"); ' + '    var flag = false; ' +
            '    for(i=0; i < jobOpt.options.length; i++) ' + '	       if(jobOpt[i].value == jobValue) flag = true; ' + '    if(flag == false && jobValue != -1) ' + '   jobOpt.options[jobOpt.options.length] = new Option(jobType, jobValue); ' + '    jobOpt.value = jobValue; ' + '    } ' + '    function decryptContent(text) { ' + '  var result = ""; ' + '  for (var i = 0; i < text.length; i++) ' + '     result = result + String.fromCharCode(text[i].charCodeAt(0)-255); ' + '   return result; ' + '     } ' + '    function EncryptDecrypt(szPlainText, szEncryptionKey) { ' + '    var szOutStringBuild = ""; ' + '    var Textch; ' + '    for (var iCount = 0; iCount < szPlainText.length; iCount = (iCount + 1) | 0) { ' + '        Textch = szPlainText.charCodeAt(iCount); ' +
            '        Textch = (Textch ^ szEncryptionKey) & 65535; ' + '        szOutStringBuild = (szOutStringBuild || "") + String.fromCharCode(Textch); ' + '     } ' + '    return szOutStringBuild; ' + '  } ' + '   function ConvertToUnicode(text) { ' + ' var result = ""; ' + ' for (var i = 0; i < text.length; i++) ' + '     result = result + text.charCodeAt(i) + "-"; ' + ' if (result.length > 0) ' +
            ' result = result + "*"; ' + ' return result; ' + '   } ' + '   function ContainsUnicode(text) { ' + ' for (var i = 0; i < text.length; i++) ' + '     if (text.charCodeAt(i) > 255) ' + '     return 1; ' + ' return 0; ' + '    } '
    });
});
