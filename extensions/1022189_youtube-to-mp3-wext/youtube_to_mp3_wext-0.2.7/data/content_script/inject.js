var background = (function () {
  let tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
    for (let id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "background-to-page") {
          if (request.method === id) {
            tmp[id](request.data);
          }
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {
      tmp[id] = callback;
    },
    "send": function (id, data) {
      chrome.runtime.sendMessage({
        "method": id, 
        "data": data,
        "path": "page-to-background"
      })
    }
  }
})();

var config = {
  "url": '',
  "count": 0,
  "bitrate": 0,
  "filename": '', 
  "interval": '',
  "fastmethod": '', 
  "ytupdate": function () {
    config.url = '';
  },
  "icon": {
    "mp3": chrome.runtime.getURL("/data/content_script/icons/mp3.png"),
    "loader": chrome.runtime.getURL("/data/content_script/icons/loader.gif")
  },
  "render": function (e) {
    config.bitrate = e.bitrate;
    config.fastmethod = e.fastmethod;
  },
  "truncate": function (str, len) {
    if (str.length <= len) return str;
    const frontChars = Math.ceil((len - 3) / 2);
    const backChars = Math.floor((len - 3) / 2);
    /*  */
    return str.substr(0, frontChars) + '-' + str.substr(str.length - backChars);
  },
  "listener": function (e) {
    if (e) {
      if (e.url !== config.url) {
        config.url = e.url;
      }
    }
  },
  "footer": function (e) {
    let banner = document.getElementById(e.filename);
    let container = document.querySelector(".status-banner-container");
    /*  */
    if (!container) {
      container = document.createElement("div");
      container.setAttribute("class", "status-banner-container");
      document.body.appendChild(container);
    }
    /*  */
    if (e.message) {
      if (banner) {
        banner.querySelector('p').textContent = e.message;
      } else {
        banner = document.createElement("div");
        /*  */
        const a = document.createElement("a");
        const info = document.createElement("p");
        const close = document.createElement("span");
        /*  */
        close.addEventListener("click", function (e) {
          const filename = e.target.getAttribute("filename");
          background.send("remove-item", {"filename": filename});
        });
        /*  */
        banner.setAttribute("class", "status-banner-item");
        close.setAttribute("filename", e.filename);
        banner.setAttribute("id", e.filename);
        info.textContent = e.message;
        close.textContent = '⛌';
        a.title = e.href || '';
        a.href = e.href || '';
        a.textContent = "♫";
        /*  */
        banner.appendChild(a);
        banner.appendChild(info);
        banner.appendChild(close);
        container.appendChild(banner);
      }
    } else {
      banner.remove();
      if (e.filename === config.filename) {
        config.filename = '';
      }
    }
  },
  "finalize": function (parent, context, cls) {
    const button = document.createElement("div");
    button.setAttribute("type", "button");
    button.setAttribute("title", "Convert to MP3");
    button.setAttribute("id", "youtube-to-mp3-button");
    button.setAttribute("class", cls ? cls : "style-scope ytd-menu-renderer force-icon-button style-text");
    /*  */
    const icon = document.createElement("div");
    icon.setAttribute("id", "youtube-to-mp3-img");
    icon.setAttribute("class", "style-scope ytd-toggle-button-renderer");
    icon.style.background = "url(" + config.icon.mp3  + ") no-repeat center center";
    icon.style.backgroundSize = "32px";
    /*  */
    config.count = 0;
    button.appendChild(icon);
    /*  */
    if (context === "desktop") {
      parent.appendChild(button);
    } else {
      parent.insertBefore(button, parent.firstChild);
    }
    /*  */
    button.addEventListener("click", async function () {
      const icon = button.querySelector("div");
      icon.style.backgroundImage = "url(" + config.icon.loader  + ")";
      icon.style.backgroundSize = "22px";
      /*  */
      if (!config.url) await config.extract.download.url("lite");
      /*  */
      if (config.url) {
        icon.style.backgroundImage = "url(" + config.icon.mp3  + ")";
        icon.style.backgroundSize = "32px";
        /*  */
        let filename = document.title || "youtube";
        let time = (new Date()).toTimeString().split(' ')[0].replace(/\:/g, ' ');
        /*  */
        filename = time + ' ' + filename;
        filename = filename.replace(/[^a-zA-Z0-9 ]/g, '') || "youtube";
        filename = filename.replace(/ +/g, ' ').replace(/ /g, '-').replace(/-+/g, '-').toLowerCase();
        filename = config.truncate(filename, 45);
        filename = filename + ".mp3";
        /*  */
        if (filename !== config.filename) {
          config.filename = filename;
          background.send("fetch-arraybuffer", {
            "url": config.url,
            "filename": config.filename,
            "href": document.location.href
          });
        }
      }
    });
  },
  "insert": {
    "button": function () {
      const button = document.getElementById("youtube-to-mp3-button");
      if (!button) {
        const container = {};
        /*  */
        let manager = document.querySelector("#page-manager");
        let slimvideo = document.querySelector("ytm-slim-owner-renderer");
        let sentiment = document.querySelector("#watch8-sentiment-actions");
        let secondary = document.querySelector("#watch8-secondary-actions");
        /*  */
        if (manager) {
          let abovethefold = manager.querySelector("#above-the-fold");
          if (abovethefold) {
            let brow = abovethefold.querySelector("#bottom-row"); // 2024
            if (brow) {
              let actions = brow.querySelector("#actions");
              if (actions) {
                let menu = actions.querySelector("#menu");
                if (menu) {
                  let renderer = menu.querySelector("ytd-menu-renderer");
                  if (renderer) { // #1
                    if (!container.desktop) {
                      container.desktop = renderer;
                    }
                  }
                }
              }
            }
            //
            let trow = abovethefold.querySelector("#top-row"); // 2023
            if (trow) {
              let owner = trow.querySelector("#owner");
              if (owner) { // #2
                if (!container.desktop) {
                  container.desktop = owner;
                }
              }
              //
              let actions = trow.querySelector("#actions");
              if (actions) {
                let menu = actions.querySelector("#menu");
                if (menu) {
                  let computed = menu.querySelector("#top-level-buttons-computed");
                  if (computed) { // #3
                    if (!container.desktop) {
                      container.desktop = computed;
                    }
                  }
                }
              }
            }
          }
        } else if (sentiment) { // #4
          if (!container.desktop) {
            container.desktop = sentiment;
          }
        } else if (secondary) { // #5
          if (!container.desktop) {
            container.desktop = secondary;
          }
        } else if (slimvideo) {
          let subscribe = slimvideo.querySelector(".slim-owner-subscribe-button");
          if (subscribe) { // #6: mobile
            if (!container.mobile) {
              container.mobile = subscribe;
            }
          }
        }
        /*  */
        config.count = config.count + 1;
        /*  */
        if (container.desktop) { // desktop
          config.finalize(container.desktop, "desktop", '');
        } else if (container.mobile) { // mobile
          config.finalize(container.mobile, "mobile", '');
        } else if (config.count > 10) { // force
          const video = document.querySelector("video");
          if (video) {
            const parent = video.parentNode;
            config.finalize(parent, '', "ytmp3-page-button-class-video");
          }
        }
      }
    }
  },
  "extract": {
    "promises": [],
    "download": {
      "url": async function (method) {
        const list = await config.extract.download.urls(document.location.href);
        if (list) {
          if (list.formats) {
            if (list.formats.length) {
              const targets = list.formats.filter(e => method === "lite" ? e.hasAudio && e.hasVideo : e.mimeType.indexOf("audio/") !== -1);
              if (targets) {
                if (targets.length) {
                  const userdefined = targets.filter(e => e.audioBitrate === parseInt(config.bitrate));
                  const target = userdefined && userdefined.length ? userdefined[0] : targets.reduce((max, e) => (e.audioBitrate > max.audioBitrate ? e : max), targets[0]);
                  if (target) {
                    config.url = target.url;
                  }
                }
              }
            }
          }
        }
      },
      "urls": async href => {
        config.extract.promises = [];
        /*  */
        var id = window.urlUtils.getVideoID(href);
        var options = {"requestOptions": {"maxRetries": 0}};
        /*  */
        return window.info.getInfo(id, options).then(async o => {
          var metrics = config.extract.promises.length ? await Promise.all(config.extract.promises) : [];
          //
          if (o.videoDetails === undefined) {
            var packed = JSON.stringify(o);
            if (packed) {
              var date = /publishDate":"([^"]+)"/.exec(packed);
              /*  */
              o.videoDetails = {
                "author": {},
                "title": o.title,
                "videoId": o["video_id"],
                "publishDate": date ? date[1] : "NA"
              };
              /*  */
              if (o.author) {
                o.videoDetails.author.name = o.author.name || o.author;
              } else {
                var b = /"author":"([^"]+)"/.exec(packed);
                if (b) {
                  o.videoDetails.author.name = b[1];
                }
              }
            }
          }
          /*  */
          for (var format of o.formats) {
            try {
              if (format.isDashMPD) {
                if (!page.dom) {
                  var parser = new DOMParser();
                  var content = await fetch(format.url).then(r => r.text());
                  page.dom = parser.parseFromString(content, "text/xml");
                }
                /*  */
                var rep = [...page.dom.querySelectorAll("Representation")];
                var node = rep.filter(node => node.id === format.itag.toString()).shift();
                if (node) {
                  try {
                    var base = node.querySelector("BaseURL").textContent;
                    format.url = [...node.querySelectorAll("SegmentList *")].map(e => {
                      return base + (e.attributes.sourceURL || e.attributes.media).value;
                    });
                  } catch (e) {
                    console.warn("Unable to Parse", node);
                  }
                }
              }
            }
            catch (e) {
              console.warn("Cannot parse DashMPD", e);
            }
          }
          /*  */
          o.formats = o.formats.filter(f => {
            var cond1 = f.isLive === false;
            var cond2 = f.isHLS === false;
            var cond3 = f.mimeType.startsWith("video/");
            var cond4 = f.mimeType.startsWith("audio/");
            /*  */
            return cond1 && cond2 && (cond3 || cond4);
          });
          /*  */
          o.formats = o.formats.map(f => {
            var cond1 = f.bitrate;
            var cond2 = !f.audioBitrate;
            var cond3 = f.mimeType.startsWith("audio/");
            /*  */
            if (cond1 && cond2 && cond3) {
              var rates = [32, 96, 128, 192, 256, 320];
              var ds = rates.map(v => Math.abs(v - f.bitrate / 1000));
              var index = ds.indexOf(Math.min(...ds));
              f.audioBitrate = rates[index];
            }
            /*  */
            if (metrics) {
              if (metrics.length) {
                for (var i = 0; i < metrics.length; i++) {
                  if (f.url) {
                    if (typeof f.url === "object") {
                      f.url = f.url.map(e => e.replace(metrics[i].key, metrics[i].value));
                    } else {
                      f.url = f.url.replace(metrics[i].key, metrics[i].value);
                    }
                  }
                }
              }
            }
            /*  */
            return f;
          }).sort((a, b) => {
            if (a.mimeType.startsWith("audio/") && b.mimeType.startsWith("audio/")) {
              return b.audioBitrate - a.audioBitrate;
            }
          });
          /*  */
          o.title = o.videoDetails.title;
          /*  */
          return o;
        });
      }
    }
  }
};

background.receive("storage", config.render);
background.receive("make-banner", config.footer);
background.receive("youtube-audio-url", config.listener);

background.send("load", {});
if (config.interval) window.clearInterval(config.interval);
config.interval = window.setInterval(config.insert.button, 1000);

document.addEventListener("yt-page-data-updated", config.ytupdate);
