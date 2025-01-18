/**
 * Envoie de message entre l'extension et le content-script via Promise
 * Permet de renvoyer des résultats à une requête en utilisant une Promise
 * et sans prise de tête
 */
class MessagePromise {

    constructor(isExtension) {
        this.extension = isExtension;
        this._ports = {};
        this._port = null;

        this._totalRequests = 0;
        this._requests = {};
        this._listeners = {};
        if (this.extension) {
            this.initExtension();
        } else {
            this.initContentScript();
        }
    }
    initContentScript() {
        var isConnected = true;
        try {
            var obj = {name: "message-promise"};
            var port = browser.runtime.connect(obj);
            port.onMessage.addListener((message, port) =>  { this._onMessage(message, port); });
            port.onDisconnect.addListener((e) => { this._onDisconnect(e) });
            try {
                port.postMessage({name: "init"});
                this._port = port;
            } catch(e) {
                console.log(e);
                isConnected = false;
            }
        } catch(e) {
            console.log(e);
            isConnected = false;
        }
        if (!isConnected) {
            console.log("[Message-Promise] Connection to Extension lost. Reload page...");
            this._port = null;
        }
    }

    initExtension() {
        browser.runtime.onConnect.addListener((port) => {
            if (port.name == "message-promise") {
                this._ports[port.sender.tab.id] = port;
                port.onMessage.addListener((message, port) => { this._onMessage(message, port); });
                port.onDisconnect.addListener((e) => {this._onDisconnect(e); });
            }
        });
    }

    initRequest(success, error, name, data) {
        var id = ++this._totalRequests;
        var obj = {id: id, success: success, error: error, name: name, data: data};
        this._requests[id] = obj;
        return obj;
    }

    sendTo(tabId, name, data) { return new Promise((success, error) => {
        var req = this.initRequest(success, error, name, data);
        if (this._ports[tabId]) {
            this._ports[tabId].postMessage({name: name, data: data, _requestId: req.id});
        }
    }); }

    send(name, data) { return new Promise((success, error) => {
        var req = this.initRequest(success, error, name, data);
        if (this._port) {
            this._port.postMessage({name: name, data: data, _requestId: req.id});
        } else {
            error("Extension port is not connected");
        }
    }); }

    onMessage(name, f) {
        if (!this._listeners[name]) {
            this._listeners[name] = [];
        }
        this._listeners[name].push(f);
    }


    _onDisconnect(e) {
        if (this.extension) {
            delete this._ports[e.sender.tab.id];
        } else {
            console.log("[Message-Promise] Connection to Extension lost. Reload page...");
            this._port = null;
        }
    }
    _onMessage(message, port) {
        var name = message.name;
        var data = message.data;
        var reqId = message._requestId;
        var isCallback = message._isCallback;
        var callbackSended = false;
        if (isCallback) {
            var request = this._requests[reqId];
            request.success(data);
        } else {
            if (this._listeners[name]) {
                this._listeners[name].forEach(function(f) {
                    var ret = f(data);
                    if (typeof(ret) != "undefined" && !callbackSended) {
                        port.postMessage({name: name, data: ret, _requestId: reqId, _isCallback: true});
                        callbackSended = true;
                    }
                });
            }
        }
    }
}
