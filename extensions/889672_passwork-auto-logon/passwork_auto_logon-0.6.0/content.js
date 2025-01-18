;(function () {
    let __debug = false;
    if(isOwnDomain()) return;
    const settingsId = 'passwordManager_extensionSettings';
    const defaultHost = 'https://passwork.me/';
    const iFrameId = 'passworkPlugin_iFrame';
    const inputTypeTextArray = ['text', 'email'];
    let iFrame;
    let log = console.log;
    if(!__debug) log = function () {};
    let anchors = [];
    const anchorIconSize = 24;
    let _login = null;
    let _password = null;
    let language = 'en';
    let clickedElement = null;
    let host = defaultHost;
    const _leftAdjust = -18 - (anchorIconSize / 2);
    //let manifestData = chrome.runtime.getManifest();
    let autosubmit = false;
    let rootContentScript = !inIframe();
    let authFormFoundId = false;
    let contentId =  Math.floor(Math.random() * 100000000) + 1000000;
    let targetContentId = null;
    let _browser = chrome?chrome:browser;
    let id = _browser.runtime.id;

    function isOwnDomain() {
        if(document.getElementById('passworkExtensionBody')) return true;
        return false;
    }

    function getProperUrl(url) {
        url = url.trim();
        if(url.indexOf('://') === -1){
            return 'https://' + url;
        }
        return url;
    }

    log('content script loaded', location.hostname);
    _browser.runtime.sendMessage(id, {action: 'pw_contentLoaded'});

    _browser.storage.local.get(settingsId, function(result) {
        let settings= {};
        if(result && result[settingsId]){
            settings = JSON.parse(result[settingsId]);
        } else {
            resetSettings();
        }
        if(settings.host) {
            host = settings.host;
            language = settings.language?settings.language:'en';
        }
    });

    function findNearestInputByType(element, typeArray) {
        let parent = element.parentElement;
        while (parent){
            let inputs = parent.querySelectorAll('input:not([style*="display:none"]):not([style*="display: none"]):not([readonly])');
            let _p = null;
            [].slice.call(inputs).map(function (elem) {
                if(-1 !== typeArray.indexOf(elem.type)) _p = elem;
            });
            if(_p) return _p;
            parent = parent.parentElement;
        }
        return null;
    }


    function parse(_document) {
        if(!_document) _document = document;
        let passFields = _document.querySelectorAll('input[type=password]:not([style*="display:none"]):not([style*="display: none"]):not([readonly])');
        let id = 0;
        let found = false;
        [].forEach.call(passFields, function (i) {
            found = true;
            let style = window.getComputedStyle(i);
            if(style.getPropertyValue('display') !== 'none' && style.getPropertyValue('visibility') !== 'hidden') {
                if(__debug) i.style.borderLeft = "solid 2px green";
                let parent = i.parentElement;
                let l = null;
                while (parent){
                    let login = parent.querySelector('input:not([style*="display:none"]):not([style*="display: none"]):not([readonly]):not([type=hidden]):not([type=checkbox])');
                    parent = parent.parentElement;
                    if(-1 === inputTypeTextArray.indexOf(login.type.toLowerCase())) continue;
                    if(login){

                        if(__debug) login.style.borderLeft = "solid 2px blue";
                        l = login;
                        break;
                    }
                }
                createAnchor(i,l);
                id++;
            }
        });
        return found;
    }

    function getForm(element) {
        log(element);
        let parent = element.parentElement;
        let form = false;
        while(parent) {
            if(parent.tagName.toLowerCase() === 'form') {
                form = parent;
                break;
            }
            if(parent.tagName.toLowerCase() === 'body') break;
            parent = parent.parentElement;
        }
        return form;
    }

    function removeOldIFrame() {
        let oldIFrame = document.getElementById(iFrameId);
        if(oldIFrame) {
            oldIFrame.remove();
        }
    }

    function getLanguageURI() {
        return !language || language === 'en'? "": language + '/';
    }

    function showIFrame(src, route, tcid) {
        if(!rootContentScript)
            return;

        if(tcid)
            targetContentId = tcid;

        removeOldIFrame();
        let ok = true;
        if(location.ancestorOrigins) {
            let extensionOrigin = 'chrome-extension://' + _browser.runtime.id;
            ok = !location.ancestorOrigins.contains(extensionOrigin);
        }
        if (ok) {
            iFrame = document.createElement('iframe');
            src = src? src: host + getLanguageURI() +  'extension/url/' + encodeURIComponent(btoa(location.hostname));
            if(route) src += '#!/' + route;
            let baseUrl = _browser.runtime.getURL('/');
            let url = encodeURIComponent(src);
            iFrame.src = `${baseUrl}loader/loader.html?url=${url}`;
            iFrame.id = iFrameId;
            iFrame.name = 'target';
            iFrame.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;z-index:999999999999;';
            iFrame.onload = function () {
                this.style.visibility = 'visible';
            };
            document.documentElement.appendChild(iFrame);
        }
    }

    function inIframe () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    function clearAnchors() {
        for (let i = 0, l = anchors.length; i < l; i++){
            anchors[i].remove();
        }
        anchors = [];
        [].slice.call(document.querySelectorAll('.__passwork-anchor')).map(function (anchor) {
            anchor.remove();
        })
    }

    function closeIFrame() {
        iFrame && iFrame.remove();
    }

    function processMessage (msg) {
        log(msg);
        switch (msg.action) {
            case 'pw_onInstalled': {
                removeOldIFrame();
            }
            case 'pw_onCreated':
            case 'pw_onUpdated':{
                refreshAnchorsWrapper();

                if(msg.data){
                    showIFrameForFirstAnchor(false);
                    autosubmit = true;
                    if(rootContentScript){
                        setTimeout(function(){
                            if(!authFormFoundId)
                                return;
                            _browser.runtime.sendMessage(id, {action: 'pw_insertLoginPassword', 'targetContentId' : authFormFoundId, 'data': msg.data, 'nologout' : true});
                        }, 1000);
                    }
                }
                break;
            }
            case 'pw_contextMenuExec':{
                if(targetContentId != contentId)
                    return;

                if(!clickedElement || (['input','textarea'].indexOf(clickedElement.tagName.toLowerCase()) === -1)) {
                    showIFrameForFirstAnchor('pw_contextClicked', contentId);
                    break;
                }
                if(clickedElement){
                    switch (clickedElement.type.toLowerCase()){
                        case 'email' :
                        case 'text' : {
                            _login = clickedElement;
                            _password = findNearestInputByType(clickedElement, ['password']);
                            log(_password);
                            break;
                        }
                        case 'password': {
                            _login = findNearestInputByType(clickedElement, inputTypeTextArray);
                            _password = clickedElement;
                            break;
                        }
                        default: {
                            _login = clickedElement; //textarea
                        }
                    }
                }
                _browser.runtime.sendMessage(id, {action: 'pw_contextClicked', 'targetContentId' : contentId});
                break;
            }
            case 'pw_foundAuthForm' :{
                log('found', location.host);
                if(rootContentScript)
                    authFormFoundId = msg.targetContentId;
                break;
            }
            case 'pw_popupButtonClicked': {
                targetContentId = null;
                showIFrameForFirstAnchor('pw_anchorClicked', authFormFoundId);
                break;
            }
            case 'pw_logout': {
                if(!rootContentScript)
                    return;

                closeIFrame();
                showIFrame(false, 'logout');
                _browser.runtime.sendMessage(id, {action: 'pw_updateMenu'});
                break;
            }
            case 'pw_lock': {
                if(!rootContentScript)
                    return;

                closeIFrame();
                showIFrame(false, 'lock');
                break;
            }
            case 'pw_backToPasswords': //not in use
            {
                if(!rootContentScript)
                    return;

                showIFrame();
                break;
            }
            case 'pw_contextClicked': {
                autosubmit = false;
                showIFrame(undefined, undefined, msg.targetContentId);
                break;
            }
            case 'pw_anchorClicked': {
                autosubmit = true;
                showIFrame(undefined, undefined, msg.targetContentId);
                break;
            }
            case 'pw_rightClick':{
                if(contentId != msg.targetContentId)
                    clickedElement = null;

                targetContentId = msg.targetContentId;
            }
            case 'pw_closeIFrame': {
                if(!rootContentScript)
                    return;

                closeIFrame();
                break;
            }
            case 'pw_resetSettingsToDefault': {
                resetSettings();
                break;
            }
            case 'pw_insertLoginPassword': {
                log(rootContentScript, authFormFoundId, msg);
                if(!msg.targetContentId && rootContentScript && !msg.nologout){

                    _browser.runtime.sendMessage(id, {action: 'pw_autoLogin', password : msg.data});
                    _browser.runtime.sendMessage(id, {action: 'pw_deleteCookies', domain : location.hostname}, function(){
                        setTimeout(function(){
                            if(msg.data.url){
                                window.location = getProperUrl(msg.data.url);
                            }else{
                                window.location.reload();
                            }
                        }, 1000);
                    });

                    closeIFrame();
                    return;
                }

                if(msg.targetContentId != contentId)
                    return;

                log('inserting');
                if( !injectPasswordAndLogin(msg.data.password, msg.data.login) ) {
                    _browser.runtime.sendMessage(id, {action: 'pw_formNotFound'});
                }
                _browser.runtime.sendMessage(id, {action: 'pw_closeIFrame'});

                break;
            }
            case 'pw_formNotFound': {
                if(rootContentScript && !authFormFoundId) {
                    setTimeout(function () {
                        showIFrame(_browser.runtime.getURL('www/formnotfound.html'));
                    });
                }
                break;
            }
            // case 'pw_insertCustomData': { //currently not in use
            //     switch (msg.data.type) {
            //         case 'text': {
            //             injectPasswordAndLogin(false, msg.data.value);
            //             break;
            //         }
            //         case 'password' : {
            //             injectPasswordAndLogin(msg.data.value, false);
            //             break;
            //         }
            //     }
            //     _browser.runtime.sendMessage(id, {action: 'pw_closeIFrame'});
            //     break;
            // }
            case 'pw_showSettings': {
                if(!rootContentScript)
                    return;

                closeIFrame();
                showIFrame(_browser.runtime.getURL('www/settings.html'));
                break;
            }
            case 'pw_saveSettings': {
                if(!rootContentScript)
                    return;

                closeIFrame();
                window.location.reload();
                break;
            }
            case 'pw_reloadExtension': {
                if(!rootContentScript)
                    return;

                window.location.reload();
                break;
            }
            case 'pw_loggedOutOfPasswork':
            case 'pw_authorizedOnPasswork': {
                _browser.runtime.sendMessage(id, {action: 'pw_updateMenu'});
            }
            default : {
                log('default: ', msg);
            }
        }
    }

    function showIFrameForFirstAnchor(a, cid) {
        if(!anchors[0]) {
            if(a)
                _browser.runtime.sendMessage(id, {action: a, 'targetContentId' : cid});
            return;
        }
        _login = anchors[0].originLoginField;
        _password = anchors[0].origin;
        if(a)
            _browser.runtime.sendMessage(id, {action: a, 'targetContentId' : cid});
    }

    function dispatchEventChange(element) {
        element.dispatchEvent(new Event('change', { 'bubbles': true }));
    }

    function resetSettings(cb) {
        _browser.storage.local.clear(function() {
            let error = _browser.runtime.lastError;
            if (error) {
                console.error(error);
            }
            cb && cb();
        });
    }


    function injectPasswordAndLogin(password, login) {
        log(password, login, _password, _login);
        let l = false, p = false;
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        if(_login && login) {
            _login.focus();
            let ev = new Event('input', {bubbles: true});
            ev.simulated = true;
            //_login.value = login;
            nativeInputValueSetter.call(_login, login);
            _login.dispatchEvent(ev);
            dispatchEventChange(_login);
            _login.blur();
            l = true;
        }
        if(_password && password) {
            _password.focus();
            let ev = new Event('input', {bubbles: true});
            ev.simulated = true;
            //_password.value = password;
            nativeInputValueSetter.call(_password, password);
            _password.dispatchEvent(ev);
            dispatchEventChange(_password);
            _password.blur();
            p = true;
        }
        if(l && p) {
            log('autosubmit');
            submit(_login, _password)
        }
        _login = null;
        _password = null;

        return l || p;
    }

    function isIndexOfStringInArray(needle, stack) {
        return stack.some(function (str) {
            if(-1 !== needle.indexOf(str)) {
                return true;
            }
        })
    }

    const submitStrings = ['submit', 'logon', 'login'];
    function submit(l, p) {
        if(!autosubmit) return;
        let form = getForm(p);
        let data = form && form.querySelectorAll('*:not([style*="display:none"]):not([style*="display: none"]):not(.close)');
        let afterPassword = false;
        if (data) {
            let r = [].slice.call(data).some(function (elem) {
                let onc = elem.getAttribute("onclick"); //todo check if it's function
                if(afterPassword && onc && isIndexOfStringInArray(onc.toLowerCase(), submitStrings)) {
                    elem.click();
                    return true;
                }
                let type = elem.type && elem.type.toLowerCase();
                let tagname = elem.tagName.toLowerCase();

                if(afterPassword && ( ['submit', 'button'].indexOf(type) !== -1 && afterPassword || tagname === 'button') ) {
                    log(elem);
                    elem.click();
                    return true;
                }
                if(type === 'password') afterPassword = true;
            });
            if(r) {
                return ;
            }
        }
        log(data);
    }

    function getTopAdjust(elem) {
        //let style = window.getComputedStyle(elem);
        //let marginTop = ~~style.getPropertyValue('margin-top').replace(/[^-\d\.]/g, '');
        return (elem.offsetHeight - anchorIconSize) / 2;
    }

    function createAnchor(elementPassword, elementLogin) {
        let rect = elementPassword.getBoundingClientRect();
        let left = rect.right ;
        let top = rect.top ;
        if(!left && !top) return;
        // let leftAdjust = _leftAdjust;
        // let topAdjust = getTopAdjust(elementPassword);
        // let opacity = "0.75;";
        //let style = "display:block;position:absolute;" +
        //     "left:" + (left + leftAdjust) + "px;top:" + (top + topAdjust) + "px;" +
        //     "height:" + anchorIconSize + "px;width:" + anchorIconSize + "px;" +
        //     "opacity: "+ opacity +
        //     "background: transparent no-repeat " +
        //     "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAABJhJREFUWAm9WEtPFEEQ7hEjakQ20YiKCWM0Cif24I" +
        //     "MbY6JnVy560DD8AHyc5CfgSSNGjy5Rr7qcNXH2hsZEOPm4uCQCYjQZxKiYkPX7iu6xnZ1hHyx+SdHT3dVVX6qrq3txVJ0ol8sulvRDcpCMlixaYgoSaimgLTqOU0LbfIDIIOQ" +
        //     "1pF5wzWCtjJxqijDmQec+xIWopeUV9aK0pJ69XVSz4bL6GP6WlnOdmVZ1ILNF2tPd7eqk26baWls4RTB61xCxgJ00rEkIZEjE5+LZxd9qLJhXj6e+sFszBrK71bC3T3W2bzFr" +
        //     "8iA1ZDrxNpEQiGSg+ATifV9eKd8O5p385EJ8bV19khrq6yjvaG2hzwByDsSYb/+ggpAm8xxaWW7Pxfx79ebTj38WNdrp2btdPfSPmG3kFp6Kk0oiRDLe24UfQubbr5VG/Seu2" +
        //     "7m1RUh1d2znfABCp2zFTXZH54xnItNsMvRFm4w6fQCe9slvQUQIEx5GfOYMF2wEmVWXf0nRF31q3zIdEUKPJ0oxgZuVM+Ih5Q993J9cMClz06gJITD0MeDyaK/3NBnDtbQsI/" +
        //     "QJZDUHZSJ0haNU+N+wfAqHTWDmgoQc8XqL3lrkT7BK40RVA33qBGeU3M1Y4HERr4P1giRGz7pyfRhbtDtWnFcv17BPndNHWYuVR0I5fvFuSsKwt1+BuUzdgeE0DGR3CZn4PO8" +
        //     "zyshECdfO1/i09OlbE8qRkFDjRZmE4f590XAaIROZSBEf3AbrYhWyjMQsLuM4LN8ZEuqiAm/tajjetSNRxSb9ZuEnCt87tYQC2Imb/+6Fw6qnY5usY7RHCqUKG1bNaychlxoW" +
        //     "S3YT8cg/mjhuDxoyHGM0xoI5dff8IVHR22Kry7dV97Lm2FcoNTrAyNiwDwvvsWogoRkq8XGVBCajLl5J0xVjzCcbZ7olRWUozQ5fARrT3LISpIsvvaRt48lIOx3aiBrNuWqgd" +
        //     "5d0uT3XkSdzi8vqeFebuoy8MUizY0UuJKGQC1Yj1FgtYp4wEjxVNH7vwmrOGCJseerSriVrd0JuWYEL+AZuFExeSebVJ0WFGZKxkz2uYPkuOPrq+MCjd+zGVFy3rj6vCm4Rc+" +
        //     "IESsTLme9yAzAy8WS3Db+6npXIYuygXP8gRSa9IxMzdT/ibcONfPNHwOhZKYXTeD1Gx/4WjdkFrhHjjayxfAoHqUNgloexaVZW/jr4X5CfR/BJ35pD9B7i4FX+8fFTxaoLHNo" +
        //     "Q0Ad9aePim99RpQbDAP1xHF3nweARk2TUaTpYGuiDvmB8XPsWPxEh9jDhoymaBVbB4nRTELNd1D4j23LKoh4+cOIyaAJIL0vBpfHm/lC0oj8NHx4IhWgjVBDijCZVwGc/ilo5" +
        //     "P/nZYTVeD/j08Pv2lPU2FWErFydD+4mEjGMQy+N7kH1W49vFOfUk5dVHnSScw0vycv9+eRvp+fH4Ntnr1iRERZDy0NyC9ELkByTfx0/fhUKSFdi8Z3hyWK1ZPs7gjcyb38pDb" +
        //     "tFVkAloZ90AMR8yBakXXOPXSqBqhOKGYNzFmAfJQTJaJHr4ZhRCLQW0/GdCCW3N+APnrGFnrrCojQAAAABJRU5ErkJggg==');" +
        //     "background-size: " + anchorIconSize + "px;" +
        //     "cursor: pointer;" +
        //     "z-index:2147483647;";
        let style = "display:none";
        let anchor = document.createElement('span');
        anchor.style.cssText = style;
        anchor.className = "__passwork-anchor";
        anchor.origin = elementPassword;
        anchor.originLoginField = elementLogin;
        document.body.insertBefore(anchor, document.body.lastChild);
        anchors.push(anchor);
        // anchor.addEventListener('mouseover', function (event) {
        //     anchor.style.opacity = '1';
        // });
        // anchor.addEventListener('mouseout', function (event) {
        //     anchor.style.opacity = opacity;
        // });
        // anchor.addEventListener('click', function (event) {
        //     event.stopPropagation();
        //     _login = this.originLoginField;
        //     _password = this.origin;
        //     try {
        //         _browser.runtime.sendMessage(id, {action: 'pw_anchorClicked', 'targetContentId' : contentId});
        //     } catch(e) {
        //     }
        // });
    }

    _browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        log(msg);
        processMessage(msg);
    });

    window.addEventListener('message', function (e) {
        if(e.data.action && e.data.action.substr(0,3) === 'pw_'){
            if(e.data.action === 'pw_insertLoginPassword')
                e.data.targetContentId = targetContentId;

            _browser.runtime.sendMessage(id, e.data);
        }
    });

    window.addEventListener('resize', function (event) {
        reAdjustAnchors();
    }, false);

    let setAnchorsIntervalId = null,
        setAnchorsIntervalCount = 0,
        posAnchorsIntervalId = null,
        posAnchorsIntervalRunCount;
    let mObs = new window.MutationObserver(function (mutations, observer) {
        let refreshAnchors = false;
        for (let i = 0; i < mutations.length; i++) {
            let mutation = mutations[i];
            for (let j = 0; j < mutation.addedNodes.length; j++) {
                if (mutation.addedNodes[j].className !== '__passwork-anchor') {
                    refreshAnchors = true;
                    break;
                }
            }
            if (refreshAnchors) break;
            for (let j = 0; j < mutation.removedNodes.length; j++) {
                if (mutation.removedNodes[j].className !== '__passwork-anchor') {
                    refreshAnchors = true;
                    break;
                }
            }

            if (refreshAnchors) {
                break;
            }
        }
        if (refreshAnchors) {
            if (setAnchorsIntervalId) {
                clearInterval(setAnchorsIntervalId);
                setAnchorsIntervalId = null;
                setAnchorsIntervalCount = 0;
            }

            setAnchorsIntervalId = setInterval(refreshAnchorsWrapper, 500);
        }

        if (posAnchorsIntervalId) {
            clearInterval(posAnchorsIntervalId);
            posAnchorsIntervalId = null;
            posAnchorsIntervalRunCount = 0;
        }

        posAnchorsIntervalId = setInterval(reAdjustAnchors, 500);
    });

    mObs.observe(document.querySelectorAll('body')[0], { childList: true, subtree: true, attributes: true, characterData: true, attributeFilter: ['style'] });

    function reAdjustAnchors() {
        if (posAnchorsIntervalId) {
            clearInterval(posAnchorsIntervalId);
            posAnchorsIntervalId = null;
            posAnchorsIntervalRunCount = 0;
        }
        posAnchorsIntervalRunCount++;
        anchors.map(function (anchor) {
            var rect = anchor.origin.getBoundingClientRect();
            anchor.style.top = rect.top + getTopAdjust(anchor.origin) + 'px';
            anchor.style.left = rect.right + _leftAdjust + 'px';
        })
    }

    function refreshAnchorsWrapper(){
        if (setAnchorsIntervalId && setAnchorsIntervalCount === 1) {
            clearInterval(setAnchorsIntervalId);
            setAnchorsIntervalId = null;
            setAnchorsIntervalCount = 0;
        }
        setAnchorsIntervalCount++;
        clearAnchors();
        if(parse(false)) {
            _browser.runtime.sendMessage(id, {action: 'pw_foundAuthForm', 'targetContentId' : contentId});
        }

    }

    document.addEventListener("mousedown", function(event){
        //right click
        if (event.button == 2) {
            clickedElement = event.target;
            _browser.runtime.sendMessage(id, {action: 'pw_rightClick', 'targetContentId' : contentId});
        }
    }, true);

})();