/*
 * Copyright 2016-2017 TechniaTranscat AB, All Rights Reserved
 */
 
let DEBUG_ENABLED = false;
const nativePorts = new Map();

class NativePort {
    
    constructor(con) {
        this._port = null;
        this._url = con.url;
        this._refCounter = 0;
    }
    
    get port() {
        return this._port;
    }
    
    get url() {
        return this._url;
    }
    
    postMessage(message) {
        try {
            this._port.postMessage(message);
        } catch(err) {
            this._port = null;
            this._createPort();
            this._port.postMessage(message);
        }
    }
      
    connect(con) {
        this.debug("About to connect with native app...");
        
        if (this._port == null) {
            this._createPort();
        }
        
        this._refCounter++;
        
        let onMessage = (message) => {
            if (con.port != null && message.destination == undefined) {
                this.debug("Dispatching from native app to content", message);
                con.port.postMessage({
                    "destination" : "page",
                    "message" : message
                });
            }
        };
        this._port.onMessage.addListener(onMessage);

        this.debug("Native port established");
    }
    
    _createPort() {
        this.debug("Creating port...");
        
        let port = browser.runtime.connectNative("com_techniatranscat_tvc_filemanager");
        port.onDisconnect.addListener(() => { this.debug("Native port was disconnected") });
        this._port = port;
    }
    
    disconnect(con) {
        this.debug("About to disconnect native app from ", con.id);
        
        if (this._refCounter > 0 && --this._refCounter == 0) {
            this.debug("About to disconnect the native port...");
            
            this._port.disconnect();
            this._port = null;
            
            this.debug("Native port has been disconnected!");
        }
    }
    
    debug(msg) {
        if (DEBUG_ENABLED) {
            let args = Array.prototype.slice.call(arguments, 1);
            args.unshift(`[BG] [NATIVE] (${this._url}:${this._refCounter}) ${msg}`);
            console.debug.apply(this, args);
        }
    }    
}

class Bridge {

    constructor(port) {
        this._id = `t${port.sender.tab.id}`;
        this._contentPort = port;
        this._nativePort = null;
        
        let url = port.sender.url,
            q=url.indexOf('?');
        if (q>0) {
            url = url.substring(0, q);
        }
        this._url = url;
    }

    get url() { return this._url; }
    
    get port() {
        return this._contentPort;
    }
    
    init() {
        this.debug(`onConnect (url=${this._url})`);
        
        this._contentPort.onMessage.addListener(data => {
            if (data.destination && data.destination == "native") {
                this.debug("Dispatching from content to native app", data.message);

                this.getNativePort().postMessage(data.message);
            }
        });
        
        this._contentPort.onDisconnect.addListener(() => {
            this.debug("Content port was disconnected");
            if (this._nativePort != null) {
                this.debug("About to disconnect from the native port...");
                
                this._nativePort.disconnect(this);
                this._nativePort = null;
                
                this.debug("Ok, native port disconnected.");
            }
        });        
    }

    getNativePort() {        
        if (this._nativePort == null) {
            let port = nativePorts.get(this._url);
            if (port == null) {
                port = new NativePort(this);
                nativePorts.set(this._url, port);
            }
            port.connect(this);
            this._nativePort = port;
        }
        return this._nativePort;
    }
    
    debug(msg) {
        if (DEBUG_ENABLED) {
            let args = Array.prototype.slice.call(arguments, 1);
            args.unshift(`[BG] [BRIDGE] (${this._id}) ${msg}`);
            console.debug.apply(this, args);
        }
    }
}

browser.runtime.onConnect.addListener(port => {
    const bridge = new Bridge(port);
    bridge.init();
});