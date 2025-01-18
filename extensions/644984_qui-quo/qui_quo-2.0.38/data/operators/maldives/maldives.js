window.OPERATOR_NAME = "Мальдивиана";
window.TRANSFERS = ['DOMESTIC', 'SEAPLANE', 'SPEEDBOAT']

function optionPostProcessingCustom(img, option) {
    try {
        const td = img.parentNode.parentNode;
        const tr = td.parentNode;
        const tds = getChildElementsByTagName(tr, "td");
        const tour = colText(tds, [/тур/]);
        const comment = TRANSFERS.find(str => tour.indexOf(str) !== -1) || tour;
        option.comment = `Трансфер: ${comment}`;
        return option;
    } catch (e) {
        return option;
    }

}
