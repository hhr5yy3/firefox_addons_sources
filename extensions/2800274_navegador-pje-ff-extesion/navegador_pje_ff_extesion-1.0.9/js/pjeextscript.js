$(document).ready(function () {
    function n(n, t) {
        var i = $(".ultimos ul li").length,
            o = $(".ultimos ul li").find(":contains(" + t + ")");
        o.length > 0 ? o.remove() : i >= l && $(".ultimos ul li").last().remove(),
            $(".ultimos ul").prepend('<li><a href="' + n + '" target="_blank">' + t + "</a></li>")
    }
    function t(n) {
        var t = $.parseJSON(n);
        $.each(t, function (n, t) {
            $(".ultimos ul").append('<li><a href="' + t.Link + '" target="_blank">' + t.Nome + "</a></li>")
        })
    }
    function i() {
        $(".estados").addClass("load"),
            $.get("/data/estados.json", function (n) {
                $.each(n, function (n, t) { $(".estados").append('<option value="' + t.Sigla + '">' + t.Nome + "</option>") })
            }, 'JSON').done(function () {
                $(".estados").removeClass("load")
            })
    }
    function o(n) {
        $(".tribunais").addClass("load"),
            $.get("/data/tribunais.json", function (t) {
                if (null != t[n]) {
                    var i = "<option>TRIBUNAL</option>";
                    $.each(t[n], function (n, t) { i += '<option value="' + t.Link + '">' + t.Apelido + "</option>" }),
                        $(".tribunais").html(i)
                } else alert("Não há tribunais cadastrado para este estado.")
            }, 'JSON').done(function () { $(".tribunais").removeClass("load") })
    }
    function e(n, t) {
        var i = new Date; i.setTime(i.getTime() + 24 * r * 60 * 60 * 1e3); var o = "expires=" + i.toGMTString(), e = a(); if ("" != e) { var s = $.parseJSON(e), u = 0; $.each(s, function (i, o) { t != o.Nome && (u++, l > u && (n += ',{"Nome":"' + o.Nome + '", "Link":"' + o.Link + '"}')) }) } document.cookie = "ultimospje=[" + n + "]; " + o
    } function a() { for (var n = document.cookie.split(";"), t = "ultimospje=", i = 0; i < n.length; i++) { for (var o = n[i]; " " == o.charAt(0);)o = o.substring(1); if (0 == o.indexOf(t)) return o.substring(t.length, o.length) } return "" } $.ajaxSetup({ cache: !1 }), i(); var s = a(), l = 5, r = 30; "" != s && t(s), $(".estados").change(function () { var n = $(this).val(); "" != n && o(n) }), $(".ultimos").on("click", "a", function () { var t = $(this).html(), i = $(this).attr("href"); stringCookie = '{"Nome":"' + t + '", "Link":"' + i + '"}', e(stringCookie, t), n(i, t) }), $(".botao-tribunais").on("click", "button", function () {
        var t = $(".tribunais").val(), i = $(".tribunais").find("option:selected").html(); stringCookie = '{"Nome":"' + i + '", "Link":"' + t + '"}', e(stringCookie, i), n(t, i, !0), window.open(t)
    })
});