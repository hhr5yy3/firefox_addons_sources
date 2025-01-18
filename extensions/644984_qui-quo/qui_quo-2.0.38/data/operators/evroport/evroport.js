var OPERATOR_NAME = "Evroport";
var OPERATOR_SLETAT_ID = 199;
window.showTopHotelsRating = true;

//-------- Search Criteria ---------------------------

function getSearchButton() {
	return document.querySelector(".sf-search-button");
}

function getCountry() {
	var s = document.querySelector("#Countries");
	if ( s )
		return s.textContent;

	s = document.querySelector("#country");
	return s ? selectedOption(s) : null;
}

function getCity() {
	var s = document.querySelector("#DepCities");
	if ( s )
		return s.textContent;

	s = document.querySelector("#depCity");
	return s ? selectedOption(s) : null;
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function selectOptionalInt(sel) {
    var s = document.querySelector(sel);
    return s ? extractOptionalInt( s.value ) : null;
}

function getChildAge(text) {
    var match = text.match(/\d+/);
    return match ? match[0] : null;
}

function getOccupancy() {
    var occupancy = {
            adultsCount: selectOptionalInt("input#adults"),
            childrenCount: selectOptionalInt("input#childs"),
            childAges: null
        };

    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        var ageInputs = document.querySelectorAll("select[id^='child']");
        for ( var i = 0; i < occupancy.childrenCount; ++i ) {
            var input = getChildAge( ageInputs[i].value );
            if ( input === null )
                return null;
            ages.push(input);
        }

        occupancy.childAges = ages.join(",");
    }

    return occupancy;
}

function initializeSearchCriteria() {
    var country = getCountry();
    if ( !country )
        return null;

    var city = getCity();
    if ( !city )
        return null;

    return { country : country,
    		 city : city,
    		 occupancy : getOccupancy() };
}

//--------- Rows ---------------------------------

function injectData() {
	injectTitle(document.querySelector("#SearchResTable>thead>tr"));

	var rows = document.querySelectorAll("#SearchResTable>tbody>tr");
	for (var i = 0; i < rows.length; i++) {
		injectRow(rows[i]);
	}
}

function injectTitle(row) {
	if ( row == null || row.querySelector("th.qq") != null ) {
		return;
	}

    var td = document.createElement("th");
    td.className = "qq sorting_disabled";
    td.appendChild(document.createTextNode("QQ"));
    row.appendChild(td);
}


function injectRow(row) {
	if ( row.querySelector("td.qq") != null ) {
		return;
	}

    var td = document.createElement("td");
    td.className = "qq";
    td.appendChild(qqBtns());
   	row.appendChild(td);

}


//--------- Option ---------------------------------

function createOption(img) {
	var tr = img.closest('tr');
	var tds = $$('td', tr);
    var option = {
            checkinDt : extractDate(tds[0].textContent.replace(/\s*\d{2}:\d{2}\s*/, '')),
            nights : extractIntFromStr(tds[2].textContent) + "",
        	region : tds[3].textContent,
        	hotelName : extractHotelName(tds[4]),
        	href : extractHotelRef(tds[4]),
        	roomType : tds[5].textContent,
        	boardType : tds[6].textContent,
            price : extractIntFromStr(tds[getHeaderRowElementsNames(/Цена за/i)].textContent),
            currency : extractCurrency(),
        	country : SEARCH_CRITERIA.country,
        	city_from : SEARCH_CRITERIA.city,
        	occupancy : SEARCH_CRITERIA.occupancy
        };
        return option;
}

function extractHotelName(td) {
	var a = td.querySelector("a");
	return a == null ? td.textContent : a.textContent;
}

function extractHotelRef(td) {
	var a = td.querySelector("a");
	return a == null ? null : a.href;
}

function extractDate(s) {
	var m = s.match(getRegexPatterns().dateStrict);
	return m[0];
}

function extractCurrency() {
	var h = document.querySelectorAll("#SearchResTable>thead>tr>th")[getHeaderRowElementsNames(/Цена за/i)];
	var c = h.textContent.match(/\(([^\)]+)\)/)[1].toUpperCase();
	switch(c) {
	case "РУБ": return "RUB";
	case "EU": return "EUR";
	}
	return c;
}

function getHeaderRowElementsNames(expr) {
	var head = document.querySelector("#SearchResTable>thead>tr");
	if ( head === null ) {
		return;
	}
	return querySelectorAll(head, "th").findIndex(function(td) {
		return td.textContent.trim().match(expr);
	});
}
