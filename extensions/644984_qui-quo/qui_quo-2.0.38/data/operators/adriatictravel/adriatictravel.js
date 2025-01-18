// САМО-тур online бронирование

window.OPERATOR_NAME = "Adriatic Travel";

function injectData() {
    if ( /page=freight_changes/i.test(document.location.href) ) {
        return;
    }

    if ( location.href.indexOf("freight_monitor") > 0 || location.href.indexOf("page=cl_refer") > 0 ) {
        return null;
    }

    // special check to hide buttons inside hidden area
    if (typeof getHeaderRow === 'function' && getHeaderRow() != null && col(EMPTY_ARR, COL_HOTEL) == null ) {
        return;
    }

    injectTitle();
    makeTableWider();
    makeTransportColSmaller();

    var tbl = getTable()
    if ( tbl == null )
        return

    var trs = getDoc().querySelectorAll("div.resultset table.res>tbody>tr");
    for ( var i = 0; i < trs.length; ++i ) {

        // special check to hide buttons inside hidden area
        var tds = trs[i].querySelectorAll("td");
        if ( tds.length > 0 && !extractDate(colText(tds, [/заезд/, /дата/])) ) {
            continue;
        }

        if ( trs[i].querySelector("td.qq") == null && tds.length > 6 ) {
            var cell = createCell();
            if ( trs[i].querySelector(".silver") ) {
                cell.setAttribute("class", cell.getAttribute("class") + " silver");
            }
            trs[i].appendChild(cell);
            wrapTransportCell(trs[i]);
            wrapAttributesCell(trs[i]);
        }
    }
}
