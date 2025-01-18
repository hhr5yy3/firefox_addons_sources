var OPERATOR_NAME = "ТУРЫ.ру";
// -------- Search Criteria ---------------------------

function initializeSearchCriteria() {
    var country = getCountry();
    if (!country) {
        return null;
    }
    var city = getCity();
    if (!city) {
        return null;
    }
	var occupancy = getOccupancy();
    if (!occupancy) {
        return null;
    }
    return {
        "country": country,
        "city": city,
        "occupancy": occupancy
    };
}

function createCell() {
    var newTd = document.createElement("td");
    newTd.appendChild(createAddButton());
    newTd.appendChild(createEditButton());
    newTd.className = "qq";
   
    return newTd;
}

function createHeaderCell() {
    var newTh = document.createElement("th");
    newTh.className = "qq";
    newTh.appendChild(document.createTextNode("QQ"));
    return newTh;
}
    
function injectData() {
    var tables = document.querySelectorAll(".rsrvme_hc_prices_tab");
    for ( var i = 0; i < tables.length; i++ ) {
         var head = tables[i].querySelector("thead tr"); 
         if ( head.querySelector(".qq") === null  ) {
        	 head.appendChild(createHeaderCell());
         }
         var body_trs = tables[i].querySelectorAll("tbody tr");
         for ( var j = 0; j < body_trs.length; j++ ) {
        	 if ( body_trs[j].querySelector(".qq") === null && body_trs[j].parentNode.parentNode.className === "rsrvme_hc_prices_tab" &&
             body_trs[j].querySelector(".show_all_to_prices") === null) {
        		 body_trs[j].appendChild(createCell());
        		 var meal = body_trs[j].querySelector(".meal");
                 if ( meal ) {
        		 meal.setAttribute("style", meal.getAttribute("style") + ";min-width:100px;");
                 }
        	 }
         }
    }
}

function getCountry() {
    var country = document.querySelector("#rsrvme_hc_cn_chosen span");
	return country ? country.textContent : null;
}

function getCity(td) {
	var city = document.querySelector("#rsrvme_hc_tcd_chosen span");
	return city ? city.textContent : null;
}


function getSearchButton() {
    return document.querySelector(".rsrvme_hc_show_submit");
}


function createOption(img) {
    var tr = img.parentNode.parentNode;
    var tds = tr.querySelectorAll("td");
    var hotel =  getHotelRowByImage(img);
    var option = {
        checkinDt: makeYear4Digits(tr.querySelector(".dep").textContent),
        nights: extractIntFromStr(tr.querySelector(".nights").textContent).toString(),
        hotelName:hotel.querySelector(".hotel_name").textContent,
        href: hotel.querySelector(".hotel_name").href,
        roomType: tr.querySelector(".rtype").textContent,
        region: hotel.querySelector(".resort").textContent,
        boardType:tr.querySelector(".meal").textContent,
        price: extractIntFromStr(tr.querySelector(".price_val").textContent.replace(/\s+/g, "")),
        currency: tr.querySelector(".price_cur").textContent,
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME + " / " + tr.querySelector(".operator").textContent,
        occupancy: SEARCH_CRITERIA.occupancy,
        thumbnail : hotel.querySelector(".hotel_photo_dv img").src
    };
    return option;
}

function getHotelRowByImage(img) {
	   var div = img.parentNode;
	   while ( true ) {
	      if ( div.className == "hotel_card_dv" ) {
	         break;
	      }
	      div = div.parentNode;
	   }
	   return div;
}

function getOccupancy() {
    var ac = selectedOption(document.querySelector("#rsrvme_hc_ac"));
	var occupancy = {
        adultsCount: extractIntFromStr(ac.match(/(\d)\s+взр/) ? ac.match(/(\d)\s+взр/)[1] : null),
        childrenCount: extractIntFromStr(ac.match(/\d\s+реб|\d\s+дет/) ? ac.match(/\d\s+реб|\d\s+дет/)[0] : "0"),
        childAges: null
    };
	if ( occupancy.adultsCount === null ) {
		return null;
	}
    if (occupancy.childrenCount > 0) {
        var ages = [];
        for (var i = 1; i <= occupancy.childrenCount; i++) {
            var age = extractOptionalInt(document.querySelector("#rsrvme_age" + i).value);
            if ( age === null ) {
                continue;
            }
            ages.push(age);
        }   
        occupancy.childAges = ages.join(",");
    }

    return occupancy;
}