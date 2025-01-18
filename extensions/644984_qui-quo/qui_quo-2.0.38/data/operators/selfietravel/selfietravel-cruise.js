window.OPERATOR_NAME = "Selfie Travel";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

async function getDesc(data) {
    const response = await fetch(`https://mvoyage.com.ua/search_agent/ajax.php?act=whathinclide&ship_id=${data.ship_id}&cruise_id=${data.cruise_id}&agentidmodule=b29eed44276144e4e8103a661f9a78b7&locale=ru&_=${(new Date()).getTime()}`)

    if (response.ok) {
        const HTML = await response.text();

        return HTML;
    }
}

function parseSelfietravelDate(date) {
    const [day, month, year] = date.split(' ');
    return `${day}.${monthNameToNumber(month === 'Мaр' ? 'Мар' : month /*Англ. а*/)}.${year}`
}

function injectData() {
    $$(".description-price").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'center');
            $1('a.book_price', div).style.setProperty('margin-bottom', '2px');

            div.append(btns);
        }
    });

    $$(".text-center").forEach(div => {
        if ( !div.querySelector(".qq") && !getNodeData('#sub_users_kz', div)?.match('ЗАБРОНИРОВАТЬ') ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'center');

            div.append(btns);
        }
    });

    $$(".linktoorders").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'center');

            div.after(btns);
        }
    });
}

function getPrice(item) {
    const elem = $$('span', item).filter(span => {
        return ['inline-block', 'inline'].some(type => type === getComputedStyle(span).display);
    })[0];
    const text = getText(elem);
    return [text.replace(/\D+/g, ''), text.replace(/\d+/g, '')]
}

async function getPlace(data) {
    const response = await fetch(`https://mvoyage.com.ua/search_agent/ajax.php?act=get_sheduler_pop&duration=${data.duration}&date_start=${requestDate(data.date)}&ship_id=${data.ship_id}&cruise_id=${data.cruise_id}&agentidmodule=b29eed44276144e4e8103a661f9a78b7&locale=ru&_=${(new Date()).getTime()}`)

    if (response.ok) {
        const HTML = await response.text();
        const div = document.createElement('div');
        div.insertAdjacentHTML('afterbegin', sanitize(HTML));
        return $$('[data]', div).map(item => getText(item));
    }
}

function requestDate(date) {
    const [day, month, year] = date.split('.');
    return `${year}-${month}-${day}`
}

function getTextWithoutInnerElements(el) {
    if(!el) return null;
    const clonedDiv = el.cloneNode(true);

    clonedDiv.querySelectorAll('*').forEach(el => el.remove());

    return clonedDiv.textContent.trim();
}

async function createOption(img) {
    const isSecond = Boolean(getNodeData('.active_step')?.match('Шаг 2'));
    const tour = getHotelRowByImage(img);
    const data = isSecond ? tour.closest('#search_mvoyage_all') : tour;

    const whathinclide = $1('.whathinclide', data)
    const checkinDtText = getTextWithoutInnerElements($1('.fa-calendar', data).parentNode) || getNodeData('span', $1('.fa-calendar', data).parentNode)
    const checkinDt = parseSelfietravelDate(checkinDtText);
    const nights = getText($1('.durations', data).parentNode).replace(/\D+/g, '');
    const hotelName = $$('a.liner_info', $1('.ships', data).parentNode).map(i => getText(i)).join('');
    const hotelDesc = await getDesc({ship_id: whathinclide.getAttribute('data'), cruise_id: whathinclide.getAttribute('datac')});
    const hrefQuery = $1('.description-price > div > a', tour)?.getAttribute('data');
    const cityFrom = getNodeData('.sheduler_info', data) || getTextWithoutInnerElements($1('.markers', data).parentNode);
    const cabinThumbnail = getComputedStyle($1('.room_desc_foto', tour)).backgroundImage;
    const thumbnail = cabinThumbnail === 'none' ? getComputedStyle($1('.description-photo, .logoliners', data)).backgroundImage : cabinThumbnail;
    const price = getPrice($1('._prices > dd, ._prices', tour));
    const places = await getPlace({ship_id: whathinclide.getAttribute('data'), cruise_id: whathinclide.getAttribute('datac'), duration: nights, date: checkinDt});
    const cabin = getTextWithoutInnerElements($1('b > .mansion_cap_price', tour)?.closest('b')) ?? '';
    const cabinNum = getNodeData('[name="cabin_num"]:checked', tour, 'value') ?? '';

    let option = {
        checkinDt: checkinDt,
        nights,
        hotelName: cabinNum ? hotelName + ' (Каюта №' + cabinNum + ')' : hotelName,
        hotel_desc: hotelDesc,
        href: isSecond ? location.href : (new URL(hrefQuery, new URL(window.location.href))).toString(),
        country: getNodeData('.link_router', tour) || getNodeData('.title_routes').split(',')[0],
        region: '(' + places.filter(places_item => ['В море', 'День в море'].every(list_item => list_item !== places_item)).join(' → ') + ')',
        roomType: cabin,
        boardType: "",
        price: price[0],
        currency: mapCurrencyUtil(price[1]),
        city_from: cityFrom,
        operator: OPERATOR_NAME,
        thumbnail: thumbnail.replace(/(url\("|"\))/g, ''),
        occupancy: getOccupancy() ?? {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null
        },
        excursion: "",
    };

    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.block-description, .cabinsblock');
}

function getOccupancy() {
    const touristsText = $1('.count_turist') && getTextWithoutInnerElements($1('.count_turist > span'));

    if(!touristsText) return null;

    const adults = touristsText.match(/\d+\sвзр/)?.[0]?.replace(/\D+/g, '');
    const children = touristsText.match(/\d+\s(дет|реб)/)?.[0]?.replace(/\D+/g, '') ?? 0;

    if(!adults) return null;

    return {
        adultsCount: Number(adults),
        childrenCount: Number(children),
        childAges: null
    }
}
