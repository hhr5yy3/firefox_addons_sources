$(function() {
    function i(a) {
        var d = e(a.action) ? "" : a.action,
            c = e(a.method) ? "" : a.method;
        $("#form_action")
            .val(d);
        $("#form_method")
            .val(c);
        $("#form_charset")
            .val(a.acceptCharset);
        d = $("#form_detail")
            .html("");
        for (c = 0; c < a.inputs.length; c++) {
            var b = a.inputs[c];
            d.append(j(e(b.name) ? "" : b.name, e(b.value) ? "" : b.value))
        }
    }
    function j(a, d) {
        var c = $("<button type='button' title='Elimina este parametro' >&nbsp;-&nbsp;</button>")
            .click(function() {
                $(this)
                    .parent()
                    .parent()
                    .remove()
            });
        return $("<tr/>")
            .append($("<td/>")
                .append($("<input/>", {
                    val: a,
                    type: "text"
                })))
            .append($("<td/>")
                .append($("<input/>", {
                    val: d,
                    type: "text"
                })))
            .append($("<td/>")
                .append(c))
    }
    function k() {
        for (var a = $("#form_select"), d = $("<optgroup/>")
                .attr("label", "Historial"), c = loadHistory(), b = f.length, g = 0; g < c.length; g++) {
            var h = c[g];
            $("<option/>", {
                    val: b + g,
                    text: e(h.action) ? "" : h.action
                })
                .appendTo(d);
            f.push(h)
        }
        a.append(d);
        0 < f.length && i(f[0])
    }
    function l() {
        $("#form_action")
            .val("");
        $("#form_charset")
            .val("");
        $("#form_detail")
            .html("");
        $("#form_select")
            .html("");
        globalFroms = [];
        k();
        browser.tabs.query({active: true, currentWindow: true}, function(a) {
            browser.tabs.sendMessage(a[0].id, {}, function(a) {
                var a = a.forms,
                    c = $("#form_select")
                    .html("");
                f = [];
                for (var b = 0; b < a.length; b++) {
                    var g = a[b];
                    $("<option/>", {
                            val: b,
                            text: e(g.action) ? "" : g.action
                        })
                        .appendTo(c);
                    f.push(g)
                }
                k()
            })
        })
    }
    var f = [],
        e = function(a) {
            return null == a || "undefined" == typeof a || 0 == a.length
        };
    $("#reload_button")
        .click(function() {
            l()
        });
    $("#add_button")
        .click(function() {
            $("#form_detail")
                .append(j("", ""))
        });
    $("#form_editor")
        .submit(function() {
            if (e($("#form_action")
                    .val())) return !1;
            var a = {};
            a.action = $("#form_action")
                .val();
            a.method = $("#form_method")
                .val();
            a.acceptCharset = $("#form_charset")
                .val();
            $(this)
                .attr({
                    action: a.action,
                    method: a.method,
                    "accept-charset": a.acceptCharset,
                    target: "_top"
                });
            a.inputs = [];
            for (var d = $("#form_hidden")
                    .html(""), c = $("#form_detail input"), b = 0; b < c.length; b += 2) e(c[b].value) || (d.append($("<input/>", {
                name: c[b].value,
                val: c[b + 1].value,
                type: "hidden"
            })), a.inputs.push({
                name: c[b].value,
                value: c[b + 1].value
            }));
            addHistory(a);
            return !0
        });
    $("#form_select")
        .change(function() {
            var a =
                $(this)
                .val();
            a < f.length && i(f[a])
        });
    l()
});
