var config = {};

config.xhr = {};
config.tabId = {};
config.debug = {};
config.worker = {};
config.current = {};
config.context = {};

config.welcome = {
  set lastupdate (val) {app.storage.write("lastupdate", val)},
  get lastupdate () {return app.storage.read("lastupdate") !== undefined ? app.storage.read("lastupdate") : 0}
};

config.addon = {
  set bitrate (val) {app.storage.write("bitrate", val)},
  set fastmethod (val) {app.storage.write("fastmethod", val)},
  get bitrate () {return app.storage.read("bitrate") !== undefined ? app.storage.read("bitrate") : '128'},
  get fastmethod () {return app.storage.read("fastmethod") !== undefined ? app.storage.read("fastmethod") : true}
};

config.methods = {
  "truncate": function (str, len) {
    if (str.length <= len) return str;
    const frontChars = Math.ceil((len - 3) / 2);
    const backChars = Math.floor((len - 3) / 2);
    /*  */
    return str.substr(0, frontChars) + '-' + str.substr(str.length - backChars);
  },
  "make": {
    "banner": function (e, message) {
      app.content_script.send("make-banner", {
        "href": e.href,
        "filename": e.filename,
        "message": message ? e.filename + message : ''
      }, config.tabId[e.filename]);
    }
  },
  "remove": function (e) {
    if (config.xhr[e.filename]) config.xhr[e.filename].abort();
    if (config.worker[e.filename]) config.worker[e.filename].terminate();
    /*  */
    window.setTimeout(function() {
      config.methods.make.banner(e, '');
      /*  */
      delete config.current;
      delete config.xhr[e.filename];
      delete config.tabId[e.filename];
      delete config.worker[e.filename];
      delete config.context[e.filename];
    }, 0);
  },
  "fetch": function (e) {
    config.tabId[config.current.filename] = e.tabId;
    config.methods.make.banner(config.current, " » preparing mp3 convert, please wait...");
    /*  */
    try {
      config.xhr[config.current.filename] = new XMLHttpRequest();
      config.xhr[config.current.filename].href = config.current.href;
      config.xhr[config.current.filename].responseType = "arraybuffer";
      config.xhr[config.current.filename].filename = config.current.filename;
      /*  */
      config.xhr[config.current.filename].open("GET", config.current.url, true);
      /*  */
      if (config.addon.fastmethod) {
        config.xhr[config.current.filename].setRequestHeader("range", "bytes=0-");
      }
      /*  */
      config.xhr[config.current.filename].onload = function (e) {
        if (this.response.byteLength !== 0 && e.target.status !== 403) {
          config.methods.decode({"filename": this.filename}, this.response);
        } else {
          config.methods.make.banner({
            "href": this.href,
            "filename": this.filename
          }, " » could not fetch the audio file! please try again.");
        }
      };
      /*  */
      config.xhr[config.current.filename].onerror = function (e) {
        config.methods.make.banner({
          "href": this.href,
          "filename": this.filename
        }, " » an error has occurred! please try again.");
      };
      /*  */
      config.xhr[config.current.filename].onprogress = function (o) {
        config.methods.make.banner({
          "href": this.href,
          "filename": this.filename
        }, " » fetching audio" + (o.total ? ' ' + Math.round((o.loaded / o.total) * 100) + '%' : '') + ", please wait...");
      };
      /*  */
      config.xhr[config.current.filename].send();
    } catch (e) {
      //console.error(e);
    }
  },
  "decode": function (e, a) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
    /*  */
    config.context[e.filename] = new window.AudioContext();
    config.methods.make.banner(e, " » decoding audio data, please wait...");
    config.context[e.filename].decodeAudioData(a, function (buffer) {
      config.worker[e.filename] = new Worker(chrome.runtime.getURL("lib/worker.js"));
      /*  */
      var channelData = buffer.numberOfChannels === 1 ? [buffer.getChannelData(0)] : [buffer.getChannelData(0), buffer.getChannelData(1)];
      config.worker[e.filename].postMessage({
        "e": e,
        "bitrate": config.addon.bitrate,
        "buffer": {
          "length": buffer.length,
          "channelData": channelData,
          "sampleRate": buffer.sampleRate,
          "numberOfChannels": buffer.numberOfChannels
        }
      });
      /*  */
      config.worker[e.filename].addEventListener("message", function (o) {
        if (o.data.message) config.methods.make.banner(o.data.e, o.data.message);
        if (o.data.blocks) {
          config.methods.make.banner(e, " » downloading mp3 file, please wait...");
          var url = window.URL.createObjectURL(new Blob(o.data.blocks, {"type": "audio/mp3"}));
          app.download({"url": url, "filename": o.data.e.filename}, function () {
            config.methods.make.banner(o.data.e, '');
            /*  */
            delete config.current;
            delete config.xhr[o.data.e.filename];
            delete config.tabId[o.data.e.filename];
            delete config.worker[o.data.e.filename];
            delete config.context[o.data.e.filename];
          });
        }
      }, false);
    }, function () {
      config.methods.make.banner(e, " » an error has occurred! please try again.");
    });
  }
};
