var CURRENT_YOUTUBE_URL = "https://www.youtube.com/";

app.onBeforeRequest(function (top_1, top_2, top_3, current) {
  var cond_1 = top_1 && /https?:\/\/(\w*.)?youtube./i.test(top_1);
  var cond_2 = top_2 && /https?:\/\/(\w*.)?youtube./i.test(top_2);
  var cond_3 = top_3 && /https?:\/\/(\w*.)?youtube./i.test(top_3);
  /*  */
  if (cond_1 || cond_2 || cond_3) {
    if (current.indexOf("/watch?") !== -1) {
      var videoid = /v\=([^&]+)/.exec(current);
      if (videoid && videoid.length) CURRENT_YOUTUBE_URL = "https://www.youtube.com/watch?v=" + videoid[1];
    }
    /*  */
    if (config.youtube.ads) {
      var isad = config.youtube.RegExp.test(current);
      if (isad) {
        //console.error("Ad Blocked: ", current);
        return {"cancel": true};
      }
    }
  }
});

app.onBeforeSendHeaders(function (top_1, top_2, top_3, headers) {
  if (config.youtube.mobile) {
    var cond_1 = top_1 && /https?:\/\/(\w*.)?youtube./i.test(top_1);
    var cond_2 = top_2 && /https?:\/\/(\w*.)?youtube./i.test(top_2);
    var cond_3 = top_3 && /https?:\/\/(\w*.)?youtube./i.test(top_3);
    /*  */
    if (cond_1 || cond_2 || cond_3) {
      for (var i = 0; i < headers.length; i++) {
        var name = headers[i].name.toLowerCase();
        if (name === "user-agent") {
          headers[i].value = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1";
          return {"requestHeaders": headers};
        }
      }
    }
  }
});

app.onHeadersReceived(function (top_1, top_2, top_3, headers) {
  var cond_1 = top_1 && /https?:\/\/(\w*.)?youtube./i.test(top_1);
  var cond_2 = top_2 && /https?:\/\/(\w*.)?youtube./i.test(top_2);
  var cond_3 = top_3 && /https?:\/\/(\w*.)?youtube./i.test(top_3);
  /*  */
  if (cond_1 || cond_2 || cond_3) {
    for (var i = 0; i < headers.length; i++) {
      var name = headers[i].name.toLowerCase();
      if (name === "frame-options" || name === "x-frame-options") {
        headers.splice(i, 1);
        return {"responseHeaders": headers};
      }
    }
  }
});

app.sidebar.receive("settings", app.tab.openOptions);
app.sidebar.receive("faq", function () {app.tab.open(app.homepage())});
app.sidebar.receive("pop-out", function () {app.tab.open(CURRENT_YOUTUBE_URL)});
app.options.receive("get", function (pref) {app.options.send("set", {"pref": pref, "value": config.get(pref)})});

app.options.receive("changed", function (o) {
  config.set(o.pref, o.value);
  app.options.send("set", {"pref": o.pref, "value": config.get(o.pref)});
});
