window.setTimeout(function () {
  if (config.addon.contextmenu) {
    app.context_menu.create("Translate entire page", function (e) {
      var tmp = "sl=" + config.popup.sourcelang + "&tl=" + config.popup.targetlang + "&u=" + e;
      app.tab.open("https://translate.google.com/translate?" + tmp);
    });
  }
}, 300);

app.popup.receive("open-page", function (e) {
  if (e.type.indexOf("-settings") !== -1) app.tab.openOptions();
  if (e.type.indexOf("-support") !== -1) app.tab.open(app.homepage());
  if (e.type.indexOf("-home") !== -1) {
    var tmp = config.popup.sourcelang + "/" + config.popup.targetlang + "/" + config.popup.inputword;
    app.tab.open("https://translate.google.com/#" + tmp);
  }
});

app.options.receive("changed", function (o) {
  config.set(o.pref, o.value);
  app.options.send("set", {"pref": o.pref, "value": config.get(o.pref)});
});

app.popup.receive("input-word", function (e) {config.popup.inputword = e});
app.popup.receive("source-language", function (e) {config.popup.sourcelang = e});
app.popup.receive("target-language", function (e) {config.popup.targetlang = e});
app.options.receive("get", function (pref) {app.options.send("set", {"pref": pref, "value": config.get(pref)})});
