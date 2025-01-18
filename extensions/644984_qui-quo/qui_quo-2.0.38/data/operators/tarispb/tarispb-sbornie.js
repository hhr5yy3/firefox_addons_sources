var OPERATOR_NAME = "Тари Тур";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    const calcIframe = document.querySelector('iframe.cboxIframe');
    if ( calcIframe ) {
        injectStyleSheet(calcIframe.contentDocument)
        $$('[data-cost]', calcIframe.contentDocument).forEach(costDiv => {
        if ( costDiv && !costDiv.querySelector('.qq') ) {
            costDiv.append(qqBtns({}, createCalcOption));
        }
        });
    }

    querySelectorAll(document, ".price_table .table_price_table tr").forEach(tr => {
        const tds = $$('td.td1', tr).filter( td => getText(td) === getText(td).replace(/\D+/g, '') && getText(td).replace(/\D+/g, '').length > 0 && !td.querySelector('.qq'));
        tds.forEach(td => {
            td.append(createCell());
        })

    });
}

function createHeadCell() {
    var newTd = document.createElement("td");
    newTd.className = "th1 td1end qq";
    newTd.style.position = "absolute";

    newTd.append(document.createTextNode("QQ"));
    return newTd;
}

function createCell() {
    var newTd = qqBtns({align: 'qq-horizontal'});
    newTd.style.zoom = '0.8';
    return newTd;
}

function createOption(img) {
    var td = img.closest('td');
    var tr = td.closest('tr');
    var tds = querySelectorAll(tr,"td");
    var mainTrTds =  getHotelTd(tr);
    if ( mainTrTds ) {
        tds.unshift(mainTrTds);
    }
    var ths = querySelectorAll(document,".price_table .table_price_table tr td.th1");
    var tourName = document.querySelector("#block-system-main [itemprop='name'], h1.title_h2.h1_dot, .price_table h2.title_t1").textContent;
    var grayText = querySelectorAll(document, ".gray_text").map( elem =>  {
        return elem.textContent.trim();
    });
    grayText.push(tourName);
    const priceIndex = ths.length - ths.findIndex( th => (th.title||'').match(/Двое взрослых/i) );
    var option = {
        checkinDt: getDate(tds[findTableTdIndex(ths, /Действие цены/i)]),
        nights: getNights(grayText, tds[findTableTdIndex(ths, /Действие цены/i)]).toString(),
        hotelName: `Тур: ${tourName}`,
        href: window.location.href,
        roomType: getRoomType(tr, tds, ths),
        region: "Санкт-Петербург",
        boardType: getNodeProperty(tds[findTableTdIndex(ths, /Типы завтрака|Тип завтрака|Завтрак/i)]),
        price: extractIntFromStr(getText(td.firstChild).replace(/\D+/g, '')),
        currency: "RUB",
        country: "Россия",
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: true,
        thumbnail: getThumbnail(),
        occupancy: null,
        comment: getComment()
    };
    return option;
}

function getDate(td) {
    if ( td ) {
        var date = td.textContent.match(/\d{2}\.\d{2}-(\d{2})\.(\d{2})/);
        return appendYear(+date[1], +date[2]);
    }
    return document.querySelector("#date_from").value;
}

function getNights(grayText, td) {
    var nights = grayText.reduce( (prVal, cur) => { return cur.match(/(\d+)\s*ноч/) ? cur.match(/(\d+)\s*ноч/)[1] : prVal }, "");
    if ( nights ) {
        return nights;
    }
    var dateStart = getDate(td);
    var dateEnd = document.querySelector("#date_to").value;
    return getDistance(dayMonthYearToDate(dateStart), dayMonthYearToDate(dateEnd));
}

function getRoomType(tr, tds, ths) {
    var hotel = tds[findTableTdIndex(ths, /Гостиница|Отель/i)];
    var stars = hotel ? hotel.querySelector(".use_sprites_stars") : "";
    stars = stars ? stars.className.match(/stars(\d+)/) : "";
    hotel = stars ? hotel.textContent + " "+ stars[1]+"*": hotel;
    var room = tds[findTableTdIndex(ths, /Размещение/)];
    return [hotel, room].filter( it  =>{
        return it;
    }).map( it => {
        return it.textContent || it;
    }).join(", ");
}

function getComment() {
    var comment = document.querySelector('[itemprop="description"]');
    return comment ? comment.textContent.trim() : "";
}

function getThumbnail() {
    var image = window.top.document.querySelector('[itemprop="image"]');
    return image ? image.src : null;
}

function getHotelTd(tr) {
    var ftr = tr;
    var mainTrTds;
    while (ftr) {
        ftr = ftr.previousElementSibling;
        mainTrTds = querySelectorAll(ftr, "td");
        if ( mainTrTds.length === 1 ) {
            return mainTrTds[0];
        }
    }
    if ( querySelectorAll(tr, "td").length === 9 ) {
        return null;
    }
    var str = tr;
    while (str) {
        str = str.previousElementSibling;
        mainTrTds = querySelectorAll(str, "td");
        if ( mainTrTds.length === 9 ) {
            return mainTrTds[0];
        }
    }
    return null;
}

function createCalcOption(img) {
    const priceDiv = img.closest('[data-cost]');
    const tourInfo = priceDiv.closest('.tour');
    const tourProps = $$('.tour_prop', tourInfo)
        .filter($prop => $prop.querySelector('.label'))
        .map($prop => {
            const label = getText($prop.querySelector('.label'));
            return {label, text: getText($prop).replace(label, '').trim(), node: $prop}
        });
    const findProp = (label) => tourProps.find( obj => obj.label.match(label)) || {};
    const option = {
        checkinDt: findProp(/Начало тура/i).text,
        nights: findProp(/Продолжительность/i).text.match(/(\d+)\s*ноч/)[1],
        hotelName: `Тур: ${findProp(/Тур/i).text}, Гостиница: ${findProp(/Гостиница/i).text}`,
        href: window.top.location.href,
        roomType: findProp(/Номер:/i).text,
        region: "Санкт-Петербург",
        boardType: findProp(/Питание:/i).text,
        price: extractIntFromStr(getText(priceDiv).replace(/\D+/g, '')),
        currency: "RUB",
        country: "Россия",
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: true,
        thumbnail: getThumbnail(),
        occupancy: {adultsCount: +priceDiv.dataset.adults, childrenCount: +priceDiv.dataset.kids},
        comment: getComment()
    };
    console.log(option);
    return option;
}
