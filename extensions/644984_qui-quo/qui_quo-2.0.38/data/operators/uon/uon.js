window.crmTutorial  = "https://quiquo.freshdesk.com/support/solutions/articles/35000060193";
window.crmName  = "U-ON";
window.TIMEOUT = 1000; //msec
function injectClickHandler() {
	try {
		var injected = false;
		var btn = document.querySelector(".qq-quote-details");
		if ( btn ) {
			var ver = btn.getAttribute("qq-version-mark");
			if ( !ver || ver !== checkVersionKey ) {
			    btn.addEventListener("click", function() {
			    	if ( btn.dataset && btn.dataset.exist === '1' ) {
				    	console.log("copied quoteDetails");
				    	sendMessageToAddon("copy quote details from uon",  btn.dataset.quoteDetails);
			    	} else {
				    	console.log("uon quoteData is empty");
				    	sendMessageToAddon("empty quote details in uon");
			    	}
			    });
			    console.log("injected copy quote details btn handler");
				btn.setAttribute("qq-version-mark", checkVersionKey);
				btn.removeAttribute("data-no-integration");
				injected = true;
			}
		}
		if ( !injected ) {
			window.setTimeout(injectClickHandler, TIMEOUT);
		}
	} catch ( e ) {
		logError("failed to inject", e);
	}
}

injectClickHandler();

function showQuickReservationBtn() {
    const btn = document.querySelector(".quick-reservation");
        if (btn) {
            btn.onclick = copyOrderData;
            if ( !btn.classList.contains("qq-installed") ) {
            	btn.classList.add("qq-installed");
            }
        }
    window.setTimeout(showQuickReservationBtn, TIMEOUT);
}

async function isQuickReservationActive() {
    const initParams = await sendMessageToAddon("get init params");
    if ( initParams?.isQuickReservationActive ) {
        window.setTimeout(showQuickReservationBtn, TIMEOUT);
    }
}

isQuickReservationActive();

function copyOrderData() {
    try {
        const bookingData = sessionStorage.getItem('bookingData');
        if (bookingData && typeof  bookingData === 'string') {
            const {booking} = JSON.parse(bookingData.replace(/\s+/g, ' '));
            const {client, tourists, general, hotel, flights} = booking;
            return saveOrderData(client, tourists, general || {}, hotel || {}, flights || {});
        }
        copyOrderDataOld(this);
    } catch (e) {
        copyOrderDataOld(this);
        logError("failed to process copyOrderData function", e, null);
    }
}

function copyOrderDataOld(btn) {
    try {
        if ( !btn.dataset.client && !btn.dataset.client) {
            return;
        }
        const client = JSON.parse(btn.dataset.client);
        const passengers = JSON.parse(btn.dataset.tourists|| btn.dataset.passengers);
        if (client || passengers) {
            return saveOrderData(client, passengers);
        }
    } catch (e) {
        logError("failed to process copyOrderData function", e, null);
        sendMessageToAddon("showerrorpage");
    }
}

function saveOrderData(client, passengers, general = {}, hotel = {}, flights = {}) {
    try {
        const orderData = {
            client: createPassenger(client, general, hotel, flights),
            passengers: (passengers || []).map((passenger) => {
                return createPassenger(passenger, general, hotel, flights);
            }),
            time: new Date().getTime(),
            crmName: window.crmName || window.OPERATOR_NAME || "CRM",
            crmTutorial: window.crmTutorial || "https://quiquo.freshdesk.com/support/solutions/articles/35000060193",
        };
        sendMessageToAddon("copy order data", orderData);
    } catch (e) {
        logError("failed to process copyOrderData function", e, null);
        sendMessageToAddon("showerrorpage");
    }
}

function createPassenger(obj, general, hotel, flights) {
    if ( !obj ) {
        obj = {};
    }
    return {
        crmId: obj.id,
        address: new Value(obj.address, "Адрес"),
        addressLiving: new Value(obj.address_living || obj.addressLiving, "Адрес фактического проживания"),
        birthday: new Value(parseDate(obj.birthday), "Дата рождения"),
        birthdayPlace: new Value(obj.birthday_place || obj.birthdayPlace, "Место рождения"),
        nationality: new Value(mapCountriesRus(obj.passport_russia || obj.nationality), "Гражданство"),
        nationalityEng: new Value(mapCountriesEng(obj.passport_russia || obj.nationalityEng), "Гражданство"),
        email: new Value(obj.email, "Электронная почта"),

        name: new Value(obj.name, "Имя"),
        nationalPassport: obj.nationalPassport ? {
            authority: new Value(obj.nationalPassport.authority, "Кем выдан паспорт"),
            authorityCode: new Value(obj.nationalPassport.authorityCode, "Код организации"),
            issueDate: new Value(parseDate(obj.nationalPassport.issueDate), "Дата выдачи паспорта"),
            number: new Value(obj.nationalPassport.number, "Номер паспорта"),
            serial: new Value(obj.nationalPassport.serial, "Серия паспорта"),
            name: new Value(obj.name, "Имя"),
            surname: new Value(obj.surname, "Фамилия"),
            secondName: new Value(obj.sname || obj.secondName, "Отчество")
        } : parseNationalPassport(obj),
        phones: parsePhones(obj),
        sex: new Value(mapSex(obj.sex), "Пол"),
        secondName: new Value(obj.sname || obj.secondName, "Отчество"),
        surname: new Value(obj.surname, "Фамилия"),
        title: new Value(mapTitle(obj.kind || obj.title), "Обращение"),
        internationalPassport: obj.internationalPassport ? {
            authority: new Value(obj.internationalPassport.authority, "Кем выдан паспорт"),
            authorityCode: new Value(null, "Код организации"),
            issueDate: new Value(parseDate(obj.internationalPassport.issueDate), "Дата выдачи паспорта"),
            number: new Value(obj.internationalPassport.number, "Номер паспорта"),
            serial: new Value(obj.internationalPassport.serial, "Серия паспорта"),
            expire: new Value(parseDate(obj.internationalPassport.expire), "Срок действия"),
            name: new Value(obj.internationalPassport.name, "Имя"),
            surname: new Value(obj.internationalPassport.surname, "Фамилия"),
            secondName: new Value(obj.internationalPassport.secondName, "Отчество")
        } : parseInternationalPassport(obj),
        birthdayCertificate:  parseBirthdayCertificate(obj),
        inn: new Value(obj.inn, "ИНН"),
        tourStartDate : new Value(parseDate(obj.tourStartDate), "Дата начала тура"),
        tourEndDate: new Value(parseDate(obj.tourEndDate), "Дата конца тура"),
        entryFormData: {
            originalPhones: parsePhones(obj, 'original_'),
            emailOriginal: new Value(obj.original_email, "Электронная почта"),
            aviaCompany: new Value(obj.avia_company, "Авиакомпания"),
            aviaFlightNumber: new Value(obj.avia_flight_number, "Номер рейса"),
        },
        general: {
            cityFrom: new Value(general.cityFrom, "Город вылета"),
            dateEnd: new Value(parseDate(general.dateEnd), "Дата окончания тура"),
            dateStart: new Value(parseDate(general.dateStart), "Дата начала тура"),
            nights: new Value(general.nights, "Количество ночей"),
            operator: new Value(general.operator, "Оператор"),
        },
        hotel: {
            accommodation: new Value(hotel.accommodation || hotel.accomodation, "Размещение"),
            boardType: new Value(hotel.boardType, "Питание"),
            hotelName: new Value(hotel.hotelName, "Имя отеля"),
            country: new Value(hotel.country, "Страна"),
            dateStart: new Value(parseDate(hotel.dateStart), "Дата заезда"),
            dateEnd: new Value(parseDate(hotel.dateStart && hotel.nights ? addDaysToStringDate(hotel.dateStart, hotel.nights) : null), "Дата выезда"),
            nights: new Value(hotel.nights, "Ночей в отеле"),
            region: new Value(hotel.region, "Регион"),
            roomType: new Value(hotel.roomType, "Тип номера"),
        },
        flights: new Value(parseFlights(flights), 'Перелет')

    };
}

function parseFlights(flights) {
    if ( !Array.isArray(flights) ) {
        return flights;
    }
    return (flights || []).map(fl => {
        for (let key of Object.keys(fl)) {
            if (!fl[key]) {
                fl[key] = '';
            }
        }
        return fl;
    })
}

function Value(data, caption) {
    data = data ? data : "";
    this.value = data;
    this.caption = caption;
}

function parseDate(date) {
    if ( !date || date.toString() === 'Invalid Date' ) {
        return null;
    }
    var GOSTDate = typeof date === "string" ? date.match(/(\d{2})\.(\d{2})\.(\d{4})/) : null;
    if ( GOSTDate ) {
        return {
            day: GOSTDate[1],
            month: GOSTDate[2],
            year: GOSTDate[3]
        };
    }
    var iSOdate = typeof date === "string" ? date.match(/(\d{4})-(\d{2})-(\d{2})/) : null;
    if ( iSOdate ) {
        return {
            day: iSOdate[3],
            month: iSOdate[2],
            year: iSOdate[1]
        };
    }

    if ( Object.prototype.toString.call(date) !== '[object Date]' ) {
        return null;
    }
    return {
        day: date.getDate().toString().padStart(2, "0"),
        month: (date.getMonth() + 1).toString().padStart(2, "0"),
        year: date.getFullYear().toString()
    };
}

function parseBirthdayCertificate(obj) {
    if ( !obj.birthday_certificate && (!obj.birthdayCertificate || Object.keys(obj.birthdayCertificate).length > 0) ) {
        return {};
    }
    const birthCert = {
        number: new Value(obj.birthday_certificate || obj.birthdayCertificate.number || obj.birthdayCertificate, "Номер свидетельства о рождении"),
        issueDate: new Value(parseDate(obj.birthday_certificate_given || (obj.birthdayCertificate || {}).issueDate), "Дата выдачи свидетельства о рождении"),
        authority: new Value(obj.birthday_certificate_organization || (obj.birthdayCertificate || {}).authority, "Кем выдано свидетельство о рождении"),
        authorityCode: new Value('', "Код"),
        docType: "birthday_certificate"
    };
    if ( !birthCert.number.value && !birthCert.issueDate.value && !birthCert.authority.value ) {
        return {};
    }
    return birthCert;
}

function parsePassportNumber(passportNumber="", international) {
	passportNumber = passportNumber.replace(/\s+/g, "");

	if ( !passportNumber ) {
		return {
		    serial: new Value("", "Серия паспорта"),
	        number: new Value("", "Номер паспорта"),
		};
	}

	// Республика Казахстан
	var kz = passportNumber.match(/^([A-Za-z])(\d\d\d\d\d\d\d\d?)$/);
	if ( kz ) {
		return {
		    serial: new Value('KAZ', "Серия паспорта"),
	        number: new Value('N'+kz[2], "Номер паспорта"),
            docType : "other_passport"                   //Чтобы выбирать тип документы
		};
	}

	// РФ
	var serialOffset = international ? 2 : 4;
	return {
	    serial: new Value(passportNumber.slice(0, serialOffset), "Серия паспорта"),
        number: new Value(passportNumber.slice(serialOffset), "Номер паспорта"),
        docType : "passport"
	};
}

function parseNationalPassport(obj) {

	var pn = parsePassportNumber(obj.passport_number, false);

    var passport = {
        issueDate: obj.passport_date ? new Value(parseDate(new Date(obj.passport_date)), "Дата выдачи паспорта") : new Value(parseDate(""), "Дата выдачи паспорта"),
        serial: pn.serial,
        number: pn.number,
        expire: new Value(parseDate(""), "Срок действия паспорта"),
        authority: new Value(obj.passport_taken, "Кем выдан паспорт"),
        authorityCode: new Value(obj.passport_code, "Код организации"),
        docType: pn.docType ? pn.docType : "passport",
        name: new Value(obj.name, "Имя"),
        surname: new Value(obj.surname, "Фамилия"),
        secondName: new Value(obj.sname || obj.secondName, "Отчество")
    };
    return passport;
}

function parsePhones(obj, prefix = '') {
	return {
		main : new Value(obj.phones ? obj.phones.main : obj[`${prefix}phone`],  "Номер телефона"),
		home : new Value(obj.phones ? obj.phones.home : obj[`${prefix}phone_home`] , "Домашний номер"),
		mobile : new Value(obj.phones ? obj.phones.mobile: obj[`${prefix}phone_mobile`], "Мобильный телефон")
	};
}

function parseInternationalPassport(obj) {
	var pn = parsePassportNumber(obj.zagran_number, true);

    return {
        name : new Value(obj.name_en, "Имя"),
        surname : new Value(obj.surname_en, "Фамилия"),
        expire: obj.zagran_expire ? new Value(parseDate(new Date(obj.zagran_expire)), "Срок действия паспорта") :  new Value(parseDate(""), "Срок действия паспорта") ,
        serial: pn.serial,
        number: pn.number,
        issueDate: obj.zagran_given ? new Value(parseDate(new Date(obj.zagran_given)), "Дата выдачи паспорта") :   new Value(parseDate(""), "Дата выдачи паспорта"),
        authority: new Value(obj.zagran_organization, "Кем выдан паспорт"),
        authorityCode: new Value(null, "Кем выдан паспорт"),
        secondName: new Value(null, "Отчество"),
        docType: "passport"
    };
}

function mapCountriesRus(country) {
    if ( !country ) {
        return "";
    }
    switch (country.trim()) {
        case    "США": return "США, Соединенные Штаты";
    }
    return country;
}

function mapTitle(index) {
    switch(index) {
        case "1" : return "Mr";
        case "2" : return "Mrs";
        case "3" : return "Miss";
        case "4" : return "Child";
        case "5" : return "Infant";
        default  : return null;
    }
}

function mapCountriesEng(country) {
    if ( !country ) {
        return "";
    }
    switch (country.trim()) {
		case    "Абхазия": return "Abkhazia";
		case    "Австралия": return "Australia";
		case    "Австрия": return "Austria";
		case    "Азербайджан": return "Azerbaijan";
		case    "Албания": return "Albania";
		case    "Ангилья": return "Anguilla";
        case    "Андорра": return "Andorra";
        case    "Антарктида": return "Antarctica";
        case    "Антигуа": return "Antigua";
        case    "Аргентина": return "Argentina";
        case    "Армения": return "Armenia";
        case    "Аруба": return "Aruba";
        case    "Багамы": return "Bahamas";
        case    "Бангладеш": return "Bangladesh";
        case    "Барбадос": return  "Barbados";
        case    "Бахрейн": return  "Bahrain";
        case    "Беларусь": return  "Belarus";
        case    "Белиз": return  "Belize";
        case    "Бельгия": return  "Belgium";
        case    "Бермудские острова": return  "Bermuda Islands";
        case    "Болгария": return  "Bulgaria";
        case    "Боливия": return  "Bolivia";
        case    "Босния и Герцеговина": return  "Bosnia and Herzegovina";
        case    "Ботсвана": return  "Botswana";
        case    "Бразилия": return  "Brazil";
        case    "Бруней": return  "Brunei";
        case    "Буркина-Фасо": return  "Burkina Faso";
        case    "Бурунди": return  "Burundi";
        case    "Бутан": return  "Butane";
        case    "Великобритания": return  "Great Britain, United Kingdom";
        case    "Венгрия": return  "Hungary";
        case    "Венесуэла": return  "Venezuela";
        case    "Вьетнам": return  "Viet Nam";
        case    "Гана": return  "Ghana";
        case    "Гваделупа": return  "Guadeloupe";
        case    "Гватемала": return  "Guatemala";
        case    "Германия": return  "Germany";
        case    "Гондурас": return  "Honduras";
        case    "Гонконг": return  "Hong Kong";
        case    "Гренада": return  "Grenada";
        case    "Гренландия": return  "Greenland";
        case    "Греция": return  "Greece";
        case    "Грузия": return  "Georgia";
        case    "Дания": return  "Denmark";
        case    "Джибути": return  "Djibouti";
        case    "Доминика": return  "Dominica";
        case    "Доминикана": return  "Dominican Republic";
        case    "Египет": return "Egypt";
        case    "Замбия": return  "Zambia";
        case    "Зимбабве": return  "Zimbabwe";
        case    "Израиль": return  "Israel";
        case    "Индия": return  "India";
        case    "Индонезия": return  "Indonesia";
        case    "Иордания": return  "Jordan";
        case    "Иран": return  "Iran";
        case    "Ирландия": return  "Ireland";
        case    "Исландия": return  "Iceland";
        case    "Испания": return  "Spain";
        case    "Италия": return  "Italy";
        case    "Кабо-Верде": return  "Cape Verde";
        case    "Казахстан": return  "Kazakhstan";
        case    "Камбоджа": return  "Cambodia";
        case    "Камерун": return  "Cameroon";
        case    "Канада": return  "Canada";
        case    "Катар": return  "Qatar";
        case    "Кения": return  "Kenya";
        case    "Кипр": return  "Cyprus";
        case    "Китай": return  "China";
        case    "Колумбия": return  "Colombia";
        case    "Коста-Рика": return  "Costa Rica";
        case    "Куба": return  "Cuba";
        case    "Кыргызcтан": return  "Kyrgyzstan";
        case    "Лаос": return  "Lao P.D.R";
        case    "Латвия": return  "Latvia";
        case    "Ливан": return  "Lebanon";
        case    "Литва": return  "Lithuania";
        case    "Лихтенштейн": return  "Liechtenstein";
        case    "Люксембург": return  "Luxembourg";
        case    "Маврикий": return  "Mauritius";
        case    "Мадагаскар": return  "Madagascar";
        case    "Македония": return  "Macedonia";
        case    "Малайзия": return  "Malaysia";
        case    "Мальдивы": return  "Maldives";
        case    "Мальта": return  "Malta";
        case    "Марианские о-ва": return  "Mariana Islands";
        case    "Марокко": return  "Morocco";
        case    "Мартиника": return  "Martinique";
        case    "Мексика": return  "Mexico";
        case    "Мозамбик": return  "Mozambique";
        case    "Молдавия": return  "Moldova";
        case    "Монако": return  "Monaco";
        case    "Мьянма (Бирма)": return  "Myanmar";
        case    "Намибия": return  "Namibia";
        case    "Непал": return  "Nepal";
        case    "Нигерия": return  "Nigeria";
        case    "Нидерланды": return  "Netherlands";
        case    "Никарагуа": return  "Nicaragua";
        case    "Новая Зеландия": return  "New Zealand";
        case    "Норвегия": return  "Norway";
        case    "о. Кука": return  "Cook Islands";
        case    "ОАЭ": return  "United Arab Emirates";
        case    "Оман": return  "Oman";
        case    "Пакистан": return  "Pakistan";
        case    "Палау": return  "Palauan";
        case    "Панама": return  "Panama";
        case    "Папуа Новая Гвинея": return  "Papua New Guinea";
        case    "Парагвай": return  "Paraguay";
        case    "Перу": return  "Peru";
        case    "Польша": return  "Poland";
        case    "Португалия": return  "Portugal";
        case    "Реюньон": return  "Réunion";
        case    "Россия": return  "Russia";
        case    "Румыния": return  "Romania";
        case    "Сан-Марино": return  "San Marino";
        case    "Саудовская Аравия": return  "Saudi Arabia";
        case    "Свазиленд": return  "Kingdom of Swaziland";
        case    "Сейшелы": return  "Republic of Seychelles";
        case    "Сен-Бартелеми": return  "Saint Barthélemy";
        case    "Сен-Мартен": return  "Saint-Martin";
        case    "Сенегал": return  "Senegal";
        case    "Сент-Винсент и Гренадины": return  "Saint Vincent and the Grenadines";
        case    "Сент-Китс и Невис": return  "Saint Kitts and Nevis";
        case    "Сент-Люсия": return  "Saint Lucia";
        case    "Сербия": return  "Serbia";
        case    "Сингапур": return  "Singapore";
        case    "Сирия": return  "Syrian Arab Republic";
        case    "Словакия": return  "Slovakia";
        case    "Словения": return  "Slovenia";
        case    "США": return  "USA, United States Of America";
        case    "Таджикистан": return  "Tajikistan";
        case    "Таиланд": return  "Thailand";
        case    "Тайвань": return  "Taiwan";
        case    "Танзания": return  "Tanzania";
        case    "Теркс и Кайкос": return  "Turks and Caicos Islands";
        case    "Того": return  "Togo";
        case    "Тунис": return  "Tunisia";
        case    "Туркменистан": return  "Turkmenistan";
        case    "Турция": return  "Turkey";
        case    "Уганда": return  "Uganda";
        case    "Узбекистан": return  "Uzbekistan";
        case    "Украина": return  "Ukraine";
        case    "Ukrainian": return "Ukraine";
        case    "Уругвай": return  "Uruguay";
        case    "Фиджи": return  "Fiji";
        case    "Филиппины": return  "Philippines";
        case    "Финляндия": return  "Finland";
        case    "Франция": return  "France";
        case    "Французская Полинезия": return  "French polynesia";
        case    "Хорватия": return  "Croatia";
        case    "ЦАР": return  "Republique Centrafricaine";
        case    "Черногория": return  "Montenegro";
        case    "Чехия": return  "Czech Republic";
        case    "Чили": return  "Chile";
        case    "Швейцария": return  "Switzerland";
        case    "Швеция": return  "Sweden";
        case    "Шри-Ланка": return  "Sri Lanka";
        case    "Эквадор": return  "Ecuador";
        case    "Эритрея": return  "Eritrea";
        case    "Эстония": return  "Estonia";
        case    "Эфиопия": return  "Ethiopia";
        case    "ЮАР": return  "South Africa";
        case    "Южная Корея": return  "Korea";
        case    "Ямайка": return  "Jamaica";
        case    "Япония": return  "Japan";
    }
    return country;
}

function logError(msg, e, dataset) {
    var data = {
        title: msg,
        url: document.location.href,
        passengers : dataset ? dataset : ""
    };

    if ( e !== null ) {
        if ( e.stack !== null )
            data.stack = e.stack;
        if ( e.message !== null )
            data.title = data.title + " - " + e.message;
    }
    sendMessageToAddon("error", data);
}

function mapSex(sex) {
    if ( !sex ) {
        return null;
    }
    switch (sex.toUpperCase()) {
        case "MALE" :
            return "1";
        case "FEMALE" :
            return "2";
        case "MAN" :
            return "1";
        case "WOMAN" :
            return "2";
        default  :
            return sex;
    }
}
