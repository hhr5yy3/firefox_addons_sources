var OPERATOR_NAME = "viamaris";
//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {    
	  return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    var suites = document.querySelectorAll(".suite");
    for ( i = 0; i < suites.length; i++ ) {
    	if ( !suites[i].querySelector(".qq") ) {
    		suites[i].appendChild(createCell());
    	}
    	
    }
}

function createCell() {
	var nobr = document.createElement("nobr");
	nobr.appendChild(createAddButton());
	nobr.style ="position: relative; left: 228px; top: 16px;"
	
	var nobr2 = document.createElement("nobr");
	nobr2.appendChild(createEditButton());
	nobr2.style ="position: relative; left: 252px; top: 16px;"
	
	var newDiv = document.createElement("div");
    newDiv.className = "qq"; 
    newDiv.appendChild(nobr);
    newDiv.appendChild(nobr2);
    return newDiv;
}

function createOption(img) {
    var price_div = img.parentNode.parentNode.parentNode;
    var main_div = document.querySelector("#search-details")    
	var option = {
    		    checkinDt :getDate(),
    	        nights : getNights(), 
    	        hotelName : getName(),
    	        href : "",
    	        roomType: createRoomType(price_div),
    	        region : getRegion(),
    	        boardType : "",
    	        price : getPrice(price_div, /\d/g ),
    	        currency : getCurrency(price_div, /\D+/g ),
    	        country:  "",
    	        city_from: "", 
    	        operator: OPERATOR_NAME + " / " + document.querySelector(".cm").textContent.replace("Компания ",""),	
    	        comment: getComment(),
    	        excursion: true,
    	        occupancy : {
    	            adultsCount: 1,
    	            childrenCount: 0,
    	            childAges: null 
    	        	}
    }

    return option;
}

function getDate() {
	var date = document.querySelector(".det-caption h4").textContent;
	var match = date.match(/(\d+).(\d+)/);
	return appendYear(extractIntFromStr(match[1]),extractIntFromStr(match[2]));
}

function getNights() {
	return  document.querySelector(".det-caption").textContent.match(/(\d+)\s+ноч/)[1];
}

function getName() {
	var name =document.querySelector(".det-caption h3").textContent;
	var ln = document.querySelector(".ln").textContent;
	return name + ", " + ln;
}

function createRoomType(div) {
	var cl = div.querySelector(".txt").textContent;
	return cl;	
}

function getRegion() {
    var regs = Array.fromList(document.querySelectorAll("td.pd3"))
                .map(function(s) { return s.textContent.trim(); });
    return regs.length < 9 ? regs.join(", ") : 
        regs.slice(0,4).join(", ") + ", ..., " + regs.slice(-4).join(", ");
}

function getPrice(div, reg) {
	var price = getPriceAndCurrency(div, reg);
	return price  ? extractIntFromStr(price.toString().replace(/,/g,"")) : null;

}

function getCurrency(div, reg) {
   var cur = getPriceAndCurrency(div, reg);
   return mapCurrency(cur.toString().trim());
}

function getPriceAndCurrency(div, reg) {
	var sel = div.querySelectorAll(".tprice .o");
	var pc = Array.fromList(sel)
	.filter(function(d) { return d.parentNode.style.display === "block"; })
	.map(function (d) { return d.textContent.match(reg); })
	.join("");
	return pc ? pc : div.querySelector(".price-origin .o").textContent.match(reg);
}

function mapCurrency(text) {
    var reg = text.match(/[€a$]/)? text.match(/[€a$]/)[0] : text;
	switch (reg) {
       case "€": return "EUR";
       case "a": return "RUB";
       case "$": return "USD";
       default: return reg;
   }
}

function getComment() {
	var com =  document.querySelector(".crprop");
	return com ? com.textContent: null;	
}