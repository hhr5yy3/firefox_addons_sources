function createYaToOption(img, doc = document) {
    const tour = img.closest('tr');
    const tds = $$('td', tour);
    const dates = getText(tds[0]).split(/\s*-\s*/).map(dt => appendYear(...dt.split('.')));
    const program = $$('.right-blank__title', doc).find(t => getText(t).match(/Краткая программа тура/));
    const checkList = $$('.check-list.cf li', doc).map(s => getText(s));
    let option = {
        checkinDt: dates[0],
        nights: String(getDistance(...dates)),
        hotelName: getNodeData('section h1', doc),
        hotel_desc: program ? $$('.right-blank__title, .js-desc__inner', program.parentNode).map(t => t.innerHTML).join('<br>') :
            $$('.day header', doc).map(t => t.innerHTML).join('<br>'),
        href: window.location.href,
        country: "",
        region: getNodeData('.route-way', doc),
        roomType: checkList.find(s => s.match(/размещение/i)),
        boardType: checkList.find(s => s.match(/питание/i)),
        price: extractIntFromStr(getNodeData('.td-cost__best, .td-cost__main', tour)),
        currency: "RUB",
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('.alone-pic', doc, 'src'),
        occupancy: {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null
        },
        excursion: true
    };
    return option;
}
