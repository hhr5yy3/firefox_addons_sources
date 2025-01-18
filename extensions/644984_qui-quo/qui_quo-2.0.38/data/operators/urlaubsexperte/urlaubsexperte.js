var OPERATOR_NAME = "Urlaubsexperte";

function initializeSearchCriteria() {
    var occupancy = getOccupancy();
    if (!occupancy) {
        return null;
    }
    return {
        occupancy: occupancy
    };
}

function getSearchButton() {
    return document.querySelector(".qsuchesend input");
}

function injectData() {
    querySelectorAll(document, ".tervakbucShowvak").forEach(btn => {
        if (!btn.querySelector(".qq")) {
            btn.append(createCell());
        }
    });
}

function createCell() {
    var newDiv = document.createElement("div");
    newDiv.appendChild(createAddButton());
    newDiv.appendChild(createEditButton());
    newDiv.className = "qq";
    newDiv.style = "text-align: right;";
    return newDiv;
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var priceTr = tr.previousElementSibling;
    var mainTr = priceTr.previousElementSibling.previousElementSibling;
    var hotelTds = querySelectorAll(document, ".tertab2trinf tbody tr tr td");
    var hotelData = findHotelData(hotelTds);
    var tds = querySelectorAll(mainTr, "td");
    var option = {
        checkinDt: getDate(tds[2]),
        nights: getNights(tds[3]),
        hotelName: getHotelName(hotelData.hotelName),
        href: getURL(mainTr.querySelector(".tertablink")),
        roomType: getRoomBoardComment(tds[5])[0],
        region: getRegion(hotelData),
        boardType: getRoomBoardComment(tds[5])[1],
        price: getPrice(priceTr)[0],
        currency: getPrice(priceTr)[1],
        country: hotelData.country.textContent,
        city_from: tds[1].textContent.trim(),
        operator: getOperator(tds[4]),
        excursion: false,
        thumbnail: getImg(),
        comment: getRoomBoardComment(tds[5])[2],
        occupancy: getOccupancy()
    }
    return option;
}

function findHotelData(tds) {
    var finder = function (tds, regexp) {
        var td = tds.find(td => {
            return regexp.test(td.textContent);

        });
        return td ? td.nextElementSibling : null;
    };
    return {
        hotelName: finder(tds, /hotel:/i),
        city: finder(tds, /Ort:/i),
        region: finder(tds, /region:/i),
        country: finder(tds, /land:/i)
    }
}

function getDate(td) {
    var date = td.textContent.match(/\d{2}.\d{2}.\d{2}/);
    return makeYear4Digits(date[0]);
}

function getNights(td) {
    var nights = td.textContent.match(/\d+/);
    return nights[0].toString();
}

function getHotelName(td) {
    var name = td.textContent.trim();
    var stars = td.querySelectorAll("img").length;
    return name + ( stars > 0 ? " " + stars + "*" : "" );
}

function getURL(a) {
    var id = a ? a.href.match(/'(\d+)'/) : null;
    return id ? `http://cp.traveltainment.de/content_page/index.php3?KID=629960&IFF=${+id[1]}` : null;
}

function getRoomBoardComment(td) {
    var cell = td.innerText.trim().split(/\n/g);
    var room = cell.shift();
    var board = cell.shift();
    return [ room, board, cell.length > 0 ? cell.join("\n") : null ];
}

function getRegion(hotel) {
    var city = hotel.city ? hotel.city.textContent : "";
    var region = hotel.region ? hotel.region.textContent : "";
    return city && region ? city + ", " + region : city + region;
}

function getPrice(tr) {
    var price = tr.querySelector(".tervakpreisShowvak").textContent.split(",-");
    var currency = price[1];
    switch (currency) {
        case "€":
            currency = "EUR";
            break;
        case "$":
            currency = "USD";
            break;
    }
    return [extractIntFromStr(price[0]), currency];
}

function getOperator(td) {
    var operator = td.querySelector("img");
    return operator ? operator.alt : OPERATOR_NAME;
}

function getImg() {
    var image = document.querySelector(".tertab2trinf td img");
    if (image && image.clientHeight > 100 && image.clientWidth > 100) {
        return image.src;
    }
    return null;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var adultSelect = document.querySelector(".qsucheform select[name='erwachsene']");
    var kidsSelects = querySelectorAll(document, ".qsucheform select[name*='alter']");
    if (!adultSelect || kidsSelects.length < 1) {
        return null;
    }
    var kids = kidsSelects.map(select => {
        return select[select.options.selectedIndex].value
    }).filter(age => {
        return age != -1;
    });
    occupancy.adultsCount = extractIntFromStr(selectedOption(adultSelect));
    occupancy.childrenCount = kids.length;
    occupancy.childAges = kids.length > 0 ? kids.join() : null;
    return occupancy;
}

function getHotelRowByImage(img) {
    var node = img.parentNode;
    while (true) {
        if (node.tagName == "TR") {
            break;
        }
        node = node.parentNode;
    }
    return node;
}

