/*
 * Copyright 2016-2017 TechniaTranscat AB, All Rights Reserved
 */

class Dispatcher {
    
    constructor(debug) {
        this._dbg = debug;
        this.bgPort = null;
    }

    init(window) {
        window.addEventListener("message", this.onPageMessage.bind(this));
        this.debug("Added event listener");
    }
    
    onPageMessage(event) {
    	if (event.data && event.data.tvcFileManagerMessage && event.data.destination != "page") {
            this.debug("Dispatching from page to background", event.data.tvcFileManagerMessage);
            this.getBackgroundPort().postMessage({
                "destination" : "native",
                "message" : event.data.tvcFileManagerMessage
            });
        }
    }
    
    getBackgroundPort() {
        if (this.bgPort == null) {
            this.debug("About to connect with background...");
            var port = browser.runtime.connect();
            port.onMessage.addListener(this.onBackgroundMessage.bind(this));
            port.onDisconnect.addListener(() => {
                this.debug("Background port was disconnected");
                this.bgPort = null;
            });
            this.bgPort = port;
            this.debug("Background port established");
        }
        return this.bgPort;
    }
    
    onBackgroundMessage(data) {
        if (data.destination && data.destination == "page") {
            this.debug("Dispatching from background to page", data.message);
            window.postMessage({
                "tvcFileManagerMessage": data.message,
                "destination" : "page"
            }, "*");
        }
    }    
    
    debug(msg) {
        if (this._dbg) {
            var args = Array.prototype.slice.call(arguments, 1);
            args.unshift("[CS] " + msg);
            console.debug.apply(this, args);
        }
    }
}

function is3ddashboard() {
    return window.location.pathname === "/3ddashboard/" && document.title === "3DEXPERIENCE Platform";
}

function initDispatcher(debug) {
    const dispatcher = new Dispatcher(debug);
    dispatcher.init(window);
}

let elm = document.getElementById("tvc-filemanager-webext");
if (elm != null) {
    elm.setAttribute("data-extension-avail", "true");
    elm.setAttribute("data-extension-version", "1.3.3");
    const debug = "true" == elm.getAttribute("data-extension-debug");
    initDispatcher(debug);
} else if (is3ddashboard()) {
    const debug = window.location.href.includes('?debug=true');
    var elemDiv = document.createElement('div');
	elemDiv.setAttribute("id", "tvc-filemanager-webext");
	elemDiv.setAttribute("data-extension-avail", "true");
	elemDiv.setAttribute("data-extension-version", "1.3.3");
	elemDiv.style.cssText = 'width:0;height:0;display:none;';
	document.body.appendChild(elemDiv);
    initDispatcher(debug);
}