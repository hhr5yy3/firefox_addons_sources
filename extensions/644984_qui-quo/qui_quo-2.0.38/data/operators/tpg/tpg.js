var OPERATOR_NAME = "TPG";
var OPERATOR_SLETAT_ID = 206;

var OPERATOR_CURRENCY = "tpg";
var DEFAULT_CURRENCY = "National";
window.showTopHotelsRating = true;

function getCountry() {
	var c = document.querySelector("#cv .value");
	if ( c && c.textContent ) {
		switch (c.textContent) {
			case "Гонконг": return "Китай";
			case "Доминиканская Республика": return "Доминикана";
			case "Мьянма": return "Мьянма (Бирма)";
			case "Сейшельские Острова": return "Сейшелы";
			default: return c.textContent;
		}
	}
	return null;
}

function getCity() {
	if ( document.querySelector(".switch-block .active") ) {
		return "";
	}
	return document.querySelector("#ct .value").textContent;
}

function initializeSearchCriteria() {
    var country = getCountry();
    if ( !country )
        return null;

    return { "country" : country,
    		 "city" : getCity() };
}

function getSearchButton() {
    return document.querySelector(".tour_form_line .show_details_link");
}


function injectData() {
	injectCurrencySelection();

	var trs = document.querySelectorAll(".search_tour_results .tour_results_tab>tbody>tr");

	if ( trs.length > 0 && trs[0].querySelector("th.qq") == null ) {
		var th = document.createElement("th");
		th.className = "qq";
		th.appendChild(document.createTextNode("QQ"));
		trs[0].appendChild(th);
	}

	for ( var i = 1; i < trs.length; i++) {
		if ( trs[i].querySelectorAll("td").length > 10 && trs[i].querySelector("td.qq") == null ) {
			var td = document.createElement("td");
			td.className = "qq";
			td.appendChild(qqBtns());
			trs[i].appendChild(td);
		}
	}
}

function getHotelRowByImage(img) {
	return img.closest('tr');
}

function extractDate(td) {
	var date = td.textContent.match(/(\d+\.\d+\.\d+)/)[1];
	var dateS = date.split(".");
	return appendYear(parseInt(dateS[0], 10), parseInt(dateS[1], 10));
}

function extractHotelName(td) {
	var a = td.querySelector("a");
	if ( a == null ) {
		return td.textContent;
	}
	return a.textContent + a.nextSibling.textContent;
}

function extractHotelHref(td) {
	var a = td.querySelector("a");
	return a == null ? null : a.href;
}

async function extractPriceAndCurrency(tr) {
    const priceP = tr.dataset.p;
    const pricePt = tr.dataset.pt;
    const currencyId = tr.dataset.currencyid;
    const tourCurrencyId = tr.dataset.tourcurrencyid;
    const body = `is_ajax=true&module=choosetour&action=getPrices&data[encodes][0][data-p]=${priceP}&data[encodes][0][data-pt]=${pricePt}&data[encodes][0][data-currencyId]=${currencyId}&data[encodes][0][data-tourCurrencyId]=${tourCurrencyId}`
    
    const result = await fetchTimeout(20000, fetch(`https://${window.location.host}/index.php`, {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,uk;q=0.6",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "method": "POST",
        "mode": "cors",
        body
    })).then(resp => resp.ok ? resp.json() : null).catch(e=>null);
    if ( !result ) {
        const price = extractIntFromStr($first('[data-prsuah]', tr).dataset.prsuah);
        const currency = window.location.host.match('.by') ? 'BYN' : 'UAH';
        return {price, currency};
    }
    const {'data-p': price, 'data-pt': tourPrice, 'data-c': currency, 'data-ct': tourCurrency} = result.value[0];
    return {price: isPrefferedDefaultCurrency() ? price : tourPrice, currency: isPrefferedDefaultCurrency() ? currency : tourCurrency}
}

function extractRegion(tds) {
	var resort = tds[4].textContent.trim();
	return resort == "" ? tds[7].textContent : resort;
}


async function createOption(img) {
	var tr = getHotelRowByImage(img);
	var tds = getChildElementsByTagName(tr, "td");
	var {price, currency} = img.classList.contains('qq-rating-btn') ? {price: 0, currency: ''} : await extractPriceAndCurrency(tr);
	var option = {
            checkinDt : extractDate(tds[1]),
            nights : getNights(tds[2]),
			hotelName : extractHotelName(tds[3]),
			href : extractHotelHref(tds[3]),
		    region : extractRegion(tds),
            boardType : tds[5].textContent,
            roomType :  tds[6].textContent,
            price,
            currency: mapCurrency(currency),
            country: SEARCH_CRITERIA.country,
            city_from: SEARCH_CRITERIA.city,
        };
    return option;
}

function getNights(td) {
    return getText(td).split(/\s+/)[0];
}

function mapCurrency(c) {
    c = c || "";
    switch (c.toLowerCase()) {
        case "$":
            return "USD";
        case "€":
            return "EUR";
        case "₴":
            return "UAH";
        case "грн":
            return "UAH";
        case "12":
            return "UAH";
        case "10":
            return "USD";
        case "30":
            return "BYN";
        case "3":
            return "EUR";
    }
    return c;
}


// function decaptcha(img) {
// 	var func = img.onclick;
// 	img.onclick = function(event) {
// 		var tr = getHotelRowByImage(img);
// 		var srcCanvas = tr.querySelector("canvas");
// 		if ( srcCanvas == null ) {
// 			img.onclick = func;
// 			img.onclick(event);
// 			return;
// 		}
//
// 		var amount = $("<input>").attr("style", "width:250px;margin-top:1px;padding:4px;border: 1px solid #0e73a7");
// 		var dstCanvas = $("<canvas>").attr("width","120px").attr("height","40px");
// 		dstCanvas[0].getContext('2d').drawImage(srcCanvas, 0, 0);
// 		$.colorbox({
// 			transition: "none",
// 			closeButton: false,
// 			width: "420px",
// 			html: $("<form>")
// 					.attr("style", "text-align:left;padding:6px;background-color:#fff;border:1px solid black;")
// 					.append($("<table>").append($("<tr>")
// 							.append($("<td>").attr("style", "padding-top:34px")
// 									.append(dstCanvas))
// 							.append($("<td>")
// 									.append($("<span>").attr("style", "font-size:13px").text("Введите цену в " +
// 											( isPrefferedDefaultCurrency() ? DEFAULT_CURRENCY : "USD/EUR" ) +
// 											" без копеек и валюты:"))
// 									.append($("<br>"))
// 									.append(amount))))
// 					.append($("<div>").attr("style", "text-align:right;").append(
// 						$("<input>")
// 							.attr("style", "margin-top: 2px; font-size:13px; margin-right:8px;padding: 6px 12px 6px 12px;border: 1px solid #0e73a7;background: #f5f5f5")
// 							.attr("type", "submit")
// 							.val("Готово")))
// 					.submit(function(e) {
// 								e.stopPropagation();
// 								e.preventDefault();
// 								if ( amount.val().match(/\d+/) ) {
// 									tr.setAttribute("data-p-decoded", amount.val());
// 									$.colorbox.close();
// 									img.onclick = func;
// 									img.onclick(event);
// 								}
// 							}),
// 			onComplete: function() {
// 				amount.focus();
// 			}});
// 	};
// 	return img;
// }

function injectCurrencySelection() {
    if( document.querySelector("#qq-currency") ) {
        return;
    }
    var submit = document.querySelector(".tour_form_line .show_details_link");
    if ( !submit ) {
        return;
    }
    addCurrencySelection(submit);
    addAddonMessageListener(OPERATOR_CURRENCY + " currency", function(currency) {
        document.querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
        document.querySelector("#qq-currency").setAttribute("style", "margin-top:10px;");
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
    div.className = "step long";
    div.setAttribute("style", "display: none;");

    var legend = document.createElement("legend");
    legend.setAttribute("style", "width:auto;float:left;margin-right:6px;margin-top:10px;");
    legend.innerHTML = "Выберите предпочитаемую валюту для <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo:";
    div.appendChild(legend);

    var select = document.createElement("select");
    select.setAttribute("style", "margin-top:-3px; width: 140px;margin-top:10px;");
    select.onchange = function () {
        sendMessageToAddon("set operator currency", {operator: OPERATOR_CURRENCY, currency: select.value});
    };

    var defaultCurr = document.createElement("option");
    defaultCurr.value = DEFAULT_CURRENCY;
    defaultCurr.textContent = DEFAULT_CURRENCY;
    select.appendChild(defaultCurr);

    var foreign = document.createElement("option");
    foreign.value = "USDEUR";
    foreign.textContent = "USD / EUR";
    select.appendChild(foreign);

    div.appendChild(select);

    submit.parentElement.parentElement.insertBefore(div, submit.parentElement);
}
