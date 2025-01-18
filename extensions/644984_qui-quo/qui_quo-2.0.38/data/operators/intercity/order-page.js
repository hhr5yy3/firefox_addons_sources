var OPERATOR_NAME = "ИНТЕРСИТИ";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    if ( !document.querySelector(".qq") ) {
        var price =  document.querySelector('[id*="BasketPrice"]');
        if ( price ) {
            price.parentNode.parentNode.parentNode.append(qqBtns());
        }
    }
}

function createOption(img) {
    var dates = querySelectorAll(document, '[id*="LbBeginDate"]');
    var basketServices = querySelectorAll(document, '[src="images/sv3.gif"]').map( image =>  {
        var trHotel = getParentTr(image);
        var [hotel, room, board] = querySelectorAll(trHotel, "select.advBasketService").map( elem =>  selectedOption(elem) || getText(elem));
        return {hotel : hotel.split(/\/|,/g), room, board}
    });
    var price = getText(document.querySelector(('[id$="LbForPayPrice"]')));
    var flight = getFlight(img);
    var option = {
        checkinDt : getText(dates[0]),
        nights : getNights(basketServices),
        region : basketServices.map( elem => elem.hotel[0]).join("/"),
        hotelName : basketServices.map( elem => elem.hotel[1]).join("/"),
        boardType: basketServices.map( elem => elem.board).join("/"),
        roomType : basketServices.map( elem => elem.room).join("/"),
        price : extractIntFromStr(price),
        currency : mapCurrency(price.replace(/\d+/g, "").trim()),
        href : null,
        country : getCountry(),
        city_from: flight ? flight.sectors[0].segments[0].departureCity : "",
        operator : OPERATOR_NAME,
        occupancy: null,
        flight: flight
    };
    return option;
}

function getNights(basketServices) {
    return basketServices.reduce((sum, elem) => {
        return +elem.hotel[2].match(/(\d+)\s*ноч/)[1] + sum;
    }, 0).toString();
}

function getRegion(basketServices) {
    return basketServices.map( elem => {
          elem.hotel[0];
    }).join("/");
}

function getCountry() {
   var textMed =  getParentTr(document.querySelector('[src="images/sv6.gif"]')).textContent;
   if ( textMed ) {
       return (textMed.match(/Страховка::(.+?)\//) || ["",""])[1];
   }
   return "";
}

function getFlight() {
    try {
        var sectors = querySelectorAll(document, '[src="images/sv1.gif"], [src="images/sv1b.gif"]').map(img => getParentTr(img))
            .map(tr => {
                return {
                    date: getText(tr.querySelector('[id*="LbBeginDate"]')),
                    flightText: getText(querySelectorAll(tr, "td").find(td => getText(td).match(/А_П::/)))
                }
            });
        return {sectors: sectors.map(sector => parseSector(sector))}
    } catch(e) {
        return null;
    }
}

function parseSector(sector) {
    var textSegments = sector.flightText.split(/\/|::|,/);
    var splashSplit = sector.flightText.split("/").filter( text => text );
    var time = textSegments[5].trim().split(/-/);
    var portIds = textSegments[4].trim().split(/-/);
    return {
        segments: [new FlightSegment( {
            flightNumber: textSegments[3],
            departureDate: sector.date,
            departureTime: time[0],
            departureCity: textSegments[1],
            departureAirportID: portIds[0],
            arrivalCity: textSegments[2],
            arrivalTime: time[1],
            arrivalAirportID: portIds[1],
            serviceClass: lastElement(splashSplit)
        } )]
    }
}

function getParentTr(image) {
    var elem = image ? image.parentNode : "";
    while (elem) {
        if ( elem.tagName === "TR" ) {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}

function getHotelRowByImage(img) {
    return document.querySelector("#Table1");
}