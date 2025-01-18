window.OPERATOR_NAME = "cruclub.ru";

//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$("#tbSchedule table.price:not(.aggregated-table) .value").forEach(td => {
			const tr = td.closest('tr');
			if (tr.querySelector('[id$="_hlOffer"]')) {
				if (td.querySelector(".qq") === null && !/Нет\s+в\s+наличии/.test(td.textContent)) {
					td.appendChild(createCell(createShipOption));
				}
			}
	});


    $$("[id$='ctlOffer_ctlContainer'] table.price:not(.aggregated-table) .value").forEach(td => {
		const tr = td.closest('tr');
		if (td.querySelector(".qq") === null && !/Нет\s+в\s+наличии/.test(td.textContent)) {
			td.appendChild(createCell(createOption));
		}

	});
    const total = document.querySelector(".total .price.total");
    if (total && total.querySelector(".qq") === null) {
        total.appendChild(createCell(createOptionTotal));
    }
}

function getCountry() {
    return null;
}

function createCell(action) {
    const nobr = qqBtns({}, action);
    nobr.style.display = "inline-flex";
    nobr.style.marginLeft = "5px";
    const newSpan = document.createElement("span");
    newSpan.className = "qq";
    newSpan.appendChild(nobr);
    return newSpan;
}

function createOption(img) {
	var cruise = getHotelRowByImage(img);
	var td = img.parentNode.parentNode.parentNode.parentNode;
	var tr = td.parentNode;
	var option = {
			checkinDt : cruise.querySelector(".dtstart").textContent.trim(),
			nights : getNights(cruise),
			hotelName : getHotelName(cruise),
			href : getURL(cruise),
			roomType: getRoomType(td, tr),
			region : getRegion(cruise),
			boardType : "Компания: " + cruise.querySelector("[id*='Company']").textContent,
			price : getPrice(td, ".value"),
			currency : getCurrency(td, ".value"),
			country:  getCountry(),
			city_from: "",
			operator: OPERATOR_NAME,
			excursion: true,
			thumbnail: getImg(cruise),
			occupancy : {
				adultsCount: 2,
				childrenCount: 0,
				childAges: null
			}
	};
	return option;
}

function getNights(li) {
    return li.querySelector(".duration").textContent.match(/(\d+)\s+ноч/)[1];
}

function getHotelName(li) {
    const cruise_name = li.querySelector(".snippet-link.url").textContent.trim();
    const liner = li.querySelector("[id*='Ship']").textContent;
    return cruise_name + ", " + liner;
}

function getURL(cruise) {
    const url = cruise.querySelector(".url");
    return url ? url.href : null;
}

function getRoomType(td, tr) {
    const head_tr = tr.closest('table').querySelector('tr').querySelectorAll("td")[td.cellIndex].textContent;
    return "Каюта: " + head_tr;
}

function getRegion(cruise) {
    return cruise.querySelector("[id*='Trace']").textContent.trim();
}

function getPrice(td, sel) {
    return extractIntFromStr(td.querySelector(sel).textContent.replace(/\D+/g, ""));
}

function getCurrency(td, sel) {
    const text = td.querySelector(sel).textContent.trim().match(/\D+/g)[0];
    switch (text.trim()) {
        case "€":
            return "EUR";
        case "р.":
            return "RUB";
        case "₽":
            return "RUB";
        case "$":
            return "USD";
        default:
            return text;
    }
}

function getImg(li) {
    const image = li.querySelector(".photo, [id$='imgPhoto']");
    return image ? image.src : null;
}


function createOptionTotal(img) {
    const cruise = getHotelRowByImage(img);
    const td = img.parentNode.parentNode.parentNode;
    const option = {
        checkinDt: cruise.querySelector(".dtstart").textContent.trim(),
        nights: getNights(cruise),
        hotelName: getHotelName(cruise),
        href: getURL(cruise),
        roomType: getRoomTypeTotal(),
        region: getRegion(cruise),
        boardType: "Компания: " + cruise.querySelector("[id*='Company']").textContent,
        price: getPrice(td.parentNode, ".price.total"),
        currency: getCurrency(td.parentNode, ".price.total"),
        country: getCountry(),
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: true,
        thumbnail: getImg(cruise),
        occupancy: getOccupancy()
    };
    return option;
}

function getRoomTypeTotal() {
    return getCheckedRadioValue("category").parentNode.parentNode.querySelector("a").textContent;
}


function getHotelRowByImage(img) {
    return img.closest('li, #ctl00_Content_ctlOffer_ctlContainer, .body');
}

function getOccupancy() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = extractIntFromStr(document.querySelector("#adult b").textContent);
    occupancy.childrenCount = extractIntFromStr(document.querySelector("#child b").textContent);
    if (occupancy.adultsCount === 0) {
        return null;
    }
    if (occupancy.childrenCount > 0) {
        const ageInputs = document.querySelectorAll(".age-selector input");
        const ages = [];
        for (let i = 0; i < ageInputs.length; i++) {
            const age = extractOptionalInt(ageInputs[i].value);
            if (age === null) {
                continue;
            }
            ages.push(age);
        }
        if (ages.length === occupancy.childrenCount) {
            occupancy.childAges = ages.join(",");
        }
    }
    return occupancy;
}

function getCheckedRadioValue(name) {
    const elements = document.getElementsByName(name);
    for (let i = 0, len = elements.length; i < len; ++i)
        if (elements[i].checked) {
            return elements[i];
        }
}

function setFormsStyles(form, autoLoginForm) {
    autoLoginForm.style.backgroundColor = '#4591cd';
    autoLoginForm.style.margin = '-3px';
}

function getFindFormElements() {
    try {
        const passwordInp = document.querySelector("input[name*='Login$Password']");
        const form = passwordInp.closest("#form");
        const usernameInp = form.querySelector("input[name*='UserName']");
        const loginBtn = null;
        const target = $1('[name="__EVENTTARGET"]');
        if ( target) {
            target.value = 'ctl24$Login$LoginButton';
        }
        const event = ["focus", "input", "change", "blur"];
        return {passwordInp, form, usernameInp, loginBtn, event};
    } catch (e) {
        return {error: e};
    }
}

function createShipOption(img) {
	const cruise = getHotelRowByImage(img);
	const td = img.closest('td');
	const tr = td.closest('tr');
	const route = getText(cruise.querySelector('[id$="ctlRoute_hlRoute"], [id$="ctlOfferSchedule_hlRoute"]'));
	const option = {
		checkinDt: getText(tr.querySelector('[id$="_hlOffer"]')),
		nights: route.match(/^(\d+)\s*н\s*/)[1],
		hotelName: route + ', ' + getNodeProperty(cruise.querySelector("[id*='hlShip']")),
		href: getURL(cruise),
		roomType: getRoomType(td, tr),
		region: getNodeProperty($$('.sct.small',cruise).find(d=> getText(d).match(/маршрут/i)), ''),
		boardType: "Компания: " + getNodeProperty(document.querySelector("#ctl00_Content_ctlShip_hlCompany") || cruise.querySelector("[id*='Company']"), ''),
		price: getPrice(td, ".value"),
		currency: getCurrency(td, ".value"),
		country: getCountry(),
		city_from: "",
		operator: OPERATOR_NAME,
		excursion: true,
		thumbnail: getImg(cruise),
		occupancy: {
			adultsCount: 2,
			childrenCount: 0,
			childAges: null
		}
	};
	return option;
}
