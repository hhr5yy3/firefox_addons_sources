// not operational, turned off
//
// from manifest
//		"matches":	["http://online.laspi.com/index.php?action=order*"],
//		"js":		["data/operators/laspi/laspi.js", "data/operators/util.js", "data/operators/entry-point.js"]
//
// from operators list
//    {:img "laspi.jpg", :img-height "75", :name "Ласпи", :url "http://www.laspi.com"}



var OPERATOR_NAME = "Laspi";

//-------- Search Criteria ---------------------------

function initializeSearchCriteria() {
	return null;
}

function getSearchButton() {
	return null;
}


//--------- Rows ---------------------------------

function injectData() {
	var t = document.querySelectorAll(".sub-info");
	if ( t == null || t.lenght < 1 )
		return;
	
	var cells = t[0].querySelectorAll(".tr-bottom .quest");
	for (var i = 0; i < cells.length; i++) {
		injectButtons(cells[i]);
	}
}


function injectButtons(cell) {
	var td = cell.parentNode;
	if ( td.querySelector(".qq") != null ) {
		return;
	}

	td.appendChild(document.createElement("br"));

	var nobr = document.createElement("nobr");
	nobr.className = "qq";
	nobr.appendChild(createAddButton());
	nobr.appendChild(createEditButton());   

   	td.appendChild(nobr);
}


//--------- Option ---------------------------------

function createOption(img) {
    var option = {
        	hotelName : getSelectedOption("edit-order-bid"),
        	href : "",
        	roomType : extractRoomType(),
        	boardType : "",
            checkinDt : document.querySelector("#edit-order-day-in").value,
            nights : getSelectedOption("edit-order-days"),
            price : extractPrice(img),
            currency : extractCurrency(img),
        	region : "",
        	country : ""
    };
    return option;
}

function getSelectedOption(elementId) {
	var value = document.querySelector("#" + elementId).value;
	var option = document.querySelector("#" + elementId + " > option[value='" + value + "']");
	return option.textContent;
}

function extractRoomType() {
	return getSelectedOption("edit-order-category-bulk") + ". " + getSelectedOption("edit-order-formula")
}

function getPriceAndCurrency(img) {
	return img.parentNode.parentNode.querySelector("div > span > a").textContent;
}

function extractPrice(img) {
	return extractIntFromStr(getPriceAndCurrency(img).match(/(\d+)/)[1]);
}

function extractCurrency(img) {
	var c = getPriceAndCurrency(img).match(/\d+\s(.+)\.$/)[1];

	if ( c == "руб")
		return "RUB";
	else if ( c == "грн")
		return "UAH";
	else if ( c == "usd")
		return "USD";
	else 
		return c;
}

