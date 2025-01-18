var OPERATOR_NAME = "panukraine";
//-------- Search Criteria ---------------------------
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

function getSearchButton() {
    return document.querySelector("form[action='/ru/search_pack/search'] .btn.btn-primary");
}

function injectData() {
    var table = document.querySelector("#search_results table");
    var head = table ? table.querySelector("thead tr") : null;
    if (head !== null && head.querySelector(".qq") === null) {
        head.appendChild(createHeaderCell());
    }
    querySelectorAll(table, "tbody tr.result, tbody tr.subresult").forEach(function (tr) {
        if (tr !== null && tr.querySelector(".qq") === null) {
            tr.appendChild(createCell(createOption));
        }
    });
    querySelectorAll(document, ".row.result .pseudolink.tour-details").forEach(function (tr) {
        if (tr.parentNode !== null && tr.parentNode.querySelector(".qq") === null) {
            tr.parentNode.appendChild(createListCell(createListOption));
        }
    });
}

function createCell(action) {
    var nobr = document.createElement("nobr");
    nobr.appendChild(loadAsyncInfo(createAddButton(action)));
    nobr.appendChild(loadAsyncInfo(createEditButton(action)));
    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.appendChild(nobr);
    return newTd;
}

function createListCell(action) {
    var newDiv = document.createElement("div");
    newDiv.className = "qq";
    newDiv.style = "float: right;width: 40%;";
    newDiv.appendChild(loadAsyncInfo(createAddButton(action)));
    newDiv.appendChild(loadAsyncInfo(createEditButton(action)));
    return newDiv;
}

function createHeaderCell() {
    var th = document.createElement("th");
    th.className = "qq";
    th.appendChild(document.createTextNode("QQ"));
    return th;
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var tds = querySelectorAll(tr, "td");
    var resultTr = getResultTr(tr);
    var resultTrTds = querySelectorAll(resultTr, "td");
    var ths = querySelectorAll(resultTr.parentNode.parentNode, "thead th");
    var hotel = getHotelName(tr);
    var option = {
        checkinDt: resultTrTds[findIndex(ths, [/Дата/i, /Date/i])].textContent.match(/\d{2}\.\d{2}\.\d{4}/)[0],
        nights: extractIntFromStr(tds[findIndex(ths, [/ночей/i, /nights/i])].textContent).toString(),
        extra_nights: getExtraNights(tds[findIndex(ths, [/ночей/i, /nights/i])].textContent),
        hotelName: hotel[0] + hotel[1],
        href: tr.getAttribute("hotel-url"),
        roomType: tds[findIndex(ths, [/Размещение/i, /Розміщення/i, /Accommodation/i])].textContent.trim(),
        region: tds[findIndex(ths, [/Город/i, /Місто/i, /City/i])].textContent.replace(hotel[0], "").trim(),
        boardType: getBoardType(tds[findIndex(ths, [/Питание/i, /Харчування/i, /Meal/i])], tr),
        price: getPrice(tds[findIndex(ths, [/Цена/i, /Ціна/i, /Price/i])]),
        currency: getCurrency(tds[findIndex(ths, [/Цена/i, /Ціна/i, /Price/i])]),
        country: SEARCH_CRITERIA.country,
        city_from: getCityFrom(resultTrTds[findIndex(ths, [/Перелёт/i, /Переліт/i, /Flight/i])], resultTr),
        excursion: false,
        operator: OPERATOR_NAME,
        occupancy: SEARCH_CRITERIA.occupancy
    };

    return option;
}

function getExtraNights(text) {
    var extraNights = text.match(/\+(\d+)/);
    return extraNights ? extraNights[1]+"" : "0";
}

function getHotelName(tr) {
    var hotel = tr.querySelector(".hotel-name");
    var stars = hotel.querySelectorAll(".fa-star").length;
    return [hotel.textContent.trim(), " " + stars+"*"];
}

function getBoardType(td, tr) {
    var attr = tr.getAttribute("hotels-info");
    var span = td.querySelector("span");
    var title = span ? ", " + span.getAttribute("data-original-title") : "";
    var board = td.textContent.trim() + title;
    if (attr) {
        return JSON.parse(attr).boardType.replace(/\s\/\s$/, "");
    }
    return board;
}

function getPrice(td) {
    return extractIntFromStr(checkOriginal(td).querySelector(".price").textContent);
}

function getCurrency(td) {
    return checkOriginal(td).querySelector(".currency").textContent;
}

function checkOriginal(td) {
    var orig = td.querySelector(".original-price");
    var converted = td.querySelector(".converted-price");
    if (orig.style.display !== "none" || orig.style.display === "") {
        return orig;
    } else {
        return converted;
    }
}

function getCountry() {
    return selectedOption(document.querySelector("#f_c"));
}

function getCity() {
    return selectedOption(document.querySelector("#f_cfr"));
}

function getCityFrom(td, tr) {
    var flight = td.querySelector(".fa-plane");
    var regexp = new RegExp(/Перелёт включён|Переліт включений|Flight included/i);
    var attr = flight.hasAttribute("data-original-title") ? "data-original-title" : "title";
    if ( flight.getAttribute(attr).match(regexp) ) {
        if (tr.getAttribute("city-from")) {
            return tr.getAttribute("city-from");
        }
        return SEARCH_CRITERIA.city;
    }
    return "";
}

function findIndex(ths, captions) {
    if ( typeof  (captions) === "string" || captions.constructor === RegExp ) {
        captions = [captions];
    }
    var index = ths.findIndex(function (th) {
        if (captions.some(function (caption) {
                if (th.textContent.match(caption)) {
                    return true;
                }
            })) {
            return true;
        }
        return false;
    });
    return index;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 2,
        childrenCount: 0,
        childAges: null
    };

    occupancy.adultsCount = extractOptionalInt(selectedOption(document.querySelector("#adts")));
    occupancy.childrenCount = extractOptionalInt(selectedOption(document.querySelector("#chds")));
    if (occupancy.childrenCount > 0) {
        var age = querySelectorAll(document, ".child_age_1, .child_age_2, .child_age_3")
            .filter(function (div) {
                return div.style.display !== "none";
            })
            .map(function (div) {
                return div.querySelector("input");
            })
            .filter(function (input) {
                return input;
            })
            .map(function (input) {
                return extractOptionalInt(input.value);
            })
            .filter(function (val) {
                return val !== null;
            });
        occupancy.childAges = age.join(",");
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    var tr = img.parentNode;
    while (tr) {
        if ( (tr. tagName === "TR" || tr. tagName === "DIV") && (tr.classList.contains("result") || tr.classList.contains("subresult")) ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}

function loadAsyncInfo(img) {
    var destCaptions = [/Направление/i, /Напрям/i, /Destination/i];
    var flightCaptions = [/Перелёты включённые в пакет/i, /Перельоти включені в пакет/i, /Flights included in package/i];
    var hotelCaptions = [/Отели/i, /Готелі/i, /Hotels/i];


    var func = img.onclick;
    img.onclick = function (event) {
        var tr = getHotelRowByImage(img);
        var ths = querySelectorAll(tr.parentNode.parentNode, "thead th");
        var tds = tr.querySelectorAll("td");
        if (ths.length > 0 && tds.length > 0) {
            triggerEvent(tds[findIndex(ths, destCaptions)].querySelector(".tour-details"), 'click');
        } else {
            triggerEvent(img.parentNode.previousElementSibling, 'click');
        }

        var count = 0;
        var intervalId = setInterval(function () {

            if (document.querySelector("#pack-info")) {
                var h3 = querySelectorAll(document, "#pack-info h3");
                var cityIndex = findIndex(h3, flightCaptions);
                var hotelsIndex = findIndex(h3, hotelCaptions);
                if( cityIndex !== -1 ) {
                    var city = h3[cityIndex].nextElementSibling.querySelectorAll("tr td");
                    if( city.length > 1 ) {
                        city = city[1].textContent.split("(")[0].trim();
                        tr.setAttribute("city-from", city);
                    }
                }
                if (hotelsIndex !== -1) {
                    var hotels = h3[hotelsIndex].nextElementSibling.querySelectorAll("tbody tr");
                    if (hotels.length > 2) {
                        var hotelsInfo = {
                            "hotelName": "",
                            "roomType": "",
                            "boardType": ""
                        };
                        var tds;
                        for (var i = 1; i < hotels.length; i++) {
                            tds = hotels[i].querySelectorAll("td");
                            var dateMatcher = tds[4].textContent.match(/\d{2}.\d{2}.\d{4}/g);
                            hotelsInfo.hotelName += tds[0].textContent.trim() + " " + getDistance(dayMonthYearToDate(dateMatcher[0]), dayMonthYearToDate(dateMatcher[1])) + "н" + " / ";
                            hotelsInfo.roomType += tds[3].textContent.trim() + ", ";
                            hotelsInfo.roomType += tds[1].textContent.trim() + " / ";
                            hotelsInfo.boardType += tds[2].textContent.trim() + " / ";
                        }
                        tr.setAttribute("hotels-info", JSON.stringify(hotelsInfo));
                    }

                }
                if (document.querySelector("#pack-info a")) {
                    tr.setAttribute("hotel-url", document.querySelector("#pack-info a").href);
                }
            }

            if (++count >= 150 || ( tr.getAttribute("hotel-url") )) {
                img.onclick = func;
                clearInterval(intervalId);
                triggerEvent(document.querySelector("#pack-info .close"), 'click');
                img.onclick(event);
                return;
            }
        }, 50);
    };
    return img;
}

function triggerEvent(target, eventName) {
    if (!target) {
        return;
    }
    var rect = target.getBoundingClientRect();
    var event = document.createEvent("MouseEvents");
    var wnd = typeof unsafeWindow == "undefined" ? window : unsafeWindow;
    event.initMouseEvent(eventName, true, true, wnd, 0, 0, 0, rect.left, rect.top, false, false, false, false, 0, target);
    target.dispatchEvent(event);
}

function createListOption(img) {
    var tr = getHotelRowByImage(img);
    var resultTr = getResultTr(tr);
    var option = {
        checkinDt: tr.querySelector(".fa-suitcase, .fa-calendar").nextElementSibling.textContent,
        nights: tr.querySelector(".fa-moon-o").nextElementSibling.textContent,
        extra_nights: getListExtraNights(tr),
        hotelName: getListHotelName(tr.querySelector("h3"), tr),
        href: tr.getAttribute("hotel-url"),
        roomType: getListRoomType(tr),
        region: tr.querySelector(".fa-globe").parentNode.textContent.trim(),
        boardType: getListBoardType(tr),
        price: extractIntFromStr(tr.querySelector(".price").textContent.trim()),
        currency: tr.querySelector(".price").textContent.replace(/\d+/, "").trim(),
        country: SEARCH_CRITERIA.country,
        city_from: getCityFrom(resultTr, resultTr),
        excursion: false,
        operator: OPERATOR_NAME,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getListExtraNights(tr) {
    var ex_nights = tr.querySelector("span[title='Время в пути'], span[title='Час у шляху'], span[title='Time in road']");
    return ex_nights ? extractIntFromStr(ex_nights.textContent).toString() : "0";
}

function getListHotelName(h3, tr) {
    var hotel = h3.textContent.trim();
    var stars = h3.querySelectorAll(".fa-star").length;
    var attr = tr.getAttribute("hotels-info");
    if (attr) {
        return JSON.parse(attr).hotelName.replace(/\s\/\s$/, "");
    }
    return hotel + " " + stars + "*";
}

function getListRoomType(tr) {
    var room = tr.querySelector(".fa-bed").parentNode.textContent.trim();
    var accommodation = tr.querySelector(".fa-key").parentNode.textContent.trim();
    var attr = tr.getAttribute("hotels-info");
    if (attr) {
        return JSON.parse(attr).roomType.replace(/\s\/\s$/, "");
    }
    return room + ", " + accommodation;
}

function getListBoardType(tr) {
    var attr = tr.getAttribute("hotels-info");
    var sel = tr.querySelector(".fa-cutlery");
    var nextSel = sel.nextElementSibling;
    var title = nextSel ? ", " + nextSel.getAttribute("data-original-title") : "";
    var board = nextSel ? (nextSel.textContent.trim() + title) : sel.parentNode.textContent.trim();
    if (attr) {
        return JSON.parse(attr).boardType.replace(/\s\/\s$/, "");
    }
    return board;
}

function getResultTr(subresultTr) {
    var tr = subresultTr;
    while (tr) {
        if ( !tr.classList.contains("subresult") ) {
            break;
        }
        tr = tr.previousElementSibling;
    }
    return tr;
}