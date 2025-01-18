var OPERATOR_NAME = "sletat.ru";
var OPERATOR_SLETAT_ID = -1;

//-------- Search Criteria ---------------------------

var SLETAT_TO_CODES =
    [[107,"ДАНКО Трэвел Компани"],[108,"Дельта"],[112,"Express Tours"],[113,"Grand"],[123,"ITM Group"],[125,"Пакс"],[131,"Арт-Тревел"],
     [14,"PAC GROUP"],[141,"Юго Стар"],[142,"More Travel"],[152,"Меридиан-экспресс"],[158,"SOLVEX"],[160,"DSBW"],[162,"China Travel"],
     [165,"De Visu"],[171,"Amigo S"],[174,"Каприкон"],[182,"Питертур"],[184,"Интерюнион"],[19,"Anex"],[191,"SANAT TOUR"],[194,"Kompas (KZ)"],
     [199,"Evroport"],[20,"ICS Travel Group"],[205,"Amigo Tours"],[206,"TPG (Travel Professional Group)"],[212,"Voyage Service"],
     [213,"Mouzenidis Travel"],[214,"Меркурий"],[218,"KazTour (KZ)"],[229,"TUI"],[237,"ДВМ-Тур"],[238,"Русь-Тур"],[240,"Meteors Travel"],
     [246,"Глобус Тур"],[248,"Avrora-BG"],[252,"Алеан"],[255,"Pegas Touristik (UA)"],[257,"Join UP! (UA)"],[259,"Elite Travel"],[260,"Кандагар"],
     [262,"ДАНКО Трэвел Компани (BY)"],[269,"Natalie Tours"],[277,"Время-тур"],[278,"Карлсон Туризм"],[280,"GTV"],[293,"АэроБелСервис"],[294,"Топ Тур"],
     [296,"ВОЯЖТУР"],[3,"Pegas Touristik"],[301,"Robinson Tours"],[302,"Премьера"],[304,"Good Time Travel"],[306,"Ривьера Сочи"],[309,"Иволга"],
     [311,"Матрёшка-Тур"],[313,"CALYPSO TOUR"],[315,"Beleon Tours"],[317,"Pegas Touristik (KZ)"],[323,"PROTOUR (KZ)"],[331,"ACTI tour Russia"],
     [335,"SMOK TRAVEL (BY)"],[340,"TOUR A VENT"],[343,"Планета Travel"],[344,"Пантеон Тревел"],[345,"Ванд"],[348,"PlanTravel LetsFly"],[350,"TUI (UA)"],
     [355,"КРИПТОН"],[361,"Спейс Тревел"],[363,"Raduga Travel"],[369,"Voyager Group"],[370,"Balkan Intour (BY)"],[373,"Согдиана"],[375,"Аэротрэвел"],
     [376,"SvoyHotel"],[377,"Mona Tours"],[378,"Жемчужная река"],[379,"Calypso-M-Tour"],[38,"Русский Экспресс"],[380,"ТUI"],[381,"Solemare"],
     [382,"Selfie Travel (KZ)"],[383,"РОСЮГКУРОРТ"],[384,"Anex (UA)"],[39,"Diamond Tours"],[4,"TEZ TOUR"],[49,"Vilar Tours"],[51,"Ambotis Holidays"],
     [54,"Sunmar"],[55,"Фонд Мира"],[6,"Coral Travel"],[7,"Biblio Globus"],[78,"UNEX"],[81,"Спектрум"],[83,"АРТ-ТУР"],[87,"ВЕДИ ТУРГРУПП"],[9,"Интурист"]];

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

// --------- Rows ---------------------------------

function getCountry() {
    var span = document.querySelector("#ht_country_list li.sel span");
    if ( span ) {
        return trim(span.textContent);
    }
    setTimeout(function() {
        var data = document.querySelector("#ht_country_list");
        if ( !data ) {
            data = document.querySelector("#ht_maintable")
        }
        logError("NO COUNTRY SPAN", null, data ? data.innerHTML : "");           
    }, 10);
    return "";
}

function getCity(descrDivs) {
    var match = getDataFromDivs(descrDivs, /ВЫЛЕТ\s*ИЗ:\s*(.*)/i);
    return match ? trim(match[1]) : "";
}

function getDataFromDivs(divs, regex) {
    for ( var i = 0; i < divs.length; ++i ) {
        if ( regex.test(divs[i].textContent) ) {
            return divs[i].textContent.match(regex);
        }
    }
}

function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch (c) {
        case "P.": return "RUB";
    }

    return c;
}

function extractDate(descrDivs) {
    var match = getDataFromDivs(descrDivs, /\d\d\.\d\d\.\d{4}/);
    return match ? match[0] : "";
}

function extractHotelName(td) {
    var name = td.querySelector(".hh_hotel");
    var stars = td.querySelectorAll("div.hh_stars img[src$='ht_fs.png']");
    return name ? name.textContent + " " + stars.length + "*" : "";
}

function extractHotelUrl(td) {
    var a = td.querySelector("a.hh_hotel");
    return a ? a.href : "";
}

function extractRegion(td) {
    var region = td.querySelector(".hh_resort");
    return region ? trim(region.textContent.replace(/,/g, "")) : "";
}

function extractRoomType(descrDivs) {
    var match = getDataFromDivs(descrDivs, /ПРОЖИВАНИЕ\s*([^,]*)/i);
    return match ? match[1] : "";
}

function extractPrice(a) {
    return extractIntFromStr(a.textContent.replace(/[^\d]/g, ""));
}

function extractOperatorSletatId(a) {
	return parseInt(getParameterByName("sourceId", a.href));
}

function extractCurrency(a) {
    return mapCurrency(a.textContent.replace(/[\s\d]/g, ""));
}

function extractNights(descrDivs) {
    var match = getDataFromDivs(descrDivs, /(\d+)\s*НОЧ.*/i);
    return match ? match[1] : "";
}

function extractBoardType(descrDivs) {
    var match = getDataFromDivs(descrDivs, /ПИТАНИЕ\s*\((.*)\)/i);
    return match ? match[1] : "";
}

function getOperator(tr) {
	var img = tr.querySelector("td#hh_totd img");
	if ( img && img.src ) {
	    var toId = img.src.match(/(\d+).png/);
	    if ( toId ) {
	    	toId = parseInt(toId[1], 10);
	    	for ( var i = 0; i < SLETAT_TO_CODES.length; ++i ) {
	    		if ( SLETAT_TO_CODES[i][0] == toId ) {
	    			return " / " + SLETAT_TO_CODES[i][1];
	    		}
	    	};
	    }
	}
    return "";
}

function createOption(img) {
    var tr = img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var pac = tr.querySelector("a.hh_price");
    var descrDivs = tr.querySelectorAll("div.hh_descr div");

    var option = {
        checkinDt : extractDate( descrDivs ),
        hotelName : extractHotelName( tr ),
        href : extractHotelUrl( tr ),
        region : extractRegion( tr ),
        roomType: extractRoomType( descrDivs ),
        boardType : extractBoardType( descrDivs ),
        price : extractPrice( pac ),
        currency : extractCurrency( pac ),
        nights : extractNights( descrDivs ),
        country : getCountry(),
        city_from : getCity(descrDivs),
        operator: OPERATOR_NAME + getOperator(tr),
        operatorSletatId : extractOperatorSletatId(pac),
        thumbnail : extractThumbnail(tr)
    };

    return option;
}

function createCell(rowspan) {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    nobr.className = "qq";
    nobr.setAttribute("style", "position: relative; top: 3px;");
    
    return nobr;
}

function injectData() {
    var priceDivs = document.querySelectorAll("div.hh_topic");

    for (var i = 0; i < priceDivs.length; i++) {
        if ( !priceDivs[i].querySelector("nobr.qq") ) {
            priceDivs[i].appendChild(createCell());
        }
    };
    
}

function extractThumbnail(tr) {
	var img = tr.parentNode.querySelector(".hh_img img");
	return img && img.src ? img.src : null;
}

