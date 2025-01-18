var OPERATOR_NAME = "gocruise.ru";
//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {    
  return null;
}

function getSearchButton() {
	return null;
}

function injectData() {
    var table = document.querySelector(".cruise_price_table");
	if ( table ) {
      var head = table.querySelector("thead tr");
      if ( !head .querySelector(".qq") ) {	
	  	    head .appendChild(createHeadCell());;
      }
      var trs = table.querySelectorAll("tbody tr");
      for ( i = 0; i < trs.length; i++ ) {
         if ( !trs[i].querySelector(".qq") ) {
               trs[i].appendChild(createCell());
	     }	
      }
   }
}

function createHeadCell() {
	var newTh = document.createElement("th");
    newTh.className = "qq";
    newTh.appendChild(document.createTextNode("QQ"));
    return newTh;
}

function createCell() {
	var div = document.createElement("div");
	div.appendChild(createAddButton());
	div.appendChild(createEditButton());

    var newTd = document.createElement("td");
    newTd.className = "qq";    
    newTd.appendChild(div);
    return newTd;
}

function createOption(img) {
    var tr = img.parentNode.parentNode.parentNode;
    var div = document.querySelector("#cruise_page")
	var option = {
    		    checkinDt : makeYear4Digits(document.querySelector("#cruise_block_dates tbody tr td").textContent),
    	        nights : extractNights(div),
    	        hotelName : div.querySelector("h1").textContent + ", Лайнер: " + div.querySelector(".right.star.b").textContent.trim(),
    	        href : window.location.href,
    	        roomType: tr.querySelector("a").textContent,
    	        region : getRegion(div),
    	        boardType : "",
    	        price : extractIntFromStr(tr.querySelector(".price span").textContent),
    	        currency : mapCurrency(),
    	        country:  "",
    	        city_from: getCity(), 
    	        operator: getOperator(div),	
    	        comment: getComment(div),
    	        excursion: true
    }

    return option;
}

function extractNights(div) {
	var nights = extractIntFromStr(div.querySelector("b").textContent) - 1;
	return nights.toString();
}

function getRegion(div) {
   var a = div.querySelectorAll(".left a");
   var all = Array.fromList(a).map(function(a){
		return a.textContent.trim();	
	}).join(", ");
   return all;
}

function mapCurrency() {
	var text = document.querySelector("#currency_selector [checked='checked']").parentNode.textContent.trim()	
	 switch (text) {
        case "€": return "EUR";
        case "руб.": return "RUB";
        case "грн.": return "UAH";
        case "тенге": return "KZT";
        default: return text;
    }
}

function getCity() {
   var tr = document.querySelector(".cruise_packets_table .cb_checked");
   if ( !tr ) {
	   return "";
   }
   var city = tr.parentNode.parentNode.querySelector(".packet_title").textContent.split(" из ");
   return city[1] ? city[1].trim() : ""; 
}

function getOperator(div) {
	var oper = div.querySelector(".right.star.b a");
	return oper ? OPERATOR_NAME + " / " + oper.title.split("(")[1].replace(")", "") : OPERATOR_NAME;
}

function getComment(div) {
	var com = div.querySelectorAll("#avia_booking_note p");
	var all = (com[0] ? com[0].textContent : null);
	if ( getCity() === "" ) {
		return null;
	}
	return all;
}