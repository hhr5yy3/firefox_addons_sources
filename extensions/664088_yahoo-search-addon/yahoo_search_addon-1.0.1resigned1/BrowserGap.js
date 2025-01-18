function BrowserGap (unittest) { //jshint ignore: line

    var isWebExtension = true;
    var _ctid = "",
        _version = "",
        _uiLang = "",
        _os = "";

    async function init(){
        await _loadTrackingParams();
    }

    function getVersion(){
        return _version;
    }

    function getUILanguage(){
        return _uiLang;
    }

    function getCTID(){
        return _ctid;
    }

    function getOS(){
        return _os;
    }

    async function _loadTrackingParams() {
        _ctid = await localStorage.getItem('ctid');
        if(!_ctid) {
            _ctid = _generateCTID();
            await localStorage.setItem('ctid', _ctid);
        }
        _version = browser.runtime.getManifest().version;
        _uiLang = browser.i18n.getUILanguage();
        browser.runtime.getPlatformInfo(function(platformInfo) {
            _os = platformInfo.os;
        });
    }

    function _generateCTID() {
        var strUUID= "";

        try {
            var timeSeed= ((new Date()).getTime()).toString();
            timeSeed= timeSeed.substr(timeSeed.length - 3);
            for (var seedOn= 0; seedOn < timeSeed; seedOn++){
                Math.random();
            }

            for (var charOn= 0; charOn < 32; charOn++){
                var charCur= Math.floor(Math.random() * 36);
                if (charCur > 25){
                    charCur= String.fromCharCode(48 + charCur - 26);
                } else{
                    charCur= String.fromCharCode(65 + charCur);
                }

                strUUID += charCur;

                switch (charOn) {
                    case 7:
                    case 11:
                    case 15:
                    case 19:
                        strUUID += '-';
                        break;
                }
            }
        }
        catch (e) {
            extGlobal.logManager.logErrorMessage('BrowserGap.generateCTID error: ' + e.message);
        }
        return strUUID;
    }

    function xhr(url, callback, err){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function()
        {
            if(this.readyState === XMLHttpRequest.DONE )
            {
                var response = {
                    text: this.responseText,
                    status: this.status
                };
                if(this.status === 200){
                    callback(response);
                }else {
                    err(response);
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    function addMessageListener(fnRet){
        // set a listener to listen for messages from detectWiderMail.js
        browser.runtime.onMessage.addListener(fnRet);
    }

    /*Expose all the private functions through this object if unittest is true*/
    /* jshint ignore: start */
    if (unittest) {
        this._loadTrackingParams = _loadTrackingParams;
        this._generateCTID = _generateCTID;
        this._version = _version;
        this._os = _os;
        this._ctid = _ctid;
        this._uiLang = _uiLang;
        this.injectFunction = function(){
            _loadTrackingParams = this._loadTrackingParams;
            _os = this._os;
            _ctid = this._ctid;
            _version = this._version;
            _uiLang = this._uiLang;
        };
        this.syncData = function(){
            this._os = _os;
            this._ctid = _ctid;
            this._version = _version;
            this._uiLang = _uiLang;
        };
        this.xhr = xhr;
    }
    /* jshint ignore: end */

    this.init = init;
    this.isWebExtension = isWebExtension;
    this.localStorage = {};
    this.localStorage.getItem = async function(obj) { //getItem only takes strings as input, unlike storage.local.get which could take json objects
        var results = await browser.storage.local.get(obj);
        return results[obj] || null;
    };
    this.localStorage.setItem = async function(key, value) {
        var obj = {};
        obj[key] = value;
        return await browser.storage.local.set(obj);
    };
    this.localStorage.removeItem = async function(obj) { //getItem only takes strings as input, unlike storage.local.get which could take json objects
        return await browser.storage.local.remove(obj);
    };
    this.getVersion = getVersion;
    this.getMarket = getUILanguage;
    this.getIntl = getUILanguage;
    this.getCTID = getCTID;
    this.getOS = getOS;
    this.xhr = xhr;
    return this;
}