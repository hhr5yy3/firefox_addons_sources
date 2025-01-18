var OPERATOR_NAME = "РоссТур";

function initializeSearchCriteria() {    
	var country = getCountry();
	if ( !country ) {
		return null;
	}
	var region = getRegion();
	if ( !region ) {
		return null;
	}
	var occupancy = getOccupancy();
	return { "country" : country.textContent,
		"region" : region.textContent,
		"occupancy" : occupancy 
	}
}

function getSearchButton() {
	return document.querySelector("#search_key_block");
}

function injectData() {
	var rows = document.querySelectorAll(".rt-result .iroom:not(.istr)");
	for ( var i = 0; i < rows.length; i++ ) {
		if (  !rows[i].querySelector(".qq") ) {
			rows[i].appendChild(createCell());   
		} 
	}
	var head_trs = document.querySelectorAll(".rt-result .rtitle.istr");
	for ( var i = 0; i < head_trs.length; i++ ) {
		if (  !head_trs[i].querySelector(".qq")) {
			head_trs[i].appendChild(createHeaderCell());   
		} 
	}
}


function createCell() {
	var nobr = document.createElement("nobr");
	nobr.appendChild(createAddButton());
	nobr.appendChild(createEditButton());
	var newTd = document.createElement("td");
	newTd.appendChild(nobr);
	newTd.className = "qq rt-while"; 
	return newTd;
}

function createHeaderCell() {
	var newTd = document.createElement("td");
	newTd.className = "qq";
	newTd.appendChild(document.createTextNode("QQ"));
	newTd.setAttribute("style", "text-align: center;font-weight: bold;font-size:13px");
	return newTd;
}

function createOption(img) {
	var hotel = getHotelRowByImage(img);
	var room_row = img.parentNode.parentNode.parentNode;
	var tds = room_row.querySelectorAll("td");
	var option = {
			checkinDt :getDate(),
			nights : getNights(), 
			hotelName : getHotelName(hotel),
			href : getURL(),
			roomType: getRoomType(tds[2],room_row),
			region : SEARCH_CRITERIA.region,
			boardType : getBoardType(tds[1]),
			price : extractIntFromStr(getPriceAndCurrency(tds[5],"price")),
			currency :mapCurrency(tds[5],"param"),
			country:  SEARCH_CRITERIA.country,
			city_from: "", 
			thumbnail: getThumbnail(hotel),
			occupancy : getOccupancyRoomOccupancy(SEARCH_CRITERIA.occupancy,room_row)
	}
	return option;
}

function getDate() {
	return document.querySelector("#rt-day-from").value; 
}

function getNights() {
	return document.querySelector("#rt-day-num").value;
}

function getHotelName(hotel) {
	return hotel.previousElementSibling.querySelector("a").textContent; 
}

function getURL() {
	return null;
}

function getRoomType(td,room_row) {
    var row = room_row;
	while (true) {
		if ( row.className === "rtitle istr" || row.className === "iroom istr") {	
			break;
		}	
		row = row.previousElementSibling;
	};
	
	return td.textContent + ", " + row.querySelector("td nobr b").textContent;  
}

function getRegion() {
	return  document.querySelector("#froute .fcity .label");
}

function getBoardType(td) {
	return td.textContent;
}

function getPriceAndCurrency(td,attr) {
	return querySelectorAll(td, "input").find(isDisplayNode).getAttribute(attr);
}

function mapCurrency(td,attr) {
	var text = getPriceAndCurrency(td,attr).toUpperCase();
	switch (text) {
	case "EUR": return "EUR";
	case "RUR": return "RUB";
	case "USD": return "USD";  
	default: return text;
	}
}

function getCountry() {
	return document.querySelector("#froute .fcountry .label");
}

function getThumbnail(hotel) {
	var thumb = hotel.querySelector(".rt-slides .rt-thump");
	return thumb ? thumb.src : null;
}

function getOccupancy() {
	var checked = querySelectorAll(document, ".rt-accommodation-table-tr-z input").filter(checkedElem );
	return checked.map(getCheckedOccupancy);
}

function getHotelRowByImage(img) {
	var div = img.parentNode;
	while (true) {
		if (div.tagName === "TABLE") {			
			break;
		}
		div = div.parentNode;
	};
	return div;
}

function isDisplayNode(node) {
	return node.style.display !== "none";
}

function checkedElem (input) {
	return input.checked;
}

function isDisplayAges(node) {
	return node.className !== "rt-hide";
}

function getCheckedOccupancy(checked) {
	checked = checked.parentNode.parentNode.parentNode;
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null 
	}

	occupancy.adultsCount = extractOptionalInt(selectedOption(checked.querySelector(".rt-accommodation-table-tr-td2 select")));
	occupancy.childrenCount = extractOptionalInt(selectedOption(checked.querySelector(".rt-accommodation-table-tr-td3 select"))); 
	if ( occupancy.childrenCount && occupancy.childrenCount > 0  ) {
		var ages = [];
		ages = querySelectorAll(checked.querySelector(".rt-accommodation-table-tr .rt-accommodation-table-tr-td4"), "select")
		.filter(isDisplayAges)
		.map(function (s) { return  extractIntFromStr(selectedOption(s)); } ).join(",");
		occupancy.childAges = ages;
	}
	return occupancy; 
}

function isNotIstr(node) {
	return node.className === "iroom istr";
}

function  getOccupancyRoomOccupancy(obj,row) {
	if ( !obj ) {
		return null;
	}
	var countVariantsUp = 0;
	while (true) {
		if ( !row ) {			
			break;
		}
		if ( row.className  === "iroom istr") {
			countVariantsUp++;	
		}		
		row = row.previousElementSibling;
	};
	return obj[countVariantsUp];	
}