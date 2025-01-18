var OPERATOR_NAME = "panukraine";
//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {    
   var country = selectedOption(document.querySelector("#f_c"));
   if ( !country ) {
	   return null;
   }
   var occupancy = getOccupancy();
   return {
	      "country": country,
	      "occupancy": occupancy
	   };
}

function getSearchButton() {
   return document.querySelector("#do_search");
}

function injectData() {
   var table = document.querySelector("#search_results table");
   var head = table ? table.querySelector("thead tr") : null;
   if ( head !== null && head.querySelector(".qq") === null ) {
	   head.appendChild(createHeaderCell());
   }
   querySelectorAll(table, "tbody .even , tbody .odd").forEach(function (tr) {
	 if ( tr !== null && tr.querySelector(".qq") === null ) {
		 tr.appendChild(createCell());
	 }  
   });
}


function createCell() {
   var newTd = document.createElement("td");
   newTd.className = "qq";
   newTd.appendChild(createAddButton());
   newTd.appendChild(createEditButton());
   return newTd;
}

function createHeaderCell() {
   var th = document.createElement("th");
   th.className = "qq";
   th.appendChild(document.createTextNode("QQ"));
   return th;
}
function createOption(img) {
   var tr = getHotelRowByImage(img); 
   var option = {
	    		    checkinDt :getDate(tr),
	    	        nights : getNights(tr), 
	    	        hotelName : getHotelName(tr),
	    	        href : getURL(tr),
	    	        roomType: getRoomType(tr),
	    	        region : getRegion(tr),
	    	        boardType : getBoardType(tr),
	    	        price : getPrice(tr),
	    	        currency : getCurrency(tr),
	    	        country:  SEARCH_CRITERIA.country,
	    	        city_from: getCity(tr), 	
	    	        excursion: false,
	    	        operator: OPERATOR_NAME,
	    	        occupancy : SEARCH_CRITERIA.occupancy
       };
   return option;
}

function getDate(tr) {
	var date =  tr.querySelector(".date_td").textContent.match(/(\d{2}).(\d{2})/);
	return appendYear(extractIntFromStr(date [1]), extractIntFromStr(date [2]));
}

function getNights(tr) {
	return tr.querySelector(".nights_td").textContent.match(/\d+/).toString();
}

function getHotelName(tr) {
	var hotel = tr.querySelector(".hotel_link");
	return hotel ? hotel.textContent : tr.querySelector(".hotel_td").textContent;
}

function getURL(tr) {
   return tr.querySelector(".hotel_link") ? tr.querySelector(".hotel_link").href : null;
}

function getRoomType(tr) {
	return tr.querySelector(".acc_td").textContent + ", " +  tr.querySelector(".room").textContent;
}

function getRegion(tr) {
   var region =  delSpan(tr.querySelector(".location_td"));
   var span = tr.querySelector(".location_td span");
   return span ? region + ", " + span.textContent : region;
}

function getBoardType(tr) {
    var meal = tr.querySelector(".meal_td");
    var span = meal.querySelector("span");
	var title = span ? span.getAttribute("bt-xtitle") : null;
    return title ? meal.textContent + ", " + title : meal.textContent;
}

function getPrice(tr) {
    var sel = checkOriginal(tr);
    var price = sel.querySelector(".price.pseudolink");
    return extractIntFromStr(price ? price.textContent : sel.querySelector(".price").textContent); 
}

function getCurrency(tr) {
    return checkOriginal(tr).querySelector(".currency").textContent; 
}

function getCity(tr) {
	var avia = tr.querySelector(".avia_cell.avia_inc");
	if ( avia && avia.textContent.trim() === "вкл" ) {
		var cell = tr.querySelector(".dest_cell");	
		if ( cell ) {
			var dest = cell.textContent;
			var cities = ["KIEV","Киев","Odessa","Одесса"];
			 var text =  cities.filter(function(city) {
		            return dest.match(new RegExp(city, "i"));
		        })[0];
		        if ( text  ) {
		            switch (text.toUpperCase()) {
		            case "ODESSA": return "Одесса";
		            case "KIEV": return "Киев";
		            default: return text;
		            }
		        }
			return null;
		}
	}
	return "";
}

function checkOriginal(tr) {
	var orig = tr.querySelector(".original_price");
	var converted = tr.querySelector(".converted_price"); 
	if ( orig.style.display !== "none" || orig.style.display === "") {
	    return orig; 
	} else { 
    	return converted; 
    }	
}

function getOccupancy() {   
    var occupancy = {
         adultsCount: extractOccupancyCount("#adts"),
         childrenCount: extractOccupancyCount("#chds"),
         childAges: null 
   };
   if ( occupancy.adultsCount === null || occupancy.childrenCount === null ) {
       return null;
   }
   var age = querySelectorAll(document, ".chd1_age, .chd2_age")
   .filter(function(div) { return div.style.display === "block"; })
   .map(function(div) { return div.querySelector("input"); })
   .filter(function(input) { return input; })
   .map(function(input) { return extractOptionalInt(input.value); })
   .filter(function(val) { return val !== null; })
   if ( age.length !== occupancy.childrenCount ) {   
      return null;
   }     
   occupancy.childAges = age.join(",");   
   return occupancy;
}

function getHotelRowByImage(img) {
   var tr = img.parentNode;
   while (true) {
      if ( tr.className === "even" || tr.className === "odd") {
         break;
      }
   tr = tr.parentNode;
   };
   return tr;
}

function delSpan(td) {
   var s = td.querySelector("span");
   return s ? td.textContent.replace(s.textContent, "" )  : td.textContent;
}

function extractOccupancyCount(sel) {
   var input =   document.querySelector(sel);
   return input ? extractOptionalInt(input.value) : null;
}