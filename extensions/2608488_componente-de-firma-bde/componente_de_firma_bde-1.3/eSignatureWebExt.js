// Begin of Babel compiled code.
"use strict";

function _extendableBuiltin(cls) {
    function ExtendableBuiltin() {
        var instance = Reflect.construct(cls, Array.from(arguments));
        Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
        return instance;
    }

    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
        constructor: {
            value: cls,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(ExtendableBuiltin, cls);
    } else {
        ExtendableBuiltin.__proto__ = cls;
    }

    return ExtendableBuiltin;
}

(function () {
   
    window.DigSignWebExt = class DigSignWebExtWrapper {
        constructor() {
            this._webExtCommNode = document.getElementById("digsign-webext-comm-node");

            this._msgId = 0;
            this._msgListeners = {};

            this._webExtCommNode.addEventListener("msgToWebpage", event => {
                let res = event.detail;

                console.log("(Webpage) received msg from content:");
                console.log(res);

                if (res.id === undefined) {
                    console.error("No id key in webExt response:");
                    console.error(res);
                } else if (!this._msgListeners[res.id]) {
                    console.error("No listener waiting for webExt content response:");
                    console.error(res);
                } else {
                    let id = res.id;
                    //res.id = undefined;

                    this._msgListeners[id].resolve(res);
                    this._msgListeners[id] = undefined;
					//console.log(res);
                }
            });
        }

        _sendMsgToWebExt(req) {
            return new Promise((resolve, reject) => {
                req.id = this._msgId++;

                this._msgListeners[req.id] = {
                    resolve: resolve,
                    reject: reject
                };

                console.log("(Webpage) sending msg to content:");
                console.log(req);

                this._webExtCommNode.dispatchEvent(new CustomEvent("msgFromWebpage", {
                    detail: req
                }));
            });
        }

        // DigSignWebWebExtWebExtWrapper class public definitions.

        // string(JSON) GetCertificates()
        GetCertificates(jsXml) {
            return this._sendMsgToWebExt({
               type: "9",
			   javascriptXml: jsXml
            }).then(res => {
                return res;
            });
        }
		
		// string(JSON) Sign()
        Sign(bloqueNodo) {
            return this._sendMsgToWebExt({
               type: "1",
			   javascriptXml: escape(bloqueNodo)
            }).then(res => {
                return res;
            });
        }
		
		// string(JSON) SignDNI()
        SignDNI(bloqueNodo) {
            return this._sendMsgToWebExt({
               type: "8",
			   javascriptXml: escape(bloqueNodo)
            }).then(res => {
                return res;
            });
        }

		// string(JSON) GetVersionJava()
        GetVersionJava() {
            return this._sendMsgToWebExt({
                type: "15"
            }).then(res => {
                return res;
            });
        }
		
		// string(JSON) ResetDNI()
        ResetDNI() {
            return this._sendMsgToWebExt({
                type: "10"
            }).then(res => {
                return res;
            });
        }
		
		// string(JSON) ListaDispositivosInstalados()
        ListaDispositivosInstalados(jsXml) {
            return this._sendMsgToWebExt({
               type: "3",
			   javascriptXml: jsXml
            }).then(res => {
                return res;
            });
        }
		
		// string(JSON) CompruebaDispositivo()
        CompruebaDispositivo(jsXml) {
            return this._sendMsgToWebExt({
               type: "7",
			   javascriptXml: jsXml
            }).then(res => {
                return res;
            });
        }
		
    };
})();

// End of Babel compiled code.
