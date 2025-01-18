/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL License
 *
 * Copyright (c) 2018 Diego Casorran
 *
 * Core functionality on this file is based off the FireCaptor extension by Zbinlin
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/
 *
 * Contributor(s):
 *   Diego Casorran <dcasorran[a]gmail.com> (Original Author)
 *
 * ***** END LICENSE BLOCK ***** */

(function() {
"use strict";

if (window.CaptureAndPrint) return;
window.CaptureAndPrint = 1;

let working = false;
const notify = browser.runtime.sendMessage.bind(browser.runtime);
const actions = Object.freeze({"area-to-printer":1,"whole-page-to-clipboard":1,"visible-page-to-clipboard":1});

browser.runtime.onMessage.addListener(msg => {
    const reject = ex => Promise.resolve({error: ex});

    if (!actions[msg.action]) {
        return reject('Unknown action: ' + (msg.action || msg));
    }
    if (working) {
        return reject('Pending capture already running...');
    }

    const doc = document;
    const lb = new LightBox(doc,window);

    if (msg.action === 'area-to-printer') {
        lb.init();
    }
    else {
        let c;
        const del = doc.documentElement;

        if (msg.action === 'visible-page-to-clipboard') {
            let w = doc.defaultView;

            c = lb.getCanvas(w.scrollX,w.scrollY,
                Math.min(w.innerWidth, del.clientWidth),
                Math.min(w.innerHeight,del.clientHeight));
        }
        else {
            c = lb.getCanvas(0,1,
                Math.max(del.scrollWidth, Math.max(doc.body.clientWidth, del.clientWidth)),
                Math.max(del.scrollHeight,Math.max(doc.body.clientHeight,del.clientHeight)));
        }
        lb.toClip(c);
    }

    return Promise.resolve({success: msg.action});
});

function tryCatch(f) {
    return function() {
        try {
            return f.apply(this, arguments);
        }
        catch (ex) {
            console.error(ex);
            notify({error: String(ex)});
        }
    };
}

function LightBox(document,window) {
    /**
     * Function taken from the FireCapture Extension by Zbinlin
     *
     * https://addons.mozilla.org/en-US/firefox/addon/firecaptor/
     *
     * (It has been modified for this extension)
     */
    this.init = function() {
        let div = document.createElementNS("http://www.w3.org/1999/xhtml", "div"),dE,w,h;
        if (!div)
            return;
        dE = document.documentElement;
        dE.style.cursor = 'crosshair';
        w = Math.max(dE.scrollWidth,dE.clientWidth);
        h = Math.max(dE.scrollHeight,dE.clientHeight);
        div.style.cssText = ""
             + "position: absolute; border: 0px solid rgba(136, 128, 152, 0.6); "
             + "top: 0; right: 0; bottom: 0; left: 0;width:"+w+"px;height:"+h+"px;"
             + "margin: 0; padding: 0; border:1px dotted #111; cursor: crosshair; "
             + "z-index: 99999; background-color: rgba(240,240,0,0.7);";
        let span = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
        span.style.cssText = ""
             + "position: absolute; top: 2px; right: 0; bottom: 0; left: 4px;"
             + "margin: 0; padding: 0; z-index: 1; -moz-user-select: none;"
             + "font-size: 13px; color: #000; "
             + "white-space: nowrap; text-shadow: 1px 2px 2px #77f;";
        this._sizeBox = div.appendChild(span);
        let parent = document.body || document.documentElement;
        let subDiv = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
        subDiv.style.cssText = ""
             + "width: 100%; height: 100%; margin: 0; padding: 0; "
             + "-moz-box-sizing: border-box; box-sizing: border-box; ";
        this._subBox = div.appendChild(subDiv);
        this.box = parent.appendChild(div);
        document.documentElement.addEventListener("mousedown", this, false);
        working = true;
    };
    this.uninit = function () {
        working = false;
        document.documentElement.style.cursor = null;
        if (this.box) {
            document.documentElement.removeEventListener("mousedown", this, false);
            this.box.parentNode.removeChild(this.box);
            delete this.box;
            this._subBox && (delete this._subBox);
            this._sizeBox && (delete this._sizeBox);
        }
        if(this.tY) {
            window.clearInterval(this.tY);
            delete this.tY;
        }
        if(this.tX) {
            window.clearInterval(this.tX);
            delete this.tX;
        }
        if(this.tZ) {
            window.clearInterval(this.tZ);
            delete this.tZ;
        }
    };
    this.getCanvas = function(x,y,w,h) {
        let canvas = window.document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        canvas.width = w;
        canvas.height = h;

        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, w, h);
        ctx.save();
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1310318
        ctx.drawWindow(document.defaultView, x, y, w, h, "rgba(255, 255, 255, 0)");
        ctx.restore();

        return canvas;
    };
    this.toBlob = function(canvas) {
        let data = canvas.toDataURL("image/png");
        data = atob(data.split(',', 2)[1]);
        data = Uint8Array.from(data, ch => ch.charCodeAt(0));
        return new Blob([data], {type: 'image/png'});
    };
    this.toObjectURL = function(canvas) {
        return URL.createObjectURL(this.toBlob(canvas));
    };
    this.toClip = function(canvas) {
        notify({
            setImageData: this.toBlob(canvas)
        });
    };
    this.handleEvent = function(e) {
        e.preventDefault();
        e.stopPropagation();
        let _win = document.defaultView;
        switch (e.type) {
            case "mousedown":
                this.x = e.clientX + _win.scrollX;
                this.y = e.clientY + _win.scrollY;
                this.sX = this.sY = 0;
                this.box.style.left = this.x + "px";
                this.box.style.top = this.y + "px";
                this.box.style.width = "0px";
                this.box.style.height = "0px";
                this._subBox.style.border = "none";
                this._sizeBox.textContent = "";
                this._tid = window.setTimeout((function() {
                        this._tid = 0;
                        document.documentElement.addEventListener("mousemove", this, false);
                    }).bind(this), 150);
                document.documentElement.addEventListener("mouseup", this, false);
                break;
            case "mousemove": {
                e.currentTarget.setCapture(true);
                let x = e.clientX + _win.scrollX,y = e.clientY + _win.scrollY;
                let _w = Math.floor(x - this.x), _h = Math.floor(y - this.y);
                if(_w < 1 || _h < 1 || !this.box) break;
                this.box.style.width = _w + "px";
                this.box.style.height = _h + "px";
                this._subBox.style.border = "1px dashed rgba(0, 0, 0, 0.6)";
                this._sizeBox.textContent = _w + 'x' + _h;
                if(this.tY) {
                    window.clearInterval(this.tY);
                    delete this.tY;
                }
                if(this.tX) {
                    window.clearInterval(this.tX);
                    delete this.tX;
                }
                if(this.tZ) {
                    window.clearInterval(this.tZ);
                    delete this.tZ;
                }
                if(e.clientY < 6) {
                    if(!this.tZ) {
                        this.sY = _win.scrollY;
                        this.tZ = window.setInterval((function(){
                            _win.scrollTo(this.sX,this.sY -= 5);
                        }).bind(this),10);
                    }
                }
                if(e.clientY > _win.innerHeight - 18) {
                    if(!this.tY) {
                        this.sY = _win.scrollY;
                        this.tY = window.setInterval((function(){
                            _win.scrollTo(this.sX,this.sY += 3);
                        }).bind(this),10);
                    }
                }
                if(e.clientX > _win.innerWidth - 12) {
                    if(!this.tX) {
                        this.sX = _win.scrollX;
                        this.tX = window.setInterval((function(){
                            _win.scrollTo(this.sX += 3,this.sY);
                        }).bind(this),10);
                    }
                }
            }   break;
            case "mouseup": {
                if (this._tid) {
                    window.clearTimeout(this._tid);
                    this._tid = 0;
                }
                else {
                    document.documentElement.removeEventListener("mousemove", this, false);
                    document.releaseCapture();
                }
                document.documentElement.removeEventListener("mouseup", this, false);

                let x = parseFloat(this.box.style.left)   || 0,
                    y = parseFloat(this.box.style.top)    || 0,
                    w = parseFloat(this.box.style.width)  || 0,
                    h = parseFloat(this.box.style.height) || 0;

                this.uninit();
                if ( w * h < 100 )
                    break;

                let canvas = this.getCanvas(x,y,w,h);

                if (e.ctrlKey) {
                    this.toClip(canvas);
                }
                else {
                    let ref = window.open(this.toObjectURL(canvas), '_blank');
                    if (!ref) {
                        notify({
                            error: 'Some popup blocker prevented this from working, ' +
                                   'you can hold down the ctrl key while capturing to save it to the clipboard instead.'
                        });
                    }
                    else {
                        setTimeout(notify.bind(0, {print: 1}), 200);
                    }
                }

                /*let b = window.gBrowser, pT = b.selectedTab;
                b.getBrowserForTab((b.selectedTab = b.addTab(canvas.toDataURL("image/png")))).addEventListener("load", function() {
                    this.removeEventListener("load", arguments.callee, true);
                    let l = window.PrintPreviewListener, e = l.onExit;
                    l.onExit = function() {
                        e.call(l);
                        b.removeCurrentTab();
                        b.selectedTab = pT;
                        l.onExit = e;
                    };
                    window.PrintUtils.printPreview(l);
                }, true );*/
            }
        }
    };

    Object.keys(this).forEach(fn => this[fn] = tryCatch(this[fn]));
}
})();
