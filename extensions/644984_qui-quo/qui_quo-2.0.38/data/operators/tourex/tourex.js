var OPERATOR_NAME = "Tourex.me";
//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {
   var occupancy = getOccupancy();
   return {
      "occupancy": occupancy
   };
}

function getSearchButton() {
   return document.querySelector(".btn btn-default.go");
}

function injectData() {
   var tours = document.querySelectorAll(".tour_item");
   Array.fromList(tours).forEach(function (node) {
      var sub = node.querySelectorAll(".suboffer");
      var check =  node.querySelector(".price");
      if (check !== null && node.querySelector(".qq") === null && sub.length === 0 ) {
    	  check .appendChild(createCell());
      }	
	  if ( node.querySelector(".qq") === null && sub.length > 0 ) {
         Array.fromList(sub).forEach(function (node_sub) {  
		 var rows = node_sub.querySelectorAll(".row.tour_offer_set");
		    Array.fromList(rows).forEach(function (row) {    
			var check2 = row.querySelector(".row");
		    	if (check2 !== null && row.querySelector(".qq") === null ) {
		    		check2.appendChild(createCell());
	        }  
			}); 
		 });
	 
      }
	 }); 
}


function createCell() {
   var newDiv = document.createElement("div");
   newDiv.className = "qq";
   newDiv.appendChild(createAddButton());
   newDiv.appendChild(createEditButton());
   return newDiv;
}

function createOption(img) {
   var tr = img.parentNode.parentNode.parentNode.parentNode;
   if ( tr.classList.contains("tour_item") ) {
	   return createSingleOption(img);
   }
   var tour_item = getHotelRowByImage(img);
   var option = {
      checkinDt: getDate(tr, ".dates_m"),
      nights: getNights(tour_item),
      hotelName: getTourName(tour_item),
      href: getURL(tour_item),
      roomType: getRoom(tr),
      region: getRegion(tour_item),
      boardType: getBoard(tr),
      price: getPrice(tr, ".col-md-6.col-xs-12"),
      currency: "RUB",
      country: tour_item.querySelector(".tour_country").textContent.split(",")[0],
      city_from: "",
      operator: OPERATOR_NAME,
      comment: getComment(tr, tour_item),
      excursion: true,
      thumbnail: getImg(tour_item),
      occupancy: SEARCH_CRITERIA.occupancy
   };
   return option;
}

function getHotelRowByImage(img) {
   var div = img.parentNode;
   while ( true ) {
      if ( div.className == "tour_offer_set row tour_item" ) {
         break;
      }
      div = div.parentNode;
   }
   return div;
}

function getDate(tr ,sel) {
   var date = tr.querySelector(sel).textContent.match(/\d{2}.\d{2}.\d{4}/g)[0];
   return date;
}

function getNights(tour_item) {
	return tour_item.querySelector(".tour_nights").textContent.toString();
}

function getRoom(item) {
   var sel_all = item.querySelectorAll(".tour_hotel, .tour_acc, .tour_acc_desc");	
   var stars = item.querySelector(".tour_stars") ? item.querySelector(".tour_stars").textContent : "";
   var room = Array.fromList(sel_all).map(function (node) {    
      if ( node.className !== "tour_hotel" ) {
	     return node.textContent;
	   } else {
		   return node.textContent + "(" + stars + "*)";
		 }  
		}).join(", "); 
   return room;  
}

function getTourName(item) {
   return item.querySelector(".tour_name").textContent;	
}

function getBoard(tr) {
   var split = tr.querySelector(".tour_food") ? tr.querySelector(".tour_food").innerText : "";
   return split;
}

function getURL(tour_item) {
	var url = tour_item.querySelector(".i_more");
	return url ? url.href : null;
	
}

function getRegion(tour_item) {
	return tour_item.querySelector(".tour_route").textContent;
}

function getPrice(tr, sel) {
   var col = tr.querySelector(sel);
   var price = col.textContent.split(col.querySelector(".rbl").textContent)[0].match(
      /\d+/g).toString();
   return extractIntFromStr(price.replace(/,/g, ""));
}

function getComment(tr, tour_item) {
   var dates = tr.querySelectorAll(".tour_dates p");
   var comment = [];
   if ( dates.length !== 0 ) {    
   for ( var chr = 0; chr < 3; chr++ ) {
	   if ( dates[chr] ) {
	       comment.push(dates[chr].textContent.replace(/,/g, ""));
	   }
   } } else {
            dates = tr.querySelector(".tour_dates");
            comment.push(dates.textContent.replace(/,/g, ""));
     } 
   var com_dates = comment.join(", ");
   var com_desc = tour_item.querySelector(".tour_desc").textContent;
   if ( comment.length > 3 ) {
	   return  "Возможные даты заезда: " + com_dates + " и другие. \n " + com_desc;
   }
   if ( comment.length > 1 ) {
	   com_dates =  "Возможные даты заезда: " + comment.join(", "); 
	   return com_dates + ". \n " + com_desc;
   }
   if ( comment.length === 1 &&  comment[0].length > 20 ) {
	   com_dates =  "Возможные даты заезда: " + comment.join(", "); 
	   return com_dates + ". \n " + com_desc;   
   }
   return com_desc;
}

function getImg(tour_item) {
	return tour_item.querySelector(".photo_item img") ? tour_item.querySelector(".photo_item img").src : null;	
}

function getOccupancy() {
   var sel = document.querySelectorAll(".col-xs-6");
   var occupancy = {
      adultsCount: 0,
      childrenCount: 0,
      childAges: null
   };
   if ( sel.length < 2 ) {
	   return null;
   }
   occupancy.adultsCount = extractOptionalInt(sel[0].textContent);
   occupancy.childrenCount = extractOptionalInt(sel[1].textContent);
   if ( occupancy.adultsCount === null || occupancy.childrenCount === null ) {
      return null;
   }
   if ( occupancy.childrenCount > 0 ) {
      var ages = [];
      for ( var i = 2; i < sel.length; i++ ) {
         var age = extractOptionalInt(sel[i].textContent);
         if ( age === null ) {
            return null;
         }
         ages.push(age);
      }
      occupancy.childAges = ages.join(",");
   }
   return occupancy;
}

function extractOptionalInt(text) {
   return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function createSingleOption(img) {
   var tour_item = getHotelRowByImage(img);
   var option = {
       checkinDt: getDate(tour_item, ".tour_dates"),
	   nights: getNights(tour_item),
	   hotelName: getTourName(tour_item),
	   href: getURL(tour_item),
	   roomType: getRoom(tour_item) +
	             tour_item .querySelector(".accomodation span").textContent.match(/размещении в .+/)[0].replace("размещении в ", ""),
	   region: getRegion(tour_item),
	   boardType: getBoard(tour_item),
	   price: getPrice(tour_item, ".price" ),
	   currency: "RUB",
	   country: tour_item.querySelector(".tour_country").textContent.split(",")[0],
	   city_from: "",
	   operator: OPERATOR_NAME,
	   comment: getComment(tour_item, tour_item),
	   excursion: true,
	   thumbnail: getImg(tour_item),
	   occupancy: SEARCH_CRITERIA.occupancy
	   };
	   return option;
}