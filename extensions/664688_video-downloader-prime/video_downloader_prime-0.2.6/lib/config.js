var config = {};

config.top = {};

config.page = {
  "audio-joiner": "https://webbrowsertools.com/audio-joiner/",
  "convert-to-mp3": "https://webbrowsertools.com/convert-to-mp3/"
};

config.addon = {
  set state (val) {app.storage.write("state", val, function () {})},
  get state () {return app.storage.read("state") !== undefined ? app.storage.read("state") : "active"}
};

config.welcome = {
  set lastupdate (val) {app.storage.write("lastupdate", val)},
  set open (val) {app.storage.write("support", val, function () {})},
  get open () {return app.storage.read("support") !== undefined ? app.storage.read("support") : true},
  get lastupdate () {return app.storage.read("lastupdate") !== undefined ? app.storage.read("lastupdate") : 0}
};

config.download = {
  get path () {return app.storage.read("download-filepath") || ''},
  set path (val) {app.storage.write("download-filepath", val, function () {})},
  "permission": function (top, url) {
    var cond_1 = url.indexOf(".googlevideo.") !== -1;
    var cond_2 = top && top.indexOf("www.youtube.") !== -1;
    /*  */
    if (config.url.check.ad.test(url)) return false;
    if (cond_1 || cond_2) return false;
    return true;
  }
};

config.popup = {
  get width () {return +app.storage.read("width") || 600},
  get height () {return +app.storage.read("height") || 376},
  set width (val) {
    val = +val;
    if (val < 300) val = 300;
    app.storage.write("width", val, function () {});
  },
  set height (val) {
    val = +val;
    if (val < 200) val = 200;
    app.storage.write("height", val, function () {});
  }
};

config.item = {
  "extract": {
    "domain": function (url) {
      var key = url ? url.match(/:\/\/(?:www\.)?(.[^/]+)(.*)/) : [];
      return (key && key.length) ? key[1] : url;
    }
  },
  "add": function (top, obj) {
    var tmp = config.video.stack;
    if (config.video.use.url === false) top = this.extract.domain(top);
    var list = tmp[top] || [];
    list.push(obj);
    tmp[top] = list;
    config.video.stack = tmp;
  },
  "isValid": function (top, url, size) {
    var add = true; /* do not add duplicate items */
    var tmp = config.video.stack;
    if (config.video.use.url === false) top = this.extract.domain(top);
    var list = tmp[top] || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].url == url || list[i].size == size) return false;
    }
    return true;
  }
};

config.video = {
  "stack": {},
  get list () {return config.video.stack},
  set list (o) {
    delete o["undefined"];
    var size = 0, maxSize = 1000;
    for (var m in o) {
      if (o.hasOwnProperty(m)) size++;
    }
    /*  */
    if (size > maxSize) {
      size = 0;
      var rand = Math.round(Math.random() * maxSize);
      for (var m in o) {
        if (o.hasOwnProperty(m)) {
          var item = size++;
          if (item === rand) {
            delete o[m];
            break;
          }
        }
      }
    }
    /*  */
    config.video.stack = o;
    app.addon.send("update-addon");
  },
  get ext () {
    var tmp = [
      "\\.webm",
      "\\.mkv",
      "\\.vob",
      "\\.ogv",
      "\\.ogg",
      "\\.drc",
      "\\.mng",
      "\\.avi",
      "\\.mov",
      "\\.qt",
      "\\.wmv",
      "\\.yuv",
      "\\.rm",
      "\\.rmvb",
      "\\.m3u",
      "\\.mp4",
      "\\.mp2",
      "\\.mpeg",
      "\\.mpe",
      "\\.mpv",
      "\\.mpg",
      "\\.m2v",
      "\\.m4v",
      "\\.svi",
      "\\.3gp",
      "\\.3g2",
      "\\.mxf",
      "\\.roq",
      "\\.nsv",
      "\\.flv",
      "\\.f4v",
      "\\.f4p",
      "\\.f4a",
      "\\.f4b",
      "\\.m4p"
    ];
    tmp = JSON.stringify(tmp);
    if (app) {return JSON.parse(app.storage.read("video-ext") || tmp)}
    else return [];
  },
  set ext (arr) {app.storage.write("video-ext", JSON.stringify(arr), function () {})},
  get description () {
    var tmp = [
      "Free and libre format created for HTML5 video.",
      "MKV is not an audio or video compression format.",
      "The VOB format is based on the MPEG program stream format.",
      "Open source format.",
      "Open source format.",
      "Open source format.",
      "Multiple-image Network Graphics. Inefficient, not widely used.",
      "Uses RIFF.",
      "QuickTime File Format.",
      "QuickTime File Format.",
      "Windows Media Video.",
      "Raw video format.",
      "RealMedia (RM).",
      "RealMedia Variable Bitrate (RMVB).",
      "M3U is a format that contains multimedia playlists.",
      "MPEG-4 Part 14 (MP4).",
      "MPEG-1 Video Format.",
      "MPEG-1 Video Format.",
      "MPEG-1 Video Format.",
      "MPEG-1 Video Format.",
      "MPEG-1 Video Format.",
      "MPEG-2 Video Format.",
      "M4V – (file format for videos for iPods and PlayStation Portables developed by Apple).",
      "Developed by Apple, used in iTunes. Very similar to MP4 format, but may optionally have DRM.",
      "Common video format for cell phones (3GPP).",
      "Common video format for cell phones (3GPP2).",
      "Material Exchange Format (MXF).",
      "Used by Quake 3. RoQ is comprised of a series of chunks which may contain encoded pieces of video frames.",
      "Nullsoft Streaming Video (NSV).",
      "Flash Video (FLV). Developed by the Adobe Flash Platform.",
      "Flash Video (FLV). Developed by the Adobe Flash Platform.",
      "Flash Video (FLV). Developed by the Adobe Flash Platform.",
      "Flash Video (FLV). Developed by the Adobe Flash Platform.",
      "Flash Video (FLV). Developed by the Adobe Flash Platform.",
      "MPEG-4 Part 14 (MP4)."
    ];
    var arr = JSON.parse(app.storage.read("video-ext-description") || "[]");
    if (arr.length) return arr;
    else return tmp;
  },
  set description (arr) {app.storage.write("video-ext-description", JSON.stringify(arr), function () {})},
  get state () {
    var tmp = [
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active",
      "active"
    ];
    var arr = JSON.parse(app.storage.read("video-ext-state") || "[]");
    if (arr.length) return arr;
    else return tmp;
  },
  set state (arr) {app.storage.write("video-ext-state", JSON.stringify(arr), function () {})},
  "use": {
    set url (val) {app.storage.write("captured", val, function () {})},
    get url () {return app.storage.read("captured") !== undefined ? app.storage.read("captured") : false}
  },
  "show": {
    set resolution (val) {app.storage.write("resolution", val, function () {})},
    get resolution () {return app.storage.read("resolution") !== undefined ? app.storage.read("resolution") : false}
  }
};

config.url = {
  "check": {
    "ad": new RegExp([
      "\\.js",
      "\\.css",
      "\\.png",
      "\\.jpg",
      "\\.tiff",
      "\\.jpeg",
      "\\.woff",
      "\\%22ad",
      "\\/adam\\/",
      "\\_adam\\-",
      "\\-adam\\_",
      "\\-adam\\-",
      "\\&adid\\=",
      "\\.2mdn\\.",
      "\\&adfmt\\=",
      "\\.atdmt\\.",
      "watch7ad\\_",
      "\\/adunit\\/",
      "\\=adhost\\&",
      "\\.innovid\\.",
      "\\/adsales\\/",
      "\\/adServer\\/",
      "\\.doubleclick\\.",
      "\\.serving\\-sys.\\",
      "\\.googlesyndication\\.",
      "\\.google\\-analytics\\.",
      "[\\.]php[\\=\\&\\_\\-\\.\\/\\?\\s\\%]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]ad[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]ads[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]pagead[\\=\\&\\_\\-\\.\\/\\?\\s\\d]"
    ].join('|'), 'i')
  },
  "get": {
    "video": {
      "size": function (s) {
        if (s) {
          if (s >= Math.pow(2, 30)) {return (s / Math.pow(2, 30)).toFixed(1) + " GB"};
          if (s >= Math.pow(2, 20)) {return (s / Math.pow(2, 20)).toFixed(1) + " MB"};
          if (s >= Math.pow(2, 10)) {return (s / Math.pow(2, 10)).toFixed(1) + " KB"};
          return s + " B";
        } else return '';
      },
      "duration": function (s) {
        var date = new Date();
        date.setSeconds(s / 1000);
        return date.toISOString().substr(11, 8) || '';
      },
      "max": {
        set size(val) {app.storage.write("video-max-size", val, function () {})},
        get size() {return parseInt(app.storage.read("video-max-size") || "307200")}
      },
      "ext": function (url, type) {
        var ext = ''
        var rgX = new RegExp(config.video.ext.join("|"), "i");
        var ext1 = rgX.exec(url) || '';
        var ext2 = rgX.exec(type) || '';
        if (ext1 && ext1.length) ext = ext1[0];
        else if (ext2 && ext2.length) ext = ext2[0];
        else ext = '';
        /*  */
        var index = config.video.ext.indexOf("\\" + ext);
        var state = index > -1 ? config.video.state[index] : null;
        /*  */
        return {
          "ext": ext, 
          "state": state
        };
      }
    }
  }
};