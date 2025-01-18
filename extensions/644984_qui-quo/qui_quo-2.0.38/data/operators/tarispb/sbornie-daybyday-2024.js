window.OPERATOR_NAME = "Тари Тур";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$('.tp-pricelist-sst span').forEach(span => {
        if (getText(span).match(/за номер/i)  && !$1('.qq', span.parentNode)) {
            span.parentNode.style.position = 'relative';
            span.parentNode.append(qqBtns({align: 'qq-horizontal', cssText: 'position: absolute; right: -6px'}));
        }
    })

    $$('.tp-pricelist-row span').forEach(span => {
        if (getText(span).match(/за тур/i) && !$1('.qq', span.parentNode)) {
            span.parentNode.style.position = 'relative';
            span.parentNode.append(qqBtns({align: 'qq-horizontal', cssText: 'position: absolute; right: -6px'}));
        }
    })

    $$('#tourPrices tbody td.text-center')
        .filter(td => getText(td) && Number(getText(td)))
        .forEach(td => {
            if ( !$1('.qq', td) ) {
                const buttons = qqBtns({align: 'qq-horizontal'}, createTableOption);
                const br = document.createElement('br');
                br.classList.add('qq');
                buttons.style.zoom = '0.8';
                td.append(br, buttons)
            }
    })
}

function createTableOption(img) {
    const td = img.closest('td');
    const tr = td.closest('tr');
    const tds = querySelectorAll(tr, "td");
    const mainTrTds = getHotelTd(tr);
    if (mainTrTds) {
        tds.unshift(mainTrTds);
    }
    const ths = $$( "#tourPrices thead tr td");
    const tourName = getNodeData('h1[itemprop="name"]') || document.querySelector("#block-system-main [itemprop='name'], h1.title_h2.h1_dot, .price_table h2.title_t1").textContent;
    const grayText = querySelectorAll(document, ".gray_text").map(elem => {
        return elem.textContent.trim();
    });
    grayText.push(tourName);
    const option = {
        checkinDt: getNodeData('#formControlDateFrom', document, 'value'),
        nights: getDistance(getNodeData('#formControlDateFrom', document, 'value'), getNodeData('#formControlDateTill', document, 'value')),
        hotelName: `Тур: ${tourName}, Гостиница: ${getRoomType(tr, tds, ths)[0]}${getStars(tds[findTableTdIndex(ths, /Гостиница|Отель/i)])}`,
        href: window.location.href,
        roomType: getRoomType(tr, tds, ths)[1],
        region: "Санкт-Петербург",
        boardType: getNodeProperty(tds[findTableTdIndex(ths, /Типы завтрака|Тип завтрака|Завтрак/i)]),
        price: extractIntFromStr(getText(td.firstChild).replace(/\D+/g, '')),
        currency: "RUB",
        country: "Россия",
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: true,
        thumbnail: getNodeData('.fotorama__active img', document, 'src'),
        occupancy: null
    };
    return option;
}

function getRoomType(tr, tds, ths) {
    let hotel = tds[findTableTdIndex(ths, /Гостиница|Отель/i)];
    let stars = hotel ? hotel.querySelector(".use_sprites_stars") : "";
    stars = stars ? stars.className.match(/stars(\d+)/) : "";
    hotel = stars ? hotel.textContent + " " + stars[1] + "*" : hotel;
    const room = tds[findTableTdIndex(ths, /Размещение/)];
    return [hotel, room].filter(it => {
        return it;
    }).map(it => {
        return it.textContent || it;
    })
}


async function createOption(img) {
    const hotel = img.closest('.card, .tp-pricelist-item');
    const room = img.closest('.bg-light.rounded, .tp-pricelist-row');
    const findItem = (caption) => $$('.text-muted', room).find(elem => getText(elem).match(caption));
    const tourName = `Тур: ${getNodeData('h1[itemprop="name"]')}, Гостиница: ${getNodeData('h6', hotel)}${getStars(hotel)}`
    const option = {
        checkinDt: getNodeData('#formControlDateFrom', document, 'value'),
        nights: getDistance(getNodeData('#formControlDateFrom', document, 'value'), getNodeData('#formControlDateTill', document, 'value')) ,
        hotelName: $1('h1[itemprop="name"]') ? tourName : (getNodeData('.card-title', hotel) || getNodeData('h6', hotel)) + getStars(hotel),
        href: location.href,
        roomType: getNodeData('[data-map-hrname]', room) || (findItem(/Номер:/i) && findItem(/Номер/i).parentNode.innerText.trim()),
        region: "Санкт-Петербург",
        boardType: findItem(/завтрак/i) && findItem(/завтрак/i).parentNode.innerText.trim(),
        price: extractIntFromStr(getText(img.parentNode.parentNode).replace(/\D+/g, '')),
        currency: "RUB",
        country: "Россия",
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: true,
        thumbnail: getNodeData('img', hotel, 'src'),
        occupancy: null,
        comment: null
    };

    return option;
}


function getHotelTd(tr) {
    let ftr = tr;
    let mainTrTds;
    while (ftr) {
        ftr = ftr.previousElementSibling;
        mainTrTds = querySelectorAll(ftr, "td");
        if (mainTrTds.length === 1) {
            return mainTrTds[0];
        }
    }
    if (querySelectorAll(tr, "td").length === 9) {
        return null;
    }
    let str = tr;
    while (str) {
        str = str.previousElementSibling;
        mainTrTds = querySelectorAll(str, "td");
        if (mainTrTds.length === 9) {
            return mainTrTds[0];
        }
    }
    return null;
}

function getStars(node) {
    const starsNode = $1('[class*="star-category_"]', node);
    let stars = '';
    if (starsNode) {
        stars = starsNode.className.match(/star-category_(\d)/) && starsNode.className.match(/star-category_(\d)/)[1]
        return ` ${stars}*`;
    }
    return '';
}
