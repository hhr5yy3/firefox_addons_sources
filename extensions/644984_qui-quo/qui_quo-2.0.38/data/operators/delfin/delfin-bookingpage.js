var OPERATOR_NAME = "Delfin";

//-------- Search Criteria ---------------------------

function initializeSearchCriteria() {
	return null;
}

function getSearchButton() {
	return null;
}

// --------- Rows ---------------------------------

function extractDate(table1Tr) {
	return table1Tr.querySelectorAll("td")[1].textContent.match(/(\d{2}.\d{2}.\d{4})\s?-\s?/)[1];
}

function extractHotelName(table1Tr) {
	var stars = "";
	var match = table1Tr.querySelectorAll("td")[1].textContent.match(/\d\s?\*+/);
	if ( match ) {
		stars = " " + match[0];
	} else {
		stars += table1Tr.querySelectorAll("td")[1].textContent.replace(/[^*]/g, "");
		stars.length > 0 ? stars = " " + stars.length + "*" : stars = "";
	}

    var name = table1Tr.querySelectorAll("td")[1].textContent.match(/"(.+)"/);
    return name ? trim(name[1]) + stars : trim(table1Tr.querySelectorAll("td")[1].textContent) + stars;
}

function extractHotelUrl(table1Trs) {
    return "";
}

function extractRegion(table1Tr) {
	var region = table1Tr.querySelectorAll("td")[1].textContent.match(/,\s([^,]+)$/);
    return region ? region[1] : table1Tr.querySelectorAll("td")[1].textContent;
}

function extractRoomType(table2Trs) {
	var result = "";
	result += trim(table2Trs[0].querySelectorAll("td")[2].textContent) + " / ";
	for ( var i = 1; i < table2Trs.length; ++i ) {
		var tds = table2Trs[i].querySelectorAll("td");
		var count = selectedOption(tds[2].querySelector("select"));
		if ( count != "0" ) {
			result += count + " " + trim(tds[0].querySelector("span").textContent);
            if ( i < table2Trs.length - 1 ) {
                result += ", ";
            }
		}
	};
    
    return result;
}

function extractPrice(trs) {
    var result = 0;
	for ( var i = 1; i < trs.length; i++) {
		var  td = trs[i].querySelectorAll("td");
			var price_tmp = extractIntFromStr(td[1].textContent.replace(/\D+/g,""));
			var count = selectedOption(trs[i].querySelector("select"));
			result  += price_tmp * (count ? extractIntFromStr(count) : 0);
    }
	return result;
}

function extractCurrency(td) {
    return mapCurrency(td.textContent.replace(/[\s\d]/g, ""));
}

function extractNights(table1Tr) {
	var select = table1Tr.querySelector("select")
    return select ? selectedOption(select) : table1Tr.querySelectorAll("td")[1].textContent.match(/(\d+)[^\d]+$/)[1];
}

function extractBoardType(table1Tr) {
    return trim(table1Tr.querySelectorAll("td")[1].textContent);
}

function extractCountry(table1Tr) {
    return trim(table1Tr.querySelectorAll("td")[1].textContent);
}

function createOption(img) {
    var table1Trs = document.querySelectorAll("table.tourpars tbody tr");
    var table2Trs = document.querySelectorAll(".seletedpricing");

    var option = {
        checkinDt : extractDate( table1Trs[5] ),
        hotelName : extractHotelName( table1Trs[2] ),
        href : extractHotelUrl( table1Trs ),
        region : extractRegion( table1Trs[1] ),
        roomType: extractRoomType( table2Trs ),
        boardType : extractBoardType( table1Trs[6] ),
        price : extractPrice( table2Trs ),
        currency : "RUB",
        nights : extractNights( table1Trs[7] ),
        country : extractCountry( table1Trs[0] ),
        city_from : "",
    };


    return option;
}

function createHeader() {
	var lastHeaderCell = document.querySelector(".ptright");
    if ( lastHeaderCell ) {
    	lastHeaderCell.className = "placehead";	
    }
	var newSpan = document.createElement("span");
    newSpan.setAttribute("class", "placehead ptright");
    newSpan.appendChild(document.createTextNode("QQ"));

    var td = document.createElement("td");
    td.className = "qq";
    td.appendChild(newSpan);
    return td;
}

function createCell(rowSpan) {
    var span = document.createElement("span");
    span.appendChild(createAddButton());
    span.appendChild(createEditButton());
    var newTd = document.createElement("td");
    newTd.rowSpan = rowSpan;
    newTd.className = "bott-separate qq";
    newTd.appendChild(span);
    
    return newTd
}

function injectData() {
	var table = document.querySelector("table.placetable");
    if ( !table ) {
        return;
    }
	var headtr = document.querySelector(".placehead");
    if ( headtr ) {
	    headtr = headtr.parentNode.parentNode;
	    if ( !headtr.querySelector(".qq") ) {
		    headtr.appendChild(createHeader());
	    }
    }
    
    var table2 = document.querySelectorAll(".seletedpricing");
    if ( table2.length > 0 ) {
    	for ( var i = 0; i < table2.length; ++i ) {
    		var tr = table2[i];
     		if ( tr.getAttribute("name") && !tr.querySelector("td.qq") ) {
                var cell = createCell();
                cell.className = "qq"
	            tr.appendChild(cell);
	        }
    	};
    }
}

