var action = function (url) {
  var path = config.browser.path;
  var args = config.browser.args;
  /*  */
  config.temporarily.args = [];
  config.temporarily.args.push(path);
  /*  */
  if (args.length && args[0]) {
    config.temporarily.args.push("/A");
    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      arg = arg.trim();
      if (arg) config.temporarily.args.push(arg);
    }
  }
  /*  */
  var cond = url.startsWith("https://www.google.") && url.indexOf('&url=') !== -1;
  if (cond) url = decodeURIComponent(url.split('&url=')[1].split('&')[0]);
  app.downloads.download({"url": url}, function (e) {
    config.temporarily.id = e;
    config.temporarily.url = url;
  });
};

app.downloads.changed(function (e) {
  var complete = e.state && e.state.current === "complete";
  /*  */
  if (complete) {
    app.downloads.search({}, function (arr) {
      for (var i = 0; i < arr.length; i++) {
        var cond_1 = config.temporarily.id && config.temporarily.id === arr[i].id;
        var cond_2 = config.temporarily.url && config.temporarily.url === arr[i].url;
        var cond_3 = config.temporarily.url && config.temporarily.url.indexOf(".pdf") !== -1;
        /*  */
        if (cond_1 && cond_2 && cond_3) {
          if (config.browser.clear) app.downloads.clear({}, function () {});
          config.temporarily.args.push(arr[i].filename.split("\\").join("\\\\"));
          app.nativeClient.postMessage(config.temporarily.args, function (e) {
            /*  */
            if (e && "error" in e) {
              var a = "please make sure native client patch is installed on your machine.";
              var b = e.error.indexOf("ENOENT") !== -1 ? "please make sure PDF client path is correct in the options page" : '';
              /*  */
              app.notifications.create("An error has occurred! " + b);
            } else if (!e) app.notifications.create("An error has occurred! " + a);
          });
          /*  */
          break;
        }
      }
    });
  }
});

window.setTimeout(function () {
  app.context_menu.create("Open in PDF Viewer", ["link", "page"], action);
}, 300);

app.options.receive("storageData", function () {
  app.options.send("storageData", {
    "args": config.browser.args,
    "path": config.browser.path,
    "clear": config.browser.clear,
  });
});

app.options.receive("path", function (e) {config.browser.path = e});
app.options.receive("args", function (e) {config.browser.args = e});
app.options.receive("clear", function (e) {config.browser.clear = e});