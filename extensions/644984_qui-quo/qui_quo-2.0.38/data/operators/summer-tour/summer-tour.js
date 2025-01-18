var OPERATOR_NAME = "Summer-tour";
// //-------- Search Criteria ---------------------------
// function initializeSearchCriteria() {
// 	var country = selectedOption(document.querySelector("#ddlSearchCountry"));
// 	if ( !country )
// 		return null;
// 	var city = selectedOption(document.querySelector("#ddlSearchDeparture"));
// 	if ( !city ) {
// 		return null;
// 	}
// 	var table_o = document.querySelector(".ftab.tab02");
// 	var occupancy = getOccupancy(table_o);
// 	return { "country" : country,
// 		"city": city,
// 		"occupancy": occupancy};
// }
//
// function getSearchButton() {
// 	return document.querySelector(".SearchButtonClass input");
// }
//
// function injectData() {
// 	if ( !SEARCH_CRITERIA ) {
// 		return;
// 	}
// 	var trs = document.querySelectorAll(".results tr");
// 	if ( trs.length > 0 ) {
// 		if ( !trs[0].querySelector(".qq") ) {
// 			trs[0].appendChild(createHeaderCell());
// 		}
// 		for ( var i = 1; i < trs.length; i++ ) {
// 			if  ( trs[i].querySelector(".qq") === null && trs[i].id !== "" ) {
// 				trs[i].appendChild(createCell());
// 			}
// 		}
// 	}
// }
//
// function createHeaderCell() {
// 	var th = document.createElement("th");
// 	th.className = "qq";
// 	th.setAttribute("rowspan","2");
// 	th.appendChild(document.createTextNode("QQ"));
// 	return th;
// }
//
// function createCell() {
// 	var nobr = document.createElement("nobr");
// 	nobr.appendChild(createAddButton());
// 	nobr.appendChild(createEditButton());
//
// 	var newTh = document.createElement("td");
// 	newTh.className = "qq";
// 	newTh.appendChild(nobr);
// 	return newTh;
// }
//
// function createOption(img) {
//         var tr = img.parentNode.parentNode.parentNode;
//         var tds = querySelectorAll(tr, "td");
//         var option = {
//             checkinDt: getDate(tds[1]),
//             nights: getNights(tds[2]),
//             hotelName: getHotelName(tr, tds[4]),
//             href: getURL(tr),
//             roomType: getRoomType(tds[6]),
//             region: getRegion(tds[3]),
//             boardType: getBoardType(tds[7]),
//             price: getPrice(tds[8]),
//             currency: getCurrency(tds[8]),
//             country: SEARCH_CRITERIA.country,
//             city_from: SEARCH_CRITERIA.city,
//             operator: OPERATOR_NAME,
//             excursion: false,
//             occupancy: SEARCH_CRITERIA.occupancy
//         };
// 	return option;
// }
//
// function delDiv(td) {
// 	var div = td.querySelectorAll("div");
// 	var wDiv = td.textContent;
// 	for ( var i = 0; i < div.length; i++ ) {
// 		wDiv = wDiv.replace(div[i].textContent, "");
// 	}
// 	return wDiv.trim();
// }
//
// function getDate(td) {
// 	var match = delDiv(td).match(/\S+/g);
// 	return appendYear(match[0], monthNameToNumber(match[1]));
// }
//
// function getNights(td) {
// 	return delDiv(td).match(/\d+/g)[0];
// }
//
// function getHotelName(tr, td) {
// 	return delDiv(tr.querySelector(".hotel div"));
// }
//
// function getURL(tr) {
// 	var url = tr.querySelector(".hotel a");
// 	return url ? url.href : null;
// }
//
// function getRoomType(td) {
// 	var name = delDiv(td);
// 	var type = td.querySelector("div").textContent;
// 	return name + ", " + type;
// }
//
// function getRegion(td) {
// 	return delDiv(td).trim();
// }
//
// function getBoardType(td) {
// 	return td.textContent.trim();
// }
//
// function getPrice(td) {
// 	return extractIntFromStr(delDiv(td).match(/\d+/g)[0]);
// }
//
// function getCurrency(td) {
// 	return delDiv(td).match(/\S+/g)[1];
// }
//
// function getOccupancy(table) {
// 	var occupancy = {
// 			adultsCount: 0,
// 			childrenCount: 0,
// 			childAges: null
// 	};
// 	occupancy.adultsCount = extractOptionalInt( selectedOption(table.querySelector("#ddlSearchAdult")));
// 	occupancy.childrenCount = extractOptionalInt( selectedOption(table.querySelector("#ddlSearchChild")));
// 	if ( occupancy.adultsCount === null || occupancy.childrenCount === null ) {
// 		return null;
// 	}
// 	if ( occupancy.childrenCount > 0 ) {
// 		var ages = [];
// 		for (var i = 1; i <= occupancy.childrenCount; i++) {
// 			var age = extractOptionalInt(table.querySelector("#txtChdAge"+i).value);
// 			if ( age === null ) {
// 				return null;
// 			}
// 			ages.push(age);
// 		}
// 		occupancy.childAges = ages.join(",");
// 	}
// 	return occupancy;
// }
//
// function extractOptionalInt(text) {
// 	return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
// }
