var OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || window.OPERATOR_NAME : window.OPERATOR_NAME;
window.showTopHotelsRating = true;

//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {
   var country = getCountry();
   if ( !country ) {
	   return null;
   }
   return {
	      "country": country,
	      "occupancy": getOccupancy()
	   };
}

function getSearchButton() {
   return querySelectorAll(document, ".btn-search, .btn-currency, .mainFilter__searchButton");
}

function getCountry() {
   var country = document.querySelector(".div-search-choice");
   return country ? country.innerText : null;
}

function injectData() {
	const tables = document.querySelectorAll(".hotelRoomTable");
	for ( let i = 0; i < tables.length; i++ ) {
		const head = tables[i].querySelector("thead tr");
		if ( head && head.querySelector(".qq") === null ){
			head.appendChild(createHeaderCell());
		}
        const row = $$("tbody tr [rowspan]", tables[i]).filter(td => td.clientHeight > 0);
		for ( let j = 0; j < row.length; j++ ) {
			if ( row[j].parentNode.querySelector(".qq") === null ){
				row[j].parentNode.appendChild(createCell()).setAttribute("rowspan", row[j].getAttribute("rowspan"));
			}
		}
	}

}

function createCell() {
	   var newTd = document.createElement("td");
	   var btns = qqBtns();
	   newTd.className = "qq";
	   btns.style.width = "100%";
	   btns.style.justifyContent = "center";
	   newTd.setAttribute("style", "text-align: center");
	   newTd.appendChild(btns);
	   return newTd;
}

function createHeaderCell() {
   var td = document.createElement("td");
   td.className = "qq";
   td.setAttribute("style", "text-align: center");
   td.appendChild(document.createTextNode("QQ"));
   return td;
}

async function createOption(img) {
    var details = img.parentNode.parentNode.parentNode;
    var trs_details = getTrsDetails(details);
    var tour = getHotelRowByImage(img);
    var thumbnail = $1('img[data-bind*="MainImage"]', tour);

    var option = {
        checkinDt: getDate(tour),
        nights: getNights(tour),
        extra_nights: getExtraNights(tour),
        hotelName: getHotelName(tour),
        href: getURL(tour),
        roomType: getRoomType(trs_details),
        region: getRegion(tour),
        boardType: getBoardType(trs_details),
        price: getPrice(details),
        currency: getCurrency(details),
        country: SEARCH_CRITERIA.country.replace(/виза/i, '').trim(),
        city_from: getCity(tour),
        operator: "",
        comment: "",
        excursion: false,
        thumbnail: thumbnail && thumbnail.clientHeight > 0 ? getNodeProperty(thumbnail, null, 'src') : null,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    // const destinationCode = window.location.href.split('&').find(str => str.match(/destination=/));
    // if (destinationCode) {
    //     const savedCountries = localStorage.getItem('countries');
    //     const response = savedCountries ? JSON.parse(savedCountries): await fetch('/TourSearchOwin/searchApi?action=GetCountries').then(resp => resp.json()).catch(console.log);
    //     if (response && response.countries) {
    //         const id = lastElement(destinationCode.split(/=|_/));
    //         localStorage.setItem('countries', JSON.stringify(response))
    //         const foundCountry = response.countries.find(c => String(c.id) === String(id));
    //         if (foundCountry) {
    //             option.country = foundCountry.name;
    //         }
    //     }
    // }
    const tourName = getNodeData('[data-bind="text:TourName"]', tour);
    saveHotelToStorage(option, tourName);

    return option;
}

function saveHotelToStorage(option, tourName) {
    try {
        const saveTourOption = {
            hotelName: option.hotelName,
            region: option.region,
            country: option.country,
            thumbnail: option.thumbnail
        }
        const caption = (option.hotelName.toLowerCase()+ tourName).replace(/[^a-zа-я0-9]+/g, '');
        localStorage.setItem(caption, JSON.stringify(saveTourOption));

    } catch (e) {
        localStorage.clear();
        return null;
    }
}

function getDate(tour) {
   return makeYear4Digits(tour.querySelector('[data-bind^="text:FromDateShown"]').textContent);
}

function getNights(tour) {
   var nights = querySelectorAll(tour, '[data-bind*="IsByHotelName"] .additionalData [data-bind*="DurationInNight"]');
   var nights_count = 0;
   for ( var i = 0; i < nights.length; i++ ) {
	   nights_count += extractIntFromStr(nights[i].textContent);
   }
   return nights_count.toString();
}

function getExtraNights(tour) {
    var nights = extractIntFromStr(getNights(tour));
    var dateFrom = getText(querySelectorAll(tour, '[data-bind*=FromDateShown]')[0]);
    var dateTo = getText(lastElement(querySelectorAll(tour, '[data-bind*=ToDateShown]')));
    var full_nights = getDistance(dayMonthYearToDate(dateFrom), dayMonthYearToDate(dateTo)) ;

    if ( full_nights > nights ) {
        var extra_nights = full_nights - nights;
        return extra_nights.toString();
    } else {
        return null;
    }
}

function findDataBind(tour, sel, name) {
  return querySelectorAll(tour, sel).filter(function (t) {
   	return t.getAttribute("data-bind").match(name);
   });
}

function getHotelName(tour) {
    const tourName = getNodeData('[data-bind="text:TourName"]', tour);
	var stars = tour.querySelectorAll('[data-bind="text:Stars.Value"]');
	var hotels = [];
	for ( var i = 0; i < stars.length; i++ ) {
		var star = "*";
		if ( stars[i].textContent.match(/\*/) ){
			star = "";
		}
		hotels.push(stars[i].previousElementSibling.innerText + " " + stars[i].textContent + star);
	}
	return hotels.join('').match('по программе') ? tourName : hotels.join(" / ");
}

function getURL(tour) {
    try {
        var simpleHref = getNodeProperty(tour.querySelector("a.simpleLink[data-bind*='href']"), "", "href");
        if (simpleHref) {
            return simpleHref;
        }
        var nights = findDataBind(tour, ".additionalData span", /text:DurationInNight/);
        var arr = [];
        for (var i = 0; i < nights.length; i++) {
            if (nights[i] !== null) {
                arr.push(extractOptionalInt(nights[i].textContent));
            }
        }
        if (arr.length === 0) {
            return null;
        }
        var indexOfMax = arr.indexOf(Math.max.apply(null, arr));
        var a = nights[indexOfMax].parentNode.previousElementSibling.previousElementSibling;
        a = a ? a.querySelector("a") : null;
        if (a && a.href) {
            return a.href;
        }
        for (var i = 0; i < nights.length; i++) {
            var url = nights[i].parentNode.previousElementSibling.previousElementSibling;
            url = url ? url.querySelector("a") : null;
            if (url && url.href) {
                return url.href;
            }
        }
        return getNodeProperty(tour.querySelector('a[data-bind*="attr: { href: Http}"]'), null, "href");
    } catch(e) {
        return null;
    }
}

function getRoomType(details) {
    var rooms = [];
    for ( var i = 0; i < details.length; i++ ) {
    	rooms.push(getNodeProperty(details[i].querySelectorAll(".col-md-5 .aviaLine, .aviaLine")[1], "", "innerText"));
    }
    return rooms.join(" / ");
}

function getRegion(tour) {
	var nights = findDataBind(tour, ".additionalData span", /text:DurationInNight/).filter( span => span.offsetHeight > 0 );
	var regions = [];
	for ( var i = 0; i < nights.length; i++ ) {
	    const div = nights[i].closest("div");
	    if ( div ) {
	        regions.push(getNodeProperty(div.querySelector('[data-bind*="IsByHotelCity"]'), ""));
        }
	}
	return trim(regions.join(" / "));
}

function getBoardType(details) {
    var boards = [];
    for ( var i = 0; i < details.length; i++ ) {
    	boards.push(getNodeProperty(details[i].querySelector('[data-bind="text:Pansion.Value"], [data-bind="text:pansionName"]'),"","innerText"));
    }
    return boards.join(" / ");
}

function getPrice(details) {
   var s = details.querySelector('.shopButton [data-bind*="Price"]').textContent;
   var price = s.match(/[\d\s]+/g)[0].replace(/\s/g, "");
   return extractIntFromStr(price);
}

function getCurrency(details) {
	var currency = details.querySelector('.shopButton [data-bind*="Currency"]').textContent.trim();
    return mapCurrency(currency)
}

function mapCurrency(text) {
    switch (text.toUpperCase()) {
        case "EU":
            return "EUR";
        case "РБ":
            return "RUB";
        case "$":
            return "USD";
        case "TG":
            return "KZT";
        case "BY":
            return "BYN";
        case "БР":
            return "BYN";
        case "AM":
            return "AMD";
        default:
            return text;
    }
}

function getCity(tour) {
  var city = getNodeProperty(tour.querySelector('[data-bind*="text:CityDepature"]'), null, "innerText");
  return city || getText(tour.querySelectorAll("td")[1], "innerText");
}

function getOccupancy() {
	var inputs = document.querySelectorAll(".row.no-gutter.context input");
	var occupancy = {
         adultsCount: extractOccupancyCount(inputs[0]),
         childrenCount: extractOccupancyCount(inputs[1]),
         childAges: null
   };

   if ( occupancy.adultsCount === null || occupancy.childrenCount === null ) {
       return null;
   }
   var ages = [];
   for ( var i = 2; i < inputs.length; i++ ) {
	   var age = extractOccupancyCount(inputs[i]);
	   if ( age === null ) {
		   return null;
	   }
	   ages.push(age);
   }
   occupancy.childAges = ages.join(",");
   return occupancy;
}

function extractOccupancyCount(input) {
   return input ? extractOptionalInt(input.value) : null;
}

function getHotelRowByImage(img) {
    const div = img.closest('[data-bind*="if:IsExpanded() && DetailedTours().length > 0"]');
    return findSearchResultRow(div);
}

function findSearchResultRow(div) {
    let row = div.previousElementSibling;
    while(row) {
        if ( row.classList.contains('searchResultRow') ) {
            return row;
        }
        row = row.previousElementSibling;
    }
    return div.previousElementSibling.previousElementSibling;
}

function getTrsDetails(details){
	var count = details.querySelector(".col-md-2, [rowspan]").getAttribute("rowspan");
	var trs = [];
	trs.push(details);
	for ( var i = 1; i < count; i++ ) {
		details = details.nextElementSibling;
		trs.push(details);
	}
	return trs;
}
