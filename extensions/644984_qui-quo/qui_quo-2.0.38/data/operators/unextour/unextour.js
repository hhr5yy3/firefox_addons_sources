var OPERATOR_NAME = window.operators ? (window.operators[window.location.hostname] || window.OPERATOR_NAME || "UNEXtour") : (window.OPERATOR_NAME || "UNEXtour");
var OPERATOR_CURRENCY = "unextour";
var DEFAULT_CURRENCY = "RUB";
var CURRENCY_SELECTION_STYLE =  "display:flex;margin-right:6px;font-size:12px;color:white;width: 400px;";
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return document.querySelector(".form-group.find-group input.btn-primary");
}

function injectData() {
      var table = document.querySelectorAll(".table.table-condensed.resultsGrid.no-margin");
    if ( table.length < 2 ){
        return;
    }
    var head = table[1].querySelector("thead tr");
    if ( !head.querySelector(".qq") ) {
        injectCurrencySelectionUtil("#searchResult", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "margin-top:-3px;", "display:flex;justify-content: center;");
        head.appendChild(createHeaderCell());
    }
    var trs = table[1].querySelectorAll("tbody tr");
    if ( trs.length > 0 ) {
        for ( var i = 0; i < trs.length; i++ ) {
            if ( !trs[i].querySelector(".qq") &&  trs[i].querySelector(".results-price")) {
                trs[i].appendChild(createCell());
            }
        }
    }
}

function createCell() {
    var newTd = document.createElement("td");
    newTd.appendChild(createAddButton());
    newTd.appendChild(createEditButton());
    newTd.className = "qq";
    return newTd;
}

function createHeaderCell() {
    var th = document.createElement("th");
    th.className = "qq";
    th.setAttribute("style", "width: 50px;");
    th.appendChild(document.createTextNode("QQ"));
    th.className = "qq";
    return th;
}

function createOption(img) {
    var tr = img.parentNode.parentNode;
    var trs = getTrs(tr);
    var tds = tr.querySelectorAll("td");
    var ths = querySelectorAll(tr.parentNode.parentNode, "thead th");
    var priceRowspan = getPrice(tr)[1];

    var option = {
        checkinDt :getDate(trs[1])[0],
        nights : getNights(trs),
        extra_nights: extractExtraNights(trs[1], getNights(trs)),
        hotelName : getHotelName(trs),
        href : getUrl(tds, ths),
        roomType: getRooms(trs),
        region : getRegion(trs),
        boardType : getBoard(tr, priceRowspan || 1),
        price : getPrice(tr)[0],
        currency : getCurrency(tr),
        country:  getCountry(),
        city_from: getCity(),
        occupancy: getOccupancy(),
        comment: getComment(tr)
    };
    return option;
}

function getUrl(tds, ths) {
   var hotel =  tds[findIndex(ths, /Отель/i)].querySelector("a");
   return hotel ? hotel.href : null;
}

function getDate(trs) {
    var date = findOneTd(trs[0], /formatDate/i);
    var matcher = date.textContent.match(/(\d\d)\.(\d\d)/);
    return [appendYear(parseInt(matcher[1], 10), parseInt(matcher[2], 10)), date];
}

function getNights(trs) {
    var nights = [];
    function findNights(trs) {
        trs.forEach(function (it) {
            var night = findOneTd(it, /text:Length/i);
            if ( night ) {
                nights.push(extractIntFromStr(night.textContent));
            }
        });
    }
    findNights(trs[0]);
    if ( nights.length === 0 ) {
        findNights(trs[1]);
    }
    return nights.reduce(function (prev, cur) {
        return prev + cur;
    }).toString();
}

function extractExtraNights(trs,hnights) {
    var date = getDate(trs)[1];
    var matcher = date.textContent.match(/(\d\d).(\d\d)\s*-\s*(\d\d).(\d\d)/);
    if ( matcher && matcher.length === 5 ) {
        var date1 =  toDate(appendYear(extractIntFromStr(matcher[1]),extractIntFromStr(matcher[2])));
        var date2 =  toDate(appendYear(extractIntFromStr(matcher[3]),extractIntFromStr(matcher[4])));
        if ( date1 && date2 ){
            var fnights =  getDistance(date1, date2);
            hnights = extractIntFromStr(hnights);
            var extra_nights = fnights - hnights;
            if ( extra_nights > 0 ) {
                return extra_nights.toString();
            }
        }
    }
    return null;
}

function getHotelName(trs) {
    var names = findNames(trs[0]);
    if ( !names || names.length < 1 ) {
        names = findNames(trs[1]);
    }

    function findNames(trs) {
         return findTdsInTrs(trs, /text:City/i)
         .map(function (it) {
            it.style.display = 'none';
            const text= it.parentNode.innerText.trim();
             it.style.display = '';
             return text;
          });

    }
    return names.join("/");
}

function getRooms(trs) {
    var needTrs = trs[0]
    var countRomm =  findTdsInTrs(needTrs, /text:RoomType/i).length + findTdsInTrs(needTrs, /text:Accommodation/i).length;
    if ( countRomm < 1 ) {
        needTrs = trs[1];
    }
    var roomtype =  findTdsInTrs(needTrs, /text:RoomType/i)
        .map(function (it) {
            return getOneRoom(it.parentNode);
        });
    var acc = findTdsInTrs(needTrs, /text:Accommodation/i)
        .map(function (it) {
            return it.textContent;
        });
    return roomtype.map(function (elem, index) {
        return elem +  (acc[index] ? ", " + acc[index] : "");
    }).join(" / ");
}

function getOneRoom(td) {
    var span = td.querySelector(".text-muted");
    if ( span ) {
        var alloc = span.textContent.trim();
        return td.textContent.replace(alloc, "").trim() + ", " + alloc;
    }
    return td.textContent;
}

function getRegion(trs) {
    var regions = findRegions(trs[0]);
    if ( regions.length < 1 ) {
        regions = findRegions(trs[1]);
    }

    function findRegions(trs) {
        return findTdsInTrs(trs, /text:City/i).map(function (it) {
            return it.textContent;
        });
    }

    return regions.join(", ");
}

function getBoard(tr, rowspan=1) {
    let trs = [];
    for ( let i = 0; i < rowspan; i++) {
        trs.push(tr);
        tr = tr.nextElementSibling;
    }

    return findTdsInTrs(trs, /text:Pansion/i).map(function (it) {
        return it.textContent;
    }).join(" / ");
}

function getPrice(tr) {
    var rowspan = 1;
    var price = tr.querySelector(".results-price-rur.text-nowrap span");
    if ( isPrefferedDefaultCurrencyUtil() && price ) {
        rowspan = price.parentNode.parentNode;
    } else {
        price = tr.querySelector(".results-price");
        rowspan = price.parentNode;
    }
    return [extractIntFromStr(price.textContent), rowspan.getAttribute("rowspan")];
}

function getCurrency(tr) {
    var currency = "";
    var price = tr.querySelector(".results-price-rur.text-nowrap span");
    if ( isPrefferedDefaultCurrencyUtil() && price) {
        currency = "p";
    } else {
        currency = tr.querySelector(".results-price").textContent.replace(/[\d,.\s]/g, '');
    }
    switch (currency.trim()) {
        case "€": return "EUR";
        case "p": return "RUB";
        case "₽": return "RUB";
        case "$": return "USD";
        default:  return currency;
    }
}

function getCountry() {
    return document.querySelector(".btn-group.bootstrap-select button[data-id='countryTo']").title;
}

function getCity() {
    const cityNode = document.querySelector(".btn-group.bootstrap-select button[data-id='cityFrom']");
    return cityNode.clientHeight > 0 ? cityNode.title : 'Без перелёта';
}

function getComment(tr) {
    var comment = tr.querySelector('.tour-condition');
    return comment ? comment.textContent.trim() : "";
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var adults = document.querySelector("div[data-bind='radio:adultCount'] .active");
    var children = document.querySelector("div[data-bind='radio:childCount'] .active");
    if ( !adults || !children ) {
        return null;
    }
    occupancy.adultsCount = extractOptionalInt(adults.textContent);
    occupancy.childrenCount =  extractOptionalInt(children.textContent);
    if ( occupancy.childrenCount > 0 ) {
        var btns = document.querySelectorAll(".row.child-buttons button");
        var btns_tbix = document.querySelectorAll(".row.child-buttons button[tabindex='-1']");
        if ( btns.length-btns_tbix.length !== occupancy.childrenCount ) {
            return null;
        }
        var ages = [];
        for ( var i = 0; i < btns.length; i++ ) {
            if ( btns[i].getAttribute("tabindex") !== "-1" ) {
                var age = extractOptionalInt(btns[i].title);
                if ( age === null ) {
                    return null;
                }
                ages.push(age);
            }
        }
        occupancy.childAges = ages.join();
    }
    return occupancy;
}

function toDate(text) {
    var m = text.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    return new Date(extractIntFromStr(m[3]), extractIntFromStr(m[2]) - 1, extractIntFromStr(m[1]));
}

function getTrs(tr) {
    var trDate = tr;
    while (true) {
        var td = findOneTd(trDate, /formatDate/i);
        if ( td && td !== -1 ) {
            break;
        }
        trDate = trDate.previousElementSibling;
    }
    var rowspan = tr.querySelector(".results-price").parentNode.getAttribute("rowspan");
    var priceTrs = [];
    priceTrs.push(tr);
    for (var i = 1; i < rowspan; i++) {
        tr = tr.nextElementSibling;
        priceTrs.push(tr);
    }
    var dateRowspan = findOneTd(trDate, /formatDate/i).parentNode.getAttribute("rowspan");
    var dateTrs = [];
    dateTrs.push(trDate);
    for (var j = 1; j < dateRowspan; j++) {
        trDate = trDate.nextElementSibling;
        dateTrs.push(trDate);
    }
    return [priceTrs, dateTrs];
}

function findIndex(ths, caption) {
    return ths.findIndex(function (th) {
        if (th.textContent.match(caption)) {
            return true;
        }
        return false;
    });
}

function findTdsInTrs(trs, regexp) {
    return trs
        .map(function (it) {
            return findOneTd(it, regexp);
        })
        .filter(function (it) {
            return it;
        });
}

function findOneTd(tr, regexp) {
    return querySelectorAll(tr, "[data-bind]").find(function (td) {
        return td.getAttribute("data-bind").match(regexp);
    });
}
