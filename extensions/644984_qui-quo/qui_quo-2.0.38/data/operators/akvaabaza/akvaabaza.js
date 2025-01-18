window.OPERATOR_NAME = "АКВА-Абаза";
window.showTopHotelsRating = false;
//
//
// // -------- Search Criteria ---------------------------
//
// function getCountry() {
// 	var country =  document.querySelector("#s2id_countryTo a");
//     return country ? country.textContent.trim() : null;
// }
//
// function getOccupancy() {
// 	var occupancy = {
// 			adultsCount: 0,
// 			childrenCount: 0,
// 			childAges: null
// 		};
//
//     var s = document.querySelector("#s2id_adults a");
//     if ( !s )
//     	return null;
//     occupancy.adultsCount = extractIntFromStr(s.textContent);
//
//     s = document.querySelector("#s2id_childs a");
//     if ( !s )
//     	return null;
//     occupancy.childrenCount = extractIntFromStr(s.textContent);
//
//     if ( occupancy.childrenCount > 0 ) {
//     	var ages = [];
//         s = document.querySelector("#s2id_ageFrom a");
//         if ( !s )
//         	ages.push("9");
//         else if ( s.textContent.match(/(\d+)/) )
//         	ages.push(extractIntFromStr(s.textContent));
//         else
//         	ages.push("9");
//
//         if ( occupancy.childrenCount > 1 ) {
//             s = document.querySelector("#s2id_ageTo a");
//             if ( !s )
//             	ages.push("9");
//             else if ( s.textContent.match(/(\d+)/) )
//             	ages.push(extractIntFromStr(s.textContent));
//             else
//             	ages.push("9");
//         }
//
//     	occupancy.childAges = ages.join(",");
//     }
//
//     return occupancy;
// }
//
// function initializeSearchCriteria() {
// 	var country = getCountry();
// 	var occupancy = getOccupancy();
//
// 	if ( !country || !occupancy) {
// 		return null;
// 	}
//
// 	return { country: country, occupancy : occupancy };
// }
//
// function getSearchButton() {
// 	return document.querySelector("#btnSearch");
// }
//
// //--------- Rows ---------------------------------
//
// function injectData() {
//     var tbl = document.querySelector("#searchResult")
//     if ( tbl == null ) {
//         return;
//     }
//
//     var thead = tbl.querySelector("thead > tr");
//     if ( thead != null && thead.querySelector("th.qq") == null ) {
//         var th = document.createElement("th");
//         th.className = "qq";
//         th.setAttribute("rowspan", "3");
//         th.appendChild(document.createTextNode("QQ"));
//         thead.appendChild(th);
//     }
//
//     var trs = tbl.querySelectorAll("tbody > tr.tbl-row");
//     for (var i = 0; i < trs.length; ++i) {
//         if ( trs[i].querySelector("td.qq") == null && trs[i].querySelectorAll("td").length > 6 ) {
//             var rowspan = trs[i].querySelector("td[rowspan]");
//             if ( rowspan ) {
//                 var nobr = document.createElement("nobr");
//                 rowspan = rowspan.getAttribute("rowspan");
//                 nobr.appendChild(createAddButton());
//                 nobr.appendChild(createEditButton());
//
//                 var td = document.createElement("td");
//                 td.setAttribute("rowspan", rowspan);
//                 td.className = "qq";
//                 td.appendChild(nobr);
//
//                 trs[i].appendChild(td);
//             }
//         }
//     }
// }
//
// //--------- Option ---------------------------------
//
// function extractHotelUrl(td) {
//     var anchor = td.querySelector("div.hotel-text a");
//     return anchor == null ? "" :  anchor.href;
// }
//
// function extractPrice(td) {
// 	return extractIntFromStr(td.querySelector("div.price").textContent.replace(/[^\d]/g, ""));
// }
//
// function extractCheckinDate(td) {
// 	var m = td.textContent.match(/(\d\d)\.(\d\d)/);
// 	return appendYear(extractIntFromStr(m[1]), extractIntFromStr(m[2]));
// }
//
// function extractNights(td) {
// 	return td.textContent.match(/(\d+)\s+ноч/)[1];
// }
//
// function extractHotelName(td) {
// 	return td.querySelector("div.hotel-text").textContent;
// }
//
// function extractRegion(td) {
// 	return td.querySelector("span.subtext").textContent;
// }
//
// function extractRoomType(td) {
// 	var nodes = td.querySelectorAll("b, span");
// 	var arr = Array.prototype.slice.call(nodes);
// 	return arr.map(function(el) {return el.textContent;}).join(" / ");
// }
//
// function createOption(img) {
// 	var tds = getChildElementsByTagName(img.parentNode.parentNode.parentNode, "td");
//
//     var option = {
//         hotelName : extractHotelName(tds[1]),
//         href : extractHotelUrl(tds[1]),
//         region : extractRegion(tds[1]),
//         roomType: extractRoomType(tds[2]),
//         checkinDt : extractCheckinDate(tds[0]),
//         nights : extractNights(tds[0]),
//         boardType : trim(tds[3].textContent),
//         price : extractPrice(tds[4]),
//         currency : "RUB",
//         country: SEARCH_CRITERIA.country,
//         city_from: "",
//         occupancy: SEARCH_CRITERIA.occupancy
//     };
//
//     return option;
// }
