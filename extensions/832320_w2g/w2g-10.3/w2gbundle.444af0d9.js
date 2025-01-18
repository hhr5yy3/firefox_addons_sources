(function () {

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

      var $parcel$global =
        typeof globalThis !== 'undefined'
          ? globalThis
          : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
          ? global
          : {};
  
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire94c2"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire94c2"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
let $c06bfc5450c13220$export$cd2fa11040f69795 = {
    apihost: "w2g-api.w2g.tv"
};


let $590857b73185edda$export$3303a5adb06a24b3 = function() {
    //Polyfills
    if (window.NodeList && !NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype.forEach;
    let exp = {}, doneProm = {}, prtxProms = {}, api_host = (0, $c06bfc5450c13220$export$cd2fa11040f69795).apihost, readyProm = new Promise(function(resolve, reject) {
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", resolve);
        else resolve();
    }), consentProm = new Promise(function(cres, crej) {
        if (window.__tcfapi) window.__tcfapi("addEventListener", 2, function(tcData, success) {
            if (success) {
                if (tcData.eventStatus === "tcloaded" || tcData.eventStatus === "useractioncomplete") cres();
            }
        });
        else cres();
    });
    readyProm.then(function() {
        var dimmer = document.querySelector("#site-dimmer");
        if (dimmer) dimmer.addEventListener("click", function(evt) {
            if (evt.target == dimmer && dimmer.classList.contains("w2g-nodim") === false) exp.hideModal();
            else if (evt.target.classList.contains("cancel")) exp.hideModal();
        });
    });
    exp.showAlert = function(title, body) {
        var modal = document.querySelector("#alert-modal");
        modal.querySelector(".w2g-alert-title").innerText = title;
        modal.querySelector(".w2g-alert-message").innerHTML = body;
        return this.showModal("#alert-modal", false);
    };
    exp.showModal = function(ele, nodim) {
        exp.hideModal();
        if (doneProm[ele] && typeof doneProm[ele] === "function") {
            doneProm[ele]();
            doneProm[ele] = null;
        }
        return new Promise(function(resolve, reject) {
            doneProm[ele] = resolve;
            var node = document.querySelector(ele);
            if (node) {
                document.querySelector("#site-dimmer").classList.remove("hidden");
                document.querySelector("#site-dimmer").classList.add("flex");
                if (nodim) document.querySelector("#site-dimmer").classList.add("w2g-nodim");
                node.classList.remove("hidden");
                node.classList.add("block");
                node.scrollTop = 0;
            } else doneProm[ele]();
        });
    };
    exp.activateAutoMenu = function(ele) {
        var index = 0;
        ele.classList.remove("w2g-menu-notify");
        ele.classList.add("w2g-active");
        ele.parentElement.querySelectorAll("div").forEach(function(link, idx) {
            if (link === ele) index = idx;
            else link.classList.remove("w2g-active");
        });
        while(ele){
            let tabs = ele.parentElement?.querySelectorAll(".w2g-menu-tab");
            if (tabs && tabs.length > 0) {
                tabs.forEach(function(tab, i) {
                    if (i === index) tab.classList.add("w2g-active");
                    else tab.classList.remove("w2g-active");
                });
                break;
            }
            ele = ele.parentElement;
        }
    };
    exp.scrollDiv = function(scrollContainer, scrollTo, duration) {
        return new Promise(function(resolve, reject) {
            var steps = duration / 1000 * 60, step = (scrollTo - scrollContainer.scrollTop) / steps, counter = 0;
            function tick() {
                if (++counter < steps) {
                    scrollContainer.scrollTop += step;
                    window.requestAnimationFrame(tick);
                } else {
                    scrollContainer.scrollTop = scrollTo;
                    resolve();
                }
            }
            tick();
        });
    };
    exp.scrollWindow = function(scrollTo, duration) {
        return new Promise(function(resolve, reject) {
            var steps = duration / 1000 * 60, step = (scrollTo - window.scrollY) / steps, counter = 0;
            function tick() {
                if (++counter < steps) {
                    let pos = window.scrollY;
                    window.scrollTo(0, pos + step);
                    window.requestAnimationFrame(tick);
                } else {
                    window.scrollTo(0, scrollTo);
                    resolve();
                }
            }
            tick();
        });
    };
    exp.hideModal = function(id) {
        if (!id || document.querySelector(id)) {
            var dimmer = document.querySelector("#site-dimmer");
            document.querySelectorAll("#site-dimmer > div").forEach(function(ele) {
                ele.classList.remove("flex");
                ele.classList.add("hidden");
            });
            dimmer.classList.remove("block");
            dimmer.classList.add("hidden");
            dimmer.classList.remove("w2g-nodim");
            for(var cb in doneProm)if (doneProm.hasOwnProperty(cb) && typeof doneProm[cb] === "function") doneProm[cb]();
        }
    };
    exp.showTooltip = function(ele, text, direction, hide, timeout) {
        var node = document.querySelector(ele), template = null;
        switch(direction){
            case "left":
                template = "w2g-popup-left-center";
                break;
            case "bottom":
                template = "w2g-popup-bottom-right";
                break;
        }
        if (template) {
            var tpl = document.querySelector("#" + template).cloneNode(true);
            tpl.removeAttribute("id");
            tpl.querySelector(".w2g-popup-content").innerText = text;
            tpl.querySelector(".animate__animated").classList.add("animate__bounceIn");
            node.appendChild(tpl);
            tpl.classList.remove("hidden");
            if (hide) tpl.addEventListener("click", function() {
                _remove(tpl);
            }, {
                once: true
            });
            if (timeout) setTimeout(function() {
                _remove(tpl);
            }, timeout);
        }
        function _remove(tpl) {
            let ani = tpl.querySelector(".animate__animated");
            tpl.addEventListener("animationend", ()=>{
                tpl.remove();
            });
            ani.classList.remove("animate__bounceIn");
            ani.classList.add("animate__bounceOut");
        }
    };
    exp.loadAssets = function(assets) {
        var counter = 0, id;
        if (typeof assets === "string") assets = [
            assets
        ];
        return new Promise(function(resolve, reject) {
            for(var i = 0; i < assets.length; i++){
                id = "w2gasset_" + genHash(assets[i]);
                if (document.querySelector("#" + id)) checkComplete();
                else {
                    if (assets[i].endsWith(".js")) {
                        var script = document.createElement("script");
                        script.addEventListener("load", checkComplete);
                        script.setAttribute("src", assets[i]);
                        script.setAttribute("id", id);
                        document.getElementsByTagName("head")[0].appendChild(script);
                    } else if (assets[i].endsWith(".css")) {
                        var link = document.createElement("link");
                        link.addEventListener("load", checkComplete);
                        link.setAttribute("href", assets[i]);
                        link.setAttribute("type", "text/css");
                        link.setAttribute("rel", "stylesheet");
                        link.setAttribute("id", id);
                        link.setAttribute("media", "screen,print");
                        document.getElementsByTagName("head")[0].appendChild(link);
                    }
                }
            }
            function checkComplete() {
                counter++;
                if (counter === assets.length) resolve();
            }
            function genHash(str) {
                var hash = 0;
                if (str.length === 0) return hash;
                for(var i = 0; i < str.length; i++){
                    var char = str.charCodeAt(i);
                    hash = (hash << 5) - hash + char;
                    hash = hash & hash;
                }
                return hash;
            }
        });
    };
    exp.querySelector = function(sel) {
        return document.querySelector(sel) || document.createElement("DIV");
    };
    exp.domReady = function() {
        return readyProm;
    };
    exp.canAutoPlay = function() {
        return new Promise(function(mres, mrej) {
            try {
                var vblob = new Blob([
                    new Uint8Array([
                        0,
                        0,
                        0,
                        28,
                        102,
                        116,
                        121,
                        112,
                        105,
                        115,
                        111,
                        109,
                        0,
                        0,
                        2,
                        0,
                        105,
                        115,
                        111,
                        109,
                        105,
                        115,
                        111,
                        50,
                        109,
                        112,
                        52,
                        49,
                        0,
                        0,
                        0,
                        8,
                        102,
                        114,
                        101,
                        101,
                        0,
                        0,
                        2,
                        239,
                        109,
                        100,
                        97,
                        116,
                        33,
                        16,
                        5,
                        32,
                        164,
                        27,
                        255,
                        192,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        55,
                        167,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        112,
                        33,
                        16,
                        5,
                        32,
                        164,
                        27,
                        255,
                        192,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        55,
                        167,
                        128,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        112,
                        0,
                        0,
                        2,
                        194,
                        109,
                        111,
                        111,
                        118,
                        0,
                        0,
                        0,
                        108,
                        109,
                        118,
                        104,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        3,
                        232,
                        0,
                        0,
                        0,
                        47,
                        0,
                        1,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        64,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        3,
                        0,
                        0,
                        1,
                        236,
                        116,
                        114,
                        97,
                        107,
                        0,
                        0,
                        0,
                        92,
                        116,
                        107,
                        104,
                        100,
                        0,
                        0,
                        0,
                        3,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        2,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        47,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        64,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        36,
                        101,
                        100,
                        116,
                        115,
                        0,
                        0,
                        0,
                        28,
                        101,
                        108,
                        115,
                        116,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        47,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        1,
                        100,
                        109,
                        100,
                        105,
                        97,
                        0,
                        0,
                        0,
                        32,
                        109,
                        100,
                        104,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        172,
                        68,
                        0,
                        0,
                        8,
                        0,
                        85,
                        196,
                        0,
                        0,
                        0,
                        0,
                        0,
                        45,
                        104,
                        100,
                        108,
                        114,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        115,
                        111,
                        117,
                        110,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        83,
                        111,
                        117,
                        110,
                        100,
                        72,
                        97,
                        110,
                        100,
                        108,
                        101,
                        114,
                        0,
                        0,
                        0,
                        1,
                        15,
                        109,
                        105,
                        110,
                        102,
                        0,
                        0,
                        0,
                        16,
                        115,
                        109,
                        104,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        36,
                        100,
                        105,
                        110,
                        102,
                        0,
                        0,
                        0,
                        28,
                        100,
                        114,
                        101,
                        102,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        12,
                        117,
                        114,
                        108,
                        32,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        211,
                        115,
                        116,
                        98,
                        108,
                        0,
                        0,
                        0,
                        103,
                        115,
                        116,
                        115,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        87,
                        109,
                        112,
                        52,
                        97,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        2,
                        0,
                        16,
                        0,
                        0,
                        0,
                        0,
                        172,
                        68,
                        0,
                        0,
                        0,
                        0,
                        0,
                        51,
                        101,
                        115,
                        100,
                        115,
                        0,
                        0,
                        0,
                        0,
                        3,
                        128,
                        128,
                        128,
                        34,
                        0,
                        2,
                        0,
                        4,
                        128,
                        128,
                        128,
                        20,
                        64,
                        21,
                        0,
                        0,
                        0,
                        0,
                        1,
                        244,
                        0,
                        0,
                        1,
                        243,
                        249,
                        5,
                        128,
                        128,
                        128,
                        2,
                        18,
                        16,
                        6,
                        128,
                        128,
                        128,
                        1,
                        2,
                        0,
                        0,
                        0,
                        24,
                        115,
                        116,
                        116,
                        115,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        2,
                        0,
                        0,
                        4,
                        0,
                        0,
                        0,
                        0,
                        28,
                        115,
                        116,
                        115,
                        99,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        2,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        28,
                        115,
                        116,
                        115,
                        122,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        2,
                        0,
                        0,
                        1,
                        115,
                        0,
                        0,
                        1,
                        116,
                        0,
                        0,
                        0,
                        20,
                        115,
                        116,
                        99,
                        111,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        44,
                        0,
                        0,
                        0,
                        98,
                        117,
                        100,
                        116,
                        97,
                        0,
                        0,
                        0,
                        90,
                        109,
                        101,
                        116,
                        97,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        33,
                        104,
                        100,
                        108,
                        114,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        109,
                        100,
                        105,
                        114,
                        97,
                        112,
                        112,
                        108,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        45,
                        105,
                        108,
                        115,
                        116,
                        0,
                        0,
                        0,
                        37,
                        169,
                        116,
                        111,
                        111,
                        0,
                        0,
                        0,
                        29,
                        100,
                        97,
                        116,
                        97,
                        0,
                        0,
                        0,
                        1,
                        0,
                        0,
                        0,
                        0,
                        76,
                        97,
                        118,
                        102,
                        53,
                        54,
                        46,
                        52,
                        48,
                        46,
                        49,
                        48,
                        49
                    ])
                ], {
                    type: "video/mp4"
                });
                var vurl = URL.createObjectURL(vblob);
                var vele = document.createElement("video");
                vele.src = vurl;
                vele.play().then(function() {
                    mres(true);
                }).catch(function() {
                    mres(false);
                });
                setTimeout(function() {
                    mres(false);
                }, 2000);
            } catch (e) {
                mres(false);
            }
        });
    };
    exp.consentGiven = function() {
        return consentProm;
    };
    exp.show = function(selector, mode) {
        document.querySelectorAll(selector).forEach(function(ele) {
            ele.style.display = mode || "block";
        });
    };
    exp.hide = function(selector) {
        document.querySelectorAll(selector).forEach(function(ele) {
            ele.style.display = "none";
        });
    };
    exp.postJSON = function(url, data, method, credentials) {
        url = _absUrl(url);
        data = data || {};
        return new Promise(function(resolve, reject) {
            fetch(url, {
                method: method || "POST",
                credentials: credentials || "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(function(data) {
                if (data.ok || data.redirected) data.json().then(function(json) {
                    resolve(json);
                }).catch(function() {
                    resolve();
                });
                else data.json().then(function(json) {
                    reject(json);
                }).catch(function() {
                    reject(data.status);
                });
            }).catch(function(e) {
                reject(500);
            });
        });
    };
    exp.getJSON = function(url, method, headers, credentials) {
        url = _absUrl(url);
        return new Promise(function(resolve, reject) {
            fetch(url, {
                method: method || "GET",
                credentials: credentials || "include",
                cache: "no-cache",
                headers: headers || {}
            }).then(function(data) {
                if (data.ok || data.redirected) data.json().then(function(json) {
                    resolve(json);
                }).catch(function() {
                    reject();
                });
                else data.json().then(function(json) {
                    reject(json);
                }).catch(function() {
                    reject();
                });
            }).catch(reject);
        });
    };
    exp.fetchPRTX = function(url, options) {
        url = _absUrl(url);
        var key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return new Promise(function(resolve, reject) {
            if (w2g.extensionInfo.installed) {
                prtxProms[key] = {
                    resolve: resolve,
                    reject: reject
                };
                window.postMessage({
                    fetchPRX: {
                        url: url,
                        options: options,
                        key: key
                    }
                });
            } else reject("no_extension");
        });
    };
    exp.makeID = function(length) {
        var result = [];
        var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for(var i = 0; i < length; i++)result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        return result.join("");
    };
    window.addEventListener("message", function(event) {
        if (event.origin === window.origin && event.data.type && event.data.type === "ptrxres") {
            if (prtxProms[event.data.key]) {
                if (event.data.error) prtxProms[event.data.key].reject("failed_fetch");
                else prtxProms[event.data.key].resolve(event.data.data);
                delete prtxProms[event.data.key];
            }
        }
    });
    exp.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    exp.getScript = function(source) {
        return new Promise(function(resolve, reject) {
            var script = document.createElement("script");
            var head = document.getElementsByTagName("head")[0];
            script.async = 1;
            script.onload = script.onreadystatechange = function(evt, isAbort) {
                if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                    script.onload = script.onreadystatechange = null;
                    script = undefined;
                    if (!isAbort) resolve();
                    else reject();
                }
            };
            script.onerror = function() {
                reject();
            };
            script.src = source;
            head.appendChild(script);
        });
    };
    exp.storageAvailable = function(type) {
        var storage;
        try {
            storage = window[type];
            var x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return e instanceof DOMException && // everything except Firefox
            (e.code === 22 || // Firefox
            e.code === 1014 || // test name field too, because code might not be present
            // everything except Firefox
            e.name === "QuotaExceededError" || // Firefox
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") && // acknowledge QuotaExceededError only if there's something already stored
            storage && storage.length !== 0;
        }
    };
    exp.setStorage = function(key, val, duration) {
        if (exp.storageAvailable("localStorage")) {
            window.localStorage.setItem(key, JSON.stringify({
                v: val,
                ttl: duration ? Date.now() + duration * 1000 : -1
            }));
            return true;
        } else return false;
    };
    exp.getStorage = function(key) {
        if (exp.storageAvailable("localStorage")) {
            let val = window.localStorage.getItem(key);
            if (val) {
                val = JSON.parse(val);
                if (val.ttl && (val.ttl === -1 || val.ttl > Date.now())) return val.v;
                else {
                    window.localStorage.removeItem(key);
                    return undefined;
                }
            } else return undefined;
        } else return undefined;
    };
    exp.setStorageIfNot = function(key, val, duration) {
        if (!exp.getStorage(key)) {
            exp.setStorage(key, val, duration);
            return true;
        } else return false;
    };
    function _absUrl(url) {
        return url.indexOf("http") === 0 || url.indexOf("chrome-extension") === 0 ? url : "https://" + api_host + url;
    }
    return exp;
}();




var $2wZwj = parcelRequire("2wZwj");

var $fO6JP = parcelRequire("fO6JP");
let $6888e18907efb3b9$export$a3eefc95773c7135 = function(eleClass) {
    var w2gExtension, shareObj, shareRoom;
    var extensionObj = {
        shareInitiated: false,
        shareActive: false,
        shareName: "",
        rooms: [],
        review: "hidden",
        jid: "",
        roomsLoaded: false,
        showRooms: true,
        permissions: true,
        sharePlaylists: [],
        requestPermissions: function() {
            chrome.permissions.request({
                origins: [
                    "<all_urls>"
                ]
            }, (result)=>{
                window.location.reload();
            });
        },
        fetchRooms: function() {
            (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("/streams").then((function(s) {
                this.rooms = s;
            }).bind(this)).catch(function() {
                console.log("Can not fetch rooms.");
            });
        },
        createNewRoom: function() {
            (0, $590857b73185edda$export$3303a5adb06a24b3).postJSON("/rooms/create.json").then(function(data) {
                var openurl = "https://w2g.tv/room/?room_id=" + data.streamkey;
                chrome.tabs.create({
                    url: openurl
                });
            });
        },
        copy_url: function(a, b) {
            if (navigator.clipboard) navigator.clipboard.writeText("https://w2g.tv/room/?room_id=" + b.streamkey);
        },
        roomClick: function(a, b) {
            if (this.shareInitiated) {
                shareRoom = b;
                this.shareName = b.persistent_name || "Temporary Room";
                this.showRooms = false;
                this.shareActive = true;
            } else chrome.tabs.create({
                url: "https://w2g.tv/room/?room_id=" + b.streamkey
            });
        },
        cancelShare: function() {
            shareRoom = null;
            this.shareName = "";
            this.showRooms = true;
            this.shareActive = false;
            this.sharePlaylists = [];
        },
        toggleShare: function(ele) {
            if (ele.price === "share") {
                shareObj = ele;
                this.showRooms = true;
                this.shareInitiated = true;
            } else {
                shareRoom = null;
                shareObj = null;
                this.shareName = "", this.showRooms = true;
                this.sharePlaylists = [];
                this.shareInitiated = false;
                this.shareActive = false;
            }
        },
        shareItem: function() {
            var open = true;
            for(var i = 0; i < this.rooms.length; i++)if (this.rooms[i].streamkey === shareRoom.streamkey) {
                for(var t = 0; t < this.rooms[i].users.length; t++)if (this.rooms[i].users[t].jid === this.jid && this.rooms[i].users[t].online) {
                    open = false;
                    break;
                }
                break;
            }
            (0, $590857b73185edda$export$3303a5adb06a24b3).postJSON("/rooms/" + shareRoom.streamkey + "/sync_update", {
                item_url: shareObj.id,
                item_title: shareObj.title,
                item_thumb: shareObj.thumb
            }).then((function() {
                if (open === true) chrome.tabs.create({
                    url: "https://w2g.tv/room/?room_id=" + shareRoom.streamkey
                });
                this.shareActive = false;
                this.showRooms = true;
            }).bind(this));
        },
        addToPlaylist: function(para, playlist) {
            (0, $590857b73185edda$export$3303a5adb06a24b3).postJSON("/rooms/" + shareRoom.streamkey + "/playlists/" + playlist.key + "/playlist_items/sync_update", {
                "add_items": JSON.stringify([
                    {
                        "url": shareObj.id,
                        "title": shareObj.title,
                        "thumb": shareObj.thumb
                    }
                ])
            }).then((function() {
                this.shareActive = false;
                this.showRooms = true;
            }).bind(this));
        },
        closeFeedback: function() {
            this.review = "hidden";
        },
        feedbackPositive: function() {
            chrome.storage.local.set({
                revshown: 1
            });
            this.review = "positive";
        },
        feedbackNegative: function() {
            chrome.storage.local.set({
                revshown: 2
            });
            this.review = "negative";
        }
    };
    w2gExtension = new (0, $2wZwj.W2gDataObject)(extensionObj);
    new (0, $fO6JP.W2gBind)(w2gExtension, eleClass);
    w2gExtension._addHandler("shareName", function(prop, val) {
        if (shareRoom) (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("/streams/" + shareRoom.streamkey + "/playlists").then((function(data) {
            w2gExtension.sharePlaylists = data;
        }).bind(this));
    });
    chrome.storage.local.get([
        "popcount"
    ]).then(function(res) {
        let count = typeof res.popcount === "undefined" ? 0 : res.popcount;
        count++;
        if (count >= 3) chrome.storage.local.get([
            "revshown"
        ]).then(function(r) {
            if (typeof r.revshown === "undefined") w2gExtension.review = "question";
        });
        chrome.storage.local.set({
            popcount: count
        });
    });
    chrome.permissions.contains({
        origins: [
            "<all_urls>"
        ]
    }, (result)=>{
        w2gExtension.permissions = result;
    });
    return w2gExtension;
};




var $2wZwj = parcelRequire("2wZwj");

var $fO6JP = parcelRequire("fO6JP");
let $c7e3554df1a338b3$export$ab700690df2f22bf = function(eleClass) {
    var loginObj;
    var loginForm = {
        authenticated: false,
        jid: null,
        email: "",
        password: "",
        errors: [],
        processing: false,
        showError: false,
        showDialog: true,
        popoutWindow: function() {
            var href = window.location.href;
            chrome.windows.create({
                url: href + "?popout=true",
                type: "popup",
                width: 400,
                height: 600
            });
            window.close();
        },
        check: function() {
            var data = {};
            (0, $590857b73185edda$export$3303a5adb06a24b3).postJSON("/auth/sign_in.json").then((function(d) {
                if (d.error) this.authenticated = false;
                else {
                    this.jid = d.jid;
                    this.authenticated = true;
                }
            }).bind(this)).catch((function() {
                this.authenticated = false;
            }).bind(this));
        },
        openLogin: function() {
            chrome.tabs.create({
                url: "https://w2g.tv/account"
            });
        }
    };
    loginObj = new (0, $2wZwj.W2gDataObject)(loginForm);
    new (0, $fO6JP.W2gBind)(loginObj, eleClass);
    return loginObj;
};




var $2wZwj = parcelRequire("2wZwj");

var $fO6JP = parcelRequire("fO6JP");

var $b602e660ba61528a$exports = {};

$b602e660ba61528a$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "1.7774c926.png";


var $d1e9d21ed894d89c$exports = {};
var $e3464e020d7a3136$exports = {};

$e3464e020d7a3136$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "w2gbundle.ccb362a9.js";


var $6dbd7674e4075c87$exports = {};

$6dbd7674e4075c87$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "youtube-AT.c460f9f9.json";


var $69993e67befe47c5$exports = {};

$69993e67befe47c5$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "youtube-CA.34ecb1f4.json";


var $4e0b99d799a5fba8$exports = {};

$4e0b99d799a5fba8$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "youtube-DE.a8369814.json";


var $b571f4eada8948b9$exports = {};

$b571f4eada8948b9$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "youtube-ES.f923d344.json";


var $051ae0ab0721a728$exports = {};

$051ae0ab0721a728$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "youtube-FR.967d502d.json";


var $980c11b14cd52a91$exports = {};

$980c11b14cd52a91$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "youtube-GB.c908448f.json";


var $2cb15430444b06b1$exports = {};

$2cb15430444b06b1$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "youtube-IT.7fc9c01d.json";


var $eed953239ab832aa$exports = {};

$eed953239ab832aa$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "youtube-NL.18439e9c.json";


var $362e72ace2b276d2$exports = {};

$362e72ace2b276d2$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "youtube-PL.b07e9962.json";


var $3223df110e2d1735$exports = {};

$3223df110e2d1735$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "youtube-SE.41171058.json";


var $a19efc05096156d7$exports = {};

$a19efc05096156d7$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "youtube-US.e93c76d4.json";


$d1e9d21ed894d89c$exports = {
    "vimeo": $e3464e020d7a3136$exports,
    "youtube-AT": $6dbd7674e4075c87$exports,
    "youtube-CA": $69993e67befe47c5$exports,
    "youtube-DE": $4e0b99d799a5fba8$exports,
    "youtube-ES": $b571f4eada8948b9$exports,
    "youtube-FR": $051ae0ab0721a728$exports,
    "youtube-GB": $980c11b14cd52a91$exports,
    "youtube-IT": $2cb15430444b06b1$exports,
    "youtube-NL": $eed953239ab832aa$exports,
    "youtube-PL": $362e72ace2b276d2$exports,
    "youtube-SE": $3223df110e2d1735$exports,
    "youtube-US": $a19efc05096156d7$exports
};


function $68c5577c31e848e7$export$f48bef9e899079a1() {
    this.provider_name = "youtube";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($b602e660ba61528a$exports)));
    this.description = "Search OR Paste a link to a Youtube video";
    this.active = false;
    this.nextToken = "";
    this.saveSearch = "Save Search";
    this.ytRegions = [
        "DE",
        "US",
        "GB",
        "FR",
        "SE",
        "CA",
        "IT",
        "ES",
        "PL",
        "AT",
        "NL"
    ];
}
//Lookup video info through youtube API
$68c5577c31e848e7$export$f48bef9e899079a1.prototype.videoLookUp = function(url, callback) {
    var listparser = url.match(/\/\/(?:www\.|music\.|m\.)?youtube.com\/\S+list=(\S+)$/);
    var idparser = url.match(/\/\/(?:www\.|music\.|m\.)?(?:youtube\.com|youtu\.be|youtube-nocookie\.com)[\S]*(?:v=|embed\/|v\/|\/)([^"&?=\/\s]{11})/);
    var results = [], shouldWait = 0, waitCount = 0;
    if (listparser && callback) {
        shouldWait++;
        (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://search.w2g.tv/w2g_search/playlist?id=" + listparser[1]).then((function(videos) {
            var clip;
            videos.forEach((function(v) {
                clip = {};
                clip.id = v.url;
                clip.provider = this.provider_name;
                clip.title = v.title;
                clip.publisher = v.creator;
                clip.publisherID = null;
                clip.desc = "";
                clip.price = "";
                clip.thumb = v.thumb;
                results.push(clip);
            }).bind(this));
            check();
        }).bind(this));
    }
    if (idparser && callback) {
        shouldWait++;
        (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://search.w2g.tv/w2g_search/lookup?url=//www.youtube.com/watch?v=" + idparser[1]).then((function(data) {
            var info = {};
            info.id = data.url;
            info.provider = this.provider_name;
            info.title = data.title;
            info.publisher = data.creator || "";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = data.thumb;
            results.unshift(info);
            check();
        }).bind(this)).catch((function() {
            var info = {};
            info.id = "//www.youtube.com/watch?v=" + idparser[1];
            info.provider = this.provider_name;
            info.title = url;
            info.publisher = "";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = "https://i.ytimg.com/vi/" + idparser[1] + "/mqdefault.jpg";
            results.unshift(info);
            check();
        }).bind(this));
    }
    function check() {
        waitCount++;
        if (waitCount >= shouldWait) callback(results, "youtube");
    }
    return listparser !== null || idparser !== null;
};
$68c5577c31e848e7$export$f48bef9e899079a1.prototype.search = function(term, count, page, callback) {
    if (term.indexOf("publisher:") === 0) (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://search.w2g.tv/w2g_search/channel?id=" + term.split(":")[1]).then((function(videos) {
        var results = [], clip, channelID;
        videos.forEach((function(v) {
            //channelID = v.creatorurl ? v.creatorurl.match(/\/channel\/(\S+)$/) : null;
            //channelID = channelID && channelID.length === 2 ? channelID[1] : "";
            clip = {};
            clip.id = v.url;
            clip.provider = this.provider_name;
            clip.title = v.title;
            clip.publisher = v.creator || "";
            clip.publisherID = nullS;
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.thumb;
            results.push(clip);
        }).bind(this));
        callback(results, "youtube");
    }).bind(this));
    else if (term !== "") (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://search.w2g.tv/w2g_search/search?q=" + term).then((function(videos) {
        var results = [], clip, channelID;
        videos.forEach((function(v) {
            //channelID = v.creatorurl ? v.creatorurl.match(/\/channel\/(\S+)$/) : null;
            //channelID = channelID && channelID.length === 2 ? channelID[1] : "";
            clip = {};
            clip.id = v.url;
            clip.provider = this.provider_name;
            clip.title = v.title;
            clip.publisher = v.creator || "";
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.thumb;
            results.push(clip);
        }).bind(this));
        callback(results, "youtube");
    }).bind(this)).catch(function() {
        callback([], "youtube");
    });
    else {
        var region = this.ytRegions.indexOf(navigator.language.toUpperCase()) !== -1 ? navigator.language.toUpperCase() : "US";
        var results = [], clip;
        (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON($d1e9d21ed894d89c$exports["youtube-" + region]).then((function(v) {
            let itms = v.items.slice(0, 15);
            itms.forEach((function(v, i) {
                clip = {};
                clip.id = "//www.youtube.com/watch?v=" + (typeof v.id === "object" ? v.id.videoId : v.id);
                clip.provider = this.provider_name;
                clip.title = v.snippet.title;
                clip.publisher = v.snippet.channelTitle;
                clip.publisherID = null;
                clip.date = new Date(v.snippet.publishedAt).toDateString();
                clip.desc = v.snippet.description;
                clip.price = "";
                clip.thumb = v.snippet.thumbnails.medium.url;
                results.push(clip);
            }).bind(this));
            callback(results, "youtube");
        }).bind(this));
    }
};
$68c5577c31e848e7$export$f48bef9e899079a1.prototype.getSearchSuggestion = function(term, callback) {
    (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://search.w2g.tv/w2g_search/suggestions?q=" + term).then(function(data) {
        callback(data);
    });
};


var $17c29762f11cb0b0$exports = {};

$17c29762f11cb0b0$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "33.7a424336.png";


function $67716c025aa11ef0$export$75a501519d5876d0() {
    this.provider_name = "Streaming";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($17c29762f11cb0b0$exports)));
    this.active = false;
    this.description = "Paste a link to any streaming service. (Account / Subscription required for each user of this room.)";
}
$67716c025aa11ef0$export$75a501519d5876d0.prototype.videoLookUp = function(url, callback) {
    return false;
};
//Search for video through facebook API
$67716c025aa11ef0$export$75a501519d5876d0.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};



var $d75206da094241f3$exports = {};

$d75206da094241f3$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "2.bbd021da.png";


function $0c747c96df1f36e0$export$d46535fcadedfffe() {
    this.provider_name = "vimeo";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($d75206da094241f3$exports)));
    this.description = "Search OR Paste a link to a Vimeo video";
    this.active = false;
    this.defaultSearch = "short film";
    this.saveSearch = false;
}
//Lookup video info through youtube API
$0c747c96df1f36e0$export$d46535fcadedfffe.prototype.videoLookUp = function(url, callback) {
    var clip = {};
    if (url.match(/^https?:\/\/vimeo\.com/)) {
        if (callback) (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://vimeo.com/api/oembed.json?url=" + url, "GET", null, "omit").then((function(v) {
            clip.id = url;
            clip.provider = this.provider_name;
            clip.title = v.title || "Vimeo Video";
            clip.publisher = v.author_name || "Vimeo";
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.thumbnail_url || "https://static.w2g.tv/static/providers/2.png";
            clip.duration = v.duration || 1;
            clip.cc = false;
            clip.explicit = false;
            callback([
                clip
            ], "vimeo");
        }).bind(this)).catch((function(err) {
            callback([], "vimeo");
        }).bind(this));
        return true;
    } else return false;
};
$0c747c96df1f36e0$export$d46535fcadedfffe.prototype.search = function(term, count, page, callback) {
    function parseResponse(data) {
        var results = [], clip;
        data.data.forEach((function(v, i) {
            clip = {};
            clip.id = "//vimeo.com/" + v.uri.split("/")[2];
            clip.provider = this.provider_name;
            clip.title = v.name;
            clip.publisher = v.user.name;
            clip.publisherID = v.user.uri.split("/")[2];
            clip.date = new Date(v.created_time).toDateString();
            clip.desc = v.description;
            clip.price = "";
            clip.thumb = v.pictures[2].link;
            results.push(clip);
        }).bind(this));
        callback(results, "vimeo");
    }
    var safe = this.saveSearch;
    var safesearch = safe === true ? "&filter=content_rating&filter_content_rating=safe" : "";
    if (term.indexOf("publisher:") === 0) (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://api.vimeo.com/users/" + term.split(":")[1] + "/videos?client_id=1857ad39c4dbead68e92c46df04539664debda97&page=" + page + "&fields=uri,name,description,pictures,created_time,user.uri,user.name&sort=modified_time&per_page=" + count, "GET", null, "omit").then(parseResponse.bind(this));
    else if (term !== "") (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://api.vimeo.com/videos?query=" + term + safesearch + "&client_id=1857ad39c4dbead68e92c46df04539664debda97&page=" + page + "&fields=uri,name,description,pictures,created_time,user.uri,user.name&per_page=" + count, "GET", null, "omit").then(parseResponse.bind(this));
    else (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://api.vimeo.com/videos?query=funny" + safesearch + "&client_id=1857ad39c4dbead68e92c46df04539664debda97&page=" + page + "&fields=uri,name,description,pictures,created_time,user.uri,user.name&per_page=" + count, "GET", null, "omit").then(parseResponse.bind(this));
};


var $0d774424414684f6$exports = {};

$0d774424414684f6$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "35.679ead21.png";


function $a075bba626ef7cc3$export$a1d14d0cbe839f78() {
    this.provider_name = "kick";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($0d774424414684f6$exports)));
    this.active = false;
    this.description = "Paste a link to a kick.com live stream.";
}
$a075bba626ef7cc3$export$a1d14d0cbe839f78.prototype.videoLookUp = function(url, callback) {
    return false;
};
//Search for video through facebook API
$a075bba626ef7cc3$export$a1d14d0cbe839f78.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};


var $f7bd967e5e5147cb$exports = {};

$f7bd967e5e5147cb$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "34.ffe429f0.png";



const $f269366c5b08b346$var$stores = '["dz","ao","ai","ag","ar","am","au","at","az","bs","bh","bb","by","be","bz","bj","bm","bt","bo","ba","bw","br","vg","bg","kh","cm","ca","cv","ky","td","cl","cn","co","cr","hr","cy","cz","ci","cd","dk","dm","do","ec","eg","sv","ee","sz","fj","fi","fr","ga","gm","ge","de","gh","gr","gd","gt","gw","gy","hn","hk","hu","is","in","id","iq","ie","il","it","jm","jp","jo","kz","ke","kr","xk","kw","kg","la","lv","lb","lr","ly","lt","lu","mo","mg","mw","my","mv","ml","mt","mr","mu","mx","fm","md","mn","me","ms","ma","mz","mm","na","np","nl","nz","ni","ne","ng","mk","no","om","pa","pg","py","pe","ph","pl","pt","qa","cg","ro","ru","rw","sa","sn","rs","sc","sl","sg","sk","si","sb","za","es","lk","kn","lc","vc","sr","se","ch","tw","tj","tz","th","to","tt","tn","tm","tc","tr","ae","ug","ua","gb","us","uy","uz","vu","ve","vn","ye","zm","zw"]';
let $f269366c5b08b346$var$storefront = "us";
(0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("/users/get_userlocation").then(function(res) {
    $f269366c5b08b346$var$storefront = res.country.toLowerCase();
});
function $f269366c5b08b346$export$4b0d605e164b1aa1() {
    this.provider_name = "Apple Music";
    this.provider_type = "search";
    this.provider_category = "music";
    this.active = false;
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($f7bd967e5e5147cb$exports)));
    this.description = "Search OR paste a link to a song on Apple Music (BETA) (https://music.apple.com/...)";
    this.defaultSearch = "music";
    this.saveSearch = false;
    this.currentKey = null;
    this.getKey = function() {
        return new Promise((function(resolve, reject) {
            if (!this.currentKey) (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://static.w2g.tv/static/tokens/aplm.json", null, null, "omit").then((function(data) {
                this.currentKey = data.key;
                resolve(this.currentKey);
            }).bind(this)).catch(function() {
                reject("no key");
            });
            else resolve(this.currentKey);
        }).bind(this));
    };
}
//Lookup video info through youtube API
$f269366c5b08b346$export$4b0d605e164b1aa1.prototype.videoLookUp = function(url, callback) {
    let results = [], match = url.match(/^https:\/\/music\.apple\.com\/([a-z]+)\/\S+i=([0-9]+)/);
    if (match && match.length === 3) {
        if (callback) this.getKey().then((function(access_token) {
            (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://api.music.apple.com/v1/catalog/" + match[1] + "/songs/" + match[2], "GET", {
                "Authorization": "Bearer " + access_token
            }, "omit").then((function(d) {
                if (d.data && d.data[0]) results.push({
                    id: d.data[0].attributes.url,
                    provider: "applemusic",
                    title: d.data[0].attributes.artistName + " - " + d.data[0].attributes.name,
                    publisher: null,
                    publisherID: null,
                    desc: "",
                    thumb: d.data[0].attributes.artwork.url.replace("{w}", "200").replace("{h}", "200")
                });
                callback(results, this.provider_name);
            }).bind(this)).catch(function() {
                callback([]);
            });
        }).bind(this));
        return true;
    } else return false;
};
$f269366c5b08b346$export$4b0d605e164b1aa1.prototype.search = function(term, count, page, callback) {
    let results = [];
    this.getKey().then((function(access_token) {
        (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://api.music.apple.com/v1/catalog/" + $f269366c5b08b346$var$storefront + "/search?types=songs&limit=25&term=" + term.replace(" ", "+"), "GET", {
            "Authorization": "Bearer " + access_token
        }, "omit").then((function(d) {
            if (d.results.songs) d.results.songs.data.forEach((function(s) {
                results.push({
                    id: s.attributes.url,
                    provider: "applemusic",
                    title: s.attributes.artistName + " - " + s.attributes.name,
                    publisher: null,
                    publisherID: null,
                    desc: "",
                    thumb: s.attributes.artwork.url.replace("{w}", "200").replace("{h}", "200")
                });
            }).bind(this));
            callback(results, this.provider_name);
        }).bind(this)).catch(function() {
            callback([]);
        });
    }).bind(this));
};
$f269366c5b08b346$export$4b0d605e164b1aa1.prototype.getSearchSuggestion = function(term, callback) {
    this.getKey().then((function(access_token) {
        (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://api.music.apple.com/v1/catalog/" + $f269366c5b08b346$var$storefront + "/search/suggestions?types=songs&kinds=terms,topResults&limit=10&term=" + term.replace(" ", "+"), "GET", {
            "Authorization": "Bearer " + access_token
        }, "omit").then(function(res) {
            let data = [];
            if (res.results && res.results.suggestions.length > 1) res.results.suggestions.forEach(function(r) {
                if (r.kind === "terms") data.push(r.displayTerm);
                else if (r.kind === "topResults") data.push(r.content.attributes.artistName.toLowerCase() + " " + r.content.attributes.name.toLowerCase());
            });
            callback(data);
        });
    }).bind(this));
};



var $84e4bd82c60e2806$exports = {};

$84e4bd82c60e2806$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "7.869c0e49.png";


function $e52bc9822bb7d675$export$9d14414b7139814a() {
    this.provider_name = "twitch";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($84e4bd82c60e2806$exports)));
    this.active = false;
    this.defaultSearch = "featured";
    this.description = "Paste a link to a Twitch stream video or clip.";
    this.currentKey = null;
    this.getKey = function() {
        return new Promise((function(resolve, reject) {
            if (!this.currentKey) (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://static.w2g.tv/static/tokens/twitch.json", null, null, "omit").then((function(data) {
                this.currentKey = data.access_token;
                resolve(this.currentKey);
            }).bind(this)).catch(function() {
                reject("no key");
            });
            else resolve(this.currentKey);
        }).bind(this));
    };
}
$e52bc9822bb7d675$export$9d14414b7139814a.prototype.videoLookUp = function(url, callback) {
    var clip, data, matches;
    if (url.match(/^https?:\/\/([a-z]+\.)?twitch\.tv\/.+/)) {
        matches = url.match(/^https?:\/\/(?:[a-z]+\.)?twitch\.tv\/.+\/clip\/([a-zA-Z0-9_\-]+)/) || url.match(/^https?:\/\/clips\.twitch\.tv\/([a-zA-Z0-9_\-]+)$/);
        if (matches && matches.length === 2) {
            if (callback) this.getKey().then((function(access_token) {
                (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://api.twitch.tv/helix/clips?id=" + matches[1], "GET", {
                    "Client-ID": "jcrgthxmtvgmyk50ftscbxgc4a732cm",
                    "Authorization": "Bearer " + access_token
                }, "omit").then((function(d) {
                    if (d.data.length > 0) {
                        data = d.data[0];
                        clip = {};
                        clip.id = data.url;
                        clip.provider = this.provider_name;
                        clip.title = data.title;
                        clip.publisher = data.broadcaster_name;
                        clip.publisherID = data.broadcaster_id;
                        clip.desc = "";
                        clip.price = "";
                        clip.thumb = data.thumbnail_url;
                        clip.duration = 0;
                        clip.cc = false;
                        clip.explicit = false;
                        callback([
                            clip
                        ], this.provider_name);
                    } else callback([], this.provider_name);
                }).bind(this)).catch((function() {
                    callback([], this.provider_name);
                }).bind(this));
            }).bind(this));
            return true;
        }
        matches = url.match(/^https?:\/\/(?:[a-z]+\.)?twitch\.tv\/videos\/([0-9]+)/);
        if (matches && matches.length === 2) {
            if (callback) this.getKey().then((function(access_token) {
                (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://api.twitch.tv/helix/videos?id=" + matches[1], "GET", {
                    "Client-ID": "jcrgthxmtvgmyk50ftscbxgc4a732cm",
                    "Authorization": "Bearer " + access_token
                }, "omit").then((function(d) {
                    if (d.data.length > 0) {
                        data = d.data[0];
                        clip = {};
                        clip.id = data.url;
                        clip.provider = this.provider_name;
                        clip.title = data.title;
                        clip.publisher = data.user_name;
                        clip.publisherID = data.user_id;
                        clip.desc = "";
                        clip.price = "";
                        clip.thumb = data.thumbnail_url.replace("%{width}x%{height}", "800x450");
                        clip.duration = 0;
                        clip.cc = false;
                        clip.explicit = false;
                        callback([
                            clip
                        ], this.provider_name);
                    } else callback([], this.provider_name);
                }).bind(this)).catch((function() {
                    callback([], this.provider_name);
                }).bind(this));
            }).bind(this));
            return true;
        }
        matches = url.match(/^https?:\/\/(?:[a-z]+\.)?twitch\.tv\/(\w+)/);
        if (matches && matches.length === 2) {
            if (callback) this.getKey().then((function(access_token) {
                (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://api.twitch.tv/helix/streams?user_login=" + matches[1], "GET", {
                    "Client-ID": "jcrgthxmtvgmyk50ftscbxgc4a732cm",
                    "Authorization": "Bearer " + access_token
                }, "omit").then((function(d) {
                    if (d.data.length > 0) {
                        data = d.data[0];
                        clip = {};
                        clip.id = url;
                        clip.provider = this.provider_name;
                        clip.title = data.title;
                        clip.publisher = data.user_name;
                        clip.publisherID = data.user_id;
                        clip.desc = "";
                        clip.price = "";
                        clip.thumb = data.thumbnail_url.replace("{width}x{height}", "800x450");
                        clip.duration = 0;
                        clip.cc = false;
                        clip.explicit = false;
                        callback([
                            clip
                        ], this.provider_name);
                    } else callback([], this.provider_name);
                }).bind(this)).catch((function() {
                    callback([], this.provider_name);
                }).bind(this));
            }).bind(this));
            return true;
        }
        return false;
    } else return false;
};
$e52bc9822bb7d675$export$9d14414b7139814a.prototype.search = function(term, count, page, callback) {
    var results = [], clip;
    if (term.indexOf("publisher:") === 0) this.getKey().then((function(access_token) {
        (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://api.twitch.tv/helix/videos?first=50&user_id=" + term.split(":")[1], "GET", {
            "Client-ID": "jcrgthxmtvgmyk50ftscbxgc4a732cm",
            "Authorization": "Bearer " + access_token
        }, "omit").then((function(d) {
            d.data.forEach((function(v, i) {
                clip = {};
                clip.id = v.url;
                clip.provider = this.provider_name;
                clip.title = v.title;
                clip.publisher = v.user_name;
                clip.publisherID = v.user_id;
                clip.desc = "";
                clip.price = "";
                clip.thumb = v.thumbnail_url ? v.thumbnail_url.replace("%{width}x%{height}", "800x450") : "https://static.w2g.tv/static/providers/7.png";
                results.push(clip);
            }).bind(this));
            callback(results, this.provider_name);
        }).bind(this));
    }).bind(this));
    else callback(results, this.provider_name);
};



var $1e2962da13e7eb14$exports = {};

$1e2962da13e7eb14$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "22.0838bc34.png";


function $fba68780e414891c$export$58eea71fd8a3f3eb() {
    this.provider_name = "TikTok";
    this.provider_type = "search";
    this.provider_category = "social";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($1e2962da13e7eb14$exports)));
    this.active = false;
    this.description = "Paste a link to a TikTok video.";
}
var $fba68780e414891c$var$matcher = [
    {
        pattern: /^https:\/\/www\.tiktok\.com/,
        url: "https://www.tiktok.com/oembed?url=#{url}"
    }
];
$fba68780e414891c$export$58eea71fd8a3f3eb.prototype.videoLookUp = function(url, callback) {
    var matched = false;
    for(var i = 0; i < $fba68780e414891c$var$matcher.length; i++)if (url.match($fba68780e414891c$var$matcher[i].pattern)) {
        matched = true;
        if (callback) (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON($fba68780e414891c$var$matcher[i].url.replace("#{url}", url), null, null, "omit").then((function(vid) {
            if (vid.html) {
                var info = {};
                info.id = url;
                info.provider = this.provider_name;
                info.title = vid.title || "<untitled>";
                info.publisher = vid.author_name;
                info.publisherID = null;
                info.desc = "";
                info.price = "";
                info.thumb = vid.thumbnail_url;
                info.cc = false;
                info.duration = 0;
                info.explicit = false;
                callback([
                    info
                ], this.provider_name);
            } else callback([], this.provider_name);
        }).bind(this)).catch((function() {
            callback([], this.provider_name);
        }).bind(this));
        break;
    }
    return matched;
};
//Search for video through facebook API
$fba68780e414891c$export$58eea71fd8a3f3eb.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};



let $69b0656a3519758c$export$3552a04808364507 = function() {
    let exp = {}, uniqueCB = 0;
    exp.fetchJSONP = function(url, callback) {};
    return exp;
}();


var $0549774cc623659c$exports = {};

$0549774cc623659c$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "20.948bb4f4.png";


function $63125c4b32d8b55b$export$bb25e9cdd978ff27() {
    this.provider_name = "Podcasts";
    this.provider_type = "search";
    this.provider_category = "music";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($0549774cc623659c$exports)));
    this.description = "Search or Paste a link to a podcast's website (e.g. Apple Podcasts) or RSS feed.";
    this.active = false;
    this.defaultSearch = "";
    this.saveSearch = false;
}
//Lookup video info through youtube API
$63125c4b32d8b55b$export$bb25e9cdd978ff27.prototype.videoLookUp = function(url, callback, active) {
    var results = [], clip;
    var matches = url.match(/^https?:\/\/podcasts\.apple\.com\/.+id(\d+)/);
    var getRSS = (function(url) {
        (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://search.w2g.tv/badger_api/api/podcasts/feed?url=" + url).then((function(v) {
            var pc_image = "https://static.w2g.tv/static/providers/20.png";
            if (v.image && v.image.url) pc_image = v.image.url;
            else if (v.itunes && v.itunes.image) pc_image = v.itunes.image;
            v.items.forEach((function(track) {
                try {
                    clip = {};
                    clip.thumb = pc_image;
                    clip.id = track.enclosure.url;
                    clip.provider = this.provider_name;
                    clip.title = track.title;
                    clip.publisher = v.title;
                    clip.publisherID = null;
                    clip.desc = "";
                    clip.price = "";
                    clip.duration = 0;
                    clip.cc = false;
                    clip.explicit = false;
                    results.push(clip);
                } catch (e) {
                    console.log("Can not add track");
                }
            }).bind(this));
            callback(results, this.provider_name);
        }).bind(this)).catch((function() {
            callback([], this.provider_name);
        }).bind(this));
    }).bind(this);
    if (matches && matches.length === 2) {
        if (callback) (0, $69b0656a3519758c$export$3552a04808364507).fetchJSONP("https://itunes.apple.com/lookup?id=" + matches[1] + "&entity=podcast", function(data) {
            if (data && data.results) getRSS(data.results[0].feedUrl);
            else callback([], this.provider_name);
        });
        return true;
    } else if (active) {
        if (callback) getRSS(url);
        return true;
    } else return false;
};
$63125c4b32d8b55b$export$bb25e9cdd978ff27.prototype.search = function(term, count, page, callback) {
    let results = [], clip;
    (0, $69b0656a3519758c$export$3552a04808364507).fetchJSONP("https://itunes.apple.com/search?term=" + term + "&media=podcast", (function(data) {
        data.results.forEach((function(p) {
            clip = {};
            clip.id = p.collectionViewUrl;
            clip.provider = this.provider_name;
            clip.title = p.collectionName;
            clip.publisher = p.artistName;
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = p.artworkUrl600;
            clip.collection = true;
            results.push(clip);
        }).bind(this));
        callback(results, this.provider_name);
    }).bind(this));
};


var $b0d69c166e56c6b6$exports = {};

$b0d69c166e56c6b6$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "32.66d022f4.png";



function $13d2111e9eddde5c$export$434a5ddd5963e0bf() {
    this.provider_name = "WebRadio";
    this.provider_type = "search";
    this.provider_category = "music";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($b0d69c166e56c6b6$exports)));
    this.active = false;
    this.description = "Search for a station - powered by radio-browser.info";
    this.defaultSearch = "music";
    this.saveSearch = false;
}
//Lookup video info through youtube API
$13d2111e9eddde5c$export$434a5ddd5963e0bf.prototype.videoLookUp = function(url, callback) {
    let match = url.match(/^w2g-podcast:\/\/({.+})$/);
    if (match && match.length === 2) try {
        let station = JSON.parse(match[1]);
        if (station.type === "radio") {
            if (callback) callback([
                {
                    id: url,
                    provider: this.provider_name,
                    title: station.name,
                    thumb: "https://static.w2g.tv/static/providers/32.png"
                }
            ], this.provider_name);
            return true;
        } else return false;
    } catch  {
        return false;
    }
    else return false;
};
$13d2111e9eddde5c$export$434a5ddd5963e0bf.prototype.search = function(term, count, page, callback) {
    let results = [];
    (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://de1.api.radio-browser.info/json/stations/search?limit=10&name=" + term + "&hidebroken=true&order=clickcount&reverse=true", null, null, "omit").then((function(res) {
        res.forEach((function(s) {
            results.push({
                id: "w2g-podcast://" + JSON.stringify({
                    type: "radio",
                    title: s.name,
                    thumb: null,
                    url: s.stationuuid
                }),
                provider: this.provider_name,
                title: s.name,
                publisher: null,
                publisherID: null,
                desc: "",
                thumb: "https://static.w2g.tv/static/providers/32.png"
            });
        }).bind(this));
        callback(results, this.provider_name);
    }).bind(this)).catch(function() {
        callback([]);
    });
};



var $71c64caf9cf5ef17$exports = {};

$71c64caf9cf5ef17$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "19.4c018825.png";


function $040b1dd952dadb09$export$d2cfd51ed9102e48() {
    this.provider_name = "w2gshorts";
    this.provider_type = "browse";
    this.provider_category = "video";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($71c64caf9cf5ef17$exports)));
    this.description = "Select one of the videos bellow.";
    this.active = false;
    this.__videoDB = null;
}
$040b1dd952dadb09$export$d2cfd51ed9102e48.prototype.videoLookUp = function(url, callback) {
    var matches = url.match(/^https:\/\/w2gshorts.com\/view\.html\?id=([0-9a-z]+)$/), results = [];
    if (matches && matches.length === 2) {
        if (callback) {
            this.__videoDB = this.__videoDB || (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://w2gshorts.com/content.json", null, null, "omit");
            this.__videoDB.then((function(videos) {
                var video = videos.find(function(v) {
                    return v.id === matches[1];
                }), clip;
                clip = {};
                clip.id = url;
                clip.provider = this.provider_name;
                clip.title = video.title;
                clip.publisher = video.attribution;
                clip.publisherID = null;
                clip.desc = video.desc;
                clip.price = "";
                clip.thumb = video.thumb;
                results.push(clip);
                callback(results, "W2gShorts");
            }).bind(this));
        }
        return true;
    } else return false;
};
$040b1dd952dadb09$export$d2cfd51ed9102e48.prototype.search = function(term, count, page, callback, safe) {
    this.__videoDB = this.__videoDB || (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://w2gshorts.com/content.json", null, null, "omit");
    var results = [], clip;
    this.__videoDB.then((function(videos) {
        videos.forEach((function(video) {
            clip = {};
            clip.id = "https://w2gshorts.com/view.html?id=" + video.id;
            clip.provider = this.provider_name;
            clip.title = video.title;
            clip.publisher = video.attribution;
            clip.publisherID = null;
            clip.desc = video.desc;
            clip.price = "";
            clip.thumb = video.thumb;
            results.push(clip);
        }).bind(this));
        callback(results, "W2gShorts");
    }).bind(this));
};


var $469aeb52fdbce8db$exports = {};

$469aeb52fdbce8db$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "37.86c31928.png";


function $efd6a42c7556957f$export$bdd072205470aa30() {
    this.provider_name = "suno.ai";
    this.provider_type = "search";
    this.provider_category = "music";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($469aeb52fdbce8db$exports)));
    this.description = "Paste a link to a suno.ai song";
    this.active = false;
    this.defaultSearch = "";
    this.saveSearch = false;
}
//Lookup video info through youtube API
$efd6a42c7556957f$export$bdd072205470aa30.prototype.videoLookUp = function(url, callback) {
    var clip, match = url.match(/^https:\/\/(?:app.)?suno.(?:ai|com)\/song\/([a-zA-Z0-9-_]+)/);
    if (match && match.length === 2) {
        if (callback) {
            clip = {};
            clip.id = "https://cdn1.suno.ai/" + match[1] + ".mp4";
            clip.provider = this.provider_name;
            clip.title = "Suno AI Song";
            clip.publisher = "--";
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = "https://static.w2g.tv/static/providers/37.png";
            clip.duration = 0;
            clip.cc = false;
            clip.explicit = false;
            callback([
                clip
            ], "suno");
        }
        return true;
    } else return false;
};
$efd6a42c7556957f$export$bdd072205470aa30.prototype.search = function(term, count, page, callback) {
    callback([], "instagram");
};



var $490b568924bdf382$exports = {};

$490b568924bdf382$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "38.f4bdfac0.png";


function $6775eeb849158261$export$23e698e805be245() {
    this.provider_name = "udio";
    this.provider_type = "search";
    this.provider_category = "music";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($490b568924bdf382$exports)));
    this.description = "Paste a link to an Udio song.";
    this.active = false;
    this.defaultSearch = "";
}
//Lookup video info through youtube API
$6775eeb849158261$export$23e698e805be245.prototype.videoLookUp = function(url, callback) {
    if (url.match(/^https:\/\/(?:www\.)?udio.com/)) {
        if (callback) {
            var matches = url.match(/^https:\/\/(?:www\.)?udio.com\/songs\/([a-zA-Z0-9-_]+)/);
            if (matches && matches.length >= 2) (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://search.w2g.tv/badger_api/api/udio/lookup?id=" + matches[1]).then((function(v) {
                var clip = {};
                clip.id = v.url;
                clip.provider = this.provider_name;
                clip.title = v.title;
                clip.publisher = "on Udio";
                clip.publisherID = null;
                clip.desc = "";
                clip.price = "";
                clip.thumb = v.imgurl;
                clip.duration = 0;
                clip.cc = false;
                clip.explicit = false;
                callback([
                    clip
                ], this.provider_name);
            }).bind(this));
            else callback([], this.provider_name);
        }
        return true;
    } else return false;
};
$6775eeb849158261$export$23e698e805be245.prototype.search = function(term, count, page, callback, safe) {
    callback([], this.provider_name);
};


var $a5d681a04333f6e4$exports = {};

$a5d681a04333f6e4$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "12.ab3da155.png";


function $5724ad24deeb1542$export$857ea07025344c2f() {
    this.provider_name = "instagram";
    this.provider_type = "search";
    this.provider_category = "social";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($a5d681a04333f6e4$exports)));
    this.description = "Paste a link to an Instagram post or IGTV video";
    this.active = false;
    this.defaultSearch = "new";
    this.saveSearch = false;
}
//Lookup video info through youtube API
$5724ad24deeb1542$export$857ea07025344c2f.prototype.videoLookUp = function(url, callback) {
    var clip;
    if (url.match(/^https?:\/\/www.instagram.com\/(p|tv)\/\S+$/)) {
        if (callback) {
            clip = {};
            clip.id = url;
            clip.provider = this.provider_name;
            clip.title = "Instagram Post";
            clip.publisher = "--";
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = "https://static.w2g.tv/static/providers/12.png";
            clip.duration = 0;
            clip.cc = false;
            clip.explicit = false;
            callback([
                clip
            ], "instagram");
        }
        return true;
    } else return false;
};
$5724ad24deeb1542$export$857ea07025344c2f.prototype.search = function(term, count, page, callback) {
    callback([], "instagram");
};



var $21492be2cf8f980e$exports = {};

$21492be2cf8f980e$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "14.530ac3a6.png";


function $c8793553521c038c$export$796d2330467dfe7f() {
    this.provider_name = "X";
    this.provider_type = "search";
    this.provider_category = "social";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($21492be2cf8f980e$exports)));
    this.description = "Search OR Paste a link to a Tweet";
    this.active = false;
    this.defaultSearch = "new";
    this.saveSearch = false;
}
//Lookup video info through youtube API
$c8793553521c038c$export$796d2330467dfe7f.prototype.videoLookUp = function(url, callback) {
    var clip;
    var matches = url.match(/^https?:\/\/(mobile\.)?twitter\.com.+status(es)?\/([0-9]+)/);
    if (matches && matches.length === 4) {
        if (callback) {
            clip = {};
            clip.id = url;
            clip.provider = this.provider_name;
            clip.title = "Twitter Post";
            clip.publisher = "--";
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = "https://static.w2g.tv/static/providers/14.png";
            clip.duration = 0;
            clip.cc = false;
            clip.explicit = false;
            callback([
                clip
            ], this.provider_name);
        }
        return true;
    } else return false;
};
$c8793553521c038c$export$796d2330467dfe7f.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};



var $ee2f2e59679e9329$exports = {};

$ee2f2e59679e9329$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "36.f5f10f7d.png";


var $d89b5d1faa7b7649$exports = {};
(function(global, factory) {
    $d89b5d1faa7b7649$exports = factory();
})($d89b5d1faa7b7649$exports, function() {
    "use strict";
    /* eslint-disable no-var */ function assign(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source)target[key] = source[key];
        }
        return target;
    }
    /* eslint-enable no-var */ /* eslint-disable no-var */ var defaultConverter = {
        read: function(value) {
            if (value[0] === '"') value = value.slice(1, -1);
            return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
        },
        write: function(value) {
            return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
        }
    };
    /* eslint-enable no-var */ /* eslint-disable no-var */ function init(converter, defaultAttributes) {
        function set(name, value, attributes) {
            if (typeof document === "undefined") return;
            attributes = assign({}, defaultAttributes, attributes);
            if (typeof attributes.expires === "number") attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
            if (attributes.expires) attributes.expires = attributes.expires.toUTCString();
            name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
            var stringifiedAttributes = "";
            for(var attributeName in attributes){
                if (!attributes[attributeName]) continue;
                stringifiedAttributes += "; " + attributeName;
                if (attributes[attributeName] === true) continue;
                // Considers RFC 6265 section 5.2:
                // ...
                // 3.  If the remaining unparsed-attributes contains a %x3B (";")
                //     character:
                // Consume the characters of the unparsed-attributes up to,
                // not including, the first %x3B (";") character.
                // ...
                stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
            }
            return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
        }
        function get(name) {
            if (typeof document === "undefined" || arguments.length && !name) return;
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all.
            var cookies = document.cookie ? document.cookie.split("; ") : [];
            var jar = {};
            for(var i = 0; i < cookies.length; i++){
                var parts = cookies[i].split("=");
                var value = parts.slice(1).join("=");
                try {
                    var found = decodeURIComponent(parts[0]);
                    jar[found] = converter.read(value, found);
                    if (name === found) break;
                } catch (e) {}
            }
            return name ? jar[name] : jar;
        }
        return Object.create({
            set: set,
            get: get,
            remove: function(name, attributes) {
                set(name, "", assign({}, attributes, {
                    expires: -1
                }));
            },
            withAttributes: function(attributes) {
                return init(this.converter, assign({}, this.attributes, attributes));
            },
            withConverter: function(converter) {
                return init(assign({}, this.converter, converter), this.attributes);
            }
        }, {
            attributes: {
                value: Object.freeze(defaultAttributes)
            },
            converter: {
                value: Object.freeze(converter)
            }
        });
    }
    var api = init(defaultConverter, {
        path: "/"
    });
    /* eslint-enable no-var */ return api;
});



let $3c7827e5ea49fc2d$var$path_lang = window.location.pathname.match(/^\/([a-z]{2})(?:\/\S*$|$)/);
if ($3c7827e5ea49fc2d$var$path_lang) (0, (/*@__PURE__*/$parcel$interopDefault($d89b5d1faa7b7649$exports))).set("w2glang", $3c7827e5ea49fc2d$var$path_lang[1], {
    secure: true,
    domain: "w2g.tv",
    expires: 365
});
(0, $590857b73185edda$export$3303a5adb06a24b3).domReady().then(function() {
    let menu = document.querySelector(".w2g-lang-menu");
    if (menu) menu.addEventListener("click", function(e) {
        let lang = e.target.getAttribute("data-lang").trim();
        if ($3c7827e5ea49fc2d$var$path_lang) {
            let reg = new RegExp("^/" + $3c7827e5ea49fc2d$var$path_lang[1]);
            window.location.pathname = window.location.pathname.replace(reg, lang);
        } else window.location.pathname = lang + "/" + window.location.pathname;
    });
});
let $3c7827e5ea49fc2d$export$73f5831f807b611a = {
    lang: document.querySelector("html").getAttribute("lang") || "en"
};


const $b3b17e556f1a267f$var$api_key = "AIzaSyD-kultuvoouaAk991jalLA5dTOwvBxm-M";
function $b3b17e556f1a267f$export$38d37d5579b36860() {
    this.provider_name = "tenor";
    this.provider_type = "search";
    this.provider_category = "fun";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($ee2f2e59679e9329$exports)));
    this.description = "Search or paste a link to Tenor gif";
    this.active = false;
    this.defaultSearch = "funny";
    this.saveSearch = false;
}
$b3b17e556f1a267f$export$38d37d5579b36860.prototype.videoLookUp = function(url, callback) {
    var matches = url.match(/^https:\/\/tenor\.com\/view\/\S+?([0-9]+)$/);
    if (matches && matches.length === 2) {
        if (callback) {
            var results = [], clip;
            (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://tenor.googleapis.com/v2/posts?ids=" + matches[1] + "&key=" + $b3b17e556f1a267f$var$api_key, null, null, "omit").then((function(data) {
                data.results.forEach((function(v) {
                    clip = {};
                    clip.id = v.media_formats.mp4.url;
                    clip.provider = this.provider_name;
                    clip.title = v.content_description;
                    clip.publisher = "Powered By Tenor";
                    clip.publisherID = null;
                    clip.date = "";
                    clip.desc = "";
                    clip.price = "";
                    clip.thumb = v.media_formats.nanogif.url;
                    results.push(clip);
                }).bind(this));
                callback(results, this.provider_name);
            }).bind(this));
        }
        return true;
    } else return false;
};
$b3b17e556f1a267f$export$38d37d5579b36860.prototype.search = function(term, count, page, callback) {
    let url;
    if (term) url = "https://tenor.googleapis.com/v2/search?q=" + term + "&key=" + $b3b17e556f1a267f$var$api_key;
    else url = "https://tenor.googleapis.com/v2/featured?key=" + $b3b17e556f1a267f$var$api_key;
    (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON(url, null, null, "omit").then((function(data) {
        var results = [], clip;
        data.results.forEach((function(v) {
            clip = {};
            clip.id = v.media_formats.mp4.url;
            clip.provider = this.provider_name;
            clip.title = v.content_description;
            clip.publisher = "Powered By Tenor";
            clip.publisherID = null;
            clip.date = "";
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.media_formats.nanogif.url;
            results.push(clip);
        }).bind(this));
        callback(results, this.provider_name);
    }).bind(this)).catch((function() {
        callback([], this.provider_name);
    }).bind(this));
};
$b3b17e556f1a267f$export$38d37d5579b36860.prototype.getSearchSuggestion = function(term, callback) {
    (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://tenor.googleapis.com/v2/autocomplete?q=" + term + "&locale=" + (0, $3c7827e5ea49fc2d$export$73f5831f807b611a).lang + "&key=" + $b3b17e556f1a267f$var$api_key, null, null, "omit").then(function(data) {
        callback(data.results);
    });
};



var $93b46593b3e277e5$exports = {};

$93b46593b3e277e5$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "13.6949acb8.png";


function $060b90e6ec076e38$export$2431eb0fb21839a3() {
    this.provider_name = "pinterest";
    this.provider_type = "search";
    this.provider_category = "social";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($93b46593b3e277e5$exports)));
    this.description = "Paste a link to a Pinterest pin";
    this.active = false;
    this.defaultSearch = "new";
    this.saveSearch = false;
}
//Lookup video info through youtube API
$060b90e6ec076e38$export$2431eb0fb21839a3.prototype.videoLookUp = function(url, callback) {
    var id, clip;
    if (url.match(/^https?:\/\/www.pinterest.[a-z.]{2,6}\/pin\/\S+$/)) {
        if (callback) (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://search.w2g.tv/badger_api/api/pt/lookup?q=" + url).then((function(v) {
            clip = {};
            clip.id = url;
            clip.provider = this.provider_name;
            clip.title = v.title;
            clip.publisher = "";
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.imgurl;
            clip.duration = 0;
            clip.cc = false;
            clip.explicit = false;
            callback([
                clip
            ], "pinterest");
        }).bind(this)).catch((function() {
            callback([], "pinterest");
        }).bind(this));
        return true;
    } else return false;
};
$060b90e6ec076e38$export$2431eb0fb21839a3.prototype.search = function(term, count, page, callback) {
    callback([], "pinterest");
};



var $1ab5c1edd45e5716$exports = {};

$1ab5c1edd45e5716$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "11.805dd8a6.png";


function $71ea214b8a1d1dd9$export$35769765469f8c57() {
    this.provider_name = "coub";
    this.provider_type = "search";
    this.provider_category = "fun";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($1ab5c1edd45e5716$exports)));
    this.description = "Search OR Paste a link to a Coub video";
    this.active = false;
    this.defaultSearch = "new";
    this.saveSearch = false;
}
//Lookup video info through youtube API
$71ea214b8a1d1dd9$export$35769765469f8c57.prototype.videoLookUp = function(url, callback) {
    var id, clip, v, parser;
    parser = document.createElement("a");
    parser.href = url;
    if (parser.host.indexOf("coub") === 0) {
        if (callback) {
            id = url.split("/").pop();
            (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://europe-west1-divine-course-232115.cloudfunctions.net/coubLookup?id=" + id, null, null, "omit").then((function(v) {
                clip = {};
                clip.id = "https://coub.com/view/" + v.permalink;
                clip.provider = this.provider_name;
                clip.title = v.title;
                clip.publisher = v.channel.title;
                clip.publisherID = null;
                clip.desc = "";
                clip.price = "";
                clip.thumb = v.picture;
                clip.duration = 0;
                clip.cc = false;
                clip.explicit = false;
                callback([
                    clip
                ], "coub");
            }).bind(this));
        }
        return true;
    } else return false;
};
$71ea214b8a1d1dd9$export$35769765469f8c57.prototype.search = function(term, count, page, callback) {
    function parseResponse(data) {
        var results = [], clip;
        data.coubs.forEach((function(v, i) {
            clip = {};
            clip.id = "https://coub.com/view/" + v.permalink;
            clip.provider = this.provider_name;
            clip.title = v.title;
            clip.publisher = v.channel.title;
            clip.publisherID = null;
            clip.date = new Date(v.created_at).toDateString();
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.picture;
            results.push(clip);
        }).bind(this));
        callback(results, "coub");
    }
    if (term !== "") (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://europe-west1-divine-course-232115.cloudfunctions.net/coubSearch?q=" + encodeURIComponent(term) + "&page=" + page, null, null, "omit").then(parseResponse.bind(this));
    else (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://europe-west1-divine-course-232115.cloudfunctions.net/coubSearch?q=funny&page=" + page, null, null, "omit").then(parseResponse.bind(this));
};


var $99d51b78692103a3$exports = {};

$99d51b78692103a3$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "3.05e2000b.png";


function $943838c501182f20$export$9c52af64bfff05e0() {
    this.provider_name = "dailymotion";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($99d51b78692103a3$exports)));
    this.description = "Search OR Paste a link to a Dailymotion video";
    this.active = false;
    this.defaultSearch = "music covers";
    this.saveSearch = false;
}
//Lookup video info through youtube API
$943838c501182f20$export$9c52af64bfff05e0.prototype.videoLookUp = function(url, callback) {
    var id, clip, matches = url.match(/^https?:\/\/(dai\.ly|www\.dailymotion\.com\/video)\/([0-9a-z]+)/);
    if (matches && matches.length === 3) {
        if (callback) {
            id = matches[2];
            fetch("https://api.dailymotion.com/video/" + id + "?fields=description,duration,explicit,owner.username,thumbnail_360_url,title,url").then((function(data) {
                data.json().then((function(v) {
                    clip = {};
                    clip.id = v.url;
                    clip.provider = this.provider_name;
                    clip.title = v.title;
                    clip.publisher = v["owner.username"];
                    clip.publisherID = v["owner.id"];
                    clip.desc = v.description;
                    clip.price = "";
                    clip.thumb = v.thumbnail_360_url;
                    clip.duration = v.duration;
                    clip.cc = false;
                    clip.explicit = v.explicit;
                    callback([
                        clip
                    ], "dailymotion");
                }).bind(this));
            }).bind(this)).catch(function() {
                callback([], "dailymotion");
            });
        }
        return true;
    } else return false;
};
$943838c501182f20$export$9c52af64bfff05e0.prototype.search = function(term, count, page, callback) {
    term = term || this.defaultSearch;
    var safe = this.saveSearch;
    var results = [], clip, safesearch = safe === true ? "1" : "0";
    function parseResponse(data) {
        data.list.forEach((function(v, i) {
            clip = {};
            clip.id = v.url;
            clip.provider = this.provider_name;
            clip.title = v.title;
            clip.publisher = v["owner.username"];
            clip.publisherID = v["owner.id"];
            clip.date = new Date(v.created_time * 1000).toDateString();
            clip.desc = v.description;
            clip.price = "";
            clip.thumb = v.thumbnail_240_url;
            results.push(clip);
        }).bind(this));
        callback(results, "dailymotion");
    }
    if (term.indexOf("publisher:") === 0) fetch("https://api.dailymotion.com/videos?owners=" + term.split(":")[1] + "&page=" + page + "&limit=" + count + "&family_filter=" + safesearch + "&sort=recent&fields=description,duration,created_time,owner.username,owner.id,thumbnail_240_url,title,url").then((function(data) {
        data.json().then((function(obj) {
            parseResponse.call(this, obj);
        }).bind(this));
    }).bind(this));
    else fetch("https://api.dailymotion.com/videos?search=" + term + "&page=" + page + "&limit=" + count + "&family_filter=" + safesearch + "&sort=relevance&fields=description,duration,created_time,owner.username,owner.id,thumbnail_240_url,title,url").then((function(data) {
        data.json().then((function(obj) {
            parseResponse.call(this, obj);
        }).bind(this));
    }).bind(this));
};


var $4e0a531f38c3132a$exports = {};

$4e0a531f38c3132a$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "8.b856401a.png";


function $4446571982544a14$export$f905e4269cb919f0() {
    this.provider_name = "facebook";
    this.provider_type = "search";
    this.provider_category = "social";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($4e0a531f38c3132a$exports)));
    this.active = false;
    this.description = "Paste a direkt link to a public video on Facebook. (https://fb.watch/[videoID] or https://www.facebook.com/[user]/videos/[videoID])";
}
$4446571982544a14$export$f905e4269cb919f0.prototype.videoLookUp = function(url, callback) {
    if (url.match(/^(http|https):\/\/\S+\.facebook.com\/\S+\/videos\/\S+$/) || url.match(/^(http|https):\/\/\S+\.facebook.com\/watch\S+$/) || url.match(/^((http|https):)?\/\/fb\.watch\/.+/)) {
        if (callback) {
            var info = {};
            info.id = url;
            info.provider = this.provider_name;
            info.title = "Facebook Video";
            info.publisher = "--";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = "https://static.w2g.tv/static/providers/8.png";
            info.cc = false;
            info.duration = 0;
            info.explicit = false;
            callback([
                info
            ], "facebook");
        }
        return true;
    } else return false;
};
//Search for video through facebook API
$4446571982544a14$export$f905e4269cb919f0.prototype.search = function(term, count, page, callback) {
    callback([], "facebook");
};



var $8ac8c2f06328ad92$exports = {};

$8ac8c2f06328ad92$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "4.a429afec.png";


function $5731e3c4cf274a18$export$cdc89fcd16b3a872() {
    this.provider_name = "soundcloud";
    this.provider_type = "search";
    this.provider_category = "music";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($8ac8c2f06328ad92$exports)));
    this.description = "Paste a link to a single Soundcloud track (no sets).";
    this.active = false;
    this.defaultSearch = "electro";
    this.hostName = "https://" + (window.location.protocol.indexOf("http") === 0 ? window.location.hostname : "w2g.tv");
}
//Lookup video info through youtube API
$5731e3c4cf274a18$export$cdc89fcd16b3a872.prototype.videoLookUp = function(url, callback) {
    if (url.match(/^https:\/\/soundcloud.com/)) {
        if (callback) {
            var matches = url.match(/^https:\/\/soundcloud.com\/([a-z0-9-_]+\/(?!sets)[a-z0-9-_]+)($|\?)/);
            if (matches && matches.length >= 2) (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://search.w2g.tv/badger_api/api/soundcloud/lookup?id=" + matches[1]).then((function(v) {
                var clip = {};
                clip.id = v.url;
                clip.provider = this.provider_name;
                clip.title = v.title;
                clip.publisher = "on Soundcloud";
                clip.publisherID = null;
                clip.desc = "";
                clip.price = "";
                clip.thumb = v.imgurl;
                clip.duration = 0;
                clip.cc = false;
                clip.explicit = false;
                callback([
                    clip
                ], this.provider_name);
            }).bind(this));
            else callback([], this.provider_name);
        }
        return true;
    } else return false;
};
$5731e3c4cf274a18$export$cdc89fcd16b3a872.prototype.search = function(term, count, page, callback, safe) {
    callback([], this.provider_name);
};


var $90666460f12de8ff$exports = {};

$90666460f12de8ff$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "9.21cbda7c.png";


function $3d69efe882dad69e$export$c6575b68444f2092() {
    this.provider_name = "mixcloud";
    this.provider_type = "search";
    this.provider_category = "music";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($90666460f12de8ff$exports)));
    this.description = "Search OR Paste a link to a Mixcloud track";
    this.active = false;
    this.defaultSearch = "funky";
}
//Lookup video info through youtube API
$3d69efe882dad69e$export$c6575b68444f2092.prototype.videoLookUp = function(url, callback) {
    var parser = document.createElement("a");
    parser.href = url;
    if (parser.host.indexOf("www.mixcloud") === 0) {
        if (callback) fetch("https://api.mixcloud.com" + parser.pathname).then((function(d) {
            if (d.ok) d.json().then((function(data) {
                var clip = {};
                clip.id = data.url;
                clip.provider = this.provider_name;
                clip.title = data.name;
                clip.publisher = data.user.name;
                clip.publisherID = data.user.username;
                clip.desc = "";
                clip.price = "";
                clip.thumb = data.pictures.medium;
                clip.duration = data.audio_length;
                clip.cc = false;
                clip.explicit = false;
                callback([
                    clip
                ], "mixcloud");
            }).bind(this));
            else callback([], "mixcloud");
        }).bind(this));
        return true;
    } else return false;
};
$3d69efe882dad69e$export$c6575b68444f2092.prototype.search = function(term, count, page, callback, safe) {
    term = term || this.defaultSearch;
    var results = [], clip;
    function parseResponse(data) {
        data.data.forEach((function(v, i) {
            clip = {};
            clip.id = v.url;
            clip.provider = this.provider_name;
            clip.title = v.name;
            clip.publisher = v.user.name;
            clip.publisherID = v.user.username;
            clip.date = new Date(v.created_time).toDateString();
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.pictures.medium;
            results.push(clip);
        }).bind(this));
        callback(results, "mixcloud");
    }
    var qurl = term.indexOf("publisher:") === 0 ? "https://api.mixcloud.com/" + term.split(":")[1] + "/cloudcasts/?limit=" + count + "&offset=" + count * (page - 1) : "https://api.mixcloud.com/search/?q=" + term + "&type=cloudcast" + "&limit=" + count + "&offset=" + count * (page - 1);
    fetch(qurl).then((function(d) {
        if (d.ok) d.json().then((function(data) {
            parseResponse.call(this, data);
        }).bind(this));
    }).bind(this));
};



var $7d0b74f2c4553cd3$exports = {};

$7d0b74f2c4553cd3$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "15.0e1bebaf.png";


function $f3597e7ece6e98b9$export$e855fe2e1c16f837() {
    this.provider_name = "slides";
    this.provider_type = "search";
    this.provider_category = "other";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($7d0b74f2c4553cd3$exports)));
    this.description = "Paste a link to a slides.com presentation";
    this.active = false;
    this.defaultSearch = "new";
    this.saveSearch = false;
}
//Lookup video info through youtube API
$f3597e7ece6e98b9$export$e855fe2e1c16f837.prototype.videoLookUp = function(url, callback) {
    var clip, matches = url.match(/^https:\/\/([\w-]+\.)?slides.com\/[\w-]+\/[\w-]+/);
    if (matches && matches.length === 2) {
        if (callback) (0, $590857b73185edda$export$3303a5adb06a24b3).getJSON("https://search.w2g.tv/badger_api/api/slides/lookup?q=" + url).then((function(v) {
            clip = {};
            clip.id = v.url;
            clip.provider = this.provider_name;
            clip.title = v.title;
            clip.publisher = matches[1];
            clip.publisherID = null;
            clip.desc = "";
            clip.price = "";
            clip.thumb = v.imgurl;
            clip.duration = 0;
            clip.cc = false;
            clip.explicit = false;
            callback([
                clip
            ], this.provider_name);
        }).bind(this)).catch((function() {
            callback([], this.provider_name);
        }).bind(this));
        return true;
    } else return false;
};
$f3597e7ece6e98b9$export$e855fe2e1c16f837.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};


var $ed4e4f76c1a83aa9$exports = {};

$ed4e4f76c1a83aa9$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "30.2616e0d4.png";


function $1b3cbdb5419d93e4$export$61103e2bbc53da58() {
    this.provider_name = "OSM Map";
    this.provider_type = "browse";
    this.provider_category = "other";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($ed4e4f76c1a83aa9$exports)));
    this.active = false;
    this.description = "Paste a link to OpenStreetMap.";
}
$1b3cbdb5419d93e4$export$61103e2bbc53da58.prototype.videoLookUp = function(url, callback) {
    var res = url.match(/^https:\/\/www.openstreetmap.org\/#map=(\d+)\/(\d+.\d+)\/(\d+.\d+)&layers=([A-Z]+)/);
    if (res && res.length === 5) {
        if (callback) {
            var info = {};
            info.id = res[0];
            info.provider = this.provider_name;
            info.title = "OSM: " + res[2] + "/" + res[3];
            info.publisher = "";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = "https://static.w2g.tv/static/providers/30.png";
            info.cc = false;
            info.duration = 0;
            info.explicit = false;
            callback([
                info
            ], this.provider_name);
        }
        return true;
    } else return false;
};
$1b3cbdb5419d93e4$export$61103e2bbc53da58.prototype.search = function(term, count, page, callback) {
    var results = [];
    var clip = {};
    clip.id = "https://www.openstreetmap.org/#map=5/46.574/10.569&layers=T";
    clip.provider = this.provider_name;
    clip.title = "OpenStreetMap";
    clip.publisher = "";
    clip.publisherID = null;
    clip.desc = "";
    clip.price = "";
    clip.thumb = "https://static.w2g.tv/static/providers/30.png";
    results.push(clip);
    callback(results, this.provider_name);
};


var $833a79775a48b279$exports = {};

$833a79775a48b279$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "31.e70b3b01.png";


function $7789bcac0a76d184$export$99529dc60e7c9edd() {
    this.provider_name = "snipzero";
    this.provider_type = "search";
    this.provider_category = "other";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($833a79775a48b279$exports)));
    this.active = false;
    this.description = "Paste a direkt link to a SnipZero snip.";
}
$7789bcac0a76d184$export$99529dc60e7c9edd.prototype.videoLookUp = function(url, callback) {
    var matches = url.match(/^https:\/\/snipzero\.com\/snip\.html\?s=([a-z0-9-]+)/);
    if (matches && matches.length === 2) {
        if (callback) {
            var info = {};
            info.id = url;
            info.provider = this.provider_name;
            info.title = "SnipZero Snip";
            info.publisher = "--";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = "https://snipzero-data.b-cdn.net/snip/" + matches[1] + ".jpg?width=240&height=240";
            info.cc = false;
            info.duration = 0;
            info.explicit = false;
            callback([
                info
            ], "snipzero");
        }
        return true;
    } else return false;
};
//Search for video through facebook API
$7789bcac0a76d184$export$99529dc60e7c9edd.prototype.search = function(term, count, page, callback) {
    callback([], "snipzero");
};


var $9596e2a335a8abea$exports = {};

$9596e2a335a8abea$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "28.3d98d00b.png";


function $3544f9b6b19838f7$export$75218fd1e7b51fa5() {
    this.provider_name = "Direct Link";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($9596e2a335a8abea$exports)));
    this.active = false;
    this.description = "Paste a direct https link to a video or audio file. (.mp4 .mp3 .flac .aac .wav .webm .ogv .mpd .m3u8 .gifv)";
}
$3544f9b6b19838f7$export$75218fd1e7b51fa5.prototype.videoLookUp = function(url, callback) {
    var res = url.match(/^https?:\/\/[^?]+\.(mp4|mpd|mp3|aac|wav|webm|ogv|m3u8|gifv|flac)(?:$|\?)\S*/i);
    if (res) {
        if (callback) {
            var info = {};
            info.id = url;
            info.provider = this.provider_name;
            info.title = url;
            info.publisher = "";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = "https://static.w2g.tv/static/providers/28.png";
            info.cc = false;
            info.duration = 0;
            info.explicit = false;
            callback([
                info
            ], this.provider_name);
        }
        return true;
    } else return false;
};
//Search for video through facebook API
$3544f9b6b19838f7$export$75218fd1e7b51fa5.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};


var $14cb3854e0a6f5d9$exports = {};

$14cb3854e0a6f5d9$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "23.012c986a.png";


function $64ee17e8fe00b5d2$export$692ec03e3104c9cf() {
    this.provider_name = "webcam";
    this.provider_type = "browse";
    this.provider_category = "screenshare";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($14cb3854e0a6f5d9$exports)));
    this.active = false;
    this.description = "Select one of the active webcams below.";
}
$64ee17e8fe00b5d2$export$692ec03e3104c9cf.prototype.videoLookUp = function(url, callback) {
    if (!callback && url.indexOf("w2gcam://") === 0) return true;
    else return false;
};
//Search for video through facebook API
$64ee17e8fe00b5d2$export$692ec03e3104c9cf.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};


var $c2ce1f674712cddf$exports = {};

$c2ce1f674712cddf$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "24.1ec6ef2c.png";


function $2a2f0b2a9ed5e63a$export$5aef3a5205b4bc8d() {
    this.provider_name = "screenshare";
    this.provider_type = "browse";
    this.provider_category = "screenshare";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($c2ce1f674712cddf$exports)));
    this.active = false;
    this.description = "Select one of the active screenshares below.";
}
$2a2f0b2a9ed5e63a$export$5aef3a5205b4bc8d.prototype.videoLookUp = function(url, callback) {
    if (!callback && url.indexOf("w2gscreen://") === 0) return true;
    else return false;
};
//Search for video through facebook API
$2a2f0b2a9ed5e63a$export$5aef3a5205b4bc8d.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};


var $6fa80bfb7f06f294$exports = {};

$6fa80bfb7f06f294$exports = (parcelRequire("jWw9D")).getBundleURL("cDfGM") + "10.fda3a601.png";


function $7ab7a0db03624419$export$d52f99d95ce526b2() {
    this.provider_name = "W2gSync";
    this.provider_type = "search";
    this.provider_category = "video";
    this.icon_path = (0, (/*@__PURE__*/$parcel$interopDefault($6fa80bfb7f06f294$exports)));
    this.active = false;
    this.lookupFallback = true; // Move to last position for lookup.
    this.description = "Paste a link to any website that contains a video into the searchbar.";
}
$7ab7a0db03624419$export$d52f99d95ce526b2.prototype.videoLookUp = function(url, callback) {
    var res = url.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+'.~#,;!?()&/=]*)$/);
    if (res) {
        if (callback) {
            var info = {};
            info.id = res[0];
            info.provider = this.provider_name;
            info.title = res[0];
            info.publisher = "";
            info.publisherID = null;
            info.desc = "";
            info.price = "";
            info.thumb = "https://static.w2g.tv/static/providers/10.png";
            info.cc = false;
            info.duration = 0;
            info.explicit = false;
            callback([
                info
            ], this.provider_name);
        }
        return true;
    } else return false;
};
//Search for video through facebook API
$7ab7a0db03624419$export$d52f99d95ce526b2.prototype.search = function(term, count, page, callback) {
    callback([], this.provider_name);
};


let $572af7499ec86dbc$export$20fba533b6b230c4 = function(eleClass, extension) {
    let providers = [], activeApp = null, availApps = [], sorted_providers = {}, shouldSuggest = true, sugStop = 0;
    if (extension === true) providers = [
        (0, $68c5577c31e848e7$export$f48bef9e899079a1),
        (0, $0c747c96df1f36e0$export$d46535fcadedfffe),
        (0, $f269366c5b08b346$export$4b0d605e164b1aa1),
        (0, $e52bc9822bb7d675$export$9d14414b7139814a),
        (0, $a075bba626ef7cc3$export$a1d14d0cbe839f78),
        (0, $fba68780e414891c$export$58eea71fd8a3f3eb),
        (0, $13d2111e9eddde5c$export$434a5ddd5963e0bf),
        (0, $6775eeb849158261$export$23e698e805be245),
        (0, $efd6a42c7556957f$export$bdd072205470aa30),
        (0, $040b1dd952dadb09$export$d2cfd51ed9102e48),
        (0, $5724ad24deeb1542$export$857ea07025344c2f),
        (0, $c8793553521c038c$export$796d2330467dfe7f),
        (0, $b3b17e556f1a267f$export$38d37d5579b36860),
        (0, $060b90e6ec076e38$export$2431eb0fb21839a3),
        (0, $71ea214b8a1d1dd9$export$35769765469f8c57),
        (0, $943838c501182f20$export$9c52af64bfff05e0),
        (0, $4446571982544a14$export$f905e4269cb919f0),
        (0, $5731e3c4cf274a18$export$cdc89fcd16b3a872),
        (0, $3d69efe882dad69e$export$c6575b68444f2092),
        (0, $f3597e7ece6e98b9$export$e855fe2e1c16f837),
        (0, $1b3cbdb5419d93e4$export$61103e2bbc53da58),
        (0, $7789bcac0a76d184$export$99529dc60e7c9edd),
        (0, $3544f9b6b19838f7$export$75218fd1e7b51fa5),
        (0, $7ab7a0db03624419$export$d52f99d95ce526b2)
    ];
    else providers = [
        (0, $68c5577c31e848e7$export$f48bef9e899079a1),
        (0, $67716c025aa11ef0$export$75a501519d5876d0),
        (0, $64ee17e8fe00b5d2$export$692ec03e3104c9cf),
        (0, $2a2f0b2a9ed5e63a$export$5aef3a5205b4bc8d),
        (0, $f269366c5b08b346$export$4b0d605e164b1aa1),
        (0, $0c747c96df1f36e0$export$d46535fcadedfffe),
        (0, $e52bc9822bb7d675$export$9d14414b7139814a),
        (0, $a075bba626ef7cc3$export$a1d14d0cbe839f78),
        (0, $fba68780e414891c$export$58eea71fd8a3f3eb),
        (0, $13d2111e9eddde5c$export$434a5ddd5963e0bf),
        (0, $6775eeb849158261$export$23e698e805be245),
        (0, $efd6a42c7556957f$export$bdd072205470aa30),
        (0, $63125c4b32d8b55b$export$bb25e9cdd978ff27),
        (0, $040b1dd952dadb09$export$d2cfd51ed9102e48),
        (0, $5724ad24deeb1542$export$857ea07025344c2f),
        (0, $c8793553521c038c$export$796d2330467dfe7f),
        (0, $b3b17e556f1a267f$export$38d37d5579b36860),
        (0, $060b90e6ec076e38$export$2431eb0fb21839a3),
        (0, $71ea214b8a1d1dd9$export$35769765469f8c57),
        (0, $943838c501182f20$export$9c52af64bfff05e0),
        (0, $4446571982544a14$export$f905e4269cb919f0),
        (0, $5731e3c4cf274a18$export$cdc89fcd16b3a872),
        (0, $3d69efe882dad69e$export$c6575b68444f2092),
        (0, $f3597e7ece6e98b9$export$e855fe2e1c16f837),
        (0, $1b3cbdb5419d93e4$export$61103e2bbc53da58),
        (0, $7789bcac0a76d184$export$99529dc60e7c9edd),
        (0, $3544f9b6b19838f7$export$75218fd1e7b51fa5),
        (0, $7ab7a0db03624419$export$d52f99d95ce526b2)
    ];
    var appsObj = {
        activeDescription: "Search OR paste a link to any site",
        activeLogo: "",
        activeName: "",
        sortedApps: [],
        showApps: false,
        showAppsNote: true,
        auth: false,
        searchTerm: "",
        searchPage: 1,
        searchResults: [],
        searchResults_1: [],
        searchResults_2: [],
        showResults: false,
        itemsFound: false,
        canSearch: true,
        __searchInput: document.createElement("input"),
        __playGoInput: document.createElement("input"),
        canImport: false,
        importRunning: false,
        showPlayAndGo: false,
        importDone: false,
        searching: false,
        blockAddAll: false,
        canLoadMore: false,
        searchSuggestions: [],
        searchRendered: function() {},
        inputFocus: function() {},
        searchInitiated: function() {},
        click: function(val, app) {
            this.searchTerm = "";
            this.searchSuggestions = [];
            this.canLoadMore = false;
            this.activateMenu(app);
            if (app.provider_type === "browse") this.searchSubmitTopbar(true);
            if (this.__searchInput && (0, $590857b73185edda$export$3303a5adb06a24b3).isMobile === false) this.__searchInput.focus();
        },
        dblclick: function(val, app) {
            this.searchTerm = "";
            this.searchSuggestions = [];
            this.canLoadMore = false;
            this.activateMenu(app);
            this.showApps = false;
            this.searchSubmitTopbar();
        },
        imgLoadError: function(ele, app, evt) {
            evt.target.naturalWidth === 120 && evt.target.naturalHeight === 90 && app.id.indexOf("//www.youtube.com");
        },
        activateMenu: function(app) {
            this.showAppsNote = false;
            this.activeDescription = app.description || "Search OR paste a link to any site";
            this.activeLogo = app.icon_path || "";
            this.activeName = app.provider_name || "";
            app.active = true;
            if (activeApp !== app) {
                activeApp.active = false;
                activeApp = app;
            }
            setTimeout((function() {
                this.showAppsNote = true;
            }).bind(this), 0);
            this.searchSuggestions = [];
        },
        activateApp: function(name) {
            let app = availApps.find((ele)=>ele.provider_name === name);
            if (app) this.activateMenu(app);
        },
        playAndGoSubmit: function() {
            this.lookup(this.searchTerm.trim(), (function(vid, provider) {
                if (vid.length > 0) {
                    this.play(null, vid[0]);
                    this.showPlayAndGo = false;
                }
                this.searchTerm = "";
            }).bind(this));
        },
        searchSubmitTopbar: function(close) {
            this.searchSubmit(close);
        },
        searchSubmit: function(close) {
            shouldSuggest = false;
            this.canImport = false;
            this.importDone = false;
            this.importRunning = false;
            this.searchResults = [];
            this.searchSuggestions = [];
            this.searchResults_1 = [];
            this.searchResults_2 = [];
            this.searchPage = 1;
            this.itemsFound = true;
            this.showApps = typeof close === "undefined" ? false : !close;
            this.showResults = true;
            this.canLoadMore = false;
            if (this.searchTerm.trim().indexOf("http") === 0) this.submitLookup();
            else this.search();
            this.searchInitiated();
        },
        search: function() {
            this.searching = true;
            var term = this.searchTerm.indexOf("publisher:") === 0 ? this.searchTerm : encodeURIComponent(this.searchTerm);
            activeApp.search(term, 10, this.searchPage, (function(data) {
                this.setResults(data);
                if (this.__searchInput && (0, $590857b73185edda$export$3303a5adb06a24b3).isMobile === true) this.__searchInput.blur();
                this.searchRendered();
            }).bind(this));
        },
        setResults: function(data) {
            _loadResults(data);
            this.itemsFound = data.length > 0;
            this.canLoadMore = data.length >= 10 && activeApp.provider_name !== "youtube";
        },
        submitLookup: function() {
            this.searching = true;
            this.canImport = false;
            this.importDone = false;
            this.importRunning = false;
            this.lookup(this.searchTerm.trim(), (function(vid, provider) {
                this.itemsFound = vid.length > 0;
                _loadResults(vid);
                if (vid.length > 0) {
                    this.activateMenu(provider);
                    if (vid.length > 1) this.canImport = true;
                    this.searchRendered();
                }
            }).bind(this));
        },
        inputPaste: function() {
            setTimeout((function() {
                if (this.searchTerm.indexOf("http") === 0) this.searchSubmitTopbar();
            }).bind(this), 1);
        },
        handleSuggestions: function(obj, para, evt) {
            if (evt.keyCode === 38 || evt.keyCode === 40) {
                evt.preventDefault();
                if (this.searchSuggestions.length > 0) {
                    let ele = this.searchSuggestions.findIndex((ele)=>ele.a === true);
                    if (ele >= 0) this.searchSuggestions[ele].a = false;
                    ele = evt.keyCode === 38 ? ele - 1 : ele + 1;
                    ele = ele < 0 ? this.searchSuggestions.length - 1 : ele;
                    ele = ele > this.searchSuggestions.length - 1 ? 0 : ele;
                    this.searchSuggestions[ele].a = true;
                    this.searchTerm = this.searchSuggestions[ele].t;
                }
            }
        },
        setSuggestion: function(obj, ele) {
            this.searchTerm = ele.t;
            this.searchSubmitTopbar();
        },
        fetchSuggestions: function() {
            shouldSuggest = true;
            if (this.searchTerm.trim().indexOf("http") !== 0 && this.searchTerm.length >= 3 && (sugStop === 0 || this.searchTerm.length <= sugStop) && activeApp && typeof activeApp.getSearchSuggestion !== "undefined") activeApp.getSearchSuggestion(this.searchTerm, (function(res) {
                if (shouldSuggest === true) {
                    if (res.length === 0 && this.searchTerm > 3) sugStop = this.searchTerm.length;
                    else sugStop = 0;
                    res = res.slice(0, 10);
                    let data = [];
                    res.forEach(function(ele) {
                        data.push({
                            t: ele,
                            a: false
                        });
                    });
                    if (this.searchTerm.length >= 3) this.searchSuggestions = data;
                }
            }).bind(this));
            else if (this.searchTerm.length === 0) this.searchSuggestions = [];
        },
        lookupAndRender: function(url) {
            this.searchSuggestions = [];
            this.searching = true;
            this.showResults = true;
            this.canImport = false;
            this.importDone = false;
            this.importRunning = false;
            this.lookup(url.trim(), (function(vid, provider) {
                this.itemsFound = vid.length > 0;
                _loadResults(vid);
            }).bind(this));
        },
        lookup: function(url, cb) {
            var result, i, success = false;
            for(i = 0; i < availApps.length; i++)try {
                result = availApps[i].videoLookUp(url, function(p) {
                    return function(vid, prov) {
                        if (vid[0]) vid[0].provider_icon = p.icon_path;
                        cb(vid, p);
                    };
                }(availApps[i]), availApps[i].active);
                if (result) {
                    success = true;
                    break;
                }
            } catch (e) {
                console.log(e);
            }
            if (success === false) cb([], "Error");
        },
        getProvider (url) {
            for(i = 0; i < availApps.length; i++){
                if (availApps[i].videoLookUp(url)) return availApps[i];
            }
            return false;
        },
        clearSearch: function() {
            this.searchTerm = "";
            this.searchSuggestions = [];
            this.showPlayAndGo = false;
            if (this.__searchInput) this.__searchInput.focus();
        },
        play: function(val, ele) {
            if (ele.collection) {
                this.searchTerm = ele.id;
                this.searchSubmit();
            }
        },
        share: function(val, ele) {
            ele.price = ele.price === "share" ? "" : "share";
            this.searchResults = [
                ele
            ];
            this.shareToggled(ele);
        },
        shareToggled: function() {},
        addToPl: function(val, ele) {},
        addAllToPl: function(val, ele) {},
        suggest: function(val, ele) {},
        loadMore: function() {
            if (this.canLoadMore) {
                this.searchPage++;
                this.search();
            }
        },
        loadMoreFromPub: function(val, ele) {
            if (ele.publisherID) {
                this.searchTerm = "publisher:" + ele.publisherID;
                this.searchPage = 1;
                this.search();
            }
        },
        toggleApps: function() {
            this.showApps = !this.showApps;
        },
        topSearchFocus: function() {
            this.showApps = true;
        }
    };
    for(var i = 0; i < providers.length; i++){
        var prov = new providers[i]();
        if (typeof sorted_providers[prov.provider_category] === "undefined") sorted_providers[prov.provider_category] = [];
        sorted_providers[prov.provider_category].push(prov);
    }
    for(const p in sorted_providers)if (sorted_providers.hasOwnProperty(p)) appsObj.sortedApps.push({
        category: p,
        providers: sorted_providers[p]
    });
    var w2gApps = new (0, $2wZwj.W2gDataObject)(appsObj);
    appsObj.sortedApps.forEach(function(a) {
        for(let i = 0; i < a.providers.length; i++)availApps.push(a.providers[i]);
    });
    availApps.sort(function(a, b) {
        return a.lookupFallback === true ? 1 : b.lookupFallback === true ? -1 : 0;
    });
    activeApp = availApps[0];
    activeApp.active = true;
    appsObj.activeLogo = activeApp.icon_path;
    appsObj.activeName = activeApp.provider_name;
    appsObj.activeDescription = activeApp.description || "Search OR paste a link to any site";
    w2gApps._addHandler("showApps", function(prop, val) {
        if (val) w2gApps.searchSuggestions = [];
        else if (w2gApps.__searchInput) w2gApps.__searchInput.blur();
    });
    w2gApps._addHandler("showPlayAndGo", function(prop, val) {
        if (w2gApps.__playGoInput) {
            if (val) w2gApps.__playGoInput.focus();
            else w2gApps.__playGoInput.blur();
            w2gApps.searchTerm = "";
        }
    });
    function _loadResults(data) {
        w2gApps.searching = false;
        w2gApps.searchResults = data;
        if (w2gApps.searchPage === 1) {
            if (window.innerWidth <= 965) {
                w2gApps.searchResults_1 = data.slice(0, 2);
                w2gApps.searchResults_2 = data.slice(2);
            } else {
                w2gApps.searchResults_1 = data.slice(0, 2);
                w2gApps.searchResults_2 = data.slice(2);
            }
        } else {
            var items = [
                w2gApps.searchResults_2.length,
                0
            ].concat(data);
            Array.prototype.splice.apply(w2gApps.searchResults_2, items);
        }
    }
    new (0, $fO6JP.W2gBind)(w2gApps, eleClass);
    return w2gApps;
};


let $00eadbf48ea55900$var$w2gLogin, $00eadbf48ea55900$var$w2gExtension, $00eadbf48ea55900$var$w2gApps;
(0, $590857b73185edda$export$3303a5adb06a24b3).domReady().then(function() {
    if (window.location.href.indexOf("?popout=true") !== -1) document.querySelector("body").classList.add("w2g-popout");
    document.querySelector("#search-bar-input").focus();
    $00eadbf48ea55900$var$w2gExtension = new (0, $6888e18907efb3b9$export$a3eefc95773c7135)(".w2g-extension");
    $00eadbf48ea55900$var$w2gLogin = new (0, $c7e3554df1a338b3$export$ab700690df2f22bf)(".w2g-login");
    $00eadbf48ea55900$var$w2gApps = new (0, $572af7499ec86dbc$export$20fba533b6b230c4)(".w2g-apps", true);
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }).then(function(tabs) {
        if (tabs[0] && tabs[0].url && tabs[0].url.indexOf("http") === 0 && tabs[0].url.indexOf("https://w2g.tv") !== 0) $00eadbf48ea55900$var$w2gApps.lookupAndRender(tabs[0].url);
    });
    $00eadbf48ea55900$var$w2gLogin._addHandler("authenticated", function(prop, val) {
        $00eadbf48ea55900$var$w2gApps.auth = val;
        $00eadbf48ea55900$var$w2gExtension.jid = $00eadbf48ea55900$var$w2gLogin.jid;
        if (val === true) $00eadbf48ea55900$var$w2gExtension.fetchRooms();
    });
    $00eadbf48ea55900$var$w2gApps._addHandler("searchSubmit", function() {
        $00eadbf48ea55900$var$w2gExtension.showRooms = false;
    });
    $00eadbf48ea55900$var$w2gApps._addHandler("play", function(ctx, args) {
        (0, $590857b73185edda$export$3303a5adb06a24b3).postJSON("/rooms/create.json", {
            share: args[1].id,
            title: args[1].title,
            thumb: args[1].thumb
        }).then((function(data) {
            chrome.tabs.create({
                url: "https://w2g.tv/room/?room_id=" + data.streamkey
            });
        }).bind(this));
    });
    $00eadbf48ea55900$var$w2gApps._addHandler("shareToggled", function(ctx, args) {
        $00eadbf48ea55900$var$w2gExtension.toggleShare(args[0]);
    });
    $00eadbf48ea55900$var$w2gApps._addHandler("showResults", function() {
        if ($00eadbf48ea55900$var$w2gApps.showResults === false) {
            $00eadbf48ea55900$var$w2gExtension.shareInitiated = false;
            $00eadbf48ea55900$var$w2gExtension.shareActive = false;
            $00eadbf48ea55900$var$w2gExtension.showRooms = true;
        }
    });
    $00eadbf48ea55900$var$w2gLogin.check();
});

})();
