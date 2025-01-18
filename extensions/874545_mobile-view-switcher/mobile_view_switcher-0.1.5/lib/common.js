var toggle = function () {
  config.addon.state = config.addon.state === "ON" ? "OFF" : "ON";
  /*  */
  app.button.badge(config.addon.state);
  app.tab.active(function (tab) {
    if (tab && tab.id && tab.url) {
      if (tab.url.indexOf("http") === 0 || tab.url.indexOf("ftp") === 0) {
        if (tab.url.indexOf("//m.") === -1) app.tab.reload(tab.id);
        else app.tab.update(tab.id, tab.url.replace("m.", ''));
      }
    }
  });
};

app.content_script.receive("load", function (e) {
  if (config.addon.state === "ON") {
    if (config.useragent.string) {
      app.content_script.send("storage", {
        "useragent": config.useragent.string
      }, (e ? e.tabId : null));
    }
  }
});

app.webrequest(function (headers) {
  if (config.addon.state === "ON") {
    if (config.useragent.string) {
      for (var i = 0; i < headers.length; i++) {
        var name = headers[i].name.toLowerCase();
        if (name === "user-agent") {
          headers[i].value = config.useragent.string;
          return {"requestHeaders": headers};
        }
      }
    }
  }
});

app.button.click(toggle);
app.Hotkey(function (e) {if (e === "_mode") toggle()});
app.contextmenu.clicked(function () {app.tab.open(config.test.page)});

app.options.receive("test", function () {app.tab.open(config.test.page)});
app.options.receive("support", function () {app.tab.open(app.homepage())});
app.options.receive("cache", function (e) {config.bypass.cache = e.cache});
app.options.receive("useragent", function (e) {config.useragent.string = e.useragent});
app.options.receive("donation", function () {app.tab.open(app.homepage() + "?reason=support")});

app.options.receive("load", function () {
  app.options.send("storage", {
    "cache": config.bypass.cache,
    "useragent": config.useragent.string
  }, null);
});

window.setTimeout(function () {
  app.contextmenu.create();
  app.button.badge(config.addon.state);
}, 300);
