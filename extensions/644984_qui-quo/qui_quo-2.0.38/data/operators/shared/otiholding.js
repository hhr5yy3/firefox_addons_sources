var globalTr = null;

function getIframe() {
	var iframe = document.querySelector("iframe#_ProductFlightDetail__StaticWindow_IFRAME");
	return iframe && iframe.contentWindow && iframe.contentWindow.document ? iframe.contentWindow.document : null;
}

function isCombinedTourSearch() {
	var e = document.getElementById("packageSearchTR");
	return e && e.style.display == "none";
}

//-------- Find Action ---------------------------


function getCountry() {
	var id = isCombinedTourSearch() ? "cbTourCountry_SEL" : "toCountry_SEL";

    var s = document.getElementById(id);
    if ( s == null ) {
        return null;
    }

    if ( s.value == null ) {
        return null;
    }

    if ( typeof mapCountryCode == 'function' ) {
        var country = mapCountryCode(s.value);
        if ( country != null ) {
        	return country;
        }
    }

    var idx = s.options.selectedIndex;
    if ( idx >= 0 ) {
    	return s.options[idx].text;
    }

    return null;
}

function getCity() {
	if ( /OnlyHotel/i.test(document.location.href) ) {
		return "";
	}

	return selectedOption(document.getElementById(isCombinedTourSearch() ? "cbTourFromArea_SEL" : "fromArea_SEL"));
}

function getOccupancy() {
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null
		};

    var s = selectedOption(document.getElementById(isCombinedTourSearch() ? "cbTourAdult_SEL" : "cbAdult_SEL"));
    if ( !s || !s.match(/\d/) ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(s);

    s = selectedOption(document.getElementById(isCombinedTourSearch() ? "cbTourChild_SEL" : "cbChild_SEL"));
    if ( !s || !s.match(/\d/) ) {
        return null;
    }
    occupancy.childrenCount = extractIntFromStr(s);

    if ( occupancy.childrenCount > 0 ) {
    	var ages = [];
    	var inputs = document.querySelectorAll(isCombinedTourSearch() ? "#tourChildAges input" : "#childAges input");
    	for ( var i=0; i<occupancy.childrenCount; ++i ) {
            var matcher = inputs[i].value ? inputs[i].value.match(/\d+/) : null;
    	    if ( matcher ) {
                ages.push(extractIntFromStr(matcher[0]));
            }
    		else {
    			ages.push(1);
    	    }
    	}
    	occupancy.childAges = ages.join(",");
    }

    return occupancy;
}

function initializeSearchCriteria() {
	var country = getCountry();
	var city = getCity();
	var occupancy = getOccupancy();

	if ( !country || !occupancy ) {
		return null;
	}

	return {country: country, city: city, occupancy: occupancy};
}

function getSearchButton() {
	var id = isCombinedTourSearch() ? "BtnTourSearch_TABLE" : "BtnProductSearch_TABLE";
	var currencyBtn = document.getElementById(id);
	var currencySelect = document.querySelector("#cbCurrency_SEL");
	if ( currencySelect && currencySelect.getAttribute("injected") === "true" ) {
        return currencyBtn;
    }
	if ( !currencySelect ) {
        return currencyBtn;
    }
	currencySelect.addEventListener("change", () => { SEARCH_CRITERIA = initializeSearchCriteria() });
	currencySelect.setAttribute("injected", "true");
	return currencyBtn;
}

// --------- Rows ---------------------------------

function extractPrice(priceAndCurrency) {
    return priceAndCurrency == "" ? 0 :
    	extractIntFromStr(priceAndCurrency.replace(/\.|\s+/g,""));
}

function extractNights(td) {
	var tds = td.querySelectorAll("td");
	if ( tds.length > 0 ) {
		// multiple hotels
		var nights = 0;
		for ( var i=0; i<tds.length; i++ ) {
			nights += extractIntFromStr(tds[i].textContent);
		}
		return nights.toString();
	} else {
		// one hotel
		return td.textContent.match(/(\d+)/g)[1] ? td.textContent.match(/(\d+)/g)[1] : td.textContent.match(/(\d+)/g)[0];
	}
}

function extractExtraNights(td, tds) {
   if ( isMultiHotelTour(tds) ) {
	   return null;
   }
   var nights = td.textContent.match(/(\d+)/g)[0];
   var hnights = td.textContent.match(/(\d+)/g)[1];
   if ( nights && hnights && isANumber(nights) && isANumber(hnights) ){
		var extra_nights = nights - hnights;
		   if ( extra_nights > 0 ) {
			   return extra_nights.toString();
		   }
      }
   return null;
}

function extractCurrency(priceAndCurrency, priceCell, isIframe) {
	if ( priceAndCurrency != "" ) {
        return priceAndCurrency.replace(/\d+|,|\./g, '');
	}
	var c = priceCell.querySelector("img[src*='RandomCaptcha']");
    return c ? extractCurrencyFromCaptcha(c.src, isIframe) : "";
}

function extractRegion(td) {

	function getRegion(td) {
		return td.textContent.split("\n")[1];
	}

	var tds = td.querySelectorAll("td");
	if ( tds.length > 0 ) {
		// multiple hotels
		var regions = "";
		for ( var i=0; i<tds.length; i++ ) {
			regions += getRegion(tds[i]);
			if ( i < tds.length-1 )
				regions += " / ";
		}
		return regions;
	} else {
		// one hotel
		return getRegion(td);
	}
}

function extractDate(dateAndDoW) {
    return dateAndDoW.match(/(\d+\.\d+\.\d+)/)[1]
}

function extractHotelUrl(td) {
	var tds = td.querySelectorAll("td");
	if ( tds.length > 0 )
		td = tds[0];

    var anchor = td.querySelector("a");
    return anchor == null ? "" :  anchor.href
}

function extractHotelName(hotelTd, nightsTd) {

	function getHotelName(td) {
	    var shortName = td.textContent.split("\n")[0]

	    var span = td.querySelector("span")
	    if ( span == null )
	        return shortName

	    var anchor = span.querySelector("a")
	    if ( anchor == null || span.getAttribute("onmousemove") == null )
	        return shortName

	    var fullName = span.getAttribute("onmousemove").match(/'(.+)'/)[1]

	    return shortName.replace(anchor.textContent, fullName)
	}

	function getNights(td, idx) {
		return td.querySelectorAll("td")[idx].textContent.match(/(\d+)/)[1];
	}

	var tds = hotelTd.querySelectorAll("td");
	if ( tds.length > 0 ) {
		// multiple hotels
		var hotels = "";
		for ( var i=0; i<tds.length; i++ ) {
			hotels += getHotelName(tds[i]);
			hotels += " " + getNights(nightsTd, i) + " ноч.";
			if ( i < tds.length-1 )
				hotels += " / ";
		}
		return hotels;
	} else {
		// one hotel
		return getHotelName(hotelTd);
	}

}

function isMultiHotelTour(tds) {
	// если клетка с количеством ночей содержит таблицу, то это комбинированный тур
	return tds[2].querySelectorAll("td").length > 0;
}

function getPriceCell(tds) {
	return tds[findCol(tds, /цена|Kaina|Cena/i)];
}

function getPriceAndCurrency(td) {
	function reptrm(element) {
		return element.textContent.replace(/[»«]+/g, "").trim();
	}

	var a = td.querySelector("a.price-tag") || td.querySelector("a");
	if ( a && a.textContent.match(/[A-Za-zА-Яа-я]+/) )
		return reptrm(a);
	var b = td.querySelector("b")
	if ( b )
		return reptrm(b);

	return reptrm(td);
}

function extractRoomType(td) {

	function getRoom(td) {
		var text = td.textContent;
		var span = td.querySelector("span");
		if ( span != null ) {
			var onmousemove = span.getAttribute("onmousemove");
			if ( onmousemove != null ) {
				var m = onmousemove.match(/ToolTip.ShowSoft\(this, '(.+)'\)/);
				if ( m != null ) {
					text = text.replace(span.textContent, m[1]);
				}
			}
		}
		return text.split("\n").join(", ");
	}

	var tds = td.querySelectorAll("td");
	if ( tds.length > 0 ) {
		// multiple hotels
		var rooms = "";
		for ( var i=0; i<tds.length; i++ ) {
			rooms += getRoom(tds[i]);
			if ( i < tds.length-1 )
				rooms += " / ";
		}
		return rooms;
	} else {
		// one hotel
		return getRoom(td);
	}

}

function extractBoardType(td) {

	function getBoardType(td) {
		return td.textContent.replace(/Акция.*|КОМИССИЯ.*/ig, '').trim();
	}

	var tds = td.querySelectorAll("td");
	if ( tds.length > 0 ) {
		// multiple hotels
		var boardTypes = "";
		for ( var i=0; i<tds.length; i++ ) {
			boardTypes += getBoardType(tds[i]);
			if ( i < tds.length-1 )
				boardTypes += " / ";
		}
		return boardTypes;
	} else {
		// one hotel
		return getBoardType(td);
	}

}

function extractFlightDate(img) {
	return getNodeProperty(img.closest('table').querySelector("tr span#FlightDate"));
}

function createOption(img) {
	var isIframe = !!img.closest('#altFlightDetail');
    var tds = isIframe ? getChildElementsByTagName(globalTr, "td") : getChildElementsByTagName(img.parentNode.parentNode.parentNode, "td");
    if ( isIframe ) {
        var flights = getFlight(img);
    }
    insertBeforeBR(tds[2], "\n");
    insertBeforeBR(tds[isMultiHotelTour(tds) ? 3 : 4], "\n");

    var priceCell = isIframe ? img.closest('.column:not(.qq)') : getPriceCell(tds);
    var pac = getPriceAndCurrency(priceCell);

    console.log(pac)
    var nightsTd = isIframe ? img.closest('.tableRow').querySelector("div") : tds[1];

    var option = {
        checkinDt : extractDate(isIframe ? extractFlightDate(img) : tds[0].textContent),
        nights : extractNights(nightsTd),
        extra_nights: extractExtraNights(nightsTd,tds),
        region : extractRegion(tds[2]),
        hotelName : extractHotelName(tds[2], nightsTd),
        boardType : extractBoardType(tds[isMultiHotelTour(tds) ? 4 : 3]),
        roomType : extractRoomType(tds[isMultiHotelTour(tds) ? 3 : 4]),
        price : extractPrice(pac),
        currency : extractCurrency(pac, priceCell, isIframe),
        href : extractHotelUrl(tds[2]),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        occupancy: SEARCH_CRITERIA.occupancy,
        thumbnail : extractThumbnail(img, tds),
        flight: flights ? flights : null
    }
    return option;
}

function getFlight(img) {
    try {
        var div = img.closest('.tableRow');
        var flightsDivs = querySelectorAll(div, '[data-flightinfo]');
        return parseSectors(flightsDivs);
    } catch (e) {
        return null;
    }
}

function parseSectors(divs) {
    var sectors = divs.map(div => {
        var jsonInfo = JSON.parse(div.dataset.flightinfo);
        jsonInfo.nodeElem = div;
        return jsonInfo;
    });
    var parsedSectors = sectors.map(sector => {
        var segments = [];
        for (var key in sector) {
            if ( key.match(/leginfo/) ) {
                segments.push(createSegment(sector[key], sector.nodeElem));
            }
        }
        return {
            segments: segments
        }
    });
    return {sectors: parsedSectors};
}

function createSegment(segment, nodeElem) {
    var textInfo = segment.AirportInfo.split(/\s-\s/);
    var airCityDep = textInfo[0].match(/(.+?)\((.+)\)/) || "   ";
    var airCityArr = textInfo[1].match(/(.+?)\((.+)\)/) || "   ";
    var timeInfo = segment.TimeInfo.match(/(\d{2}.\d{2}.\d{4}).+?(\d{2}:\d{2}).+?(\d{2}:\d{2})/);
    return {
        flightNumber: textInfo[2].trim(),
        airline: segment.FlightSupplierName,
        departureDate: timeInfo[1],
        departureTime: timeInfo[2],
        departureCity: airCityDep[1].replace(/аэропорт/i,"").trim(),
        departureAirport: airCityDep[2].trim() || textInfo[0].trim(),
        departureAirportID: null,
        departureTerminal: null,
        serviceClass: null,
        arrivalDate: null,
        arrivalTime: timeInfo[3],
        arrivalCity: airCityArr[1].replace(/аэропорт/i,"").trim() || textInfo[1].trim(),
        arrivalAirport: airCityArr[2].trim(),
        arrivalAirportID: null,
        arrivalTerminal: null,
        travelTime: getText(nodeElem.querySelector(".flightDuration")).replace("Продолжительность полета: ", ""),
        plane: segment.FlightInfo
    };
}
function extractThumbnail(img, tds) {
	return null;
}

function decaptcha(img) {
    var func = img.onclick;
    img.onclick = function (event) {
        var isIframe = getIframe();
        var c = isIframe ? img.parentNode.parentNode.parentNode.querySelector("img[src*='RandomCaptcha']") : getPriceCell(getChildElementsByTagName(img.parentNode.parentNode.parentNode, "td")).querySelector("img");
        if ( c == null ) {
            img.onclick = func;
            img.onclick(event);
            return;
        }
        createNativeColorbox(c, isIframe, img, func, event);
        return img;
    }
}

function createNativeColorbox(c, isIframe, img, func, originalEvent) {
    var doc = (isIframe || document);
    var [overlay, colorBox, colorBoxTitle, colorBoxBody, imageDiv, inputDiv, label, br, input, captcha, doneButton, contrastText]
        = createElements(["div", "div", "div", "div", "div", "div", "label", "br", "input", "img", "button", "span"]);

    overlay.setAttribute("style", "display:flex; align-items: center;justify-content: center; position:fixed;top:0;bottom:0;left:0;right:0;z-index:4000;background-color: rgba(255, 255, 255, 0.9);");
    colorBox.setAttribute("style", "display:flex;flex-direction: column;z-index:4001;width:400px;height:110px;border:1px solid #7eacb1");
    colorBoxTitle.setAttribute("style", "height:25%;background:linear-gradient(to top, #b7d8dc 20%, #d9f7fb 50%, #c5e5e8 80%);");
    colorBoxBody.setAttribute("style", "display:flex;align-items: center;height:75%;border:1px solid black;background:#fff;margin: 1px;");
    imageDiv.setAttribute("style", "width: 50%;text-align: center;");
    label.setAttribute("style", "font:10px tahoma;");
    contrastText.setAttribute("style", "font-size:10px;font-family:tahoma;color: darkred;cursor: pointer;text-decoration: underline;");
    inputDiv.setAttribute("style", "text-align: left;");

    input.type = "text";
    input.style.width = "125px";

    contrastText.textContent = "Увеличить контрастность";
    doneButton.textContent = "Готово";
    doneButton.style.margin = "5px";
    label.textContent = "Цена с картинки (без копеек и валюты):";
    captcha.src = c.src;
    inputDiv.append(label, br, input, doneButton);
    imageDiv.append(captcha, br.cloneNode(), contrastText);
    colorBoxBody.append(imageDiv, inputDiv);
    colorBox.append(colorBoxTitle, colorBoxBody);

    overlay.append(colorBox);
    overlay.classList.add("qq");

    doc.body.append(overlay);

    input.focus();

    doneButton.addEventListener("click", event => {
        submit(event);
    });

    overlay.onclick = event => {
        stopPropagationAndPreventDefault(event);
        event.target === overlay ? overlay.remove() : null;
    };
    (isIframe || document).onkeyup = event => {
        if ( event.key === "Escape" ) {
            overlay.remove();
            return;
        }
        if ( event.key === "Enter" ) {
            submit(event);
            return;
        }
    };
    contrastText.onmouseover = () => {
        captcha.style.filter = "contrast(1.5)";
    };
    contrastText.onmouseout  = () => {
        captcha.style.filter = "";
    };

    function submit(event) {
        stopPropagationAndPreventDefault(event);
        if ( input.value.match(/\d+/) ) {
            var p = c.parentNode;
            c.remove();
            p.append(document.createTextNode(extractIntFromStr(
                input.value) + " " + extractCurrencyFromCaptcha(c.src, isIframe)));
            p.setAttribute("captcha", c.src);
            overlay.remove();
            doc.onkeyup = null;
            img.onclick = func;
            img.onclick(originalEvent);
        }
        input.focus();
    }

}

function stopPropagationAndPreventDefault(event) {
    event.stopPropagation();
    event.preventDefault();
}

function createElements(tags) {
    return tags.map( tag => document.createElement(tag) );
}

function extractCurrencyFromCaptcha(src, isIframe) {
	var m = src.match(/price=(.+)\.$/);
	if ( m ) {
		m = decodeURI(m[1]).match(/æ(.+)$/);
		if ( m ) {
			return m[1];
		}
	}
	var offset = isIframe ? 1 : 0;
	return src.substring(src.length-4+offset,src.length-1+offset);
}

function createCell(isEven) {
    var newTd = document.createElement("td");
    newTd.className = "qq " + (isEven ? "gridViewEven" : "gridViewOdd")
    newTd.appendChild(qqBtns({align: "qq-horizontal", asyncInfo: decaptcha, hideFlight: true}));
    return newTd
}

var functionForGlobalTr = function () {
	for (globalTr = this.parentNode; !/TR/i.test(globalTr.tagName); globalTr = globalTr.parentNode ) {}
}

function updateGlobalTrOnClick(tds) {
	for ( var j = 1; j < 5; ++j ) {
		var a = tds[tds.length - j].querySelector("a");
		if ( a ) {
			a.onclick = functionForGlobalTr;
		}
	}
}

function injectData() {
	checkIframe();
	function inject(trs) {
	    if ( trs.length > 0 && trs[0].querySelector("td.qq") == null) {
	        var newTh = document.createElement("td");
	        newTh.className = "qq gridViewCaption"
	        newTh.setAttribute("style", "border-right:none; font-weight:bold; border-left: 1px solid #9C9AB7;");
	        var newContent = document.createTextNode("QQ");
	        newTh.appendChild(newContent);
	        trs[0].appendChild(newTh);
	    }

	    for (var i = 1; i < trs.length; ++i) {
	        if ( trs[i].querySelector("td.qq") == null ) {
	        	var tds = getChildElementsByTagName(trs[i], "td");
	        	if ( tds.length > 4 ) {
	        		updateGlobalTrOnClick(tds);
	        		trs[i].appendChild(createCell(i % 2 == 0))
	        	}
	        }
	    }
	}

    inject(document.querySelectorAll("#cbpProductSearch_results table.gridViewTable>tbody>tr"));
    inject(document.querySelectorAll("#cbpTourSearch_results table.gridViewTable>tbody>tr"));
    inject(document.querySelectorAll("#cbpOnlyHotelSearch_results table.gridViewTable>tbody>tr"));
}

function findCol(tds, regexp) {
	var tds = findTable(tds[0]).querySelectorAll(".gridViewCaption");
    for ( var i = 0; i < tds.length; ++i ) {
        if ( regexp.test(tds[i].textContent) ) {
            return i;
        }
    }
    return -1;
}

function findTable(node) {
    var node = node.parentNode;
    while (true) {
        if ( node.tagName == "TABLE" ) {
            break;
        }
        node = node.parentNode;
    }
    return node;
}

//-------- iFrame ---------------------------

function createCellIframe() {
	var div = document.createElement("div");
	div.className = "column qq economy";
	div.setAttribute("style", "display: inline-block;");
	div.appendChild(qqBtns({align: "qq-horizontal", asyncInfo: decaptcha}));
	return div;
}

function injectDataIframe(table) {
    injectStyleSheet(getIframe());
    if ( !globalTr ) {
		return;
	}

	var rows = getChildElementsByTagName(table, "div");

	for ( var i = 1; i < rows.length; ++i ) {
		if ( !rows[i].querySelector(".qq") ) {
			var priceDivEco = rows[i].querySelector("div.economy, [data-totalprice]");
			var priceDivBus = rows[i].querySelector("div.business");
			if ( priceDivEco) {
				priceDivEco.appendChild(createCellIframe());
			}
			if (priceDivBus && priceDivBus.querySelector(".allotmentIconsContainer") )
			{
				priceDivBus.appendChild(createCellIframe());
			}
		}
	};
}

function checkIframe() {
	var iframe = getIframe();
	if ( !iframe ) {
		return;
	}

	var table = iframe.querySelector("div.resultTable .resultBody");
	if ( !table ) {
		return;
	}

	injectDataIframe(table);
}

// --------- Logs ---------------------------------

function getHotelRowByImage(img) {
	var isIframe = /economy/i.test(img.parentNode.parentNode.className);
    return isIframe ? globalTr : img.parentNode.parentNode.parentNode;
}
