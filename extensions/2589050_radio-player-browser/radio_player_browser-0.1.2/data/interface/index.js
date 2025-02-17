var config = {
  "resize": {"timeout": null},
  "context": {
    "app": window !== window.top,
    "extension": window === window.top
  },
  "addon": {
    "version": function () {return chrome && chrome.runtime ? chrome.runtime.getManifest().version : ''},
    "homepage": function () {return chrome && chrome.runtime ? chrome.runtime.getManifest().homepage_url : ''}
  },
  "app": {
    "start": function () {
      config.radio.load.database(function () {
        config.radio.render.flash(false);
        config.radio.render.countries();
        config.radio.render.stations(true);
      });
    },
    "prefs": {
      set volume (val) {config.storage.write("volume", val)},
      set country (val) {config.storage.write("country", val)},
      set station (val) {config.storage.write("station", val)},
      get volume () {return config.storage.read("volume") !== undefined ? config.storage.read("volume") : 0.1},
      get station () {return config.storage.read("station") !== undefined ? config.storage.read("station") : 0},
      get country () {return config.storage.read("country") !== undefined ? config.storage.read("country") : ''}
    }
  },
  "load": function () {
    var player = document.getElementById("player");
    var stations = document.getElementById("stations");
    var countries = document.getElementById("countries");
    /*  */
    var reset = document.querySelector(".reset");
    var reload = document.querySelector(".reload");
    var support = document.querySelector(".support");
    var donation = document.querySelector(".donation");
    /*  */
    stations.addEventListener("change", function (e) {
      config.app.prefs.station = e.target.selectedIndex;
      config.radio.render.stations(false);
    });
    /*  */
    player.addEventListener("volumechange", function (e) {
      if (e.target.volume) {
        config.app.prefs.volume = e.target.volume;
      }
    });
    /*  */
    countries.addEventListener("change", function (e) {
      config.app.prefs.station = 0;
      config.app.prefs.country = e.target.value;
      config.radio.render.stations(true);
    });
    /*  */
    support.addEventListener("click", function () {
      if (config.context.extension) {
        var url = config.addon.homepage();
        chrome.tabs.create({"url": url, "active": true});
      }
    }, false);
    /*  */
    donation.addEventListener("click", function () {
      if (config.context.extension) {
        var url = config.addon.homepage() + "?reason=support";
        chrome.tabs.create({"url": url, "active": true});
      }
    }, false);
    /*  */
    reset.addEventListener("click", function () {
      var flag = window.confirm("Are you sure you want to reset the app to factory settings?");
      if (flag) {
        config.app.prefs.station = 0;
        config.app.prefs.country = '';
        config.storage.write("width", 900);
        config.storage.write("height", 700);
        /*  */
        document.querySelector(".reset").disabled = true;
        document.querySelector(".reload").disabled = true;
        window.setTimeout(function () {document.location.reload()}, 300);
      }
    });
    /*  */
    config.storage.load(config.app.start);
    window.removeEventListener("load", config.load, false);
    reload.addEventListener("click", function () {document.location.reload()});
  },
  "storage": {
    "id": '',
    "local": {},
    "read": function (id) {return config.storage.local[id + config.storage.id]},
    "load": function (callback) {
      if (config.context.extension) {
        chrome.storage.local.get(null, function (e) {
          config.storage.local = e;
          callback();
        });
      } else {
        config.storage.id = window.top.location.pathname.replace(/\//g, '');
        var keys = Object.keys(localStorage);
        var i = keys.length;
        while (i--) {
          if (keys[i]) {
            var item = localStorage.getItem(keys[i]);
            if (item) {
              try {
                config.storage.local[keys[i]] = JSON.parse(item);
              } catch (e) {
                config.storage.local[keys[i]] = item;
              }
            }
          }
        }
        callback();
      }
    },
    "write": function (id, data) {
      if (id) {
        id = id + config.storage.id;
        if (data !== '' && data !== null && data !== undefined) {
          var tmp = {};
          tmp[id] = data;
          config.storage.local[id] = data;
          if (config.context.extension) {
            chrome.storage.local.set(tmp, function () {});
          } else {
            localStorage.setItem(id, JSON.stringify(data));
          }
        } else {
          delete config.storage.local[id];
          if (config.context.extension) {
            chrome.storage.local.remove(id, function () {});
          } else {
            localStorage.removeItem(id);
          }
        }
      }
    }
  },
  "radio": {
    "countries": [],
    "load": {
      "database": function (callback) {
        config.radio.render.flash(true);
        config.radio.load.countries(callback);
      },
      "channel": function (country, callback) {
        var request = new XMLHttpRequest();
        request.open("GET", "stations/" + country + ".json");
        request.onload = function () {
          var channel = JSON.parse(request.responseText);
          if (channel) callback(channel);
        };
        /*  */
        request.send();
      },
      "countries": function (callback) {
        var request = new XMLHttpRequest();
        request.open("GET", "stations/countries.json");
        request.onload = function () {
          config.radio.countries = JSON.parse(request.responseText);
          callback(config.radio.countries.length);
        };
        /*  */
        request.send();
      },
      "player": function () {
        var target = document.querySelector(".channel-url");
        if (target) {
          if (target.textContent) {
            var player = document.getElementById("player");
            if (player) {
              player.disabled = true;
              target.style.color = "#999999";
              config.radio.render.flash(true);
              window.setTimeout(function () {player.src = target.textContent}, 1000);
              /*  */
              player.onplaying = function () {config.radio.render.flash(false)};
              player.onloadedmetadata = function () {
                player.volume = config.app.prefs.volume;
                config.radio.render.flash(false);
                target.style.color = "#05ab0b";
                player.disabled = false;
              };
              /*  */
              player.onerror = function () {
                config.radio.render.flash(false);
                target.style.color = "#e61b1b";
                player.disabled = true;
                player.volume = 0;
                /*  */
                var dummy = document.querySelector(".dummy");
                dummy.textContent = "An error has occurred! please try a different channel.";
              };
            }
          }
        }
      }
    },
    "render": {
      "timeout": null,
      "dummy": {
        "option": function (parent, txt) {
          var option = document.createElement("option");
          option.textContent = ' ' + txt;
          option.disabled = true;
          parent.appendChild(option);
          /*  */
          var option = document.createElement("option");
          option.textContent = '';
          option.disabled = true;
          parent.appendChild(option);
        }
      },
      "countries": function () {
        var countries = document.getElementById("countries");
        countries.textContent = '';
        /*  */
        config.radio.countries.sort();
        config.radio.render.dummy.option(countries, "Choose a desired country");
        for (var i = 0; i < config.radio.countries.length; i++) {
          var option = document.createElement("option");
          option.textContent = config.radio.countries[i];
          option.value = config.radio.countries[i];
          countries.appendChild(option);
        }
        /*  */
        if (config.app.prefs.country) countries.value = config.app.prefs.country;
        else countries.selectedIndex = 0;
      },
      "flash": function (flag) {
        var dummy = document.querySelector(".dummy");
        var border = document.querySelector(".image");
        if (config.radio.render.timeout) window.clearTimeout(config.radio.render.timeout);
        /*  */
        if (flag) {
          config.radio.render.timeout = window.setTimeout(function () {
            var color = border ? (border.style.borderColor.indexOf("0.1") !== -1 ? "0.2" : "0.1") : '0';
            var count = function () {return (dummy.textContent.match(/\./g) || []).length};
            var dots = count() === 0 ? "." : (count() === 1 ? ".." : (count() === 2 ? "..." : ''));
            if (border) border.style.borderColor = "rgba(0,0,0," + color + ")";
            dummy.textContent = "Loading, please wait" + dots;
            config.radio.render.flash(flag);
          }, 500);
        } else {
          dummy.textContent = '';
          if (border) border.style.borderColor = "rgba(0,0,0,0.1)";
        }
      },
      "stations": function (build) {
        var country = config.app.prefs.country;
        if (country) {
          config.radio.load.channel(country, function (channel) {
            var stations = document.getElementById("stations");
            var count = document.querySelector(".count .channel");
            /*  */
            if (build) {
              stations.textContent = '';
              config.radio.render.dummy.option(stations, "Choose a desired station");
              for (var id in channel) {
                var option = document.createElement("option");
                option.setAttribute("value", id);
                option.setAttribute("ip", channel[id].ip);
                option.setAttribute("url", channel[id].url);
                option.setAttribute("tags", channel[id].tags);
                option.setAttribute("name", channel[id].name);
                option.setAttribute("state", channel[id].state);
                option.setAttribute("votes", channel[id].votes);
                option.setAttribute("codec", channel[id].codec);
                option.setAttribute("bitrate", channel[id].bitrate);
                option.setAttribute("favicon", channel[id].favicon);
                option.setAttribute("country", channel[id].country);
                option.setAttribute("language", channel[id].language);
                option.setAttribute("homepage", channel[id].homepage);
                option.setAttribute("negativevotes", channel[id].negativevotes);
                /*  */
                option.textContent = channel[id].name;
                stations.appendChild(option);
              }
            }
            /*  */
            stations.selectedIndex = config.app.prefs.station;
            count.textContent = Object.keys(channel).length;
            config.radio.render.info();
            config.radio.load.player();
          });
        }
      },
      "info": function () {
        var info = document.querySelector(".info");
        var image = document.querySelector(".image");
        var stations = document.getElementById("stations");
        var img = image.querySelector("div").querySelector("img");
        var svg = image.querySelector("div").querySelector("svg");
        /*  */
        info.textContent = '';
        var sorted = [], unsorted = [];
        var station = stations[stations.selectedIndex];
        if (station === undefined || station.disabled) return;
        /*  */
        var attributes = station.attributes;
        for (var index in attributes) {
          if (attributes[index]) {
            var name = attributes[index].name;
            if (name && name !== "value") {
              var value = station.getAttribute(name);
              if (value) {
                unsorted.push(name);
              }
            }
          }
        }
        /*  */
        sorted = unsorted.sort();
        for (var i = 0; i < sorted.length; i++) {
          var name = sorted[i];
          var value = station.getAttribute(name);
          if (name && value && name !== "value") {
            var tr = document.createElement("tr");
            /*  */
            var td = document.createElement("td");
            td.setAttribute("type", "name");
            td.textContent = name;
            var uppercase = name === "ip" || name === "url";
            if (uppercase) td.style.textTransform = "uppercase";
            tr.appendChild(td);
            /*  */
            var td = document.createElement("td");
            td.setAttribute("type", "value");
            td.setAttribute("class", "channel-" + name);
            td.textContent =  station.getAttribute(name);
            tr.appendChild(td);
            /*  */
            info.appendChild(tr);
          }
        }
        /*  */
        img.style.display = "none";
        svg.style.display = "block";
        img.src = station.getAttribute("favicon");
        /*  */
        img.onload = function () {
          svg.style.display = "none";
          img.style.display = "block";
        };
        /*  */
        img.onerror = function () {
          img.style.display = "none";
          svg.style.display = "block";
        };
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var support = document.querySelector(".support");
  var donation = document.querySelector(".donation");
  /*  */
  if (support) support.style.display = config.context.extension ? "table-cell" : "none";
  if (donation) donation.style.display = config.context.extension ? "table-cell" : "none";
});

window.addEventListener("resize", function () {
  if (config.resize.timeout) window.clearTimeout(config.resize.timeout);
  config.resize.timeout = window.setTimeout(function () {
    config.storage.write("width", window.innerWidth || window.outerWidth);
    config.storage.write("height", window.innerHeight || window.outerHeight);
  }, 1000);
}, false);

window.addEventListener("load", config.load, false);
