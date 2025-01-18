var OPERATOR_NAME = "AeroLing";
const showTopHotelsRating = true;

function injectData() {
    if ( getFlight() === null ) {
        return;
    }
    injectCurrencySelectionUtil(".qq", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "font-size:12px", "display:flex");
    querySelectorAll(document, ".top_container").forEach(panel => {
        var qq = panel.querySelector(".qq");
        if ( !qq ) {
            const container = createOrderCell();
            container.style.paddingTop = "120px";
            panel.prepend(container);
        }
        var currency = document.querySelector("#qq-currency");
        if (qq && qq.lastElementChild !== currency ) {
            qq.append(currency);
        }
    });
}