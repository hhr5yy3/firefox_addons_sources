var OPERATOR_NAME = "Biblioglobus";
var showTopHotelsRating = true;
var OPERATOR_CURRENCY = "biblioglobus";
var DEFAULT_CURRENCY = "RUB";
var MATCH_CURRENCY = "RUR";

// -------- Search Criteria ---------------------------

function initializeSearchCriteria() {
	return null;
}

function getSearchButton() {
	return null;
}

// --------- Rows ---------------------------------

function checkCurrency(text) {
    var textArr = [...text].slice(0,3).join("");
	switch (textArr.toUpperCase()) {
		case "Р." : return "RUB";
        case "Р" : return "RUB";
		case "РУБ." : return "RUB";
        case "UAH": return "UAH";
	}
	return textArr;
}

function extractPriceAndCurrency(div) {
	if ( isPrefferedDefaultCurrency() ) {
		var b = div.querySelector("b.r");
		var price = parseInt(b.textContent, 10);
		var cur = checkCurrency(trim(b.nextSibling.textContent));
		return { price : price, currency: cur };
	}

	var m;
	var a = div.querySelector("a[title]");
	if ( a ) {
		m = a.getAttribute("title").match(/(\d+)\s+(\w+)/);
		if ( m ) {
			return { price : parseInt(m[1], 10), currency: checkCurrency(m[2]) };
		}
	}

	m = div.textContent.match(/(\d+)\s+([\wА-Яа-я]+)/);
	return { price : parseInt(m[1], 10), currency: checkCurrency(m[2]) };
}

function extractTourUrl(div) {
	var a = div.querySelector("a");
	return a ? a.href : null;
}

function extractDate(hotel, td) {
	if ( hotel )
	    return hotel.querySelector(".c_de").textContent.match(/(\d+\.\d+\.\d+)/)[1]

	var elemData = td.querySelector(".i_an").getAttribute("title");
	if ( !elemData )
		elemData = td.querySelector(".i_an").getAttribute("text")
	return elemData.match(/\d{2}\.\d{2}\.\d{4}/)[0];
}

var BOARD_TYPES = "(BB|HB|FB|AI|UA|AO|ULTRA ALL|ULTIMATE\\s+AI)$"

function extractBoardType(td) {
    var roomAndBoard = td.firstChild.textContent
    var r = roomAndBoard.match(BOARD_TYPES)
    var board = r == null || r.length==0 ? "" : r[1];

    var br = td.querySelector("br");
    if ( br != null && br.nextSibling != null )
    	board += " " + br.nextSibling.textContent;

    return board;
}

function extractRoomType(td) {
    var roomAndBoard = td.firstChild.textContent
    var r = roomAndBoard.match("(.*?)" + BOARD_TYPES)
    return r == null || r.length==0 ? roomAndBoard : r[1].trim()
}

function extractHotelName(hotel, text, isRatingBtn = false, nights) {
    const selectWithHotel = $1('select[name="f50"]');
    if ( selectWithHotel && !isRatingBtn && nights) {
        const mainHotel = selectedOption(selectWithHotel, true);
        const allNightsArray = getText(nights).split(/\s*\+\s*/);
        const splitted = mainHotel.split(/\s*-\s*/);
        if (hotel) {
            return `${splitted[1]} (${allNightsArray[0] || '0'} ноч.) / ${hotel.querySelector(".name a").textContent}(${allNightsArray[1] || '0'} ноч.)`;
        }
        const match = text.replace(/<[^>]+>/g, "").match(/ОТЕЛЬ:(.*)НОМЕР/i)
        return match ? `${splitted[1]} (${allNightsArray[0] || '0'} ноч.) / ${match[1]}(${allNightsArray[1] || '0'}ноч.)` : splitted[1] + ' / ' + "";
    }
	if ( hotel ) {
        return hotel.querySelector(".name a").textContent;
    }


	var match = text.replace(/<[^>]+>/g, "").match(/ОТЕЛЬ:(.*)НОМЕР/i)
	return match ? match[1] : "";
}

function getCountry() {
	var c = document.querySelector("#b-pfh-country") || document.querySelector(".country");
	return c != null ? c.textContent : "";
}

function getCity() {
	var route = document.querySelector(".b-f .w__route .f-select");
	if ( route && selectedOption(route) && /БЕЗ ПЕРЕЛЕТА/i.test(selectedOption(route)) )
		return "";

	var city = document.querySelector(".b-f .w__title_2 em");
	if ( city ) {
		var match = city.textContent.match(/(.*)\/[^\/]+/);
		return match ? match[1] : city.textContent;
	}

	var c = document.querySelector("#navigation-main-city .selection") || document.querySelector("#b-pfh-city");

	if ( !c ) {
		var span = document.querySelector(".b-pfh_2");
		if ( span && /БРОНИРО/i.test(span.textContent) ) {
			return "";
		}
		return null;
	}
	var match = c.textContent.match(/(.*)\/[^\/]+/);
	return match ? match[1] : c.textContent;
}

function extractRoomAlloc(div) {
	var s = div.querySelector(".ags");
	return s != null ? s.textContent.trim() : "";
}

function getHotelRow(tr) {
	for(;;) {
		tr = tr.previousElementSibling;
		if ( !tr ) {
			break;
		}
		if ( $1('.name', tr) ) {
            return tr;
        }
	}
	return null;
}

function extractRegion(hotel, text) {
    const selectWithHotel = $1('select[name="f50"]');
    if (selectWithHotel) {
        const mainHotel = selectedOption(selectWithHotel, true);
        const splitted = mainHotel.split(/\s*-\s*/);
        if (hotel) {
            var region = hotel.querySelector(".name span").textContent;
            var m = region.match(/(.*)\/[^\/]+/);
            return m == null ? splitted[0] +' / '+region : splitted[0] + ' / ' +m[1];
        }
        var match = text.replace(/<[^>]+>/g, "").match(/КУРОРТ:(.*)ОТЕЛЬ/i);
        if (!match) {
            return splitted[0];
        }
        var inRussian = match[1].match(/(.*)\/[^\/]+/);
        return inRussian ? splitted[0] + ' / ' +inRussian[1] : splitted[0] + ' / ' +match[1];
    }

	if ( hotel ) {
		var region = hotel.querySelector(".name span").textContent;
		var m = region.match(/(.*)\/[^\/]+/);
		return m == null ? region : m[1];
	}


	var match = text.replace(/<[^>]+>/g, "").match(/КУРОРТ:(.*)ОТЕЛЬ/i);
	if ( !match ) {
		return null;
	}
	var inRussian = match[1].match(/(.*)\/[^\/]+/);
	return inRussian ? inRussian[1] : match[1];
}

function extractNights(td) {
	var s = td.textContent;
	return s.indexOf("+") < 0 ? s : s.split("\+").reduce(function(a, b) { return parseInt(a)+parseInt(b); }).toString();
}

function extractOccupancy(div) {
	var ags = div.querySelector(".ags");
	if ( !ags ) {
		return null;
	}
	var s = ags.textContent.trim();
//	Возрасты: 2-6, 2-6, 14+, 14+
//	Возрасты: 0-1, 7-13, 14+; Одноместный номер
	if ( !s )
		return null;

	var occupancy = {
		adultsCount: 0,
		childrenCount: 0,
		childAges: null
	};

	var adults = s.match(/(\d+\+)/g);
	if ( adults )
		occupancy.adultsCount = adults.length;

	var children = s.match(/(\d+-\d+)/g);
	if ( children ) {
		var ages = [];
		for ( var i=0; i<children.length; ++i) {
			var maxAgeStr = children[i].match(/\d+-(\d+)/)[1];
			ages.push(extractIntFromStr(maxAgeStr));
		}
		occupancy.childrenCount = ages.length;
		occupancy.childAges = ages.join(",");
	}

	return occupancy;
}

async function createOption(img) {
    var isRatingBtn = img.classList.contains("qq-rating-btn")
    var div = img.parentNode.parentNode;
    var tr = div.parentNode.parentNode;
    var tds = tr.querySelectorAll("td");
    var hotel = getHotelRow(tr);
    var hotelText = null;
    if ( !hotel && !isRatingBtn ) {
        var theUrl = window.location.protocol + "//www.bgoperator.ru/site?action=title"
            + tds[3].querySelector(".i_an").getAttribute("urr");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        hotelText = xmlHttp.responseText;
    }


    if ( isRatingBtn ) {
        return {
            hotelName: extractHotelName(hotel, hotelText, isRatingBtn),
            region: extractRegion(hotel, hotelText),
            country: getCountry(),
            checkinDt: "01.01.1970"
        };
    }

    var pc = extractPriceAndCurrency(div);
    var checkinDt = extractDate(hotel, tds[3]);
    var nights = extractNights(tds[0]);
    const href = hotel ? hotel.querySelector(".name a").href : "";
    var thumbnail = getBackgroundImageUrl($1('[style*="background-image"]', hotel));
    if ( href && !isRatingBtn ) {
        const hotelPage = await fetch(href).then(resp => resp.text()).catch(_=>null);
        if ( hotelPage ) {
            const page = getDocumentFromString(trim(hotelPage))
            const link = $1('.b-htl img[src*="pr_img"]:not(img[src*=".gif"])', page);
            if ( link ) {
                thumbnail = link.src;
            }
        }

    }

    let option =  {
        hotelName: extractHotelName(hotel, hotelText, false, tds[0]),
        region: extractRegion(hotel, hotelText),
        country: getCountry(),
        checkinDt: checkinDt,
        nights: nights,
        timestamp: Date.now(),
        extra_nights: extractExtraNights(checkinDt, nights, tr.getAttribute("checkout")),
        boardType: extractBoardType(tds[2]),
        roomType: extractRoomType(tds[2]) + " / " + extractRoomAlloc(div),
        price: pc.price,
        currency: pc.currency,
        href: hotel ? hotel.querySelector(".name a").href : "",
        city_from: getCity(),
        occupancy: extractOccupancy(div),
        tour_url: extractTourUrl(div),
        tour_name: tds[1].textContent,
        thumbnail: thumbnail && thumbnail !== 'none' ? thumbnail : null,
        flight: JSON.parse(tr.getAttribute("flight-tour-info") || null)
    };
    return option;
}

function  extractExtraNights(checkinDt, nights, checkoutDt) {
	if ( checkoutDt && checkoutDt !== "none" ) {
		return (getDistance(getDate(checkinDt), getDate(checkoutDt)) - nights).toString();
	}
}

function getDate(text) {
	var m = text.match(/(\d{2})\.(\d{2})\.(\d{4})/);
	return new Date(extractIntFromStr(m[3]), extractIntFromStr(m[2]) - 1, extractIntFromStr(m[1]));

}

function createNobr() {
    return qqBtns({ asyncFunc: getAsyncInfo, align: "qq-horizontal"});
}

async function injectData() {
    injectCurrencySelection();
    var divs = querySelectorAll(document, "table.b-pr_t div.pe").filter(div => div.querySelector(".qq") === null);
    divs.forEach(attachBuyBtnEvents);
    for ( var i = 0; i < divs.length; ++i ) {
        if ( i%300 === 0 ) {
            await waiting(1)
        }

        if ( divs[i].querySelector(".qq") == null ) {
            var div = divs[i];
            var a = div.querySelector("a");
            if ( a != null ) {
                var s = a.nextSibling;
                if ( s != null && s.parentNode === div )
                    div.insertBefore(createNobr(), s);
            } else {
                div.appendChild(createNobr());
            }
        }
    }
}

function attachBuyBtnEvents(div) {
    try {
        const a = div.querySelector('a[href*="www.bgoperator.ru/zaya"]');
        const x = getParameterByName('x', a.href);
        const prx = getParameterByName('prx', a.href);
        const concated = (prx+x).replace(/\D+/g,'');
        a.addEventListener('mousedown', ()=> {
            window.localStorage.setItem(crc32(concated), JSON.stringify(createOption(div.querySelector('.qq-add-btn'))));
        });
    } catch (e) {
        return null;
    }
}

function injectCurrencySelection() {
	if( document.querySelector("#qq-currency") ) {
		return;
	}
	var submit = document.querySelector("#id_pf button.f-submit");
	if ( !submit ) {
		return;
	}
	addCurrencySelection(submit);
	addAddonMessageListener(OPERATOR_CURRENCY + " currency", function(currency) {
		document.querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
		document.querySelector("#qq-currency").setAttribute("style", "margin-top:-12px;");
	});
    sendMessageToAddon("get operator currency", OPERATOR_CURRENCY);
}

function isPrefferedDefaultCurrency() {
	var sel = document.querySelector("#qq-currency select");
	return !sel || sel.value != "USDEUR";
}

function addCurrencySelection(submit) {
	var div = document.createElement("div");
	div.id = "qq-currency";
	div.className = "b-pfs3";
	div.setAttribute("style", "display: none;");

	var legend = document.createElement("legend");
	legend.setAttribute("style", "width:auto;float:left;margin-right:6px;");
	legend.innerHTML = "Выберите предпочитаемую валюту для <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo:";
	div.appendChild(legend);

	var select = document.createElement("select");
	select.setAttribute("style", "margin-top:-3px;");
	select.onchange = function () {
        sendMessageToAddon("set operator currency", {operator: OPERATOR_CURRENCY, currency: select.value});
	};

	var defaultCurr = document.createElement("option");
	defaultCurr.value = DEFAULT_CURRENCY;
	defaultCurr.textContent = "Нац. валюта";
	select.appendChild(defaultCurr);

	var foreign = document.createElement("option");
	foreign.value = "USDEUR";
	foreign.textContent = "USD / EUR";
	select.appendChild(foreign);

	div.appendChild(select);

	submit.parentElement.insertBefore(div, submit);
}

async function getAsyncInfo(img) {
    var tr = img.parentNode.parentNode.parentNode.parentNode;

    function getCheckoutDateFromTooltip() {
        simulateMouseEvent(tr.querySelector('.c_dn'), 'mouseover');
        var title = document.querySelector(".tooltip--title");
        if ( title && title.style.visibility != 'hidden' ) {
            var m = title.textContent.match(/\d{2}\.\d{2}\.\d{4}/);
            if ( m ) {
                return m[0];
            }
        }
        return "none";
    }

    function getThumbnailFromTooltip() {
        simulateMouseEvent(tr.querySelector('.i_an'), 'click');
        var popup = document.querySelector(".tooltip--default");
        if ( popup && popup.style.visibility != 'hidden' ) {
            var link = popup.querySelector("img");
            if ( link && !link.src.match("pr_img/smnull") ) {
                return link.src;
            } else if ( popup.querySelector("table") ) {
                return "none";
            }
        }
        return null;
    }

    function restoreView() {
        simulateMouseEvent(tr.querySelector('.c_dn'), 'mouseout');
        simulateMouseEvent(tr.querySelector('.i_an'), 'mouseout');
        simulateMouseEvent(tr, 'click');
    }

    if ( !tr.getAttribute("checkout") ) {
        await waitingFor(getCheckoutDateFromTooltip, 50, 50)
            .then(date => tr.setAttribute("checkout", date));
        restoreView();
    }

    // if ( !tr.getAttribute("thumbnail") ) {
    //     await waitingFor(getThumbnailFromTooltip, 50, 50)
    //         .then(imgSrc => tr.setAttribute("thumbnail", imgSrc));
    //     restoreView();
    // }
    if ( !tr.getAttribute("flight-tour-info") && canGetFlightInfo(img) ) {
        var sectorsArray = await getFlightSectors(tr);
        if ( sectorsArray ) {
            var flightInfo = {
                sectors: convertSectors(sectorsArray)
            };
            tr.setAttribute("flight-tour-info", JSON.stringify(flightInfo));
        }
    }
    return img;
}

async function getFlightSectors(tr) {
    var flightsTitles = querySelectorAll(tr, ".i_ft, .i_an").map(li => {  //в первый момент времени, иногда, сервер не возвращает информацию по какому либо из перелетов
        simulateEvent(li, "mouseover");                                                     // мы на всякий случай эмулируем события, чтобы сайт послал запросы на сервер. После такого наш запрос срабатывает в 100%
        simulateEvent(li, "mouseout");
        return li;
    });
    if ( flightsTitles.length === 0 ) {
        return null;
    }

    return extractSectors(flightsTitles);
}

function getInfoWithFetch(url) {
    return fetchTimeout(7000, fetch(`${window.location.origin}/site?action=title${url}`, {
        "referrer": window.location.href,
        "method": "GET"
    })).then(response => response.text()).then(segmentHTML => {
        var table = createTempTable(sanitize(segmentHTML));
        if ( !table ) {
            return null;
        }
        var items = querySelectorAll(table, "tr");
        var [date, departure, arrival, flight] = [
            "Дата:", "Отправление:", "Прибытие:", "Рейс:"
        ].map(title => {
            return findItem(items, title);
        });
        return {date: date, departure: departure, arrival: arrival, flight: flight};
    });
}

function findItem(items, title) {
    var desc = items.find(function (item){
        return !!(item && item.textContent.match(title));

    });
    return desc ? desc.textContent.replace(title,"").trim() : null;
}

async function extractSectors(flightsTitles) {
    var sectorsArray = [];
    var tempArray = [];
    for (var li of flightsTitles) {
        if ( li.classList.contains("i_ft") ) {
            var urr = li.getAttribute("urr");
            var segment = await getInfoWithFetch(urr);
            if ( segment === null ) {
                return null;
            }
            tempArray.push(segment);
        }
        if ( li.classList.contains("i_an") && tempArray.length > 0 ) {
            tempArray.length > 0 ? sectorsArray.push(tempArray) : null;
            tempArray = [];
        }
    }
    if ( tempArray.length > 0 ) {
        sectorsArray.push(tempArray);
    }
    if ( sectorsArray.length === 0 ) {
        return null;
    }
    return sectorsArray;
}

function createSegments(sector) {
    var flightConcretization = document.querySelector('[name="novirt"]');
    const planeText = flightConcretization && !flightConcretization.checked ? 'Рейс без конкретизации, может измениться!' : null;
    return sector.map(segment => {
        var segmentData = {
            flightNumber: segment.flight.replace(/\(.+\)/g, "").trim(),
            airline: (segment.flight.match(/\((.+)\)/) || [])[1],
            departureDate: segment.date,
            departureTime: (segment.departure.match(/\d{2}:\d{2}/) || [])[0],
            departureCity: (segment.departure.match(/\((.+?)\s*:.+\)/) || [])[1],
            departureAirport: (segment.departure.match(/\(.+:\s*(.+)\)/) || [])[1],
            departureAirportID: segment.departure.replace(/\(.+/, "").trim(),
            departureTerminal: (segment.departure.match(/\s+([A-Z])\)/) || [])[1],
            serviceClass: planeText,
            arrivalDate: (segment.arrival.match(/d{2}\.\d{2}\.\d{4}/) || [])[0] || segment.date,
            arrivalTime: (segment.arrival.match(/\d{2}:\d{2}/) || [])[0],
            arrivalCity: (segment.arrival.match(/\((.+?)\s*:.+\)/) || [])[1],
            arrivalAirport: (segment.arrival.match(/\(.+:\s*(.+)\)/) || [])[1],
            arrivalTerminal: (segment.arrival.match(/\s+([A-Z])\)/) || [])[1],
            travelTime: planeText,
            plane: planeText
        };
        return segmentData;
    });
}

function createTempTable(text) {
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;
    var table = tempDiv.querySelectorAll("table");
    return table[0];
}

function convertSectors(sectorsArray) {
    return sectorsArray.map(sector => {
        return {segments: createSegments(sector)};
    });
}

function getFlight() {
    return true;
}
