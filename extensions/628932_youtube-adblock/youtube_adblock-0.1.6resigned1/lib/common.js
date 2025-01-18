var regExpCheck = function (url) {
  var result = /\%22ad|\&adfmt\=|\.atdmt\.|watch7ad\_|\.innovid\.|\/adsales\/|\/adserver\/|\.fwmrm\.net|\/stats\/ads|ad\d-\w*\.swf$|\.doubleclick\.|\/www\-advertise\.|google\-analytics\.|\.googleadservices\.|\.googletagservices\.|\.googlesyndication\.|\.serving\-sys\.com\/|youtube\.com\/ptracking\?|:\/\/.*\.google\.com\/uds\/afs|\/csi\?v\=\d+\&s\=youtube\&action\=|[\=\&\_\-\.\/\?\s]ad[\=\&\_\-\.\/\?\s]|[\=\&\_\-\.\/\?\s]ads[\=\&\_\-\.\/\?\s]|[\=\&\_\-\.\/\?\s]adid[\=\&\_\-\.\/\?\s]|[\=\&\_\-\.\/\?\s]adunit[\=\&\_\-\.\/\?\s]|[\=\&\_\-\.\/\?\s]adhost[\=\&\_\-\.\/\?\s]|[\=\&\_\-\.\/\?\s]adview[\=\&\_\-\.\/\?\s]|[\=\&\_\-\.\/\?\s]pagead[\=\&\_\-\.\/\?\s\d]|[\=\&\_\-\.\/\?\s]googleads[\=\&\_\-\.\/\?\s]/i.test(url);
  /*  */
  return result;
};

window.setTimeout(function () {
  var version = core.storage.read("version");
  if (version !== core.version()) {
    if (core.loadReason === "install" || core.loadReason === "startup") {
      core.tab.open(core.homepage + "?version=" + core.version() + (version ? "&p=" + version + "&type=upgrade" : "&type=install"));
      core.storage.write("version", core.version());
    }
  }
}, 3000);

core.onBeforeRequest(function (top, current) {
  if (current.indexOf('http') === 0) {
    if (/https?:\/\/(\w*.)?youtube./i.test(top)) {
      if (current.indexOf(".googlevideo.") === -1) {
        if (regExpCheck(current)) {
          return {"cancel": true};
        }
      }
    }
  }
});