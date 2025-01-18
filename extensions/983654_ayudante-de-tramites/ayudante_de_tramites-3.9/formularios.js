browser.runtime.onMessage.addListener(function(l, m, k) {
    var h = function(a) {
            return null == a || "undefined" == typeof a || 0 == a.length
        },
        g = function(a, d, b) {
            for (var a = a.getElementsByTagName(b), c = 0; c < a.length; c++) b = a[c], h(b.name) || d.push({
                name: b.name,
                value: b.value
            })
        },
        i = [],
        j = function(a) {
            for (var d = a.getElementsByTagName("form"), b = 0; b < d.length; b++) {
                var c = d[b],
                    e = {};
                e.action = c.action;
                e.method = c.method;
                e.acceptCharset = h(c.acceptCharset) ? a.charset : c.acceptCharset;
                var f = [];
                g(c, f, "input");
                g(c, f, "textarea");
                g(c, f, "select");
                e.inputs = f;
                i.push(e)
            }
            a = a.getElementsByTagName("iframe");
            for (b = 0; b < a.length; b++) d = a[b], d.contentDocument && j(d.contentDocument)
        };
    j(document);
    k({
        forms: i,
        charset: document.charset
    })
});