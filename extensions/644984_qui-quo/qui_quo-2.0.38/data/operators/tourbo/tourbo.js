var OPERATOR_NAME = "tourbo";

//-------- Search Criteria ---------------------------

function getSearchButton() {
	return null;
}

function initializeSearchCriteria() {
   return null;
}

function getCity() {
	return selectedOption(document.querySelector(".form-control.input-medium"));
}

function getOccupancy() {
   var occupancy = {
          adultsCount: 1,
          childrenCount: 0,
          childAges: null 
      	}
   var all = document.querySelector(".people-select");
	  if ( !all ) {
		  return;
	  }
   var kids = all.querySelectorAll(".is-kid"); 
   var adults = all.querySelectorAll(".is-adult");
   if ( kids.length ===  0 || adults.length === 0) {
		return null;	
   }
   occupancy.adultsCount = adults.length - 1; 
   occupancy.childrenCount = kids.length  - 1;
   if ( occupancy.childrenCount > 0 ) {
		var ages = []
		for ( var i = 0; i < occupancy.childrenCount; i++ ) {
			var age = all.querySelectorAll(".is-kid")[i].querySelector(".people-select-person-age");
			if ( age ){
				ages.push(extractOptionalInt(age.textContent) ? extractOptionalInt(age.textContent) : "0");	
			}
		}
	occupancy.childAges = ages.join(",");
   }
   return occupancy;
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}
//--------- Rows ---------------------------------
function injectData() {
	var cell = document.querySelectorAll(".suboffer__checkbox-column ,.offer__checkbox-column");
	 for ( var i = 0; i < cell.length; i++ ) {
		 if ( !cell[i].querySelector(".qq")  ) {	
			 cell[i].appendChild(createCell()); 
	 }}
}

function createCell() {
	  var nobr = document.createElement("nobr");;
	  nobr.appendChild(createAddButton());
	  nobr.appendChild(createEditButton());   

	  var div = document.createElement("div");
	  div.className = "qq";
	  div.appendChild(nobr);
	  return div;
	}

function createOption(img) {
	var main = getHotelRowByImageCustom(img, "offer", "offer" ).querySelector(".offer__row");
	var row = getHotelRowByImage(img);
	var option = {
        checkinDt: getDate(row),
        nights: getNights(row),
        hotelName: main.querySelector(".hotel-info__name").textContent,
        href: main.querySelector(".hotel-info").href,
        roomType: row.querySelectorAll(".tour-info div")[0].textContent,
        region: main.querySelector("a.hotel-info__location").textContent.split(",")[0],
        boardType: row.querySelectorAll(".tour-info div")[1].textContent,
        price: getPrice(row),
        currency: getCurrency(row),
        country: "",
        city_from: getCity(),
        operator: getOperator(row),
        occupancy: getOccupancy(),
        comment: getComment(row),
        thumbnail : getImage(main)
    }
    return option;
}

function getHotelRowByImageCustom(img, sel1, sel2) {
   var div = img.parentNode;
   while ( true ) {
      if ( div.className == sel1 || div.className == sel2) {
          break;
	  }
	      div = div.parentNode;  
   }
   return div;
}

function getHotelRowByImage(img) {
   return getHotelRowByImageCustom(img, "offer__row", "suboffer__row");
}

function getDate(row) {
	var date = row.querySelectorAll(".tour-info div")[2].textContent.match(/(\d{2}).(\d{2})/);
	return appendYear(extractIntFromStr(date [1]), extractIntFromStr(date [2]));	
}

function getNights(row) {
	var nights = row.querySelectorAll(".tour-info div")[2].textContent.split("→")[1].match(/\d+/)[0];
	return nights.toString();
}

function getPrice(row) {
	var trueprice = delTimeDiv(row, /\D+/g, /\d+/g);	
	return extractIntFromStr(trueprice);
}
 
function getCurrency(row) {
	var map = delTimeDiv(row, /\s+/g, /\D+/g).toString();
		switch (map) {
		case "€": return "EUR";
		case "руб": return "RUB";
		case "$": return "USD";
		default: return map;
	    }	
}

function delTimeDiv(row, replc_reg, match_reg) {
	var time = row.querySelector(".price-original__timestamp");
	var price = row.querySelector(".price-original");
	var text = time ? price.textContent.replace(time.textContent, "").replace(replc_reg, "").match(match_reg)[0]
	           : price.textContent.replace(replc_reg, "").match(match_reg)[0];
	return text;	
}
function getOperator(row) {
	var operator = row.querySelector("._3NaMc") ? row.querySelector("._3NaMc") : row.querySelector("._1Eh7c");
	return operator ? operator.title : null;	
}

function getImage(main) {
 var image = main.querySelector("div.hotel-photos__main");
 return image ? image.style.backgroundImage.slice(5, -2).split("?")[0] : null;
}

function getComment(row) {
	var com = row.querySelector("div.suboffer__request-notice");
	return com ? com.textContent : null;
}