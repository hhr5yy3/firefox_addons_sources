var core = {
  "start": function () {
    core.load();
  },
  "install": function () {
    core.load();
  },
  "load": function () {
    app.button.icon(null, config.badge.icon);
    config.domain.cleanup(config.useragent.url);
    app.webrequest.on.before.send.headers.add();
  },
  "update": {
    "page": function (e) {
      app.page.send("storage", {
        "top": e ? e.top : '',
        "url": config.useragent.url,
        "useragent": config.useragent.string
      }, e ? e.tabId : null, e ? e.frameId : null);
    },
    "popup": function () {
      app.popup.send("storage", {
        "key": config.useragent.key,
        "url": config.useragent.url,
        "text": config.useragent.text,
        "string": config.useragent.string
      });
    },
    "useragent": function (e) {
      if (e) {
        if (e.id) {
          var arr = e.id;
          config.useragent.key = arr;
          /*  */
          if (e.url) {
            config.useragent.global = e;
            config.useragent.url = e.url;
          }
          /*  */
          var UA = config.useragent.obj;
          if (arr.length === 1) config.useragent.string = UA[arr[0]];
          else if (arr.length === 2) config.useragent.string = UA[arr[0]][arr[1]];
          else config.useragent.string = '';
          /*  */
          config.badge.icon = config.useragent.string ? arr[0] : '';
          app.button.icon(null, config.badge.icon);
          /*  */
          core.update.popup();
        }
      }
    }
  }
};

app.popup.receive("reload", function () {
  app.tab.query.active(function (tab) {
    if (tab) {
      app.tab.reload(tab);
    }
  });
});

app.popup.receive("useragent-url", function (e) {
  config.useragent.url = "all_urls";
  if (e) config.domain.cleanup(e);
  /*  */
  core.update.popup();
});

app.popup.receive("update-useragent-string", function (e) {
  var tmp = config.useragent.obj;
  /*  */
  if (e.key.length == 1) tmp[e.key[0]] = e.UA;
  if (e.key.length == 2) tmp[e.key[0]][e.key[1]] = e.UA;
  /*  */
  config.useragent.string = e.UA;
  config.useragent.obj = tmp;
  /*  */
  core.update.popup();
});

app.hotkey.on.pressed(function (e) {  
  if (e === "toggle-default-mode") {
    if (config.badge.icon === '') {
      core.update.useragent(config.useragent.global);
    } else {
      core.update.useragent({
        "url": null, 
        "id": ['', '', "default"]
      });
    }
  }
});

app.webrequest.on.before.send.headers.callback(function (info) {
  var url = info.url;
  var type = info.type;
  var docurl = info.documentUrl;
  var initiator = info.initiator;
  var headers = info.requestHeaders;
  var top = initiator ? initiator : (docurl ? docurl : (type === "main_frame" ? url : ''));
  /*  */
  if (config.useragent.string) {
    var domains = config.useragent.url.replace(/\s+/g, '').split(',');
    /*  */
    for (var i = 0; i < headers.length; i++) {
      var name = headers[i].name.toLowerCase();
      if (name === "user-agent") {
        if (config.domain.is.valid(top, domains)) {
          headers[i].value = config.useragent.string;
        }
        /*  */
        return {"requestHeaders": headers};
      }
    }
  }
});

app.popup.receive("load", core.update.popup);
app.popup.receive("useragent-id", core.update.useragent);
app.popup.receive("faq", function () {app.tab.open(app.homepage())});
app.popup.receive("bug", function () {app.tab.open(app.homepage() + "#report")});
app.popup.receive("status-td-text", function (txt) {config.useragent.text = txt});
app.popup.receive("check", function () {app.tab.open(config.useragent.test.method)});
app.popup.receive("donation", function () {app.tab.open(app.homepage() + "?reason=support")});

app.page.receive("load", core.update.page);

app.on.startup(core.start);
app.on.installed(core.install);