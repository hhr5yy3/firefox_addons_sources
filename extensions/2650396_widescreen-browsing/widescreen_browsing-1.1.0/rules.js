// These are specific rules for pages which have elements which don't work (typically because they are positioned absolutely)
// variables can be used via JS template strings (also calculations can be performed this way)
//
// available variables:
// sw - screen width (window.innerWidth)
// tw - target width (the width as desired by the user)
// hw - (sw - tw) / 2 - half of the difference between screen width and target width (width of the margins)
// sh - screen height (window.innerHeight)

wbGetCssRules = function(url, tw) {
    // define the variables
    sw = window.innerWidth;
    sh = window.innerHeight;
    hw = (sw - tw) / 2;

    rules = [
        {
            page: "[^ ]*.wikipedia.org",
            preferred: "absolute",
            rules: {
                // shift article previews, citation popups
                ".mwe-popups, .rt-tooltip": { "margin-left": `-${hw}px` },
                // move search suggestions under search box
                ".suggestions": { "margin-right": `-${hw - 15}px` }
            }
        }, {
            page: "geizhals.de",
            rules: {
                "#breadcrumbs__quicklist": { "margin-left": `-${hw}px` },
            }
        },
    ]

    // only return rules which match the current host
    return rules.filter(r => new RegExp(r.page).test(url))
}