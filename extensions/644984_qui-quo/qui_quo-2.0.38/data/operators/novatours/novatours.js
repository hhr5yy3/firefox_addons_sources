var OPERATOR_NAME = "novatours";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    querySelectorAll(document, "form input[name='id']").forEach(input => {
        var div = input.parentNode;
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({asyncInfo:getCity }));
        }
    });
}

function createOption(img) {
    var div = getHotelRowByImage(img);
    var city = img.parentNode.getAttribute("cityfrom");
    var option = {
        checkinDt: getDate(div),
        nights:  getNights(div),
        hotelName: getHotel(),
        href: window.location.href,
        roomType: getRoomAndBoardType(div, ".icon-bed-fill-20"),
        region: document.querySelector(".meta.location").textContent.trim(),
        boardType: getRoomAndBoardType(div, ".icon-meal-fill-20"),
        price: extractIntFromStr(div.querySelector(".price").textContent),
        currency: mapCurrency(div.querySelector(".price")),
        country: "",
        city_from: city ? city : 'Нет данных',
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getThumbnail(),
        occupancy: null
    };
    return option;
}

function getDate(div) {
   var date =  div.querySelector(".checkin").textContent.trim();
   if ( date.match(/\d{2}\.\d{2}\.\d{4}/) ) {
       return date;
   }
   var matcher = date.match(/(\d{4})\s(\d{2})\s(\d{2})/);
   return [matcher[3],matcher[2],matcher[1]].join(".");
}

function getNights(div) {
    var dateParent = div.querySelector(".checkin").parentNode.parentNode.textContent;
    return dateParent.match(/(\d+)\s*(nakt|ноч|nakv|ööd|н\.|n\.)/)[1];
}
function getHotel() {
    var head = document.querySelector(".page-title-trip-details h1");
    var stars = head.querySelectorAll(".icon-brand-globe").length;
    return  stars > 0 ? head.textContent.trim() + " "+ stars + "*" : head.trim();
}

function getRoomAndBoardType(div, sel) {
    var cell = div.querySelector(sel).parentNode;
    var moreLink =   cell.querySelector("a");
    return moreLink ? cell.textContent.replace(moreLink.textContent,"").trim() : cell.textContent.trim();
}

function getCity(img) {
    var func = img.onclick;
    img.onclick = function (event) {
        var div = getHotelRowByImage(img);
        var planeDetails = div.querySelector(".icon-plane-fill-20").parentNode.parentNode;
        var a = planeDetails.querySelector("a");
        var qqDiv = img.parentNode;
        var city = qqDiv.getAttribute("cityfrom") ? qqDiv.getAttribute("cityfrom") : null;
        if ( !city ) {
            simulateEvent(a, "click");
            var count = 0;
            var intervalId = setInterval(loadPopupInfo, 50);

            function loadPopupInfo() {
                var city = document.querySelector(".trip-details-description .meta span");
                var btn = document.querySelector(".icon-close");
                if ( city && btn ) {
                    qqDiv.setAttribute("cityfrom", city.textContent);
                }
                if ( ++count > 40 || qqDiv.getAttribute("cityfrom") ) {
                    img.onclick = func;
                    clearInterval(intervalId);
                    simulateEvent(btn, "click");
                    img.onclick(event);
                }

            }
        }
    };
    return img;
}

function mapCurrency(price) {
    var priceText = price.textContent.replace(/\d+|\s+|,/g, "");
    switch (priceText) {
        case "€" :
            return "EUR";
        case "$" :
            return "USD";
        default :
            return priceText;
    }
}

function getThumbnail() {
    var image = document.querySelector(".trip-pictures img");
    return image ? image.src : null;
}

function getHotelRowByImage(img) {
    var td = img.parentNode;
    while (td) {
        if ( td.classList.contains("list-hotel") ) {
            break;
        }
        td = td.parentNode;
    }
    return td;
}
