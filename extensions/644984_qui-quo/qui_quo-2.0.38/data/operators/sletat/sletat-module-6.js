var OPERATOR_NAME = "sletat.ru";
var colorSelector = "blue";
function initializeSearchCriteria() {
    const city =  getNodeProperty(getDoc().querySelector('input[class*="SLT-DepartureCitySelect"]'), null, "value");
    if (!city) {
        return null;
    }
    return {
        city: city
    };
}

function getSearchButton() {
    return querySelectorAll(getDoc(), 'button[class*="searchBtn"], button[class*="searchToursButton"]');
}

function getDoc() {
    var modules = querySelectorAll(document, ".SLT-module6");
    var searchModule = modules.find(fragment => {
        var searchWrapper = null;
        if ( fragment.shadowRoot ) {
            searchWrapper = fragment.shadowRoot.querySelector('[class*="resultsWrapper"]');
        }
        if ( searchWrapper ) {
            var matcher = searchWrapper.className.match(/SLT-SearchResults-(.+?)__resultsWrapper/);
            colorSelector = matcher ? matcher[1] : colorSelector;
            return fragment;
        }
    });
    if ( !searchModule && modules.length === 1 ) {
        return modules[0].shadowRoot;
    }
    return searchModule ? searchModule.shadowRoot : document;
}

function injectData() {
    var module = getDoc();
    injectStyleSheetSletat(module);
    querySelectorAll(module, `.SLT-TourList-${colorSelector}__listItem .SLT-Tour-${colorSelector}__container`).forEach(item => {
        if ( !item.querySelector(".qq") ) {
            var btns = qqBtns({asyncFunc: getAsyncInfo, align: "qq-vertical"});
            btns.style.position = "absolute";
            btns.style.left = "380px";
            item.append(btns);
        }
    });
}

function createOption(img) {
    var option = optionFromAttr(img);
    if ( option ) {
        return option;
    }
    var hotel = getHotelRowByImage(img);
    var tr =  getHotelRowByImage(img, `SLT-Tour-${colorSelector}__container`);
    var trTextArray = getNodeProperty(tr, "", "innerText").split(/\n/);
    var dateArray = trTextArray[1].split(" ");
    var region = getText(hotel.querySelector(`.SLT-Hotel-${colorSelector}__hotelPlacing`)).split(",");
    var price = getText(tr.querySelector(`.SLT-Tour-${colorSelector}__price`));
    var option = {
        checkinDt: dateFromDayAndMonthName(dateArray[1], dateArray[2]),
        nights: trTextArray[0].match(/\d+/)[0],
        hotelName: getText(hotel.querySelector(`.SLT-Title-${colorSelector}__hotelName`)) + " " + getText(hotel.querySelector(`.SLT-Title-${colorSelector}__categoryName`))+"*",
        href: null,
        roomType: trTextArray[3],
        region: region[1].trim(),
        boardType: trTextArray[2],
        price: extractIntFromStr(price.replace(/\D+/g, "")),
        currency: mapCurrency(price.replace(/\d+/g, "").trim()),
        country: region[0].trim(),
        city_from: SEARCH_CRITERIA ? SEARCH_CRITERIA.city : '',
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(hotel.querySelector(`.SLT-SlideItem-${colorSelector}__container img`), null, "src"),
        occupancy: null,
        book_tour_url: null,
        flight: null
    };
    setOptionAttr(img, option);
    return option;
}

function mapCurrency(currency) {
    switch (currency) {
        case "₸": return "KZT";
        case "€": return "EUR";
        case "$": return "USD";
        case "Р": return "RUB";
    }
    return currency;
}

function getHotelRowByImage(img, sel = `SLT-HotelList-${colorSelector}__listItem`) {
    var div = img.parentNode;
    while (div) {
        if ( div.classList.contains(sel) ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

async function getAsyncInfo(img) {
    var option = optionFromAttr(img) || createOption(img);
    var tr = getHotelRowByImage(img, `SLT-Tour-${colorSelector}__container`);
    var oldUrl = window.location.href;
    simulateMouseEvent(tr.querySelector(`.SLT-Tour-${colorSelector}__selectTourButton`), 'click');
    var frame;

    function getInfoFromPopup() {
        frame = document.querySelector("#sletat-tour-card-iframe");
        frame = frame ? frame.contentDocument : document;
        var checkOnlineOff = frame.querySelector(".price-checked-online__text-off");
        var checkOnlineOn = frame.querySelector(".price-checked-online__text-on");
        if ( window.location.href !== oldUrl ) {
            option.book_tour_url = window.location.href;
            option.href = window.location.href;
        }
        if ( !option.occupancy ) {
            var occupancy = getOccupancy(frame);
            if ( occupancy ) {
                option.occupancy = occupancy;
                if ( !canGetFlightInfo(img) ) {
                    return false;
                }
            }
        }
        if ( checkOnlineOff ) {
            frame.querySelector('.tour-control__text_close').click();
            return false;
        }
        if ( checkOnlineOn && !option.flight ) {
            var flight = getFlight(frame, img);
            if ( flight ) {
                option.flight = flight;
            }
            frame.querySelector('.tour-control__text_close').click();
            return false;
        }
        return null;
    }

    await waitingFor(getInfoFromPopup, 100, 100);
    setOptionAttr(img, option);
    var closeBtn = frame ? frame.querySelector('.tour-control__text_close') : null;
    closeBtn ? closeBtn.click() : null;
    return img;
}

function getOccupancy(frame) {
    var occupancyText = querySelectorAll(frame, ".tour-parameters__name").find(dt => getText(dt) === "Туристы:");
    occupancyText = occupancyText ? getText(occupancyText.nextElementSibling) : null;
    if ( !occupancyText ) {
        return null;
    }
    var occupancy = {
        adultsCount: 2,
        childrenCount: 0,
        childAges: null
    }
    var adulds = occupancyText.match(/(\d+)\s*взр/);
    if ( !adulds ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adulds[1]);
    var childs = occupancyText.match(/(\d+)\s*реб/);
    occupancy.childrenCount = childs ? extractIntFromStr(childs[1]) : 0;
    return occupancy;
}

function getFlight(frame, img) {
    try {
        if ( !canGetFlightInfo(img) ) {
            return null;
        }
        return {
            sectors: querySelectorAll(frame, ".tour-page-flight").map(sector => {
                var routes = querySelectorAll(sector, ".tour-page-flight__content__route__point");
                var flightSides = querySelectorAll(sector, ".tour-page-flight__info");
                var segments = new Array(routes.length - 1).fill(null).map(elem => {
                    return new FlightSegment();
                });
                var stops = routes.filter(route => {
                    return getNodeProperty(route.querySelector(".tour-page-flight__tooltip-content"), "").match(/Пересадка/);
                });
                stops.forEach( (stop, index) => {
                    var id = getNodeProperty(stop.querySelector(".tour-page-flight__content__route__point__caption"));
                    segments[index].arrivalAirportID = id;
                    segments[index+1].departureAirportID = id;
                });
                fillSegment(segments[0], flightSides[0], routes[0], true);
                fillSegment(lastElement(segments), lastElement(flightSides), lastElement(routes), false);
                return {segments: segments};
            })
        }
    } catch (e) {
        return null;
    }
}

function fillSegment(segment, side, route, isDeparture) {
    var tooltipContent = [...route.querySelector(".tour-page-flight__tooltip-content").childNodes]
                          .map( elem => elem.textContent.replace(/Вылет из|Прилёт в|рейс/gi, "").trim())
                          .filter( text => text ); // ["Pulkovo", "Санкт-Петербург", "QatarAirways", "QR280", "ECONOM"]
    var sideContent = querySelectorAll(side,"*").map( elem => elem.textContent );
    var date = sideContent[2].split(/\s|,/);
    if ( isDeparture ) {
        segment.airline = tooltipContent[1];
        segment.departureTime = sideContent[0];
        segment.departureDate = dateFromDayAndMonthName(...date);
        segment.departureAirport = tooltipContent[0].split(",")[0];
        segment.departureAirportID = getText(route.querySelector(".tour-page-flight__content__route__point__caption"));
        segment.departureCity = tooltipContent[0].split(",")[1];
        segment.flightNumber = tooltipContent[2].split(",")[0];
        segment.serviceClass = tooltipContent[2].split(",")[1];
    } else {
        segment.airline = tooltipContent[1];
        segment.arrivalTime = sideContent[0];
        segment.arrivalDate = dateFromDayAndMonthName(...date);
        segment.arrivalAirport = tooltipContent[0].split(",")[0];
        segment.arrivalAirportID = getText(route.querySelector(".tour-page-flight__content__route__point__caption"));
        segment.arrivalCity = tooltipContent[0].split(",")[1];
        segment.flightNumber = tooltipContent[2].split(",")[0];
        segment.serviceClass = tooltipContent[2].split(",")[1];
    }
}

function injectStyleSheetSletat(module) {
    if ( !module || module.querySelector("#qq-css") ) {
        return;
    }
    var link = document.createElement("link");
// ---->> chrome >>---- //
    link.href = getBrowserRuntime().getURL("data/operators/buttons.css");
// ----<< chrome <<---- //

    /* ---->> safari >>---- //
     link.href = safari.extension.baseURI + "data/operators/buttons.css";
     // ----<< safari <<---- */
    link.type = "text/css";
    link.rel = "stylesheet";
    link.id = "qq-css";
    if ( module ) {
        module.appendChild(link);
    }
}
