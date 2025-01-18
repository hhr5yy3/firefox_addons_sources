// Копия ТО Пантеон

var OPERATOR_NAME = "Ростинг";
var OPERATOR_CURRENCY = "Ростинг";
var DEFAULT_CURRENCY = "BYN";
var CURRENCY_SELECTION_STYLE = "width:auto;float:left;margin-right:6px;font-size:12px;color:black;";

function getCountry() {
	var country = document.querySelector("#s2id_destinationFilter div");
	return country ? country.textContent : null;
}

function injectData() {
    injectCurrencySelectionUtil("body", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "font-size:12px",);
    const currency = document.querySelector("#qq-currency");
    const searchTable = document.querySelector('#searchTable');
    if ( currency && searchTable && !searchTable.parentNode.querySelector("#qq-currency") ) {
        searchTable.before(currency);
    }


    var tables = document.querySelectorAll(".hotelRoomTable");
    for ( var i = 0; i < tables.length; i++ ) {
        var head = tables[i].querySelector("thead tr");
        if ( head && head.querySelector(".qq") === null ) {
            head.appendChild(createHeaderCell());
        }
        var row = tables[i].querySelectorAll("tbody tr .col-md-3, tbody tr .col-md-2");
        if ( row.length > 0 ) {
            for ( var j = 1; j < row.length; j++ ) {
                if ( row[j].parentNode.querySelector(".qq") === null ) {
                    row[j].parentNode.appendChild(createCell()).setAttribute("rowspan", row[j].getAttribute("rowspan"));
                }
            }
        } else {
            querySelectorAll(tables[i], "tbody tr [data-bind*='hotelsCombination']").forEach(td => {
                 if ( !td.parentNode.querySelector(".qq") ) {
                     td.parentNode.appendChild(createCell());
                 }
            })
        }
    }

}

function getTrsDetails(details){
	var count = details.querySelector(".col-md-2, [data-bind*='hotelsCombination']").getAttribute("rowspan");
	var trs = [];
	trs.push(details);
	for ( var i = 1; i < count; i++ ) {
		details = details.nextElementSibling;
		trs.push(details);
	}
	return trs;
}

function getPrice(details) {
   var sel = isPrefferedDefaultCurrencyUtil() ? ".twoPrice" : ".onePrice";
   var s = getNodeProperty(details.querySelector(sel+' [data-bind*="GetPriceDivided"], .shopButton [data-bind*="Price"]')) ||
           getNodeProperty(details.querySelector('[data-bind*="GetPriceDivided"]'));
   var price = s.match(/[\d\s]+/g)[0].replace(/\s/g, "");
   return extractIntFromStr(price);
}

function getCurrency(details) {
    var sel = isPrefferedDefaultCurrencyUtil() ? ".twoPrice" : ".onePrice";
	var currency = getNodeProperty(details.querySelector(sel+' [data-bind*="GetCurrencySymbol"], .shopButton [data-bind*="Currency"]')) ||
                   getNodeProperty(details.querySelector('[data-bind*="GetCurrencySymbol"], [data-bind*="GetCurrencyCode"]'));
    return mapCurrency(currency)
}

function mapCurrency(text) {
    switch (text.toUpperCase()) {
        case "€":
            return "EUR";
        case "РБ":
            return "BYN";
        case "$":
            return "USD";
        case "TG":
            return "KZT";
        case "BY":
            return "BYN";
        case "БР":
            return "BYN";
        default:
            return text;
    }
}

function getRoomType(details) {
    var rooms = [];
    for ( var i = 0; i < details.length; i++ ) {
    	rooms.push(getNodeProperty(details[i].querySelectorAll(".col-md-5 .aviaLine, .aviaLine")[1], "", "innerText"));
    }
    return rooms.join(" / ");
}
