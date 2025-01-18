var OPERATOR_NAME = "Vand";

function getTable() {
    return querySelectorAll(document, ".table-result-inner");
}


//-------- Search Criteria ---------------------------

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function getCountry() {
    var input = document.querySelector("#vand-module_country_controll input");
    if (input === null) {
        console.log("country selector is not found");
        return null;
    }
    if (input.value === "") {
        console.log("country is not selected");
        return null;
    }
    return input.value;
}


// --------- Rows ---------------------------------

function extractPrice(price) {
    return parseInt(price.match(/(\d+)/)[1], 10)
}

function extractCurrency(currency) {
    currency = currency.match(/\D+/)[0].trim().toUpperCase();
    switch (currency) {
        case "USD":
            return "USD";
        case "РУБ":
            return "RUB";
    }

    console.log("unexpected currency id: " + currency.value);
    return currency;
}

function extractHref(td) {
    var anchor = td.querySelector("a");
    return anchor === null ? "" : anchor.href;
}

function getCity(desc) {
    var c = selectedOption(document.querySelector("#vand-module_city"));
    if ( c === null ) {
        return null;
    }
    var last = desc.textContent.split(",");
    var wallet =  last[last.length-1].trim();
    if ( wallet.match(/без/)) {
        return "";
    }
    return c;
}

function createOption(img) {
    var tds = img.parentNode.parentNode.parentNode.querySelectorAll("td");
    var desc = tds[0].parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling.querySelector("tr.vand-module_visible .vand-module_tour-desc-link");
    var option = {
        region: tds[3].textContent,
        hotelName: tds[2].textContent,
        roomType: tds[4].querySelector("span").textContent,
        boardType: tds[5].textContent,
        checkinDt: tds[0].textContent,
        nights: tds[1].textContent,
        price: extractPrice(tds[6].textContent),
        currency: extractCurrency(tds[6].textContent),
        href: extractHref(tds[1]),
        country: getCountry(),
        city_from: getCity(desc),
        comment: getComment(desc)
    };
    return option
}

function createCell() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    var newTd = document.createElement("td");
    newTd.className = "qq cell-center";
    newTd.appendChild(nobr);
    return newTd
}

function injectData() {
    var tbls = getTable();
    if (tbls.length === 0) {
        return;
    }

    var titles = [];

    tbls.forEach(function (table) {
        titles.push(table.querySelector("thead > tr"));
    });

    titles.forEach(function (title) {
        if (title.querySelector(".qq") === null) {
            var newTh = document.createElement("th");
            newTh.className = "qq";
            var newContent = document.createTextNode("QQ");
            newTh.appendChild(newContent);
            title.appendChild(newTh);
        }
    });

    var trs = [];
    tbls.forEach(function (tbl) {
        querySelectorAll(tbl, "tbody > tr").forEach(function (tr) {
            trs.push(tr);
        });
    });
    trs.forEach(function (tr) {
        if (tr.querySelector("td.qq") === null  && tr.className !== "vand-module_get-next-rows-tr" ) {
            tr.appendChild(createCell())
        }
    });
}

function getComment(desc) {
    if (!desc) {
        return null;
    }
    var last = desc.textContent.split(",");
    return last[last.length-1].trim();
}