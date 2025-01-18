(function(){
    var exports = window;
    var g_manual_rating = {
    //[data]
        gOnRatingTimer: null,
        gMouseLeaveFlag: 1,
        gCurrentEvent: null,
        gCurrentTarget: null,
        gCurrentNode: null,
        gUrlMap: [],
        gDoc: null,
        gToolTip: null,
        gLinkNum: -1,
        gLastLink: null,
        gIntervalThread: null,
        gTooltipTimeout: 0,
        gDocGuid: null,
    
        //[data function]
        //gCurrentTarget
        getCurrentTarget: function() {
            return this.gCurrentTarget;
        },
        setCurrentTarget: function(t) {
            this.gCurrentTarget = t;
        },
        isEditable: function() {
            //When body is editable, manual rating will not
            //work, as its inserted div will impact user normal function
            var contenteditable = TMExt_$('body').attr('contenteditable');
            var editable = (document.designMode === 'on') || contenteditable === '' || contenteditable === 'true';
    
            var punymce = TMExt_$('body#punymce').length > 0;
            var tinymce = TMExt_$('body#tinymce').length > 0;
            var enableEditBody = (editable) || (punymce && punymce === true) || (tinymce && tinymce === true);
            return enableEditBody;
        },
        //gCurrentNode
        getCurrentNode: function() {
            return this.gCurrentNode;
        },
        setCurrentNode: function(n) {
            this.gCurrentNode = n;
        },
        //gUrlMap
        getUrlMapLenth: function() {
            return this.gUrlMap.length;
        },
        getUrlMapValueByKey: function(url) {
            return this.gUrlMap[url];
        },
        getUrlMapValueByIndex: function(i) {
            return this.gUrlMap[i];
        },
        setUrlMapValue: function(url, retLevel) {
            this.gUrlMap[url] = retLevel;
        },
        pushUrlMapValue: function(url) {
            this.gUrlMap.push(url);
        },
        //gDoc
        getDocument: function() {
            return this.gDoc;
        },
        setDocument: function(d) {
            this.gDoc = d;
        },
        //gToolTip
        getToolTip: function() {
            return this.gToolTip;
        },
        setToolTip: function(t) {
            this.gToolTip = t;
        },
        //gLinkNum
        canHookLink: function(link_len, alink) {
            if (link_len === this.gLinkNum && alink === this.gLastLink) {
                return false;
            }
            this.gLinkNum = link_len;
            this.gLastLink = alink;
            return true;
        },
    
        //[functional function]
        callbackFromDoc: function(retLevel, url) {
            if (!this.isEditable()) {
                exports.UMSInsertResultICON(this, retLevel, url);
            }
        },
    
        isValidUrl: function(url) {
            var url_match_regex = /^(https?|ftps?):\/\/([\w%\-]+\.)+[\w%\-]+(\/[\w\- .\/?%&=]*)?/i;
            var url_to_test = encodeURI(url);
            if (!url_to_test.match(url_match_regex)) {
                TMExt_debug(url_to_test + ' is invalid url');
                return false;
            }
            return true;
        },
    
        isUrlRated: function(url) {
            for (var i = 0; i < this.getUrlMapLenth(); ++i) {
                if (url == this.getUrlMapValueByIndex(i)) {
                    return true;
                }
            }
            TMExt_debug(url + ' has not be rated.');
            this.pushUrlMapValue(url);
            return false;
        },
    
        getLocalUrlRule: function() {
            var rule = '^https?://(.*)';
            var s = document.location.hostname.split('.');
            var i = s.length < 5 ? (s.length === 2 ? 2 : s.length - 1) : 3;
            for (; i > 0; --i) {
                rule += '\\.' + s[s.length - i];
            }
    
            return rule;
        },
    
        isRated: function(target) {
            var ret = false;
            if (target.prev().attr('class') === 'TSRSpan' || target.parent().prev().attr('class') === 'TSRSpan') {
                ret = true;
            }
    
            if (ret !== true) {
                var children = target.children();
                for (var i = 0; i < children.length; ++i) {
                    var child = TMExt_$(children[i]);
                    if (child.attr('class') === 'TSRSpan') {
                        ret = true;
                        break;
                    }
                }
            }
    
            if (ret === true) {
                TMExt_debug('It is a Rated link');
            }
    
            return ret;
        }
    };
    exports.g_manual_rating = g_manual_rating;
    
    var Communicator = {
        UMS_SEND_DATA_EVENT: 'UMSSendDataEvent',
        UMS_EVENT_ID: 'UMSSendDataEventElement',
        UMS_TAG_NAME: 'UMSDataElement',
        UMS_IEObject: null,
        D_TOOLBAR_CALLBACK_ACTIVEX_PROG_ID: 'ProToolbarIMRatingActiveX.ToolbarCB',
    
        init: function() {
            Communicator.createElement();
        },
    
        createElement: function() {
            if (!document.getElementById(Communicator.UMS_EVENT_ID)) {
                var element = document.createElement(Communicator.UMS_TAG_NAME);
                element.id = Communicator.UMS_TAG_NAME;
                element.style.display = 'None';
                document.documentElement.appendChild(element);
                return element;
            } else {
                return document.getElementById(Communicator.UMS_EVENT_ID);
            }
        },
    
        call: function(data) {
            // create or get our element
            var element = Communicator.createElement();
            if (element) {
                element.setAttribute('data', data);
                element.setAttribute('docguid', g_manual_rating.gDocGuid);
                // create and fire custom Event to notify extension
                var ev = document.createEvent('Event');
                ev.initEvent(Communicator.UMS_SEND_DATA_EVENT, true, false);
                element.dispatchEvent(ev);
            } else {
                TMExt_debug('start ToolbarInvoke url=' + data);
                Communicator.UMS_IEObject.ToolbarInvoke({
                    Action: 5,
                    URL: data,
                    HTMLDocument: document
                });
            }
        }
    };
    exports.Communicator = Communicator;
    
    function TMExt_Hook_Link() {
        Communicator.init();
        exports.UMSCreateTooltip();
    
        const tryDecodeURI = (uri) => {
            let ret = '';
            try {
                ret = uri ? decodeURI(uri) : '';
            } catch(e) {
                TMExt_debug('tryDecodeURI: e = ' + e);
            }

            return ret;
        }

        const tryEncodeURI = (uri) => {
            let ret = '';
            try {
                ret = uri ? encodeURI(uri) : '';
            } catch(e) {
                TMExt_debug('tryEncodeURI: e = ' + e);
            }

            return ret;
        }

        const tryGetURI = (uri) => {
            let ret = '';
            try {
                do {
                    ret = tryDecodeURI(uri);
                    if (ret) {
                        break;
                    }

                    ret = tryEncodeURI(uri);
                    if (ret) {
                        break;
                    }

                    ret = uri;
                } while(false);
            } catch(e) {
                TMExt_debug('tryGetURI: e = ' + e);
                ret = '';
            }
            return ret;
        }

        const onMouseEnter = (element) => {
            try {
                var cur_target = TMExt_$(element);
                if (g_manual_rating.isRated(cur_target)) {
                    return;
                }
                var cur_node = tryGetURI(cur_target[0].href);
                if (!cur_node) {
                    TMExt_debug('just return: href is null');
                    return;
                }
                console.log('mouseenter href = ' + cur_node);

                // trim space
                cur_node = exports.TSTrim(cur_node);

                /*  filter local url
                 *  var curUrlRuleStr = g_manual_rating.getLocalUrlRule();
                 *  var rule = new RegExp(curUrlRuleStr, "i");
                 *  if (rule.test(cur_node)){
                 *      TMExt_debug("[local link]");
                 *      return;
                 *  }
                 */

                if (!g_manual_rating.isValidUrl(cur_node)) {
                    TMExt_debug('just return: href is invalid:' + cur_node);
                    g_manual_rating.setCurrentNode(null);
                    return;
                }

                g_manual_rating.setCurrentTarget(cur_target);
                g_manual_rating.setDocument(document);
                g_manual_rating.setCurrentNode(cur_node);
                g_manual_rating.gMouseLeaveFlag = 1;

                var umsTooltipTimeout = (exports.g_iUMSToolTipTimeout && exports.g_iUMSToolTipTimeout > 0) ? exports.g_iUMSToolTipTimeout : 2000;
                g_manual_rating.gOnRatingTimer = setTimeout(function() {
                    TMExt_debug('timeout start rating');
                    g_manual_rating.gOnRatingTimer = 0;
                    g_manual_rating.gCurrentEvent = cur_target[0];
                    Communicator.call(cur_node);
                }, umsTooltipTimeout);
            } catch (e) {
                TMExt_debug(e);
            }
        }

        const onMouseLeave = (element) => {
            try {
                if (g_manual_rating.gOnRatingTimer) {
                    TMExt_debug('clear rating time out');
                    clearTimeout(g_manual_rating.gOnRatingTimer);
                    g_manual_rating.gOnRatingTimer = 0;
                }
                else {
                    exports.UMSSetToolTipHideTimer();
                    g_manual_rating.gMouseLeaveFlag = 0;
                    g_manual_rating.setCurrentNode(null);
                }
            } catch(e) {
                TMExt_debug(e);
            }
        }

        const onEachLink = (index, link) => {
            if (!link.UMSMouseEnterEventHandler || !link.UMSMouseEnterEventHandler ) {
                link.UMSMouseEnterEventHandler = true;
                TMExt_$(link).mouseenter(() => {
                    onMouseEnter(link);
                });
            }

            if (!link.UMSMouseLeaveEventHandler || !link.UMSMouseLeaveEventHandler) {
                link.UMSMouseLeaveEventHandler = true;
                TMExt_$(link).mouseleave(() => {
                    onMouseLeave(link);
                })
            }
        }

        TMExt_$('a').each(onEachLink);

        TMExt_$('iframe').each((index, subFrame) => {
            if (subFrame.contentDocument) {
                TMExt_$(subFrame.contentDocument).contents().find('a').each(onEachLink);
            }
        });
    }
    
    function TMExt_UMS_Start() {
        try {
            TMExt_Hook_Link();
    
            if (g_manual_rating.gMouseLeaveFlag == 0) {
                exports.UMSSetToolTipHideTimer();
            }
        } catch (e) {
            TMExt_debug(e);
        }
    }
    
    const UMSOnDocumentReady = () => {
        if (!g_manual_rating.isEditable()){
            TMExt_debug('manual rating document.ready TMExt_UMS_Start');
            TMExt_UMS_Start();
            setInterval(TMExt_UMS_Start, 2000);
        }
    }

    try {
        TMExt_$(document).ready(UMSOnDocumentReady);
    } catch(e) {
        if (typeof (console) != 'undefined' && typeof (console.log) != 'undefined'){
            console.log('TMExt_$(document) in TISProUrlManualScannerLib.js Error' + e);
        }
    }
})();
