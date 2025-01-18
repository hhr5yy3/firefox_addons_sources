(function () {
function $5eb21fd0cbf7cc62$export$1e71eb4bef00f6b0(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}


class $cdbef241f084b019$export$9386d718de8b4c1a {
    get paused() {
        return this.video.paused;
    }
    get currentTime() {
        return this.video.currentTime;
    }
    set currentTime(t) {
        this.video.currentTime = t;
    }
    get duration() {
        return isFinite(this.video.duration) ? this.video.duration : 10800;
    }
    play() {
        this.video.play();
    }
    pause() {
        this.video.pause();
    }
    addVideos() {
        this.videos = document.querySelectorAll("video");
        let shadowRoots = this._getShadowDoms();
        shadowRoots.forEach((function(s) {
            try {
                let vs = s.querySelectorAll("video");
                this.videos = [
                    ...this.videos
                ].concat([
                    ...vs
                ]);
            } catch (e) {}
        }).bind(this));
    }
    getVidScore() {
        let i, highest = {
            s: 0,
            v: null
        };
        if (this.videos.length > 0) {
            for(i = 0; i < this.videos.length; i++)if (this.videos[i].readyState > 0 && this.videos[i].offsetParent !== null) {
                let score = this.videos[i].videoHeight * this.videos[i].videoWidth * (isFinite(this.videos[i].duration) ? this.videos[i].duration + 1 : 1);
                if (score >= highest.s) highest = {
                    s: score,
                    v: this.videos[i]
                };
            }
        }
        if (highest.s > 0 && highest.v !== this.video) {
            this._removeEventListeners();
            this.video = highest.v;
            return highest.s;
        } else return 0;
    }
    addEventListener(evt, handler) {
        this.eventListeners.push(arguments);
        this.video.addEventListener(...arguments);
    }
    _removeEventListeners() {
        this.eventListeners.forEach((function(ele) {
            this.video.removeEventListener(...ele);
        }).bind(this));
        this.eventListeners = [];
    }
    _injectScript(file_path, tag) {
        var node = document.getElementsByTagName(tag)[0];
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", file_path);
        node.appendChild(script);
    }
    _getShadow(ele) {
        try {
            if (chrome.dom?.openOrClosedShadowRoot) return chrome.dom.openOrClosedShadowRoot(ele);
            else if (ele.openOrClosedShadowRoot) return ele.openOrClosedShadowRoot;
            else return undefined;
        } catch (e) {
            return undefined;
        }
    }
    _getShadowDoms() {
        const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
        let currentNode = treeWalker.currentNode;
        let sr, shadowRoots = [];
        while(currentNode){
            sr = this._getShadow(currentNode);
            if (sr) shadowRoots.push(sr);
            currentNode = treeWalker.nextNode();
        }
        return shadowRoots;
    }
    _sendEvent(ele, evt, x, y) {
        let event = new PointerEvent(evt, {
            pointerId: 1,
            isPrimary: !0,
            view: window,
            bubbles: !0,
            cancelable: !0,
            clientX: x,
            clientY: y
        });
        ele.dispatchEvent(event);
    }
    constructor(){
        (0, $5eb21fd0cbf7cc62$export$1e71eb4bef00f6b0)(this, "video", null);
        (0, $5eb21fd0cbf7cc62$export$1e71eb4bef00f6b0)(this, "videos", []);
        (0, $5eb21fd0cbf7cc62$export$1e71eb4bef00f6b0)(this, "eventListeners", []);
        (0, $5eb21fd0cbf7cc62$export$1e71eb4bef00f6b0)(this, "domReady", new Promise(function(resolve, reject) {
            if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", resolve);
            else resolve();
        }));
        this.domReady.then((function() {
            this.addVideos();
            setInterval((function() {
                this.addVideos();
            }).bind(this), 2000);
        }).bind(this));
    }
}



class $b67d070142a5b343$export$ffaec9a6234cf3ae extends (0, $cdbef241f084b019$export$9386d718de8b4c1a) {
    get currentTime() {
        return this.video.currentTime;
    }
    set currentTime(t) {
        window.postMessage({
            type: "w2g_seek",
            val: t
        });
    }
    constructor(){
        super(...arguments);
        this._injectScript(chrome.runtime.getURL("javascript/adapter/w2g_netflix_adapter.js"), "body");
    }
}



let $a0cc82e1c9ee3c5b$var$offset = 0;
class $a0cc82e1c9ee3c5b$export$15458c025de36a25 extends (0, $cdbef241f084b019$export$9386d718de8b4c1a) {
    get currentTime() {
        let t = null, s = 0, multi = [
            1,
            60,
            3600
        ];
        try {
            t = document.querySelector(".atvwebplayersdk-timeindicator-text").innerText.split("/")[0].trim().split(":").reverse();
            for(let i = 0; i < t.length; i++)s += t[i] * multi[i];
        } catch (e) {}
        if (s > 0) $a0cc82e1c9ee3c5b$var$offset = this.video.currentTime - s;
        return this.video.currentTime - $a0cc82e1c9ee3c5b$var$offset;
    }
    set currentTime(t) {
        this.video.currentTime = t + $a0cc82e1c9ee3c5b$var$offset;
    }
}



class $ad835c93978ada2c$export$60f6c958026b03ac extends (0, $cdbef241f084b019$export$9386d718de8b4c1a) {
    get currentTime() {
        return super.currentTime;
    }
    set currentTime(t) {
        let slider = document.querySelector(".progress-bar .slider-container");
        let fract = t / this.duration;
        let r = slider.getBoundingClientRect();
        let x = r.left + r.width * fract;
        let y = r.top + r.height / 2;
        this._sendEvent(slider, "pointerdown", x, y);
        this._sendEvent(slider, "pointerup", x, y);
    }
    get duration() {
        let slider = document.querySelector(".progress-bar .slider-container");
        if (slider) return Number(slider.getAttribute("aria-valuemax"));
        else return 0;
    }
}


let $0e6e5a0e00ecd5ad$var$player, $0e6e5a0e00ecd5ad$var$w2gMessage = null, $0e6e5a0e00ecd5ad$var$canSync = true, $0e6e5a0e00ecd5ad$var$videoIntervall = null, $0e6e5a0e00ecd5ad$var$url = window.location.href;
if ($0e6e5a0e00ecd5ad$var$url.match(/^https:\/\/www.netflix.com/)) $0e6e5a0e00ecd5ad$var$player = new (0, $b67d070142a5b343$export$ffaec9a6234cf3ae)();
else if ($0e6e5a0e00ecd5ad$var$url.match(/^https:\/\/.*amazon\./)) $0e6e5a0e00ecd5ad$var$player = new (0, $a0cc82e1c9ee3c5b$export$15458c025de36a25)();
else if ($0e6e5a0e00ecd5ad$var$url.match(/^https:\/\/.*disneyplus\.com/)) $0e6e5a0e00ecd5ad$var$player = new (0, $ad835c93978ada2c$export$60f6c958026b03ac)();
else $0e6e5a0e00ecd5ad$var$player = new (0, $cdbef241f084b019$export$9386d718de8b4c1a)();
let $0e6e5a0e00ecd5ad$var$domReady = new Promise(function(resolve, reject) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", resolve);
    else resolve();
    setTimeout(function() {
        resolve();
    }, 5000);
});
$0e6e5a0e00ecd5ad$var$domReady.then(function() {
    if (self === top) {
        let iurl = chrome.runtime.getURL("controls.html");
        let host = document.createElement("div");
        let shadow = host.attachShadow({
            mode: "closed"
        });
        let shadow_style = document.createElement("style");
        shadow_style.innerHTML = "#w2g-player-controls {position: fixed; bottom: -42px; left: 0; width: 100%; height: 42px; z-index: 2147483647; transition: all 0.2s ease-out; }";
        shadow.appendChild(shadow_style);
        $0e6e5a0e00ecd5ad$var$w2gMessage = document.createElement("iframe");
        $0e6e5a0e00ecd5ad$var$w2gMessage.setAttribute("id", "w2g-player-controls");
        $0e6e5a0e00ecd5ad$var$w2gMessage.setAttribute("frameborder", "0");
        $0e6e5a0e00ecd5ad$var$w2gMessage.setAttribute("src", iurl);
        shadow.appendChild($0e6e5a0e00ecd5ad$var$w2gMessage);
        document.body.appendChild(host);
        setTimeout(function() {
            $0e6e5a0e00ecd5ad$var$w2gMessage.style.bottom = "0px";
        }, 1500);
        let furl = new URL(iurl);
        window.addEventListener("message", function(msg) {
            if (msg.source === $0e6e5a0e00ecd5ad$var$w2gMessage.contentWindow && msg.origin === furl.origin) {
                if (msg.data.resync) window.location.href = $0e6e5a0e00ecd5ad$var$url;
                else if (msg.data.newurl) chrome.runtime.sendMessage({
                    "newurl": {
                        url: window.location.href,
                        title: document.title
                    }
                });
                else if (typeof msg.data.show_ui !== "undefined") {
                    if (msg.data.show_ui === true) $0e6e5a0e00ecd5ad$var$w2gMessage.style.bottom = "0px";
                    else $0e6e5a0e00ecd5ad$var$w2gMessage.style.bottom = "-35px";
                } else chrome.runtime.sendMessage(msg.data);
            }
        });
    }
});
$0e6e5a0e00ecd5ad$var$videoIntervall = setInterval($0e6e5a0e00ecd5ad$var$attachToVideo, 1000);
setInterval(function() {
    if (self === top) chrome.runtime.sendMessage({
        "checkurl": window.location.href
    });
}, 1000);
chrome.runtime.onMessage.addListener(function(msg) {
    if ($0e6e5a0e00ecd5ad$var$w2gMessage && msg.ui_update) $0e6e5a0e00ecd5ad$var$w2gMessage.contentWindow.postMessage(msg, "*");
    else {
        if ($0e6e5a0e00ecd5ad$var$player && $0e6e5a0e00ecd5ad$var$canSync && msg.play && $0e6e5a0e00ecd5ad$var$player.paused === true) $0e6e5a0e00ecd5ad$var$player.play();
        else if ($0e6e5a0e00ecd5ad$var$player && $0e6e5a0e00ecd5ad$var$canSync && msg.pause && $0e6e5a0e00ecd5ad$var$player.paused === false) $0e6e5a0e00ecd5ad$var$player.pause();
        else if ($0e6e5a0e00ecd5ad$var$player && $0e6e5a0e00ecd5ad$var$canSync && typeof msg.seek !== "undefined") $0e6e5a0e00ecd5ad$var$player.currentTime = msg.seek;
        else if (msg.urlok) {
            if (msg.urlok.result) $0e6e5a0e00ecd5ad$var$canSync = true;
            else {
                $0e6e5a0e00ecd5ad$var$canSync = false;
                if ($0e6e5a0e00ecd5ad$var$w2gMessage) $0e6e5a0e00ecd5ad$var$w2gMessage.contentWindow.postMessage({
                    resync: true
                }, "*");
            }
        } else if ($0e6e5a0e00ecd5ad$var$canSync && typeof msg.videofound !== "undefined") {
            if ($0e6e5a0e00ecd5ad$var$w2gMessage) $0e6e5a0e00ecd5ad$var$w2gMessage.contentWindow.postMessage(msg, "*");
        }
    }
});
function $0e6e5a0e00ecd5ad$var$handlePlay(evt) {
    chrome.runtime.sendMessage({
        "durationchange": $0e6e5a0e00ecd5ad$var$player.duration
    });
    chrome.runtime.sendMessage({
        "play": true
    });
}
function $0e6e5a0e00ecd5ad$var$handlePause() {
    chrome.runtime.sendMessage({
        "pause": true
    });
}
function $0e6e5a0e00ecd5ad$var$handleTimeUpdate() {
    chrome.runtime.sendMessage({
        "timeupdate": $0e6e5a0e00ecd5ad$var$player.currentTime
    });
}
function $0e6e5a0e00ecd5ad$var$handleDurationChange() {
    chrome.runtime.sendMessage({
        "durationchange": $0e6e5a0e00ecd5ad$var$player.duration
    });
}
function $0e6e5a0e00ecd5ad$var$handleEnded() {
    chrome.runtime.sendMessage({
        "ended": true
    });
}
function $0e6e5a0e00ecd5ad$var$attachToVideo() {
    let score = $0e6e5a0e00ecd5ad$var$player.getVidScore();
    if (score > 0) {
        $0e6e5a0e00ecd5ad$var$player.addEventListener("play", $0e6e5a0e00ecd5ad$var$handlePlay);
        $0e6e5a0e00ecd5ad$var$player.addEventListener("pause", $0e6e5a0e00ecd5ad$var$handlePause);
        $0e6e5a0e00ecd5ad$var$player.addEventListener("timeupdate", $0e6e5a0e00ecd5ad$var$handleTimeUpdate);
        $0e6e5a0e00ecd5ad$var$player.addEventListener("durationchange", $0e6e5a0e00ecd5ad$var$handleDurationChange);
        $0e6e5a0e00ecd5ad$var$player.addEventListener("ended", $0e6e5a0e00ecd5ad$var$handleEnded);
        chrome.runtime.sendMessage({
            "videofound": score
        });
        chrome.runtime.sendMessage({
            "durationchange": $0e6e5a0e00ecd5ad$var$player.duration
        });
        if ($0e6e5a0e00ecd5ad$var$player.paused) chrome.runtime.sendMessage({
            "pause": true
        });
        else chrome.runtime.sendMessage({
            "play": true
        });
    }
}

})();
