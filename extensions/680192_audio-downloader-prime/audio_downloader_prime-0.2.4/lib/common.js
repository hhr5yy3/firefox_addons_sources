var core = {
  "top": {"url": ''},
  "stack": {"url": {}},
  "global": {"metadata": {}},
  "update": {
    "addon": function () {
      app.tab.active(function (tab) {
        core.top.url = config.audio.use.url ? tab.url : config.item.extract.domain(tab.url);
        /*  */
        var list = config.audio.list;
        var flag = list[core.top.url] && list[core.top.url].length;
        flag ? core.addon.state("active", list[core.top.url].length) : core.addon.state("inactive", 0);
        core.update.popup(list);
      });
    },
    "popup": function (o) {
      app.popup.send("storage", {
        "top": core.top.url,
        "state": config.addon.state,
        "width": config.popup.width,
        "height": config.popup.height,
        "list": o ? o[core.top.url] : [],
        "metadata": core.global.metadata,
        "showResolution": config.audio.show.resolution
      });
    }
  },
  "addon": {
    "state": function (state, number) {
      if (config.addon.state === "active") {
        app.button.badge = (state === "inactive") ? '' : number;
        app.button.label = (state === "inactive") ? "No Audios Found!" : number + " Audio(s) Found!";
        app.button.icon = {
          "path": {
            "16": "../../data/icons/" + state + "/16.png",
            "32": "../../data/icons/" + state + "/32.png",
            "48": "../../data/icons/" + state + "/48.png",
            "64": "../../data/icons/" + state + "/64.png"
          }
        };
      } else {
        app.button.badge = '';
        app.button.label = "ADP is Disabled";
        app.button.icon = {
          "path": {
            "16": "../../data/icons/inactive/16.png",
            "32": "../../data/icons/inactive/32.png",
            "48": "../../data/icons/inactive/48.png",
            "64": "../../data/icons/inactive/64.png"
          }
        };
      }
    }
  }
};

app.tab.updated(function (tab) {
  if (core.stack.url[tab.id] !== tab.url) {
    core.stack.url[tab.id] = tab.url;
    core.update.addon();
  }
});

app.popup.receive("download", function (obj) {
  var filename = obj.filename.replace(/[^a-zA-Z0-9.() ]/g, '').trim().replace(/ /g, '-');
  app.download.start(obj.ext, filename, obj.url);
});

app.popup.receive("popup-update", function (o) {
  var tmp = config.audio.list;
  tmp[core.top.url] = o.list;
  config.audio.list = tmp;
  core.update.popup(config.audio.list);
});

app.popup.receive("clear-audio-list", function (obj) {
  var tmp = config.audio.list;
  tmp[core.top.url] = [];
  config.audio.list = tmp;
  core.update.popup(null);
});

app.popup.receive("disable-addon", function () {
  if (config.addon.state === "active") {
    core.addon.state("inactive", 0);
    config.addon.state = "inactive";
    core.update.popup(null);
  } else {
    core.addon.state("active", 0);
    config.addon.state = "active";
    core.update.popup(config.audio.list);
  }
});

app.options.receive("load", function () {
  app.options.send("storage", {
    "ext": config.audio.ext,
    "state": config.audio.state,
    "openWPage": config.welcome.open,
    "downloadpath": config.download.path,
    "description": config.audio.description,
    "capturedListUseURL": config.audio.use.url,
    "maxAudioSize": config.url.get.audio.max.size,
    "showResolution": config.audio.show.resolution
  });
});

app.options.receive("store", function (o) {
  config.audio.ext = o.ext;
  config.audio.state = o.state;
  config.welcome.open = o.openWPage;
  config.audio.description = o.description;
  config.url.get.audio.max.size = o.maxAudioSize;
  config.audio.use.url = "capturedListUseURL" in o ? o.capturedListUseURL : false;
  config.audio.show.resolution = "showResolution" in o ? o.showResolution : false;
  /*  */
  config.popup.width = config.audio.show.resolution === true ? 700 : 600;
});

app.webrequest(function (top, details) {
  if (config.addon.state === "active") {
    var queryheader = function (headers, headerName) {
      if (headers && headers.length) {
        for (var i = 0; i < headers.length; ++i) {
          var header = headers[i];
          if (header.name.toLowerCase() === headerName) return header.value;
        }
      }
      return '';
    };
    /*  */
    var url = details.url;
    if (config.download.permission(top, url)) {
      var flag = {};
      var requestType = details.type || '';
      var tag = queryheader(details.responseHeaders, "x-dm-tg");
      var time = queryheader(details.responseHeaders, "x-timestamp");
      var type = queryheader(details.responseHeaders, "content-type");
      var size = queryheader(details.responseHeaders, "content-length");
      var title = queryheader(details.responseHeaders, "content-disposition");
      /*  */
      var current = config.url.get.audio.ext(url, type);
      if (current.state === "inactive") return; /* return if state is inactive */
      /*  */
      flag.a = current.ext;
      flag.b = tag.indexOf("audio") !== -1;
      flag.c = type.indexOf("audio") !== -1;
      flag.d = requestType.indexOf("audio") !== -1;
      /*  */
      if (flag.a || flag.b || flag.c || flag.d) {
        if (!size || parseInt(size) > config.url.get.audio.max.size) {
          var originalsize = size || '0';
          var size = config.url.get.audio.size(size) || '?';
          var duration = config.url.get.audio.duration(time);
          /*  */
          if (config.item.isValid(top, url, size)) {
            app.tab.title(details.tabId, function (pagetitle) {
              pagetitle = (pagetitle && pagetitle.indexOf("://") === -1 && pagetitle.indexOf("www.") === -1) ? pagetitle : '';
              config.item.add(top, {
                "url": url,
                "size": size,
                "title": title,
                "ext": current.ext,
                "duration": duration,
                "osize": originalsize,
                "pagetitle": pagetitle,
              });
              /*  */
              //console.error(details.responseHeaders, title);
              window.setTimeout(function () {app.addon.send("update-addon")}, 0);
            });
          }
        }
      }
    }
  }
});

app.popup.receive("metadata", function (e) {core.global.metadata = e});
app.popup.receive("open-options", function () {app.tab.options()});
app.popup.receive("active", function (n) {core.addon.state("active", n)});
app.popup.receive("inactive", function () {core.addon.state("inactive", 0)});
app.popup.receive("load", function () {core.update.popup(config.audio.list)});
app.popup.receive("open-support", function () {app.tab.open(app.homepage())});
app.popup.receive("audio-joiner", function () {app.tab.open(config.page["audio-joiner"])});
app.popup.receive("convert-to-mp3", function () {app.tab.open(config.page["convert-to-mp3"])});
app.popup.receive("make-donation", function () {app.tab.open(app.homepage() + "?reason=support")});
app.popup.receive("resize", function () {app.popup.send("resize", {"width": config.popup.width, "height": config.popup.height})});

app.tab.activated(core.update.addon);
app.addon.receive("update-addon", core.update.addon);
app.tab.removed(function (tabId) {delete config.top[tabId]});
window.setTimeout(function () {core.addon.state(config.addon.state, 0)}, 300);
