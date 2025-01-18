var OPERATOR_NAME = "DVM";
//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {    
   return null;
}

function getSearchButton() {
	return null;
}

function injectData() {
 var tour = document.querySelector("#tourBook div");
 if ( tour !== null && tour.querySelector(".qq") === null ) {
	 tour.appendChild(createCell());
 }
}



function createCell() {
   var newDiv = document.createElement("div");
   newDiv.appendChild(createAddButton());
   newDiv.appendChild(createEditButton());
   newDiv.className = "qq";
   newDiv.style = "float:right";
   return newDiv;
}

function createOption(img) {  
	var option = {
	    		    checkinDt :getDate(),
	    	        nights : getNights(), 
	    	        hotelName : getHotelName(),
	    	        href : getUrl(),
	    	        roomType: "",
	    	        region : getRegion(),
	    	        boardType : "",
	    	        price : getPrice(),
	    	        currency : getCurrency(),
	    	        country:  "",
	    	        city_from: getCity(), 
	    	        operator: OPERATOR_NAME,	
	    	        excursion: true,

	    }

	   return option;
}

function getDate() {
   return document.querySelector("#tourDate").value;
}

function getNights() {
    var all_nights = document.querySelectorAll("[checked].packet_nights");
    var sum = 0;
    for ( var i = 0; i < all_nights.length; i++ ) {
    	sum = sum + extractIntFromStr(all_nights[i].value);
    } 
	return sum.toString();
}

function getHotelName() {
   return document.querySelector("#tourName").textContent;
}

function getUrl() {
    var a = document.querySelector("#linktour a");
    return a ? a.href : null;
}

function getRegion() {
	var regions = document.querySelectorAll("div.tourCity");
	var sum = [];
	    for ( var i = 0; i < regions.length; i++ ) {
	    	sum.push(regions[i].querySelector("div").textContent);
	    } 

	return sum.join(", ") ;
}

function getPrice() {
   return extractIntFromStr(document.querySelector("#tourTotalPrice .price").getAttribute("data-price"));
}

function getCurrency() {
 return document.querySelector("#tourTotalPrice .price").getAttribute("data-currency");
}

function getCity() {
    var city =  document.querySelector(".selectedDepCity, #tourDepCities");
	return city.getAttribute("placeholder") ?  city.getAttribute("placeholder") : city.textContent;
}
