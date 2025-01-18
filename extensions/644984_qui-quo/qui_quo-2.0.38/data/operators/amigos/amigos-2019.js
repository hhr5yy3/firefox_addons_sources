const OPERATOR_NAME = "Амиго-С";
const OPERATOR_CURRENCY = "amigos";
const DEFAULT_CURRENCY = "RUB";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return {
         occupancy: getOccupancy()
    }
}

function getSearchButton() {
    return querySelectorAll(document, "button[name='search_button']");
}

function injectData() {
    injectCurrencySelectionUtil(".tourblocks", OPERATOR_CURRENCY, "width:auto;float:left;color:black;", "", "margin:5px");
    querySelectorAll(document, ".searchresults-hblocks__hotel .searchresults-hblocks__optionsandprice .searchresults-hblocks__pricetext").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}, createBlockOption));
        }
    });
    querySelectorAll(document, ".searchresults-vblocks__hotel .searchresults-vblocks__wrapper").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"}, createBlockOption);
            btns.style.marginBottom = "5px";
            div.append(btns);
        }
    });
    querySelectorAll(document, ".searchresults-list__tbody .searchresults-list__tr").forEach(div => {

        if ( !div.querySelector(".qq") && querySelectorAll(div, "td").length > 6 ) {
            const qqTd = div.appendChild(createTableCell());
            const rowspan = qqTd.previousElementSibling.getAttribute("rowspan");
            rowspan ? qqTd.setAttribute("rowspan", rowspan) : null;
        }
    });
    const table = document.querySelector(".searchresults-list__table .searchresults-list__thead .searchresults-list__tr");
    if ( table && !table.querySelector(".qq") ) {
        table.append(createTableHeadCell())
    }
}

function createTableCell() {
    const newTd = document.createElement("td");
    newTd.classList.add("qq", "searchresults-list__td");
    newTd.append(qqBtns({align: "qq-horizontal"}, createTableOption));
    return newTd;
}

function createTableHeadCell() {
    const newTh = document.createElement("th");
    newTh.classList.add("qq", "searchresults-list__th");
    newTh.textContent = "QQ";
    return newTh;
}
//--------------------------HorizontalBlock----------------------------------------//
function createBlockOption(img) {
    const tour = getHotelRowByImage(img);
    const options = querySelectorAll(tour, ".searchresults-hblocks__option, .searchresults-vblocks__option");
    const price = getPrice(tour);
    console.log(price.replace(/\d+|\s+/g, "").slice(0, 3))
    let option = {
        checkinDt: getDate(getText(findOption(options, /Вылет/i))),
        nights: getText(findOption(options, /Ночей/i)),
        hotelName: getHotelName(tour),
        href: extractHref(tour),
        country: getNodeProperty(document.querySelector("span[id*='countryTo']")),
        region: getText(tour.querySelector(".searchresults-hblocks__city, .searchresults-vblocks__city")),
        roomType: getText(findOption(options, /Тип номера/i)),
        boardType: getText(findOption(options, /Питание/i)),
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, "").slice(0,3)),
        city_from: getCity(),
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(tour.querySelector(".searchresults-hblocks__image img, img.searchresults-vblocks__image"), null, "src"),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getDate(text) {
    const dayMonth = text.match(/(\d{2})\.(\d{2})/);
    return appendYear(dayMonth[1], dayMonth[2]);
}

function getHotelName(tour) {
    const caption = getText(tour.querySelector(".searchresults-hblocks__title, .searchresults-list__title, .searchresults-vblocks__title"));
    const stars =  tour.querySelector(".searchresults-hblocks__stars, .searchresults-list__stars, .searchresults-vblocks__stars");
    return stars ? `${caption} ${stars.getAttribute("cat") || ""}` : caption;
}

function extractHref(tour) {
    const anchor = tour.querySelector("a.searchresults-hblocks__title, a.searchresults-list__title, a.searchresults-vblocks__title");
    if ( !anchor ) {
        return null;
    }
    const onclick = anchor.getAttribute("onclick");
    if ( !onclick ) {
        return null;
    }
    const matcher = onclick.match(/src="(.+?)"/)
    return matcher ?  window.location.origin + matcher[1] : null;

}

function getPrice(tour) {
    const priceNode1 = tour.querySelector("#currencies");
    let price = isPrefferedDefaultCurrencyUtil() ? priceNode1.getAttribute("rub") :
        (priceNode1.getAttribute("eur") || priceNode1.getAttribute("USD"));
    if ( extractIntFromStr(price) === 0 || price.replace(/\d+|\s+/g, "").match(/und/)) {
        price = getText(priceNode1);
    }
    return price;
}

function getCity() {
    const flightTab = document.querySelector("#tours_with_flight");
    if ( flightTab ) {
        return flightTab.classList.contains("searchbox__tab_active") ? getNodeProperty(document.querySelector("span[id*=cityFrom]"))  : "";
    }
    return null;
}

//--------------------------HorizontalBlock--END----------------------------------------//

//--------------------------TablelBlock----------------------------------------//

function createTableOption(img) {
    const tr = getHotelRowByImage(img);
    const multiTourTds = getAdditionalTds(tr);
    let multiTourInfo = {
        nights: 0,
        hotels: [],
        roomType: [],
        boardType: [],
        region: []
    };
    if ( multiTourTds.length > 0 ) {
        multiTourInfo.nights = multiTourTds.reduce((prev, cur) => {
            prev = +getText(cur[0]) + prev;
            return prev
        }, 0);
        multiTourInfo.hotels = multiTourTds.map( tds => getHotelName(tds[0].parentNode) );
        multiTourInfo.roomType = multiTourTds.map( tds => getText(tds[2]) );
        multiTourInfo.boardType = multiTourTds.map( tds => getText(tds[3].childNodes[1]) );
        multiTourInfo.region = multiTourTds.map( tds => getText(tds[4]) );
    }
    const tds = querySelectorAll(tr, "td");
    const ths = querySelectorAll(document.querySelector(".searchresults-list__thead tr"), "th");
    const price = getPrice(tr);
    let option = {
        checkinDt: getDate(getText(tds[findTableTdIndex(ths, /ВЫЛЕТ/i)])),
        nights:String(+getText(tds[findTableTdIndex(ths, /НОЧЕЙ/i)])+multiTourInfo.nights),
        hotelName: [getHotelName(tr),...multiTourInfo.hotels].join(" / "),
        href: extractHref(tr),
        country: getNodeProperty(document.querySelector("span[id*='countryTo']")),
        region: [getText(tr.querySelector(".searchresults-list__text_city")), ...multiTourInfo.region].join(" / "),
        roomType: [getText(tds[findTableTdIndex(ths, /НОМЕРА/i)]), ...multiTourInfo.roomType].join(" / "),
        boardType: [getText(tds[findTableTdIndex(ths, /ПИТАНИЕ/i)].childNodes[1]), ... multiTourInfo.boardType].join(" / "),
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, "")),
        city_from: getCity(),
        operator: OPERATOR_NAME,
        thumbnail: null,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getAdditionalTds(tr) {
    let trs = [];
    let additionalTr = tr.nextElementSibling;
    while (true) {
        if ( additionalTr.tagName === "TR" && querySelectorAll(additionalTr, "td").length < 7 ) {
            trs.push(additionalTr);
            additionalTr = additionalTr.nextElementSibling;
        } else {
            break;
        }
    }
    return trs.map( tr => querySelectorAll(tr, "td") );
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    occupancy.adultsCount = extractIntFromStr(getNodeProperty(document.querySelector(".searchbox__adult-counter"), "0"));
    if ( occupancy.adultsCount === 0 ) {
        return null;
    }
    occupancy.childrenCount = extractIntFromStr(getNodeProperty(document.querySelector(".searchbox__child-counter"), "0"));
    if (  occupancy.childrenCount > 0 ) {
        occupancy.childAges = getNodeProperty(document.querySelector(".searchbox__age-counter"));
    }
    return occupancy;
}


function findOption(options, caption) {
    const result = options.find( option => getText(option).match(caption) );
    return result ? result.querySelector(".searchresults-hblocks__optiondesc, .searchresults-vblocks__optiondesc") : null;
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains("searchresults-hblocks__hotel") ||
             div.classList.contains("searchresults-list__tr") ||
             div.classList.contains("searchresults-vblocks__hotel")) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
