var OPERATOR_NAME = "TUI";
var OPERATOR_SLETAT_ID = 229;

//-------- Search Criteria ---------------------------

function initializeSearchCriteria() {    
    return getOccupancy();
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function selectOptionalInt(sel) {
    var s = document.querySelector(sel);
    return s ? extractOptionalInt( s.tagName == "INPUT" ? s.value : s.textContent ) : null;
}

function getChildAges() {
	var ages = [];
	var inputs = document.querySelectorAll("#resultsHeader .children .dropdownMenu input");
	for (var i = 0; i < inputs.length; i++) {
		var age = extractOptionalInt(inputs[i].value);
		if ( age !== null ) {
			ages.push(age);
		}
	}
	return ages;
}

function getOccupancy() {
    var occupancy = {
            adultsCount: selectOptionalInt("#resultsHeader .adult input"),
            childrenCount: selectOptionalInt("#resultsHeader .childrenCount .active"),
            childAges: null 
        };
    
    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;
    
    if ( occupancy.childrenCount > 0 ) {
        var ages = getChildAges();
        if ( occupancy.childrenCount != ages.length )
            return null;
        occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function getSearchButton() {
    return document.querySelector("#resultsHeader .submitBlock button");
}


//--------- Rows ---------------------------------

function extractDate(tr) {
	var m = tr.querySelector(".dateCell .date").textContent.match(/(\d+)\s+([а-яА-Я]+)\s+(\d\d\d\d)/);
	if ( m == null ) return null;
	var month = "";
	switch (m[2]) {
	case "января":	month = "01"; break;
	case "февраля":	month = "02"; break;
	case "марта":	month = "03"; break;
	case "апреля":	month = "04"; break;
	case "мая":		month = "05"; break;
	case "июня":	month = "06"; break;
	case "июля":	month = "07"; break;
	case "августа": month = "08"; break;
	case "сентября":month = "09"; break;
	case "октября": month = "10"; break;
	case "ноября":	month = "11"; break;
	case "декабря": month = "12"; break;
	}
	return m[1] + "." + month + "." + m[3];
}

function extractCurrency(tr) {
	var c = tr.querySelector(".priceCell .price span:last-child").textContent.trim();
	switch (c) {
	case "руб.": return "RUB";
	default: return c;
	}
}

function extractHotelName(navs) {
	var name = trim(navs[navs.length-1].textContent);
	if ( name.indexOf("*") > 0 ) {
		return name;
	}
	
	var img = document.querySelector("#HotelHeadHotelStarsImage");
	if ( img && img.style && img.style.width ) {
		var stars=Math.floor(extractIntFromStr(img.style.width) / 14);
		if ( stars > 0 && stars < 6 ) {
			name = name + " " + stars + "*";
		}		
	}
	
    return name;
}


function getNavBreadCrumbs() {
	return getChildElementsByTagName(document.querySelector("nav.breadCrumbs"), "span");
}

function getCity() {	
	var match = RegExp("[?&]DepartureCity=([^&]*)").exec(window.location.href);
	var cityCode =  match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	if ( cityCode ) {
		switch (cityCode) {
		case "34": return "Москва";
		case "18254": return "Санкт-Петербург";
		case "-2": return "";
		}
	}
	return null;
	
}

function createOption(img) {
	var tr = img.parentNode.parentNode.parentNode;
	var navs = getNavBreadCrumbs();
    var option = {
        checkinDt : extractDate(tr),        
        nights : tr.querySelector(".dateCell .night span").textContent.match(/\d+/)[0],
        roomType: tr.querySelector(".roomCategoryCell").textContent.trim() + " / " + 
        		  tr.querySelector(".accommodationTypes .tip>h5").nextSibling.textContent.trim(),
        boardType : tr.querySelector(".pansionCell").textContent.trim(),
        price : extractIntFromStr(tr.querySelector(".priceCell .price span:first-child")
        			.textContent
        			.split("&" + "nbsp;").join("")
					.split(/\s+/).join("").trim()),
        currency : extractCurrency(tr),
        hotelName : extractHotelName(navs),
        region : navs[navs.length-2].querySelector("span").textContent,        
        country: navs[0].querySelector("span").textContent,
        city_from: getCity(),
        href: window.location.href,
        operator : OPERATOR_NAME,
        occupancy: SEARCH_CRITERIA,
        thumbnail : extractThumbnail()
    };

    return option;

}

function extractThumbnail() {
	var img = document.querySelector("#imagesConteiner img");
	return img && img.src ? img.src : null;
}

function createButtons() {
	var edit = createEditButton();
	edit.setAttribute("style", "cursor: pointer;margin-top:-3px;margin-left:1px;");	
	
	var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());    
    nobr.appendChild(edit);   
    
    var td = document.createElement("td");
    td.className = "qq";
    td.appendChild(nobr);
    return td;
}
    
function injectData() {
    var trs = document.querySelectorAll("#searchResults table.searchResultTable>tbody>tr");
    for (var i = 1; i < trs.length; ++i) {  
        if ( trs[i].querySelector("td.qq") == null ) {
        	var tds = getChildElementsByTagName(trs[i], "td");
        	if ( tds.length > 6 ) {
        	    trs[i].insertBefore(createButtons(), tds[6]);
        	}
        }
    }
}


