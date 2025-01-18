var OPERATOR_NAME = "КРУГОЗОР";
//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {    
	return null;
}

function getSearchButton() {
	return document.querySelector("#btn-search-exc");
}

function injectData() {
	if ( !document.querySelector("#ExcSearchPage") ) {
		return null;
	}
	var boxes = document.querySelectorAll(".box .blok-price-");
	for ( var i = 0; i < boxes.length; i++ ) {
		if ( !boxes[i].querySelector(".qq") && !boxes[i].parentNode.parentNode.parentNode.querySelector(".date").textContent.match(/уведомить о появлении/) ) {
			boxes[i].appendChild(createCell());
		}
	}
}



function createCell() {
 var newSpan = document.createElement("span");
 newSpan.appendChild(createAddButton());
 newSpan.appendChild(createEditButton());
 newSpan.className = "qq"; 
 return newSpan;
}


function createOption(img) {
	var box = getHotelRowByImage(img);  
	var option = {
			checkinDt :getDate(box),
			nights : getNights(box)[0], 
			hotelName : getHotelName(box),
			href : getURL(box),
			roomType: getNights(box)[1],
			region : getRegion(box),
			boardType : "",
			price : getPrice(box),
			currency : "RUB",
			country:  getCountry(box),
			city_from: "", 
			operator: OPERATOR_NAME,	
			comment: getComment(box),
			excursion: true,
			thumbnail: getImg(box)
	}
	return option;
}

function getDate(box) {
   var full_date = box.querySelector(".date").textContent.match(/(\d+)\s+(\S+)\s+(\d+)/);
   return dayMonthYearToString(extractIntFromStr(full_date[1]), monthNameToNumber(full_date[2]), full_date[3]);
}

function getNights(box) {
	var text = box.querySelector(".departure").textContent.trim();
	var dep = text.match(/(\d+)\s+(ДН\S+)+/i);
	if ( dep ) {
		return   [(extractIntFromStr(dep[1])-1).toString(),""];
	};	
	return ["0",text.replace("Продолжительность","Продолжительность: ")];
}

function getHotelName(box) {
   return  box.querySelector(".box-title a").textContent;
}

function getURL(box) {
	return  box.querySelector(".box-title a").href;
}

function getRegion(box) {
	return  box.querySelector(".city").textContent;
}

function getPrice(box) {
   return extractIntFromStr(box.querySelector(".price").textContent.replace(/\D+/g,""));
}

function getCountry(box) {
	return  box.querySelector(".country").textContent;
}

function getComment(box) {
   var comment = box.querySelector(".revie-w span");
   return comment ? comment.textContent.trim() : null;
}

function getImg(box) {
   var image = box.querySelector(".img_list img");
   return image ? image.src : null;
}


function getHotelRowByImage(img) {
	var div = img.parentNode;
	while (true) {
		if ( div.className === "box") {
		    break;
		}
		div = div.parentNode;
	};
	return div;
}