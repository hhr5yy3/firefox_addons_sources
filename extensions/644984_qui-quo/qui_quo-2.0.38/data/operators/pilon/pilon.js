// Samo-tour
var OPERATOR_NAME = "Pilon";

//
// function getTable() {
//     return document.querySelector("table#TibetPriceList");
// }
//
// //-------- Search Criteria ---------------------------
//
// function getCountry() {
//     return selectedOption(document.querySelector("select#i_country"));  
// }
//
// function initializeSearchCriteria() {
// 	var country = getCountry();
//     if ( !country )
//         return null;
//
//     return {
//         "country" : country
//     };
// }
//
// function getSearchButton() {
// 	return document.querySelector("input#btnSearch");
// }
//
// // --------- Rows ---------------------------------
//
// function mapAirport(text) {
//     switch (text.toUpperCase()) {
//         case "KBP" : return "Киев";
//     }
//
//     return text;
// }
//
// function getCity(td) {
//     var text = "";
//
//     if (td) {
//         text = td.textContent;
//     }
//
//     if ( /[A-Z]{3}/i.test(text) ) {
//         var c = text.match(/(\S+)-/);
//         return c && c[1] ? mapAirport(c[1]) : text;
//     } else
//     if ( /АВТОБУС/i.test(text) ) {
//         return text;
//     }
//
//     return "";
// }
//
// function mapCurrency(s) {
//     var c = trim(s).toUpperCase();
//     switch (c) {
//         case "ГРН": return "UAH";
//         case "EURO": return "EUR";
//     }
//     return c;
// }
//
// function extractDate(td) {
// 	return td.textContent.trim();
// }
//
// function extractHotelName(td) {
//     var match = td.textContent.match(/(.*)\s-\s/);
//     return match ? trim(match[1]) : trim(td.textContent);
// }
//
// function extractHotelUrl(td) {
//     return "";
// }
//
// function extractRegion(td) {
//     var regions = document.querySelectorAll("ul#ulcity li");
//     var regExStr = regions[0].textContent.trim();
//     for ( var i = 1; i < regions.length; ++i ) {
//         regExStr += "|" + regions[i].textContent.trim();
//     };
//     var match = td.textContent.match(regExStr);
//
//     return match ? match[0] : td.textContent.trim();
// }
//
// function extractRoomType(td) {
//     return trim(td.textContent);
// }
//
// function extractPrice(td) {
//     return extractIntFromStr(td.textContent.replace(/[^\d]/g, ""));
// }
//
// function extractCurrency(td) {
//     return mapCurrency(td.textContent.replace(/[\s\d]/g, ""));
// }
//
// function extractNights(td) {
//     return td.textContent.trim();
// }
//
// function extractBoardType(td) {
//     var match = td.textContent.match(/\s-\s(.*)/);
//     return match ? match[1].trim() : "";
// }
//
// function createOption(img) {
//     var row = img.parentNode.parentNode.parentNode;
//     var tds = row.querySelectorAll("td");
//     var ths = querySelectorAll(getTable(), "th");
//
//     var option = {
//         checkinDt : extractDate( tds[findIndex(ths, [/Периодтура/i, /Начало тура/i])] ),
//         hotelName : extractHotelName( tds[findIndex(ths, /Отель/i)] ),
//         href : extractHotelUrl( tds[findIndex(ths, /Отель/i)] ),
//         region : extractRegion( tds[findIndex(ths, /Направлениегород/i)] ),
//         roomType: extractRoomType( tds[findIndex(ths, /НомерРазмещение/i)] ),
//         boardType : extractBoardType( tds[findIndex(ths, /Отель/i)] ),
//         price : extractPrice( tds[findIndex(ths, /Ценапакета/i)] ),
//         currency : extractCurrency( tds[findIndex(ths, /Ценапакета/i)] ),
//         nights: extractNights( tds[findIndex(ths, /Ночей/i)] ),
//         country: SEARCH_CRITERIA.country,
//         city_from: getCity(tds[findIndex(ths, /Прямойрейс/i)]),
//     };
//
//     return option;
// }
//
// function createHeader() {
//     var newTh = document.createElement("th");
//     newTh.className = "qq";
//     var newContent = document.createTextNode("QQ");
//     newTh.appendChild(newContent);
//     return newTh;
// }
//
// function createCell(tds) {
//     var nobr = document.createElement("nobr");
//     nobr.appendChild(createAddButton());
//     nobr.appendChild(createEditButton());
//    
//     var newTd = document.createElement("td");
//     newTd.className = "qq";
//     newTd.appendChild(nobr);
//    
//     return newTd
// }
//
// function injectData() {
//     var table = getTable();
//     if ( table == null ) {
//         return;
//     }
//
//     var header = table.querySelector('thead tr');
//
//     if ( header && header.querySelector("th.qq") == null ) {
//         header.appendChild(createHeader()); 
//     }
//
//     var trs = table.querySelectorAll("tbody tr");
//
//     for (var i = 1; i < trs.length; ++i) {  
//         if ( trs[i].querySelector("td.qq") == null ) {
//             trs[i].appendChild(createCell())
//         }
//     }
// }
//
// function findIndex(ths, captions) {
//     if ( typeof  (captions) === "string" || captions.constructor === RegExp ) {
//         captions = [captions];
//     }
//     var index = ths.findIndex(function (th) {
//         if (captions.some(function (caption) {
//                 if (th.textContent.match(caption)) {
//                     return true;
//                 }
//             })) {
//             return true;
//         }
//         return false;
//     });
//     return index;
// }
