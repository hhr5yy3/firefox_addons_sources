var OPERATOR_NAME = "DVM";
//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {    
	   return null;
}

function getSearchButton() {
	return null;
}

function injectData() {
   var choice = document.querySelector(".cost-choise");
   if ( choice ){ 
   	  if ( !choice.querySelector(".cost-choise-button") ) {
   		  return;
   	  } 
   	if ( !choice.querySelector(".qq") ) {
   		choice.querySelector(".cost-choise-content").appendChild(createCell(createChoiceOption)); 
   	}      
   }
   if ( !choice  ){
      var table = document.querySelector("#tabs .prices_table");
      if ( table ){
      var price_cells = table.querySelectorAll(".prices_table_tour_price_cell");
      for ( var i = 0; i < price_cells.length; i++ ) {
         if ( !price_cells[i].querySelector(".qq") && price_cells[i].querySelector("a")) {
		    price_cells[i].appendChild(createCell(createOption)); 
		 }
	  }
     }
   }
    var headTr = document.querySelector("table.tours thead tr");
   if ( headTr && !headTr.querySelector(".qq") ) {
       headTr.append(createHeader());
   }
    querySelectorAll(document, "table.tours tbody tr").filter( tr => { return  tr.dataset["tourkey"] } )
        .forEach( tr => {
            if ( !tr.querySelector(".qq") ) {
                tr.append(createCell(createTourSearchOption));
            }
        });

}

function createHeader() {
    var newTh = document.createElement("th");
    newTh.className = "qq";
    newTh.style.setProperty("color", "white");
    var newContent = document.createTextNode("QQ");
    newTh.appendChild(newContent);
    return newTh;
}

function createCell(action) {
	   var newDiv = document.createElement("div");
	   newDiv.appendChild(createAddButton(action));
	   newDiv.appendChild(createEditButton(action));
	   newDiv.className = "qq";
	   return newDiv;
}

function createOption(img) {  
	var hotel = img.parentNode.parentNode.parentNode.parentNode;
	var tds = hotel.querySelectorAll("td");
	
	var option = {
	    		    checkinDt :getDate(),
	    	        nights : getNights(), 
	    	        hotelName : getHotelName(tds[1], tds[0]),
	    	        href : getUrl(tds[1]),
	    	        roomType: tds[2].textContent,
	    	        region : getRegion(),
	    	        boardType : getBoardType(tds[3]),
	    	        price : getPrice(img),
	    	        currency : getCurrency(),
	    	        country:  getCountry(),
	    	        city_from: getCity(), 
	    	        operator: OPERATOR_NAME,	
	    	        excursion: true,
	    };

	   return option;
}

function getDate() {
	   return document.querySelector("#tour_prices_datepicker").value;
}

function getNights() {
    var nights = document.querySelector("[checked].tour_prices_nights").value;
	return nights.toString();
}

function getHotelName(star, td) {
    return 	star.textContent + " " + td.textContent + "*";
}

function getUrl(td){
	var a = td.querySelector("span a");
	var href = a ? a.href : "";
	return href;
}

function getRegion() {
	var region = document.querySelector("#fl_arrcity_head").querySelector(".sel");
	return region ? region.textContent: "";
}

function getBoardType(td) {
	var type = td.querySelector("span");
	var comment = td.querySelector(".comment");
	return type.textContent + (comment ? ", " + comment.textContent : "");
}

function getPrice(img) {
   return extractIntFromStr(img.parentNode.parentNode.querySelector("a").textContent.match(/\d+/g).toString().replace(",",""));
}

function getCurrency() {
	var span = document.querySelector("#currensy_info");
	var zs = span.querySelectorAll("z");
	for ( var i = 0; i < zs.length; i++ ) {
		if ( zs[i].style.display !== "none" ) {
			return mapCurrency(zs[i].textContent);
		}
	}
}

function mapCurrency(z) {
    switch ( z ) {
        case "евро": return "EUR";
        case "рублях": return "RUB";
        default: return z;
    }
}

function getCountry() {
	return document.querySelector(".selectedMenuItem h2").textContent;
}


function getCity() {
    var city = document.querySelector("#fltbl tbody tr");
	if ( !city ) {
		var info = document.querySelector(".i_left");
		if ( !info ) {
			return "";
		}
		var avia = document.querySelector(".i_left ul li").textContent;
		var s = avia.match(/Авиаперелёт (\S+)/);
		return s ? s[1] : "";
	}
	city = city ? city.textContent.match(/(\S+)\s+—\s+\S+/) : null;
    return city ? city[1] : null;
}

function createChoiceOption(img) {  
   var choises = document.querySelector(".cost-choise-content li");
	var option = {
	    		    checkinDt :getDate(),
	    	        nights : getChNights(), 
	    	        hotelName : document.querySelector(".h1.head_spo").textContent,
	    	        href : document.querySelector(".h2-cost a").href,
	    	        roomType: getChRoomType(choises),
	    	        region : getRegion(),
	    	        boardType : getChBoardType(choises),
	    	        price : extractIntFromStr(document.querySelector(".totalcost").textContent.match(/\d+/g).toString().replace(",","")),
	    	        currency : "EUR",
	    	        country:  getCountry(),
	    	        city_from: getCity(), 
	    	        operator: OPERATOR_NAME,	
	    	        excursion: true,

	    };

   return option;
}

function getChRoomType(li) {
   var rooms = li.textContent.split("+");
   var all = [];
   for ( var i =0; i < rooms.length; i++ ) {
	   all.push(rooms[i].split(",")[0]);
   }
   return all.join(", ");
}

function getChBoardType(li) {
	   var boards = li.textContent.split("+");
	   var all = [];
	   for ( var i =0; i < boards.length; i++ ) {
		   all.push(boards[i].split(",")[1].match(/(\D+)\(/)[1].trim());
	   }
	   return all.join(", ");	
}

function getChNights() {
   // var nights = document.querySelector("[checked].tour_prices_nights").value; почему то на этой странице атрибут checked не переходит на выбранный инпут, мб пофиксят 
	var nights = document.querySelector(".cost-choise-content p").textContent.match(/\d+ н/g);
	var sum = 0;
	if ( nights) {
	for ( var i = 0; i < nights.length; i++) {
		sum += extractIntFromStr(nights[i]);
	}	
	}
	return sum.toString();
}

function createTourSearchOption(img) {
    var tr = getHotelRowByImage(img);
    var price =  tr.querySelector(".price");
    var option = {
        checkinDt : getNodeProperty(tr.querySelector(".sorting_near_date_td")),
        nights : getNodeProperty(tr.querySelector(".sorting_duration_td")).replace(/\D+/, ""),
        hotelName : getTourSearchHotel(tr)[0],
        href : getTourSearchHotel(tr)[1],
        roomType: getTourSearchRoomBoard(tr)[0],
        region : getNodeProperty(tr.querySelector(".sorting_arr_city"),"", "innerText").replace(/\n/, ", "),
        boardType : getTourSearchRoomBoard(tr)[1],
        price : extractIntFromStr(price.querySelector("span").textContent),
        currency : price.querySelector(".currency").textContent,
        country:  document.querySelector("#country_new").getAttribute("placeholder"),
        city_from: document.querySelector("#type_new").getAttribute("placeholder") === "с перелетом" ? document.querySelector("#depcity_new").getAttribute("placeholder") : "",
        operator: OPERATOR_NAME,
        comment: [getNodeProperty(tr.querySelector(".sorting_name_td")), getNodeProperty(document.querySelector(".header.hdr_price"))].filter(t=>t).join(", ")
    };

    return option;
}

function getTourSearchHotel(tr) {
    var hotel = tr.querySelector(".hotel_description span");
    var a = hotel.querySelector("a");
    return a ? [a.textContent, a.href] : [ hotel.textContent.split(",")[0], null ];
}

function getTourSearchRoomBoard(tr) {
    var small = getNodeProperty(tr.querySelector(".hotel_description.qt_query span:last-child small"), "").split(",");
    return [small[0], small.length > 1 ? small[1] : ""];
}

function getHotelRowByImage(img) {
    var tr = img.parentNode;
    while ( tr ) {
        if ( tr.tagName === "TR" ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}