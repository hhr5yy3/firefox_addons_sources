app.options.receive("store", function (e) {
  if ("bitrate" in e) config.addon.bitrate = e.bitrate;
  if ("fastmethod" in e) config.addon.fastmethod = e.fastmethod;
});

app.options.receive("load", function () {
  app.options.send("load", {
    "bitrate": config.addon.bitrate,
    "fastmethod": config.addon.fastmethod
  });
});

app.content_script.receive("remove-item", config.methods.remove);

app.content_script.receive("load", function () {
  app.content_script.send("storage", {
    "bitrate": config.addon.bitrate,
    "fastmethod": config.addon.fastmethod
  });
});

app.content_script.receive("fetch-arraybuffer", function (e) {
  config.debug = e;
  var tmp = config.tabId[e.filename];
  if (tmp === undefined) {
    config.current = e;
    config.methods.fetch(e);
  }
});

app.tab.on.removed(function (tabId) {
  for (var filename in config.tabId) {
    var id = config.tabId[filename];
    if (id === tabId) {
      config.methods.remove({"filename": filename});
    }
  }
});

chrome.webRequest.onBeforeRequest.addListener(function (info) {
  if (info) {
    if (info.url) {
      if (info.url.indexOf("mime=audio") !== -1) {
        const sections = info.url.split('?');
        if (sections) {
          if (sections.length > 1) {
            const key = sections[0];
            const parts = sections[1];
            const keys = ["rn", "ump", "srfvp", "rbuf", "range"];
            //
            let parameters = parts.split(/[&;]/g);
            keys.forEach(k => {parameters = parameters.filter((p) => !p.startsWith(encodeURIComponent(k) + '='))});
            const url = decodeURIComponent(key + '?' + parameters.join('&'));
            //
            app.content_script.send("youtube-audio-url", {"url": url}, info.tabId);
          }
        }
      }
    }
  }
}, {
  "types": ["xmlhttprequest"], 
  "urls": ["*://*.googlevideo.com/*"]
});
