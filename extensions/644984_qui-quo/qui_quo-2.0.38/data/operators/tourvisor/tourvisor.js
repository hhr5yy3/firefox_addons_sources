window.OPERATOR_NAME = "Tourvisor";
window.showTopHotelsRating = true;
window.tempTourId = null;
window.QQ_option = null;
window.TO = {
		'62': 'Ambotis', '33': 'Amigo-S', '13': 'Anex', '18': 'Biblioglobus', '115': 'Calypso', '78': 'China Travel',
		'11': 'Coral', '65': 'De Visu', '116': 'Elite Travel', '58': 'Evroport', '63': 'Grand', '70': 'HIS', '95': 'Holiday Operator',
		'40': 'ICS', '69': 'Intravel', '67': 'ITM', '89': 'Kazunion (KZ)', '90': 'Kompas (KZ)', '92': 'Meridian Express', '44': 'More Travel',
		'17': 'Mouzenidis', '36': 'PAC', '27': 'Paks', '21': 'Panteon', '12': 'Pegas', '34': 'Pegas (KZ)', '74': 'Pitertour',
		'66': 'Space Travel', '59': 'Spectrum', '16': 'Sunmar', '15': 'TezTour', '25': 'FUN&SUN', '24': 'Vedi', '20': 'Vilar Tours',
		'93': 'FUN&SUN', '117': 'Адонис', '31': 'Алеан', '28': 'Амиго', '118': 'Арт Тревел', '53': 'Арт-Тур', '87': 'АэроБелСервис (BY)',
		'30': 'Балкан Экспресс', '120': 'Время-Тур', '49': 'Данко', '41': 'Дельфин', '51': 'Джет Тревел',
        '52': 'Мальдивиана', '86': 'ИНТЕРСИТИ (BY)',
		'50': 'ИнтерСпутник', '43': 'Интурист', '80': 'Кандагар', '38': 'Карибский Клуб', '83': 'Криптон', '42': 'Матрешка Тур',
		'79': 'Мультитур', '39': 'Натали Турс', '68': 'Планета Сочи', '96': 'Премьера', '91': 'Пулково Сервис', '47': 'Ривьера Сочи',
		'85': 'Робинзон', '60': 'Роза Ветров', '119': 'Роза Ветров Юг', '88': 'Ростинг (BY)', '23': 'Рус.Экспресс', '55': 'Русь Тур',
		'71': 'Самараинтур', '84': 'Спасские Ворота', '75': 'СТА-Новосибирск', '32': 'Финист', '73': 'Фонд Мира', '82': 'Экспресс-Турс', '64': 'ЮгоСтар', '161': 'One Touch & Travel'};
window.ADDED_BUTTONS = new Map();

// -------- Find Action ---------------------------
window.qscript = document.createElement("script");
window.qscript.src = chrome.runtime.getURL('data/operators/tourvisor/inline_script.js');
document.head.append(window.qscript);

function getContainer(btn) {
    if ( !btn ) {
        return document;
    }

    const container = btn.closest('.TVResultContent');
    return container || document;
}

function getCountry(btn) {
    const container = getContainer(btn);
	let country = container.querySelector(".TVCountryBlock .TVTextBoxContent");
	if ( !country ) {
		country = container.querySelector(".TVCountryBlock .TVBoxContent");
	}
	let tVResulContent = container.querySelector(".TVResulContent");
	if ( tVResulContent && tVResulContent.offsetParent ) {
		country = tVResulContent.querySelector(".TVBoxContent");
	}
	if (!country ) {
		country  = container.querySelector(".TVResulContent .TVCountry .TVMainFilterContent, .TVMainFilterButton.TVCountry");
	}
	if (!country ) {
		country  = container.querySelector(".TVCountry, .TVMainContent, .TVCountrySelect .TVMainSelectContent");
	}
	return country == null ? null : country.textContent.trim() || country.title;
}

function getCity(btn) {
    const container = getContainer(btn);
	let tVResulContent = container.querySelector(".TVResulContent");
	let c = tVResulContent && tVResulContent.offsetParent ? tVResulContent.querySelector(".TVContent") : container.querySelector("#TVLocation .TVContent");
    if ( !c ) {
        c = container.querySelector(".TVLocationButton .TVMainFilterContent, .TVMainFilterButton.TVLocationButton");
    }
	if ( !c ) {
		c = container.querySelector(".TVLabel.TVContent");
	}
	if ( !c ) {
		c = container.querySelector(".TVlocation, .TVDepartureSelect .TVMainSelectContent");
	}
	return c == null ? null : c.textContent || c.title;
}

function initializeSearchCriteria(btn) {
    let country = getCountry(btn);
    if ( !country )
        return null;

    let city = getCity(btn);
    if ( !city )
        return null;

    getPageLink();
    return { "country" : country,
    		 "city" : city}
}

function getSearchButton() {
	let divs = document.querySelectorAll(".TVSearchButton");
	let buttons = [];
	for ( let i = 0; i < divs.length; ++i ) {
		buttons.push(divs[i]);
	}
    return buttons;
}

async function getPageLink(count = 0) {
    const linkControl = document.querySelector(".TVSRGetLinkLB");
    await waitingFor(()=>null, 1000, 1);
    if ( linkControl ) {
        linkControl.click();
        const copyDialog = document.querySelector(".TVCopyDialog, .TVShareLinkControl");
        if ( copyDialog ) {
            const inputValue =  getNodeProperty(copyDialog.querySelector("input, textarea"), null, "value");
            const closeButton = copyDialog.querySelector(".TVImgClose, .TVClosePopUp");
            if ( closeButton ) {
                closeButton.click();
            }
            if ( SEARCH_CRITERIA ) {
                SEARCH_CRITERIA.pageUrl = inputValue;
            }
            return null;
        }
    }
    return  count < 5 ? getPageLink(count+1) : null;
}

function createHeader() {
    let newTh = document.createElement("th");
    newTh.className = "qq";
    let newContent = document.createTextNode("QQ");
    newTh.appendChild(newContent);
    return newTh;
}

function createCell(row, action, getAsyncInfo) {
    const newCell = row.childNodes[0].cloneNode(false)
    const shadow = newCell.attachShadow({mode: 'closed'});
    const floatingDiv = qqBtns({asyncFunc: getAsyncInfo, parentElement: row}, action);
    floatingDiv.querySelectorAll("div").forEach(div => div.tourRow = row);
    shadow.append(floatingDiv, appendStyleElement(document));
    row.append(newCell);
    window.ADDED_BUTTONS.set(row, {newCell, quiQuoNode: floatingDiv});
    return newCell;
}

function injectData() {
    if ( typeof createInstruction === 'function' ) {
        createInstruction();
    }
    const allButtons = window.ADDED_BUTTONS.entries();
    for (const [div, {newCell}] of allButtons) {
        if ( newCell.offsetHeight === 0 ) {
            newCell.remove()
            window.ADDED_BUTTONS.delete(div);
        }
    }

    [...document.getElementsByClassName('TVTourResultItem')].forEach(div => {
        if ( !window.ADDED_BUTTONS.has(div) ) {
            createCell(div, createOptionVersion3, getAsyncInfo)
        }
    })

    const modal = document.querySelector('.TVTourCardWindow .TVTourCardWindowInfo, .TVTourCardWindow .TVTourCardInfoRightBlock');
    if ( modal ) {
        const buttonBuy = modal.querySelector('.TVActionButtons, .TVTourCardActionControl ');
        if ( buttonBuy.clientHeight > 0 && !window.ADDED_BUTTONS.has(buttonBuy) ) {
            createCell(buttonBuy, createModalOption, null);
        }
    }

    const mobileModal = document.querySelector('.TVMobilePanel .TVTourCardContent');
    const btns = mobileModal ? mobileModal.querySelector('.qq') : null;
    if ( btns && btns.clientHeight === 0 ) {
        btns.remove();
    }
    if ( mobileModal && mobileModal.clientHeight > 0 && !window.ADDED_BUTTONS.has(mobileModal) ) {
        const cell = createCell(mobileModal, createModalOption);
        cell.style.cssText = `
        position: fixed;
        left: 80%;
        top: 10%;
        zoom: 1.2;`
        mobileModal.append(cell);
    }

    $$('.TVResultItemBodyWrapper').forEach(div => {
        if ( !$1('.qq', div) ) {
            const {container, ratingBtn} = createOnlyRatingButtons(createRatingOption);
            container.style.position = 'absolute';
            container.style.right = '48px';
            container.style.top = '9px';
            ratingBtn.style.cssText = `
                transform: scale(1);
                font-size: 12px;
                line-height: 1.5em;
                position: absolute;
                font-weight: 600;
                font-size: 14px;
                padding: 0 5px;
                color: #fff !important;
                text-decoration: none;
                color: white;
                border-radius: 2px;
                min-width: 20px;
                `;

            div.append(container)
        }
    });

}


// --------- Rows ---------------------------------

function extractPrice(td) {
	return parseInt(td.textContent.split(/\s+/).join(""), 10);
}

function extractCurrency() {
   let sel = document.querySelector(".TVSearchResults");
   if ( sel && sel.className && sel.className.match(/TVCurrency(.+)/)) {
	      return sel.className.match(/TVCurrency(\w+)/)[1];
   } else {
	   let c = Array.fromList(document.querySelectorAll("head style"))
	   		  .map(function(e) { return e.textContent && e.textContent.match(/TVSRTourPrice.*content:\s*"([^"]+)/); })
	   		  .filter(function(m) { return m; })
	   		  .map(function(m) { return m[1].trim() });
	   	   return c.length === 1 ? c[0] : "RUB";
   }

}

function extractCheckinAndNights(td) {
	let divs = td.querySelectorAll("div");
	if ( divs.length === 2 ) {
		let nights = divs[1].textContent;
		let date = divs[0].textContent.match(/(\d+)\s*([^\s]+)/);
		return [dateFromDayAndMonthName(date[1], date[2]), extractIntFromStr(nights) + ""];
	} else {
		let nights = divs[0].textContent;
		let date = td.textContent.replace(nights,"").match(/(\d+)\s*([^\s]+)/);
		return [dateFromDayAndMonthName(date[1], date[2]), extractIntFromStr(nights) + ""];
	}
}

function extractBoardType(td) {
	return td.querySelector("div").textContent;
}

function extractRegion(div) {
	let s = div.querySelector(".TVSRHotelResort").textContent;
	let pos = s.lastIndexOf(",");
	return pos > 0 ? s.substring(0, pos).trim() : s;
}

function extractRoomType(tds, shift){
	let alloc = tds[3+shift].textContent.trim();
	let meal = tds[4+shift].querySelector("div").textContent;
	let room = tds[4+shift].textContent.replace(meal,"").trim();
	return trim(room) + " / " + alloc;
}

function extractOperator(td) {
    if ( !td ) {
        return OPERATOR_NAME;
    }
	let img = td.src ? td : td.querySelector("img");
    let matcher;
    if ( !img ) {
		let div = td.querySelector("div[style]");
		if ( div ) {
            matcher = div.getAttribute("style").match(/operators\/searchlogo\/(\d+)\./);
			if ( matcher && TO[matcher[1]] ) {
				return OPERATOR_NAME + " / " + TO[matcher[1]];
			}
		}

		return OPERATOR_NAME;
	}

	let oper = img.title;
	let prefix = "Туроператор ";
	if ( oper && oper.indexOf(prefix) === 0 ) {
		oper = oper.substring(prefix.length);
	}
	if ( !oper )	 {
        matcher = img.src.match(/operators\/mobilelogo\/(\d+)\./);
	    oper = matcher ? TO[matcher[1]] : "";
    }
	return OPERATOR_NAME + (oper ? " / " + oper : "");
}

function extractHotelName(hotel) {
	let s = hotel.querySelector(".TVSRHotelName span");
	if ( s == null ) {
		return hotel.querySelector(".TVSRHotelName").textContent;
	}

	let a = hotel.querySelector(".TVSRHotelName a");
	if ( a != null ) {
		return a.textContent + " " + s.textContent;
	}

	return hotel.querySelector(".TVSRHotelName").textContent.split(s.textContent).join("").trim() +
		" " + s.textContent;
}

function extractHotelRef(hotel) {
	let a = hotel.querySelector(".TVSRHotelName a");
	if ( !a ) {
		let btn = hotel.querySelector(".TVSRDiscrHotelVal");
		if ( btn && btn.parentNode.href ) {
			a = btn.parentNode;
		}
	}
	return a == null ? "" : a.href;
}

function createOption(img) {
    checkAgencySite();
    let option = optionFromAttr(img);
    let hotel = tr ? tr.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode : null;
    if ( option ) {
        option.region = getRegion(hotel) || option.region;
        return option;
    }
    let tr = img ? img.parentNode.parentNode.parentNode : null;


    let tds = getChildElementsByTagName(tr, "td");

    let operatorShown = tr.querySelector(".TVSROpLogo") != null;
    let shift = operatorShown ? 0 : -1;

    let checkinAndNights = extractCheckinAndNights(tds[2 + shift]);

    option = {
          hotelName : extractHotelName(hotel),
          hotel_desc: getNodeProperty(hotel.querySelector('.TVSRHotelDescr'), '').replace(/с описанием/i, ''),
          country: SEARCH_CRITERIA ? SEARCH_CRITERIA.country : "",
          city_from: SEARCH_CRITERIA ? SEARCH_CRITERIA.city : 'Нет данных',
          href : extractHotelRef(hotel),
          pageUrl: SEARCH_CRITERIA.pageUrl,
          operator : operatorShown ? extractOperator(tds[0]) : OPERATOR_NAME,
          region : extractRegion(hotel),
          checkinDt : option ? (option.checkinDt || checkinAndNights[0]) : checkinAndNights[0],
          nights : checkinAndNights[1],
          boardType : extractBoardType(tds[4+shift]),
          roomType: extractRoomType(tds, shift),
          currency : extractCurrency(),
          price : extractPrice(tds[5+shift]),
          thumbnail : tr.getAttribute("big-image") || extractThumbnail(hotel),
          book_tour_url : null,
          occupancy : option ? option.occupancy : null,
          flight: null
    };
    setOptionAttr(img, option);
    return option;
}

function extractThumbnail(hotel) {
	let img = hotel.querySelector(".TVSRHotelImg img, .TVTem2Image img, .TVImage img");
	return img && img.src ? img.src : null;
}

function saveTourId(event) {
    const target = event.target;
    const tr = target.closest('tr, t-tr');
    const qqBtn = tr.querySelector('.qq .qq-add-btn');
    if ( qqBtn ) {
        const option = JSON.parse(qqBtn.getAttribute('qq-option'));
        option.tvtourid = tr.getAttribute('tv-tourid');
        QQ_option = option;
    }
}

async function getAsyncInfo(img) {
    let option = optionFromAttr(img) || chooseAndExecOption(img);
    let tr = (img.tourRow || img.closest('tr, t-tr'));
    let tourId = await getTourId(tr, img);
    let oldUrl = window.location.href;
    if (tourId && (!option.book_tour_url || !option.flight)) { //сперва пытаемся вытянуть инфо фетчем
        let requestBookTour = await getInfoWithFetch(tourId, "", img);
        if (img.getAttribute("get-flight") === "true") {
            setFlightInfo(requestBookTour);
        }
        if (!setFetchedInfo(requestBookTour)) {
            await openPopup();
        }
    }

    if ( !tourId && !option.book_tour_url  ) {  //если нет тур айди или не получилось забрать фетчем, открываем попап -> берем оттуда
        await openPopup();
    }

    setOptionAttr(img, option);

    //Объявление необходимых функций, вложенность функций необходима для использования замыканий (удобнее, особенно при использовании функции из utils.js)
    async function openPopup() {
        if ( tr ) {
            let openPopupBtn = tr.querySelector('.TVSRTourPrice .TVSRTourPriceValue, .TVTem2TourPrice, .TVSTourResultItemPrice');
            openPopupBtn.click();
        }
        let shareIcon = document.querySelector(".TVSocialShareIcon.TVGetLinkIcon");
        let country = getNodeProperty(document.querySelector('.TVHotelTitleResort'));
        let city_from = getNodeProperty(document.querySelector(".TVTourCardDeparture .TVTourCardOptionFooter"));
        await waitingFor(getPopupInfo, 500, 10).then(result => {
            if ( !result && document.querySelector(".TVTourCardWindow") &&
                window.location.href.indexOf("tvtourid") > 0 &&
                window.location.href !== oldUrl ) {
                option.book_tour_url = window.location.href.replace('pro.', '');
                option.book_tour_url = typeof TOURVISOR_AGENCY_SITE == 'undefined' ? null : window.location.href;
                option.href =  window.location.href.replace('pro.', '');
                option.country = result[1];
                option.city_from = result[2];
            } else {
                option.book_tour_url = typeof  TOURVISOR_AGENCY_SITE == 'undefined' ? null : result[0];
                option.href = (result[0] || '').replace('pro.', '');
                option.country = result[1];
                option.city_from = result[2];
            }
            let closeBtn = document.querySelector(".TVClosePopup, .TVClosePopUp");
            closeBtn && tr ? closeBtn.click() : null;
        });

        function getPopupInfo() {
            const priceNode = document.querySelector('.TVTourPriceContainer');
            if ( !priceNode || !getText(priceNode, 'innerText') ) {
                return null;
            }
            shareIcon = document.querySelector(".TVSocialShareIcon.TVGetLinkIcon");
            country = getNodeProperty(document.querySelector('.TVHotelTitleResort'), '').split(/\s*,\s*/)[0];
            city_from = getNodeProperty(document.querySelector(".TVTourCardDeparture .TVTourCardOptionFooter"))
            if ( shareIcon ) {
                shareIcon.click();
                const shareText = document.querySelector(".TVShareLinkControl textarea");
                if ( shareText ) {
                    return [shareText.value, country, city_from];
                }
            }
            return null;
        }
    }

    function setFetchedInfo(json) {
        try {
            const hasTourInfo = json.data && json.data.tour;
            let shareUrl = checkBookTourUrlProtocol(json.data.tour.share.searchlink);
            shareUrl = shareUrl ? shareUrl.replace("?desktop", "") : shareUrl;
            let hotelDesc = json.data && json.data.hotel ? json.data.hotel.hoteldescription : "";
            let bigImage = json.data
            && json.data.hotel
            && Array.isArray(json.data.hotel.images)
            && json.data.hotel.images[0]
            && json.data.hotel.images[0].big
                ? json.data.hotel.images[0].big : "";
            option.book_tour_url =  typeof TOURVISOR_AGENCY_SITE == 'undefined' ? null : shareUrl;
            option.hotel_desc =  hotelDesc.replace(/с описанием/i, '');
            option.hotelName = json?.data?.hotel ?  `${json.data.hotel.hotelname} ${json.data.hotel.hotelstars && json.data.hotel.hotelstars !== '0' ? json.data.hotel.hotelstars+'*' : ''}`: null;
            option.country = hasTourInfo ? hasTourInfo.countryname : SEARCH_CRITERIA.country;
            option.city_from =  hasTourInfo ? hasTourInfo.departurename : SEARCH_CRITERIA.city;
            option.region = null;
            option.resortManyhotels = json.data && json.data.hotel ? json.data.hotel.hotelregionname : null;
            option.hrefManyhotels = hasTourInfo && hasTourInfo.fulldesclink || null;
            option.operator = hasTourInfo ? OPERATOR_NAME + (hasTourInfo.operatorname  ? " / " + hasTourInfo.operatorname : "") : OPERATOR_NAME;
            option.thumbnail = bigImage;
            option.href = (shareUrl || option.href || '').replace('pro.', '');
            option.checkinDt = hasTourInfo && hasTourInfo.flydate ? json.data.tour.flydate : null;
            option.occupancy = hasTourInfo ? {
                adultsCount: +hasTourInfo.adults,
                childrenCount: +hasTourInfo.child,
                childAges: Array.from({ length: hasTourInfo.child }).map( (elem, index) => hasTourInfo[`childage${index+1}`] ).join(',')
            } : null
            return true;
        } catch (e) {
            return false;
        }
    }

    function setFlightInfo(requestFlightInfo) {
        try {
            let flightInfo = requestFlightInfo.data.result;
            flightInfo = createFlightInfo(flightInfo.flights.defaultSet);
            option.flight = flightInfo;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

async function getTourId(tr, img) {
    if ( img.closest(".TVTourCardWindowInfo") ) {
        return null;
    }
    const targetNode = document;
    const observerOptions = {
        childList: true,
        subtree: true
    }
    const observer = new MutationObserver(waitJsonp);
    observer.observe(targetNode, observerOptions);
    sessionStorage.setItem('addClicked', 'true');
    if ( tr ) {
        let openPopupBtn = tr.querySelector('.TVSRTourPrice .TVSRTourPriceValue, .TVTem2TourPrice, .TVTourResultItemPrice, .TVSTourResultItemPrice');
        openPopupBtn.click();
    }
    await waitingFor(()=> sessionStorage.getItem('tourId') || window.tempTourId, 300, 50);
    observer.disconnect();
    const tourId = sessionStorage.getItem('tourId') || window.tempTourId;
    sessionStorage.removeItem('tourId');
    sessionStorage.removeItem('addClicked');
    window.tempTourId = null;
    let closeBtn = document.querySelector(".TVClosePopup, .TVClosePopUp");
    closeBtn && tr ? closeBtn.click() : null;
    return tourId;
}

function waitJsonp(records) {
    records.forEach(rec => {
        if ( rec && rec.addedNodes.length > 0 ) {
            if ( rec.addedNodes[0].tagName === 'SCRIPT' && rec.addedNodes[0].src ) {
                const id = rec.addedNodes[0].src.match(/tourid=(\d+)/);
                window.tempTourId = id ? id[1] : null;
            }
        }
    })
}

function chooseAndExecOption(img) {
    if ( img.closest(".TVTourCardWindowInfo") ) {
        return createModalOption(img);
    }

    if ( document.querySelectorAll(".TVSRPriceContainer>table>thead>tr").length !== 0 ) {
        return createOption(img);
    } else {
        return createOptionVersion3(img);
    }
}

async function getInfoWithFetch(tourId, detailed, img) {
    const url = `${window.location.protocol}//tourvisor.ru/xml/modact.php?format=json&referrer=${window.location.origin}&tourid=${tourId}${detailed}&curue=0&callback=callback1`;
    const body = {
        "credentials": "omit",
        "referrer": window.location.href,
        "referrerPolicy": "no-referrer-when-downgrade",
        "method": "GET",
        "mode": "cors"
    };
    if ( !canGetFlightInfo(img) && detailed === '&detailed=1' ) {
        return null;
    }
    return await fetchTimeout(10000, fetch(url, body)).then(response => response.text()).then(text => {
        let parsed = text.match(/callback1\((.+)\)/);
        return JSON.parse(parsed[1]);
    }).catch(e => null)
}


function createFlightInfo(flight) {
    if ( !flight.forward || !flight.reverse || flight.forward.length === 0 || flight.forward.length === 0 ) {
        return null;
    }
    let fwdDate = dayMonthYearToString(flight.forwardDate.d, flight.forwardDate.m, flight.forwardDate.y);
    let rvsDate = dayMonthYearToString(flight.reverseDate.d, flight.reverseDate.m, flight.reverseDate.y);
    return {
        sectors: [
            {
                segments: flight.forward.map(elem => {
                    let flightDate = checkAndExtractFlightDate(elem.departure.date, fwdDate);
                    if ( !elem.departure.port.name || !elem.arrival.port.name ) {
                        return null;
                    }
                    return new FlightSegment({
                        flightNumber: elem.number.match(getRegexPatterns().flightNumber) ? elem.number : null,
                        airline: elem.company.name,
                        departureDate: flightDate,
                        departureTime: elem.departure.time,
                        departureAirport: elem.departure.port.name,
                        departureAirportID: elem.departure.port.id.split(/-|\s/)[0],
                        departureTerminal: elem.departure.port.id.split(/-|\s/)[1],
                        arrivalDate: flightDate !== null ? elem.arrival.date : null,
                        arrivalTime: elem.arrival.time,
                        arrivalCity:  elem.arrival.port.name,
                        arrivalAirport: elem.arrival.port.name,
                        arrivalAirportID: elem.arrival.port.id.split(/-|\s/)[0],
                        arrivalTerminal: elem.arrival.port.id.split(/-|\s/)[1],
                        plane: elem.plane
                    })
                })
            }, {
                segments: flight.reverse.map(elem => {
                    if ( !elem.departure.port.name || !elem.arrival.port.name) {
                        return null;
                    }
                    let flightDate = checkAndExtractFlightDate(elem.departure.date, rvsDate);
                    return new FlightSegment({
                        flightNumber: elem.number.match(getRegexPatterns().flightNumber) ? elem.number : null,
                        airline: elem.company.name,
                        departureDate: flightDate,
                        departureTime: elem.departure.time,
                        departureAirport: elem.departure.port.name,
                        departureAirportID: elem.departure.port.id.split(/-|\s/)[0],
                        departureTerminal: elem.departure.port.id.split(/-|\s/)[1],
                        arrivalDate: flightDate !== null ? elem.arrival.date : null,
                        arrivalTime: elem.arrival.time,
                        arrivalAirport: elem.arrival.port.name,
                        arrivalAirportID: elem.arrival.port.id.split(/-|\s/)[0],
                        arrivalTerminal: elem.arrival.port.id.split(/-|\s/)[1],
                        plane: elem.plane
                    })
                })
            }
        ]
    }
}

function checkAndExtractFlightDate(flightDate, tourDate) {
    if ( !flightDate && !tourDate ) {
        return null;
    }
    if ( flightDate && tourDate ) {
        return Math.abs((dayMonthYearToDate(flightDate) - dayMonthYearToDate(tourDate))) < 86400000 ? flightDate : null; //86400000ms = 1 day
    }
    if ( !flightDate && tourDate ) {
        return tourDate;
    }
}

function customDateToFullString(date) {
      return  date.month + "." + date.day + "." + date.year + " " + date.time;
}

function getHotelRowByImage(img) {
    let div = (img.tourRow || img).parentNode;
	while (true) {
		if ( div.className === "blpricesort" || div.classList.contains('TVResultListViewItem') || !div.parentNode || div.classList.contains('TVTourCardWindow') ) {
			break;
		}
		if ( div.className === "TVTem2DetailPanel") {
			div = div.previousElementSibling;
			break;
		}
		div = div.parentNode;
	}
	return div;
}

function createOptionVersion3(img) {
    let hotel = getHotelRowByImage(img);
    checkAgencySite();
   // const hotelLink = checkBookTourUrlProtocol($1('.TVResultItemTitle > a', hotel)?.dataset?.tvtourlink);
    let option = optionFromAttr(img);

    if ( option ) {
      //  option.href = hotelLink ? hotelLink : option.href;
    //  option.hrefUpdated = hotelLink && window.location.origin === 'https://pro.tourvisor.ru' ? true : null;
        option.region = getRegion(hotel) || option.region;
        if ( typeof TOURVISOR_AGENCY_SITE !== 'undefined' ) {
            const url = new URL(option.book_tour_url);
            url.hostname = location.hostname;
            option.book_tour_url = url.href;
        }

        return option;
    }
    let tr = img.tourRow ? img.tourRow.closest('t-tr') :  img.parentNode.parentNode.parentNode;
    let attrOption = optionFromAttr(img) || {};
    option = {
        checkinDt: attrOption ? (attrOption.checkinDt || getDateAndNights(tr)[0]) : getDateAndNights(tr)[0],
        nights: getDateAndNights(tr)[1],
        extra_nights: getDateAndNights(tr)[2],
        hotelName: hotel.querySelector(".TVTem2Name, .TVHotelName, .TVResultItemHeader .TVResultItemTitle, .TVSResultItemTitle").textContent,
        hotel_desc: getNodeProperty(hotel.querySelector(".TVDescription"), '').replace(/с описанием/i, ''),
        href: (attrOption.href || getURL(hotel) || '').replace('pro.', ''),
        pageUrl: SEARCH_CRITERIA ? SEARCH_CRITERIA.pageUrl : window.location.href,
        roomType: getRoomType(tr),
        hrefManyhotels: attrOption.href || getURL(hotel),
        resortManyhotels: attrOption.resortManyhotels,
        region: getRegion(hotel),
        boardType: tr.querySelector(".TVTem2ThirdCol .TVTem2TopRow, .TVTourResultItemRoomWrapper, .TVSTourResultItemRoomWrapper").nextElementSibling.textContent,
        price: getPrice(tr),
        currency: mapCurrencyUtil(getCurrencyVer3(tr)),
        country: SEARCH_CRITERIA ? SEARCH_CRITERIA.country : "",
        city_from: SEARCH_CRITERIA ? SEARCH_CRITERIA.city : null,
        operator: extractOperator(tr.querySelector(".TVTem2FirstCol, .TVTourResultItemOperator")),
        thumbnail: tr.getAttribute("big-image") || extractThumbnail(hotel),
        book_tour_url: null,
        occupancy: option ? option.occupancy : 'Нет данных',
        flight: null,
       // hrefUpdated: hotelLink && window.location.origin === 'https://pro.tourvisor.ru' ? true : null
    };
    setOptionAttr(img, option);
    return option;
}

function getDateAndNights(tr) {
	let [dateNode, nightsNode] = tr.querySelectorAll(".TVTem2SecondCol .TVTem2TopRow span, .TVTourResultItemDate, .TVTourResultItemNights, .TVSTourResultItemDate, .TVSTourResultItemNights");
	let date = dateNode.textContent.match(/(\d+)(\D+)/);
	let [nights, extra_nights] = getText(nightsNode).split(/\s*\+\s*/);
	return [dateFromDayAndMonthName(date[1], date[2].trim()), String(extractIntFromStr(nights)), String(extractIntFromStr(extra_nights || "0"))];
}

function getRoomType(tr) {
    return querySelectorAll(tr, ` .TVTem2ThirdCol .TVTem2TopRow span, 
                                                   .TVTourResultItemRoomWrapper span, .TVTourResultItemRoom,
                                                   .TVSTourResultItemRoomWrapper span, 
                                                   .TVTourResultItemTourists,
                                                   .TVSTourResultItemRoom,
                                                   .TVSTourResultItemTourists`).map(function (span) {
        return span.textContent
    }).join(" / ");
}

function getRegion(hotel) {
    const tags = $$('.TVHotelInfoTags');
    tags.forEach(tag => tag.style.display = 'none');
    const text =  getNodeData(".TVTem2Resort, .TVRegion, .TVResultItemHeader .TVHotelInfoSubTitle, .TVResultItemSubTitle, .TVSResultItemHeader .TVSHotelInfoSubTitle, .TVSResultItemSubTitle", hotel, 'innerText', '').split(",")[0];
    tags.forEach(tag => tag.style.display = 'flex');
    return text;

}

function getPrice(tr) {
   return extractIntFromStr(tr.querySelector(".TVTem2TourPrice, .TVTourPriceContainer, .TVPricesFinal, .TVTourIncludePriceValue, .TVTourCardPriceControl .TVTourCardPriceValue, .TVTourResultItemPriceValue, .TVSTourResultItemPriceValue, .TVMTourResultItemPriceValue").textContent.replace(/\D+/g,""));
}

function getCurrencyVer3(tour) {
    const currencyTour = getNodeData('.TVSTourResultItemPriceCurrency, .TVTourResultItemPriceCurrency, .TVTourCardActionPriceCurrency, .TVTourCardPriceCurrency', tour);

    if ( currencyTour ) {
        return currencyTour;
    }
    const currencyNode = document.querySelector("[class*='TVCurrency'], .TVTourResultItemPriceCurrency");
    const currency = currencyNode ? currencyNode.className.match(/TVCurrency(\S+)/)[1] : null;
    return currency && !currency.match(/val/i) ? currency : getNodeData('.TVTourCardPriceCurrency');
}

function getURL(hotel) {
	let a = hotel.querySelector(".TVTem2Name a") || hotel.querySelector(".TVHotelName a");
	return a ? a.href : null;
}

function checkBookTourUrlProtocol(bookTour) {
    let bookTourUrl = document.createElement("a");
    let href;
    bookTourUrl.href = (bookTour || '').replace('pro.', '');
    bookTourUrl.protocol = window.location.protocol;
    href = bookTourUrl.href;
    bookTourUrl.remove();
    return href;
}

function getFlight() {
    return true;
}

function checkAgencySite() {
    if ( window.location.origin.match(/tourvisor.ru/) ) {
        if ( typeof AGENCY_WEBSITE !== 'undefined' ) {
            AGENCY_WEBSITE = false;
        }
    }
}

async function createModalOption(img) {
    checkAgencySite();
    const tour = img.tourRow ? img.tourRow.closest('.TVTourCardWindow, .TVTourCardControl, .TVTourCardWindow .TVTourCardInfoControl') : img.closest('.TVTourCardWindow, .TVTourCardControl, .TVTourCardWindow .TVTourCardInfoControl');
    const dateAndNights = getPopupDateAndNights(tour);
    const region = getNodeProperty(tour.querySelector('.TVHotelTitleResort'), '').split(', ');
   // const hotelLink = checkBookTourUrlProtocol(tour.closest('.TVModalContainer, [data-tvtourlink]')?.dataset?.tvtourlink);
    const shareLink = getShareLinkInfo();
    const shortTourId = window.location.href.match(/tvtourid=(\d+)/);
    const isForRating = img.classList.contains('qq-rating-btn');

    const country = getNodeProperty($first('.TVTourCardOptionDeparture .TVTourCardOptionHeader, .TVMapMarkerIcon .TVTourCardOptionHeader, .TVTourCardOptionHeader', tour));
    const modalContainer = tour.closest('.TVModalContainer, .TVMobileContainer ')

    const option = {
        checkinDt: dateAndNights[0],
        nights: dateAndNights[1],
        extra_nights: dateAndNights[2],
        hotelName: getText(tour.querySelector(".TVHotelTitleName"),).toUpperCase(),
        hotel_desc: getNodeProperty(tour.querySelector('.TVHotelDescriptionText'), '').replace(/с описанием/i, ''),
        href: (shareLink || window.location.href).replace('pro.', ''),
        roomType: getNodeProperty(tour.querySelector('.TVTourCardRoom, .TVTourCardOptionRoom, .TVBedIcon'), "", 'innerText').replace(/\n+/, ", "),
        region: region.filter(r => r !== country).join(', '),
        boardType: getNodeProperty(tour.querySelector('.TVTourCardMeal, .TVTourCardOptionMeal .TVTourCardOptionFooter, .TVMealIcon .TVTourCardOptionFooter'), "", 'innerText').replace(/\n+/, ", "),
        price: getPrice(tour),
        currency: mapCurrencyUtil(getCurrencyVer3(tour)),
        country,
        city_from: getNodeProperty(tour.querySelector(".TVTourCardDeparture .TVTourCardOptionFooter, .TVTourCardOptionDeparture .TVTourCardOptionFooter, .TVMapMarkerIcon .TVTourCardOptionFooter"), ''),
        operator: extractOperator(modalContainer.querySelector(".TVTourCardOperatorLinkBlock, .TVTourOperator, .TVTourResultItemOperato, .TVTourCardOperatorr, .TVTourCardOptionOperator, .TVTourCardOptionOperatorLogo")),
        thumbnail: getBackgroundImageUrl(modalContainer.querySelector('.TVPhotoSliderItem, .TVHotelPage .TVPhotoGalleryImage')),
        book_tour_url: typeof TOURVISOR_AGENCY_SITE === 'undefined' ? null : (shareLink || '').replace('pro.', ''),
        occupancy: getPopupOccupancy(tour),
        flight: getPopupFlight(tour)
    };

    if (shortTourId && !isForRating) {
      await getAdditionalPopupTourData(option, shortTourId, img)
    }

    // if(hotelLink) {
    //     option.href = hotelLink;
    //     option.hrefUpdated = window.location.origin === 'https://pro.tourvisor.ru' ? true : null
    // }

    return option;
}

async function getAdditionalPopupTourData(option, shortTourId, img) {
    try {
        const shortid = shortTourId[1];
        let details = await fetchTimeout(10000, fetch(`https://tourvisor.ru/xml/modact.php?shortid=${shortid}`)).then(resp => resp.json()).catch(console.log)
        if ( details.error ) {
            console.log('Error, try alternate request')
            details = await getBackgroundRequest(`https://tourvisor.ru/xml/modact.php?shortid=${shortid}`)
        }
        if (details) {
            if (details && details.data && details.data.hotel) {
                option.thumbnail = details.data.hotel.images && details.data.hotel.images[0] && details.data.hotel.images[0].big ? details.data.hotel.images[0].big : (details.data.hotel.hotelpicturemedium || option.thumbnail);
                option.region = details.data.hotel.hotelregionname || option.region;
                option.country = details.data.hotel.countryname || option.country;
                option.hotel_desc = details.data.hotel.hoteldescription || option.hotel_desc;
                if (details.data.tour && details.data.tour.share) {
                    option.href = checkBookTourUrlProtocol(details.data.tour.share.searchlink);
                    option.book_tour_url = typeof TOURVISOR_AGENCY_SITE == 'undefined' ? null: checkBookTourUrlProtocol(details.data.tour.share.searchlink);
                }

                const dataFlights = await getInfoWithFetch(details.data.tour.tourid, "&detailed=1&extraflights=1", img);
                if (dataFlights && dataFlights.data && dataFlights.data.result && dataFlights.data.result.flights) {
                    const allFlights = [dataFlights.data.result.flights.defaultSet, ...dataFlights.data.result.flights.extraSet]
                    const selectedFlight = allFlights.length > 1 ?  allFlights.find(fl => searchFlightCallback(option, fl)) : allFlights[0];
                    if (selectedFlight) {
                        option.flight = createFlightInfo(selectedFlight)
                    }
                }

                if (details.data.result && details.data.result.cleanprice && details.data.result.cleanprice.value === option.price) {
                    option.currency = details.data.result.cleanprice.currency
                }
            }
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

function searchFlightCallback(option, flight) {
    try {
        const cardFlight = option.flight;
        const apiFlight = createFlightInfo(flight);
        if (cardFlight.sectors.length !== apiFlight.sectors.length) {
            return false;
        }
        const cardSectors = cardFlight.sectors;
        const apiSector = apiFlight.sectors;
        for (const [index, cardSector] of Object.entries(cardSectors)) {
            const cardSegments = cardSector.segments;
            const apiSegments = apiSector[index].segments
            if (cardSegments.length !== apiSegments.length) {
                return false;
            }
            for (const [i, cardSegment] of Object.entries(cardSegments)) {
                if (cardSegment.departureTime !== apiSegments[i].departureTime || cardSegment.arrivalTime !== apiSegments[i].arrivalTime) {
                    return false;
                }
            }
        }
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

function getShareLinkInfo() {
    if ( typeof TOURVISOR_AGENCY_SITE == 'undefined' ) {
        return null;
    }
    // const shareIcon = document.querySelector(".TVSocialShareIcon.TVGetLinkIcon");
    // if ( shareIcon ) {
    //     shareIcon.click();
    //     const shareText = document.querySelector(".TVShareLinkControl textarea");
    //     if ( shareText ) {
    //         const closeBtn = document.querySelector('.TVShareTourLinkPanel .TVClosePopUp');
    //         if ( closeBtn ) {
    //             closeBtn.click();
    //         }
    //         return shareText.value;
    //     }
    // }
    return window.location.href;
}

function getPopupDateAndNights(tour) {
	const dateNode = tour.querySelector(".TVTourCardDate, .TVTourCardOptionDate, .TVCalendarIcon .TVTourCardOptionContent");
	const date = getText(dateNode.querySelector('.TVTourCardOptionHeader')).split(/\s+/);
	const nightsText = getText(dateNode.querySelector('.TVTourCardOptionFooter'));
    let [nights, extra_nights] = (nightsText).split(/\s*\+\s*/);
	return [dateFromDayAndMonthName(date[0], date[1].trim()), extractIntFromStr(nights) + "", extractIntFromStr(extra_nights || "0") + ""];
}

function getPopupOccupancy(tour) {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const room = getNodeProperty(tour.querySelector('.TVTourCardRoom .TVTourCardOptionFooter'));
    if ( !room ) {
        return null;
    }
    const adults = room.match(/(\d+)\s*взр/);
    if ( !adults ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adults[1]);
    const kids = room.match(/(\d+)\s*реб/);
    if ( kids ) {
        occupancy.childrenCount = extractIntFromStr(kids[1]);
    }

    if ( occupancy.childrenCount > 0 ) {
        const ages = room.match(/возраст\s+(.*?)\)/);
        if ( ages ) {
            occupancy.childAges = ages[1].replace(/\s+/g, '');
        }
    }
    return occupancy;
}

function getPopupFlight(tour) {
    try {
        let sectors= $$('.TVTourFlightInfo .TVInputRadioInput:checked, .TVTourFlightsList .TVTourFlightControl', tour)
                    .filter(i => i.clientHeight > 0)
                    .map( input => input.closest('.TVFlightItemControl, .TVTourFlightControl') );



        if ( sectors.length === 0 ) {
            return getPopupMobileFlight();
        }

        if ( sectors.length !== 2 ) {
            return null;
        }
       sectors = sectors.map(parsePopupSegments);
       return {sectors}


    } catch (e) {
        console.log(e);
        return null;
    }
}

function getPopupMobileFlight(tour) {
    let sectors = $$('.TVTourFlightControl, .TVMobileTourFlightControl')
    if (sectors.length !== 2) {
        return null;
    }
    sectors = sectors.map(parsePopupMobileSegments);
    return {sectors}
}

function parsePopupMobileSegments(sector) {
    const depDate = dateFromDayAndMonthName(...getText(sector.querySelector('.TVLeftBlock .TVTourFlightDate, .TVTourFlightDepartureDate')).split(/\s+/));
    const arrDate = dateFromDayAndMonthName(...getText(sector.querySelector('.TVRightBlock .TVTourFlightDate, .TVTourFlightArrivalDate')).split(/\s+/));
    return {
        segments: [new FlightSegment({
            airline: getNodeProperty(sector.querySelector('.TVTourAirlineName'), null),
            departureDate: depDate,
            departureTime: getNodeProperty(sector.querySelector('.TVLeftBlock .TVTourFlightTime')),
            departureCity: getNodeProperty(sector.querySelector('.TVTourFlightDeparture .TVTourFlightPortName')),
            departureAirportID: getNodeProperty(sector.querySelector('.TVTourFlightDeparture .TVTourFlightPortId')),
            arrivalTime: getNodeProperty(sector.querySelector('.TVRightBlock .TVTourFlightTime')),
            arrivalCity: getNodeProperty(sector.querySelector('.TVTourFlightArrival .TVTourFlightPortName')),
            arrivalAirportID: getNodeProperty(sector.querySelector('.TVTourFlightArrival .TVTourFlightPortName')),
            arrivalDate: arrDate
        })]
    }
}

function parsePopupSegments(sector) {
    const depDate = dateFromDayAndMonthName(...getText(sector.querySelector('.TVTourFlightDepartureDate')).split(/\s+/));
    const [departureCity, arrivalCity] = getNodeProperty(sector.querySelector('.TVTourFlightPortNames'), '').split(/\s+-\s+/);
    const [departureTime, arrivalTime] = getNodeProperty(sector.querySelector('.TVTourFlightTime'), '', 'innerText').split(/\n/);
    return { segments: [new FlightSegment({
        airline: getNodeProperty(sector.querySelector('.TVTourFlightAirlineName')),
        departureDate: depDate,
        departureTime,
        departureCity,
        arrivalTime,
        arrivalCity
    })]}
}

function createRatingOption(img) {
    let hotel = getHotelRowByImage(img);
    return {
        checkinDt: "01.01.1970",
        nights: "1",
        hotelName: getText(hotel.querySelector(".TVTem2Name, .TVHotelName, .TVResultItemHeader .TVResultItemTitle, .TVSResultItemTitle")),
        region: getRegion(hotel),
        country: SEARCH_CRITERIA ? SEARCH_CRITERIA.country : "",
        operator: extractOperator(null),
    }
}

async function getBackgroundRequest(url) {
    const reqId = Date.now() + Math.floor(Math.random() * Math.floor(1000000));
    sendMessageToAddon('fetch request', {url, reqId});
    const result = await waitingFor(() => getBackgroundFetchResponse(reqId), 200, 50);
    const json = result ? JSON.parse(result) : null;
    if (json) {
        return json;
    }
    return null;
}


async function addPaidClientFlag() {
    try {
        const {isTestPeriod, cannotMakeQuote} = await chrome.storage.local.get(['isTestPeriod', 'cannotMakeQuote']);
        const html = document.querySelector('html');
        if ( isTestPeriod === false && cannotMakeQuote === false ) {
            html.dataset.qqPaidClient = 'true';
        } else {
            html.dataset.qqPaidClient = '';
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

addPaidClientFlag()
