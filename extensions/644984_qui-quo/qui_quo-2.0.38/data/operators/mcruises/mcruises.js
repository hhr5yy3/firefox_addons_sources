var OPERATOR_NAME = "mcruises.ru";
var OPERATOR_SLETAT_ID = -1;
//-------- Search Criteria ---------------------------

function initializeSearchCriteria() {
	return null;
}

function getSearchButton() {
    return null;
}

function getCountry() {
	return null;
}

//--------- Rows ---------------------------------

function injectData() {
	var tds = document.querySelectorAll(".table_select_date .value_prices");
	for ( var i = 0; i < tds.length; i++ ) {
	  if ( tds[i].querySelector(".qq") == null && !/Нет\s+в\s+наличии/.test(tds[i].textContent)) {
	    tds[i].appendChild(createCell());       
	    }
	}
}

function createCell() {
	var newBr = document.createElement("br");
	
	var nobr = document.createElement("nobr");
	nobr.appendChild(createAddButton());
	nobr.appendChild(createEditButton());

    var newSpan = document.createElement("span");
    newSpan.className = "qq";    
    newSpan.appendChild(newBr);
    newSpan.appendChild(nobr);
    return newSpan;
}

function createOption(img) {
	var work_div = getHotelRowByImage(img);
	var td = img.parentNode.parentNode.parentNode;
	var tr = td.parentNode;
	var trs = tr.parentNode.querySelectorAll("tr");
	var tds = tr.querySelectorAll("td"); 
	var option = {
        checkinDt: extractDate(tds[0]),
        nights: getNights(work_div.querySelector(".portname")),
        hotelName: getHotel(work_div),
        href: work_div.querySelector("a.portname").href,
        roomType: getRoom(trs, td, tds),
        region: work_div.querySelector("div.ports._s_port_cont").textContent.replace(/\s*\s/g," ").trim(),
        boardType: "",
        price: getPrice(td),
        currency: getCurrency(td),
        country: work_div.querySelector("a.portname span").textContent.replace(/\s{1,}/g," "),
        city_from: "",
//      comment : getWhatInc(work_div.querySelector(".whatisincluded_popup")),
        excursion: true,
        thumbnail: work_div.querySelector(".photoLiner").src,
        occupancy : {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null 
        	}
	};
    return option;
}

function getHotelRowByImage(img) {
	var div = img.parentNode;
	while (true) {
		if ( div.className == "accordion-block text_center") {
		    break;
		}
		div = div.parentNode;
	};
	return div;
}

function extractDate(tds) {
	var m = tds.textContent.match(/(\S+)\s+(\d+)/);
	return appendYear(parseInt(m[2]), monthNameToNumber(m[1]));
}

function getRoom(trs, td, tds) {
	var head_tds = trs[0].querySelectorAll("td");
	for ( var i = 0; i < tds.length ; i++ ) {		
		if (tds[i] == td) {
		return 	head_tds[i].textContent;
	    }
		
	}
}

function getPrice(td) {
    return extractIntFromStr(td.querySelector(".price_current").childNodes[0].textContent.replace(/\D+/g, "").match(/\d+/g).toString());
}

function getCurrency(td) {
var map = td.querySelector(".price_current").childNodes[0].textContent.replace(/\s+/g, "").match(/\D+/g).toString();
	switch (map) {
	case "€": return "EUR";
	case "руб.": return "RUB";
	case "$": return "USD";
	default: return map;
    }	
}

function getNights(portname) {
    return portname.textContent.match(/(\d+)\s+ноч/)[1];
}

function getHotel(div) {
	var port =  div.querySelector(".portname").textContent.replace(/(\d+)\s+ноч\S+/, "").replace(/\s{2,}/g,"");
	var boat = div.querySelector(".engname").textContent;
	return port + boat;
}

//function getWhatInc(com) {
//	var comment = com ? com.innerText.replace(/\t*/g, "").replace(/\s{3,}/g,"\n").replace(/\n{2,}/g,"\n").replace(/\s{2,}/g," "): null;
//	return comment;
//}