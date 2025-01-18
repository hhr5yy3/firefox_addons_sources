var background = (function () {
  var tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
    for (var id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path == "background-to-popup") {
          if (request.method === id) tmp[id](request.data);
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {tmp[id] = callback},
    "send": function (id, data) {
      chrome.runtime.sendMessage({
        "method": id, 
        "data": data,
        "path": "popup-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  }
})();

var config = {
  "resize": function (o) {
    document.body.style.width = o.width + "px";
    document.documentElement.style.width = o.width + "px";
  },
  "global": {
    "storage": {},
    "metadata": {},
    "message": {
      'a': 'Audio Downloader Prime is disabled! To continue, please click on "ADP is Disabled" button in order to enable the addon.',
      'b': 'No Audios to Download! To continue, please refresh the page or try other audios within the page. Please note: Audio Downloader Prime addon may not work properly on all websites.'
    }
  },
  "load": function () {
    var joiner = document.getElementById("audio-joiner");
    var support = document.getElementById("open-support");
    var disable = document.getElementById("disable-addon");
    var donation = document.getElementById("make-donation");
    var clear = document.getElementById("clear-audio-list");
    var settings = document.getElementById("open-settings");
    var convert = document.getElementById("convert-to-mp3");
    /*  */
    joiner.addEventListener("click", function () {background.send("audio-joiner")});
    support.addEventListener("click", function () {background.send("open-support")});
    settings.addEventListener("click", function () {background.send("open-options")});
    donation.addEventListener("click", function () {background.send("make-donation")});
    convert.addEventListener("click", function () {background.send("convert-to-mp3")});
    disable.addEventListener("click", function () {background.send("disable-addon", config.global.storage)});
    clear.addEventListener("click", function () {
      if (config.global.storage) {
        background.send("clear-audio-list", config.global.storage);
      }
    });
    /*  */
    if (navigator.userAgent.indexOf("Edg") !== -1) {
      document.getElementById("explore").style.display = "none";
    }
    /*  */
    background.send("load");
    window.removeEventListener("load", config.load, false);
  },
  "render": function (obj) {
    config.global.metadata = obj.metadata;
    var disable = document.getElementById("disable-addon");
    var table = document.getElementById('audio-list-table');
    table.textContent = '';
    /*  */
    if (obj.list && obj.list.length && obj.state === "active") {
      config.global.storage = obj;
      background.send("active", obj.list.length);
      /*  */
      var generatefilename = function (index, url, title, pagetitle, ext) {
        var filename = '', match = '', filename1 = '', filename2 = '', filename3 = '';
        if (ext) {
          ext = ext.ext;
          if (ext) ext = ext.replace("_", ".");
        }
        /*  */
        match = /\=\"(.+)\"/.exec(title || '');
        if (match && match.length) filename1 = match[1];
        match = url.match(/([^\/]+)(?=\.\w+$)(\.\w+)+/);
        if (match && match.length) filename2 = match[0];
        filename3 = "ADP-captured-audio-" + index + (ext || ".mp3");
        /*  */
        if (pagetitle) return pagetitle + (ext || ".mp3");
        else return filename1 ? filename1 : (filename2 ? filename2 : filename3);
      };
      /*  */
      var truncate = function (str, len) {
        if (str.length <= len) return str;
        var frontChars = Math.ceil((len - 3) / 2), backChars = Math.floor((len - 3) / 2);
        return str.substr(0, frontChars) + '...' + str.substr(str.length - backChars);
      };
      /*  */
      var addline = function (table, i, index) {
        var addcolumn = function (tr, url, rule, title, filename, originalaudiosize) {
          var td = document.createElement("td");
          td.setAttribute('rule', rule);
          if (filename) {
            var a = document.createElement("a");
            a.setAttribute("href", url);
            a.setAttribute('download', filename);
            a.textContent = truncate(filename, 70);
            a.addEventListener("click", function (e) {
              if (e.preventDefault) e.preventDefault();
              background.send("download", {
                "url": url,
                "filename": filename,
                "ext": (obj.list[i].ext || ".mp3")
              });
            });
            /*  */
            td.appendChild(a);
          } else td.textContent = url;
          /*  */
          if (rule === 'copy') {
            td.addEventListener("click", function (e) {
              var a = e.target.parentNode.querySelector('a');
              window.prompt("Copy to clipboard: Ctrl C + Enter", a.getAttribute("href"));
            });
          }
          /*  */
          if (rule === 'download') {
            td.addEventListener("click", function (e) {
              var a = e.target.parentNode.querySelector('a');
              if (a) a.click();
            });
          }
          /*  */
          if (rule === 'delete') {
            td.addEventListener("click", function (e) {
              var tmp = e.target.parentNode.getAttribute("index");
              obj.list.splice(tmp, 1);
              background.send("popup-update", obj);
            });
          }
          /*  */
          if (rule === 'resolution') {
            var tmp = config.global.metadata[title];
            document.getElementById("resolution").style.display = "table-cell";
            if (tmp) td.textContent = tmp.kbps ? (tmp.kbps + ' Kbps') : tmp.duration;
            else {
              try {
                var audio = document.createElement('audio');
                var source = document.createElement('source');
                audio.setAttribute("preload", "metadata");
                source.setAttribute("type", "audio/mpeg");
                audio.onerror = function (e) {e.target.parentNode.textContent = "? Kbps"};
                source.onerror = function (e) {e.target.parentNode.parentNode.textContent = "? Kbps"};
                audio.addEventListener("loadedmetadata", function (e) {
                  var date = new Date(null);
                  var duration = e.target.duration || 0;
                  /*  */
                  date.setSeconds(duration);
                  duration = date.toISOString().substr(11, 8);
                  var size = parseInt(originalaudiosize || '0');
                  var kbit = size / 128; // convert bytes to kbit
                  var kbps = Math.ceil(Math.round(kbit / e.target.duration) / 16) * 16;
                  config.global.metadata[e.target.firstChild.src] = {"duration": duration, "kbps": kbps};
                  background.send("metadata", config.global.metadata);
                  e.target.firstChild.src = 'about:blank';
                  e.target.parentNode.textContent = kbps ? (kbps + ' Kbps') : duration;
                }, false);
                audio.appendChild(source);
                td.appendChild(audio);
                source.src = title;
              } catch (e) {td.textContent = "? Kbps"}
            }
          }
          /*  */
          td.setAttribute('title', title);
          tr.appendChild(td);
        };
        /*  */
        var filename = generatefilename(index, obj.list[i].url, obj.list[i].title || '', obj.list[i].pagetitle || '', obj.list[i].ext || '');
        filenames.push(filename);
        count++;
        /*  */
        var tr = document.createElement("tr");
        addcolumn(tr, index, 'index', '');
        addcolumn(tr, obj.list[i].url, 'url', obj.list[i].url, filename);
        if (obj.showResolution) addcolumn(tr, '————————————', 'resolution', obj.list[i].url, '', obj.list[i].osize);
        addcolumn(tr, obj.list[i].size, 'size', '');
        addcolumn(tr, '✂', 'copy', "Copy the link to the clipboard");
        addcolumn(tr, '⭳', 'download', "Click to download the audio");
        addcolumn(tr, '✕', 'delete', "Click to delete the audio");
        tr.setAttribute('index', i);
        table.appendChild(tr);
      };
      /*  */
      var count = 1;
      var filenames = [];
      for (var i = obj.list.length - 1; i > -1; i--) addline(table, i, count);
      disable.textContent = "Disable ADP";
      disable.setAttribute("state", obj.state);
    } else {
      background.send("inactive");
      /*  */
      var p = document.createElement("p");
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var logo = document.createElement("td");
      /*  */
      td.appendChild(p);
      tr.appendChild(logo);
      tr.appendChild(td);
      table.appendChild(tr);
      logo.setAttribute("class", "logo");
      disable.textContent = "Disable ADP";
      p.textContent = config.global.message.b;
      disable.setAttribute("state", obj.state);
      /*  */
      if (obj.state === "inactive") {
        p.textContent = config.global.message.a;
        disable.textContent = "ADP is Disabled";
      }
    }
    /*  */
    background.send("resize");
  }
};

background.receive("resize", config.resize);
background.receive("storage", config.render);
window.addEventListener("load", config.load, false);
