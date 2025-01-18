/*eslint no-undef: "error"*/
/*global window, document*/

if (window.getAccName && typeof window.getAccName === "function") {
    var accNames = document.querySelectorAll(
        "a[href], area[href], article, aside, button, dialog, datalist, details, fieldset, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hr, iframe, img, input, ul, ol, li, main, math, menu, nav, output, progress, section, select, summary, table, th, textarea, *[role]"
    );

    for (var aN = 0; aN < accNames.length; aN++) {
        window.getAccName(
            accNames[aN],
            function (props, node) {
                if (
                    " datalist iframe img input progress select textarea ".indexOf(
                        " " + node.nodeName.toLowerCase() + " "
                    ) !== -1
                ) {
                    node.parentNode.setAttribute(
                        "data-ws-bm-name-prop",
                        props.name
                    );

                    node.parentNode.setAttribute(
                        "data-ws-bm-desc-prop",
                        props.desc
                    );
                } else {
                    node.setAttribute("data-ws-bm-name-prop", props.name);

                    node.setAttribute("data-ws-bm-desc-prop", props.desc);
                }
            },
            true
        );
    }
}
